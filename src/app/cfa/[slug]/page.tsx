import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  extractHeadings,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { absoluteUrl, getSiteUrl, SITE } from "@/lib/site";
import { ArticleHero } from "@/components/blog/article-hero";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { QuickAnswer } from "@/components/blog/quick-answer";
import { InlineCTA } from "@/components/blog/inline-cta";
import { FAQAccordion } from "@/components/blog/faq-accordion";
import { RelatedArticles } from "@/components/blog/related-articles";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { JsonLd } from "@/components/seo/json-ld";

type RouteParams = { slug: string };

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<RouteParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const fm = post.frontmatter;
  const url = absoluteUrl(`/cfa/${fm.slug}`);
  const og = fm.ogImage ?? `/cfa/${fm.slug}/opengraph-image`;
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: `/cfa/${fm.slug}` },
    openGraph: {
      type: "article",
      title: fm.title,
      description: fm.description,
      url,
      siteName: SITE.name,
      publishedTime: fm.publishedAt,
      modifiedTime: fm.updatedAt ?? fm.publishedAt,
      authors: fm.author ? [fm.author] : undefined,
      tags: fm.tags,
      images: [{ url: og, width: 1200, height: 630, alt: fm.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: [og],
    },
  };
}

export default async function ArticlePage(
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post, 3);
  const base = getSiteUrl();
  const url = `${base}/cfa/${fm.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.publishedAt,
    dateModified: fm.updatedAt ?? fm.publishedAt,
    author: { "@type": "Organization", name: fm.author ?? SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${base}/icon.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [absoluteUrl(fm.ogImage ?? `/cfa/${fm.slug}/opengraph-image`)],
    keywords: (fm.tags ?? []).join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "CFA Blog", item: `${base}/cfa` },
      { "@type": "ListItem", position: 3, name: fm.title, item: url },
    ],
  };

  const faqJsonLd =
    fm.faq && fm.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: fm.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <>
      <JsonLd id={`article-${fm.slug}`} data={articleJsonLd} />
      <JsonLd id={`breadcrumb-${fm.slug}`} data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd id={`faq-${fm.slug}`} data={faqJsonLd} />}

      <ArticleHero fm={fm} readingMinutes={post.readingMinutes} />

      <div className="px-6 sm:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 py-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <aside className="order-2 lg:order-1">
            <TableOfContents headings={headings} />
          </aside>
          <article className="order-1 min-w-0 lg:order-2 lg:max-w-3xl">
            {fm.quickAnswer && (
              <QuickAnswer>
                <MarkdownContent content={fm.quickAnswer} />
              </QuickAnswer>
            )}

            <MarkdownContent content={post.content} />

            <InlineCTA
              variant="primary"
              label="Generate Your Personalized CFA Study Plan"
              description="Based on your exam date, weekly availability, and weak areas. Free to start — no credit card required."
            />

            <FAQAccordion items={fm.faq ?? []} />

            <RelatedArticles posts={related} />
          </article>
        </div>
      </div>
    </>
  );
}
