# Agent SOP Flow 02: 多文件重构任务流程

## 任务场景
**场景描述**: 用户要求对一个现有项目进行大规模重构，包括重命名函数、更新API调用、重组文件结构、更新依赖关系等跨多个文件的复杂操作。

**任务复杂度**: 超高复杂度（20+轮Agent Loop）
**分析基础**: 模拟基于Claude Code工具生态系统的实际重构工作流

---

## Agent运行流程还原 (28轮Agent Loop)

### 第1轮: 重构需求理解
```
用户输入: "重构这个项目，将所有的数据处理函数从 processData 重命名为 handleDataProcessing，
         更新所有调用点，重组utils目录结构，并确保测试通过"

[Agent内部处理 - nO函数执行]
├── ga0()系统提示激活
│   └── "You are Claude Code..." + 重构任务识别
├── 任务复杂度评估
│   ├── 多文件操作: ✓
│   ├── 函数重命名: ✓  
│   ├── 目录重组: ✓
│   └── 测试验证: ✓
├── 重构风险评估
│   └── 高风险操作，需要系统性方法
└── TodoWrite工具预判
    └── 复杂多步骤任务，必须使用任务管理

[输出决策]
└── 工具调用: TodoWrite(创建重构任务计划)
```

### 第2轮: 重构计划制定
```
[工具执行] TodoWrite → 创建详细的重构任务列表

[Agent内部处理]
├── 重构阶段规划
│   ├── 阶段1: 项目结构分析
│   ├── 阶段2: 依赖关系映射
│   ├── 阶段3: 函数重命名执行
│   ├── 阶段4: 目录结构重组
│   └── 阶段5: 测试验证
├── 风险点识别
│   ├── 破坏性变更风险
│   ├── 依赖丢失风险
│   └── 测试失败风险
└── 备份策略确认

[输出决策]
└── 工具调用: LS(分析项目根目录结构)
```

### 第3轮: 项目结构探索
```
[工具执行] LS Tool → 获取项目目录结构

[Agent内部处理]
├── 目录结构分析
│   ├── 识别主要模块: src/, utils/, tests/
│   ├── 配置文件发现: package.json, tsconfig.json
│   └── 文档目录: docs/, README.md
├── 文件类型统计
│   ├── .js/.ts文件数量
│   ├── 测试文件分布
│   └── 配置文件位置
└── 重构影响范围评估

[输出决策]
└── 工具调用: Glob(查找所有可能包含processData的文件)
```

### 第4轮: 目标函数定位
```
[工具执行] Glob Tool → 发现 **/*.{js,ts,jsx,tsx} 文件列表

[Agent内部处理]
├── 文件优先级排序
│   ├── 核心模块文件
│   ├── 工具函数文件
│   └── 测试文件
├── 搜索策略制定
│   └── 使用Grep工具精确搜索函数调用
└── 搜索模式优化

[输出决策]
└── 工具调用: Grep(搜索"processData"的所有出现位置)
```

### 第5轮: 函数使用分析
```
[工具执行] Grep Tool → 发现23个文件中的47个匹配项

[Agent内部处理]
├── 匹配结果分类
│   ├── 函数定义: 3处 (主函数 + 重载)
│   ├── 函数调用: 31处
│   ├── 类型定义: 8处
│   ├── 注释引用: 5处
│   └── 测试用例: 14处 (重复计算)
├── 依赖关系构建
│   └── 创建函数调用依赖图
└── 重构影响评估

[输出决策]  
└── 工具调用: Read(读取主要函数定义文件)
```

### 第6轮: 函数定义分析
```
[工具执行] Read Tool → 读取 src/data/processor.js

[Agent内部处理]
├── 函数签名分析
│   ├── processData(data, options = {})
│   ├── processDataAsync(data, callback)
│   └── processDataBatch(dataArray)
├── 导出方式确认
│   └── export { processData, processDataAsync, processDataBatch }
├── 内部依赖检查
│   └── 识别内部helper函数调用
└── 重命名策略确定

[输出决策]
└── 工具调用: Grep(搜索相关helper函数)
```

