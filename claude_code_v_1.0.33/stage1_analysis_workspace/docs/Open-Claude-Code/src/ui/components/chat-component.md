# 主对话界面组件 - 自然语言实现规范

## 1. 模块概述

- **功能定位**: 实现Claude Code的主对话界面组件，提供实时Steering交互、多Agent状态展示和流式消息处理
- **核心职责**: 渲染终端对话界面、处理用户输入、展示AI响应、实时状态同步和Steering事件处理
- **设计目标**: 实现60fps流畅渲染、<50ms交互响应、完整的可访问性支持和极致的终端用户体验

## 2. 接口定义

### 2.1 输入接口
- **messages**: Message[], 对话消息历史数组, 必填, 支持user/assistant/system/tool_result等类型
- **onUserInput**: (input: string) => void, 用户输入处理回调, 必填, 处理用户文本输入
- **onInterrupt**: () => void, 中断处理回调, 必填, 处理Ctrl+C等中断信号
- **onSteeringEvent**: (event: SteeringEvent) => void, Steering事件处理回调, 必填, 处理实时引导
- **isProcessing**: boolean, Agent处理状态标志, 必填, 控制输入禁用和状态显示
- **currentMode**: InteractionMode, 当前交互模式, 可选, 默认"chat", 支持chat/plan/multi-agent
- **agentStates**: AgentState[], 多Agent状态数组, 可选, 默认空数组

### 2.2 输出接口
- **正常返回**: React.ReactElement, Ink终端组件, 支持实时更新和事件处理
- **异常返回**: 组件错误边界处理, 错误码7001-7050, 包含渲染失败、状态同步错误
- **性能指标**: 渲染帧率>50fps, 输入延迟<50ms, 内存占用<50MB, CPU使用率<10%

## 3. 核心逻辑

### 3.1 主要处理流程
1. **组件初始化**: 设置初始状态、注册事件监听器、建立数据绑定、配置渲染优化
2. **消息渲染**: 虚拟滚动实现、消息类型识别、格式化显示、语法高亮
3. **输入处理**: 键盘事件捕获、输入验证、命令解析、自动补全
4. **状态同步**: Agent状态订阅、实时更新传播、冲突解决、错误处理
5. **Steering交互**: 中断信号处理、实时引导、模式切换、紧急停止
6. **性能优化**: 组件懒加载、渲染批处理、内存管理、事件防抖

### 3.2 关键算法
- **虚拟滚动算法**: 基于消息位置的智能渲染，只渲染可见区域+缓冲区，内存使用恒定
- **实时状态同步**: 基于React hooks的响应式状态管理，支持原子更新和批处理
- **Steering事件优先级**: 中断>引导>状态更新>渲染，确保关键交互的实时响应

## 4. 状态管理

### 4.1 内部状态
- **messageHistory**: Message[], 消息历史记录, 初始值props.messages
- **inputValue**: string, 当前输入内容, 初始值空字符串
- **scrollPosition**: number, 滚动位置, 初始值最底部
- **selectedAgent**: string, 选中的Agent ID, 初始值null
- **steeringState**: SteeringState, Steering交互状态, 初始值inactive

### 4.2 持久化
- **存储方式**: 内存状态为主，关键状态通过URL state和localStorage持久化
- **缓存策略**: 消息内容压缩存储，滚动位置会话级持久化，输入历史本地存储
- **数据一致性**: 通过React严格模式和state reducer确保一致性

## 5. 异常处理

### 5.1 异常分类
- **渲染错误**: 错误码7001-7010, 组件渲染失败、JSX错误、内存不足
- **状态同步错误**: 错误码7011-7020, 消息更新失败、Agent状态丢失、数据格式错误
- **输入处理错误**: 错误码7021-7030, 键盘事件失败、命令解析错误、验证失败
- **Steering错误**: 错误码7031-7040, 中断失败、引导超时、模式切换错误

