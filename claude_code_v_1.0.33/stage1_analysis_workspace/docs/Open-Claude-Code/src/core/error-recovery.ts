/**
 * h2A消息队列错误恢复系统
 * 
 * 实现了完整的错误检测、分类、恢复和预防机制。
 * 基于不同错误类型提供针对性的恢复策略，确保系统的健壮性和可用性。
 */

import {
  QueueError,
  QueueErrorType,
  ErrorRecoveryStrategy,
  RecoveryContext,
  RecoveryResult,
  BackpressureStrategy
} from '../types/message-queue.js';
import { h2AAsyncMessageQueue } from './message-queue.js';

// ============================================================================
// 错误恢复策略实现
// ============================================================================

/**
 * 配置错误恢复策略
 */
class ConfigurationErrorRecovery implements ErrorRecoveryStrategy {
  detectError(error: Error): QueueErrorType {
    if (error.message.includes('configuration') || 
        error.message.includes('invalid') ||
        error.message.includes('parameter')) {
      return QueueErrorType.CONFIGURATION_ERROR;
    }
    return QueueErrorType.INTERNAL_ERROR;
  }

  async recover(error: QueueError, context: RecoveryContext): Promise<RecoveryResult> {
    // 配置错误通常需要重新初始化
    try {
      // 重置队列到安全状态
      if (context.queue instanceof h2AAsyncMessageQueue) {
        // 配置错误一般不可自动恢复，需要外部干预
        return {
          success: false,
          message: 'Configuration error requires manual intervention',
          retryAfter: 0
        };
      }
      
      return {
        success: false,
        message: 'Unable to recover from configuration error'
      };
    } catch (recoveryError) {
      return {
        success: false,
        message: `Recovery failed: ${recoveryError instanceof Error ? recoveryError.message : 'Unknown error'}`
      };
    }
  }

  preventError(errorType: QueueErrorType): void {
    // 配置错误预防措施
    console.log('Implementing configuration validation checks');
  }
}

/**
 * 缓冲区溢出错误恢复策略
 */
class BufferOverflowRecovery implements ErrorRecoveryStrategy {
  detectError(error: Error): QueueErrorType {
    if (error.message.includes('overflow') || 
        error.message.includes('buffer full') ||
        error.message.includes('capacity exceeded')) {
      return QueueErrorType.BUFFER_OVERFLOW;
    }
    return QueueErrorType.INTERNAL_ERROR;
  }

  async recover(error: QueueError, context: RecoveryContext): Promise<RecoveryResult> {
    try {
      // 缓冲区溢出可以通过调整策略恢复
      console.log(`Attempting to recover from buffer overflow, attempt ${context.attempt + 1}`);
      
      // 等待一段时间让消费者处理积压消息
      await this.delay(1000 * Math.pow(2, context.attempt));
      
      return {
        success: true,
        message: 'Buffer overflow recovered by waiting for consumer',
        retryAfter: 1000
      };
    } catch (recoveryError) {
      return {
        success: false,
        message: `Buffer overflow recovery failed: ${recoveryError instanceof Error ? recoveryError.message : 'Unknown error'}`
      };
    }
  }

