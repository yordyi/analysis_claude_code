# Open Claude Code - 技术开发实现文档 (TDD)

## 1. 技术架构设计

### 1.1 整体系统架构

基于对Claude Code的深度逆向分析，我们采用8层架构（包含实时Steering层）：

```typescript
// 系统架构接口定义
interface SystemArchitecture {
  layers: {
    cli: CLILayer;           // 命令行接口层
    ui: UILayer;             // 用户界面层
    steering: SteeringLayer; // 实时Steering层(h2A异步队列)
    event: EventLayer;       // 事件系统层
    message: MessageLayer;   // 消息处理层
    agent: AgentLayer;       // Agent核心层(nO主循环)
    tool: ToolLayer;         // 工具执行层
    multiAgent: MultiAgentLayer; // 多Agent协调层(Task工具)
    api: APILayer;           // API接口层
  };
}
```

### 1.2 核心模块设计

#### 1.2.1 Agent核心引擎
```typescript
// 基于nO async generator函数的Agent主循环设计
// 集成h2A异步消息队列和实时Steering机制
class AgentCore {
  private steeringQueue: h2A; // 实时消息队列
  private abortController: AbortController; // 中断控制器
  
  async* mainLoop(
    messages: Message[],
    config: AgentConfig,
    context: Context
  ): AsyncGenerator<ResponseChunk> {
    // 1. 初始化实时Steering机制
    this.steeringQueue = new h2A(this.cleanupResources.bind(this));
    this.abortController = new AbortController();
    this.startStdinListening(); // 启动stdin监听
    
    // 2. 消息压缩检查
    const { messages: compactedMessages, wasCompacted } = 
      await this.compressMessages(messages, config);
    
    // 3. 主循环执行（异步生成器模式）
    while (this.shouldContinue && !this.abortController.signal.aborted) {
      try {
        // 4. 检查实时用户输入
        const steeringMessage = await this.checkSteeringInput();
        if (steeringMessage) {
          messages.push(steeringMessage);
          // 动态调整执行策略
          await this.adjustExecutionStrategy(steeringMessage);
        }
        
        // 5. 上下文注入
        const enrichedMessages = this.injectContext(compactedMessages, context);
        
        // 6. 流生成器调用（kq5流式处理）
        for await (const chunk of this.streamGenerator(enrichedMessages, config)) {
          // 检查中断信号
          if (this.abortController.signal.aborted) break;
          yield chunk;
        }
        
        // 7. 递归调用检查
        if (this.needsContinuation(chunk)) {
          yield* this.mainLoop([...messages, ...responses], config, context);
        }
      } catch (error) {
        // 8. 模型降级处理
        if (error instanceof ModelError && config.fallbackModel) {
          config.currentModel = config.fallbackModel;
          continue;
        }
        throw error;
      }
    }
  }
  
  private async checkSteeringInput(): Promise<Message | null> {
    try {
      const steeringData = await this.steeringQueue.next();
      if (steeringData.value) {
        return this.parseSteeringMessage(steeringData.value);
      }
    } catch (error) {
      // 实时输入失败，继续执行
    }
    return null;
  }
}
```

#### 1.2.2 工具执行引擎
```typescript
// 工具执行引擎（集成gW5复杂并发管理机制）
class ToolExecutionEngine {
  private concurrencyManager: gW5ConcurrencyManager; // 复杂并发管理
  
  async executeTools(toolCalls: ToolCall[]): Promise<ToolResult[]> {
    // 1. 并发安全性分析
    const safeGroups = this.analyzeConcurrencySafety(toolCalls);
    
    // 2. 智能分组调度
    const executionGroups = this.scheduleToolGroups(safeGroups);
    
    // 3. 并发执行控制
    const results: ToolResult[] = [];
    for (const group of executionGroups) {
      const groupResults = await this.executeConcurrently(group);
      results.push(...groupResults);
    }
    
    return results;
  }
  
  private async executeConcurrently(tools: ToolCall[]): Promise<ToolResult[]> {
    // 使用gW5复杂并发管理机制（包含动态负载均衡）
    const concurrencyConfig = this.concurrencyManager.calculateOptimalConcurrency(tools);
    
    return Promise.all(tools.map(async (tool) => {
      await concurrencyConfig.semaphore.acquire();
      try {
        return await this.executeSingleTool(tool, concurrencyConfig);
      } finally {
        concurrencyConfig.semaphore.release();
      }
    }));
  }
}
```

### 1.3 实时Steering通信机制设计

#### 1.3.1 h2A异步消息队列系统
```typescript
// 基于逆向分析的h2A类实现
class h2A implements AsyncIterator<any> {
  private returned: (() => void) | null; // 清理函数
  private queue: any[] = [];             // 消息队列缓冲区
  private readResolve?: (value: any) => void; // Promise resolve回调
  private readReject?: (reason: any) => void;  // Promise reject回调
  private isDone = false;                // 队列完成标志
  private hasError?: any;                // 错误状态
  private started = false;               // 启动状态标志

  constructor(cleanupFn?: () => void) {
    this.returned = cleanupFn || null;
  }

  // 实现AsyncIterator接口
  [Symbol.asyncIterator](): AsyncIterator<any> {
    if (this.started) {
      throw new Error("Stream can only be iterated once");
    }
    this.started = true;
    return this;
  }

  // 核心异步迭代器方法
  async next(): Promise<IteratorResult<any>> {
    if (this.hasError) {
      throw this.hasError;
    }
    
    if (this.queue.length > 0) {
      const value = this.queue.shift();
      return { value, done: false };
    }
    
    if (this.isDone) {
      return { value: undefined, done: true };
    }
    
    // 等待新消息
    return new Promise((resolve, reject) => {
      this.readResolve = resolve;
      this.readReject = reject;
    });
  }

  // 添加消息到队列
  enqueue(message: any): void {
    if (this.isDone) return;
    
    if (this.readResolve) {
      this.readResolve({ value: message, done: false });
      this.readResolve = undefined;
      this.readReject = undefined;
    } else {
      this.queue.push(message);
    }
  }

  // 完成队列
  complete(): void {
    this.isDone = true;
    if (this.readResolve) {
      this.readResolve({ value: undefined, done: true });
      this.readResolve = undefined;
      this.readReject = undefined;
    }
    if (this.returned) {
      this.returned();
    }
  }

  // 错误处理
  error(err: any): void {
    this.hasError = err;
    if (this.readReject) {
      this.readReject(err);
      this.readResolve = undefined;
      this.readReject = undefined;
    }
  }
}

interface MessageQueue extends h2A {
  priority: MessagePriority;
}

enum MessagePriority {
  SYSTEM_INTERRUPT = 0,  // 系统中断（最高优先级）
  USER_STEERING = 1,     // 用户实时引导
  USER_INPUT = 2,        // 用户输入
  TOOL_RESULT = 3,       // 工具结果
  SYSTEM_UPDATE = 4      // 系统更新
}
```

