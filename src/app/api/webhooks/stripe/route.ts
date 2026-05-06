import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

/**
 * POST /api/webhooks/stripe
 * Receives Stripe webhook events and logs them.
 * In production, this should update the user's subscription status in Firestore.
 * Verifies webhook signature using STRIPE_WEBHOOK_SECRET.
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
    if (!webhookSecret || webhookSecret === "whsec_COLE_AQUI_DEPOIS") {
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
        console.log(`[Stripe] Checkout completed for user ${userId}, customer ${session.customer}`);
        // TODO: Update Firestore user profile with stripeCustomerId and subscription status
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId || subscription.metadata?.firebaseUid;
        const status = subscription.status;
        console.log(`[Stripe] Subscription ${event.type}: user ${userId}, status ${status}`);
        // TODO: Update Firestore: subscriptionStatus, subscriptionId, currentPeriodEnd
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId || subscription.metadata?.firebaseUid;
        console.log(`[Stripe] Subscription cancelled for user ${userId}`);
        // TODO: Update Firestore: subscriptionStatus = "cancelled"
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Stripe] Payment succeeded for customer ${invoice.customer}, amount ${invoice.amount_paid}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Stripe] Payment failed for customer ${invoice.customer}`);
        // TODO: Update Firestore: subscriptionStatus = "past_due"
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
