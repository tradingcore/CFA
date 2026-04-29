import { Router, Response } from "express";
import { openai, MODEL } from "../services/openai";
import { requireAuth, AuthRequest } from "../middleware/auth";
import { buildChatSystemPrompt } from "../prompts/chat-system";

const router = Router();

router.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { message, history, level, topicContext } = req.body;

    if (!message || !level) {
      res.status(400).json({ error: "message and level are required" });
      return;
    }

    const systemPrompt = buildChatSystemPrompt(level, topicContext);

    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
    ];

    if (Array.isArray(history)) {
      for (const h of history.slice(-20)) {
        messages.push({ role: h.role, content: h.content });
      }
    }

    messages.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages,
      max_tokens: 1500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content ?? "";

    res.json({ response });
  } catch (err: unknown) {
    console.error("Chat error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ error: message });
  }
});

export default router;
