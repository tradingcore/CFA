"use client";

import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizTimerProps {
  isRunning: boolean;
  mode: "countdown" | "countup";
  initialSeconds?: number;
  onTimeUp?: () => void;
  onTimeUpdate?: (seconds: number) => void;
}

/**
 * Timer that counts up (training) or down (official).
 * @param isRunning - Whether the timer is active
 * @param mode - "countdown" for official mode, "countup" for training
 * @param initialSeconds - Starting seconds for countdown mode
 * @param onTimeUp - Callback when countdown reaches zero
 * @param onTimeUpdate - Callback each second with current elapsed/remaining
 * @returns Timer display component
 */
export function QuizTimer({ isRunning, mode, initialSeconds = 0, onTimeUp, onTimeUpdate }: QuizTimerProps) {
  const [seconds, setSeconds] = useState(mode === "countdown" ? initialSeconds : 0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (mode === "countdown") {
          const next = prev - 1;
          onTimeUpdate?.(initialSeconds - next);
          if (next <= 0) {
            onTimeUp?.();
            clearInterval(interval);
            return 0;
          }
          return next;
        }
        const next = prev + 1;
        onTimeUpdate?.(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, mode, initialSeconds, onTimeUp, onTimeUpdate]);

  const displaySeconds = seconds;
  const minutes = Math.floor(Math.abs(displaySeconds) / 60);
  const secs = Math.abs(displaySeconds) % 60;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const isLowTime = mode === "countdown" && displaySeconds < 120 && displaySeconds > 0;
  const isVeryLow = mode === "countdown" && displaySeconds < 30 && displaySeconds > 0;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-4 py-2 font-mono transition-colors",
        isVeryLow ? "border-red-500 bg-red-500/10 text-red-500" :
        isLowTime ? "border-amber-500 bg-amber-500/10 text-amber-500" :
        "border-border bg-card text-foreground"
      )}
    >
      {isLowTime ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4 text-muted-foreground" />}
      <span className="text-lg tabular-nums font-semibold">
        {hours > 0 && `${hours}:`}
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  );
}
