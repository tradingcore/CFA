import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const SYSTEM_PROMPT = `You are an expert CFA exam tutor. You help candidates preparing for the CFA exam.

Your behavior:
- Always respond in English.
- Be encouraging but precise. CFA requires accuracy.
- When explaining concepts, reference the CFA curriculum structure (topics, modules, LOS).
- Use examples, formulas, and analogies to explain complex topics.
- If the user attaches an image, analyze it carefully as a CFA tutor. It may contain a question, formula, chart, table, or screenshot.
- If the user attaches a text file, use its contents as supporting context and cite the relevant parts in your explanation.
- If an image is unclear or cropped, say exactly what is unreadable and ask for a clearer image.
- If asked about study strategies, give actionable advice based on CFA best practices.
- Format answers in clean Markdown with short headings, bullets, and bold emphasis when useful.
- Use at most ### headings. Do not use #### or deeper headings.
- When providing formulas, use valid KaTeX-compatible LaTeX.
- Use inline formulas with $...$.
- Use block formulas with $$ on their own line before and after the formula.
- Do not escape LaTeX backslashes unnecessarily and do not wrap formulas in code blocks.
- Keep responses focused and exam-relevant.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history, level, topicContext, attachments } = await req.json();

    if (!message || !level) {
      return NextResponse.json({ error: "message and level are required" }, { status: 400 });
    }

    let systemPrompt = SYSTEM_PROMPT + `\n\nThe user is studying for CFA Level ${level}.`;
    if (topicContext) {
      systemPrompt += `\n\nCurrent topic context: ${topicContext}`;
    }

    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
    ];

    if (Array.isArray(history)) {
      for (const h of history.slice(-20)) {
        messages.push({ role: h.role, content: h.content });
      }
    }
    const imageAttachments = Array.isArray(attachments)
      ? attachments.filter((a) => a?.type === "image" && typeof a.dataUrl === "string")
      : [];
    const fileAttachments = Array.isArray(attachments)
      ? attachments.filter((a) => a?.type === "file" && typeof a.textContent === "string")
      : [];
    const fileContext = fileAttachments.length > 0
      ? `\n\nAttached file context:\n${fileAttachments
          .slice(0, 2)
          .map((attachment) => `File: ${attachment.name}\n${attachment.textContent}`)
          .join("\n\n")}`
      : "";
    const userText = `${message}${fileContext}`;

    if (imageAttachments.length > 0) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: userText },
          ...imageAttachments.slice(0, 1).map((attachment) => ({
            type: "image_url" as const,
            image_url: { url: attachment.dataUrl },
          })),
        ],
      });
    } else {
      messages.push({ role: "user", content: userText });
    }

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
