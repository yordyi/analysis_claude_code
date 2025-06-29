
// @from(Start 10002933, End 10003913)
async function o_2(A, B, Q) {
  let I = A;
  return await Promise.all([...A.matchAll(LN5), ...A.matchAll(RN5)].map(async (G) => {
    let Z = G[1]?.trim();
    if (Z) try {
      let D = await E4.validateInput({
        command: Z
      });
      if (!D.result) {
        M6(`Bash command validation failed for command in ${Q}: ${Z}. Error: ${D.message}`), I = I.replace(G[0], `[Error: ${D.message}]`);
        return
      }
      let Y = await sM(E4, {
        command: Z
      }, B, xK({
        content: []
      }));
      if (Y.behavior !== "allow") {
        M6(`Bash command permission check failed for command in ${Q}: ${Z}. Error: ${Y.message}`), I = I.replace(G[0], `[Error: ${Y.message||"Permission denied"}]`);
        return
      }
      let {
        data: W
      } = await aJ(E4.call({
        command: Z
      }, B)), J = t_2(W.stdout, W.stderr);
      I = I.replace(G[0], J)
    } catch (D) {
      let Y = ON5(D);
      I = I.replace(G[0], Y)
    }
  })), I
}
// @from(Start 10003915, End 10004125)
function t_2(A, B, Q = !1) {
  let I = [];
  if (A.trim()) I.push(A.trim());
  if (B.trim())
    if (Q) I.push(`[stderr: ${B.trim()}]`);
    else I.push(`[stderr]
${B.trim()}`);
  return I.join(Q ? " " : `
`)
}
// @from(Start 10004127, End 10004376)
function ON5(A, B = !1) {
  if (A instanceof Uz) {
    if (A.interrupted) return "[Command interrupted]";
    return t_2(A.stdout, A.stderr, B)
  }
  let Q = A instanceof Error ? A.message : String(A);
  return B ? `[Error: ${Q}]` : `[Error]
${Q}`
}
// @from(Start 10004378, End 10004622)
function PN5(A) {
  let B = A.split(`
`);
  for (let Q of B) {
    let I = Q.trim();
    if (I) {
      let Z = I.match(/^#+\s+(.+)$/)?.[1] ?? I;
      return Z.length > 100 ? Z.substring(0, 97) + "..." : Z
    }
  }
  return "Custom command"
}
// @from(Start 10004627, End 10007097)
e_2 = L0(async (A, B) => {
    let Q = dA();
    try {
      let I = new AbortController,
        G = setTimeout(() => I.abort(), 3000);
      try {
        let Z = Date.now(),
          [D, Y] = await Promise.all([x1().existsSync(B) ? lU(["--files", "--hidden", "--glob", "*.md"], B, I.signal) : Promise.resolve([]), x1().existsSync(A) ? lU(["--files", "--glob", "*.md"], A, I.signal) : Promise.resolve([])]),
          W = [...D, ...Y],
          J = Date.now() - Z;
        return E1("tengu_command_dir_search", {
          durationMs: J,
          projectFilesFound: D.length,
          userFilesFound: Y.length
        }), W.map((F) => {
          try {
            let X = x1().readFileSync(F, {
                encoding: "utf-8"
              }),
              {
                frontmatter: V,
                content: C
              } = a_2(X),
              K = V.description ?? PN5(C) ?? "Custom command",
              E = V["allowed-tools"] ? Lp([V["allowed-tools"]]) : [],
              q = TN5(F).replace(/\.md$/, ""),
              O = SN5(F, Q, A);
            return {
              type: "prompt",
              name: q,
              description: `${K} (${O})`,
              allowedTools: E,
              isEnabled: () => !0,
              isHidden: !1,
              progressMessage: "running",
              userFacingName() {
                return q
              },
              async getPromptForCommand(R, T) {
                let L = C;
                if (R)
                  if (L.includes("$ARGUMENTS")) L = L.replace("$ARGUMENTS", R);
                  else L = L + `

ARGUMENTS: ${R}`;
                let _ = T.getToolPermissionContext();
                return L = await o_2(L, {
                  ...T,
                  getToolPermissionContext() {
                    return {
                      ..._,
                      alwaysAllowRules: {
                        ..._.alwaysAllowRules,
                        command: E
                      }
                    }
                  }
                }, `/${q}`), [{
                  type: "text",
                  text: L
                }]
              }
            }
          } catch (X) {
            return b1(X instanceof Error ? X : new Error(String(X))), null
          }
        }).filter((F) => F !== null)
      } finally {
        clearTimeout(G)
      }
    } catch (I) {
      return b1(I instanceof Error ? I : new Error(String(I))), []
    }
  })
// @from(Start 10007101, End 10007113)
Z2A = "user"
// @from(Start 10007117, End 10007132)
dw1 = "project"
// @from(Start 10007135, End 10007365)
function SN5(A, B, Q) {
  let I = G2A(A),
    G = G2A(I),
    D = G2A(G) === B;
  if (A.startsWith(Q)) return Z2A;
  if (!D) {
    let W = I.split("/"),
      J = W[W.length - 1];
    if (J) return `${dw1}:${J}`
  }
  return dw1
}
// @from(Start 10007408, End 10007425)
Y2A = I1(U1(), 1)
// @from(Start 10007431, End 10007448)
uw1 = I1(U1(), 1)
// @from(Start 10007454, End 10007471)
D2A = I1(U1(), 1)
// @from(Start 10007477, End 10007493)
k4 = I1(U1(), 1)
// @from(Start 10007497, End 10007514)
A01 = I1(U1(), 1)
// @from(Start 10007517, End 10007733)
function Aj2({
  onDone: A
}) {
  let [B, Q] = A01.useState("initial"), [I, G] = A01.useState("neutral"), [Z, D] = A01.useState(""), [Y, W] = A01.useState(0), J = Y2(), [{
    mainLoopModel: F
  }] = d5();
  return
}
// @from(Start 10007735, End 10008186)
function Bj2({
  showFeedback: A,
  showWorktree: B,
  onDone: Q
}) {
  let [I, G] = uw1.useState(() => B ? "worktree" : A ? "feedback" : "done");
  async function Z() {
    if (A) G("feedback");
    else D()
  }
  async function D() {
    Q(), await qI(0)
  }
  switch (I) {
    case "worktree":
      return null;
    case "feedback":
      return uw1.default.createElement(Aj2, {
        onDone: D
      });
    case "done":
      return null
  }
}
// @from(Start 10008191, End 10008635)
_N5 = {
    type: "local-jsx",
    name: "exit",
    aliases: ["quit"],
    description: "Exit the REPL",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, {
      messages: B
    }) {
      let I = await jN5(B);
      if (!I) return A(), await qI(0), null;
      return Y2A.createElement(Bj2, {
        showFeedback: I,
        showWorktree: !1,
        onDone: A
      })
    },
    userFacingName() {
      return "exit"
    }
  }
// @from(Start 10008639, End 10008648)
pw1 = _N5
// @from(Start 10008650, End 10008728)
async function jN5(A) {
  if (A.length < 10) return !1;
  return await W2A()
}
// @from(Start 10008729, End 10008844)
async function W2A() {
  let {
    show: A
  } = await WZ0("tengu-exit-feedback", {
    show: !1
  });
  return A
}
// @from(Start 10008849, End 10008865)
r$ = I1(U1(), 1)
// @from(Start 10008871, End 10008901)
yN5 = ["help", "-h", "--help"]
// @from(Start 10008905, End 10009029)
kN5 = ["list", "show", "display", "current", "view", "get", "check", "describe", "print", "version", "about", "status", "?"]
// @from(Start 10009032, End 10009608)
function xN5({
  onDone: A
}) {
  let [{
    mainLoopModel: B
  }, Q] = d5();
  return Z0((I, G) => {
    if (G.escape) {
      E1("tengu_model_command_menu", {
        action: "cancel"
      });
      let Z = B ?? C_().label;
      A(`Kept model as ${UA.bold(Z)}`);
      return
    }
  }), r$.createElement(Dw1, {
    initial: B,
    onSelect: (I) => {
      E1("tengu_model_command_menu", {
        action: I,
        from_model: B,
        to_model: I
      }), Q((G) => ({
        ...G,
        mainLoopModel: I
      })), A(`Set model to ${UA.bold(z_(I))}`)
    }
  })
}
// @from(Start 10009610, End 10010055)
function fN5({
  args: A,
  onDone: B
}) {
  let [Q, I] = d5(), G = A === "default" ? null : A;
  if (T9() && !qZ() && G !== null && G.toLowerCase().includes("opus")) return B("Invalid model. Claude Pro users are not currently able to use Opus 4 in Claude Code. The current model is now Sonnet 4."), null;
  return setTimeout(() => {
    I((Z) => ({
      ...Z,
      mainLoopModel: G
    })), B(`Set model to ${UA.bold(z_(G))}`)
  }, 0), null
}
// @from(Start 10010057, End 10010215)
function vN5({
  onDone: A
}) {
  let [{
    mainLoopModel: B
  }] = d5(), Q = B ?? C_().label;
  return setTimeout(() => A(`Current model: ${Q}`), 0), null
}
// @from(Start 10010220, End 10010980)
Qj2 = {
  type: "local-jsx",
  name: "model",
  userFacingName() {
    return "model"
  },
  description: "Set the AI model for Claude Code",
  isEnabled: () => !0,
  isHidden: !1,
  argumentHint: "[model]",
  async call(A, B, Q) {
    if (Q = Q?.trim() || "", kN5.includes(Q)) return E1("tengu_model_command_inline_help", {
      args: Q
    }), r$.createElement(vN5, {
      onDone: A
    });
    if (yN5.includes(Q)) {
      setTimeout(() => A("Run /model to open the model selection menu, or /model [modelName] to set the model."), 0);
      return
    }
    if (Q) return E1("tengu_model_command_inline", {
      args: Q
    }), r$.createElement(fN5, {
      args: Q,
      onDone: A
    });
    return r$.createElement(xN5, {
      onDone: A
    })
  }
}
// @from(Start 10010986, End 10011003)
B01 = I1(U1(), 1)
// @from(Start 10011009, End 10011859)
bN5 = {
    type: "local-jsx",
    name: "upgrade",
    description: "Upgrade to Max for higher rate limits and more Opus",
    isEnabled: () => !Yb(),
    isHidden: !1,
    async call(A, B) {
      try {
        return await Ap("https://claude.ai/upgrade/max"), B01.createElement(x0A, {
          startingMessage: "Starting new login following /upgrade. Exit with Ctrl-C to use existing account.",
          onDone: (I, G) => {
            aA1(B01.createElement(Vp, {
              model: G
            })), B.onChangeAPIKey(), A(I ? "Login successful" : "Login interrupted")
          }
        })
      } catch (Q) {
        b1(Q), setTimeout(() => {
          A("Failed to open browser. Please visit https://claude.ai/upgrade/max to upgrade.")
        }, 0)
      }
      return null
    },
    userFacingName() {
      return "upgrade"
    }
  }
// @from(Start 10011863, End 10011872)
Ij2 = bN5
// @from(Start 10011878, End 10012127)
gN5 = L0(() => [oO2, lT2, iT2, sT2, rT2, IS2, pw1, n_2, JS2, FS2, XS2, cS2, aS2, YS2, iS2, Qj2, sS2, eS2, A_2, $_2, mT2, kw1, LE, Ij2, R_2, b_2, ...!Yb() ? [wS2, TS2()] : [], ...process.env.ENABLE_BACKGROUND_TASKS ? [L_2] : [], ...[], ...[], ...[]])
// @from(Start 10012131, End 10012308)
J2A = L0(async () => {
    let A = Gj2(S4(), "commands"),
      B = Gj2(dA(), ".claude", "commands");
    return [...await e_2(A, B), ...gN5()].filter((I) => I.isEnabled())
  })
