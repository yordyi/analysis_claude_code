
// @from(Start 8627284, End 8629034)
gfA = `Reads a file from the local filesystem. You can access any file directly by using this tool.
Assume this tool is able to read all files on the machine. If the User provides a path to a file assume that path is valid. It is okay to read a file that does not exist; an error will be returned.

Usage:
- The file_path parameter must be an absolute path, not a relative path
- By default, it reads up to ${rr9} lines starting from the beginning of the file
- You can optionally specify a line offset and limit (especially handy for long files), but it's recommended to read the whole file by not providing these parameters
- Any lines longer than ${or9} characters will be truncated
- Results are returned using cat -n format, with line numbers starting at 1
- This tool allows ${m0} to read images (eg PNG, JPG, etc). When reading an image file the contents are presented visually as ${m0} is a multimodal LLM.${process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL?`
- This tool can read Jupyter notebooks (.ipynb files) and returns all cells with their outputs, combining code, text, and visualizations.`:`
- For Jupyter notebooks (.ipynb files), use the ${NS} instead`}
- You have the capability to call multiple tools in a single response. It is always better to speculatively read multiple files as a batch that are potentially useful. 
- You will regularly be asked to read screenshots. If the user provides a path to a screenshot ALWAYS use this tool to view the file at the path. This tool will work with all temporary file paths like /var/folders/123/abc/T/TemporaryItems/NSIRD_screencaptureui_ZfB1tD/Screenshot.png
- If you read a file that exists but has empty contents you will receive a system reminder warning in place of file contents.`
// @from(Start 8629040, End 8629063)
tr9 = ["allow", "deny"]
// @from(Start 8629066, End 8629348)
function er9(A, B) {
  if (!A || !A.permissions) return [];
  let {
    permissions: Q
  } = A, I = [];
  for (let G of tr9) {
    let Z = Q[G];
    if (Z)
      for (let D of Z) I.push({
        source: B,
        ruleBehavior: G,
        ruleValue: aM(D)
      })
  }
  return I
}
// @from(Start 8629350, End 8629668)
function Ao9(A, B) {
  if (!A.allowedTools || A.allowedTools.length < 1) return [];
  let Q = new Set;
  for (let G of B)
    if (G.ruleBehavior === "allow" && G.source === "localSettings") Q.add(m8(G.ruleValue));
  let I = new Set;
  for (let G of A.allowedTools)
    if (!Q.has(G)) I.add(G);
  return Array.from(I)
}
// @from(Start 8629670, End 8630127)
function Bo9(A, B) {
  if (!A.ignorePatterns || A.ignorePatterns.length < 1) return [];
  let Q = new Set;
  for (let G of B)
    if (G.ruleBehavior === "deny" && G.source === "localSettings" && G.ruleValue.toolName === TD && G.ruleValue.ruleContent !== void 0) Q.add(G.ruleValue.ruleContent);
  let I = new Set;
  for (let G of A.ignorePatterns)
    if (!Q.has(G)) I.add(G);
  return Array.from(I).map((G) => ({
    toolName: TD,
    ruleContent: G
  }))
}
// @from(Start 8630129, End 8630574)
function hfA() {
  let A = m9();
  if (!A.allowedTools && !A.ignorePatterns) return;
  let B = {
      ...A
    },
    Q = Ao9(A, GP1("localSettings"));
  if (Q.length > 0) _81({
    ruleValues: Q.map(aM),
    ruleBehavior: "allow"
  }, "localSettings");
  B.allowedTools = [];
  let I = Bo9(A, GP1("localSettings"));
  if (I.length > 0) _81({
    ruleValues: I,
    ruleBehavior: "deny"
  }, "localSettings");
  delete B.ignorePatterns, B5(B)
}
// @from(Start 8630576, End 8630798)
function mfA() {
  let A = [],
    B = m9();
  for (let Q of B.allowedTools) A.push({
    source: "projectSettings",
    ruleBehavior: "allow",
    ruleValue: aM(Q)
  });
  for (let Q of nM) A.push(...GP1(Q));
  return A
}
// @from(Start 8630800, End 8630855)
function GP1(A) {
  let B = KC(A);
  return er9(B, A)
}
// @from(Start 8630857, End 8631307)
function dfA(A) {
  let B = m8(A.ruleValue),
    Q = KC(A.source);
  if (!Q || !Q.permissions) return !1;
  let I = Q.permissions[A.ruleBehavior];
  if (!I || !I.includes(B)) return !1;
  try {
    let G = {
      ...Q,
      permissions: {
        ...Q.permissions,
        [A.ruleBehavior]: I.filter((Z) => Z !== B)
      }
    };
    return qB(A.source, G), !0
  } catch (G) {
    return b1(G instanceof Error ? G : new Error(String(G))), !1
  }
}
// @from(Start 8631309, End 8631399)
function Qo9() {
  return {
    permissions: {
      allow: [],
      deny: []
    }
  }
}
// @from(Start 8631401, End 8631807)
function _81({
  ruleValues: A,
  ruleBehavior: B
}, Q) {
  if (A.length < 1) return !0;
  let I = A.map(m8),
    G = KC(Q) || Qo9();
  try {
    let Z = G.permissions || {},
      D = {
        ...G,
        permissions: {
          ...Z,
          [B]: [...Z[B] || [], ...I]
        }
      };
    return qB(Q, D), !0
  } catch (Z) {
    return b1(Z instanceof Error ? Z : new Error(String(Z))), !1
  }
}
// @from(Start 8631809, End 8631871)
function j81(A) {
  return A.replace(/[^a-zA-Z0-9_-]/g, "_")
}
// @from(Start 8631873, End 8631967)
function pi(A, B) {
  let Q = `mcp__${B}__`;
  return A.filter((I) => I.name?.startsWith(Q))
}
// @from(Start 8631969, End 8632064)
function y81(A, B) {
  let Q = `mcp__${B}__`;
  return A.filter((I) => I.name?.startsWith(Q))
}
// @from(Start 8632066, End 8632161)
function ci(A, B) {
  let Q = `mcp__${B}__`;
  return A.filter((I) => !I.name?.startsWith(Q))
}
// @from(Start 8632163, End 8632258)
function li(A, B) {
  let Q = `mcp__${B}__`;
  return A.filter((I) => !I.name?.startsWith(Q))
}
// @from(Start 8632260, End 8632331)
function ii(A, B) {
  let Q = {
    ...A
  };
  return delete Q[B], Q
}
// @from(Start 8632333, End 8632535)
function ZP1(A) {
  let B = A.split("__"),
    [Q, I, ...G] = B;
  if (Q !== "mcp" || !I) return null;
  let Z = G.length > 0 ? G.join("__") : void 0;
  return {
    serverName: I,
    toolName: Z
  }
}
// @from(Start 8632537, End 8632615)
function k81(A, B) {
  let Q = `mcp__${j81(B)}__`;
  return A.replace(Q, "")
}
// @from(Start 8632620, End 8632654)
ufA = [...nM, "cliArg", "command"]
// @from(Start 8632657, End 8633040)
function pfA(A) {
  switch (A) {
    case "cliArg":
      return "CLI argument";
    case "command":
      return "command configuration";
    case "localSettings":
      return "project local settings";
    case "projectSettings":
      return "project settings";
    case "policySettings":
      return "policy settings";
    case "userSettings":
      return "user settings"
  }
}
// @from(Start 8633042, End 8633270)
function aM(A) {
  let B = A.match(/^([^(]+)\(([^)]+)\)$/);
  if (!B) return {
    toolName: A
  };
  let Q = B[1],
    I = B[2];
  if (!Q || !I) return {
    toolName: A
  };
  return {
    toolName: Q,
    ruleContent: I
  }
}
// @from(Start 8633272, End 8633362)
function m8(A) {
  return A.ruleContent ? `${A.toolName}(${A.ruleContent})` : A.toolName
}
// @from(Start 8633364, End 8633525)
function x81(A) {
  return ufA.flatMap((B) => (A.alwaysAllowRules[B] || []).map((Q) => ({
    source: B,
    ruleBehavior: "allow",
    ruleValue: aM(Q)
  })))
}
// @from(Start 8633527, End 8633685)
function Pv(A) {
  return ufA.flatMap((B) => (A.alwaysDenyRules[B] || []).map((Q) => ({
    source: B,
    ruleBehavior: "deny",
    ruleValue: aM(Q)
  })))
}
// @from(Start 8633687, End 8633962)
function cfA(A, B) {
  if (B.ruleValue.ruleContent !== void 0) return !1;
  if (B.ruleValue.toolName === A.name) return !0;
  let Q = ZP1(B.ruleValue.toolName),
    I = ZP1(A.name);
  return Q !== null && I !== null && Q.toolName === void 0 && Q.serverName === I.serverName
}
// @from(Start 8633964, End 8634033)
function Io9(A, B) {
  return x81(A).find((Q) => cfA(B, Q)) || null
}
// @from(Start 8634035, End 8634103)
function Go9(A, B) {
  return Pv(A).find((Q) => cfA(B, Q)) || null
}
// @from(Start 8634105, End 8634156)
function Sv(A, B, Q) {
  return DP1(A, B.name, Q)
}
// @from(Start 8634158, End 8634491)
function DP1(A, B, Q) {
  let I = new Map,
    G = [];
  switch (Q) {
    case "allow":
      G = x81(A);
      break;
    case "deny":
      G = Pv(A);
      break
  }
  for (let Z of G)
    if (Z.ruleValue.toolName === B && Z.ruleValue.ruleContent !== void 0 && Z.ruleBehavior === Q) I.set(Z.ruleValue.ruleContent, Z);
  return I
}
// @from(Start 8634496, End 8635648)
sM = async (A, B, Q) => {
  if (Q.abortController.signal.aborted) throw new NG;
  let I = Go9(Q.getToolPermissionContext(), A);
  if (I) return {
    behavior: "deny",
    decisionReason: {
      type: "rule",
      rule: I
    },
    ruleSuggestions: null,
    message: `Permission to use ${A.name} has been denied.`
  };
  let G = void 0;
  try {
    let D = A.inputSchema.parse(B);
    G = await A.checkPermissions(D, Q)
  } catch (D) {
    return b1(D), {
      behavior: "ask",
      message: "Error checking permissions"
    }
  }
  if (G?.behavior === "deny") return G;
  if (Q.getToolPermissionContext().mode === "bypassPermissions") return {
    behavior: "allow",
    updatedInput: B,
    decisionReason: {
      type: "mode",
      mode: Q.getToolPermissionContext().mode
    }
  };
  let Z = Io9(Q.getToolPermissionContext(), A);
  if (Z) return {
    behavior: "allow",
    updatedInput: B,
    decisionReason: {
      type: "rule",
      rule: Z
    }
  };
  if (G.behavior === "allow") return G;
  return {
    ...G,
    behavior: "ask",
    message: `Claude requested permissions to use ${A.name}, but you haven't granted it yet.`
  }
}
// @from(Start 8635651, End 8635788)
function lfA(A) {
  switch (A) {
    case "allow":
      return "alwaysAllowRules";
    case "deny":
      return "alwaysDenyRules"
  }
}
// @from(Start 8635789, End 8635949)
async function f81(A) {
  return ni({
    ...A,
    ruleValues: [A.rule.ruleValue],
    ruleBehavior: A.rule.ruleBehavior,
    destination: A.rule.source
  })
}
// @from(Start 8635950, End 8636293)
async function ni({
  ruleBehavior: A,
  destination: B,
  initialContext: Q,
  setToolPermissionContext: I,
  ruleValues: G
}) {
  let Z = new Set(G.map(m8)),
    D = lfA(A),
    Y = {
      ...Q,
      [D]: {
        ...Q[D],
        [B]: [...Q[D][B] || [], ...Z]
      }
    };
  _81({
    ruleValues: G,
    ruleBehavior: A
  }, B), I(Y)
}
// @from(Start 8636294, End 8636882)
async function ifA({
  rule: A,
  initialContext: B,
  setToolPermissionContext: Q
}) {
  if (A.source === "policySettings") throw new Error("Cannot delete permission rules from managed settings");
  let I = m8(A.ruleValue),
    G = lfA(A.ruleBehavior),
    Z = A.source,
    D = {
      ...B,
      [G]: {
        ...B[G],
        [A.source]: B[G][Z]?.filter((Y) => Y !== I) || []
      }
    };
  switch (Z) {
    case "localSettings":
    case "userSettings":
    case "projectSettings": {
      dfA(A);
      break
    }
    case "cliArg":
    case "command":
      break
  }
  Q(D)
}
// @from(Start 8636884, End 8637362)
function nfA(A, B) {
  let Q = {
      ...A.alwaysAllowRules
    },
    I = {
      ...A.alwaysDenyRules
    };
  for (let G of B) {
    let Z = m8(G.ruleValue),
      D = G.source,
      Y = (() => {
        switch (G.ruleBehavior) {
          case "allow":
            return Q;
          case "deny":
            return I
        }
      })();
    if (!Y[D]) Y[D] = [];
    if (Y[D]) Y[D].push(Z)
  }
  return {
    ...A,
    alwaysAllowRules: Q,
    alwaysDenyRules: I
  }
}
// @from(Start 8637367, End 8637385)
sfA = I1(J81(), 1)
// @from(Start 8637430, End 8637441)
oU = "Edit"
// @from(Start 8637447, End 8637458)
tU = _v.sep
// @from(Start 8637461, End 8637510)
function Wo9() {
  return nM.map((A) => h81(A))
}
// @from(Start 8637512, End 8637570)
function d3(A) {
  return Zo9(A) ? afA(A) : afA(dA(), A)
}
// @from(Start 8637572, End 8637651)
function WP1(A) {
  return new Set([e9(), ...A.additionalWorkingDirectories])
}
// @from(Start 8637653, End 8637724)
function eF(A, B) {
  return Array.from(WP1(B)).some((Q) => ai(A, Q))
}
// @from(Start 8637726, End 8637893)
function ai(A, B) {
  let Q = d3(A),
    I = d3(B);
  if (!Q.startsWith(I)) return !1;
  let G = Q[I.length];
  if (G === void 0 || G === Do9) return !0;
  return !1
}
// @from(Start 8637895, End 8638121)
function Jo9(A) {
  switch (A) {
    case "cliArg":
    case "command":
      return d3(e9());
    case "userSettings":
    case "policySettings":
    case "projectSettings":
    case "localSettings":
      return g81(A)
  }
}
// @from(Start 8638123, End 8638166)
function YP1(A) {
  return _v.join(tU, A)
}
// @from(Start 8638168, End 8638557)
function Fo9({
  patternRoot: A,
  pattern: B,
  rootPath: Q
}) {
  let I = _v.join(A, B);
  if (A === Q) return YP1(B);
  else if (I.startsWith(`${Q}${tU}`)) {
    let G = I.slice(Q.length);
    return YP1(G)
  } else {
    let G = _v.relative(Q, A);
    if (!G || G.startsWith(`..${tU}`) || G === "..") return null;
    else {
      let Z = _v.join(G, B);
      return YP1(Z)
    }
  }
}
// @from(Start 8638559, End 8638857)
function b81(A, B) {
  let Q = new Set(A.get(null) ?? []);
  for (let [I, G] of A.entries()) {
    if (I === null) continue;
    for (let Z of G) {
      let D = Fo9({
        patternRoot: I,
        pattern: Z,
        rootPath: B
      });
      if (D) Q.add(D)
    }
  }
  return Array.from(Q)
}
// @from(Start 8638859, End 8639264)
function jv(A) {
  let B = ofA(A, "read", "deny"),
    Q = new Map;
  for (let [G, Z] of B.entries()) Q.set(G, Array.from(Z.keys()));
  let I = m9().ignorePatterns;
  if (I && I.length > 0)
    for (let G of I) {
      let {
        relativePattern: Z,
        root: D
      } = rfA(G, "projectSettings"), Y = Q.get(D);
      if (Y === void 0) Y = [Z], Q.set(D, Y);
      else Y.push(Z)
    }
  return Q
}
// @from(Start 8639266, End 8639618)
function rfA(A, B) {
  if (A.startsWith(`${tU}${tU}`)) return {
    relativePattern: A.slice(1),
    root: tU
  };
  else if (A.startsWith(`~${tU}`)) return {
    relativePattern: A.slice(1),
    root: Yo9()
  };
  else if (A.startsWith(tU)) return {
    relativePattern: A,
    root: Jo9(B)
  };
  return {
    relativePattern: A,
    root: null
  }
}
// @from(Start 8639620, End 8640028)
function ofA(A, B, Q) {
  let I = (() => {
      switch (B) {
        case "edit":
          return oU;
        case "read":
          return TD
      }
    })(),
    G = DP1(A, I, Q),
    Z = new Map;
  for (let [D, Y] of G.entries()) {
    let {
      relativePattern: W,
      root: J
    } = rfA(D, Y.source), F = Z.get(J);
    if (F === void 0) F = new Map, Z.set(J, F);
    F.set(W, Y)
  }
  return Z
}
// @from(Start 8640030, End 8640395)
function v81(A, B, Q, I) {
  let G = d3(A),
    Z = ofA(B, Q, I);
  for (let [D, Y] of Z.entries()) {
    let W = sfA.default().add(Array.from(Y.keys())),
      J = _v.relative(D ?? dA(), G);
    if (J.startsWith(`..${tU}`)) continue;
    if (!J) continue;
    let F = W.test(J);
    if (F.ignored && F.rule) return Y.get(F.rule.pattern) ?? null
  }
  return null
}
// @from(Start 8640397, End 8641344)
function qz(A, B, Q) {
  if (typeof A.getPath !== "function") return {
    behavior: "ask",
    message: `Claude requested permissions to use ${A.name}, but you haven't granted it yet.`
  };
  let I = A.getPath(B),
    G = $S(A, B, Q);
  if (G.behavior === "allow") return G;
  let Z = v81(I, Q, "read", "deny");
  if (Z) return {
    behavior: "deny",
    message: `Permission to read ${I} has been denied.`,
    decisionReason: {
      type: "rule",
      rule: Z
    },
    ruleSuggestions: null
  };
  if (eF(I, Q)) return {
    behavior: "allow",
    updatedInput: B,
    decisionReason: {
      type: "mode",
      mode: "default"
    }
  };
  let D = v81(I, Q, "read", "allow");
  if (D) return {
    behavior: "allow",
    updatedInput: B,
    decisionReason: {
      type: "rule",
      rule: D
    }
  };
  return {
    behavior: "ask",
    message: `Claude requested permissions to read from ${I}, but you haven't granted it yet.`
  }
}
// @from(Start 8641346, End 8642544)
function $S(A, B, Q) {
  if (typeof A.getPath !== "function") return {
    behavior: "ask",
    message: `Claude requested permissions to use ${A.name}, but you haven't granted it yet.`
  };
  let I = A.getPath(B),
    G = v81(I, Q, "edit", "deny");
  if (G) return {
    behavior: "deny",
    message: `Permission to edit ${I} has been denied.`,
    decisionReason: {
      type: "rule",
      rule: G
    },
    ruleSuggestions: null
  };
  if (Wo9().some((D) => I === D)) return {
    behavior: "ask",
    message: `Claude requested permissions to use ${A.name}, but you haven't granted it yet.`,
    decisionReason: {
      type: "other",
      reason: "Ask for permission to edit Claude Code settings files"
    }
  };
  if (Q.mode === "acceptEdits" && eF(I, Q)) return {
    behavior: "allow",
    updatedInput: B,
    decisionReason: {
      type: "mode",
      mode: "acceptEdits"
    }
  };
  let Z = v81(I, Q, "edit", "allow");
  if (Z) return {
    behavior: "allow",
    updatedInput: B,
    decisionReason: {
      type: "rule",
      rule: Z
    }
  };
  return {
    behavior: "ask",
    message: `Claude requested permissions to write to ${I}, but you haven't granted it yet.`
  }
}
// @from(Start 8642545, End 8642956)
async function GvA(A, B, {
  limit: Q,
  offset: I
}, G, Z) {
  let D = b81(jv(Z), B),
    W = (await L51([A], {
      cwd: B,
      nocase: !0,
      nodir: !0,
      signal: G,
      stat: !0,
      withFileTypes: !0,
      ignore: D
    })).sort((F, X) => (F.mtimeMs ?? 0) - (X.mtimeMs ?? 0)),
    J = W.length > I + Q;
  return {
    files: W.slice(I, I + Q).map((F) => F.fullpath()),
    truncated: J
  }
}
// @from(Start 8642958, End 8643212)
function ZvA(A, B) {
  if (A === ".") return !0;
  if (A.startsWith("~")) return !1;
  if (A.includes("\x00") || B.includes("\x00")) return !1;
  let Q = tfA(efA(), B, A),
    I = tfA(efA(), B),
    G = XP1(I, Q);
  return !G.startsWith("..") && !si(G)
}
// @from(Start 8643214, End 8643488)
function DvA(A, B = 0, Q) {
  let Z = x1().readFileSync(A, {
      encoding: "utf8"
    }).split(/\r?\n/),
    D = Q !== void 0 && Z.length - B > Q ? Z.slice(B, B + Q) : Z.slice(B);
  return {
    content: D.join(`
`),
    lineCount: D.length,
    totalLines: Z.length
  }
}
// @from(Start 8643490, End 8643614)
function rM(A, B, Q, I) {
  let G = B;
  if (I === "CRLF") G = B.split(`
`).join(`\r
`);
  eM(A, G, {
    encoding: Q
  })
}
// @from(Start 8643619, End 8643855)
YvA = L0(async () => {
  let A = new AbortController;
  setTimeout(() => {
    A.abort()
  }, 1000);
  let B = await ATA(dA(), A.signal, 15),
    Q = 0;
  for (let I of B)
    if (eU(I) === "CRLF") Q++;
  return Q > 3 ? "CRLF" : "LF"
})
// @from(Start 8643858, End 8644284)
function UG(A) {
  try {
    let Q = x1(),
      {
        buffer: I,
        bytesRead: G
      } = Q.readSync(A, {
        length: 4096
      });
    if (G >= 2) {
      if (I[0] === 255 && I[1] === 254) return "utf16le"
    }
    if (G >= 3 && I[0] === 239 && I[1] === 187 && I[2] === 191) return "utf8";
    return I.slice(0, G).toString("utf8").length > 0 ? "utf8" : "ascii"
  } catch (Q) {
    return b1(Q), "utf8"
  }
}
// @from(Start 8644286, End 8644539)
function eU(A, B = "utf8") {
  try {
    let Q = x1(),
      {
        buffer: I,
        bytesRead: G
      } = Q.readSync(A, {
        length: 4096
      }),
      Z = I.toString(B, 0, G);
    return Vo9(Z)
  } catch (Q) {
    return b1(Q), "LF"
  }
}
// @from(Start 8644541, End 8644733)
function Vo9(A) {
  let B = 0,
    Q = 0;
  for (let I = 0; I < A.length; I++)
    if (A[I] === `
`)
      if (I > 0 && A[I - 1] === "\r") B++;
      else Q++;
  return B > Q ? "CRLF" : "LF"
}
// @from(Start 8644735, End 8645115)
function qS(A) {
  let B = si(A) ? A : u81(dA(), A),
    Q = x1(),
    I = String.fromCharCode(8239),
    G = /^(.+)([ \u202F])(AM|PM)(\.png)$/,
    Z = JP1(B).match(G);
  if (Z) {
    if (Q.existsSync(B)) return B;
    let D = Z[2],
      Y = D === " " ? I : " ",
      W = B.replace(`${D}${Z[3]}${Z[4]}`, `${Y}${Z[3]}${Z[4]}`);
    if (Q.existsSync(W)) return W
  }
  return B
}
// @from(Start 8645117, End 8645194)
function kv(A) {
  return A.replace(/^\t+/gm, (B) => "  ".repeat(B.length))
}
// @from(Start 8645196, End 8645261)
function oM(A) {
  return A ? si(A) ? A : u81(dA(), A) : void 0
}
// @from(Start 8645263, End 8645390)
function VP1(A) {
  let B = oM(A),
    Q = B ? XP1(dA(), B) : void 0;
  return {
    absolutePath: B,
    relativePath: Q
  }
}
// @from(Start 8645392, End 8645584)
function p81(A) {
  let {
    relativePath: B
  } = VP1(A);
  if (B && !B.startsWith("..")) return B;
  let Q = IvA();
  if (A.startsWith(Q + Xo9)) return "~" + A.slice(Q.length);
  return A
}
// @from(Start 8645586, End 8645889)
function xv(A) {
  let B = x1();
  try {
    let Q = AvA(A),
      I = JP1(A, FP1(A));
    if (!B.existsSync(Q)) return;
    let D = B.readdirSync(Q).filter((Y) => JP1(Y.name, FP1(Y.name)) === I && yv(Q, Y.name) !== A)[0];
    if (D) return D.name;
    return
  } catch (Q) {
    b1(Q);
    return
  }
}
// @from(Start 8645891, End 8646140)
function tM({
  content: A,
  startLine: B
}) {
  if (!A) return "";
  return A.split(/\r?\n/).map((I, G) => {
    let Z = G + B,
      D = String(Z);
    if (D.length >= 6) return `${D}→${I}`;
    return `${D.padStart(6," ")}→${I}`
  }).join(`
`)
}
// @from(Start 8646142, End 8646241)
function WvA(A) {
  let B = x1();
  if (!B.existsSync(A)) return !0;
  return B.isDirEmptySync(A)
}
// @from(Start 8646243, End 8646556)
function fv(A, B = dA()) {
  let Q = m9();
  if (!Q.ignorePatterns || Q.ignorePatterns.length === 0) return !1;
  let I = si(A) ? A : u81(B, A),
    G = XP1(B, I);
  if (!G) return !1;
  let Z = Q.ignorePatterns.length > 0 ? BvA.default().add(Q.ignorePatterns) : null;
  if (!Z) return !1;
  return Z.ignores(G)
}
// @from(Start 8646558, End 8646669)
function wI(A) {
  let B = UG(A);
  return x1().readFileSync(A, {
    encoding: B
  }).replaceAll(`\r
`, `
`)
}
// @from(Start 8646671, End 8646747)
function CP1(A) {
  let {
    content: B
  } = HfA.readFile(A);
  return B
}
// @from(Start 8646749, End 8646873)
function eM(A, B, Q = {
  encoding: "utf-8"
}) {
  x1().writeFileSync(A, B, {
    encoding: Q.encoding,
    flush: !0
  })
}
// @from(Start 8646878, End 8646901)
m81 = TL1("claude-cli")
// @from(Start 8646904, End 8646964)
function d81(A) {
  return A.replace(/[^a-zA-Z0-9]/g, "-")
}
// @from(Start 8646966, End 8647239)
function AL(A) {
  let B = A / 1024;
  if (B < 1) return `${A} bytes`;
  if (B < 1024) return `${B.toFixed(1).replace(/\.0$/,"")}KB`;
  let Q = B / 1024;
  if (Q < 1024) return `${Q.toFixed(1).replace(/\.0$/,"")}MB`;
  return `${(Q/1024).toFixed(1).replace(/\.0$/,"")}GB`
}
// @from(Start 8647244, End 8647488)
Mz = {
  baseLogs: () => yv(m81.cache, d81(x1().cwd())),
  errors: () => yv(m81.cache, d81(x1().cwd()), "errors"),
  messages: () => yv(m81.cache, d81(x1().cwd()), "messages"),
  mcpLogs: (A) => yv(m81.cache, d81(x1().cwd()), `mcp-logs-${A}`)
}
// @from(Start 8647491, End 8647611)
function $G(A) {
  let B = FP1(A);
  if (!B) return "unknown";
  return QvA.getLanguage(B.slice(1))?.name ?? "unknown"
}
// @from(Start 8647613, End 8647809)
function c81(A, B) {
  if (A.startsWith("~/")) return yv(IvA(), A.substring(2));
  else if (si(A)) return A;
  else {
    let Q = A.startsWith("./") ? A : `./${A}`;
    return u81(AvA(B), Q)
  }
}
// @from(Start 8647860, End 8653333)
function oi(A, B = !1) {
  let Q = A.length,
    I = 0,
    G = "",
    Z = 0,
    D = 16,
    Y = 0,
    W = 0,
    J = 0,
    F = 0,
    X = 0;

  function V(R, T) {
    let L = 0,
      _ = 0;
    while (L < R || !T) {
      let k = A.charCodeAt(I);
      if (k >= 48 && k <= 57) _ = _ * 16 + k - 48;
      else if (k >= 65 && k <= 70) _ = _ * 16 + k - 65 + 10;
      else if (k >= 97 && k <= 102) _ = _ * 16 + k - 97 + 10;
      else break;
      I++, L++
    }
    if (L < R) _ = -1;
    return _
  }

  function C(R) {
    I = R, G = "", Z = 0, D = 16, X = 0
  }

  function K() {
    let R = I;
    if (A.charCodeAt(I) === 48) I++;
    else {
      I++;
      while (I < A.length && vv(A.charCodeAt(I))) I++
    }
    if (I < A.length && A.charCodeAt(I) === 46)
      if (I++, I < A.length && vv(A.charCodeAt(I))) {
        I++;
        while (I < A.length && vv(A.charCodeAt(I))) I++
      } else return X = 3, A.substring(R, I);
    let T = I;
    if (I < A.length && (A.charCodeAt(I) === 69 || A.charCodeAt(I) === 101)) {
      if (I++, I < A.length && A.charCodeAt(I) === 43 || A.charCodeAt(I) === 45) I++;
      if (I < A.length && vv(A.charCodeAt(I))) {
        I++;
        while (I < A.length && vv(A.charCodeAt(I))) I++;
        T = I
      } else X = 3
    }
    return A.substring(R, T)
  }

  function E() {
    let R = "",
      T = I;
    while (!0) {
      if (I >= Q) {
        R += A.substring(T, I), X = 2;
        break
      }
      let L = A.charCodeAt(I);
      if (L === 34) {
        R += A.substring(T, I), I++;
        break
      }
      if (L === 92) {
        if (R += A.substring(T, I), I++, I >= Q) {
          X = 2;
          break
        }
        switch (A.charCodeAt(I++)) {
          case 34:
            R += '"';
            break;
          case 92:
            R += "\\";
            break;
          case 47:
            R += "/";
            break;
          case 98:
            R += "\b";
            break;
          case 102:
            R += "\f";
            break;
          case 110:
            R += `
`;
            break;
          case 114:
            R += "\r";
            break;
          case 116:
            R += "\t";
            break;
          case 117:
            let k = V(4, !0);
            if (k >= 0) R += String.fromCharCode(k);
            else X = 4;
            break;
          default:
            X = 5
        }
        T = I;
        continue
      }
      if (L >= 0 && L <= 31)
        if (ri(L)) {
          R += A.substring(T, I), X = 2;
          break
        } else X = 6;
      I++
    }
    return R
  }

  function N() {
    if (G = "", X = 0, Z = I, W = Y, F = J, I >= Q) return Z = Q, D = 17;
    let R = A.charCodeAt(I);
    if (KP1(R)) {
      do I++, G += String.fromCharCode(R), R = A.charCodeAt(I); while (KP1(R));
      return D = 15
    }
    if (ri(R)) {
      if (I++, G += String.fromCharCode(R), R === 13 && A.charCodeAt(I) === 10) I++, G += `
`;
      return Y++, J = I, D = 14
    }
    switch (R) {
      case 123:
        return I++, D = 1;
      case 125:
        return I++, D = 2;
      case 91:
        return I++, D = 3;
      case 93:
        return I++, D = 4;
      case 58:
        return I++, D = 6;
      case 44:
        return I++, D = 5;
      case 34:
        return I++, G = E(), D = 10;
      case 47:
        let T = I - 1;
        if (A.charCodeAt(I + 1) === 47) {
          I += 2;
          while (I < Q) {
            if (ri(A.charCodeAt(I))) break;
            I++
          }
          return G = A.substring(T, I), D = 12
        }
        if (A.charCodeAt(I + 1) === 42) {
          I += 2;
          let L = Q - 1,
            _ = !1;
          while (I < L) {
            let k = A.charCodeAt(I);
            if (k === 42 && A.charCodeAt(I + 1) === 47) {
              I += 2, _ = !0;
              break
            }
            if (I++, ri(k)) {
              if (k === 13 && A.charCodeAt(I) === 10) I++;
              Y++, J = I
            }
          }
          if (!_) I++, X = 1;
          return G = A.substring(T, I), D = 13
        }
        return G += String.fromCharCode(R), I++, D = 16;
      case 45:
        if (G += String.fromCharCode(R), I++, I === Q || !vv(A.charCodeAt(I))) return D = 16;
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return G += K(), D = 11;
      default:
        while (I < Q && q(R)) I++, R = A.charCodeAt(I);
        if (Z !== I) {
          switch (G = A.substring(Z, I), G) {
            case "true":
              return D = 8;
            case "false":
              return D = 9;
            case "null":
              return D = 7
          }
          return D = 16
        }
        return G += String.fromCharCode(R), I++, D = 16
    }
  }

  function q(R) {
    if (KP1(R) || ri(R)) return !1;
    switch (R) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return !1
    }
    return !0
  }

  function O() {
    let R;
    do R = N(); while (R >= 12 && R <= 15);
    return R
  }
  return {
    setPosition: C,
    getPosition: () => I,
    scan: B ? O : N,
    getToken: () => D,
    getTokenValue: () => G,
    getTokenOffset: () => Z,
    getTokenLength: () => I - Z,
    getTokenStartLine: () => W,
    getTokenStartCharacter: () => Z - F,
    getTokenError: () => X
  }
}
// @from(Start 8653335, End 8653383)
function KP1(A) {
  return A === 32 || A === 9
}
// @from(Start 8653385, End 8653433)
function ri(A) {
  return A === 10 || A === 13
}
// @from(Start 8653435, End 8653481)
function vv(A) {
  return A >= 48 && A <= 57
}
// @from(Start 8653486, End 8653489)
JvA
// @from(Start 8655332, End 8655400)
FJ = new Array(20).fill(0).map((A, B) => {
  return " ".repeat(B)
})
// @from(Start 8655406, End 8656040)
HP1 = {
    " ": {
      "\n": new Array(200).fill(0).map((A, B) => {
        return `
` + " ".repeat(B)
      }),
      "\r": new Array(200).fill(0).map((A, B) => {
        return "\r" + " ".repeat(B)
      }),
      "\r\n": new Array(200).fill(0).map((A, B) => {
        return `\r
` + " ".repeat(B)
      })
    },
    "\t": {
      "\n": new Array(200).fill(0).map((A, B) => {
        return `
` + "\t".repeat(B)
      }),
      "\r": new Array(200).fill(0).map((A, B) => {
        return "\r" + "\t".repeat(B)
      }),
      "\r\n": new Array(200).fill(0).map((A, B) => {
        return `\r
` + "\t".repeat(B)
      })
    }
  }
