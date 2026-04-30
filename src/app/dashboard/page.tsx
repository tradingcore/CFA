"use client";

import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { StudyNotes } from "@/components/dashboard/study-notes";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { WeeklySnapshot } from "@/components/dashboard/weekly-snapshot";
import { FirstSteps } from "@/components/dashboard/first-steps";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <WelcomeCard />
      <FirstSteps />
      <QuickStats />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProgressRing />
        <StudyNotes />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <WeeklySnapshot />
        <RecentActivity />
      </div>
    </div>
  );
}
