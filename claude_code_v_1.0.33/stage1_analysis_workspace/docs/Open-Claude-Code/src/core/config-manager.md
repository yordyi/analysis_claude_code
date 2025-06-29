# 配置管理器实现文档

## 🎯 模块定位与职责

配置管理器是整个"文档即软件"3.0系统的配置中枢，负责统一管理所有组件的配置信息。基于Claude Code的分层配置设计，本模块实现了多级配置源的智能合并、运行时热更新、以及基于Zod的强类型验证机制。

## 📋 核心功能定义

### 主要职责
1. **分层配置加载**: 支持项目级、用户级、系统级配置的层次化管理
2. **多源配置集成**: 集成JSON文件、JS文件、环境变量等多种配置源
3. **智能配置合并**: 使用深度合并算法处理复杂配置结构
4. **运行时热更新**: 支持配置的动态变更和实时生效
5. **强类型验证**: 基于Zod模式进行配置结构和类型验证
6. **配置缓存优化**: 智能缓存机制提升配置访问性能

### 核心特性
- **原子性更新**: 确保配置更新的原子性和一致性
- **变更监听**: 文件系统监听和配置变更通知
- **回滚机制**: 配置错误时的自动回滚功能
- **安全隔离**: 敏感配置的加密存储和访问控制

## 🔧 内部工作逻辑

### 配置层次结构设计
```typescript
// 配置源优先级（从低到高）
enum ConfigSourcePriority {
  SYSTEM_DEFAULT = 0,      // 系统默认配置
  SYSTEM_GLOBAL = 1,       // 系统全局配置 (/etc/claude/config.json)
  USER_GLOBAL = 2,         // 用户全局配置 (~/.claude/config.json)
  PROJECT_CONFIG = 3,      // 项目配置 (.claude.json)
  PROJECT_JS_CONFIG = 4,   // 项目JS配置 (.claude.config.js)
  ENVIRONMENT_VARS = 5,    // 环境变量
  RUNTIME_OVERRIDE = 6     // 运行时覆盖
}

// 配置管理器核心类
class ConfigurationManager {
  // 配置源映射
  private configSources: Map<ConfigSourcePriority, ConfigSource> = new Map();
  
  // 当前合并后的配置
  private mergedConfig: OpenClaudeConfig;
  
  // 配置验证器
  private validator: ConfigValidator;
  
  // 文件监听器
  private fileWatchers: Map<string, FileWatcher> = new Map();
  
  // 变更监听器
  private changeListeners: Set<ConfigChangeListener> = new Set();
  
  // 缓存管理
  private configCache: ConfigCache;
  
  // 配置锁（确保并发安全）
  private configLock: AsyncMutex = new AsyncMutex();
}
```

### 配置加载流程
```mermaid
flowchart TD
    A[ConfigManager.initialize()] --> B[扫描配置文件路径]
    B --> C[按优先级加载配置源]
    C --> D{配置文件存在?}
    D -->|是| E[解析配置文件]
    D -->|否| F[使用默认配置]
    E --> G[验证配置格式]
    G --> H{验证通过?}
    H -->|是| I[合并到配置树]
    H -->|否| J[记录错误，跳过该源]
    F --> I
    I --> K[加载环境变量配置]
    K --> L[最终配置验证]
    L --> M{整体配置有效?}
    M -->|是| N[启动文件监听]
    M -->|否| O[抛出配置错误]
    N --> P[配置加载完成]
    J --> Q[继续下一个配置源]
    Q --> K
```

### 核心算法实现