// @from(Start 8656044, End 8656068)
FvA = [`
`, "\r", `\r
`]
// @from(Start 8656071, End 8659308)
function zP1(A, B, Q) {
  let I, G, Z, D, Y;
  if (B) {
    D = B.offset, Y = D + B.length, Z = D;
    while (Z > 0 && !ti(A, Z - 1)) Z--;
    let L = Y;
    while (L < A.length && !ti(A, L)) L++;
    G = A.substring(Z, L), I = Ko9(G, Q)
  } else G = A, I = 0, Z = 0, D = 0, Y = A.length;
  let W = Ho9(Q, A),
    J = FvA.includes(W),
    F = 0,
    X = 0,
    V;
  if (Q.insertSpaces) V = FJ[Q.tabSize || 4] ?? bv(FJ[1], Q.tabSize || 4);
  else V = "\t";
  let C = V === "\t" ? "\t" : " ",
    K = oi(G, !1),
    E = !1;

  function N() {
    if (F > 1) return bv(W, F) + bv(V, I + X);
    let L = V.length * (I + X);
    if (!J || L > HP1[C][W].length) return W + bv(V, I + X);
    if (L <= 0) return W;
    return HP1[C][W][L]
  }

  function q() {
    let L = K.scan();
    F = 0;
    while (L === 15 || L === 14) {
      if (L === 14 && Q.keepLines) F += 1;
      else if (L === 14) F = 1;
      L = K.scan()
    }
    return E = L === 16 || K.getTokenError() !== 0, L
  }
  let O = [];

  function R(L, _, k) {
    if (!E && (!B || _ < Y && k > D) && A.substring(_, k) !== L) O.push({
      offset: _,
      length: k - _,
      content: L
    })
  }
  let T = q();
  if (Q.keepLines && F > 0) R(bv(W, F), 0, 0);
  if (T !== 17) {
    let L = K.getTokenOffset() + Z,
      _ = V.length * I < 20 && Q.insertSpaces ? FJ[V.length * I] : bv(V, I);
    R(_, Z, L)
  }
  while (T !== 17) {
    let L = K.getTokenOffset() + K.getTokenLength() + Z,
      _ = q(),
      k = "",
      i = !1;
    while (F === 0 && (_ === 12 || _ === 13)) {
      let s = K.getTokenOffset() + Z;
      R(FJ[1], L, s), L = K.getTokenOffset() + K.getTokenLength() + Z, i = _ === 12, k = i ? N() : "", _ = q()
    }
    if (_ === 2) {
      if (T !== 1) X--;
      if (Q.keepLines && F > 0 || !Q.keepLines && T !== 1) k = N();
      else if (Q.keepLines) k = FJ[1]
    } else if (_ === 4) {
      if (T !== 3) X--;
      if (Q.keepLines && F > 0 || !Q.keepLines && T !== 3) k = N();
      else if (Q.keepLines) k = FJ[1]
    } else {
      switch (T) {
        case 3:
        case 1:
          if (X++, Q.keepLines && F > 0 || !Q.keepLines) k = N();
          else k = FJ[1];
          break;
        case 5:
          if (Q.keepLines && F > 0 || !Q.keepLines) k = N();
          else k = FJ[1];
          break;
        case 12:
          k = N();
          break;
        case 13:
          if (F > 0) k = N();
          else if (!i) k = FJ[1];
          break;
        case 6:
          if (Q.keepLines && F > 0) k = N();
          else if (!i) k = FJ[1];
          break;
        case 10:
          if (Q.keepLines && F > 0) k = N();
          else if (_ === 6 && !i) k = "";
          break;
        case 7:
        case 8:
        case 9:
        case 11:
        case 2:
        case 4:
          if (Q.keepLines && F > 0) k = N();
          else if ((_ === 12 || _ === 13) && !i) k = FJ[1];
          else if (_ !== 5 && _ !== 17) E = !0;
          break;
        case 16:
          E = !0;
          break
      }
      if (F > 0 && (_ === 12 || _ === 13)) k = N()
    }
    if (_ === 17)
      if (Q.keepLines && F > 0) k = N();
      else k = Q.insertFinalNewline ? W : "";
    let x = K.getTokenOffset() + Z;
    R(k, L, x), T = _
  }
  return O
}
// @from(Start 8659310, End 8659394)
function bv(A, B) {
  let Q = "";
  for (let I = 0; I < B; I++) Q += A;
  return Q
}
// @from(Start 8659396, End 8659630)
function Ko9(A, B) {
  let Q = 0,
    I = 0,
    G = B.tabSize || 4;
  while (Q < A.length) {
    let Z = A.charAt(Q);
    if (Z === FJ[1]) I++;
    else if (Z === "\t") I += G;
    else break;
    Q++
  }
  return Math.floor(I / G)
}
// @from(Start 8659632, End 8659895)
function Ho9(A, B) {
  for (let Q = 0; Q < B.length; Q++) {
    let I = B.charAt(Q);
    if (I === "\r") {
      if (Q + 1 < B.length && B.charAt(Q + 1) === `
`) return `\r
`;
      return "\r"
    } else if (I === `
`) return `
`
  }
  return A && A.eol || `
`
}
// @from(Start 8659897, End 8659961)
function ti(A, B) {
  return `\r
`.indexOf(A.charAt(B)) !== -1
}
// @from(Start 8659966, End 8659968)
ei
// @from(Start 8660054, End 8660729)
function XvA(A, B = [], Q = ei.DEFAULT) {
  let I = null,
    G = [],
    Z = [];

  function D(W) {
    if (Array.isArray(G)) G.push(W);
    else if (I !== null) G[I] = W
  }
  return EP1(A, {
    onObjectBegin: () => {
      let W = {};
      D(W), Z.push(G), G = W, I = null
    },
    onObjectProperty: (W) => {
      I = W
    },
    onObjectEnd: () => {
      G = Z.pop()
    },
    onArrayBegin: () => {
      let W = [];
      D(W), Z.push(G), G = W, I = null
    },
    onArrayEnd: () => {
      G = Z.pop()
    },
    onLiteralValue: D,
    onError: (W, J, F) => {
      B.push({
        error: W,
        offset: J,
        length: F
      })
    }
  }, Q), G[0]
}
// @from(Start 8660731, End 8662364)
function wP1(A, B = [], Q = ei.DEFAULT) {
  let I = {
    type: "array",
    offset: -1,
    length: -1,
    children: [],
    parent: void 0
  };

  function G(W) {
    if (I.type === "property") I.length = W - I.offset, I = I.parent
  }

  function Z(W) {
    return I.children.push(W), W
  }
  EP1(A, {
    onObjectBegin: (W) => {
      I = Z({
        type: "object",
        offset: W,
        length: -1,
        parent: I,
        children: []
      })
    },
    onObjectProperty: (W, J, F) => {
      I = Z({
        type: "property",
        offset: J,
        length: -1,
        parent: I,
        children: []
      }), I.children.push({
        type: "string",
        value: W,
        offset: J,
        length: F,
        parent: I
      })
    },
    onObjectEnd: (W, J) => {
      G(W + J), I.length = W + J - I.offset, I = I.parent, G(W + J)
    },
    onArrayBegin: (W, J) => {
      I = Z({
        type: "array",
        offset: W,
        length: -1,
        parent: I,
        children: []
      })
    },
    onArrayEnd: (W, J) => {
      I.length = W + J - I.offset, I = I.parent, G(W + J)
    },
    onLiteralValue: (W, J, F) => {
      Z({
        type: wo9(W),
        offset: J,
        length: F,
        parent: I,
        value: W
      }), G(J + F)
    },
    onSeparator: (W, J, F) => {
      if (I.type === "property") {
        if (W === ":") I.colonOffset = J;
        else if (W === ",") G(J)
      }
    },
    onError: (W, J, F) => {
      B.push({
        error: W,
        offset: J,
        length: F
      })
    }
  }, Q);
  let Y = I.children[0];
  if (Y) delete Y.parent;
  return Y
}
// @from(Start 8662366, End 8662937)
function l81(A, B) {
  if (!A) return;
  let Q = A;
  for (let I of B)
    if (typeof I === "string") {
      if (Q.type !== "object" || !Array.isArray(Q.children)) return;
      let G = !1;
      for (let Z of Q.children)
        if (Array.isArray(Z.children) && Z.children[0].value === I && Z.children.length === 2) {
          Q = Z.children[1], G = !0;
          break
        } if (!G) return
    } else {
      let G = I;
      if (Q.type !== "array" || G < 0 || !Array.isArray(Q.children) || G >= Q.children.length) return;
      Q = Q.children[G]
    } return Q
}
// @from(Start 8662939, End 8666937)
function EP1(A, B, Q = ei.DEFAULT) {
  let I = oi(A, !1),
    G = [];

  function Z(F1) {
    return F1 ? () => F1(I.getTokenOffset(), I.getTokenLength(), I.getTokenStartLine(), I.getTokenStartCharacter()) : () => !0
  }

  function D(F1) {
    return F1 ? () => F1(I.getTokenOffset(), I.getTokenLength(), I.getTokenStartLine(), I.getTokenStartCharacter(), () => G.slice()) : () => !0
  }

  function Y(F1) {
    return F1 ? (X1) => F1(X1, I.getTokenOffset(), I.getTokenLength(), I.getTokenStartLine(), I.getTokenStartCharacter()) : () => !0
  }

  function W(F1) {
    return F1 ? (X1) => F1(X1, I.getTokenOffset(), I.getTokenLength(), I.getTokenStartLine(), I.getTokenStartCharacter(), () => G.slice()) : () => !0
  }
  let J = D(B.onObjectBegin),
    F = W(B.onObjectProperty),
    X = Z(B.onObjectEnd),
    V = D(B.onArrayBegin),
    C = Z(B.onArrayEnd),
    K = W(B.onLiteralValue),
    E = Y(B.onSeparator),
    N = Z(B.onComment),
    q = Y(B.onError),
    O = Q && Q.disallowComments,
    R = Q && Q.allowTrailingComma;

  function T() {
    while (!0) {
      let F1 = I.scan();
      switch (I.getTokenError()) {
        case 4:
          L(14);
          break;
        case 5:
          L(15);
          break;
        case 3:
          L(13);
          break;
        case 1:
          if (!O) L(11);
          break;
        case 2:
          L(12);
          break;
        case 6:
          L(16);
          break
      }
      switch (F1) {
        case 12:
        case 13:
          if (O) L(10);
          else N();
          break;
        case 16:
          L(1);
          break;
        case 15:
        case 14:
          break;
        default:
          return F1
      }
    }
  }

  function L(F1, X1 = [], v = []) {
    if (q(F1), X1.length + v.length > 0) {
      let D1 = I.getToken();
      while (D1 !== 17) {
        if (X1.indexOf(D1) !== -1) {
          T();
          break
        } else if (v.indexOf(D1) !== -1) break;
        D1 = T()
      }
    }
  }

  function _(F1) {
    let X1 = I.getTokenValue();
    if (F1) K(X1);
    else F(X1), G.push(X1);
    return T(), !0
  }

  function k() {
    switch (I.getToken()) {
      case 11:
        let F1 = I.getTokenValue(),
          X1 = Number(F1);
        if (isNaN(X1)) L(2), X1 = 0;
        K(X1);
        break;
      case 7:
        K(null);
        break;
      case 8:
        K(!0);
        break;
      case 9:
        K(!1);
        break;
      default:
        return !1
    }
    return T(), !0
  }

  function i() {
    if (I.getToken() !== 10) return L(3, [], [2, 5]), !1;
    if (_(!1), I.getToken() === 6) {
      if (E(":"), T(), !d()) L(4, [], [2, 5])
    } else L(5, [], [2, 5]);
    return G.pop(), !0
  }

  function x() {
    J(), T();
    let F1 = !1;
    while (I.getToken() !== 2 && I.getToken() !== 17) {
      if (I.getToken() === 5) {
        if (!F1) L(4, [], []);
        if (E(","), T(), I.getToken() === 2 && R) break
      } else if (F1) L(6, [], []);
      if (!i()) L(4, [], [2, 5]);
      F1 = !0
    }
    if (X(), I.getToken() !== 2) L(7, [2], []);
    else T();
    return !0
  }

  function s() {
    V(), T();
    let F1 = !0,
      X1 = !1;
    while (I.getToken() !== 4 && I.getToken() !== 17) {
      if (I.getToken() === 5) {
        if (!X1) L(4, [], []);
        if (E(","), T(), I.getToken() === 4 && R) break
      } else if (X1) L(6, [], []);
      if (F1) G.push(0), F1 = !1;
      else G[G.length - 1]++;
      if (!d()) L(4, [], [4, 5]);
      X1 = !0
    }
    if (C(), !F1) G.pop();
    if (I.getToken() !== 4) L(8, [4], []);
    else T();
    return !0
  }

  function d() {
    switch (I.getToken()) {
      case 3:
        return s();
      case 1:
        return x();
      case 10:
        return _(!0);
      default:
        return k()
    }
  }
  if (T(), I.getToken() === 17) {
    if (Q.allowEmptyContent) return !0;
    return L(4, [], []), !1
  }
  if (!d()) return L(4, [], []), !1;
  if (I.getToken() !== 17) L(9, [], []);
  return !0
}
// @from(Start 8666939, End 8667272)
function wo9(A) {
  switch (typeof A) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    case "object": {
      if (!A) return "null";
      else if (Array.isArray(A)) return "array";
      return "object"
    }
    default:
      return "null"
  }
}
// @from(Start 8667274, End 8671240)
function VvA(A, B, Q, I) {
  let G = B.slice(),
    D = wP1(A, []),
    Y = void 0,
    W = void 0;
  while (G.length > 0)
    if (W = G.pop(), Y = l81(D, G), Y === void 0 && Q !== void 0)
      if (typeof W === "string") Q = {
        [W]: Q
      };
      else Q = [Q];
  else break;
  if (!Y) {
    if (Q === void 0) throw new Error("Can not delete in empty document");
    return MS(A, {
      offset: D ? D.offset : 0,
      length: D ? D.length : 0,
      content: JSON.stringify(Q)
    }, I)
  } else if (Y.type === "object" && typeof W === "string" && Array.isArray(Y.children)) {
    let J = l81(Y, [W]);
    if (J !== void 0)
      if (Q === void 0) {
        if (!J.parent) throw new Error("Malformed AST");
        let F = Y.children.indexOf(J.parent),
          X, V = J.parent.offset + J.parent.length;
        if (F > 0) {
          let C = Y.children[F - 1];
          X = C.offset + C.length
        } else if (X = Y.offset + 1, Y.children.length > 1) V = Y.children[1].offset;
        return MS(A, {
          offset: X,
          length: V - X,
          content: ""
        }, I)
      } else return MS(A, {
        offset: J.offset,
        length: J.length,
        content: JSON.stringify(Q)
      }, I);
    else {
      if (Q === void 0) return [];
      let F = `${JSON.stringify(W)}: ${JSON.stringify(Q)}`,
        X = I.getInsertionIndex ? I.getInsertionIndex(Y.children.map((C) => C.children[0].value)) : Y.children.length,
        V;
      if (X > 0) {
        let C = Y.children[X - 1];
        V = {
          offset: C.offset + C.length,
          length: 0,
          content: "," + F
        }
      } else if (Y.children.length === 0) V = {
        offset: Y.offset + 1,
        length: 0,
        content: F
      };
      else V = {
        offset: Y.offset + 1,
        length: 0,
        content: F + ","
      };
      return MS(A, V, I)
    }
  } else if (Y.type === "array" && typeof W === "number" && Array.isArray(Y.children)) {
    let J = W;
    if (J === -1) {
      let F = `${JSON.stringify(Q)}`,
        X;
      if (Y.children.length === 0) X = {
        offset: Y.offset + 1,
        length: 0,
        content: F
      };
      else {
        let V = Y.children[Y.children.length - 1];
        X = {
          offset: V.offset + V.length,
          length: 0,
          content: "," + F
        }
      }
      return MS(A, X, I)
    } else if (Q === void 0 && Y.children.length >= 0) {
      let F = W,
        X = Y.children[F],
        V;
      if (Y.children.length === 1) V = {
        offset: Y.offset + 1,
        length: Y.length - 2,
        content: ""
      };
      else if (Y.children.length - 1 === F) {
        let C = Y.children[F - 1],
          K = C.offset + C.length,
          E = Y.offset + Y.length;
        V = {
          offset: K,
          length: E - 2 - K,
          content: ""
        }
      } else V = {
        offset: X.offset,
        length: Y.children[F + 1].offset - X.offset,
        content: ""
      };
      return MS(A, V, I)
    } else if (Q !== void 0) {
      let F, X = `${JSON.stringify(Q)}`;
      if (!I.isArrayInsertion && Y.children.length > W) {
        let V = Y.children[W];
        F = {
          offset: V.offset,
          length: V.length,
          content: X
        }
      } else if (Y.children.length === 0 || W === 0) F = {
        offset: Y.offset + 1,
        length: 0,
        content: Y.children.length === 0 ? X : X + ","
      };
      else {
        let V = W > Y.children.length ? Y.children.length : W,
          C = Y.children[V - 1];
        F = {
          offset: C.offset + C.length,
          length: 0,
          content: "," + X
        }
      }
      return MS(A, F, I)
    } else throw new Error(`Can not ${Q===void 0?"remove":I.isArrayInsertion?"insert":"modify"} Array index ${J} as length is not sufficient`)
  } else throw new Error(`Can not add ${typeof W!=="number"?"index":"property"} to parent of type ${Y.type}`)
}
// @from(Start 8671242, End 8671931)
function MS(A, B, Q) {
  if (!Q.formattingOptions) return [B];
  let I = i81(A, B),
    G = B.offset,
    Z = B.offset + B.content.length;
  if (B.length === 0 || B.content.length === 0) {
    while (G > 0 && !ti(I, G - 1)) G--;
    while (Z < I.length && !ti(I, Z)) Z++
  }
  let D = zP1(I, {
    offset: G,
    length: Z - G
  }, {
    ...Q.formattingOptions,
    keepLines: !1
  });
  for (let W = D.length - 1; W >= 0; W--) {
    let J = D[W];
    I = i81(I, J), G = Math.min(G, J.offset), Z = Math.max(Z, J.offset + J.length), Z += J.content.length - J.length
  }
  let Y = A.length - (I.length - Z) - G;
  return [{
    offset: G,
    length: Y,
    content: I.substring(G, Z)
  }]
}
// @from(Start 8671933, End 8672036)
function i81(A, B) {
  return A.substring(0, B.offset) + B.content + A.substring(B.offset + B.length)
}
// @from(Start 8672041, End 8672044)
CvA
// @from(Start 8672441, End 8672444)
KvA
// @from(Start 8673187, End 8673196)
UP1 = XvA
// @from(Start 8673202, End 8673205)
HvA
// @from(Start 8674072, End 8674125)
function zvA(A, B, Q, I) {
  return VvA(A, B, Q, I)
}
// @from(Start 8674127, End 8674499)
function wvA(A, B) {
  let Q = B.slice(0).sort((G, Z) => {
      let D = G.offset - Z.offset;
      if (D === 0) return G.length - Z.length;
      return D
    }),
    I = A.length;
  for (let G = Q.length - 1; G >= 0; G--) {
    let Z = Q[G];
    if (Z.offset + Z.length <= I) A = i81(A, Z);
    else throw new Error("Overlapping edit");
    I = Z.offset
  }
  return A
}
// @from(Start 8674504, End 8674641)
Z8 = L0((A, B = !0) => {
  if (!A) return null;
  try {
    return JSON.parse(A)
  } catch (Q) {
    if (B) b1(Q);
    return null
  }
})
// @from(Start 8674644, End 8674755)
function EvA(A) {
  if (!A) return null;
  try {
    return UP1(A)
  } catch (B) {
    return b1(B), null
  }
}
// @from(Start 8674756, End 8675169)
async function n81(A) {
  try {
    let B = await No9(A, "utf8");
    if (!B.trim()) return [];
    return B.split(`
`).filter((Q) => Q.trim()).map((Q) => {
      try {
        return JSON.parse(Q)
      } catch (I) {
        return b1(new Error(`Error parsing line in ${A}: ${I}`)), null
      }
    }).filter((Q) => Q !== null)
  } catch (B) {
    return b1(new Error(`Error opening file ${A}: ${B}`)), []
  }
}
// @from(Start 8675171, End 8675774)
function UvA(A, B) {
  try {
    if (!A || A.trim() === "") return JSON.stringify([B], null, 4);
    let Q = UP1(A);
    if (Array.isArray(Q)) {
      let I = Q.length,
        D = zvA(A, I === 0 ? [0] : [I], B, {
          formattingOptions: {
            insertSpaces: !0,
            tabSize: 4
          },
          isArrayInsertion: !0
        });
      if (!D || D.length === 0) {
        let Y = [...Q, B];
        return JSON.stringify(Y, null, 4)
      }
      return wvA(A, D)
    } else return JSON.stringify([B], null, 4)
  } catch (Q) {
    return b1(Q), JSON.stringify([B], null, 4)
  }
}
// @from(Start 8675779, End 8675817)
NvA = (A = 0) => (B) => `\x1B[${B+A}m`
// @from(Start 8675821, End 8675867)
$vA = (A = 0) => (B) => `\x1B[${38+A};5;${B}m`
// @from(Start 8675871, End 8675933)
qvA = (A = 0) => (B, Q, I) => `\x1B[${38+A};2;${B};${Q};${I}m`
// @from(Start 8675937, End 8677184)
lB = {
    modifier: {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      overline: [53, 55],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29]
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      blackBright: [90, 39],
      gray: [90, 39],
      grey: [90, 39],
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39]
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgBlackBright: [100, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49]
    }
  }
