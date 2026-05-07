import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";
import { buildContextForQuery, getSystemPrompt } from "@/lib/cfa-knowledge";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const { message, history, level, topicContext, attachments } = await req.json();

    if (!message || !level) {
      return NextResponse.json({ error: "message and level are required" }, { status: 400 });
    }

    const knowledgeContext = buildContextForQuery(message, level);
    const basePrompt = getSystemPrompt("chat");

    let systemPrompt = (basePrompt || "You are an expert CFA exam tutor.") + `\n\nThe user is studying for CFA Level ${level}.`;
    if (topicContext) {
      systemPrompt += `\n\nCurrent topic context: ${topicContext}`;
    }
    if (knowledgeContext) {
      systemPrompt += `\n\n${knowledgeContext}`;
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
