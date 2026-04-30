"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { CFATopic } from "@/lib/cfa-topics";
import { StudyDaysSelector } from "@/components/study/study-days-selector";
import { StudyDay } from "@/lib/study-availability";
import { X, ChevronDown, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildCurriculumIndex } from "@/lib/curriculum-numbering";
import { useLevel } from "@/contexts/level-context";

export interface PlanConfig {
  userGoals: string;
  periodDays: 7 | 14 | 30;
  targetModuleIds: string[];
  prioritizeWeakTopics: boolean;
  includeWeeklyMock: boolean;
  weeklyHours: number;
  studyDays: StudyDay[];
  startFromModuleId: string;
}

interface PlanConfigModalProps {
  open: boolean;
  onClose: () => void;
  topics: CFATopic[];
  value: PlanConfig;
  onChange: (next: PlanConfig) => void;
  onGenerate: () => void;
  generating: boolean;
}

export function PlanConfigModal({
  open,
  onClose,
  topics,
  value,
  onChange,
  onGenerate,
  generating,
}: PlanConfigModalProps) {
  const [search, setSearch] = useState("");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { level } = useLevel();
  const curriculum = useMemo(() => buildCurriculumIndex(level), [level]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const filteredTopics = useMemo(() => {
    if (!search.trim()) return topics;
    const query = search.toLowerCase();
    return topics
      .map((topic) => ({
        ...topic,
        modules: topic.modules.filter(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            topic.name.toLowerCase().includes(query)
        ),
      }))
      .filter((t) => t.modules.length > 0);
  }, [topics, search]);

  const toggleModule = (moduleId: string) => {
    const next = value.targetModuleIds.includes(moduleId)
      ? value.targetModuleIds.filter((id) => id !== moduleId)
      : [...value.targetModuleIds, moduleId];
    onChange({ ...value, targetModuleIds: next });
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[10vh]"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-lg font-bold">Configure your plan</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-accent">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] space-y-6 overflow-y-auto p-5">
          {/* Period */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Plan period</label>
            <div className="flex gap-2">
              {([7, 14, 30] as const).map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => onChange({ ...value, periodDays: days })}
                  className={cn(
                    "flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
                    value.periodDays === days
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  {days === 7 ? "1 week" : days === 14 ? "2 weeks" : "1 month"}
                </button>
              ))}
            </div>
          </div>

          {/* Starting point */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Start from</label>
            <p className="text-xs text-muted-foreground">
              Already studied some topics? Pick where to continue from.
            </p>
            <select
              value={value.startFromModuleId}
              onChange={(e) => onChange({ ...value, startFromModuleId: e.target.value })}
              className="w-full rounded-xl border border-input bg-card px-4 py-2.5 text-sm outline-none ring-ring focus:ring-2"
            >
              <option value="">Beginning of curriculum</option>
              {topics.map((topic, topicIdx) => (
                <optgroup key={topic.id} label={`${topicIdx + 1}. ${topic.name}`}>
                  {topic.modules.map((module) => {
                    const label = curriculum.moduleLabels.get(module.id);
                    return (
                      <option key={module.id} value={module.id}>
                        {label?.moduleLabel ?? module.name}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Hours + Days */}
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Weekly hours: <span className="text-primary">{value.weeklyHours}h</span>
              </label>
              <input
                type="range"
                min={5}
                max={40}
                value={value.weeklyHours}
                onChange={(e) => onChange({ ...value, weeklyHours: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>
            <StudyDaysSelector
              selectedDays={value.studyDays}
              weeklyHours={value.weeklyHours}
              onChange={(days) => onChange({ ...value, studyDays: days })}
              compact
            />
          </div>

          {/* Focus */}
          <div className="space-y-2">
            <label className="text-sm font-medium">What do you want to focus on?</label>
            <textarea
              value={value.userGoals}
              onChange={(e) => onChange({ ...value, userGoals: e.target.value })}
              rows={2}
              placeholder="e.g. Focus on Fixed Income duration and convexity, plus Ethics review"
              className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none ring-ring placeholder:text-muted-foreground focus:ring-2"
            />
          </div>

          {/* Target modules */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Target modules
                {value.targetModuleIds.length > 0 && (
                  <span className="ml-1 text-primary">({value.targetModuleIds.length})</span>
                )}
              </label>
              {value.targetModuleIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => onChange({ ...value, targetModuleIds: [] })}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Optional — leave empty and the AI picks your weakest areas.
            </p>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search modules..."
                className="w-full rounded-xl border border-input bg-card py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <div className="flex max-h-48 flex-col gap-0.5 overflow-y-auto rounded-xl border border-border bg-card/40 p-2">
              {filteredTopics.map((topic) => {
                const isOpen = expandedTopic === topic.id;
                const selectedCount = topic.modules.filter((m) =>
                  value.targetModuleIds.includes(m.id)
                ).length;
                return (
                  <div key={topic.id}>
                    <button
                      type="button"
                      onClick={() => setExpandedTopic(isOpen ? null : topic.id)}
                      className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs hover:bg-accent/40"
                    >
                      <span className="flex items-center gap-2">
                        {isOpen ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                        <span className="font-medium">
                          {curriculum.topicLabels.get(topic.id)?.topicLabel ?? topic.name}
                        </span>
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {selectedCount > 0 ? `${selectedCount}/${topic.modules.length}` : `${topic.modules.length}`}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-0.5 flex flex-col gap-0.5 pl-6">
                        {topic.modules.map((module) => {
                          const checked = value.targetModuleIds.includes(module.id);
                          return (
                            <label
                              key={module.id}
                              className={cn(
                                "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors hover:bg-accent/40",
                                checked && "bg-primary/10 text-primary"
                              )}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleModule(module.id)}
                                className="h-3 w-3 accent-primary"
                              />
                              <span className="truncate">
                                {curriculum.moduleLabels.get(module.id)?.moduleLabel ?? module.name}
                              </span>
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

          {/* Options */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm">
              <input
                type="checkbox"
                checked={value.prioritizeWeakTopics}
                onChange={(e) => onChange({ ...value, prioritizeWeakTopics: e.target.checked })}
                className="h-3.5 w-3.5 accent-primary"
              />
              Prioritize weak topics
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm">
              <input
                type="checkbox"
                checked={value.includeWeeklyMock}
                onChange={(e) => onChange({ ...value, includeWeeklyMock: e.target.checked })}
                className="h-3.5 w-3.5 accent-primary"
              />
              Include 1 mock exam per week
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border p-5">
          <button
            onClick={onClose}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={() => { onGenerate(); onClose(); }}
            disabled={generating || value.studyDays.length === 0}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
