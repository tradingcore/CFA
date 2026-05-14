import { Sparkles } from "lucide-react";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export function QuickAnswer({ title = "Quick Answer", children }: Props) {
  return (
    <aside
      className="not-prose my-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-7"
      aria-label={title}
    >
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        {title}
      </div>
      <div className="text-base leading-relaxed text-foreground/90 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mt-1 [&>p]:m-0 [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
