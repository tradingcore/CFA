"use client";

import { StudyPlanDoc } from "@/lib/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookOpen, PenTool, RefreshCw, CheckCircle2, Circle } from "lucide-react";

type Block = StudyPlanDoc["blocks"][number];

const typeConfig = {
  reading: { label: "Leitura", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
  practice: { label: "Prática", icon: PenTool, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  review: { label: "Revisão", icon: RefreshCw, color: "text-amber-500", bg: "bg-amber-500/10" },
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
          <CardTitle className="text-base">Plano da Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-8 text-center">
            Nenhum plano gerado ainda. Clique em &quot;Gerar Plano com IA&quot; para começar!
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
        <CardTitle className="text-base">Plano da Semana</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {dates.map((date) => {
          const dayBlocks = groupedByDate[date];
          const isToday = date === todayStr;
          const dateLabel = new Date(date + "T12:00:00").toLocaleDateString("pt-BR", {
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
                  {isToday && <Badge className="text-[10px]">Hoje</Badge>}
                </div>

                {dayBlocks.map((block) => {
                  const config = typeConfig[block.type] || typeConfig.reading;
                  return (
                    <div key={block.id} className={cn("flex items-center gap-3 rounded-lg border border-border p-3 transition-all", block.completed && "bg-muted/30")}>
                      <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", config.bg)}>
                        <config.icon className={cn("h-4 w-4", config.color)} />
                      </div>
                      <div className="flex-1">
                        <p className={cn("text-sm font-medium", block.completed && "line-through text-muted-foreground")}>
                          {block.topicName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {config.label} · {block.durationMinutes}min
                          {block.description ? ` · ${block.description}` : ""}
                        </p>
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
