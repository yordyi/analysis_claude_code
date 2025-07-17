
// @from(Start 9436491, End 9443247)
gI = {
  name: oU,
  async description() {
    return "A tool for editing files"
  },
  async prompt() {
    return NE2
  },
  userFacingName(A) {
    if (!A) return "Update";
    if (A.old_string === "") return "Create";
    return "Update"
  },
  isEnabled() {
    return !0
  },
  inputSchema: RE2,
  isConcurrencySafe() {
    return !1
  },
  isReadOnly() {
    return !1
  },
  getPath(A) {
    return A.file_path
  },
  async checkPermissions(A, B) {
    return $S(gI, A, B.getToolPermissionContext())
  },
  renderToolUseMessage({
    file_path: A
  }, {
    verbose: B
  }) {
    if (!A) return null;
    return B ? A : ZY5(dA(), A)
  },
  renderToolUseProgressMessage() {
    return null
  },
  renderToolResultMessage({
    filePath: A,
    structuredPatch: B
  }, Q, {
    style: I,
    verbose: G
  }) {
    return vK.createElement(WH1, {
      filePath: A,
      structuredPatch: B,
      style: I,
      verbose: G
    })
  },
  renderToolUseRejectedMessage({
    file_path: A,
    old_string: B,
    new_string: Q,
    replace_all: I = !1
  }, {
    style: G,
    verbose: Z
  }) {
    try {
      let D = x1().existsSync(A) ? x1().readFileSync(A, {
          encoding: "utf8"
        }) : "",
        {
          patch: Y
        } = et1({
          filePath: A,
          fileContents: D,
          oldString: B,
          newString: Q,
          replaceAll: I
        });
      return vK.createElement(XH1, {
        file_path: A,
        operation: B === "" ? "write" : "update",
        patch: Y,
        style: G,
        verbose: Z
      })
    } catch (D) {
      return b1(D), vK.createElement(w0, {
        height: 1
      }, vK.createElement(P, null, "(No changes)"))
    }
  },
  async validateInput({
    file_path: A,
    old_string: B,
    new_string: Q,
    replace_all: I = !1
  }, {
    readFileState: G
  }) {
    if (B === Q) return {
      result: !1,
      behavior: "ask",
      message: "No changes to make: old_string and new_string are exactly the same.",
      errorCode: 1
    };
    let Z = VH1(A) ? A : DY5(dA(), A);
    if (fv(Z)) return {
      result: !1,
      behavior: "ask",
      message: "File is in a directory that is ignored by your project configuration.",
      errorCode: 2
    };
    let D = x1();
    if (D.existsSync(Z) && B === "") {
      if (D.readFileSync(Z, {
          encoding: UG(Z)
        }).replaceAll(`\r
`, `
`).trim() !== "") return {
        result: !1,
        behavior: "ask",
        message: "Cannot create new file - file already exists.",
        errorCode: 3
      };
      return {
        result: !0
      }
    }
    if (!D.existsSync(Z) && B === "") return {
      result: !0
    };
    if (!D.existsSync(Z)) {
      let V = xv(Z),
        C = "File does not exist.",
        K = dA(),
        E = e9();
      if (K !== E) C += ` Current working directory: ${K}`;
      if (V) C += ` Did you mean ${V}?`;
      return {
        result: !1,
        behavior: "ask",
        message: C,
        errorCode: 4
      }
    }
    if (Z.endsWith(".ipynb")) return {
      result: !1,
      behavior: "ask",
      message: `File is a Jupyter Notebook. Use the ${Ku} to edit this file.`,
      errorCode: 5
    };
    let Y = G[Z];
    if (!Y) return {
      result: !1,
      behavior: "ask",
      message: "File has not been read yet. Read it first before writing to it.",
      meta: {
        isFilePathAbsolute: String(VH1(A))
      },
      errorCode: 6
    };
    if (D.statSync(Z).mtimeMs > Y.timestamp) return {
      result: !1,
      behavior: "ask",
      message: "File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.",
      errorCode: 7
    };
    let F = D.readFileSync(Z, {
      encoding: UG(Z)
    }).replaceAll(`\r
`, `
`);
    if (!F.includes(B)) return {
      result: !1,
      behavior: "ask",
      message: `String to replace not found in file.
String: ${B}`,
      meta: {
        isFilePathAbsolute: String(VH1(A))
      },
      errorCode: 8
    };
    let X = F.split(B).length - 1;
    if (X > 1 && !I) return {
      result: !1,
      behavior: "ask",
      message: `Found ${X} matches of the string to replace, but replace_all is false. To replace all occurrences, set replace_all to true. To replace only one occurrence, please provide more context to uniquely identify the instance.
String: ${B}`,
      meta: {
        isFilePathAbsolute: String(VH1(A))
      },
      errorCode: 9
    };
    return {
      result: !0
    }
  },
  inputsEquivalent(A, B) {
    return FH1({
      file_path: A.file_path,
      edits: [{
        old_string: A.old_string,
        new_string: A.new_string,
        replace_all: A.replace_all ?? !1
      }]
    }, {
      file_path: B.file_path,
      edits: [{
        old_string: B.old_string,
        new_string: B.new_string,
        replace_all: B.replace_all ?? !1
      }]
    })
  },
  async * call({
    file_path: A,
    old_string: B,
    new_string: Q,
    replace_all: I = !1
  }, {
    readFileState: G,
    userModified: Z
  }) {
    let D = x1(),
      Y = d3(A),
      W = D.existsSync(Y) ? wI(Y) : "";
    await SK.beforeFileEdited(Y);
    let {
      patch: J,
      updatedFile: F
    } = et1({
      filePath: Y,
      fileContents: W,
      oldString: B,
      newString: Q,
      replaceAll: I
    }), X = GY5(Y);
    D.mkdirSync(X);
    let V = D.existsSync(Y) ? eU(Y) : "LF",
      C = D.existsSync(Y) ? UG(Y) : "utf8";
    if (rM(Y, F, C, V), G[Y] = {
        content: F,
        timestamp: D.statSync(Y).mtimeMs
      }, Y.endsWith(`${YY5}CLAUDE.md`)) E1("tengu_write_claudemd", {});
    Ky(J), yield {
      type: "result",
      data: {
        filePath: A,
        oldString: B,
        newString: Q,
        originalFile: W,
        structuredPatch: J,
        userModified: Z ?? !1,
        replaceAll: I
      }
    }
  },
  mapToolResultToToolResultBlockParam({
    filePath: A,
    originalFile: B,
    oldString: Q,
    newString: I,
    userModified: G,
    replaceAll: Z
  }, D) {
    let Y = G ? ".  The user modified your proposed changes before accepting them. " : "";
    if (Z) return {
      tool_use_id: D,
      type: "tool_result",
      content: `The file ${A} has been updated${Y}. All occurrences of '${Q}' were successfully replaced with '${I}'.`
    };
    let {
      snippet: W,
      startLine: J
    } = ME2(B || "", Q, I);
    return {
      tool_use_id: D,
      type: "tool_result",
      content: `The file ${A} has been updated${Y}. Here's the result of running \`cat -n\` on a snippet of the edited file:
${tM({content:W,startLine:J})}`
    }
  },
  renderToolUseErrorMessage(A, {
    verbose: B
  }) {
    return vK.createElement(K6, {
      result: A,
      verbose: B
    })
  }
}
// @from(Start 9443253, End 9443269)
Hy = I1(U1(), 1)
// @from(Start 9443330, End 9443347)
OE2 = "MultiEdit"
// @from(Start 9443351, End 9445839)
TE2 = `This is a tool for making multiple edits to a single file in one operation. It is built on top of the ${oU} tool and allows you to perform multiple find-and-replace operations efficiently. Prefer this tool over the ${oU} tool when you need to make multiple edits to the same file.

Before using this tool:

1. Use the ${TD} tool to understand the file's contents and context
2. Verify the directory path is correct

To make multiple file edits, provide the following:
1. file_path: The absolute path to the file to modify (must be absolute, not relative)
2. edits: An array of edit operations to perform, where each edit contains:
   - old_string: The text to replace (must match the file contents exactly, including all whitespace and indentation)
   - new_string: The edited text to replace the old_string
   - replace_all: Replace all occurences of old_string. This parameter is optional and defaults to false.

IMPORTANT:
- All edits are applied in sequence, in the order they are provided
- Each edit operates on the result of the previous edit
- All edits must be valid for the operation to succeed - if any edit fails, none will be applied
- This tool is ideal when you need to make several changes to different parts of the same file
- For Jupyter notebooks (.ipynb files), use the ${Ku} instead

CRITICAL REQUIREMENTS:
1. All edits follow the same requirements as the single Edit tool
2. The edits are atomic - either all succeed or none are applied
3. Plan your edits carefully to avoid conflicts between sequential operations

WARNING:
- The tool will fail if edits.old_string doesn't match the file contents exactly (including whitespace)
- The tool will fail if edits.old_string and edits.new_string are the same
- Since edits are applied in sequence, ensure that earlier edits don't affect the text that later edits are trying to find

When making edits:
- Ensure all edits result in idiomatic, correct code
- Do not leave the code in a broken state
- Always use absolute file paths (starting with /)
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- Use replace_all for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.

If you want to create a new file, use:
- A new file path, including dir name if needed
- First edit: empty old_string and the new file's contents as new_string
- Subsequent edits: normal edit operations on the created content`
// @from(Start 9445845, End 9446118)
FY5 = n.strictObject({
    old_string: n.string().describe("The text to replace"),
    new_string: n.string().describe("The text to replace it with"),
    replace_all: n.boolean().default(!1).optional().describe("Replace all occurences of old_string (default false).")
  })
// @from(Start 9446122, End 9446365)
XY5 = n.strictObject({
    file_path: n.string().describe("The absolute path to the file to modify"),
    edits: n.array(FY5).min(1, "At least one edit is required").describe("Array of edit operations to perform sequentially on the file")
  })
