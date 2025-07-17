# use-chat Hook实现文档

## 🎯 Hook定位与职责

use-chat Hook是"文档即软件"3.0系统中负责对话状态管理的核心React Hook，封装了完整的聊天逻辑、消息流处理、以及与h2A异步消息队列的集成。基于对Claude Code对话机制的深度分析，本Hook实现了状态管理、实时消息流、历史记录管理等关键功能。

## 📋 核心功能定义

### 主要职责
1. **对话状态管理**: 管理消息历史、输入状态、流式消息等核心聊天状态
2. **消息流处理**: 处理实时消息流、流式响应、消息队列同步
3. **输入处理**: 管理用户输入、发送逻辑、输入验证和格式化
4. **历史记录管理**: 提供消息历史的存储、搜索、分页和持久化
5. **状态同步**: 与外部系统（Agent Core、工具系统）的状态同步
6. **错误处理**: 消息发送失败、连接中断等错误场景的处理

### 集成特性
- **h2A消息队列集成**: 直接与异步消息队列交互
- **Agent状态感知**: 感知Agent执行状态变化
- **工具结果处理**: 处理工具执行结果的展示和交互
- **配置响应**: 响应配置变更和系统设置

## 🔧 Hook架构设计

### 核心接口定义
```typescript
// use-chat Hook接口定义
interface UseChatHook {
  // 状态数据
  state: ChatState;
  
  // 操作方法
  actions: ChatActions;
  
  // 配置选项
  config: ChatConfig;
  
  // 事件处理
  events: ChatEventHandlers;
}

// 聊天状态定义
interface ChatState {
  // 消息数据
  messages: Message[];                 // 消息历史列表
  streamingMessage: StreamingMessage | null; // 当前流式消息
  pendingMessages: PendingMessage[];   // 待发送消息队列
  
  // 输入状态
  currentInput: string;                // 当前输入内容
  inputHistory: string[];              // 输入历史记录
  historyIndex: number;                // 历史记录索引
  
  // 交互状态
  isLoading: boolean;                  // 是否加载中
  isTyping: boolean;                   // 是否正在输入
  isSending: boolean;                  // 是否正在发送
  isConnected: boolean;                // 连接状态
  
  // 错误状态
  lastError: ChatError | null;         // 最后一个错误
  retryCount: number;                  // 重试次数
  
  // 分页状态
  pagination: {
    hasMore: boolean;                  // 是否有更多消息
    isLoadingMore: boolean;            // 是否正在加载更多
    totalCount: number;                // 消息总数
    currentPage: number;               // 当前页数
  };
  
  // 元数据
  metadata: {
    sessionId: string;                 // 会话ID
    startTime: number;                 // 会话开始时间
    lastActivity: number;              // 最后活动时间
    messageCount: number;              // 消息总数
  };
}

// 聊天操作方法
interface ChatActions {
  // 消息操作
  sendMessage: (content: string, options?: SendMessageOptions) => Promise<void>;
  resendMessage: (messageId: string) => Promise<void>;
  editMessage: (messageId: string, newContent: string) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<void>;
  
  // 输入操作
  updateInput: (content: string) => void;
  clearInput: () => void;
  insertText: (text: string, position?: number) => void;
  
  // 历史操作
  navigateHistory: (direction: 'up' | 'down') => void;
  clearHistory: () => void;
  loadMoreMessages: () => Promise<void>;
  
  // 会话操作
  startNewSession: () => Promise<void>;
  clearSession: () => Promise<void>;
  exportSession: (format: ExportFormat) => Promise<string>;
  
  // 状态操作
  retry: () => Promise<void>;
  cancel: () => void;
  reconnect: () => Promise<void>;
}
```

