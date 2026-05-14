"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Check, Shield, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Currency,
  getPricingTable,
  getStoredCurrency,
  isCurrencyAvailable,
  pickCurrencyFromCountry,
  setStoredCurrency,
} from "@/lib/pricing";

const FREE_FEATURES = [
  "1 mock exam per day (5 questions)",
  "3 AI chat messages per day",
  "Study plan generation",
  "Study progress tracking",
  "2 discussion messages per question",
];

const PRO_FEATURES = [
  "Unlimited mock exams (Official + Training)",
  "Unlimited AI chat messages",
  "Unlimited question discussions",
  "AI-generated charts & visual explanations",
  "Full mock exam history & review",
  "All CFA levels (I, II, III)",
  "Complete 2026 curriculum coverage",
  "Personalized AI study plan",
  "Full performance analytics",
];

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  badge?: string;
  savings?: string;
  isPopular?: boolean;
  ctaLabel: string;
  onCta: () => void;
  loading?: boolean;
  highlight?: boolean;
  disabled?: boolean;
}

function PlanCard({
  name,
  price,
  period,
  features,
  badge,
  savings,
  isPopular,
  ctaLabel,
  onCta,
  loading,
  highlight,
  disabled,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border-2 p-6 transition-all",
        isPopular
          ? "border-primary bg-primary/5 shadow-xl lg:scale-[1.03]"
          : "border-border hover:border-primary/30"
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
            {badge}
          </span>
        </div>
      )}

      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-lg font-bold">{name}</h3>
        {savings && (
          <p className="text-xs font-semibold text-emerald-500">{savings}</p>
        )}
      </div>

      <div className="mb-6 flex items-baseline gap-1">
        <span className="font-mono text-4xl font-bold">{price}</span>
        <span className="text-sm text-muted-foreground">/{period}</span>
      </div>

      <button
        onClick={onCta}
        disabled={loading || disabled}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all disabled:opacity-50",
          highlight || isPopular
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "bg-secondary text-secondary-foreground hover:bg-accent"
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <ul className="mt-6 flex flex-col gap-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <div
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                isPopular || highlight
                  ? "bg-emerald-500/10"
                  : "bg-muted"
              )}
            >
              <Check
                className={cn(
                  "h-3 w-3",
                  isPopular || highlight
                    ? "text-emerald-500"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <span className="text-sm">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const [currency, setCurrency] = useState<Currency>("USD");
  const [currencyResolved, setCurrencyResolved] = useState(false);

  // Resolve currency once on mount: stored preference > geo detection > USD.
  useEffect(() => {
    let cancelled = false;
    const stored = getStoredCurrency();
    if (stored) {
      setCurrency(stored);
      setCurrencyResolved(true);
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/geo");
        const data = (await res.json()) as { country?: string };
        const detected = pickCurrencyFromCountry(data.country ?? null);
        // Defensive: only switch to BRL if BRL is configured. Otherwise stick
        // with USD so the UI never advertises a plan it can't sell.
        if (cancelled) return;
        if (detected === "BRL" && !isCurrencyAvailable("BRL")) {
          setCurrency("USD");
        } else {
          setCurrency(detected);
        }
      } catch {
        if (!cancelled) setCurrency("USD");
      } finally {
        if (!cancelled) setCurrencyResolved(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCurrencyChange = (next: Currency) => {
    setCurrency(next);
    setStoredCurrency(next);
  };

  const table = getPricingTable(currency);
  const brlAvailable = isCurrencyAvailable("BRL");

  const handleSubscribe = async (priceId: string) => {
    if (!priceId) {
      console.error("Missing Stripe priceId for", currency);
      return;
    }
    if (!user) {
      router.push("/register");
      return;
    }

    setLoading(true);
    setLoadingPriceId(priceId);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          userId: user.uid,
          userEmail: user.email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned:", data);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
      setLoadingPriceId(null);
    }
  };

  const handleFreeCta = () => {
    router.push(user ? "/dashboard" : "/register");
  };

  const freeDisplay = currency === "BRL" ? "R$ 0" : "$0";

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Choose your plan
        </h1>
        <p className="max-w-lg text-base text-muted-foreground">
          Start free — no credit card required. Upgrade when you&apos;re ready.
        </p>
      </div>

      {/* Currency toggle — only when both currencies are configured */}
      {brlAvailable && (
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">Currency</span>
          <div className="flex items-center rounded-full border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => handleCurrencyChange("USD")}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                currency === "USD"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              USD
            </button>
            <button
              type="button"
              onClick={() => handleCurrencyChange("BRL")}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                currency === "BRL"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              BRL
            </button>
          </div>
        </div>
      )}

      <div
        className={cn(
          "grid w-full grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3 transition-opacity",
          currencyResolved ? "opacity-100" : "opacity-0"
        )}
      >
        <PlanCard
          name="Free"
          price={freeDisplay}
          period="forever"
          features={FREE_FEATURES}
          ctaLabel="Start free"
          onCta={handleFreeCta}
          highlight
        />
        <PlanCard
          name="Monthly"
          price={table.monthly.display}
          period={table.monthly.period}
          features={PRO_FEATURES}
          ctaLabel="Start now"
          onCta={() => handleSubscribe(table.monthly.priceId)}
          loading={loading && loadingPriceId === table.monthly.priceId}
          disabled={!table.monthly.priceId}
          highlight
        />
        <PlanCard
          name="6-Month"
          price={table.semiannual.display}
          period={table.semiannual.period}
          features={PRO_FEATURES}
          badge="Most popular"
          savings={table.semiannual.savings}
          isPopular
          ctaLabel="Start now"
          onCta={() => handleSubscribe(table.semiannual.priceId)}
          loading={loading && loadingPriceId === table.semiannual.priceId}
          disabled={!table.semiannual.priceId}
        />
      </div>

      <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Secure payment via Stripe. Cancel anytime.</span>
        </div>
        {currency === "BRL" && (
          <span>Cobrança em reais — funciona com qualquer cartão brasileiro.</span>
        )}
      </div>
    </div>
  );
}