### 5.2 监控日志
- **关键监控点**: 渲染FPS(>50), 输入响应时间(<50ms), 内存使用量(<50MB), 错误边界触发次数
- **日志记录**: DEBUG级别记录组件生命周期，INFO级别记录用户交互，ERROR级别记录异常
- **告警机制**: 渲染FPS<30触发性能告警，内存使用>100MB触发资源告警

## 6. 性能要求

- **响应时间**: 用户输入响应<50ms，消息渲染<100ms，滚动操作<16ms，模式切换<200ms
- **并发处理**: 支持多Agent并行状态显示，最大20个Agent，实时状态更新
- **资源限制**: 内存占用<50MB，CPU使用率<10%，DOM节点<1000个

## 7. 安全考虑

- **权限控制**: 输入内容验证，防止恶意命令注入
- **数据安全**: 敏感消息内容过滤，XSS防护，CSP策略
- **攻击防护**: 输入频率限制，内容长度限制，事件监听器安全绑定

## 8. 依赖关系

### 8.1 上游依赖
- **Agent引擎**: 订阅消息更新、Agent状态变更、工具执行进度
- **消息队列**: 接收实时消息、状态变更通知、Steering事件
- **状态管理**: 全局UI状态、用户偏好、会话状态

### 8.2 下游调用
- **终端渲染**: 输出格式化文本、ANSI颜色代码、光标控制
- **输入捕获**: 键盘事件、快捷键、特殊按键组合
- **剪贴板**: 复制消息内容、粘贴操作、文件拖拽

## 9. 测试验证

### 9.1 单元测试
- **组件渲染测试**: 快照测试、属性传递、事件触发、状态变更
- **交互测试**: 用户输入模拟、键盘事件、滚动操作、模式切换
- **错误处理测试**: 错误边界、异常恢复、降级渲染、状态重置
- **覆盖率要求**: 组件覆盖率>95%，交互逻辑覆盖率>90%，错误路径覆盖100%

### 9.2 集成测试
- **端到端测试**: 完整对话流程、多Agent协作、Steering交互
- **性能测试**: 大量消息渲染、长时间运行、内存泄漏检测
- **可访问性测试**: 键盘导航、屏幕阅读器、色彩对比度

## 10. AI编译器指令

- **实现语言**: TypeScript + React + Ink，使用函数式组件和现代React特性
- **代码风格**: 函数式组件，自定义hooks，memoization优化，严格类型约束
- **第三方库**: ink(终端UI)、react(组件框架)、chalk(颜色)、use-stdin(输入处理)
- **部署方式**: 终端应用打包，跨平台兼容，字体和颜色适配

## 特定实现要求

