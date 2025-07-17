# Open Claude Code - 编码风格指南

## 1. 总体原则

### 1.1 设计哲学
- **一致性优于灵活性**: 保持代码风格的一致性
- **可读性优于简洁性**: 优先考虑代码的可读性和可维护性
- **类型安全优于动态性**: 充分利用TypeScript的类型系统
- **测试驱动优于后补测试**: 优先编写测试用例

### 1.2 代码质量标准
- **测试覆盖率**: ≥ 80%
- **圈复杂度**: 单个函数 ≤ 10
- **文件长度**: 单个文件 ≤ 500行
- **函数长度**: 单个函数 ≤ 50行

## 2. TypeScript编码规范

### 2.1 命名约定

#### 2.1.1 文件和目录命名
```typescript
// ✅ 推荐 - kebab-case
src/
├── agent-core/
│   ├── main-loop.ts
│   ├── message-compressor.ts
│   └── context-injector.ts
├── tool-system/
│   ├── tool-registry.ts
│   ├── execution-engine.ts
│   └── built-in-tools/
└── ui-components/
    ├── terminal-renderer.ts
    └── progress-indicator.ts

// ❌ 避免
src/
├── AgentCore/           // PascalCase目录
├── tool_system/         // snake_case目录
├── UI_Components/       // 混合命名
```

#### 2.1.2 变量和函数命名
```typescript
// ✅ 推荐 - camelCase
const messageHistory: Message[] = [];
const toolExecutionEngine = new ToolExecutionEngine();

function processUserInput(input: string): Promise<ProcessingResult> {
  // 实现
}

async function compressMessages(messages: Message[]): Promise<CompressedMessages> {
  // 实现
}

// ❌ 避免
const message_history = [];        // snake_case
const ToolExecutionEngine = {};    // PascalCase变量
function ProcessUserInput() {}     // PascalCase函数
```

#### 2.1.3 类和接口命名
```typescript
// ✅ 推荐 - PascalCase
class AgentCore {
  private messageProcessor: MessageProcessor;
}

interface ToolExecutionContext {
  sessionId: string;
  permissions: Permission[];
}

interface MCPServerConfig {
  name: string;
  transport: TransportType;
}

// 类型别名
type MessageHandler = (message: Message) => Promise<void>;
type ToolResult = Success | Failure;

// 枚举
enum ExecutionStatus {
  PENDING = 'pending',
  RUNNING = 'running', 
  COMPLETED = 'completed',
  FAILED = 'failed'
}
```

#### 2.1.4 常量命名
```typescript
// ✅ 推荐 - SCREAMING_SNAKE_CASE
const MAX_CONCURRENT_TOOLS = 10;
const DEFAULT_TIMEOUT_MS = 30000;
const SUPPORTED_MODELS = ['claude-3-5-sonnet', 'gpt-4o'] as const;

// 配置对象
const DEFAULT_CONFIG = {
  maxConcurrency: 10,
  timeoutMs: 30000,
  retryAttempts: 3
} as const;
```

### 2.2 类型定义规范

#### 2.2.1 接口设计
```typescript
// ✅ 推荐 - 明确的接口定义
interface Message {
  readonly id: string;
  readonly type: 'user' | 'assistant' | 'system';
  readonly content: string | ContentBlock[];
  readonly timestamp: string;
  readonly isMeta?: boolean;
}

interface ToolExecutionOptions {
  readonly timeout?: number;
  readonly retryAttempts?: number;
  readonly permissions?: Permission[];
  readonly sandbox?: SandboxConfig;
}

// 使用泛型提高复用性
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// ❌ 避免 - 过于宽泛的类型
interface Config {
  [key: string]: any;  // 避免any类型
}
```

#### 2.2.2 联合类型和判别联合
```typescript
// ✅ 推荐 - 判别联合类型
interface SuccessResult {
  readonly success: true;
  readonly data: any;
}

interface ErrorResult {
  readonly success: false;
  readonly error: string;
  readonly code: number;
}

type Result = SuccessResult | ErrorResult;

// 类型守卫
function isSuccessResult(result: Result): result is SuccessResult {
  return result.success === true;
}

// 使用示例
function handleResult(result: Result): void {
  if (isSuccessResult(result)) {
    console.log(result.data);  // TypeScript知道这里是SuccessResult
  } else {
    console.error(result.error);  // TypeScript知道这里是ErrorResult
  }
}
```

