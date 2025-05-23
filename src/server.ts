import express from 'express';
import { setupServer } from './mcp/mcp-server.js';
import mcpRoutes from './routes/mcp-routes.js';

const app = express();
app.use(express.json());

// Use MCP routes
app.use('/mcp', mcpRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
setupServer().then(() => {
  app.listen(PORT, () => {
    console.log(`MCP Streamable HTTP Server listening on port ${PORT}`);
  });
}).catch((error: any) => {
  console.error('Failed to set up the server:', error);
  process.exit(1);
});
