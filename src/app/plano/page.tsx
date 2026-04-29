"use client";

import { useState } from "react";
import { useLevel } from "@/contexts/level-context";
import { mockStudyPlan } from "@/lib/mock-data";
import { StudyCalendar } from "@/components/plano/study-calendar";
import { StudyTimeline } from "@/components/plano/study-timeline";
import { GoalTracker } from "@/components/plano/goal-tracker";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Sparkles } from "lucide-react";

export default function PlanoPage() {
  const { level } = useLevel();
  const initialCompleted = mockStudyPlan.filter((b) => b.completed).length;
  const [completedBlocks, setCompletedBlocks] = useState(initialCompleted);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Plano de Estudos</h1>
            <p className="text-sm text-muted-foreground">
              CFA Level {level} — Organize sua preparação
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl">
          <Sparkles className="h-4 w-4" />
          Gerar Plano com IA
        </button>
      </div>

      <Card className="border-dashed border-primary/30 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <Sparkles className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Dica:</span> Clique em
            &quot;Gerar Plano com IA&quot; para criar um plano personalizado baseado no seu desempenho
            nos simulados e nas áreas que precisam de mais atenção.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <StudyCalendar />
          <GoalTracker completedBlocks={completedBlocks} />
        </div>
        <div className="lg:col-span-2">
          <StudyTimeline onCompletionChange={setCompletedBlocks} />
        </div>
      </div>
    </div>
  );
}