#### 2.2.3 泛型约束
```typescript
// ✅ 推荐 - 使用泛型约束
interface Identifiable {
  id: string;
}

interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

class EntityManager<T extends Identifiable & Timestamped> {
  private entities = new Map<string, T>();
  
  add(entity: T): void {
    this.entities.set(entity.id, entity);
  }
  
  findRecent(limit: number): T[] {
    return Array.from(this.entities.values())
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, limit);
  }
}
```

### 2.3 函数设计规范

#### 2.3.1 函数签名设计
```typescript
// ✅ 推荐 - 清晰的函数签名
interface CompressMessageOptions {
  maxTokens?: number;
  preserveSystemMessages?: boolean;
  compressionRatio?: number;
}

async function compressMessages(
  messages: readonly Message[],
  options: CompressMessageOptions = {}
): Promise<{
  compressedMessages: Message[];
  compressionRatio: number;
  tokensReduced: number;
}> {
  // 实现
}

// ✅ 推荐 - 使用函数重载
function createTool(name: string, handler: ToolHandler): Tool;
function createTool(config: ToolConfig): Tool;
function createTool(
  nameOrConfig: string | ToolConfig,
  handler?: ToolHandler
): Tool {
  // 实现
}

// ❌ 避免 - 参数过多
function badFunction(a: string, b: number, c: boolean, d: object, e: any[]): void {
  // 避免超过3-4个参数
}
```

#### 2.3.2 错误处理规范
```typescript
// ✅ 推荐 - 明确的错误类型
class ToolExecutionError extends Error {
  constructor(
    message: string,
    public readonly toolName: string,
    public readonly input: unknown,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'ToolExecutionError';
  }
}

class MCPConnectionError extends Error {
  constructor(
    message: string,
    public readonly serverName: string,
    public readonly transport: string,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = 'MCPConnectionError';
  }
}

// 错误处理函数
async function executeToolSafely(tool: Tool, input: unknown): Promise<Result> {
  try {
    const result = await tool.execute(input);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof ToolExecutionError) {
      return { 
        success: false, 
        error: error.message, 
        code: 'TOOL_EXECUTION_FAILED',
        details: { toolName: error.toolName }
      };
    }
    throw error; // 重新抛出未知错误
  }
}
```

## 3. React/UI组件规范

### 3.1 组件设计原则

#### 3.1.1 函数式组件优先
```typescript
// ✅ 推荐 - 函数式组件 + hooks
interface MessageDisplayProps {
  readonly messages: Message[];
  readonly onMessageClick?: (message: Message) => void;
  readonly loading?: boolean;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ 
  messages, 
  onMessageClick,
  loading = false 
}) => {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  
  const toggleExpanded = useCallback((messageId: string) => {
    setExpandedMessages(prev => {
      const next = new Set(prev);
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
      return next;
    });
  }, []);
  
  return (
    <Box flexDirection="column">
      {messages.map(message => (
        <MessageItem 
          key={message.id}
          message={message}
          expanded={expandedMessages.has(message.id)}
          onToggle={toggleExpanded}
          onClick={onMessageClick}
        />
      ))}
      {loading && <LoadingIndicator />}
    </Box>
  );
};
```

#### 3.1.2 Props接口设计
```typescript
// ✅ 推荐 - 明确的Props类型
interface BaseComponentProps {
  readonly className?: string;
  readonly testId?: string;
}

interface ProgressBarProps extends BaseComponentProps {
  readonly progress: number;  // 0-100
  readonly label?: string;
  readonly variant?: 'determinate' | 'indeterminate';
  readonly size?: 'small' | 'medium' | 'large';
  readonly onComplete?: () => void;
}

// 使用泛型Props
interface ListProps<T> extends BaseComponentProps {
  readonly items: readonly T[];
  readonly renderItem: (item: T, index: number) => React.ReactNode;
  readonly keyExtractor: (item: T) => string;
  readonly emptyMessage?: string;
}
```

### 3.2 Hooks使用规范

#### 3.2.1 自定义Hooks
```typescript
// ✅ 推荐 - 自定义hooks
function useTerminalSize() {
  const [size, setSize] = useState({
    columns: process.stdout.columns || 80,
    rows: process.stdout.rows || 24
  });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({
        columns: process.stdout.columns || 80,
        rows: process.stdout.rows || 24
      });
    };
    
    process.stdout.on('resize', handleResize);
    return () => process.stdout.off('resize', handleResize);
  }, []);
  
  return size;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}
```

