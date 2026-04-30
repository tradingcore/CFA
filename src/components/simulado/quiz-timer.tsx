"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizTimerProps {
  isRunning: boolean;
  mode: "countdown" | "countup";
  initialSeconds?: number;
  startSeconds?: number;
  onTimeUp?: () => void;
  onTimeUpdate?: (seconds: number) => void;
}

/**
 * Timer that counts up (training) or down (official). When `startSeconds` is
 * provided, the timer resumes from that point so an in-progress mock can be
 * restored.
 */
export function QuizTimer({
  isRunning,
  mode,
  initialSeconds = 0,
  startSeconds = 0,
  onTimeUp,
  onTimeUpdate,
}: QuizTimerProps) {
  const [seconds, setSeconds] = useState(() =>
    mode === "countdown"
      ? Math.max(0, initialSeconds - startSeconds)
      : startSeconds
  );
  const timeUpFiredRef = useRef(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (mode === "countdown") {
          return Math.max(0, prev - 1);
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, mode]);

  useEffect(() => {
    if (mode === "countdown") {
      const elapsed = Math.max(0, initialSeconds - seconds);
      onTimeUpdate?.(elapsed);
      if (seconds <= 0 && !timeUpFiredRef.current) {
        timeUpFiredRef.current = true;
        onTimeUp?.();
      }
    } else {
      onTimeUpdate?.(seconds);
    }
  }, [seconds, mode, initialSeconds, onTimeUp, onTimeUpdate]);

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
