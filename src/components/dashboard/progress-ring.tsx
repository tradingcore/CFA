"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getWeeklyQuizStats } from "@/lib/firestore";
import { useLevelReadiness } from "@/lib/use-readiness";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoHint } from "@/components/ui/info-hint";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel: string;
  hint?: string;
}

function CircularProgress({ value, size = 120, strokeWidth = 10, label, sublabel, hint }: CircularProgressProps) {
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
        <div className="flex items-center justify-center gap-1">
          <p className="text-sm font-semibold">{label}</p>
          {hint && <InfoHint text={hint} />}
        </div>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
}

export function ProgressRing() {
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

  const evidenceCoverage = Math.round(readiness.evidenceCoverage * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-1">
          <CardTitle className="text-base">Exam readiness</CardTitle>
          <InfoHint text="An estimate of how the real CFA exam would go for you today (0% = not ready, 100% = perfect). Reference: ~70% is the typical pass band, 80%+ is comfortable, below 50% means you have a lot of ground to cover. Topics with more weight in the real exam (Ethics, FRA on Level I) also weigh more here." />
        </div>
        <p className="text-xs text-muted-foreground">
          0% to 100%. Around 70% is the typical pass zone. Coverage shows how much of the program we already have data on.
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-around pb-6">
        <CircularProgress
          value={readiness.readinessPct}
          label="Readiness"
          sublabel={`${readiness.totalSampleSize} answers · ${evidenceCoverage}% of program covered`}
          hint={
            readiness.totalSampleSize === 0
              ? "Range 0%–100%. Right now it is 0% because you have not answered any question yet. Take a mock with 30+ questions so this starts to mean something. Aim for ≥70% over time."
              : `Range 0%–100%. Yours is ${readiness.readinessPct}% based on ${readiness.totalSampleSize} answers covering ${evidenceCoverage}% of the program. Reference: <50% needs a lot more work, 60–75% is the pass zone, 80%+ is comfortable. The more topics you practice, the more trustworthy this number gets.`
          }
        />
        <CircularProgress
          value={accuracy}
          label="Weekly accuracy"
          sublabel={`${stats.questionsAnswered} questions · ${stats.simuladosCompleted} mocks`}
          hint="Range 0%–100% of questions you got right this week. Reference: ≥70% means you are keeping pace with the exam, 50–70% is shaky, <50% means stop and study before more questions. One week alone can be noisy — look at the trend."
        />
      </CardContent>
    </Card>
  );
}
