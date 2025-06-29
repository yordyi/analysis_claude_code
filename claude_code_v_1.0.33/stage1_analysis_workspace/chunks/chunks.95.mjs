
// @from(Start 9530893, End 9531414)
NU2 = "Completely replaces the contents of a specific cell in a Jupyter notebook (.ipynb file) with new source. Jupyter notebooks are interactive documents that combine code, text, and visualizations, commonly used for data analysis and scientific computing. The notebook_path parameter must be an absolute path, not a relative path. The cell_number is 0-indexed. Use edit_mode=insert to add a new cell at the index specified by cell_number. Use edit_mode=delete to delete the cell at the index specified by cell_number."
// @from(Start 9531420, End 9532207)
vW5 = n.strictObject({
    notebook_path: n.string().describe("The absolute path to the Jupyter notebook file to edit (must be absolute, not relative)"),
    cell_id: n.string().optional().describe("The ID of the cell to edit. When inserting a new cell, the new cell will be inserted after the cell with this ID, or at the beginning if not specified."),
    new_source: n.string().describe("The new source for the cell"),
    cell_type: n.enum(["code", "markdown"]).optional().describe("The type of the cell (code or markdown). If not specified, it defaults to the current cell type. If using edit_mode=insert, this is required."),
    edit_mode: n.enum(["replace", "insert", "delete"]).optional().describe("The type of edit to make (replace, insert, delete). Defaults to replace.")
  })
