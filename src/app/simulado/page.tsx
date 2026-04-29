"use client";

import { useState, useCallback, useMemo, Suspense } from "react";
import { useLevel } from "@/contexts/level-context";
import { getTopicsForLevel } from "@/lib/cfa-topics";
import { mockQuestions, SimuladoMode, EXAM_FORMAT } from "@/lib/mock-data";
import { QuizCard } from "@/components/simulado/quiz-card";
import { QuizTimer } from "@/components/simulado/quiz-timer";
import { QuizReview } from "@/components/simulado/quiz-review";
import { QuizChat } from "@/components/simulado/quiz-chat";
import { SimuladoConfig } from "@/components/simulado/simulado-config";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";

type QuizState = "config" | "running" | "finished";

function SimuladoInner() {
  const { level } = useLevel();
  const searchParams = useSearchParams();
  const topics = getTopicsForLevel(level);
  const allQuestions = mockQuestions[level];
  const examFormat = EXAM_FORMAT[level];

  const preselectedTopic = searchParams.get("topic");

  const [state, setState] = useState<QuizState>("config");
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

  const filteredQuestions = useMemo(() => {
    const matching = allQuestions.filter((q) => {
      if (!selectedTopics.has(q.topicId)) return false;
      if (q.moduleId && !selectedModules.has(q.moduleId)) return false;
      return true;
    });
    return matching.slice(0, questionCount);
  }, [allQuestions, selectedTopics, selectedModules, questionCount]);

  const availableQuestionCount = useMemo(
    () => allQuestions.filter((q) => {
      if (!selectedTopics.has(q.topicId)) return false;
      if (q.moduleId && !selectedModules.has(q.moduleId)) return false;
      return true;
    }).length,
    [allQuestions, selectedTopics, selectedModules]
  );

  const currentQuestion = filteredQuestions[currentIndex];
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = filteredQuestions.length > 0 ? (answeredCount / filteredQuestions.length) * 100 : 0;
  const correctCount = filteredQuestions.filter((q, i) => answers[i] === q.correctIndex).length;

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

  const handleStart = () => {
    if (filteredQuestions.length === 0) return;
    setState("running");
    setCurrentIndex(0);
    setAnswers(new Array(filteredQuestions.length).fill(null));
    setShowAnswer(false);
    setTimeSpent(0);
    setChatOpen(false);
  };

  const handleSelect = (index: number) => {
    if (mode === "official") {
      setAnswers(prev => {
        const next = [...prev];
        next[currentIndex] = index;
        return next;
      });
    } else {
      setAnswers(prev => {
        const next = [...prev];
        next[currentIndex] = index;
        return next;
      });
    }
  };

  const handleConfirmTraining = () => {
    if (answers[currentIndex] === null) return;
    setShowAnswer(true);
  };

  const handleNextTraining = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      setChatOpen(false);
    } else {
      setState("finished");
    }
  };

  const handleSubmitOfficial = () => {
    setState("finished");
  };

  const handleTimeUp = useCallback(() => {
    setState("finished");
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
  };

  // --- CONFIG ---
  if (state === "config") {
    return (
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
        availableQuestionCount={availableQuestionCount}
      />
    );
  }

  // --- FINISHED ---
  if (state === "finished") {
    return (
      <QuizReview
        questions={filteredQuestions}
        answers={answers}
        totalTimeSeconds={timeSpent}
        onRestart={handleRestart}
      />
    );
  }

  // --- RUNNING: OFFICIAL ---
  if (mode === "official") {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="font-mono tabular-nums">
            {currentIndex + 1} / {filteredQuestions.length}
          </Badge>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono tabular-nums">
              {answeredCount} respondidas
            </Badge>
            <QuizTimer
              isRunning
              mode="countdown"
              initialSeconds={countdownSeconds}
              onTimeUp={handleTimeUp}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
        </div>

        <Progress value={progressPercent} className="h-2" />

        {/* Question nav dots */}
        <div className="flex flex-wrap gap-1.5">
          {filteredQuestions.map((_, i) => (
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

        <QuizCard
          question={currentQuestion}
          selectedIndex={answers[currentIndex]}
          showAnswer={false}
          onSelect={handleSelect}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:opacity-30 hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Anterior
          </button>

          <div className="flex gap-2">
            {currentIndex < filteredQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                Próxima <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
            <button
              onClick={handleSubmitOfficial}
              className="flex items-center gap-1 rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Send className="h-4 w-4" /> Finalizar Prova
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RUNNING: TRAINING ---
  return (
    <div className="flex gap-0">
      <div className={`mx-auto flex max-w-2xl flex-1 flex-col items-center gap-4 ${chatOpen ? "mr-0" : ""}`}>
        <div className="flex w-full items-center justify-between">
          <Badge variant="secondary" className="font-mono tabular-nums">
            {currentIndex + 1} / {filteredQuestions.length}
          </Badge>
          <div className="flex items-center gap-2">
            <QuizTimer isRunning mode="countup" onTimeUpdate={handleTimeUpdate} />
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                chatOpen ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-accent"
              }`}
              title="Discutir questão"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="w-full">
          <Progress value={((currentIndex + (showAnswer ? 1 : 0)) / filteredQuestions.length) * 100} className="h-2" />
        </div>

        <QuizCard
          question={currentQuestion}
          selectedIndex={answers[currentIndex]}
          showAnswer={showAnswer}
          onSelect={handleSelect}
        />

        <div className="flex gap-3">
          {!showAnswer ? (
            <button
              onClick={handleConfirmTraining}
              disabled={answers[currentIndex] === null}
              className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={handleNextTraining}
              className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {currentIndex < filteredQuestions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {chatOpen && (
        <QuizChat question={currentQuestion} isOpen={chatOpen} onClose={() => setChatOpen(false)} />
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
