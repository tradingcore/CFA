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
            width="lg"
            content={
              <>
                <HintBlock title="What it is">
                  An estimate of how close you are to passing the real CFA exam, from 0% to 100%.
                  Topics that count more on the real exam (like Ethics or FRA) also weigh more here.
                </HintBlock>
                <HintBlock title="Reference">
                  • <b>≥80%</b> — comfortable<br />
                  • <b>65–75%</b> — typical pass zone<br />
                  • <b>50–65%</b> — borderline, more work needed<br />
                  • <b>&lt;50%</b> — far from ready
                </HintBlock>
                <HintBlock title="Always read together with Coverage" tone="warn">
                  Readiness only looks at topics you have practiced. If Coverage is low, the
                  number is unreliable — see the Readiness ring tooltip for examples.
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
              <HintBlock title="What it is">
                Your weighted readiness across the program, 0%–100%. Topics with more weight on the
                real exam push this number more.
              </HintBlock>
              <HintBlock title="Coverage in plain words">
                Coverage = how much of the program already has practice data. If Coverage is 30%,
                the Readiness number only reflects 30% of what you will face on exam day — the
                other 70% is unknown.
              </HintBlock>
              <HintBlock title="Examples">
                • <b>Only studied Ethics, 80% accuracy</b> → Readiness <b>~80%</b>, Coverage{" "}
                <b>~15%</b>. Number is right but represents 1 topic out of 10.<br />
                • <b>1 mock with 60/90 right</b> → Readiness <b>~67%</b>, Coverage{" "}
                <b>~95%</b>. Trust this — every topic measured.<br />
                • <b>Readiness 75%, Coverage 60%</b> → Watch out: 4 untouched topics could pull
                your real score down to ~55% if they turn out weak.
              </HintBlock>
              <HintBlock title="Your numbers right now" tone={evidenceCoverage >= 80 ? "good" : "warn"}>
                {readiness.totalSampleSize === 0
                  ? "0 answers. Take a mock with 30+ questions to get a meaningful number."
                  : `${readiness.readinessPct}% over ${readiness.totalSampleSize} answers, covering ${evidenceCoverage}% of the program.`}
                {readiness.totalSampleSize > 0 && evidenceCoverage < 80
                  ? " Coverage is still low — practice the missing topics before trusting the Readiness number."
                  : readiness.totalSampleSize > 0
                  ? " Coverage is high — the number reflects you well."
                  : ""}
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
              <HintBlock title="What it is">
                Of the questions you answered this week (Mon–Sun), the share you got right.
                Range: 0%–100%.
              </HintBlock>
              <HintBlock title="Reference">
                • <b>≥70%</b> — keeping pace with the real exam<br />
                • <b>50–70%</b> — shaky, study before more drilling<br />
                • <b>&lt;50%</b> — stop and re-read the material
              </HintBlock>
              <HintBlock title="Example">
                14 right out of 20 = 70%. One week alone can be noisy — look at the trend across
                3–4 weeks instead of a single point.
              </HintBlock>
            </>
          }
        />
      </CardContent>
    </Card>
  );
}
