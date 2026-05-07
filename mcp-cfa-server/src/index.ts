import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSearchConcepts } from "./tools/search-concepts.js";
import { registerGetExercises } from "./tools/get-exercises.js";
import { registerGetFormulas } from "./tools/get-formulas.js";
import { registerGetLosDetail } from "./tools/get-los-detail.js";
import { registerSearchDocs } from "./tools/search-docs.js";

const server = new McpServer({
  name: "cfa-knowledge",
  version: "1.0.0",
});

registerSearchConcepts(server);
registerGetExercises(server);
registerGetFormulas(server);
registerGetLosDetail(server);
registerSearchDocs(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
