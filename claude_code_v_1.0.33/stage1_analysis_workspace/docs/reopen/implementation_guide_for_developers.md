# Open Claude Code - 外包程序员施工指南

## 📖 使用说明

本文档专为**初级程序员**设计，提供**无脑操作**的详细步骤。只需按照本文档的指导，即可完成Open Claude Code项目的完整开发。

**重要提醒**：
- ✅ 严格按照步骤顺序执行
- ✅ 每完成一个步骤都要测试验证
- ✅ 遇到问题查看FAQ部分
- ❌ 不要跳过任何步骤
- ❌ 不要修改已提供的代码模板

## 🎯 项目总览

### 项目目标
开发一个99%复现Claude Code功能的开源AI编程助手工具

### 技术栈
- **语言**: TypeScript + Node.js 18+
- **UI框架**: React + Ink (终端UI)
- **CLI框架**: Commander.js
- **AI集成**: Anthropic Claude API + OpenAI API
- **插件系统**: MCP (Model Context Protocol)

### 最终交付物
一个完整的命令行工具，用户可以通过`claude`命令启动AI编程助手。

---

## 🏗️ 第一阶段：项目初始化 (第1-2周)

### 步骤1.1：环境准备

#### 1.1.1 安装必需软件
```bash
# 检查Node.js版本（必须>=18）
node --version

# 如果版本不够，访问 https://nodejs.org 下载安装最新LTS版本

# 验证npm
npm --version

# 安装pnpm（可选，性能更好）
npm install -g pnpm
```

#### 1.1.2 创建项目目录
```bash
# 创建项目根目录
mkdir open-claude-code
cd open-claude-code

# 初始化git仓库
git init
```

### 步骤1.2：初始化Node.js项目

#### 1.2.1 创建package.json
创建文件：`package.json`
```json
{
  "name": "open-claude-code",
  "version": "1.0.0",
  "description": "Open source AI programming assistant",
  "main": "dist/cli.js",
  "bin": {
    "claude": "./dist/cli.js"
  },
  "scripts": {
    "build": "tsc && chmod +x dist/cli.js",
    "dev": "tsx src/cli.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "commander": "^11.1.0",
    "ink": "^4.4.1",
    "react": "^18.2.0",
    "anthropic": "^0.20.0",
    "openai": "^4.28.0",
    "ws": "^8.16.0",
    "node-fetch": "^3.3.2",
    "chalk": "^5.3.0",
    "ora": "^7.0.1",
    "inquirer": "^9.2.12"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "@types/ws": "^8.5.10",
    "@types/inquirer": "^9.0.7",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.0",
    "typescript": "^5.3.0",
    "tsx": "^4.7.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.1.0"
  },
  "keywords": ["ai", "programming", "assistant", "cli", "claude"],
  "author": "Open Claude Code Team",
  "license": "MIT"
}
```

#### 1.2.2 安装依赖
```bash
# 安装所有依赖
npm install

# 或使用pnpm（如果已安装）
pnpm install
```

### 步骤1.3：TypeScript配置

#### 1.3.1 创建tsconfig.json
创建文件：`tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "__tests__"]
}
```

### 步骤1.4：创建基础目录结构

```bash
# 创建所有必需目录
mkdir -p src/cli
mkdir -p src/core/agent
mkdir -p src/core/message  
mkdir -p src/core/compression
mkdir -p src/core/context
mkdir -p src/tools/registry
mkdir -p src/tools/execution
mkdir -p src/tools/built-in
mkdir -p src/tools/mcp
mkdir -p src/ui/components
mkdir -p src/ui/hooks
mkdir -p src/utils
mkdir -p src/types
mkdir -p __tests__/unit
mkdir -p __tests__/integration
mkdir -p __tests__/e2e
```

### 步骤1.5：创建基础类型定义

#### 1.5.1 创建核心类型
创建文件：`src/types/core.ts`
```typescript
// 核心消息类型
export interface Message {
  readonly id: string;
  readonly type: 'user' | 'assistant' | 'system';
  readonly role: 'user' | 'assistant' | 'system';
  readonly content: string | ContentBlock[];
  readonly timestamp: string;
  readonly isMeta?: boolean;
  readonly isCompactSummary?: boolean;
  readonly uuid: string;
}

export interface ContentBlock {
  type: 'text' | 'image' | 'tool_use' | 'tool_result';
  content: string;
}

// Agent配置类型
export interface AgentConfig {
  model: string;
  fallbackModel?: string;
  maxConcurrency: number;
  timeout: number;
  debug: boolean;
}

// 会话类型
export interface Session {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  metadata: SessionMetadata;
}

export interface SessionMetadata {
  messageCount: number;
  toolsUsed: string[];
  duration: number;
}

// 上下文类型
export interface Context {
  directoryStructure?: string;
  gitStatus?: string;
  claudeMd?: string;
  todoList?: TodoItem[];
}

export interface TodoItem {
  id: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}
```

#### 1.5.2 创建工具类型
创建文件：`src/types/tools.ts`
```typescript
// 工具基础接口
export interface Tool {
  name: string;
  description: string;
  inputSchema: any;
  
  // 核心方法
  execute(input: any, context: ToolContext): Promise<ToolResult>;
  isConcurrencySafe(): boolean;
  userFacingName(): string;
  
  // 可选方法
  checkPermissions?(input: any, context: ToolContext): Promise<PermissionResult>;
  aliases?: string[];
}

export interface ToolContext {
  sessionId: string;
  permissions: Permission[];
  workingDirectory: string;
  environment: Record<string, string>;
}

export interface ToolResult {
  success: boolean;
  content: string;
  metadata?: Record<string, any>;
  error?: string;
}

export interface ToolCall {
  id: string;
  toolName: string;
  input: any;
  timestamp: string;
}

export interface Permission {
  type: 'file' | 'network' | 'system';
  resource: string;
  level: 'read' | 'write' | 'execute';
}

export interface PermissionResult {
  behavior: 'allow' | 'deny' | 'ask';
  message?: string;
  updatedInput?: any;
}

// 内置工具枚举
export enum BuiltinTools {
  READ = 'Read',
  WRITE = 'Write',
  EDIT = 'Edit',
  BASH = 'Bash',
  LS = 'LS',
  GLOB = 'Glob',
  GREP = 'Grep',
  TODO_READ = 'TodoRead',
  TODO_WRITE = 'TodoWrite',
  TASK = 'Task',
  WEB_FETCH = 'WebFetch',
  WEB_SEARCH = 'WebSearch'
}
```

**验证步骤1**：
```bash
# 运行类型检查确保没有错误
npm run type-check

# 应该看到 "Compilation completed without errors"
```

---

## 🔧 第二阶段：CLI框架开发 (第3-4周)

### 步骤2.1：创建CLI入口

#### 2.1.1 创建主CLI文件
创建文件：`src/cli.ts`
```typescript
#!/usr/bin/env node

import { Command } from 'commander';
import { CLIApplication } from './cli/cli-application';
import { VERSION } from './utils/constants';

async function main(): Promise<void> {
  const program = new Command();
  
  program
    .name('claude')
    .description('Open Claude Code - AI Programming Assistant')
    .version(VERSION)
    .argument('[prompt]', 'Your prompt', String)
    .option('-d, --debug', 'Enable debug mode')
    .option('--verbose', 'Enable verbose output')
    .option('-p, --print', 'Print response and exit (non-interactive)')
    .option('-c, --continue', 'Continue recent conversation')
    .option('-r, --resume [sessionId]', 'Resume specific session')
    .option('--model <model>', 'Specify model to use')
    .option('--fallback-model <model>', 'Specify fallback model')
    .option('--mcp-config <config>', 'MCP server configuration')
    .action(async (prompt, options) => {
      try {
        const app = new CLIApplication();
        await app.initialize();
        
        if (options.print) {
          await app.runPrintMode(prompt, options);
        } else {
          await app.runInteractiveMode(prompt, options);
        }
      } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : error);
        process.exit(1);
      }
    });
  
  await program.parseAsync();
}

// 错误处理
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

if (require.main === module) {
  main();
}
```

#### 2.1.2 创建常量文件
创建文件：`src/utils/constants.ts`
```typescript
export const VERSION = '1.0.0';
export const APP_NAME = 'Open Claude Code';
export const MAX_CONCURRENT_TOOLS = 10;
export const DEFAULT_TIMEOUT = 30000;
export const CONFIG_DIR = '.claude';
export const SESSIONS_DIR = 'sessions';
export const CACHE_DIR = 'cache';

export const SUPPORTED_MODELS = [
  'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku-20241022',
  'gpt-4o',
  'gpt-4o-mini'
] as const;

export const DEFAULT_CONFIG = {
  model: 'claude-3-5-sonnet-20241022',
  maxConcurrency: MAX_CONCURRENT_TOOLS,
  timeout: DEFAULT_TIMEOUT,
  debug: false
} as const;
```

### 步骤2.2：创建CLI应用类

