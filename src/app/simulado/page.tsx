"use client";

import { useState, useCallback, Suspense } from "react";
import { useLevel } from "@/contexts/level-context";
import { useAuth } from "@/contexts/auth-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { EXAM_FORMAT, SimuladoMode } from "@/lib/mock-data";
import { apiGenerateQuestions, GeneratedQuestion } from "@/lib/api";
import { saveQuizResult, QuizResult } from "@/lib/firestore";
import { QuizCard } from "@/components/simulado/quiz-card";
import { QuizTimer } from "@/components/simulado/quiz-timer";
import { QuizReview } from "@/components/simulado/quiz-review";
import { QuizChat } from "@/components/simulado/quiz-chat";
import { SimuladoConfig } from "@/components/simulado/simulado-config";
import { MockHistory } from "@/components/simulado/mock-history";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, MessageCircle, Send, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

type QuizState = "config" | "loading" | "running" | "finished";
type ConfigTab = "start" | "history";

function SimuladoInner() {
  const { level } = useLevel();
  const { user } = useAuth();
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
  const [questionCount, setQuestionCount] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [loadingError, setLoadingError] = useState("");

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  const countdownSeconds = Math.ceil(questionCount * examFormat.secondsPerQuestion);

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
        const losDescriptions = selectedMods.flatMap(m => m.los);

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

        allGenerated.push(...generated);
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
      setState("running");
    } catch (err) {
      console.error("Question generation error:", err);
      setLoadingError("Error generating questions. Check your connection and try again.");
      setState("config");
    }
  };

  const handleStartOfficialFull = () => {
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
      answers: questions.map((q, i) => ({
        questionId: q.id,
        topicId: q.topicId,
        moduleId: q.moduleId,
        question: q.question,
        options: q.options,
        explanation: q.explanation,
        selectedIndex: answers[i] ?? -1,
        correctIndex: q.correctIndex,
        correct: answers[i] === q.correctIndex,
      })),
      topicBreakdown: Array.from(topicBreakdownMap.entries()).map(([topicId, data]) => ({
        topicId,
        topicName: data.topicName,
        correct: data.correct,
        total: data.total,
      })),
    };

    try {
      await saveQuizResult(user.uid, result);
    } catch (err) {
      console.error("Failed to save quiz result:", err);
    }
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
            onClick={() => setConfigTab("history")}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              configTab === "history" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
            }`}
          >
            History
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
        ) : (
        <SimuladoConfig
          selectedTopics={selectedTopics}
          selectedModules={selectedModules}
          onToggleTopic={handleToggleTopic}
          onToggleModule={handleToggleModule}
          onToggleAll={handleToggleAll}
          questionCount={questionCount}
          onSetCount={setQuestionCount}
          mode={mode}
          onSetMode={setMode}
          onStart={handleStart}
          onStartOfficialFull={handleStartOfficialFull}
          availableQuestionCount={questionCount}
        />
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
        onRestart={handleRestart}
      />
    );
  }

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
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <QuizTimer
                isRunning
                mode="countdown"
                initialSeconds={countdownSeconds}
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
            <Badge variant="secondary" className="font-mono tabular-nums">
              {currentIndex + 1} / {questions.length}
            </Badge>
            <div className="flex flex-wrap items-center gap-2">
              <QuizTimer isRunning mode="countup" onTimeUpdate={handleTimeUpdate} />
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
