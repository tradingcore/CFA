"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/lib/firestore";
import { CFALevel } from "@/lib/cfa-topics";
import { DEFAULT_STUDY_DAYS, StudyDay } from "@/lib/study-availability";
import { StudyDaysSelector } from "@/components/study/study-days-selector";
import { ArrowRight, ArrowLeft, Loader2, GraduationCap, CalendarDays, Clock } from "lucide-react";
import { Logo } from "@/components/layout/logo";

const LEVELS: { value: CFALevel; label: string; desc: string }[] = [
  { value: "I", label: "CFA Level I", desc: "Foundations — Ethics, Quant, FSA, Equity, FI, Derivatives, Alts, PM" },
  { value: "II", label: "CFA Level II", desc: "Application — Valuation, advanced analysis, risk models" },
  { value: "III", label: "CFA Level III", desc: "Synthesis — Portfolio management, wealth, specialized pathways" },
];

export default function OnboardingPage() {
  const { user, refreshProfile } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<CFALevel>("I");
  const [examDate, setExamDate] = useState("2026-08-25");
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [studyDays, setStudyDays] = useState<StudyDay[]>(DEFAULT_STUDY_DAYS);
  const [saving, setSaving] = useState(false);

  const handleFinish = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, {
        cfaLevel: level,
        examDate,
        weeklyHoursGoal: weeklyHours,
        studyDays,
        onboardingCompleted: true,
      });
      await refreshProfile();
      router.replace("/dashboard");
    } catch (err) {
      console.error("Onboarding save error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex flex-col items-center gap-3">
          <Logo size={56} rounded="rounded-2xl" />
          <h1 className="text-2xl font-bold">Initial Setup</h1>
          <p className="text-sm text-muted-foreground">
            Let&apos;s personalize your experience in {3 - step} steps
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-8 bg-primary" : i < step ? "w-2 bg-primary/60" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 0: Level */}
        {step === 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              Which CFA level are you studying for?
            </div>
            <div className="space-y-3">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  onClick={() => setLevel(l.value)}
                  className={`w-full rounded-xl border-2 px-5 py-4 text-left transition-all ${
                    level === l.value
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border hover:border-primary/30 hover:bg-accent/50"
                  }`}
                >
                  <span className="text-base font-semibold">{l.label}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{l.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Exam Date */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              When is your exam?
            </div>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none ring-ring focus:ring-2"
            />
            <p className="text-xs text-muted-foreground">
              We use the date to calculate remaining days and adjust your study plan.
            </p>
          </div>
        )}

        {/* Step 2: Weekly Hours */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="h-4 w-4" />
              How many hours per week can you study?
            </div>
            <div className="flex flex-col items-center gap-4">
              <span className="text-5xl font-bold text-primary">{weeklyHours}h</span>
              <input
                type="range"
                min={5}
                max={40}
                step={1}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex w-full justify-between text-xs text-muted-foreground">
                <span>5h</span>
                <span>20h</span>
                <span>40h</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              The CFA Institute recommends ~300 total study hours per level.
            </p>
            <StudyDaysSelector
              selectedDays={studyDays}
              weeklyHours={weeklyHours}
              onChange={setStudyDays}
            />
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={saving || studyDays.length === 0}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Start Studying
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
