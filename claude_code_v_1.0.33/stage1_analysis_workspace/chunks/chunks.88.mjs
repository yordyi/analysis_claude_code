
// @from(Start 8886120, End 8888779)
function cf4() {
  if (process.env.CURSOR_TRACE_ID) return "cursor";
  if (process.env.VSCODE_GIT_ASKPASS_MAIN?.includes("/.cursor-server/")) return "cursor";
  if (process.env.VSCODE_GIT_ASKPASS_MAIN?.includes("/.windsurf-server/")) return "windsurf";
  let A = process.env.__CFBundleIdentifier?.toLowerCase();
  if (A?.includes("vscodium")) return "codium";
  if (A?.includes("windsurf")) return "windsurf";
  if (A?.includes("pycharm")) return "pycharm";
  if (A?.includes("intellij")) return "intellij";
  if (A?.includes("webstorm")) return "webstorm";
  if (A?.includes("phpstorm")) return "phpstorm";
  if (A?.includes("rubymine")) return "rubymine";
  if (A?.includes("clion")) return "clion";
  if (A?.includes("goland")) return "goland";
  if (A?.includes("rider")) return "rider";
  if (A?.includes("datagrip")) return "datagrip";
  if (A?.includes("appcode")) return "appcode";
  if (A?.includes("dataspell")) return "dataspell";
  if (A?.includes("aqua")) return "aqua";
  if (A?.includes("gateway")) return "gateway";
  if (A?.includes("fleet")) return "fleet";
  if (A?.includes("com.google.android.studio")) return "androidstudio";
  if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") return "pycharm";
  if (process.env.TERM === "xterm-ghostty") return "ghostty";
  if (process.env.TERM?.includes("kitty")) return "kitty";
  if (process.env.TERM_PROGRAM) return process.env.TERM_PROGRAM;
  if (process.env.TMUX) return "tmux";
  if (process.env.STY) return "screen";
  if (process.env.KONSOLE_VERSION) return "konsole";
  if (process.env.GNOME_TERMINAL_SERVICE) return "gnome-terminal";
  if (process.env.XTERM_VERSION) return "xterm";
  if (process.env.VTE_VERSION) return "vte-based";
  if (process.env.TERMINATOR_UUID) return "terminator";
  if (process.env.KITTY_WINDOW_ID) return "kitty";
  if (process.env.ALACRITTY_LOG) return "alacritty";
  if (process.env.TILIX_ID) return "tilix";
  if (process.env.WT_SESSION) return "windows-terminal";
  if (process.env.SESSIONNAME && process.env.TERM === "cygwin") return "cygwin";
  if (process.env.MSYSTEM) return process.env.MSYSTEM.toLowerCase();
  if (process.env.ConEmuTask) return "conemu";
  if (process.env.WSL_DISTRO_NAME) return `wsl-${process.env.WSL_DISTRO_NAME}`;
  if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.env.SSH_TTY) return "ssh-session";
  if (process.env.TERM) {
    let B = process.env.TERM;
    if (B.includes("alacritty")) return "alacritty";
    if (B.includes("rxvt")) return "rxvt";
    if (B.includes("termite")) return "termite";
    return process.env.TERM
  }
  if (!process.stdout.isTTY) return "non-interactive";
  return null
}
// @from(Start 8888784, End 8889124)
mA = {
  getIsDocker: gf4,
  hasInternetAccess: hf4,
  isCI: Boolean(!1),
  platform: ["win32", "darwin"].includes(process.platform) ? process.platform : "linux",
  nodeVersion: process.version,
  terminal: cf4(),
  getPackageManagers: mf4,
  getRuntimes: df4,
  isRunningWithBun: uf4,
  isWslEnvironment: oZ0,
  isNpmFromWindowsPath: pf4
}
// @from(Start 8889127, End 8889248)
function yY(A) {
  if (!A) return !1;
  let B = A.toLowerCase().trim();
  return ["1", "true", "yes", "on"].includes(B)
}
// @from(Start 8889250, End 8889327)
function tZ0() {
  return yY(process.env.DISABLE_NON_ESSENTIAL_MODEL_CALLS)
}
// @from(Start 8889329, End 8889639)
function eZ0(A) {
  let B = {};
  if (A)
    for (let Q of A) {
      let [I, ...G] = Q.split("=");
      if (!I || G.length === 0) throw new Error(`Invalid environment variable format: ${Q}, environment variables should be added as: -e KEY1=value1 -e KEY2=value2`);
      B[I] = G.join("=")
    }
  return B
}
// @from(Start 8889641, End 8889739)
function Xg() {
  return process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1"
}
// @from(Start 8889741, End 8889809)
function sL() {
  return process.env.CLOUD_ML_REGION || "us-east5"
}
// @from(Start 8889811, End 8889895)
function tf1() {
  return yY(process.env.CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR)
}
// @from(Start 8889897, End 8890430)
function AD0(A) {
  if (A?.startsWith("claude-3-5-haiku")) return process.env.VERTEX_REGION_CLAUDE_3_5_HAIKU || sL();
  if (A?.startsWith("claude-3-5-sonnet")) return process.env.VERTEX_REGION_CLAUDE_3_5_SONNET || sL();
  if (A?.startsWith("claude-3-7-sonnet")) return process.env.VERTEX_REGION_CLAUDE_3_7_SONNET || sL();
  if (A?.startsWith("claude-opus-4")) return process.env.VERTEX_REGION_CLAUDE_4_0_OPUS || sL();
  if (A?.startsWith("claude-sonnet-4")) return process.env.VERTEX_REGION_CLAUDE_4_0_SONNET || sL();
  return sL()
}
// @from(Start 8890533, End 8890586)
ef1 = n.enum(["local", "user", "project", "dynamic"])
// @from(Start 8890590, End 8890639)
WJ8 = n.enum(["stdio", "sse", "sse-ide", "http"])
// @from(Start 8890643, End 8890848)
Av1 = n.object({
    type: n.literal("stdio").optional(),
    command: n.string().min(1, "Command cannot be empty"),
    args: n.array(n.string()).default([]),
    env: n.record(n.string()).optional()
  })
// @from(Start 8890852, End 8890994)
lf4 = n.object({
    type: n.literal("sse"),
    url: n.string().url("Must be a valid URL"),
    headers: n.record(n.string()).optional()
  })
// @from(Start 8890998, End 8891123)
if4 = n.object({
    type: n.literal("sse-ide"),
    url: n.string().url("Must be a valid URL"),
    ideName: n.string()
  })
// @from(Start 8891127, End 8891289)
nf4 = n.object({
    type: n.literal("ws-ide"),
    url: n.string().url("Must be a valid URL"),
    ideName: n.string(),
    authToken: n.string().optional()
  })
// @from(Start 8891293, End 8891436)
af4 = n.object({
    type: n.literal("http"),
    url: n.string().url("Must be a valid URL"),
    headers: n.record(n.string()).optional()
  })
// @from(Start 8891440, End 8891480)
Bv1 = n.union([Av1, lf4, if4, nf4, af4])
// @from(Start 8891486, End 8891544)
Ug = n.object({
  mcpServers: n.record(n.string(), Bv1)
})
// @from(Start 8891550, End 8891890)
UN = {
    allowedTools: [],
    history: [],
    mcpContextUris: [],
    mcpServers: {},
    enabledMcpjsonServers: [],
    disabledMcpjsonServers: [],
    hasTrustDialogAccepted: !1,
    ignorePatterns: [],
    projectOnboardingSeenCount: 0,
    hasClaudeMdExternalIncludesApproved: !1,
    hasClaudeMdExternalIncludesWarningShown: !1
  }
// @from(Start 8891894, End 8892438)
NX = {
    numStartups: 0,
    installMethod: void 0,
    autoUpdates: void 0,
    theme: "dark",
    preferredNotifChannel: "auto",
    verbose: !1,
    editorMode: "normal",
    autoCompactEnabled: !0,
    hasSeenTasksHint: !1,
    queuedCommandUpHintCount: 0,
    diffTool: "auto",
    customApiKeyResponses: {
      approved: [],
      rejected: []
    },
    env: {},
    tipsHistory: {},
    memoryUsageCount: 0,
    parallelTasksCount: 1,
    promptQueueUseCount: 0,
    todoFeatureEnabled: !0,
    messageIdleNotifThresholdMs: 60000
  }
// @from(Start 8892442, End 8892762)
Bs = ["apiKeyHelper", "installMethod", "autoUpdates", "theme", "verbose", "preferredNotifChannel", "shiftEnterKeyBindingInstalled", "editorMode", "hasUsedBackslashReturn", "supervisorMode", "autoCompactEnabled", "diffTool", "env", "tipsHistory", "parallelTasksCount", "todoFeatureEnabled", "messageIdleNotifThresholdMs"]
// @from(Start 8892765, End 8892808)
function Zv1(A) {
  return Bs.includes(A)
}
// @from(Start 8892813, End 8892911)
Qs = ["allowedTools", "hasTrustDialogAccepted", "hasCompletedProjectOnboarding", "ignorePatterns"]
// @from(Start 8892914, End 8893121)
function QD0() {
  let A = dA(),
    B = $_(UX(), NX);
  while (!0) {
    if (B.projects?.[A]?.hasTrustDialogAccepted) return !0;
    let I = BD0(A, "..");
    if (I === A) break;
    A = I
  }
  return !1
}
// @from(Start 8893126, End 8893168)
OJ8 = {
    ...NX,
    autoUpdates: !1
  }
// @from(Start 8893172, End 8893193)
TJ8 = {
    ...UN
  }
