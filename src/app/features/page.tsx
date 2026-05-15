import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, FileQuestion, GraduationCap, CalendarDays, MessageCircle, Sparkles } from "lucide-react";

type FeatureImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

type FeatureSection = {
  id: string;
  eyebrow: string;
  title: string;
  tagline: string;
  bullets: string[];
  images: FeatureImage[];
};

const SECTIONS: FeatureSection[] = [
  {
    id: "dashboard",
    eyebrow: "Dashboard",
    title: "Your prep, at a glance.",
    tagline: "Open the app. See where you stand. No digging.",
    bullets: [
      "Days-until-exam countdown",
      "Readiness score from real LOS practice",
      "Weekly accuracy + streak tracker",
    ],
    images: [
      {
        src: "/features/dashboard.png",
        alt: "Trading Core Dashboard",
        width: 2048,
        height: 1134,
      },
    ],
  },
  {
    id: "mock-exam",
    eyebrow: "Mock Exam",
    title: "Discuss every wrong answer with AI.",
    tagline: "Official mode for exam conditions. Training mode with an AI tutor on every question.",
    bullets: [
      "Real exam timing (90s/question)",
      "Per-question AI explanations on demand",
      "Pick exactly which topics to drill",
    ],
    images: [
      {
        src: "/features/mock-exam-discuss.png",
        alt: "Mock Exam with side-by-side AI discussion",
        width: 2048,
        height: 1134,
        caption: "Live: take an exam and chat with the AI on any question.",
      },
      {
        src: "/features/mock-exam.png",
        alt: "Mock Exam configurator with topic and module selector",
        width: 2048,
        height: 1132,
        caption: "Configure: pick mode, count, and exactly which topics.",
      },
      {
        src: "/features/mock-exam-history.png",
        alt: "Mock Exam history showing a completed mock with answer review",
        width: 2048,
        height: 1134,
        caption: "Review: every past mock, every question, every wrong answer.",
      },
    ],
  },
  {
    id: "study-progress",
    eyebrow: "Study Progress",
    title: "Mastery, not chapters read.",
    tagline: "Every Learning Outcome Statement, tracked and color-coded.",
    bullets: [
      "1,400+ LOS across Levels I, II, III",
      "Heatmap: Not started → Mastered",
      "\"Needs review\" auto-flags forgotten topics",
    ],
    images: [
      {
        src: "/features/study-progress.png",
        alt: "Study Progress page",
        width: 2048,
        height: 1132,
        caption: "Progress: per-module bars, drill into any LOS.",
      },
      {
        src: "/features/performance.png",
        alt: "Performance by Topic with mastery levels",
        width: 2048,
        height: 1136,
        caption: "Performance: overall mastery across all 10 topics.",
      },
      {
        src: "/features/performance-detail.png",
        alt: "Performance drill-down showing per-LOS accuracy and review-due flags",
        width: 2048,
        height: 1134,
        caption: "Drill in: per-LOS accuracy, review-due flags, what to fix next.",
      },
    ],
  },
  {
    id: "study-plan",
    eyebrow: "Study Plan",
    title: "A schedule that bends with your week.",
    tagline: "Day-by-day plan. Skip a day, regenerate, keep going.",
    bullets: [
      "Reading + practice blocks per LOS",
      "Mocks placed to peak on exam day",
      "Regenerate in 5 seconds",
    ],
    images: [
      {
        src: "/features/study-plan.png",
        alt: "Study Plan calendar",
        width: 2048,
        height: 1132,
        caption: "Calendar: reading + practice + mocks on the right days.",
      },
      {
        src: "/features/study-plan-configure.png",
        alt: "Study Plan configure modal: period, hours, days, focus",
        width: 2048,
        height: 1132,
        caption: "Configure: hours, days, focus topics. Regenerate in 5 seconds.",
      },
    ],
  },
  {
    id: "chat",
    eyebrow: "AI Tutor",
    title: "An AI that actually knows the CFA.",
    tagline: "Grounded in the official curriculum via private MCP. Zero internet hallucinations.",
    bullets: [
      "LaTeX formulas, tables, AI charts",
      "Knows your level — never mixes content",
      "Save, resume, or start fresh anytime",
    ],
    images: [
      {
        src: "/features/chat.png",
        alt: "AI Chat interface with structured CFA explanation",
        width: 2048,
        height: 1130,
      },
    ],
  },
];

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  "mock-exam": FileQuestion,
  "study-progress": GraduationCap,
  "study-plan": CalendarDays,
  chat: MessageCircle,
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border px-6 py-16 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            What's inside Trading Core
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            CFA prep that{" "}
            <span className="text-primary">actually adapts to you</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Mock exams. LOS-level tracking. AI tutor on every question.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              See pricing
            </Link>
          </div>

          {/* Quick nav chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {SECTIONS.map((s) => {
              const Icon = ICONS[s.id];
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                  {s.eyebrow}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature sections — image dominant, compact text below */}
      <div className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-24 sm:gap-32">
          {SECTIONS.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-24"
                aria-labelledby={`${s.id}-title`}
              >
                {/* Compact text header */}
                <div className="mx-auto mb-8 max-w-3xl text-center">
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                    {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                    {s.eyebrow}
                  </div>
                  <h2
                    id={`${s.id}-title`}
                    className="text-3xl font-bold tracking-tight sm:text-4xl"
                  >
                    {s.title}
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground">
                    {s.tagline}
                  </p>
                </div>

                {/* Images — capped at 1024px CSS for retina 1:1 sharpness */}
                <div className="mx-auto w-full max-w-5xl">
                  {s.images.map((img, i) => {
                    // Parse "Label: description" from caption.
                    const captionMatch = img.caption?.match(
                      /^([A-Za-z][A-Za-z ]*):\s*(.+)$/,
                    );
                    const dividerLabel = captionMatch?.[1];
                    const captionText = captionMatch?.[2] ?? img.caption;

                    return (
                      <div key={img.src}>
                        {i > 0 && (
                          <div
                            className="my-12 flex items-center gap-4"
                            aria-hidden
                          >
                            <div className="h-px flex-1 bg-border" />
                            {dividerLabel && (
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                  Then
                                </span>
                                <span className="rounded-full border border-primary/30 bg-primary/5 px-4 py-1 text-sm font-bold text-primary">
                                  {dividerLabel}
                                </span>
                              </div>
                            )}
                            <div className="h-px flex-1 bg-border" />
                          </div>
                        )}
                        <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            sizes="(min-width: 1024px) 1024px, 100vw"
                            className="h-auto w-full"
                            priority={s.id === "dashboard" && i === 0}
                            quality={100}
                            unoptimized
                          />
                          {captionText && (
                            <figcaption className="border-t border-border bg-card/60 px-5 py-3 text-center text-xs font-medium text-muted-foreground sm:text-sm">
                              {captionText}
                            </figcaption>
                          )}
                        </figure>
                      </div>
                    );
                  })}
                </div>

                {/* Tiny bullets row below image */}
                <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  {s.bullets.map((b, i) => (
                    <li key={b} className="inline-flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-primary/40" aria-hidden>
                          •
                        </span>
                      )}
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-primary/5 px-6 py-16 text-center sm:px-12 sm:py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Stop reading. Start practicing.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          Free to start. No credit card.
        </p>
        <Link
          href="/register"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
        >
          Start free <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </>
  );
}
