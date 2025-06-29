# 逆向工程施工文档 - 阶段一，步骤一：静态分析与理论建模

**致AI员工：**
本文档是您需要执行的第一阶段工作。您的任务是扮演一名软件分析师，通过阅读给定的混淆代码，产出一系列关于其核心机制的深度分析报告（我们称之为“理论假说”）。请严格按照以下步骤操作，不要遗漏或自行发挥。

---

## **任务A：工作环境准备**

**目标：** 建立一个干净、结构化的工作空间，并准备好所有待分析的源代码片段。

*   **A.1: 创建目录结构**
    *   **指令：** 在您的项目根目录下，执行以下命令：
        ```bash
        mkdir -p stage1_analysis_workspace/{source,analysis_results/chunks,analysis_results/merged-chunks,docs/static_analysis_reports,scripts}
        ```

*   **A.2: 复制分析脚本**
    *   **指令：** 执行以下命令，将所有必需的辅助脚本复制到新工作区：
        ```bash
        cp ccode/step2/claude-code-reverse/scripts/*.js stage1_analysis_workspace/scripts/
        ```

*   **A.3: 获取并预处理目标代码**
    *   **指令：** 严格按顺序执行以下所有命令：
        ```bash
        # 1. 全局安装目标NPM包
        npm install -g @anthropic-ai/claude-code

        # 2. 找到并复制核心文件
        NPM_ROOT=$(npm root -g)
        cp "${NPM_ROOT}/@anthropic-ai/claude-code/cli.mjs" "stage1_analysis_workspace/source/cli.mjs"

        # 3. 执行代码美化 (此步骤是为了让后续分块更准确)
        node "stage1_analysis_workspace/scripts/beautify.js"

        # 4. 执行代码分块
        node "stage1_analysis_workspace/scripts/split.js"

        # 5. 让一个基础LLM识别每个块的依赖（此为唯一一次调用外部LLM作为工具）
        node "stage1_analysis_workspace/scripts/learn-chunks.js"

        # 6. 根据识别结果，合并属于同一项目的代码块
        node "stage1_analysis_workspace/scripts/merge-again.js"

        # 7. 为我们自己的代码块添加依赖注释，增强可读性
        node "stage1_analysis_workspace/scripts/improve-merged-chunks.js"
        ```
    *   **完成标志：** 您的 `stage1_analysis_workspace/analysis_results/merged-chunks/` 目录下应出现一系列 `improved-claude-code-*.mjs` 文件。这些是您后续分析的唯一输入。

---

## **任务B：核心机制静态分析**

**目标：** 针对Claude Code的几个核心机制，通过深度阅读代码，分别撰写分析报告（理论假说）。

**通用指令：** 对于以下每一个分析任务，您都需要：
1.  **阅读所有输入文件**：将 `stage1_analysis_workspace/analysis_results/merged-chunks/` 目录下的 **所有** `improved-claude-code-*.mjs` 文件作为您的上下文。
2.  **代入思考框架**：在阅读时，脑中代入指定的“思考框架（提示词）”，带着问题去寻找答案。
3.  **撰写并保存报告**：将您的分析结果，严格按照“输出要求”的格式，保存到指定的Markdown文件中。

---

### **分析任务 B.1: Agent系统架构与主循环**

*   **任务目标：** 描绘出整个Agent应用的宏观架构和核心工作流程。
*   **输入文件：** `stage1_analysis_workspace/analysis_results/merged-chunks/improved-claude-code-*.mjs` (全部)
*   **思考框架 (代入此提示词进行思考)：**
    > “我现在是一位顶尖的软件架构师，正在审查一个复杂的AI Agent的混淆代码。我的目标是梳理出它的核心骨架。我需要带着以下问题去阅读这些代码碎片：
    > 1.  **组件识别：** 这个系统由哪几个主要部分组成？（例如：UI渲染、命令处理、LLM交互、状态管理、工具执行等）。我需要找到代表这些组件的关键函数或对象（比如`TA9`, `cB`, `Yq2`等）。
    > 2.  **入口与流程：** 程序的入口在哪里？一个用户的输入是如何被接收，并一步步传递到核心处理逻辑，最终渲染出结果的？这个主干流程是怎样的？
    > 3.  **协同关系：** 这些组件之间是如何互相调用和通信的？例如，UI组件是如何调用LLM交互模块的？LLM交互模块又是如何触发工具执行模块的？”
