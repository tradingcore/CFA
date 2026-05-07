"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Compass,
  Target,
  CalendarDays,
  Map as MapIcon,
  MessageCircle,
  AlarmClock,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Shield,
  ArrowRight,
} from "lucide-react";

interface SectionLink {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sections: SectionLink[] = [
  { id: "loop", label: "The weekly loop", icon: Compass },
  { id: "mastery", label: "Mastery states", icon: Target },
  { id: "readiness", label: "Exam readiness", icon: TrendingUp },
  { id: "scenarios", label: "Common scenarios", icon: Sparkles },
  { id: "review", label: "Spaced review", icon: AlarmClock },
  { id: "map", label: "Performance Map", icon: MapIcon },
  { id: "plan", label: "Study Plan", icon: CalendarDays },
  { id: "mock", label: "Mock Exam", icon: BookOpen },
  { id: "chat", label: "AI tutor", icon: MessageCircle },
  { id: "best", label: "Best practices", icon: Shield },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

interface Scenario {
  title: string;
  setup: string;
  result: string;
  reading: string;
}

const scenarios: Scenario[] = [
  {
    title: "I only studied Ethics this week",
    setup: "You answered 30 questions on Ethics, got 24 right (80%). You did not touch the other 9 topics.",
    result: "Readiness shows ~80%. Coverage shows ~15% (only Ethics is measured).",
    reading: "The number is mathematically right, but it only represents 1 topic. The remaining 85% of the program is unknown. Pass odds in real life are still very low. Action: practice another topic next so Coverage grows.",
  },
  {
    title: "I took 1 mock with 90 questions and got 60 right",
    setup: "Your mock had questions across all 10 topics. Score: 60/90 = 67%. Topics ended with 4–12 attempts each.",
    result: "Readiness lands around 65–70%, Coverage jumps to ~95%, several topics show Strong, a few still In progress, none yet Mastered.",
    reading: "This is exactly the right mix to start a study cycle: enough Coverage to trust the number, enough gaps to know where to focus. Action: open Recommended Focus and drill the weakest 3 topics.",
  },
  {
    title: "Last week Readiness was 60%, this week it dropped to 56%",
    setup: "You did a tough new-style mock and missed several Derivatives questions in a row.",
    result: "Weekly snapshot shows -4 pts, Derivatives moves from Strong to Practiced.",
    reading: "Don't panic. The mock revealed real gaps that were hidden before — that is useful, not bad. Action: spend 2–3 sessions on the weak module, redo a few questions, the number will recover within 1–2 weeks.",
  },
  {
    title: "FSA shows 100% but the badge says In progress",
    setup: "You answered 1 FSA question and got it right.",
    result: "Topic shows 100% accuracy but stays In progress.",
    reading: "1 right out of 1 is just luck-of-the-draw. We need at least 5 attempts before judging the topic and 12+ for Mastered. Action: do 4 more FSA questions and the badge will update.",
  },
  {
    title: "30 LOS are due for review",
    setup: "You studied hard 3 weeks ago, then took a break. Now several modules' next-review dates have passed.",
    result: "LOS due for review = 30 (high), Recommended Focus shows topics with the most due LOS.",
    reading: "Forgetting is normal — that is exactly why spaced review exists. Action: spend 30–45 minutes redoing 2–3 questions on each due LOS. The counter will drop to ~10 within a week.",
  },
  {
    title: "Readiness 75% but Coverage only 60%",
    setup: "You did mostly well in the topics you practiced, but skipped some entirely.",
    result: "Readiness looks like 'pass zone', but 40% of the program is unmeasured.",
    reading: "Imagine the 4 untouched topics turn out to be your weakest — your real readiness could be 55%. Action: do a small set on each unpracticed topic to bring Coverage above 90% before trusting the 75%.",
  },
];

interface MasteryState {
  label: string;
  rule: string;
  meaning: string;
  badge: string;
}

const masteryStates: MasteryState[] = [
  {
    label: "Not started",
    rule: "0 attempts",
    meaning: "We do not have any data on this LOS yet. Practice once to start tracking.",
    badge: "bg-muted text-muted-foreground",
  },
  {
    label: "In progress",
    rule: "1–4 attempts",
    meaning: "Sample is too small to draw conclusions. Keep practicing — even 100% here is not Mastered.",
    badge: "bg-blue-500/10 text-blue-500",
  },
  {
    label: "Practiced",
    rule: "5+ attempts and accuracy < 60%",
    meaning: "You are practicing it but accuracy is low. Read the module and review fundamentals before more questions.",
    badge: "bg-amber-500/10 text-amber-500",
  },
  {
    label: "Strong",
    rule: "5+ attempts and accuracy ≥ 60% (but < 80% or sample < 12)",
    meaning: "You are getting most questions right. Keep doing focused practice to push toward Mastered.",
    badge: "bg-emerald-500/10 text-emerald-500",
  },
  {
    label: "Mastered",
    rule: "12+ attempts, accuracy ≥ 80%, recent activity",
    meaning: "Solid signal of proficiency. Will degrade to Needs review if you stop practicing for too long.",
    badge: "bg-emerald-500 text-white",
  },
  {
    label: "Needs review",
    rule: "Spaced-repetition due date passed",
    meaning: "Even Strong/Mastered LOS resurface here when it is time to refresh. Open the LOS, redo a couple of questions.",
    badge: "bg-rose-500/10 text-rose-500",
  },
];

interface FlowStep {
  step: string;
  title: string;
  description: string;
  link: { href: string; label: string };
  icon: React.ComponentType<{ className?: string }>;
}

const flow: FlowStep[] = [
  {
    step: "01",
    title: "Take a baseline mock",
    description:
      "Run a 30–60 question mock that covers most topics so we collect enough signal to estimate readiness.",
    link: { href: "/mock-exam", label: "Open Mock Exam" },
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Read the Performance Map",
    description:
      "Look at the states (not the raw %) per topic and module. Mastered requires real evidence, so trust the badge over a percent.",
    link: { href: "/map", label: "Open Performance Map" },
    icon: MapIcon,
  },
  {
    step: "03",
    title: "Generate your Study Plan",
    description:
      "Tell the AI what you want to focus on, pick a few modules and let it schedule reading + practice + review for the next 7–30 days.",
    link: { href: "/plan", label: "Open Study Plan" },
    icon: CalendarDays,
  },
  {
    step: "04",
    title: "Practice in short, targeted sets",
    description:
      "From any topic in the map, click Practice to drill it. Discuss tricky questions in the in-mock chat — it gets saved with the result.",
    link: { href: "/mock-exam", label: "Practice now" },
    icon: Target,
  },
  {
    step: "05",
    title: "Use the AI tutor for concepts",
    description:
      "Ask the tutor when you need a long explanation, attach a screenshot of a question or formula, or have it walk you through a derivation.",
    link: { href: "/chat", label: "Open Chat" },
    icon: MessageCircle,
  },
];

const bestPractices = [
  {
    title: "Trust sample size, not percent",
    body: "1/1 right is 100% but means nothing. Aim for at least 5 attempts before judging a LOS, 12+ for Mastered.",
  },
  {
    title: "Mix reading and practice",
    body: "Reading without practice does not stick; practice without reading just memorizes wrong answers. The Study Plan alternates them on purpose.",
  },
  {
    title: "Respect the review queue",
    body: "Needs review badges appear when the SM-2 interval expires. Doing them early protects long-term retention.",
  },
  {
    title: "Use weight-aware focus",
    body: "Recommended Focus combines weak accuracy with the official CFA topic weight. That is why Ethics and FRA show up more often than smaller topics.",
  },
  {
    title: "Keep mocks honest",
    body: "Use Official Mock Exam without notes once a week to track readiness. Save resumed mocks for short sessions of practice.",
  },
  {
    title: "Discuss the question you just missed",
    body: "Inside a mock, open Discuss to ask the tutor about the exact question. Your conversation is saved in the review screen.",
  },
];

const faq = [
  {
    q: "I scored 100% on a topic but it shows In progress. Why?",
    a: "Because sample size is too small. Until you reach 5 attempts on that topic, we keep it as In progress to avoid false confidence.",
  },
  {
    q: "What is Exam Readiness exactly?",
    a: "A weighted average of accuracy across topics, weighted by the official CFA weight ranges. Topics without data do not contribute, and the badge shows how much of the curriculum is covered.",
  },
  {
    q: "How does the LOS review queue work?",
    a: "When you answer a question we update an SM-2-style schedule per LOS. Wrong answers reset the interval. Right answers grow it (1d, 3d, then 6 days × ease factor).",
  },
  {
    q: "Can I edit a Study Plan block?",
    a: "Yes — you can mark blocks as completed, and you can re-generate a new plan any time. The new plan replaces the old one for that level.",
  },
  {
    q: "What happens if I close a mock by accident?",
    a: "Your in-progress mock is auto-saved every few seconds. When you come back to Mock Exam you will see Resume mock with the question, timer and discussions intact.",
  },
];

const metrics = [
  {
    name: "Accuracy",
    formula: "correct / attempts",
    notes: "Per LOS, module, topic and level. Hidden until you have at least 5 attempts.",
  },
  {
    name: "Effective accuracy",
    formula: "0.7 × accuracy + 0.3 × recencyWeight",
    notes: "recencyWeight = exp(-days_since_last_seen / 14). Used internally to age out old mastery.",
  },
  {
    name: "Topic readiness",
    formula: "accuracy × CFA_weight",
    notes: "Each topic contributes proportionally to the official exam weight.",
  },
  {
    name: "Exam readiness",
    formula: "Σ (accuracy × weight) ÷ Σ weight",
    notes: "Sum is over topics with data. Coverage badge tells how much of the curriculum we already measured.",
  },
  {
    name: "Recommended focus score",
    formula: "(1 − accuracy) × weight × 100 + 5 × due_LOS",
    notes: "Topics with bad accuracy and high CFA weight surface first; due LOS push them up too.",
  },
];

function SectionHeader({ id, icon: Icon, title, subtitle }: { id: string; icon: React.ComponentType<{ className?: string }>; title: string; subtitle: string }) {
  return (
    <div id={id} className="flex items-start gap-3 pt-2">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 pb-16">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <HelpCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">How Trading Core works</h1>
            <p className="text-sm text-muted-foreground">
              A short guide to what each section does, how the metrics are computed, and how to study effectively.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <Card>
            <CardContent className="flex flex-col gap-1 p-3">
              <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-accent"
                >
                  <section.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{section.label}</span>
                </a>
              ))}
            </CardContent>
          </Card>
        </aside>

        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <SectionHeader
              id="loop"
              icon={Compass}
              title="The weekly loop"
              subtitle="Five steps that compound week after week. Each one feeds the next."
            />
            <Card>
              <CardContent className="flex flex-col gap-3 p-5">
                {flow.map((item) => (
                  <div key={item.step} className="flex items-start gap-3 rounded-xl border border-border p-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                      {item.step}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <Link
                          href={item.link.href}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[10px] font-medium hover:border-primary hover:text-primary"
                        >
                          {item.link.label}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="mastery"
              icon={Target}
              title="Mastery states"
              subtitle="Each LOS, module and topic has a state. The state is more honest than a raw percent."
            />
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">How we decide a state</CardTitle>
                <p className="text-xs text-muted-foreground">
                  We never call something Mastered without enough evidence. Sample size always wins over a lucky streak.
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {masteryStates.map((state) => (
                  <div key={state.label} className="flex flex-col gap-1.5 rounded-xl border border-border p-3">
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-[11px]", state.badge)}>{state.label}</Badge>
                      <span className="text-[11px] font-mono text-muted-foreground">{state.rule}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{state.meaning}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="readiness"
              icon={TrendingUp}
              title="Exam readiness"
              subtitle="A weighted estimate of how the real exam would go today, based on the data you have so far."
            />
            <Card>
              <CardContent className="flex flex-col gap-4 p-5 text-sm">
                <p>
                  Exam readiness is the average of your accuracy per topic, weighted by the official CFA weight ranges.
                  Topics without enough attempts do not enter the average — that is why the dashboard also shows a
                  Coverage badge so you know how much of the curriculum we already measured.
                </p>
                <div className="rounded-lg border border-border bg-card/40 p-3 font-mono text-xs">
                  readiness = Σ (topic.accuracy × topic.weight) ÷ Σ (topic.weight only for topics with data)
                </div>
                <p className="text-xs text-muted-foreground">
                  Practical reading: a 70% readiness with 90% coverage is much stronger than 70% with 30% coverage.
                  Drive coverage up by adding mocks across topics; drive readiness up by improving accuracy where the
                  weight is biggest (Ethics, FRA on Level I, etc.).
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="scenarios"
              icon={Sparkles}
              title="Common scenarios"
              subtitle="Real situations you will run into, with the right way to read the numbers and what to do next."
            />
            <div className="flex flex-col gap-3">
              {scenarios.map((scenario) => (
                <Card key={scenario.title}>
                  <CardContent className="flex flex-col gap-2 p-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">{scenario.title}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
                      <div className="rounded-lg border border-border bg-muted/30 p-3">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Setup
                        </p>
                        <p className="leading-relaxed">{scenario.setup}</p>
                      </div>
                      <div className="rounded-lg border border-border bg-muted/30 p-3">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          What you see
                        </p>
                        <p className="leading-relaxed">{scenario.result}</p>
                      </div>
                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                          How to read &amp; act
                        </p>
                        <p className="leading-relaxed">{scenario.reading}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="review"
              icon={AlarmClock}
              title="Spaced review"
              subtitle="A SM-2 schedule per LOS makes sure you revisit material before forgetting it."
            />
            <Card>
              <CardContent className="flex flex-col gap-3 p-5 text-sm">
                <p>
                  Each LOS has its own next-review date. After every attempt we update an ease factor and an interval:
                </p>
                <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
                  <li className="rounded-lg border border-border p-2">
                    <span className="font-semibold text-foreground">Right answer:</span> ease grows by 15% (capped),
                    streak goes up, next review at 1d → 3d → 6d × ease for streak ≥ 3.
                  </li>
                  <li className="rounded-lg border border-border p-2">
                    <span className="font-semibold text-foreground">Wrong answer:</span> ease drops by 15% (floored),
                    streak resets, next review tomorrow.
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground">
                  When the next-review date passes, that LOS appears as Needs review and it bubbles up in Recommended Focus.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="map"
              icon={MapIcon}
              title="Performance Map"
              subtitle="See your strengths and gaps at three levels: topic, module, LOS."
            />
            <Card>
              <CardContent className="flex flex-col gap-3 p-5 text-sm">
                <p>
                  Each topic row shows its state, accuracy, sample size and CFA weight. Click a topic to see modules,
                  and click a module to see the LOS list with their individual states. The radar on the left averages
                  topic accuracy and ignores topics with fewer than 5 attempts.
                </p>
                <p className="text-xs text-muted-foreground">
                  Use the Practice button next to a topic to drill it directly. Use Study to read the modules in that topic.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="plan"
              icon={CalendarDays}
              title="Study Plan"
              subtitle="An adaptive, week-aware plan that mixes reading, practice, review and mocks."
            />
            <Card>
              <CardContent className="flex flex-col gap-3 p-5 text-sm">
                <p>The Study Plan card has two sides:</p>
                <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
                  <li className="rounded-lg border border-border p-2">
                    <span className="font-semibold text-foreground">Plan goals:</span> a free-text box (&quot;I want to
                    focus on Fixed Income duration&quot;), period selector (1, 2 or 4 weeks), and a multi-select of
                    modules you want to prioritize. You can also toggle &quot;Prioritize weak topics&quot; and &quot;Include
                    1 mock per week&quot;.
                  </li>
                  <li className="rounded-lg border border-border p-2">
                    <span className="font-semibold text-foreground">Availability this week:</span> weekly hours and the
                    days you can study. Saved as a one-week override so changing it does not touch your default profile.
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground">
                  When you click Generate Plan with AI we pass your goals, target modules, weak topics and a snapshot of
                  weak/needs-review LOS to the AI. The result is a list of blocks, each with a module, optionally a few
                  LOS, and direct shortcuts to Open module or Practice.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="mock"
              icon={BookOpen}
              title="Mock Exam"
              subtitle="Two flavors: Official (full-length, timed, no preset filters) and Training (filtered set)."
            />
            <Card>
              <CardContent className="flex flex-col gap-3 p-5 text-sm">
                <p>
                  Inside a mock you can: discuss any question with the tutor, see explanations, navigate freely. We
                  auto-save every few seconds, so leaving and coming back resumes the exam — including the timer and
                  any discussions you had on the questions.
                </p>
                <p className="text-xs text-muted-foreground">
                  When you finish, every answer becomes part of your mastery model. Each question is tagged with the
                  exact LOS it tested, so a single mock improves your map at the LOS level — not just the topic level.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="chat"
              icon={MessageCircle}
              title="AI tutor"
              subtitle="A markdown + KaTeX chat for explanations, derivations and clarifications."
            />
            <Card>
              <CardContent className="flex flex-col gap-3 p-5 text-sm">
                <p>
                  The chat renders math (KaTeX), code, headings and bold inline. You can attach a screenshot of a
                  question or a small text file via the &quot;+&quot; button, or use the microphone to dictate in
                  English. Conversations are saved automatically and listed in the sidebar.
                </p>
                <p className="text-xs text-muted-foreground">
                  Tip: when stuck on a question, copy the question and ask &quot;Explain step by step why the right
                  answer is X&quot;. The tutor is best for derivations and concept questions, not for free-form essays.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="best"
              icon={Shield}
              title="Best practices"
              subtitle="Habits that compound over a CFA prep cycle."
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {bestPractices.map((tip) => (
                <Card key={tip.title}>
                  <CardContent className="flex flex-col gap-1.5 p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">{tip.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{tip.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="metrics"
              icon={TrendingUp}
              title="Formulas at a glance"
              subtitle="If you want to see the math behind every number."
            />
            <Card>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-3">Metric</th>
                      <th className="px-4 py-3">Formula</th>
                      <th className="px-4 py-3">Where it shows up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.map((metric) => (
                      <tr key={metric.name} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-3 font-medium">{metric.name}</td>
                        <td className="px-4 py-3 font-mono text-xs">{metric.formula}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{metric.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <SectionHeader
              id="faq"
              icon={HelpCircle}
              title="FAQ"
              subtitle="Quick answers to questions that come up a lot."
            />
            <div className="flex flex-col gap-2">
              {faq.map((entry) => (
                <Card key={entry.q}>
                  <CardContent className="flex flex-col gap-1 p-4">
                    <p className="text-sm font-semibold">{entry.q}</p>
                    <p className="text-xs text-muted-foreground">{entry.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <Card className="border-dashed border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col gap-1 p-5 text-sm">
                <p className="font-semibold">Still stuck?</p>
                <p className="text-xs text-muted-foreground">
                  Open the AI tutor and ask a meta question like &quot;Given my Performance Map, what should I study
                  next week?&quot; — it has access to your readiness when you write the message.
                </p>
                <Link
                  href="/chat"
                  className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Ask the tutor
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
