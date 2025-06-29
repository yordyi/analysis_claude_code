# MCP

由 相关 MCP 组件动态构造


# ListMcpResourcesTool

## Description

Lists available resources from configured MCP servers.
Each resource object includes a 'server' field indicating which server it's from.

Usage examples:
- List all resources from all servers: \`listMcpResources\`
- List resources from a specific server: \`listMcpResources({ server: "myserver" })\`


## Input

server: n.string().optional()

# Prompt

List available resources from configured MCP servers.
Each returned resource will include all standard MCP resource fields plus a 'server' field 
indicating which server the resource belongs to.

Parameters:
- server (optional): The name of a specific MCP server to get resources from. If not provided,
  resources from all servers will be returned.

# ReadMcpResourceTool

## Description

Reads a specific resource from an MCP server.
- server: The name of the MCP server to read from
- uri: The URI of the resource to read

Usage examples:
- Read a resource from a server: \`readMcpResource({ server: "myserver", uri: "my-resource-uri" })\`

## Input

server: n.string(),
uri: n.string()

# Prompt 

Reads a specific resource from an MCP server, identified by server name and resource URI.

Parameters:
- server (required): The name of the MCP server from which to read the resource
- uri (required): The URI of the resource to read


# 由 MCP 动态构造的工具模板

- name: "mcp__" + d41(A.name) + "__" + I.name

参考现有代码