// @from(Start 9532211, End 9539190)
iO = {
    name: Ku,
    async description() {
      return UU2
    },
    async prompt() {
      return NU2
    },
    userFacingName() {
      return "Edit Notebook"
    },
    isEnabled() {
      return !0
    },
    inputSchema: vW5,
    isConcurrencySafe() {
      return !1
    },
    isReadOnly() {
      return !1
    },
    getPath(A) {
      return A.notebook_path
    },
    async checkPermissions(A, B) {
      return $S(iO, A, B.getToolPermissionContext())
    },
    mapToolResultToToolResultBlockParam({
      cell_id: A,
      edit_mode: B,
      new_source: Q,
      error: I
    }, G) {
      if (I) return {
        tool_use_id: G,
        type: "tool_result",
        content: I,
        is_error: !0
      };
      switch (B) {
        case "replace":
          return {
            tool_use_id: G, type: "tool_result", content: `Updated cell ${A} with ${Q}`
          };
        case "insert":
          return {
            tool_use_id: G, type: "tool_result", content: `Inserted cell ${A} with ${Q}`
          };
        case "delete":
          return {
            tool_use_id: G, type: "tool_result", content: `Deleted cell ${A}`
          };
        default:
          return {
            tool_use_id: G, type: "tool_result", content: "Unknown edit mode"
          }
      }
    },
    renderToolUseMessage({
      notebook_path: A,
      cell_id: B,
      new_source: Q,
      cell_type: I,
      edit_mode: G
    }, {
      verbose: Z
    }) {
      if (!A || !Q || !I) return null;
      if (Z) return `${A}@${B}, content: ${Q.slice(0,30)}…, cell_type: ${I}, edit_mode: ${G??"replace"}`;
      return `${fW5(dA(),A)}@${B}`
    },
    renderToolUseRejectedMessage(A, {
      verbose: B
    }) {
      return gQ.createElement(EU2, {
        notebook_path: A.notebook_path,
        cell_id: A.cell_id,
        new_source: A.new_source,
        cell_type: A.cell_type,
        edit_mode: A.edit_mode,
        verbose: B
      })
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return gQ.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage({
      cell_id: A,
      new_source: B,
      language: Q,
      error: I
    }) {
      if (I) return gQ.createElement(w0, null, gQ.createElement(P, {
        color: "error"
      }, I));
      return gQ.createElement(w0, null, gQ.createElement(h, {
        flexDirection: "column"
      }, gQ.createElement(P, null, "Updated cell ", gQ.createElement(P, {
        bold: !0
      }, A), ":"), gQ.createElement(h, {
        marginLeft: 2
      }, gQ.createElement(YW, {
        code: B,
        language: Q
      }))))
    },
    async validateInput({
      notebook_path: A,
      cell_type: B,
      cell_id: Q,
      edit_mode: I = "replace"
    }) {
      let G = $U2(A) ? A : qU2(dA(), A),
        Z = x1();
      if (!Z.existsSync(G)) return {
        result: !1,
        message: "Notebook file does not exist.",
        errorCode: 1
      };
      if (xW5(G) !== ".ipynb") return {
        result: !1,
        message: "File must be a Jupyter notebook (.ipynb file). For editing other file types, use the FileEdit tool.",
        errorCode: 2
      };
      if (I !== "replace" && I !== "insert" && I !== "delete") return {
        result: !1,
        message: "Edit mode must be replace, insert, or delete.",
        errorCode: 4
      };
      if (I === "insert" && !B) return {
        result: !1,
        message: "Cell type is required when using edit_mode=insert.",
        errorCode: 5
      };
      let D = UG(G),
        Y = Z.readFileSync(G, {
          encoding: D
        }),
        W = Z8(Y);
      if (!W) return {
        result: !1,
        message: "Notebook is not valid JSON.",
        errorCode: 6
      };
      if (!Q) {
        if (I !== "insert") return {
          result: !1,
          message: "Cell ID must be specified when not inserting a new cell.",
          errorCode: 7
        }
      } else {
        let J = Yu(Q);
        if (J !== void 0) {
          if (!W.cells[J]) return {
            result: !1,
            message: `Cell with index ${J} does not exist in notebook.`,
            errorCode: 7
          }
        } else if (!W.cells.find((F) => F.id === Q)) return {
          result: !1,
          message: `Cell with ID "${Q}" not found in notebook.`,
          errorCode: 8
        }
      }
      return {
        result: !0
      }
    },
    async * call({
      notebook_path: A,
      new_source: B,
      cell_id: Q,
      cell_type: I,
      edit_mode: G
    }) {
      let Z = $U2(A) ? A : qU2(dA(), A);
      try {
        let D = UG(Z),
          Y = x1().readFileSync(Z, {
            encoding: D
          }),
          W = JSON.parse(Y),
          J;
        if (!Q) J = 0;
        else {
          let E = Yu(Q);
          if (E !== void 0) {
            if (J = E, G === "insert") J += 1
          } else if (J = W.cells.findIndex((N) => N.id === Q), G === "insert") J += 1
        }
        let F = G;
        if (F === "replace" && J === W.cells.length) {
          if (F = "insert", !I) I = "code"
        }
        let X = W.metadata.language_info?.name ?? "python",
          V = void 0;
        if (W.nbformat > 4 || W.nbformat === 4 && W.nbformat_minor >= 5) {
          if (F === "insert") V = Math.random().toString(36).substring(2, 15);
          else if (Q !== null) V = Q
        }
        if (F === "delete") W.cells.splice(J, 1);
        else if (F === "insert") {
          let E = {
            cell_type: I,
            id: V,
            source: B,
            metadata: {}
          };
          W.cells.splice(J, 0, I === "markdown" ? E : {
            ...E,
            outputs: []
          })
        } else {
          let E = W.cells[J];
          if (E.source = B, E.execution_count = void 0, E.outputs = [], I && I !== E.cell_type) E.cell_type = I
        }
        let C = eU(Z);
        rM(Z, JSON.stringify(W, null, 1), D, C), yield {
          type: "result",
          data: {
            new_source: B,
            cell_type: I ?? "code",
            language: X,
            edit_mode: F ?? "replace",
            cell_id: V || void 0,
            error: ""
          }
        }
      } catch (D) {
        if (D instanceof Error) {
          yield {
            type: "result",
            data: {
              new_source: B,
              cell_type: I ?? "code",
              language: "python",
              edit_mode: "replace",
              error: D.message,
              cell_id: Q
            }
          };
          return
        }
        yield {
          type: "result",
          data: {
            new_source: B,
            cell_type: I ?? "code",
            language: "python",
            edit_mode: "replace",
            error: "Unknown error occurred while editing notebook",
            cell_id: Q
          }
        }
      }
    }
  }
// @from(Start 9539196, End 9539458)
B2B = n.object({
  continue: n.boolean().optional(),
  modelInstruction: n.string().optional(),
  suppressOutput: n.boolean().optional(),
  stopReason: n.string().optional(),
  decision: n.enum(["approve", "block"]).optional(),
  reason: n.string().optional()
})
// @from(Start 9539464, End 9539472)
gW5 = 10
// @from(Start 9539474, End 9542997)
async function* nO(A, B, Q, I, G, Z, D, Y, W) {
  yield {
    type: "stream_request_start"
  };
  let J = A,
    F = D,
    {
      messages: X,
      wasCompacted: V
    } = await wU2(A, Z);
  if (V) {
    if (E1("tengu_auto_compact_succeeded", {
        originalMessageCount: A.length,
        compactedMessageCount: X.length
      }), !F?.compacted) F = {
      compacted: !0,
      turnId: bW5(),
      turnCounter: 0
    };
    J = X
  }
  let C = [],
    K = Z.options.mainLoopModel,
    E = !0;
  try {
    while (E) {
      E = !1;
      try {
        for await (let _ of wu(Ie1(J, Q), Qe1(B, I), Z.options.maxThinkingTokens, Z.options.tools, Z.abortController.signal, {
          getToolPermissionContext: Z.getToolPermissionContext,
          model: K,
          prependCLISysprompt: !0,
          toolChoice: void 0,
          isNonInteractiveSession: Z.options.isNonInteractiveSession,
          fallbackModel: Y
        })) if (yield _, _.type === "assistant") C.push(_)
      } catch (_) {
        if (_ instanceof wH1 && Y) {
          K = Y, E = !0, C.length = 0, Z.options.mainLoopModel = Y, E1("tengu_model_fallback_triggered", {
            original_model: _.originalModel,
            fallback_model: Y,
            entrypoint: "cli"
          }), yield L11(`Model fallback triggered: switching from ${_.originalModel} to ${_.fallbackModel}`, "info");
          continue
        }
        throw _
      }
    }
  } catch (_) {
    b1(_ instanceof Error ? _ : new Error(String(_)));
    let k = _ instanceof Error ? _.message : String(_);
    E1("tengu_query_error", {
      assistantMessages: C.length,
      toolUses: C.flatMap((x) => x.message.content.filter((s) => s.type === "tool_use")).length
    });
    let i = !1;
    for (let x of C) {
      let s = x.message.content.filter((d) => d.type === "tool_use");
      for (let d of s) yield K2({
        content: [{
          type: "tool_result",
          content: k,
          is_error: !0,
          tool_use_id: d.id
        }],
        toolUseResult: k
      }), i = !0
    }
    if (!i) yield St1({
      toolUse: !1,
      hardcodedMessage: void 0
    });
    return
  }
  if (!C.length) return;
  let N = C.flatMap((_) => _.message.content.filter((k) => k.type === "tool_use"));
  if (!N.length) return;
  let q = [],
    O = !1;
  for await (let _ of hW5(N, C, G, Z)) {
    if (yield _, _ && _.type === "system" && _.preventContinuation) O = !0;
    q.push(...JW([_]).filter((k) => k.type === "user"))
  }
  if (Z.abortController.signal.aborted) {
    yield St1({
      toolUse: !0,
      hardcodedMessage: void 0
    });
    return
  }
  if (O) return;
  let R = q.sort((_, k) => {
    let i = N.findIndex((s) => s.id === (_.type === "user" && _.message.content[0].id)),
      x = N.findIndex((s) => s.id === (k.type === "user" && k.message.content[0].id));
    return i - x
  });
  if (F?.compacted) F.turnCounter++, E1("tengu_post_autocompact_turn", {
    turnId: F.turnId,
    turnCounter: F.turnCounter
  });
  let T = [...Z.getQueuedCommands()];
  for await (let _ of x11(null, Z, null, T)) yield _, q.push(_);
  Z.removeQueuedCommands(T);
  let L = HP() ? {
    ...Z,
    options: {
      ...Z.options,
      mainLoopModel: wX()
    }
  } : Z;
  if (HP() && wX() !== Z.options.mainLoopModel) E1("tengu_fallback_system_msg", {
    mainLoopModel: Z.options.mainLoopModel,
    fallbackModel: wX()
  }), yield L11(`Claude Opus 4 limit reached, now using ${H_(wX())}`, "warning");
  yield* nO([...J, ...C, ...R], B, Q, I, G, L, F, Y, W)
}
// @from(Start 9542998, End 9543181)
async function* hW5(A, B, Q, I) {
  for (let {
      isConcurrencySafe: G,
      blocks: Z
    }
    of mW5(A, I))
    if (G) yield* uW5(Z, B, Q, I);
    else yield* dW5(Z, B, Q, I)
}
// @from(Start 9543183, End 9543582)
function mW5(A, B) {
  return A.reduce((Q, I) => {
    let G = B.options.tools.find((Y) => Y.name === I.name),
      Z = G?.inputSchema.safeParse(I.input),
      D = Z?.success ? Boolean(G?.isConcurrencySafe(Z.data)) : !1;
    if (D && Q[Q.length - 1]?.isConcurrencySafe) Q[Q.length - 1].blocks.push(I);
    else Q.push({
      isConcurrencySafe: D,
      blocks: [I]
    });
    return Q
  }, [])
}
// @from(Start 9543583, End 9543743)
async function* dW5(A, B, Q, I) {
  for (let G of A) yield* MH1(G, B.find((Z) => Z.message.content.some((D) => D.type === "tool_use" && D.id === G.id)), Q, I)
}
// @from(Start 9543744, End 9543911)
async function* uW5(A, B, Q, I) {
  yield* UH1(A.map((G) => MH1(G, B.find((Z) => Z.message.content.some((D) => D.type === "tool_use" && D.id === G.id)), Q, I)), gW5)
}
// @from(Start 9543913, End 9544010)
function Oe1(A, B) {
  A.setInProgressToolUseIDs((Q) => new Set([...Q].filter((I) => I !== B)))
}
// @from(Start 9544011, End 9545281)
async function* MH1(A, B, Q, I) {
  let G = A.name,
    Z = I.options.tools.find((Y) => Y.name === G);
  if (I.setInProgressToolUseIDs((Y) => new Set([...Y, A.id])), !Z) {
    E1("tengu_tool_use_error", {
      error: `No such tool available: ${G}`,
      toolName: G,
      toolUseID: A.id,
      isMcp: !1
    }), yield K2({
      content: [{
        type: "tool_result",
        content: `Error: No such tool available: ${G}`,
        is_error: !0,
        tool_use_id: A.id
      }],
      toolUseResult: `Error: No such tool available: ${G}`
    }), Oe1(I, A.id);
    return
  }
  let D = A.input;
  try {
    if (I.abortController.signal.aborted) {
      E1("tengu_tool_use_cancelled", {
        toolName: Z.name,
        toolUseID: A.id,
        isMcp: Z.isMcp ?? !1
      });
      let Y = kw2(A.id);
      yield K2({
        content: [Y],
        toolUseResult: Ju
      }), Oe1(I, A.id);
      return
    }
    for await (let Y of pW5(Z, A.id, D, I, Q, B)) yield Y
  } catch (Y) {
    b1(Y instanceof Error ? Y : new Error(String(Y))), yield K2({
      content: [{
        type: "tool_result",
        content: "Error calling tool",
        is_error: !0,
        tool_use_id: A.id
      }],
      toolUseResult: "Error calling tool"
    })
  }
  Oe1(I, A.id)
}
// @from(Start 9545282, End 9549237)
async function* pW5(A, B, Q, I, G, Z) {
  let D = A.inputSchema.safeParse(Q);
  if (!D.success) {
    let R = MU2(A.name, D.error);
    E1("tengu_tool_use_error", {
      error: "InputValidationError",
      messageID: Z.message.id,
      toolName: A.name
    }), yield K2({
      content: [{
        type: "tool_result",
        content: `InputValidationError: ${R}`,
        is_error: !0,
        tool_use_id: B
      }],
      toolUseResult: `InputValidationError: ${D.error.message}`
    });
    return
  }
  let Y = A.inputSchema.safeParse(Q);
  if (!Y.success) {
    let R = MU2(A.name, Y.error);
    yield K2({
      content: [{
        type: "tool_result",
        content: `InputValidationError: ${R}`,
        is_error: !0,
        tool_use_id: B
      }],
      toolUseResult: `InputValidationError: ${Y.error.message}`
    });
    return
  }
  let W = await A.validateInput?.(Y.data, I);
  if (W?.result === !1) {
    E1("tengu_tool_use_error", {
      messageID: Z.message.id,
      toolName: A.name,
      errorCode: W.errorCode
    }), yield K2({
      content: [{
        type: "tool_result",
        content: W.message,
        is_error: !0,
        tool_use_id: B
      }],
      toolUseResult: `Error: ${W.message}`
    });
    return
  }
  let J = Y.data,
    F = !1,
    X, V = !1,
    C, K = !1,
    E;
  if (!1) try {} catch (T) {}
  let N;
  if (F) O9(`Hook approved tool use for ${A.name}, bypassing permission check`), N = {
    behavior: "allow",
    updatedInput: J,
    decisionReason: {
      type: "hook",
      hookName: `PreToolUse:${A.name}`,
      reason: X
    }
  };
  else if (V) O9(`Hook denied tool use for ${A.name}`), N = {
    behavior: "deny",
    message: C,
    ruleSuggestions: null,
    decisionReason: {
      type: "hook",
      hookName: `PreToolUse:${A.name}`,
      reason: C
    }
  };
  else N = await G(A, J, I, Z);
  if (N.behavior !== "allow") {
    let R = N.message;
    yield K2({
      content: [{
        type: "tool_result",
        content: R,
        is_error: !0,
        tool_use_id: B
      }],
      toolUseResult: `Error: ${R}`
    });
    return
  }
  J = N.updatedInput;
  let q = Date.now(),
    O = null;
  try {
    let R = A.call(J, {
      ...I,
      userModified: N.userModified ?? !1
    }, G, Z);
    for await (let T of R) switch (T.type) {
      case "result": {
        let L = Date.now() - q;
        if (O = T.data, E1("tengu_tool_use_success", {
            messageID: Z.message.id,
            toolName: A.name,
            isMcp: A.isMcp ?? !1,
            durationMs: L
          }), bK("tool_result", {
            tool_name: A.name,
            success: "true",
            duration_ms: String(L)
          }), yield K2({
            content: [A.mapToolResultToToolResultBlockParam(T.data, B)],
            toolUseResult: T.data
          }), K) yield L11(E || "Execution stopped by hook", "warning", B, !0);
        break
      }
      case "progress":
        E1("tengu_tool_use_progress", {
          messageID: Z.message.id,
          toolName: A.name,
          isMcp: A.isMcp ?? !1
        }), yield yw2({
          toolUseID: T.toolUseID,
          parentToolUseID: B,
          data: T.data
        });
        break
    }
  } catch (R) {
    let T = Date.now() - q;
    if (!(R instanceof NG)) {
      if (!(R instanceof Uz)) b1(R instanceof Error ? R : new Error(String(R)));
      E1("tengu_tool_use_error", {
        messageID: Z.message.id,
        toolName: A.name,
        isMcp: A.isMcp ?? !1
      }), bK("tool_result", {
        tool_name: A.name,
        use_id: B,
        success: "false",
        duration_ms: String(T),
        error: R instanceof Error ? R.message : String(R)
      })
    }
    let L = cW5(R);
    yield K2({
      content: [{
        type: "tool_result",
        content: L,
        is_error: !0,
        tool_use_id: B
      }],
      toolUseResult: `Error: ${L}`
    });
    return
  }
  if (!1) try {} catch (T) {}
}
// @from(Start 9549239, End 9549564)
function cW5(A) {
  if (A instanceof NG) return VV;
  if (!(A instanceof Error)) return String(A);
  let Q = lW5(A).filter(Boolean).join(`
`).trim() || "Error";
  if (Q.length <= 1e4) return Q;
  let I = 5000,
    G = Q.slice(0, I),
    Z = Q.slice(-I);
  return `${G}

... [${Q.length-1e4} characters truncated] ...

${Z}`
}
// @from(Start 9549566, End 9549838)
function lW5(A) {
  if (A instanceof Uz) return [A.interrupted ? VV : "", A.stderr, A.stdout];
  let B = [A.message];
  if ("stderr" in A && typeof A.stderr === "string") B.push(A.stderr);
  if ("stdout" in A && typeof A.stdout === "string") B.push(A.stdout);
  return B
}
// @from(Start 9549840, End 9550979)
function MU2(A, B) {
  let Q = B.errors.filter((Y) => Y.code === "invalid_type" && Y.received === "undefined" && Y.message === "Required").map((Y) => String(Y.path[0])),
    I = B.errors.filter((Y) => Y.code === "unrecognized_keys").flatMap((Y) => Y.keys),
    G = B.errors.filter((Y) => Y.code === "invalid_type" && ("received" in Y) && Y.received !== "undefined" && Y.message !== "Required").map((Y) => {
      let W = Y;
      return {
        param: String(Y.path[0]),
        expected: W.expected,
        received: W.received
      }
    }),
    Z = B.message,
    D = [];
  if (Q.length > 0) {
    let Y = Q.map((W) => `The required parameter \`${W}\` is missing`);
    D.push(...Y)
  }
  if (I.length > 0) {
    let Y = I.map((W) => `An unexpected parameter \`${W}\` was provided`);
    D.push(...Y)
  }
  if (G.length > 0) {
    let Y = G.map(({
      param: W,
      expected: J,
      received: F
    }) => `The parameter \`${W}\` type is expected as \`${J}\` but provided as \`${F}\``);
    D.push(...Y)
  }
  if (D.length > 0) Z = `${A} failed due to the following ${D.length>1?"issues":"issue"}:
${D.join(`
`)}`;
  return Z
}
// @from(Start 9550984, End 9551001)
Te1 = I1(U1(), 1)
// @from(Start 9551007, End 9551024)
d11 = I1(U1(), 1)
// @from(Start 9551069, End 9551292)
function LH1(A) {
  let B = S4(),
    Q = dA(),
    I = A.startsWith(B) ? "~/" + LU2(B, A) : null,
    G = A.startsWith(Q) ? "./" + LU2(Q, A) : null;
  if (I && G) return I.length <= G.length ? I : G;
  return I || G || A
}
// @from(Start 9551294, End 9551544)
function RU2({
  memoryType: A,
  memoryPath: B
}) {
  let Q = LH1(B);
  return d11.createElement(h, {
    flexDirection: "column",
    flexGrow: 1
  }, d11.createElement(P, {
    color: "text"
  }, $H1(A), " updated in ", Q, " · /memory to edit"))
}
// @from(Start 9551546, End 9552293)
function OU2(A) {
  return `You have been asked to add a memory to the memory file at ${A}.

Please follow these guidelines:
- IMPORTANT: ONLY add new content - NEVER modify or remove existing content
- If the file has sections/headings, add the new memory to the most appropriate section
- Add new memories as bullet points within the relevant section
- If no appropriate section exists, you may create a new section for the memory
- Do not elaborate on the memory or add unnecessary commentary
- Preserve the existing structure of the file and integrate new memories naturally. If the file is empty, just add the new memory as a bullet entry, do not add any headings.
- IMPORTANT: Your response MUST be a single tool use for the FileWriteTool`
}
// @from(Start 9552391, End 9552507)
function u11(A) {
  if (!x1().existsSync(A)) return "";
  return x1().readFileSync(A, {
    encoding: "utf-8"
  })
}
// @from(Start 9552509, End 9552682)
function TU2(A) {
  try {
    nW5("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: A,
      stdio: "ignore"
    })
  } catch (B) {
    return !1
  }
  return !0
}
// @from(Start 9552683, End 9552760)
async function RH1(A) {
  let B = iW5(A);
  await R31("CLAUDE.local.md", B)
}
// @from(Start 9552762, End 9553178)
function gK(A) {
  let B = e9();
  if (A === "ExperimentalUltraClaudeMd") return gK("User");
  switch (A) {
    case "User":
      return p11(S4(), "CLAUDE.md");
    case "Local":
      return p11(B, "CLAUDE.local.md");
    case "Project":
      return p11(B, "CLAUDE.md");
    case "Managed":
      return p11(pS1(), "CLAUDE.md");
    case "ExperimentalUltraClaudeMd":
      return p11(S4(), "ULTRACLAUDE.md")
  }
}
// @from(Start 9553183, End 9555652)
SU2 = wG1(async function(A, B, Q = "User") {
  let I = gK(Q);
  if (Q === "Local" && !x1().existsSync(I)) await RH1(I);
  B.addNotification?.({
    text: `Saving ${f11(Q)} memory…`
  }, {
    timeoutMs: 30000
  }), E1("tengu_add_memory_start", {
    memory_type: Q
  }), sW5();
  let G = u11(I);
  if (!x1().existsSync(PU2(I))) try {
    x1().mkdirSync(PU2(I))
  } catch (V) {
    b1(V instanceof Error ? V : new Error(String(V)))
  }
  let Z = [nJ],
    D = K2({
      content: `Memory to add/update:
\`\`\`
${A}
\`\`\`

Existing memory file content:
\`\`\`
${G||"[empty file]"}
\`\`\``
    }),
    Y = await we1([D], [OU2(I)], 0, Z, B.abortController.signal, {
      getToolPermissionContext: B.getToolPermissionContext,
      model: K_(),
      prependCLISysprompt: !0,
      toolChoice: {
        name: nJ.name,
        type: "tool"
      },
      isNonInteractiveSession: B.options.isNonInteractiveSession
    }),
    W = Y.message.content.find((V) => V.type === "tool_use");
  if (!W) {
    b1(new Error("No tool use found in response")), B.addNotification?.({
      text: "Failed to save memory: No tool use found in response",
      color: "error"
    });
    return
  }
  let J = AQ([await aJ(MH1(W, Y, (V, C) => aW5(V, C, I), {
    options: B.options,
    abortController: B.abortController,
    readFileState: {
      [I]: {
        content: x1().existsSync(I) ? wI(I) : "",
        timestamp: x1().existsSync(I) ? x1().statSync(I).mtime.getTime() + 1 : Date.now()
      }
    },
    setToolJSX: B.setToolJSX,
    getToolPermissionContext: B.getToolPermissionContext,
    getQueuedCommands: () => [],
    removeQueuedCommands: () => {},
    setInProgressToolUseIDs: () => {},
    agentId: B.agentId
  }))])[0];
  if (J.type === "user" && J.message.content[0].type === "tool_result" && J.message.content[0].is_error) throw E1("tengu_add_memory_failure", {}), new Error(J.message.content[0].content);
  let F = u11(I);
  if (B.readFileState[I] = {
      content: F,
      timestamp: x1().statSync(I).mtimeMs
    }, E1("tengu_add_memory_success", {}), iJ({
      filePath: I,
      fileContents: G,
      edits: [{
        old_string: G,
        new_string: F,
        replace_all: !1
      }],
      ignoreWhitespace: !0
    }).length > 0) B.addNotification?.({
    jsx: Te1.createElement(RU2, {
      memoryType: Q,
      memoryPath: I
    })
  }, {
    timeoutMs: 1e4
  });
  else B.addNotification?.({
    text: `No changes made to ${f11(Q)} memory`
  })
})
// @from(Start 9555654, End 9555990)
async function aW5(A, B, Q) {
  if (A !== nJ) return {
    behavior: "ask",
    message: "Used incorrect tool"
  };
  let {
    file_path: I
  } = nJ.inputSchema.parse(B);
  if (I !== Q) return {
    behavior: "ask",
    message: `Must use correct memory file path: ${Q}`
  };
  return {
    behavior: "allow",
    updatedInput: B
  }
}
// @from(Start 9555992, End 9556111)
function sW5() {
  let A = ZA(),
    B = (A.memoryUsageCount || 0) + 1;
  j0({
    ...A,
    memoryUsageCount: B
  })
}
// @from(Start 9556116, End 9556132)
H6 = I1(U1(), 1)
// @from(Start 9556136, End 9556152)
_9 = I1(U1(), 1)
// @from(Start 9556158, End 9556175)
c11 = I1(U1(), 1)
// @from(Start 9556178, End 9556676)
function _U2() {
  let [A, B] = c11.useState(0), [Q, I] = c11.useState({
    show: !1
  }), G = c11.useCallback((Z, D = {}) => {
    let {
      timeoutMs: Y = 8000
    } = D;
    B((W) => {
      let J = W + 1;
      return I({
        show: !0,
        content: Z
      }), setTimeout(() => {
        B((F) => {
          if (J === F) I({
            show: !1
          });
          return F
        })
      }, Y), J
    })
  }, []);
  return {
    notification: Q,
    addNotification: G
  }
}
// @from(Start 9556681, End 9556699)
e$2 = I1(o$2(), 1)
// @from(Start 9556702, End 9556847)
function oe1({
  message: A,
  title: B
}) {
  let Q = B ? `${B}:
${A}` : A;
  try {
    process.stdout.write(`\x1B]9;

${Q}\x07`)
  } catch {}
}
// @from(Start 9556849, End 9557148)
function t$2({
  message: A,
  title: B
}) {
  try {
    let Q = Math.floor(Math.random() * 1e4);
    process.stdout.write(`\x1B]99;i=${Q}:d=0:p=title;${B||m0}\x1B\\`), process.stdout.write(`\x1B]99;i=${Q}:p=body;${A}\x1B\\`), process.stdout.write(`\x1B]99;i=${Q}:d=1:a=focus;\x1B\\`)
  } catch {}
}
// @from(Start 9557150, End 9557296)
function JF5({
  message: A,
  title: B
}) {
  try {
    let Q = B || m0;
    process.stdout.write(`\x1B]777;notify;${Q};${A}\x07`)
  } catch {}
}
// @from(Start 9557298, End 9557347)
function te1() {
  process.stdout.write("\x07")
}
// @from(Start 9557348, End 9557559)
async function FF5(A, B) {
  return;
  try {
    let Q = A.title || m0,
      I = c81(B, dA());
    await u0(I, [Q, A.message])
  } catch (Q) {
    M6(`Error triggering custom notify script: ${String(Q)}`)
  }
}
// @from(Start 9557560, End 9558108)
async function XF5() {
  try {
    if (mA.terminal !== "Apple_Terminal") return !1;
    let B = (await u0("osascript", ["-e", 'tell application "Terminal" to name of current settings of front window'])).stdout.trim();
    if (!B) return !1;
    let Q = await u0("defaults", ["export", "com.apple.Terminal", "-"]);
    if (Q.code !== 0) return !1;
    let Z = e$2.default.parse(Q.stdout)?.["Window Settings"]?.[B];
    if (!Z) return !1;
    return Z.Bell === !1
  } catch (A) {
    return b1(A instanceof Error ? A : new Error(String(A))), !1
  }
}
// @from(Start 9558109, End 9559142)
async function _u(A) {
  let B = ZA(),
    Q = B.preferredNotifChannel,
    I = "none";
  if (B.customNotifyCommand) await FF5(A, B.customNotifyCommand);
  switch (Q) {
    case "auto":
      if (mA.terminal === "Apple_Terminal")
        if (await XF5()) te1(), I = "terminal_bell";
        else I = "no_method_available";
      else if (mA.terminal === "iTerm.app") oe1(A), I = "iterm2";
      else if (mA.terminal === "kitty") t$2(A), I = "kitty";
      else if (mA.terminal === "ghostty") JF5(A), I = "ghostty";
      else I = "no_method_available";
      break;
    case "iterm2":
      oe1(A), I = "iterm2";
      break;
    case "terminal_bell":
      te1(), I = "terminal_bell";
      break;
    case "iterm2_with_bell":
      oe1(A), te1(), I = "iterm2_with_bell";
      break;
    case "kitty":
      t$2(A), I = "kitty";
      break;
    case "notifications_disabled":
      I = "disabled";
      break
  }
  await E1("notification_method_used", {
    configured_channel: Q,
    method_used: I,
    term: mA.terminal
  })
}
// @from(Start 9559147, End 9559164)
Aq2 = I1(U1(), 1)
// @from(Start 9559167, End 9559250)
function Bq2(A, B = !1) {
  Aq2.useEffect(() => {
    if (!B) RG1(A)
  }, [A, B])
}
// @from(Start 9559255, End 9559271)
j4 = I1(U1(), 1)
// @from(Start 9559275, End 9559291)
oO = I1(U1(), 1)
// @from(Start 9559297, End 9559313)
TB = I1(U1(), 1)
// @from(Start 9559319, End 9559335)
x$ = I1(U1(), 1)
// @from(Start 9559341, End 9559358)
GA1 = I1(U1(), 1)
// @from(Start 9559361, End 9559502)
function Qq2() {
  return GA1.createElement(w0, {
    height: 1
  }, GA1.createElement(P, {
    color: "error"
  }, "Interrupted by user"))
}
// @from(Start 9559507, End 9559523)
Ny = I1(U1(), 1)
// @from(Start 9559529, End 9559546)
ee1 = I1(U1(), 1)
// @from(Start 9559549, End 9559645)
function ju() {
  return ee1.createElement(P, {
    color: "error"
  }, "Interrupted by user")
}
// @from(Start 9559647, End 9560095)
function Iq2({
  progressMessagesForMessage: A,
  tool: B,
  tools: Q,
  param: I,
  verbose: G
}) {
  if (typeof I.content === "string" && I.content.startsWith(VV)) return Ny.createElement(w0, {
    height: 1
  }, Ny.createElement(ju, null));
  if (!B) return Ny.createElement(K6, {
    result: I.content,
    verbose: G
  });
  return B.renderToolUseErrorMessage(I.content, {
    progressMessagesForMessage: A,
    tools: Q,
    verbose: G
  })
}
// @from(Start 9560100, End 9560117)
ZA1 = I1(U1(), 1)
// @from(Start 9560120, End 9560614)
function Gq2({
  input: A,
  progressMessagesForMessage: B,
  style: Q,
  tool: I,
  tools: G,
  messages: Z,
  verbose: D
}) {
  let {
    columns: Y
  } = c9(), [W] = q9();
  if (!I) return ZA1.createElement(C5, null);
  let J = I.inputSchema.safeParse(A);
  if (!J.success) return ZA1.createElement(C5, null);
  return I.renderToolUseRejectedMessage(J.data, {
    columns: Y,
    messages: Z,
    tools: G,
    verbose: D,
    progressMessagesForMessage: B,
    style: Q,
    theme: W
  })
}
// @from(Start 9560619, End 9560636)
DA1 = I1(U1(), 1)
// @from(Start 9560642, End 9560663)
Zq2 = "\x1B[0m\x1B(B"
// @from(Start 9560666, End 9561075)
function Dq2({
  message: A,
  progressMessagesForMessage: B,
  style: Q,
  tool: I,
  tools: G,
  verbose: Z,
  width: D
}) {
  let [Y] = q9();
  if (!A.toolUseResult || !I) return null;
  return DA1.createElement(h, {
    flexDirection: "row",
    width: D
  }, I.renderToolResultMessage(A.toolUseResult, B, {
    style: Q,
    theme: Y,
    tools: G,
    verbose: Z
  }), DA1.createElement(P, null, Zq2))
}
// @from(Start 9561080, End 9561097)
VF5 = I1(U1(), 1)
// @from(Start 9561103, End 9561120)
Yq2 = I1(U1(), 1)
// @from(Start 9561123, End 9561366)
function CF5(A, B) {
  let Q = null;
  for (let I of B) {
    if (I.type !== "assistant" || !Array.isArray(I.message.content)) continue;
    for (let G of I.message.content)
      if (G.type === "tool_use" && G.id === A) Q = G
  }
  return Q
}
// @from(Start 9561368, End 9561608)
function Wq2(A, B, Q) {
  return Yq2.useMemo(() => {
    let I = CF5(A, Q);
    if (!I) return null;
    let G = B.find((Z) => Z.name === I.name);
    if (!G) return null;
    return {
      tool: G,
      toolUse: I
    }
  }, [A, Q, B])
}
// @from(Start 9561610, End 9562411)
function Jq2({
  param: A,
  message: B,
  messages: Q,
  progressMessagesForMessage: I,
  style: G,
  tools: Z,
  verbose: D,
  width: Y
}) {
  let W = Wq2(A.tool_use_id, Z, Q);
  if (!W) return null;
  if (A.content === Ju) return x$.createElement(Qq2, null);
  if (A.content === N11 || A.content === VV) return x$.createElement(Gq2, {
    input: W.toolUse.input,
    progressMessagesForMessage: I,
    tool: W.tool,
    tools: Z,
    messages: Q,
    style: G,
    verbose: D
  });
  if (A.is_error) return x$.createElement(Iq2, {
    progressMessagesForMessage: I,
    tool: W.tool,
    tools: Z,
    param: A,
    verbose: D
  });
  return x$.createElement(Dq2, {
    message: B,
    progressMessagesForMessage: I,
    style: G,
    tool: W.tool,
    tools: Z,
    verbose: D,
    width: Y
  })
}
// @from(Start 9562416, End 9562432)
dK = I1(U1(), 1)
// @from(Start 9562438, End 9562455)
rH1 = I1(U1(), 1)
// @from(Start 9562461, End 9562477)
sD = I1(U1(), 1)
// @from(Start 9562481, End 9562499)
Q1A = I1(Cq2(), 1)
// @from(Start 9562505, End 9562576)
jF5 = typeof window !== "undefined" ? sD.useLayoutEffect : sD.useEffect
// @from(Start 9562579, End 9562835)
function CV(A, B) {
  let Q = sD.useRef(A);
  jF5(() => {
    Q.current = A
  }, [A]), sD.useEffect(() => {
    if (B === null) return;
    let I = setInterval(() => {
      Q.current()
    }, B);
    return () => {
      clearInterval(I)
    }
  }, [B])
}
// @from(Start 9562837, End 9562949)
function yF5(A) {
  let B = sD.useRef(A);
  B.current = A, sD.useEffect(() => () => {
    B.current()
  }, [])
}
// @from(Start 9562951, End 9563441)
function sH1(A, B = 500, Q) {
  let I = sD.useRef();
  yF5(() => {
    if (I.current) I.current.cancel()
  });
  let G = sD.useMemo(() => {
    let Z = Q1A.default(A, B, Q),
      D = (...Y) => {
        return Z(...Y)
      };
    return D.cancel = () => {
      Z.cancel()
    }, D.isPending = () => {
      return !!I.current
    }, D.flush = () => {
      return Z.flush()
    }, D
  }, [A, B, Q]);
  return sD.useEffect(() => {
    I.current = Q1A.default(A, B, Q)
  }, [A, B, Q]), G
}
// @from(Start 9563443, End 9563786)
function Kq2({
  isError: A,
  isUnresolved: B,
  shouldAnimate: Q
}) {
  let [I, G] = rH1.default.useState(!0);
  return CV(() => {
    if (!Q) return;
    G((D) => !D)
  }, 600), rH1.default.createElement(h, {
    minWidth: 2
  }, rH1.default.createElement(P, {
    color: B ? "secondaryText" : A ? "error" : "success"
  }, I ? FE : "  "))
}
// @from(Start 9563788, End 9565340)
function Hq2({
  param: A,
  addMargin: B,
  tools: Q,
  verbose: I,
  erroredToolUseIDs: G,
  inProgressToolUseIDs: Z,
  resolvedToolUseIDs: D,
  progressMessagesForMessage: Y,
  shouldAnimate: W,
  shouldShowDot: J
}) {
  let [F] = q9(), X = Q.find((O) => O.name === A.name);
  if (!X) return b1(new Error(`Tool ${A.name} not found`)), null;
  let V = D.has(A.id),
    C = !Z.has(A.id) && !V,
    K = C ? "secondaryText" : void 0,
    E = X.inputSchema.safeParse(A.input),
    N = X.userFacingName(E.success ? E.data : void 0);
  if (N === "") return null;
  let q = E.success ? kF5(X, E.data, {
    theme: F,
    verbose: I
  }) : null;
  if (q === null) return null;
  return dK.default.createElement(h, {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: B ? 1 : 0,
    width: "100%"
  }, dK.default.createElement(h, {
    flexDirection: "column"
  }, dK.default.createElement(h, {
    flexDirection: "row",
    flexWrap: "nowrap",
    minWidth: N.length + (J ? 2 : 0)
  }, J && (C ? dK.default.createElement(h, {
    minWidth: 2
  }, dK.default.createElement(P, {
    color: K
  }, FE)) : dK.default.createElement(Kq2, {
    shouldAnimate: W,
    isUnresolved: !V,
    isError: G.has(A.id)
  })), dK.default.createElement(h, {
    flexShrink: 0
  }, dK.default.createElement(P, {
    bold: !0,
    wrap: "truncate-end"
  }, N)), q !== "" && dK.default.createElement(h, {
    flexWrap: "nowrap"
  }, dK.default.createElement(P, null, "(", q, ")"))), !V && !C && xF5(X, Q, Y, {
    verbose: I
  }), !V && C && fF5(X)))
}
// @from(Start 9565342, End 9565662)
function kF5(A, B, {
  theme: Q,
  verbose: I
}) {
  try {
    let G = A.inputSchema.safeParse(B);
    if (!G.success) return "";
    return A.renderToolUseMessage(G.data, {
      theme: Q,
      verbose: I
    })
  } catch (G) {
    return b1(new Error(`Error rendering tool use message for ${A.name}: ${G}`)), ""
  }
}
// @from(Start 9565664, End 9565918)
function xF5(A, B, Q, {
  verbose: I
}) {
  try {
    return A.renderToolUseProgressMessage(Q, {
      tools: B,
      verbose: I
    })
  } catch (G) {
    return b1(new Error(`Error rendering tool use progress message for ${A.name}: ${G}`)), null
  }
}
// @from(Start 9565920, End 9566105)
function fF5(A) {
  try {
    return A.renderToolUseQueuedMessage?.()
  } catch (B) {
    return b1(new Error(`Error rendering tool use queued message for ${A.name}: ${B}`)), null
  }
}
// @from(Start 9566110, End 9566126)
C8 = I1(U1(), 1)
// @from(Start 9566129, End 9568998)
function zq2({
  param: {
    text: A
  },
  addMargin: B,
  shouldShowDot: Q
}) {
  let {
    columns: I
  } = c9(), [G] = q9();
  if (AH1(A)) return null;
  if (A.startsWith(Fl1)) {
    let Z = Number(A.split("|")[1] ?? 0),
      D = zg(Z, !0),
      Y = C8.default.createElement(P, {
        dimColor: !0
      }, " • /upgrade to increase your usage limit.");
    return C8.default.createElement(w0, null, C8.default.createElement(h, {
      flexDirection: "column",
      gap: 1
    }, C8.default.createElement(P, {
      color: "error"
    }, "Claude usage limit reached.", Z ? ` Your limit will reset at ${D}.` : ""), T9() && Y))
  }
  switch (A) {
    case $11:
      return null;
    case Xt:
      return C8.default.createElement(w0, {
        height: 1
      }, C8.default.createElement(P, {
        color: "error"
      }, "Context low · Run /compact to compact & continue"));
    case Jl1:
      return C8.default.createElement(w0, {
        height: 1
      }, C8.default.createElement(P, {
        color: "error"
      }, "Credit balance too low · Add funds: https://console.anthropic.com/settings/billing"));
    case mJ1:
      return C8.default.createElement(w0, {
        height: 1
      }, C8.default.createElement(P, {
        color: "error"
      }, mJ1));
    case dJ1:
      return C8.default.createElement(w0, {
        height: 1
      }, C8.default.createElement(P, {
        color: "error"
      }, dJ1));
    case uJ1:
      return C8.default.createElement(w0, {
        height: 1
      }, C8.default.createElement(P, {
        color: "error"
      }, uJ1));
    case Xl1:
    case Pm:
      return C8.default.createElement(w0, null, C8.default.createElement(h, {
        flexDirection: "column",
        gap: 1
      }, C8.default.createElement(P, {
        color: "error"
      }, "We are experiencing high demand for Opus 4."), C8.default.createElement(P, null, "To continue immediately, use /model to switch to", " ", H_(wX()), " and continue coding.")));
    case b11:
      return C8.default.createElement(w0, {
        height: 1
      }, C8.default.createElement(ju, null));
    default:
      if (A.startsWith(bZ)) return C8.default.createElement(w0, null, C8.default.createElement(P, {
        color: "error"
      }, A === bZ ? `${bZ}: Please wait a moment and try again.` : A));
      return C8.default.createElement(h, {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: B ? 1 : 0,
        width: "100%"
      }, C8.default.createElement(h, {
        flexDirection: "row"
      }, Q && C8.default.createElement(h, {
        minWidth: 2
      }, C8.default.createElement(P, {
        color: "text"
      }, FE)), C8.default.createElement(h, {
        flexDirection: "column",
        width: I - 6
      }, C8.default.createElement(P, null, kK(A, G)))))
  }
}
// @from(Start 9569003, End 9569019)
f$ = I1(U1(), 1)
// @from(Start 9569022, End 9569396)
function oH1({
  param: {
    text: A
  },
  addMargin: B
}) {
  let Q = mG(A, "bash-input");
  if (!Q) return null;
  return f$.createElement(h, {
    flexDirection: "column",
    marginTop: B ? 1 : 0,
    width: "100%"
  }, f$.createElement(h, null, f$.createElement(P, {
    color: "bashBorder"
  }, "!"), f$.createElement(P, {
    color: "secondaryText"
  }, " ", Q)))
}
// @from(Start 9569401, End 9569418)
YA1 = I1(U1(), 1)
// @from(Start 9569421, End 9569759)
function wq2({
  addMargin: A,
  param: {
    text: B
  }
}) {
  let Q = mG(B, "command-message"),
    I = mG(B, "command-args");
  if (!Q) return null;
  return YA1.createElement(h, {
    flexDirection: "column",
    marginTop: A ? 1 : 0,
    width: "100%"
  }, YA1.createElement(P, {
    color: "secondaryText"
  }, "> /", Q, " ", I))
}
// @from(Start 9569764, End 9569780)
yu = I1(U1(), 1)
// @from(Start 9569783, End 9570384)
function Eq2({
  addMargin: A,
  param: {
    text: B
  }
}) {
  let {
    columns: Q
  } = c9();
  if (!B) return b1(new Error("No content found in user prompt message")), null;
  return yu.default.createElement(h, {
    flexDirection: "row",
    marginTop: A ? 1 : 0,
    width: "100%"
  }, yu.default.createElement(h, {
    minWidth: 2,
    width: 2
  }, yu.default.createElement(P, {
    color: "secondaryText"
  }, ">")), yu.default.createElement(h, {
    flexDirection: "column",
    width: Q - 4
  }, yu.default.createElement(P, {
    color: "secondaryText",
    wrap: "wrap"
  }, B.trim())))
}
// @from(Start 9570389, End 9570405)
uG = I1(U1(), 1)
// @from(Start 9570411, End 9570427)
rJ = I1(U1(), 1)
// @from(Start 9570433, End 9570451)
Uq2 = I1(I1A(), 1)
// @from(Start 9570454, End 9570532)
function vF5() {
  return Uq2.sample(["Got it.", "Good to know.", "Noted."])
}
// @from(Start 9570534, End 9571003)
function Nq2({
  param: {
    text: A
  },
  addMargin: B
}) {
  let Q = mG(A, "user-memory-input");
  if (!Q) return null;
  return rJ.createElement(h, {
    flexDirection: "column",
    marginTop: B ? 1 : 0,
    width: "100%"
  }, rJ.createElement(h, null, rJ.createElement(P, {
    color: "remember"
  }, "#"), rJ.createElement(P, {
    color: "remember"
  }, " ", Q)), rJ.createElement(w0, {
    height: 1
  }, rJ.createElement(P, {
    dimColor: !0
  }, vF5())))
}
// @from(Start 9571008, End 9571025)
G1A = I1(U1(), 1)
// @from(Start 9571028, End 9571260)
function $q2({
  content: A,
  verbose: B
}) {
  let Q = mG(A, "bash-stdout") ?? "",
    I = mG(A, "bash-stderr") ?? "";
  return G1A.createElement(Vu, {
    content: {
      stdout: Q,
      stderr: I
    },
    verbose: !!B
  })
}
// @from(Start 9571265, End 9571281)
oJ = I1(U1(), 1)
// @from(Start 9571284, End 9571790)
function qq2({
  content: A
}) {
  let B = mG(A, "local-command-stdout"),
    Q = mG(A, "local-command-stderr");
  if (!B && !Q) return oJ.createElement(w0, null, oJ.createElement(P, {
    color: "secondaryText"
  }, AW));
  let I = [];
  if (B?.trim()) I.push(oJ.createElement(w0, {
    key: "stdout"
  }, oJ.createElement(P, {
    color: "text"
  }, B.trim())));
  if (Q?.trim()) I.push(oJ.createElement(w0, {
    key: "stderr"
  }, oJ.createElement(P, {
    color: "error"
  }, Q.trim())));
  return I
}
// @from(Start 9571792, End 9572717)
function tH1({
  addMargin: A,
  param: B,
  verbose: Q
}) {
  if (B.text.trim() === AW) return null;
  if (B.text.startsWith("<bash-stdout") || B.text.startsWith("<bash-stderr")) return uG.createElement($q2, {
    content: B.text,
    verbose: Q
  });
  if (B.text.startsWith("<local-command-stdout") || B.text.startsWith("<local-command-stderr")) return uG.createElement(qq2, {
    content: B.text
  });
  if (B.text === Wu || B.text === VV) return uG.createElement(w0, {
    height: 1
  }, uG.createElement(ju, null));
  if (B.text.includes("<bash-input>")) return uG.createElement(oH1, {
    addMargin: A,
    param: B
  });
  if (B.text.includes("<command-message>")) return uG.createElement(wq2, {
    addMargin: A,
    param: B
  });
  if (B.text.includes("<user-memory-input>")) return uG.createElement(Nq2, {
    addMargin: A,
    param: B
  });
  return uG.createElement(Eq2, {
    addMargin: A,
    param: B
  })
}
// @from(Start 9572722, End 9572739)
FA1 = I1(U1(), 1)
// @from(Start 9572742, End 9573227)
function Mq2({
  param: {
    thinking: A
  },
  addMargin: B = !1
}) {
  let [Q] = q9();
  if (!A) return null;
  return FA1.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    marginTop: B ? 1 : 0,
    width: "100%"
  }, FA1.default.createElement(P, {
    color: "secondaryText",
    italic: !0
  }, "✻ Thinking…"), FA1.default.createElement(h, {
    paddingLeft: 2
  }, FA1.default.createElement(P, {
    color: "secondaryText",
    italic: !0
  }, kK(A, Q))))
}
// @from(Start 9573232, End 9573249)
Z1A = I1(U1(), 1)
// @from(Start 9573252, End 9573458)
function Lq2({
  addMargin: A = !1
}) {
  return Z1A.default.createElement(h, {
    marginTop: A ? 1 : 0
  }, Z1A.default.createElement(P, {
    color: "secondaryText",
    italic: !0
  }, "✻ Thinking…"))
}
// @from(Start 9573463, End 9573479)
HW = I1(U1(), 1)
// @from(Start 9573541, End 9573557)
zE = I1(U1(), 1)
// @from(Start 9573602, End 9574896)
function Rq2({
  attachment: A,
  verbose: B
}) {
  if (A.files.length === 0) return null;
  let Q = A.files.reduce((G, Z) => G + Z.diagnostics.length, 0),
    I = A.files.length;
  if (B) return zE.default.createElement(h, {
    flexDirection: "column"
  }, A.files.map((G, Z) => zE.default.createElement(zE.default.Fragment, {
    key: Z
  }, zE.default.createElement(w0, null, zE.default.createElement(P, {
    color: "secondaryText",
    wrap: "wrap"
  }, UA.bold(bF5(dA(), G.uri.replace("file://", "").replace("_claude_fs_right:", ""))), " ", UA.dim(G.uri.startsWith("file://") ? "(file://)" : G.uri.startsWith("_claude_fs_right:") ? "(claude_fs_right)" : `(${G.uri.split(":")[0]})`), ":")), G.diagnostics.map((D, Y) => zE.default.createElement(w0, {
    key: Y
  }, zE.default.createElement(P, {
    color: "secondaryText",
    wrap: "wrap"
  }, "  ", PK.getSeveritySymbol(D.severity), " [Line ", D.range.start.line + 1, ":", D.range.start.character + 1, "] ", D.message, D.code ? ` [${D.code}]` : "", D.source ? ` (${D.source})` : ""))))));
  else return zE.default.createElement(w0, null, zE.default.createElement(P, {
    color: "secondaryText",
    wrap: "wrap"
  }, `Found ${UA.bold(Q)} new diagnostic ${Q===1?"issue":"issues"} in ${I} ${I===1?"file":"files"} (ctrl-r to expand)`))
}
// @from(Start 9574898, End 9577124)
function Oq2({
  attachment: A,
  addMargin: B,
  verbose: Q
}) {
  switch (A.type) {
    case "new_directory":
      return HW.default.createElement(v$, {
        text: `Listed directory ${UA.bold(XA1(dA(),A.path)+gF5)}`
      });
    case "new_file":
      if (A.content.type === "notebook") return HW.default.createElement(v$, {
        text: `Read ${UA.bold(XA1(dA(),A.filename))} (${A.content.file.cells.length} cells)`
      });
      return HW.default.createElement(v$, {
        text: `Read ${UA.bold(XA1(dA(),A.filename))} (${A.content.type==="text"?`${A.content.file.numLines}${A.truncated?"+":""} lines`:`${UA.bold(AL(A.content.file.originalSize))}`})`
      });
    case "edited_text_file":
    case "edited_image_file":
      return null;
    case "selected_lines_in_ide":
      return HW.default.createElement(v$, {
        text: `⧉ Selected ${UA.bold(A.content.split(`
`).length)} lines from ${UA.bold(XA1(dA(),A.filename))} in ${A.ideName}`
      });
    case "nested_memory":
      return HW.default.createElement(v$, {
        text: UA.bold(XA1(dA(), A.path))
      });
    case "queued_command":
      return HW.default.createElement(tH1, {
        addMargin: B,
        param: {
          text: A.prompt,
          type: "text"
        },
        verbose: Q
      });
    case "opened_file_in_ide":
    case "ultramemory":
    case "plan_mode":
    case "learn_mode":
      return null;
    case "todo":
      if (A.context === "post-compact") return HW.default.createElement(v$, {
        text: `Todo list read (${A.itemCount} ${A.itemCount===1?"item":"items"})`
      });
      return null;
    case "diagnostics":
      return HW.default.createElement(Rq2, {
        attachment: A,
        verbose: Q
      });
    case "mcp_resource":
      return HW.default.createElement(v$, {
        text: `Read MCP resource ${UA.bold(A.name)} from ${A.server}`
      });
    case "command_permissions":
      if (Q) return HW.default.createElement(v$, {
        text: `Allowed ${UA.bold(A.allowedTools.length)} tools for this command: ${A.allowedTools.join(", ")}`
      });
      return HW.default.createElement(v$, {
        text: `Allowed ${UA.bold(A.allowedTools.length)} tools for this command`
      })
  }
}
// @from(Start 9577126, End 9577291)
function v$({
  text: A
}) {
  return HW.default.createElement(w0, null, HW.default.createElement(P, {
    color: "secondaryText",
    wrap: "wrap"
  }, A.trim()))
}
// @from(Start 9577296, End 9577312)
b$ = I1(U1(), 1)
// @from(Start 9577315, End 9577873)
function Tq2({
  message: A,
  addMargin: B,
  verbose: Q
}) {
  let {
    columns: I
  } = c9();
  if (!Q && A.level !== "warning") return null;
  let G = A.content;
  return b$.createElement(h, {
    flexDirection: "row",
    marginTop: B && !Q ? 1 : 0,
    width: "100%"
  }, b$.createElement(h, {
    flexDirection: "column",
    width: I - 10
  }, A.level === "warning" ? b$.createElement(P, {
    color: "warning",
    wrap: "wrap"
  }, G.trim()) : A.level === "info" ? b$.createElement(P, {
    dimColor: !0,
    wrap: "wrap"
  }, G.trim()) : null))
}
// @from(Start 9577875, End 9579293)
function wE({
  message: A,
  messages: B,
  addMargin: Q,
  tools: I,
  verbose: G,
  erroredToolUseIDs: Z,
  inProgressToolUseIDs: D,
  resolvedToolUseIDs: Y,
  progressMessagesForMessage: W,
  shouldAnimate: J,
  shouldShowDot: F,
  style: X,
  width: V
}) {
  switch (A.type) {
    case "attachment":
      return TB.createElement(Oq2, {
        addMargin: Q,
        attachment: A.attachment,
        verbose: G
      });
    case "assistant":
      return TB.createElement(h, {
        flexDirection: "column",
        width: "100%"
      }, A.message.content.map((C, K) => TB.createElement(mF5, {
        key: K,
        param: C,
        addMargin: Q,
        tools: I,
        verbose: G,
        erroredToolUseIDs: Z,
        inProgressToolUseIDs: D,
        resolvedToolUseIDs: Y,
        progressMessagesForMessage: W,
        shouldAnimate: J,
        shouldShowDot: F,
        width: V
      })));
    case "user":
      return TB.createElement(h, {
        flexDirection: "column",
        width: "100%"
      }, A.message.content.map((C, K) => TB.createElement(hF5, {
        key: K,
        message: A,
        messages: B,
        addMargin: Q,
        tools: I,
        progressMessagesForMessage: W,
        param: C,
        style: X,
        verbose: G
      })));
    case "system":
      return TB.createElement(Tq2, {
        message: A,
        addMargin: Q,
        verbose: G
      })
  }
}
// @from(Start 9579295, End 9579897)
function hF5({
  message: A,
  messages: B,
  addMargin: Q,
  tools: I,
  progressMessagesForMessage: G,
  param: Z,
  style: D,
  verbose: Y
}) {
  let {
    columns: W
  } = c9();
  switch (Z.type) {
    case "text":
      return TB.createElement(tH1, {
        addMargin: Q,
        param: Z,
        verbose: Y
      });
    case "tool_result":
      return TB.createElement(Jq2, {
        param: Z,
        message: A,
        messages: B,
        progressMessagesForMessage: G,
        style: D,
        tools: I,
        verbose: Y,
        width: W - 5
      });
    default:
      return
  }
}
// @from(Start 9579899, End 9580930)
function mF5({
  param: A,
  addMargin: B,
  tools: Q,
  verbose: I,
  erroredToolUseIDs: G,
  inProgressToolUseIDs: Z,
  resolvedToolUseIDs: D,
  progressMessagesForMessage: Y,
  shouldAnimate: W,
  shouldShowDot: J,
  width: F
}) {
  switch (A.type) {
    case "tool_use":
      return TB.createElement(Hq2, {
        param: A,
        addMargin: B,
        tools: Q,
        verbose: I,
        erroredToolUseIDs: G,
        inProgressToolUseIDs: Z,
        resolvedToolUseIDs: D,
        progressMessagesForMessage: Y,
        shouldAnimate: W,
        shouldShowDot: J
      });
    case "text":
      return TB.createElement(zq2, {
        param: A,
        addMargin: B,
        shouldShowDot: J,
        width: F
      });
    case "redacted_thinking":
      return TB.createElement(Lq2, {
        addMargin: B
      });
    case "thinking":
      return TB.createElement(Mq2, {
        addMargin: B,
        param: A
      });
    default:
      return b1(new Error(`Unable to render message type: ${A.type}`)), null
  }
}
// @from(Start 9580981, End 9580988)
eH1 = 7
// @from(Start 9580991, End 9584097)
function Pq2({
  erroredToolUseIDs: A,
  messages: B,
  onSelect: Q,
  onEscape: I,
  tools: G,
  resolvedToolUseIDs: Z
}) {
  let D = oO.useMemo(dF5, []);
  oO.useEffect(() => {
    E1("tengu_message_selector_opened", {})
  }, []);

  function Y(E) {
    let N = B.length - 1 - B.indexOf(E);
    E1("tengu_message_selector_selected", {
      index_from_end: N,
      message_type: E.type,
      is_current_prompt: E.uuid === D
    }), Q(E)
  }

  function W() {
    E1("tengu_message_selector_cancelled", {}), I()
  }
  let J = oO.useMemo(() => [...B.filter(uF5), {
      ...K2({
        content: ""
      }),
      uuid: D
    }], [B, D]),
    [F, X] = oO.useState(J.length - 1),
    V = Y2();
  Z0((E, N) => {
    if (N.tab || N.escape) {
      W();
      return
    }
    if (N.return) {
      Y(J[F]);
      return
    }
    if (N.upArrow)
      if (N.ctrl || N.shift || N.meta) X(0);
      else X((q) => Math.max(0, q - 1));
    if (N.downArrow)
      if (N.ctrl || N.shift || N.meta) X(J.length - 1);
      else X((q) => Math.min(J.length - 1, q + 1))
  });
  let C = Math.max(0, Math.min(F - Math.floor(eH1 / 2), J.length - eH1)),
    K = oO.useMemo(() => AQ(B).filter(Vy), [B]);
  return j4.createElement(j4.Fragment, null, j4.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    height: 4 + Math.min(eH1, J.length) * 2,
    paddingX: 1,
    marginTop: 1
  }, j4.createElement(h, {
    flexDirection: "column",
    minHeight: 2,
    marginBottom: 1
  }, j4.createElement(P, {
    bold: !0
  }, "Jump to a previous message"), j4.createElement(P, {
    dimColor: !0
  }, "This will fork the conversation")), J.slice(C, C + eH1).map((E, N) => {
    let O = C + N === F,
      R = E.uuid === D;
    return j4.createElement(h, {
      key: E.uuid,
      flexDirection: "row",
      height: 2,
      minHeight: 2
    }, j4.createElement(h, {
      width: 7
    }, O ? j4.createElement(P, {
      color: "permission",
      bold: !0
    }, A0.pointer, " ", C + N + 1, " ") : j4.createElement(P, null, "  ", C + N + 1, " ")), j4.createElement(h, {
      height: 1,
      overflow: "hidden",
      width: 100
    }, R ? j4.createElement(h, {
      width: "100%"
    }, j4.createElement(P, {
      dimColor: !0,
      italic: !0
    }, "(current)")) : Array.isArray(E.message.content) && E.message.content[0]?.type === "text" && AH1(E.message.content[0].text) ? j4.createElement(P, {
      dimColor: !0,
      italic: !0
    }, "(empty message)") : j4.createElement(wE, {
      message: UD(AQ([E])),
      messages: K,
      addMargin: !1,
      tools: G,
      verbose: !1,
      erroredToolUseIDs: A,
      inProgressToolUseIDs: new Set,
      resolvedToolUseIDs: Z,
      shouldAnimate: !1,
      shouldShowDot: !1,
      progressMessagesForMessage: []
    })))
  })), j4.createElement(h, {
    marginLeft: 3
  }, j4.createElement(P, {
    dimColor: !0
  }, V.pending ? j4.createElement(j4.Fragment, null, "Press ", V.keyName, " again to exit") : j4.createElement(j4.Fragment, null, "↑/↓ to select · Enter to confirm · Tab/Esc to cancel"))))
}
// @from(Start 9584099, End 9584317)
function uF5(A) {
  if (A.type !== "user") return !1;
  if (Array.isArray(A.message.content) && A.message.content[0]?.type === "tool_result") return !1;
  if (oK1(A)) return !1;
  if (A.isMeta) return !1;
  return !0
}
// @from(Start 9584322, End 9584339)
Sq2 = I1(U1(), 1)
// @from(Start 9584342, End 9589506)
function _q2(A, B) {
  let [Q] = q9(), [, I] = d5();
  Sq2.useEffect(() => {
    I((F) => {
      let X = DV(),
        V = B ? {
          ...X,
          ...B
        } : X,
        C = Object.entries(V).map(([K, E]) => ({
          name: K,
          type: "pending",
          config: E
        }));
      return {
        ...F,
        mcp: {
          ...F.mcp,
          clients: C,
          tools: [],
          commands: [],
          resources: {}
        }
      }
    });
    let G = (F) => {
        I((X) => ({
          ...X,
          mcp: {
            ...X.mcp,
            clients: F(X.mcp.clients)
          }
        }))
      },
      Z = (F) => {
        I((X) => ({
          ...X,
          mcp: {
            ...X.mcp,
            tools: F(X.mcp.tools)
          }
        }))
      },
      D = (F) => {
        I((X) => ({
          ...X,
          mcp: {
            ...X.mcp,
            commands: F(X.mcp.commands)
          }
        }))
      },
      Y = (F) => {
        I((X) => ({
          ...X,
          mcp: {
            ...X.mcp,
            resources: F(X.mcp.resources)
          }
        }))
      };
    G((F) => {
      let X = DV(),
        V = F.filter((C) => X[C.name] || B?.[C.name]);
      if (B) Object.entries(B).forEach(([C, K]) => {
        if (!V.find((E) => E.name === C)) V.push({
          name: C,
          type: "pending",
          config: K
        })
      });
      return V
    }), Z(() => []), D(() => []), Y(() => ({}));
    let W = 0,
      J = ({
        client: F,
        tools: X,
        commands: V,
        resources: C
      }) => {
        try {
          if (F.type === "needs-auth") {
            let K = {
              text: `MCP Server ${UA.bold(F.name)} needs authentication · ${UA.dim("/mcp to authenticate")}`,
              color: "warning"
            };
            A(K, {
              timeoutMs: 1e4
            })
          } else if (F.type === "failed") {
            if (F.config.type !== "sse-ide" && F.config.type !== "ws-ide") W++;
            if (W > 0) {
              let K = {
                text: `${W} MCP server${W>1?"s":""} failed to connect (see /mcp for info)`,
                color: "error"
              };
              A(K, {
                timeoutMs: 1e4
              })
            }
          }
          if (F.type === "connected" && F.client.transport) {
            let E = function(R) {
                if (!K) return;
                K = !1, m7(F.name, R), G((T) => T.map((L) => L.name !== F.name ? L : {
                  name: L.name,
                  type: "failed",
                  config: L.config
                })), Z((T) => ci(T, F.name)), D((T) => li(T, F.name)), Y((T) => ii(T, F.name))
              },
              K = !0,
              N = F.client.transport.onclose;
            F.client.transport.onclose = () => {
              if (N) N();
              if (F.config.type === "sse" || F.config.type === "sse-ide") {
                p2(F.name, "SSE transport closed, attempting to reconnect"), G((T) => T.map((L) => L.name !== F.name ? L : {
                  name: L.name,
                  type: "pending",
                  config: L.config
                }));
                let R = F.client.transport;
                if (R && typeof R.close === "function") R.close().catch((T) => {
                  p2(F.name, `Error closing old transport: ${T}`)
                });
                setTimeout(() => {
                  if (R) R.onclose = void 0, R.onerror = void 0, R.onmessage = void 0
                }, 0), pe(F.name, F.config, J).catch((T) => {
                  m7(F.name, `Reconnection failed: ${T}`), E(`Reconnection failed: ${T}`)
                })
              } else E("transport closed")
            };
            let q = F.client.transport.onerror;
            F.client.transport.onerror = (R) => {
              if (q) q(R);
              if (F.config.type === "sse" || F.config.type === "sse-ide") m7(F.name, `Transport error: ${R}`);
              else E(R)
            };
            let O = F.client.transport.onmessage;
            F.client.transport.onmessage = (...R) => {
              if (O) O.apply(F.client.transport, R);
              if (K) return;
              if (K = !0, G((T) => T.map((L) => L.name !== F.name ? L : {
                  ...F,
                  type: "connected"
                })), Z((T) => {
                  return [...T.filter((L) => !X.includes(L)), ...X]
                }), D((T) => {
                  return [...T.filter((L) => !V.includes(L)), ...V]
                }), C) Y((T) => {
                let L = {
                  ...T
                };
                return L[F.name] = C, L
              })
            }
          }
          if (G((K) => K.map((E) => E.name === F.name ? F : E)), Z((K) => [...K, ...X]), D((K) => [...K, ...V]), C) Y((K) => {
            let E = {
              ...K
            };
            return E[F.name] = C, E
          })
        } catch (K) {
          m7("useMcpUpdates", `Error handling MCP update: ${K instanceof Error?K.message:String(K)}`)
        }
      };
    eC1(J, B)
  }, [I, A, B, Q])
}
// @from(Start 9589511, End 9589528)
jq2 = I1(U1(), 1)
// @from(Start 9589534, End 9589682)
pF5 = n.object({
  method: n.literal("log_event"),
  params: n.object({
    eventName: n.string(),
    eventData: n.object({}).passthrough()
  })
})
// @from(Start 9589685, End 9589959)
function yq2(A) {
  jq2.useEffect(() => {
    if (!A.length) return;
    let B = IW(A);
    if (B) B.client.setNotificationHandler(pF5, async (Q) => {
      let {
        eventName: I,
        eventData: G
      } = Q.params;
      E1(`tengu_ide_${I}`, G)
    })
  }, [A])
}
// @from(Start 9589964, End 9589981)
_AA = I1(U1(), 1)
// @from(Start 9589987, End 9590003)
uK = I1(U1(), 1)
// @from(Start 9590051, End 9590068)
kq2 = I1(U1(), 1)
// @from(Start 9590071, End 9590300)
function o5(A) {
  E1("tengu_unary_event", {
    event: A.event,
    completion_type: A.completion_type,
    language_name: A.metadata.language_name,
    message_id: A.metadata.message_id,
    platform: A.metadata.platform
  })
}
// @from(Start 9590302, End 9590721)
function KV(A, B) {
  kq2.useEffect(() => {
    E1("tengu_tool_use_show_permission_request", {
      messageID: A.assistantMessage.message.id,
      toolName: A.tool.name
    }), o5({
      completion_type: B.completion_type,
      event: "response",
      metadata: {
        language_name: B.language_name,
        message_id: A.assistantMessage.message.id,
        platform: mA.platform
      }
    })
  }, [A, B])
}
// @from(Start 9590726, End 9590743)
VA1 = I1(U1(), 1)
// @from(Start 9590746, End 9590912)
function mI({
  title: A
}) {
  return VA1.createElement(h, {
    flexDirection: "column"
  }, VA1.createElement(P, {
    bold: !0,
    color: "permission"
  }, A))
}
// @from(Start 9590917, End 9590933)
$y = I1(U1(), 1)
// @from(Start 9591024, End 9592158)
function ku({
  onChange: A,
  toolUseContext: B,
  filePath: Q,
  edits: I,
  editMode: G
}) {
  let Z = $y.useRef(!1),
    D = $y.useMemo(() => cF5().slice(0, 6), []),
    Y = $y.useMemo(() => `✻ [Claude Code] ${lF5(Q)} (${D}) ⧉`, [Q, D]),
    W = OF1(B.options.mcpClients) && ZA().diffTool === "auto",
    J = TF1(B.options.mcpClients) ?? "IDE";
  async function F() {
    if (!W) return;
    E1("tengu_ext_will_show_diff", {});
    let {
      oldContent: X,
      newContent: V
    } = await nF5(Q, I, B, Y);
    if (Z.current) return;
    E1("tengu_ext_diff_accepted", {});
    let C = iF5(Q, X, V, G);
    if (C.length === 0) {
      E1("tengu_ext_diff_rejected", {});
      let K = IW(B.options.mcpClients);
      A("no", {
        file_path: Q,
        edits: I
      });
      return
    }
    A("yes", {
      file_path: Q,
      edits: C
    })
  }
  return $y.useEffect(() => {
    return F(), () => {
      Z.current = !0
    }
  }, []), {
    closeTabInIDE() {
      let X = IW(B.options.mcpClients);
      if (!X) return Promise.resolve();
      return xq2(Y, B, X)
    },
    showingDiffInIDE: W,
    ideName: J
  }
}
// @from(Start 9592160, End 9592467)
function iF5(A, B, Q, I) {
  let G = I === "single",
    Z = UE2({
      filePath: A,
      oldContent: B,
      newContent: Q,
      singleHunk: G
    });
  if (Z.length === 0) return [];
  if (G && Z.length > 1) b1(new Error(`Unexpected number of hunks: ${Z.length}. Expected 1 hunk.`));
  return LE2(Z)
}
// @from(Start 9592468, End 9593733)
async function nF5(A, B, Q, I) {
  let G = !1,
    Z = x1(),
    D = d3(A),
    Y = Z.existsSync(D) ? wI(D) : "";
  async function W() {
    if (G) return;
    G = !0;
    try {
      await xq2(I, Q, J)
    } catch (F) {
      b1(F)
    }
    process.off("beforeExit", W), Q.abortController.signal.removeEventListener("abort", W)
  }
  Q.abortController.signal.addEventListener("abort", W), process.on("beforeExit", W);
  let J = IW(Q.options.mcpClients);
  try {
    let {
      updatedFile: F
    } = pO({
      filePath: D,
      fileContents: Y,
      edits: B
    });
    if (!J || J.type !== "connected") throw new Error("IDE client not available");
    let X = await gw("openDiff", {
        old_file_path: D,
        new_file_path: D,
        new_file_contents: F,
        tab_name: I
      }, J, Q.options.isNonInteractiveSession),
      V = {
        type: "result",
        data: Array.isArray(X) ? X : [X]
      };
    if (rF5(V)) return W(), {
      oldContent: Y,
      newContent: V.data[1].text
    };
    else if (aF5(V)) return W(), {
      oldContent: Y,
      newContent: F
    };
    else if (sF5(V)) return W(), {
      oldContent: Y,
      newContent: Y
    };
    throw new Error("Not accepted")
  } catch (F) {
    throw b1(F), W(), F
  }
}
// @from(Start 9593734, End 9593977)
async function xq2(A, B, Q) {
  try {
    if (!Q || Q.type !== "connected") throw new Error("IDE client not available");
    await gw("close_tab", {
      tab_name: A
    }, Q, B.options.isNonInteractiveSession)
  } catch (I) {
    b1(I)
  }
}
// @from(Start 9593979, End 9594217)
function aF5(A) {
  return A.type === "result" && Array.isArray(A.data) && typeof A.data[0] === "object" && A.data[0] !== null && "type" in A.data[0] && A.data[0].type === "text" && "text" in A.data[0] && A.data[0].text === "TAB_CLOSED"
}
// @from(Start 9594219, End 9594460)
function sF5(A) {
  return A.type === "result" && Array.isArray(A.data) && typeof A.data[0] === "object" && A.data[0] !== null && "type" in A.data[0] && A.data[0].type === "text" && "text" in A.data[0] && A.data[0].text === "DIFF_REJECTED"
}
// @from(Start 9594462, End 9594638)
function rF5(A) {
  return A.type === "result" && Array.isArray(A.data) && A.data[0]?.type === "text" && A.data[0].text === "FILE_SAVED" && typeof A.data[1].text === "string"
}
// @from(Start 9594643, End 9594659)
pG = I1(U1(), 1)
// @from(Start 9594704, End 9595526)
function xu({
  onChange: A,
  options: B,
  input: Q,
  file_path: I,
  ideName: G
}) {
  return pG.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, pG.createElement(h, {
    flexDirection: "column",
    padding: 1
  }, pG.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Opened changes in ", G, " ⧉"), tR && pG.createElement(P, {
    dimColor: !0
  }, "Save file to continue…")), pG.createElement(h, {
    flexDirection: "column"
  }, pG.createElement(P, null, "Do you want to make this edit to", " ", pG.createElement(P, {
    bold: !0
  }, oF5(I)), "?"), pG.createElement(p0, {
    options: B,
    onChange: (Z) => A(Z, Q),
    onCancel: () => A("no", Q)
  })))
}
// @from(Start 9595531, End 9595547)
tJ = I1(U1(), 1)
// @from(Start 9595551, End 9595568)
D1A = I1(U1(), 1)
// @from(Start 9595613, End 9596384)
function Az1({
  file_path: A,
  edits: B,
  verbose: Q,
  useBorder: I = !0
}) {
  let G = D1A.useMemo(() => x1().existsSync(A) ? wI(A) : "", [A]),
    Z = D1A.useMemo(() => iJ({
      filePath: A,
      fileContents: G,
      edits: B
    }), [A, G, B]);
  return tJ.createElement(h, {
    flexDirection: "column"
  }, tJ.createElement(h, {
    borderColor: "secondaryBorder",
    borderStyle: I ? "round" : void 0,
    flexDirection: "column",
    paddingX: 1
  }, tJ.createElement(h, {
    paddingBottom: 1
  }, tJ.createElement(P, {
    bold: !0
  }, Q ? A : tF5(dA(), A))), FW(Z.map((D) => tJ.createElement(XW, {
    key: D.newStart,
    patch: D,
    dim: !1
  })), (D) => tJ.createElement(P, {
    color: "secondaryText",
    key: `ellipsis-${D}`
  }, "..."))))
}
// @from(Start 9596427, End 9596662)
function tO(A, {
  assistantMessage: {
    message: {
      id: B
    }
  }
}, Q) {
  o5({
    completion_type: A,
    event: Q,
    metadata: {
      language_name: "none",
      message_id: B,
      platform: mA.platform
    }
  })
}
// @from(Start 9596664, End 9596931)
function eO(A, B, Q, I) {
  let G = B === "edit" ? "acceptEdits" : Q.mode,
    Z = d3(A),
    Y = eF(A, Q) ? Q.additionalWorkingDirectories : new Set([...Q.additionalWorkingDirectories, CA1(Z)]);
  I({
    ...Q,
    mode: G,
    additionalWorkingDirectories: Y
  })
}
// @from(Start 9596933, End 9597055)
function CA1(A) {
  let B = d3(A);
  try {
    if (x1().statSync(B).isDirectory()) return B
  } catch {}
  return eF5(B)
}
// @from(Start 9597057, End 9597474)
function eJ(A, B) {
  let Q = eF(A, B) ? `Yes, and don't ask again this session (${UA.bold.dim("shift+tab")})` : `Yes, add ${UA.bold(CA1(A))} and don't ask again this session (${UA.bold.dim("shift+tab")})`;
  return [{
    label: "Yes",
    value: "yes"
  }, {
    label: Q,
    value: "yes-dont-ask-again"
  }, {
    label: `No, and tell Claude what to do differently (${UA.bold.dim("esc")})`,
    value: "no"
  }]
}
// @from(Start 9597476, End 9601280)
function fq2({
  setToolPermissionContext: A,
  toolUseConfirm: B,
  toolUseContext: Q,
  onDone: I,
  onReject: G,
  verbose: Z
}) {
  let D = gI.inputSchema.parse(B.input),
    {
      file_path: Y,
      new_string: W,
      old_string: J,
      replace_all: F = !1
    } = D,
    X = Q.getToolPermissionContext(),
    V = uK.useMemo(() => ({
      completion_type: "str_replace_single",
      language_name: $G(Y)
    }), [Y]);
  KV(B, V), Z0((q, O) => {
    if (O.tab && O.shift && eJ(Y, X).filter((R) => R.value === "yes-dont-ask-again").length > 0) {
      C("yes-dont-ask-again", {
        file_path: Y,
        edits: [{
          old_string: J,
          new_string: W,
          replace_all: F
        }]
      });
      return
    }
  });

  function C(q, {
    file_path: O,
    edits: R
  }) {
    K();
    let {
      old_string: T,
      new_string: L
    } = R[0];
    if (R.length > 1) b1(new Error("Too many edits provided - continuing with just the first edit"));
    switch (q) {
      case "yes":
        o5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $G(O),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), I(), B.onAllow("temporary", {
          file_path: O,
          new_string: L,
          old_string: T,
          replace_all: F
        });
        break;
      case "yes-dont-ask-again": {
        o5({
          completion_type: "str_replace_single",
          event: "accept",
          metadata: {
            language_name: $G(O),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        });
        let _ = B.toolUseContext.getToolPermissionContext();
        eO(O, "edit", _, A), I(), B.onAllow("permanent", {
          file_path: O,
          new_string: L,
          old_string: T,
          replace_all: F
        });
        break
      }
      case "no":
        o5({
          completion_type: "str_replace_single",
          event: "reject",
          metadata: {
            language_name: $G(O),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), I(), G(), B.onReject();
        break
    }
  }
  let {
    closeTabInIDE: K,
    showingDiffInIDE: E,
    ideName: N
  } = ku({
    onChange: C,
    toolUseContext: Q,
    filePath: Y,
    edits: [{
      old_string: J,
      new_string: W,
      replace_all: F
    }],
    editMode: "single"
  });
  if (E) return uK.default.createElement(xu, {
    onChange: C,
    options: eJ(Y, X),
    file_path: Y,
    input: {
      file_path: Y,
      edits: [{
        old_string: J,
        new_string: W,
        replace_all: F
      }]
    },
    ideName: N
  });
  return uK.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, uK.default.createElement(mI, {
    title: "Edit file"
  }), uK.default.createElement(Az1, {
    file_path: Y,
    edits: [{
      old_string: J,
      new_string: W,
      replace_all: F
    }],
    verbose: Z
  }), uK.default.createElement(h, {
    flexDirection: "column"
  }, uK.default.createElement(P, null, "Do you want to make this edit to", " ", uK.default.createElement(P, {
    bold: !0
  }, AX5(Y)), "?"), uK.default.createElement(p0, {
    options: eJ(Y, X),
    onChange: (q) => C(q, {
      file_path: Y,
      edits: [{
        old_string: J,
        new_string: W,
        replace_all: F
      }]
    }),
    onCancel: () => C("no", {
      file_path: Y,
      edits: [{
        old_string: J,
        new_string: W,
        replace_all: F
      }]
    })
  })))
}
// @from(Start 9601285, End 9601301)
S3 = I1(U1(), 1)
// @from(Start 9601307, End 9601324)
vq2 = I1(U1(), 1)
// @from(Start 9601327, End 9601842)
function Bz1(A, B) {
  vq2.useEffect(() => {
    E1("tengu_tool_use_show_permission_request", {
      messageID: A.assistantMessage.message.id,
      toolName: A.tool.name,
      isMcp: A.tool.isMcp ?? !1
    }), Promise.resolve(B.language_name).then((I) => {
      o5({
        completion_type: B.completion_type,
        event: "response",
        metadata: {
          language_name: I,
          message_id: A.assistantMessage.message.id,
          platform: mA.platform
        }
      })
    })
  }, [A, B])
}
// @from(Start 9601844, End 9602122)
function BX5(A) {
  switch (A.length) {
    case 0:
      return "";
    case 1:
      return UA.bold(A[0]);
    case 2:
      return UA.bold(A[0]) + " and " + UA.bold(A[1]);
    default:
      return UA.bold(A.slice(0, -1).join(", ")) + ", and " + UA.bold(A.slice(-1)[0])
  }
}
// @from(Start 9602124, End 9602216)
function QX5(A) {
  let B = BX5(A);
  if (B.length > 50) return "similar";
  else return B
}
// @from(Start 9602218, End 9602352)
function IX5(A) {
  return A.flatMap((B) => {
    if (!B.ruleContent) return [];
    return mt1(B.ruleContent) ?? B.ruleContent
  })
}
// @from(Start 9602354, End 9602857)
function bq2({
  toolUseConfirm: A
}) {
  let {
    permissionResult: B
  } = A, Q = [], I = B.behavior !== "allow" ? B.ruleSuggestions : void 0;
  if (I && I.length > 0) {
    let G = IX5(I);
    Q = [{
      label: `Yes, and don't ask again for ${QX5(G)} commands in ${UA.bold(e9())}`,
      value: "yes-dont-ask-again-prefix"
    }]
  }
  return [{
    label: "Yes",
    value: "yes"
  }, ...Q, {
    label: `No, and tell Claude what to do differently (${UA.bold.dim("esc")})`,
    value: "no"
  }]
}
// @from(Start 9602862, End 9602878)
K8 = I1(U1(), 1)
// @from(Start 9602881, End 9603259)
function GX5(A) {
  switch (A) {
    case "cliArg":
      return "CLI argument";
    case "command":
      return "command configuration";
    case "localSettings":
      return "local settings";
    case "projectSettings":
      return "project settings";
    case "policySettings":
      return "managed settings";
    case "userSettings":
      return "global settings"
  }
}
// @from(Start 9603261, End 9603723)
function gq2(A) {
  switch (A.type) {
    case "rule":
      return `${UA.bold(m8(A.rule.ruleValue))} rule from ${GX5(A.rule.source)}`;
    case "mode":
      return `${jfA(A.mode)} mode`;
    case "other":
      return A.reason;
    case "permissionPromptTool":
      return `${UA.bold(A.permissionPromptToolName)} permission prompt tool`;
    case "hook":
      return A.reason ? `${UA.bold(A.hookName)} hook: ${A.reason}` : `${UA.bold(A.hookName)} hook`
  }
}
// @from(Start 9603725, End 9604818)
function ZX5({
  title: A,
  decisionReason: B
}) {
  let [Q] = q9();

  function I() {
    switch (B.type) {
      case "subcommandResults":
        return K8.default.createElement(h, {
          flexDirection: "column"
        }, Array.from(B.reasons.entries()).map(([G, Z]) => {
          let D = Z.behavior === "allow" ? V9("success", Q)(A0.tick) : V9("error", Q)(A0.cross);
          return K8.default.createElement(h, {
            flexDirection: "column",
            key: G
          }, K8.default.createElement(P, null, D, " ", G), Z.decisionReason !== void 0 && Z.decisionReason.type !== "subcommandResults" && K8.default.createElement(P, null, "  ", "⎿", "  ", gq2(Z.decisionReason)), Z.behavior !== "allow" && Z.ruleSuggestions && K8.default.createElement(P, null, "  ", "⎿", "  ", "Suggested rules:", " ", Z.ruleSuggestions.map((Y) => UA.bold(m8(Y))).join(", ")))
        }));
      default:
        return K8.default.createElement(P, null, gq2(B))
    }
  }
  return K8.default.createElement(h, {
    flexDirection: "column"
  }, A && K8.default.createElement(P, null, A), I())
}
// @from(Start 9604820, End 9606391)
function hq2({
  permissionResult: A
}) {
  let B = A.decisionReason,
    Q = A.behavior !== "allow" ? A.ruleSuggestions : void 0,
    I = 10;
  return K8.default.createElement(h, {
    flexDirection: "column"
  }, K8.default.createElement(h, {
    flexDirection: "row"
  }, K8.default.createElement(h, {
    justifyContent: "flex-end",
    minWidth: 10
  }, K8.default.createElement(P, {
    dimColor: !0
  }, "Behavior ")), K8.default.createElement(P, null, A.behavior)), A.behavior !== "allow" && K8.default.createElement(h, {
    flexDirection: "row"
  }, K8.default.createElement(h, {
    justifyContent: "flex-end",
    minWidth: 10
  }, K8.default.createElement(P, {
    dimColor: !0
  }, "Message ")), K8.default.createElement(P, null, A.message)), K8.default.createElement(h, {
    flexDirection: "row"
  }, K8.default.createElement(h, {
    justifyContent: "flex-end",
    minWidth: 10
  }, K8.default.createElement(P, {
    dimColor: !0
  }, "Reason ")), B === void 0 ? K8.default.createElement(P, null, "undefined") : K8.default.createElement(ZX5, {
    decisionReason: B
  })), K8.default.createElement(h, {
    flexDirection: "row"
  }, K8.default.createElement(h, {
    flexDirection: "column",
    alignItems: "flex-end",
    minWidth: 10
  }, K8.default.createElement(P, {
    dimColor: !0
  }, "Suggested "), K8.default.createElement(P, {
    dimColor: !0
  }, "rules ")), Q === null || Q === void 0 || Q.length === 0 ? K8.default.createElement(P, null, "None") : Q.map((G, Z) => K8.default.createElement(P, {
    key: Z
  }, A0.bullet, " ", m8(G)))))
}
// @from(Start 9606393, End 9609053)
function mq2({
  setToolPermissionContext: A,
  toolUseConfirm: B,
  onDone: Q,
  onReject: I
}) {
  let [G] = q9(), {
    command: Z,
    description: D
  } = E4.inputSchema.parse(B.input), [Y, W] = S3.useState(!1), J = S3.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);
  Bz1(B, J);
  let F = S3.useMemo(() => bq2({
    toolUseConfirm: B
  }), [B]);
  Z0((V, C) => {
    if (C.ctrl && V === "d") W((K) => !K)
  });

  function X(V) {
    switch (V) {
      case "yes":
        tO("tool_use_single", B, "accept"), B.onAllow("temporary", B.input), Q();
        break;
      case "yes-dont-ask-again-prefix": {
        tO("tool_use_single", B, "accept");
        let C = B.permissionResult.behavior !== "allow" ? B.permissionResult.ruleSuggestions : void 0;
        if (C) ni({
          ruleValues: C,
          ruleBehavior: "allow",
          destination: "localSettings",
          initialContext: B.toolUseContext.getToolPermissionContext(),
          setToolPermissionContext: A
        }).then(() => {
          B.onAllow("permanent", B.input), Q()
        });
        else B.onAllow("temporary", B.input), Q();
        break
      }
      case "no":
        tO("tool_use_single", B, "reject"), B.onReject(), I(), Q();
        break
    }
  }
  return S3.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1
  }, S3.default.createElement(mI, {
    title: "Bash command"
  }), S3.default.createElement(h, {
    flexDirection: "column",
    paddingX: 2,
    paddingY: 1
  }, S3.default.createElement(P, null, E4.renderToolUseMessage({
    command: Z,
    description: D
  }, {
    theme: G,
    verbose: !0
  })), S3.default.createElement(P, {
    color: "secondaryText"
  }, B.description)), Y ? S3.default.createElement(S3.default.Fragment, null, S3.default.createElement(hq2, {
    permissionResult: B.permissionResult
  }), B.toolUseContext.options.debug && S3.default.createElement(h, {
    justifyContent: "flex-end",
    marginTop: 1
  }, S3.default.createElement(P, {
    dimColor: !0
  }, "Ctrl-D to hide debug info"))) : S3.default.createElement(S3.default.Fragment, null, S3.default.createElement(h, {
    flexDirection: "column"
  }, S3.default.createElement(P, null, "Do you want to proceed?"), S3.default.createElement(p0, {
    options: F,
    onChange: X,
    onCancel: () => X("no")
  })), B.toolUseContext.options.debug && S3.default.createElement(h, {
    justifyContent: "flex-end"
  }, S3.default.createElement(P, {
    dimColor: !0
  }, "Ctrl-D to show debug info"))))
}
// @from(Start 9609058, End 9609074)
AF = I1(U1(), 1)
// @from(Start 9609077, End 9612133)
function Qz1({
  setToolPermissionContext: A,
  toolUseConfirm: B,
  onDone: Q,
  onReject: I,
  verbose: G
}) {
  let [Z] = q9(), D = B.tool.userFacingName(B.input), Y = D.endsWith(" (MCP)") ? D.slice(0, -6) : D, W = AF.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);
  KV(B, W);
  let J = (V) => {
      switch (V) {
        case "yes":
          o5({
            completion_type: "tool_use_single",
            event: "accept",
            metadata: {
              language_name: "none",
              message_id: B.assistantMessage.message.id,
              platform: mA.platform
            }
          }), B.onAllow("temporary", B.input), Q();
          break;
        case "yes-dont-ask-again":
          o5({
            completion_type: "tool_use_single",
            event: "accept",
            metadata: {
              language_name: "none",
              message_id: B.assistantMessage.message.id,
              platform: mA.platform
            }
          }), f81({
            rule: {
              ruleBehavior: "allow",
              ruleValue: {
                toolName: B.tool.name
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
          o5({
            completion_type: "tool_use_single",
            event: "reject",
            metadata: {
              language_name: "none",
              message_id: B.assistantMessage.message.id,
              platform: mA.platform
            }
          }), B.onReject(), I(), Q();
          break
      }
    },
    F = e9(),
    X = AF.useMemo(() => {
      return [{
        label: "Yes",
        value: "yes"
      }, {
        label: `Yes, and don't ask again for ${UA.bold(Y)} commands in ${UA.bold(F)}`,
        value: "yes-dont-ask-again"
      }, {
        label: `No, and tell Claude what to do differently (${UA.bold.dim("esc")})`,
        value: "no"
      }]
    }, [Y, F]);
  return AF.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, AF.default.createElement(mI, {
    title: "Tool use"
  }), AF.default.createElement(h, {
    flexDirection: "column",
    paddingX: 2,
    paddingY: 1
  }, AF.default.createElement(P, null, Y, "(", B.tool.renderToolUseMessage(B.input, {
    theme: Z,
    verbose: G
  }), ")", D.endsWith(" (MCP)") ? AF.default.createElement(P, {
    color: "secondaryText"
  }, " (MCP)") : ""), AF.default.createElement(P, {
    color: "secondaryText"
  }, B.description)), AF.default.createElement(h, {
    flexDirection: "column"
  }, AF.default.createElement(P, null, "Do you want to proceed?"), AF.default.createElement(p0, {
    options: X,
    onChange: J,
    onCancel: () => J("no")
  })))
}
// @from(Start 9612138, End 9612155)
Y1A = I1(U1(), 1)
// @from(Start 9612161, End 9612171)
dq2 = 6000
// @from(Start 9612174, End 9612290)
function uq2() {
  if (ZA().messageIdleNotifThresholdMs !== NX.messageIdleNotifThresholdMs) return 0;
  return dq2
}
// @from(Start 9612292, End 9612338)
function DX5() {
  return Date.now() - V21()
}
// @from(Start 9612340, End 9612378)
function YX5(A) {
  return DX5() < A
}
// @from(Start 9612380, End 9612416)
function WX5(A) {
  return !YX5(A)
}
// @from(Start 9612421, End 9612465)
JX5 = L0(() => process.stdin.on("data", Fc))
// @from(Start 9612468, End 9612744)
function pq2(A, B = dq2) {
  Y1A.useEffect(() => {
    JX5(), Fc()
  }, []), Y1A.useEffect(() => {
    let Q = !1,
      I = setInterval(() => {
        if (WX5(B) && !Q) Q = !0, _u({
          message: A
        })
      }, B);
    return () => clearTimeout(I)
  }, [A, B])
}
// @from(Start 9612749, End 9612765)
zW = I1(U1(), 1)
// @from(Start 9612813, End 9612829)
BF = I1(U1(), 1)
// @from(Start 9612833, End 9612850)
Iz1 = I1(U1(), 1)
// @from(Start 9612913, End 9613980)
function cq2({
  file_path: A,
  content: B,
  verbose: Q
}) {
  let I = Iz1.useMemo(() => x1().existsSync(A), [A]),
    G = Iz1.useMemo(() => {
      if (!I) return "";
      let D = UG(A);
      return x1().readFileSync(A, {
        encoding: D
      })
    }, [A, I]),
    Z = Iz1.useMemo(() => {
      if (!I) return null;
      return iJ({
        filePath: A,
        fileContents: G,
        edits: [{
          old_string: G,
          new_string: B,
          replace_all: !1
        }]
      })
    }, [I, A, G, B]);
  return BF.createElement(h, {
    borderColor: "secondaryBorder",
    borderStyle: "round",
    flexDirection: "column",
    paddingX: 1
  }, BF.createElement(h, {
    paddingBottom: 1
  }, BF.createElement(P, {
    bold: !0
  }, Q ? A : XX5(dA(), A))), Z ? FW(Z.map((D) => BF.createElement(XW, {
    key: D.newStart,
    patch: D,
    dim: !1
  })), (D) => BF.createElement(P, {
    color: "secondaryText",
    key: `ellipsis-${D}`
  }, "...")) : BF.createElement(YW, {
    code: B || "(No content)",
    language: FX5(A).slice(1)
  }))
}
// @from(Start 9613982, End 9617554)
function lq2({
  setToolPermissionContext: A,
  toolUseConfirm: B,
  toolUseContext: Q,
  onDone: I,
  onReject: G,
  verbose: Z
}) {
  let {
    file_path: D,
    content: Y
  } = nJ.inputSchema.parse(B.input), W = B.toolUseContext.getToolPermissionContext(), J = zW.useMemo(() => x1().existsSync(D), [D]), F = zW.useMemo(() => ({
    completion_type: "write_file_single",
    language_name: $G(D)
  }), [D]);
  KV(B, F);

  function X(N, {
    file_path: q,
    content: O
  }) {
    switch (C(), N) {
      case "yes":
        o5({
          completion_type: "write_file_single",
          event: "accept",
          metadata: {
            language_name: $G(q),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), B.onAllow("temporary", {
          file_path: q,
          content: O
        }), I();
        break;
      case "yes-dont-ask-again": {
        o5({
          completion_type: "write_file_single",
          event: "accept",
          metadata: {
            language_name: $G(q),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        });
        let R = B.toolUseContext.getToolPermissionContext();
        eO(q, "edit", R, A), I(), B.onAllow("permanent", {
          file_path: q,
          content: O
        });
        break
      }
      case "no":
        o5({
          completion_type: "write_file_single",
          event: "reject",
          metadata: {
            language_name: $G(q),
            message_id: B.assistantMessage.message.id,
            platform: mA.platform
          }
        }), B.onReject(), G(), I();
        break
    }
  }
  Z0((N, q) => {
    if (q.tab && q.shift && eJ(D, W).filter((O) => O.value === "yes-dont-ask-again").length > 0) X("yes-dont-ask-again", {
      file_path: D,
      content: Y
    })
  });
  let V = zW.useMemo(() => x1().existsSync(D) ? wI(D) : "", [D]),
    {
      closeTabInIDE: C,
      showingDiffInIDE: K,
      ideName: E
    } = ku({
      onChange(N, {
        file_path: q,
        edits: O
      }) {
        X(N, {
          file_path: q,
          content: O[0].new_string
        })
      },
      toolUseContext: Q,
      filePath: D,
      edits: [{
        old_string: V,
        new_string: Y,
        replace_all: !1
      }],
      editMode: "single"
    });
  if (K) return zW.default.createElement(xu, {
    onChange: (N, {
      file_path: q,
      new_string: O
    }) => {
      X(N, {
        file_path: q,
        content: O
      })
    },
    options: eJ(D, W),
    file_path: D,
    input: {
      file_path: D,
      old_string: V,
      new_string: Y
    },
    ideName: E
  });
  return zW.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, zW.default.createElement(mI, {
    title: `${J?"Edit":"Create"} file`
  }), zW.default.createElement(h, {
    flexDirection: "column"
  }, zW.default.createElement(cq2, {
    file_path: D,
    content: Y,
    verbose: Z
  })), zW.default.createElement(h, {
    flexDirection: "column"
  }, zW.default.createElement(P, null, "Do you want to ", J ? "make this edit to" : "create", " ", zW.default.createElement(P, {
    bold: !0
  }, VX5(D)), "?"), zW.default.createElement(p0, {
    options: eJ(D, W),
    onChange: (N) => X(N, {
      file_path: D,
      content: Y
    }),
    onCancel: () => X("no", {
      file_path: D,
      content: Y
    })
  })))
}
// @from(Start 9617559, End 9617575)
HV = I1(U1(), 1)
// @from(Start 9617578, End 9617754)
function CX5(A) {
  let B = A.tool;
  if ("getPath" in B && typeof B.getPath === "function") try {
    return B.getPath(A.input)
  } catch {
    return null
  }
  return null
}
// @from(Start 9617756, End 9617889)
function KX5(A) {
  let B = d3(A);
  try {
    return x1().existsSync(B) && x1().statSync(B).isFile()
  } catch {
    return !1
  }
}
// @from(Start 9617891, End 9618486)
function HX5(A, B, Q) {
  if (A === null) return [{
    label: "Yes",
    value: "yes"
  }, {
    label: `No, and tell Claude what to do differently (${UA.bold.dim("esc")})`,
    value: "no"
  }];
  switch (B) {
    case "edit":
      return eJ(A, Q);
    case "read":
      return [{
        label: "Yes",
        value: "yes"
      }, {
        label: `Yes, and add ${UA.bold(CA1(A))} as a working directory for this session`,
        value: "yes-dont-ask-again"
      }, {
        label: `No, and tell Claude what to do differently (${UA.bold.dim("esc")})`,
        value: "no"
      }]
  }
}
// @from(Start 9618488, End 9621205)
function iq2({
  toolUseConfirm: A,
  onDone: B,
  onReject: Q,
  verbose: I,
  setToolPermissionContext: G,
  toolUseContext: Z
}) {
  let [D] = q9(), Y = CX5(A), W = A.tool.userFacingName(A.input), {
    toolType: J,
    userFacingReadOrEdit: F
  } = A.tool.isReadOnly(A.input) ? {
    toolType: "read",
    userFacingReadOrEdit: "Read"
  } : {
    toolType: "edit",
    userFacingReadOrEdit: "Edit"
  }, X = `${F} ${Y&&KX5(Y)?"files":"file"}`, V = HV.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);
  KV(A, V);
  let C = HV.useMemo(() => {
    let E = A.toolUseContext.getToolPermissionContext();
    return HX5(Y, J, E)
  }, [Y, J, A]);

  function K(E) {
    switch (E) {
      case "yes":
        o5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: A.assistantMessage.message.id,
            platform: mA.platform
          }
        }), A.onAllow("temporary", A.input), B();
        break;
      case "yes-dont-ask-again": {
        o5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: A.assistantMessage.message.id,
            platform: mA.platform
          }
        });
        let N = A.toolUseContext.getToolPermissionContext();
        if (Y !== null) eO(Y, J, N, G);
        A.onAllow("permanent", A.input), B();
        break
      }
      case "no":
        o5({
          completion_type: "tool_use_single",
          event: "reject",
          metadata: {
            language_name: "none",
            message_id: A.assistantMessage.message.id,
            platform: mA.platform
          }
        }), A.onReject(), Q(), B();
        break
    }
  }
  if (!Y) return HV.default.createElement(Qz1, {
    setToolPermissionContext: G,
    toolUseConfirm: A,
    toolUseContext: Z,
    onDone: B,
    onReject: Q,
    verbose: I
  });
  return HV.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1
  }, HV.default.createElement(mI, {
    title: X
  }), HV.default.createElement(h, {
    flexDirection: "column",
    paddingX: 2,
    paddingY: 1
  }, HV.default.createElement(P, null, W, "(", A.tool.renderToolUseMessage(A.input, {
    theme: D,
    verbose: I
  }), ")")), HV.default.createElement(h, {
    flexDirection: "column"
  }, HV.default.createElement(P, null, "Do you want to proceed?"), HV.default.createElement(p0, {
    options: C,
    onChange: K,
    onCancel: () => K("no")
  })))
}
// @from(Start 9621210, End 9621227)
W1A = I1(U1(), 1)
// @from(Start 9621314, End 9621330)
wW = I1(U1(), 1)
// @from(Start 9621336, End 9621691)
zX5 = n.strictObject({
    pattern: n.string().describe("The regular expression pattern to search for in file contents"),
    path: n.string().optional().describe("The directory to search in. Defaults to the current working directory."),
    include: n.string().optional().describe('File pattern to include in the search (e.g. "*.js", "*.{ts,tsx}")')
  })
