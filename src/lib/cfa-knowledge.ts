/**
 * CFA Knowledge Base client for API routes.
 * 
 * Reads data directly from the MCP server's data files,
 * providing the same capabilities as the MCP tools but callable from Next.js server-side code.
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const MCP_DATA_DIR = join(process.cwd(), "mcp-cfa-server", "src", "data");
const MCP_DOCS_DIR = join(process.cwd(), "mcp-cfa-server", "docs");
const BEHAVIOR_FILE = join(MCP_DOCS_DIR, "system", "ai-behavior.md");

interface LosContent {
  losId: string;
  topicId: string;
  topicName: string;
  moduleId: string;
  moduleName: string;
  number: string;
  description: string;
  summary: string;
  keyConcepts: string[];
  relatedFormulas: string[];
}

interface Exercise {
  id: string;
  level: string;
  topicId: string;
  topicName: string;
  moduleId: string;
  moduleName: string;
  losId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: string;
  source: string;
}

interface Formula {
  id: string;
  topicId: string;
  topicName: string;
  moduleId: string;
  moduleName: string;
  name: string;
  formula: string;
  description: string;
  example: string;
  variables: string[];
}

interface CurriculumData {
  level: string;
  topics: { id: string; name: string; modules: { id: string; name: string; los: LosContent[] }[] }[];
}

function loadJSON<T>(relativePath: string, fallback: T): T {
  const fullPath = join(MCP_DATA_DIR, relativePath);
  if (!existsSync(fullPath)) return fallback;
  try {
    return JSON.parse(readFileSync(fullPath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

const cache: { curriculum: Map<string, CurriculumData>; exercises: Map<string, Exercise[]>; formulas: Formula[] | null } = {
  curriculum: new Map(),
  exercises: new Map(),
  formulas: null,
};

function getCurriculum(level: string): CurriculumData {
  if (!cache.curriculum.has(level)) {
    cache.curriculum.set(level, loadJSON(`curriculum/level-${level.toLowerCase()}.json`, { level, topics: [] }));
  }
  return cache.curriculum.get(level)!;
}

function getExercises(level: string): Exercise[] {
  if (!cache.exercises.has(level)) {
    cache.exercises.set(level, loadJSON(`exercises/level-${level.toLowerCase()}.json`, []));
  }
  return cache.exercises.get(level)!;
}

function getFormulas(): Formula[] {
  if (!cache.formulas) {
    cache.formulas = loadJSON("formulas/formulas.json", []);
  }
  return cache.formulas;
}

function scoreMatch(text: string, query: string): number {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lowerText = text.toLowerCase();
  let score = 0;
  for (const word of words) {
    if (lowerText.includes(word)) score++;
  }
  return score / Math.max(words.length, 1);
}

/**
 * Search curriculum concepts by keyword query.
 */
