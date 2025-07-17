# 阶段2：Agent核心引擎和工具系统施工指南

## 📋 面向对象
**本文档面向：菜鸟级别的初级程序员**
- 无需深度思考，严格按步骤执行
- 每个步骤都有明确的文件操作指令
- 包含必要的代码模板和配置

## 🎯 阶段目标
基于逆向分析结果，实现Claude Code的核心差异化技术：
- ✅ **实时Steering机制** (h2A异步消息队列系统)
- ✅ **Agent主循环引擎** (nO async generator函数)
- ✅ **分层多Agent架构** (Task工具和I2A SubAgent实例化)
- ✅ **工具执行引擎** (MH1工具引擎和gW5并发控制)
- ✅ **Edit工具强制读取机制** (9层验证和readFileState管理)

**预期交付成果**：
- ✅ h2A异步消息队列完整实现
- ✅ nO主Agent循环engine
- ✅ 15个内置工具完整实现
- ✅ Task工具分层多Agent架构
- ✅ 企业级安全机制

**工作时间**：3周 (120工时)

---

## 📁 第一周：实时Steering机制和Agent核心

### 步骤2.1: 创建h2A异步消息队列系统
**基于逆向分析的h2A类精确实现**

**文件路径**: `src/core/message-queue.ts`
**文件内容**:
```typescript
/**
 * h2A异步消息队列系统
 * 基于逆向分析的Claude Code h2A类精确实现
 * 支持实时Steering机制的核心组件
 */

export class h2A implements AsyncIterator<any> {
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

  // 核心异步迭代器方法 - 基于逆向分析的精确实现
  async next(): Promise<IteratorResult<any>> {
    // 优先从队列中取消息
    if (this.queue.length > 0) {
      const value = this.queue.shift();
      return { value, done: false };
    }
    
    // 队列完成时返回结束标志
    if (this.isDone) {
      return { value: undefined, done: true };
    }
    
    // 有错误时拒绝Promise
    if (this.hasError) {
      throw this.hasError;
    }
    
    // 等待新消息 - 关键的非阻塞机制
    return new Promise((resolve, reject) => {
      this.readResolve = resolve;
      this.readReject = reject;
    });
  }

  // 消息入队 - 支持实时消息插入
  enqueue(message: any): void {
    if (this.isDone) return;
    
    if (this.readResolve) {
      // 如果有等待的读取，直接返回消息
      const callback = this.readResolve;
      this.readResolve = undefined;
      this.readReject = undefined;
      callback({ value: message, done: false });
    } else {
      // 否则推入队列缓冲
      this.queue.push(message);
    }
  }

  // 完成队列
  complete(): void {
    this.isDone = true;
    if (this.readResolve) {
      const callback = this.readResolve;
      this.readResolve = undefined;
      this.readReject = undefined;
      callback({ value: undefined, done: true });
    }
    
    // 执行清理函数
    if (this.returned) {
      this.returned();
    }
  }

  // 错误处理
  error(err: any): void {
    this.hasError = err;
    if (this.readReject) {
      const callback = this.readReject;
      this.readResolve = undefined;
      this.readReject = undefined;
      callback(err);
    }
  }

  // 状态检查方法
  get isStarted(): boolean {
    return this.started;
  }

  get isCompleted(): boolean {
    return this.isDone;
  }

  get queueSize(): number {
    return this.queue.length;
  }
}

/**
 * 消息解析器 g2A类
 * 基于逆向分析的流式消息解析实现
 */
export class g2A {
  private input: AsyncIterable<string>;
  private structuredInput: AsyncGenerator<any>;

  constructor(inputStream: AsyncIterable<string>) {
    this.input = inputStream;
    this.structuredInput = this.read();
  }

  // 异步生成器 - 流式处理输入
  async *read(): AsyncGenerator<any> {
    let buffer = "";
    
    // 逐字符处理输入流
    for await (const chunk of this.input) {
      buffer += chunk;
      let lineEnd: number;
      
      // 按行分割处理
      while ((lineEnd = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, lineEnd);
        buffer = buffer.slice(lineEnd + 1);
        
        const parsed = this.processLine(line);
        if (parsed) yield parsed;
      }
    }
    
    // 处理最后一行
    if (buffer) {
      const parsed = this.processLine(buffer);
      if (parsed) yield parsed;
    }
  }

  // 单行消息解析
  private processLine(line: string): any | null {
    try {
      const message = JSON.parse(line);
      
      // 严格类型验证 - 基于逆向分析的验证逻辑
      if (message.type !== "user") {
        throw new Error(`Expected message type 'user', got '${message.type}'`);
      }
      
      if (message.message?.role !== "user") {
        throw new Error(`Expected message role 'user', got '${message.message?.role}'`);
      }
      
      return message;
    } catch (error) {
      console.error(`Error parsing streaming input line: ${line}: ${error}`);
      // 在逆向分析中，解析失败时直接退出进程
      process.exit(1);
    }
  }

  // 获取结构化输入流
  getStructuredInput(): AsyncGenerator<any> {
    return this.structuredInput;
  }
}

/**
 * 实时Steering监听系统
 * 基于逆向分析的stdin监听机制
 */
export class SteeringListener {
  private steeringQueue: h2A;
  private stdinListener?: NodeJS.ReadStream;
  private isListening = false;

  constructor(steeringQueue: h2A) {
    this.steeringQueue = steeringQueue;
  }

  // 启动stdin实时监听
  startListening(): void {
    if (this.isListening) return;
    
    this.stdinListener = process.stdin;
    this.stdinListener.setRawMode?.(true);
    this.stdinListener.resume();
    this.isListening = true;
    
    this.stdinListener.on('data', (chunk) => {
      try {
        const input = chunk.toString('utf8');
        
        // 检查是否是实时Steering输入
        if (this.isSteeringInput(input)) {
          const steeringMessage = this.parseSteeringInput(input);
          this.steeringQueue.enqueue({
            type: 'steering',
            content: steeringMessage,
            timestamp: Date.now(),
            priority: 1 // 用户实时引导优先级
          });
        }
      } catch (error) {
        console.error('Steering input parse error:', error);
      }
    });
  }

  // 停止监听
  stopListening(): void {
    if (this.stdinListener && this.isListening) {
      this.stdinListener.pause();
      this.stdinListener.setRawMode?.(false);
      this.isListening = false;
    }
  }

  // 判断是否为实时引导输入
  private isSteeringInput(input: string): boolean {
    // 基于逆向分析的特殊控制字符检测
    return input.includes('\u001b') || // ESC键
           input.charCodeAt(0) === 3 || // Ctrl+C
           input.includes('\r') ||       // Enter键
           input.length > 1;             // 多字符输入
  }

  // 解析实时引导输入
  private parseSteeringInput(input: string): string {
    // 处理特殊按键组合
    if (input.includes('\u001b[')) {
      return this.handleSpecialKeys(input);
    }
    
    return input.trim();
  }

  // 处理特殊按键
  private handleSpecialKeys(input: string): string {
    // 简化处理：返回清理后的输入
    return input.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '').trim();
  }
}
```

### 步骤2.2: 创建nO主Agent循环引擎
**基于逆向分析的async generator实现**

