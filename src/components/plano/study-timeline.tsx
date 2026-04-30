"use client";

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
  ArrowUpRight,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoHint } from "@/components/ui/info-hint";

type Block = StudyPlanDoc["blocks"][number];

const typeConfig = {
  reading: {
    label: "Reading",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    hint: "Open the module and read it carefully. The goal here is to understand the content, not to get questions right.",
  },
  practice: {
    label: "Practice",
    icon: PenTool,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    hint: "Solve questions on this subject. The more you practice, the more we learn about what you really know and what you still need to study.",
  },
  review: {
    label: "Review",
    icon: RefreshCw,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    hint: "Quickly go back to something you have studied a while ago to keep it fresh. Skim notes and do a few questions to check yourself.",
  },
  mock: {
    label: "Mock",
    icon: Trophy,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    hint: "A full simulation of the real exam: timed, no help. The most honest way to check how prepared you really are.",
  },
};

interface StudyTimelineProps {
  blocks: Block[];
  onBlockToggle?: (blockId: string, newBlocks: Block[]) => void;
}

export function StudyTimeline({ blocks, onBlockToggle }: StudyTimelineProps) {
  const toggleCompletion = (blockId: string) => {
    const newBlocks = blocks.map((b) =>
      b.id === blockId ? { ...b, completed: !b.completed } : b
    );
    onBlockToggle?.(blockId, newBlocks);
  };

  if (blocks.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Weekly Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-8 text-center">
            No plan generated yet. Click &quot;Generate Plan with AI&quot; to get started!
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
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-1">
          <CardTitle className="text-base">Weekly Plan</CardTitle>
          <InfoHint text="Each card here is a study session. Hover the colored icon to see what you should do in that session: read, practice, review or take a mock." />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {dates.map((date) => {
          const dayBlocks = groupedByDate[date];
          const isToday = date === todayStr;
          const dateLabel = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          });

          return (
            <div key={date} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold",
                  isToday ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {new Date(date + "T12:00:00").getDate()}
                </div>
                <div className="w-px flex-1 bg-border" />
              </div>

              <div className="flex flex-1 flex-col gap-2 pb-4">
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs font-medium capitalize", isToday && "text-primary font-semibold")}>
                    {dateLabel}
                  </span>
                  {isToday && <Badge className="text-[10px]">Today</Badge>}
                </div>

                {dayBlocks.map((block) => {
                  const config = typeConfig[block.type] || typeConfig.reading;
                  const losCount = block.losIds?.length ?? 0;
                  const practiceLink = block.type === "mock"
                    ? `/simulado?official=true`
                    : `/simulado?topic=${block.topicId}${block.moduleId ? `&module=${block.moduleId}` : ""}`;
                  const studyLink = `/estudo${block.moduleId ? `#${block.moduleId}` : ""}`;
                  return (
                    <div key={block.id} className={cn("flex items-start gap-3 rounded-lg border border-border p-3 transition-all", block.completed && "bg-muted/30")}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className={cn("flex h-9 w-9 shrink-0 cursor-help items-center justify-center rounded-lg", config.bg)}>
                            <config.icon className={cn("h-4 w-4", config.color)} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs text-left leading-relaxed">
                          <p className="font-semibold">{config.label}</p>
                          <p className="mt-1 text-background/85">{config.hint}</p>
                        </TooltipContent>
                      </Tooltip>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className={cn("text-sm font-medium", block.completed && "line-through text-muted-foreground")}>
                            {block.moduleName ? block.moduleName : block.topicName}
                          </p>
                          {block.moduleName && (
                            <span className="text-[10px] text-muted-foreground">{block.topicName}</span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {config.label} · {block.durationMinutes}min
                          {losCount > 0 ? ` · ${losCount} LOS targeted` : ""}
                        </p>
                        {block.description && (
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground/85">
                            {block.description}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <Link
                            href={studyLink}
                            className="inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[10px] font-medium hover:border-primary hover:text-primary"
                          >
                            <BookOpen className="h-3 w-3" />
                            Open module
                          </Link>
                          <Link
                            href={practiceLink}
                            className="inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[10px] font-medium hover:border-primary hover:text-primary"
                          >
                            <ArrowUpRight className="h-3 w-3" />
                            {block.type === "mock" ? "Start mock" : "Practice"}
                          </Link>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCompletion(block.id)}
                        className="rounded-full p-1 transition-colors hover:bg-accent"
                      >
                        {block.completed ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-muted-foreground/40 hover:text-primary" />
                        )}
                      </button>
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
