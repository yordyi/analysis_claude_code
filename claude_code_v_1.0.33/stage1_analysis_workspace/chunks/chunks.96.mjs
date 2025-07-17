
// @from(Start 9625376, End 9625793)
NX5 = n.strictObject({
    pattern: n.string().describe("The glob pattern to match files against"),
    path: n.string().optional().describe('The directory to search in. If not specified, the current working directory will be used. IMPORTANT: Omit this field to use the default directory. DO NOT enter "undefined" or "null" - simply omit it for the default behavior. Must be a valid directory path if provided.')
  })
// @from(Start 9625797, End 9627838)
g$ = {
    name: FJ1,
    async description() {
      return vc1
    },
    userFacingName() {
      return "Search"
    },
    isEnabled() {
      return !0
    },
    inputSchema: NX5,
    isConcurrencySafe() {
      return !0
    },
    isReadOnly() {
      return !0
    },
    getPath({
      path: A
    }) {
      return A || dA()
    },
    async checkPermissions(A, B) {
      return qz(g$, A, B.getToolPermissionContext())
    },
    async prompt() {
      return vc1
    },
    renderToolUseMessage({
      pattern: A,
      path: B
    }, {
      verbose: Q
    }) {
      if (!A) return null;
      let I = B ? wX5(B) ? B : UX5(dA(), B) : void 0,
        G = I ? EX5(dA(), I) : void 0;
      return `pattern: "${A}"${G||Q?`, path: "${Q?I:G}"`:""}`
    },
    renderToolUseRejectedMessage() {
      return W1A.default.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return W1A.default.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage: qy.renderToolResultMessage,
    async * call(A, {
      abortController: B,
      getToolPermissionContext: Q
    }) {
      let I = Date.now(),
        {
          files: G,
          truncated: Z
        } = await GvA(A.pattern, g$.getPath(A), {
          limit: 100,
          offset: 0
        }, B.signal, Q());
      yield {
        type: "result",
        data: {
          filenames: G,
          durationMs: Date.now() - I,
          numFiles: G.length,
          truncated: Z
        }
      }
    },
    mapToolResultToToolResultBlockParam(A, B) {
      if (A.filenames.length === 0) return {
        tool_use_id: B,
        type: "tool_result",
        content: "No files found"
      };
      return {
        tool_use_id: B,
        type: "tool_result",
        content: [...A.filenames, ...A.truncated ? ["(Results are truncated. Consider using a more specific path or pattern.)"] : []].join(`
`)
      }
    }
  }
// @from(Start 9627844, End 9627860)
NW = I1(U1(), 1)
// @from(Start 9627866, End 9627884)
HO2 = I1(CO2(), 1)
// @from(Start 9627890, End 9627903)
mz1 = new Map
// @from(Start 9627907, End 9627919)
zO2 = 900000
// @from(Start 9627922, End 9628043)
function qH5() {
  let A = Date.now();
  for (let [B, Q] of mz1.entries())
    if (A - Q.timestamp > zO2) mz1.delete(B)
}
// @from(Start 9628048, End 9628057)
MH5 = 250
// @from(Start 9628061, End 9628075)
LH5 = 10485760
// @from(Start 9628079, End 9628088)
KO2 = 1e5
// @from(Start 9628091, End 9628315)
function RH5(A) {
  if (A.length > MH5) return !1;
  let B;
  try {
    B = new URL(A)
  } catch {
    return !1
  }
  if (B.username || B.password) return !1;
  if (B.hostname.split(".").length < 2) return !1;
  return !0
}
// @from(Start 9628316, End 9628561)
async function OH5(A) {
  try {
    let B = await P4.get(`https://claude.ai/api/web/domain_info?domain=${encodeURIComponent(A)}`);
    if (B.status === 200) return B.data.can_fetch === !0;
    return !1
  } catch (B) {
    return b1(B), !1
  }
}
// @from(Start 9628563, End 9628915)
function TH5(A, B) {
  try {
    let Q = new URL(A),
      I = new URL(B);
    if (I.protocol !== Q.protocol) return !1;
    if (I.port !== Q.port) return !1;
    if (I.username || I.password) return !1;
    let G = (Y) => Y.replace(/^www\./, ""),
      Z = G(Q.hostname),
      D = G(I.hostname);
    return Z === D
  } catch (Q) {
    return !1
  }
}
// @from(Start 9628916, End 9629517)
async function wO2(A, B, Q) {
  try {
    return await P4.get(A, {
      signal: B,
      maxRedirects: 0,
      responseType: "arraybuffer",
      maxContentLength: LH5
    })
  } catch (I) {
    if (P4.isAxiosError(I) && I.response && [301, 302, 307, 308].includes(I.response.status)) {
      let G = I.response.headers.location;
      if (!G) throw new Error("Redirect missing Location header");
      let Z = new URL(G, A).toString();
      if (Q(A, Z)) return wO2(Z, B, Q);
      else throw new Error("Redirect not allowed. Only redirects to the same host are permitted.")
    }
    throw I
  }
}
// @from(Start 9629518, End 9630640)
async function EO2(A, B) {
  if (!RH5(A)) throw new Error("Invalid URL");
  qH5();
  let Q = Date.now(),
    I = mz1.get(A);
  if (I && Q - I.timestamp < zO2) return {
    bytes: I.bytes,
    code: I.code,
    codeText: I.codeText,
    content: I.content
  };
  let G, Z = A;
  try {
    if (G = new URL(A), G.protocol === "http:") G.protocol = "https:", Z = G.toString();
    let X = G.hostname;
    if (!await OH5(X)) throw new Error(`Domain ${X} is not allowed to be fetched`)
  } catch (X) {
    if (b1(X), X instanceof Error && X.message.includes("is not allowed to be fetched")) throw X
  }
  let D = await wO2(Z, B.signal, TH5),
    Y = Buffer.from(D.data).toString("utf-8"),
    W = D.headers["content-type"] ?? "",
    J = Buffer.byteLength(Y),
    F;
  if (W.includes("text/html")) F = new HO2.default().turndown(Y);
  else F = Y;
  if (F.length > KO2) F = F.substring(0, KO2) + "...[content truncated]";
  return mz1.set(A, {
    bytes: J,
    code: D.status,
    codeText: D.statusText,
    content: F,
    timestamp: Q
  }), {
    code: D.status,
    codeText: D.statusText,
    content: F,
    bytes: J
  }
}
// @from(Start 9630641, End 9631043)
async function UO2(A, B, Q, I) {
  let G = $a0(B, A),
    Z = await cZ({
      systemPrompt: [],
      userPrompt: G,
      isNonInteractiveSession: I,
      signal: Q,
      promptCategory: "web_fetch_apply"
    });
  if (Q.aborted) throw new NG;
  let {
    content: D
  } = Z.message;
  if (D.length > 0) {
    let Y = D[0];
    if ("text" in Y) return Y.text
  }
  return "No response from model"
}
// @from(Start 9631048, End 9631214)
PH5 = n.strictObject({
  url: n.string().url().describe("The URL to fetch content from"),
  prompt: n.string().describe("The prompt to run on the fetched content")
})
// @from(Start 9631217, End 9631470)
function SH5(A) {
  try {
    let B = $W.inputSchema.safeParse(A);
    if (!B.success) return `input:${A.toString()}`;
    let {
      url: Q
    } = B.data;
    return `domain:${new URL(Q).hostname}`
  } catch {
    return `input:${A.toString()}`
  }
}
// @from(Start 9631475, End 9634916)
$W = {
  name: IJ1,
  async description(A) {
    let {
      url: B
    } = A;
    try {
      return `Claude wants to fetch content from ${new URL(B).hostname}`
    } catch {
      return "Claude wants to fetch content from this URL"
    }
  },
  userFacingName() {
    return "Fetch"
  },
  isEnabled() {
    return !0
  },
  inputSchema: PH5,
  isConcurrencySafe() {
    return !0
  },
  isReadOnly() {
    return !0
  },
  async checkPermissions(A, B) {
    let Q = B.getToolPermissionContext(),
      I = SH5(A),
      G = Sv(Q, $W, "deny").get(I);
    if (G) return {
      behavior: "deny",
      message: `${$W.name} denied access to ${I}.`,
      decisionReason: {
        type: "rule",
        rule: G
      },
      ruleSuggestions: null
    };
    let Z = Sv(Q, $W, "allow").get(I);
    if (Z) return {
      behavior: "allow",
      updatedInput: A,
      decisionReason: {
        type: "rule",
        rule: Z
      }
    };
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${$W.name}, but you haven't granted it yet.`
    }
  },
  async prompt() {
    return Na0
  },
  async validateInput(A) {
    let {
      url: B
    } = A;
    try {
      new URL(B)
    } catch {
      return {
        result: !1,
        message: `Error: Invalid URL "${B}". The URL provided could not be parsed.`,
        meta: {
          reason: "invalid_url"
        },
        errorCode: 1
      }
    }
    return {
      result: !0
    }
  },
  renderToolUseMessage({
    url: A,
    prompt: B
  }, {
    verbose: Q
  }) {
    if (!A) return null;
    if (Q) return `url: "${A}"${Q&&B?`, prompt: "${B}"`:""}`;
    return A
  },
  renderToolUseRejectedMessage() {
    return NW.default.createElement(C5, null)
  },
  renderToolUseErrorMessage(A, {
    verbose: B
  }) {
    return NW.default.createElement(K6, {
      result: A,
      verbose: B
    })
  },
  renderToolUseProgressMessage() {
    return NW.default.createElement(w0, {
      height: 1
    }, NW.default.createElement(P, {
      color: "secondaryText"
    }, "Fetching…"))
  },
  renderToolResultMessage({
    bytes: A,
    code: B,
    codeText: Q,
    result: I
  }, G, {
    verbose: Z
  }) {
    let D = AL(A);
    if (Z) return NW.default.createElement(h, {
      flexDirection: "column"
    }, NW.default.createElement(w0, {
      height: 1
    }, NW.default.createElement(P, null, "Received ", NW.default.createElement(P, {
      bold: !0
    }, D), " (", B, " ", Q, ")")), NW.default.createElement(h, {
      flexDirection: "column"
    }, NW.default.createElement(P, null, I)));
    return NW.default.createElement(w0, {
      height: 1
    }, NW.default.createElement(P, null, "Received ", NW.default.createElement(P, {
      bold: !0
    }, D), " (", B, " ", Q, ")"))
  },
  async * call({
    url: A,
    prompt: B
  }, {
    abortController: Q,
    options: {
      isNonInteractiveSession: I
    }
  }) {
    let G = Date.now(),
      {
        content: Z,
        bytes: D,
        code: Y,
        codeText: W
      } = await EO2(A, Q),
      J = await UO2(B, Z, Q.signal, I);
    yield {
      type: "result",
      data: {
        bytes: D,
        code: Y,
        codeText: W,
        result: J,
        durationMs: Date.now() - G,
        url: A
      }
    }
  },
  mapToolResultToToolResultBlockParam({
    result: A
  }, B) {
    return {
      tool_use_id: B,
      type: "tool_result",
      content: A
    }
  }
}
// @from(Start 9634922, End 9634938)
iK = I1(U1(), 1)
// @from(Start 9634941, End 9635194)
function _H5(A) {
  try {
    let B = $W.inputSchema.safeParse(A);
    if (!B.success) return `input:${A.toString()}`;
    let {
      url: Q
    } = B.data;
    return `domain:${new URL(Q).hostname}`
  } catch {
    return `input:${A.toString()}`
  }
}
// @from(Start 9635196, End 9637330)
function NO2({
  setToolPermissionContext: A,
  toolUseConfirm: B,
  onDone: Q,
  onReject: I,
  verbose: G
}) {
  let [Z] = q9(), {
    url: D
  } = B.input, Y = new URL(D).hostname, W = iK.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);
  Bz1(B, W);
  let J = [{
    label: "Yes",
    value: "yes"
  }, {
    label: `Yes, and don't ask again for ${UA.bold(Y)}`,
    value: "yes-dont-ask-again-domain"
  }, {
    label: `No, and tell Claude what to do differently (${UA.bold.dim("esc")})`,
    value: "no"
  }];

  function F(X) {
    switch (X) {
      case "yes":
        tO("tool_use_single", B, "accept"), B.onAllow("temporary", B.input), Q();
        break;
      case "yes-dont-ask-again-domain":
        tO("tool_use_single", B, "accept"), f81({
          rule: {
            ruleBehavior: "allow",
            ruleValue: {
              toolName: B.tool.name,
              ruleContent: _H5(B.input)
            },
            source: "localSettings"
          },
          initialContext: B.toolUseContext.getToolPermissionContext(),
          setToolPermissionContext: A
        }).then(() => {
          B.onAllow("permanent", B.input), Q()
        });
        break;
      case "no":
        tO("tool_use_single", B, "reject"), B.onReject(), I(), Q();
        break
    }
  }
  return iK.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, iK.default.createElement(mI, {
    title: "Fetch"
  }), iK.default.createElement(h, {
    flexDirection: "column",
    paddingX: 2,
    paddingY: 1
  }, iK.default.createElement(P, null, $W.renderToolUseMessage(B.input, {
    theme: Z,
    verbose: G
  })), iK.default.createElement(P, {
    color: "secondaryText"
  }, B.description)), iK.default.createElement(h, {
    flexDirection: "column"
  }, iK.default.createElement(P, null, "Do you want to allow Claude to fetch this content?"), iK.default.createElement(p0, {
    options: J,
    onChange: F,
    onCancel: () => F("no")
  })))
}
// @from(Start 9637335, End 9637351)
$E = I1(U1(), 1)
// @from(Start 9637399, End 9637415)
PB = I1(U1(), 1)
// @from(Start 9637419, End 9637435)
ru = I1(U1(), 1)
// @from(Start 9637480, End 9639997)
function $O2({
  notebook_path: A,
  cell_id: B,
  new_source: Q,
  cell_type: I,
  edit_mode: G = "replace",
  verbose: Z,
  width: D
}) {
  let Y = ru.useMemo(() => x1().existsSync(A), [A]),
    W = ru.useMemo(() => {
      if (!Y) return null;
      try {
        let C = wI(A);
        return Z8(C)
      } catch (C) {
        return null
      }
    }, [A, Y]),
    J = ru.useMemo(() => {
      if (!W || !B) return "";
      let C = Yu(B);
      if (C !== void 0) {
        if (W.cells[C]) {
          let E = W.cells[C].source;
          return Array.isArray(E) ? E.join("") : E
        }
        return ""
      }
      let K = W.cells.find((E) => E.id === B);
      if (!K) return "";
      return Array.isArray(K.source) ? K.source.join("") : K.source
    }, [W, B]),
    F = ru.useMemo(() => {
      if (!W || !W.metadata.language_info) return "python";
      return W.metadata.language_info.name || "python"
    }, [W]),
    X = ru.useMemo(() => {
      if (!Y || G === "insert" || G === "delete") return null;
      return iJ({
        filePath: A,
        fileContents: J,
        edits: [{
          old_string: J,
          new_string: Q,
          replace_all: !1
        }],
        ignoreWhitespace: !1
      })
    }, [Y, A, J, Q, G]),
    V;
  switch (G) {
    case "insert":
      V = "Insert new cell";
      break;
    case "delete":
      V = "Delete cell";
      break;
    default:
      V = "Replace cell contents"
  }
  return PB.createElement(h, {
    flexDirection: "column"
  }, PB.createElement(h, {
    borderColor: "secondaryBorder",
    borderStyle: "round",
    flexDirection: "column",
    paddingX: 1
  }, PB.createElement(h, {
    paddingBottom: 1,
    flexDirection: "column"
  }, PB.createElement(P, {
    bold: !0
  }, Z ? A : jH5(dA(), A)), PB.createElement(P, {
    color: "secondaryText"
  }, V, " for cell ", B, I ? ` (${I})` : "")), G === "delete" ? PB.createElement(h, {
    flexDirection: "column",
    paddingLeft: 2
  }, PB.createElement(YW, {
    code: J,
    language: F
  })) : G === "insert" ? PB.createElement(h, {
    flexDirection: "column",
    paddingLeft: 2
  }, PB.createElement(YW, {
    code: Q,
    language: I === "markdown" ? "markdown" : F
  })) : X ? FW(X.map((C) => PB.createElement(XW, {
    key: C.newStart,
    patch: C,
    dim: !1,
    width: D
  })), (C) => PB.createElement(P, {
    color: "secondaryText",
    key: `ellipsis-${C}`
  }, "...")) : PB.createElement(YW, {
    code: Q,
    language: I === "markdown" ? "markdown" : F
  })))
}
// @from(Start 9639999, End 9640302)
function kH5(A, B) {
  let Q = eF(A, B) ? [{
    label: "Yes, and don't ask again this session",
    value: "yes-dont-ask-again"
  }] : [];
  return [{
    label: "Yes",
    value: "yes"
  }, ...Q, {
    label: `No, and tell Claude what to do differently (${UA.bold.dim("esc")})`,
    value: "no"
  }]
}
// @from(Start 9640304, End 9642993)
function qO2({
  setToolPermissionContext: A,
  toolUseConfirm: B,
  onDone: Q,
  onReject: I,
  verbose: G
}) {
  let {
    columns: Z
  } = c9(), D = iO.inputSchema.safeParse(B.input), Y = D.success ? D.data : null, W = Y?.cell_type === "markdown" ? "markdown" : "python", J = $E.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: W
  }), [W]);
  if (KV(B, J), !Y) return b1(new Error(`Failed to parse notebook edit input: ${D.success?"unknown error":D.error.message}`)), null;
  let F = Y.edit_mode === "insert" ? "insert this cell into" : Y.edit_mode === "delete" ? "delete this cell from" : "make this edit to";

  function X(V) {
    switch (V) {
      case "yes":
        o5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: W,
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), Q(), B.onAllow("temporary", B.input);
        break;
      case "yes-dont-ask-again":
        o5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: W,
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), A({
          ...B.toolUseContext.getToolPermissionContext(),
          mode: "acceptEdits"
        }), Q(), B.onAllow("permanent", B.input);
        break;
      case "no":
        o5({
          completion_type: "tool_use_single",
          event: "reject",
          metadata: {
            language_name: W,
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), Q(), I(), B.onReject();
        break
    }
  }
  return $E.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, $E.default.createElement(mI, {
    title: `${Y.edit_mode==="insert"?"Insert cell":Y.edit_mode==="delete"?"Delete cell":"Edit cell"}`
  }), $E.default.createElement($O2, {
    notebook_path: Y.notebook_path,
    cell_id: Y.cell_id,
    new_source: Y.new_source,
    cell_type: Y.cell_type,
    edit_mode: Y.edit_mode,
    verbose: G,
    width: Z - 12
  }), $E.default.createElement(h, {
    flexDirection: "column"
  }, $E.default.createElement(P, null, "Do you want to ", F, " ", $E.default.createElement(P, {
    bold: !0
  }, yH5(Y.notebook_path)), "?"), $E.default.createElement(p0, {
    options: kH5(Y.notebook_path, B.toolUseContext.getToolPermissionContext()),
    onCancel: () => X("no"),
    onChange: X
  })))
}
// @from(Start 9642998, End 9643014)
nK = I1(U1(), 1)
// @from(Start 9643059, End 9646185)
function MO2({
  setToolPermissionContext: A,
  toolUseConfirm: B,
  toolUseContext: Q,
  onDone: I,
  onReject: G,
  verbose: Z
}) {
  let D = S$.inputSchema.parse(B.input),
    Y = D.file_path,
    W = D.edits.map((E) => ({
      old_string: E.old_string,
      new_string: E.new_string,
      replace_all: E.replace_all ?? !1
    })),
    J = B.toolUseContext.getToolPermissionContext(),
    F = nK.useMemo(() => ({
      completion_type: "str_replace_multi",
      language_name: $G(Y)
    }), [Y]);
  KV(B, F), Z0((E, N) => {
    if (N.tab && N.shift && eJ(Y, J).filter((q) => q.value === "yes-dont-ask-again").length > 0) {
      X("yes-dont-ask-again", {
        file_path: Y,
        edits: W
      });
      return
    }
  });

  function X(E, {
    file_path: N,
    edits: q
  }) {
    switch (V(), E) {
      case "yes":
        o5({
          completion_type: "str_replace_multi",
          event: "accept",
          metadata: {
            language_name: $G(N),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), I(), B.onAllow("temporary", {
          file_path: N,
          edits: q
        });
        break;
      case "yes-dont-ask-again": {
        o5({
          completion_type: "str_replace_multi",
          event: "accept",
          metadata: {
            language_name: $G(N),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        });
        let O = B.toolUseContext.getToolPermissionContext();
        eO(N, "edit", O, A), I(), B.onAllow("permanent", {
          file_path: N,
          edits: q
        });
        break
      }
      case "no":
        o5({
          completion_type: "str_replace_multi",
          event: "reject",
          metadata: {
            language_name: $G(N),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), I(), G(), B.onReject();
        break
    }
  }
  let {
    closeTabInIDE: V,
    showingDiffInIDE: C,
    ideName: K
  } = ku({
    onChange: X,
    toolUseContext: Q,
    filePath: Y,
    edits: W,
    editMode: "multiple"
  });
  if (C) return nK.default.createElement(xu, {
    onChange: X,
    options: eJ(Y, J),
    file_path: Y,
    input: {
      file_path: Y,
      edits: W
    },
    ideName: K
  });
  return nK.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, nK.default.createElement(mI, {
    title: "Edit file"
  }), nK.default.createElement(Az1, {
    file_path: Y,
    edits: W,
    verbose: Z
  }), nK.default.createElement(h, {
    flexDirection: "column"
  }, nK.default.createElement(P, null, "Do you want to make this edit to", " ", nK.default.createElement(P, {
    bold: !0
  }, xH5(Y)), "?"), nK.default.createElement(p0, {
    options: eJ(Y, J),
    onChange: (E) => X(E, {
      file_path: Y,
      edits: W
    }),
    onCancel: () => X("no", {
      file_path: Y,
      edits: W
    })
  })))
}
// @from(Start 9646190, End 9646206)
qE = I1(U1(), 1)
// @from(Start 9646209, End 9647500)
function LO2({
  toolUseConfirm: A,
  setToolPermissionContext: B,
  onDone: Q,
  onReject: I
}) {
  let [G] = q9();

  function Z(D) {
    if (D === "yes") B({
      ...A.toolUseContext.getToolPermissionContext(),
      mode: "acceptEdits"
    }), Q(), A.onAllow("temporary", A.input);
    else Q(), I(), A.onReject()
  }
  return qE.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "planMode",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, qE.default.createElement(mI, {
    title: "Ready to code?"
  }), qE.default.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, qE.default.createElement(P, null, "Here is Claude's plan:"), qE.default.createElement(h, {
    borderStyle: "round",
    borderColor: "secondaryText",
    marginBottom: 1,
    paddingX: 1
  }, qE.default.createElement(P, null, kK(A.input.plan, G))), qE.default.createElement(P, {
    color: "secondaryText"
  }, "Would you like to proceed?"), qE.default.createElement(h, {
    marginTop: 1
  }, qE.default.createElement(p0, {
    options: [{
      label: "Yes",
      value: "yes"
    }, {
      label: "No, keep planning",
      value: "no"
    }],
    onChange: (D) => Z(D),
    onCancel: () => Z("no")
  }))))
}
// @from(Start 9647502, End 9647871)
function fH5(A) {
  switch (A) {
    case gI:
      return fq2;
    case S$:
      return MO2;
    case nJ:
      return lq2;
    case E4:
      return mq2;
    case $W:
      return NO2;
    case iO:
      return qO2;
    case hO:
      return LO2;
    case g$:
    case qy:
    case WE:
    case OB:
    case J11:
      return iq2;
    default:
      return Qz1
  }
}
// @from(Start 9647873, End 9648362)
function RO2({
  toolUseConfirm: A,
  toolUseContext: B,
  onDone: Q,
  onReject: I,
  verbose: G,
  setToolPermissionContext: Z
}) {
  Z0((W, J) => {
    if (J.ctrl && W === "c") Q(), I(), A.onReject()
  });
  let D = A.tool.userFacingName(A.input);
  pq2(`Claude needs your permission to use ${D}`);
  let Y = fH5(A.tool);
  return _AA.createElement(Y, {
    toolUseContext: B,
    toolUseConfirm: A,
    onDone: Q,
    onReject: I,
    verbose: G,
    setToolPermissionContext: Z
  })
}
// @from(Start 9648457, End 9648471)
OO2 = bH5(vH5)
// @from(Start 9648473, End 9649972)
async function gH5(A) {
  if (mA.platform === "win32") return [];
  if (!await jz()) return [];
  try {
    let B = "",
      {
        stdout: Q
      } = await OO2("git log -n 1000 --pretty=format: --name-only --diff-filter=M --author=$(git config user.email) | sort | uniq -c | sort -nr | head -n 20", {
        cwd: dA(),
        encoding: "utf8"
      });
    if (B = `Files modified by user:
` + Q, Q.split(`
`).length < 10) {
      let {
        stdout: D
      } = await OO2("git log -n 1000 --pretty=format: --name-only --diff-filter=M | sort | uniq -c | sort -nr | head -n 20", {
        cwd: dA(),
        encoding: "utf8"
      });
      B += `

Files modified by other users:
` + D
    }
    let G = (await cZ({
      systemPrompt: ["You are an expert at analyzing git history. Given a list of files and their modification counts, return exactly five filenames that are frequently modified and represent core application logic (not auto-generated files, dependencies, or configuration). Make sure filenames are diverse, not all in the same folder, and are a mix of user and other users. Return only the filenames' basenames (without the path) separated by newlines with no explanation."],
      userPrompt: B,
      isNonInteractiveSession: A,
      promptCategory: "frequently_modified"
    })).message.content[0];
    if (!G || G.type !== "text") return [];
    let Z = G.text.trim().split(`
`);
    if (Z.length < 5) return [];
    return Z
  } catch (B) {
    return b1(B), []
  }
}
// @from(Start 9649977, End 9650581)
dz1 = L0(async (A) => {
  let B = m9(),
    Q = Date.now(),
    I = B.exampleFilesGeneratedAt ?? 0,
    G = 604800000;
  if (Q - I > 604800000) B.exampleFiles = [];
  if (!B.exampleFiles?.length) gH5(A).then((D) => {
    if (D.length) B5({
      ...m9(),
      exampleFiles: D,
      exampleFilesGeneratedAt: Date.now()
    })
  });
  let Z = B.exampleFiles?.length ? EP(B.exampleFiles) : "<filepath>";
  return ["fix lint errors", "fix typecheck errors", `how does ${Z} work?`, `refactor ${Z}`, "how do I log an error?", `edit ${Z} to...`, `write a test for ${Z}`, "create a util logging.py that..."]
})
// @from(Start 9650587, End 9650603)
z8 = I1(U1(), 1)
// @from(Start 9650609, End 9650626)
kAA = I1(U1(), 1)
// @from(Start 9650632, End 9650641)
hH5 = 100
// @from(Start 9650644, End 9650710)
function uz1(A) {
  return (A.match(/\r\n|\r|\n/g) || []).length
}
// @from(Start 9650712, End 9650777)
function yAA(A, B) {
  return `[Pasted text #${A} +${B} lines]`
}
// @from(Start 9650779, End 9650823)
function PO2(A) {
  return `[Image #${A}]`
}
// @from(Start 9650825, End 9650899)
function mH5(A, B) {
  return `[...Truncated text #${A} +${B} lines...]`
}
// @from(Start 9650901, End 9651127)
function SO2(A) {
  let B = /\[(Pasted text|Image|\.\.\.Truncated text) #(\d+)(?: \+\d+ lines)?(\.)*\]/g;
  return [...A.matchAll(B)].map((I) => ({
    id: parseInt(I[2] || "0"),
    match: I[0]
  })).filter((I) => I.id > 0)
}
// @from(Start 9651129, End 9651179)
function jAA(A) {
  return typeof A !== "string"
}
// @from(Start 9651181, End 9651227)
function dH5() {
  return m9().history ?? []
}
// @from(Start 9651229, End 9652288)
function pz1() {
  let A = [];
  for (let B of dH5()) {
    if (!jAA(B)) {
      A.push({
        display: B,
        pastedContents: {}
      });
      continue
    }
    if (B.pastedText) {
      let I = uz1(B.pastedText),
        G = /\[Pasted text \+([0-9]+) lines\]/g,
        Z, D = !1;
      while ((Z = G.exec(B.display)) !== null)
        if (Number(Z[1]) === I) {
          let W = B.display.replace(Z[0], yAA(1, I));
          A.push({
            display: W,
            pastedContents: {
              [1]: {
                id: 1,
                type: "text",
                content: B.pastedText
              }
            }
          }), D = !0;
          break
        } if (!D) A.push({
        display: B.display,
        pastedContents: {}
      });
      continue
    }
    let Q = {};
    if (B.pastedContents) Q = Object.fromEntries(Object.entries(B.pastedContents).map(([I, G]) => [Number(I), G]).filter(([I]) => I !== void 0 && Number(I) > 0));
    A.push({
      display: B.display,
      pastedContents: Q
    })
  }
  return A
}
// @from(Start 9652290, End 9652585)
function uH5(A, B) {
  if (!A || !B) return !A && !B;
  let Q = Object.keys(A).map(Number),
    I = Object.keys(B).map(Number);
  if (Q.length !== I.length) return !1;
  for (let G of Q) {
    let Z = A[G],
      D = B[G];
    if (!Z || !D || Z.content !== D.content) return !1
  }
  return !0
}
// @from(Start 9652587, End 9652725)
function pH5(A, B) {
  if (jAA(A) && jAA(B)) return A.display === B.display && uH5(A.pastedContents, B.pastedContents);
  return A === B
}
// @from(Start 9652730, End 9652739)
cH5 = 1e4
// @from(Start 9652743, End 9652753)
TO2 = 1000
// @from(Start 9652756, End 9653098)
function _O2(A, B) {
  if (A.length <= cH5) return {
    truncatedText: A,
    placeholderContent: ""
  };
  let Q = Math.floor(TO2 / 2),
    I = Math.floor(TO2 / 2),
    G = A.slice(0, Q),
    Z = A.slice(-I),
    D = A.slice(Q, -I),
    Y = uz1(D),
    J = mH5(B, Y);
  return {
    truncatedText: G + J + Z,
    placeholderContent: D
  }
}
// @from(Start 9653100, End 9653338)
function GT(A) {
  let B = m9(),
    Q = pz1(),
    I = typeof A === "string" ? {
      display: A,
      pastedContents: {}
    } : A;
  if (Q[0] && pH5(Q[0], I)) return;
  Q.unshift(I), B5({
    ...B,
    history: Q.slice(0, hH5)
  })
}
// @from(Start 9653340, End 9654362)
function jO2(A, B, Q, I) {
  let [G, Z] = kAA.useState(0), [D, Y] = kAA.useState(void 0), W = (K) => {
    if (K.startsWith("!")) return "bash";
    if (K.startsWith("#")) return "memory";
    return "prompt"
  }, J = (K, E, N, q = !1) => {
    A(K, E, N), I?.(q ? 0 : K.length)
  }, F = (K, E = !1) => {
    if (!K) return;
    let N = W(K.display),
      q = N === "bash" || N === "memory" ? K.display.slice(1) : K.display;
    J(q, N, K.pastedContents, E)
  };

  function X() {
    let K = pz1();
    if (G >= K.length) return;
    if (G === 0) {
      let E = B.trim() !== "";
      Y(E ? {
        display: B,
        pastedContents: Q
      } : void 0)
    }
    Z(G + 1), F(K[G], !0)
  }

  function V() {
    if (G > 1) Z(G - 1), F(pz1()[G - 2]);
    else if (G === 1)
      if (Z(0), D) F(D);
      else J("", "prompt", {});
    return G <= 0
  }

  function C() {
    Y(void 0), Z(0)
  }
  return {
    historyIndex: G,
    setHistoryIndex: Z,
    onHistoryUp: X,
    onHistoryDown: V,
    resetHistory: C
  }
}
// @from(Start 9654367, End 9654383)
oK = I1(U1(), 1)
// @from(Start 9654386, End 9654477)
function u$(A) {
  return !Array.isArray ? hO2(A) === "[object Array]" : Array.isArray(A)
}
// @from(Start 9654482, End 9654493)
lH5 = 1 / 0
// @from(Start 9654496, End 9654617)
function iH5(A) {
  if (typeof A == "string") return A;
  let B = A + "";
  return B == "0" && 1 / A == -lH5 ? "-0" : B
}
// @from(Start 9654619, End 9654671)
function nH5(A) {
  return A == null ? "" : iH5(A)
}
// @from(Start 9654673, End 9654722)
function ME(A) {
  return typeof A === "string"
}
// @from(Start 9654724, End 9654774)
function bO2(A) {
  return typeof A === "number"
}
// @from(Start 9654776, End 9654867)
function aH5(A) {
  return A === !0 || A === !1 || sH5(A) && hO2(A) == "[object Boolean]"
}
// @from(Start 9654869, End 9654919)
function gO2(A) {
  return typeof A === "object"
}
// @from(Start 9654921, End 9654970)
function sH5(A) {
  return gO2(A) && A !== null
}
// @from(Start 9654972, End 9655026)
function IF(A) {
  return A !== void 0 && A !== null
}
// @from(Start 9655028, End 9655073)
function xAA(A) {
  return !A.trim().length
}
// @from(Start 9655075, End 9655205)
function hO2(A) {
  return A == null ? A === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(A)
}
// @from(Start 9655210, End 9655240)
rH5 = "Incorrect 'index' type"
// @from(Start 9655244, End 9655285)
oH5 = (A) => `Invalid value for key ${A}`
// @from(Start 9655289, End 9655339)
tH5 = (A) => `Pattern length exceeds max of ${A}.`
// @from(Start 9655343, End 9655386)
eH5 = (A) => `Missing ${A} property in key`
// @from(Start 9655390, End 9655463)
Az5 = (A) => `Property 'weight' in key '${A}' must be a positive integer`
// @from(Start 9655467, End 9655504)
yO2 = Object.prototype.hasOwnProperty
// @from(Start 9655506, End 9655903)
class mO2 {
  constructor(A) {
    this._keys = [], this._keyMap = {};
    let B = 0;
    A.forEach((Q) => {
      let I = dO2(Q);
      this._keys.push(I), this._keyMap[I.id] = I, B += I.weight
    }), this._keys.forEach((Q) => {
      Q.weight /= B
    })
  }
  get(A) {
    return this._keyMap[A]
  }
  keys() {
    return this._keys
  }
  toJSON() {
    return JSON.stringify(this._keys)
  }
}
// @from(Start 9655905, End 9656360)
function dO2(A) {
  let B = null,
    Q = null,
    I = null,
    G = 1,
    Z = null;
  if (ME(A) || u$(A)) I = A, B = kO2(A), Q = fAA(A);
  else {
    if (!yO2.call(A, "name")) throw new Error(eH5("name"));
    let D = A.name;
    if (I = D, yO2.call(A, "weight")) {
      if (G = A.weight, G <= 0) throw new Error(Az5(D))
    }
    B = kO2(D), Q = fAA(D), Z = A.getFn
  }
  return {
    path: B,
    id: Q,
    weight: G,
    src: I,
    getFn: Z
  }
}
// @from(Start 9656362, End 9656415)
function kO2(A) {
  return u$(A) ? A : A.split(".")
}
// @from(Start 9656417, End 9656469)
function fAA(A) {
  return u$(A) ? A.join(".") : A
}
// @from(Start 9656471, End 9656991)
function Bz5(A, B) {
  let Q = [],
    I = !1,
    G = (Z, D, Y) => {
      if (!IF(Z)) return;
      if (!D[Y]) Q.push(Z);
      else {
        let W = D[Y],
          J = Z[W];
        if (!IF(J)) return;
        if (Y === D.length - 1 && (ME(J) || bO2(J) || aH5(J))) Q.push(nH5(J));
        else if (u$(J)) {
          I = !0;
          for (let F = 0, X = J.length; F < X; F += 1) G(J[F], D, Y + 1)
        } else if (D.length) G(J, D, Y + 1)
      }
    };
  return G(A, ME(B) ? B.split(".") : B, 0), I ? Q : Q[0]
}
// @from(Start 9656996, End 9657081)
Qz5 = {
    includeMatches: !1,
    findAllMatches: !1,
    minMatchCharLength: 1
  }
// @from(Start 9657085, End 9657273)
Iz5 = {
    isCaseSensitive: !1,
    includeScore: !1,
    keys: [],
    shouldSort: !0,
    sortFn: (A, B) => A.score === B.score ? A.idx < B.idx ? -1 : 1 : A.score < B.score ? -1 : 1
  }
// @from(Start 9657277, End 9657343)
Gz5 = {
    location: 0,
    threshold: 0.6,
    distance: 100
  }
// @from(Start 9657347, End 9657473)
Zz5 = {
    useExtendedSearch: !1,
    getFn: Bz5,
    ignoreLocation: !1,
    ignoreFieldNorm: !1,
    fieldNormWeight: 1
  }
// @from(Start 9657477, End 9657534)
M4 = {
    ...Iz5,
    ...Qz5,
    ...Gz5,
    ...Zz5
  }
// @from(Start 9657538, End 9657552)
Dz5 = /[^ ]+/g
// @from(Start 9657555, End 9657887)
function Yz5(A = 1, B = 3) {
  let Q = new Map,
    I = Math.pow(10, B);
  return {
    get(G) {
      let Z = G.match(Dz5).length;
      if (Q.has(Z)) return Q.get(Z);
      let D = 1 / Math.pow(Z, 0.5 * A),
        Y = parseFloat(Math.round(D * I) / I);
      return Q.set(Z, Y), Y
    },
    clear() {
      Q.clear()
    }
  }
}
// @from(Start 9657888, End 9660162)
class iz1 {
  constructor({
    getFn: A = M4.getFn,
    fieldNormWeight: B = M4.fieldNormWeight
  } = {}) {
    this.norm = Yz5(B, 3), this.getFn = A, this.isCreated = !1, this.setIndexRecords()
  }
  setSources(A = []) {
    this.docs = A
  }
  setIndexRecords(A = []) {
    this.records = A
  }
  setKeys(A = []) {
    this.keys = A, this._keysMap = {}, A.forEach((B, Q) => {
      this._keysMap[B.id] = Q
    })
  }
  create() {
    if (this.isCreated || !this.docs.length) return;
    if (this.isCreated = !0, ME(this.docs[0])) this.docs.forEach((A, B) => {
      this._addString(A, B)
    });
    else this.docs.forEach((A, B) => {
      this._addObject(A, B)
    });
    this.norm.clear()
  }
  add(A) {
    let B = this.size();
    if (ME(A)) this._addString(A, B);
    else this._addObject(A, B)
  }
  removeAt(A) {
    this.records.splice(A, 1);
    for (let B = A, Q = this.size(); B < Q; B += 1) this.records[B].i -= 1
  }
  getValueForItemAtKeyId(A, B) {
    return A[this._keysMap[B]]
  }
  size() {
    return this.records.length
  }
  _addString(A, B) {
    if (!IF(A) || xAA(A)) return;
    let Q = {
      v: A,
      i: B,
      n: this.norm.get(A)
    };
    this.records.push(Q)
  }
  _addObject(A, B) {
    let Q = {
      i: B,
      $: {}
    };
    this.keys.forEach((I, G) => {
      let Z = I.getFn ? I.getFn(A) : this.getFn(A, I.path);
      if (!IF(Z)) return;
      if (u$(Z)) {
        let D = [],
          Y = [{
            nestedArrIndex: -1,
            value: Z
          }];
        while (Y.length) {
          let {
            nestedArrIndex: W,
            value: J
          } = Y.pop();
          if (!IF(J)) continue;
          if (ME(J) && !xAA(J)) {
            let F = {
              v: J,
              i: W,
              n: this.norm.get(J)
            };
            D.push(F)
          } else if (u$(J)) J.forEach((F, X) => {
            Y.push({
              nestedArrIndex: X,
              value: F
            })
          })
        }
        Q.$[G] = D
      } else if (ME(Z) && !xAA(Z)) {
        let D = {
          v: Z,
          n: this.norm.get(Z)
        };
        Q.$[G] = D
      }
    }), this.records.push(Q)
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    }
  }
}
// @from(Start 9660164, End 9660387)
function uO2(A, B, {
  getFn: Q = M4.getFn,
  fieldNormWeight: I = M4.fieldNormWeight
} = {}) {
  let G = new iz1({
    getFn: Q,
    fieldNormWeight: I
  });
  return G.setKeys(A.map(dO2)), G.setSources(B), G.create(), G
}
// @from(Start 9660389, End 9660632)
function Wz5(A, {
  getFn: B = M4.getFn,
  fieldNormWeight: Q = M4.fieldNormWeight
} = {}) {
  let {
    keys: I,
    records: G
  } = A, Z = new iz1({
    getFn: B,
    fieldNormWeight: Q
  });
  return Z.setKeys(I), Z.setIndexRecords(G), Z
}
// @from(Start 9660634, End 9660919)
function cz1(A, {
  errors: B = 0,
  currentLocation: Q = 0,
  expectedLocation: I = 0,
  distance: G = M4.distance,
  ignoreLocation: Z = M4.ignoreLocation
} = {}) {
  let D = B / A.length;
  if (Z) return D;
  let Y = Math.abs(I - Q);
  if (!G) return Y ? 1 : D;
  return D + Y / G
}
// @from(Start 9660921, End 9661279)
function Jz5(A = [], B = M4.minMatchCharLength) {
  let Q = [],
    I = -1,
    G = -1,
    Z = 0;
  for (let D = A.length; Z < D; Z += 1) {
    let Y = A[Z];
    if (Y && I === -1) I = Z;
    else if (!Y && I !== -1) {
      if (G = Z - 1, G - I + 1 >= B) Q.push([I, G]);
      I = -1
    }
  }
  if (A[Z - 1] && Z - I >= B) Q.push([I, Z - 1]);
  return Q
}
// @from(Start 9661284, End 9661291)
jy = 32
// @from(Start 9661294, End 9663499)
function Fz5(A, B, Q, {
  location: I = M4.location,
  distance: G = M4.distance,
  threshold: Z = M4.threshold,
  findAllMatches: D = M4.findAllMatches,
  minMatchCharLength: Y = M4.minMatchCharLength,
  includeMatches: W = M4.includeMatches,
  ignoreLocation: J = M4.ignoreLocation
} = {}) {
  if (B.length > jy) throw new Error(tH5(jy));
  let F = B.length,
    X = A.length,
    V = Math.max(0, Math.min(I, X)),
    C = Z,
    K = V,
    E = Y > 1 || W,
    N = E ? Array(X) : [],
    q;
  while ((q = A.indexOf(B, K)) > -1) {
    let k = cz1(B, {
      currentLocation: q,
      expectedLocation: V,
      distance: G,
      ignoreLocation: J
    });
    if (C = Math.min(k, C), K = q + F, E) {
      let i = 0;
      while (i < F) N[q + i] = 1, i += 1
    }
  }
  K = -1;
  let O = [],
    R = 1,
    T = F + X,
    L = 1 << F - 1;
  for (let k = 0; k < F; k += 1) {
    let i = 0,
      x = T;
    while (i < x) {
      if (cz1(B, {
          errors: k,
          currentLocation: V + x,
          expectedLocation: V,
          distance: G,
          ignoreLocation: J
        }) <= C) i = x;
      else T = x;
      x = Math.floor((T - i) / 2 + i)
    }
    T = x;
    let s = Math.max(1, V - x + 1),
      d = D ? X : Math.min(V + x, X) + F,
      F1 = Array(d + 2);
    F1[d + 1] = (1 << k) - 1;
    for (let v = d; v >= s; v -= 1) {
      let D1 = v - 1,
        N1 = Q[A.charAt(D1)];
      if (E) N[D1] = +!!N1;
      if (F1[v] = (F1[v + 1] << 1 | 1) & N1, k) F1[v] |= (O[v + 1] | O[v]) << 1 | 1 | O[v + 1];
      if (F1[v] & L) {
        if (R = cz1(B, {
            errors: k,
            currentLocation: D1,
            expectedLocation: V,
            distance: G,
            ignoreLocation: J
          }), R <= C) {
          if (C = R, K = D1, K <= V) break;
          s = Math.max(1, 2 * V - K)
        }
      }
    }
    if (cz1(B, {
        errors: k + 1,
        currentLocation: V,
        expectedLocation: V,
        distance: G,
        ignoreLocation: J
      }) > C) break;
    O = F1
  }
  let _ = {
    isMatch: K >= 0,
    score: Math.max(0.001, R)
  };
  if (E) {
    let k = Jz5(N, Y);
    if (!k.length) _.isMatch = !1;
    else if (W) _.indices = k
  }
  return _
}
// @from(Start 9663501, End 9663663)
function Xz5(A) {
  let B = {};
  for (let Q = 0, I = A.length; Q < I; Q += 1) {
    let G = A.charAt(Q);
    B[G] = (B[G] || 0) | 1 << I - Q - 1
  }
  return B
}
// @from(Start 9663664, End 9665863)
class dAA {
  constructor(A, {
    location: B = M4.location,
    threshold: Q = M4.threshold,
    distance: I = M4.distance,
    includeMatches: G = M4.includeMatches,
    findAllMatches: Z = M4.findAllMatches,
    minMatchCharLength: D = M4.minMatchCharLength,
    isCaseSensitive: Y = M4.isCaseSensitive,
    ignoreLocation: W = M4.ignoreLocation
  } = {}) {
    if (this.options = {
        location: B,
        threshold: Q,
        distance: I,
        includeMatches: G,
        findAllMatches: Z,
        minMatchCharLength: D,
        isCaseSensitive: Y,
        ignoreLocation: W
      }, this.pattern = Y ? A : A.toLowerCase(), this.chunks = [], !this.pattern.length) return;
    let J = (X, V) => {
        this.chunks.push({
          pattern: X,
          alphabet: Xz5(X),
          startIndex: V
        })
      },
      F = this.pattern.length;
    if (F > jy) {
      let X = 0,
        V = F % jy,
        C = F - V;
      while (X < C) J(this.pattern.substr(X, jy), X), X += jy;
      if (V) {
        let K = F - jy;
        J(this.pattern.substr(K), K)
      }
    } else J(this.pattern, 0)
  }
  searchIn(A) {
    let {
      isCaseSensitive: B,
      includeMatches: Q
    } = this.options;
    if (!B) A = A.toLowerCase();
    if (this.pattern === A) {
      let C = {
        isMatch: !0,
        score: 0
      };
      if (Q) C.indices = [
        [0, A.length - 1]
      ];
      return C
    }
    let {
      location: I,
      distance: G,
      threshold: Z,
      findAllMatches: D,
      minMatchCharLength: Y,
      ignoreLocation: W
    } = this.options, J = [], F = 0, X = !1;
    this.chunks.forEach(({
      pattern: C,
      alphabet: K,
      startIndex: E
    }) => {
      let {
        isMatch: N,
        score: q,
        indices: O
      } = Fz5(A, C, K, {
        location: I + E,
        distance: G,
        threshold: Z,
        findAllMatches: D,
        minMatchCharLength: Y,
        includeMatches: Q,
        ignoreLocation: W
      });
      if (N) X = !0;
      if (F += q, N && O) J = [...J, ...O]
    });
    let V = {
      isMatch: X,
      score: X ? F / this.chunks.length : 1
    };
    if (X && Q) V.indices = J;
    return V
  }
}
// @from(Start 9665864, End 9666068)
class p$ {
  constructor(A) {
    this.pattern = A
  }
  static isMultiMatch(A) {
    return xO2(A, this.multiRegex)
  }
  static isSingleMatch(A) {
    return xO2(A, this.singleRegex)
  }
  search() {}
}
// @from(Start 9666070, End 9666139)
function xO2(A, B) {
  let Q = A.match(B);
  return Q ? Q[1] : null
}
// @from(Start 9666140, End 9666509)
class pO2 extends p$ {
  constructor(A) {
    super(A)
  }
  static get type() {
    return "exact"
  }
  static get multiRegex() {
    return /^="(.*)"$/
  }
  static get singleRegex() {
    return /^=(.*)$/
  }
  search(A) {
    let B = A === this.pattern;
    return {
      isMatch: B,
      score: B ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    }
  }
}
// @from(Start 9666510, End 9666888)
class cO2 extends p$ {
  constructor(A) {
    super(A)
  }
  static get type() {
    return "inverse-exact"
  }
  static get multiRegex() {
    return /^!"(.*)"$/
  }
  static get singleRegex() {
    return /^!(.*)$/
  }
  search(A) {
    let Q = A.indexOf(this.pattern) === -1;
    return {
      isMatch: Q,
      score: Q ? 0 : 1,
      indices: [0, A.length - 1]
    }
  }
}
// @from(Start 9666889, End 9667275)
class lO2 extends p$ {
  constructor(A) {
    super(A)
  }
  static get type() {
    return "prefix-exact"
  }
  static get multiRegex() {
    return /^\^"(.*)"$/
  }
  static get singleRegex() {
    return /^\^(.*)$/
  }
  search(A) {
    let B = A.startsWith(this.pattern);
    return {
      isMatch: B,
      score: B ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    }
  }
}
// @from(Start 9667276, End 9667662)
class iO2 extends p$ {
  constructor(A) {
    super(A)
  }
  static get type() {
    return "inverse-prefix-exact"
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/
  }
  static get singleRegex() {
    return /^!\^(.*)$/
  }
  search(A) {
    let B = !A.startsWith(this.pattern);
    return {
      isMatch: B,
      score: B ? 0 : 1,
      indices: [0, A.length - 1]
    }
  }
}
// @from(Start 9667663, End 9668065)
class nO2 extends p$ {
  constructor(A) {
    super(A)
  }
  static get type() {
    return "suffix-exact"
  }
  static get multiRegex() {
    return /^"(.*)"\$$/
  }
  static get singleRegex() {
    return /^(.*)\$$/
  }
  search(A) {
    let B = A.endsWith(this.pattern);
    return {
      isMatch: B,
      score: B ? 0 : 1,
      indices: [A.length - this.pattern.length, A.length - 1]
    }
  }
}
// @from(Start 9668066, End 9668450)
class aO2 extends p$ {
  constructor(A) {
    super(A)
  }
  static get type() {
    return "inverse-suffix-exact"
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/
  }
  static get singleRegex() {
    return /^!(.*)\$$/
  }
  search(A) {
    let B = !A.endsWith(this.pattern);
    return {
      isMatch: B,
      score: B ? 0 : 1,
      indices: [0, A.length - 1]
    }
  }
}
// @from(Start 9668451, End 9669285)
class uAA extends p$ {
  constructor(A, {
    location: B = M4.location,
    threshold: Q = M4.threshold,
    distance: I = M4.distance,
    includeMatches: G = M4.includeMatches,
    findAllMatches: Z = M4.findAllMatches,
    minMatchCharLength: D = M4.minMatchCharLength,
    isCaseSensitive: Y = M4.isCaseSensitive,
    ignoreLocation: W = M4.ignoreLocation
  } = {}) {
    super(A);
    this._bitapSearch = new dAA(A, {
      location: B,
      threshold: Q,
      distance: I,
      includeMatches: G,
      findAllMatches: Z,
      minMatchCharLength: D,
      isCaseSensitive: Y,
      ignoreLocation: W
    })
  }
  static get type() {
    return "fuzzy"
  }
  static get multiRegex() {
    return /^"(.*)"$/
  }
  static get singleRegex() {
    return /^(.*)$/
  }
  search(A) {
    return this._bitapSearch.searchIn(A)
  }
}
// @from(Start 9669286, End 9669766)
class pAA extends p$ {
  constructor(A) {
    super(A)
  }
  static get type() {
    return "include"
  }
  static get multiRegex() {
    return /^'"(.*)"$/
  }
  static get singleRegex() {
    return /^'(.*)$/
  }
  search(A) {
    let B = 0,
      Q, I = [],
      G = this.pattern.length;
    while ((Q = A.indexOf(this.pattern, B)) > -1) B = Q + G, I.push([Q, B - 1]);
    let Z = !!I.length;
    return {
      isMatch: Z,
      score: Z ? 0 : 1,
      indices: I
    }
  }
}
// @from(Start 9669771, End 9669817)
vAA = [pO2, pAA, lO2, iO2, aO2, nO2, cO2, uAA]
// @from(Start 9669821, End 9669837)
fO2 = vAA.length
// @from(Start 9669841, End 9669883)
Vz5 = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/
// @from(Start 9669887, End 9669896)
Cz5 = "|"
// @from(Start 9669899, End 9670509)
function Kz5(A, B = {}) {
  return A.split(Cz5).map((Q) => {
    let I = Q.trim().split(Vz5).filter((Z) => Z && !!Z.trim()),
      G = [];
    for (let Z = 0, D = I.length; Z < D; Z += 1) {
      let Y = I[Z],
        W = !1,
        J = -1;
      while (!W && ++J < fO2) {
        let F = vAA[J],
          X = F.isMultiMatch(Y);
        if (X) G.push(new F(X, B)), W = !0
      }
      if (W) continue;
      J = -1;
      while (++J < fO2) {
        let F = vAA[J],
          X = F.isSingleMatch(Y);
        if (X) {
          G.push(new F(X, B));
          break
        }
      }
    }
    return G
  })
}
// @from(Start 9670514, End 9670549)
Hz5 = new Set([uAA.type, pAA.type])
// @from(Start 9670551, End 9672313)
class sO2 {
  constructor(A, {
    isCaseSensitive: B = M4.isCaseSensitive,
    includeMatches: Q = M4.includeMatches,
    minMatchCharLength: I = M4.minMatchCharLength,
    ignoreLocation: G = M4.ignoreLocation,
    findAllMatches: Z = M4.findAllMatches,
    location: D = M4.location,
    threshold: Y = M4.threshold,
    distance: W = M4.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: B,
      includeMatches: Q,
      minMatchCharLength: I,
      findAllMatches: Z,
      ignoreLocation: G,
      location: D,
      threshold: Y,
      distance: W
    }, this.pattern = B ? A : A.toLowerCase(), this.query = Kz5(this.pattern, this.options)
  }
  static condition(A, B) {
    return B.useExtendedSearch
  }
  searchIn(A) {
    let B = this.query;
    if (!B) return {
      isMatch: !1,
      score: 1
    };
    let {
      includeMatches: Q,
      isCaseSensitive: I
    } = this.options;
    A = I ? A : A.toLowerCase();
    let G = 0,
      Z = [],
      D = 0;
    for (let Y = 0, W = B.length; Y < W; Y += 1) {
      let J = B[Y];
      Z.length = 0, G = 0;
      for (let F = 0, X = J.length; F < X; F += 1) {
        let V = J[F],
          {
            isMatch: C,
            indices: K,
            score: E
          } = V.search(A);
        if (C) {
          if (G += 1, D += E, Q) {
            let N = V.constructor.type;
            if (Hz5.has(N)) Z = [...Z, ...K];
            else Z.push(K)
          }
        } else {
          D = 0, G = 0, Z.length = 0;
          break
        }
      }
      if (G) {
        let F = {
          isMatch: !0,
          score: D / G
        };
        if (Q) F.indices = Z;
        return F
      }
    }
    return {
      isMatch: !1,
      score: 1
    }
  }
}
// @from(Start 9672318, End 9672326)
bAA = []
// @from(Start 9672329, End 9672368)
function zz5(...A) {
  bAA.push(...A)
}
// @from(Start 9672370, End 9672536)
function gAA(A, B) {
  for (let Q = 0, I = bAA.length; Q < I; Q += 1) {
    let G = bAA[Q];
    if (G.condition(A, B)) return new G(A, B)
  }
  return new dAA(A, B)
}
// @from(Start 9672541, End 9672583)
lz1 = {
    AND: "$and",
    OR: "$or"
  }
// @from(Start 9672587, End 9672637)
hAA = {
    PATH: "$path",
    PATTERN: "$val"
  }
// @from(Start 9672641, End 9672681)
mAA = (A) => !!(A[lz1.AND] || A[lz1.OR])
// @from(Start 9672685, End 9672711)
wz5 = (A) => !!A[hAA.PATH]
// @from(Start 9672715, End 9672755)
Ez5 = (A) => !u$(A) && gO2(A) && !mAA(A)
// @from(Start 9672759, End 9672847)
vO2 = (A) => ({
    [lz1.AND]: Object.keys(A).map((B) => ({
      [B]: A[B]
    }))
  })
// @from(Start 9672850, End 9673525)
function rO2(A, B, {
  auto: Q = !0
} = {}) {
  let I = (G) => {
    let Z = Object.keys(G),
      D = wz5(G);
    if (!D && Z.length > 1 && !mAA(G)) return I(vO2(G));
    if (Ez5(G)) {
      let W = D ? G[hAA.PATH] : Z[0],
        J = D ? G[hAA.PATTERN] : G[W];
      if (!ME(J)) throw new Error(oH5(W));
      let F = {
        keyId: fAA(W),
        pattern: J
      };
      if (Q) F.searcher = gAA(J, B);
      return F
    }
    let Y = {
      children: [],
      operator: Z[0]
    };
    return Z.forEach((W) => {
      let J = G[W];
      if (u$(J)) J.forEach((F) => {
        Y.children.push(I(F))
      })
    }), Y
  };
  if (!mAA(A)) A = vO2(A);
  return I(A)
}
// @from(Start 9673527, End 9673849)
function Uz5(A, {
  ignoreFieldNorm: B = M4.ignoreFieldNorm
}) {
  A.forEach((Q) => {
    let I = 1;
    Q.matches.forEach(({
      key: G,
      norm: Z,
      score: D
    }) => {
      let Y = G ? G.weight : null;
      I *= Math.pow(D === 0 && Y ? Number.EPSILON : D, (Y || 1) * (B ? 1 : Z))
    }), Q.score = I
  })
}
// @from(Start 9673851, End 9674207)
function Nz5(A, B) {
  let Q = A.matches;
  if (B.matches = [], !IF(Q)) return;
  Q.forEach((I) => {
    if (!IF(I.indices) || !I.indices.length) return;
    let {
      indices: G,
      value: Z
    } = I, D = {
      indices: G,
      value: Z
    };
    if (I.key) D.key = I.key.src;
    if (I.idx > -1) D.refIndex = I.idx;
    B.matches.push(D)
  })
}
// @from(Start 9674209, End 9674251)
function $z5(A, B) {
  B.score = A.score
}
// @from(Start 9674253, End 9674604)
function qz5(A, B, {
  includeMatches: Q = M4.includeMatches,
  includeScore: I = M4.includeScore
} = {}) {
  let G = [];
  if (Q) G.push(Nz5);
  if (I) G.push($z5);
  return A.map((Z) => {
    let {
      idx: D
    } = Z, Y = {
      item: B[D],
      refIndex: D
    };
    if (G.length) G.forEach((W) => {
      W(Z, Y)
    });
    return Y
  })
}
// @from(Start 9674605, End 9678956)
class EV {
  constructor(A, B = {}, Q) {
    this.options = {
      ...M4,
      ...B
    }, this.options.useExtendedSearch, this._keyStore = new mO2(this.options.keys), this.setCollection(A, Q)
  }
  setCollection(A, B) {
    if (this._docs = A, B && !(B instanceof iz1)) throw new Error(rH5);
    this._myIndex = B || uO2(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    })
  }
  add(A) {
    if (!IF(A)) return;
    this._docs.push(A), this._myIndex.add(A)
  }
  remove(A = () => !1) {
    let B = [];
    for (let Q = 0, I = this._docs.length; Q < I; Q += 1) {
      let G = this._docs[Q];
      if (A(G, Q)) this.removeAt(Q), Q -= 1, I -= 1, B.push(G)
    }
    return B
  }
  removeAt(A) {
    this._docs.splice(A, 1), this._myIndex.removeAt(A)
  }
  getIndex() {
    return this._myIndex
  }
  search(A, {
    limit: B = -1
  } = {}) {
    let {
      includeMatches: Q,
      includeScore: I,
      shouldSort: G,
      sortFn: Z,
      ignoreFieldNorm: D
    } = this.options, Y = ME(A) ? ME(this._docs[0]) ? this._searchStringList(A) : this._searchObjectList(A) : this._searchLogical(A);
    if (Uz5(Y, {
        ignoreFieldNorm: D
      }), G) Y.sort(Z);
    if (bO2(B) && B > -1) Y = Y.slice(0, B);
    return qz5(Y, this._docs, {
      includeMatches: Q,
      includeScore: I
    })
  }
  _searchStringList(A) {
    let B = gAA(A, this.options),
      {
        records: Q
      } = this._myIndex,
      I = [];
    return Q.forEach(({
      v: G,
      i: Z,
      n: D
    }) => {
      if (!IF(G)) return;
      let {
        isMatch: Y,
        score: W,
        indices: J
      } = B.searchIn(G);
      if (Y) I.push({
        item: G,
        idx: Z,
        matches: [{
          score: W,
          value: G,
          norm: D,
          indices: J
        }]
      })
    }), I
  }
  _searchLogical(A) {
    let B = rO2(A, this.options),
      Q = (D, Y, W) => {
        if (!D.children) {
          let {
            keyId: F,
            searcher: X
          } = D, V = this._findMatches({
            key: this._keyStore.get(F),
            value: this._myIndex.getValueForItemAtKeyId(Y, F),
            searcher: X
          });
          if (V && V.length) return [{
            idx: W,
            item: Y,
            matches: V
          }];
          return []
        }
        let J = [];
        for (let F = 0, X = D.children.length; F < X; F += 1) {
          let V = D.children[F],
            C = Q(V, Y, W);
          if (C.length) J.push(...C);
          else if (D.operator === lz1.AND) return []
        }
        return J
      },
      I = this._myIndex.records,
      G = {},
      Z = [];
    return I.forEach(({
      $: D,
      i: Y
    }) => {
      if (IF(D)) {
        let W = Q(B, D, Y);
        if (W.length) {
          if (!G[Y]) G[Y] = {
            idx: Y,
            item: D,
            matches: []
          }, Z.push(G[Y]);
          W.forEach(({
            matches: J
          }) => {
            G[Y].matches.push(...J)
          })
        }
      }
    }), Z
  }
  _searchObjectList(A) {
    let B = gAA(A, this.options),
      {
        keys: Q,
        records: I
      } = this._myIndex,
      G = [];
    return I.forEach(({
      $: Z,
      i: D
    }) => {
      if (!IF(Z)) return;
      let Y = [];
      if (Q.forEach((W, J) => {
          Y.push(...this._findMatches({
            key: W,
            value: Z[J],
            searcher: B
          }))
        }), Y.length) G.push({
        idx: D,
        item: Z,
        matches: Y
      })
    }), G
  }
  _findMatches({
    key: A,
    value: B,
    searcher: Q
  }) {
    if (!IF(B)) return [];
    let I = [];
    if (u$(B)) B.forEach(({
      v: G,
      i: Z,
      n: D
    }) => {
      if (!IF(G)) return;
      let {
        isMatch: Y,
        score: W,
        indices: J
      } = Q.searchIn(G);
      if (Y) I.push({
        score: W,
        key: A,
        value: G,
        idx: Z,
        norm: D,
        indices: J
      })
    });
    else {
      let {
        v: G,
        n: Z
      } = B, {
        isMatch: D,
        score: Y,
        indices: W
      } = Q.searchIn(G);
      if (D) I.push({
        score: Y,
        key: A,
        value: G,
        norm: Z,
        indices: W
      })
    }
    return I
  }
}
// @from(Start 9679150, End 9679895)
function xA1(A, B) {
  if (!A) return {
    resultType: "emptyPath"
  };
  let Q = Lz5(A) ? A : Rz5(dA(), A),
    I = x1();
  if (!I.existsSync(Q)) return {
    resultType: "pathNotFound",
    directoryPath: A,
    absolutePath: Q
  };
  if (!I.statSync(Q).isDirectory()) return {
    resultType: "notADirectory",
    directoryPath: A,
    absolutePath: Q
  };
  let G = WP1(B);
  for (let Y of G)
    if (ai(Q, Y)) return {
      resultType: "alreadyInWorkingDirectory",
      directoryPath: A,
      workingDir: Y
    };
  let Z = new Set([...B.additionalWorkingDirectories, Q]),
    D = {
      ...B,
      additionalWorkingDirectories: Z
    };
  return {
    resultType: "success",
    absolutePath: Q,
    updatedPermissionContext: D
  }
}
// @from(Start 9679897, End 9680553)
function fA1(A) {
  switch (A.resultType) {
    case "emptyPath":
      return "Please provide a directory path.";
    case "pathNotFound":
      return `Path ${UA.bold(A.absolutePath)} was not found.`;
    case "notADirectory": {
      let B = Mz5(A.absolutePath);
      return `${UA.bold(A.directoryPath)} is not a directory. Did you mean to add the parent directory ${UA.bold(B)}?`
    }
    case "alreadyInWorkingDirectory":
      return `${UA.bold(A.directoryPath)} is already accessible within the existing working directory ${UA.bold(A.workingDir)}.`;
    case "success":
      return `Added ${UA.bold(A.absolutePath)} as a working directory.`
  }
}
// @from(Start 9680558, End 9680998)
Oz5 = {
    type: "local",
    name: "add-dir",
    description: "Add a new working directory",
    argumentHint: "<path>",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, B) {
      let Q = A.trim(),
        I = xA1(Q, B.getToolPermissionContext());
      if (I.resultType === "success") B.setToolPermissionContext(I.updatedPermissionContext);
      return fA1(I)
    },
    userFacingName() {
      return "add-dir"
    }
  }
