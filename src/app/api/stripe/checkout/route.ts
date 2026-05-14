import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

/**
 * POST /api/stripe/checkout
 *
 * Creates a Stripe Checkout Session for one of the paid subscription plans
 * (Monthly or 6-Month). The product is charged immediately — there is NO trial
 * period configured on Stripe; the "free" experience is the daily-limited free
 * tier (see `src/lib/usage-limits.ts`).
 *
 * Body: { priceId: string, userId: string, userEmail: string }
 *  - priceId: Stripe price ID for the plan being purchased
 *  - userId: Firebase UID of the buyer (also persisted in Stripe metadata so
 *            the webhook can find the corresponding Firestore document)
 *  - userEmail: Optional, prefilled in the Stripe Checkout form
 *
 * Returns: { url: string } – the Stripe-hosted checkout URL the client should
 *                            redirect to.
 *
 * On success Stripe redirects to `/checkout/success?session_id=...` where the
 * client validates the session and walks the user through a fluid "welcome to
 * Pro" onboarding flow.
 */
export async function POST(req: NextRequest) {
  try {
    const { priceId, userId, userEmail } = await req.json();

    if (!priceId || !userId) {
      return NextResponse.json({ error: "priceId and userId are required" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: { userId, firebaseUid: userId },
      },
      customer_email: userEmail || undefined,
      metadata: { userId, firebaseUid: userId },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