#### 1. 配置初始化流程
```typescript
// 配置管理器初始化
async initialize(): Promise<void> {
  // 获取配置锁，确保初始化的原子性
  await this.configLock.acquire();
  
  try {
    // 1. 初始化默认配置
    this.initializeDefaultConfig();
    
    // 2. 扫描并加载所有配置源
    await this.loadAllConfigSources();
    
    // 3. 加载环境变量配置
    this.loadEnvironmentConfig();
    
    // 4. 执行最终配置验证
    this.validateFinalConfig();
    
    // 5. 启动文件监听器
    await this.startFileWatchers();
    
    // 6. 初始化配置缓存
    this.initializeConfigCache();
    
    // 7. 记录初始化成功事件
    this.logInitializationSuccess();
    
  } catch (error) {
    // 初始化失败，记录错误并清理资源
    this.logInitializationError(error);
    await this.cleanup();
    throw error;
  } finally {
    // 释放配置锁
    this.configLock.release();
  }
}
```

#### 2. 分层配置加载算法
```typescript
// 加载所有配置源
private async loadAllConfigSources(): Promise<void> {
  // 配置文件查找路径（按优先级排序）
  const configPaths = this.getConfigurationPaths();
  
  // 并行加载所有配置源以提升性能
  const loadPromises = configPaths.map(async (pathInfo) => {
    try {
      const configData = await this.loadConfigurationFromPath(pathInfo.path);
      
      if (configData) {
        // 注册配置源
        this.registerConfigSource(pathInfo.priority, {
          path: pathInfo.path,
          data: configData,
          lastModified: Date.now(),
          type: pathInfo.type
        });
        
        // 合并到主配置
        await this.mergeConfigurationData(pathInfo.priority, configData);
      }
    } catch (error) {
      // 单个配置源加载失败不应该影响整体初始化
      this.logConfigSourceError(pathInfo.path, error);
    }
  });
  
  // 等待所有配置源加载完成
  await Promise.allSettled(loadPromises);
}

// 获取配置文件路径
private getConfigurationPaths(): ConfigPathInfo[] {
  return [
    {
      path: '/etc/claude/config.json',
      priority: ConfigSourcePriority.SYSTEM_GLOBAL,
      type: 'json'
    },
    {
      path: path.join(os.homedir(), '.claude', 'config.json'),
      priority: ConfigSourcePriority.USER_GLOBAL,
      type: 'json'
    },
    {
      path: path.join(process.cwd(), '.claude.json'),
      priority: ConfigSourcePriority.PROJECT_CONFIG,
      type: 'json'
    },
    {
      path: path.join(process.cwd(), '.claude.config.js'),
      priority: ConfigSourcePriority.PROJECT_JS_CONFIG,
      type: 'javascript'
    }
  ];
}
```

#### 3. 智能配置合并算法
```typescript
// 深度合并配置对象
private deepMergeConfig(target: any, source: any): any {
  // 处理null和undefined值
  if (source === null || source === undefined) {
    return target;
  }
  
  if (target === null || target === undefined) {
    return source;
  }
  
  // 基本类型直接覆盖
  if (typeof source !== 'object' || Array.isArray(source)) {
    return source;
  }
  
  // 对象类型进行深度合并
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (key in result && typeof result[key] === 'object' && 
          typeof source[key] === 'object' && 
          !Array.isArray(result[key]) && !Array.isArray(source[key])) {
        // 递归合并嵌套对象
        result[key] = this.deepMergeConfig(result[key], source[key]);
      } else {
        // 直接覆盖或新增属性
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

// 按优先级合并所有配置源
private async mergeAllConfigSources(): Promise<OpenClaudeConfig> {
  let mergedConfig = this.getDefaultConfig();
  
  // 按优先级顺序合并配置
  const sortedSources = Array.from(this.configSources.entries())
    .sort(([a], [b]) => a - b); // 优先级从低到高
  
  for (const [priority, source] of sortedSources) {
    try {
      mergedConfig = this.deepMergeConfig(mergedConfig, source.data);
      
      // 记录合并信息
      this.logConfigMerge(priority, source.path);
    } catch (error) {
      // 合并失败，跳过该配置源
      this.logConfigMergeError(priority, source.path, error);
    }
  }
  
  return mergedConfig;
}
```

