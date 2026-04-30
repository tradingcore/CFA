"use client";

import { useRef, useState } from "react";
import { useLevel } from "@/contexts/level-context";
import { useStudyProgress } from "@/contexts/study-progress-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { TopicSelector } from "@/components/estudo/topic-selector";
import { LOSSearch, LOSFilter } from "@/components/estudo/los-search";
import { ModuleChecklist } from "@/components/estudo/module-checklist";
import { ModuleNav } from "@/components/estudo/module-nav";
import { TopicList } from "@/components/mapa/topic-list";
import { GraduationCap, BookOpen, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "progress" | "performance";

export default function EstudoPage() {
  const { level } = useLevel();
  const { getTopicProgress } = useStudyProgress();
  const topics = getTopicsForLevel(level);

  const [tab, setTab] = useState<Tab>("progress");
  const [activeTopic, setActiveTopic] = useState<string>(topics[0]?.id ?? "");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(topics[0]?.modules[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<LOSFilter>("all");
  const moduleRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectedTopic = topics.find((t) => t.id === activeTopic);
  const topicProgress = getTopicProgress(activeTopic, level);
  const topicPct = topicProgress.total > 0
    ? Math.round((topicProgress.studied / topicProgress.total) * 100)
    : 0;

  const handleTopicSelect = (topicId: string) => {
    const topic = topics.find((t) => t.id === topicId);
    setActiveTopic(topicId);
    setActiveModuleId(topic?.modules[0]?.id ?? null);
  };

  const handleSelectModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    moduleRefs.current[moduleId]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Study Progress</h1>
            <p className="text-sm text-muted-foreground">CFA Level {level}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center rounded-lg border border-border p-0.5">
          <button
            onClick={() => setTab("progress")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-all",
              tab === "progress" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BookOpen className="h-4 w-4" />
            Progress
          </button>
          <button
            onClick={() => setTab("performance")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-all",
              tab === "performance" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <BarChart3 className="h-4 w-4" />
            Performance
          </button>
        </div>
      </div>

      {tab === "performance" ? (
        <TopicList />
      ) : (
        <>
          {/* Topic selector */}
          <TopicSelector activeTopic={activeTopic} onSelect={handleTopicSelect} />

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
                <span>{selectedTopic.modules.length} modules</span>
                <span>
                  {topicPct === 100
                    ? "Topic complete!"
                    : topicPct > 0
                    ? `${topicProgress.total - topicProgress.studied} LOS remaining`
                    : "No LOS studied yet"}
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

          {selectedTopic && (
            <div className="flex gap-5">
              <ModuleNav
                modules={selectedTopic.modules}
                activeModuleId={activeModuleId}
                onSelectModule={handleSelectModule}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                {selectedTopic.modules.map((mod, index) => (
                  <div
                    key={mod.id}
                    ref={(node) => {
                      moduleRefs.current[mod.id] = node;
                    }}
                    className="scroll-mt-24"
                  >
                    <ModuleChecklist
                      module={mod}
                      topicId={selectedTopic.id}
                      searchQuery={searchQuery}
                      filter={filter}
                      defaultExpanded={(activeModuleId === mod.id || index === 0) && !searchQuery}
                      forceExpanded={activeModuleId === mod.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
