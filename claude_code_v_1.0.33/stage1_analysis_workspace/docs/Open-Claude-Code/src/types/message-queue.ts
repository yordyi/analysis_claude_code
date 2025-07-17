/**
 * h2A双重缓冲异步消息队列类型定义
 * 
 * 本文件定义了Claude Code实时Steering机制核心组件的所有类型、接口和枚举。
 * 基于对原始h2A类的深度逆向分析，精确复现其创新的双重缓冲机制和Promise-based异步迭代器设计。
 */

// ============================================================================
// 核心类型定义
// ============================================================================

/**
 * Promise回调函数类型定义
 */
export type ResolveCallback<T> = (value: IteratorResult<T>) => void;
export type RejectCallback = (reason: any) => void;

/**
 * 状态变化回调函数类型
 */
export type StateChangeCallback = (change: StateChange) => void;

// ============================================================================
// 枚举定义
// ============================================================================

/**
 * 背压处理策略枚举
 */
export enum BackpressureStrategy {
  DROP_OLDEST = 'drop_oldest',     // 丢弃最旧消息
  DROP_NEWEST = 'drop_newest',     // 丢弃最新消息  
  ERROR = 'error',                 // 抛出错误
  BLOCK = 'block'                  // 阻塞等待
}

/**
 * 消息类型枚举
 */
export enum MessageType {
  USER_INPUT = 'user_input',        // 用户输入
  AGENT_RESPONSE = 'agent_response', // Agent响应
  TOOL_CALL = 'tool_call',          // 工具调用
  TOOL_RESULT = 'tool_result',      // 工具结果
  SYSTEM_EVENT = 'system_event',    // 系统事件
  INTERRUPT = 'interrupt'           // 中断信号
}

/**
 * 消息优先级枚举
 */
export enum Priority {
  LOW = 0,                          // 低优先级
  NORMAL = 1,                       // 普通优先级
  HIGH = 2,                         // 高优先级
  URGENT = 3                        // 紧急优先级
}

/**
 * 队列生命周期状态枚举
 */
export enum QueueLifecycleState {
  CREATED = 'created',              // 已创建
  INITIALIZED = 'initialized',     // 已初始化
  ACTIVE = 'active',                // 活跃状态
  PAUSED = 'paused',                // 暂停状态
  DRAINING = 'draining',            // 排空中
  COMPLETED = 'completed',          // 已完成
  ERROR = 'error',                  // 错误状态
  DISPOSED = 'disposed'             // 已销毁
}

/**
 * 队列错误类型枚举
 */
export enum QueueErrorType {
  CONFIGURATION_ERROR = 'configuration_error',     // 配置错误
  BUFFER_OVERFLOW = 'buffer_overflow',             // 缓冲区溢出
  MESSAGE_VALIDATION_ERROR = 'message_validation_error', // 消息验证错误
  TIMEOUT_ERROR = 'timeout_error',                 // 超时错误
  INTERNAL_ERROR = 'internal_error',               // 内部错误
  RESOURCE_EXHAUSTION = 'resource_exhaustion',     // 资源耗尽
  NETWORK_ERROR = 'network_error'                  // 网络错误
}

// ============================================================================
// 性能指标接口
// ============================================================================

/**
 * 队列基础性能指标
 */
export interface QueueMetrics {
  enqueueCount: number;        // 入队次数
  dequeueCount: number;        // 出队次数
  maxQueueSize: number;        // 最大队列长度
  totalWaitTime: number;       // 总等待时间
  avgLatency: number;          // 平均延迟
  droppedMessages: number;     // 丢弃消息数量
}

/**
 * 详细性能指标
 */
