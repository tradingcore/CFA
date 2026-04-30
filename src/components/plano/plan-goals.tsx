"use client";

import { useMemo, useState } from "react";
import { CFATopic } from "@/lib/cfa-topics";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { InfoHint } from "@/components/ui/info-hint";

export interface PlanGoals {
  userGoals: string;
  periodDays: 7 | 14 | 30;
  targetModuleIds: string[];
  prioritizeWeakTopics: boolean;
  includeWeeklyMock: boolean;
}

interface PlanGoalsCardProps {
  topics: CFATopic[];
  value: PlanGoals;
  onChange: (next: PlanGoals) => void;
}

export function PlanGoalsCard({ topics, value, onChange }: PlanGoalsCardProps) {
  const [search, setSearch] = useState("");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(topics[0]?.id ?? null);

  const filteredTopics = useMemo(() => {
    if (!search.trim()) return topics;
    const query = search.toLowerCase();
    return topics
      .map((topic) => ({
        ...topic,
        modules: topic.modules.filter(
          (module) =>
            module.name.toLowerCase().includes(query) ||
            topic.name.toLowerCase().includes(query)
        ),
      }))
      .filter((topic) => topic.modules.length > 0);
  }, [topics, search]);

  const toggleModule = (moduleId: string) => {
    const next = value.targetModuleIds.includes(moduleId)
      ? value.targetModuleIds.filter((id) => id !== moduleId)
      : [...value.targetModuleIds, moduleId];
    onChange({ ...value, targetModuleIds: next });
  };

  return (
    <Card>
      <CardContent className="space-y-5 p-5">
        <div className="space-y-2">
          <label className="flex items-center gap-1 text-sm font-medium">
            What do you want to focus on?
            <InfoHint text="Free text. Mention modules, skills, or even how you want the plan structured. The AI sees this verbatim when generating blocks." />
          </label>
          <textarea
            value={value.userGoals}
            onChange={(event) => onChange({ ...value, userGoals: event.target.value })}
            rows={3}
            placeholder="Example: I want to focus on Fixed Income duration and convexity, plus a quick refresher on Ethics standards III and IV."
            className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none ring-ring transition-shadow placeholder:text-muted-foreground focus:ring-2"
          />
          <p className="text-[11px] text-muted-foreground">
            The AI uses this together with your weak topics and review queue when generating the plan.
          </p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-1 text-sm font-medium">
            Plan period
            <InfoHint text="How far ahead the plan should go. Shorter periods stay more flexible; longer periods give a clearer roadmap." />
          </label>
          <div className="flex gap-2">
            {([7, 14, 30] as const).map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => onChange({ ...value, periodDays: days })}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                  value.periodDays === days
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/40"
                )}
              >
                {days === 7 ? "This week" : days === 14 ? "Next 2 weeks" : "Next month"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1 text-sm font-medium">
              Target modules ({value.targetModuleIds.length} selected)
              <InfoHint text="Pick the modules you want this plan to emphasize. Leave empty to let the AI decide based on your weak topics and review queue." />
            </label>
            {value.targetModuleIds.length > 0 && (
              <button
                type="button"
                onClick={() => onChange({ ...value, targetModuleIds: [] })}
                className="text-[11px] text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search modules"
              className="w-full rounded-xl border border-input bg-card py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>
          <div className="flex max-h-60 flex-col gap-1 overflow-y-auto rounded-xl border border-border bg-card/40 p-2">
            {filteredTopics.map((topic) => {
              const isOpen = expandedTopic === topic.id;
              const selectedInTopic = topic.modules.filter((module) =>
                value.targetModuleIds.includes(module.id)
              ).length;
              return (
                <div key={topic.id}>
                  <button
                    type="button"
                    onClick={() => setExpandedTopic(isOpen ? null : topic.id)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs hover:bg-accent/40"
                  >
                    <span className="flex items-center gap-2">
                      {isOpen ? (
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      )}
                      <span className="font-medium">{topic.name}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {selectedInTopic > 0 ? `${selectedInTopic}/${topic.modules.length}` : `${topic.modules.length} modules`}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-1 flex flex-col gap-0.5 pl-6">
                      {topic.modules.map((module) => {
                        const checked = value.targetModuleIds.includes(module.id);
                        return (
                          <label
                            key={module.id}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-[11px] transition-colors hover:bg-accent/40",
                              checked && "bg-primary/10 text-primary"
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleModule(module.id)}
                              className="h-3 w-3 accent-primary"
                            />
                            <span className="truncate">{module.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs">
            <input
              type="checkbox"
              checked={value.prioritizeWeakTopics}
              onChange={(event) =>
                onChange({ ...value, prioritizeWeakTopics: event.target.checked })
              }
              className="h-3 w-3 accent-primary"
            />
            Prioritize weak topics
            <InfoHint text="Bias the plan toward topics where your accuracy is below 70% (with enough sample). Disable for a balanced curriculum review." />
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs">
            <input
              type="checkbox"
              checked={value.includeWeeklyMock}
              onChange={(event) =>
                onChange({ ...value, includeWeeklyMock: event.target.checked })
              }
              className="h-3 w-3 accent-primary"
            />
            Include 1 mock per week
            <InfoHint text="Schedule one full mock exam per week, on a study day. Useful to keep readiness honest and track progress." />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