### Hook核心实现
```typescript
// use-chat Hook核心实现
export function useChat(options: UseChatOptions = {}): UseChatHook {
  
  // 基础状态管理
  const [state, setState] = useState<ChatState>(getInitialChatState(options));
  
  // 消息队列引用
  const messageQueueRef = useRef<h2AAsyncMessageQueue<ChatMessage>>();
  const agentRef = useRef<AgentCore>();
  
  // 流式消息处理
  const streamingRef = useRef<StreamingMessageHandler>();
  
  // 配置管理
  const config = useChatConfig(options.config);
  
  // 生命周期管理
  useEffect(() => {
    initializeChatSession();
    return cleanupChatSession;
  }, []);
  
  // 消息队列监听
  useEffect(() => {
    if (!messageQueueRef.current) return;
    
    const subscription = subscribeToMessageQueue();
    return () => subscription.unsubscribe();
  }, [messageQueueRef.current]);
  
  // 初始化聊天会话
  const initializeChatSession = useCallback(async () => {
    try {
      // 创建消息队列
      messageQueueRef.current = new h2AAsyncMessageQueue<ChatMessage>({
        cleanupCallback: handleQueueCleanup,
        maxBufferSize: config.maxBufferSize,
        enableMetrics: config.enableMetrics
      });
      
      // 初始化Agent连接
      agentRef.current = new AgentCore({
        messageQueue: messageQueueRef.current,
        config: config.agentConfig
      });
      
      // 初始化流式处理器
      streamingRef.current = new StreamingMessageHandler({
        onUpdate: handleStreamingUpdate,
        onComplete: handleStreamingComplete,
        onError: handleStreamingError
      });
      
      // 恢复会话历史
      await restoreSessionHistory();
      
      // 更新连接状态
      setState(prev => ({
        ...prev,
        isConnected: true,
        metadata: {
          ...prev.metadata,
          sessionId: generateSessionId(),
          startTime: Date.now()
        }
      }));
      
    } catch (error) {
      handleInitializationError(error);
    }
  }, [config]);
  
  // 订阅消息队列
  const subscribeToMessageQueue = useCallback(() => {
    const messageQueue = messageQueueRef.current;
    if (!messageQueue) throw new Error('Message queue not initialized');
    
    const subscription = new MessageQueueSubscription();
    
    // 处理消息队列中的消息
    (async () => {
      try {
        for await (const message of messageQueue) {
          await handleIncomingMessage(message);
        }
      } catch (error) {
        handleMessageQueueError(error);
      }
    })();
    
    return subscription;
  }, []);
  
  // 发送消息核心逻辑
  const sendMessage = useCallback(async (
    content: string,
    options: SendMessageOptions = {}
  ): Promise<void> => {
    
    if (!content.trim()) return;
    
    // 验证发送条件
    if (state.isSending) {
      throw new ChatError('MESSAGE_SEND_IN_PROGRESS', 'Another message is being sent');
    }
    
    if (!state.isConnected) {
      throw new ChatError('NOT_CONNECTED', 'Not connected to agent');
    }
    
    // 创建用户消息
    const userMessage: Message = {
      id: generateMessageId(),
      type: 'user',
      content: content,
      timestamp: Date.now(),
      sender: 'user',
      metadata: {
        inputMethod: options.inputMethod || 'keyboard',
        retryCount: 0
      }
    };
    
    try {
      // 更新发送状态
      setState(prev => ({
        ...prev,
        isSending: true,
        currentInput: '',
        messages: [...prev.messages, userMessage],
        lastError: null
      }));
      
      // 添加到输入历史
      addToInputHistory(content);
      
      // 发送到消息队列
      const messageQueue = messageQueueRef.current;
      if (!messageQueue) {
        throw new ChatError('QUEUE_NOT_AVAILABLE', 'Message queue not available');
      }
      
      messageQueue.enqueue(userMessage);
      
      // 处理Agent响应
      await processAgentResponse(userMessage);
      
    } catch (error) {
      await handleSendError(error, userMessage);
    } finally {
      setState(prev => ({ ...prev, isSending: false }));
    }
  }, [state.isSending, state.isConnected]);
  
  // 处理Agent响应
  const processAgentResponse = useCallback(async (userMessage: Message): Promise<void> => {
    const agent = agentRef.current;
    if (!agent) throw new Error('Agent not initialized');
    
    try {
      // 启动Agent处理
      const responseGenerator = agent.processMessage(userMessage);
      
      // 处理流式响应
      for await (const response of responseGenerator) {
        await handleAgentResponse(response);
      }
      
    } catch (error) {
      throw new ChatError('AGENT_PROCESSING_ERROR', `Agent processing failed: ${error.message}`);
    }
  }, []);
  
  // 处理Agent响应
  const handleAgentResponse = useCallback(async (response: AgentResponse): Promise<void> => {
    switch (response.type) {
      case 'stream_request_start':
        handleStreamStart();
        break;
        
      case 'assistant':
        await handleAssistantMessage(response);
        break;
        
      case 'tool_result':
        await handleToolResult(response);
        break;
        
      case 'system':
        await handleSystemMessage(response);
        break;
        
      case 'error':
        await handleErrorResponse(response);
        break;
        
      default:
        console.warn('Unknown response type:', response.type);
    }
  }, []);
  
  // 处理流式消息更新
  const handleStreamingUpdate = useCallback((update: StreamingUpdate) => {
    setState(prev => {
      const currentStreaming = prev.streamingMessage;
      
      if (!currentStreaming) {
        // 创建新的流式消息
        return {
          ...prev,
          streamingMessage: {
            id: generateMessageId(),
            type: 'assistant',
            content: update.content,
            timestamp: Date.now(),
            isComplete: false,
            chunks: [update]
          }
        };
      }
      
      // 更新现有流式消息
      return {
        ...prev,
        streamingMessage: {
          ...currentStreaming,
          content: currentStreaming.content + update.content,
          chunks: [...currentStreaming.chunks, update]
        }
      };
    });
  }, []);
  
  // 处理流式消息完成
  const handleStreamingComplete = useCallback((finalMessage: Message) => {
    setState(prev => {
      const messages = [...prev.messages];
      
      // 如果有流式消息，替换为最终消息
      if (prev.streamingMessage) {
        messages.push({
          ...finalMessage,
          id: prev.streamingMessage.id
        });
      }
      
      return {
        ...prev,
        messages,
        streamingMessage: null,
        isLoading: false,
        metadata: {
          ...prev.metadata,
          messageCount: messages.length,
          lastActivity: Date.now()
        }
      };
    });
    
    // 保存到历史记录
    saveMessageToHistory(finalMessage);
  }, []);
  
  // 输入历史管理
  const addToInputHistory = useCallback((input: string) => {
    setState(prev => {
      const newHistory = [...prev.inputHistory];
      
      // 避免重复
      if (newHistory[newHistory.length - 1] !== input) {
        newHistory.push(input);
        
        // 限制历史长度
        if (newHistory.length > config.maxInputHistory) {
          newHistory.shift();
        }
      }
      
      return {
        ...prev,
        inputHistory: newHistory,
        historyIndex: -1 // 重置索引
      };
    });
  }, [config.maxInputHistory]);
  
  // 导航输入历史
  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setState(prev => {
      const { inputHistory, historyIndex } = prev;
      
      if (inputHistory.length === 0) return prev;
      
      let newIndex = historyIndex;
      
      if (direction === 'up') {
        if (newIndex === -1) {
          newIndex = inputHistory.length - 1;
        } else if (newIndex > 0) {
          newIndex--;
        }
      } else {
        if (newIndex === -1) {
          return prev; // 已经在最新位置
        } else if (newIndex < inputHistory.length - 1) {
          newIndex++;
        } else {
          newIndex = -1; // 回到最新位置
        }
      }
      
      const newInput = newIndex === -1 ? '' : inputHistory[newIndex];
      
      return {
        ...prev,
        currentInput: newInput,
        historyIndex: newIndex
      };
    });
  }, []);
  
  // 加载更多消息
  const loadMoreMessages = useCallback(async (): Promise<void> => {
    if (state.pagination.isLoadingMore || !state.pagination.hasMore) {
      return;
    }
    
    setState(prev => ({
      ...prev,
      pagination: { ...prev.pagination, isLoadingMore: true }
    }));
    
    try {
      const olderMessages = await loadMessagesFromHistory({
        before: state.messages[0]?.timestamp,
        limit: config.pageSize
      });
      
      setState(prev => ({
        ...prev,
        messages: [...olderMessages, ...prev.messages],
        pagination: {
          ...prev.pagination,
          isLoadingMore: false,
          hasMore: olderMessages.length === config.pageSize,
          currentPage: prev.pagination.currentPage + 1
        }
      }));
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        pagination: { ...prev.pagination, isLoadingMore: false },
        lastError: new ChatError('LOAD_MORE_FAILED', `Failed to load more messages: ${error.message}`)
      }));
    }
  }, [state.pagination, state.messages, config.pageSize]);
}
```

