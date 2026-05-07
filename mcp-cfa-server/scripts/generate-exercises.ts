/**
 * Batch exercise generator: reads curriculum data and generates exercises per LOS via OpenAI.
 * 
 * Usage: 
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-exercises.ts --level I --count 5
 *   OPENAI_API_KEY=sk-... npx tsx scripts/generate-exercises.ts --level I --topic quant --count 10
 * 
 * Options:
 *   --level    CFA level (I, II, III) [required]
 *   --count    Questions per LOS (default: 5)
 *   --topic    Filter to specific topic ID
 *   --module   Filter to specific module ID
 *   --append   Append to existing file instead of overwriting
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../src/data");

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
  difficulty: "easy" | "medium" | "hard";
  source: string;
}

interface LosEntry {
  losId: string;
  topicId: string;
  topicName: string;
  moduleId: string;
  moduleName: string;
  number: string;
  description: string;
}

interface CurriculumData {
  level: string;
  topics: { id: string; name: string; modules: { id: string; name: string; los: LosEntry[] }[] }[];
}

function parseArgs() {
  const args = process.argv.slice(2);
  const result: Record<string, string> = {};
  for (let i = 0; i < args.length; i += 2) {
    result[args[i].replace(/^--/, "")] = args[i + 1];
  }
  return result;
}

async function generateForLOS(los: LosEntry, level: string, count: number): Promise<Exercise[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");

  const prompt = `Generate exactly ${count} CFA Level ${level} multiple-choice questions for this Learning Outcome Statement:

Topic: ${los.topicName}
Module: ${los.moduleName} (${los.number})
LOS: "${los.description}"

Rules:
- Each question must have exactly 4 options (A, B, C, D)
- Mix difficulties: at least 1 easy, 1 hard, rest medium
- Questions must test the specific skill described in the LOS (calculate, interpret, explain, etc.)
- Explanations must be detailed (2-3 sentences) and reference the correct concept
- Do NOT reference "CFA curriculum" or "according to the reading" in questions
- Questions should be self-contained and practical

Return ONLY a JSON array (no markdown, no code fences):
[{"question":"...","options":["A...","B...","C...","D..."],"correctIndex":0,"explanation":"...","difficulty":"easy|medium|hard"}]`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${err}`);
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  const raw = data.choices[0]?.message?.content ?? "[]";
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) return [];

  try {
    const parsed = JSON.parse(jsonMatch[0]) as Array<{
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
      difficulty: string;
    }>;

    return parsed.map((q, i) => ({
      id: `gen-${los.losId}-${Date.now()}-${i}`,
      level,
      topicId: los.topicId,
      topicName: los.topicName,
      moduleId: los.moduleId,
      moduleName: los.moduleName,
      losId: los.losId,
      question: q.question,
      options: q.options.map((o) => o.replace(/^[A-D]\.\s*/, "")),
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      difficulty: (["easy", "medium", "hard"].includes(q.difficulty) ? q.difficulty : "medium") as Exercise["difficulty"],
      source: "generated",
    }));
  } catch {
    return [];
  }
}

async function main() {
  const args = parseArgs();
  const level = args.level;
  if (!level || !["I", "II", "III"].includes(level)) {
    console.error("Usage: --level I|II|III [--count 5] [--topic topicId] [--module moduleId] [--append]");
    process.exit(1);
  }

  const count = parseInt(args.count || "5");
  const filterTopic = args.topic;
  const filterModule = args.module;
  const append = args.append === "true";

  const currPath = join(DATA_DIR, `curriculum/level-${level.toLowerCase()}.json`);
  if (!existsSync(currPath)) {
    console.error(`Curriculum file not found: ${currPath}. Run generate-curriculum.ts first.`);
    process.exit(1);
  }

  const curriculum = JSON.parse(readFileSync(currPath, "utf-8")) as CurriculumData;

  const allLOS: LosEntry[] = [];
  for (const topic of curriculum.topics) {
    if (filterTopic && topic.id !== filterTopic) continue;
    for (const module of topic.modules) {
      if (filterModule && module.id !== filterModule) continue;
      allLOS.push(...module.los);
    }
  }

  console.log(`Generating ${count} exercises per LOS for ${allLOS.length} LOS (Level ${level})...`);

  const outPath = join(DATA_DIR, `exercises/level-${level.toLowerCase()}.json`);
  let existing: Exercise[] = [];
  if (append && existsSync(outPath)) {
    existing = JSON.parse(readFileSync(outPath, "utf-8")) as Exercise[];
    console.log(`Appending to ${existing.length} existing exercises`);
  }

  const generated: Exercise[] = [...existing];
  let processedCount = 0;

  for (const los of allLOS) {
    processedCount++;
    process.stdout.write(`  [${processedCount}/${allLOS.length}] ${los.number} ${los.moduleName}...`);

    try {
      const exercises = await generateForLOS(los, level, count);
      generated.push(...exercises);
      console.log(` ${exercises.length} questions`);
    } catch (err) {
      console.log(` ERROR: ${err instanceof Error ? err.message : "unknown"}`);
    }

    if (processedCount % 10 === 0) {
      writeFileSync(outPath, JSON.stringify(generated, null, 2));
      console.log(`  [checkpoint] Saved ${generated.length} exercises`);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  writeFileSync(outPath, JSON.stringify(generated, null, 2));
  console.log(`\nDone! ${generated.length} total exercises saved to ${outPath}`);
}

main().catch(console.error);