// @from(Start 8893196, End 8893239)
function Dv1(A) {
  return Qs.includes(A)
}
// @from(Start 8893241, End 8893405)
function Ng(A, B) {
  if (B) {
    let Q = ZA();
    return A in Q && Array.isArray(Q[A])
  } else {
    let Q = UN[A];
    return A in UN && Array.isArray(Q)
  }
}
// @from(Start 8893407, End 8893609)
function tf4(A, B) {
  if (Ng(A, B)) return !1;
  if (B) {
    let Q = ZA();
    return A in Q && typeof Q[A] === "object"
  } else {
    let Q = UN[A];
    return A in UN && typeof Q === "object"
  }
}
// @from(Start 8893611, End 8893865)
function ef4(A, B) {
  let Q = Array.from(new Set(B));
  switch (A) {
    case "allowedTools":
      return Q.length > 0 ? Q : ["git diff:*"];
    case "ignorePatterns":
      return Q.length > 0 ? Q.map((I) => `Read(${I})`) : ["Read(secrets.env)"]
  }
}
// @from(Start 8893867, End 8894131)
function Av4(A, B) {
  let Q = ef4(A, B);
  switch (A) {
    case "allowedTools":
      return {
        permissions: {
          allow: Q
        }
      };
    case "ignorePatterns":
      return {
        permissions: {
          deny: Q
        }
      }
  }
}
// @from(Start 8894133, End 8894526)
function Bv4(A, B) {
  if (A !== "allowedTools" && A !== "ignorePatterns") return;
  console.warn(`Warning: "claude config add ${A}" has been migrated to settings.json and will be removed in a future version.

Instead, add rules to .claude/settings.json:
${JSON.stringify(Av4(A,B),null,2)}
See https://docs.anthropic.com/en/docs/claude-code/settings for more information on settings.json.
`)
}
// @from(Start 8894528, End 8895439)
function _G1(A, B, Q, I = !0) {
  if (E1("tengu_config_add", {
      key: A,
      global: Q,
      count: B.length
    }), !Ng(A, Q)) {
    if (Q) console.error(`Error: '${A}' is not a valid array config key in global config`);
    else console.error(`Error: '${A}' is not a valid array config key in project config`);
    if (I) process.exit(1);
    else return
  }
  if (Q) {
    let G = ZA(),
      Z = A,
      D = G[Z] || [],
      Y = new Set(D),
      W = Y.size;
    for (let J of B) Y.add(J);
    if (Y.size > W) {
      let J = Array.from(Y).sort();
      j0({
        ...G,
        [Z]: J
      })
    }
  } else {
    let G = A;
    Bv4(G, B);
    let Z = m9(),
      D = Z[G] || [],
      Y = new Set(D),
      W = Y.size;
    for (let J of B) Y.add(J);
    if (Y.size > W) {
      let J = Array.from(Y).sort();
      B5({
        ...Z,
        [G]: J
      })
    }
  }
  if (I) process.exit(0)
}
// @from(Start 8895441, End 8896388)
function ID0(A, B, Q, I = !0) {
  if (E1("tengu_config_remove", {
      key: A,
      global: Q,
      count: B.length
    }), Q) {
    let G = ZA();
    if (!(A in G) || !Array.isArray(G[A]))
      if (console.error(`Error: '${A}' is not a valid array config key in global config`), I) process.exit(1);
      else return;
    let Z = A,
      D = G[Z];
    if (!D) D = [];
    let Y = new Set(B),
      W = D.filter((J) => !Y.has(J));
    if (D.length !== W.length) j0({
      ...G,
      [Z]: W.sort()
    })
  } else {
    let G = m9(),
      Z = UN[A];
    if (!(A in UN) || !Array.isArray(Z))
      if (console.error(`Error: '${A}' is not a valid array config key in project config`), I) process.exit(1);
      else return;
    let D = A,
      Y = G[D];
    if (!Y) Y = [];
    let W = new Set(B),
      J = Y.filter((F) => !W.has(F));
    if (Y.length !== J.length) B5({
      ...G,
      [D]: J.sort()
    })
  }
  if (I) process.exit(0)
}
// @from(Start 8896390, End 8896509)
function j0(A) {
  GD0(UX(), {
    ...A,
    projects: $_(UX(), NX).projects
  }, NX), N_.config = null, N_.mtime = 0
}
// @from(Start 8896514, End 8896549)
N_ = {
  config: null,
  mtime: 0
}
// @from(Start 8896552, End 8897043)
function Qv1(A) {
  if (A.installMethod !== void 0) return A;
  let B = "unknown",
    Q = !0;
  switch (A.autoUpdaterStatus) {
    case "migrated":
      B = "local";
      break;
    case "installed":
      B = "native";
      break;
    case "disabled":
      Q = !1;
      break;
    case "enabled":
    case "no_permissions":
    case "not_configured":
      B = "global";
      break;
    case void 0:
      break
  }
  return {
    ...A,
    installMethod: B,
    autoUpdates: Q
  }
}
// @from(Start 8897045, End 8897439)
function ZA() {
  try {
    let A = x1().existsSync(UX()) ? x1().statSync(UX()) : null;
    if (N_.config && A) {
      if (A.mtimeMs <= N_.mtime) return N_.config
    }
    let B = Qv1($_(UX(), NX));
    if (A) N_ = {
      config: B,
      mtime: A.mtimeMs
    };
    else N_ = {
      config: B,
      mtime: Date.now()
    };
    return Qv1(B)
  } catch {
    return Qv1($_(UX(), NX))
  }
}
// @from(Start 8897441, End 8897637)
function jG1(A) {
  let B = ZA();
  if (B.customApiKeyResponses?.approved?.includes(A)) return "approved";
  if (B.customApiKeyResponses?.rejected?.includes(A)) return "rejected";
  return "new"
}
// @from(Start 8897639, End 8897884)
function GD0(A, B, Q) {
  let I = sf4(A),
    G = x1();
  if (!G.existsSync(I)) G.mkdirSync(I);
  let Z = Object.fromEntries(Object.entries(B).filter(([D, Y]) => JSON.stringify(Y) !== JSON.stringify(Q[D])));
  eM(A, JSON.stringify(Z, null, 2))
}
// @from(Start 8897889, End 8897897)
Gv1 = !1
// @from(Start 8897900, End 8897966)
function ZD0() {
  if (Gv1) return;
  Gv1 = !0, $_(UX(), NX, !0)
}
// @from(Start 8897968, End 8898451)
function $_(A, B, Q) {
  if (!Gv1) throw new Error("Config accessed before allowed.");
  if (!x1().existsSync(A)) return Ec(B);
  try {
    let I = x1().readFileSync(A, {
      encoding: "utf-8"
    });
    try {
      let G = JSON.parse(I);
      return {
        ...Ec(B),
        ...G
      }
    } catch (G) {
      let Z = G instanceof Error ? G.message : String(G);
      throw new Vv(Z, A, B)
    }
  } catch (I) {
    if (I instanceof Vv && Q) throw I;
    return Ec(B)
  }
}
// @from(Start 8898456, End 8898675)
DD0 = L0(() => {
  let A = e9();
  try {
    return of4("git rev-parse --show-toplevel", {
      cwd: A,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"]
    }).trim()
  } catch {
    return BD0(A)
  }
})
// @from(Start 8898678, End 8898891)
function m9() {
  let A = DD0(),
    B = $_(UX(), NX);
  if (!B.projects) return UN;
  let Q = B.projects[A] ?? UN;
  if (typeof Q.allowedTools === "string") Q.allowedTools = Z8(Q.allowedTools) ?? [];
  return Q
}
// @from(Start 8898893, End 8899039)
function B5(A) {
  let B = DD0(),
    Q = $_(UX(), NX);
  GD0(UX(), {
    ...Q,
    projects: {
      ...Q.projects,
      [B]: A
    }
  }, NX)
}
// @from(Start 8899041, End 8899200)
function yG1() {
  let A = ZA();
  return !!(process.env.DISABLE_AUTOUPDATER || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC || A.autoUpdates === !1)
}
// @from(Start 8899202, End 8899465)
function kG1() {
  if (T9()) return !1;
  let B = ZA(),
    Q = B.oauthAccount?.organizationRole,
    I = B.oauthAccount?.workspaceRole;
  if (!Q || !I) return !0;
  return ["admin", "billing"].includes(Q) || ["workspace_admin", "workspace_billing"].includes(I)
}
// @from(Start 8899467, End 8899763)
function Qv4(A) {
  let B = Z8(A),
    Q = {};
  if (B && typeof B === "object") {
    let I = Ug.safeParse(B);
    if (I.success) {
      let G = I.data;
      for (let [Z, D] of Object.entries(G.mcpServers)) Q[Z] = D
    } else M6(`Error parsing .mcp.json: ${I.error.message}`)
  }
  return Q
}
// @from(Start 8899765, End 8899882)
function Yv1(A) {
  let B = Iv1(dA(), ".mcp.json");
  eM(B, JSON.stringify(A, null, 2), {
    encoding: "utf8"
  })
}
// @from(Start 8899887, End 8900406)
vC = L0(() => {
  let A = Iv1(dA(), ".mcp.json");
  if (!x1().existsSync(A)) return {};
  try {
    let B = x1().readFileSync(A, {
        encoding: "utf-8"
      }),
      Q = Qv4(B);
    return E1("tengu_mcpjson_found", {
      numServers: Object.keys(Q).length
    }), Q
  } catch {}
  return {}
}, () => {
  let A = dA(),
    B = Iv1(A, ".mcp.json");
  if (x1().existsSync(B)) try {
    let Q = x1().readFileSync(B, {
      encoding: "utf-8"
    });
    return `${A}:${Q}`
  } catch {
    return A
  }
  return A
})
// @from(Start 8900409, End 8900556)
function fx() {
  let A = ZA();
  if (A.userID) return A.userID;
  let B = rf4(32).toString("hex");
  return j0({
    ...A,
    userID: B
  }), B
}
// @from(Start 8900558, End 8900682)
function YD0() {
  let A = ZA();
  if (!A.firstStartTime) j0({
    ...A,
    firstStartTime: new Date().toISOString()
  })
}
// @from(Start 8900684, End 8901085)
function WD0(A, B) {
  if (E1("tengu_config_get", {
      key: A,
      global: B
    }), B) {
    if (!Zv1(A)) console.error(`Error: '${A}' is not a valid config key. Valid keys are: ${Bs.join(", ")}`), process.exit(1);
    return ZA()[A]
  } else {
    if (!Dv1(A)) console.error(`Error: '${A}' is not a valid config key. Valid keys are: ${Qs.join(", ")}`), process.exit(1);
    return m9()[A]
  }
}
// @from(Start 8901087, End 8902644)
function JD0(A, B, Q) {
  if (E1("tengu_config_set", {
      key: A,
      global: Q
    }), Q) {
    if (!Zv1(A)) console.error(`Error: Cannot set '${A}'. Only these keys can be modified: ${Bs.join(", ")}`), process.exit(1);
    if (tf4(A, Q) && typeof B === "string") try {
      let G = JSON.parse(B);
      if (typeof G !== "object" || G === null || Array.isArray(G)) console.error("Error: 'env' must be a valid JSON object"), process.exit(1);
      let Z = ZA();
      j0({
        ...Z,
        [A]: G
      }), process.exit(0)
    } catch (G) {
      console.error(`Error: Failed to parse JSON for 'env': ${G instanceof Error?G.message:String(G)}`), process.exit(1)
    }
    if (Ng(A, Q) && typeof B === "string") {
      console.warn(UA.yellow(`Warning: '${A}' is an array type. Automatically using 'config add' instead of 'config set'.`));
      let G = B.split(",").map((Z) => Z.trim()).filter((Z) => Z.length > 0);
      _G1(A, G, Q);
      return
    }
    let I = ZA();
    j0({
      ...I,
      [A]: B
    })
  } else {
    if (!Dv1(A)) console.error(`Error: Cannot set '${A}'. Only these keys can be modified: ${Qs.join(", ")}. Did you mean --global?`), process.exit(1);
    if (Ng(A, Q) && typeof B === "string") {
      console.warn(UA.yellow(`Warning: '${A}' is an array type. Automatically using 'config add' instead of 'config set'.`));
      let G = B.split(",").map((Z) => Z.trim()).filter((Z) => Z.length > 0);
      _G1(A, G, Q);
      return
    }
    let I = m9();
    B5({
      ...I,
      [A]: B
    })
  }
  process.exit(0)
}
// @from(Start 8902646, End 8903128)
function FD0(A, B) {
  if (E1("tengu_config_delete", {
      key: A,
      global: B
    }), B) {
    if (!Zv1(A)) console.error(`Error: Cannot delete '${A}'. Only these keys can be modified: ${Bs.join(", ")}`), process.exit(1);
    let Q = ZA();
    delete Q[A], j0(Q)
  } else {
    if (!Dv1(A)) console.error(`Error: Cannot delete '${A}'. Only these keys can be modified: ${Qs.join(", ")}. Did you mean --global?`), process.exit(1);
    let Q = m9();
    delete Q[A], B5(Q)
  }
}
// @from(Start 8903130, End 8903258)
function XD0(A) {
  if (E1("tengu_config_list", {
      global: A
    }), A) return o21(ZA(), Bs);
  else return o21(m9(), Qs)
}
// @from(Start 8903260, End 8903368)
function VD0() {
  let A = m6();
  Object.assign(process.env, ZA().env), Object.assign(process.env, A.env)
}
// @from(Start 8903373, End 8903389)
PZ = I1(U1(), 1)
// @from(Start 8903395, End 8903411)
q_ = I1(U1(), 1)
// @from(Start 8903446, End 8903887)
function Wv1() {
  let {
    env: A
  } = CD0, {
    TERM: B,
    TERM_PROGRAM: Q
  } = A;
  if (CD0.platform !== "win32") return B !== "linux";
  return Boolean(A.WT_SESSION) || Boolean(A.TERMINUS_SUBLIME) || A.ConEmuTask === "{cmd::Cmder}" || Q === "Terminus-Sublime" || Q === "vscode" || B === "xterm-256color" || B === "alacritty" || B === "rxvt-unicode" || B === "rxvt-unicode-256color" || A.TERMINAL_EMULATOR === "JetBrains-JediTerm"
}
// @from(Start 8903892, End 8909328)
KD0 = {
    circleQuestionMark: "(?)",
    questionMarkPrefix: "(?)",
    square: "█",
    squareDarkShade: "▓",
    squareMediumShade: "▒",
    squareLightShade: "░",
    squareTop: "▀",
    squareBottom: "▄",
    squareLeft: "▌",
    squareRight: "▐",
    squareCenter: "■",
    bullet: "●",
    dot: "․",
    ellipsis: "…",
    pointerSmall: "›",
    triangleUp: "▲",
    triangleUpSmall: "▴",
    triangleDown: "▼",
    triangleDownSmall: "▾",
    triangleLeftSmall: "◂",
    triangleRightSmall: "▸",
    home: "⌂",
    heart: "♥",
    musicNote: "♪",
    musicNoteBeamed: "♫",
    arrowUp: "↑",
    arrowDown: "↓",
    arrowLeft: "←",
    arrowRight: "→",
    arrowLeftRight: "↔",
    arrowUpDown: "↕",
    almostEqual: "≈",
    notEqual: "≠",
    lessOrEqual: "≤",
    greaterOrEqual: "≥",
    identical: "≡",
    infinity: "∞",
    subscriptZero: "₀",
    subscriptOne: "₁",
    subscriptTwo: "₂",
    subscriptThree: "₃",
    subscriptFour: "₄",
    subscriptFive: "₅",
    subscriptSix: "₆",
    subscriptSeven: "₇",
    subscriptEight: "₈",
    subscriptNine: "₉",
    oneHalf: "½",
    oneThird: "⅓",
    oneQuarter: "¼",
    oneFifth: "⅕",
    oneSixth: "⅙",
    oneEighth: "⅛",
    twoThirds: "⅔",
    twoFifths: "⅖",
    threeQuarters: "¾",
    threeFifths: "⅗",
    threeEighths: "⅜",
    fourFifths: "⅘",
    fiveSixths: "⅚",
    fiveEighths: "⅝",
    sevenEighths: "⅞",
    line: "─",
    lineBold: "━",
    lineDouble: "═",
    lineDashed0: "┄",
    lineDashed1: "┅",
    lineDashed2: "┈",
    lineDashed3: "┉",
    lineDashed4: "╌",
    lineDashed5: "╍",
    lineDashed6: "╴",
    lineDashed7: "╶",
    lineDashed8: "╸",
    lineDashed9: "╺",
    lineDashed10: "╼",
    lineDashed11: "╾",
    lineDashed12: "−",
    lineDashed13: "–",
    lineDashed14: "‐",
    lineDashed15: "⁃",
    lineVertical: "│",
    lineVerticalBold: "┃",
    lineVerticalDouble: "║",
    lineVerticalDashed0: "┆",
    lineVerticalDashed1: "┇",
    lineVerticalDashed2: "┊",
    lineVerticalDashed3: "┋",
    lineVerticalDashed4: "╎",
    lineVerticalDashed5: "╏",
    lineVerticalDashed6: "╵",
    lineVerticalDashed7: "╷",
    lineVerticalDashed8: "╹",
    lineVerticalDashed9: "╻",
    lineVerticalDashed10: "╽",
    lineVerticalDashed11: "╿",
    lineDownLeft: "┐",
    lineDownLeftArc: "╮",
    lineDownBoldLeftBold: "┓",
    lineDownBoldLeft: "┒",
    lineDownLeftBold: "┑",
    lineDownDoubleLeftDouble: "╗",
    lineDownDoubleLeft: "╖",
    lineDownLeftDouble: "╕",
    lineDownRight: "┌",
    lineDownRightArc: "╭",
    lineDownBoldRightBold: "┏",
    lineDownBoldRight: "┎",
    lineDownRightBold: "┍",
    lineDownDoubleRightDouble: "╔",
    lineDownDoubleRight: "╓",
    lineDownRightDouble: "╒",
    lineUpLeft: "┘",
    lineUpLeftArc: "╯",
    lineUpBoldLeftBold: "┛",
    lineUpBoldLeft: "┚",
    lineUpLeftBold: "┙",
    lineUpDoubleLeftDouble: "╝",
    lineUpDoubleLeft: "╜",
    lineUpLeftDouble: "╛",
    lineUpRight: "└",
    lineUpRightArc: "╰",
    lineUpBoldRightBold: "┗",
    lineUpBoldRight: "┖",
    lineUpRightBold: "┕",
    lineUpDoubleRightDouble: "╚",
    lineUpDoubleRight: "╙",
    lineUpRightDouble: "╘",
    lineUpDownLeft: "┤",
    lineUpBoldDownBoldLeftBold: "┫",
    lineUpBoldDownBoldLeft: "┨",
    lineUpDownLeftBold: "┥",
    lineUpBoldDownLeftBold: "┩",
    lineUpDownBoldLeftBold: "┪",
    lineUpDownBoldLeft: "┧",
    lineUpBoldDownLeft: "┦",
    lineUpDoubleDownDoubleLeftDouble: "╣",
    lineUpDoubleDownDoubleLeft: "╢",
    lineUpDownLeftDouble: "╡",
    lineUpDownRight: "├",
    lineUpBoldDownBoldRightBold: "┣",
    lineUpBoldDownBoldRight: "┠",
    lineUpDownRightBold: "┝",
    lineUpBoldDownRightBold: "┡",
    lineUpDownBoldRightBold: "┢",
    lineUpDownBoldRight: "┟",
    lineUpBoldDownRight: "┞",
    lineUpDoubleDownDoubleRightDouble: "╠",
    lineUpDoubleDownDoubleRight: "╟",
    lineUpDownRightDouble: "╞",
    lineDownLeftRight: "┬",
    lineDownBoldLeftBoldRightBold: "┳",
    lineDownLeftBoldRightBold: "┯",
    lineDownBoldLeftRight: "┰",
    lineDownBoldLeftBoldRight: "┱",
    lineDownBoldLeftRightBold: "┲",
    lineDownLeftRightBold: "┮",
    lineDownLeftBoldRight: "┭",
    lineDownDoubleLeftDoubleRightDouble: "╦",
    lineDownDoubleLeftRight: "╥",
    lineDownLeftDoubleRightDouble: "╤",
    lineUpLeftRight: "┴",
    lineUpBoldLeftBoldRightBold: "┻",
    lineUpLeftBoldRightBold: "┷",
    lineUpBoldLeftRight: "┸",
    lineUpBoldLeftBoldRight: "┹",
    lineUpBoldLeftRightBold: "┺",
    lineUpLeftRightBold: "┶",
    lineUpLeftBoldRight: "┵",
    lineUpDoubleLeftDoubleRightDouble: "╩",
    lineUpDoubleLeftRight: "╨",
    lineUpLeftDoubleRightDouble: "╧",
    lineUpDownLeftRight: "┼",
    lineUpBoldDownBoldLeftBoldRightBold: "╋",
    lineUpDownBoldLeftBoldRightBold: "╈",
    lineUpBoldDownLeftBoldRightBold: "╇",
    lineUpBoldDownBoldLeftRightBold: "╊",
    lineUpBoldDownBoldLeftBoldRight: "╉",
    lineUpBoldDownLeftRight: "╀",
    lineUpDownBoldLeftRight: "╁",
    lineUpDownLeftBoldRight: "┽",
    lineUpDownLeftRightBold: "┾",
    lineUpBoldDownBoldLeftRight: "╂",
    lineUpDownLeftBoldRightBold: "┿",
    lineUpBoldDownLeftBoldRight: "╃",
    lineUpBoldDownLeftRightBold: "╄",
    lineUpDownBoldLeftBoldRight: "╅",
    lineUpDownBoldLeftRightBold: "╆",
    lineUpDoubleDownDoubleLeftDoubleRightDouble: "╬",
    lineUpDoubleDownDoubleLeftRight: "╫",
    lineUpDownLeftDoubleRightDouble: "╪",
    lineCross: "╳",
    lineBackslash: "╲",
    lineSlash: "╱"
  }