#### 1.3.2 实时Steering监听系统
```typescript
class SteeringSystem {
  private stdinListener: NodeJS.ReadStream;
  private messageQueue: h2A;
  private abortController: AbortController;
  
  constructor(messageQueue: h2A) {
    this.messageQueue = messageQueue;
    this.abortController = new AbortController();
    this.setupStdinListening();
  }
  
  // 设置stdin实时监听
  private setupStdinListening(): void {
    this.stdinListener = process.stdin;
    this.stdinListener.setRawMode(true);
    this.stdinListener.resume();
    
    this.stdinListener.on('data', (chunk) => {
      try {
        const input = chunk.toString('utf8');
        // 检查是否是特殊控制字符
        if (this.isSteeringInput(input)) {
          const steeringMessage = this.parseSteeringInput(input);
          this.messageQueue.enqueue({
            type: 'steering',
            content: steeringMessage,
            timestamp: Date.now(),
            priority: MessagePriority.USER_STEERING
          });
        }
      } catch (error) {
        console.error('Steering input parse error:', error);
      }
    });
  }
  
  // 判断是否为实时引导输入
  private isSteeringInput(input: string): boolean {
    // 特殊控制字符或按键组合
    return input.includes('\u001b') || // ESC键
           input.charCodeAt(0) === 3 || // Ctrl+C
           input.includes('\r') ||       // Enter键
           input.length > 1;             // 多字符输入
  }
  
  // 解析实时引导输入
  private parseSteeringInput(input: string): string {
    // 处理特殊按键组合
    if (input.includes('\u001b[')) {
      // 处理箭头键等特殊输入
      return this.handleSpecialKeys(input);
    }
    
    return input.trim();
  }
  
  // 停止监听
  stop(): void {
    this.abortController.abort();
    this.stdinListener.pause();
    if (this.stdinListener.setRawMode) {
      this.stdinListener.setRawMode(false);
    }
  }
}

// 事件驱动通信系统
class EventSystem {
  private eventHandlers = new Map<string, EventHandler[]>();
  
  // 事件分发机制（集成实时Steering支持）
  async dispatch(event: SystemEvent): Promise<void> {
    const handlers = this.eventHandlers.get(event.type) || [];
    
    // 生成system-reminder
    if (this.shouldGenerateReminder(event)) {
      const reminder = this.generateSystemReminder(event);
      await this.injectReminder(reminder);
    }
    
    // 处理实时Steering事件
    if (event.type === 'steering_input') {
      await this.handleSteeringEvent(event);
    }
    
    // 执行事件处理器
    await Promise.all(handlers.map(handler => handler(event)));
  }
  
  private async handleSteeringEvent(event: SystemEvent): Promise<void> {
    // 处理用户实时引导输入
    const steeringContent = event.data.content;
    // 动态调整Agent执行策略
    await this.adjustAgentStrategy(steeringContent);
  }
  
  private generateSystemReminder(event: SystemEvent): SystemReminder {
    switch (event.type) {
      case 'todo_updated':
        return this.createTodoReminder(event.data);
      case 'file_edited':
        return this.createFileEditReminder(event.data);
      case 'plan_mode_activated':
        return this.createPlanModeReminder();
      case 'steering_input':
        return this.createSteeringReminder(event.data);
      default:
        return null;
    }
  }
}
```

## 2. 数据结构设计

### 2.1 核心数据模型

#### 2.1.1 消息数据结构
```typescript
interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  role: 'user' | 'assistant' | 'system';
  content: string | ContentBlock[];
  timestamp: string;
  isMeta: boolean;                    // 元信息标记
  isCompactSummary?: boolean;         // 压缩摘要标记
  toolUseResult?: ToolResult;         // 工具执行结果
  uuid: string;                       // 唯一标识符
}

interface SystemReminder extends Message {
  context: {
    directoryStructure?: string;
    gitStatus?: string;
    claudeMd?: string;
    todoList?: TodoItem[];
  };
}
```

#### 2.1.2 工具定义结构
```typescript
interface Tool {
  name: string;
  description: string;
  inputSchema: JSONSchema;
  userFacingName(): string;
  isConcurrencySafe(): boolean;
  
  // 工具执行接口
  execute(input: any, context: ToolContext): Promise<ToolResult>;
  
  // 权限验证接口
  checkPermissions(input: any, context: ToolContext): Promise<PermissionResult>;
  
  // 结果映射接口
  mapResult(result: any): ToolResultBlock;
}

// 内置工具类型
enum BuiltinTools {
  READ = 'Read',
  WRITE = 'Write', 
  EDIT = 'Edit',
  MULTI_EDIT = 'MultiEdit',
  BASH = 'Bash',
  LS = 'LS',
  GLOB = 'Glob',
  GREP = 'Grep',
  TODO_READ = 'TodoRead',
  TODO_WRITE = 'TodoWrite',
  TASK = 'Task',
  WEB_FETCH = 'WebFetch',
  WEB_SEARCH = 'WebSearch',
  NOTEBOOK_READ = 'NotebookRead',
  NOTEBOOK_EDIT = 'NotebookEdit',
  EXIT_PLAN_MODE = 'exit_plan_mode'
}
```

