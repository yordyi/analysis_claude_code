# h2A异步消息队列实现文档

## 🎯 模块定位与职责

h2A异步消息队列是Claude Code实时Steering机制的核心组件，实现了真正意义上的非阻塞异步消息处理。本模块基于对原始h2A类的深度逆向分析，精确复现了其创新的双重缓冲机制和Promise-based异步迭代器设计。

## 📋 核心功能定义

### 主要职责
1. **非阻塞消息入队**: 支持实时消息插入而不阻塞消费者
2. **异步迭代器接口**: 实现AsyncIterator协议的标准兼容
3. **双重缓冲机制**: 优化内存使用和处理效率
4. **生命周期管理**: 完整的队列创建、使用、完成和清理流程
5. **错误传播机制**: 安全的错误处理和传播策略
6. **背压控制**: 防止内存溢出的智能缓冲区管理

### 核心特性
- **零拷贝设计**: 消息直接传递，无需额外拷贝
- **内存高效**: 智能的缓冲区管理和垃圾回收
- **线程安全**: 支持多线程环境下的并发访问
- **可中断**: 支持优雅的中断和清理

## 🔧 内部工作逻辑

### 核心数据结构设计
```typescript
class h2AAsyncMessageQueue<T> implements AsyncIterable<T> {
  // 核心状态字段
  private queue: T[] = [];                    // 消息缓冲队列
  private readResolve?: ResolveCallback<T>;   // 读取Promise的resolve回调
  private readReject?: RejectCallback;        // 读取Promise的reject回调
  private isDone: boolean = false;            // 队列完成标志
  private hasError?: Error;                   // 错误状态
  private started: boolean = false;           // 启动状态标志
  
  // 可选的清理回调
  private cleanupCallback?: () => void;
  
  // 配置参数
  private readonly maxBufferSize: number;     // 最大缓冲区大小
  private readonly enableMetrics: boolean;    // 是否启用指标收集
  
  // 性能指标
  private metrics: QueueMetrics;
}

// 类型定义
type ResolveCallback<T> = (value: IteratorResult<T>) => void;
type RejectCallback = (reason: any) => void;

interface QueueMetrics {
  enqueueCount: number;        // 入队次数
  dequeueCount: number;        // 出队次数
  maxQueueSize: number;        // 最大队列长度
  totalWaitTime: number;       // 总等待时间
  avgLatency: number;          // 平均延迟
}
```

### 核心算法实现逻辑

#### 1. AsyncIterator接口实现
```typescript
// 异步迭代器接口实现
[Symbol.asyncIterator](): AsyncIterator<T> {
  // 防止重复迭代的安全检查
  if (this.started) {
    throw new Error("Queue can only be iterated once - multiple iterations not supported");
  }
  
  // 标记为已启动
  this.started = true;
  
  // 初始化性能指标
  this.initializeMetrics();
  
  // 返回自身作为迭代器
  return this;
}
```

#### 2. 核心异步迭代机制
```typescript
// 核心的next()方法实现
async next(): Promise<IteratorResult<T>> {
  // 记录开始时间用于性能监控
  const startTime = this.enableMetrics ? performance.now() : 0;
  
  // 策略1: 优先从队列中取消息（快速路径）
  if (this.queue.length > 0) {
    const value = this.queue.shift()!;
    this.updateMetrics('dequeue', startTime);
    
    return {
      done: false,
      value: value
    };
  }
  
  // 策略2: 队列完成时返回结束标志
  if (this.isDone) {
    this.updateMetrics('done', startTime);
    return {
      done: true,
      value: undefined
    };
  }
  
  // 策略3: 有错误时拒绝Promise
  if (this.hasError) {
    this.updateMetrics('error', startTime);
    throw this.hasError;
  }
  
  // 策略4: 等待新消息 - 关键的非阻塞机制
  return new Promise<IteratorResult<T>>((resolve, reject) => {
    // 保存回调函数，用于异步通知
    this.readResolve = resolve;
    this.readReject = reject;
    
    // 设置超时保护（可选）
    if (this.timeoutMs > 0) {
      setTimeout(() => {
        if (this.readReject === reject) {
          this.readResolve = undefined;
          this.readReject = undefined;
          reject(new Error(`Queue read timeout after ${this.timeoutMs}ms`));
        }
      }, this.timeoutMs);
    }
  });
}
```

