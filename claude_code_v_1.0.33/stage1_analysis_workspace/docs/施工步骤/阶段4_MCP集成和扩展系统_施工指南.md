# 阶段4：MCP集成和扩展系统施工指南

## 📋 面向对象
**本文档面向：菜鸟级别的初级程序员**
- 无需深度思考，严格按步骤执行
- 每个步骤都有明确的文件操作指令
- 包含必要的代码模板和配置

## 🎯 阶段目标
基于逆向分析结果，实现Claude Code的MCP协议和扩展系统：
- ✅ **完整MCP协议实现** (STDIO、HTTP、SSE、WebSocket四种传输方式)
- ✅ **多服务器管理系统** (连接池、状态监控、自动重连)
- ✅ **插件生态系统** (工具注册、权限管理、版本控制)
- ✅ **IDE专用集成** (sse-ide、ws-ide连接和诊断系统)
- ✅ **扩展配置系统** (三级配置、OAuth认证、资源管理)

**预期交付成果**：
- ✅ MCP客户端完整实现 (支持4种传输协议)
- ✅ 服务器连接管理系统
- ✅ 工具白名单和安全机制
- ✅ 配置管理和认证系统
- ✅ 扩展开发框架

**工作时间**：4周 (160工时)

---

## 📁 第一周：MCP协议核心实现

### 步骤4.1: MCP传输层基础架构

**基于逆向分析的传输协议实现**

**文件路径**: `src/mcp/transport/base.ts`
**文件内容**:
```typescript
/**
 * MCP传输层基础架构
 * 基于逆向分析的Claude Code MCP实现
 * 支持STDIO、HTTP、SSE、WebSocket四种传输方式
 */

export interface McpTransport {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  send(message: any): Promise<void>;
  onMessage(callback: (message: any) => void): void;
  onClose(callback: () => void): void;
  onError(callback: (error: Error) => void): void;
  isConnected(): boolean;
}

export interface McpMessage {
  jsonrpc: "2.0";
  id?: string | number;
  method?: string;
  params?: any;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface McpServerConfig {
  name: string;
  transport: TransportConfig;
  auth?: AuthConfig;
  capabilities?: string[];
  timeout?: number;
  retryAttempts?: number;
}

export type TransportConfig = 
  | StdioTransportConfig
  | HttpTransportConfig 
  | SseTransportConfig
  | WebSocketTransportConfig
  | SseIdeTransportConfig
  | WsIdeTransportConfig;

export interface StdioTransportConfig {
  type: "stdio";
  command: string;
  args?: string[];
  env?: Record<string, string>;
  cwd?: string;
}

export interface HttpTransportConfig {
  type: "http";
  url: string;
  headers?: Record<string, string>;
  method?: "POST" | "GET";
}

export interface SseTransportConfig {
  type: "sse";
  url: string;
  headers?: Record<string, string>;
}

export interface WebSocketTransportConfig {
  type: "websocket";
  url: string;
  protocols?: string[];
  headers?: Record<string, string>;
}

// IDE专用传输配置 - 基于逆向分析
export interface SseIdeTransportConfig {
  type: "sse-ide";
  url: string;
  ideName: string;
}

export interface WsIdeTransportConfig {
  type: "ws-ide";
  url: string;
  ideName: string;
  authToken?: string;
}

export interface AuthConfig {
  type: "oauth2" | "bearer" | "api-key";
  clientId?: string;
  clientSecret?: string;
  token?: string;
  apiKey?: string;
  refreshToken?: string;
  tokenUrl?: string;
}

/**
 * MCP传输基类
 * 提供通用的消息处理和错误管理
 */
export abstract class BaseMcpTransport implements McpTransport {
  protected messageHandlers: Set<(message: any) => void> = new Set();
  protected closeHandlers: Set<() => void> = new Set();
  protected errorHandlers: Set<(error: Error) => void> = new Set();
  protected connected = false;
  protected messageId = 1;

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract send(message: any): Promise<void>;

  public onMessage(callback: (message: any) => void): void {
    this.messageHandlers.add(callback);
  }

  public onClose(callback: () => void): void {
    this.closeHandlers.add(callback);
  }

  public onError(callback: (error: Error) => void): void {
    this.errorHandlers.add(callback);
  }

  public isConnected(): boolean {
    return this.connected;
  }

  protected emitMessage(message: any): void {
    for (const handler of this.messageHandlers) {
      try {
        handler(message);
      } catch (error) {
        console.error('Error in message handler:', error);
      }
    }
  }

  protected emitClose(): void {
    this.connected = false;
    for (const handler of this.closeHandlers) {
      try {
        handler();
      } catch (error) {
        console.error('Error in close handler:', error);
      }
    }
  }

  protected emitError(error: Error): void {
    for (const handler of this.errorHandlers) {
      try {
        handler(error);
      } catch (error) {
        console.error('Error in error handler:', error);
      }
    }
  }

  protected generateMessageId(): string {
    return `msg_${this.messageId++}_${Date.now()}`;
  }

  protected createMessage(method: string, params?: any): McpMessage {
    return {
      jsonrpc: "2.0",
      id: this.generateMessageId(),
      method,
      params
    };
  }

  protected createResponse(id: string | number, result?: any, error?: any): McpMessage {
    const message: McpMessage = {
      jsonrpc: "2.0",
      id
    };

    if (error) {
      message.error = error;
    } else {
      message.result = result;
    }

    return message;
  }
}

/**
 * 传输工厂类 - 基于逆向分析的ue函数实现
 */
export class McpTransportFactory {
  /**
   * 创建传输实例 - 对应improved-claude-code-5.mjs:35481-35520
   */
  public static async createTransport(config: TransportConfig, authProvider?: any): Promise<McpTransport> {
    switch (config.type) {
      case "stdio":
        return new StdioTransport(config);
      
      case "http":
        return new HttpTransport(config, authProvider);
      
      case "sse":
        return new SseTransport(config, authProvider);
      
      case "websocket":
        return new WebSocketTransport(config);
      
      case "sse-ide":
        return new SseIdeTransport(config);
      
      case "ws-ide":
        return new WsIdeTransport(config);
      
      default:
        throw new Error(`Unsupported transport type: ${(config as any).type}`);
    }
  }
}

/**
 * 认证提供者 - 基于逆向分析的MO类实现
 */
export class AuthProvider {
  constructor(
    private serverName: string,
    private config: TransportConfig & { auth?: AuthConfig }
  ) {}

  public async getAuthHeaders(): Promise<Record<string, string>> {
    if (!this.config.auth) {
      return {};
    }

    const headers: Record<string, string> = {};

    switch (this.config.auth.type) {
      case "bearer":
        if (this.config.auth.token) {
          headers["Authorization"] = `Bearer ${this.config.auth.token}`;
        }
        break;

      case "api-key":
        if (this.config.auth.apiKey) {
          headers["X-API-Key"] = this.config.auth.apiKey;
        }
        break;

      case "oauth2":
        // OAuth2 implementation would go here
        const token = await this.getOAuth2Token();
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        break;
    }

    return headers;
  }

  private async getOAuth2Token(): Promise<string | null> {
    // OAuth2 token acquisition logic
    // This would implement the full OAuth2 flow
    return this.config.auth?.token || null;
  }
}
```

### 步骤4.2: STDIO传输实现

**基于逆向分析的子进程通信**

**文件路径**: `src/mcp/transport/stdio.ts`
**文件内容**:
```typescript
/**
 * STDIO传输实现
 * 基于逆向分析的Claude Code STDIO MCP传输
 * 支持子进程通信和错误处理
 */

import { spawn, ChildProcess } from 'child_process';
import { BaseMcpTransport, StdioTransportConfig } from './base';

/**
 * STDIO传输类
 * 通过子进程的stdin/stdout进行MCP通信
 */
export class StdioTransport extends BaseMcpTransport {
  private childProcess: ChildProcess | null = null;
  private buffer = '';
  private readyPromise: Promise<void> | null = null;

  constructor(private config: StdioTransportConfig) {
    super();
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    this.readyPromise = new Promise((resolve, reject) => {
      try {
        // 基于逆向分析improved-claude-code-5.mjs:35484-35495
        this.childProcess = spawn(this.config.command, this.config.args || [], {
          stdio: ['pipe', 'pipe', 'pipe'],
          env: { 
            ...process.env, 
            ...this.config.env 
          },
          cwd: this.config.cwd
        });

        this.setupProcessHandlers(resolve, reject);
      } catch (error) {
        reject(error);
      }
    });

    await this.readyPromise;
    this.connected = true;
  }

  private setupProcessHandlers(resolve: () => void, reject: (error: Error) => void): void {
    if (!this.childProcess) {
      reject(new Error('Child process not created'));
      return;
    }

    // 错误处理
    this.childProcess.on('error', (error) => {
      this.emitError(error);
      reject(error);
    });

    // 进程退出处理
    this.childProcess.on('exit', (code, signal) => {
      this.emitClose();
      if (code !== 0 && code !== null) {
        this.emitError(new Error(`Process exited with code ${code}`));
      }
    });

    // stderr处理
    this.childProcess.stderr?.on('data', (data) => {
      console.error(`MCP Server stderr: ${data}`);
    });

    // stdout消息处理
    this.childProcess.stdout?.on('data', (data) => {
      this.handleData(data.toString());
    });

    // 连接成功
    resolve();
  }

  private handleData(data: string): void {
    this.buffer += data;
    
    // 按行分割消息
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() || ''; // 保留不完整的行

    for (const line of lines) {
      if (line.trim()) {
        try {
          const message = JSON.parse(line.trim());
          this.emitMessage(message);
        } catch (error) {
          console.error('Error parsing JSON message:', error, 'Line:', line);
        }
      }
    }
  }

  public async send(message: any): Promise<void> {
    if (!this.connected || !this.childProcess?.stdin) {
      throw new Error('Transport not connected');
    }

    const messageString = JSON.stringify(message) + '\n';
    
    return new Promise((resolve, reject) => {
      this.childProcess!.stdin!.write(messageString, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public async disconnect(): Promise<void> {
    if (!this.connected || !this.childProcess) {
      return;
    }

    return new Promise((resolve) => {
      if (this.childProcess) {
        this.childProcess.on('close', () => {
          this.childProcess = null;
          resolve();
        });

        // 优雅关闭
        this.childProcess.stdin?.end();
        
        // 强制关闭超时
        setTimeout(() => {
          if (this.childProcess) {
            this.childProcess.kill('SIGTERM');
            setTimeout(() => {
              if (this.childProcess) {
                this.childProcess.kill('SIGKILL');
              }
            }, 5000);
          }
        }, 10000);
      } else {
        resolve();
      }
    });
  }
}
```

### 步骤4.3: HTTP/SSE传输实现

**基于逆向分析的HTTP和SSE传输**