**文件路径**: `src/core/agent-core.ts`
**文件内容**:
```typescript
/**
 * Agent核心引擎
 * 基于逆向分析的nO async generator函数实现
 * 集成实时Steering机制和模型降级策略
 */

import { h2A, SteeringListener } from './message-queue';
import type { Message, AgentConfig, AgentContext, AgentResult } from '../types/agent';
import type { ToolCall, ToolResult } from '../types/tool';

export class AgentCore {
  private steeringQueue: h2A;
  private steeringListener: SteeringListener;
  private abortController: AbortController;
  private messageHistory: Message[] = [];
  private config: AgentConfig;
  private context: AgentContext;

  constructor(config: AgentConfig, context: AgentContext) {
    this.config = config;
    this.context = context;
    this.abortController = new AbortController();
    this.steeringQueue = new h2A(this.cleanup.bind(this));
    this.steeringListener = new SteeringListener(this.steeringQueue);
  }

  /**
   * nO主循环 - 基于逆向分析的async generator实现
   * 支持实时Steering和模型降级机制
   */
  async* executeMainLoop(
    messages: Message[],
    prompt?: string
  ): AsyncGenerator<AgentResult> {
    // 1. 启动实时Steering机制
    if (this.config.enableSteering) {
      this.steeringListener.startListening();
    }

    // 2. 流开始标记
    yield {
      success: true,
      message: 'stream_request_start',
      data: { type: 'stream_start' }
    };

    let currentMessages = [...messages];
    if (prompt) {
      currentMessages.push({
        id: Date.now().toString(),
        role: 'user',
        content: prompt,
        timestamp: Date.now()
      });
    }

    // 3. 消息压缩检查
    const { messages: compactedMessages, wasCompacted } = 
      await this.compressMessages(currentMessages);
    
    if (wasCompacted) {
      yield {
        success: true,
        message: 'context_compacted',
        data: {
          originalCount: currentMessages.length,
          compactedCount: compactedMessages.length
        }
      };
      currentMessages = compactedMessages;
    }

    let assistantResponses: Message[] = [];
    let currentModel = this.config.model;
    let shouldRetry = true;

    try {
      // 4. 主执行循环 - 支持模型降级重试
      while (shouldRetry) {
        shouldRetry = false;
        
        try {
          // 5. 检查实时Steering输入
          const steeringMessage = await this.checkSteeringInput();
          if (steeringMessage) {
            currentMessages.push(steeringMessage);
            yield {
              success: true,
              message: 'steering_input_received',
              data: { content: steeringMessage.content }
            };
          }

          // 6. 调用语言模型处理
          for await (const response of this.processWithAI(
            currentMessages,
            currentModel,
            this.abortController.signal
          )) {
            // 实时检查中断信号
            if (this.abortController.signal.aborted) {
              yield {
                success: false,
                message: 'execution_aborted',
                error: new Error('Execution was aborted')
              };
              return;
            }

            yield response;
            
            if (response.data?.type === 'assistant') {
              assistantResponses.push(response.data as Message);
            }
          }
        } catch (error) {
          // 7. 模型降级处理 - 基于逆向分析的降级机制
          if (this.isModelError(error) && this.config.fallbackModel) {
            currentModel = this.config.fallbackModel;
            shouldRetry = true;
            assistantResponses = [];
            
            yield {
              success: true,
              message: 'model_fallback_triggered',
              data: {
                originalModel: this.config.model,
                fallbackModel: this.config.fallbackModel,
                error: error.message
              }
            };
            continue;
          }
          throw error;
        }
      }
    } catch (error) {
      // 8. 错误处理和工具结果生成
      console.error('Agent execution error:', error);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // 为每个工具使用生成错误结果
      let hasErrorResponse = false;
      for (const response of assistantResponses) {
        if (response.metadata?.toolCalls) {
          for (const toolCall of response.metadata.toolCalls) {
            yield {
              success: false,
              message: 'tool_error',
              data: {
                toolCallId: toolCall.id,
                error: errorMessage
              },
              error: error instanceof Error ? error : new Error(errorMessage)
            };
            hasErrorResponse = true;
          }
        }
      }
      
      if (!hasErrorResponse) {
        yield {
          success: false,
          message: 'general_error',
          error: error instanceof Error ? error : new Error(errorMessage)
        };
      }
      return;
    }

    // 9. 处理工具调用
    if (assistantResponses.length > 0) {
      const toolCalls = this.extractToolCalls(assistantResponses);
      
      if (toolCalls.length > 0) {
        // 执行工具调用
        yield* this.executeTools(toolCalls, currentMessages);
        
        // 检查是否需要继续对话
        if (!this.abortController.signal.aborted && this.shouldContinue(toolCalls)) {
          // 递归调用，继续对话循环
          const updatedMessages = [...currentMessages, ...assistantResponses];
          yield* this.executeMainLoop(updatedMessages);
        }
      }
    }
  }

  // 检查实时Steering输入
  private async checkSteeringInput(): Promise<Message | null> {
    if (!this.config.enableSteering) return null;
    
    try {
      const steeringData = await Promise.race([
        this.steeringQueue.next(),
        new Promise(resolve => setTimeout(() => resolve({ value: null, done: true }), 100))
      ]) as any;
      
      if (steeringData.value) {
        return {
          id: Date.now().toString(),
          role: 'user',
          content: steeringData.value.content,
          timestamp: Date.now(),
          metadata: { steeringMessage: true }
        };
      }
    } catch (error) {
      // Steering输入失败，继续执行
      console.debug('Steering input check failed:', error);
    }
    return null;
  }

  // 消息压缩处理
  private async compressMessages(messages: Message[]): Promise<{
    messages: Message[];
    wasCompacted: boolean;
  }> {
    // 基于逆向分析的压缩阈值检查
    const totalLength = this.estimateTokenCount(messages);
    const COMPRESSION_THRESHOLD = 40000; // k11常量值
    
    if (totalLength < COMPRESSION_THRESHOLD) {
      return { messages, wasCompacted: false };
    }

    try {
      // 执行智能压缩
      const summary = await this.generateSummary(messages);
      const recentMessages = messages.slice(-10);
      const systemMessages = messages.filter(m => m.role === 'system');
      
      return {
        messages: [summary, ...systemMessages, ...recentMessages],
        wasCompacted: true
      };
    } catch (error) {
      console.warn('Message compression failed:', error);
      return { messages, wasCompacted: false };
    }
  }

  // 生成消息摘要
  private async generateSummary(messages: Message[]): Promise<Message> {
    // 基于逆向分析的AU2函数8段式摘要模板
    const summaryPrompt = this.createSummaryPrompt();
    
    // 这里应该调用LLM API生成摘要
    // 简化实现：返回一个摘要消息
    return {
      id: Date.now().toString(),
      role: 'user',
      content: `[压缩摘要] 这是对前面 ${messages.length} 条消息的智能摘要...`,
      timestamp: Date.now()
    };
  }

  // 创建摘要提示
  private createSummaryPrompt(): string {
    return `请为以下对话生成一个简洁的摘要，保留关键信息：
1. 主要的用户请求和意图
2. 重要的技术概念和代码
3. 文件操作和系统状态
4. 错误和解决方案
5. 未完成的任务
6. 当前工作上下文`;
  }

  // 模拟AI处理
  private async* processWithAI(
    messages: Message[],
    model: string,
    abortSignal: AbortSignal
  ): AsyncGenerator<AgentResult> {
    // 这里应该集成实际的LLM API调用
    // 简化实现：模拟流式响应
    yield {
      success: true,
      message: 'ai_thinking',
      data: { model, messageCount: messages.length }
    };

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (abortSignal.aborted) return;

    yield {
      success: true,
      message: 'ai_response',
      data: {
        type: 'assistant',
        id: Date.now().toString(),
        role: 'assistant',
        content: '这是AI的模拟响应',
        timestamp: Date.now()
      }
    };
  }

  // 提取工具调用
  private extractToolCalls(messages: Message[]): ToolCall[] {
    const toolCalls: ToolCall[] = [];
    
    for (const message of messages) {
      if (message.metadata?.toolCalls) {
        toolCalls.push(...message.metadata.toolCalls);
      }
    }
    
    return toolCalls;
  }

  // 执行工具调用
  private async* executeTools(
    toolCalls: ToolCall[],
    messages: Message[]
  ): AsyncGenerator<AgentResult> {
    for (const toolCall of toolCalls) {
      yield {
        success: true,
        message: 'tool_executing',
        data: {
          toolName: toolCall.name,
          toolCallId: toolCall.id
        }
      };

      // 这里会在后续步骤中实现具体的工具执行逻辑
      yield {
        success: true,
        message: 'tool_completed',
        data: {
          toolCallId: toolCall.id,
          result: 'Tool execution completed'
        }
      };
    }
  }

  // 估算token数量
  private estimateTokenCount(messages: Message[]): number {
    return messages.reduce((count, msg) => 
      count + (typeof msg.content === 'string' ? msg.content.length / 4 : 0), 0
    );
  }

  // 检查是否为模型错误
  private isModelError(error: any): boolean {
    return error.name === 'ModelError' || 
           error.message?.includes('model') ||
           error.message?.includes('API');
  }

  // 检查是否应该继续对话
  private shouldContinue(toolCalls: ToolCall[]): boolean {
    // 基于工具调用结果决定是否继续
    return toolCalls.length > 0;
  }

  // 清理资源
  private cleanup(): void {
    this.steeringListener.stopListening();
    this.abortController.abort();
  }

  // 中止执行
  abort(): void {
    this.abortController.abort();
  }

  // 获取消息历史
  getMessageHistory(): Message[] {
    return [...this.messageHistory];
  }
}
```