#### 4. 配置验证机制
```typescript
// 基于Zod的配置验证器
class ConfigValidator {
  private schema: z.ZodSchema<OpenClaudeConfig>;
  
  constructor() {
    this.schema = this.buildConfigSchema();
  }
  
  // 构建配置验证模式
  private buildConfigSchema(): z.ZodSchema<OpenClaudeConfig> {
    return z.object({
      // 核心配置验证
      core: z.object({
        apiKey: z.string().optional(),
        apiBaseUrl: z.string().url().optional(),
        model: z.string().default('claude-3-5-sonnet'),
        fallbackModel: z.string().optional(),
        maxRetries: z.number().min(0).max(10).default(3),
        timeout: z.number().min(1000).max(300000).default(30000),
        workingDirectory: z.string().default(process.cwd()),
      }),
      
      // UI配置验证
      ui: z.object({
        theme: z.enum(['light', 'dark', 'auto']).default('auto'),
        showProgress: z.boolean().default(true),
        enableAnimations: z.boolean().default(true),
        compactMode: z.boolean().default(false),
      }),
      
      // Agent配置验证
      agent: z.object({
        model: z.string().default('claude-3-5-sonnet'),
        fallbackModel: z.string().optional(),
        maxTokens: z.number().min(1000).max(200000).optional(),
        temperature: z.number().min(0).max(2).default(0.7),
        enableSteering: z.boolean().default(true),
        concurrencyLimit: z.number().min(1).max(50).default(10),
        allowedTools: z.array(z.string()).optional(),
        disallowedTools: z.array(z.string()).optional(),
        planMode: z.boolean().default(false),
      }),
      
      // 工具配置验证
      tools: z.object({
        enabled: z.array(z.string()).default([]),
        disabled: z.array(z.string()).default([]),
        permissions: z.object({
          allowFileWrite: z.boolean().default(true),
          allowFileRead: z.boolean().default(true),
          allowBashExecution: z.boolean().default(true),
          allowNetworkAccess: z.boolean().default(true),
          restrictedPaths: z.array(z.string()).default([]),
        }),
        concurrency: z.object({
          maxConcurrent: z.number().min(1).max(50).default(10),
          enableLoadBalancing: z.boolean().default(true),
        }),
      }),
      
      // MCP配置验证
      mcp: z.object({
        servers: z.record(z.object({
          command: z.string(),
          args: z.array(z.string()).default([]),
          transport: z.enum(['stdio', 'http', 'websocket']).default('stdio'),
          timeout: z.number().min(1000).max(60000).optional(),
          env: z.record(z.string()).optional(),
          workingDirectory: z.string().optional(),
          oauth: z.object({
            clientId: z.string(),
            clientSecret: z.string(),
            authUrl: z.string().url(),
            tokenUrl: z.string().url(),
            scopes: z.array(z.string()).default([]),
          }).optional(),
        })).default({}),
        globalTimeout: z.number().min(1000).max(60000).default(30000),
        retryAttempts: z.number().min(0).max(5).default(3),
      }),
      
      // 日志配置验证
      logging: z.object({
        level: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
        file: z.string().optional(),
        maxFileSize: z.number().min(1024).max(100 * 1024 * 1024).default(10 * 1024 * 1024),
        maxFiles: z.number().min(1).max(20).default(5),
      }),
    });
  }
  
  // 验证配置
  validate(config: unknown): ValidationResult<OpenClaudeConfig> {
    try {
      const validatedConfig = this.schema.parse(config);
      return {
        success: true,
        data: validatedConfig,
        errors: []
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          data: null,
          errors: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        };
      }
      
      return {
        success: false,
        data: null,
        errors: [{
          path: 'unknown',
          message: error.message || 'Unknown validation error',
          code: 'unknown'
        }]
      };
    }
  }
}
```

