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

  const coveredLos = readiness.coveredLos ?? 0;
  const totalLos = readiness.totalLos ?? 365;
  const coveragePct = Math.round(readiness.evidenceCoverage * 100);
  const lowData = coveredLos < 5;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-1">
          <CardTitle className="text-base">Exam readiness</CardTitle>
          <InfoHint
            content={
              <>
                <HintBlock>
                  Your accuracy on LOS you have practiced (3+ questions each). Only counts LOS
                  with enough data to be meaningful.
                </HintBlock>
                <HintBlock title="Reference">
                  70%+ with good coverage = pass zone · Need ~2,500 questions total for reliable score
                </HintBlock>
              </>
            }
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Based on LOS with 3+ questions answered. {coveredLos}/{totalLos} LOS covered.
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-around pb-6">
        <CircularProgress
          value={readiness.readinessPct}
          label="Readiness"
          sublabel={lowData
            ? `${readiness.totalSampleSize} questions · Not enough data yet`
            : `${readiness.totalSampleSize} questions · ${coveredLos}/${totalLos} LOS covered`
          }
          hint={
            <>
              <HintBlock title="How it works">
                Readiness = your accuracy across all LOS where you answered 3+ questions.
                A LOS with only 1-2 answers is not counted — too few to be reliable.
              </HintBlock>
              <HintBlock title="Your numbers">
                {readiness.totalSampleSize === 0
                  ? "No questions answered yet. Start a mock exam to begin tracking."
                  : `${readiness.readinessPct}% accuracy over ${coveredLos} LOS (${coveragePct}% of program). ${readiness.totalSampleSize} total questions answered.${
                      coveredLos < 20
                        ? " Keep practicing — you need more LOS covered for a reliable score."
                        : coveragePct < 50
                        ? " Good start — aim to cover at least 50% of LOS."
                        : " Solid coverage — this score is getting reliable."
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
