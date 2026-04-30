"use client";

import { useStudyProgress } from "@/contexts/study-progress-context";
import { useLevel } from "@/contexts/level-context";
import { useLevelReadiness } from "@/lib/use-readiness";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertTriangle, GraduationCap, AlarmClock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getStateBadgeClass, getStateExplanation, getStateLabel } from "@/lib/mastery";
import { InfoHint } from "@/components/ui/info-hint";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function NextStudy() {
  const { level } = useLevel();
  const { readiness, loading } = useLevelReadiness();
  const { getTopicProgress } = useStudyProgress();

  const focus = [...readiness.byTopic]
    .map((topic) => {
      const dueScore = topic.dueLosCount * 5;
      const evidence = topic.sampleSize > 0 ? topic.accuracy : 0.4;
      const weight = topic.weight || 0.05;
      const priority = (1 - evidence) * weight * 100 + dueScore;
      return { topic, priority };
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Recommended focus
          <InfoHint text="We pick the topics where putting time in will give you the biggest exam-day boost: things you struggle with that also count for a lot in the real exam, plus any topic you have not seen for too long." />
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          These are the topics most likely to move the needle on your exam result. Click Practice to drill them or Study to read the material.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {loading && (
          <p className="text-sm text-muted-foreground">Loading mastery data...</p>
        )}
        {!loading && focus.map(({ topic }) => {
          const losProgress = getTopicProgress(topic.topicId, level);
          const losPct = losProgress.total > 0
            ? Math.round((losProgress.studied / losProgress.total) * 100)
            : 0;
          const accuracyPct = topic.sampleSize > 0 ? Math.round(topic.accuracy * 100) : 0;
          return (
            <div key={topic.topicId} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{topic.fullName}</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge className={cn("cursor-help text-[9px]", getStateBadgeClass(topic.state))}>
                        {getStateLabel(topic.state)}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-left leading-relaxed">
                      {getStateExplanation(topic.state)}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-32 rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        topic.accuracy >= 0.8 ? "bg-emerald-500" : topic.accuracy >= 0.6 ? "bg-amber-400" : "bg-rose-500"
                      )}
                      style={{ width: `${accuracyPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono tabular-nums text-muted-foreground">
                    {topic.sampleSize > 0 ? `${accuracyPct}% · ${topic.sampleSize}q` : "No data yet"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
                  {losProgress.total > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {losProgress.studied}/{losProgress.total} LOS ({losPct}%)
                    </span>
                  )}
                  {topic.dueLosCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-rose-500">
                      <AlarmClock className="h-3 w-3" />
                      {topic.dueLosCount} due for review
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Link href={`/simulado?topic=${topic.topicId}`}>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer gap-1 text-[10px] transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Practice <ArrowRight className="h-3 w-3" />
                  </Badge>
                </Link>
                <Link href="/estudo">
                  <Badge
                    variant="outline"
                    className="cursor-pointer gap-1 text-[10px] transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <GraduationCap className="h-3 w-3" /> Study
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
