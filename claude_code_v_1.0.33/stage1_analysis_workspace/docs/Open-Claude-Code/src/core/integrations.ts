/**
 * h2A消息队列系统集成接口实现
 * 
 * 提供与Claude Code核心系统组件的完整集成：
 * - Agent Core集成：消息消费、状态通知、中断处理
 * - Input Handler集成：消息生产、批量发布、输入验证
 * - Monitoring集成：指标导出、健康检查、告警处理
 * - Tool Execution集成：工具调用消息路由
 * - UI Event集成：界面事件消息流处理
 */

import { EventEmitter } from 'events';
import {
  h2AAsyncMessageQueue,
  createMessageQueue,
  createHighPerformanceQueue
} from './message-queue.js';
import {
  StandardMessage,
  MessageType,
  Priority,
  QueueStatus,
  QueueMetrics,
  QueuePerformanceMetrics,
  AgentStatus,
  ValidationResult,
  HealthStatus,
  Alert,
  MetricsSnapshot,
  SendResult,
  BatchSendResult,
  FlowControlProtocol,
  AgentCoreIntegration,
  InputHandlerIntegration,
  MonitoringIntegration,
  BackpressureStrategy,
  QueueLifecycleState
} from '../types/message-queue.js';
import { AutoRecoveryManager, ErrorAnalyzer } from './error-recovery.js';

// ============================================================================
// Agent Core集成实现
// ============================================================================

/**
 * Agent Core集成适配器
 * 
 * 负责Agent Core与消息队列系统的集成，提供消息消费、状态同步和中断处理能力。
 */
export class AgentCoreAdapter<T = StandardMessage> extends EventEmitter implements AgentCoreIntegration<T> {
  private messageQueue: h2AAsyncMessageQueue<T>;
  private isConsuming: boolean = false;
  private currentAgentStatus: AgentStatus;
  private abortController?: AbortController;
  private processingStats: {
    processedCount: number;
    errorCount: number;
    lastProcessTime: number;
  };

  constructor(options: {
    messageQueue?: h2AAsyncMessageQueue<T>;
    agentId?: string;
    enableHighPerformance?: boolean;
  } = {}) {
    super();
    
    this.messageQueue = options.messageQueue ?? 
      (options.enableHighPerformance ? 
        createHighPerformanceQueue<T>() : 
        createMessageQueue<T>());
    
    this.currentAgentStatus = {
      isActive: false,
      lastActivity: Date.now()
    };
    
    this.processingStats = {
      processedCount: 0,
      errorCount: 0,
      lastProcessTime: Date.now()
    };

    // 监听队列状态变化
    this.messageQueue.onStateChange('agent-core', (change) => {
      this.emit('queueStateChange', change);
    });
  }

  /**
   * 开始消费消息
   */
  async startConsuming(): Promise<void> {
    if (this.isConsuming) {
      throw new Error('Agent Core is already consuming messages');
    }

    this.isConsuming = true;
    this.abortController = new AbortController();
    
    this.updateAgentStatus({
      isActive: true,
      currentTask: 'message_consumption',
      lastActivity: Date.now()
    });

    try {
      for await (const message of this.messageQueue) {
        // 检查中断信号
        if (this.abortController.signal.aborted) {
          break;
        }

        await this.processMessage(message);
      }
    } catch (error) {
      this.processingStats.errorCount++;
      this.emit('consumptionError', error);
      throw error;
    } finally {
      this.isConsuming = false;
      this.updateAgentStatus({
        isActive: false,
        lastActivity: Date.now()
      });
    }
  }

  /**
   * 停止消费消息
   */
  async stopConsuming(): Promise<void> {
    if (!this.isConsuming) {
      return;
    }

    if (this.abortController) {
      this.abortController.abort();
    }

    // 优雅地完成队列
    this.messageQueue.done();
    
    this.updateAgentStatus({
      isActive: false,
      currentTask: undefined,
      lastActivity: Date.now()
    });
  }

  /**
   * 获取消息迭代器
   */
  consumeMessages(): AsyncIterator<T> {
    return this.messageQueue[Symbol.asyncIterator]();
  }

