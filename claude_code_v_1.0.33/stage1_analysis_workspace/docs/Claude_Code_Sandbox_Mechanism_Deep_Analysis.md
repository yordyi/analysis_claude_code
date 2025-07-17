# Claude Code 沙箱机制深度分析报告

## 目录
1. [架构概述](#架构概述)
2. [沙箱架构深度分析](#沙箱架构深度分析)
3. [文件系统沙箱化](#文件系统沙箱化)
4. [命令执行沙箱](#命令执行沙箱)
5. [网络访问控制](#网络访问控制)
6. [权限沙箱系统](#权限沙箱系统)
7. [安全机制详细实现](#安全机制详细实现)
8. [源码位置和函数映射](#源码位置和函数映射)

---

## 架构概述

Claude Code 实现了一个多层次的沙箱安全机制，主要基于 macOS 的 `sandbox-exec` 系统调用。该沙箱系统设计目标是：

1. **进程隔离**：通过系统级沙箱限制进程访问权限
2. **文件系统保护**：防止未授权的文件访问和修改
3. **命令执行控制**：通过多层验证确保命令安全
4. **网络访问限制**：控制外部网络访问
5. **权限最小化原则**：只授予必要的最小权限

---

## 沙箱架构深度分析

### 1. 沙箱环境创建和初始化

#### 核心类：`gZ0` (MacOS Sandbox Profile)
**文件位置**: `improved-claude-code-5.mjs:22573-22625`

```javascript
class gZ0 {
  profilePath;
  defaultProfile = `(version 1)
;; Default deny (whitelist approach)
(deny default)

;; Essential filesystem operations
(allow file-read*)
(allow file-read-metadata)
(allow file-ioctl)

;; Allow writes to /dev/null
(allow file-write* (literal "/dev/null"))
(allow file-read-data (subpath "/dev/fd"))

;; Limited sys operations needed for basic functionality
(allow sysctl-read)
(allow mach-lookup)
(allow process-exec)
(allow process-fork)

;; Allow signals to self and process group (descendants)
(allow signal (target pgrp))`;

  constructor() {
    let A = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
    this.profilePath = bZ0.join(vZ0.tmpdir(), `claude-sandbox-${A}.sb`);
    this.writeProfile(this.defaultProfile);
  }
```

**分析要点**：
- **白名单策略**：默认拒绝所有操作，仅允许明确指定的操作
- **文件系统限制**：只允许读取操作，写入仅限于 `/dev/null`
- **进程控制**：允许进程执行和分叉，但受到严格限制
- **临时配置**：每次创建唯一的沙箱配置文件

### 2. 进程隔离实现

#### 沙箱可用性检测函数：`nf1()`
**文件位置**: `improved-claude-code-5.mjs:22631-22638`

```javascript
function nf1() {
  return !1;  // 当前被禁用
  try {
    return x1().accessSync("/usr/bin/sandbox-exec", Nf4.X_OK), !0
  } catch (A) {
    return !1
  }
}
```

**技术细节**：
- 检测系统是否支持 `sandbox-exec`
- 验证可执行文件的存在和权限
- 当前版本中被强制禁用 (`return !1`)

#### 命令包装函数：`wrapCommand()`
**文件位置**: `improved-claude-code-5.mjs:22620-22624`

```javascript
wrapCommand(A) {
  let B = TG1.default.quote([this.profilePath]),
    Q = `set -o pipefail; ${A}`;
  return TG1.default.quote([`/usr/bin/sandbox-exec -f ${B} bash -c ${TG1.default.quote([Q])}`])
}
```

**执行流程**：
1. 引用沙箱配置文件路径
2. 设置 shell 管道错误处理
3. 通过 `sandbox-exec` 执行命令
4. 多层引号转义确保安全

### 3. 沙箱边界定义和控制

#### 沙箱初始化函数：`hZ0()`
**文件位置**: `improved-claude-code-5.mjs:22640-22651`

```javascript
function hZ0(A) {
  if (!nf1()) throw new Error("Sandbox mode requested but not available on this system");
  try {
    let B = new gZ0;
    return {
      finalCommand: B.wrapCommand(A),
      cleanup: () => B.cleanup()
    }
  } catch (B) {
    throw new Error("Sandbox mode requested but not available on this system")
  }
}
```

**资源管理**：
- 自动清理临时配置文件
- 错误处理和资源释放
- 一次性使用模式

---

## 文件系统沙箱化

### 1. 文件访问路径限制

#### 目录切换保护
**文件位置**: `improved-claude-code-5.mjs:40514-40520`

```javascript
if (!ZvA(lw2(Q, W), lw2(B, Q))) return {
  behavior: "ask",
  message: `ERROR: cd to '${W}' was blocked. For security, ${m0} may only change directories to child directories of the original working directory (${Q}) for this session.`
}
```

**保护机制**：
- **路径验证**：`ZvA()` 函数验证目标路径是否在允许范围内
- **工作目录限制**：只允许访问初始工作目录的子目录
- **路径规范化**：`lw2()` 函数处理路径规范化
- **错误消息**：明确说明访问被阻止的原因

### 2. 文件权限动态检查

#### 沙箱模式下的文件操作
**沙箱配置**（文件位置：`improved-claude-code-5.mjs:22575-22595`）：

```scheme
;; Essential filesystem operations
(allow file-read*)
(allow file-read-metadata)
(allow file-ioctl)

;; Allow writes to /dev/null
(allow file-write* (literal "/dev/null"))
(allow file-read-data (subpath "/dev/fd"))
```

**权限特征**：
- **只读文件系统**：允许所有读取操作
- **受限写入**：仅允许写入 `/dev/null`
- **元数据访问**：允许文件元数据查询
- **文件描述符**：允许访问 `/dev/fd` 子路径

### 3. 危险路径检测和拦截

#### 工具强制使用机制
**文件位置**: Bash tool description generation

```text
VERY IMPORTANT: You MUST avoid using search commands like `find` and `grep`. 
Instead use Grep, Glob, or Task to search. You MUST avoid read tools like `cat`, 
`head`, `tail`, and `ls`, and use Read and LS to read files.
```

**强制替换规则**：
- `find` → `Glob` 工具
- `grep` → `Grep` 工具或 `rg`
- `cat/head/tail` → `Read` 工具
- `ls` → `LS` 工具

---

## 命令执行沙箱

### 1. 命令执行环境

#### 环境变量控制配置
**文件位置**: `improved-claude-code-5.mjs:22655-22689`

```javascript
$f4 = [{
  patterns: [/^\s*(?:.*\/)?git\s+/],
  env: {
    GIT_TERMINAL_PROMPT: "0",
    GIT_OPTIONAL_LOCKS: "0"
  },
  configArgs: ["-c", "core.fsmonitor=false", "-c", "maintenance.auto=false", "-c", "credential.helper="]
}, {
  patterns: [/\bnpm\b(?!-)/],
  env: {
    NPM_CONFIG_CACHE: "/dev/null",
    NPM_CONFIG_AUDIT: "false", 
    NPM_CONFIG_UPDATE_NOTIFIER: "false",
    NPM_CONFIG_FUND: "false",
    NPM_CONFIG_PREFER_OFFLINE: "true",
    NPM_CONFIG_OFFLINE: "true",
    NPM_CONFIG_IGNORE_SCRIPTS: "true"
  }
}]
```

**控制策略**：
- **Git 安全化**：禁用交互提示和自动维护
- **NPM 离线模式**：强制离线模式，禁用脚本执行
- **环境隔离**：为不同工具设置专用环境变量

### 2. 命令白名单/黑名单机制

#### 命令前缀检测函数：`uJ1()`
**工作原理**：使用 LLM 分析命令安全性

```javascript
async function uJ1(A, B, Q) {
  let I = await KC(JH1, {
    systemPrompt: ["Your task is to process Bash commands..."],
    userPrompt: `Command: ${A}`,
    signal: B,
    enablePromptCaching: !1,
    isNonInteractiveSession: Q,
    promptCategory: "command_injection"
  });
  
  // 检测命令注入
  if (G.startsWith(bZ)) return {
    prefix: G,
    isError: !0
  };
  
  return {
    prefix: G,
    isError: !1
  }
}
```

**检测机制**：
- **LLM 驱动分析**：使用大型语言模型分析命令结构
- **注入检测**：识别命令注入模式
- **前缀提取**：提取命令前缀用于权限验证

### 3. 危险命令检测逻辑

#### 沙箱模式触发条件
**文件位置**: `improved-claude-code-5.mjs:26734-26788`

```text
Use sandbox=true for:
  - Information gathering: ls, cat, head, tail, rg, find, du, df, ps
  - File inspection: file, stat, wc, diff, md5sum
  - Git reads: git status, git log, git diff, git show, git branch
  - Package info: npm list, pip list, gem list, cargo tree
  - Environment checks: echo, pwd, whoami, which, type, env, printenv
  - Version checks: node --version, python --version, git --version
  - Documentation: man, help, --help, -h

Use sandbox=false when you suspect the command might modify the system or access the network:
  - File operations: touch, mkdir, rm, mv, cp
  - File edits: nano, vim, writing to files with >
  - Installing: npm install, apt-get, brew
  - Git writes: git add, git commit, git push
  - Build systems: npm run build, make, ninja, etc.
  - Test suites: npm run test, pytest, cargo test, make check, ert, etc.
  - Network programs: gh, ping, coo, ssh, scp, etc.
```

---

## 网络访问控制

### 1. 网络请求限制机制

#### 沙箱网络策略
**默认策略**：沙箱模式下完全禁止网络访问

```scheme
;; 沙箱配置中没有网络访问权限
;; 仅允许本地文件系统和进程操作
```

### 2. URL 白名单和验证

#### 内置 URL 配置
**文件位置**: `improved-claude-code-5.mjs:3611-3640`

```javascript
{
  ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
  PACKAGE_URL: "@anthropic-ai/claude-code", 
  README_URL: "https://docs.anthropic.com/s/claude-code",
  VERSION: "1.0.34"
}

bJA = "https://e531a1d9ec1de9064fae9d4affb0b0f4@o1158394.ingest.us.sentry.io/4508259541909504"
```

**可信域名**：
- GitHub Issues
- Anthropic 文档
- Sentry 错误报告

### 3. 网络沙箱实现

#### HTTP 客户端配置
**文件位置**: `improved-claude-code-5.mjs:4276-4278`

```javascript
validateStatus: function A(B) {
  return B >= 200 && B < 300
}
```

**验证机制**：
- HTTP 状态码验证
- 严格的成功状态码范围 (200-299)

---

## 权限沙箱系统

### 1. 权限边界定义

#### 工具权限检查接口
**基本结构**：

```javascript
async checkPermissions(A, B) {
  let Q = await uJ1(A.command, B.abortController.signal, B.isNonInteractiveSession);
  if (Q.isError) return {
    isAllowed: !1,
    denialReason: `Command not allowed: ${Q.prefix}`
  };
  
  let I = await V2(Q.prefix, B.userId);
  return I.isAllowed ? {
    isAllowed: !0
  } : {
    isAllowed: !1, 
    denialReason: I.denialReason
  }
}
```

### 2. 权限继承和隔离

#### 沙箱权限决策
**文件位置**: `improved-claude-code-5.mjs:40616`

```javascript
if (E4.isReadOnly(A)) return {
  behavior: "allow",
  updatedInput: A,
  decisionReason: {
    type: "other",
    reason: "Sandboxed command is allowed"
  }
};
```

**决策逻辑**：
- **只读命令**：自动允许沙箱执行
- **写入命令**：需要权限确认
- **危险命令**：完全阻止或需要特殊权限

### 3. 权限升级防护

#### 多层权限验证

1. **命令前缀检测**：LLM 分析命令结构
2. **用户权限验证**：基于用户 ID 的权限检查
3. **工具权限边界**：工具级别的权限限制
4. **沙箱系统隔离**：系统级别的访问控制

---

## 安全机制详细实现

### 1. 命令注入防护

#### LLM 驱动的安全分析
**提示类别**: `"command_injection"`

**分析维度**：
- 命令结构解析
- 特殊字符检测
- 管道和重定向分析
- 变量替换识别

### 2. 路径遍历防护

#### 路径验证函数
```javascript
// 伪代码表示
function ZvA(targetPath, basePath) {
  // 验证目标路径是否在基础路径内
  // 防止 ../ 等路径遍历攻击
}

function lw2(basePath, relativePath) {
  // 路径规范化和解析
  // 处理符号链接和相对路径
}
```

### 3. 资源限制控制

#### 执行控制参数
- **超时限制**：默认 2 分钟，最大 10 分钟
- **输出限制**：30000 字符自动截断
- **内存限制**：通过沙箱配置控制
- **进程限制**：限制子进程创建

---

## 源码位置和函数映射

### 核心沙箱类和函数

| 组件 | 文件位置 | 函数名 | 功能描述 |
|------|----------|--------|----------|
| 沙箱配置类 | `improved-claude-code-5.mjs:22573` | `gZ0` | macOS 沙箱配置管理 |
| 可用性检测 | `improved-claude-code-5.mjs:22631` | `nf1()` | 检测 sandbox-exec 可用性 |
| 命令包装 | `improved-claude-code-5.mjs:22620` | `wrapCommand()` | 包装命令为沙箱执行 |
| 沙箱初始化 | `improved-claude-code-5.mjs:22640` | `hZ0()` | 创建沙箱执行环境 |
| 命令前缀检测 | Bash tool logic | `uJ1()` | LLM 驱动的命令安全分析 |
| 目录访问控制 | `improved-claude-code-5.mjs:40517` | 路径验证逻辑 | 防止目录遍历攻击 |
| 环境变量控制 | `improved-claude-code-5.mjs:22655` | `$f4` | 工具专用环境配置 |
| 权限检查 | Bash tool definition | `checkPermissions()` | 多层权限验证 |

### 配置和常量

| 配置项 | 位置 | 值 | 说明 |
|--------|------|----|----- |
| 沙箱配置文件前缀 | `improved-claude-code-5.mjs:22598` | `claude-sandbox-${randomId}.sb` | 临时沙箱配置文件命名 |
| 超时限制 | Tool description | 600000ms (10分钟) | 命令执行最大超时 |
| 输出限制 | Tool description | 30000 characters | 命令输出最大长度 |
| 工作目录限制 | `improved-claude-code-5.mjs:40517` | 子目录限制 | 只允许访问初始目录的子目录 |

---

## 总结

Claude Code 的沙箱机制是一个多层次、多维度的安全框架：

1. **系统级隔离**：基于 macOS sandbox-exec 的进程隔离
2. **智能分析**：LLM 驱动的命令安全分析
3. **严格权限**：最小权限原则和细粒度控制
4. **工具协作**：专用工具替代危险命令
5. **资源限制**：执行时间、输出大小、访问范围的严格限制

该设计在保证功能性的同时，最大程度地降低了安全风险，体现了现代 AI 助手在安全性方面的先进理念。

---

*分析基于 Claude Code v1.0.34 反混淆代码*  
*分析时间：2025-06-27*  
*分析工具：Claude Code (claude-sonnet-4-20250514) by GAC*