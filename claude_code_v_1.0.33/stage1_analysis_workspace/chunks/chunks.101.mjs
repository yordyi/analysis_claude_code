
// @from(Start 10096742, End 10097845)
function Wy2(A, B) {
  let Q = W01.useRef(!1),
    I = W01.useRef(null);
  W01.useEffect(() => {
    let G = IW(A);
    if (I.current !== G) Q.current = !1, I.current = G || null, B({
      lineCount: 0,
      text: void 0,
      filePath: void 0
    });
    if (Q.current || !G) return;
    let Z = (D) => {
      if (D.selection?.start && D.selection?.end) {
        let {
          start: Y,
          end: W
        } = D.selection, J = W.line - Y.line + 1;
        if (W.character === 0) J--;
        let F = {
          lineCount: J,
          text: D.text,
          filePath: D.filePath
        };
        B(F)
      }
    };
    G.client.setNotificationHandler(E$5, (D) => {
      if (I.current !== G) return;
      try {
        let Y = D.params;
        if (Y.selection && Y.selection.start && Y.selection.end) Z(Y);
        else if (Y.text !== void 0) Z({
          selection: null,
          text: Y.text,
          filePath: Y.filePath
        })
      } catch (Y) {
        console.error("Error processing selection_changed notification:", Y)
      }
    }), Q.current = !0
  }, [A, B])
}
// @from(Start 10097850, End 10097859)
Pp = tz()
// @from(Start 10097862, End 10097890)
function AE1(A) {
  Pp = A
}
// @from(Start 10097892, End 10098158)
function U$5(A, B, Q) {
  if (Q.type !== "assistant") return;
  if (!Array.isArray(Q.message.content)) return;
  for (let I of Q.message.content) {
    if (I.type !== "tool_use") continue;
    let G = A.find((Z) => Z.name === I.name);
    if (G) B.set(I.id, G)
  }
}
// @from(Start 10098160, End 10098400)
function BE1(A, B) {
  try {
    let Q = fw2(A);
    if (Q[Q.length - 1]?.type === "user") Q.push(xK({
      content: $11
    }));
    let G = new Map;
    for (let Z of Q) U$5(B, G, Z);
    return Q
  } catch (Q) {
    throw b1(Q), Q
  }
}
// @from(Start 10098401, End 10098697)
async function ET(A, B) {
  try {
    let Q;
    if (A === void 0) Q = await $Z0(0);
    else if (typeof A === "string") Q = await NZ0(A);
    else Q = A;
    if (!Q) return null;
    return WJ1(Q), {
      messages: BE1(Q.messages, B),
      log: Q
    }
  } catch (Q) {
    throw b1(Q), Q
  }
}
// @from(Start 10098702, End 10098718)
Sp = I1(U1(), 1)
// @from(Start 10098721, End 10098961)
function Jy2() {
  let [A, B] = Sp.useState([]), Q = Sp.useRef([]), I = Sp.useCallback((G) => {
    Q.current = G(Q.current), B(Q.current)
  }, [B]);
  return {
    queuedCommands: A,
    queuedCommandsRef: Q,
    setQueuedCommands: I
  }
}
// @from(Start 10098963, End 10112321)
function _p({
  commands: A,
  debug: B,
  initialPrompt: Q,
  shouldShowPromptInput: I,
  initialTools: G,
  initialMessages: Z,
  initialTodos: D,
  tipOfTheDay: Y,
  mcpClients: W,
  dynamicMcpConfig: J
}) {
  let [F, X] = d5(), {
    todoFeatureEnabled: V,
    toolPermissionContext: C,
    verbose: K,
    mainLoopModel: E,
    maxRateLimitFallbackActive: N,
    mcp: q,
    rateLimitResetsAt: O
  } = F, R = Cp(), T = Hu(), L = _9.useMemo(() => CT(C, V), [C, V]), [_, k] = _9.useState(J), i = _9.useCallback((NA) => {
    k(NA)
  }, [k]), [x, s] = _9.useState("prompt"), [d, F1] = _9.useState(1), [X1, v] = _9.useState(!1), {
    notification: D1,
    addNotification: N1
  } = _U2();
  _q2(N1, _);
  let u1 = ij2(W, q.clients),
    d1 = aj2([...L, ...G], q.tools),
    YA = rj2(A, q.commands),
    [bA, e1] = _9.useState(null);
  yq2(q.clients), Wy2(q.clients, e1);
  let [k1, Q1] = _9.useState("responding"), [v1, L1] = _9.useState([]), [BA, HA] = _9.useState(null), [MA, t] = _9.useState(!1), [B1, W1] = _9.useState(null), [w1, P1] = _9.useState(null), [e, y1] = _9.useState([]), [O1, h1] = _9.useState(Z ?? []), [o1, QA] = _9.useState([]), [zA, Y0] = _9.useState(""), [fA, H0] = _9.useState("prompt"), {
    queuedCommands: k2,
    queuedCommandsRef: s0,
    setQueuedCommands: q2
  } = Jy2(), [h2, j9] = _9.useState({}), [w6, E0] = _9.useState(0), [g0, y0] = _9.useState(0), [T0, V0] = _9.useState(null), [N2, h9] = _9.useState(!1), [z5, W3] = _9.useState(!1), [Z6, r2] = _9.useState($2A()), [v6, J3] = _9.useState(ZA().hasAcknowledgedCostThreshold), [uQ, x0] = _9.useState(new Set), [d0, L9] = _9.useState("INSERT"), {
    haikuWords: w5,
    generateHaikuWord: _B
  } = $S2(MA), [D6, F3] = _9.useState(null), [X3, q7] = _9.useState(!1);
  _9.useEffect(() => {
    function NA(SA) {
      if (!KK() || !SA) return;
      k((uA) => {
        if (uA?.ide) return uA;
        return {
          ...uA,
          ide: {
            type: SA.url.startsWith("ws:") ? "ws-ide" : "sse-ide",
            url: SA.url,
            ideName: SA.name,
            authToken: SA.authToken,
            scope: "dynamic"
          }
        }
      })
    }
    Re0(NA, () => q7(!0), (SA) => {
      F3(SA)
    })
  }, []), _9.useEffect(() => {
    if (O !== T.resetsAt) X((NA) => ({
      ...NA,
      rateLimitResetsAt: T.resetsAt
    }));
    if (xE2(N, O, T, (NA) => X((SA) => ({
        ...SA,
        maxRateLimitFallbackActive: NA
      }))), N && E === null) N1({
      text: `Claude Opus 4 limit reached, now using ${H_(wX())}`
    })
  }, [N1, N, E, O, T, X]);
  let V3 = _9.useCallback((NA) => {
      QA(NA), D3(), r2($2A())
    }, []),
    H2 = _9.useCallback(async (NA, SA) => {
      let uA = BE1(SA.messages, d1);
      WJ1(SA), t(!1), HA(null), y0(0), L1([]), V0(null), await D3(), r2(NA), h1(() => uA), P1(null), Y0(""), QA([])
    }, [d1]),
    w9 = (NA) => {
      if (Y0(NA), fA !== "prompt") return;
      if (!NA) return;
      if (w5.length > 0 && (!NA.endsWith(" ") || zA.endsWith(" "))) return;
      if (!NA.includes(" ")) return;
      if (NA.length >= 3 && !NA.startsWith("!") && !NA.startsWith("#") && !NA.startsWith("/")) _B(NA)
    },
    j5 = _9.useMemo(() => cR(y9()), []),
    j8 = _9.useRef({
      [j5]: {
        content: JSON.stringify(D || []),
        timestamp: 0
      }
    }),
    {
      status: y3,
      reverify: WQ
    } = dj2();

  function nI() {
    if (!MA) return;
    if (t(!1), y0(0), L1([]), V0(null), e[0]) e[0].onAbort(), y1([]);
    else BA?.abort()
  }
  let AD = _9.useCallback(() => {
    if (k2.length === 0) return;
    Y0([...k2.map((NA) => NA.value), zA].filter(Boolean).join(`
`)), H0("prompt"), q2(() => [])
  }, [k2, Y0, H0, q2, zA]);
  uj2(y1, nI, MA, N2, k2, BA?.signal, AD, d0), _9.useEffect(() => {
    if (KU() >= 5 && !z5 && !v6) {
      if (E1("tengu_cost_threshold_reached", {}), kG1() && !process.env.DISABLE_COST_WARNINGS) W3(!0)
    }
  }, [O1, z5, v6]);
  let aI = cj2(y1),
    pQ = _9.useCallback((NA) => {
      X((SA) => ({
        ...SA,
        toolPermissionContext: NA
      }))
    }, [X]),
    [BD] = q9(),
    cQ = _9.useCallback((NA, SA, uA, W2, c0) => {
      return {
        abortController: uA,
        options: {
          commands: YA,
          tools: d1,
          debug: B,
          verbose: K,
          mainLoopModel: R,
          maxThinkingTokens: s$(SA, c0),
          mcpClients: u1,
          mcpResources: q.resources,
          ideInstallationStatus: D6,
          isNonInteractiveSession: !1,
          dynamicMcpConfig: _,
          theme: BD
        },
        getToolPermissionContext() {
          if (!W2.length) return Pp;
          return {
            ...Pp,
            alwaysAllowRules: {
              ...Pp.alwaysAllowRules,
              command: W2
            }
          }
        },
        getQueuedCommands() {
          return s0.current
        },
        removeQueuedCommands(z2) {
          q2((V1) => V1.filter((c1) => !z2.includes(c1)))
        },
        messages: NA,
        setMessages: h1,
        setMessageHistory: V3,
        onChangeAPIKey: WQ,
        readFileState: j8.current,
        setToolJSX: P1,
        addNotification: N1,
        setToolPermissionContext: pQ,
        onChangeDynamicMcpConfig: i,
        nestedMemoryAttachmentTriggers: new Set,
        setResponseLength: y0,
        setStreamMode: Q1,
        setSpinnerMessage: V0,
        setInProgressToolUseIDs: x0,
        agentId: y9(),
        resume: H2
      }
    }, [YA, d1, B, K, R, u1, q.resources, D6, _, BD, V3, WQ, N1, pQ, i, H2, s0, q2]);
  async function rG() {
    WQ();
    let NA = dG();
    for (let z2 of NA) j8.current[z2.path] = {
      content: z2.content,
      timestamp: Date.now()
    };
    if (!Q) return;
    t(!0), y0(0), L1([]);
    let SA = new AbortController;
    HA(SA);
    let {
      messages: uA,
      shouldQuery: W2,
      allowedTools: c0
    } = await Tp(Q, "prompt", P1, cQ(O1, O1, SA, [], void 0), null, bA, void 0);
    if (uA.length) {
      for (let DA of uA)
        if (DA.type === "user") GT(Q);
      if (h1((DA) => [...DA, ...uA]), !W2) {
        HA(null), t(!1), y0(0), L1([]), V0(null);
        return
      }
      let [z2, V1, c1] = await Promise.all([yj(d1, R, Object.values(q.resources).flat(), Array.from(C.additionalWorkingDirectories)), qW(), RE()]), _1 = cQ([...O1, ...uA], uA, SA, [], void 0), t1 = c0 ? {
        ..._1,
        getToolPermissionContext() {
          let DA = Pp;
          return {
            ...DA,
            alwaysAllowRules: {
              ...DA.alwaysAllowRules,
              command: c0
            }
          }
        }
      } : _1;
      for await (let DA of nO([...O1, ...uA], z2, V1, c1, aI, t1)) jt1(DA, (IA) => {
        h1((xA) => [...xA, IA])
      }, (IA) => y0((xA) => xA + IA.length), Q1, L1)
    } else GT(Q);
    J3(ZA().hasAcknowledgedCostThreshold || !1), t(!1), y0(0), L1([]), V0(null)
  }
  async function zB(NA, SA, uA, W2, c0) {
    if (h1((DA) => [...DA, ...NA]), y0(0), L1([]), uA) {
      SK.handleQueryStart(u1);
      let DA = IW(u1);
      if (DA) Le0(DA)
    }
    ou();
    let z2 = NA[NA.length - 1];
    if (z2?.type === "user" && typeof z2.message.content === "string") pT2(z2.message.content);
    if (!uA) {
      HA(null), t(!1), V0(null);
      return
    }
    let V1 = cQ([...O1, ...NA], NA, SA, W2, c0),
      [c1, _1, t1] = await Promise.all([yj(d1, R, void 0, Array.from(C.additionalWorkingDirectories)), qW(), RE()]);
    for await (let DA of nO([...O1, ...NA], c1, _1, t1, aI, V1, void 0)) jt1(DA, (IA) => {
      h1((xA) => [...xA, IA])
    }, (IA) => y0((xA) => xA + IA.length), Q1, L1);
    t(!1), L1([]), y0(0), V0(null)
  }
  CE2(), Bq2(O1, O1.length === Z?.length), mj2(), _9.useEffect(() => {
    if (k2.length < 1) return;
    let NA = ZA();
    j0({
      ...NA,
      promptQueueUseCount: (NA.promptQueueUseCount ?? 0) + 1
    })
  }, [k2.length]);
  let e7 = !MA && z5;
  _9.useEffect(() => {
    Fc()
  }, [zA, w6]), _9.useEffect(() => {
    if (MA) return;
    if (w6 === 0) return;
    let NA = setTimeout(() => {
      let SA = Date.now() - V21();
      if (!MA && e.length === 0 && !w1 && !e7 && !N2 && SA >= ZA().messageIdleNotifThresholdMs) _u({
        message: "Claude is waiting for your input"
      })
    }, uq2());
    return () => clearTimeout(NA)
  }, [MA, e.length, w1, e7, N2, O1, w6]), _9.useEffect(() => {
    return rG(), () => {
      SK.shutdown()
    }
  }, []);
  let S1 = _9.useMemo(() => AQ(O1).filter(Vy), [O1]),
    T1 = _9.useMemo(() => AQ(o1).filter(Vy), [o1]),
    VA = _9.useMemo(() => new Set(Object.keys(Fu(S1))), [S1]),
    OA = _9.useMemo(() => eK1(S1), [S1]);
  Yy2(x, s, F1, v, D3);
  let [KA, PA] = _9.useState(null), [D0, lA] = _9.useState(!1);
  if (x === "transcript") return H6.createElement(H6.Fragment, null, H6.createElement(N2A, {
    messages: O1,
    normalizedMessageHistory: T1,
    tools: d1,
    verbose: !0,
    toolJSX: null,
    toolUseConfirmQueue: [],
    inProgressToolUseIDs: uQ,
    isMessageSelectorVisible: !1,
    tipOfTheDay: void 0,
    conversationId: Z6,
    screen: x,
    screenToggleId: d,
    streamingToolUses: v1,
    showAllInTranscript: X1
  }), H6.createElement(h, {
    alignItems: "center",
    alignSelf: "center",
    borderTopColor: "secondaryBorder",
    borderBottom: !1,
    borderLeft: !1,
    borderRight: !1,
    borderStyle: "single",
    marginTop: 1,
    paddingLeft: 2,
    width: "100%"
  }, H6.createElement(P, {
    dimColor: !0
  }, "Showing detailed transcript · Ctrl+R to toggle")));
  return H6.createElement(H6.Fragment, null, H6.createElement(N2A, {
    messages: O1,
    normalizedMessageHistory: T1,
    tools: d1,
    verbose: K,
    toolJSX: w1,
    toolUseConfirmQueue: e,
    inProgressToolUseIDs: uQ,
    isMessageSelectorVisible: N2,
    tipOfTheDay: Y,
    conversationId: Z6,
    screen: x,
    screenToggleId: d,
    streamingToolUses: v1,
    showAllInTranscript: X1
  }), H6.createElement(h, {
    flexDirection: "column",
    width: "100%"
  }, !w1 && e.length === 0 && MA && H6.createElement(vy, {
    mode: k1,
    haikuWords: w5,
    currentResponseLength: g0,
    overrideMessage: T0
  }), w1 ? w1.jsx : null, !w1 && e[0] !== void 0 && !N2 && H6.createElement(RO2, {
    onDone: () => y1(([NA, ...SA]) => SA),
    onReject: AD,
    setToolPermissionContext: pQ,
    toolUseConfirm: e[0],
    toolUseContext: cQ(O1, O1, BA ?? new AbortController, [], void 0),
    verbose: K
  }), !w1 && e.length === 0 && !N2 && e7 && H6.createElement(Ua0, {
    onDone: () => {
      W3(!1), J3(!0);
      let NA = ZA();
      j0({
        ...NA,
        hasAcknowledgedCostThreshold: !0
      }), E1("tengu_cost_threshold_acknowledged", {})
    }
  }), KA, X3 && H6.createElement(Je0, {
    onDone: () => q7(!1),
    installedVersion: D6?.installedVersion ?? null
  }), e.length === 0 && !w1?.shouldHidePromptInput && I && !N2 && !e7 && !KA && !X3 && !D0 && H6.createElement(H6.Fragment, null, H6.createElement(gj2, {
    debug: B,
    ideSelection: bA,
    getToolUseContext: cQ,
    toolPermissionContext: C,
    setToolPermissionContext: pQ,
    apiKeyStatus: y3,
    commands: YA,
    isLoading: MA,
    onExit: async () => {
      lA(!0);
      let NA = await pw1.call(() => qI(0), cQ(O1, [], new AbortController, [], void 0));
      PA(NA)
    },
    onQuery: zB,
    verbose: K,
    messages: O1,
    setToolJSX: P1,
    onAutoUpdaterResult: W1,
    autoUpdaterResult: B1,
    input: zA,
    onInputChange: w9,
    mode: fA,
    onModeChange: H0,
    queuedCommands: k2,
    setQueuedCommands: q2,
    submitCount: w6,
    onSubmitCountChange: (NA) => {
      return e1(null), E0(NA)
    },
    setIsLoading: t,
    setAbortController: HA,
    onShowMessageSelector: () => h9((NA) => !NA),
    notification: D1,
    addNotification: N1,
    mcpClients: u1,
    pastedContents: h2,
    setPastedContents: j9,
    vimMode: d0,
    setVimMode: L9,
    ideInstallationStatus: D6
  }))), N2 && H6.createElement(Pq2, {
    erroredToolUseIDs: OA,
    resolvedToolUseIDs: VA,
    messages: O1,
    onSelect: async (NA) => {
      if (h9(!1), !O1.includes(NA)) return;
      nI(), setImmediate(async () => {
        await D3();
        let SA = O1.indexOf(NA),
          uA = O1.slice(0, SA);
        if (h1([...uA]), r2($2A()), typeof NA.message.content === "string") {
          let W2 = mG(NA.message.content, "bash-input");
          if (W2) Y0(W2), H0("bash");
          else Y0(NA.message.content), H0("prompt")
        } else if (Array.isArray(NA.message.content) && NA.message.content.length >= 2 && NA.message.content.some((W2) => W2.type === "image") && NA.message.content.some((W2) => W2.type === "text")) {
          let W2 = NA.message.content.find((z2) => z2.type === "text");
          if (W2 && W2.type === "text") Y0(W2.text), H0("prompt");
          let c0 = NA.message.content.filter((z2) => z2.type === "image");
          if (c0.length > 0) {
            let z2 = {};
            c0.forEach((V1, c1) => {
              if (V1.source.type === "base64") z2[c1 + 1] = {
                id: c1 + 1,
                type: "image",
                content: V1.source.data,
                mediaType: V1.source.media_type
              }
            }), j9(z2)
          }
        }
      })
    },
    onEscape: () => h9(!1),
    tools: d1
  }), !X3 && H6.createElement(UI, null))
}
// @from(Start 10112623, End 10112639)
sG = I1(U1(), 1)
// @from(Start 10112642, End 10114666)
function Py2({
  servers: A,
  scope: B,
  onDone: Q
}) {
  let I = Object.keys(A),
    G = sG.useMemo(() => DV(), []),
    Z = I.filter((F) => G[F] !== void 0);

  function D(F) {
    let X = 0;
    for (let V of F) {
      let C = A[V];
      if (C) {
        let K = V;
        if (G[K] !== void 0) {
          let E = 1;
          while (G[`${V}_${E}`] !== void 0) E++;
          K = `${V}_${E}`
        }
        LO(K, C, B), X++
      }
    }
    J(X)
  }
  let Y = Y2();
  Z0((F, X) => {
    if (X.escape) {
      J(0);
      return
    }
  });
  let [W] = q9();

  function J(F) {
    if (F > 0) EC(`
${V9("success",W)(`Successfully imported ${F} MCP server${F!==1?"s":""} to ${B} config.`)}
`);
    else console.log(`
No servers were imported.`);
    Q(), qI()
  }
  return sG.default.createElement(sG.default.Fragment, null, sG.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: "success"
  }, sG.default.createElement(P, {
    bold: !0,
    color: "success"
  }, "Import MCP Servers from Claude Desktop"), sG.default.createElement(P, null, "Found ", I.length, " MCP server", I.length !== 1 ? "s" : "", " in Claude Desktop."), Z.length > 0 && sG.default.createElement(P, {
    color: "warning"
  }, "Note: Some servers already exist with the same name. If selected, they will be imported with a numbered suffix."), sG.default.createElement(P, null, "Please select the servers you want to import:"), sG.default.createElement(fG1, {
    options: I.map((F) => ({
      label: `${F}${Z.includes(F)?" (already exists)":""}`,
      value: F
    })),
    defaultValue: I.filter((F) => !Z.includes(F)),
    onSubmit: D
  })), sG.default.createElement(h, {
    marginLeft: 3
  }, sG.default.createElement(P, {
    dimColor: !0
  }, Y.pending ? sG.default.createElement(sG.default.Fragment, null, "Press ", Y.keyName, " again to exit") : sG.default.createElement(sG.default.Fragment, null, "Space to select · Enter to confirm · Esc to cancel"))))
}
// @from(Start 10114724, End 10115864)
function Wq5() {
  let A = Z7();
  if (!uS1.includes(A)) throw new Error(`Unsupported platform: ${A} - Claude Desktop integration only works on macOS and WSL.`);
  if (A === "macos") return _2A.join(Sy2.homedir(), "Library", "Application Support", "Claude", "claude_desktop_config.json");
  let B = process.env.USERPROFILE ? process.env.USERPROFILE.replace(/\\/g, "/") : null;
  if (B) {
    let I = `/mnt/c${B.replace(/^[A-Z]:/,"")}/AppData/Roaming/Claude/claude_desktop_config.json`;
    if (x1().existsSync(I)) return I
  }
  try {
    if (x1().existsSync("/mnt/c/Users")) {
      let I = x1().readdirSync("/mnt/c/Users");
      for (let G of I) {
        if (G.name === "Public" || G.name === "Default" || G.name === "Default User" || G.name === "All Users") continue;
        let Z = _2A.join("/mnt/c/Users", G.name, "AppData", "Roaming", "Claude", "claude_desktop_config.json");
        if (x1().existsSync(Z)) return Z
      }
    }
  } catch (Q) {
    b1(Q instanceof Error ? Q : new Error(String(Q)))
  }
  throw new Error("Could not find Claude Desktop config file in Windows. Make sure Claude Desktop is installed on Windows.")
}
// @from(Start 10115866, End 10116566)
function _y2() {
  if (!uS1.includes(Z7())) throw new Error("Unsupported platform - Claude Desktop integration only works on macOS and WSL.");
  try {
    let A = Wq5();
    if (!x1().existsSync(A)) return {};
    let B = x1().readFileSync(A, {
        encoding: "utf8"
      }),
      Q = Z8(B);
    if (!Q || typeof Q !== "object") return {};
    let I = Q.mcpServers;
    if (!I || typeof I !== "object") return {};
    let G = {};
    for (let [Z, D] of Object.entries(I)) {
      if (!D || typeof D !== "object") continue;
      let Y = Av1.safeParse(D);
      if (Y.success) G[Z] = Y.data
    }
    return G
  } catch (A) {
    return b1(A instanceof Error ? A : new Error(String(A))), {}
  }
}
// @from(Start 10116610, End 10116626)
q0 = I1(U1(), 1)
// @from(Start 10116667, End 10117090)
function IE1() {
  let A = x1(),
    B = dA(),
    Q = jy2(S4(), "projects", B.replace(/[^a-zA-Z0-9]/g, "-"));
  if (!A.existsSync(Q)) return !1;
  let G = A.readdirSync(Q).filter((D) => D.name.endsWith(".jsonl")).map((D) => jy2(Q, D.name));
  if (G.length === 0) return !1;
  let Z = new Date("2025-05-12");
  for (let D of G) try {
    if (A.statSync(D).birthtime < Z) return !0
  } catch {
    continue
  }
  return !1
}
// @from(Start 10117092, End 10117653)
function yy2({
  onDismiss: A
}) {
  let {
    columns: B
  } = c9();
  if (q0.default.useEffect(() => {
      E1("tengu_ga_announcement_shown", {})
    }, []), q0.default.useEffect(() => {
      let Q = () => {
        A()
      };
      return process.stdin.on("data", Q), () => {
        process.stdin.off("data", Q)
      }
    }, [A]), B < 50) return q0.default.createElement(Vq5, {
    onDismiss: A
  });
  else if (B < 84) return q0.default.createElement(Xq5, {
    onDismiss: A
  });
  else return q0.default.createElement(Jq5, {
    onDismiss: A
  })
}
// @from(Start 10117655, End 10120441)
function Jq5({
  onDismiss: A
}) {
  let {
    columns: B
  } = c9();
  return q0.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    width: B
  }, q0.default.createElement(h, {
    borderStyle: "round",
    borderColor: "claude",
    paddingLeft: 1,
    paddingRight: 1
  }, q0.default.createElement(y2A, null)), q0.default.createElement(h, null, q0.default.createElement(k2A, null)), q0.default.createElement(h, {
    gap: 1,
    flexDirection: "row"
  }, q0.default.createElement(h, {
    borderStyle: "round",
    borderColor: "secondaryBorder",
    flexDirection: "column",
    paddingLeft: 1,
    paddingRight: 1,
    flexGrow: 1,
    flexBasis: 0
  }, q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE CODE IN NUMBERS"), q0.default.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, q0.default.createElement(h, null, q0.default.createElement(P, null, "115 K ", q0.default.createElement(P, {
    color: "remember"
  }, "developers"))), q0.default.createElement(h, null, q0.default.createElement(P, null, "195 M "), q0.default.createElement(P, {
    color: "success"
  }, "lines of code changed last week")))), q0.default.createElement(h, {
    borderStyle: "round",
    borderColor: "secondaryBorder",
    flexDirection: "column",
    paddingLeft: 1,
    paddingRight: 1,
    flexGrow: 1,
    flexBasis: 0
  }, q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE CODE IN VIBES"), q0.default.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, q0.default.createElement(h, null, q0.default.createElement(P, null, "Billions of"), q0.default.createElement(P, {
    color: "claude"
  }, " reticulations")), q0.default.createElement(h, null, q0.default.createElement(P, null, "81% of devs "), q0.default.createElement(P, {
    color: "bashBorder"
  }, "auto-accepting"))))), q0.default.createElement(h, {
    borderStyle: "round",
    borderColor: "secondaryBorder",
    flexDirection: "column",
    paddingLeft: 1,
    paddingRight: 1
  }, q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE’S TOP TOOLS"), q0.default.createElement(h, {
    marginTop: 1
  }, q0.default.createElement(j2A, {
    stats: [{
      toolName: "Read",
      usesTx: "47.5M",
      usesN: 47500000
    }, {
      toolName: "Edit",
      usesTx: "39.3M",
      usesN: 39300000
    }, {
      toolName: "Bash",
      usesTx: "17.9M",
      usesN: 17900000
    }, {
      toolName: "Grep",
      usesTx: "14.7M",
      usesN: 14700000
    }, {
      toolName: "Write",
      usesTx: "6.8M",
      usesN: 6800000
    }],
    width: B - 3
  }))), q0.default.createElement(h, {
    marginTop: 1
  }, q0.default.createElement(P, {
    color: "remember"
  }, "Press Enter to continue")))
}
// @from(Start 10120443, End 10121027)
function j2A({
  stats: A,
  width: B
}) {
  let Q = Math.max(...A.map((D) => D.usesN)),
    G = Math.max(...A.map((D) => D.toolName.length)) + 5,
    Z = B - G - 2;
  return q0.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, A.map((D, Y) => {
    let W = " ".repeat(G - D.toolName.length),
      J = D.usesN / Q;
    return q0.default.createElement(h, {
      key: Y,
      flexDirection: "row"
    }, q0.default.createElement(P, null, D.toolName, ":", W, q0.default.createElement(Fq5, {
      width: Z,
      percent: J,
      text: D.usesTx
    })))
  }))
}
// @from(Start 10121029, End 10121427)
function Fq5({
  width: A,
  percent: B,
  text: Q
}) {
  let I = Math.ceil(A * B),
    G = A - I,
    Z = Math.max(0, I - Q.length - 1),
    D = " " + Q + " ".repeat(Z),
    Y = " ".repeat(Math.max(0, G));
  return q0.default.createElement(P, null, q0.default.createElement(P, {
    backgroundColor: "claude"
  }, D), q0.default.createElement(P, {
    backgroundColor: "secondaryBorder"
  }, Y))
}
// @from(Start 10121429, End 10124020)
function Xq5({
  onDismiss: A
}) {
  let {
    columns: B
  } = c9();
  return q0.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    width: B
  }, q0.default.createElement(h, {
    borderStyle: "round",
    borderColor: "claude",
    paddingLeft: 1,
    paddingRight: 1
  }, q0.default.createElement(y2A, null)), q0.default.createElement(h, null, q0.default.createElement(k2A, null)), q0.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, q0.default.createElement(h, {
    borderStyle: "round",
    borderColor: "secondaryBorder",
    flexDirection: "column",
    paddingLeft: 1,
    paddingRight: 1
  }, q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE CODE IN NUMBERS"), q0.default.createElement(h, {
    marginTop: 1
  }, q0.default.createElement(P, null, "115 K ", q0.default.createElement(P, {
    color: "remember"
  }, "developers"))), q0.default.createElement(h, null, q0.default.createElement(P, null, "195 M "), q0.default.createElement(P, {
    color: "success"
  }, "lines of code changed last week"))), q0.default.createElement(h, {
    borderStyle: "round",
    borderColor: "secondaryBorder",
    flexDirection: "column",
    paddingLeft: 1,
    paddingRight: 1
  }, q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE CODE IN VIBES"), q0.default.createElement(h, {
    marginTop: 1
  }, q0.default.createElement(P, null, "Billions of"), q0.default.createElement(P, {
    color: "claude"
  }, " reticulations")), q0.default.createElement(h, null, q0.default.createElement(P, null, "81% of devs "), q0.default.createElement(P, {
    color: "bashBorder"
  }, "auto-accepting"))), q0.default.createElement(h, {
    borderStyle: "round",
    borderColor: "secondaryBorder",
    flexDirection: "column",
    paddingLeft: 1,
    paddingRight: 1
  }, q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE’S TOP TOOLS"), q0.default.createElement(h, {
    marginTop: 1
  }, q0.default.createElement(j2A, {
    stats: [{
      toolName: "Read",
      usesTx: "47.5M",
      usesN: 47500000
    }, {
      toolName: "Edit",
      usesTx: "39.3M",
      usesN: 39300000
    }, {
      toolName: "Bash",
      usesTx: "17.9M",
      usesN: 17900000
    }, {
      toolName: "Grep",
      usesTx: "14.7M",
      usesN: 14700000
    }, {
      toolName: "Write",
      usesTx: "6.8M",
      usesN: 6800000
    }],
    width: B - 3
  })))), q0.default.createElement(h, {
    marginTop: 1
  }, q0.default.createElement(P, {
    color: "remember"
  }, "Press Enter to continue")))
}
// @from(Start 10124022, End 10125674)
function Vq5({
  onDismiss: A
}) {
  let {
    columns: B
  } = c9();
  return q0.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    width: B
  }, q0.default.createElement(y2A, null), q0.default.createElement(k2A, null), q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE CODE IN NUMBERS"), q0.default.createElement(P, null, "115 K ", q0.default.createElement(P, {
    color: "remember"
  }, "developers")), q0.default.createElement(P, null, "195 M ", q0.default.createElement(P, {
    color: "success"
  }, "lines of code changed last week")), q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE CODE IN VIBES"), q0.default.createElement(P, null, "Billions of ", q0.default.createElement(P, {
    color: "claude"
  }, "reticulations")), q0.default.createElement(P, null, "81% of devs ", q0.default.createElement(P, {
    color: "bashBorder"
  }, "auto-accepting")), q0.default.createElement(P, {
    bold: !0,
    color: "text"
  }, "CLAUDE’S TOP TOOLS"), q0.default.createElement(h, null, q0.default.createElement(j2A, {
    stats: [{
      toolName: "Read",
      usesTx: "47.5M",
      usesN: 47500000
    }, {
      toolName: "Edit",
      usesTx: "39.3M",
      usesN: 39300000
    }, {
      toolName: "Bash",
      usesTx: "17.9M",
      usesN: 17900000
    }, {
      toolName: "Grep",
      usesTx: "14.7M",
      usesN: 14700000
    }, {
      toolName: "Write",
      usesTx: "6.8M",
      usesN: 6800000
    }],
    width: B
  })), q0.default.createElement(h, {
    marginTop: 1
  }, q0.default.createElement(P, {
    color: "remember"
  }, "Press Enter to continue")))
}
// @from(Start 10125676, End 10125860)
function y2A() {
  return q0.default.createElement(P, null, q0.default.createElement(P, {
    color: "claude"
  }, "✻ "), q0.default.createElement(P, null, "Welcome to Claude Code"))
}
// @from(Start 10125862, End 10126184)
function k2A() {
  return q0.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, q0.default.createElement(P, null, "Claude Code is now generally available. Thank you for making it possible \uD83D\uDE4F"), q0.default.createElement(P, null, "Here's a glimpse at all of the community's contributions:"))
}
// @from(Start 10126189, End 10126205)
lI = I1(U1(), 1)
// @from(Start 10126247, End 10128970)
function xy2({
  onDone: A
}) {
  let B = vC(),
    Q = Object.keys(B).length > 0;
  lI.default.useEffect(() => {
    let Z = ky2() === dA();
    E1("trust_dialog_shown", {
      isHomeDir: Z,
      hasMcpServers: Q
    })
  }, [Q]);

  function I(Z) {
    let D = m9();
    if (Z === "no") {
      MI(1);
      return
    }
    let Y = Z === "yes_enable_mcp",
      W = ky2() === dA();
    if (E1("trust_dialog_accept", {
        isHomeDir: W,
        hasMcpServers: Q,
        enableMcp: Y
      }), Q) {
      if (Y) qB("localSettings", {
        enabledMcpjsonServers: Object.keys(B),
        enableAllProjectMcpServers: !0
      });
      else qB("localSettings", {
        disabledMcpjsonServers: Object.keys(B)
      });
      if (!W) B5({
        ...D,
        hasTrustDialogAccepted: !0
      })
    } else if (!W) B5({
      ...D,
      hasTrustDialogAccepted: !0
    });
    A()
  }
  let G = Y2();
  return Z0((Z, D) => {
    if (D.escape) {
      MI(0);
      return
    }
  }), lI.default.createElement(lI.default.Fragment, null, lI.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: "warning"
  }, lI.default.createElement(P, {
    bold: !0,
    color: "warning"
  }, "Do you trust the files in this folder?"), lI.default.createElement(P, {
    bold: !0
  }, x1().cwd()), lI.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, lI.default.createElement(P, null, m0, " may read files in this folder. Reading untrusted files may lead ", m0, " to behave in unexpected ways."), lI.default.createElement(P, null, "With your permission ", m0, " may execute files in this folder.", Q && " This project also contains MCP servers defined in .mcp.json that can execute code on your machine if enabled.", " ", "Executing untrusted code is unsafe."), lI.default.createElement(kQ, {
    url: "https://docs.anthropic.com/s/claude-code-security"
  })), lI.default.createElement(p0, {
    options: Q ? [{
      label: "Yes, proceed with MCP servers enabled",
      value: "yes_enable_mcp"
    }, {
      label: "Yes, proceed with MCP servers disabled",
      value: "yes_disable_mcp"
    }, {
      label: "No, exit",
      value: "no"
    }] : [{
      label: "Yes, proceed",
      value: "yes_enable_mcp"
    }, {
      label: "No, exit",
      value: "no"
    }],
    onChange: (Z) => I(Z),
    onCancel: () => I("no")
  })), lI.default.createElement(h, {
    marginLeft: 3
  }, lI.default.createElement(P, {
    dimColor: !0
  }, G.pending ? lI.default.createElement(lI.default.Fragment, null, "Press ", G.keyName, " again to exit") : lI.default.createElement(lI.default.Fragment, null, "Enter to confirm · Esc to exit"))))
}
// @from(Start 10128975, End 10128992)
x2A = I1(U1(), 1)
// @from(Start 10128998, End 10129015)
GE1 = I1(U1(), 1)
// @from(Start 10129018, End 10130107)
function fy2({
  context: A,
  commands: B,
  logs: Q,
  initialTools: I,
  mcpClients: G,
  dynamicMcpConfig: Z,
  appState: D,
  onChangeAppState: Y,
  debug: W
}) {
  let {
    rows: J
  } = c9(), F = Q.filter((C) => !C.isSidechain);
  Y2();

  function X() {
    process.exit(1)
  }
  async function V(C) {
    let K = Q[C];
    if (!K) return;
    try {
      A.unmount?.();
      let E = await ET(K, I);
      if (!E) throw new Error("Failed to load conversation");
      let N = jJ(y9());
      await D3(), n5(GE1.default.createElement(c3, {
        initialState: D,
        onChangeAppState: Y
      }, GE1.default.createElement(_p, {
        initialPrompt: "",
        debug: W,
        shouldShowPromptInput: !0,
        commands: B,
        initialTools: I,
        initialMessages: E.messages,
        initialTodos: N,
        mcpClients: G,
        dynamicMcpConfig: Z
      })), {
        exitOnCtrlC: !1
      })
    } catch (E) {
      throw b1(E), E
    }
  }
  return GE1.default.createElement(rA1, {
    logs: F,
    maxHeight: J,
    onCancel: X,
    onSelect: V
  })
}
// @from(Start 10130108, End 10134884)
class f2A extends wt {
  constructor(A, B) {
    var Q;
    super(B);
    this._serverInfo = A, this._capabilities = (Q = B === null || B === void 0 ? void 0 : B.capabilities) !== null && Q !== void 0 ? Q : {}, this._instructions = B === null || B === void 0 ? void 0 : B.instructions, this.setRequestHandler(Kl1, (I) => this._oninitialize(I)), this.setNotificationHandler(sJ1, () => {
      var I;
      return (I = this.oninitialized) === null || I === void 0 ? void 0 : I.call(this)
    })
  }
  registerCapabilities(A) {
    if (this.transport) throw new Error("Cannot register capabilities after connecting to transport");
    this._capabilities = IF1(this._capabilities, A)
  }
  assertCapabilityForMethod(A) {
    var B, Q;
    switch (A) {
      case "sampling/createMessage":
        if (!((B = this._clientCapabilities) === null || B === void 0 ? void 0 : B.sampling)) throw new Error(`Client does not support sampling (required for ${A})`);
        break;
      case "roots/list":
        if (!((Q = this._clientCapabilities) === null || Q === void 0 ? void 0 : Q.roots)) throw new Error(`Client does not support listing roots (required for ${A})`);
        break;
      case "ping":
        break
    }
  }
  assertNotificationCapability(A) {
    switch (A) {
      case "notifications/message":
        if (!this._capabilities.logging) throw new Error(`Server does not support logging (required for ${A})`);
        break;
      case "notifications/resources/updated":
      case "notifications/resources/list_changed":
        if (!this._capabilities.resources) throw new Error(`Server does not support notifying about resources (required for ${A})`);
        break;
      case "notifications/tools/list_changed":
        if (!this._capabilities.tools) throw new Error(`Server does not support notifying of tool list changes (required for ${A})`);
        break;
      case "notifications/prompts/list_changed":
        if (!this._capabilities.prompts) throw new Error(`Server does not support notifying of prompt list changes (required for ${A})`);
        break;
      case "notifications/cancelled":
        break;
      case "notifications/progress":
        break
    }
  }
  assertRequestHandlerCapability(A) {
    switch (A) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling) throw new Error(`Server does not support sampling (required for ${A})`);
        break;
      case "logging/setLevel":
        if (!this._capabilities.logging) throw new Error(`Server does not support logging (required for ${A})`);
        break;
      case "prompts/get":
      case "prompts/list":
        if (!this._capabilities.prompts) throw new Error(`Server does not support prompts (required for ${A})`);
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
        if (!this._capabilities.resources) throw new Error(`Server does not support resources (required for ${A})`);
        break;
      case "tools/call":
      case "tools/list":
        if (!this._capabilities.tools) throw new Error(`Server does not support tools (required for ${A})`);
        break;
      case "ping":
      case "initialize":
        break
    }
  }
  async _oninitialize(A) {
    let B = A.params.protocolVersion;
    return this._clientCapabilities = A.params.capabilities, this._clientVersion = A.params.clientInfo, {
      protocolVersion: cJ1.includes(B) ? B : xj,
      capabilities: this.getCapabilities(),
      serverInfo: this._serverInfo,
      ...this._instructions && {
        instructions: this._instructions
      }
    }
  }
  getClientCapabilities() {
    return this._clientCapabilities
  }
  getClientVersion() {
    return this._clientVersion
  }
  getCapabilities() {
    return this._capabilities
  }
  async ping() {
    return this.request({
      method: "ping"
    }, G$)
  }
  async createMessage(A, B) {
    return this.request({
      method: "sampling/createMessage",
      params: A
    }, Nl1, B)
  }
  async listRoots(A, B) {
    return this.request({
      method: "roots/list",
      params: A
    }, Ml1, B)
  }
  async sendLoggingMessage(A) {
    return this.notification({
      method: "notifications/message",
      params: A
    })
  }
  async sendResourceUpdated(A) {
    return this.notification({
      method: "notifications/resources/updated",
      params: A
    })
  }
  async sendResourceListChanged() {
    return this.notification({
      method: "notifications/resources/list_changed"
    })
  }
  async sendToolListChanged() {
    return this.notification({
      method: "notifications/tools/list_changed"
    })
  }
  async sendPromptListChanged() {
    return this.notification({
      method: "notifications/prompts/list_changed"
    })
  }
}
// @from(Start 10134917, End 10136277)
class v2A {
  constructor(A = vy2.stdin, B = vy2.stdout) {
    this._stdin = A, this._stdout = B, this._readBuffer = new Et, this._started = !1, this._ondata = (Q) => {
      this._readBuffer.append(Q), this.processReadBuffer()
    }, this._onerror = (Q) => {
      var I;
      (I = this.onerror) === null || I === void 0 || I.call(this, Q)
    }
  }
  async start() {
    if (this._started) throw new Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");
    this._started = !0, this._stdin.on("data", this._ondata), this._stdin.on("error", this._onerror)
  }
  processReadBuffer() {
    var A, B;
    while (!0) try {
      let Q = this._readBuffer.readMessage();
      if (Q === null) break;
      (A = this.onmessage) === null || A === void 0 || A.call(this, Q)
    } catch (Q) {
      (B = this.onerror) === null || B === void 0 || B.call(this, Q)
    }
  }
  async close() {
    var A;
    if (this._stdin.off("data", this._ondata), this._stdin.off("error", this._onerror), this._stdin.listenerCount("data") === 0) this._stdin.pause();
    this._readBuffer.clear(), (A = this.onclose) === null || A === void 0 || A.call(this)
  }
  send(A) {
    return new Promise((B) => {
      let Q = ZF1(A);
      if (this._stdout.write(Q)) B();
      else this._stdout.once("drain", B)
    })
  }
}
// @from(Start 10136282, End 10136315)
by2 = {
    readFileState: {}
  }
