"use client";

import { useState } from "react";
import { useLevel } from "@/contexts/level-context";
import { useStudyProgress } from "@/contexts/study-progress-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { TopicSelector } from "@/components/estudo/topic-selector";
import { LOSSearch, LOSFilter } from "@/components/estudo/los-search";
import { ModuleChecklist } from "@/components/estudo/module-checklist";
import { GraduationCap } from "lucide-react";

export default function EstudoPage() {
  const { level } = useLevel();
  const { getTopicProgress } = useStudyProgress();
  const topics = getTopicsForLevel(level);

  const [activeTopic, setActiveTopic] = useState<string>(topics[0]?.id ?? "");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<LOSFilter>("all");

  const selectedTopic = topics.find((t) => t.id === activeTopic);
  const topicProgress = getTopicProgress(activeTopic, level);
  const topicPct = topicProgress.total > 0
    ? Math.round((topicProgress.studied / topicProgress.total) * 100)
    : 0;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Progresso de Estudo</h1>
          <p className="text-sm text-muted-foreground">
            CFA Level {level} — Acompanhe cada LOS estudado
          </p>
        </div>
      </div>

      {/* Topic selector */}
      <TopicSelector activeTopic={activeTopic} onSelect={setActiveTopic} />

      {/* Active topic progress bar */}
      {selectedTopic && (
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: selectedTopic.color }}
              />
              <span className="text-sm font-semibold">{selectedTopic.name}</span>
              <span className="text-xs text-muted-foreground">({selectedTopic.weightRange})</span>
            </div>
            <span className="font-mono text-sm font-bold tabular-nums">
              {topicProgress.studied}/{topicProgress.total} LOS ({topicPct}%)
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${topicPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span>{selectedTopic.modules.length} módulos</span>
            <span>
              {topicPct === 100
                ? "Tópico completo!"
                : topicPct > 0
                ? `${topicProgress.total - topicProgress.studied} LOS restantes`
                : "Nenhum LOS estudado ainda"}
            </span>
          </div>
        </div>
      )}

      {/* Search + filter */}
      <LOSSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      {/* Modules list */}
      {selectedTopic && (
        <div className="flex flex-col gap-3">
          {selectedTopic.modules.map((mod, index) => (
            <ModuleChecklist
              key={mod.id}
              module={mod}
              topicId={selectedTopic.id}
              searchQuery={searchQuery}
              filter={filter}
              defaultExpanded={index === 0 && !searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
}
