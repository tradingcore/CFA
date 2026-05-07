import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

/**
 * POST /api/webhooks/stripe
 * Receives Stripe webhook events and updates user subscription status in Firestore.
 * Gracefully handles missing firebase-admin credentials.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret || webhookSecret.startsWith("whsec_COLE")) {
      console.warn("[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured");
      event = JSON.parse(body) as Stripe.Event;
    } else {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    }
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let adminDb: FirebaseFirestore.Firestore | null = null;
  try {
    const mod = await import("@/lib/firebase-admin");
    adminDb = mod.adminDb;
  } catch (err) {
    console.warn("[Stripe Webhook] firebase-admin not available, skipping Firestore updates:", err);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId || session.metadata?.firebaseUid;
        const customerId = session.customer as string;

        console.log(`[Stripe Webhook] checkout.session.completed: user=${userId}, customer=${customerId}`);

        if (userId && customerId && adminDb) {
          await adminDb.doc(`users/${userId}`).update({
            stripeCustomerId: customerId,
            subscriptionStatus: "trialing",
          });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId || subscription.metadata?.firebaseUid;
        const status = subscription.status as string;

        const mappedStatus = ["trialing", "active", "past_due"].includes(status)
          ? status
          : status === "canceled" || status === "unpaid"
          ? "cancelled"
          : "none";

        console.log(`[Stripe Webhook] ${event.type}: user=${userId}, status=${mappedStatus}`);

        if (userId && adminDb) {
          const periodEnd = (subscription as unknown as { current_period_end?: number }).current_period_end;
          await adminDb.doc(`users/${userId}`).update({
            subscriptionStatus: mappedStatus,
            subscriptionId: subscription.id,
            ...(periodEnd ? { currentPeriodEnd: new Date(periodEnd * 1000).toISOString() } : {}),
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId || subscription.metadata?.firebaseUid;

        console.log(`[Stripe Webhook] subscription.deleted: user=${userId}`);

        if (userId && adminDb) {
          await adminDb.doc(`users/${userId}`).update({
            subscriptionStatus: "cancelled",
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Stripe Webhook] payment_succeeded: customer=${invoice.customer}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Stripe Webhook] payment_failed: customer=${invoice.customer}`);

        const subId = (invoice as unknown as { subscription: string | null }).subscription;
        if (subId && adminDb) {
          try {
            const sub = await stripe.subscriptions.retrieve(subId);
            const userId = sub.metadata?.userId || sub.metadata?.firebaseUid;
            if (userId) {
              await adminDb.doc(`users/${userId}`).update({
                subscriptionStatus: "past_due",
              });
            }
          } catch (err) {
            console.error("[Stripe Webhook] Failed to update past_due status:", err);
          }
        }
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Processing error:", error);
    return NextResponse.json({ received: true, warning: "Processing error logged" });
  }
}
