import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CFA Prep Pricing — Start Free, Upgrade When You're Ready",
  description:
    "Free CFA prep with daily limits — no credit card required. Upgrade to Pro for unlimited mock exams, AI chat, and study plans. Plans from $50/month.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "CFA Prep Pricing — Start Free",
    description:
      "Free to start. No credit card. Upgrade to Pro for unlimited access.",
    url: "/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFA Prep Pricing — Start Free",
    description: "Free to start. No credit card. Upgrade for unlimited access.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