// @from(Start 8909332, End 8910041)
HD0 = {
    tick: "✔",
    info: "ℹ",
    warning: "⚠",
    cross: "✘",
    squareSmall: "◻",
    squareSmallFilled: "◼",
    circle: "◯",
    circleFilled: "◉",
    circleDotted: "◌",
    circleDouble: "◎",
    circleCircle: "ⓞ",
    circleCross: "ⓧ",
    circlePipe: "Ⓘ",
    radioOn: "◉",
    radioOff: "◯",
    checkboxOn: "☒",
    checkboxOff: "☐",
    checkboxCircleOn: "ⓧ",
    checkboxCircleOff: "Ⓘ",
    pointer: "❯",
    triangleUpOutline: "△",
    triangleLeft: "◀",
    triangleRight: "▶",
    lozenge: "◆",
    lozengeOutline: "◇",
    hamburger: "☰",
    smiley: "㋡",
    mustache: "෴",
    star: "★",
    play: "▶",
    nodejs: "⬢",
    oneSeventh: "⅐",
    oneNinth: "⅑",
    oneTenth: "⅒"
  }
// @from(Start 8910045, End 8910789)
Iv4 = {
    tick: "√",
    info: "i",
    warning: "‼",
    cross: "×",
    squareSmall: "□",
    squareSmallFilled: "■",
    circle: "( )",
    circleFilled: "(*)",
    circleDotted: "( )",
    circleDouble: "( )",
    circleCircle: "(○)",
    circleCross: "(×)",
    circlePipe: "(│)",
    radioOn: "(*)",
    radioOff: "( )",
    checkboxOn: "[×]",
    checkboxOff: "[ ]",
    checkboxCircleOn: "(×)",
    checkboxCircleOff: "( )",
    pointer: ">",
    triangleUpOutline: "∆",
    triangleLeft: "◄",
    triangleRight: "►",
    lozenge: "♦",
    lozengeOutline: "◊",
    hamburger: "≡",
    smiley: "☺",
    mustache: "┌─┐",
    star: "✶",
    play: "►",
    nodejs: "♦",
    oneSeventh: "1/7",
    oneNinth: "1/9",
    oneTenth: "1/10"
  }
// @from(Start 8910793, End 8910827)
Gv4 = {
    ...KD0,
    ...HD0
  }
// @from(Start 8910831, End 8910865)
Zv4 = {
    ...KD0,
    ...Iv4
  }
// @from(Start 8910869, End 8910880)
Dv4 = Wv1()
// @from(Start 8910884, End 8910905)
Yv4 = Dv4 ? Gv4 : Zv4
// @from(Start 8910909, End 8910917)
A0 = Yv4
// @from(Start 8910921, End 8910946)
fJ8 = Object.entries(HD0)
// @from(Start 8910952, End 8910968)
oL = I1(U1(), 1)
// @from(Start 8910974, End 8910991)
hv4 = I1(U1(), 1)
// @from(Start 8910997, End 8911013)
Gs = I1(U1(), 1)
// @from(Start 8911017, End 8911035)
vv4 = I1(UD0(), 1)
// @from(Start 8911041, End 8911132)
ND0 = {
    info: "blue",
    success: "green",
    error: "red",
    warning: "yellow"
  }
// @from(Start 8911136, End 8911969)
$v4 = {
    styles: {
      container: ({
        variant: A
      }) => ({
        flexGrow: 1,
        borderStyle: "round",
        borderColor: ND0[A],
        gap: 1,
        paddingX: 1
      }),
      iconContainer: () => ({
        flexShrink: 0
      }),
      icon: ({
        variant: A
      }) => ({
        color: ND0[A]
      }),
      content: () => ({
        flexShrink: 1,
        flexGrow: 1,
        minWidth: 0,
        flexDirection: "column",
        gap: 1
      }),
      title: () => ({
        bold: !0
      }),
      message: () => ({})
    },
    config({
      variant: A
    }) {
      let B;
      if (A === "info") B = A0.info;
      if (A === "success") B = A0.tick;
      if (A === "error") B = A0.cross;
      if (A === "warning") B = A0.warning;
      return {
        icon: B
      }
    }
  }
// @from(Start 8911973, End 8911982)
$D0 = $v4
// @from(Start 8911988, End 8912162)
qv4 = {
    styles: {
      container: ({
        color: A
      }) => ({
        backgroundColor: A
      }),
      label: () => ({
        color: "black"
      })
    }
  }
// @from(Start 8912166, End 8912175)
qD0 = qv4
// @from(Start 8912181, End 8912294)
Mv4 = {
    styles: {
      input: ({
        isFocused: A
      }) => ({
        dimColor: !A
      })
    }
  }
// @from(Start 8912298, End 8912307)
MD0 = Mv4
// @from(Start 8912313, End 8912904)
Lv4 = {
    styles: {
      container: () => ({
        flexDirection: "column"
      }),
      option: ({
        isFocused: A
      }) => ({
        gap: 1,
        paddingLeft: A ? 0 : 2
      }),
      selectedIndicator: () => ({
        color: "green"
      }),
      focusIndicator: () => ({
        color: "blue"
      }),
      label({
        isFocused: A,
        isSelected: B
      }) {
        let Q;
        if (B) Q = "green";
        if (A) Q = "blue";
        return {
          color: Q
        }
      },
      highlightedText: () => ({
        bold: !0
      })
    }
  }
// @from(Start 8912908, End 8912917)
LD0 = Lv4
// @from(Start 8912923, End 8913186)
Rv4 = {
    styles: {
      list: () => ({
        flexDirection: "column"
      }),
      listItem: () => ({
        gap: 1
      }),
      marker: () => ({
        dimColor: !0
      }),
      content: () => ({
        flexDirection: "column"
      })
    }
  }
// @from(Start 8913190, End 8913199)
RD0 = Rv4
// @from(Start 8913205, End 8913542)
Ov4 = {
    styles: {
      container: () => ({
        flexGrow: 1,
        minWidth: 0
      }),
      completed: () => ({
        color: "magenta"
      }),
      remaining: () => ({
        dimColor: !0
      })
    },
    config: () => ({
      completedCharacter: A0.square,
      remainingCharacter: A0.squareLightShade
    })
  }
// @from(Start 8913546, End 8913555)
OD0 = Ov4
// @from(Start 8913561, End 8914152)
Tv4 = {
    styles: {
      container: () => ({
        flexDirection: "column"
      }),
      option: ({
        isFocused: A
      }) => ({
        gap: 1,
        paddingLeft: A ? 0 : 2
      }),
      selectedIndicator: () => ({
        color: "green"
      }),
      focusIndicator: () => ({
        color: "blue"
      }),
      label({
        isFocused: A,
        isSelected: B
      }) {
        let Q;
        if (B) Q = "green";
        if (A) Q = "blue";
        return {
          color: Q
        }
      },
      highlightedText: () => ({
        bold: !0
      })
    }
  }
// @from(Start 8914156, End 8914165)
TD0 = Tv4
// @from(Start 8914171, End 8914331)
Pv4 = {
    styles: {
      container: () => ({
        gap: 1
      }),
      frame: () => ({
        color: "blue"
      }),
      label: () => ({})
    }
  }
// @from(Start 8914335, End 8914344)
PD0 = Pv4
// @from(Start 8914350, End 8914441)
Sv4 = {
    success: "green",
    error: "red",
    warning: "yellow",
    info: "blue"
  }
// @from(Start 8914445, End 8914542)
_v4 = {
    success: A0.tick,
    error: A0.cross,
    warning: A0.warning,
    info: A0.info
  }
// @from(Start 8914546, End 8914869)
jv4 = {
    styles: {
      container: () => ({
        gap: 1
      }),
      iconContainer: () => ({
        flexShrink: 0
      }),
      icon: ({
        variant: A
      }) => ({
        color: Sv4[A]
      }),
      message: () => ({})
    },
    config: ({
      variant: A
    }) => ({
      icon: _v4[A]
    })
  }
// @from(Start 8914873, End 8914882)
SD0 = jv4
// @from(Start 8914888, End 8915202)
yv4 = {
    styles: {
      list: () => ({
        flexDirection: "column"
      }),
      listItem: () => ({
        gap: 1
      }),
      marker: () => ({
        dimColor: !0
      }),
      content: () => ({
        flexDirection: "column"
      })
    },
    config: () => ({
      marker: A0.line
    })
  }
// @from(Start 8915206, End 8915215)
_D0 = yv4
// @from(Start 8915221, End 8915276)
kv4 = {
    styles: {
      value: () => ({})
    }
  }
// @from(Start 8915280, End 8915289)
jD0 = kv4
// @from(Start 8915295, End 8915350)
xv4 = {
    styles: {
      value: () => ({})
    }
  }
