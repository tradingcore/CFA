"use client";

import { useMemo } from "react";
import { StudyPlanDoc } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BookOpen, PenTool, RefreshCw, Trophy } from "lucide-react";

type Block = StudyPlanDoc["blocks"][number];

const typeIcons = {
  reading: { icon: BookOpen, letter: "R", color: "bg-blue-500/20 text-blue-600 dark:text-blue-400" },
  practice: { icon: PenTool, letter: "P", color: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" },
  review: { icon: RefreshCw, letter: "Rev", color: "bg-amber-500/20 text-amber-600 dark:text-amber-400" },
  mock: { icon: Trophy, letter: "Mock", color: "bg-violet-500/20 text-violet-600 dark:text-violet-400" },
};

interface WeeklyOverviewProps {
  blocks: Block[];
}

export function WeeklyOverview({ blocks }: WeeklyOverviewProps) {
  const overview = useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const days: {
      date: string;
      label: string;
      dayNum: number;
      isToday: boolean;
      totalMin: number;
      types: Set<string>;
      hasMock: boolean;
      topicNames: string[];
    }[] = [];

    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const dayBlocks = blocks.filter((b) => b.date === dateStr);
      const types = new Set(dayBlocks.map((b) => b.type));
      const topicNames = [...new Set(dayBlocks.map((b) => b.topicName).filter(Boolean))];

      days.push({
        date: dateStr,
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        isToday: dateStr === todayStr,
        totalMin: dayBlocks.reduce((s, b) => s + b.durationMinutes, 0),
        types,
        hasMock: types.has("mock"),
        topicNames,
      });
    }

    const nextMock = days.find((d) => d.hasMock && !d.isToday);
    const mockInDays = nextMock
      ? Math.round((new Date(nextMock.date).getTime() - today.getTime()) / 86400000)
      : null;

    let streakTopic = "";
    let streakCount = 0;
    for (let i = 0; i < days.length; i++) {
      if (days[i].topicNames.length === 1) {
        const t = days[i].topicNames[0];
        if (t === streakTopic) {
          streakCount++;
        } else {
          streakTopic = t;
          streakCount = 1;
        }
      } else {
        streakTopic = "";
        streakCount = 0;
      }
    }
    const longestStreak = streakCount >= 3 ? { topic: streakTopic, days: streakCount } : null;

    return { days, mockInDays, longestStreak };
  }, [blocks]);

  const formatMin = (m: number) => {
    if (m === 0) return "—";
    const h = Math.floor(m / 60);
    const min = m % 60;
    if (h === 0) return `${min}m`;
    if (min === 0) return `${h}h`;
    return `${h}h${min}m`;
  };

  return (
    <Card>
      <CardContent className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground">Next 2 weeks</p>
          <div className="flex items-center gap-3">
            {overview.mockInDays !== null && overview.mockInDays > 0 && (
              <span className="rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                Mock in {overview.mockInDays}d
              </span>
            )}
            {overview.longestStreak && (
              <span className="text-[10px] text-muted-foreground">
                {overview.longestStreak.days}d on {overview.longestStreak.topic}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:grid-cols-14">
          {overview.days.map((day) => (
            <div
              key={day.date}
              className={cn(
                "flex flex-col items-center rounded-lg px-1 py-1.5 text-center transition-colors",
                day.isToday && "ring-2 ring-primary",
                day.totalMin > 0 ? "bg-muted/50" : "bg-transparent"
              )}
            >
              <span className="text-[9px] font-medium text-muted-foreground">{day.label}</span>
              <span className={cn(
                "text-[10px] font-bold tabular-nums",
                day.totalMin > 0 ? "text-foreground" : "text-muted-foreground/40"
              )}>
                {formatMin(day.totalMin)}
              </span>
              {day.totalMin > 0 && (
                <div className="mt-0.5 flex flex-wrap justify-center gap-0.5">
                  {Array.from(day.types).map((type) => {
                    const tc = typeIcons[type as keyof typeof typeIcons];
                    if (!tc) return null;
                    const fullName = type.charAt(0).toUpperCase() + type.slice(1);
                    return (
                      <Tooltip key={type}>
                        <TooltipTrigger>
                          <span className={cn("rounded px-1 py-0.5 text-[8px] font-bold leading-none", tc.color)}>
                            {tc.letter}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          {fullName}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
