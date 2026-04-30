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
          <HintBlock title="What it is">
            How many practice or mock questions you answered since Monday. A simple counter — bigger
            means you are putting in the reps.
          </HintBlock>
          <HintBlock title="Reference per week">
            • <b>50–150</b> — serious candidate pace<br />
            • <b>30–50</b> — light, OK if you are mostly reading<br />
            • <b>&lt;30</b> — too little, even reading-heavy weeks need practice<br />
            • <b>200+</b> — burning fuel without studying. Slow down and reread.
          </HintBlock>
          <HintBlock title="Example">
            70 questions in a week with ~70% accuracy is a healthy mix.
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
          <HintBlock title="What it is">
            Out of the questions you answered this week, the share you got right. Range: 0%–100%.
          </HintBlock>
          <HintBlock title="Reference">
            • <b>≥70%</b> — on pace<br />
            • <b>50–70%</b> — shaky<br />
            • <b>&lt;50%</b> — stop and study before more questions
          </HintBlock>
          <HintBlock title="Example">
            14 right out of 20 = 70%. A single week can swing — judge the 3–4 week trend, not one
            data point.
          </HintBlock>
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
          <HintBlock title="What it is">
            How many of the {readiness.byTopic.length} CFA topics you have already practiced at
            least once. This is what drives the Coverage on the Readiness card.
          </HintBlock>
          <HintBlock title="Reference">
            • <b>{readiness.byTopic.length}/{readiness.byTopic.length}</b> — full coverage, trust
            Readiness fully<br />
            • <b>~70%+</b> of topics — Readiness is fairly reliable<br />
            • <b>&lt;30%</b> — Readiness is mostly a guess
          </HintBlock>
          <HintBlock title="Example">
            3/{readiness.byTopic.length} means we only know your level in 3 topics. The remaining{" "}
            {readiness.byTopic.length - 3} topics could be very different. Even 5 questions on each
            untouched topic moves Coverage drastically.
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
          <HintBlock title="What it is">
            Specific learning points (LOS) you studied a while ago and the brain is starting to
            forget. They appear here based on a spaced-repetition schedule.
          </HintBlock>
          <HintBlock title="Reference">
            • <b>0</b> — on top of every refresh<br />
            • <b>5–15</b> — normal during heavy study<br />
            • <b>30+</b> — building forgetting debt; carve a dedicated review session
          </HintBlock>
          <HintBlock title="Example">
            You nailed Inventories 3 weeks ago and have not practiced since → those LOS now show as
            due. 10 minutes redoing 5 questions clears them.
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
                <InfoHint content={stat.hint} width="lg" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
