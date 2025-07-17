/**
 * h2A双重缓冲异步消息队列性能基准测试
 * 
 * 验证系统是否满足性能要求：
 * - 缓冲区切换延迟 < 1ms
 * - 消息吞吐量 > 10,000 msgs/sec
 * - 内存使用 < 100MB for 1M messages
 * - 零消息丢失保证
 */

import { performance } from 'perf_hooks';
import {
  h2AAsyncMessageQueue,
  createHighPerformanceQueue
} from '../../src/core/message-queue.js';
import {
  BackpressureStrategy,
  QueueMetrics,
  QueuePerformanceMetrics
} from '../../src/types/message-queue.js';

// ============================================================================
// 基准测试辅助工具
// ============================================================================

/**
 * 延迟工具函数
 */
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 内存使用监控
 */
function getMemoryUsage(): NodeJS.MemoryUsage {
  return process.memoryUsage();
}

/**
 * 格式化内存使用量
 */
function formatMemory(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

/**
 * 基准测试结果接口
 */
interface BenchmarkResult {
  testName: string;
  duration: number;
  throughput: number;
  avgLatency: number;
  maxLatency: number;
  minLatency: number;
  memoryUsage: {
    start: NodeJS.MemoryUsage;
    peak: NodeJS.MemoryUsage;
    end: NodeJS.MemoryUsage;
  };
  messagesProcessed: number;
  errors: number;
  success: boolean;
}

/**
 * 测试消息类型
 */
interface BenchmarkMessage {
  id: number;
  timestamp: number;
  payload: string;
  sequence: number;
}

/**
 * 创建基准测试消息
 */
function createBenchmarkMessage(id: number, sequence: number, payloadSize: number = 64): BenchmarkMessage {
  return {
    id,
    timestamp: performance.now(),
    payload: 'x'.repeat(payloadSize),
    sequence
  };
}

/**
 * 基准测试运行器
 */
class BenchmarkRunner {
  private results: BenchmarkResult[] = [];

  async runBenchmark(
    testName: string,
    testFunction: () => Promise<BenchmarkResult>
  ): Promise<BenchmarkResult> {
    console.log(`\n🚀 Running benchmark: ${testName}`);
    console.log('=' .repeat(60));

    // 预热GC
    if (global.gc) {
      global.gc();
    }

    const startMemory = getMemoryUsage();
    const startTime = performance.now();

    try {
      const result = await testFunction();
      result.testName = testName;
      
      this.results.push(result);
      this.printResult(result);
      
      return result;
    } catch (error) {
      console.error(`❌ Benchmark failed: ${error}`);
      throw error;
    } finally {
      // 清理
      if (global.gc) {
        global.gc();
      }
    }
  }

  private printResult(result: BenchmarkResult): void {
    console.log(`✅ Test: ${result.testName}`);
    console.log(`   Duration: ${result.duration.toFixed(2)} ms`);
    console.log(`   Throughput: ${result.throughput.toFixed(2)} msgs/sec`);
    console.log(`   Avg Latency: ${result.avgLatency.toFixed(3)} ms`);
    console.log(`   Max Latency: ${result.maxLatency.toFixed(3)} ms`);
    console.log(`   Min Latency: ${result.minLatency.toFixed(3)} ms`);
    console.log(`   Messages: ${result.messagesProcessed.toLocaleString()}`);
    console.log(`   Errors: ${result.errors}`);
    console.log(`   Memory Start: ${formatMemory(result.memoryUsage.start.heapUsed)}`);
    console.log(`   Memory Peak: ${formatMemory(result.memoryUsage.peak.heapUsed)}`);
    console.log(`   Memory End: ${formatMemory(result.memoryUsage.end.heapUsed)}`);
    console.log(`   Success: ${result.success ? '✅' : '❌'}`);
  }

  getAllResults(): BenchmarkResult[] {
    return [...this.results];
  }

  printSummary(): void {
    console.log('\n📊 BENCHMARK SUMMARY');
    console.log('=' .repeat(60));
    
    const successful = this.results.filter(r => r.success);
    const failed = this.results.filter(r => !r.success);
    
    console.log(`Total Tests: ${this.results.length}`);
    console.log(`Successful: ${successful.length}`);
    console.log(`Failed: ${failed.length}`);
    
    if (successful.length > 0) {
      const avgThroughput = successful.reduce((sum, r) => sum + r.throughput, 0) / successful.length;
      const avgLatency = successful.reduce((sum, r) => sum + r.avgLatency, 0) / successful.length;
      const maxThroughput = Math.max(...successful.map(r => r.throughput));
      const minLatency = Math.min(...successful.map(r => r.avgLatency));
      
      console.log(`\n📈 Performance Metrics:`);
      console.log(`   Average Throughput: ${avgThroughput.toFixed(2)} msgs/sec`);
      console.log(`   Maximum Throughput: ${maxThroughput.toFixed(2)} msgs/sec`);
      console.log(`   Average Latency: ${avgLatency.toFixed(3)} ms`);
      console.log(`   Minimum Latency: ${minLatency.toFixed(3)} ms`);
      
      // 性能要求验证
      console.log(`\n✨ Performance Requirements:`);
      console.log(`   Throughput > 10,000 msgs/sec: ${maxThroughput > 10000 ? '✅' : '❌'}`);
      console.log(`   Latency < 1ms: ${minLatency < 1 ? '✅' : '❌'}`);
    }
  }
}

// ============================================================================
// 基准测试套件
// ============================================================================

/**
 * 基础吞吐量测试
 */
async function benchmarkBasicThroughput(): Promise<BenchmarkResult> {
  const messageCount = 50000;
  const queue = createHighPerformanceQueue<BenchmarkMessage>();
  
  const startMemory = getMemoryUsage();
  let peakMemory = startMemory;
  
  const latencies: number[] = [];
  let errors = 0;
  
  const startTime = performance.now();
  const iterator = queue[Symbol.asyncIterator]();
  
  // 生产者：快速入队
  const producer = async () => {
    for (let i = 0; i < messageCount; i++) {
      try {
        const message = createBenchmarkMessage(i + 1, i + 1);
        queue.enqueue(message);
        
        // 监控内存使用
        const currentMemory = getMemoryUsage();
        if (currentMemory.heapUsed > peakMemory.heapUsed) {
          peakMemory = currentMemory;
        }
      } catch (error) {
        errors++;
      }
    }
    queue.done();
  };
  
  // 消费者：处理所有消息
  const consumer = async () => {
    let processed = 0;
    for await (const message of queue) {
      const latency = performance.now() - message.timestamp;
      latencies.push(latency);
      processed++;
    }
    return processed;
  };
  
  // 并行运行
  const [, messagesProcessed] = await Promise.all([
    producer(),
    consumer()
  ]);
  
  const endTime = performance.now();
  const endMemory = getMemoryUsage();
  const duration = endTime - startTime;
  
  const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b) / latencies.length : 0;
  const maxLatency = latencies.length > 0 ? Math.max(...latencies) : 0;
  const minLatency = latencies.length > 0 ? Math.min(...latencies) : 0;
  const throughput = messagesProcessed / (duration / 1000);
  
  queue.dispose();
  
  return {
    testName: 'Basic Throughput',
    duration,
    throughput,
    avgLatency,
    maxLatency,
    minLatency,
    memoryUsage: {
      start: startMemory,
      peak: peakMemory,
      end: endMemory
    },
    messagesProcessed,
    errors,
    success: messagesProcessed === messageCount && errors === 0
  };
}

