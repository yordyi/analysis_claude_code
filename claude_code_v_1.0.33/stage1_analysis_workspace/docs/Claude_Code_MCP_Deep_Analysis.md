# Claude Code MCP (Model Context Protocol) 深度分析报告

## 执行摘要

本报告对Claude Code的MCP（Model Context Protocol）配置和挂载机制进行了深度逆向分析。MCP是Claude Code的核心扩展机制，允许连接外部服务器提供工具、资源和能力。通过分析混淆源码，我们发现了完整的MCP生命周期管理、配置系统、通信协议和安全机制。

## 1. MCP架构概览

### 1.1 MCP系统组件架构

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code Core                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ MCP Manager │  │ MCP Client  │  │ MCP Resource Cache  │  │
│  │   (DV)      │  │   Pool      │  │      System         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ MCP Config  │  │ MCP Tool    │  │ MCP OAuth Provider  │  │
│  │ Validator   │  │ Registry    │  │      (MO)           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                  MCP Transport Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ HTTP Client │  │ SSE Client  │  │ WebSocket Client    │  │
│  │ (FF1)       │  │ (FF1)       │  │     (Do1)           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ STDIO Client│  │ IDE Client  │  │ Protocol Handler    │  │
│  │             │  │             │  │      (wt)           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    MCP Servers                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ HTTP Server │  │ SSE Server  │  │ WebSocket Server    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ STDIO Server│  │ IDE Server  │  │ Local Process       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 核心混淆函数映射表

| 混淆名称 | 功能描述 | 文件位置 | 行号 |
|---------|----------|----------|------|
| `DV` | MCP服务器管理器，负责加载和管理所有MCP服务器配置 | improved-claude-code-5.mjs | 23903 |
| `ue` | MCP客户端连接工厂，负责创建不同类型的MCP连接 | chunks.91.mjs | 2981 |
| `MO` | MCP OAuth认证提供者，处理OAuth 2.0认证流程 | chunks.91.mjs | 2653 |
| `wt` | MCP协议处理器，处理JSON-RPC通信协议 | chunks.90.mjs | 1884 |
| `FF1` | HTTP/SSE MCP客户端实现 | chunks.91.mjs | 184 |
| `Do1` | WebSocket MCP客户端实现 | chunks.91.mjs | 3019 |
| `ZP1` | MCP工具名称解析器，解析`mcp__server__tool`格式 | improved-claude-code-5.mjs | 13914 |
| `j81` | MCP服务器名称标准化函数 | improved-claude-code-5.mjs | 13883 |
| `pi`, `y81` | MCP工具过滤函数，按服务器名称过滤工具 | improved-claude-code-5.mjs | 13887, 13892 |
| `vC` | MCP项目配置加载器，加载`.mcp.json`配置 | improved-claude-code-5.mjs | 23814 |
| `Ug` | MCP配置模式验证器 | improved-claude-code-5.mjs | 23422 |
| `wo1` | MCP配置文件解析器 | chunks.91.mjs | 2928 |

## 2. MCP配置系统深度分析

### 2.1 配置文件格式和层级

Claude Code支持三级MCP配置系统：

#### 2.1.1 配置作用域

