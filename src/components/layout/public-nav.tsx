"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  FileQuestion,
  GraduationCap,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Logo } from "@/components/layout/logo";

const FEATURE_ITEMS: Array<{
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    href: "/features#dashboard",
    label: "Dashboard",
    description: "Streak, readiness, weekly accuracy",
    icon: LayoutDashboard,
  },
  {
    href: "/features#mock-exam",
    label: "Mock Exam",
    description: "Official + Training mode",
    icon: FileQuestion,
  },
  {
    href: "/features#study-progress",
    label: "Study Progress",
    description: "LOS-level mastery tracking",
    icon: GraduationCap,
  },
  {
    href: "/features#study-plan",
    label: "Study Plan",
    description: "Personalized day-by-day schedule",
    icon: CalendarDays,
  },
  {
    href: "/features#chat",
    label: "AI Tutor",
    description: "Grounded in the official curriculum",
    icon: MessageCircle,
  },
];

function FeaturesDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/features"
        className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        onClick={() => setOpen(false)}
      >
        Features
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </Link>
      {open && (
        <div className="absolute right-0 top-full z-50 hidden pt-2 sm:block">
          <div className="w-80 rounded-xl border border-border bg-popover p-2 shadow-2xl ring-1 ring-foreground/5">
            {FEATURE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
            <div className="mt-1 border-t border-border px-3 pb-1 pt-2 text-[11px] text-muted-foreground">
              Click <span className="font-medium text-foreground">Features</span> for the full overview
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PublicNav() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:px-12 sm:py-4">
      <Link href="/" className="flex items-center gap-2">
        <Logo size={32} />
        <span className="text-base font-bold sm:text-lg">Trading Core</span>
      </Link>
      <nav className="flex items-center gap-2 text-sm sm:gap-3">
        <FeaturesDropdown />
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
          <Link href="/features" className="hover:text-foreground">Features</Link>
          <Link href="/cfa" className="hover:text-foreground">Blog</Link>
          <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
          <Link href="/login" className="hover:text-foreground">Sign In</Link>
          <Link href="/register" className="hover:text-foreground">Start Free</Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Logo size={20} rounded="rounded" />
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