// @from(Start 8677188, End 8677218)
o08 = Object.keys(lB.modifier)
// @from(Start 8677222, End 8677249)
$o9 = Object.keys(lB.color)
// @from(Start 8677253, End 8677282)
qo9 = Object.keys(lB.bgColor)
// @from(Start 8677286, End 8677308)
t08 = [...$o9, ...qo9]
// @from(Start 8677311, End 8679576)
function Mo9() {
  let A = new Map;
  for (let [B, Q] of Object.entries(lB)) {
    for (let [I, G] of Object.entries(Q)) lB[I] = {
      open: `\x1B[${G[0]}m`,
      close: `\x1B[${G[1]}m`
    }, Q[I] = lB[I], A.set(G[0], G[1]);
    Object.defineProperty(lB, B, {
      value: Q,
      enumerable: !1
    })
  }
  return Object.defineProperty(lB, "codes", {
    value: A,
    enumerable: !1
  }), lB.color.close = "\x1B[39m", lB.bgColor.close = "\x1B[49m", lB.color.ansi = NvA(), lB.color.ansi256 = $vA(), lB.color.ansi16m = qvA(), lB.bgColor.ansi = NvA(10), lB.bgColor.ansi256 = $vA(10), lB.bgColor.ansi16m = qvA(10), Object.defineProperties(lB, {
    rgbToAnsi256: {
      value(B, Q, I) {
        if (B === Q && Q === I) {
          if (B < 8) return 16;
          if (B > 248) return 231;
          return Math.round((B - 8) / 247 * 24) + 232
        }
        return 16 + 36 * Math.round(B / 255 * 5) + 6 * Math.round(Q / 255 * 5) + Math.round(I / 255 * 5)
      },
      enumerable: !1
    },
    hexToRgb: {
      value(B) {
        let Q = /[a-f\d]{6}|[a-f\d]{3}/i.exec(B.toString(16));
        if (!Q) return [0, 0, 0];
        let [I] = Q;
        if (I.length === 3) I = [...I].map((Z) => Z + Z).join("");
        let G = Number.parseInt(I, 16);
        return [G >> 16 & 255, G >> 8 & 255, G & 255]
      },
      enumerable: !1
    },
    hexToAnsi256: {
      value: (B) => lB.rgbToAnsi256(...lB.hexToRgb(B)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value(B) {
        if (B < 8) return 30 + B;
        if (B < 16) return 90 + (B - 8);
        let Q, I, G;
        if (B >= 232) Q = ((B - 232) * 10 + 8) / 255, I = Q, G = Q;
        else {
          B -= 16;
          let Y = B % 36;
          Q = Math.floor(B / 36) / 5, I = Math.floor(Y / 6) / 5, G = Y % 6 / 5
        }
        let Z = Math.max(Q, I, G) * 2;
        if (Z === 0) return 30;
        let D = 30 + (Math.round(G) << 2 | Math.round(I) << 1 | Math.round(Q));
        if (Z === 2) D += 60;
        return D
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (B, Q, I) => lB.ansi256ToAnsi(lB.rgbToAnsi256(B, Q, I)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (B) => lB.ansi256ToAnsi(lB.hexToAnsi256(B)),
      enumerable: !1
    }
  }), lB
}
// @from(Start 8679581, End 8679592)
Lo9 = Mo9()
// @from(Start 8679596, End 8679604)
HC = Lo9
// @from(Start 8679694, End 8679923)
function AX(A, B = globalThis.Deno ? globalThis.Deno.args : NP1.argv) {
  let Q = A.startsWith("-") ? "" : A.length === 1 ? "-" : "--",
    I = B.indexOf(Q + A),
    G = B.indexOf("--");
  return I !== -1 && (G === -1 || I < G)
}
// @from(Start 8680134, End 8680370)
function Oo9() {
  if ("FORCE_COLOR" in u3) {
    if (u3.FORCE_COLOR === "true") return 1;
    if (u3.FORCE_COLOR === "false") return 0;
    return u3.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(u3.FORCE_COLOR, 10), 3)
  }
}
// @from(Start 8680372, End 8680503)
function To9(A) {
  if (A === 0) return !1;
  return {
    level: A,
    hasBasic: !0,
    has256: A >= 2,
    has16m: A >= 3
  }
}
// @from(Start 8680505, End 8682017)
function Po9(A, {
  streamIsTTY: B,
  sniffFlags: Q = !0
} = {}) {
  let I = Oo9();
  if (I !== void 0) a81 = I;
  let G = Q ? a81 : I;
  if (G === 0) return 0;
  if (Q) {
    if (AX("color=16m") || AX("color=full") || AX("color=truecolor")) return 3;
    if (AX("color=256")) return 2
  }
  if ("TF_BUILD" in u3 && "AGENT_NAME" in u3) return 1;
  if (A && !B && G === void 0) return 0;
  let Z = G || 0;
  if (u3.TERM === "dumb") return Z;
  if (NP1.platform === "win32") {
    let D = Ro9.release().split(".");
    if (Number(D[0]) >= 10 && Number(D[2]) >= 10586) return Number(D[2]) >= 14931 ? 3 : 2;
    return 1
  }
  if ("CI" in u3) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((D) => (D in u3))) return 3;
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((D) => (D in u3)) || u3.CI_NAME === "codeship") return 1;
    return Z
  }
  if ("TEAMCITY_VERSION" in u3) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(u3.TEAMCITY_VERSION) ? 1 : 0;
  if (u3.COLORTERM === "truecolor") return 3;
  if (u3.TERM === "xterm-kitty") return 3;
  if ("TERM_PROGRAM" in u3) {
    let D = Number.parseInt((u3.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (u3.TERM_PROGRAM) {
      case "iTerm.app":
        return D >= 3 ? 3 : 2;
      case "Apple_Terminal":
        return 2
    }
  }
  if (/-256(color)?$/i.test(u3.TERM)) return 2;
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(u3.TERM)) return 1;
  if ("COLORTERM" in u3) return 1;
  return Z
}
// @from(Start 8682019, End 8682127)
function LvA(A, B = {}) {
  let Q = Po9(A, {
    streamIsTTY: A && A.isTTY,
    ...B
  });
  return To9(Q)
}
// @from(Start 8682132, End 8682248)
So9 = {
    stdout: LvA({
      isTTY: MvA.isatty(1)
    }),
    stderr: LvA({
      isTTY: MvA.isatty(2)
    })
  }
