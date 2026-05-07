"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import { useLevel } from "@/contexts/level-context";
import { useAuth } from "@/contexts/auth-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { EXAM_FORMAT, SimuladoMode } from "@/lib/mock-data";
import { apiGenerateQuestions, GeneratedQuestion } from "@/lib/api";
import {
  saveQuizResult,
  QuizResult,
  saveActiveMock,
  getActiveMock,
  deleteActiveMock,
} from "@/lib/firestore";
import { QuizCard } from "@/components/simulado/quiz-card";
import { QuizTimer } from "@/components/simulado/quiz-timer";
import { QuizReview } from "@/components/simulado/quiz-review";
import { QuizChat, QuizChatMessage } from "@/components/simulado/quiz-chat";
import { SimuladoConfig } from "@/components/simulado/simulado-config";
import { MockHistory } from "@/components/simulado/mock-history";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, MessageCircle, Send, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useSubscription } from "@/hooks/use-subscription";
import { UpgradeWall, UsageCounter } from "@/components/layout/upgrade-wall";
import { FeedbackModal } from "@/components/layout/feedback-modal";
import { FREE_LIMITS } from "@/lib/usage-limits";
import { incrementQuizUsage, saveFeedback, resetDailyUsage } from "@/lib/firestore";

type QuizState = "config" | "loading" | "running" | "finished";
type ConfigTab = "start" | "history";