*   **输出要求：**
    *   **文件名:** `stage1_analysis_workspace/docs/static_analysis_reports/H1_AGENT_ARCHITECTURE.md`
    *   **内容:**
        *   一份详细的文字说明，描述您识别出的主要组件及其职责。
        *   一个Mermaid的`graph TD`或`block-diagram`，清晰地展示组件间的关系和调用流程。
        *   对核心主循环（Agent Loop）的伪代码或关键函数调用序列的描述。

---

### **分析任务 B.2: 记忆与上下文管理**

*   **任务目标：** 深入理解Agent如何管理对话历史、文件内容，以及如何处理上下文窗口。
*   **输入文件：** (同上)
*   **思考框架 (代入此提示词进行思考)：**
    > “我现在是一名专注于大型语言模型应用的AI工程师，正在分析一个Agent的记忆系统。我的核心问题是：‘上下文是如何构建和维护的？’ 我需要关注：
    > 1.  **历史记录：** 哪一个数据结构（可能是个数组）被用来存储用户和AI的多轮对话？它的结构是怎样的？
    > 2.  **上下文注入：** 当用户使用`/edit`等命令时，文件内容是如何被读入并加入到对话上下文中的？
    > 3.  **Prompt构建：** 在调用LLM之前，系统是如何将系统提示、对话历史、文件上下文等所有信息组合成最终的Prompt的？
    > 4.  **压缩机制 (`/compact`)：** 找到处理`/compact`指令的函数（如`FC9`）。它用来进行摘要的Prompt是什么？它是如何用摘要替换掉旧的对话历史的？
    > 5.  **窗口管理：** 有没有代码片段（如`dN1`, `tK1`）涉及到token数量的检查？这是否暗示了某种上下文截断或警告机制？”
*   **输出要求：**
    *   **文件名:** `stage1_analysis_workspace/docs/static_analysis_reports/H2_CONTEXT_MEMORY.md`
    *   **内容:**
        *   详细描述上下文管理的关键数据结构和函数。
        *   用Mermaid的`sequenceDiagram`展示一个包含文件操作的多轮对话中，上下文的构建过程。
        *   对`/compact`指令的工作原理进行专门、详细的图文分析。

---

### **分析任务 B.3: 工具实现与调用流程**

*   **任务目标：** 彻底搞清楚工具（Tools）是如何被定义、调用、执行以及处理错误的。
*   **输入文件：** (同上)
*   **思考框架 (代入此提示词进行思考)：**
    > “我现在是专门设计和实现工具调用（Tool Calling）系统的工程师。我需要完整地逆向出这套系统的机制。我要寻找的线索是：
    > 1.  **工具定义：** 系统内置了哪些工具（如`Architect`, `StickerRequest`）？它们是如何被定义的？一个典型的工具定义对象包含哪些属性（如`name`, `description`, `inputSchema`, `call`）？
    > 2.  **调用决策：** 在主LLM调用流程中（如函数`cB`），系统是如何判断LLM的返回结果是一个需要调用工具的请求的？
    > 3.  **执行流程：** 找到负责执行工具的函数（如`Yq2`, `pA9`）。它如何根据工具名称找到对应的定义？如何使用`inputSchema`（可能是Zod）来验证LLM提供的参数？
    > 4.  **结果返回：** 工具执行成功后，它的返回值是如何被格式化并再次加入到对话上下文中，以供LLM生成最终答复的？
    > 5.  **错误处理：** 如果工具的`.call()`方法执行时抛出异常，是哪个`try...catch`块负责捕获？错误信息是如何被处理并反馈给LLM的（参考函数`iA9`）？”
*   **输出要求：**
    *   **文件名:** `stage1_analysis_workspace/docs/static_analysis_reports/H3_TOOL_HANDLING.md`
    *   **内容:**
        *   列出所有已识别的工具及其定义结构。
        *   用一个Mermaid的`sequenceDiagram`详细描绘从LLM产生工具调用意图到最终结果返回的完整成功流程。
        *   用另一个`sequenceDiagram`描绘工具执行失败时的错误处理流程。

---

**阶段一完成标志：**
当`docs/static_analysis_reports/`目录下成功生成上述三份详尽的、高质量的分析报告后，本阶段任务完成。