#### 3. 智能消息入队机制
```typescript
// 消息入队的双重策略
enqueue(message: T): void {
  // 输入验证
  if (this.isDone) {
    throw new Error("Cannot enqueue message to completed queue");
  }
  
  if (this.hasError) {
    throw new Error("Cannot enqueue message to errored queue");
  }
  
  // 背压控制检查
  if (this.queue.length >= this.maxBufferSize) {
    this.handleBackpressure(message);
    return;
  }
  
  // 记录入队指标
  this.updateMetrics('enqueue');
  
  // 策略1: 直接传递给等待的读取者（零延迟路径）
  if (this.readResolve) {
    const callback = this.readResolve;
    
    // 清理回调引用
    this.readResolve = undefined;
    this.readReject = undefined;
    
    // 直接调用回调，避免队列缓冲
    callback({
      done: false,
      value: message
    });
    
    return;
  }
  
  // 策略2: 缓冲到队列中（标准路径）
  this.queue.push(message);
  
  // 更新队列大小统计
  this.metrics.maxQueueSize = Math.max(
    this.metrics.maxQueueSize, 
    this.queue.length
  );
}
```

#### 4. 优雅的完成机制
```typescript
// 队列完成处理
done(): void {
  // 防止重复完成
  if (this.isDone) {
    return;
  }
  
  this.isDone = true;
  
  // 如果有等待的读取者，立即通知完成
  if (this.readResolve) {
    const callback = this.readResolve;
    
    // 清理回调引用
    this.readResolve = undefined;
    this.readReject = undefined;
    
    // 发送完成信号
    callback({
      done: true,
      value: undefined
    });
  }
  
  // 执行清理回调
  if (this.cleanupCallback) {
    try {
      this.cleanupCallback();
    } catch (error) {
      console.error('Cleanup callback failed:', error);
    }
  }
  
  // 记录完成指标
  this.finalizeMetrics();
}
```

#### 5. 错误处理与传播
```typescript
// 错误处理机制
error(error: Error): void {
  // 防止重复错误设置
  if (this.hasError || this.isDone) {
    return;
  }
  
  this.hasError = error;
  
  // 如果有等待的读取者，立即传播错误
  if (this.readReject) {
    const callback = this.readReject;
    
    // 清理回调引用
    this.readResolve = undefined;
    this.readReject = undefined;
    
    // 传播错误
    callback(error);
  }
  
  // 记录错误指标
  this.recordError(error);
  
  // 清理资源
  this.cleanup();
}
```

### 背压控制机制
```typescript
// 背压处理策略
private handleBackpressure(message: T): void {
  // 策略1: 丢弃最旧的消息
  if (this.backpressureStrategy === 'drop_oldest') {
    this.queue.shift();
    this.queue.push(message);
    this.metrics.droppedMessages++;
    return;
  }
  
  // 策略2: 拒绝新消息
  if (this.backpressureStrategy === 'drop_newest') {
    this.metrics.droppedMessages++;
    return;
  }
  
  // 策略3: 抛出异常
  if (this.backpressureStrategy === 'error') {
    throw new Error(`Queue buffer overflow: ${this.queue.length} >= ${this.maxBufferSize}`);
  }
  
  // 策略4: 阻塞等待（不推荐）
  if (this.backpressureStrategy === 'block') {
    // 实现异步等待逻辑
    this.waitForSpaceAndEnqueue(message);
  }
}
```

## 🔌 对外接口关系

### 输入接口规范
```typescript
interface MessageQueueInput<T> {
  // 构造参数
  cleanupCallback?: () => void;     // 清理回调函数
  maxBufferSize?: number;           // 最大缓冲区大小（默认1000）
  timeoutMs?: number;               // 读取超时时间（默认0=无限等待）
  enableMetrics?: boolean;          // 是否启用性能指标（默认false）
  backpressureStrategy?: BackpressureStrategy; // 背压处理策略
  
  // 运行时输入
  message: T;                       // 要入队的消息
  error?: Error;                    // 错误对象（用于错误传播）
}

enum BackpressureStrategy {
  DROP_OLDEST = 'drop_oldest',     // 丢弃最旧消息
  DROP_NEWEST = 'drop_newest',     // 丢弃最新消息  
  ERROR = 'error',                 // 抛出错误
  BLOCK = 'block'                  // 阻塞等待
}
```

### 输出接口规范
```typescript
interface MessageQueueOutput<T> {
  // AsyncIterator标准接口
  next(): Promise<IteratorResult<T>>;
  
  // 迭代结果
  IteratorResult<T>: {
    done: boolean;                  // 是否完成
    value?: T;                      // 消息值（done=false时有效）
  };
  
  // 性能指标输出
  getMetrics(): QueueMetrics;
  
  // 状态查询
  getStatus(): QueueStatus;
}

interface QueueStatus {
  isStarted: boolean;               // 是否已启动
  isDone: boolean;                  // 是否已完成
  hasError: boolean;                // 是否有错误
  queueSize: number;                // 当前队列大小
  hasWaitingReader: boolean;        // 是否有等待的读取者
}
```

