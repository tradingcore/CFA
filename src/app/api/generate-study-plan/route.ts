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
      prioritizeWeakTopics = true,
      includeWeeklyMock = true,
      startFromModuleId = "",
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

    const dayNameToIndex: Record<string, number> = {
      sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6,
    };
    const studyDayIndices = new Set(
      (studyDays as string[]).map((d) => dayNameToIndex[d.toLowerCase()] ?? -1).filter((i) => i >= 0)
    );

    const validDates: string[] = [];
    const startDate = new Date(currentDate + "T12:00:00");
    for (let i = 0; i <= periodDays + 7; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      if (studyDayIndices.has(d.getDay())) {
        validDates.push(d.toISOString().split("T")[0]);
      }
    }
    const validDatesStr = validDates.join(", ");

    const curriculumOrder = (topicsList as TopicListItem[])
      .map((topic, topicIndex) => {
        const moduleLines = (topic.modules ?? [])
          .map((module, modIndex) => {
            const losLines = (module.los ?? [])
              .map((los) => `      ${los.id} :: ${los.description.slice(0, 100)}`)
              .join("\n");
            return `    [${topicIndex + 1}.${modIndex + 1}] ${module.id} — ${module.name}\n${losLines}`;
          })
          .join("\n");
        return `  ${topicIndex + 1}. ${topic.topicId} — ${topic.topicName} (${topic.weightRange})\n${moduleLines}`;
      })
      .join("\n\n");

    const weakTopicLines = (weakTopics as WeakTopicItem[])
      .filter((t) => (t.sampleSize ?? 0) >= 5)
      .map((t) => `- ${t.topicName} (${t.topicId}): ${t.score}% over ${t.sampleSize ?? "?"}q`)
      .join("\n");

    const losSnapshotLines = (losSnapshot as LosSnapshotItem[])
      .slice(0, 30)
      .map(
        (e) =>
          `- ${e.losId} (${e.topicId}/${e.moduleId}) state=${e.state} accuracy=${Math.round(e.accuracy * 100)}% n=${e.sampleSize}${e.isDue ? " DUE" : ""}`
      )
      .join("\n");

    const startingPoint = startFromModuleId
      ? `Start from module "${startFromModuleId}" — the student has already studied everything before this module.`
      : "Start from the beginning of the curriculum (first topic, first module).";

    const targetModulesLine = (targetModuleIds as string[]).length > 0
      ? `The student wants extra focus on these modules: ${(targetModuleIds as string[]).join(", ")}. Spend proportionally more time on them, but still follow the sequential order.`
      : "";

    const prompt = `You are a CFA Level ${level} study plan generator. Create a structured, sequential plan.

## Context
Today: ${currentDate}
Exam date: ${examDate}
Weekly study hours: ${weeklyHours}
Study days per week: ${studyDays.join(", ")}
Target per study day: ~${hoursPerStudyDay} hours
Plan window: next ${periodDays} days (~${periodWeeks} weeks)

VALID DATES (use ONLY these dates, no other dates are allowed):
${validDatesStr}

## Starting point
${startingPoint}

## Curriculum in order (this is the EXACT sequence to follow)
${curriculumOrder}

## Student goals
${userGoals || "(none specified)"}
${targetModulesLine}
Prioritize weak topics: ${prioritizeWeakTopics ? "yes — spend more time reviewing weak areas" : "no — follow curriculum order evenly"}.
Include weekly mock: ${includeWeeklyMock ? "yes — one full mock exam per week" : "no"}.

## Weak topics (accuracy < 70%, 5+ questions answered)
${weakTopicLines || "(no reliable signal yet — student is new)"}

## LOS-level mastery snapshot
${losSnapshotLines || "(no data yet — student is new)"}

## CRITICAL RULES — follow these exactly

1. SEQUENTIAL ORDER: Follow the curriculum order above. Do NOT jump between unrelated topics randomly. Progress through modules in order: Topic 1 Module 1 → Topic 1 Module 2 → ... → Topic 2 Module 1, etc.

2. BLOCK SIZE — KEEP BLOCKS SMALL AND DIGESTIBLE:
   - READING blocks: 25-35 minutes, covering 2-3 LOS maximum. If a module has 5 LOS, split into 2 reading blocks (e.g. LOS a-c, then LOS d-e).
   - PRACTICE blocks: 20-30 minutes, covering 2-3 LOS (the same ones just read).
   - REVIEW blocks: 15-25 minutes, covering 3-5 LOS from previously studied modules.
   - MOCK blocks: 120-180 minutes (these are the only large blocks).
   - A student should be able to finish any non-mock block in a single sitting without fatigue.

3. LEARNING CYCLE per module:
   a. READING block(s): Cover the module's LOS in small chunks (2-3 LOS per block)
   b. PRACTICE block: After every 2-3 LOS read, add a practice block for those same LOS
   c. After completing all modules in a topic, add one REVIEW block for the whole topic

4. SPACED REVIEW: Every 3-5 new modules, insert a REVIEW block for previously studied modules that are weak or due. Use the LOS snapshot above to identify what needs review.

${includeWeeklyMock ? `4b. MANDATORY WEEKLY MOCK: You MUST include exactly one "mock" block per week (type: "mock", durationMinutes: 180). Schedule it on the last study day of each week. This is NOT optional — every week in the plan MUST have one mock block. A mock block only needs topicId (use the weakest topic), no moduleId or losIds needed.` : ""}

5. EVERY block MUST include:
   - topicId and moduleId (except mock blocks which only need topicId)
   - losIds: array of specific LOS IDs from the curriculum above (e.g. "l1-qm-01:0", "l1-qm-01:1"). Maximum 3 LOS per reading/practice block.
   - date in YYYY-MM-DD format, only on available study days
   - durationMinutes: 25-35 for reading, 20-30 for practice, 15-25 for review, 120-180 for mock
   - type: "reading", "practice", "review", or "mock"
   - description: 1-2 sentences telling the student exactly what to do in this session

6. STAY WITHIN the time budget: ~${hoursPerStudyDay} hours per study day, ~${weeklyHours} hours per week. More smaller blocks is better than fewer large blocks.

7. DATES: You MUST use ONLY dates from the VALID DATES list above. Do NOT use any other dates. Do NOT schedule on weekends or non-study days.

8. For READING blocks: list the specific LOS the student should read in that session (max 3).
   For PRACTICE blocks: list the LOS the student should practice questions on (max 3).
   For REVIEW blocks: list the LOS that need refreshing (3-5 from weak/due snapshot).
   For MOCK blocks: no specific losIds needed, set topicId to the most relevant weak topic.

Return ONLY a raw JSON array (no markdown, no code fences, no explanation):
[{"topicId":"...","topicName":"...","moduleId":"...","moduleName":"...","losIds":["..."],"date":"YYYY-MM-DD","durationMinutes":30,"type":"reading","description":"..."}]`;

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 8000,
      temperature: 0.5,
    });

    const raw = completion.choices[0]?.message?.content ?? "[]";
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse study plan" }, { status: 500 });
    }

    const validDatesSet = new Set(validDates);

    const snapToValidDate = (date: string): string => {
      if (validDatesSet.has(date)) return date;
      const target = new Date(date + "T12:00:00").getTime();
      let closest = validDates[0];
      let closestDist = Infinity;
      for (const vd of validDates) {
        const dist = Math.abs(new Date(vd + "T12:00:00").getTime() - target);
        if (dist < closestDist) {
          closestDist = dist;
          closest = vd;
        }
      }
      return closest;
    };

    const topicsById = new Map<string, TopicListItem>();
    (topicsList as TopicListItem[]).forEach((topic) => topicsById.set(topic.topicId, topic));

    const blocks = JSON.parse(jsonMatch[0]).map(
      (
        block: {
          topicId: string;
          topicName?: string;
          moduleId?: string;
          moduleName?: string;
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
          topicName: block.topicName || topic?.topicName || block.topicId,
          ...(block.moduleId ? { moduleId: block.moduleId } : {}),
          ...(module?.name ? { moduleName: module.name } : block.moduleName ? { moduleName: block.moduleName } : {}),
          ...(Array.isArray(block.losIds) && block.losIds.length > 0 ? { losIds: block.losIds } : {}),
          date: snapToValidDate(block.date),
          durationMinutes: block.durationMinutes,
          type: blockType,
          completed: false,
          description: block.description,
        };
      }
    );

    if (includeWeeklyMock && blocks.length > 0) {
      const weekGroups = new Map<number, string[]>();
      const planStart = new Date(validDates[0] + "T12:00:00");

      for (const vd of validDates) {
        const d = new Date(vd + "T12:00:00");
        const weekNum = Math.floor((d.getTime() - planStart.getTime()) / (7 * 86400000));
        if (!weekGroups.has(weekNum)) weekGroups.set(weekNum, []);
        weekGroups.get(weekNum)!.push(vd);
      }

      const existingMockDates = new Set(
        blocks.filter((b: { type: string }) => b.type === "mock").map((b: { date: string }) => b.date)
      );

      const weakestTopic = (weakTopics as WeakTopicItem[]).sort((a, b) => a.score - b.score)[0];
      const mockTopicId = weakestTopic?.topicId || (topicsList as TopicListItem[])[0]?.topicId || "ethics";
      const mockTopicName = weakestTopic?.topicName || (topicsList as TopicListItem[])[0]?.topicName || "Ethics";

      for (const [, weekDates] of weekGroups) {
        const hasMock = weekDates.some((d) => existingMockDates.has(d));
        if (!hasMock) {
          const mockDate = weekDates[weekDates.length - 1];
          blocks.push({
            id: `sp-${Date.now()}-mock-${mockDate}`,
            topicId: mockTopicId,
            topicName: mockTopicName,
            date: mockDate,
            durationMinutes: 180,
            type: "mock",
            completed: false,
            description: "Full mock exam — simulate real exam conditions with timer.",
          });
        }
      }
    }

    return NextResponse.json({ blocks });
  } catch (err: unknown) {
    console.error("Study plan error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Internal error" }, { status: 500 });
  }
}
