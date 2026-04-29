"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Target, RotateCcw } from "lucide-react";

interface QuizResultsProps {
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  onRestart: () => void;
}

/**
 * Displays the final results screen after completing a quiz.
 * @param totalQuestions - Total number of questions in the quiz
 * @param correctAnswers - Number of correctly answered questions
 * @param timeSpentSeconds - Total time spent in seconds
 * @param onRestart - Callback to restart the quiz
 * @returns Results card component
 */
export function QuizResults({
  totalQuestions,
  correctAnswers,
  timeSpentSeconds,
  onRestart,
}: QuizResultsProps) {
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const passed = score >= 70;

  return (
    <Card className="w-full max-w-lg border-0 shadow-lg">
      <CardHeader className="pb-2 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Trophy className={`h-8 w-8 ${passed ? "text-amber-500" : "text-muted-foreground"}`} />
        </div>
        <CardTitle className="text-xl">
          {passed ? "Parabéns!" : "Continue estudando!"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {passed
            ? "Você está no caminho certo para a aprovação."
            : "Revise os tópicos onde errou e tente novamente."}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg width={128} height={128} className="-rotate-90">
              <circle cx={64} cy={64} r={56} fill="none" stroke="currentColor" strokeWidth={8} className="text-muted/30" />
              <circle
                cx={64} cy={64} r={56} fill="none" stroke="currentColor" strokeWidth={8}
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 * (1 - score / 100)}
                strokeLinecap="round"
                className={passed ? "text-emerald-500" : "text-amber-500"}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold font-mono tabular-nums">{score}%</span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-1 rounded-lg border border-border p-3">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold font-mono">
              {correctAnswers}/{totalQuestions}
            </span>
            <span className="text-[10px] text-muted-foreground">Acertos</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg border border-border p-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="text-lg font-bold font-mono">
              {minutes}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-muted-foreground">Tempo</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg border border-border p-3">
            <Trophy className="h-5 w-5 text-amber-500" />
            <Badge variant={passed ? "default" : "secondary"} className="text-xs">
              {passed ? "Aprovado" : "Reprovado"}
            </Badge>
            <span className="text-[10px] text-muted-foreground">Status</span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" />
          Refazer Simulado
        </button>
      </CardContent>
    </Card>
  );
}