// @from(Start 10012311, End 10012408)
function Zj2(A, B) {
  return B.some((Q) => Q.userFacingName() === A || Q.aliases?.includes(A))
}
// @from(Start 10012410, End 10012713)
function cw1(A, B) {
  let Q = B.find((I) => I.userFacingName() === A || I.aliases?.includes(A));
  if (!Q) throw ReferenceError(`Command ${A} not found. Available commands: ${B.map((I)=>{let G=I.userFacingName();return I.aliases?`${G} (aliases: ${I.aliases.join(", ")})`:G}).join(", ")}`);
  return Q
}
// @from(Start 10012718, End 10012732)
hN5 = /[:_-]/g
// @from(Start 10012735, End 10012781)
function lw1(A) {
  return A.startsWith("/")
}
// @from(Start 10012783, End 10012909)
function mN5(A) {
  if (!lw1(A)) return !1;
  if (!A.includes(" ")) return !1;
  if (A.endsWith(" ")) return !1;
  return !0
}
// @from(Start 10012911, End 10012948)
function dN5(A) {
  return `/${A} `
}
// @from(Start 10012950, End 10013276)
function Dj2(A) {
  let B = A.userFacingName(),
    Q = A.aliases && A.aliases.length > 0 ? ` (${A.aliases.join(", ")})` : "";
  return {
    id: B,
    displayText: `/${B}${Q}`,
    description: A.description + (A.type === "prompt" && A.argNames?.length ? ` (arguments: ${A.argNames.join(", ")})` : ""),
    metadata: A
  }
}
// @from(Start 10013278, End 10015214)
function Yj2(A, B) {
  if (!lw1(A)) return [];
  if (mN5(A)) return [];
  let Q = A.slice(1).toLowerCase();
  if (Q.trim() === "") {
    let Y = B.filter((V) => !V.isHidden),
      W = [],
      J = [],
      F = [];
    Y.forEach((V) => {
      let C = V.description;
      if (C.endsWith(` (${Z2A})`)) W.push(V);
      else if (C.endsWith(` (${dw1})`)) J.push(V);
      else F.push(V)
    });
    let X = (V, C) => V.userFacingName().localeCompare(C.userFacingName());
    return W.sort(X), J.sort(X), F.sort(X), [...W, ...J, ...F].map(Dj2)
  }
  let I = B.filter((Y) => !Y.isHidden).flatMap((Y) => {
      let W = Y.userFacingName(),
        J = [];
      if (J.push({
          nameKey: W,
          commandName: Y.userFacingName(),
          command: Y
        }), W.split(hN5).filter(Boolean).forEach((X) => {
          J.push({
            partKey: X,
            commandName: Y.userFacingName(),
            command: Y
          })
        }), Y.aliases) Y.aliases.forEach((X) => {
        J.push({
          aliasKey: X,
          commandName: Y.userFacingName(),
          command: Y
        })
      });
      return Y.description.split(" ").forEach((X) => {
        let V = X.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (V) J.push({
          descriptionKey: V,
          commandName: Y.userFacingName(),
          command: Y
        })
      }), J
    }),
    Z = new EV(I, {
      includeScore: !0,
      threshold: 0.3,
      location: 0,
      distance: 100,
      keys: [{
        name: "nameKey",
        weight: 2
      }, {
        name: "partKey",
        weight: 2
      }, {
        name: "aliasKey",
        weight: 2
      }, {
        name: "descriptionKey",
        weight: 0.5
      }]
    }).search(Q),
    D = new Map;
  return Z.forEach((Y) => {
    let {
      commandName: W,
      command: J
    } = Y.item;
    if (!D.has(W)) D.set(W, J)
  }), Array.from(D.entries()).map(([Y, W]) => Dj2(W))
}
// @from(Start 10015216, End 10015477)
function F2A(A, B, Q, I, G, Z) {
  let D = typeof A === "string" ? A : A.id,
    Y = dN5(D);
  if (I(Y), G(Y.length), B) {
    let W = typeof A === "string" ? cw1(D, Q) : A.metadata;
    if (W.type !== "prompt" || (W.argNames ?? []).length === 0) Z(Y, !0)
  }
}
// @from(Start 10015510, End 10015518)
iw1 = []
// @from(Start 10015522, End 10015532)
X2A = null
// @from(Start 10015535, End 10015740)
function uN5(A) {
  let B = new Set;
  return A.forEach((Q) => {
    let G = PW.dirname(Q);
    while (G !== "." && G !== PW.parse(G).root) B.add(G), G = PW.dirname(G)
  }), [...B].map((Q) => Q + PW.sep)
}
// @from(Start 10015741, End 10015916)
async function Wj2() {
  let A = new AbortController,
    B = (await lU(["--files", "--follow"], ".", A.signal)).map((I) => PW.relative(e9(), I));
  return [...uN5(B), ...B]
}
// @from(Start 10015918, End 10016056)
function pN5(A, B) {
  let Q = Math.min(A.length, B.length),
    I = 0;
  while (I < Q && A[I] === B[I]) I++;
  return A.substring(0, I)
}
// @from(Start 10016058, End 10016278)
function Fj2(A) {
  if (A.length === 0) return "";
  let B = A.map((I) => I.displayText),
    Q = B[0];
  for (let I = 1; I < B.length; I++) {
    let G = B[I];
    if (Q = pN5(Q, G), Q === "") return ""
  }
  return Q
}
// @from(Start 10016280, End 10016354)
function Jj2(A) {
  return {
    id: `file-${A}`,
    displayText: A
  }
}
// @from(Start 10016359, End 10016367)
V2A = 15
// @from(Start 10016370, End 10017358)
function cN5(A, B) {
  if (!B) {
    let D = new Set;
    for (let Y of A) {
      let W = Y.split(PW.sep)[0];
      if (W) {
        if (D.add(W), D.size >= V2A) break
      }
    }
    return [...D].sort().map(Jj2)
  }
  let Q = A.map((D) => {
      return {
        path: D,
        filename: PW.basename(D),
        testPenalty: D.includes("test") ? 1 : 0
      }
    }),
    I = B.lastIndexOf(PW.sep);
  if (I > 2) Q = Q.filter((D) => {
    return D.path.substring(0, I).startsWith(B.substring(0, I))
  });
  let Z = new EV(Q, {
    includeScore: !0,
    threshold: 0.5,
    keys: [{
      name: "path",
      weight: 1
    }, {
      name: "filename",
      weight: 2
    }]
  }).search(B, {
    limit: V2A
  });
  return Z = Z.sort((D, Y) => {
    if (D.score === void 0 || Y.score === void 0) return 0;
    if (Math.abs(D.score - Y.score) > 0.05) return D.score - Y.score;
    return D.item.testPenalty - Y.item.testPenalty
  }), Z.map((D) => D.item.path).slice(0, V2A).map(Jj2)
}
// @from(Start 10017359, End 10017709)
async function Xj2(A, B = !1) {
  if (!A && !B) return [];
  try {
    if (iw1.length === 0) iw1 = await Wj2();
    else if (!X2A) X2A = Wj2().then((Z) => {
      return iw1 = Z, X2A = null, Z
    });
    let Q = A,
      I = "." + PW.sep;
    if (A.startsWith(I)) Q = A.substring(2);
    return cN5(iw1, Q)
  } catch (Q) {
    return b1(Q), []
  }
}
// @from(Start 10017711, End 10017896)
function nw1(A, B, Q, I, G, Z) {
  let D = typeof A === "string" ? A : A.displayText,
    Y = B.substring(0, I) + D + B.substring(I + Q.length);
  G(Y);
  let W = I + D.length;
  Z(W)
}
// @from(Start 10017927, End 10018249)
function Vj2(A) {
  switch (A.type) {
    case "file":
      return {
        id: `file-${A.path}`, displayText: A.displayText, description: A.description
      };
    case "mcp_resource":
      return {
        id: `mcp-resource-${A.server}__${A.uri}`, displayText: A.displayText, description: A.description
      }
  }
}
// @from(Start 10018254, End 10018262)
C2A = 15
// @from(Start 10018264, End 10019348)
async function K2A(A, B, Q = !1) {
  if (!A && !Q) return [];
  let G = (await Xj2(A, Q)).map((J) => ({
      type: "file",
      displayText: J.displayText,
      description: J.description,
      path: J.displayText,
      filename: Cj2.basename(J.displayText)
    })),
    Z = Object.values(B).flat().map((J) => ({
      type: "mcp_resource",
      displayText: `${J.server}:${J.uri}`,
      description: J.name + (J.description ? ` - ${J.description}` : ""),
      server: J.server,
      uri: J.uri,
      name: J.name || J.uri
    })),
    D = [...G, ...Z];
  if (D.length === 0) return [];
  if (!A) return D.slice(0, C2A).map(Vj2);
  return new EV(D, {
    includeScore: !0,
    threshold: 0.4,
    keys: [{
      name: "displayText",
      weight: 2
    }, {
      name: "name",
      weight: 3
    }, {
      name: "server",
      weight: 1
    }, {
      name: "description",
      weight: 1
    }, {
      name: "path",
      weight: 2
    }, {
      name: "filename",
      weight: 2
    }]
  }).search(A, {
    limit: C2A
  }).map((J) => J.item).slice(0, C2A).map(Vj2)
}
// @from(Start 10019350, End 10019635)
function Q01(A, B, Q = !1) {
  if (!A) return null;
  let I = A.substring(0, B),
    G = Q ? /(@[a-zA-Z0-9_\-./\\]*|[a-zA-Z0-9_\-./\\]+)$/ : /[a-zA-Z0-9_\-./\\]+$/,
    Z = I.match(G);
  if (!Z || Z.index === void 0) return null;
  return {
    token: Z[0],
    startPos: Z.index
  }
}
// @from(Start 10019637, End 10024453)
function Kj2({
  commands: A,
  onInputChange: B,
  onSubmit: Q,
  setCursorOffset: I,
  input: G,
  cursorOffset: Z,
  setSuggestionsState: D,
  suggestionsState: {
    suggestions: Y,
    selectedSuggestion: W,
    commandArgumentHint: J
  }
}) {
  let [F, X] = oK.useState("none"), [V, C] = oK.useState(void 0), [K] = d5(), E = oK.useCallback(() => {
    D(() => ({
      commandArgumentHint: void 0,
      suggestions: [],
      selectedSuggestion: -1
    })), X("none"), C(void 0)
  }, [D]), N = oK.useCallback(async (L, _ = !1) => {
    let k = await K2A(L, K.mcp.resources, _);
    if (k.length === 0) {
      E();
      return
    }
    D(() => ({
      commandArgumentHint: void 0,
      suggestions: k,
      selectedSuggestion: k.length > 0 ? 0 : -1
    })), X(k.length > 0 ? "file" : "none"), C(void 0)
  }, [K.mcp.resources, E, D]), q = sH1(N, 200), O = oK.useCallback(async (L, _ = Z) => {
    let k = L.substring(0, _).match(/(^|\s)@[a-zA-Z0-9_\-./\\]*$/),
      i = _ === L.length && _ > 0 && L.length > 0 && L[_ - 1] === " ";
    if (lw1(L) && _ > 0 && !i) {
      if (L.includes(" ") && !L.endsWith(" ")) {
        E();
        return
      }
      let x = Yj2(L, A),
        s = void 0;
      if (L.length > 1) {
        let d = L.endsWith(" ") ? L.slice(1, -1) : L.slice(1),
          F1 = A.find((X1) => X1.userFacingName() === d && X1.argumentHint);
        if (F1?.argumentHint) s = F1.argumentHint
      }
      if (D(() => ({
          commandArgumentHint: s,
          suggestions: x,
          selectedSuggestion: x.length > 0 ? 0 : -1
        })), X(x.length > 0 ? "command" : "none"), x.length > 0) {
        let d = Math.max(...x.map((F1) => F1.displayText.length));
        C(d + 5)
      }
      return
    }
    if (F === "command") {
      E();
      return
    }
    if (k) {
      let x = Q01(L, _, !0);
      if (x && x.token.startsWith("@")) {
        let s = x.token.substring(1);
        q(s, !0);
        return
      }
    }
    if (F === "file") {
      let x = Q01(L, _, !0);
      if (x) {
        let s = x.token.startsWith("@") ? x.token.substring(1) : x.token;
        q(s, !1)
      } else E()
    }
  }, [Z, F, A, D, E, q]);
  oK.useEffect(() => {
    O(G)
  }, [G, O]);
  let R = oK.useCallback(async () => {
      if (Y.length > 0) {
        let L = W === -1 ? 0 : W;
        if (F === "command" && L < Y.length) {
          let _ = Y[L];
          if (_) F2A(_, !1, A, B, I, Q), E()
        } else if (F === "file" && Y.length > 0) {
          let _ = Q01(G, Z, !0);
          if (!_) {
            E();
            return
          }
          let k = Fj2(Y),
            i = _.token.startsWith("@"),
            x = i ? _.token.length - 1 : _.token.length;
          if (k.length > x) {
            let s = i ? `@${k}` : k;
            nw1(s, G, _.token, _.startPos, B, I), O(G.replace(_.token, s), Z)
          } else if (L < Y.length) {
            let s = Y[L];
            if (s) {
              let d = i ? `@${s.displayText} ` : s.displayText;
              nw1(d, G, _.token, _.startPos, B, I), E()
            }
          }
        }
      } else if (G.trim() !== "") {
        let L = Q01(G, Z, !0);
        if (L) {
          let _ = L.token.startsWith("@"),
            k = _ ? L.token.substring(1) : L.token,
            i = await K2A(k, K.mcp.resources, _);
          if (i.length > 0) D(() => ({
            commandArgumentHint: void 0,
            suggestions: i,
            selectedSuggestion: 0
          })), X("file"), C(void 0)
        }
      }
    }, [Y, W, G, F, A, B, I, Q, E, Z, O, K.mcp.resources, D]),
    T = oK.useCallback(() => {
      if (W < 0 || Y.length === 0) return;
      if (F === "command" && W < Y.length) {
        let L = Y[W];
        if (L) F2A(L, !0, A, B, I, Q), E()
      } else if (F === "file" && W < Y.length) {
        let L = Q01(G, Z, !0);
        if (L) {
          let _ = Y[W];
          if (_) {
            let i = L.token.startsWith("@") ? `@${_.displayText} ` : _.displayText;
            nw1(i, G, L.token, L.startPos, B, I), E()
          }
        }
      }
    }, [Y, W, F, A, G, Z, B, I, Q, E]);
  return Z0((L, _) => {
    if (_.tab && !_.shift) {
      R();
      return
    }
    if (Y.length === 0) return;
    if (_.downArrow || _.ctrl && L === "n") {
      D((k) => ({
        ...k,
        selectedSuggestion: k.selectedSuggestion >= Y.length - 1 ? 0 : k.selectedSuggestion + 1
      }));
      return
    }
    if (_.upArrow || _.ctrl && L === "p") {
      D((k) => ({
        ...k,
        selectedSuggestion: k.selectedSuggestion <= 0 ? Y.length - 1 : k.selectedSuggestion - 1
      }));
      return
    }
    if (_.return) T();
    if (_.escape) E()
  }), {
    suggestions: Y,
    selectedSuggestion: W,
    suggestionType: F,
    maxColumnWidth: V,
    commandArgumentHint: J
  }
}
// @from(Start 10024458, End 10024475)
aw1 = I1(U1(), 1)
// @from(Start 10024481, End 10024497)
KT = I1(U1(), 1)
// @from(Start 10024503, End 10024512)
lN5 = 1e4
// @from(Start 10024515, End 10035186)
function Hj2(A) {
  let [B, Q] = KT.useState("INSERT"), I = KT.default.useRef(""), G = KT.default.useRef(null), Z = KT.default.useRef(""), D = KT.default.useRef(""), Y = KT.default.useRef(null), {
    onMessage: W
  } = A, J = Bw1(A), F = (k, i) => {
    return k === i && (k === "d" || k === "c")
  }, X = (k, i) => {
    switch (k) {
      case "h":
        return i.left();
      case "l":
        return i.right();
      case "j":
        return i.downLogicalLine();
      case "k":
        return i.upLogicalLine();
      case "0":
        return i.startOfLogicalLine();
      case "^":
        return i.firstNonBlankInLogicalLine();
      case "$":
        return i.endOfLogicalLine();
      case "w":
        return i.nextWord();
      case "e":
        return i.endOfWord();
      case "b":
        return i.prevWord();
      case "W":
        return i.nextWORD();
      case "E":
        return i.endOfWORD();
      case "B":
        return i.prevWORD();
      case "gg":
        return i.startOfFirstLine();
      case "G":
        return i.startOfLastLine();
      default:
        return null
    }
  }, V = (k, i, x = 1) => {
    if (F(k, I.current)) return i.startOfLine();
    let s = i;
    for (let d = 0; d < x; d++) {
      if (!s) break;
      s = X(k, s)
    }
    return s
  }, C = (k, i, x, s = 1) => {
    let d = J.offset,
      F1 = k === "change";
    if (F(i, I.current)) {
      let v = x.startOfLogicalLine();
      if (x.text.indexOf(`
`) === -1) A.onChange(""), d = 0;
      else {
        let {
          line: D1
        } = x.getPosition();
        if (k === "delete") {
          let N1 = x.text.split(`
`),
            u1 = Math.min(s, N1.length - D1);
          N1.splice(D1, u1);
          let d1 = N1.join(`
`);
          A.onChange(d1), d = T5.fromText(d1, A.columns, D1 < N1.length ? v.offset : Math.max(0, v.offset - 1)).offset
        } else if (k === "change") {
          let N1 = x.text.split(`
`);
          for (let u1 = 0; u1 < Math.min(s, N1.length - D1); u1++) N1[D1 + u1] = "";
          A.onChange(N1.join(`
`)), d = v.offset
        } else d = v.offset
      }
      return {
        newOffset: d,
        switchToInsert: F1
      }
    }
    let X1 = V(i, x, s);
    if (!X1 || x.equals(X1)) return {
      newOffset: d,
      switchToInsert: F1
    };
    if (k === "move") d = X1.offset;
    else {
      let [v, D1] = x.offset <= X1.offset ? [x, X1] : [X1, x], N1 = D1;
      if (i === "e" && x.offset <= X1.offset) N1 = D1.right();
      else if ((i === "w" || i === "W") && k === "change") N1 = R(x, i, s);
      let u1 = v.modifyText(N1, "");
      if (A.onChange(u1.text), k === "change") d = v.offset;
      else d = u1.offset
    }
    return {
      newOffset: d,
      switchToInsert: F1
    }
  }, K = (k) => {
    if (k !== void 0) J.setOffset(k);
    Q("INSERT"), A.onModeChange?.("INSERT"), W?.(!0, "-- INSERT MODE --"), setTimeout(() => W?.(!1), 1000)
  }, E = () => {
    Q("NORMAL"), A.onModeChange?.("NORMAL"), W?.(!0, "-- NORMAL MODE --"), setTimeout(() => W?.(!1), 1000)
  }, N = (k) => {
    G.current = k
  }, q = (k, i) => {
    if (i === "below") {
      let s = k.endOfLogicalLine().insert(`
`);
      return A.onChange(s.text), s.offset
    } else {
      let x = k.startOfLogicalLine(),
        s = x.insert(`
`);
      return A.onChange(s.text), x.offset
    }
  }, O = (k, i) => {
    let x = k.text[k.offset] ?? "";
    return i.test(x)
  }, R = (k, i, x) => {
    let d = i === "w" ? /\w/ : /\S/;
    if (!O(k, d)) return V(i, k, x) || k;
    let F1 = k;
    while (O(F1, d) && !F1.isAtEnd()) F1 = F1.right();
    if (x > 1)
      for (let X1 = 1; X1 < x; X1++) {
        while (!O(F1, d) && !F1.isAtEnd()) F1 = F1.right();
        while (O(F1, d) && !F1.isAtEnd()) F1 = F1.right()
      }
    return F1
  }, T = (k) => {
    let i = G.current;
    if (!i) return;
    switch (i.type) {
      case "delete":
        if (i.motion) {
          let {
            newOffset: x
          } = C("delete", i.motion, k, i.count || 1);
          J.setOffset(x)
        }
        break;
      case "change":
        if (i.motion) {
          let {
            newOffset: x
          } = C("change", i.motion, k, i.count || 1);
          J.setOffset(x), K(x)
        }
        break;
      case "insert":
        if (i.insertedText) {
          let x = k.insert(i.insertedText);
          A.onChange(x.text), J.setOffset(x.offset)
        }
        break;
      case "x": {
        let x = i.count || 1,
          s = k;
        for (let d = 0; d < x; d++)
          if (!s.equals(s.del())) s = s.del();
        A.onChange(s.text), J.setOffset(s.offset);
        break
      }
      case "o": {
        let x = q(k, "below");
        K(x);
        break
      }
      case "O": {
        let x = q(k, "above");
        K(x);
        break
      }
      case "replace":
        break;
      case "r": {
        if (i.replacementChar) {
          let x = i.count || 1,
            s = k;
          for (let d = 0; d < x; d++)
            if (s = s.modifyText(s.right(), i.replacementChar), d < x - 1) s = T5.fromText(s.text, A.columns, s.offset + 1);
          A.onChange(s.text), J.setOffset(k.offset)
        }
        break
      }
    }
  }, L = (k = !0) => {
    if (!D.current) return 1;
    let i = parseInt(D.current, 10);
    if (isNaN(i)) {
      if (k) D.current = "";
      return 1
    }
    let x = Math.min(i, lN5);
    if (k) D.current = "";
    return x
  };
  return {
    ...J,
    onInput: (k, i) => {
      let x = T5.fromText(A.value, A.columns, J.offset);
      if (i.ctrl) {
        J.onInput(k, i);
        return
      }
      if (i.escape && B === "INSERT") {
        if (Z.current) N({
          type: "insert",
          insertedText: Z.current
        }), Z.current = "";
        E();
        return
      }
      if (B === "NORMAL" && Y.current) {
        if ("0123456789".includes(k)) {
          D.current += k;
          return
        }
        let F1 = Y.current,
          X1 = L(),
          {
            newOffset: v
          } = C(F1, k, x, X1);
        if (J.setOffset(v), N({
            type: F1,
            motion: k,
            count: X1
          }), Y.current = null, I.current = "", F1 === "change") K(v);
        return
      }
      let s = (F1, X1, v) => {
          let {
            newOffset: D1
          } = C(F1, X1, x, v || 1);
          if (J.setOffset(D1), F1 !== "move") N({
            type: F1,
            motion: X1,
            count: v
          });
          if (F1 === "change") K(D1);
          I.current = ""
        },
        d = (F1) => {
          Z.current = "", K(F1.offset)
        };
      if (B === "NORMAL" && I.current) {
        switch (I.current) {
          case "d":
            if (k === "d") {
              let X1 = L();
              s("delete", k, X1), Y.current = null;
              return
            }
            return;
          case "c":
            if (k === "c") {
              let X1 = L();
              s("change", k, X1), Y.current = null;
              return
            }
            return;
          case "g":
            if (k === "g") {
              let X1 = L();
              s("move", "gg", X1);
              return
            }
            break;
          case "r": {
            let X1 = L(),
              v = x;
            for (let D1 = 0; D1 < X1; D1++)
              if (v = v.modifyText(v.right(), k), D1 < X1 - 1) v = T5.fromText(v.text, A.columns, v.offset + 1);
            A.onChange(v.text), J.setOffset(x.offset), N({
              type: "r",
              replacementChar: k,
              count: X1
            }), I.current = "";
            return
          }
        }
        I.current = ""
      }
      if (B === "NORMAL") {
        if ("0123456789".includes(k)) {
          if (k === "0" && D.current === "") {
            let {
              newOffset: F1
            } = C("move", "0", x);
            J.setOffset(F1);
            return
          }
          D.current += k;
          return
        }
        switch (k) {
          case ".": {
            T(x);
            return
          }
          case "u": {
            if (A.onUndo) A.onUndo();
            return
          }
          case "i":
            D.current = "", Z.current = "", K();
            return;
          case "I": {
            D.current = "", d(x.startOfLogicalLine());
            return
          }
          case "a": {
            D.current = "", d(x.right());
            return
          }
          case "A": {
            D.current = "", d(x.endOfLogicalLine());
            return
          }
          case "o": {
            D.current = "";
            let F1 = q(x, "below");
            N({
              type: "o"
            }), d(new T5(x.measuredText, F1));
            return
          }
          case "O": {
            D.current = "";
            let F1 = q(x, "above");
            N({
              type: "O"
            }), d(new T5(x.measuredText, F1));
            return
          }
          case "h":
          case "l":
          case "j":
          case "k":
          case "^":
          case "$":
          case "w":
          case "e":
          case "b":
          case "W":
          case "E":
          case "B":
          case "G": {
            let F1 = L();
            s("move", k, F1);
            return
          }
          case "g": {
            I.current = "g";
            return
          }
          case "r": {
            I.current = "r";
            return
          }
          case "x": {
            let F1 = L(),
              X1 = x;
            for (let v = 0; v < F1; v++)
              if (!X1.equals(X1.del())) X1 = X1.del();
            A.onChange(X1.text), J.setOffset(X1.offset), N({
              type: "x",
              count: F1
            });
            return
          }
          case "d":
            I.current = "d", Y.current = "delete";
            return;
          case "D": {
            let F1 = L();
            s("delete", "$", F1);
            return
          }
          case "c":
            I.current = "c", Y.current = "change";
            return;
          case "C": {
            let F1 = L();
            s("change", "$", F1);
            return
          }
          case "?": {
            A.onChange("?");
            return
          }
        }
      }
      if (i.return) {
        J.onInput(k, i);
        return
      }
      if (B === "INSERT") {
        if (i.backspace || i.delete) {
          if (Z.current.length > 0) Z.current = Z.current.slice(0, -1)
        } else Z.current += k;
        J.onInput(k, i)
      }
    },
    mode: B,
    setMode: Q
  }
}
// @from(Start 10035188, End 10036344)
function H2A(A) {
  let [B] = q9(), Q = Hj2({
    value: A.value,
    onChange: A.onChange,
    onSubmit: A.onSubmit,
    onExit: A.onExit,
    onExitMessage: A.onExitMessage,
    onMessage: A.onMessage,
    onHistoryReset: A.onHistoryReset,
    onHistoryUp: A.onHistoryUp,
    onHistoryDown: A.onHistoryDown,
    focus: A.focus,
    mask: A.mask,
    multiline: A.multiline,
    cursorChar: A.showCursor ? " " : "",
    highlightPastedText: A.highlightPastedText,
    invert: UA.inverse,
    themeText: V9("text", B),
    columns: A.columns,
    onImagePaste: A.onImagePaste,
    disableCursorMovementForUpDownKeys: A.disableCursorMovementForUpDownKeys,
    externalOffset: A.cursorOffset,
    onOffsetChange: A.onChangeCursorOffset,
    onModeChange: A.onModeChange,
    isMessageLoading: A.isLoading,
    onUndo: A.onUndo
  }), {
    mode: I,
    setMode: G
  } = Q;
  return aw1.default.useEffect(() => {
    if (A.initialMode && A.initialMode !== I) G(A.initialMode)
  }, [A.initialMode, I, G]), aw1.default.createElement(h, {
    flexDirection: "column"
  }, aw1.default.createElement(Iw1, {
    inputState: Q,
    terminalFocus: !0,
    ...A
  }))
}
// @from(Start 10036346, End 10036398)
function Rp() {
  return ZA().editorMode === "vim"
}
// @from(Start 10036400, End 10036660)
function zj2() {
  if (LE.isEnabled() && mA.terminal === "Apple_Terminal" && OT2()) return "option + ⏎ for newline";
  if (LE.isEnabled() && RT2()) return "shift + ⏎ for newline";
  return TT2() ? "\\⏎ for newline" : "backslash (\\) + return (⏎) for newline"
}
// @from(Start 10036665, End 10036681)
DQ = I1(U1(), 1)
// @from(Start 10036684, End 10036973)
function wj2(A) {
  switch (A.mode) {
    case "default":
      return "acceptEdits";
    case "acceptEdits":
      return "plan";
    case "plan":
      return A.isBypassPermissionsModeAvailable ? "bypassPermissions" : "default";
    case "bypassPermissions":
      return "default"
  }
}
// @from(Start 10036978, End 10036994)
S9 = I1(U1(), 1)
// @from(Start 10036998, End 10037015)
kj2 = I1(U1(), 1)
// @from(Start 10037021, End 10037037)
c4 = I1(U1(), 1)
// @from(Start 10037040, End 10038081)
function Ej2({
  exitMessage: A,
  vimMode: B,
  mode: Q,
  notification: I,
  toolPermissionContext: G,
  suppressHint: Z,
  shellsSelected: D,
  isPasting: Y
}) {
  if (A.show) return c4.createElement(P, {
    dimColor: !0,
    key: "exit-message"
  }, "Press ", A.key, " again to exit");
  if (Y) return c4.createElement(P, {
    dimColor: !0,
    key: "pasting-message"
  }, "Pasting text...");
  if (I.show && I.content)
    if ("jsx" in I.content) return c4.createElement(h, {
      key: "notification-content",
      flexGrow: 1
    }, I.content.jsx);
    else return c4.createElement(P, {
      color: I.content.color,
      dimColor: !I.content.color,
      key: "notification"
    }, I.content.text);
  let W = Rp() && B === "INSERT";
  return c4.createElement(h, {
    justifyContent: "flex-start",
    gap: 1
  }, W ? c4.createElement(P, {
    dimColor: !0,
    key: "vim-insert"
  }, "-- INSERT --") : null, c4.createElement(iN5, {
    mode: Q,
    toolPermissionContext: G,
    showHint: !Z && !W,
    shellsSelected: D
  }))
}
// @from(Start 10038083, End 10039537)
function iN5({
  mode: A,
  toolPermissionContext: B,
  showHint: Q,
  shellsSelected: I = !1
}) {
  let {
    shells: G
  } = Mp(), Z = G.filter((D) => D.status === "running").length;
  if (A === "memory") return c4.createElement(P, {
    color: "remember"
  }, "# to memorize");
  if (A === "bash") return c4.createElement(P, {
    color: "bashBorder"
  }, "! for bash mode");
  if (B?.mode === "plan") return c4.createElement(P, {
    color: "planMode",
    key: "plan-mode"
  }, "⏸ plan mode on", c4.createElement(P, {
    color: "secondaryText",
    dimColor: !0
  }, " ", "(shift+tab to cycle)"));
  if (B?.mode === "acceptEdits") return c4.createElement(P, {
    color: "autoAccept",
    key: "write-file-allowed"
  }, "⏵⏵ auto-accept edits on", c4.createElement(P, {
    color: "secondaryText",
    dimColor: !0
  }, " ", "(shift+tab to cycle)"));
  if (Z > 0) {
    let D = ZA().hasSeenTasksHint;
    return c4.createElement(h, {
      gap: 1
    }, c4.createElement(P, {
      color: I ? "text" : "permission",
      inverse: I,
      bold: I
    }, I ? " " : "", Z, " ", Z === 1 ? "bash" : "bashes", " ", "running", I ? " " : ""), Q && c4.createElement(c4.Fragment, null, c4.createElement(P, {
      dimColor: !0
    }, "·"), c4.createElement(P, {
      dimColor: !0
    }, I ? "Enter to view shells" : !D ? "↓ to view" : "? for shortcuts")))
  }
  if (!Q) return null;
  return c4.createElement(P, {
    dimColor: !0
  }, "? for shortcuts")
}
// @from(Start 10039542, End 10039558)
G6 = I1(U1(), 1)
// @from(Start 10039564, End 10039580)
hy = I1(U1(), 1)
// @from(Start 10039586, End 10039602)
Y5 = I1(U1(), 1)
// @from(Start 10039606, End 10039623)
$j2 = I1(gj(), 1)
// @from(Start 10039627, End 10039644)
rw1 = I1(U1(), 1)
// @from(Start 10039650, End 10039667)
Nj2 = I1(U1(), 1)
// @from(Start 10039671, End 10039687)
Op = I1(gj(), 1)
// @from(Start 10039690, End 10039798)
function Uj2(A) {
  return `${Op.major(A,{loose:!0})}.${Op.minor(A,{loose:!0})}.${Op.patch(A,{loose:!0})}`
}
// @from(Start 10039800, End 10040179)
function sw1(A, B = {
  ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
  PACKAGE_URL: "@anthropic-ai/claude-code",
  README_URL: "https://docs.anthropic.com/s/claude-code",
  VERSION: "1.0.34"
}.VERSION) {
  let [Q, I] = Nj2.useState(() => Uj2(B));
  if (!A) return null;
  let G = Uj2(A);
  if (G !== Q) return I(G), G;
  return null
}
// @from(Start 10040181, End 10043078)
function qj2({
  isUpdating: A,
  onChangeIsUpdating: B,
  onAutoUpdaterResult: Q,
  autoUpdaterResult: I,
  showSuccessMessage: G,
  verbose: Z
}) {
  let [D, Y] = rw1.useState({}), W = sw1(I?.version), J = Y5.useCallback(async () => {
    let F = ZA();
    if (A) return;
    let X = {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.VERSION,
      V = await Uw1(),
      C = yG1();
    if (Y({
        global: X,
        latest: V
      }), !C && X && V && !$j2.gte(X, V, {
        loose: !0
      })) {
      let K = Date.now();
      B(!0), Ew1();
      let E, N = F.installMethod === "local";
      if (N) E = await Yp();
      else E = await Nw1();
      if (B(!1), E === "success") E1("tengu_auto_updater_success", {
        fromVersion: X,
        toVersion: V,
        durationMs: Date.now() - K,
        wasMigrated: N
      });
      else E1("tengu_auto_updater_fail", {
        fromVersion: X,
        attemptedVersion: V,
        status: E,
        durationMs: Date.now() - K,
        wasMigrated: N
      });
      Q({
        version: V,
        status: E
      })
    }
  }, [Q]);
  if (rw1.useEffect(() => {
      J()
    }, [J]), CV(J, 1800000), !I?.version && (!D.global || !D.latest)) return null;
  if (!I?.version && !A) return null;
  return Y5.createElement(h, {
    flexDirection: "row",
    gap: 1
  }, Z && Y5.createElement(P, {
    dimColor: !0
  }, "globalVersion: ", D.global, " · latestVersion:", " ", D.latest), A ? Y5.createElement(Y5.Fragment, null, Y5.createElement(h, null, Y5.createElement(P, {
    color: "text",
    dimColor: !0,
    wrap: "end"
  }, "Auto-updating to v", D.latest, "…"))) : I?.status === "success" && G && W && Y5.createElement(P, {
    color: "success"
  }, "✓ Update installed · Restart to apply"), (I?.status === "install_failed" || I?.status === "no_permissions") && Y5.createElement(P, {
    color: "error"
  }, "✗ Auto-update failed · Try ", Y5.createElement(P, {
    bold: !0
  }, "claude doctor"), !i$() && Y5.createElement(Y5.Fragment, null, " ", "or ", Y5.createElement(P, {
    bold: !0
  }, "npm i -g ", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.34"
  }.PACKAGE_URL)), i$() && Y5.createElement(Y5.Fragment, null, " ", "or", " ", Y5.createElement(P, {
    bold: !0
  }, "cd ~/.claude/local && npm update ", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.34"
  }.PACKAGE_URL))))
}
// @from(Start 10043083, End 10043099)
o7 = I1(U1(), 1)
// @from(Start 10043103, End 10043120)
ow1 = I1(U1(), 1)
// @from(Start 10043123, End 10044982)
function Mj2({
  isUpdating: A,
  onChangeIsUpdating: B,
  onAutoUpdaterResult: Q,
  autoUpdaterResult: I,
  showSuccessMessage: G,
  verbose: Z
}) {
  let [D, Y] = ow1.useState({}), W = sw1(I?.version), J = o7.useRef(!1), F = o7.useCallback(async () => {
    if (A || yG1()) return;
    B(!0);
    try {
      let X = await Fp(),
        V = {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://docs.anthropic.com/s/claude-code",
          VERSION: "1.0.34"
        }.VERSION;
      if (Y({
          current: V,
          latest: X.latestVersion
        }), X.wasUpdated) E1("tengu_native_auto_updater_success", {}), Q({
        version: X.latestVersion,
        status: "success"
      })
    } catch (X) {
      b1(X instanceof Error ? X : new Error(String(X))), E1("tengu_native_auto_updater_fail", {}), Q({
        version: null,
        status: "install_failed"
      })
    } finally {
      B(!1)
    }
  }, [A, B, Q]);
  if (ow1.useEffect(() => {
      if (!J.current) J.current = !0, F()
    }), CV(F, 1800000), !I?.version && (!D.current || !D.latest)) return null;
  if (!I?.version && !A) return null;
  return o7.createElement(h, {
    flexDirection: "row",
    gap: 1
  }, Z && o7.createElement(P, {
    dimColor: !0
  }, "current: ", D.current, " · latest: ", D.latest), A ? o7.createElement(h, null, o7.createElement(P, {
    color: "secondaryText",
    dimColor: !0,
    wrap: "end"
  }, "Checking for updates")) : I?.status === "success" && G && W && o7.createElement(P, {
    color: "success"
  }, "✓ Update installed · Restart to update"), I?.status === "install_failed" && o7.createElement(P, {
    color: "error"
  }, "✗ Auto-update failed · Try ", o7.createElement(P, {
    bold: !0
  }, "/status")))
}
// @from(Start 10044984, End 10045451)
function Lj2({
  isUpdating: A,
  onChangeIsUpdating: B,
  onAutoUpdaterResult: Q,
  autoUpdaterResult: I,
  showSuccessMessage: G,
  verbose: Z
}) {
  let [D, Y] = hy.useState(null);
  if (hy.useEffect(() => {
      ZF().then((J) => Y(J))
    }, [Y]), D === null) return !0;
  return hy.createElement(D ? Mj2 : qj2, {
    verbose: Z,
    onAutoUpdaterResult: Q,
    autoUpdaterResult: I,
    isUpdating: A,
    onChangeIsUpdating: B,
    showSuccessMessage: G
  })
}
// @from(Start 10045456, End 10045473)
Rj2 = I1(U1(), 1)
// @from(Start 10045475, End 10045801)
class z2A extends Rj2.Component {
  constructor(A) {
    super(A);
    this.state = {
      hasError: !1
    }
  }
  static getDerivedStateFromError() {
    return {
      hasError: !0
    }
  }
  componentDidCatch(A) {
    MG1(A)
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children
  }
}
// @from(Start 10045806, End 10045822)
SW = I1(U1(), 1)
// @from(Start 10045825, End 10046375)
function Oj2({
  tokenUsage: A
}) {
  let {
    percentLeft: B,
    isAboveWarningThreshold: Q,
    isAboveErrorThreshold: I
  } = m11(A, h11);
  if (!Q) return null;
  let G = g11();
  return SW.createElement(h, {
    flexDirection: "row"
  }, SW.createElement(P, {
    color: ZA().autoCompactEnabled ? "secondaryText" : I ? "error" : "warning"
  }, G ? SW.createElement(SW.Fragment, null, "Context left until auto-compact: ", B, "%") : SW.createElement(SW.Fragment, null, "Context low (", B, "% remaining) · Run /compact to compact & continue")))
}
// @from(Start 10046377, End 10046441)
function Tj2(A) {
  return m11(A, h11).isAboveWarningThreshold
}
// @from(Start 10046446, End 10046462)
KB = I1(U1(), 1)
// @from(Start 10046466, End 10046482)
HT = I1(U1(), 1)
// @from(Start 10046530, End 10046547)
Pj2 = I1(U1(), 1)
// @from(Start 10046550, End 10046744)
function tw1(A) {
  return Pj2.useMemo(() => {
    let B = A?.find((Q) => Q.name === "ide");
    if (!B) return null;
    return B.type === "connected" ? "connected" : "disconnected"
  }, [A])
}
// @from(Start 10046749, End 10046757)
Sj2 = !1
// @from(Start 10046760, End 10048901)
function _j2({
  ideSelection: A,
  mcpClients: B,
  ideInstallationStatus: Q
}) {
  let I = tw1(B),
    [G, Z] = HT.useState(!0),
    [D, Y] = HT.useState(!1);
  HT.useEffect(() => {
    if (I === "connected") {
      let K = setTimeout(() => {
        Z(!1)
      }, 1000);
      return () => clearTimeout(K)
    } else if (I === "disconnected") Z(!0)
  }, [I]);
  let [W, J] = HT.useState(!1);
  HT.useEffect(() => {
    if (Q?.error || hZ) {
      J(!0);
      let K = setTimeout(() => {
        J(!1)
      }, 5000);
      return () => clearTimeout(K)
    }
  }, [Q?.error]);
  let F = I === "connected" && (A?.filePath || A?.text && A.lineCount > 0),
    X = I === "connected" && !F,
    V = W && !hZ && !X && !F,
    C = W && hZ && !X && !F;
  return HT.useEffect(() => {
    if (!KK() && I === null && !Sj2) {
      let K;
      return bt(!0).then((E) => {
        if (E.length > 0) Y(!0), K = setTimeout(() => {
          Y(!1)
        }, 3000), Sj2 = !0
      }), () => K && clearTimeout(K)
    }
  }, [I]), I !== null ? KB.createElement(KB.Fragment, null, !V && I === "disconnected" && KB.createElement(P, {
    color: "error",
    key: "ide-status"
  }, A0.circle, " IDE disconnected"), X && KB.createElement(P, {
    color: "success",
    key: "ide-status"
  }, A0.circle, G && " IDE connected"), V && KB.createElement(P, {
    color: "error"
  }, "IDE extension install failed (see /status for info)"), C && KB.createElement(P, {
    color: "secondaryText"
  }, "IDE plugin not connected (see /status for info)"), F && A?.text && A.lineCount > 0 ? KB.createElement(P, {
    color: "permission",
    key: "selection-indicator"
  }, "⧉ ", A.lineCount, " ", A.lineCount === 1 ? "line" : "lines", " selected") : F && A?.filePath ? KB.createElement(P, {
    color: "permission",
    key: "selection-indicator"
  }, "⧉ In ", nN5(A.filePath)) : null) : KB.createElement(KB.Fragment, null, D && !C && KB.createElement(P, {
    color: "text",
    key: "ide-command-hint"
  }, A0.circle, " Use /ide to connect to your IDE"), C && KB.createElement(P, {
    color: "secondaryText"
  }, "IDE plugin not connected (see /status for info)"))
}
// @from(Start 10048903, End 10050881)
function jj2({
  apiKeyStatus: A,
  autoUpdaterResult: B,
  debug: Q,
  isAutoUpdating: I,
  verbose: G,
  tokenUsage: Z,
  permissionMode: D,
  onAutoUpdaterResult: Y,
  onChangeIsUpdating: W,
  ideSelection: J,
  ideInstallationStatus: F,
  mcpClients: X
}) {
  let V = yfA(D),
    C = Tj2(Z),
    K = tw1(X),
    [{
      mainLoopModel: E
    }] = d5(),
    {
      status: N,
      resetsAt: q,
      unifiedRateLimitFallbackAvailable: O
    } = Hu(),
    T = !(K === "connected" && (J?.filePath || J?.text && J.lineCount > 0)) || I || B?.status !== "success",
    L = zg(q);
  return G6.createElement(z2A, null, G6.createElement(h, {
    flexDirection: "column",
    alignItems: "flex-end"
  }, G6.createElement(_j2, {
    ideSelection: J,
    mcpClients: X,
    ideInstallationStatus: F
  }), O && E === "opus" && N !== "allowed_warning" && G6.createElement(h, null, G6.createElement(P, {
    color: "warning"
  }, "Approaching Opus usage limit · /model to use best available model")), N === "allowed_warning" && G6.createElement(h, null, G6.createElement(P, {
    color: "warning"
  }, "Approaching usage limit", L && ` · resets at ${L}`)), A === "invalid" && G6.createElement(h, null, G6.createElement(P, {
    color: "error"
  }, "Invalid API key · Run /login")), A === "missing" && G6.createElement(h, null, G6.createElement(P, {
    color: "error"
  }, "Missing API key · Run /login")), Q && G6.createElement(h, null, G6.createElement(P, {
    color: "warning"
  }, "Debug mode")), A !== "invalid" && A !== "missing" && V && G6.createElement(h, null, G6.createElement(P, {
    color: "warning"
  }, V)), A !== "invalid" && A !== "missing" && !V && G && G6.createElement(h, null, G6.createElement(P, {
    dimColor: !0
  }, Z, " tokens")), G6.createElement(Oj2, {
    tokenUsage: Z
  }), T && G6.createElement(Lj2, {
    verbose: G,
    onAutoUpdaterResult: Y,
    autoUpdaterResult: B,
    isUpdating: I,
    onChangeIsUpdating: W,
    showSuccessMessage: !C
  })))
}
// @from(Start 10050886, End 10050902)
AY = I1(U1(), 1)
// @from(Start 10050906, End 10050923)
yj2 = I1(U1(), 1)
// @from(Start 10050926, End 10051537)
function aN5({
  item: A,
  maxColumnWidth: B,
  isSelected: Q
}) {
  let I = c9().columns,
    G = I < 80,
    Z = B ?? A.displayText.length + 5;
  return AY.createElement(h, {
    key: A.id,
    flexDirection: G ? "column" : "row"
  }, AY.createElement(h, {
    width: G ? void 0 : Z
  }, AY.createElement(P, {
    color: Q ? "suggestion" : void 0,
    dimColor: !Q
  }, A.displayText)), A.description && AY.createElement(h, {
    width: I - (G ? 4 : Z + 4),
    paddingLeft: G ? 4 : 0
  }, AY.createElement(P, {
    color: Q ? "suggestion" : void 0,
    dimColor: !Q,
    wrap: "wrap"
  }, A.description)))
}
// @from(Start 10051539, End 10052123)
function w2A({
  suggestions: A,
  selectedSuggestion: B
}) {
  let {
    rows: Q
  } = c9(), I = Math.min(10, Math.max(1, Q - 3)), G = (J) => {
    return Math.max(...J.map((F) => F.displayText.length)) + 5
  };
  if (A.length === 0) return null;
  let Z = Math.max(0, Math.min(B - Math.floor(I / 2), A.length - I)),
    D = Math.min(Z + I, A.length),
    Y = A.slice(Z, D),
    W = G(Y);
  return AY.createElement(h, {
    flexDirection: "column"
  }, Y.map((J) => AY.createElement(aN5, {
    key: J.id,
    item: J,
    maxColumnWidth: W,
    isSelected: J.id === A[B]?.id
  })))
}
// @from(Start 10052128, End 10052147)
POB = yj2.memo(w2A)
// @from(Start 10052150, End 10054540)
function sN5({
  apiKeyStatus: A,
  debug: B,
  exitMessage: Q,
  vimMode: I,
  mode: G,
  autoUpdaterResult: Z,
  isAutoUpdating: D,
  verbose: Y,
  tokenUsage: W,
  onAutoUpdaterResult: J,
  onChangeIsUpdating: F,
  suggestions: X,
  selectedSuggestion: V,
  notification: C,
  toolPermissionContext: K,
  helpOpen: E,
  suppressHint: N,
  shellsSelected: q = !1,
  ideSelection: O,
  mcpClients: R,
  ideInstallationStatus: T,
  isPasting: L = !1
}) {
  if (X.length) return S9.createElement(h, {
    paddingX: 2,
    paddingY: 0
  }, S9.createElement(w2A, {
    suggestions: X,
    selectedSuggestion: V
  }));
  if (E) return S9.createElement(h, {
    paddingX: 2,
    paddingY: 0,
    flexDirection: "row"
  }, S9.createElement(h, {
    flexDirection: "column",
    width: 22
  }, S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, "! for bash mode")), S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, "/ for commands")), S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, "@ for file paths")), S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, "# to memorize"))), S9.createElement(h, {
    flexDirection: "column",
    width: 35
  }, S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, "double tap esc to clear input")), S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, "shift + tab to auto-accept edits")), S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, "ctrl + r for verbose output")), S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, zj2()))), S9.createElement(h, {
    flexDirection: "column"
  }, S9.createElement(h, null, S9.createElement(P, {
    dimColor: !0
  }, "ctrl + z to undo"))));
  return S9.createElement(h, {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingX: 2,
    paddingY: 0
  }, S9.createElement(Ej2, {
    exitMessage: Q,
    vimMode: I,
    mode: G,
    notification: C,
    toolPermissionContext: K,
    suppressHint: N,
    shellsSelected: q,
    isPasting: L
  }), S9.createElement(jj2, {
    apiKeyStatus: A,
    autoUpdaterResult: Z,
    debug: B,
    isAutoUpdating: D,
    verbose: Y,
    tokenUsage: W,
    permissionMode: K.mode,
    onAutoUpdaterResult: J,
    onChangeIsUpdating: F,
    ideSelection: O,
    mcpClients: R,
    ideInstallationStatus: T
  }))
}
// @from(Start 10054545, End 10054564)
xj2 = kj2.memo(sN5)
// @from(Start 10054570, End 10054586)
my = I1(U1(), 1)
// @from(Start 10054592, End 10054832)
o$ = K2({
  content: "Caveat: The messages below were generated by the user while running local commands. DO NOT respond to these messages or otherwise consider them in your response unless the user explicitly asks you to.",
  isMeta: !0
})
// @from(Start 10054834, End 10059265)
async function Tp(A, B, Q, I, G, Z, D) {
  let W = B !== "prompt" || !A.startsWith("/") ? await Ne1(x11(A, I, Z, [])) : [];
  if (B === "bash") {
    E1("tengu_input_bash", {});
    let F = K2({
      content: `<bash-input>${A}</bash-input>`
    });
    Q({
      jsx: my.createElement(h, {
        flexDirection: "column",
        marginTop: 1
      }, my.createElement(oH1, {
        addMargin: !1,
        param: {
          text: `<bash-input>${A}</bash-input>`,
          type: "text"
        }
      }), my.createElement(vy, {
        mode: "tool-use",
        haikuWords: ["Bashing"],
        currentResponseLength: 0
      })),
      shouldHidePromptInput: !1
    });
    try {
      let {
        data: X
      } = await aJ(E4.call({
        command: A
      }, I)), V = X.stderr;
      if (gK1(I.getToolPermissionContext())) V = bK1(V);
      return {
        messages: [o$, F, ...W, K2({
          content: `<bash-stdout>${X.stdout}</bash-stdout><bash-stderr>${V}</bash-stderr>`
        })],
        shouldQuery: !1
      }
    } catch (X) {
      if (X instanceof Uz) {
        if (X.interrupted) return {
          messages: [o$, F, K2({
            content: Wu
          }), ...W],
          shouldQuery: !1
        };
        return {
          messages: [o$, F, ...W, K2({
            content: `<bash-stdout>${X.stdout}</bash-stdout><bash-stderr>${X.stderr}</bash-stderr>`
          })],
          shouldQuery: !1
        }
      }
      return {
        messages: [o$, F, ...W, K2({
          content: `<bash-stderr>Command failed: ${X instanceof Error?X.message:String(X)}</bash-stderr>`
        })],
        shouldQuery: !1
      }
    } finally {
      setTimeout(() => {
        Q(null)
      }, 200)
    }
  }
  if (B === "memorySelect") {
    E1("tengu_input_memory", {});
    let F = K2({
      content: `<user-memory-input>${A}</user-memory-input>`
    });
    return SU2(A, I, D), {
      messages: [o$, F, ...W, K2({
        content: AW
      })],
      shouldQuery: !1
    }
  }
  if (A.startsWith("/")) {
    let F = A.slice(1).split(" "),
      X = F[0],
      V = !1;
    if (F.length > 1 && F[1] === "(MCP)") X = X + " (MCP)", V = !0;
    if (!X) return E1("tengu_input_slash_missing", {}), {
      messages: [o$, ...W, K2({
        content: "Commands are in the form `/command [args]`"
      })],
      shouldQuery: !1
    };
    let C = X.includes(":"),
      K = V ? "mcp" : C ? "custom" : X;
    if (!Zj2(X, I.options.commands)) return E1("tengu_input_prompt", {}), bK("user_prompt", {
      prompt_length: String(A.length),
      prompt: Xe1(A)
    }), {
      messages: [K2({
        content: A
      }), ...W],
      shouldQuery: !0
    };
    let E = A.slice(X.length + 2),
      {
        messages: N,
        shouldQuery: q,
        allowedTools: O,
        skipHistory: R,
        maxThinkingTokens: T
      } = await rN5(X, E, Q, I);
    if (N.length === 0) return E1("tengu_input_command", {
      input: K
    }), {
      messages: [],
      shouldQuery: !1,
      skipHistory: R,
      maxThinkingTokens: T
    };
    if (N.length === 2 && N[1].type === "user" && typeof N[1].message.content === "string" && N[1].message.content.startsWith("Unknown command:")) return E1("tengu_input_slash_invalid", {
      input: X
    }), {
      messages: [o$, ...N],
      shouldQuery: q,
      allowedTools: O,
      maxThinkingTokens: T
    };
    if (N.length === 2) return E1("tengu_input_command", {
      input: K
    }), {
      messages: q ? N : [o$, ...N],
      shouldQuery: q,
      allowedTools: O,
      maxThinkingTokens: T
    };
    return E1("tengu_input_command", {
      input: K
    }), {
      messages: q ? N : [o$, ...N],
      shouldQuery: q,
      allowedTools: O,
      maxThinkingTokens: T
    }
  }
  E1("tengu_input_prompt", {}), bK("user_prompt", {
    prompt_length: String(A.length),
    prompt: Xe1(A)
  });
  let J = G ? Object.values(G).filter((F) => F.type === "image") : [];
  if (J.length > 0) {
    let F = J.map((X) => {
      return {
        type: "image",
        source: {
          type: "base64",
          media_type: X.mediaType || "image/png",
          data: X.content
        }
      }
    });
    return {
      messages: [K2({
        content: [...F, {
          type: "text",
          text: A
        }]
      }), ...W],
      shouldQuery: !0
    }
  }
  return {
    messages: [K2({
      content: A
    }), ...W],
    shouldQuery: !0
  }
}
// @from(Start 10059266, End 10062097)
async function rN5(A, B, Q, I) {
  try {
    let G = cw1(A, I.options.commands);
    switch (G.type) {
      case "local-jsx":
        return new Promise((Z) => {
          G.call((D, Y) => {
            if (Q(null), Y?.skipMessage) {
              Z({
                messages: [],
                shouldQuery: !1,
                skipHistory: !0
              });
              return
            }
            Z({
              messages: [K2({
                content: `<command-name>/${G.userFacingName()}</command-name>
            <command-message>${G.userFacingName()}</command-message>
            <command-args>${B}</command-args>`
              }), D ? K2({
                content: `<local-command-stdout>${D}</local-command-stdout>`
              }) : K2({
                content: `<local-command-stdout>${AW}</local-command-stdout>`
              })],
              shouldQuery: !1
            })
          }, I, B).then((D) => {
            Q({
              jsx: D,
              shouldHidePromptInput: !0
            })
          })
        });
      case "local": {
        let Z = K2({
          content: `<command-name>/${G.userFacingName()}</command-name>
          <command-message>${G.userFacingName()}</command-message>
          <command-args>${B}</command-args>`
        });
        try {
          let D = await G.call(B, I);
          return {
            messages: [Z, K2({
              content: `<local-command-stdout>${D}</local-command-stdout>`
            })],
            shouldQuery: !1
          }
        } catch (D) {
          return b1(D), {
            messages: [Z, K2({
              content: `<local-command-stderr>${String(D)}</local-command-stderr>`
            })],
            shouldQuery: !1
          }
        }
      }
      case "prompt": {
        let Z = await G.getPromptForCommand(B, I),
          D = [`<command-message>${G.userFacingName()} is ${G.progressMessage}…</command-message>`, `<command-name>/${G.userFacingName()}</command-name>`, B ? `<command-args>${B}</command-args>` : null].filter(Boolean).join(`
`),
          Y = Lp(G.allowedTools ?? []),
          W = s$([K2({
            content: Z
          })]),
          J = await Ne1(x11(Z.filter((F) => F.type === "text").map((F) => F.text).join(" "), I, null, []));
        return {
          messages: [K2({
            content: D
          }), K2({
            content: Z,
            isMeta: !0
          }), ...J, ...Y.length ? [Nu({
            type: "command_permissions",
            allowedTools: Y
          })] : []],
          shouldQuery: !0,
          allowedTools: Y,
          maxThinkingTokens: W > 0 ? W : void 0
        }
      }
    }
  } catch (G) {
    if (G instanceof tT1) return {
      messages: [K2({
        content: G.message
      })],
      shouldQuery: !1
    };
    throw G
  }
}
// @from(Start 10062102, End 10062119)
ew1 = I1(U1(), 1)
// @from(Start 10062125, End 10062145)
oN5 = "at_mentioned"
// @from(Start 10062149, End 10062333)
tN5 = n.object({
    method: n.literal(oN5),
    params: n.object({
      filePath: n.string(),
      lineStart: n.number().optional(),
      lineEnd: n.number().optional()
    })
  })
