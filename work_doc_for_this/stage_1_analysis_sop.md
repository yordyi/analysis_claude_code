# Claude Code 逆向工程SOP - 阶段一：深度分析与知识沉淀

**项目代号:** Prometheus-Analyzer

**阶段目标:** 
对 `claude-code` 的混淆二进制文件 (`cli.mjs`) 进行彻底的、系统性的逆向分析。本阶段的最终目标**不是**生成可运行的代码，而是产出一套详尽、准确、结构化的技术文档库。这些文档将作为下一阶段（功能复现）的“设计蓝图”和“知识圣经”。

**核心理念:** 
在不理解一行代码之前，不编写一行复现代码。通过LLM辅助的自动化分析流程，将混淆代码转化为人类和AI都能深刻理解的架构图、模块原理和工作流说明。

**工作区:** `stage1_analysis_workspace/`

---

## **工作流程框架**

本阶段遵循一个线性的、逐步深入的分析流程，确保每一步的输出都为下一步提供更丰富的上下文。

1.  **环境与目标准备 (Setup):** 建立分析工作区，获取并预处理目标文件。
2.  **代码分解与依赖识别 (Decomposition & Identification):** 将大型文件分解，并利用LLM识别并分离已知的第三方库。
3.  **核心逻辑探索与文档化 (Exploration & Documentation):** 针对 `claude-code` 自身逻辑，进行迭代式提问和分析，系统性地生成模块文档。
4.  **知识整合与归档 (Integration & Archiving):** 将所有分析产出的文档和数据进行结构化整理，形成最终的知识库。

---

## **详细步骤**

### **1. 环境与目标准备 (Setup)**

*   **1.1: 创建分析工作区**
    *   **指令:** `创建目录结构: /stage1_analysis_workspace/source, /stage1_analysis_workspace/analysis_results, /stage1_analysis_workspace/docs`
    *   `source`: 存放原始及预处理后的 `cli.mjs` 文件。
    *   `analysis_results`: 存放代码分块、LLM识别结果、合并后的代码等中间产物。
    *   `docs`: **本阶段的核心产出**，存放最终生成的系统架构、模块原理等Markdown文档。
    *   **指令:** `将 ccode/step2/claude-code-reverse/scripts/ 目录下的所有脚本复制到 /stage1_analysis_workspace/scripts/`

*   **1.2: 获取与预处理目标**
    *   **指令:** `获取 '@anthropic-ai/claude-code' 的 'cli.mjs' 文件，存放于 /stage1_analysis_workspace/source/cli.mjs`
    *   **指令:** `使用 js-beautify 格式化原始文件，保存为 /stage1_analysis_workspace/source/cli.beautify.mjs`
    *   **参考实现:** `/stage1_analysis_workspace/scripts/beautify.js`

### **2. 代码分解与依赖识别 (Decomposition & Identification)**

*   **2.1: 代码分块**
    *   **指令:** `使用 acorn 库解析 cli.beautify.mjs，按阈值分割成多个代码块，保存于 /stage1_analysis_workspace/analysis_results/chunks/`
    *   **参考实现:** `/stage1_analysis_workspace/scripts/split.js` (注意调整脚本内的路径以适应新工作区)

*   **2.2: LLM识别依赖**
    *   **指令:** `遍历 /chunks/ 目录下的代码块，使用LLM识别其开源项目归属和功能，将结果（.json文件）保存在同目录下。`
    *   **参考实现:** `/stage1_analysis_workspace/scripts/learn-chunks.js`

*   **2.3: 依赖合并与分离**
    *   **指令:** `根据LLM的识别结果和内置规则，将属于已知第三方库的代码块合并。将识别为 'claude-code' 自身逻辑的块单独分类合并。所有合并结果存入 /stage1_analysis_workspace/analysis_results/merged-chunks/`
    *   **参考实现:** `/stage1_analysis_workspace/scripts/merge-again.js`

*   **2.4: 核心代码上下文增强**
    *   **指令:** `分析所有 'claude-code-*' 代码块，识别其对外部库的依赖关系，并将这些信息以注释的形式添加到代码块顶部。优化后的文件保存为 'improved-claude-code-*.mjs'。`
    *   **参考实现:** `/stage1_analysis_workspace/scripts/improve-merged-chunks.js`

### **3. 核心逻辑探索与文档化 (Exploration & Documentation)**

这是本阶段最关键的部分。目标是利用LLM的问答能力，系统性地将混淆代码“翻译”成高质量的技术文档。

*   **3.1: 建立待分析主题清单 (Topic Queue)**
    *   **指令:** `基于对代码的初步浏览和文件名猜测，创建一个待深入分析的主题清单，保存为 /stage1_analysis_workspace/docs/TODO_ANALYSIS.md。`
    *   **示例清单内容:**
        ```markdown
        - [ ] 整体系统架构与工作流
        - [ ] 命令行参数解析与处理
        - [ ] 用户交互界面 (基于Ink.js)
        - [ ] LLM调用核心逻辑 (模型选择、Prompt构建、API请求)
        - [ ] Tool Calling 机制 (工具定义、调用、权限)
        - [ ] MCP (Model Context Protocol) 协议的实现与交互
        - [ ] `/compact` 指令的工作原理
        - [ ] 状态管理与历史记录
        - [ ] 文件系统操作的封装
        - [ ] 错误处理与日志遥测
        ```

*   **3.2: 迭代式问答与文档生成**
    *   **核心循环指令:** `对于 "TODO_ANALYSIS.md" 中的每一个主题:`
        1.  `**设计问题:** 针对当前主题，设计一个或多个深入、具体的问题。例如，对于 "Tool Calling 机制" 主题，问题可以是："请详细分析 Tool Calling 的完整流程，从工具定义、LLM如何决定调用工具，到参数解析、工具执行和结果返回的全过程。并以Mermaid时序图的形式展示。"`
        2.  `**执行分析:** 调用问答脚本 (ask.js)，将设计好的问题作为输入，对所有 'improved-claude-code-*.mjs' 代码块进行分析。`
        3.  `**生成文档:** 将LLM返回的、经过整理和验证的答案，保存为一个独立的Markdown文件。例如，/stage1_analysis_workspace/docs/module_analysis/05_tool_calling_mechanism.md。`
        4.  `**更新清单:** 在 "TODO_ANALYSIS.md" 中标记该主题为已完成。`
    *   **参考实现:** `/stage1_analysis_workspace/scripts/ask.js`

### **4. 知识整合与归档 (Integration & Archiving)**

*   **4.1: 生成系统架构总览文档**
    *   **指令:** `在所有模块分析完成后，综合 /docs/module_analysis/ 目录下的所有文档，生成一份顶级的系统架构总览文档 /stage1_analysis_workspace/docs/SYSTEM_ARCHITECTURE.md。`
    *   **文档内容应包括:**
        *   高级组件图 (Mermaid block-diagram)。
        *   核心数据流和控制流说明。
        *   各主要模块（组件）的职责概述及其交互方式。

*   **4.2: 项目归档**
    *   **指令:** `将整个 /stage1_analysis_workspace/ 目录打包成 'claude-code-analysis-archive.zip'。`
    *   **归档声明:** `阶段一：深度分析与知识沉淀，已完成。所有分析成果已归档。准备进入阶段二：测试驱动的功能复现。`