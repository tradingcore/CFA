"use client";

import { useLevel } from "@/contexts/level-context";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, Flame, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { MOTIVATIONAL_QUOTES } from "@/lib/motivational-quotes";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getRandomQuote() {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

export function WelcomeCard() {
  const { level } = useLevel();
  const { user, profile } = useAuth();
  const [greeting, setGreeting] = useState("Good morning");
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);

  const daysLeft = profile?.examDate
    ? Math.ceil((new Date(profile.examDate).getTime() - Date.now()) / 86400000)
    : null;

  const displayName = user?.displayName || profile?.displayName || "";
  const streak = profile?.studyStreak || 0;

  useEffect(() => {
    setGreeting(getGreeting());
    setQuote(getRandomQuote());
  }, []);

  return (
    <Card className="col-span-full overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {greeting}{displayName ? `, ${displayName.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-sm text-muted-foreground">
              You are preparing for the{" "}
              <span className="font-semibold text-primary">CFA Level {level}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {daysLeft != null && daysLeft > 0 && (
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
                <CalendarClock className="h-7 w-7 text-primary" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold font-mono tabular-nums text-primary">
                    {daysLeft}
                  </span>
                  <span className="text-[10px] text-muted-foreground">days until exam</span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
              <Flame className="h-7 w-7 text-orange-500" />
              <div className="flex flex-col">
                <span className="text-xl font-bold font-mono tabular-nums">{streak}</span>
                <span className="text-[10px] text-muted-foreground">day streak</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-card/60 px-4 py-3">
          <Quote className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
          <div>
            <p className="text-sm italic leading-relaxed text-foreground/80">
              &ldquo;{quote.text}&rdquo;
            </p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">
              — {quote.author}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
