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
import { StudyDaysSelector } from "@/components/study/study-days-selector";
import {
  getWeekStartDate,
  normalizeStudyDays,
  StudyDay,
} from "@/lib/study-availability";
import { StudyCalendar } from "@/components/plano/study-calendar";
import { StudyTimeline } from "@/components/plano/study-timeline";
import { GoalTracker } from "@/components/plano/goal-tracker";
import { PlanGoalsCard, PlanGoals } from "@/components/plano/plan-goals";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Sparkles, Loader2 } from "lucide-react";
import { InfoHint } from "@/components/ui/info-hint";

const DEFAULT_GOALS: PlanGoals = {
  userGoals: "",
  periodDays: 14,
  targetModuleIds: [],
  prioritizeWeakTopics: true,
  includeWeeklyMock: true,
};

export default function PlanoPage() {
  const { level } = useLevel();
  const { user, profile } = useAuth();
  const { readiness, stats } = useLevelReadiness();
  const topics = getTopicsForLevel(level);

  const [plan, setPlan] = useState<StudyPlanDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [completedBlocks, setCompletedBlocks] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState(profile?.weeklyHoursGoal || 15);
  const [studyDays, setStudyDays] = useState<StudyDay[]>(normalizeStudyDays(profile?.studyDays));
  const [planGoals, setPlanGoals] = useState<PlanGoals>(DEFAULT_GOALS);
  const [generationError, setGenerationError] = useState<string>("");

  const weekStart = getWeekStartDate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      getLatestStudyPlan(user.uid, level)
        .then((p) => {
          setPlan(p);
          if (p) {
            setCompletedBlocks(p.blocks.filter((b) => b.completed).length);
            setPlanGoals((current) => ({
              ...current,
              userGoals: p.userGoals ?? current.userGoals,
              periodDays: ((p.periodDays as 7 | 14 | 30) ?? current.periodDays),
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
    setWeeklyHours(weeklyOverride?.weeklyHoursGoal ?? profile.weeklyHoursGoal);
    setStudyDays(normalizeStudyDays(weeklyOverride?.studyDays ?? profile.studyDays));
  }, [profile, weekStart]);

  const handleSaveAvailability = async () => {
    if (!user || !profile || studyDays.length === 0) return;
    await updateUserProfile(user.uid, {
      studyAvailabilityOverrides: {
        ...(profile.studyAvailabilityOverrides || {}),
        [weekStart]: {
          studyDays,
          weeklyHoursGoal: weeklyHours,
        },
      },
    });
  };

  const handleGenerate = async () => {
    if (!user || !profile) return;
    setGenerating(true);
    setGenerationError("");

    try {
      const weakTopics = readiness.byTopic
        .filter((topic) => topic.sampleSize >= 5 && topic.accuracy < 0.7)
        .map((topic) => ({
          topicId: topic.topicId,
          topicName: topic.fullName,
          score: Math.round(topic.accuracy * 100),
          sampleSize: topic.sampleSize,
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

      const { blocks } = await apiGenerateStudyPlan({
        level,
        examDate: profile.examDate,
        weeklyHours,
        studyDays,
        periodDays: planGoals.periodDays,
        userGoals: planGoals.userGoals,
        targetModuleIds: planGoals.targetModuleIds,
        prioritizeWeakTopics: planGoals.prioritizeWeakTopics,
        includeWeeklyMock: planGoals.includeWeeklyMock,
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
        studyDays,
        weeklyHoursGoal: weeklyHours,
        userGoals: planGoals.userGoals,
        periodDays: planGoals.periodDays,
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

  const dueLos = stats ? Object.values(stats).filter((s) => s.nextDueAt && new Date(s.nextDueAt) < new Date()).length : 0;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Study Plan</h1>
            <p className="text-sm text-muted-foreground">
              CFA Level {level} — Personalize your prep with goals, target modules and adaptive review
            </p>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating || studyDays.length === 0}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-50"
        >
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {generating ? "Generating..." : "Generate Plan with AI"}
        </button>
      </div>

      <Card className="border-dashed border-primary/30 bg-primary/5">
        <CardContent className="flex flex-wrap items-center gap-3 p-4 text-sm">
          <Sparkles className="h-5 w-5 shrink-0 text-primary" />
          <p className="flex-1 text-muted-foreground">
            Readiness <span className="font-semibold text-foreground">{readiness.readinessPct}%</span>
            {" · "}
            {readiness.totalSampleSize} attempts on this level
            {dueLos > 0 ? ` · ${dueLos} LOS due for review` : ""}.
          </p>
          {generationError && (
            <p className="text-xs text-destructive">{generationError}</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PlanGoalsCard topics={topics} value={planGoals} onChange={setPlanGoals} />
        <Card>
          <CardContent className="space-y-4 p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold">Availability this week</p>
                  <InfoHint text="If this week is different from your usual routine (less time, fewer days, a trip), change the values here. It only affects this week — your normal schedule stays the same." />
                </div>
                <p className="text-xs text-muted-foreground">
                  Adjust the hours and days for this week only, without changing your default schedule.
                </p>
              </div>
              <button
                onClick={handleSaveAvailability}
                disabled={studyDays.length === 0}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent disabled:opacity-40"
              >
                Save week override
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Weekly hours: {weeklyHours}h</label>
              <input
                type="range"
                min={5}
                max={40}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <StudyDaysSelector
              selectedDays={studyDays}
              weeklyHours={weeklyHours}
              onChange={setStudyDays}
              compact
            />
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <StudyCalendar blocks={plan?.blocks || []} />
            <GoalTracker completedBlocks={completedBlocks} />
          </div>
          <div className="lg:col-span-2">
            <StudyTimeline
              blocks={plan?.blocks || []}
              onBlockToggle={handleBlockToggle}
            />
          </div>
        </div>
      )}
    </div>
  );
}