### 主对话组件架构
```typescript
// ChatComponent主组件实现
interface ChatComponentProps {
  messages: Message[];
  onUserInput: (input: string) => void;
  onInterrupt: () => void;
  onSteeringEvent: (event: SteeringEvent) => void;
  isProcessing: boolean;
  currentMode?: InteractionMode;
  agentStates?: AgentState[];
  configuration?: UIConfiguration;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  messages,
  onUserInput,
  onInterrupt,
  onSteeringEvent,
  isProcessing,
  currentMode = 'chat',
  agentStates = [],
  configuration
}) => {
  // === 状态管理 ===
  const [inputValue, setInputValue] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [steeringState, setSteeringState] = useSteeringState();
  
  // === 性能优化 ===
  const memoizedMessages = useMemo(() => 
    messages.slice(-MAX_VISIBLE_MESSAGES), [messages]
  );
  
  const visibleMessages = useVirtualScroll(
    memoizedMessages,
    scrollPosition,
    VIEWPORT_HEIGHT
  );
  
  // === 事件处理 ===
  const handleUserInput = useCallback((input: string) => {
    if (!isProcessing && input.trim()) {
      onUserInput(input);
      setInputValue('');
      // 滚动到底部
      setScrollPosition(messages.length);
    }
  }, [isProcessing, onUserInput, messages.length]);
  
  const handleKeyPress = useCallback((input: string, key: Key) => {
    if (key.ctrl && key.c) {
      // Ctrl+C 中断
      onInterrupt();
      setSteeringState(prev => ({ ...prev, lastInterrupt: Date.now() }));
    } else if (key.return) {
      // Enter 发送消息
      handleUserInput(inputValue);
    } else if (key.upArrow || key.downArrow) {
      // 上下箭头滚动
      handleScrollNavigation(key.upArrow ? -1 : 1);
    } else if (key.tab) {
      // Tab 自动补全
      handleAutoComplete();
    }
  }, [inputValue, handleUserInput, onInterrupt]);
  
  // 注册键盘事件
  useInput(handleKeyPress);
  
  // === Steering交互处理 ===
  const handleSteeringInterrupt = useCallback(async () => {
    const steeringEvent: SteeringEvent = {
      type: 'interrupt',
      payload: { reason: 'user_request', timestamp: Date.now() },
      priority: 'urgent',
      source: 'chat_interface'
    };
    
    onSteeringEvent(steeringEvent);
    
    // 更新UI状态
    setSteeringState(prev => ({
      ...prev,
      activeInterrupt: true,
      lastAction: 'interrupt'
    }));
  }, [onSteeringEvent]);
  
  const handleSteeringGuidance = useCallback(async (guidance: string) => {
    const steeringEvent: SteeringEvent = {
      type: 'guidance',
      payload: { guidance, priority: 'high', timestamp: Date.now() },
      priority: 'high',
      source: 'chat_interface'
    };
    
    onSteeringEvent(steeringEvent);
    
    // 显示引导反馈
    setSteeringState(prev => ({
      ...prev,
      activeGuidance: guidance,
      guidanceTimestamp: Date.now()
    }));
  }, [onSteeringEvent]);
  
  // === 自动滚动效果 ===
  useEffect(() => {
    if (messages.length > 0) {
      // 有新消息时自动滚动到底部
      setScrollPosition(messages.length - 1);
    }
  }, [messages.length]);
  
  // === 渲染优化 ===
  const renderMessage = useCallback((message: Message, index: number) => {
    const isVisible = index >= scrollPosition - BUFFER_SIZE && 
                     index <= scrollPosition + BUFFER_SIZE;
    
    if (!isVisible) {
      return <Box key={message.id} height={1} />; // 占位符
    }
    
    return (
      <MessageBubble
        key={message.id}
        message={message}
        index={index}
        isSelected={false}
        onSelect={() => {}} // 预留选择功能
      />
    );
  }, [scrollPosition]);
  
  // === 主渲染结构 ===
  return (
    <Box flexDirection="column" height="100%">
      {/* 标题栏 */}
      <Box borderStyle="single" borderColor="blue" paddingX={1}>
        <Text bold color="blue">
          Claude Code - {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} Mode
        </Text>
        {isProcessing && (
          <Text color="yellow" dimColor>
            {' '} ● Processing...
          </Text>
        )}
        {agentStates.length > 0 && (
          <Text color="green" dimColor>
            {' '} [{agentStates.length} agents active]
          </Text>
        )}
      </Box>
      
      {/* 消息显示区域 */}
      <Box flexDirection="column" flexGrow={1} overflow="hidden">
        <ScrollableMessageList
          messages={visibleMessages}
          scrollPosition={scrollPosition}
          onScroll={setScrollPosition}
          renderMessage={renderMessage}
        />
      </Box>
      
      {/* Steering状态指示器 */}
      {steeringState.activeGuidance && (
        <Box borderStyle="single" borderColor="yellow" paddingX={1}>
          <Text color="yellow">
            💡 Guidance: {steeringState.activeGuidance}
          </Text>
        </Box>
      )}
      
      {/* Agent状态栏（多Agent模式） */}
      {currentMode === 'multi-agent' && agentStates.length > 0 && (
        <AgentStatusBar
          agents={agentStates}
          selectedAgent={selectedAgent}
          onAgentSelect={setSelectedAgent}
        />
      )}
      
      {/* 输入区域 */}
      <Box borderStyle="single" borderColor={isProcessing ? "gray" : "green"}>
        <TextInput
          value={inputValue}
          placeholder={
            isProcessing 
              ? "Agent is processing... (Ctrl+C to interrupt)"
              : "Type your message... (Tab for autocomplete)"
          }
          onChange={setInputValue}
          onSubmit={handleUserInput}
          disabled={isProcessing}
        />
      </Box>
      
      {/* 底部状态栏 */}
      <StatusBar
        currentMode={currentMode}
        isProcessing={isProcessing}
        messageCount={messages.length}
        steeringState={steeringState}
      />
    </Box>
  );
};
```