### 步骤2.3: 创建并发控制系统
**基于gW5复杂并发管理机制**

**文件路径**: `src/core/concurrency-manager.ts`
**文件内容**:
```typescript
/**
 * gW5复杂并发管理系统
 * 基于逆向分析的智能并发控制机制
 * 支持动态负载均衡和资源分配
 */

export interface ConcurrencyConfig {
  maxConcurrent: number;      // 最大并发数
  enableLoadBalancing: boolean; // 动态负载均衡
  resourceLimits: ResourceLimits;
  priorityQueues: boolean;    // 优先级队列
}

export interface ResourceLimits {
  maxMemoryMB: number;
  maxCpuUsage: number;
  maxNetworkConnections: number;
  maxFileHandles: number;
}

export interface TaskMetrics {
  id: string;
  priority: number;
  estimatedDuration: number;
  resourceRequirements: Partial<ResourceLimits>;
  dependencies: string[];
  retryCount: number;
}

/**
 * gW5并发管理器实现
 * 基于逆向分析的复杂调度算法
 */
export class gW5ConcurrencyManager {
  private readonly config: ConcurrencyConfig;
  private activeTasks = new Map<string, TaskExecution>();
  private taskQueue: PriorityQueue<TaskMetrics>;
  private resourceMonitor: ResourceMonitor;
  private loadBalancer: LoadBalancer;

  // 基于逆向分析：gW5 = 10 (默认最大并发数)
  private static readonly DEFAULT_MAX_CONCURRENT = 10;

  constructor(config: Partial<ConcurrencyConfig> = {}) {
    this.config = {
      maxConcurrent: config.maxConcurrent || gW5ConcurrencyManager.DEFAULT_MAX_CONCURRENT,
      enableLoadBalancing: config.enableLoadBalancing ?? true,
      resourceLimits: {
        maxMemoryMB: 512,
        maxCpuUsage: 80,
        maxNetworkConnections: 100,
        maxFileHandles: 1000,
        ...config.resourceLimits
      },
      priorityQueues: config.priorityQueues ?? true
    };

    this.taskQueue = new PriorityQueue();
    this.resourceMonitor = new ResourceMonitor(this.config.resourceLimits);
    this.loadBalancer = new LoadBalancer();
  }

  /**
   * 计算最优并发配置
   * 基于逆向分析的智能调度算法
   */
  calculateOptimalConcurrency(tasks: TaskMetrics[]): OptimalConcurrencyResult {
    // 1. 分析任务依赖关系
    const dependencyGraph = this.buildDependencyGraph(tasks);
    
    // 2. 评估系统资源状态
    const resourceStatus = this.resourceMonitor.getCurrentStatus();
    
    // 3. 动态调整并发数
    const optimalConcurrency = this.calculateDynamicConcurrency(
      tasks,
      resourceStatus,
      dependencyGraph
    );
    
    // 4. 生成执行计划
    const executionPlan = this.generateExecutionPlan(
      tasks,
      optimalConcurrency,
      dependencyGraph
    );

    return {
      maxConcurrent: optimalConcurrency,
      executionGroups: executionPlan.groups,
      estimatedDuration: executionPlan.estimatedDuration,
      resourceAllocation: executionPlan.resourceAllocation,
      loadBalancingStrategy: this.loadBalancer.getStrategy()
    };
  }

  /**
   * 执行并发任务
   * 支持动态负载均衡和优先级调度
   */
  async executeConcurrentTasks<T>(
    tasks: Array<() => Promise<T>>,
    options: ExecutionOptions = {}
  ): Promise<T[]> {
    const taskMetrics = tasks.map((task, index) => ({
      id: `task_${index}`,
      priority: options.priorities?.[index] || 0,
      estimatedDuration: options.estimatedDurations?.[index] || 1000,
      resourceRequirements: options.resourceRequirements?.[index] || {},
      dependencies: options.dependencies?.[index] || [],
      retryCount: 0
    }));

    const concurrencyConfig = this.calculateOptimalConcurrency(taskMetrics);
    
    // 创建信号量控制并发
    const semaphore = new Semaphore(concurrencyConfig.maxConcurrent);
    const results: T[] = new Array(tasks.length);
    const errors: Error[] = [];

    // 执行任务
    const taskPromises = tasks.map(async (task, index) => {
      const metrics = taskMetrics[index];
      
      // 获取执行许可
      await semaphore.acquire();
      
      try {
        // 记录任务开始
        this.startTaskExecution(metrics);
        
        // 执行任务
        const result = await this.executeWithTimeout(
          task,
          options.timeout || 30000,
          metrics
        );
        
        results[index] = result;
        
        // 记录任务完成
        this.completeTaskExecution(metrics.id, true);
        
      } catch (error) {
        errors.push(error);
        this.completeTaskExecution(metrics.id, false, error);
        
        // 重试逻辑
        if (options.retryOnFailure && metrics.retryCount < 3) {
          metrics.retryCount++;
          // 重新排队执行
          setTimeout(() => this.retryTask(task, index, metrics), 1000 * Math.pow(2, metrics.retryCount));
        }
      } finally {
        semaphore.release();
      }
    });

    await Promise.allSettled(taskPromises);

    if (errors.length > 0 && !options.continueOnError) {
      throw new AggregateError(errors, 'Some tasks failed');
    }

    return results;
  }

  // 构建依赖关系图
  private buildDependencyGraph(tasks: TaskMetrics[]): DependencyGraph {
    const graph = new Map<string, string[]>();
    
    for (const task of tasks) {
      graph.set(task.id, task.dependencies);
    }
    
    return new DependencyGraph(graph);
  }

  // 计算动态并发数
  private calculateDynamicConcurrency(
    tasks: TaskMetrics[],
    resourceStatus: ResourceStatus,
    dependencyGraph: DependencyGraph
  ): number {
    let baseConcurrency = this.config.maxConcurrent;
    
    // 根据资源使用情况调整
    if (resourceStatus.memoryUsage > 80) baseConcurrency = Math.max(2, baseConcurrency / 2);
    if (resourceStatus.cpuUsage > 80) baseConcurrency = Math.max(2, baseConcurrency / 2);
    
    // 根据任务复杂度调整
    const avgComplexity = tasks.reduce((sum, task) => sum + task.estimatedDuration, 0) / tasks.length;
    if (avgComplexity > 10000) baseConcurrency = Math.max(2, baseConcurrency / 2);
    
    // 根据依赖关系调整
    const maxParallelizable = dependencyGraph.getMaxParallelizable();
    baseConcurrency = Math.min(baseConcurrency, maxParallelizable);
    
    return Math.max(1, Math.floor(baseConcurrency));
  }

  // 生成执行计划
  private generateExecutionPlan(
    tasks: TaskMetrics[],
    maxConcurrent: number,
    dependencyGraph: DependencyGraph
  ): ExecutionPlan {
    const groups: TaskGroup[] = [];
    const sortedTasks = dependencyGraph.topologicalSort(tasks);
    
    let currentGroup: TaskMetrics[] = [];
    let groupResourceUsage = { memory: 0, cpu: 0, network: 0, files: 0 };
    
    for (const task of sortedTasks) {
      // 检查是否可以加入当前组
      if (this.canAddToGroup(task, currentGroup, groupResourceUsage, maxConcurrent)) {
        currentGroup.push(task);
        this.updateGroupResources(groupResourceUsage, task.resourceRequirements);
      } else {
        // 完成当前组，开始新组
        if (currentGroup.length > 0) {
          groups.push({
            tasks: [...currentGroup],
            estimatedDuration: Math.max(...currentGroup.map(t => t.estimatedDuration)),
            resourceUsage: { ...groupResourceUsage }
          });
        }
        
        currentGroup = [task];
        groupResourceUsage = { memory: 0, cpu: 0, network: 0, files: 0 };
        this.updateGroupResources(groupResourceUsage, task.resourceRequirements);
      }
    }
    
    // 添加最后一组
    if (currentGroup.length > 0) {
      groups.push({
        tasks: currentGroup,
        estimatedDuration: Math.max(...currentGroup.map(t => t.estimatedDuration)),
        resourceUsage: groupResourceUsage
      });
    }
    
    const totalDuration = groups.reduce((sum, group) => sum + group.estimatedDuration, 0);
    const totalResources = this.calculateTotalResources(groups);
    
    return {
      groups,
      estimatedDuration: totalDuration,
      resourceAllocation: totalResources
    };
  }

  // 检查任务是否可以加入组
  private canAddToGroup(
    task: TaskMetrics,
    currentGroup: TaskMetrics[],
    groupResources: any,
    maxConcurrent: number
  ): boolean {
    // 检查并发数限制
    if (currentGroup.length >= maxConcurrent) return false;
    
    // 检查资源限制
    const newMemory = groupResources.memory + (task.resourceRequirements.maxMemoryMB || 0);
    const newCpu = groupResources.cpu + (task.resourceRequirements.maxCpuUsage || 0);
    
    if (newMemory > this.config.resourceLimits.maxMemoryMB) return false;
    if (newCpu > this.config.resourceLimits.maxCpuUsage) return false;
    
    // 检查依赖关系
    const hasConflict = currentGroup.some(groupTask => 
      task.dependencies.includes(groupTask.id) || 
      groupTask.dependencies.includes(task.id)
    );
    
    return !hasConflict;
  }

  // 更新组资源使用
  private updateGroupResources(groupResources: any, taskResources: Partial<ResourceLimits>): void {
    groupResources.memory += taskResources.maxMemoryMB || 0;
    groupResources.cpu += taskResources.maxCpuUsage || 0;
    groupResources.network += taskResources.maxNetworkConnections || 0;
    groupResources.files += taskResources.maxFileHandles || 0;
  }

  // 计算总资源需求
  private calculateTotalResources(groups: TaskGroup[]): ResourceAllocation {
    return groups.reduce((total, group) => ({
      memory: Math.max(total.memory, group.resourceUsage.memory),
      cpu: Math.max(total.cpu, group.resourceUsage.cpu),
      network: Math.max(total.network, group.resourceUsage.network),
      files: Math.max(total.files, group.resourceUsage.files)
    }), { memory: 0, cpu: 0, network: 0, files: 0 });
  }

  // 带超时执行任务
  private async executeWithTimeout<T>(
    task: () => Promise<T>,
    timeout: number,
    metrics: TaskMetrics
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Task ${metrics.id} timed out after ${timeout}ms`));
      }, timeout);

      task()
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timer));
    });
  }

  // 记录任务开始执行
  private startTaskExecution(metrics: TaskMetrics): void {
    this.activeTasks.set(metrics.id, {
      metrics,
      startTime: Date.now(),
      status: 'running'
    });
  }

  // 记录任务完成
  private completeTaskExecution(taskId: string, success: boolean, error?: any): void {
    const execution = this.activeTasks.get(taskId);
    if (execution) {
      execution.endTime = Date.now();
      execution.status = success ? 'completed' : 'failed';
      execution.error = error;
      
      // 移除活动任务记录
      this.activeTasks.delete(taskId);
    }
  }

  // 重试任务
  private async retryTask<T>(
    task: () => Promise<T>,
    index: number,
    metrics: TaskMetrics
  ): Promise<void> {
    // 重试逻辑实现
    console.log(`Retrying task ${metrics.id}, attempt ${metrics.retryCount}`);
  }
}