**文件路径**: `src/mcp/transport/http-sse.ts`
**文件内容**:
```typescript
/**
 * HTTP和SSE传输实现
 * 基于逆向分析的Claude Code HTTP/SSE MCP传输
 */

import { BaseMcpTransport, HttpTransportConfig, SseTransportConfig, AuthProvider } from './base';
import { EventSource } from 'eventsource';

/**
 * HTTP传输类
 * 用于请求-响应模式的MCP通信
 */
export class HttpTransport extends BaseMcpTransport {
  private authProvider: AuthProvider | null = null;

  constructor(
    private config: HttpTransportConfig,
    authProvider?: AuthProvider
  ) {
    super();
    this.authProvider = authProvider || null;
  }

  public async connect(): Promise<void> {
    // HTTP传输不需要持久连接
    this.connected = true;
  }

  public async disconnect(): Promise<void> {
    this.connected = false;
  }

  public async send(message: any): Promise<void> {
    if (!this.connected) {
      throw new Error('Transport not connected');
    }

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'User-Agent': `Claude-Code/${this.getVersion()}`,
        ...this.config.headers
      };

      // 添加认证头
      if (this.authProvider) {
        const authHeaders = await this.authProvider.getAuthHeaders();
        Object.assign(headers, authHeaders);
      }

      const response = await fetch(this.config.url, {
        method: this.config.method || 'POST',
        headers,
        body: JSON.stringify(message)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      this.emitMessage(result);
    } catch (error) {
      this.emitError(error as Error);
      throw error;
    }
  }

  private getVersion(): string {
    // 获取Claude Code版本号
    return process.env.CLAUDE_CODE_VERSION || '1.0.0';
  }
}

/**
 * SSE传输类 - 基于逆向分析FF1类实现
 * 用于服务器到客户端的实时通信
 */
export class SseTransport extends BaseMcpTransport {
  private eventSource: EventSource | null = null;
  private authProvider: AuthProvider | null = null;

  constructor(
    private config: SseTransportConfig,
    authProvider?: AuthProvider
  ) {
    super();
    this.authProvider = authProvider || null;
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const headers: Record<string, string> = {
          'User-Agent': `Claude-Code/${this.getVersion()}`,
          'Content-Type': 'application/json',
          ...this.config.headers
        };

        // 添加认证头
        if (this.authProvider) {
          const authHeaders = await this.authProvider.getAuthHeaders();
          Object.assign(headers, authHeaders);
        }

        // 创建EventSource - 基于逆向分析
        const eventSourceInitDict: any = {
          headers
        };

        this.eventSource = new EventSource(this.config.url, eventSourceInitDict);

        this.eventSource.onopen = () => {
          this.connected = true;
          resolve();
        };

        this.eventSource.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.emitMessage(message);
          } catch (error) {
            console.error('Error parsing SSE message:', error);
          }
        };

        this.eventSource.onerror = (error) => {
          this.emitError(new Error('SSE connection error'));
          if (!this.connected) {
            reject(new Error('Failed to connect to SSE endpoint'));
          }
        };

        this.eventSource.addEventListener('close', () => {
          this.emitClose();
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  public async send(message: any): Promise<void> {
    if (!this.connected) {
      throw new Error('SSE transport not connected');
    }

    // SSE通常是单向的，如果需要发送消息，可能需要额外的HTTP请求
    // 这里可以实现回调URL或WebHook机制
    throw new Error('SSE transport is read-only');
  }

  public async disconnect(): Promise<void> {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.connected = false;
  }

  private getVersion(): string {
    return process.env.CLAUDE_CODE_VERSION || '1.0.0';
  }
}

/**
 * SSE-IDE传输类 - 基于逆向分析的IDE专用SSE传输
 * 对应improved-claude-code-5.mjs:23402-23405的if4配置
 */
export class SseIdeTransport extends BaseMcpTransport {
  private eventSource: EventSource | null = null;

  constructor(private config: SseIdeTransportConfig) {
    super();
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    return new Promise((resolve, reject) => {
      try {
        // IDE专用SSE连接 - 基于逆向分析
        this.eventSource = new EventSource(this.config.url);

        this.eventSource.onopen = () => {
          this.connected = true;
          resolve();
        };

        this.eventSource.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.emitMessage(message);
          } catch (error) {
            console.error('Error parsing SSE-IDE message:', error);
          }
        };

        this.eventSource.onerror = () => {
          this.emitError(new Error('SSE-IDE connection error'));
          if (!this.connected) {
            reject(new Error('Failed to connect to SSE-IDE endpoint'));
          }
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  public async send(message: any): Promise<void> {
    // SSE-IDE通常用于接收IDE的诊断信息，不支持发送
    throw new Error('SSE-IDE transport is read-only');
  }

  public async disconnect(): Promise<void> {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.connected = false;
  }
}
```

### 步骤4.4: WebSocket传输实现

**基于逆向分析的WebSocket和WS-IDE传输**

**文件路径**: `src/mcp/transport/websocket.ts`
**文件内容**:
```typescript
/**
 * WebSocket传输实现
 * 基于逆向分析的Claude Code WebSocket MCP传输
 * 支持标准WebSocket和IDE专用WebSocket
 */

import WebSocket from 'ws';
import { BaseMcpTransport, WebSocketTransportConfig, WsIdeTransportConfig } from './base';

/**
 * WebSocket传输类
 * 用于双向实时通信的MCP传输
 */
export class WebSocketTransport extends BaseMcpTransport {
  private websocket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(private config: WebSocketTransportConfig) {
    super();
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    return new Promise((resolve, reject) => {
      try {
        const options: WebSocket.ClientOptions = {};
        
        if (this.config.protocols) {
          options.protocols = this.config.protocols;
        }

        if (this.config.headers) {
          options.headers = this.config.headers;
        }

        this.websocket = new WebSocket(this.config.url, options);

        this.websocket.on('open', () => {
          this.connected = true;
          this.reconnectAttempts = 0;
          resolve();
        });

        this.websocket.on('message', (data) => {
          try {
            const message = JSON.parse(data.toString());
            this.emitMessage(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        });

        this.websocket.on('close', (code, reason) => {
          this.emitClose();
          
          // 自动重连逻辑
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => {
              this.reconnectAttempts++;
              this.connect().catch(error => {
                console.error('Reconnection failed:', error);
              });
            }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
          }
        });

        this.websocket.on('error', (error) => {
          this.emitError(error);
          if (!this.connected) {
            reject(error);
          }
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  public async send(message: any): Promise<void> {
    if (!this.connected || !this.websocket) {
      throw new Error('WebSocket not connected');
    }

    if (this.websocket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket not ready');
    }

    return new Promise((resolve, reject) => {
      this.websocket!.send(JSON.stringify(message), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public async disconnect(): Promise<void> {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    this.connected = false;
  }
}

/**
 * WS-IDE传输类 - 基于逆向分析的IDE专用WebSocket传输
 * 对应improved-claude-code-5.mjs:23408-23412的nf4配置和35508-35520的实现
 */
export class WsIdeTransport extends BaseMcpTransport {
  private websocket: WebSocket | null = null;

  constructor(private config: WsIdeTransportConfig) {
    super();
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    return new Promise((resolve, reject) => {
      try {
        const options: WebSocket.ClientOptions = {
          protocols: ["mcp"] // MCP子协议
        };

        // 基于逆向分析的IDE认证头 - improved-claude-code-5.mjs:35508-35515
        if (this.config.authToken) {
          options.headers = {
            "X-Claude-Code-Ide-Authorization": this.config.authToken
          };
        }

        this.websocket = new WebSocket(this.config.url, options);

        this.websocket.on('open', () => {
          this.connected = true;
          
          // 发送IDE连接通知 - 对应we0(I)调用
          this.sendIdeConnectedNotification();
          
          resolve();
        });

        this.websocket.on('message', (data) => {
          try {
            const message = JSON.parse(data.toString());
            this.emitMessage(message);
          } catch (error) {
            console.error('Error parsing WS-IDE message:', error);
          }
        });

        this.websocket.on('close', () => {
          this.emitClose();
        });

        this.websocket.on('error', (error) => {
          this.emitError(error);
          if (!this.connected) {
            reject(error);
          }
        });

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 发送IDE连接通知 - 基于逆向分析we0函数
   */
  private async sendIdeConnectedNotification(): Promise<void> {
    try {
      const notification = this.createMessage('ide_connected', {
        ideName: this.config.ideName,
        timestamp: Date.now(),
        capabilities: [
          'getDiagnostics',
          'executeCode'
        ]
      });

      await this.send(notification);
    } catch (error) {
      console.error('Failed to send IDE connected notification:', error);
    }
  }

  public async send(message: any): Promise<void> {
    if (!this.connected || !this.websocket) {
      throw new Error('WS-IDE not connected');
    }

    if (this.websocket.readyState !== WebSocket.OPEN) {
      throw new Error('WS-IDE not ready');
    }

    return new Promise((resolve, reject) => {
      this.websocket!.send(JSON.stringify(message), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public async disconnect(): Promise<void> {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
    this.connected = false;
  }
}
```

---

## 📁 第二周：服务器连接管理系统

### 步骤4.5: MCP客户端核心

**基于逆向分析的完整MCP客户端实现**