// @from(Start 8682252, End 8682261)
RvA = So9
// @from(Start 8682264, End 8682493)
function OvA(A, B, Q) {
  let I = A.indexOf(B);
  if (I === -1) return A;
  let G = B.length,
    Z = 0,
    D = "";
  do D += A.slice(Z, I) + B + Q, Z = I + G, I = A.indexOf(B, Z); while (I !== -1);
  return D += A.slice(Z), D
}
// @from(Start 8682495, End 8682733)
function TvA(A, B, Q, I) {
  let G = 0,
    Z = "";
  do {
    let D = A[I - 1] === "\r";
    Z += A.slice(G, D ? I - 1 : I) + B + (D ? `\r
` : `
`) + Q, G = I + 1, I = A.indexOf(`
`, G)
  } while (I !== -1);
  return Z += A.slice(G), Z
}
// @from(Start 8683182, End 8683293)
jo9 = (A) => {
  let B = (...Q) => Q.join(" ");
  return _o9(B, A), Object.setPrototypeOf(B, Bn.prototype), B
}
// @from(Start 8683296, End 8683330)
function Bn(A) {
  return jo9(A)
}
// @from(Start 8683738, End 8684062)
qP1 = (A, B, Q, ...I) => {
    if (A === "rgb") {
      if (B === "ansi16m") return HC[Q].ansi16m(...I);
      if (B === "ansi256") return HC[Q].ansi256(HC.rgbToAnsi256(...I));
      return HC[Q].ansi(HC.rgbToAnsi(...I))
    }
    if (A === "hex") return qP1("rgb", B, Q, ...HC.hexToRgb(...I));
    return HC[Q][A](...I)
  }
