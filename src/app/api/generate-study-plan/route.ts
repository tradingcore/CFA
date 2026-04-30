import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";

export async function POST(req: NextRequest) {
  try {
    const { level, examDate, weeklyHours, studyDays, weakTopics, topicsList } = await req.json();

    if (!level || !examDate || !weeklyHours || !studyDays?.length || !topicsList?.length) {
      return NextResponse.json({ error: "level, examDate, weeklyHours, studyDays, and topicsList are required" }, { status: 400 });
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const hoursPerStudyDay = Math.round((weeklyHours / studyDays.length) * 10) / 10;

    const prompt = `You are a CFA study plan generator. Create a detailed weekly study plan for a CFA Level ${level} candidate.

Today: ${currentDate}
Exam date: ${examDate}
Weekly study hours: ${weeklyHours}
Available study days: ${studyDays.join(", ")}
Approximate target per study day: ${hoursPerStudyDay} hours

Topics and weights:
${topicsList.map((t: { topicName: string; weightRange: string }) => `- ${t.topicName} (${t.weightRange})`).join("\n")}

${weakTopics?.length > 0 ? `Weak areas:\n${weakTopics.map((t: { topicName: string; score: number }) => `- ${t.topicName}: ${t.score}%`).join("\n")}` : "No performance data yet — distribute evenly by weight."}

Rules:
- Prioritize weak and high-weight topics.
- 3 block types: "reading", "practice", "review". Each 30-90 minutes.
- Generate blocks for the next 14 days only.
- Schedule study blocks ONLY on the available study days listed above.
- Keep the total scheduled time near ${weeklyHours} hours per week.
- Keep each study day near ${hoursPerStudyDay} hours total, split into multiple blocks if needed.
- Balance variety — don't study the same topic all day.

Return ONLY a raw JSON array (no markdown, no code fences):
[{"topicId":"...","topicName":"...","date":"YYYY-MM-DD","durationMinutes":60,"type":"reading|practice|review","description":"..."}]`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const raw = completion.choices[0]?.message?.content ?? "[]";
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse study plan" }, { status: 500 });
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

    return NextResponse.json({ blocks });
  } catch (err: unknown) {
    console.error("Study plan error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal error" }, { status: 500 });
  }
}
