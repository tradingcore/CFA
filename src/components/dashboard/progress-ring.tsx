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
          <InfoHint text="0%–100% estimate of how the real CFA exam would go for you today. Reference: ~70% is the typical pass band, 80%+ is comfortable, <50% needs a lot more work. Important: only topics you have practiced count toward this number. Always read it together with Coverage to understand if it really represents you." />
        </div>
        <p className="text-xs text-muted-foreground">
          0% to 100%. Around 70% is the typical pass zone. Read it together with Coverage — see hint below.
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-around pb-6">
        <CircularProgress
          value={readiness.readinessPct}
          label="Readiness"
          sublabel={`${readiness.totalSampleSize} answers · ${evidenceCoverage}% of program covered`}
          hint={
            readiness.totalSampleSize === 0
              ? "0%–100%. Right now it is 0% because you have not answered any question. Aim for ≥70% over time. Take a mock with 30+ questions so this starts to mean something."
              : `0%–100%. Yours: ${readiness.readinessPct}% across ${readiness.totalSampleSize} answers (${evidenceCoverage}% of program covered). Example to read it right: if you only studied Ethics and got 80%, this card would still show ~80% Readiness — but Coverage would only be ~15% (1 topic out of 10), meaning the number represents only a small slice of what you'll face. Trust the Readiness more as Coverage approaches 100%.`
          }
        />
        <CircularProgress
          value={accuracy}
          label="Weekly accuracy"
          sublabel={`${stats.questionsAnswered} questions · ${stats.simuladosCompleted} mocks`}
          hint="0%–100% of questions you got right this week. Reference: ≥70% keeps pace with the exam, 50–70% is shaky, <50% stop and study before more questions. Example: 14 right out of 20 = 70%. One week alone can be noisy — look at the trend across several weeks."
        />
      </CardContent>
    </Card>
  );
}