// @from(Start 8915354, End 8915363)
yD0 = xv4
// @from(Start 8915369, End 8915424)
fv4 = {
    styles: {
      value: () => ({})
    }
  }
// @from(Start 8915428, End 8915437)
kD0 = fv4
// @from(Start 8915443, End 8915772)
bv4 = {
    components: {
      Alert: $D0,
      Badge: qD0,
      ConfirmInput: MD0,
      MultiSelect: LD0,
      OrderedList: RD0,
      ProgressBar: OD0,
      Select: TD0,
      Spinner: PD0,
      StatusMessage: SD0,
      UnorderedList: _D0,
      TextInput: jD0,
      EmailInput: yD0,
      PasswordInput: kD0
    }
  }
// @from(Start 8915776, End 8915803)
gv4 = Gs.createContext(bv4)
// @from(Start 8915809, End 8915866)
u8 = (A) => {
  return Gs.useContext(gv4).components[A]
}
// @from(Start 8915872, End 8915889)
mv4 = I1(U1(), 1)
// @from(Start 8915895, End 8915911)
NN = I1(U1(), 1)
// @from(Start 8915917, End 8915933)
qg = I1(U1(), 1)
// @from(Start 8915939, End 8915956)
xD0 = I1(U1(), 1)
// @from(Start 8915962, End 8915974)
Zs = A0.line
// @from(Start 8915980, End 8916021)
xG1 = xD0.createContext({
  marker: Zs
})
// @from(Start 8916024, End 8916329)
function fD0({
  children: A
}) {
  let {
    marker: B
  } = qg.useContext(xG1), {
    styles: Q
  } = u8("UnorderedList");
  return qg.default.createElement(h, {
    ...Q.listItem()
  }, qg.default.createElement(P, {
    ...Q.marker()
  }, B), qg.default.createElement(h, {
    ...Q.content()
  }, A))
}
// @from(Start 8916334, End 8916351)
vD0 = I1(U1(), 1)
// @from(Start 8916355, End 8916398)
Jv1 = vD0.createContext({
    depth: 0
  })
// @from(Start 8916401, End 8917031)
function dv4({
  children: A
}) {
  let {
    depth: B
  } = NN.useContext(Jv1), {
    styles: Q,
    config: I
  } = u8("UnorderedList"), G = NN.useMemo(() => ({
    depth: B + 1
  }), [B]), Z = NN.useMemo(() => {
    let {
      marker: D
    } = I();
    if (typeof D === "string") return {
      marker: D
    };
    if (Array.isArray(D)) return {
      marker: D[B] ?? D.at(-1) ?? Zs
    };
    return {
      marker: Zs
    }
  }, [I, B]);
  return NN.default.createElement(Jv1.Provider, {
    value: G
  }, NN.default.createElement(xG1.Provider, {
    value: Z
  }, NN.default.createElement(h, {
    ...Q.list()
  }, A)))
}
// @from(Start 8917052, End 8917068)
Mg = I1(U1(), 1)
// @from(Start 8917074, End 8917090)
Ds = I1(U1(), 1)
// @from(Start 8917093, End 8917557)
function bD0({
  isFocused: A,
  isSelected: B,
  children: Q
}) {
  let {
    styles: I
  } = u8("MultiSelect");
  return Ds.default.createElement(h, {
    ...I.option({
      isFocused: A
    })
  }, A && Ds.default.createElement(P, {
    ...I.focusIndicator()
  }, A0.pointer), Ds.default.createElement(P, {
    ...I.label({
      isFocused: A,
      isSelected: B
    })
  }, Q), B && Ds.default.createElement(P, {
    ...I.selectedIndicator()
  }, A0.tick))
}
// @from(Start 8917562, End 8917578)
EJ = I1(U1(), 1)
// @from(Start 8917636, End 8917961)
class Ys extends Map {
  first;
  constructor(A) {
    let B = [],
      Q, I, G = 0;
    for (let Z of A) {
      let D = {
        ...Z,
        previous: I,
        next: void 0,
        index: G
      };
      if (I) I.next = D;
      Q ||= D, B.push([Z.value, D]), G++, I = D
    }
    super(B);
    this.first = Q
  }
}
// @from(Start 8917966, End 8919612)
uv4 = (A, B) => {
    switch (B.type) {
      case "focus-next-option": {
        if (!A.focusedValue) return A;
        let Q = A.optionMap.get(A.focusedValue);
        if (!Q) return A;
        let I = Q.next;
        if (!I) return A;
        if (!(I.index >= A.visibleToIndex)) return {
          ...A,
          focusedValue: I.value
        };
        let Z = Math.min(A.optionMap.size, A.visibleToIndex + 1),
          D = Z - A.visibleOptionCount;
        return {
          ...A,
          focusedValue: I.value,
          visibleFromIndex: D,
          visibleToIndex: Z
        }
      }
      case "focus-previous-option": {
        if (!A.focusedValue) return A;
        let Q = A.optionMap.get(A.focusedValue);
        if (!Q) return A;
        let I = Q.previous;
        if (!I) return A;
        if (!(I.index <= A.visibleFromIndex)) return {
          ...A,
          focusedValue: I.value
        };
        let Z = Math.max(0, A.visibleFromIndex - 1),
          D = Z + A.visibleOptionCount;
        return {
          ...A,
          focusedValue: I.value,
          visibleFromIndex: Z,
          visibleToIndex: D
        }
      }
      case "toggle-focused-option": {
        if (!A.focusedValue) return A;
        if (A.value.includes(A.focusedValue)) {
          let Q = new Set(A.value);
          return Q.delete(A.focusedValue), {
            ...A,
            previousValue: A.value,
            value: [...Q]
          }
        }
        return {
          ...A,
          previousValue: A.value,
          value: [...A.value, A.focusedValue]
        }
      }
      case "reset":
        return B.state
    }
  }
// @from(Start 8919616, End 8920006)
hD0 = ({
    visibleOptionCount: A,
    defaultValue: B,
    options: Q
  }) => {
    let I = typeof A === "number" ? Math.min(A, Q.length) : Q.length,
      G = new Ys(Q),
      Z = B ?? [];
    return {
      optionMap: G,
      visibleOptionCount: I,
      focusedValue: G.first?.value,
      visibleFromIndex: 0,
      visibleToIndex: I,
      previousValue: Z,
      value: Z
    }
  }
// @from(Start 8920010, End 8921470)
mD0 = ({
    visibleOptionCount: A = 5,
    options: B,
    defaultValue: Q,
    onChange: I,
    onSubmit: G
  }) => {
    let [Z, D] = EJ.useReducer(uv4, {
      visibleOptionCount: A,
      defaultValue: Q,
      options: B
    }, hD0), [Y, W] = EJ.useState(B);
    if (B !== Y && !gD0(B, Y)) D({
      type: "reset",
      state: hD0({
        visibleOptionCount: A,
        defaultValue: Q,
        options: B
      })
    }), W(B);
    let J = EJ.useCallback(() => {
        D({
          type: "focus-next-option"
        })
      }, []),
      F = EJ.useCallback(() => {
        D({
          type: "focus-previous-option"
        })
      }, []),
      X = EJ.useCallback(() => {
        D({
          type: "toggle-focused-option"
        })
      }, []),
      V = EJ.useCallback(() => {
        G?.(Z.value)
      }, [Z.value, G]),
      C = EJ.useMemo(() => {
        return B.map((K, E) => ({
          ...K,
          index: E
        })).slice(Z.visibleFromIndex, Z.visibleToIndex)
      }, [B, Z.visibleFromIndex, Z.visibleToIndex]);
    return EJ.useEffect(() => {
      if (!gD0(Z.previousValue, Z.value)) I?.(Z.value)
    }, [Z.previousValue, Z.value, B, I]), {
      focusedValue: Z.focusedValue,
      visibleFromIndex: Z.visibleFromIndex,
      visibleToIndex: Z.visibleToIndex,
      value: Z.value,
      visibleOptions: C,
      focusNextOption: J,
      focusPreviousOption: F,
      toggleFocusedOption: X,
      submit: V
    }
  }
// @from(Start 8921476, End 8921732)
dD0 = ({
  isDisabled: A = !1,
  state: B
}) => {
  Z0((Q, I) => {
    if (I.downArrow) B.focusNextOption();
    if (I.upArrow) B.focusPreviousOption();
    if (Q === " ") B.toggleFocusedOption();
    if (I.return) B.submit()
  }, {
    isActive: !A
  })
}
// @from(Start 8921735, End 8922653)
function fG1({
  isDisabled: A = !1,
  visibleOptionCount: B = 5,
  highlightText: Q,
  options: I,
  defaultValue: G,
  onChange: Z,
  onSubmit: D
}) {
  let Y = mD0({
    visibleOptionCount: B,
    options: I,
    defaultValue: G,
    onChange: Z,
    onSubmit: D
  });
  dD0({
    isDisabled: A,
    state: Y
  });
  let {
    styles: W
  } = u8("MultiSelect");
  return Mg.default.createElement(h, {
    ...W.container()
  }, Y.visibleOptions.map((J) => {
    let F = J.label;
    if (Q && J.label.includes(Q)) {
      let X = J.label.indexOf(Q);
      F = Mg.default.createElement(Mg.default.Fragment, null, J.label.slice(0, X), Mg.default.createElement(P, {
        ...W.highlightedText()
      }, Q), J.label.slice(X + Q.length))
    }
    return Mg.default.createElement(bD0, {
      key: J.value,
      isFocused: !A && Y.focusedValue === J.value,
      isSelected: Y.value.includes(J.value)
    }, F)
  }))
}
// @from(Start 8922658, End 8922675)
uD0 = I1(U1(), 1)
// @from(Start 8922681, End 8922698)
cv4 = I1(U1(), 1)
// @from(Start 8922704, End 8922721)
pv4 = I1(U1(), 1)
// @from(Start 8922727, End 8922743)
Ws = I1(U1(), 1)
// @from(Start 8922749, End 8922766)
lv4 = I1(U1(), 1)
// @from(Start 8922772, End 8922789)
pD0 = I1(U1(), 1)
// @from(Start 8922795, End 8922812)
nv4 = I1(U1(), 1)
// @from(Start 8922818, End 8922835)
vG1 = I1(U1(), 1)
// @from(Start 8922841, End 8922858)
iv4 = I1(U1(), 1)
// @from(Start 8922864, End 8922885)
mX8 = UA.inverse(" ")
// @from(Start 8922891, End 8922907)
bC = I1(U1(), 1)
// @from(Start 8922913, End 8922929)
Lg = I1(U1(), 1)
// @from(Start 8922935, End 8922952)
cD0 = I1(U1(), 1)
// @from(Start 8922958, End 8923004)
bG1 = cD0.createContext({
  marker: A0.line
})
// @from(Start 8923007, End 8923310)
function gG1({
  children: A
}) {
  let {
    marker: B
  } = Lg.useContext(bG1), {
    styles: Q
  } = u8("OrderedList");
  return Lg.default.createElement(h, {
    ...Q.listItem()
  }, Lg.default.createElement(P, {
    ...Q.marker()
  }, B), Lg.default.createElement(h, {
    ...Q.content()
  }, A))
}
// @from(Start 8923315, End 8923332)
lD0 = I1(U1(), 1)
// @from(Start 8923336, End 8923381)
Fv1 = lD0.createContext({
    marker: ""
  })
