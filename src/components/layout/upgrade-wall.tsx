"use client";

import { useState, useEffect } from "react";
import { Lock, Sparkles, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

function getTimeUntilMidnight(): string {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

interface UpgradeWallProps {
  title: string;
  description: string;
  usedCount: number;
  limitCount: number;
  unit: string;
}

export function UpgradeWall({ title, description, usedCount, limitCount, unit }: UpgradeWallProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeUntilMidnight()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Lock className="h-7 w-7 text-primary" />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
          {usedCount}/{limitCount} {unit} used
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
          <Clock className="h-3 w-3" />
          Resets in {timeLeft}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href="/pricing"
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
        >
          <Sparkles className="h-4 w-4" />
          Subscribe now
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-[10px] text-muted-foreground">
          Unlimited access to all features. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

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
