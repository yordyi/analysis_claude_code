# use-agent Hook实现文档

## 🎯 Hook定位与职责

use-agent Hook是"文档即软件"3.0系统中负责Agent状态管理的核心React Hook，封装了完整的Agent生命周期、执行状态监控、以及与nO主循环的深度集成。基于对Claude Code Agent机制的深度分析，本Hook实现了状态感知、能力查询、配置管理等关键功能。

## 📋 核心功能定义

### 主要职责
1. **Agent状态管理**: 管理Agent的执行状态、生命周期状态、连接状态等核心状态
2. **执行监控**: 实时监控Agent执行进度、工具调用状态、性能指标
3. **能力查询**: 提供Agent能力查询、工具列表获取、配置选项管理
4. **错误处理**: 处理Agent执行错误、连接异常、恢复机制
5. **配置管理**: 管理Agent配置、模型选择、执行选项
6. **事件系统**: 提供Agent事件的订阅、发布、处理机制

### 集成特性
- **nO主循环集成**: 直接与Agent核心引擎交互
- **工具系统协调**: 监控和管理工具执行状态
- **配置热更新**: 支持配置的实时更新和生效
- **性能监控**: 实时性能指标收集和分析

## 🔧 Hook架构设计

### 核心接口定义
```typescript
// use-agent Hook接口定义
interface UseAgentHook {
  // 状态数据
  state: AgentState;
  
  // 操作方法
  actions: AgentActions;
  
  // 能力查询
  capabilities: AgentCapabilities;
  
  // 事件处理
  events: AgentEventHandlers;
  
  // 配置管理
  config: AgentConfigManager;
}

// Agent状态定义
interface AgentState {
  // 基础状态
  status: AgentStatus;                 // Agent当前状态
  isInitialized: boolean;              // 是否已初始化
  isConnected: boolean;                // 是否已连接
  isExecuting: boolean;                // 是否正在执行
  
  // 执行状态
  executionState: {
    currentTask: ExecutionTask | null; // 当前任务
    executionId: string | null;        // 执行ID
    startTime: number | null;          // 开始时间
    progress: ExecutionProgress;       // 执行进度
    stage: ExecutionStage;             // 执行阶段
  };
  
  // 工具状态
  toolState: {
    activeTools: ActiveTool[];         // 活跃工具
    pendingCalls: ToolCall[];          // 待执行调用
    completedCalls: CompletedCall[];   // 已完成调用
    failedCalls: FailedCall[];         // 失败调用
  };
  
  // 模型状态
  modelState: {
    currentModel: string;              // 当前模型
    fallbackModel: string | null;     // 降级模型
    modelLoadTime: number | null;     // 模型加载时间
    lastFallback: number | null;      // 最后降级时间
  };
  
  // 性能指标
  performance: {
    executionTime: number;             // 执行时间
    memoryUsage: number;               // 内存使用
    tokenUsage: TokenUsage;            // Token使用情况
    apiCalls: ApiCallMetrics;          // API调用指标
  };
  
  // 错误状态
  errors: {
    lastError: AgentError | null;      // 最后一个错误
    errorHistory: AgentError[];        // 错误历史
    retryCount: number;                // 重试次数
    isRecovering: boolean;             // 是否正在恢复
  };
  
  // 连接状态
  connection: {
    connectionId: string | null;       // 连接ID
    lastHeartbeat: number | null;      // 最后心跳时间
    latency: number | null;            // 连接延迟
    reconnectCount: number;            // 重连次数
  };
}

// Agent操作方法
interface AgentActions {
  // 生命周期操作
  initialize: (config?: AgentConfig) => Promise<void>;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  restart: () => Promise<void>;
  destroy: () => Promise<void>;
  
  // 执行控制
  executeTask: (task: ExecutionTask) => Promise<ExecutionResult>;
  cancelExecution: () => Promise<void>;
  pauseExecution: () => Promise<void>;
  resumeExecution: () => Promise<void>;
  
  // 配置管理
  updateConfig: (config: Partial<AgentConfig>) => Promise<void>;
  resetConfig: () => Promise<void>;
  validateConfig: (config: AgentConfig) => Promise<ValidationResult>;
  
  // 模型管理
  switchModel: (modelName: string) => Promise<void>;
  testModel: (modelName: string) => Promise<ModelTestResult>;
  optimizeModel: () => Promise<OptimizationResult>;
  
  // 工具管理
  refreshTools: () => Promise<void>;
  enableTool: (toolName: string) => Promise<void>;
  disableTool: (toolName: string) => Promise<void>;
  
  // 错误处理
  retry: () => Promise<void>;
  recover: () => Promise<void>;
  clearErrors: () => void;
}

// Agent能力查询
interface AgentCapabilities {
  // 可用模型
  availableModels: ModelInfo[];
  
  // 可用工具
  availableTools: ToolInfo[];
  
  // 支持的功能
  supportedFeatures: FeatureInfo[];
  
  // 资源限制
  resourceLimits: ResourceLimits;
  
  // 配置选项
  configurationOptions: ConfigOption[];
}
```

