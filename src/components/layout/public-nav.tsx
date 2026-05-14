"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Logo } from "@/components/layout/logo";

export function PublicNav() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:px-12 sm:py-4">
      <Link href="/" className="flex items-center gap-2">
        <Logo size={32} />
        <span className="text-base font-bold sm:text-lg">Trading Core</span>
      </Link>
      <nav className="flex items-center gap-2 text-sm sm:gap-3">
        <Link
          href="/cfa"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Blog
        </Link>
        <Link
          href="/pricing"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Pricing
        </Link>
        {!loading && !user && (
          <>
            <Link
              href="/login"
              className="rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:px-3"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm"
            >
              Start Free
            </Link>
          </>
        )}
        {!loading && user && (
          <>
            <Link
              href="/profile"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              title="My Profile"
            >
              {(user.displayName || user.email || "U")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span className="hidden sm:inline">Back to app</span>
              <span className="sm:hidden">App</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 text-center text-xs text-muted-foreground sm:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <Link href="/cfa" className="hover:text-foreground">Blog</Link>
          <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
          <Link href="/login" className="hover:text-foreground">Sign In</Link>
          <Link href="/register" className="hover:text-foreground">Start Free</Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Logo size={18} rounded="rounded" />
          <span className="font-semibold text-foreground">Trading Core</span>
        </div>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Trading Core. All rights reserved.
        </p>
        <p className="mt-1 text-[11px]">
          Not affiliated with CFA Institute. CFA® is a registered trademark of CFA Institute.
        </p>
      </div>
    </footer>
  );
}
