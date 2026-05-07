import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getCurriculum, searchText } from "../data-loader.js";

export function registerSearchConcepts(server: McpServer) {
  server.tool(
    "search_concepts",
    "Search CFA curriculum concepts, summaries, and key ideas by keyword query. Returns the most relevant LOS content.",
    {
      query: z.string().describe("Search query (e.g. 'duration convexity', 'CAPM beta', 'cash flow statement')"),
      level: z.enum(["I", "II", "III"]).describe("CFA level"),
      topicId: z.string().optional().describe("Filter by topic ID"),
      moduleId: z.string().optional().describe("Filter by module ID"),
      limit: z.number().default(8).describe("Max results to return"),
    },
    async ({ query, level, topicId, moduleId, limit }) => {
      const curriculum = getCurriculum(level);

      const results: { score: number; losId: string; topicName: string; moduleName: string; number: string; description: string; summary: string; keyConcepts: string[] }[] = [];

      for (const topic of curriculum.topics) {
        if (topicId && topic.id !== topicId) continue;
        for (const module of topic.modules) {
          if (moduleId && module.id !== moduleId) continue;
          for (const los of module.los) {
            const searchable = [los.description, los.summary, ...los.keyConcepts].join(" ");
            const score = searchText(searchable, query);
            if (score > 0) {
              results.push({
                score,
                losId: los.losId,
                topicName: los.topicName,
                moduleName: los.moduleName,
                number: los.number,
                description: los.description,
                summary: los.summary,
                keyConcepts: los.keyConcepts,
              });
            }
          }
        }
      }

      results.sort((a, b) => b.score - a.score);
      const top = results.slice(0, limit);

      if (top.length === 0) {
        return {
          content: [{ type: "text" as const, text: `No results found for "${query}" in CFA Level ${level} curriculum.` }],
        };
      }

      const text = top
        .map((r) => `## ${r.number} — ${r.moduleName}\n**${r.description}**\n\n${r.summary}\n\nKey concepts: ${r.keyConcepts.join(", ")}`)
        .join("\n\n---\n\n");

      return {
        content: [{ type: "text" as const, text }],
      };
    }
  );
}