// @from(Start 9681002, End 9681011)
oO2 = Oz5
// @from(Start 9681017, End 9681033)
k0 = I1(U1(), 1)
// @from(Start 9681037, End 9681053)
UV = I1(U1(), 1)
// @from(Start 9681059, End 9681076)
fT2 = I1(U1(), 1)
// @from(Start 9681082, End 9681099)
_T2 = I1(U1(), 1)
// @from(Start 9681105, End 9681123)
vA1 = I1(iAA(), 1)
// @from(Start 9681125, End 9689602)
class T5 {
  measuredText;
  selection;
  offset;
  constructor(A, B = 0, Q = 0) {
    this.measuredText = A;
    this.selection = Q;
    this.offset = Math.max(0, Math.min(this.measuredText.text.length, B))
  }
  static fromText(A, B, Q = 0, I = 0) {
    return new T5(new YT2(A, B - 1), Q, I)
  }
  render(A, B, Q) {
    let {
      line: I,
      column: G
    } = this.getPosition();
    return this.measuredText.getWrappedText().map((Z, D, Y) => {
      let W = Z;
      if (B && D === Y.length - 1) {
        let E = Math.max(0, Z.length - 6);
        W = B.repeat(E) + Z.slice(E)
      }
      if (I !== D) return W.trimEnd();
      let J = this.measuredText.displayWidthToStringIndex(W, G),
        F = new Intl.Segmenter("en", {
          granularity: "grapheme"
        }),
        X = Array.from(F.segment(W)),
        V = "",
        C = A,
        K = "";
      for (let {
          segment: E,
          index: N
        }
        of X) {
        let q = N + E.length;
        if (q <= J) V += E;
        else if (N < J && q > J) C = E;
        else if (N === J) C = E;
        else K += E
      }
      return V + Q(C) + K.trimEnd()
    }).join(`
`)
  }
  left() {
    if (this.offset === 0) return this;
    let A = new Intl.Segmenter("en", {
        granularity: "grapheme"
      }),
      B = Array.from(A.segment(this.text.slice(0, this.offset)));
    if (B.length === 0) return new T5(this.measuredText, 0);
    let Q = B[B.length - 1];
    return new T5(this.measuredText, Q.index)
  }
  right() {
    if (this.offset >= this.text.length) return this;
    let B = new Intl.Segmenter("en", {
      granularity: "grapheme"
    }).segment(this.text);
    for (let {
        index: Q,
        segment: I
      }
      of B)
      if (Q >= this.offset) {
        let G = Q + I.length;
        return new T5(this.measuredText, Math.min(G, this.text.length))
      } return this
  }
  up() {
    let {
      line: A,
      column: B
    } = this.getPosition();
    if (A === 0) return this;
    let Q = this.measuredText.getWrappedText()[A - 1];
    if (!Q) return this;
    if (B > Q.length) {
      let G = this.getOffset({
        line: A - 1,
        column: Q.length
      });
      return new T5(this.measuredText, G, 0)
    }
    let I = this.getOffset({
      line: A - 1,
      column: B
    });
    return new T5(this.measuredText, I, 0)
  }
  down() {
    let {
      line: A,
      column: B
    } = this.getPosition();
    if (A >= this.measuredText.lineCount - 1) return this;
    let Q = this.measuredText.getWrappedText()[A + 1];
    if (!Q) return this;
    if (B > Q.length) {
      let G = this.getOffset({
        line: A + 1,
        column: Q.length
      });
      return new T5(this.measuredText, G, 0)
    }
    let I = this.getOffset({
      line: A + 1,
      column: B
    });
    return new T5(this.measuredText, I, 0)
  }
  startOfLine() {
    let {
      line: A
    } = this.getPosition();
    return new T5(this.measuredText, this.getOffset({
      line: A,
      column: 0
    }), 0)
  }
  firstNonBlankInLine() {
    let {
      line: A
    } = this.getPosition(), Q = (this.measuredText.getWrappedText()[A] || "").match(/^\s*\S/), I = Q?.index ? Q.index + Q[0].length - 1 : 0, G = this.getOffset({
      line: A,
      column: I
    });
    return new T5(this.measuredText, G, 0)
  }
  endOfLine() {
    let {
      line: A
    } = this.getPosition(), B = this.measuredText.getLineLength(A), Q = this.getOffset({
      line: A,
      column: B
    });
    return new T5(this.measuredText, Q, 0)
  }
  findLogicalLineStart(A = this.offset) {
    let B = this.text.lastIndexOf(`
`, A - 1);
    return B === -1 ? 0 : B + 1
  }
  findLogicalLineEnd(A = this.offset) {
    let B = this.text.indexOf(`
`, A);
    return B === -1 ? this.text.length : B
  }
  getLogicalLineBounds() {
    return {
      start: this.findLogicalLineStart(),
      end: this.findLogicalLineEnd()
    }
  }
  createCursorWithColumn(A, B, Q) {
    let I = B - A,
      G = Math.min(Q, I);
    return new T5(this.measuredText, A + G, 0)
  }
  endOfLogicalLine() {
    return new T5(this.measuredText, this.findLogicalLineEnd(), 0)
  }
  startOfLogicalLine() {
    return new T5(this.measuredText, this.findLogicalLineStart(), 0)
  }
  firstNonBlankInLogicalLine() {
    let {
      start: A,
      end: B
    } = this.getLogicalLineBounds(), I = this.text.slice(A, B).match(/\S/), G = A + (I?.index ?? 0);
    return new T5(this.measuredText, G, 0)
  }
  upLogicalLine() {
    let {
      start: A
    } = this.getLogicalLineBounds();
    if (A === 0) return new T5(this.measuredText, 0, 0);
    let B = this.offset - A,
      Q = A - 1,
      I = this.findLogicalLineStart(Q);
    return this.createCursorWithColumn(I, Q, B)
  }
  downLogicalLine() {
    let {
      start: A,
      end: B
    } = this.getLogicalLineBounds();
    if (B >= this.text.length) return new T5(this.measuredText, this.text.length, 0);
    let Q = this.offset - A,
      I = B + 1,
      G = this.findLogicalLineEnd(I);
    return this.createCursorWithColumn(I, G, Q)
  }
  nextWord() {
    let A = this;
    while (A.isOverWordChar() && !A.isAtEnd()) A = A.right();
    while (!A.isOverWordChar() && !A.isAtEnd()) A = A.right();
    return A
  }
  endOfWord() {
    let A = this;
    if (A.isOverWordChar() && (!A.right().isOverWordChar() || A.right().isAtEnd())) return A = A.right(), A.endOfWord();
    if (!A.isOverWordChar()) A = A.nextWord();
    while (A.right().isOverWordChar() && !A.isAtEnd()) A = A.right();
    return A
  }
  prevWord() {
    let A = this;
    if (!A.left().isOverWordChar()) A = A.left();
    while (!A.isOverWordChar() && !A.isAtStart()) A = A.left();
    if (A.isOverWordChar())
      while (A.left().isOverWordChar() && !A.isAtStart()) A = A.left();
    return A
  }
  nextWORD() {
    let A = this;
    while (!A.isOverWhitespace() && !A.isAtEnd()) A = A.right();
    while (A.isOverWhitespace() && !A.isAtEnd()) A = A.right();
    return A
  }
  endOfWORD() {
    let A = this;
    if (!A.isOverWhitespace() && (A.right().isOverWhitespace() || A.right().isAtEnd())) return A = A.right(), A.endOfWORD();
    if (A.isOverWhitespace()) A = A.nextWORD();
    while (!A.right().isOverWhitespace() && !A.isAtEnd()) A = A.right();
    return A
  }
  prevWORD() {
    let A = this;
    if (A.left().isOverWhitespace()) A = A.left();
    while (A.isOverWhitespace() && !A.isAtStart()) A = A.left();
    if (!A.isOverWhitespace())
      while (!A.left().isOverWhitespace() && !A.isAtStart()) A = A.left();
    return A
  }
  modifyText(A, B = "") {
    let Q = this.offset,
      I = A.offset,
      G = this.text.slice(0, Q) + B + this.text.slice(I);
    return T5.fromText(G, this.columns, Q + B.length)
  }
  insert(A) {
    return this.modifyText(this, A)
  }
  del() {
    if (this.isAtEnd()) return this;
    return this.modifyText(this.right())
  }
  backspace() {
    if (this.isAtStart()) return this;
    return this.left().modifyText(this)
  }
  deleteToLineStart() {
    return this.startOfLine().modifyText(this)
  }
  deleteToLineEnd() {
    if (this.text[this.offset] === `
`) return this.modifyText(this.right());
    return this.modifyText(this.endOfLine())
  }
  deleteToLogicalLineEnd() {
    if (this.text[this.offset] === `
`) return this.modifyText(this.right());
    return this.modifyText(this.endOfLogicalLine())
  }
  deleteWordBefore() {
    if (this.isAtStart()) return this;
    return this.prevWord().modifyText(this)
  }
  deleteWordAfter() {
    if (this.isAtEnd()) return this;
    return this.modifyText(this.nextWord())
  }
  isOverWordChar() {
    let A = this.text[this.offset] ?? "";
    return /\w/.test(A)
  }
  isOverWhitespace() {
    let A = this.text[this.offset] ?? "";
    return /\s/.test(A)
  }
  equals(A) {
    return this.offset === A.offset && this.measuredText === A.measuredText
  }
  isAtStart() {
    return this.offset === 0
  }
  isAtEnd() {
    return this.offset === this.text.length
  }
  startOfFirstLine() {
    return new T5(this.measuredText, 0, 0)
  }
  startOfLastLine() {
    let A = this.text.lastIndexOf(`
`);
    if (A === -1) return this.startOfLine();
    return new T5(this.measuredText, A + 1, 0)
  }
  get text() {
    return this.measuredText.text
  }
  get columns() {
    return this.measuredText.columns + 1
  }
  getPosition() {
    return this.measuredText.getPositionFromOffset(this.offset)
  }
  getOffset(A) {
    return this.measuredText.getOffsetFromPosition(A)
  }
}
// @from(Start 9689603, End 9689996)
class nz1 {
  text;
  startOffset;
  isPrecededByNewline;
  endsWithNewline;
  constructor(A, B, Q, I = !1) {
    this.text = A;
    this.startOffset = B;
    this.isPrecededByNewline = Q;
    this.endsWithNewline = I
  }
  equals(A) {
    return this.text === A.text && this.startOffset === A.startOffset
  }
  get length() {
    return this.text.length + (this.endsWithNewline ? 1 : 0)
  }
}
// @from(Start 9689997, End 9693959)
class YT2 {
  text;
  columns;
  wrappedLines;
  constructor(A, B) {
    this.text = A;
    this.columns = B;
    this.wrappedLines = this.measureWrappedText()
  }
  stringIndexToDisplayWidth(A, B) {
    if (B <= 0) return 0;
    if (B >= A.length) return vA1.default(A);
    return vA1.default(A.substring(0, B))
  }
  displayWidthToStringIndex(A, B) {
    if (B <= 0) return 0;
    if (!A) return 0;
    let I = new Intl.Segmenter("en", {
        granularity: "grapheme"
      }).segment(A),
      G = 0,
      Z = 0;
    for (let {
        segment: D,
        index: Y
      }
      of I) {
      let W = vA1.default(D);
      if (G + W > B) break;
      G += W, Z = Y + D.length
    }
    return Z
  }
  findOriginalOffset(A, B) {
    if (A === 0) return 0;
    if (A >= B.length) return this.text.length;
    let Q = B.substring(0, A);
    return this.text.normalize("NFC").indexOf(Q) + Q.length
  }
  measureWrappedText() {
    let A = Hn(this.text, this.columns, {
        hard: !0,
        trim: !1
      }),
      B = [],
      Q = 0,
      I = -1,
      G = A.split(`
`);
    for (let Z = 0; Z < G.length; Z++) {
      let D = G[Z],
        Y = (W) => Z === 0 || W > 0 && this.text[W - 1] === `
`;
      if (D.length === 0)
        if (I = this.text.indexOf(`
`, I + 1), I !== -1) {
          let W = I,
            J = !0;
          B.push(new nz1(D, W, Y(W), !0))
        } else {
          let W = this.text.length;
          B.push(new nz1(D, W, Y(W), !1))
        }
      else {
        let W = D.normalize("NFC"),
          J = this.text.normalize("NFC"),
          F = J.indexOf(W, Q);
        if (F === -1) throw console.log("Debug: Failed to find wrapped line in original text"), console.log("Debug: Current text:", D), console.log("Debug: Full original text:", this.text), console.log("Debug: Search offset:", Q), console.log("Debug: Wrapped text:", A), new Error("Failed to find wrapped line in original text");
        let X = this.findOriginalOffset(F, J);
        Q = F + W.length;
        let V = X + D.length,
          C = V < this.text.length && this.text[V] === `
`;
        if (C) I = V;
        B.push(new nz1(D, X, Y(X), C))
      }
    }
    return B
  }
  getWrappedText() {
    return this.wrappedLines.map((A) => A.isPrecededByNewline ? A.text : A.text.trimStart())
  }
  getWrappedLines() {
    return this.wrappedLines
  }
  getLine(A) {
    return this.wrappedLines[Math.max(0, Math.min(A, this.wrappedLines.length - 1))]
  }
  getOffsetFromPosition(A) {
    let B = this.getLine(A.line);
    if (B.text.length === 0 && B.endsWithNewline) return B.startOffset;
    let Q = B.isPrecededByNewline ? 0 : B.text.length - B.text.trimStart().length,
      I = A.column + Q,
      G = this.displayWidthToStringIndex(B.text, I),
      Z = B.startOffset + G,
      D = B.startOffset + B.text.length,
      Y = D;
    if (B.endsWithNewline && A.column > B.text.length) Y = D + 1;
    return Math.min(Z, Y)
  }
  getLineLength(A) {
    return this.getLine(A).text.length
  }
  getPositionFromOffset(A) {
    let B = this.wrappedLines;
    for (let G = 0; G < B.length; G++) {
      let Z = B[G],
        D = B[G + 1];
      if (A >= Z.startOffset && (!D || A < D.startOffset)) {
        let Y = A - Z.startOffset,
          W;
        if (Z.isPrecededByNewline) W = this.stringIndexToDisplayWidth(Z.text, Y);
        else {
          let J = Z.text.length - Z.text.trimStart().length;
          if (Y < J) W = 0;
          else {
            let F = Z.text.trimStart(),
              X = Y - J;
            W = this.stringIndexToDisplayWidth(F, X)
          }
        }
        return {
          line: G,
          column: Math.max(0, W)
        }
      }
    }
    let Q = B.length - 1,
      I = this.wrappedLines[Q];
    return {
      line: Q,
      column: vA1.default(I.text)
    }
  }
  get lineCount() {
    return this.wrappedLines.length
  }
  equals(A) {
    return this.text === A.text && this.columns === A.columns
  }
}
// @from(Start 9694093, End 9694497)
function xz5() {
  let A = process.platform,
    B = {
      darwin: "No image found in clipboard. Use Cmd + Ctrl + Shift + 4 to copy a screenshot to clipboard.",
      win32: "No image found in clipboard. Use Print Screen to copy a screenshot to clipboard.",
      linux: "No image found in clipboard. Use appropriate screenshot tool to copy a screenshot to clipboard."
    };
  return B[A] || B.linux
}
// @from(Start 9694502, End 9694513)
WT2 = xz5()
// @from(Start 9694519, End 9694528)
sz1 = 800
// @from(Start 9694531, End 9696082)
function JT2() {
  let A = process.platform,
    B = {
      darwin: "/tmp/claude_cli_latest_screenshot.png",
      linux: "/tmp/claude_cli_latest_screenshot.png",
      win32: process.env.TEMP ? `${process.env.TEMP}\\claude_cli_latest_screenshot.png` : "C:\\Temp\\claude_cli_latest_screenshot.png"
    },
    Q = B[A] || B.linux,
    I = {
      darwin: {
        checkImage: "osascript -e 'the clipboard as «class PNGf»'",
        saveImage: `osascript -e 'set png_data to (the clipboard as «class PNGf»)' -e 'set fp to open for access POSIX file "${Q}" with write permission' -e 'write png_data to fp' -e 'close access fp'`,
        getPath: "osascript -e 'get POSIX path of (the clipboard as «class furl»)'",
        deleteFile: `rm -f "${Q}"`
      },
      linux: {
        checkImage: 'xclip -selection clipboard -t TARGETS -o | grep -E "image/(png|jpeg|jpg|gif|webp)"',
        saveImage: `xclip -selection clipboard -t image/png -o > "${Q}" || wl-paste --type image/png > "${Q}"`,
        getPath: "xclip -selection clipboard -t text/plain -o",
        deleteFile: `rm -f "${Q}"`
      },
      win32: {
        checkImage: 'powershell -Command "(Get-Clipboard -Format Image) -ne $null"',
        saveImage: `powershell -Command "$img = Get-Clipboard -Format Image; if ($img) { $img.Save('${Q.replace(/\\/g,"\\\\")}', [System.Drawing.Imaging.ImageFormat]::Png) }"`,
        getPath: 'powershell -Command "Get-Clipboard"',
        deleteFile: `del /f "${Q}"`
      }
    };
  return {
    commands: I[A] || I.linux,
    screenshotPath: Q
  }
}
// @from(Start 9696083, End 9696571)
async function FT2() {
  let {
    commands: A,
    screenshotPath: B
  } = JT2();
  try {
    az1(A.checkImage, {
      stdio: "ignore"
    }), az1(A.saveImage, {
      stdio: "ignore"
    });
    let Q = x1().readFileBytesSync(B),
      {
        buffer: I
      } = await Y11(Q, Q.length, "png"),
      G = I.toString("base64"),
      Z = VT2(G);
    return az1(A.deleteFile, {
      stdio: "ignore"
    }), {
      base64: G,
      mediaType: Z
    }
  } catch {
    return null
  }
}
// @from(Start 9696573, End 9696745)
function fz5() {
  let {
    commands: A
  } = JT2();
  try {
    return az1(A.getPath, {
      encoding: "utf-8"
    }).trim()
  } catch (B) {
    return b1(B), null
  }
}
// @from(Start 9696750, End 9696782)
XT2 = /\.(png|jpe?g|gif|webp)$/i
// @from(Start 9696785, End 9697369)
function VT2(A) {
  try {
    let B = Buffer.from(A, "base64");
    if (B.length < 4) return "image/png";
    if (B[0] === 137 && B[1] === 80 && B[2] === 78 && B[3] === 71) return "image/png";
    if (B[0] === 255 && B[1] === 216 && B[2] === 255) return "image/jpeg";
    if (B[0] === 71 && B[1] === 73 && B[2] === 70) return "image/gif";
    if (B[0] === 82 && B[1] === 73 && B[2] === 70 && B[3] === 70) {
      if (B.length >= 12 && B[8] === 87 && B[9] === 69 && B[10] === 66 && B[11] === 80) return "image/webp"
    }
    return "image/png"
  } catch {
    return "image/png"
  }
}
// @from(Start 9697371, End 9697508)
function CT2(A) {
  if (A.startsWith('"') && A.endsWith('"') || A.startsWith("'") && A.endsWith("'")) return A.slice(1, -1);
  return A
}
// @from(Start 9697510, End 9697698)
function KT2(A) {
  if (process.platform === "win32") return A;
  let Q = "__DOUBLE_BACKSLASH__";
  return A.replace(/\\\\/g, Q).replace(/\\(.)/g, "$1").replace(new RegExp(Q, "g"), "\\")
}
// @from(Start 9697700, End 9697781)
function nAA(A) {
  let B = CT2(A.trim()),
    Q = KT2(B);
  return XT2.test(Q)
}
// @from(Start 9697783, End 9697886)
function vz5(A) {
  let B = CT2(A.trim()),
    Q = KT2(B);
  if (XT2.test(Q)) return Q;
  return null
}
// @from(Start 9697887, End 9698404)
async function HT2(A) {
  let B = vz5(A);
  if (!B) return null;
  let Q = B,
    I;
  try {
    if (kz5(Q)) I = x1().readFileBytesSync(Q);
    else {
      let W = fz5();
      if (W && Q === jz5(W)) I = x1().readFileBytesSync(W)
    }
  } catch (W) {
    return b1(W), null
  }
  if (!I) return null;
  let G = yz5(Q).slice(1).toLowerCase() || "png",
    {
      buffer: Z
    } = await Y11(I, I.length, G),
    D = Z.toString("base64"),
    Y = VT2(D);
  return {
    path: Q,
    base64: D,
    mediaType: Y
  }
}
// @from(Start 9698582, End 9698598)
a8 = I1(U1(), 1)
// @from(Start 9698681, End 9698698)
oz1 = I1(U1(), 1)
// @from(Start 9698704, End 9698722)
zT2 = I1(I1A(), 1)
// @from(Start 9698725, End 9698861)
function wT2() {
  return ET2().filter(({
    isCompletable: A,
    isEnabled: B
  }) => A && B).every(({
    isComplete: A
  }) => A)
}
// @from(Start 9698863, End 9699003)
function ou() {
  let A = m9();
  if (wT2() && !A.hasCompletedProjectOnboarding) B5({
    ...A,
    hasCompletedProjectOnboarding: !0
  })
}
// @from(Start 9699005, End 9700304)
function ET2() {
  let A = x1().existsSync(bz5(dA(), "CLAUDE.md")),
    B = WvA(dA());
  return [{
    key: "workspace",
    text: a8.createElement(P, {
      color: "secondaryText"
    }, "Ask Claude to create a new app or clone a repository"),
    isComplete: !1,
    isCompletable: !0,
    isEnabled: B
  }, {
    key: "claudemd",
    text: a8.createElement(P, {
      color: "secondaryText"
    }, "Run /init to create a CLAUDE.md file with instructions for Claude"),
    isComplete: A,
    isCompletable: !0,
    isEnabled: !B
  }, {
    key: "terminal",
    text: a8.createElement(P, {
      color: "secondaryText"
    }, "Run /terminal-setup to set up terminal integration"),
    isComplete: Boolean(ZA().shiftEnterKeyBindingInstalled || ZA().optionAsMetaKeyInstalled),
    isCompletable: !0,
    isEnabled: LE.isEnabled()
  }, {
    key: "questions",
    text: a8.createElement(P, {
      color: "secondaryText"
    }, "Use Claude to help with file analysis, editing, bash commands and git"),
    isComplete: !1,
    isCompletable: !1,
    isEnabled: !0
  }, {
    key: "changes",
    text: a8.createElement(P, {
      color: "secondaryText"
    }, "Be as specific as you would with another engineer for the best results"),
    isComplete: !1,
    isCompletable: !1,
    isEnabled: !0
  }]
}
// @from(Start 9700309, End 9700416)
rz1 = zT2.memoize(() => {
  return !wT2() && m9().projectOnboardingSeenCount < 4 && !process.env.IS_DEMO
})
// @from(Start 9700419, End 9701431)
function aAA() {
  let A = oz1.useMemo(ET2, []);
  if (oz1.useEffect(() => {
      if (!rz1()) return;
      let B = m9();
      B5({
        ...B,
        projectOnboardingSeenCount: B.projectOnboardingSeenCount + 1
      })
    }, []), !rz1()) return null;
  return a8.createElement(h, {
    flexDirection: "column",
    gap: 1,
    paddingX: 1
  }, a8.createElement(P, {
    color: "secondaryText"
  }, "Tips for getting started:"), a8.createElement(rL, null, A.filter(({
    isEnabled: B
  }) => B).sort((B, Q) => Number(B.isComplete) - Number(Q.isComplete)).map(({
    key: B,
    text: Q,
    isComplete: I
  }) => a8.createElement(rL.Item, {
    key: B
  }, a8.createElement(P, null, I ? a8.createElement(P, {
    color: "success"
  }, A0.tick, " ") : "", Q)))), dA() === gz5() && a8.createElement(P, {
    color: "warning"
  }, "Note: You have launched ", a8.createElement(P, {
    bold: !0
  }, "claude"), " in your home directory. For the best experience, launch it in a project directory instead."))
}
// @from(Start 9701510, End 9701621)
function dz5(A) {
  let B = ZA();
  B.appleTerminalSetupInProgress = !0, B.appleTerminalBackupPath = A, j0(B)
}
// @from(Start 9701623, End 9701702)
function bA1() {
  let A = ZA();
  A.appleTerminalSetupInProgress = !1, j0(A)
}
// @from(Start 9701704, End 9701857)
function uz5() {
  let A = ZA();
  return {
    inProgress: A.appleTerminalSetupInProgress ?? !1,
    backupPath: A.appleTerminalBackupPath || null
  }
}
// @from(Start 9701859, End 9701950)
function tu() {
  return mz5(hz5(), "Library", "Preferences", "com.apple.Terminal.plist")
}
// @from(Start 9701951, End 9702348)
async function UT2() {
  let A = tu(),
    B = `${A}.bak`;
  try {
    let {
      code: Q
    } = await u0("defaults", ["export", "com.apple.Terminal", A]);
    if (Q !== 0) return null;
    if (x1().existsSync(A)) return await u0("defaults", ["export", "com.apple.Terminal", B]), dz5(B), B;
    return null
  } catch (Q) {
    return b1(Q instanceof Error ? Q : new Error(String(Q))), null
  }
}
// @from(Start 9702349, End 9702978)
async function tz1() {
  let {
    inProgress: A,
    backupPath: B
  } = uz5();
  if (!A) return {
    status: "no_backup"
  };
  if (!B || !x1().existsSync(B)) return bA1(), {
    status: "no_backup"
  };
  try {
    let {
      code: Q
    } = await u0("defaults", ["import", "com.apple.Terminal", B]);
    if (Q !== 0) return {
      status: "failed",
      backupPath: B
    };
    return await u0("killall", ["cfprefsd"]), bA1(), {
      status: "restored"
    }
  } catch (Q) {
    return b1(new Error(`Failed to restore Terminal.app settings with: ${Q}`)), bA1(), {
      status: "failed",
      backupPath: B
    }
  }
}
// @from(Start 9703057, End 9703154)
function lz5(A) {
  let B = ZA();
  B.iterm2SetupInProgress = !0, B.iterm2BackupPath = A, j0(B)
}
// @from(Start 9703156, End 9703227)
function eu() {
  let A = ZA();
  A.iterm2SetupInProgress = !1, j0(A)
}
// @from(Start 9703229, End 9703368)
function iz5() {
  let A = ZA();
  return {
    inProgress: A.iterm2SetupInProgress ?? !1,
    backupPath: A.iterm2BackupPath || null
  }
}
// @from(Start 9703370, End 9703465)
function ez1() {
  return cz5(pz5(), "Library", "Preferences", "com.googlecode.iterm2.plist")
}
// @from(Start 9703466, End 9703771)
async function NT2() {
  let A = ez1(),
    B = `${A}.bak`;
  try {
    if (await u0("defaults", ["export", "com.googlecode.iterm2", A]), x1().existsSync(A)) return x1().copyFileSync(A, B), lz5(B), B;
    return null
  } catch (Q) {
    return b1(Q instanceof Error ? Q : new Error(String(Q))), null
  }
}
// @from(Start 9703773, End 9704213)
function $T2() {
  let {
    inProgress: A,
    backupPath: B
  } = iz5();
  if (!A) return {
    status: "no_backup"
  };
  if (!B || !x1().existsSync(B)) return eu(), {
    status: "no_backup"
  };
  try {
    return x1().copyFileSync(B, ez1()), eu(), {
      status: "restored"
    }
  } catch (Q) {
    return b1(new Error(`Failed to restore iTerm2 settings with: ${Q}`)), eu(), {
      status: "failed",
      backupPath: B
    }
  }
}
// @from(Start 9704218, End 9704586)
az5 = {
  type: "local",
  name: "terminal-setup",
  userFacingName() {
    return "terminal-setup"
  },
  description: mA.terminal === "Apple_Terminal" ? "Enable Option+Enter key binding for newlines and visual bell" : "Install Shift+Enter key binding for newlines",
  isEnabled: () => gA1(),
  isHidden: !1,
  async call(A, B) {
    return oAA(B.options.theme)
  }
}
// @from(Start 9704589, End 9704819)
function gA1() {
  return Aw1() === "darwin" && (mA.terminal === "iTerm.app" || mA.terminal === "Apple_Terminal") || mA.terminal === "vscode" || mA.terminal === "cursor" || mA.terminal === "windsurf" || mA.terminal === "ghostty"
}
// @from(Start 9704820, End 9705527)
async function oAA(A) {
  let B = "";
  switch (mA.terminal) {
    case "iTerm.app":
      B = await rz5(A);
      break;
    case "Apple_Terminal":
      B = await oz5(A);
      break;
    case "vscode":
      B = sAA("VSCode", A);
      break;
    case "cursor":
      B = sAA("Cursor", A);
      break;
    case "windsurf":
      B = sAA("Windsurf", A);
      break;
    case "ghostty":
      B = await sz5(A);
      break;
    case null:
      break
  }
  let Q = ZA();
  if (["iTerm.app", "vscode", "cursor", "windsurf", "ghostty"].includes(mA.terminal ?? "")) Q.shiftEnterKeyBindingInstalled = !0;
  else if (mA.terminal === "Apple_Terminal") Q.optionAsMetaKeyInstalled = !0;
  return j0(Q), ou(), B
}
// @from(Start 9705529, End 9705598)
function RT2() {
  return ZA().shiftEnterKeyBindingInstalled === !0
}
// @from(Start 9705600, End 9705664)
function OT2() {
  return ZA().optionAsMetaKeyInstalled === !0
}
// @from(Start 9705666, End 9705728)
function TT2() {
  return ZA().hasUsedBackslashReturn === !0
}
// @from(Start 9705730, End 9705848)
function PT2() {
  let A = ZA();
  if (!A.hasUsedBackslashReturn) j0({
    ...A,
    hasUsedBackslashReturn: !0
  })
}
// @from(Start 9705849, End 9707552)
async function sz5(A) {
  let Q = [],
    I = process.env.XDG_CONFIG_HOME;
  if (I) Q.push(ZT(I, "ghostty", "config"));
  else Q.push(ZT(rAA(), ".config", "ghostty", "config"));
  if (Aw1() === "darwin") Q.push(ZT(rAA(), "Library", "Application Support", "com.mitchellh.ghostty", "config"));
  let G = null,
    Z = !1;
  for (let D of Q)
    if (x1().existsSync(D)) {
      G = D, Z = !0;
      break
    } if (!G) G = Q[0] ?? null, Z = !1;
  if (!G) throw new Error("No valid config path found for Ghostty");
  try {
    let D = "";
    if (Z) {
      if (D = x1().readFileSync(G, {
          encoding: "utf-8"
        }), D.includes("shift+enter")) return `${V9("warning",A)}(
          'Found existing Ghostty Shift+Enter key binding. Remove it to continue.',
        )}${GQ}${UA.dim(`See ${G}`)}${GQ}`;
      let W = LT2(4).toString("hex"),
        J = `${G}.${W}.bak`;
      try {
        x1().copyFileSync(G, J)
      } catch {
        return `${V9("warning",A)("Error backing up existing Ghostty config. Bailing out.")}${GQ}${UA.dim(`See ${G}`)}${GQ}${UA.dim(`Backup path: ${J}`)}${GQ}`
      }
    } else {
      let W = nz5(G);
      if (!x1().existsSync(W)) x1().mkdirSync(W)
    }
    let Y = D;
    if (D && !D.endsWith(`
`)) Y += `
`;
    return Y += `keybind = shift+enter=text:\\n
`, x1().writeFileSync(G, Y, {
      encoding: "utf-8",
      flush: !1
    }), `${V9("success",A)("Installed Ghostty Shift+Enter key binding")}${GQ}${V9("success",A)("You may need to restart Ghostty for changes to take effect")}${GQ}${UA.dim(`See ${G}`)}${GQ}`
  } catch (D) {
    throw b1(D instanceof Error ? D : new Error(String(D))), new Error("Failed to install Ghostty Shift+Enter key binding")
  }
}
// @from(Start 9707553, End 9709056)
async function rz5(A) {
  let B = ez1();
  try {
    if (!await NT2()) throw new Error("Failed to create backup of iTerm2 preferences, bailing out");
    let {
      code: I
    } = await u0("defaults", ["write", "com.googlecode.iterm2", "GlobalKeyMap", "-dict-add", "0xd-0x20000-0x24", `<dict>
        <key>Text</key>
        <string>\\n</string>
        <key>Action</key>
        <integer>12</integer>
        <key>Version</key>
        <integer>1</integer>
        <key>Keycode</key>
        <integer>13</integer>
        <key>Modifiers</key>
        <integer>131072</integer>
      </dict>`]);
    if (I !== 0) throw new Error("Failed to install iTerm2 Shift+Enter key binding");
    return await u0("defaults", ["export", "com.googlecode.iterm2", B]), eu(), `${V9("success",A)("Installed iTerm2 Shift+Enter key binding")}${GQ}${UA.dim("See iTerm2 → Preferences → Keys")}${GQ}`
  } catch (Q) {
    b1(Q instanceof Error ? Q : new Error(String(Q)));
    let I = ZA().iterm2BackupPath,
      G = !1;
    if (I && x1().existsSync(I)) try {
      await u0("defaults", ["import", "com.googlecode.iterm2", I]), G = !0, eu()
    } catch (Z) {
      b1(new Error(`Failed to restore from backup: ${String(Z)}`))
    }
    throw new Error(`Failed to install iTerm2 Shift+Enter key binding. ${G?"Your settings have been restored from backup.":I&&x1().existsSync(I)?`Restoring from backup failed, try manually with: defaults import com.googlecode.iterm2 ${I}`:"No backup was available to restore from."}`)
  }
}
// @from(Start 9709058, End 9710657)
function sAA(A = "VSCode", B) {
  let Q = A === "VSCode" ? "Code" : A,
    I = ZT(rAA(), Aw1() === "win32" ? ZT("AppData", "Roaming", Q, "User") : Aw1() === "darwin" ? ZT("Library", "Application Support", Q, "User") : ZT(".config", Q, "User")),
    G = ZT(I, "keybindings.json");
  try {
    let Z = "[]",
      D = [];
    if (!x1().existsSync(I)) x1().mkdirSync(I);
    if (x1().existsSync(G)) {
      Z = x1().readFileSync(G, {
        encoding: "utf-8"
      }), D = EvA(Z) ?? [];
      let F = LT2(4).toString("hex"),
        X = `${G}.${F}.bak`;
      try {
        x1().copyFileSync(G, X)
      } catch {
        return `${V9("warning",B)(`Error backing up existing ${A} terminal keybindings. Bailing out.`)}${GQ}${UA.dim(`See ${G}`)}${GQ}${UA.dim(`Backup path: ${X}`)}${GQ}`
      }
    }
    if (D.find((F) => F.key === "shift+enter" && F.command === "workbench.action.terminal.sendSequence" && F.when === "terminalFocus")) return `${V9("warning",B)(`Found existing ${A} terminal Shift+Enter key binding. Remove it to continue.`)}${GQ}${UA.dim(`See ${G}`)}${GQ}`;
    let J = UvA(Z, {
      key: "shift+enter",
      command: "workbench.action.terminal.sendSequence",
      args: {
        text: `\\\r
`
      },
      when: "terminalFocus"
    });
    return x1().writeFileSync(G, J, {
      encoding: "utf-8",
      flush: !1
    }), `${V9("success",B)(`Installed ${A} terminal Shift+Enter key binding`)}${GQ}${UA.dim(`See ${G}`)}${GQ}`
  } catch (Z) {
    throw b1(Z instanceof Error ? Z : new Error(String(Z))), new Error(`Failed to install ${A} terminal Shift+Enter key binding`)
  }
}
// @from(Start 9710658, End 9711107)
async function qT2(A) {
  let {
    code: B
  } = await u0("/usr/libexec/PlistBuddy", ["-c", `Add :'Window Settings':'${A}':useOptionAsMetaKey bool true`, tu()]);
  if (B !== 0) {
    let {
      code: Q
    } = await u0("/usr/libexec/PlistBuddy", ["-c", `Set :'Window Settings':'${A}':useOptionAsMetaKey true`, tu()]);
    if (Q !== 0) return b1(new Error(`Failed to enable Option as Meta key for Terminal.app profile: ${A}`)), !1
  }
  return !0
}
// @from(Start 9711108, End 9711524)
async function MT2(A) {
  let {
    code: B
  } = await u0("/usr/libexec/PlistBuddy", ["-c", `Add :'Window Settings':'${A}':Bell bool false`, tu()]);
  if (B !== 0) {
    let {
      code: Q
    } = await u0("/usr/libexec/PlistBuddy", ["-c", `Set :'Window Settings':'${A}':Bell false`, tu()]);
    if (Q !== 0) return b1(new Error(`Failed to disable audio bell for Terminal.app profile: ${A}`)), !1
  }
  return !0
}
// @from(Start 9711525, End 9713334)
async function oz5(A) {
  try {
    if (!await UT2()) throw new Error("Failed to create backup of Terminal.app preferences, bailing out");
    let {
      stdout: Q,
      code: I
    } = await u0("defaults", ["read", "com.apple.Terminal", "Default Window Settings"]);
    if (I !== 0 || !Q.trim()) throw new Error("Failed to read default Terminal.app profile");
    let {
      stdout: G,
      code: Z
    } = await u0("defaults", ["read", "com.apple.Terminal", "Startup Window Settings"]);
    if (Z !== 0 || !G.trim()) throw new Error("Failed to read startup Terminal.app profile");
    let D = !1,
      Y = Q.trim(),
      W = await qT2(Y),
      J = await MT2(Y);
    if (W || J) D = !0;
    let F = G.trim();
    if (F !== Y) {
      let X = await qT2(F),
        V = await MT2(F);
      if (X || V) D = !0
    }
    if (!D) throw new Error("Failed to enable Option as Meta key or disable audio bell for any Terminal.app profile");
    return await u0("killall", ["cfprefsd"]), bA1(), `${V9("success",A)("Configured Terminal.app settings:")}${GQ}${V9("success",A)('- Enabled "Use Option as Meta key"')}${GQ}${V9("success",A)("- Switched to visual bell")}${GQ}${UA.dim("Option+Enter will now enter a newline.")}${GQ}${UA.dim("You must restart Terminal.app for changes to take effect.",A)}${GQ}`
  } catch (B) {
    b1(B instanceof Error ? B : new Error(String(B)));
    let Q = await tz1(),
      I = "Failed to enable Option as Meta key for Terminal.app.";
    if (Q.status === "restored") throw new Error(`${I} Your settings have been restored from backup.`);
    else if (Q.status === "failed") throw new Error(`${I} Restoring from backup failed, try manually with: defaults import com.apple.Terminal ${Q.backupPath}`);
    else throw new Error(`${I} No backup was available to restore from.`)
  }
}
// @from(Start 9713339, End 9713347)
LE = az5
// @from(Start 9713350, End 9713444)
function ST2(A) {
  return function(B) {
    return (new Map(A).get(B) ?? (() => {}))(B)
  }
}
// @from(Start 9713446, End 9717901)
function Bw1({
  value: A,
  onChange: B,
  onSubmit: Q,
  onExit: I,
  onExitMessage: G,
  onMessage: Z,
  onHistoryUp: D,
  onHistoryDown: Y,
  onHistoryReset: W,
  mask: J = "",
  multiline: F = !1,
  cursorChar: X,
  invert: V,
  columns: C,
  onImagePaste: K,
  disableCursorMovementForUpDownKeys: E = !1,
  externalOffset: N,
  onOffsetChange: q,
  inputFilter: O
}) {
  let R = N,
    T = q,
    L = T5.fromText(A, C, R),
    [_, k] = _T2.useState(null);

  function i() {
    if (!_) return;
    clearTimeout(_), k(null), Z?.(!1)
  }
  let x = $N((k1) => {
      i(), G?.(k1, "Ctrl-C")
    }, () => I?.(), () => {
      if (A) B(""), W?.()
    }),
    s = $N((k1) => {
      i(), Z?.(!!A && k1, "Press Escape again to clear")
    }, () => {
      if (A) B("")
    });

  function d() {
    if (A.trim() !== "") GT(A), W?.();
    return T5.fromText("", C, 0)
  }
  let F1 = $N((k1) => {
    if (A !== "") return;
    G?.(k1, "Ctrl-D")
  }, () => {
    if (A !== "") return;
    I?.()
  });

  function X1() {
    if (i(), L.text === "") return F1(), L;
    return L.del()
  }

  function v(k1) {
    if (k1 === null) {
      if (process.platform !== "darwin") return L;
      return Z?.(!0, WT2), i(), k(setTimeout(() => {
        Z?.(!1)
      }, 4000)), L
    }
    return K?.(k1.base64, k1.mediaType), L
  }
  let D1 = ST2([
      ["a", () => L.startOfLine()],
      ["b", () => L.left()],
      ["c", x],
      ["d", X1],
      ["e", () => L.endOfLine()],
      ["f", () => L.right()],
      ["h", () => L.backspace()],
      ["k", () => L.deleteToLineEnd()],
      ["l", () => d()],
      ["n", () => YA()],
      ["p", () => d1()],
      ["u", () => L.deleteToLineStart()],
      ["v", () => {
        return FT2().then((k1) => {
          v(k1)
        }), L
      }],
      ["w", () => L.deleteWordBefore()]
    ]),
    N1 = ST2([
      ["b", () => L.prevWord()],
      ["f", () => L.nextWord()],
      ["d", () => L.deleteWordAfter()]
    ]);

  function u1(k1) {
    if (F && L.offset > 0 && L.text[L.offset - 1] === "\\") return PT2(), L.backspace().insert(`
`);
    if (k1.meta) return L.insert(`
`);
    Q?.(A)
  }

  function d1() {
    if (E) return D?.(), L;
    let k1 = L.up();
    if (!k1.equals(L)) return k1;
    if (F) {
      let Q1 = L.upLogicalLine();
      if (!Q1.equals(L)) return Q1
    }
    return D?.(), L
  }

  function YA() {
    if (E) return Y?.(), L;
    let k1 = L.down();
    if (!k1.equals(L)) return k1;
    if (F) {
      let Q1 = L.downLogicalLine();
      if (!Q1.equals(L)) return Q1
    }
    return Y?.(), L
  }

  function bA(k1) {
    switch (!0) {
      case k1.escape:
        return s;
      case (k1.leftArrow && (k1.ctrl || k1.meta || k1.fn)):
        return () => L.prevWord();
      case (k1.rightArrow && (k1.ctrl || k1.meta || k1.fn)):
        return () => L.nextWord();
      case k1.backspace:
        return k1.meta ? () => L.deleteWordBefore() : () => L.backspace();
      case k1.delete:
        return k1.meta ? () => L.deleteToLineEnd() : () => L.del();
      case k1.ctrl:
        return D1;
      case k1.home:
        return () => L.startOfLine();
      case k1.end:
        return () => L.endOfLine();
      case k1.pageDown:
        return () => L.endOfLine();
      case k1.pageUp:
        return () => L.startOfLine();
      case k1.meta:
        return N1;
      case k1.return:
        return () => u1(k1);
      case k1.tab:
        return () => L;
      case k1.upArrow:
        return d1;
      case k1.downArrow:
        return YA;
      case k1.leftArrow:
        return () => L.left();
      case k1.rightArrow:
        return () => L.right();
      default:
        return function(Q1) {
          switch (!0) {
            case (Q1 === "\x1B[H" || Q1 === "\x1B[1~"):
              return L.startOfLine();
            case (Q1 === "\x1B[F" || Q1 === "\x1B[4~"):
              return L.endOfLine();
            default:
              if (L.isAtStart() && (Q1 === "!" || Q1 === "#")) return L.insert(UZ(Q1).replace(/\r/g, `
`)).left();
              return L.insert(UZ(Q1).replace(/\r/g, `
`))
          }
        }
    }
  }

  function e1(k1, Q1) {
    let v1 = O ? O(k1, Q1) : k1;
    if (v1 === "" && k1 !== "") return;
    let L1 = bA(Q1)(v1);
    if (L1) {
      if (!L.equals(L1)) {
        if (T(L1.offset), L.text !== L1.text) B(L1.text)
      }
    }
  }
  return {
    onInput: e1,
    renderedValue: L.render(X, J, V),
    offset: R,
    setOffset: T
  }
}
// @from(Start 9717906, End 9717923)
hA1 = I1(U1(), 1)
// @from(Start 9717929, End 9717946)
Qw1 = I1(U1(), 1)
// @from(Start 9717949, End 9719487)
function jT2({
  onPaste: A,
  onInput: B,
  onImagePaste: Q
}) {
  let [I, G] = Qw1.default.useState({
    chunks: [],
    timeoutId: null
  }), [Z, D] = Qw1.default.useState(!1), Y = (F) => {
    if (F) clearTimeout(F);
    return setTimeout(() => {
      G(({
        chunks: X
      }) => {
        let V = X.join("");
        if (Q && nAA(V)) return HT2(V).then((C) => {
          if (C) Promise.resolve().then(() => {
            Q(C.base64, C.mediaType)
          });
          else Promise.resolve().then(() => {
            if (A) A(V);
            D(!1)
          })
        }), {
          chunks: [],
          timeoutId: null
        };
        return Promise.resolve().then(() => {
          if (A) A(V);
          D(!1)
        }), {
          chunks: [],
          timeoutId: null
        }
      })
    }, 100)
  }, {
    stdin: W
  } = Qb();
  return Qw1.default.useEffect(() => {
    if (!W) return;
    let F = (X) => {
      let V = X.toString();
      if (V.includes("\x1B[200~")) D(!0);
      if (V.includes("\x1B[201~")) D(!1)
    };
    return W.on("data", F), () => {
      W.off("data", F), D(!1)
    }
  }, [W]), {
    wrappedOnInput: (F, X) => {
      let V = nAA(F);
      if (A && (F.length > sz1 || I.timeoutId || V)) {
        G(({
          chunks: C,
          timeoutId: K
        }) => {
          return {
            chunks: [...C, F],
            timeoutId: Y(K)
          }
        });
        return
      }
      if (B(F, X), F.length > 10) D(!1)
    },
    pasteState: I,
    isPasting: Z
  }
}