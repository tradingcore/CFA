import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getFormulas } from "../data-loader.js";

export function registerGetFormulas(server: McpServer) {
  server.tool(
    "get_formulas",
    "Get CFA formulas filtered by topic or module. Returns formula name, LaTeX notation, description, variables, and example.",
    {
      level: z.enum(["I", "II", "III"]).describe("CFA level (used for filtering)"),
      topicId: z.string().optional().describe("Filter by topic ID"),
      moduleId: z.string().optional().describe("Filter by module ID"),
      query: z.string().optional().describe("Search formula by name or description"),
    },
    async ({ topicId, moduleId, query }) => {
      let formulas = getFormulas();

      if (topicId) formulas = formulas.filter((f) => f.topicId === topicId);
      if (moduleId) formulas = formulas.filter((f) => f.moduleId === moduleId);
      if (query) {
        const q = query.toLowerCase();
        formulas = formulas.filter(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            f.description.toLowerCase().includes(q) ||
            f.variables.some((v) => v.toLowerCase().includes(q))
        );
      }

      if (formulas.length === 0) {
        return {
          content: [{ type: "text" as const, text: "No formulas found for the given filters." }],
        };
      }

      const text = formulas
        .map(
          (f) =>
            `### ${f.name}\n**Topic:** ${f.topicName} — ${f.moduleName}\n\n$$${f.formula}$$\n\n${f.description}\n\n**Variables:** ${f.variables.join(", ")}\n\n**Example:** ${f.example}`
        )
        .join("\n\n---\n\n");

      return {
        content: [{ type: "text" as const, text: `Found ${formulas.length} formulas:\n\n${text}` }],
      };
    }
  );
}