#### 3.2.2 性能优化
```typescript
// ✅ 推荐 - 使用useMemo和useCallback优化
const ExpensiveComponent: React.FC<Props> = ({ data, onUpdate }) => {
  // 缓存计算结果
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveProcessing(item)
    }));
  }, [data]);
  
  // 缓存事件处理器
  const handleUpdate = useCallback((id: string, value: any) => {
    onUpdate(id, value);
  }, [onUpdate]);
  
  // 缓存渲染结果
  const renderedItems = useMemo(() => {
    return processedData.map(item => (
      <ItemComponent 
        key={item.id}
        item={item}
        onUpdate={handleUpdate}
      />
    ));
  }, [processedData, handleUpdate]);
  
  return <Box>{renderedItems}</Box>;
};
```

## 4. 架构模式规范

### 4.1 模块组织规范

#### 4.1.1 目录结构
```
src/
├── cli/                    # CLI入口和命令处理
│   ├── commands/
│   ├── parsers/
│   └── main.ts
├── core/                   # 核心业务逻辑
│   ├── agent/              # Agent主循环
│   ├── message/            # 消息处理
│   ├── compression/        # 消息压缩
│   └── context/            # 上下文管理
├── tools/                  # 工具系统
│   ├── registry/
│   ├── execution/
│   ├── built-in/
│   └── mcp/
├── ui/                     # 用户界面
│   ├── components/
│   ├── hooks/
│   └── themes/
├── utils/                  # 工具函数
│   ├── logger.ts
│   ├── crypto.ts
│   └── file-system.ts
├── types/                  # 类型定义
│   ├── core.ts
│   ├── tools.ts
│   └── mcp.ts
└── __tests__/              # 测试文件
    ├── unit/
    ├── integration/
    └── e2e/
```

#### 4.1.2 模块导出规范
```typescript
// ✅ 推荐 - index.ts统一导出
// src/tools/index.ts
export { ToolRegistry } from './registry/tool-registry';
export { ExecutionEngine } from './execution/execution-engine';
export { type Tool, type ToolResult } from './types';

// 分类导出
export * as BuiltInTools from './built-in';
export * as MCPTools from './mcp';

// src/tools/built-in/index.ts
export { ReadTool } from './read-tool';
export { WriteTool } from './write-tool';
export { EditTool } from './edit-tool';
export { BashTool } from './bash-tool';

// 默认导出聚合
export const DEFAULT_TOOLS = [
  ReadTool,
  WriteTool,
  EditTool,
  BashTool
] as const;
```

### 4.2 依赖注入规范

#### 4.2.1 容器设计
```typescript
// ✅ 推荐 - 简单的依赖注入容器
class Container {
  private instances = new Map<string, any>();
  private factories = new Map<string, () => any>();
  
  register<T>(key: string, factory: () => T): void {
    this.factories.set(key, factory);
  }
  
  registerSingleton<T>(key: string, factory: () => T): void {
    this.register(key, () => {
      if (!this.instances.has(key)) {
        this.instances.set(key, factory());
      }
      return this.instances.get(key);
    });
  }
  
  resolve<T>(key: string): T {
    const factory = this.factories.get(key);
    if (!factory) {
      throw new Error(`No registration found for ${key}`);
    }
    return factory();
  }
}

// 注册服务
const container = new Container();

container.registerSingleton('logger', () => new Logger());
container.registerSingleton('config', () => loadConfiguration());
container.register('toolRegistry', () => 
  new ToolRegistry(container.resolve('logger'))
);
```

### 4.3 事件系统规范

#### 4.3.1 事件定义
```typescript
// ✅ 推荐 - 类型安全的事件系统
interface EventMap {
  'tool:started': { toolName: string; input: unknown };
  'tool:completed': { toolName: string; result: ToolResult; duration: number };
  'tool:failed': { toolName: string; error: Error };
  'message:received': { message: Message };
  'session:saved': { sessionId: string };
}

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners = new Map<keyof T, Set<(data: any) => void>>();
  
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }
  
  emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }
  
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(listener);
    }
  }
}

// 使用
const eventBus = new TypedEventEmitter<EventMap>();

eventBus.on('tool:completed', ({ toolName, result, duration }) => {
  console.log(`Tool ${toolName} completed in ${duration}ms`);
});
```

## 5. 测试规范

### 5.1 测试结构规范