#### 5. 运行时热更新机制
```typescript
// 配置热更新管理器
class ConfigHotUpdateManager {
  private debounceTimeout: NodeJS.Timeout | null = null;
  private debounceDelay: number = 500; // 500ms防抖
  
  // 文件变更处理
  async handleFileChange(filePath: string): Promise<void> {
    // 防抖处理，避免频繁更新
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    
    this.debounceTimeout = setTimeout(async () => {
      try {
        await this.performHotUpdate(filePath);
      } catch (error) {
        this.logHotUpdateError(filePath, error);
      }
    }, this.debounceDelay);
  }
  
  // 执行热更新
  private async performHotUpdate(filePath: string): Promise<void> {
    // 获取配置锁
    await this.configLock.acquire();
    
    try {
      // 1. 备份当前配置
      const backupConfig = this.createConfigBackup();
      
      // 2. 重新加载变更的配置文件
      const newConfigData = await this.loadConfigurationFromPath(filePath);
      
      // 3. 更新配置源
      const priority = this.getConfigSourcePriority(filePath);
      this.updateConfigSource(priority, newConfigData);
      
      // 4. 重新合并所有配置
      const newMergedConfig = await this.mergeAllConfigSources();
      
      // 5. 验证新配置
      const validation = this.validator.validate(newMergedConfig);
      if (!validation.success) {
        throw new ConfigValidationError('Hot update validation failed', validation.errors);
      }
      
      // 6. 原子性地应用新配置
      const oldConfig = this.mergedConfig;
      this.mergedConfig = validation.data;
      
      // 7. 通知配置变更
      await this.notifyConfigChange(oldConfig, this.mergedConfig);
      
      // 8. 清理备份
      this.clearConfigBackup(backupConfig);
      
      this.logHotUpdateSuccess(filePath);
      
    } catch (error) {
      // 热更新失败，回滚配置
      await this.rollbackConfiguration(backupConfig);
      throw error;
    } finally {
      this.configLock.release();
    }
  }
  
  // 配置变更通知
  private async notifyConfigChange(
    oldConfig: OpenClaudeConfig, 
    newConfig: OpenClaudeConfig
  ): Promise<void> {
    const changes = this.detectConfigChanges(oldConfig, newConfig);
    
    // 并发通知所有监听器
    const notifications = Array.from(this.changeListeners).map(async (listener) => {
      try {
        await listener.onConfigChange({
          oldConfig,
          newConfig,
          changes,
          timestamp: Date.now()
        });
      } catch (error) {
        this.logListenerError(listener, error);
      }
    });
    
    await Promise.allSettled(notifications);
  }
}
```

## 🔌 对外接口关系

### 配置访问接口
```typescript
interface ConfigurationAccessInterface {
  // 获取完整配置
  getConfig(): OpenClaudeConfig;
  
  // 获取配置节
  getSection<K extends keyof OpenClaudeConfig>(section: K): OpenClaudeConfig[K];
  
  // 获取嵌套配置值
  getValue<T>(path: string, defaultValue?: T): T;
  
  // 检查配置值是否存在
  hasValue(path: string): boolean;
  
  // 获取配置元数据
  getMetadata(path?: string): ConfigMetadata;
}

// 配置更新接口
interface ConfigurationUpdateInterface {
  // 更新配置
  updateConfig(updates: Partial<OpenClaudeConfig>): Promise<void>;
  
  // 设置配置值
  setValue(path: string, value: any): Promise<void>;
  
  // 删除配置值
  deleteValue(path: string): Promise<void>;
  
  // 重置配置到默认值
  resetToDefaults(section?: keyof OpenClaudeConfig): Promise<void>;
  
  // 重新加载配置
  reload(): Promise<void>;
}

// 配置监听接口
interface ConfigurationObserverInterface {
  // 注册配置变更监听器
  onConfigChange(listener: ConfigChangeListener): () => void;
  
  // 注册特定路径变更监听器
  onValueChange<T>(path: string, listener: ValueChangeListener<T>): () => void;
  
  // 注册配置节变更监听器
  onSectionChange<K extends keyof OpenClaudeConfig>(
    section: K, 
    listener: SectionChangeListener<K>
  ): () => void;
}
```

