/**
 * h2A双重缓冲异步消息队列系统主入口
 * 
 * 导出所有核心功能和集成接口，为Claude Code实时Steering机制提供完整的基础设施。
 */

// ============================================================================
// 核心消息队列实现
// ============================================================================

export {
  h2AAsyncMessageQueue,
  createMessageQueue,
  createHighPerformanceQueue,
  createMemoryEfficientQueue
} from './core/message-queue.js';

// ============================================================================
// 类型定义
// ============================================================================

export {
  // 枚举类型
  BackpressureStrategy,
  MessageType,
  Priority,
  QueueLifecycleState,
  QueueErrorType,
  
  // 基础接口
  QueueMetrics,
  QueuePerformanceMetrics,
  QueueStatus,
  StandardMessage,
  QueueConfiguration,
  AdvancedQueueConfiguration,
  
  // 回调类型
  ResolveCallback,
  RejectCallback,
  StateChangeCallback,
  
  // 状态管理
  StateTransition,
  StateChange,
  StateWatcher,
  
  // 错误处理
  QueueError,
  ErrorRecoveryStrategy,
  RecoveryContext,
  RecoveryResult,
  
  // 性能监控
  BatchConfiguration,
  AlertThresholds,
  
  // 集成接口
  MessageQueueInput,
  MessageQueueOutput,
  AgentCoreIntegration,
  InputHandlerIntegration,
  MonitoringIntegration,
  FlowControlProtocol,
  
  // 系统集成
  SendResult,
  BatchSendResult,
  HealthStatus,
  Alert,
  MetricsSnapshot,
  ValidationResult,
  AgentStatus,
  
  // 默认配置
  DEFAULT_QUEUE_CONFIG,
  DEFAULT_ADVANCED_CONFIG
} from './types/message-queue.js';

// ============================================================================
// 错误恢复系统
// ============================================================================

export {
  AutoRecoveryManager,
  ErrorAnalyzer,
  defaultRecoveryManager,
  defaultErrorAnalyzer
} from './core/error-recovery.js';

// ============================================================================
// 系统集成
// ============================================================================

export {
  AgentCoreAdapter,
  InputHandlerAdapter,
  MonitoringAdapter,
  FlowControlManager,
  IntegrationManager,
  createIntegratedEnvironment
} from './core/integrations.js';

// ============================================================================
// 版本信息
// ============================================================================

export const VERSION = '1.0.0';
export const BUILD_INFO = {
  version: VERSION,
  buildTime: new Date().toISOString(),
  nodeVersion: process.version,
  architecture: process.arch,
  platform: process.platform
};

// ============================================================================
// 便捷工厂函数
// ============================================================================

/**
 * 快速创建标准消息队列环境
 */
export function createStandardEnvironment(options: {
  enableMetrics?: boolean;
  maxBufferSize?: number;
  backpressureStrategy?: BackpressureStrategy;
} = {}) {
  const queue = createMessageQueue<StandardMessage>({
    enableMetrics: options.enableMetrics ?? true,
    maxBufferSize: options.maxBufferSize ?? 1000,
    backpressureStrategy: options.backpressureStrategy ?? BackpressureStrategy.DROP_OLDEST
  });

  const integrationManager = createIntegratedEnvironment({
    messageQueue: queue,
    enableAgentCore: true,
    enableInputHandler: true,
    enableMonitoring: true,
    enableFlowControl: true
  });

  return {
    queue,
    integrationManager,
    agentCore: integrationManager.getAgentCoreAdapter(),
    inputHandler: integrationManager.getInputHandlerAdapter(),
    monitoring: integrationManager.getMonitoringAdapter(),
    flowControl: integrationManager.getFlowControlManager()
  };
}

/**
 * 创建高性能消息队列环境
 */
export function createHighPerformanceEnvironment() {
  return createStandardEnvironment({
    enableMetrics: true,
    maxBufferSize: 10000,
    backpressureStrategy: BackpressureStrategy.DROP_OLDEST
  });
}

/**
 * 创建内存友好消息队列环境
 */
export function createMemoryEfficientEnvironment() {
  return createStandardEnvironment({
    enableMetrics: false,
    maxBufferSize: 100,
    backpressureStrategy: BackpressureStrategy.DROP_NEWEST
  });
}

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 创建标准消息
 */
export function createStandardMessage(
  type: MessageType,
  payload: any,
  options: {
    priority?: Priority;
    source?: string;
    correlationId?: string;
    replyTo?: string;
    ttl?: number;
  } = {}
): StandardMessage {
  return {
    header: {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      type,
      priority: options.priority ?? Priority.NORMAL,
      source: options.source ?? 'unknown'
    },
    payload,
    metadata: {
      correlationId: options.correlationId,
      replyTo: options.replyTo,
      ttl: options.ttl,
      retryCount: 0
    }
  };
}

/**
 * 延迟工具函数
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 收集异步迭代器的所有值
 */
export async function collectAsync<T>(
  iterator: AsyncIterable<T>, 
  maxItems: number = 1000
): Promise<T[]> {
  const results: T[] = [];
  let count = 0;
  
  for await (const item of iterator) {
    results.push(item);
    count++;
    if (count >= maxItems) break;
  }
  
  return results;
}

/**
 * 格式化内存使用量
 */
export function formatMemoryUsage(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * 性能计时器
 */
export class PerformanceTimer {
  private startTime: number = 0;
  private endTime: number = 0;

  start(): void {
    this.startTime = performance.now();
  }

  stop(): number {
    this.endTime = performance.now();
    return this.getDuration();
  }

  getDuration(): number {
    return this.endTime - this.startTime;
  }

  reset(): void {
    this.startTime = 0;
    this.endTime = 0;
  }
}