export interface GeneratedQuestion {
  id: string;
  topicId: string;
  moduleId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudyPlanBlock {
  id: string;
  topicId: string;
  topicName: string;
  date: string;
  durationMinutes: number;
  type: "reading" | "practice" | "review";
  completed: boolean;
  description: string;
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
}): Promise<{ response: string }> {
  return apiFetch("/api/chat", params);
}

export async function apiGenerateQuestions(params: {
  level: string;
  topicId: string;
  topicName: string;
  moduleId?: string;
  moduleName?: string;
  losDescriptions: string[];
  count: number;
  difficulty?: string;
}): Promise<{ questions: GeneratedQuestion[] }> {
  return apiFetch("/api/generate-questions", params);
}

export async function apiGenerateStudyPlan(params: {
  level: string;
  examDate: string;
  weeklyHours: number;
  weakTopics: { topicId: string; topicName: string; score: number }[];
  topicsList: { topicId: string; topicName: string; weightRange: string }[];
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