  /**
   * 处理单个消息
   */
  private async processMessage(message: T): Promise<void> {
    const startTime = Date.now();
    
    try {
      // 更新活动时间
      this.currentAgentStatus.lastActivity = Date.now();
      
      // 发出消息处理事件
      this.emit('messageReceived', message);
      
      // 如果是标准消息，根据类型进行特殊处理
      if (this.isStandardMessage(message)) {
        await this.processStandardMessage(message);
      } else {
        // 通用消息处理
        this.emit('messageProcessed', message);
      }
      
      this.processingStats.processedCount++;
      this.processingStats.lastProcessTime = Date.now() - startTime;
      
    } catch (error) {
      this.processingStats.errorCount++;
      this.emit('messageProcessingError', { message, error });
      throw error;
    }
  }

  /**
   * 处理标准消息
   */
  private async processStandardMessage(message: StandardMessage): Promise<void> {
    switch (message.header.type) {
      case MessageType.USER_INPUT:
        this.emit('userInput', message);
        break;
      case MessageType.TOOL_CALL:
        this.emit('toolCall', message);
        break;
      case MessageType.TOOL_RESULT:
        this.emit('toolResult', message);
        break;
      case MessageType.SYSTEM_EVENT:
        this.emit('systemEvent', message);
        break;
      case MessageType.INTERRUPT:
        await this.handleInterruptMessage(message);
        break;
      default:
        this.emit('messageProcessed', message);
    }
  }

  /**
   * 处理中断消息
   */
  private async handleInterruptMessage(message: StandardMessage): Promise<void> {
    this.emit('interrupt', message);
    
    // 如果是紧急中断，立即停止处理
    if (message.header.priority === Priority.URGENT) {
      await this.stopConsuming();
    }
  }

  /**
   * 通知Agent状态
   */
  notifyAgentStatus(status: AgentStatus): void {
    this.updateAgentStatus(status);
    this.emit('agentStatusUpdate', status);
  }

  /**
   * 更新Agent状态
   */
  private updateAgentStatus(updates: Partial<AgentStatus>): void {
    this.currentAgentStatus = {
      ...this.currentAgentStatus,
      ...updates
    };
  }

  /**
   * 处理中断信号
   */
  handleInterrupt(signal: AbortSignal): void {
    signal.addEventListener('abort', () => {
      this.stopConsuming().catch(error => {
        this.emit('interruptError', error);
      });
    });
  }

  /**
   * 获取当前Agent状态
   */
  getAgentStatus(): AgentStatus {
    return { ...this.currentAgentStatus };
  }

  /**
   * 获取处理统计
   */
  getProcessingStats() {
    return { ...this.processingStats };
  }

  /**
   * 获取队列状态
   */
  getQueueStatus(): QueueStatus {
    return this.messageQueue.getStatus();
  }

  /**
   * 检查是否为标准消息
   */
  private isStandardMessage(message: any): message is StandardMessage {
    return message && 
           typeof message === 'object' && 
           message.header && 
           typeof message.header.type === 'string' &&
           typeof message.header.timestamp === 'number';
  }

  /**
   * 销毁适配器
   */
  async dispose(): Promise<void> {
    await this.stopConsuming();
    this.messageQueue.dispose();
    this.removeAllListeners();
  }
}

// ============================================================================
// Input Handler集成实现  
// ============================================================================

/**
 * Input Handler集成适配器
 * 
 * 负责输入处理器与消息队列系统的集成，提供消息生产、验证和批量处理能力。
 */
export class InputHandlerAdapter<T = StandardMessage> extends EventEmitter implements InputHandlerIntegration<T> {
  private messageQueue: h2AAsyncMessageQueue<T>;
  private validator?: (message: T) => ValidationResult;
  private publishingStats: {
    publishedCount: number;
    validationErrorCount: number;
    lastPublishTime: number;
  };
  private batchBuffer: T[] = [];
  private batchConfig: {
    maxSize: number;
    maxWaitTime: number;
    autoFlush: boolean;
  };
  private batchTimer?: NodeJS.Timeout;

