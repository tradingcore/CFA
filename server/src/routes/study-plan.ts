import { Router, Response } from "express";
import { openai, MODEL } from "../services/openai";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { buildStudyPlanPrompt } from "../prompts/study-plan";

const router = Router();

router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { level, examDate, weeklyHours, weakTopics, topicsList } = req.body;

    if (!level || !examDate || !weeklyHours || !topicsList?.length) {
      res.status(400).json({
        error: "level, examDate, weeklyHours, and topicsList are required",
      });
      return;
    }

    const prompt = buildStudyPlanPrompt({
      level,
      examDate,
      weeklyHours,
      weakTopics: weakTopics || [],
      topicsList,
      currentDate: new Date().toISOString().split("T")[0],
    });

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const raw = completion.choices[0]?.message?.content ?? "[]";

    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      res.status(500).json({ error: "Failed to parse study plan from AI response" });
      return;
    }

    const blocks = JSON.parse(jsonMatch[0]).map(
      (b: { topicId: string; topicName: string; date: string; durationMinutes: number; type: string; description: string }, i: number) => ({
        id: `sp-${Date.now()}-${i}`,
        topicId: b.topicId,
        topicName: b.topicName,
        date: b.date,
        durationMinutes: b.durationMinutes,
        type: b.type,
        completed: false,
        description: b.description,
      })
    );

    res.json({ blocks });
  } catch (err: unknown) {
    console.error("Study plan generation error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
  }
});

export default router;