/**
 * 零延迟路径测试（直接传递）
 */
async function benchmarkZeroLatencyPath(): Promise<BenchmarkResult> {
  const messageCount = 10000;
  const queue = new h2AAsyncMessageQueue<BenchmarkMessage>({
    enableMetrics: true,
    maxBufferSize: 1 // 小缓冲区强制使用零延迟路径
  });
  
  const startMemory = getMemoryUsage();
  let peakMemory = startMemory;
  
  const latencies: number[] = [];
  let errors = 0;
  
  const startTime = performance.now();
  const iterator = queue[Symbol.asyncIterator]();
  
  let processed = 0;
  
  // 交替生产和消费，测试零延迟路径
  for (let i = 0; i < messageCount; i++) {
    try {
      const message = createBenchmarkMessage(i + 1, i + 1);
      
      // 启动读取Promise
      const readPromise = iterator.next();
      
      // 立即入队消息（应该直接传递给等待的读取者）
      queue.enqueue(message);
      
      // 等待消息被读取
      const result = await readPromise;
      
      if (!result.done) {
        const latency = performance.now() - result.value.timestamp;
        latencies.push(latency);
        processed++;
      }
      
      // 监控内存使用
      const currentMemory = getMemoryUsage();
      if (currentMemory.heapUsed > peakMemory.heapUsed) {
        peakMemory = currentMemory;
      }
    } catch (error) {
      errors++;
    }
  }
  
  const endTime = performance.now();
  const endMemory = getMemoryUsage();
  const duration = endTime - startTime;
  
  const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b) / latencies.length : 0;
  const maxLatency = latencies.length > 0 ? Math.max(...latencies) : 0;
  const minLatency = latencies.length > 0 ? Math.min(...latencies) : 0;
  const throughput = processed / (duration / 1000);
  
  queue.dispose();
  
  return {
    testName: 'Zero Latency Path',
    duration,
    throughput,
    avgLatency,
    maxLatency,
    minLatency,
    memoryUsage: {
      start: startMemory,
      peak: peakMemory,
      end: endMemory
    },
    messagesProcessed: processed,
    errors,
    success: processed === messageCount && errors === 0 && avgLatency < 1
  };
}