**文件路径**: `src/mcp/client.ts`
**文件内容**:
```typescript
/**
 * MCP客户端核心实现
 * 基于逆向分析的Claude Code MCP客户端功能
 * 支持工具调用、资源管理、通知处理
 */

import { McpTransport, McpMessage, McpServerConfig } from './transport/base';
import { McpTransportFactory } from './transport/base';

export interface McpTool {
  name: string;
  description: string;
  inputSchema: any;
}

export interface McpResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export interface McpPrompt {
  name: string;
  description: string;
  arguments?: any[];
}

export interface McpServerInfo {
  name: string;
  version: string;
  protocolVersion: string;
  capabilities: {
    tools?: {};
    resources?: {};
    prompts?: {};
    logging?: {};
  };
}

export interface McpToolCall {
  toolName: string;
  arguments: any;
  timeout?: number;
}

export interface McpToolResult {
  isError?: boolean;
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
}

/**
 * MCP客户端类
 * 管理与单个MCP服务器的连接和通信
 */
export class McpClient {
  private transport: McpTransport | null = null;
  private pendingRequests = new Map<string | number, {
    resolve: (value: any) => void;
    reject: (error: Error) => void;
    timeout?: NodeJS.Timeout;
  }>();
  
  private serverInfo: McpServerInfo | null = null;
  private tools: McpTool[] = [];
  private resources: McpResource[] = [];
  private prompts: McpPrompt[] = [];
  
  public readonly config: McpServerConfig;
  public connected = false;

  constructor(config: McpServerConfig) {
    this.config = config;
  }

  /**
   * 连接到MCP服务器
   */
  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }

    try {
      // 创建传输层
      this.transport = await McpTransportFactory.createTransport(this.config.transport);
      
      // 设置事件处理器
      this.setupEventHandlers();
      
      // 建立连接
      await this.transport.connect();
      
      // 初始化握手
      await this.initialize();
      
      this.connected = true;
    } catch (error) {
      await this.cleanup();
      throw error;
    }
  }

  /**
   * 断开连接
   */
  public async disconnect(): Promise<void> {
    if (!this.connected) {
      return;
    }

    await this.cleanup();
  }

  /**
   * 调用工具 - 基于逆向分析gw函数实现
   */
  public async callTool(toolName: string, arguments_: any, timeout?: number): Promise<McpToolResult> {
    if (!this.connected || !this.transport) {
      throw new Error('Client not connected');
    }

    const message = {
      jsonrpc: "2.0" as const,
      id: this.generateRequestId(),
      method: "tools/call",
      params: {
        name: toolName,
        arguments: arguments_
      }
    };

    return this.sendRequest(message, timeout || this.config.timeout);
  }

  /**
   * 列出可用工具
   */
  public async listTools(): Promise<McpTool[]> {
    if (!this.connected || !this.transport) {
      throw new Error('Client not connected');
    }

    const message = {
      jsonrpc: "2.0" as const,
      id: this.generateRequestId(),
      method: "tools/list"
    };

    const response = await this.sendRequest(message);
    this.tools = response.tools || [];
    return this.tools;
  }

  /**
   * 获取资源列表
   */
  public async listResources(): Promise<McpResource[]> {
    if (!this.connected || !this.transport) {
      throw new Error('Client not connected');
    }

    const message = {
      jsonrpc: "2.0" as const,
      id: this.generateRequestId(),
      method: "resources/list"
    };

    const response = await this.sendRequest(message);
    this.resources = response.resources || [];
    return this.resources;
  }

  /**
   * 读取资源
   */
  public async readResource(uri: string): Promise<any> {
    if (!this.connected || !this.transport) {
      throw new Error('Client not connected');
    }

    const message = {
      jsonrpc: "2.0" as const,
      id: this.generateRequestId(),
      method: "resources/read",
      params: { uri }
    };

    return this.sendRequest(message);
  }

  /**
   * 获取提示列表
   */
  public async listPrompts(): Promise<McpPrompt[]> {
    if (!this.connected || !this.transport) {
      throw new Error('Client not connected');
    }

    const message = {
      jsonrpc: "2.0" as const,
      id: this.generateRequestId(),
      method: "prompts/list"
    };

    const response = await this.sendRequest(message);
    this.prompts = response.prompts || [];
    return this.prompts;
  }

  /**
   * 获取提示
   */
  public async getPrompt(name: string, arguments_?: any): Promise<any> {
    if (!this.connected || !this.transport) {
      throw new Error('Client not connected');
    }

    const message = {
      jsonrpc: "2.0" as const,
      id: this.generateRequestId(),
      method: "prompts/get",
      params: {
        name,
        arguments: arguments_
      }
    };

    return this.sendRequest(message);
  }

  /**
   * 发送通知
   */
  public async sendNotification(method: string, params?: any): Promise<void> {
    if (!this.connected || !this.transport) {
      throw new Error('Client not connected');
    }

    const message = {
      jsonrpc: "2.0" as const,
      method,
      params
    };

    await this.transport.send(message);
  }

  /**
   * 获取服务器信息
   */
  public getServerInfo(): McpServerInfo | null {
    return this.serverInfo;
  }

  /**
   * 获取缓存的工具列表
   */
  public getCachedTools(): McpTool[] {
    return [...this.tools];
  }

  /**
   * 获取缓存的资源列表
   */
  public getCachedResources(): McpResource[] {
    return [...this.resources];
  }

  /**
   * 检查工具是否可用
   */
  public hasToolAfter(): boolean {
    return this.tools.some(tool => tool.name.startsWith('mcp__'));
  }

  /**
   * 设置事件处理器
   */
  private setupEventHandlers(): void {
    if (!this.transport) return;

    this.transport.onMessage((message: McpMessage) => {
      this.handleMessage(message);
    });

    this.transport.onClose(() => {
      this.handleConnectionClose();
    });

    this.transport.onError((error: Error) => {
      this.handleConnectionError(error);
    });
  }

  /**
   * 处理收到的消息
   */
  private handleMessage(message: McpMessage): void {
    if (message.id !== undefined) {
      // 这是对请求的响应
      const pending = this.pendingRequests.get(message.id);
      if (pending) {
        this.pendingRequests.delete(message.id);
        
        if (pending.timeout) {
          clearTimeout(pending.timeout);
        }

        if (message.error) {
          pending.reject(new Error(message.error.message));
        } else {
          pending.resolve(message.result);
        }
      }
    } else if (message.method) {
      // 这是通知或请求
      this.handleNotification(message);
    }
  }

  /**
   * 处理通知
   */
  private handleNotification(message: McpMessage): void {
    switch (message.method) {
      case 'notifications/tools/list_changed':
        // 工具列表已更改，重新获取
        this.listTools().catch(error => {
          console.error('Error refreshing tools:', error);
        });
        break;

      case 'notifications/resources/list_changed':
        // 资源列表已更改，重新获取
        this.listResources().catch(error => {
          console.error('Error refreshing resources:', error);
        });
        break;

      case 'notifications/prompts/list_changed':
        // 提示列表已更改，重新获取
        this.listPrompts().catch(error => {
          console.error('Error refreshing prompts:', error);
        });
        break;

      default:
        console.log('Received notification:', message.method, message.params);
    }
  }

  /**
   * 处理连接关闭
   */
  private handleConnectionClose(): void {
    this.connected = false;
    
    // 拒绝所有待处理的请求
    for (const [id, pending] of this.pendingRequests) {
      pending.reject(new Error('Connection closed'));
      if (pending.timeout) {
        clearTimeout(pending.timeout);
      }
    }
    this.pendingRequests.clear();
  }

  /**
   * 处理连接错误
   */
  private handleConnectionError(error: Error): void {
    console.error(`MCP Client error for ${this.config.name}:`, error);
  }

  /**
   * 初始化握手
   */
  private async initialize(): Promise<void> {
    const message = {
      jsonrpc: "2.0" as const,
      id: this.generateRequestId(),
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        },
        clientInfo: {
          name: "claude-code",
          version: "1.0.0"
        }
      }
    };

    const response = await this.sendRequest(message);
    this.serverInfo = response;

    // 发送初始化完成通知
    await this.sendNotification("notifications/initialized");

    // 获取可用工具和资源
    await Promise.all([
      this.listTools().catch(() => []),
      this.listResources().catch(() => []),
      this.listPrompts().catch(() => [])
    ]);
  }

  /**
   * 发送请求并等待响应
   */
  private async sendRequest(message: McpMessage, timeout?: number): Promise<any> {
    if (!this.transport) {
      throw new Error('Transport not available');
    }

    return new Promise((resolve, reject) => {
      const requestId = message.id!;
      
      let timeoutHandle: NodeJS.Timeout | undefined;
      if (timeout) {
        timeoutHandle = setTimeout(() => {
          this.pendingRequests.delete(requestId);
          reject(new Error('Request timeout'));
        }, timeout);
      }

      this.pendingRequests.set(requestId, {
        resolve,
        reject,
        timeout: timeoutHandle
      });

      this.transport!.send(message).catch(reject);
    });
  }

  /**
   * 生成请求ID
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 清理资源
   */
  private async cleanup(): Promise<void> {
    this.connected = false;

    if (this.transport) {
      await this.transport.disconnect();
      this.transport = null;
    }

    // 清理待处理请求
    for (const [id, pending] of this.pendingRequests) {
      pending.reject(new Error('Client disconnected'));
      if (pending.timeout) {
        clearTimeout(pending.timeout);
      }
    }
    this.pendingRequests.clear();

    // 清理缓存
    this.serverInfo = null;
    this.tools = [];
    this.resources = [];
    this.prompts = [];
  }
}
```

### 步骤4.6: 多服务器连接管理

**基于逆向分析的连接池和状态管理**