### 与其他模块的集成接口
```typescript
// 与Agent核心的集成
interface AgentCoreConfigIntegration {
  // 获取Agent配置
  getAgentConfig(): AgentConfiguration;
  
  // 更新Agent运行时配置
  updateAgentRuntimeConfig(config: Partial<AgentConfiguration>): Promise<void>;
  
  // 监听Agent配置变更
  onAgentConfigChange(callback: (config: AgentConfiguration) => void): void;
}

// 与工具系统的集成
interface ToolSystemConfigIntegration {
  // 获取工具配置
  getToolsConfig(): ToolsConfiguration;
  
  // 获取特定工具配置
  getToolConfig(toolName: string): ToolConfiguration | null;
  
  // 更新工具权限配置
  updateToolPermissions(permissions: ToolPermissionMatrix): Promise<void>;
  
  // 注册工具配置变更监听
  onToolConfigChange(callback: (config: ToolsConfiguration) => void): void;
}

// 与MCP系统的集成
interface MCPConfigIntegration {
  // 获取MCP服务器配置
  getMCPServersConfig(): Record<string, MCPServerConfig>;
  
  // 添加MCP服务器
  addMCPServer(name: string, config: MCPServerConfig): Promise<void>;
  
  // 移除MCP服务器
  removeMCPServer(name: string): Promise<void>;
  
  // 更新MCP服务器配置
  updateMCPServer(name: string, config: Partial<MCPServerConfig>): Promise<void>;
}
```

## 🔄 配置变更传播机制

### 变更检测算法
```typescript
// 配置变更检测器
class ConfigChangeDetector {
  // 检测配置变更
  detectChanges(
    oldConfig: OpenClaudeConfig, 
    newConfig: OpenClaudeConfig
  ): ConfigChangeSet {
    const changes: ConfigChangeSet = {
      added: [],
      modified: [],
      removed: [],
      timestamp: Date.now()
    };
    
    // 递归比较配置对象
    this.compareObjects('', oldConfig, newConfig, changes);
    
    return changes;
  }
  
  // 递归对象比较
  private compareObjects(
    basePath: string,
    oldObj: any,
    newObj: any,
    changes: ConfigChangeSet
  ): void {
    // 获取所有键的并集
    const allKeys = new Set([
      ...Object.keys(oldObj || {}),
      ...Object.keys(newObj || {})
    ]);
    
    for (const key of allKeys) {
      const currentPath = basePath ? `${basePath}.${key}` : key;
      const oldValue = oldObj?.[key];
      const newValue = newObj?.[key];
      
      if (oldValue === undefined && newValue !== undefined) {
        // 新增的配置项
        changes.added.push({
          path: currentPath,
          value: newValue,
          type: this.getValueType(newValue)
        });
      } else if (oldValue !== undefined && newValue === undefined) {
        // 删除的配置项
        changes.removed.push({
          path: currentPath,
          value: oldValue,
          type: this.getValueType(oldValue)
        });
      } else if (this.isObjectValue(oldValue) && this.isObjectValue(newValue)) {
        // 递归比较嵌套对象
        this.compareObjects(currentPath, oldValue, newValue, changes);
      } else if (!this.isEqual(oldValue, newValue)) {
        // 修改的配置项
        changes.modified.push({
          path: currentPath,
          oldValue: oldValue,
          newValue: newValue,
          type: this.getValueType(newValue)
        });
      }
    }
  }
  
  // 深度相等比较
  private isEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (typeof a !== typeof b) return false;
    
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => this.isEqual(item, b[index]));
    }
    
    if (typeof a === 'object') {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      
      if (keysA.length !== keysB.length) return false;
      
      return keysA.every(key => this.isEqual(a[key], b[key]));
    }
    
    return false;
  }
}
```