### 第7轮: 依赖关系深度分析
```
[工具执行] Grep Tool → 发现相关helper函数

[Agent内部处理]
├── 完整依赖链分析
│   ├── processData → validateData → checkSchema
│   ├── processData → transformData → mapFields
│   └── processData → saveResult → writeFile
├── 循环依赖检查
│   └── 未发现循环依赖
├── 外部库依赖
│   └── lodash, joi, fs-extra
└── 重构风险重新评估

[输出决策]
└── 工具调用: Read(检查package.json和配置文件)
```

### 第8轮: 项目配置分析
```
[工具执行] Read Tool → 读取package.json

[Agent内部处理]
├── 脚本命令分析
│   ├── test: "jest"
│   ├── lint: "eslint src/"
│   └── build: "webpack"
├── 依赖版本检查
├── 测试框架确认 (Jest)
└── 构建工具确认 (Webpack)

[输出决策]
└── 工具调用: LS(检查utils目录结构)
```

### 第9轮: Utils目录重组规划
```
[工具执行] LS Tool → 分析utils目录内容

[Agent内部处理]
├── 当前utils结构分析
│   ├── utils/data-processing.js
│   ├── utils/validation.js
│   ├── utils/file-helpers.js
│   └── utils/string-utils.js
├── 重组策略设计
│   ├── 按功能分组: data/, validation/, io/
│   └── 按使用频率分组: core/, helpers/, misc/
└── 文件移动计划制定

[输出决策]
└── 工具调用: TodoWrite(更新重构进度，添加实施步骤)
```

### 第10轮: 重构实施准备
```
[工具执行] TodoWrite → 更新任务列表，添加具体实施步骤

[Agent内部处理]
├── Git状态检查建议
├── 备份策略确认
├── 分步执行计划
│   ├── 第一批: 函数定义重命名
│   ├── 第二批: 导入/导出更新  
│   ├── 第三批: 函数调用更新
│   └── 第四批: 测试和文档更新
└── 回滚准备

[输出决策]
└── 工具调用: Bash(检查git状态，创建分支)
```

### 第11轮: Git环境准备
```
[工具执行] Bash Tool → git status && git checkout -b refactor/rename-process-data

[Agent内部处理]
├── Git状态验证
│   └── 工作目录干净，新分支创建成功
├── 实施准备完成确认
└── 开始实际重构操作

[输出决策]
└── 工具调用: Read(再次确认主函数定义)
```

### 第12轮: 主函数定义重命名
```
[工具执行] Read Tool → 确认当前函数定义

[Agent内部处理]
├── 精确替换字符串确定
├── 多个函数的重命名计划
│   ├── processData → handleDataProcessing
│   ├── processDataAsync → handleDataProcessingAsync  
│   └── processDataBatch → handleDataProcessingBatch
└── MultiEdit策略制定

[输出决策]
└── 工具调用: MultiEdit(批量重命名主文件中的函数定义)
```

### 第13轮: 主文件函数重命名执行
```
[工具执行] MultiEdit Tool → 成功重命名src/data/processor.js中的函数

[Agent内部处理]
├── 重命名结果验证
├── 导出语句更新确认
├── 下一步导入文件更新计划
└── 影响文件优先级排序

[输出决策]
└── 工具调用: Grep(查找所有import语句)
```

### 第14轮: 导入语句更新
```
[工具执行] Grep Tool → 找到所有import processData的文件

[Agent内部处理]
├── 导入语句分类
│   ├── 默认导入: import processData
│   ├── 命名导入: import { processData }
│   └── 重命名导入: import { processData as pd }
├── 批量更新策略
└── 文件分组处理

[输出决策]
└── 工具调用: MultiEdit(更新第一组文件的导入语句)
```

### 第15轮: 批量导入更新 - 第一批
```
[工具执行] MultiEdit Tool → 更新5个文件的导入语句

[Agent内部处理]
├── 更新结果验证
├── 剩余文件列表更新
├── 继续处理决策
└── 错误检查

[输出决策]
└── 工具调用: MultiEdit(更新第二组文件的导入语句)
```