#### 5.1.1 测试文件组织
```typescript
// ✅ 推荐 - 与源码对应的测试结构
__tests__/
├── unit/
│   ├── core/
│   │   ├── agent-core.test.ts
│   │   └── message-compressor.test.ts
│   └── tools/
│       ├── read-tool.test.ts
│       └── execution-engine.test.ts
├── integration/
│   ├── mcp-integration.test.ts
│   └── tool-coordination.test.ts
└── e2e/
    ├── user-workflows.test.ts
    └── session-management.test.ts
```

#### 5.1.2 测试编写规范
```typescript
// ✅ 推荐 - 明确的测试结构
describe('MessageCompressor', () => {
  let compressor: MessageCompressor;
  let mockLLMClient: jest.Mocked<LLMClient>;
  
  beforeEach(() => {
    mockLLMClient = createMockLLMClient();
    compressor = new MessageCompressor(mockLLMClient);
  });
  
  describe('shouldCompress', () => {
    it('should return true when message count exceeds threshold', async () => {
      // Arrange
      const messages = Array(101).fill(null).map((_, i) => 
        createTestMessage(`Message ${i}`)
      );
      
      // Act
      const result = await compressor.shouldCompress(messages);
      
      // Assert
      expect(result).toBe(true);
    });
    
    it('should return false for small message sets', async () => {
      // Arrange
      const messages = [createTestMessage('Single message')];
      
      // Act
      const result = await compressor.shouldCompress(messages);
      
      // Assert
      expect(result).toBe(false);
    });
  });
  
  describe('compress', () => {
    it('should preserve system messages during compression', async () => {
      // Arrange
      const messages = [
        createTestMessage('User message 1'),
        createSystemMessage('System reminder'),
        createTestMessage('User message 2')
      ];
      
      mockLLMClient.complete.mockResolvedValue(
        createMockCompletion('Compressed summary')
      );
      
      // Act
      const result = await compressor.compress(messages, {});
      
      // Assert
      expect(result.wasCompacted).toBe(true);
      expect(result.messages).toHaveLength(2); // summary + system message
      expect(result.messages.some(m => m.isMeta)).toBe(true);
    });
  });
});
```

### 5.2 Mock和测试工具

#### 5.2.1 工厂函数
```typescript
// ✅ 推荐 - 测试数据工厂
export class TestDataFactory {
  static createMessage(overrides: Partial<Message> = {}): Message {
    return {
      id: `msg-${Date.now()}-${Math.random()}`,
      type: 'user',
      role: 'user',
      content: 'Test message',
      timestamp: new Date().toISOString(),
      isMeta: false,
      uuid: crypto.randomUUID(),
      ...overrides
    };
  }
  
  static createToolCall(toolName: string, input: unknown = {}): ToolCall {
    return {
      id: `tool-${Date.now()}`,
      toolName,
      input,
      timestamp: new Date().toISOString()
    };
  }
  
  static createMCPServer(name: string): MCPServer {
    return {
      name,
      config: {
        command: 'test-server',
        transport: 'stdio'
      },
      status: 'connected',
      tools: [],
      resources: []
    };
  }
}
```

## 6. 日志和错误处理规范

### 6.1 日志系统

#### 6.1.1 日志级别和格式
```typescript
// ✅ 推荐 - 结构化日志
enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
}

class Logger {
  constructor(
    private context: Record<string, any> = {},
    private minLevel: LogLevel = LogLevel.INFO
  ) {}
  
  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, { ...context, error });
  }
  
  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }
  
  debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context);
  }
  
  private log(level: LogLevel, message: string, context?: Record<string, any>): void {
    if (level > this.minLevel) return;
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: { ...this.context, ...context }
    };
    
    console.log(JSON.stringify(entry));
  }
  
  child(context: Record<string, any>): Logger {
    return new Logger({ ...this.context, ...context }, this.minLevel);
  }
}

// 使用示例
const logger = new Logger({ component: 'AgentCore' });
const toolLogger = logger.child({ tool: 'ReadTool' });

toolLogger.info('Tool execution started', { 
  input: '/path/to/file.txt',
  timeout: 30000 
});
```

### 6.2 错误处理模式

#### 6.2.1 Result模式
```typescript
// ✅ 推荐 - Result模式避免异常
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function safeExecute<T>(
  operation: () => Promise<T>
): Promise<Result<T>> {
  try {
    const data = await operation();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
}

// 使用示例
async function processFile(path: string): Promise<Result<string>> {
  const readResult = await safeExecute(() => fs.readFile(path, 'utf-8'));
  if (!readResult.success) {
    return { success: false, error: readResult.error };
  }
  
  const processResult = await safeExecute(() => processContent(readResult.data));
  if (!processResult.success) {
    return { success: false, error: processResult.error };
  }
  
  return { success: true, data: processResult.data };
}
```