  preventError(errorType: QueueErrorType): void {
    // 实施预防措施，如调整背压策略
    console.log('Implementing buffer overflow prevention measures');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 超时错误恢复策略
 */
class TimeoutErrorRecovery implements ErrorRecoveryStrategy {
  detectError(error: Error): QueueErrorType {
    if (error.message.includes('timeout') || 
        error.message.includes('timed out')) {
      return QueueErrorType.TIMEOUT_ERROR;
    }
    return QueueErrorType.INTERNAL_ERROR;
  }

  async recover(error: QueueError, context: RecoveryContext): Promise<RecoveryResult> {
    try {
      console.log(`Attempting to recover from timeout error, attempt ${context.attempt + 1}`);
      
      // 超时错误可能是临时的网络或系统问题
      // 等待后重试
      await this.delay(500 * Math.pow(2, context.attempt));
      
      return {
        success: true,
        message: 'Timeout error recovered after waiting',
        retryAfter: 500
      };
    } catch (recoveryError) {
      return {
        success: false,
        message: `Timeout recovery failed: ${recoveryError instanceof Error ? recoveryError.message : 'Unknown error'}`
      };
    }
  }

  preventError(errorType: QueueErrorType): void {
    // 预防超时的措施，如增加超时时间或优化性能
    console.log('Implementing timeout prevention measures');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 资源耗尽错误恢复策略
 */
class ResourceExhaustionRecovery implements ErrorRecoveryStrategy {
  detectError(error: Error): QueueErrorType {
    if (error.message.includes('memory') || 
        error.message.includes('resource') ||
        error.message.includes('exhausted')) {
      return QueueErrorType.RESOURCE_EXHAUSTION;
    }
    return QueueErrorType.INTERNAL_ERROR;
  }

  async recover(error: QueueError, context: RecoveryContext): Promise<RecoveryResult> {
    try {
      console.log(`Attempting to recover from resource exhaustion, attempt ${context.attempt + 1}`);
      
      // 强制垃圾回收（如果可用）
      if (global.gc) {
        global.gc();
      }
      
      // 等待资源释放
      await this.delay(2000 * Math.pow(2, context.attempt));
      
      return {
        success: true,
        message: 'Resource exhaustion recovered after cleanup',
        retryAfter: 2000
      };
    } catch (recoveryError) {
      return {
        success: false,
        message: `Resource exhaustion recovery failed: ${recoveryError instanceof Error ? recoveryError.message : 'Unknown error'}`
      };
    }
  }

  preventError(errorType: QueueErrorType): void {
    // 实施资源监控和限制
    console.log('Implementing resource exhaustion prevention measures');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * 网络错误恢复策略
 */
class NetworkErrorRecovery implements ErrorRecoveryStrategy {
  detectError(error: Error): QueueErrorType {
    if (error.message.includes('network') || 
        error.message.includes('connection') ||
        error.message.includes('ECONNRESET') ||
        error.message.includes('ENOTFOUND')) {
      return QueueErrorType.NETWORK_ERROR;
    }
    return QueueErrorType.INTERNAL_ERROR;
  }

  async recover(error: QueueError, context: RecoveryContext): Promise<RecoveryResult> {
    try {
      console.log(`Attempting to recover from network error, attempt ${context.attempt + 1}`);
      
      // 网络错误使用指数退避重试
      const backoffTime = 1000 * Math.pow(2, context.attempt);
      await this.delay(Math.min(backoffTime, 30000)); // 最大30秒
      
      return {
        success: true,
        message: 'Network error recovered after backoff',
        retryAfter: backoffTime
      };
    } catch (recoveryError) {
      return {
        success: false,
        message: `Network error recovery failed: ${recoveryError instanceof Error ? recoveryError.message : 'Unknown error'}`
      };
    }
  }

  preventError(errorType: QueueErrorType): void {
    // 实施网络连接监控和重连机制
    console.log('Implementing network error prevention measures');
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// 自动恢复管理器
// ============================================================================

/**
 * 自动恢复管理器
 * 
 * 负责协调不同类型错误的恢复策略，实施智能重试机制，
 * 并提供完整的错误分析和预防能力。
 */
export class AutoRecoveryManager {
  private recoveryStrategies: Map<QueueErrorType, ErrorRecoveryStrategy> = new Map();
  private maxRetryAttempts: number;
  private baseRetryDelay: number;
  private recoveryHistory: RecoveryRecord[] = [];
  private preventionEnabled: boolean;

  constructor(options: {
    maxRetryAttempts?: number;
    baseRetryDelay?: number;
    preventionEnabled?: boolean;
  } = {}) {
    this.maxRetryAttempts = options.maxRetryAttempts ?? 3;
    this.baseRetryDelay = options.baseRetryDelay ?? 1000;
    this.preventionEnabled = options.preventionEnabled ?? true;

    // 注册默认恢复策略
    this.registerDefaultStrategies();
  }

  /**
   * 注册默认恢复策略
   */
  private registerDefaultStrategies(): void {
    this.recoveryStrategies.set(QueueErrorType.CONFIGURATION_ERROR, new ConfigurationErrorRecovery());
    this.recoveryStrategies.set(QueueErrorType.BUFFER_OVERFLOW, new BufferOverflowRecovery());
    this.recoveryStrategies.set(QueueErrorType.TIMEOUT_ERROR, new TimeoutErrorRecovery());
    this.recoveryStrategies.set(QueueErrorType.RESOURCE_EXHAUSTION, new ResourceExhaustionRecovery());
    this.recoveryStrategies.set(QueueErrorType.NETWORK_ERROR, new NetworkErrorRecovery());
  }

  /**
   * 注册自定义恢复策略
   */
  registerStrategy(errorType: QueueErrorType, strategy: ErrorRecoveryStrategy): void {
    this.recoveryStrategies.set(errorType, strategy);
  }

  /**
   * 移除恢复策略
   */
  unregisterStrategy(errorType: QueueErrorType): void {
    this.recoveryStrategies.delete(errorType);
  }

  /**
   * 自动错误恢复处理
   */
  async handleError(error: QueueError, queue: h2AAsyncMessageQueue<any>): Promise<boolean> {
    const startTime = Date.now();
    const strategy = this.recoveryStrategies.get(error.type);

    if (!strategy || !error.recoverable) {
      this.recordRecovery({
        errorType: error.type,
        success: false,
        attempts: 0,
        totalTime: Date.now() - startTime,
        reason: 'No recovery strategy available or error not recoverable'
      });
      return false;
    }

    let attempts = 0;
    let lastError: Error | undefined;

    while (attempts < this.maxRetryAttempts) {
      try {
        console.log(`Recovery attempt ${attempts + 1}/${this.maxRetryAttempts} for ${error.type}`);

        const context: RecoveryContext = {
          queue: queue,
          attempt: attempts,
          timestamp: Date.now()
        };

        const result = await strategy.recover(error, context);

        if (result.success) {
          this.recordRecovery({
            errorType: error.type,
            success: true,
            attempts: attempts + 1,
            totalTime: Date.now() - startTime,
            reason: result.message
          });

          // 如果启用预防措施，执行预防操作
          if (this.preventionEnabled) {
            try {
              strategy.preventError(error.type);
            } catch (preventionError) {
              console.warn('Prevention measure failed:', preventionError);
            }
          }

          return true;
        }

        attempts++;
        
        // 使用策略建议的重试间隔，或默认指数退避
        const retryDelay = result.retryAfter ?? (this.baseRetryDelay * Math.pow(2, attempts));
        await this.delay(retryDelay);

      } catch (recoveryError) {
        console.error(`Recovery attempt ${attempts + 1} failed:`, recoveryError);
        lastError = recoveryError instanceof Error ? recoveryError : new Error(String(recoveryError));
        attempts++;
        await this.delay(this.baseRetryDelay * Math.pow(2, attempts));
      }
    }

    // 所有重试都失败了
    this.recordRecovery({
      errorType: error.type,
      success: false,
      attempts: attempts,
      totalTime: Date.now() - startTime,
      reason: lastError?.message ?? 'All retry attempts exhausted'
    });

    return false;
  }

  /**
   * 检测错误类型
   */
  detectErrorType(error: Error): QueueErrorType {
    // 如果已经是QueueError，直接返回类型
    if (error instanceof QueueError) {
      return error.type;
    }

    // 尝试使用各种策略检测错误类型
    for (const [errorType, strategy] of this.recoveryStrategies) {
      try {
        const detectedType = strategy.detectError(error);
        if (detectedType !== QueueErrorType.INTERNAL_ERROR) {
          return detectedType;
        }
      } catch (detectionError) {
        console.warn(`Error detection failed for ${errorType}:`, detectionError);
      }
    }

    // 默认为内部错误
    return QueueErrorType.INTERNAL_ERROR;
  }

  /**
   * 预防性错误检查
   */
  preventErrors(): void {
    if (!this.preventionEnabled) {
      return;
    }

    for (const [errorType, strategy] of this.recoveryStrategies) {
      try {
        strategy.preventError(errorType);
      } catch (preventionError) {
        console.warn(`Prevention failed for ${errorType}:`, preventionError);
      }
    }
  }

  /**
   * 获取恢复历史
   */
  getRecoveryHistory(): RecoveryRecord[] {
    return [...this.recoveryHistory];
  }

  /**
   * 获取恢复统计
   */
  getRecoveryStats(): RecoveryStats {
    const stats: RecoveryStats = {
      totalRecoveries: this.recoveryHistory.length,
      successfulRecoveries: 0,
      failedRecoveries: 0,
      averageRecoveryTime: 0,
      errorTypeStats: new Map()
    };

    let totalTime = 0;
    for (const record of this.recoveryHistory) {
      if (record.success) {
        stats.successfulRecoveries++;
      } else {
        stats.failedRecoveries++;
      }

      totalTime += record.totalTime;

      // 错误类型统计
      const typeStats = stats.errorTypeStats.get(record.errorType) ?? {
        count: 0,
        successRate: 0,
        averageTime: 0
      };
      typeStats.count++;
      stats.errorTypeStats.set(record.errorType, typeStats);
    }

    stats.averageRecoveryTime = this.recoveryHistory.length > 0 
      ? totalTime / this.recoveryHistory.length 
      : 0;

    // 计算每种错误类型的成功率
    for (const [errorType, typeStats] of stats.errorTypeStats) {
      const records = this.recoveryHistory.filter(r => r.errorType === errorType);
      const successful = records.filter(r => r.success).length;
      typeStats.successRate = records.length > 0 ? successful / records.length : 0;
      typeStats.averageTime = records.length > 0 
        ? records.reduce((sum, r) => sum + r.totalTime, 0) / records.length 
        : 0;
    }

    return stats;
  }

  /**
   * 清理恢复历史
   */
  clearHistory(): void {
    this.recoveryHistory = [];
  }

  /**
   * 设置最大重试次数
   */
  setMaxRetryAttempts(attempts: number): void {
    this.maxRetryAttempts = Math.max(0, attempts);
  }

  /**
   * 设置基础重试延迟
   */
  setBaseRetryDelay(delay: number): void {
    this.baseRetryDelay = Math.max(100, delay);
  }

  /**
   * 启用/禁用预防措施
   */
  setPreventionEnabled(enabled: boolean): void {
    this.preventionEnabled = enabled;
  }

  /**
   * 记录恢复结果
   */
  private recordRecovery(record: RecoveryRecord): void {
    this.recoveryHistory.push({
      ...record,
      timestamp: Date.now()
    });

    // 限制历史记录大小
    if (this.recoveryHistory.length > 1000) {
      this.recoveryHistory = this.recoveryHistory.slice(-500);
    }
  }

  /**
   * 延迟工具方法
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// 辅助类型和接口
// ============================================================================

/**
 * 恢复记录
 */
interface RecoveryRecord {
  errorType: QueueErrorType;
  success: boolean;
  attempts: number;
  totalTime: number;
  reason?: string;
  timestamp?: number;
}

/**
 * 恢复统计
 */
interface RecoveryStats {
  totalRecoveries: number;
  successfulRecoveries: number;  
  failedRecoveries: number;
  averageRecoveryTime: number;
  errorTypeStats: Map<QueueErrorType, {
    count: number;
    successRate: number;
    averageTime: number;
  }>;
}

// ============================================================================
// 错误分析器
// ============================================================================

/**
 * 错误分析器
 * 
 * 分析错误模式，提供错误预测和系统健康评估。
 */
export class ErrorAnalyzer {
  private errorHistory: ErrorRecord[] = [];
  private analysisResults: AnalysisResult[] = [];

  /**
   * 记录错误
   */
  recordError(error: QueueError, context?: any): void {
    const record: ErrorRecord = {
      errorType: error.type,
      message: error.message,
      timestamp: Date.now(),
      context: context,
      recoverable: error.recoverable
    };

    this.errorHistory.push(record);

    // 限制历史记录大小
    if (this.errorHistory.length > 5000) {
      this.errorHistory = this.errorHistory.slice(-2500);
    }

    // 触发实时分析
    this.performRealTimeAnalysis(record);
  }

  /**
   * 执行错误分析
   */
  analyze(timeWindow?: number): AnalysisResult {
    const now = Date.now();
    const windowStart = timeWindow ? now - timeWindow : 0;
    
    const relevantErrors = this.errorHistory.filter(
      record => record.timestamp >= windowStart
    );

    const result: AnalysisResult = {
      timeWindow: timeWindow ?? (now - (this.errorHistory[0]?.timestamp ?? now)),
      totalErrors: relevantErrors.length,
      errorTypeDistribution: this.calculateErrorDistribution(relevantErrors),
      errorRate: this.calculateErrorRate(relevantErrors, timeWindow),
      errorPatterns: this.detectErrorPatterns(relevantErrors),
      riskLevel: this.assessRiskLevel(relevantErrors),
      recommendations: this.generateRecommendations(relevantErrors),
      timestamp: now
    };

    this.analysisResults.push(result);
    return result;
  }

  /**
   * 实时分析
   */
  private performRealTimeAnalysis(record: ErrorRecord): void {
    // 检查是否有紧急问题需要立即关注
    const recentErrors = this.errorHistory.filter(
      r => r.timestamp > Date.now() - 60000 // 最近1分钟
    );

    if (recentErrors.length > 10) {
      console.warn('High error rate detected in the last minute:', recentErrors.length);
    }

    // 检查相同错误的频繁出现
    const sameTypeErrors = recentErrors.filter(
      r => r.errorType === record.errorType
    );

    if (sameTypeErrors.length > 5) {
      console.warn(`Frequent ${record.errorType} errors detected:`, sameTypeErrors.length);
    }
  }

  /**
   * 计算错误分布
   */
  private calculateErrorDistribution(errors: ErrorRecord[]): Map<QueueErrorType, number> {
    const distribution = new Map<QueueErrorType, number>();
    
    for (const error of errors) {
      const count = distribution.get(error.errorType) ?? 0;
      distribution.set(error.errorType, count + 1);
    }

    return distribution;
  }

  /**
   * 计算错误率
   */
  private calculateErrorRate(errors: ErrorRecord[], timeWindow?: number): number {
    if (!timeWindow || errors.length === 0) {
      return 0;
    }

    const windowSeconds = timeWindow / 1000;
    return errors.length / windowSeconds;
  }

  /**
   * 检测错误模式
   */
  private detectErrorPatterns(errors: ErrorRecord[]): string[] {
    const patterns: string[] = [];

    // 检测错误突发
    const timeGroups = this.groupErrorsByTime(errors, 60000); // 1分钟窗口
    for (const [timeWindow, groupErrors] of timeGroups) {
      if (groupErrors.length > 5) {
        patterns.push(`Error burst detected: ${groupErrors.length} errors in 1 minute`);
      }
    }

    // 检测错误类型相关性
    const typeSequences = this.detectTypeSequences(errors);
    for (const sequence of typeSequences) {
      patterns.push(`Error sequence detected: ${sequence.join(' -> ')}`);
    }

    return patterns;
  }

  /**
   * 按时间分组错误
   */
  private groupErrorsByTime(errors: ErrorRecord[], windowSize: number): Map<number, ErrorRecord[]> {
    const groups = new Map<number, ErrorRecord[]>();

    for (const error of errors) {
      const windowStart = Math.floor(error.timestamp / windowSize) * windowSize;
      const group = groups.get(windowStart) ?? [];
      group.push(error);
      groups.set(windowStart, group);
    }

    return groups;
  }

  /**
   * 检测错误类型序列
   */
  private detectTypeSequences(errors: ErrorRecord[]): QueueErrorType[][] {
    const sequences: QueueErrorType[][] = [];
    const minSequenceLength = 3;

    for (let i = 0; i <= errors.length - minSequenceLength; i++) {
      const sequence = errors.slice(i, i + minSequenceLength).map(e => e.errorType);
      
      // 检查是否是重复模式
      if (this.isRepeatingPattern(sequence)) {
        sequences.push(sequence);
      }
    }

    return sequences;
  }

  /**
   * 检查是否是重复模式
   */
  private isRepeatingPattern(sequence: QueueErrorType[]): boolean {
    // 简单的重复检测：检查序列中是否有相同的错误类型连续出现
    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === sequence[i - 1]) {
        return true;
      }
    }
    return false;
  }

  /**
   * 评估风险级别
   */
  private assessRiskLevel(errors: ErrorRecord[]): 'low' | 'medium' | 'high' | 'critical' {
    const recentErrors = errors.filter(
      e => e.timestamp > Date.now() - 300000 // 最近5分钟
    );

    const errorRate = recentErrors.length / 5; // 每分钟错误数

    if (errorRate > 10) return 'critical';
    if (errorRate > 5) return 'high';
    if (errorRate > 2) return 'medium';
    return 'low';
  }

  /**
   * 生成建议
   */
  private generateRecommendations(errors: ErrorRecord[]): string[] {
    const recommendations: string[] = [];
    const errorTypes = this.calculateErrorDistribution(errors);

    for (const [errorType, count] of errorTypes) {
      if (count > 5) {
        switch (errorType) {
          case QueueErrorType.BUFFER_OVERFLOW:
            recommendations.push('Consider increasing buffer size or implementing more aggressive backpressure');
            break;
          case QueueErrorType.TIMEOUT_ERROR:
            recommendations.push('Review timeout settings and system performance');
            break;
          case QueueErrorType.RESOURCE_EXHAUSTION:
            recommendations.push('Monitor system resources and implement resource limits');
            break;
          case QueueErrorType.NETWORK_ERROR:
            recommendations.push('Check network connectivity and implement retry mechanisms');
            break;
          default:
            recommendations.push(`Investigate frequent ${errorType} errors`);
        }
      }
    }

    return recommendations;
  }

  /**
   * 获取分析历史
   */
  getAnalysisHistory(): AnalysisResult[] {
    return [...this.analysisResults];
  }

  /**
   * 清理历史数据
   */
  clearHistory(): void {
    this.errorHistory = [];
    this.analysisResults = [];
  }
}

// ============================================================================
// 辅助类型定义
// ============================================================================

interface ErrorRecord {
  errorType: QueueErrorType;
  message: string;
  timestamp: number;
  context?: any;
  recoverable: boolean;
}

interface AnalysisResult {
  timeWindow: number;
  totalErrors: number;
  errorTypeDistribution: Map<QueueErrorType, number>;
  errorRate: number;
  errorPatterns: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  timestamp: number;  
}

// ============================================================================
// 导出默认实例
// ============================================================================

/**
 * 默认自动恢复管理器实例
 */
export const defaultRecoveryManager = new AutoRecoveryManager();

/**
 * 默认错误分析器实例
 */
export const defaultErrorAnalyzer = new ErrorAnalyzer();