// @from(Start 10136319, End 10136330)
gy2 = [kw1]
// @from(Start 10136332, End 10139665)
async function hy2(A, B, Q) {
  if (!process.env.CLAUDE_CODE_ENTRYPOINT) process.env.CLAUDE_CODE_ENTRYPOINT = "mcp";
  EX(A);
  let I = new f2A({
    name: "claude/tengu",
    version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION
  }, {
    capabilities: {
      tools: {}
    }
  });
  I.setRequestHandler(El1, async () => {
    let Z = tz(),
      D = CT(Z, ZA().todoFeatureEnabled);
    return {
      tools: await Promise.all(D.map(async (Y) => ({
        ...Y,
        description: await Y.description({}, {
          isNonInteractiveSession: !0,
          getToolPermissionContext: () => Z,
          tools: D
        }),
        inputSchema: Nm(Y.inputSchema)
      })))
    }
  }), I.setRequestHandler(Ul1, async ({
    params: {
      name: Z,
      arguments: D
    }
  }) => {
    let Y = CT(tz(), ZA().todoFeatureEnabled),
      W = Y.find((J) => J.name === Z);
    if (!W) throw new Error(`Tool ${Z} not found`);
    try {
      if (!W.isEnabled()) throw new Error(`Tool ${Z} is not enabled`);
      let J = J7(),
        F = await W.validateInput?.(D ?? {}, {
          abortController: new AbortController,
          options: {
            commands: gy2,
            tools: Y,
            mainLoopModel: J,
            maxThinkingTokens: 0,
            mcpClients: [],
            mcpResources: {},
            isNonInteractiveSession: !0,
            debug: B,
            verbose: Q
          },
          getQueuedCommands: () => [],
          getToolPermissionContext: tz,
          removeQueuedCommands: () => {},
          readFileState: by2.readFileState,
          setInProgressToolUseIDs: () => {},
          agentId: y9()
        });
      if (F && !F.result) throw new Error(`Tool ${Z} input is invalid: ${F.message}`);
      let X = W.call(D ?? {}, {
          abortController: new AbortController,
          options: {
            commands: gy2,
            tools: Y,
            mainLoopModel: J7(),
            maxThinkingTokens: 0,
            mcpClients: [],
            mcpResources: {},
            isNonInteractiveSession: !0,
            debug: B,
            verbose: Q
          },
          getQueuedCommands: () => [],
          getToolPermissionContext: tz,
          removeQueuedCommands: () => {},
          readFileState: by2.readFileState,
          setInProgressToolUseIDs: () => {},
          agentId: y9()
        }, sM, xK({
          content: []
        })),
        V = await aJ(X);
      if (V.type !== "result") throw new Error(`Tool ${Z} did not return a result`);
      return {
        content: Array.isArray(V) ? V.map((C) => ({
          type: "text",
          text: "text" in C ? C.text : JSON.stringify(C)
        })) : [{
          type: "text",
          text: typeof V === "string" ? V : JSON.stringify(V.data)
        }]
      }
    } catch (J) {
      return b1(J instanceof Error ? J : new Error(String(J))), {
        isError: !0,
        content: [{
          type: "text",
          text: `Error: ${J instanceof Error?J.message:String(J)}`
        }]
      }
    }
  });
  async function G() {
    let Z = new v2A;
    await I.connect(Z)
  }
  return await G()
}
// @from(Start 10139708, End 10139716)
Cq5 = 30
// @from(Start 10139719, End 10139836)
function dy2() {
  let Q = (m6().cleanupPeriodDays ?? Cq5) * 24 * 60 * 60 * 1000;
  return new Date(Date.now() - Q)
}
// @from(Start 10139838, End 10139946)
function Kq5(A, B) {
  return {
    messages: A.messages + B.messages,
    errors: A.errors + B.errors
  }
}
// @from(Start 10139948, End 10140077)
function Hq5(A) {
  let B = A.split(".")[0].replace(/T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/, "T$1:$2:$3.$4Z");
  return new Date(B)
}
// @from(Start 10140079, End 10140472)
function my2(A, B, Q) {
  let I = {
    messages: 0,
    errors: 0
  };
  try {
    let G = x1().readdirSync(A);
    for (let Z of G) try {
      if (Hq5(Z.name) < B)
        if (x1().unlinkSync(ZE1(A, Z.name)), Q) I.messages++;
        else I.errors++
    } catch (D) {
      b1(D)
    }
  } catch (G) {
    if (G instanceof Error && "code" in G && G.code !== "ENOENT") b1(G)
  }
  return I
}
// @from(Start 10140473, End 10141014)
async function zq5() {
  let A = x1(),
    B = dy2(),
    Q = Mz.errors(),
    I = Mz.baseLogs(),
    G = my2(Q, B, !1);
  try {
    if (A.existsSync(I)) {
      let D = A.readdirSync(I).filter((Y) => Y.isDirectory() && Y.name.startsWith("mcp-logs-")).map((Y) => ZE1(I, Y.name));
      for (let Y of D) {
        G = Kq5(G, my2(Y, B, !0));
        try {
          if (A.isDirEmptySync(Y)) A.rmdirSync(Y)
        } catch {}
      }
    }
  } catch (Z) {
    if (Z instanceof Error && "code" in Z && Z.code !== "ENOENT") b1(Z)
  }
  return G
}
// @from(Start 10141016, End 10141764)
function wq5() {
  let A = dy2(),
    B = {
      messages: 0,
      errors: 0
    },
    Q = oa(),
    I = x1();
  try {
    if (!I.existsSync(Q)) return B;
    let Z = I.readdirSync(Q).filter((D) => D.isDirectory()).map((D) => ZE1(Q, D.name));
    for (let D of Z) try {
      let W = I.readdirSync(D).filter((J) => J.isFile() && J.name.endsWith(".jsonl"));
      for (let J of W) try {
        let F = ZE1(D, J.name);
        if (I.statSync(F).mtime < A) I.unlinkSync(F), B.messages++
      } catch {
        B.errors++;
        continue
      }
      try {
        if (I.isDirEmptySync(D)) I.rmdirSync(D)
      } catch {
        B.errors++
      }
    } catch {
      B.errors++;
      continue
    }
  } catch {
    B.errors++
  }
  return B
}
// @from(Start 10141766, End 10141837)
function uy2() {
  setImmediate(() => {
    zq5(), wq5()
  }).unref()
}
// @from(Start 10141899, End 10142048)
Uq5 = `
Summarize this coding conversation in under 50 characters.
Capture the main task, key files, problems addressed, and current status.
`.trim()
// @from(Start 10142050, End 10142975)
async function Nq5(A) {
  if (!A.length) throw new Error("Can't summarize empty conversation");
  let Q = [`Please write a 5-10 word title the following conversation:

${AQ(A).map((G)=>{if(G.type==="user"){if(typeof G.message.content==="string")return`User: ${G.message.content}`;else if(Array.isArray(G.message.content))return`User: ${G.message.content.filter((Z)=>Z.type==="text").map((Z)=>Z.type==="text"?Z.text:"").join(`
`).trim()}`}else if(G.type==="assistant"){let Z=BH1(G);if(Z)return`
    Claude: $ {
      U11(Z).trim()
    }
    `}return null}).filter((G)=>G!==null).join(`

    `)}
`, "Respond with the title for the conversation and nothing else."
  ];
  return (await cZ({
    systemPrompt: [Uq5],
    userPrompt: Q.join(`
`),
    enablePromptCaching: !0,
    isNonInteractiveSession: !1,
    promptCategory: "summarize_convo"
  })).message.content.filter((G) => G.type === "text").map((G) => G.text).join("")
}
// @from(Start 10142977, End 10143048)
function $q5(A) {
  return py2(oa(), A.replace(/[^a-zA-Z0-9]/g, "-"))
}
// @from(Start 10143050, End 10143359)
function qq5(A) {
  let B = x1();
  try {
    B.statSync(A)
  } catch {
    return []
  }
  return B.readdirSync(A).filter((I) => I.isFile() && I.name.endsWith(".jsonl")).map((I) => py2(A, I.name)).sort((I, G) => {
    let Z = B.statSync(I);
    return B.statSync(G).mtime.getTime() - Z.mtime.getTime()
  })
}
// @from(Start 10143361, End 10143578)
function Mq5(A, B) {
  let Q = [],
    I = A;
  while (I) {
    let {
      isSidechain: G,
      parentUuid: Z,
      ...D
    } = I;
    Q.unshift(D), I = I.parentUuid ? B.get(I.parentUuid) : void 0
  }
  return Q
}
// @from(Start 10143580, End 10143741)
function Lq5(A) {
  let B = new Set([...A.values()].map((Q) => Q.parentUuid).filter((Q) => Q !== null));
  return [...A.values()].filter((Q) => !B.has(Q.uuid))
}
// @from(Start 10143743, End 10144077)
function Rq5(A) {
  let B = x1();
  try {
    let {
      buffer: Q
    } = B.readSync(A, {
      length: 512
    }), I = Q.toString("utf8"), G = I.indexOf(`
`);
    if (G === -1) return JSON.parse(I.trim()).type === "summary";
    let Z = I.substring(0, G);
    return JSON.parse(Z).type === "summary"
  } catch {
    return !1
  }
}
// @from(Start 10144078, End 10144673)
async function cy2() {
  let A = $q5(dA()),
    B = qq5(A);
  for (let Q of B) try {
    if (Rq5(Q)) break;
    if (!fC(Eq5(Q, ".jsonl"))) continue;
    let {
      messages: Z,
      summaries: D
    } = await hf1(Q), Y = Lq5(Z);
    for (let W of Y) {
      if (D.has(W.uuid)) continue;
      let J = Mq5(W, Z);
      if (J.length === 0) continue;
      try {
        let F = await Nq5(J);
        if (F) await zZ0(W.uuid, F)
      } catch (F) {
        b1(F instanceof Error ? F : new Error(String(F)))
      }
    }
  } catch (I) {
    b1(I instanceof Error ? I : new Error(String(I)))
  }
}
// @from(Start 10144719, End 10144736)
F01 = I1(U1(), 1)
// @from(Start 10144742, End 10144758)
_W = I1(U1(), 1)
// @from(Start 10144764, End 10144781)
b2A = I1(U1(), 1)
// @from(Start 10144784, End 10145083)
function DE1() {
  return b2A.default.createElement(P, null, "MCP servers may execute code or access system resources. All tool calls require approval. Learn more in the", " ", b2A.default.createElement(BJ1, {
    url: "https://docs.anthropic.com/s/claude-code-mcp"
  }, "MCP documentation"), ".")
}
// @from(Start 10145085, End 10146855)
function ly2({
  serverNames: A,
  onDone: B
}) {
  function Q(G) {
    let Z = m6() || {},
      D = Z.enabledMcpjsonServers || [],
      Y = Z.disabledMcpjsonServers || [],
      [W, J] = jU1(A, (F) => G.includes(F));
    if (E1("tengu_mcp_multidialog_choice", {
        approved: W.length,
        rejected: J.length
      }), W.length > 0) {
      let F = [...new Set([...D, ...W])];
      qB("localSettings", {
        enabledMcpjsonServers: F
      })
    }
    if (J.length > 0) {
      let F = [...new Set([...Y, ...J])];
      qB("localSettings", {
        disabledMcpjsonServers: F
      })
    }
    B()
  }
  let I = Y2();
  return Z0((G, Z) => {
    if (Z.escape) {
      let Y = (m6() || {}).disabledMcpjsonServers || [],
        W = [...new Set([...Y, ...A])];
      qB("localSettings", {
        disabledMcpjsonServers: W
      }), B();
      return
    }
  }), _W.default.createElement(_W.default.Fragment, null, _W.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: "warning"
  }, _W.default.createElement(P, {
    bold: !0,
    color: "warning"
  }, A.length, " new MCP servers found in .mcp.json"), _W.default.createElement(P, null, "Select any you wish to enable."), _W.default.createElement(DE1, null), _W.default.createElement(fG1, {
    options: A.map((G) => ({
      label: G,
      value: G
    })),
    defaultValue: A,
    onSubmit: Q
  })), _W.default.createElement(h, {
    marginLeft: 3
  }, _W.default.createElement(P, {
    dimColor: !0
  }, I.pending ? _W.default.createElement(_W.default.Fragment, null, "Press ", I.keyName, " again to exit") : _W.default.createElement(_W.default.Fragment, null, "Space to select · Enter to confirm · Esc to reject all"))))
}
// @from(Start 10146860, End 10146876)
FF = I1(U1(), 1)
// @from(Start 10146879, End 10148695)
function iy2({
  serverName: A,
  onDone: B
}) {
  function Q(G) {
    switch (E1("tengu_mcp_dialog_choice", {
        choice: G
      }), G) {
      case "yes":
      case "yes_all": {
        let D = (m6() || {}).enabledMcpjsonServers || [];
        if (!D.includes(A)) qB("localSettings", {
          enabledMcpjsonServers: [...D, A]
        });
        if (G === "yes_all") qB("localSettings", {
          enableAllProjectMcpServers: !0
        });
        B();
        break
      }
      case "no": {
        let D = (m6() || {}).disabledMcpjsonServers || [];
        if (!D.includes(A)) qB("localSettings", {
          disabledMcpjsonServers: [...D, A]
        });
        B();
        break
      }
    }
  }
  let I = Y2();
  return Z0((G, Z) => {
    if (Z.escape) {
      B();
      return
    }
  }), FF.default.createElement(FF.default.Fragment, null, FF.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: "warning"
  }, FF.default.createElement(P, {
    bold: !0,
    color: "warning"
  }, "New MCP server found in .mcp.json: ", A), FF.default.createElement(DE1, null), FF.default.createElement(p0, {
    options: [{
      label: "Use this and all future MCP servers in this project",
      value: "yes_all"
    }, {
      label: "Use this MCP server",
      value: "yes"
    }, {
      label: "Continue without using this MCP server",
      value: "no"
    }],
    onChange: (G) => Q(G),
    onCancel: () => Q("no")
  })), FF.default.createElement(h, {
    marginLeft: 3
  }, FF.default.createElement(P, {
    dimColor: !0
  }, I.pending ? FF.default.createElement(FF.default.Fragment, null, "Press ", I.keyName, " again to exit") : FF.default.createElement(FF.default.Fragment, null, "Enter to confirm · Esc to reject"))))
}
// @from(Start 10148696, End 10149471)
async function ny2() {
  let A = vC(),
    B = Object.keys(A).filter((Q) => rC1(Q) === "pending");
  if (B.length === 0) return;
  await new Promise((Q) => {
    let I = () => {
      process.stdout.write("\x1B[2J\x1B[3J\x1B[H", () => {
        Q()
      })
    };
    if (B.length === 1 && B[0] !== void 0) {
      let G = n5(F01.default.createElement(c3, null, F01.default.createElement(iy2, {
        serverName: B[0],
        onDone: () => {
          G.unmount?.(), I()
        }
      })), {
        exitOnCtrlC: !1
      })
    } else {
      let G = n5(F01.default.createElement(c3, null, F01.default.createElement(ly2, {
        serverNames: B,
        onDone: () => {
          G.unmount?.(), I()
        }
      })), {
        exitOnCtrlC: !1
      })
    }
  })
}
// @from(Start 10149476, End 10149492)
iI = I1(U1(), 1)
// @from(Start 10149495, End 10151521)
function ay2({
  onAccept: A
}) {
  iI.default.useEffect(() => {
    E1("bypass_permissions_mode_dialog_shown", {})
  }, []);

  function B(I) {
    let G = ZA();
    switch (I) {
      case "accept": {
        E1("bypass_permissions_mode_dialog_accept", {}), j0({
          ...G,
          bypassPermissionsModeAccepted: !0
        }), A();
        break
      }
      case "decline": {
        MI(1);
        break
      }
    }
  }
  let Q = Y2();
  return Z0((I, G) => {
    if (G.escape) {
      MI(0);
      return
    }
  }), iI.default.createElement(iI.default.Fragment, null, iI.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: "error"
  }, iI.default.createElement(P, {
    bold: !0,
    color: "error"
  }, "WARNING: ", m0, " running in Bypass Permissions mode"), iI.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, iI.default.createElement(P, null, "In Bypass Permissions mode, ", m0, " will not ask for your approval before running potentially dangerous commands.", iI.default.createElement(UI, null), "This mode should only be used in a sandboxed container/VM that has restricted internet access and can easily be restored if damaged."), iI.default.createElement(P, null, "By proceeding, you accept all responsibility for actions taken while running in Bypass Permissions mode."), iI.default.createElement(kQ, {
    url: "https://docs.anthropic.com/s/claude-code-security"
  })), iI.default.createElement(p0, {
    options: [{
      label: "No, exit",
      value: "decline"
    }, {
      label: "Yes, I accept",
      value: "accept"
    }],
    onChange: (I) => B(I),
    onCancel: () => B("decline")
  })), iI.default.createElement(h, {
    marginLeft: 3
  }, iI.default.createElement(P, {
    dimColor: !0
  }, Q.pending ? iI.default.createElement(iI.default.Fragment, null, "Press ", Q.keyName, " again to exit") : iI.default.createElement(iI.default.Fragment, null, "Enter to confirm · Esc to exit"))))
}
// @from(Start 10151526, End 10151543)
YE1 = I1(U1(), 1)
// @from(Start 10151546, End 10151881)
function sy2() {
  return YE1.default.createElement(h, {
    flexDirection: "row"
  }, YE1.default.createElement(P, {
    color: "text"
  }, "※ Tip: Use git worktrees to run multiple Claude sessions in parallel.", " ", YE1.default.createElement(kQ, {
    url: "https://docs.anthropic.com/s/claude-code-worktrees"
  }, "Learn more")))
}
// @from(Start 10151886, End 10157161)
Oq5 = [{
    id: "claude-opus-welcome",
    content: "New! Introducing Opus 4 - our most powerful model yet. Use /model to try it out.",
    cooldownSessions: 1 / 0,
    isRelevant: () => !process.env.IS_DEMO && IE1()
  }, {
    id: "ide-hotkey",
    content: `${Z7()==="macos"?"Cmd+Escape":"Ctrl+Escape"} to launch Claude in your IDE`,
    cooldownSessions: 15,
    isRelevant: Ni1
  }, {
    id: "new-user-warmup",
    content: "Start with small features or bug fixes, tell Claude to propose a plan, and verify its suggested edits",
    cooldownSessions: 3,
    isRelevant: () => {
      return ZA().numStartups < 10
    }
  }, {
    id: "git-worktrees",
    content: sy2,
    cooldownSessions: 30,
    isRelevant: async () => {
      try {
        let A = ZA();
        return await kn() <= 1 && A.numStartups > 50
      } catch (A) {
        return !1
      }
    }
  }, {
    id: "terminal-setup",
    content: mA.terminal === "Apple_Terminal" ? "Run /terminal-setup to enable convenient terminal integration like Option + Enter for new line and more" : "Run /terminal-setup to enable convenient terminal integration like Shift + Enter for new line and more",
    cooldownSessions: 15,
    isRelevant: () => {
      let A = ZA();
      if (mA.terminal === "Apple_Terminal") return LE.isEnabled() && !A.optionAsMetaKeyInstalled;
      return LE.isEnabled() && !A.shiftEnterKeyBindingInstalled
    }
  }, {
    id: "shift-enter",
    content: mA.terminal === "Apple_Terminal" ? "Press Option+Enter to send a multi-line message" : "Press Shift+Enter to send a multi-line message",
    cooldownSessions: 20,
    isRelevant: () => {
      let A = ZA();
      return Boolean((mA.terminal === "Apple_Terminal" ? A.optionAsMetaKeyInstalled : A.shiftEnterKeyBindingInstalled) && A.numStartups > 3)
    }
  }, {
    id: "shift-enter",
    content: mA.terminal === "Apple_Terminal" ? "Run /terminal-setup to enable Option+Enter for new lines" : "Run /terminal-setup to enable Shift+Enter for new lines",
    cooldownSessions: 20,
    isRelevant: () => {
      if (!gA1()) return !1;
      let A = ZA();
      return !(mA.terminal === "Apple_Terminal" ? A.optionAsMetaKeyInstalled : A.shiftEnterKeyBindingInstalled)
    }
  }, {
    id: "memory-command",
    content: "Use /memory to view and manage Claude memory",
    cooldownSessions: 30,
    isRelevant: () => {
      return ZA().memoryUsageCount <= 0
    }
  }, {
    id: "theme-command",
    content: "Use /theme to change the color theme",
    cooldownSessions: 40,
    isRelevant: () => !0
  }, {
    id: "prompt-queue",
    content: "Hit Enter to queue up additional messages while Claude is working.",
    cooldownSessions: 10,
    isRelevant: () => {
      return ZA().promptQueueUseCount <= 3
    }
  }, {
    id: "enter-to-steer-in-relatime",
    content: "Send messages to Claude while it works to steer Claude in real-time",
    cooldownSessions: 40,
    isRelevant: () => !0
  }, {
    id: "todo-list",
    content: "Ask Claude to create a todo list when working on complex tasks to track progress and remain on track",
    cooldownSessions: 40,
    isRelevant: () => !0
  }, {
    id: "vscode-command-install",
    content: `Open the Command Palette (Cmd+Shift+P) and run "Shell Command: Install '${mA.terminal==="vscode"?"code":mA.terminal}' command in PATH" to enable IDE integration`,
    cooldownSessions: 0,
    isRelevant: () => {
      if (!tR) return !1;
      if (Z7() !== "macos") return !1;
      switch (mA.terminal) {
        case "vscode":
          return !Me0();
        case "cursor":
          return !$e0();
        case "windsurf":
          return !qe0();
        default:
          return !1
      }
    }
  }, {
    id: "# for memory",
    content: "Want Claude to remember something? Hit # to add preferences, tools, and instructions to Claude's memory",
    cooldownSessions: 20,
    isRelevant: () => ZA().memoryUsageCount <= 10
  }, {
    id: "install-github-app",
    content: "Run /install-github-app to tag @claude right from your Github issues and PRs",
    cooldownSessions: 20,
    isRelevant: () => !ZA().githubActionSetupCount
  }, {
    id: "permissions",
    content: "Use /permissions to pre-approve and pre-deny bash, edit, and MCP tools",
    cooldownSessions: 20,
    isRelevant: () => {
      return ZA().numStartups > 10
    }
  }, {
    id: "drag-and-drop-images",
    content: "Did you know you can drag and drop image files into your terminal?",
    cooldownSessions: 20,
    isRelevant: () => !0
  }, {
    id: "double-esc",
    content: "Press Esc twice to edit your previous messages",
    cooldownSessions: 20,
    isRelevant: () => !0
  }, {
    id: "continue",
    content: "Run claude --continue or claude --resume to resume a conversation",
    cooldownSessions: 20,
    isRelevant: () => !0
  }, {
    id: "custom-commands",
    content: "Create custom slash commands by adding .md files to .claude/commands/ in your project or ~/.claude/commands/ for commands that work in any project",
    cooldownSessions: 30,
    isRelevant: () => {
      return ZA().numStartups > 10
    }
  }, {
    id: "shift-tab",
    content: "Hit shift+tab to cycle between default mode, auto-accept edit mode, and plan mode",
    cooldownSessions: 20,
    isRelevant: () => !0
  }]