  constructor(options: {
    messageQueue?: h2AAsyncMessageQueue<T>;
    validator?: (message: T) => ValidationResult;
    batchConfig?: {
      maxSize?: number;
      maxWaitTime?: number;
      autoFlush?: boolean;
    };
  } = {}) {
    super();
    
    this.messageQueue = options.messageQueue ?? createMessageQueue<T>();
    this.validator = options.validator;
    
    this.batchConfig = {
      maxSize: options.batchConfig?.maxSize ?? 100,
      maxWaitTime: options.batchConfig?.maxWaitTime ?? 1000,
      autoFlush: options.batchConfig?.autoFlush ?? true
    };
    
    this.publishingStats = {
      publishedCount: 0,
      validationErrorCount: 0,
      lastPublishTime: Date.now()
    };
  }

  /**
   * 发布单个消息
   */
  publishMessage(message: T): void {
    try {
      // 验证消息
      const validationResult = this.validateMessage(message);
      if (!validationResult.isValid) {
        this.publishingStats.validationErrorCount++;
        this.emit('validationError', { message, errors: validationResult.errors });
        throw new Error(`Message validation failed: ${validationResult.errors?.join(', ')}`);
      }

      // 发出验证警告（如果有）
      if (validationResult.warnings && validationResult.warnings.length > 0) {
        this.emit('validationWarning', { message, warnings: validationResult.warnings });
      }

      // 发布消息
      this.messageQueue.enqueue(message);
      this.publishingStats.publishedCount++;
      this.publishingStats.lastPublishTime = Date.now();
      
      this.emit('messagePublished', message);
      
    } catch (error) {
      this.emit('publishError', { message, error });
      throw error;
    }
  }

  /**
   * 批量发布消息
   */
  publishBatch(messages: T[]): void {
    const results: { message: T; success: boolean; error?: Error }[] = [];
    
    for (const message of messages) {
      try {
        this.publishMessage(message);
        results.push({ message, success: true });
      } catch (error) {
        results.push({ 
          message, 
          success: false, 
          error: error instanceof Error ? error : new Error(String(error))
        });
      }
    }
    
    this.emit('batchPublished', { results, successCount: results.filter(r => r.success).length });
  }

  /**
   * 添加消息到批处理缓冲区
   */
  addToBatch(message: T): void {
    // 验证消息
    const validationResult = this.validateMessage(message);
    if (!validationResult.isValid) {
      this.publishingStats.validationErrorCount++;
      this.emit('validationError', { message, errors: validationResult.errors });
      return;
    }

    this.batchBuffer.push(message);
    
    // 检查是否需要刷新缓冲区
    if (this.batchBuffer.length >= this.batchConfig.maxSize) {
      this.flushBatch();
    } else if (this.batchConfig.autoFlush && !this.batchTimer) {
      // 设置定时刷新
      this.batchTimer = setTimeout(() => {
        this.flushBatch();
      }, this.batchConfig.maxWaitTime);
    }
  }

  /**
   * 刷新批处理缓冲区
   */
  flushBatch(): void {
    if (this.batchBuffer.length === 0) {
      return;
    }

    const messagesToFlush = [...this.batchBuffer];
    this.batchBuffer = [];
    
    // 清除定时器
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = undefined;
    }

    this.publishBatch(messagesToFlush);
  }

  /**
   * 验证消息
   */
  validateMessage(message: T): ValidationResult {
    if (!this.validator) {
      return { isValid: true };
    }

    try {
      return this.validator(message);
    } catch (error) {
      return {
        isValid: false,
        errors: [`Validation failed: ${error instanceof Error ? error.message : String(error)}`]
      };
    }
  }

  /**
   * 设置消息验证器
   */
  setValidator(validator: (message: T) => ValidationResult): void {
    this.validator = validator;
  }

  /**
   * 获取发布统计
   */
  getPublishingStats() {
    return { ...this.publishingStats };
  }

  /**
   * 获取批处理状态
   */
  getBatchStatus() {
    return {
      bufferSize: this.batchBuffer.length,
      maxSize: this.batchConfig.maxSize,
      hasTimer: !!this.batchTimer
    };
  }

  /**
   * 配置批处理参数
   */
  configureBatch(config: Partial<typeof this.batchConfig>): void {
    this.batchConfig = { ...this.batchConfig, ...config };
  }

  /**
   * 销毁适配器
   */
  async dispose(): Promise<void> {
    // 刷新剩余的批处理消息
    this.flushBatch();
    
    // 清除定时器
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }
    
    this.removeAllListeners();
  }
}

// ============================================================================
// Monitoring集成实现
// ============================================================================