function SimuladoInner() {
  const { level } = useLevel();
  const { user, refreshProfile } = useAuth();
  const { canQuiz, remainingQuiz, isSubscribed: isSub, canFeedback } = useSubscription();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const searchParams = useSearchParams();
  const topics = getTopicsForLevel(level);
  const examFormat = EXAM_FORMAT[level];

  const preselectedTopic = searchParams.get("topic");

  const [state, setState] = useState<QuizState>("config");
  const [configTab, setConfigTab] = useState<ConfigTab>("start");
  const [mode, setMode] = useState<SimuladoMode>("training");
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(() => {
    if (preselectedTopic && topics.some((t) => t.id === preselectedTopic)) {
      return new Set([preselectedTopic]);
    }
    return new Set(topics.map((t) => t.id));
  });
  const [selectedModules, setSelectedModules] = useState<Set<string>>(() => {
    const allMods = new Set<string>();
    const activeTids = preselectedTopic ? [preselectedTopic] : topics.map(t => t.id);
    topics.filter(t => activeTids.includes(t.id)).forEach(t => t.modules.forEach(m => allMods.add(m.id)));
    return allMods;
  });
  const freeMaxQuestions = FREE_LIMITS.quizQuestions;
  const [questionCount, setQuestionCount] = useState(isSub ? 10 : freeMaxQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [discussions, setDiscussions] = useState<Record<string, QuizChatMessage[]>>({});
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [loadingError, setLoadingError] = useState("");
  const [resumePrompt, setResumePrompt] = useState<{
    startedAt: string;
    timeSpentSeconds: number;
    answeredCount: number;
    totalQuestions: number;
  } | null>(null);
  const [resuming, setResuming] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string>("");
  const [resumeError, setResumeError] = useState<string>("");
  const stateRef = useRef<QuizState>("config");
  const initialCountdownRef = useRef<number | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (!user) {
      setResumePrompt(null);
      setResumeError("");
      return;
    }
    if (state !== "config") return;
    let cancelled = false;
    setResumeError("");
    getActiveMock(user.uid, level)
      .then((active) => {
        if (cancelled || !active) {
          setResumePrompt(null);
          return;
        }
        const answeredCountForActive = (active.answers || []).filter(
          (value) => value !== null && value !== undefined
        ).length;
        setResumePrompt({
          startedAt: active.startedAt,
          timeSpentSeconds: active.timeSpentSeconds || 0,
          answeredCount: answeredCountForActive,
          totalQuestions: active.questions?.length || 0,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setResumePrompt(null);
        setResumeError(err instanceof Error ? err.message : "Failed to load active mock");
      });
    return () => {
      cancelled = true;
    };
  }, [user, level, state]);

  useEffect(() => {
    if (state !== "running") return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [state]);

  useEffect(() => {
    if (state !== "running") return;
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("/simulado")) return;
      if (anchor.target === "_blank") return;
      const ok = window.confirm(
        "You are in the middle of a mock exam. Your progress is auto-saved, but are you sure you want to leave this page?"
      );
      if (!ok) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [state]);

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  const countdownSeconds = Math.ceil(questionCount * examFormat.secondsPerQuestion);

  const startedAtRef = useRef<string>("");
  const persistRef = useRef<() => Promise<void>>(() => Promise.resolve());

  useEffect(() => {
    persistRef.current = async () => {
      if (!user || questions.length === 0) return;
      setSaveStatus("saving");
      setSaveError("");
      try {
        await saveActiveMock(user.uid, {
          level,
          mode,
          questions: questions.map((q) => ({
            id: q.id,
            topicId: q.topicId,
            ...(q.moduleId ? { moduleId: q.moduleId } : {}),
            ...(q.losId ? { losId: q.losId } : {}),
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation,
          })),
          answers: answers.map((value) => (value === undefined ? null : value)),
          currentIndex,
          showAnswer,
          timeSpentSeconds: timeSpent,
          ...(initialCountdownRef.current != null
            ? { countdownSecondsTotal: initialCountdownRef.current }
            : {}),
          discussions,
          startedAt: startedAtRef.current || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        setSaveStatus("saved");
        setLastSavedAt(new Date().toISOString());
      } catch (err) {
        console.error("Failed to save active mock:", err);
        setSaveStatus("error");
        setSaveError(err instanceof Error ? err.message : "Unknown save error");
      }
    };
  });

  useEffect(() => {
    if (state !== "running") return;
    if (!startedAtRef.current) {
      startedAtRef.current = new Date().toISOString();
    }
    const tick = () => {
      void persistRef.current();
    };
    tick();
    const interval = window.setInterval(tick, 4000);
    return () => window.clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (state !== "running") return;
    void persistRef.current();
  }, [state, answers, currentIndex, showAnswer, discussions]);

  const handleToggleTopic = (topicId: string) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      const topic = topics.find(t => t.id === topicId);
      if (next.has(topicId)) {
        next.delete(topicId);
        if (topic) {
          setSelectedModules(prev => {
            const n = new Set(prev);
            topic.modules.forEach(m => n.delete(m.id));
            return n;
          });
        }
      } else {
        next.add(topicId);
        if (topic) {
          setSelectedModules(prev => {
            const n = new Set(prev);
            topic.modules.forEach(m => n.add(m.id));
            return n;
          });
        }
      }
      return next;
    });
  };

  const handleToggleModule = (moduleId: string, topicId: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
        setSelectedTopics(p => new Set(p).add(topicId));
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    if (topics.every((t) => selectedTopics.has(t.id))) {
      setSelectedTopics(new Set());
      setSelectedModules(new Set());
    } else {
      setSelectedTopics(new Set(topics.map((t) => t.id)));
      const allMods = new Set<string>();
      topics.forEach(t => t.modules.forEach(m => allMods.add(m.id)));
      setSelectedModules(allMods);
    }
  };

  const handleStart = async (overrides?: {
    mode?: SimuladoMode;
    questionCount?: number;
    selectedTopics?: Set<string>;
    selectedModules?: Set<string>;
  }) => {
    if (resumePrompt) {
      window.alert("You have a mock exam in progress. Resume or discard it before starting a new one.");
      return;
    }
    const activeQuestionCount = overrides?.questionCount ?? questionCount;
    const activeSelectedTopics = overrides?.selectedTopics ?? selectedTopics;
    const activeSelectedModules = overrides?.selectedModules ?? selectedModules;

    if (activeSelectedTopics.size === 0) return;
    if (overrides?.mode) setMode(overrides.mode);
    if (overrides?.questionCount) setQuestionCount(overrides.questionCount);
    if (overrides?.selectedTopics) setSelectedTopics(overrides.selectedTopics);
    if (overrides?.selectedModules) setSelectedModules(overrides.selectedModules);
    setState("loading");
    setLoadingError("");

    try {
      const selectedTopicsList = topics.filter(t => activeSelectedTopics.has(t.id));
      const questionsPerTopic = Math.max(1, Math.ceil(activeQuestionCount / selectedTopicsList.length));

      const allGenerated: GeneratedQuestion[] = [];

      for (const topic of selectedTopicsList) {
        const selectedMods = topic.modules.filter(m => activeSelectedModules.has(m.id));
        const losDescriptions = selectedMods.flatMap((mod) =>
          mod.los.map((description, index) => ({
            id: `${mod.id}:${index}`,
            description,
          }))
        );

        if (losDescriptions.length === 0) continue;

        const remaining = activeQuestionCount - allGenerated.length;
        if (remaining <= 0) break;

        const count = Math.min(questionsPerTopic, remaining);

        const { questions: generated } = await apiGenerateQuestions({
          level,
          topicId: topic.id,
          topicName: topic.name,
          losDescriptions: losDescriptions.slice(0, 15),
          count,
        });

        const enriched = generated.map((question) => {
          const moduleId = question.losId ? question.losId.split(":")[0] : question.moduleId;
          return {
            ...question,
            moduleId,
          };
        });

        allGenerated.push(...enriched);
      }

      if (allGenerated.length === 0) {
        setLoadingError("Could not generate questions. Please try again.");
        setState("config");
        return;
      }

      setQuestions(allGenerated.slice(0, activeQuestionCount));
      setCurrentIndex(0);
      setAnswers(new Array(Math.min(allGenerated.length, activeQuestionCount)).fill(null));
      setShowAnswer(false);
      setTimeSpent(0);
      setChatOpen(false);
      setDiscussions({});
      initialCountdownRef.current = overrides?.mode === "official" || (!overrides?.mode && mode === "official")
        ? Math.ceil(activeQuestionCount * examFormat.secondsPerQuestion)
        : null;
      startedAtRef.current = new Date().toISOString();
      setResumePrompt(null);
      setState("running");
    } catch (err) {
      console.error("Question generation error:", err);
      setLoadingError("Error generating questions. Check your connection and try again.");
      setState("config");
    }
  };

  const handleStartOfficialFull = () => {
    if (resumePrompt) {
      window.alert("You have a mock exam in progress. Resume or discard it before starting a new one.");
      return;
    }
    const allTopicIds = new Set(topics.map((t) => t.id));
    const allModuleIds = new Set<string>();
    topics.forEach((topic) => topic.modules.forEach((module) => allModuleIds.add(module.id)));
    handleStart({
      mode: "official",
      questionCount: examFormat.totalQuestions,
      selectedTopics: allTopicIds,
      selectedModules: allModuleIds,
    });
  };

  const handleSelect = (index: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = index;
      return next;
    });
  };

  const handleConfirmTraining = () => {
    if (answers[currentIndex] === null) return;
    setShowAnswer(true);
  };

  const handleNextTraining = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      setChatOpen(false);
    } else {
      handleFinish();
    }
  };

  const handleSubmitOfficial = () => {
    handleFinish();
  };

  const handleFinish = async () => {
    setState("finished");

    if (!user) return;

    const topicBreakdownMap = new Map<string, { topicName: string; correct: number; total: number }>();

    questions.forEach((q, i) => {
      const topic = topics.find(t => t.id === q.topicId);
      const existing = topicBreakdownMap.get(q.topicId) || {
        topicName: topic?.shortName || q.topicId,
        correct: 0,
        total: 0,
      };
      existing.total += 1;
      if (answers[i] === q.correctIndex) existing.correct += 1;
      topicBreakdownMap.set(q.topicId, existing);
    });

    const correctAnswers = questions.filter((q, i) => answers[i] === q.correctIndex).length;

    const result: QuizResult = {
      date: new Date().toISOString(),
      score: Math.round((correctAnswers / questions.length) * 100),
      totalQuestions: questions.length,
      correctAnswers,
      timeSpentSeconds: timeSpent,
      mode,
      level,
      answers: questions.map((q, i) => {
        const discussion = discussions[q.id]?.map((message) => ({
          role: message.role,
          content: message.content || "",
        }));
        return {
          questionId: q.id,
          topicId: q.topicId,
          ...(q.moduleId ? { moduleId: q.moduleId } : {}),
          ...(q.losId ? { losId: q.losId } : {}),
          question: q.question || "",
          options: q.options || [],
          explanation: q.explanation || "",
          selectedIndex: answers[i] ?? -1,
          correctIndex: q.correctIndex,
          correct: answers[i] === q.correctIndex,
          ...(discussion && discussion.length > 0 ? { discussion } : {}),
        };
      }),
      topicBreakdown: Array.from(topicBreakdownMap.entries()).map(([topicId, data]) => ({
        topicId,
        topicName: data.topicName,
        correct: data.correct,
        total: data.total,
      })),
    };

    try {
      await saveQuizResult(user.uid, result);
      if (!isSub) {
        await incrementQuizUsage(user.uid, questions.length);
        await refreshProfile();
      }
    } catch (err) {
      console.error("Failed to save quiz result:", err);
      window.alert(
        "Could not save the mock result. Your answers are still on screen, but the History entry was not created."
      );
    }

    try {
      await deleteActiveMock(user.uid, level);
    } catch (err) {
      console.error("Failed to clear active mock:", err);
    }
    setResumePrompt(null);
    startedAtRef.current = "";
    initialCountdownRef.current = null;
  };

  const handleTimeUp = useCallback(() => {
    handleFinish();
  }, []);

  const handleTimeUpdate = useCallback((s: number) => {
    setTimeSpent(s);
  }, []);

  const handleRestart = () => {
    setState("config");
    setCurrentIndex(0);
    setAnswers([]);
    setShowAnswer(false);
    setTimeSpent(0);
    setChatOpen(false);
    setQuestions([]);
    setDiscussions({});
    startedAtRef.current = "";
    initialCountdownRef.current = null;
  };

  const handleResumeActive = async () => {
    if (!user) return;
    setResuming(true);
    try {
      const active = await getActiveMock(user.uid, level);
      if (!active) {
        setResumePrompt(null);
        return;
      }
      setMode(active.mode);
      setQuestions(
        active.questions.map((q) => ({
          id: q.id,
          topicId: q.topicId,
          moduleId: q.moduleId,
          losId: (q as { losId?: string }).losId,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        }))
      );
      setAnswers(active.answers || new Array(active.questions.length).fill(null));
      setCurrentIndex(active.currentIndex || 0);
      setShowAnswer(active.showAnswer || false);
      setTimeSpent(active.timeSpentSeconds || 0);
      setDiscussions(active.discussions || {});
      setQuestionCount(active.questions.length);
      initialCountdownRef.current = active.countdownSecondsTotal ?? null;
      startedAtRef.current = active.startedAt;
      setResumePrompt(null);
      setChatOpen(false);
      setState("running");
    } catch (err) {
      console.error("Failed to resume active mock:", err);
    } finally {
      setResuming(false);
    }
  };

  const handleDiscardActive = async () => {
    if (!user) return;
    const ok = window.confirm(
      "Discard the in-progress mock? You will lose all answers and the discussion saved so far."
    );
    if (!ok) return;
    try {
      await deleteActiveMock(user.uid, level);
    } catch (err) {
      console.error("Failed to discard active mock:", err);
    }
    setResumePrompt(null);
  };

  // --- CONFIG ---
  if (state === "config") {
    return (
      <>
        {loadingError && (
          <div className="mx-auto mb-4 max-w-2xl rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {loadingError}
          </div>
        )}
        {resumePrompt && (
          <div className="mx-auto mb-4 max-w-5xl rounded-2xl border border-primary/40 bg-primary/5 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">Mock exam in progress</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {resumePrompt.answeredCount}/{resumePrompt.totalQuestions} answered ·{" "}
                  {Math.round(resumePrompt.timeSpentSeconds / 60)}min spent · started{" "}
                  {new Date(resumePrompt.startedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleDiscardActive}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent"
                >
                  Discard
                </button>
                <button
                  onClick={handleResumeActive}
                  disabled={resuming}
                  className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {resuming ? "Resuming..." : "Resume"}
                </button>
              </div>
            </div>
          </div>
        )}
        {resumeError && (
          <div className="mx-auto mb-4 max-w-5xl rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs text-destructive">
            Could not load active mock from Firebase: {resumeError}
          </div>
        )}
        <div className="mx-auto mb-5 flex max-w-5xl gap-2 rounded-xl border border-border bg-card p-1">
          <button
            onClick={() => setConfigTab("start")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              configTab === "start" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            Start Mock
          </button>
          <button
            onClick={() => {
              if (!isSub) {
                window.location.href = "/pricing";
                return;
              }
              setConfigTab("history");
            }}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              configTab === "history" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            History {!isSub && <span className="ml-1 text-[9px] text-amber-500">PRO</span>}
          </button>
        </div>
        {configTab === "history" ? (
          user ? (
            <MockHistory uid={user.uid} />
          ) : (
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
              Sign in to see your mock exam history.
            </div>
          )
        ) : resumePrompt ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-sm font-semibold">Finish your in-progress mock first</p>
            <p className="mt-2 text-xs text-muted-foreground">
              You can only run one mock exam at a time. Resume the active mock or discard it
              above to start a new one.
            </p>
          </div>
        ) : (
        <>
          {!canQuiz && (
            <div className="mx-auto mb-6 max-w-2xl">
              <UpgradeWall
                title="Daily question limit reached"
                description="Subscribe for unlimited mock exams with AI-generated questions and real exam conditions."
                usedCount={FREE_LIMITS.quizQuestions}
                limitCount={FREE_LIMITS.quizQuestions}
                unit="questions"
              />
              {canFeedback && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Or</p>
                  <button
                    onClick={() => setFeedbackOpen(true)}
                    className="rounded-lg bg-secondary px-4 py-2 text-xs font-medium transition-colors hover:bg-accent"
                  >
                    Give feedback & get +5 questions today
                  </button>
                </div>
              )}
              <FeedbackModal
                open={feedbackOpen}
                onClose={() => setFeedbackOpen(false)}
                bonus
                onSubmit={async (rating, comment) => {
                  if (!user) return;
                  await saveFeedback({ uid: user.uid, email: user.email || "", rating, comment, createdAt: new Date().toISOString(), source: "limit_hit" });
                  await resetDailyUsage(user.uid);
                  await refreshProfile();
                }}
              />
            </div>
          )}
          {canQuiz && !isSub && (
            <div className="mx-auto mb-3 flex max-w-2xl justify-end">
              <UsageCounter remaining={remainingQuiz} total={FREE_LIMITS.quizQuestions} unit="questions" />
            </div>
          )}
          <SimuladoConfig
            selectedTopics={selectedTopics}
            selectedModules={selectedModules}
            onToggleTopic={handleToggleTopic}
            onToggleModule={handleToggleModule}
            onToggleAll={handleToggleAll}
            questionCount={questionCount}
            onSetCount={(n) => setQuestionCount(isSub ? n : Math.min(n, freeMaxQuestions))}
            mode={mode}
            onSetMode={setMode}
            onStart={canQuiz ? handleStart : () => {}}
            onStartOfficialFull={canQuiz ? handleStartOfficialFull : () => {}}
            availableQuestionCount={questionCount}
            isSubscribed={isSub}
          />
        </>
        )}
      </>
    );
  }

  // --- LOADING ---
  if (state === "loading") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Generating questions with AI...</p>
        <p className="text-xs text-muted-foreground">This may take a few seconds</p>
      </div>
    );
  }

  // --- FINISHED ---
  if (state === "finished") {
    return (
      <QuizReview
        questions={questions}
        answers={answers}
        totalTimeSeconds={timeSpent}
        discussions={discussions}
        onRestart={handleRestart}
      />
    );
  }

  const saveStatusPill = (() => {
    if (saveStatus === "saving") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
          <Loader2 className="h-3 w-3 animate-spin" /> Saving
        </span>
      );
    }
    if (saveStatus === "saved" && lastSavedAt) {
      const seconds = Math.max(1, Math.round((Date.now() - new Date(lastSavedAt).getTime()) / 1000));
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-300">
          Saved {seconds}s ago
        </span>
      );
    }
    if (saveStatus === "error") {
      return (
        <span
          title={saveError || "Save failed"}
          className="inline-flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/10 px-2.5 py-1 text-[10px] font-medium text-destructive"
        >
          Save failed
        </span>
      );
    }
    return null;
  })();

  const saveErrorBanner = saveStatus === "error" && saveError ? (
    <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-[11px] text-destructive">
      Auto-save failed: {saveError}
    </div>
  ) : null;

  // --- RUNNING: OFFICIAL ---
  if (mode === "official") {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <div className="sticky top-0 z-20 rounded-2xl border border-border bg-background/95 p-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono tabular-nums">
                {currentIndex + 1} / {questions.length}
              </Badge>
              <Badge variant="outline" className="font-mono tabular-nums">
                {answeredCount} answered
              </Badge>
              {saveStatusPill}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <QuizTimer
                isRunning
                mode="countdown"
                initialSeconds={initialCountdownRef.current ?? countdownSeconds}
                startSeconds={timeSpent}
                onTimeUp={handleTimeUp}
                onTimeUpdate={handleTimeUpdate}
              />
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium disabled:opacity-30 hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              ) : null}
              <button
                onClick={handleSubmitOfficial}
                className="flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <Send className="h-4 w-4" /> Submit
              </button>
            </div>
          </div>
          <Progress value={progressPercent} className="mt-3 h-2" />
        </div>

        {saveErrorBanner}

        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`flex h-7 w-7 items-center justify-center rounded text-[10px] font-bold transition-colors ${
                i === currentIndex
                  ? "bg-primary text-primary-foreground"
                  : answers[i] !== null
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {currentQuestion && (
          <QuizCard
            question={currentQuestion}
            selectedIndex={answers[currentIndex]}
            showAnswer={false}
            onSelect={handleSelect}
          />
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:opacity-30 hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          <div className="flex gap-2">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
            <button
              onClick={handleSubmitOfficial}
              className="flex items-center gap-1 rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Send className="h-4 w-4" /> Submit Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RUNNING: TRAINING ---
  return (
    <div className={`mx-auto grid w-full max-w-7xl gap-5 ${chatOpen ? "lg:grid-cols-[minmax(0,1fr)_460px]" : "lg:grid-cols-[minmax(0,820px)] lg:justify-center"}`}>
      <div className="flex min-w-0 flex-col items-center gap-4">
        <div className="sticky top-0 z-20 w-full rounded-2xl border border-border bg-background/95 p-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono tabular-nums">
                {currentIndex + 1} / {questions.length}
              </Badge>
              {saveStatusPill}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <QuizTimer
                isRunning
                mode="countup"
                startSeconds={timeSpent}
                onTimeUpdate={handleTimeUpdate}
              />
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  chatOpen ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"
                }`}
                title="Discuss question"
              >
                <MessageCircle className="h-4 w-4" />
                Discuss
              </button>
              {!showAnswer ? (
                <button
                  onClick={handleConfirmTraining}
                  disabled={answers[currentIndex] === null}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40"
                >
                  Confirm
                </button>
              ) : (
                <button
                  onClick={handleNextTraining}
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  {currentIndex < questions.length - 1 ? "Next Question" : "View Results"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <Progress value={((currentIndex + (showAnswer ? 1 : 0)) / questions.length) * 100} className="mt-3 h-2" />
        </div>

        {saveErrorBanner}

        {currentQuestion && (
          <QuizCard
            question={currentQuestion}
            selectedIndex={answers[currentIndex]}
            showAnswer={showAnswer}
            onSelect={handleSelect}
          />
        )}

        <div className="flex gap-3">
          {!showAnswer ? (
            <button
              onClick={handleConfirmTraining}
              disabled={answers[currentIndex] === null}
              className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              Confirm Answer
            </button>
          ) : (
            <button
              onClick={handleNextTraining}
              className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {currentIndex < questions.length - 1 ? "Next Question" : "View Results"}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {chatOpen && currentQuestion && (
        <QuizChat
          question={currentQuestion}
          selectedIndex={answers[currentIndex]}
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          messages={discussions[currentQuestion.id] ?? []}
          onMessagesChange={(next) =>
            setDiscussions((prev) => ({ ...prev, [currentQuestion.id]: next }))
          }
          isFreeUser={!isSub}
          maxFreeMessages={2}
        />
      )}
    </div>
  );
}

export default function SimuladoPage() {
  return (
    <Suspense>
      <SimuladoInner />
    </Suspense>
  );
}