#### 2.2.1 创建CLI应用主类
创建文件：`src/cli/cli-application.ts`
```typescript
import React from 'react';
import { render } from 'ink';
import { AgentCore } from '../core/agent/agent-core';
import { ToolRegistry } from '../tools/registry/tool-registry';
import { ConfigManager } from '../utils/config-manager';
import { Logger } from '../utils/logger';
import { MainApp } from '../ui/components/main-app';
import { AgentConfig, Session } from '../types/core';

export interface CLIOptions {
  debug?: boolean;
  verbose?: boolean;
  print?: boolean;
  continue?: boolean;
  resume?: string;
  model?: string;
  fallbackModel?: string;
  mcpConfig?: string;
}

export class CLIApplication {
  private agentCore!: AgentCore;
  private toolRegistry!: ToolRegistry;
  private configManager!: ConfigManager;
  private logger!: Logger;
  private currentSession: Session | null = null;
  
  async initialize(): Promise<void> {
    // 1. 初始化日志系统
    this.logger = new Logger({ component: 'CLIApplication' });
    this.logger.info('Initializing CLI application');
    
    // 2. 初始化配置管理器
    this.configManager = new ConfigManager();
    await this.configManager.initialize();
    
    // 3. 初始化工具注册表
    this.toolRegistry = new ToolRegistry();
    await this.toolRegistry.registerBuiltinTools();
    
    // 4. 初始化Agent核心
    this.agentCore = new AgentCore(this.toolRegistry, this.configManager);
    await this.agentCore.initialize();
    
    this.logger.info('CLI application initialized successfully');
  }
  
  async runPrintMode(prompt?: string, options: CLIOptions = {}): Promise<void> {
    if (!prompt) {
      console.error('Prompt is required in print mode');
      process.exit(1);
    }
    
    try {
      this.logger.info('Running in print mode', { prompt });
      
      const config = this.buildConfig(options);
      const response = await this.agentCore.processMessage(prompt, config);
      
      console.log(response.content);
    } catch (error) {
      this.logger.error('Error in print mode', error as Error);
      throw error;
    }
  }
  
  async runInteractiveMode(initialPrompt?: string, options: CLIOptions = {}): Promise<void> {
    try {
      this.logger.info('Running in interactive mode');
      
      const config = this.buildConfig(options);
      
      // 恢复会话（如果指定）
      if (options.resume) {
        this.currentSession = await this.loadSession(options.resume);
      }
      
      // 渲染React UI
      const { unmount } = render(React.createElement(MainApp, {
        agentCore: this.agentCore,
        initialPrompt,
        initialSession: this.currentSession,
        config,
        onExit: () => {
          unmount();
          process.exit(0);
        }
      }));
      
    } catch (error) {
      this.logger.error('Error in interactive mode', error as Error);
      throw error;
    }
  }
  
  private buildConfig(options: CLIOptions): AgentConfig {
    const baseConfig = this.configManager.getConfig();
    
    return {
      ...baseConfig,
      model: options.model || baseConfig.model,
      fallbackModel: options.fallbackModel || baseConfig.fallbackModel,
      debug: options.debug || baseConfig.debug
    };
  }
  
  private async loadSession(sessionId: string): Promise<Session> {
    // TODO: 实现会话加载逻辑
    throw new Error('Session loading not implemented yet');
  }
}
```

### 步骤2.3：创建基础工具类

#### 2.3.1 创建Logger工具
创建文件：`src/utils/logger.ts`
```typescript
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
}

export class Logger {
  constructor(
    private context: Record<string, any> = {},
    private minLevel: LogLevel = LogLevel.INFO
  ) {}
  
  error(message: string, error?: Error, context?: Record<string, any>): void {
    this.log(LogLevel.ERROR, message, { ...context, error });
  }
  
  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
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
    
    // 在开发环境输出到控制台
    if (process.env.NODE_ENV === 'development') {
      const levelName = LogLevel[level];
      console.log(`[${entry.timestamp}] ${levelName}: ${message}`, context || '');
    }
  }
  
  child(context: Record<string, any>): Logger {
    return new Logger({ ...this.context, ...context }, this.minLevel);
  }
}
```

#### 2.3.2 创建配置管理器
创建文件：`src/utils/config-manager.ts`
```typescript
import { promises as fs } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { AgentConfig } from '../types/core';
import { DEFAULT_CONFIG, CONFIG_DIR } from './constants';

export class ConfigManager {
  private config: AgentConfig = DEFAULT_CONFIG;
  private configPath: string;
  
  constructor() {
    this.configPath = join(homedir(), CONFIG_DIR, 'settings.json');
  }
  
  async initialize(): Promise<void> {
    try {
      await this.ensureConfigDirectory();
      await this.loadConfig();
    } catch (error) {
      console.warn('Failed to load config, using defaults:', error);
    }
  }
  
  getConfig(): AgentConfig {
    return { ...this.config };
  }
  
  async updateConfig(updates: Partial<AgentConfig>): Promise<void> {
    this.config = { ...this.config, ...updates };
    await this.saveConfig();
  }
  
  private async ensureConfigDirectory(): Promise<void> {
    const configDir = join(homedir(), CONFIG_DIR);
    try {
      await fs.mkdir(configDir, { recursive: true });
    } catch (error) {
      // 目录可能已存在，忽略错误
    }
  }
  
  private async loadConfig(): Promise<void> {
    try {
      const data = await fs.readFile(this.configPath, 'utf-8');
      const loadedConfig = JSON.parse(data);
      this.config = { ...DEFAULT_CONFIG, ...loadedConfig };
    } catch (error) {
      // 配置文件不存在或格式错误，使用默认配置
      this.config = DEFAULT_CONFIG;
    }
  }
  
  private async saveConfig(): Promise<void> {
    const data = JSON.stringify(this.config, null, 2);
    await fs.writeFile(this.configPath, data, 'utf-8');
  }
}
```

**验证步骤2**：
```bash
# 构建项目
npm run build

# 测试CLI基础功能
node dist/cli.js --help

# 应该看到帮助信息输出
```

---

## ⚙️ 第三阶段：Agent核心开发 (第5-8周)

### 步骤3.1：创建Agent主循环

#### 3.1.1 创建Agent核心类
创建文件：`src/core/agent/agent-core.ts`
```typescript
import { Message, AgentConfig, Context } from '../../types/core';
import { ToolRegistry } from '../../tools/registry/tool-registry';
import { ConfigManager } from '../../utils/config-manager';
import { MessageCompressor } from '../message/message-compressor';
import { ContextInjector } from '../context/context-injector';
import { Logger } from '../../utils/logger';

export interface ResponseChunk {
  type: 'text' | 'tool_use' | 'tool_result' | 'thinking';
  content: string;
  metadata?: Record<string, any>;
}

export class AgentCore {
  private logger: Logger;
  private messageCompressor: MessageCompressor;
  private contextInjector: ContextInjector;
  
  constructor(
    private toolRegistry: ToolRegistry,
    private configManager: ConfigManager
  ) {
    this.logger = new Logger({ component: 'AgentCore' });
    this.messageCompressor = new MessageCompressor();
    this.contextInjector = new ContextInjector();
  }
  
  async initialize(): Promise<void> {
    this.logger.info('Initializing Agent Core');
    // 初始化子系统
    await this.messageCompressor.initialize();
    await this.contextInjector.initialize();
    this.logger.info('Agent Core initialized');
  }
  
  // 主循环 - 基于nO函数的设计
  async* mainLoop(
    messages: Message[],
    config: AgentConfig,
    context: Context
  ): AsyncGenerator<ResponseChunk> {
    this.logger.debug('Starting main loop', { messageCount: messages.length });
    
    // 1. 消息压缩检查 (基于wU2函数)
    const { messages: compactedMessages, wasCompacted } = 
      await this.messageCompressor.compressIfNeeded(messages, config);
    
    if (wasCompacted) {
      this.logger.info('Messages were compressed');
    }
    
    let shouldContinue = true;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (shouldContinue && attempts < maxAttempts) {
      attempts++;
      
      try {
        // 2. 上下文注入 (基于Ie1函数)
        const enrichedMessages = await this.contextInjector.injectContext(
          compactedMessages, 
          context
        );
        
        // 3. 调用LLM API生成响应
        for await (const chunk of this.streamGeneration(enrichedMessages, config)) {
          yield chunk;
          
          // 检查是否需要继续
          if (chunk.type === 'tool_result' && this.shouldContinueAfterTools(chunk)) {
            // 递归调用继续对话
            const newMessages = [...enrichedMessages, this.createAssistantMessage(chunk)];
            yield* this.mainLoop(newMessages, config, context);
            return;
          }
        }
        
        shouldContinue = false;
        
      } catch (error) {
        this.logger.error('Error in main loop', error as Error);
        
        // 模型降级处理
        if (this.isModelError(error) && config.fallbackModel) {
          this.logger.info('Attempting model fallback', {
            from: config.model,
            to: config.fallbackModel
          });
          
          config.model = config.fallbackModel;
          continue;
        }
        
        throw error;
      }
    }
    
    if (attempts >= maxAttempts) {
      this.logger.warn('Max attempts reached, stopping main loop');
    }
  }
  
  // 简化的单次处理方法
  async processMessage(prompt: string, config: AgentConfig): Promise<{ content: string }> {
    const message: Message = {
      id: this.generateId(),
      type: 'user',
      role: 'user',
      content: prompt,
      timestamp: new Date().toISOString(),
      uuid: this.generateUUID()
    };
    
    const context: Context = await this.gatherContext();
    let fullResponse = '';
    
    for await (const chunk of this.mainLoop([message], config, context)) {
      if (chunk.type === 'text') {
        fullResponse += chunk.content;
      }
    }
    
    return { content: fullResponse };
  }
  
  private async* streamGeneration(
    messages: Message[], 
    config: AgentConfig
  ): AsyncGenerator<ResponseChunk> {
    // TODO: 实现实际的LLM API调用
    // 这里先返回一个模拟响应
    yield {
      type: 'text',
      content: `Mock response for: ${messages[messages.length - 1]?.content}`
    };
  }
  
  private shouldContinueAfterTools(chunk: ResponseChunk): boolean {
    // 基于Claude Code的递归调用逻辑
    return chunk.metadata?.needsContinuation === true;
  }
  
  private createAssistantMessage(chunk: ResponseChunk): Message {
    return {
      id: this.generateId(),
      type: 'assistant',
      role: 'assistant',
      content: chunk.content,
      timestamp: new Date().toISOString(),
      uuid: this.generateUUID()
    };
  }
  
  private isModelError(error: any): boolean {
    return error.name === 'ModelError' || error.status === 429 || error.status === 503;
  }
  
  private async gatherContext(): Promise<Context> {
    // TODO: 实现上下文收集
    return {};
  }
  
  private generateId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
```

### 步骤3.2：创建消息压缩系统

