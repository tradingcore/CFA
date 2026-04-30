import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";

export async function POST(req: NextRequest) {
  try {
    const { level, topicId, topicName, moduleName, losDescriptions, count, difficulty } = await req.json();

    if (!level || !topicId || !topicName || !losDescriptions?.length) {
      return NextResponse.json({ error: "level, topicId, topicName, and losDescriptions are required" }, { status: 400 });
    }

    const questionCount = Math.min(count || 5, 20);

    const difficultyGuide = difficulty
      ? `Difficulty: ${difficulty}. ${difficulty === "easy" ? "Test basic recall." : difficulty === "hard" ? "Require multi-step reasoning." : "Standard exam level."}`
      : "Mix difficulties to simulate the actual exam.";

    const prompt = `You are a CFA exam question writer. Generate exactly ${questionCount} multiple-choice questions for CFA Level ${level}.

Topic: ${topicName}
${moduleName ? `Module: ${moduleName}` : ""}

Learning Outcome Statements (LOS):
${losDescriptions.map((l: string, i: number) => `${i + 1}. ${l}`).join("\n")}

${difficultyGuide}

Requirements:
- Each question must have exactly 4 options (A, B, C, D).
- Only one correct answer per question.
- Include a clear explanation for the correct answer.
- Mimic actual CFA Institute exam style and phrasing.
- Write questions and options in English (CFA exam language).
- Explanations: concise, 2-4 sentences.

Return ONLY a raw JSON array (no markdown, no code fences):
[{"question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correctIndex":0,"explanation":"..."}]`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,
      temperature: 0.8,
    });

    const raw = completion.choices[0]?.message?.content ?? "[]";
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse questions" }, { status: 500 });
    }

    const questions = JSON.parse(jsonMatch[0]).map(
      (q: { question: string; options: string[]; correctIndex: number; explanation: string }, i: number) => ({
        id: `ai-${topicId}-${Date.now()}-${i}`,
        topicId,
        question: q.question,
        options: q.options.map((o: string) => o.replace(/^[A-D]\.\s*/, "")),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      })
    );

    return NextResponse.json({ questions });
  } catch (err: unknown) {
    console.error("Question generation error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal error" }, { status: 500 });
  }
}