### Hook核心实现
```typescript
// use-agent Hook核心实现
export function useAgent(options: UseAgentOptions = {}): UseAgentHook {
  
  // 基础状态管理
  const [state, setState] = useState<AgentState>(getInitialAgentState(options));
  
  // Agent核心引用
  const agentCoreRef = useRef<AgentCore>();
  const executionMonitorRef = useRef<ExecutionMonitor>();
  const configManagerRef = useRef<AgentConfigManager>();
  
  // 事件系统
  const eventEmitterRef = useRef<AgentEventEmitter>();
  
  // 配置管理
  const config = useAgentConfig(options.config);
  
  // 生命周期管理
  useEffect(() => {
    initializeAgent();
    return cleanupAgent;
  }, []);
  
  // 状态监控
  useEffect(() => {
    if (!agentCoreRef.current) return;
    
    const subscription = subscribeToAgentEvents();
    return () => subscription.unsubscribe();
  }, [agentCoreRef.current]);
  
  // 初始化Agent
  const initializeAgent = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        status: AgentStatus.INITIALIZING
      }));
      
      // 创建配置管理器
      configManagerRef.current = new AgentConfigManager(config);
      
      // 创建Agent核心实例
      agentCoreRef.current = new AgentCore({
        config: config,
        messageQueue: options.messageQueue,
        toolRegistry: options.toolRegistry,
        eventEmitter: eventEmitterRef.current
      });
      
      // 创建执行监控器
      executionMonitorRef.current = new ExecutionMonitor({
        agentCore: agentCoreRef.current,
        onStateChange: handleExecutionStateChange,
        onProgressUpdate: handleProgressUpdate,
        onError: handleExecutionError
      });
      
      // 创建事件发射器
      eventEmitterRef.current = new AgentEventEmitter();
      
      // 初始化Agent
      await agentCoreRef.current.initialize();
      
      // 加载能力信息
      const capabilities = await loadAgentCapabilities();
      
      setState(prev => ({
        ...prev,
        status: AgentStatus.READY,
        isInitialized: true,
        isConnected: true,
        connection: {
          ...prev.connection,
          connectionId: generateConnectionId(),
          lastHeartbeat: Date.now()
        }
      }));
      
      // 触发初始化完成事件
      eventEmitterRef.current?.emit('initialized', { capabilities });
      
    } catch (error) {
      await handleInitializationError(error);
    }
  }, [config, options]);
  
  // 订阅Agent事件
  const subscribeToAgentEvents = useCallback(() => {
    const agentCore = agentCoreRef.current;
    if (!agentCore) throw new Error('Agent core not initialized');
    
    const subscription = new AgentEventSubscription();
    
    // 执行状态变更事件
    subscription.add(
      agentCore.on('execution:start', handleExecutionStart)
    );
    
    subscription.add(
      agentCore.on('execution:progress', handleExecutionProgress)
    );
    
    subscription.add(
      agentCore.on('execution:complete', handleExecutionComplete)
    );
    
    subscription.add(
      agentCore.on('execution:error', handleExecutionError)
    );
    
    // 工具事件
    subscription.add(
      agentCore.on('tool:call', handleToolCall)
    );
    
    subscription.add(
      agentCore.on('tool:result', handleToolResult)
    );
    
    // 模型事件
    subscription.add(
      agentCore.on('model:switch', handleModelSwitch)
    );
    
    subscription.add(
      agentCore.on('model:fallback', handleModelFallback)
    );
    
    // 连接事件
    subscription.add(
      agentCore.on('connection:heartbeat', handleHeartbeat)
    );
    
    return subscription;
  }, []);
  
  // 执行任务
  const executeTask = useCallback(async (task: ExecutionTask): Promise<ExecutionResult> => {
    
    if (!state.isInitialized || !agentCoreRef.current) {
      throw new AgentError('NOT_INITIALIZED', 'Agent not initialized');
    }
    
    if (state.isExecuting) {
      throw new AgentError('EXECUTION_IN_PROGRESS', 'Another task is already executing');
    }
    
    const executionId = generateExecutionId();
    
    try {
      setState(prev => ({
        ...prev,
        isExecuting: true,
        executionState: {
          currentTask: task,
          executionId: executionId,
          startTime: Date.now(),
          progress: { completed: 0, total: 100, stage: 'initializing' },
          stage: ExecutionStage.INITIALIZING
        },
        errors: {
          ...prev.errors,
          lastError: null
        }
      }));
      
      // 启动执行监控
      executionMonitorRef.current?.startMonitoring(executionId);
      
      // 执行任务
      const result = await agentCoreRef.current.executeTask(task);
      
      setState(prev => ({
        ...prev,
        isExecuting: false,
        executionState: {
          ...prev.executionState,
          currentTask: null,
          executionId: null,
          stage: ExecutionStage.COMPLETED
        },
        performance: {
          ...prev.performance,
          executionTime: Date.now() - (prev.executionState.startTime || Date.now())
        }
      }));
      
      return result;
      
    } catch (error) {
      await handleExecutionError(error, executionId);
      throw error;
    } finally {
      executionMonitorRef.current?.stopMonitoring(executionId);
    }
  }, [state.isInitialized, state.isExecuting]);
  
  // 处理执行状态变更
  const handleExecutionStateChange = useCallback((change: ExecutionStateChange) => {
    setState(prev => ({
      ...prev,
      executionState: {
        ...prev.executionState,
        stage: change.stage,
        progress: change.progress || prev.executionState.progress
      }
    }));
    
    // 发射状态变更事件
    eventEmitterRef.current?.emit('execution:state-change', change);
  }, []);
  
  // 处理进度更新
  const handleProgressUpdate = useCallback((progress: ExecutionProgress) => {
    setState(prev => ({
      ...prev,
      executionState: {
        ...prev.executionState,
        progress: progress
      }
    }));
    
    // 发射进度更新事件
    eventEmitterRef.current?.emit('execution:progress', progress);
  }, []);
  
  // 处理工具调用
  const handleToolCall = useCallback((toolCall: ToolCall) => {
    setState(prev => ({
      ...prev,
      toolState: {
        ...prev.toolState,
        pendingCalls: [...prev.toolState.pendingCalls, toolCall],
        activeTools: [
          ...prev.toolState.activeTools,
          {
            name: toolCall.toolName,
            callId: toolCall.id,
            startTime: Date.now()
          }
        ]
      }
    }));
    
    // 发射工具调用事件
    eventEmitterRef.current?.emit('tool:call', toolCall);
  }, []);
  
  // 处理工具结果
  const handleToolResult = useCallback((result: ToolResult) => {
    setState(prev => {
      const updatedPendingCalls = prev.toolState.pendingCalls.filter(
        call => call.id !== result.toolCallId
      );
      
      const updatedActiveTools = prev.toolState.activeTools.filter(
        tool => tool.callId !== result.toolCallId
      );
      
      const completedCall: CompletedCall = {
        id: result.toolCallId,
        toolName: result.toolName || 'unknown',
        result: result,
        duration: result.duration || 0,
        completedAt: Date.now()
      };
      
      return {
        ...prev,
        toolState: {
          ...prev.toolState,
          pendingCalls: updatedPendingCalls,
          activeTools: updatedActiveTools,
          completedCalls: [...prev.toolState.completedCalls, completedCall].slice(-50) // 保留最近50个
        }
      };
    });
    
    // 发射工具结果事件
    eventEmitterRef.current?.emit('tool:result', result);
  }, []);
  
  // 模型切换
  const switchModel = useCallback(async (modelName: string): Promise<void> => {
    
    if (!agentCoreRef.current) {
      throw new AgentError('NOT_INITIALIZED', 'Agent not initialized');
    }
    
    try {
      setState(prev => ({
        ...prev,
        modelState: {
          ...prev.modelState,
          currentModel: modelName
        }
      }));
      
      await agentCoreRef.current.switchModel(modelName);
      
      // 发射模型切换事件
      eventEmitterRef.current?.emit('model:switch', { 
        newModel: modelName,
        switchTime: Date.now()
      });
      
    } catch (error) {
      // 恢复原模型状态
      setState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          lastError: new AgentError('MODEL_SWITCH_FAILED', `Failed to switch to model ${modelName}: ${error.message}`)
        }
      }));
      
      throw new AgentError('MODEL_SWITCH_FAILED', `Failed to switch to model ${modelName}: ${error.message}`);
    }
  }, []);
  
  // 配置更新
  const updateConfig = useCallback(async (configUpdate: Partial<AgentConfig>): Promise<void> => {
    
    if (!configManagerRef.current) {
      throw new AgentError('CONFIG_MANAGER_NOT_AVAILABLE', 'Config manager not available');
    }
    
    try {
      // 验证配置
      const validationResult = await configManagerRef.current.validateConfig({
        ...config,
        ...configUpdate
      });
      
      if (!validationResult.isValid) {
        throw new AgentError('INVALID_CONFIG', `Configuration validation failed: ${validationResult.errors.join(', ')}`);
      }
      
      // 应用配置
      await configManagerRef.current.updateConfig(configUpdate);
      
      // 重新初始化相关组件
      if (agentCoreRef.current) {
        await agentCoreRef.current.applyConfigUpdate(configUpdate);
      }
      
      // 发射配置更新事件
      eventEmitterRef.current?.emit('config:update', {
        update: configUpdate,
        newConfig: configManagerRef.current.getCurrentConfig()
      });
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          lastError: new AgentError('CONFIG_UPDATE_FAILED', `Configuration update failed: ${error.message}`)
        }
      }));
      
      throw error;
    }
  }, [config]);
  
  // 性能监控
  const performanceMonitor = useCallback(() => {
    const monitor = setInterval(async () => {
      if (!agentCoreRef.current) return;
      
      try {
        const metrics = await agentCoreRef.current.getPerformanceMetrics();
        
        setState(prev => ({
          ...prev,
          performance: {
            ...prev.performance,
            ...metrics,
            memoryUsage: process.memoryUsage().heapUsed,
          }
        }));
        
      } catch (error) {
        console.warn('Failed to collect performance metrics:', error);
      }
    }, 5000); // 每5秒收集一次
    
    return () => clearInterval(monitor);
  }, []);
  
  // 启动性能监控
  useEffect(() => {
    if (state.isInitialized) {
      const cleanup = performanceMonitor();
      return cleanup;
    }
  }, [state.isInitialized, performanceMonitor]);
}
```

