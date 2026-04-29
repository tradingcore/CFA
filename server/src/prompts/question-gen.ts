export function buildQuestionGenPrompt(params: {
  level: string;
  topicName: string;
  moduleName?: string;
  losDescriptions: string[];
  count: number;
  difficulty?: string;
}): string {
  const { level, topicName, moduleName, losDescriptions, count, difficulty } = params;

  const difficultyGuide = difficulty
    ? `Difficulty level: ${difficulty}. ${
        difficulty === "easy"
          ? "Questions should test basic recall and simple definitions."
          : difficulty === "hard"
          ? "Questions should require multi-step reasoning, calculations, or subtle distinctions."
          : "Questions should be at a standard exam level."
      }`
    : "Mix difficulties to simulate the actual exam.";

  return `You are a CFA exam question writer. Generate exactly ${count} multiple-choice questions for CFA Level ${level}.

Topic: ${topicName}
${moduleName ? `Module: ${moduleName}` : ""}

Learning Outcome Statements (LOS) to base questions on:
${losDescriptions.map((l, i) => `${i + 1}. ${l}`).join("\n")}

${difficultyGuide}

Requirements:
- Each question must have exactly 4 options (A, B, C, D).
- Only one correct answer per question.
- Include a clear explanation for the correct answer.
- Questions should mimic the style, difficulty, and phrasing of actual CFA Institute exams.
- Do NOT repeat the same concept across questions unless the LOS list is very narrow.
- Write questions and options in English (CFA exam language).
- Explanations should be concise but complete (2-4 sentences).

Return a JSON array with this exact structure (no markdown, no code fences, only raw JSON):
[
  {
    "question": "question text",
    "options": ["A. option", "B. option", "C. option", "D. option"],
    "correctIndex": 0,
    "explanation": "explanation text"
  }
]`;
}