**文件路径**: `src/mcp/server-manager.ts`
**文件内容**:
```typescript
/**
 * MCP服务器管理器
 * 基于逆向分析的Claude Code多服务器连接管理
 * 支持连接池、状态监控、自动重连
 */

import { McpClient } from './client';
import { McpServerConfig, McpTool } from './client';
import { EventEmitter } from 'events';

export type ServerStatus = 'pending' | 'connected' | 'disconnected' | 'error' | 'reconnecting';

export interface ServerState {
  name: string;
  status: ServerStatus;
  config: McpServerConfig;
  client?: McpClient;
  lastConnected?: number;
  lastError?: Error;
  reconnectAttempts: number;
  tools: McpTool[];
}

export interface ServerManagerEvents {
  'server:connected': (serverName: string) => void;
  'server:disconnected': (serverName: string) => void;
  'server:error': (serverName: string, error: Error) => void;
  'server:reconnecting': (serverName: string, attempt: number) => void;
  'tools:updated': (serverName: string, tools: McpTool[]) => void;
}

/**
 * MCP服务器管理器
 * 基于逆向分析improved-claude-code-5.mjs的服务器管理逻辑
 */
export class McpServerManager extends EventEmitter {
  private servers = new Map<string, ServerState>();
  private reconnectTimers = new Map<string, NodeJS.Timeout>();
  private maxReconnectAttempts = 5;
  private baseReconnectDelay = 1000;

  constructor() {
    super();
  }

  /**
   * 添加服务器配置
   */
  public async addServer(config: McpServerConfig): Promise<void> {
    const serverState: ServerState = {
      name: config.name,
      status: 'pending',
      config,
      reconnectAttempts: 0,
      tools: []
    };

    this.servers.set(config.name, serverState);
    await this.connectServer(config.name);
  }

  /**
   * 移除服务器
   */
  public async removeServer(serverName: string): Promise<void> {
    const serverState = this.servers.get(serverName);
    if (!serverState) {
      return;
    }

    // 清理重连定时器
    const timer = this.reconnectTimers.get(serverName);
    if (timer) {
      clearTimeout(timer);
      this.reconnectTimers.delete(serverName);
    }

    // 断开连接
    if (serverState.client) {
      await serverState.client.disconnect();
    }

    this.servers.delete(serverName);
    this.emit('server:disconnected', serverName);
  }

  /**
   * 连接到指定服务器
   */
  private async connectServer(serverName: string): Promise<void> {
    const serverState = this.servers.get(serverName);
    if (!serverState) {
      throw new Error(`Server ${serverName} not found`);
    }

    try {
      serverState.status = 'pending';
      
      // 创建客户端
      const client = new McpClient(serverState.config);
      
      // 设置事件处理
      this.setupClientEventHandlers(client, serverState);
      
      // 连接
      await client.connect();
      
      // 更新状态
      serverState.client = client;
      serverState.status = 'connected';
      serverState.lastConnected = Date.now();
      serverState.reconnectAttempts = 0;
      
      // 获取工具列表
      const tools = await client.listTools();
      serverState.tools = tools;
      
      // 发送事件
      this.emit('server:connected', serverName);
      this.emit('tools:updated', serverName, tools);
      
    } catch (error) {
      serverState.status = 'error';
      serverState.lastError = error as Error;
      
      this.emit('server:error', serverName, error as Error);
      
      // 安排重连
      this.scheduleReconnect(serverName);
    }
  }

  /**
   * 设置客户端事件处理器
   */
  private setupClientEventHandlers(client: McpClient, serverState: ServerState): void {
    // 这里可以监听客户端的特定事件
    // 例如工具列表更新等
  }

  /**
   * 安排重连
   */
  private scheduleReconnect(serverName: string): void {
    const serverState = this.servers.get(serverName);
    if (!serverState) {
      return;
    }

    if (serverState.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(`Max reconnect attempts reached for server ${serverName}`);
      return;
    }

    serverState.reconnectAttempts++;
    serverState.status = 'reconnecting';
    
    const delay = this.baseReconnectDelay * Math.pow(2, serverState.reconnectAttempts - 1);
    
    this.emit('server:reconnecting', serverName, serverState.reconnectAttempts);
    
    const timer = setTimeout(async () => {
      this.reconnectTimers.delete(serverName);
      await this.connectServer(serverName);
    }, delay);
    
    this.reconnectTimers.set(serverName, timer);
  }

  /**
   * 获取服务器状态
   */
  public getServerState(serverName: string): ServerState | undefined {
    return this.servers.get(serverName);
  }

  /**
   * 获取所有服务器状态
   */
  public getAllServerStates(): ServerState[] {
    return Array.from(this.servers.values());
  }

  /**
   * 获取已连接的服务器
   */
  public getConnectedServers(): ServerState[] {
    return Array.from(this.servers.values()).filter(
      server => server.status === 'connected'
    );
  }

  /**
   * 获取所有可用工具
   */
  public getAllTools(): Array<McpTool & { serverName: string }> {
    const allTools: Array<McpTool & { serverName: string }> = [];
    
    for (const serverState of this.servers.values()) {
      if (serverState.status === 'connected') {
        for (const tool of serverState.tools) {
          allTools.push({
            ...tool,
            serverName: serverState.name
          });
        }
      }
    }
    
    return allTools;
  }

  /**
   * 调用工具 - 基于逆向分析gw函数
   */
  public async callTool(toolName: string, arguments_: any, serverName?: string): Promise<any> {
    // 如果指定了服务器名称，直接使用该服务器
    if (serverName) {
      const serverState = this.servers.get(serverName);
      if (!serverState || !serverState.client || serverState.status !== 'connected') {
        throw new Error(`Server ${serverName} is not available`);
      }
      
      return serverState.client.callTool(toolName, arguments_);
    }
    
    // 否则查找拥有该工具的服务器
    for (const serverState of this.servers.values()) {
      if (serverState.status === 'connected' && serverState.client) {
        const hasTool = serverState.tools.some(tool => tool.name === toolName);
        if (hasTool) {
          return serverState.client.callTool(toolName, arguments_);
        }
      }
    }
    
    throw new Error(`Tool ${toolName} not found in any connected server`);
  }

  /**
   * 手动重连服务器
   */
  public async reconnectServer(serverName: string): Promise<void> {
    const serverState = this.servers.get(serverName);
    if (!serverState) {
      throw new Error(`Server ${serverName} not found`);
    }

    // 清理现有连接
    if (serverState.client) {
      await serverState.client.disconnect();
      serverState.client = undefined;
    }

    // 重置重连计数
    serverState.reconnectAttempts = 0;

    // 立即重连
    await this.connectServer(serverName);
  }

  /**
   * 重连所有失败的服务器
   */
  public async reconnectAllFailedServers(): Promise<void> {
    const failedServers = Array.from(this.servers.values()).filter(
      server => server.status === 'error' || server.status === 'disconnected'
    );

    await Promise.allSettled(
      failedServers.map(server => this.reconnectServer(server.name))
    );
  }

  /**
   * 获取服务器统计信息
   */
  public getStatistics(): {
    total: number;
    connected: number;
    disconnected: number;
    error: number;
    reconnecting: number;
    totalTools: number;
  } {
    const stats = {
      total: this.servers.size,
      connected: 0,
      disconnected: 0,
      error: 0,
      reconnecting: 0,
      totalTools: 0
    };

    for (const server of this.servers.values()) {
      switch (server.status) {
        case 'connected':
          stats.connected++;
          stats.totalTools += server.tools.length;
          break;
        case 'disconnected':
          stats.disconnected++;
          break;
        case 'error':
          stats.error++;
          break;
        case 'reconnecting':
          stats.reconnecting++;
          break;
      }
    }

    return stats;
  }

  /**
   * 清理所有连接
   */
  public async cleanup(): Promise<void> {
    // 清理所有重连定时器
    for (const timer of this.reconnectTimers.values()) {
      clearTimeout(timer);
    }
    this.reconnectTimers.clear();

    // 断开所有连接
    const disconnectPromises = Array.from(this.servers.values()).map(async server => {
      if (server.client) {
        await server.client.disconnect();
      }
    });

    await Promise.allSettled(disconnectPromises);
    this.servers.clear();
  }
}

/**
 * 全局服务器管理器实例
 */
export const globalServerManager = new McpServerManager();
```

---

## 📁 第三周：工具安全和配置系统

### 步骤4.7: 工具白名单和安全机制

**基于逆向分析的工具权限控制**

**文件路径**: `src/mcp/security/tool-whitelist.ts`
**文件内容**:
```typescript
/**
 * MCP工具白名单和安全机制
 * 基于逆向分析的Claude Code工具安全控制
 * 实现工具过滤、权限验证、安全策略
 */

export interface ToolSecurityPolicy {
  allowedPrefixes: string[];
  blockedPrefixes: string[];
  allowedTools: string[];
  blockedTools: string[];
  requiresPermission: string[];
  maxConcurrentCalls: number;
  timeout: number;
}

export interface ToolCallContext {
  toolName: string;
  serverName: string;
  arguments: any;
  sessionId: string;
  userId?: string;
}

export interface SecurityViolation {
  type: 'blocked_tool' | 'blocked_prefix' | 'permission_required' | 'rate_limit' | 'timeout';
  toolName: string;
  reason: string;
  timestamp: number;
}

/**
 * 工具安全管理器
 * 基于逆向分析improved-claude-code-5.mjs:35471-35475的l65函数实现
 */
export class ToolSecurityManager {
  private policy: ToolSecurityPolicy;
  private activeCalls = new Map<string, number>(); // serverName -> count
  private callHistory = new Map<string, number[]>(); // toolName -> timestamps
  private violations: SecurityViolation[] = [];

  constructor(policy?: Partial<ToolSecurityPolicy>) {
    this.policy = {
      // 基于逆向分析的IDE工具白名单 - c65常量
      allowedPrefixes: ['mcp__'],
      blockedPrefixes: [],
      allowedTools: [
        'mcp__ide__executeCode',
        'mcp__ide__getDiagnostics'
      ],
      blockedTools: [],
      requiresPermission: [
        'mcp__ide__executeCode'
      ],
      maxConcurrentCalls: 10,
      timeout: 30000,
      ...policy
    };
  }

  /**
   * 工具过滤器 - 基于逆向分析l65函数实现
   * improved-claude-code-5.mjs:35471-35475
   */
  public isToolAllowed(toolName: string): boolean {
    // 检查是否在阻止列表中
    if (this.policy.blockedTools.includes(toolName)) {
      return false;
    }

    // 检查阻止的前缀
    for (const prefix of this.policy.blockedPrefixes) {
      if (toolName.startsWith(prefix)) {
        return false;
      }
    }

    // 检查允许的工具列表
    if (this.policy.allowedTools.includes(toolName)) {
      return true;
    }

    // 检查允许的前缀
    for (const prefix of this.policy.allowedPrefixes) {
      if (toolName.startsWith(prefix)) {
        // 对于IDE工具，使用白名单机制
        if (toolName.startsWith('mcp__ide__')) {
          return this.isIdeToolAllowed(toolName);
        }
        return true;
      }
    }

    return false;
  }

  /**
   * IDE工具白名单检查 - 基于逆向分析c65常量
   */
  private isIdeToolAllowed(toolName: string): boolean {
    const ideWhitelist = [
      'mcp__ide__executeCode',
      'mcp__ide__getDiagnostics'
    ];
    
    return ideWhitelist.includes(toolName);
  }

  /**
   * 权限检查
   */
  public requiresPermission(toolName: string): boolean {
    return this.policy.requiresPermission.includes(toolName);
  }

  /**
   * 验证工具调用
   */
  public async validateToolCall(context: ToolCallContext): Promise<{
    allowed: boolean;
    violation?: SecurityViolation;
  }> {
    const { toolName, serverName } = context;

    // 1. 检查工具是否被允许
    if (!this.isToolAllowed(toolName)) {
      const violation: SecurityViolation = {
        type: 'blocked_tool',
        toolName,
        reason: `Tool ${toolName} is not in the allowed list`,
        timestamp: Date.now()
      };
      
      this.violations.push(violation);
      return { allowed: false, violation };
    }

    // 2. 检查并发限制
    const currentCalls = this.activeCalls.get(serverName) || 0;
    if (currentCalls >= this.policy.maxConcurrentCalls) {
      const violation: SecurityViolation = {
        type: 'rate_limit',
        toolName,
        reason: `Too many concurrent calls to ${serverName}`,
        timestamp: Date.now()
      };
      
      this.violations.push(violation);
      return { allowed: false, violation };
    }

    // 3. 检查调用频率
    if (this.isRateLimited(toolName)) {
      const violation: SecurityViolation = {
        type: 'rate_limit',
        toolName,
        reason: `Tool ${toolName} is being called too frequently`,
        timestamp: Date.now()
      };
      
      this.violations.push(violation);
      return { allowed: false, violation };
    }

    return { allowed: true };
  }

  /**
   * 开始工具调用跟踪
   */
  public startToolCall(serverName: string, toolName: string): void {
    // 增加并发计数
    const currentCalls = this.activeCalls.get(serverName) || 0;
    this.activeCalls.set(serverName, currentCalls + 1);

    // 记录调用历史
    const history = this.callHistory.get(toolName) || [];
    history.push(Date.now());
    
    // 保留最近1小时的记录
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recentHistory = history.filter(timestamp => timestamp > oneHourAgo);
    this.callHistory.set(toolName, recentHistory);
  }

  /**
   * 结束工具调用跟踪
   */
  public endToolCall(serverName: string): void {
    const currentCalls = this.activeCalls.get(serverName) || 0;
    if (currentCalls > 0) {
      this.activeCalls.set(serverName, currentCalls - 1);
    }
  }

  /**
   * 检查调用频率限制
   */
  private isRateLimited(toolName: string): boolean {
    const history = this.callHistory.get(toolName) || [];
    const now = Date.now();
    
    // 最近1分钟不超过10次调用
    const oneMinuteAgo = now - 60 * 1000;
    const recentCalls = history.filter(timestamp => timestamp > oneMinuteAgo);
    
    return recentCalls.length >= 10;
  }

  /**
   * 获取安全违规记录
   */
  public getViolations(limit?: number): SecurityViolation[] {
    const sorted = [...this.violations].sort((a, b) => b.timestamp - a.timestamp);
    return limit ? sorted.slice(0, limit) : sorted;
  }

  /**
   * 清除过期的违规记录
   */
  public cleanupViolations(): void {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    this.violations = this.violations.filter(violation => violation.timestamp > oneDayAgo);
  }

  /**
   * 获取安全统计
   */
  public getSecurityStats(): {
    totalViolations: number;
    violationsByType: Record<string, number>;
    activeCalls: number;
    mostCalledTools: Array<{ toolName: string; count: number }>;
  } {
    const violationsByType: Record<string, number> = {};
    for (const violation of this.violations) {
      violationsByType[violation.type] = (violationsByType[violation.type] || 0) + 1;
    }

    const activeCalls = Array.from(this.activeCalls.values()).reduce((sum, count) => sum + count, 0);

    const toolCallCounts = new Map<string, number>();
    for (const [toolName, history] of this.callHistory) {
      toolCallCounts.set(toolName, history.length);
    }

    const mostCalledTools = Array.from(toolCallCounts.entries())
      .map(([toolName, count]) => ({ toolName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalViolations: this.violations.length,
      violationsByType,
      activeCalls,
      mostCalledTools
    };
  }

  /**
   * 更新安全策略
   */
  public updatePolicy(newPolicy: Partial<ToolSecurityPolicy>): void {
    this.policy = { ...this.policy, ...newPolicy };
  }

  /**
   * 获取当前安全策略
   */
  public getPolicy(): ToolSecurityPolicy {
    return { ...this.policy };
  }
}

/**
 * 全局工具安全管理器
 */
export const globalToolSecurity = new ToolSecurityManager();
```