### 执行监控系统
```typescript
// Agent执行监控器
class ExecutionMonitor {
  private activeMonitors: Map<string, MonitoringSession> = new Map();
  private options: MonitoringOptions;
  
  constructor(options: MonitoringOptions) {
    this.options = options;
  }
  
  // 开始监控执行
  startMonitoring(executionId: string): MonitoringSession {
    const session: MonitoringSession = {
      executionId,
      startTime: Date.now(),
      checkpoints: [],
      metrics: {
        cpuUsage: [],
        memoryUsage: [],
        networkActivity: [],
        diskIO: []
      },
      isActive: true
    };
    
    this.activeMonitors.set(executionId, session);
    
    // 启动监控定时器
    const monitor = setInterval(() => {
      this.collectMetrics(session);
    }, this.options.metricsInterval || 1000);
    
    session.monitorInterval = monitor;
    
    return session;
  }
  
  // 收集性能指标
  private async collectMetrics(session: MonitoringSession): Promise<void> {
    try {
      const timestamp = Date.now();
      
      // 收集系统指标
      const systemMetrics = await this.getSystemMetrics();
      
      // 收集Agent特定指标
      const agentMetrics = await this.getAgentMetrics(session.executionId);
      
      // 添加到会话指标
      session.metrics.cpuUsage.push({
        timestamp,
        value: systemMetrics.cpuUsage
      });
      
      session.metrics.memoryUsage.push({
        timestamp,
        value: systemMetrics.memoryUsage
      });
      
      // 检查异常情况
      this.checkForAnomalies(session, systemMetrics, agentMetrics);
      
      // 触发指标更新回调
      this.options.onMetricsUpdate?.(session, {
        system: systemMetrics,
        agent: agentMetrics
      });
      
    } catch (error) {
      console.error(`Failed to collect metrics for execution ${session.executionId}:`, error);
    }
  }
  
  // 检查异常情况
  private checkForAnomalies(
    session: MonitoringSession,
    systemMetrics: SystemMetrics,
    agentMetrics: AgentMetrics
  ): void {
    
    // CPU使用率过高
    if (systemMetrics.cpuUsage > 0.9) {
      this.triggerAlert({
        type: 'high_cpu_usage',
        executionId: session.executionId,
        value: systemMetrics.cpuUsage,
        threshold: 0.9
      });
    }
    
    // 内存使用过高
    if (systemMetrics.memoryUsage > this.options.memoryThreshold) {
      this.triggerAlert({
        type: 'high_memory_usage',
        executionId: session.executionId,
        value: systemMetrics.memoryUsage,
        threshold: this.options.memoryThreshold
      });
    }
    
    // 执行时间过长
    const executionDuration = Date.now() - session.startTime;
    if (executionDuration > this.options.maxExecutionTime) {
      this.triggerAlert({
        type: 'execution_timeout',
        executionId: session.executionId,
        value: executionDuration,
        threshold: this.options.maxExecutionTime
      });
    }
    
    // Agent响应延迟过高
    if (agentMetrics.responseLatency > this.options.maxResponseLatency) {
      this.triggerAlert({
        type: 'high_latency',
        executionId: session.executionId,
        value: agentMetrics.responseLatency,
        threshold: this.options.maxResponseLatency
      });
    }
  }
  
  // 添加检查点
  addCheckpoint(executionId: string, checkpoint: ExecutionCheckpoint): void {
    const session = this.activeMonitors.get(executionId);
    if (!session) return;
    
    checkpoint.timestamp = Date.now();
    session.checkpoints.push(checkpoint);
    
    // 触发检查点回调
    this.options.onCheckpoint?.(session, checkpoint);
  }
  
  // 停止监控
  stopMonitoring(executionId: string): MonitoringSession | null {
    const session = this.activeMonitors.get(executionId);
    if (!session) return null;
    
    // 清理定时器
    if (session.monitorInterval) {
      clearInterval(session.monitorInterval);
    }
    
    // 标记为非活跃
    session.isActive = false;
    session.endTime = Date.now();
    
    // 从活跃监控中移除
    this.activeMonitors.delete(executionId);
    
    // 生成监控报告
    const report = this.generateMonitoringReport(session);
    
    // 触发监控结束回调
    this.options.onMonitoringEnd?.(session, report);
    
    return session;
  }
  
  // 生成监控报告
  private generateMonitoringReport(session: MonitoringSession): MonitoringReport {
    const duration = (session.endTime || Date.now()) - session.startTime;
    
    return {
      executionId: session.executionId,
      duration: duration,
      checkpointCount: session.checkpoints.length,
      
      // 性能统计
      performance: {
        avgCpuUsage: this.calculateAverage(session.metrics.cpuUsage),
        maxCpuUsage: this.calculateMax(session.metrics.cpuUsage),
        avgMemoryUsage: this.calculateAverage(session.metrics.memoryUsage),
        peakMemoryUsage: this.calculateMax(session.metrics.memoryUsage)
      },
      
      // 检查点分析
      checkpoints: session.checkpoints.map(cp => ({
        ...cp,
        relativeTime: cp.timestamp - session.startTime
      })),
      
      // 异常事件
      anomalies: session.anomalies || [],
      
      // 总体评估
      assessment: this.assessExecution(session)
    };
  }
}
```

