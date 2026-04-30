import { NextRequest, NextResponse } from "next/server";
import { openai, MODEL } from "@/lib/openai-server";

interface TopicListItem {
  topicId: string;
  topicName: string;
  weightRange: string;
  modules?: {
    id: string;
    name: string;
    los?: { id: string; description: string }[];
  }[];
}

interface WeakTopicItem {
  topicId: string;
  topicName: string;
  score: number;
  sampleSize?: number;
}

interface LosSnapshotItem {
  losId: string;
  topicId: string;
  moduleId: string;
  state: string;
  accuracy: number;
  sampleSize: number;
  isDue: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const {
      level,
      examDate,
      weeklyHours,
      studyDays,
      periodDays = 14,
      userGoals = "",
      targetModuleIds = [],
      targetLosIds = [],
      prioritizeWeakTopics = true,
      includeWeeklyMock = true,
      weakTopics = [],
      topicsList = [],
      losSnapshot = [],
    } = await req.json();

    if (!level || !examDate || !weeklyHours || !studyDays?.length || !topicsList?.length) {
      return NextResponse.json(
        { error: "level, examDate, weeklyHours, studyDays, and topicsList are required" },
        { status: 400 }
      );
    }

    const currentDate = new Date().toISOString().split("T")[0];
    const periodWeeks = Math.max(1, Math.round(periodDays / 7));
    const hoursPerStudyDay = Math.round((weeklyHours / studyDays.length) * 10) / 10;

    const moduleSummaries = (topicsList as TopicListItem[])
      .map((topic) => {
        const moduleLines = (topic.modules ?? [])
          .map((module) => {
            const losLine = (module.los ?? [])
              .slice(0, 6)
              .map((los) => `${los.id}::${los.description.slice(0, 80)}`)
              .join(" | ");
            return `  ${module.id} (${module.name}) :: ${losLine}`;
          })
          .join("\n");
        return `- ${topic.topicId} ${topic.topicName} (${topic.weightRange})\n${moduleLines}`;
      })
      .join("\n");

    const weakTopicLines = (weakTopics as WeakTopicItem[])
      .filter((topic) => (topic.sampleSize ?? 0) >= 5)
      .map((topic) => `- ${topic.topicName} (${topic.topicId}): ${topic.score}% over ${topic.sampleSize ?? "?"}q`)
      .join("\n");

    const losSnapshotLines = (losSnapshot as LosSnapshotItem[])
      .slice(0, 30)
      .map(
        (entry) =>
          `- ${entry.losId} (${entry.topicId}/${entry.moduleId}) state=${entry.state} accuracy=${Math.round(entry.accuracy * 100)}% n=${entry.sampleSize}${entry.isDue ? " due" : ""}`
      )
      .join("\n");

    const targetModulesLine = (targetModuleIds as string[]).length > 0
      ? `User picked these modules: ${(targetModuleIds as string[]).join(", ")}.`
      : "";
    const targetLosLine = (targetLosIds as string[]).length > 0
      ? `User picked these LOS: ${(targetLosIds as string[]).join(", ")}.`
      : "";

    const prompt = `You are a CFA study plan generator. Build a personalized plan for a CFA Level ${level} candidate.

Today: ${currentDate}
Exam date: ${examDate}
Weekly study hours: ${weeklyHours}
Available study days: ${studyDays.join(", ")}
Approximate target per study day: ${hoursPerStudyDay} hours
Plan window: next ${periodDays} days (~${periodWeeks} weeks).

Curriculum (topic, modules, sample LOS):
${moduleSummaries}

User goals: ${userGoals || "(not provided)"}
${targetModulesLine}
${targetLosLine}
Prioritize weak topics: ${prioritizeWeakTopics ? "yes" : "no"}.
Include weekly mock exam: ${includeWeeklyMock ? "yes" : "no"}.

Topics flagged weak (only those with enough sample):
${weakTopicLines || "- (no reliable signal yet)"}

LOS-level snapshot (states like in_progress, practiced, strong, mastered, needs_review):
${losSnapshotLines || "- (no LOS data yet)"}

Rules:
- Schedule study blocks ONLY on the available study days listed above.
- Stay close to ${weeklyHours} hours per week and ${hoursPerStudyDay} hours per available day.
- Block types: "reading", "practice", "review", "mock". Each block 30-90 minutes (mocks can be longer if needed).
- Each block targets one specific module via moduleId. Optionally include up to 5 losIds inside that module.
- Use the user goals and target modules/LOS as the primary signal; fall back to weak topics and high-weight topics.
- Cover at least one block per topic if scope allows; keep variety across days.
- If includeWeeklyMock, schedule one "mock" block on a study day each week.
- Date format YYYY-MM-DD only.
- Description should be 1-2 sentences telling the student what to do.

Return ONLY a raw JSON array (no markdown, no code fences):
[{"topicId":"...","moduleId":"...","losIds":["..."],"date":"YYYY-MM-DD","durationMinutes":60,"type":"reading|practice|review|mock","description":"..."}]`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 5000,
      temperature: 0.7,
    });

    const raw = completion.choices[0]?.message?.content ?? "[]";
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse study plan" }, { status: 500 });
    }

    const topicsById = new Map<string, TopicListItem>();
    (topicsList as TopicListItem[]).forEach((topic) => topicsById.set(topic.topicId, topic));

    const blocks = JSON.parse(jsonMatch[0]).map(
      (
        block: {
          topicId: string;
          moduleId?: string;
          losIds?: string[];
          date: string;
          durationMinutes: number;
          type: string;
          description: string;
        },
        index: number
      ) => {
        const topic = topicsById.get(block.topicId);
        const module = topic?.modules?.find((m) => m.id === block.moduleId);
        const allowedTypes = new Set(["reading", "practice", "review", "mock"]);
        const blockType = allowedTypes.has(block.type) ? block.type : "reading";
        return {
          id: `sp-${Date.now()}-${index}`,
          topicId: block.topicId,
          topicName: topic?.topicName ?? block.topicId,
          ...(block.moduleId ? { moduleId: block.moduleId } : {}),
          ...(module?.name ? { moduleName: module.name } : {}),
          ...(Array.isArray(block.losIds) && block.losIds.length > 0
            ? { losIds: block.losIds }
            : {}),
          date: block.date,
          durationMinutes: block.durationMinutes,
          type: blockType,
          completed: false,
          description: block.description,
        };
      }
    );

    return NextResponse.json({ blocks });
  } catch (err: unknown) {
    console.error("Study plan error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal error" }, { status: 500 });
  }
}