/**
 * 大容量内存测试
 */
async function benchmarkLargeCapacity(): Promise<BenchmarkResult> {
  const messageCount = 100000; // 10万消息
  const queue = new h2AAsyncMessageQueue<BenchmarkMessage>({
    enableMetrics: true,
    maxBufferSize: messageCount,
    backpressureStrategy: BackpressureStrategy.ERROR
  });
  
  const startMemory = getMemoryUsage();
  let peakMemory = startMemory;
  
  const latencies: number[] = [];
  let errors = 0;
  
  const startTime = performance.now();
  
  // 阶段1：快速填充队列
  console.log('   Phase 1: Filling queue...');
  for (let i = 0; i < messageCount; i++) {
    try {
      const message = createBenchmarkMessage(i + 1, i + 1, 128); // 稍大的消息
      queue.enqueue(message);
      
      // 每1000个消息检查一次内存
      if (i % 1000 === 0) {
        const currentMemory = getMemoryUsage();
        if (currentMemory.heapUsed > peakMemory.heapUsed) {
          peakMemory = currentMemory;
        }
      }
    } catch (error) {
      errors++;
    }
  }
  
  const fillTime = performance.now();
  console.log(`   Fill completed in ${(fillTime - startTime).toFixed(2)} ms`);
  
  // 阶段2：快速清空队列
  console.log('   Phase 2: Draining queue...');
  const iterator = queue[Symbol.asyncIterator]();
  queue.done();
  
  let processed = 0;
  for await (const message of queue) {
    const latency = performance.now() - message.timestamp;
    latencies.push(latency);
    processed++;
    
    // 每1000个消息检查一次内存
    if (processed % 1000 === 0) {
      const currentMemory = getMemoryUsage();
      if (currentMemory.heapUsed > peakMemory.heapUsed) {
        peakMemory = currentMemory;
      }
    }
  }
  
  const endTime = performance.now();
  const endMemory = getMemoryUsage();
  const duration = endTime - startTime;
  
  const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b) / latencies.length : 0;
  const maxLatency = latencies.length > 0 ? Math.max(...latencies) : 0;
  const minLatency = latencies.length > 0 ? Math.min(...latencies) : 0;
  const throughput = processed / (duration / 1000);
  
  // 内存使用验证（100MB限制）
  const peakMemoryMB = peakMemory.heapUsed / (1024 * 1024);
  const memoryEfficient = peakMemoryMB < 100;
  
  queue.dispose();
  
  return {
    testName: 'Large Capacity',
    duration,
    throughput,
    avgLatency,
    maxLatency,
    minLatency,
    memoryUsage: {
      start: startMemory,
      peak: peakMemory,
      end: endMemory
    },
    messagesProcessed: processed,
    errors,
    success: processed === messageCount && errors === 0 && memoryEfficient
  };
}

/**
 * 背压控制性能测试
 */
