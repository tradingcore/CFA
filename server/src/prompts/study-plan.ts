export function buildStudyPlanPrompt(params: {
  level: string;
  examDate: string;
  weeklyHours: number;
  weakTopics: { topicId: string; topicName: string; score: number }[];
  topicsList: { topicId: string; topicName: string; weightRange: string }[];
  currentDate: string;
}): string {
  const { level, examDate, weeklyHours, weakTopics, topicsList, currentDate } = params;

  return `You are a CFA study plan generator. Create a detailed weekly study plan for a CFA Level ${level} candidate.

Today's date: ${currentDate}
Exam date: ${examDate}
Available study hours per week: ${weeklyHours}

CFA Level ${level} topics and weights:
${topicsList.map((t) => `- ${t.topicName} (${t.weightRange})`).join("\n")}

${
  weakTopics.length > 0
    ? `Weak areas (need more time):\n${weakTopics.map((t) => `- ${t.topicName}: ${t.score}% accuracy`).join("\n")}`
    : "No performance data yet — distribute evenly by weight."
}

Rules:
- Prioritize weak topics and high-weight topics.
- Include 3 types of study blocks: "reading" (new material), "practice" (questions/problems), "review" (revision).
- Each block should be 30-90 minutes.
- Schedule blocks across the days between now and the exam.
- Include at least one full mock exam per week in the last 4 weeks.
- Balance variety — don't study the same topic for an entire day.
- Generate blocks for the next 14 days only.

Return a JSON array (no markdown, no code fences, only raw JSON):
[
  {
    "topicId": "topic-id",
    "topicName": "Topic Name",
    "date": "YYYY-MM-DD",
    "durationMinutes": 60,
    "type": "reading|practice|review",
    "description": "Brief description of what to study"
  }
]`;
}