// @from(Start 10157165, End 10157173)
Tq5 = []
// @from(Start 10157177, End 10157199)
ry2 = [...Oq5, ...Tq5]
// @from(Start 10157202, End 10158030)
function NT({
  newState: A,
  oldState: B
}) {
  if (B !== null && A.mainLoopModel !== B.mainLoopModel && A.mainLoopModel === null) qB("userSettings", {
    model: void 0
  }), Xc(null);
  if (B !== null && A.mainLoopModel !== B.mainLoopModel && A.mainLoopModel !== null) qB("userSettings", {
    model: A.mainLoopModel
  }), Xc(A.mainLoopModel);
  if (A.maxRateLimitFallbackActive !== HP()) B9A(A.maxRateLimitFallbackActive);
  if (B !== null && A.todoFeatureEnabled !== B.todoFeatureEnabled && ZA().todoFeatureEnabled !== A.todoFeatureEnabled) j0({
    ...ZA(),
    todoFeatureEnabled: A.todoFeatureEnabled
  });
  if (B !== null && A.verbose !== B.verbose && ZA().verbose !== A.verbose) j0({
    ...ZA(),
    verbose: A.verbose
  });
  if (A.toolPermissionContext !== B?.toolPermissionContext) AE1(A.toolPermissionContext)
}
// @from(Start 10158032, End 10158336)
function oy2() {
  let A = ZA();
  if (!A.apiKeyHelper) return;
  try {
    qB("userSettings", {
      apiKeyHelper: A.apiKeyHelper
    }), j0({
      ...ZA(),
      apiKeyHelper: void 0
    }), E1("tengu_migrate_apikeyhelper_success", {})
  } catch {
    E1("tengu_migrate_apikeyhelper_error", {})
  }
}
// @from(Start 10158338, End 10158810)
function ty2() {
  let A = ZA();
  if (!A.env || Object.keys(A.env).length === 0) return;
  try {
    let B = KC("userSettings"),
      Q = B?.env || {},
      I = {
        ...A.env,
        ...Q
      };
    qB("userSettings", {
      ...B,
      env: I
    }), j0({
      ...ZA(),
      env: {}
    }), E1("tengu_migrate_globalconfig_env_success", {
      numEnvVars: Object.keys(A.env).length
    })
  } catch {
    E1("tengu_migrate_globalconfig_env_error", {})
  }
}
// @from(Start 10158815, End 10158832)
X01 = I1(U1(), 1)
// @from(Start 10158834, End 10159949)
async function ey2() {
  if (!(await wJ("force_local_installation_migration") && !JT() && !print && !0 && !0 && !ZF())) return;
  console.log(UA.yellow("⚠️ Migrating Claude CLI to local installation...")), console.log("This improves auto-updates and removes dependency on global npm permissions."), console.log("Your existing configuration and history will be preserved.");
  try {
    E1("tengu_forced_migration_start", {
      gateControlled: !0
    }), await new Promise((B) => {
      let {
        waitUntilExit: Q
      } = n5(X01.createElement(c3, null, X01.createElement(Hp, null)));
      Q().then(() => {
        B()
      })
    }), await E1("tengu_forced_migration_success", {
      gateControlled: !0
    }), console.log(UA.green("✅ Migration complete!")), console.log("Please restart Claude CLI to use the new installation."), process.exit(0)
  } catch (B) {
    let Q = B instanceof Error ? B : new Error(String(B));
    b1(Q), E1("tengu_forced_migration_failure", {
      gateControlled: !0
    }), console.log(UA.red("⚠️ Migration encountered an error, continuing with global installation."))
  }
}
// @from(Start 10159951, End 10161466)
function Ak2() {
  let A = m9(),
    B = A.enableAllProjectMcpServers !== void 0,
    Q = A.enabledMcpjsonServers && A.enabledMcpjsonServers.length > 0,
    I = A.disabledMcpjsonServers && A.disabledMcpjsonServers.length > 0;
  if (!B && !Q && !I) return;
  try {
    let G = KC("localSettings") || {},
      Z = {},
      D = [];
    if (B && G.enableAllProjectMcpServers === void 0) Z.enableAllProjectMcpServers = A.enableAllProjectMcpServers, D.push("enableAllProjectMcpServers");
    else if (B) D.push("enableAllProjectMcpServers");
    if (Q && A.enabledMcpjsonServers) {
      let Y = G.enabledMcpjsonServers || [];
      Z.enabledMcpjsonServers = [...new Set([...Y, ...A.enabledMcpjsonServers])], D.push("enabledMcpjsonServers")
    }
    if (I && A.disabledMcpjsonServers) {
      let Y = G.disabledMcpjsonServers || [];
      Z.disabledMcpjsonServers = [...new Set([...Y, ...A.disabledMcpjsonServers])], D.push("disabledMcpjsonServers")
    }
    if (Object.keys(Z).length > 0) qB("localSettings", Z);
    if (D.length > 0) {
      let Y = m9(),
        {
          enableAllProjectMcpServers: W,
          enabledMcpjsonServers: J,
          disabledMcpjsonServers: F,
          ...X
        } = Y;
      if (D.includes("enableAllProjectMcpServers") || D.includes("enabledMcpjsonServers") || D.includes("disabledMcpjsonServers")) B5(X)
    }
    E1("tengu_migrate_mcp_approval_fields_success", {
      migratedCount: D.length
    })
  } catch {
    E1("tengu_migrate_mcp_approval_fields_error", {})
  }
}
// @from(Start 10161467, End 10162346)
class g2A {
  input;
  structuredInput;
  constructor(A) {
    this.input = A;
    this.input = A, this.structuredInput = this.read()
  }
  async * read() {
    let A = "";
    for await (let B of this.input) {
      A += B;
      let Q;
      while ((Q = A.indexOf(`
`)) !== -1) {
        let I = A.slice(0, Q);
        A = A.slice(Q + 1);
        let G = this.processLine(I);
        if (G) yield G
      }
    }
    if (A) {
      let B = this.processLine(A);
      if (B) yield B
    }
  }
  processLine(A) {
    try {
      let B = JSON.parse(A);
      if (B.type !== "user") Bk2(`Error: Expected message type 'user', got '${B.type}'`);
      if (B.message.role !== "user") Bk2(`Error: Expected message role 'user', got '${B.message.role}'`);
      return B
    } catch (B) {
      console.error(`Error parsing streaming input line: ${A}: ${B}`), process.exit(1)
    }
  }
}
// @from(Start 10162348, End 10162403)
function Bk2(A) {
  console.error(A), process.exit(1)
}
// @from(Start 10162404, End 10163808)
class h2A {
  returned;
  queue = [];
  readResolve;
  readReject;
  isDone = !1;
  hasError;
  started = !1;
  constructor(A) {
    this.returned = A
  } [Symbol.asyncIterator]() {
    if (this.started) throw new Error("Stream can only be iterated once");
    return this.started = !0, this
  }
  next() {
    if (this.queue.length > 0) return Promise.resolve({
      done: !1,
      value: this.queue.shift()
    });
    if (this.isDone) return Promise.resolve({
      done: !0,
      value: void 0
    });
    if (this.hasError) return Promise.reject(this.hasError);
    return new Promise((A, B) => {
      this.readResolve = A, this.readReject = B
    })
  }
  enqueue(A) {
    if (this.readResolve) {
      let B = this.readResolve;
      this.readResolve = void 0, this.readReject = void 0, B({
        done: !1,
        value: A
      })
    } else this.queue.push(A)
  }
  done() {
    if (this.isDone = !0, this.readResolve) {
      let A = this.readResolve;
      this.readResolve = void 0, this.readReject = void 0, A({
        done: !0,
        value: void 0
      })
    }
  }
  error(A) {
    if (this.hasError = A, this.readReject) {
      let B = this.readReject;
      this.readResolve = void 0, this.readReject = void 0, B(A)
    }
  }
  return () {
    if (this.isDone = !0, this.returned) this.returned();
    return Promise.resolve({
      done: !0,
      value: void 0
    })
  }
}
// @from(Start 10163813, End 10163908)
Pq5 = n.object({
    behavior: n.literal("allow"),
    updatedInput: n.record(n.unknown())
  })