export function searchConcepts(params: {
  query: string;
  level: string;
  topicId?: string;
  moduleId?: string;
  limit?: number;
}): { losId: string; topicName: string; moduleName: string; number: string; description: string; summary: string; keyConcepts: string[] }[] {
  const { query, level, topicId, moduleId, limit = 8 } = params;
  const curriculum = getCurriculum(level);

  const results: { score: number; losId: string; topicName: string; moduleName: string; number: string; description: string; summary: string; keyConcepts: string[] }[] = [];

  for (const topic of curriculum.topics) {
    if (topicId && topic.id !== topicId) continue;
    for (const module of topic.modules) {
      if (moduleId && module.id !== moduleId) continue;
      for (const los of module.los) {
        const searchable = [los.description, los.summary, ...los.keyConcepts].join(" ");
        const score = scoreMatch(searchable, query);
        if (score > 0) {
          results.push({
            score,
            losId: los.losId,
            topicName: los.topicName,
            moduleName: los.moduleName,
            number: los.number,
            description: los.description,
            summary: los.summary,
            keyConcepts: los.keyConcepts,
          });
        }
      }
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Get exercises filtered by criteria.
 */
export function fetchExercises(params: {
  level: string;
  topicId?: string;
  moduleId?: string;
  losId?: string;
  count?: number;
}): Exercise[] {
  const { level, topicId, moduleId, losId, count = 5 } = params;
  let exercises = getExercises(level);

  if (topicId) exercises = exercises.filter((e) => e.topicId === topicId);
  if (moduleId) exercises = exercises.filter((e) => e.moduleId === moduleId);
  if (losId) exercises = exercises.filter((e) => e.losId === losId);

  const shuffled = [...exercises].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Get formulas filtered by topic/module or query.
 */
export function fetchFormulas(params: {
  topicId?: string;
  moduleId?: string;
  query?: string;
}): Formula[] {
  const { topicId, moduleId, query } = params;
  let formulas = getFormulas();

  if (topicId) formulas = formulas.filter((f) => f.topicId === topicId);
  if (moduleId) formulas = formulas.filter((f) => f.moduleId === moduleId);
  if (query) {
    const q = query.toLowerCase();
    formulas = formulas.filter((f) =>
      f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
    );
  }

  return formulas;
}

/**
 * Get full detail for a specific LOS.
 */
export function getLosDetail(params: {
  losId: string;
  level: string;
}): { los: LosContent; formulas: Formula[]; exercises: Exercise[] } | null {
  const { losId, level } = params;
  const curriculum = getCurriculum(level);

  let found: LosContent | null = null;
  for (const topic of curriculum.topics) {
    for (const module of topic.modules) {
      for (const los of module.los) {
        if (los.losId === losId) { found = los; break; }
      }
      if (found) break;
    }
    if (found) break;
  }

  if (!found) return null;

  return {
    los: found,
    formulas: getFormulas().filter((f) =>
      found!.relatedFormulas.some((rf) => f.id === rf || f.name.toLowerCase().includes(rf.toLowerCase()))
    ),
    exercises: getExercises(level).filter((e) => e.losId === losId).slice(0, 3),
  };
}

interface DocSection {
  heading: string;
  content: string;
  docTitle: string;
  category: string;
}

let docSectionsCache: DocSection[] | null = null;

function loadDocSections(): DocSection[] {
  if (!existsSync(MCP_DOCS_DIR)) return [];
  const sections: DocSection[] = [];

  let categories: string[];
  try { categories = readdirSync(MCP_DOCS_DIR); } catch { return []; }

  for (const category of categories) {
    const catDir = join(MCP_DOCS_DIR, category);
    let files: string[];
    try { files = readdirSync(catDir); } catch { continue; }

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const content = readFileSync(join(catDir, file), "utf-8");
      const titleMatch = content.match(/^title:\s*"?(.+?)"?\s*$/m);
      const docTitle = titleMatch?.[1] ?? file.replace(".md", "");

      const frontmatterEnd = content.indexOf("---", 4);
      const body = frontmatterEnd > 0 ? content.slice(frontmatterEnd + 3).trim() : content;
      const parts = body.split(/^(#{1,3}\s+.+)$/m);

      let currentHeading = docTitle;
      let currentContent = "";

      for (const part of parts) {
        if (/^#{1,3}\s+/.test(part)) {
          if (currentContent.trim()) {
            sections.push({ heading: currentHeading, content: currentContent.trim(), docTitle, category });
          }
          currentHeading = part.replace(/^#+\s+/, "").trim();
          currentContent = "";
        } else {
          currentContent += part;
        }
      }
      if (currentContent.trim()) {
        sections.push({ heading: currentHeading, content: currentContent.trim(), docTitle, category });
      }
    }
  }
  return sections;
}

function getDocSections(): DocSection[] {
  if (!docSectionsCache) docSectionsCache = loadDocSections();
  return docSectionsCache;
}

function searchDocSections(query: string, limit = 5): DocSection[] {
  const sections = getDocSections();
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  return sections
    .map((s) => {
      const text = `${s.heading} ${s.content}`.toLowerCase();
      let score = 0;
      for (const w of words) {
        if (text.includes(w)) score++;
      }
      return { section: s, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.section);
}

/**
 * Build context string for an AI prompt based on a user query.
 * Searches curriculum concepts, formulas, and indexed documents.
 */
export function buildContextForQuery(query: string, level: string): string {
  const concepts = searchConcepts({ query, level, limit: 5 });
  const formulas = fetchFormulas({ query });
  const docs = searchDocSections(query, 3);

  const parts: string[] = [];

  if (concepts.length > 0) {
    parts.push("## Reference Material from CFA Curriculum");
    for (const c of concepts) {
      parts.push(`### ${c.number} — ${c.moduleName}`);
      parts.push(`**LOS:** ${c.description}`);
      parts.push(c.summary);
      if (c.keyConcepts.length > 0) {
        parts.push(`**Key concepts:** ${c.keyConcepts.join(", ")}`);
      }
      parts.push("");
    }
  }

  if (docs.length > 0) {
    parts.push("## From Knowledge Base Documents");
    for (const d of docs) {
      parts.push(`### ${d.heading}`);
      parts.push(`*Source: ${d.docTitle}*`);
      parts.push(d.content.slice(0, 1500));
      parts.push("");
    }
  }

  if (formulas.length > 0) {
    parts.push("## Relevant Formulas");
    for (const f of formulas) {
      parts.push(`**${f.name}:** ${f.formula}`);
      parts.push(f.description);
      parts.push(`Variables: ${f.variables.join("; ")}`);
      parts.push("");
    }
  }

  return parts.join("\n");
}

type PromptMode = "chat" | "questions" | "explain" | "plan";

function loadBehavior(): string {
  if (!existsSync(BEHAVIOR_FILE)) return "";
  return readFileSync(BEHAVIOR_FILE, "utf-8");
}

const MODE_SECTION_MAP: Record<PromptMode, string> = {
  chat: "# For Chat",
  questions: "# For Question Generation",
  explain: "# For Explaining Wrong Answers",
  plan: "# For Study Plan",
};

/**
 * Returns the centralized system prompt for a given mode.
 * Reads from mcp-cfa-server/docs/system/ai-behavior.md and extracts
 * the shared sections (Persona, Principles, Response Format) plus
 * the mode-specific section.
 */
export function getSystemPrompt(mode: PromptMode): string {
  const raw = loadBehavior();
  if (!raw) return "";

  const frontmatterEnd = raw.indexOf("---", 4);
  const body = frontmatterEnd > 0 ? raw.slice(frontmatterEnd + 3).trim() : raw;

  const sharedSections = ["# Persona", "# Principles", "# Response Format"];
  const modeSection = MODE_SECTION_MAP[mode];

  const allH1 = [...body.matchAll(/^# .+$/gm)];

  const extractSection = (heading: string): string => {
    const startMatch = allH1.find((m) => body.slice(m.index!, m.index! + m[0].length) === heading);
    if (!startMatch || startMatch.index === undefined) return "";
    const startIdx = startMatch.index + startMatch[0].length;
    const nextH1 = allH1.find((m) => m.index !== undefined && m.index > startMatch.index!);
    const endIdx = nextH1?.index ?? body.length;
    return body.slice(startIdx, endIdx).trim();
  };

  const parts: string[] = [];

  for (const section of sharedSections) {
    const content = extractSection(section);
    if (content) parts.push(content);
  }

  const modeContent = extractSection(modeSection);
  if (modeContent) parts.push(modeContent);

  return parts.join("\n\n");
}
