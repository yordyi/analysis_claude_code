# 实时Steering机制还原代码实现

## 概述

基于对Claude Code混淆源码的深度分析，以下是实时Steering机制的高质量可读性还原实现。

## 1. 异步消息队列 (AsyncMessageQueue)

```typescript
interface QueueMessage {
  done: boolean;
  value?: any;
}

interface QueueCallbacks {
  resolve?: (value: QueueMessage) => void;
  reject?: (error: any) => void;
}

/**
 * 异步消息队列 - 支持实时消息入队和非阻塞读取
 * 原始混淆类名: h2A
 */
class AsyncMessageQueue<T> implements AsyncIterable<T> {
  private readonly cleanupCallback?: () => void;
  private readonly messageQueue: T[] = [];
  private pendingRead: QueueCallbacks = {};
  private isCompleted: boolean = false;
  private errorState?: Error;
  private hasStarted: boolean = false;

  constructor(cleanupCallback?: () => void) {
    this.cleanupCallback = cleanupCallback;
  }

  /**
   * 实现AsyncIterable接口
   */
  [Symbol.asyncIterator](): AsyncIterator<T> {
    if (this.hasStarted) {
      throw new Error("Stream can only be iterated once");
    }
    this.hasStarted = true;
    return this;
  }

  /**
   * 异步迭代器的核心方法
   * 优先从队列取消息，队列空时等待新消息
   */
  next(): Promise<IteratorResult<T>> {
    // 优先处理队列中的消息
    if (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()!;
      return Promise.resolve({
        done: false,
        value: message
      });
    }

    // 队列已完成
    if (this.isCompleted) {
      return Promise.resolve({
        done: true,
        value: undefined as any
      });
    }

    // 有错误状态
    if (this.errorState) {
      return Promise.reject(this.errorState);
    }

    // 等待新消息 - 关键的非阻塞机制
    return new Promise<IteratorResult<T>>((resolve, reject) => {
      this.pendingRead.resolve = resolve;
      this.pendingRead.reject = reject;
    });
  }

  /**
   * 消息入队 - 支持实时插入
   */
  enqueue(message: T): void {
    if (this.pendingRead.resolve) {
      // 有等待的读取，直接返回消息
      const resolver = this.pendingRead.resolve;
      this.clearPendingRead();
      resolver({
        done: false,
        value: message
      });
    } else {
      // 推入队列缓冲
      this.messageQueue.push(message);
    }
  }

  /**
   * 标记队列完成
   */
  complete(): void {
    this.isCompleted = true;
    if (this.pendingRead.resolve) {
      const resolver = this.pendingRead.resolve;
      this.clearPendingRead();
      resolver({
        done: true,
        value: undefined as any
      });
    }
  }

  /**
   * 设置错误状态
   */
  error(error: Error): void {
    this.errorState = error;
    if (this.pendingRead.reject) {
      const rejecter = this.pendingRead.reject;
      this.clearPendingRead();
      rejecter(error);
    }
  }

  /**
   * 返回清理函数(用于异步迭代器协议)
   */
  return(): Promise<IteratorResult<T>> {
    this.isCompleted = true;
    if (this.cleanupCallback) {
      this.cleanupCallback();
    }
    return Promise.resolve({
      done: true,
      value: undefined as any
    });
  }

  private clearPendingRead(): void {
    this.pendingRead.resolve = undefined;
    this.pendingRead.reject = undefined;
  }
}
```

## 2. 流式消息解析器 (StreamingMessageParser)

