import Link from "next/link";
import { ArrowRight, Clock, BookOpen, ChevronRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, getSiteUrl, SITE } from "@/lib/site";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const base = getSiteUrl();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} CFA Blog`,
    description:
      "In-depth guides on the CFA exam — study plans, topic strategy, mock review, and how to pass on your first try.",
    url: `${base}/cfa`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: base,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: absoluteUrl(`/cfa/${p.slug}`),
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
    })),
  };

  return (
    <>
      <JsonLd id="blog-index" data={blogJsonLd} />
      <section className="border-b border-border px-6 py-16 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            CFA Blog & Guides
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            CFA study guides built by candidates,{" "}
            <span className="text-primary">written for results</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Practical playbooks for Level I, II, and III — based on the 2026
            curriculum, real exam patterns, and what actually works.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <h2 className="text-lg font-semibold">First articles coming soon</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;re putting together in-depth study guides. Want a
                personalized plan now?
              </p>
              <Link
                href="/register"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Generate your study plan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/cfa/${p.slug}`}
                  className="group flex items-start gap-6 py-7 transition-colors first:pt-0 last:pb-0 sm:gap-8"
                >
                  <div className="hidden w-36 shrink-0 pt-1.5 sm:block">
                    <time className="text-sm text-muted-foreground">
                      {formatDate(p.publishedAt)}
                    </time>
                    {p.level && (
                      <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        Level {p.level}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <time className="mb-1 block text-xs text-muted-foreground sm:hidden">
                      {formatDate(p.publishedAt)}
                    </time>
                    <h2 className="text-xl font-bold leading-snug group-hover:text-primary sm:text-2xl">
                      {p.title}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {p.readingMinutes} min read
                      </span>
                      {p.level && (
                        <span className="sm:hidden rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          Level {p.level}
                        </span>
                      )}
                      {p.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden shrink-0 self-center sm:block">
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-primary/5 px-6 py-16 text-center sm:px-12">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Stop reading. Start practicing.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Free to start — no credit card required.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
        >
          Generate Your Personalized CFA Plan{" "}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </>
  );
}
