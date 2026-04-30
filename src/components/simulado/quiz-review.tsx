"use client";

import { useState } from "react";
import type { GeneratedQuestion } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, ChevronDown, ChevronRight, Filter, Trophy, Clock, Target, RotateCcw, MessageCircle } from "lucide-react";
import { MarkdownMessage } from "@/components/chat/markdown-message";
import type { QuizChatMessage } from "@/components/simulado/quiz-chat";

interface QuizReviewProps {
  questions: GeneratedQuestion[];
  answers: (number | null)[];
  totalTimeSeconds: number;
  discussions?: Record<string, QuizChatMessage[]>;
  onRestart: () => void;
}

const optionLetters = ["A", "B", "C", "D"];

/**
 * Post-quiz review screen showing all questions with user answers vs correct answers.
 * @param questions - Array of questions from the quiz
 * @param answers - Array of user-selected answer indices (null if unanswered)
 * @param totalTimeSeconds - Total time spent
 * @param onRestart - Callback to restart
 * @returns Review component
 */
export function QuizReview({ questions, answers, totalTimeSeconds, discussions, onRestart }: QuizReviewProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showOnlyErrors, setShowOnlyErrors] = useState(false);

  const correctCount = questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= 70;
  const minutes = Math.floor(totalTimeSeconds / 60);
  const secs = totalTimeSeconds % 60;

  const displayQuestions = showOnlyErrors
    ? questions.filter((q, i) => answers[i] !== q.correctIndex)
    : questions;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      {/* Summary */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
            <div className="flex flex-col items-center gap-1">
              <div className="relative flex h-24 w-24 items-center justify-center">
                <svg width={96} height={96} className="-rotate-90">
                  <circle cx={48} cy={48} r={40} fill="none" stroke="currentColor" strokeWidth={6} className="text-muted/30" />
                  <circle cx={48} cy={48} r={40} fill="none" stroke="currentColor" strokeWidth={6}
                    strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 * (1 - score / 100)}
                    strokeLinecap="round" className={passed ? "text-emerald-500" : "text-amber-500"} />
                </svg>
                <span className="absolute text-2xl font-bold font-mono">{score}%</span>
              </div>
              <Badge variant={passed ? "default" : "secondary"}>{passed ? "Passed" : "Failed"}</Badge>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col items-center gap-1">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-xl font-bold font-mono">{correctCount}/{questions.length}</span>
                <span className="text-[10px] text-muted-foreground">Correct</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-xl font-bold font-mono">{minutes}:{String(secs).padStart(2, "0")}</span>
                <span className="text-[10px] text-muted-foreground">Time</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Trophy className="h-5 w-5 text-amber-500" />
                <span className="text-xl font-bold font-mono">{questions.length - correctCount}</span>
                <span className="text-[10px] text-muted-foreground">Errors</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter + restart */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowOnlyErrors(!showOnlyErrors)}
          className={cn(
            "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
            showOnlyErrors ? "border-red-500 bg-red-500/10 text-red-500" : "border-border hover:bg-accent"
          )}
        >
          <Filter className="h-4 w-4" />
          {showOnlyErrors ? "Showing errors only" : "Show errors only"}
        </button>
        <button
          onClick={onRestart}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          <RotateCcw className="h-4 w-4" />
          New Exam
        </button>
      </div>

      {/* Question list */}
      <div className="flex flex-col gap-2">
        {displayQuestions.map((q) => {
          const qIndex = questions.indexOf(q);
          const userAnswer = answers[qIndex];
          const isCorrect = userAnswer === q.correctIndex;
          const isExpanded = expandedId === q.id;

          return (
            <Card key={q.id} className={cn("transition-colors", isCorrect ? "border-emerald-500/30" : "border-red-500/30")}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <div className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  isCorrect ? "bg-emerald-500/10" : "bg-red-500/10"
                )}>
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    <span className="text-muted-foreground">Q{qIndex + 1}.</span> {q.question}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your answer: {userAnswer !== null ? optionLetters[userAnswer] : "No answer"}
                    {!isCorrect && ` · Correct: ${optionLetters[q.correctIndex]}`}
                  </p>
                </div>
                {isExpanded ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
              </button>

              {isExpanded && (
                <CardContent className="border-t border-border pt-4 pb-4">
                  <p className="text-sm mb-4">{q.question}</p>
                  <div className="flex flex-col gap-2 mb-4">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border px-4 py-2.5 text-sm",
                          i === q.correctIndex && "border-emerald-500 bg-emerald-500/10",
                          i === userAnswer && i !== q.correctIndex && "border-red-500 bg-red-500/10",
                          i !== q.correctIndex && i !== userAnswer && "border-border"
                        )}
                      >
                        <span className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold",
                          i === q.correctIndex ? "bg-emerald-500 text-white" :
                          i === userAnswer ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"
                        )}>
                          {optionLetters[i]}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {i === q.correctIndex && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        {i === userAnswer && i !== q.correctIndex && <XCircle className="h-4 w-4 text-red-500" />}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg bg-muted/50 border border-border p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Explanation</p>
                    <p className="text-sm leading-relaxed">{q.explanation}</p>
                  </div>
                  {discussions?.[q.id]?.length ? (
                    <div className="mt-4 rounded-xl border border-border bg-card p-3">
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <MessageCircle className="h-3 w-3" />
                        Discussion
                      </div>
                      <div className="flex flex-col gap-2">
                        {discussions[q.id].map((message, messageIndex) => (
                          <div
                            key={messageIndex}
                            className={cn(
                              "rounded-xl px-3 py-2 text-xs leading-relaxed",
                              message.role === "user"
                                ? "self-end bg-primary text-primary-foreground"
                                : "self-start bg-secondary"
                            )}
                          >
                            {message.role === "assistant" ? (
                              <MarkdownMessage content={message.content} />
                            ) : (
                              message.content
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