### 变更影响分析
```typescript
// 配置变更影响分析器
class ConfigChangeImpactAnalyzer {
  // 分析变更影响
  analyzeImpact(changes: ConfigChangeSet): ChangeImpactReport {
    const impact: ChangeImpactReport = {
      severity: 'low',
      affectedModules: [],
      requiredRestarts: [],
      warnings: [],
      recommendations: []
    };
    
    // 分析每个变更的影响
    for (const change of [...changes.added, ...changes.modified, ...changes.removed]) {
      this.analyzeChangeImpact(change, impact);
    }
    
    // 确定整体严重程度
    impact.severity = this.determineSeverity(impact);
    
    return impact;
  }
  
  // 分析单个变更的影响
  private analyzeChangeImpact(
    change: ConfigChange, 
    impact: ChangeImpactReport
  ): void {
    const pathSegments = change.path.split('.');
    const module = pathSegments[0];
    const property = pathSegments.slice(1).join('.');
    
    // 根据配置路径确定影响
    switch (module) {
      case 'core':
        this.analyzeCoreConfigImpact(property, change, impact);
        break;
      case 'agent':
        this.analyzeAgentConfigImpact(property, change, impact);
        break;
      case 'tools':
        this.analyzeToolsConfigImpact(property, change, impact);
        break;
      case 'mcp':
        this.analyzeMCPConfigImpact(property, change, impact);
        break;
      case 'ui':
        this.analyzeUIConfigImpact(property, change, impact);
        break;
      case 'logging':
        this.analyzeLoggingConfigImpact(property, change, impact);
        break;
    }
  }
  
  // 分析核心配置变更影响
  private analyzeCoreConfigImpact(
    property: string,
    change: ConfigChange,
    impact: ChangeImpactReport
  ): void {
    switch (property) {
      case 'apiKey':
      case 'apiBaseUrl':
        impact.affectedModules.push('agent-core', 'model-client');
        impact.severity = 'high';
        impact.recommendations.push('API credentials changed - verify connectivity');
        break;
        
      case 'model':
      case 'fallbackModel':
        impact.affectedModules.push('agent-core');
        impact.warnings.push('Model configuration changed - may affect response quality');
        break;
        
      case 'workingDirectory':
        impact.affectedModules.push('file-tools', 'bash-tool');
        impact.requiredRestarts.push('file-system-watcher');
        impact.severity = 'medium';
        break;
    }
  }
  
  // 分析Agent配置变更影响
  private analyzeAgentConfigImpact(
    property: string,
    change: ConfigChange,
    impact: ChangeImpactReport
  ): void {
    switch (property) {
      case 'enableSteering':
        impact.affectedModules.push('message-queue', 'input-handler');
        impact.warnings.push('Steering mechanism toggled - affects real-time interaction');
        break;
        
      case 'concurrencyLimit':
        impact.affectedModules.push('tool-scheduler', 'resource-manager');
        impact.recommendations.push('Concurrency limit changed - monitor resource usage');
        break;
        
      case 'planMode':
        impact.affectedModules.push('ui-system', 'tool-permissions');
        impact.severity = 'medium';
        impact.warnings.push('Plan mode toggled - execution behavior will change');
        break;
    }
  }
}
```

## 🏗️ 配置缓存与性能优化