#### 3.2.1 创建消息压缩器
创建文件：`src/core/message/message-compressor.ts`
```typescript
import { Message, AgentConfig } from '../../types/core';
import { Logger } from '../../utils/logger';

export interface CompressionResult {
  messages: Message[];
  wasCompacted: boolean;
  compressionRatio?: number;
  tokensReduced?: number;
}

export interface CompressionOptions {
  maxTokens?: number;
  preserveSystemMessages?: boolean;
  preserveRecentMessages?: number;
}

export class MessageCompressor {
  private logger: Logger;
  
  constructor() {
    this.logger = new Logger({ component: 'MessageCompressor' });
  }
  
  async initialize(): Promise<void> {
    this.logger.debug('Message compressor initialized');
  }
  
  // 基于wU2函数的压缩检查逻辑
  async compressIfNeeded(
    messages: Message[], 
    config: AgentConfig,
    options: CompressionOptions = {}
  ): Promise<CompressionResult> {
    // 1. 检查是否需要压缩
    const shouldCompress = await this.shouldCompress(messages, options);
    
    if (!shouldCompress) {
      return {
        messages,
        wasCompacted: false
      };
    }
    
    // 2. 执行压缩
    try {
      const compressedMessages = await this.performCompression(messages, options);
      
      this.logger.info('Messages compressed successfully', {
        originalCount: messages.length,
        compressedCount: compressedMessages.length
      });
      
      return {
        messages: compressedMessages,
        wasCompacted: true,
        compressionRatio: compressedMessages.length / messages.length
      };
      
    } catch (error) {
      this.logger.error('Compression failed, using original messages', error as Error);
      
      // 压缩失败时返回原始消息
      return {
        messages,
        wasCompacted: false
      };
    }
  }
  
  private async shouldCompress(
    messages: Message[],
    options: CompressionOptions
  ): Promise<boolean> {
    // 估算token数量
    const estimatedTokens = this.estimateTokens(messages);
    const maxTokens = options.maxTokens || 100000;
    
    // 检查消息数量
    const messageCount = messages.length;
    const maxMessages = 100;
    
    // 检查内容长度
    const totalLength = messages.reduce((sum, msg) => 
      sum + (typeof msg.content === 'string' ? msg.content.length : 0), 0
    );
    const maxLength = 500000;
    
    return estimatedTokens > maxTokens || 
           messageCount > maxMessages || 
           totalLength > maxLength;
  }
  
  private async performCompression(
    messages: Message[],
    options: CompressionOptions = {}
  ): Promise<Message[]> {
    const preserveRecentCount = options.preserveRecentMessages || 10;
    
    // 1. 分离不同类型的消息
    const systemMessages = messages.filter(m => m.isMeta || m.type === 'system');
    const recentMessages = messages.slice(-preserveRecentCount);
    const messagesToCompress = messages.slice(0, -(preserveRecentCount));
    
    // 2. 生成摘要
    const summary = await this.generateSummary(messagesToCompress);
    
    // 3. 组合最终消息列表
    return [
      summary,
      ...systemMessages.filter(m => !messagesToCompress.includes(m)),
      ...recentMessages
    ];
  }
  
  private async generateSummary(messages: Message[]): Promise<Message> {
    // 基于AU2函数的8段式摘要模板
    const summaryTemplate = this.createSummaryPrompt();
    
    // TODO: 调用LLM API生成摘要
    // 这里先返回一个基础摘要
    const summaryContent = this.createBasicSummary(messages);
    
    return {
      id: this.generateId(),
      type: 'user',
      role: 'user',
      content: summaryContent,
      timestamp: new Date().toISOString(),
      isMeta: true,
      isCompactSummary: true,
      uuid: this.generateUUID()
    };
  }
  
  private createSummaryPrompt(): string {
    return `Your task is to create a detailed summary of the conversation history. Structure your summary with these 8 sections:

1. Primary Request and Intent: Capture all of the user's explicit requests
2. Key Technical Concepts: List all important technical concepts discussed
3. Files and Code Sections: Enumerate specific files and code sections mentioned
4. Errors and fixes: List all errors that were encountered and how they were resolved
5. Problem Solving: Document problems solved and approaches taken
6. All user messages: List ALL user messages in chronological order
7. Pending Tasks: Outline any pending tasks or incomplete work
8. Current Work: Describe precisely what was being worked on when this summary was created`;
  }
  
  private createBasicSummary(messages: Message[]): string {
    const userMessages = messages.filter(m => m.type === 'user');
    const assistantActions = messages.filter(m => m.type === 'assistant');
    
    return `<conversation-summary>
This is a summary of ${messages.length} messages from the conversation.

Key user requests:
${userMessages.slice(0, 5).map((m, i) => 
  `${i + 1}. ${typeof m.content === 'string' ? m.content.slice(0, 100) : '[complex content]'}`
).join('\n')}

Assistant actions taken: ${assistantActions.length} responses provided

Recent activity focused on: ${this.extractRecentActivity(messages)}
</conversation-summary>`;
  }
  
  private extractRecentActivity(messages: Message[]): string {
    const recentMessages = messages.slice(-3);
    const topics = recentMessages
      .filter(m => m.type === 'user')
      .map(m => typeof m.content === 'string' ? m.content.slice(0, 50) : 'complex interaction')
      .join(', ');
    
    return topics || 'general conversation';
  }
  
  private estimateTokens(messages: Message[]): number {
    // 简单的token估算：约4个字符 = 1个token
    const totalChars = messages.reduce((sum, msg) => {
      if (typeof msg.content === 'string') {
        return sum + msg.content.length;
      }
      return sum + 100; // 复杂内容的估算
    }, 0);
    
    return Math.ceil(totalChars / 4);
  }
  
  private generateId(): string {
    return `summary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
```

### 步骤3.3：创建上下文注入系统

#### 3.3.1 创建上下文注入器
创建文件：`src/core/context/context-injector.ts`
```typescript
import { promises as fs } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { Message, Context } from '../../types/core';
import { Logger } from '../../utils/logger';

const execAsync = promisify(exec);

export class ContextInjector {
  private logger: Logger;
  
  constructor() {
    this.logger = new Logger({ component: 'ContextInjector' });
  }
  
  async initialize(): Promise<void> {
    this.logger.debug('Context injector initialized');
  }
  
  // 基于Ie1函数的上下文注入逻辑
  async injectContext(messages: Message[], context: Context): Promise<Message[]> {
    const contextInfo = await this.gatherContextInfo();
    
    // 只在有上下文信息时注入
    if (Object.keys(contextInfo).length === 0) {
      return messages;
    }
    
    // 生成system-reminder
    const reminder = this.createSystemReminder(contextInfo);
    
    // 前置注入到消息队列
    return [reminder, ...messages];
  }
  
  private async gatherContextInfo(): Promise<Record<string, string>> {
    const info: Record<string, string> = {};
    
    try {
      // 1. 收集目录结构
      const directoryStructure = await this.getDirectoryStructure();
      if (directoryStructure) {
        info['directory-structure'] = directoryStructure;
      }
      
      // 2. 收集Git状态
      const gitStatus = await this.getGitStatus();
      if (gitStatus) {
        info['git-status'] = gitStatus;
      }
      
      // 3. 收集CLAUDE.md配置
      const claudeMd = await this.getClaudeMd();
      if (claudeMd) {
        info['claude-config'] = claudeMd;
      }
      
      // 4. 发送遥测数据
      this.sendTelemetry(info);
      
    } catch (error) {
      this.logger.warn('Error gathering context info', { error });
    }
    
    return info;
  }
  
  private async getDirectoryStructure(): Promise<string | null> {
    try {
      const { stdout } = await execAsync('find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" | head -50');
      return stdout.trim();
    } catch (error) {
      this.logger.debug('Could not get directory structure', { error });
      return null;
    }
  }
  
  private async getGitStatus(): Promise<string | null> {
    try {
      const { stdout } = await execAsync('git status --porcelain');
      return stdout.trim();
    } catch (error) {
      this.logger.debug('Could not get git status', { error });
      return null;
    }
  }
  
  private async getClaudeMd(): Promise<string | null> {
    try {
      const claudePath = join(process.cwd(), 'CLAUDE.md');
      const content = await fs.readFile(claudePath, 'utf-8');
      return content;
    } catch (error) {
      this.logger.debug('CLAUDE.md not found', { error });
      return null;
    }
  }
  
  private createSystemReminder(contextInfo: Record<string, string>): Message {
    const content = `<system-reminder>
As you answer the user's questions, you can use the following context:
${Object.entries(contextInfo).map(([key, value]) => 
  `# ${key}\n${value}`
).join('\n\n')}

IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context or otherwise consider it in your response unless it is highly relevant to your task. Most of the time, it is not relevant.
</system-reminder>`;
    
    return {
      id: this.generateId(),
      type: 'user',
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      isMeta: true,
      uuid: this.generateUUID()
    };
  }
  
  private sendTelemetry(contextInfo: Record<string, string>): void {
    // 基于CY5函数的遥测发送
    const metrics = {
      directoryStructureSize: contextInfo['directory-structure']?.length || 0,
      gitStatusSize: contextInfo['git-status']?.length || 0,
      claudeMdSize: contextInfo['claude-config']?.length || 0,
      totalContextSize: Object.values(contextInfo).reduce((sum, value) => sum + value.length, 0)
    };
    
    this.logger.debug('Context metrics', metrics);
  }
  
  private generateId(): string {
    return `context-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
```

**验证步骤3**：
```bash
# 重新构建
npm run build

# 测试Agent核心
npm run dev -- "Hello, this is a test"

# 应该看到模拟响应输出
```

---

## 🛠️ 第四阶段：工具系统开发 (第9-12周)

### 步骤4.1：创建工具注册表

#### 4.1.1 创建工具注册表
创建文件：`src/tools/registry/tool-registry.ts`
```typescript
import { Tool, BuiltinTools } from '../../types/tools';
import { Logger } from '../../utils/logger';
import { ReadTool } from '../built-in/read-tool';
import { WriteTool } from '../built-in/write-tool';
import { EditTool } from '../built-in/edit-tool';
import { BashTool } from '../built-in/bash-tool';
import { LSTool } from '../built-in/ls-tool';

export class ToolRegistry {
  private tools = new Map<string, Tool>();
  private logger: Logger;
  
  constructor() {
    this.logger = new Logger({ component: 'ToolRegistry' });
  }
  
  async registerBuiltinTools(): Promise<void> {
    this.logger.info('Registering builtin tools');
    
    // 注册所有内置工具
    const builtinTools = [
      new ReadTool(),
      new WriteTool(),
      new EditTool(),
      new BashTool(),
      new LSTool()
      // TODO: 添加更多工具
    ];
    
    for (const tool of builtinTools) {
      this.register(tool);
    }
    
    this.logger.info(`Registered ${builtinTools.length} builtin tools`);
  }
  
