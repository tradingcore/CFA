import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type FaqItem = { q: string; a: string };

export type PostFrontmatter = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  level?: "I" | "II" | "III" | "All";
  tags?: string[];
  ogImage?: string;
  draft?: boolean;
  faq?: FaqItem[];
  related?: string[];
  quickAnswer?: string;
};

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
  readingMinutes: number;
};

export type PostSummary = PostFrontmatter & {
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

function readPostFile(filename: string): Post | null {
  const fullPath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string) || filename.replace(/\.md$/, "");
  const fm: PostFrontmatter = {
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    slug,
    publishedAt: data.publishedAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt,
    author: data.author ?? "Trading Core",
    level: data.level,
    tags: data.tags ?? [],
    ogImage: data.ogImage,
    draft: data.draft ?? false,
    faq: data.faq ?? [],
    related: data.related ?? [],
    quickAnswer: data.quickAnswer,
  };
  return {
    frontmatter: fm,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllPosts(): PostSummary[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("README"));
  const posts = files
    .map((f) => readPostFile(f))
    .filter((p): p is Post => p !== null)
    .filter((p) => !(isProd() && p.frontmatter.draft))
    .map((p) => ({ ...p.frontmatter, readingMinutes: p.readingMinutes }));
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | null {
  const post =
    readPostFile(`${slug}.md`) ?? readPostFile(`_${slug}.md`);
  if (!post) return null;
  if (isProd() && post.frontmatter.draft) return null;
  return post;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getRelatedPosts(post: Post, limit = 3): PostSummary[] {
  const all = getAllPosts().filter((p) => p.slug !== post.frontmatter.slug);
  const explicit = (post.frontmatter.related ?? [])
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is PostSummary => Boolean(p));
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const tags = new Set(post.frontmatter.tags ?? []);
  const byTags = all
    .filter((p) => !explicit.find((e) => e.slug === p.slug))
    .map((p) => ({
      p,
      score: (p.tags ?? []).filter((t) => tags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
  return [...explicit, ...byTags].slice(0, limit);
}

export function extractHeadings(
  markdown: string,
): { id: string; text: string; level: number }[] {
  const lines = markdown.split("\n");
  const headings: { id: string; text: string; level: number }[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const level = m[1].length;
    const text = m[2].replace(/[`*_]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }
  return headings;
}
