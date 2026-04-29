"use client";

import { useLevel } from "@/contexts/level-context";
import { useStudyProgress } from "@/contexts/study-progress-context";
import { getTopicsForLevel, CFATopic } from "@/lib/cfa-topics";
import { cn } from "@/lib/utils";

interface TopicSelectorProps {
  activeTopic: string | null;
  onSelect: (topicId: string) => void;
}

/**
 * Horizontal scrollable list of topics with mini progress bars.
 * @param activeTopic - Currently selected topic ID
 * @param onSelect - Callback when a topic is clicked
 * @returns Topic selector component
 */
export function TopicSelector({ activeTopic, onSelect }: TopicSelectorProps) {
  const { level } = useLevel();
  const { getTopicProgress } = useStudyProgress();
  const topics = getTopicsForLevel(level);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {topics.map((topic) => {
        const prog = getTopicProgress(topic.id, level);
        const pct = prog.total > 0 ? Math.round((prog.studied / prog.total) * 100) : 0;
        const isActive = activeTopic === topic.id;

        return (
          <button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            className={cn(
              "flex shrink-0 flex-col gap-1.5 rounded-xl border-2 px-4 py-3 text-left transition-all min-w-[130px]",
              isActive
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/30"
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: topic.color }}
              />
              <span className={cn("text-sm font-semibold truncate", isActive ? "text-primary" : "text-foreground")}>
                {topic.shortName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] font-mono tabular-nums text-muted-foreground">{pct}%</span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              {prog.studied}/{prog.total} LOS
            </span>
          </button>
        );
      })}
    </div>
  );
}