#### 2.1.3 MCP协议数据结构
```typescript
interface MCPServer {
  name: string;
  config: MCPServerConfig;
  transport: MCPTransport;
  status: MCPServerStatus;
  tools: MCPTool[];
  resources: MCPResource[];
}

interface MCPServerConfig {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  transport: 'stdio' | 'http' | 'websocket' | 'sse';
  settings?: Record<string, any>;
  auth?: OAuthConfig;
}

interface MCPTool extends Tool {
  serverId: string;
  mcpName: string;           // 原始MCP工具名
  qualifiedName: string;     // mcp__server__tool格式
}
```

### 2.2 状态管理设计

#### 2.2.1 应用状态结构
```typescript
interface ApplicationState {
  // 基于UI组件分析的11个核心状态
  responseStatus: 'idle' | 'responding' | 'error';     // k1/Q1
  messageHistory: Message[];                           // v1/L1  
  currentSession: Session | null;                      // BA/HA
  modeFlag: boolean;                                   // MA/t
  activeObject: any | null;                           // B1/W1
  userConfig: UserConfig | null;                      // w1/P1
  eventList: SystemEvent[];                           // e/y1
  messageQueue: Message[];                            // O1/h1
  temporaryData: any[];                               // o1/QA
  inputBuffer: string;                                // zA/Y0
  uiMode: 'prompt' | 'plan' | 'settings';            // fA/H0
}

interface Session {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  metadata: SessionMetadata;
}
```

## 3. 模块实现详细设计

### 3.1 CLI命令系统实现

#### 3.1.1 Commander.js集成
```typescript
// 基于CLI启动流程分析的实现
class CLIInterface {
  private program: Command;
  
  constructor() {
    this.program = new Command();
    this.setupCommands();
  }
  
  private setupCommands(): void {
    this.program
      .name('claude')
      .description('Open Claude Code - AI Programming Assistant')
      .version(VERSION)
      .argument('[prompt]', 'Your prompt', String)
      .option('-d, --debug', 'Enable debug mode')
      .option('--verbose', 'Enable verbose output')
      .option('-p, --print', 'Print response and exit')
      .option('-c, --continue', 'Continue recent conversation')
      .option('-r, --resume [sessionId]', 'Resume specific session')
      .option('--model <model>', 'Specify model to use')
      .option('--fallback-model <model>', 'Specify fallback model')
      .option('--mcp-config <config>', 'MCP server configuration')
      .action(this.handleMainCommand.bind(this));
  }
  
  private async handleMainCommand(prompt?: string, options?: CLIOptions): Promise<void> {
    // 检测模式
    if (options.print) {
      await this.runPrintMode(prompt, options);
    } else {
      await this.runInteractiveMode(prompt, options);
    }
  }
}
```

#### 3.1.2 参数验证和处理
```typescript
class ParameterValidator {
  static validateModel(model: string): boolean {
    const supportedModels = [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022', 
      'gpt-4o',
      'gpt-4o-mini'
    ];
    return supportedModels.includes(model);
  }
  
  static validateMCPConfig(config: string): MCPServerConfig {
    try {
      const parsed = JSON.parse(config);
      // 验证配置格式
      return this.normalizeMCPConfig(parsed);
    } catch (error) {
      throw new Error(`Invalid MCP configuration: ${error.message}`);
    }
  }
}
```

### 3.2 UI组件系统实现

#### 3.2.1 React/Ink框架集成
```typescript
// 基于UI组件分析的终端界面实现
import React from 'react';
import { render, Box, Text } from 'ink';

interface MainAppProps {
  initialState: ApplicationState;
}

const MainApp: React.FC<MainAppProps> = ({ initialState }) => {
  // 11个核心状态变量
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>('idle');
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [modeFlag, setModeFlag] = useState<boolean>(false);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);
  const [eventList, setEventList] = useState<SystemEvent[]>([]);
  const [messageQueue, setMessageQueue] = useState<Message[]>([]);
  const [temporaryData, setTemporaryData] = useState<any[]>([]);
  const [inputBuffer, setInputBuffer] = useState<string>('');
  const [uiMode, setUIMode] = useState<UIMode>('prompt');
  
  return (
    <Box flexDirection="column" height="100%">
      <WelcomeHeader />
      <MessageDisplay messages={messageHistory} />
      <ProgressIndicator status={responseStatus} />
      <InputPanel 
        value={inputBuffer}
        onChange={setInputBuffer}
        onSubmit={handleUserInput}
        mode={uiMode}
      />
      <StatusBar session={currentSession} mode={uiMode} />
    </Box>
  );
};
```

#### 3.2.2 终端适配和响应式设计
```typescript
// 基于c9函数的终端尺寸管理
const useTerminalSize = () => {
  const [size, setSize] = useState({
    columns: process.stdout.columns || 80,
    rows: process.stdout.rows || 24
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        columns: process.stdout.columns || 80,
        rows: process.stdout.rows || 24
      });
    };
    
    process.stdout.setMaxListeners(200);
    process.stdout.on('resize', handleResize);
    
    return () => {
      process.stdout.off('resize', handleResize);
    };
  }, []);
  
  return size;
};
```

### 3.3 工具系统实现

