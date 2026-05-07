import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { adminDb } from "@/lib/firebase-admin";
import Stripe from "stripe";

/**
 * POST /api/webhooks/stripe
 * Receives Stripe webhook events and updates user subscription status in Firestore.
 * Uses firebase-admin for server-side Firestore access.
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
      console.warn("STRIPE_WEBHOOK_SECRET not configured, skipping signature verification");
      event = JSON.parse(body) as Stripe.Event;
    } else {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId || session.metadata?.firebaseUid;
        const customerId = session.customer as string;

        if (userId && customerId) {
          await adminDb.doc(`users/${userId}`).update({
            stripeCustomerId: customerId,
            subscriptionStatus: "trialing",
          });
          console.log(`[Stripe] Checkout completed: user=${userId}, customer=${customerId}`);
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

        if (userId) {
          await adminDb.doc(`users/${userId}`).update({
            subscriptionStatus: mappedStatus,
            subscriptionId: subscription.id,
            currentPeriodEnd: new Date((subscription as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
          });
          console.log(`[Stripe] Subscription ${event.type}: user=${userId}, status=${mappedStatus}`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId || subscription.metadata?.firebaseUid;

        if (userId) {
          await adminDb.doc(`users/${userId}`).update({
            subscriptionStatus: "cancelled",
          });
          console.log(`[Stripe] Subscription cancelled: user=${userId}`);
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Stripe] Payment succeeded: customer=${invoice.customer}, amount=${invoice.amount_paid}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice as unknown as { subscription: string | null }).subscription;
        if (subId) {
          const sub = await stripe.subscriptions.retrieve(subId);
          const userId = sub.metadata?.userId || sub.metadata?.firebaseUid;
          if (userId) {
            await adminDb.doc(`users/${userId}`).update({
              subscriptionStatus: "past_due",
            });
          }
        }
        console.log(`[Stripe] Payment failed: customer=${invoice.customer}`);
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
