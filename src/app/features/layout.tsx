import type { Metadata } from "next";
import { PublicNav, PublicFooter } from "@/components/layout/public-nav";

export const metadata: Metadata = {
  title: "Features — Inside Trading Core CFA Prep",
  description:
    "Tour the Trading Core CFA prep platform — adaptive mock exams, LOS-level progress tracking, personalized study plans, and an AI tutor grounded in the official curriculum.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Trading Core Features — CFA Prep, Reimagined",
    description:
      "Adaptive mocks, LOS-level progress, personalized plans, AI tutor. See what's inside.",
    url: "/features",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trading Core Features",
    description: "Adaptive mocks, LOS-level progress, AI tutor.",
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicNav />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}
