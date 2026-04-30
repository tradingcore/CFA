"use client";

import { cn } from "@/lib/utils";
import {
  formatHours,
  getHoursPerStudyDay,
  STUDY_DAY_OPTIONS,
  StudyDay,
} from "@/lib/study-availability";
import { AlertTriangle, CalendarDays } from "lucide-react";

interface StudyDaysSelectorProps {
  selectedDays: StudyDay[];
  weeklyHours: number;
  onChange: (days: StudyDay[]) => void;
  compact?: boolean;
}

export function StudyDaysSelector({
  selectedDays,
  weeklyHours,
  onChange,
  compact = false,
}: StudyDaysSelectorProps) {
  const hoursPerDay = getHoursPerStudyDay(weeklyHours, selectedDays);
  const heavyDailyLoad = hoursPerDay >= 5;

  const toggleDay = (day: StudyDay) => {
    if (selectedDays.includes(day)) {
      onChange(selectedDays.filter((d) => d !== day));
    } else {
      onChange([...selectedDays, day]);
    }
  };

  return (
    <div className={cn("space-y-3", compact && "space-y-2")}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <CalendarDays className="h-4 w-4 text-primary" />
        Study days
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {STUDY_DAY_OPTIONS.map((day) => {
          const active = selectedDays.includes(day.id);
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => toggleDay(day.id)}
              className={cn(
                "rounded-lg border px-2 py-2 text-xs font-semibold transition-all",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
              aria-pressed={active}
              title={day.label}
            >
              {day.shortLabel}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card/60 px-4 py-3">
        {selectedDays.length > 0 ? (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">
              {formatHours(weeklyHours)} per week across {selectedDays.length} study day
              {selectedDays.length === 1 ? "" : "s"}
            </p>
            <p className="text-xs text-muted-foreground">
              That is about{" "}
              <span className="font-semibold text-foreground">
                {formatHours(hoursPerDay)} per study day
              </span>
              . Treat it as an average, not a rigid daily rule.
            </p>
          </div>
        ) : (
          <p className="text-sm text-destructive">Select at least one study day.</p>
        )}
      </div>

      {heavyDailyLoad && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>High daily load. If possible, spread study time across more days.</span>
        </div>
      )}
    </div>
  );
}
