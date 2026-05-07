import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getExercises } from "../data-loader.js";

export function registerGetExercises(server: McpServer) {
  server.tool(
    "get_exercises",
    "Get CFA practice questions filtered by topic, module, LOS, or difficulty. Returns questions with options, correct answer, and explanation.",
    {
      level: z.enum(["I", "II", "III"]).describe("CFA level"),
      topicId: z.string().optional().describe("Filter by topic ID"),
      moduleId: z.string().optional().describe("Filter by module ID"),
      losId: z.string().optional().describe("Filter by specific LOS ID"),
      difficulty: z.enum(["easy", "medium", "hard"]).optional().describe("Filter by difficulty"),
      count: z.number().default(5).describe("Number of questions to return"),
    },
    async ({ level, topicId, moduleId, losId, difficulty, count }) => {
      let exercises = getExercises(level);

      if (topicId) exercises = exercises.filter((e) => e.topicId === topicId);
      if (moduleId) exercises = exercises.filter((e) => e.moduleId === moduleId);
      if (losId) exercises = exercises.filter((e) => e.losId === losId);
      if (difficulty) exercises = exercises.filter((e) => e.difficulty === difficulty);

      const shuffled = [...exercises].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, count);

      if (selected.length === 0) {
        return {
          content: [{ type: "text" as const, text: `No exercises found for the given filters in CFA Level ${level}.` }],
        };
      }

      const text = selected
        .map((e, i) => {
          const optionsText = e.options
            .map((opt, idx) => `  ${String.fromCharCode(65 + idx)}. ${opt}`)
            .join("\n");
          return `### Question ${i + 1} [${e.difficulty}] — ${e.moduleName}\nLOS: ${e.losId}\n\n${e.question}\n\n${optionsText}\n\n**Correct: ${String.fromCharCode(65 + e.correctIndex)}**\n\n${e.explanation}`;
        })
        .join("\n\n---\n\n");

      return {
        content: [{ type: "text" as const, text: `Found ${selected.length} exercises:\n\n${text}` }],
      };
    }
  );
}