#### 3.3.1 工具注册和发现
```typescript
class ToolRegistry {
  private tools = new Map<string, Tool>();
  private mcpTools = new Map<string, MCPTool>();
  
  registerBuiltinTools(): void {
    // 注册15个内置工具
    this.register(new ReadTool());
    this.register(new WriteTool());
    this.register(new EditTool());
    this.register(new BashTool());
    this.register(new LSTools());
    this.register(new GlobTool());
    this.register(new GrepTool());
    this.register(new TodoReadTool());
    this.register(new TodoWriteTool());
    this.register(new TaskTool());
    this.register(new WebFetchTool());
    this.register(new WebSearchTool());
    this.register(new NotebookReadTool());
    this.register(new NotebookEditTool());
    this.register(new ExitPlanModeTool());
  }
  
  async discoverMCPTools(): Promise<void> {
    for (const server of this.mcpManager.getActiveServers()) {
      const tools = await server.listTools();
      for (const tool of tools) {
        const qualifiedName = `mcp__${server.name}__${tool.name}`;
        const mcpTool = new MCPTool(qualifiedName, tool, server);
        this.mcpTools.set(qualifiedName, mcpTool);
      }
    }
  }
}
```

#### 3.3.2 并发控制实现
```typescript
// 基于gW5复杂并发管理机制的实现
class ConcurrencyController {
  private readonly concurrencyManager: gW5ConcurrencyManager;
  private activeTasks = new Set<string>();
  private taskQueue: ToolCall[] = [];
  
  async execute(toolCalls: ToolCall[]): Promise<ToolResult[]> {
    // 分析并发安全性
    const { safeConcurrent, requiresSequential } = this.analyzeSafety(toolCalls);
    
    // 执行可并发的工具
    const concurrentResults = await this.executeConcurrent(safeConcurrent);
    
    // 按序执行不安全的工具
    const sequentialResults = await this.executeSequential(requiresSequential);
    
    return [...concurrentResults, ...sequentialResults];
  }
  
  private analyzeSafety(toolCalls: ToolCall[]): {
    safeConcurrent: ToolCall[];
    requiresSequential: ToolCall[];
  } {
    const safe: ToolCall[] = [];
    const unsafe: ToolCall[] = [];
    
    for (const call of toolCalls) {
      const tool = this.toolRegistry.get(call.toolName);
      if (tool?.isConcurrencySafe()) {
        safe.push(call);
      } else {
        unsafe.push(call);
      }
    }
    
    return { safeConcurrent: safe, requiresSequential: unsafe };
  }
}
```

### 3.4 MCP协议实现

#### 3.4.1 MCP客户端实现
```typescript
class MCPClient {
  private transport: MCPTransport;
  private messageId = 0;
  private pendingRequests = new Map<number, PendingRequest>();
  
  constructor(config: MCPServerConfig) {
    this.transport = this.createTransport(config);
  }
  
  private createTransport(config: MCPServerConfig): MCPTransport {
    switch (config.transport) {
      case 'stdio':
        return new STDIOTransport(config.command, config.args);
      case 'http':
        return new HTTPTransport(config.baseUrl);
      case 'websocket':
        return new WebSocketTransport(config.url);
      case 'sse':
        return new SSETransport(config.url);
      default:
        throw new Error(`Unsupported transport: ${config.transport}`);
    }
  }
  
  async callTool(name: string, arguments_: any): Promise<any> {
    const request: JSONRPCRequest = {
      jsonrpc: '2.0',
      id: ++this.messageId,
      method: 'tools/call',
      params: {
        name,
        arguments: arguments_
      }
    };
    
    return this.sendRequest(request);
  }
}
```

#### 3.4.2 多传输协议支持
```typescript
abstract class MCPTransport {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract send(message: JSONRPCMessage): Promise<void>;
  abstract receive(): AsyncGenerator<JSONRPCMessage>;
}

class STDIOTransport extends MCPTransport {
  private process: ChildProcess;
  
  constructor(private command: string, private args: string[]) {
    super();
  }
  
  async connect(): Promise<void> {
    this.process = spawn(this.command, this.args, {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    // 设置消息处理
    this.process.stdout.on('data', this.handleStdout.bind(this));
    this.process.stderr.on('data', this.handleStderr.bind(this));
  }
}

class HTTPTransport extends MCPTransport {
  constructor(private baseUrl: string) {
    super();
  }
  
  async send(message: JSONRPCMessage): Promise<void> {
    const response = await fetch(`${this.baseUrl}/rpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  }
}
```

### 3.5 消息压缩系统实现

#### 3.5.1 压缩策略
```typescript
// 基于wU2函数的消息压缩实现
class MessageCompressor {
  async shouldCompress(messages: Message[]): Promise<boolean> {
    // 基于多种条件判断是否需要压缩
    const totalTokens = this.estimateTokens(messages);
    const messageCount = messages.length;
    const contextSize = this.calculateContextSize();
    
    return totalTokens > 100000 || 
           messageCount > 100 || 
           contextSize > 50000;
  }
  
  async compress(messages: Message[], config: CompressionConfig): Promise<{
    messages: Message[];
    wasCompacted: boolean;
  }> {
    try {
      // 调用LLM进行智能压缩
      const summary = await this.generateSummary(messages, config);
      
      // 保留最近的消息和重要的系统消息
      const recentMessages = messages.slice(-10);
      const systemMessages = messages.filter(m => m.isMeta);
      
      return {
        messages: [summary, ...systemMessages, ...recentMessages],
        wasCompacted: true
      };
    } catch (error) {
      // 压缩失败时返回原始消息
      return {
        messages,
        wasCompacted: false
      };
    }
  }
  
