import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

type Tone = "info" | "warning" | "success" | "tip";

type Props = {
  tone?: Tone;
  title?: string;
  children: React.ReactNode;
};

const STYLES: Record<
  Tone,
  { bg: string; border: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  info: {
    bg: "bg-blue-500/5",
    border: "border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
    icon: Info,
  },
  warning: {
    bg: "bg-amber-500/5",
    border: "border-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    icon: AlertTriangle,
  },
  success: {
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  tip: {
    bg: "bg-violet-500/5",
    border: "border-violet-500/30",
    text: "text-violet-600 dark:text-violet-400",
    icon: Lightbulb,
  },
};

export function Callout({ tone = "info", title, children }: Props) {
  const s = STYLES[tone];
  const Icon = s.icon;
  return (
    <div className={`not-prose my-6 rounded-xl border ${s.border} ${s.bg} p-4 sm:p-5`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${s.text}`} />
        <div className="flex-1">
          {title && <p className={`mb-1 text-sm font-semibold ${s.text}`}>{title}</p>}
          <div className="text-sm leading-relaxed text-foreground/90 [&>p]:m-0 [&>p+p]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
