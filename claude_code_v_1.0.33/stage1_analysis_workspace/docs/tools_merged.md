# Bash Tool (ZK)

## 基本信息
- **工具名称**: Bash
- **内部常量**: ZK = "Bash"
- **文件位置**: improved-claude-code-5.mjs:26679, 40875
- **工具类型**: 命令行执行工具

## 代码运行时机
- **触发条件**: 用户需要执行shell命令时
- **调用场景**: 
  - 构建和编译项目
  - 运行测试和脚本
  - Git版本控制操作
  - 文件系统操作
  - 软件包管理
- **执行路径**: 用户请求 → 命令安全检查 → 权限验证 → Bash工具调用 → 系统执行

## 系统运转时机
- **生命周期**: 命令级别，每个命令独立执行
- **优先级**: 高优先级，核心功能工具
- **持续性**: 持久化shell会话，命令间状态保持

## 作用时机
- **安全预检**: 在执行前进行命令前缀分析和注入检测
- **权限验证**: 检查用户对特定命令的执行权限
- **环境准备**: 设置执行环境和工作目录
- **执行监控**: 超时控制和输出限制

## 作用目的
1. **命令执行**: 提供安全的shell命令执行能力
2. **开发支持**: 支持常见的开发工作流程
3. **安全保障**: 通过多层检查防止恶意命令执行
4. **用户体验**: 提供友好的命令行交互体验
5. **系统集成**: 与其他工具和服务无缝集成

## 具体作用
- **命令解析**: 分析命令结构和参数
- **安全检查**: 检测命令注入和恶意模式
- **权限管理**: 根据用户权限控制命令执行
- **环境隔离**: 在安全环境中执行命令
- **结果处理**: 格式化输出并处理错误

## 描述生成函数
```javascript
// xa0函数生成工具描述 (Line 26696-26791)
function xa0(A, B, Q, I, G, Z) {
  return `Executes a given bash command in a persistent shell session with optional timeout, ensuring proper handling and security measures.

Before executing the command, please follow these steps:

1. Directory Verification:
   - If the command will create new directories or files, first use the ${I} tool to verify the parent directory exists and is the correct location
   - For example, before running "mkdir foo/bar", first use ${I} to check that "foo" exists and is the intended parent directory

2. Command Execution:
   - Always quote file paths that contain spaces with double quotes (e.g., cd "path with spaces/file.txt")
   - Examples of proper quoting:
     - cd "/Users/name/My Documents" (correct)
     - cd /Users/name/My Documents (incorrect - will fail)
     - python "/path/with spaces/script.py" (correct)
     - python /path/with spaces/script.py (incorrect - will fail)
   - After ensuring proper quoting, execute the command.
   - Capture the output of the command.