### 配置管理系统
```typescript
// Agent配置管理器
class AgentConfigManager {
  private currentConfig: AgentConfig;
  private configHistory: ConfigHistoryEntry[] = [];
  private validators: ConfigValidator[] = [];
  private watchers: ConfigWatcher[] = [];
  
  constructor(initialConfig: AgentConfig) {
    this.currentConfig = { ...initialConfig };
    this.initializeValidators();
  }
  
  // 获取当前配置
  getCurrentConfig(): AgentConfig {
    return { ...this.currentConfig };
  }
  
  // 更新配置
  async updateConfig(update: Partial<AgentConfig>): Promise<void> {
    const newConfig = { ...this.currentConfig, ...update };
    
    // 验证新配置
    const validationResult = await this.validateConfig(newConfig);
    if (!validationResult.isValid) {
      throw new ConfigError('VALIDATION_FAILED', `Configuration validation failed: ${validationResult.errors.join(', ')}`);
    }
    
    // 保存配置历史
    this.addToHistory(this.currentConfig, newConfig, update);
    
    // 应用新配置
    const previousConfig = this.currentConfig;
    this.currentConfig = newConfig;
    
    try {
      // 通知配置变更
      await this.notifyConfigChange(previousConfig, newConfig, update);
      
      // 触发验证
      await this.validateActiveConfig();
      
    } catch (error) {
      // 回滚配置
      this.currentConfig = previousConfig;
      throw new ConfigError('UPDATE_FAILED', `Configuration update failed: ${error.message}`);
    }
  }
  
  // 验证配置
  async validateConfig(config: AgentConfig): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    for (const validator of this.validators) {
      try {
        const result = await validator.validate(config);
        
        if (!result.isValid) {
          errors.push(...result.errors);
        }
        
        if (result.warnings) {
          warnings.push(...result.warnings);
        }
        
      } catch (error) {
        errors.push(`Validator error: ${error.message}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  // 初始化验证器
  private initializeValidators(): void {
    
    // 模型配置验证器
    this.validators.push({
      name: 'model_validator',
      validate: async (config) => {
        const errors: string[] = [];
        
        if (!config.model.primaryModel) {
          errors.push('Primary model is required');
        }
        
        if (config.model.maxTokens <= 0) {
          errors.push('Max tokens must be greater than 0');
        }
        
        if (config.model.temperature < 0 || config.model.temperature > 2) {
          errors.push('Temperature must be between 0 and 2');
        }
        
        return {
          isValid: errors.length === 0,
          errors
        };
      }
    });
    
    // 工具配置验证器
    this.validators.push({
      name: 'tools_validator',
      validate: async (config) => {
        const errors: string[] = [];
        
        if (config.tools.maxConcurrentExecutions <= 0) {
          errors.push('Max concurrent executions must be greater than 0');
        }
        
        if (config.tools.executionTimeout <= 0) {
          errors.push('Execution timeout must be greater than 0');
        }
        
        return {
          isValid: errors.length === 0,
          errors
        };
      }
    });
    
    // 性能配置验证器
    this.validators.push({
      name: 'performance_validator',
      validate: async (config) => {
        const errors: string[] = [];
        const warnings: string[] = [];
        
        if (config.performance.maxMemoryUsage < 100 * 1024 * 1024) {
          warnings.push('Memory limit is very low (< 100MB)');
        }
        
        if (config.performance.maxExecutionTime < 5000) {
          warnings.push('Execution timeout is very short (< 5s)');
        }
        
        return {
          isValid: errors.length === 0,
          errors,
          warnings
        };
      }
    });
  }
  
  // 通知配置变更
  private async notifyConfigChange(
    previousConfig: AgentConfig,
    newConfig: AgentConfig,
    update: Partial<AgentConfig>
  ): Promise<void> {
    
    const changeEvent: ConfigChangeEvent = {
      timestamp: Date.now(),
      previousConfig,
      newConfig,
      update,
      changedKeys: Object.keys(update)
    };
    
    // 通知所有监听器
    for (const watcher of this.watchers) {
      try {
        await watcher.onConfigChange(changeEvent);
      } catch (error) {
        console.error(`Config watcher ${watcher.name} failed:`, error);
      }
    }
  }
  
  // 添加配置监听器
  addConfigWatcher(watcher: ConfigWatcher): void {
    this.watchers.push(watcher);
  }
  
  // 移除配置监听器
  removeConfigWatcher(watcherName: string): void {
    this.watchers = this.watchers.filter(w => w.name !== watcherName);
  }
  
  // 配置预设管理
  getConfigPresets(): ConfigPreset[] {
    return [
      {
        name: 'performance',
        description: 'Optimized for performance',
        config: {
          model: {
            primaryModel: 'claude-3-sonnet',
            temperature: 0.1,
            maxTokens: 4096
          },
          tools: {
            maxConcurrentExecutions: 5,
            executionTimeout: 30000
          },
          performance: {
            maxMemoryUsage: 2 * 1024 * 1024 * 1024, // 2GB
            maxExecutionTime: 60000
          }
        }
      },
      {
        name: 'balanced',
        description: 'Balanced configuration',
        config: {
          model: {
            primaryModel: 'claude-3-sonnet',
            temperature: 0.3,
            maxTokens: 8192
          },
          tools: {
            maxConcurrentExecutions: 3,
            executionTimeout: 60000
          },
          performance: {
            maxMemoryUsage: 1 * 1024 * 1024 * 1024, // 1GB
            maxExecutionTime: 120000
          }
        }
      },
      {
        name: 'creative',
        description: 'Optimized for creative tasks',
        config: {
          model: {
            primaryModel: 'claude-3-opus',
            temperature: 0.7,
            maxTokens: 16384
          },
          tools: {
            maxConcurrentExecutions: 2,
            executionTimeout: 120000
          },
          performance: {
            maxMemoryUsage: 3 * 1024 * 1024 * 1024, // 3GB
            maxExecutionTime: 300000
          }
        }
      }
    ];
  }
  
  // 应用配置预设
  async applyPreset(presetName: string): Promise<void> {
    const preset = this.getConfigPresets().find(p => p.name === presetName);
    if (!preset) {
      throw new ConfigError('PRESET_NOT_FOUND', `Configuration preset '${presetName}' not found`);
    }
    
    await this.updateConfig(preset.config);
  }
}
```

## 🔌 Hook集成与事件系统

### 事件系统设计
```typescript
// Agent事件发射器
class AgentEventEmitter {
  private listeners: Map<string, EventListener[]> = new Map();
  private eventHistory: EventHistoryEntry[] = [];
  private maxHistorySize: number = 1000;
  