  register(tool: Tool): void {
    this.tools.set(tool.name, tool);
    this.logger.debug(`Registered tool: ${tool.name}`);
  }
  
  get(name: string): Tool | undefined {
    return this.tools.get(name);
  }
  
  getAll(): Tool[] {
    return Array.from(this.tools.values());
  }
  
  getAllNames(): string[] {
    return Array.from(this.tools.keys());
  }
  
  has(name: string): boolean {
    return this.tools.has(name);
  }
  
  // 根据别名查找工具
  findByAlias(alias: string): Tool | undefined {
    for (const tool of this.tools.values()) {
      if (tool.aliases?.includes(alias)) {
        return tool;
      }
    }
    return undefined;
  }
  
  // 获取并发安全的工具
  getConcurrencySafeTools(): Tool[] {
    return this.getAll().filter(tool => tool.isConcurrencySafe());
  }
  
  // 获取非并发安全的工具
  getSequentialTools(): Tool[] {
    return this.getAll().filter(tool => !tool.isConcurrencySafe());
  }
}
```

### 步骤4.2：创建工具执行引擎

#### 4.2.1 创建执行引擎
创建文件：`src/tools/execution/execution-engine.ts`
```typescript
import { Tool, ToolCall, ToolResult, ToolContext } from '../../types/tools';
import { ToolRegistry } from '../registry/tool-registry';
import { Logger } from '../../utils/logger';
import { MAX_CONCURRENT_TOOLS } from '../../utils/constants';

export interface ExecutionPlan {
  concurrentGroups: ToolCall[][];
  sequentialCalls: ToolCall[];
  estimatedDuration: number;
}

export class ExecutionEngine {
  private activeTasks = new Set<string>();
  private logger: Logger;
  
  constructor(private toolRegistry: ToolRegistry) {
    this.logger = new Logger({ component: 'ExecutionEngine' });
  }
  
  // 基于MH1函数的工具执行逻辑
  async executeTools(toolCalls: ToolCall[], context: ToolContext): Promise<ToolResult[]> {
    this.logger.info(`Executing ${toolCalls.length} tools`, { 
      tools: toolCalls.map(tc => tc.toolName) 
    });
    
    // 1. 分析并发安全性
    const plan = this.createExecutionPlan(toolCalls);
    
    // 2. 执行并发安全的工具组
    const results: ToolResult[] = [];
    
    for (const group of plan.concurrentGroups) {
      const groupResults = await this.executeConcurrentGroup(group, context);
      results.push(...groupResults);
    }
    
    // 3. 按序执行非并发安全的工具
    for (const call of plan.sequentialCalls) {
      const result = await this.executeSingleTool(call, context);
      results.push(result);
    }
    
    this.logger.info(`Tool execution completed`, { 
      totalResults: results.length,
      successful: results.filter(r => r.success).length 
    });
    
    return results;
  }
  
  private createExecutionPlan(toolCalls: ToolCall[]): ExecutionPlan {
    const concurrentCalls: ToolCall[] = [];
    const sequentialCalls: ToolCall[] = [];
    
    for (const call of toolCalls) {
      const tool = this.toolRegistry.get(call.toolName);
      if (tool?.isConcurrencySafe()) {
        concurrentCalls.push(call);
      } else {
        sequentialCalls.push(call);
      }
    }
    
    // 将并发工具分组，每组最多MAX_CONCURRENT_TOOLS个
    const concurrentGroups: ToolCall[][] = [];
    for (let i = 0; i < concurrentCalls.length; i += MAX_CONCURRENT_TOOLS) {
      concurrentGroups.push(concurrentCalls.slice(i, i + MAX_CONCURRENT_TOOLS));
    }
    
    return {
      concurrentGroups,
      sequentialCalls,
      estimatedDuration: this.estimateDuration(toolCalls)
    };
  }
  
  private async executeConcurrentGroup(toolCalls: ToolCall[], context: ToolContext): Promise<ToolResult[]> {
    this.logger.debug(`Executing concurrent group of ${toolCalls.length} tools`);
    
    const promises = toolCalls.map(call => this.executeSingleTool(call, context));
    return Promise.all(promises);
  }
  
  private async executeSingleTool(toolCall: ToolCall, context: ToolContext): Promise<ToolResult> {
    const startTime = Date.now();
    this.activeTasks.add(toolCall.id);
    
    try {
      this.logger.debug(`Executing tool: ${toolCall.toolName}`, { 
        id: toolCall.id,
        input: toolCall.input 
      });
      
      // 1. 获取工具实例
      const tool = this.toolRegistry.get(toolCall.toolName);
      if (!tool) {
        return {
          success: false,
          content: '',
          error: `Tool not found: ${toolCall.toolName}`
        };
      }
      
      // 2. 权限检查
      if (tool.checkPermissions) {
        const permissionResult = await tool.checkPermissions(toolCall.input, context);
        if (permissionResult.behavior === 'deny') {
          return {
            success: false,
            content: '',
            error: permissionResult.message || 'Permission denied'
          };
        }
        // TODO: 处理 'ask' 行为
      }
      
      // 3. 执行工具
      const result = await tool.execute(toolCall.input, context);
      
      const duration = Date.now() - startTime;
      this.logger.debug(`Tool execution completed`, {
        tool: toolCall.toolName,
        success: result.success,
        duration
      });
      
      return result;
      
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`Tool execution failed`, error as Error, {
        tool: toolCall.toolName,
        duration
      });
      
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : String(error)
      };
      
    } finally {
      this.activeTasks.delete(toolCall.id);
    }
  }
  
  private estimateDuration(toolCalls: ToolCall[]): number {
    // 简单估算：每个工具平均5秒
    return toolCalls.length * 5000;
  }
  
  getActiveTaskCount(): number {
    return this.activeTasks.size;
  }
  
  isToolActive(toolName: string): boolean {
    for (const taskId of this.activeTasks) {
      if (taskId.includes(toolName)) {
        return true;
      }
    }
    return false;
  }
}
```

### 步骤4.3：创建内置工具

#### 4.3.1 创建Read工具
创建文件：`src/tools/built-in/read-tool.ts`
```typescript
import { promises as fs } from 'fs';
import { join, resolve } from 'path';
import { Tool, ToolContext, ToolResult, PermissionResult } from '../../types/tools';

export class ReadTool implements Tool {
  name = 'Read';
  description = 'Read the contents of a file';
  
  inputSchema = {
    type: 'object',
    properties: {
      filePath: {
        type: 'string',
        description: 'The absolute path to the file to read'
      },
      offset: {
        type: 'number',
        description: 'The line number to start reading from (optional)'
      },
      limit: {
        type: 'number',
        description: 'The number of lines to read (optional)'
      }
    },
    required: ['filePath']
  };
  
  userFacingName(): string {
    return 'Read';
  }
  
  isConcurrencySafe(): boolean {
    return true; // 读取操作是并发安全的
  }
  
  async checkPermissions(input: any, context: ToolContext): Promise<PermissionResult> {
    const filePath = resolve(input.filePath);
    
    // 检查文件是否在允许的目录中
    const workingDir = resolve(context.workingDirectory);
    if (!filePath.startsWith(workingDir)) {
      return {
        behavior: 'deny',
        message: `File access denied: ${filePath} is outside working directory`
      };
    }
    
    // 检查是否是敏感文件
    const sensitivePatterns = [
      /\.env$/,
      /secrets/i,
      /\.key$/,
      /\.pem$/
    ];
    
    for (const pattern of sensitivePatterns) {
      if (pattern.test(filePath)) {
        return {
          behavior: 'ask',
          message: `Reading sensitive file: ${filePath}. Continue?`
        };
      }
    }
    
    return { behavior: 'allow' };
  }
  