// @from(Start 8684066, End 8684097)
yo9 = ["rgb", "hex", "ansi256"]
// @from(Start 8684647, End 8684850)
ko9 = Object.defineProperties(() => {}, {
    ...hv,
    level: {
      enumerable: !0,
      get() {
        return this[$P1].level
      },
      set(A) {
        this[$P1].level = A
      }
    }
  })
// @from(Start 8684854, End 8685079)
MP1 = (A, B, Q) => {
    let I, G;
    if (Q === void 0) I = A, G = B;
    else I = Q.openAll + A, G = B + Q.closeAll;
    return {
      open: A,
      close: B,
      openAll: I,
      closeAll: G,
      parent: Q
    }
  }
// @from(Start 8685083, End 8685257)
s81 = (A, B, Q) => {
    let I = (...G) => xo9(I, G.length === 1 ? "" + G[0] : G.join(" "));
    return Object.setPrototypeOf(I, ko9), I[$P1] = A, I[gv] = B, I[An] = Q, I
  }
// @from(Start 8685261, End 8685627)
xo9 = (A, B) => {
    if (A.level <= 0 || !B) return A[An] ? "" : B;
    let Q = A[gv];
    if (Q === void 0) return B;
    let {
      openAll: I,
      closeAll: G
    } = Q;
    if (B.includes("\x1B"))
      while (Q !== void 0) B = OvA(B, Q.close, Q.open), Q = Q.parent;
    let Z = B.indexOf(`
`);
    if (Z !== -1) B = TvA(B, G, I, Z);
    return I + B + G
  }
