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
      hint: "Counter from 0 upward, resets every Monday. Reference: serious candidates do 50–150 per week. Below 30 is too little; over 200 you are probably skipping the reading.",
    },
    {
      label: "Accuracy this week",
      value: stats.questionsAnswered > 0 ? `${accuracy}%` : "—",
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      hint: "Range 0%–100% of questions you got right this week. Reference: ≥70% means you are keeping pace with the exam, 50–70% is shaky, <50% means stop and study before doing more questions.",
    },
    {
      label: "Topics with data",
      value: `${practicedTopics}/${readiness.byTopic.length}`,
      icon: BookOpen,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      hint: `Goes from 0 to ${readiness.byTopic.length}. Example: 3/${readiness.byTopic.length} means we only know your level in 3 topics — your readiness is mostly a guess. Aim to cover all ${readiness.byTopic.length} so the readiness number actually reflects you.`,
    },
    {
      label: "LOS due for review",
      value: String(dueLos),
      icon: AlarmClock,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      hint: "Counter from 0 upward. Reference: 0 means you are on top of every refresh, ~10 is normal during heavy study, 30+ means you are accumulating forgetting debt. Try to keep it as low as possible the closer you get to the exam.",
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
