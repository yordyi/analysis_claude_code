
// @from(Start 9246692, End 9248029)
async function wC2({
  client: {
    client: A,
    name: B
  },
  tool: Q,
  args: I,
  signal: G,
  isNonInteractiveSession: Z
}) {
  try {
    p2(B, `Calling MCP tool: ${Q}`);
    let D = await A.callTool({
      name: Q,
      arguments: I
    }, Sm, {
      signal: G,
      timeout: p65()
    });
    if ("isError" in D && D.isError) {
      let W = "Unknown error";
      if ("content" in D && Array.isArray(D.content) && D.content.length > 0) {
        let J = D.content[0];
        if (J && typeof J === "object" && "text" in J) W = J.text
      } else if ("error" in D) W = String(D.error);
      throw m7(B, W), Error(W)
    }
    if (p2(B, `Tool call succeeded: ${JSON.stringify(D)}`), "toolResult" in D) {
      let J = await wJ("claude_code_unicode_sanitize") ? $i1(String(D.toolResult)) : String(D.toolResult);
      if (B !== "ide") await Zo1(J, Q, Z);
      return J
    }
    if ("content" in D && Array.isArray(D.content)) {
      let W = D.content,
        X = (await wJ("claude_code_unicode_sanitize") ? D$(W) : W).map((V) => No1(V, B)).flat();
      if (B !== "ide") await Zo1(X, Q, Z);
      return X
    }
    let Y = `Unexpected response format from tool ${Q}`;
    throw m7(B, Y), Error(Y)
  } catch (D) {
    if (D instanceof he) throw D;
    if (!(D instanceof Error) || D.name !== "AbortError") throw D
  }
}
// @from(Start 9248030, End 9253367)
class PK {
  static instance;
  baseline = new Map;
  initialized = !1;
  mcpClient;
  lastProcessedTimestamps = new Map;
  lastDiagnosticsByUri = new Map;
  rightFileDiagnosticsState = new Map;
  static getInstance() {
    if (!PK.instance) PK.instance = new PK;
    return PK.instance
  }
  initialize(A) {
    if (this.initialized) return;
    if (this.mcpClient = A, this.initialized = !0, this.mcpClient && this.mcpClient.type === "connected") {
      let B = n.object({
        method: n.literal("diagnostics_changed"),
        params: n.object({
          uri: n.string()
        })
      });
      this.mcpClient.client.setNotificationHandler(B, async (Q) => {
        let {
          uri: I
        } = Q.params;
        this.handleDiagnosticChange(I)
      })
    }
  }
  async shutdown() {
    this.initialized = !1, this.baseline.clear()
  }
  reset() {
    this.baseline.clear(), this.rightFileDiagnosticsState.clear()
  }
  normalizeFileUri(A) {
    let B = ["file://", "_claude_fs_right:", "_claude_fs_left:"];
    for (let Q of B)
      if (A.startsWith(Q)) return A.slice(Q.length);
    return A
  }
  async ensureFileOpened(A) {
    if (!this.initialized || !this.mcpClient || this.mcpClient.type !== "connected") return;
    try {
      await gw("openFile", {
        filePath: A,
        preview: !1,
        startText: "",
        endText: "",
        selectToEndOfLine: !1,
        makeFrontmost: !1
      }, this.mcpClient, !1)
    } catch (B) {
      b1(B)
    }
  }
  async beforeFileEdited(A) {
    if (!this.initialized || !this.mcpClient || this.mcpClient.type !== "connected") return;
    let B = Date.now();
    try {
      let Q = await gw("getDiagnostics", {
          uri: `file://${A}`
        }, this.mcpClient, !1),
        I = this.parseDiagnosticResult(Q)[0];
      if (I) {
        if (A !== this.normalizeFileUri(I.uri)) {
          b1(new Error(`Diagnostics file path mismatch: expected ${A}, got ${I.uri})`));
          return
        }
        this.baseline.set(A, I.diagnostics), this.lastProcessedTimestamps.set(A, B)
      } else this.baseline.set(A, []), this.lastProcessedTimestamps.set(A, B)
    } catch (Q) {}
  }
  async getNewDiagnostics() {
    if (!this.initialized || !this.mcpClient || this.mcpClient.type !== "connected") return [];
    let A = [];
    try {
      let G = await gw("getDiagnostics", {}, this.mcpClient, !1);
      A = this.parseDiagnosticResult(G)
    } catch (G) {
      return []
    }
    let B = A.filter((G) => this.baseline.has(this.normalizeFileUri(G.uri))).filter((G) => G.uri.startsWith("file://")),
      Q = new Map;
    A.filter((G) => this.baseline.has(this.normalizeFileUri(G.uri))).filter((G) => G.uri.startsWith("_claude_fs_right:")).forEach((G) => {
      Q.set(this.normalizeFileUri(G.uri), G)
    });
    let I = [];
    for (let G of B) {
      let Z = this.normalizeFileUri(G.uri),
        D = this.baseline.get(Z) || [],
        Y = Q.get(Z),
        W = G;
      if (Y) {
        let F = this.rightFileDiagnosticsState.get(Z);
        if (!F || !this.areDiagnosticArraysEqual(F, Y.diagnostics)) W = Y;
        this.rightFileDiagnosticsState.set(Z, Y.diagnostics)
      }
      let J = W.diagnostics.filter((F) => !D.some((X) => this.areDiagnosticsEqual(F, X)));
      if (J.length > 0) I.push({
        uri: G.uri,
        diagnostics: J
      });
      this.baseline.set(Z, W.diagnostics)
    }
    return I
  }
  parseDiagnosticResult(A) {
    if (Array.isArray(A)) {
      let B = A.find((Q) => Q.type === "text");
      if (B && "text" in B) return JSON.parse(B.text)
    }
    return []
  }
  areDiagnosticsEqual(A, B) {
    return A.message === B.message && A.severity === B.severity && A.source === B.source && A.code === B.code && A.range.start.line === B.range.start.line && A.range.start.character === B.range.start.character && A.range.end.line === B.range.end.line && A.range.end.character === B.range.end.character
  }
  areDiagnosticArraysEqual(A, B) {
    if (A.length !== B.length) return !1;
    return A.every((Q) => B.some((I) => this.areDiagnosticsEqual(Q, I))) && B.every((Q) => A.some((I) => this.areDiagnosticsEqual(I, Q)))
  }
  isLinterDiagnostic(A) {
    let B = ["eslint", "eslint-plugin", "tslint", "prettier", "stylelint", "jshint", "standardjs", "xo", "rome", "biome", "deno-lint", "rubocop", "pylint", "flake8", "black", "ruff", "clippy", "rustfmt", "golangci-lint", "gofmt", "swiftlint", "detekt", "ktlint", "checkstyle", "pmd", "sonarqube", "sonarjs"];
    if (!A.source) return !1;
    let Q = A.source.toLowerCase();
    return B.some((I) => Q.includes(I))
  }
  handleDiagnosticChange(A) {}
  async handleQueryStart(A) {
    if (!this.initialized) {
      let B = IW(A);
      if (B) this.initialize(B)
    } else this.reset()
  }
  static formatDiagnosticsSummary(A) {
    return A.map((B) => {
      let Q = B.uri.split("/").pop() || B.uri,
        I = B.diagnostics.map((G) => {
          return `  ${PK.getSeveritySymbol(G.severity)} [Line ${G.range.start.line+1}:${G.range.start.character+1}] ${G.message}${G.code?` [${G.code}]`:""}${G.source?` (${G.source})`:""}`
        }).join(`
`);
      return `${Q}:
${I}`
    }).join(`

`)
  }
  static getSeveritySymbol(A) {
    return {
      Error: A0.cross,
      Warning: A0.warning,
      Info: A0.info,
      Hint: A0.star
    } [A] || A0.bullet
  }
}
// @from(Start 9253372, End 9253393)
SK = PK.getInstance()
// @from(Start 9253399, End 9253415)
F8 = I1(U1(), 1)
// @from(Start 9253510, End 9253527)
Au = I1(Bt1(), 1)
// @from(Start 9253533, End 9253550)
$K1 = I1(U1(), 1)
// @from(Start 9253553, End 9254234)
function YW({
  code: A,
  language: B
}) {
  let Q = $K1.useMemo(() => {
    let I = kv(A);
    try {
      if (Au.supportsLanguage(B)) return Au.highlight(I, {
        language: B
      });
      else return b1(new Error(`Language not supported while highlighting code, falling back to markdown: ${B}`)), Au.highlight(I, {
        language: "markdown"
      })
    } catch (G) {
      if (G instanceof Error && G.message.includes("Unknown language")) return b1(new Error(`Language not supported while highlighting code, falling back to markdown: ${G}`)), Au.highlight(I, {
        language: "markdown"
      })
    }
  }, [A, B]);
  return $K1.default.createElement(P, null, Q)
}
// @from(Start 9254239, End 9254249)
xK1 = null
// @from(Start 9254251, End 9254683)
async function Qw2() {
  if (xK1) return xK1.default;
  if (Ez()) try {
    let Q = await Promise.resolve().then(() => (_H2(), SH2)),
      I = Q.sharp || Q.default;
    return xK1 = {
      default: I
    }, I
  } catch {
    console.warn("Native image processor not available, falling back to sharp")
  }
  let A = await Promise.resolve().then(() => I1(kK1(), 1)),
    B = A?.default || A;
  return xK1 = {
    default: B
  }, B
}
// @from(Start 9254688, End 9254701)
Kt1 = 3932160
// @from(Start 9254705, End 9254715)
fK1 = 2000
// @from(Start 9254719, End 9254729)
vK1 = 2000
// @from(Start 9254731, End 9255784)
async function Y11(A, B, Q) {
  try {
    let I = await Promise.resolve().then(() => I1(kK1(), 1)),
      Z = (I.default || I)(A),
      D = await Z.metadata();
    if (!D.width || !D.height) {
      if (B > Kt1) return {
        buffer: await Z.jpeg({
          quality: 80
        }).toBuffer(),
        mediaType: "jpeg"
      }
    }
    let Y = D.width || 0,
      W = D.height || 0,
      J = D.format ?? Q,
      F = J === "jpg" ? "jpeg" : J;
    if (B <= Kt1 && Y <= fK1 && W <= vK1) return {
      buffer: A,
      mediaType: F
    };
    if (Y > fK1) W = Math.round(W * fK1 / Y), Y = fK1;
    if (W > vK1) Y = Math.round(Y * vK1 / W), W = vK1;
    let X = await Z.resize(Y, W, {
      fit: "inside",
      withoutEnlargement: !0
    }).toBuffer();
    if (X.length > Kt1) return {
      buffer: await Z.jpeg({
        quality: 80
      }).toBuffer(),
      mediaType: "jpeg"
    };
    return {
      buffer: X,
      mediaType: F
    }
  } catch (I) {
    return b1(I), {
      buffer: A,
      mediaType: Q === "jpg" ? "jpeg" : Q
    }
  }
}
// @from(Start 9255789, End 9255805)
lD = I1(U1(), 1)
// @from(Start 9255868, End 9256103)
function W11(A) {
  let B = A.split(`
`),
    Q = 0;
  while (Q < B.length && B[Q]?.trim() === "") Q++;
  let I = B.length - 1;
  while (I >= 0 && B[I]?.trim() === "") I--;
  if (Q > I) return "";
  return B.slice(Q, I + 1).join(`
`)
}
// @from(Start 9256105, End 9256594)
function bO(A) {
  let B = /^data:image\/[a-z0-9.+_-]+;base64,/i.test(A);
  if (B) return {
    totalLines: 1,
    truncatedContent: A,
    isImage: B
  };
  let Q = KJ1();
  if (A.length <= Q) return {
    totalLines: A.split(`
`).length,
    truncatedContent: A,
    isImage: B
  };
  let I = A.slice(0, Q),
    G = A.slice(Q).split(`
`).length,
    Z = `${I}

... [${G} lines truncated] ...`;
  return {
    totalLines: A.split(`
`).length,
    truncatedContent: Z,
    isImage: B
  }
}
// @from(Start 9256599, End 9256656)
bK1 = (A) => `${A.trim()}
Shell cwd was reset to ${e9()}`
// @from(Start 9256659, End 9256804)
function gK1(A) {
  if (tf1() || !eF(dA(), A)) {
    if (EX(e9()), !tf1()) return E1("bash_tool_reset_to_original_dir", {}), !0
  }
  return !1
}
// @from(Start 9256805, End 9258218)
async function Iw2(A, B, Q) {
  let G = (await cZ({
    systemPrompt: [`Extract any file paths that this command reads or modifies. For commands like "git diff" and "cat", include the paths of files being shown. Use paths verbatim -- don't add any slashes or try to resolve them. Do not try to infer paths that were not explicitly listed in the command output.

IMPORTANT: Commands that do not display the contents of the files should not return any filepaths. For eg. "ls", pwd", "find". Even more complicated commands that don't display the contents should not be considered: eg "find . -type f -exec ls -la {} + | sort -k5 -nr | head -5"

First, determine if the command displays the contents of the files. If it does, then <is_displaying_contents> tag should be true. If it does not, then <is_displaying_contents> tag should be false.

Format your response as:
<is_displaying_contents>
true
</is_displaying_contents>

<filepaths>
path/to/file1
path/to/file2
</filepaths>

If no files are read or modified, return empty filepaths tags:
<filepaths>
</filepaths>

Do not include any other text in your response.`],
    userPrompt: `Command: ${A}
Output: ${B}`,
    enablePromptCaching: !0,
    isNonInteractiveSession: Q,
    promptCategory: "command_paths"
  })).message.content.filter((Z) => Z.type === "text").map((Z) => Z.text).join("");
  return mG(G, "filepaths")?.trim().split(`
`).filter(Boolean) || []
}
// @from(Start 9258223, End 9258504)
uG5 = n.strictObject({
    notebook_path: n.string().describe("The absolute path to the Jupyter notebook file to read (must be absolute, not relative)"),
    cell_id: n.string().optional().describe("The ID of a specific cell to read. If not provided, all cells will be read.")
  })
