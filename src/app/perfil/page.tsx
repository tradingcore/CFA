"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useLevel } from "@/contexts/level-context";
import { updateUserProfile } from "@/lib/firestore";
import { CFALevel } from "@/lib/cfa-topics";
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PerfilPage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { setLevel } = useLevel();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [cfaLevel, setCfaLevel] = useState<CFALevel>(profile?.cfaLevel || "I");
  const [examDate, setExamDate] = useState(profile?.examDate || "");
  const [weeklyHours, setWeeklyHours] = useState(profile?.weeklyHoursGoal || 15);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (profile) {
      setCfaLevel(profile.cfaLevel);
      setExamDate(profile.examDate);
      setWeeklyHours(profile.weeklyHoursGoal);
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

  const daysUntilExam = examDate
    ? Math.ceil((new Date(examDate).getTime() - Date.now()) / 86400000)
    : null;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Meu Perfil</h1>
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
            <span className="text-[10px] text-muted-foreground">Dias seguidos</span>
          </CardContent>
        </Card>
        {daysUntilExam != null && daysUntilExam > 0 && (
          <Card>
            <CardContent className="flex flex-col items-center gap-1 p-4">
              <CalendarDays className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{daysUntilExam}</span>
              <span className="text-[10px] text-muted-foreground">Dias até a prova</span>
            </CardContent>
          </Card>
        )}
      </div>

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
              Data da prova
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
              Meta semanal: {weeklyHours}h
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

          {mounted && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Tema</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                    theme === "dark" ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
                  }`}
                >
                  <Moon className="h-4 w-4" /> Escuro
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-2 text-sm font-medium transition-all ${
                    theme === "light" ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
                  }`}
                >
                  <Sun className="h-4 w-4" /> Claro
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              "Salvo!"
            ) : (
              <>
                <Save className="h-4 w-4" /> Salvar Alterações
              </>
            )}
          </button>
        </CardContent>
      </Card>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 rounded-xl border border-destructive/30 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
      >
        <LogOut className="h-4 w-4" /> Sair da conta
      </button>
    </div>
  );
}