export interface QueuePerformanceMetrics {
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

// ============================================================================
// 消息格式接口
// ============================================================================

/**
 * 标准消息格式
 */
export interface StandardMessage {
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

// ============================================================================
// 状态管理接口
// ============================================================================

/**
 * 状态转换记录
 */
export interface StateTransition {
  from: QueueLifecycleState;        // 源状态
  to: QueueLifecycleState;          // 目标状态
  timestamp: number;                // 转换时间戳
  context?: any;                    // 转换上下文
}

/**
 * 状态变化事件
 */
export interface StateChange {
  transition: StateTransition;      // 状态转换信息
  queueId: string;                  // 队列标识
  metadata?: any;                   // 额外元数据
}

/**
 * 状态监听器
 */
export interface StateWatcher {
  callback: StateChangeCallback;    // 回调函数
  lastNotified: number;             // 最后通知时间
}

/**
 * 队列状态查询接口
 */
export interface QueueStatus {
  isStarted: boolean;               // 是否已启动
  isDone: boolean;                  // 是否已完成
  hasError: boolean;                // 是否有错误
  queueSize: number;                // 当前队列大小
  hasWaitingReader: boolean;        // 是否有等待的读取者
  currentState: QueueLifecycleState; // 当前生命周期状态
}

// ============================================================================
// 错误处理接口
// ============================================================================

/**
 * 恢复上下文
 */
export interface RecoveryContext {
  queue: any;                       // 队列实例引用
  attempt: number;                  // 恢复尝试次数
  timestamp: number;                // 恢复开始时间
}

/**
 * 恢复结果
 */
export interface RecoveryResult {
  success: boolean;                 // 是否成功
  message?: string;                 // 结果消息
  retryAfter?: number;              // 建议重试间隔
}

/**
 * 错误恢复策略接口
 */
export interface ErrorRecoveryStrategy {
  // 错误检测
  detectError(error: Error): QueueErrorType;
  
  // 恢复操作
  recover(error: QueueError, context: RecoveryContext): Promise<RecoveryResult>;
  
  // 预防措施
  preventError(errorType: QueueErrorType): void;
}

// ============================================================================
// 配置接口
// ============================================================================

/**
 * 批处理配置
 */
export interface BatchConfiguration {
  batchSize: number;                // 批处理大小
  batchTimeout: number;             // 批处理超时
}

/**
 * 告警阈值配置
 */
export interface AlertThresholds {
  maxLatency: number;               // 最大延迟阈值
  maxErrorRate: number;             // 最大错误率阈值
  maxMemoryUsage: number;           // 最大内存使用阈值
  minThroughput: number;            // 最小吞吐量阈值
}

/**
 * 基础队列配置
 */
export interface QueueConfiguration {
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

/**
 * 高级队列配置
 */
export interface AdvancedQueueConfiguration {
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

/**
 * 消息队列输入接口
 */
export interface MessageQueueInput<T> {
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

/**
 * 消息队列输出接口
 */
export interface MessageQueueOutput<T> {
  // AsyncIterator标准接口
  next(): Promise<IteratorResult<T>>;
  
  // 迭代结果
  IteratorResult: {
    done: boolean;                  // 是否完成
    value?: T;                      // 消息值（done=false时有效）
  };
  
  // 性能指标输出
  getMetrics(): QueueMetrics;
  
