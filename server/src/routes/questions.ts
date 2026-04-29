import { Router, Response } from "express";
import { openai, MODEL } from "../services/openai";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { buildQuestionGenPrompt } from "../prompts/question-gen";

const router = Router();

router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { level, topicId, topicName, moduleName, losDescriptions, count, difficulty } = req.body;

    if (!level || !topicId || !topicName || !losDescriptions?.length) {
      res.status(400).json({
        error: "level, topicId, topicName, and losDescriptions are required",
      });
      return;
    }

    const questionCount = Math.min(count || 5, 20);

    const prompt = buildQuestionGenPrompt({
      level,
      topicName,
      moduleName,
      losDescriptions,
      count: questionCount,
      difficulty,
    });

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,
      temperature: 0.8,
    });

    const raw = completion.choices[0]?.message?.content ?? "[]";

    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      res.status(500).json({ error: "Failed to parse questions from AI response" });
      return;
    }

    const questions = JSON.parse(jsonMatch[0]).map(
      (q: { question: string; options: string[]; correctIndex: number; explanation: string }, i: number) => ({
        id: `ai-${topicId}-${Date.now()}-${i}`,
        topicId,
        moduleId: req.body.moduleId || undefined,
        question: q.question,
        options: q.options.map((o: string) => o.replace(/^[A-D]\.\s*/, "")),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      })
    );

    res.json({ questions });
  } catch (err: unknown) {
    console.error("Question generation error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
  }
});

export default router;