## 7. 性能优化规范

### 7.1 异步操作优化

#### 7.1.1 并发控制
```typescript
// ✅ 推荐 - 信号量控制并发
class Semaphore {
  private permits: number;
  private waiting: Array<() => void> = [];
  
  constructor(permits: number) {
    this.permits = permits;
  }
  
  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }
    
    return new Promise<void>(resolve => {
      this.waiting.push(resolve);
    });
  }
  
  release(): void {
    if (this.waiting.length > 0) {
      const next = this.waiting.shift()!;
      next();
    } else {
      this.permits++;
    }
  }
}

// 使用示例
class ConcurrentExecutor {
  private semaphore = new Semaphore(10); // 最多10个并发
  
  async executeMany<T>(
    tasks: Array<() => Promise<T>>
  ): Promise<T[]> {
    return Promise.all(tasks.map(task => this.executeOne(task)));
  }
  
  private async executeOne<T>(task: () => Promise<T>): Promise<T> {
    await this.semaphore.acquire();
    try {
      return await task();
    } finally {
      this.semaphore.release();
    }
  }
}
```

### 7.2 内存管理

#### 7.2.1 LRU缓存
```typescript
// ✅ 推荐 - LRU缓存实现
class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;
  
  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }
  
  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // 移到最前面
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // 删除最旧的项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  
  clear(): void {
    this.cache.clear();
  }
}
```

## 8. 工具配置

### 8.1 ESLint配置
```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    // 强制类型安全
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    
    // 命名约定
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase']
      },
      {
        selector: 'class',
        format: ['PascalCase']
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE']
      }
    ],
    
    // 代码质量
    'complexity': ['error', 10],
    'max-lines': ['error', 500],
    'max-params': ['error', 4],
    'max-depth': ['error', 4]
  }
};
```

### 8.2 Prettier配置
```javascript
// .prettierrc.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf'
};
```

### 8.3 TypeScript配置
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "declaration": true,
    "outDir": "./dist",
    "sourceMap": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
```

## 9. 代码审查清单

### 9.1 功能审查
- [ ] 代码实现了预期功能
- [ ] 边界条件处理正确
- [ ] 错误处理完善
- [ ] 性能满足要求
- [ ] 安全考虑充分

### 9.2 代码质量审查
- [ ] 命名清晰易懂
- [ ] 函数职责单一
- [ ] 类设计合理
- [ ] 依赖关系清晰
- [ ] 重复代码已消除

### 9.3 测试审查
- [ ] 单元测试覆盖主要逻辑
- [ ] 集成测试验证组件协作
- [ ] 边界条件有测试覆盖
- [ ] 异常情况有测试验证
- [ ] 测试代码质量良好

### 9.4 文档审查
- [ ] 代码注释清晰准确
- [ ] API文档完整
- [ ] 使用示例充分
- [ ] 变更记录及时更新

## 10. 持续集成和质量保证

### 10.1 预提交检查
```bash
#!/bin/bash
# pre-commit hook

echo "Running pre-commit checks..."

# 1. 类型检查
npm run type-check
if [ $? -ne 0 ]; then
  echo "❌ Type check failed"
  exit 1
fi

# 2. 代码风格检查
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed"
  exit 1
fi

# 3. 格式化检查
npm run format:check
if [ $? -ne 0 ]; then
  echo "❌ Format check failed"
  exit 1
fi

# 4. 运行测试
npm run test:unit
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed"
  exit 1
fi

echo "✅ All pre-commit checks passed"
```

### 10.2 质量门控
```yaml
# 质量门控标准
quality_gates:
  test_coverage:
    threshold: 80%
    type: "line_coverage"
  
  code_smells:
    threshold: 0
    severity: "major"
  
  complexity:
    threshold: 10
    type: "cyclomatic"
  
  duplications:
    threshold: 3%
    type: "duplicated_lines"
  
  maintainability:
    threshold: "A"
    type: "maintainability_rating"
```

这个编码风格指南确保了Open Claude Code项目的代码质量和一致性，为团队协作和项目维护提供了统一的标准。

---

*本编码风格指南基于TypeScript和现代前端开发最佳实践制定。*