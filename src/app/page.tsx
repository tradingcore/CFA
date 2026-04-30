"use client";

import { TrendingUp, Brain, Target, BarChart3, MessageCircle, CalendarDays, CheckCircle2, ArrowRight, BookOpen, Zap, Database, Shield } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Database,
    title: "Massive CFA Question Bank",
    desc: "Thousands of AI-generated questions mapped to every single LOS across all 3 levels. New questions every session — never repeat the same quiz twice.",
  },
  {
    icon: Brain,
    title: "CFA-Specific AI Tutor",
    desc: "Not a generic chatbot. Our AI is trained on the complete CFA curriculum — Ethics to Portfolio Management. It thinks like a CFA charterholder.",
  },
  {
    icon: Target,
    title: "Exam-Realistic Mock Exams",
    desc: "Official mode with countdown timer and free navigation, or training mode with instant feedback. Exactly like the real Prometric experience.",
  },
  {
    icon: BarChart3,
    title: "Deep Performance Analytics",
    desc: "Radar charts, topic-by-topic breakdown, weekly trends. Know exactly where you're strong and where to focus — down to individual LOS.",
  },
  {
    icon: CalendarDays,
    title: "AI-Powered Study Plans",
    desc: "One click generates a personalized 14-day plan based on your exam date, weak topics, and available hours. Adapts as you improve.",
  },
  {
    icon: CheckCircle2,
    title: "LOS-Level Progress Tracking",
    desc: "Track every single Learning Outcome Statement across all modules. See exactly what you've covered and what's left — no blind spots.",
  },
];

const DIFFERENTIALS = [
  {
    icon: BookOpen,
    title: "Complete 2026 Curriculum",
    desc: "Every topic, every module, every LOS for Level I, II, and III — fully mapped and indexed.",
  },
  {
    icon: Zap,
    title: "Not Generic AI",
    desc: "ChatGPT doesn't know the CFA curriculum structure. We do. Every answer is grounded in the actual syllabus.",
  },
  {
    icon: Shield,
    title: "Built by CFA Candidates",
    desc: "We know the pain. We built the tool we wished we had — focused, structured, and exam-obsessed.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 sm:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">Trading Core</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Link
            href="/registro"
            className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start Free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <Brain className="h-3.5 w-3.5" />
          The most complete CFA-focused AI on the market
        </div>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          Your <span className="text-primary">best CFA buddy</span> — powered by AI
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          The only AI study platform built exclusively for the CFA exam.
          Complete 2026 curriculum context, massive question bank, and a tutor that
          actually understands the syllabus — not a generic chatbot with guesses.
        </p>
        <div className="flex flex-col items-center gap-3 pt-2">
          <Link
            href="/registro"
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
          >
            Start Studying Now <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="text-xs text-muted-foreground">Level I, II & III — 2026 Curriculum</p>
        </div>
      </section>

      {/* Why not generic AI */}
      <section className="border-t border-border bg-card/50 px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center text-2xl font-bold sm:text-3xl">
            Why generic AI fails CFA candidates
          </h2>
          <p className="mb-10 text-center text-muted-foreground max-w-2xl mx-auto">
            ChatGPT, Claude, Gemini — they&apos;re brilliant, but they don&apos;t have the CFA curriculum
            mapped at the LOS level. We do. That&apos;s the difference between a good answer and the right answer.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {DIFFERENTIALS.map((d) => (
              <div
                key={d.title}
                className="flex flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <d.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{d.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
            Everything you need to pass the CFA
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            One platform. All three levels. Zero blind spots.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof numbers */}
      <section className="border-t border-b border-border bg-card/50 px-6 py-12 sm:px-12">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-12 sm:gap-20">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-primary">10,000+</span>
            <span className="text-xs text-muted-foreground">AI-Generated Questions</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-primary">3 Levels</span>
            <span className="text-xs text-muted-foreground">Complete Coverage</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-primary">500+</span>
            <span className="text-xs text-muted-foreground">Learning Outcomes</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-primary">24/7</span>
            <span className="text-xs text-muted-foreground">AI Tutor Access</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-md">
          <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
            Simple pricing. Serious results.
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            Full access to everything. No hidden fees. Cancel anytime.
          </p>

          <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-xl">
            <div className="mb-2 text-center">
              <span className="text-5xl font-bold">$40</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="mb-6 text-center text-xs text-muted-foreground">
              Less than a single CFA prep book
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {[
                "Unlimited AI-generated questions",
                "Official & training mock exams",
                "24/7 CFA-specialized AI tutor",
                "Personalized study plans",
                "Detailed performance analytics",
                "LOS-level progress tracking",
                "Level I, II & III — full 2026 curriculum",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/registro"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start Studying Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 px-6 py-16 text-center sm:px-12">
        <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
          Stop guessing. Start passing.
        </h2>
        <p className="mb-6 text-muted-foreground">
          Join the smartest way to prepare for the CFA exam.
        </p>
        <Link
          href="/registro"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90"
        >
          Get Started <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">Trading Core</span>
        </div>
        <p className="mt-2">&copy; {new Date().getFullYear()} Trading Core. All rights reserved.</p>
      </footer>
    </div>
  );
}