// @from(Start 9446369, End 9450513)
S$ = {
    name: OE2,
    description: gI.description,
    async prompt() {
      return TE2
    },
    userFacingName(A) {
      if (!A || !A.edits) return "Update";
      if (PE2(A.edits)) return "Create";
      return "Update"
    },
    isEnabled() {
      return !0
    },
    inputSchema: XY5,
    isConcurrencySafe() {
      return !1
    },
    isReadOnly() {
      return !1
    },
    getPath(A) {
      return A.file_path
    },
    async checkPermissions(A, B) {
      return gI.checkPermissions({
        file_path: A.file_path,
        old_string: "",
        new_string: ""
      }, B)
    },
    renderToolUseMessage({
      file_path: A
    }, {
      theme: B,
      verbose: Q
    }) {
      return gI.renderToolUseMessage({
        file_path: A,
        old_string: "",
        new_string: ""
      }, {
        theme: B,
        verbose: Q
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage({
      filePath: A,
      originalFileContents: B,
      structuredPatch: Q,
      userModified: I
    }, G, Z) {
      return gI.renderToolResultMessage({
        filePath: A,
        originalFile: B,
        structuredPatch: Q,
        oldString: "",
        newString: "",
        userModified: I,
        replaceAll: !1
      }, G, Z)
    },
    renderToolUseRejectedMessage({
      file_path: A,
      edits: B
    }, {
      style: Q,
      verbose: I
    }) {
      try {
        let G = x1().existsSync(A) ? x1().readFileSync(A, {
            encoding: "utf8"
          }) : "",
          {
            patch: Z
          } = pO({
            filePath: A,
            fileContents: G,
            edits: JH1(B)
          });
        return Hy.createElement(XH1, {
          file_path: A,
          operation: PE2(B) ? "write" : "update",
          patch: Z,
          style: Q,
          verbose: I
        })
      } catch (G) {
        return b1(G), Hy.createElement(w0, {
          height: 1
        }, Hy.createElement(P, null, "(No changes)"))
      }
    },
    async validateInput({
      file_path: A,
      edits: B
    }, Q) {
      for (let I of B) {
        let G = await gI.validateInput({
          file_path: A,
          old_string: I.old_string,
          new_string: I.new_string,
          replace_all: I.replace_all
        }, Q);
        if (!G.result) return G
      }
      return {
        result: !0
      }
    },
    inputsEquivalent(A, B) {
      let Q = (I) => ({
        file_path: I.file_path,
        edits: JH1(I.edits)
      });
      return FH1(Q(A), Q(B))
    },
    async * call({
      file_path: A,
      edits: B
    }, {
      readFileState: Q,
      userModified: I
    }) {
      let G = JH1(B),
        Z = x1(),
        D = d3(A),
        Y = Z.existsSync(D) ? wI(D) : "";
      await SK.beforeFileEdited(D);
      let {
        patch: W,
        updatedFile: J
      } = pO({
        filePath: D,
        fileContents: Y,
        edits: G
      }), F = WY5(D);
      Z.mkdirSync(F);
      let X = Z.existsSync(D) ? eU(D) : "LF",
        V = Z.existsSync(D) ? UG(D) : "utf8";
      if (rM(D, J, V, X), Q[D] = {
          content: J,
          timestamp: Z.statSync(D).mtimeMs
        }, D.endsWith(`${JY5}CLAUDE.md`)) E1("tengu_write_claudemd", {});
      Ky(W), yield {
        type: "result",
        data: {
          filePath: A,
          edits: G,
          originalFileContents: Y,
          structuredPatch: W,
          userModified: I ?? !1
        }
      }
    },
    mapToolResultToToolResultBlockParam({
      filePath: A,
      edits: B,
      userModified: Q
    }, I) {
      let G = Q ? ".  The user modified your proposed changes before accepting them." : "";
      return {
        tool_use_id: I,
        type: "tool_result",
        content: `Applied ${B.length} edit${B.length===1?"":"s"} to ${A}${G}:
${B.map((Z,D)=>`${D+1}. Replaced "${Z.old_string.substring(0,50)}${Z.old_string.length>50?"...":""}" with "${Z.new_string.substring(0,50)}${Z.new_string.length>50?"...":""}"`).join(`
`)}`
      }
    },
    renderToolUseErrorMessage(A, B) {
      return gI.renderToolUseErrorMessage(A, B)
    }
  }
// @from(Start 9450516, End 9450579)
function PE2(A) {
  return A.some((B) => B.old_string === "")
}
// @from(Start 9450580, End 9450866)
async function SE2(A, B) {
  return {
    name: A.name,
    description: await A.prompt({
      getToolPermissionContext: B.getToolPermissionContext,
      tools: B.tools
    }),
    input_schema: "inputJSONSchema" in A && A.inputJSONSchema ? A.inputJSONSchema : Nm(A.inputSchema)
  }
}
// @from(Start 9450868, End 9451059)
function _E2(A) {
  let [B] = Be1(A);
  E1("tengu_sysprompt_block", {
    snippet: B?.slice(0, 20),
    length: B?.length ?? 0,
    hash: B ? VY5("sha256").update(B).digest("hex") : ""
  })
}
// @from(Start 9451061, End 9451164)
function Be1(A) {
  let B = A[0] || "",
    Q = A.slice(1);
  return [B, Q.join(`
`)].filter(Boolean)
}
// @from(Start 9451166, End 9451263)
function Qe1(A, B) {
  return [...A, Object.entries(B).map(([Q, I]) => `${Q}: ${I}`).join(`
`)]
}
// @from(Start 9451265, End 9451810)
function Ie1(A, B) {
  if (Object.entries(B).length === 0) return A;
  return CY5(B), [K2({
    content: `<system-reminder>
As you answer the user's questions, you can use the following context:
${Object.entries(B).map(([Q,I])=>`# ${Q}
${I}`).join(`
`)}
      
      IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context or otherwise consider it in your response unless it is highly relevant to your task. Most of the time, it is not relevant.
</system-reminder>
`,
    isMeta: !0
  }), ...A]
}
// @from(Start 9451811, End 9452283)
async function CY5(A) {
  let B = A.directoryStructure?.length ?? 0,
    Q = A.gitStatus?.length ?? 0,
    I = A.claudeMd?.length ?? 0,
    G = B + Q + I,
    Z = m9(),
    D = new AbortController;
  setTimeout(() => D.abort(), 1000);
  let Y = await D81(dA(), D.signal, Z.ignorePatterns ?? []);
  E1("tengu_context_size", {
    directory_structure_size: B,
    git_status_size: Q,
    claude_md_size: I,
    total_context_size: G,
    project_file_count_rounded: Y
  })
}
// @from(Start 9452285, End 9452800)
function Ge1(A, B) {
  try {
    let Q = A.message.content.map((I) => {
      if (I.type !== "tool_use") return I;
      if (typeof I.input !== "object" || I.input === null) return I;
      let G = B.find((Z) => Z.name === I.name);
      if (!G) return I;
      return {
        ...I,
        input: KY5(G, I.input)
      }
    });
    return {
      ...A,
      message: {
        ...A.message,
        content: Q
      }
    }
  } catch (Q) {
    return b1(new Error("Error normalizing tool input:" + Q)), A
  }
}
// @from(Start 9452802, End 9453983)
function KY5(A, B) {
  switch (A.name) {
    case E4.name: {
      let {
        command: Q,
        sandbox: I,
        timeout: G,
        description: Z
      } = E4.inputSchema.parse(B), D = Q.replace(`cd ${dA()} && `, "");
      if (D = D.replace(/\\\\;/g, "\\;"), /^echo\s+["']?[^|&;><]*["']?$/i.test(D.trim())) E1("bash_tool_simple_echo", {});
      return {
        command: D,
        ...G ? {
          timeout: G
        } : {},
        ...I !== void 0 ? {
          sandbox: I
        } : {},
        ...Z ? {
          description: Z
        } : {}
      }
    }
    case gI.name: {
      let Q = gI.inputSchema.parse(B),
        {
          file_path: I,
          edits: G
        } = Ae1({
          file_path: Q.file_path,
          edits: [{
            old_string: Q.old_string,
            new_string: Q.new_string,
            replace_all: Q.replace_all
          }]
        });
      return {
        replace_all: G[0].replace_all,
        file_path: I,
        old_string: G[0].old_string,
        new_string: G[0].new_string
      }
    }
    case S$.name: {
      let Q = S$.inputSchema.parse(B);
      return Ae1(Q)
    }
    default:
      return B
  }
}
// @from(Start 9453985, End 9454211)
function HY5(A) {
  if (A?.type === "assistant" && "usage" in A.message && !(A.message.content[0]?.type === "text" && Pt1.has(A.message.content[0].text)) && A.message.model !== "<synthetic>") return A.message.usage;
  return
}
// @from(Start 9454213, End 9454348)
function zY5(A) {
  return A.input_tokens + (A.cache_creation_input_tokens ?? 0) + (A.cache_read_input_tokens ?? 0) + A.output_tokens
}
// @from(Start 9454350, End 9454509)
function VE(A) {
  let B = A.length - 1;
  while (B >= 0) {
    let Q = A[B],
      I = Q ? HY5(Q) : void 0;
    if (I) return zY5(I);
    B--
  }
  return 0
}
// @from(Start 9454514, End 9454531)
CH1 = I1(U1(), 1)
// @from(Start 9454537, End 9454613)
S11 = {
    status: "allowed",
    unifiedRateLimitFallbackAvailable: !1
  }
// @from(Start 9454617, End 9454630)
Ze1 = new Set
// @from(Start 9454633, End 9454941)
function jE2(A) {
  S11 = A, Ze1.forEach((Q) => Q(A));
  let B = Math.round((A.resetsAt ? A.resetsAt - Date.now() / 1000 : 0) / 3600);
  E1("tengu_claudeai_limits_status_changed", {
    status: A.status,
    unifiedRateLimitFallbackAvailable: A.unifiedRateLimitFallbackAvailable,
    hoursTillReset: B
  })
}
// @from(Start 9454942, End 9455330)
async function wY5() {
  let A = K_(),
    B = await TK({
      maxRetries: 0,
      model: A,
      isNonInteractiveSession: !1
    }),
    Q = [{
      role: "user",
      content: "quota"
    }],
    I = jY(A);
  return B.beta.messages.create({
    model: A,
    max_tokens: 1,
    messages: Q,
    metadata: _11(),
    ...I.length > 0 ? {
      betas: I
    } : {}
  }).asResponse()
}
// @from(Start 9455331, End 9455480)
async function yE2() {
  if (!T9()) return;
  try {
    let A = await wY5();
    De1(A.headers)
  } catch (A) {
    if (A instanceof p6) Ye1(A)
  }
}
// @from(Start 9455482, End 9455706)
function Hu() {
  let [A, B] = CH1.useState({
    ...S11
  });
  return CH1.useEffect(() => {
    let Q = (I) => {
      B({
        ...I
      })
    };
    return Ze1.add(Q), () => {
      Ze1.delete(Q)
    }
  }, []), A
}
// @from(Start 9455708, End 9456038)
function kE2(A) {
  let B = A.get("anthropic-ratelimit-unified-status") || "allowed",
    Q = A.get("anthropic-ratelimit-unified-reset"),
    I = Q ? Number(Q) : void 0,
    G = A.get("anthropic-ratelimit-unified-fallback") === "available";
  return {
    status: B,
    resetsAt: I,
    unifiedRateLimitFallbackAvailable: G
  }
}
// @from(Start 9456040, End 9456125)
function De1(A) {
  if (!T9()) return;
  let B = kE2(A);
  if (!s21(S11, B)) jE2(B)
}
// @from(Start 9456127, End 9456350)
function Ye1(A) {
  if (!T9() || A.status !== 429) return;
  try {
    let B = {
      ...S11
    };
    if (A.headers) B = kE2(A.headers);
    if (B.status = "rejected", !s21(S11, B)) jE2(B)
  } catch (B) {
    b1(B)
  }
}
// @from(Start 9456352, End 9456716)
function xE2(A, B, Q, I) {
  if (!Q.resetsAt) return;
  let G = Vg();
  if (!A && Q.unifiedRateLimitFallbackAvailable && (G === void 0 || G === null) && EdA()) {
    I(!0), E1("tengu_claude_ai_limits_enable_fallback", {});
    return
  }
  if (A && B !== void 0 && Q.resetsAt !== void 0 && Q.resetsAt > B) I(!1), E1("tengu_claude_ai_limits_disable_fallback", {})
}
// @from(Start 9456848, End 9456895)
async function We1(A, B) {
  return await B()
}
// @from(Start 9456897, End 9457899)
function NY5(A, B) {
  return A.map((Q) => {
    if (typeof Q === "string") return B(Q);
    return Q.map((I) => {
      switch (I.type) {
        case "tool_result":
          if (typeof I.content === "string") return {
            ...I,
            content: B(I.content)
          };
          if (Array.isArray(I.content)) return {
            ...I,
            content: I.content.map((G) => {
              switch (G.type) {
                case "text":
                  return {
                    ...G, text: B(G.text)
                  };
                case "image":
                  return G;
                default:
                  return
              }
            })
          };
          return I;
        case "text":
          return {
            ...I, text: B(I.text)
          };
        case "tool_use":
          return {
            ...I, input: KH1(I.input, B)
          };
        case "image":
          return I;
        default:
          return
      }
    })
  })
}
// @from(Start 9457901, End 9458068)
function KH1(A, B) {
  return UU(A, (Q, I) => {
    if (Array.isArray(Q)) return Q.map((G) => KH1(G, B));
    if (Hc(Q)) return KH1(Q, B);
    return B(Q, I, A)
  })
}
// @from(Start 9458070, End 9458624)
function vE2(A, B) {
  return {
    uuid: "UUID",
    requestId: "REQUEST_ID",
    timestamp: A.timestamp,
    message: {
      ...A.message,
      content: A.message.content.map((Q) => {
        switch (Q.type) {
          case "text":
            return {
              ...Q, text: B(Q.text), citations: Q.citations || []
            };
          case "tool_use":
            return {
              ...Q, input: KH1(Q.input, B)
            };
          default:
            return Q
        }
      }).filter(Boolean)
    },
    type: "assistant"
  }
}
// @from(Start 9458626, End 9459000)
function bE2(A) {
  if (typeof A !== "string") return A;
  let B = A.replace(/num_files="\d+"/g, 'num_files="[NUM]"').replace(/duration_ms="\d+"/g, 'duration_ms="[DURATION]"').replace(/cost_usd="\d+"/g, 'cost_usd="[COST]"').replace(/\//g, gE2.sep).replaceAll(dA(), "[CWD]");
  if (B.includes("Files modified by user:")) return "Files modified by user: [FILES]";
  return B
}
// @from(Start 9459002, End 9459154)
function $Y5(A) {
  if (typeof A !== "string") return A;
  return A.replaceAll("[NUM]", "1").replaceAll("[DURATION]", "100").replaceAll("[CWD]", dA())
}
// @from(Start 9459155, End 9459204)
async function* Je1(A, B) {
  return yield* B()
}
// @from(Start 9459209, End 9459225)
s7 = I1(U1(), 1)
// @from(Start 9459231, End 9459248)
Fe1 = I1(U1(), 1)
// @from(Start 9459254, End 9459262)
HH1 = !1
// @from(Start 9459266, End 9459566)
qY5 = L0(async function(A) {
    let B = await TK({
        apiKey: A,
        maxRetries: 0,
        isNonInteractiveSession: !0
      }),
      {
        response: Q
      } = await B.models.list({
        limit: 1
      }).withResponse();
    return Q.headers.get("anthropic-organization-id")
  })
// @from(Start 9459568, End 9460413)
async function zH1() {
  try {
    if (T9()) return !1;
    let A = ZA().oauthAccount;
    if (!A) return !1;
    let B = qG(!1);
    if (!B) return !1;
    let Q = A.organizationUuid;
    if (!Q) {
      if (Q = await qY5(B), !Q) return !1
    }
    let I = await P4.get(`https://api.anthropic.com/api/organizations/${Q}/claude_code_data_sharing`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": MR(),
        "x-api-key": B
      }
    });
    if (I.status === 200) {
      let G = I.data.claude_code_data_sharing_enabled;
      if (ZA().isQualifiedForDataSharing !== G) j0({
        ...ZA(),
        isQualifiedForDataSharing: G
      }), HH1 = !1;
      return G
    }
    return E1("tengu_data_sharing_response_err", {
      responseStatus: I.status
    }), !1
  } catch (A) {
    return b1(A), !1
  }
}
// @from(Start 9460415, End 9460517)
function j11() {
  if (process.env.IS_DEMO) return !1;
  return ZA().isQualifiedForDataSharing ?? !1
}
// @from(Start 9460519, End 9460672)
function MY5() {
  HH1 = !0;
  let A = ZA();
  if (A.initialDataSharingMessageSeen) return;
  j0({
    ...A,
    initialDataSharingMessageSeen: !0
  })
}
// @from(Start 9460674, End 9460729)
function hE2() {
  if (HH1) return !1;
  return j11()
}
// @from(Start 9460731, End 9461409)
function LY5() {
  return Fe1.useEffect(() => {
    MY5()
  }, []), s7.createElement(h, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1,
    paddingTop: 1
  }, s7.createElement(P, {
    color: "text"
  }, "Your organization has enrolled in the", " ", s7.createElement(kQ, {
    url: "https://support.anthropic.com/en/articles/11174108-about-the-development-partner-program"
  }, "Development Partner Program"), ". Your Claude Code sessions are being shared with Anthropic to improve our services including model training. Questions? Contact your account", " ", s7.createElement(kQ, {
    url: "https://console.anthropic.com/settings/members"
  }, "admin"), "."))
}
// @from(Start 9461411, End 9461604)
function mE2(A) {
  if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX) return !1;
  return [GN.firstParty, UC.firstParty, uS.firstParty, pS.firstParty].includes(A)
}
// @from(Start 9461606, End 9462010)
function RY5() {
  return Fe1.useEffect(() => {
    HH1 = !0
  }, []), s7.createElement(h, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1,
    paddingTop: 1
  }, s7.createElement(P, {
    color: "text"
  }, "Enrolled in", " ", s7.createElement(kQ, {
    url: "https://support.anthropic.com/en/articles/11174108-about-the-development-partner-program"
  }, "Development Partner Program")))
}
// @from(Start 9462012, End 9462134)
function dE2() {
  return ZA().initialDataSharingMessageSeen ? s7.createElement(RY5, null) : s7.createElement(LY5, null)
}
// @from(Start 9462136, End 9462430)
function OY5(A, B) {
  return {
    inputTokens: A.inputTokens + B.inputTokens,
    outputTokens: A.outputTokens + B.outputTokens,
    promptCacheWriteTokens: A.promptCacheWriteTokens + B.promptCacheWriteTokens,
    promptCacheReadTokens: A.promptCacheReadTokens + B.promptCacheReadTokens
  }
}
// @from(Start 9462435, End 9463191)
uE2 = {
    [kC(pn.firstParty)]: {
      inputTokens: 0.8,
      outputTokens: 4,
      promptCacheWriteTokens: 1,
      promptCacheReadTokens: 0.08
    },
    [kC(pS.firstParty)]: {
      inputTokens: 3,
      outputTokens: 15,
      promptCacheWriteTokens: 3.75,
      promptCacheReadTokens: 0.3
    },
    [kC(uS.firstParty)]: {
      inputTokens: 3,
      outputTokens: 15,
      promptCacheWriteTokens: 3.75,
      promptCacheReadTokens: 0.3
    },
    [kC(GN.firstParty)]: {
      inputTokens: 15,
      outputTokens: 75,
      promptCacheWriteTokens: 18.75,
      promptCacheReadTokens: 1.5
    },
    [kC(UC.firstParty)]: {
      inputTokens: 3,
      outputTokens: 15,
      promptCacheWriteTokens: 3.75,
      promptCacheReadTokens: 0.3
    }
  }
// @from(Start 9463195, End 9463319)
TY5 = {
    inputTokens: -0.9,
    outputTokens: 0,
    promptCacheReadTokens: -0.09,
    promptCacheWriteTokens: -1.125
  }
// @from(Start 9463322, End 9463570)
function pE2(A, B) {
  return B.input_tokens / 1e6 * A.inputTokens + B.output_tokens / 1e6 * A.outputTokens + (B.cache_read_input_tokens ?? 0) / 1e6 * A.promptCacheReadTokens + (B.cache_creation_input_tokens ?? 0) / 1e6 * A.promptCacheWriteTokens
}
// @from(Start 9463572, End 9463944)
function cE2(A, B) {
  let Q = uE2[kC(A)];
  if (!Q) E1("tengu_unknown_model_cost", {
    model: A,
    shortName: kC(A)
  }), EU1(), Q = uE2[kC(tG0)];
  let I = pE2(Q, B),
    G = I;
  if (j11() && mE2(A)) {
    let Z = OY5(Q, TY5);
    E1("tengu_model_cost_discount", {
      model: A
    }), G = pE2(Z, B)
  }
  return {
    stickerCostUSD: I,
    finalCostUSD: G
  }
}
// @from(Start 9463946, End 9464016)
function PY5() {
  return Boolean(process.env.OTEL_LOG_USER_PROMPTS)
}
// @from(Start 9464018, End 9464071)
function Xe1(A) {
  return PY5() ? A : "<REDACTED>"
}
// @from(Start 9464072, End 9464375)
async function bK(A, B = {}) {
  let Q = F9A();
  if (!Q) return;
  let I = {
    ...wY1(),
    "event.name": A,
    "event.timestamp": new Date().toISOString()
  };
  for (let [G, Z] of Object.entries(B))
    if (Z !== void 0) I[G] = Z;
  Q.emit({
    body: `claude_code.${A}`,
    attributes: I
  })
}
// @from(Start 9464377, End 9464739)
function Ve1({
  model: A,
  messagesLength: B,
  temperature: Q,
  betas: I,
  permissionMode: G,
  promptCategory: Z
}) {
  E1("tengu_api_query", {
    model: A,
    messagesLength: B,
    temperature: Q,
    provider: Wz(),
    ...I?.length ? {
      betas: I.join(",")
    } : {},
    permissionMode: G,
    ...Z ? {
      promptCategory: Z
    } : {}
  })
}
// @from(Start 9464741, End 9465519)
function Ce1({
  error: A,
  model: B,
  messageCount: Q,
  messageTokens: I,
  durationMs: G,
  durationMsIncludingRetries: Z,
  attempt: D,
  requestId: Y,
  didFallBackToNonStreaming: W,
  promptCategory: J
}) {
  let F = A instanceof Error ? A.message : String(A),
    X = A instanceof p6 ? String(A.status) : void 0;
  b1(A), E1("tengu_api_error", {
    model: B,
    error: F,
    status: X,
    messageCount: Q,
    messageTokens: I,
    durationMs: G,
    durationMsIncludingRetries: Z,
    attempt: D,
    provider: Wz(),
    requestId: Y || void 0,
    didFallBackToNonStreaming: W,
    ...J ? {
      promptCategory: J
    } : {}
  }), bK("api_error", {
    model: B,
    error: F,
    status_code: String(X),
    duration_ms: String(G),
    attempt: String(D)
  })
}
// @from(Start 9465521, End 9466370)
function SY5({
  model: A,
  messageCount: B,
  messageTokens: Q,
  usage: I,
  durationMs: G,
  durationMsIncludingRetries: Z,
  attempt: D,
  ttftMs: Y,
  requestId: W,
  stopReason: J,
  stickerCostUSD: F,
  costUSD: X,
  didFallBackToNonStreaming: V,
  promptCategory: C
}) {
  E1("tengu_api_success", {
    model: A,
    messageCount: B,
    messageTokens: Q,
    inputTokens: I.input_tokens,
    outputTokens: I.output_tokens,
    cachedInputTokens: I.cache_read_input_tokens ?? 0,
    uncachedInputTokens: I.cache_creation_input_tokens ?? 0,
    durationMs: G,
    durationMsIncludingRetries: Z,
    attempt: D,
    ttftMs: Y ?? void 0,
    provider: Wz(),
    requestId: W ?? void 0,
    stop_reason: J ?? void 0,
    stickerCostUSD: F,
    costUSD: X,
    didFallBackToNonStreaming: V,
    ...C ? {
      promptCategory: C
    } : {}
  })
}
// @from(Start 9466372, End 9466635)
function _Y5(A, B, Q, I) {
  let {
    stickerCostUSD: G,
    finalCostUSD: Z
  } = cE2(A, B), D = Date.now() - Q, Y = Date.now() - I;
  return KE2(Z, Y, D, B, A), {
    stickerCostUSD: G,
    costUSD: Z,
    durationMs: D,
    durationMsIncludingRetries: Y
  }
}
// @from(Start 9466640, End 9466803)
zu = {
  input_tokens: 0,
  cache_creation_input_tokens: 0,
  cache_read_input_tokens: 0,
  output_tokens: 0,
  server_tool_use: {
    web_search_requests: 0
  }
}
// @from(Start 9466806, End 9467768)
function Ke1({
  model: A,
  start: B,
  startIncludingRetries: Q,
  ttftMs: I,
  usage: G,
  attempt: Z,
  messageCount: D,
  messageTokens: Y,
  requestId: W,
  stopReason: J,
  didFallBackToNonStreaming: F,
  promptCategory: X
}) {
  let {
    stickerCostUSD: V,
    costUSD: C,
    durationMs: K,
    durationMsIncludingRetries: E
  } = _Y5(A, G, B, Q);
  SY5({
    model: A,
    messageCount: D,
    messageTokens: Y,
    usage: G,
    durationMs: K,
    durationMsIncludingRetries: E,
    attempt: Z,
    ttftMs: I,
    requestId: W,
    stopReason: J,
    stickerCostUSD: V,
    costUSD: C,
    didFallBackToNonStreaming: F,
    promptCategory: X
  }), bK("api_request", {
    model: A,
    input_tokens: String(G.input_tokens),
    output_tokens: String(G.output_tokens),
    cache_read_tokens: String(G.cache_read_input_tokens),
    cache_creation_tokens: String(G.cache_creation_input_tokens),
    cost_usd: String(C),
    duration_ms: String(K)
  })
}
// @from(Start 9467773, End 9467781)
jY5 = 10
// @from(Start 9467785, End 9467795)
He1 = 3000
// @from(Start 9467799, End 9467806)
yY5 = 3
// @from(Start 9467810, End 9467819)
kY5 = 500
// @from(Start 9467821, End 9468117)
class cO extends Error {
  originalError;
  retryContext;
  constructor(A, B) {
    let Q = A instanceof Error ? A.message : String(A);
    super(Q);
    this.originalError = A;
    this.retryContext = B;
    if (this.name = "RetryError", A instanceof Error && A.stack) this.stack = A.stack
  }
}
// @from(Start 9468118, End 9468355)
class wH1 extends Error {
  originalModel;
  fallbackModel;
  constructor(A, B) {
    super(`Model fallback triggered: ${A} -> ${B}`);
    this.originalModel = A;
    this.fallbackModel = B;
    this.name = "FallbackTriggeredError"
  }
}
// @from(Start 9468356, End 9470306)
async function y11(A, B, Q) {
  let I = Q.maxRetries ?? jY5,
    G, Z = {
      model: Q.model
    },
    D = 0,
    Y = null;
  for (let W = 1; W <= I + 1; W++) try {
    if (Y === null || G instanceof p6 && G.status === 401) Y = await A();
    return await B(Y, W, Z)
  } catch (J) {
    if (G = J, fY5(J) && !T9() && UG1(Q.model)) {
      if (D++, D >= yY5)
        if (Q.fallbackModel) throw E1("tengu_api_opus_fallback_triggered", {
          original_model: Q.model,
          fallback_model: Q.fallbackModel,
          provider: Wz()
        }), new wH1(Q.model, Q.fallbackModel);
        else throw E1("tengu_api_custom_529_overloaded_error", {}), new cO(new Error(Vl1), Z)
    }
    if (W > I || !(J instanceof p6) || !vY5(J)) throw new cO(J, Z);
    if (J instanceof p6) {
      let V = lE2(J);
      if (V) {
        let {
          inputTokens: C,
          contextLimit: K
        } = V, E = 1000, N = Math.max(0, K - C - 1000);
        if (N < He1) throw b1(new Error(`availableContext ${N} is less than FLOOR_OUTPUT_TOKENS ${He1}`)), J;
        let q = Math.max(He1, N);
        Z.maxTokensOverride = q, E1("tengu_max_tokens_context_overflow_adjustment", {
          inputTokens: C,
          contextLimit: K,
          adjustedMaxTokens: q,
          attempt: W
        });
        continue
      }
    }
    let F = (J.headers?.["retry-after"] || J.headers?.get?.("retry-after")) ?? null,
      X = xY5(W, F);
    if (Q.showErrors) {
      if (console.error(`  ⎿  ${UA.red(`API ${J.name} (${J.message}) · Retrying in ${Math.round(X/1000)} seconds… (attempt ${W}/${I})`)}`), J.cause instanceof Error) console.error(`    ⎿  ${UA.red(`${J.cause.name} (${J.cause.message})${"code"in J.cause?` (${J.cause.code})`:""}`)}`)
    }
    E1("tengu_api_retry", {
      attempt: W,
      delayMs: X,
      error: J.message,
      status: J.status,
      provider: Wz()
    }), await new Promise((V) => setTimeout(V, X))
  }
  throw new cO(G, Z)
}
// @from(Start 9470308, End 9470511)
function xY5(A, B) {
  if (B) {
    let G = parseInt(B, 10);
    if (!isNaN(G)) return G * 1000
  }
  let Q = Math.min(kY5 * Math.pow(2, A - 1), 32000),
    I = Math.random() * 0.25 * Q;
  return Q + I
}
// @from(Start 9470513, End 9471174)
function lE2(A) {
  if (A.status !== 400 || !A.message) return;
  if (!A.message.includes("input length and `max_tokens` exceed context limit")) return;
  let B = /input length and `max_tokens` exceed context limit: (\d+) \+ (\d+) > (\d+)/,
    Q = A.message.match(B);
  if (!Q || Q.length !== 4) return;
  if (!Q[1] || !Q[2] || !Q[3]) {
    b1(new Error("Unable to parse max_tokens from max_tokens exceed context limit error message"));
    return
  }
  let I = parseInt(Q[1], 10),
    G = parseInt(Q[2], 10),
    Z = parseInt(Q[3], 10);
  if (isNaN(I) || isNaN(G) || isNaN(Z)) return;
  return {
    inputTokens: I,
    maxTokens: G,
    contextLimit: Z
  }
}
// @from(Start 9471176, End 9471318)
function fY5(A) {
  if (!(A instanceof p6)) return !1;
  return A.status === 529 || (A.message?.includes('"type":"overloaded_error"') ?? !1)
}
// @from(Start 9471320, End 9471817)
function vY5(A) {
  if (A.message?.includes('"type":"overloaded_error"')) return !0;
  if (lE2(A)) return !0;
  let B = A.headers?.get("x-should-retry");
  if (B === "true" && !T9()) return !0;
  if (B === "false") return !1;
  if (A instanceof eN) return !0;
  if (!A.status) return !1;
  if (A.status === 408) return !0;
  if (A.status === 409) return !0;
  if (A.status === 429) return !T9();
  if (A.status === 401) return KdA(), !0;
  if (A.status && A.status >= 500) return !0;
  return !1
}
// @from(Start 9471819, End 9472487)
function EH1(A) {
  let B = {},
    Q = process.env.CLAUDE_CODE_EXTRA_BODY,
    I = {};
  if (Q) try {
    let Z = Z8(Q);
    if (Z && typeof Z === "object" && !Array.isArray(Z)) I = Z;
    else M6(`CLAUDE_CODE_EXTRA_BODY env var must be a JSON object, but was given ${Q}`)
  } catch (Z) {
    M6(`Error parsing CLAUDE_CODE_EXTRA_BODY: ${Z instanceof Error?Z.message:String(Z)}`)
  }
  let G = {
    ...B,
    ...I
  };
  if (A && A.length > 0)
    if (G.anthropic_beta && Array.isArray(G.anthropic_beta)) {
      let Z = G.anthropic_beta,
        D = A.filter((Y) => !Z.includes(Y));
      G.anthropic_beta = [...Z, ...D]
    } else G.anthropic_beta = A;
  return G
}
// @from(Start 9472489, End 9472555)
function zy() {
  return !yY(process.env.DISABLE_PROMPT_CACHING)
}
// @from(Start 9472560, End 9472567)
bY5 = 1
// @from(Start 9472570, End 9472621)
function _11() {
  return {
    user_id: fx()
  }
}
// @from(Start 9472622, End 9473505)
async function iE2(A, B) {
  if (B) return !0;
  try {
    let Q = K_(),
      I = jY(Q);
    return await y11(() => TK({
      apiKey: A,
      maxRetries: 3,
      model: Q,
      isNonInteractiveSession: B
    }), async (G) => {
      let Z = [{
        role: "user",
        content: "test"
      }];
      return await G.beta.messages.create({
        model: Q,
        max_tokens: 1,
        messages: Z,
        temperature: 0,
        ...I.length > 0 ? {
          betas: I
        } : {},
        metadata: _11(),
        ...EH1()
      }), !0
    }, {
      maxRetries: 2,
      showErrors: !1,
      model: Q
    }), !0
  } catch (Q) {
    let I = Q;
    if (Q instanceof cO) I = Q.originalError;
    if (b1(I), I instanceof Error && I.message.includes('{"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}')) return !1;
    throw I
  }
}
// @from(Start 9473506, End 9473947)
async function gY5(A) {
  let B = Date.now(),
    Q = null,
    I = null,
    G = zu;
  for await (let Z of A) switch (Z.type) {
    case "message_start":
      I = Date.now() - B, G = wy(G, Z.message.usage);
      break;
    case "message_delta":
      G = wy(G, Z.usage), Q = Z.delta.stop_reason;
      break;
    default:
      break
  }
  return {
    message: await A.finalMessage(),
    stopReason: Q,
    ttftMs: I,
    usage: G
  }
}
// @from(Start 9473949, End 9474583)
function hY5(A, B = !1) {
  if (B)
    if (typeof A.message.content === "string") return {
      role: "user",
      content: [{
        type: "text",
        text: A.message.content,
        ...zy() ? {
          cache_control: {
            type: "ephemeral"
          }
        } : {}
      }]
    };
    else return {
      role: "user",
      content: A.message.content.map((Q, I) => ({
        ...Q,
        ...I === A.message.content.length - 1 ? zy() ? {
          cache_control: {
            type: "ephemeral"
          }
        } : {} : {}
      }))
    };
  return {
    role: "user",
    content: A.message.content
  }
}
// @from(Start 9474585, End 9475293)
function mY5(A, B = !1) {
  if (B)
    if (typeof A.message.content === "string") return {
      role: "assistant",
      content: [{
        type: "text",
        text: A.message.content,
        ...zy() ? {
          cache_control: {
            type: "ephemeral"
          }
        } : {}
      }]
    };
    else return {
      role: "assistant",
      content: A.message.content.map((Q, I) => ({
        ...Q,
        ...I === A.message.content.length - 1 && Q.type !== "thinking" && Q.type !== "redacted_thinking" ? zy() ? {
          cache_control: {
            type: "ephemeral"
          }
        } : {} : {}
      }))
    };
  return {
    role: "assistant",
    content: A.message.content
  }
}
// @from(Start 9475294, End 9475508)
async function we1(A, B, Q, I, G, Z) {
  for await (let D of Je1(A, async function*() {
    yield* nE2(A, B, Q, I, G, Z)
  })) if (D.type === "assistant") return D;
  throw new Error("No assistant message found")
}
// @from(Start 9475509, End 9475630)
async function* wu(A, B, Q, I, G, Z) {
  return yield* Je1(A, async function*() {
    yield* nE2(A, B, Q, I, G, Z)
  })
}
// @from(Start 9475631, End 9485007)
async function* nE2(A, B, Q, I, G, Z) {
  if (!T9() && (await xC("tengu-off-switch", {
      activated: !1
    })).activated && UG1(Z.model)) {
    E1("tengu_off_switch_query", {}), yield pJ1(new Error(Pm), Z.model, Z.isNonInteractiveSession);
    return
  }
  let [D, Y] = await Promise.all([Promise.all(I.map((x) => SE2(x, {
    getToolPermissionContext: Z.getToolPermissionContext,
    tools: I
  }))), jY(Z.model)]);
  if (Z.prependCLISysprompt) _E2(B), B = [ga0(), ...B];
  let W = aE2(B),
    J = zy() && Y.length > 0,
    F = Z.temperature ?? bY5,
    X = JW(A);
  Ve1({
    model: Z.model,
    messagesLength: JSON.stringify([...W, ...X, ...D, ...Z.extraToolSchemas ?? []]).length,
    temperature: F,
    betas: J ? Y : [],
    permissionMode: Z.getToolPermissionContext().mode
  });
  let V = Date.now(),
    C = Date.now(),
    K = 0,
    E = void 0,
    N = (x) => {
      let s = x.maxTokensOverride ? Math.min(Q, x.maxTokensOverride - 1) : Q,
        d;
      if (!yY(process.env.DISABLE_INTERLEAVED_THINKING) && MQ() === "bedrock" && [GN.bedrock, UC.bedrock].includes(x.model)) d = EH1([W51]);
      else d = EH1();
      let F1 = Q > 0 ? {
          budget_tokens: s,
          type: "enabled"
        } : void 0,
        X1 = x?.maxTokensOverride || Z.maxOutputTokensOverride || Math.max(Q + 1, Ee1(Z.model));
      return {
        model: Z.model,
        messages: dY5(X),
        temperature: F,
        system: W,
        tools: [...D, ...Z.extraToolSchemas ?? []],
        tool_choice: Z.toolChoice,
        ...J ? {
          betas: Y
        } : {},
        metadata: _11(),
        max_tokens: X1,
        thinking: F1,
        ...d
      }
    },
    q = [],
    O = 0,
    R = void 0,
    T = [],
    L = zu,
    _ = null,
    k = !1,
    i = 0;
  try {
    E = await y11(() => TK({
      maxRetries: 0,
      model: Z.model,
      isNonInteractiveSession: Z.isNonInteractiveSession
    }), async (x, s, d) => {
      K = s, C = Date.now();
      let F1 = N(d);
      return i = F1.max_tokens, x.beta.messages.stream(F1, {
        signal: G
      })
    }, {
      showErrors: !Z.isNonInteractiveSession,
      model: Z.model,
      fallbackModel: Z.fallbackModel
    }), q.length = 0, O = 0, R = void 0, T.length = 0, L = zu;
    try {
      let x = !0;
      for await (let d of E) {
        if (x) O9("Stream started - received first chunk"), x = !1;
        switch (d.type) {
          case "message_start":
            R = d.message, O = Date.now() - C, L = wy(L, d.message.usage);
            break;
          case "content_block_start":
            switch (d.content_block.type) {
              case "tool_use":
                T[d.index] = {
                  ...d.content_block,
                  input: ""
                };
                break;
              case "server_tool_use":
                T[d.index] = {
                  ...d.content_block,
                  input: ""
                };
                break;
              case "text":
                T[d.index] = {
                  ...d.content_block,
                  text: ""
                };
                break;
              case "thinking":
                T[d.index] = {
                  ...d.content_block,
                  thinking: ""
                };
                break;
              default:
                T[d.index] = {
                  ...d.content_block
                };
                break
            }
            break;
          case "content_block_delta": {
            let F1 = T[d.index];
            if (!F1) throw E1("tengu_streaming_error", {
              error_type: "content_block_not_found_delta",
              part_type: d.type,
              part_index: d.index
            }), new RangeError("Content block not found");
            switch (d.delta.type) {
              case "citations_delta":
                break;
              case "input_json_delta":
                if (F1.type !== "tool_use" && F1.type !== "server_tool_use") throw E1("tengu_streaming_error", {
                  error_type: "content_block_type_mismatch_input_json",
                  expected_type: "tool_use",
                  actual_type: F1.type
                }), new Error("Content block is not a input_json block");
                if (typeof F1.input !== "string") throw E1("tengu_streaming_error", {
                  error_type: "content_block_input_not_string",
                  input_type: typeof F1.input
                }), new Error("Content block input is not a string");
                F1.input += d.delta.partial_json;
                break;
              case "text_delta":
                if (F1.type !== "text") throw E1("tengu_streaming_error", {
                  error_type: "content_block_type_mismatch_text",
                  expected_type: "text",
                  actual_type: F1.type
                }), new Error("Content block is not a text block");
                F1.text += d.delta.text;
                break;
              case "signature_delta":
                if (F1.type !== "thinking") throw E1("tengu_streaming_error", {
                  error_type: "content_block_type_mismatch_thinking_signature",
                  expected_type: "thinking",
                  actual_type: F1.type
                }), new Error("Content block is not a thinking block");
                F1.signature = d.delta.signature;
                break;
              case "thinking_delta":
                if (F1.type !== "thinking") throw E1("tengu_streaming_error", {
                  error_type: "content_block_type_mismatch_thinking_delta",
                  expected_type: "thinking",
                  actual_type: F1.type
                }), new Error("Content block is not a thinking block");
                F1.thinking += d.delta.thinking;
                break
            }
            break
          }
          case "content_block_stop": {
            let F1 = T[d.index];
            if (!F1) throw E1("tengu_streaming_error", {
              error_type: "content_block_not_found_stop",
              part_type: d.type,
              part_index: d.index
            }), new RangeError("Content block not found");
            if (!R) throw E1("tengu_streaming_error", {
              error_type: "partial_message_not_found",
              part_type: d.type
            }), new Error("Message not found");
            let X1 = Ge1({
              message: {
                ...R,
                content: q11([F1])
              },
              requestId: E.request_id ?? void 0,
              type: "assistant",
              uuid: ze1(),
              timestamp: new Date().toISOString()
            }, I);
            q.push(X1), yield X1;
            break
          }
          case "message_delta": {
            L = wy(L, d.usage), _ = d.delta.stop_reason;
            let F1 = Cl1(d.delta.stop_reason);
            if (F1) yield F1;
            if (_ === "max_tokens") E1("tengu_max_tokens_reached", {
              max_tokens: i
            }), yield eY({
              content: `${bZ}: Claude's response exceeded the ${i} output token maximum. To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.`
            });
            break
          }
          case "message_stop":
            break
        }
        yield {
          type: "stream_event",
          event: d
        }
      }
      let s = (await E.withResponse()).response;
      sE2(s), De1(s.headers)
    } catch (x) {
      if (x instanceof _I) throw O9(`Streaming aborted: ${x instanceof Error?x.message:String(x)}`), x;
      M6(`Error streaming, falling back to non-streaming mode: ${x instanceof Error?x.message:String(x)}`), k = !0;
      let s = await y11(() => TK({
          maxRetries: 0,
          model: Z.model,
          isNonInteractiveSession: Z.isNonInteractiveSession
        }), async (F1, X1, v) => {
          K = X1;
          let D1 = N(v);
          return i = D1.max_tokens, await F1.beta.messages.create({
            ...D1,
            max_tokens: Math.min(D1.max_tokens, pY5)
          })
        }, {
          showErrors: !Z.isNonInteractiveSession,
          model: Z.model
        }),
        d = Ge1({
          message: {
            ...s,
            content: q11(s.content)
          },
          requestId: E.request_id ?? void 0,
          type: "assistant",
          uuid: ze1(),
          timestamp: new Date().toISOString()
        }, I);
      q.push(d), yield d
    }
  } catch (x) {
    M6(`Error in non-streaming fallback: ${x instanceof Error?x.message:String(x)}`);
    let s = x,
      d = Z.model;
    if (x instanceof cO) s = x.originalError, d = x.retryContext.model;
    if (s instanceof p6) Ye1(s);
    Ce1({
      error: s,
      model: d,
      messageCount: X.length,
      messageTokens: VE(X),
      durationMs: Date.now() - C,
      durationMsIncludingRetries: Date.now() - V,
      attempt: K,
      requestId: E?.request_id,
      didFallBackToNonStreaming: k
    }), yield pJ1(s, d, Z.isNonInteractiveSession);
    return
  }
  Ke1({
    model: q[0]?.message.model ?? R?.model ?? Z.model,
    usage: L,
    start: C,
    startIncludingRetries: V,
    attempt: K,
    messageCount: X.length,
    messageTokens: VE(X),
    requestId: E?.request_id ?? null,
    stopReason: _,
    ttftMs: O,
    didFallBackToNonStreaming: k
  })
}
// @from(Start 9485009, End 9485500)
function wy(A, B) {
  return {
    input_tokens: A.input_tokens + (B.input_tokens ?? 0),
    cache_creation_input_tokens: A.cache_creation_input_tokens + (B.cache_creation_input_tokens ?? 0),
    cache_read_input_tokens: A.cache_read_input_tokens + (B.cache_read_input_tokens ?? 0),
    output_tokens: A.output_tokens + (B.output_tokens ?? 0),
    server_tool_use: {
      web_search_requests: A.server_tool_use.web_search_requests + (B.server_tool_use?.web_search_requests ?? 0)
    }
  }
}
// @from(Start 9485502, End 9485636)
function dY5(A) {
  return A.map((B, Q) => {
    return B.type === "user" ? hY5(B, Q > A.length - 3) : mY5(B, Q > A.length - 3)
  })
}
// @from(Start 9485637, End 9488107)
async function uY5({
  systemPrompt: A,
  userPrompt: B,
  assistantPrompt: Q,
  signal: I,
  isNonInteractiveSession: G,
  temperature: Z = 0,
  enablePromptCaching: D,
  promptCategory: Y
}) {
  let W = K_(),
    J = [{
      role: "user",
      content: B
    }, ...Q ? [{
      role: "assistant",
      content: Q
    }] : []],
    F = aE2(A, D && zy()),
    X = D ? [...F, ...J] : [{
      systemPrompt: A
    }, ...J];
  Ve1({
    model: W,
    messagesLength: JSON.stringify(X).length,
    temperature: Z,
    promptCategory: Y
  });
  let V = 0,
    C = Date.now(),
    K = Date.now(),
    E, N, q = jY(W);
  try {
    if (E = await y11(() => TK({
        maxRetries: 0,
        model: W,
        isNonInteractiveSession: G,
        isSmallFastModel: !0
      }), async (L, _, k) => {
        return V = _, C = Date.now(), N = L.beta.messages.stream({
          model: k.model,
          max_tokens: 512,
          messages: J,
          system: F,
          temperature: Z,
          metadata: _11(),
          stream: !0,
          ...q.length > 0 ? {
            betas: q
          } : {},
          ...EH1()
        }, {
          signal: I
        }), await gY5(N)
      }, {
        showErrors: !1,
        model: W
      }), N) {
      let L = (await N.withResponse()).response;
      sE2(L)
    }
  } catch (L) {
    let _ = L,
      k = W;
    if (L instanceof cO) _ = L.originalError, k = L.retryContext.model;
    return Ce1({
      error: _,
      model: k,
      messageCount: Q ? 2 : 1,
      durationMs: Date.now() - C,
      durationMsIncludingRetries: Date.now() - K,
      attempt: V,
      requestId: N?.request_id,
      promptCategory: Y
    }), pJ1(_, k, G)
  }
  let O = Cl1(E.stopReason);
  if (O) return O;
  let T = {
    message: D ? {
      ...E.message,
      content: q11(E.message.content)
    } : {
      ...E.message,
      content: q11(E.message.content),
      usage: {
        ...E.usage,
        cache_read_input_tokens: 0,
        cache_creation_input_tokens: 0
      }
    },
    uuid: ze1(),
    requestId: N?.request_id ?? void 0,
    type: "assistant",
    timestamp: new Date().toISOString()
  };
  return Ke1({
    model: W,
    usage: E.usage,
    start: C,
    startIncludingRetries: K,
    attempt: V,
    messageCount: Q ? 2 : 1,
    messageTokens: VE([T]),
    requestId: N?.request_id ?? null,
    stopReason: E.stopReason,
    ttftMs: E.ttftMs,
    didFallBackToNonStreaming: !1,
    promptCategory: Y
  }), T
}
// @from(Start 9488109, End 9488286)
function aE2(A, B = zy()) {
  return Be1(A).map((Q) => ({
    type: "text",
    text: Q,
    ...B ? {
      cache_control: {
        type: "ephemeral"
      }
    } : {}
  }))
}
// @from(Start 9488287, End 9488874)
async function cZ({
  systemPrompt: A = [],
  userPrompt: B,
  assistantPrompt: Q,
  enablePromptCaching: I = !1,
  signal: G,
  isNonInteractiveSession: Z,
  temperature: D = 0,
  promptCategory: Y
}) {
  return (await We1([K2({
    content: A.map((J) => ({
      type: "text",
      text: J
    }))
  }), K2({
    content: B
  })], async () => {
    return [await uY5({
      systemPrompt: A,
      userPrompt: B,
      assistantPrompt: Q,
      signal: G,
      isNonInteractiveSession: Z,
      temperature: D,
      enablePromptCaching: I,
      promptCategory: Y
    })]
  }))[0]
}
// @from(Start 9488879, End 9488890)
pY5 = 21333
// @from(Start 9488893, End 9489139)
function Ee1(A) {
  if (A.includes("3-5")) return 8192;
  if (A.includes("haiku")) return 8192;
  let B = process.env.CLAUDE_CODE_MAX_OUTPUT_TOKENS;
  if (B) {
    let Q = parseInt(B, 10);
    if (!isNaN(Q) && Q > 0) return Q
  }
  return 32000
}
// @from(Start 9489141, End 9489506)
function sE2(A) {
  try {
    let B = A.headers.get("anthropic-ratelimit-unified-fallback-percentage");
    if (B !== null) {
      let Q = parseFloat(B);
      if (!isNaN(Q) && Q > 0 && Q <= 1) {
        if (ZA().fallbackAvailableWarningThreshold !== Q) j0({
          ...ZA(),
          fallbackAvailableWarningThreshold: Q
        })
      }
    }
  } catch {}
}
// @from(Start 9489511, End 9489527)
q4 = I1(U1(), 1)
// @from(Start 9489699, End 9489712)
rE2 = "Write"
// @from(Start 9489718, End 9490349)
oE2 = `Writes a file to the local filesystem.

Usage:
- This tool will overwrite the existing file if there is one at the provided path.
- If this is an existing file, you MUST use the ${TD} tool first to read the file's contents. This tool will fail if you did not read the file first.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
- Only use emojis if the user explicitly requests it. Avoid writing emojis to files unless asked.`
// @from(Start 9490355, End 9490363)
tE2 = 10
// @from(Start 9490367, End 9490378)
eE2 = 16000
// @from(Start 9490382, End 9490625)
rY5 = "<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with Grep in order to find the line numbers of what you are looking for.</NOTE>"
// @from(Start 9490629, End 9490836)
oY5 = n.strictObject({
    file_path: n.string().describe("The absolute path to the file to write (must be absolute, not relative)"),
    content: n.string().describe("The content to write to the file")
  })
// @from(Start 9490840, End 9497299)
nJ = {
    name: rE2,
    async description() {
      return "Write a file to the local filesystem."
    },
    userFacingName() {
      return "Write"
    },
    async prompt() {
      return oE2
    },
    isEnabled() {
      return !0
    },
    renderToolUseMessage(A, {
      verbose: B
    }) {
      if (!A.file_path) return null;
      return B ? A.file_path : Ue1(dA(), A.file_path)
    },
    inputSchema: oY5,
    isConcurrencySafe() {
      return !1
    },
    isReadOnly() {
      return !1
    },
    getPath(A) {
      return A.file_path
    },
    async checkPermissions(A, B) {
      return $S(nJ, A, B.getToolPermissionContext())
    },
    renderToolUseRejectedMessage({
      file_path: A,
      content: B
    }, {
      columns: Q,
      style: I,
      verbose: G
    }) {
      try {
        let Z = x1(),
          D = nY5(A) ? A : aY5(dA(), A),
          Y = Z.existsSync(D),
          W = Y ? UG(D) : "utf-8",
          J = Y ? Z.readFileSync(D, {
            encoding: W
          }) : null,
          F = J ? "update" : "create",
          X = iJ({
            filePath: A,
            fileContents: J ?? "",
            edits: [{
              old_string: J ?? "",
              new_string: B,
              replace_all: !1
            }]
          }),
          V = q4.createElement(h, {
            flexDirection: "row"
          }, q4.createElement(P, {
            color: "error"
          }, "User rejected ", F === "update" ? "update" : "write", " to", " "), q4.createElement(P, {
            bold: !0,
            color: "error"
          }, G ? A : Ue1(dA(), A)));
        if (I === "condensed" && !G) return V;
        return q4.createElement(w0, null, q4.createElement(h, {
          flexDirection: "column"
        }, V, FW(X.map((C) => q4.createElement(h, {
          flexDirection: "column",
          key: C.newStart
        }, q4.createElement(XW, {
          patch: C,
          dim: !0,
          width: Q - 12
        }))), (C) => q4.createElement(h, {
          key: `ellipsis-${C}`
        }, q4.createElement(P, {
          color: "secondaryText"
        }, "...")))))
      } catch (Z) {
        return b1(Z), q4.createElement(h, {
          flexDirection: "column"
        }, q4.createElement(P, null, "  ", "⎿ (No changes)"))
      }
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return q4.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage({
      filePath: A,
      content: B,
      structuredPatch: Q,
      type: I
    }, G, {
      style: Z,
      verbose: D
    }) {
      switch (I) {
        case "create": {
          let Y = B || "(No content)",
            W = B.split(cY5).length,
            J = W - tE2,
            F = q4.createElement(P, null, "Wrote ", q4.createElement(P, {
              bold: !0
            }, W), " lines to", " ", q4.createElement(P, {
              bold: !0
            }, D ? A : Ue1(dA(), A)));
          if (Z === "condensed" && !D) return F;
          return q4.createElement(w0, null, q4.createElement(h, {
            flexDirection: "column"
          }, F, q4.createElement(h, {
            flexDirection: "column"
          }, q4.createElement(YW, {
            code: D ? Y : Y.split(`
`).slice(0, tE2).filter((X) => X.trim() !== "").join(`
`),
            language: iY5(A).slice(1)
          }), !D && J > 0 && q4.createElement(P, {
            color: "secondaryText"
          }, "… +", J, " ", J === 1 ? "line" : "lines", " ", W > 0 && q4.createElement(NO, null)))))
        }
        case "update":
          return q4.createElement(WH1, {
            filePath: A,
            structuredPatch: Q,
            verbose: D
          })
      }
    },
    async validateInput({
      file_path: A
    }, {
      readFileState: B
    }) {
      let Q = d3(A);
      if (fv(Q)) return {
        result: !1,
        message: "File is in a directory that is ignored by your project configuration.",
        errorCode: 1
      };
      let I = x1();
      if (!I.existsSync(Q)) return {
        result: !0
      };
      let G = B[Q];
      if (!G) return {
        result: !1,
        message: "File has not been read yet. Read it first before writing to it.",
        errorCode: 2
      };
      if (I.statSync(Q).mtimeMs > G.timestamp) return {
        result: !1,
        message: "File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.",
        errorCode: 3
      };
      return {
        result: !0
      }
    },
    async * call({
      file_path: A,
      content: B
    }, {
      readFileState: Q
    }) {
      let I = d3(A),
        G = lY5(I),
        Z = x1(),
        D = Z.existsSync(I),
        Y = D ? UG(I) : "utf-8",
        W = D ? Z.readFileSync(I, {
          encoding: Y
        }) : null;
      await SK.beforeFileEdited(I);
      let J = D ? eU(I) : await YvA();
      if (Z.mkdirSync(G), rM(I, B, Y, J), Q[I] = {
          content: B,
          timestamp: Z.statSync(I).mtimeMs
        }, I.endsWith(`${sY5}CLAUDE.md`)) E1("tengu_write_claudemd", {});
      if (W) {
        let X = iJ({
            filePath: A,
            fileContents: W,
            edits: [{
              old_string: W,
              new_string: B,
              replace_all: !1
            }]
          }),
          V = {
            type: "update",
            filePath: A,
            content: B,
            structuredPatch: X
          };
        Ky(X), yield {
          type: "result",
          data: V
        };
        return
      }
      let F = {
        type: "create",
        filePath: A,
        content: B,
        structuredPatch: []
      };
      Ky([], B), yield {
        type: "result",
        data: F
      }
    },
    mapToolResultToToolResultBlockParam({
      filePath: A,
      content: B,
      type: Q
    }, I) {
      switch (Q) {
        case "create":
          return {
            tool_use_id: I, type: "tool_result", content: `File created successfully at: ${A}`
          };
        case "update":
          return {
            tool_use_id: I, type: "tool_result", content: `The file ${A} has been updated. Here's the result of running \`cat -n\` on a snippet of the edited file:
${tM({content:B.split(/\r?\n/).length>eE2?B.split(/\r?\n/).slice(0,eE2).join(`
`)+rY5:B,startLine:1})}`
          }
      }
    }
  }
// @from(Start 9497348, End 9507380)
function AU2(A) {
  if (!A || A.trim() === "") return `Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit requests and your previous actions.
This summary should be thorough in capturing technical details, code patterns, and architectural decisions that would be essential for continuing development work without losing context.

Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

1. Chronologically analyze each message and section of the conversation. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like:
     - file names
     - full code snippets
     - function signatures
     - file edits
  - Errors that you ran into and how you fixed them
  - Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly.

Your summary should include the following sections:

1. Primary Request and Intent: Capture all of the user's explicit requests and intents in detail
2. Key Technical Concepts: List all important technical concepts, technologies, and frameworks discussed.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Pay special attention to the most recent messages and include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Errors and fixes: List all errors that you ran into, and how you fixed them. Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
5. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
6. All user messages: List ALL user messages that are not tool results. These are critical for understanding the users' feedback and changing intent.
6. Pending Tasks: Outline any pending tasks that you have explicitly been asked to work on.
7. Current Work: Describe in detail precisely what was being worked on immediately before this summary request, paying special attention to the most recent messages from both user and assistant. Include file names and code snippets where applicable.
8. Optional Next Step: List the next step that you will take that is related to the most recent work you were doing. IMPORTANT: ensure that this step is DIRECTLY in line with the user's explicit requests, and the task you were working on immediately before this summary request. If your last task was concluded, then only list next steps if they are explicitly in line with the users request. Do not start on tangential requests without confirming with the user first.
                       If there is a next step, include direct quotes from the most recent conversation showing exactly what task you were working on and where you left off. This should be verbatim to ensure there's no drift in task interpretation.

Here's an example of how your output should be structured:

<example>
<analysis>
[Your thought process, ensuring all points are covered thoroughly and accurately]
</analysis>

<summary>
1. Primary Request and Intent:
   [Detailed description]

2. Key Technical Concepts:
   - [Concept 1]
   - [Concept 2]
   - [...]

3. Files and Code Sections:
   - [File Name 1]
      - [Summary of why this file is important]
      - [Summary of the changes made to this file, if any]
      - [Important Code Snippet]
   - [File Name 2]
      - [Important Code Snippet]
   - [...]

4. Errors and fixes:
    - [Detailed description of error 1]:
      - [How you fixed the error]
      - [User feedback on the error if any]
    - [...]

5. Problem Solving:
   [Description of solved problems and ongoing troubleshooting]

6. All user messages: 
    - [Detailed non tool use user message]
    - [...]

7. Pending Tasks:
   - [Task 1]
   - [Task 2]
   - [...]

8. Current Work:
   [Precise description of current work]

9. Optional Next Step:
   [Optional Next step to take]

</summary>
</example>

Please provide your summary based on the conversation so far, following this structure and ensuring precision and thoroughness in your response. 

There may be additional summarization instructions provided in the included context. If so, remember to follow these instructions when creating the above summary. Examples of instructions include:
<example>
## Compact Instructions
When summarizing the conversation focus on typescript code changes and also remember the mistakes you made and how you fixed them.
</example>

<example>
# Summary instructions
When you are using compact - please focus on test output and code changes. Include file reads verbatim.
</example>
`;
  return `Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit requests and your previous actions.
This summary should be thorough in capturing technical details, code patterns, and architectural decisions that would be essential for continuing development work without losing context.

Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

1. Chronologically analyze each message and section of the conversation. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like:
     - file names
     - full code snippets
     - function signatures
     - file edits
  - Errors that you ran into and how you fixed them
  - Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly.

Your summary should include the following sections:

1. Primary Request and Intent: Capture all of the user's explicit requests and intents in detail
2. Key Technical Concepts: List all important technical concepts, technologies, and frameworks discussed.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Pay special attention to the most recent messages and include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Errors and fixes: List all errors that you ran into, and how you fixed them. Pay special attention to specific user feedback that you received, especially if the user told you to do something differently.
5. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
6. All user messages: List ALL user messages that are not tool results. These are critical for understanding the users' feedback and changing intent.
6. Pending Tasks: Outline any pending tasks that you have explicitly been asked to work on.
7. Current Work: Describe in detail precisely what was being worked on immediately before this summary request, paying special attention to the most recent messages from both user and assistant. Include file names and code snippets where applicable.
8. Optional Next Step: List the next step that you will take that is related to the most recent work you were doing. IMPORTANT: ensure that this step is DIRECTLY in line with the user's explicit requests, and the task you were working on immediately before this summary request. If your last task was concluded, then only list next steps if they are explicitly in line with the users request. Do not start on tangential requests without confirming with the user first.
                       If there is a next step, include direct quotes from the most recent conversation showing exactly what task you were working on and where you left off. This should be verbatim to ensure there's no drift in task interpretation.

Here's an example of how your output should be structured:

<example>
<analysis>
[Your thought process, ensuring all points are covered thoroughly and accurately]
</analysis>

<summary>
1. Primary Request and Intent:
   [Detailed description]

2. Key Technical Concepts:
   - [Concept 1]
   - [Concept 2]
   - [...]

3. Files and Code Sections:
   - [File Name 1]
      - [Summary of why this file is important]
      - [Summary of the changes made to this file, if any]
      - [Important Code Snippet]
   - [File Name 2]
      - [Important Code Snippet]
   - [...]

4. Errors and fixes:
    - [Detailed description of error 1]:
      - [How you fixed the error]
      - [User feedback on the error if any]
    - [...]

5. Problem Solving:
   [Description of solved problems and ongoing troubleshooting]

6. All user messages: 
    - [Detailed non tool use user message]
    - [...]

7. Pending Tasks:
   - [Task 1]
   - [Task 2]
   - [...]

8. Current Work:
   [Precise description of current work]

9. Optional Next Step:
   [Optional Next step to take]

</summary>
</example>

Please provide your summary based on the conversation so far, following this structure and ensuring precision and thoroughness in your response. 

There may be additional summarization instructions provided in the included context. If so, remember to follow these instructions when creating the above summary. Examples of instructions include:
<example>
## Compact Instructions
When summarizing the conversation focus on typescript code changes and also remember the mistakes you made and how you fixed them.
</example>

<example>
# Summary instructions
When you are using compact - please focus on test output and code changes. Include file reads verbatim.
</example>


Additional Instructions:
${A}`
}
// @from(Start 9507382, End 9507798)
function tY5(A) {
  let B = A,
    Q = B.match(/<analysis>([\s\S]*?)<\/analysis>/);
  if (Q) {
    let G = Q[1] || "";
    B = B.replace(/<analysis>[\s\S]*?<\/analysis>/, `Analysis:
${G.trim()}`)
  }
  let I = B.match(/<summary>([\s\S]*?)<\/summary>/);
  if (I) {
    let G = I[1] || "";
    B = B.replace(/<summary>[\s\S]*?<\/summary>/, `Summary:
${G.trim()}`)
  }
  return B = B.replace(/\n\n+/g, `

`), B.trim()
}
// @from(Start 9507800, End 9508171)
function BU2(A, B) {
  let I = `This session is being continued from a previous conversation that ran out of context. The conversation is summarized below:
${tY5(A)}.`;
  if (B) return `${I}
Please continue the conversation from where we left it off without asking the user any further questions. Continue with the last task that you were asked to work on.`;
  return I
}
// @from(Start 9508173, End 9508341)
function eY5() {
  return null;
  if (x1().existsSync(A)) try {
    return x1().readFileSync(A, {
      encoding: "utf8"
    }).trim()
  } catch {
    return null
  }
}
// @from(Start 9508346, End 9508385)
AW5 = L0(async () => {
  return null
})
// @from(Start 9508387, End 9508421)
async function QU2(A) {
  return
}
// @from(Start 9508426, End 9508450)
IU2 = Symbol("NO_VALUE")
// @from(Start 9508452, End 9508593)
async function aJ(A) {
  let B = IU2;
  for await (let Q of A) B = Q;
  if (B === IU2) throw new Error("No items in generator");
  return B
}
// @from(Start 9508594, End 9509242)
async function* UH1(A, B = 1 / 0) {
  let Q = (Z) => {
      let D = Z.next().then(({
        done: Y,
        value: W
      }) => ({
        done: Y,
        value: W,
        generator: Z,
        promise: D
      }));
      return D
    },
    I = [...A],
    G = new Set;
  while (G.size < B && I.length > 0) {
    let Z = I.shift();
    G.add(Q(Z))
  }
  while (G.size > 0) {
    let {
      done: Z,
      value: D,
      generator: Y,
      promise: W
    } = await Promise.race(G);
    if (G.delete(W), !Z) {
      if (G.add(Q(Y)), D !== void 0) yield D
    } else if (I.length > 0) {
      let J = I.shift();
      G.add(Q(J))
    }
  }
}
// @from(Start 9509243, End 9509329)
async function Ne1(A) {
  let B = [];
  for await (let Q of A) B.push(Q);
  return B
}
// @from(Start 9509330, End 9509383)
async function* GU2(A) {
  for (let B of A) yield B
}
// @from(Start 9509478, End 9509679)
QW5 = "Codebase and user instructions are shown below. Be sure to adhere to these instructions. IMPORTANT: These instructions OVERRIDE any default behavior and you MUST follow them exactly as written."
// @from(Start 9509683, End 9509694)
k11 = 40000
// @from(Start 9509698, End 9509707)
Uu = 1000
// @from(Start 9509710, End 9509750)
function DU2(A) {
  return ai(A, e9())
}
// @from(Start 9509752, End 9510231)
function YU2(A, B) {
  try {
    if (x1().existsSync(A)) {
      if (!x1().statSync(A).isFile()) return null;
      let I = x1().readFileSync(A, {
        encoding: "utf-8"
      });
      return {
        path: A,
        type: B,
        content: I
      }
    }
  } catch (Q) {
    if (Q instanceof Error && Q.message.includes("EACCES")) E1("tengu_claude_md_permission_error", {
      is_access_error: 1,
      has_home_dir: A.includes(S4()) ? 1 : 0
    })
  }
  return null
}
// @from(Start 9510233, End 9511035)
function IW5(A, B) {
  let Q = new Set,
    G = new WW().lex(A);

  function Z(D) {
    for (let Y of D) {
      if (Y.type === "code" || Y.type === "codespan") continue;
      if (Y.type === "text") {
        let W = Y.text || "",
          J = /(?:^|\s)@((?:[^\s\\]|\\ )+)/g,
          F;
        while ((F = J.exec(W)) !== null) {
          let X = F[1];
          if (!X) continue;
          if (X = X.replace(/\\ /g, " "), X) {
            if (X.startsWith("./") || X.startsWith("~/") || X.startsWith("/") && X !== "/" || !X.startsWith("@") && !X.match(/^[#%^&*()]+/) && X.match(/^[a-zA-Z0-9._-]/)) {
              let C = c81(X, B);
              Q.add(C)
            }
          }
        }
      }
      if (Y.tokens) Z(Y.tokens);
      if (Y.items) Z(Y.items)
    }
  }
  return Z(G), [...Q]
}
// @from(Start 9511040, End 9511047)
GW5 = 5
// @from(Start 9511050, End 9511404)
function Eu(A, B, Q, I, G = 0, Z) {
  if (Q.has(A) || G >= GW5) return [];
  let D = YU2(A, B);
  if (!D || !D.content.trim()) return [];
  if (Z) D.parent = Z;
  Q.add(A);
  let Y = [];
  Y.push(D);
  let W = IW5(D.content, A);
  for (let J of W) {
    if (!DU2(J) && !I) continue;
    let X = Eu(J, B, Q, I, G + 1, A);
    Y.push(...X)
  }
  return Y
}
// @from(Start 9511409, End 9511925)
dG = L0((A = !1) => {
  let B = [],
    Q = new Set,
    I = m9(),
    G = A || I.hasClaudeMdExternalIncludesApproved || !1,
    Z = gK("Managed");
  B.push(...Eu(Z, "Managed", Q, G));
  let D = gK("User");
  B.push(...Eu(D, "User", Q, !0));
  let Y = [],
    W = e9();
  while (W !== ZU2(W).root) Y.push(W), W = qe1(W);
  for (let J of Y.reverse()) {
    let F = $e1(J, "CLAUDE.md");
    B.push(...Eu(F, "Project", Q, G));
    let X = $e1(J, "CLAUDE.local.md");
    B.push(...Eu(X, "Local", Q, G))
  }
  return B
})
// @from(Start 9511928, End 9511998)
function NH1() {
  return dG().filter((A) => A.content.length > k11)
}
// @from(Start 9512003, End 9512445)
WU2 = () => {
  let A = dG(),
    B = [];
  for (let Q of A)
    if (Q.content) {
      let I = Q.type === "Project" ? " (project instructions, checked into the codebase)" : Q.type === "Local" ? " (user's private project instructions, not checked in)" : " (user's private global instructions for all projects)";
      B.push(`Contents of ${Q.path}${I}:

${Q.content}`)
    } if (B.length === 0) return "";
  return `${QW5}

${B.join(`

`)}`
}
// @from(Start 9512448, End 9512479)
function lO() {
  return null
}
// @from(Start 9512481, End 9512835)
function JU2(A, B) {
  let Q = [];
  if (!eF(A, B)) return Q;
  let I = new Set,
    G = e9(),
    Z = qe1(BW5(A)),
    D = [],
    Y = Z;
  while (Y !== G && Y !== ZU2(Y).root) {
    if (Y.startsWith(G)) D.push(Y);
    Y = qe1(Y)
  }
  for (let W of D.reverse()) {
    let J = $e1(W, "CLAUDE.md");
    Q.push(...Eu(J, "Project", I, !1))
  }
  return Q
}
// @from(Start 9512837, End 9512957)
function Me1() {
  for (let A of dG(!0))
    if (A.type !== "User" && A.parent && !DU2(A.path)) return !0;
  return !1
}
// @from(Start 9512958, End 9513114)
async function FU2() {
  let A = m9();
  if (A.hasClaudeMdExternalIncludesApproved || A.hasClaudeMdExternalIncludesWarningShown) return !1;
  return Me1()
}
// @from(Start 9513166, End 9513820)
async function DW5(A, B, Q, I) {
  let G = new AbortController;
  setTimeout(() => {
    G.abort()
  }, 1000);
  let Z = {
      ...B,
      abortController: G
    },
    [D, Y, W, J, F, X, V, C, K, E, N] = await Promise.all([A ? hK(() => CW5(A, Z)) : Promise.resolve([]), A ? hK(() => KW5(A, Z)) : Promise.resolve([]), hK(() => HW5(Z)), hK(async () => XW5(Q, B)), hK(async () => VW5(Q)), hK(() => zW5(Z)), hK(async () => Promise.resolve(FW5())), hK(async () => YW5(I)), hK(async () => NW5()), hK(async () => Promise.resolve(WW5(B))), hK(async () => Promise.resolve(JW5()))]);
  return [...D, ...Y, ...W, ...J, ...F, ...X, ...V, ...C, ...K, ...E, ...N]
}
// @from(Start 9513821, End 9513915)
async function hK(A) {
  try {
    return await A()
  } catch (B) {
    return b1(B), []
  }
}
// @from(Start 9513917, End 9514071)
function YW5(A) {
  if (!A) return [];
  return A.filter((B) => B.mode === "prompt").map((B) => ({
    type: "queued_command",
    prompt: B.value
  }))
}
// @from(Start 9514073, End 9514194)
function WW5(A) {
  if (A.getToolPermissionContext().mode !== "plan") return [];
  return [{
    type: "plan_mode"
  }]
}
// @from(Start 9514196, End 9514226)
function JW5() {
  return []
}
// @from(Start 9514228, End 9514258)
function FW5() {
  return []
}
// @from(Start 9514260, End 9514484)
function XW5(A, B) {
  if (!A?.text || !A.filePath) return [];
  let Q = TF1(B.options.mcpClients) ?? "IDE";
  return [{
    type: "selected_lines_in_ide",
    filename: A.filePath,
    content: A.text,
    ideName: Q
  }]
}
// @from(Start 9514486, End 9514620)
function VW5(A) {
  if (!A?.filePath || A.text) return [];
  return [{
    type: "opened_file_in_ide",
    filename: A.filePath
  }]
}
// @from(Start 9514621, End 9515482)
async function CW5(A, B) {
  let Q = wW5(A);
  return (await Promise.all(Q.map(async (G) => {
    try {
      let {
        filename: Z,
        lineStart: D,
        lineEnd: Y
      } = UW5(G), W = d3(Z);
      try {
        if (x1().statSync(W).isDirectory()) {
          let F = {
              path: W
            },
            X = await aJ(WE.call(F, B));
          return E1("tengu_at_mention_extracting_directory_success", {}), {
            type: "new_directory",
            path: W,
            content: X.data
          }
        }
      } catch {}
      return await Le1(W, B, "tengu_at_mention_extracting_filename_success", "tengu_at_mention_extracting_filename_error", {
        offset: D,
        limit: Y && D ? Y - D + 1 : void 0
      })
    } catch {
      E1("tengu_at_mention_extracting_filename_error", {})
    }
  }))).filter(Boolean)
}
// @from(Start 9515483, End 9516627)
async function KW5(A, B) {
  let Q = EW5(A);
  if (Q.length === 0) return [];
  let I = B.options.mcpClients || [];
  return (await Promise.all(Q.map(async (Z) => {
    try {
      let [D, ...Y] = Z.split(":"), W = Y.join(":");
      if (!D || !W) return E1("tengu_at_mention_mcp_resource_error", {}), null;
      let J = I.find((V) => V.name === D);
      if (!J || J.type !== "connected") return E1("tengu_at_mention_mcp_resource_error", {}), null;
      let X = (B.options.mcpResources?.[D] || []).find((V) => V.uri === W);
      if (!X) return E1("tengu_at_mention_mcp_resource_error", {}), null;
      try {
        let V = await J.client.readResource({
          uri: W
        });
        return E1("tengu_at_mention_mcp_resource_success", {}), {
          type: "mcp_resource",
          server: D,
          uri: W,
          name: X.name || W,
          description: X.description,
          content: V
        }
      } catch (V) {
        return E1("tengu_at_mention_mcp_resource_error", {}), b1(V), null
      }
    } catch {
      return E1("tengu_at_mention_mcp_resource_error", {}), null
    }
  }))).filter((Z) => Z !== null)
}
// @from(Start 9516628, End 9517556)
async function HW5(A) {
  return (await Promise.all(Object.entries(A.readFileState).map(async ([Q, I]) => {
    try {
      if (x1().statSync(Q).mtimeMs <= I.timestamp) return;
      let Z = {
        file_path: Q
      };
      if (!(await OB.validateInput(Z)).result) return;
      let Y = await aJ(OB.call(Z, A));
      if (E1("tengu_watched_file_changed", {}), Q === cR(A.agentId)) {
        let W = jJ(A.agentId);
        return {
          type: "todo",
          content: W,
          itemCount: W.length,
          context: "file-watch"
        }
      }
      if (Y.data.type === "text") return {
        type: "edited_text_file",
        filename: Q,
        snippet: qE2(I.content, Y.data.file.content)
      };
      return {
        type: "edited_image_file",
        filename: Q,
        content: Y.data
      }
    } catch {
      E1("tengu_watched_file_stat_error", {})
    }
  }))).filter((Q) => Q !== void 0)
}
// @from(Start 9517557, End 9518149)
async function zW5(A) {
  let B = [];
  if (A.nestedMemoryAttachmentTriggers && A.nestedMemoryAttachmentTriggers.size > 0) {
    for (let Q of A.nestedMemoryAttachmentTriggers) try {
      let I = JU2(Q, A.getToolPermissionContext());
      for (let G of I)
        if (!A.readFileState[G.path]) B.push({
          type: "nested_memory",
          path: G.path,
          content: G
        }), A.readFileState[G.path] = {
          content: G.content,
          timestamp: Date.now()
        }
    } catch (I) {
      b1(I)
    }
    A.nestedMemoryAttachmentTriggers.clear()
  }
  return B
}
// @from(Start 9518151, End 9518293)
function wW5(A) {
  let B = /(^|\s)@([^\s]+)\b/g,
    Q = A.match(B) || [];
  return [...new Set(Q.map((I) => I.slice(I.indexOf("@") + 1)))]
}
// @from(Start 9518295, End 9518444)
function EW5(A) {
  let B = /(^|\s)@([^\s]+:[^\s]+)\b/g,
    Q = A.match(B) || [];
  return [...new Set(Q.map((I) => I.slice(I.indexOf("@") + 1)))]
}
// @from(Start 9518446, End 9518716)
function UW5(A) {
  let B = A.match(/^([^#]+)(?:#L(\d+)(?:-(\d+))?)?$/);
  if (!B) return {
    filename: A
  };
  let [, Q, I, G] = B, Z = I ? parseInt(I, 10) : void 0, D = G ? parseInt(G, 10) : Z;
  return {
    filename: Q ?? A,
    lineStart: Z,
    lineEnd: D
  }
}
// @from(Start 9518717, End 9518884)
async function NW5() {
  let A = await SK.getNewDiagnostics();
  if (A.length === 0) return [];
  return [{
    type: "diagnostics",
    files: A,
    isNew: !0
  }]
}
// @from(Start 9518885, End 9519089)
async function* x11(A, B, Q, I) {
  let G = await DW5(A, B, Q, I);
  if (G.length < 1) return;
  E1("tengu_attachments", {
    attachment_types: G.map((Z) => Z.type)
  });
  for (let Z of G) yield Nu(Z)
}
// @from(Start 9519090, End 9520044)
async function Le1(A, B, Q, I, G) {
  let {
    offset: Z,
    limit: D
  } = G ?? {};
  try {
    let Y = {
      file_path: A,
      offset: Z,
      limit: D
    };
    async function W() {
      try {
        let F = {
            file_path: A,
            offset: Z ?? 1,
            limit: 100
          },
          X = await aJ(OB.call(F, B));
        return E1(Q, {}), {
          type: "new_file",
          filename: A,
          content: X.data,
          truncated: !0
        }
      } catch {
        return E1(I, {}), null
      }
    }
    let J = await OB.validateInput(Y);
    if (!J.result) {
      if (J.meta?.fileSize) return await W();
      return null
    }
    try {
      let F = await aJ(OB.call(Y, B));
      return {
        type: "new_file",
        filename: A,
        content: F.data
      }
    } catch (F) {
      if (F instanceof dK1) return await W();
      throw F
    }
  } catch {
    return E1(I, {}), null
  }
}
// @from(Start 9520046, End 9520179)
function Nu(A) {
  return {
    attachment: A,
    type: "attachment",
    uuid: ZW5(),
    timestamp: new Date().toISOString()
  }
}
// @from(Start 9520184, End 9520258)
XU2 = ["User", "Project", "Local", "Managed", "ExperimentalUltraClaudeMd"]
// @from(Start 9520261, End 9520352)
function f11(A) {
  if (A === "Local") return "project (local)";
  return A.toLowerCase()
}
// @from(Start 9520354, End 9520450)
function $H1(A) {
  if (A === "Local") return "Project (local) memory";
  return A + " memory"
}
// @from(Start 9520455, End 9520467)
VU2 = 200000
// @from(Start 9520471, End 9520482)
CU2 = 20000
// @from(Start 9520485, End 9521567)
function Re1(A) {
  let B = {
      toolRequests: new Map,
      toolResults: new Map,
      humanMessages: 0,
      assistantMessages: 0,
      localCommandOutputs: 0,
      other: 0,
      attachments: new Map,
      duplicateFileReads: new Map,
      total: 0
    },
    Q = new Map,
    I = new Map,
    G = new Map;
  return A.forEach((D) => {
    if (D.type === "attachment") {
      let Y = D.attachment.type || "unknown";
      B.attachments.set(Y, (B.attachments.get(Y) || 0) + 1)
    }
  }), JW(A).forEach((D) => {
    let {
      content: Y
    } = D.message;
    if (typeof Y === "string") {
      let W = AE(Y);
      if (B.total += W, D.type === "user" && Y.includes("local-command-stdout")) B.localCommandOutputs += W;
      else B[D.type === "user" ? "humanMessages" : "assistantMessages"] += W
    } else Y.forEach((W) => $W5(W, D, B, Q, I, G))
  }), G.forEach((D, Y) => {
    if (D.count > 1) {
      let J = Math.floor(D.totalTokens / D.count) * (D.count - 1);
      B.duplicateFileReads.set(Y, {
        count: D.count,
        tokens: J
      })
    }
  }), B
}
// @from(Start 9521569, End 9522930)
function $W5(A, B, Q, I, G, Z) {
  let D = AE(JSON.stringify(A));
  switch (Q.total += D, A.type) {
    case "text":
      if (B.type === "user" && "text" in A && A.text.includes("local-command-stdout")) Q.localCommandOutputs += D;
      else Q[B.type === "user" ? "humanMessages" : "assistantMessages"] += D;
      break;
    case "tool_use": {
      if ("name" in A && "id" in A) {
        let Y = A.name || "unknown";
        if (KU2(Q.toolRequests, Y, D), I.set(A.id, Y), Y === "Read" && "input" in A && A.input && typeof A.input === "object" && "file_path" in A.input) {
          let W = String(A.input.file_path);
          G.set(A.id, W)
        }
      }
      break
    }
    case "tool_result": {
      if ("tool_use_id" in A) {
        let Y = I.get(A.tool_use_id) || "unknown";
        if (KU2(Q.toolResults, Y, D), Y === "Read") {
          let W = G.get(A.tool_use_id);
          if (W) {
            let J = Z.get(W) || {
              count: 0,
              totalTokens: 0
            };
            Z.set(W, {
              count: J.count + 1,
              totalTokens: J.totalTokens + D
            })
          }
        }
      }
      break
    }
    case "image":
    case "server_tool_use":
    case "web_search_tool_result":
    case "document":
    case "thinking":
    case "redacted_thinking":
      Q.other += D;
      break
  }
}
// @from(Start 9522932, End 9522989)
function KU2(A, B, Q) {
  A.set(B, (A.get(B) || 0) + Q)
}
// @from(Start 9522991, End 9524432)
function HU2(A) {
  let B = {
    total_tokens: A.total,
    human_message_tokens: A.humanMessages,
    assistant_message_tokens: A.assistantMessages,
    local_command_output_tokens: A.localCommandOutputs,
    other_tokens: A.other
  };
  A.attachments.forEach((I, G) => {
    B[`attachment_${G}_count`] = I
  }), A.toolRequests.forEach((I, G) => {
    B[`tool_request_${G}_tokens`] = I
  }), A.toolResults.forEach((I, G) => {
    B[`tool_result_${G}_tokens`] = I
  });
  let Q = [...A.duplicateFileReads.values()].reduce((I, G) => I + G.tokens, 0);
  if (B.duplicate_read_tokens = Q, B.duplicate_read_file_count = A.duplicateFileReads.size, A.total > 0) {
    B.human_message_percent = Math.round(A.humanMessages / A.total * 100), B.assistant_message_percent = Math.round(A.assistantMessages / A.total * 100), B.local_command_output_percent = Math.round(A.localCommandOutputs / A.total * 100), B.duplicate_read_percent = Math.round(Q / A.total * 100);
    let I = [...A.toolRequests.values()].reduce((Z, D) => Z + D, 0),
      G = [...A.toolResults.values()].reduce((Z, D) => Z + D, 0);
    B.tool_request_percent = Math.round(I / A.total * 100), B.tool_result_percent = Math.round(G / A.total * 100), A.toolRequests.forEach((Z, D) => {
      B[`tool_request_${D}_percent`] = Math.round(Z / A.total * 100)
    }), A.toolResults.forEach((Z, D) => {
      B[`tool_result_${D}_percent`] = Math.round(Z / A.total * 100)
    })
  }
  return B
}
// @from(Start 9524437, End 9524444)
qW5 = 5
// @from(Start 9524448, End 9524459)
MW5 = 50000
// @from(Start 9524463, End 9524472)
LW5 = 1e4
// @from(Start 9524476, End 9524515)
v11 = "Not enough messages to compact."
// @from(Start 9524519, End 9524598)
RW5 = "Conversation too long. Press esc to go up a few messages and try again."
// @from(Start 9524602, End 9524641)
b11 = "API Error: Request was aborted."
// @from(Start 9524643, End 9527484)
async function qH1(A, B, Q, I) {
  try {
    if (A.length === 0) throw new Error(v11);
    let G = VE(A),
      Z = Re1(A),
      D = {};
    try {
      D = HU2(Z)
    } catch (T) {
      M6("Failed to get context analysis metrics"), b1(T)
    }
    E1("tengu_compact", {
      preCompactTokenCount: G,
      ...D
    }), QU2(B.getToolPermissionContext()), B.setStreamMode?.("requesting"), B.setResponseLength?.(0), B.setSpinnerMessage?.("Compacting conversation");
    let Y = AU2(I),
      W = K2({
        content: Y
      }),
      J = wu(JW([...A, W]), ["You are a helpful AI assistant tasked with summarizing conversations."], 0, [OB], B.abortController.signal, {
        getToolPermissionContext: B.getToolPermissionContext,
        model: J7(),
        prependCLISysprompt: !0,
        toolChoice: void 0,
        isNonInteractiveSession: B.options.isNonInteractiveSession,
        maxOutputTokensOverride: CU2
      }),
      F = 0,
      X = J[Symbol.asyncIterator](),
      V = await X.next(),
      C = !1,
      K;
    while (!V.done) {
      let T = V.value;
      if (!C && T.type === "stream_event" && T.event.type === "content_block_start" && T.event.content_block.type === "text") C = !0, B.setStreamMode?.("responding");
      if (T.type === "stream_event" && T.event.type === "content_block_delta" && T.event.delta.type === "text_delta") F += T.event.delta.text.length, B.setResponseLength?.(F);
      if (T.type === "assistant") K = T;
      V = await X.next()
    }
    if (!K) throw new Error("Failed to get summary response from streaming");
    let E = BH1(K);
    if (!E) throw E1("tengu_compact_failed", {
      reason: "no_summary",
      preCompactTokenCount: G
    }), new Error("Failed to generate conversation summary - response did not contain valid text content");
    else if (E.startsWith(bZ)) throw E1("tengu_compact_failed", {
      reason: "api_error",
      preCompactTokenCount: G
    }), new Error(E);
    else if (E.startsWith(Xt)) throw E1("tengu_compact_failed", {
      reason: "prompt_too_long",
      preCompactTokenCount: G
    }), new Error(RW5);
    let N = {
      ...B.readFileState
    };
    if (B.readFileState) Object.keys(B.readFileState).forEach((T) => {
      delete B.readFileState[T]
    });
    let q = await TW5(N, B, qW5),
      O = PW5(B.agentId);
    if (O) q.push(O);
    let R = [K2({
      content: BU2(E, Q),
      isCompactSummary: !0
    }), ...q];
    if (B.setMessages) {
      if (B.setMessages(R), B.setMessageHistory) B.setMessageHistory((T) => [...T, ...A])
    }
    return B.setStreamMode?.("requesting"), B.setResponseLength?.(0), B.setSpinnerMessage?.(null), {
      summaryMessage: K,
      messagesAfterCompacting: R
    }
  } catch (G) {
    throw B.setStreamMode?.("requesting"), B.setResponseLength?.(0), B.setSpinnerMessage?.(null), OW5(G, B), G
  }
}
// @from(Start 9527486, End 9527728)
function OW5(A, B) {
  if (ki(A, b11) || ki(A, v11)) B.addNotification?.({
    text: ""
  }, {
    timeoutMs: 0
  });
  else B.addNotification?.({
    text: "Error compacting conversation",
    color: "error"
  }, {
    timeoutMs: 2000
  })
}
// @from(Start 9527729, End 9528403)
async function TW5(A, B, Q) {
  let I = Object.entries(A).map(([D, Y]) => ({
      filename: D,
      ...Y
    })).filter((D) => !SW5(D.filename, B.agentId)).sort((D, Y) => Y.timestamp - D.timestamp).slice(0, Q),
    G = await Promise.all(I.map(async (D) => {
      let Y = await Le1(D.filename, {
        ...B,
        fileReadingLimits: {
          maxTokens: LW5
        }
      }, "tengu_post_compact_file_restore_success", "tengu_post_compact_file_restore_error");
      return Y ? Nu(Y) : null
    })),
    Z = 0;
  return G.filter((D) => {
    if (D === null) return !1;
    let Y = AE(JSON.stringify(D));
    if (Z + Y <= MW5) return Z += Y, !0;
    return !1
  })
}
// @from(Start 9528405, End 9528582)
function PW5(A) {
  let B = jJ(A);
  if (B.length === 0) return null;
  return Nu({
    type: "todo",
    content: B,
    itemCount: B.length,
    context: "post-compact"
  })
}
// @from(Start 9528584, End 9528788)
function SW5(A, B) {
  let Q = qS(A);
  try {
    let I = qS(cR(B));
    if (Q === I) return !0
  } catch {}
  try {
    if (new Set(XU2.map((G) => qS(gK(G)))).has(Q)) return !0
  } catch {}
  return !1
}
// @from(Start 9528790, End 9528857)
function zU2() {
  let A = J7(),
    B = Ee1(A);
  return VU2 - B
}
// @from(Start 9528862, End 9528872)
h11 = 0.92
// @from(Start 9528876, End 9528885)
_W5 = 0.6
// @from(Start 9528889, End 9528898)
jW5 = 0.8
// @from(Start 9528901, End 9529246)
function m11(A, B) {
  let Q = zU2() * B,
    I = g11() ? Q : zU2(),
    G = Math.max(0, Math.round((I - A) / I * 100)),
    Z = I * _W5,
    D = I * jW5,
    Y = A >= Z,
    W = A >= D,
    J = g11() && A >= Q;
  return {
    percentLeft: G,
    isAboveWarningThreshold: Y,
    isAboveErrorThreshold: W,
    isAboveAutoCompactThreshold: J
  }
}
// @from(Start 9529248, End 9529299)
function g11() {
  return ZA().autoCompactEnabled
}
// @from(Start 9529300, End 9529442)
async function yW5(A) {
  if (!g11()) return !1;
  let B = VE(A),
    {
      isAboveAutoCompactThreshold: Q
    } = m11(B, h11);
  return Q
}
// @from(Start 9529443, End 9529846)
async function wU2(A, B) {
  if (!await yW5(A)) return {
    messages: A,
    wasCompacted: !1
  };
  try {
    let {
      messagesAfterCompacting: I
    } = await qH1(A, B, !0, void 0);
    return {
      messages: I,
      wasCompacted: !0
    }
  } catch (I) {
    if (!ki(I, b11)) b1(I instanceof Error ? I : new Error(String(I)));
    return {
      messages: A,
      wasCompacted: !1
    }
  }
}
// @from(Start 9529851, End 9529867)
gQ = I1(U1(), 1)
// @from(Start 9529972, End 9529988)
r7 = I1(U1(), 1)
// @from(Start 9530033, End 9530814)
function EU2({
  notebook_path: A,
  cell_id: B,
  new_source: Q,
  cell_type: I,
  edit_mode: G = "replace",
  verbose: Z
}) {
  let D = G === "delete" ? "delete" : `${G} cell in`;
  return r7.createElement(w0, null, r7.createElement(h, {
    flexDirection: "column"
  }, r7.createElement(h, {
    flexDirection: "row"
  }, r7.createElement(P, {
    color: "error"
  }, "User rejected ", D, " "), r7.createElement(P, {
    bold: !0,
    color: "error"
  }, Z ? A : kW5(dA(), A)), r7.createElement(P, {
    color: "error"
  }, " at cell ", B)), G !== "delete" && r7.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, r7.createElement(P, {
    dimColor: !0
  }, r7.createElement(YW, {
    code: Q,
    language: I === "markdown" ? "markdown" : "python"
  })))))
}
// @from(Start 9530819, End 9530889)
UU2 = "Replace the contents of a specific cell in a Jupyter notebook."