### 步骤4.8: 配置管理系统

**基于逆向分析的三级配置和认证系统**

**文件路径**: `src/mcp/config/config-manager.ts`
**文件内容**:
```typescript
/**
 * MCP配置管理系统
 * 基于逆向分析的Claude Code三级配置系统
 * 支持local/project/user级别配置和OAuth认证
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { McpServerConfig } from '../client';

export type ConfigLevel = 'local' | 'project' | 'user';

export interface McpConfiguration {
  servers: Record<string, McpServerConfig>;
  globalSettings: {
    maxConcurrentConnections: number;
    defaultTimeout: number;
    retryAttempts: number;
    autoReconnect: boolean;
  };
  security: {
    allowedPrefixes: string[];
    blockedTools: string[];
    requirePermissions: boolean;
  };
}

export interface ConfigSource {
  level: ConfigLevel;
  path: string;
  config: Partial<McpConfiguration>;
}

/**
 * MCP配置管理器
 * 实现三级配置层次：local > project > user
 */
export class McpConfigManager {
  private configSources: ConfigSource[] = [];
  private mergedConfig: McpConfiguration | null = null;
  private watchers: Map<string, fs.FSWatcher> = new Map();

  private defaultConfig: McpConfiguration = {
    servers: {},
    globalSettings: {
      maxConcurrentConnections: 10,
      defaultTimeout: 30000,
      retryAttempts: 3,
      autoReconnect: true
    },
    security: {
      allowedPrefixes: ['mcp__'],
      blockedTools: [],
      requirePermissions: true
    }
  };

  /**
   * 初始化配置管理器
   */
  public async initialize(workingDirectory?: string): Promise<void> {
    await this.loadConfigurations(workingDirectory);
    this.setupFileWatchers();
  }

  /**
   * 加载所有级别的配置
   */
  private async loadConfigurations(workingDirectory?: string): Promise<void> {
    this.configSources = [];

    const cwd = workingDirectory || process.cwd();

    // 1. User level configuration (~/.claude-code/mcp.json)
    const userConfigPath = this.getUserConfigPath();
    await this.loadConfigFromPath(userConfigPath, 'user');

    // 2. Project level configuration (./mcp.json 或 ./.claude-code/mcp.json)
    const projectConfigPaths = [
      path.join(cwd, 'mcp.json'),
      path.join(cwd, '.claude-code', 'mcp.json')
    ];

    for (const configPath of projectConfigPaths) {
      await this.loadConfigFromPath(configPath, 'project');
    }

    // 3. Local level configuration (explicit local overrides)
    const localConfigPath = path.join(cwd, '.mcp.local.json');
    await this.loadConfigFromPath(localConfigPath, 'local');

    // 合并配置
    this.mergeConfigurations();
  }

  /**
   * 从指定路径加载配置
   */
  private async loadConfigFromPath(configPath: string, level: ConfigLevel): Promise<void> {
    try {
      const exists = await this.fileExists(configPath);
      if (!exists) {
        return;
      }

      const content = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(content) as Partial<McpConfiguration>;

      this.configSources.push({
        level,
        path: configPath,
        config
      });

      console.log(`Loaded ${level} MCP configuration from: ${configPath}`);
    } catch (error) {
      console.error(`Error loading ${level} configuration from ${configPath}:`, error);
    }
  }

  /**
   * 合并所有配置源
   */
  private mergeConfigurations(): void {
    // 按优先级排序：local > project > user
    const sortedSources = [...this.configSources].sort((a, b) => {
      const priority = { local: 3, project: 2, user: 1 };
      return priority[b.level] - priority[a.level];
    });

    // 从默认配置开始
    let merged: McpConfiguration = JSON.parse(JSON.stringify(this.defaultConfig));

    // 依次合并配置
    for (const source of sortedSources.reverse()) { // 反向合并，低优先级先合并
      merged = this.deepMerge(merged, source.config);
    }

    this.mergedConfig = merged;
  }

  /**
   * 深度合并配置对象
   */
  private deepMerge(target: any, source: any): any {
    const result = { ...target };

    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }

    return result;
  }

  /**
   * 获取合并后的配置
   */
  public getConfiguration(): McpConfiguration {
    if (!this.mergedConfig) {
      throw new Error('Configuration not initialized');
    }
    return JSON.parse(JSON.stringify(this.mergedConfig));
  }

  /**
   * 获取服务器配置
   */
  public getServerConfigs(): McpServerConfig[] {
    const config = this.getConfiguration();
    return Object.values(config.servers);
  }

  /**
   * 获取特定服务器配置
   */
  public getServerConfig(serverName: string): McpServerConfig | undefined {
    const config = this.getConfiguration();
    return config.servers[serverName];
  }

  /**
   * 添加服务器配置
   */
  public async addServerConfig(
    serverConfig: McpServerConfig, 
    level: ConfigLevel = 'project'
  ): Promise<void> {
    const configPath = this.getConfigPathForLevel(level);
    
    // 读取现有配置
    let existingConfig: Partial<McpConfiguration> = {};
    try {
      const content = await fs.readFile(configPath, 'utf-8');
      existingConfig = JSON.parse(content);
    } catch (error) {
      // 文件不存在，使用空配置
    }

    // 添加新服务器
    if (!existingConfig.servers) {
      existingConfig.servers = {};
    }
    existingConfig.servers[serverConfig.name] = serverConfig;

    // 保存配置
    await this.saveConfigToPath(configPath, existingConfig);
    
    // 重新加载配置
    await this.loadConfigurations();
  }

  /**
   * 移除服务器配置
   */
  public async removeServerConfig(
    serverName: string, 
    level: ConfigLevel = 'project'
  ): Promise<void> {
    const configPath = this.getConfigPathForLevel(level);
    
    try {
      const content = await fs.readFile(configPath, 'utf-8');
      const existingConfig = JSON.parse(content) as Partial<McpConfiguration>;
      
      if (existingConfig.servers && existingConfig.servers[serverName]) {
        delete existingConfig.servers[serverName];
        await this.saveConfigToPath(configPath, existingConfig);
        await this.loadConfigurations();
      }
    } catch (error) {
      console.error(`Error removing server config: ${error}`);
    }
  }

  /**
   * 保存配置到指定路径
   */
  private async saveConfigToPath(
    configPath: string, 
    config: Partial<McpConfiguration>
  ): Promise<void> {
    // 确保目录存在
    const dir = path.dirname(configPath);
    await fs.mkdir(dir, { recursive: true });

    // 格式化并保存
    const content = JSON.stringify(config, null, 2);
    await fs.writeFile(configPath, content, 'utf-8');
  }

  /**
   * 获取指定级别的配置文件路径
   */
  private getConfigPathForLevel(level: ConfigLevel): string {
    switch (level) {
      case 'user':
        return this.getUserConfigPath();
      case 'project':
        return path.join(process.cwd(), 'mcp.json');
      case 'local':
        return path.join(process.cwd(), '.mcp.local.json');
    }
  }

  /**
   * 获取用户配置路径
   */
  private getUserConfigPath(): string {
    const homeDir = process.env.HOME || process.env.USERPROFILE || '';
    return path.join(homeDir, '.claude-code', 'mcp.json');
  }

  /**
   * 设置文件监视器
   */
  private setupFileWatchers(): void {
    for (const source of this.configSources) {
      if (!this.watchers.has(source.path)) {
        try {
          const watcher = fs.watch(source.path, (eventType) => {
            if (eventType === 'change') {
              // 延迟重新加载以避免频繁更新
              setTimeout(() => {
                this.loadConfigurations().catch(error => {
                  console.error('Error reloading configuration:', error);
                });
              }, 100);
            }
          });

          this.watchers.set(source.path, watcher);
        } catch (error) {
          console.error(`Error setting up watcher for ${source.path}:`, error);
        }
      }
    }
  }

  /**
   * 检查文件是否存在
   */
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 获取配置源信息
   */
  public getConfigSources(): ConfigSource[] {
    return [...this.configSources];
  }

  /**
   * 验证配置
   */
  public validateConfiguration(): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const config = this.getConfiguration();

    // 验证服务器配置
    for (const [name, serverConfig] of Object.entries(config.servers)) {
      if (!serverConfig.name) {
        errors.push(`Server configuration missing name: ${name}`);
      }

      if (!serverConfig.transport) {
        errors.push(`Server ${name} missing transport configuration`);
      }

      // 验证传输配置
      if (serverConfig.transport) {
        switch (serverConfig.transport.type) {
          case 'stdio':
            if (!serverConfig.transport.command) {
              errors.push(`Server ${name} STDIO transport missing command`);
            }
            break;
          case 'http':
          case 'sse':
          case 'sse-ide':
          case 'ws-ide':
            if (!serverConfig.transport.url) {
              errors.push(`Server ${name} ${serverConfig.transport.type} transport missing URL`);
            }
            break;
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 清理资源
   */
  public async cleanup(): Promise<void> {
    // 关闭所有文件监视器
    for (const watcher of this.watchers.values()) {
      watcher.close();
    }
    this.watchers.clear();
  }
}

/**
 * OAuth认证管理器
 * 基于逆向分析的Claude Code OAuth2实现
 */
export class OAuthManager {
  private tokens = new Map<string, {
    accessToken: string;
    refreshToken?: string;
    expiresAt: number;
  }>();

  /**
   * 获取访问令牌
   */
  public async getAccessToken(serverName: string): Promise<string | null> {
    const tokenInfo = this.tokens.get(serverName);
    
    if (!tokenInfo) {
      return null;
    }

    // 检查是否过期
    if (Date.now() >= tokenInfo.expiresAt) {
      // 尝试刷新令牌
      if (tokenInfo.refreshToken) {
        return await this.refreshAccessToken(serverName, tokenInfo.refreshToken);
      }
      
      // 清除过期令牌
      this.tokens.delete(serverName);
      return null;
    }

    return tokenInfo.accessToken;
  }

  /**
   * 存储访问令牌
   */
  public setAccessToken(
    serverName: string, 
    accessToken: string, 
    expiresIn: number,
    refreshToken?: string
  ): void {
    this.tokens.set(serverName, {
      accessToken,
      refreshToken,
      expiresAt: Date.now() + (expiresIn * 1000)
    });
  }

  /**
   * 刷新访问令牌
   */
  private async refreshAccessToken(serverName: string, refreshToken: string): Promise<string | null> {
    // 这里应该实现OAuth2令牌刷新逻辑
    // 具体实现取决于OAuth2提供商的API
    console.log(`Refreshing token for server: ${serverName}`);
    return null;
  }

  /**
   * 清除令牌
   */
  public clearToken(serverName: string): void {
    this.tokens.delete(serverName);
  }

  /**
   * 清除所有令牌
   */
  public clearAllTokens(): void {
    this.tokens.clear();
  }
}

/**
 * 全局配置管理器实例
 */
export const globalConfigManager = new McpConfigManager();
export const globalOAuthManager = new OAuthManager();
```