### 消息渲染组件
```typescript
// MessageBubble组件实现
interface MessageBubbleProps {
  message: Message;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({
  message,
  index,
  isSelected,
  onSelect
}) => {
  const renderContent = useCallback(() => {
    switch (message.type) {
      case 'user':
        return (
          <Box borderStyle="round" borderColor="blue" paddingX={1}>
            <Text color="blue" bold>You: </Text>
            <Text>{message.content}</Text>
          </Box>
        );
        
      case 'assistant':
        return (
          <Box borderStyle="round" borderColor="green" paddingX={1}>
            <Text color="green" bold>Claude: </Text>
            <Text>{formatAssistantMessage(message.content)}</Text>
          </Box>
        );
        
      case 'tool_result':
        return (
          <ToolResultDisplay
            toolName={message.toolName}
            result={message.result}
            isError={message.isError}
          />
        );
        
      case 'system':
        return (
          <Box paddingX={1}>
            <Text color="gray" dimColor italic>
              {message.content}
            </Text>
          </Box>
        );
        
      default:
        return (
          <Box paddingX={1}>
            <Text color="red">
              Unknown message type: {message.type}
            </Text>
          </Box>
        );
    }
  }, [message]);
  
  return (
    <Box
      marginY={0}
      onClick={onSelect}
      backgroundColor={isSelected ? "gray" : undefined}
    >
      {renderContent()}
    </Box>
  );
});
```

### 虚拟滚动实现
```typescript
// 虚拟滚动Hook
function useVirtualScroll(
  items: any[],
  scrollPosition: number,
  viewportHeight: number
) {
  return useMemo(() => {
    const bufferSize = Math.floor(viewportHeight / 2);
    const startIndex = Math.max(0, scrollPosition - bufferSize);
    const endIndex = Math.min(items.length, scrollPosition + viewportHeight + bufferSize);
    
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      virtualIndex: startIndex + index
    }));
  }, [items, scrollPosition, viewportHeight]);
}

// 滚动消息列表组件
interface ScrollableMessageListProps {
  messages: Message[];
  scrollPosition: number;
  onScroll: (position: number) => void;
  renderMessage: (message: Message, index: number) => React.ReactNode;
}

const ScrollableMessageList: React.FC<ScrollableMessageListProps> = ({
  messages,
  scrollPosition,
  onScroll,
  renderMessage
}) => {
  const [terminalHeight, setTerminalHeight] = useState(20);
  
  // 获取终端高度
  useEffect(() => {
    const updateHeight = () => {
      setTerminalHeight(process.stdout.rows || 20);
    };
    
    process.stdout.on('resize', updateHeight);
    updateHeight();
    
    return () => {
      process.stdout.off('resize', updateHeight);
    };
  }, []);
  
  // 计算可见区域
  const visibleMessages = useVirtualScroll(
    messages,
    scrollPosition,
    terminalHeight - 5 // 减去标题、输入框等区域
  );
  
  // 滚动处理
  const handleScroll = useCallback((direction: number) => {
    const newPosition = Math.max(
      0,
      Math.min(messages.length - 1, scrollPosition + direction)
    );
    onScroll(newPosition);
  }, [scrollPosition, messages.length, onScroll]);
  
  // 键盘滚动
  useInput(useCallback((input, key) => {
    if (key.pageUp) {
      handleScroll(-10);
    } else if (key.pageDown) {
      handleScroll(10);
    }
  }, [handleScroll]));
  
  return (
    <Box flexDirection="column" overflow="hidden">
      {visibleMessages.map((message, index) => 
        renderMessage(message, message.virtualIndex)
      )}
      
      {/* 滚动指示器 */}
      {messages.length > terminalHeight - 5 && (
        <Box justifyContent="center">
          <Text color="gray" dimColor>
            ↑↓ Scroll • Page Up/Down • {scrollPosition + 1}/{messages.length}
          </Text>
        </Box>
      )}
    </Box>
  );
};
```

