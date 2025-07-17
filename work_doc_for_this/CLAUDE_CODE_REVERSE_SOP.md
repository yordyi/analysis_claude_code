# Claude Code 自动化逆向工程施工文档 (SOP for AI Programmer)

## 1. 项目概述与目标

本文档旨在为AI程序员提供一个清晰、可执行的标准作业程序（SOP），用于自动化完成对 `claude-code` 项目 `cli.mjs` 文件的逆向工程。最终目标是能够理解其代码结构和核心逻辑，并通过大型语言模型（LLM）对逆向后的代码进行提问和分析。

**核心挑战：**

*   原始代码 (`cli.mjs`) 经过uglify处理，可读性差。
*   原始文件体积较大 (4.6MB)，超出常规LLM上下文处理能力。

**解决思路：**

采用分而治之的策略，结合LLM的“有损压缩/解压缩”能力和模式识别能力，逐步分解和理解代码。

1.  **预处理：** 美化代码，为后续AST分析和分割做准备。
2.  **代码分割：** 将大型代码文件分割成LLM可处理的小块。
3.  **依赖识别：** 利用LLM识别并标记出已知的第三方开源库代码。
4.  **人工校正与合并：** （在此SOP中，我们假设AI可以基于规则或先前学习进行部分自动化校正，或标记需要人工介入的部分）对LLM的识别结果进行审查和修正，并将属于同一项目的代码块合并。
5.  **目标代码优化：** 针对 `claude-code` 自身相关的代码片段，通过添加上下文注释（如导入来源）来增强LLM的理解。
6.  **信息提取与分析：** 设计特定的提问机制，让LLM从多个优化后的代码片段中逐步收集和整合信息，回答用户提出的问题。

## 2. 准备阶段

### 2.1 阶段目标

*   确保项目环境配置正确。
*   获取并准备好待分析的原始 `cli.mjs` 文件。

### 2.2 具体步骤

#### 步骤 2.2.1：环境初始化与依赖安装

