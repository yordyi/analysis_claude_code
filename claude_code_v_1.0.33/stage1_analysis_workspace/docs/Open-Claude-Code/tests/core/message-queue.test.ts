/**
 * h2A双重缓冲异步消息队列核心功能测试套件
 * 
 * 全面测试队列的核心功能：
 * - AsyncIterator协议实现
 * - 双重缓冲机制
 * - 背压控制
 * - 错误处理和恢复
 * - 性能监控
 * - 状态管理
 * - 并发安全性
 */

import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import {
  h2AAsyncMessageQueue,
  createMessageQueue,
  createHighPerformanceQueue,
  createMemoryEfficientQueue
} from '../../src/core/message-queue.js';
import {
  QueueErrorType,
  QueueError,
  BackpressureStrategy,
  QueueLifecycleState
} from '../../src/types/message-queue.js';
import { AutoRecoveryManager, ErrorAnalyzer } from '../../src/core/error-recovery.js';

// ============================================================================
// 测试辅助工具
// ============================================================================

/**
 * 延迟工具函数
 */
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 收集异步迭代器的所有值
 */
async function collectAsync<T>(iterator: AsyncIterable<T>, maxItems: number = 100): Promise<T[]> {
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
 * 测试消息类型
 */
interface TestMessage {
  id: number;
  content: string;
  timestamp: number;
}

/**
 * 创建测试消息
 */
function createTestMessage(id: number, content?: string): TestMessage {
  return {
    id,
    content: content ?? `Message ${id}`,
    timestamp: Date.now()
  };
}

// ============================================================================
// 基础功能测试
// ============================================================================

describe('h2AAsyncMessageQueue Basic Functionality', () => {
  let queue: h2AAsyncMessageQueue<TestMessage>;

  beforeEach(() => {
    queue = new h2AAsyncMessageQueue<TestMessage>({
      maxBufferSize: 10,
      enableMetrics: true
    });
  });

  afterEach(() => {
    queue.dispose();
  });

  describe('Construction and Initialization', () => {
    test('should create queue with default options', () => {
      const defaultQueue = new h2AAsyncMessageQueue<TestMessage>();
      expect(defaultQueue).toBeDefined();
      expect(defaultQueue.getQueueId()).toMatch(/^queue_\d+_[a-z0-9]+$/);
      defaultQueue.dispose();
    });

    test('should create queue with custom options', () => {
      const customQueue = new h2AAsyncMessageQueue<TestMessage>({
        maxBufferSize: 500,
        timeoutMs: 2000,
        enableMetrics: true,
        backpressureStrategy: BackpressureStrategy.DROP_NEWEST,
        queueId: 'test-queue-123'
      });

      expect(customQueue.getQueueId()).toBe('test-queue-123');
      const status = customQueue.getStatus();
      expect(status.currentState).toBe(QueueLifecycleState.INITIALIZED);
      customQueue.dispose();
    });

    test('should initialize with correct initial state', () => {
      const status = queue.getStatus();
      expect(status.isStarted).toBe(false);
      expect(status.isDone).toBe(false);
      expect(status.hasError).toBe(false);
      expect(status.queueSize).toBe(0);
      expect(status.hasWaitingReader).toBe(false);
      expect(status.currentState).toBe(QueueLifecycleState.INITIALIZED);
    });
  });

  describe('AsyncIterator Protocol Implementation', () => {
    test('should implement AsyncIterable interface', () => {
      expect(queue[Symbol.asyncIterator]).toBeDefined();
      expect(typeof queue[Symbol.asyncIterator]).toBe('function');
    });

    test('should return itself as AsyncIterator', () => {
      const iterator = queue[Symbol.asyncIterator]();
      expect(iterator).toBe(queue);
      expect(iterator.next).toBeDefined();
      expect(typeof iterator.next).toBe('function');
    });

    test('should prevent multiple iterations', () => {
      queue[Symbol.asyncIterator]();
      expect(() => queue[Symbol.asyncIterator]()).toThrow(QueueError);
      expect(() => queue[Symbol.asyncIterator]()).toThrow(/multiple iterations not supported/);
    });

    test('should transition to ACTIVE state when iteration starts', () => {
      expect(queue.getStatus().currentState).toBe(QueueLifecycleState.INITIALIZED);
      queue[Symbol.asyncIterator]();
      expect(queue.getStatus().currentState).toBe(QueueLifecycleState.ACTIVE);
    });
  });

  describe('Basic Message Operations', () => {
    test('should enqueue and dequeue single message', async () => {
      const testMessage = createTestMessage(1);
      const iterator = queue[Symbol.asyncIterator]();

      // 入队消息
      queue.enqueue(testMessage);

      // 出队消息
      const result = await iterator.next();
      expect(result.done).toBe(false);
      expect(result.value).toEqual(testMessage);
    });

    test('should handle multiple messages in order', async () => {
      const messages = [
        createTestMessage(1),
        createTestMessage(2),
        createTestMessage(3)
      ];

      const iterator = queue[Symbol.asyncIterator]();

      // 入队多个消息
      messages.forEach(msg => queue.enqueue(msg));

      // 按顺序出队
      for (let i = 0; i < messages.length; i++) {
        const result = await iterator.next();
        expect(result.done).toBe(false);
        expect(result.value).toEqual(messages[i]);
      }
    });

    test('should support for-await-of syntax', async () => {
      const messages = [
        createTestMessage(1),
        createTestMessage(2),
        createTestMessage(3)
      ];

      // 异步入队消息
      setTimeout(() => {
        messages.forEach(msg => queue.enqueue(msg));
        queue.done();
      }, 10);

      const receivedMessages: TestMessage[] = [];
      for await (const message of queue) {
        receivedMessages.push(message);
      }

      expect(receivedMessages).toEqual(messages);
    });
  });

  describe('Queue Completion', () => {
    test('should handle done() call correctly', async () => {
      const iterator = queue[Symbol.asyncIterator]();
      
      // 立即标记完成
      queue.done();

      const result = await iterator.next();
      expect(result.done).toBe(true);
      expect(result.value).toBeUndefined();
      expect(queue.getStatus().currentState).toBe(QueueLifecycleState.COMPLETED);
    });

    test('should complete after processing remaining messages', async () => {
      const messages = [createTestMessage(1), createTestMessage(2)];
      const iterator = queue[Symbol.asyncIterator]();

      // 先入队消息，再标记完成
      messages.forEach(msg => queue.enqueue(msg));
      queue.done();

      // 应该先处理完所有消息
      const result1 = await iterator.next();
      expect(result1.done).toBe(false);
      expect(result1.value).toEqual(messages[0]);

      const result2 = await iterator.next();
      expect(result2.done).toBe(false);
      expect(result2.value).toEqual(messages[1]);

      // 然后返回完成标志
      const result3 = await iterator.next();
      expect(result3.done).toBe(true);
    });

    test('should prevent enqueue after done', () => {
      queue.done();
      expect(() => queue.enqueue(createTestMessage(1))).toThrow(QueueError);
    });
  });
});

// ============================================================================
// 高级功能测试
// ============================================================================

describe('h2AAsyncMessageQueue Advanced Features', () => {
  let queue: h2AAsyncMessageQueue<TestMessage>;

  beforeEach(() => {
    queue = new h2AAsyncMessageQueue<TestMessage>({
      maxBufferSize: 5,
      enableMetrics: true,
      backpressureStrategy: BackpressureStrategy.DROP_OLDEST
    });
  });

  afterEach(() => {
    queue.dispose();
  });

  describe('Backpressure Control', () => {
    test('should handle DROP_OLDEST strategy', () => {
      const dropOldestQueue = new h2AAsyncMessageQueue<TestMessage>({
        maxBufferSize: 3,
        backpressureStrategy: BackpressureStrategy.DROP_OLDEST
      });

      // 填满缓冲区
      dropOldestQueue.enqueue(createTestMessage(1));
      dropOldestQueue.enqueue(createTestMessage(2));
      dropOldestQueue.enqueue(createTestMessage(3));

      // 添加超出容量的消息，应该丢弃最旧的
      dropOldestQueue.enqueue(createTestMessage(4));

      const status = dropOldestQueue.getStatus();
      expect(status.queueSize).toBe(3);

      dropOldestQueue.dispose();
    });

    test('should handle DROP_NEWEST strategy', () => {
      const dropNewestQueue = new h2AAsyncMessageQueue<TestMessage>({
        maxBufferSize: 3,
        backpressureStrategy: BackpressureStrategy.DROP_NEWEST
      });

      // 填满缓冲区
      dropNewestQueue.enqueue(createTestMessage(1));
      dropNewestQueue.enqueue(createTestMessage(2));
      dropNewestQueue.enqueue(createTestMessage(3));

      // 添加超出容量的消息，应该丢弃新消息
      dropNewestQueue.enqueue(createTestMessage(4));

      const status = dropNewestQueue.getStatus();
      expect(status.queueSize).toBe(3);

      dropNewestQueue.dispose();
    });

    test('should handle ERROR strategy', () => {
      const errorQueue = new h2AAsyncMessageQueue<TestMessage>({
        maxBufferSize: 2,
        backpressureStrategy: BackpressureStrategy.ERROR
      });

      // 填满缓冲区
      errorQueue.enqueue(createTestMessage(1));
      errorQueue.enqueue(createTestMessage(2));

      // 尝试添加超出容量的消息，应该抛出错误
      expect(() => errorQueue.enqueue(createTestMessage(3))).toThrow(QueueError);
      expect(() => errorQueue.enqueue(createTestMessage(3))).toThrow(/buffer overflow/);

      errorQueue.dispose();
    });
  });

  describe('Error Handling', () => {
    test('should propagate errors to waiting readers', async () => {
      const iterator = queue[Symbol.asyncIterator]();
      const testError = new QueueError(QueueErrorType.INTERNAL_ERROR, 'Test error');

      // 在另一个任务中发送错误
      setTimeout(() => queue.error(testError), 10);

      // 等待的读取者应该收到错误
      await expect(iterator.next()).rejects.toThrow('Test error');
      expect(queue.getStatus().hasError).toBe(true);
      expect(queue.getStatus().currentState).toBe(QueueLifecycleState.ERROR);
    });

    test('should handle errors during iteration', async () => {
      const iterator = queue[Symbol.asyncIterator]();
      
      // 先入队一个正常消息
      queue.enqueue(createTestMessage(1));
      
      const result1 = await iterator.next();
      expect(result1.done).toBe(false);
      
      // 然后发送错误
      const testError = new QueueError(QueueErrorType.TIMEOUT_ERROR, 'Timeout occurred');
      queue.error(testError);
      
      // 下一次迭代应该抛出错误
      await expect(iterator.next()).rejects.toThrow('Timeout occurred');
    });

    test('should prevent operations after error', () => {
      const testError = new QueueError(QueueErrorType.INTERNAL_ERROR, 'Test error');
      queue.error(testError);

      expect(() => queue.enqueue(createTestMessage(1))).toThrow(QueueError);
      expect(() => queue.enqueue(createTestMessage(1))).toThrow(/errored queue/);
    });
  });

  describe('Timeout Handling', () => {
    test('should timeout read operations when configured', async () => {
      const timeoutQueue = new h2AAsyncMessageQueue<TestMessage>({
        timeoutMs: 100
      });

      const iterator = timeoutQueue[Symbol.asyncIterator]();

      // 不发送任何消息，应该超时
      await expect(iterator.next()).rejects.toThrow(QueueError);
      await expect(iterator.next()).rejects.toThrow(/timeout/);

      timeoutQueue.dispose();
    });

    test('should not timeout when messages are available', async () => {
      const timeoutQueue = new h2AAsyncMessageQueue<TestMessage>({
        timeoutMs: 100
      });

      const iterator = timeoutQueue[Symbol.asyncIterator]();
      const testMessage = createTestMessage(1);

      // 在超时之前发送消息
      setTimeout(() => timeoutQueue.enqueue(testMessage), 50);

      const result = await iterator.next();
      expect(result.done).toBe(false);
      expect(result.value).toEqual(testMessage);

      timeoutQueue.dispose();
    });
  });
});

// ============================================================================
// 性能监控测试
// ============================================================================

describe('h2AAsyncMessageQueue Performance Monitoring', () => {
  let queue: h2AAsyncMessageQueue<TestMessage>;

  beforeEach(() => {
    queue = new h2AAsyncMessageQueue<TestMessage>({
      enableMetrics: true,
      maxBufferSize: 100
    });
  });

  afterEach(() => {
    queue.dispose();
  });

  describe('Metrics Collection', () => {
    test('should collect basic metrics', async () => {
      const iterator = queue[Symbol.asyncIterator]();
      const messages = [
        createTestMessage(1),
        createTestMessage(2),
        createTestMessage(3)
      ];

      // 入队消息
      messages.forEach(msg => queue.enqueue(msg));

      // 出队消息
      for (const expectedMessage of messages) {
        const result = await iterator.next();
        expect(result.value).toEqual(expectedMessage);
      }

      const metrics = queue.getMetrics();
      expect(metrics.enqueueCount).toBe(3);
      expect(metrics.dequeueCount).toBe(3);
      expect(metrics.maxQueueSize).toBeGreaterThanOrEqual(1);
    });

    test('should track queue size metrics', () => {
      const messages = Array.from({ length: 5 }, (_, i) => createTestMessage(i + 1));
      
      messages.forEach(msg => queue.enqueue(msg));

      const metrics = queue.getMetrics();
      expect(metrics.maxQueueSize).toBe(5);
    });

    test('should collect detailed performance metrics', async () => {
      const iterator = queue[Symbol.asyncIterator]();
      
      // 模拟一些操作
      queue.enqueue(createTestMessage(1));
      await iterator.next();
      
      const detailedMetrics = queue.getDetailedMetrics();
      expect(detailedMetrics).toBeDefined();
      expect(detailedMetrics.throughput).toBeDefined();
      expect(detailedMetrics.latency).toBeDefined();
      expect(detailedMetrics.resources).toBeDefined();
      expect(detailedMetrics.errors).toBeDefined();
    });
  });

  describe('Performance Optimization', () => {
    test('should handle high throughput efficiently', async () => {
      const startTime = Date.now();
      const messageCount = 1000;
      const messages = Array.from({ length: messageCount }, (_, i) => createTestMessage(i + 1));

      const iterator = queue[Symbol.asyncIterator]();

      // 异步入队大量消息
      setTimeout(() => {
        messages.forEach(msg => queue.enqueue(msg));
        queue.done();
      }, 0);

      // 出队所有消息
      const receivedMessages: TestMessage[] = [];
      for await (const message of queue) {
        receivedMessages.push(message);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;
      const throughput = messageCount / (duration / 1000);

      expect(receivedMessages).toHaveLength(messageCount);
      expect(throughput).toBeGreaterThan(100); // 至少100消息/秒
      console.log(`Throughput: ${throughput.toFixed(2)} messages/second`);
    });
  });
});

// ============================================================================
// 并发安全性测试
// ============================================================================

describe('h2AAsyncMessageQueue Concurrency Safety', () => {
  let queue: h2AAsyncMessageQueue<TestMessage>;

  beforeEach(() => {
    queue = new h2AAsyncMessageQueue<TestMessage>({
      maxBufferSize: 1000,
      enableMetrics: true
    });
  });

  afterEach(() => {
    queue.dispose();
  });

  describe('Concurrent Operations', () => {
    test('should handle concurrent enqueue operations', async () => {
      const messageCount = 100;
      const promises: Promise<void>[] = [];

      // 并发入队
      for (let i = 0; i < messageCount; i++) {
        promises.push(
          Promise.resolve().then(() => queue.enqueue(createTestMessage(i + 1)))
        );
      }

      await Promise.all(promises);

      const status = queue.getStatus();
      expect(status.queueSize).toBe(messageCount);
    });

    test('should handle concurrent producer-consumer pattern', async () => {
      const messageCount = 50;
      const producedMessages: TestMessage[] = [];
      const consumedMessages: TestMessage[] = [];

      const iterator = queue[Symbol.asyncIterator]();

      // 生产者
      const producer = async () => {
        for (let i = 0; i < messageCount; i++) {
          const message = createTestMessage(i + 1);
          producedMessages.push(message);
          queue.enqueue(message);
          await delay(1); // 小延迟模拟异步操作
        }
        queue.done();
      };

      // 消费者
      const consumer = async () => {
        for await (const message of queue) {
          consumedMessages.push(message);
        }
      };

      // 同时运行生产者和消费者
      await Promise.all([producer(), consumer()]);

      expect(consumedMessages).toHaveLength(messageCount);
      expect(consumedMessages).toEqual(expect.arrayContaining(producedMessages));
    });

    test('should maintain consistency under high concurrency', async () => {
      const producerCount = 5;
      const messagesPerProducer = 20;
      const totalMessages = producerCount * messagesPerProducer;

      const iterator = queue[Symbol.asyncIterator]();
      const allProducedMessages: TestMessage[] = [];
      const consumedMessages: TestMessage[] = [];

      // 多个生产者
      const producers = Array.from({ length: producerCount }, (_, producerId) =>
        async () => {
          for (let i = 0; i < messagesPerProducer; i++) {
            const message = createTestMessage(producerId * messagesPerProducer + i + 1);
            allProducedMessages.push(message);
            queue.enqueue(message);
            await delay(Math.random() * 5); // 随机延迟
          }
        }
      );

      // 消费者
      const consumer = async () => {
        let count = 0;
        for await (const message of queue) {
          consumedMessages.push(message);
          count++;
          if (count >= totalMessages) break;
        }
      };

      // 延迟启动消费者
      const consumerPromise = delay(10).then(() => consumer());

      // 运行所有生产者
      await Promise.all(producers.map(p => p()));
      
      // 标记完成
      queue.done();

      // 等待消费者完成
      await consumerPromise;

      expect(consumedMessages).toHaveLength(totalMessages);
      // 验证所有消息都被接收（顺序可能不同）
      const consumedIds = consumedMessages.map(m => m.id).sort((a, b) => a - b);
      const producedIds = allProducedMessages.map(m => m.id).sort((a, b) => a - b);
      expect(consumedIds).toEqual(producedIds);
    });
  });
});

// ============================================================================
// 错误恢复测试
// ============================================================================

describe('h2AAsyncMessageQueue Error Recovery', () => {
  let queue: h2AAsyncMessageQueue<TestMessage>;
  let recoveryManager: AutoRecoveryManager;
  let errorAnalyzer: ErrorAnalyzer;

  beforeEach(() => {
    queue = new h2AAsyncMessageQueue<TestMessage>({
      enableMetrics: true
    });
    recoveryManager = new AutoRecoveryManager();
    errorAnalyzer = new ErrorAnalyzer();
  });

  afterEach(() => {
    queue.dispose();
  });

  describe('Error Detection and Classification', () => {
    test('should detect different error types', () => {
      const configError = new Error('Invalid configuration parameter');
      const timeoutError = new Error('Operation timed out');
      const networkError = new Error('Network connection failed');

      expect(recoveryManager.detectErrorType(configError)).toBe(QueueErrorType.CONFIGURATION_ERROR);
      expect(recoveryManager.detectErrorType(timeoutError)).toBe(QueueErrorType.TIMEOUT_ERROR);
      expect(recoveryManager.detectErrorType(networkError)).toBe(QueueErrorType.NETWORK_ERROR);
    });

    test('should classify QueueError correctly', () => {
      const queueError = new QueueError(QueueErrorType.BUFFER_OVERFLOW, 'Buffer is full');
      expect(recoveryManager.detectErrorType(queueError)).toBe(QueueErrorType.BUFFER_OVERFLOW);
    });
  });

  describe('Error Analysis', () => {
    test('should record and analyze errors', () => {
      const error1 = new QueueError(QueueErrorType.TIMEOUT_ERROR, 'Timeout 1');
      const error2 = new QueueError(QueueErrorType.TIMEOUT_ERROR, 'Timeout 2');
      const error3 = new QueueError(QueueErrorType.BUFFER_OVERFLOW, 'Overflow 1');

      errorAnalyzer.recordError(error1);
      errorAnalyzer.recordError(error2);
      errorAnalyzer.recordError(error3);

      const analysis = errorAnalyzer.analyze();
      expect(analysis.totalErrors).toBe(3);
      expect(analysis.errorTypeDistribution.get(QueueErrorType.TIMEOUT_ERROR)).toBe(2);
      expect(analysis.errorTypeDistribution.get(QueueErrorType.BUFFER_OVERFLOW)).toBe(1);
    });

    test('should generate appropriate recommendations', () => {
      // 模拟频繁的缓冲区溢出错误
      for (let i = 0; i < 10; i++) {
        const error = new QueueError(QueueErrorType.BUFFER_OVERFLOW, `Overflow ${i}`);
        errorAnalyzer.recordError(error);
      }

      const analysis = errorAnalyzer.analyze();
      expect(analysis.recommendations).toContain(
        expect.stringMatching(/buffer size|backpressure/)
      );
    });
  });

  describe('Auto Recovery', () => {
    test('should attempt recovery for recoverable errors', async () => {
      const recoverableError = new QueueError(
        QueueErrorType.TIMEOUT_ERROR,
        'Temporary timeout',
        undefined,
        true // recoverable
      );

      const recovered = await recoveryManager.handleError(recoverableError, queue);
      expect(recovered).toBe(true);

      const stats = recoveryManager.getRecoveryStats();
      expect(stats.totalRecoveries).toBe(1);
      expect(stats.successfulRecoveries).toBe(1);
    });

    test('should not attempt recovery for non-recoverable errors', async () => {
      const nonRecoverableError = new QueueError(
        QueueErrorType.CONFIGURATION_ERROR,
        'Invalid config',
        undefined,
        false // not recoverable
      );

      const recovered = await recoveryManager.handleError(nonRecoverableError, queue);
      expect(recovered).toBe(false);
    });

    test('should respect maximum retry attempts', async () => {
      // 创建一个总是失败的恢复管理器
      const failingRecoveryManager = new AutoRecoveryManager({
        maxRetryAttempts: 2,
        baseRetryDelay: 10
      });

      // 注册一个总是失败的策略
      const alwaysFailStrategy = {
        detectError: () => QueueErrorType.INTERNAL_ERROR,
        recover: async () => ({ success: false, message: 'Always fails' }),
        preventError: () => {}
      };
      failingRecoveryManager.registerStrategy(QueueErrorType.INTERNAL_ERROR, alwaysFailStrategy);

      const error = new QueueError(QueueErrorType.INTERNAL_ERROR, 'Test error');
      const recovered = await failingRecoveryManager.handleError(error, queue);
      
      expect(recovered).toBe(false);
      const stats = failingRecoveryManager.getRecoveryStats();
      expect(stats.failedRecoveries).toBe(1);
    });
  });
});

// ============================================================================
// 工厂函数测试
// ============================================================================

describe('Message Queue Factory Functions', () => {
  afterEach(() => {
    // 清理可能创建的队列实例
  });

  test('should create queue with createMessageQueue factory', () => {
    const queue = createMessageQueue<TestMessage>({
      maxBufferSize: 50,
      enableMetrics: true
    });

    expect(queue).toBeInstanceOf(h2AAsyncMessageQueue);
    expect(queue.getStatus().currentState).toBe(QueueLifecycleState.INITIALIZED);
    queue.dispose();
  });

  test('should create high performance queue', () => {
    const queue = createHighPerformanceQueue<TestMessage>();
    
    expect(queue).toBeInstanceOf(h2AAsyncMessageQueue);
    const metrics = queue.getDetailedMetrics();
    expect(metrics).toBeDefined();
    queue.dispose();
  });

  test('should create memory efficient queue', () => {
    const queue = createMemoryEfficientQueue<TestMessage>();
    
    expect(queue).toBeInstanceOf(h2AAsyncMessageQueue);
    expect(queue.getStatus().currentState).toBe(QueueLifecycleState.INITIALIZED);
    queue.dispose();
  });
});

// ============================================================================
// 边界条件和压力测试
// ============================================================================

describe('h2AAsyncMessageQueue Edge Cases and Stress Tests', () => {
  describe('Edge Cases', () => {
    test('should handle empty queue iteration', async () => {
      const queue = new h2AAsyncMessageQueue<TestMessage>();
      const iterator = queue[Symbol.asyncIterator]();
      
      queue.done(); // 立即标记完成
      
      const result = await iterator.next();
      expect(result.done).toBe(true);
      
      queue.dispose();
    });

    test('should handle rapid done/error cycles', () => {
      const queue = new h2AAsyncMessageQueue<TestMessage>();
      
      queue.done();
      queue.error(new Error('Test error')); // 应该被忽略
      
      expect(queue.getStatus().isDone).toBe(true);
      expect(queue.getStatus().hasError).toBe(false);
      
      queue.dispose();
    });

    test('should handle disposal during iteration', async () => {
      const queue = new h2AAsyncMessageQueue<TestMessage>();
      const iterator = queue[Symbol.asyncIterator]();
      
      queue.enqueue(createTestMessage(1));
      
      // 在迭代过程中销毁队列
      setTimeout(() => queue.dispose(), 10);
      
      const result = await iterator.next();
      expect(result.done).toBe(false);
      expect(result.value.id).toBe(1);
    });
  });

  describe('Stress Tests', () => {
    test('should handle very large message payloads', async () => {
      const queue = new h2AAsyncMessageQueue<{data: string}>();
      const iterator = queue[Symbol.asyncIterator]();
      
      // 创建大型消息
      const largeMessage = {
        data: 'x'.repeat(1024 * 1024) // 1MB 字符串
      };
      
      queue.enqueue(largeMessage);
      queue.done();
      
      const result = await iterator.next();
      expect(result.done).toBe(false);
      expect(result.value.data).toHaveLength(1024 * 1024);
      
      queue.dispose();
    });

    test('should maintain performance under memory pressure', async () => {
      const queue = new h2AAsyncMessageQueue<TestMessage>({
        maxBufferSize: 10000,
        enableMetrics: true
      });
      
      const messageCount = 5000;
      const messages = Array.from({ length: messageCount }, (_, i) => createTestMessage(i + 1));
      
      // 快速入队大量消息
      const startEnqueue = Date.now();
      messages.forEach(msg => queue.enqueue(msg));
      const enqueueTime = Date.now() - startEnqueue;
      
      const iterator = queue[Symbol.asyncIterator]();
      queue.done();
      
      // 快速出队
      const startDequeue = Date.now();
      const results = await collectAsync(queue, messageCount);
      const dequeueTime = Date.now() - startDequeue;
      
      expect(results).toHaveLength(messageCount);
      expect(enqueueTime).toBeLessThan(1000); // 入队应在1秒内完成
      expect(dequeueTime).toBeLessThan(1000); // 出队应在1秒内完成
      
      const metrics = queue.getMetrics();
      expect(metrics.enqueueCount).toBe(messageCount);
      expect(metrics.dequeueCount).toBe(messageCount);
      
      queue.dispose();
    });
  });
});

// ============================================================================
// 集成测试
// ============================================================================

describe('h2AAsyncMessageQueue Integration Tests', () => {
  test('should integrate with error recovery system', async () => {
    const queue = new h2AAsyncMessageQueue<TestMessage>({
      enableMetrics: true,
      timeoutMs: 50 // 短超时用于测试
    });
    
    const recoveryManager = new AutoRecoveryManager();
    const errorAnalyzer = new ErrorAnalyzer();
    
    const iterator = queue[Symbol.asyncIterator]();
    
    try {
      // 触发超时错误
      await iterator.next();
    } catch (error) {
      if (error instanceof QueueError) {
        // 记录错误
        errorAnalyzer.recordError(error);
        
        // 尝试恢复
        const recovered = await recoveryManager.handleError(error, queue);
        expect(typeof recovered).toBe('boolean');
        
        // 分析错误模式
        const analysis = errorAnalyzer.analyze();
        expect(analysis.totalErrors).toBe(1);
        expect(analysis.errorTypeDistribution.has(QueueErrorType.TIMEOUT_ERROR)).toBe(true);
      }
    }
    
    queue.dispose();
  });

  test('should work with different message types', async () => {
    // 测试不同类型的消息
    interface ComplexMessage {
      id: string;
      data: {
        numbers: number[];
        nested: {
          value: string;
          timestamp: Date;
        };
      };
      metadata?: Map<string, any>;
    }
    
    const queue = new h2AAsyncMessageQueue<ComplexMessage>();
    const iterator = queue[Symbol.asyncIterator]();
    
    const complexMessage: ComplexMessage = {
      id: 'complex-1',
      data: {
        numbers: [1, 2, 3, 4, 5],
        nested: {
          value: 'test-value',
          timestamp: new Date()
        }
      },
      metadata: new Map([['key1', 'value1'], ['key2', 42]])
    };
    
    queue.enqueue(complexMessage);
    queue.done();
    
    const result = await iterator.next();
    expect(result.done).toBe(false);
    expect(result.value).toEqual(complexMessage);
    
    queue.dispose();
  });
});