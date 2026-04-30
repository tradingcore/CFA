import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";

export async function POST(req: NextRequest) {
  try {
    const { question, options, selectedIndex, correctIndex } = await req.json();

    if (question == null || !options?.length || selectedIndex == null || correctIndex == null) {
      return NextResponse.json({ error: "question, options, selectedIndex, and correctIndex are required" }, { status: 400 });
    }

    const letters = ["A", "B", "C", "D"];

    const prompt = `You are a CFA tutor. The student answered a question incorrectly. Explain why the correct answer is correct and why their chosen answer is wrong.

Respond in English. Be clear, educational, and encouraging.

Question: ${question}

Options:
${options.map((o: string, i: number) => `${letters[i]}. ${o}`).join("\n")}

Student's answer: ${letters[selectedIndex]} (${options[selectedIndex]})
Correct answer: ${letters[correctIndex]} (${options[correctIndex]})

Provide:
1. Why the correct answer is right (cite relevant CFA concepts).
2. Why the student's answer is wrong (common misconception).
3. A quick tip to remember this concept.`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.6,
    });

    return NextResponse.json({ explanation: completion.choices[0]?.message?.content ?? "" });
  } catch (err: unknown) {
    console.error("Explain error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal error" }, { status: 500 });
  }
}
