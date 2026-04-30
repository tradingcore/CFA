import { CFALevel, CFATopic, LearningModule, getTopicsForLevel } from "./cfa-topics";

export type LosState =
  | "not_started"
  | "in_progress"
  | "practiced"
  | "strong"
  | "mastered"
  | "needs_review";

export interface LosStat {
  attempts: number;
  correct: number;
  lastSeenAt: string;
  lastCorrect: boolean;
  streak: number;
  easeFactor: number;
  nextDueAt: string;
}

export type LosStatsByLos = Record<string, LosStat>;

export const DEFAULT_EASE = 1.3;

export function losKey(moduleId: string, losIndex: number): string {
  return `${moduleId}:${losIndex}`;
}

export function emptyLosStat(): LosStat {
  return {
    attempts: 0,
    correct: 0,
    lastSeenAt: "",
    lastCorrect: false,
    streak: 0,
    easeFactor: DEFAULT_EASE,
    nextDueAt: "",
  };
}

export function applyAttempt(stat: LosStat, correct: boolean, at = new Date()): LosStat {
  const nextAttempts = stat.attempts + 1;
  const nextCorrect = stat.correct + (correct ? 1 : 0);
  const baseEase = stat.easeFactor || DEFAULT_EASE;
  const ease = correct ? Math.min(baseEase * 1.15, 3.0) : Math.max(baseEase * 0.85, 0.7);
  const streak = correct ? (stat.lastCorrect ? stat.streak + 1 : 1) : 0;

  let intervalDays = 1;
  if (correct) {
    if (streak === 1) intervalDays = 1;
    else if (streak === 2) intervalDays = 3;
    else intervalDays = Math.round(Math.min(60, 6 * ease));
  }

  const nextDue = new Date(at.getTime() + intervalDays * 86400000);
  return {
    attempts: nextAttempts,
    correct: nextCorrect,
    lastSeenAt: at.toISOString(),
    lastCorrect: correct,
    streak,
    easeFactor: ease,
    nextDueAt: nextDue.toISOString(),
  };
}

export interface LosMastery {
  state: LosState;
  accuracy: number;
  sampleSize: number;
  recencyWeight: number;
  effectiveAccuracy: number;
  isDue: boolean;
  daysUntilDue: number | null;
  daysSinceLastSeen: number | null;
}

export function computeLosMastery(stat: LosStat, now = new Date()): LosMastery {
  const sampleSize = stat.attempts;
  const accuracy = sampleSize > 0 ? stat.correct / sampleSize : 0;
  const lastSeen = stat.lastSeenAt ? new Date(stat.lastSeenAt) : null;
  const daysSinceLastSeen = lastSeen ? (now.getTime() - lastSeen.getTime()) / 86400000 : null;
  const recencyWeight = lastSeen ? Math.exp(-(daysSinceLastSeen ?? 0) / 14) : 0;
  const effectiveAccuracy = sampleSize > 0 ? accuracy * 0.7 + recencyWeight * 0.3 : 0;
  const due = stat.nextDueAt ? new Date(stat.nextDueAt) : null;
  const isDue = due ? due.getTime() < now.getTime() : false;
  const daysUntilDue = due ? Math.round((due.getTime() - now.getTime()) / 86400000) : null;

  let state: LosState = "not_started";
  if (sampleSize === 0) state = "not_started";
  else if (sampleSize < 5) state = "in_progress";
  else if (accuracy < 0.6) state = "practiced";
  else if (accuracy < 0.8 || sampleSize < 12) state = "strong";
  else state = "mastered";

  if ((state === "strong" || state === "mastered") && isDue) {
    state = "needs_review";
  }

  return {
    state,
    accuracy,
    sampleSize,
    recencyWeight,
    effectiveAccuracy,
    isDue,
    daysUntilDue,
    daysSinceLastSeen: daysSinceLastSeen != null ? Math.round(daysSinceLastSeen) : null,
  };
}

export interface ModuleMastery {
  moduleId: string;
  state: LosState;
  accuracy: number;
  sampleSize: number;
  losMasteries: { losId: string; losIndex: number; mastery: LosMastery }[];
  totalLos: number;
  practicedLos: number;
  dueLosCount: number;
}

export function aggregateModuleMastery(
  module: LearningModule,
  statsByLos: LosStatsByLos
): ModuleMastery {
  const losMasteries = module.los.map((_, index) => {
    const id = losKey(module.id, index);
    const stat = statsByLos[id] ?? emptyLosStat();
    return { losId: id, losIndex: index, mastery: computeLosMastery(stat) };
  });
  const sampleSize = losMasteries.reduce((sum, m) => sum + m.mastery.sampleSize, 0);
  const correctSum = losMasteries.reduce(
    (sum, m) => sum + m.mastery.accuracy * m.mastery.sampleSize,
    0
  );
  const accuracy = sampleSize > 0 ? correctSum / sampleSize : 0;
  const practicedLos = losMasteries.filter((m) => m.mastery.sampleSize > 0).length;
  const dueLosCount = losMasteries.filter((m) => m.mastery.isDue).length;

  let state: LosState = "not_started";
  if (sampleSize === 0) state = "not_started";
  else if (sampleSize < 8) state = "in_progress";
  else if (accuracy < 0.6) state = "practiced";
  else if (accuracy < 0.8 || sampleSize < 18) state = "strong";
  else state = "mastered";

  if (dueLosCount > 0 && (state === "strong" || state === "mastered")) {
    state = "needs_review";
  }

  return {
    moduleId: module.id,
    state,
    accuracy,
    sampleSize,
    losMasteries,
    totalLos: module.los.length,
    practicedLos,
    dueLosCount,
  };
}

