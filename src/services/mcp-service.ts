import { Request, Response } from 'express';
import transport from '../mcp/mcp-transport.js';

export const handlePostRequest = async (req: Request, res: Response) => {
  console.log('Received MCP request:', req.body);
  try {
    await transport.handleRequest(req, res, req.body);
  } catch (error: any) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
};

export const handleUnAllowedMethodRequest = async (req: Request, res: Response) => {
  console.log('Received MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
};

