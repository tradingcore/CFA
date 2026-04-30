"use client";

import { LearningModule } from "@/lib/cfa-topics";
import { useStudyProgress } from "@/contexts/study-progress-context";
import { cn } from "@/lib/utils";

interface ModuleNavProps {
  modules: LearningModule[];
  activeModuleId: string | null;
  onSelectModule: (moduleId: string) => void;
}

export function ModuleNav({ modules, activeModuleId, onSelectModule }: ModuleNavProps) {
  const { getModuleProgress } = useStudyProgress();

  return (
    <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-72 shrink-0 overflow-y-auto rounded-xl border border-border bg-card p-3 xl:block">
      <div className="mb-3 px-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Modules
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Jump directly to a reading module.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {modules.map((module, index) => {
          const progress = getModuleProgress(module.id, module.los.length);
          const pct = progress.total > 0
            ? Math.round((progress.studied / progress.total) * 100)
            : 0;
          const active = activeModuleId === module.id;

          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-left transition-colors",
                active ? "bg-primary/10 text-primary" : "hover:bg-accent"
              )}
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-medium leading-snug">
                    {module.name}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          pct === 100 ? "bg-emerald-500" : pct > 0 ? "bg-amber-400" : "bg-transparent"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {progress.studied}/{progress.total}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