  // 状态查询
  getStatus(): QueueStatus;
}

// ============================================================================
// 集成接口
// ============================================================================

/**
 * 发送结果
 */
export interface SendResult {
  success: boolean;                 // 是否成功
  messageId?: string;               // 消息ID
  timestamp: number;                // 发送时间戳
  error?: string;                   // 错误信息
}

/**
 * 批量发送结果
 */
export interface BatchSendResult {
  totalSent: number;                // 总发送数量
  successful: number;               // 成功数量
  failed: number;                   // 失败数量
  results: SendResult[];            // 详细结果列表
}

/**
 * 健康状态
 */
export interface HealthStatus {
  isHealthy: boolean;               // 是否健康
  lastCheck: number;                // 最后检查时间
  issues?: string[];                // 问题列表
}

/**
 * 告警信息
 */
export interface Alert {
  type: string;                     // 告警类型
  severity: 'low' | 'medium' | 'high' | 'critical'; // 严重程度
  message: string;                  // 告警消息
  timestamp: number;                // 告警时间
  metadata?: any;                   // 额外数据
}

/**
 * 指标快照
 */
export interface MetricsSnapshot {
  timestamp: number;                // 快照时间
  metrics: QueuePerformanceMetrics; // 性能指标
  queueId: string;                  // 队列标识
}

/**
 * 验证结果
 */
export interface ValidationResult {
  isValid: boolean;                 // 是否有效
  errors?: string[];                // 验证错误列表
  warnings?: string[];              // 警告列表
}

/**
 * Agent状态
 */
export interface AgentStatus {
  isActive: boolean;                // 是否活跃
  currentTask?: string;             // 当前任务
  lastActivity: number;             // 最后活动时间
}

/**
 * 流控制协议接口
 */
export interface FlowControlProtocol {
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

// ============================================================================
// 系统集成接口
// ============================================================================

/**
 * 与Agent Core的集成接口
 */
export interface AgentCoreIntegration<T> {
  // Agent Core作为消费者
  consumeMessages(): AsyncIterator<T>;
  
  // Agent Core状态通知
  notifyAgentStatus(status: AgentStatus): void;
  
  // 中断处理
  handleInterrupt(signal: AbortSignal): void;
}

/**
 * 与输入处理器的集成接口
 */
export interface InputHandlerIntegration<T> {
  // 输入处理器作为生产者
  publishMessage(message: T): void;
  
  // 批量消息发布
  publishBatch(messages: T[]): void;
  
  // 输入验证
  validateMessage(message: T): ValidationResult;
}

/**
 * 与监控系统的集成接口
 */
export interface MonitoringIntegration {
  // 指标导出
  exportMetrics(): Promise<MetricsSnapshot>;
  
  // 健康检查
  healthCheck(): HealthStatus;
  
  // 告警触发
  triggerAlert(alert: Alert): void;
}

// ============================================================================
// 自定义错误类
// ============================================================================

/**
 * 队列错误类
 */
export class QueueError extends Error {
  constructor(
    public readonly type: QueueErrorType,
    message: string,
    public readonly context?: any,
    public readonly recoverable: boolean = true
  ) {
    super(message);
    this.name = 'QueueError';
    
    // 设置正确的原型链，确保 instanceof 正常工作
    Object.setPrototypeOf(this, QueueError.prototype);
  }
}

// ============================================================================
// 导出默认配置
// ============================================================================

/**
 * 默认队列配置
 */
export const DEFAULT_QUEUE_CONFIG: QueueConfiguration = {
  buffer: {
    maxSize: 1000,
    initialSize: 100,
    growthFactor: 1.5,
    shrinkThreshold: 0.3
  },
  timeout: {
    readTimeout: 0,
    writeTimeout: 1000,
    drainTimeout: 5000
  },
  performance: {
    enableMetrics: false,
    metricsInterval: 1000,
    enableOptimization: true,
    batchSize: 1
  },
  errorHandling: {
    maxRetries: 3,
    retryDelay: 1000,
    enableAutoRecovery: true,
    errorReportingEnabled: true
  }
};

/**
 * 默认高级配置
 */
export const DEFAULT_ADVANCED_CONFIG: AdvancedQueueConfiguration = {
  backpressure: {
    strategy: BackpressureStrategy.DROP_OLDEST,
    threshold: 0.8,
    releaseThreshold: 0.6
  },
  memory: {
    maxMemoryUsage: 100 * 1024 * 1024, // 100MB
    gcThreshold: 0.7,
    enableMemoryProfiling: false
  },
  monitoring: {
    enableHealthCheck: true,
    healthCheckInterval: 5000,
    alertThresholds: {
      maxLatency: 1000,
      maxErrorRate: 0.05,
      maxMemoryUsage: 80 * 1024 * 1024, // 80MB
      minThroughput: 100
    }
  }
};