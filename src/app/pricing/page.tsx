"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Check, Shield, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const MONTHLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY!;
const YEARLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY!;

const features = [
  "Simulados ilimitados (Oficial + Treinamento)",
  "Questões geradas por IA com explicações",
  "Chat com IA para tirar dúvidas",
  "Progresso detalhado por LOS",
  "Plano de estudos personalizado por IA",
  "Mapa de desempenho completo",
  "Todos os níveis CFA (I, II, III)",
  "Curriculum oficial 2026 completo",
];

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  priceId: string;
  badge?: string;
  savings?: string;
  isPopular?: boolean;
  onSubscribe: (priceId: string) => void;
  loading: boolean;
  loadingPriceId: string | null;
}

function PlanCard({ name, price, period, priceId, badge, savings, isPopular, onSubscribe, loading, loadingPriceId }: PlanCardProps) {
  const isThis = loadingPriceId === priceId;
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border-2 p-6 transition-all",
        isPopular
          ? "border-primary bg-primary/5 shadow-xl scale-[1.02]"
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

      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-lg font-bold">{name}</h3>
        {savings && <p className="text-xs text-emerald-500 font-semibold">{savings}</p>}
      </div>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold font-mono">{price}</span>
        <span className="text-sm text-muted-foreground">/{period}</span>
      </div>

      <button
        onClick={() => onSubscribe(priceId)}
        disabled={loading}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all",
          isPopular
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "bg-secondary text-secondary-foreground hover:bg-accent"
        )}
      >
        {isThis ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Começar trial de 3 dias
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[10px] text-muted-foreground">
        3 dias grátis, depois {price}/{period}. Cancele quando quiser.
      </p>
    </div>
  );
}

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      router.push("/registro");
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

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 py-12 px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Escolha seu plano
        </h1>
        <p className="max-w-lg text-base text-muted-foreground">
          Comece com 3 dias grátis. Acesso completo a todos os recursos da plataforma.
          Cancele a qualquer momento.
        </p>
      </div>

      {/* Plans */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        <PlanCard
          name="Mensal"
          price="$40"
          period="mês"
          priceId={MONTHLY_PRICE_ID}
          onSubscribe={handleSubscribe}
          loading={loading}
          loadingPriceId={loadingPriceId}
        />
        <PlanCard
          name="Anual"
          price="$200"
          period="ano"
          priceId={YEARLY_PRICE_ID}
          badge="Mais popular"
          savings="Economize $280/ano (58% off)"
          isPopular
          onSubscribe={handleSubscribe}
          loading={loading}
          loadingPriceId={loadingPriceId}
        />
      </div>

      {/* Features */}
      <div className="w-full max-w-lg">
        <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Tudo incluído em ambos os planos
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="h-3 w-3 text-emerald-500" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trust */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Pagamento seguro via Stripe. PIX e cartão aceitos. Cancele quando quiser.</span>
      </div>
    </div>
  );
}
