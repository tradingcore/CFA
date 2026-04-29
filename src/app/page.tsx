"use client";

import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { QuickStats } from "@/components/dashboard/quick-stats";
import { NextStudy } from "@/components/dashboard/next-study";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <WelcomeCard />
      <QuickStats />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProgressRing />
        <NextStudy />
      </div>
      <RecentActivity />
    </div>
  );
}
