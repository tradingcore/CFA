"use client";

import { useLevel } from "@/contexts/level-context";
import { getWeeklyAccuracy } from "@/lib/mock-data";
import { PerformanceRadarChart } from "@/components/mapa/radar-chart";
import { TopicList } from "@/components/mapa/topic-list";
import { Badge } from "@/components/ui/badge";
import { Map } from "lucide-react";

export default function MapaPage() {
  const { level } = useLevel();
  const weeklyAccuracy = getWeeklyAccuracy(level);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Map className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Mapa de Desempenho</h1>
            <p className="text-sm text-muted-foreground">
              CFA Level {level} — Identifique seus pontos fortes e fracos
            </p>
          </div>
        </div>
        <Badge
          variant={weeklyAccuracy >= 70 ? "default" : "secondary"}
          className="font-mono text-base px-4 py-1.5"
        >
          Acerto Semanal: {weeklyAccuracy}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PerformanceRadarChart />
        <TopicList />
      </div>
    </div>
  );
}