```typescript
// 配置作用域类型定义
type MCPScope = "local" | "project" | "user";

// 配置优先级: local > project > user
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2789-2799
- 函数：`nC1(A)` - 作用域描述函数

#### 2.1.2 .mcp.json配置格式

```json
{
  "mcpServers": {
    "server_name": {
      "type": "stdio" | "http" | "sse" | "ws-ide" | "sse-ide",
      "command": "string",           // stdio类型必需
      "args": ["string"],           // stdio类型可选
      "url": "string",              // http/sse类型必需
      "headers": {"key": "value"},  // http类型可选
      "authToken": "string",        // ws-ide类型可选
      "env": {"key": "value"}       // stdio类型可选
    }
  }
}
```

**源码证据**：
- 文件：`improved-claude-code-5.mjs`，行号：23422-23424
- 模式验证器：`Ug = n.object({ mcpServers: n.record(n.string(), Bv1) })`

#### 2.1.3 配置加载机制

```javascript
// 配置加载函数 (vC)
vC = L0(() => {
  let A = Iv1(dA(), ".mcp.json");
  if (!x1().existsSync(A)) return {};
  try {
    let B = x1().readFileSync(A, { encoding: "utf-8" }),
        Q = Qv4(B);
    return E1("tengu_mcpjson_found", {
      numServers: Object.keys(Q).length
    }), Q
  } catch {}
  return {}
}, () => {
  let A = dA(),
      B = Iv1(A, ".mcp.json");
  if (x1().existsSync(B)) try {
    let Q = x1().readFileSync(B, { encoding: "utf-8" });
    return `${A}:${Q}`
  } catch {}
  return A
})
```

**源码证据**：
- 文件：`improved-claude-code-5.mjs`，行号：23814-23835

### 2.2 配置验证和错误处理

#### 2.2.1 配置验证器

```javascript
// MCP配置文件解析和验证 (wo1)
function wo1(A) {
  try {
    if (!x1().existsSync(A)) 
      throw new Error(`MCP config file not found: ${A}`);
    
    let B = x1().readFileSync(A, { encoding: "utf8" }),
        Q = Z8(B);
    if (!Q) 
      throw new Error(`Invalid JSON in MCP config file: ${A}`);
    
    let I = Ug.safeParse(Q);
    if (!I.success) {
      let G = I.error.errors.map((Z) => 
        `${Z.path.join(".")}: ${Z.message}`).join(", ");
      throw new Error(`Invalid MCP configuration in ${A}: ${G}`)
    }
    return I.data
  } catch (B) {
    if (B instanceof Error) throw B;
    throw new Error(`Failed to parse MCP config file: ${B}`)
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2928-2946

#### 2.2.2 命令行配置处理

支持`--mcp-config`命令行参数指定外部配置文件：

```javascript
// 外部配置文件处理 (oC1)
function oC1(A) {
  let B = {};
  for (let Q of A) {
    let I = Q.indexOf(":");
    if (I === -1) 
      throw new Error(`Invalid header format: "${Q}". Expected format: "Header-Name: value"`);
    let G = Q.substring(0, I).trim(),
        Z = Q.substring(I + 1).trim();
    B[G] = Z
  }
  return B
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2948-2959

## 3. MCP服务器挂载机制深度分析

### 3.1 连接工厂和客户端创建

#### 3.1.1 MCP连接工厂 (ue)

```javascript
ue = L0(async (A, B) => {
  try {
    let Q;
    // 根据类型创建不同的客户端
    if (B.type === "sse") {
      // SSE客户端配置
      let V = { authProvider: new MO(A, B) };
      Q = new FF1(new URL(B.url), V)
    } else if (B.type === "sse-ide") {
      Q = new FF1(new URL(B.url));
    } else if (B.type === "ws-ide") {
      // WebSocket客户端配置
      let X = new tB1.default(B.url, ["mcp"], 
        B.authToken ? {
          headers: { "X-Claude-Code-Ide-Authorization": B.authToken }
        } : void 0);
      Q = new Do1(X)
    } else if (B.type === "http") {
      // HTTP客户端配置
      let V = {
        authProvider: new MO(A, B),
        requestInit: { ...B.headers && { headers: oC1(B.headers) } }
      };
      Q = new FF1(new URL(B.url), V)
    } else if (B.type === "stdio") {
      // STDIO客户端配置
      Q = new wt(new xv(B.command, B.args, { 
        env: { ...process.env, ...B.env }, 
        cwd: dA() 
      }))
    }
    
    // 创建客户端实例
    let I = new wt(Q);
    
    // 设置连接超时
    let G = I.connect(Q),
        Z = new Promise((X, V) => {
          let C = setTimeout(() => {
            V(new Error(`Connection to MCP server "${A}" timed out after ${CC2()}ms`))
          }, CC2());
          G.then(() => clearTimeout(C), () => clearTimeout(C))
        });
    
    await Promise.race([G, Z])
    
    // 获取服务器能力和版本信息
    let D = I.getServerCapabilities(),
        Y = I.getServerVersion();
    
    // 处理IDE特殊连接
    if (B.type === "sse-ide" || B.type === "ws-ide") {
      E1("tengu_mcp_ide_server_connection_succeeded", {
        serverVersion: Y
      });
      try {
        we0(I) // 发送IDE连接通知
      } catch (X) {
        m7(A, `Failed to send ide_connected notification: ${X}`)
      }
    }
    
    // 返回连接对象
    return E1("tengu_mcp_server_connection_succeeded", {}), {
      name: A,
      client: I,
      type: "connected",
      capabilities: D ?? {},
      serverInfo: Y,
      config: B,
      cleanup: F
    }
  } catch (Q) {
    E1("tengu_mcp_server_connection_failed", {});
    return m7(A, `Connection failed: ${Q}`), {
      name: A,
      type: "failed",
      config: B
    }
  }
}, KC2)
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2981-3124

#### 3.1.2 连接超时配置

```javascript
// MCP连接超时设置
function CC2() {
  return parseInt(process.env.MCP_TIMEOUT || "", 10) || 30000
}

// MCP工具调用超时设置
function p65() {
  return parseInt(process.env.MCP_TOOL_TIMEOUT || "", 10) || 1e8
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2967-2969, 2963-2965

### 3.2 生命周期管理

#### 3.2.1 服务器状态管理

MCP服务器具有以下状态：
- `connected`: 成功连接
- `failed`: 连接失败
- `needs-auth`: 需要认证

#### 3.2.2 健康检查和重连机制

```javascript
// 连接状态检查
if (B.type === "sse" && X instanceof Error) {
  if (X.message.includes("401") || X.message.includes("Unauthorized")) {
    return E1("tengu_mcp_server_needs_auth", {}), 
           p2(A, "Authentication required for SSE server"), {
      name: A,
      type: "needs-auth",
      config: B
    }
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：3066-3076

### 3.3 错误处理和日志记录

#### 3.3.1 MCP日志系统

```javascript
// MCP日志记录函数 (m7)
function m7(A, B) {
  if (M6(UA.red(`MCP server "${A}" ${B}`)), m6().cleanupPeriodDays === 0) return;
  try {
    let Q = Mz.mcpLogs(A),
        I = B instanceof Error ? B.stack || B.message : String(B),
        G = new Date().toISOString(),
        Z = uf1(Q, pf1 + ".txt");
    if (!x1().existsSync(Q)) x1().mkdirSync(Q);
    if (!x1().existsSync(Z)) x1().writeFileSync(Z, "[]", {
      encoding: "utf8"
    });
    // ... 日志写入逻辑
  } catch {}
}

// MCP信息日志 (p2)
function p2(A, B) {
  O9(`MCP server "${A}": ${B}`);
  // ... 日志记录逻辑
}
```

**源码证据**：
- 文件：`improved-claude-code-5.mjs`，行号：22318-22341, 22343-22361

## 4. MCP工具集成深度分析

### 4.1 工具注册和发现机制

#### 4.1.1 工具命名规范

所有MCP工具使用标准化命名格式：`mcp__<server_name>__<tool_name>`

```javascript
// 工具名称生成 (improved-claude-code-5.mjs:3148)
name: "mcp__" + j81(A.name) + "__" + G.name,

// 工具名称解析 (ZP1)
function ZP1(A) {
  let B = A.split("__"),
      [Q, I, ...G] = B;
  if (Q !== "mcp" || !I) return null;
  let Z = G.length > 0 ? G.join("__") : void 0;
  return {
    serverName: I,
    toolName: Z
  }
}
```

**源码证据**：
- 文件：`improved-claude-code-5.mjs`，行号：13914-13923
- 文件：`chunks.91.mjs`，行号：3148

#### 4.1.2 工具过滤和权限控制

```javascript
// IDE工具白名单
c65 = ["mcp__ide__executeCode", "mcp__ide__getDiagnostics"]

// 工具过滤函数
function l65(A) {
  return !A.name.startsWith("mcp__ide__") || c65.includes(A.name)
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2971-2975

#### 4.1.3 工具发现和注册

```javascript
// MCP工具获取函数
async function fetchMcpTools(A) {
  if (A.type !== "connected") return [];
  try {
    let B = await A.client.request({
      method: "tools/list"
    }, zt);
    
    return (await wJ("claude_code_unicode_sanitize") ? D$(B.tools) : B.tools)
      .map((G) => ({
        ...TV2,
        name: "mcp__" + j81(A.name) + "__" + G.name,
        isMcp: !0,
        async description() {
          return G.description ?? ""
        },
        async prompt() {
          return G.description ?? ""
        },
        isConcurrencySafe() {
          return G.annotations?.readOnlyHint ?? !1
        },
        // ... 其他工具属性
        userFacingName() {
          return `${A.name}:${G.name} (MCP)`
        }
      })).filter(l65)
  } catch (B) {
    return m7(A.name, `Failed to fetch tools: ${B}`), []
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：3142-3179

### 4.2 工具执行流程

#### 4.2.1 工具调用机制

```javascript
// MCP工具调用函数 (gw)
async function gw({
  client: A,
  serverName: B,
  toolName: Q,
  args: I,
  signal: G,
  isNonInteractiveSession: Z
}) {
  try {
    p2(B, `Calling MCP tool: ${Q}`);
    let D = await A.callTool({
      name: Q,
      arguments: I
    }, Sm, {
      signal: G,
      timeout: p65()
    });
    
    if ("isError" in D && D.isError) {
      let W = "Unknown error";
      if ("content" in D && Array.isArray(D.content) && D.content.length > 0) {
        let J = D.content[0];
        if (J && typeof J === "object" && "text" in J) W = J.text
      } else if ("error" in D) W = String(D.error);
      throw m7(B, W), Error(W)
    }
    
    // 处理工具响应内容
    if (D.content && Array.isArray(D.content)) {
      await Zo1(D.content, Q, Z) // 内容过滤和验证
    }
    
    return D
  } catch (D) {
    throw m7(B, `Error calling tool ${Q}: ${D}`), D
  }
}
```

**源码证述**：
- 文件：`chunks.92.mjs`，行号：9-47

#### 4.2.2 响应内容过滤

```javascript
// MCP工具响应内容大小限制检查
function Go1() {
  return parseInt(process.env.MAX_MCP_OUTPUT_TOKENS ?? "25000", 10)
}

// 内容过大错误类
class he extends Error {
  constructor(A, B) {
    super(`MCP tool "${A}" response (${B} tokens) exceeds maximum allowed tokens (${Go1()}). Please use pagination, filtering, or limit parameters to reduce the response size.`);
    this.name = "MCPContentTooLargeError"
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：1917-1943

## 5. MCP资源管理深度分析

### 5.1 资源访问机制

#### 5.1.1 资源列表工具 (xC1)

```javascript
xC1 = {
  isEnabled() { return !0 },
  isReadOnly() { return !0 },
  name: "listMcpResources",
  async description() { return SV2 },
  async prompt() { return SV2 },
  inputSchema: C45, // { server: n.string().optional() }
  
  async * call(A, { options: { mcpClients: B } }) {
    let Q = [],
        { server: I } = A,
        G = I ? B.filter((Z) => Z.name === I) : B;
    
    if (I && G.length === 0) 
      throw new Error(`Server "${I}" not found. Available servers: ${B.map((Z)=>Z.name).join(", ")}`);
    
    for (let Z of G) {
      if (Z.type !== "connected") continue;
      try {
        let D = await Z.client.listResources();
        if (D.resources) {
          for (let Y of D.resources) {
            Q.push({ ...Y, server: Z.name })
          }
        }
      } catch (D) {
        m7(Z.name, `Failed to list resources: ${D}`)
      }
    }
    
    yield { type: "result", content: JSON.stringify(Q, null, 2) }
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2250-2324

#### 5.1.2 资源读取工具 (fC1)

```javascript
fC1 = {
  name: "readMcpResource",
  inputSchema: K45, // { server: n.string(), uri: n.string() }
  
  async * call(A, { options: { mcpClients: B } }) {
    let { server: Q, uri: I } = A,
        G = B.find((J) => J.name === Q);
    
    if (!G) 
      throw new Error(`Server "${Q}" not found. Available servers: ${B.map((J)=>J.name).join(", ")}`);
    
    if (G.type !== "connected") 
      throw new Error(`Server "${Q}" is not connected`);
    
    let Z = G;
    if (!Z.capabilities?.resources) 
      throw new Error(`Server "${Q}" does not support resources`);
    
    try {
      let D = await Z.client.readResource({ uri: I });
      yield { type: "result", content: JSON.stringify(D, null, 2) }
    } catch (D) {
      throw m7(Q, `Error reading resource ${I}: ${D}`), D
    }
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2377-2464

### 5.2 资源缓存策略

#### 5.2.1 At-mention资源处理

```javascript
// At-mention MCP资源处理 (KW5)
async function KW5(A, B) {
  let Q = EW5(A); // 提取@mention资源引用
  if (Q.length === 0) return [];
  
  let I = B.options.mcpClients || [];
  return (await Promise.all(Q.map(async (Z) => {
    try {
      let [D, ...Y] = Z.split(":"), 
          W = Y.join(":");
      if (!D || !W) return E1("tengu_at_mention_mcp_resource_error", {}), null;
      
      let J = I.find((V) => V.name === D);
      if (!J || J.type !== "connected") 
        return E1("tengu_at_mention_mcp_resource_error", {}), null;
      
      let X = (B.options.mcpResources?.[D] || []).find((V) => V.uri === W);
      if (!X) return E1("tengu_at_mention_mcp_resource_error", {}), null;
      
      try {
        let V = await J.client.readResource({ uri: W });
        return E1("tengu_at_mention_mcp_resource_success", {}), {
          type: "mcp_resource",
          server: D,
          uri: W,
          name: X.name || W,
          description: X.description,
          content: V
        }
      } catch (V) {
        return E1("tengu_at_mention_mcp_resource_error", {}), b1(V), null
      }
    } catch {
      return E1("tengu_at_mention_mcp_resource_error", {}), null
    }
  }))).filter((Z) => Z !== null)
}
```

**源码证据**：
- 文件：`chunks.94.mjs`，行号：2887-2918

#### 5.2.2 资源内容渲染

```javascript
// MCP资源内容渲染处理
case "mcp_resource": {
  let B = A.content;
  if (!B || !B.contents || B.contents.length === 0) 
    return [K2({
      content: `<mcp-resource server="${A.server}" uri="${A.uri}">(No content)</mcp-resource>`,
      isMeta: !0
    })];
  
  let Q = [];
  for (let I of B.contents) {
    if (I && typeof I === "object") {
      if ("text" in I && typeof I.text === "string") {
        Q.push({
          type: "text",
          text: "Full contents of resource:"
        }, {
          type: "text", 
          text: I.text
        }, {
          type: "text",
          text: "Do NOT read this resource again unless you think it may have changed, since you already have the full contents."
        });
      } else if ("blob" in I && typeof I.blob === "string") {
        // 处理二进制内容
      }
    }
  }
  
  if (Q.length > 0) return [K2({ content: Q, isMeta: !0 })];
  else p2(A.server, `No displayable content found in MCP resource ${A.uri}.`);
  
  return [K2({
    content: `<mcp-resource server="${A.server}" uri="${A.uri}">(No displayable content)</mcp-resource>`,
    isMeta: !0
  })]
}
```

**源码证据**：
- 文件：`chunks.93.mjs`，行号：720-755

## 6. MCP通信协议深度分析

### 6.1 JSON-RPC协议实现

#### 6.1.1 协议处理器 (wt)

```javascript
class wt {
  constructor(A) {
    this._options = A;
    this._requestMessageId = 0;
    this._requestHandlers = new Map;
    this._requestHandlerAbortControllers = new Map;
    this._notificationHandlers = new Map;
    this._responseHandlers = new Map;
    this._progressHandlers = new Map;
    this._timeoutInfo = new Map;
    
    // 设置取消请求处理器
    this.setNotificationHandler(aJ1, (B) => {
      let Q = this._requestHandlerAbortControllers.get(B.params.requestId);
      Q === null || Q === void 0 || Q.abort(B.params.reason)
    });
    
    // 设置进度通知处理器
    this.setNotificationHandler(oJ1, (B) => {
      this._onprogress(B)
    });
    
    // 设置ping处理器
    this.setRequestHandler(rJ1, (B) => ({}))
  }
  
  // ... 其他协议处理方法
}
```

**源码证据**：
- 文件：`chunks.90.mjs`，行号：1884-1892

#### 6.1.2 MCP错误处理

```javascript
// MCP错误类定义
class _m extends Error {
  constructor(A, B, Q) {
    super(`MCP error ${A}: ${B}`);
    this.code = A;
    this.data = Q;
    this.name = "McpError"
  }
}
```

**源码证据**：
- 文件：`chunks.90.mjs`，行号：1875-1880

### 6.2 传输层实现

#### 6.2.1 HTTP/SSE客户端 (FF1)

```javascript
// HTTP/SSE客户端会话管理
if (this._sessionId) B["mcp-session-id"] = this._sessionId;

// HTTP请求处理
let J = await fetch(this._url, W),
    F = J.headers.get("mcp-session-id");
if (F) this._sessionId = F;

if (!J.ok) {
  if (J.status === 401 && this._authProvider) {
    if (await VK(this._authProvider, {
      serverUrl: this._url
    }) !== "AUTHORIZED") throw new vJ;
    return this.send(A)
  }
  let K = await J.text().catch(() => null);
  throw new Error(`Error POSTing to endpoint (HTTP ${J.status}): ${K}`)
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：189, 321-332

#### 6.2.2 WebSocket客户端

```javascript
// WebSocket客户端配置
let X = new tB1.default(B.url, ["mcp"], 
  B.authToken ? {
    headers: { "X-Claude-Code-Ide-Authorization": B.authToken }
  } : void 0);
Q = new Do1(X)
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：3014-3019

### 6.3 协议版本兼容性

```javascript
// 协议版本头设置
"MCP-Protocol-Version": (Q = B === null || B === void 0 ? void 0 : B.protocolVersion) !== null && Q !== void 0 ? Q : xj
```

**源码证据**：
- 文件：`chunks.90.mjs`，行号：2930

## 7. MCP安全机制深度分析

### 7.1 OAuth 2.0认证系统

#### 7.1.1 OAuth提供者 (MO)

```javascript
class MO {
  serverName;
  serverConfig;
  redirectUri;
  handleRedirection;
  _codeVerifier;
  _authorizationUrl;
  
  constructor(A, B, Q, I) {
    this.serverName = A;
    this.serverConfig = B;
    this.redirectUri = Q;
    this.handleRedirection = I;
    if (this.handleRedirection) {
      this._codeVerifier = g65(32).toString("base64url");
    }
  }
  
  async clientInformation() {
    let B = VJ().read(),
        Q = qO(this.serverName, this.serverConfig),
        I = B?.mcpOAuth?.[Q];
    if (I?.clientId) {
      p2(this.serverName, "Found client info");
      return {
        client_id: I.clientId,
        client_secret: I.clientSecret
      };
    }
    p2(this.serverName, "No client info found");
    return
  }
  
  async saveClientInformation(A) {
    let B = VJ(),
        Q = B.read() || {},
        I = qO(this.serverName, this.serverConfig),
        G = {
          ...Q,
          mcpOAuth: {
            ...Q.mcpOAuth,
            [I]: {
              ...Q.mcpOAuth?.[I],
              serverName: this.serverName,
              serverUrl: this.serverConfig.url,
              clientId: A.client_id,
              clientSecret: A.client_secret,
              accessToken: Q.mcpOAuth?.[I]?.accessToken || "",
              expiresAt: Q.mcpOAuth?.[I]?.expiresAt || 0
            }
          }
        };
    B.update(G)
  }
  
  async tokens() {
    let B = VJ().read(),
        Q = qO(this.serverName, this.serverConfig),
        I = B?.mcpOAuth?.[Q];
    if (!I) {
      p2(this.serverName, "No token data found");
      return
    }
    
    let G = (I.expiresAt - Date.now()) / 1000;
    if (G <= 0 && !I.refreshToken) {
      p2(this.serverName, "Token expired without refresh token");
      return
    }
    
    let Z = {
      access_token: I.accessToken,
      expires_in: Math.max(0, Math.floor(G)),
      refresh_token: I.refreshToken || void 0
    };
    return Z
  }
  
  async saveTokens(A) {
    let B = VJ(),
        Q = B.read() || {},
        I = qO(this.serverName, this.serverConfig);
    p2(this.serverName, "Saving tokens");
    let G = {
      ...Q,
      mcpOAuth: {
        ...Q.mcpOAuth,
        [I]: {
          ...Q.mcpOAuth?.[I],
          serverName: this.serverName,
          serverUrl: this.serverConfig.url,
          accessToken: A.access_token,
          refreshToken: A.refresh_token,
          expiresAt: Date.now() + (A.expires_in || 3600) * 1000,
          scope: A.scope
        }
      }
    };
    B.update(G)
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2653-2754

#### 7.1.2 OAuth流程管理

```javascript
// OAuth授权流程 (Ko1)
async function Ko1(A, B, Q) {
  VC2(A, B); // 清除现有令牌
  E1("tengu_mcp_oauth_flow_start", { isOAuthFlow: !0 });
  
  let I = await d65(), // 获取回调端口
      G = `http://localhost:${I}/callback`;
  p2(A, `Using redirect port: ${I}`);
  
  let Z = new MO(A, B, G, !0);
  // ... OAuth流程实现
  
  try {
    let J = await Z.completeAuthorizationCodeGrant({
      authorizationCode: W
    });
    if (p2(A, `Auth result: ${J}`), J === "AUTHORIZED") {
      let F = await Z.tokens();
      if (F) {
        p2(A, `Token access_token length: ${F.access_token?.length}`);
        E1("tengu_mcp_oauth_flow_success", {})
      }
    } else throw new Error("Unexpected auth result: " + J)
  } catch (J) {
    E1("tengu_mcp_oauth_flow_error", {});
    throw J
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2570-2650

### 7.2 权限和访问控制

#### 7.2.1 MCP服务器审批机制

```javascript
// MCP服务器审批状态检查 (rC1)  
function rC1(A) {
  let B = m6(); // 获取项目设置
  if (B?.disabledMcpjsonServers?.includes(A)) return "rejected";
  if (B?.enabledMcpjsonServers?.includes(A) || B?.enableAllProjectMcpServers) return "approved";
  return "pending"
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2896-2901

#### 7.2.2 工具权限检查

```javascript
// MCP工具权限检查示例
async checkPermissions() {
  return {
    behavior: "ask",
    message: "MCPTool requires permission."
  }
}
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2157-2161

### 7.3 安全沙箱机制

#### 7.3.1 IDE工具访问限制

```javascript
// IDE工具白名单限制
c65 = ["mcp__ide__executeCode", "mcp__ide__getDiagnostics"]

function l65(A) {
  return !A.name.startsWith("mcp__ide__") || c65.includes(A.name)
}
```

这限制了只有特定的IDE工具可以被访问，增强了安全性。

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2971-2975

## 8. MCP诊断和调试系统

### 8.1 诊断客户端 (PK)

```javascript
class PK {
  static instance;
  baseline = new Map;
  initialized = !1;
  mcpClient;
  lastProcessedTimestamps = new Map;
  lastDiagnosticsByUri = new Map;
  rightFileDiagnosticsState = new Map;
  
  static getInstance() {
    if (!PK.instance) PK.instance = new PK;
    return PK.instance
  }
  
  initialize(A) {
    if (this.initialized) return;
    this.mcpClient = A;
    this.initialized = !0;
    
    if (this.mcpClient && this.mcpClient.type === "connected") {
      let B = n.object({
        method: n.literal("diagnostics_changed"),
        params: n.object({ uri: n.string() })
      });
      
      this.mcpClient.client.setNotificationHandler(B, async (Q) => {
        let { uri: I } = Q.params;
        this.handleDiagnosticChange(I)
      })
    }
  }
  
  async beforeFileEdited(A) {
    if (!this.initialized || !this.mcpClient || this.mcpClient.type !== "connected") return;
    
    let B = Date.now();
    try {
      let Q = await gw("getDiagnostics", {
        uri: `file://${A}`
      }, this.mcpClient, !1),
      I = this.parseDiagnosticResult(Q)[0];
      
      if (I) {
        if (A !== this.normalizeFileUri(I.uri)) {
          b1(new Error(`Diagnostics file path mismatch: expected ${A}, got ${I.uri})`));
          return
        }
        this.baseline.set(A, I.diagnostics);
        this.lastProcessedTimestamps.set(A, B)
      } else {
        this.baseline.set(A, []);
        this.lastProcessedTimestamps.set(A, B)
      }
    } catch (Q) {}
  }
  
  async getNewDiagnostics() {
    if (!this.initialized || !this.mcpClient || this.mcpClient.type !== "connected") return [];
    
    let A = [];
    try {
      let G = await gw("getDiagnostics", {}, this.mcpClient, !1);
      A = this.parseDiagnosticResult(G)
    } catch (G) {
      return []
    }
    
    // 过滤和处理诊断信息
    let B = A.filter((G) => this.baseline.has(this.normalizeFileUri(G.uri)))
             .filter((G) => G.uri.startsWith("file://"));
    
    // ... 诊断处理逻辑
    return newDiagnostics
  }
}
```

**源码证据**：
- 文件：`chunks.92.mjs`，行号：49-141

## 9. 核心配置数据结构

### 9.1 MCP状态管理

```javascript
// 核心MCP状态结构
mcp: {
  clients: [],      // MCP客户端连接池
  tools: [],        // 可用MCP工具列表
  commands: [],     // MCP命令列表
  resources: {}     // MCP资源缓存
}
```

**源码证据**：
- 文件：`improved-claude-code-5.mjs`，行号：25347-25352

### 9.2 项目设置结构

```javascript
// 项目MCP设置默认值
UN = {
  allowedTools: [],
  history: [],
  mcpContextUris: [],           // MCP上下文URI列表
  mcpServers: {},               // MCP服务器配置
  enabledMcpjsonServers: [],    // 启用的项目MCP服务器
  disabledMcpjsonServers: [],   // 禁用的项目MCP服务器
  hasTrustDialogAccepted: !1,
  ignorePatterns: [],
  projectOnboardingSeenCount: 0,
  hasClaudeMdExternalIncludesApproved: !1,
  hasClaudeMdExternalIncludesWarningShown: !1
}
```

**源码证据**：
- 文件：`improved-claude-code-5.mjs`，行号：23426-23438

## 10. 性能优化和限制

### 10.1 内容大小限制

```javascript
// MCP工具输出令牌限制
function Go1() {
  return parseInt(process.env.MAX_MCP_OUTPUT_TOKENS ?? "25000", 10)
}

// 内容过大检查
if (Y45(A) <= Go1() * G45) return; // G45 = 0.5 (阈值系数)
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：1917-1919, 1915

### 10.2 缓存和优化

```javascript
// MCP连接缓存键生成
function KC2(A, B) {
  return `${A}-${JSON.stringify(B)}`
}

// 使用L0缓存包装连接工厂
ue = L0(async (A, B) => {
  // ... 连接逻辑
}, KC2)
```

**源码证据**：
- 文件：`chunks.91.mjs`，行号：2977-2979, 2981

## 11. 环境变量配置

Claude Code支持以下MCP相关环境变量：

| 环境变量 | 默认值 | 描述 |
|---------|--------|------|
| `MCP_TIMEOUT` | 30000ms | MCP服务器连接超时 |
| `MCP_TOOL_TIMEOUT` | 100000ms | MCP工具调用超时 |
| `MAX_MCP_OUTPUT_TOKENS` | 25000 | MCP工具输出最大令牌数 |

## 12. 总结和关键发现

### 12.1 架构设计亮点

1. **分层架构**: MCP系统采用清晰的分层设计，包括配置层、传输层、协议层和应用层
2. **多传输支持**: 支持HTTP、SSE、WebSocket、STDIO等多种传输协议
3. **三级配置**: 支持local、project、user三级配置管理
4. **安全机制**: 完整的OAuth 2.0认证、权限控制和访问限制
5. **诊断支持**: 内置诊断系统支持IDE集成

### 12.2 关键技术特点

1. **工具命名标准化**: 使用`mcp__server__tool`格式统一管理
2. **连接池管理**: 高效的连接复用和生命周期管理
3. **错误恢复**: 完善的错误处理和重连机制
4. **资源缓存**: 智能的资源缓存和更新策略
5. **性能限制**: 合理的性能和安全限制

### 12.3 扩展能力

MCP系统为Claude Code提供了强大的扩展能力：
- 外部工具集成
- 资源访问管理  
- IDE深度集成
- 第三方服务连接
- 自定义协议支持

这个MCP系统是Claude Code架构中最复杂和最重要的组件之一，它使Claude Code具备了强大的可扩展性和集成能力。通过深入理解MCP的实现机制，我们可以更好地利用Claude Code的扩展功能，并开发自定义的MCP服务器来扩展Claude Code的能力。

## 附录：完整混淆函数映射表

| 混淆名称 | 功能描述 | 类型 | 文件位置 |
|---------|----------|--------|----------|
| `DV` | MCP服务器管理器主函数 | 函数 | improved-claude-code-5.mjs:23903 |
| `ue` | MCP客户端连接工厂 | 缓存函数 | chunks.91.mjs:2981 |
| `MO` | OAuth认证提供者类 | 类 | chunks.91.mjs:2653 |
| `wt` | JSON-RPC协议处理器类 | 类 | chunks.90.mjs:1884 |
| `FF1` | HTTP/SSE客户端类 | 类 | chunks.91.mjs:184 |
| `Do1` | WebSocket客户端包装器 | 类 | chunks.91.mjs:3019 |
| `ZP1` | MCP工具名称解析器 | 函数 | improved-claude-code-5.mjs:13914 |
| `j81` | 服务器名称标准化函数 | 函数 | improved-claude-code-5.mjs:13883 |
| `pi`, `y81` | MCP工具过滤函数 | 函数 | improved-claude-code-5.mjs:13887,13892 |
| `ci`, `li` | MCP工具排除过滤函数 | 函数 | improved-claude-code-5.mjs:13897,13902 |
| `k81` | MCP工具名称清理函数 | 函数 | improved-claude-code-5.mjs:13925 |
| `vC` | 项目MCP配置加载器 | 缓存函数 | improved-claude-code-5.mjs:23814 |
| `Ug` | MCP配置schema验证器 | 对象 | improved-claude-code-5.mjs:23422 |
| `Bv1` | MCP服务器配置union类型 | 对象 | improved-claude-code-5.mjs:23420 |
| `wo1` | MCP配置文件解析器 | 函数 | chunks.91.mjs:2928 |
| `oC1` | HTTP头解析器 | 函数 | chunks.91.mjs:2948 |
| `xC1` | 列表MCP资源工具 | 对象 | chunks.91.mjs:2250 |
| `fC1` | 读取MCP资源工具 | 对象 | chunks.91.mjs:2377 |
| `gw` | MCP工具调用函数 | 函数 | chunks.92.mjs:9 |
| `PK` | MCP诊断客户端单例类 | 类 | chunks.92.mjs:49 |
| `m7` | MCP错误日志记录函数 | 函数 | improved-claude-code-5.mjs:22318 |
| `p2` | MCP信息日志记录函数 | 函数 | improved-claude-code-5.mjs:22343 |
| `Ko1` | OAuth授权流程函数 | 函数 | chunks.91.mjs:2570 |
| `iC1` | OAuth令牌撤销函数 | 函数 | chunks.91.mjs:2522 |
| `VC2` | OAuth令牌清理函数 | 函数 | chunks.91.mjs:2562 |
| `qO` | OAuth存储键生成函数 | 函数 | chunks.91.mjs:2518 |
| `LO` | MCP服务器配置保存函数 | 函数 | chunks.91.mjs:2814 |
| `zo1` | MCP服务器配置添加函数 | 函数 | chunks.91.mjs:2838 |
| `aC1` | MCP服务器配置移除函数 | 函数 | chunks.91.mjs:2851 |
| `sC1` | MCP服务器配置查找函数 | 函数 | chunks.91.mjs:2877 |
| `rC1` | MCP服务器审批状态检查函数 | 函数 | chunks.91.mjs:2896 |
| `nC1` | MCP配置作用域描述函数 | 函数 | chunks.91.mjs:2789 |
| `CC2` | MCP连接超时配置函数 | 函数 | chunks.91.mjs:2967 |
| `p65` | MCP工具超时配置函数 | 函数 | chunks.91.mjs:2963 |
| `Go1` | MCP输出令牌限制函数 | 函数 | chunks.91.mjs:1917 |
| `l65` | MCP工具白名单过滤函数 | 函数 | chunks.91.mjs:2973 |
| `KC2` | MCP连接缓存键生成函数 | 函数 | chunks.91.mjs:2977 |
| `KW5` | At-mention MCP资源处理函数 | 函数 | chunks.94.mjs:2887 |
| `_m` | MCP错误类 | 类 | chunks.90.mjs:1875 |
| `he` | MCP内容过大错误类 | 类 | chunks.91.mjs:1939 |
| `Mz.mcpLogs` | MCP日志路径生成函数 | 函数 | improved-claude-code-5.mjs:14656 |
| `c65` | IDE MCP工具白名单常量 | 常量 | chunks.91.mjs:2971 |
| `UN.mcpServers` | 项目MCP服务器配置默认值 | 对象属性 | improved-claude-code-5.mjs:23430 |
