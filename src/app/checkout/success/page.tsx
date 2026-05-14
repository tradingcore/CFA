"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
  MessageCircle,
  Brain,
  CalendarDays,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { isSubscribed } from "@/lib/usage-limits";
import { trackPurchaseConversion } from "@/lib/gtag";

const POLL_INTERVAL_MS = 1500;
const POLL_MAX_ATTEMPTS = 12;

interface VerifyResponse {
  paid: boolean;
  status: string | null;
  customerEmail: string | null;
  amountTotal: number | null;
  currency: string | null;
  userId: string | null;
  subscriptionStatus: string | null;
}

const PRO_UNLOCKS = [
  {
    icon: MessageCircle,
    title: "Unlimited AI tutor",
    desc: "Ask anything, anytime. No more daily caps.",
  },
  {
    icon: Brain,
    title: "Unlimited mock exams",
    desc: "Generate fresh AI questions across every LOS.",
  },
  {
    icon: CalendarDays,
    title: "AI-powered study plan",
    desc: "Personalized to your exam date, weak topics, and schedule.",
  },
  {
    icon: BarChart3,
    title: "Full performance analytics",
    desc: "Topic-level radar, weekly trends, and readiness score.",
  },
];

/**
 * Format an amount returned by Stripe (smallest currency unit) as a localized
 * money string. Returns `null` when the data is missing.
 */
function formatAmount(amount: number | null, currency: string | null): string | null {
  if (amount == null || !currency) return null;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

function CheckoutSuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();

  const [verifyState, setVerifyState] = useState<"loading" | "ok" | "error">(
    "loading"
  );
  const [verifyData, setVerifyData] = useState<VerifyResponse | null>(null);
  const [verifyError, setVerifyError] = useState<string>("");
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const conversionFiredRef = useRef(false);

  // Step 1: validate the Checkout Session against Stripe.
  useEffect(() => {
    if (!sessionId) {
      setVerifyState("error");
      setVerifyError("Missing session_id in URL.");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/stripe/verify-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error || `Verification failed (${res.status}).`);
        }
        const data = (await res.json()) as VerifyResponse;
        if (cancelled) return;
        setVerifyData(data);
        setVerifyState(data.paid ? "ok" : "error");
        if (!data.paid) {
          setVerifyError("Payment is not confirmed yet. Please contact support.");
        }
      } catch (err) {
        if (cancelled) return;
        setVerifyState("error");
        setVerifyError(err instanceof Error ? err.message : "Verification failed.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  // Step 2: poll the user profile until the Stripe webhook flips
  // subscriptionStatus to "active". The webhook is async, so the first read
  // right after redirect is often still "none".
  useEffect(() => {
    if (verifyState !== "ok" || !user) return;
    if (isSubscribed(profile)) return;

    let attempts = 0;
    const tick = async () => {
      attempts += 1;
      try {
        await refreshProfile();
      } catch {
        // ignore — we'll try again on the next tick
      }
      if (attempts >= POLL_MAX_ATTEMPTS && refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };

    refreshTimerRef.current = setInterval(tick, POLL_INTERVAL_MS);
    void tick();

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, [verifyState, user, profile, refreshProfile]);

  // Stop polling as soon as the profile reflects an active subscription.
  useEffect(() => {
    if (isSubscribed(profile) && refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, [profile]);

  // Step 3: fire the Google Ads "Purchase" conversion event exactly once per
  // verified Stripe session. Using `transaction_id` lets Google Ads dedupe
  // even if the user reloads or comes back to this URL later.
  useEffect(() => {
    if (verifyState !== "ok") return;
    if (!verifyData?.paid) return;
    if (!sessionId) return;
    if (conversionFiredRef.current) return;

    conversionFiredRef.current = true;

    const value =
      typeof verifyData.amountTotal === "number" ? verifyData.amountTotal / 100 : 0;
    const currency = verifyData.currency?.toUpperCase() || "USD";

    trackPurchaseConversion({
      value,
      currency,
      transactionId: sessionId,
    });
  }, [verifyState, verifyData, sessionId]);

  const formattedAmount = formatAmount(
    verifyData?.amountTotal ?? null,
    verifyData?.currency ?? null
  );

  const onboardingDone = profile?.onboardingCompleted === true;
  const subscriptionActive = isSubscribed(profile);
  const subscriptionPending =
    verifyState === "ok" && !subscriptionActive && !!user && !authLoading;

  const primaryHref = onboardingDone ? "/plan" : "/onboarding";
  const primaryLabel = onboardingDone
    ? "Generate my AI study plan"
    : "Set up my study plan";

  // ────────────────── ERROR STATE ──────────────────
  if (verifyState === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-lg space-y-6 rounded-2xl border border-destructive/30 bg-card p-8 shadow-xl">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertCircle className="h-7 w-7 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold">We couldn&apos;t confirm your purchase</h1>
            <p className="text-sm text-muted-foreground">
              {verifyError ||
                "Something went wrong while verifying your payment. If you were charged, contact support and we&apos;ll fix it right away."}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push("/pricing")}
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              Back to pricing
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ────────────────── LOADING STATE ──────────────────
  if (verifyState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Confirming your purchase…</p>
          <p className="text-xs text-muted-foreground">This usually takes a few seconds.</p>
        </div>
      </div>
    );
  }

  // ────────────────── SUCCESS STATE ──────────────────
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-4 sm:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">Trading Core</span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl space-y-8">
          {/* Hero */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 className="h-9 w-9 text-emerald-500" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome to Trading Core Pro
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              You&apos;re all set, {profile?.displayName?.split(" ")[0] || "candidate"}.
            </h1>
            <p className="max-w-md text-sm text-muted-foreground">
              Your subscription is{" "}
              {subscriptionActive ? (
                <span className="font-semibold text-emerald-500">active</span>
              ) : (
                <span className="font-semibold text-amber-500">activating</span>
              )}
              . Every limit is now lifted — let&apos;s turn this into a charter.
            </p>
            {(formattedAmount || verifyData?.customerEmail) && (
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {formattedAmount && <span>Charged {formattedAmount}</span>}
                {formattedAmount && verifyData?.customerEmail && <span>·</span>}
                {verifyData?.customerEmail && <span>Receipt sent to {verifyData.customerEmail}</span>}
              </div>
            )}
            {subscriptionPending && (
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                <Loader2 className="h-3 w-3 animate-spin" />
                Activating your account in the background — this clears in a few seconds.
              </div>
            )}
          </div>

          {/* Unlocks */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PRO_UNLOCKS.map((unlock) => (
              <div
                key={unlock.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <unlock.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{unlock.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{unlock.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Onboarding-aware next step */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {onboardingDone ? "Your next move" : "One quick step left"}
            </p>
            <h2 className="mt-2 text-lg font-bold">
              {onboardingDone
                ? "Generate your personalized study plan"
                : "Tell us about your exam, then we&apos;ll build your plan"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {onboardingDone
                ? "We&apos;ll use your weak topics, exam date, and weekly hours to map out the next 14 days."
                : "Pick your CFA level, exam date, and weekly availability — about 60 seconds."}
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium hover:bg-accent"
              >
                Skip to dashboard
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Manage your subscription anytime in <Link href="/profile" className="underline-offset-2 hover:underline">Profile → Subscription</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <CheckoutSuccessInner />
    </Suspense>
  );
}
