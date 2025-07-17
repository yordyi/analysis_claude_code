
// @from(Start 8975630, End 8982239)
function xa0() {
  return `Executes a given bash command in a persistent shell session with optional timeout, ensuring proper handling and security measures.

Before executing the command, please follow these steps:

1. Directory Verification:
   - If the command will create new directories or files, first use the LS tool to verify the parent directory exists and is the correct location
   - For example, before running "mkdir foo/bar", first use LS to check that "foo" exists and is the intended parent directory

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
  - Try to maintain your current working directory throughout the session by using absolute paths and avoiding usage of \`cd\`. You may use \`cd\` if the User explicitly requests it.
    <good-example>
    pytest /foo/bar/tests
    </good-example>
    <bad-example>
    cd /foo/bar && pytest tests
    </bad-example>

${nf1()?"## CRITICAL: Accurate Read-Only Prediction\nCarefully determine if commands are read-only for better user experience. You should always set read_only=true for commands that do not modify the filesystem or network. \n\n**Read-Only Commands:** `grep`, `rg`, `find`, `ls`, `cat`, `head`, `tail`, `wc`, `stat`, `ps`, `df`, `du`, `pwd`, `whoami`, `which`, `date`, `history`, `man`\n\n**Git Read-Only:** `git log`, `git show`, `git diff`, `git status`, `git branch` (listing only), `git config --get`\n\n**Never Read-Only:** Commands with `>` (except to /dev/null or standard output), `$()`, `$VAR`, dangerous flags (`git diff --ext-diff`, `sort -o`, `npm audit --fix`), `git branch -D`":""}

${PG1()?`# Using sandbox mode for commands

You have a special option in BashTool: the sandbox parameter. When you run a command with sandbox=true, it runs without approval dialogs but in a restricted environment without filesystem writes or network access. You SHOULD use sandbox=true to optimize user experience, but MUST follow these guidelines exactly.

## RULE 0 (MOST IMPORTANT): retry with sandbox=false for permission/network errors

    If a command fails with permission or any network error when sandbox=true (e.g., "Permission denied", "Unknown host", "Operation not permitted"), ALWAYS retry with sandbox=false. These errors indicate sandbox limitations, not problems with the command itself.

Non-permission errors (e.g., TypeScript errors from tsc --noEmit) usually reflect real issues and should be fixed, not retried with sandbox=false.

## RULE 1: NOTES ON SPECIFIC BUILD SYSTEMS AND UTILITIES

### Build systems

Build systems like npm run build almost always need write access. Test suites also usually need write access. NEVER run build or test commands in sandbox, even if just checking types.

These commands REQUIRE sandbox=false (non-exhaustive):
npm run *,  cargo build/test,  make/ninja/meson,  pytest,  jest,  gh

## RULE 2: TRY sandbox=true FOR COMMANDS THAT DON'T NEED WRITE OR NETWORK ACCESS
  - Commands run with sandbox=true DON'T REQUIRE user permission and run immediately
  - Commands run with sandbox=false REQUIRE EXPLICIT USER APPROVAL and interrupt the User's workflow

Use sandbox=false when you suspect the command might modify the system or access the network:
  - File operations: touch, mkdir, rm, mv, cp
  - File edits: nano, vim, writing to files with >
  - Installing: npm install, apt-get, brew
  - Git writes: git add, git commit, git push
  - Build systems:  npm run build, make, ninja, etc. (see below)
  - Test suites: npm run test, pytest, cargo test, make check, ert, etc. (see below)
  - Network programs: gh, ping, coo, ssh, scp, etc.

Use sandbox=true for:
  - Information gathering: ls, cat, head, tail, rg, find, du, df, ps
  - File inspection: file, stat, wc, diff, md5sum
  - Git reads: git status, git log, git diff, git show, git branch
  - Package info: npm list, pip list, gem list, cargo tree
  - Environment checks: echo, pwd, whoami, which, type, env, printenv
  - Version checks: node --version, python --version, git --version
  - Documentation: man, help, --help, -h

Before you run a command, think hard about whether it is likely to work correctly without network access and without write access to the filesystem. Use your general knowledge and knowledge of the current project (including all the user's CLAUDE.md files) as inputs to your decision. Note that even semantically read-only commands like gh for fetching issues might be implemented in ways that require write access. ERR ON THE SIDE OF RUNNING WITH sandbox=false.

Note: Errors from incorrect sandbox=true runs annoy the User more than permission prompts. If any part of a command needs write access (e.g. npm run build for type checking), use sandbox=false for the entire command.

### EXAMPLES

CORRECT: Use sandbox=false for npm run build/test, gh commands, file writes
FORBIDDEN: NEVER use sandbox=true for build, test, git commands or file operations

## REWARDS

It is more important to be correct than to avoid showing permission dialogs. The worst mistake is misinterpreting sandbox=true permission errors as tool problems (-$1000) rather than sandbox limitations.

## CONCLUSION

Use sandbox=true to improve UX, but ONLY per the rules above. WHEN IN DOUBT, USE sandbox=false.
`:""}
${HL6()}`
}
// @from(Start 8982241, End 8987353)
function HL6() {
  let {
    commit: B,
    pr: Q
  } = KL6();
  return `# Committing changes with git

When the user asks you to create a new git commit, follow these steps carefully:

1. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following bash commands in parallel, each using the ${ZK} tool:
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
   - Create the commit with a message${B?` ending with:
   ${B}`:"."}
   - Run git status to make sure the commit succeeded.
4. If the commit fails due to pre-commit hook changes, retry the commit ONCE to include these automated changes. If it fails again, it usually means a pre-commit hook is preventing the commit. If the commit succeeds but you notice that files were modified by the pre-commit hook, you MUST amend your commit to include them.

Important notes:
- NEVER update the git config
- NEVER run additional commands to read or explore code, besides git bash commands
- NEVER use the ${yG.name} or ${cX} tools
- DO NOT push to the remote repository unless the user explicitly asks you to do so
- IMPORTANT: Never use git commands with the -i flag (like git rebase -i or git add -i) since they require interactive input which is not supported.
- If there are no changes to commit (i.e., no untracked files and no modifications), do not create an empty commit
- In order to ensure good formatting, ALWAYS pass the commit message via a HEREDOC, a la this example:
<example>
git commit -m "$(cat <<'EOF'
   Commit message here.${B?`

   ${B}`:""}
   EOF
   )"
</example>

# Creating pull requests
Use the gh command via the Bash tool for ALL GitHub-related tasks including working with issues, pull requests, checks, and releases. If given a Github URL use the gh command to get the information needed.

IMPORTANT: When the user asks you to create a pull request, follow these steps carefully:

1. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following bash commands in parallel using the ${ZK} tool, in order to understand the current state of the branch since it diverged from the main branch:
   - Run a git status command to see all untracked files
   - Run a git diff command to see both staged and unstaged changes that will be committed
   - Check if the current branch tracks a remote branch and is up to date with the remote, so you know if you need to push to the remote
   - Run a git log command and \`git diff [base-branch]...HEAD\` to understand the full commit history for the current branch (from the time it diverged from the base branch)
2. Analyze all changes that will be included in the pull request, making sure to look at all relevant commits (NOT just the latest commit, but ALL commits that will be included in the pull request!!!), and draft a pull request summary
3. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following commands in parallel:
   - Create new branch if needed
   - Push to remote with -u flag if needed
   - Create PR using gh pr create with the format below. Use a HEREDOC to pass the body to ensure correct formatting.
<example>
gh pr create --title "the pr title" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Test plan
[Checklist of TODOs for testing the pull request...]${Q?`

${Q}`:""}
EOF
)"
</example>

Important:
- NEVER update the git config
- DO NOT use the ${yG.name} or ${cX} tools
- Return the PR URL when you're done, so the user can see it

# Other common operations
- View comments on a Github PR: gh api repos/foo/bar/pulls/123/comments`
}
// @from(Start 8987355, End 8987384)
function Um() {
  return !1
}
// @from(Start 8987386, End 8987416)
function fa0() {
  return ""
}
// @from(Start 8987418, End 8987499)
function ga0() {
  return `You are ${m0}, Anthropic's official CLI for Claude.`
}
// @from(Start 8987504, End 8987752)
va0 = "IMPORTANT: Assist with defensive security tasks only. Refuse to create, modify, or improve code that may be used maliciously. Allow security analysis, detection rules, vulnerability explanations, defensive tools, and security documentation."
// @from(Start 8987756, End 8987810)
ba0 = "https://docs.anthropic.com/en/docs/claude-code"
// @from(Start 8987814, End 8988374)
zL6 = "The available sub-pages are `overview`, `quickstart`, `memory` (Memory management and CLAUDE.md), `common-workflows` (Extended thinking, pasting images, --resume), `ide-integrations`, `mcp`, `github-actions`, `sdk`, `troubleshooting`, `third-party-integrations`, `amazon-bedrock`, `google-vertex-ai`, `corporate-proxy`, `llm-gateway`, `devcontainer`, `iam` (auth, permissions), `security`, `monitoring-usage` (OTel), `costs`, `cli-reference`, `interactive-mode` (keyboard shortcuts), `slash-commands`, `settings` (settings json files, env vars, tools)."
// @from(Start 8988378, End 8988407)
wL6 = {
    subpages: zL6
  }
// @from(Start 8988409, End 8999952)
async function yj(A, B, Q, I) {
  let G = new Set(A.map((D) => D.name)),
    Z = await xC("claude_code_docs_config", wL6);
  return [`
You are an interactive CLI tool that helps users with software engineering tasks. Use the instructions below and the tools available to you to assist the user.

${va0}
IMPORTANT: You must NEVER generate or guess URLs for the user unless you are confident that the URLs are for helping the user with programming. You may use URLs provided by the user in their messages or local files.

If the user asks for help or wants to give feedback inform them of the following: 
- /help: Get help with using ${m0}
- To give feedback, users should ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.ISSUES_EXPLAINER}

When the user directly asks about ${m0} (eg 'can ${m0} do...', 'does ${m0} have...') or asks in second person (eg 'are you able...', 'can you do...'), first use the ${IJ1} tool to gather information to answer the question from ${m0} docs at ${ba0}.
  - ${Z.subpages}
  - Example: ${ba0}/cli-usage

# Tone and style
You should be concise, direct, and to the point. When you run a non-trivial bash command, you should explain what the command does and why you are running it, to make sure the user understands what you are doing (this is especially important when you are running a command that will make changes to the user's system).
Remember that your output will be displayed on a command line interface. Your responses can use Github-flavored markdown for formatting, and will be rendered in a monospace font using the CommonMark specification.
Output text to communicate with the user; all text you output outside of tool use is displayed to the user. Only use tools to complete tasks. Never use tools like ${ZK} or code comments as means to communicate with the user during the session.
If you cannot or will not help the user with something, please do not say why or what it could lead to, since this comes across as preachy and annoying. Please offer helpful alternatives if possible, and otherwise keep your response to 1-2 sentences.
Only use emojis if the user explicitly requests it. Avoid using emojis in all communication unless asked.
IMPORTANT: You should minimize output tokens as much as possible while maintaining helpfulness, quality, and accuracy. Only address the specific query or task at hand, avoiding tangential information unless absolutely critical for completing the request. If you can answer in 1-3 sentences or a short paragraph, please do.
IMPORTANT: You should NOT answer with unnecessary preamble or postamble (such as explaining your code or summarizing your action), unless the user asks you to.
IMPORTANT: Keep your responses short, since they will be displayed on a command line interface. You MUST answer concisely with fewer than 4 lines (not including tool use or code generation), unless user asks for detail. Answer the user's question directly, without elaboration, explanation, or details. One word answers are best. Avoid introductions, conclusions, and explanations. You MUST avoid text before/after your response, such as "The answer is <answer>.", "Here is the content of the file..." or "Based on the information provided, the answer is..." or "Here is what I will do next...". Here are some examples to demonstrate appropriate verbosity:
<example>
user: 2 + 2
assistant: 4
</example>

<example>
user: what is 2+2?
assistant: 4
</example>

<example>
user: is 11 a prime number?
assistant: Yes
</example>

<example>
user: what command should I run to list files in the current directory?
assistant: ls
</example>

<example>
user: what command should I run to watch files in the current directory?
assistant: [use the ls tool to list the files in the current directory, then read docs/commands in the relevant file to find out how to watch files]
npm run dev
</example>

<example>
user: How many golf balls fit inside a jetta?
assistant: 150000
</example>

<example>
user: what files are in the directory src/?
assistant: [runs ls and sees foo.c, bar.c, baz.c]
user: which file contains the implementation of foo?
assistant: src/foo.c
</example>

<example>
user: write tests for new feature
assistant: [uses grep and glob search tools to find where similar tests are defined, uses concurrent read file tool use blocks in one tool call to read relevant files at the same time, uses edit file tool to write new tests]
</example>

# Proactiveness
You are allowed to be proactive, but only when the user asks you to do something. You should strive to strike a balance between:
1. Doing the right thing when asked, including taking actions and follow-up actions
2. Not surprising the user with actions you take without asking
For example, if the user asks you how to approach something, you should do your best to answer their question first, and not immediately jump into taking actions.
3. Do not add additional code explanation summary unless requested by the user. After working on a file, just stop, rather than providing an explanation of what you did.

# Following conventions
When making changes to files, first understand the file's code conventions. Mimic code style, use existing libraries and utilities, and follow existing patterns.
- NEVER assume that a given library is available, even if it is well known. Whenever you write code that uses a library or framework, first check that this codebase already uses the given library. For example, you might look at neighboring files, or check the package.json (or cargo.toml, and so on depending on the language).
- When you create a new component, first look at existing components to see how they're written; then consider framework choice, naming conventions, typing, and other conventions.
- When you edit a piece of code, first look at the code's surrounding context (especially its imports) to understand the code's choice of frameworks and libraries. Then consider how to make the given change in a way that is most idiomatic.
- Always follow security best practices. Never introduce code that exposes or logs secrets and keys. Never commit secrets or keys to the repository.

# Code style
- IMPORTANT: DO NOT ADD ***ANY*** COMMENTS unless asked


${G.has(yG.name)||G.has(oN.name)?`# Task Management
You have access to the ${yG.name} and ${oN.name} tools to help you manage and plan tasks. Use these tools VERY frequently to ensure that you are tracking your tasks and giving the user visibility into your progress.
These tools are also EXTREMELY helpful for planning tasks, and for breaking down larger complex tasks into smaller steps. If you do not use this tool when planning, you may forget to do important tasks - and that is unacceptable.

It is critical that you mark todos as completed as soon as you are done with a task. Do not batch up multiple tasks before marking them as completed.

Examples:

<example>
user: Run the build and fix any type errors
assistant: I'm going to use the ${yG.name} tool to write the following items to the todo list: 
- Run the build
- Fix any type errors

I'm now going to run the build using ${ZK}.

Looks like I found 10 type errors. I'm going to use the ${yG.name} tool to write 10 items to the todo list.

marking the first todo as in_progress

Let me start working on the first item...

The first item has been fixed, let me mark the first todo as completed, and move on to the second item...
..
..
</example>
In the above example, the assistant completes all the tasks, including the 10 error fixes and running the build and fixing all errors.

<example>
user: Help me write a new feature that allows users to track their usage metrics and export them to various formats

assistant: I'll help you implement a usage metrics tracking and export feature. Let me first use the ${yG.name} tool to plan this task.
Adding the following todos to the todo list:
1. Research existing metrics tracking in the codebase
2. Design the metrics collection system
3. Implement core metrics tracking functionality
4. Create export functionality for different formats

Let me start by researching the existing codebase to understand what metrics we might already be tracking and how we can build on that.

I'm going to search for any existing metrics or telemetry code in the project.

I've found some existing telemetry code. Let me mark the first todo as in_progress and start designing our metrics tracking system based on what I've learned...

[Assistant continues implementing the feature step by step, marking todos as in_progress and completed as they go]
</example>
`:""}

false

# Doing tasks
The user will primarily request you perform software engineering tasks. This includes solving bugs, adding new functionality, refactoring code, explaining code, and more. For these tasks the following steps are recommended:
- ${G.has(yG.name)||G.has(oN.name)?`Use the ${yG.name} tool to plan the task if required`:""}
- Use the available search tools to understand the codebase and the user's query. You are encouraged to use the search tools extensively both in parallel and sequentially.
- Implement the solution using all tools available to you
- Verify the solution if possible with tests. NEVER assume specific test framework or test script. Check the README or search codebase to determine the testing approach.
- VERY IMPORTANT: When you have completed a task, you MUST run the lint and typecheck commands (eg. npm run lint, npm run typecheck, ruff, etc.) with ${ZK} if they were provided to you to ensure your code is correct. If you are unable to find the correct command, ask the user for the command to run and if they supply it, proactively suggest writing it to CLAUDE.md so that you will know to run it next time.
NEVER commit changes unless the user explicitly asks you to. It is VERY IMPORTANT to only commit when explicitly asked, otherwise the user will feel that you are being too proactive.

- Tool results and user messages may include <system-reminder> tags. <system-reminder> tags contain useful information and reminders. They are NOT part of the user's provided input or the tool result.

${Um()?fa0():""}

# Tool usage policy${G.has(cX)?`
- When doing file search, prefer to use the ${cX} tool in order to reduce context usage.`:""}
- You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. When making multiple bash tool calls, you MUST send a single message with multiple tools calls to run the calls in parallel. For example, if you need to run "git status" and "git diff", send a single message with two tool calls to run the calls in parallel.

You MUST answer concisely with fewer than 4 lines of text (not including tool use or code generation), unless user asks for detail.
`, `
${await ha0(B,I)}`, `
${va0}
`, G.has(yG.name) || G.has(oN.name) ? `
IMPORTANT: Always use the ${yG.name} tool to plan and track tasks throughout the conversation.` : "", (Q && Q.length > 0, ""), `
# Code References

When referencing specific functions or pieces of code include the pattern \`file_path:line_number\` to allow the user to easily navigate to the source code location.

<example>
user: Where are errors from the client handled?
assistant: Clients are marked as failed in the \`connectToServer\` function in src/services/process.ts:712.
</example>
`]
}
// @from(Start 8999953, End 9000511)
async function ha0(A, B) {
  let [Q, I] = await Promise.all([jz(), EL6()]), G = NdA(A), Z = G ? `You are powered by the model named ${G}. The exact model ID is ${A}.` : `You are powered by the model ${A}.`, D = B && B.length > 0 ? `Additional working directories: ${B.join(", ")}
` : "";
  return `Here is useful information about the environment you are running in:
<env>
Working directory: ${dA()}
Is directory a git repo: ${Q?"Yes":"No"}
${D}Platform: ${mA.platform}
OS Version: ${I}
Today's date: ${new Date().toISOString().split("T")[0]}
</env>
${Z}
`
}
// @from(Start 9000512, End 9000704)
async function EL6() {
  try {
    let {
      stdout: A
    } = await u0("uname", ["-sr"], {
      preserveOutputOnError: !1
    });
    return A.trim()
  } catch {
    return "unknown"
  }
}
// @from(Start 9000705, End 9001571)
async function ma0(A, B) {
  return [`You are an agent for ${m0}, Anthropic's official CLI for Claude. Given the user's message, you should use the tools available to complete the task. Do what has been asked; nothing more, nothing less. When you complete the task simply respond with a detailed writeup.

Notes:
- NEVER create files unless they're absolutely necessary for achieving your goal. ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
- In your final response always share relevant file names and code snippets. Any file paths you return in your response MUST be absolute. Do NOT use relative paths.
- For clear communication with the user the assistant MUST avoid using emojis.`, `
${await ha0(A,B)}`]
}
// @from(Start 9001576, End 9001641)
ua0 = Symbol("Let zodToJsonSchema decide on which parser to use")
// @from(Start 9001647, End 9002281)
da0 = {
    name: void 0,
    $refStrategy: "root",
    basePath: ["#"],
    effectStrategy: "input",
    pipeStrategy: "all",
    dateStrategy: "format:date-time",
    mapStrategy: "entries",
    removeAdditionalStrategy: "passthrough",
    allowedAdditionalProperties: !0,
    rejectedAdditionalProperties: !1,
    definitionPath: "definitions",
    target: "jsonSchema7",
    strictUnions: !1,
    definitions: {},
    errorMessages: !1,
    markdownDescription: !1,
    patternStrategy: "escape",
    applyRegexFlags: !1,
    emailStrategy: "format:email",
    base64Strategy: "contentEncoding:base64",
    nameStrategy: "ref"
  }
// @from(Start 9002285, End 9002380)
pa0 = (A) => typeof A === "string" ? {
    ...da0,
    name: A
  } : {
    ...da0,
    ...A
  }
// @from(Start 9002386, End 9002753)
ca0 = (A) => {
  let B = pa0(A),
    Q = B.name !== void 0 ? [...B.basePath, B.definitionPath, B.name] : B.basePath;
  return {
    ...B,
    currentPath: Q,
    propertyPath: void 0,
    seen: new Map(Object.entries(B.definitions).map(([I, G]) => [G._def, {
      def: G._def,
      path: [...B.basePath, B.definitionPath, I],
      jsonSchema: void 0
    }]))
  }
}
// @from(Start 9002756, End 9002883)
function hc1(A, B, Q, I) {
  if (!I?.errorMessages) return;
  if (Q) A.errorMessage = {
    ...A.errorMessage,
    [B]: Q
  }
}
// @from(Start 9002885, End 9002943)
function u6(A, B, Q, I, G) {
  A[B] = Q, hc1(A, B, I, G)
}
// @from(Start 9002945, End 9002975)
function la0() {
  return {}
}
// @from(Start 9002977, End 9003509)
function ia0(A, B) {
  let Q = {
    type: "array"
  };
  if (A.type?._def && A.type?._def?.typeName !== R0.ZodAny) Q.items = B4(A.type._def, {
    ...B,
    currentPath: [...B.currentPath, "items"]
  });
  if (A.minLength) u6(Q, "minItems", A.minLength.value, A.minLength.message, B);
  if (A.maxLength) u6(Q, "maxItems", A.maxLength.value, A.maxLength.message, B);
  if (A.exactLength) u6(Q, "minItems", A.exactLength.value, A.exactLength.message, B), u6(Q, "maxItems", A.exactLength.value, A.exactLength.message, B);
  return Q
}
// @from(Start 9003511, End 9004394)
function na0(A, B) {
  let Q = {
    type: "integer",
    format: "int64"
  };
  if (!A.checks) return Q;
  for (let I of A.checks) switch (I.kind) {
    case "min":
      if (B.target === "jsonSchema7")
        if (I.inclusive) u6(Q, "minimum", I.value, I.message, B);
        else u6(Q, "exclusiveMinimum", I.value, I.message, B);
      else {
        if (!I.inclusive) Q.exclusiveMinimum = !0;
        u6(Q, "minimum", I.value, I.message, B)
      }
      break;
    case "max":
      if (B.target === "jsonSchema7")
        if (I.inclusive) u6(Q, "maximum", I.value, I.message, B);
        else u6(Q, "exclusiveMaximum", I.value, I.message, B);
      else {
        if (!I.inclusive) Q.exclusiveMaximum = !0;
        u6(Q, "maximum", I.value, I.message, B)
      }
      break;
    case "multipleOf":
      u6(Q, "multipleOf", I.value, I.message, B);
      break
  }
  return Q
}
// @from(Start 9004396, End 9004449)
function aa0() {
  return {
    type: "boolean"
  }
}
// @from(Start 9004451, End 9004501)
function HJ1(A, B) {
  return B4(A.type._def, B)
}
// @from(Start 9004506, End 9004558)
sa0 = (A, B) => {
  return B4(A.innerType._def, B)
}
// @from(Start 9004561, End 9004961)
function mc1(A, B, Q) {
  let I = Q ?? B.dateStrategy;
  if (Array.isArray(I)) return {
    anyOf: I.map((G, Z) => mc1(A, B, G))
  };
  switch (I) {
    case "string":
    case "format:date-time":
      return {
        type: "string", format: "date-time"
      };
    case "format:date":
      return {
        type: "string", format: "date"
      };
    case "integer":
      return UL6(A, B)
  }
}
// @from(Start 9004966, End 9005298)
UL6 = (A, B) => {
  let Q = {
    type: "integer",
    format: "unix-time"
  };
  if (B.target === "openApi3") return Q;
  for (let I of A.checks) switch (I.kind) {
    case "min":
      u6(Q, "minimum", I.value, I.message, B);
      break;
    case "max":
      u6(Q, "maximum", I.value, I.message, B);
      break
  }
  return Q
}
// @from(Start 9005301, End 9005400)
function ra0(A, B) {
  return {
    ...B4(A.innerType._def, B),
    default: A.defaultValue()
  }
}
// @from(Start 9005402, End 9005490)
function oa0(A, B) {
  return B.effectStrategy === "input" ? B4(A.schema._def, B) : {}
}
// @from(Start 9005492, End 9005577)
function ta0(A) {
  return {
    type: "string",
    enum: Array.from(A.values)
  }
}
// @from(Start 9005582, End 9005673)
NL6 = (A) => {
  if ("type" in A && A.type === "string") return !1;
  return "allOf" in A
}
// @from(Start 9005676, End 9006437)
function ea0(A, B) {
  let Q = [B4(A.left._def, {
      ...B,
      currentPath: [...B.currentPath, "allOf", "0"]
    }), B4(A.right._def, {
      ...B,
      currentPath: [...B.currentPath, "allOf", "1"]
    })].filter((Z) => !!Z),
    I = B.target === "jsonSchema2019-09" ? {
      unevaluatedProperties: !1
    } : void 0,
    G = [];
  return Q.forEach((Z) => {
    if (NL6(Z)) {
      if (G.push(...Z.allOf), Z.unevaluatedProperties === void 0) I = void 0
    } else {
      let D = Z;
      if ("additionalProperties" in Z && Z.additionalProperties === !1) {
        let {
          additionalProperties: Y,
          ...W
        } = Z;
        D = W
      } else I = void 0;
      G.push(D)
    }
  }), G.length ? {
    allOf: G,
    ...I
  } : void 0
}
// @from(Start 9006439, End 9006815)
function As0(A, B) {
  let Q = typeof A.value;
  if (Q !== "bigint" && Q !== "number" && Q !== "boolean" && Q !== "string") return {
    type: Array.isArray(A.value) ? "array" : "object"
  };
  if (B.target === "openApi3") return {
    type: Q === "bigint" ? "integer" : Q,
    enum: [A.value]
  };
  return {
    type: Q === "bigint" ? "integer" : Q,
    const: A.value
  }
}
// @from(Start 9006820, End 9006832)
dc1 = void 0
// @from(Start 9006836, End 9008948)
DK = {
    cuid: /^[cC][^\s-]{8,}$/,
    cuid2: /^[0-9a-z]+$/,
    ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
    email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
    emoji: () => {
      if (dc1 === void 0) dc1 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
      return dc1
    },
    uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
    ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
    ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    nanoid: /^[a-zA-Z0-9_-]{21}$/,
    jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
  }
// @from(Start 9008951, End 9012245)
function zJ1(A, B) {
  let Q = {
    type: "string"
  };
  if (A.checks)
    for (let I of A.checks) switch (I.kind) {
      case "min":
        u6(Q, "minLength", typeof Q.minLength === "number" ? Math.max(Q.minLength, I.value) : I.value, I.message, B);
        break;
      case "max":
        u6(Q, "maxLength", typeof Q.maxLength === "number" ? Math.min(Q.maxLength, I.value) : I.value, I.message, B);
        break;
      case "email":
        switch (B.emailStrategy) {
          case "format:email":
            YK(Q, "email", I.message, B);
            break;
          case "format:idn-email":
            YK(Q, "idn-email", I.message, B);
            break;
          case "pattern:zod":
            vD(Q, DK.email, I.message, B);
            break
        }
        break;
      case "url":
        YK(Q, "uri", I.message, B);
        break;
      case "uuid":
        YK(Q, "uuid", I.message, B);
        break;
      case "regex":
        vD(Q, I.regex, I.message, B);
        break;
      case "cuid":
        vD(Q, DK.cuid, I.message, B);
        break;
      case "cuid2":
        vD(Q, DK.cuid2, I.message, B);
        break;
      case "startsWith":
        vD(Q, RegExp(`^${uc1(I.value,B)}`), I.message, B);
        break;
      case "endsWith":
        vD(Q, RegExp(`${uc1(I.value,B)}$`), I.message, B);
        break;
      case "datetime":
        YK(Q, "date-time", I.message, B);
        break;
      case "date":
        YK(Q, "date", I.message, B);
        break;
      case "time":
        YK(Q, "time", I.message, B);
        break;
      case "duration":
        YK(Q, "duration", I.message, B);
        break;
      case "length":
        u6(Q, "minLength", typeof Q.minLength === "number" ? Math.max(Q.minLength, I.value) : I.value, I.message, B), u6(Q, "maxLength", typeof Q.maxLength === "number" ? Math.min(Q.maxLength, I.value) : I.value, I.message, B);
        break;
      case "includes": {
        vD(Q, RegExp(uc1(I.value, B)), I.message, B);
        break
      }
      case "ip": {
        if (I.version !== "v6") YK(Q, "ipv4", I.message, B);
        if (I.version !== "v4") YK(Q, "ipv6", I.message, B);
        break
      }
      case "base64url":
        vD(Q, DK.base64url, I.message, B);
        break;
      case "jwt":
        vD(Q, DK.jwt, I.message, B);
        break;
      case "cidr": {
        if (I.version !== "v6") vD(Q, DK.ipv4Cidr, I.message, B);
        if (I.version !== "v4") vD(Q, DK.ipv6Cidr, I.message, B);
        break
      }
      case "emoji":
        vD(Q, DK.emoji(), I.message, B);
        break;
      case "ulid": {
        vD(Q, DK.ulid, I.message, B);
        break
      }
      case "base64": {
        switch (B.base64Strategy) {
          case "format:binary": {
            YK(Q, "binary", I.message, B);
            break
          }
          case "contentEncoding:base64": {
            u6(Q, "contentEncoding", "base64", I.message, B);
            break
          }
          case "pattern:zod": {
            vD(Q, DK.base64, I.message, B);
            break
          }
        }
        break
      }
      case "nanoid":
        vD(Q, DK.nanoid, I.message, B);
      case "toLowerCase":
      case "toUpperCase":
      case "trim":
        break;
      default:
        ((G) => {})(I)
    }
  return Q
}
// @from(Start 9012247, End 9012322)
function uc1(A, B) {
  return B.patternStrategy === "escape" ? qL6(A) : A
}
// @from(Start 9012327, End 9012404)
$L6 = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789")
// @from(Start 9012407, End 9012543)
function qL6(A) {
  let B = "";
  for (let Q = 0; Q < A.length; Q++) {
    if (!$L6.has(A[Q])) B += "\\";
    B += A[Q]
  }
  return B
}
// @from(Start 9012545, End 9013220)
function YK(A, B, Q, I) {
  if (A.format || A.anyOf?.some((G) => G.format)) {
    if (!A.anyOf) A.anyOf = [];
    if (A.format) {
      if (A.anyOf.push({
          format: A.format,
          ...A.errorMessage && I.errorMessages && {
            errorMessage: {
              format: A.errorMessage.format
            }
          }
        }), delete A.format, A.errorMessage) {
        if (delete A.errorMessage.format, Object.keys(A.errorMessage).length === 0) delete A.errorMessage
      }
    }
    A.anyOf.push({
      format: B,
      ...Q && I.errorMessages && {
        errorMessage: {
          format: Q
        }
      }
    })
  } else u6(A, "format", B, Q, I)
}
// @from(Start 9013222, End 9013925)
function vD(A, B, Q, I) {
  if (A.pattern || A.allOf?.some((G) => G.pattern)) {
    if (!A.allOf) A.allOf = [];
    if (A.pattern) {
      if (A.allOf.push({
          pattern: A.pattern,
          ...A.errorMessage && I.errorMessages && {
            errorMessage: {
              pattern: A.errorMessage.pattern
            }
          }
        }), delete A.pattern, A.errorMessage) {
        if (delete A.errorMessage.pattern, Object.keys(A.errorMessage).length === 0) delete A.errorMessage
      }
    }
    A.allOf.push({
      pattern: Bs0(B, I),
      ...Q && I.errorMessages && {
        errorMessage: {
          pattern: Q
        }
      }
    })
  } else u6(A, "pattern", Bs0(B, I), Q, I)
}
// @from(Start 9013927, End 9015365)
function Bs0(A, B) {
  if (!B.applyRegexFlags || !A.flags) return A.source;
  let Q = {
      i: A.flags.includes("i"),
      m: A.flags.includes("m"),
      s: A.flags.includes("s")
    },
    I = Q.i ? A.source.toLowerCase() : A.source,
    G = "",
    Z = !1,
    D = !1,
    Y = !1;
  for (let W = 0; W < I.length; W++) {
    if (Z) {
      G += I[W], Z = !1;
      continue
    }
    if (Q.i) {
      if (D) {
        if (I[W].match(/[a-z]/)) {
          if (Y) G += I[W], G += `${I[W-2]}-${I[W]}`.toUpperCase(), Y = !1;
          else if (I[W + 1] === "-" && I[W + 2]?.match(/[a-z]/)) G += I[W], Y = !0;
          else G += `${I[W]}${I[W].toUpperCase()}`;
          continue
        }
      } else if (I[W].match(/[a-z]/)) {
        G += `[${I[W]}${I[W].toUpperCase()}]`;
        continue
      }
    }
    if (Q.m) {
      if (I[W] === "^") {
        G += `(^|(?<=[\r
]))`;
        continue
      } else if (I[W] === "$") {
        G += `($|(?=[\r
]))`;
        continue
      }
    }
    if (Q.s && I[W] === ".") {
      G += D ? `${I[W]}\r
` : `[${I[W]}\r
]`;
      continue
    }
    if (G += I[W], I[W] === "\\") Z = !0;
    else if (D && I[W] === "]") D = !1;
    else if (!D && I[W] === "[") D = !0
  }
  try {
    new RegExp(G)
  } catch {
    return console.warn(`Could not convert regex pattern at ${B.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), A.source
  }
  return G
}
// @from(Start 9015367, End 9016810)
function wJ1(A, B) {
  if (B.target === "openAi") console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
  if (B.target === "openApi3" && A.keyType?._def.typeName === R0.ZodEnum) return {
    type: "object",
    required: A.keyType._def.values,
    properties: A.keyType._def.values.reduce((I, G) => ({
      ...I,
      [G]: B4(A.valueType._def, {
        ...B,
        currentPath: [...B.currentPath, "properties", G]
      }) ?? {}
    }), {}),
    additionalProperties: B.rejectedAdditionalProperties
  };
  let Q = {
    type: "object",
    additionalProperties: B4(A.valueType._def, {
      ...B,
      currentPath: [...B.currentPath, "additionalProperties"]
    }) ?? B.allowedAdditionalProperties
  };
  if (B.target === "openApi3") return Q;
  if (A.keyType?._def.typeName === R0.ZodString && A.keyType._def.checks?.length) {
    let {
      type: I,
      ...G
    } = zJ1(A.keyType._def, B);
    return {
      ...Q,
      propertyNames: G
    }
  } else if (A.keyType?._def.typeName === R0.ZodEnum) return {
    ...Q,
    propertyNames: {
      enum: A.keyType._def.values
    }
  };
  else if (A.keyType?._def.typeName === R0.ZodBranded && A.keyType._def.type._def.typeName === R0.ZodString && A.keyType._def.type._def.checks?.length) {
    let {
      type: I,
      ...G
    } = HJ1(A.keyType._def, B);
    return {
      ...Q,
      propertyNames: G
    }
  }
  return Q
}
// @from(Start 9016812, End 9017273)
function Qs0(A, B) {
  if (B.mapStrategy === "record") return wJ1(A, B);
  let Q = B4(A.keyType._def, {
      ...B,
      currentPath: [...B.currentPath, "items", "items", "0"]
    }) || {},
    I = B4(A.valueType._def, {
      ...B,
      currentPath: [...B.currentPath, "items", "items", "1"]
    }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [Q, I],
      minItems: 2,
      maxItems: 2
    }
  }
}
// @from(Start 9017275, End 9017597)
function Is0(A) {
  let B = A.values,
    I = Object.keys(A.values).filter((Z) => {
      return typeof B[B[Z]] !== "number"
    }).map((Z) => B[Z]),
    G = Array.from(new Set(I.map((Z) => typeof Z)));
  return {
    type: G.length === 1 ? G[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: I
  }
}
// @from(Start 9017599, End 9017644)
function Gs0() {
  return {
    not: {}
  }
}
// @from(Start 9017646, End 9017768)
function Zs0(A) {
  return A.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  }
}
// @from(Start 9017773, End 9017894)
xo = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
}
// @from(Start 9017897, End 9019346)
function Ys0(A, B) {
  if (B.target === "openApi3") return Ds0(A, B);
  let Q = A.options instanceof Map ? Array.from(A.options.values()) : A.options;
  if (Q.every((I) => (I._def.typeName in xo) && (!I._def.checks || !I._def.checks.length))) {
    let I = Q.reduce((G, Z) => {
      let D = xo[Z._def.typeName];
      return D && !G.includes(D) ? [...G, D] : G
    }, []);
    return {
      type: I.length > 1 ? I : I[0]
    }
  } else if (Q.every((I) => I._def.typeName === "ZodLiteral" && !I.description)) {
    let I = Q.reduce((G, Z) => {
      let D = typeof Z._def.value;
      switch (D) {
        case "string":
        case "number":
        case "boolean":
          return [...G, D];
        case "bigint":
          return [...G, "integer"];
        case "object":
          if (Z._def.value === null) return [...G, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return G
      }
    }, []);
    if (I.length === Q.length) {
      let G = I.filter((Z, D, Y) => Y.indexOf(Z) === D);
      return {
        type: G.length > 1 ? G : G[0],
        enum: Q.reduce((Z, D) => {
          return Z.includes(D._def.value) ? Z : [...Z, D._def.value]
        }, [])
      }
    }
  } else if (Q.every((I) => I._def.typeName === "ZodEnum")) return {
    type: "string",
    enum: Q.reduce((I, G) => [...I, ...G._def.values.filter((Z) => !I.includes(Z))], [])
  };
  return Ds0(A, B)
}
// @from(Start 9019351, End 9019691)
Ds0 = (A, B) => {
  let Q = (A.options instanceof Map ? Array.from(A.options.values()) : A.options).map((I, G) => B4(I._def, {
    ...B,
    currentPath: [...B.currentPath, "anyOf", `${G}`]
  })).filter((I) => !!I && (!B.strictUnions || typeof I === "object" && Object.keys(I).length > 0));
  return Q.length ? {
    anyOf: Q
  } : void 0
}
// @from(Start 9019694, End 9020503)
function Ws0(A, B) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(A.innerType._def.typeName) && (!A.innerType._def.checks || !A.innerType._def.checks.length)) {
    if (B.target === "openApi3") return {
      type: xo[A.innerType._def.typeName],
      nullable: !0
    };
    return {
      type: [xo[A.innerType._def.typeName], "null"]
    }
  }
  if (B.target === "openApi3") {
    let I = B4(A.innerType._def, {
      ...B,
      currentPath: [...B.currentPath]
    });
    if (I && "$ref" in I) return {
      allOf: [I],
      nullable: !0
    };
    return I && {
      ...I,
      nullable: !0
    }
  }
  let Q = B4(A.innerType._def, {
    ...B,
    currentPath: [...B.currentPath, "anyOf", "0"]
  });
  return Q && {
    anyOf: [Q, {
      type: "null"
    }]
  }
}
// @from(Start 9020505, End 9021451)
function Js0(A, B) {
  let Q = {
    type: "number"
  };
  if (!A.checks) return Q;
  for (let I of A.checks) switch (I.kind) {
    case "int":
      Q.type = "integer", hc1(Q, "type", I.message, B);
      break;
    case "min":
      if (B.target === "jsonSchema7")
        if (I.inclusive) u6(Q, "minimum", I.value, I.message, B);
        else u6(Q, "exclusiveMinimum", I.value, I.message, B);
      else {
        if (!I.inclusive) Q.exclusiveMinimum = !0;
        u6(Q, "minimum", I.value, I.message, B)
      }
      break;
    case "max":
      if (B.target === "jsonSchema7")
        if (I.inclusive) u6(Q, "maximum", I.value, I.message, B);
        else u6(Q, "exclusiveMaximum", I.value, I.message, B);
      else {
        if (!I.inclusive) Q.exclusiveMaximum = !0;
        u6(Q, "maximum", I.value, I.message, B)
      }
      break;
    case "multipleOf":
      u6(Q, "multipleOf", I.value, I.message, B);
      break
  }
  return Q
}
// @from(Start 9021453, End 9022190)
function Fs0(A, B) {
  let Q = B.target === "openAi",
    I = {
      type: "object",
      properties: {}
    },
    G = [],
    Z = A.shape();
  for (let Y in Z) {
    let W = Z[Y];
    if (W === void 0 || W._def === void 0) continue;
    let J = LL6(W);
    if (J && Q) {
      if (W instanceof JJ) W = W._def.innerType;
      if (!W.isNullable()) W = W.nullable();
      J = !1
    }
    let F = B4(W._def, {
      ...B,
      currentPath: [...B.currentPath, "properties", Y],
      propertyPath: [...B.currentPath, "properties", Y]
    });
    if (F === void 0) continue;
    if (I.properties[Y] = F, !J) G.push(Y)
  }
  if (G.length) I.required = G;
  let D = ML6(A, B);
  if (D !== void 0) I.additionalProperties = D;
  return I
}
// @from(Start 9022192, End 9022665)
function ML6(A, B) {
  if (A.catchall._def.typeName !== "ZodNever") return B4(A.catchall._def, {
    ...B,
    currentPath: [...B.currentPath, "additionalProperties"]
  });
  switch (A.unknownKeys) {
    case "passthrough":
      return B.allowedAdditionalProperties;
    case "strict":
      return B.rejectedAdditionalProperties;
    case "strip":
      return B.removeAdditionalStrategy === "strict" ? B.allowedAdditionalProperties : B.rejectedAdditionalProperties
  }
}
// @from(Start 9022667, End 9022750)
function LL6(A) {
  try {
    return A.isOptional()
  } catch {
    return !0
  }
}
// @from(Start 9022755, End 9023030)
Xs0 = (A, B) => {
  if (B.currentPath.toString() === B.propertyPath?.toString()) return B4(A.innerType._def, B);
  let Q = B4(A.innerType._def, {
    ...B,
    currentPath: [...B.currentPath, "anyOf", "1"]
  });
  return Q ? {
    anyOf: [{
      not: {}
    }, Q]
  } : {}
}
// @from(Start 9023036, End 9023446)
Vs0 = (A, B) => {
  if (B.pipeStrategy === "input") return B4(A.in._def, B);
  else if (B.pipeStrategy === "output") return B4(A.out._def, B);
  let Q = B4(A.in._def, {
      ...B,
      currentPath: [...B.currentPath, "allOf", "0"]
    }),
    I = B4(A.out._def, {
      ...B,
      currentPath: [...B.currentPath, "allOf", Q ? "1" : "0"]
    });
  return {
    allOf: [Q, I].filter((G) => G !== void 0)
  }
}
// @from(Start 9023449, End 9023499)
function Cs0(A, B) {
  return B4(A.type._def, B)
}
// @from(Start 9023501, End 9023841)
function Ks0(A, B) {
  let I = {
    type: "array",
    uniqueItems: !0,
    items: B4(A.valueType._def, {
      ...B,
      currentPath: [...B.currentPath, "items"]
    })
  };
  if (A.minSize) u6(I, "minItems", A.minSize.value, A.minSize.message, B);
  if (A.maxSize) u6(I, "maxItems", A.maxSize.value, A.maxSize.message, B);
  return I
}
// @from(Start 9023843, End 9024501)
function Hs0(A, B) {
  if (A.rest) return {
    type: "array",
    minItems: A.items.length,
    items: A.items.map((Q, I) => B4(Q._def, {
      ...B,
      currentPath: [...B.currentPath, "items", `${I}`]
    })).reduce((Q, I) => I === void 0 ? Q : [...Q, I], []),
    additionalItems: B4(A.rest._def, {
      ...B,
      currentPath: [...B.currentPath, "additionalItems"]
    })
  };
  else return {
    type: "array",
    minItems: A.items.length,
    maxItems: A.items.length,
    items: A.items.map((Q, I) => B4(Q._def, {
      ...B,
      currentPath: [...B.currentPath, "items", `${I}`]
    })).reduce((Q, I) => I === void 0 ? Q : [...Q, I], [])
  }
}
// @from(Start 9024503, End 9024548)
function zs0() {
  return {
    not: {}
  }
}
// @from(Start 9024550, End 9024580)
function ws0() {
  return {}
}
// @from(Start 9024585, End 9024637)
Es0 = (A, B) => {
  return B4(A.innerType._def, B)
}
// @from(Start 9024643, End 9026331)
Us0 = (A, B, Q) => {
  switch (B) {
    case R0.ZodString:
      return zJ1(A, Q);
    case R0.ZodNumber:
      return Js0(A, Q);
    case R0.ZodObject:
      return Fs0(A, Q);
    case R0.ZodBigInt:
      return na0(A, Q);
    case R0.ZodBoolean:
      return aa0();
    case R0.ZodDate:
      return mc1(A, Q);
    case R0.ZodUndefined:
      return zs0();
    case R0.ZodNull:
      return Zs0(Q);
    case R0.ZodArray:
      return ia0(A, Q);
    case R0.ZodUnion:
    case R0.ZodDiscriminatedUnion:
      return Ys0(A, Q);
    case R0.ZodIntersection:
      return ea0(A, Q);
    case R0.ZodTuple:
      return Hs0(A, Q);
    case R0.ZodRecord:
      return wJ1(A, Q);
    case R0.ZodLiteral:
      return As0(A, Q);
    case R0.ZodEnum:
      return ta0(A);
    case R0.ZodNativeEnum:
      return Is0(A);
    case R0.ZodNullable:
      return Ws0(A, Q);
    case R0.ZodOptional:
      return Xs0(A, Q);
    case R0.ZodMap:
      return Qs0(A, Q);
    case R0.ZodSet:
      return Ks0(A, Q);
    case R0.ZodLazy:
      return () => A.getter()._def;
    case R0.ZodPromise:
      return Cs0(A, Q);
    case R0.ZodNaN:
    case R0.ZodNever:
      return Gs0();
    case R0.ZodEffects:
      return oa0(A, Q);
    case R0.ZodAny:
      return la0();
    case R0.ZodUnknown:
      return ws0();
    case R0.ZodDefault:
      return ra0(A, Q);
    case R0.ZodBranded:
      return HJ1(A, Q);
    case R0.ZodReadonly:
      return Es0(A, Q);
    case R0.ZodCatch:
      return sa0(A, Q);
    case R0.ZodPipeline:
      return Vs0(A, Q);
    case R0.ZodFunction:
    case R0.ZodVoid:
    case R0.ZodSymbol:
      return;
    default:
      return ((I) => {
        return
      })(B)
  }
}
// @from(Start 9026334, End 9026879)
function B4(A, B, Q = !1) {
  let I = B.seen.get(A);
  if (B.override) {
    let Y = B.override?.(A, B, I, Q);
    if (Y !== ua0) return Y
  }
  if (I && !Q) {
    let Y = RL6(I, B);
    if (Y !== void 0) return Y
  }
  let G = {
    def: A,
    path: B.currentPath,
    jsonSchema: void 0
  };
  B.seen.set(A, G);
  let Z = Us0(A, A.typeName, B),
    D = typeof Z === "function" ? B4(Z(), B) : Z;
  if (D) TL6(A, B, D);
  if (B.postProcess) {
    let Y = B.postProcess(D, A, B);
    return G.jsonSchema = D, Y
  }
  return G.jsonSchema = D, D
}
// @from(Start 9026884, End 9027424)
RL6 = (A, B) => {
    switch (B.$refStrategy) {
      case "root":
        return {
          $ref: A.path.join("/")
        };
      case "relative":
        return {
          $ref: OL6(B.currentPath, A.path)
        };
      case "none":
      case "seen": {
        if (A.path.length < B.currentPath.length && A.path.every((Q, I) => B.currentPath[I] === Q)) return console.warn(`Recursive reference detected at ${B.currentPath.join("/")}! Defaulting to any`), {};
        return B.$refStrategy === "seen" ? {} : void 0
      }
    }
  }
// @from(Start 9027428, End 9027606)
OL6 = (A, B) => {
    let Q = 0;
    for (; Q < A.length && Q < B.length; Q++)
      if (A[Q] !== B[Q]) break;
    return [(A.length - Q).toString(), ...B.slice(Q)].join("/")
  }
// @from(Start 9027610, End 9027780)
TL6 = (A, B, Q) => {
    if (A.description) {
      if (Q.description = A.description, B.markdownDescription) Q.markdownDescription = A.description
    }
    return Q
  }
// @from(Start 9027786, End 9029130)
Nm = (A, B) => {
  let Q = ca0(B),
    I = typeof B === "object" && B.definitions ? Object.entries(B.definitions).reduce((W, [J, F]) => ({
      ...W,
      [J]: B4(F._def, {
        ...Q,
        currentPath: [...Q.basePath, Q.definitionPath, J]
      }, !0) ?? {}
    }), {}) : void 0,
    G = typeof B === "string" ? B : B?.nameStrategy === "title" ? void 0 : B?.name,
    Z = B4(A._def, G === void 0 ? Q : {
      ...Q,
      currentPath: [...Q.basePath, Q.definitionPath, G]
    }, !1) ?? {},
    D = typeof B === "object" && B.name !== void 0 && B.nameStrategy === "title" ? B.name : void 0;
  if (D !== void 0) Z.title = D;
  let Y = G === void 0 ? I ? {
    ...Z,
    [Q.definitionPath]: I
  } : Z : {
    $ref: [...Q.$refStrategy === "relative" ? [] : Q.basePath, Q.definitionPath, G].join("/"),
    [Q.definitionPath]: {
      ...I,
      [G]: Z
    }
  };
  if (Q.target === "jsonSchema7") Y.$schema = "http://json-schema.org/draft-07/schema#";
  else if (Q.target === "jsonSchema2019-09" || Q.target === "openAi") Y.$schema = "https://json-schema.org/draft/2019-09/schema#";
  if (Q.target === "openAi" && (("anyOf" in Y) || ("oneOf" in Y) || ("allOf" in Y) || ("type" in Y) && Array.isArray(Y.type))) console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
  return Y
}
// @from(Start 9029224, End 9029643)
function Q4(A, B, Q, I, G) {
  if (I === "m") throw new TypeError("Private method is not writable");
  if (I === "a" && !G) throw new TypeError("Private accessor was defined without a setter");
  if (typeof B === "function" ? A !== B || !G : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return I === "a" ? G.call(A, Q) : G ? G.value = Q : B.set(A, Q), Q
}
// @from(Start 9029645, End 9029993)
function X0(A, B, Q, I) {
  if (Q === "a" && !I) throw new TypeError("Private accessor was defined without a getter");
  if (typeof B === "function" ? A !== B || !I : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return Q === "m" ? I : Q === "a" ? I.call(A) : I ? I.value : B.get(A)
}
// @from(Start 9029998, End 9030349)
pc1 = function() {
  let {
    crypto: A
  } = globalThis;
  if (A?.randomUUID) return pc1 = A.randomUUID.bind(A), A.randomUUID();
  let B = new Uint8Array(1),
    Q = A ? () => A.getRandomValues(B)[0] : () => Math.random() * 255 & 255;
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (I) => (+I ^ Q() & 15 >> +I / 4).toString(16))
}
// @from(Start 9030352, End 9030544)
function tN(A) {
  return typeof A === "object" && A !== null && (("name" in A) && A.name === "AbortError" || ("message" in A) && String(A.message).includes("FetchRequestCanceledException"))
}
// @from(Start 9030549, End 9031076)
fo = (A) => {
  if (A instanceof Error) return A;
  if (typeof A === "object" && A !== null) {
    try {
      if (Object.prototype.toString.call(A) === "[object Error]") {
        let B = new Error(A.message, A.cause ? {
          cause: A.cause
        } : {});
        if (A.stack) B.stack = A.stack;
        if (A.cause && !B.cause) B.cause = A.cause;
        if (A.name) B.name = A.name;
        return B
      }
    } catch {}
    try {
      return new Error(JSON.stringify(A))
    } catch {}
  }
  return new Error(A)
}
// @from(Start 9031078, End 9031103)
class P9 extends Error {}
// @from(Start 9031104, End 9032121)
class p6 extends P9 {
  constructor(A, B, Q, I) {
    super(`${p6.makeMessage(A,B,Q)}`);
    this.status = A, this.headers = I, this.requestID = I?.get("request-id"), this.error = B
  }
  static makeMessage(A, B, Q) {
    let I = B?.message ? typeof B.message === "string" ? B.message : JSON.stringify(B.message) : B ? JSON.stringify(B) : Q;
    if (A && I) return `${A} ${I}`;
    if (A) return `${A} status code (no body)`;
    if (I) return I;
    return "(no status code or body)"
  }
  static generate(A, B, Q, I) {
    if (!A || !I) return new eN({
      message: Q,
      cause: fo(B)
    });
    let G = B;
    if (A === 400) return new bo(A, G, Q, I);
    if (A === 401) return new go(A, G, Q, I);
    if (A === 403) return new ho(A, G, Q, I);
    if (A === 404) return new mo(A, G, Q, I);
    if (A === 409) return new uo(A, G, Q, I);
    if (A === 422) return new po(A, G, Q, I);
    if (A === 429) return new co(A, G, Q, I);
    if (A >= 500) return new lo(A, G, Q, I);
    return new p6(A, G, Q, I)
  }
}
// @from(Start 9032122, End 9032255)
class _I extends p6 {
  constructor({
    message: A
  } = {}) {
    super(void 0, void 0, A || "Request was aborted.", void 0)
  }
}
// @from(Start 9032256, End 9032422)
class eN extends p6 {
  constructor({
    message: A,
    cause: B
  }) {
    super(void 0, void 0, A || "Connection error.", void 0);
    if (B) this.cause = B
  }
}
// @from(Start 9032423, End 9032553)
class vo extends eN {
  constructor({
    message: A
  } = {}) {
    super({
      message: A ?? "Request timed out."
    })
  }
}
// @from(Start 9032554, End 9032576)
class bo extends p6 {}
// @from(Start 9032577, End 9032599)
class go extends p6 {}
// @from(Start 9032600, End 9032622)
class ho extends p6 {}
// @from(Start 9032623, End 9032645)
class mo extends p6 {}
// @from(Start 9032646, End 9032668)
class uo extends p6 {}
// @from(Start 9032669, End 9032691)
class po extends p6 {}
// @from(Start 9032692, End 9032714)
class co extends p6 {}
// @from(Start 9032715, End 9032737)
class lo extends p6 {}
// @from(Start 9032742, End 9032770)
SL6 = /^[a-z][a-z0-9+.-]*:/i
// @from(Start 9032774, End 9032815)
Ns0 = (A) => {
    return SL6.test(A)
  }
// @from(Start 9032818, End 9032894)
function cc1(A) {
  if (typeof A !== "object") return {};
  return A ?? {}
}
// @from(Start 9032896, End 9032978)
function $s0(A) {
  if (!A) return !0;
  for (let B in A) return !1;
  return !0
}
// @from(Start 9032980, End 9033054)
function qs0(A, B) {
  return Object.prototype.hasOwnProperty.call(A, B)
}
// @from(Start 9033059, End 9033245)
Ms0 = (A, B) => {
  if (typeof B !== "number" || !Number.isInteger(B)) throw new P9(`${A} must be an integer`);
  if (B < 0) throw new P9(`${A} must be a positive integer`);
  return B
}
// @from(Start 9033251, End 9033331)
EJ1 = (A) => {
  try {
    return JSON.parse(A)
  } catch (B) {
    return
  }
}
// @from(Start 9033337, End 9033386)
Ls0 = (A) => new Promise((B) => setTimeout(B, A))
// @from(Start 9033392, End 9033476)
NJ1 = {
    off: 0,
    error: 200,
    warn: 300,
    info: 400,
    debug: 500
  }
// @from(Start 9033480, End 9033675)
lc1 = (A, B, Q) => {
    if (!A) return;
    if (qs0(NJ1, A)) return A;
    vZ(Q).warn(`${B} was set to ${JSON.stringify(A)}, expected one of ${JSON.stringify(Object.keys(NJ1))}`);
    return
  }
// @from(Start 9033678, End 9033694)
function io() {}
// @from(Start 9033696, End 9033788)
function UJ1(A, B, Q) {
  if (!B || NJ1[A] > NJ1[Q]) return io;
  else return B[A].bind(B)
}
// @from(Start 9033793, End 9033861)
_L6 = {
    error: io,
    warn: io,
    info: io,
    debug: io
  }
// @from(Start 9033865, End 9033882)
Rs0 = new WeakMap
// @from(Start 9033885, End 9034199)
function vZ(A) {
  let B = A.logger,
    Q = A.logLevel ?? "off";
  if (!B) return _L6;
  let I = Rs0.get(B);
  if (I && I[0] === Q) return I[1];
  let G = {
    error: UJ1("error", B, Q),
    warn: UJ1("warn", B, Q),
    info: UJ1("info", B, Q),
    debug: UJ1("debug", B, Q)
  };
  return Rs0.set(B, [Q, G]), G
}
// @from(Start 9034204, End 9034747)
A$ = (A) => {
  if (A.options) A.options = {
    ...A.options
  }, delete A.options.headers;
  if (A.headers) A.headers = Object.fromEntries((A.headers instanceof Headers ? [...A.headers] : Object.entries(A.headers)).map(([B, Q]) => [B, B.toLowerCase() === "x-api-key" || B.toLowerCase() === "authorization" || B.toLowerCase() === "cookie" || B.toLowerCase() === "set-cookie" ? "***" : Q]));
  if ("retryOfRequestLogID" in A) {
    if (A.retryOfRequestLogID) A.retryOf = A.retryOfRequestLogID;
    delete A.retryOfRequestLogID
  }
  return A
}
// @from(Start 9034753, End 9034766)
lR = "0.51.0"
// @from(Start 9034772, End 9034904)
Ss0 = () => {
  return typeof window !== "undefined" && typeof window.document !== "undefined" && typeof navigator !== "undefined"
}
// @from(Start 9034907, End 9035217)
function jL6() {
  if (typeof Deno !== "undefined" && Deno.build != null) return "deno";
  if (typeof EdgeRuntime !== "undefined") return "edge";
  if (Object.prototype.toString.call(typeof globalThis.process !== "undefined" ? globalThis.process : 0) === "[object process]") return "node";
  return "unknown"
}
// @from(Start 9035222, End 9036718)
yL6 = () => {
  let A = jL6();
  if (A === "deno") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": lR,
    "X-Stainless-OS": Ts0(Deno.build.os),
    "X-Stainless-Arch": Os0(Deno.build.arch),
    "X-Stainless-Runtime": "deno",
    "X-Stainless-Runtime-Version": typeof Deno.version === "string" ? Deno.version : Deno.version?.deno ?? "unknown"
  };
  if (typeof EdgeRuntime !== "undefined") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": lR,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": `other:${EdgeRuntime}`,
    "X-Stainless-Runtime": "edge",
    "X-Stainless-Runtime-Version": globalThis.process.version
  };
  if (A === "node") return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": lR,
    "X-Stainless-OS": Ts0(globalThis.process.platform),
    "X-Stainless-Arch": Os0(globalThis.process.arch),
    "X-Stainless-Runtime": "node",
    "X-Stainless-Runtime-Version": globalThis.process.version
  };
  let B = kL6();
  if (B) return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": lR,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": `browser:${B.browser}`,
    "X-Stainless-Runtime-Version": B.version
  };
  return {
    "X-Stainless-Lang": "js",
    "X-Stainless-Package-Version": lR,
    "X-Stainless-OS": "Unknown",
    "X-Stainless-Arch": "unknown",
    "X-Stainless-Runtime": "unknown",
    "X-Stainless-Runtime-Version": "unknown"
  }
}
// @from(Start 9036721, End 9037605)
function kL6() {
  if (typeof navigator === "undefined" || !navigator) return null;
  let A = [{
    key: "edge",
    pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "ie",
    pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "ie",
    pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "chrome",
    pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "firefox",
    pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
  }, {
    key: "safari",
    pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
  }];
  for (let {
      key: B,
      pattern: Q
    }
    of A) {
    let I = Q.exec(navigator.userAgent);
    if (I) {
      let G = I[1] || 0,
        Z = I[2] || 0,
        D = I[3] || 0;
      return {
        browser: B,
        version: `${G}.${Z}.${D}`
      }
    }
  }
  return null
}
// @from(Start 9037610, End 9037862)
Os0 = (A) => {
    if (A === "x32") return "x32";
    if (A === "x86_64" || A === "x64") return "x64";
    if (A === "arm") return "arm";
    if (A === "aarch64" || A === "arm64") return "arm64";
    if (A) return `other:${A}`;
    return "unknown"
  }
// @from(Start 9037866, End 9038248)
Ts0 = (A) => {
    if (A = A.toLowerCase(), A.includes("ios")) return "iOS";
    if (A === "android") return "Android";
    if (A === "darwin") return "MacOS";
    if (A === "win32") return "Windows";
    if (A === "freebsd") return "FreeBSD";
    if (A === "openbsd") return "OpenBSD";
    if (A === "linux") return "Linux";
    if (A) return `Other:${A}`;
    return "Unknown"
  }
// @from(Start 9038252, End 9038255)
Ps0
// @from(Start 9038257, End 9038306)
_s0 = () => {
    return Ps0 ?? (Ps0 = yL6())
  }
// @from(Start 9038309, End 9038547)
function js0() {
  if (typeof fetch !== "undefined") return fetch;
  throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new Anthropic({ fetch })` or polyfill the global, `globalThis.fetch = fetch`")
}
// @from(Start 9038549, End 9038801)
function ic1(...A) {
  let B = globalThis.ReadableStream;
  if (typeof B === "undefined") throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");
  return new B(...A)
}
// @from(Start 9038803, End 9039145)
function nc1(A) {
  let B = Symbol.asyncIterator in A ? A[Symbol.asyncIterator]() : A[Symbol.iterator]();
  return ic1({
    start() {},
    async pull(Q) {
      let {
        done: I,
        value: G
      } = await B.next();
      if (I) Q.close();
      else Q.enqueue(G)
    },
    async cancel() {
      await B.return?.()
    }
  })
}
// @from(Start 9039147, End 9039631)
function no(A) {
  if (A[Symbol.asyncIterator]) return A;
  let B = A.getReader();
  return {
    async next() {
      try {
        let Q = await B.read();
        if (Q?.done) B.releaseLock();
        return Q
      } catch (Q) {
        throw B.releaseLock(), Q
      }
    },
    async return () {
      let Q = B.cancel();
      return B.releaseLock(), await Q, {
        done: !0,
        value: void 0
      }
    },
    [Symbol.asyncIterator]() {
      return this
    }
  }
}
// @from(Start 9039632, End 9039876)
async function ys0(A) {
  if (A === null || typeof A !== "object") return;
  if (A[Symbol.asyncIterator]) {
    await A[Symbol.asyncIterator]().return?.();
    return
  }
  let B = A.getReader(),
    Q = B.cancel();
  B.releaseLock(), await Q
}
// @from(Start 9039881, End 9040033)
ks0 = ({
  headers: A,
  body: B
}) => {
  return {
    bodyHeaders: {
      "content-type": "application/json"
    },
    body: JSON.stringify(B)
  }
}
// @from(Start 9040036, End 9040200)
function vs0(A) {
  let B = 0;
  for (let G of A) B += G.length;
  let Q = new Uint8Array(B),
    I = 0;
  for (let G of A) Q.set(G, I), I += G.length;
  return Q
}
// @from(Start 9040205, End 9040208)
xs0
// @from(Start 9040211, End 9040316)
function ao(A) {
  let B;
  return (xs0 ?? (B = new globalThis.TextEncoder, xs0 = B.encode.bind(B)))(A)
}
// @from(Start 9040321, End 9040324)
fs0
// @from(Start 9040327, End 9040433)
function ac1(A) {
  let B;
  return (fs0 ?? (B = new globalThis.TextDecoder, fs0 = B.decode.bind(B)))(A)
}
// @from(Start 9040438, End 9040440)
kJ
// @from(Start 9040442, End 9040444)
xJ
// @from(Start 9040446, End 9041604)
class iR {
  constructor() {
    kJ.set(this, void 0), xJ.set(this, void 0), Q4(this, kJ, new Uint8Array, "f"), Q4(this, xJ, null, "f")
  }
  decode(A) {
    if (A == null) return [];
    let B = A instanceof ArrayBuffer ? new Uint8Array(A) : typeof A === "string" ? ao(A) : A;
    Q4(this, kJ, vs0([X0(this, kJ, "f"), B]), "f");
    let Q = [],
      I;
    while ((I = vL6(X0(this, kJ, "f"), X0(this, xJ, "f"))) != null) {
      if (I.carriage && X0(this, xJ, "f") == null) {
        Q4(this, xJ, I.index, "f");
        continue
      }
      if (X0(this, xJ, "f") != null && (I.index !== X0(this, xJ, "f") + 1 || I.carriage)) {
        Q.push(ac1(X0(this, kJ, "f").subarray(0, X0(this, xJ, "f") - 1))), Q4(this, kJ, X0(this, kJ, "f").subarray(X0(this, xJ, "f")), "f"), Q4(this, xJ, null, "f");
        continue
      }
      let G = X0(this, xJ, "f") !== null ? I.preceding - 1 : I.preceding,
        Z = ac1(X0(this, kJ, "f").subarray(0, G));
      Q.push(Z), Q4(this, kJ, X0(this, kJ, "f").subarray(I.index), "f"), Q4(this, xJ, null, "f")
    }
    return Q
  }
  flush() {
    if (!X0(this, kJ, "f").length) return [];
    return this.decode(`
`)
  }
}
// @from(Start 9041719, End 9041994)
function vL6(A, B) {
  for (let G = B ?? 0; G < A.length; G++) {
    if (A[G] === 10) return {
      preceding: G,
      index: G + 1,
      carriage: !1
    };
    if (A[G] === 13) return {
      preceding: G,
      index: G + 1,
      carriage: !0
    }
  }
  return null
}
// @from(Start 9041996, End 9042293)
function bs0(A) {
  for (let I = 0; I < A.length - 1; I++) {
    if (A[I] === 10 && A[I + 1] === 10) return I + 2;
    if (A[I] === 13 && A[I + 1] === 13) return I + 2;
    if (A[I] === 13 && A[I + 1] === 10 && I + 3 < A.length && A[I + 2] === 13 && A[I + 3] === 10) return I + 4
  }
  return -1
}
// @from(Start 9042294, End 9045223)
class bD {
  constructor(A, B) {
    this.iterator = A, this.controller = B
  }
  static fromSSEResponse(A, B) {
    let Q = !1;
    async function* I() {
      if (Q) throw new P9("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      Q = !0;
      let G = !1;
      try {
        for await (let Z of bL6(A, B)) {
          if (Z.event === "completion") try {
            yield JSON.parse(Z.data)
          } catch (D) {
            throw console.error("Could not parse message into JSON:", Z.data), console.error("From chunk:", Z.raw), D
          }
          if (Z.event === "message_start" || Z.event === "message_delta" || Z.event === "message_stop" || Z.event === "content_block_start" || Z.event === "content_block_delta" || Z.event === "content_block_stop") try {
            yield JSON.parse(Z.data)
          } catch (D) {
            throw console.error("Could not parse message into JSON:", Z.data), console.error("From chunk:", Z.raw), D
          }
          if (Z.event === "ping") continue;
          if (Z.event === "error") throw new p6(void 0, EJ1(Z.data) ?? Z.data, void 0, A.headers)
        }
        G = !0
      } catch (Z) {
        if (tN(Z)) return;
        throw Z
      } finally {
        if (!G) B.abort()
      }
    }
    return new bD(I, B)
  }
  static fromReadableStream(A, B) {
    let Q = !1;
    async function* I() {
      let Z = new iR,
        D = no(A);
      for await (let Y of D) for (let W of Z.decode(Y)) yield W;
      for (let Y of Z.flush()) yield Y
    }
    async function* G() {
      if (Q) throw new P9("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      Q = !0;
      let Z = !1;
      try {
        for await (let D of I()) {
          if (Z) continue;
          if (D) yield JSON.parse(D)
        }
        Z = !0
      } catch (D) {
        if (tN(D)) return;
        throw D
      } finally {
        if (!Z) B.abort()
      }
    }
    return new bD(G, B)
  } [Symbol.asyncIterator]() {
    return this.iterator()
  }
  tee() {
    let A = [],
      B = [],
      Q = this.iterator(),
      I = (G) => {
        return {
          next: () => {
            if (G.length === 0) {
              let Z = Q.next();
              A.push(Z), B.push(Z)
            }
            return G.shift()
          }
        }
      };
    return [new bD(() => I(A), this.controller), new bD(() => I(B), this.controller)]
  }
  toReadableStream() {
    let A = this,
      B;
    return ic1({
      async start() {
        B = A[Symbol.asyncIterator]()
      },
      async pull(Q) {
        try {
          let {
            value: I,
            done: G
          } = await B.next();
          if (G) return Q.close();
          let Z = ao(JSON.stringify(I) + `
`);
          Q.enqueue(Z)
        } catch (I) {
          Q.error(I)
        }
      },
      async cancel() {
        await B.return?.()
      }
    })
  }
}
// @from(Start 9045224, End 9045873)
async function* bL6(A, B) {
  if (!A.body) {
    if (B.abort(), typeof globalThis.navigator !== "undefined" && globalThis.navigator.product === "ReactNative") throw new P9("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");
    throw new P9("Attempted to iterate over a response with no body")
  }
  let Q = new gs0,
    I = new iR,
    G = no(A.body);
  for await (let Z of gL6(G)) for (let D of I.decode(Z)) {
    let Y = Q.decode(D);
    if (Y) yield Y
  }
  for (let Z of I.flush()) {
    let D = Q.decode(Z);
    if (D) yield D
  }
}
// @from(Start 9045874, End 9046275)
async function* gL6(A) {
  let B = new Uint8Array;
  for await (let Q of A) {
    if (Q == null) continue;
    let I = Q instanceof ArrayBuffer ? new Uint8Array(Q) : typeof Q === "string" ? ao(Q) : Q,
      G = new Uint8Array(B.length + I.length);
    G.set(B), G.set(I, B.length), B = G;
    let Z;
    while ((Z = bs0(B)) !== -1) yield B.slice(0, Z), B = B.slice(Z)
  }
  if (B.length > 0) yield B
}
// @from(Start 9046276, End 9046944)
class gs0 {
  constructor() {
    this.event = null, this.data = [], this.chunks = []
  }
  decode(A) {
    if (A.endsWith("\r")) A = A.substring(0, A.length - 1);
    if (!A) {
      if (!this.event && !this.data.length) return null;
      let G = {
        event: this.event,
        data: this.data.join(`
`),
        raw: this.chunks
      };
      return this.event = null, this.data = [], this.chunks = [], G
    }
    if (this.chunks.push(A), A.startsWith(":")) return null;
    let [B, Q, I] = hL6(A, ":");
    if (I.startsWith(" ")) I = I.substring(1);
    if (B === "event") this.event = I;
    else if (B === "data") this.data.push(I);
    return null
  }
}
// @from(Start 9046946, End 9047087)
function hL6(A, B) {
  let Q = A.indexOf(B);
  if (Q !== -1) return [A.substring(0, Q), B, A.substring(Q + B.length)];
  return [A, "", ""]
}
// @from(Start 9047088, End 9047967)
async function $J1(A, B) {
  let {
    response: Q,
    requestLogID: I,
    retryOfRequestLogID: G,
    startTime: Z
  } = B, D = await (async () => {
    if (B.options.stream) {
      if (vZ(A).debug("response", Q.status, Q.url, Q.headers, Q.body), B.options.__streamClass) return B.options.__streamClass.fromSSEResponse(Q, B.controller);
      return bD.fromSSEResponse(Q, B.controller)
    }
    if (Q.status === 204) return null;
    if (B.options.__binaryResponse) return Q;
    let W = Q.headers.get("content-type")?.split(";")[0]?.trim();
    if (W?.includes("application/json") || W?.endsWith("+json")) {
      let X = await Q.json();
      return sc1(X, Q)
    }
    return await Q.text()
  })();
  return vZ(A).debug(`[${I}] response parsed`, A$({
    retryOfRequestLogID: G,
    url: Q.url,
    status: Q.status,
    body: D,
    durationMs: Date.now() - Z
  })), D
}
// @from(Start 9047969, End 9048171)
function sc1(A, B) {
  if (!A || typeof A !== "object" || Array.isArray(A)) return A;
  return Object.defineProperty(A, "_request_id", {
    value: B.headers.get("request-id"),
    enumerable: !1
  })
}
// @from(Start 9048176, End 9048178)
so
// @from(Start 9048180, End 9049137)
class kj extends Promise {
  constructor(A, B, Q = $J1) {
    super((I) => {
      I(null)
    });
    this.responsePromise = B, this.parseResponse = Q, so.set(this, void 0), Q4(this, so, A, "f")
  }
  _thenUnwrap(A) {
    return new kj(X0(this, so, "f"), this.responsePromise, async (B, Q) => sc1(A(await this.parseResponse(B, Q), Q), Q.response))
  }
  asResponse() {
    return this.responsePromise.then((A) => A.response)
  }
  async withResponse() {
    let [A, B] = await Promise.all([this.parse(), this.asResponse()]);
    return {
      data: A,
      response: B,
      request_id: B.headers.get("request-id")
    }
  }
  parse() {
    if (!this.parsedPromise) this.parsedPromise = this.responsePromise.then((A) => this.parseResponse(X0(this, so, "f"), A));
    return this.parsedPromise
  }
  then(A, B) {
    return this.parse().then(A, B)
  } catch (A) {
    return this.parse().catch(A)
  } finally(A) {
    return this.parse().finally(A)
  }
}
// @from(Start 9049160, End 9049163)
qJ1
// @from(Start 9049165, End 9049964)
class hs0 {
  constructor(A, B, Q, I) {
    qJ1.set(this, void 0), Q4(this, qJ1, A, "f"), this.options = I, this.response = B, this.body = Q
  }
  hasNextPage() {
    if (!this.getPaginatedItems().length) return !1;
    return this.nextPageRequestOptions() != null
  }
  async getNextPage() {
    let A = this.nextPageRequestOptions();
    if (!A) throw new P9("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");
    return await X0(this, qJ1, "f").requestAPIList(this.constructor, A)
  }
  async * iterPages() {
    let A = this;
    yield A;
    while (A.hasNextPage()) A = await A.getNextPage(), yield A
  }
  async * [(qJ1 = new WeakMap, Symbol.asyncIterator)]() {
    for await (let A of this.iterPages()) for (let B of A.getPaginatedItems()) yield B
  }
}
// @from(Start 9049965, End 9050200)
class MJ1 extends kj {
  constructor(A, B, Q) {
    super(A, B, async (I, G) => new Q(I, G.response, await $J1(I, G), G.options))
  }
  async * [Symbol.asyncIterator]() {
    let A = await this;
    for await (let B of A) yield B
  }
}
// @from(Start 9050201, End 9051006)
class B$ extends hs0 {
  constructor(A, B, Q, I) {
    super(A, B, Q, I);
    this.data = Q.data || [], this.has_more = Q.has_more || !1, this.first_id = Q.first_id || null, this.last_id = Q.last_id || null
  }
  getPaginatedItems() {
    return this.data ?? []
  }
  hasNextPage() {
    if (this.has_more === !1) return !1;
    return super.hasNextPage()
  }
  nextPageRequestOptions() {
    if (this.options.query?.before_id) {
      let B = this.first_id;
      if (!B) return null;
      return {
        ...this.options,
        query: {
          ...cc1(this.options.query),
          before_id: B
        }
      }
    }
    let A = this.last_id;
    if (!A) return null;
    return {
      ...this.options,
      query: {
        ...cc1(this.options.query),
        after_id: A
      }
    }
  }
}
// @from(Start 9051011, End 9051402)
rc1 = () => {
  if (typeof File === "undefined") {
    let {
      process: A
    } = globalThis, B = typeof A?.versions?.node === "string" && parseInt(A.versions.node.split(".")) < 20;
    throw new Error("`File` is not defined as a global, which is required for file uploads." + (B ? " Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`." : ""))
  }
}
// @from(Start 9051405, End 9051482)
function LJ1(A, B, Q) {
  return rc1(), new File(A, B ?? "unknown_file", Q)
}
// @from(Start 9051484, End 9051778)
function ms0(A) {
  return (typeof A === "object" && A !== null && (("name" in A) && A.name && String(A.name) || ("url" in A) && A.url && String(A.url) || ("filename" in A) && A.filename && String(A.filename) || ("path" in A) && A.path && String(A.path)) || "").split(/[\\/]/).pop() || void 0
}
// @from(Start 9051783, End 9051879)
ds0 = (A) => A != null && typeof A === "object" && typeof A[Symbol.asyncIterator] === "function"
// @from(Start 9051885, End 9052096)
us0 = (A) => A != null && typeof A === "object" && typeof A.size === "number" && typeof A.type === "string" && typeof A.text === "function" && typeof A.slice === "function" && typeof A.arrayBuffer === "function"
// @from(Start 9052100, End 9052225)
dL6 = (A) => A != null && typeof A === "object" && typeof A.name === "string" && typeof A.lastModified === "number" && us0(A)
// @from(Start 9052229, End 9052337)
uL6 = (A) => A != null && typeof A === "object" && typeof A.url === "string" && typeof A.blob === "function"
// @from(Start 9052339, End 9052868)
async function RJ1(A, B, Q) {
  if (rc1(), A = await A, dL6(A)) {
    if (A instanceof File) return A;
    return LJ1([await A.arrayBuffer()], A.name)
  }
  if (uL6(A)) {
    let G = await A.blob();
    return B || (B = new URL(A.url).pathname.split(/[\\/]/).pop()), LJ1(await oc1(G), B, Q)
  }
  let I = await oc1(A);
  if (B || (B = ms0(A)), !Q?.type) {
    let G = I.find((Z) => typeof Z === "object" && ("type" in Z) && Z.type);
    if (typeof G === "string") Q = {
      ...Q,
      type: G
    }
  }
  return LJ1(I, B, Q)
}
// @from(Start 9052869, End 9053299)
async function oc1(A) {
  let B = [];
  if (typeof A === "string" || ArrayBuffer.isView(A) || A instanceof ArrayBuffer) B.push(A);
  else if (us0(A)) B.push(A instanceof Blob ? A : await A.arrayBuffer());
  else if (ds0(A))
    for await (let Q of A) B.push(...await oc1(Q));
  else {
    let Q = A?.constructor?.name;
    throw new Error(`Unexpected data type: ${typeof A}${Q?`; constructor: ${Q}`:""}${pL6(A)}`)
  }
  return B
}
// @from(Start 9053301, End 9053459)
function pL6(A) {
  if (typeof A !== "object" || A === null) return "";
  return `; props: [${Object.getOwnPropertyNames(A).map((Q)=>`"${Q}"`).join(", ")}]`
}
// @from(Start 9053460, End 9053516)
class kG {
  constructor(A) {
    this._client = A
  }
}
// @from(Start 9053521, End 9053569)
cs0 = Symbol.for("brand.privateNullableHeaders")
// @from(Start 9053573, End 9053592)
ps0 = Array.isArray
// @from(Start 9053595, End 9054230)
function* lL6(A) {
  if (!A) return;
  if (cs0 in A) {
    let {
      values: I,
      nulls: G
    } = A;
    yield* I.entries();
    for (let Z of G) yield [Z, null];
    return
  }
  let B = !1,
    Q;
  if (A instanceof Headers) Q = A.entries();
  else if (ps0(A)) Q = A;
  else B = !0, Q = Object.entries(A ?? {});
  for (let I of Q) {
    let G = I[0];
    if (typeof G !== "string") throw new TypeError("expected header name to be a string");
    let Z = ps0(I[1]) ? I[1] : [I[1]],
      D = !1;
    for (let Y of Z) {
      if (Y === void 0) continue;
      if (B && !D) D = !0, yield [G, null];
      yield [G, Y]
    }
  }
}
// @from(Start 9054235, End 9054592)
YB = (A) => {
  let B = new Headers,
    Q = new Set;
  for (let I of A) {
    let G = new Set;
    for (let [Z, D] of lL6(I)) {
      let Y = Z.toLowerCase();
      if (!G.has(Y)) B.delete(Z), G.add(Y);
      if (D === null) B.delete(Z), Q.add(Y);
      else B.append(Z, D), Q.delete(Y)
    }
  }
  return {
    [cs0]: !0,
    values: B,
    nulls: Q
  }
}
// @from(Start 9054595, End 9054689)
function ls0(A) {
  return A.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent)
}
// @from(Start 9054694, End 9055498)
iL6 = (A = ls0) => function B(Q, ...I) {
    if (Q.length === 1) return Q[0];
    let G = !1,
      Z = Q.reduce((F, X, V) => {
        if (/[?#]/.test(X)) G = !0;
        return F + X + (V === I.length ? "" : (G ? encodeURIComponent : A)(String(I[V])))
      }, ""),
      D = Z.split(/[?#]/, 1)[0],
      Y = [],
      W = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,
      J;
    while ((J = W.exec(D)) !== null) Y.push({
      start: J.index,
      length: J[0].length
    });
    if (Y.length > 0) {
      let F = 0,
        X = Y.reduce((V, C) => {
          let K = " ".repeat(C.start - F),
            E = "^".repeat(C.length);
          return F = C.start + C.length, V + K + E
        }, "");
      throw new P9(`Path parameters result in path with invalid segments:
${Z}
${X}`)
    }
    return Z
  }
// @from(Start 9055502, End 9055515)
lX = iL6(ls0)
// @from(Start 9055517, End 9056153)
class ro extends kG {
  retrieve(A, B = {}, Q) {
    let {
      betas: I
    } = B ?? {};
    return this._client.get(lX`/v1/models/${A}?beta=true`, {
      ...Q,
      headers: YB([{
        ...I?.toString() != null ? {
          "anthropic-beta": I?.toString()
        } : void 0
      }, Q?.headers])
    })
  }
  list(A = {}, B) {
    let {
      betas: Q,
      ...I
    } = A ?? {};
    return this._client.getAPIList("/v1/models?beta=true", B$, {
      query: I,
      ...B,
      headers: YB([{
        ...Q?.toString() != null ? {
          "anthropic-beta": Q?.toString()
        } : void 0
      }, B?.headers])
    })
  }
}
// @from(Start 9056154, End 9056930)
class $m {
  constructor(A, B) {
    this.iterator = A, this.controller = B
  }
  async * decoder() {
    let A = new iR;
    for await (let B of this.iterator) for (let Q of A.decode(B)) yield JSON.parse(Q);
    for (let B of A.flush()) yield JSON.parse(B)
  } [Symbol.asyncIterator]() {
    return this.decoder()
  }
  static fromResponse(A, B) {
    if (!A.body) {
      if (B.abort(), typeof globalThis.navigator !== "undefined" && globalThis.navigator.product === "ReactNative") throw new P9("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api");
      throw new P9("Attempted to iterate over a response with no body")
    }
    return new $m(no(A.body), B)
  }
}
// @from(Start 9056931, End 9058999)
class oo extends kG {
  create(A, B) {
    let {
      betas: Q,
      ...I
    } = A;
    return this._client.post("/v1/messages/batches?beta=true", {
      body: I,
      ...B,
      headers: YB([{
        "anthropic-beta": [...Q ?? [], "message-batches-2024-09-24"].toString()
      }, B?.headers])
    })
  }
  retrieve(A, B = {}, Q) {
    let {
      betas: I
    } = B ?? {};
    return this._client.get(lX`/v1/messages/batches/${A}?beta=true`, {
      ...Q,
      headers: YB([{
        "anthropic-beta": [...I ?? [], "message-batches-2024-09-24"].toString()
      }, Q?.headers])
    })
  }
  list(A = {}, B) {
    let {
      betas: Q,
      ...I
    } = A ?? {};
    return this._client.getAPIList("/v1/messages/batches?beta=true", B$, {
      query: I,
      ...B,
      headers: YB([{
        "anthropic-beta": [...Q ?? [], "message-batches-2024-09-24"].toString()
      }, B?.headers])
    })
  }
  delete(A, B = {}, Q) {
    let {
      betas: I
    } = B ?? {};
    return this._client.delete(lX`/v1/messages/batches/${A}?beta=true`, {
      ...Q,
      headers: YB([{
        "anthropic-beta": [...I ?? [], "message-batches-2024-09-24"].toString()
      }, Q?.headers])
    })
  }
  cancel(A, B = {}, Q) {
    let {
      betas: I
    } = B ?? {};
    return this._client.post(lX`/v1/messages/batches/${A}/cancel?beta=true`, {
      ...Q,
      headers: YB([{
        "anthropic-beta": [...I ?? [], "message-batches-2024-09-24"].toString()
      }, Q?.headers])
    })
  }
  async results(A, B = {}, Q) {
    let I = await this.retrieve(A);
    if (!I.results_url) throw new P9(`No batch \`results_url\`; Has it finished processing? ${I.processing_status} - ${I.id}`);
    let {
      betas: G
    } = B ?? {};
    return this._client.get(I.results_url, {
      ...Q,
      headers: YB([{
        "anthropic-beta": [...G ?? [], "message-batches-2024-09-24"].toString(),
        Accept: "application/binary"
      }, Q?.headers]),
      stream: !0,
      __binaryResponse: !0
    })._thenUnwrap((Z, D) => $m.fromResponse(D.response, D.controller))
  }
}
// @from(Start 9059004, End 9061240)
sL6 = (A) => {
    let B = 0,
      Q = [];
    while (B < A.length) {
      let I = A[B];
      if (I === "\\") {
        B++;
        continue
      }
      if (I === "{") {
        Q.push({
          type: "brace",
          value: "{"
        }), B++;
        continue
      }
      if (I === "}") {
        Q.push({
          type: "brace",
          value: "}"
        }), B++;
        continue
      }
      if (I === "[") {
        Q.push({
          type: "paren",
          value: "["
        }), B++;
        continue
      }
      if (I === "]") {
        Q.push({
          type: "paren",
          value: "]"
        }), B++;
        continue
      }
      if (I === ":") {
        Q.push({
          type: "separator",
          value: ":"
        }), B++;
        continue
      }
      if (I === ",") {
        Q.push({
          type: "delimiter",
          value: ","
        }), B++;
        continue
      }
      if (I === '"') {
        let Y = "",
          W = !1;
        I = A[++B];
        while (I !== '"') {
          if (B === A.length) {
            W = !0;
            break
          }
          if (I === "\\") {
            if (B++, B === A.length) {
              W = !0;
              break
            }
            Y += I + A[B], I = A[++B]
          } else Y += I, I = A[++B]
        }
        if (I = A[++B], !W) Q.push({
          type: "string",
          value: Y
        });
        continue
      }
      if (I && /\s/.test(I)) {
        B++;
        continue
      }
      let Z = /[0-9]/;
      if (I && Z.test(I) || I === "-" || I === ".") {
        let Y = "";
        if (I === "-") Y += I, I = A[++B];
        while (I && Z.test(I) || I === ".") Y += I, I = A[++B];
        Q.push({
          type: "number",
          value: Y
        });
        continue
      }
      let D = /[a-z]/i;
      if (I && D.test(I)) {
        let Y = "";
        while (I && D.test(I)) {
          if (B === A.length) break;
          Y += I, I = A[++B]
        }
        if (Y == "true" || Y == "false" || Y === "null") Q.push({
          type: "name",
          value: Y
        });
        else {
          B++;
          continue
        }
        continue
      }
      B++
    }
    return Q
  }
// @from(Start 9061244, End 9061943)
qm = (A) => {
    if (A.length === 0) return A;
    let B = A[A.length - 1];
    switch (B.type) {
      case "separator":
        return A = A.slice(0, A.length - 1), qm(A);
        break;
      case "number":
        let Q = B.value[B.value.length - 1];
        if (Q === "." || Q === "-") return A = A.slice(0, A.length - 1), qm(A);
      case "string":
        let I = A[A.length - 2];
        if (I?.type === "delimiter") return A = A.slice(0, A.length - 1), qm(A);
        else if (I?.type === "brace" && I.value === "{") return A = A.slice(0, A.length - 1), qm(A);
        break;
      case "delimiter":
        return A = A.slice(0, A.length - 1), qm(A);
        break
    }
    return A
  }
// @from(Start 9061947, End 9062489)
rL6 = (A) => {
    let B = [];
    if (A.map((Q) => {
        if (Q.type === "brace")
          if (Q.value === "{") B.push("}");
          else B.splice(B.lastIndexOf("}"), 1);
        if (Q.type === "paren")
          if (Q.value === "[") B.push("]");
          else B.splice(B.lastIndexOf("]"), 1)
      }), B.length > 0) B.reverse().map((Q) => {
      if (Q === "}") A.push({
        type: "brace",
        value: "}"
      });
      else if (Q === "]") A.push({
        type: "paren",
        value: "]"
      })
    });
    return A
  }
// @from(Start 9062493, End 9062728)
oL6 = (A) => {
    let B = "";
    return A.map((Q) => {
      switch (Q.type) {
        case "string":
          B += '"' + Q.value + '"';
          break;
        default:
          B += Q.value;
          break
      }
    }), B
  }
// @from(Start 9062732, End 9062777)
OJ1 = (A) => JSON.parse(oL6(rL6(qm(sL6(A)))))
// @from(Start 9062783, End 9062785)
iX
// @from(Start 9062787, End 9062789)
nR
// @from(Start 9062791, End 9062793)
to
// @from(Start 9062795, End 9062798)
TJ1
// @from(Start 9062800, End 9062802)
eo
// @from(Start 9062804, End 9062806)
At
// @from(Start 9062808, End 9062811)
PJ1
// @from(Start 9062813, End 9062815)
Bt
// @from(Start 9062817, End 9062819)
Q$
// @from(Start 9062821, End 9062823)
Qt
// @from(Start 9062825, End 9062828)
SJ1
// @from(Start 9062830, End 9062833)
_J1
// @from(Start 9062835, End 9062837)
Mm
// @from(Start 9062839, End 9062842)
jJ1
// @from(Start 9062844, End 9062847)
yJ1
// @from(Start 9062849, End 9062852)
tc1
// @from(Start 9062854, End 9062857)
is0
// @from(Start 9062859, End 9062862)
ec1
// @from(Start 9062864, End 9062867)
Al1
// @from(Start 9062869, End 9062872)
Bl1
// @from(Start 9062874, End 9062877)
Ql1
// @from(Start 9062879, End 9062882)
ns0
// @from(Start 9062884, End 9062902)
as0 = "__json_buf"