// @from(Start 8923384, End 8924085)
function rL({
  children: A
}) {
  let {
    marker: B
  } = bC.useContext(Fv1), {
    styles: Q
  } = u8("OrderedList"), I = 0;
  for (let Z of bC.default.Children.toArray(A)) {
    if (!bC.isValidElement(Z) || Z.type !== gG1) continue;
    I++
  }
  let G = String(I).length;
  return bC.default.createElement(h, {
    ...Q.list()
  }, bC.default.Children.map(A, (Z, D) => {
    if (!bC.isValidElement(Z) || Z.type !== gG1) return Z;
    let Y = `${String(D+1).padStart(G)}.`,
      W = `${B}${Y}`;
    return bC.default.createElement(Fv1.Provider, {
      value: {
        marker: W
      }
    }, bC.default.createElement(bG1.Provider, {
      value: {
        marker: W
      }
    }, Z))
  }))
}
// @from(Start 8924105, End 8924122)
sv4 = I1(U1(), 1)
// @from(Start 8924128, End 8924145)
Xv1 = I1(U1(), 1)
// @from(Start 8924151, End 8924168)
av4 = I1(U1(), 1)
// @from(Start 8924174, End 8924195)
HV8 = UA.inverse(" ")
// @from(Start 8924201, End 8924218)
rv4 = I1(U1(), 1)
// @from(Start 8924224, End 8924241)
ov4 = I1(U1(), 1)
// @from(Start 8924247, End 8924264)
ev4 = I1(U1(), 1)
// @from(Start 8924270, End 8924287)
hG1 = I1(U1(), 1)
// @from(Start 8924293, End 8924310)
tv4 = I1(U1(), 1)
// @from(Start 8924316, End 8924337)
hV8 = UA.inverse(" ")
// @from(Start 8924340, End 8925022)
function iD0({
  isFocused: A,
  isSelected: B,
  children: Q,
  shouldShowDownArrow: I,
  shouldShowUpArrow: G
}) {
  let {
    styles: Z
  } = u8("Select");
  return oL.default.createElement(h, null, A ? oL.default.createElement(P, {
    ...Z.focusIndicator()
  }, A0.pointer, " ") : I ? oL.default.createElement(P, {
    color: "secondaryText"
  }, A0.arrowDown, " ") : G ? oL.default.createElement(P, {
    color: "secondaryText"
  }, A0.arrowUp, " ") : oL.default.createElement(P, null, "  "), oL.default.createElement(P, {
    ...Z.label({
      isFocused: A,
      isSelected: B
    })
  }, Q), B && oL.default.createElement(P, {
    ...Z.selectedIndicator()
  }, A0.tick))
}
// @from(Start 8925027, End 8925043)
UJ = I1(U1(), 1)
// @from(Start 8925101, End 8925427)
class mG1 extends Map {
  first;
  constructor(A) {
    let B = [],
      Q, I, G = 0;
    for (let Z of A) {
      let D = {
        ...Z,
        previous: I,
        next: void 0,
        index: G
      };
      if (I) I.next = D;
      Q ||= D, B.push([Z.value, D]), G++, I = D
    }
    super(B);
    this.first = Q
  }
}
// @from(Start 8925432, End 8926831)
Bb4 = (A, B) => {
    switch (B.type) {
      case "focus-next-option": {
        if (!A.focusedValue) return A;
        let Q = A.optionMap.get(A.focusedValue);
        if (!Q) return A;
        let I = Q.next;
        if (!I) return A;
        if (!(I.index >= A.visibleToIndex)) return {
          ...A,
          focusedValue: I.value
        };
        let Z = Math.min(A.optionMap.size, A.visibleToIndex + 1),
          D = Z - A.visibleOptionCount;
        return {
          ...A,
          focusedValue: I.value,
          visibleFromIndex: D,
          visibleToIndex: Z
        }
      }
      case "focus-previous-option": {
        if (!A.focusedValue) return A;
        let Q = A.optionMap.get(A.focusedValue);
        if (!Q) return A;
        let I = Q.previous;
        if (!I) return A;
        if (!(I.index <= A.visibleFromIndex)) return {
          ...A,
          focusedValue: I.value
        };
        let Z = Math.max(0, A.visibleFromIndex - 1),
          D = Z + A.visibleOptionCount;
        return {
          ...A,
          focusedValue: I.value,
          visibleFromIndex: Z,
          visibleToIndex: D
        }
      }
      case "select-focused-option":
        return {
          ...A, value: A.focusedValue
        };
      case "reset":
        return B.state;
      case "set-focus":
        return {
          ...A, focusedValue: B.value
        }
    }
  }
// @from(Start 8926835, End 8927214)
nD0 = ({
    visibleOptionCount: A,
    defaultValue: B,
    options: Q,
    initialFocusValue: I
  }) => {
    let G = typeof A === "number" ? Math.min(A, Q.length) : Q.length,
      Z = new mG1(Q);
    return {
      optionMap: Z,
      visibleOptionCount: G,
      focusedValue: I || Z.first?.value,
      visibleFromIndex: 0,
      visibleToIndex: G,
      value: B
    }
  }
// @from(Start 8927218, End 8928843)
aD0 = ({
    visibleOptionCount: A = 5,
    options: B,
    defaultValue: Q,
    onChange: I,
    onCancel: G,
    onFocus: Z,
    focusValue: D
  }) => {
    let [Y, W] = UJ.useReducer(Bb4, {
      visibleOptionCount: A,
      defaultValue: Q,
      options: B,
      initialFocusValue: D
    }, nD0), [J, F] = UJ.useState(B);
    if (B !== J && !Ab4(B, J)) W({
      type: "reset",
      state: nD0({
        visibleOptionCount: A,
        defaultValue: Y.value || Q,
        options: B,
        initialFocusValue: Y.focusedValue || D
      })
    }), F(B);
    let X = UJ.useCallback(() => {
        W({
          type: "focus-next-option"
        })
      }, []),
      V = UJ.useCallback(() => {
        W({
          type: "focus-previous-option"
        })
      }, []),
      C = UJ.useCallback(() => {
        W({
          type: "select-focused-option"
        })
      }, []),
      K = UJ.useMemo(() => {
        return B.map((E, N) => ({
          ...E,
          index: N
        })).slice(Y.visibleFromIndex, Y.visibleToIndex)
      }, [B, Y.visibleFromIndex, Y.visibleToIndex]);
    return UJ.useEffect(() => {
      if (Y.focusedValue) Z?.(Y.focusedValue)
    }, [Y.focusedValue, Z]), UJ.useEffect(() => {
      if (D) W({
        type: "set-focus",
        value: D
      })
    }, [D]), {
      focusedValue: Y.focusedValue,
      visibleFromIndex: Y.visibleFromIndex,
      visibleToIndex: Y.visibleToIndex,
      value: Y.value,
      visibleOptions: K,
      focusNextOption: X,
      focusPreviousOption: V,
      selectFocusedOption: C,
      onChange: I,
      onCancel: G,
      options: B
    }
  }
