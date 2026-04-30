"use client";

import { useEffect, useState } from "react";
import { getQuizHistory, QuizResult } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Clock, FileQuestion, Target } from "lucide-react";

interface MockHistoryProps {
  uid: string;
}

const optionLetters = ["A", "B", "C", "D"];

export function MockHistory({ uid }: MockHistoryProps) {
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedResultId, setExpandedResultId] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  useEffect(() => {
    getQuizHistory(uid, 50)
      .then(setHistory)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [uid]);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Loading mock history...
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No mock exams yet. Complete a training set or official exam to review it here.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-3">
      {history.map((result) => {
        const isOpen = expandedResultId === result.id;
        const minutes = Math.round(result.timeSpentSeconds / 60);
        const topicSummary = result.topicBreakdown
          .map((topic) => `${topic.topicName}: ${topic.correct}/${topic.total}`)
          .join(" · ");

        return (
          <Card key={result.id} className="overflow-hidden">
            <button
              onClick={() => setExpandedResultId(isOpen ? null : result.id || null)}
              className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-accent/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <FileQuestion className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">
                    {result.mode === "official" ? "Official Exam" : "Training Set"} · Level {result.level}
                  </p>
                  <Badge variant={result.score >= 70 ? "default" : result.score >= 50 ? "secondary" : "destructive"}>
                    {result.score}%
                  </Badge>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {new Date(result.date).toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  · {result.totalQuestions} questions · {minutes}min
                </p>
                {topicSummary && (
                  <p className="mt-1 truncate text-[10px] text-muted-foreground">
                    {topicSummary}
                  </p>
                )}
              </div>
              <div className="hidden items-center gap-5 sm:flex">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Target className="h-4 w-4" />
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {minutes}m
                </div>
              </div>
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>

            {isOpen && (
              <CardContent className="border-t border-border p-4">
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {result.topicBreakdown.map((topic) => (
                    <div key={topic.topicId} className="rounded-lg border border-border px-3 py-2">
                      <p className="truncate text-xs font-medium">{topic.topicName}</p>
                      <p className="mt-1 font-mono text-sm font-semibold">
                        {topic.correct}/{topic.total}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  {result.answers.map((answer, index) => {
                    const questionKey = `${result.id}-${answer.questionId}-${index}`;
                    const questionOpen = expandedQuestionId === questionKey;
                    const selectedLetter = answer.selectedIndex >= 0 ? optionLetters[answer.selectedIndex] : "No answer";
                    const correctLetter = optionLetters[answer.correctIndex];

                    return (
                      <div
                        key={questionKey}
                        className={cn(
                          "rounded-xl border",
                          answer.correct ? "border-emerald-500/30" : "border-red-500/30"
                        )}
                      >
                        <button
                          onClick={() => setExpandedQuestionId(questionOpen ? null : questionKey)}
                          className="flex w-full items-center gap-3 p-3 text-left"
                        >
                          <Badge variant={answer.correct ? "default" : "destructive"} className="shrink-0">
                            Q{index + 1}
                          </Badge>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {answer.question || `Question ${index + 1}`}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Your answer: {selectedLetter}
                              {!answer.correct && ` · Correct: ${correctLetter}`}
                            </p>
                          </div>
                          {questionOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>

                        {questionOpen && (
                          <div className="border-t border-border p-4">
                            <p className="mb-4 text-sm leading-relaxed">{answer.question}</p>
                            <div className="mb-4 flex flex-col gap-2">
                              {(answer.options || []).map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className={cn(
                                    "flex items-start gap-3 rounded-lg border px-3 py-2 text-sm",
                                    optionIndex === answer.correctIndex && "border-emerald-500 bg-emerald-500/10",
                                    optionIndex === answer.selectedIndex && optionIndex !== answer.correctIndex && "border-red-500 bg-red-500/10"
                                  )}
                                >
                                  <span className="font-mono font-bold">{optionLetters[optionIndex]}</span>
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                            {answer.explanation && (
                              <div className="rounded-lg border border-border bg-muted/40 p-3">
                                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                  Explanation
                                </p>
                                <p className="text-sm leading-relaxed">{answer.explanation}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