### 智能缓存机制
```typescript
// 配置缓存管理器
class ConfigCacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private accessPatterns: Map<string, AccessPattern> = new Map();
  private cacheMetrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    evictions: 0,
    totalAccess: 0
  };
  
  // 获取缓存的配置值
  get<T>(path: string): T | null {
    this.cacheMetrics.totalAccess++;
    
    const entry = this.cache.get(path);
    if (entry && !this.isExpired(entry)) {
      // 缓存命中
      this.cacheMetrics.hits++;
      this.updateAccessPattern(path);
      return entry.value as T;
    }
    
    // 缓存未命中
    this.cacheMetrics.misses++;
    return null;
  }
  
  // 设置缓存值
  set<T>(path: string, value: T, ttl?: number): void {
    const entry: CacheEntry = {
      value,
      timestamp: Date.now(),
      ttl: ttl || this.getDefaultTTL(path),
      accessCount: 0
    };
    
    // 检查缓存容量
    if (this.cache.size >= this.maxCacheSize) {
      this.evictLeastUsed();
    }
    
    this.cache.set(path, entry);
    this.initializeAccessPattern(path);
  }
  
  // 缓存失效处理
  invalidate(path: string): void {
    // 支持通配符失效
    if (path.includes('*')) {
      const pattern = this.createRegexFromPattern(path);
      for (const key of this.cache.keys()) {
        if (pattern.test(key)) {
          this.cache.delete(key);
          this.accessPatterns.delete(key);
        }
      }
    } else {
      this.cache.delete(path);
      this.accessPatterns.delete(path);
    }
  }
  
  // 智能预加载
  preload(paths: string[]): void {
    // 基于访问模式预测需要预加载的配置
    const predictedPaths = this.predictAccessPaths(paths);
    
    for (const path of predictedPaths) {
      if (!this.cache.has(path)) {
        const value = this.loadConfigValue(path);
        if (value !== null) {
          this.set(path, value);
        }
      }
    }
  }
}
```

### 配置访问优化
```typescript
// 配置访问优化器
class ConfigAccessOptimizer {
  // 批量配置获取
  async getBatch(paths: string[]): Promise<Record<string, any>> {
    const result: Record<string, any> = {};
    
    // 分离缓存命中和未命中的路径
    const cachedPaths: string[] = [];
    const uncachedPaths: string[] = [];
    
    for (const path of paths) {
      const cached = this.configCache.get(path);
      if (cached !== null) {
        result[path] = cached;
        cachedPaths.push(path);
      } else {
        uncachedPaths.push(path);
      }
    }
    
    // 批量加载未缓存的配置
    if (uncachedPaths.length > 0) {
      const uncachedValues = await this.loadBatchConfigValues(uncachedPaths);
      Object.assign(result, uncachedValues);
      
      // 更新缓存
      for (const [path, value] of Object.entries(uncachedValues)) {
        this.configCache.set(path, value);
      }
    }
    
    return result;
  }
  
  // 配置订阅优化
  optimizeSubscriptions(): void {
    // 合并相似的订阅路径
    const subscriptionGroups = this.groupSimilarSubscriptions();
    
    for (const group of subscriptionGroups) {
      // 为每个组创建一个优化的监听器
      this.createOptimizedListener(group);
    }
  }
  
  // 延迟配置加载
  async lazyLoad(path: string): Promise<any> {
    // 检查是否已在加载中
    if (this.loadingPromises.has(path)) {
      return this.loadingPromises.get(path);
    }
    
    // 创建加载Promise
    const loadPromise = this.performLazyLoad(path);
    this.loadingPromises.set(path, loadPromise);
    
    try {
      const result = await loadPromise;
      return result;
    } finally {
      this.loadingPromises.delete(path);
    }
  }
}
```

## 📊 配置监控与诊断

