export interface GeneratedQuestion {
  id: string;
  topicId: string;
  moduleId?: string;
  losId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuestionLosInput {
  id: string;
  description: string;
}

export interface StudyPlanBlock {
  id: string;
  topicId: string;
  topicName: string;
  moduleId?: string;
  moduleName?: string;
  losIds?: string[];
  date: string;
  durationMinutes: number;
  type: "reading" | "practice" | "review" | "mock";
  completed: boolean;
  description: string;
}

export interface StudyPlanLosSnapshot {
  losId: string;
  topicId: string;
  moduleId: string;
  state: string;
  accuracy: number;
  sampleSize: number;
  isDue: boolean;
}

export interface ChatAttachmentPayload {
  type: "image" | "file";
  name: string;
  mimeType: string;
  dataUrl?: string;
  textContent?: string;
}

async function apiFetch<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error: ${res.status}`);
  }

  return res.json();
}

export async function apiChat(params: {
  message: string;
  history: { role: string; content: string }[];
  level: string;
  topicContext?: string;
  attachments?: ChatAttachmentPayload[];
}): Promise<{ response: string }> {
  return apiFetch("/api/chat", params);
}

export async function apiGenerateQuestions(params: {
  level: string;
  topicId: string;
  topicName: string;
  moduleId?: string;
  moduleName?: string;
  losDescriptions: QuestionLosInput[];
  count: number;
  difficulty?: string;
}): Promise<{ questions: GeneratedQuestion[] }> {
  return apiFetch("/api/generate-questions", params);
}

export async function apiGenerateStudyPlan(params: {
  level: string;
  examDate: string;
  weeklyHours: number;
  studyDays: string[];
  periodDays: number;
  userGoals?: string;
  targetModuleIds?: string[];
  targetLosIds?: string[];
  prioritizeWeakTopics?: boolean;
  includeWeeklyMock?: boolean;
  startFromModuleId?: string;
  weakTopics: { topicId: string; topicName: string; score: number; sampleSize: number }[];
  topicsList: {
    topicId: string;
    topicName: string;
    weightRange: string;
    modules: { id: string; name: string; los: { id: string; description: string }[] }[];
  }[];
  losSnapshot?: StudyPlanLosSnapshot[];
}): Promise<{ blocks: StudyPlanBlock[] }> {
  return apiFetch("/api/generate-study-plan", params);
}

export async function apiExplainQuestion(params: {
  question: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
}): Promise<{ explanation: string }> {
  return apiFetch("/api/explain-question", params);
}