### 第16轮: 批量导入更新 - 第二批
```
[工具执行] MultiEdit Tool → 更新剩余6个文件的导入语句

[Agent内部处理]
├── 所有导入语句更新完成
├── 函数调用更新准备
├── 调用点分析策略
└── 测试文件特殊处理准备

[输出决策]
└── 工具调用: Grep(查找所有函数调用点)
```

### 第17轮: 函数调用点更新
```
[工具执行] Grep Tool → 精确定位所有processData()调用

[Agent内部处理]
├── 调用上下文分析
│   ├── 直接调用: processData(userData)
│   ├── 方法链调用: .then(processData)
│   └── 回调传递: callback(processData)
├── 复杂调用模式识别
└── 分批更新策略

[输出决策]
└── 工具调用: Task(协调复杂的多文件搜索和替换)
```

### 第18轮: 智能批量调用更新
```
[工具执行] Task Tool → 智能协调多工具执行复杂替换

[Agent内部处理]
├── Task工具智能编排
│   ├── Grep定位精确匹配
│   ├── Read确认上下文
│   └── Edit执行安全替换
├── 边缘情况处理
│   └── 字符串中的函数名排除
└── 进度跟踪

[输出决策]
└── 工具调用: TodoWrite(更新调用点更新进度)
```

### 第19轮: 测试文件更新
```
[工具执行] TodoWrite → 更新进度，开始测试文件处理

[Agent内部处理]
├── 测试文件特殊模式
│   ├── 描述字符串中的函数名
│   ├── Mock对象的方法名
│   └── 断言中的期望值
├── 测试策略调整
└── 测试数据更新需求

[输出决策]
└── 工具调用: Read(检查主要测试文件)
```

### 第20轮: 测试文件内容分析
```
[工具执行] Read Tool → 读取tests/data-processor.test.js

[Agent内部处理]
├── 测试结构分析
│   ├── describe块标题
│   ├── it测试用例描述
│   ├── Mock设置
│   └── 断言语句
├── 需要更新的元素识别
├── 测试数据完整性检查
└── 谨慎更新策略

[输出决策]
└── 工具调用: MultiEdit(谨慎更新测试文件)
```

### 第21轮: Utils目录重组开始
```
[工具执行] MultiEdit Tool → 完成测试文件更新

[Agent内部处理]
├── 函数重命名阶段完成确认
├── 目录重组阶段开始
├── 新目录结构规划
│   ├── utils/data/
│   ├── utils/validation/
│   └── utils/io/
└── 文件移动策略

[输出决策]
└── 工具调用: Bash(创建新的目录结构)
```

### 第22轮: 新目录结构创建
```
[工具执行] Bash Tool → mkdir -p utils/{data,validation,io}

[Agent内部处理]
├── 目录创建成功确认
├── 文件移动计划制定
│   ├── data-processing.js → utils/data/
│   ├── validation.js → utils/validation/
│   └── file-helpers.js → utils/io/
└── 路径更新影响分析

[输出决策]
└── 工具调用: Bash(执行文件移动)
```

### 第23轮: 文件移动执行
```
[工具执行] Bash Tool → mv utils/data-processing.js utils/data/ (等)

[Agent内部处理]
├── 文件移动成功确认
├── 导入路径更新需求识别
├── 受影响文件列表生成
└── 路径更新策略

[输出决策]
└── 工具调用: Grep(查找所有受影响的导入路径)
```

### 第24轮: 导入路径批量更新
```
[工具执行] Grep Tool → 找到所有需要更新的导入路径

[Agent内部处理]
├── 路径映射表创建
│   ├── '../utils/data-processing' → '../utils/data/data-processing'
│   └── './validation' → './validation/validation'
├── 相对路径计算
└── 批量更新准备

[输出决策]
└── 工具调用: MultiEdit(批量更新导入路径)
```