// 辅助类实现
class Semaphore {
  private permits: number;
  private waitQueue: Array<() => void> = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve();
    }

    return new Promise(resolve => {
      this.waitQueue.push(resolve);
    });
  }

  release(): void {
    this.permits++;
    const next = this.waitQueue.shift();
    if (next) {
      this.permits--;
      next();
    }
  }
}

class PriorityQueue<T> {
  private items: Array<{ item: T; priority: number }> = [];

  enqueue(item: T, priority: number): void {
    this.items.push({ item, priority });
    this.items.sort((a, b) => b.priority - a.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.item;
  }

  get length(): number {
    return this.items.length;
  }
}

class ResourceMonitor {
  constructor(private limits: ResourceLimits) {}

  getCurrentStatus(): ResourceStatus {
    // 简化实现：返回模拟的资源状态
    return {
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
      cpuUsage: Math.random() * 100, // 模拟CPU使用率
      networkConnections: 10,
      fileHandles: 50
    };
  }
}

class LoadBalancer {
  getStrategy(): string {
    return 'round_robin';
  }
}

class DependencyGraph {
  constructor(private graph: Map<string, string[]>) {}

  topologicalSort(tasks: TaskMetrics[]): TaskMetrics[] {
    // 简化的拓扑排序实现
    const visited = new Set<string>();
    const result: TaskMetrics[] = [];
    
    const visit = (task: TaskMetrics) => {
      if (visited.has(task.id)) return;
      visited.add(task.id);
      
      // 首先访问依赖项
      for (const depId of task.dependencies) {
        const depTask = tasks.find(t => t.id === depId);
        if (depTask) visit(depTask);
      }
      
      result.push(task);
    };
    
    for (const task of tasks) {
      visit(task);
    }
    
    return result;
  }

  getMaxParallelizable(): number {
    // 计算最大可并行任务数
    return Math.max(1, Math.floor(this.graph.size / 2));
  }
}

// 类型定义
interface TaskExecution {
  metrics: TaskMetrics;
  startTime: number;
  endTime?: number;
  status: 'running' | 'completed' | 'failed';
  error?: any;
}

interface OptimalConcurrencyResult {
  maxConcurrent: number;
  executionGroups: TaskGroup[];
  estimatedDuration: number;
  resourceAllocation: ResourceAllocation;
  loadBalancingStrategy: string;
}

interface ExecutionOptions {
  priorities?: number[];
  estimatedDurations?: number[];
  resourceRequirements?: Array<Partial<ResourceLimits>>;
  dependencies?: string[][];
  timeout?: number;
  retryOnFailure?: boolean;
  continueOnError?: boolean;
}

interface TaskGroup {
  tasks: TaskMetrics[];
  estimatedDuration: number;
  resourceUsage: any;
}

interface ExecutionPlan {
  groups: TaskGroup[];
  estimatedDuration: number;
  resourceAllocation: ResourceAllocation;
}

interface ResourceStatus {
  memoryUsage: number;
  cpuUsage: number;
  networkConnections: number;
  fileHandles: number;
}

interface ResourceAllocation {
  memory: number;
  cpu: number;
  network: number;
  files: number;
}
```

---

## 📁 第二周：工具系统实现

### 步骤2.4: 创建工具基础架构
**基于逆向分析的工具系统设计**

**文件路径**: `src/tools/base.ts`
**文件内容**:
```typescript
/**
 * 工具系统基础架构
 * 基于逆向分析的MH1工具引擎设计
 */

import type { Tool, ToolResult, ToolExecutionContext, ToolCall } from '../types/tool';
import { gW5ConcurrencyManager } from '../core/concurrency-manager';

export abstract class BaseTool implements Tool {
  abstract name: string;
  abstract description: string;
  abstract schema: any;
  abstract category: string;

