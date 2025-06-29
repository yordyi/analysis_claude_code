# Agent核心引擎nO函数 - 自然语言实现规范

## 1. 模块概述

- **功能定位**: 实现Claude Code的nO主Agent循环引擎，作为整个AI编程助手的执行中枢和大脑
- **核心职责**: 通过async generator模式实现可中断的对话循环、智能工具调度、上下文压缩管理和完整的错误恢复机制
- **设计目标**: 实现100%可中断性、毫秒级Steering响应、智能资源管理和企业级错误处理能力

## 2. 接口定义

### 2.1 输入接口
- **messages**: Message[], 对话历史消息数组, 必填, 支持各种消息类型(user/assistant/system/tool_result)
- **systemPrompt**: string, 系统提示内容, 必填, 长度1000-50000字符, 支持模板变量
- **modelConfig**: ModelConfiguration, 模型配置对象, 必填, 包含模型名称、参数、限制等
- **resourceConfig**: ResourceConfiguration, 资源配置对象, 必填, 定义内存、token、时间限制
- **globalConfig**: GlobalConfiguration, 全局配置对象, 必填, 包含会话ID、用户偏好等
- **context**: AgentExecutionContext, Agent执行上下文, 必填, 包含工具、权限、状态管理器
- **compactionState**: CompactionState, 压缩状态对象, 可选, 记录上下文压缩历史
- **fallbackModel**: string, 降级模型名称, 可选, 模型调用失败时的备选方案

### 2.2 输出接口
- **正常返回**: AsyncGenerator<AgentResponse>, 支持实时流式输出和中断控制
- **异常返回**: 错误码5001-5100, 包含详细错误信息、恢复建议、调试数据
- **性能指标**: 循环延迟<50ms, 模型响应<2s, 工具执行并发度10, 内存使用<500MB

## 3. 核心逻辑

### 3.1 主要处理流程
1. **流程启动**: 发送stream_request_start信号、初始化执行状态、建立中断监听
2. **上下文压缩**: 检查token阈值(40000)、执行智能压缩、更新压缩状态
3. **模型调用循环**: 构建请求、调用语言模型、处理流式响应、收集助手消息
4. **工具解析调度**: 提取工具调用、按安全性分组、执行并发/串行调度
5. **结果处理**: 收集工具结果、排序整理、检查继续条件
6. **递归循环**: 构建新消息数组、递归调用nO函数、维持对话流程
7. **错误处理**: 捕获所有异常、执行恢复策略、生成错误响应

### 3.2 关键算法
- **async generator主循环**: 基于yield*的可中断执行模式，每个yield点都是潜在中断点，支持毫秒级响应
- **智能上下文压缩**: 基于wU2函数的压缩算法，保留关键信息，压缩比>60%，信息损失<5%
- **工具并发调度**: 基于isConcurrencySafe的智能分组，最大并发度10，负载均衡调度

## 4. 状态管理

### 4.1 内部状态
- **currentMessages**: Message[], 当前循环的消息数组, 初始值为输入messages
- **assistantMessages**: AssistantMessage[], 当前轮次助手响应, 初始值空数组
- **currentModel**: string, 当前使用的模型名称, 初始值context.options.mainLoopModel
- **shouldRetry**: boolean, 是否需要重试标志, 初始值true
- **compactionState**: CompactionState, 压缩状态追踪, 初始值根据输入确定

### 4.2 持久化
- **存储方式**: 运行时内存状态 + 会话级别状态持久化
- **缓存策略**: 无状态设计，每次调用重新初始化，依赖参数传递保持状态
- **数据一致性**: 通过不可变数据结构确保状态一致性，避免并发冲突

## 5. 异常处理

### 5.1 异常分类
- **模型调用错误**: 错误码5001-5010, API超时、模型不可用、token限制，触发fallback机制
- **工具执行错误**: 错误码5011-5020, 工具调用失败、权限不足、执行超时，生成工具错误响应
- **上下文错误**: 错误码5021-5030, 压缩失败、消息格式错误、状态不一致，尝试恢复或重置
- **中断信号**: 错误码5031-5040, 用户中断、系统中断、超时中断，优雅停止执行