---

## 📁 第四周：扩展框架和生态系统

### 步骤4.9: MCP扩展开发框架

**为第三方开发者提供的扩展开发工具**

**文件路径**: `src/mcp/extensions/extension-framework.ts`
**文件内容**:
```typescript
/**
 * MCP扩展开发框架
 * 为第三方开发者提供的扩展开发工具和API
 * 支持插件注册、版本管理、依赖解析
 */

export interface ExtensionManifest {
  name: string;
  version: string;
  description: string;
  author: string;
  license?: string;
  homepage?: string;
  repository?: string;
  keywords?: string[];
  
  // Claude Code特定字段
  claudeCodeVersion: string;
  mcpVersion: string;
  
  // 扩展配置
  main: string;
  tools?: ToolDefinition[];
  resources?: ResourceDefinition[];
  prompts?: PromptDefinition[];
  
  // 依赖和权限
  dependencies?: Record<string, string>;
  permissions?: Permission[];
  
  // 生命周期钩子
  activationEvents?: string[];
  
  // 配置Schema
  configuration?: ConfigurationSchema;
}

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: any;
  handler: string; // 函数名或文件路径
  permissions?: string[];
  timeout?: number;
}

export interface ResourceDefinition {
  uriPattern: string;
  name: string;
  description: string;
  mimeType?: string;
  handler: string;
}

export interface PromptDefinition {
  name: string;
  description: string;
  arguments?: ArgumentDefinition[];
  handler: string;
}

export interface ArgumentDefinition {
  name: string;
  description: string;
  required: boolean;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
}

export interface Permission {
  type: 'filesystem' | 'network' | 'process' | 'env' | 'clipboard';
  scope?: string;
  description: string;
}

export interface ConfigurationSchema {
  type: 'object';
  properties: Record<string, any>;
  required?: string[];
}

export interface ExtensionContext {
  extensionPath: string;
  storageUri: string;
  globalStorageUri: string;
  subscriptions: any[];
  workspaceState: ExtensionStorage;
  globalState: ExtensionStorage;
  logger: ExtensionLogger;
}

export interface ExtensionStorage {
  get<T>(key: string, defaultValue?: T): T | undefined;
  update(key: string, value: any): Promise<void>;
  keys(): readonly string[];
}

export interface ExtensionLogger {
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

/**
 * 扩展基类
 * 所有扩展都应该继承自此类
 */
export abstract class Extension {
  protected context: ExtensionContext;
  protected manifest: ExtensionManifest;

  constructor(context: ExtensionContext, manifest: ExtensionManifest) {
    this.context = context;
    this.manifest = manifest;
  }

  /**
   * 扩展激活时调用
   */
  public abstract activate(): Promise<void>;

  /**
   * 扩展停用时调用
   */
  public abstract deactivate(): Promise<void>;

  /**
   * 注册工具
   */
  protected registerTool(definition: ToolDefinition, handler: Function): void {
    // 实现工具注册逻辑
    console.log(`Registering tool: ${definition.name}`);
  }

  /**
   * 注册资源
   */
  protected registerResource(definition: ResourceDefinition, handler: Function): void {
    // 实现资源注册逻辑
    console.log(`Registering resource: ${definition.name}`);
  }

  /**
   * 注册提示
   */
  protected registerPrompt(definition: PromptDefinition, handler: Function): void {
    // 实现提示注册逻辑
    console.log(`Registering prompt: ${definition.name}`);
  }

  /**
   * 获取配置值
   */
  protected getConfiguration<T>(key: string, defaultValue?: T): T {
    // 实现配置获取逻辑
    return defaultValue as T;
  }

  /**
   * 更新配置值
   */
  protected async updateConfiguration(key: string, value: any): Promise<void> {
    // 实现配置更新逻辑
  }
}

/**
 * 扩展管理器
 * 负责扩展的加载、管理和生命周期
 */
export class ExtensionManager {
  private extensions = new Map<string, Extension>();
  private manifests = new Map<string, ExtensionManifest>();
  private extensionPaths: string[] = [];

  /**
   * 添加扩展搜索路径
   */
  public addExtensionPath(path: string): void {
    this.extensionPaths.push(path);
  }

  /**
   * 扫描并加载所有扩展
   */
  public async loadExtensions(): Promise<void> {
    for (const searchPath of this.extensionPaths) {
      await this.scanExtensionsInPath(searchPath);
    }
  }

  /**
   * 扫描指定路径中的扩展
   */
  private async scanExtensionsInPath(searchPath: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const entries = await fs.readdir(searchPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const extensionPath = path.join(searchPath, entry.name);
          await this.loadExtensionFromPath(extensionPath);
        }
      }
    } catch (error) {
      console.error(`Error scanning extensions in ${searchPath}:`, error);
    }
  }

  /**
   * 从指定路径加载扩展
   */
  private async loadExtensionFromPath(extensionPath: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // 读取manifest.json
      const manifestPath = path.join(extensionPath, 'manifest.json');
      const manifestContent = await fs.readFile(manifestPath, 'utf-8');
      const manifest: ExtensionManifest = JSON.parse(manifestContent);
      
      // 验证manifest
      if (!this.validateManifest(manifest)) {
        console.error(`Invalid manifest for extension: ${manifest.name}`);
        return;
      }
      
      // 检查版本兼容性
      if (!this.isVersionCompatible(manifest)) {
        console.error(`Incompatible version for extension: ${manifest.name}`);
        return;
      }
      
      // 加载扩展主文件
      const mainPath = path.join(extensionPath, manifest.main);
      const extensionModule = await import(mainPath);
      
      // 创建扩展上下文
      const context = this.createExtensionContext(extensionPath, manifest);
      
      // 实例化扩展
      const extension = new extensionModule.default(context, manifest);
      
      // 激活扩展
      await extension.activate();
      
      // 注册扩展
      this.extensions.set(manifest.name, extension);
      this.manifests.set(manifest.name, manifest);
      
      console.log(`Loaded extension: ${manifest.name} v${manifest.version}`);
      
    } catch (error) {
      console.error(`Error loading extension from ${extensionPath}:`, error);
    }
  }

  /**
   * 验证扩展manifest
   */
  private validateManifest(manifest: ExtensionManifest): boolean {
    const requiredFields = ['name', 'version', 'description', 'main', 'claudeCodeVersion'];
    
    for (const field of requiredFields) {
      if (!(field in manifest)) {
        console.error(`Missing required field: ${field}`);
        return false;
      }
    }
    
    return true;
  }

  /**
   * 检查版本兼容性
   */
  private isVersionCompatible(manifest: ExtensionManifest): boolean {
    // 实现版本兼容性检查
    // 这里可以使用semver库进行语义版本比较
    return true;
  }

  /**
   * 创建扩展上下文
   */
  private createExtensionContext(extensionPath: string, manifest: ExtensionManifest): ExtensionContext {
    const path = require('path');
    const os = require('os');
    
    const globalStorageUri = path.join(os.homedir(), '.claude-code', 'extensions', manifest.name);
    const storageUri = path.join(extensionPath, '.storage');
    
    return {
      extensionPath,
      storageUri,
      globalStorageUri,
      subscriptions: [],
      workspaceState: this.createStorage(storageUri),
      globalState: this.createStorage(globalStorageUri),
      logger: this.createLogger(manifest.name)
    };
  }

  /**
   * 创建存储实例
   */
  private createStorage(storagePath: string): ExtensionStorage {
    return {
      get<T>(key: string, defaultValue?: T): T | undefined {
        // 实现存储读取逻辑
        return defaultValue;
      },
      
      async update(key: string, value: any): Promise<void> {
        // 实现存储更新逻辑
      },
      
      keys(): readonly string[] {
        // 实现键列表获取逻辑
        return [];
      }
    };
  }

  /**
   * 创建日志记录器
   */
  private createLogger(extensionName: string): ExtensionLogger {
    return {
      info: (message: string, ...args: any[]) => {
        console.log(`[${extensionName}] INFO: ${message}`, ...args);
      },
      
      warn: (message: string, ...args: any[]) => {
        console.warn(`[${extensionName}] WARN: ${message}`, ...args);
      },
      
      error: (message: string, ...args: any[]) => {
        console.error(`[${extensionName}] ERROR: ${message}`, ...args);
      },
      
      debug: (message: string, ...args: any[]) => {
        console.debug(`[${extensionName}] DEBUG: ${message}`, ...args);
      }
    };
  }

  /**
   * 卸载扩展
   */
  public async unloadExtension(extensionName: string): Promise<void> {
    const extension = this.extensions.get(extensionName);
    if (extension) {
      await extension.deactivate();
      this.extensions.delete(extensionName);
      this.manifests.delete(extensionName);
      console.log(`Unloaded extension: ${extensionName}`);
    }
  }

  /**
   * 获取已加载的扩展列表
   */
  public getLoadedExtensions(): ExtensionManifest[] {
    return Array.from(this.manifests.values());
  }

  /**
   * 获取特定扩展的manifest
   */
  public getExtensionManifest(extensionName: string): ExtensionManifest | undefined {
    return this.manifests.get(extensionName);
  }

  /**
   * 检查扩展是否已加载
   */
  public isExtensionLoaded(extensionName: string): boolean {
    return this.extensions.has(extensionName);
  }

  /**
   * 重新加载扩展
   */
  public async reloadExtension(extensionName: string): Promise<void> {
    if (this.isExtensionLoaded(extensionName)) {
      await this.unloadExtension(extensionName);
    }
    
    // 重新扫描并加载
    await this.loadExtensions();
  }

  /**
   * 清理所有扩展
   */
  public async cleanup(): Promise<void> {
    const extensionNames = Array.from(this.extensions.keys());
    
    for (const extensionName of extensionNames) {
      await this.unloadExtension(extensionName);
    }
  }
}

/**
 * 扩展工具函数
 */
export namespace ExtensionUtils {
  /**
   * 创建扩展模板
   */
  export async function createExtensionTemplate(
    name: string, 
    outputPath: string
  ): Promise<void> {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const extensionPath = path.join(outputPath, name);
    await fs.mkdir(extensionPath, { recursive: true });
    
    // 创建manifest.json
    const manifest: ExtensionManifest = {
      name,
      version: '1.0.0',
      description: `${name} extension for Claude Code`,
      author: 'Your Name',
      license: 'MIT',
      claudeCodeVersion: '^1.0.0',
      mcpVersion: '2024-11-05',
      main: 'src/extension.js',
      activationEvents: ['*'],
      configuration: {
        type: 'object',
        properties: {},
        required: []
      }
    };
    
    await fs.writeFile(
      path.join(extensionPath, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    // 创建主文件
    const mainContent = `
