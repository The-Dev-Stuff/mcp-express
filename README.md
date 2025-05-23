# MCP-Express
An MCP client and server implementation with Express and Typescript

## High level
This is a simple implementation of the Model Context Protocol (MCP) using Express and Typescript with the StreamableHTTPServerTransport for Http access.

This project follows the example provided by the [Edouard Bonlieu at Koyeb](https://www.koyeb.com/tutorials/deploy-remote-mcp-servers-to-koyeb-using-streamable-http-transport).

To learn more about MCP, visit the [official documentation](https://modelcontextprotocol.io/introduction).

## Key differences from a standard server
The project structure is pretty standard using a server, routes and services.

The key thing to note is that we must expose a **POST** `/mcp` endpoint that will be used by the MCP inspector to communicate with the server and we must allow the transport to handle these requests.

## Setup for local development

```bash
# Install depenencies
npm install

# Start the dev server
npm start
````

**You should see the following log in your terminal**

```MCP Streamable HTTP Server listening on port 3000```

**Now run the MCP inspector**
```bash
npx @modelcontextprotocol/inspector
```

**Open the inspector in your browser**

Go to http://127.0.0.1:6274/

From here:
- Select 'Streamable HTTP' as the Transport Type
- Enter the url as `http://localhost:3000/mcp`
- Click 'Connect'

The MCP Inspector will then make a post request to your server with an `initialize` method.

If everything is working correctly, a button to `List Tools` should appear in the MCP inspector.

From here, you can select a tool, enter the required parameters, and click 'Run Tool' to execute the tool.
