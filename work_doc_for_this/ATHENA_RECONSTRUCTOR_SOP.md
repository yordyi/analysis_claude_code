# 项目：自验证式代码逆向重建框架 (SOP for AI Agent)

**项目代号：** Athena-Reconstructor

**核心理念：** 本SOP的目标不是对混淆代码进行简单的“分析”或“翻译”，而是**“重建功能等价物”**。最终产出的源代码，必须在功能、接口和行为上与原始二进制文件保持一致。成功的唯一标准是通过一个在实现前就已定义好的、完整的自动化测试套件。

**施工AI：** Athena (一个具备规划、代码生成、测试驱动开发、调试和自我修正能力的高级AI程序员)

---

## **工作流程框架总览**

Athena将遵循一个包含“生成-验证-修正”循环的五阶段流程。此流程确保了每一步的产出都是可验证的，并且整个过程是朝着一个明确的、可测试的目标前进。

- **阶段一：环境初始化与目标锁定 (Setup & Acquire)**
  - 建立结构化的工作空间，获取并预处理逆向目标。
- **阶段二：架构分析与测试计划生成 (Analyze & Plan)**
  - 深入分析目标，产出可作为开发蓝图的《架构规范》和可作为验收标准的《测试计划》。
- **阶段三：测试驱动的项目骨架生成 (Test-Driven Scaffolding)**
  - 将《测试计划》转化为可执行但会失败的测试代码，搭建“验证框架”。
- **阶段四：迭代式实现与自修正循环 (Implement & Self-Correct)**
  - 核心开发阶段，逐模块实现功能，并利用测试框架进行实时验证和自动修复。
- **阶段五：集成、终验与打包 (Finalize & Package)**
  - 确保所有模块协同工作，通过最终集成测试，并打包交付成果。

---

## **阶段一：环境初始化与目标锁定 (Setup & Acquire)**

**目标：** 建立一个清晰、隔离的工作空间，并获取、净化待逆向的二进制文件。

*   **步骤 1.1: 创建标准工作区**
    *   **指令：** `为新的逆向工程项目创建标准目录结构：/re_workspace/source, /re_workspace/build, /re_workspace/specs, /re_workspace/tests`
    *   `source`: 存放原始二进制文件和分析过程中的中间产物（如代码分块）。
    *   `build`: 存放最终生成的可读TypeScript源代码项目。
    *   `specs`: 存放分析阶段生成的规格和计划文档。
    *   `tests`: 存放用于验证重建代码的测试代码和相关工具。

*   **步骤 1.2: 目标获取与净化**
    *   **指令：** `通过npm获取目标包'@anthropic-ai/claude-code'。定位其核心可执行文件'cli.mjs'，并将其复制到 /re_workspace/source/cli.mjs。`

*   **步骤 1.3: 代码预处理**
    *   **指令：** `调用 js-beautify 工具格式化 /re_workspace/source/cli.mjs，将结果保存为 /re_workspace/source/cli.beautify.mjs。这将为后续的AST分析提供便利。`
    *   **参考实现：** 可复用 `ccode/step2/claude-code-reverse/scripts/beautify.js` 的逻辑。

---

## **阶段二：架构分析与测试计划生成 (Analyze & Plan)**

**目标：** 产出一份可用于指导开发的**《架构规范》**和一份可用于验收的**《测试计划》**。此阶段是整个项目的基石。

*   **步骤 2.1: 深度分析与依赖识别 (Tactical Analysis)**
    *   **子步骤 2.1.1: 代码分块**
        *   **指令：** `使用acorn库解析 /re_workspace/source/cli.beautify.mjs，按~100,000字符的阈值将其分割成多个代码块，保存于 /re_workspace/source/chunks/ 目录下，并生成块索引 /re_workspace/source/chunks/chunks.index.json。`
        *   **参考实现：** `ccode/step2/claude-code-reverse/scripts/split.js`。
    *   **子步骤 2.1.2: LLM初步识别**
        *   **指令：** `遍历所有代码块，使用LLM识别每个块所属的开源项目和主要功能，将结果保存为对应的.json文件。`
        *   **参考实现：** `ccode/step2/claude-code-reverse/scripts/learn-chunks.js`。
    *   **子步骤 2.1.3: 依赖合并与分类**
        *   **指令：** `根据LLM的识别结果和内置的修正规则，将属于同一依赖（如react, aws-sdk）的代码块合并。将识别为'claude-code'自身逻辑的块单独分类（如claude-code-1, claude-code-2...）。所有合并结果存入 /re_workspace/source/merged-chunks/。`
        *   **参考实现：** `ccode/step2/claude-code-reverse/scripts/merge-again.js`。

*   **步骤 2.2: 生成高级架构规范 (High-Level Spec)**
    *   **指令：** `综合分析 /re_workspace/source/merged-chunks/ 中所有被识别为'claude-code'相关的代码块。生成一份高级架构规范文档，并保存为 /re_workspace/specs/ARCHITECTURE.md。`
    *   **文档必须包含：**
        1.  **核心功能域：** 识别并划分核心模块（例如：`CLI_Interface`, `LLM_Interaction`, `MCP_Client`, `Tool_Execution`, `File_System_Ops`, `State_Management`）。
        2.  **关键数据结构：** 定义主要的数据模型和它们的Schema（例如`Message`, `Tool`, `Command`等）。
        3.  **主控流程：** 描述从用户输入到程序响应的主要工作流，包括关键的用户命令（如 `/compact`, `/edit`）及其处理逻辑。
        4.  **文件结构提议：** 根据功能域，规划出重建后的 `/build/src` 目录结构。

