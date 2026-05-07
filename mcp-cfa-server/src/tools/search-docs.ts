import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { searchDocs, listDocs } from "../docs-loader.js";

export function registerSearchDocs(server: McpServer) {
  server.tool(
    "search_docs",
    "Search the CFA knowledge base of books, curriculum PDFs, and methodology documents. Uses keyword matching across all indexed documents.",
    {
      query: z.string().describe("Search query (e.g. 'bond duration', 'IFRS revenue recognition', 'portfolio optimization')"),
      limit: z.number().default(8).describe("Max sections to return"),
    },
    async ({ query, limit }) => {
      const results = searchDocs(query, limit);

      if (results.length === 0) {
        return {
          content: [{ type: "text" as const, text: `No results found for "${query}" in the knowledge base.` }],
        };
      }

      const text = results
        .map((r) => `## ${r.heading}\n**Source:** ${r.docTitle} (${r.category})\n\n${r.content}`)
        .join("\n\n---\n\n");

      return {
        content: [{ type: "text" as const, text: `Found ${results.length} relevant sections:\n\n${text}` }],
      };
    }
  );

  server.tool(
    "list_docs",
    "List all documents available in the CFA knowledge base.",
    {},
    async () => {
      const docs = listDocs();

      if (docs.length === 0) {
        return {
          content: [{ type: "text" as const, text: "No documents in the knowledge base yet. Add PDFs using: python scripts/convert_pdfs.py <pdf> --category books" }],
        };
      }

      const text = docs
        .map((d) => `- **${d.title}** (${d.category}) — ${d.sections} sections`)
        .join("\n");

      return {
        content: [{ type: "text" as const, text: `${docs.length} documents indexed:\n\n${text}` }],
      };
    }
  );
}
