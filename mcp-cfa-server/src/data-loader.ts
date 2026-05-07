import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { CurriculumLevel, Exercise, Formula } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "src", "data");

function loadJSON<T>(path: string, fallback: T): T {
  const fullPath = join(DATA_DIR, path);
  if (!existsSync(fullPath)) return fallback;
  return JSON.parse(readFileSync(fullPath, "utf-8")) as T;
}

let curriculumCache: Map<string, CurriculumLevel> | null = null;
let exercisesCache: Map<string, Exercise[]> | null = null;
let formulasCache: Formula[] | null = null;

export function getCurriculum(level: string): CurriculumLevel {
  if (!curriculumCache) {
    curriculumCache = new Map();
    for (const l of ["I", "II", "III"]) {
      const data = loadJSON<CurriculumLevel>(`curriculum/level-${l.toLowerCase()}.json`, {
        level: l,
        topics: [],
      });
      curriculumCache.set(l, data);
    }
  }
  return curriculumCache.get(level) ?? { level, topics: [] };
}

export function getExercises(level: string): Exercise[] {
  if (!exercisesCache) {
    exercisesCache = new Map();
    for (const l of ["I", "II", "III"]) {
      const data = loadJSON<Exercise[]>(`exercises/level-${l.toLowerCase()}.json`, []);
      exercisesCache.set(l, data);
    }
  }
  return exercisesCache.get(level) ?? [];
}

export function getFormulas(): Formula[] {
  if (!formulasCache) {
    formulasCache = loadJSON<Formula[]>("formulas/formulas.json", []);
  }
  return formulasCache;
}

export function searchText(text: string, query: string): number {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const lowerText = text.toLowerCase();
  let score = 0;
  for (const word of words) {
    if (lowerText.includes(word)) score++;
  }
  return score / Math.max(words.length, 1);
}