### 5.2 监控日志
- **关键监控点**: 循环执行时间(P99<200ms)、模型调用成功率(>99%)、工具执行成功率(>95%)、中断响应时间(<100ms)
- **日志记录**: TRACE级别记录每个yield点，DEBUG级别记录状态变更，INFO级别记录重要事件，ERROR级别记录异常
- **告警机制**: 循环时间>500ms触发性能告警，错误率>1%触发稳定性告警，内存使用>1GB触发资源告警

## 6. 性能要求

- **响应时间**: 启动延迟<100ms，yield响应<50ms，模型调用<2s，工具执行<10s
- **并发处理**: 支持单实例多工具并发，最大并发度10，支持多实例水平扩展
- **资源限制**: 内存占用<500MB，CPU使用率<50%，token消耗优化>30%

## 7. 安全考虑

- **权限控制**: 基于context.getToolPermissionContext的动态权限验证
- **数据安全**: 敏感信息过滤，输入输出安全检查，防止代码注入
- **攻击防护**: 递归深度限制，资源耗尽保护，恶意工具调用检测

## 8. 依赖关系

### 8.1 上游依赖
- **语言模型API**: 调用wu函数进行模型交互，支持多模型和fallback
- **工具执行系统**: 调用hW5工具协调器进行工具调度和执行
- **上下文压缩器**: 调用wU2函数进行智能上下文压缩
- **配置管理器**: 读取模型配置、资源配置、全局配置

### 8.2 下游调用
- **h2A消息队列**: 向消息队列发送响应和状态更新
- **UI系统**: 通过yield机制向UI发送实时更新
- **事件日志系统**: 记录执行事件、性能指标、错误信息

## 9. 测试验证

### 9.1 单元测试
- **正常流程测试**: 基本对话循环、工具调用、上下文压缩、模型fallback
- **边界条件测试**: 空消息数组、超大上下文、网络中断、权限不足
- **异常情况测试**: 模型错误、工具超时、中断信号、内存不足
- **覆盖率要求**: 代码覆盖率>95%，分支覆盖率>90%，异常路径覆盖100%

### 9.2 集成测试
- **端到端测试**: 完整对话流程、多轮工具调用、复杂任务处理
- **性能压力测试**: 长时间运行、大量并发、资源限制条件
- **故障恢复测试**: 模型服务中断、工具系统故障、网络异常恢复

## 10. AI编译器指令

- **实现语言**: TypeScript，使用async/await和generator语法，严格类型检查
- **代码风格**: 函数式编程风格，不可变数据结构，纯函数设计，async generator模式
- **第三方库**: 无外部依赖，纯原生实现，确保性能和可控性
- **部署方式**: 单实例部署，内存计算，支持水平扩展和负载均衡

## 特定实现要求

