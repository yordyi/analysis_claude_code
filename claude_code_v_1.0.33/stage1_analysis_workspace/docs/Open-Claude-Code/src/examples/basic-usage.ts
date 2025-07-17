/**
 * h2A双重缓冲异步消息队列基础使用示例
 * 
 * 演示h2A消息队列系统的核心功能和最佳实践。
 */

import {
  createStandardEnvironment,
  createHighPerformanceEnvironment,
  h2AAsyncMessageQueue,
  createStandardMessage,
  MessageType,
  Priority,
  BackpressureStrategy,
  delay,
  collectAsync,
  PerformanceTimer
} from '../index.js';

// ============================================================================
// 基础使用示例
// ============================================================================

/**
 * 基础异步迭代示例
 */
async function basicAsyncIterationExample(): Promise<void> {
  console.log('\n🚀 基础异步迭代示例');
  console.log('=' .repeat(50));

  // 创建消息队列
  const queue = new h2AAsyncMessageQueue<string>({
    enableMetrics: true,
    maxBufferSize: 10
  });

  // 模拟生产者
  const producer = async () => {
    console.log('生产者开始工作...');
    
    for (let i = 1; i <= 5; i++) {
      queue.enqueue(`消息 ${i}`);
      console.log(`📤 发送: 消息 ${i}`);
      await delay(100);
    }
    
    queue.done();
    console.log('✅ 生产者完成');
  };

  // 模拟消费者
  const consumer = async () => {
    console.log('消费者开始工作...');
    
    for await (const message of queue) {
      console.log(`📥 接收: ${message}`);
      await delay(50); // 模拟处理时间
    }
    
    console.log('✅ 消费者完成');
  };

  // 并行运行生产者和消费者
  await Promise.all([producer(), consumer()]);
  
  // 显示性能指标
  const metrics = queue.getMetrics();
  console.log('📊 性能指标:', {
    入队数量: metrics.enqueueCount,
    出队数量: metrics.dequeueCount,
    平均延迟: `${metrics.avgLatency.toFixed(2)}ms`
  });

  queue.dispose();
}

/**
 * 背压控制示例
 */
async function backpressureControlExample(): Promise<void> {
  console.log('\n🛡️ 背压控制示例');
  console.log('=' .repeat(50));

  const queue = new h2AAsyncMessageQueue<number>({
    maxBufferSize: 3,
    backpressureStrategy: BackpressureStrategy.DROP_OLDEST,
    enableMetrics: true
  });

  console.log('缓冲区容量: 3');
  console.log('背压策略: 丢弃最旧消息');

  // 快速发送超出容量的消息
  for (let i = 1; i <= 6; i++) {
    queue.enqueue(i);
    console.log(`📤 尝试发送: ${i}`);
  }

  const status = queue.getStatus();
  console.log(`📋 队列状态: 大小 ${status.queueSize}`);

  // 消费剩余消息
  const iterator = queue[Symbol.asyncIterator]();
  queue.done();

  const remainingMessages: number[] = [];
  for await (const message of queue) {
    remainingMessages.push(message);
  }

  console.log('📥 剩余消息:', remainingMessages);
  
  const metrics = queue.getMetrics();
  console.log(`🗑️ 丢弃消息数: ${metrics.droppedMessages}`);

  queue.dispose();
}

/**
 * 错误处理示例
 */
async function errorHandlingExample(): Promise<void> {
  console.log('\n❌ 错误处理示例');
  console.log('=' .repeat(50));

  const queue = new h2AAsyncMessageQueue<string>({
    enableMetrics: true
  });

  const iterator = queue[Symbol.asyncIterator]();

  // 监听状态变化
  queue.onStateChange('example', (change) => {
    console.log(`🔄 状态变化: ${change.transition.from} -> ${change.transition.to}`);
  });

  try {
    // 发送一个正常消息
    queue.enqueue('正常消息');
    const result1 = await iterator.next();
    console.log(`📥 接收: ${result1.value}`);

    // 模拟错误
    setTimeout(() => {
      console.log('💥 模拟系统错误');
      queue.error(new Error('模拟的系统错误'));
    }, 100);

    // 尝试读取下一个消息（应该抛出错误）
    await iterator.next();
  } catch (error) {
    console.log(`🚨 捕获错误: ${error instanceof Error ? error.message : error}`);
  }

  queue.dispose();
}

/**
 * 高性能场景示例
 */
async function highPerformanceExample(): Promise<void> {
  console.log('\n⚡ 高性能场景示例');
  console.log('=' .repeat(50));

  const messageCount = 10000;
  const queue = new h2AAsyncMessageQueue<number>({
    maxBufferSize: messageCount,
    enableMetrics: true,
    backpressureStrategy: BackpressureStrategy.ERROR
  });

  const timer = new PerformanceTimer();
  timer.start();

  const iterator = queue[Symbol.asyncIterator]();

  // 高速生产者
  const producer = async () => {
    console.log(`🏭 开始生产 ${messageCount.toLocaleString()} 条消息...`);
    
    for (let i = 1; i <= messageCount; i++) {
      queue.enqueue(i);
    }
    
    queue.done();
    console.log('✅ 生产完成');
  };

  // 高速消费者
  const consumer = async () => {
    console.log('🏃 开始高速消费...');
    
    let processed = 0;
    for await (const message of queue) {
      processed++;
      
      // 每1000条消息报告一次进度
      if (processed % 1000 === 0) {
        console.log(`📊 已处理: ${processed.toLocaleString()}`);
      }
    }
    
    return processed;
  };

  // 并行执行
  const [, processedCount] = await Promise.all([producer(), consumer()]);
  
  const duration = timer.stop();
  const throughput = processedCount / (duration / 1000);

  console.log('\n📈 性能结果:');
  console.log(`   处理消息: ${processedCount.toLocaleString()}`);
  console.log(`   耗时: ${duration.toFixed(2)}ms`);
  console.log(`   吞吐量: ${throughput.toFixed(2)} 消息/秒`);

  const metrics = queue.getDetailedMetrics();
  console.log(`   平均延迟: ${metrics.latency.avgLatency.toFixed(3)}ms`);
  console.log(`   P95延迟: ${metrics.latency.p95Latency.toFixed(3)}ms`);

  queue.dispose();
}