*   **目标：** 搭建项目运行所需的基础环境。
*   **操作指令 (给AI程序员)：**
    1.  确保本地已安装 [Node.JS](https://nodejs.org/en) 和 [yarn](https://classic.yarnpkg.com/)。
    2.  在项目根目录下（包含 `package.json` 文件的目录，即 `ccode/step2/claude-code-reverse/`），执行以下命令安装项目依赖：
        ```shell
        yarn install
        ```
*   **涉及文件/脚本：**
    *   `package.json` (用于依赖管理)
*   **预期产出：**
    *   `node_modules` 目录被创建，并包含所有必要的依赖项。
*   **注意事项：**
    *   如果AI程序员在受限环境中执行，需要确保有网络访问权限以下载依赖。

#### 步骤 2.2.2：获取原始 `cli.mjs`

*   **目标：** 确保逆向工程的起点文件 `cli.mjs` 已就绪。
*   **操作指令 (给AI程序员)：**
    1.  确认 `ccode/step2/claude-code-reverse/cli.mjs` 文件存在。该文件是 `npm install -g @anthropic-ai/claude-code` 后从NPM包中提取的核心文件。
    2.  如果文件不存在，需要执行 `npm install -g @anthropic-ai/claude-code` 并从相应的全局安装路径找到 `cli.mjs` 文件，复制到 `ccode/step2/claude-code-reverse/` 目录下。
        *   NPM全局包的典型路径（可能因系统和Node.js安装方式而异）：
            *   Linux/macOS: `~/.nvm/versions/node/<version>/lib/node_modules/@anthropic-ai/claude-code/cli.mjs` 或 `/usr/local/lib/node_modules/@anthropic-ai/claude-code/cli.mjs`
            *   Windows: `%AppData%\npm\node_modules\@anthropic-ai\claude-code\cli.mjs`
*   **涉及文件/脚本：**
    *   `ccode/step2/claude-code-reverse/cli.mjs` (原始输入文件)
*   **预期产出：**
    *   `ccode/step2/claude-code-reverse/cli.mjs` 文件可用。

## 3. 代码预处理阶段

### 3.1 阶段目标

*   提高原始Uglify代码的可读性（主要是格式化），便于后续AST解析和分割。

### 3.2 具体步骤

#### 步骤 3.2.1：代码美化

*   **目标：** 使用 `js-beautify` 工具格式化 `cli.mjs` 文件。
*   **操作指令 (给AI程序员)：**
    1.  执行以下命令，调用 [`scripts/beautify.js`](ccode/step2/claude-code-reverse/scripts/beautify.js:1) 脚本：
        ```shell
        node ccode/step2/claude-code-reverse/scripts/beautify.js
        ```
*   **涉及文件/脚本：**
    *   输入: `ccode/step2/claude-code-reverse/cli.mjs`
    *   脚本: [`ccode/step2/claude-code-reverse/scripts/beautify.js`](ccode/step2/claude-code-reverse/scripts/beautify.js:1) (该脚本内部使用 `js-beautify` 库)
*   **预期产出：**
    *   生成美化后的代码文件：`ccode/step2/claude-code-reverse/cli.beautify.mjs`。此文件将包含缩进和换行，代码块更分离。

## 4. 代码分割与初步分析阶段

### 4.1 阶段目标

*   将美化后的大型JavaScript文件 (`cli.beautify.mjs`) 分割成多个较小的、LLM上下文可处理的代码块 (chunks)。
*   为每个代码块生成初步的元数据（如原始位置）。
*   利用LLM初步识别每个代码块可能所属的开源项目及其主要功能。

### 4.2 具体步骤

#### 步骤 4.2.1：代码分割

*   **目标：** 使用 `acorn` (JavaScript解析器) 将 `cli.beautify.mjs` 文件按顶层作用域的代码块（如函数声明、导出声明等）进行AST分析，并根据长度阈值 (`CHUNK_THRESHOLD = 100_000` 字符) 分割成多个 `.mjs` 文件。
*   **操作指令 (给AI程序员)：**
    1.  执行以下命令，调用 [`scripts/split.js`](ccode/step2/claude-code-reverse/scripts/split.js:1) 脚本：
        ```shell
        node ccode/step2/claude-code-reverse/scripts/split.js
        ```
*   **涉及文件/脚本：**
    *   输入: `ccode/step2/claude-code-reverse/cli.beautify.mjs`
    *   脚本: [`ccode/step2/claude-code-reverse/scripts/split.js`](ccode/step2/claude-code-reverse/scripts/split.js:1)
*   **预期产出：**
    *   在 `ccode/step2/claude-code-reverse/chunks/` 目录下生成多个代码块文件，命名格式为 `chunks.$num.mjs` (例如 `chunks.1.mjs`, `chunks.2.mjs`, ...)。
    *   在 `ccode/step2/claude-code-reverse/chunks/` 目录下生成一个索引文件 `chunks.index.json`，记录原始代码中AST块名称与对应 `chunks.$num.mjs` 文件的映射关系。
    *   在 `ccode/step2/claude-code-reverse/chunks/` 目录下生成一个入口文件 `cli.chunks.mjs`，包含一些未被分割到独立chunk的小代码片段。

#### 步骤 4.2.2：识别外部依赖 (LLM初次分析)

*   **目标：** 对每个分割后的代码块 (`chunks.$num.mjs`)，使用LLM识别其可能属于的开源项目名称和代码意图。
*   **操作指令 (给AI程序员)：**
    1.  确保已配置LLM API Key (例如 `GOOGLE_GENERATIVE_AI_API_KEY`，根据 [`scripts/llm.js`](ccode/step2/claude-code-reverse/scripts/llm.js:1) 和 [`scripts/ask.js`](ccode/step2/claude-code-reverse/scripts/ask.js:3) 推断，默认使用Google Gemini)。
        ```shell
        export GOOGLE_GENERATIVE_AI_API_KEY=YOUR_API_KEY
        ```
    2.  执行以下命令，调用 [`scripts/learn-chunks.js`](ccode/step2/claude-code-reverse/scripts/learn-chunks.js:1) 脚本：
        ```shell
        node ccode/step2/claude-code-reverse/scripts/learn-chunks.js
        ```
*   **涉及文件/脚本：**
    *   输入: `ccode/step2/claude-code-reverse/chunks/chunks.$num.mjs` 文件
    *   脚本: [`ccode/step2/claude-code-reverse/scripts/learn-chunks.js`](ccode/step2/claude-code-reverse/scripts/learn-chunks.js:1) (该脚本会调用LLM进行分析)
    *   LLM配置: [`ccode/step2/claude-code-reverse/scripts/llm.js`](ccode/step2/claude-code-reverse/scripts/llm.js:1)
*   **预期产出：**
    *   对于每个 `chunks.$num.mjs` 文件，在 `ccode/step2/claude-code-reverse/chunks/` 目录下生成一个对应的 `chunks.$num.json` 文件。
    *   每个 `.json` 文件包含LLM识别出的信息，格式如下：
        ```json
        {
          "ossProjects": ["$name_1", "$name_2"],
          "purpose": "$description"
        }
        ```
    *   这个步骤会迭代处理所有 `chunks` 目录下的 `.mjs` 文件（除了 `cli.chunks.mjs`）。如果对应的 `.json` 文件已存在，则跳过。

## 5. 依赖校正与代码合并阶段

### 5.1 阶段目标

*   基于LLM的初步识别结果，对开源项目名称进行规范化和修正。
*   将属于同一（修正后）项目的代码块合并成单个文件，以便更好地进行后续分析或排除已知库。

### 5.2 具体步骤

#### 步骤 5.2.1：合并代码块

*   **目标：** 根据 `chunks.$num.json` 中的 `ossProjects` 信息以及 [`scripts/merge-again.js`](ccode/step2/claude-code-reverse/scripts/merge-again.js:9) 中定义的 `manualFixNaming` 规则，将来自同一开源项目的代码块合并。
*   **操作指令 (给AI程序员)：**
    1.  执行以下命令，调用 [`scripts/merge-again.js`](ccode/step2/claude-code-reverse/scripts/merge-again.js:1) 脚本：
        ```shell
        node ccode/step2/claude-code-reverse/scripts/merge-again.js
        ```
*   **涉及文件/脚本：**
    *   输入:
        *   `ccode/step2/claude-code-reverse/chunks/chunks.$num.json` (LLM识别结果)
        *   `ccode/step2/claude-code-reverse/chunks/chunks.$num.mjs` (原始代码块)
    *   脚本: [`ccode/step2/claude-code-reverse/scripts/merge-again.js`](ccode/step2/claude-code-reverse/scripts/merge-again.js:1) (包含 `manualFixNaming` 校正逻辑)
*   **预期产出：**
    *   在 `ccode/step2/claude-code-reverse/merged-chunks/` 目录下生成合并后的项目代码文件，文件名格式为 `$project.mjs` (例如 `react.mjs`, `aws-sdk.mjs`, `claude-code-1.mjs`, ...)。项目名称中的 `/` 会被替换为 `__`。
    *   在 `ccode/step2/claude-code-reverse/merged-chunks/` 目录下生成一个新的索引文件 `chunks.index.json`，记录每个原始 `chunks.$num.json` 文件（代表一个原始代码块）最终被合并到的项目名称。

## 6. Claude Code 自身代码优化阶段

### 6.1 阶段目标

*   针对识别出的 `claude-code-*` 相关代码片段，进一步优化，通过添加注释来指明其中一些混淆变量可能来自哪些外部依赖，以增强LLM对这些核心代码片段的理解。

### 6.2 具体步骤

#### 步骤 6.2.1：为Claude Code片段添加依赖注释

*   **目标：** 分析 `merged-chunks/claude-code-*.mjs` 文件，找出其中可能未定义的变量，并结合之前生成的两层索引 (`chunks/chunks.index.json` 和 `merged-chunks/chunks.index.json`)，推断这些变量最有可能从哪些已识别的OSS项目中导入，并在这些 `claude-code-*.mjs` 文件顶部添加注释。
*   **操作指令 (给AI程序员)：**
    1.  执行以下命令，调用 [`scripts/improve-merged-chunks.js`](ccode/step2/claude-code-reverse/scripts/improve-merged-chunks.js:1) 脚本：
        ```shell
        node ccode/step2/claude-code-reverse/scripts/improve-merged-chunks.js
        ```
*   **涉及文件/脚本：**
    *   输入:
        *   `ccode/step2/claude-code-reverse/merged-chunks/claude-code-*.mjs`
        *   `ccode/step2/claude-code-reverse/chunks/chunks.index.json`
        *   `ccode/step2/claude-code-reverse/merged-chunks/chunks.index.json`
    *   脚本: [`ccode/step2/claude-code-reverse/scripts/improve-merged-chunks.js`](ccode/step2/claude-code-reverse/scripts/improve-merged-chunks.js:1)
*   **预期产出：**
    *   在 `ccode/step2/claude-code-reverse/merged-chunks/` 目录下，为每个 `claude-code-*.mjs` 文件生成一个对应的优化后文件，命名为 `improved-claude-code-*.mjs`。
    *   这些 `improved-` 文件会在顶部包含类似如下的注释：
        ```javascript
        /* Some variables in the code import from the following projects
         * i40, o40, T90, Pj0, t8, rk0, UV1, fD, ac0, h2, n82 import from OSS "aws-sdk"
         * K2, R0, vw, Lb, K4, j0, B41, Pb, w41, A41, pF, I0, I5, t21, gU, Rl1, Ul1, vl1, El1, R51 import from OSS "yoga"
         */
        ```

## 7. 问答与分析阶段 (LLM最终分析)

### 7.1 阶段目标

*   利用LLM和前面阶段处理得到的 `improved-claude-code-*.mjs` 代码片段，回答用户关于 `claude-code` 设计与代码细节的问题。
*   通过迭代处理多个代码片段，逐步累积上下文信息，使得LLM能够综合分析。

### 7.2 具体步骤

#### 步骤 7.2.1：执行问答脚本

*   **目标：** 运行 [`scripts/ask.js`](ccode/step2/claude-code-reverse/scripts/ask.js:1) 脚本，该脚本会提示用户输入问题，然后依次将问题和每个 `improved-claude-code-*.mjs` 片段提交给LLM，并将LLM从前一个片段获得的洞察 (`insight`) 作为上下文传递给下一个片段的分析。
*   **操作指令 (给AI程序员)：**
    1.  确保已配置LLM API Key (同步骤 4.2.2)。
    2.  执行以下命令，调用 [`scripts/ask.js`](ccode/step2/claude-code-reverse/scripts/ask.js:1) 脚本：
        ```shell
        node ccode/step2/claude-code-reverse/scripts/ask.js
        ```
    3.  脚本启动后，会在命令行提示输入问题，例如:
        `Enter your question about the code:`
    4.  输入你希望AI分析的问题，例如：`Provide a comprehensive overview of Claude Code's code architecture` 或 `What system prompts are defined in Claude Code?`
    5.  脚本会依次处理 `merged-chunks/improved-claude-code-*.mjs` 文件，并将最终的分析结果打印到控制台。
*   **涉及文件/脚本：**
    *   输入:
        *   用户在命令行输入的问题。
        *   `ccode/step2/claude-code-reverse/merged-chunks/improved-claude-code-*.mjs` 文件。
    *   脚本: [`ccode/step2/claude-code-reverse/scripts/ask.js`](ccode/step2/claude-code-reverse/scripts/ask.js:1)
    *   LLM配置: [`ccode/step2/claude-code-reverse/scripts/llm.js`](ccode/step2/claude-code-reverse/scripts/llm.js:1)
*   **预期产出：**
    *   在命令行输出LLM针对用户问题，并结合所有 `improved-claude-code-*.mjs` 片段分析后得出的综合答案。

## 8. （可选）自定义与扩展

AI程序员可以基于以上SOP进行扩展：

*   **修改LLM Provider：** 通过修改 [`scripts/llm.js`](ccode/step2/claude-code-reverse/scripts/llm.js:1) 和相关调用脚本，可以替换为其他Vercel AI SDK支持的LLM提供商。
*   **调整分割阈值：** 在 [`scripts/split.js`](ccode/step2/claude-code-reverse/scripts/split.js:6) 中的 `CHUNK_THRESHOLD` 可以调整，以观察对LLM识别效果的影响。
*   **改进`manualFixNaming`：** [`scripts/merge-again.js`](ccode/step2/claude-code-reverse/scripts/merge-again.js:9) 中的 `manualFixNaming` 函数可以根据新的发现或更精确的规则进行更新。
*   **创建新的分析工具/脚本：** 可以基于现有脚本组合或创建新的脚本，以实现更复杂的分析流程或提取特定类型的信息。例如，可以创建一个脚本自动对所有`claude-code-*`片段进行特定模式的搜索。

## 9. 总结

本SOP提供了一个详细的、可由AI程序员执行的步骤，用于逆向分析 `claude-code` 的混淆代码。通过遵循这些步骤，AI程序员可以系统地处理代码，并利用LLM的能力来理解和分析其内部工作机制。