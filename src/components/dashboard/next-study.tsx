"use client";

import { useLevel } from "@/contexts/level-context";
import { useStudyProgress } from "@/contexts/study-progress-context";
import { mockTopicScores } from "@/lib/mock-data";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertTriangle, GraduationCap } from "lucide-react";
import Link from "next/link";

export function NextStudy() {
  const { level } = useLevel();
  const { getTopicProgress } = useStudyProgress();
  const scores = mockTopicScores[level];
  const topics = getTopicsForLevel(level);

  const weakest = [...scores].sort((a, b) => a.score - b.score).slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Foco Recomendado
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {weakest.map((topic) => {
          const topicData = topics.find((t) => t.id === topic.topicId);
          const losProgress = getTopicProgress(topic.topicId, level);
          const losPct = losProgress.total > 0
            ? Math.round((losProgress.studied / losProgress.total) * 100)
            : 0;

          return (
            <div
              key={topic.topicId}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{topic.topicName}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        topic.score >= 70
                          ? "bg-emerald-500"
                          : topic.score >= 50
                          ? "bg-amber-400"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${topic.score}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono tabular-nums text-muted-foreground">
                    {topic.score}%
                  </span>
                </div>
                {losProgress.total > 0 && (
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <GraduationCap className="h-3 w-3" />
                    <span>{losProgress.studied}/{losProgress.total} LOS estudados ({losPct}%)</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Link href={`/simulado?topic=${topic.topicId}`}>
                  <Badge variant="secondary" className="cursor-pointer gap-1 text-[10px] transition-colors hover:bg-primary hover:text-primary-foreground">
                    Praticar
                    <ArrowRight className="h-3 w-3" />
                  </Badge>
                </Link>
                <Link href="/estudo">
                  <Badge variant="outline" className="cursor-pointer gap-1 text-[10px] transition-colors hover:bg-primary hover:text-primary-foreground">
                    <GraduationCap className="h-3 w-3" />
                    Estudar
                  </Badge>
                </Link>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