// @from(Start 9621695, End 9621704)
nq2 = 100
// @from(Start 9621708, End 9625370)
qy = {
    name: XJ1,
    async description(A, {
      tools: B
    }) {
      return bc1(B)
    },
    userFacingName() {
      return "Search"
    },
    isEnabled() {
      return !0
    },
    inputSchema: zX5,
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
      return qz(qy, A, B.getToolPermissionContext())
    },
    async prompt({
      tools: A
    }) {
      return bc1(A)
    },
    renderToolUseMessage({
      pattern: A,
      path: B,
      include: Q
    }, {
      verbose: I
    }) {
      if (!A) return null;
      let {
        absolutePath: G,
        relativePath: Z
      } = VP1(B);
      return `pattern: "${A}"${Z||I?`, path: "${I?G:Z}"`:""}${Q?`, include: "${Q}"`:""}`
    },
    renderToolUseRejectedMessage() {
      return wW.default.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return wW.default.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage({
      filenames: A,
      numFiles: B
    }, Q, {
      verbose: I
    }) {
      if (I) return wW.default.createElement(h, {
        flexDirection: "column"
      }, wW.default.createElement(h, {
        flexDirection: "row"
      }, wW.default.createElement(P, null, "  ⎿  Found ", wW.default.createElement(P, {
        bold: !0
      }, B, " "), B === 0 || B > 1 ? "files" : "file")), wW.default.createElement(h, {
        flexDirection: "column",
        marginLeft: 5
      }, A.map((G) => wW.default.createElement(h, {
        key: G
      }, wW.default.createElement(P, null, G)))));
      return wW.default.createElement(w0, {
        height: 1
      }, wW.default.createElement(P, null, "Found ", wW.default.createElement(P, {
        bold: !0
      }, B, " "), B === 0 || B > 1 ? "files" : "file", " ", B > 0 && wW.default.createElement(NO, null)))
    },
    mapToolResultToToolResultBlockParam({
      numFiles: A,
      filenames: B
    }, Q) {
      if (A === 0) return {
        tool_use_id: Q,
        type: "tool_result",
        content: "No files found"
      };
      let I = `Found ${A} file${A===1?"":"s"}
${B.slice(0,nq2).join(`
`)}`;
      if (A > nq2) I += `
(Results are truncated. Consider using a more specific path or pattern.)`;
      return {
        tool_use_id: Q,
        type: "tool_result",
        content: I
      }
    },
    async * call({
      pattern: A,
      path: B,
      include: Q
    }, {
      abortController: I,
      getToolPermissionContext: G
    }) {
      let Z = oM(B) || dA(),
        D = ["-Uli", "--multiline-dotall", A];
      if (Q) {
        let V = [],
          C = Q.split(/\s+/);
        for (let K of C)
          if (K.includes("{") && K.includes("}")) V.push(K);
          else V.push(...K.split(",").filter(Boolean));
        for (let K of V.filter(Boolean)) D.push("--glob", K)
      }
      let Y = b81(jv(G()), dA());
      for (let V of Y) {
        let C = V.startsWith("/") ? `!${V}` : `!**/${V}`;
        D.push("--glob", C)
      }
      let W = await lU(D, Z, I.signal),
        J = await Promise.all(W.map((V) => x1().stat(V))),
        F = W.map((V, C) => [V, J[C]]).sort((V, C) => {
          let K = (C[1].mtimeMs ?? 0) - (V[1].mtimeMs ?? 0);
          if (K === 0) return V[0].localeCompare(C[0]);
          return K
        }).map((V) => V[0]);
      yield {
        type: "result",
        data: {
          filenames: F,
          numFiles: F.length
        }
      }
    }
  }