/**
 * 标准消息协议示例
 */
async function standardMessageExample(): Promise<void> {
  console.log('\n📨 标准消息协议示例');
  console.log('=' .repeat(50));

  const environment = createStandardEnvironment({
    enableMetrics: true,
    maxBufferSize: 100
  });

  const { inputHandler, agentCore } = environment;

  if (!inputHandler || !agentCore) {
    console.error('Failed to initialize environment');
    return;
  }

  // 监听Agent Core事件
  agentCore.on('userInput', (message) => {
    console.log(`🧠 Agent收到用户输入: ${JSON.stringify(message.payload)}`);
  });

  agentCore.on('toolCall', (message) => {
    console.log(`🔧 Agent收到工具调用: ${message.payload.tool}`);
  });

  // 开始消费消息
  const consumptionPromise = agentCore.startConsuming();

  // 模拟各种类型的消息
  const messages = [
    createStandardMessage(MessageType.USER_INPUT, { text: '你好，Claude!' }),
    createStandardMessage(MessageType.TOOL_CALL, { tool: 'calculator', args: [1, 2] }),
    createStandardMessage(MessageType.SYSTEM_EVENT, { event: 'system_ready' }, { priority: Priority.HIGH }),
    createStandardMessage(MessageType.INTERRUPT, { reason: 'user_stop' }, { priority: Priority.URGENT })
  ];

  for (const message of messages) {
    inputHandler.publishMessage(message);
    await delay(100);
  }

  // 停止消费
  await agentCore.stopConsuming();
  await consumptionPromise;

  // 显示统计信息
  const stats = agentCore.getProcessingStats();
  console.log('📊 处理统计:', {
    处理消息数: stats.processedCount,
    错误数: stats.errorCount,
    最后处理时间: `${stats.lastProcessTime.toFixed(2)}ms`
  });

  await environment.integrationManager.dispose();
}

/**
 * 批量处理示例
 */
async function batchProcessingExample(): Promise<void> {
  console.log('\n📦 批量处理示例');
  console.log('=' .repeat(50));

  const environment = createHighPerformanceEnvironment();
  const { inputHandler } = environment;

  if (!inputHandler) {
    console.error('Failed to initialize environment');
    return;
  }

  // 配置批处理
  inputHandler.configureBatch({
    maxSize: 5,
    maxWaitTime: 500,
    autoFlush: true
  });

  // 监听批量发布事件
  inputHandler.on('batchPublished', (event) => {
    console.log(`📦 批量发布完成: ${event.successCount}/${event.results.length} 成功`);
  });

  // 逐个添加消息到批处理缓冲区
  for (let i = 1; i <= 12; i++) {
    const message = createStandardMessage(MessageType.USER_INPUT, { id: i, data: `数据${i}` });
    inputHandler.addToBatch(message);
    console.log(`➕ 添加到批处理: 数据${i}`);
    
    // 随机延迟
    await delay(Math.random() * 200);
  }

  // 手动刷新剩余的消息
  await delay(1000);
  inputHandler.flushBatch();

  const stats = inputHandler.getPublishingStats();
  console.log('📊 发布统计:', {
    发布数量: stats.publishedCount,
    验证错误: stats.validationErrorCount
  });

  await environment.integrationManager.dispose();
}

// ============================================================================
// 主执行函数
// ============================================================================

async function runAllExamples(): Promise<void> {
  console.log('🎯 h2A双重缓冲异步消息队列使用示例');
  console.log('=' .repeat(60));

  const examples = [
    { name: '基础异步迭代', fn: basicAsyncIterationExample },
    { name: '背压控制', fn: backpressureControlExample },
    { name: '错误处理', fn: errorHandlingExample },
    { name: '高性能场景', fn: highPerformanceExample },
    { name: '标准消息协议', fn: standardMessageExample },
    { name: '批量处理', fn: batchProcessingExample }
  ];

  for (const example of examples) {
    try {
      await example.fn();
      await delay(500); // 示例间隔
    } catch (error) {
      console.error(`❌ 示例 "${example.name}" 执行失败:`, error);
    }
  }

  console.log('\n🎉 所有示例执行完成！');
}

// 如果直接运行此文件，执行所有示例
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples().catch(console.error);
}

export {
  basicAsyncIterationExample,
  backpressureControlExample,
  errorHandlingExample,
  highPerformanceExample,
  standardMessageExample,
  batchProcessingExample,
  runAllExamples
};