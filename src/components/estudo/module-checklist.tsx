"use client";

import { useState } from "react";
import { useStudyProgress } from "@/contexts/study-progress-context";
import { LearningModule } from "@/lib/cfa-topics";
import { LOSFilter } from "@/components/estudo/los-search";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Play } from "lucide-react";
import Link from "next/link";

interface ModuleChecklistProps {
  module: LearningModule;
  topicId: string;
  searchQuery: string;
  filter: LOSFilter;
  defaultExpanded?: boolean;
}

/**
 * Collapsible card for a single module showing its LOS as a checklist.
 * @param module - The learning module data
 * @param topicId - Parent topic ID for linking to simulado
 * @param searchQuery - Text filter for LOS
 * @param filter - Status filter (all/pending/studied)
 * @param defaultExpanded - Whether to start expanded
 * @returns Module checklist card
 */
export function ModuleChecklist({ module, topicId, searchQuery, filter, defaultExpanded = false }: ModuleChecklistProps) {
  const { toggleLOS, isLOSStudied, getLOSDate, getModuleProgress } = useStudyProgress();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const progress = getModuleProgress(module.id, module.los.length);
  const pct = module.los.length > 0 ? Math.round((progress.studied / progress.total) * 100) : 0;

  const filteredLOS = module.los
    .map((text, index) => ({ text, index, studied: isLOSStudied(module.id, index) }))
    .filter((item) => {
      if (searchQuery) {
        if (!item.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      }
      if (filter === "studied" && !item.studied) return false;
      if (filter === "pending" && item.studied) return false;
      return true;
    });

  const hasSearchMatch = searchQuery ? filteredLOS.length > 0 : true;
  if (searchQuery && !hasSearchMatch) return null;

  const shouldAutoExpand = searchQuery.length > 0 && filteredLOS.length > 0;

  return (
    <Card className={cn(
      "transition-colors",
      pct === 100 && "border-emerald-500/30 bg-emerald-500/5"
    )}>
      <CardHeader className="p-0">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-3 p-4 text-left"
        >
          <div className="flex h-7 w-7 items-center justify-center">
            {expanded || shouldAutoExpand ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{module.name}</span>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs font-mono tabular-nums font-semibold",
                  pct === 100 ? "text-emerald-500" : pct > 0 ? "text-amber-500" : "text-muted-foreground"
                )}>
                  {progress.studied}/{progress.total}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  pct === 100 ? "bg-emerald-500" : pct > 0 ? "bg-amber-400" : "bg-transparent"
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </button>
      </CardHeader>

      {(expanded || shouldAutoExpand) && (
        <CardContent className="border-t border-border px-4 pb-4 pt-3">
          <div className="flex flex-col gap-1">
            {filteredLOS.map((item) => {
              const date = getLOSDate(module.id, item.index);
              return (
                <button
                  key={item.index}
                  onClick={() => toggleLOS(module.id, item.index)}
                  className={cn(
                    "group flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    item.studied ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:bg-accent/50"
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.studied ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary/50" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-xs leading-relaxed",
                      item.studied ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {item.text}
                    </p>
                    {item.studied && date && (
                      <p className="mt-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                        Studied on {new Date(date + "T12:00:00").toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-end">
            <Link
              href={`/simulado?topic=${topicId}`}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Play className="h-3 w-3" />
              Practice this module
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
