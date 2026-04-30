import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";

const SYSTEM_PROMPT = `You are an expert CFA exam tutor. You help candidates preparing for the CFA exam.

Your behavior:
- Always respond in Portuguese (Brazilian Portuguese).
- Be encouraging but precise. CFA requires accuracy.
- When explaining concepts, reference the CFA curriculum structure (topics, modules, LOS).
- Use examples, formulas, and analogies to explain complex topics.
- If asked about study strategies, give actionable advice based on CFA best practices.
- When providing formulas, use clear notation.
- Keep responses focused and exam-relevant.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history, level, topicContext } = await req.json();

    if (!message || !level) {
      return NextResponse.json({ error: "message and level are required" }, { status: 400 });
    }

    let systemPrompt = SYSTEM_PROMPT + `\n\nThe user is studying for CFA Level ${level}.`;
    if (topicContext) {
      systemPrompt += `\n\nCurrent topic context: ${topicContext}`;
    }

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

    return NextResponse.json({ response: completion.choices[0]?.message?.content ?? "" });
  } catch (err: unknown) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal error" }, { status: 500 });
  }
}
