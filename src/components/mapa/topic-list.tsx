"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLevel } from "@/contexts/level-context";
import { useLevelReadiness } from "@/lib/use-readiness";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import {
  getStateBadgeClass,
  getStateBarClass,
  getStateExplanation,
  getStateLabel,
  LosState,
  ModuleMastery,
  TopicReadiness,
} from "@/lib/mastery";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoHint } from "@/components/ui/info-hint";

function StateBadge({ state, className }: { state: LosState; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge className={cn("cursor-help gap-1 text-[10px]", getStateBadgeClass(state), className)}>
          {getStateLabel(state)}
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-left leading-relaxed">
        {getStateExplanation(state)}
      </TooltipContent>
    </Tooltip>
  );
}

function ModuleRow({ module, moduleName, losDescriptions }: {
  module: ModuleMastery;
  moduleName: string;
  losDescriptions: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setExpanded((open) => !open)}
        className={cn(
          "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition-colors hover:bg-accent/50",
          expanded && "bg-accent/30"
        )}
      >
        {expanded ? (
          <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
        )}
        <span className="flex-1 text-muted-foreground">{moduleName}</span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {module.sampleSize > 0 ? `${Math.round(module.accuracy * 100)}%` : "—"} · {module.sampleSize}q
        </span>
        <StateBadge state={module.state} className="text-[9px]" />
      </button>
      {expanded && (
        <div className="ml-5 mt-1 mb-1 flex flex-col gap-1 border-l border-dashed border-border pl-3">
          {module.losMasteries.map((lm) => (
            <div key={lm.losId} className="flex items-start gap-2">
              <span className="inline-block mr-1.5 mt-0.5 rounded bg-primary/10 px-1 py-0.5 text-[9px] font-bold uppercase tabular-nums text-primary/70">
                LOS {String.fromCharCode(97 + lm.losIndex)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] leading-relaxed text-muted-foreground/85">
                  {losDescriptions[lm.losIndex]}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {lm.mastery.sampleSize > 0
                    ? `${Math.round(lm.mastery.accuracy * 100)}% · ${lm.mastery.sampleSize}q`
                    : "Not started"}
                  {lm.mastery.daysSinceLastSeen != null
                    ? ` · seen ${lm.mastery.daysSinceLastSeen}d ago`
                    : ""}
                  {lm.mastery.isDue ? " · review due" : ""}
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <span
                    className={cn(
                      "shrink-0 cursor-help rounded px-1.5 py-0.5 text-[9px] font-semibold",
                      getStateBadgeClass(lm.mastery.state)
                    )}
                  >
                    {getStateLabel(lm.mastery.state)}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-left leading-relaxed">
                  {getStateExplanation(lm.mastery.state)}
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopicList() {
  const { level } = useLevel();
  const { readiness, loading } = useLevelReadiness();
  const topicsByLevel = getTopicsForLevel(level);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const sorted = [...readiness.byTopic].sort((a, b) => {
    if (a.sampleSize === 0 && b.sampleSize > 0) return 1;
    if (b.sampleSize === 0 && a.sampleSize > 0) return -1;
    return a.accuracy - b.accuracy;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-1">
          <CardTitle className="text-base">Performance by Topic</CardTitle>
          <InfoHint text="Each topic and module has a state: Not started, In progress, Practiced, Strong, Mastered or Needs review. Hover any badge to see what triggered it." />
        </div>
        <p className="text-xs text-muted-foreground">
          {loading
            ? "Loading mastery from your activity..."
            : "States are based on accuracy and sample size. Mastered requires 12+ attempts and 80%+ accuracy with recent practice."}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(["not_started", "in_progress", "practiced", "strong", "mastered", "needs_review"] as LosState[]).map(
            (state) => (
              <StateBadge key={state} state={state} className="text-[9px]" />
            )
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {sorted.map((topic) => {
          const isExpanded = expandedTopic === topic.topicId;
          const topicData = topicsByLevel.find((t) => t.id === topic.topicId);
          const accuracyPct = topic.sampleSize > 0 ? Math.round(topic.accuracy * 100) : 0;
          return (
            <div key={topic.topicId}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.topicId)}
                  className="flex flex-1 items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-7 w-7 items-center justify-center">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{topic.fullName}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {topicData?.weightRange ?? ""} · {topic.sampleSize} questions answered
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold tabular-nums">
                          {topic.sampleSize === 0 ? "—" : `${accuracyPct}%`}
                        </span>
                        <StateBadge state={topic.state} />
                      </div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", getStateBarClass(topic.state))}
                        style={{ width: `${accuracyPct}%` }}
                      />
                    </div>
                  </div>
                </button>
                <Link
                  href={`/simulado?topic=${topic.topicId}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  title="Practice"
                >
                  <Play className="h-4 w-4" />
                </Link>
              </div>

              {isExpanded && topicData && (
                <div className="ml-12 mt-1 flex flex-col gap-1 border-l-2 border-border pl-4 pb-2">
                  {topic.modules.map((module, index) => (
                    <ModuleRow
                      key={module.moduleId}
                      module={module}
                      moduleName={topicData.modules[index]?.name || module.moduleId}
                      losDescriptions={topicData.modules[index]?.los || []}
                    />
                  ))}
                  {topic.weakModules.length > 0 && (
                    <p className="mt-2 text-[10px] text-rose-500">
                      Weak modules: {topic.weakModules.length}. Consider reviewing readings before more practice.
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
