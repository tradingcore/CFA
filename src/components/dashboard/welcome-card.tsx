"use client";

import { useLevel } from "@/contexts/level-context";
import { getDaysUntilExam } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, Flame, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const MOTIVATIONAL_QUOTES = [
  { text: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The four most dangerous words in investing are: 'this time it's different.'", author: "Sir John Templeton" },
  { text: "In investing, what is comfortable is rarely profitable.", author: "Robert Arnott" },
  { text: "Know what you own, and know why you own it.", author: "Peter Lynch" },
  { text: "The individual investor should act consistently as an investor and not as a speculator.", author: "Benjamin Graham" },
  { text: "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong.", author: "George Soros" },
  { text: "The biggest risk of all is not taking one.", author: "Mellody Hobson" },
  { text: "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "Risk comes from not knowing what you're doing.", author: "Warren Buffett" },
  { text: "The essence of investment management is the management of risks, not the management of returns.", author: "Benjamin Graham" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Provérbio Chinês" },
  { text: "Spend each day trying to be a little wiser than you were when you woke up.", author: "Charlie Munger" },
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { text: "The goal of a successful trader is to make the best trades. Money is secondary.", author: "Alexander Elder" },
  { text: "Diversification is protection against ignorance. It makes little sense if you know what you are doing.", author: "Warren Buffett" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confúcio" },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function getDailyQuote() {
  const today = new Date();
  const dayHash = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = dayHash % MOTIVATIONAL_QUOTES.length;
  return MOTIVATIONAL_QUOTES[index];
}

export function WelcomeCard() {
  const { level } = useLevel();
  const daysLeft = getDaysUntilExam(level);
  const [greeting, setGreeting] = useState("Bom dia");
  const [quote, setQuote] = useState(MOTIVATIONAL_QUOTES[0]);

  useEffect(() => {
    setGreeting(getGreeting());
    setQuote(getDailyQuote());
  }, []);

  return (
    <Card className="col-span-full overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">
              {greeting}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Você está se preparando para o{" "}
              <span className="font-semibold text-primary">CFA Level {level}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
              <CalendarClock className="h-7 w-7 text-primary" />
              <div className="flex flex-col">
                <span className="text-xl font-bold font-mono tabular-nums text-primary">
                  {daysLeft}
                </span>
                <span className="text-[10px] text-muted-foreground">dias até a prova</span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm">
              <Flame className="h-7 w-7 text-orange-500" />
              <div className="flex flex-col">
                <span className="text-xl font-bold font-mono tabular-nums">7</span>
                <span className="text-[10px] text-muted-foreground">dias seguidos</span>
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