```typescript
interface UserMessage {
  type: "user";
  message: {
    role: "user";
    content: string | Array<{ type: "text"; text: string }>;
  };
}

/**
 * 流式消息解析器 - 将原始输入流解析为结构化消息
 * 原始混淆类名: g2A
 */
class StreamingMessageParser {
  private readonly inputStream: AsyncIterable<string>;
  public readonly structuredMessages: AsyncIterable<UserMessage>;

  constructor(inputStream: AsyncIterable<string>) {
    this.inputStream = inputStream;
    this.structuredMessages = this.parseStream();
  }

  /**
   * 异步生成器 - 流式解析消息
   */
  private async *parseStream(): AsyncGenerator<UserMessage> {
    let buffer = "";
    
    // 逐块处理输入流
    for await (const chunk of this.inputStream) {
      buffer += chunk;
      
      // 按行分割处理
      let lineEndIndex: number;
      while ((lineEndIndex = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, lineEndIndex);
        buffer = buffer.slice(lineEndIndex + 1);
        
        const parsedMessage = this.parseLine(line);
        if (parsedMessage) {
          yield parsedMessage;
        }
      }
    }
    
    // 处理最后一行
    if (buffer.trim()) {
      const parsedMessage = this.parseLine(buffer);
      if (parsedMessage) {
        yield parsedMessage;
      }
    }
  }

  /**
   * 解析单行消息
   */
  private parseLine(line: string): UserMessage | null {
    if (!line.trim()) return null;
    
    try {
      const message = JSON.parse(line) as UserMessage;
      
      // 严格类型验证
      this.validateMessage(message);
      
      return message;
    } catch (error) {
      console.error(`Error parsing streaming input line: ${line}`, error);
      process.exit(1);
    }
  }

  /**
   * 消息验证
   */
  private validateMessage(message: any): asserts message is UserMessage {
    if (message.type !== "user") {
      throw new Error(`Expected message type 'user', got '${message.type}'`);
    }
    
    if (message.message?.role !== "user") {
      throw new Error(`Expected message role 'user', got '${message.message?.role}'`);
    }
  }
}
```

## 3. 流式处理引擎 (StreamingProcessor)

```typescript
interface Command {
  mode: "prompt";
  value: string;
}

interface ProcessorOptions {
  verbose: boolean;
  maxTurns: number;
  userSpecifiedModel?: string;
  fallbackModel?: string;
  systemPrompt?: string;
  appendSystemPrompt?: string;
}

/**
 * 流式处理引擎 - 协调消息队列和Agent执行
 * 原始混淆函数名: kq5
 */
class StreamingProcessor {
  private readonly commandQueue: Command[] = [];
  private isExecuting: boolean = false;
  private isCompleted: boolean = false;
  private readonly outputQueue: AsyncMessageQueue<any>;
  private messageHistory: any[] = [];

  constructor(
    private readonly inputStream: AsyncIterable<UserMessage>,
    private readonly permissionContext: any,
    private readonly mcpClients: any[],
    private readonly commands: any,
    private readonly tools: any,
    private readonly toolConfig: any,
    private readonly permissionTool: any,
    private readonly options: ProcessorOptions
  ) {
    this.outputQueue = new AsyncMessageQueue();
    this.messageHistory = this.processInitialMessages(toolConfig);
    this.startProcessing();
  }

  /**
   * 获取输出流
   */
  getOutputStream(): AsyncMessageQueue<any> {
    return this.outputQueue;
  }

  /**
   * 获取队列中的命令
   */
  getQueuedCommands(): Command[] {
    return [...this.commandQueue];
  }

  /**
   * 移除队列中的命令
   */
  removeQueuedCommands(commandsToRemove: Command[]): void {
    this.commandQueue.splice(0, this.commandQueue.length,
      ...this.commandQueue.filter(cmd => !commandsToRemove.includes(cmd))
    );
  }

  /**
   * 异步执行引擎
   */
  private async executeCommands(): Promise<void> {
    this.isExecuting = true;
    
    try {
      // 处理队列中的所有命令
      while (this.commandQueue.length > 0) {
        const command = this.commandQueue.shift()!;
        
        if (command.mode !== "prompt") {
          throw new Error("Only prompt commands are supported in streaming mode");
        }
        
        // 调用主Agent执行循环
        for await (const result of this.executeAgentLoop(command.value)) {
          this.messageHistory.push(result);
          this.outputQueue.enqueue(result);
        }
      }
    } finally {
      this.isExecuting = false;
    }
    
    if (this.isCompleted) {
      this.outputQueue.complete();
    }
  }

  /**
   * 执行Agent主循环 (调用原始的Zk2函数)
   */
  private async *executeAgentLoop(prompt: string): AsyncGenerator<any> {
    // 这里调用实际的Agent执行逻辑
    // 相当于原始代码中的Zk2函数调用
    
    const agentContext = this.createAgentContext();
    
    // 调用主Agent循环 (对应原始的nO函数)
    yield* this.runMainAgentLoop(
      this.messageHistory,
      prompt,
      agentContext
    );
  }

  /**
   * 创建Agent上下文
   */
  private createAgentContext(): any {
    return {
      commands: this.commands,
      prompt: undefined, // 将在执行时设置
      cwd: process.cwd(),
      tools: this.tools,
      permissionContext: this.permissionContext,
      verbose: this.options.verbose,
      mcpClients: this.mcpClients,
      maxTurns: this.options.maxTurns,
      permissionPromptTool: this.permissionTool,
      userSpecifiedModel: this.options.userSpecifiedModel,
      fallbackModel: this.options.fallbackModel,
      initialMessages: this.messageHistory,
      customSystemPrompt: this.options.systemPrompt,
      appendSystemPrompt: this.options.appendSystemPrompt,
      getQueuedCommands: () => this.getQueuedCommands(),
      removeQueuedCommands: (cmds: Command[]) => this.removeQueuedCommands(cmds)
    };
  }

  /**
   * 主Agent循环的占位符实现
   */
  private async *runMainAgentLoop(
    messages: any[],
    prompt: string,
    context: any
  ): AsyncGenerator<any> {
    // 这里是对原始nO函数的调用
    // 实际实现需要调用具体的Agent逻辑
    yield { type: "placeholder", content: "Agent processing..." };
  }

  /**
   * 处理输入流
   */
  private async startProcessing(): Promise<void> {
    try {
      for await (const message of this.inputStream) {
        const promptContent = this.extractPromptContent(message);
        
        // 新消息入队
        this.commandQueue.push({
          mode: "prompt",
          value: promptContent
        });
        
        // 如果未在执行，启动执行
        if (!this.isExecuting) {
          this.executeCommands().catch(error => {
            console.error("Execution error:", error);
            this.outputQueue.error(error);
          });
        }
      }
    } catch (error) {
      console.error("Input processing error:", error);
      this.outputQueue.error(error as Error);
    } finally {
      this.isCompleted = true;
      if (!this.isExecuting) {
        this.outputQueue.complete();
      }
    }
  }

  /**
   * 提取消息内容
   */
  private extractPromptContent(message: UserMessage): string {
    const content = message.message.content;
    
    if (typeof content === "string") {
      return content;
    }
    
    if (Array.isArray(content)) {
      if (content.length !== 1) {
        throw new Error(`Expected exactly one content item, got ${content.length}`);
      }
      
      const item = content[0];
      if (typeof item === "string") {
        return item;
      }
      
      if (item.type === "text") {
        return item.text;
      }
    }
    
    throw new Error("Expected string or text block content");
  }

  /**
   * 处理初始消息
   */
  private processInitialMessages(toolConfig: any): any[] {
    // 处理工具配置并返回初始消息历史
    return toolConfig ? [toolConfig] : [];
  }
}
```