/**
 * Monitoring集成适配器
 * 
 * 负责监控系统与消息队列的集成，提供指标导出、健康检查和告警处理能力。
 */
export class MonitoringAdapter extends EventEmitter implements MonitoringIntegration {
  private messageQueues: Map<string, h2AAsyncMessageQueue<any>> = new Map();
  private errorAnalyzer: ErrorAnalyzer;
  private recoveryManager: AutoRecoveryManager;
  private healthCheckInterval?: NodeJS.Timeout;
  private metricsCollectionInterval?: NodeJS.Timeout;
  private alertThresholds: {
    maxLatency: number;
    maxErrorRate: number;
    maxQueueSize: number;
    minThroughput: number;
  };

  constructor(options: {
    healthCheckIntervalMs?: number;
    metricsCollectionIntervalMs?: number;
    alertThresholds?: Partial<typeof MonitoringAdapter.prototype.alertThresholds>;
  } = {}) {
    super();
    
    this.errorAnalyzer = new ErrorAnalyzer();
    this.recoveryManager = new AutoRecoveryManager();
    
    this.alertThresholds = {
      maxLatency: 1000,
      maxErrorRate: 0.05,
      maxQueueSize: 10000,
      minThroughput: 100,
      ...options.alertThresholds
    };

    // 启动定期健康检查
    if (options.healthCheckIntervalMs) {
      this.startHealthChecks(options.healthCheckIntervalMs);
    }

    // 启动定期指标收集
    if (options.metricsCollectionIntervalMs) {
      this.startMetricsCollection(options.metricsCollectionIntervalMs);
    }
  }

  /**
   * 注册消息队列用于监控
   */
  registerQueue(queueId: string, queue: h2AAsyncMessageQueue<any>): void {
    this.messageQueues.set(queueId, queue);
    
    // 监听队列状态变化
    queue.onStateChange(`monitoring-${queueId}`, (change) => {
      this.handleQueueStateChange(queueId, change);
    });
    
    this.emit('queueRegistered', { queueId, queue });
  }

  /**
   * 取消注册消息队列
   */
  unregisterQueue(queueId: string): void {
    const queue = this.messageQueues.get(queueId);
    if (queue) {
      queue.offStateChange(`monitoring-${queueId}`);
      this.messageQueues.delete(queueId);
      this.emit('queueUnregistered', { queueId });
    }
  }

  /**
   * 导出指标快照
   */
  async exportMetrics(): Promise<MetricsSnapshot> {
    const timestamp = Date.now();
    const queueMetrics: Record<string, QueuePerformanceMetrics> = {};
    
    for (const [queueId, queue] of this.messageQueues) {
      try {
        queueMetrics[queueId] = queue.getDetailedMetrics();
      } catch (error) {
        console.warn(`Failed to get metrics for queue ${queueId}:`, error);
      }
    }

    const snapshot: MetricsSnapshot = {
      timestamp,
      queueId: 'aggregated',
      metrics: this.aggregateMetrics(Object.values(queueMetrics))
    };

    this.emit('metricsExported', snapshot);
    return snapshot;
  }

  /**
   * 执行健康检查
   */
  healthCheck(): HealthStatus {
    const issues: string[] = [];
    const checkTime = Date.now();

    for (const [queueId, queue] of this.messageQueues) {
      try {
        const status = queue.getStatus();
        const metrics = queue.getDetailedMetrics();

        // 检查队列状态
        if (status.hasError) {
          issues.push(`Queue ${queueId} has errors`);
        }

        if (status.currentState === QueueLifecycleState.ERROR) {
          issues.push(`Queue ${queueId} is in error state`);
        }

        // 检查性能指标
        if (metrics.latency.avgLatency > this.alertThresholds.maxLatency) {
          issues.push(`Queue ${queueId} latency too high: ${metrics.latency.avgLatency}ms`);
        }

        if (metrics.errors.errorRate > this.alertThresholds.maxErrorRate) {
          issues.push(`Queue ${queueId} error rate too high: ${(metrics.errors.errorRate * 100).toFixed(2)}%`);
        }

        if (status.queueSize > this.alertThresholds.maxQueueSize) {
          issues.push(`Queue ${queueId} size too large: ${status.queueSize}`);
        }

        if (metrics.throughput.messagesPerSecond < this.alertThresholds.minThroughput) {
          issues.push(`Queue ${queueId} throughput too low: ${metrics.throughput.messagesPerSecond} msgs/sec`);
        }

      } catch (error) {
        issues.push(`Health check failed for queue ${queueId}: ${error}`);
      }
    }

    const isHealthy = issues.length === 0;
    const healthStatus: HealthStatus = {
      isHealthy,
      lastCheck: checkTime,
      issues: issues.length > 0 ? issues : undefined
    };

    this.emit('healthCheckCompleted', healthStatus);
    return healthStatus;
  }