// @from(Start 10062336, End 10062939)
function fj2(A, B) {
  let Q = ew1.useRef();
  ew1.useEffect(() => {
    let I = IW(A);
    if (Q.current !== I) Q.current = I;
    if (I) I.client.setNotificationHandler(tN5, (G) => {
      if (Q.current !== I) return;
      try {
        let Z = G.params,
          D = Z.lineStart !== void 0 ? Z.lineStart + 1 : void 0,
          Y = Z.lineEnd !== void 0 ? Z.lineEnd + 1 : void 0;
        B({
          filePath: Z.filePath,
          lineStart: D,
          lineEnd: Y
        })
      } catch (Z) {
        console.error("Error processing at_mention notification:", Z)
      }
    })
  }, [A, B])
}
// @from(Start 10062973, End 10062989)
_E = I1(U1(), 1)
// @from(Start 10062992, End 10064250)
function vj2({
  maxBufferSize: A,
  debounceMs: B
}) {
  let [Q, I] = _E.useState([]), [G, Z] = _E.useState(-1), D = _E.useRef(0), Y = _E.useRef(null), W = _E.useCallback((V, C, K = {}) => {
    let E = Date.now();
    if (Y.current) clearTimeout(Y.current), Y.current = null;
    if (E - D.current < B) {
      Y.current = setTimeout(() => {
        W(V, C, K)
      }, B);
      return
    }
    D.current = E, I((N) => {
      let q = G >= 0 ? N.slice(0, G + 1) : N,
        O = q[q.length - 1];
      if (O && O.text === V) return q;
      let R = [...q, {
        text: V,
        cursorOffset: C,
        pastedContents: K,
        timestamp: E
      }];
      if (R.length > A) return R.slice(-A);
      return R
    }), Z((N) => {
      let q = N >= 0 ? N + 1 : Q.length;
      return Math.min(q, A - 1)
    })
  }, [B, A, G, Q.length]), J = _E.useCallback(() => {
    if (G < 0 || Q.length === 0) return;
    let V = Math.max(0, G - 1),
      C = Q[V];
    if (C) return Z(V), C;
    return
  }, [Q, G]), F = _E.useCallback(() => {
    if (I([]), Z(-1), D.current = 0, Y.current) clearTimeout(Y.current), Y.current = null
  }, [D, Y]), X = G > 0 && Q.length > 1;
  return {
    pushToBuffer: W,
    undo: J,
    canUndo: X,
    clearBuffer: F
  }
}
// @from(Start 10064252, End 10064605)
function eN5(A, B) {
  let Q = Object.keys(B).map(Number),
    I = Q.length > 0 ? Math.max(...Q) + 1 : 1,
    {
      truncatedText: G,
      placeholderContent: Z
    } = _O2(A, I);
  if (!Z) return;
  let D = {
    ...B,
    [I]: {
      id: I,
      type: "text",
      content: Z
    }
  };
  return {
    newInput: G,
    newPastedContents: D
  }
}
// @from(Start 10064607, End 10075442)
function A$5({
  debug: A,
  ideSelection: B,
  toolPermissionContext: Q,
  setToolPermissionContext: I,
  apiKeyStatus: G,
  commands: Z,
  isLoading: D,
  onQuery: Y,
  verbose: W,
  messages: J,
  setToolJSX: F,
  onAutoUpdaterResult: X,
  autoUpdaterResult: V,
  input: C,
  onInputChange: K,
  mode: E,
  onModeChange: N,
  queuedCommands: q,
  setQueuedCommands: O,
  submitCount: R,
  onSubmitCountChange: T,
  setIsLoading: L,
  setAbortController: _,
  onShowMessageSelector: k,
  notification: i,
  addNotification: x,
  mcpClients: s,
  pastedContents: d,
  setPastedContents: F1,
  vimMode: X1,
  setVimMode: v,
  ideInstallationStatus: D1,
  onExit: N1,
  getToolUseContext: u1
}) {
  let [d1, YA] = DQ.useState(!1), [bA, e1] = DQ.useState({
    show: !1
  }), [k1, Q1] = DQ.useState(""), [v1, L1] = DQ.useState(C.length), [BA, HA] = DQ.useState(!1);
  DQ.useEffect(() => {
    if (!BA && C.length > 1e4) {
      let x0 = eN5(C, d);
      if (x0) {
        let {
          newInput: d0,
          newPastedContents: L9
        } = x0;
        K(d0), F1(L9), L1(d0.length)
      }
      HA(!0)
    }
  }, [C, BA, d, K, F1]), DQ.useEffect(() => {
    if (C === "") HA(!1)
  }, [C]);
  let MA = DQ.useMemo(() => {
      let x0 = Object.keys(d).map(Number);
      if (x0.length === 0) return 1;
      return Math.max(...x0) + 1
    }, [d]),
    [t, B1] = DQ.useState(!1),
    [W1, w1] = DQ.useState(!1),
    [P1, e] = DQ.useState(!1),
    {
      pushToBuffer: y1,
      undo: O1,
      canUndo: h1,
      clearBuffer: o1
    } = vj2({
      maxBufferSize: 50,
      debounceMs: 1000
    }),
    QA = !C && R === 0;
  DQ.useEffect(() => {
    if (R > 0) return;
    dz1(!1).then((x0) => {
      Q1(`Try "${EP(x0)}"`)
    })
  }, [E, R]);
  let zA = DQ.useCallback((x0) => {
      if (x0 === "?") {
        E1("tengu_help_toggled", {}), B1((_B) => !_B);
        return
      }
      B1(!1);
      let d0 = x0.length === C.length + 1,
        L9 = v1 === 0;
      if (d0 && L9 && x0.startsWith("!")) {
        N("bash");
        return
      }
      if (d0 && L9 && x0.startsWith("#")) {
        N("memory");
        return
      }
      let w5 = x0.replaceAll("\t", "    ");
      if (C !== w5) y1(C, v1, d);
      K(w5)
    }, [K, N, C, v1, y1, d]),
    {
      resetHistory: Y0,
      onHistoryUp: fA,
      onHistoryDown: H0
    } = jO2((x0, d0, L9) => {
      zA(x0), N(d0), F1(L9)
    }, C, d, L1),
    {
      shells: k2
    } = Mp(),
    s0 = k2.filter((x0) => x0.status === "running").length,
    q2 = 3,
    h2 = () => {
      if (y0.length <= 1) {
        if (q.length > 0) {
          Z6();
          return
        }
        if (W1) w1(!1);
        else fA()
      }
    },
    j9 = () => {
      if (y0.length <= 1) {
        let x0 = H0();
        if (x0 && s0 > 0) {
          w1(!0);
          let d0 = ZA();
          if (!d0.hasSeenTasksHint) j0({
            ...d0,
            hasSeenTasksHint: !0
          })
        } else w1(!1);
        return x0
      }
      return !1
    },
    [w6, E0] = DQ.useState({
      suggestions: [],
      selectedSuggestion: -1,
      commandArgumentHint: void 0
    }),
    g0 = DQ.useCallback(async (x0, d0 = !1, L9) => {
      if (x0.trim() === "") return;
      if (w6.suggestions.length > 0 && !d0) return;
      if (["exit", "quit", ":q", ":q!", ":wq", ":wq!"].includes(x0.trim())) {
        if (Z.find((j8) => j8.name === "exit")) g0("/exit", !0);
        else B$5();
        return
      }
      let w5 = x0,
        _B = SO2(x0),
        D6 = 0;
      for (let j5 of _B) {
        let j8 = d[j5.id];
        if (j8 && j8.type === "text") w5 = w5.replace(j5.match, j8.content), D6++
      }
      if (E1("tengu_paste_text", {
          pastedTextCount: D6
        }), D) {
        if (E !== "prompt") return;
        O((j5) => [...j5, {
          value: w5,
          mode: "prompt"
        }]), K(""), L1(0), F1({}), Y0(), o1();
        return
      }
      if (E === "memory") {
        N("memorySelect");
        return
      }
      K(""), L1(0), N("prompt"), F1({}), T((j5) => j5 + 1), L(!0), o1();
      let F3 = new AbortController;
      _(F3);
      let {
        messages: X3,
        shouldQuery: q7,
        allowedTools: V3,
        skipHistory: H2,
        maxThinkingTokens: w9
      } = await Tp(w5, E, F, u1(J, [], F3, []), d, B, L9);
      if (X3.length) Y(X3, F3, q7, V3 ?? [], w9);
      else {
        if (!H2) GT({
          display: x0,
          pastedContents: d
        });
        Y0(), L(!1), _(null);
        return
      }
      for (let j5 of X3)
        if (j5.type === "user") {
          let j8 = E === "bash" ? `!${x0}` : E === "memorySelect" ? `#${x0}` : x0;
          GT({
            display: j8,
            pastedContents: d
          }), Y0()
        }
    }, [w6.suggestions.length, D, E, K, N, T, L, _, F, u1, J, d, F1, B, Z, O, Y0, Y, o1]),
    {
      suggestions: y0,
      selectedSuggestion: T0,
      commandArgumentHint: V0
    } = Kj2({
      commands: Z,
      onInputChange: K,
      onSubmit: g0,
      setCursorOffset: L1,
      input: C,
      cursorOffset: v1,
      setSuggestionsState: E0,
      suggestionsState: w6
    });

  function N2(x0, d0) {
    E1("tengu_paste_image", {}), N("prompt");
    let L9 = {
      id: MA,
      type: "image",
      content: x0,
      mediaType: d0 || "image/png"
    };
    F1((w5) => ({
      ...w5,
      [MA]: L9
    })), z5(PO2(L9.id))
  }

  function h9(x0) {
    let d0 = UZ(x0).replace(/\r/g, `
`).replaceAll("\t", "    ");
    if (d0.length > sz1) {
      let L9 = {
          id: MA,
          type: "text",
          content: d0
        },
        w5 = uz1(d0);
      F1((_B) => ({
        ..._B,
        [MA]: L9
      })), z5(yAA(L9.id, w5))
    } else z5(d0)
  }

  function z5(x0) {
    y1(C, v1, d);
    let d0 = C.slice(0, v1) + x0 + C.slice(v1);
    K(d0), L1(v1 + x0.length)
  }
  let W3 = $N(() => {}, () => k()),
    Z6 = DQ.useCallback(() => {
      if (q.length === 0) return;
      let x0 = [...q.map((d0) => d0.value), C].filter(Boolean).join(`
`);
      K(x0), N("prompt"), O(() => []), L1(q.map((d0) => d0.value).join(`
`).length + 1 + v1)
    }, [q, K, N, O, C, v1]);
  DQ.useEffect(() => {
    if (!D && q[0]) {
      let x0 = q.map((d0) => d0.value).join(`
`);
      O((d0) => d0.filter((L9) => !q.includes(L9))), g0(x0, !1)
    }
  }, [D, q, g0, O]), fj2(s, function(x0) {
    E1("tengu_ext_at_mentioned", {});
    let d0, L9 = bj2.relative(dA(), x0.filePath);
    if (x0.lineStart && x0.lineEnd) d0 = x0.lineStart === x0.lineEnd ? `@${L9}#L${x0.lineStart} ` : `@${L9}#L${x0.lineStart}-${x0.lineEnd} `;
    else d0 = `@${L9} `;
    let w5 = C[v1 - 1] ?? " ";
    if (!/\s/.test(w5)) d0 = ` ${d0}`;
    z5(d0)
  }), Z0((x0, d0) => {
    if (d0.ctrl && x0.toLowerCase() === "z") {
      if (h1) {
        let L9 = O1();
        if (L9) K(L9.text), L1(L9.cursorOffset), F1(L9.pastedContents)
      }
      return
    }
    if (d0.return && W1) {
      g0("/bashes", !0), w1(!1);
      return
    }
    if (v1 === 0 && (d0.escape || d0.backspace || d0.delete)) N("prompt"), B1(!1);
    if (t && C === "" && (d0.backspace || d0.delete)) B1(!1);
    if (d0.tab && d0.shift) {
      let L9 = wj2(Q);
      if (E1("tengu_mode_cycle", {
          to: L9
        }), I({
          ...Q,
          mode: L9
        }), t) B1(!1);
      return
    }
    if (d0.escape) {
      if (W1) {
        w1(!1);
        return
      }
      if (q.length > 0) {
        Z6();
        return
      }
      if (J.length > 0 && !C && !D) W3()
    }
    if (d0.return && t) B1(!1)
  });
  let {
    columns: v6
  } = c9(), J3 = v6 - 6, uQ = DQ.useMemo(() => VE(J), [J]);
  return z8.createElement(h, {
    flexDirection: "column"
  }, q.length > 0 && z8.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, z8.createElement(h, {
    paddingLeft: 2,
    flexDirection: "column",
    width: v6 - 4
  }, z8.createElement(P, {
    color: "secondaryText",
    wrap: "wrap"
  }, q.map((x0) => x0.value).join(`
`)))), z8.createElement(h, {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: E === "bash" ? "bashBorder" : E === "memory" || E === "memorySelect" ? "remember" : "secondaryBorder",
    borderDimColor: E !== "memory",
    borderStyle: "round",
    marginTop: q.length > 0 ? 0 : 1,
    width: "100%"
  }, z8.createElement(h, {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    width: 3
  }, E === "bash" ? z8.createElement(P, {
    color: "bashBorder",
    dimColor: D
  }, " ! ") : E === "memory" || E === "memorySelect" ? z8.createElement(P, {
    color: "remember",
    dimColor: D
  }, " # ") : z8.createElement(P, {
    color: D ? "secondaryText" : void 0
  }, " > ")), z8.createElement(h, {
    paddingRight: 1
  }, (() => {
    let x0 = {
      multiline: !0,
      onSubmit: g0,
      onChange: zA,
      value: C,
      onHistoryUp: h2,
      onHistoryDown: j9,
      onHistoryReset: () => Y0(),
      placeholder: E === "memory" ? 'Add to memory. Try "Always use descriptive variable names"' : q.length > 0 && (ZA().queuedCommandUpHintCount || 0) < q2 ? "Press up to edit queued messages" : QA ? k1 : void 0,
      onExit: N1,
      onExitMessage: (d0, L9) => e1({
        show: d0,
        key: L9
      }),
      onMessage: (d0, L9) => {
        if (d0 && L9) x({
          text: L9
        }, {
          timeoutMs: 3600000
        });
        else x({
          text: ""
        }, {
          timeoutMs: 0
        })
      },
      onImagePaste: N2,
      columns: J3,
      disableCursorMovementForUpDownKeys: y0.length > 0,
      cursorOffset: v1,
      onChangeCursorOffset: L1,
      onPaste: h9,
      onIsPastingChange: e,
      focus: E !== "memorySelect",
      showCursor: E !== "memorySelect",
      argumentHint: V0,
      onUndo: h1 ? () => {
        let d0 = O1();
        if (d0) K(d0.text), L1(d0.cursorOffset), F1(d0.pastedContents)
      } : void 0
    };
    return Rp() ? z8.createElement(H2A, {
      ...x0,
      initialMode: X1,
      onModeChange: v,
      isLoading: D
    }) : z8.createElement(j3, {
      ...x0
    })
  })())), E === "memorySelect" && z8.createElement(qw1, {
    onSelect: (x0) => {
      g0(C, !1, x0)
    },
    onCancel: () => {
      N("memory")
    }
  }), z8.createElement(xj2, {
    apiKeyStatus: G,
    debug: A,
    exitMessage: bA,
    vimMode: X1,
    mode: E,
    autoUpdaterResult: V,
    isAutoUpdating: d1,
    verbose: W,
    tokenUsage: uQ,
    onAutoUpdaterResult: X,
    onChangeIsUpdating: YA,
    suggestions: y0,
    selectedSuggestion: T0,
    notification: i,
    toolPermissionContext: Q,
    helpOpen: t,
    suppressHint: C.length > 0,
    shellsSelected: W1,
    ideSelection: B,
    mcpClients: s,
    ideInstallationStatus: D1,
    isPasting: P1
  }))
}
// @from(Start 10075447, End 10075456)
gj2 = A$5
// @from(Start 10075459, End 10075494)
function B$5() {
  B0A(""), MI(0)
}
// @from(Start 10075499, End 10075516)
hj2 = I1(U1(), 1)
// @from(Start 10075519, End 10075694)
function mj2() {
  hj2.useEffect(() => {
    let A = Math.round(process.uptime() * 1000);
    E1("tengu_timer", {
      event: "startup",
      durationMs: A
    })
  }, [])
}
// @from(Start 10075699, End 10075716)
I01 = I1(U1(), 1)
// @from(Start 10075719, End 10076275)
function dj2() {
  let [A, B] = I01.useState(() => {
    let Z = qG(!1);
    if (!mS() || T9()) return "valid";
    if (Z) return "loading";
    return "missing"
  }), [Q, I] = I01.useState(null), G = I01.useCallback(async () => {
    if (!mS() || T9()) return;
    let Z = qG(!1);
    if (!Z) {
      B("missing");
      return
    }
    try {
      let Y = await iE2(Z, !1) ? "valid" : "invalid";
      B(Y);
      return
    } catch (D) {
      I(D), B("error");
      return
    }
  }, []);
  return {
    status: A,
    reverify: G,
    error: Q
  }
}
// @from(Start 10076277, End 10076585)
function uj2(A, B, Q, I, G, Z, D, Y) {
  Z0((W, J) => {
    if (!J.escape) return;
    if (Z?.aborted) return;
    if (!Z) return;
    if (!Q) return;
    if (I) return;
    if (Rp() && Y === "INSERT") return;
    if (G.length > 0) {
      if (D) D()
    }
    E1("tengu_cancel", {}), A(() => []), B()
  })
}
// @from(Start 10076590, End 10076607)
pj2 = I1(U1(), 1)
// @from(Start 10076613, End 10076665)
Q$5 = ["Edit", "MultiEdit", "Write", "NotebookEdit"]
// @from(Start 10076668, End 10076712)
function G01(A) {
  return Q$5.includes(A)
}
// @from(Start 10076714, End 10077010)
function Z01(A, B, Q, I) {
  let G;
  if (A.getPath && B) {
    let Z = A.inputSchema.safeParse(B);
    if (Z.success) {
      let D = A.getPath(Z.data);
      if (D) G = $G(D)
    }
  }
  return {
    decision: Q,
    source: I,
    tool_name: A.name,
    ...G && {
      language: G
    }
  }
}
// @from(Start 10077011, End 10077126)
async function D01(A, B, Q) {
  await bK("tool_decision", {
    decision: B,
    source: Q,
    tool_name: A
  })
}
// @from(Start 10077128, End 10080933)
function I$5(A) {
  return pj2.useCallback(async (B, Q, I, G) => {
    return new Promise((Z) => {
      function D() {
        E1("tengu_tool_use_cancelled", {
          messageID: G.message.id,
          toolName: B.name
        })
      }

      function Y() {
        Z({
          behavior: "ask",
          message: N11
        }), I.abortController.abort()
      }
      if (I.abortController.signal.aborted) {
        D(), Y();
        return
      }
      return sM(B, Q, I, G).then(async (W) => {
        if (W.behavior === "allow") {
          if (E1("tengu_tool_use_granted_in_config", {
              messageID: G.message.id,
              toolName: B.name
            }), G01(B.name)) {
            let F = Z01(B, Q, "accept", "config");
            yk()?.add(1, F)
          }
          D01(B.name, "accept", "config"), Z({
            ...W,
            updatedInput: Q,
            userModified: !1
          });
          return
        }
        let J = await B.description(Q, {
          isNonInteractiveSession: I.options.isNonInteractiveSession,
          getToolPermissionContext: I.getToolPermissionContext,
          tools: I.options.tools
        });
        if (I.abortController.signal.aborted) {
          D(), Y();
          return
        }
        switch (W.behavior) {
          case "deny": {
            if (E1("tengu_tool_use_denied_in_config", {
                messageID: G.message.id,
                toolName: B.name
              }), G01(B.name)) {
              let F = Z01(B, Q, "reject", "config");
              yk()?.add(1, F)
            }
            D01(B.name, "reject", "config"), Z(W);
            return
          }
          case "ask": {
            A((F) => [...F, {
              assistantMessage: G,
              tool: B,
              description: J,
              input: Q,
              toolUseContext: I,
              permissionResult: W,
              onAbort() {
                if (D(), E1("tengu_tool_use_rejected_in_prompt", {
                    messageID: G.message.id,
                    toolName: B.name
                  }), G01(B.name)) {
                  let X = Z01(B, Q, "reject", "user_abort");
                  yk()?.add(1, X)
                }
                D01(B.name, "reject", "user_abort"), Y()
              },
              onAllow(X, V) {
                if (X === "permanent") E1("tengu_tool_use_granted_in_prompt_permanent", {
                  messageID: G.message.id,
                  toolName: B.name
                });
                else E1("tengu_tool_use_granted_in_prompt_temporary", {
                  messageID: G.message.id,
                  toolName: B.name
                });
                if (G01(B.name)) {
                  let N = Z01(B, V, "accept", X === "permanent" ? "user_permanent" : "user_temporary");
                  yk()?.add(1, N)
                }
                let C = X === "permanent" ? "user_permanent" : "user_temporary";
                D01(B.name, "accept", C);
                let K = B.inputsEquivalent ? !B.inputsEquivalent(Q, V) : !1;
                Z({
                  behavior: "allow",
                  updatedInput: V,
                  userModified: K
                })
              },
              onReject() {
                if (E1("tengu_tool_use_rejected_in_prompt", {
                    messageID: G.message.id,
                    toolName: B.name
                  }), G01(B.name)) {
                  let X = Z01(B, Q, "reject", "user_reject");
                  yk()?.add(1, X)
                }
                D01(B.name, "reject", "user_reject"), Y()
              }
            }]);
            return
          }
        }
      }).catch((W) => {
        if (W instanceof NG) D(), Y();
        else b1(W)
      })
    })
  }, [A])
}
// @from(Start 10080938, End 10080947)
cj2 = I$5
// @from(Start 10080953, End 10080970)
lj2 = I1(U1(), 1)
// @from(Start 10080973, End 10081121)
function ij2(A, B) {
  return lj2.useMemo(() => {
    if (A && B && B.length > 0) return UP([...A, ...B], "name");
    return A || []
  }, [A, B])
}
// @from(Start 10081126, End 10081143)
nj2 = I1(U1(), 1)
// @from(Start 10081146, End 10081246)
function aj2(A, B) {
  return nj2.useMemo(() => {
    return UP([...A, ...B], "name")
  }, [A, B])
}
// @from(Start 10081251, End 10081268)
sj2 = I1(U1(), 1)
// @from(Start 10081271, End 10081403)
function rj2(A, B) {
  return sj2.useMemo(() => {
    if (B.length > 0) return UP([...A, ...B], "name");
    return A
  }, [A, B])
}
// @from(Start 10081408, End 10081424)
s2 = I1(U1(), 1)
// @from(Start 10081428, End 10081444)
wT = I1(U1(), 1)
// @from(Start 10081450, End 10081466)
t7 = I1(U1(), 1)
// @from(Start 10081469, End 10082032)
function oj2({
  message: A,
  screen: B
}) {
  let Q = B === "transcript",
    I = vw2(A) || "";
  return t7.createElement(h, {
    flexDirection: "column"
  }, t7.createElement(h, {
    flexDirection: "row"
  }, t7.createElement(h, {
    minWidth: 2
  }, t7.createElement(P, {
    color: "text"
  }, FE)), t7.createElement(h, {
    flexDirection: "column"
  }, t7.createElement(P, {
    bold: !0
  }, "Compact summary", !Q && t7.createElement(P, {
    dimColor: !0
  }, " (ctrl+r to expand)")))), Q && t7.createElement(w0, null, t7.createElement(P, null, I)))
}
// @from(Start 10082037, End 10082053)
y2 = I1(U1(), 1)
// @from(Start 10082098, End 10082426)
function Z$5() {
  let A = ZA();
  j0({
    ...A,
    lastReleaseNotesSeen: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION
  })
}
// @from(Start 10082428, End 10084998)
function tj2() {
  let A = ZA(),
    {
      hasReleaseNotes: B,
      releaseNotes: Q
    } = y2.useMemo(() => yw1(A.lastReleaseNotesSeen), [A.lastReleaseNotesSeen]);
  y2.useEffect(() => {
    if (B) Z$5()
  }, [B]);
  let {
    source: I
  } = GX(!1), G = !!un() && (I === "ANTHROPIC_API_KEY" || I === "apiKeyHelper"), Z = h31(), D = T9() && (Z.source === "ANTHROPIC_AUTH_TOKEN" || Z.source === "apiKeyHelper"), Y = I !== "none" && Z.source !== "none" && !(I === "apiKeyHelper" && Z.source === "apiKeyHelper");
  return y2.createElement(h, {
    flexDirection: "column",
    paddingLeft: 1
  }, y2.createElement(W$5, null), D && y2.createElement(h, {
    flexDirection: "row",
    marginTop: 1
  }, y2.createElement(P, {
    color: "warning"
  }, A0.warning), y2.createElement(P, {
    color: "warning"
  }, "Auth conflict: Using ", Z.source, " instead of Claude account subscription token. Either unset ", Z.source, ", or run `claude /logout`.")), G && y2.createElement(h, {
    flexDirection: "row",
    marginTop: 1
  }, y2.createElement(P, {
    color: "warning"
  }, A0.warning), y2.createElement(P, {
    color: "warning"
  }, "Auth conflict: Using ", I, " instead of Anthropic Console key. Either unset ", I, ", or run `claude /logout`.")), Y && y2.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, y2.createElement(h, {
    flexDirection: "row"
  }, y2.createElement(P, {
    color: "warning"
  }, A0.warning), y2.createElement(P, {
    color: "warning"
  }, "Auth conflict: Both a token (", Z.source, ") and an API key (", I, ") are set. This may lead to unexpected behavior.")), y2.createElement(h, {
    flexDirection: "column",
    marginLeft: 3
  }, y2.createElement(P, {
    color: "warning"
  }, "• Trying to use", " ", Z.source === "claude.ai" ? "claude.ai" : Z.source, "?", " ", I === "ANTHROPIC_API_KEY" ? 'Unset the ANTHROPIC_API_KEY environment variable, or claude /logout then say "No" to the API key approval before login.' : I === "apiKeyHelper" ? "Unset the apiKeyHelper setting." : "claude /logout"), y2.createElement(P, {
    color: "warning"
  }, "• Trying to use ", I, "?", " ", Z.source === "claude.ai" ? "claude /logout to sign out of claude.ai." : `Unset the ${Z.source} environment variable.`))), B && y2.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, y2.createElement(P, {
    color: "secondaryText"
  }, "What's new:"), y2.createElement(h, {
    flexDirection: "column",
    marginLeft: 1
  }, Q.map((W, J) => y2.createElement(P, {
    key: J,
    color: "secondaryText"
  }, "• ", W)))))
}
// @from(Start 10085000, End 10085492)
function D$5({
  path: A,
  contentLength: B
}) {
  let Q = A.startsWith(dA()) ? G$5(dA(), A) : A;
  return y2.createElement(h, {
    flexDirection: "row"
  }, y2.createElement(P, {
    color: "warning"
  }, A0.warning), y2.createElement(P, {
    color: "warning"
  }, "Large ", y2.createElement(P, {
    bold: !0
  }, Q), " will impact performance (", _G(B), " chars >", " ", _G(k11), ")", y2.createElement(P, {
    color: "secondaryText",
    dimColor: !0
  }, " ", "• /memory to edit")))
}
// @from(Start 10085494, End 10085945)
function Y$5() {
  let A = lO();
  if (!A) return null;
  let B = A.content.length;
  if (B > Uu) return y2.createElement(h, {
    flexDirection: "row",
    gap: 1
  }, y2.createElement(P, {
    color: "warning"
  }, A0.warning), y2.createElement(P, {
    color: "warning"
  }, "ULTRACLAUDE.md exceeds ", Uu, " chars (", B, " chars)", y2.createElement(P, {
    color: "secondaryText",
    dimColor: !0
  }, " ", "• /memory to edit")));
  return null
}
// @from(Start 10085947, End 10086215)
function W$5() {
  if (dG().length === 0) return null;
  return y2.createElement(h, {
    flexDirection: "column"
  }, NH1().map((B) => y2.createElement(D$5, {
    key: B.path,
    path: B.path,
    contentLength: B.content.length
  })), y2.createElement(Y$5, null))
}
// @from(Start 10086220, End 10086236)
zT = I1(U1(), 1)
// @from(Start 10086239, End 10086289)
function ej2() {
  return ZA().tipsHistory || {}
}
// @from(Start 10086291, End 10086367)
function J$5(A) {
  let B = ZA();
  j0({
    ...B,
    tipsHistory: A
  })
}
// @from(Start 10086369, End 10086450)
function Ay2(A) {
  let B = ej2(),
    Q = ZA().numStartups;
  B[A] = Q, J$5(B)
}
// @from(Start 10086452, End 10086494)
function F$5(A) {
  return ej2()[A] || 0
}
// @from(Start 10086496, End 10086592)
function E2A(A) {
  let B = F$5(A);
  if (B === 0) return 1 / 0;
  return ZA().numStartups - B
}
// @from(Start 10086593, End 10086807)
async function V$5(A) {
  return (await Promise.all(A.map(async (Q) => {
    let I = await Q.isRelevant();
    return {
      tip: Q,
      isRelevant: I
    }
  }))).filter((Q) => Q.isRelevant).map((Q) => Q.tip)
}
// @from(Start 10086809, End 10086903)
function C$5(A) {
  return A.filter((B) => {
    return E2A(B.id) >= B.cooldownSessions
  })
}
// @from(Start 10086905, End 10087019)
function K$5() {
  let A = ZA(),
    {
      hasReleaseNotes: B
    } = yw1(A.lastReleaseNotesSeen);
  return !B
}
// @from(Start 10087021, End 10087236)
function H$5(A) {
  if (A.length === 0) return;
  if (A.length === 1) return A[0];
  let B = A.map((Q) => ({
    tip: Q,
    sessions: E2A(Q.id)
  }));
  return B.sort((Q, I) => I.sessions - Q.sessions), B[0]?.tip
}
// @from(Start 10087237, End 10087459)
async function By2(A, B = !1) {
  if (!K$5() || B) return;
  let Q = await V$5(A),
    I = C$5(Q);
  if (I.length === 0) return;
  let G = I.find((Z) => Z.id === "claude-opus-welcome");
  if (G) return G;
  return H$5(I)
}
// @from(Start 10087461, End 10087586)
function Qy2(A) {
  Ay2(A.id), E1("tengu_tip_shown", {
    tipIdLength: A.id,
    cooldownSessions: A.cooldownSessions
  })
}
// @from(Start 10087588, End 10088242)
function Iy2({
  tip: A
}) {
  zT.useEffect(() => {
    if (!A) return;
    Qy2(A)
  }, [A]);
  let B = () => {
    if (!A) return null;
    if (typeof A.content === "function") return A.content();
    if (A.id === "claude-opus-welcome") return zT.default.createElement(P, {
      color: "secondaryText"
    }, "※ ", A.content);
    return zT.default.createElement(P, {
      color: "secondaryText"
    }, "※ Tip: ", A.content)
  };
  return zT.default.createElement(zT.default.Fragment, null, A && zT.default.createElement(h, {
    key: `tip-${A?.id}`,
    flexDirection: "row",
    marginTop: 1,
    alignItems: "center",
    marginLeft: 1
  }, B()))
}
// @from(Start 10088247, End 10088263)
$V = I1(U1(), 1)
// @from(Start 10088265, End 10088438)
async function z$5() {
  if (T9()) return !1;
  let A = await fmA(!1);
  if (!A) return !1;
  return Boolean(A.account.has_claude_max) || Boolean(A.account.has_claude_pro)
}
// @from(Start 10088440, End 10088978)
function Gy2() {
  let [A] = $V.useState(() => {
    let B = ZA(),
      Q = B.subscriptionNoticeCount ?? 0,
      I = B.hasAvailableSubscription;
    if (Q >= 3) return !1;
    return I ?? !1
  });
  return $V.useEffect(() => {
    z$5().then((B) => {
      let Q = ZA(),
        I = Q.subscriptionNoticeCount ?? 0;
      if (B) I += 1;
      if (Q.subscriptionNoticeCount !== I || Q.hasAvailableSubscription !== B) j0({
        ...Q,
        subscriptionNoticeCount: I,
        hasAvailableSubscription: B
      })
    })
  }, [A]), A
}
// @from(Start 10088980, End 10089378)
function Zy2() {
  return $V.useEffect(() => {
    E1("tengu_switch_to_subscription_notice_shown", {})
  }, []), $V.createElement(h, {
    paddingLeft: 1,
    marginTop: 1,
    marginBottom: 1
  }, $V.createElement(P, {
    color: "suggestion"
  }, "You can now use your Claude subscription with ", m0, $V.createElement(P, {
    color: "text",
    dimColor: !0
  }, " ", "• /login to activate")))
}
// @from(Start 10089383, End 10089400)
U2A = I1(U1(), 1)
// @from(Start 10089403, End 10089824)
function Dy2({
  message: A,
  isTranscriptMode: B
}) {
  if (!(B && A.timestamp && A.type === "assistant" && A.message.content.some((G) => G.type === "text"))) return null;
  let I = new Date(A.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !1
  });
  return U2A.default.createElement(h, {
    marginTop: 1
  }, U2A.default.createElement(P, {
    dimColor: !0
  }, I))
}
// @from(Start 10089829, End 10089837)
Y01 = 10
// @from(Start 10089840, End 10095541)
function N2A({
  messages: A,
  normalizedMessageHistory: B,
  tools: Q,
  verbose: I,
  toolJSX: G,
  toolUseConfirmQueue: Z,
  inProgressToolUseIDs: D,
  isMessageSelectorVisible: Y,
  tipOfTheDay: W,
  conversationId: J,
  screen: F,
  screenToggleId: X,
  streamingToolUses: V,
  showAllInTranscript: C = !1
}) {
  let K = Cp(),
    {
      columns: E
    } = c9(),
    N = Gy2(),
    q = FE2(),
    [O, R] = s2.useState([]);
  s2.useEffect(() => {
    Jp().then((s) => R(s))
  }, []);
  let T = wT.useMemo(() => AQ(A).filter(Vy), [A]),
    L = wT.useMemo(() => new Set(Object.keys(Fu(T))), [T]),
    _ = wT.useMemo(() => eK1(T), [T]),
    k = wT.useMemo(() => V.filter((s) => {
      if (D.has(s.contentBlock.id)) return !1;
      if (T.some((d) => d.type === "assistant" && d.message.content[0].type === "tool_use" && d.message.content[0].id === s.contentBlock.id)) return !1;
      return !0
    }), [V, D, T]),
    i = wT.useMemo(() => k.flatMap((s) => AQ([xK({
      content: [s.contentBlock]
    })])), [k]),
    x = wT.useCallback((s) => {
      let d = F === "transcript",
        F1 = d && !C,
        X1 = F1 ? T.slice(-Y01) : T,
        v = F1 && T.length > Y01;
      return [{
        type: "static",
        jsx: s2.createElement(h, {
          flexDirection: "column",
          gap: 1,
          key: `logo-${J}-${X}`
        }, s2.createElement(Vp, {
          model: K
        }), rz1() ? s2.createElement(aAA, null) : s2.createElement(tj2, null))
      }, ...!yY(process.env.IS_DEMO) && W ? [{
        type: "static",
        jsx: s2.createElement(h, {
          key: `tip-of-the-day-${J}-${X}`
        }, s2.createElement(Iy2, {
          tip: W
        }))
      }] : [], ...N ? [{
        type: "static",
        jsx: s2.createElement(h, {
          key: `max-subscription-${J}-${X}`
        }, s2.createElement(Zy2, null))
      }] : [], ...q && !N ? [{
        type: "static",
        jsx: s2.createElement(h, {
          key: `subscription-upsell-${J}-${X}`
        }, s2.createElement(XE2, null))
      }] : [], ...O.length > 0 ? [{
        type: "static",
        jsx: s2.createElement(h, {
          key: `install-messages-${J}-${X}`,
          flexDirection: "column",
          paddingLeft: 1
        }, O.map((D1, N1) => s2.createElement(h, {
          key: N1,
          flexDirection: "row",
          marginTop: 1
        }, s2.createElement(P, {
          color: "warning"
        }, A0.bullet), s2.createElement(P, {
          color: "warning"
        }, " ", D1))))
      }] : [], ...v ? [{
        type: "static",
        jsx: s2.createElement($p, {
          key: `truncation-indicator-${J}-${X}`,
          dividerChar: "─",
          title: `Ctrl+E to show ${UA.bold(T.length-Y01)} previous messages`,
          titleColor: "secondaryText",
          dividerColor: "secondaryBorder",
          width: E
        })
      }] : [], ...d && C && T.length > Y01 ? [{
        type: "static",
        jsx: s2.createElement($p, {
          key: `hide-indicator-${J}-${X}`,
          dividerChar: "─",
          title: `Ctrl+E to hide ${UA.bold(T.length-Y01)} previous messages`,
          titleColor: "secondaryText",
          dividerColor: "secondaryBorder",
          width: E
        })
      }] : [], ...B.length > 0 ? [{
        type: "static",
        jsx: s2.createElement(h, {
          flexDirection: "column",
          gap: 1,
          key: `history-${J}-${X}`
        }, _t1(B.filter((D1) => D1.type !== "progress").filter((D1) => D1.type !== "user" || !D1.isMeta), []).map((D1) => s2.createElement(h, {
          key: `history-${D1.uuid}-${X}`,
          width: E - 5
        }, s2.createElement(wE, {
          message: D1,
          messages: B,
          addMargin: !0,
          tools: Q,
          verbose: s,
          erroredToolUseIDs: new Set,
          inProgressToolUseIDs: new Set,
          progressMessagesForMessage: [],
          shouldAnimate: !1,
          shouldShowDot: !0,
          resolvedToolUseIDs: new Set
        }))), s2.createElement($p, {
          dividerChar: "=",
          title: "Previous Conversation Compacted"
        }))
      }] : [], ..._t1(X1.filter((D1) => D1.type !== "progress").filter((D1) => D1.type !== "user" || !D1.isMeta), i).map((D1) => {
        let N1 = M11(D1),
          u1 = bw2(D1, T),
          d1 = D1.type === "user" && D1.isCompactSummary ? s2.createElement(oj2, {
            message: D1,
            screen: F
          }) : s2.createElement(wE, {
            message: D1,
            messages: T,
            addMargin: !0,
            tools: Q,
            verbose: s,
            erroredToolUseIDs: _,
            inProgressToolUseIDs: D,
            progressMessagesForMessage: u1,
            shouldAnimate: !G && !Z.length && !Y && (!N1 || D.has(N1)),
            shouldShowDot: !0,
            resolvedToolUseIDs: L
          });
        return {
          type: w$5(D1, A, new Set(V.map((YA) => YA.contentBlock.id)), L, F) ? "static" : "transient",
          jsx: s2.createElement(h, {
            key: `${D1.uuid}-${u1.length}-${X}`,
            width: E - 5,
            flexDirection: "column"
          }, s2.createElement(Dy2, {
            message: D1,
            isTranscriptMode: d
          }), d1)
        }
      }).filter((D1) => D1 !== void 0), ...hE2() ? [{
        type: "static",
        jsx: s2.createElement(dE2, null)
      }] : []]
    }, [F, C, T, J, X, K, W, N, q, O, E, B, i, Q, _, D, G, Z.length, Y, L, A, V]);
  return s2.createElement(s2.Fragment, null, s2.createElement($31, {
    key: `static-messages-${J}-${X}`,
    items: x(I).filter((s) => s.type === "static")
  }, (s) => s.jsx), x(I).filter((s) => s.type === "transient").map((s) => s.jsx))
}
// @from(Start 10095543, End 10095904)
function w$5(A, B, Q, I, G) {
  if (G === "transcript") return !0;
  switch (A.type) {
    case "attachment":
      return !0;
    case "system":
    case "user":
    case "assistant": {
      let Z = M11(A);
      if (!Z) return !0;
      if (Q.has(Z)) return !1;
      let D = xw2(A, B);
      return Gr0(D, I)
    }
    case "progress":
      return !1
  }
}
// @from(Start 10095952, End 10096322)
function Yy2(A, B, Q, I, G) {
  Z0(async (Z, D) => {
    if (D.ctrl && Z === "r") B((Y) => Y === "transcript" ? "prompt" : "transcript"), Q((Y) => Y + 1), I(!1), await G();
    if (D.ctrl && Z === "e" && A === "transcript") I((Y) => !Y), Q((Y) => Y + 1), await G();
    if (D.ctrl && Z === "c" && A === "transcript") B("prompt"), Q((Y) => Y + 1), I(!1), await G()
  })
}
// @from(Start 10096327, End 10096344)
W01 = I1(U1(), 1)
// @from(Start 10096350, End 10096739)
E$5 = n.object({
  method: n.literal("selection_changed"),
  params: n.object({
    selection: n.object({
      start: n.object({
        line: n.number(),
        character: n.number()
      }),
      end: n.object({
        line: n.number(),
        character: n.number()
      })
    }).nullable().optional(),
    text: n.string().optional(),
    filePath: n.string().optional()
  })
})