### 第25轮: 构建和测试验证
```
[工具执行] MultiEdit Tool → 完成所有路径更新

[Agent内部处理]
├── 重构完成度检查
├── 验证阶段准备
├── 测试命令准备
└── 构建命令准备

[输出决策]
└── 工具调用: Bash(运行linting检查)
```

### 第26轮: 代码质量检查
```
[工具执行] Bash Tool → npm run lint

[Agent内部处理]
├── Linting结果分析
│   └── 发现2个未使用的import
├── 自动修复vs手动修复决策
├── 代码风格一致性检查
└── 下一步测试准备

[输出决策]
└── 工具调用: Edit(修复linting问题)
```

### 第27轮: 测试执行与验证
```
[工具执行] Edit Tool → 修复未使用的import

[Agent内部处理]
├── Linting问题解决确认
├── 测试执行准备
├── 测试失败预案
└── 成功标准定义

[输出决策]
└── 工具调用: Bash(运行完整测试套件)
```

### 第28轮: 重构完成确认
```
[工具执行] Bash Tool → npm test (所有测试通过)

[Agent内部处理]
├── 测试结果验证
│   └── ✓ 47 tests passed, 0 failed
├── 重构成功确认
├── 提交准备
├── 文档更新建议
└── 任务完成评估

[输出决策]
└── 工具调用: TodoWrite(标记重构任务完成)

[最终输出]
├── 重构总结报告
├── 变更文件列表 (23个文件)
├── 测试通过确认
└── 后续建议 (文档更新、PR创建)
```

---

## Agent决策树深度分析

### 1. 复杂任务的智能分解
```javascript
// 重构任务分解的决策逻辑
function decomposeRefactoringTask(userRequest) {
  let analysis = {
    scope: analyzeScopeComplexity(userRequest),
    risks: assessRefactoringRisks(userRequest),
    dependencies: mapDependencies(userRequest),
    testRequirements: identifyTestNeeds(userRequest)
  };
  
  if (analysis.scope === 'multi-file' && analysis.risks === 'high') {
    return {
      approach: 'systematic',
      toolSequence: ['TodoWrite', 'LS', 'Glob', 'Grep', 'Read', 'MultiEdit'],
      safeguards: ['git-branch', 'backup', 'incremental-testing'],
      phases: ['analysis', 'planning', 'execution', 'validation']
    };
  }
}
```

### 2. 多文件编辑的并发控制
```javascript
// MultiEdit工具的智能使用策略
class MultiFileEditStrategy {
  constructor(files, changes) {
    this.files = files;
    this.changes = changes;
    this.batches = this.createBatches();
  }
  
  createBatches() {
    // 按依赖关系和风险等级分批
    return {
      phase1: this.files.filter(f => f.type === 'definition'),
      phase2: this.files.filter(f => f.type === 'import'),
      phase3: this.files.filter(f => f.type === 'usage'),
      phase4: this.files.filter(f => f.type === 'test')
    };
  }
  
  async execute() {
    for (let phase of Object.keys(this.batches)) {
      await this.executeBatch(this.batches[phase]);
      await this.validateBatch(this.batches[phase]);
    }
  }
}
```

### 3. 错误恢复与回滚机制
```javascript
// 重构失败时的智能恢复
class RefactoringRecovery {
  constructor(originalState) {
    this.checkpoints = [];
    this.originalState = originalState;
  }
  
  createCheckpoint(phase, files) {
    this.checkpoints.push({
      phase,
      timestamp: Date.now(),
      fileStates: files.map(f => ({ path: f, hash: this.getFileHash(f) }))
    });
  }
  
  async rollback(toPhase) {
    let checkpoint = this.checkpoints.find(c => c.phase === toPhase);
    if (checkpoint) {
      await this.restoreFiles(checkpoint.fileStates);
      return true;
    }
    return false;
  }
}
```

---

## 工具协作模式分析

### 1. 搜索工具的层次使用
```
Glob Tool (文件发现)
    ↓
Grep Tool (内容定位) 
    ↓
Read Tool (上下文确认)
    ↓
Edit/MultiEdit Tool (精确修改)
```