### Agent状态栏组件
```typescript
// Agent状态栏组件
interface AgentStatusBarProps {
  agents: AgentState[];
  selectedAgent: string | null;
  onAgentSelect: (agentId: string) => void;
}

const AgentStatusBar: React.FC<AgentStatusBarProps> = ({
  agents,
  selectedAgent,
  onAgentSelect
}) => {
  const getStatusColor = useCallback((status: AgentStatus) => {
    const colors = {
      'running': 'green',
      'waiting': 'yellow',
      'completed': 'blue',
      'failed': 'red',
      'aborted': 'gray'
    };
    return colors[status] || 'white';
  }, []);
  
  const getStatusSymbol = useCallback((status: AgentStatus) => {
    const symbols = {
      'running': '●',
      'waiting': '◐',
      'completed': '✓',
      'failed': '✗',
      'aborted': '◯'
    };
    return symbols[status] || '?';
  }, []);
  
  return (
    <Box borderStyle="single" borderColor="cyan" paddingX={1}>
      <Text color="cyan" bold>Agents: </Text>
      {agents.map((agent, index) => (
        <Box key={agent.id} marginRight={2}>
          <Text
            color={getStatusColor(agent.status)}
            backgroundColor={selectedAgent === agent.id ? "gray" : undefined}
            bold={selectedAgent === agent.id}
          >
            {getStatusSymbol(agent.status)} Agent {index + 1}
          </Text>
          <Text color="gray" dimColor>
            {' '}({agent.toolCallCount} tools, {agent.tokenUsage} tokens)
          </Text>
        </Box>
      ))}
    </Box>
  );
};
```

### Steering状态管理
```typescript
// Steering状态Hook
interface SteeringState {
  activeInterrupt: boolean;
  activeGuidance: string | null;
  guidanceTimestamp: number;
  lastAction: 'interrupt' | 'guidance' | 'mode_switch' | null;
  actionHistory: SteeringAction[];
}

function useSteeringState() {
  const [state, setState] = useState<SteeringState>({
    activeInterrupt: false,
    activeGuidance: null,
    guidanceTimestamp: 0,
    lastAction: null,
    actionHistory: []
  });
  
  const addAction = useCallback((action: SteeringAction) => {
    setState(prev => ({
      ...prev,
      lastAction: action.type,
      actionHistory: [...prev.actionHistory.slice(-9), action] // 保留最近10个动作
    }));
  }, []);
  
  const clearGuidance = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeGuidance: null,
      guidanceTimestamp: 0
    }));
  }, []);
  
  const resetSteering = useCallback(() => {
    setState({
      activeInterrupt: false,
      activeGuidance: null,
      guidanceTimestamp: 0,
      lastAction: null,
      actionHistory: []
    });
  }, []);
  
  // 自动清理过期的引导信息
  useEffect(() => {
    if (state.activeGuidance && Date.now() - state.guidanceTimestamp > 5000) {
      clearGuidance();
    }
  }, [state.activeGuidance, state.guidanceTimestamp, clearGuidance]);
  
  return [state, setState, { addAction, clearGuidance, resetSteering }] as const;
}
```

### 性能优化策略
实现智能的虚拟滚动、消息内容压缩、渲染批处理和内存管理，确保在大量消息和长时间运行情况下保持流畅的用户体验。