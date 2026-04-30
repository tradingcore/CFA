"use client";

import { StudyPlanDoc } from "@/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Block = StudyPlanDoc["blocks"][number];

interface StudyCalendarProps {
  blocks: Block[];
}

export function StudyCalendar({ blocks }: StudyCalendarProps) {
  const [monthOffset, setMonthOffset] = useState(0);

  const today = new Date();
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const studyDates = new Map<string, { completed: number; total: number }>();
  blocks.forEach((block) => {
    const existing = studyDates.get(block.date) || { completed: 0, total: 0 };
    studyDates.set(block.date, {
      completed: existing.completed + (block.completed ? 1 : 0),
      total: existing.total + 1,
    });
  });

  const monthName = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDayStatus = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const study = studyDates.get(dateStr);
    if (!study) return "none";
    if (study.completed === study.total) return "completed";
    if (study.completed > 0) return "partial";
    return "pending";
  };

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base capitalize">{monthName}</CardTitle>
          <div className="flex items-center gap-1">
            <button onClick={() => setMonthOffset((p) => p - 1)} className="rounded-lg p-1.5 hover:bg-accent">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setMonthOffset(0)} className="rounded-lg px-2 py-1 text-xs hover:bg-accent">
              Today
            </button>
            <button onClick={() => setMonthOffset((p) => p + 1)} className="rounded-lg p-1.5 hover:bg-accent">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((d) => (
            <div key={d} className="py-1 text-center text-[10px] font-medium text-muted-foreground">{d}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const status = getDayStatus(day);
            return (
              <div key={day} className={cn(
                "flex h-9 w-full items-center justify-center rounded-lg text-xs font-medium transition-colors",
                status === "completed" && "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
                status === "partial" && "bg-amber-500/20 text-amber-600 dark:text-amber-400",
                status === "pending" && "bg-blue-500/15 text-blue-600 dark:text-blue-400",
                status === "none" && "text-muted-foreground",
                isToday(day) && "ring-2 ring-primary font-bold"
              )}>
                {day}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          {[
            { label: "Completed", color: "bg-emerald-500/20" },
            { label: "Partial", color: "bg-amber-500/20" },
            { label: "Pending", color: "bg-blue-500/15" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={cn("h-3 w-3 rounded", item.color)} />
              <span className="text-[10px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