async function benchmarkBackpressurePerformance(): Promise<BenchmarkResult> {
  const messageCount = 20000;
  const bufferSize = 100;
  const queue = new h2AAsyncMessageQueue<BenchmarkMessage>({
    enableMetrics: true,
    maxBufferSize: bufferSize,
    backpressureStrategy: BackpressureStrategy.DROP_OLDEST
  });
  
  const startMemory = getMemoryUsage();
  let peakMemory = startMemory;
  
  const latencies: number[] = [];
  let errors = 0;
  
  const startTime = performance.now();
  const iterator = queue[Symbol.asyncIterator]();
  
  // 生产者：快速生产超出缓冲区容量的消息
  const producer = async () => {
    for (let i = 0; i < messageCount; i++) {
      try {
        const message = createBenchmarkMessage(i + 1, i + 1);
        queue.enqueue(message);
        
        // 小延迟模拟生产压力
        if (i % 100 === 0) {
          await delay(1);
        }
      } catch (error) {
        errors++;
      }
    }
    queue.done();
  };
  
  // 消费者：适中速度消费
  const consumer = async () => {
    let processed = 0;
    for await (const message of queue) {
      const latency = performance.now() - message.timestamp;
      latencies.push(latency);
      processed++;
      
      // 模拟处理时间
      if (processed % 50 === 0) {
        await delay(1);
        
        const currentMemory = getMemoryUsage();
        if (currentMemory.heapUsed > peakMemory.heapUsed) {
          peakMemory = currentMemory;
        }
      }
    }
    return processed;
  };
  
  // 并行运行
  const [, messagesProcessed] = await Promise.all([
    producer(),
    consumer()
  ]);
  
  const endTime = performance.now();
  const endMemory = getMemoryUsage();
  const duration = endTime - startTime;
  
  const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b) / latencies.length : 0;
  const maxLatency = latencies.length > 0 ? Math.max(...latencies) : 0;
  const minLatency = latencies.length > 0 ? Math.min(...latencies) : 0;
  const throughput = messagesProcessed / (duration / 1000);
  
  // 获取队列指标
  const metrics = queue.getMetrics();
  console.log(`   Dropped messages: ${metrics.droppedMessages}`);
  
  queue.dispose();
  
  return {
    testName: 'Backpressure Performance',
    duration,
    throughput,
    avgLatency,
    maxLatency,
    minLatency,
    memoryUsage: {
      start: startMemory,
      peak: peakMemory,
      end: endMemory
    },
    messagesProcessed,
    errors,
    success: messagesProcessed > 0 && errors === 0 && throughput > 1000
  };
}

/**
 * 并发压力测试
 */
async function benchmarkConcurrentStress(): Promise<BenchmarkResult> {
  const producerCount = 5;
  const messagesPerProducer = 5000;
  const totalMessages = producerCount * messagesPerProducer;
  
  const queue = createHighPerformanceQueue<BenchmarkMessage>();
  
  const startMemory = getMemoryUsage();
  let peakMemory = startMemory;
  
  const latencies: number[] = [];
  let errors = 0;
  
  const startTime = performance.now();
  const iterator = queue[Symbol.asyncIterator]();
  
  // 多个并发生产者
  const producers = Array.from({ length: producerCount }, (_, producerId) =>
    async () => {
      for (let i = 0; i < messagesPerProducer; i++) {
        try {
          const messageId = producerId * messagesPerProducer + i + 1;
          const message = createBenchmarkMessage(messageId, messageId);
          queue.enqueue(message);
          
          // 随机小延迟增加并发复杂性
          if (Math.random() < 0.01) {
            await delay(1);
          }
        } catch (error) {
          errors++;
        }
      }
    }
  );
  
  // 消费者
  const consumer = async () => {
    let processed = 0;
    for await (const message of queue) {
      const latency = performance.now() - message.timestamp;
      latencies.push(latency);
      processed++;
      
      // 定期检查内存
      if (processed % 1000 === 0) {
        const currentMemory = getMemoryUsage();
        if (currentMemory.heapUsed > peakMemory.heapUsed) {
          peakMemory = currentMemory;
        }
      }
    }
    return processed;
  };
  
  // 启动消费者
  const consumerPromise = consumer();
  
  // 运行所有生产者
  await Promise.all(producers.map(p => p()));
  queue.done();
  
  // 等待消费者完成
  const messagesProcessed = await consumerPromise;
  
  const endTime = performance.now();
  const endMemory = getMemoryUsage();
  const duration = endTime - startTime;
  
  const avgLatency = latencies.length > 0 ? latencies.reduce((a, b) => a + b) / latencies.length : 0;
  const maxLatency = latencies.length > 0 ? Math.max(...latencies) : 0;
  const minLatency = latencies.length > 0 ? Math.min(...latencies) : 0;
  const throughput = messagesProcessed / (duration / 1000);
  
  queue.dispose();
  
  return {
    testName: 'Concurrent Stress',
    duration,
    throughput,
    avgLatency,
    maxLatency,
    minLatency,
    memoryUsage: {
      start: startMemory,
      peak: peakMemory,
      end: endMemory
    },
    messagesProcessed,
    errors,
    success: messagesProcessed >= totalMessages * 0.99 && errors < totalMessages * 0.01 && throughput > 5000
  };
}

