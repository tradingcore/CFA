"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { getQuizHistory, QuizResult } from "@/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileQuestion, TrendingUp, TrendingDown } from "lucide-react";

export function RecentActivity() {
  const { user } = useAuth();
  const [history, setHistory] = useState<QuizResult[]>([]);

  useEffect(() => {
    if (user) {
      getQuizHistory(user.uid, 5).then(setHistory).catch(console.error);
    }
  }, [user]);

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-4 text-center">
            No mock exams taken yet. Start one to see your history here!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {history.map((sim, index) => {
          const prevScore = history[index + 1]?.score;
          const trend = prevScore ? sim.score - prevScore : 0;
          const timeMinutes = Math.round(sim.timeSpentSeconds / 60);

          return (
            <div
              key={sim.id}
              className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileQuestion className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {sim.mode === "official" ? "Official" : "Training"} Mock · Level {sim.level}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(sim.date).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                    {" · "}{sim.totalQuestions} questions · {timeMinutes}min
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {trend !== 0 && (
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${trend > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {trend > 0 ? "+" : ""}{trend}%
                  </div>
                )}
                <Badge
                  variant={sim.score >= 70 ? "default" : sim.score >= 50 ? "secondary" : "destructive"}
                  className="font-mono tabular-nums"
                >
                  {sim.score}%
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
