import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import type { PostFrontmatter } from "@/lib/blog";

type Props = {
  fm: PostFrontmatter;
  readingMinutes: number;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ArticleHero({ fm, readingMinutes }: Props) {
  return (
    <header className="border-b border-border px-6 pt-12 pb-10 sm:px-12 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/cfa" className="hover:text-foreground">Blog</Link>
          {fm.level && (
            <>
              <span className="mx-2">/</span>
              <span>CFA Level {fm.level}</span>
            </>
          )}
        </nav>
        {fm.tags && fm.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {fm.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {fm.title}
        </h1>
        {fm.description && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {fm.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {fm.author ?? "Trading Core"}
          </span>
          <time
            dateTime={fm.publishedAt}
            className="inline-flex items-center gap-1.5"
          >
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(fm.publishedAt)}
          </time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readingMinutes} min read
          </span>
        </div>
      </div>
    </header>
  );
}