### 流式消息处理
```typescript
// 流式消息处理器
class StreamingMessageHandler {
  private currentMessage: StreamingMessage | null = null;
  private buffer: string = '';
  private options: StreamingOptions;
  
  constructor(options: StreamingOptions) {
    this.options = options;
  }
  
  // 处理流式数据块
  handleChunk(chunk: StreamingChunk): void {
    try {
      // 缓冲区管理
      this.buffer += chunk.content;
      
      // 检查是否有完整的数据单元
      const processedContent = this.processBuffer();
      
      if (processedContent) {
        this.updateCurrentMessage(processedContent, chunk);
      }
      
    } catch (error) {
      this.options.onError?.(error);
    }
  }
  
  // 处理缓冲区内容
  private processBuffer(): string | null {
    // 检查缓冲区大小限制
    if (this.buffer.length > this.options.maxBufferSize) {
      const processedContent = this.buffer.substring(0, this.options.maxBufferSize);
      this.buffer = this.buffer.substring(this.options.maxBufferSize);
      return processedContent;
    }
    
    // 检查是否有完整的语义单元（如句子、段落）
    const semanticBreak = this.findSemanticBreak(this.buffer);
    if (semanticBreak > -1) {
      const processedContent = this.buffer.substring(0, semanticBreak + 1);
      this.buffer = this.buffer.substring(semanticBreak + 1);
      return processedContent;
    }
    
    // 如果缓冲区达到阈值，部分输出
    if (this.buffer.length > this.options.flushThreshold) {
      const processedContent = this.buffer;
      this.buffer = '';
      return processedContent;
    }
    
    return null;
  }
  
  // 查找语义断点
  private findSemanticBreak(text: string): number {
    // 句号、问号、感叹号
    const sentenceEnd = /[.!?]\s/.exec(text);
    if (sentenceEnd) {
      return sentenceEnd.index + sentenceEnd[0].length - 1;
    }
    
    // 换行符
    const lineBreak = text.lastIndexOf('\n');
    if (lineBreak > -1 && lineBreak < text.length - 1) {
      return lineBreak;
    }
    
    // 逗号或分号
    const clauseEnd = /[,;]\s/.exec(text);
    if (clauseEnd && clauseEnd.index > text.length * 0.7) {
      return clauseEnd.index + clauseEnd[0].length - 1;
    }
    
    return -1;
  }
  
  // 更新当前消息
  private updateCurrentMessage(content: string, chunk: StreamingChunk): void {
    if (!this.currentMessage) {
      this.currentMessage = {
        id: generateMessageId(),
        type: 'assistant',
        content: content,
        timestamp: Date.now(),
        isComplete: false,
        chunks: [chunk],
        metadata: {
          streamingStartTime: Date.now(),
          totalChunks: 1
        }
      };
    } else {
      this.currentMessage.content += content;
      this.currentMessage.chunks.push(chunk);
      this.currentMessage.metadata.totalChunks++;
    }
    
    // 触发更新回调
    this.options.onUpdate?.(this.currentMessage);
  }
  
  // 完成流式消息
  complete(): Message | null {
    if (!this.currentMessage) return null;
    
    // 处理剩余缓冲区内容
    if (this.buffer) {
      this.currentMessage.content += this.buffer;
      this.buffer = '';
    }
    
    // 标记为完成
    const finalMessage: Message = {
      ...this.currentMessage,
      isComplete: true,
      metadata: {
        ...this.currentMessage.metadata,
        streamingEndTime: Date.now(),
        streamingDuration: Date.now() - this.currentMessage.metadata.streamingStartTime
      }
    };
    
    // 清理当前消息
    this.currentMessage = null;
    
    // 触发完成回调
    this.options.onComplete?.(finalMessage);
    
    return finalMessage;
  }
}
```

