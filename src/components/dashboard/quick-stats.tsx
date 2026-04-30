"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getWeeklyQuizStats } from "@/lib/firestore";
import { useLevelReadiness } from "@/lib/use-readiness";
import { Card, CardContent } from "@/components/ui/card";
import { HintBlock, InfoHint } from "@/components/ui/info-hint";
import { ReactNode } from "react";
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

  const items: {
    label: string;
    value: string;
    icon: typeof CheckCircle2;
    color: string;
    bg: string;
    hint: ReactNode;
  }[] = [
    {
      label: "Questions this week",
      value: String(stats.questionsAnswered),
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      hint: (
        <>
          <HintBlock>Practice + mock questions answered since Monday.</HintBlock>
          <HintBlock title="Reference per week">
            50–150 healthy · &lt;30 too little · 200+ burning fuel without studying
          </HintBlock>
        </>
      ),
    },
    {
      label: "Accuracy this week",
      value: stats.questionsAnswered > 0 ? `${accuracy}%` : "—",
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      hint: (
        <>
          <HintBlock>Share of this week's questions you got right. 0%–100%.</HintBlock>
          <HintBlock title="Reference">
            ≥70% on pace · 50–70% shaky · &lt;50% stop and study
          </HintBlock>
          <HintBlock title="Example">14/20 = 70%. Watch the 3–4 week trend, not a single point.</HintBlock>
        </>
      ),
    },
    {
      label: "Topics with data",
      value: `${practicedTopics}/${readiness.byTopic.length}`,
      icon: BookOpen,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      hint: (
        <>
          <HintBlock>
            Topics where you already answered at least one question. Drives the Coverage on the
            Readiness card.
          </HintBlock>
          <HintBlock title="Example">
            3/{readiness.byTopic.length} means we only know your level in 3 of {readiness.byTopic.length} topics
            — Readiness becomes a guess. Aim for full coverage.
          </HintBlock>
        </>
      ),
    },
    {
      label: "LOS due for review",
      value: String(dueLos),
      icon: AlarmClock,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      hint: (
        <>
          <HintBlock>
            Learning points (LOS) you studied a while ago and the brain is starting to forget.
          </HintBlock>
          <HintBlock title="Reference">
            0 great · 5–15 normal · 30+ forgetting debt — schedule a review session
          </HintBlock>
        </>
      ),
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
                <InfoHint content={stat.hint} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