  /**
   * 触发告警
   */
  triggerAlert(alert: Alert): void {
    this.emit('alertTriggered', alert);
    
    // 记录告警到日志
    console.warn(`ALERT [${alert.severity.toUpperCase()}]: ${alert.message}`, {
      type: alert.type,
      timestamp: new Date(alert.timestamp).toISOString(),
      metadata: alert.metadata
    });
    
    // 对于严重告警，可能需要特殊处理
    if (alert.severity === 'critical') {
      this.emit('criticalAlert', alert);
    }
  }

  /**
   * 启动健康检查
   */
  private startHealthChecks(intervalMs: number): void {
    this.healthCheckInterval = setInterval(() => {
      try {
        const healthStatus = this.healthCheck();
        
        // 如果不健康，触发告警
        if (!healthStatus.isHealthy) {
          this.triggerAlert({
            type: 'health_check_failed',
            severity: 'high',
            message: `Health check failed: ${healthStatus.issues?.join(', ')}`,
            timestamp: Date.now(),
            metadata: { healthStatus }
          });
        }
      } catch (error) {
        console.error('Health check failed:', error);
      }
    }, intervalMs);
  }

  /**
   * 启动指标收集
   */
  private startMetricsCollection(intervalMs: number): void {
    this.metricsCollectionInterval = setInterval(async () => {
      try {
        const snapshot = await this.exportMetrics();
        this.analyzeMetrics(snapshot);
      } catch (error) {
        console.error('Metrics collection failed:', error);
      }
    }, intervalMs);
  }

  /**
   * 分析指标并触发相关告警
   */
  private analyzeMetrics(snapshot: MetricsSnapshot): void {
    const metrics = snapshot.metrics;
    
    // 检查各种阈值
    if (metrics.latency.avgLatency > this.alertThresholds.maxLatency) {
      this.triggerAlert({
        type: 'high_latency',
        severity: 'medium',
        message: `Average latency is high: ${metrics.latency.avgLatency}ms`,
        timestamp: Date.now(),
        metadata: { latency: metrics.latency }
      });
    }

    if (metrics.errors.errorRate > this.alertThresholds.maxErrorRate) {
      this.triggerAlert({
        type: 'high_error_rate',
        severity: 'high',
        message: `Error rate is high: ${(metrics.errors.errorRate * 100).toFixed(2)}%`,
        timestamp: Date.now(),
        metadata: { errors: metrics.errors }
      });
    }

    if (metrics.throughput.messagesPerSecond < this.alertThresholds.minThroughput) {
      this.triggerAlert({
        type: 'low_throughput',
        severity: 'medium',
        message: `Throughput is low: ${metrics.throughput.messagesPerSecond} msgs/sec`,
        timestamp: Date.now(),
        metadata: { throughput: metrics.throughput }
      });
    }
  }

