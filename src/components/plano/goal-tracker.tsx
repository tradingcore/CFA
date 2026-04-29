"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getWeeklyQuizStats } from "@/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface GoalTrackerProps {
  completedBlocks?: number;
}

interface WeeklyGoal {
  id: string;
  description: string;
  current: number;
  target: number;
  unit: string;
}

export function GoalTracker({ completedBlocks }: GoalTrackerProps) {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ questionsAnswered: 0, simuladosCompleted: 0 });

  useEffect(() => {
    if (user) {
      getWeeklyQuizStats(user.uid).then(setStats).catch(console.error);
    }
  }, [user]);

  const weeklyTarget = (profile?.weeklyHoursGoal || 15) * 4;

  const goals: WeeklyGoal[] = [
    { id: "g-1", description: "Questões respondidas", current: stats.questionsAnswered, target: weeklyTarget, unit: "questões" },
    { id: "g-2", description: "Simulados completos", current: stats.simuladosCompleted, target: 3, unit: "simulados" },
    { id: "g-3", description: "Blocos de estudo", current: completedBlocks || 0, target: 10, unit: "blocos" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="h-4 w-4 text-primary" />
          Metas da Semana
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {goals.map((goal) => {
          const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
          return (
            <div key={goal.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{goal.description}</span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {goal.current}/{goal.target} {goal.unit}
                </span>
              </div>
              <Progress value={percent} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