### 2. 任务管理的全程跟踪
```
TodoWrite (创建计划)
    ↓
TodoWrite (更新进度) [在每个关键节点]
    ↓  
TodoWrite (阶段完成)
    ↓
TodoWrite (最终确认)
```

### 3. 验证工具链
```
Bash (linting) → Edit (修复) → Bash (testing) → 确认成功
```

---

## 上下文压缩策略

### 28轮Agent Loop中的压缩点
1. **第10轮后**: 项目分析完成，压缩早期探索内容
2. **第18轮后**: 函数重命名完成，压缩实施细节  
3. **第25轮后**: 目录重组完成，压缩中间过程

### AU2压缩提示的8段式应用
```javascript
// 重构任务的压缩策略
const refactoringCompressionPrompt = AU2({
  context: "multi-file refactoring task",
  sections: {
    "Primary Request": "Rename processData to handleDataProcessing across project",
    "Key Technical Concepts": "Function renaming, dependency tracking, file reorganization",
    "Files Modified": "23 files across src/, utils/, tests/ directories",
    "Critical Changes": "Function definitions, import statements, call sites, test files",
    "Validation Results": "All tests pass, linting clean, build successful",
    "Current Status": "Refactoring completed successfully"
  }
});
```

---

## 性能优化洞察

### 1. 批量操作优化
- **MultiEdit工具**: 单次操作处理多个文件，减少工具调用次数
- **Task工具**: 智能编排多工具协作，避免重复搜索
- **并发调用**: 利用并发安全工具的并行处理能力

### 2. 智能缓存策略
- **Grep结果缓存**: 相似搜索模式的结果复用
- **文件状态缓存**: 避免重复读取未修改文件
- **依赖关系缓存**: 一次分析，多次使用

### 3. 渐进式验证
- **阶段性测试**: 每个重构阶段后运行部分测试
- **增量linting**: 只检查修改过的文件
- **快速反馈**: 优先运行核心功能测试

---

## 风险管理与安全保障

### 1. 数据安全
```javascript
// 重构前的安全检查
const safetyChecks = {
  gitStatus: () => bash('git status --porcelain'),
  backupCreation: () => bash('git stash push -m "pre-refactor-backup"'),
  branchCreation: () => bash('git checkout -b refactor/operation'),
  testBaseline: () => bash('npm test')
};
```

### 2. 操作安全
- **只读模式验证**: 先用Read工具确认内容再Edit
- **精确匹配**: Edit工具的unique string matching防止误替换
- **分批执行**: 分阶段执行降低单次操作风险

### 3. 回滚机制
- **Git分支隔离**: 在独立分支进行重构
- **检查点创建**: 关键阶段创建可回滚点
- **增量验证**: 每步验证后再继续

---

## 局限性与改进方向

### 1. 当前局限
- **大项目处理**: 超大项目可能遭遇上下文限制
- **复杂依赖**: 动态依赖关系难以静态分析
- **异步操作**: 某些重构操作的原子性保障

### 2. 改进机会
- **智能依赖分析**: 更高级的代码分析能力
- **模板化重构**: 常见重构模式的模板化
- **可视化进度**: 复杂重构的可视化进度跟踪

---

## 成功指标

### 1. 技术指标
- ✅ 所有测试通过 (47/47)
- ✅ 代码风格检查通过
- ✅ 构建成功无错误
- ✅ 23个文件成功修改

### 2. 流程指标  
- ✅ 28轮Agent Loop高效执行
- ✅ 零手动干预完成
- ✅ 完整的任务跟踪记录
- ✅ 系统化的错误预防

### 3. 质量指标
- ✅ 向后兼容性保持
- ✅ API接口一致性
- ✅ 代码可读性提升
- ✅ 项目结构优化

---

*本分析深度还原了Claude Code处理复杂多文件重构任务的完整Agent Loop流程，展示了智能工具编排、风险管理、批量操作优化等核心能力，为理解Claude Code在大型项目重构中的应用提供了详细的技术洞察。*