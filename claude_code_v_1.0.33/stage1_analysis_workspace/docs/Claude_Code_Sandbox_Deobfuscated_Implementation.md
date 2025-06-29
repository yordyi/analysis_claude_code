# Claude Code 沙箱机制反混淆实现

## 目录
1. [核心沙箱类实现](#核心沙箱类实现)
2. [命令安全分析系统](#命令安全分析系统)
3. [权限验证框架](#权限验证框架)
4. [文件系统安全控制](#文件系统安全控制)
5. [网络访问限制](#网络访问限制)
6. [环境变量安全配置](#环境变量安全配置)

---

## 核心沙箱类实现

### MacOSSandboxProfile 类

基于混淆代码 `gZ0` 类的可读性重构：

```javascript
class MacOSSandboxProfile {
    constructor() {
        // 生成唯一的沙箱标识符
        const sandboxId = Math.floor(Math.random() * 65536)
            .toString(16)
            .padStart(4, "0");
        
        this.profilePath = path.join(
            os.tmpdir(), 
            `claude-sandbox-${sandboxId}.sb`
        );
        
        this.createSandboxProfile();
    }

    /**
     * 默认沙箱配置：采用白名单策略，默认拒绝所有操作
     */
    get defaultProfile() {
        return `(version 1)
;; Default deny strategy - whitelist approach
(deny default)

;; Essential filesystem operations - read-only access
(allow file-read*)
(allow file-read-metadata)
(allow file-ioctl)

;; Limited write access - only to /dev/null for output redirection
(allow file-write* (literal "/dev/null"))
(allow file-read-data (subpath "/dev/fd"))

;; System operations required for basic functionality
(allow sysctl-read)
(allow mach-lookup)
(allow process-exec)
(allow process-fork)

;; Signal handling for process control
(allow signal (target pgrp))`;
    }

    /**
     * 创建沙箱配置文件
     */
    createSandboxProfile() {
        try {
            fs.writeFileSync(this.profilePath, this.defaultProfile, {
                encoding: "utf8",
                flush: false
            });
        } catch (error) {
            logError(new Error(`Failed to write sandbox profile: ${error}`));
            throw error;
        }
    }

    /**
     * 获取配置文件路径
     */
    getProfilePath() {
        return this.profilePath;
    }

    /**
     * 将命令包装为沙箱执行
     */
    wrapCommand(command) {
        const quotedProfilePath = shellQuote([this.profilePath]);
        const wrappedCommand = `set -o pipefail; ${command}`;
        
        return shellQuote([
            `/usr/bin/sandbox-exec -f ${quotedProfilePath} bash -c ${shellQuote([wrappedCommand])}`
        ]);
    }

    /**
     * 清理临时配置文件
     */
    cleanup() {
        try {
            if (fs.existsSync(this.profilePath)) {
                fs.unlinkSync(this.profilePath);
            }
        } catch (error) {
            logError(new Error(`Failed to clean up sandbox profile: ${error}`));
        }
    }
}
```

### 沙箱可用性检测

```javascript
/**
 * 检测系统是否支持 sandbox-exec
 */
function isSandboxAvailable() {
    // 注意：当前实现中被禁用
    return false;
    
    /* 原始检测逻辑：
    try {
        fs.accessSync("/usr/bin/sandbox-exec", fs.constants.X_OK);
        return true;
    } catch (error) {
        return false;
    }
    */
}

/**
 * 创建沙箱执行环境
 */
function createSandboxEnvironment(command) {
    if (!isSandboxAvailable()) {
        throw new Error("Sandbox mode requested but not available on this system");
    }

    try {
        const sandboxProfile = new MacOSSandboxProfile();
        
        return {
            finalCommand: sandboxProfile.wrapCommand(command),
            cleanup: () => sandboxProfile.cleanup()
        };
    } catch (error) {
        throw new Error("Sandbox mode requested but not available on this system");
    }
}
```

---

## 命令安全分析系统

### LLM 驱动的命令前缀检测

```javascript
/**
 * 命令安全分析器
 */
class CommandSecurityAnalyzer {
    /**
     * 分析命令的安全性和提取前缀
     */
    async analyzeCommand(command, abortSignal, isNonInteractive = false) {
        const analysisResult = await this.callLLMAnalysis({
            systemPrompt: [
                "Your task is to process Bash commands and extract security-relevant prefixes.",
                "Detect potential command injection, dangerous operations, and classify command types.",
                "Return the command prefix and security assessment."
            ],
            userPrompt: `Command: ${command}`,
            signal: abortSignal,
            enablePromptCaching: false,
            isNonInteractiveSession: isNonInteractive,
            promptCategory: "command_injection"
        });

        const extractedPrefix = this.extractCommandPrefix(analysisResult);
        
        // 检测命令注入标识符
        if (extractedPrefix.startsWith(COMMAND_INJECTION_MARKER)) {
            return {
                prefix: extractedPrefix,
                isError: true,
                reason: "Command injection detected"
            };
        }

        return {
            prefix: extractedPrefix,
            isError: false
        };
    }

    /**
     * 从 LLM 分析结果中提取命令前缀
     */
    extractCommandPrefix(analysisResult) {
        // 实现前缀提取逻辑
        // 这里是简化版本，实际实现会更复杂
        return analysisResult.commandPrefix || 'unknown';
    }

    /**
     * 调用 LLM 进行安全分析
     */
    async callLLMAnalysis(params) {
        return await LLMClient.analyze(params);
    }
}
```

### 命令类型分类器

```javascript
/**
 * 命令类型分类和安全评估
 */
class CommandClassifier {
    /**
     * 确定命令是否为只读操作
     */
    static isReadOnlyCommand(command) {
        const readOnlyPatterns = [
            /^\s*(ls|cat|head|tail|grep|find|ps|df|du|pwd|whoami|which|echo)\b/,
            /^\s*git\s+(status|log|diff|show|branch)\b/,
            /^\s*(npm|pip|gem|cargo)\s+(list|show|info)\b/,
            /^\s*(node|python|java|go)\s+--version\b/,
            /^\s*(man|help)\b/,
            /^\s*\w+\s+(-h|--help)\b/
        ];

        return readOnlyPatterns.some(pattern => pattern.test(command));
    }

    /**
     * 确定命令是否需要网络访问
     */
    static requiresNetworkAccess(command) {
        const networkPatterns = [
            /^\s*(curl|wget|git\s+clone|git\s+push|git\s+pull)\b/,
            /^\s*(npm\s+install|pip\s+install|cargo\s+install)\b/,
            /^\s*(gh|ping|ssh|scp|rsync)\b/,
            /https?:\/\/\S+/
        ];

        return networkPatterns.some(pattern => pattern.test(command));
    }

    /**
     * 确定命令是否为构建操作
     */
    static isBuildCommand(command) {
        const buildPatterns = [
            /^\s*(npm\s+run|yarn\s+run|pnpm\s+run)\b/,
            /^\s*(make|ninja|cmake|meson)\b/,
            /^\s*(cargo\s+build|cargo\s+test)\b/,
            /^\s*(pytest|jest|mocha)\b/
        ];

        return buildPatterns.some(pattern => pattern.test(command));
    }
}
```

---

## 权限验证框架

### 多层权限验证系统

```javascript
/**
 * 权限验证管理器
 */
class PermissionManager {
    /**
     * 检查命令执行权限
     */
    async checkCommandPermissions(input, context) {
        // 第一层：命令安全分析
        const securityAnalysis = await this.analyzer.analyzeCommand(
            input.command,
            context.abortController.signal,
            context.isNonInteractiveSession
        );

        if (securityAnalysis.isError) {
            return {
                isAllowed: false,
                denialReason: `Command not allowed: ${securityAnalysis.prefix}`,
                securityReason: securityAnalysis.reason
            };
        }

        // 第二层：用户权限验证
        const userPermission = await this.checkUserPermission(
            securityAnalysis.prefix,
            context.userId
        );

        if (!userPermission.isAllowed) {
            return {
                isAllowed: false,
                denialReason: userPermission.denialReason,
                requiresApproval: true
            };
        }

        return {
            isAllowed: true,
            commandPrefix: securityAnalysis.prefix
        };
    }

    /**
     * 检查用户对特定命令前缀的权限
     */
    async checkUserPermission(commandPrefix, userId) {
        const userPermissions = await this.getUserPermissions(userId);
        
        // 检查是否在用户的允许列表中
        if (userPermissions.allowedPrefixes.includes(commandPrefix)) {
            return { isAllowed: true };
        }

        // 检查是否在全局禁止列表中
        if (this.globalDeniedPrefixes.includes(commandPrefix)) {
            return {
                isAllowed: false,
                denialReason: "Command prefix is globally restricted"
            };
        }

        // 需要用户授权
        return {
            isAllowed: false,
            denialReason: "Command requires user authorization",
            requiresUserApproval: true
        };
    }

    /**
     * 获取用户权限配置
     */
    async getUserPermissions(userId) {
        // 从权限存储中获取用户权限
        return await this.permissionStore.getUserPermissions(userId);
    }
}
```

### 沙箱模式权限决策

```javascript
/**
 * 沙箱权限决策器
 */
class SandboxPermissionDecider {
    /**
     * 决定是否允许沙箱执行
     */
    static decideSandboxPermission(input, tool) {
        // 如果是只读命令，自动允许沙箱执行
        if (tool.isReadOnly(input)) {
            return {
                behavior: "allow",
                updatedInput: input,
                decisionReason: {
                    type: "automatic",
                    reason: "Sandboxed read-only command is automatically allowed"
                }
            };
        }

        // 需要用户确认的写入操作
        return {
            behavior: "ask",
            message: `Claude requested permissions to use ${tool.name}, but you haven't granted it yet.`,
            decisionReason: {
                type: "permission_required",
                reason: "Write operations require explicit permission"
            }
        };
    }

    /**
     * 生成沙箱执行建议
     */
    static generateSandboxRecommendation(command) {
        if (CommandClassifier.isReadOnlyCommand(command)) {
            return {
                useSandbox: true,
                reason: "Command appears to be read-only and safe for sandbox execution"
            };
        }

        if (CommandClassifier.requiresNetworkAccess(command)) {
            return {
                useSandbox: false,
                reason: "Command requires network access which is not available in sandbox"
            };
        }

        if (CommandClassifier.isBuildCommand(command)) {
            return {
                useSandbox: false,
                reason: "Build commands typically require write access and should not use sandbox"
            };
        }

        return {
            useSandbox: false,
            reason: "Command may require system access beyond sandbox limitations"
        };
    }
}
```

---

## 文件系统安全控制

### 路径验证和目录遍历防护

```javascript
/**
 * 文件系统安全管理器
 */
class FileSystemSecurityManager {
    constructor(initialWorkingDirectory) {
        this.initialWorkingDirectory = path.resolve(initialWorkingDirectory);
    }

    /**
     * 验证目录切换是否安全
     */
    validateDirectoryChange(targetDirectory, currentDirectory) {
        const resolvedTarget = this.resolvePath(currentDirectory, targetDirectory);
        const normalizedTarget = this.normalizePath(resolvedTarget);
        const normalizedBase = this.normalizePath(this.initialWorkingDirectory);

        // 检查目标路径是否在允许的范围内
        if (!this.isPathWithinBase(normalizedTarget, normalizedBase)) {
            return {
                isAllowed: false,
                error: `ERROR: cd to '${targetDirectory}' was blocked. For security, ` +
                       `Claude Code may only change directories to child directories of ` +
                       `the original working directory (${this.initialWorkingDirectory}) for this session.`
            };
        }

        return {
            isAllowed: true,
            resolvedPath: resolvedTarget
        };
    }

    /**
     * 解析路径（处理相对路径和绝对路径）
     */
    resolvePath(basePath, targetPath) {
        if (path.isAbsolute(targetPath)) {
            return targetPath;
        }
        return path.resolve(basePath, targetPath);
    }

    /**
     * 规范化路径（处理符号链接和 ../ 等）
     */
    normalizePath(filePath) {
        try {
            return fs.realpathSync(filePath);
        } catch (error) {
            // 如果路径不存在，使用路径规范化
            return path.normalize(filePath);
        }
    }

    /**
     * 检查路径是否在基础目录内
     */
    isPathWithinBase(targetPath, basePath) {
        const relativePath = path.relative(basePath, targetPath);
        
        // 如果相对路径以 ../ 开始，说明超出了基础目录
        return !relativePath.startsWith('..') && 
               !path.isAbsolute(relativePath);
    }

    /**
     * 验证文件访问权限
     */
    validateFileAccess(filePath, accessType = 'read') {
        const normalizedPath = this.normalizePath(filePath);
        const basePath = this.normalizePath(this.initialWorkingDirectory);

        if (!this.isPathWithinBase(normalizedPath, basePath)) {
            return {
                isAllowed: false,
                error: `File access to '${filePath}' is outside the allowed directory scope`
            };
        }

        // 检查特殊路径限制
        if (this.isRestrictedPath(normalizedPath)) {
            return {
                isAllowed: false,
                error: `Access to '${filePath}' is restricted for security reasons`
            };
        }

        return {
            isAllowed: true,
            normalizedPath: normalizedPath
        };
    }

    /**
     * 检查是否为受限路径
     */
    isRestrictedPath(filePath) {
        const restrictedPaths = [
            '/etc',
            '/usr/bin',
            '/usr/sbin',
            '/System',
            process.env.HOME + '/Library',
            process.env.HOME + '/.ssh'
        ];

        return restrictedPaths.some(restricted => 
            filePath.startsWith(restricted)
        );
    }
}
```

---

## 网络访问限制

### 网络安全控制器

```javascript
/**
 * 网络访问控制管理器
 */
class NetworkAccessController {
    constructor() {
        this.allowedDomains = [
            'github.com',
            'docs.anthropic.com',
            'anthropic.com'
        ];
        
        this.trustedEndpoints = [
            'https://e531a1d9ec1de9064fae9d4affb0b0f4@o1158394.ingest.us.sentry.io/4508259541909504'
        ];
    }

    /**
     * 验证 URL 是否允许访问
     */
    validateURL(url) {
        try {
            const parsedURL = new URL(url);
            
            // 检查是否为可信端点
            if (this.trustedEndpoints.includes(url)) {
                return {
                    isAllowed: true,
                    reason: "Trusted endpoint"
                };
            }

            // 检查域名白名单
            if (this.allowedDomains.includes(parsedURL.hostname)) {
                return {
                    isAllowed: true,
                    reason: "Domain in allowlist"
                };
            }

            return {
                isAllowed: false,
                reason: `Domain '${parsedURL.hostname}' is not in the allowed list`
            };
        } catch (error) {
            return {
                isAllowed: false,
                reason: "Invalid URL format"
            };
        }
    }

    /**
     * 配置 HTTP 客户端安全设置
     */
    configureHTTPClient() {
        return {
            validateStatus: (status) => {
                // 只允许 2xx 状态码
                return status >= 200 && status < 300;
            },
            timeout: 30000, // 30秒超时
            maxRedirects: 3,
            headers: {
                'User-Agent': 'Claude-Code/1.0.34'
            }
        };
    }

    /**
     * 检查命令是否需要网络访问
     */
    checkCommandNetworkRequirement(command) {
        const networkPatterns = [
            /curl\s+/,
            /wget\s+/,
            /git\s+(clone|push|pull|fetch)/,
            /npm\s+install/,
            /pip\s+install/,
            /gh\s+/,
            /ssh\s+/,
            /https?:\/\/\S+/
        ];

        for (const pattern of networkPatterns) {
            if (pattern.test(command)) {
                return {
                    requiresNetwork: true,
                    matchedPattern: pattern.toString()
                };
            }
        }

        return {
            requiresNetwork: false
        };
    }
}
```

---

## 环境变量安全配置

### 工具专用环境配置

```javascript
/**
 * 环境变量安全配置管理器
 */
class EnvironmentSecurityManager {
    constructor() {
        this.toolConfigurations = this.initializeToolConfigurations();
    }

    /**
     * 初始化工具专用安全配置
     */
    initializeToolConfigurations() {
        return [
            {
                name: 'git',
                patterns: [/^\s*(?:.*\/)?git\s+/],
                environmentVariables: {
                    GIT_TERMINAL_PROMPT: "0",           // 禁用交互提示
                    GIT_OPTIONAL_LOCKS: "0",            // 禁用可选锁
                    GIT_CONFIG_COUNT: "0"               // 禁用配置计数
                },
                configArguments: [
                    "-c", "core.fsmonitor=false",       // 禁用文件系统监控
                    "-c", "maintenance.auto=false",     // 禁用自动维护
                    "-c", "credential.helper="          // 清空凭证助手
                ]
            },
            {
                name: 'npm',
                patterns: [/\bnpm\b(?!-)/],
                environmentVariables: {
                    NPM_CONFIG_CACHE: "/dev/null",      // 禁用缓存
                    NPM_CONFIG_AUDIT: "false",          // 禁用安全审计
                    NPM_CONFIG_UPDATE_NOTIFIER: "false", // 禁用更新通知
                    NPM_CONFIG_FUND: "false",           // 禁用资金信息
                    NPM_CONFIG_PREFER_OFFLINE: "true",  // 优先离线模式
                    NPM_CONFIG_OFFLINE: "true",         // 强制离线模式
                    NPM_CONFIG_IGNORE_SCRIPTS: "true"   // 忽略脚本执行
                }
            },
            {
                name: 'yarn',
                patterns: [/\byarn\b/],
                environmentVariables: {
                    YARN_CACHE_FOLDER: "/dev/null",     // 禁用缓存文件夹
                    YARN_ENABLE_GLOBAL_CACHE: "false",  // 禁用全局缓存
                    YARN_ENABLE_MIRROR: "false",        // 禁用镜像
                    YARN_ENABLE_NETWORK: "false",       // 禁用网络
                    YARN_ENABLE_OFFLINE_MODE: "true",   // 启用离线模式
                    YARN_ENABLE_HARDLINKS_IN_NODE_MODULES: "false", // 禁用硬链接
                    YARN_INSTALL_STATE_PATH: "/dev/null", // 禁用安装状态
                    YARN_ENABLE_TELEMETRY: "0",         // 禁用遥测
                    YARN_ENABLE_SCRIPTS: "false"        // 禁用脚本
                }
            },
            {
                name: 'pnpm',
                patterns: [/\bpnpm\b/],
                environmentVariables: {
                    PNPM_OFFLINE: "true",               // 强制离线模式
                    PNPM_IGNORE_SCRIPTS: "true",        // 忽略脚本
                    PNPM_NO_OPTIONAL: "true"            // 跳过可选依赖
                }
            }
        ];
    }

    /**
     * 为命令应用安全环境配置
     */
    applySecurityConfiguration(command) {
        const matchedConfig = this.findMatchingConfiguration(command);
        
        if (!matchedConfig) {
            return {
                environmentVariables: {},
                configArguments: []
            };
        }

        return {
            toolName: matchedConfig.name,
            environmentVariables: matchedConfig.environmentVariables || {},
            configArguments: matchedConfig.configArguments || []
        };
    }

    /**
     * 查找匹配的工具配置
     */
    findMatchingConfiguration(command) {
        return this.toolConfigurations.find(config =>
            config.patterns.some(pattern => pattern.test(command))
        );
    }

    /**
     * 生成安全的环境变量
     */
    generateSecureEnvironment(baseEnv, additionalVars) {
        const secureEnv = { ...baseEnv };
        
        // 移除潜在的危险环境变量
        const dangerousVars = [
            'LD_PRELOAD',
            'DYLD_INSERT_LIBRARIES',
            'PYTHONPATH',
            'NODE_PATH',
            'JAVA_TOOL_OPTIONS'
        ];
        
        dangerousVars.forEach(varName => {
            delete secureEnv[varName];
        });

        // 添加安全配置的环境变量
        Object.assign(secureEnv, additionalVars);

        return secureEnv;
    }

    /**
     * 验证环境变量安全性
     */
    validateEnvironmentSecurity(envVars) {
        const issues = [];
        
        Object.entries(envVars).forEach(([key, value]) => {
            // 检查路径注入
            if (key.includes('PATH') && value.includes('..')) {
                issues.push(`Potential path traversal in ${key}: ${value}`);
            }
            
            // 检查脚本注入
            if (typeof value === 'string' && value.includes('$(')) {
                issues.push(`Potential command injection in ${key}: ${value}`);
            }
            
            // 检查权限提升
            if (key.toLowerCase().includes('sudo') || key.toLowerCase().includes('admin')) {
                issues.push(`Potential privilege escalation in ${key}: ${value}`);
            }
        });

        return {
            isSecure: issues.length === 0,
            issues: issues
        };
    }
}
```

---

## 集成示例

### 完整的沙箱执行流程

```javascript
/**
 * 沙箱执行协调器
 */
class SandboxExecutionCoordinator {
    constructor() {
        this.fileSystemManager = new FileSystemSecurityManager(process.cwd());
        this.permissionManager = new PermissionManager();
        this.networkController = new NetworkAccessController();
        this.environmentManager = new EnvironmentSecurityManager();
        this.commandAnalyzer = new CommandSecurityAnalyzer();
    }

    /**
     * 执行安全的命令
     */
    async executeSecureCommand(input, context) {
        try {
            // 1. 安全分析
            const securityCheck = await this.performSecurityAnalysis(input, context);
            if (!securityCheck.isSecure) {
                return this.createErrorResult(securityCheck.reason);
            }

            // 2. 权限验证
            const permissionResult = await this.permissionManager.checkCommandPermissions(input, context);
            if (!permissionResult.isAllowed) {
                return this.createDenialResult(permissionResult.denialReason);
            }

            // 3. 沙箱模式决策
            const sandboxDecision = SandboxPermissionDecider.decideSandboxPermission(input, context.tool);
            
            // 4. 执行命令
            if (sandboxDecision.behavior === "allow" && input.sandbox === true) {
                return await this.executeSandboxed(input, context);
            } else {
                return await this.executeStandard(input, context);
            }

        } catch (error) {
            return this.createErrorResult(`Execution failed: ${error.message}`);
        }
    }

    /**
     * 在沙箱中执行命令
     */
    async executeSandboxed(input, context) {
        if (!isSandboxAvailable()) {
            // 降级到标准执行
            return await this.executeStandard(input, context);
        }

        const sandboxEnv = createSandboxEnvironment(input.command);
        
        try {
            const result = await this.runCommand(sandboxEnv.finalCommand, {
                ...context,
                isSandboxed: true
            });
            
            return result;
        } finally {
            sandboxEnv.cleanup();
        }
    }

    /**
     * 执行安全分析
     */
    async performSecurityAnalysis(input, context) {
        // 网络访问检查
        const networkCheck = this.networkController.checkCommandNetworkRequirement(input.command);
        if (networkCheck.requiresNetwork && input.sandbox === true) {
            return {
                isSecure: false,
                reason: "Network access required but sandbox mode blocks network"
            };
        }

        // 文件系统安全检查
        if (this.containsDirectoryChange(input.command)) {
            const dirCheck = this.fileSystemManager.validateDirectoryChange(
                this.extractTargetDirectory(input.command),
                context.currentDirectory
            );
            
            if (!dirCheck.isAllowed) {
                return {
                    isSecure: false,
                    reason: dirCheck.error
                };
            }
        }

        return {
            isSecure: true
        };
    }

    /**
     * 创建错误结果
     */
    createErrorResult(reason) {
        return {
            success: false,
            error: reason,
            code: 1
        };
    }

    /**
     * 创建拒绝结果
     */
    createDenialResult(reason) {
        return {
            success: false,
            denied: true,
            reason: reason,
            code: 403
        };
    }
}
```

---

这个反混淆的实现展示了 Claude Code 沙箱机制的完整架构，包括：

1. **多层安全防护**：从文件系统到网络访问的全方位保护
2. **智能分析**：LLM 驱动的命令安全分析
3. **细粒度权限控制**：基于用户、命令类型和执行环境的权限管理
4. **环境隔离**：通过沙箱和环境变量确保执行安全
5. **优雅降级**：在沙箱不可用时的安全执行策略

这套机制体现了现代 AI 助手在安全性设计方面的最佳实践。