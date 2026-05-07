import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";
import { fetchExercises, searchConcepts, getSystemPrompt } from "@/lib/cfa-knowledge";

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

    const existingExercises = fetchExercises({ level, topicId, moduleId, count: 5 });
    const conceptContext = searchConcepts({
      query: losInputs.map((l) => l.description).join(" "),
      level,
      topicId,
      limit: 3,
    });

    const referenceBlock = existingExercises.length > 0
      ? `\nReference examples (use similar style and difficulty but do NOT copy these):\n${existingExercises.map((e) => `Q: ${e.question}\nA: ${e.options[e.correctIndex]}`).join("\n\n")}\n`
      : "";

    const conceptBlock = conceptContext.length > 0
      ? `\nCurriculum context:\n${conceptContext.map((c) => `${c.number}: ${c.summary}`).join("\n")}\n`
      : "";

    const behaviorPrompt = getSystemPrompt("questions");

    const prompt = `${behaviorPrompt || "You are a CFA exam question writer."}

Generate exactly ${questionCount} multiple-choice questions for CFA Level ${level}.

Topic: ${topicName}
${moduleName ? `Module: ${moduleName}` : ""}

Learning Outcome Statements (LOS), each tagged with a losId you must reuse:
${losBlock}

${difficultyGuide}
${referenceBlock}${conceptBlock}
Each question must include the losId of the LOS it targets (use the exact string after losId=).

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