// @from(Start 8928849, End 8929452)
sD0 = ({
  isDisabled: A = !1,
  state: B
}) => {
  Z0((Q, I) => {
    if (I.downArrow || I.ctrl && Q === "n" || !I.ctrl && !I.shift && Q === "j") B.focusNextOption();
    if (I.upArrow || I.ctrl && Q === "p" || !I.ctrl && !I.shift && Q === "k") B.focusPreviousOption();
    if (I.return && B.focusedValue) B.selectFocusedOption?.(), B.onChange?.(B.focusedValue);
    if (/^[0-9]+$/.test(Q)) {
      let G = parseInt(Q) - 1;
      if (G >= 0 && G < B.options.length) {
        B.onChange?.(B.options[G].value);
        return
      }
    }
    if (I.escape) B.onCancel?.()
  }, {
    isActive: !A
  })
}
// @from(Start 8929455, End 8931114)
function p0({
  isDisabled: A = !1,
  visibleOptionCount: B = 5,
  highlightText: Q,
  options: I,
  defaultValue: G,
  onCancel: Z,
  onChange: D,
  onFocus: Y,
  focusValue: W
}) {
  let J = aD0({
    visibleOptionCount: B,
    options: I,
    defaultValue: G,
    onChange: D,
    onCancel: Z,
    onFocus: Y,
    focusValue: W
  });
  sD0({
    isDisabled: A,
    state: J
  });
  let {
    styles: F
  } = u8("Select"), X = J.options.length.toString().length, V = Math.max(...J.options.map((C) => {
    return `${(J.options.findIndex((N)=>N.value===C.value)+1).toString()}.`.padEnd(X).length + C.label.length
  }));
  return q_.default.createElement(h, {
    ...F.container()
  }, J.visibleOptions.map((C, K) => {
    let E = C.label,
      N = E;
    if (Q && E.includes(Q)) {
      let s = E.indexOf(Q);
      N = q_.default.createElement(q_.default.Fragment, null, E.slice(0, s), q_.default.createElement(P, {
        ...F.highlightedText()
      }, Q), E.slice(s + Q.length))
    }
    let q = C.index === J.visibleFromIndex,
      O = C.index === J.visibleToIndex - 1,
      R = J.visibleToIndex < I.length,
      T = J.visibleFromIndex > 0,
      _ = `${J.visibleFromIndex+K+1}.`.padEnd(X),
      k = _.length + E.length,
      i = V + 2 - k,
      x = Math.max(2, i);
    return q_.default.createElement(iD0, {
      key: C.value,
      isFocused: !A && J.focusedValue === C.value,
      isSelected: J.value === C.value,
      shouldShowDownArrow: R && O,
      shouldShowUpArrow: T && q
    }, UA.dim(_), " ", N, C.description && q_.default.createElement(P, {
      dimColor: C.dimDescription !== !1
    }, "  ".padEnd(x), C.description))
  }))
}
// @from(Start 8931119, End 8931136)
Vv1 = I1(U1(), 1)
// @from(Start 8931140, End 8931149)
rD0 = 800
// @from(Start 8931152, End 8931481)
function $N(A, B, Q) {
  let I = Vv1.useRef(0),
    G = Vv1.useRef();
  return () => {
    let Z = Date.now();
    if (Z - I.current <= rD0 && G.current) {
      if (G.current) clearTimeout(G.current), G.current = void 0;
      B(), A(!1)
    } else Q?.(), A(!0), G.current = setTimeout(() => A(!1), rD0);
    I.current = Z
  }
}
// @from(Start 8931486, End 8931503)
tD0 = I1(U1(), 1)
// @from(Start 8931509, End 8931522)
Cv1 = new Set
// @from(Start 8931525, End 8931585)
function dG1(A) {
  return Cv1.add(A), () => Cv1.delete(A)
}
// @from(Start 8931590, End 8931703)
oD0 = L0(() => {
  process.on("SIGINT", () => {
    qI(0)
  }), process.on("SIGTERM", () => {
    qI(143)
  })
})
// @from(Start 8931706, End 8931814)
function MI(A = 0) {
  qI(A).catch((B) => {
    M6(`Graceful shutdown failed: ${B}`), process.exit(A)
  })
}
// @from(Start 8931815, End 8932161)
async function qI(A = 0) {
  process.exitCode = A;
  try {
    let B = (async () => {
      try {
        await Promise.all(Array.from(Cv1).map((Q) => Q()))
      } catch {}
    })();
    await Promise.race([B, new Promise((Q, I) => setTimeout(() => I(new Error("Cleanup timeout")), 2000))]), process.exit(A)
  } catch {
    process.exit(A)
  }
}
// @from(Start 8932163, End 8932563)
function Y2(A) {
  let [B, Q] = tD0.useState({
    pending: !1,
    keyName: null
  }), I = $N((Z) => Q({
    pending: Z,
    keyName: "Ctrl-C"
  }), A ? A : async () => {
    await qI(0)
  }), G = $N((Z) => Q({
    pending: Z,
    keyName: "Ctrl-D"
  }), A ? A : async () => {
    await qI(0)
  });
  return Z0((Z, D) => {
    if (D.ctrl && Z === "c") I();
    if (D.ctrl && Z === "d") G()
  }), B
}
// @from(Start 8932568, End 8932584)
TZ = I1(U1(), 1)
// @from(Start 8932590, End 8932752)
tz = () => ({
  mode: "default",
  additionalWorkingDirectories: new Set,
  alwaysAllowRules: {},
  alwaysDenyRules: {},
  isBypassPermissionsModeAvailable: !1
})
// @from(Start 8932755, End 8933020)
function Qb4() {
  return {
    verbose: !1,
    mainLoopModel: null,
    maxRateLimitFallbackActive: !1,
    todoFeatureEnabled: !1,
    toolPermissionContext: tz(),
    mcp: {
      clients: [],
      tools: [],
      commands: [],
      resources: {}
    }
  }
}
// @from(Start 8933025, End 8933071)
AY0 = TZ.default.createContext([{}, (A) => A])
// @from(Start 8933075, End 8933109)
eD0 = TZ.default.createContext(!1)
// @from(Start 8933112, End 8933880)
function c3({
  children: A,
  initialState: B,
  onChangeAppState: Q
}) {
  if (TZ.useContext(eD0)) throw new Error("AppStateProvider can not be nested within another AppStateProvider");
  let [G, Z] = TZ.useState({
    currentState: B ?? Qb4(),
    previousState: null
  }), D = TZ.useCallback((W) => Z(({
    currentState: J
  }) => ({
    currentState: W(J),
    previousState: J
  })), []), Y = TZ.useMemo(() => {
    let W = [G.currentState, D];
    return W.__IS_INITIALIZED__ = !0, W
  }, [G.currentState, D]);
  return TZ.useEffect(() => {
    Q?.({
      newState: G.currentState,
      oldState: G.previousState
    })
  }, [Q, G]), TZ.default.createElement(eD0.Provider, {
    value: !0
  }, TZ.default.createElement(AY0.Provider, {
    value: Y
  }, A))
}
// @from(Start 8933882, End 8934062)
function d5() {
  let A = TZ.useContext(AY0);
  if (!A.__IS_INITIALIZED__) throw new ReferenceError("useAppState cannot be called outside of an <AppStateProvider />");
  return A
}
// @from(Start 8934064, End 8935323)
function Ib4({
  filePath: A,
  errorDescription: B,
  onExit: Q,
  onReset: I
}) {
  Z0((D, Y) => {
    if (Y.escape) Q()
  });
  let G = Y2();
  return PZ.default.createElement(PZ.default.Fragment, null, PZ.default.createElement(h, {
    flexDirection: "column",
    borderColor: "error",
    borderStyle: "round",
    padding: 1,
    width: 70,
    gap: 1
  }, PZ.default.createElement(P, {
    bold: !0
  }, "Configuration Error"), PZ.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, PZ.default.createElement(P, null, "The configuration file at ", PZ.default.createElement(P, {
    bold: !0
  }, A), " contains invalid JSON."), PZ.default.createElement(P, null, B)), PZ.default.createElement(h, {
    flexDirection: "column"
  }, PZ.default.createElement(P, {
    bold: !0
  }, "Choose an option:"), PZ.default.createElement(p0, {
    options: [{
      label: "Exit and fix manually",
      value: "exit"
    }, {
      label: "Reset with default configuration",
      value: "reset"
    }],
    onChange: (D) => {
      if (D === "exit") Q();
      else I()
    },
    onCancel: Q
  }))), G.pending ? PZ.default.createElement(P, {
    dimColor: !0
  }, "Press ", G.keyName, " again to exit") : PZ.default.createElement(UI, null))
}
// @from(Start 8935328, End 8935340)
Gb4 = "dark"
// @from(Start 8935342, End 8935912)
async function BY0({
  error: A
}) {
  let B = {
    exitOnCtrlC: !1,
    theme: Gb4
  };
  await new Promise((Q) => {
    let {
      unmount: I
    } = n5(PZ.default.createElement(c3, null, PZ.default.createElement(Ib4, {
      filePath: A.filePath,
      errorDescription: A.message,
      onExit: () => {
        I(), Q(), process.exit(1)
      },
      onReset: () => {
        x1().writeFileSync(A.filePath, JSON.stringify(A.defaultConfig, null, 2), {
          flush: !1,
          encoding: "utf8"
        }), I(), Q(), process.exit(0)
      }
    })), B)
  })
}
// @from(Start 8935917, End 8935934)
KY1 = I1(s9(), 1)
// @from(Start 8935938, End 8935956)
Qu1 = I1(Hb1(), 1)
// @from(Start 8935960, End 8935977)
HY1 = I1(QR(), 1)
// @from(Start 8935981, End 8935999)
wg0 = I1(nP0(), 1)
// @from(Start 8936003, End 8936021)
Eg0 = I1(kv0(), 1)
// @from(Start 8936025, End 8936043)
Ug0 = I1(dZ1(), 1)
// @from(Start 8936047, End 8936065)
Ng0 = I1(uv0(), 1)
// @from(Start 8936069, End 8936086)
Iu1 = I1(QR(), 1)
// @from(Start 8936090, End 8936107)
$h = I1(mb0(), 1)
// @from(Start 8936111, End 8936129)
$g0 = I1(ob0(), 1)
// @from(Start 8936133, End 8936151)
qg0 = I1(Ig0(), 1)
// @from(Start 8936155, End 8936173)
Mg0 = I1(Kg0(), 1)
// @from(Start 8936177, End 8936194)
Sr = I1($Z1(), 1)
// @from(Start 8936198, End 8936215)
zY1 = I1(LN(), 1)
// @from(Start 8936217, End 8936420)
class Au1 {
  error(A, ...B) {
    b1(new Error(A))
  }
  warn(A, ...B) {
    b1(new Error(A))
  }
  info(A, ...B) {
    return
  }
  debug(A, ...B) {
    return
  }
  verbose(A, ...B) {
    return
  }
}
// @from(Start 8936425, End 8936442)
Hg0 = I1(QR(), 1)
// @from(Start 8936446, End 8936462)
Pr = I1(p8(), 1)
// @from(Start 8936465, End 8936766)
function MR() {
  return `claude-cli/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION} (external, ${process.env.CLAUDE_CODE_ENTRYPOINT})`
}
// @from(Start 8936768, End 8937195)
function CY1() {
  if (T9()) {
    let B = $Z();
    if (!B?.accessToken) return {
      headers: {},
      error: "No OAuth token available"
    };
    return {
      headers: {
        Authorization: `Bearer ${B.accessToken}`,
        "anthropic-beta": Kf
      }
    }
  }
  let A = qG(!1);
  if (!A) return {
    headers: {},
    error: "No API key available"
  };
  return {
    headers: {
      "x-api-key": A
    }
  }
}
// @from(Start 8937196, End 8940409)
class Bu1 {
  endpoint;
  timeout;
  pendingExports = [];
  isShutdown = !1;
  constructor(A = {}) {
    this.endpoint = "https://api.anthropic.com/api/claude_code/metrics", this.timeout = A.timeout || 5000
  }
  async export (A, B) {
    if (this.isShutdown) {
      B({
        code: Pr.ExportResultCode.FAILED,
        error: new Error("Exporter has been shutdown")
      });
      return
    }
    let Q = this.doExport(A, B);
    this.pendingExports.push(Q), Q.finally(() => {
      let I = this.pendingExports.indexOf(Q);
      if (I > -1) this.pendingExports.splice(I, 1)
    })
  }
  async doExport(A, B) {
    try {
      let Q = this.transformMetricsForInternal(A);
      O9(`Internal metrics payload: ${JSON.stringify(Q,null,2)}`);
      let I = CY1();
      if (I.error) {
        O9(`Metrics export failed: ${I.error}`), B({
          code: Pr.ExportResultCode.FAILED,
          error: new Error(I.error)
        });
        return
      }
      let G = {
          "Content-Type": "application/json",
          "User-Agent": `claude-code/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION}`,
          ...I.headers
        },
        Z = await P4.post(this.endpoint, Q, {
          timeout: this.timeout,
          headers: G
        });
      O9("Internal metrics exported successfully"), O9(`API Response: ${JSON.stringify(Z.data,null,2)}`), B({
        code: Pr.ExportResultCode.SUCCESS
      })
    } catch (Q) {
      O9(`Internal metrics export failed: ${Q instanceof Error?Q.message:String(Q)}`), b1(Q), B({
        code: Pr.ExportResultCode.FAILED,
        error: Q instanceof Error ? Q : new Error("Unknown export error")
      })
    }
  }
  transformMetricsForInternal(A) {
    return {
      resource_attributes: {
        "service.name": A.resource.attributes["service.name"] || "claude-code",
        "service.version": A.resource.attributes["service.version"] || "unknown"
      },
      metrics: A.scopeMetrics.flatMap((Q) => Q.metrics.map((I) => ({
        name: I.descriptor.name,
        description: I.descriptor.description,
        unit: I.descriptor.unit,
        data_points: this.extractDataPoints(I)
      })))
    }
  }
  extractDataPoints(A) {
    return (A.dataPoints || []).filter((Q) => typeof Q.value === "number").map((Q) => ({
      attributes: this.convertAttributes(Q.attributes),
      value: Q.value,
      timestamp: this.hrTimeToISOString(Q.endTime || Q.startTime || [Date.now() / 1000, 0])
    }))
  }
  async shutdown() {
    this.isShutdown = !0, await this.forceFlush(), O9("Internal metrics exporter shutdown complete")
  }
  async forceFlush() {
    await Promise.all(this.pendingExports), O9("Internal metrics exporter flush complete")
  }
  convertAttributes(A) {
    let B = {};
    if (A) {
      for (let [Q, I] of Object.entries(A))
        if (I !== void 0 && I !== null) B[Q] = String(I)
    }
    return B
  }
  hrTimeToISOString(A) {
    let [B] = A;
    return new Date(B * 1000).toISOString()
  }
  selectAggregationTemporality() {
    return Hg0.AggregationTemporality.DELTA
  }
}
// @from(Start 8940414, End 8940425)
nW6 = 60000
// @from(Start 8940429, End 8940439)
aW6 = 5000
// @from(Start 8940442, End 8940602)
function sW6() {
  if (!process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE) process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE = "delta"
}
// @from(Start 8940604, End 8942109)
function rW6() {
  let A = (process.env.OTEL_METRICS_EXPORTER || "").trim().split(",").filter(Boolean),
    B = parseInt(process.env.OTEL_METRIC_EXPORT_INTERVAL || nW6.toString()),
    Q = [];
  for (let I of A)
    if (I === "console") {
      let G = new HY1.ConsoleMetricExporter,
        Z = G.export.bind(G);
      G.export = (D, Y) => {
        if (D.resource && D.resource.attributes) console.log(`
=== Resource Attributes ===`), console.log(D.resource.attributes), console.log(`===========================
`);
        return Z(D, Y)
      }, Q.push(G)
    } else if (I === "otlp") {
    let G = process.env.OTEL_EXPORTER_OTLP_METRICS_PROTOCOL?.trim() || process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim();
    switch (G) {
      case "grpc":
        Q.push(new Eg0.OTLPMetricExporter);
        break;
      case "http/json":
        Q.push(new Ug0.OTLPMetricExporter);
        break;
      case "http/protobuf":
        Q.push(new wg0.OTLPMetricExporter);
        break;
      default:
        throw new Error(`Unknown protocol set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${G}`)
    }
  } else if (I === "prometheus") Q.push(new Ng0.PrometheusExporter);
  else throw new Error(`Unknown exporter type set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${I}`);
  return Q.map((I) => {
    if ("export" in I) return new Iu1.PeriodicExportingMetricReader({
      exporter: I,
      exportIntervalMillis: B
    });
    return I
  })
}
// @from(Start 8942111, End 8942964)
function oW6() {
  let A = (process.env.OTEL_LOGS_EXPORTER || "").trim().split(",").filter(Boolean),
    B = [];
  for (let Q of A)
    if (Q === "console") B.push(new $h.ConsoleLogRecordExporter);
    else if (Q === "otlp") {
    let I = process.env.OTEL_EXPORTER_OTLP_LOGS_PROTOCOL?.trim() || process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim();
    switch (I) {
      case "grpc":
        B.push(new qg0.OTLPLogExporter);
        break;
      case "http/json":
        B.push(new Mg0.OTLPLogExporter);
        break;
      case "http/protobuf":
        B.push(new $g0.OTLPLogExporter);
        break;
      default:
        throw new Error(`Unknown protocol set in OTEL_EXPORTER_OTLP_LOGS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${I}`)
    }
  } else throw new Error(`Unknown exporter type set in OTEL_LOGS_EXPORTER env var: ${Q}`);
  return B
}
// @from(Start 8942966, End 8943043)
function zg0() {
  return Boolean(process.env.CLAUDE_CODE_ENABLE_TELEMETRY)
}
// @from(Start 8943045, End 8943186)
function tW6() {
  let A = new Bu1;
  return new Iu1.PeriodicExportingMetricReader({
    exporter: A,
    exportIntervalMillis: 300000
  })
}
// @from(Start 8943188, End 8943218)
function eW6() {
  return !1
}
// @from(Start 8943220, End 8945771)
function Lg0() {
  sW6(), KY1.diag.setLogger(new Au1, KY1.DiagLogLevel.ERROR);
  let A = [];
  if (zg0()) A.push(...rW6());
  if (eW6()) A.push(tW6());
  let B = Sr.resourceFromAttributes({
      [zY1.ATTR_SERVICE_NAME]: "claude-code",
      [zY1.ATTR_SERVICE_VERSION]: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.VERSION
    }),
    Q = Sr.envDetector.detect(),
    I = Sr.resourceFromAttributes(Q.attributes || {}),
    G = B.merge(I),
    Z = new HY1.MeterProvider({
      resource: G,
      views: [],
      readers: A
    });
  if (zg0()) {
    let Y = oW6();
    if (Y.length > 0) {
      let W = new $h.LoggerProvider({
        resource: G
      });
      for (let F of Y) W.addLogRecordProcessor(new $h.BatchLogRecordProcessor(F, {
        scheduledDelayMillis: parseInt(process.env.OTEL_LOGS_EXPORT_INTERVAL || aW6.toString())
      }));
      Qu1.logs.setGlobalLoggerProvider(W), J9A(W);
      let J = Qu1.logs.getLogger("com.anthropic.claude_code.events", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.VERSION);
      X9A(J)
    }
  }
  return dG1(async () => {
    let Y = parseInt(process.env.CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS || "1000");
    try {
      let W = [Z.shutdown()],
        J = W9A();
      if (J) W.push(J.shutdown());
      await Promise.race([Promise.all(W), new Promise((F, X) => setTimeout(() => X(new Error("OpenTelemetry shutdown timeout")), Y))])
    } catch (W) {
      if (W instanceof Error && W.message.includes("timeout")) M6(`
OpenTelemetry telemetry flush timed out after ${Y}ms

To resolve this issue, you can:
1. Increase the timeout by setting CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS env var (e.g., 5000 for 5 seconds)
2. Check if your OpenTelemetry backend is experiencing scalability issues
3. Disable OpenTelemetry by unsetting CLAUDE_CODE_ENABLE_TELEMETRY env var

Current timeout: ${Y}ms
`);
      throw W
    }
  }), Z.getMeter("com.anthropic.claude_code", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.34"
  }.VERSION)
}
// @from(Start 8945776, End 8945900)
AJ6 = {
  OTEL_METRICS_INCLUDE_SESSION_ID: !0,
  OTEL_METRICS_INCLUDE_VERSION: !1,
  OTEL_METRICS_INCLUDE_ACCOUNT_UUID: !0
}
// @from(Start 8945903, End 8946016)
function Gu1(A) {
  let B = AJ6[A],
    Q = process.env[A];
  if (Q === void 0) return B;
  return Q === "true"
}
// @from(Start 8946018, End 8946809)
function wY1() {
  let A = fx(),
    B = y9(),
    Q = ZA(),
    I = Q.oauthAccount?.organizationUuid,
    G = Q.oauthAccount?.emailAddress,
    Z = Q.oauthAccount?.accountUuid,
    D = {
      "user.id": A
    };
  if (Gu1("OTEL_METRICS_INCLUDE_SESSION_ID")) D["session.id"] = B;
  if (Gu1("OTEL_METRICS_INCLUDE_VERSION")) D["app.version"] = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.34"
  }.VERSION;
  if (I) D["organization.id"] = I;
  if (G) D["user.email"] = G;
  if (Z && Gu1("OTEL_METRICS_INCLUDE_ACCOUNT_UUID")) D["user.account_uuid"] = Z;
  if (mA.terminal) D["terminal.type"] = mA.terminal;
  return D
}
// @from(Start 8946814, End 8946832)
rn0 = I1(Du1(), 1)
// @from(Start 8946838, End 8946856)
Sc1 = I1(sn0(), 1)
// @from(Start 8946859, End 8946988)
function zm() {
  return process.env.https_proxy || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.HTTP_PROXY
}
// @from(Start 8946993, End 8947086)
on0 = L0((A) => {
  return new Sc1.default.ProxyAgent({
    uri: A,
    pipelining: 1
  })
})
// @from(Start 8947089, End 8947170)
function tn0() {
  let A = zm();
  return A ? {
    dispatcher: on0(A)
  } : {}
}
// @from(Start 8947172, End 8947340)
function en0() {
  let A = zm();
  if (A) P4.defaults.proxy = !1, P4.defaults.httpsAgent = new rn0.default.HttpsProxyAgent(A), Sc1.default.setGlobalDispatcher(on0(A))
}
// @from(Start 8947345, End 8947515)
Aa0 = L0(() => {
  try {
    ZD0(), VD0(), oD0(), cM6(), YD0(), en0()
  } catch (A) {
    if (A instanceof Vv) return BY0({
      error: A
    });
    else throw A
  }
})
// @from(Start 8947518, End 8947854)
function cM6() {
  let A = Lg0();
  if (A) I9A(A, (Q, I) => {
    let G = A?.createCounter(Q, I);
    return {
      attributes: null,
      add(Z, D = {}) {
        if (this.attributes === null) this.attributes = wY1();
        let Y = {
          ...this.attributes,
          ...D
        };
        G?.add(Z, Y)
      }
    }
  })
}
// @from(Start 8948010, End 8948036)
sM6 = lM6(import.meta.url)
// @from(Start 8948039, End 8948270)
function Ba0(A) {
  let B;
  if (typeof Bun !== "undefined" && Bun.embeddedFiles?.length > 0) B = "./ripgrep.node";
  else B = aM6(nM6(iM6(import.meta.url)), "ripgrep.node");
  let {
    ripgrepMain: Q
  } = sM6(B);
  return Q(A)
}
// @from(Start 8948275, End 8948291)
HB = I1(U1(), 1)
// @from(Start 8948401, End 8948417)
pR = I1(U1(), 1)
// @from(Start 8948423, End 8948440)
kc1 = I1(U1(), 1)
// @from(Start 8948446, End 8948463)
Sj = I1(Ja0(), 1)
// @from(Start 8948469, End 8948520)
Fa0 = process.env.TERM_PROGRAM === "Apple_Terminal"
// @from(Start 8948524, End 8948531)
d6 = {}
// @from(Start 8951022, End 8951030)
Xa0 = d6
// @from(Start 8951036, End 8951054)
AJ1 = I1(wa0(), 1)
// @from(Start 8951057, End 8951290)
function Pj(A, B, {
  target: Q = "stdout",
  ...I
} = {}) {
  if (!AJ1.default[Q]) {
    if (I.fallback === !1) return A;
    return typeof I.fallback === "function" ? I.fallback(A, B) : `${A} (​${B}​)`
  }
  return Xa0.link(A, B)
}
// @from(Start 8951448, End 8951633)
Ea0 = ({
  children: A,
  url: B,
  fallback: Q = !0
}) => kc1.default.createElement(q31, {
  transform: (I) => Pj(I, B, {
    fallback: Q
  })
}, kc1.default.createElement(P, null, A))
// @from(Start 8951826, End 8951835)
BJ1 = Ea0
// @from(Start 8951841, End 8951858)
QJ1 = I1(U1(), 1)
// @from(Start 8951864, End 8951913)
IL6 = ["iTerm.app", "WezTerm", "Hyper", "VSCode"]
// @from(Start 8951916, End 8952206)
function kQ({
  url: A,
  children: B
}) {
  let Q = IL6.includes(mA.terminal ?? ""),
    I = B || A;
  if (Q || I !== A) return QJ1.default.createElement(BJ1, {
    url: A
  }, QJ1.default.createElement(P, null, I));
  else return QJ1.default.createElement(P, {
    underline: !0
  }, I)
}
// @from(Start 8952208, End 8953018)
function Ua0({
  onDone: A
}) {
  return Z0((B, Q) => {
    if (Q.ctrl && (B === "c" || B === "d") || Q.escape) A()
  }), pR.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    padding: 1,
    borderColor: "secondaryBorder"
  }, pR.default.createElement(h, {
    marginBottom: 1,
    flexDirection: "column"
  }, pR.default.createElement(P, {
    bold: !0
  }, "You've spent $5 on the Anthropic API this session."), pR.default.createElement(P, null, "Learn more about how to monitor your spending:"), pR.default.createElement(kQ, {
    url: "https://docs.anthropic.com/s/claude-code-cost"
  })), pR.default.createElement(h, null, pR.default.createElement(p0, {
    options: [{
      value: "ok",
      label: "Got it, thanks!"
    }],
    onChange: A,
    onCancel: A
  })))
}
// @from(Start 8953125, End 8953136)
cX = "Task"
// @from(Start 8953142, End 8953158)
IJ1 = "WebFetch"
// @from(Start 8953162, End 8954116)
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
  - Includes a self-cleaning 15-minute cache for faster responses when repeatedly accessing the same URL
