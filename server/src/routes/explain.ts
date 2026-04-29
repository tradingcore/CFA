import { Router, Response } from "express";
import { openai, MODEL } from "../services/openai";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { buildExplainPrompt } from "../prompts/explain";

const router = Router();

router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { question, options, selectedIndex, correctIndex } = req.body;

    if (question == null || !options?.length || selectedIndex == null || correctIndex == null) {
      res.status(400).json({
        error: "question, options, selectedIndex, and correctIndex are required",
      });
      return;
    }

    const prompt = buildExplainPrompt({
      question,
      options,
      selectedIndex,
      correctIndex,
    });

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.6,
    });

    const explanation = completion.choices[0]?.message?.content ?? "";

    res.json({ explanation });
  } catch (err: unknown) {
    console.error("Explain error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
  }
});

export default router;