// @from(Start 10163912, End 10163990)
Sq5 = n.object({
    behavior: n.literal("deny"),
    message: n.string()
  })
// @from(Start 10163994, End 10164019)
Qk2 = n.union([Pq5, Sq5])
// @from(Start 10164022, End 10164343)
function Ik2(A, B) {
  let Q = {
    type: "permissionPromptTool",
    permissionPromptToolName: B,
    toolResult: A
  };
  switch (A.behavior) {
    case "allow":
      return {
        ...A, decisionReason: Q
      };
    case "deny":
      return {
        ...A, decisionReason: Q, ruleSuggestions: null
      }
  }
}
// @from(Start 10164395, End 10169402)
async function* Zk2({
  commands: A,
  permissionContext: B,
  prompt: Q,
  cwd: I,
  tools: G,
  mcpClients: Z,
  verbose: D = !1,
  maxTurns: Y,
  permissionPromptTool: W,
  initialMessages: J = [],
  customSystemPrompt: F,
  appendSystemPrompt: X,
  userSpecifiedModel: V,
  fallbackModel: C,
  getQueuedCommands: K = () => [],
  removeQueuedCommands: E = () => {}
}) {
  if (!process.env.CLAUDE_CODE_ENTRYPOINT) process.env.CLAUDE_CODE_ENTRYPOINT = "sdk-cli";
  EX(I);
  let N = Date.now(),
    q = V ? Cg(V) : J7(),
    [O, R, T] = await Promise.all([yj(G, q, void 0, Array.from(B.additionalWorkingDirectories)), qW(), RE()]),
    L = [...F ? [F] : O, ...X ? [X] : []],
    _ = jq5(J),
    k = {
      messages: _,
      setMessages: () => {},
      onChangeAPIKey: () => {},
      options: {
        commands: A,
        debug: !1,
        tools: G,
        verbose: D,
        mainLoopModel: q,
        maxThinkingTokens: s$(_),
        mcpClients: Z,
        mcpResources: {},
        ideInstallationStatus: null,
        isNonInteractiveSession: !0,
        theme: ZA().theme
      },
      getToolPermissionContext: () => B,
      getQueuedCommands: () => [],
      removeQueuedCommands: () => {},
      abortController: new AbortController,
      readFileState: {},
      setInProgressToolUseIDs: () => {},
      setToolPermissionContext: () => {},
      agentId: y9()
    },
    i = [..._, ...(await Tp(Q, "prompt", () => {}, {
      ...k,
      messages: _
    }, null, null)).messages],
    x = s$(i);
  if (x > 0) k = {
    messages: i,
    setMessages: () => {},
    onChangeAPIKey: () => {},
    options: {
      commands: A,
      debug: !1,
      tools: G,
      verbose: D,
      mainLoopModel: q,
      maxThinkingTokens: x,
      mcpClients: Z,
      mcpResources: {},
      ideInstallationStatus: null,
      isNonInteractiveSession: !0,
      theme: ZA().theme
    },
    getToolPermissionContext: () => B,
    abortController: new AbortController,
    readFileState: {},
    setToolPermissionContext: () => {},
    getQueuedCommands: K,
    removeQueuedCommands: E,
    setInProgressToolUseIDs: () => {},
    agentId: y9()
  };
  let s = async (D1, N1, u1, d1) => {
    let YA = await sM(D1, N1, u1, d1);
    if (YA.behavior === "allow" || YA.behavior === "deny") return YA;
    if (W)
      for await (let bA of W.call({
        tool_name: D1.name,
        input: N1
      }, u1, s, d1)) {
        if (bA.type !== "result") continue;
        let e1 = W.mapToolResultToToolResultBlockParam(bA.data, "1");
        if (!e1.content || !Array.isArray(e1.content) || !e1.content[0] || e1.content[0].type !== "text" || typeof e1.content[0].text !== "string") throw new Error('Permission prompt tool returned an invalid result. Expected a single text block param with type="text" and a string text value.');
        return Ik2(Qk2.parse(Z8(e1.content[0].text)), W.name)
      }
    return YA
  };
  yield {
    type: "system",
    subtype: "init",
    cwd: I,
    session_id: y9(),
    tools: G.map((D1) => D1.name),
    mcp_servers: Z.map((D1) => ({
      name: D1.name,
      status: D1.type
    })),
    model: q,
    permissionMode: B.mode,
    apiKeySource: GX(!0).source
  };
  let d = zu,
    F1 = 0;
  for await (let D1 of nO(i, L, R, T, s, k, void 0, C)) {
    if (D1.type === "assistant" || D1.type === "user") i.push(D1), await RG1(i);
    switch (D1.type) {
      case "assistant":
      case "progress":
      case "user":
        yield* _q5(D1);
        break;
      case "stream_event":
        if (D1.event.type === "message_start") d = wy(d, D1.event.message.usage);
        if (D1.event.type === "message_delta") d = wy(d, D1.event.usage);
        break;
      case "attachment":
      case "stream_request_start":
      case "system":
        break
    }
    if (D1.type === "user" && Y && ++F1 >= Y) {
      yield {
        type: "result",
        subtype: "error_max_turns",
        duration_ms: Date.now() - N,
        duration_api_ms: KP(),
        is_error: !1,
        num_turns: F1,
        session_id: y9(),
        total_cost_usd: KU(),
        usage: d
      };
      return
    }
  }
  let X1 = UD(i);
  if (!X1 || X1.type !== "assistant") {
    yield {
      type: "result",
      subtype: "error_during_execution",
      duration_ms: Date.now() - N,
      duration_api_ms: KP(),
      is_error: !1,
      num_turns: F1,
      session_id: y9(),
      total_cost_usd: KU(),
      usage: d
    };
    return
  }
  let v = UD(X1.message.content);
  if (v?.type !== "text" && v?.type !== "thinking" && v?.type !== "redacted_thinking") throw new Error(`Expected first content item to be text or thinking, but got ${JSON.stringify(X1.message.content[0],null,2)}`);
  yield {
    type: "result",
    subtype: "success",
    is_error: Boolean(X1.isApiErrorMessage),
    duration_ms: Date.now() - N,
    duration_api_ms: KP(),
    num_turns: i.length - 1,
    result: v.type === "text" ? v.text : "",
    session_id: y9(),
    total_cost_usd: KU(),
    usage: d
  }
}
// @from(Start 10169404, End 10170348)
function* _q5(A) {
  switch (A.type) {
    case "assistant":
      for (let B of AQ([A])) yield {
        type: "assistant",
        message: B.message,
        parent_tool_use_id: null,
        session_id: y9()
      };
      return;
    case "progress":
      if (A.data.type !== "agent_progress") return;
      for (let B of AQ([A.data.message])) switch (B.type) {
        case "assistant":
          yield {
            type: "assistant", message: B.message, parent_tool_use_id: A.parentToolUseID, session_id: y9()
          };
          break;
        case "user":
          yield {
            type: "user", message: B.message, parent_tool_use_id: A.parentToolUseID, session_id: y9()
          };
          break
      }
      break;
    case "user":
      for (let B of AQ([A])) yield {
        type: "user",
        message: B.message,
        parent_tool_use_id: null,
        session_id: y9()
      };
      return;
    default:
  }
}
// @from(Start 10170350, End 10170817)
function jq5(A) {
  return A.flatMap((B) => {
    switch (B.type) {
      case "assistant":
        return [{
          type: "assistant",
          message: B.message,
          uuid: Gk2(),
          timestamp: new Date().toISOString()
        }];
      case "user":
        return [{
          type: "user",
          message: B.message,
          uuid: Gk2(),
          timestamp: new Date().toISOString()
        }];
      default:
        return []
    }
  })
}
// @from(Start 10170819, End 10171202)
function Dk2(A) {
  return A.flatMap((B) => {
    switch (B.type) {
      case "assistant":
        return [{
          type: "assistant",
          message: B.message,
          session_id: y9()
        }];
      case "user":
        return [{
          type: "user",
          message: B.message,
          session_id: y9()
        }];
      default:
        return []
    }
  })
}
// @from(Start 10171243, End 10174312)
async function Yk2(A, B, Q, I, G, Z, D, Y) {
  let W = [];
  if (Y.continue) try {
    E1("tengu_continue_print", {});
    let N = await ET(void 0, Z.concat(D));
    if (N) W = N.messages
  } catch (N) {
    b1(N instanceof Error ? N : new Error(String(N))), process.exit(1)
  }
  if (Y.resume) try {
    E1("tengu_resume_print", {});
    let N = fC(Y.resume);
    if (!N) {
      if (console.error("Error: --resume requires a valid session ID when used with --print"), console.error("Usage: claude -p --resume <session-id>"), typeof Y.resume === "string" && !N) console.error("Session IDs must be in UUID format (e.g., 550e8400-e29b-41d4-a716-446655440000)"), console.error(`Provided value "${Y.resume}" is not a valid UUID`);
      process.exit(1)
    }
    let q = await ET(N, Z.concat(D));
    if (!q) console.error(`No conversation found with session ID: ${N}`), process.exit(1);
    W = q.messages
  } catch (N) {
    b1(N instanceof Error ? N : new Error(String(N))), console.error("Failed to resume session with --print mode"), process.exit(1)
  }
  let J;
  if (typeof A === "string") J = GU2([JSON.stringify({
    type: "user",
    session_id: "",
    message: {
      role: "user",
      content: A
    },
    parent_tool_use_id: null
  })]);
  else J = A;
  let F = new g2A(J),
    X = Boolean(fC(Y.resume));
  if (!A && !X) console.error("Error: Input must be provided either through stdin or as a prompt argument when using --print"), process.exit(1);
  if (Y.outputFormat === "stream-json" && !Y.verbose) console.error("Error: When using --print, --output-format=stream-json requires --verbose"), process.exit(1);
  let V = [...Z, ...D],
    C = void 0;
  if (Y.permissionPromptToolName) {
    if (C = D.find((N) => N.name === Y.permissionPromptToolName), !C) console.error(`Error: MCP tool ${Y.permissionPromptToolName} (passed via --permission-prompt-tool) not found. Available MCP tools: ${D.map((N)=>N.name).join(", ")||"none"}`), process.exit(1);
    if (!C.inputJSONSchema) console.error(`Error: tool ${Y.permissionPromptToolName} (passed via --permission-prompt-tool) must be an MCP tool`), process.exit(1);
    V = V.filter((N) => N.name !== Y.permissionPromptToolName)
  }
  let K = [];
  for await (let N of kq5(F.structuredInput, B, Q, [...I, ...G], V, W, C, Y)) {
    if (Y.outputFormat === "stream-json" && Y.verbose) EC(JSON.stringify(N) + `
`);
    K.push(N)
  }
  let E = UD(K);
  if (!E || E.type !== "result") throw new Error("No messages returned");
  switch (Y.outputFormat) {
    case "json":
      if (Y.verbose) {
        EC(JSON.stringify(K) + `
`);
        break
      }
      EC(JSON.stringify(E) + `
`);
      break;
    case "stream-json":
      break;
    default:
      switch (E.subtype) {
        case "success":
          EC(E.result.endsWith(`
`) ? E.result : E.result + `
`);
          break;
        case "error_during_execution":
          EC("Execution error");
          break;
        case "error_max_turns":
          EC(`Error: Reached max turns (${Y.maxTurns})`)
      }
  }
  process.exit(E.is_error ? 1 : 0)
}
// @from(Start 10174314, End 10176199)
function kq5(A, B, Q, I, G, Z, D, Y) {
  let W = [],
    J = () => W,
    F = (N) => {
      W = W.filter((q) => !N.includes(q))
    },
    X = !1,
    V = !1,
    C = new h2A,
    K = Dk2(Z),
    E = async () => {
      X = !0;
      try {
        while (W.length > 0) {
          let N = W.shift();
          if (N.mode !== "prompt") throw new Error("only prompt commands are supported in streaming mode");
          let q = N.value;
          for await (let O of Zk2({
            commands: I,
            prompt: q,
            cwd: yq5(),
            tools: G,
            permissionContext: B,
            verbose: Y.verbose,
            mcpClients: Q,
            maxTurns: Y.maxTurns,
            permissionPromptTool: D,
            userSpecifiedModel: Y.userSpecifiedModel,
            fallbackModel: Y.fallbackModel,
            initialMessages: K,
            customSystemPrompt: Y.systemPrompt,
            appendSystemPrompt: Y.appendSystemPrompt,
            getQueuedCommands: J,
            removeQueuedCommands: F
          })) K.push(O), C.enqueue(O)
        }
      } finally {
        X = !1
      }
      if (V) C.done()
    };
  return (async () => {
    for await (let N of A) {
      let q;
      if (typeof N.message.content === "string") q = N.message.content;
      else {
        if (N.message.content.length !== 1) console.error(`Error: Expected message content to have exactly one item, got ${N.message.content.length}`), process.exit(1);
        if (typeof N.message.content[0] === "string") q = N.message.content[0];
        else if (N.message.content[0].type === "text") q = N.message.content[0].text;
        else console.error("Error: Expected message content to be a string or a text block."), process.exit(1)
      }
      if (W.push({
          mode: "prompt",
          value: q
        }), !X) E()
    }
    if (V = !0, !X) C.done()
  })(), C
}
// @from(Start 10176200, End 10180891)
async function Wk2() {
  if (E1("tengu_update_check", {}), console.log(`Current version: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION}`), console.log("Checking for updates..."), await ZF()) try {
    let Z = await Fp();
    if (!Z.latestVersion) console.error("Failed to check for updates"), process.exit(1);
    if (Z.latestVersion === {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.VERSION) console.log(`${m0} is up to date (${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION})`);
    else if (Z.wasUpdated) console.log(`Successfully updated from ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION} to version ${Z.latestVersion}`);
    else console.log(`${m0} is up to date (${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION})`);
    process.exit(0)
  } catch (Z) {
    console.error("Error: Failed to install native update"), console.error(String(Z)), console.error('Try running "claude doctor" for diagnostics'), process.exit(1)
  }
  Ew1();
  let A = await Uw1();
  if (!A) console.error("Failed to check for updates"), process.exit(1);
  if (A === {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION) console.log(`${m0} is up to date (${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION})`), process.exit(0);
  console.log(`New version available: ${A} (current: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION})`), console.log("Installing update...");
  let Q = ZA().installMethod === "local",
    I = i$(),
    G;
  if (Q || I) console.log("Using local installation update method..."), G = await Yp();
  else console.log("Using global installation update method..."), G = await Nw1();
  switch (G) {
    case "success":
      console.log(`Successfully updated from ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION} to version ${A}`);
      break;
    case "no_permissions":
      if (console.error("Error: Insufficient permissions to install update"), Q) console.error("Try manually updating with:"), console.error(`  cd ~/.claude/local && npm update ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.PACKAGE_URL}`);
      else console.error("Try running with sudo or fix npm permissions"), console.error("Or consider migrating to a local installation with:"), console.error("  /migrate-installer");
      process.exit(1);
      break;
    case "install_failed":
      if (console.error("Error: Failed to install update"), Q) console.error("Try manually updating with:"), console.error(`  cd ~/.claude/local && npm update ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.PACKAGE_URL}`);
      else console.error("Or consider migrating to a local installation with:"), console.error("  /migrate-installer");
      process.exit(1);
      break;
    case "in_progress":
      console.error("Error: Another instance is currently performing an update"), console.error("Please wait and try again later"), process.exit(1);
      break
  }
  process.exit(0)
}
// @from(Start 10180896, End 10180912)
z6 = I1(U1(), 1)
// @from(Start 10180991, End 10181829)
async function vq5() {
  let A = [],
    B = 0;
  O9("Attempting to remove global npm installation of @anthropic/claude-code");
  let {
    code: Q,
    stderr: I
  } = await PD("npm", ["uninstall", "-g", "@anthropic/claude-code"], {
    cwd: x1().cwd()
  });
  if (Q === 0) B++, O9("Removed global npm installation");
  else if (I && !I.includes("npm ERR! code E404")) A.push("Failed to remove global npm installation"), M6(`Failed to uninstall global npm package: ${I}`);
  let G = x1(),
    Z = fq5(xq5(), ".claude", "local");
  if (G.existsSync(Z)) try {
    G.rmSync(Z, {
      recursive: !0,
      force: !0
    }), B++, O9(`Removed local installation at ${Z}`)
  } catch (D) {
    A.push(`Failed to remove ${Z}: ${D}`), M6(`Failed to remove local installation: ${D}`)
  }
  return await bq5(), {
    removed: B,
    errors: A
  }
}
// @from(Start 10181830, End 10182192)
async function bq5() {
  let {
    stdout: A
  } = await PD("which", ["-a", "claude"], {
    cwd: x1().cwd()
  });
  if (!A) return;
  let B = A.trim().split(`
`).filter(Boolean),
    Q = x1();
  for (let I of B)
    if (I.includes("node_modules") || I.includes("npm")) try {
      Q.unlinkSync(I), O9(`Removed stale npm claude command at ${I}`)
    } catch {}
}
// @from(Start 10182194, End 10186878)
function gq5({
  onDone: A,
  force: B
}) {
  let [Q, I] = z6.useState({
    type: "checking"
  });
  return z6.useEffect(() => {
    async function G() {
      try {
        O9(`Install: Starting installation process (force=${B})`), I({
          type: "cleaning-npm"
        });
        let {
          removed: Z,
          errors: D
        } = await vq5();
        if (Z > 0) O9(`Cleaned up ${Z} npm installation(s)`);
        if (D.length > 0 && !B) {
          I({
            type: "error",
            message: `Cleanup errors: ${D.join(", ")}`
          });
          return
        }
        I({
          type: "installing",
          version: "latest"
        }), O9("Install: Calling installLatest(force=true)");
        let Y = await Fp(!0);
        if (O9(`Install: installLatest returned version=${Y.latestVersion}, wasUpdated=${Y.wasUpdated}`), !Y.latestVersion) M6("Install: Failed to retrieve version information during install");
        if (!Y.wasUpdated && !B) O9("Install: Already up to date");
        I({
          type: "setting-up"
        });
        let W = await Jp(!0);
        if (O9(`Install: Setup launcher completed with ${W.length} messages`), W.length > 0) W.forEach((J) => O9(`Install: Setup message: ${J}`));
        if (E1("claude_install_command", {
            has_version: Y.latestVersion ? 1 : 0,
            forced: B ? 1 : 0
          }), W.length > 0) I({
          type: "set-up",
          messages: W
        }), setTimeout(() => {
          I({
            type: "success",
            version: Y.latestVersion || "current"
          })
        }, 2000);
        else O9("Install: Shell PATH already configured"), I({
          type: "success",
          version: Y.latestVersion || "current"
        })
      } catch (Z) {
        M6(`Install command failed: ${Z}`), I({
          type: "error",
          message: Z instanceof Error ? Z.message : String(Z)
        })
      }
    }
    G()
  }, [B]), z6.useEffect(() => {
    if (Q.type === "success") A();
    else if (Q.type === "error") setTimeout(() => {
      A()
    }, 3000)
  }, [Q, A]), z6.default.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, Q.type === "checking" && z6.default.createElement(P, {
    color: "claude"
  }, "Checking installation status..."), Q.type === "cleaning-npm" && z6.default.createElement(P, {
    color: "warning"
  }, "Cleaning up old npm installations..."), Q.type === "installing" && z6.default.createElement(P, {
    color: "claude"
  }, "Installing Claude Code native build", Q.version !== "latest" ? ` (${Q.version})` : "", "..."), Q.type === "setting-up" && z6.default.createElement(P, {
    color: "claude"
  }, "Setting up launcher and shell integration..."), Q.type === "set-up" && z6.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, z6.default.createElement(P, {
    color: "warning"
  }, "Setup notes:"), Q.messages.map((G, Z) => z6.default.createElement(h, {
    key: Z,
    marginLeft: 2
  }, z6.default.createElement(P, {
    color: "secondaryText"
  }, "• ", G)))), Q.type === "success" && z6.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, z6.default.createElement(h, null, z6.default.createElement(P, {
    color: "success"
  }, A0.tick, " "), z6.default.createElement(P, {
    color: "success",
    bold: !0
  }, "Claude Code successfully installed!")), z6.default.createElement(h, {
    marginLeft: 2,
    flexDirection: "column",
    gap: 1
  }, Q.version !== "current" && z6.default.createElement(h, null, z6.default.createElement(P, {
    color: "secondaryText"
  }, "Version: "), z6.default.createElement(P, {
    color: "claude"
  }, Q.version)), z6.default.createElement(h, null, z6.default.createElement(P, {
    color: "secondaryText"
  }, "Location: "), z6.default.createElement(P, {
    color: "text"
  }, "~/.claude/bin/claude")), z6.default.createElement(h, {
    marginTop: 1
  }, z6.default.createElement(P, {
    color: "secondaryText"
  }, "Next: Run "), z6.default.createElement(P, {
    color: "claude",
    bold: !0
  }, "claude --help"), z6.default.createElement(P, {
    color: "secondaryText"
  }, " to get started")))), Q.type === "error" && z6.default.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, z6.default.createElement(h, null, z6.default.createElement(P, {
    color: "error"
  }, A0.cross, " "), z6.default.createElement(P, {
    color: "error"
  }, "Installation failed")), z6.default.createElement(P, {
    color: "error"
  }, Q.message), z6.default.createElement(h, {
    marginTop: 1
  }, z6.default.createElement(P, {
    color: "secondaryText"
  }, "Try running with --force to override checks"))))
}
// @from(Start 10186883, End 10187228)
Jk2 = {
  type: "local-jsx",
  name: "install",
  description: "Install Claude Code native build",
  argumentHint: "[options]",
  async call(A, B, Q) {
    let I = Q.includes("--force"),
      {
        unmount: G
      } = n5(z6.default.createElement(gq5, {
        onDone: () => {
          G(), A()
        },
        force: I
      }))
  }
}
// @from(Start 10187275, End 10187577)
function hq5() {
  let A = process.execArgv.some((Q) => /--inspect(-brk)?|--debug(-brk)?/.test(Q)),
    B = process.env.NODE_OPTIONS && /--inspect(-brk)?|--debug(-brk)?/.test(process.env.NODE_OPTIONS);
  try {
    return !!global.require("inspector").url() || A || B
  } catch {
    return A || B
  }
}
// @from(Start 10187607, End 10187968)
function cq5() {
  let A = ZA();
  j0({
    ...A,
    hasCompletedOnboarding: !0,
    lastOnboardingVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION
  })
}
// @from(Start 10187969, End 10190188)
async function lq5(A) {
  if (!1 === "true" || process.env.IS_DEMO) return !1;
  let B = ZA(),
    Q = !1;
  if (!B.theme || !B.hasCompletedOnboarding) Q = !0, await D3(), await new Promise((I) => {
    let {
      unmount: G
    } = n5(HB.default.createElement(c3, {
      onChangeAppState: NT
    }, HB.default.createElement(j0A, {
      onDone: async () => {
        cq5(), await D3(), G(), I()
      }
    })), {
      exitOnCtrlC: !1
    })
  });
  if (B.hasCompletedOnboarding && !B.hasSeenGAAnnounce && !Q && IE1()) await D3(), await new Promise((I) => {
    let {
      unmount: G
    } = n5(HB.default.createElement(c3, {
      onChangeAppState: NT
    }, HB.default.createElement(yy2, {
      onDismiss: async () => {
        let Z = ZA();
        j0({
          ...Z,
          hasSeenGAAnnounce: !0
        }), await D3(), G(), I()
      }
    })), {
      exitOnCtrlC: !1
    })
  });
  if (process.env.ANTHROPIC_API_KEY) {
    let I = CJ(process.env.ANTHROPIC_API_KEY);
    if (jG1(I) === "new") await new Promise((Z) => {
      let {
        unmount: D
      } = n5(HB.default.createElement(c3, {
        onChangeAppState: NT
      }, HB.default.createElement(Ow1, {
        customApiKeyTruncated: I,
        onDone: () => {
          D(), Z()
        }
      })), {
        exitOnCtrlC: !1
      })
    })
  }
  if (A !== "bypassPermissions" && process.env.CLAUBBIT !== "true") {
    if (!QD0()) await new Promise((I) => {
      let {
        unmount: G
      } = n5(HB.default.createElement(c3, null, HB.default.createElement(xy2, {
        onDone: () => {
          G(), I()
        }
      })), {
        exitOnCtrlC: !1
      })
    });
    if (await ny2(), await FU2()) await new Promise((I) => {
      let {
        unmount: G
      } = n5(HB.default.createElement(c3, null, HB.default.createElement(Yw1, {
        onDone: () => {
          G(), I()
        }
      })), {
        exitOnCtrlC: !1
      })
    })
  }
  if (A === "bypassPermissions" && !ZA().bypassPermissionsModeAccepted) await new Promise((I) => {
    let {
      unmount: G
    } = n5(HB.default.createElement(c3, null, HB.default.createElement(ay2, {
      onAccept: () => {
        G(), I()
      }
    })))
  });
  return Q
}
// @from(Start 10190190, End 10190310)
function iq5() {
  let A = ZA();
  j0({
    ...A,
    numStartups: (A.numStartups ?? 0) + 1
  }), nq5(), G9A()?.add(1)
}
// @from(Start 10190311, End 10190459)
async function nq5() {
  let [A, B] = await Promise.all([jz(), kn()]);
  E1("tengu_startup_telemetry", {
    is_git: A,
    worktree_count: B
  })
}
// @from(Start 10190461, End 10190515)
function aq5() {
  oy2(), ty2(), ey2(), Ak2(), hfA()
}
// @from(Start 10190516, End 10193544)
async function qT(A, B, Q, I) {
  let G = process.version.match(/^v(\d+)\./)?.[1];
  if (!G || parseInt(G) < 18) console.error(UA.bold.red("Error: Claude Code requires Node.js version 18 or higher.")), process.exit(1);
  let Z = $T2();
  if (Z.status === "restored") console.log(UA.yellow("Detected an interrupted iTerm2 setup. Your original settings have been restored. You may need to restart iTerm2 for the changes to take effect."));
  else if (Z.status === "failed") console.error(UA.red(`Failed to restore iTerm2 settings. Please manually restore your original settings with: defaults import com.googlecode.iterm2 ${Z.backupPath}.`));
  try {
    let J = await tz1();
    if (J.status === "restored") console.log(UA.yellow("Detected an interrupted Terminal.app setup. Your original settings have been restored. You may need to restart Terminal.app for the changes to take effect."));
    else if (J.status === "failed") console.error(UA.red(`Failed to restore Terminal.app settings. Please manually restore your original settings with: defaults import com.apple.Terminal ${J.backupPath}.`))
  } catch (J) {
    b1(J instanceof Error ? J : new Error(String(J)))
  }
  let D = Q ?? !1;
  EX(A), zX(), uy2(), cy2(), tP2(), JZ0(), J2A(), dz1(D), qW(), RE(), E_(), dS(), of1(), DJ1([], y9()), JE2(), W2A(), yE2().catch(b1), kT2();
  let Y = new AbortController;
  if (setTimeout(() => Y.abort(), 3000), D81(dA(), Y.signal, []), B === "bypassPermissions") {
    if (process.platform !== "win32" && typeof process.getuid === "function" && process.getuid() === 0) console.error("--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons"), process.exit(1)
  }
  let W = m9();
  if (W.lastCost !== void 0 && W.lastDuration !== void 0) E1("tengu_exit", {
    last_session_cost: W.lastCost,
    last_session_api_duration: W.lastAPIDuration,
    last_session_duration: W.lastDuration,
    last_session_lines_added: W.lastLinesAdded,
    last_session_lines_removed: W.lastLinesRemoved,
    last_session_total_input_tokens: W.lastTotalInputTokens,
    last_session_total_output_tokens: W.lastTotalOutputTokens,
    last_session_total_cache_creation_input_tokens: W.lastTotalCacheCreationInputTokens,
    last_session_total_cache_read_input_tokens: W.lastTotalCacheReadInputTokens,
    last_session_id: W.lastSessionId
  }), B5({
    ...W,
    lastCost: void 0,
    lastAPIDuration: void 0,
    lastDuration: void 0,
    lastLinesAdded: void 0,
    lastLinesRemoved: void 0,
    lastTotalInputTokens: void 0,
    lastTotalOutputTokens: void 0,
    lastTotalCacheCreationInputTokens: void 0,
    lastTotalCacheReadInputTokens: void 0,
    lastSessionId: void 0
  });
  if (W.pendingExitFeedback) {
    let J = W.pendingExitFeedback;
    E1("tengu_exit_feedback", {
      feedback_choice: J.feedbackChoice,
      feedback_details: J.feedbackDetails,
      last_session_id: J.sessionId,
      model: J.model
    }), B5({
      ...W,
      pendingExitFeedback: void 0
    })
  }
  if (!1) try {} catch {}
}
// @from(Start 10193545, End 10193955)
async function sq5() {
  if (process.argv[2] === "--ripgrep") {
    let B = process.argv.slice(3);
    process.exit(Ba0(B))
  }
  if (!process.env.CLAUDE_CODE_ENTRYPOINT) process.env.CLAUDE_CODE_ENTRYPOINT = "cli";
  process.on("exit", () => {
    eq5()
  }), process.on("SIGINT", () => {
    process.exit(0)
  });
  let A = Aa0();
  if (A instanceof Promise) await A;
  process.title = "claude", await tq5()
}