# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个Claude Code v1.0.33的逆向工程研究项目，包含了对混淆代码的深度分析、架构解析和开源重建尝试。项目的核心价值在于理解现代AI Agent系统的设计模式和实现机制。

## 核心技术架构

### 主要技术发现
- **h2A双重缓冲异步消息队列**: 实现零延迟消息传递，吞吐量 > 10,000 消息/秒
- **分层多Agent架构**: nO主循环引擎、I2A子任务代理、Task Agent专用处理器
- **智能上下文管理**: 92%阈值自动压缩，wU2压缩器优化Token使用
- **6层权限验证**: 从UI到工具执行的完整安全链，沙箱隔离执行环境

## 常用命令

### 代码分析脚本（在 claude_code_v_1.0.33/stage1_analysis_workspace/scripts/ 目录下）
```bash
# 代码美化
node scripts/beautify.js source/cli.mjs

# 代码分块（将大文件分成102个chunk）
node scripts/split.js cli.beautify.mjs

# LLM辅助分析
node scripts/llm.js chunks/chunks.1.mjs

# 代码合并
node scripts/merge-again.js
```

### Open-Claude-Code 开源实现（TypeScript项目）
```bash
# 在 docs/Open-Claude-Code/ 目录下
npm install       # 安装依赖
npm run build     # TypeScript编译
npm run test      # 运行测试
npm run benchmark # 性能基准测试
npm run lint      # 代码检查
npm run dev       # 运行示例
npm run validate  # 完整验证（lint + test + benchmark）
```

## 项目结构

### 分析工作区
- `claude_code_v_1.0.33/stage1_analysis_workspace/`
  - `chunks/`: 102个混淆代码分块文件
  - `scripts/`: 分析脚本集（beautify.js, split.js, llm.js等）
  - `docs/`: 100+技术文档，包含架构分析、验证报告、实施指南
  - `source/`: 原始混淆代码文件

### 核心技术文档
- `docs/实时Steering机制完整技术文档.md`: h2A消息队列实现
- `docs/分层多Agent架构完整技术文档.md`: Agent系统架构
- `docs/FINAL_VALIDATION_REPORT.md`: 95%准确性的验证报告
- `docs/Open-Claude-Code/`: TypeScript开源实现项目

### 重要配置
- TypeScript配置：严格模式，ES2022目标，所有类型检查开启
- 测试覆盖率要求：80%以上（branches, functions, lines, statements）

## 关键技术要点

### h2A消息队列核心机制
- 双重缓冲策略：零延迟路径 + 缓冲路径
- Promise-based异步迭代器
- 智能背压控制
- 支持实时流式响应

### Agent执行流程
1. nO主循环引擎调度任务
2. h2A消息队列传递消息
3. 工具系统6阶段执行管道
4. 结果通过wu会话流生成器返回

### 上下文压缩策略
- Token使用达到92%阈值时自动触发
- 保留30%关键信息
- 基于重要性评分的智能压缩

## 注意事项

1. 这是一个研究和分析项目，主要用于教育和学术目的
2. 代码包含大量去混淆后的JavaScript块，位于chunks目录
3. Open-Claude-Code是基于分析结果的开源重建尝试（TypeScript实现）
4. 所有技术断言都有源码位置支持，验证准确率达85%以上