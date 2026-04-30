"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getWeeklyQuizStats } from "@/lib/firestore";
import { useLevelReadiness } from "@/lib/use-readiness";
import { Card, CardContent } from "@/components/ui/card";
import { InfoHint } from "@/components/ui/info-hint";
import { CheckCircle2, Target, AlarmClock, BookOpen } from "lucide-react";

export function QuickStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ questionsAnswered: 0, correctAnswers: 0, simuladosCompleted: 0 });
  const { readiness } = useLevelReadiness();

  useEffect(() => {
    if (user) {
      getWeeklyQuizStats(user.uid).then(setStats).catch(console.error);
    }
  }, [user]);

  const accuracy = stats.questionsAnswered > 0
    ? Math.round((stats.correctAnswers / stats.questionsAnswered) * 100)
    : 0;

  const dueLos = readiness.byTopic.reduce((sum, topic) => sum + topic.dueLosCount, 0);
  const practicedTopics = readiness.byTopic.filter((topic) => topic.sampleSize > 0).length;

  const items = [
    {
      label: "Questions this week",
      value: String(stats.questionsAnswered),
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      hint: "How many mock or training questions you answered between Monday and today.",
    },
    {
      label: "Accuracy this week",
      value: stats.questionsAnswered > 0 ? `${accuracy}%` : "—",
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      hint: "Correct ÷ answered for this week only. Good for trend; over a single week the sample is small.",
    },
    {
      label: "Topics with data",
      value: `${practicedTopics}/${readiness.byTopic.length}`,
      icon: BookOpen,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      hint: "How many CFA topics already have at least one answered question. Drives how much of the curriculum your readiness reflects.",
    },
    {
      label: "LOS due for review",
      value: String(dueLos),
      icon: AlarmClock,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      hint: "Learning Outcome Statements whose spaced-repetition date already passed. Refresh them before they decay further.",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold font-mono tabular-nums">{stat.value}</p>
              <div className="flex items-center gap-1">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <InfoHint text={stat.hint} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
