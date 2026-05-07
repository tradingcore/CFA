"use client";

import { useState, useEffect } from "react";
import { useLevel } from "@/contexts/level-context";
import { useAuth } from "@/contexts/auth-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { apiGenerateStudyPlan, StudyPlanLosSnapshot } from "@/lib/api";
import {
  getLatestStudyPlan,
  saveStudyPlan,
  updateStudyPlanBlock,
  updateUserProfile,
  StudyPlanDoc,
} from "@/lib/firestore";
import { useLevelReadiness } from "@/lib/use-readiness";
import {
  getWeekStartDate,
  normalizeStudyDays,
  StudyDay,
} from "@/lib/study-availability";
import { StudyCalendar } from "@/components/plano/study-calendar";
import { StudyTimeline } from "@/components/plano/study-timeline";
import { GoalTracker } from "@/components/plano/goal-tracker";
import { CurriculumOutline } from "@/components/plano/curriculum-outline";
import { WeeklyOverview } from "@/components/plano/weekly-overview";
import { PlanConfigModal, PlanConfig } from "@/components/plano/plan-config-modal";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Sparkles, Loader2, Settings2 } from "lucide-react";
import { buildCurriculumIndex } from "@/lib/curriculum-numbering";

export default function PlanoPage() {
  const { level } = useLevel();
  const { user, profile } = useAuth();
  const { readiness, stats } = useLevelReadiness();
  const topics = getTopicsForLevel(level);

  const [plan, setPlan] = useState<StudyPlanDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [completedBlocks, setCompletedBlocks] = useState(0);
  const [configOpen, setConfigOpen] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const weekStart = getWeekStartDate();

  const [config, setConfig] = useState<PlanConfig>({
    userGoals: "",
    periodDays: 14,
    targetModuleIds: [],
    prioritizeWeakTopics: true,
    includeWeeklyMock: true,
    weeklyHours: profile?.weeklyHoursGoal || 15,
    studyDays: normalizeStudyDays(profile?.studyDays),
    startFromModuleId: "",
  });

  useEffect(() => {
    if (user) {
      setLoading(true);
      getLatestStudyPlan(user.uid, level)
        .then((p) => {
          setPlan(p);
          if (p) {
            setCompletedBlocks(p.blocks.filter((b) => b.completed).length);
            const lastModule = [...p.blocks].reverse().find((b) => b.moduleId);
            const allModuleIds = topics.flatMap((t) => t.modules.map((m) => m.id));
            const lastIdx = lastModule?.moduleId ? allModuleIds.indexOf(lastModule.moduleId) : -1;
            const nextModuleId = lastIdx >= 0 && lastIdx < allModuleIds.length - 1
              ? allModuleIds[lastIdx + 1]
              : lastModule?.moduleId ?? "";
            setConfig((c) => ({
              ...c,
              userGoals: p.userGoals ?? c.userGoals,
              periodDays: ((p.periodDays as 7 | 14 | 30) ?? c.periodDays),
              startFromModuleId: nextModuleId,
            }));
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, level]);

  useEffect(() => {
    if (!profile) return;
    const weeklyOverride = profile.studyAvailabilityOverrides?.[weekStart];
    setConfig((c) => ({
      ...c,
      weeklyHours: weeklyOverride?.weeklyHoursGoal ?? profile.weeklyHoursGoal,
      studyDays: normalizeStudyDays(weeklyOverride?.studyDays ?? profile.studyDays),
    }));
  }, [profile, weekStart]);

  const handleGenerate = async () => {
    if (!user || !profile) return;
    setGenerating(true);
    setGenerationError("");

    try {
      const weakTopics = readiness.byTopic
        .filter((t) => t.sampleSize >= 5 && t.accuracy < 0.7)
        .map((t) => ({
          topicId: t.topicId,
          topicName: t.fullName,
          score: Math.round(t.accuracy * 100),
          sampleSize: t.sampleSize,
        }));

      const losSnapshot: StudyPlanLosSnapshot[] = [];
      readiness.byTopic.forEach((topic) => {
        topic.modules.forEach((module) => {
          module.losMasteries.forEach((lm) => {
            if (lm.mastery.state === "needs_review" || (lm.mastery.sampleSize >= 3 && lm.mastery.accuracy < 0.6)) {
              losSnapshot.push({
                losId: lm.losId,
                topicId: topic.topicId,
                moduleId: module.moduleId,
                state: lm.mastery.state,
                accuracy: lm.mastery.accuracy,
                sampleSize: lm.mastery.sampleSize,
                isDue: lm.mastery.isDue,
              });
            }
          });
        });
      });

      const topicsList = topics.map((topic) => ({
        topicId: topic.id,
        topicName: topic.name,
        weightRange: topic.weightRange,
        modules: topic.modules.map((module) => ({
          id: module.id,
          name: module.name,
          los: module.los.map((description, index) => ({
            id: `${module.id}:${index}`,
            description,
          })),
        })),
      }));

      await updateUserProfile(user.uid, {
        studyAvailabilityOverrides: {
          ...(profile.studyAvailabilityOverrides || {}),
          [weekStart]: {
            studyDays: config.studyDays,
            weeklyHoursGoal: config.weeklyHours,
          },
        },
      });

      const { blocks } = await apiGenerateStudyPlan({
        level,
        examDate: profile.examDate,
        weeklyHours: config.weeklyHours,
        studyDays: config.studyDays,
        periodDays: config.periodDays,
        userGoals: config.userGoals,
        targetModuleIds: config.targetModuleIds,
        prioritizeWeakTopics: config.prioritizeWeakTopics,
        includeWeeklyMock: config.includeWeeklyMock,
        startFromModuleId: config.startFromModuleId,
        weakTopics,
        topicsList,
        losSnapshot: losSnapshot.slice(0, 30),
      });

      const newPlan: StudyPlanDoc = {
        blocks: blocks.map((b) => ({
          id: b.id,
          topicId: b.topicId,
          topicName: b.topicName,
          ...(b.moduleId ? { moduleId: b.moduleId } : {}),
          ...(b.moduleName ? { moduleName: b.moduleName } : {}),
          ...(b.losIds && b.losIds.length > 0 ? { losIds: b.losIds } : {}),
          date: b.date,
          durationMinutes: b.durationMinutes,
          type: b.type,
          completed: false,
          description: b.description,
        })),
        createdAt: new Date().toISOString(),
        level,
        studyDays: config.studyDays,
        weeklyHoursGoal: config.weeklyHours,
        userGoals: config.userGoals,
        periodDays: config.periodDays,
      };

      const planId = await saveStudyPlan(user.uid, newPlan);
      setPlan({ ...newPlan, id: planId });
      setCompletedBlocks(0);
    } catch (err) {
      console.error("Study plan generation error:", err);
      setGenerationError(err instanceof Error ? err.message : "Could not generate plan");
    } finally {
      setGenerating(false);
    }
  };

  const handleBlockToggle = async (blockId: string, newBlocks: StudyPlanDoc["blocks"]) => {
    if (!user || !plan?.id) return;
    setPlan((prev) => (prev ? { ...prev, blocks: newBlocks } : prev));
    setCompletedBlocks(newBlocks.filter((b) => b.completed).length);
    try {
      await updateStudyPlanBlock(user.uid, plan.id, newBlocks);
    } catch (err) {
      console.error("Failed to update block:", err);
    }
  };

  const handleReschedule = async (blockIds: string[], newDate: string, cascade = false) => {
    if (!user || !plan?.id) return;
    let newBlocks = plan.blocks.map((b) =>
      blockIds.includes(b.id) ? { ...b, date: newDate } : b
    );

    if (cascade) {
      let changed = true;
      while (changed) {
        changed = false;
        const byDate: Record<string, typeof newBlocks> = {};
        newBlocks.forEach((b) => {
          if (!byDate[b.date]) byDate[b.date] = [];
          byDate[b.date].push(b);
        });
        for (const [date, dayBlocks] of Object.entries(byDate)) {
          const totalMin = dayBlocks.reduce((s, b) => s + b.durationMinutes, 0);
          if (totalMin > dailyBudgetMin + 15) {
            const overflow = totalMin - dailyBudgetMin;
            let accumulated = 0;
            const toMove: string[] = [];
            for (let i = dayBlocks.length - 1; i >= 0 && accumulated < overflow; i--) {
              toMove.push(dayBlocks[i].id);
              accumulated += dayBlocks[i].durationMinutes;
            }
            const nextDay = getNextStudyDay(date);
            newBlocks = newBlocks.map((b) =>
              toMove.includes(b.id) ? { ...b, date: nextDay } : b
            );
            changed = true;
            break;
          }
        }
      }
    }

    setPlan((prev) => (prev ? { ...prev, blocks: newBlocks } : prev));
    try {
      await updateStudyPlanBlock(user.uid, plan.id, newBlocks);
    } catch (err) {
      console.error("Failed to reschedule blocks:", err);
    }
  };

  const handleSkip = async (blockIds: string[]) => {
    if (!user || !plan?.id) return;
    const newBlocks = plan.blocks.map((b) =>
      blockIds.includes(b.id) ? { ...b, completed: true } : b
    );
    setPlan((prev) => (prev ? { ...prev, blocks: newBlocks } : prev));
    setCompletedBlocks(newBlocks.filter((b) => b.completed).length);
    try {
      await updateStudyPlanBlock(user.uid, plan.id, newBlocks);
    } catch (err) {
      console.error("Failed to skip blocks:", err);
    }
  };

  const handleDeleteBlock = async (blockId: string) => {
    if (!user || !plan?.id) return;
    const newBlocks = plan.blocks.filter((b) => b.id !== blockId);
    setPlan((prev) => (prev ? { ...prev, blocks: newBlocks } : prev));
    setCompletedBlocks(newBlocks.filter((b) => b.completed).length);
    try {
      await updateStudyPlanBlock(user.uid, plan.id, newBlocks);
    } catch (err) {
      console.error("Failed to delete block:", err);
    }
  };

  const dailyBudgetMin = config.studyDays.length > 0
    ? Math.round((config.weeklyHours / config.studyDays.length) * 60)
    : 120;

  const dayOfWeekToStudyDay = (date: Date): string => {
    const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return map[date.getDay()];
  };

  const getNextStudyDay = (fromDate: string): string => {
    const d = new Date(fromDate + "T12:00:00");
    for (let i = 1; i <= 14; i++) {
      const next = new Date(d);
      next.setDate(next.getDate() + i);
      if (config.studyDays.includes(dayOfWeekToStudyDay(next) as StudyDay)) {
        return next.toISOString().split("T")[0];
      }
    }
    const fallback = new Date(d);
    fallback.setDate(fallback.getDate() + 1);
    return fallback.toISOString().split("T")[0];
  };

  const handleMoveBlock = async (blockId: string, newDate: string, cascade = false) => {
    if (!user || !plan?.id) return;

    let newBlocks = plan.blocks.map((b) =>
      b.id === blockId ? { ...b, date: newDate } : b
    );

    if (cascade) {
      let changed = true;
      while (changed) {
        changed = false;
        const byDate: Record<string, typeof newBlocks> = {};
        newBlocks.forEach((b) => {
          if (!byDate[b.date]) byDate[b.date] = [];
          byDate[b.date].push(b);
        });

        for (const [date, dayBlocks] of Object.entries(byDate)) {
          const totalMin = dayBlocks.reduce((s, b) => s + b.durationMinutes, 0);
          if (totalMin > dailyBudgetMin + 15) {
            const overflow = totalMin - dailyBudgetMin;
            let accumulated = 0;
            const toMove: string[] = [];
            for (let i = dayBlocks.length - 1; i >= 0 && accumulated < overflow; i--) {
              toMove.push(dayBlocks[i].id);
              accumulated += dayBlocks[i].durationMinutes;
            }
            const nextDay = getNextStudyDay(date);
            newBlocks = newBlocks.map((b) =>
              toMove.includes(b.id) ? { ...b, date: nextDay } : b
            );
            changed = true;
            break;
          }
        }
      }
    }

    setPlan((prev) => (prev ? { ...prev, blocks: newBlocks } : prev));
    try {
      await updateStudyPlanBlock(user.uid, plan.id, newBlocks);
    } catch (err) {
      console.error("Failed to move block:", err);
    }
  };

  const periodLabel = config.periodDays === 7 ? "1 week" : config.periodDays === 14 ? "2 weeks" : "1 month";
  const totalBlocks = plan?.blocks.length || 0;

  const currentModuleId = plan?.blocks.length
    ? (() => {
        const todayStr = new Date().toISOString().split("T")[0];
        const todayBlock = plan.blocks.find((b) => b.date >= todayStr && !b.completed && b.moduleId);
        if (todayBlock?.moduleId) return todayBlock.moduleId;
        const lastBlock = [...plan.blocks].reverse().find((b) => b.moduleId);
        return lastBlock?.moduleId ?? undefined;
      })()
    : undefined;

  const allCompleted = totalBlocks > 0 && completedBlocks === totalBlocks;
  const lastBlockDate = plan?.blocks.length
    ? plan.blocks.reduce((max, b) => (b.date > max ? b.date : max), plan.blocks[0].date)
    : null;
  const planExpired = lastBlockDate ? lastBlockDate < new Date().toISOString().split("T")[0] : false;
  const showContinueBanner = allCompleted || planExpired;

  const handleContinue = () => {
    if (plan?.blocks.length) {
      const lastModuleBlock = [...plan.blocks].reverse().find((b) => b.moduleId);
      if (lastModuleBlock?.moduleId) {
        const allModuleIds = topics.flatMap((t) => t.modules.map((m) => m.id));
        const lastIdx = allModuleIds.indexOf(lastModuleBlock.moduleId);
        const nextModuleId = lastIdx >= 0 && lastIdx < allModuleIds.length - 1
          ? allModuleIds[lastIdx + 1]
          : lastModuleBlock.moduleId;
        setConfig((c) => ({ ...c, startFromModuleId: nextModuleId }));
      }
    }
    setTimeout(() => handleGenerate(), 0);
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Study Plan</h1>
            <p className="text-sm text-muted-foreground">CFA Level {level}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setConfigOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            <Settings2 className="h-4 w-4" />
            Configure
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating || config.studyDays.length === 0}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {generating ? "Generating..." : plan ? "Regenerate" : "Generate Plan"}
          </button>
        </div>
      </div>

      {/* Config summary badges */}
      <div className="flex flex-wrap items-center gap-2">
        {config.startFromModuleId && (
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-accent"
            onClick={() => setConfigOpen(true)}
          >
            From: {(() => {
              const idx = buildCurriculumIndex(level);
              return idx.moduleLabels.get(config.startFromModuleId)?.moduleLabel ?? config.startFromModuleId;
            })()}
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-accent"
          onClick={() => setConfigOpen(true)}
        >
          {periodLabel}
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-accent"
          onClick={() => setConfigOpen(true)}
        >
          {config.weeklyHours}h/week
        </Badge>
        <Badge
          variant="secondary"
          className="cursor-pointer hover:bg-accent"
          onClick={() => setConfigOpen(true)}
        >
          {config.studyDays.length} days/week
        </Badge>
        {config.targetModuleIds.length > 0 && (
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-accent"
            onClick={() => setConfigOpen(true)}
          >
            {config.targetModuleIds.length} modules targeted
          </Badge>
        )}
        {config.userGoals && (
          <Badge
            variant="secondary"
            className="max-w-xs cursor-pointer truncate hover:bg-accent"
            onClick={() => setConfigOpen(true)}
          >
            &ldquo;{config.userGoals}&rdquo;
          </Badge>
        )}
        {generationError && (
          <Badge variant="destructive">{generationError}</Badge>
        )}
      </div>

      {/* Weekly overview */}
      {totalBlocks > 0 && !loading && !generating && (
        <WeeklyOverview blocks={plan?.blocks || []} />
      )}

      {/* Plan ended banner */}
      {showContinueBanner && !generating && (
        <div className="flex items-center justify-between rounded-2xl border-2 border-primary/30 bg-primary/5 px-6 py-4">
          <div>
            <p className="font-semibold">
              {allCompleted ? "You completed all blocks!" : "Your plan period has ended."}
            </p>
            <p className="text-sm text-muted-foreground">
              Generate the next cycle to keep progressing through the curriculum.
            </p>
          </div>
          <button
            onClick={handleContinue}
            disabled={generating}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90"
          >
            <Sparkles className="h-4 w-4" />
            Continue
          </button>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : generating ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Generating your study plan with AI...</p>
        </div>
      ) : totalBlocks === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border py-20">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">No study plan yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Click <strong>Generate Plan</strong> to create a personalized study schedule based on your availability and weak areas.
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={config.studyDays.length === 0}
            className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            Generate Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="sticky top-20 flex flex-col gap-6">
              <CurriculumOutline currentModuleId={currentModuleId} />
              <StudyCalendar blocks={plan?.blocks || []} />
              <GoalTracker completedBlocks={completedBlocks} />
            </div>
          </div>
          <div className="lg:col-span-3">
            <StudyTimeline
              blocks={plan?.blocks || []}
              dailyBudgetMin={dailyBudgetMin}
              onBlockToggle={handleBlockToggle}
              onReschedule={handleReschedule}
              onSkip={handleSkip}
              onDeleteBlock={handleDeleteBlock}
              onMoveBlock={handleMoveBlock}
            />
          </div>
        </div>
      )}

      {/* Config modal */}
      <PlanConfigModal
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        topics={topics}
        value={config}
        onChange={setConfig}
        onGenerate={handleGenerate}
        generating={generating}
      />
    </div>
  );
}