### 持久化与缓存
```typescript
// 聊天历史持久化管理器
class ChatHistoryManager {
  private storage: ChatStorage;
  private cache: Map<string, Message[]> = new Map();
  private compressionEnabled: boolean = true;
  
  constructor(storage: ChatStorage) {
    this.storage = storage;
  }
  
  // 保存消息到历史
  async saveMessage(message: Message): Promise<void> {
    try {
      // 保存到存储
      await this.storage.saveMessage(message);
      
      // 更新缓存
      this.updateCache(message);
      
      // 定期压缩历史
      if (this.compressionEnabled) {
        await this.scheduleCompression();
      }
      
    } catch (error) {
      console.error('Failed to save message:', error);
      throw new ChatError('SAVE_FAILED', `Failed to save message: ${error.message}`);
    }
  }
  
  // 加载历史消息
  async loadMessages(options: LoadMessagesOptions): Promise<Message[]> {
    const cacheKey = this.buildCacheKey(options);
    
    // 检查缓存
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      return this.applyOptions(cached, options);
    }
    
    try {
      // 从存储加载
      const messages = await this.storage.loadMessages(options);
      
      // 缓存结果
      this.cache.set(cacheKey, messages);
      
      return messages;
      
    } catch (error) {
      console.error('Failed to load messages:', error);
      throw new ChatError('LOAD_FAILED', `Failed to load messages: ${error.message}`);
    }
  }
  
  // 搜索消息
  async searchMessages(query: SearchQuery): Promise<SearchResult[]> {
    try {
      // 构建搜索索引（如果需要）
      await this.ensureSearchIndex();
      
      // 执行搜索
      const results = await this.storage.searchMessages(query);
      
      // 添加搜索结果元数据
      return results.map(result => ({
        ...result,
        searchMetadata: {
          query: query.text,
          searchTime: Date.now(),
          relevanceScore: this.calculateRelevanceScore(result, query)
        }
      }));
      
    } catch (error) {
      console.error('Failed to search messages:', error);
      throw new ChatError('SEARCH_FAILED', `Search failed: ${error.message}`);
    }
  }
  
  // 导出会话
  async exportSession(sessionId: string, format: ExportFormat): Promise<string> {
    try {
      const messages = await this.loadMessages({ sessionId });
      
      switch (format) {
        case 'json':
          return this.exportAsJSON(messages);
        case 'markdown':
          return this.exportAsMarkdown(messages);
        case 'html':
          return this.exportAsHTML(messages);
        case 'txt':
          return this.exportAsText(messages);
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
      
    } catch (error) {
      throw new ChatError('EXPORT_FAILED', `Export failed: ${error.message}`);
    }
  }
  
  // 导出为Markdown格式
  private exportAsMarkdown(messages: Message[]): string {
    const sections: string[] = [];
    
    // 添加会话信息
    sections.push('# Chat Session Export');
    sections.push(`Export Date: ${new Date().toISOString()}`);
    sections.push(`Total Messages: ${messages.length}`);
    sections.push('---\n');
    
    // 处理每条消息
    for (const message of messages) {
      sections.push(this.formatMessageAsMarkdown(message));
      sections.push(''); // 空行分隔
    }
    
    return sections.join('\n');
  }
  
  // 格式化消息为Markdown
  private formatMessageAsMarkdown(message: Message): string {
    const timestamp = new Date(message.timestamp).toLocaleString();
    const sender = message.sender || message.type;
    
    let content = '';
    content += `## ${sender} (${timestamp})\n\n`;
    
    if (typeof message.content === 'string') {
      content += message.content;
    } else if (Array.isArray(message.content)) {
      content += message.content
        .map(block => this.formatContentBlockAsMarkdown(block))
        .join('\n\n');
    }
    
    return content;
  }
}
```

## 🔌 Hook集成接口

### 与其他Hook的协作
```typescript
// Hook集成管理器
interface ChatHookIntegrations {
  // 与Agent Hook集成
  agentIntegration: {
    useAgent: () => AgentHookReturn;
    onAgentStateChange: (state: AgentState) => void;
    getAgentCapabilities: () => AgentCapabilities;
  };
  