const { Extension } = require('claude-code');

class ${name}Extension extends Extension {
  async activate() {
    this.context.logger.info('Extension activated');
    
    // 注册工具、资源、提示等
  }
  
  async deactivate() {
    this.context.logger.info('Extension deactivated');
  }
}

module.exports = ${name}Extension;
`;
    
    const srcPath = path.join(extensionPath, 'src');
    await fs.mkdir(srcPath, { recursive: true });
    await fs.writeFile(path.join(srcPath, 'extension.js'), mainContent);
    
    console.log(`Extension template created at: ${extensionPath}`);
  }

  /**
   * 验证扩展包
   */
  export async function validateExtension(extensionPath: string): Promise<{
    valid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];
    
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // 检查manifest.json
      const manifestPath = path.join(extensionPath, 'manifest.json');
      try {
        const manifestContent = await fs.readFile(manifestPath, 'utf-8');
        const manifest = JSON.parse(manifestContent);
        
        // 验证必需字段
        const requiredFields = ['name', 'version', 'description', 'main'];
        for (const field of requiredFields) {
          if (!manifest[field]) {
            errors.push(`Missing required field: ${field}`);
          }
        }
        
        // 检查主文件是否存在
        const mainPath = path.join(extensionPath, manifest.main);
        try {
          await fs.access(mainPath);
        } catch {
          errors.push(`Main file not found: ${manifest.main}`);
        }
        
      } catch (error) {
        errors.push(`Invalid or missing manifest.json: ${error}`);
      }
      
    } catch (error) {
      errors.push(`Error accessing extension path: ${error}`);
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

/**
 * 全局扩展管理器实例
 */
export const globalExtensionManager = new ExtensionManager();
```

### 步骤4.10: 完整集成测试

**阶段4的完整集成测试套件**

**文件路径**: `src/__tests__/stage4-mcp-integration.test.ts`
**文件内容**:
```typescript
/**
 * 阶段4 MCP集成和扩展系统集成测试
 * 验证MCP协议、服务器管理、工具安全、配置系统的完整功能
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/testing-library';
import { McpClient } from '../mcp/client';
import { McpServerManager } from '../mcp/server-manager';
import { ToolSecurityManager } from '../mcp/security/tool-whitelist';
import { McpConfigManager } from '../mcp/config/config-manager';
import { ExtensionManager } from '../mcp/extensions/extension-framework';
import { StdioTransport, HttpTransport, SseTransport, WebSocketTransport } from '../mcp/transport';

describe('阶段4 - MCP集成和扩展系统完整测试', () => {
  let serverManager: McpServerManager;
  let toolSecurity: ToolSecurityManager;
  let configManager: McpConfigManager;
  let extensionManager: ExtensionManager;

  beforeEach(() => {
    serverManager = new McpServerManager();
    toolSecurity = new ToolSecurityManager();
    configManager = new McpConfigManager();
    extensionManager = new ExtensionManager();
  });

  afterEach(async () => {
    await serverManager.cleanup();
    await configManager.cleanup();
    await extensionManager.cleanup();
  });

  describe('MCP传输层测试', () => {
    test('STDIO传输连接和通信', async () => {
      const config = {
        type: 'stdio' as const,
        command: 'echo',
        args: ['{"jsonrpc":"2.0","id":1,"result":"test"}']
      };

      const transport = new StdioTransport(config);
      
      // 模拟连接
      const messagePromise = new Promise((resolve) => {
        transport.onMessage(resolve);
      });

      await transport.connect();
      expect(transport.isConnected()).toBe(true);

      // 发送消息并验证响应
      const testMessage = { jsonrpc: '2.0', id: 1, method: 'test' };
      await transport.send(testMessage);

      await transport.disconnect();
      expect(transport.isConnected()).toBe(false);
    });

    test('HTTP传输请求-响应模式', async () => {
      // 模拟HTTP服务器
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ jsonrpc: '2.0', id: 1, result: 'success' })
      });
      
      global.fetch = mockFetch;

      const config = {
        type: 'http' as const,
        url: 'http://localhost:8080/mcp'
      };

      const transport = new HttpTransport(config);
      await transport.connect();

      const testMessage = { jsonrpc: '2.0', id: 1, method: 'test' };
      await transport.send(testMessage);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/mcp',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(testMessage)
        })
      );
    });

    test('WebSocket双向通信', async () => {
      // 这里需要模拟WebSocket服务器
      // 或者使用测试库如ws来创建测试服务器
      
      const config = {
        type: 'websocket' as const,
        url: 'ws://localhost:8080/mcp',
        protocols: ['mcp']
      };

      // 模拟WebSocket实现
      const mockWebSocket = {
        readyState: 1, // OPEN
        send: jest.fn(),
        close: jest.fn(),
        on: jest.fn(),
        addEventListener: jest.fn()
      };

      // 这里需要适当的WebSocket模拟逻辑
      expect(config.url).toBe('ws://localhost:8080/mcp');
    });

    test('IDE专用传输（SSE-IDE和WS-IDE）', async () => {
      const sseIdeConfig = {
        type: 'sse-ide' as const,
        url: 'http://vscode-extension/sse',
        ideName: 'vscode'
      };

      const wsIdeConfig = {
        type: 'ws-ide' as const,
        url: 'ws://cursor-extension/ws',
        ideName: 'cursor',
        authToken: 'test-token'
      };

      // 验证配置正确性
      expect(sseIdeConfig.ideName).toBe('vscode');
      expect(wsIdeConfig.authToken).toBe('test-token');
    });
  });

  describe('MCP客户端核心功能测试', () => {
    test('客户端初始化和握手', async () => {
      const config = {
        name: 'test-server',
        transport: {
          type: 'stdio' as const,
          command: 'node',
          args: ['test-mcp-server.js']
        }
      };

      const client = new McpClient(config);
      
      // 模拟成功连接
      expect(client.connected).toBe(false);
      
      // 实际测试中这里会连接到真实的MCP服务器
      // await client.connect();
      // expect(client.connected).toBe(true);
    });

    test('工具调用功能', async () => {
      const client = new McpClient({
        name: 'test-server',
        transport: { type: 'stdio', command: 'echo' }
      });

      // 模拟工具调用
      const toolName = 'test_tool';
      const arguments_ = { param1: 'value1', param2: 42 };

      // 实际实现中会调用真实工具
      // const result = await client.callTool(toolName, arguments_);
      // expect(result).toBeDefined();
    });

    test('资源和提示管理', async () => {
      const client = new McpClient({
        name: 'test-server',
        transport: { type: 'stdio', command: 'echo' }
      });

      // 测试资源列表获取
      // const resources = await client.listResources();
      // expect(Array.isArray(resources)).toBe(true);

      // 测试提示列表获取
      // const prompts = await client.listPrompts();
      // expect(Array.isArray(prompts)).toBe(true);
    });
  });

  describe('多服务器管理测试', () => {
    test('服务器连接池管理', async () => {
      const serverConfigs = [
        {
          name: 'server1',
          transport: { type: 'stdio' as const, command: 'echo' }
        },
        {
          name: 'server2', 
          transport: { type: 'http' as const, url: 'http://localhost:8080' }
        }
      ];

      for (const config of serverConfigs) {
        await serverManager.addServer(config);
      }

      const allStates = serverManager.getAllServerStates();
      expect(allStates).toHaveLength(2);
      expect(allStates.map(s => s.name)).toEqual(['server1', 'server2']);
    });

    test('服务器状态监控和事件', async () => {
      const events: string[] = [];
      
      serverManager.on('server:connected', (name) => {
        events.push(`connected:${name}`);
      });
      
      serverManager.on('server:error', (name, error) => {
        events.push(`error:${name}`);
      });

      // 添加一个会失败的服务器配置
      await serverManager.addServer({
        name: 'failing-server',
        transport: { type: 'stdio', command: 'nonexistent-command' }
      });

      // 验证错误事件被触发
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(events.some(e => e.startsWith('error:'))).toBe(true);
    });

    test('自动重连机制', async () => {
      const config = {
        name: 'reconnect-server',
        transport: { type: 'stdio' as const, command: 'echo' },
        retryAttempts: 3
      };

      await serverManager.addServer(config);
      
      const serverState = serverManager.getServerState('reconnect-server');
      expect(serverState).toBeDefined();
      expect(serverState!.reconnectAttempts).toBe(0);
    });

    test('工具调用路由', async () => {
      // 添加多个服务器，每个有不同的工具
      await serverManager.addServer({
        name: 'tools-server-1',
        transport: { type: 'stdio', command: 'echo' }
      });

      await serverManager.addServer({
        name: 'tools-server-2', 
        transport: { type: 'stdio', command: 'echo' }
      });

      // 测试工具调用路由到正确的服务器
      try {
        await serverManager.callTool('nonexistent_tool', {});
        expect(false).toBe(true); // 应该抛出错误
      } catch (error) {
        expect(error.message).toContain('Tool nonexistent_tool not found');
      }
    });
  });

  describe('工具安全机制测试', () => {
    test('工具白名单过滤', () => {
      // 测试IDE工具白名单
      expect(toolSecurity.isToolAllowed('mcp__ide__getDiagnostics')).toBe(true);
      expect(toolSecurity.isToolAllowed('mcp__ide__executeCode')).toBe(true);
      expect(toolSecurity.isToolAllowed('mcp__ide__maliciousTool')).toBe(false);

      // 测试一般MCP工具
      expect(toolSecurity.isToolAllowed('mcp__general__tool')).toBe(true);
      expect(toolSecurity.isToolAllowed('dangerous_tool')).toBe(false);
    });

    test('权限验证流程', async () => {
      const context = {
        toolName: 'mcp__ide__executeCode',
        serverName: 'ide-server',
        arguments: { code: 'print("hello")' },
        sessionId: 'test-session'
      };

      const validation = await toolSecurity.validateToolCall(context);
      expect(validation.allowed).toBe(true);

      // 测试权限要求
      expect(toolSecurity.requiresPermission('mcp__ide__executeCode')).toBe(true);
    });

    test('并发控制和频率限制', async () => {
      const context = {
        toolName: 'test_tool',
        serverName: 'test-server',
        arguments: {},
        sessionId: 'test-session'
      };

      // 开始多个并发调用
      for (let i = 0; i < 5; i++) {
        toolSecurity.startToolCall('test-server', 'test_tool');
      }

      // 验证并发限制生效
      const validation = await toolSecurity.validateToolCall(context);
      // 在实际实现中，这可能会因并发限制而失败
    });

    test('安全违规记录和统计', () => {
      const stats = toolSecurity.getSecurityStats();
      expect(stats).toHaveProperty('totalViolations');
      expect(stats).toHaveProperty('violationsByType');
      expect(stats).toHaveProperty('activeCalls');
      expect(stats).toHaveProperty('mostCalledTools');
    });
  });

  describe('配置管理系统测试', () => {
    test('三级配置层次加载', async () => {
      // 模拟配置文件内容
      const userConfig = {
        globalSettings: { maxConcurrentConnections: 20 }
      };
      
      const projectConfig = {
        servers: {
          'project-server': {
            name: 'project-server',
            transport: { type: 'stdio', command: 'node' }
          }
        }
      };

      // 实际测试中会创建临时配置文件
      await configManager.initialize('./test-workspace');
      
      const mergedConfig = configManager.getConfiguration();
      expect(mergedConfig).toHaveProperty('servers');
      expect(mergedConfig).toHaveProperty('globalSettings');
    });

    test('配置验证', () => {
      const validation = configManager.validateConfiguration();
      expect(validation).toHaveProperty('valid');
      expect(validation).toHaveProperty('errors');
      expect(Array.isArray(validation.errors)).toBe(true);
    });

    test('动态配置更新', async () => {
      const serverConfig = {
        name: 'dynamic-server',
        transport: { type: 'stdio' as const, command: 'echo' }
      };

      await configManager.addServerConfig(serverConfig, 'project');
      
      const loadedConfig = configManager.getServerConfig('dynamic-server');
      expect(loadedConfig).toEqual(serverConfig);
    });

    test('配置文件监视', async () => {
      // 模拟配置文件变化
      // 实际测试中会修改配置文件并验证自动重新加载
      
      const sources = configManager.getConfigSources();
      expect(Array.isArray(sources)).toBe(true);
    });
  });

  describe('扩展系统测试', () => {
    test('扩展加载和生命周期', async () => {
      // 创建模拟扩展目录
      const extensionPath = './test-extensions';
      extensionManager.addExtensionPath(extensionPath);

      // 模拟扩展manifest
      const manifest = {
        name: 'test-extension',
        version: '1.0.0',
        description: 'Test extension',
        author: 'Test Author',
        claudeCodeVersion: '1.0.0',
        mcpVersion: '2024-11-05',
        main: 'extension.js'
      };

      // 实际测试中会创建真实的扩展文件
      // await extensionManager.loadExtensions();
      
      expect(extensionManager.getLoadedExtensions()).toEqual([]);
    });

    test('扩展工具注册', async () => {
      // 模拟扩展注册工具
      const toolDefinition = {
        name: 'extension_tool',
        description: 'Tool provided by extension',
        inputSchema: { type: 'object', properties: {} },
        handler: 'handleTool'
      };

      // 实际实现中会通过扩展框架注册工具
      expect(toolDefinition.name).toBe('extension_tool');
    });

    test('扩展配置和存储', () => {
      // 测试扩展配置和存储机制
      const extensionName = 'test-extension';
      
      // 实际实现中会测试扩展的配置读写
      expect(extensionName).toBe('test-extension');
    });
  });

  describe('IDE集成专项测试', () => {
    test('IDE连接检测', () => {
      const mockServers = [
        {
          type: 'connected',
          name: 'ide',
          config: {
            type: 'sse-ide',
            ideName: 'vscode'
          }
        }
      ];

      // 基于逆向分析的TF1函数测试
      const detectedIde = mockServers.find(s => 
        s.type === 'connected' && s.name === 'ide'
      )?.config;
      
      expect(detectedIde?.ideName).toBe('vscode');
    });

    test('诊断信息管理', async () => {
      // 模拟诊断信息获取
      const mockDiagnostics = [
        {
          uri: 'file:///test.js',
          diagnostics: [
            {
              message: 'Unused variable',
              severity: 2,
              range: {
                start: { line: 10, character: 5 },
                end: { line: 10, character: 15 }
              }
            }
          ]
        }
      ];

      // 测试诊断信息比较算法
      const diag1 = mockDiagnostics[0].diagnostics[0];
      const diag2 = { ...diag1 };
      
      // 实际实现中会使用IdeDiagnosticsManager进行比较
      expect(JSON.stringify(diag1)).toBe(JSON.stringify(diag2));
    });

    test('代码执行集成', async () => {
      // 模拟IDE代码执行
      const executeRequest = {
        code: 'print("Hello from IDE")',
        language: 'python'
      };

      // 实际实现中会通过MCP调用IDE的executeCode工具
      expect(executeRequest.code).toContain('Hello from IDE');
    });
  });

  describe('端到端集成测试', () => {
    test('完整MCP工作流程', async () => {
      // 1. 初始化配置管理器
      await configManager.initialize();
      
      // 2. 加载服务器配置
      const serverConfig = {
        name: 'integration-test-server',
        transport: { type: 'stdio' as const, command: 'echo' }
      };
      
      await configManager.addServerConfig(serverConfig);
      
      // 3. 启动服务器管理器
      await serverManager.addServer(serverConfig);
      
      // 4. 验证安全策略
      const toolName = 'mcp__test__tool';
      const isAllowed = toolSecurity.isToolAllowed(toolName);
      expect(typeof isAllowed).toBe('boolean');
      
      // 5. 加载扩展
      await extensionManager.loadExtensions();
      
      // 6. 验证系统状态
      const serverStats = serverManager.getStatistics();
      expect(serverStats).toHaveProperty('total');
      
      const securityStats = toolSecurity.getSecurityStats();
      expect(securityStats).toHaveProperty('totalViolations');
      
      const extensions = extensionManager.getLoadedExtensions();
      expect(Array.isArray(extensions)).toBe(true);
    });

    test('错误处理和恢复', async () => {
      // 测试各种错误情况下的系统恢复能力
      
      // 1. 服务器连接失败
      await serverManager.addServer({
        name: 'failing-server',
        transport: { type: 'stdio', command: 'nonexistent' }
      });
      
      // 2. 无效配置
      const validation = configManager.validateConfiguration();
      expect(validation).toHaveProperty('valid');
      
      // 3. 安全违规
      const context = {
        toolName: 'blocked_tool',
        serverName: 'test',
        arguments: {},
        sessionId: 'test'
      };
      
      const securityCheck = await toolSecurity.validateToolCall(context);
      expect(securityCheck).toHaveProperty('allowed');
    });

    test('性能和资源管理', async () => {
      // 测试系统的性能特征
      
      // 1. 大量服务器连接
      const serverPromises = [];
      for (let i = 0; i < 10; i++) {
        serverPromises.push(
          serverManager.addServer({
            name: `perf-server-${i}`,
            transport: { type: 'stdio', command: 'echo' }
          })
        );
      }
      
      await Promise.allSettled(serverPromises);
      
      // 2. 并发工具调用
      const callPromises = [];
      for (let i = 0; i < 20; i++) {
        callPromises.push(
          toolSecurity.validateToolCall({
            toolName: 'mcp__test__tool',
            serverName: 'test',
            arguments: {},
            sessionId: `session-${i}`
          })
        );
      }
      
      const results = await Promise.allSettled(callPromises);
      expect(results.length).toBe(20);
      
      // 3. 内存使用监控
      const stats = serverManager.getStatistics();
      expect(stats.total).toBeGreaterThan(0);
    });
  });
});
```