### 与其他组件的接口
```typescript
// 与Agent Core的接口
interface AgentCoreIntegration<T> {
  // Agent Core作为消费者
  consumeMessages(): AsyncIterator<T>;
  
  // Agent Core状态通知
  notifyAgentStatus(status: AgentStatus): void;
  
  // 中断处理
  handleInterrupt(signal: AbortSignal): void;
}

// 与输入处理器的接口
interface InputHandlerIntegration<T> {
  // 输入处理器作为生产者
  publishMessage(message: T): void;
  
  // 批量消息发布
  publishBatch(messages: T[]): void;
  
  // 输入验证
  validateMessage(message: T): ValidationResult;
}

// 与监控系统的接口
interface MonitoringIntegration {
  // 指标导出
  exportMetrics(): Promise<MetricsSnapshot>;
  
  // 健康检查
  healthCheck(): HealthStatus;
  
  // 告警触发
  triggerAlert(alert: Alert): void;
}
```

## 🔄 通信协议设计

### 消息格式标准
```typescript
// 标准消息格式
interface StandardMessage {
  // 消息头
  header: {
    id: string;                     // 消息唯一标识
    timestamp: number;              // 时间戳
    type: MessageType;              // 消息类型
    priority: Priority;             // 优先级
    source: string;                 // 来源标识
  };
  
  // 消息体
  payload: any;                     // 实际消息内容
  
  // 消息元数据
  metadata?: {
    correlationId?: string;         // 关联ID
    replyTo?: string;               // 回复地址
    ttl?: number;                   // 生存时间
    retryCount?: number;            // 重试次数
  };
}

enum MessageType {
  USER_INPUT = 'user_input',        // 用户输入
  AGENT_RESPONSE = 'agent_response', // Agent响应
  TOOL_CALL = 'tool_call',          // 工具调用
  TOOL_RESULT = 'tool_result',      // 工具结果
  SYSTEM_EVENT = 'system_event',    // 系统事件
  INTERRUPT = 'interrupt'           // 中断信号
}

enum Priority {
  LOW = 0,                          // 低优先级
  NORMAL = 1,                       // 普通优先级
  HIGH = 2,                         // 高优先级
  URGENT = 3                        // 紧急优先级
}
```

### 流控制协议
```typescript
// 流控制机制
interface FlowControlProtocol {
  // 发送方法
  send(message: StandardMessage): Promise<SendResult>;
  
  // 批量发送
  sendBatch(messages: StandardMessage[]): Promise<BatchSendResult>;
  
  // 接收方法
  receive(): Promise<StandardMessage>;
  
  // 确认机制
  acknowledge(messageId: string): void;
  
  // 拒绝机制  
  reject(messageId: string, reason: string): void;
  
  // 流控制
  pause(): void;
  resume(): void;
  close(): Promise<void>;
}
```

## 🏗️ 状态管理策略

### 队列生命周期状态
```typescript
enum QueueLifecycleState {
  CREATED = 'created',              // 已创建
  INITIALIZED = 'initialized',     // 已初始化
  ACTIVE = 'active',                // 活跃状态
  PAUSED = 'paused',                // 暂停状态
  DRAINING = 'draining',            // 排空中
  COMPLETED = 'completed',          // 已完成
  ERROR = 'error',                  // 错误状态
  DISPOSED = 'disposed'             // 已销毁
}

class QueueStateManager {
  private currentState: QueueLifecycleState = QueueLifecycleState.CREATED;
  private stateHistory: StateTransition[] = [];
  
  // 状态转换方法
  transitionTo(newState: QueueLifecycleState, context?: any): void {
    // 验证状态转换的合法性
    if (!this.canTransitionTo(newState)) {
      throw new Error(`Invalid state transition: ${this.currentState} -> ${newState}`);
    }
    
    // 记录状态变化
    const transition: StateTransition = {
      from: this.currentState,
      to: newState,
      timestamp: Date.now(),
      context: context
    };
    
    this.stateHistory.push(transition);
    this.currentState = newState;
    
    // 触发状态变化事件
    this.notifyStateChange(transition);
  }
  
  // 状态转换规则验证
  private canTransitionTo(targetState: QueueLifecycleState): boolean {
    const validTransitions: Record<QueueLifecycleState, QueueLifecycleState[]> = {
      [QueueLifecycleState.CREATED]: [QueueLifecycleState.INITIALIZED, QueueLifecycleState.ERROR],
      [QueueLifecycleState.INITIALIZED]: [QueueLifecycleState.ACTIVE, QueueLifecycleState.ERROR],
      [QueueLifecycleState.ACTIVE]: [QueueLifecycleState.PAUSED, QueueLifecycleState.DRAINING, QueueLifecycleState.ERROR],
      [QueueLifecycleState.PAUSED]: [QueueLifecycleState.ACTIVE, QueueLifecycleState.DRAINING, QueueLifecycleState.ERROR],
      [QueueLifecycleState.DRAINING]: [QueueLifecycleState.COMPLETED, QueueLifecycleState.ERROR],
      [QueueLifecycleState.COMPLETED]: [QueueLifecycleState.DISPOSED],
      [QueueLifecycleState.ERROR]: [QueueLifecycleState.DISPOSED],
      [QueueLifecycleState.DISPOSED]: []
    };
    
    return validTransitions[this.currentState]?.includes(targetState) ?? false;
  }
}
```