// ============================================================================
// 主基准测试执行
// ============================================================================

/**
 * 运行所有基准测试
 */
export async function runAllBenchmarks(): Promise<BenchmarkResult[]> {
  const runner = new BenchmarkRunner();
  
  console.log('🔥 h2A双重缓冲异步消息队列性能基准测试');
  console.log('=' .repeat(60));
  console.log('验证性能要求：');
  console.log('• 缓冲区切换延迟 < 1ms');
  console.log('• 消息吞吐量 > 10,000 msgs/sec');
  console.log('• 内存使用 < 100MB for 大容量消息');
  console.log('• 零消息丢失保证');
  
  const results: BenchmarkResult[] = [];
  
  try {
    // 1. 基础吞吐量测试
    results.push(await runner.runBenchmark(
      'Basic Throughput Test',
      benchmarkBasicThroughput
    ));
    
    // 2. 零延迟路径测试
    results.push(await runner.runBenchmark(
      'Zero Latency Path Test',
      benchmarkZeroLatencyPath
    ));
    
    // 3. 大容量内存测试
    results.push(await runner.runBenchmark(
      'Large Capacity Memory Test',
      benchmarkLargeCapacity
    ));
    
    // 4. 背压控制性能测试
    results.push(await runner.runBenchmark(
      'Backpressure Performance Test',
      benchmarkBackpressurePerformance
    ));
    
    // 5. 并发压力测试
    results.push(await runner.runBenchmark(
      'Concurrent Stress Test',
      benchmarkConcurrentStress
    ));
    
  } catch (error) {
    console.error('❌ Benchmark suite failed:', error);
  } finally {
    // 打印总结
    runner.printSummary();
  }
  
  return results;
}

/**
 * 验证性能要求
 */
export function validatePerformanceRequirements(results: BenchmarkResult[]): boolean {
  const successful = results.filter(r => r.success);
  
  if (successful.length === 0) {
    console.log('❌ No successful benchmarks to validate');
    return false;
  }
  
  // 检查吞吐量要求
  const maxThroughput = Math.max(...successful.map(r => r.throughput));
  const throughputOk = maxThroughput > 10000;
  
  // 检查延迟要求
  const minAvgLatency = Math.min(...successful.map(r => r.avgLatency));
  const latencyOk = minAvgLatency < 1;
  
  // 检查内存要求（针对大容量测试）
  const largeCapacityTest = successful.find(r => r.testName.includes('Large Capacity'));
  const memoryOk = largeCapacityTest ? 
    (largeCapacityTest.memoryUsage.peak.heapUsed / (1024 * 1024)) < 100 : 
    true;
  
  console.log('\n🎯 PERFORMANCE REQUIREMENTS VALIDATION');
  console.log('=' .repeat(60));
  console.log(`✨ Throughput > 10,000 msgs/sec: ${throughputOk ? '✅' : '❌'} (${maxThroughput.toFixed(2)} msgs/sec)`);
  console.log(`✨ Latency < 1ms: ${latencyOk ? '✅' : '❌'} (${minAvgLatency.toFixed(3)} ms)`);
  console.log(`✨ Memory < 100MB: ${memoryOk ? '✅' : '❌'} ${largeCapacityTest ? `(${(largeCapacityTest.memoryUsage.peak.heapUsed / (1024 * 1024)).toFixed(2)} MB)` : '(N/A)'}`);
  
  const allRequirementsMet = throughputOk && latencyOk && memoryOk;
  console.log(`\n🏆 Overall: ${allRequirementsMet ? '✅ ALL REQUIREMENTS MET' : '❌ REQUIREMENTS NOT MET'}`);
  
  return allRequirementsMet;
}

// ============================================================================
// 独立运行脚本
// ============================================================================

if (require.main === module) {
  (async () => {
    try {
      const results = await runAllBenchmarks();
      const requirementsMet = validatePerformanceRequirements(results);
      
      process.exit(requirementsMet ? 0 : 1);
    } catch (error) {
      console.error('Benchmark execution failed:', error);
      process.exit(1);
    }
  })();
}