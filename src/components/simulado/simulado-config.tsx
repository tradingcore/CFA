"use client";

import { useState } from "react";
import { useLevel } from "@/contexts/level-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { SimuladoMode, EXAM_FORMAT } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, BookOpen, ChevronDown, ChevronRight, CheckSquare, Square } from "lucide-react";

const QUANTITY_PRESETS = [5, 10, 15, 20];

interface SimuladoConfigProps {
  selectedTopics: Set<string>;
  selectedModules: Set<string>;
  onToggleTopic: (topicId: string) => void;
  onToggleModule: (moduleId: string, topicId: string) => void;
  onToggleAll: () => void;
  questionCount: number;
  onSetCount: (n: number) => void;
  mode: SimuladoMode;
  onSetMode: (m: SimuladoMode) => void;
  onStart: () => void;
  availableQuestionCount: number;
}

/**
 * Config panel with topic/module filters, custom quantity input, and mode selection.
 */
export function SimuladoConfig({
  selectedTopics,
  selectedModules,
  onToggleTopic,
  onToggleModule,
  onToggleAll,
  questionCount,
  onSetCount,
  mode,
  onSetMode,
  onStart,
  availableQuestionCount,
}: SimuladoConfigProps) {
  const { level } = useLevel();
  const topics = getTopicsForLevel(level);
  const allSelected = topics.every((t) => selectedTopics.has(t.id));
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const examFormat = EXAM_FORMAT[level];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5 py-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">CFA Level {level} Mock Exam</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Configure topics, modules, question count, and exam mode.
        </p>
      </div>

      {/* Mode selection */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => onSetMode("official")}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl border-2 p-5 text-center transition-all",
            mode === "official" ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
          )}
        >
          <Shield className={cn("h-8 w-8", mode === "official" ? "text-primary" : "text-muted-foreground")} />
          <span className="text-sm font-semibold">Official Exam</span>
          <span className="text-[11px] text-muted-foreground leading-tight">
            Countdown timer ({examFormat.secondsPerQuestion}s/question), no feedback, free navigation. Real exam conditions.
          </span>
        </button>
        <button
          onClick={() => onSetMode("training")}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl border-2 p-5 text-center transition-all",
            mode === "training" ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
          )}
        >
          <BookOpen className={cn("h-8 w-8", mode === "training" ? "text-primary" : "text-muted-foreground")} />
          <span className="text-sm font-semibold">Training Mode</span>
          <span className="text-[11px] text-muted-foreground leading-tight">
            No time limit, feedback after each question, chat to discuss.
          </span>
        </button>
      </div>

      {/* Quantity */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Number of questions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          {QUANTITY_PRESETS.map((n) => (
            <button
              key={n}
              onClick={() => { onSetCount(n); setCustomInput(false); }}
              className={cn(
                "rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all",
                questionCount === n && !customInput
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/40"
              )}
            >
              {n}
            </button>
          ))}
          {customInput ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={examFormat.totalQuestions}
                value={customValue}
                onChange={(e) => {
                  setCustomValue(e.target.value);
                  const v = parseInt(e.target.value);
                  if (v > 0 && v <= examFormat.totalQuestions) onSetCount(v);
                }}
                className="w-20 rounded-lg border-2 border-primary bg-primary/10 px-3 py-2 text-center text-sm font-semibold outline-none"
                autoFocus
              />
            </div>
          ) : (
            <button
              onClick={() => { setCustomInput(true); setCustomValue(String(questionCount)); }}
              className="rounded-lg border-2 border-dashed border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:border-primary/40"
            >
              Other
            </button>
          )}
        </CardContent>
      </Card>

      {/* Topics + Modules */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Topics & Modules</CardTitle>
            <button onClick={onToggleAll} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              {allSelected ? <><CheckSquare className="h-3.5 w-3.5" /> Deselect all</> : <><Square className="h-3.5 w-3.5" /> Select all</>}
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {topics.map((topic) => {
            const isSelected = selectedTopics.has(topic.id);
            const isExpanded = expandedTopic === topic.id;
            const selectedModulesInTopic = topic.modules.filter((m) => selectedModules.has(m.id)).length;

            return (
              <div key={topic.id}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleTopic(topic.id)}
                    className={cn(
                      "flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                      isSelected ? "border-primary/50 bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
                    )}
                  >
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: topic.color }} />
                    <span className="flex-1 text-left">{topic.shortName}</span>
                    <Badge variant="secondary" className="text-[9px]">{topic.weightRange}</Badge>
                    {isSelected && selectedModulesInTopic < topic.modules.length && (
                      <Badge variant="outline" className="text-[9px]">{selectedModulesInTopic}/{topic.modules.length}</Badge>
                    )}
                  </button>
                  <button
                    onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                    className="rounded-lg border border-border p-2 hover:bg-accent"
                  >
                    {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="ml-6 mt-1 mb-2 flex flex-col gap-0.5 border-l-2 border-border pl-3">
                    {topic.modules.map((mod) => {
                      const modSelected = selectedModules.has(mod.id);
                      return (
                        <button
                          key={mod.id}
                          onClick={() => onToggleModule(mod.id, topic.id)}
                          className={cn(
                            "flex items-center gap-2 rounded px-2 py-1.5 text-xs text-left transition-colors",
                            modSelected ? "bg-primary/5 text-primary font-medium" : "text-muted-foreground hover:bg-accent/50"
                          )}
                        >
                          {modSelected ? <CheckSquare className="h-3 w-3 shrink-0 text-primary" /> : <Square className="h-3 w-3 shrink-0" />}
                          <span className="truncate">{mod.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Start */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground">
          {availableQuestionCount} questions available
          {mode === "official" && ` · Timer: ${Math.ceil((questionCount * examFormat.secondsPerQuestion) / 60)} min`}
        </p>
        <button
          onClick={onStart}
          disabled={selectedTopics.size === 0 || availableQuestionCount === 0}
          className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 disabled:opacity-40"
        >
          Start {mode === "official" ? "Official Exam" : "Training"}
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
