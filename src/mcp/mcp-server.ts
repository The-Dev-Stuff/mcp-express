import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import transport from './mcp-transport.js';
import tools from './mcp-tools.json' with { type: "json" };;

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

export const registerTools = (tools: any[], server: McpServer) => {
  tools.forEach((tool) => {
    const { name, description, parameters } = tool.function;

    const schema = Object.fromEntries(
      Object.entries(parameters.properties).map(([key, value]) => {
        const type = (value as any).type;
        const description = (value as any).description || '';
        const nullable = (value as any).nullable || false;

        let paramType;

        switch (type) {
          case "integer":
          case "number":
            paramType = z.number().describe(description);
            if (nullable) paramType = paramType.nullable();
            break;
          case "string":
            paramType = z.string().describe(description);
            if (nullable) paramType = paramType.nullable();
            break;
          case "boolean":
            paramType = z.boolean().describe(description);
            if (nullable) paramType = paramType.nullable();
            break;
          default:
            paramType = z.string().describe(description);
            if (nullable) paramType = paramType.nullable();
        }

        return [key, paramType];
      })
    );

    server.tool(
      name,
      description,
      schema,
      async (args) => {
        // Implement the tool's logic here
        return {
          content: [
            {
              type: "text",
              text: `Tool ${name} executed with args: ${JSON.stringify(args)}`,
            },
          ],
        };
      }
    );
  });
}

export const setupServer = async () => {
  registerTools(tools, server);
  await server.connect(transport);
};