// @from(Start 9258508, End 9261385)
J11 = {
    name: NS,
    async description() {
      return ffA
    },
    async prompt() {
      return vfA
    },
    userFacingName() {
      return "Read Notebook"
    },
    isEnabled() {
      return !0
    },
    inputSchema: uG5,
    isConcurrencySafe() {
      return !0
    },
    isReadOnly() {
      return !0
    },
    getPath({
      notebook_path: A
    }) {
      return A
    },
    async checkPermissions(A, B) {
      return qz(J11, A, B.getToolPermissionContext())
    },
    async validateInput({
      notebook_path: A,
      cell_id: B
    }) {
      let Q = oM(A),
        I = x1();
      if (!Q || !I.existsSync(Q)) {
        let G = Q ? xv(Q) : void 0,
          Z = "File does not exist.";
        if (G) Z += ` Did you mean ${G}?`;
        return {
          result: !1,
          message: Z,
          errorCode: 1
        }
      }
      if (mG5(Q) !== ".ipynb") return {
        result: !1,
        message: "File must be a Jupyter notebook (.ipynb file).",
        errorCode: 2
      };
      if (B) {
        let G = x1().readFileSync(Q, {
            encoding: "utf-8"
          }),
          Z = Z8(G);
        if (!Z || !Array.isArray(Z.cells)) return {
          result: !1,
          message: "Invalid notebook format.",
          errorCode: 3
        };
        let D = Yu(B);
        if (D !== void 0) {
          if (!Z.cells[D]) return {
            result: !1,
            message: `Cell with ID "${B}" not found in notebook.`,
            errorCode: 4
          }
        } else if (!Z.cells.find((W) => W.id === B)) return {
          result: !1,
          message: `Cell with ID "${B}" not found in notebook.`,
          errorCode: 5
        }
      }
      return {
        result: !0
      }
    },
    renderToolUseMessage(A, {
      verbose: B
    }) {
      if (!A.notebook_path) return null;
      return B ? A.notebook_path : dG5(dA(), A.notebook_path)
    },
    renderToolUseRejectedMessage() {
      return lD.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return lD.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage(A) {
      if (!A) return lD.createElement(P, {
        color: "error"
      }, "No cells found in notebook");
      if (A.length < 1 || !A[0]) return lD.createElement(P, {
        color: "error"
      }, "No cells found in notebook");
      return lD.createElement(w0, {
        height: 1
      }, lD.createElement(P, null, "Read ", lD.createElement(P, {
        bold: !0
      }, A.length), " cells"))
    },
    async * call({
      notebook_path: A,
      cell_id: B
    }) {
      yield {
        type: "result",
        data: zt1(A, B)
      }
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return wt1(A, B)
    }
  }
// @from(Start 9261388, End 9261531)
function Ht1(A) {
  if (!A) return "";
  let B = Array.isArray(A) ? A.join("") : A,
    {
      truncatedContent: Q
    } = bO(B);
  return Q
}
// @from(Start 9261533, End 9261834)
function pG5(A) {
  if (typeof A["image/png"] === "string") return {
    image_data: A["image/png"].replace(/\s/g, ""),
    media_type: "image/png"
  };
  if (typeof A["image/jpeg"] === "string") return {
    image_data: A["image/jpeg"].replace(/\s/g, ""),
    media_type: "image/jpeg"
  };
  return
}
// @from(Start 9261836, End 9262298)
function cG5(A) {
  switch (A.output_type) {
    case "stream":
      return {
        output_type: A.output_type, text: Ht1(A.text)
      };
    case "execute_result":
    case "display_data":
      return {
        output_type: A.output_type, text: Ht1(A.data?.["text/plain"]), image: A.data && pG5(A.data)
      };
    case "error":
      return {
        output_type: A.output_type, text: Ht1(`${A.ename}: ${A.evalue}
${A.traceback.join(`
`)}`)
      }
  }
}
// @from(Start 9262300, End 9262882)
function Gw2(A, B, Q, I) {
  let G = A.id ?? `cell-${B}`,
    Z = {
      cellType: A.cell_type,
      source: Array.isArray(A.source) ? A.source.join("") : A.source,
      execution_count: A.execution_count,
      cell_id: G
    };
  if (A.cell_type === "code") Z.language = Q;
  if (A.outputs?.length) {
    let D = A.outputs.map(cG5);
    if (!I && JSON.stringify(D).length > 1e4) Z.outputs = [{
      output_type: "stream",
      text: `Outputs are too large to include. Use ${NS} with parameter cell_id=${G} to read cell outputs`
    }];
    else Z.outputs = D
  }
  return Z
}
// @from(Start 9262884, End 9263215)
function lG5(A) {
  let B = [];
  if (A.cellType !== "code") B.push(`<cell_type>${A.cellType}</cell_type>`);
  if (A.language !== "python" && A.cellType === "code") B.push(`<language>${A.language}</language>`);
  return {
    text: `<cell id="${A.cell_id}">${B.join("")}${A.source}</cell id="${A.cell_id}">`,
    type: "text"
  }
}
// @from(Start 9263217, End 9263491)
function iG5(A) {
  let B = [];
  if (A.text) B.push({
    text: `
${A.text}`,
    type: "text"
  });
  if (A.image) B.push({
    type: "image",
    source: {
      data: A.image.image_data,
      media_type: A.image.media_type,
      type: "base64"
    }
  });
  return B
}
// @from(Start 9263493, End 9263588)
function nG5(A) {
  let B = lG5(A),
    Q = A.outputs?.flatMap(iG5);
  return [B, ...Q ?? []]
}
// @from(Start 9263590, End 9264051)
function zt1(A, B) {
  let Q = oM(A);
  if (!Q) throw new Error("Invalid notebook path");
  let I = x1().readFileSync(Q, {
      encoding: "utf-8"
    }),
    G = JSON.parse(I),
    Z = G.metadata.language_info?.name ?? "python";
  if (B) {
    let D = G.cells.find((Y) => Y.id === B);
    if (!D) throw new Error(`Cell with ID "${B}" not found in notebook`);
    return [Gw2(D, G.cells.indexOf(D), Z, !0)]
  }
  return G.cells.map((D, Y) => Gw2(D, Y, Z, !1))
}
// @from(Start 9264053, End 9264387)
function wt1(A, B) {
  let Q = A.flatMap(nG5);
  return {
    tool_use_id: B,
    type: "tool_result",
    content: Q.reduce((I, G) => {
      if (I.length === 0) return [G];
      let Z = I[I.length - 1];
      if (Z && Z.type === "text" && G.type === "text") return Z.text += `
` + G.text, I;
      return [...I, G]
    }, [])
  }
}
// @from(Start 9264389, End 9264539)
function Yu(A) {
  let B = A.match(/^cell-(\d+)$/);
  if (B && B[1]) {
    let Q = parseInt(B[1], 10);
    return isNaN(Q) ? void 0 : Q
  }
  return
}
// @from(Start 9264544, End 9264556)
mK1 = 262144
// @from(Start 9264560, End 9264571)
Zw2 = 25000
// @from(Start 9264573, End 9264960)
class dK1 extends Error {
  tokenCount;
  maxTokens;
  constructor(A, B) {
    super(`File content (${A} tokens) exceeds maximum allowed tokens (${B}). Please use offset and limit parameters to read specific portions of the file, or use the GrepTool to search for specific content.`);
    this.tokenCount = A;
    this.maxTokens = B;
    this.name = "MaxFileReadTokenExceededError"
  }
}
// @from(Start 9264965, End 9265024)
hK1 = new Set(["png", "jpg", "jpeg", "gif", "bmp", "webp"])
// @from(Start 9265028, End 9265601)
rG5 = new Set(["mp3", "wav", "flac", "ogg", "aac", "m4a", "wma", "aiff", "opus", "mp4", "avi", "mov", "wmv", "flv", "mkv", "webm", "m4v", "mpeg", "mpg", "zip", "rar", "tar", "gz", "bz2", "7z", "xz", "z", "tgz", "iso", "exe", "dll", "so", "dylib", "app", "msi", "deb", "rpm", "bin", "dat", "db", "sqlite", "sqlite3", "mdb", "idx", "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "odt", "ods", "odp", "ttf", "otf", "woff", "woff2", "eot", "psd", "ai", "eps", "sketch", "fig", "xd", "blend", "obj", "3ds", "max", "class", "jar", "war", "pyc", "pyo", "rlib", "swf", "fla"])
// @from(Start 9265605, End 9265978)
oG5 = n.strictObject({
    file_path: n.string().describe("The absolute path to the file to read"),
    offset: n.number().optional().describe("The line number to start reading from. Only provide if the file is too large to read at once"),
    limit: n.number().optional().describe("The number of lines to read. Only provide if the file is too large to read at once.")
  })
// @from(Start 9265982, End 9272842)
OB = {
    name: TD,
    async description() {
      return bfA
    },
    async prompt() {
      return gfA
    },
    inputSchema: oG5,
    userFacingName() {
      return "Read"
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
    getPath({
      file_path: A
    }) {
      return A || dA()
    },
    async checkPermissions(A, B) {
      return qz(OB, A, B.getToolPermissionContext())
    },
    renderToolUseMessage({
      file_path: A,
      offset: B,
      limit: Q
    }, {
      verbose: I
    }) {
      if (!A) return null;
      if (I) return `file_path: "${A}"${B?`, offset: ${B}`:""}${Q?`, limit: ${Q}`:""}`;
      return sG5(dA(), A)
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage(A, B, {
      verbose: Q
    }) {
      switch (A.type) {
        case "image": {
          let {
            originalSize: I
          } = A.file, G = AL(I);
          return F8.createElement(w0, {
            height: 1
          }, F8.createElement(P, null, "Read image (", G, ")"))
        }
        case "notebook": {
          let {
            cells: I
          } = A.file;
          if (!I || I.length < 1) return F8.createElement(P, {
            color: "error"
          }, "No cells found in notebook");
          return F8.createElement(w0, {
            height: 1
          }, F8.createElement(P, null, "Read ", F8.createElement(P, {
            bold: !0
          }, I.length), " cells"))
        }
        case "text": {
          let {
            filePath: I,
            content: G,
            numLines: Z
          } = A.file, D = G || "(No content)";
          if (Q) return F8.createElement(w0, null, F8.createElement(YW, {
            code: D,
            language: aG5(I).slice(1)
          }));
          return F8.createElement(w0, {
            height: 1
          }, F8.createElement(P, null, "Read ", F8.createElement(P, {
            bold: !0
          }, Z), " ", Z === 1 ? "line" : "lines", " ", Z > 0 && F8.createElement(NO, null)))
        }
      }
    },
    renderToolUseRejectedMessage() {
      return F8.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return F8.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    async validateInput({
      file_path: A,
      offset: B,
      limit: Q
    }) {
      let I = x1(),
        G = qS(A);
      if (fv(G)) return {
        result: !1,
        message: "File is in a directory that is ignored by your project configuration.",
        errorCode: 1
      };
      if (!I.existsSync(G)) {
        let J = xv(G),
          F = "File does not exist.",
          X = dA(),
          V = e9();
        if (X !== V) F += ` Current working directory: ${X}`;
        if (J) F += ` Did you mean ${J}?`;
        return {
          result: !1,
          message: F,
          errorCode: 2
        }
      }
      if (G.endsWith(".ipynb") && !process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL) return {
        result: !1,
        message: `File is a Jupyter Notebook. Use the ${NS} to read this file.`,
        errorCode: 3
      };
      let D = I.statSync(G).size,
        Y = Et1.extname(G).toLowerCase();
      if (rG5.has(Y.slice(1))) return {
        result: !1,
        message: `This tool cannot read binary files. The file appears to be a binary ${Y} file. Please use appropriate tools for binary file analysis.`,
        errorCode: 4
      };
      if (D === 0) {
        if (hK1.has(Y.slice(1))) return {
          result: !1,
          message: "Empty image files cannot be processed.",
          errorCode: 5
        }
      }
      let W = Y === ".ipynb" && process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL;
      if (!hK1.has(Y.slice(1)) && !W) {
        if (D > mK1 && !B && !Q) return {
          result: !1,
          message: Ut1(D),
          meta: {
            fileSize: D
          },
          errorCode: 6
        }
      }
      return {
        result: !0
      }
    },
    async * call({
      file_path: A,
      offset: B = 1,
      limit: Q = void 0
    }, I) {
      let {
        readFileState: G,
        options: {
          isNonInteractiveSession: Z
        },
        fileReadingLimits: D
      } = I, Y = mK1, W = D?.maxTokens ?? Zw2, J = Et1.extname(A).toLowerCase().slice(1), F = qS(A);
      if (J === "ipynb" && process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL) {
        let N = zt1(F);
        G[F] = {
          content: JSON.stringify(N),
          timestamp: Date.now()
        }, I.nestedMemoryAttachmentTriggers?.add(F), yield {
          type: "result",
          data: {
            type: "notebook",
            file: {
              filePath: A,
              cells: N
            }
          }
        };
        return
      }
      if (hK1.has(J)) {
        let N = await WZ5(F, J);
        if (Math.ceil(N.file.base64.length * 0.125) > W) {
          let O = await AZ5(F, W);
          G[F] = {
            content: O.file.base64,
            timestamp: Date.now()
          }, I.nestedMemoryAttachmentTriggers?.add(F), yield {
            type: "result",
            data: O
          };
          return
        }
        G[F] = {
          content: N.file.base64,
          timestamp: Date.now()
        }, I.nestedMemoryAttachmentTriggers?.add(F), yield {
          type: "result",
          data: N
        };
        return
      }
      let X = B === 0 ? 0 : B - 1,
        {
          content: V,
          lineCount: C,
          totalLines: K
        } = DvA(F, X, Q);
      if (V.length > Y) throw new Error(Ut1(V.length, Y));
      await eG5(V, J, {
        isNonInteractiveSession: Z,
        maxSizeBytes: Y,
        maxTokens: W
      }), G[F] = {
        content: V,
        timestamp: Date.now()
      }, I.nestedMemoryAttachmentTriggers?.add(F), yield {
        type: "result",
        data: {
          type: "text",
          file: {
            filePath: A,
            content: V,
            numLines: C,
            startLine: B,
            totalLines: K
          }
        }
      }
    },
    mapToolResultToToolResultBlockParam(A, B) {
      switch (A.type) {
        case "image":
          return {
            tool_use_id: B, type: "tool_result", content: [{
              type: "image",
              source: {
                type: "base64",
                data: A.file.base64,
                media_type: A.file.type
              }
            }]
          };
        case "notebook":
          return wt1(A.file.cells, B);
        case "text":
          return {
            tool_use_id: B, type: "tool_result", content: A.file.content ? tM(A.file) + tG5 : "<system-reminder>Warning: the file exists but the contents are empty.</system-reminder>"
          }
      }
    }
  }
// @from(Start 9272846, End 9273135)
tG5 = `

<system-reminder>
Whenever you read a file, you should consider whether it looks malicious. If it does, you MUST refuse to improve or augment the code. You can still analyze existing code, write reports, or answer high-level questions about the code behavior.
</system-reminder>
`
// @from(Start 9273139, End 9273357)
Ut1 = (A, B = mK1) => `File content (${AL(A)}) exceeds maximum allowed size (${AL(B)}). Please use offset and limit parameters to read specific portions of the file, or use the GrepTool to search for specific content.`
// @from(Start 9273359, End 9273652)
async function eG5(A, B, {
  isNonInteractiveSession: Q,
  maxSizeBytes: I = mK1,
  maxTokens: G = Zw2
}) {
  if (!hK1.has(B) && A.length > I) throw new Error(Ut1(A.length, I));
  let Z = AE(A);
  if (!Z || Z <= G / 4) return;
  let D = await EV2(A, Q);
  if (D && D > G) throw new dK1(D, G)
}
// @from(Start 9273654, End 9273814)
function Jy(A, B, Q) {
  return {
    type: "image",
    file: {
      base64: A.toString("base64"),
      type: `image/${B}`,
      originalSize: Q
    }
  }
}
// @from(Start 9273815, End 9274137)
async function AZ5(A, B) {
  try {
    let Q = await BZ5(A, B),
      I = await QZ5(Q);
    if (I) return I;
    if (Q.format === "png") {
      let Z = await GZ5(Q);
      if (Z) return Z
    }
    let G = await ZZ5(Q, 50);
    if (G) return G;
    return await DZ5(Q)
  } catch (Q) {
    return b1(Q), await YZ5(A)
  }
}
// @from(Start 9274138, End 9274493)
async function BZ5(A, B) {
  let Q = x1().statSync(A),
    I = await Qw2(),
    G = x1().readFileBytesSync(A),
    Z = await I(G).metadata(),
    D = Z.format || "jpeg",
    Y = Math.floor(B / 0.125),
    W = Math.floor(Y * 0.75);
  return {
    imageBuffer: G,
    metadata: Z,
    format: D,
    maxBytes: W,
    originalSize: Q.size,
    sharp: I
  }
}
// @from(Start 9274494, End 9274972)
async function QZ5(A) {
  let B = [1, 0.75, 0.5, 0.25];
  for (let Q of B) {
    let I = Math.round((A.metadata.width || 2000) * Q),
      G = Math.round((A.metadata.height || 2000) * Q),
      Z = A.sharp(A.imageBuffer).resize(I, G, {
        fit: "inside",
        withoutEnlargement: !0
      });
    Z = IZ5(Z, A.format);
    let D = await Z.toBuffer();
    if (D.length <= A.maxBytes) return Jy(D, A.format === "jpg" ? "jpeg" : A.format, A.originalSize)
  }
  return null
}
// @from(Start 9274974, End 9275293)
function IZ5(A, B) {
  switch (B) {
    case "png":
      return A.png({
        compressionLevel: 9,
        palette: !0
      });
    case "jpeg":
    case "jpg":
      return A.jpeg({
        quality: 80
      });
    case "webp":
      return A.webp({
        quality: 80
      });
    default:
      return A
  }
}
// @from(Start 9275294, End 9275589)
async function GZ5(A) {
  let B = await A.sharp(A.imageBuffer).resize(800, 800, {
    fit: "inside",
    withoutEnlargement: !0
  }).png({
    compressionLevel: 9,
    palette: !0,
    colors: 64
  }).toBuffer();
  if (B.length <= A.maxBytes) return Jy(B, "png", A.originalSize);
  return null
}
// @from(Start 9275590, End 9275848)
async function ZZ5(A, B) {
  let Q = await A.sharp(A.imageBuffer).resize(600, 600, {
    fit: "inside",
    withoutEnlargement: !0
  }).jpeg({
    quality: B
  }).toBuffer();
  if (Q.length <= A.maxBytes) return Jy(Q, "jpeg", A.originalSize);
  return null
}
// @from(Start 9275849, End 9276062)
async function DZ5(A) {
  let B = await A.sharp(A.imageBuffer).resize(400, 400, {
    fit: "inside",
    withoutEnlargement: !0
  }).jpeg({
    quality: 20
  }).toBuffer();
  return Jy(B, "jpeg", A.originalSize)
}
// @from(Start 9276063, End 9276372)
async function YZ5(A) {
  let B = await Promise.resolve().then(() => I1(kK1(), 1)),
    I = await (B.default || B)(x1().readFileBytesSync(A)).resize(400, 400, {
      fit: "inside",
      withoutEnlargement: !0
    }).jpeg({
      quality: 20
    }).toBuffer();
  return Jy(I, "jpeg", x1().statSync(A).size)
}
// @from(Start 9276373, End 9276796)
async function WZ5(A, B) {
  try {
    let I = x1().statSync(A).size;
    if (I === 0) throw new Error(`Image file is empty: ${A}`);
    let G = x1().readFileBytesSync(A),
      {
        buffer: Z,
        mediaType: D
      } = await Y11(G, I, B);
    return Jy(Z, D, I)
  } catch (Q) {
    b1(Q);
    let I = x1().statSync(A).size,
      G = B === "jpg" ? "jpeg" : B;
    return Jy(x1().readFileBytesSync(A), G, I)
  }
}
// @from(Start 9276801, End 9276817)
bQ = I1(U1(), 1)
// @from(Start 9276951, End 9276969)
Xw2 = I1(J81(), 1)
// @from(Start 9276975, End 9277269)
FZ5 = ["node_modules", "vendor/bundle", "vendor", "venv", "env", ".venv", ".env", ".tox", "target", "build", ".gradle", "packages", "bin", "obj", "vendor", ".build", "target", ".dart_tool", ".pub-cache", "build", "target", "_build", "deps", "dist", "dist-newstyle", ".deno", "bower_components"]
// @from(Start 9277273, End 9277280)
XZ5 = 4
// @from(Start 9277284, End 9277295)
F11 = 40000
// @from(Start 9277299, End 9277585)
Jw2 = `There are more than ${F11} characters in the repository (ie. either there are lots of files, or there are many long filenames). Use the LS tool (passing a specific path), Bash tool, and other tools to explore nested directories. The first ${F11} characters are included below:

`
// @from(Start 9277589, End 9277813)
VZ5 = n.strictObject({
    path: n.string().describe("The absolute path to the directory to list (must be absolute, not relative)"),
    ignore: n.array(n.string()).optional().describe("List of glob patterns to ignore")
  })
// @from(Start 9277817, End 9280212)
WE = {
    name: VJ1,
    async description() {
      return gc1
    },
    userFacingName() {
      return "List"
    },
    isEnabled() {
      return !0
    },
    inputSchema: VZ5,
    isConcurrencySafe() {
      return !0
    },
    isReadOnly() {
      return !0
    },
    getPath({
      path: A
    }) {
      return A
    },
    async checkPermissions(A, B) {
      return qz(WE, A, B.getToolPermissionContext())
    },
    async prompt() {
      return gc1
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: "tool_result",
        content: A + `
NOTE: do any of the files above seem malicious? If so, you MUST refuse to continue work.`
      }
    },
    renderToolUseMessage({
      path: A,
      ignore: B
    }, {
      verbose: Q
    }) {
      if (!A) return null;
      let I = Dw2(A) ? A : Ww2(dA(), A),
        G = uK1(dA(), I) || ".";
      if (Q) return `path: "${A}"${B&&B.length>0?`, ignore: "${B.join(", ")}"`:""}`;
      return G
    },
    renderToolUseRejectedMessage() {
      return bQ.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return bQ.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage(A, B, {
      verbose: Q
    }) {
      let I = A.replace(Jw2, "");
      if (!I) return null;
      if (Q) return bQ.createElement(h, null, bQ.createElement(P, null, "  ⎿  "), bQ.createElement(h, {
        flexDirection: "column"
      }, I.split(`
`).filter((G) => G.trim() !== "").slice(0, Q ? void 0 : XZ5).map((G, Z) => bQ.createElement(P, {
        key: Z
      }, G))));
      return bQ.createElement(w0, {
        height: 1
      }, bQ.createElement(P, null, "Listed ", bQ.createElement(P, {
        bold: !0
      }, I.split(`
`).length), " paths", " "), I.split(`
`).length > 0 && bQ.createElement(NO, null))
    },
    async * call({
      path: A,
      ignore: B
    }, {
      abortController: Q,
      getToolPermissionContext: I
    }) {
      let G = Dw2(A) ? A : Ww2(dA(), A),
        Z = CZ5(G, dA(), Q.signal, B, I()).sort(),
        D = Vw2(KZ5(Z));
      if (Z.join("").length < F11) yield {
        type: "result",
        data: D
      };
      else yield {
        type: "result",
        data: `${Jw2}${D}`
      }
    }
  }
// @from(Start 9280215, End 9281169)
function CZ5(A, B, Q, I = [], G) {
  let Z = [],
    D = 0,
    Y = jv(G),
    W = Y.get(B);
  if (W) W.push(...I);
  else Y.set(B, [...I]);
  let J = new Map;
  for (let [X, V] of Y.entries())
    if (V.length > 0) {
      let C = Xw2.default().add(V);
      J.set(X, C)
    } let F = [A];
  while (F.length > 0) {
    if (D > F11) return Z;
    if (Q.aborted) return Z;
    let X = F.shift();
    if (Fw2(X, B, J)) continue;
    if (X !== A) {
      let C = uK1(B, X) + gO;
      Z.push(C), D += C.length
    }
    if (FZ5.some((C) => X.endsWith(C + gO) && !A.endsWith(C))) continue;
    let V;
    try {
      V = x1().readdirSync(X)
    } catch (C) {
      b1(C);
      continue
    }
    for (let C of V)
      if (C.isDirectory()) F.push(Yw2(X, C.name) + gO);
      else {
        let K = Yw2(X, C.name);
        if (Fw2(K, B, J)) continue;
        let E = uK1(B, K);
        if (Z.push(E), D += E.length, D > F11) return Z
      }
  }
  return Z
}
// @from(Start 9281171, End 9281730)
function KZ5(A) {
  let B = [];
  for (let Q of A) {
    let I = Q.split(gO),
      G = B,
      Z = "";
    for (let D = 0; D < I.length; D++) {
      let Y = I[D];
      if (!Y) continue;
      Z = Z ? `${Z}${gO}${Y}` : Y;
      let W = D === I.length - 1,
        J = G.find((F) => F.name === Y);
      if (J) G = J.children || [];
      else {
        let F = {
          name: Y,
          path: Z,
          type: W ? "file" : "directory"
        };
        if (!W) F.children = [];
        G.push(F), G = F.children || []
      }
    }
  }
  return B
}
// @from(Start 9281732, End 9281997)
function Vw2(A, B = 0, Q = "") {
  let I = "";
  if (B === 0) I += `- ${dA()}${gO}
`, Q = "  ";
  for (let G of A)
    if (I += `${Q}- ${G.name}${G.type==="directory"?gO:""}
`, G.children && G.children.length > 0) I += Vw2(G.children, B + 1, `${Q}  `);
  return I
}
// @from(Start 9281999, End 9282274)
function Fw2(A, B, Q) {
  if (A !== "." && JZ5(A).startsWith(".")) return !0;
  if (A.includes(`__pycache__${gO}`)) return !0;
  for (let [I, G] of Q.entries()) try {
    let Z = uK1(I ?? B, A);
    if (Z && G.ignores(Z)) return !0
  } catch (Z) {
    b1(Z)
  }
  return !1
}
// @from(Start 9282279, End 9282295)
P3 = I1(U1(), 1)
// @from(Start 9282298, End 9282510)
function $t1() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  }
}
// @from(Start 9282515, End 9282525)
Xy = $t1()
// @from(Start 9282528, End 9282556)
function Ew2(A) {
  Xy = A
}
// @from(Start 9282561, End 9282589)
C11 = {
  exec: () => null
}
// @from(Start 9282592, End 9282917)
function X8(A, B = "") {
  let Q = typeof A === "string" ? A : A.source,
    I = {
      replace: (G, Z) => {
        let D = typeof Z === "string" ? Z : Z.source;
        return D = D.replace(iD.caret, "$1"), Q = Q.replace(G, D), I
      },
      getRegex: () => {
        return new RegExp(Q, B)
      }
    };
  return I
}
// @from(Start 9282922, End 9285279)
iD = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (A) => new RegExp(`^( {0,3}${A})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (A) => new RegExp(`^ {0,${Math.min(3,A-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
    hrRegex: (A) => new RegExp(`^ {0,${Math.min(3,A-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
    fencesBeginRegex: (A) => new RegExp(`^ {0,${Math.min(3,A-1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (A) => new RegExp(`^ {0,${Math.min(3,A-1)}}#`),
    htmlBeginRegex: (A) => new RegExp(`^ {0,${Math.min(3,A-1)}}<(?:[a-z].*>|!--)`, "i")
  }
// @from(Start 9285283, End 9285311)
HZ5 = /^(?:[ \t]*(?:\n|$))+/
// @from(Start 9285315, End 9285376)
zZ5 = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/
// @from(Start 9285380, End 9285495)
wZ5 = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/
// @from(Start 9285499, End 9285573)
w11 = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/
// @from(Start 9285577, End 9285621)
EZ5 = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/
// @from(Start 9285625, End 9285654)
Uw2 = /(?:[*+-]|\d{1,9}[.)])/
// @from(Start 9285658, End 9286044)
Nw2 = X8(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, Uw2).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex()
// @from(Start 9286048, End 9286140)
qt1 = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/
// @from(Start 9286144, End 9286159)
UZ5 = /^[^\n]+/
// @from(Start 9286163, End 9286198)
Mt1 = /(?!\s*\])(?:\\.|[^\[\]\\])+/
// @from(Start 9286202, End 9286435)
NZ5 = X8(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Mt1).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex()
// @from(Start 9286439, End 9286520)
$Z5 = X8(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Uw2).getRegex()
// @from(Start 9286524, End 9286881)
lK1 = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"
// @from(Start 9286885, End 9286922)
Lt1 = /<!--(?:-?>|[\s\S]*?(?:-->|$))/
// @from(Start 9286926, End 9287570)
qZ5 = X8("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Lt1).replace("tag", lK1).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex()
// @from(Start 9287574, End 9287950)
$w2 = X8(qt1).replace("hr", w11).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", lK1).getRegex()
// @from(Start 9287954, End 9288042)
MZ5 = X8(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", $w2).getRegex()
// @from(Start 9288046, End 9288272)
Rt1 = {
    blockquote: MZ5,
    code: zZ5,
    def: NZ5,
    fences: wZ5,
    heading: EZ5,
    hr: w11,
    html: qZ5,
    lheading: Nw2,
    list: $Z5,
    newline: HZ5,
    paragraph: $w2,
    table: C11,
    text: UZ5
  }
// @from(Start 9288276, End 9288801)
Cw2 = X8("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", w11).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", lK1).getRegex()
// @from(Start 9288805, End 9289230)
LZ5 = {
    ...Rt1,
    table: Cw2,
    paragraph: X8(qt1).replace("hr", w11).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Cw2).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", lK1).getRegex()
  }
// @from(Start 9289234, End 9290064)
RZ5 = {
    ...Rt1,
    html: X8(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Lt1).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: C11,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: X8(qt1).replace("hr", w11).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Nw2).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
  }
// @from(Start 9290068, End 9290119)
OZ5 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/
// @from(Start 9290123, End 9290166)
TZ5 = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/
// @from(Start 9290170, End 9290199)
qw2 = /^( {2,}|\\)\n(?!\s*$)/
// @from(Start 9290203, End 9290286)
PZ5 = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/
// @from(Start 9290290, End 9290311)
iK1 = /[\p{P}\p{S}]/u
// @from(Start 9290315, End 9290338)
Ot1 = /[\s\p{P}\p{S}]/u
// @from(Start 9290342, End 9290366)
Mw2 = /[^\s\p{P}\p{S}]/u
// @from(Start 9290370, End 9290447)
SZ5 = X8(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Ot1).getRegex()
// @from(Start 9290451, End 9290477)
Lw2 = /(?!~)[\p{P}\p{S}]/u
// @from(Start 9290481, End 9290509)
_Z5 = /(?!~)[\s\p{P}\p{S}]/u
// @from(Start 9290513, End 9290543)
jZ5 = /(?:[^\s\p{P}\p{S}]|~)/u
// @from(Start 9290547, End 9290632)
yZ5 = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g
// @from(Start 9290636, End 9290705)
Rw2 = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/
// @from(Start 9290709, End 9290761)
kZ5 = X8(Rw2, "u").replace(/punct/g, iK1).getRegex()
// @from(Start 9290765, End 9290817)
xZ5 = X8(Rw2, "u").replace(/punct/g, Lw2).getRegex()
// @from(Start 9290821, End 9291090)
Ow2 = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)"
// @from(Start 9291094, End 9291206)
fZ5 = X8(Ow2, "gu").replace(/notPunctSpace/g, Mw2).replace(/punctSpace/g, Ot1).replace(/punct/g, iK1).getRegex()
// @from(Start 9291210, End 9291322)
vZ5 = X8(Ow2, "gu").replace(/notPunctSpace/g, jZ5).replace(/punctSpace/g, _Z5).replace(/punct/g, Lw2).getRegex()
// @from(Start 9291326, End 9291645)
bZ5 = X8("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Mw2).replace(/punctSpace/g, Ot1).replace(/punct/g, iK1).getRegex()
// @from(Start 9291649, End 9291710)
gZ5 = X8(/\\(punct)/, "gu").replace(/punct/g, iK1).getRegex()
// @from(Start 9291714, End 9291983)
hZ5 = X8(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex()
// @from(Start 9291987, End 9292039)
mZ5 = X8(Lt1).replace("(?:-->|$)", "-->").getRegex()
// @from(Start 9292043, End 9292342)
dZ5 = X8("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", mZ5).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex()
// @from(Start 9292346, End 9292405)
cK1 = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/
// @from(Start 9292409, End 9292635)
uZ5 = X8(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", cK1).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex()
// @from(Start 9292639, End 9292727)
Tw2 = X8(/^!?\[(label)\]\[(ref)\]/).replace("label", cK1).replace("ref", Mt1).getRegex()
// @from(Start 9292731, End 9292795)
Pw2 = X8(/^!?\[(ref)\](?:\[\])?/).replace("ref", Mt1).getRegex()
// @from(Start 9292799, End 9292895)
pZ5 = X8("reflink|nolink(?!\\()", "g").replace("reflink", Tw2).replace("nolink", Pw2).getRegex()
// @from(Start 9292899, End 9293273)
Tt1 = {
    _backpedal: C11,
    anyPunctuation: gZ5,
    autolink: hZ5,
    blockSkip: yZ5,
    br: qw2,
    code: TZ5,
    del: C11,
    emStrongLDelim: kZ5,
    emStrongRDelimAst: fZ5,
    emStrongRDelimUnd: bZ5,
    escape: OZ5,
    link: uZ5,
    nolink: Pw2,
    punctuation: SZ5,
    reflink: Tw2,
    reflinkSearch: pZ5,
    tag: dZ5,
    text: PZ5,
    url: C11
  }
// @from(Start 9293277, End 9293456)
cZ5 = {
    ...Tt1,
    link: X8(/^!?\[(label)\]\((.*?)\)/).replace("label", cK1).getRegex(),
    reflink: X8(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", cK1).getRegex()
  }
// @from(Start 9293460, End 9294126)
Nt1 = {
    ...Tt1,
    emStrongRDelimAst: vZ5,
    emStrongLDelim: xZ5,
    url: X8(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  }
// @from(Start 9294130, End 9294293)
lZ5 = {
    ...Nt1,
    br: X8(qw2).replace("{2,}", "*").getRegex(),
    text: X8(Nt1.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  }
// @from(Start 9294297, End 9294357)
pK1 = {
    normal: Rt1,
    gfm: LZ5,
    pedantic: RZ5
  }
// @from(Start 9294361, End 9294438)
X11 = {
    normal: Tt1,
    gfm: Nt1,
    breaks: lZ5,
    pedantic: cZ5
  }
// @from(Start 9294442, End 9294541)
iZ5 = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }
// @from(Start 9294545, End 9294564)
Kw2 = (A) => iZ5[A]
// @from(Start 9294567, End 9294774)
function JE(A, B) {
  if (B) {
    if (iD.escapeTest.test(A)) return A.replace(iD.escapeReplace, Kw2)
  } else if (iD.escapeTestNoEncode.test(A)) return A.replace(iD.escapeReplaceNoEncode, Kw2);
  return A
}
// @from(Start 9294776, End 9294898)
function Hw2(A) {
  try {
    A = encodeURI(A).replace(iD.percentDecode, "%")
  } catch {
    return null
  }
  return A
}
// @from(Start 9294900, End 9295408)
function zw2(A, B) {
  let Q = A.replace(iD.findPipe, (Z, D, Y) => {
      let W = !1,
        J = D;
      while (--J >= 0 && Y[J] === "\\") W = !W;
      if (W) return "|";
      else return " |"
    }),
    I = Q.split(iD.splitPipe),
    G = 0;
  if (!I[0].trim()) I.shift();
  if (I.length > 0 && !I.at(-1)?.trim()) I.pop();
  if (B)
    if (I.length > B) I.splice(B);
    else
      while (I.length < B) I.push("");
  for (; G < I.length; G++) I[G] = I[G].trim().replace(iD.slashPipe, "|");
  return I
}
// @from(Start 9295410, End 9295593)
function V11(A, B, Q) {
  let I = A.length;
  if (I === 0) return "";
  let G = 0;
  while (G < I)
    if (A.charAt(I - G - 1) === B) G++;
    else break;
  return A.slice(0, I - G)
}
// @from(Start 9295595, End 9295842)
function nZ5(A, B) {
  if (A.indexOf(B[1]) === -1) return -1;
  let Q = 0;
  for (let I = 0; I < A.length; I++)
    if (A[I] === "\\") I++;
    else if (A[I] === B[0]) Q++;
  else if (A[I] === B[1]) {
    if (Q--, Q < 0) return I
  }
  return -1
}
// @from(Start 9295844, End 9296286)
function ww2(A, B, Q, I, G) {
  let Z = B.href,
    D = B.title || null,
    Y = A[1].replace(G.other.outputLinkReplace, "$1");
  if (A[0].charAt(0) !== "!") {
    I.state.inLink = !0;
    let W = {
      type: "link",
      raw: Q,
      href: Z,
      title: D,
      text: Y,
      tokens: I.inlineTokens(Y)
    };
    return I.state.inLink = !1, W
  }
  return {
    type: "image",
    raw: Q,
    href: Z,
    title: D,
    text: Y
  }
}
// @from(Start 9296288, End 9296619)
function aZ5(A, B, Q) {
  let I = A.match(Q.other.indentCodeCompensation);
  if (I === null) return B;
  let G = I[1];
  return B.split(`
`).map((Z) => {
    let D = Z.match(Q.other.beginningSpace);
    if (D === null) return Z;
    let [Y] = D;
    if (Y.length >= G.length) return Z.slice(G.length);
    return Z
  }).join(`
`)
}
// @from(Start 9296620, End 9311708)
class H11 {
  options;
  rules;
  lexer;
  constructor(A) {
    this.options = A || Xy
  }
  space(A) {
    let B = this.rules.block.newline.exec(A);
    if (B && B[0].length > 0) return {
      type: "space",
      raw: B[0]
    }
  }
  code(A) {
    let B = this.rules.block.code.exec(A);
    if (B) {
      let Q = B[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: B[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? V11(Q, `
`) : Q
      }
    }
  }
  fences(A) {
    let B = this.rules.block.fences.exec(A);
    if (B) {
      let Q = B[0],
        I = aZ5(Q, B[3] || "", this.rules);
      return {
        type: "code",
        raw: Q,
        lang: B[2] ? B[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : B[2],
        text: I
      }
    }
  }
  heading(A) {
    let B = this.rules.block.heading.exec(A);
    if (B) {
      let Q = B[2].trim();
      if (this.rules.other.endingHash.test(Q)) {
        let I = V11(Q, "#");
        if (this.options.pedantic) Q = I.trim();
        else if (!I || this.rules.other.endingSpaceChar.test(I)) Q = I.trim()
      }
      return {
        type: "heading",
        raw: B[0],
        depth: B[1].length,
        text: Q,
        tokens: this.lexer.inline(Q)
      }
    }
  }
  hr(A) {
    let B = this.rules.block.hr.exec(A);
    if (B) return {
      type: "hr",
      raw: V11(B[0], `
`)
    }
  }
  blockquote(A) {
    let B = this.rules.block.blockquote.exec(A);
    if (B) {
      let Q = V11(B[0], `
`).split(`
`),
        I = "",
        G = "",
        Z = [];
      while (Q.length > 0) {
        let D = !1,
          Y = [],
          W;
        for (W = 0; W < Q.length; W++)
          if (this.rules.other.blockquoteStart.test(Q[W])) Y.push(Q[W]), D = !0;
          else if (!D) Y.push(Q[W]);
        else break;
        Q = Q.slice(W);
        let J = Y.join(`
`),
          F = J.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        I = I ? `${I}
${J}` : J, G = G ? `${G}
${F}` : F;
        let X = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(F, Z, !0), this.lexer.state.top = X, Q.length === 0) break;
        let V = Z.at(-1);
        if (V?.type === "code") break;
        else if (V?.type === "blockquote") {
          let C = V,
            K = C.raw + `
` + Q.join(`
`),
            E = this.blockquote(K);
          Z[Z.length - 1] = E, I = I.substring(0, I.length - C.raw.length) + E.raw, G = G.substring(0, G.length - C.text.length) + E.text;
          break
        } else if (V?.type === "list") {
          let C = V,
            K = C.raw + `
` + Q.join(`
`),
            E = this.list(K);
          Z[Z.length - 1] = E, I = I.substring(0, I.length - V.raw.length) + E.raw, G = G.substring(0, G.length - C.raw.length) + E.raw, Q = K.substring(Z.at(-1).raw.length).split(`
`);
          continue
        }
      }
      return {
        type: "blockquote",
        raw: I,
        tokens: Z,
        text: G
      }
    }
  }
  list(A) {
    let B = this.rules.block.list.exec(A);
    if (B) {
      let Q = B[1].trim(),
        I = Q.length > 1,
        G = {
          type: "list",
          raw: "",
          ordered: I,
          start: I ? +Q.slice(0, -1) : "",
          loose: !1,
          items: []
        };
      if (Q = I ? `\\d{1,9}\\${Q.slice(-1)}` : `\\${Q}`, this.options.pedantic) Q = I ? Q : "[*+-]";
      let Z = this.rules.other.listItemRegex(Q),
        D = !1;
      while (A) {
        let W = !1,
          J = "",
          F = "";
        if (!(B = Z.exec(A))) break;
        if (this.rules.block.hr.test(A)) break;
        J = B[0], A = A.substring(J.length);
        let X = B[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (q) => " ".repeat(3 * q.length)),
          V = A.split(`
`, 1)[0],
          C = !X.trim(),
          K = 0;
        if (this.options.pedantic) K = 2, F = X.trimStart();
        else if (C) K = B[1].length + 1;
        else K = B[2].search(this.rules.other.nonSpaceChar), K = K > 4 ? 1 : K, F = X.slice(K), K += B[1].length;
        if (C && this.rules.other.blankLine.test(V)) J += V + `
`, A = A.substring(V.length + 1), W = !0;
        if (!W) {
          let q = this.rules.other.nextBulletRegex(K),
            O = this.rules.other.hrRegex(K),
            R = this.rules.other.fencesBeginRegex(K),
            T = this.rules.other.headingBeginRegex(K),
            L = this.rules.other.htmlBeginRegex(K);
          while (A) {
            let _ = A.split(`
`, 1)[0],
              k;
            if (V = _, this.options.pedantic) V = V.replace(this.rules.other.listReplaceNesting, "  "), k = V;
            else k = V.replace(this.rules.other.tabCharGlobal, "    ");
            if (R.test(V)) break;
            if (T.test(V)) break;
            if (L.test(V)) break;
            if (q.test(V)) break;
            if (O.test(V)) break;
            if (k.search(this.rules.other.nonSpaceChar) >= K || !V.trim()) F += `
` + k.slice(K);
            else {
              if (C) break;
              if (X.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) break;
              if (R.test(X)) break;
              if (T.test(X)) break;
              if (O.test(X)) break;
              F += `
` + V
            }
            if (!C && !V.trim()) C = !0;
            J += _ + `
`, A = A.substring(_.length + 1), X = k.slice(K)
          }
        }
        if (!G.loose) {
          if (D) G.loose = !0;
          else if (this.rules.other.doubleBlankLine.test(J)) D = !0
        }
        let E = null,
          N;
        if (this.options.gfm) {
          if (E = this.rules.other.listIsTask.exec(F), E) N = E[0] !== "[ ] ", F = F.replace(this.rules.other.listReplaceTask, "")
        }
        G.items.push({
          type: "list_item",
          raw: J,
          task: !!E,
          checked: N,
          loose: !1,
          text: F,
          tokens: []
        }), G.raw += J
      }
      let Y = G.items.at(-1);
      if (Y) Y.raw = Y.raw.trimEnd(), Y.text = Y.text.trimEnd();
      else return;
      G.raw = G.raw.trimEnd();
      for (let W = 0; W < G.items.length; W++)
        if (this.lexer.state.top = !1, G.items[W].tokens = this.lexer.blockTokens(G.items[W].text, []), !G.loose) {
          let J = G.items[W].tokens.filter((X) => X.type === "space"),
            F = J.length > 0 && J.some((X) => this.rules.other.anyLine.test(X.raw));
          G.loose = F
        } if (G.loose)
        for (let W = 0; W < G.items.length; W++) G.items[W].loose = !0;
      return G
    }
  }
  html(A) {
    let B = this.rules.block.html.exec(A);
    if (B) return {
      type: "html",
      block: !0,
      raw: B[0],
      pre: B[1] === "pre" || B[1] === "script" || B[1] === "style",
      text: B[0]
    }
  }
  def(A) {
    let B = this.rules.block.def.exec(A);
    if (B) {
      let Q = B[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "),
        I = B[2] ? B[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
        G = B[3] ? B[3].substring(1, B[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : B[3];
      return {
        type: "def",
        tag: Q,
        raw: B[0],
        href: I,
        title: G
      }
    }
  }
  table(A) {
    let B = this.rules.block.table.exec(A);
    if (!B) return;
    if (!this.rules.other.tableDelimiter.test(B[2])) return;
    let Q = zw2(B[1]),
      I = B[2].replace(this.rules.other.tableAlignChars, "").split("|"),
      G = B[3]?.trim() ? B[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [],
      Z = {
        type: "table",
        raw: B[0],
        header: [],
        align: [],
        rows: []
      };
    if (Q.length !== I.length) return;
    for (let D of I)
      if (this.rules.other.tableAlignRight.test(D)) Z.align.push("right");
      else if (this.rules.other.tableAlignCenter.test(D)) Z.align.push("center");
    else if (this.rules.other.tableAlignLeft.test(D)) Z.align.push("left");
    else Z.align.push(null);
    for (let D = 0; D < Q.length; D++) Z.header.push({
      text: Q[D],
      tokens: this.lexer.inline(Q[D]),
      header: !0,
      align: Z.align[D]
    });
    for (let D of G) Z.rows.push(zw2(D, Z.header.length).map((Y, W) => {
      return {
        text: Y,
        tokens: this.lexer.inline(Y),
        header: !1,
        align: Z.align[W]
      }
    }));
    return Z
  }
  lheading(A) {
    let B = this.rules.block.lheading.exec(A);
    if (B) return {
      type: "heading",
      raw: B[0],
      depth: B[2].charAt(0) === "=" ? 1 : 2,
      text: B[1],
      tokens: this.lexer.inline(B[1])
    }
  }
  paragraph(A) {
    let B = this.rules.block.paragraph.exec(A);
    if (B) {
      let Q = B[1].charAt(B[1].length - 1) === `
` ? B[1].slice(0, -1) : B[1];
      return {
        type: "paragraph",
        raw: B[0],
        text: Q,
        tokens: this.lexer.inline(Q)
      }
    }
  }
  text(A) {
    let B = this.rules.block.text.exec(A);
    if (B) return {
      type: "text",
      raw: B[0],
      text: B[0],
      tokens: this.lexer.inline(B[0])
    }
  }
  escape(A) {
    let B = this.rules.inline.escape.exec(A);
    if (B) return {
      type: "escape",
      raw: B[0],
      text: B[1]
    }
  }
  tag(A) {
    let B = this.rules.inline.tag.exec(A);
    if (B) {
      if (!this.lexer.state.inLink && this.rules.other.startATag.test(B[0])) this.lexer.state.inLink = !0;
      else if (this.lexer.state.inLink && this.rules.other.endATag.test(B[0])) this.lexer.state.inLink = !1;
      if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(B[0])) this.lexer.state.inRawBlock = !0;
      else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(B[0])) this.lexer.state.inRawBlock = !1;
      return {
        type: "html",
        raw: B[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: B[0]
      }
    }
  }
  link(A) {
    let B = this.rules.inline.link.exec(A);
    if (B) {
      let Q = B[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(Q)) {
        if (!this.rules.other.endAngleBracket.test(Q)) return;
        let Z = V11(Q.slice(0, -1), "\\");
        if ((Q.length - Z.length) % 2 === 0) return
      } else {
        let Z = nZ5(B[2], "()");
        if (Z > -1) {
          let Y = (B[0].indexOf("!") === 0 ? 5 : 4) + B[1].length + Z;
          B[2] = B[2].substring(0, Z), B[0] = B[0].substring(0, Y).trim(), B[3] = ""
        }
      }
      let I = B[2],
        G = "";
      if (this.options.pedantic) {
        let Z = this.rules.other.pedanticHrefTitle.exec(I);
        if (Z) I = Z[1], G = Z[3]
      } else G = B[3] ? B[3].slice(1, -1) : "";
      if (I = I.trim(), this.rules.other.startAngleBracket.test(I))
        if (this.options.pedantic && !this.rules.other.endAngleBracket.test(Q)) I = I.slice(1);
        else I = I.slice(1, -1);
      return ww2(B, {
        href: I ? I.replace(this.rules.inline.anyPunctuation, "$1") : I,
        title: G ? G.replace(this.rules.inline.anyPunctuation, "$1") : G
      }, B[0], this.lexer, this.rules)
    }
  }
  reflink(A, B) {
    let Q;
    if ((Q = this.rules.inline.reflink.exec(A)) || (Q = this.rules.inline.nolink.exec(A))) {
      let I = (Q[2] || Q[1]).replace(this.rules.other.multipleSpaceGlobal, " "),
        G = B[I.toLowerCase()];
      if (!G) {
        let Z = Q[0].charAt(0);
        return {
          type: "text",
          raw: Z,
          text: Z
        }
      }
      return ww2(Q, G, Q[0], this.lexer, this.rules)
    }
  }
  emStrong(A, B, Q = "") {
    let I = this.rules.inline.emStrongLDelim.exec(A);
    if (!I) return;
    if (I[3] && Q.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(I[1] || I[2]) || !Q || this.rules.inline.punctuation.exec(Q)) {
      let Z = [...I[0]].length - 1,
        D, Y, W = Z,
        J = 0,
        F = I[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      F.lastIndex = 0, B = B.slice(-1 * A.length + Z);
      while ((I = F.exec(B)) != null) {
        if (D = I[1] || I[2] || I[3] || I[4] || I[5] || I[6], !D) continue;
        if (Y = [...D].length, I[3] || I[4]) {
          W += Y;
          continue
        } else if (I[5] || I[6]) {
          if (Z % 3 && !((Z + Y) % 3)) {
            J += Y;
            continue
          }
        }
        if (W -= Y, W > 0) continue;
        Y = Math.min(Y, Y + W + J);
        let X = [...I[0]][0].length,
          V = A.slice(0, Z + I.index + X + Y);
        if (Math.min(Z, Y) % 2) {
          let K = V.slice(1, -1);
          return {
            type: "em",
            raw: V,
            text: K,
            tokens: this.lexer.inlineTokens(K)
          }
        }
        let C = V.slice(2, -2);
        return {
          type: "strong",
          raw: V,
          text: C,
          tokens: this.lexer.inlineTokens(C)
        }
      }
    }
  }
  codespan(A) {
    let B = this.rules.inline.code.exec(A);
    if (B) {
      let Q = B[2].replace(this.rules.other.newLineCharGlobal, " "),
        I = this.rules.other.nonSpaceChar.test(Q),
        G = this.rules.other.startingSpaceChar.test(Q) && this.rules.other.endingSpaceChar.test(Q);
      if (I && G) Q = Q.substring(1, Q.length - 1);
      return {
        type: "codespan",
        raw: B[0],
        text: Q
      }
    }
  }
  br(A) {
    let B = this.rules.inline.br.exec(A);
    if (B) return {
      type: "br",
      raw: B[0]
    }
  }
  del(A) {
    let B = this.rules.inline.del.exec(A);
    if (B) return {
      type: "del",
      raw: B[0],
      text: B[2],
      tokens: this.lexer.inlineTokens(B[2])
    }
  }
  autolink(A) {
    let B = this.rules.inline.autolink.exec(A);
    if (B) {
      let Q, I;
      if (B[2] === "@") Q = B[1], I = "mailto:" + Q;
      else Q = B[1], I = Q;
      return {
        type: "link",
        raw: B[0],
        text: Q,
        href: I,
        tokens: [{
          type: "text",
          raw: Q,
          text: Q
        }]
      }
    }
  }
  url(A) {
    let B;
    if (B = this.rules.inline.url.exec(A)) {
      let Q, I;
      if (B[2] === "@") Q = B[0], I = "mailto:" + Q;
      else {
        let G;
        do G = B[0], B[0] = this.rules.inline._backpedal.exec(B[0])?.[0] ?? ""; while (G !== B[0]);
        if (Q = B[0], B[1] === "www.") I = "http://" + B[0];
        else I = B[0]
      }
      return {
        type: "link",
        raw: B[0],
        text: Q,
        href: I,
        tokens: [{
          type: "text",
          raw: Q,
          text: Q
        }]
      }
    }
  }
  inlineText(A) {
    let B = this.rules.inline.text.exec(A);
    if (B) {
      let Q = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: B[0],
        text: B[0],
        escaped: Q
      }
    }
  }
}
// @from(Start 9311709, End 9319978)
class WW {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(A) {
    this.tokens = [], this.tokens.links = Object.create(null), this.options = A || Xy, this.options.tokenizer = this.options.tokenizer || new H11, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    let B = {
      other: iD,
      block: pK1.normal,
      inline: X11.normal
    };
    if (this.options.pedantic) B.block = pK1.pedantic, B.inline = X11.pedantic;
    else if (this.options.gfm)
      if (B.block = pK1.gfm, this.options.breaks) B.inline = X11.breaks;
      else B.inline = X11.gfm;
    this.tokenizer.rules = B
  }
  static get rules() {
    return {
      block: pK1,
      inline: X11
    }
  }
  static lex(A, B) {
    return new WW(B).lex(A)
  }
  static lexInline(A, B) {
    return new WW(B).inlineTokens(A)
  }
  lex(A) {
    A = A.replace(iD.carriageReturn, `
`), this.blockTokens(A, this.tokens);
    for (let B = 0; B < this.inlineQueue.length; B++) {
      let Q = this.inlineQueue[B];
      this.inlineTokens(Q.src, Q.tokens)
    }
    return this.inlineQueue = [], this.tokens
  }
  blockTokens(A, B = [], Q = !1) {
    if (this.options.pedantic) A = A.replace(iD.tabCharGlobal, "    ").replace(iD.spaceLine, "");
    while (A) {
      let I;
      if (this.options.extensions?.block?.some((Z) => {
          if (I = Z.call({
              lexer: this
            }, A, B)) return A = A.substring(I.raw.length), B.push(I), !0;
          return !1
        })) continue;
      if (I = this.tokenizer.space(A)) {
        A = A.substring(I.raw.length);
        let Z = B.at(-1);
        if (I.raw.length === 1 && Z !== void 0) Z.raw += `
`;
        else B.push(I);
        continue
      }
      if (I = this.tokenizer.code(A)) {
        A = A.substring(I.raw.length);
        let Z = B.at(-1);
        if (Z?.type === "paragraph" || Z?.type === "text") Z.raw += `
` + I.raw, Z.text += `
` + I.text, this.inlineQueue.at(-1).src = Z.text;
        else B.push(I);
        continue
      }
      if (I = this.tokenizer.fences(A)) {
        A = A.substring(I.raw.length), B.push(I);
        continue
      }
      if (I = this.tokenizer.heading(A)) {
        A = A.substring(I.raw.length), B.push(I);
        continue
      }
      if (I = this.tokenizer.hr(A)) {
        A = A.substring(I.raw.length), B.push(I);
        continue
      }
      if (I = this.tokenizer.blockquote(A)) {
        A = A.substring(I.raw.length), B.push(I);
        continue
      }
      if (I = this.tokenizer.list(A)) {
        A = A.substring(I.raw.length), B.push(I);
        continue
      }
      if (I = this.tokenizer.html(A)) {
        A = A.substring(I.raw.length), B.push(I);
        continue
      }
      if (I = this.tokenizer.def(A)) {
        A = A.substring(I.raw.length);
        let Z = B.at(-1);
        if (Z?.type === "paragraph" || Z?.type === "text") Z.raw += `
` + I.raw, Z.text += `
` + I.raw, this.inlineQueue.at(-1).src = Z.text;
        else if (!this.tokens.links[I.tag]) this.tokens.links[I.tag] = {
          href: I.href,
          title: I.title
        };
        continue
      }
      if (I = this.tokenizer.table(A)) {
        A = A.substring(I.raw.length), B.push(I);
        continue
      }
      if (I = this.tokenizer.lheading(A)) {
        A = A.substring(I.raw.length), B.push(I);
        continue
      }
      let G = A;
      if (this.options.extensions?.startBlock) {
        let Z = 1 / 0,
          D = A.slice(1),
          Y;
        if (this.options.extensions.startBlock.forEach((W) => {
            if (Y = W.call({
                lexer: this
              }, D), typeof Y === "number" && Y >= 0) Z = Math.min(Z, Y)
          }), Z < 1 / 0 && Z >= 0) G = A.substring(0, Z + 1)
      }
      if (this.state.top && (I = this.tokenizer.paragraph(G))) {
        let Z = B.at(-1);
        if (Q && Z?.type === "paragraph") Z.raw += `
` + I.raw, Z.text += `
` + I.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = Z.text;
        else B.push(I);
        Q = G.length !== A.length, A = A.substring(I.raw.length);
        continue
      }
      if (I = this.tokenizer.text(A)) {
        A = A.substring(I.raw.length);
        let Z = B.at(-1);
        if (Z?.type === "text") Z.raw += `
` + I.raw, Z.text += `
` + I.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = Z.text;
        else B.push(I);
        continue
      }
      if (A) {
        let Z = "Infinite loop on byte: " + A.charCodeAt(0);
        if (this.options.silent) {
          console.error(Z);
          break
        } else throw new Error(Z)
      }
    }
    return this.state.top = !0, B
  }
  inline(A, B = []) {
    return this.inlineQueue.push({
      src: A,
      tokens: B
    }), B
  }
  inlineTokens(A, B = []) {
    let Q = A,
      I = null;
    if (this.tokens.links) {
      let D = Object.keys(this.tokens.links);
      if (D.length > 0) {
        while ((I = this.tokenizer.rules.inline.reflinkSearch.exec(Q)) != null)
          if (D.includes(I[0].slice(I[0].lastIndexOf("[") + 1, -1))) Q = Q.slice(0, I.index) + "[" + "a".repeat(I[0].length - 2) + "]" + Q.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex)
      }
    }
    while ((I = this.tokenizer.rules.inline.blockSkip.exec(Q)) != null) Q = Q.slice(0, I.index) + "[" + "a".repeat(I[0].length - 2) + "]" + Q.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    while ((I = this.tokenizer.rules.inline.anyPunctuation.exec(Q)) != null) Q = Q.slice(0, I.index) + "++" + Q.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let G = !1,
      Z = "";
    while (A) {
      if (!G) Z = "";
      G = !1;
      let D;
      if (this.options.extensions?.inline?.some((W) => {
          if (D = W.call({
              lexer: this
            }, A, B)) return A = A.substring(D.raw.length), B.push(D), !0;
          return !1
        })) continue;
      if (D = this.tokenizer.escape(A)) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      if (D = this.tokenizer.tag(A)) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      if (D = this.tokenizer.link(A)) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      if (D = this.tokenizer.reflink(A, this.tokens.links)) {
        A = A.substring(D.raw.length);
        let W = B.at(-1);
        if (D.type === "text" && W?.type === "text") W.raw += D.raw, W.text += D.text;
        else B.push(D);
        continue
      }
      if (D = this.tokenizer.emStrong(A, Q, Z)) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      if (D = this.tokenizer.codespan(A)) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      if (D = this.tokenizer.br(A)) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      if (D = this.tokenizer.del(A)) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      if (D = this.tokenizer.autolink(A)) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      if (!this.state.inLink && (D = this.tokenizer.url(A))) {
        A = A.substring(D.raw.length), B.push(D);
        continue
      }
      let Y = A;
      if (this.options.extensions?.startInline) {
        let W = 1 / 0,
          J = A.slice(1),
          F;
        if (this.options.extensions.startInline.forEach((X) => {
            if (F = X.call({
                lexer: this
              }, J), typeof F === "number" && F >= 0) W = Math.min(W, F)
          }), W < 1 / 0 && W >= 0) Y = A.substring(0, W + 1)
      }
      if (D = this.tokenizer.inlineText(Y)) {
        if (A = A.substring(D.raw.length), D.raw.slice(-1) !== "_") Z = D.raw.slice(-1);
        G = !0;
        let W = B.at(-1);
        if (W?.type === "text") W.raw += D.raw, W.text += D.text;
        else B.push(D);
        continue
      }
      if (A) {
        let W = "Infinite loop on byte: " + A.charCodeAt(0);
        if (this.options.silent) {
          console.error(W);
          break
        } else throw new Error(W)
      }
    }
    return B
  }
}
// @from(Start 9319979, End 9323711)
class z11 {
  options;
  parser;
  constructor(A) {
    this.options = A || Xy
  }
  space(A) {
    return ""
  }
  code({
    text: A,
    lang: B,
    escaped: Q
  }) {
    let I = (B || "").match(iD.notSpaceStart)?.[0],
      G = A.replace(iD.endingNewline, "") + `
`;
    if (!I) return "<pre><code>" + (Q ? G : JE(G, !0)) + `</code></pre>
`;
    return '<pre><code class="language-' + JE(I) + '">' + (Q ? G : JE(G, !0)) + `</code></pre>
`
  }
  blockquote({
    tokens: A
  }) {
    return `<blockquote>
${this.parser.parse(A)}</blockquote>
`
  }
  html({
    text: A
  }) {
    return A
  }
  heading({
    tokens: A,
    depth: B
  }) {
    return `<h${B}>${this.parser.parseInline(A)}</h${B}>
`
  }
  hr(A) {
    return `<hr>
`
  }
  list(A) {
    let {
      ordered: B,
      start: Q
    } = A, I = "";
    for (let D = 0; D < A.items.length; D++) {
      let Y = A.items[D];
      I += this.listitem(Y)
    }
    let G = B ? "ol" : "ul",
      Z = B && Q !== 1 ? ' start="' + Q + '"' : "";
    return "<" + G + Z + `>
` + I + "</" + G + `>
`
  }
  listitem(A) {
    let B = "";
    if (A.task) {
      let Q = this.checkbox({
        checked: !!A.checked
      });
      if (A.loose)
        if (A.tokens[0]?.type === "paragraph") {
          if (A.tokens[0].text = Q + " " + A.tokens[0].text, A.tokens[0].tokens && A.tokens[0].tokens.length > 0 && A.tokens[0].tokens[0].type === "text") A.tokens[0].tokens[0].text = Q + " " + JE(A.tokens[0].tokens[0].text), A.tokens[0].tokens[0].escaped = !0
        } else A.tokens.unshift({
          type: "text",
          raw: Q + " ",
          text: Q + " ",
          escaped: !0
        });
      else B += Q + " "
    }
    return B += this.parser.parse(A.tokens, !!A.loose), `<li>${B}</li>
`
  }
  checkbox({
    checked: A
  }) {
    return "<input " + (A ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
  }
  paragraph({
    tokens: A
  }) {
    return `<p>${this.parser.parseInline(A)}</p>
`
  }
  table(A) {
    let B = "",
      Q = "";
    for (let G = 0; G < A.header.length; G++) Q += this.tablecell(A.header[G]);
    B += this.tablerow({
      text: Q
    });
    let I = "";
    for (let G = 0; G < A.rows.length; G++) {
      let Z = A.rows[G];
      Q = "";
      for (let D = 0; D < Z.length; D++) Q += this.tablecell(Z[D]);
      I += this.tablerow({
        text: Q
      })
    }
    if (I) I = `<tbody>${I}</tbody>`;
    return `<table>
<thead>
` + B + `</thead>
` + I + `</table>
`
  }
  tablerow({
    text: A
  }) {
    return `<tr>
${A}</tr>
`
  }
  tablecell(A) {
    let B = this.parser.parseInline(A.tokens),
      Q = A.header ? "th" : "td";
    return (A.align ? `<${Q} align="${A.align}">` : `<${Q}>`) + B + `</${Q}>
`
  }
  strong({
    tokens: A
  }) {
    return `<strong>${this.parser.parseInline(A)}</strong>`
  }
  em({
    tokens: A
  }) {
    return `<em>${this.parser.parseInline(A)}</em>`
  }
  codespan({
    text: A
  }) {
    return `<code>${JE(A,!0)}</code>`
  }
  br(A) {
    return "<br>"
  }
  del({
    tokens: A
  }) {
    return `<del>${this.parser.parseInline(A)}</del>`
  }
  link({
    href: A,
    title: B,
    tokens: Q
  }) {
    let I = this.parser.parseInline(Q),
      G = Hw2(A);
    if (G === null) return I;
    A = G;
    let Z = '<a href="' + A + '"';
    if (B) Z += ' title="' + JE(B) + '"';
    return Z += ">" + I + "</a>", Z
  }
  image({
    href: A,
    title: B,
    text: Q
  }) {
    let I = Hw2(A);
    if (I === null) return JE(Q);
    A = I;
    let G = `<img src="${A}" alt="${Q}"`;
    if (B) G += ` title="${JE(B)}"`;
    return G += ">", G
  }
  text(A) {
    return "tokens" in A && A.tokens ? this.parser.parseInline(A.tokens) : ("escaped" in A) && A.escaped ? A.text : JE(A.text)
  }
}
// @from(Start 9323712, End 9324126)
class nK1 {
  strong({
    text: A
  }) {
    return A
  }
  em({
    text: A
  }) {
    return A
  }
  codespan({
    text: A
  }) {
    return A
  }
  del({
    text: A
  }) {
    return A
  }
  html({
    text: A
  }) {
    return A
  }
  text({
    text: A
  }) {
    return A
  }
  link({
    text: A
  }) {
    return "" + A
  }
  image({
    text: A
  }) {
    return "" + A
  }
  br() {
    return ""
  }
}
// @from(Start 9324127, End 9328140)
class XV {
  options;
  renderer;
  textRenderer;
  constructor(A) {
    this.options = A || Xy, this.options.renderer = this.options.renderer || new z11, this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new nK1
  }
  static parse(A, B) {
    return new XV(B).parse(A)
  }
  static parseInline(A, B) {
    return new XV(B).parseInline(A)
  }
  parse(A, B = !0) {
    let Q = "";
    for (let I = 0; I < A.length; I++) {
      let G = A[I];
      if (this.options.extensions?.renderers?.[G.type]) {
        let D = G,
          Y = this.options.extensions.renderers[D.type].call({
            parser: this
          }, D);
        if (Y !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(D.type)) {
          Q += Y || "";
          continue
        }
      }
      let Z = G;
      switch (Z.type) {
        case "space": {
          Q += this.renderer.space(Z);
          continue
        }
        case "hr": {
          Q += this.renderer.hr(Z);
          continue
        }
        case "heading": {
          Q += this.renderer.heading(Z);
          continue
        }
        case "code": {
          Q += this.renderer.code(Z);
          continue
        }
        case "table": {
          Q += this.renderer.table(Z);
          continue
        }
        case "blockquote": {
          Q += this.renderer.blockquote(Z);
          continue
        }
        case "list": {
          Q += this.renderer.list(Z);
          continue
        }
        case "html": {
          Q += this.renderer.html(Z);
          continue
        }
        case "paragraph": {
          Q += this.renderer.paragraph(Z);
          continue
        }
        case "text": {
          let D = Z,
            Y = this.renderer.text(D);
          while (I + 1 < A.length && A[I + 1].type === "text") D = A[++I], Y += `
` + this.renderer.text(D);
          if (B) Q += this.renderer.paragraph({
            type: "paragraph",
            raw: Y,
            text: Y,
            tokens: [{
              type: "text",
              raw: Y,
              text: Y,
              escaped: !0
            }]
          });
          else Q += Y;
          continue
        }
        default: {
          let D = 'Token with "' + Z.type + '" type was not found.';
          if (this.options.silent) return console.error(D), "";
          else throw new Error(D)
        }
      }
    }
    return Q
  }
  parseInline(A, B = this.renderer) {
    let Q = "";
    for (let I = 0; I < A.length; I++) {
      let G = A[I];
      if (this.options.extensions?.renderers?.[G.type]) {
        let D = this.options.extensions.renderers[G.type].call({
          parser: this
        }, G);
        if (D !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(G.type)) {
          Q += D || "";
          continue
        }
      }
      let Z = G;
      switch (Z.type) {
        case "escape": {
          Q += B.text(Z);
          break
        }
        case "html": {
          Q += B.html(Z);
          break
        }
        case "link": {
          Q += B.link(Z);
          break
        }
        case "image": {
          Q += B.image(Z);
          break
        }
        case "strong": {
          Q += B.strong(Z);
          break
        }
        case "em": {
          Q += B.em(Z);
          break
        }
        case "codespan": {
          Q += B.codespan(Z);
          break
        }
        case "br": {
          Q += B.br(Z);
          break
        }
        case "del": {
          Q += B.del(Z);
          break
        }
        case "text": {
          Q += B.text(Z);
          break
        }
        default: {
          let D = 'Token with "' + Z.type + '" type was not found.';
          if (this.options.silent) return console.error(D), "";
          else throw new Error(D)
        }
      }
    }
    return Q
  }
}
// @from(Start 9328141, End 9328567)
class K11 {
  options;
  block;
  constructor(A) {
    this.options = A || Xy
  }
  static passThroughHooks = new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(A) {
    return A
  }
  postprocess(A) {
    return A
  }
  processAllTokens(A) {
    return A
  }
  provideLexer() {
    return this.block ? WW.lex : WW.lexInline
  }
  provideParser() {
    return this.block ? XV.parse : XV.parseInline
  }
}
// @from(Start 9328568, End 9335373)
class Sw2 {
  defaults = $t1();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = XV;
  Renderer = z11;
  TextRenderer = nK1;
  Lexer = WW;
  Tokenizer = H11;
  Hooks = K11;
  constructor(...A) {
    this.use(...A)
  }
  walkTokens(A, B) {
    let Q = [];
    for (let I of A) switch (Q = Q.concat(B.call(this, I)), I.type) {
      case "table": {
        let G = I;
        for (let Z of G.header) Q = Q.concat(this.walkTokens(Z.tokens, B));
        for (let Z of G.rows)
          for (let D of Z) Q = Q.concat(this.walkTokens(D.tokens, B));
        break
      }
      case "list": {
        let G = I;
        Q = Q.concat(this.walkTokens(G.items, B));
        break
      }
      default: {
        let G = I;
        if (this.defaults.extensions?.childTokens?.[G.type]) this.defaults.extensions.childTokens[G.type].forEach((Z) => {
          let D = G[Z].flat(1 / 0);
          Q = Q.concat(this.walkTokens(D, B))
        });
        else if (G.tokens) Q = Q.concat(this.walkTokens(G.tokens, B))
      }
    }
    return Q
  }
  use(...A) {
    let B = this.defaults.extensions || {
      renderers: {},
      childTokens: {}
    };
    return A.forEach((Q) => {
      let I = {
        ...Q
      };
      if (I.async = this.defaults.async || I.async || !1, Q.extensions) Q.extensions.forEach((G) => {
        if (!G.name) throw new Error("extension name required");
        if ("renderer" in G) {
          let Z = B.renderers[G.name];
          if (Z) B.renderers[G.name] = function(...D) {
            let Y = G.renderer.apply(this, D);
            if (Y === !1) Y = Z.apply(this, D);
            return Y
          };
          else B.renderers[G.name] = G.renderer
        }
        if ("tokenizer" in G) {
          if (!G.level || G.level !== "block" && G.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let Z = B[G.level];
          if (Z) Z.unshift(G.tokenizer);
          else B[G.level] = [G.tokenizer];
          if (G.start) {
            if (G.level === "block")
              if (B.startBlock) B.startBlock.push(G.start);
              else B.startBlock = [G.start];
            else if (G.level === "inline")
              if (B.startInline) B.startInline.push(G.start);
              else B.startInline = [G.start]
          }
        }
        if ("childTokens" in G && G.childTokens) B.childTokens[G.name] = G.childTokens
      }), I.extensions = B;
      if (Q.renderer) {
        let G = this.defaults.renderer || new z11(this.defaults);
        for (let Z in Q.renderer) {
          if (!(Z in G)) throw new Error(`renderer '${Z}' does not exist`);
          if (["options", "parser"].includes(Z)) continue;
          let D = Z,
            Y = Q.renderer[D],
            W = G[D];
          G[D] = (...J) => {
            let F = Y.apply(G, J);
            if (F === !1) F = W.apply(G, J);
            return F || ""
          }
        }
        I.renderer = G
      }
      if (Q.tokenizer) {
        let G = this.defaults.tokenizer || new H11(this.defaults);
        for (let Z in Q.tokenizer) {
          if (!(Z in G)) throw new Error(`tokenizer '${Z}' does not exist`);
          if (["options", "rules", "lexer"].includes(Z)) continue;
          let D = Z,
            Y = Q.tokenizer[D],
            W = G[D];
          G[D] = (...J) => {
            let F = Y.apply(G, J);
            if (F === !1) F = W.apply(G, J);
            return F
          }
        }
        I.tokenizer = G
      }
      if (Q.hooks) {
        let G = this.defaults.hooks || new K11;
        for (let Z in Q.hooks) {
          if (!(Z in G)) throw new Error(`hook '${Z}' does not exist`);
          if (["options", "block"].includes(Z)) continue;
          let D = Z,
            Y = Q.hooks[D],
            W = G[D];
          if (K11.passThroughHooks.has(Z)) G[D] = (J) => {
            if (this.defaults.async) return Promise.resolve(Y.call(G, J)).then((X) => {
              return W.call(G, X)
            });
            let F = Y.call(G, J);
            return W.call(G, F)
          };
          else G[D] = (...J) => {
            let F = Y.apply(G, J);
            if (F === !1) F = W.apply(G, J);
            return F
          }
        }
        I.hooks = G
      }
      if (Q.walkTokens) {
        let G = this.defaults.walkTokens,
          Z = Q.walkTokens;
        I.walkTokens = function(D) {
          let Y = [];
          if (Y.push(Z.call(this, D)), G) Y = Y.concat(G.call(this, D));
          return Y
        }
      }
      this.defaults = {
        ...this.defaults,
        ...I
      }
    }), this
  }
  setOptions(A) {
    return this.defaults = {
      ...this.defaults,
      ...A
    }, this
  }
  lexer(A, B) {
    return WW.lex(A, B ?? this.defaults)
  }
  parser(A, B) {
    return XV.parse(A, B ?? this.defaults)
  }
  parseMarkdown(A) {
    return (Q, I) => {
      let G = {
          ...I
        },
        Z = {
          ...this.defaults,
          ...G
        },
        D = this.onError(!!Z.silent, !!Z.async);
      if (this.defaults.async === !0 && G.async === !1) return D(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof Q === "undefined" || Q === null) return D(new Error("marked(): input parameter is undefined or null"));
      if (typeof Q !== "string") return D(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(Q) + ", string expected"));
      if (Z.hooks) Z.hooks.options = Z, Z.hooks.block = A;
      let Y = Z.hooks ? Z.hooks.provideLexer() : A ? WW.lex : WW.lexInline,
        W = Z.hooks ? Z.hooks.provideParser() : A ? XV.parse : XV.parseInline;
      if (Z.async) return Promise.resolve(Z.hooks ? Z.hooks.preprocess(Q) : Q).then((J) => Y(J, Z)).then((J) => Z.hooks ? Z.hooks.processAllTokens(J) : J).then((J) => Z.walkTokens ? Promise.all(this.walkTokens(J, Z.walkTokens)).then(() => J) : J).then((J) => W(J, Z)).then((J) => Z.hooks ? Z.hooks.postprocess(J) : J).catch(D);
      try {
        if (Z.hooks) Q = Z.hooks.preprocess(Q);
        let J = Y(Q, Z);
        if (Z.hooks) J = Z.hooks.processAllTokens(J);
        if (Z.walkTokens) this.walkTokens(J, Z.walkTokens);
        let F = W(J, Z);
        if (Z.hooks) F = Z.hooks.postprocess(F);
        return F
      } catch (J) {
        return D(J)
      }
    }
  }
  onError(A, B) {
    return (Q) => {
      if (Q.message += `
Please report this to https://github.com/markedjs/marked.`, A) {
        let I = "<p>An error occurred:</p><pre>" + JE(Q.message + "", !0) + "</pre>";
        if (B) return Promise.resolve(I);
        return I
      }
      if (B) return Promise.reject(Q);
      throw Q
    }
  }
}
// @from(Start 9335378, End 9335390)
Fy = new Sw2
// @from(Start 9335393, End 9335438)
function r5(A, B) {
  return Fy.parse(A, B)
}
// @from(Start 9336066, End 9336080)
ua8 = XV.parse
// @from(Start 9336084, End 9336096)
pa8 = WW.lex
// @from(Start 9336102, End 9336120)
E11 = I1(Bt1(), 1)
// @from(Start 9336157, End 9336241)
function kK(A, B) {
  return r5.lexer(U11(A)).map((Q) => aD(Q, B)).join("").trim()
}
// @from(Start 9336243, End 9339824)
function aD(A, B, Q = 0, I = null, G = null) {
  switch (A.type) {
    case "blockquote":
      return UA.dim.italic((A.tokens ?? []).map((Z) => aD(Z, B)).join(""));
    case "code":
      if (A.lang && E11.supportsLanguage(A.lang)) return E11.highlight(A.text, {
        language: A.lang
      }) + nD;
      else return b1(new Error(`Language not supported while highlighting code, falling back to markdown: ${A.lang}`)), E11.highlight(A.text, {
        language: "markdown"
      }) + nD;
    case "codespan":
      return V9("permission", B)(A.text);
    case "em":
      return UA.italic((A.tokens ?? []).map((Z) => aD(Z, B)).join(""));
    case "strong":
      return UA.bold((A.tokens ?? []).map((Z) => aD(Z, B)).join(""));
    case "del":
      return UA.strikethrough((A.tokens ?? []).map((Z) => aD(Z, B)).join(""));
    case "heading":
      switch (A.depth) {
        case 1:
          return UA.bold.italic.underline((A.tokens ?? []).map((Z) => aD(Z, B)).join("")) + nD + nD;
        case 2:
          return UA.bold((A.tokens ?? []).map((Z) => aD(Z, B)).join("")) + nD + nD;
        default:
          return UA.bold.dim((A.tokens ?? []).map((Z) => aD(Z, B)).join("")) + nD + nD
      }
    case "hr":
      return "---";
    case "image":
      return A.href;
    case "link":
      return V9("permission", B)(A.href);
    case "list":
      return A.items.map((Z, D) => aD(Z, B, Q, A.ordered ? A.start + D : null, A)).join("");
    case "list_item":
      return (A.tokens ?? []).map((Z) => `${"  ".repeat(Q)}${aD(Z,B,Q+1,I,A)}`).join("");
    case "paragraph":
      return (A.tokens ?? []).map((Z) => aD(Z, B)).join("") + nD;
    case "space":
      return nD;
    case "text":
      if (G?.type === "list_item") return `${I===null?"-":oZ5(Q,I)+"."} ${A.tokens?A.tokens.map((Z)=>aD(Z,B,Q,I,A)).join(""):A.text}${nD}`;
      else return A.text;
    case "table": {
      let D = function(J) {
          return UZ(J?.map((F) => aD(F, B)).join("") ?? "")
        },
        Z = A,
        Y = Z.header.map((J, F) => {
          let X = D(J.tokens).length;
          for (let V of Z.rows) {
            let C = D(V[F]?.tokens).length;
            X = Math.max(X, C)
          }
          return Math.max(X, 3)
        }),
        W = "| ";
      return Z.header.forEach((J, F) => {
        let X = J.tokens?.map((N) => aD(N, B)).join("") ?? "",
          V = D(J.tokens),
          C = Y[F],
          K = Z.align?.[F],
          E;
        if (K === "center") {
          let N = C - V.length,
            q = Math.floor(N / 2),
            O = N - q;
          E = " ".repeat(q) + X + " ".repeat(O)
        } else if (K === "right") {
          let N = C - V.length;
          E = " ".repeat(N) + X
        } else E = X + " ".repeat(C - V.length);
        W += E + " | "
      }), W = W.trimEnd() + nD, W += "|", Y.forEach((J) => {
        let F = "-".repeat(J + 2);
        W += F + "|"
      }), W += nD, Z.rows.forEach((J) => {
        W += "| ", J.forEach((F, X) => {
          let V = F.tokens?.map((q) => aD(q, B)).join("") ?? "",
            C = D(F.tokens),
            K = Y[X],
            E = Z.align?.[X],
            N;
          if (E === "center") {
            let q = K - C.length,
              O = Math.floor(q / 2),
              R = q - O;
            N = " ".repeat(O) + V + " ".repeat(R)
          } else if (E === "right") {
            let q = K - C.length;
            N = " ".repeat(q) + V
          } else N = V + " ".repeat(K - C.length);
          W += N + " | "
        }), W = W.trimEnd() + nD
      }), W + nD
    }
  }
  return ""
}
// @from(Start 9339829, End 9340121)
sZ5 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az"]
// @from(Start 9340125, End 9340433)
rZ5 = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx", "xxi", "xxii", "xxiii", "xxiv", "xxv", "xxvi", "xxvii", "xxviii", "xxix", "xxx", "xxxi", "xxxii", "xxxiii", "xxxiv", "xxxv", "xxxvi", "xxxvii", "xxxviii", "xxxix", "xl"]
// @from(Start 9340436, End 9340641)
function oZ5(A, B) {
  switch (A) {
    case 0:
    case 1:
      return B.toString();
    case 2:
      return sZ5[B - 1];
    case 3:
      return rZ5[B - 1];
    default:
      return B.toString()
  }
}
// @from(Start 9340646, End 9340687)
FE = mA.platform === "darwin" ? "⏺" : "●"
// @from(Start 9340693, End 9341488)
_w2 = `Use this tool when you are in plan mode and have finished presenting your plan and are ready to code. This will prompt the user to exit plan mode. 
IMPORTANT: Only use this tool when the task requires planning the implementation steps of a task that requires writing code. For research tasks where you're gathering information, searching files, reading files or in general trying to understand the codebase - do NOT use this tool.

Eg. 
1. Initial task: "Search for and understand the implementation of vim mode in the codebase" - Do not use the exit plan mode tool because you are not planning the implementation steps of a task.
2. Initial task: "Help me implement yank mode for vim" - Use the exit plan mode tool after you have finished planning the implementation steps of the task.
`
// @from(Start 9341494, End 9341516)
tZ5 = "exit_plan_mode"
// @from(Start 9341520, End 9341708)
eZ5 = n.strictObject({
    plan: n.string().describe("The plan you came up with, that you want to run by the user for approval. Supports markdown. The plan should be pretty concise.")
  })