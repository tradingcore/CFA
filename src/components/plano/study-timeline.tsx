"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { StudyPlanDoc } from "@/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  PenTool,
  RefreshCw,
  CheckCircle2,
  Circle,
  Trophy,
  ArrowRight,
  BookMarked,
  AlertTriangle,
  CalendarClock,
  SkipForward,
  MoreVertical,
  Trash2,
  ArrowRightLeft,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useStudyProgress } from "@/contexts/study-progress-context";
import { useLevel } from "@/contexts/level-context";
import { buildCurriculumIndex } from "@/lib/curriculum-numbering";

type Block = StudyPlanDoc["blocks"][number];

const typeConfig = {
  reading: {
    label: "Reading",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    verb: "Read and understand the LOS listed below.",
  },
  practice: {
    label: "Practice",
    icon: PenTool,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    verb: "Answer practice questions on this material.",
  },
  review: {
    label: "Review",
    icon: RefreshCw,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    verb: "Refresh what you studied earlier before you forget.",
  },
  mock: {
    label: "Mock Exam",
    icon: Trophy,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    verb: "Full exam simulation under timed conditions.",
  },
};

interface StudyTimelineProps {
  blocks: Block[];
  dailyBudgetMin?: number;
  onBlockToggle?: (blockId: string, newBlocks: Block[]) => void;
  onReschedule?: (blockIds: string[], newDate: string, cascade?: boolean) => void;
  onSkip?: (blockIds: string[]) => void;
  onDeleteBlock?: (blockId: string) => void;
  onMoveBlock?: (blockId: string, newDate: string, cascade?: boolean) => void;
}