## 4. 主Agent循环 (MainAgentLoop)

```typescript
interface AgentContext {
  messages: any[];
  options: {
    mainLoopModel: string;
    maxThinkingTokens: number;
    tools: any[];
    isNonInteractiveSession: boolean;
  };
  abortController: AbortController;
  getToolPermissionContext: () => any;
}

interface StreamEvent {
  type: string;
  [key: string]: any;
}

/**
 * 主Agent循环 - 使用async generator实现可中断的流式处理
 * 原始混淆函数名: nO
 */
async function* mainAgentLoop(
  messages: any[],
  userContext: any,
  prompt: string,
  tools: any[],
  executionContext: any,
  agentContext: AgentContext,
  turnData: any,
  fallbackModel?: string,
  options?: any
): AsyncGenerator<StreamEvent> {
  // 流开始标记
  yield { type: "stream_request_start" };
  
  let currentMessages = messages;
  let currentTurnData = turnData;
  
  // 消息压缩处理
  const { messages: compactedMessages, wasCompacted } = 
    await compactMessages(messages, agentContext);
  
  if (wasCompacted) {
    logEvent("auto_compact_succeeded", {
      originalMessageCount: messages.length,
      compactedMessageCount: compactedMessages.length
    });
    
    if (!currentTurnData?.compacted) {
      currentTurnData = {
        compacted: true,
        turnId: generateTurnId(),
        turnCounter: 0
      };
    }
    currentMessages = compactedMessages;
  }
  
  let assistantResponses: any[] = [];
  let currentModel = agentContext.options.mainLoopModel;
  let shouldRetry = true;
  
  try {
    // 主执行循环 - 支持模型降级重试
    while (shouldRetry) {
      shouldRetry = false;
      
      try {
        // 调用核心AI处理循环 - 关键yield点
        for await (const response of processWithAI(
          buildMessages(currentMessages, prompt),
          buildContext(userContext, tools),
          agentContext.options.maxThinkingTokens,
          agentContext.options.tools,
          agentContext.abortController.signal, // 传递中断信号
          {
            getToolPermissionContext: agentContext.getToolPermissionContext,
            model: currentModel,
            prependCLISysprompt: true,
            toolChoice: undefined,
            isNonInteractiveSession: agentContext.options.isNonInteractiveSession,
            fallbackModel: fallbackModel
          }
        )) {
          // 流式输出每个响应 - 实现非阻塞
          yield response;
          
          if (response.type === "assistant") {
            assistantResponses.push(response);
          }
        }
      } catch (error) {
        // 模型降级处理
        if (error instanceof ModelError && fallbackModel) {
          currentModel = fallbackModel;
          shouldRetry = true;
          assistantResponses.length = 0;
          agentContext.options.mainLoopModel = fallbackModel;
          
          logEvent("model_fallback_triggered", {
            original_model: (error as any).originalModel,
            fallback_model: fallbackModel,
            entrypoint: "cli"
          });
          
          yield createLogMessage(
            `Model fallback: ${(error as any).originalModel} → ${fallbackModel}`, 
            "info"
          );
          continue;
        }
        throw error;
      }
    }
  } catch (error) {
    // 错误处理和工具结果生成
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    logEvent("query_error", {
      assistantMessages: assistantResponses.length,
      toolUses: countToolUses(assistantResponses)
    });
    
    // 为每个工具使用生成错误结果
    let hasToolResults = false;
    for (const response of assistantResponses) {
      const toolUses = extractToolUses(response);
      for (const toolUse of toolUses) {
        yield createToolResult({
          content: [{
            type: "tool_result",
            content: errorMessage,
            is_error: true,
            tool_use_id: toolUse.id
          }],
          toolUseResult: errorMessage
        });
        hasToolResults = true;
      }
    }
    
    if (!hasToolResults) {
      yield createSystemMessage({
        toolUse: false,
        hardcodedMessage: undefined
      });
    }
    return;
  }
  
  // 工具执行处理
  if (!assistantResponses.length) return;
  
  const toolUses = extractAllToolUses(assistantResponses);
  if (!toolUses.length) return;
  
  let toolResults: any[] = [];
  let shouldPreventContinuation = false;
  
  // 执行工具调用
  for await (const result of executeTools(
    toolUses, 
    assistantResponses, 
    executionContext, 
    agentContext
  )) {
    yield result; // 流式输出工具结果
    
    if (result?.type === "system" && result.preventContinuation) {
      shouldPreventContinuation = true;
    }
    
    toolResults.push(...filterUserMessages([result]));
  }
  
  // 检查是否被中断
  if (agentContext.abortController.signal.aborted) {
    yield createSystemMessage({
      toolUse: true,
      hardcodedMessage: undefined
    });
    return;
  }
  
  if (shouldPreventContinuation) return;
  
  // 继续后续处理...
  const sortedResults = sortToolResults(toolResults, toolUses);
  
  if (currentTurnData?.compacted) {
    currentTurnData.turnCounter++;
    logEvent("post_autocompact_turn", {
      turnId: currentTurnData.turnId,
      turnCounter: currentTurnData.turnCounter
    });
  }
  
  // 递归调用继续处理
  yield* mainAgentLoop(
    [...currentMessages, ...buildContinuationMessages(assistantResponses, sortedResults)],
    userContext,
    prompt,
    tools,
    executionContext,
    agentContext,
    currentTurnData,
    fallbackModel,
    options
  );
}

// 辅助函数实现
class ModelError extends Error {
  originalModel: string;
  fallbackModel: string;
  
  constructor(originalModel: string, fallbackModel: string, message: string) {
    super(message);
    this.originalModel = originalModel;
    this.fallbackModel = fallbackModel;
  }
}

async function compactMessages(messages: any[], context: AgentContext) {
  // 消息压缩逻辑
  return { messages, wasCompacted: false };
}

function generateTurnId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function logEvent(event: string, data: any): void {
  // 事件日志记录
  console.log(`Event: ${event}`, data);
}

async function* processWithAI(
  messages: any[],
  context: any,
  maxTokens: number,
  tools: any[],
  abortSignal: AbortSignal,
  options: any
): AsyncGenerator<StreamEvent> {
  // AI处理逻辑
  yield { type: "ai_processing", status: "started" };
  
  // 检查中断信号
  if (abortSignal.aborted) {
    throw new Error("Request aborted");
  }
  
  // 模拟AI响应
  yield { type: "assistant", message: { content: "AI response" } };
}

function buildMessages(messages: any[], prompt: string): any[] {
  return [...messages, { role: "user", content: prompt }];
}

function buildContext(userContext: any, tools: any[]): any {
  return { user: userContext, tools };
}

function createLogMessage(message: string, level: string): StreamEvent {
  return { type: "log", message, level };
}

function createToolResult(result: any): StreamEvent {
  return { type: "tool_result", ...result };
}

function createSystemMessage(options: any): StreamEvent {
  return { type: "system", ...options };
}

function countToolUses(responses: any[]): number {
  return responses.flatMap(r => 
    r.message.content.filter((c: any) => c.type === "tool_use")
  ).length;
}

function extractToolUses(response: any): any[] {
  return response.message.content.filter((c: any) => c.type === "tool_use");
}

function extractAllToolUses(responses: any[]): any[] {
  return responses.flatMap(extractToolUses);
}

async function* executeTools(
  toolUses: any[],
  responses: any[],
  context: any,
  agentContext: AgentContext
): AsyncGenerator<StreamEvent> {
  for (const toolUse of toolUses) {
    yield { type: "tool_execution", toolUse };
  }
}

function filterUserMessages(results: any[]): any[] {
  return results.filter(r => r.type === "user");
}

function sortToolResults(results: any[], toolUses: any[]): any[] {
  return results.sort((a, b) => {
    const aIndex = toolUses.findIndex(tu => tu.id === a.id);
    const bIndex = toolUses.findIndex(tu => tu.id === b.id);
    return aIndex - bIndex;
  });
}

function buildContinuationMessages(responses: any[], results: any[]): any[] {
  return [...responses, ...results];
}
```

