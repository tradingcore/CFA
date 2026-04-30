export type StudyDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface WeeklyStudyAvailabilityOverride {
  studyDays: StudyDay[];
  weeklyHoursGoal?: number;
}

export const STUDY_DAY_OPTIONS: { id: StudyDay; label: string; shortLabel: string }[] = [
  { id: "mon", label: "Monday", shortLabel: "Mon" },
  { id: "tue", label: "Tuesday", shortLabel: "Tue" },
  { id: "wed", label: "Wednesday", shortLabel: "Wed" },
  { id: "thu", label: "Thursday", shortLabel: "Thu" },
  { id: "fri", label: "Friday", shortLabel: "Fri" },
  { id: "sat", label: "Saturday", shortLabel: "Sat" },
  { id: "sun", label: "Sunday", shortLabel: "Sun" },
];

export const DEFAULT_STUDY_DAYS: StudyDay[] = ["mon", "tue", "wed", "thu", "fri"];

export function normalizeStudyDays(days?: StudyDay[]): StudyDay[] {
  if (!days?.length) return DEFAULT_STUDY_DAYS;
  const valid = new Set(STUDY_DAY_OPTIONS.map((day) => day.id));
  const normalized = days.filter((day): day is StudyDay => valid.has(day));
  return normalized.length > 0 ? normalized : DEFAULT_STUDY_DAYS;
}

export function getHoursPerStudyDay(weeklyHours: number, studyDays: StudyDay[]): number {
  if (studyDays.length === 0) return 0;
  return weeklyHours / studyDays.length;
}

export function formatHours(hours: number): string {
  if (!Number.isFinite(hours)) return "0h";
  return Number.isInteger(hours) ? `${hours}h` : `${hours.toFixed(1)}h`;
}

export function getWeekStartDate(date = new Date()): string {
  const current = new Date(date);
  const day = current.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  current.setDate(current.getDate() + diffToMonday);
  current.setHours(0, 0, 0, 0);
  return current.toISOString().split("T")[0];
}

export function getStudyDayLabels(studyDays: StudyDay[]): string {
  const labels = STUDY_DAY_OPTIONS
    .filter((day) => studyDays.includes(day.id))
    .map((day) => day.shortLabel);
  return labels.join(", ");
}