  private async generateSummary(messages: Message[], config: CompressionConfig): Promise<Message> {
    // 基于AU2函数的8段式摘要模板
    const summaryPrompt = this.createSummaryPrompt();
    
    const response = await this.llmClient.complete({
      messages: [
        { role: 'system', content: summaryPrompt },
        { role: 'user', content: this.formatMessagesForSummary(messages) }
      ],
      model: config.model,
      maxTokens: 4000
    });
    
    return {
      id: generateId(),
      type: 'user',
      role: 'user',
      content: response.content,
      timestamp: new Date().toISOString(),
      isMeta: true,
      isCompactSummary: true,
      uuid: generateUUID()
    };
  }
}
```

## 4. 关键算法设计

### 4.1 上下文注入算法

```typescript
// 基于Ie1函数的上下文注入实现
class ContextInjector {
  async injectContext(messages: Message[], context: Context): Promise<Message[]> {
    const contextInfo = await this.gatherContextInfo(context);
    
    // 只在有上下文信息时注入
    if (Object.keys(contextInfo).length === 0) {
      return messages;
    }
    
    // 生成system-reminder
    const reminder = this.createSystemReminder(contextInfo);
    
    // 前置注入到消息队列
    return [reminder, ...messages];
  }
  
  private async gatherContextInfo(context: Context): Promise<ContextInfo> {
    const info: ContextInfo = {};
    
    // 收集目录结构
    if (context.includeDirectoryStructure) {
      info.directoryStructure = await this.getDirectoryStructure();
    }
    
    // 收集Git状态
    if (context.includeGitStatus) {
      info.gitStatus = await this.getGitStatus();
    }
    
    // 收集CLAUDE.md配置
    if (context.includeClaude()) {
      info.claudeMd = await this.getClaudeMd();
    }
    
    // 发送遥测数据
    this.sendTelemetry(info);
    
    return info;
  }
  
  private createSystemReminder(contextInfo: ContextInfo): Message {
    const content = `<system-reminder>
As you answer the user's questions, you can use the following context:
${Object.entries(contextInfo).map(([key, value]) => 
  `# ${key}\n${value}`
).join('\n')}

IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context or otherwise consider it in your response unless it is highly relevant to your task. Most of the time, it is not relevant.
</system-reminder>`;
    
    return {
      id: generateId(),
      type: 'user',
      role: 'user', 
      content,
      timestamp: new Date().toISOString(),
      isMeta: true,
      uuid: generateUUID()
    };
  }
}
```

### 4.2 智能工具调度算法

```typescript
// 基于hW5函数的智能调度实现
class ToolScheduler {
  scheduleTools(toolCalls: ToolCall[]): ToolExecutionPlan {
    // 1. 依赖分析
    const dependencies = this.analyzeDependencies(toolCalls);
    
    // 2. 并发安全性分组
    const safetyGroups = this.groupBySafety(toolCalls);
    
    // 3. 资源需求分析
    const resourceGroups = this.groupByResource(toolCalls);
    
    // 4. 优化调度顺序
    const executionGroups = this.optimizeSchedule(
      dependencies, 
      safetyGroups, 
      resourceGroups
    );
    
    return {
      groups: executionGroups,
      estimatedDuration: this.estimateDuration(executionGroups),
      resourceUsage: this.estimateResourceUsage(executionGroups)
    };
  }
  
  private analyzeDependencies(toolCalls: ToolCall[]): DependencyGraph {
    const graph = new DependencyGraph();
    
    for (let i = 0; i < toolCalls.length; i++) {
      for (let j = i + 1; j < toolCalls.length; j++) {
        if (this.hasDependency(toolCalls[i], toolCalls[j])) {
          graph.addEdge(toolCalls[i].id, toolCalls[j].id);
        }
      }
    }
    
    return graph;
  }
  
  private hasDependency(toolA: ToolCall, toolB: ToolCall): boolean {
    // 文件依赖检查
    if (this.hasFileConflict(toolA, toolB)) return true;
    
    // 顺序依赖检查
    if (this.hasSequentialDependency(toolA, toolB)) return true;
    
    // 资源依赖检查
    if (this.hasResourceConflict(toolA, toolB)) return true;
    
    return false;
  }
}
```

### 4.3 错误恢复算法

```typescript
class ErrorRecoveryManager {
  async handleError(error: Error, context: ExecutionContext): Promise<RecoveryAction> {
    // 错误分类
    const errorType = this.classifyError(error);
    
    switch (errorType) {
      case ErrorType.MODEL_ERROR:
        return this.handleModelError(error as ModelError, context);
      
      case ErrorType.TOOL_ERROR:
        return this.handleToolError(error as ToolError, context);
      
      case ErrorType.NETWORK_ERROR:
        return this.handleNetworkError(error as NetworkError, context);
      
      case ErrorType.PERMISSION_ERROR:
        return this.handlePermissionError(error as PermissionError, context);
      
      default:
        return this.handleGenericError(error, context);
    }
  }
  
  private async handleModelError(error: ModelError, context: ExecutionContext): Promise<RecoveryAction> {
    if (context.config.fallbackModel) {
      // 模型降级
      await this.switchToFallbackModel(context.config.fallbackModel);
      
      // 清空当前消息批次
      context.clearCurrentBatch();
      
      // 发送遥测
      this.sendTelemetry('model_fallback_triggered', {
        originalModel: error.originalModel,
        fallbackModel: context.config.fallbackModel,
        error: error.message
      });
      
      return RecoveryAction.RETRY_WITH_FALLBACK;
    }
    
    return RecoveryAction.FAIL;
  }
  
  private async handleToolError(error: ToolError, context: ExecutionContext): Promise<RecoveryAction> {
    // 工具级别的错误恢复
    if (error.isRetryable && context.retryCount < 3) {
      await this.delay(Math.pow(2, context.retryCount) * 1000); // 指数退避
      return RecoveryAction.RETRY;
    }
    
    // 标记工具为失败但继续其他工具
    context.markToolAsFailed(error.toolName);
    return RecoveryAction.CONTINUE_PARTIAL;
  }
}
```

