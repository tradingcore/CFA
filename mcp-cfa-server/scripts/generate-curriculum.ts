/**
 * Generates curriculum JSON data for the MCP server from the main app's cfa-topics.ts.
 * 
 * Usage: npx tsx scripts/generate-curriculum.ts
 * 
 * Requires OPENAI_API_KEY in environment for generating summaries.
 * Without it, generates skeleton data with LOS descriptions only.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CFA_TOPICS_PATH = join(__dirname, "../../src/lib/cfa-topics.ts");
const OUTPUT_DIR = join(__dirname, "../src/data/curriculum");

interface ParsedTopic {
  id: string;
  name: string;
  modules: { id: string; name: string; los: string[] }[];
}

function extractTopics(source: string, varName: string): ParsedTopic[] {
  const regex = new RegExp(`const ${varName}:\\s*CFATopic\\[\\]\\s*=\\s*\\[`, "m");
  const match = source.match(regex);
  if (!match || match.index === undefined) return [];

  let depth = 0;
  let start = match.index + match[0].length - 1;
  let end = start;

  for (let i = start; i < source.length; i++) {
    if (source[i] === "[") depth++;
    if (source[i] === "]") depth--;
    if (depth === 0) { end = i + 1; break; }
  }

  const arrayStr = source.slice(start, end);

  const cleaned = arrayStr
    .replace(/\/\/[^\n]*/g, "")
    .replace(/,\s*([\]}])/g, "$1");

  try {
    const parsed = new Function(`return ${cleaned}`)() as Array<{
      id: string; name: string; shortName: string; weightRange: string; color: string;
      modules: { id: string; name: string; los: string[] }[];
    }>;
    return parsed.map((t) => ({
      id: t.id,
      name: t.name,
      modules: t.modules.map((m) => ({ id: m.id, name: m.name, los: m.los })),
    }));
  } catch (err) {
    console.error(`Failed to parse ${varName}:`, err);
    return [];
  }
}

function buildCurriculumJSON(level: string, topics: ParsedTopic[]) {
  let topicNum = 0;
  return {
    level,
    topics: topics.map((topic) => {
      topicNum++;
      let modNum = 0;
      return {
        id: topic.id,
        name: topic.name,
        modules: topic.modules.map((module) => {
          modNum++;
          return {
            id: module.id,
            name: module.name,
            los: module.los.map((description, losIdx) => {
              const letter = String.fromCharCode(97 + losIdx);
              return {
                losId: `${module.id}:${losIdx}`,
                topicId: topic.id,
                topicName: topic.name,
                moduleId: module.id,
                moduleName: module.name,
                number: `${topicNum}.${modNum}.${letter}`,
                description,
                summary: `Study material for: ${description}`,
                keyConcepts: extractKeyConcepts(description),
                relatedFormulas: [],
              };
            }),
          };
        }),
      };
    }),
  };
}

function extractKeyConcepts(description: string): string[] {
  const concepts: string[] = [];
  const verbs = ["calculate", "interpret", "explain", "describe", "compare", "evaluate", "define", "formulate", "distinguish"];

  for (const verb of verbs) {
    if (description.toLowerCase().includes(verb)) {
      concepts.push(verb.charAt(0).toUpperCase() + verb.slice(1));
    }
  }

  const keywords = description.match(/\b[A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*)*/g);
  if (keywords) {
    for (const kw of keywords) {
      if (kw.length > 3 && !concepts.includes(kw)) {
        concepts.push(kw);
      }
    }
  }

  return concepts.length > 0 ? concepts : ["Key concept from LOS"];
}

async function main() {
  const source = readFileSync(CFA_TOPICS_PATH, "utf-8");

  const levelI = extractTopics(source, "levelI");
  const levelII = extractTopics(source, "levelII");
  const levelIII = extractTopics(source, "levelIII");

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const levels: [string, ParsedTopic[]][] = [
    ["I", levelI],
    ["II", levelII],
    ["III", levelIII],
  ];

  for (const [level, topics] of levels) {
    if (topics.length === 0) {
      console.log(`Warning: No topics found for Level ${level}`);
      continue;
    }

    const data = buildCurriculumJSON(level, topics);
    const totalLOS = data.topics.reduce(
      (sum, t) => sum + t.modules.reduce((s, m) => s + m.los.length, 0),
      0
    );

    const outPath = join(OUTPUT_DIR, `level-${level.toLowerCase()}.json`);
    writeFileSync(outPath, JSON.stringify(data, null, 2));
    console.log(`Level ${level}: ${data.topics.length} topics, ${totalLOS} LOS → ${outPath}`);
  }
}

main().catch(console.error);
