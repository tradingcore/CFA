import type { Metadata } from "next";
import { BlogNav, BlogFooter } from "@/components/blog/blog-nav";

export const metadata: Metadata = {
  title: {
    default: "CFA Blog & Study Guides",
    template: "%s | Trading Core Blog",
  },
  description:
    "In-depth guides on the CFA exam — study plans, topic strategy, mock review, and how to pass on your first try. Covers Level I, II, and III.",
  alternates: {
    canonical: "/cfa",
  },
};

export default function CfaBlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BlogNav />
      <div className="flex-1">{children}</div>
      <BlogFooter />
    </div>
  );
}
