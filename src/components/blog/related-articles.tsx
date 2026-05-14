import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { PostSummary } from "@/lib/blog";

type Props = {
  posts: PostSummary[];
};

export function RelatedArticles({ posts }: Props) {
  if (!posts || posts.length === 0) return null;
  return (
    <section className="not-prose my-12 border-t border-border pt-10">
      <h2 className="mb-6 text-xl font-bold tracking-tight">Keep reading</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/cfa/${p.slug}`}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
          >
            {p.level && (
              <span className="self-start rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                Level {p.level}
              </span>
            )}
            <h3 className="text-base font-semibold leading-snug group-hover:text-primary">
              {p.title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {p.description}
            </p>
            <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {p.readingMinutes} min
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
