"use client";

import { useLevel } from "@/contexts/level-context";
import { mockWeeklyStats } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle2 } from "lucide-react";

export function QuickStats() {
  const { level } = useLevel();
  const stats = mockWeeklyStats[level];
  const accuracy = stats.questionsAnswered > 0
    ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100)
    : 0;

  const items = [
    {
      label: "Questões esta semana",
      value: stats.questionsAnswered,
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Acerto esta semana",
      value: `${accuracy}%`,
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