`
// @from(Start 8954119, End 8954688)
function $a0(A, B) {
  return `
Web page content:
---
${A}
---

${B}

Provide a concise response based only on the content above. In your response:
 - Enforce a strict 125-character maximum for quotes from any source document. Open Source Software is ok as long as we respect the license.
 - Use quotation marks for exact language from articles; any language outside of the quotation should never be word-for-word the same.
 - You are not a lawyer and never comment on the legality of your own prompts and responses.
 - Never produce or reproduce exact song lyrics.
`
}
// @from(Start 8954693, End 8954709)
_j = I1(U1(), 1)
// @from(Start 8954753, End 8954806)
GL6 = n.enum(["pending", "in_progress", "completed"])
// @from(Start 8954810, End 8954849)
ZL6 = n.enum(["high", "medium", "low"])
// @from(Start 8954853, End 8954988)
DL6 = n.object({
    content: n.string().min(1, "Content cannot be empty"),
    status: GL6,
    priority: ZL6,
    id: n.string()
  })
// @from(Start 8954992, End 8955010)
GJ1 = n.array(DL6)
// @from(Start 8955013, End 8955118)
function xc1() {
  let A = ZJ1(S4(), "todos");
  if (!x1().existsSync(A)) x1().mkdirSync(A);
  return A
}
// @from(Start 8955120, End 8955198)
function cR(A) {
  let B = `${y9()}-agent-${A}.json`;
  return ZJ1(xc1(), B)
}
// @from(Start 8955200, End 8955238)
function jJ(A) {
  return La0(cR(A))
}
// @from(Start 8955240, End 8955278)
function DJ1(A, B) {
  Ra0(A, cR(B))
}
// @from(Start 8955283, End 8955347)
qa0 = {
    completed: 0,
    in_progress: 1,
    pending: 2
  }
// @from(Start 8955351, End 8955401)
Ma0 = {
    high: 0,
    medium: 1,
    low: 2
  }
// @from(Start 8955404, End 8955535)
function YJ1(A, B) {
  let Q = qa0[A.status] - qa0[B.status];
  if (Q !== 0) return Q;
  return Ma0[A.priority] - Ma0[B.priority]
}
// @from(Start 8955537, End 8955672)
function WJ1(A) {
  if (A.messages.length > 0) {
    let B = A.messages[0];
    if (B && "sessionId" in B) YL6(B.sessionId, y9())
  }
}
// @from(Start 8955674, End 8955959)
function YL6(A, B) {
  let Q = ZJ1(xc1(), `${A}-agent-${A}.json`),
    I = ZJ1(xc1(), `${B}-agent-${B}.json`);
  try {
    let G = La0(Q);
    if (G.length === 0) return !1;
    return Ra0(G, I), !0
  } catch (G) {
    return b1(G instanceof Error ? G : new Error(String(G))), !1
  }
}
// @from(Start 8955961, End 8956214)
function La0(A) {
  if (!x1().existsSync(A)) return [];
  try {
    let B = JSON.parse(x1().readFileSync(A, {
      encoding: "utf-8"
    }));
    return GJ1.parse(B)
  } catch (B) {
    return b1(B instanceof Error ? B : new Error(String(B))), []
  }
}
// @from(Start 8956216, End 8956358)
function Ra0(A, B) {
  try {
    eM(B, JSON.stringify(A, null, 2))
  } catch (Q) {
    b1(Q instanceof Error ? Q : new Error(String(Q)))
  }
}
// @from(Start 8956363, End 8965613)
Oa0 = `Use this tool to create and manage a structured task list for your current coding session. This helps you track progress, organize complex tasks, and demonstrate thoroughness to the user.
It also helps the user understand the progress of the task and overall progress of their requests.

## When to Use This Tool
Use this tool proactively in these scenarios:

1. Complex multi-step tasks - When a task requires 3 or more distinct steps or actions
2. Non-trivial and complex tasks - Tasks that require careful planning or multiple operations
3. User explicitly requests todo list - When the user directly asks you to use the todo list
4. User provides multiple tasks - When users provide a list of things to be done (numbered or comma-separated)
5. After receiving new instructions - Immediately capture user requirements as todos
6. When you start working on a task - Mark it as in_progress BEFORE beginning work. Ideally you should only have one todo as in_progress at a time
7. After completing a task - Mark it as completed and add any new follow-up tasks discovered during implementation

## When NOT to Use This Tool

Skip using this tool when:
1. There is only a single, straightforward task
2. The task is trivial and tracking it provides no organizational benefit
3. The task can be completed in less than 3 trivial steps
4. The task is purely conversational or informational

NOTE that you should not use this tool if there is only one trivial task to do. In this case you are better off just doing the task directly.

## Examples of When to Use the Todo List

<example>
User: I want to add a dark mode toggle to the application settings. Make sure you run the tests and build when you're done!
Assistant: I'll help add a dark mode toggle to your application settings. Let me create a todo list to track this implementation.
*Creates todo list with the following items:*
1. Create dark mode toggle component in Settings page
2. Add dark mode state management (context/store)
3. Implement CSS-in-JS styles for dark theme
4. Update existing components to support theme switching
5. Run tests and build process, addressing any failures or errors that occur
*Begins working on the first task*

<reasoning>
The assistant used the todo list because:
1. Adding dark mode is a multi-step feature requiring UI, state management, and styling changes
2. The user explicitly requested tests and build be run afterward
3. The assistant inferred that tests and build need to pass by adding "Ensure tests and build succeed" as the final task
</reasoning>
</example>

<example>
User: Help me rename the function getCwd to getCurrentWorkingDirectory across my project
Assistant: Let me first search through your codebase to find all occurrences of 'getCwd'.
*Uses grep or search tools to locate all instances of getCwd in the codebase*
Assistant: I've found 15 instances of 'getCwd' across 8 different files. Let me create a todo list to track these changes.
*Creates todo list with specific items for each file that needs updating*

<reasoning>
The assistant used the todo list because:
1. First, the assistant searched to understand the scope of the task
2. Upon finding multiple occurrences across different files, it determined this was a complex task with multiple steps
3. The todo list helps ensure every instance is tracked and updated systematically
4. This approach prevents missing any occurrences and maintains code consistency
</reasoning>
</example>


<example>
User: I need to implement these features for my e-commerce site: user registration, product catalog, shopping cart, and checkout flow.
Assistant: I'll help implement these features. First, let's add all the features to the todo list.
*Creates a todo list breaking down each feature into specific tasks based on the project architecture*
Assistant: Let's start with user registration. This will involve creating database models, API endpoints, and frontend forms that integrate with your existing authentication system.

<reasoning>
The assistant used the todo list because:
1. The user provided multiple complex features to implement in a comma separated list
2. The todo list helps organize these large features into manageable tasks
3. This approach allows for tracking progress across the entire implementation
</reasoning>
</example>

<example>
User: Can you help optimize my React application? It's rendering slowly and has performance issues.</user>
Assistant: I'll help optimize your React application. First, let me examine your codebase to identify potential performance bottlenecks.
*Reviews component structure, render patterns, state management, and data fetching*
Assistant: After analyzing your codebase, I've identified several performance issues. Let me create a todo list to track our optimization efforts.
*Creates todo list with items like: 1) Implement memoization for expensive calculations in ProductList, 2) Add virtualization for long lists in Dashboard, 3) Optimize image loading in Gallery component, 4) Fix state update loops in ShoppingCart, 5) Review bundle size and implement code splitting*
Let's start by implementing memoization for the expensive calculations in your ProductList component.</assistant>

<reasoning>
The assistant used the todo list because:
1. First, the assistant examined the codebase to identify specific performance issues
2. Based on this analysis, it identified multiple optimization opportunities
3. Performance optimization is a non-trivial task requiring multiple steps
4. The todo list helps methodically track improvements across different components
5. This systematic approach ensures all performance bottlenecks are addressed
</reasoning>
</example>

## Examples of When NOT to Use the Todo List

<example>
User: How do I print 'Hello World' in Python?
Assistant: In Python, you can print "Hello World" with this simple code:

python
print("Hello World")

This will output the text "Hello World" to the console when executed.</assistant>

<reasoning>
The assistant did not use the todo list because this is a single, trivial task that can be completed in one step. There's no need to track multiple tasks or steps for such a straightforward request.
</reasoning>
</example>

<example>
User: What does the git status command do?
Assistant: The git status command shows the current state of your working directory and staging area. It displays which changes have been staged, which haven't, and which files aren't being tracked by Git. This is a fundamental command for understanding the current state of your repository before making commits.

