"use client";

import { mockWeeklyGoals } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface GoalTrackerProps {
  completedBlocks?: number;
}

/**
 * Displays weekly study goals with progress bars.
 * @param completedBlocks - Number of study blocks completed (updates "Tópicos revisados" dynamically)
 * @returns Goal tracker card component
 */
export function GoalTracker({ completedBlocks }: GoalTrackerProps) {
  const goals = mockWeeklyGoals.map((goal) => {
    if (goal.id === "g-3" && completedBlocks !== undefined) {
      return { ...goal, current: completedBlocks };
    }
    return goal;
  });

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
