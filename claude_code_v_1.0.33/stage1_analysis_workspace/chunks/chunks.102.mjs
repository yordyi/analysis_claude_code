
// @from(Start 10193957, End 10194327)
function rq5(A) {
  let B = {
    exitOnCtrlC: A,
    onFlicker() {
      E1("tengu_flicker", {})
    }
  };
  if (!process.stdin.isTTY && !0 && !process.argv.includes("mcp")) {
    if (process.platform !== "win32") try {
      let Q = dq5("/dev/tty", "r");
      B = {
        ...B,
        stdin: new mq5(Q)
      }
    } catch (Q) {
      b1(Q)
    }
  }
  return B
}
// @from(Start 10194328, End 10194592)
async function oq5(A, B) {
  if (!process.stdin.isTTY && !process.argv.includes("mcp")) {
    if (B === "stream-json") return process.stdin;
    let Q = "";
    for await (let I of process.stdin) Q += I;
    return [A, Q].filter(Boolean).join(`
`)
  }
  return A
}
// @from(Start 10194593, End 10217244)
async function tq5() {
  aq5();
  let A = new Ty2;
  A.name("claude").description(`${m0} - starts an interactive session by default, use -p/--print for non-interactive output`).argument("[prompt]", "Your prompt", String).helpOption("-h, --help", "Display help for command").option("-d, --debug", "Enable debug mode", () => !0).option("--verbose", "Override verbose mode setting from config", () => !0).option("-p, --print", "Print response and exit (useful for pipes)", () => !0).addOption(new UT("--output-format <format>", 'Output format (only works with --print): "text" (default), "json" (single result), or "stream-json" (realtime streaming)').choices(["text", "json", "stream-json"])).addOption(new UT("--input-format <format>", 'Input format (only works with --print): "text" (default), or "stream-json" (realtime streaming input)').choices(["text", "stream-json"])).option("--mcp-debug", "[DEPRECATED. Use --debug instead] Enable MCP debug mode (shows MCP server errors)", () => !0).option("--dangerously-skip-permissions", "Bypass all permission checks. Recommended only for sandboxes with no internet access.", () => !0).addOption(new UT("--max-turns <turns>", "Maximum number of agentic turns in non-interactive mode. This will early exit the conversation after the specified number of turns. (only works with --print)").argParser(Number).hideHelp()).option("--allowedTools <tools...>", 'Comma or space-separated list of tool names to allow (e.g. "Bash(git:*) Edit")').option("--disallowedTools <tools...>", 'Comma or space-separated list of tool names to deny (e.g. "Bash(git:*) Edit")').option("--mcp-config <file or string>", "Load MCP servers from a JSON file or string").addOption(new UT("--permission-prompt-tool <tool>", "MCP tool to use for permission prompts (only works with --print)").argParser(String).hideHelp()).addOption(new UT("--system-prompt <prompt>", "System prompt to use for the session  (only works with --print)").argParser(String).hideHelp()).addOption(new UT("--append-system-prompt <prompt>", "Append a system prompt to the default system prompt (only works with --print)").argParser(String).hideHelp()).addOption(new UT("--permission-mode <mode>", "Permission mode to use for the session").argParser(String).hideHelp().choices(S81)).option("-c, --continue", "Continue the most recent conversation", () => !0).option("-r, --resume [sessionId]", "Resume a conversation - provide a session ID or interactively select a conversation to resume", (I) => I || !0).option("--model <model>", "Model for the current session. Provide an alias for the latest model (e.g. 'sonnet' or 'opus') or a model's full name (e.g. 'claude-sonnet-4-20250514').").option("--fallback-model <model>", "Enable automatic fallback to specified model when default model is overloaded (only works with --print)").option("--add-dir <directories...>", "Additional directories to allow tool access to").action(async (I, G) => {
    let {
      debug: Z = !1,
      verbose: D = !1,
      print: Y,
      dangerouslySkipPermissions: W,
      allowedTools: J = [],
      disallowedTools: F = [],
      mcpConfig: X,
      outputFormat: V,
      inputFormat: C,
      permissionMode: K,
      addDir: E = [],
      fallbackModel: N
    } = G, q = !1, O = null, R = Y ?? !process.stdout.isTTY;
    if (C9A(R), N && G.model && N === G.model) process.stderr.write(UA.red(`Error: Fallback model cannot be the same as the main model. Please specify a different model for --fallback-model.
`)), process.exit(1);
    let T = s_2({
        permissionModeCli: K,
        dangerouslySkipPermissions: W
      }),
      L = void 0;
    if (X) try {
      let YA, bA = Z8(X);
      if (bA) {
        let e1 = Ug.safeParse(bA);
        if (!e1.success) {
          let k1 = e1.error.errors.map((Q1) => `${Q1.path.join(".")}: ${Q1.message}`).join(", ");
          throw new Error(`Invalid MCP configuration: ${k1}`)
        }
        YA = e1.data.mcpServers
      } else {
        let e1 = pq5(X);
        YA = wo1(e1).mcpServers
      }
      L = UU(YA, (e1) => ({
        ...e1,
        scope: "dynamic"
      }))
    } catch (YA) {
      console.error(`Error: ${YA instanceof Error?YA.message:String(YA)}`), process.exit(1)
    }
    if (!R) {
      let YA = await lq5(T);
      if (YA && I?.trim().toLowerCase() === "/login") I = "";
      if (!YA) zH1()
    }
    let {
      toolPermissionContext: _,
      warnings: k
    } = r_2({
      allowedToolsCli: J,
      disallowedToolsCli: F,
      permissionMode: T,
      addDirs: E
    });
    if (k.forEach((YA) => {
        console.error(YA)
      }), AS2(), AK1(L), C && C !== "text" && C !== "stream-json") console.error(`Error: Invalid input format "${C}".`), process.exit(1);
    if (C === "stream-json" && V !== "stream-json") console.error("Error: --input-format=stream-json requires output-format=stream-json."), process.exit(1);
    let i = await oq5(I || "", C ?? "text"),
      x = CT(_, ZA().todoFeatureEnabled);
    await qT($T(), T, Y ?? !1, !1);
    let [s, {
      clients: d = [],
      tools: F1 = [],
      commands: X1 = []
    }] = await Promise.all([J2A(), i || R ? await AK1(L) : {
      clients: [],
      tools: [],
      commands: []
    }]);
    if (E1("tengu_init", {
        entrypoint: "claude",
        hasInitialPrompt: Boolean(I),
        hasStdin: Boolean(i),
        verbose: D,
        debug: Z,
        print: Y,
        outputFormat: V,
        numAllowedTools: J.length,
        numDisallowedTools: F.length,
        mcpClientCount: Object.keys(DV()).length,
        worktree: !1
      }), uT2(), R) {
      Yk2(i, _, d, s, X1, x, F1, {
        continue: G.continue,
        resume: G.resume,
        verbose: G.verbose,
        outputFormat: G.outputFormat,
        permissionPromptToolName: G.permissionPromptTool,
        allowedTools: J,
        maxTurns: G.maxTurns,
        systemPrompt: G.systemPrompt,
        appendSystemPrompt: G.appendSystemPrompt,
        userSpecifiedModel: G.model,
        fallbackModel: N
      });
      return
    }
    let [v, D1] = await Promise.all([rq5(!1), By2(ry2)]);
    E1("tengu_startup_manual_model_config", {
      cli_flag: G.model,
      env_var: process.env.ANTHROPIC_MODEL,
      settings_file: m6().model
    });
    let N1 = G.model || process.env.ANTHROPIC_MODEL || m6().model;
    if (T9() && !qZ() && N1 !== void 0 && N1.includes("opus")) console.error(UA.yellow("Claude Pro users are not currently able to use Opus 4 in Claude Code. The current model is now Sonnet 4."));
    let u1 = G.model;
    Xc(u1), Q9A(Vg() || null);
    let d1 = {
      verbose: D ?? !1,
      mainLoopModel: C21(),
      todoFeatureEnabled: ZA().todoFeatureEnabled,
      toolPermissionContext: _,
      maxRateLimitFallbackActive: !1,
      mcp: {
        clients: [],
        tools: [],
        commands: [],
        resources: {}
      }
    };
    if (AE1(_), iq5(), G.continue) try {
      E1("tengu_continue", {});
      let YA = await ET(void 0, F1);
      if (!YA) console.error("No conversation found to continue"), process.exit(1);
      let bA = jJ(y9());
      n5(HB.default.createElement(c3, {
        initialState: d1,
        onChangeAppState: NT
      }, HB.default.createElement(_p, {
        debug: Z,
        initialPrompt: "",
        shouldShowPromptInput: !0,
        commands: [...s, ...X1],
        initialTools: F1,
        initialMessages: YA.messages,
        initialTodos: bA,
        mcpClients: d,
        dynamicMcpConfig: L
      })), v)
    } catch (YA) {
      b1(YA instanceof Error ? YA : new Error(String(YA))), process.exit(1)
    } else if (G.resume) {
      let YA = null,
        bA = fC(G.resume);
      if (!1) {
        if (G.resume && typeof G.resume === "string" && !bA) try {} catch (e1) {}
      }
      if (bA) {
        let e1 = bA;
        try {
          let k1 = await ET(e1, F1);
          if (!k1) console.error(`No conversation found with session ID: ${e1}`), process.exit(1);
          YA = k1.messages
        } catch (k1) {
          b1(k1 instanceof Error ? k1 : new Error(String(k1))), console.error(`Failed to resume session ${e1}`), process.exit(1)
        }
      }
      if (Array.isArray(YA)) n5(HB.default.createElement(c3, {
        initialState: d1,
        onChangeAppState: NT
      }, HB.default.createElement(_p, {
        debug: Z,
        initialPrompt: i,
        shouldShowPromptInput: !0,
        commands: [...s, ...X1],
        initialTools: F1,
        initialMessages: YA,
        mcpClients: d,
        dynamicMcpConfig: L
      })), v);
      else {
        let e1 = {},
          k1 = await Hg();
        if (!k1.length) console.error("No conversations found to resume"), process.exit(1);
        let {
          unmount: Q1
        } = n5(HB.default.createElement(fy2, {
          commands: [...s, ...X1],
          context: e1,
          debug: Z,
          logs: k1,
          initialTools: F1,
          mcpClients: d,
          dynamicMcpConfig: L,
          appState: d1,
          onChangeAppState: NT
        }), v);
        e1.unmount = Q1
      }
    } else {
      let YA = jJ(y9());
      n5(HB.default.createElement(c3, {
        initialState: d1,
        onChangeAppState: NT
      }, HB.default.createElement(_p, {
        debug: Z,
        commands: [...s, ...X1],
        initialPrompt: i,
        shouldShowPromptInput: !0,
        initialTools: F1,
        initialTodos: YA,
        tipOfTheDay: D1,
        mcpClients: d,
        dynamicMcpConfig: L
      })), v)
    }
  }).version(`${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION} (${m0})`, "-v, --version", "Output the version number");
  let B = A.command("config").description("Manage configuration (eg. claude config set -g theme dark)").helpOption("-h, --help", "Display help for command");
  B.command("get <key>").description("Get a config value").option("-g, --global", "Use global config").helpOption("-h, --help", "Display help for command").action(async (I, {
    global: G
  }) => {
    await qT($T(), "default", !1, !1), console.log(WD0(I, G ?? !1)), process.exit(0)
  }), B.command("set <key> <value>").description("Set a config value").option("-g, --global", "Use global config").helpOption("-h, --help", "Display help for command").action(async (I, G, {
    global: Z
  }) => {
    await qT($T(), "default", !1, !1), JD0(I, G, Z ?? !1), console.log(`Set ${I} to ${G}`), process.exit(0)
  }), B.command("remove <key> [values...]").alias("rm").description("Remove a config value or items from a config array").option("-g, --global", "Use global config").helpOption("-h, --help", "Display help for command").action(async (I, G, {
    global: Z
  }) => {
    if (await qT($T(), "default", !1, !1), Ng(I, Z ?? !1) && G && G.length > 0) {
      let D = G.flatMap((Y) => Y.includes(",") ? Y.split(",") : Y).map((Y) => Y.trim()).filter((Y) => Y.length > 0);
      if (D.length === 0) console.error("Error: No valid values provided"), process.exit(1);
      ID0(I, D, Z ?? !1, !1), console.log(`Removed from ${I} in ${Z?"global":"project"} config: ${D.join(", ")}`)
    } else FD0(I, Z ?? !1), console.log(`Removed ${I}`);
    process.exit(0)
  }), B.command("list").alias("ls").description("List all config values").option("-g, --global", "Use global config", !1).helpOption("-h, --help", "Display help for command").action(async ({
    global: I
  }) => {
    await qT($T(), "default", !1, !1), console.log(JSON.stringify(XD0(I ?? !1), null, 2)), process.exit(0)
  }), B.command("add <key> <values...>").description("Add items to a config array (space or comma separated)").option("-g, --global", "Use global config").helpOption("-h, --help", "Display help for command").action(async (I, G, {
    global: Z
  }) => {
    await qT($T(), "default", !1, !1);
    let D = G.flatMap((Y) => Y.includes(",") ? Y.split(",") : Y).map((Y) => Y.trim()).filter((Y) => Y.length > 0);
    if (D.length === 0) console.error("Error: No valid values provided"), process.exit(1);
    _G1(I, D, Z ?? !1, !1), console.log(`Added to ${I} in ${Z?"global":"project"} config: ${D.join(", ")}`), process.exit(0)
  });
  let Q = A.command("mcp").description("Configure and manage MCP servers").helpOption("-h, --help", "Display help for command");
  return Q.command("serve").description(`Start the ${m0} MCP server`).helpOption("-h, --help", "Display help for command").option("-d, --debug", "Enable debug mode", () => !0).option("--verbose", "Override verbose mode setting from config", () => !0).action(async ({
    debug: I,
    verbose: G
  }) => {
    let Z = $T();
    if (E1("tengu_mcp_start", {}), !uq5(Z)) console.error(`Error: Directory ${Z} does not exist`), process.exit(1);
    try {
      await qT(Z, "default", !1, !1), await hy2(Z, I ?? !1, G ?? !1)
    } catch (D) {
      console.error("Error: Failed to start MCP server:", D), process.exit(1)
    }
  }), Q.command("add <name> <commandOrUrl> [args...]").description("Add a server").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").option("-t, --transport <transport>", "Transport type (stdio, sse, http)", "stdio").option("-e, --env <env...>", "Set environment variables (e.g. -e KEY=value)").option("-H, --header <header...>", 'Set HTTP headers for SSE and HTTP transports (e.g. -H "X-Api-Key: abc123" -H "X-Custom: value")').helpOption("-h, --help", "Display help for command").action(async (I, G, Z, D) => {
    if (!I) console.error("Error: Server name is required."), console.error("Usage: claude mcp add <name> <command> [args...]"), process.exit(1);
    else if (!G) console.error("Error: Command is required when server name is provided."), console.error("Usage: claude mcp add <name> <command> [args...]"), process.exit(1);
    try {
      let Y = cd(D.scope),
        W = Ho1(D.transport);
      if (await E1("tengu_mcp_add", {
          type: W,
          scope: Y,
          source: "command",
          transport: W
        }), W === "sse") {
        if (!G) console.error("Error: URL is required for SSE transport."), process.exit(1);
        let J = D.header ? oC1(D.header) : void 0;
        if (LO(I, {
            type: "sse",
            url: G,
            headers: J
          }, Y), console.log(`Added SSE MCP server ${I} with URL: ${G} to ${Y} config`), J) console.log("Headers:", JSON.stringify(J, null, 2))
      } else if (W === "http") {
        if (!G) console.error("Error: URL is required for HTTP transport."), process.exit(1);
        let J = D.header ? oC1(D.header) : void 0;
        if (LO(I, {
            type: "http",
            url: G,
            headers: J
          }, Y), console.log(`Added HTTP MCP server ${I} with URL: ${G} to ${Y} config`), J) console.log("Headers:", JSON.stringify(J, null, 2))
      } else {
        let J = eZ0(D.env);
        LO(I, {
          type: "stdio",
          command: G,
          args: Z || [],
          env: J
        }, Y), console.log(`Added stdio MCP server ${I} with command: ${G} ${(Z||[]).join(" ")} to ${Y} config`)
      }
      process.exit(0)
    } catch (Y) {
      console.error(Y.message), process.exit(1)
    }
  }), Q.command("remove <name>").description("Remove an MCP server").option("-s, --scope <scope>", "Configuration scope (local, user, or project) - if not specified, removes from whichever scope it exists in").helpOption("-h, --help", "Display help for command").action(async (I, G) => {
    try {
      if (G.scope) {
        let J = cd(G.scope);
        await E1("tengu_mcp_delete", {
          name: I,
          scope: J
        }), aC1(I, J), process.stdout.write(`Removed MCP server ${I} from ${J} config
`), process.exit(0)
      }
      let Z = m9(),
        D = ZA(),
        Y = !1;
      try {
        Y = !!vC()?.[I]
      } catch {}
      let W = [];
      if (Z.mcpServers?.[I]) W.push("local");
      if (Y) W.push("project");
      if (D.mcpServers?.[I]) W.push("user");
      if (W.length === 0) process.stderr.write(`No MCP server found with name: "${I}"
`), process.exit(1);
      else if (W.length === 1) {
        let J = W[0];
        await E1("tengu_mcp_delete", {
          name: I,
          scope: J
        }), aC1(I, J), process.stdout.write(`Removed MCP server "${I}" from ${J} config
`), process.exit(0)
      } else process.stderr.write(`MCP server "${I}" exists in multiple scopes:
`), W.forEach((J) => {
        process.stderr.write(`  - ${nC1(J)}
`)
      }), process.stderr.write(`
To remove from a specific scope, use:
`), W.forEach((J) => {
        process.stderr.write(`  claude mcp remove "${I}" -s ${J}
`)
      }), process.exit(1)
    } catch (Z) {
      process.stderr.write(`${Z.message}
`), process.exit(1)
    }
  }), Q.command("list").description("List configured MCP servers").helpOption("-h, --help", "Display help for command").action(async () => {
    await E1("tengu_mcp_list", {});
    let I = DV();
    if (Object.keys(I).length === 0) console.log("No MCP servers configured. Use `claude mcp add` to add a server.");
    else
      for (let [G, Z] of Object.entries(I))
        if (Z.type === "sse") console.log(`${G}: ${Z.url} (SSE)`);
        else if (Z.type === "http") console.log(`${G}: ${Z.url} (HTTP)`);
    else if (!Z.type || Z.type === "stdio") {
      let D = Array.isArray(Z.args) ? Z.args : [];
      console.log(`${G}: ${Z.command} ${D.join(" ")}`)
    }
    process.exit(0)
  }), Q.command("get <name>").description("Get details about an MCP server").helpOption("-h, --help", "Display help for command").action(async (I) => {
    await E1("tengu_mcp_get", {
      name: I
    });
    let G = sC1(I);
    if (!G) console.error(`No MCP server found with name: ${I}`), process.exit(1);
    if (console.log(`${I}:`), console.log(`  Scope: ${nC1(G.scope)}`), G.type === "sse") {
      if (console.log("  Type: sse"), console.log(`  URL: ${G.url}`), G.headers) {
        console.log("  Headers:");
        for (let [Z, D] of Object.entries(G.headers)) console.log(`    ${Z}: ${D}`)
      }
    } else if (G.type === "http") {
      if (console.log("  Type: http"), console.log(`  URL: ${G.url}`), G.headers) {
        console.log("  Headers:");
        for (let [Z, D] of Object.entries(G.headers)) console.log(`    ${Z}: ${D}`)
      }
    } else if (G.type === "stdio") {
      console.log("  Type: stdio"), console.log(`  Command: ${G.command}`);
      let Z = Array.isArray(G.args) ? G.args : [];
      if (console.log(`  Args: ${Z.join(" ")}`), G.env) {
        console.log("  Environment:");
        for (let [D, Y] of Object.entries(G.env)) console.log(`    ${D}=${Y}`)
      }
    }
    console.log(`
To remove this server, run: claude mcp remove "${I}" -s ${G.scope}`), process.exit(0)
  }), Q.command("add-json <name> <json>").description("Add an MCP server (stdio or SSE) with a JSON string").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").helpOption("-h, --help", "Display help for command").action(async (I, G, Z) => {
    try {
      let D = cd(Z.scope),
        Y = Z8(G),
        W = Y && typeof Y === "object" && "type" in Y ? String(Y.type || "stdio") : "stdio";
      await E1("tengu_mcp_add", {
        scope: D,
        source: "json",
        type: W
      }), zo1(I, G, D), console.log(`Added ${W} MCP server ${I} to ${D} config`), process.exit(0)
    } catch (D) {
      console.error(D.message), process.exit(1)
    }
  }), Q.command("add-from-claude-desktop").description("Import MCP servers from Claude Desktop (Mac and WSL only)").option("-s, --scope <scope>", "Configuration scope (local, user, or project)", "local").helpOption("-h, --help", "Display help for command").action(async (I) => {
    try {
      let G = cd(I.scope),
        Z = Z7();
      E1("tengu_mcp_add", {
        scope: G,
        platform: Z,
        source: "desktop"
      });
      let D = _y2();
      if (Object.keys(D).length === 0) console.log("No MCP servers found in Claude Desktop configuration or configuration file does not exist."), process.exit(0);
      let {
        unmount: Y
      } = n5(HB.default.createElement(c3, null, HB.default.createElement(Py2, {
        servers: D,
        scope: G,
        onDone: () => {
          Y()
        }
      })), {
        exitOnCtrlC: !0
      })
    } catch (G) {
      console.error(G.message), process.exit(1)
    }
  }), Q.command("reset-project-choices").description("Reset all approved and rejected project-scoped (.mcp.json) servers within this project").helpOption("-h, --help", "Display help for command").action(async () => {
    await E1("tengu_mcp_reset_mcpjson_choices", {});
    let I = m9();
    B5({
      ...I,
      enabledMcpjsonServers: [],
      disabledMcpjsonServers: [],
      enableAllProjectMcpServers: !1
    }), console.log("All project-scoped (.mcp.json) server approvals and rejections have been reset."), console.log("You will be prompted for approval next time you start Claude Code."), process.exit(0)
  }), A.command("migrate-installer").description("Migrate from global npm installation to local installation").helpOption("-h, --help", "Display help for command").action(async () => {
    if (JT()) console.log("Already running from local installation. No migration needed."), process.exit(0);
    E1("tengu_migrate_installer_command", {}), await new Promise((I) => {
      let {
        waitUntilExit: G
      } = n5(HB.default.createElement(c3, null, HB.default.createElement(Hp, null)));
      G().then(() => {
        I()
      })
    }), process.exit(0)
  }), A.command("doctor").description("Check the health of your Claude Code auto-updater").helpOption("-h, --help", "Display help for command").action(async () => {
    E1("tengu_doctor_command", {}), await new Promise((I) => {
      let {
        unmount: G
      } = n5(HB.default.createElement(c3, null, HB.default.createElement($w1, {
        onDone: () => {
          G(), I()
        }
      })), {
        exitOnCtrlC: !1
      })
    }), process.exit(0)
  }), A.command("update").description("Check for updates and install if available").helpOption("-h, --help", "Display help for command").action(Wk2), A.command("install").description("Install Claude Code native build").option("--force", "Force installation even if already installed").helpOption("-h, --help", "Display help for command").action(async (I) => {
    await qT($T(), "default", !1, !1), await new Promise((G) => {
      let Z = [];
      if (I.force) Z.push("--force");
      Jk2.call(() => {
        G(), process.exit(0)
      }, {}, Z)
    })
  }), await A.parseAsync(process.argv), A
}
// @from(Start 10217246, End 10217381)
function eq5() {
  (process.stderr.isTTY ? process.stderr : process.stdout.isTTY ? process.stdout : void 0)?.write(`\x1B[?25h${OP1}`)
}
// @from(Start 10217389, End 10217466)
export {
  lq5 as showSetupScreens, qT as setup, cq5 as completeOnboarding
};