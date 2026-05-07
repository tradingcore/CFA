"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useLevel } from "@/contexts/level-context";
import { updateUserProfile } from "@/lib/firestore";
import { CFALevel } from "@/lib/cfa-topics";
import { DEFAULT_STUDY_DAYS, normalizeStudyDays, StudyDay } from "@/lib/study-availability";
import { StudyDaysSelector } from "@/components/study/study-days-selector";
import { useSubscription } from "@/hooks/use-subscription";
import { FREE_LIMITS } from "@/lib/usage-limits";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  User,
  CalendarDays,
  Clock,
  Moon,
  Sun,
  LogOut,
  Save,
  Loader2,
  GraduationCap,
  Flame,
  Crown,
  MessageCircle,
  FileQuestion,
  Sparkles,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PerfilPage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { setLevel } = useLevel();
  const { isSubscribed: isSub, subscriptionStatus, remainingChat, remainingQuiz } = useSubscription();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [cfaLevel, setCfaLevel] = useState<CFALevel>(profile?.cfaLevel || "I");
  const [examDate, setExamDate] = useState(profile?.examDate || "");
  const [weeklyHours, setWeeklyHours] = useState(profile?.weeklyHoursGoal || 15);
  const [studyDays, setStudyDays] = useState<StudyDay[]>(
    normalizeStudyDays(profile?.studyDays ?? DEFAULT_STUDY_DAYS)
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (profile) {
      setCfaLevel(profile.cfaLevel);
      setExamDate(profile.examDate);
      setWeeklyHours(profile.weeklyHoursGoal);
      setStudyDays(normalizeStudyDays(profile.studyDays));
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, {
        cfaLevel,
        examDate,
        weeklyHoursGoal: weeklyHours,
        studyDays,
      });
      setLevel(cfaLevel);
      await refreshProfile();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Profile save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  const handleManageSubscription = async () => {
    if (!profile?.stripeCustomerId) return;
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: profile.stripeCustomerId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Portal error:", err);
    }
  };

  const daysUntilExam = examDate
    ? Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000)
    : null;

  const isCancelling = profile?.cancelAtPeriodEnd && (subscriptionStatus === "active" || subscriptionStatus === "trialing");

  const planLabel = isCancelling ? "Cancelled"
    : subscriptionStatus === "trialing" ? "Pro"
    : subscriptionStatus === "active" ? "Pro"
    : subscriptionStatus === "past_due" ? "Past Due"
    : subscriptionStatus === "cancelled" ? "Cancelled"
    : "Free";

  const planColor = isCancelling ? "text-amber-500"
    : subscriptionStatus === "active" || subscriptionStatus === "trialing"
    ? "text-emerald-500"
    : subscriptionStatus === "past_due"
    ? "text-amber-500"
    : "text-muted-foreground";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center gap-1 p-4">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">Level {profile?.cfaLevel || "I"}</span>
            <span className="text-[10px] text-muted-foreground">CFA</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center gap-1 p-4">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-2xl font-bold">{profile?.studyStreak || 0}</span>
            <span className="text-[10px] text-muted-foreground">Day streak</span>
          </CardContent>
        </Card>
        {daysUntilExam != null && daysUntilExam > 0 && (
          <Card>
            <CardContent className="flex flex-col items-center gap-1 p-4">
              <CalendarDays className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{daysUntilExam}</span>
              <span className="text-[10px] text-muted-foreground">Days until exam</span>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Subscription card */}
      <Card className={isSub ? "border-emerald-500/30 bg-emerald-500/5" : "border-primary/30"}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Crown className={`h-5 w-5 ${isSub ? "text-emerald-500" : "text-muted-foreground"}`} />
              <span className="text-sm font-semibold">Subscription</span>
            </div>
            <span className={`text-sm font-bold ${planColor}`}>
              {planLabel}
            </span>
          </div>

          {isSub ? (
            <div className="space-y-3">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Unlimited chat</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileQuestion className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Unlimited mock exams</span>
                </div>
              </div>
              {isCancelling && profile?.currentPeriodEnd ? (
                <div className="rounded-lg bg-amber-500/10 px-3 py-2">
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    Subscription cancelled — active until {new Date(profile.currentPeriodEnd).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    You won&apos;t be charged again. Full access continues until this date.
                  </p>
                </div>
              ) : profile?.currentPeriodEnd ? (
                <p className="text-xs text-muted-foreground">
                  Renews: {new Date(profile.currentPeriodEnd).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              ) : null}
              {profile?.stripeCustomerId && (
                <button
                  onClick={handleManageSubscription}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  <CreditCard className="h-4 w-4" />
                  Manage Subscription
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Chat messages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${((FREE_LIMITS.chatMessages - remainingChat) / FREE_LIMITS.chatMessages) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">
                      {FREE_LIMITS.chatMessages - remainingChat}/{FREE_LIMITS.chatMessages}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Quiz questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${((FREE_LIMITS.quizQuestions - remainingQuiz) / FREE_LIMITS.quizQuestions) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono tabular-nums text-muted-foreground">
                      {FREE_LIMITS.quizQuestions - remainingQuiz}/{FREE_LIMITS.quizQuestions}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/pricing"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-600 py-3 text-sm font-semibold text-white shadow transition-all hover:opacity-90 hover:shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade to Pro
                <ArrowRight className="h-4 w-4" />
              </Link>

              <p className="text-center text-[10px] text-muted-foreground">
                Unlimited chat, mock exams, AI study plans, and full LOS tracking.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit form */}
      <Card>
        <CardContent className="space-y-5 p-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">CFA Level</label>
            <div className="flex gap-2">
              {(["I", "II", "III"] as CFALevel[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setCfaLevel(l)}
                  className={`flex-1 rounded-lg border-2 py-2 text-sm font-semibold transition-all ${
                    cfaLevel === l
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  Level {l}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="exam-date">
              <CalendarDays className="mr-1 inline h-4 w-4" />
              Exam date
            </label>
            <input
              id="exam-date"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none ring-ring focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              <Clock className="mr-1 inline h-4 w-4" />
              Weekly goal: {weeklyHours}h
            </label>
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
          />

          {mounted && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                    theme === "dark" ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
                  }`}
                >
                  <Moon className="h-4 w-4" /> Dark
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                    theme === "light" ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
                  }`}
                >
                  <Sun className="h-4 w-4" /> Light
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving || studyDays.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              "Saved!"
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Changes
              </>
            )}
          </button>
        </CardContent>
      </Card>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 rounded-xl border border-destructive/30 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
      >
        <LogOut className="h-4 w-4" /> Sign Out
      </button>
    </div>
  );
}
