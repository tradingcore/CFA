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

// ─── User Profile ───────────────────────────────────────────────────────────

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

export interface QuizAnswer {
  questionId: string;
  topicId: string;
  selectedIndex: number;
  correctIndex: number;
  correct: boolean;
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
  const ref = await addDoc(collection(db, "users", uid, "quizResults"), {
    ...result,
    date: result.date || new Date().toISOString(),
  });

  await updateStudyStreak(uid);

  return ref.id;
}

export async function getQuizHistory(uid: string, limitCount = 20): Promise<QuizResult[]> {
  const q = query(
    collection(db, "users", uid, "quizResults"),
    orderBy("date", "desc"),
    limit(limitCount)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as QuizResult));
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
    where("date", ">=", weekAgoStr),
    orderBy("date", "desc")
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
    where("level", "==", level),
    orderBy("date", "desc")
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

export interface StudyPlanDoc {
  id?: string;
  blocks: {
    id: string;
    topicId: string;
    topicName: string;
    date: string;
    durationMinutes: number;
    type: "reading" | "practice" | "review";
    completed: boolean;
    description?: string;
  }[];
  createdAt: string;
  level: CFALevel;
  studyDays?: StudyDay[];
  weeklyHoursGoal?: number;
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
    where("level", "==", level),
    orderBy("createdAt", "desc"),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as StudyPlanDoc;
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
  if (session.id) {
    await updateDoc(doc(db, "users", uid, "chatSessions", session.id), {
      messages: session.messages,
      updatedAt: new Date().toISOString(),
    });
    return session.id;
  }
  const ref = await addDoc(collection(db, "users", uid, "chatSessions"), {
    ...session,
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