  // 基础属性
  requiresFileRead?: boolean = false;
  subAgentCapable?: boolean = false;

  // 抽象方法
  abstract execute(params: any, context: ToolExecutionContext): Promise<ToolResult>;

  // 权限检查
  async checkPermissions(params: any, context: ToolExecutionContext): Promise<{ allow: boolean; message?: string }> {
    return { allow: true };
  }

  // 并发安全性检查
  isConcurrencySafe(params?: any): boolean {
    return true;
  }

  // 工具特性检查
  isReadOnly(): boolean {
    return false;
  }

  isEnabled(): boolean {
    return true;
  }

  // 用户友好名称
  userFacingName(): string {
    return this.name;
  }

  // 结果映射
  mapResult(result: any, toolCallId: string): any {
    return {
      tool_use_id: toolCallId,
      type: 'tool_result',
      content: result
    };
  }
}

/**
 * MH1工具执行引擎
 * 基于逆向分析的单个工具执行机制
 */
export class MH1ToolEngine {
  private toolRegistry: Map<string, Tool> = new Map();
  private concurrencyManager: gW5ConcurrencyManager;
  private activeExecutions = new Set<string>();

  constructor() {
    this.concurrencyManager = new gW5ConcurrencyManager();
  }

  // 注册工具
  registerTool(tool: Tool): void {
    this.toolRegistry.set(tool.name, tool);
  }

  // 获取工具
  getTool(name: string): Tool | undefined {
    return this.toolRegistry.get(name);
  }

  // 获取所有工具
  getAllTools(): Tool[] {
    return Array.from(this.toolRegistry.values());
  }

  /**
   * 执行单个工具 - 基于逆向分析的MH1函数实现
   */
  async* executeTool(
    toolCall: ToolCall,
    context: ToolExecutionContext
  ): AsyncGenerator<ToolResult> {
    const tool = this.toolRegistry.get(toolCall.name);
    
    // 标记工具正在使用
    this.activeExecutions.add(toolCall.id);
    
    try {
      if (!tool) {
        yield {
          toolCallId: toolCall.id,
          success: false,
          error: `No such tool available: ${toolCall.name}`,
          duration: 0
        };
        return;
      }

      // 检查中断信号
      if (context.abortSignal?.aborted) {
        yield {
          toolCallId: toolCall.id,
          success: false,
          error: 'Tool execution was cancelled',
          duration: 0
        };
        return;
      }

      // 权限检查
      const permissionResult = await tool.checkPermissions?.(toolCall.parameters, context);
      if (permissionResult && !permissionResult.allow) {
        yield {
          toolCallId: toolCall.id,
          success: false,
          error: permissionResult.message || 'Permission denied',
          duration: 0
        };
        return;
      }

      const startTime = Date.now();

      try {
        // 执行工具
        const result = await tool.execute(toolCall.parameters, context);
        const duration = Date.now() - startTime;

        yield {
          ...result,
          toolCallId: toolCall.id,
          duration
        };

      } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        yield {
          toolCallId: toolCall.id,
          success: false,
          error: errorMessage,
          duration
        };
      }

    } finally {
      // 清理工具使用状态
      this.activeExecutions.delete(toolCall.id);
    }
  }

  /**
   * 批量执行工具 - 基于逆向分析的并发控制机制
   */
  async* executeTools(
    toolCalls: ToolCall[],
    context: ToolExecutionContext
  ): AsyncGenerator<ToolResult> {
    // 按并发安全性分组
    const { safeConcurrent, requiresSequential } = this.groupByFafety(toolCalls);
    
    // 并发执行安全工具
    if (safeConcurrent.length > 0) {
      yield* this.executeConcurrentTools(safeConcurrent, context);
    }
    
    // 串行执行不安全的工具
    if (requiresSequential.length > 0) {
      yield* this.executeSequentialTools(requiresSequential, context);
    }
  }

  // 按安全性分组工具
  private groupByFafety(toolCalls: ToolCall[]): {
    safeConcurrent: ToolCall[];
    requiresSequential: ToolCall[];
  } {
    const safe: ToolCall[] = [];
    const unsafe: ToolCall[] = [];
    
    for (const call of toolCalls) {
      const tool = this.toolRegistry.get(call.name);
      if (tool?.isConcurrencySafe?.(call.parameters)) {
        safe.push(call);
      } else {
        unsafe.push(call);
      }
    }
    
    return { safeConcurrent: safe, requiresSequential: unsafe };
  }

  // 并发执行工具
  private async* executeConcurrentTools(
    toolCalls: ToolCall[],
    context: ToolExecutionContext
  ): AsyncGenerator<ToolResult> {
    const maxConcurrent = 10; // 基于逆向分析的gW5值
    
    // 使用并发控制器执行
    const executors = toolCalls.map(call => 
      this.executeTool(call, context)
    );
    
    // 并发执行但保持结果顺序
    yield* this.mergeAsyncGenerators(executors, maxConcurrent);
  }

  // 串行执行工具
  private async* executeSequentialTools(
    toolCalls: ToolCall[],
    context: ToolExecutionContext
  ): AsyncGenerator<ToolResult> {
    for (const toolCall of toolCalls) {
      yield* this.executeTool(toolCall, context);
    }
  }

  // 合并异步生成器
  private async* mergeAsyncGenerators<T>(
    generators: Array<AsyncGenerator<T>>,
    maxConcurrent: number
  ): AsyncGenerator<T> {
    const activeGenerators = new Set(generators.slice(0, maxConcurrent));
    const remainingGenerators = generators.slice(maxConcurrent);
    
    while (activeGenerators.size > 0) {
      const promises = Array.from(activeGenerators).map(async gen => {
        const result = await gen.next();
        return { generator: gen, result };
      });
      
      const { generator, result } = await Promise.race(promises);
      
      if (!result.done) {
        yield result.value;
      } else {
        activeGenerators.delete(generator);
        
        // 启动下一个生成器
        if (remainingGenerators.length > 0) {
          const nextGen = remainingGenerators.shift()!;
          activeGenerators.add(nextGen);
        }
      }
    }
  }

  // 获取活动执行数量
  getActiveExecutionCount(): number {
    return this.activeExecutions.size;
  }

  // 中止所有执行
  abortAll(): void {
    this.activeExecutions.clear();
  }
}

/**
 * 工具权限管理器
 * 基于逆向分析的安全机制
 */
export class ToolPermissionManager {
  private permissions: Map<string, any> = new Map();

  // 检查工具权限
  async checkToolPermission(
    toolName: string,
    params: any,
    context: ToolExecutionContext
  ): Promise<{ allow: boolean; message?: string; suggestions?: string[] }> {
    // 基础权限检查
    if (!context.permissions.allowFileWrite && this.isFileWriteTool(toolName)) {
      return {
        allow: false,
        message: 'File write operations are not allowed',
        suggestions: ['Enable file write permissions', 'Use read-only alternatives']
      };
    }

    if (!context.permissions.allowBashExecution && toolName === 'Bash') {
      return {
        allow: false,
        message: 'Bash execution is not allowed',
        suggestions: ['Enable bash execution permissions', 'Use alternative tools']
      };
    }

    // 危险操作检测
    if (toolName === 'Bash') {
      const dangerousPattern = this.checkDangerousCommand(params.command);
      if (dangerousPattern) {
        return {
          allow: false,
          message: `Dangerous command detected: ${dangerousPattern}`,
          suggestions: ['Review command safety', 'Use safer alternatives']
        };
      }
    }

    return { allow: true };
  }

  // 检查是否为文件写入工具
  private isFileWriteTool(toolName: string): boolean {
    return ['Write', 'Edit', 'MultiEdit'].includes(toolName);
  }