// @from(Start 8685676, End 8685686)
fo9 = Bn()
// @from(Start 8685690, End 8685736)
W28 = Bn({
    level: SvA ? SvA.level : 0
  })
// @from(Start 8685742, End 8685750)
UA = fo9
// @from(Start 8685803, End 8685820)
EmA = I1(U1(), 1)
// @from(Start 8685823, End 8686678)
function jvA(A, B, {
  signal: Q,
  edges: I
} = {}) {
  let G = void 0,
    Z = null,
    D = I != null && I.includes("leading"),
    Y = I == null || I.includes("trailing"),
    W = () => {
      if (Z !== null) A.apply(G, Z), G = void 0, Z = null
    },
    J = () => {
      if (Y) W();
      C()
    },
    F = null,
    X = () => {
      if (F != null) clearTimeout(F);
      F = setTimeout(() => {
        F = null, J()
      }, B)
    },
    V = () => {
      if (F !== null) clearTimeout(F), F = null
    },
    C = () => {
      V(), G = void 0, Z = null
    },
    K = () => {
      V(), W()
    },
    E = function(...N) {
      if (Q?.aborted) return;
      G = this, Z = N;
      let q = F == null;
      if (X(), D && q) W()
    };
  return E.schedule = X, E.cancel = C, E.flush = K, Q?.addEventListener("abort", C, {
    once: !0
  }), E
}
// @from(Start 8686680, End 8687401)
function yvA(A, B = 0, Q = {}) {
  if (typeof Q !== "object") Q = {};
  let {
    signal: I,
    leading: G = !1,
    trailing: Z = !0,
    maxWait: D
  } = Q, Y = Array(2);
  if (G) Y[0] = "leading";
  if (Z) Y[1] = "trailing";
  let W = void 0,
    J = null,
    F = jvA(function(...C) {
      W = A.apply(this, C), J = null
    }, B, {
      signal: I,
      edges: Y
    }),
    X = function(...C) {
      if (D != null) {
        if (J === null) J = Date.now();
        else if (Date.now() - J >= D) return W = A.apply(this, C), J = Date.now(), F.cancel(), F.schedule(), W
      }
      return F.apply(this, C), W
    },
    V = () => {
      return F.flush(), W
    };
  return X.cancel = F.cancel, X.flush = V, X
}
// @from(Start 8687403, End 8687637)
function r81(A, B = 0, Q = {}) {
  if (typeof Q !== "object") Q = {};
  let {
    leading: I = !0,
    trailing: G = !0,
    signal: Z
  } = Q;
  return yvA(A, B, {
    leading: I,
    trailing: G,
    signal: Z,
    maxWait: B
  })
}
// @from(Start 8687642, End 8687649)
BL = {}
// @from(Start 8688516, End 8688560)
o81 = globalThis.window?.document !== void 0
// @from(Start 8688564, End 8688615)
w28 = globalThis.process?.versions?.node !== void 0
// @from(Start 8688619, End 8688669)
E28 = globalThis.process?.versions?.bun !== void 0
// @from(Start 8688673, End 8688720)
U28 = globalThis.Deno?.version?.deno !== void 0
// @from(Start 8688724, End 8688779)
N28 = globalThis.process?.versions?.electron !== void 0
// @from(Start 8688783, End 8688846)
$28 = globalThis.navigator?.userAgent?.includes("jsdom") === !0
// @from(Start 8688850, End 8688939)
q28 = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope
// @from(Start 8688943, End 8689050)
M28 = typeof DedicatedWorkerGlobalScope !== "undefined" && globalThis instanceof DedicatedWorkerGlobalScope
// @from(Start 8689054, End 8689155)
L28 = typeof SharedWorkerGlobalScope !== "undefined" && globalThis instanceof SharedWorkerGlobalScope
// @from(Start 8689159, End 8689262)
R28 = typeof ServiceWorkerGlobalScope !== "undefined" && globalThis instanceof ServiceWorkerGlobalScope
// @from(Start 8689266, End 8689316)
Qn = globalThis.navigator?.userAgentData?.platform
// @from(Start 8689320, End 8689495)
O28 = Qn === "macOS" || globalThis.navigator?.platform === "MacIntel" || globalThis.navigator?.userAgent?.includes(" Mac ") === !0 || globalThis.process?.platform === "darwin"
// @from(Start 8689499, End 8689611)
T28 = Qn === "Windows" || globalThis.navigator?.platform === "Win32" || globalThis.process?.platform === "win32"
// @from(Start 8689615, End 8689804)
P28 = Qn === "Linux" || globalThis.navigator?.platform?.startsWith("Linux") === !0 || globalThis.navigator?.userAgent?.includes(" Linux ") === !0 || globalThis.process?.platform === "linux"
// @from(Start 8689808, End 8689978)
S28 = Qn === "iOS" || globalThis.navigator?.platform === "MacIntel" && globalThis.navigator?.maxTouchPoints > 1 || /iPad|iPhone|iPod/.test(globalThis.navigator?.platform)
// @from(Start 8689982, End 8690163)
_28 = Qn === "Android" || globalThis.navigator?.platform === "Android" || globalThis.navigator?.userAgent?.includes(" Android ") === !0 || globalThis.process?.platform === "android"
// @from(Start 8690169, End 8690181)
h5 = "\x1B["
// @from(Start 8690185, End 8690197)
Gn = "\x1B]"
// @from(Start 8690201, End 8690212)
mv = "\x07"
// @from(Start 8690216, End 8690224)
In = ";"
// @from(Start 8690228, End 8690283)
kvA = !o81 && RP1.env.TERM_PROGRAM === "Apple_Terminal"
// @from(Start 8690287, End 8690325)
vo9 = !o81 && RP1.platform === "win32"
// @from(Start 8690329, End 8690441)
bo9 = o81 ? () => {
    throw new Error("`process.cwd()` only works in Node.js, not the browser.")
  } : RP1.cwd
