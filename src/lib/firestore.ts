import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  where,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { CFALevel } from "./cfa-topics";
import {
  DEFAULT_STUDY_DAYS,
  StudyDay,
  WeeklyStudyAvailabilityOverride,
} from "./study-availability";
import {
  applyAttempt,
  emptyLosStat,
  LosStatsByLos,
} from "./mastery";

// ─── User Profile ───────────────────────────────────────────────────────────

export interface FreeUsage {
  chatMessages: number;
  quizQuestions: number;
  date: string;
  feedbackGivenToday?: boolean;
}

export interface Feedback {
  id?: string;
  uid: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: string;
  source: "limit_hit" | "daily_prompt";
}

export interface UserProfile {
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  cfaLevel: CFALevel;
  examDate: string;
  weeklyHoursGoal: number;
  studyDays?: StudyDay[];
  studyAvailabilityOverrides?: Record<string, WeeklyStudyAvailabilityOverride>;
  onboardingCompleted: boolean;
  studyStreak: number;
  lastStudyDate: string;
  losStatsBuiltAt?: Partial<Record<CFALevel, string>>;
  notes?: string;
  stripeCustomerId?: string;
  subscriptionStatus?: "trialing" | "active" | "past_due" | "cancelled" | "none";
  subscriptionId?: string;
  currentPeriodEnd?: string;
  freeUsage?: FreeUsage;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  await setDoc(doc(db, "users", uid), {
    createdAt: new Date().toISOString(),
    cfaLevel: "I",
    examDate: "",
    weeklyHoursGoal: 15,
    studyDays: DEFAULT_STUDY_DAYS,
    studyAvailabilityOverrides: {},
    onboardingCompleted: false,
    studyStreak: 0,
    lastStudyDate: "",
    ...data,
  });
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  await updateDoc(doc(db, "users", uid), data);
}

// ─── Quiz Results ───────────────────────────────────────────────────────────

export interface QuizDiscussionMessage {
  role: "user" | "assistant";
  content: string;
}

export interface QuizAnswer {
  questionId: string;
  topicId: string;
  moduleId?: string;
  losId?: string;
  question?: string;
  options?: string[];
  explanation?: string;
  selectedIndex: number;
  correctIndex: number;
  correct: boolean;
  discussion?: QuizDiscussionMessage[];
}

export interface QuizResult {
  id?: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  mode: "official" | "training";
  level: CFALevel;
  answers: QuizAnswer[];
  topicBreakdown: { topicId: string; topicName: string; correct: number; total: number }[];
}

export async function saveQuizResult(uid: string, result: QuizResult): Promise<string> {
  const payload = {
    ...result,
    date: result.date || new Date().toISOString(),
  };
  try {
    const ref = await addDoc(collection(db, "users", uid, "quizResults"), payload);
    await updateStudyStreak(uid);
    try {
      await applyQuizToLosStats(uid, result.level, result.answers);
    } catch (statsErr) {
      console.error("applyQuizToLosStats failed", statsErr);
    }
    return ref.id;
  } catch (err) {
    console.error("saveQuizResult failed", err);
    throw err;
  }
}

// ─── LOS Mastery Stats ──────────────────────────────────────────────────────

export async function getLosStats(uid: string, level: CFALevel): Promise<LosStatsByLos> {
  try {
    const snap = await getDoc(doc(db, "users", uid, "losStats", level));
    if (!snap.exists()) return {};
    const data = snap.data();
    return (data?.stats ?? {}) as LosStatsByLos;
  } catch (err) {
    console.error("getLosStats failed", err);
    return {};
  }
}

