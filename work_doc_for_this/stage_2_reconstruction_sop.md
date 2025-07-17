# Claude Code 逆向工程SOP - 阶段二：测试驱动的功能复现

**项目代号:** Athena-Reconstructor

**阶段目标:** 
基于第一阶段（Prometheus-Analyzer）产出的深度分析文档和系统架构，从零开始，通过严格的测试驱动开发（TDD）和自修正循环，**重建**一个功能等价、代码清晰、完全可验证的 `claude-code` TypeScript版本。

**核心理念:** 
以测试为契约，以第一阶段的分析文档为蓝图。每一行功能代码的编写都必须由一个失败的测试来驱动。最终的成功标准是整个项目通过所有预定义的单元测试和集成测试。

**前置条件:**
*   **必须**完成阶段一的所有步骤。
*   本阶段的输入是阶段一的最终归档产物，特别是 `/docs/SYSTEM_ARCHITECTURE.md` 和 `/docs/module_analysis/` 下的所有文档。

**工作区:** `stage2_reconstruction_workspace/`

---

## **工作流程框架**

本阶段的核心是一个“红-绿-重构”的测试驱动循环，并加入了AI特有的自修正能力。

1.  **蓝图与骨架定义 (Blueprint & Scaffolding):** 将第一阶段的分析文档转化为可执行的、但会失败的测试项目骨架。
2.  **迭代式实现与自修正 (Implementation & Self-Correction):** 逐一实现功能模块，利用测试框架实时验证，并通过闭环反馈进行代码修正。
3.  **集成、终验与打包 (Integration & Packaging):** 确保所有模块协同工作，完成最终验证并打包交付。

---

## **详细步骤**

### **1. 蓝图与骨架定义 (Blueprint & Scaffolding)**

*   **1.1: 创建复现工作区**
    *   **指令:** `创建目录结构: /stage2_reconstruction_workspace/build, /stage2_reconstruction_workspace/tests, /stage2_reconstruction_workspace/specs`
    *   `build`: 存放最终生成的可读TypeScript源代码。
    *   `tests`: 存放所有测试代码。
    *   `specs`: 存放指导开发工作的核心规范文档。

*   **1.2: 导入分析蓝图**
    *   **指令:** `将第一阶段产出的 /stage1_analysis_workspace/docs/SYSTEM_ARCHITECTURE.md 和 /stage1_analysis_workspace/docs/module_analysis/ 目录下的所有文档，复制到 /stage2_reconstruction_workspace/specs/ 目录下。`

*   **1.3: 生成测试计划**
    *   **指令:** `基于 /specs/SYSTEM_ARCHITECTURE.md 和所有模块分析文档，生成一份详细的、可转化为代码的《测试计划》，保存为 /stage2_reconstruction_workspace/specs/TEST_PLAN.md。`
    *   **计划要求:** 每个测试用例必须包含唯一ID、被测模块、输入、预期输出和测试类型。

*   **1.4: 创建测试驱动骨架**
    *   **指令:** `在 /stage2_reconstruction_workspace/build/ 目录下，初始化一个标准的TypeScript项目（包含package.json, tsconfig.json），并配置好Jest或Vitest测试框架。`
    *   **指令:** `根据 /specs/SYSTEM_ARCHITECTURE.md 规划的文件结构，在 /build/src/ 目录下创建所有空的模块文件（如 a.ts, b.ts）。`
    *   **指令:** `将 /specs/TEST_PLAN.md 中的每个测试用例，转化为位于 /tests/ 目录下的可执行测试代码。这些测试代码应导入 /build/src/ 中对应的空文件。此时，运行整个测试套件，预期结果是100%失败。这个失败的测试套件，是我们后续开发的“验证框架”。`

### **2. 迭代式实现与自修正 (Implementation & Self-Correction)**

这是本阶段的核心开发循环，目标是让测试逐一“变绿”。

*   **核心循环指令 (The Athena Loop):**
    *   **指令:** `启动实现循环。对于 /specs/TEST_PLAN.md 中定义的每一个模块:`
        1.  `**选择目标:** 从测试报告中选择一个失败的测试，并确定其对应的未实现模块 (e.g., 'src/tool_executor.ts')。`
        2.  `**生成实现:** 聚焦于该模块，以 /specs/ 目录下对应的分析文档为“需求说明书”，生成该模块的完整TypeScript实现代码，写入 /build/src/ 中对应的文件。`
        3.  `**执行测试:** 再次运行之前失败的那个测试。`
        4.  `**分析与修正 (Self-Correction):**`
            *   `**若通过 (变绿):** 标记该模块/功能点为'COMPLETE'。继续循环，选择下一个失败的测试。`
            *   `**若依然失败 (保持红色):**`
                *   `分析新的失败日志（错误信息、堆栈跟踪等）。`
                *   `对比分析文档、测试用例和刚生成的代码，定位逻辑错误。`
                *   `生成一份修正后的代码。`
                *   `返回第3步(执行测试)，使用新代码重试。`
                *   `若同一测试连续失败超过5次，标记为'NEEDS_MANUAL_REVIEW'，并暂时跳过，继续下一个失败的测试，以防陷入僵局。`
        5.  `**依赖驱动:** 如果测试失败是因为缺少某个内部依赖（如一个工具函数），则暂停当前模块，优先进入该依赖模块的实现循环。完成后，返回当前模块继续。`

### **3. 集成、终验与打包 (Integration & Packaging)**

*   **3.1: 全面集成测试**
    *   **指令:** `在所有单元测试都通过后，运行所有标记为 "Integration" 的测试。重复执行3次，确保系统的稳定性和模块间的正确协同。`

*   **3.2: 最终集成修复**
    *   **指令:** `若有任何集成测试失败，分析涉及的模块之间的交互日志和数据流。参考 /specs/ 中的高级架构图和时序图，修改 /build/src/ 中的相关文件以修复集成问题，然后重新执行完整的集成测试，直至全部通过。`

*   **3.3: 生成最终文档与清理**
    *   **指令:** `为 /stage2_reconstruction_workspace/build/ 目录自动生成一份最终的 README.md 文件。内容应包括：项目简介、高级架构图、以及详细的构建、安装和运行测试的指令。`

*   **3.4: 最终交付**
    *   **指令:** `将整个 /stage2_reconstruction_workspace/build/ 目录（包含src, package.json等，不含tests）打包成一个zip压缩文件，命名为 'claude-code-reconstructed-v1.0.zip'。`
    *   **归档声明:** `阶段二：测试驱动的功能复现，已完成。已产出通过完整测试套件验证的、功能等价的源代码。`