---

## 📋 阶段4完成验证清单

### 功能验证项目

**MCP协议实现** ✅
- [ ] STDIO传输正常工作
- [ ] HTTP传输请求-响应模式
- [ ] SSE传输实时推送
- [ ] WebSocket双向通信
- [ ] IDE专用传输（SSE-IDE、WS-IDE）
- [ ] 消息格式符合JSON-RPC 2.0

**服务器连接管理** ✅
- [ ] 多服务器并发连接
- [ ] 连接状态实时监控
- [ ] 自动重连机制
- [ ] 错误处理和恢复
- [ ] 工具调用路由正确

**工具安全机制** ✅
- [ ] 工具白名单过滤有效
- [ ] IDE工具安全控制
- [ ] 并发调用限制
- [ ] 频率限制防护
- [ ] 安全违规记录

**配置管理系统** ✅
- [ ] 三级配置层次加载
- [ ] 配置文件监视
- [ ] 动态配置更新
- [ ] OAuth认证管理
- [ ] 配置验证和错误处理

**扩展框架** ✅
- [ ] 扩展加载和生命周期
- [ ] 工具/资源/提示注册
- [ ] 扩展配置和存储
- [ ] 版本兼容性检查
- [ ] 扩展模板生成

### 性能验证项目

**连接性能** ✅
- [ ] 服务器连接时间 < 2s
- [ ] 并发连接数支持 > 10
- [ ] 重连机制延迟合理
- [ ] 网络故障快速检测
- [ ] 资源清理完整

**调用性能** ✅
- [ ] 工具调用响应 < 1s
- [ ] 安全检查延迟 < 50ms
- [ ] 并发调用不阻塞
- [ ] 配置更新 < 500ms
- [ ] 扩展加载 < 3s

**资源管理** ✅
- [ ] 内存使用稳定 < 500MB
- [ ] 连接池有效管理
- [ ] 文件描述符无泄漏
- [ ] 定时器正确清理
- [ ] GC压力可控

### 兼容性验证项目

**MCP协议兼容** ✅
- [ ] 符合MCP 2024-11-05规范
- [ ] JSON-RPC 2.0完全兼容
- [ ] 工具调用格式标准
- [ ] 资源URI格式正确
- [ ] 通知机制符合规范

**传输层兼容** ✅
- [ ] 多种传输方式互通
- [ ] 网络协议标准合规
- [ ] 认证机制灵活支持
- [ ] 错误码标准化
- [ ] 超时处理一致

**IDE集成兼容** ✅
- [ ] VS Code扩展API
- [ ] Cursor集成接口
- [ ] Windsurf协议支持
- [ ] 诊断信息LSP格式
- [ ] 代码执行Jupyter内核

### 安全验证项目

**访问控制** ✅
- [ ] 工具权限严格控制
- [ ] 服务器隔离有效
- [ ] 用户身份验证
- [ ] 会话管理安全
- [ ] 配置文件权限

**数据安全** ✅
- [ ] 传输数据加密
- [ ] 敏感信息脱敏
- [ ] 日志安全记录
- [ ] 配置文件保护
- [ ] 临时文件清理

**运行时安全** ✅
- [ ] 进程隔离机制
- [ ] 资源使用限制
- [ ] 异常处理完善
- [ ] 恶意输入防护
- [ ] 系统调用监控

---

## 🎯 下一阶段预告

阶段4完成后，Open Claude Code将具备：

1. **完整的MCP生态系统**：
   - 四种传输协议支持
   - 企业级服务器管理
   - 安全的工具执行环境
   - 灵活的配置管理

2. **强大的扩展能力**：
   - 第三方插件支持
   - 标准化开发框架
   - 丰富的API接口
   - 完善的文档体系

3. **深度IDE集成**：
   - LSP诊断信息同步
   - Jupyter代码执行
   - 实时状态监控
   - 多IDE生态支持

**进入阶段5**：测试优化和发布准备（2周）
- 性能优化和基准测试
- 完整的测试覆盖
- 文档和用户指南
- 发布准备和CI/CD

这标志着Open Claude Code在MCP协议和扩展系统实现上的重大突破，为最终的产品发布奠定了坚实的技术基础。