### nO主循环函数签名
```typescript
// nO函数：Claude Code的核心Agent循环引擎
async function* nO(
  messages: Message[],
  systemPrompt: string,
  modelConfig: ModelConfiguration,
  resourceConfig: ResourceConfiguration,
  globalConfig: GlobalConfiguration,
  context: AgentExecutionContext,
  compactionState?: CompactionState,
  fallbackModel?: string,
  options?: ExecutionOptions
): AsyncGenerator<AgentResponse, void, unknown> {
  
  // 发送流程启动信号
  yield { type: "stream_request_start" };
  
  let currentMessages = messages;
  let currentContext = context;
  
  // 上下文压缩检查和执行
  const {
    messages: processedMessages,
    wasCompacted
  } = await performContextCompression(messages, context);
  
  if (wasCompacted) {
    // 记录压缩事件
    recordCompressionEvent({
      originalMessageCount: messages.length,
      compactedMessageCount: processedMessages.length
    });
    
    // 更新压缩状态
    if (!compactionState?.compacted) {
      compactionState = {
        compacted: true,
        turnId: generateTurnId(),
        turnCounter: 0
      };
    }
    
    currentMessages = processedMessages;
  }
  
  let assistantMessages: AssistantMessage[] = [];
  let currentModel = context.options.mainLoopModel;
  let shouldRetry = true;
  
  try {
    // 主执行循环：模型调用重试机制
    while (shouldRetry) {
      shouldRetry = false;
      
      try {
        // 调用语言模型 - 核心wu函数
        for await (const response of callLanguageModel(
          formatMessagesForModel(currentMessages, modelConfig),
          formatSystemPrompt(systemPrompt, resourceConfig),
          context.options.maxThinkingTokens,
          context.options.tools,
          context.abortController.signal,
          {
            getToolPermissionContext: context.getToolPermissionContext,
            model: currentModel,
            prependCLISysprompt: true,
            toolChoice: undefined,
            isNonInteractiveSession: context.options.isNonInteractiveSession,
            fallbackModel: fallbackModel
          }
        )) {
          yield response;  // 实时流式输出
          
          if (response.type === "assistant") {
            assistantMessages.push(response);
          }
        }
      } catch (error) {
        // 模型fallback处理
        if (error instanceof ModelFallbackError && fallbackModel) {
          currentModel = fallbackModel;
          shouldRetry = true;
          assistantMessages.length = 0;
          context.options.mainLoopModel = fallbackModel;
          
          // 记录fallback事件
          recordFallbackEvent({
            originalModel: error.originalModel,
            fallbackModel: fallbackModel,
            entrypoint: "cli"
          });
          
          yield createInfoMessage(
            `Model fallback triggered: switching from ${error.originalModel} to ${error.fallbackModel}`,
            "info"
          );
          continue;
        }
        throw error;
      }
    }
  } catch (error) {
    // 错误处理逻辑
    logError(error instanceof Error ? error : new Error(String(error)));
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    recordErrorMetrics({
      assistantMessages: assistantMessages.length,
      toolUses: assistantMessages.flatMap(msg => 
        msg.message.content.filter(content => content.type === "tool_use")
      ).length
    });
    
    // 为每个工具调用生成错误响应
    let hasErrorResponse = false;
    for (const message of assistantMessages) {
      const toolUses = message.message.content.filter(content => content.type === "tool_use");
      for (const toolUse of toolUses) {
        yield createUserMessage({
          content: [{
            type: "tool_result",
            content: errorMessage,
            is_error: true,
            tool_use_id: toolUse.id
          }],
          toolUseResult: errorMessage
        });
        hasErrorResponse = true;
      }
    }
    
    if (!hasErrorResponse) {
      yield createSystemMessage({ toolUse: false, hardcodedMessage: undefined });
    }
    return;
  }
  
  if (!assistantMessages.length) return;
  
  // 提取工具调用
  const toolUses = assistantMessages.flatMap(msg => 
    msg.message.content.filter(content => content.type === "tool_use")
  );
  
  if (!toolUses.length) return;
  
  // 执行工具调用 - 核心hW5协调器
  const toolResults: Message[] = [];
  let preventContinuation = false;
  
  for await (const result of coordinateToolExecution(toolUses, assistantMessages, globalConfig, context)) {
    yield result;  // 实时工具执行反馈
    
    if (result && result.type === "system" && result.preventContinuation) {
      preventContinuation = true;
    }
    
    toolResults.push(...normalizeMessages([result]).filter(msg => msg.type === "user"));
  }
  
  // 检查中断信号
  if (context.abortController.signal.aborted) {
    yield createSystemMessage({ toolUse: true, hardcodedMessage: undefined });
    return;
  }
  
  if (preventContinuation) return;
  
  // 排序工具结果
  const sortedResults = toolResults.sort((a, b) => {
    const indexA = toolUses.findIndex(tool => tool.id === (a.type === "user" && a.message.content[0].id));
    const indexB = toolUses.findIndex(tool => tool.id === (b.type === "user" && b.message.content[0].id));
    return indexA - indexB;
  });
  
  // 更新压缩状态计数器
  if (compactionState?.compacted) {
    compactionState.turnCounter++;
    recordPostAutocompactTurn({
      turnId: compactionState.turnId,
      turnCounter: compactionState.turnCounter
    });
  }
  
  // 处理排队的命令
  const queuedCommands = [...context.getQueuedCommands()];
  for await (const command of processQueuedCommands(null, context, null, queuedCommands)) {
    yield command;
    toolResults.push(command);
  }
  context.removeQueuedCommands(queuedCommands);
  
  // Opus 4限制检查和fallback
  const updatedContext = checkOpus4Limit() ? {
    ...context,
    options: {
      ...context.options,
      mainLoopModel: getFallbackModel()
    }
  } : context;
  
  if (checkOpus4Limit() && getFallbackModel() !== context.options.mainLoopModel) {
    recordFallbackSystemMessage({
      mainLoopModel: context.options.mainLoopModel,
      fallbackModel: getFallbackModel()
    });
    yield createInfoMessage(
      `Claude Opus 4 limit reached, now using ${getModelDisplayName(getFallbackModel())}`,
      "warning"
    );
  }
  
  // 递归调用，继续对话循环
  yield* nO(
    [...currentMessages, ...assistantMessages, ...sortedResults],
    systemPrompt,
    modelConfig,
    resourceConfig,
    globalConfig,
    updatedContext,
    compactionState,
    fallbackModel,
    options
  );
}
```

