import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

/**
 * POST /api/stripe/verify-session
 *
 * Validates a Stripe Checkout Session ID returned to the success page so the
 * client can confidently show a "purchase confirmed" UI without trusting the
 * URL alone (and so Google Ads conversion fires only on real purchases).
 *
 * Body: { sessionId: string }
 *
 * Returns: {
 *   paid: boolean,                 // payment_status === "paid"
 *   status: string | null,         // raw Stripe session status
 *   customerEmail: string | null,
 *   amountTotal: number | null,    // in the smallest currency unit (cents)
 *   currency: string | null,
 *   userId: string | null,         // Firebase UID, from session.metadata
 *   subscriptionStatus: string | null, // status of the created subscription
 * }
 *
 * Notes:
 * - This endpoint is read-only against Stripe; it does NOT mutate Firestore.
 *   Firestore is updated by the Stripe webhook (`/api/webhooks/stripe`).
 * - The session_id placeholder in the checkout success_url is replaced by
 *   Stripe with the real session id, so this endpoint is the source of truth.
 */
export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    const subscription =
      session.subscription && typeof session.subscription !== "string"
        ? session.subscription
        : null;

    return NextResponse.json({
      paid: session.payment_status === "paid",
      status: session.status ?? null,
      customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
      amountTotal: session.amount_total ?? null,
      currency: session.currency ?? null,
      userId:
        (session.metadata?.userId as string | undefined) ??
        (session.metadata?.firebaseUid as string | undefined) ??
        null,
      subscriptionStatus: subscription?.status ?? null,
    });
  } catch (error) {
    console.error("Stripe verify-session error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to verify session" },
      { status: 500 }
    );
  }
}