// @from(Start 8690445, End 8690653)
go9 = (A, B) => {
    if (typeof A !== "number") throw new TypeError("The `x` argument is required");
    if (typeof B !== "number") return h5 + (A + 1) + "G";
    return h5 + (B + 1) + In + (A + 1) + "H"
  }
// @from(Start 8690657, End 8690939)
ho9 = (A, B) => {
    if (typeof A !== "number") throw new TypeError("The `x` argument is required");
    let Q = "";
    if (A < 0) Q += h5 + -A + "D";
    else if (A > 0) Q += h5 + A + "C";
    if (B < 0) Q += h5 + -B + "A";
    else if (B > 0) Q += h5 + B + "B";
    return Q
  }
// @from(Start 8690943, End 8690972)
xvA = (A = 1) => h5 + A + "A"
// @from(Start 8690976, End 8691005)
mo9 = (A = 1) => h5 + A + "B"
// @from(Start 8691009, End 8691038)
do9 = (A = 1) => h5 + A + "C"
// @from(Start 8691042, End 8691071)
uo9 = (A = 1) => h5 + A + "D"
// @from(Start 8691075, End 8691089)
fvA = h5 + "G"
// @from(Start 8691093, End 8691123)
po9 = kvA ? "\x1B7" : h5 + "s"
// @from(Start 8691127, End 8691157)
co9 = kvA ? "\x1B8" : h5 + "u"
// @from(Start 8691161, End 8691176)
lo9 = h5 + "6n"
// @from(Start 8691180, End 8691194)
io9 = h5 + "E"
// @from(Start 8691198, End 8691212)
no9 = h5 + "F"
// @from(Start 8691216, End 8691233)
ao9 = h5 + "?25l"
// @from(Start 8691237, End 8691254)
OP1 = h5 + "?25h"
// @from(Start 8691258, End 8691395)
so9 = (A) => {
    let B = "";
    for (let Q = 0; Q < A; Q++) B += vvA + (Q < A - 1 ? xvA() : "");
    if (A) B += fvA;
    return B
  }
// @from(Start 8691399, End 8691413)
ro9 = h5 + "K"
// @from(Start 8691417, End 8691432)
oo9 = h5 + "1K"
// @from(Start 8691436, End 8691451)
vvA = h5 + "2K"
// @from(Start 8691455, End 8691469)
to9 = h5 + "J"
// @from(Start 8691473, End 8691488)
eo9 = h5 + "1J"
// @from(Start 8691492, End 8691507)
LP1 = h5 + "2J"
// @from(Start 8691511, End 8691525)
At9 = h5 + "S"
// @from(Start 8691529, End 8691543)
Bt9 = h5 + "T"
// @from(Start 8691547, End 8691560)
Qt9 = "\x1Bc"
// @from(Start 8691564, End 8691615)
It9 = vo9 ? `${LP1}${h5}0f` : `${LP1}${h5}3J${h5}H`
// @from(Start 8691619, End 8691638)
Gt9 = h5 + "?1049h"
// @from(Start 8691642, End 8691661)
Zt9 = h5 + "?1049l"
// @from(Start 8691665, End 8691673)
Dt9 = mv
// @from(Start 8691677, End 8691750)
Yt9 = (A, B) => [Gn, "8", In, In, B, mv, A, Gn, "8", In, In, mv].join("")
// @from(Start 8691754, End 8692037)
Wt9 = (A, B = {}) => {
    let Q = `${Gn}1337;File=inline=1`;
    if (B.width) Q += `;width=${B.width}`;
    if (B.height) Q += `;height=${B.height}`;
    if (B.preserveAspectRatio === !1) Q += ";preserveAspectRatio=0";
    return Q + ":" + Buffer.from(A).toString("base64") + mv
  }