### 内部状态同步机制
```typescript
// 状态同步器
class QueueStateSynchronizer {
  private watchers: Map<string, StateWatcher> = new Map();
  
  // 注册状态监听器
  watch(key: string, callback: StateChangeCallback): void {
    this.watchers.set(key, {
      callback: callback,
      lastNotified: Date.now()
    });
  }
  
  // 取消监听
  unwatch(key: string): void {
    this.watchers.delete(key);
  }
  
  // 广播状态变化
  broadcast(change: StateChange): void {
    for (const [key, watcher] of this.watchers) {
      try {
        watcher.callback(change);
        watcher.lastNotified = Date.now();
      } catch (error) {
        console.error(`State watcher ${key} failed:`, error);
        // 移除失败的监听器
        this.watchers.delete(key);
      }
    }
  }
}
```

## ⚠️ 错误处理与恢复

### 错误分类体系
```typescript
enum QueueErrorType {
  CONFIGURATION_ERROR = 'configuration_error',     // 配置错误
  BUFFER_OVERFLOW = 'buffer_overflow',             // 缓冲区溢出
  MESSAGE_VALIDATION_ERROR = 'message_validation_error', // 消息验证错误
  TIMEOUT_ERROR = 'timeout_error',                 // 超时错误
  INTERNAL_ERROR = 'internal_error',               // 内部错误
  RESOURCE_EXHAUSTION = 'resource_exhaustion',     // 资源耗尽
  NETWORK_ERROR = 'network_error'                  // 网络错误
}

class QueueError extends Error {
  constructor(
    public readonly type: QueueErrorType,
    message: string,
    public readonly context?: any,
    public readonly recoverable: boolean = true
  ) {
    super(message);
    this.name = 'QueueError';
  }
}
```

### 错误恢复策略
```typescript
interface ErrorRecoveryStrategy {
  // 错误检测
  detectError(error: Error): QueueErrorType;
  
  // 恢复操作
  recover(error: QueueError, context: RecoveryContext): Promise<RecoveryResult>;
  
  // 预防措施
  preventError(errorType: QueueErrorType): void;
}

class AutoRecoveryManager {
  private recoveryStrategies: Map<QueueErrorType, ErrorRecoveryStrategy> = new Map();
  private maxRetryAttempts: number = 3;
  private retryDelay: number = 1000;
  
  // 自动恢复处理
  async handleError(error: QueueError, queue: h2AAsyncMessageQueue): Promise<boolean> {
    const strategy = this.recoveryStrategies.get(error.type);
    
    if (!strategy || !error.recoverable) {
      return false; // 无法恢复
    }
    
    let attempts = 0;
    while (attempts < this.maxRetryAttempts) {
      try {
        const result = await strategy.recover(error, { queue, attempt: attempts });
        
        if (result.success) {
          return true; // 恢复成功
        }
        
        attempts++;
        await this.delay(this.retryDelay * Math.pow(2, attempts)); // 指数退避
      } catch (recoveryError) {
        console.error(`Recovery attempt ${attempts + 1} failed:`, recoveryError);
        attempts++;
      }
    }
    
    return false; // 恢复失败
  }
}
```

## 📊 性能监控与优化

### 关键性能指标
```typescript
interface QueuePerformanceMetrics {
  // 吞吐量指标
  throughput: {
    messagesPerSecond: number;      // 每秒消息数
    bytesPerSecond: number;         // 每秒字节数
    peakThroughput: number;         // 峰值吞吐量
  };
  
  // 延迟指标
  latency: {
    avgLatency: number;             // 平均延迟
    p50Latency: number;             // 50百分位延迟
    p95Latency: number;             // 95百分位延迟
    p99Latency: number;             // 99百分位延迟
    maxLatency: number;             // 最大延迟
  };
  
  // 资源使用指标
  resources: {
    memoryUsage: number;            // 内存使用量
    cpuUsage: number;               // CPU使用率
    bufferUtilization: number;      // 缓冲区利用率
  };
  
  // 错误指标
  errors: {
    totalErrors: number;            // 总错误数
    errorRate: number;              // 错误率
    timeoutCount: number;           // 超时次数
    overflowCount: number;          // 溢出次数
  };
}
```