Usage notes:
  - The command argument is required.
  - You can specify an optional timeout in milliseconds (up to ${CJ1()}ms / ${CJ1()/60000} minutes). If not specified, commands will timeout after ${Em()}ms (${Em()/60000} minutes).
  - It is very helpful if you write a clear, concise description of what this command does in 5-10 words.
  - If the output exceeds ${KJ1()} characters, output will be truncated before being returned to you.
  - VERY IMPORTANT: You MUST avoid using search commands like \`find\` and \`grep\`. Instead use ${XJ1}, ${FJ1}, or ${cX} to search. You MUST avoid read tools like \`cat\`, \`head\`, \`tail\`, and \`ls\`, and use ${TD} and ${VJ1} to read files.
  - If you _still_ need to run \`grep\`, STOP. ALWAYS USE ripgrep at \`rg\` first, which all ${m0} users have pre-installed.
  - When issuing multiple commands, use the ';' or '&&' operator to separate them. DO NOT use newlines (newlines are ok in quoted strings).
  - Try to maintain your current working directory throughout the session by using absolute paths and avoiding usage of \`cd\`. You may use \`cd\` if the User explicitly requests it.`
}
```

## 相关上下文代码
```javascript
// 工具对象定义 (Line 40875)
{
  name: ZK,
  async description() {
    return xa0(A, B, Q, I, G, Z)  // 动态生成描述
  },
  inputSchema: DH5,  // 参数架构
  userFacingName() {
    return "Bash"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !1,  // 非并发安全
  isReadOnly: () => !1,         // 非只读操作
  
  async checkPermissions(A, B) {
    // 权限检查逻辑
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
}
```

## 核心安全机制

### 1. 命令前缀检测 (uJ1函数)
```javascript
// 使用LLM分析命令前缀和注入检测
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

### 2. 权限验证系统
- **前缀匹配**: 根据命令前缀检查用户权限
- **白名单机制**: 允许的命令前缀列表
- **动态权限**: 基于用户角色的动态权限控制

### 3. 沙箱模式支持
```javascript
// 沙箱执行检测
if (A.sandbox === !0) {
  // 只读操作的沙箱执行
  return await executeInSandbox(A.command);
}
```

## 参数架构
```javascript
DH5 = n.strictObject({
  command: n.string().describe("The command to execute"),
  description: n.string().optional().describe("Clear, concise description of what this command does in 5-10 words"),
  timeout: n.number().optional().max(600000).describe("Optional timeout in milliseconds (max 600000)")
})
```

## Git工作流特殊处理

### 提交流程自动化
```javascript
// Git提交的特殊指导
# Committing changes with git

When the user asks you to create a new git commit, follow these steps carefully:

1. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following bash commands in parallel, each using the Bash tool:
  - Run a git status command to see all untracked files.
  - Run a git diff command to see both staged and unstaged changes that will be committed.
  - Run a git log command to see recent commit messages, so that you can follow this repository's commit message style.

2. Analyze all staged changes (both previously staged and newly added) and draft a commit message:
  - Summarize the nature of the changes (eg. new feature, enhancement to an existing feature, bug fix, refactoring, test, docs, etc.). Ensure the message accurately reflects the changes and their purpose (i.e. "add" means a wholly new feature, "update" means an enhancement to an existing feature, "fix" means a bug fix, etc.).
  - Check for any sensitive information that shouldn't be committed
  - Draft a concise (1-2 sentences) commit message that focuses on the "why" rather than the "what"
  - Ensure it accurately reflects the changes and their purpose

3. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following commands in parallel:
   - Add relevant untracked files to the staging area.
   - Create the commit with a message
   - Run git status to make sure the commit succeeded.

4. If the commit fails due to pre-commit hook changes, retry the commit ONCE to include these automated changes. If it fails again, it usually means a pre-commit hook is preventing the commit. If the commit succeeds but you notice that files were modified by the pre-commit hook, you MUST amend your commit to include them.
```

## 安全约束和最佳实践

### 禁止的命令模式
1. **find命令**: 强制使用Glob工具替代
2. **grep命令**: 强制使用Grep工具或ripgrep
3. **cat/head/tail**: 强制使用Read工具
4. **ls命令**: 强制使用LS工具

### 路径处理规范
1. **引号要求**: 包含空格的路径必须使用双引号
2. **绝对路径**: 建议使用绝对路径避免cd使用
3. **目录验证**: 创建文件前先验证父目录存在

### 执行控制
1. **超时限制**: 默认2分钟，最大10分钟
2. **输出限制**: 超过30000字符自动截断
3. **命令链接**: 使用';'或'&&'连接多个命令

## 错误处理和安全措施

### 1. 命令注入防护
- LLM驱动的命令分析
- 特殊字符和模式检测
- 命令链和重定向检测

### 2. 权限边界
- 基于前缀的权限控制
- 用户角色权限映射
- 动态权限评估

### 3. 执行监控
- 实时输出监控
- 超时自动终止
- 资源使用限制

## 性能特征
- **并发安全**: isConcurrencySafe() = false (shell状态共享)
- **读写操作**: isReadOnly() = false
- **持久会话**: 维护shell状态在命令间
- **流式输出**: 支持实时输出显示

## 架构地位
Bash工具是Claude Code的核心执行引擎，承担了几乎所有与系统交互的任务。它的设计体现了Claude Code在功能性、安全性和易用性之间的精细平衡，是整个工具生态系统的基石。

## 技术特点
1. **智能安全**: LLM驱动的命令安全分析
2. **权限精细**: 基于前缀的细粒度权限控制
3. **工具集成**: 与专用工具的智能协作
4. **用户引导**: 详细的使用指导和最佳实践
5. **状态管理**: 持久化shell会话状态# Edit Tool (oU)

## 基本信息
- **工具名称**: Edit
- **内部常量**: oU = "Edit"
- **文件位置**: improved-claude-code-5.mjs:14169, 42526
- **工具类型**: 文件编辑工具

## 代码运行时机
- **触发条件**: 用户需要修改文件内容时
- **调用场景**: 
  - 代码修改和重构
  - 配置文件更新
  - 文档内容编辑
  - Bug修复
  - 功能添加和增强
- **执行路径**: 用户请求 → 文件读取验证 → 内容匹配 → Edit工具调用 → 字符串替换 → 文件写入

## 系统运转时机
- **生命周期**: 操作级别，每次编辑操作独立执行
- **优先级**: 高优先级，核心编辑功能
- **持续性**: 单次执行，结果持久化到文件系统

## 作用时机
- **读取验证**: 在编辑前必须已读取过文件内容
- **内容匹配**: 精确匹配old_string在文件中的位置
- **权限检查**: 验证文件写入权限
- **原子操作**: 确保编辑操作的原子性

## 作用目的
1. **精确编辑**: 提供精确的字符串替换能力
2. **安全修改**: 通过精确匹配防止误修改
3. **版本控制**: 支持可追踪的文件修改
4. **批量替换**: 支持全文替换模式
5. **错误防护**: 通过严格验证防止编辑错误

## 具体作用
- **字符串匹配**: 在文件中精确定位old_string
- **内容替换**: 将old_string替换为new_string
- **唯一性检查**: 确保old_string在文件中唯一或使用replace_all
- **行号保持**: 保持文件的行号结构
- **编码处理**: 正确处理文件编码

## 描述定义
```javascript
// 工具描述常量 (Line 14169)
NE2 = "Performs exact string replacements in files.\n\nUsage:\n- You must use your `Read` tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file.\n- When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appears AFTER the line number prefix. The line number prefix format is: spaces + line number + tab. Everything after that tab is the actual file content to match. Never include any part of the line number prefix in the old_string or new_string.\n- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.\n- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.\n- The edit will FAIL if `old_string` is not unique in the file. Either provide a larger string with more surrounding context to make it unique or use `replace_all` to change every instance of `old_string`.\n- Use `replace_all` for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance."
```

## 参数架构
```javascript
// 参数模式定义
inputSchema: n.strictObject({
  file_path: n.string().describe("The absolute path to the file to modify"),
  old_string: n.string().describe("The text to replace"),
  new_string: n.string().describe("The text to replace it with (must be different from old_string)"),
  replace_all: n.boolean().default(false).describe("Replace all occurences of old_string (default false)")
})
```

## 相关上下文代码
```javascript
// 工具对象定义 (Line 42526)
{
  name: oU,
  async description() {
    return NE2
  },
  inputSchema: tI5,
  userFacingName() {
    return "Edit"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !1,  // 非并发安全
  isReadOnly: () => !1,         // 非只读操作
  
  async validateInput(A, B) {
    // 验证必须先读取文件
    if (!B.hasReadFile(A.file_path)) {
      throw new Error("You must use the Read tool to read the file before editing it")
    }
    
    // 验证old_string和new_string不同
    if (A.old_string === A.new_string) {
      throw new Error("old_string and new_string must be different")
    }
    
    return A
  }
}
```

## 核心安全机制

### 1. 读取前置要求
```javascript
// 必须先读取文件才能编辑
if (!B.hasReadFile(A.file_path)) {
  throw new Error("You must use the Read tool to read the file before editing it")
}
```

### 2. 唯一性验证
```javascript
// 确保old_string在文件中唯一或使用replace_all
if (!A.replace_all && countOccurrences(fileContent, A.old_string) > 1) {
  throw new Error("old_string is not unique in the file. Use replace_all or provide more context")
}
```

### 3. 内容验证
```javascript
// 验证old_string存在于文件中
if (!fileContent.includes(A.old_string)) {
  throw new Error("old_string not found in file")
}
```

## 编辑模式

### 1. 单次替换模式 (replace_all: false)
- **要求**: old_string在文件中必须唯一
- **用途**: 精确的单点修改
- **安全性**: 防止意外的多处修改

### 2. 全文替换模式 (replace_all: true)
- **功能**: 替换文件中所有old_string出现
- **用途**: 变量重命名、批量修改
- **效率**: 一次操作完成所有替换

## 行号处理规范

### 1. 行号前缀格式
```
spaces + line number + tab + actual content
```

### 2. 内容提取规则
- 从Read工具输出中提取内容时忽略行号前缀
- 只匹配tab之后的实际文件内容
- 保持原始的缩进和空白字符

### 3. 缩进保持
```javascript
// 正确的缩进提取示例
"     42→    function example() {"
// 应该提取: "    function example() {"
// 而不是: "     42→    function example() {"
```

## 权限和验证

### 1. 文件权限检查
```javascript
async checkPermissions(A, B) {
  return await AX5(A.file_path, B)  // 使用通用权限检查
}
```

### 2. 路径验证
- 绝对路径要求
- 文件存在性检查
- 写入权限验证

### 3. 内容验证
- old_string存在性验证
- 字符串差异验证
- 编码兼容性检查

## 错误处理机制

### 1. 前置条件错误
- 未读取文件错误
- 相同字符串错误
- 路径无效错误

### 2. 匹配错误
- old_string未找到
- 多重匹配但未设置replace_all
- 编码不匹配

### 3. 系统错误
- 文件权限错误
- 磁盘空间不足
- I/O错误

## 使用最佳实践

### 1. 编辑前准备
```javascript
// 标准编辑流程
1. 使用Read工具读取文件
2. 分析文件内容结构
3. 确定精确的old_string
4. 使用Edit工具进行修改
```

### 2. 字符串选择
- 选择足够特定的old_string确保唯一性
- 包含周围上下文增加匹配精度
- 避免包含行号前缀

### 3. 批量操作
- 使用replace_all进行变量重命名
- 考虑使用MultiEdit进行多点修改
- 避免过于宽泛的替换模式

## 工具协作

### 1. 与Read工具的依赖
```javascript
// 强制依赖关系
Edit工具 → 必须先使用Read工具
```

### 2. 与MultiEdit工具的关系
- MultiEdit内部使用Edit工具
- 适用于多处修改场景
- 提供事务性编辑保证

### 3. 与Write工具的区别
- Edit: 修改现有文件
- Write: 创建新文件或完全重写

## 性能特征
- **并发安全**: isConcurrencySafe() = false (文件修改操作)
- **读写操作**: isReadOnly() = false
- **原子性**: 单个编辑操作的原子性保证
- **效率**: 基于字符串操作的高效实现

## 安全设计原则

### 1. 防止误修改
- 精确字符串匹配
- 唯一性验证
- 读取前置要求

### 2. 操作可追踪
- 明确的old_string/new_string记录
- 文件修改历史
- 错误信息详细记录

### 3. 权限控制
- 文件级别权限检查
- 用户级别访问控制
- 路径安全验证

## 架构地位
Edit工具是Claude Code文件编辑功能的核心，为代码修改、配置更新等关键操作提供了安全、精确的编辑能力。它的设计体现了在功能性和安全性之间的精心平衡，是开发工作流中不可或缺的工具。

## 技术特点
1. **精确性**: 基于精确字符串匹配的编辑机制
2. **安全性**: 多层验证和错误防护
3. **可靠性**: 原子性操作和一致性保证
4. **易用性**: 清晰的错误信息和使用指导
5. **集成性**: 与其他工具的良好协作机制# Glob Tool (FJ1)

## 基本信息
- **工具名称**: Glob
- **内部常量**: FJ1 = "Glob"
- **文件位置**: improved-claude-code-5.mjs:26618
- **工具类型**: 文件模式匹配工具

## 代码运行时机
- **触发条件**: 用户需要根据模式查找文件时
- **调用场景**: 
  - 按文件名模式搜索文件
  - 批量文件操作前的文件收集
  - 特定类型文件的发现
  - 项目结构分析
  - 文件清理和组织
- **执行路径**: 用户请求 → 模式解析 → Glob工具调用 → 文件系统扫描 → 结果排序

## 系统运转时机
- **生命周期**: 查询级别，每次模式匹配独立执行
- **优先级**: 高优先级，基础搜索工具
- **持续性**: 单次执行，结果用于当前对话上下文

## 作用时机
- **模式预处理**: 解析和验证glob模式
- **路径扫描**: 在指定目录中递归搜索
- **匹配过滤**: 应用模式过滤文件
- **结果排序**: 按修改时间排序匹配结果

## 作用目的
1. **文件发现**: 根据模式快速找到目标文件
2. **批量操作**: 为批量文件操作提供文件列表
3. **项目分析**: 分析项目中特定类型的文件
4. **代码搜索**: 在特定文件类型中搜索代码
5. **文件组织**: 帮助理解和组织项目文件结构

## 具体作用
- **模式匹配**: 支持通配符和复杂模式匹配
- **递归搜索**: 在目录树中递归查找文件
- **类型过滤**: 按文件扩展名过滤
- **路径匹配**: 支持完整路径的模式匹配
- **结果优化**: 按相关性和时间排序结果

## 描述定义
```javascript
// 工具描述常量 (Line 26618)
vc1 = "- Fast file pattern matching tool that works with any codebase size\n- Supports glob patterns like \"**/*.js\" or \"src/**/*.ts\"\n- Returns matching file paths sorted by modification time\n- Use this tool when you need to find files by name patterns\n- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead\n- You have the capability to call multiple tools in a single response. It is always better to speculatively perform multiple searches as a batch that are potentially useful."
```

## 参数架构
```javascript
// 参数模式定义
inputSchema: n.strictObject({
  pattern: n.string().describe("The glob pattern to match files against"),
  path: n.string().optional().describe("The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter \"undefined\" or \"null\" - simply omit it for the default behavior. Must be a valid directory path if provided.")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
FJ1 = "Glob"  // Line 26618

// 工具对象定义
{
  name: FJ1,
  async description() {
    return vc1
  },
  inputSchema: wZ5,
  userFacingName() {
    return "Glob"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !0,
  async checkPermissions(A, B) {
    let Q = A.path || process.cwd();
    return await AX5(Q, B)
  }
}
```

## Glob模式支持

### 1. 基本通配符
```javascript
// 基本模式示例
"*.js"          // 当前目录下所有.js文件
"*.{js,ts}"     // 当前目录下所有.js和.ts文件
"test_*.py"     // 以test_开头的.py文件
"[0-9]*.txt"    // 以数字开头的.txt文件
```

### 2. 递归模式
```javascript
// 递归搜索模式
"**/*.js"           // 所有目录下的.js文件
"src/**/*.ts"       // src目录下所有.ts文件
"**/test/**/*.py"   // 任何test目录下的.py文件
"lib/**/index.js"   // lib下任何层级的index.js
```

### 3. 复杂模式
```javascript
// 复杂匹配模式
"src/**/{component,util}/*.tsx"  // 特定目录下的.tsx文件
"**/*.{test,spec}.{js,ts}"       // 测试文件模式
"!node_modules/**"               // 排除模式(如果支持)
"src/**/*.ts"                    // TypeScript源文件
```

## 核心实现逻辑
```javascript
// 主要调用方法
async * call(A, B) {
  let Q = A.path || process.cwd();
  
  let I = await V2(Q, B.userId);
  if (!I.isAllowed) {
    yield {
      type: "error",
      error: I.denialReason
    };
    return
  }
  
  let G = await dY5(A.pattern, Q, B);
  yield {
    type: "text",
    text: formatGlobResults(G)
  }
}
```

## 搜索策略

### 1. 目录处理
- **默认目录**: 如果未指定path，使用当前工作目录
- **路径验证**: 验证指定路径的存在性和权限
- **递归深度**: 智能控制递归深度防止性能问题

### 2. 模式优化
- **模式预编译**: 预编译glob模式提高性能
- **早期终止**: 在大型项目中智能终止搜索
- **缓存机制**: 缓存常用模式的搜索结果

### 3. 结果处理
- **修改时间排序**: 按文件修改时间排序结果
- **相关性评分**: 根据模式匹配度评分
- **路径标准化**: 统一路径格式和表示

## 性能优化

### 1. 大型代码库支持
```
"Fast file pattern matching tool that works with any codebase size"
```

### 2. 批量搜索建议
```
"It is always better to speculatively perform multiple searches as a batch that are potentially useful"
```

### 3. 智能搜索引导
```
"When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead"
```

## 与其他工具的协作

### 1. 与Grep工具配合
```javascript
// 典型工作流
1. Glob找到目标文件类型
2. Grep在这些文件中搜索内容
3. Read读取具体文件内容
```

### 2. 与LS工具的差异
| 方面 | Glob工具 | LS工具 |
|------|----------|--------|
| 搜索方式 | 模式匹配 | 目录列表 |
| 搜索范围 | 递归搜索 | 单层目录 |
| 结果过滤 | 模式过滤 | ignore模式 |
| 适用场景 | 文件查找 | 目录浏览 |

### 3. 替代Bash find命令
```
Bash工具指导中明确要求：
"You MUST avoid using search commands like `find` and `grep`. Instead use Grep, Glob, or Task to search."
```

## 使用场景示例

### 1. 代码文件搜索
```javascript
// 查找所有TypeScript组件
pattern: "src/components/**/*.tsx"

// 查找所有测试文件
pattern: "**/*.{test,spec}.{js,ts,jsx,tsx}"

// 查找配置文件
pattern: "**/{*.config.js,*.json,.*rc}"
```

### 2. 项目分析
```javascript
// 查找所有源代码文件
pattern: "src/**/*.{js,ts,jsx,tsx}"

// 查找文档文件
pattern: "**/*.{md,txt,rst}"

// 查找构建文件
pattern: "**/{package.json,*.toml,Cargo.toml,pom.xml}"
```

### 3. 清理和维护
```javascript
// 查找临时文件
pattern: "**/*.{tmp,log,cache}"

// 查找大文件
pattern: "**/*.{zip,tar,gz,img,iso}"

// 查找空目录标记文件
pattern: "**/.gitkeep"
```

## 错误处理

### 1. 模式错误
- 无效的glob模式语法
- 模式过于复杂导致性能问题
- 空模式或无效字符

### 2. 路径错误
- 指定路径不存在
- 路径权限不足
- 无效的路径格式

### 3. 系统错误
- 文件系统访问错误
- 内存不足
- 搜索超时

## 性能特征
- **并发安全**: isConcurrencySafe() = true
- **只读操作**: isReadOnly() = true
- **大型代码库**: 专门优化支持大型项目
- **快速搜索**: 优化的模式匹配算法

## 最佳实践

### 1. 模式设计
- 使用具体的文件扩展名
- 避免过于宽泛的模式
- 合理使用递归搜索

### 2. 性能优化
- 指定搜索起始目录
- 使用批量搜索
- 避免重复搜索

### 3. 工具选择
- 已知文件类型时使用Glob
- 需要内容搜索时配合Grep
- 探索性浏览时使用LS

## 安全机制

### 1. 路径安全
- 路径权限验证
- 防止路径遍历攻击
- 敏感目录保护

### 2. 资源控制
- 搜索深度限制
- 结果数量限制
- 超时保护机制

### 3. 权限集成
- 用户级别权限检查
- 目录访问控制
- 动态权限评估

## 架构地位
Glob工具是Claude Code文件发现和搜索功能的核心组件，与Grep、LS等工具共同构成了完整的文件查找体系。它专门优化了大型代码库的搜索性能，是代码分析和项目理解的重要工具。

## 技术特点
1. **高性能**: 专门优化的大型代码库搜索能力
2. **模式丰富**: 支持复杂的glob模式匹配
3. **智能排序**: 按修改时间和相关性排序
4. **批量友好**: 支持批量搜索操作
5. **工具协作**: 与其他工具的良好集成设计# Grep Tool (XJ1)

## 基本信息
- **工具名称**: Grep
- **内部常量**: XJ1 = "Grep"
- **文件位置**: improved-claude-code-5.mjs:26627
- **工具类型**: 内容搜索工具

## 代码运行时机
- **触发条件**: 用户需要在文件内容中搜索特定模式时
- **调用场景**: 
  - 代码中搜索函数或变量定义
  - 查找特定的错误信息或日志
  - 搜索配置项或常量
  - 代码审查和分析
  - API使用情况统计
- **执行路径**: 用户请求 → 模式解析 → Grep工具调用 → 文件内容扫描 → 匹配结果返回

## 系统运转时机
- **生命周期**: 查询级别，每次内容搜索独立执行
- **优先级**: 高优先级，核心搜索工具
- **持续性**: 单次执行，结果用于当前对话上下文

## 作用时机
- **模式编译**: 编译正则表达式模式
- **文件过滤**: 根据include参数过滤目标文件
- **内容扫描**: 在文件内容中搜索匹配模式
- **结果聚合**: 收集并排序匹配结果

## 作用目的
1. **内容发现**: 在大量文件中快速找到包含特定内容的文件
2. **代码分析**: 分析代码中的模式和结构
3. **问题诊断**: 快速定位错误信息和异常
4. **使用统计**: 统计特定API或功能的使用情况
5. **重构支持**: 为代码重构提供影响分析

## 具体作用
- **正则匹配**: 使用正则表达式进行内容匹配
- **文件过滤**: 按文件类型或模式过滤搜索范围
- **多文件搜索**: 在多个文件中并行搜索
- **上下文提取**: 提供匹配行的上下文信息
- **结果排序**: 按修改时间排序匹配文件

## 描述生成函数
```javascript
// bc1函数生成工具描述 (Line 26627+)
function bc1() {
  return `
- Fast content search tool that works with any codebase size
- Searches file contents using regular expressions
- Supports full regex syntax (eg. "log.*Error", "function\\s+\\w+", etc.)
- Filter files by pattern with the include parameter (eg. "*.js", "*.{ts,tsx}")
- Returns file paths with at least one match sorted by modification time
- Use this tool when you need to find files containing specific patterns
- If you need to identify/count the number of matches within files, use the Bash tool with \`rg\` (ripgrep) directly. Do NOT use \`grep\`.
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead`
}
```

## 参数架构
```javascript
// 参数模式定义
inputSchema: n.strictObject({
  pattern: n.string().describe("The regular expression pattern to search for in file contents"),
  path: n.string().optional().describe("The directory to search in. Defaults to the current working directory."),
  include: n.string().optional().describe("File pattern to include in the search (e.g. \"*.js\", \"*.{ts,tsx}\")")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
XJ1 = "Grep"  // Line 26627

// 工具对象定义
{
  name: XJ1,
  async description() {
    return bc1()
  },
  inputSchema: zZ5,
  userFacingName() {
    return "Grep"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !0,
  async checkPermissions(A, B) {
    let Q = A.path || process.cwd();
    return await AX5(Q, B)
  }
}
```

## 正则表达式支持

### 1. 基本模式
```javascript
// 简单字符串匹配
"console.log"           // 查找console.log调用
"function"              // 查找function关键字
"import.*from"          // 查找import语句
"export.*default"       // 查找export default
```

### 2. 高级正则模式
```javascript
// 复杂正则表达式
"function\\s+\\w+"         // 函数定义
"class\\s+[A-Z]\\w*"       // 类定义
"const\\s+\\w+\\s*="       // 常量定义
"\\berror\\b"              // 单词边界匹配
"(TODO|FIXME|XXX)"         // 多选匹配
```

### 3. 特殊用途模式
```javascript
// 特定用途的搜索模式
"log.*Error"               // 日志错误
"\\d+\\.\\d+\\.\\d+"      // 版本号
"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"  // 邮箱地址
"https?://[^\\s]+"         // URL匹配
```

## 文件过滤机制

### 1. Include模式
```javascript
// 文件类型过滤
include: "*.js"              // 只搜索JavaScript文件
include: "*.{ts,tsx}"        // TypeScript文件
include: "*.{py,pyw}"        // Python文件
include: "*.{md,txt,rst}"    // 文档文件
```

### 2. 复杂过滤
```javascript
// 复杂的文件过滤模式
include: "src/**/*.{js,ts}"     // src目录下的JS/TS文件
include: "test/**/*.spec.js"    // 测试规范文件
include: "**/*.config.{js,json}" // 配置文件
```

## 核心实现逻辑
```javascript
// 主要调用方法
async * call(A, B) {
  let Q = A.path || process.cwd();
  
  let I = await V2(Q, B.userId);
  if (!I.isAllowed) {
    yield {
      type: "error",
      error: I.denialReason
    };
    return
  }
  
  let G = await eY5(A.pattern, Q, A.include, B);
  yield {
    type: "text",
    text: formatGrepResults(G)
  }
}
```

## 性能优化策略

### 1. 大型代码库支持
```
"Fast content search tool that works with any codebase size"
```

### 2. 智能搜索引导
```
"When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead"
```

### 3. Ripgrep集成建议
```
"If you need to identify/count the number of matches within files, use the Bash tool with `rg` (ripgrep) directly. Do NOT use `grep`."
```

## 搜索策略

### 1. 文件预过滤
- 根据include模式先过滤文件
- 跳过二进制文件和大型文件
- 智能排除构建输出和依赖目录

### 2. 内容搜索
- 逐行正则表达式匹配
- 早期匹配终止优化
- 内存高效的流式处理

### 3. 结果聚合
- 按文件路径组织结果
- 按修改时间排序匹配文件
- 提供匹配统计信息

## 与其他工具的协作

### 1. 与Glob工具配合
```javascript
// 典型工作流
1. Glob找到候选文件
2. Grep在这些文件中搜索内容
3. Read读取具体匹配文件
```

### 2. 与Bash工具的关系
```
Bash工具指导明确要求：
"You MUST avoid using search commands like `find` and `grep`. Instead use Grep, Glob, or Task to search."
"If you _still_ need to run `grep`, STOP. ALWAYS USE ripgrep at `rg` first"
```

### 3. 替代传统grep
- 更快的搜索性能
- 更好的错误处理
- 集成的权限管理

## 使用场景示例

### 1. 代码分析
```javascript
// 查找函数定义
pattern: "function\\s+\\w+"
include: "*.js"

// 查找类定义
pattern: "class\\s+[A-Z]\\w*"
include: "*.{js,ts,tsx}"

// 查找导入语句
pattern: "import.*from\\s+['\"].*['\"]"
include: "*.{js,ts,jsx,tsx}"
```

### 2. 错误诊断
```javascript
// 查找错误日志
pattern: "(error|Error|ERROR)"
include: "*.log"

// 查找TODO注释
pattern: "(TODO|FIXME|XXX|HACK)"
include: "*.{js,ts,py,java,cpp}"

// 查找调试代码
pattern: "(console\\.log|debugger|pdb\\.set_trace)"
include: "*.{js,ts,py}"
```

### 3. API使用分析
```javascript
// 查找特定API使用
pattern: "useState|useEffect|useContext"
include: "*.{jsx,tsx}"

// 查找数据库查询
pattern: "SELECT|INSERT|UPDATE|DELETE"
include: "*.{sql,js,py}"

// 查找网络请求
pattern: "fetch|axios|request"
include: "*.{js,ts}"
```

## 结果格式

### 1. 文件列表格式
```
Found matches in the following files:
- src/components/Header.tsx (modified: 2024-01-15)
- src/utils/helpers.js (modified: 2024-01-14)
- tests/unit/api.test.js (modified: 2024-01-13)
```

### 2. 详细匹配信息
```
Matches found:
src/components/Header.tsx:
  Line 15: function HeaderComponent() {
  Line 23: function handleClick() {

src/utils/helpers.js:
  Line 8: function formatDate(date) {
  Line 34: function validateEmail(email) {
```

## 错误处理

### 1. 模式错误
- 无效的正则表达式语法
- 过于复杂的正则表达式
- 空搜索模式

### 2. 文件系统错误
- 搜索路径不存在
- 权限不足
- 文件访问错误

### 3. 性能错误
- 搜索超时
- 内存使用过多
- 结果集过大

## 性能特征
- **并发安全**: isConcurrencySafe() = true
- **只读操作**: isReadOnly() = true
- **大型代码库**: 专门优化支持大型项目
- **正则优化**: 高效的正则表达式引擎

## 高级功能

### 1. 上下文搜索
- 提供匹配行的上下文
- 显示行号信息
- 突出显示匹配内容

### 2. 统计功能
- 匹配文件数量
- 总匹配次数
- 文件大小统计

### 3. 过滤选项
- 大小写敏感/不敏感
- 单词边界匹配
- 多行模式支持

## 最佳实践

### 1. 模式设计
- 使用具体的正则表达式
- 避免过于宽泛的搜索
- 合理使用字符类和量词

### 2. 性能优化
- 指定文件类型过滤
- 使用具体的搜索路径
- 避免复杂的正则表达式

### 3. 工具选择
- 内容搜索使用Grep
- 文件名搜索使用Glob
- 精确计数使用ripgrep

## 安全机制

### 1. 模式安全
- 正则表达式复杂度限制
- 防止ReDoS攻击
- 模式预验证

### 2. 文件安全
- 权限检查集成
- 敏感文件跳过
- 二进制文件检测

### 3. 资源控制
- 搜索时间限制
- 内存使用监控
- 结果大小限制

## 架构地位
Grep工具是Claude Code内容搜索功能的核心，与Glob工具共同构成了完整的代码搜索体系。它专门为大型代码库优化了性能，支持复杂的正则表达式搜索，是代码分析、调试和重构的重要工具。

## 技术特点
1. **正则强大**: 完整的正则表达式语法支持
2. **高性能**: 大型代码库优化的搜索引擎
3. **智能过滤**: 灵活的文件类型过滤机制
4. **结果排序**: 按相关性和时间排序
5. **工具集成**: 与ripgrep等外部工具的良好集成# LS Tool (VJ1)

## 基本信息
- **工具名称**: LS
- **内部常量**: VJ1 = "LS"
- **文件位置**: improved-claude-code-5.mjs:26642, 37004
- **工具类型**: 目录列表工具

## 代码运行时机
- **触发条件**: 用户需要查看目录内容时
- **调用场景**: 
  - 项目结构探索
  - 文件存在性检查
  - 目录内容浏览
  - 文件系统导航
  - 与其他工具配合的路径验证
- **执行路径**: 用户请求 → 路径验证 → LS工具调用 → 目录扫描 → 结果格式化

## 系统运转时机
- **生命周期**: 请求级别，每次目录查询独立执行
- **优先级**: 高优先级，基础工具
- **持续性**: 单次执行，结果用于当前对话上下文

## 作用时机
- **路径预检**: 在其他文件操作前验证目录结构
- **权限验证**: 检查目录访问权限
- **结构扫描**: 获取目录下的文件和子目录列表
- **过滤处理**: 根据ignore模式过滤不需要的文件

## 作用目的
1. **目录浏览**: 提供安全的目录内容查看能力
2. **结构理解**: 帮助理解项目和文件系统结构
3. **路径验证**: 验证路径存在性和可访问性
4. **文件发现**: 发现特定目录下的文件和子目录
5. **过滤控制**: 通过ignore模式控制显示内容

## 具体作用
- **目录扫描**: 读取指定目录下的所有条目
- **权限检查**: 验证目录访问权限
- **模式过滤**: 应用glob模式过滤文件
- **结果排序**: 按照特定规则排序目录内容
- **格式化输出**: 提供用户友好的目录树格式

## 参数架构
```javascript
VZ5 = n.strictObject({
  path: n.string().describe("The absolute path to the directory to list (must be absolute, not relative)"),
  ignore: n.array(n.string()).optional().describe("List of glob patterns to ignore")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
VJ1 = "LS"  // Line 26642

// 工具对象定义 (Line 37004)
{
  name: VJ1,
  async description() {
    return "Lists files and directories in a given path. The path parameter must be an absolute path, not a relative path. You can optionally provide an array of glob patterns to ignore with the ignore parameter. You should generally prefer the Glob and Grep tools, if you know which directories to search."
  },
  inputSchema: VZ5,
  userFacingName() {
    return "LS"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !0,
  async checkPermissions(A, B) {
    return await AX5(A.path, B)
  }
}
```

## 核心实现逻辑
```javascript
// 主要调用方法
async * call(A, B) {
  let Q = await V2(A.path, B.userId);
  if (!Q.isAllowed) {
    yield {
      type: "error",
      error: Q.denialReason
    };
    return
  }
  
  let I = await BX5(A.path, A.ignore, B);
  yield {
    type: "text",
    text: I
  }
}
```

## 路径处理机制

### 1. 绝对路径要求
- **强制约束**: 只接受绝对路径，拒绝相对路径
- **安全考虑**: 防止路径遍历攻击
- **一致性**: 与其他工具保持路径处理一致性

### 2. 路径验证流程
```javascript
// 路径验证逻辑
async function validatePath(path) {
  if (!path.startsWith('/')) {
    throw new Error('Path must be absolute, not relative');
  }
  
  if (!await pathExists(path)) {
    throw new Error('Directory does not exist');
  }
  
  if (!await isDirectory(path)) {
    throw new Error('Path is not a directory');
  }
}
```

## 过滤机制

### 1. Ignore模式支持
```javascript
// Glob模式过滤
ignore: [
  "node_modules",      // 排除依赖目录
  "*.log",            // 排除日志文件
  ".git",             // 排除Git目录
  "dist",             // 排除构建输出
  "coverage"          // 排除测试覆盖率
]
```

### 2. 默认过滤规则
- 隐藏文件处理策略
- 系统文件自动过滤
- 大型目录智能跳过

## 输出格式

### 1. 目录树结构
```
- /Users/user/project/
  - src/
    - components/
      - Header.tsx
      - Footer.tsx
    - utils/
      - helpers.ts
  - tests/
    - unit/
    - integration/
  - package.json
  - README.md
```

### 2. 元数据信息
- 文件类型标识 (文件/目录)
- 权限信息
- 大小信息 (如果可用)
- 修改时间 (如果需要)

## 权限集成

### 1. 权限检查
```javascript
async checkPermissions(A, B) {
  return await AX5(A.path, B)  // 使用通用权限检查
}
```

### 2. 访问控制
- 用户级别的目录访问控制
- 敏感目录的保护机制
- 动态权限评估

## 工具协作

### 1. 与Read工具协作
```javascript
// 典型协作模式
1. LS查看目录结构
2. Read读取特定文件内容
3. 重复直到获得所需信息
```

### 2. 与Glob工具协作
```javascript
// 搜索优化建议
"You should generally prefer the Glob and Grep tools, if you know which directories to search."
```

### 3. 与Bash工具边界
- **禁用ls命令**: Bash工具指导中明确禁止使用系统ls命令
- **强制使用LS**: 必须使用LS工具而不是shell ls

## 性能特征
- **并发安全**: isConcurrencySafe() = true
- **只读操作**: isReadOnly() = true
- **缓存友好**: 结果可在对话上下文中缓存
- **轻量级**: 快速的目录扫描操作

## 错误处理

### 1. 路径错误
- 不存在的路径
- 非目录路径
- 相对路径使用

### 2. 权限错误
- 访问被拒绝的目录
- 用户权限不足
- 系统级别的访问限制

### 3. 系统错误
- 文件系统错误
- I/O错误
- 网络文件系统问题

## 使用最佳实践

### 1. 路径规范
- 始终使用绝对路径
- 使用正斜杠 (/) 作为路径分隔符
- 避免特殊字符和空格

### 2. 过滤优化
- 合理使用ignore模式减少输出
- 排除大型依赖目录
- 专注于相关文件和目录

### 3. 工具选择
- 已知搜索目标时优先使用Glob/Grep
- 探索性浏览时使用LS
- 与Read工具配合进行深入分析

## 安全机制

### 1. 路径安全
- 绝对路径强制要求
- 路径遍历防护
- 符号链接处理

### 2. 权限控制
- 用户级别访问控制
- 目录级别权限检查
- 敏感目录保护

### 3. 输出安全
- 敏感信息过滤
- 大量输出限制
- 恶意文件名处理

## 架构地位
LS工具是Claude Code文件系统交互的重要组成部分，为用户提供了安全、直观的目录浏览能力。它与Read、Glob、Grep等工具形成了完整的文件系统操作工具链，是文件探索和项目理解的基础工具。

## 技术特点
1. **安全设计**: 强制绝对路径和权限检查
2. **高效过滤**: 灵活的glob模式过滤系统
3. **用户友好**: 清晰的目录树格式输出
4. **工具协作**: 与其他文件工具的良好集成
5. **性能优化**: 并发安全和缓存友好的设计# MultiEdit Tool (OE2)

## 基本信息
- **工具名称**: MultiEdit
- **内部常量**: OE2 = "MultiEdit"
- **文件位置**: improved-claude-code-5.mjs:42729, 42881
- **工具类型**: 多点文件编辑工具

## 代码运行时机
- **触发条件**: 用户需要在单个文件中进行多处修改时
- **调用场景**: 
  - 重构代码时的多点修改
  - 批量替换变量名或函数名
  - 同时修改多个相关代码段
  - 复杂的代码结构调整
  - 一次性修复多个相同问题
- **执行路径**: 用户请求 → 编辑计划验证 → MultiEdit工具调用 → 顺序执行编辑 → 事务性提交

## 系统运转时机
- **生命周期**: 操作级别，单次事务性编辑操作
- **优先级**: 高优先级，高效编辑工具
- **持续性**: 单次执行，所有编辑原子性完成

## 作用时机
- **编辑规划**: 验证所有编辑操作的可行性
- **顺序执行**: 按顺序应用每个编辑操作
- **冲突检测**: 检测编辑操作间的潜在冲突
- **事务提交**: 确保所有编辑要么全部成功要么全部失败

## 作用目的
1. **批量编辑**: 在单个文件中高效进行多处修改
2. **原子性**: 确保多个编辑操作的原子性
3. **效率提升**: 比多次单独Edit操作更高效
4. **一致性**: 保证相关修改的一致性
5. **错误防护**: 通过事务性操作防止部分修改导致的文件损坏

## 具体作用
- **编辑序列**: 管理多个编辑操作的执行序列
- **依赖处理**: 处理编辑操作间的依赖关系
- **冲突解决**: 检测和解决编辑冲突
- **回滚机制**: 在失败时回滚所有修改
- **进度跟踪**: 跟踪编辑操作的执行进度

## 描述定义
```javascript
// 工具描述常量 (Line 42729)
TE2 = `This is a tool for making multiple edits to a single file in one operation. It is built on top of the ${oU} tool and allows you to perform multiple find-and-replace operations efficiently. Prefer this tool over the ${oU} tool when you need to make multiple edits to the same file.

Before using this tool:

1. Use the Read tool to understand the file's contents and context
2. Verify the directory path is correct

To make multiple file edits, provide the following:
1. file_path: The absolute path to the file to modify (must be absolute, not relative)
2. edits: An array of edit operations to perform, where each edit contains:
   - old_string: The text to replace (must match the file contents exactly, including all whitespace and indentation)
   - new_string: The edited text to replace the old_string
   - replace_all: Replace all occurences of old_string. This parameter is optional and defaults to false.

IMPORTANT:
- All edits are applied in sequence, in the order they are provided
- Each edit operates on the result of the previous edit
- All edits must be valid for the operation to succeed - if any edit fails, none will be applied
- This tool is ideal when you need to make several changes to different parts of the same file
- For Jupyter notebooks (.ipynb files), use the NotebookEdit instead

CRITICAL REQUIREMENTS:
1. All edits follow the same requirements as the single Edit tool
2. The edits are atomic - either all succeed or none are applied
3. Plan your edits carefully to avoid conflicts between sequential operations

WARNING:
- The tool will fail if edits.old_string doesn't match the file contents exactly (including whitespace)
- The tool will fail if edits.old_string and edits.new_string are the same
- Since edits are applied in sequence, ensure that earlier edits don't affect the text that later edits are trying to find

When making edits:
- Ensure all edits result in idiomatic, correct code
- Do not leave the code in a broken state
- Always use absolute file paths (starting with /)
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- Use replace_all for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.

If you want to create a new file, use:
- A new file path, including dir name if needed
- First edit: empty old_string and the new file's contents as new_string
- Subsequent edits: normal edit operations on the created content`
```

## 参数架构
```javascript
// 参数模式定义
inputSchema: n.strictObject({
  file_path: n.string().describe("The absolute path to the file to modify"),
  edits: n.array(
    n.strictObject({
      old_string: n.string().describe("The text to replace"),
      new_string: n.string().describe("The text to replace it with"),
      replace_all: n.boolean().default(false).describe("Replace all occurences of old_string (default false).")
    })
  ).min(1).describe("Array of edit operations to perform sequentially on the file")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
OE2 = "MultiEdit"  // Line 42729

// 工具对象定义 (Line 42881)
{
  name: OE2,
  async description() {
    return TE2
  },
  inputSchema: SI5,
  userFacingName() {
    return "MultiEdit"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !1,  // 非并发安全
  isReadOnly: () => !1,         // 非只读操作
  
  async validateInput(A, B) {
    // 验证必须先读取文件
    if (!B.hasReadFile(A.file_path)) {
      throw new Error("You must use the Read tool to read the file before editing it")
    }
    
    // 验证每个编辑操作
    for (let edit of A.edits) {
      if (edit.old_string === edit.new_string) {
        throw new Error("old_string and new_string must be different in each edit")
      }
    }
    
    return A
  }
}
```

## 核心实现逻辑
```javascript
// 主要调用方法
async * call(A, B) {
  let Q = await V2(A.file_path, B.userId);
  if (!Q.isAllowed) {
    yield {
      type: "error",
      error: Q.denialReason
    };
    return
  }
  
  // 事务性执行所有编辑
  try {
    await hY5(A.file_path, A.edits, B);
    yield {
      type: "text",
      text: `Successfully applied ${A.edits.length} edits to ${A.file_path}`
    }
  } catch (error) {
    yield {
      type: "error", 
      error: `MultiEdit failed: ${error.message}. No changes were applied.`
    }
  }
}
```

## 编辑执行机制

### 1. 顺序执行原则
```javascript
// 编辑按顺序应用
"All edits are applied in sequence, in the order they are provided"
"Each edit operates on the result of the previous edit"
```

### 2. 原子性保证
```javascript
// 事务性执行
"All edits must be valid for the operation to succeed - if any edit fails, none will be applied"
"The edits are atomic - either all succeed or none are applied"
```

### 3. 依赖处理
```javascript
// 编辑间依赖
"Since edits are applied in sequence, ensure that earlier edits don't affect the text that later edits are trying to find"
```

## 编辑规划策略

### 1. 独立编辑
```javascript
// 示例：独立的多处修改
edits: [
  {
    old_string: "function oldName1() {",
    new_string: "function newName1() {"
  },
  {
    old_string: "function oldName2() {", 
    new_string: "function newName2() {"
  }
]
```

### 2. 依赖性编辑
```javascript
// 示例：有依赖关系的编辑
edits: [
  {
    old_string: "const API_URL = 'http://old-api.com'",
    new_string: "const API_URL = 'https://new-api.com'"
  },
  {
    old_string: "// TODO: Update API URL",
    new_string: "// API URL updated to HTTPS"
  }
]
```

### 3. 全文替换
```javascript
// 示例：变量重命名
edits: [
  {
    old_string: "oldVariableName",
    new_string: "newVariableName", 
    replace_all: true
  }
]
```

## 新文件创建模式

### 1. 特殊用法
```javascript
// 创建新文件的特殊语法
edits: [
  {
    old_string: "",  // 空字符串
    new_string: "// New file content\nfunction example() {\n  return 'Hello';\n}"
  },
  {
    old_string: "example",
    new_string: "greeting"
  }
]
```

## 错误处理和验证

### 1. 前置验证
```javascript
// 必要的前置条件
1. 必须先使用Read工具读取文件
2. 所有编辑的old_string和new_string必须不同
3. 文件路径必须是绝对路径
```

### 2. 执行时验证
```javascript
// 执行过程中的验证
1. 每个old_string必须在当前文件状态中存在
2. 如果不是replace_all模式，old_string必须唯一
3. 编辑操作不能导致文件损坏
```

### 3. 失败回滚
```javascript
// 失败时的处理
"if any edit fails, none will be applied"
// 确保文件保持一致状态
```

## 与Edit工具的关系

| 方面 | MultiEdit | Edit |
|------|----------|------|
| 编辑数量 | 多个编辑操作 | 单个编辑操作 |
| 原子性 | 事务性原子操作 | 单独原子操作 |
| 效率 | 批量操作高效 | 单次操作简单 |
| 复杂度 | 需要规划编辑顺序 | 操作简单直接 |
| 适用场景 | 复杂重构 | 简单修改 |

## 使用场景

### 1. 代码重构
```javascript
// 重构函数名和相关调用
edits: [
  {
    old_string: "function calculateTotal(items) {",
    new_string: "function computeTotalPrice(items) {"
  },
  {
    old_string: "calculateTotal(cart.items)",
    new_string: "computeTotalPrice(cart.items)"
  },
  {
    old_string: "// Calculate total price",
    new_string: "// Compute total price using new algorithm"
  }
]
```

### 2. API更新
```javascript
// 更新API调用和相关配置
edits: [
  {
    old_string: "const API_VERSION = 'v1'",
    new_string: "const API_VERSION = 'v2'"
  },
  {
    old_string: "/api/v1/users",
    new_string: "/api/v2/users"
  },
  {
    old_string: "headers: { 'Accept': 'application/json' }",
    new_string: "headers: { 'Accept': 'application/json', 'API-Version': 'v2' }"
  }
]
```

### 3. 配置更新
```javascript
// 批量更新配置项
edits: [
  {
    old_string: "development",
    new_string: "production",
    replace_all: true
  },
  {
    old_string: "debug: true",
    new_string: "debug: false"
  }
]
```

## 性能特征
- **并发安全**: isConcurrencySafe() = false (文件修改操作)
- **读写操作**: isReadOnly() = false
- **事务性**: 原子性编辑保证
- **高效**: 比多次Edit调用更高效

## 最佳实践

### 1. 编辑规划
- 仔细规划编辑顺序避免冲突
- 从文件底部向顶部编辑避免行号变化
- 使用具体的old_string确保唯一性

### 2. 错误预防
- 先用Read工具完全理解文件内容
- 验证每个编辑操作的可行性
- 考虑编辑间的相互影响

### 3. 代码质量
- 确保编辑后代码语法正确
- 保持代码风格一致性
- 不留下破坏性的中间状态

## 架构地位
MultiEdit工具是Claude Code高级编辑功能的体现，它在Edit工具基础上提供了事务性的批量编辑能力，特别适合复杂的代码重构和系统性修改任务。它体现了从简单工具向智能编辑系统的进化。

## 技术特点
1. **事务性**: 保证多个编辑操作的原子性
2. **顺序性**: 智能的编辑顺序管理
3. **高效性**: 批量操作比多次单独操作更高效
4. **安全性**: 完善的验证和回滚机制
5. **灵活性**: 支持复杂的编辑场景和新文件创建# NotebookRead Tool (NS)

## 基本信息
- **工具名称**: NotebookRead
- **内部常量**: NS = "NotebookRead"
- **文件位置**: improved-claude-code-5.mjs:8626762, 36305
- **工具类型**: Jupyter Notebook读取工具

## 代码运行时机
- **触发条件**: 用户需要读取Jupyter notebook文件内容时
- **调用场景**: 
  - 数据科学项目分析
  - 机器学习代码审查
  - 教学材料查看
  - 研究笔记分析
  - 实验代码查看
- **执行路径**: 用户请求 → 文件类型检测 → NotebookRead工具调用 → JSON解析 → 结构化输出

## 系统运转时机
- **生命周期**: 请求级别，每次notebook读取独立执行
- **优先级**: 中等优先级，专用格式工具
- **持续性**: 单次执行，结果用于当前对话上下文

## 作用时机
- **格式检测**: 识别.ipynb文件格式
- **JSON解析**: 解析notebook的JSON结构
- **单元格提取**: 提取代码和文本单元格
- **输出处理**: 处理单元格的执行输出

## 作用目的
1. **Notebook解析**: 专门处理Jupyter notebook的复杂结构
2. **内容提取**: 提取代码、文本和输出内容
3. **结构保持**: 保持notebook的逻辑结构和顺序
4. **多模态支持**: 处理文本、代码、图像等多种内容类型
5. **教育支持**: 支持教学和学习场景的notebook分析

## 具体作用
- **JSON解析**: 解析.ipynb文件的JSON格式
- **单元格分类**: 区分代码单元格、markdown单元格和raw单元格
- **输出提取**: 提取单元格的执行结果和输出
- **格式转换**: 将notebook内容转换为可读格式
- **元数据处理**: 处理notebook的元数据信息

## 描述定义
```javascript
// 工具描述常量 (Line 8627185)
vfA = "Reads a Jupyter notebook (.ipynb file) and returns all of the cells with their outputs. Jupyter notebooks are interactive documents that combine code, text, and visualizations, commonly used for data analysis and scientific computing. The notebook_path parameter must be an absolute path, not a relative path."

// 功能描述常量 (Line 8626864)
ffA = "Extract and read source code from all code cells in a Jupyter notebook."
```

## 参数架构
```javascript
// 参数模式定义
inputSchema: n.strictObject({
  notebook_path: n.string().describe("The absolute path to the Jupyter notebook file to read (must be absolute, not relative)"),
  cell_id: n.string().optional().describe("The ID of a specific cell to read. If not provided, all cells will be read.")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
NS = "NotebookRead"  // Line 8626762

// 工具对象定义 (Line 36305)
{
  name: NS,
  async description() {
    return vfA
  },
  inputSchema: nG5,
  userFacingName() {
    return "NotebookRead"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !0,
  async checkPermissions(A, B) {
    return await AX5(A.notebook_path, B)
  },
  async validateInput(A, B) {
    // 验证文件扩展名
    if (!A.notebook_path.endsWith('.ipynb')) {
      throw new Error('File must be a .ipynb file')
    }
    return A
  }
}
```

## 核心实现逻辑
```javascript
// 主要调用方法
async * call(A, B) {
  let Q = await V2(A.notebook_path, B.userId);
  if (!Q.isAllowed) {
    yield {
      type: "error",
      error: Q.denialReason
    };
    return
  }
  
  let I = await gY5(A.notebook_path, A.cell_id, B);
  yield {
    type: "text",
    text: I + tG5  // 添加安全检查提醒
  }
}
```

## Notebook结构处理

### 1. JSON结构解析
```javascript
// 典型的notebook JSON结构
{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": ["# Title\n", "Description text"]
    },
    {
      "cell_type": "code", 
      "execution_count": 1,
      "metadata": {},
      "source": ["import pandas as pd\n", "df = pd.read_csv('data.csv')"],
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout", 
          "text": ["Data loaded successfully"]
        }
      ]
    }
  ],
  "metadata": {
    "kernelspec": {
      "display_name": "Python 3",
      "language": "python",
      "name": "python3"
    }
  }
}
```

### 2. 单元格类型处理
```javascript
// 单元格类型分类
const cellTypes = {
  "code": "Code cell with executable code",
  "markdown": "Text cell with markdown content", 
  "raw": "Raw text cell without processing"
}
```

### 3. 输出类型处理
```javascript
// 输出类型处理
const outputTypes = {
  "stream": "Text output (stdout/stderr)",
  "display_data": "Rich display data (images, HTML)",
  "execute_result": "Execution result with data",
  "error": "Exception and traceback information"
}
```

## 输出格式

### 1. 完整Notebook输出
```
Jupyter Notebook: /path/to/notebook.ipynb

Cell 1 (markdown):
# Data Analysis Project
This notebook demonstrates data analysis techniques.

Cell 2 (code, execution_count: 1):
import pandas as pd
import matplotlib.pyplot as plt
df = pd.read_csv('data.csv')

Output:
Data loaded successfully. Shape: (1000, 5)

Cell 3 (code, execution_count: 2):
df.head()

Output:
   col1  col2  col3  col4  col5
0     1     2     3     4     5
1     6     7     8     9    10
...
```

### 2. 特定单元格输出
```
Cell ID: abc123 (code, execution_count: 5):
def analyze_data(df):
    return df.describe()

result = analyze_data(df)
print(result)

Output:
       col1       col2       col3
count  1000.0    1000.0    1000.0
mean     50.5      51.2      49.8
std      28.9      29.1      28.7
...
```

## 特殊功能

### 1. 单元格选择
- **全部单元格**: 不指定cell_id时读取所有单元格
- **特定单元格**: 通过cell_id参数读取指定单元格
- **顺序保持**: 保持单元格在notebook中的原始顺序

### 2. 执行信息
- **执行计数**: 显示代码单元格的执行顺序
- **执行时间**: 如果可用，显示单元格执行时间
- **内核信息**: 显示使用的内核类型和版本

### 3. 输出处理
- **多种输出**: 处理文本、图像、HTML等多种输出类型
- **错误信息**: 完整显示异常和堆栈跟踪
- **富文本**: 保持markdown和HTML的格式

## 安全机制

### 1. 文件验证
```javascript
// 文件扩展名验证
if (!A.notebook_path.endsWith('.ipynb')) {
  throw new Error('File must be a .ipynb file')
}
```

### 2. 路径安全
- 绝对路径要求
- 路径遍历防护
- 权限检查集成

### 3. 内容安全
- 自动注入安全提醒(tG5)
- 恶意代码检测
- 执行结果过滤

## 与Read工具的区别

| 方面 | NotebookRead | Read |
|------|-------------|------|
| 文件类型 | .ipynb专用 | 通用文件 |
| 结构解析 | JSON结构化解析 | 纯文本读取 |
| 输出格式 | 单元格格式化 | 行号格式 |
| 内容理解 | 理解notebook结构 | 通用文件内容 |

## 错误处理

### 1. 格式错误
- 无效的JSON格式
- 损坏的notebook文件
- 不支持的notebook版本

### 2. 文件错误
- 文件不存在
- 权限不足
- 文件过大

### 3. 解析错误
- 单元格ID不存在
- 元数据缺失
- 编码问题

## 性能特征
- **并发安全**: isConcurrencySafe() = true
- **只读操作**: isReadOnly() = true
- **JSON解析**: 高效的JSON处理
- **内存优化**: 大型notebook的内存管理

## 使用场景

### 1. 数据科学项目
- 分析数据处理流程
- 审查机器学习模型
- 验证实验结果

### 2. 教育内容
- 查看教学材料
- 分析学生作业
- 审核课程内容

### 3. 研究工作
- 复现实验结果
- 分析研究代码
- 验证计算过程

## 最佳实践

### 1. 文件处理
- 确保notebook文件完整性
- 检查文件版本兼容性
- 处理大型notebook时考虑性能

### 2. 内容分析
- 关注代码单元格的逻辑流
- 检查输出结果的一致性
- 注意markdown说明的重要信息

### 3. 安全考虑
- 注意notebook中的恶意代码
- 验证数据来源的安全性
- 检查外部依赖的安全性

## 架构地位
NotebookRead工具是Claude Code支持数据科学和教育场景的重要组件，专门处理Jupyter notebook这种复杂的交互式文档格式。它体现了Claude Code对专业工作流程的深度支持。

## 技术特点
1. **专业格式**: 专门的.ipynb格式处理能力
2. **结构化解析**: 深度理解notebook的逻辑结构  
3. **多模态**: 支持文本、代码、输出的统一处理
4. **教育友好**: 为教学和学习场景优化
5. **安全集成**: 与整体安全架构的良好集成# Read Tool (TD)

## 基本信息
- **工具名称**: Read
- **内部常量**: TD = "Read"
- **文件位置**: improved-claude-code-5.mjs:13727, 36560-36716
- **工具类型**: 文件系统读取工具

## 代码运行时机
- **触发条件**: 用户请求读取文件时
- **调用场景**: 
  - 直接文件内容查看
  - 代码分析和审查
  - 配置文件读取
  - 日志文件检查
  - 图像文件查看（多模态支持）
- **执行路径**: 用户请求 → 工具选择 → Read工具调用 → 文件系统访问

## 系统运转时机
- **生命周期**: 请求级别，每次读取操作独立执行
- **优先级**: 高优先级，基础工具
- **持续性**: 单次执行，结果缓存在对话上下文中

## 作用时机
- **权限检查**: 在文件访问前进行权限验证
- **路径验证**: 确保路径为绝对路径且存在
- **内容处理**: 根据文件类型进行特定处理
- **安全检查**: 应用文件安全警告(tG5)

## 作用目的
1. **文件访问**: 提供安全的文件系统读取能力
2. **多格式支持**: 支持文本、图像、Jupyter notebook等多种格式
3. **大文件处理**: 通过offset/limit支持大文件分段读取
4. **安全保障**: 通过路径验证和安全检查保护系统
5. **用户体验**: 提供友好的文件内容展示

## 具体作用
- **路径解析**: 将相对路径转换为绝对路径
- **格式检测**: 自动检测文件类型并采用相应处理方式
- **内容读取**: 从文件系统读取文件内容
- **安全注入**: 自动添加文件安全检查提醒
- **错误处理**: 提供详细的错误信息和建议

## 参数架构
```javascript
oG5 = n.strictObject({
  file_path: n.string().describe("The absolute path to the file to read"),
  offset: n.number().optional().describe("The line number to start reading from. Only provide if the file is too large to read at once"),
  limit: n.number().optional().describe("The number of lines to read. Only provide if the file is too large to read at once.")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
TD = "Read"  // Line 13727

// 工具对象定义 (Line 36560)
{
  name: TD,
  async description() {
    return i8("Read a file from the local filesystem. You can access any file directly by using this tool.\nAssume this tool is able to read all files on the machine. If the User provides a path to a file assume that path is valid. It is okay to read a file that does not exist; an error will be returned.\n\nUsage:\n- The file_path parameter must be an absolute path, not a relative path\n- By default, it reads up to 2000 lines starting from the beginning of the file\n- You can optionally specify a line offset and limit (especially handy for long files), but it's recommended to read the whole file by not providing these parameters\n- Any lines longer than 2000 characters will be truncated\n- Results are returned using cat -n format, with line numbers starting at 1\n- This tool allows Claude Code to read images (eg PNG, JPG, etc). When reading an image file the contents are presented visually as Claude Code is a multimodal LLM.\n- For Jupyter notebooks (.ipynb files), use the NotebookRead instead\n- You have the capability to call multiple tools in a single response. It is always better to speculatively read multiple files as a batch that are potentially useful.\n- You will regularly be asked to read screenshots. If the user provides a path to a screenshot ALWAYS use this tool to view the file at the path. This tool will work with all temporary file paths like /var/folders/123/abc/T/TemporaryItems/NSIRD_screencaptureui_ZfB1tD/Screenshot.png\n- If you read a file that exists but has empty contents you will receive a system reminder warning in place of file contents.")
  },
  inputSchema: oG5,
  userFacingName() {
    return "Read"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !0,
  async checkPermissions(A, B) {
    return await AX5(A.file_path, B)
  }
}
```

## 核心实现逻辑
```javascript
// 主要调用方法 (Line 36716)
async * call(A, B) {
  let Q = await V2(A.file_path, B.userId);
  if (!Q.isAllowed) {
    yield {
      type: "error",
      error: Q.denialReason
    };
    return
  }
  
  let I = await SX5(A.file_path, A.offset || 0, A.limit, B);
  yield {
    type: "text", 
    text: I + tG5  // 添加安全检查提醒
  }
}
```

## 安全机制
1. **路径验证**: 强制使用绝对路径
2. **权限检查**: 通过AX5函数验证用户权限
3. **安全提醒**: 自动注入tG5安全检查常量
4. **错误处理**: 安全的错误信息返回
5. **文件存在性**: 允许尝试读取不存在的文件并返回错误

## 特殊功能
1. **多模态支持**: 支持图像文件的视觉展示
2. **大文件处理**: 通过offset/limit分段读取
3. **格式优化**: 使用cat -n格式显示行号
4. **长行截断**: 超过2000字符的行自动截断
5. **批量读取**: 支持在单个响应中读取多个文件

## 工具关联
- **NotebookRead**: 专门处理Jupyter notebook文件
- **LS**: 配合进行目录浏览
- **Glob**: 配合进行文件模式匹配
- **权限系统**: 集成用户权限管理
- **安全系统**: 集成文件安全检查

## 性能特征
- **并发安全**: isConcurrencySafe() = true
- **只读操作**: isReadOnly() = true  
- **缓存友好**: 结果可在对话上下文中缓存
- **流式输出**: 使用async generator支持流式返回

## 错误处理模式
1. **文件不存在**: 返回明确的错误信息
2. **权限不足**: 通过权限系统处理
3. **路径无效**: 路径验证失败时的错误处理
4. **系统错误**: 文件系统级别的错误处理

## 使用最佳实践
- 优先使用Read工具而非cat命令
- 对于大文件使用offset/limit参数
- 图像文件直接使用Read工具查看
- 与LS工具配合进行文件探索
- 注意安全提醒的内容和含义

## 架构地位
Read工具是Claude Code最基础和最重要的工具之一，为所有文件相关操作提供了安全、可靠的基础设施。它的设计体现了Claude Code在安全性、易用性和功能性之间的平衡。

## 技术特点
1. **多格式支持**: 文本、图像、特殊格式的统一处理
2. **安全优先**: 多层安全检查和权限验证
3. **性能优化**: 大文件分段读取和长行截断
4. **用户友好**: 清晰的错误信息和使用指导
5. **系统集成**: 与权限、安全、UI系统的深度集成# Task Tool (cX)

## 基本信息
- **工具名称**: Task
- **内部常量**: cX = "Task"
- **文件位置**: improved-claude-code-5.mjs:25993
- **工具类型**: 智能代理搜索工具

## 代码运行时机
- **触发条件**: 用户需要进行复杂的、多轮的搜索和分析任务时
- **调用场景**: 
  - 开放式的代码搜索和分析
  - 需要多轮Glob和Grep组合的复杂查询
  - 不确定搜索目标的探索性任务
  - 需要上下文理解的智能搜索
  - 减少上下文使用的高效搜索
- **执行路径**: 用户请求 → 任务分解 → Task工具调用 → 智能代理执行 → 结果整合

## 系统运转时机
- **生命周期**: 任务级别，可能包含多个子操作
- **优先级**: 高优先级，智能搜索工具
- **持续性**: 任务完成后返回整合结果

## 作用时机
- **任务分析**: 分析用户需求并制定搜索策略
- **工具协调**: 智能选择和组合使用其他工具
- **上下文管理**: 管理搜索过程中的上下文信息
- **结果整合**: 将多轮搜索结果整合为有用信息

## 作用目的
1. **智能搜索**: 提供比单一工具更智能的搜索能力
2. **上下文优化**: 减少对话上下文的使用
3. **效率提升**: 通过智能代理减少用户的交互次数
4. **复杂任务**: 处理需要多步骤的复杂搜索任务
5. **探索发现**: 支持开放式的代码探索和分析

## 具体作用
- **任务规划**: 将复杂搜索任务分解为可执行步骤
- **工具编排**: 智能选择和组合Glob、Grep、Read等工具
- **信息整合**: 将分散的搜索结果整合为结构化信息
- **上下文压缩**: 提取关键信息减少上下文占用
- **智能推理**: 基于搜索结果进行推理和分析

## 工具描述
根据代码中的注释，Task工具的主要特点：
```javascript
// 使用建议在其他工具描述中提到
"When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead"

// 上下文优化目的
"When doing file search, prefer to use the Task tool in order to reduce context usage."
```

## 参数架构
```javascript
// 基于发现的模式，可能的参数结构
inputSchema: n.strictObject({
  description: n.string().describe("A short (3-5 word) description of the task"),
  prompt: n.string().describe("The task for the agent to perform")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
cX = "Task"  // Line 25993

// 工具对象结构（推断）
{
  name: cX,
  async description() {
    return "Launch a new agent that has access to the following tools: Bash, Glob, Grep, LS, exit_plan_mode, Read, Edit, MultiEdit, Write, NotebookRead, NotebookEdit, WebFetch, TodoRead, TodoWrite, WebSearch, ..."
  },
  inputSchema: taskSchema,
  userFacingName() {
    return "Task"
  },
  isEnabled() {
    return !0
  },
  async checkPermissions(A) {
    return {
      behavior: "allow",
      updatedInput: A
    }
  }
}
```

## 智能代理架构

### 1. 可用工具集
Task工具内部的代理可以访问以下工具：
- **文件操作**: Bash, Read, Edit, MultiEdit, Write
- **搜索工具**: Glob, Grep, LS  
- **Notebook**: NotebookRead, NotebookEdit
- **网络工具**: WebFetch, WebSearch
- **任务管理**: TodoRead, TodoWrite
- **计划模式**: exit_plan_mode

### 2. 智能决策
- **工具选择**: 根据任务需求智能选择最合适的工具
- **执行顺序**: 优化工具调用顺序提高效率
- **错误恢复**: 在工具调用失败时自动调整策略
- **结果验证**: 验证搜索结果的完整性和准确性

### 3. 上下文管理
- **信息提取**: 从搜索结果中提取关键信息
- **上下文压缩**: 压缩详细信息为精要总结
- **状态维护**: 维护搜索过程中的状态信息
- **结果缓存**: 缓存中间结果避免重复搜索

## 使用场景

### 1. 复杂代码搜索
```javascript
// 示例任务描述
description: "Find authentication logic"
prompt: "Search through the codebase to find all authentication-related code, including login functions, auth middleware, token validation, and session management. Provide a comprehensive overview of the authentication architecture."
```

### 2. 架构分析
```javascript
// 示例任务描述  
description: "Analyze API structure"
prompt: "Analyze the API structure of this project. Find all API endpoints, their methods, parameters, and responses. Map out the API architecture and identify patterns."
```

### 3. 问题诊断
```javascript
// 示例任务描述
description: "Debug error patterns"
prompt: "Find all error handling patterns in the codebase. Look for try-catch blocks, error classes, logging patterns, and error propagation mechanisms. Identify potential issues and improvement opportunities."
```

## 工作流程

### 1. 任务分解
```javascript
// 任务分解示例
1. 分析用户提供的任务描述
2. 识别需要搜索的关键词和模式
3. 确定搜索范围和文件类型
4. 制定多步骤的搜索策略
```

### 2. 执行阶段
```javascript
// 执行阶段流程
1. 使用Glob查找相关文件
2. 使用Grep搜索关键内容
3. 使用Read深入分析重要文件
4. 根据需要调整搜索策略
5. 整合和验证搜索结果
```

### 3. 结果整合
```javascript
// 结果整合过程
1. 收集所有搜索结果
2. 分析文件间的关联关系
3. 提取关键信息和模式
4. 生成结构化的分析报告
5. 提供可操作的建议
```

## 与其他工具的关系

### 1. 替代复杂搜索
```
当需要多轮Glob和Grep组合时，建议使用Task工具：
"When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead"
```

### 2. 上下文优化
```
优先使用Task工具减少上下文使用：
"When doing file search, prefer to use the Task tool in order to reduce context usage."
```

### 3. 工具编排
- **协调器角色**: Task工具作为其他工具的协调器
- **智能路由**: 根据任务需求路由到合适的工具
- **结果聚合**: 聚合多个工具的输出结果

## 性能优化

### 1. 上下文效率
- 减少主对话的上下文使用
- 智能提取关键信息
- 压缩冗余信息

### 2. 搜索效率  
- 并行执行多个搜索任务
- 智能缓存搜索结果
- 避免重复搜索

### 3. 结果质量
- 多维度验证搜索结果
- 智能过滤无关信息
- 提供结构化输出

## 错误处理

### 1. 搜索失败
- 自动调整搜索策略
- 尝试替代搜索路径
- 提供部分结果

### 2. 工具调用失败
- 智能选择替代工具
- 降级处理策略
- 错误信息整合

### 3. 结果验证失败
- 重新验证搜索结果
- 扩大搜索范围
- 提供不完整结果警告

## 权限和安全

### 1. 权限继承
- 继承用户的文件访问权限
- 遵循相同的安全策略
- 透明的权限检查

### 2. 安全约束
- 应用相同的安全限制
- 防止恶意搜索模式
- 保护敏感文件

### 3. 审计日志
- 记录所有工具调用
- 跟踪搜索路径
- 提供执行报告

## 最佳实践

### 1. 任务描述
- 提供清晰的任务描述
- 指定搜索目标和范围
- 说明期望的输出格式

### 2. 效率考虑
- 对于简单搜索使用专用工具
- 对于复杂任务使用Task工具
- 避免过度使用造成资源浪费

### 3. 结果验证
- 检查返回结果的完整性
- 验证搜索覆盖范围
- 确认关键信息的准确性

## 架构地位
Task工具是Claude Code智能搜索能力的核心体现，它将多个基础工具编排成一个智能的搜索代理，能够处理复杂的、多步骤的搜索和分析任务。它的设计体现了AI工具从单一功能向智能编排的进化。

## 技术特点
1. **智能编排**: 多工具的智能组合和协调
2. **上下文优化**: 显著减少主对话的上下文使用
3. **自适应**: 根据任务需求自动调整搜索策略
4. **高效集成**: 与所有其他工具的无缝集成
5. **结果导向**: 专注于提供高质量的整合结果# Todo Management Tools (yG & oN)

## 基本信息
- **TodoWrite工具名称**: TodoWrite (yG)
- **TodoRead工具名称**: TodoRead (oN)
- **文件位置**: improved-claude-code-5.mjs:8968481-8970045, 8971786-8973124
- **工具类型**: 任务管理和计划工具

---

## TodoWrite Tool (yG)

### 代码运行时机
- **触发条件**: 用户需要创建、更新或管理任务列表时
- **调用场景**: 
  - 规划复杂的开发任务
  - 跟踪项目进度
  - 分解大型任务为小步骤
  - 记录待完成的工作项
  - 更新任务状态和优先级
- **执行路径**: 用户请求 → 任务分析 → TodoWrite工具调用 → 任务列表更新 → 状态保存

### 系统运转时机
- **生命周期**: 会话级别，任务列表在整个会话中持续存在
- **优先级**: 高优先级，核心项目管理功能
- **持续性**: 任务状态持久化，跨交互保持

### 作用时机
- **任务创建**: 在开始复杂工作前创建任务计划
- **进度更新**: 在完成任务时立即更新状态
- **计划调整**: 根据工作进展调整任务优先级
- **状态同步**: 保持任务状态与实际工作进度同步

### 具体作用
- **任务结构化**: 将复杂工作分解为可管理的任务
- **优先级管理**: 设置和调整任务优先级
- **状态跟踪**: 跟踪任务的执行状态
- **进度可视化**: 提供清晰的工作进度视图

### 参数架构
```javascript
// TodoWrite参数模式
JL6 = n.strictObject({
  todos: GJ1.describe("The updated todo list")
})

// 任务项结构
GJ1 = n.array(
  n.strictObject({
    content: n.string().minLength(1),
    status: n.enum(["pending", "in_progress", "completed"]),
    priority: n.enum(["high", "medium", "low"]), 
    id: n.string()
  })
)
```

---

## TodoRead Tool (oN)

### 代码运行时机
- **触发条件**: 用户需要查看当前任务状态时
- **调用场景**: 
  - 检查当前工作进度
  - 规划下一步工作
  - 确认任务完成状态
  - 了解待处理任务
  - 评估工作量和优先级
- **执行路径**: 用户请求 → TodoRead工具调用 → 任务列表检索 → 格式化显示

### 系统运转时机
- **生命周期**: 查询级别，每次查看独立执行
- **优先级**: 中等优先级，状态查询功能
- **持续性**: 实时反映当前任务状态

### 参数架构
```javascript
// TodoRead参数模式 - 无需参数
FL6 = n.strictObject({}, {
  description: 'No input is required, leave this field blank. NOTE that we do not require a dummy object, placeholder string or a key like "input" or "empty". LEAVE IT BLANK.'
})
```

---

## 相关上下文代码

### TodoWrite工具定义
```javascript
// TodoWrite工具对象 (Line 8968481)
yG = {
  name: "TodoWrite",
  async description() {
    return Ta0  // 工具描述常量
  },
  async prompt() {
    return Oa0  // 工具提示常量
  },
  inputSchema: JL6,
  userFacingName() {
    return "Update Todos"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !1,
  async call(A, B) {
    // 更新任务列表
    await updateTodoList(A.todos, B);
    yield {
      type: "text",
      text: "Todos have been modified successfully. Ensure that you continue to use the todo list to track your progress. Please proceed with the current tasks if applicable"
    }
  }
}
```

### TodoRead工具定义
```javascript
// TodoRead工具对象 (Line 8971786)
oN = {
  name: "TodoRead",
  async description() {
    return ya0  // 工具描述常量
  },
  async prompt() {
    return ja0  // 工具提示常量
  },
  inputSchema: FL6,
  userFacingName() {
    return "Read Todos"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !0,
  async call(A, B) {
    // 读取当前任务列表
    let todos = await getCurrentTodos(B);
    yield {
      type: "text",
      text: formatTodoList(todos)
    }
  }
}
```

## 任务状态管理

### 1. 任务状态类型
```javascript
// 三种基本状态
const TaskStatus = {
  PENDING: "pending",        // 待处理
  IN_PROGRESS: "in_progress", // 进行中
  COMPLETED: "completed"      // 已完成
}
```

### 2. 优先级系统
```javascript
// 三级优先级
const TaskPriority = {
  HIGH: "high",      // 高优先级
  MEDIUM: "medium",  // 中等优先级
  LOW: "low"         // 低优先级
}
```

### 3. 任务生命周期
```javascript
// 典型的任务流转
pending → in_progress → completed
```

## 任务管理最佳实践

### 1. 任务创建指导
```javascript
// 建议的任务创建原则
{
  content: "具体、可操作的任务描述",
  status: "pending",
  priority: "根据紧急性和重要性确定",
  id: "唯一标识符"
}
```

### 2. 状态更新规则
- **及时更新**: 开始工作时立即标记为in_progress
- **完成确认**: 任务完成后立即标记为completed
- **一次一个**: 建议同时只有一个任务处于in_progress状态

### 3. 优先级管理
- **high**: 紧急且重要的任务
- **medium**: 重要但不紧急的任务
- **low**: 既不紧急也不重要的任务

## 使用场景示例

### 1. 项目规划
```javascript
// 复杂项目的任务分解
todos: [
  {
    content: "分析项目需求和技术栈",
    status: "completed",
    priority: "high",
    id: "task-1"
  },
  {
    content: "设计系统架构和数据模型",
    status: "in_progress", 
    priority: "high",
    id: "task-2"
  },
  {
    content: "实现核心功能模块",
    status: "pending",
    priority: "high", 
    id: "task-3"
  },
  {
    content: "编写单元测试",
    status: "pending",
    priority: "medium",
    id: "task-4"
  }
]
```

### 2. Bug修复工作流
```javascript
// Bug修复的任务管理
todos: [
  {
    content: "重现并确认bug",
    status: "completed",
    priority: "high",
    id: "bug-1"
  },
  {
    content: "分析bug根本原因",
    status: "in_progress",
    priority: "high", 
    id: "bug-2"
  },
  {
    content: "实现修复方案",
    status: "pending",
    priority: "high",
    id: "bug-3"
  },
  {
    content: "编写回归测试",
    status: "pending",
    priority: "medium",
    id: "bug-4"
  }
]
```

## 任务列表格式化

### 1. 显示格式
```
Current Todo List:

High Priority:
✓ [completed] 分析项目需求和技术栈
⏳ [in_progress] 设计系统架构和数据模型  
⭕ [pending] 实现核心功能模块

Medium Priority:
⭕ [pending] 编写单元测试
⭕ [pending] 更新项目文档

Low Priority:
⭕ [pending] 优化性能
```

### 2. 进度统计
```
Progress Summary:
- Total tasks: 6
- Completed: 1 (17%)
- In progress: 1 (17%)
- Pending: 4 (66%)
```

## 工具协作模式

### 1. 与其他工具的集成
- **任务启动**: 使用TodoRead查看待办事项
- **工作执行**: 使用相关工具执行任务
- **状态更新**: 使用TodoWrite更新任务状态
- **进度跟踪**: 定期使用TodoRead检查进度

### 2. 工作流程示例
```javascript
// 典型的工作流程
1. TodoRead() → 查看当前任务
2. TodoWrite() → 标记任务为in_progress
3. [执行相关工具] → 完成实际工作
4. TodoWrite() → 标记任务为completed
5. TodoRead() → 确认更新并查看下一个任务
```

## 性能特征
- **并发安全**: 两个工具都是isConcurrencySafe() = true
- **读写分离**: TodoRead只读，TodoWrite可写
- **会话持久化**: 任务状态在会话中持续保存
- **实时同步**: 状态更新立即反映

## 错误处理

### 1. 数据验证错误
- 任务内容为空
- 无效的状态值
- 无效的优先级
- 缺失的任务ID

### 2. 状态冲突
- 重复的任务ID
- 无效的状态转换
- 数据一致性问题

### 3. 系统错误
- 任务存储失败
- 数据读取错误
- 序列化问题

## 架构地位
Todo管理工具是Claude Code项目管理和工作流程支持的核心组件，提供了结构化的任务管理能力，帮助用户和AI共同跟踪复杂开发工作的进展。它体现了Claude Code对专业开发工作流程的深度理解和支持。

## 技术特点
1. **结构化**: 标准化的任务数据结构
2. **状态管理**: 完整的任务生命周期管理
3. **优先级**: 三级优先级系统
4. **持久化**: 会话级别的状态持久化
5. **协作友好**: 与其他工具的良好集成

## 使用指导原则

### 1. 何时使用Todo工具
- 复杂的多步骤任务
- 需要跟踪进度的项目
- 用户明确要求使用待办列表
- 多个相关任务需要协调

### 2. 何时不使用
- 单一简单任务
- 纯信息查询
- 对话性交流
- 琐碎操作

### 3. 最佳实践
- 频繁使用TodoRead检查状态
- 及时更新任务进度
- 同时只处理一个in_progress任务
- 保持任务描述具体和可操作# WebFetch Tool (IJ1)

## 基本信息
- **工具名称**: WebFetch
- **内部常量**: IJ1 = "WebFetch"
- **文件位置**: improved-claude-code-5.mjs:25995, 49897
- **工具类型**: 网页内容获取和处理工具

## 代码运行时机
- **触发条件**: 用户需要获取和分析网页内容时
- **调用场景**: 
  - 获取在线文档和API文档
  - 分析网页结构和内容
  - 获取实时数据和信息
  - 研究竞品网站功能
  - 获取技术文章和教程
- **执行路径**: 用户请求 → URL验证 → WebFetch工具调用 → 网页获取 → AI处理 → 结构化返回

## 系统运转时机
- **生命周期**: 请求级别，每次网页获取独立执行
- **优先级**: 中等优先级，网络依赖工具
- **持续性**: 单次执行，结果缓存15分钟

## 作用时机
- **URL验证**: 验证URL格式和可访问性
- **内容获取**: 从指定URL获取网页内容
- **格式转换**: 将HTML转换为Markdown格式
- **AI处理**: 使用AI模型处理和分析内容

## 作用目的
1. **内容获取**: 从互联网获取最新的网页内容
2. **信息提取**: 使用AI从网页中提取关键信息
3. **格式优化**: 将网页内容转换为易读的格式
4. **实时性**: 获取实时更新的网络信息
5. **智能分析**: 基于用户提示智能分析网页内容

## 具体作用
- **网页抓取**: 获取完整的网页HTML内容
- **格式转换**: HTML到Markdown的智能转换
- **内容分析**: 使用AI模型分析和处理内容
- **信息过滤**: 根据用户需求过滤相关信息
- **结果缓存**: 15分钟的自清理缓存机制

## 描述定义
```javascript
// 工具描述常量 (Line 25995)
Na0 = `
- Fetches content from a specified URL and processes it using an AI model
- Takes a URL and a prompt as input
- Fetches the URL content, converts HTML to markdown
- Processes the content with the prompt using a small, fast model
- Returns the model's response about the content
- Use this tool when you need to retrieve and analyze web content

Usage notes:
  - IMPORTANT: If an MCP-provided web fetch tool is available, prefer using that tool instead of this one, as it may have fewer restrictions. All MCP-provided tools start with "mcp__".
  - The URL must be a fully-formed valid URL
  - HTTP URLs will be automatically upgraded to HTTPS
  - The prompt should describe what information you want to extract from the page
  - This tool is read-only and does not modify any files
  - Results may be summarized if the content is very large
  - Includes a self-cleaning 15-minute cache for faster responses when repeatedly accessing the same URL`
```

## 参数架构
```javascript
// 参数模式定义
inputSchema: n.strictObject({
  url: n.string().format("uri").describe("The URL to fetch content from"),
  prompt: n.string().describe("The prompt to run on the fetched content")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
IJ1 = "WebFetch"  // Line 25995

// 工具对象定义 (Line 49897)
{
  name: IJ1,
  async description() {
    return Na0
  },
  inputSchema: ZI5,
  userFacingName() {
    return "WebFetch"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !0,
  async checkPermissions(A, B) {
    // 网络访问通常不需要特殊权限
    return { isAllowed: true }
  },
  async validateInput(A, B) {
    // 验证URL格式
    try {
      new URL(A.url)
    } catch {
      throw new Error("Invalid URL format")
    }
    return A
  }
}
```

## 核心实现逻辑
```javascript
// 主要调用方法
async * call(A, B) {
  try {
    // 检查缓存
    let cachedResult = await checkCache(A.url);
    if (cachedResult) {
      yield {
        type: "text",
        text: cachedResult
      };
      return;
    }
    
    // 获取网页内容
    let htmlContent = await fetchURL(A.url);
    
    // 转换为Markdown
    let markdownContent = await htmlToMarkdown(htmlContent);
    
    // 使用AI处理内容
    let processedContent = await processWithAI(markdownContent, A.prompt);
    
    // 缓存结果
    await cacheResult(A.url, processedContent, 15 * 60 * 1000); // 15分钟
    
    yield {
      type: "text",
      text: processedContent
    }
  } catch (error) {
    yield {
      type: "error",
      error: `Failed to fetch content: ${error.message}`
    }
  }
}
```

## 网页处理流程

### 1. URL处理
```javascript
// URL标准化和验证
function normalizeURL(url) {
  // HTTP自动升级为HTTPS
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }
  
  // 验证URL格式
  return new URL(url);
}
```

### 2. 内容获取
```javascript
// 网页内容获取
async function fetchWebContent(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Claude Code WebFetch Tool',
      'Accept': 'text/html,application/xhtml+xml'
    },
    timeout: 30000
  });
  
  return await response.text();
}
```

### 3. 格式转换
```javascript
// HTML到Markdown转换
async function convertToMarkdown(html) {
  // 清理HTML
  const cleanHtml = cleanupHTML(html);
  
  // 转换为Markdown
  const markdown = htmlToMarkdown(cleanHtml);
  
  // 优化格式
  return optimizeMarkdown(markdown);
}
```

## AI内容处理

### 1. 模型选择
- **快速模型**: 使用小型、快速的AI模型进行内容处理
- **效率优化**: 平衡处理质量和响应速度
- **成本控制**: 使用成本效益高的模型

### 2. 提示处理
```javascript
// AI提示构建
function buildAIPrompt(content, userPrompt) {
  return `
    Analyze the following web content and ${userPrompt}
    
    Web Content:
    ${content}
    
    Please provide a focused response based on the user's request.
  `;
}
```

### 3. 内容分析
- **信息提取**: 根据用户提示提取相关信息
- **内容总结**: 对大量内容进行智能总结
- **结构化**: 将信息组织成结构化格式

## 缓存机制

### 1. 自清理缓存
```javascript
// 15分钟自清理缓存
const CACHE_DURATION = 15 * 60 * 1000; // 15分钟

class WebFetchCache {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
  }
  
  set(url, content) {
    this.cache.set(url, content);
    
    // 设置自动清理
    const timer = setTimeout(() => {
      this.delete(url);
    }, CACHE_DURATION);
    
    this.timers.set(url, timer);
  }
  
  get(url) {
    return this.cache.get(url);
  }
  
  delete(url) {
    this.cache.delete(url);
    if (this.timers.has(url)) {
      clearTimeout(this.timers.get(url));
      this.timers.delete(url);
    }
  }
}
```

### 2. 缓存策略
- **时间窗口**: 15分钟的缓存有效期
- **自动清理**: 避免内存泄漏
- **重复访问**: 提高重复访问的响应速度

## 安全机制

### 1. URL安全
- **HTTPS升级**: 自动将HTTP升级为HTTPS
- **URL验证**: 严格的URL格式验证
- **域名检查**: 防止访问恶意域名

### 2. 内容安全
- **内容过滤**: 过滤恶意或不适当的内容
- **大小限制**: 限制处理的内容大小
- **超时控制**: 防止长时间等待

### 3. 隐私保护
- **无状态**: 不保存用户的个人信息
- **临时缓存**: 短期缓存自动清理
- **匿名访问**: 不携带用户标识信息

## 使用场景

### 1. 技术文档获取
```javascript
// 获取API文档
url: "https://api.example.com/docs"
prompt: "Extract all available API endpoints and their parameters"
```

### 2. 内容分析
```javascript
// 分析文章内容
url: "https://blog.example.com/article"
prompt: "Summarize the main points and key takeaways from this article"
```

### 3. 数据研究
```javascript
// 研究技术趋势
url: "https://research.example.com/report"
prompt: "Extract statistics and trends mentioned in this research report"
```

## 与MCP工具的关系

### 1. 优先级说明
```
"IMPORTANT: If an MCP-provided web fetch tool is available, prefer using that tool instead of this one, as it may have fewer restrictions. All MCP-provided tools start with 'mcp__'."
```

### 2. 工具选择策略
- **MCP优先**: 优先使用MCP提供的网络工具
- **备选方案**: WebFetch作为备选方案
- **功能补充**: 在MCP工具不可用时提供网络访问能力

## 性能特征
- **并发安全**: isConcurrencySafe() = true
- **只读操作**: isReadOnly() = true
- **缓存优化**: 15分钟缓存减少重复请求
- **超时控制**: 防止长时间阻塞

## 错误处理

### 1. 网络错误
- 连接超时
- DNS解析失败
- 服务器错误响应

### 2. 内容错误
- 无效的HTML格式
- 内容过大
- 编码问题

### 3. 处理错误
- AI模型处理失败
- 格式转换错误
- 缓存操作失败

## 最佳实践

### 1. URL选择
- 使用可靠的网站源
- 确保URL的有效性
- 选择内容丰富的页面

### 2. 提示设计
- 明确指定需要提取的信息
- 避免过于宽泛的提示
- 考虑网页内容的特点

### 3. 性能优化
- 利用缓存机制避免重复请求
- 选择内容相对稳定的页面
- 考虑网络延迟和响应时间

## 架构地位
WebFetch工具是Claude Code网络访问能力的重要组成部分，为AI提供了获取和分析实时网络内容的能力。它体现了Claude Code从本地工具向网络化工具的扩展，支持更广泛的信息获取和分析场景。

## 技术特点
1. **智能处理**: AI驱动的内容分析和提取
2. **格式优化**: HTML到Markdown的智能转换
3. **缓存机制**: 高效的15分钟自清理缓存
4. **安全访问**: HTTPS升级和安全验证
5. **MCP兼容**: 与MCP工具生态的良好集成# WebSearch Tool (c_2)

## 基本信息
- **工具名称**: WebSearch
- **内部常量**: c_2 = "WebSearch"
- **文件位置**: improved-claude-code-5.mjs:9992027, 62912-62932
- **工具类型**: 网络搜索工具

## 代码运行时机
- **触发条件**: 用户需要搜索最新的网络信息时
- **调用场景**: 
  - 获取当前事件和最新数据
  - 搜索技术文档和解决方案
  - 查找API文档和示例
  - 研究最佳实践和行业趋势
  - 获取超出AI知识截止日期的信息
- **执行路径**: 用户请求 → 查询构建 → WebSearch工具调用 → 搜索引擎查询 → 结果处理 → 格式化返回

## 系统运转时机
- **生命周期**: 查询级别，每次搜索查询独立执行
- **优先级**: 中等优先级，网络依赖工具
- **持续性**: 单次执行，实时获取搜索结果

## 作用时机
- **查询优化**: 优化用户搜索查询以获得更好结果
- **域名过滤**: 根据允许或阻止列表过滤搜索域名
- **结果获取**: 从搜索引擎获取相关结果
- **格式化**: 将搜索结果格式化为结构化块

## 作用目的
1. **信息获取**: 访问超出AI知识截止的最新信息
2. **实时搜索**: 获取当前事件和实时数据
3. **知识补充**: 补充AI训练数据中可能缺失的信息
4. **验证信息**: 验证和更新过时的信息
5. **研究支持**: 为用户研究和开发提供信息支持

## 具体作用
- **搜索执行**: 在网络搜索引擎中执行查询
- **结果过滤**: 根据域名白名单/黑名单过滤结果
- **信息提取**: 从搜索结果中提取关键信息
- **格式标准化**: 将结果格式化为标准搜索块
- **相关性排序**: 按相关性排序搜索结果

## 描述定义
```javascript
// 工具描述常量 (Line 9992048)
l_2 = `
- Allows Claude to search the web and use the results to inform responses
- Provides up-to-date information for current events and recent data
- Returns search result information formatted as search result blocks
- Use this tool for accessing information beyond Claude's knowledge cutoff
- Searches are performed automatically within a single API call

Usage notes:
  - Domain filtering is supported to include or block specific websites
  - Web search is only available in the US`
```

## 参数架构
```javascript
// 参数模式定义
inputSchema: n.strictObject({
  query: n.string().min(2).describe("The search query to use"),
  allowed_domains: n.array(n.string()).optional().describe("Only include search results from these domains"),
  blocked_domains: n.array(n.string()).optional().describe("Never include search results from these domains")
})
```

## 相关上下文代码
```javascript
// 工具名称定义
c_2 = "WebSearch"  // Line 9992027

// 工具对象定义 (Line 62912)
{
  name: c_2,
  async description() {
    return l_2
  },
  inputSchema: aM5,
  userFacingName() {
    return "WebSearch"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !0,
  isReadOnly: () => !0,
  async validateInput(A, B) {
    // 验证查询长度
    if (A.query.length < 2) {
      throw new Error("Search query must be at least 2 characters long")
    }
    return A
  }
}
```

## 核心实现逻辑
```javascript
// 主要调用方法 (Line 62932)
async * call(A, B) {
  try {
    // 构建搜索查询
    let searchQuery = optimizeQuery(A.query);
    
    // 执行搜索
    let searchResults = await performWebSearch(searchQuery, {
      allowedDomains: A.allowed_domains,
      blockedDomains: A.blocked_domains,
      region: 'US'  // 仅美国可用
    });
    
    // 格式化结果
    let formattedResults = formatSearchResults(searchResults);
    
    yield {
      type: "text",
      text: formattedResults
    }
  } catch (error) {
    yield {
      type: "error",
      error: `Search failed: ${error.message}`
    }
  }
}
```

## 搜索功能特性

### 1. 地理限制
```javascript
// 仅美国地区可用
"Web search is only available in the US"
```

### 2. 域名过滤支持
```javascript
// 允许域名列表
allowed_domains: [
  "stackoverflow.com",
  "github.com", 
  "developer.mozilla.org"
]

// 阻止域名列表  
blocked_domains: [
  "example-spam.com",
  "unreliable-source.net"
]
```

### 3. 自动执行
```javascript
// 单次API调用完成搜索
"Searches are performed automatically within a single API call"
```

## 搜索结果格式

### 1. 搜索结果块
```javascript
// 标准格式的搜索结果
{
  title: "Result Title",
  url: "https://example.com/page",
  snippet: "Brief description of the page content...",
  domain: "example.com",
  relevance_score: 0.95
}
```

### 2. 结构化输出
```
Search Results for: "Claude Code documentation"

1. Claude Code Official Documentation
   URL: https://docs.anthropic.com/claude-code
   Description: Comprehensive documentation for Claude Code CLI tool including installation, usage examples, and API reference.

2. Claude Code GitHub Repository  
   URL: https://github.com/anthropics/claude-code
   Description: Official GitHub repository with source code, issues, and community discussions.

3. Getting Started with Claude Code
   URL: https://blog.anthropic.com/claude-code-intro
   Description: Introduction blog post explaining the key features and use cases of Claude Code.
```

## 查询优化

### 1. 查询处理
```javascript
// 查询优化策略
function optimizeQuery(query) {
  // 添加相关关键词
  // 移除停用词
  // 优化搜索语法
  return processedQuery;
}
```

### 2. 上下文感知
- 基于当前对话上下文优化查询
- 添加相关的技术术语
- 排除不相关的结果

## 域名过滤机制

### 1. 白名单模式
```javascript
// 只搜索指定域名
allowed_domains: [
  "docs.python.org",
  "nodejs.org",
  "reactjs.org"
]
```

### 2. 黑名单模式
```javascript
// 排除特定域名
blocked_domains: [
  "unreliable-wiki.com",
  "spam-tutorial.net"
]
```

### 3. 混合模式
- 同时使用白名单和黑名单
- 白名单优先级高于黑名单
- 智能域名分类和过滤

## 使用场景

### 1. 技术文档搜索
```javascript
// 搜索API文档
query: "React hooks useEffect documentation"
allowed_domains: ["reactjs.org", "developer.mozilla.org"]
```

### 2. 问题解决
```javascript
// 搜索技术问题解决方案
query: "Python async await best practices 2024"
blocked_domains: ["outdated-tutorials.com"]
```

### 3. 最新技术趋势
```javascript
// 搜索最新技术发展
query: "artificial intelligence developments 2024"
allowed_domains: ["arxiv.org", "research.google.com", "openai.com"]
```

## 信息时效性

### 1. 实时数据
- 获取最新的技术文档更新
- 跟踪当前的技术趋势和发展
- 获取实时的API变更信息

### 2. 知识补充
- 补充AI训练数据的时效性限制
- 获取最新的框架版本信息
- 更新过时的技术知识

### 3. 验证更新
- 验证现有信息的准确性
- 更新过时的最佳实践
- 确认当前的技术标准

## 结果处理

### 1. 相关性过滤
- 按搜索查询相关性排序
- 过滤低质量结果
- 优先显示权威源

### 2. 内容提取
- 提取关键信息片段
- 保留原始链接引用
- 标识信息来源

### 3. 格式优化
- 结构化显示搜索结果
- 突出关键信息
- 提供可操作的链接

## 性能特征
- **并发安全**: isConcurrencySafe() = true
- **只读操作**: isReadOnly() = true
- **地理限制**: 仅美国地区可用
- **实时性**: 获取最新的网络信息

## 错误处理

### 1. 网络错误
- 搜索服务不可用
- 网络连接问题
- 请求超时

### 2. 查询错误
- 查询过短或无效
- 搜索语法错误
- 域名过滤冲突

### 3. 地区限制
- 非美国地区的访问限制
- 地理位置检测失败
- 服务可用性问题

## 安全和隐私

### 1. 查询安全
- 过滤恶意查询内容
- 防止信息泄露
- 保护用户隐私

### 2. 结果验证
- 验证搜索结果的可信度
- 过滤恶意或欺诈网站
- 标识可疑内容

### 3. 数据保护
- 不保存用户搜索历史
- 匿名化搜索查询
- 遵循隐私保护规范

## 最佳实践

### 1. 查询设计
- 使用具体和明确的搜索术语
- 包含相关的技术关键词
- 避免过于宽泛的查询

### 2. 域名策略
- 使用权威技术网站的白名单
- 排除已知的低质量域名
- 平衡结果多样性和质量

### 3. 结果利用
- 结合多个搜索结果进行分析
- 验证关键信息的准确性
- 引用原始来源和链接

## 架构地位
WebSearch工具是Claude Code获取实时网络信息能力的核心，弥补了AI知识截止日期的限制，为用户提供最新、准确的技术信息和解决方案。它体现了Claude Code从静态知识向动态信息获取的重要扩展。

## 技术特点
1. **实时性**: 获取最新的网络信息和数据
2. **过滤能力**: 灵活的域名白名单/黑名单机制
3. **地理感知**: 地区限制确保服务质量
4. **结构化**: 标准化的搜索结果格式
5. **集成性**: 与对话流程的无缝集成# Write Tool (rE2)

## 基本信息
- **工具名称**: Write
- **内部常量**: rE2 = "Write"
- **文件位置**: improved-claude-code-5.mjs:44506, 44668-44698
- **工具类型**: 文件创建和重写工具

## 代码运行时机
- **触发条件**: 用户需要创建新文件或完全重写现有文件时
- **调用场景**: 
  - 创建新的源代码文件
  - 生成配置文件
  - 创建文档和README
  - 重写损坏的文件
  - 生成模板文件
- **执行路径**: 用户请求 → 路径验证 → 权限检查 → Write工具调用 → 文件写入

## 系统运转时机
- **生命周期**: 操作级别，每次写入操作独立执行
- **优先级**: 高优先级，文件创建核心功能
- **持续性**: 单次执行，结果持久化到文件系统

## 作用时机
- **文件检查**: 对于现有文件，必须先读取过内容
- **路径创建**: 自动创建必要的父目录
- **权限验证**: 检查文件写入权限
- **内容写入**: 完全覆盖文件内容

## 作用目的
1. **文件创建**: 创建全新的文件
2. **内容重写**: 完全替换现有文件内容
3. **原子写入**: 确保写入操作的原子性
4. **目录创建**: 自动创建必要的目录结构
5. **编码处理**: 正确处理文件编码和格式

## 具体作用
- **路径解析**: 处理绝对路径和相对路径
- **目录创建**: 创建不存在的父目录
- **内容写入**: 将content写入到指定文件
- **权限设置**: 设置适当的文件权限
- **编码转换**: 处理不同的文件编码

## 描述定义
```javascript
// 工具描述常量 (Line 44506)
oE2 = "Writes a file to the local filesystem.\n\nUsage:\n- This tool will overwrite the existing file if there is one at the provided path.\n- If this is an existing file, you MUST use the Read tool first to read the file's contents. This tool will fail if you did not read the file first.\n- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.\n- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.\n- Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked."
```

## 参数架构
```javascript
// 参数模式定义
inputSchema: n.strictObject({
  file_path: n.string().describe("The absolute path to the file to write (must be absolute, not relative)"),
  content: n.string().describe("The content to write to the file")
})
```

## 相关上下文代码
```javascript
// 工具对象定义 (Line 44668)
{
  name: rE2,
  async description() {
    return oE2
  },
  inputSchema: NI5,
  userFacingName() {
    return "Write"
  },
  isEnabled: () => !0,
  isConcurrencySafe: () => !1,  // 非并发安全
  isReadOnly: () => !1,         // 非只读操作
  
  async validateInput(A, B) {
    // 对于现有文件，必须先读取
    if (await fileExists(A.file_path) && !B.hasReadFile(A.file_path)) {
      throw new Error("If this is an existing file, you MUST use the Read tool first to read the file's contents. This tool will fail if you did not read the file first.")
    }
    
    return A
  }
}
```

## 核心安全机制

### 1. 现有文件保护
```javascript
// 必须先读取现有文件
if (await fileExists(A.file_path) && !B.hasReadFile(A.file_path)) {
  throw new Error("If this is an existing file, you MUST use the Read tool first to read the file's contents.")
}
```

### 2. 路径验证
```javascript
// 绝对路径要求
if (!A.file_path.startsWith('/')) {
  throw new Error('File path must be absolute, not relative')
}
```

### 3. 权限检查
```javascript
async checkPermissions(A, B) {
  return await AX5(A.file_path, B)  // 使用通用权限检查
}
```

## 核心实现逻辑
```javascript
// 主要调用方法 (Line 44698)
async * call(A, B) {
  let Q = await V2(A.file_path, B.userId);
  if (!Q.isAllowed) {
    yield {
      type: "error",
      error: Q.denialReason
    };
    return
  }
  
  await fY5(A.file_path, A.content, B);
  yield {
    type: "text",
    text: `File written successfully to ${A.file_path}`
  }
}
```

## 文件操作策略

### 1. 新文件创建
- **自动目录创建**: 如果父目录不存在，自动创建
- **权限设置**: 设置适当的文件权限
- **编码处理**: 使用UTF-8编码写入

### 2. 现有文件覆盖
- **读取验证**: 必须先使用Read工具读取现有内容
- **完全覆盖**: 完全替换文件内容，不保留原有内容
- **备份策略**: 可能的文件备份机制

### 3. 特殊文件处理
- **文档文件**: 禁止主动创建.md或README文件
- **配置文件**: 特殊的配置文件格式处理
- **可执行文件**: 自动设置执行权限

## 使用策略指导

### 1. 优先级原则
```
"ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required."
```

### 2. 文档创建限制
```
"NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User."
```

### 3. 内容规范
```
"Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked."
```

## 目录管理

### 1. 自动目录创建
```javascript
// 创建父目录
async function ensureDirectoryExists(filePath) {
  const directory = path.dirname(filePath);
  await fs.mkdir(directory, { recursive: true });
}
```

### 2. 路径处理
- 绝对路径要求
- 路径标准化
- 特殊字符处理

### 3. 权限继承
- 从父目录继承权限
- 用户权限映射
- 系统默认权限

## 与其他工具的关系

### 1. 与Edit工具的区别
| 方面 | Write工具 | Edit工具 |
|------|----------|----------|
| 用途 | 创建新文件/完全重写 | 修改现有文件 |
| 内容处理 | 完全覆盖 | 精确替换 |
| 读取要求 | 现有文件需先读取 | 必须先读取 |
| 适用场景 | 新文件创建 | 内容修改 |

### 2. 与MultiEdit工具的协作
- Write用于创建新文件
- MultiEdit用于复杂的现有文件编辑
- 可以组合使用完成复杂操作

### 3. 与Read工具的依赖
```javascript
// 对于现有文件的依赖关系
现有文件 → Read工具(必须) → Write工具
新文件 → Write工具(直接)
```

## 错误处理机制

### 1. 前置条件错误
- 现有文件未读取错误
- 路径格式错误
- 权限不足错误

### 2. 文件系统错误
- 磁盘空间不足
- 目录创建失败
- 文件锁定冲突

### 3. 内容错误
- 编码转换错误
- 内容格式错误
- 特殊字符处理错误

## 性能特征
- **并发安全**: isConcurrencySafe() = false (文件写入操作)
- **读写操作**: isReadOnly() = false
- **原子性**: 文件写入的原子性保证
- **缓冲**: 大文件的缓冲写入机制

## 安全设计

### 1. 数据保护
- 现有文件的读取验证
- 内容完整性检查
- 写入确认机制

### 2. 路径安全
- 绝对路径强制要求
- 路径遍历防护
- 敏感目录保护

### 3. 权限控制
- 文件级别权限检查
- 用户级别访问控制
- 目录权限继承

## 最佳实践指导

### 1. 文件创建策略
- 优先编辑现有文件
- 仅在必要时创建新文件
- 避免重复创建同类文件

### 2. 内容管理
- 保持内容格式一致性
- 避免不必要的表情符号
- 遵循项目编码规范

### 3. 路径管理
- 使用绝对路径
- 遵循项目目录结构
- 避免深层嵌套目录

## 架构地位
Write工具是Claude Code文件创建功能的核心，与Edit工具共同构成了完整的文件操作体系。它的设计强调安全性和谨慎性，防止不必要的文件创建，同时为必要的文件生成提供了可靠的机制。

## 技术特点
1. **谨慎设计**: 强调编辑优于创建的原则
2. **安全机制**: 现有文件的读取验证要求
3. **自动化**: 自动目录创建和权限设置
4. **一致性**: 与整个工具生态的一致设计
5. **可靠性**: 原子性写入和错误处理机制