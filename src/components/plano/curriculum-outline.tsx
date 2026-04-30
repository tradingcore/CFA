"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLevel } from "@/contexts/level-context";
import { useStudyProgress } from "@/contexts/study-progress-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { buildCurriculumIndex } from "@/lib/curriculum-numbering";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, MapPin } from "lucide-react";

interface CurriculumOutlineProps {
  currentModuleId?: string;
}

export function CurriculumOutline({ currentModuleId }: CurriculumOutlineProps) {
  const { level } = useLevel();
  const { getModuleProgress, getTopicProgress } = useStudyProgress();
  const topics = getTopicsForLevel(level);
  const curriculum = useMemo(() => buildCurriculumIndex(level), [level]);

  const currentTopicId = currentModuleId
    ? topics.find((t) => t.modules.some((m) => m.id === currentModuleId))?.id
    : null;

  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(
    () => new Set(currentTopicId ? [currentTopicId] : topics.length > 0 ? [topics[0].id] : [])
  );

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Curriculum Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0.5 p-3 pt-0">
        {topics.map((topic) => {
          const tLabel = curriculum.topicLabels.get(topic.id);
          const topicProg = getTopicProgress(topic.id, level);
          const topicPct = topicProg.total > 0
            ? Math.round((topicProg.studied / topicProg.total) * 100)
            : 0;
          const isExpanded = expandedTopics.has(topic.id);
          const hasCurrentModule = topic.modules.some((m) => m.id === currentModuleId);

          return (
            <div key={topic.id}>
              <button
                onClick={() => toggleTopic(topic.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-accent/50",
                  hasCurrentModule && "bg-primary/5"
                )}
              >
                {isExpanded
                  ? <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
                  : <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                }
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate text-xs font-medium">
                      {tLabel?.topicLabel ?? topic.name}
                    </span>
                    <span className={cn(
                      "shrink-0 font-mono text-[10px] tabular-nums",
                      topicPct === 100 ? "text-emerald-500" : topicPct > 0 ? "text-amber-500" : "text-muted-foreground"
                    )}>
                      {topicPct}%
                    </span>
                  </div>
                  <div className="mt-1 h-1 w-full rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        topicPct === 100 ? "bg-emerald-500" : topicPct > 0 ? "bg-amber-400" : "bg-transparent"
                      )}
                      style={{ width: `${topicPct}%` }}
                    />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="ml-5 flex flex-col gap-0.5 border-l border-border pl-3 pt-0.5">
                  {topic.modules.map((module) => {
                    const mLabel = curriculum.moduleLabels.get(module.id);
                    const modProg = getModuleProgress(module.id, module.los.length);
                    const isCurrent = module.id === currentModuleId;
                    const isDone = modProg.studied === modProg.total && modProg.total > 0;
                    const isStarted = modProg.studied > 0;

                    return (
                      <Link
                        key={module.id}
                        href={`/estudo?topic=${topic.id}&module=${module.id}`}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1 text-[11px] transition-colors hover:bg-accent/50",
                          isCurrent && "bg-primary/10 font-semibold text-primary"
                        )}
                      >
                        {isDone
                          ? <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-500" />
                          : isCurrent
                            ? <MapPin className="h-3 w-3 shrink-0 text-primary" />
                            : <Circle className={cn("h-3 w-3 shrink-0", isStarted ? "text-amber-400" : "text-muted-foreground/30")} />
                        }
                        <span className="truncate">
                          {mLabel?.moduleLabel ?? module.name}
                        </span>
                        <span className="ml-auto shrink-0 font-mono text-[9px] text-muted-foreground">
                          {modProg.studied}/{modProg.total}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
