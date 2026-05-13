"use client";

import { TrendingUp, Brain, Target, BarChart3, MessageCircle, CalendarDays, CheckCircle2, ArrowRight, BookOpen, Zap, Database, Shield } from "lucide-react";
import Link from "next/link";
import { ActiveUsersBadge } from "@/components/layout/active-users-badge";

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
            href="/register"
            className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start Free
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Free to start — no credit card required
          </div>
          <ActiveUsersBadge />
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
            href="/register"
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
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
            Start free. Upgrade when ready.
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            Try everything with daily limits. Go Pro for unlimited access.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Free */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold">Free</h3>
              <div className="mt-2 mb-5">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-sm text-muted-foreground"> forever</span>
              </div>
              <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                {[
                  "1 mock exam/day (5 questions)",
                  "3 AI chat messages/day",
                  "Study plan generation",
                  "Study progress tracking",
                  "All CFA levels (I, II, III)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Monthly */}
            <div className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold">Monthly</h3>
              <div className="mt-2 mb-5">
                <span className="text-3xl font-bold">$50</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                {[
                  "Unlimited mock exams",
                  "Unlimited AI chat",
                  "AI charts & explanations",
                  "Full mock history & review",
                  "Complete 2026 curriculum",
                  "Performance analytics",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 6-Month */}
            <div className="relative flex flex-col rounded-2xl border-2 border-primary bg-card p-6 shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  Most popular
                </span>
              </div>
              <h3 className="text-lg font-bold">6-Month</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">$250</span>
                <span className="text-sm text-muted-foreground">/6 months</span>
              </div>
              <p className="mb-5 text-xs text-emerald-500 font-semibold">Save $50 vs monthly</p>
              <ul className="mb-6 flex flex-1 flex-col gap-2.5">
                {[
                  "Everything in Monthly",
                  "Best value for exam prep",
                  "Lock in your rate",
                  "Cancel anytime",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-center text-2xl font-bold sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            Everything you need to know before getting started.
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                q: "Do I need a credit card to try Trading Core?",
                a: "No. You can sign up and use the platform for free, with daily limits — no credit card required. Upgrade to Pro only when you want unlimited access.",
              },
              {
                q: "What's included in the Free plan?",
                a: "1 mock exam per day (5 questions), 3 AI chat messages per day, study plan generation, study progress tracking, and access to all CFA levels (I, II, III).",
              },
              {
                q: "How is the AI different from ChatGPT?",
                a: "Our AI is grounded in the complete 2026 CFA curriculum (official LOS, modules, formula sheet, and a curated question bank). It cites specific LOS, won't hallucinate finance concepts, and stays focused on what you'll actually be tested on.",
              },
              {
                q: "I already use Schweser, Mark Meldrum or AnalystPrep — is Trading Core still worth it?",
                a: "Absolutely — and it gets even better. Those are great content sources, but they don't organize your study, track which LOS you're actually weak on, or give you a 24/7 tutor that knows the curriculum. Trading Core sits on top of everything you already have: it builds the schedule, surfaces your weak spots with honest readiness data, generates targeted practice for exactly those LOS, and explains anything you didn't get instantly. Most users tell us it's what finally made their existing materials click.",
              },
              {
                q: "Are the mock exams realistic?",
                a: "Yes. Our question bank includes the same official CFA Institute questions used by the leading prep providers, plus AI-generated practice mapped to actual Learning Outcome Statements. We mirror the official exam format — timer, free navigation, and item sets — with detailed explanations after each question.",
              },
              {
                q: "Which levels are covered?",
                a: "All three CFA levels (I, II, and III) are fully supported with the 2026 curriculum. You can switch levels anytime from your profile.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Cancel from your profile or via the Stripe portal. You keep full access until the end of your billing period — no further charges.",
              },
              {
                q: "How accurate is the readiness score?",
                a: "Readiness only counts LOS where you've answered 3+ questions, so it's statistically meaningful. With ~2,500 questions practiced you'll have a very reliable score. We never inflate the number with insufficient data.",
              },
              {
                q: "Where does the content come from?",
                a: "We're built on the official 2026 CFA Institute curriculum (LOS, modules, topic weights) plus the same official questions used across the major prep providers. The AI is restricted to this curated material — no random web sources, no guesses.",
              },
            ].map((item, i) => (
              <details key={i} className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium">
                  {item.q}
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
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
          href="/register"
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