  // 检查危险命令
  private checkDangerousCommand(command: string): string | null {
    const dangerousPatterns = [
      'rm -rf /',
      'sudo rm',
      'dd if=',
      'mkfs',
      'fdisk',
      'chmod 777',
      'chown root',
      ':(){ :|:& };:' // fork bomb
    ];

    for (const pattern of dangerousPatterns) {
      if (command.includes(pattern)) {
        return pattern;
      }
    }

    return null;
  }
}
```

### 步骤2.5: 实现Edit工具强制读取机制
**基于逆向分析的9层验证架构**

**文件路径**: `src/tools/implementations/edit.ts`
**文件内容**:
```typescript
/**
 * Edit工具实现
 * 基于逆向分析的9层验证机制和强制读取架构
 */

import fs from 'fs/promises';
import path from 'path';
import { BaseTool } from '../base';
import type { ToolResult, ToolExecutionContext } from '../../types/tool';

interface EditToolParams {
  file_path: string;
  old_string: string;
  new_string: string;
  replace_all?: boolean;
}

interface FileState {
  content: string;
  timestamp: number;
}

/**
 * Edit工具 - 基于逆向分析的完整实现
 * 包含9层验证机制和readFileState管理
 */
export class EditTool extends BaseTool {
  name = 'Edit';
  description = 'Performs exact string replacements in files with strict validation';
  category = 'file';
  requiresFileRead = true; // 需要强制读取检查

  schema = {
    type: 'object',
    properties: {
      file_path: {
        type: 'string',
        description: 'Path to the file to edit'
      },
      old_string: {
        type: 'string',
        description: 'The exact string to replace'
      },
      new_string: {
        type: 'string',
        description: 'The replacement string'
      },
      replace_all: {
        type: 'boolean',
        description: 'Replace all occurrences (default: false)',
        default: false
      }
    },
    required: ['file_path', 'old_string', 'new_string']
  };

  /**
   * 9层验证机制 - 基于逆向分析的validateInput函数
   */
  async validateInput(
    params: EditToolParams,
    context: ToolExecutionContext
  ): Promise<{ result: boolean; behavior?: string; message?: string; errorCode?: number }> {
    const { file_path, old_string, new_string, replace_all = false } = params;

    // 第1层：参数一致性验证
    if (old_string === new_string) {
      return {
        result: false,
        behavior: 'ask',
        message: 'No changes to make: old_string and new_string are exactly the same.',
        errorCode: 1
      };
    }

    // 第2层：路径规范化和权限验证
    const normalizedPath = path.isAbsolute(file_path) 
      ? file_path 
      : path.join(context.workingDirectory, file_path);

    if (this.isIgnoredPath(normalizedPath)) {
      return {
        result: false,
        behavior: 'ask',
        message: 'File is in a directory that is ignored by your project configuration.',
        errorCode: 2
      };
    }

    // 第3层：文件创建逻辑处理
    const fileExists = await this.fileExists(normalizedPath);
    if (fileExists && old_string === '') {
      const content = await this.readFileContent(normalizedPath);
      if (content.trim() !== '') {
        return {
          result: false,
          behavior: 'ask',
          message: 'Cannot create new file - file already exists.',
          errorCode: 3
        };
      }
      return { result: true };
    }

    // 第4层：新文件创建许可
    if (!fileExists && old_string === '') {
      return { result: true };
    }

    // 第5层：文件存在性验证
    if (!fileExists) {
      const suggestion = this.findSimilarFile(normalizedPath);
      let message = 'File does not exist.';
      
      if (context.workingDirectory !== process.cwd()) {
        message += ` Current working directory: ${context.workingDirectory}`;
      }
      
      if (suggestion) {
        message += ` Did you mean ${suggestion}?`;
      }
      
      return {
        result: false,
        behavior: 'ask',
        message,
        errorCode: 4
      };
    }

    // 第6层：Jupyter文件类型检查
    if (normalizedPath.endsWith('.ipynb')) {
      return {
        result: false,
        behavior: 'ask',
        message: 'File is a Jupyter Notebook. Use the NotebookEdit tool to edit this file.',
        errorCode: 5
      };
    }

    // 第7层：强制读取验证 - 核心机制
    const fileState = context.fileStates[normalizedPath];
    if (!fileState) {
      return {
        result: false,
        behavior: 'ask',
        message: 'File has not been read yet. Read it first before writing to it.',
        errorCode: 6 // 专用错误码6
      };
    }

    // 第8层：文件修改时间验证
    const stats = await fs.stat(normalizedPath);
    if (stats.mtimeMs > fileState.timestamp) {
      return {
        result: false,
        behavior: 'ask',
        message: 'File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.',
        errorCode: 7
      };
    }

    // 第9层：字符串存在性和唯一性验证
    const currentContent = await this.readFileContent(normalizedPath);
    
    // 字符串不存在
    if (!currentContent.includes(old_string)) {
      return {
        result: false,
        behavior: 'ask',
        message: `String to replace not found in file.\nString: ${old_string}`,
        errorCode: 8
      };
    }

    // 字符串不唯一但未设置replace_all
    const matchCount = currentContent.split(old_string).length - 1;
    if (matchCount > 1 && !replace_all) {
      return {
        result: false,
        behavior: 'ask',
        message: `Found ${matchCount} matches of the string to replace, but replace_all is false. To replace all occurrences, set replace_all to true. To replace only one occurrence, please provide more context to uniquely identify the instance.\nString: ${old_string}`,
        errorCode: 9
      };
    }

    return { result: true };
  }

  /**
   * 执行编辑操作
   */
  async execute(params: EditToolParams, context: ToolExecutionContext): Promise<ToolResult> {
    // 首先进行9层验证
    const validation = await this.validateInput(params, context);
    if (!validation.result) {
      return {
        toolCallId: '',
        success: false,
        error: validation.message || 'Validation failed',
        data: { errorCode: validation.errorCode },
        duration: 0
      };
    }

    const { file_path, old_string, new_string, replace_all = false } = params;
    const normalizedPath = path.isAbsolute(file_path) 
      ? file_path 
      : path.join(context.workingDirectory, file_path);

    try {
      const startTime = Date.now();

      // 读取当前文件内容
      const currentContent = await this.readFileContent(normalizedPath);

      // 执行替换
      let newContent: string;
      if (replace_all) {
        newContent = currentContent.replaceAll(old_string, new_string);
      } else {
        newContent = currentContent.replace(old_string, new_string);
      }

      // 写入文件
      await fs.writeFile(normalizedPath, newContent, 'utf-8');

      // 更新readFileState - 基于逆向分析的状态同步
      const stats = await fs.stat(normalizedPath);
      context.fileStates[normalizedPath] = {
        content: newContent,
        timestamp: stats.mtimeMs
      };

      const duration = Date.now() - startTime;

      return {
        toolCallId: '',
        success: true,
        data: {
          filePath: normalizedPath,
          replacementCount: replace_all 
            ? currentContent.split(old_string).length - 1 
            : 1,
          newContent: newContent.slice(0, 500) + (newContent.length > 500 ? '...' : '')
        },
        duration
      };

    } catch (error) {
      return {
        toolCallId: '',
        success: false,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now()
      };
    }
  }

  // 并发安全性检查
  isConcurrencySafe(params?: EditToolParams): boolean {
    return false; // Edit工具不支持并发
  }

  // 辅助方法

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  private async readFileContent(filePath: string): Promise<string> {
    const content = await fs.readFile(filePath, 'utf-8');
    return content.replaceAll('\r\n', '\n'); // 规范化行尾符
  }

  private isIgnoredPath(filePath: string): boolean {
    const ignoredPatterns = [
      'node_modules/',
      '.git/',
      'dist/',
      'build/',
      '.DS_Store',
      '*.log'
    ];

    return ignoredPatterns.some(pattern => filePath.includes(pattern));
  }

  private findSimilarFile(filePath: string): string | null {
    // 简化实现：返回可能的文件建议
    const dir = path.dirname(filePath);
    const basename = path.basename(filePath);
    
    // 这里可以实现更复杂的文件相似性算法
    return null;
  }
}
```

---

## 📁 第三周：多Agent架构和Task工具

### 步骤2.6: 实现Task工具分层多Agent架构
**基于逆向分析的I2A SubAgent实例化机制**

**文件路径**: `src/tools/implementations/task.ts`
**文件内容**:
```typescript
/**
 * Task工具实现
 * 基于逆向分析的分层多Agent架构
 * 支持I2A SubAgent实例化和UH1并发调度
 */

