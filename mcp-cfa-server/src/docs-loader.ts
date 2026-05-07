import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(__dirname, "..", "docs");

export interface DocSection {
  docTitle: string;
  category: string;
  heading: string;
  content: string;
  path: string;
}

let sectionsCache: DocSection[] | null = null;

function parseMarkdownSections(content: string, docTitle: string, category: string, path: string): DocSection[] {
  const sections: DocSection[] = [];

  const frontmatterEnd = content.indexOf("---", 4);
  const body = frontmatterEnd > 0 ? content.slice(frontmatterEnd + 3).trim() : content;

  const parts = body.split(/^(#{1,3}\s+.+)$/m);

  let currentHeading = docTitle;
  let currentContent = "";

  for (const part of parts) {
    if (/^#{1,3}\s+/.test(part)) {
      if (currentContent.trim()) {
        sections.push({ docTitle, category, heading: currentHeading, content: currentContent.trim(), path });
      }
      currentHeading = part.replace(/^#+\s+/, "").trim();
      currentContent = "";
    } else {
      currentContent += part;
    }
  }

  if (currentContent.trim()) {
    sections.push({ docTitle, category, heading: currentHeading, content: currentContent.trim(), path });
  }

  return sections;
}

function loadAllDocs(): DocSection[] {
  const sections: DocSection[] = [];

  if (!existsSync(DOCS_DIR)) return sections;

  for (const category of readdirSync(DOCS_DIR)) {
    const catDir = join(DOCS_DIR, category);
    let entries: string[];
    try {
      entries = readdirSync(catDir);
    } catch {
      continue;
    }

    for (const file of entries) {
      if (!file.endsWith(".md")) continue;
      const filePath = join(catDir, file);
      const content = readFileSync(filePath, "utf-8");

      const titleMatch = content.match(/^title:\s*"?(.+?)"?\s*$/m);
      const docTitle = titleMatch?.[1] ?? file.replace(".md", "");

      sections.push(...parseMarkdownSections(content, docTitle, category, `${category}/${file}`));
    }
  }

  return sections;
}

export function getDocSections(): DocSection[] {
  if (!sectionsCache) {
    sectionsCache = loadAllDocs();
  }
  return sectionsCache;
}

export function searchDocs(query: string, limit = 10): DocSection[] {
  const sections = getDocSections();
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  const scored = sections
    .map((section) => {
      const text = `${section.heading} ${section.content}`.toLowerCase();
      let score = 0;
      for (const word of words) {
        const count = (text.match(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
        score += count;
      }
      return { section, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((r) => r.section);
}

export function listDocs(): { title: string; category: string; path: string; sections: number }[] {
  const sections = getDocSections();
  const byPath = new Map<string, { title: string; category: string; path: string; count: number }>();

  for (const s of sections) {
    const existing = byPath.get(s.path);
    if (existing) {
      existing.count++;
    } else {
      byPath.set(s.path, { title: s.docTitle, category: s.category, path: s.path, count: 1 });
    }
  }

  return Array.from(byPath.values()).map((d) => ({
    title: d.title,
    category: d.category,
    path: d.path,
    sections: d.count,
  }));
}
