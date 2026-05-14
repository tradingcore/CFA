import { ArrowRight } from "lucide-react";
import type { FaqItem } from "@/lib/blog";

type Props = {
  items: FaqItem[];
  title?: string;
};

export function FAQAccordion({ items, title = "Frequently asked questions" }: Props) {
  if (!items || items.length === 0) return null;
  return (
    <section className="not-prose my-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium">
              {item.q}
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