### 上下文压缩算法实现
```typescript
// wU2上下文压缩函数实现
async function performContextCompression(
  messages: Message[],
  context: AgentExecutionContext
): Promise<CompressionResult> {
  const totalTokens = calculateTokenCount(messages);
  const threshold = getCompressionThreshold(); // 默认40000
  
  if (totalTokens < threshold) {
    return { messages, wasCompacted: false };
  }
  
  // 执行AU2压缩提示生成
  const compressionPrompt = generateCompressionPrompt(messages);
  
  // 调用压缩模型
  const compressedContent = await callCompressionModel(compressionPrompt);
  
  // 构建压缩后的消息结构
  const compressedMessages = buildCompressedMessages(messages, compressedContent);
  
  return {
    messages: compressedMessages,
    wasCompacted: true,
    compressionStats: {
      originalTokens: totalTokens,
      compressedTokens: calculateTokenCount(compressedMessages),
      compressionRatio: calculateTokenCount(compressedMessages) / totalTokens
    }
  };
}
```

### 工具执行协调器实现
```typescript
// hW5工具执行协调器实现
async function* coordinateToolExecution(
  toolUses: ToolUse[],
  assistantMessages: AssistantMessage[],
  globalConfig: GlobalConfiguration,
  context: AgentExecutionContext
): AsyncGenerator<ToolResult> {
  
  // 将工具调用按并发安全性分组 - mW5函数
  for (const { isConcurrencySafe, blocks } of groupToolsByCompatibility(toolUses, context)) {
    if (isConcurrencySafe) {
      // 并发执行安全工具 - uW5函数
      yield* executeToolsConcurrently(blocks, assistantMessages, globalConfig, context);
    } else {
      // 串行执行非安全工具 - dW5函数
      yield* executeToolsSequentially(blocks, assistantMessages, globalConfig, context);
    }
  }
}

// 并发执行实现
async function* executeToolsConcurrently(
  toolUses: ToolUse[],
  assistantMessages: AssistantMessage[],
  globalConfig: GlobalConfiguration,
  context: AgentExecutionContext
): AsyncGenerator<ToolResult> {
  
  // 使用UH1并发执行调度器
  yield* concurrentExecutor(
    toolUses.map(toolUse => executeIndividualTool(
      toolUse,
      assistantMessages.find(msg => 
        msg.message.content.some(content => 
          content.type === "tool_use" && content.id === toolUse.id
        )
      ),
      globalConfig,
      context
    )),
    MAX_CONCURRENT_TOOLS // gW5常量：10
  );
}
```

### 中断处理机制
```typescript
// 中断信号处理系统
interface InterruptHandler {
  // 检查中断信号
  checkInterruptSignal(): boolean;
  
  // 处理中断请求
  handleInterrupt(signal: InterruptSignal): Promise<void>;
  
  // 生成中断响应
  createInterruptResponse(reason?: string): InterruptResponse;
}

// 在每个yield点检查中断
function* interruptibleYield<T>(value: T, context: AgentExecutionContext): Generator<T> {
  if (context.abortController.signal.aborted) {
    throw new InterruptError("Execution interrupted by user");
  }
  yield value;
}
```

### 错误恢复策略
实现基于错误类型的智能恢复策略，包括模型fallback、工具重试、状态重置等机制，确保系统的健壮性和用户体验。