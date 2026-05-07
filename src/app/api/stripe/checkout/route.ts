import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

/**
 * POST /api/stripe/checkout
 * Creates a Stripe Checkout Session for a subscription with a 3-day trial.
 * Body: { priceId: string, userId: string, userEmail: string }
 * Returns: { url: string } – the Stripe-hosted checkout URL
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
      success_url: `${origin}/dashboard?checkout=success`,
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
