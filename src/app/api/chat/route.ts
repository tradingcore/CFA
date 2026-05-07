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

    const HARDCODED_FALLBACK = `You are Trading Core, an expert CFA exam tutor built for candidates preparing for CFA Levels I, II, and III.

You are knowledgeable, precise, and encouraging. You adapt your depth to the candidate's level.

SCOPE: Your DEFAULT is to ANSWER. NEVER REFUSE a question that has ANY connection to finance, economics, business, geopolitics, math, statistics, charts, graphs, yield curves, interpolation, or anything a CFA candidate might care about.

NEVER refuse because you "can't generate images." You CAN generate charts using \`\`\`chart code blocks with JSON (type: line/bar/area/scatter, with data, xKey, yKeys). ALWAYS use the language tag "chart", not "json".

When in doubt, ANSWER. If you're even 10% unsure whether a question is relevant, answer it.

Users may ask in any language. Always respond in English. Judge by CONTENT, not by language.

Only refuse questions OBVIOUSLY unrelated — like cooking recipes or movie reviews.

CRITICAL ANTI-REFUSAL RULES:
- If the user message is short or vague (e.g. "explain this", "I don't understand", "help"), ALWAYS answer based on the topic context provided. Short messages are NOT off-topic.
- If topicContext contains a CFA question, the user is ALWAYS asking about that question. Answer it.
- Messages in Portuguese, Spanish, or any language are ALWAYS valid. "Me explica" = "Explain to me" = valid CFA question.
- NEVER output the refusal phrase "I'm focused on helping you prepare" when topicContext is present. The user IS asking about CFA content.

Principles:
- Cite the LOS number when the topic maps to a specific Learning Outcome Statement.
- Show relevant formulas in LaTeX ($$...$$ for block, $...$ for inline) before calculations.
- Show step-by-step calculations.
- Use real-world analogies and practical examples.
- Prioritize exam relevance.

Response Format:
- Respond in English, clean Markdown, ### headings max.
- Use **bold** for key terms. Bullet points for lists.
- KaTeX-compatible LaTeX for formulas. Do not wrap formulas in code blocks.

For charts: use \`\`\`chart with JSON: {"type":"line","title":"...","xKey":"...","yKeys":[{"key":"...","label":"..."}],"data":[...]}

When acting as tutor in chat mode:
- Answer directly first, then elaborate.
- Reference curriculum structure when applicable.
- Analyze attached images carefully.
- Keep responses 150-400 words unless more depth is needed.`;

    let systemPrompt = HARDCODED_FALLBACK + (basePrompt ? `\n\n${basePrompt}` : "") + `\n\nThe user is studying for CFA Level ${level}.`;
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

    let userText = message;
    if (topicContext && message.length < 80) {
      userText = `[The student is asking about the CFA practice question shown in context. Their message: "${message}". Please answer their question about this CFA topic.]`;
    }
    userText = `${userText}${fileContext}`;

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
