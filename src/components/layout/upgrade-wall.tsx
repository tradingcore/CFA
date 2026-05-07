"use client";

import { Lock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface UpgradeWallProps {
  title: string;
  description: string;
  usedCount: number;
  limitCount: number;
  unit: string;
}

/**
 * Inline upgrade prompt shown when a free user hits their usage limit.
 * Designed to be inviting rather than blocking - shows what the user gains.
 * @param title - Headline (e.g. "Limite de mensagens atingido")
 * @param description - Supporting text
 * @param usedCount - How many the user used
 * @param limitCount - The free limit
 * @param unit - Unit label (e.g. "mensagens", "questões")
 * @returns Upgrade wall component
 */
export function UpgradeWall({ title, description, usedCount, limitCount, unit }: UpgradeWallProps) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Lock className="h-7 w-7 text-primary" />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-1.5">
        <span className="text-xs font-medium text-muted-foreground">
          {usedCount}/{limitCount} {unit} usadas
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/pricing"
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
        >
          <Sparkles className="h-4 w-4" />
          Começar trial de 3 dias grátis
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-[10px] text-muted-foreground">
          Acesso completo a todos os recursos. Cancele quando quiser.
        </p>
      </div>
    </div>
  );
}

/**
 * Small inline counter showing remaining free uses.
 * @param remaining - Number of uses left
 * @param total - Total free limit
 * @param unit - Unit label
 * @returns Counter badge or null if subscribed (remaining is Infinity)
 */
export function UsageCounter({ remaining, total, unit }: { remaining: number; total: number; unit: string }) {
  if (remaining === Infinity) return null;

  const isLow = remaining <= 1;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
      isLow ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-muted text-muted-foreground"
    }`}>
      {remaining}/{total} {unit}
    </span>
  );
}
