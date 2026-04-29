"use client";

import { MockQuestion } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizCardProps {
  question: MockQuestion;
  selectedIndex: number | null;
  showAnswer: boolean;
  onSelect: (index: number) => void;
}

const optionLetters = ["A", "B", "C", "D"];

/**
 * Renders a quiz question with multiple-choice options.
 * @param question - The question data to display
 * @param selectedIndex - Index of the currently selected option (null if none)
 * @param showAnswer - Whether to reveal correct/incorrect states
 * @param onSelect - Callback when an option is clicked
 * @returns Quiz card component
 */
export function QuizCard({ question, selectedIndex, showAnswer, onSelect }: QuizCardProps) {
  return (
    <Card className="w-full max-w-2xl border-0 shadow-lg">
      <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
        <p className="text-lg font-medium leading-relaxed">{question.question}</p>

        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isCorrect = index === question.correctIndex;

            let state: "default" | "selected" | "correct" | "incorrect" = "default";
            if (showAnswer && isCorrect) state = "correct";
            else if (showAnswer && isSelected && !isCorrect) state = "incorrect";
            else if (isSelected) state = "selected";

            return (
              <button
                key={index}
                onClick={() => !showAnswer && onSelect(index)}
                disabled={showAnswer}
                className={cn(
                  "flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left text-sm transition-all duration-200",
                  state === "default" && "border-border hover:border-primary/40 hover:bg-primary/5",
                  state === "selected" && "border-primary bg-primary/10",
                  state === "correct" && "border-emerald-500 bg-emerald-500/10",
                  state === "incorrect" && "border-rose-500 bg-rose-500/10",
                  !showAnswer && "cursor-pointer"
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                    state === "default" && "bg-muted text-muted-foreground",
                    state === "selected" && "bg-primary text-primary-foreground",
                    state === "correct" && "bg-emerald-500 text-white",
                    state === "incorrect" && "bg-rose-500 text-white"
                  )}
                >
                  {optionLetters[index]}
                </span>
                <span className="flex-1">{option}</span>
                {showAnswer && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                )}
                {showAnswer && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 shrink-0 text-rose-500" />
                )}
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Explicação
            </p>
            <p className="text-sm leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
