import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import transport from './mcp-transport.js';

export const server = new McpServer({
  name: "MCP Server",
  description: "A server for the Model Context Protocol",
  version: "1.0.0",
});

server.tool(
  "add",
  "Use this tool to add two numbers together.",
  {
    a: z.number().describe("The first number to add"),
    b: z.number().describe("The second number to add"),
  },
  async ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: `${a + b}`,
        },
      ],
    };
  }
);

export const setupServer = async () => {
  await server.connect(transport);
};