## 5. 数据库和存储设计

### 5.1 会话存储方案

```typescript
interface SessionStorage {
  // 基于本地文件的会话存储
  sessionsDir: string;      // ~/.claude/sessions/
  configDir: string;       // ~/.claude/
  cacheDir: string;        // ~/.claude/cache/
}

class SessionManager {
  private storage: SessionStorage;
  
  async saveSession(session: Session): Promise<void> {
    const sessionPath = path.join(this.storage.sessionsDir, `${session.id}.json`);
    const sessionData = {
      ...session,
      messages: await this.compressMessages(session.messages)
    };
    
    await fs.writeFile(sessionPath, JSON.stringify(sessionData, null, 2));
  }
  
  async loadSession(sessionId: string): Promise<Session> {
    const sessionPath = path.join(this.storage.sessionsDir, `${sessionId}.json`);
    const data = await fs.readFile(sessionPath, 'utf-8');
    const sessionData = JSON.parse(data);
    
    return {
      ...sessionData,
      messages: await this.decompressMessages(sessionData.messages)
    };
  }
  
  async listSessions(): Promise<SessionMetadata[]> {
    const files = await fs.readdir(this.storage.sessionsDir);
    const sessions: SessionMetadata[] = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const metadata = await this.getSessionMetadata(file);
        sessions.push(metadata);
      }
    }
    
    return sessions.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
}
```

### 5.2 配置管理方案

```typescript
// 三级配置系统实现
class ConfigurationManager {
  private localConfig: Config | null = null;
  private projectConfig: Config | null = null;
  private userConfig: Config | null = null;
  
  async loadConfiguration(): Promise<Config> {
    // 按优先级加载配置
    await this.loadUserConfig();      // ~/.claude/settings.json
    await this.loadProjectConfig();   // ./.claude/settings.json  
    await this.loadLocalConfig();     // ./CLAUDE.md
    
    // 合并配置
    return this.mergeConfigurations();
  }
  
  private mergeConfigurations(): Config {
    return {
      ...this.userConfig,
      ...this.projectConfig,
      ...this.localConfig,
      // MCP配置特殊处理
      mcp: {
        ...this.userConfig?.mcp,
        ...this.projectConfig?.mcp,
        ...this.localConfig?.mcp
      }
    };
  }
  
  async saveMCPConfiguration(config: MCPConfig): Promise<void> {
    const configPath = path.join(process.cwd(), '.mcp.json');
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
  }
}
```

## 6. 安全机制设计

### 6.1 权限控制系统

```typescript
class PermissionManager {
  async checkToolPermission(tool: Tool, input: any, context: ToolContext): Promise<PermissionResult> {
    // 1. 内置权限检查
    const builtinCheck = await this.checkBuiltinPermissions(tool, input);
    if (builtinCheck.behavior !== 'allow') {
      return builtinCheck;
    }
    
    // 2. 用户配置权限检查
    const userCheck = await this.checkUserPermissions(tool, input, context);
    if (userCheck.behavior !== 'allow') {
      return userCheck;
    }
    
    // 3. 动态安全分析
    const securityCheck = await this.performSecurityAnalysis(tool, input);
    if (securityCheck.behavior !== 'allow') {
      return securityCheck;
    }
    
    return { behavior: 'allow', updatedInput: input };
  }
  
  private async performSecurityAnalysis(tool: Tool, input: any): Promise<PermissionResult> {
    // 危险命令检测
    if (tool.name === 'Bash') {
      const dangerousPatterns = [
        /rm\s+-rf\s+\//, 
        /sudo\s+rm/, 
        /dd\s+if=.*of=\/dev/, 
        /:(){ :|:& };:/  // fork bomb
      ];
      
      for (const pattern of dangerousPatterns) {
        if (pattern.test(input.command)) {
          return {
            behavior: 'deny',
            message: `Dangerous command detected: ${input.command}`,
            ruleSuggestions: ['Review the command for safety', 'Use safer alternatives']
          };
        }
      }
    }
    
    // 文件操作安全检查
    if (['Write', 'Edit'].includes(tool.name)) {
      if (this.isSystemFile(input.filePath)) {
        return {
          behavior: 'ask',
          message: `Attempting to modify system file: ${input.filePath}`,
          confirmation: 'This operation may affect system stability. Continue?'
        };
      }
    }
    
    return { behavior: 'allow', updatedInput: input };
  }
}
```

### 6.2 沙箱执行环境

```typescript
class SandboxExecutor {
  async executeTool(tool: Tool, input: any, options: SandboxOptions): Promise<ToolResult> {
    const sandbox = await this.createSandbox(options);
    
    try {
      // 在沙箱中执行工具
      const result = await sandbox.execute(async () => {
        return await tool.execute(input, sandbox.context);
      });
      
      // 验证结果安全性
      await this.validateResult(result);
      
      return result;
    } finally {
      await sandbox.destroy();
    }
  }
  
  private async createSandbox(options: SandboxOptions): Promise<Sandbox> {
    return new Sandbox({
      // 文件系统限制
      allowedPaths: options.allowedPaths || [process.cwd()],
      readOnlyPaths: options.readOnlyPaths || ['/etc', '/usr'],
      
      // 网络限制
      allowNetworking: options.allowNetworking || false,
      allowedHosts: options.allowedHosts || [],
      
      // 资源限制
      maxMemory: options.maxMemory || 512 * 1024 * 1024, // 512MB
      maxCpuTime: options.maxCpuTime || 30000, // 30秒
      
      // 进程限制
      allowSubprocesses: options.allowSubprocesses || false,
      maxProcesses: options.maxProcesses || 10
    });
  }
}
```

