import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";

interface LosInput {
  id: string;
  description: string;
}

export async function POST(req: NextRequest) {
  try {
    const { level, topicId, topicName, moduleId, moduleName, losDescriptions, count, difficulty } =
      await req.json();

    if (!level || !topicId || !topicName || !Array.isArray(losDescriptions) || losDescriptions.length === 0) {
      return NextResponse.json(
        { error: "level, topicId, topicName, and losDescriptions are required" },
        { status: 400 }
      );
    }

    const losInputs: LosInput[] = losDescriptions
      .map((entry: unknown) => {
        if (typeof entry === "string") {
          return { id: "", description: entry } as LosInput;
        }
        if (entry && typeof entry === "object") {
          const obj = entry as Record<string, unknown>;
          return {
            id: typeof obj.id === "string" ? obj.id : "",
            description: typeof obj.description === "string" ? obj.description : "",
          } as LosInput;
        }
        return { id: "", description: "" };
      })
      .filter((entry) => entry.description);

    if (losInputs.length === 0) {
      return NextResponse.json({ error: "losDescriptions are required" }, { status: 400 });
    }

    const losById = new Map(losInputs.map((entry) => [entry.id, entry] as const));
    const questionCount = Math.min(count || 5, 20);

    const difficultyGuide = difficulty
      ? `Difficulty: ${difficulty}. ${
          difficulty === "easy"
            ? "Test basic recall."
            : difficulty === "hard"
            ? "Require multi-step reasoning."
            : "Standard exam level."
        }`
      : "Mix difficulties to simulate the actual exam.";

    const losBlock = losInputs
      .map((entry, index) => `${index + 1}. losId="${entry.id}" :: ${entry.description}`)
      .join("\n");

    const prompt = `You are a CFA exam question writer. Generate exactly ${questionCount} multiple-choice questions for CFA Level ${level}.

Topic: ${topicName}
${moduleName ? `Module: ${moduleName}` : ""}

Learning Outcome Statements (LOS), each tagged with a losId you must reuse:
${losBlock}

${difficultyGuide}

Requirements:
- Each question targets exactly one of the LOS above.
- Each question must include the losId of the LOS you targeted (use the exact string after losId=).
- Each question must have exactly 4 options (A, B, C, D).
- Only one correct answer per question.
- Include a clear explanation for the correct answer.
- Mimic actual CFA Institute exam style and phrasing.
- Write questions and options in English (CFA exam language).
- Explanations: concise, 2-4 sentences.

Return ONLY a raw JSON array (no markdown, no code fences):
[{"losId":"...","question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correctIndex":0,"explanation":"..."}]`;

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

    const fallbackLosId = losInputs[0]?.id ?? "";
    const questions = JSON.parse(jsonMatch[0]).map(
      (
        q: {
          losId?: string;
          question: string;
          options: string[];
          correctIndex: number;
          explanation: string;
        },
        i: number
      ) => {
        const matchedLosId = q.losId && losById.has(q.losId) ? q.losId : fallbackLosId;
        return {
          id: `ai-${topicId}-${Date.now()}-${i}`,
          topicId,
          ...(moduleId ? { moduleId } : {}),
          ...(matchedLosId ? { losId: matchedLosId } : {}),
          question: q.question,
          options: q.options.map((option: string) => option.replace(/^[A-D]\.\s*/, "")),
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        };
      }
    );

    return NextResponse.json({ questions });
  } catch (err: unknown) {
    console.error("Question generation error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal error" }, { status: 500 });
  }
}