  /**
   * 聚合多个队列的指标
   */
  private aggregateMetrics(metricsArray: QueuePerformanceMetrics[]): QueuePerformanceMetrics {
    if (metricsArray.length === 0) {
      // 返回默认指标
      return {
        throughput: { messagesPerSecond: 0, bytesPerSecond: 0, peakThroughput: 0 },
        latency: { avgLatency: 0, p50Latency: 0, p95Latency: 0, p99Latency: 0, maxLatency: 0 },
        resources: { memoryUsage: 0, cpuUsage: 0, bufferUtilization: 0 },
        errors: { totalErrors: 0, errorRate: 0, timeoutCount: 0, overflowCount: 0 }
      };
    }

    // 简单聚合策略
    const aggregated: QueuePerformanceMetrics = {
      throughput: {
        messagesPerSecond: metricsArray.reduce((sum, m) => sum + m.throughput.messagesPerSecond, 0),
        bytesPerSecond: metricsArray.reduce((sum, m) => sum + m.throughput.bytesPerSecond, 0),
        peakThroughput: Math.max(...metricsArray.map(m => m.throughput.peakThroughput))
      },
      latency: {
        avgLatency: metricsArray.reduce((sum, m) => sum + m.latency.avgLatency, 0) / metricsArray.length,
        p50Latency: metricsArray.reduce((sum, m) => sum + m.latency.p50Latency, 0) / metricsArray.length,
        p95Latency: Math.max(...metricsArray.map(m => m.latency.p95Latency)),
        p99Latency: Math.max(...metricsArray.map(m => m.latency.p99Latency)),
        maxLatency: Math.max(...metricsArray.map(m => m.latency.maxLatency))
      },
      resources: {
        memoryUsage: metricsArray.reduce((sum, m) => sum + m.resources.memoryUsage, 0),
        cpuUsage: metricsArray.reduce((sum, m) => sum + m.resources.cpuUsage, 0) / metricsArray.length,
        bufferUtilization: metricsArray.reduce((sum, m) => sum + m.resources.bufferUtilization, 0) / metricsArray.length
      },
      errors: {
        totalErrors: metricsArray.reduce((sum, m) => sum + m.errors.totalErrors, 0),
        errorRate: metricsArray.reduce((sum, m) => sum + m.errors.errorRate, 0) / metricsArray.length,
        timeoutCount: metricsArray.reduce((sum, m) => sum + m.errors.timeoutCount, 0),
        overflowCount: metricsArray.reduce((sum, m) => sum + m.errors.overflowCount, 0)
      }
    };

    return aggregated;
  }

  /**
   * 处理队列状态变化
   */
  private handleQueueStateChange(queueId: string, change: any): void {
    this.emit('queueStateChanged', { queueId, change });
    
    // 对于错误状态，触发告警
    if (change.transition.to === QueueLifecycleState.ERROR) {
      this.triggerAlert({
        type: 'queue_error_state',
        severity: 'high',
        message: `Queue ${queueId} entered error state`,
        timestamp: Date.now(),
        metadata: { queueId, change }
      });
    }
  }

  /**
   * 获取所有注册的队列状态
   */
  getAllQueueStatus(): Record<string, QueueStatus> {
    const status: Record<string, QueueStatus> = {};
    
    for (const [queueId, queue] of this.messageQueues) {
      try {
        status[queueId] = queue.getStatus();
      } catch (error) {
        console.warn(`Failed to get status for queue ${queueId}:`, error);
      }
    }
    
    return status;
  }

  /**
   * 获取监控统计
   */
  getMonitoringStats() {
    return {
      registeredQueues: this.messageQueues.size,
      errorAnalysis: this.errorAnalyzer.analyze(),
      recoveryStats: this.recoveryManager.getRecoveryStats()
    };
  }

  /**
   * 销毁监控适配器
   */
  async dispose(): Promise<void> {
    // 停止定时器
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    
    if (this.metricsCollectionInterval) {
      clearInterval(this.metricsCollectionInterval);
    }
    
    // 取消注册所有队列
    for (const queueId of this.messageQueues.keys()) {
      this.unregisterQueue(queueId);
    }
    
    this.removeAllListeners();
  }
}

// ============================================================================
// 流控制协议实现
// ============================================================================

/**
 * 流控制协议实现
 * 
 * 提供完整的流控制机制，包括消息发送、接收、确认和流量控制。
 */
export class FlowControlManager implements FlowControlProtocol {
  private messageQueue: h2AAsyncMessageQueue<StandardMessage>;
  private isPaused: boolean = false;
  private pendingAcks: Map<string, { message: StandardMessage; timestamp: number }> = new Map();
  private ackTimeout: number = 30000; // 30秒确认超时
  private flowControlStats: {
    sentCount: number;
    receivedCount: number;
    ackedCount: number;
    rejectedCount: number;
    timeoutCount: number;
  };