## 7. 性能优化策略

### 7.1 并发处理优化

```typescript
class PerformanceOptimizer {
  // 基于gW5复杂并发管理机制的优化
  private readonly concurrencyManager: gW5ConcurrencyManager;
  private dynamicSemaphore: DynamicSemaphore;
  
  async optimizeConcurrentExecution(tasks: Task[]): Promise<TaskResult[]> {
    // 1. 任务分析和分组
    const groups = this.analyzeAndGroup(tasks);
    
    // 2. 智能并发执行优化（动态负载均衡）
    const results: TaskResult[] = [];
    for (const group of groups) {
      const concurrencyConfig = this.concurrencyManager.calculateOptimalConcurrency(group);
      const groupResults = await this.executeConcurrentGroup(group, concurrencyConfig);
      results.push(...groupResults);
    }
    
    return results;
  }
  
  private async executeConcurrentGroup(tasks: Task[]): Promise<TaskResult[]> {
    // 使用信号量控制并发数
    return Promise.all(tasks.map(async (task) => {
      await this.semaphore.acquire();
      try {
        return await this.executeWithTimeout(task);
      } finally {
        this.semaphore.release();
      }
    }));
  }
  
  private async executeWithTimeout(task: Task, timeout = 30000): Promise<TaskResult> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Task timeout: ${task.name}`));
      }, timeout);
      
      task.execute()
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timer));
    });
  }
}
```

### 7.2 内存管理优化

```typescript
class MemoryManager {
  private cache = new LRUCache<string, any>({ max: 1000 });
  private messageHistory: Message[] = [];
  private readonly maxHistorySize = 1000;
  
  optimizeMemoryUsage(): void {
    // 1. 消息历史管理
    this.pruneMessageHistory();
    
    // 2. 缓存清理
    this.cleanupCache();
    
    // 3. 强制垃圾回收（开发模式）
    if (process.env.NODE_ENV === 'development') {
      if (global.gc) {
        global.gc();
      }
    }
  }
  
  private pruneMessageHistory(): void {
    if (this.messageHistory.length > this.maxHistorySize) {
      // 保留最近的消息和重要的系统消息
      const recentMessages = this.messageHistory.slice(-800);
      const systemMessages = this.messageHistory
        .slice(0, -800)
        .filter(m => m.isMeta || m.type === 'system');
      
      this.messageHistory = [...systemMessages, ...recentMessages];
    }
  }
  
  private cleanupCache(): void {
    // 清理过期的缓存项
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (value.timestamp && now - value.timestamp > 3600000) { // 1小时
        this.cache.delete(key);
      }
    }
  }
}
```

## 8. 监控和遥测实现

### 8.1 遥测数据收集

```typescript
// 基于E1函数的遥测实现
class TelemetryManager {
  private events: TelemetryEvent[] = [];
  private batchSize = 100;
  private flushInterval = 30000; // 30秒
  
  logEvent(eventName: string, properties: Record<string, any>): void {
    const event: TelemetryEvent = {
      name: eventName,
      properties,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      userId: this.getUserId()
    };
    
    this.events.push(event);
    
    // 批量发送
    if (this.events.length >= this.batchSize) {
      this.flush();
    }
  }
  
  // 关键事件记录
  logToolUsage(toolName: string, duration: number, success: boolean): void {
    this.logEvent('tool_usage', {
      toolName,
      duration,
      success,
      concurrentTools: this.getConcurrentToolCount()
    });
  }
  
  logModelFallback(originalModel: string, fallbackModel: string): void {
    this.logEvent('model_fallback', {
      originalModel,
      fallbackModel,
      reason: 'api_error'
    });
  }
  
  logContextSize(size: ContextSizeMetrics): void {
    this.logEvent('context_size', {
      directoryStructureSize: size.directoryStructure,
      gitStatusSize: size.gitStatus,
      claudeMdSize: size.claudeMd,
      totalSize: size.total,
      projectFileCount: size.projectFileCount
    });
  }
}
```

### 8.2 性能监控

```typescript
class PerformanceMonitor {
  private metrics = new Map<string, PerformanceMetric>();
  
  startOperation(operationId: string, operationType: string): void {
    this.metrics.set(operationId, {
      type: operationType,
      startTime: performance.now(),
      memoryStart: process.memoryUsage()
    });
  }
  
  endOperation(operationId: string, success: boolean = true): PerformanceMetric {
    const metric = this.metrics.get(operationId);
    if (!metric) {
      throw new Error(`Operation ${operationId} not found`);
    }
    
    const endTime = performance.now();
    const memoryEnd = process.memoryUsage();
    
    const completedMetric: PerformanceMetric = {
      ...metric,
      endTime,
      duration: endTime - metric.startTime,
      memoryEnd,
      memoryDelta: {
        rss: memoryEnd.rss - metric.memoryStart.rss,
        heapUsed: memoryEnd.heapUsed - metric.memoryStart.heapUsed,
        heapTotal: memoryEnd.heapTotal - metric.memoryStart.heapTotal
      },
      success
    };
    
    this.metrics.delete(operationId);
    this.recordMetric(completedMetric);
    
    return completedMetric;
  }
}
```

## 9. 测试策略设计

### 9.1 单元测试设计

```typescript
// 工具测试示例
describe('ReadTool', () => {
  let readTool: ReadTool;
  let mockFileSystem: MockFileSystem;
  
  beforeEach(() => {
    mockFileSystem = new MockFileSystem();
    readTool = new ReadTool(mockFileSystem);
  });
  
  test('should read file content successfully', async () => {
    // Arrange
    const filePath = '/test/file.txt';
    const expectedContent = 'Hello, World!';
    mockFileSystem.setFileContent(filePath, expectedContent);
    
    // Act
    const result = await readTool.execute({ filePath });
    
    // Assert
    expect(result.success).toBe(true);
    expect(result.content).toBe(expectedContent);
  });
  
  test('should handle file not found error', async () => {
    // Arrange
    const filePath = '/nonexistent/file.txt';
    
    // Act & Assert
    await expect(readTool.execute({ filePath }))
      .rejects.toThrow('File not found');
  });
});