  // 与工具Hook集成
  toolsIntegration: {
    useTools: () => ToolsHookReturn;
    onToolResult: (result: ToolResult) => void;
    getToolPermissions: () => ToolPermissions;
  };
  
  // 与配置Hook集成
  configIntegration: {
    useConfig: () => ConfigHookReturn;
    onConfigChange: (config: ChatConfig) => void;
    validateChatConfig: (config: Partial<ChatConfig>) => ValidationResult;
  };
}

// Hook组合示例
function useChatWithIntegrations(options: UseChatOptions) {
  // 核心聊天Hook
  const chat = useChat(options);
  
  // 集成其他Hooks
  const agent = useAgent();
  const tools = useTools();
  const config = useConfig();
  
  // 状态同步
  useEffect(() => {
    // 同步Agent状态到聊天状态
    if (agent.state.isExecuting !== chat.state.isLoading) {
      // 更新聊天加载状态
    }
  }, [agent.state.isExecuting]);
  
  // 工具结果处理
  useEffect(() => {
    // 监听工具执行结果
    const subscription = tools.events.onResult(result => {
      chat.actions.handleToolResult(result);
    });
    
    return () => subscription.unsubscribe();
  }, [tools.events, chat.actions]);
  
  return {
    chat,
    agent,
    tools,
    config,
    // 组合的便利方法
    sendMessageWithTools: async (message: string) => {
      const toolsRequired = await tools.analyzeMessage(message);
      return chat.actions.sendMessage(message, { toolsRequired });
    }
  };
}
```

---

*use-chat Hook体现了"文档即软件"3.0在状态管理设计上的精密性：通过详细的自然语言描述，完整定义了一个功能全面、性能优化、集成度高的React Hook。从消息流处理到历史管理，从流式渲染到持久化存储，每个技术细节都以标准化的文档形式呈现，为AI编译器提供了准确的实现指导。*