import { BaseTool } from '../base';
import { AgentCore } from '../../core/agent-core';
import { gW5ConcurrencyManager } from '../../core/concurrency-manager';
import type { ToolResult, ToolExecutionContext } from '../../types/tool';
import type { AgentConfig, AgentContext, Message } from '../../types/agent';

interface TaskToolParams {
  description: string; // 3-5个词的任务描述
  prompt: string;      // 完整的任务提示
}

interface SubAgentResult {
  agentIndex: number;
  content: any[];
  toolUseCount: number;
  tokens: number;
  usage: any;
  exitPlanModeInput?: any;
}

/**
 * Task工具 - 基于逆向分析的完整多Agent实现
 * 支持SubAgent创建、并发执行和结果聚合
 */
export class TaskTool extends BaseTool {
  name = 'Task';
  description = 'Launch a new task using SubAgent architecture';
  category = 'task';
  subAgentCapable = true;

  schema = {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'A short (3-5 word) description of the task'
      },
      prompt: {
        type: 'string',
        description: 'The task for the agent to perform'
      }
    },
    required: ['description', 'prompt']
  };

  private concurrencyManager: gW5ConcurrencyManager;

  constructor() {
    super();
    this.concurrencyManager = new gW5ConcurrencyManager();
  }

  // 并发安全性 - Task工具支持并发
  isConcurrencySafe(): boolean {
    return true;
  }

  // 只读性质
  isReadOnly(): boolean {
    return true;
  }

  /**
   * 执行Task工具 - 基于逆向分析的p_2对象实现
   */
  async* executeTask(
    params: TaskToolParams,
    context: ToolExecutionContext
  ): AsyncGenerator<ToolResult> {
    const startTime = Date.now();
    const config = this.getGlobalConfiguration();
    
    // 创建SubAgent执行上下文
    const executionContext = this.createSubAgentContext(context);
    
    if (config.parallelTasksCount > 1) {
      // 多Agent并发执行模式
      yield* this.executeParallelAgents(params, executionContext, config);
    } else {
      // 单Agent执行模式
      yield* this.executeSingleAgent(params, executionContext);
    }
  }

  async execute(params: TaskToolParams, context: ToolExecutionContext): Promise<ToolResult> {
    const results: any[] = [];
    
    for await (const result of this.executeTask(params, context)) {
      results.push(result);
    }

    return results[results.length - 1] || {
      toolCallId: '',
      success: false,
      error: 'No results generated',
      duration: 0
    };
  }

  /**
   * 并发执行多个Agents - 基于逆向分析的并发机制
   */
  private async* executeParallelAgents(
    params: TaskToolParams,
    context: SubAgentExecutionContext,
    config: GlobalConfiguration
  ): AsyncGenerator<ToolResult> {
    let totalToolUseCount = 0;
    let totalTokens = 0;
    
    // 创建多个相同的Agent任务
    const agentTasks = Array(config.parallelTasksCount)
      .fill(`${params.prompt}\n\nProvide a thorough and complete analysis.`)
      .map((prompt, index) => this.I2A_launchSubAgent(prompt, index, context));
    
    const agentResults: SubAgentResult[] = [];
    
    // 并发执行所有Agent任务 - 基于UH1并发调度器
    yield* this.UH1_concurrentExecutor(agentTasks, 10, (result) => {
      if (result.type === "progress") {
        return result;
      } else if (result.type === "result") {
        agentResults.push(result.data);
        totalToolUseCount += result.data.toolUseCount;
        totalTokens += result.data.tokens;
        return {
          toolCallId: '',
          success: true,
          data: { type: 'agent_completed', agentIndex: result.data.agentIndex },
          duration: 0
        };
      }
      return null;
    });
    
    // 检查是否被中断
    if (context.abortSignal?.aborted) {
      throw new Error('Task execution was aborted');
    }
    
    // 使用合成器合并结果 - 基于KN5函数
    const synthesisPrompt = this.KN5_synthesizeResults(params.prompt, agentResults);
    const synthesisAgent = this.I2A_launchSubAgent(synthesisPrompt, 0, context, { isSynthesis: true });
    
    let synthesisResult: SubAgentResult | null = null;
    for await (const result of synthesisAgent) {
      if (result.type === "progress") {
        totalToolUseCount++;
        yield {
          toolCallId: '',
          success: true,
          data: { type: 'synthesis_progress' },
          duration: 0
        };
      } else if (result.type === "result") {
        synthesisResult = result.data;
        totalTokens += synthesisResult.tokens;
      }
    }
    
    if (!synthesisResult) {
      throw new Error("Synthesis agent did not return a result");
    }
    
    // 检查退出计划模式
    const exitPlanInput = agentResults.find(r => r.exitPlanModeInput)?.exitPlanModeInput;
    
    yield {
      toolCallId: '',
      success: true,
      data: {
        content: synthesisResult.content,
        totalDurationMs: Date.now() - Date.now(),
        totalTokens: totalTokens,
        totalToolUseCount: totalToolUseCount,
        usage: synthesisResult.usage,
        wasInterrupted: false,
        exitPlanModeInput: exitPlanInput
      },
      duration: Date.now() - Date.now()
    };
  }

  /**
   * 单Agent执行模式
   */
  private async* executeSingleAgent(
    params: TaskToolParams,
    context: SubAgentExecutionContext
  ): AsyncGenerator<ToolResult> {
    const agentExecution = this.I2A_launchSubAgent(params.prompt, 0, context);
    let toolUseCount = 0;
    let agentResult: SubAgentResult | null = null;
    
    for await (const result of agentExecution) {
      if (result.type === "progress") {
        yield {
          toolCallId: '',
          success: true,
          data: { type: 'agent_progress' },
          duration: 0
        };
      } else if (result.type === "result") {
        agentResult = result.data;
        toolUseCount = agentResult.toolUseCount;
      }
    }
    
    if (!agentResult) {
      throw new Error("Agent did not return a result");
    }
    
    yield {
      toolCallId: '',
      success: true,
      data: {
        content: agentResult.content,
        totalDurationMs: Date.now() - Date.now(),
        totalTokens: agentResult.tokens,
        totalToolUseCount: toolUseCount,
        usage: agentResult.usage,
        wasInterrupted: false,
        exitPlanModeInput: agentResult.exitPlanModeInput
      },
      duration: 0
    };
  }

  /**
   * I2A SubAgent启动器 - 基于逆向分析的精确实现
   */
  private async* I2A_launchSubAgent(
    taskPrompt: string,
    agentIndex: number,
    context: SubAgentExecutionContext,
    options: { isSynthesis?: boolean } = {}
  ): AsyncGenerator<{ type: string; data: any }> {
    const { isSynthesis = false } = options;
    
    // 生成唯一的Agent ID - 基于VN5函数
    const agentId = this.generateUniqueAgentId();
    
    // 创建初始消息
    const initialMessages: Message[] = [{
      id: Date.now().toString(),
      role: 'user',
      content: taskPrompt,
      timestamp: Date.now()
    }];
    
    // 创建SubAgent配置
    const subAgentConfig: AgentConfig = {
      model: context.model,
      fallbackModel: context.fallbackModel,
      enableSteering: false, // SubAgent不支持实时Steering
      concurrencyLimit: 5,   // SubAgent降低并发限制
      planMode: false
    };
    
    // 创建隔离的SubAgent上下文
    const subAgentContext: AgentContext = {
      sessionId: agentId,
      workingDirectory: context.workingDirectory,
      environment: context.environment,
      fileStates: { ...context.fileStates }, // 继承但隔离文件状态
      parentAgent: context.sessionId
    };
    
    // 启动SubAgent
    const subAgent = new AgentCore(subAgentConfig, subAgentContext);
    
    let messageHistory: Message[] = [];
    let toolUseCount = 0;
    let exitPlanInput: any = undefined;
    
    try {
      // 执行Agent主循环
      for await (const agentResponse of subAgent.executeMainLoop(initialMessages)) {
        // 过滤和处理Agent响应
        if (agentResponse.success && agentResponse.data) {
          messageHistory.push(agentResponse.data as Message);
          
          // 统计工具使用
          if (agentResponse.data.type === 'tool_completed') {
            toolUseCount++;
          }
          
          // 检查退出计划模式
          if (agentResponse.data.type === 'exit_plan_mode' && agentResponse.data.input) {
            exitPlanInput = { plan: agentResponse.data.input.plan };
          }
          
          // 生成进度事件
          yield {
            type: "progress",
            data: {
              agentIndex: isSynthesis ? `synthesis_${agentIndex}` : `agent_${agentIndex}`,
              message: agentResponse.data,
              type: "agent_progress"
            }
          };
        }
      }
      
      // 获取最后一条消息
      const lastMessage = messageHistory[messageHistory.length - 1];
      
      if (!lastMessage || lastMessage.role !== 'assistant') {
        throw new Error(isSynthesis 
          ? "Synthesis: Last message was not an assistant message" 
          : `Agent ${agentIndex + 1}: Last message was not an assistant message`
        );
      }
      
      // 计算token使用量
      const totalTokens = this.calculateTokenUsage(lastMessage);
      
      // 提取文本内容
      const textContent = this.extractTextContent(lastMessage);
      
      // 返回最终结果
      yield {
        type: "result",
        data: {
          agentIndex: agentIndex,
          content: textContent,
          toolUseCount: toolUseCount,
          tokens: totalTokens,
          usage: { input_tokens: totalTokens * 0.7, output_tokens: totalTokens * 0.3 },
          exitPlanModeInput: exitPlanInput
        }
      };
      
    } catch (error) {
      yield {
        type: "error",
        data: {
          agentIndex,
          error: error instanceof Error ? error.message : String(error)
        }
      };
    }
  }

  /**
   * UH1并发执行调度器 - 基于逆向分析的精确实现
   */
  private async* UH1_concurrentExecutor<T>(
    generators: Array<AsyncGenerator<T>>,
    maxConcurrency: number,
    transformer: (item: T) => any
  ): AsyncGenerator<any> {
    const remainingGenerators = [...generators];
    const activePromises = new Set<Promise<any>>();
    
    // 包装生成器，添加Promise追踪
    const wrapGenerator = (generator: AsyncGenerator<T>) => {
      return generator.next().then(({ done, value }) => ({
        done,
        value,
        generator,
        promise: null as any
      }));
    };
    
    // 启动初始的并发任务
    while (activePromises.size < maxConcurrency && remainingGenerators.length > 0) {
      const generator = remainingGenerators.shift()!;
      const promise = wrapGenerator(generator);
      activePromises.add(promise);
    }
    
    // 并发执行循环
    while (activePromises.size > 0) {
      // 等待任何一个生成器产生结果
      const { done, value, generator } = await Promise.race(activePromises);
      
      // 移除已完成的Promise
      activePromises.delete(Promise.resolve({ done, value, generator, promise: null }));
      
      if (!done) {
        // 生成器还有更多数据，继续执行
        const newPromise = wrapGenerator(generator);
        activePromises.add(newPromise);
        
        if (value !== undefined) {
          const transformed = transformer(value);
          if (transformed) yield transformed;
        }
      } else if (remainingGenerators.length > 0) {
        // 当前生成器完成，启动新的生成器
        const nextGenerator = remainingGenerators.shift()!;
        const newPromise = wrapGenerator(nextGenerator);
        activePromises.add(newPromise);
      }
    }
  }

  /**
   * KN5结果合成器 - 基于逆向分析的实现
   */
  private KN5_synthesizeResults(originalTask: string, agentResults: SubAgentResult[]): string {
    // 按Agent索引排序结果
    const sortedResults = agentResults.sort((a, b) => a.agentIndex - b.agentIndex);
    
    // 提取每个Agent的文本内容
    const agentResponses = sortedResults.map((result, index) => {
      const textContent = result.content
        .filter((content: any) => content.type === "text")
        .map((content: any) => content.text)
        .join("\n\n");
      
      return `== AGENT ${index + 1} RESPONSE ==\n${textContent}`;
    }).join("\n\n");
    
    // 生成合成提示
    return `Original task: ${originalTask}

I've assigned multiple agents to tackle this task. Each agent has analyzed the problem and provided their findings.

${agentResponses}

Based on all the information provided by these agents, synthesize a comprehensive and cohesive response that:
1. Combines the key insights from all agents
2. Resolves any contradictions between agent findings
3. Presents a unified solution that addresses the original task
4. Includes all important details and code examples from the individual responses
5. Is well-structured and complete

Your synthesis should be thorough but focused on the original task.`;
  }

  // 辅助方法

  private createSubAgentContext(context: ToolExecutionContext): SubAgentExecutionContext {
    return {
      sessionId: context.sessionId,
      workingDirectory: context.workingDirectory,
      environment: {},
      fileStates: context.fileStates,
      model: 'claude-3-5-sonnet',
      fallbackModel: 'claude-3-5-haiku',
      abortSignal: context.abortSignal
    };
  }

  private getGlobalConfiguration(): GlobalConfiguration {
    return {
      parallelTasksCount: 3, // 基于逆向分析的默认值
      maxConcurrentTools: 10
    };
  }

  private generateUniqueAgentId(): string {
    return `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateTokenUsage(message: Message): number {
    // 简化的token计算
    const content = typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
    return Math.ceil(content.length / 4);
  }

  private extractTextContent(message: Message): any[] {
    // 简化的文本内容提取
    return [{
      type: 'text',
      text: typeof message.content === 'string' ? message.content : JSON.stringify(message.content)
    }];
  }
}

// 类型定义
interface SubAgentExecutionContext {
  sessionId: string;
  workingDirectory: string;
  environment: Record<string, string>;
  fileStates: Record<string, any>;
  model: string;
  fallbackModel?: string;
  abortSignal?: AbortSignal;
}

interface GlobalConfiguration {
  parallelTasksCount: number;
  maxConcurrentTools: number;
}
```

---

## ✅ 阶段2验收检查清单

### 核心机制验证
- [ ] h2A异步消息队列功能完整
- [ ] 实时Steering监听机制工作正常
- [ ] nO主Agent循环async generator运行
- [ ] 模型降级机制测试通过
- [ ] 消息压缩系统正常工作

### 工具系统验证
- [ ] MH1工具执行引擎运行正常
- [ ] gW5并发控制机制工作
- [ ] Edit工具9层验证全部实现
- [ ] readFileState管理机制正确
- [ ] 工具权限控制系统完善

### 多Agent架构验证
- [ ] Task工具SubAgent创建成功
- [ ] I2A实例化机制工作正常
- [ ] UH1并发调度器功能完整
- [ ] KN5结果合成器正确运行
- [ ] Agent隔离机制验证通过

### 功能集成验证
- [ ] `npm run build` 编译成功
- [ ] `npm run test` 单元测试通过
- [ ] CLI命令基础功能可用
- [ ] 实时Steering演示成功
- [ ] 多Agent协作演示成功

### 性能和安全验证
- [ ] 并发处理性能达标
- [ ] 内存使用在合理范围
- [ ] 安全机制验证通过
- [ ] 错误处理完善
- [ ] 日志系统正常

---

## 🚀 完成阶段2后的下一步

完成阶段2后，您将拥有Claude Code的所有核心差异化技术：

1. **技术验收**: 确保所有核心机制都已验证通过
2. **性能测试**: 验证实时Steering和多Agent并发性能
3. **安全审查**: 检查Edit工具强制读取等安全机制
4. **进入阶段3**: 开始高级特性和交互模式的开发

**预期结果**: 一个具备完整核心技术的AI编程助手引擎，包含实时交互、多Agent协作和企业级安全机制。

---

*基于Claude Code逆向分析的精确技术指导，确保每个核心机制都完全符合原版实现。*