export function StudyTimeline({ blocks, dailyBudgetMin = 120, onBlockToggle, onReschedule, onSkip, onDeleteBlock, onMoveBlock }: StudyTimelineProps) {
  const { markLOSStudied } = useStudyProgress();
  const { level } = useLevel();
  const [markedBlocks, setMarkedBlocks] = useState<Set<string>>(new Set());
  const [moveMenuBlockId, setMoveMenuBlockId] = useState<string | null>(null);
  const [cascadeOn, setCascadeOn] = useState(true);

  const curriculum = useMemo(() => buildCurriculumIndex(level), [level]);
  const todayStr = new Date().toISOString().split("T")[0];
  const overdueBlocks = blocks.filter((b) => b.date < todayStr && !b.completed);
  const hasOverdue = overdueBlocks.length > 0;

  const toggleCompletion = (blockId: string) => {
    const newBlocks = blocks.map((b) =>
      b.id === blockId ? { ...b, completed: !b.completed } : b
    );
    onBlockToggle?.(blockId, newBlocks);
  };

  const handleMarkStudied = (block: Block) => {
    if (!block.losIds || block.losIds.length === 0) return;
    markLOSStudied(block.losIds);
    setMarkedBlocks((prev) => new Set(prev).add(block.id));
  };

  const resolvedLos = (losId: string) => {
    const info = curriculum.losLabels.get(losId);
    if (!info) return { number: losId, description: "" };
    return info;
  };

  const resolvedModule = (moduleId: string) => {
    return curriculum.moduleLabels.get(moduleId)?.moduleLabel ?? moduleId;
  };

  const resolvedTopic = (topicId: string) => {
    return curriculum.topicLabels.get(topicId)?.topicLabel ?? topicId;
  };

  if (blocks.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Study Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-muted-foreground">
            No plan generated yet. Click &quot;Generate Plan&quot; to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  const groupedByDate = blocks.reduce<Record<string, Block[]>>((acc, block) => {
    if (!acc[block.date]) acc[block.date] = [];
    acc[block.date].push(block);
    return acc;
  }, {});

  const dates = Object.keys(groupedByDate).sort();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Study Plan</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {hasOverdue && (
          <div className="flex flex-col gap-2 rounded-xl border-2 border-amber-500/40 bg-amber-500/10 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  {overdueBlocks.length} overdue {overdueBlocks.length === 1 ? "block" : "blocks"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onReschedule?.(overdueBlocks.map((b) => b.id), todayStr, cascadeOn)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                >
                  <CalendarClock className="h-3 w-3" />
                  Move to today
                </button>
                <button
                  onClick={() => onSkip?.(overdueBlocks.map((b) => b.id))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
                >
                  <SkipForward className="h-3 w-3" />
                  Skip all
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-[11px] text-amber-700 dark:text-amber-300">
              <input
                type="checkbox"
                checked={cascadeOn}
                onChange={(e) => setCascadeOn(e.target.checked)}
                className="h-3 w-3 accent-amber-600"
              />
              Adjust following days to fit daily time budget
            </label>
          </div>
        )}
        {dates.map((date) => {
          const dayBlocks = groupedByDate[date];
          const isToday = date === todayStr;
          const isPast = date < todayStr;
          const dateLabel = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          });

          const dayTotalMin = dayBlocks.reduce((s, b) => s + b.durationMinutes, 0);
          const dayByType: Record<string, number> = {};
          dayBlocks.forEach((b) => {
            dayByType[b.type] = (dayByType[b.type] || 0) + b.durationMinutes;
          });
          const formatMin = (m: number) => {
            const h = Math.floor(m / 60);
            const min = m % 60;
            if (h === 0) return `${min}min`;
            if (min === 0) return `${h}h`;
            return `${h}h ${min}min`;
          };
          const typeBreakdown = Object.entries(dayByType)
            .map(([type, min]) => `${formatMin(min)} ${type}`)
            .join(" · ");

          return (
            <div key={date} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold",
                  isToday ? "bg-primary text-primary-foreground" : isPast ? "bg-muted/50 text-muted-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {new Date(date + "T12:00:00").getDate()}
                </div>
                <div className="w-px flex-1 bg-border" />
              </div>

              <div className="flex flex-1 flex-col gap-2 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-medium capitalize", isToday && "font-semibold text-primary")}>
                      {dateLabel}
                    </span>
                    {isToday && <Badge className="text-[10px]">Today</Badge>}
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-semibold tabular-nums text-foreground">
                      {formatMin(dayTotalMin)}
                    </span>
                    <p className="text-[10px] text-muted-foreground">{typeBreakdown}</p>
                  </div>
                </div>

                {dayBlocks.map((block) => {
                  const config = typeConfig[block.type] || typeConfig.reading;
                  const losCount = block.losIds?.length ?? 0;
                  const alreadyMarked = markedBlocks.has(block.id);

                  const practiceParams = new URLSearchParams();
                  if (block.type === "mock") {
                    practiceParams.set("official", "true");
                  } else {
                    practiceParams.set("topic", block.topicId);
                    if (block.moduleId) practiceParams.set("module", block.moduleId);
                  }
                  const practiceLink = `/simulado?${practiceParams.toString()}`;

                  const moduleLabel = block.moduleId ? resolvedModule(block.moduleId) : null;
                  const topicLabel = resolvedTopic(block.topicId);

                  return (
                    <div key={block.id} className={cn(
                      "flex items-start gap-3 rounded-xl border border-border p-4 transition-all",
                      block.completed && "border-emerald-500/30 bg-emerald-500/5"
                    )}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className={cn("flex h-9 w-9 shrink-0 cursor-help items-center justify-center rounded-lg", config.bg)}>
                            <config.icon className={cn("h-4 w-4", config.color)} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs text-left">
                          <p className="font-semibold">{config.label}</p>
                          <p className="mt-1 text-background/85">{config.verb}</p>
                        </TooltipContent>
                      </Tooltip>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">
                            {config.label} · {block.durationMinutes}min
                          </Badge>
                        </div>

                        <p className={cn(
                          "mt-1.5 text-sm font-semibold",
                          block.completed && "text-muted-foreground line-through"
                        )}>
                          {moduleLabel || topicLabel}
                        </p>

                        {moduleLabel && (
                          <p className="text-xs text-muted-foreground">{topicLabel}</p>
                        )}

                        {block.description && (
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground/85">
                            {block.description}
                          </p>
                        )}

                        {losCount > 0 && (
                          <div className="mt-2.5 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                              LOS to cover
                            </p>
                            <ul className="space-y-1">
                              {block.losIds!.map((losId) => {
                                const los = resolvedLos(losId);
                                return (
                                  <li key={losId} className="text-xs leading-relaxed">
                                    <span className="mr-1.5 font-mono font-semibold text-primary">
                                      {los.number}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {los.description
                                        ? los.description.charAt(0).toUpperCase() + los.description.slice(1)
                                        : losId}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {!block.completed && block.type !== "reading" && (
                            <Link
                              href={practiceLink}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:opacity-90"
                            >
                              {block.type === "mock" ? "Start Mock" : "Start Practice"}
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          )}

                          {losCount > 0 && block.completed && !alreadyMarked && (
                            <button
                              onClick={() => handleMarkStudied(block)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
                            >
                              <BookMarked className="h-3 w-3" />
                              Mark {losCount} LOS as studied
                            </button>
                          )}

                          {alreadyMarked && (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                              <CheckCircle2 className="h-3 w-3" />
                              Progress updated
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col items-center gap-1">
                        <button
                          onClick={() => toggleCompletion(block.id)}
                          className="rounded-full p-1 transition-colors hover:bg-accent"
                          title={block.completed ? "Mark as incomplete" : "Mark as done"}
                        >
                          {block.completed ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground/40 hover:text-primary" />
                          )}
                        </button>

                        <div className="relative">
                          <button
                            onClick={() => setMoveMenuBlockId(moveMenuBlockId === block.id ? null : block.id)}
                            className="rounded p-1 text-muted-foreground/40 transition-colors hover:bg-accent hover:text-foreground"
                            title="Actions"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {moveMenuBlockId === block.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setMoveMenuBlockId(null)}
                              />
                              <div className="absolute right-0 top-8 z-20 w-56 rounded-xl border border-border bg-card p-1 shadow-xl">
                                {dates
                                  .filter((d) => d !== block.date && d >= todayStr)
                                  .slice(0, 6)
                                  .map((d) => {
                                    const usedMin = (groupedByDate[d] || []).reduce((s, b) => s + b.durationMinutes, 0);
                                    const fmtUsed = usedMin > 0 ? `${Math.floor(usedMin / 60)}h${usedMin % 60 > 0 ? `${usedMin % 60}m` : ""}` : "0h";
                                    const fmtBudget = `${Math.floor(dailyBudgetMin / 60)}h${dailyBudgetMin % 60 > 0 ? `${dailyBudgetMin % 60}m` : ""}`;
                                    return (
                                      <button
                                        key={d}
                                        onClick={() => {
                                          onMoveBlock?.(block.id, d, cascadeOn);
                                          setMoveMenuBlockId(null);
                                        }}
                                        className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-xs hover:bg-accent"
                                      >
                                        <span className="flex items-center gap-1.5">
                                          <ArrowRightLeft className="h-3 w-3" />
                                          {new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
                                        </span>
                                        <span className={cn(
                                          "font-mono text-[10px]",
                                          usedMin >= dailyBudgetMin ? "text-amber-500" : "text-muted-foreground"
                                        )}>
                                          {fmtUsed}/{fmtBudget}
                                        </span>
                                      </button>
                                    );
                                  })}
                                <div className="my-1 border-t border-border" />
                                <button
                                  onClick={() => {
                                    onDeleteBlock?.(block.id);
                                    setMoveMenuBlockId(null);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  Remove from plan
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
