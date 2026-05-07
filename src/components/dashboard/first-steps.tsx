"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { getQuizHistory, getLatestStudyPlan, getChatSessions } from "@/lib/firestore";
import { useLevel } from "@/contexts/level-context";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, FileQuestion, MessageCircle, CheckCircle2, Circle, X, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: typeof CalendarDays;
  done: boolean;
}

export function FirstSteps() {
  const { user } = useAuth();
  const { level } = useLevel();
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [allDone, setAllDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!user) return;

    Promise.all([
      getLatestStudyPlan(user.uid, level),
      getQuizHistory(user.uid, 1),
      getChatSessions(user.uid, 1),
    ]).then(([plan, quizzes, chats]) => {
      const hasPlan = !!plan && plan.blocks.length > 0;
      const hasQuiz = quizzes.length > 0;
      const hasChat = chats.length > 0;

      if (hasPlan && hasQuiz && hasChat) {
        setAllDone(true);
        setTimeout(() => setDismissed(true), 5000);
      }

      setSteps([
        {
          id: "chat",
          label: "Ask your first question",
          description: "Try the AI tutor — ask about any CFA topic and see what it can do.",
          href: "/chat?new=1",
          icon: MessageCircle,
          done: hasChat,
        },
        {
          id: "plan",
          label: "Create your study plan",
          description: "Generate a personalized schedule based on your availability and exam date.",
          href: "/plan",
          icon: CalendarDays,
          done: hasPlan,
        },
        {
          id: "practice",
          label: "Complete your first practice",
          description: "Answer a few questions to start building your performance profile.",
          href: "/mock-exam",
          icon: FileQuestion,
          done: hasQuiz,
        },
      ]);
    }).catch(console.error);
  }, [user, level]);

  if (!steps || dismissed) return null;

  if (allDone) {
    return (
      <Card className="border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 to-transparent">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
            <PartyPopper className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-semibold">You're all set!</p>
            <p className="text-xs text-muted-foreground">You've completed all the first steps. Happy studying!</p>
          </div>
          <button onClick={() => setDismissed(true)} className="ml-auto rounded p-1 text-muted-foreground/50 hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </CardContent>
      </Card>
    );
  }

  const doneCount = steps.filter((s) => s.done).length;

  return (
    <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">Get started</p>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {doneCount}/{steps.length}
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="rounded p-1 text-muted-foreground/50 transition-colors hover:bg-accent hover:text-foreground"
            title="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {steps.map((step) => (
            <Link
              key={step.id}
              href={step.href}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                step.done
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-border hover:border-primary/40 hover:bg-accent/50"
              )}
            >
              <div className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                step.done ? "bg-emerald-500/10" : "bg-primary/10"
              )}>
                <step.icon className={cn("h-4 w-4", step.done ? "text-emerald-500" : "text-primary")} />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-medium", step.done && "text-muted-foreground line-through")}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              {step.done ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
              ) : (
                <Circle className="h-5 w-5 shrink-0 text-muted-foreground/30" />
              )}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