export function parseWeightRange(weightRange: string): number {
  const matches = weightRange.match(/(\d+(?:\.\d+)?)/g);
  if (!matches || matches.length === 0) return 0;
  const numbers = matches.map((m) => parseFloat(m));
  const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  return avg / 100;
}

export interface TopicReadiness {
  topicId: string;
  shortName: string;
  fullName: string;
  state: LosState;
  accuracy: number;
  sampleSize: number;
  weight: number;
  weightedScore: number;
  modules: ModuleMastery[];
  weakModules: string[];
  dueLosCount: number;
  practicedModules: number;
}

export function aggregateTopicReadiness(
  topic: CFATopic,
  statsByLos: LosStatsByLos
): TopicReadiness {
  const modules = topic.modules.map((m) => aggregateModuleMastery(m, statsByLos));
  const sampleSize = modules.reduce((sum, m) => sum + m.sampleSize, 0);
  const correctSum = modules.reduce((sum, m) => sum + m.accuracy * m.sampleSize, 0);
  const accuracy = sampleSize > 0 ? correctSum / sampleSize : 0;
  const weight = parseWeightRange(topic.weightRange);
  const weightedScore = accuracy * weight;
  const dueLosCount = modules.reduce((sum, m) => sum + m.dueLosCount, 0);
  const practicedModules = modules.filter((m) => m.sampleSize > 0).length;
  const weakModules = modules
    .filter((m) => m.sampleSize >= 8 && m.accuracy < 0.6)
    .map((m) => m.moduleId);

  let state: LosState = "not_started";
  if (sampleSize === 0) state = "not_started";
  else if (sampleSize < 12) state = "in_progress";
  else if (accuracy < 0.6) state = "practiced";
  else if (accuracy < 0.8 || sampleSize < 25) state = "strong";
  else state = "mastered";

  if (dueLosCount > 0 && (state === "strong" || state === "mastered")) {
    state = "needs_review";
  }

  return {
    topicId: topic.id,
    shortName: topic.shortName,
    fullName: topic.name,
    state,
    accuracy,
    sampleSize,
    weight,
    weightedScore,
    modules,
    weakModules,
    dueLosCount,
    practicedModules,
  };
}

export interface LevelReadiness {
  readinessPct: number;
  evidenceCoverage: number;
  totalSampleSize: number;
  byTopic: TopicReadiness[];
}

export function levelReadiness(
  level: CFALevel,
  statsByLos: LosStatsByLos
): LevelReadiness {
  const topics = getTopicsForLevel(level);
  const byTopic = topics.map((t) => aggregateTopicReadiness(t, statsByLos));
  const totalWeight = byTopic.reduce((s, t) => s + t.weight, 0);
  const weightedAccuracy = byTopic.reduce(
    (s, t) => s + (t.sampleSize > 0 ? t.accuracy * t.weight : 0),
    0
  );
  const evidenceWeight = byTopic.reduce(
    (s, t) => s + (t.sampleSize > 0 ? t.weight : 0),
    0
  );
  const readinessPct = totalWeight > 0 ? Math.round((weightedAccuracy / totalWeight) * 100) : 0;
  const evidenceCoverage = totalWeight > 0 ? evidenceWeight / totalWeight : 0;
  const totalSampleSize = byTopic.reduce((s, t) => s + t.sampleSize, 0);

  return {
    readinessPct,
    evidenceCoverage,
    totalSampleSize,
    byTopic,
  };
}

export function getStateExplanation(state: LosState): string {
  switch (state) {
    case "not_started":
      return "You have not answered any question on this yet. Do a quick practice set so we can start tracking how you are doing.";
    case "in_progress":
      return "You have answered very few questions here. Even if you got them all right, it is too early to know if you really understand the topic. Keep practicing.";
    case "practiced":
      return "You have practiced this enough times, but you are getting most questions wrong. Go back to the material, study the concept, and only then drill questions again.";
    case "strong":
      return "You are doing well here. Most of your answers are correct. Keep practicing a bit more to lock the topic in and make it solid.";
    case "mastered":
      return "You really know this topic. You have answered enough questions, almost all correctly, and recently. We will remind you to revisit it later so you do not forget.";
    case "needs_review":
      return "It has been a while since you saw this topic and the brain forgets fast. Do a few questions now to refresh it before exam day.";
  }
}

export function getStateLabel(state: LosState): string {
  switch (state) {
    case "not_started":
      return "Not started";
    case "in_progress":
      return "In progress";
    case "practiced":
      return "Practiced";
    case "strong":
      return "Strong";
    case "mastered":
      return "Mastered";
    case "needs_review":
      return "Needs review";
  }
}

export function getStateBadgeClass(state: LosState): string {
  switch (state) {
    case "not_started":
      return "bg-muted text-muted-foreground";
    case "in_progress":
      return "bg-blue-500/10 text-blue-500";
    case "practiced":
      return "bg-amber-500/10 text-amber-500";
    case "strong":
      return "bg-emerald-500/10 text-emerald-500";
    case "mastered":
      return "bg-emerald-500 text-white";
    case "needs_review":
      return "bg-rose-500/10 text-rose-500";
  }
}

export function getStateBarClass(state: LosState): string {
  switch (state) {
    case "not_started":
      return "bg-muted";
    case "in_progress":
      return "bg-blue-500";
    case "practiced":
      return "bg-amber-400";
    case "strong":
      return "bg-emerald-500";
    case "mastered":
      return "bg-emerald-500";
    case "needs_review":
      return "bg-rose-500";
  }
}
