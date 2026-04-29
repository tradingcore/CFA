"use client";

import { useLevel } from "@/contexts/level-context";
import { getWeeklyProgress, getWeeklyAccuracy } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel: string;
}

function CircularProgress({ value, size = 120, strokeWidth = 10, label, sublabel }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (v: number) => {
    if (v >= 70) return "text-emerald-500";
    if (v >= 50) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/40"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${getColor(value)} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono tabular-nums">{value}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
}

export function ProgressRing() {
  const { level } = useLevel();
  const progress = getWeeklyProgress(level);
  const accuracy = getWeeklyAccuracy(level);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Progresso Semanal</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-around pb-6">
        <CircularProgress
          value={progress}
          label="Meta Semanal"
          sublabel="questões respondidas"
        />
        <CircularProgress
          value={accuracy}
          label="Acerto Semanal"
          sublabel="taxa da semana"
        />
      </CardContent>
    </Card>
  );
}
