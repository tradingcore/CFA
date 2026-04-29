"use client";

import { useState } from "react";
import { useLevel } from "@/contexts/level-context";
import { mockTopicScores } from "@/lib/mock-data";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, Minus, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function getScoreBarColor(score: number): string {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-400";
  return "bg-red-500";
}

function getScoreBadge(score: number) {
  if (score >= 70) return { label: "Domina", variant: "default" as const, icon: TrendingUp, textColor: "text-emerald-700 dark:text-emerald-400" };
  if (score >= 50) return { label: "Atenção", variant: "secondary" as const, icon: Minus, textColor: "text-amber-700 dark:text-amber-400" };
  return { label: "Precisa melhorar", variant: "destructive" as const, icon: TrendingDown, textColor: "text-red-700 dark:text-red-400" };
}

export function TopicList() {
  const { level } = useLevel();
  const scores = mockTopicScores[level];
  const topics = getTopicsForLevel(level);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const sortedScores = [...scores].sort((a, b) => a.score - b.score);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Desempenho por Tópico</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {sortedScores.map((topicScore) => {
          const badge = getScoreBadge(topicScore.score);
          const isExpanded = expandedTopic === topicScore.topicId;
          const topicData = topics.find((t) => t.id === topicScore.topicId);

          return (
            <div key={topicScore.topicId}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setExpandedTopic(isExpanded ? null : topicScore.topicId);
                    setExpandedModule(null);
                  }}
                  className="flex flex-1 items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
                >
                  <div className="flex h-7 w-7 items-center justify-center">
                    {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{topicScore.topicName}</span>
                      <div className="flex items-center gap-2">
                        <span className={cn("font-mono text-sm tabular-nums font-bold", badge.textColor)}>{topicScore.score}%</span>
                        <Badge variant={badge.variant} className="gap-1 text-[10px]">
                          <badge.icon className="h-3 w-3" />
                          {badge.label}
                        </Badge>
                      </div>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted">
                      <div className={cn("h-full rounded-full transition-all duration-500", getScoreBarColor(topicScore.score))} style={{ width: `${topicScore.score}%` }} />
                    </div>
                  </div>
                </button>

                <Link
                  href={`/simulado?topic=${topicScore.topicId}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  title="Praticar este tópico"
                >
                  <Play className="h-4 w-4" />
                </Link>
              </div>

              {isExpanded && topicData && (
                <div className="ml-12 mt-1 flex flex-col gap-1 border-l-2 border-border pl-4 pb-2">
                  {topicData.modules.map((mod) => {
                    const isModExpanded = expandedModule === mod.id;
                    const hasLos = mod.los && mod.los.length > 0;

                    return (
                      <div key={mod.id}>
                        <button
                          onClick={() => hasLos && setExpandedModule(isModExpanded ? null : mod.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs transition-colors",
                            hasLos ? "hover:bg-accent/50 cursor-pointer" : "cursor-default",
                            isModExpanded && "bg-accent/30"
                          )}
                        >
                          {hasLos ? (
                            isModExpanded ? <ChevronDown className="h-3 w-3 shrink-0 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                          ) : (
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                          )}
                          <span className="text-muted-foreground">{mod.name}</span>
                        </button>

                        {isModExpanded && hasLos && (
                          <div className="ml-5 mt-0.5 mb-1 flex flex-col gap-0.5 border-l border-dashed border-border pl-3">
                            {mod.los.map((los, i) => (
                              <p key={i} className="text-[10px] leading-relaxed text-muted-foreground/80">
                                <span className="text-primary/60 mr-1">LOS:</span>{los}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    {topicScore.questionsAnswered} de {topicScore.totalQuestions} questões respondidas
                    {topicData.weightRange ? ` (peso: ${topicData.weightRange})` : ""}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
