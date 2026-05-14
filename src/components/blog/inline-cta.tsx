import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "soft";

type Props = {
  href?: string;
  label: string;
  description?: string;
  variant?: Variant;
};

export function InlineCTA({
  href = "/register",
  label,
  description,
  variant = "soft",
}: Props) {
  if (variant === "primary") {
    return (
      <div className="not-prose my-10 flex flex-col items-center gap-3 rounded-2xl bg-primary/10 p-8 text-center sm:p-10">
        {description && (
          <p className="max-w-xl text-sm text-muted-foreground">{description}</p>
        )}
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
        >
          {label} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }
  return (
    <div className="not-prose my-8 flex flex-col items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Try it free <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