// @from(Start 8692041, End 8692583)
Jt9 = {
    setCwd: (A = bo9()) => `${Gn}50;CurrentDir=${A}${mv}`,
    annotation(A, B = {}) {
      let Q = `${Gn}1337;`,
        I = B.x !== void 0,
        G = B.y !== void 0;
      if ((I || G) && !(I && G && B.length !== void 0)) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
      if (A = A.replaceAll("|", ""), Q += B.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", B.length > 0) Q += (I ? [A, B.length, B.x, B.y] : [B.length, A]).join("|");
      else Q += A;
      return Q + mv
    }
  }
// @from(Start 8692589, End 8692760)
Ft9 = (A) => {
  let B = new Set;
  do
    for (let Q of Reflect.ownKeys(A)) B.add([A, Q]); while ((A = Reflect.getPrototypeOf(A)) && A !== Object.prototype);
  return B
}
// @from(Start 8692763, End 8693212)
function TP1(A, {
  include: B,
  exclude: Q
} = {}) {
  let I = (G) => {
    let Z = (D) => typeof D === "string" ? G === D : D.test(G);
    if (B) return B.some(Z);
    if (Q) return !Q.some(Z);
    return !0
  };
  for (let [G, Z] of Ft9(A.constructor.prototype)) {
    if (Z === "constructor" || !I(Z)) continue;
    let D = Reflect.getOwnPropertyDescriptor(G, Z);
    if (D && typeof D.value === "function") A[Z] = A[Z].bind(A)
  }
  return A
}
// @from(Start 8693217, End 8693224)
LS = []
// @from(Start 8693509, End 8693790)
t81 = (A) => !!A && typeof A === "object" && typeof A.removeListener === "function" && typeof A.emit === "function" && typeof A.reallyExit === "function" && typeof A.listeners === "function" && typeof A.kill === "function" && typeof A.pid === "number" && typeof A.on === "function"
// @from(Start 8693794, End 8693833)
PP1 = Symbol.for("signal-exit emitter")
// @from(Start 8693837, End 8693853)
SP1 = globalThis
// @from(Start 8693857, End 8693897)
Xt9 = Object.defineProperty.bind(Object)
// @from(Start 8693899, End 8694685)
class bvA {
  emitted = {
    afterExit: !1,
    exit: !1
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (SP1[PP1]) return SP1[PP1];
    Xt9(SP1, PP1, {
      value: this,
      writable: !1,
      enumerable: !1,
      configurable: !1
    })
  }
  on(A, B) {
    this.listeners[A].push(B)
  }
  removeListener(A, B) {
    let Q = this.listeners[A],
      I = Q.indexOf(B);
    if (I === -1) return;
    if (I === 0 && Q.length === 1) Q.length = 0;
    else Q.splice(I, 1)
  }
  emit(A, B, Q) {
    if (this.emitted[A]) return !1;
    this.emitted[A] = !0;
    let I = !1;
    for (let G of this.listeners[A]) I = G(B, Q) === !0 || I;
    if (A === "exit") I = this.emit("afterExit", B, Q) || I;
    return I
  }
}
// @from(Start 8694686, End 8694698)
class jP1 {}
// @from(Start 8694703, End 8694875)
Vt9 = (A) => {
  return {
    onExit(B, Q) {
      return A.onExit(B, Q)
    },
    load() {
      return A.load()
    },
    unload() {
      return A.unload()
    }
  }
}
// @from(Start 8694877, End 8694965)
class gvA extends jP1 {
  onExit() {
    return () => {}
  }
  load() {}
  unload() {}
}
// @from(Start 8694966, End 8697123)
class hvA extends jP1 {
  #A = _P1.platform === "win32" ? "SIGINT" : "SIGHUP";
  #B = new bvA;
  #Q;
  #I;
  #G;
  #W = {};
  #Z = !1;
  constructor(A) {
    super();
    this.#Q = A, this.#W = {};
    for (let B of LS) this.#W[B] = () => {
      let Q = this.#Q.listeners(B),
        {
          count: I
        } = this.#B,
        G = A;
      if (typeof G.__signal_exit_emitter__ === "object" && typeof G.__signal_exit_emitter__.count === "number") I += G.__signal_exit_emitter__.count;
      if (Q.length === I) {
        this.unload();
        let Z = this.#B.emit("exit", null, B),
          D = B === "SIGHUP" ? this.#A : B;
        if (!Z) A.kill(A.pid, D)
      }
    };
    this.#G = A.reallyExit, this.#I = A.emit
  }
  onExit(A, B) {
    if (!t81(this.#Q)) return () => {};
    if (this.#Z === !1) this.load();
    let Q = B?.alwaysLast ? "afterExit" : "exit";
    return this.#B.on(Q, A), () => {
      if (this.#B.removeListener(Q, A), this.#B.listeners.exit.length === 0 && this.#B.listeners.afterExit.length === 0) this.unload()
    }
  }
  load() {
    if (this.#Z) return;
    this.#Z = !0, this.#B.count += 1;
    for (let A of LS) try {
      let B = this.#W[A];
      if (B) this.#Q.on(A, B)
    } catch (B) {}
    this.#Q.emit = (A, ...B) => {
      return this.#J(A, ...B)
    }, this.#Q.reallyExit = (A) => {
      return this.#F(A)
    }
  }
  unload() {
    if (!this.#Z) return;
    this.#Z = !1, LS.forEach((A) => {
      let B = this.#W[A];
      if (!B) throw new Error("Listener not defined for signal: " + A);
      try {
        this.#Q.removeListener(A, B)
      } catch (Q) {}
    }), this.#Q.emit = this.#I, this.#Q.reallyExit = this.#G, this.#B.count -= 1
  }
  #F(A) {
    if (!t81(this.#Q)) return 0;
    return this.#Q.exitCode = A || 0, this.#B.emit("exit", this.#Q.exitCode, null), this.#G.call(this.#Q, this.#Q.exitCode)
  }
  #J(A, ...B) {
    let Q = this.#I;
    if (A === "exit" && t81(this.#Q)) {
      if (typeof B[0] === "number") this.#Q.exitCode = B[0];
      let I = Q.call(this.#Q, A, ...B);
      return this.#B.emit("exit", this.#Q.exitCode, null), I
    } else return Q.call(this.#Q, A, ...B)
  }
}
// @from(Start 8697308, End 8697492)
uvA = ["assert", "count", "countReset", "debug", "dir", "dirxml", "error", "group", "groupCollapsed", "groupEnd", "info", "log", "table", "time", "timeEnd", "timeLog", "trace", "warn"]
// @from(Start 8697496, End 8697504)
yP1 = {}
// @from(Start 8697508, End 8697852)
Ct9 = (A) => {
    let B = new dvA,
      Q = new dvA;
    B.write = (G) => {
      A("stdout", G)
    }, Q.write = (G) => {
      A("stderr", G)
    };
    let I = new console.Console(B, Q);
    for (let G of uvA) yP1[G] = console[G], console[G] = I[G];
    return () => {
      for (let G of uvA) console[G] = yP1[G];
      yP1 = {}
    }
  }
// @from(Start 8697856, End 8697865)
pvA = Ct9
// @from(Start 8697871, End 8697889)
KhA = I1(tvA(), 1)
// @from(Start 8697895, End 8697903)
cP1 = 16
// @from(Start 8697909, End 8697916)
V2 = {}
// @from(Start 8697920, End 8697943)
DB1 = V2.ALIGN_AUTO = 0
// @from(Start 8697947, End 8697975)
Wn = V2.ALIGN_FLEX_START = 1
// @from(Start 8697979, End 8698003)
Jn = V2.ALIGN_CENTER = 2
// @from(Start 8698007, End 8698033)
Fn = V2.ALIGN_FLEX_END = 3
// @from(Start 8698037, End 8698063)
YB1 = V2.ALIGN_STRETCH = 4
// @from(Start 8698067, End 8698094)
evA = V2.ALIGN_BASELINE = 5
// @from(Start 8698098, End 8698130)
AbA = V2.ALIGN_SPACE_BETWEEN = 6
// @from(Start 8698134, End 8698165)
BbA = V2.ALIGN_SPACE_AROUND = 7
// @from(Start 8698169, End 8698197)
QbA = V2.DIMENSION_WIDTH = 0
// @from(Start 8698201, End 8698230)
IbA = V2.DIMENSION_HEIGHT = 1
// @from(Start 8698234, End 8698264)
GbA = V2.DIRECTION_INHERIT = 0
// @from(Start 8698268, End 8698294)
ZbA = V2.DIRECTION_LTR = 1
// @from(Start 8698298, End 8698324)
DbA = V2.DIRECTION_RTL = 2
// @from(Start 8698328, End 8698352)
uv = V2.DISPLAY_FLEX = 0
// @from(Start 8698356, End 8698380)
IL = V2.DISPLAY_NONE = 1
// @from(Start 8698384, End 8698405)
Rz = V2.EDGE_LEFT = 0
// @from(Start 8698409, End 8698429)
GL = V2.EDGE_TOP = 1
// @from(Start 8698433, End 8698455)
Oz = V2.EDGE_RIGHT = 2
// @from(Start 8698459, End 8698482)
ZL = V2.EDGE_BOTTOM = 3
// @from(Start 8698486, End 8698509)
WB1 = V2.EDGE_START = 4
// @from(Start 8698513, End 8698534)
JB1 = V2.EDGE_END = 5
// @from(Start 8698538, End 8698565)
Xn = V2.EDGE_HORIZONTAL = 6
// @from(Start 8698569, End 8698594)
Vn = V2.EDGE_VERTICAL = 7
// @from(Start 8698598, End 8698618)
Cn = V2.EDGE_ALL = 8
// @from(Start 8698622, End 8698670)
YbA = V2.EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS = 0
// @from(Start 8698674, End 8698748)
WbA = V2.EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE = 1
// @from(Start 8698752, End 8698821)
JbA = V2.EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN = 2
// @from(Start 8698825, End 8698859)
FB1 = V2.FLEX_DIRECTION_COLUMN = 0
// @from(Start 8698863, End 8698905)
XB1 = V2.FLEX_DIRECTION_COLUMN_REVERSE = 1
// @from(Start 8698909, End 8698940)
VB1 = V2.FLEX_DIRECTION_ROW = 2
// @from(Start 8698944, End 8698983)
CB1 = V2.FLEX_DIRECTION_ROW_REVERSE = 3
// @from(Start 8698987, End 8699013)
KB1 = V2.GUTTER_COLUMN = 0
// @from(Start 8699017, End 8699040)
HB1 = V2.GUTTER_ROW = 1
// @from(Start 8699044, End 8699067)
zB1 = V2.GUTTER_ALL = 2
// @from(Start 8699071, End 8699102)
wB1 = V2.JUSTIFY_FLEX_START = 0
// @from(Start 8699106, End 8699133)
EB1 = V2.JUSTIFY_CENTER = 1
// @from(Start 8699137, End 8699166)
UB1 = V2.JUSTIFY_FLEX_END = 2
// @from(Start 8699170, End 8699204)
NB1 = V2.JUSTIFY_SPACE_BETWEEN = 3
// @from(Start 8699208, End 8699241)
$B1 = V2.JUSTIFY_SPACE_AROUND = 4
// @from(Start 8699245, End 8699278)
qB1 = V2.JUSTIFY_SPACE_EVENLY = 5
// @from(Start 8699282, End 8699310)
FbA = V2.LOG_LEVEL_ERROR = 0
// @from(Start 8699314, End 8699341)
XbA = V2.LOG_LEVEL_WARN = 1
// @from(Start 8699345, End 8699372)
VbA = V2.LOG_LEVEL_INFO = 2
// @from(Start 8699376, End 8699404)
CbA = V2.LOG_LEVEL_DEBUG = 3
// @from(Start 8699408, End 8699438)
KbA = V2.LOG_LEVEL_VERBOSE = 4
// @from(Start 8699442, End 8699470)
HbA = V2.LOG_LEVEL_FATAL = 5
// @from(Start 8699474, End 8699509)
zbA = V2.MEASURE_MODE_UNDEFINED = 0
// @from(Start 8699513, End 8699546)
wbA = V2.MEASURE_MODE_EXACTLY = 1
// @from(Start 8699550, End 8699583)
EbA = V2.MEASURE_MODE_AT_MOST = 2
// @from(Start 8699587, End 8699617)
UbA = V2.NODE_TYPE_DEFAULT = 0
// @from(Start 8699621, End 8699648)
NbA = V2.NODE_TYPE_TEXT = 1
// @from(Start 8699652, End 8699681)
$bA = V2.OVERFLOW_VISIBLE = 0
// @from(Start 8699685, End 8699713)
qbA = V2.OVERFLOW_HIDDEN = 1
// @from(Start 8699717, End 8699745)
MbA = V2.OVERFLOW_SCROLL = 2
// @from(Start 8699749, End 8699782)
LbA = V2.POSITION_TYPE_STATIC = 0
// @from(Start 8699786, End 8699821)
MB1 = V2.POSITION_TYPE_RELATIVE = 1
// @from(Start 8699825, End 8699860)
LB1 = V2.POSITION_TYPE_ABSOLUTE = 2
// @from(Start 8699864, End 8699897)
RbA = V2.PRINT_OPTIONS_LAYOUT = 1
// @from(Start 8699901, End 8699933)
ObA = V2.PRINT_OPTIONS_STYLE = 2
// @from(Start 8699937, End 8699972)
TbA = V2.PRINT_OPTIONS_CHILDREN = 4
// @from(Start 8699976, End 8700003)
PbA = V2.UNIT_UNDEFINED = 0
// @from(Start 8700007, End 8700030)
SbA = V2.UNIT_POINT = 1
// @from(Start 8700034, End 8700059)
_bA = V2.UNIT_PERCENT = 2
// @from(Start 8700063, End 8700085)
jbA = V2.UNIT_AUTO = 3
// @from(Start 8700089, End 8700114)
RB1 = V2.WRAP_NO_WRAP = 0
// @from(Start 8700118, End 8700140)
OB1 = V2.WRAP_WRAP = 1
// @from(Start 8700144, End 8700174)
TB1 = V2.WRAP_WRAP_REVERSE = 2
// @from(Start 8700180, End 8702363)
ybA = (A) => {
  function B(G, Z, D) {
    let Y = G[Z];
    G[Z] = function(...W) {
      return D.call(this, Y, ...W)
    }
  }
  for (let G of ["setPosition", "setMargin", "setFlexBasis", "setWidth", "setHeight", "setMinWidth", "setMinHeight", "setMaxWidth", "setMaxHeight", "setPadding"]) {
    let Z = {
      [V2.UNIT_POINT]: A.Node.prototype[G],
      [V2.UNIT_PERCENT]: A.Node.prototype[`${G}Percent`],
      [V2.UNIT_AUTO]: A.Node.prototype[`${G}Auto`]
    };
    B(A.Node.prototype, G, function(D, ...Y) {
      let W, J, F = Y.pop();
      if (F === "auto") W = V2.UNIT_AUTO, J = void 0;
      else if (typeof F == "object") W = F.unit, J = F.valueOf();
      else if (W = typeof F == "string" && F.endsWith("%") ? V2.UNIT_PERCENT : V2.UNIT_POINT, J = parseFloat(F), !Number.isNaN(F) && Number.isNaN(J)) throw Error(`Invalid value ${F} for ${G}`);
      if (!Z[W]) throw Error(`Failed to execute "${G}": Unsupported unit '${F}'`);
      return J !== void 0 ? Z[W].call(this, ...Y, J) : Z[W].call(this, ...Y)
    })
  }

  function Q(G) {
    return A.MeasureCallback.implement({
      measure: (...Z) => {
        let {
          width: D,
          height: Y
        } = G(...Z);
        return {
          width: D ?? NaN,
          height: Y ?? NaN
        }
      }
    })
  }

  function I(G) {
    return A.DirtiedCallback.implement({
      dirtied: G
    })
  }
  return B(A.Node.prototype, "setMeasureFunc", function(G, Z) {
    return Z ? G.call(this, Q(Z)) : this.unsetMeasureFunc()
  }), B(A.Node.prototype, "setDirtiedFunc", function(G, Z) {
    G.call(this, I(Z))
  }), B(A.Config.prototype, "free", function() {
    A.Config.destroy(this)
  }), B(A.Node, "create", (G, Z) => Z ? A.Node.createWithConfig(Z) : A.Node.createDefault()), B(A.Node.prototype, "free", function() {
    A.Node.destroy(this)
  }), B(A.Node.prototype, "freeRecursive", function() {
    for (let G = 0, Z = this.getChildCount(); G < Z; ++G) this.getChild(0).freeRecursive();
    this.free()
  }), B(A.Node.prototype, "calculateLayout", function(G, Z = NaN, D = NaN, Y = V2.DIRECTION_LTR) {
    return G.call(this, Z, D, Y)
  }), {
    Config: A.Config,
    Node: A.Node,
    ...V2
  }
}