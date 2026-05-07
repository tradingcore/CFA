import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getCurriculum, getExercises, getFormulas } from "../data-loader.js";

export function registerGetLosDetail(server: McpServer) {
  server.tool(
    "get_los_detail",
    "Get complete detail for a specific LOS: description, summary, key concepts, related formulas, and sample exercises.",
    {
      losId: z.string().describe("LOS ID (e.g. 'l1-qm-01:0')"),
      level: z.enum(["I", "II", "III"]).describe("CFA level"),
    },
    async ({ losId, level }) => {
      const curriculum = getCurriculum(level);

      let foundLos = null;
      for (const topic of curriculum.topics) {
        for (const module of topic.modules) {
          for (const los of module.los) {
            if (los.losId === losId) {
              foundLos = los;
              break;
            }
          }
          if (foundLos) break;
        }
        if (foundLos) break;
      }

      if (!foundLos) {
        return {
          content: [{ type: "text" as const, text: `LOS "${losId}" not found in CFA Level ${level} curriculum.` }],
        };
      }

      const relatedExercises = getExercises(level)
        .filter((e) => e.losId === losId)
        .slice(0, 3);

      const relatedFormulas = getFormulas().filter((f) =>
        foundLos!.relatedFormulas.some((rf) => f.id === rf || f.name.toLowerCase().includes(rf.toLowerCase()))
      );

      let text = `# ${foundLos.number} — ${foundLos.moduleName}\n\n`;
      text += `**Topic:** ${foundLos.topicName}\n\n`;
      text += `**LOS:** ${foundLos.description}\n\n`;
      text += `## Summary\n${foundLos.summary}\n\n`;
      text += `## Key Concepts\n${foundLos.keyConcepts.map((c) => `- ${c}`).join("\n")}\n\n`;

      if (relatedFormulas.length > 0) {
        text += `## Related Formulas\n`;
        text += relatedFormulas.map((f) => `- **${f.name}:** $${f.formula}$ — ${f.description}`).join("\n");
        text += "\n\n";
      }

      if (relatedExercises.length > 0) {
        text += `## Sample Exercises\n`;
        text += relatedExercises
          .map((e, i) => {
            const opts = e.options.map((o, idx) => `  ${String.fromCharCode(65 + idx)}. ${o}`).join("\n");
            return `### Exercise ${i + 1}\n${e.question}\n${opts}\n\nAnswer: ${String.fromCharCode(65 + e.correctIndex)} — ${e.explanation}`;
          })
          .join("\n\n");
      }

      return {
        content: [{ type: "text" as const, text }],
      };
    }
  );
}