### 性能优化策略
```typescript
class PerformanceOptimizer {
  // 自适应缓冲区大小调整
  adjustBufferSize(metrics: QueuePerformanceMetrics): number {
    // 基于当前性能指标动态调整缓冲区大小
    const currentUtilization = metrics.resources.bufferUtilization;
    const errorRate = metrics.errors.errorRate;
    
    if (currentUtilization > 0.8 && errorRate < 0.01) {
      // 高利用率，低错误率 - 增加缓冲区
      return Math.min(this.maxBufferSize, this.currentBufferSize * 1.5);
    } else if (currentUtilization < 0.3) {
      // 低利用率 - 减少缓冲区以节省内存
      return Math.max(this.minBufferSize, this.currentBufferSize * 0.8);
    }
    
    return this.currentBufferSize; // 保持当前大小
  }
  
  // 智能批处理优化
  optimizeBatching(metrics: QueuePerformanceMetrics): BatchConfiguration {
    const avgLatency = metrics.latency.avgLatency;
    const throughput = metrics.throughput.messagesPerSecond;
    
    // 根据延迟和吞吐量动态调整批处理参数
    if (avgLatency > this.maxAcceptableLatency) {
      // 延迟过高，减少批大小
      return {
        batchSize: Math.max(1, this.currentBatchSize / 2),
        batchTimeout: this.currentBatchTimeout / 2
      };
    } else if (throughput < this.minRequiredThroughput) {
      // 吞吐量不足，增加批大小
      return {
        batchSize: Math.min(this.maxBatchSize, this.currentBatchSize * 2),
        batchTimeout: this.currentBatchTimeout * 1.5
      };
    }
    
    return {
      batchSize: this.currentBatchSize,
      batchTimeout: this.currentBatchTimeout
    };
  }
}
```

## 🔧 配置参数规范

### 基础配置参数
```typescript
interface QueueConfiguration {
  // 缓冲区配置
  buffer: {
    maxSize: number;                // 最大缓冲区大小（默认1000）
    initialSize: number;            // 初始缓冲区大小（默认100）
    growthFactor: number;           // 增长因子（默认1.5）
    shrinkThreshold: number;        // 收缩阈值（默认0.3）
  };
  
  // 超时配置
  timeout: {
    readTimeout: number;            // 读取超时（默认0=无限等待）
    writeTimeout: number;           // 写入超时（默认1000ms）
    drainTimeout: number;           // 排空超时（默认5000ms）
  };
  
  // 性能配置
  performance: {
    enableMetrics: boolean;         // 启用性能指标（默认false）
    metricsInterval: number;        // 指标收集间隔（默认1000ms）
    enableOptimization: boolean;    // 启用自动优化（默认true）
    batchSize: number;             // 批处理大小（默认1）
  };
  
  // 错误处理配置
  errorHandling: {
    maxRetries: number;            // 最大重试次数（默认3）
    retryDelay: number;            // 重试延迟（默认1000ms）
    enableAutoRecovery: boolean;   // 启用自动恢复（默认true）
    errorReportingEnabled: boolean; // 启用错误报告（默认true）
  };
}
```

### 高级配置选项
```typescript
interface AdvancedQueueConfiguration {
  // 背压控制
  backpressure: {
    strategy: BackpressureStrategy; // 背压策略
    threshold: number;              // 触发阈值
    releaseThreshold: number;       // 释放阈值
  };
  
  // 内存管理
  memory: {
    maxMemoryUsage: number;         // 最大内存使用（字节）
    gcThreshold: number;            // GC触发阈值
    enableMemoryProfiling: boolean; // 启用内存分析
  };
  
  // 监控和告警
  monitoring: {
    enableHealthCheck: boolean;     // 启用健康检查
    healthCheckInterval: number;    // 健康检查间隔
    alertThresholds: AlertThresholds; // 告警阈值
  };
}
```

---

*本文档通过精确的自然语言描述，完整定义了h2A异步消息队列的实现细节。这种双重缓冲机制和Promise-based的异步迭代器设计，为实时Steering交互提供了高效、可靠的基础设施，体现了"文档即软件"3.0在复杂异步系统设计上的精确表达能力。*