*   **步骤 2.3: 生成自动化测试计划 (Test Plan)**
    *   **指令：** `基于 /re_workspace/specs/ARCHITECTURE.md，创建一份全面的《测试计划》，并保存为 /re_workspace/specs/TEST_PLAN.md。`
    *   **计划要求：** 针对每个功能域，定义一组单元测试和集成测试。每个测试用例必须清晰描述：
        1.  **唯一ID** (e.g., `CMD-EDIT-001`)
        2.  **被测模块/函数** (e.g., `Tool_Execution::executeTool()`)
        3.  **前置条件与输入**
        4.  **预期输出或状态变更**
        5.  **测试类型** (Unit, Integration)

---

## **阶段三：测试驱动的项目骨架生成 (Test-Driven Scaffolding)**

**目标：** 将《测试计划》转化为可执行但必然失败的测试代码，以此构建起后续开发的“验证框架”。

*   **步骤 3.1: 初始化TypeScript项目**
    *   **指令：** `在 /re_workspace/build/ 目录下，初始化一个标准的TypeScript项目，包含 'package.json', 'tsconfig.json'，并配置好测试框架 (如Jest或Vitest)。`

*   **步骤 3.2: 生成空的实现文件**
    *   **指令：** `根据 /re_workspace/specs/ARCHITECTURE.md 中定义的文件结构，在 /re_workspace/build/src/ 目录下创建所有对应的空目录和文件。`

*   **步骤 3.3: 生成可执行的测试代码**
    *   **指令：** `将 /re_workspace/specs/TEST_PLAN.md 中的每个测试用例，转化为位于 /re_workspace/tests/ 目录下的可执行测试代码。测试代码应导入 /build/src/ 中对应的（空）模块。此时，运行测试将导致100%失败。`
    *   **示例 (`/re_workspace/tests/tool_execution.test.ts`):**
        ```typescript
        import { ToolExecutor } from '../build/src/tool_execution'; // 导入尚不存在的实现
        
        describe('Tool Execution', () => {
          test('EXEC-001: should correctly execute a simple tool', async () => {
            const executor = new ToolExecutor();
            const toolDefinition = { name: 'add', call: (a, b) => a + b };
            const result = await executor.execute(toolDefinition, [2, 3]);
            expect(result).toBe(5);
          });
        });
        ```

---

## **阶段四：迭代式实现与自修正循环 (Implement & Self-Correct)**

**目标：** 逐模块生成功能代码，并利用测试框架进行实时验证和自动修复，直至所有测试通过。这是项目的核心执行循环。

*   **核心循环指令 (The Athena Loop):**
    *   **指令：** `启动实现循环。对于 /re_workspace/specs/ARCHITECTURE.md 中定义的每个模块:`
    1.  `**选择目标：** 选取下一个未完成的模块 (e.g., 'src/tool_execution.ts')。`
    2.  `**生成实现：** 聚焦于该模块，深入分析 /re_workspace/source/merged-chunks/ 中相关的'claude-code'代码块，生成该模块的完整TypeScript实现代码。在分析时，可采用上下文逐步聚合技术（类似ask.js的逻辑）来处理跨多个代码块的逻辑。`
    3.  `**执行测试：** 仅运行与当前模块相关的测试文件 (e.g., 'tests/tool_execution.test.ts')。`
    4.  `**分析与修正 (Self-Correction):**`
        *   `**若通过：** 标记该模块为'COMPLETE'，进入下一个模块的循环。`
        *   `**若失败：**`
            *   `分析失败测试的日志（堆栈跟踪、错误信息、输出差异）。`
            *   `将失败原因与刚生成的代码进行关联，定位逻辑错误。`
            *   `生成一份修正后的代码。`
            *   `返回第3步(执行测试)，使用新代码重试。`
            *   `若同一测试连续失败超过5次，则标记该模块为'NEEDS_MANUAL_REVIEW'，并继续下一个模块，以防陷入死循环。`
    5.  `**依赖驱动：** 如果测试失败是因为缺少某个内部依赖（如一个工具函数），则暂停当前模块，优先进入该依赖模块的实现循环。完成后，返回当前模块继续。`

---

## **阶段五：集成、终验与打包 (Finalize & Package)**

**目标：** 确保所有独立开发的模块能够协同工作，项目健壮、可构建，并生成最终交付物。

*   **步骤 5.1: 全面集成测试**
    *   **指令：** `在所有模块都标记为'COMPLETE'后，完整地运行 /re_workspace/tests/ 目录下的所有测试。重复执行3次，以确保没有并发问题或不稳定的情况。`

*   **步骤 5.2: 最终集成修复**
    *   **指令：** `若有任何集成测试失败，分析涉及的模块之间的交互。修改 /build/src/ 中的相关文件以修复问题，然后重新执行完整的集成测试，直至所有测试通过。`

*   **步骤 5.3: 生成文档与清理**
    *   **指令：** `为 /re_workspace/build/ 目录自动生成一份 README.md 文件，内容包括：项目简介、根据 /specs/ARCHITECTURE.md 提炼的架构说明、以及如何构建和运行测试的指令。清理所有临时的测试文件和构建产物。`

*   **步骤 5.4: 最终交付**
    *   **指令：** `将整个 /re_workspace/build/ 目录打包成一个zip压缩文件，命名为 'claude-code-reconstructed-src.zip'。项目至此完成。`