### 配置健康检查
```typescript
// 配置健康检查器
class ConfigHealthChecker {
  // 执行全面健康检查
  async performHealthCheck(): Promise<ConfigHealthReport> {
    const report: ConfigHealthReport = {
      overall: 'healthy',
      checks: [],
      warnings: [],
      errors: [],
      recommendations: [],
      timestamp: Date.now()
    };
    
    // 执行各项检查
    await Promise.all([
      this.checkConfigIntegrity(report),
      this.checkFilePermissions(report),
      this.checkConfigValues(report),
      this.checkDependencies(report),
      this.checkPerformance(report)
    ]);
    
    // 确定整体健康状态
    report.overall = this.determineOverallHealth(report);
    
    return report;
  }
  
  // 配置完整性检查
  private async checkConfigIntegrity(report: ConfigHealthReport): Promise<void> {
    try {
      // 验证所有配置源的完整性
      for (const [priority, source] of this.configSources) {
        const checkResult = await this.validateConfigSource(source);
        
        report.checks.push({
          name: `Config Source Integrity (${source.path})`,
          status: checkResult.isValid ? 'pass' : 'fail',
          details: checkResult.details
        });
        
        if (!checkResult.isValid) {
          report.errors.push(`Config source corrupted: ${source.path}`);
        }
      }
    } catch (error) {
      report.errors.push(`Integrity check failed: ${error.message}`);
    }
  }
  
  // 配置值有效性检查
  private async checkConfigValues(report: ConfigHealthReport): Promise<void> {
    const problematicValues = this.findProblematicValues();
    
    for (const issue of problematicValues) {
      report.checks.push({
        name: `Config Value Check (${issue.path})`,
        status: issue.severity === 'error' ? 'fail' : 'warn',
        details: issue.description
      });
      
      if (issue.severity === 'error') {
        report.errors.push(issue.description);
      } else {
        report.warnings.push(issue.description);
      }
    }
  }
  
  // 性能检查
  private async checkPerformance(report: ConfigHealthReport): Promise<void> {
    const metrics = this.configCache.getMetrics();
    
    // 缓存命中率检查
    const hitRate = metrics.hits / (metrics.hits + metrics.misses);
    if (hitRate < 0.8) {
      report.warnings.push(`Low cache hit rate: ${(hitRate * 100).toFixed(1)}%`);
      report.recommendations.push('Consider adjusting cache settings or access patterns');
    }
    
    // 配置访问延迟检查
    const avgLatency = this.getAverageAccessLatency();
    if (avgLatency > 10) { // 10ms阈值
      report.warnings.push(`High config access latency: ${avgLatency.toFixed(2)}ms`);
      report.recommendations.push('Consider optimizing config structure or caching strategy');
    }
  }
}
```

## 🔧 配置迁移与版本管理

### 配置版本控制
```typescript
// 配置版本管理器
class ConfigVersionManager {
  private currentVersion: string = '1.0.0';
  private migrationStrategies: Map<string, MigrationStrategy> = new Map();
  
  // 检测配置版本
  detectConfigVersion(config: any): string {
    // 从配置中读取版本信息
    if (config._meta?.version) {
      return config._meta.version;
    }
    
    // 基于配置结构推断版本
    return this.inferVersionFromStructure(config);
  }
  
  // 执行配置迁移
  async migrateConfig(config: any, targetVersion?: string): Promise<any> {
    const sourceVersion = this.detectConfigVersion(config);
    const target = targetVersion || this.currentVersion;
    
    if (sourceVersion === target) {
      return config; // 无需迁移
    }
    
    // 获取迁移路径
    const migrationPath = this.getMigrationPath(sourceVersion, target);
    
    if (!migrationPath) {
      throw new Error(`No migration path from ${sourceVersion} to ${target}`);
    }
    
    // 执行迁移链
    let migratedConfig = { ...config };
    for (const step of migrationPath) {
      migratedConfig = await this.executeMigrationStep(migratedConfig, step);
    }
    
    // 更新版本信息
    migratedConfig._meta = {
      ...migratedConfig._meta,
      version: target,
      migratedAt: Date.now(),
      migrationHistory: [
        ...(migratedConfig._meta?.migrationHistory || []),
        { from: sourceVersion, to: target, timestamp: Date.now() }
      ]
    };
    
    return migratedConfig;
  }
  
  // 注册迁移策略
  registerMigration(fromVersion: string, toVersion: string, strategy: MigrationStrategy): void {
    const key = `${fromVersion}->${toVersion}`;
    this.migrationStrategies.set(key, strategy);
  }
}
```

---

*本文档通过精确的自然语言描述，完整定义了分层配置管理器的实现细节。该设计融合了多源配置加载、智能合并算法、运行时热更新等先进特性，为"文档即软件"3.0系统提供了强大而灵活的配置管理基础设施。*