<reasoning>
The assistant did not use the todo list because this is an informational request with no actual coding task to complete. The user is simply asking for an explanation, not for the assistant to perform multiple steps or tasks.
</reasoning>
</example>

<example>
User: Can you add a comment to the calculateTotal function to explain what it does?
Assistant: Sure, let me add a comment to the calculateTotal function to explain what it does.
* Uses the ${oU} tool to add a comment to the calculateTotal function *

<reasoning>
The assistant did not use the todo list because this is a single, straightforward task confined to one location in the code. Adding a comment doesn't require tracking multiple steps or systematic organization.
</reasoning>
</example>

<example>
User: Run npm install for me and tell me what happens.
Assistant: I'll run the npm install command for you.

*Executes: npm install*

The command completed successfully. Here's the output:
[Output of npm install command]

All dependencies have been installed according to your package.json file.

<reasoning>
The assistant did not use the todo list because this is a single command execution with immediate results. There are no multiple steps to track or organize, making the todo list unnecessary for this straightforward task.
</reasoning>
</example>

## Task States and Management

1. **Task States**: Use these states to track progress:
   - pending: Task not yet started
   - in_progress: Currently working on (limit to ONE task at a time)
   - completed: Task finished successfully

2. **Task Management**:
   - Update task status in real-time as you work
   - Mark tasks complete IMMEDIATELY after finishing (don't batch completions)
   - Only have ONE task in_progress at any time
   - Complete current tasks before starting new ones
   - Remove tasks that are no longer relevant from the list entirely

3. **Task Completion Requirements**:
   - ONLY mark a task as completed when you have FULLY accomplished it
   - If you encounter errors, blockers, or cannot finish, keep the task as in_progress
   - When blocked, create a new task describing what needs to be resolved
   - Never mark a task as completed if:
     - Tests are failing
     - Implementation is partial
     - You encountered unresolved errors
     - You couldn't find necessary files or dependencies

4. **Task Breakdown**:
   - Create specific, actionable items
   - Break complex tasks into smaller, manageable steps
   - Use clear, descriptive task names

When in doubt, use this tool. Being proactive with task management demonstrates attentiveness and ensures you complete all requirements successfully.
`
// @from(Start 8965617, End 8965740)
Ta0 = "Update the todo list for the current session. To be used proactively and often to track progress and pending tasks."
// @from(Start 8965746, End 8965762)
ko = I1(U1(), 1)
// @from(Start 8965768, End 8965784)
QK = I1(U1(), 1)
// @from(Start 8965788, End 8965805)
Pa0 = I1(U1(), 1)
// @from(Start 8965808, End 8966065)
function w0({
  children: A,
  height: B
}) {
  if (Pa0.useContext(Sa0)) return A;
  return QK.createElement(WL6, null, QK.createElement(h, {
    flexDirection: "row",
    height: B,
    overflowY: "hidden"
  }, QK.createElement(P, null, "  ", "⎿  "), A))
}
// @from(Start 8966070, End 8966096)
Sa0 = QK.createContext(!1)
// @from(Start 8966099, End 8966198)
function WL6({
  children: A
}) {
  return QK.createElement(Sa0.Provider, {
    value: !0
  }, A)
}
// @from(Start 8966200, End 8966358)
function C5() {
  return ko.createElement(w0, {
    height: 1
  }, ko.createElement(P, {
    color: "error"
  }, "No (tell Claude what to do differently)"))
}
// @from(Start 8966363, End 8966379)
IK = I1(U1(), 1)
// @from(Start 8966385, End 8966401)
yJ = I1(U1(), 1)
// @from(Start 8966404, End 8967126)
function JJ1({
  todo: {
    status: A,
    priority: B,
    content: Q
  },
  isCurrent: I = !1,
  previousStatus: G,
  verbose: Z
}) {
  let D = G !== "completed" && A === "completed" ? "success" : G !== "in_progress" && A === "in_progress" ? "suggestion" : void 0;
  return yJ.createElement(h, {
    flexDirection: "row"
  }, yJ.createElement(h, {
    minWidth: 2
  }, yJ.createElement(P, {
    color: D,
    bold: I
  }, A === "completed" ? A0.checkboxOn : A0.checkboxOff, " ")), yJ.createElement(h, null, yJ.createElement(P, {
    bold: I,
    color: D,
    strikethrough: A === "completed"
  }, Q), Z && yJ.createElement(P, {
    dimColor: !0
  }, " ", "(P", B === "high" ? "0" : B === "medium" ? "1" : "2", ")")))
}
// @from(Start 8967128, End 8967669)
function _a0({
  oldTodos: A,
  newTodos: B,
  verbose: Q = !1
}) {
  if (B.length === 0) return IK.createElement(w0, {
    height: 1
  }, IK.createElement(P, {
    dimColor: !0
  }, "(Empty todo list)"));
  return IK.createElement(w0, null, IK.createElement(h, {
    flexDirection: "column"
  }, B.sort(YJ1).map((I) => {
    let G = A.find((Z) => Z.id === I.id);
    return IK.createElement(JJ1, {
      key: I.id,
      todo: I,
      isCurrent: I.status === "in_progress",
      verbose: Q,
      previousStatus: G?.status
    })
  })))
}
// @from(Start 8967674, End 8967690)
rN = I1(U1(), 1)
// @from(Start 8967696, End 8967704)
fc1 = 10
// @from(Start 8967707, End 8968396)
function K6({
  result: A,
  verbose: B
}) {
  let Q;
  if (typeof A !== "string") Q = "Error";
  else {
    let G = A.trim();
    if (!B && G.includes("InputValidationError: ")) Q = "Invalid tool parameters";
    else if (G.startsWith("Error: ")) Q = G;
    else Q = `Error: ${G}`
  }
  let I = Q.split(`
`).length - fc1;
  return rN.createElement(w0, null, rN.createElement(h, {
    flexDirection: "column"
  }, rN.createElement(P, {
    color: "error"
  }, B ? Q : Q.split(`
`).slice(0, fc1).join(`
`) || ""), !B && Q.split(`
`).length > fc1 && rN.createElement(P, {
    color: "secondaryText"
  }, "… +", I, " ", I === 1 ? "line" : "lines", " (", UA.bold("ctrl+r"), " to see all)")))
}
// @from(Start 8968401, End 8968477)
JL6 = n.strictObject({
    todos: GJ1.describe("The updated todo list")
  })
// @from(Start 8968481, End 8970045)
yG = {
    name: "TodoWrite",
    async description() {
      return Ta0
    },
    async prompt() {
      return Oa0
    },
    inputSchema: JL6,
    userFacingName() {
      return "Update Todos"
    },
    isEnabled() {
      return !0
    },
    isConcurrencySafe() {
      return !1
    },
    isReadOnly() {
      return !1
    },
    async checkPermissions(A) {
      return {
        behavior: "allow",
        updatedInput: A
      }
    },
    renderToolUseMessage() {
      return ""
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolUseRejectedMessage() {
      return _j.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return _j.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolResultMessage({
      oldTodos: A,
      newTodos: B
    }, Q, {
      verbose: I
    }) {
      return _j.createElement(_a0, {
        oldTodos: A,
        newTodos: B,
        verbose: I
      })
    },
    async * call({
      todos: A
    }, B) {
      let Q = jJ(B.agentId),
        I = A;
      DJ1(I, B.agentId), yield {
        type: "result",
        data: {
          oldTodos: Q,
          newTodos: I
        }
      }
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: "tool_result",
        content: "Todos have been modified successfully. Ensure that you continue to use the todo list to track your progress. Please proceed with the current tasks if applicable"
      }
    }
  }
// @from(Start 8970051, End 8970067)
jj = I1(U1(), 1)
// @from(Start 8970073, End 8971057)
ja0 = `Use this tool to read the current to-do list for the session. This tool should be used proactively and frequently to ensure that you are aware of
the status of the current task list. You should make use of this tool as often as possible, especially in the following situations:
- At the beginning of conversations to see what's pending
- Before starting new tasks to prioritize work
- When the user asks about previous tasks or plans
- Whenever you're uncertain about what to do next
- After completing tasks to update your understanding of remaining work
- After every few messages to ensure you're on track

Usage:
- This tool takes in no parameters. So leave the input blank or empty. DO NOT include a dummy object, placeholder string or a key like "input" or "empty". LEAVE IT BLANK.
- Returns a list of todo items with their status, priority, and content
- Use this information to track progress and plan next steps
- If no todos exist yet, an empty list will be returned`
// @from(Start 8971061, End 8971111)
ya0 = "Read the current todo list for the session"
// @from(Start 8971117, End 8971133)
GK = I1(U1(), 1)
// @from(Start 8971136, End 8971568)
function ka0({
  todos: A,
  verbose: B
}) {
  if (A.length === 0) return GK.createElement(w0, {
    height: 1
  }, GK.createElement(P, {
    dimColor: !0
  }, "(Todo list is empty)"));
  return GK.createElement(w0, {
    height: A.length
  }, GK.createElement(h, {
    flexDirection: "column"
  }, A.sort(YJ1).map((Q, I) => GK.createElement(JJ1, {
    key: `completed-${I}`,
    todo: Q,
    isCurrent: !1,
    verbose: B
  }))))
}
// @from(Start 8971573, End 8971782)
FL6 = n.strictObject({}, {
    description: 'No input is required, leave this field blank. NOTE that we do not require a dummy object, placeholder string or a key like "input" or "empty". LEAVE IT BLANK.'
  })
// @from(Start 8971786, End 8973124)
oN = {
    name: "TodoRead",
    async description() {
      return ya0
    },
    async prompt() {
      return ja0
    },
    inputSchema: FL6,
    userFacingName() {
      return "Read Todos"
    },
    isEnabled() {
      return !0
    },
    isConcurrencySafe() {
      return !0
    },
    isReadOnly() {
      return !0
    },
    async checkPermissions(A) {
      return {
        behavior: "allow",
        updatedInput: A
      }
    },
    renderToolUseMessage() {
      return ""
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolUseRejectedMessage() {
      return jj.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return jj.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolResultMessage(A, B, {
      verbose: Q
    }) {
      return jj.createElement(ka0, {
        todos: A,
        verbose: Q
      })
    },
    async * call(A, B) {
      yield {
        type: "result",
        data: jJ(B.agentId)
      }
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: "tool_result",
        content: `Remember to continue to use update and read from the todo list as you make progress. Here is the current list: ${JSON.stringify(A)}`
      }
    }
  }
// @from(Start 8973130, End 8973142)
FJ1 = "Glob"
// @from(Start 8973146, End 8973699)
vc1 = `- Fast file pattern matching tool that works with any codebase size
- Supports glob patterns like "**/*.js" or "src/**/*.ts"
- Returns matching file paths sorted by modification time
- Use this tool when you need to find files by name patterns
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
- You have the capability to call multiple tools in a single response. It is always better to speculatively perform multiple searches as a batch that are potentially useful.`
// @from(Start 8973705, End 8973717)
XJ1 = "Grep"
// @from(Start 8973720, End 8974476)
function bc1(A) {
  return `
- Fast content search tool that works with any codebase size
- Searches file contents using regular expressions
- Supports full regex syntax (eg. "log.*Error", "function\\s+\\w+", etc.)
- Filter files by pattern with the include parameter (eg. "*.js", "*.{ts,tsx}")
- Returns file paths with at least one match sorted by modification time
- Use this tool when you need to find files containing specific patterns${new Set(A.map((Q)=>Q.name)).has(ZK)?`
- If you need to identify/count the number of matches within files, use the ${ZK} tool with \`rg\` (ripgrep) directly. Do NOT use \`grep\`.`:""}
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
`
}
// @from(Start 8974481, End 8974491)
VJ1 = "LS"
// @from(Start 8974495, End 8974797)
gc1 = "Lists files and directories in a given path. The path parameter must be an absolute path, not a relative path. You can optionally provide an array of glob patterns to ignore with the ignore parameter. You should generally prefer the Glob and Grep tools, if you know which directories to search."
// @from(Start 8974803, End 8974815)
XL6 = 120000
// @from(Start 8974819, End 8974831)
VL6 = 600000
// @from(Start 8974835, End 8974846)
CL6 = 30000
// @from(Start 8974849, End 8975007)
function KJ1() {
  let A = process.env.BASH_MAX_OUTPUT_LENGTH;
  if (A) {
    let B = parseInt(A, 10);
    if (!isNaN(B) && B > 0) return B
  }
  return CL6
}
// @from(Start 8975009, End 8975167)
function Em() {
  let A = process.env.BASH_DEFAULT_TIMEOUT_MS;
  if (A) {
    let B = parseInt(A, 10);
    if (!isNaN(B) && B > 0) return B
  }
  return XL6
}
// @from(Start 8975169, End 8975356)
function CJ1() {
  let A = process.env.BASH_MAX_TIMEOUT_MS;
  if (A) {
    let B = parseInt(A, 10);
    if (!isNaN(B) && B > 0) return Math.max(B, Em())
  }
  return Math.max(VL6, Em())
}
// @from(Start 8975361, End 8975372)
ZK = "Bash"
// @from(Start 8975375, End 8975628)
function KL6() {
  if (!(m6().includeCoAuthoredBy ?? !0)) return {
    commit: "",
    pr: ""
  };
  let Q = `\uD83E\uDD16 Generated with [${m0}](${xfA})`;
  return {
    commit: `${Q}

   Co-Authored-By: Claude <noreply@anthropic.com>`,
    pr: Q
  }
}