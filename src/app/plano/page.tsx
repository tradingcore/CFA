"use client";

import { useState, useEffect } from "react";
import { useLevel } from "@/contexts/level-context";
import { useAuth } from "@/contexts/auth-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { apiGenerateStudyPlan } from "@/lib/api";
import {
  getLatestStudyPlan,
  saveStudyPlan,
  updateStudyPlanBlock,
  getTopicScores,
  updateUserProfile,
  StudyPlanDoc,
} from "@/lib/firestore";
import { StudyDaysSelector } from "@/components/study/study-days-selector";
import {
  getWeekStartDate,
  normalizeStudyDays,
  StudyDay,
} from "@/lib/study-availability";
import { StudyCalendar } from "@/components/plano/study-calendar";
import { StudyTimeline } from "@/components/plano/study-timeline";
import { GoalTracker } from "@/components/plano/goal-tracker";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Sparkles, Loader2 } from "lucide-react";

export default function PlanoPage() {
  const { level } = useLevel();
  const { user, profile } = useAuth();
  const [plan, setPlan] = useState<StudyPlanDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [completedBlocks, setCompletedBlocks] = useState(0);
  const [weeklyHours, setWeeklyHours] = useState(profile?.weeklyHoursGoal || 15);
  const [studyDays, setStudyDays] = useState<StudyDay[]>(normalizeStudyDays(profile?.studyDays));

  const weekStart = getWeekStartDate();

  useEffect(() => {
    if (user) {
      setLoading(true);
      getLatestStudyPlan(user.uid, level)
        .then((p) => {
          setPlan(p);
          if (p) {
            setCompletedBlocks(p.blocks.filter((b) => b.completed).length);
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

    try {
      const topics = getTopicsForLevel(level);
      const scores = await getTopicScores(user.uid, level);
      const weakTopics = scores
        .filter((s) => s.score < 70)
        .map((s) => ({ topicId: s.topicId, topicName: s.topicName, score: s.score }));

      const { blocks } = await apiGenerateStudyPlan({
        level,
        examDate: profile.examDate,
        weeklyHours,
        studyDays,
        weakTopics,
        topicsList: topics.map((t) => ({ topicId: t.id, topicName: t.name, weightRange: t.weightRange })),
      });

      const newPlan: StudyPlanDoc = {
        blocks: blocks.map((b) => ({
          id: b.id,
          topicId: b.topicId,
          topicName: b.topicName,
          date: b.date,
          durationMinutes: b.durationMinutes,
          type: b.type as "reading" | "practice" | "review",
          completed: false,
          description: b.description,
        })),
        createdAt: new Date().toISOString(),
        level,
        studyDays,
        weeklyHoursGoal: weeklyHours,
      };

      const planId = await saveStudyPlan(user.uid, newPlan);
      setPlan({ ...newPlan, id: planId });
      setCompletedBlocks(0);
    } catch (err) {
      console.error("Study plan generation error:", err);
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
              CFA Level {level} — Organize your preparation
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
        <CardContent className="flex items-center gap-3 p-4">
          <Sparkles className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Tip:</span> Click
            &quot;Generate Plan with AI&quot; to create a personalized plan based on your mock exam
            performance and the areas that need more attention.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">Availability this week</p>
              <p className="text-xs text-muted-foreground">
                Adjust this week without changing your default profile schedule.
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