  async execute(input: any, context: ToolContext): Promise<ToolResult> {
    try {
      const { filePath, offset, limit } = input;
      const resolvedPath = resolve(filePath);
      
      // 检查文件是否存在
      try {
        await fs.access(resolvedPath);
      } catch {
        return {
          success: false,
          content: '',
          error: `File not found: ${filePath}`
        };
      }
      
      // 读取文件内容
      const content = await fs.readFile(resolvedPath, 'utf-8');
      
      // 处理行偏移和限制
      if (offset !== undefined || limit !== undefined) {
        const lines = content.split('\n');
        const startLine = offset || 0;
        const endLine = limit ? startLine + limit : lines.length;
        const selectedLines = lines.slice(startLine, endLine);
        
        // 添加行号
        const numberedContent = selectedLines
          .map((line, index) => `${startLine + index + 1}\t${line}`)
          .join('\n');
        
        return {
          success: true,
          content: numberedContent,
          metadata: {
            filePath: resolvedPath,
            totalLines: lines.length,
            selectedLines: selectedLines.length,
            startLine: startLine + 1,
            endLine: Math.min(endLine, lines.length)
          }
        };
      }
      
      // 添加行号到完整内容
      const lines = content.split('\n');
      const numberedContent = lines
        .map((line, index) => `${index + 1}\t${line}`)
        .join('\n');
      
      return {
        success: true,
        content: numberedContent,
        metadata: {
          filePath: resolvedPath,
          totalLines: lines.length,
          fileSize: content.length
        }
      };
      
    } catch (error) {
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}
```

#### 4.3.2 创建Write工具
创建文件：`src/tools/built-in/write-tool.ts`
```typescript
import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { Tool, ToolContext, ToolResult, PermissionResult } from '../../types/tools';

export class WriteTool implements Tool {
  name = 'Write';
  description = 'Write content to a file';
  
  inputSchema = {
    type: 'object',
    properties: {
      filePath: {
        type: 'string',
        description: 'The absolute path to the file to write'
      },
      content: {
        type: 'string',
        description: 'The content to write to the file'
      }
    },
    required: ['filePath', 'content']
  };
  
  userFacingName(): string {
    return 'Write';
  }
  
  isConcurrencySafe(): boolean {
    return false; // 写入操作不是并发安全的
  }
  
  async checkPermissions(input: any, context: ToolContext): Promise<PermissionResult> {
    const filePath = resolve(input.filePath);
    
    // 检查文件是否在允许的目录中
    const workingDir = resolve(context.workingDirectory);
    if (!filePath.startsWith(workingDir)) {
      return {
        behavior: 'deny',
        message: `File write denied: ${filePath} is outside working directory`
      };
    }
    
    // 检查是否覆盖重要文件
    const importantFiles = [
      'package.json',
      'tsconfig.json',
      '.gitignore',
      'README.md'
    ];
    
    const fileName = filePath.split('/').pop() || '';
    if (importantFiles.includes(fileName)) {
      return {
        behavior: 'ask',
        message: `Overwriting important file: ${fileName}. Continue?`
      };
    }
    
    return { behavior: 'allow' };
  }
  
  async execute(input: any, context: ToolContext): Promise<ToolResult> {
    try {
      const { filePath, content } = input;
      const resolvedPath = resolve(filePath);
      
      // 确保目录存在
      const dir = dirname(resolvedPath);
      await fs.mkdir(dir, { recursive: true });
      
      // 检查文件是否已存在
      let isNewFile = false;
      try {
        await fs.access(resolvedPath);
      } catch {
        isNewFile = true;
      }
      
      // 写入文件
      await fs.writeFile(resolvedPath, content, 'utf-8');
      
      // 计算统计信息
      const lines = content.split('\n');
      const stats = {
        filePath: resolvedPath,
        isNewFile,
        lines: lines.length,
        characters: content.length,
        bytes: Buffer.byteLength(content, 'utf-8')
      };
      
      return {
        success: true,
        content: isNewFile 
          ? `Created new file: ${filePath}` 
          : `Updated file: ${filePath}`,
        metadata: stats
      };
      
    } catch (error) {
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}
```

#### 4.3.3 创建Bash工具
创建文件：`src/tools/built-in/bash-tool.ts`
```typescript
import { exec } from 'child_process';
import { promisify } from 'util';
import { Tool, ToolContext, ToolResult, PermissionResult } from '../../types/tools';

const execAsync = promisify(exec);

export class BashTool implements Tool {
  name = 'Bash';
  description = 'Execute bash commands';
  
  inputSchema = {
    type: 'object',
    properties: {
      command: {
        type: 'string',
        description: 'The bash command to execute'
      },
      timeout: {
        type: 'number',
        description: 'Timeout in milliseconds (default: 30000)'
      },
      workingDirectory: {
        type: 'string',
        description: 'Working directory for the command (optional)'
      }
    },
    required: ['command']
  };
  
  userFacingName(): string {
    return 'Bash';
  }
  
  isConcurrencySafe(): boolean {
    return false; // Bash命令可能不是并发安全的
  }
  
  async checkPermissions(input: any, context: ToolContext): Promise<PermissionResult> {
    const { command } = input;
    
    // 危险命令检测
    const dangerousPatterns = [
      /rm\s+-rf\s+\//, 
      /sudo\s+/, 
      /dd\s+if=.*of=\/dev/, 
      /:(){ :|:& };:/, // fork bomb
      /shutdown/,
      /reboot/,
      /mkfs/,
      /fdisk/
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(command)) {
        return {
          behavior: 'deny',
          message: `Dangerous command detected: ${command}`
        };
      }
    }
    
    // 需要确认的命令
    const confirmPatterns = [
      /rm\s+/,
      /mv\s+.*\s+\/dev\/null/,
      />\s*\/dev\/null/,
      /npm\s+install/,
      /git\s+reset\s+--hard/
    ];
    
    for (const pattern of confirmPatterns) {
      if (pattern.test(command)) {
        return {
          behavior: 'ask',
          message: `Potentially destructive command: ${command}. Continue?`
        };
      }
    }
    
    return { behavior: 'allow' };
  }
  
  async execute(input: any, context: ToolContext): Promise<ToolResult> {
    try {
      const { command, timeout = 30000, workingDirectory } = input;
      
      const options = {
        timeout,
        cwd: workingDirectory || context.workingDirectory,
        env: { ...process.env, ...context.environment },
        maxBuffer: 1024 * 1024 // 1MB buffer
      };
      
      const startTime = Date.now();
      
      try {
        const { stdout, stderr } = await execAsync(command, options);
        const duration = Date.now() - startTime;
        
        let output = '';
        if (stdout) output += stdout;
        if (stderr) output += (output ? '\n' : '') + `STDERR:\n${stderr}`;
        
        return {
          success: true,
          content: output || '(no output)',
          metadata: {
            command,
            duration,
            exitCode: 0,
            workingDirectory: options.cwd
          }
        };
        
      } catch (execError: any) {
        const duration = Date.now() - startTime;
        
        // 处理命令执行错误
        let errorOutput = '';
        if (execError.stdout) errorOutput += execError.stdout;
        if (execError.stderr) errorOutput += (errorOutput ? '\n' : '') + `STDERR:\n${execError.stderr}`;
        
        return {
          success: false,
          content: errorOutput || '(no output)',
          error: `Command failed with exit code ${execError.code}`,
          metadata: {
            command,
            duration,
            exitCode: execError.code,
            workingDirectory: options.cwd
          }
        };
      }
      
    } catch (error) {
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}
```

### 步骤4.4：创建更多基础工具

#### 4.4.1 创建Edit工具
创建文件：`src/tools/built-in/edit-tool.ts`
```typescript
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { Tool, ToolContext, ToolResult, PermissionResult } from '../../types/tools';

export class EditTool implements Tool {
  name = 'Edit';
  description = 'Edit a file by replacing old text with new text';
  
  inputSchema = {
    type: 'object',
    properties: {
      filePath: {
        type: 'string',
        description: 'The absolute path to the file to edit'
      },
      oldString: {
        type: 'string',
        description: 'The text to replace'
      },
      newString: {
        type: 'string',
        description: 'The text to replace it with'
      },
      replaceAll: {
        type: 'boolean',
        description: 'Replace all occurrences (default: false)',
        default: false
      }
    },
    required: ['filePath', 'oldString', 'newString']
  };
  
  userFacingName(): string {
    return 'Edit';
  }
  
  isConcurrencySafe(): boolean {
    return false; // 编辑操作不是并发安全的
  }
  
  async checkPermissions(input: any, context: ToolContext): Promise<PermissionResult> {
    const filePath = resolve(input.filePath);
    
    // 检查文件是否在允许的目录中
    const workingDir = resolve(context.workingDirectory);
    if (!filePath.startsWith(workingDir)) {
      return {
        behavior: 'deny',
        message: `File edit denied: ${filePath} is outside working directory`
      };
    }
    
    return { behavior: 'allow' };
  }
  
  async execute(input: any, context: ToolContext): Promise<ToolResult> {
    try {
      const { filePath, oldString, newString, replaceAll = false } = input;
      const resolvedPath = resolve(filePath);
      
      // 检查文件是否存在
      try {
        await fs.access(resolvedPath);
      } catch {
        return {
          success: false,
          content: '',
          error: `File not found: ${filePath}`
        };
      }
      
      // 读取文件内容
      const content = await fs.readFile(resolvedPath, 'utf-8');
      
      // 检查oldString是否存在
      if (!content.includes(oldString)) {
        return {
          success: false,
          content: '',
          error: `Text not found in file: "${oldString}"`
        };
      }
      
      // 检查oldString是否唯一（如果不是replaceAll模式）
      if (!replaceAll) {
        const occurrences = (content.match(new RegExp(escapeRegex(oldString), 'g')) || []).length;
        if (occurrences > 1) {
          return {
            success: false,
            content: '',
            error: `Text "${oldString}" appears ${occurrences} times. Use replaceAll: true or provide more context.`
          };
        }
      }
      
      // 执行替换
      const regex = new RegExp(escapeRegex(oldString), replaceAll ? 'g' : '');
      const newContent = content.replace(regex, newString);
      
      // 写入修改后的内容
      await fs.writeFile(resolvedPath, newContent, 'utf-8');
      
      // 计算统计信息
      const oldLines = content.split('\n').length;
      const newLines = newContent.split('\n').length;
      const replacements = replaceAll ? 
        (content.match(new RegExp(escapeRegex(oldString), 'g')) || []).length : 1;
      
      return {
        success: true,
        content: `Successfully edited ${filePath}`,
        metadata: {
          filePath: resolvedPath,
          replacements,
          oldLines,
          newLines,
          lineDifference: newLines - oldLines
        }
      };
      
    } catch (error) {
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
```

#### 4.4.2 创建LS工具
创建文件：`src/tools/built-in/ls-tool.ts`
```typescript
import { promises as fs } from 'fs';
import { join, resolve, relative } from 'path';
import { Tool, ToolContext, ToolResult, PermissionResult } from '../../types/tools';

export class LSTool implements Tool {
  name = 'LS';
  description = 'List files and directories';
  
  inputSchema = {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'The absolute path to the directory to list'
      },
      ignore: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of glob patterns to ignore (optional)'
      }
    },
    required: ['path']
  };
  
  userFacingName(): string {
    return 'LS';
  }
  
  isConcurrencySafe(): boolean {
    return true; // 列表操作是并发安全的
  }
  
  async checkPermissions(input: any, context: ToolContext): Promise<PermissionResult> {
    const targetPath = resolve(input.path);
    
    // 检查路径是否在允许的目录中
    const workingDir = resolve(context.workingDirectory);
    if (!targetPath.startsWith(workingDir)) {
      return {
        behavior: 'deny',
        message: `Directory access denied: ${targetPath} is outside working directory`
      };
    }
    
    return { behavior: 'allow' };
  }
  
  async execute(input: any, context: ToolContext): Promise<ToolResult> {
    try {
      const { path: targetPath, ignore = [] } = input;
      const resolvedPath = resolve(targetPath);
      
      // 检查目录是否存在
      try {
        const stat = await fs.stat(resolvedPath);
        if (!stat.isDirectory()) {
          return {
            success: false,
            content: '',
            error: `Not a directory: ${targetPath}`
          };
        }
      } catch {
        return {
          success: false,
          content: '',
          error: `Directory not found: ${targetPath}`
        };
      }
      
      // 读取目录内容
      const entries = await fs.readdir(resolvedPath);
      
      // 获取详细信息
      const items = await Promise.all(
        entries.map(async (entry) => {
          const entryPath = join(resolvedPath, entry);
          try {
            const stat = await fs.stat(entryPath);
            return {
              name: entry,
              type: stat.isDirectory() ? 'directory' : 'file',
              size: stat.size,
              modified: stat.mtime.toISOString(),
              permissions: this.formatPermissions(stat.mode)
            };
          } catch {
            return {
              name: entry,
              type: 'unknown',
              size: 0,
              modified: '',
              permissions: ''
            };
          }
        })
      );
      
      // 过滤被忽略的项目
      const filteredItems = this.filterIgnored(items, ignore);
      
      // 格式化输出
      const output = this.formatOutput(filteredItems, resolvedPath);
      
      return {
        success: true,
        content: output,
        metadata: {
          directory: resolvedPath,
          totalItems: items.length,
          filteredItems: filteredItems.length,
          directories: filteredItems.filter(item => item.type === 'directory').length,
          files: filteredItems.filter(item => item.type === 'file').length
        }
      };
      
    } catch (error) {
      return {
        success: false,
        content: '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  private filterIgnored(items: any[], ignorePatterns: string[]): any[] {
    if (ignorePatterns.length === 0) {
      return items;
    }
    
    return items.filter(item => {
      return !ignorePatterns.some(pattern => {
        // 简单的glob匹配
        const regex = new RegExp(pattern.replace(/\*/g, '.*').replace(/\?/g, '.'));
        return regex.test(item.name);
      });
    });
  }
  
  private formatOutput(items: any[], directory: string): string {
    const lines = [`Directory: ${directory}`, ''];
    
    // 按类型和名称排序
    const sorted = items.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'directory' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    
    for (const item of sorted) {
      const typeIcon = item.type === 'directory' ? '📁' : '📄';
      const size = item.type === 'file' ? this.formatSize(item.size) : '';
      const permissions = item.permissions;
      
      lines.push(`${typeIcon} ${item.name.padEnd(30)} ${size.padStart(10)} ${permissions}`);
    }
    
    return lines.join('\n');
  }
  
  private formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
  
  private formatPermissions(mode: number): string {
    // 简化的权限显示
    const permissions = (mode & parseInt('777', 8)).toString(8);
    return permissions;
  }
}
```

**验证步骤4**：
```bash
# 重新构建
npm run build

# 测试工具系统
npm run dev -- "请读取package.json文件"

# 应该看到工具执行过程
```

---

## 🎨 第五阶段：UI界面开发 (第13-14周)

### 步骤5.1：创建React UI组件

#### 5.1.1 创建主应用组件
创建文件：`src/ui/components/main-app.tsx`
```typescript
import React, { useState, useCallback, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { AgentCore } from '../../core/agent/agent-core';
import { Session, AgentConfig, Message } from '../../types/core';
import { WelcomeHeader } from './welcome-header';
import { MessageDisplay } from './message-display';
import { InputPanel } from './input-panel';
import { StatusBar } from './status-bar';
import { ProgressIndicator } from './progress-indicator';

export interface MainAppProps {
  agentCore: AgentCore;
  initialPrompt?: string;
  initialSession?: Session | null;
  config: AgentConfig;
  onExit: () => void;
}

export const MainApp: React.FC<MainAppProps> = ({
  agentCore,
  initialPrompt,
  initialSession,
  config,
  onExit
}) => {
  // 基于UI组件分析的11个核心状态变量
  const [responseStatus, setResponseStatus] = useState<'idle' | 'responding' | 'error'>('idle');
  const [messageHistory, setMessageHistory] = useState<Message[]>(initialSession?.messages || []);
  const [currentSession, setCurrentSession] = useState<Session | null>(initialSession);
  const [inputBuffer, setInputBuffer] = useState<string>(initialPrompt || '');
  const [uiMode, setUIMode] = useState<'prompt' | 'plan' | 'settings'>('prompt');
  const [showWelcome, setShowWelcome] = useState(!initialPrompt && !initialSession);
  
  // 全局键盘事件处理
  useInput((input, key) => {
    if (key.escape) {
      if (responseStatus === 'responding') {
        // 中断当前操作
        setResponseStatus('idle');
      } else {
        // 退出应用
        onExit();
      }
    }
  });
  
  // 处理用户输入
  const handleUserInput = useCallback(async (input: string) => {
    if (!input.trim()) return;
    
    setResponseStatus('responding');
    setShowWelcome(false);
    
    // 添加用户消息到历史
    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      uuid: generateUUID()
    };
    
    setMessageHistory(prev => [...prev, userMessage]);
    setInputBuffer('');
    
    try {
      // 处理特殊命令
      if (input.startsWith('/')) {
        await handleSlashCommand(input);
        return;
      }
      
      // 处理普通对话
      const response = await agentCore.processMessage(input, config);
      
      // 添加助手响应到历史
      const assistantMessage: Message = {
        id: generateId(),
        type: 'assistant',
        role: 'assistant',
        content: response.content,
        timestamp: new Date().toISOString(),
        uuid: generateUUID()
      };
      
      setMessageHistory(prev => [...prev, assistantMessage]);
      
    } catch (error) {
      setResponseStatus('error');
      console.error('Error processing message:', error);
    } finally {
      setResponseStatus('idle');
    }
  }, [agentCore, config]);
  
  // 处理斜杠命令
  const handleSlashCommand = async (command: string) => {
    const [cmd, ...args] = command.slice(1).split(' ');
    
    switch (cmd) {
      case 'help':
        showHelpMessage();
        break;
      case 'clear':
        setMessageHistory([]);
        break;
      case 'exit':
      case 'quit':
        onExit();
        break;
      default:
        showUnknownCommand(cmd);
    }
    
    setResponseStatus('idle');
  };
  
  const showHelpMessage = () => {
    const helpMessage: Message = {
      id: generateId(),
      type: 'assistant',
      role: 'assistant',
      content: `Available commands:
/help - Show this help message
/clear - Clear conversation history
/exit - Exit the application

You can also use:
! <command> - Execute bash command
# <note> - Add a note to the conversation`,
      timestamp: new Date().toISOString(),
      uuid: generateUUID()
    };
    
    setMessageHistory(prev => [...prev, helpMessage]);
  };
  
  const showUnknownCommand = (cmd: string) => {
    const errorMessage: Message = {
      id: generateId(),
      type: 'assistant',
      role: 'assistant',
      content: `Unknown command: /${cmd}. Type /help for available commands.`,
      timestamp: new Date().toISOString(),
      uuid: generateUUID()
    };
    
    setMessageHistory(prev => [...prev, errorMessage]);
  };
  
  return (
    <Box flexDirection="column" height="100%">
      {showWelcome && <WelcomeHeader />}
      
      <Box flexGrow={1} flexDirection="column">
        <MessageDisplay 
          messages={messageHistory}
          loading={responseStatus === 'responding'}
        />
      </Box>
      
      {responseStatus === 'responding' && (
        <ProgressIndicator message="AI is thinking..." />
      )}
      
      <InputPanel
        value={inputBuffer}
        onChange={setInputBuffer}
        onSubmit={handleUserInput}
        disabled={responseStatus === 'responding'}
        mode={uiMode}
      />
      
      <StatusBar
        session={currentSession}
        mode={uiMode}
        status={responseStatus}
      />
    </Box>
  );
};

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

#### 5.1.2 创建欢迎界面组件
创建文件：`src/ui/components/welcome-header.tsx`
```typescript
import React from 'react';
import { Box, Text } from 'ink';
import { APP_NAME, VERSION } from '../../utils/constants';

export const WelcomeHeader: React.FC = () => {
  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box>
        <Text color="cyan" bold>✻ </Text>
        <Text bold>Welcome to {APP_NAME}</Text>
      </Box>
      
      <Box marginTop={1}>
        <Text color="gray">Version {VERSION} - AI Programming Assistant</Text>
      </Box>
      
      <Box marginTop={1} flexDirection="column">
        <Text color="green">Getting started:</Text>
        <Text>• Type your programming question or task</Text>
        <Text>• Use /help to see available commands</Text>
        <Text>• Press ESC to exit anytime</Text>
      </Box>
      
      <Box marginTop={1}>
        <Text color="gray">{'─'.repeat(60)}</Text>
      </Box>
    </Box>
  );
};
```

#### 5.1.3 创建消息显示组件
创建文件：`src/ui/components/message-display.tsx`
```typescript
import React from 'react';
import { Box, Text } from 'ink';
import { Message } from '../../types/core';

export interface MessageDisplayProps {
  messages: Message[];
  loading?: boolean;
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ 
  messages, 
  loading = false 
}) => {
  if (messages.length === 0 && !loading) {
    return (
      <Box justifyContent="center" alignItems="center" flexGrow={1}>
        <Text color="gray">Start a conversation by typing a message below</Text>
      </Box>
    );
  }
  
  return (
    <Box flexDirection="column" paddingX={1}>
      {messages.map((message, index) => (
        <MessageItem key={message.id} message={message} isLast={index === messages.length - 1} />
      ))}
      
      {loading && (
        <Box marginTop={1}>
          <Text color="yellow">● </Text>
          <Text color="gray">AI is processing your request...</Text>
        </Box>
      )}
    </Box>
  );
};

interface MessageItemProps {
  message: Message;
  isLast: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isLast }) => {
  const getMessageColor = () => {
    switch (message.type) {
      case 'user': return 'blue';
      case 'assistant': return 'green';
      case 'system': return 'yellow';
      default: return 'white';
    }
  };
  
  const getMessageIcon = () => {
    switch (message.type) {
      case 'user': return '👤';
      case 'assistant': return '🤖';
      case 'system': return '⚙️';
      default: return '💬';
    }
  };
  
  const formatContent = (content: string | any[]): string => {
    if (typeof content === 'string') {
      return content;
    }
    // 处理复杂内容块
    return JSON.stringify(content, null, 2);
  };
  
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  return (
    <Box flexDirection="column" marginBottom={isLast ? 0 : 1}>
      <Box>
        <Text color={getMessageColor()}>{getMessageIcon()} </Text>
        <Text color={getMessageColor()} bold>
          {message.type === 'user' ? 'You' : 'Assistant'}
        </Text>
        <Text color="gray"> • {formatTimestamp(message.timestamp)}</Text>
      </Box>
      
      <Box marginLeft={3} marginTop={1}>
        <Text>{formatContent(message.content)}</Text>
      </Box>
      
      {message.isMeta && (
        <Box marginLeft={3}>
          <Text color="gray" italic>(system message)</Text>
        </Box>
      )}
    </Box>
  );
};
```

#### 5.1.4 创建输入面板组件
创建文件：`src/ui/components/input-panel.tsx`
```typescript
import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';

export interface InputPanelProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  disabled?: boolean;
  mode?: 'prompt' | 'plan' | 'settings';
}

export const InputPanel: React.FC<InputPanelProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  mode = 'prompt'
}) => {
  const [isMultiline, setIsMultiline] = useState(false);
  
  useInput((input, key) => {
    if (disabled) return;
    
    if (key.return) {
      if (key.shift) {
        // Shift+Enter for multiline
        setIsMultiline(true);
        onChange(value + '\n');
      } else {
        // Enter to submit
        if (value.trim()) {
          onSubmit(value);
          setIsMultiline(false);
        }
      }
    } else if (key.backspace || key.delete) {
      const newValue = value.slice(0, -1);
      onChange(newValue);
      if (newValue.length === 0) {
        setIsMultiline(false);
      }
    } else if (key.ctrl && input === 'c') {
      // Ctrl+C to clear input
      onChange('');
      setIsMultiline(false);
    } else if (input) {
      onChange(value + input);
    }
  });
  
  const getModeIndicator = () => {
    switch (mode) {
      case 'plan': return '📋 Plan Mode';
      case 'settings': return '⚙️ Settings';
      default: return '💬 Chat';
    }
  };
  
  const getPromptText = () => {
    if (disabled) return 'Please wait...';
    if (isMultiline) return 'Continue typing (Enter to send, Shift+Enter for new line):';
    return 'Type your message (Enter to send, Shift+Enter for multiline):';
  };
  
  return (
    <Box flexDirection="column" borderStyle="single" borderColor="gray">
      <Box paddingX={1}>
        <Text color="cyan">{getModeIndicator()}</Text>
        <Text color="gray"> • {getPromptText()}</Text>
      </Box>
      
      <Box paddingX={1} paddingY={1}>
        <Text color="blue">► </Text>
        <Text color={disabled ? 'gray' : 'white'}>
          {value || (disabled ? 'Processing...' : '')}
          {!disabled && <Text color="green">▌</Text>}
        </Text>
      </Box>
      
      {!disabled && (
        <Box paddingX={1} paddingBottom={1}>
          <Text color="gray" dimColor>
            Commands: /help, /clear, /exit • ! for bash • # for notes
          </Text>
        </Box>
      )}
    </Box>
  );
};
```

#### 5.1.5 创建状态栏组件
创建文件：`src/ui/components/status-bar.tsx`
```typescript
import React from 'react';
import { Box, Text } from 'ink';
import { Session } from '../../types/core';

export interface StatusBarProps {
  session: Session | null;
  mode: 'prompt' | 'plan' | 'settings';
  status: 'idle' | 'responding' | 'error';
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  session, 
  mode, 
  status 
}) => {
  const getStatusIndicator = () => {
    switch (status) {
      case 'responding': return '🔄 Processing';
      case 'error': return '❌ Error';
      default: return '✅ Ready';
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case 'responding': return 'yellow';
      case 'error': return 'red';
      default: return 'green';
    }
  };
  
  const formatDuration = (startTime: string): string => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ${diff % 60}s`;
    return `${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m`;
  };
  
  return (
    <Box borderStyle="single" borderColor="gray" paddingX={1}>
      <Box flexGrow={1}>
        <Text color={getStatusColor()}>{getStatusIndicator()}</Text>
        
        {session && (
          <>
            <Text color="gray"> • Session: </Text>
            <Text>{session.title || session.id.slice(0, 8)}</Text>
            <Text color="gray"> • Messages: </Text>
            <Text>{session.messages.length}</Text>
            <Text color="gray"> • Duration: </Text>
            <Text>{formatDuration(session.createdAt)}</Text>
          </>
        )}
      </Box>
      
      <Box>
        <Text color="gray">Press ESC to exit</Text>
      </Box>
    </Box>
  );
};
```

#### 5.1.6 创建进度指示器组件
创建文件：`src/ui/components/progress-indicator.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

export interface ProgressIndicatorProps {
  message?: string;
  progress?: number; // 0-100
  indeterminate?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  message = 'Processing...',
  progress,
  indeterminate = true
}) => {
  const [animationFrame, setAnimationFrame] = useState(0);
  
  useEffect(() => {
    if (!indeterminate) return;
    
    const interval = setInterval(() => {
      setAnimationFrame(frame => (frame + 1) % 4);
    }, 200);
    
    return () => clearInterval(interval);
  }, [indeterminate]);
  
  const getAnimationChar = () => {
    const chars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    return chars[animationFrame % chars.length];
  };
  
  const renderProgressBar = () => {
    if (indeterminate || progress === undefined) return null;
    
    const width = 20;
    const filled = Math.round((progress / 100) * width);
    const empty = width - filled;
    
    return (
      <Box marginLeft={1}>
        <Text color="green">{'█'.repeat(filled)}</Text>
        <Text color="gray">{'░'.repeat(empty)}</Text>
        <Text marginLeft={1}>{progress}%</Text>
      </Box>
    );
  };
  
  return (
    <Box paddingX={1} paddingY={1} borderStyle="single" borderColor="yellow">
      <Text color="yellow">
        {indeterminate ? getAnimationChar() : '▶'}
      </Text>
      <Text marginLeft={1}>{message}</Text>
      {renderProgressBar()}
    </Box>
  );
};
```

**验证步骤5**：
```bash
# 重新构建
npm run build

# 测试UI界面
npm run dev

# 应该看到完整的终端UI界面
```

---

## 🚀 第六阶段：项目完成和测试 (第15-16周)

### 步骤6.1：创建测试套件

#### 6.1.1 配置Jest
创建文件：`jest.config.js`
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/__tests__/**/*',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

#### 6.1.2 创建测试设置
创建文件：`__tests__/setup.ts`
```typescript
// 测试环境设置
process.env.NODE_ENV = 'test';

// Mock console methods to reduce noise in tests
console.log = jest.fn();
console.info = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

// 全局测试工具
global.generateTestId = () => `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
```

#### 6.1.3 创建单元测试示例
创建文件：`__tests__/unit/tools/read-tool.test.ts`
```typescript
import { promises as fs } from 'fs';
import { join } from 'path';
import { ReadTool } from '../../../src/tools/built-in/read-tool';
import { ToolContext } from '../../../src/types/tools';

// Mock fs module
jest.mock('fs', () => ({
  promises: {
    access: jest.fn(),
    readFile: jest.fn(),
  },
}));

const mockFs = fs as jest.Mocked<typeof fs>;

describe('ReadTool', () => {
  let readTool: ReadTool;
  let context: ToolContext;
  
  beforeEach(() => {
    readTool = new ReadTool();
    context = {
      sessionId: 'test-session',
      permissions: [],
      workingDirectory: '/test/dir',
      environment: {}
    };
    
    jest.clearAllMocks();
  });
  
  describe('execute', () => {
    it('should read file content successfully', async () => {
      // Arrange
      const filePath = '/test/dir/example.txt';
      const fileContent = 'Hello, World!\nThis is a test file.';
      
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(fileContent);
      
      // Act
      const result = await readTool.execute({ filePath }, context);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.content).toContain('Hello, World!');
      expect(result.content).toContain('1\t');
      expect(result.metadata?.totalLines).toBe(2);
    });
    
    it('should handle file not found error', async () => {
      // Arrange
      const filePath = '/test/dir/nonexistent.txt';
      
      mockFs.access.mockRejectedValue(new Error('File not found'));
      
      // Act
      const result = await readTool.execute({ filePath }, context);
      
      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('File not found');
    });
    
    it('should handle line offset and limit', async () => {
      // Arrange
      const filePath = '/test/dir/example.txt';
      const fileContent = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
      
      mockFs.access.mockResolvedValue(undefined);
      mockFs.readFile.mockResolvedValue(fileContent);
      
      // Act
      const result = await readTool.execute({ 
        filePath, 
        offset: 1, 
        limit: 2 
      }, context);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.content).toContain('2\tLine 2');
      expect(result.content).toContain('3\tLine 3');
      expect(result.content).not.toContain('Line 1');
      expect(result.metadata?.selectedLines).toBe(2);
    });
  });
  
  describe('checkPermissions', () => {
    it('should allow reading files in working directory', async () => {
      // Arrange
      const filePath = '/test/dir/allowed.txt';
      
      // Act
      const result = await readTool.checkPermissions({ filePath }, context);
      
      // Assert
      expect(result.behavior).toBe('allow');
    });
    
    it('should deny reading files outside working directory', async () => {
      // Arrange
      const filePath = '/other/dir/secret.txt';
      
      // Act
      const result = await readTool.checkPermissions({ filePath }, context);
      
      // Assert
      expect(result.behavior).toBe('deny');
      expect(result.message).toContain('outside working directory');
    });
    
    it('should ask permission for sensitive files', async () => {
      // Arrange
      const filePath = '/test/dir/.env';
      
      // Act
      const result = await readTool.checkPermissions({ filePath }, context);
      
      // Assert
      expect(result.behavior).toBe('ask');
      expect(result.message).toContain('sensitive file');
    });
  });
});
```

### 步骤6.2：创建构建脚本

#### 6.2.1 更新package.json脚本
在package.json中添加更多脚本：
```json
{
  "scripts": {
    "build": "tsc && chmod +x dist/cli.js",
    "build:prod": "tsc --project tsconfig.prod.json && chmod +x dist/cli.js",
    "dev": "tsx src/cli.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src",
    "format:check": "prettier --check src",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist coverage",
    "prepublishOnly": "npm run clean && npm run build:prod",
    "install:global": "npm run build && npm link",
    "uninstall:global": "npm unlink -g"
  }
}
```

#### 6.2.2 创建生产构建配置
创建文件：`tsconfig.prod.json`
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "sourceMap": false,
    "declaration": false
  },
  "exclude": [
    "node_modules",
    "__tests__",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

### 步骤6.3：创建文档和部署准备

#### 6.3.1 创建README文档
创建文件：`README.md`
```markdown
# Open Claude Code

An open-source AI programming assistant that replicates the functionality of Claude Code.

## Features

- ✨ Interactive terminal-based AI assistant
- 🛠️ 15+ built-in tools for file operations, code editing, and system tasks
- 🔌 MCP (Model Context Protocol) support for extensions
- 📝 Todo management and session persistence
- 🎯 Plan mode for safe analysis before execution
- 🚀 Support for multiple AI models (Claude, GPT-4)

## Installation

### From npm (recommended)
```bash
npm install -g open-claude-code
```

### From source
```bash
git clone https://github.com/your-org/open-claude-code.git
cd open-claude-code
npm install
npm run build
npm link
```

## Usage

### Interactive mode
```bash
claude
```

### One-shot mode
```bash
claude "Create a Python script to calculate fibonacci numbers"
```

### With options
```bash
claude --model gpt-4o --debug "Help me debug this code"
```

## Available Commands

- `/help` - Show available commands
- `/clear` - Clear conversation history
- `/login` - Authenticate with AI services
- `/logout` - Sign out
- `/resume [id]` - Resume a previous session
- `/mcp` - Manage MCP servers

## Special Input Modes

- `! <command>` - Execute bash commands
- `# <note>` - Add notes to conversation
- Plan Mode - Press Shift+Tab to enter analysis-only mode

## Configuration

Create a configuration file at `~/.claude/settings.json`:

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "fallbackModel": "gpt-4o-mini",
  "maxConcurrency": 10,
  "debug": false
}
```

## MCP Extensions

Add MCP servers to `.mcp.json`:

```json
{
  "servers": {
    "database": {
      "command": "python",
      "args": ["db-server.py"],
      "transport": "stdio"
    }
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build:prod
```

## License

MIT
```

#### 6.3.2 创建CLI帮助文档
创建文件：`USAGE.md`
```markdown
# Open Claude Code Usage Guide

## Command Line Options

### Basic Usage
```bash
claude [options] [prompt]
```

### Options

| Option | Description | Example |
|--------|-------------|---------|
| `-h, --help` | Show help information | `claude --help` |
| `-v, --version` | Show version number | `claude --version` |
| `-d, --debug` | Enable debug mode | `claude --debug` |
| `--verbose` | Enable verbose output | `claude --verbose` |
| `-p, --print` | Print mode (non-interactive) | `claude -p "Hello"` |
| `-c, --continue` | Continue recent conversation | `claude -c` |
| `-r, --resume [id]` | Resume specific session | `claude -r session123` |
| `--model <model>` | Specify AI model | `claude --model gpt-4o` |
| `--fallback-model <model>` | Specify backup model | `claude --fallback-model gpt-4o-mini` |

### Advanced Options

| Option | Description | Example |
|--------|-------------|---------|
| `--mcp-config <config>` | MCP server configuration | `claude --mcp-config servers.json` |
| `--max-turns <n>` | Maximum conversation turns | `claude --max-turns 50` |
| `--allowedTools <tools>` | Allowed tools list | `claude --allowedTools Read,Write` |
| `--disallowedTools <tools>` | Disabled tools list | `claude --disallowedTools Bash` |
| `--dangerously-skip-permissions` | Skip permission checks | `claude --dangerously-skip-permissions` |

## Interactive Commands

### Slash Commands
- `/help` - Show available commands
- `/login` - Authenticate with AI services
- `/logout` - Sign out from services
- `/clear` - Clear conversation history
- `/resume [id]` - Resume a session
- `/mcp` - Manage MCP servers
- `/status` - Show system status
- `/review` - Start code review mode

### Special Input Modes

#### Bash Execution
```
! ls -la
! npm install express
! git status
```

#### Note Taking
```
# This is an important note about the project
# Remember to update the documentation
```

#### Plan Mode
- Press `Shift+Tab` to enter Plan Mode
- In Plan Mode, AI will analyze but not execute changes
- Use `/exit-plan-mode` to start executing

## Examples

### Basic Conversation
```bash
$ claude
Welcome to Open Claude Code
► Help me create a REST API with Express.js

🤖 I'll help you create a REST API with Express.js...
```

### One-shot Usage
```bash
$ claude -p "Generate a Python function to sort a list"
def sort_list(items, reverse=False):
    return sorted(items, reverse=reverse)
```

### Continuing Previous Work
```bash
$ claude -c
Resuming previous conversation...
► Continue working on the API we discussed
```

### Using Specific Model
```bash
$ claude --model gpt-4o "Review this code for security issues"
```

## Tool Usage

### File Operations
```
► Read the package.json file
► Create a new file called server.js with Express setup
► Edit line 15 in server.js to add error handling
```

### Code Development
```
► Generate unit tests for the user authentication module
► Refactor the database connection code to use async/await
► Add TypeScript types to the API endpoints
```

### System Tasks
```
► Install the required dependencies
► Run the test suite and fix any failures
► Create a Git commit with these changes
```

## Configuration

### User Settings (`~/.claude/settings.json`)
```json
{
  "model": "claude-3-5-sonnet-20241022",
  "fallbackModel": "gpt-4o-mini",
  "maxConcurrency": 10,
  "timeout": 30000,
  "debug": false,
  "verbose": false
}
```

### Project Settings (`.claude/settings.json`)
```json
{
  "projectName": "My Web App",
  "allowedTools": ["Read", "Write", "Edit", "Bash"],
  "disallowedTools": [],
  "customInstructions": "Always use TypeScript and include tests"
}
```

### MCP Configuration (`.mcp.json`)
```json
{
  "servers": {
    "database": {
      "command": "python",
      "args": ["-m", "database_mcp_server"],
      "transport": "stdio",
      "env": {
        "DB_URL": "postgresql://localhost/mydb"
      }
    },
    "web-scraper": {
      "transport": "http",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

## Troubleshooting

### Common Issues

#### Authentication Problems
```bash
# Re-authenticate
claude /login

# Check authentication status
claude /status
```

#### Permission Errors
```bash
# Run with elevated permissions (dangerous)
claude --dangerously-skip-permissions

# Or grant specific permissions in settings
```

#### Model Errors
```bash
# Use fallback model
claude --model gpt-4o-mini

# Check available models
claude --help
```

### Debug Mode
```bash
# Enable detailed logging
claude --debug --verbose

# Check logs
tail -f ~/.claude/logs/debug.log
```

### Getting Help
- Use `/help` in interactive mode
- Check the GitHub repository for issues
- Read the full documentation at [project website]
```

**最终验证**：
```bash
# 运行完整测试套件
npm test

# 运行代码检查
npm run lint

# 构建生产版本
npm run build:prod

# 全局安装测试
npm run install:global

# 测试全局命令
claude --help
claude --version
claude "Hello, this is a test!"
```

---

## 🎉 项目完成检查清单

### ✅ 核心功能完成度检查

- [ ] **CLI命令系统** - 支持所有主要命令行参数
- [ ] **Agent主循环** - 基于nO函数的递归对话机制
- [ ] **消息压缩** - 基于wU2函数的智能压缩
- [ ] **上下文注入** - 基于Ie1函数的动态上下文
- [ ] **工具系统** - 15个内置工具的完整实现
- [ ] **并发控制** - gW5=10的并发限制机制
- [ ] **权限系统** - 完整的安全权限验证
- [ ] **UI界面** - React/Ink的终端界面
- [ ] **斜杠命令** - 所有主要快捷指令
- [ ] **特殊模式** - Plan模式、Bash模式、笔记模式
- [ ] **MCP支持** - 基本的MCP协议集成

### ✅ 质量保证检查

- [ ] **测试覆盖率** - 达到80%以上
- [ ] **代码风格** - 通过ESLint和Prettier检查
- [ ] **类型安全** - 通过TypeScript编译
- [ ] **文档完整** - README、USAGE、代码注释
- [ ] **错误处理** - 完善的错误捕获和恢复
- [ ] **性能优化** - 内存使用和响应时间合理

### ✅ 功能对比检查

| 功能 | 原版Claude Code | Open Claude Code | 完成度 |
|------|----------------|------------------|--------|
| CLI启动 | ✅ | ✅ | 100% |
| 交互对话 | ✅ | ✅ | 95% |
| 工具执行 | ✅ | ✅ | 90% |
| 消息压缩 | ✅ | ✅ | 85% |
| 上下文注入 | ✅ | ✅ | 90% |
| 斜杠命令 | ✅ | ✅ | 80% |
| Plan模式 | ✅ | ✅ | 85% |
| MCP支持 | ✅ | ⚠️ | 60% |
| 会话管理 | ✅ | ⚠️ | 70% |
| UI体验 | ✅ | ✅ | 95% |

**总体完成度**: **88%**

### 🚀 部署和发布

1. **版本发布**：
   ```bash
   npm version 1.0.0
   npm publish
   ```

2. **GitHub发布**：
   - 创建Release Tag
   - 上传构建产物
   - 发布Release Notes

3. **文档发布**：
   - 更新README
   - 创建使用指南
   - 录制演示视频

---

## 📝 总结

通过以上16周的开发计划，您的团队将能够创建一个功能完整的Open Claude Code项目，实现对原版Claude Code 99%的功能复现。

**关键成功因素**：
1. **严格按照步骤执行** - 不跳过任何验证环节
2. **基于真实源码分析** - 确保实现的准确性
3. **持续测试验证** - 每个阶段都要充分测试
4. **代码质量控制** - 维持高标准的代码质量
5. **文档完整性** - 确保项目的可维护性

**预期成果**：
- 一个功能完整的开源AI编程助手
- 高质量的代码库和完整的文档
- 活跃的开源社区项目
- 为AI工具发展做出贡献

---

*本施工指南基于Claude Code v1.0.34的深度逆向分析，为初级程序员提供了详细的无脑操作步骤，确保项目的成功交付。*