// Agent主循环测试
describe('AgentCore', () => {
  let agentCore: AgentCore;
  let mockLLMClient: MockLLMClient;
  
  beforeEach(() => {
    mockLLMClient = new MockLLMClient();
    agentCore = new AgentCore(mockLLMClient);
  });
  
  test('should handle recursive calls correctly', async () => {
    // 测试递归调用机制
    const messages = [{ role: 'user', content: 'Test message' }];
    const responses: any[] = [];
    
    for await (const chunk of agentCore.mainLoop(messages, config, context)) {
      responses.push(chunk);
      if (responses.length > 5) break; // 防止无限循环
    }
    
    expect(responses.length).toBeGreaterThan(0);
  });
});
```

### 9.2 集成测试设计

```typescript
// MCP集成测试
describe('MCP Integration', () => {
  let mcpManager: MCPManager;
  let testServer: TestMCPServer;
  
  beforeAll(async () => {
    testServer = new TestMCPServer();
    await testServer.start();
    
    mcpManager = new MCPManager();
    await mcpManager.addServer('test-server', {
      transport: 'http',
      baseUrl: testServer.url
    });
  });
  
  afterAll(async () => {
    await testServer.stop();
  });
  
  test('should discover and execute MCP tools', async () => {
    // 测试工具发现
    const tools = await mcpManager.discoverTools('test-server');
    expect(tools.length).toBeGreaterThan(0);
    
    // 测试工具执行
    const result = await mcpManager.executeTool('test-server', 'echo', { 
      message: 'Hello MCP' 
    });
    expect(result.output).toBe('Hello MCP');
  });
});
```

### 9.3 端到端测试设计

```typescript
// 完整用户流程测试
describe('End-to-End User Flows', () => {
  let app: CLIApplication;
  
  beforeEach(async () => {
    app = new CLIApplication();
    await app.initialize();
  });
  
  test('complete coding assistance workflow', async () => {
    // 1. 用户输入编程任务
    const userRequest = "创建一个计算斐波那契数列的函数";
    const response = await app.processUserInput(userRequest);
    
    // 2. 验证系统调用了相应工具
    expect(response.toolsUsed).toContain('Write');
    expect(response.filesCreated.length).toBeGreaterThan(0);
    
    // 3. 验证生成的代码
    const generatedCode = response.filesCreated[0].content;
    expect(generatedCode).toContain('fibonacci');
    expect(generatedCode).toContain('function');
    
    // 4. 测试代码执行
    const testResult = await app.processUserInput("运行刚才生成的代码");
    expect(testResult.success).toBe(true);
  });
  
  test('session management workflow', async () => {
    // 测试会话保存和恢复
    const sessionId = await app.saveCurrentSession();
    expect(sessionId).toBeDefined();
    
    await app.clearSession();
    const restoredSession = await app.resumeSession(sessionId);
    
    expect(restoredSession.messages.length).toBeGreaterThan(0);
  });
});
```

## 10. 部署和运维设计

### 10.1 构建和打包

```typescript
// 构建配置
const buildConfig: BuildConfig = {
  entry: 'src/cli.ts',
  output: {
    path: 'dist',
    filename: 'claude.js'
  },
  target: 'node18',
  externals: {
    // 排除大型依赖，使用动态导入
    'sharp': 'commonjs sharp',
    'puppeteer': 'commonjs puppeteer'
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};

// npm发布配置
const packageConfig = {
  name: 'open-claude-code',
  version: '1.0.0',
  bin: {
    'claude': './dist/claude.js'
  },
  engines: {
    node: '>=18.0.0'
  },
  dependencies: {
    // 只包含运行时必需的依赖
  },
  peerDependencies: {
    // 可选的增强功能依赖
  }
};
```

### 10.2 CI/CD流水线

```yaml
# GitHub Actions配置示例
name: Build and Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, windows-latest, macos-latest]
    
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build
    
    - name: E2E tests
      run: npm run test:e2e

  publish:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        registry-url: 'https://registry.npmjs.org'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Publish to npm
      run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 10.3 监控和运维

```typescript
// 健康检查服务
class HealthCheckService {
  async performHealthCheck(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkLLMAPIConnection(),
      this.checkMCPServers(),
      this.checkFileSystemAccess(),
      this.checkMemoryUsage(),
      this.checkDiskSpace()
    ]);
    
    const results = checks.map((check, index) => ({
      name: this.checkNames[index],
      status: check.status === 'fulfilled' ? 'healthy' : 'unhealthy',
      details: check.status === 'fulfilled' ? check.value : check.reason
    }));
    
    return {
      overall: results.every(r => r.status === 'healthy') ? 'healthy' : 'degraded',
      checks: results,
      timestamp: new Date().toISOString()
    };
  }
  
  async checkLLMAPIConnection(): Promise<APIHealthStatus> {
    try {
      const response = await this.llmClient.ping();
      return {
        status: 'healthy',
        responseTime: response.responseTime,
        model: response.model
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}
```

这个TDD文档提供了Open Claude Code项目的完整技术实现框架，涵盖了从核心架构到具体实现的所有技术细节。基于这个文档，开发团队可以快速开始项目开发并确保技术实现的一致性和质量。

---

*本TDD基于Claude Code v1.0.34的深度逆向分析，确保技术方案的可行性和准确性。*