  constructor(options: {
    messageQueue?: h2AAsyncMessageQueue<StandardMessage>;
    ackTimeout?: number;
  } = {}) {
    this.messageQueue = options.messageQueue ?? createMessageQueue<StandardMessage>();
    this.ackTimeout = options.ackTimeout ?? 30000;
    
    this.flowControlStats = {
      sentCount: 0,
      receivedCount: 0,
      ackedCount: 0,
      rejectedCount: 0,
      timeoutCount: 0
    };

    // 启动确认超时检查
    this.startAckTimeoutCheck();
  }

  /**
   * 发送消息
   */
  async send(message: StandardMessage): Promise<SendResult> {
    if (this.isPaused) {
      return {
        success: false,
        timestamp: Date.now(),
        error: 'Flow control is paused'
      };
    }

    try {
      this.messageQueue.enqueue(message);
      this.flowControlStats.sentCount++;
      
      // 记录待确认消息
      this.pendingAcks.set(message.header.id, {
        message,
        timestamp: Date.now()
      });

      return {
        success: true,
        messageId: message.header.id,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        timestamp: Date.now(),
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * 批量发送消息
   */
  async sendBatch(messages: StandardMessage[]): Promise<BatchSendResult> {
    const results: SendResult[] = [];
    let successful = 0;
    let failed = 0;

    for (const message of messages) {
      const result = await this.send(message);
      results.push(result);
      
      if (result.success) {
        successful++;
      } else {
        failed++;
      }
    }

    return {
      totalSent: messages.length,
      successful,
      failed,
      results
    };
  }

  /**
   * 接收消息
   */
  async receive(): Promise<StandardMessage> {
    if (this.isPaused) {
      throw new Error('Flow control is paused');
    }

    const iterator = this.messageQueue[Symbol.asyncIterator]();
    const result = await iterator.next();
    
    if (result.done) {
      throw new Error('No more messages available');
    }

    this.flowControlStats.receivedCount++;
    return result.value;
  }

  /**
   * 确认消息
   */
  acknowledge(messageId: string): void {
    const pending = this.pendingAcks.get(messageId);
    if (pending) {
      this.pendingAcks.delete(messageId);
      this.flowControlStats.ackedCount++;
    }
  }

  /**
   * 拒绝消息
   */
  reject(messageId: string, reason: string): void {
    const pending = this.pendingAcks.get(messageId);
    if (pending) {
      this.pendingAcks.delete(messageId);
      this.flowControlStats.rejectedCount++;
      
      // 可以实现重试逻辑
      console.warn(`Message ${messageId} rejected: ${reason}`);
    }
  }

  /**
   * 暂停流控制
   */
  pause(): void {
    this.isPaused = true;
  }

  /**
   * 恢复流控制
   */
  resume(): void {
    this.isPaused = false;
  }

  /**
   * 关闭流控制
   */
  async close(): Promise<void> {
    this.messageQueue.done();
    this.pendingAcks.clear();
  }

  /**
   * 启动确认超时检查
   */
  private startAckTimeoutCheck(): void {
    setInterval(() => {
      const now = Date.now();
      const timeoutMessages: string[] = [];

      for (const [messageId, pending] of this.pendingAcks) {
        if (now - pending.timestamp > this.ackTimeout) {
          timeoutMessages.push(messageId);
        }
      }

      // 处理超时消息
      for (const messageId of timeoutMessages) {
        this.pendingAcks.delete(messageId);
        this.flowControlStats.timeoutCount++;
        console.warn(`Message ${messageId} acknowledgment timed out`);
      }
    }, 5000); // 每5秒检查一次
  }

  /**
   * 获取流控制统计
   */
  getFlowControlStats() {
    return {
      ...this.flowControlStats,
      pendingAcks: this.pendingAcks.size,
      isPaused: this.isPaused
    };
  }
}

// ============================================================================
// 集成管理器
// ============================================================================

/**
 * 集成管理器
 * 
 * 统一管理所有集成适配器，提供一站式的集成服务。
 */
export class IntegrationManager extends EventEmitter {
  private agentCoreAdapter?: AgentCoreAdapter;
  private inputHandlerAdapter?: InputHandlerAdapter;
  private monitoringAdapter?: MonitoringAdapter;
  private flowControlManager?: FlowControlManager;

  constructor() {
    super();
  }

  /**
   * 初始化Agent Core集成
   */
  initializeAgentCore<T>(options?: {
    messageQueue?: h2AAsyncMessageQueue<T>;
    agentId?: string;
    enableHighPerformance?: boolean;
  }): AgentCoreAdapter<T> {
    this.agentCoreAdapter = new AgentCoreAdapter<T>(options);
    
    // 转发事件
    this.agentCoreAdapter.on('messageReceived', (message) => {
      this.emit('agentMessageReceived', message);
    });
    
    return this.agentCoreAdapter;
  }

  /**
   * 初始化Input Handler集成
   */
  initializeInputHandler<T>(options?: {
    messageQueue?: h2AAsyncMessageQueue<T>;
    validator?: (message: T) => ValidationResult;
  }): InputHandlerAdapter<T> {
    this.inputHandlerAdapter = new InputHandlerAdapter<T>(options);
    
    // 转发事件
    this.inputHandlerAdapter.on('messagePublished', (message) => {
      this.emit('inputMessagePublished', message);
    });
    
    return this.inputHandlerAdapter;
  }

  /**
   * 初始化Monitoring集成
   */
  initializeMonitoring(options?: {
    healthCheckIntervalMs?: number;
    metricsCollectionIntervalMs?: number;
  }): MonitoringAdapter {
    this.monitoringAdapter = new MonitoringAdapter(options);
    
    // 转发事件
    this.monitoringAdapter.on('alertTriggered', (alert) => {
      this.emit('alertTriggered', alert);
    });
    
    return this.monitoringAdapter;
  }

  /**
   * 初始化流控制
   */
  initializeFlowControl(options?: {
    messageQueue?: h2AAsyncMessageQueue<StandardMessage>;
    ackTimeout?: number;
  }): FlowControlManager {
    this.flowControlManager = new FlowControlManager(options);
    return this.flowControlManager;
  }

  /**
   * 获取Agent Core适配器
   */
  getAgentCoreAdapter(): AgentCoreAdapter | undefined {
    return this.agentCoreAdapter;
  }

  /**
   * 获取Input Handler适配器
   */
  getInputHandlerAdapter(): InputHandlerAdapter | undefined {
    return this.inputHandlerAdapter;
  }

  /**
   * 获取Monitoring适配器
   */
  getMonitoringAdapter(): MonitoringAdapter | undefined {
    return this.monitoringAdapter;
  }

  /**
   * 获取流控制管理器
   */
  getFlowControlManager(): FlowControlManager | undefined {
    return this.flowControlManager;
  }

  /**
   * 销毁所有集成
   */
  async dispose(): Promise<void> {
    const disposalPromises: Promise<void>[] = [];

    if (this.agentCoreAdapter) {
      disposalPromises.push(this.agentCoreAdapter.dispose());
    }

    if (this.inputHandlerAdapter) {
      disposalPromises.push(this.inputHandlerAdapter.dispose());
    }

    if (this.monitoringAdapter) {
      disposalPromises.push(this.monitoringAdapter.dispose());
    }

    if (this.flowControlManager) {
      disposalPromises.push(this.flowControlManager.close());
    }

    await Promise.all(disposalPromises);
    this.removeAllListeners();
  }
}

// ============================================================================
// 导出便捷创建函数
// ============================================================================

/**
 * 创建完整的集成环境
 */
export function createIntegratedEnvironment(options: {
  enableAgentCore?: boolean;
  enableInputHandler?: boolean;
  enableMonitoring?: boolean;
  enableFlowControl?: boolean;
  messageQueue?: h2AAsyncMessageQueue<StandardMessage>;
} = {}): IntegrationManager {
  const manager = new IntegrationManager();
  const sharedQueue = options.messageQueue ?? createHighPerformanceQueue<StandardMessage>();

  if (options.enableAgentCore !== false) {
    manager.initializeAgentCore({ messageQueue: sharedQueue });
  }

  if (options.enableInputHandler !== false) {
    manager.initializeInputHandler({ messageQueue: sharedQueue });
  }

  if (options.enableMonitoring !== false) {
    const monitoring = manager.initializeMonitoring({
      healthCheckIntervalMs: 5000,
      metricsCollectionIntervalMs: 10000
    });
    monitoring.registerQueue('main', sharedQueue);
  }

  if (options.enableFlowControl !== false) {
    manager.initializeFlowControl({ messageQueue: sharedQueue });
  }

  return manager;
}