  // 监听事件
  on(eventType: string, listener: EventListener): EventSubscription {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    
    const listeners = this.listeners.get(eventType)!;
    listeners.push(listener);
    
    // 返回取消订阅函数
    return {
      unsubscribe: () => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }
  
  // 发射事件
  emit(eventType: string, data: any): void {
    const listeners = this.listeners.get(eventType) || [];
    const event: AgentEvent = {
      type: eventType,
      data: data,
      timestamp: Date.now(),
      id: generateEventId()
    };
    
    // 添加到历史记录
    this.addToHistory(event);
    
    // 通知所有监听器
    for (const listener of listeners) {
      try {
        listener(event);
      } catch (error) {
        console.error(`Event listener error for ${eventType}:`, error);
      }
    }
  }
  
  // 一次性监听
  once(eventType: string, listener: EventListener): EventSubscription {
    const onceListener = (event: AgentEvent) => {
      listener(event);
      subscription.unsubscribe();
    };
    
    const subscription = this.on(eventType, onceListener);
    return subscription;
  }
  
  // 等待特定事件
  waitFor(eventType: string, timeout?: number): Promise<AgentEvent> {
    return new Promise((resolve, reject) => {
      let timeoutId: NodeJS.Timeout | undefined;
      
      if (timeout) {
        timeoutId = setTimeout(() => {
          subscription.unsubscribe();
          reject(new Error(`Event ${eventType} timeout after ${timeout}ms`));
        }, timeout);
      }
      
      const subscription = this.once(eventType, (event) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        resolve(event);
      });
    });
  }
  
  // 获取事件历史
  getEventHistory(filter?: EventFilter): EventHistoryEntry[] {
    if (!filter) {
      return [...this.eventHistory];
    }
    
    return this.eventHistory.filter(entry => {
      if (filter.eventType && entry.event.type !== filter.eventType) {
        return false;
      }
      
      if (filter.after && entry.event.timestamp < filter.after) {
        return false;
      }
      
      if (filter.before && entry.event.timestamp > filter.before) {
        return false;
      }
      
      return true;
    });
  }
  
  // 清理事件历史
  clearHistory(): void {
    this.eventHistory = [];
  }
}
```

---

*use-agent Hook体现了"文档即软件"3.0在Agent状态管理上的精密设计：通过详细的自然语言描述，完整定义了一个功能强大、监控完善、配置灵活的React Hook。从执行状态监控到性能指标收集，从配置管理到事件系统，每个技术细节都以标准化的文档形式呈现，为AI编译器提供了准确的实现指导。*