"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getWeeklyQuizStats } from "@/lib/firestore";
import { useLevelReadiness } from "@/lib/use-readiness";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HintBlock, InfoHint } from "@/components/ui/info-hint";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel: string;
  hint?: React.ReactNode;
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
          {hint && <InfoHint content={hint} width="lg" />}
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
          <InfoHint
            content={
              <>
                <HintBlock>
                  Estimate of how the real CFA exam would go for you today, 0%–100%. Topics with
                  more weight on the real exam (Ethics, FRA) push this number more.
                </HintBlock>
                <HintBlock title="Reference">
                  ≥80% comfortable · 65–75% pass zone · &lt;50% far from ready
                </HintBlock>
                <HintBlock title="Read with Coverage">
                  Only counts topics you have practiced. Hover the Readiness ring below for
                  examples.
                </HintBlock>
              </>
            }
          />
        </div>
        <p className="text-xs text-muted-foreground">
          0% to 100%. Around 70% is the typical pass zone. Always read it together with Coverage — hint below.
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-around pb-6">
        <CircularProgress
          value={readiness.readinessPct}
          label="Readiness"
          sublabel={`${readiness.totalSampleSize} answers · ${evidenceCoverage}% of program covered`}
          hint={
            <>
              <HintBlock title="What is Coverage">
                How much of the program already has practice data. Coverage 30% means the Readiness
                number reflects only 30% of what you will face on exam day.
              </HintBlock>
              <HintBlock title="Examples">
                • Studied only Ethics 80% → Readiness ~80%, Coverage ~15% (1 topic of 10).<br />
                • 1 mock 60/90 right → Readiness ~67%, Coverage ~95% — trustworthy.<br />
                • Readiness 75%, Coverage 60% → 4 untouched topics could drag real score to ~55%.
              </HintBlock>
              <HintBlock title="Your numbers">
                {readiness.totalSampleSize === 0
                  ? "0 answers. Do a mock with 30+ questions to make this meaningful."
                  : `${readiness.readinessPct}% over ${readiness.totalSampleSize} answers, ${evidenceCoverage}% covered.${
                      evidenceCoverage < 80
                        ? " Coverage still low — practice missing topics first."
                        : " Coverage high — number reflects you well."
                    }`}
              </HintBlock>
            </>
          }
        />
        <CircularProgress
          value={accuracy}
          label="Weekly accuracy"
          sublabel={`${stats.questionsAnswered} questions · ${stats.simuladosCompleted} mocks`}
          hint={
            <>
              <HintBlock>
                Of the questions you answered this week (Mon–Sun), the share you got right. 0%–100%.
              </HintBlock>
              <HintBlock title="Reference">
                ≥70% on pace · 50–70% shaky · &lt;50% stop and study
              </HintBlock>
              <HintBlock title="Example">
                14/20 right = 70%. Look at the trend over 3–4 weeks, not a single number.
              </HintBlock>
            </>
          }
        />
      </CardContent>
    </Card>
  );
}