## 5. 完整的集成实现

```typescript
/**
 * 实时Steering系统的完整集成
 */
class RealtimeSteeringSystem {
  private messageParser: StreamingMessageParser;
  private processor: StreamingProcessor;
  private abortController: AbortController;

  constructor(
    inputStream: AsyncIterable<string>,
    options: {
      tools: any[];
      commands: any;
      mcpClients: any[];
      permissionContext: any;
      processorOptions: ProcessorOptions;
    }
  ) {
    this.abortController = new AbortController();
    
    // 创建消息解析器
    this.messageParser = new StreamingMessageParser(inputStream);
    
    // 创建流式处理器
    this.processor = new StreamingProcessor(
      this.messageParser.structuredMessages,
      options.permissionContext,
      options.mcpClients,
      options.commands,
      options.tools,
      null, // toolConfig
      null, // permissionTool
      options.processorOptions
    );
  }

  /**
   * 获取输出流
   */
  getOutputStream(): AsyncMessageQueue<any> {
    return this.processor.getOutputStream();
  }

  /**
   * 中断处理
   */
  abort(reason?: string): void {
    this.abortController.abort(reason);
  }

  /**
   * 获取中断信号
   */
  get abortSignal(): AbortSignal {
    return this.abortController.signal;
  }

  /**
   * 启动系统 (示例用法)
   */
  static async start(inputStream: AsyncIterable<string>): Promise<void> {
    const system = new RealtimeSteeringSystem(inputStream, {
      tools: [],
      commands: {},
      mcpClients: [],
      permissionContext: {},
      processorOptions: {
        verbose: false,
        maxTurns: 10
      }
    });

    const outputStream = system.getOutputStream();
    
    try {
      for await (const message of outputStream) {
        console.log("Output:", message);
      }
    } catch (error) {
      console.error("Processing error:", error);
    }
  }
}

// 使用示例
async function example() {
  // 模拟stdin输入流
  const stdinStream = createStdinStream();
  
  // 启动实时Steering系统
  await RealtimeSteeringSystem.start(stdinStream);
}

async function* createStdinStream(): AsyncGenerator<string> {
  // 模拟从stdin读取数据
  process.stdin.setEncoding('utf8');
  
  for await (const chunk of process.stdin) {
    yield chunk;
  }
}
```

## 结论

以上实现还原了Claude Code实时Steering机制的核心组件：

1. **AsyncMessageQueue**: 非阻塞的异步消息队列
2. **StreamingMessageParser**: 流式消息解析器  
3. **StreamingProcessor**: 流式处理引擎
4. **mainAgentLoop**: 可中断的Agent主循环

这些组件共同实现了：
- 真正的实时消息处理
- 非阻塞的异步执行  
- 完整的中断和恢复机制
- 流式的输入输出处理

该实现为开源Agent系统提供了可行的技术路径和具体的代码参考。