export async function saveLosStats(
  uid: string,
  level: CFALevel,
  stats: LosStatsByLos
): Promise<void> {
  try {
    await setDoc(doc(db, "users", uid, "losStats", level), {
      stats,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("saveLosStats failed", err);
    throw err;
  }
}

export async function applyQuizToLosStats(
  uid: string,
  level: CFALevel,
  answers: QuizAnswer[]
): Promise<void> {
  const taggedAnswers = answers.filter((answer) => Boolean(answer.losId));
  if (taggedAnswers.length === 0) return;
  const current = await getLosStats(uid, level);
  const now = new Date();
  for (const answer of taggedAnswers) {
    const losId = answer.losId as string;
    const stat = current[losId] ?? emptyLosStat();
    current[losId] = applyAttempt(stat, answer.correct, now);
  }
  await saveLosStats(uid, level, current);
}

// ─── Weekly Snapshots ───────────────────────────────────────────────────────

export interface WeeklySnapshotTopic {
  topicId: string;
  shortName: string;
  accuracy: number;
  sampleSize: number;
  weight: number;
}

export interface WeeklySnapshotDoc {
  id?: string;
  weekKey: string;
  level: CFALevel;
  createdAt: string;
  readinessPct: number;
  totalSampleSize: number;
  evidenceCoverage: number;
  topics: WeeklySnapshotTopic[];
}

export function getIsoWeekKey(date = new Date()): string {
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNumber = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNumber + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((target.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${target.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export async function saveWeeklySnapshot(
  uid: string,
  level: CFALevel,
  snapshot: Omit<WeeklySnapshotDoc, "id">
): Promise<void> {
  const docId = `${level}-${snapshot.weekKey}`;
  await setDoc(doc(db, "users", uid, "weeklySnapshots", docId), snapshot);
}

export async function getRecentWeeklySnapshots(
  uid: string,
  level: CFALevel,
  weeks = 4
): Promise<WeeklySnapshotDoc[]> {
  try {
    const q = query(
      collection(db, "users", uid, "weeklySnapshots"),
      where("level", "==", level)
    );
    const snap = await getDocs(q);
    return snap.docs
      .map((d) => ({ id: d.id, ...(d.data() as WeeklySnapshotDoc) }))
      .sort((a, b) => b.weekKey.localeCompare(a.weekKey))
      .slice(0, weeks);
  } catch (err) {
    console.error("getRecentWeeklySnapshots failed", err);
    return [];
  }
}

export async function backfillLosStats(uid: string, level: CFALevel): Promise<number> {
  const q = query(
    collection(db, "users", uid, "quizResults"),
    where("level", "==", level)
  );
  const snap = await getDocs(q);
  const stats: LosStatsByLos = {};
  let attempts = 0;
  const orderedDocs = snap.docs
    .map((d) => d.data() as QuizResult)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  for (const result of orderedDocs) {
    const at = new Date(result.date);
    for (const answer of result.answers || []) {
      if (!answer.losId) continue;
      const stat = stats[answer.losId] ?? emptyLosStat();
      stats[answer.losId] = applyAttempt(stat, answer.correct, at);
      attempts += 1;
    }
  }
  await saveLosStats(uid, level, stats);
  return attempts;
}

export async function getQuizHistory(uid: string, limitCount = 20): Promise<QuizResult[]> {
  try {
    const q = query(
      collection(db, "users", uid, "quizResults"),
      orderBy("date", "desc"),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as QuizResult));
  } catch (err) {
    console.error("getQuizHistory failed", err);
    throw err;
  }
}

export async function getWeeklyQuizStats(uid: string): Promise<{
  questionsAnswered: number;
  correctAnswers: number;
  simuladosCompleted: number;
}> {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString();

  const q = query(
    collection(db, "users", uid, "quizResults"),
    where("date", ">=", weekAgoStr)
  );
  const snap = await getDocs(q);

  let questionsAnswered = 0;
  let correctAnswers = 0;

  snap.docs.forEach((d) => {
    const data = d.data() as QuizResult;
    questionsAnswered += data.totalQuestions;
    correctAnswers += data.correctAnswers;
  });

  return {
    questionsAnswered,
    correctAnswers,
    simuladosCompleted: snap.size,
  };
}

export async function getTopicScores(uid: string, level: CFALevel): Promise<
  { topicId: string; topicName: string; score: number; questionsAnswered: number; totalQuestions: number }[]
> {
  const q = query(
    collection(db, "users", uid, "quizResults"),
    where("level", "==", level)
  );
  const snap = await getDocs(q);

  const topicMap = new Map<string, { name: string; correct: number; total: number }>();

  snap.docs.forEach((d) => {
    const data = d.data() as QuizResult;
    for (const tb of data.topicBreakdown) {
      const existing = topicMap.get(tb.topicId) || { name: tb.topicName, correct: 0, total: 0 };
      existing.correct += tb.correct;
      existing.total += tb.total;
      topicMap.set(tb.topicId, existing);
    }
  });

  return Array.from(topicMap.entries()).map(([topicId, data]) => ({
    topicId,
    topicName: data.name,
    score: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    questionsAnswered: data.total,
    totalQuestions: data.total,
  }));
}

// ─── Active Mock Exam Checkpoint ────────────────────────────────────────────

export interface ActiveMockQuestion {
  id: string;
  topicId: string;
  moduleId?: string;
  losId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ActiveMock {
  level: CFALevel;
  mode: "official" | "training";
  questions: ActiveMockQuestion[];
  answers: (number | null)[];
  currentIndex: number;
  showAnswer: boolean;
  timeSpentSeconds: number;
  countdownSecondsTotal?: number;
  discussions: Record<string, QuizDiscussionMessage[]>;
  startedAt: string;
  updatedAt: string;
}

export async function saveActiveMock(uid: string, mock: ActiveMock): Promise<void> {
  try {
    await setDoc(doc(db, "users", uid, "activeMocks", mock.level), {
      ...mock,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("saveActiveMock failed", err);
    throw err;
  }
}

export async function getActiveMock(uid: string, level: CFALevel): Promise<ActiveMock | null> {
  try {
    const snap = await getDoc(doc(db, "users", uid, "activeMocks", level));
    if (!snap.exists()) return null;
    return snap.data() as ActiveMock;
  } catch (err) {
    console.error("getActiveMock failed", err);
    throw err;
  }
}

export async function deleteActiveMock(uid: string, level: CFALevel): Promise<void> {
  try {
    await deleteDoc(doc(db, "users", uid, "activeMocks", level));
  } catch (err) {
    console.error("deleteActiveMock failed", err);
    throw err;
  }
}

// ─── Study Progress ─────────────────────────────────────────────────────────

export interface StudyProgressData {
  [losKey: string]: { date: string };
}

export async function getStudyProgress(uid: string, level: CFALevel): Promise<StudyProgressData> {
  const snap = await getDoc(doc(db, "users", uid, "studyProgress", level));
  if (!snap.exists()) return {};
  const data = snap.data();
  return (data.losStudied || {}) as StudyProgressData;
}

export async function saveStudyProgress(uid: string, level: CFALevel, losStudied: StudyProgressData): Promise<void> {
  await setDoc(doc(db, "users", uid, "studyProgress", level), { losStudied });
}

// ─── Study Plans ────────────────────────────────────────────────────────────

export type StudyBlockType = "reading" | "practice" | "review" | "mock";

export interface StudyPlanBlockDoc {
  id: string;
  topicId: string;
  topicName: string;
  moduleId?: string;
  moduleName?: string;
  losIds?: string[];
  date: string;
  durationMinutes: number;
  type: StudyBlockType;
  completed: boolean;
  description?: string;
}

export interface StudyPlanDoc {
  id?: string;
  blocks: StudyPlanBlockDoc[];
  createdAt: string;
  level: CFALevel;
  studyDays?: StudyDay[];
  weeklyHoursGoal?: number;
  userGoals?: string;
  periodDays?: number;
}

export async function saveStudyPlan(uid: string, plan: StudyPlanDoc): Promise<string> {
  const ref = await addDoc(collection(db, "users", uid, "studyPlans"), {
    ...plan,
    createdAt: plan.createdAt || new Date().toISOString(),
  });
  return ref.id;
}

export async function getLatestStudyPlan(uid: string, level: CFALevel): Promise<StudyPlanDoc | null> {
  const q = query(
    collection(db, "users", uid, "studyPlans"),
    where("level", "==", level)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const plans = snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as StudyPlanDoc))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return plans[0] ?? null;
}

export async function updateStudyPlanBlock(
  uid: string,
  planId: string,
  blocks: StudyPlanDoc["blocks"]
): Promise<void> {
  await updateDoc(doc(db, "users", uid, "studyPlans", planId), { blocks });
}

// ─── Chat Sessions ──────────────────────────────────────────────────────────

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  type: "image" | "file";
  name: string;
  mimeType: string;
  dataUrl?: string;
  textContent?: string;
}

export interface ChatSession {
  id?: string;
  title: string;
  level: CFALevel;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export async function saveChatSession(uid: string, session: ChatSession): Promise<string> {
  const cleanMessages = session.messages.map((m) => {
    const clean: Record<string, unknown> = { role: m.role, content: m.content, timestamp: m.timestamp };
    if (m.attachments && m.attachments.length > 0) clean.attachments = m.attachments;
    return clean;
  });

  if (session.id) {
    await updateDoc(doc(db, "users", uid, "chatSessions", session.id), {
      messages: cleanMessages,
      updatedAt: new Date().toISOString(),
    });
    return session.id;
  }
  const ref = await addDoc(collection(db, "users", uid, "chatSessions"), {
    title: session.title,
    level: session.level,
    messages: cleanMessages,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function getChatSessions(uid: string, limitCount = 20): Promise<ChatSession[]> {
  const q = query(
    collection(db, "users", uid, "chatSessions"),
    orderBy("updatedAt", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChatSession));
}

export async function getChatSession(uid: string, sessionId: string): Promise<ChatSession | null> {
  const snap = await getDoc(doc(db, "users", uid, "chatSessions", sessionId));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as ChatSession) : null;
}

export async function deleteChatSession(uid: string, sessionId: string): Promise<void> {
  await deleteDoc(doc(db, "users", uid, "chatSessions", sessionId));
}

// ─── Study Streak ───────────────────────────────────────────────────────────

async function updateStudyStreak(uid: string): Promise<void> {
  const profile = await getUserProfile(uid);
  if (!profile) return;

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  let newStreak = profile.studyStreak;

  if (profile.lastStudyDate === today) {
    return;
  } else if (profile.lastStudyDate === yesterday) {
    newStreak += 1;
  } else {
    newStreak = 1;
  }

  await updateUserProfile(uid, {
    studyStreak: newStreak,
    lastStudyDate: today,
  });
}

// ─── Free Usage Tracking ─────────────────────────────────────────────────────

/**
 * Increments the chat message counter for a free user.
 * @param uid - Firebase user ID
 */
export async function incrementChatUsage(uid: string): Promise<void> {
  const profile = await getUserProfile(uid);
  const today = new Date().toISOString().split("T")[0];
  const isNewDay = profile?.freeUsage?.date !== today;
  await updateUserProfile(uid, {
    freeUsage: {
      chatMessages: isNewDay ? 1 : (profile?.freeUsage?.chatMessages ?? 0) + 1,
      quizQuestions: isNewDay ? 0 : (profile?.freeUsage?.quizQuestions ?? 0),
      date: today,
    },
  } as Partial<UserProfile>);
}

/**
 * Increments the quiz question counter for a free user.
 * @param uid - Firebase user ID
 * @param count - Number of questions to add
 */
export async function incrementQuizUsage(uid: string, count: number): Promise<void> {
  const profile = await getUserProfile(uid);
  const today = new Date().toISOString().split("T")[0];
  const isNewDay = profile?.freeUsage?.date !== today;
  await updateUserProfile(uid, {
    freeUsage: {
      chatMessages: isNewDay ? 0 : (profile?.freeUsage?.chatMessages ?? 0),
      quizQuestions: isNewDay ? count : (profile?.freeUsage?.quizQuestions ?? 0) + count,
      date: today,
    },
  } as Partial<UserProfile>);
}

// ─── Feedback ────────────────────────────────────────────────────────────────

export async function saveFeedback(feedback: Omit<Feedback, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "feedbacks"), feedback);
  return ref.id;
}

export async function resetDailyUsage(uid: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  await updateUserProfile(uid, {
    freeUsage: {
      chatMessages: 0,
      quizQuestions: 0,
      date: today,
      feedbackGivenToday: true,
    },
  } as Partial<UserProfile>);
}

export async function getAllFeedbacks(limitCount = 50): Promise<Feedback[]> {
  const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"), limit(limitCount));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Feedback));
}

export async function getAllUsers(): Promise<(UserProfile & { uid: string })[]> {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ uid: d.id, ...d.data() } as UserProfile & { uid: string }));
}
