
// @from(Start 9719489, End 9719843)
function yT2({
  placeholder: A,
  value: B,
  showCursor: Q,
  focus: I,
  terminalFocus: G = !0
}) {
  let Z = void 0;
  if (A) {
    if (Z = UA.dim(A), Q && I && G) Z = A.length > 0 ? UA.inverse(A[0]) + UA.dim(A.slice(1)) : UA.inverse(" ")
  }
  let D = B.length === 0 && Boolean(A);
  return {
    renderedPlaceholder: Z,
    showPlaceholder: D
  }
}
// @from(Start 9719845, End 9720920)
function Iw1({
  inputState: A,
  children: B,
  terminalFocus: Q,
  ...I
}) {
  let {
    onInput: G,
    renderedValue: Z
  } = A, {
    wrappedOnInput: D,
    isPasting: Y
  } = jT2({
    onPaste: I.onPaste,
    onInput: (C, K) => {
      if (Y && K.return) return;
      G(C, K)
    },
    onImagePaste: I.onImagePaste
  }), {
    onIsPastingChange: W
  } = I;
  hA1.default.useEffect(() => {
    if (W) W(Y)
  }, [Y, W]);
  let {
    showPlaceholder: J,
    renderedPlaceholder: F
  } = yT2({
    placeholder: I.placeholder,
    value: I.value,
    showCursor: I.showCursor,
    focus: I.focus,
    terminalFocus: Q
  });
  Z0(D, {
    isActive: I.focus
  });
  let X = I.value && I.value.trim().indexOf(" ") === -1 || I.value && I.value.endsWith(" "),
    V = Boolean(I.argumentHint && I.value && X && I.value.startsWith("/"));
  return hA1.default.createElement(h, null, hA1.default.createElement(P, {
    wrap: "truncate-end"
  }, J ? F : Z, V && hA1.default.createElement(P, {
    color: "secondaryText"
  }, I.value?.endsWith(" ") ? "" : " ", I.argumentHint), B))
}
// @from(Start 9720925, End 9720941)
c$ = I1(U1(), 1)
// @from(Start 9720947, End 9720955)
tAA = !0
// @from(Start 9720959, End 9720971)
yy = new Set
// @from(Start 9720974, End 9721144)
function eAA(A) {
  let B = A.toString();
  if (B.includes("\x1B[I")) tAA = !0, yy.forEach((Q) => Q(!0));
  if (B.includes("\x1B[O")) tAA = !1, yy.forEach((Q) => Q(!1))
}
// @from(Start 9721146, End 9721314)
function kT2() {
  let A = () => {
    if (yy.size === 0) return;
    process.stdin.off("data", eAA), process.stdout.write("\x1B[?1004l")
  };
  process.on("exit", A)
}
// @from(Start 9721316, End 9722091)
function xT2() {
  let [A, B] = c$.useState(tAA), [Q, I] = c$.useState(!1), G = c$.useCallback((D) => {
    B(D), I(!1)
  }, []);
  c$.useEffect(() => {
    if (!process.stdout.isTTY) return;
    if (yy.add(G), yy.size === 1) process.stdout.write("\x1B[?1004h"), process.stdin.on("data", eAA);
    return () => {
      if (yy.delete(G), yy.size === 0) process.stdin.off("data", eAA), process.stdout.write("\x1B[?1004l")
    }
  }, [G]), c$.useEffect(() => {
    if (!A && Q) E1("tengu_typing_without_terminal_focus", {})
  }, [A, Q]);
  let Z = c$.useCallback((D, Y) => {
    if (D === "\x1B[I" || D === "\x1B[O" || D === "[I" || D === "[O") return "";
    if ((D || Y) && !A) I(!0);
    return D
  }, [A]);
  return {
    isFocused: A || Q,
    filterFocusSequences: Z
  }
}
// @from(Start 9722093, End 9723026)
function j3(A) {
  let [B] = q9(), {
    isFocused: Q,
    filterFocusSequences: I
  } = xT2(), G = Bw1({
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
    invert: Q ? UA.inverse : (Z) => Z,
    themeText: V9("text", B),
    columns: A.columns,
    onImagePaste: A.onImagePaste,
    disableCursorMovementForUpDownKeys: A.disableCursorMovementForUpDownKeys,
    externalOffset: A.cursorOffset,
    onOffsetChange: A.onChangeCursorOffset,
    inputFilter: I
  });
  return fT2.default.createElement(Iw1, {
    inputState: G,
    terminalFocus: Q,
    ...A
  })
}
// @from(Start 9723027, End 9723299)
async function Ap(A) {
  let B = process.env.BROWSER,
    Q = process.platform,
    I = B ? B : Q === "win32" ? "start" : Q === "darwin" ? "open" : "xdg-open";
  try {
    let {
      code: G
    } = await u0(I, [A]);
    return G === 0
  } catch (G) {
    return !1
  }
}
// @from(Start 9723304, End 9723314)
tz5 = 7250
// @from(Start 9723317, End 9724419)
function Bp(A) {
  let B = A;
  return B = B.replace(/"(sk-ant[^\s"']{24,})"/g, '"[REDACTED_API_KEY]"'), B = B.replace(/(?<![A-Za-z0-9"'])(sk-ant-?[A-Za-z0-9_-]{10,})(?![A-Za-z0-9"'])/g, "[REDACTED_API_KEY]"), B = B.replace(/AWS key: "(AWS[A-Z0-9]{20,})"/g, 'AWS key: "[REDACTED_AWS_KEY]"'), B = B.replace(/(AKIA[A-Z0-9]{16})/g, "[REDACTED_AWS_KEY]"), B = B.replace(/(?<![A-Za-z0-9])(AIza[A-Za-z0-9_-]{35})(?![A-Za-z0-9])/g, "[REDACTED_GCP_KEY]"), B = B.replace(/(?<![A-Za-z0-9])([a-z0-9-]+@[a-z0-9-]+\.iam\.gserviceaccount\.com)(?![A-Za-z0-9])/g, "[REDACTED_GCP_SERVICE_ACCOUNT]"), B = B.replace(/(["']?x-api-key["']?\s*[:=]\s*["']?)[^"',\s)}\]]+/gi, "$1[REDACTED_API_KEY]"), B = B.replace(/(["']?authorization["']?\s*[:=]\s*["']?(bearer\s+)?)[^"',\s)}\]]+/gi, "$1[REDACTED_TOKEN]"), B = B.replace(/(AWS[_-][A-Za-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, "$1[REDACTED_AWS_VALUE]"), B = B.replace(/(GOOGLE[_-][A-Za-z0-9_]+\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, "$1[REDACTED_GCP_VALUE]"), B = B.replace(/((API[-_]?KEY|TOKEN|SECRET|PASSWORD)\s*[=:]\s*)["']?[^"',\s)}\]]+["']?/gi, "$1[REDACTED]"), B
}
// @from(Start 9724421, End 9724582)
function vT2() {
  return UZ0().map((A) => {
    let B = {
      ...A
    };
    if (B && typeof B.error === "string") B.error = Bp(B.error);
    return B
  })
}
// @from(Start 9724587, End 9724643)
bT2 = "https://github.com/anthropics/claude-code/issues"
// @from(Start 9724646, End 9730217)
function hT2({
  messages: A,
  onDone: B
}) {
  let [Q, I] = UV.useState("userInput"), [G, Z] = UV.useState(0), [D, Y] = UV.useState(""), [W, J] = UV.useState(null), [F, X] = UV.useState(null), [V, C] = UV.useState({
    isGit: !1,
    gitState: null
  }), [K, E] = UV.useState(null), N = c9().columns - 4;
  UV.useEffect(() => {
    async function R() {
      let T = await jz(),
        L = null;
      if (T) L = await SmA();
      C({
        isGit: T,
        gitState: L
      })
    }
    R()
  }, []);
  let q = Y2(),
    O = UV.useCallback(async () => {
      I("submitting"), X(null), J(null);
      let R = vT2(),
        T = {
          message_count: A.length,
          datetime: new Date().toISOString(),
          description: D,
          platform: mA.platform,
          gitRepo: V.isGit,
          terminal: mA.terminal,
          version: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.34"
          }.VERSION,
          transcript: JW(A),
          errors: R
        },
        [L, _] = await Promise.all([Bw5(T), Aw5(D)]);
      if (E(_), L.success) {
        if (L.feedbackId) J(L.feedbackId), E1("tengu_bug_report_submitted", {
          feedback_id: L.feedbackId
        });
        I("done")
      } else {
        if (L.isZdrOrg) X("Feedback collection is not available for organizations with custom data retention policies.");
        else X("Could not submit feedback. Please try again later.");
        I("done")
      }
    }, [D, V.isGit, A]);
  return Z0((R, T) => {
    if (Q === "done") {
      if (T.return && K) {
        let L = ez5(W ?? "", K, D, vT2());
        Ap(L)
      }
      if (F) B("Error submitting bug report");
      else B("Bug report submitted");
      return
    }
    if (F) {
      B("Error submitting bug report");
      return
    }
    if (T.escape) {
      B("Bug report cancelled");
      return
    }
    if (Q === "consent" && (T.return || R === " ")) O()
  }), k0.createElement(k0.Fragment, null, k0.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "permission",
    paddingX: 1,
    paddingBottom: 1,
    gap: 1
  }, k0.createElement(P, {
    bold: !0,
    color: "permission"
  }, "Submit Bug Report"), Q === "userInput" && k0.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, k0.createElement(P, null, "Describe the issue below:"), k0.createElement(j3, {
    value: D,
    onChange: Y,
    columns: N,
    onSubmit: () => I("consent"),
    onExitMessage: () => B("Bug report cancelled"),
    cursorOffset: G,
    onChangeCursorOffset: Z
  }), F && k0.createElement(h, {
    flexDirection: "column",
    gap: 1
  }, k0.createElement(P, {
    color: "error"
  }, F), k0.createElement(P, {
    dimColor: !0
  }, "Press any key to close"))), Q === "consent" && k0.createElement(h, {
    flexDirection: "column"
  }, k0.createElement(P, null, "This report will include:"), k0.createElement(h, {
    marginLeft: 2,
    flexDirection: "column"
  }, k0.createElement(P, null, "- Your bug description: ", k0.createElement(P, {
    dimColor: !0
  }, D)), k0.createElement(P, null, "- Environment info:", " ", k0.createElement(P, {
    dimColor: !0
  }, mA.platform, ", ", mA.terminal, ", v", {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.34"
  }.VERSION)), V.gitState && k0.createElement(P, null, "- Git repo metadata:", " ", k0.createElement(P, {
    dimColor: !0
  }, V.gitState.branchName, V.gitState.commitHash ? `, ${V.gitState.commitHash.slice(0,7)}` : "", V.gitState.remoteUrl ? ` @ ${V.gitState.remoteUrl}` : "", !V.gitState.isHeadOnRemote && ", not synced", !V.gitState.isClean && ", has local changes")), k0.createElement(P, null, "- Current session transcript")), k0.createElement(h, {
    marginTop: 1
  }, k0.createElement(P, {
    wrap: "wrap",
    dimColor: !0
  }, "We will use your feedback to debug related issues or to improve", " ", m0, "'s functionality (eg. to reduce the risk of bugs occurring in the future). Anthropic will not train generative models using feedback from ", m0, ".")), k0.createElement(h, {
    marginTop: 1
  }, k0.createElement(P, null, "Press ", k0.createElement(P, {
    bold: !0
  }, "Enter"), " to confirm and submit."))), Q === "submitting" && k0.createElement(h, {
    flexDirection: "row",
    gap: 1
  }, k0.createElement(P, null, "Submitting report…")), Q === "done" && k0.createElement(h, {
    flexDirection: "column"
  }, F ? k0.createElement(P, {
    color: "error"
  }, F) : k0.createElement(P, {
    color: "success"
  }, "Thank you for your report!"), W && k0.createElement(P, {
    dimColor: !0
  }, "Feedback ID: ", W), k0.createElement(h, {
    marginTop: 1
  }, k0.createElement(P, null, "Press "), k0.createElement(P, {
    bold: !0
  }, "Enter "), k0.createElement(P, null, "to also create a GitHub issue, or any other key to close.")))), k0.createElement(h, {
    marginLeft: 1
  }, k0.createElement(P, {
    dimColor: !0
  }, q.pending ? k0.createElement(k0.Fragment, null, "Press ", q.keyName, " again to exit") : Q === "userInput" ? k0.createElement(k0.Fragment, null, "Enter to continue · Esc to cancel") : Q === "consent" ? k0.createElement(k0.Fragment, null, "Enter to submit · Esc to cancel") : null)))
}
// @from(Start 9730219, End 9731199)
function ez5(A, B, Q, I) {
  let G = Bp(B),
    Z = Bp(Q),
    D = encodeURIComponent(`**Bug Description**
${Z}

**Environment Info**
- Platform: ${mA.platform}
- Terminal: ${mA.terminal}
- Version: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION||"unknown"}
- Feedback ID: ${A}

**Errors**
\`\`\`json
`),
    Y = encodeURIComponent("\n```\n"),
    W = encodeURIComponent(`
**Note:** Error logs were truncated.
`),
    J = JSON.stringify(I),
    F = encodeURIComponent(J),
    X = `${bT2}/new?title=${encodeURIComponent(G)}&labels=user-reported,bug&body=`,
    V = tz5 - X.length - D.length - Y.length - W.length,
    C = "";
  if (F.length <= V) C = D + F + Y;
  else {
    let K = F.substring(0, V);
    C = D + K + Y + W
  }
  return `${bT2}/new?title=${encodeURIComponent(G)}&body=${C}&labels=user-reported,bug`
}
// @from(Start 9731200, End 9732179)
async function Aw5(A) {
  try {
    let B = await cZ({
        systemPrompt: ["Generate a concise, technical issue title (max 80 chars) for a GitHub issue based on this bug report. The title should:", "- Be specific and descriptive of the actual problem", "- Use technical terminology appropriate for a software issue", '- For error messages, extract the key error (e.g., "Missing Tool Result Block" rather than the full message)', '- Start with a noun or verb (not "Bug:" or "Issue:")', "- Be direct and clear for developers to understand the problem", '- If you cannot determine a clear issue, use "Bug Report: [brief description]"'],
        userPrompt: A,
        isNonInteractiveSession: !1,
        promptCategory: "bug_title"
      }),
      Q = B.message.content[0]?.type === "text" ? B.message.content[0].text : "Bug Report";
    if (Q.startsWith(bZ)) return gT2(A);
    return Q
  } catch (B) {
    return b1(B instanceof Error ? B : new Error(String(B))), gT2(A)
  }
}
// @from(Start 9732181, End 9732458)
function gT2(A) {
  let B = A.split(`
`)[0] || "";
  if (B.length <= 60 && B.length > 5) return B;
  let Q = B.slice(0, 60);
  if (B.length > 60) {
    let I = Q.lastIndexOf(" ");
    if (I > 30) Q = Q.slice(0, I);
    Q += "..."
  }
  return Q.length < 10 ? "Bug Report" : Q
}
// @from(Start 9732460, End 9732658)
function Gw1(A) {
  if (A instanceof Error) {
    let B = new Error(Bp(A.message));
    if (A.stack) B.stack = Bp(A.stack);
    b1(B)
  } else {
    let B = Bp(String(A));
    b1(new Error(B))
  }
}
// @from(Start 9732659, End 9733833)
async function Bw5(A) {
  try {
    let B = CY1();
    if (B.error) return {
      success: !1
    };
    let Q = {
        "Content-Type": "application/json",
        "User-Agent": MR(),
        ...B.headers
      },
      I = await P4.post("https://api.anthropic.com/api/claude_cli_feedback", {
        content: JSON.stringify(A)
      }, {
        headers: Q
      });
    if (I.status === 200) {
      let G = I.data;
      if (G?.feedback_id) return {
        success: !0,
        feedbackId: G.feedback_id
      };
      return Gw1(new Error("Failed to submit feedback: request did not return feedback_id")), {
        success: !1
      }
    }
    return Gw1(new Error("Failed to submit feedback:" + I.status)), {
      success: !1
    }
  } catch (B) {
    if (P4.isAxiosError(B) && B.response?.status === 403) {
      let Q = B.response.data;
      if (Q?.error?.type === "permission_error" && Q?.error?.message?.includes("Custom data retention settings")) return Gw1(new Error("Cannot submit feedback because custom data retention settings are enabled")), {
        success: !1,
        isZdrOrg: !0
      }
    }
    return Gw1(B), {
      success: !1
    }
  }
}
// @from(Start 9733838, End 9733855)
A0A = I1(U1(), 1)
// @from(Start 9733861, End 9734356)
Qw5 = {
    type: "local-jsx",
    name: "bug",
    description: `Submit feedback about ${m0}`,
    isEnabled: () => !(process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_BUG_COMMAND || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC),
    isHidden: !1,
    async call(A, {
      messages: B
    }) {
      return A0A.createElement(hT2, {
        messages: B,
        onDone: A
      })
    },
    userFacingName() {
      return "bug"
    }
  }
// @from(Start 9734360, End 9734369)
mT2 = Qw5
// @from(Start 9734375, End 9734386)
dT2 = 40000
// @from(Start 9734390, End 9735620)
Iw5 = L0(async () => {
    if (!await jz()) return null;
    try {
      let [A, B, Q, I] = await Promise.all([u0("git", ["branch", "--show-current"], {
        preserveOutputOnError: !1
      }).then(({
        stdout: Z
      }) => Z.trim()), u0("git", ["rev-parse", "--abbrev-ref", "origin/HEAD"], {
        preserveOutputOnError: !1
      }).then(({
        stdout: Z
      }) => Z.replace("origin/", "").trim()), u0("git", ["status", "--short"], {
        preserveOutputOnError: !1
      }).then(({
        stdout: Z
      }) => Z.trim()), u0("git", ["log", "--oneline", "-n", "5"], {
        preserveOutputOnError: !1
      }).then(({
        stdout: Z
      }) => Z.trim())]), G = Q.length > dT2 ? Q.substring(0, dT2) + `
... (truncated because it exceeds 40k characters. If you need more information, run "git status" using BashTool)` : Q;
      return `This is the git status at the start of the conversation. Note that this status is a snapshot in time, and will not update during the conversation.
Current branch: ${A}

Main branch (you will usually use this for PRs): ${B}

Status:
${G||"(clean)"}

Recent commits:
${I}`
    } catch (A) {
      return b1(A instanceof Error ? A : new Error(String(A))), null
    }
  })
// @from(Start 9735624, End 9735743)
RE = L0(async () => {
    let A = await Iw5();
    return {
      ...A ? {
        gitStatus: A
      } : {}
    }
  })
// @from(Start 9735747, End 9736236)
qW = L0(async () => {
    let A = WU2();
    return {
      ...A ? {
        claudeMd: A
      } : {},
      "important-instruction-reminders": `Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
`
    }
  })
// @from(Start 9736239, End 9736266)
function uT2() {
  return
}
// @from(Start 9736268, End 9736416)
function B0A(A) {
  if (process.platform === "win32") process.title = A ? `✳ ${A}` : A;
  else process.stdout.write(`\x1B]0;${A?`✳ ${A}`:""}\x07`)
}
// @from(Start 9736417, End 9737253)
async function pT2(A) {
  if (A.startsWith("<local-command-stdout>")) return;
  try {
    let Q = (await cZ({
        systemPrompt: ["Analyze if this message indicates a new conversation topic. If it does, extract a 2-3 word title that captures the new topic. Format your response as a JSON object with two fields: 'isNewTopic' (boolean) and 'title' (string, or null if isNewTopic is false). Only include these fields, no other text."],
        userPrompt: A,
        enablePromptCaching: !1,
        isNonInteractiveSession: !1,
        promptCategory: "terminal_title"
      })).message.content.filter((G) => G.type === "text").map((G) => G.text).join(""),
      I = Z8(Q);
    if (I && typeof I === "object" && "isNewTopic" in I && "title" in I) {
      if (I.isNewTopic && I.title) B0A(I.title)
    }
  } catch (B) {
    b1(B)
  }
}
// @from(Start 9737255, End 9737381)
function D3() {
  return new Promise((A) => {
    process.stdout.write("\x1B[2J\x1B[3J\x1B[H", () => {
      A()
    })
  })
}
// @from(Start 9737382, End 9737577)
async function cT2({
  setMessages: A,
  readFileState: B
}) {
  await D3(), A([]), qW.cache.clear?.(), dG.cache.clear?.(), EX(e9()), Object.keys(B).forEach((Q) => {
    delete B[Q]
  }), c2A()
}
// @from(Start 9737582, End 9737845)
Gw5 = {
    type: "local",
    name: "clear",
    description: "Clear conversation history and free up context",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, B) {
      return cT2(B), ""
    },
    userFacingName() {
      return "clear"
    }
  }
// @from(Start 9737849, End 9737858)
lT2 = Gw5
// @from(Start 9737864, End 9737881)
Zw5 = I1(U1(), 1)
// @from(Start 9737887, End 9738848)
Dw5 = {
    type: "local",
    name: "compact",
    description: "Clear conversation history but keep a summary in context. Optional: /compact [instructions for summarization]",
    isEnabled: () => !0,
    isHidden: !1,
    argumentHint: "<optional custom summarization instructions>",
    async call(A, B) {
      let {
        abortController: Q,
        messages: I
      } = B;
      if (I.length === 0) throw new Error("No messages to compact");
      let G = A.trim();
      try {
        return await qH1(I, B, !1, G), qW.cache.clear?.(), dG.cache.clear?.(), "Compacted. ctrl+r to see full summary"
      } catch (Z) {
        if (Q.signal.aborted) throw new Error("Compaction canceled.");
        else if (Z instanceof Error && Z.message === v11) throw new Error(v11);
        else throw b1(Z instanceof Error ? Z : new Error(String(Z))), new Error(`Error during compaction: ${Z}`)
      }
    },
    userFacingName() {
      return "compact"
    }
  }
// @from(Start 9738852, End 9738861)
iT2 = Dw5
// @from(Start 9738867, End 9738883)
u9 = I1(U1(), 1)
// @from(Start 9738887, End 9738904)
mA1 = I1(U1(), 1)
// @from(Start 9738910, End 9738926)
y4 = I1(U1(), 1)
// @from(Start 9738929, End 9741226)
function Zw1({
  onThemeSelect: A,
  showIntroText: B = !1,
  helpText: Q = "",
  showHelpTextBelow: I = !1,
  hideEscToCancel: G = !1,
  skipExitHandling: Z = !1
}) {
  let [D, Y] = q9(), W = Y2(Z ? () => {} : void 0), F = y4.createElement(h, {
    flexDirection: "column",
    gap: 1,
    paddingLeft: 1
  }, B && y4.createElement(P, null, "Let's get started."), y4.createElement(h, {
    flexDirection: "column"
  }, y4.createElement(P, {
    bold: !0
  }, "Choose the text style that looks best with your terminal:"), Q && !I && y4.createElement(P, {
    dimColor: !0
  }, Q)), y4.createElement(p0, {
    options: [{
      label: "Dark mode",
      value: "dark"
    }, {
      label: "Light mode",
      value: "light"
    }, {
      label: "Dark mode (colorblind-friendly)",
      value: "dark-daltonized"
    }, {
      label: "Light mode (colorblind-friendly)",
      value: "light-daltonized"
    }, {
      label: "Dark mode (ANSI colors only)",
      value: "dark-ansi"
    }, {
      label: "Light mode (ANSI colors only)",
      value: "light-ansi"
    }],
    onFocus: (X) => {
      Y(X)
    },
    onChange: A,
    onCancel: Z ? () => {} : async () => {
      await qI(0)
    },
    visibleOptionCount: 6,
    defaultValue: D
  }), y4.createElement(h, {
    flexDirection: "column",
    paddingTop: 1
  }, y4.createElement(P, {
    bold: !0
  }, "Preview"), y4.createElement(h, {
    paddingLeft: 1,
    marginRight: 1,
    borderStyle: "round",
    flexDirection: "column"
  }, y4.createElement(XW, {
    patch: {
      oldStart: 1,
      newStart: 1,
      oldLines: 3,
      newLines: 3,
      lines: ["function greet() {", '-  console.log("Hello, World!");', '+  console.log("Hello, Claude!");', "}"]
    },
    dim: !1
  }))));
  if (!B) return y4.createElement(y4.Fragment, null, y4.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    paddingX: 1,
    marginTop: 1
  }, F), I && Q && y4.createElement(h, {
    marginLeft: 3,
    marginTop: 1
  }, y4.createElement(P, {
    dimColor: !0
  }, Q)), !G && y4.createElement(h, {
    marginLeft: 3
  }, y4.createElement(P, {
    dimColor: !0
  }, W.pending ? y4.createElement(y4.Fragment, null, "Press ", W.keyName, " again to exit") : y4.createElement(y4.Fragment, null, "Esc to cancel"))));
  return F
}
// @from(Start 9741231, End 9741247)
_8 = I1(U1(), 1)
// @from(Start 9741251, End 9741268)
nT2 = I1(U1(), 1)
// @from(Start 9741274, End 9741299)
Q0A = "__NO_PREFERENCE__"
// @from(Start 9741302, End 9742645)
function Dw1({
  initial: A,
  onSelect: B
}) {
  let Q = A === null ? Q0A : A,
    [I, G] = nT2.useState(Q),
    Z = BZ0(),
    D = Y2();
  return _8.createElement(h, {
    flexDirection: "column"
  }, _8.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "remember",
    paddingX: 2,
    paddingY: 1,
    width: "100%"
  }, _8.createElement(h, {
    marginBottom: 1,
    flexDirection: "column"
  }, _8.createElement(P, {
    color: "remember",
    bold: !0
  }, "Select Model"), _8.createElement(P, {
    dimColor: !0
  }, "Switch between Claude models. Applies to this session and future Claude Code sessions. For custom model names, specify with --model.")), _8.createElement(h, {
    flexDirection: "column",
    paddingX: 1
  }, _8.createElement(p0, {
    defaultValue: I,
    focusValue: Z.some((Y) => Y.value === I) ? I : Z[0]?.value ?? void 0,
    options: Z.map((Y) => ({
      ...Y,
      value: Y.value === null ? Q0A : Y.value
    })),
    onFocus: (Y) => G(Y),
    onChange: (Y) => B(Y === Q0A ? null : Y),
    onCancel: () => {}
  }))), _8.createElement(h, {
    paddingX: 1
  }, _8.createElement(P, {
    dimColor: !0
  }, D.pending ? _8.createElement(_8.Fragment, null, "Press ", D.keyName, " again to exit") : _8.createElement(_8.Fragment, null, "Enter to confirm · Esc to exit"))))
}
// @from(Start 9742650, End 9742666)
rZ = I1(U1(), 1)
// @from(Start 9742669, End 9744631)
function Yw1({
  onDone: A
}) {
  rZ.default.useEffect(() => {
    E1("claude_md_includes_dialog_shown", {})
  }, []);

  function B(I) {
    let G = m9();
    if (I === "no") E1("claude_md_external_includes_dialog_declined", {}), B5({
      ...G,
      hasClaudeMdExternalIncludesApproved: !1,
      hasClaudeMdExternalIncludesWarningShown: !0
    });
    else E1("claude_md_external_includes_dialog_accepted", {}), B5({
      ...G,
      hasClaudeMdExternalIncludesApproved: !0,
      hasClaudeMdExternalIncludesWarningShown: !0
    });
    A()
  }
  let Q = Y2();
  return Z0((I, G) => {
    if (G.escape) {
      B("no");
      return
    }
  }), rZ.default.createElement(rZ.default.Fragment, null, rZ.default.createElement(h, {
    flexDirection: "column",
    gap: 1,
    padding: 1,
    borderStyle: "round",
    borderColor: "warning"
  }, rZ.default.createElement(P, {
    bold: !0,
    color: "warning"
  }, "Allow external CLAUDE.md file imports?"), rZ.default.createElement(P, null, "This project's CLAUDE.md imports files outside the current working directory. Never allow this for third-party repositories."), rZ.default.createElement(P, {
    dimColor: !0
  }, "Important: Only use ", m0, " with files you trust. Accessing untrusted files may pose security risks", " ", rZ.default.createElement(kQ, {
    url: "https://docs.anthropic.com/s/claude-code-security"
  }), " "), rZ.default.createElement(p0, {
    options: [{
      label: "Yes, allow external imports",
      value: "yes"
    }, {
      label: "No, disable external imports",
      value: "no"
    }],
    onChange: (I) => B(I),
    onCancel: () => B("no")
  })), rZ.default.createElement(h, {
    marginLeft: 3
  }, rZ.default.createElement(P, {
    dimColor: !0
  }, Q.pending ? rZ.default.createElement(rZ.default.Fragment, null, "Press ", Q.keyName, " again to exit") : rZ.default.createElement(rZ.default.Fragment, null, "Enter to confirm · Esc to disable external includes"))))
}
// @from(Start 9744633, End 9753533)
function aT2({
  onClose: A,
  isConnectedToIde: B
}) {
  let [Q, I] = q9(), [G, Z] = mA1.useState(ZA()), D = u9.useRef(ZA()), [Y, W] = mA1.useState(0), J = Y2(), [{
    mainLoopModel: F,
    todoFeatureEnabled: X,
    verbose: V
  }, C] = d5(), [K, E] = mA1.useState({}), [N, q] = mA1.useState(null), O = Me1();
  async function R(k) {
    E1("tengu_config_model_changed", {
      from_model: F,
      to_model: k
    }), C((x) => ({
      ...x,
      mainLoopModel: k
    })), E((x) => {
      let s = z_(k);
      if ("model" in x) {
        let {
          model: d,
          ...F1
        } = x;
        return {
          ...F1,
          model: s
        }
      }
      return {
        ...x,
        model: s
      }
    })
  }

  function T(k) {
    C((i) => ({
      ...i,
      verbose: k
    })), E((i) => {
      if ("verbose" in i) {
        let {
          verbose: x,
          ...s
        } = i;
        return s
      }
      return {
        ...i,
        verbose: k
      }
    })
  }

  function L(k) {
    C((i) => ({
      ...i,
      todoFeatureEnabled: k
    })), E((i) => {
      if ("Todo List Enabled" in i) {
        let {
          "Todo List Enabled": x,
          ...s
        } = i;
        return s
      }
      return {
        ...i,
        "Todo List Enabled": k
      }
    })
  }
  let _ = [{
    id: "autoCompactEnabled",
    label: "Auto-compact",
    value: G.autoCompactEnabled,
    type: "boolean",
    onChange(k) {
      let i = {
        ...ZA(),
        autoCompactEnabled: k
      };
      j0(i), Z(i), E1("tengu_auto_compact_setting_changed", {
        enabled: k
      })
    }
  }, {
    id: "todoFeatureEnabled",
    label: "Use todo list",
    value: X,
    type: "boolean",
    onChange: L
  }, {
    id: "verbose",
    label: "Verbose output",
    value: V,
    type: "boolean",
    onChange: T
  }, {
    id: "theme",
    label: "Theme",
    value: Q,
    type: "managedEnum",
    onChange: I
  }, {
    id: "notifChannel",
    label: "Notifications",
    value: G.preferredNotifChannel,
    options: ["auto", "iterm2", "terminal_bell", "iterm2_with_bell", "kitty", "notifications_disabled"],
    type: "enum",
    onChange(k) {
      let i = {
        ...ZA(),
        preferredNotifChannel: k
      };
      j0(i), Z(i)
    }
  }, {
    id: "editorMode",
    label: "Editor mode",
    value: G.editorMode === "emacs" ? "normal" : G.editorMode || "normal",
    options: ["normal", "vim"],
    type: "enum",
    onChange(k) {
      let i = {
        ...ZA(),
        editorMode: k
      };
      j0(i), Z(i), E1("tengu_editor_mode_changed", {
        mode: k,
        source: "config_panel"
      })
    }
  }, {
    id: "model",
    label: "Model",
    value: F === null ? "Default (recommended)" : F,
    type: "managedEnum",
    onChange: R
  }, ...B ? [{
    id: "diffTool",
    label: "Diff tool",
    value: G.diffTool ?? "auto",
    options: ["terminal", "auto"],
    type: "enum",
    onChange(k) {
      let i = {
        ...ZA(),
        diffTool: k
      };
      j0(i), Z(i), E1("tengu_diff_tool_changed", {
        tool: k,
        source: "config_panel"
      })
    }
  }] : [], ...O ? [{
    id: "showExternalIncludesDialog",
    label: "External CLAUDE.md includes",
    value: (() => {
      if (m9().hasClaudeMdExternalIncludesApproved) return "true";
      else return "false"
    })(),
    type: "managedEnum",
    onChange() {}
  }] : [], ...process.env.ANTHROPIC_API_KEY ? [{
    id: "apiKey",
    label: `Use custom API key: ${UA.bold(CJ(process.env.ANTHROPIC_API_KEY))}`,
    value: Boolean(process.env.ANTHROPIC_API_KEY && G.customApiKeyResponses?.approved?.includes(CJ(process.env.ANTHROPIC_API_KEY))),
    type: "boolean",
    onChange(k) {
      let i = {
        ...ZA()
      };
      if (!i.customApiKeyResponses) i.customApiKeyResponses = {
        approved: [],
        rejected: []
      };
      if (!i.customApiKeyResponses.approved) i.customApiKeyResponses.approved = [];
      if (!i.customApiKeyResponses.rejected) i.customApiKeyResponses.rejected = [];
      if (process.env.ANTHROPIC_API_KEY) {
        let x = CJ(process.env.ANTHROPIC_API_KEY);
        if (k) i.customApiKeyResponses.approved = [...i.customApiKeyResponses.approved.filter((s) => s !== x), x], i.customApiKeyResponses.rejected = i.customApiKeyResponses.rejected.filter((s) => s !== x);
        else i.customApiKeyResponses.approved = i.customApiKeyResponses.approved.filter((s) => s !== x), i.customApiKeyResponses.rejected = [...i.customApiKeyResponses.rejected.filter((s) => s !== x), x]
      }
      j0(i), Z(i)
    }
  }] : [], ...[]];
  return Z0((k, i) => {
    if (i.escape) {
      if (N !== null) {
        q(null);
        return
      }
      let s = Object.entries(K).map(([X1, v]) => {
          return E1("tengu_config_changed", {
            key: X1,
            value: v
          }), `Set ${X1} to ${UA.bold(v)}`
        }),
        d = Boolean(process.env.ANTHROPIC_API_KEY && D.current.customApiKeyResponses?.approved?.includes(CJ(process.env.ANTHROPIC_API_KEY))),
        F1 = Boolean(process.env.ANTHROPIC_API_KEY && G.customApiKeyResponses?.approved?.includes(CJ(process.env.ANTHROPIC_API_KEY)));
      if (d !== F1) s.push(`${F1?"Enabled":"Disabled"} custom API key`), E1("tengu_config_changed", {
        key: "env.ANTHROPIC_API_KEY",
        value: F1
      });
      if (G.theme !== D.current.theme) s.push(`Set theme to ${UA.bold(G.theme)}`);
      if (G.preferredNotifChannel !== D.current.preferredNotifChannel) s.push(`Set notifications to ${UA.bold(G.preferredNotifChannel)}`);
      if (G.editorMode !== D.current.editorMode) s.push(`Set editor mode to ${UA.bold(G.editorMode||"emacs")}`);
      if (G.diffTool !== D.current.diffTool) s.push(`Set diff tool to ${UA.bold(G.diffTool)}`);
      if (G.autoCompactEnabled !== D.current.autoCompactEnabled) s.push(`${G.autoCompactEnabled?"Enabled":"Disabled"} auto-compact`);
      if (s.length > 0) A(s.join(`
`));
      else A();
      return
    }
    if (N !== null) return;

    function x() {
      let s = _[Y];
      if (!s || !s.onChange) return;
      if (s.type === "boolean") {
        s.onChange(!s.value);
        return
      }
      if (s.id === "theme" && i.return) {
        q("theme");
        return
      }
      if (s.id === "model" && i.return) {
        q("model");
        return
      }
      if (s.id === "showExternalIncludesDialog" && i.return) {
        q("externalIncludes");
        return
      }
      if (s.type === "enum") {
        let F1 = (s.options.indexOf(s.value) + 1) % s.options.length;
        s.onChange(s.options[F1]);
        return
      }
    }
    if (i.tab || i.return || k === " ") {
      x();
      return
    }
    if (i.upArrow) W((s) => Math.max(0, s - 1));
    if (i.downArrow) W((s) => Math.min(_.length - 1, s + 1))
  }), u9.createElement(u9.Fragment, null, N === "theme" ? u9.createElement(Zw1, {
    initialTheme: Q,
    onThemeSelect: (k) => {
      I(k), q(null)
    },
    skipExitHandling: !0
  }) : N === "model" ? u9.createElement(Dw1, {
    initial: F,
    onSelect: (k) => {
      R(k), q(null)
    }
  }) : N === "externalIncludes" ? u9.createElement(Yw1, {
    onDone: () => {
      q(null)
    }
  }) : u9.createElement(u9.Fragment, null, u9.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "secondaryBorder",
    paddingX: 1,
    marginTop: 1
  }, u9.createElement(h, {
    flexDirection: "column",
    minHeight: 2,
    marginBottom: 1
  }, u9.createElement(P, {
    bold: !0
  }, "Settings"), u9.createElement(P, {
    dimColor: !0
  }, "Configure ", m0, " preferences")), _.map((k, i) => {
    let x = i === Y;
    return u9.createElement(h, {
      key: k.id,
      height: 2,
      minHeight: 2
    }, u9.createElement(h, {
      width: 44
    }, u9.createElement(P, {
      color: x ? "suggestion" : void 0
    }, x ? A0.pointer : " ", " ", k.label)), u9.createElement(h, null, k.type === "boolean" ? u9.createElement(P, {
      color: x ? "suggestion" : void 0
    }, k.value.toString()) : k.id === "theme" ? u9.createElement(P, {
      color: x ? "suggestion" : void 0
    }, (() => {
      return {
        dark: "Dark mode",
        light: "Light mode",
        "dark-daltonized": "Dark mode (colorblind-friendly)",
        "light-daltonized": "Light mode (colorblind-friendly)",
        "dark-ansi": "Dark mode (ANSI colors only)",
        "light-ansi": "Light mode (ANSI colors only)"
      } [k.value.toString()] || k.value.toString()
    })()) : u9.createElement(P, {
      color: x ? "suggestion" : void 0
    }, k.value.toString())))
  })), u9.createElement(h, {
    marginLeft: 3
  }, u9.createElement(P, {
    dimColor: !0
  }, J.pending ? u9.createElement(u9.Fragment, null, "Press ", J.keyName, " again to exit") : u9.createElement(u9.Fragment, null, "↑/↓ to select · Enter/Tab/Space to change · Esc to close")))))
}
// @from(Start 9753538, End 9753555)
I0A = I1(U1(), 1)
// @from(Start 9753561, End 9753971)
Yw5 = {
    aliases: ["theme"],
    type: "local-jsx",
    name: "config",
    description: "Open config panel",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, {
      options: {
        mcpClients: B
      }
    }) {
      let Q = OF1(B);
      return I0A.createElement(aT2, {
        onClose: A,
        isConnectedToIde: Q
      })
    },
    userFacingName() {
      return "config"
    }
  }
// @from(Start 9753975, End 9753984)
sT2 = Yw5
// @from(Start 9753990, End 9754381)
Ww5 = {
    type: "local",
    name: "cost",
    description: "Show the total cost and duration of the current session",
    isEnabled: () => !0,
    isHidden: !1,
    async call() {
      if (T9()) return `With your ${m31()} subscription, no need to monitor cost — your subscription includes Claude Code usage`;
      return tt1()
    },
    userFacingName() {
      return "cost"
    }
  }
// @from(Start 9754385, End 9754394)
rT2 = Ww5
// @from(Start 9754400, End 9754418)
uw5 = I1(gP2(), 1)
// @from(Start 9754424, End 9754441)
QS2 = I1(U1(), 1)
// @from(Start 9754447, End 9754463)
c6 = I1(U1(), 1)
// @from(Start 9754766, End 9754793)
K0A = /^\s*alias\s+claude=/
// @from(Start 9754796, End 9754977)
function DT() {
  let A = process.env.ZDOTDIR || Cw1();
  return {
    zsh: C0A(A, ".zshrc"),
    bash: C0A(Cw1(), ".bashrc"),
    fish: C0A(Cw1(), ".config/fish/config.fish")
  }
}
// @from(Start 9754979, End 9755140)
function Gp(A) {
  let B = !1;
  return {
    filtered: A.filter((I) => {
      if (K0A.test(I)) return B = !0, !1;
      return !0
    }),
    hadAlias: B
  }
}
// @from(Start 9755142, End 9755327)
function YT(A) {
  let B = x1();
  try {
    if (!B.existsSync(A)) return null;
    return B.readFileSync(A, {
      encoding: "utf8"
    }).split(`
`)
  } catch {
    return null
  }
}
// @from(Start 9755329, End 9755430)
function Zp(A, B) {
  x1().writeFileSync(A, B.join(`
`), {
    encoding: "utf8",
    flush: !0
  })
}
// @from(Start 9755432, End 9755709)
function H0A() {
  let A = DT();
  for (let B of Object.values(A)) {
    let Q = YT(B);
    if (!Q) continue;
    for (let I of Q)
      if (K0A.test(I)) {
        let G = I.match(/alias\s+claude=["']?([^"'\s]+)/);
        if (G && G[1]) return G[1]
      }
  }
  return null
}
// @from(Start 9755711, End 9755990)
function hP2() {
  let A = H0A();
  if (!A) return null;
  let B = x1(),
    Q = A.startsWith("~") ? A.replace("~", Cw1()) : A;
  try {
    if (B.existsSync(Q)) {
      let I = B.statSync(Q);
      if (I.isFile() || I.isSymbolicLink()) return A
    }
  } catch {}
  return null
}
// @from(Start 9755992, End 9756180)
function mP2() {
  let A = DT();
  for (let [B, Q] of Object.entries(A)) {
    let I = YT(Q);
    if (!I) continue;
    for (let G of I)
      if (K0A.test(G)) return Q
  }
  return null
}
// @from(Start 9756185, End 9756208)
WT = cA1(S4(), "local")
// @from(Start 9756212, End 9756241)
dP2 = cA1(WT, "package.json")
// @from(Start 9756245, End 9756267)
Dp = cA1(WT, "claude")
// @from(Start 9756270, End 9756361)
function JT() {
  return (process.argv[1] || "").includes("/.claude/local/node_modules/")
}
// @from(Start 9756362, End 9757052)
async function z0A() {
  try {
    if (!x1().existsSync(WT)) x1().mkdirSync(WT);
    if (!x1().existsSync(dP2)) {
      let B = {
        name: "claude-local",
        version: "0.0.1",
        private: !0
      };
      x1().writeFileSync(dP2, JSON.stringify(B, null, 2), {
        encoding: "utf8",
        flush: !1
      })
    }
    let A = cA1(WT, "claude");
    if (!x1().existsSync(A)) {
      let B = `#!/bin/bash
exec "${WT}/node_modules/.bin/claude" "$@"`;
      x1().writeFileSync(A, B, {
        encoding: "utf8",
        flush: !1
      }), await u0("chmod", ["+x", A])
    }
    return !0
  } catch (A) {
    return b1(A instanceof Error ? A : new Error(String(A))), !1
  }
}
// @from(Start 9757053, End 9758088)
async function Yp(A = "latest") {
  try {
    if (!await z0A()) return "install_failed";
    let B = await new Promise((I) => {
      pw5("npm", ["install", `${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.PACKAGE_URL}@${A}`], {
        cwd: WT,
        maxBuffer: 1e6
      }, (G, Z, D) => {
        if (G) I({
          stdout: Z || "",
          stderr: D || "",
          code: typeof G.code === "number" ? G.code : 1
        });
        else I({
          stdout: Z,
          stderr: D,
          code: 0
        })
      })
    });
    if (B.code !== 0) return b1(new Error(`Failed to install Claude CLI package: ${B.stderr}`)), B.code === 190 ? "in_progress" : "install_failed";
    let Q = ZA();
    return j0({
      ...Q,
      installMethod: "local"
    }), "success"
  } catch (B) {
    return b1(B instanceof Error ? B : new Error(String(B))), "install_failed"
  }
}
// @from(Start 9758090, End 9758175)
function i$() {
  return x1().existsSync(cA1(WT, "node_modules", ".bin", "claude"))
}
// @from(Start 9758177, End 9758370)
function w0A() {
  let A = process.env.SHELL || "";
  if (A.includes("zsh")) return "zsh";
  if (A.includes("bash")) return "bash";
  if (A.includes("fish")) return "fish";
  return "unknown"
}
// @from(Start 9758371, End 9759680)
async function uP2() {
  let A = w0A(),
    B = DT(),
    Q = "",
    I = A in B ? B[A] : null,
    G = `alias claude="${Dp}"`;
  try {
    if (I) {
      let Z = YT(I);
      if (Z)
        if (Z.some((Y) => Y === G)) Q += `✓ Alias already exists in ${I}

`;
        else {
          let {
            filtered: Y,
            hadAlias: W
          } = Gp(Z);
          if (Zp(I, [...Y, G, ""]), W) Q += `✓ Replaced old claude alias in ${I}
`;
          else Q += `✓ Added alias to ${I}
`;
          Q += `To use it right away, run: source ${I}

`
        }
      else Q += `To configure claude, add this line to your ${I}:
`, Q += `  ${G}
`, Q += `
Then run: source ${I}

`
    } else Q += `To configure claude, add this line to your shell config file:
`, Q += `  ${G}
`, Q += `
Then run: source <your-config-file>

`
  } catch {
    if (I) Q += `To add it to your PATH, add this line to your ${I}:
`, Q += `  alias claude="${Dp}"
`, Q += `
Then run: source ${I}

`;
    else Q += `Could not identify startup file
`, Q += `  alias claude="${Dp}"

`
  }
  if (!Q) Q += `To create an alias, add this line to your shell configuration file:
`, Q += `  ${G}

`, Q += `or create a symlink:
`, Q += `  mkdir -p ~/bin
`, Q += `  ln -sf ${Dp} ~/bin/claude
`, Q += `  # Make sure ~/bin is in your PATH
`;
  return Q
}
// @from(Start 9759681, End 9760246)
async function pP2() {
  try {
    let A = ["uninstall", "-g", "--force", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.PACKAGE_URL],
      B = await u0("npm", A);
    if (B.code !== 0) return b1(new Error(`Failed to uninstall global version: ${B.stderr}`)), !1;
    return !0
  } catch (A) {
    return b1(A instanceof Error ? A : new Error(String(A))), !1
  }
}
// @from(Start 9760248, End 9760343)
function FT(A, B) {
  E1("tengu_local_install_migration", {
    result: A,
    reason: B
  })
}
// @from(Start 9760348, End 9760366)
nP2 = I1(W_1(), 1)
// @from(Start 9760538, End 9760624)
function Wp() {
  return process.env.XDG_STATE_HOME ?? Hw1(Kw1(), ".local", "state")
}
// @from(Start 9760626, End 9760704)
function cP2() {
  return process.env.XDG_CACHE_HOME ?? Hw1(Kw1(), ".cache")
}
// @from(Start 9760706, End 9760792)
function lP2() {
  return process.env.XDG_DATA_HOME ?? Hw1(Kw1(), ".local", "share")
}
// @from(Start 9760794, End 9760849)
function iP2() {
  return Hw1(Kw1(), ".local", "bin")
}
// @from(Start 9760900, End 9760907)
iw5 = 2
// @from(Start 9760911, End 9761024)
E0A = "https://storage.googleapis.com/claude-code-dist-86c565f3-f756-42ad-8dfa-d59b1c096819/claude-code-releases"
// @from(Start 9761027, End 9761340)
function aP2() {
  let A = mA.platform,
    B = process.arch === "x64" ? "x64" : process.arch === "arm64" ? "arm64" : null;
  if (!B) {
    let Q = new Error(`Unsupported architecture: ${process.arch}`);
    throw M6(`Native installer does not support architecture: ${process.arch}`), Q
  }
  return `${A}-${B}`
}
// @from(Start 9761341, End 9762064)
async function U0A() {
  return;
  for (let [D, Y] of Object.entries(Q)) {
    if (!A.existsSync(Y)) continue;
    if (D === "locks") continue;
    if (D === "launcher") continue;
    let W = B[D];
    try {
      if (A.statSync(Y).isDirectory()) {
        let J = A.readdirStringSync(Y);
        for (let F of J) {
          let X = SB(Y, F),
            V = SB(W, F);
          if (A.existsSync(V)) continue;
          if (D === "versions") {
            if (A.statSync(X).size === 0) continue
          }
          A.copyFileSync(X, V);
          let C = A.statSync(X);
          A.chmodSync(V, C.mode)
        }
      }
    } catch (J) {
      b1(new Error(`Failed to migrate ${D} from ${Y} to ${W}: ${J}`))
    }
  }
}
// @from(Start 9762066, End 9762336)
function TE() {
  return {
    versions: SB(lP2(), "claude", "versions"),
    staging: SB(cP2(), "claude", "staging"),
    locks: SB(Wp(), "claude", "locks"),
    symlinks: SB(Wp(), "claude"),
    launcher: SB(Wp(), "claude", "launcher"),
    executable: SB(iP2())
  }
}
// @from(Start 9762338, End 9762506)
function nw5() {
  return {
    versions: SB(S4(), "versions"),
    locks: SB(S4(), "locks"),
    staging: SB(S4(), "staging"),
    launcher: SB(S4(), "launcher")
  }
}
// @from(Start 9762508, End 9762644)
function N0A(A) {
  let B = x1();
  if (!B.existsSync(A)) return !1;
  let Q = B.statSync(A);
  return Q.isFile() && Q.size > 10485760
}
// @from(Start 9762646, End 9762970)
function ww1(A) {
  let B = TE(),
    Q = x1();
  Object.values(TE()).forEach((G) => {
    if (!Q.existsSync(G)) Q.mkdirSync(G)
  });
  let I = SB(B.versions, A);
  if (!Q.existsSync(I)) Q.writeFileSync(I, "", {
    flush: !0,
    encoding: "utf8"
  });
  return {
    stagingPath: SB(B.staging, A),
    installPath: I
  }
}
// @from(Start 9762971, End 9763592)
async function sP2(A, B, Q = 0) {
  let I = TE(),
    G = x1(),
    Z = A.replace(I.versions + "/", ""),
    D = SB(I.locks, `${Z}.lock`);
  if (!G.existsSync(I.locks)) G.mkdirSync(I.locks);
  let Y = null;
  try {
    return Y = await nP2.default.lock(A, {
      stale: 60000,
      retries: {
        retries: Q,
        minTimeout: Q > 0 ? 1000 : 100,
        maxTimeout: Q > 0 ? 5000 : 500
      },
      lockfilePath: D
    }), await B(), !0
  } catch (W) {
    return b1(W instanceof Error ? W : new Error(String(W))), M6(`Failed to execute version lock callback: ${W}`), !1
  } finally {
    if (Y) await Y()
  }
}
// @from(Start 9763593, End 9763825)
async function aw5() {
  try {
    return (await P4.get(`${E0A}/stable`, {
      timeout: 1e4,
      responseType: "text"
    })).data.trim()
  } catch (A) {
    throw new Error(`Failed to fetch latest version from GCS: ${A}`)
  }
}
// @from(Start 9763826, End 9763865)
async function rP2() {
  return aw5()
}
// @from(Start 9763866, End 9764701)
async function sw5(A, B) {
  let Q = x1();
  if (Q.existsSync(B)) Q.rmSync(B, {
    recursive: !0,
    force: !0
  });
  let I = aP2(),
    D = (await P4.get(`${E0A}/${A}/manifest.json`, {
      timeout: 1e4,
      responseType: "json"
    })).data.platforms[I];
  if (!D) throw new Error(`Platform ${I} not found in manifest for version ${A}`);
  let Y = D.checksum,
    W = I.startsWith("win32") ? "claude.exe" : "claude",
    J = `${E0A}/${A}/${I}/${W}`,
    F = await P4.get(J, {
      timeout: 300000,
      responseType: "arraybuffer"
    }),
    X = lw5("sha256");
  X.update(F.data);
  let V = X.digest("hex");
  if (V !== Y) throw new Error(`Checksum mismatch for version ${A}: expected ${Y}, got ${V}`);
  Q.mkdirSync(B);
  let C = SB(B, W);
  (await import("fs")).writeFileSync(C, Buffer.from(F.data)), Q.chmodSync(C, 493)
}
// @from(Start 9764702, End 9764787)
async function rw5(A) {
  let {
    stagingPath: B
  } = ww1(A);
  return sw5(A, B)
}
// @from(Start 9764789, End 9765131)
function ow5(A, B) {
  let Q = x1();
  if (!Q.existsSync(zw1(B))) Q.mkdirSync(zw1(B));
  let G = aP2().startsWith("win32") ? "claude.exe" : "claude",
    Z = SB(A, G);
  if (!Q.existsSync(Z)) throw new Error(`Staged binary not found at ${Z}`);
  Q.copyFileSync(Z, B), Q.chmodSync(B, 493), Q.rmSync(A, {
    recursive: !0,
    force: !0
  })
}
// @from(Start 9765133, End 9765225)
function tw5(A) {
  let {
    stagingPath: B,
    installPath: Q
  } = ww1(A);
  ow5(B, Q)
}
// @from(Start 9765227, End 9765303)
function ew5(A) {
  let {
    installPath: B
  } = ww1(A);
  return N0A(B)
}
// @from(Start 9765304, End 9765797)
async function AE5() {
  let A = await rP2(),
    {
      installPath: B
    } = ww1(A);
  if (O9(`Checking for native installer update to version ${A}`), !await sP2(B, async () => {
      if (!ew5(A)) O9(`Downloading native installer version ${A}`), await rw5(A), tw5(A);
      else O9(`Version ${A} already installed, updating symlink`);
      let I = TE(),
        G = SB(I.symlinks, "latest");
      oP2(G, B)
    }, 3)) return !1;
  return O9(`Successfully updated to version ${A}`), !0
}
// @from(Start 9765799, End 9766415)
function oP2(A, B) {
  let Q = x1();
  try {
    if (Q.existsSync(A)) {
      try {
        let G = Q.readlinkSync(A),
          Z = xy(zw1(A), G),
          D = xy(B);
        if (Z === D) return !1
      } catch {}
      Q.unlinkSync(A)
    }
  } catch (G) {
    b1(new Error(`Failed to check/remove existing symlink: ${G}`))
  }
  let I = `${A}.tmp.${process.pid}.${Date.now()}`;
  try {
    return Q.symlinkSync(B, I), Q.renameSync(I, A), !0
  } catch (G) {
    try {
      if (Q.existsSync(I)) Q.unlinkSync(I)
    } catch {}
    return b1(new Error(`Failed to create symlink from ${A} to ${B}: ${G}`)), !1
  }
}
// @from(Start 9766416, End 9766536)
async function ZF() {
  if (ZA().installMethod === "native") return !0;
  return await wJ("tengu_native_installation")
}
// @from(Start 9766538, End 9766930)
function BE5() {
  let A = x1(),
    B = TE();
  if (!A.existsSync(B.launcher)) A.mkdirSync(B.launcher);
  if (!A.existsSync(B.executable)) A.mkdirSync(B.executable);
  let Q = SB(B.executable, "claude"),
    I = SB(B.launcher, `claude-v${GE5}.sh`);
  if (!A.existsSync(I)) A.writeFileSync(I, ZE5(), {
    encoding: "utf8",
    flush: !0
  }), A.chmodSync(I, 493);
  return oP2(Q, I), QE5()
}
// @from(Start 9766932, End 9768372)
function QE5() {
  let A = w0A(),
    B = TE(),
    Q = xy(B.executable),
    I = (process.env.PATH || "").split(cw5).some((Y) => {
      try {
        return xy(Y) === Q
      } catch {
        return !1
      }
    }),
    G = DT(),
    Z = A in G ? G[A] : null;
  if (!Z) return ["Could not determine shell config file, skipping PATH setup"];
  let D = A === "fish" ? `set -gx PATH "${B.executable}" $PATH` : `export PATH="${B.executable}:$PATH"`;
  try {
    let Y = [],
      W = YT(Z) || [],
      J = A === "fish" ? new RegExp(`set\\s+-gx\\s+PATH\\s+"?${B.executable}"?`) : new RegExp(`export\\s+PATH="?${B.executable}:?`),
      F = W.some((K) => J.test(K)),
      {
        filtered: X,
        hadAlias: V
      } = Gp(W),
      C = V;
    if (V) W = X, Y.push(`Removed old claude alias from ${Z}`);
    if (!F && !I) W = [...W, D, ""], C = !0, Y.push(`Added ~/.local/bin to PATH in ${Z}`, `You may need to restart your shell or run: source ${Z}`);
    else if (!I && F) Y.push(`~/.local/bin is configured in ${Z} but not in current PATH`, `You may need to restart your shell or run: source ${Z}`);
    else if (I && !F && V) Y.push("~/.local/bin was already in your PATH (not added by claude)", "Claude installation is working correctly.");
    if (C) Zp(Z, W);
    return Y
  } catch (Y) {
    return b1(Y instanceof Error ? Y : new Error(String(Y))), ["Failed to update PATH.", Y instanceof Error ? Y.message : String(Y)]
  }
}
// @from(Start 9768373, End 9768508)
async function Jp(A = !1) {
  if (!A && !await ZF()) return [];
  return await U0A(), BE5().filter((Q) => Q !== null && Q !== void 0)
}
// @from(Start 9768509, End 9769142)
async function Fp(A = !1) {
  if (!A && !await ZF()) return {
    latestVersion: null,
    wasUpdated: !1
  };
  await U0A();
  try {
    let B = await rP2(),
      Q = await AE5();
    if (B || Q) {
      let I = ZA();
      if (I.installMethod !== "native") j0({
        ...I,
        installMethod: "native"
      }), O9('Native installer: Set installMethod to "native"')
    }
    return {
      latestVersion: B,
      wasUpdated: Q
    }
  } catch (B) {
    return b1(new Error(`Failed to check/install latest version: ${B}`)), M6(`Auto-update check failed: ${B}`), {
      latestVersion: null,
      wasUpdated: !1
    }
  }
}
// @from(Start 9769144, End 9769353)
function IE5(A) {
  let B = x1();
  try {
    if (B.existsSync(A)) {
      let Q = B.readlinkSync(A),
        I = xy(zw1(A), Q);
      if (B.existsSync(I) && N0A(I)) return I
    }
  } catch {}
  return null
}
// @from(Start 9769354, End 9770708)
async function tP2() {
  if (await Promise.resolve(), !await ZF()) return;
  await U0A();
  let A = x1(),
    B = TE();
  if (!A.existsSync(B.versions)) return;
  try {
    let Q = A.readdirStringSync(B.versions).filter((F) => {
        let X = SB(B.versions, F);
        try {
          let V = A.statSync(X);
          return V.isFile() && (V.size === 0 || N0A(X))
        } catch {
          return !1
        }
      }),
      I = process.execPath,
      G = I && I.includes(B.versions) ? xy(I) : null,
      Z = new Set([...G ? [G] : []]),
      D = IE5(SB(B.symlinks, "latest"));
    if (D) Z.add(D);
    let Y = Q.map((F) => {
        let X = xy(B.versions, F);
        return {
          name: F,
          path: X,
          mtime: A.statSync(X).mtime
        }
      }).filter((F) => !Z.has(F.path)).sort((F, X) => X.mtime.getTime() - F.mtime.getTime()),
      W = Y.slice(iw5);
    if (W.length === 0) return;
    let J = 0;
    for (let F of W) try {
      if (await sP2(F.path, () => {
          A.unlinkSync(F.path)
        })) J++
    } catch (X) {
      b1(new Error(`Failed to delete version ${F.name}: ${X}`))
    }
    if (J > 0) E1("tengu_native_version_cleanup", {
      deleted_count: J,
      protected_count: Z.size,
      retained_count: Y.length - J
    })
  } catch (Q) {
    b1(new Error(`Version cleanup failed: ${Q}`))
  }
}
// @from(Start 9770710, End 9770964)
function Ew1() {
  let A = x1(),
    B = TE(),
    Q = SB(B.executable, "claude");
  try {
    if (A.existsSync(Q)) A.unlinkSync(Q), O9(`Removed launcher symlink at ${Q}`)
  } catch (I) {
    b1(new Error(`Failed to remove launcher symlink: ${I}`))
  }
}
// @from(Start 9770969, End 9770982)
GE5 = "0.0.8"
// @from(Start 9770985, End 9771983)
function ZE5() {
  let A = TE();
  return `#!/bin/bash

# Claude CLI Launcher Script

# Set terminal title
printf '\\033]0;claude\\007'

# XDG-based locations
VERSIONS_DIR="${A.versions}"
LATEST_LINK="${A.symlinks}/latest"

# Try to run the latest symlink if it exists
if [[ -L "$LATEST_LINK" ]] && [[ -x "$LATEST_LINK" ]]; then
    exec "$LATEST_LINK" "$@"
fi

# If latest doesn't exist or failed to execute, try versions by modification time
if [[ -d "$VERSIONS_DIR" ]]; then
    # Use ls -t to sort by modification time (newest first)
    # Filter for executable files only
    for VERSION_FILE in $(ls -t "$VERSIONS_DIR" 2>/dev/null); do
        FULL_PATH="$VERSIONS_DIR/$VERSION_FILE"
        if [[ -f "$FULL_PATH" ]] && [[ -x "$FULL_PATH" ]]; then
            exec "$FULL_PATH" "$@"
        fi
    done
fi

# No binary found
echo "Error: No Claude CLI binary found." >&2
echo "Looked for:" >&2
echo "  Latest symlink: $LATEST_LINK" >&2
echo "  Versions directory: $VERSIONS_DIR" >&2
exit 1`
}
// @from(Start 9772067, End 9772084)
eP2 = I1(gj(), 1)
// @from(Start 9772086, End 9773017)
async function AS2() {
  try {
    let A = await xC("tengu_version_config", {
      minVersion: "0.0.0"
    });
    if (A.minVersion && eP2.lt({
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.VERSION, A.minVersion)) console.error(`
It looks like your version of Claude Code (${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION}) needs an update.
A newer version (${A.minVersion} or higher) is required to continue.

To update, please run:
    claude update

This will ensure you have access to the latest features and improvements.
`), MI(1)
  } catch (A) {
    b1(A)
  }
}
// @from(Start 9773022, End 9773052)
fy = DE5(S4(), ".update.lock")
// @from(Start 9773056, End 9773068)
WE5 = 300000
// @from(Start 9773071, End 9773511)
function JE5() {
  try {
    if (!x1().existsSync(S4())) x1().mkdirSync(S4());
    if (x1().existsSync(fy)) {
      let A = x1().statSync(fy);
      if (Date.now() - A.mtimeMs < WE5) return !1;
      try {
        x1().unlinkSync(fy)
      } catch (Q) {
        return b1(Q), !1
      }
    }
    return x1().writeFileSync(fy, `${process.pid}`, {
      encoding: "utf8",
      flush: !1
    }), !0
  } catch (A) {
    return b1(A), !1
  }
}
// @from(Start 9773513, End 9773720)
function FE5() {
  try {
    if (x1().existsSync(fy)) {
      if (x1().readFileSync(fy, {
          encoding: "utf8"
        }) === `${process.pid}`) x1().unlinkSync(fy)
    }
  } catch (A) {
    b1(A)
  }
}
// @from(Start 9773721, End 9774027)
async function XE5() {
  let A = mA.isRunningWithBun(),
    B = null;
  if (A) B = await u0("bun", ["pm", "bin", "-g"]);
  else B = await u0("npm", ["-g", "config", "get", "prefix"]);
  if (B.code !== 0) return b1(new Error(`Failed to check ${A?"bun":"npm"} permissions`)), null;
  return B.stdout.trim()
}
// @from(Start 9774028, End 9774560)
async function $0A() {
  try {
    let A = await XE5();
    if (!A) return {
      hasPermissions: !1,
      npmPrefix: null
    };
    let B = !1;
    try {
      x1().accessSync(A, YE5.W_OK), B = !0
    } catch {
      B = !1
    }
    if (B) return {
      hasPermissions: !0,
      npmPrefix: A
    };
    return b1(new Error("Insufficient permissions for global npm install.")), {
      hasPermissions: !1,
      npmPrefix: A
    }
  } catch (A) {
    return b1(A), {
      hasPermissions: !1,
      npmPrefix: null
    }
  }
}
// @from(Start 9774561, End 9775018)
async function Uw1() {
  let A = new AbortController;
  setTimeout(() => A.abort(), 5000);
  let B = await u0("npm", ["view", `${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.PACKAGE_URL}@latest`, "version"], {
    abortSignal: A.signal
  });
  if (B.code !== 0) return null;
  return B.stdout.trim()
}
// @from(Start 9775019, End 9777011)
async function Nw1() {
  if (!JE5()) return b1(new Error("Another process is currently installing an update")), E1("tengu_auto_updater_lock_contention", {
    pid: process.pid,
    currentVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION
  }), "in_progress";
  try {
    if (VE5(), !mA.isRunningWithBun() && mA.isNpmFromWindowsPath()) return b1(new Error("Windows NPM detected in WSL environment")), E1("tengu_auto_updater_windows_npm_in_wsl", {
      currentVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.VERSION
    }), console.error(`
Error: Windows NPM detected in WSL

You're running Claude Code in WSL but using the Windows NPM installation from /mnt/c/.
This configuration is not supported for updates.

To fix this issue:
  1. Install Node.js within your Linux distribution: e.g. sudo apt install nodejs npm
  2. Make sure Linux NPM is in your PATH before the Windows version
  3. Try updating again with 'claude update'
`), "install_failed";
    let {
      hasPermissions: A
    } = await $0A();
    if (!A) return "no_permissions";
    let B = mA.isRunningWithBun() ? "bun" : "npm",
      Q = await u0(B, ["install", "-g", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.PACKAGE_URL]);
    if (Q.code !== 0) return b1(new Error(`Failed to install new version of claude: ${Q.stdout} ${Q.stderr}`)), "install_failed";
    return "success"
  } finally {
    FE5()
  }
}
// @from(Start 9777013, End 9777322)
function VE5() {
  let A = DT();
  for (let [, B] of Object.entries(A)) try {
    let Q = YT(B);
    if (!Q) continue;
    let {
      filtered: I,
      hadAlias: G
    } = Gp(Q);
    if (G) Zp(B, I), O9(`Removed claude alias from ${B}`)
  } catch (Q) {
    M6(`Failed to remove alias from ${B}: ${Q}`)
  }
}
// @from(Start 9777323, End 9778024)
async function CE5() {
  let A = process.argv[1] || "";
  if (A.includes("/build-ant/") || A.includes("/build-external/")) return "development";
  if (A.includes("/.local/bin/claude")) return "native";
  if (JT()) return "npm-local";
  if (["/usr/local/lib/node_modules", "/usr/lib/node_modules", "/opt/homebrew/lib/node_modules", "/opt/homebrew/bin", "/usr/local/bin"].some((I) => A.includes(I))) return "npm-global";
  if (Ez()) return "native";
  if (await ZF()) return "native";
  try {
    let I = iA1("npm", ["-g", "config", "get", "prefix"], {
        encoding: "utf8"
      }).trim(),
      G = process.argv[0];
    if (G && G.includes(I)) return "npm-global"
  } catch {}
  return "unknown"
}
// @from(Start 9778026, End 9778393)
function KE5() {
  if (Ez()) {
    try {
      let B = iA1("which", ["claude"], {
        encoding: "utf8"
      }).trim();
      if (B) return B
    } catch {}
    if (x1().existsSync(Xp(lA1(), ".local/bin/claude"))) return Xp(lA1(), ".local/bin/claude");
    return "native"
  }
  try {
    return process.argv[0] || "unknown"
  } catch {
    return "unknown"
  }
}
// @from(Start 9778395, End 9778498)
function HE5() {
  try {
    return process.argv[1] || "unknown"
  } catch {
    return "unknown"
  }
}
// @from(Start 9778500, End 9778858)
function zE5(A) {
  switch (A) {
    case "npm-local":
    case "native":
      return !0;
    case "npm-global":
      try {
        return iA1("npm", ["-g", "config", "get", "prefix"], {
          encoding: "utf8"
        }).trim(), !1
      } catch {
        return !1
      }
    case "development":
    case "unknown":
    default:
      return !1
  }
}
// @from(Start 9778860, End 9779590)
function wE5() {
  let A = [],
    B = Xp(lA1(), ".claude", "local");
  if (i$()) A.push({
    type: "npm-local",
    path: B
  });
  try {
    let Z = iA1("npm", ["-g", "config", "get", "prefix"], {
        encoding: "utf8"
      }).trim(),
      D = Xp(Z, "bin", "claude");
    if (x1().existsSync(D)) A.push({
      type: "npm-global",
      path: D
    })
  } catch {}
  let Q = x1(),
    I = Xp(lA1(), ".local", "bin", "claude");
  if (Q.existsSync(I)) A.push({
    type: "native",
    path: I
  });
  if (ZA().installMethod === "native") {
    let Z = Xp(lA1(), ".local", "share", "claude");
    if (Q.existsSync(Z) && !A.some((D) => D.type === "native")) A.push({
      type: "native",
      path: Z
    })
  }
  return A
}
// @from(Start 9779592, End 9781642)
function EE5(A) {
  let B = [],
    Q = ZA();
  if (A === "development") return B;
  let I = !1,
    G = "";
  try {
    G = iA1("which", ["claude"], {
      encoding: "utf8"
    }).trim(), I = !!G
  } catch {}
  if (A === "npm-local" && Q.installMethod !== "local") B.push({
    issue: `Running from local installation but config install method is '${Q.installMethod}'`,
    fix: "Run claude migrate-installer to fix configuration"
  });
  if (A === "native" && Q.installMethod !== "native") B.push({
    issue: `Running native installation but config install method is '${Q.installMethod}'`,
    fix: "Run claude install to update configuration"
  });
  if (A === "npm-global" && i$()) B.push({
    issue: "Local installation exists but not being used",
    fix: "Consider using local installation: claude migrate-installer"
  });
  if (I && i$() && A === "npm-global") B.push({
    issue: "PATH points to global installation but local installation exists",
    fix: "Consider using local installation: claude migrate-installer"
  });
  if (A === "npm-local" && !I) B.push({
    issue: "Local installation not accessible via PATH",
    fix: 'Create alias: alias claude="~/.claude/local/claude"'
  });
  if (A === "npm-local" && I) {
    if (G && !G.includes(".claude/local")) {
      let Z = H0A(),
        D = hP2();
      if (Z && D) {
        let Y = mP2(),
          W = Y ? `source ${Y}` : "source your shell config";
        B.push({
          issue: `PATH contains different installation: ${G}`,
          fix: `Alias already configured but not active. Restart shell or run: ${W}`
        })
      } else if (Z && !D) B.push({
        issue: `PATH contains different installation: ${G}`,
        fix: `Alias exists but points to invalid target: ${Z}. Update alias: alias claude="~/.claude/local/node_modules/.bin/claude"`
      });
      else B.push({
        issue: `PATH contains different installation: ${G}`,
        fix: 'Create alias to override: alias claude="~/.claude/local/node_modules/.bin/claude"'
      })
    }
  }
  return B
}
// @from(Start 9781643, End 9783290)
async function BS2() {
  let A = await CE5(),
    B = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION ? {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION : "unknown",
    Q = KE5(),
    I = HE5(),
    G = zE5(A),
    Z = wE5(),
    D = EE5(A),
    Y = ZA(),
    W = Y.installMethod || "not set",
    J = Y.autoUpdates !== void 0 ? Y.autoUpdates.toString() : "default (true)",
    F = null;
  if (A === "npm-global") {
    if (F = (await $0A()).hasPermissions, !F && G) D.push({
      issue: "Insufficient permissions for auto-updates",
      fix: ["Run: sudo chown -R $USER:$(id -gn) $(npm -g config get prefix)or use `claude migrate-installer` to migrate to local installation"].join(" ")
    })
  }
  let X = {
    installationType: A,
    version: B,
    installationPath: Q,
    invokedBinary: I,
    autoUpdates: G,
    configInstallMethod: W,
    configAutoUpdates: J,
    hasUpdatePermissions: F,
    multipleInstallations: Z,
    warnings: D
  };
  if (!G) {
    if (A === "native") X.recommendation = "Run 'claude install' to fix installation and enable auto-updates";
    else if (A === "npm-global") X.recommendation = `Run '/migrate-installer' to enable auto-updates
This migrates to a local installation in ~/.claude/local`
  }
  return X
}
// @from(Start 9783292, End 9785588)
function $w1({
  onDone: A
}) {
  let [B, Q] = c6.useState(null);
  if (c6.useEffect(() => {
      BS2().then((I) => {
        Q(I)
      })
    }, []), Z0((I, G) => {
      if (G.return) A()
    }), !B) return c6.default.createElement(h, {
    paddingX: 1,
    paddingTop: 1
  }, c6.default.createElement(P, {
    color: "secondaryText"
  }, "Checking installation status…"));
  return c6.default.createElement(h, {
    flexDirection: "column",
    paddingX: 1,
    paddingTop: 1
  }, c6.default.createElement(P, {
    bold: !0
  }, "Claude CLI Diagnostic"), c6.default.createElement(P, null), c6.default.createElement(P, null, "Currently running: ", B.installationType, " (", B.version, ")"), c6.default.createElement(P, null, "Path: ", B.installationPath), c6.default.createElement(P, null, "Invoked: ", B.invokedBinary), c6.default.createElement(P, null, "Auto-updates: ", B.autoUpdates ? "Yes" : "No"), c6.default.createElement(P, null, "Config install method: ", B.configInstallMethod), c6.default.createElement(P, null, "Config auto-updates: ", B.configAutoUpdates), B.hasUpdatePermissions !== null && c6.default.createElement(P, null, "Update permissions:", " ", B.hasUpdatePermissions ? "Yes" : "No (requires sudo)"), B.recommendation && c6.default.createElement(c6.default.Fragment, null, c6.default.createElement(P, null), c6.default.createElement(P, {
    color: "warning"
  }, "Recommendation: ", B.recommendation.split(`
`)[0]), c6.default.createElement(P, {
    color: "secondaryText"
  }, B.recommendation.split(`
`)[1])), B.multipleInstallations.length > 1 && c6.default.createElement(c6.default.Fragment, null, c6.default.createElement(P, null), c6.default.createElement(P, {
    color: "warning"
  }, "Warning: Multiple installations found"), B.multipleInstallations.map((I, G) => c6.default.createElement(P, {
    key: G
  }, "- ", I.type, " at ", I.path))), B.warnings.length > 0 && c6.default.createElement(c6.default.Fragment, null, c6.default.createElement(P, null), B.warnings.map((I, G) => c6.default.createElement(h, {
    key: G,
    flexDirection: "column"
  }, c6.default.createElement(P, {
    color: "warning"
  }, "Warning: ", I.issue), c6.default.createElement(P, null, "Fix: ", I.fix)))), c6.default.createElement(P, null), c6.default.createElement(bw, null))
}
// @from(Start 9785593, End 9785940)
UE5 = {
    name: "doctor",
    description: "Checks the health of your Claude Code installation",
    isEnabled: () => !0,
    isHidden: !1,
    userFacingName() {
      return "doctor"
    },
    type: "local-jsx",
    call(A) {
      let B = QS2.default.createElement($w1, {
        onDone: A
      });
      return Promise.resolve(B)
    }
  }
// @from(Start 9785944, End 9785953)
IS2 = UE5
// @from(Start 9786006, End 9786271)
async function $E5() {
  if (process.env.VISUAL) return process.env.VISUAL;
  if (process.env.EDITOR) return process.env.EDITOR;
  if (process.platform === "darwin") return "open -t";
  else if (process.platform === "win32") return "notepad";
  else return "nano"
}
// @from(Start 9786272, End 9786369)
async function GS2(A) {
  let B = await $E5();
  NE5(`${B} "${A}"`, {
    stdio: "inherit"
  })
}
// @from(Start 9786374, End 9786390)
P5 = I1(U1(), 1)
// @from(Start 9786396, End 9786412)
FB = I1(U1(), 1)
// @from(Start 9786416, End 9786433)
DS2 = I1(U1(), 1)
// @from(Start 9786439, End 9786454)
ZS2 = "Project"
// @from(Start 9786457, End 9787728)
function qw1({
  onSelect: A,
  onCancel: B,
  title: Q,
  renderDetails: I
}) {
  let [G, Z] = DS2.useState(ZS2), D = TU2(e9()), Y = [{
    label: "Project memory",
    value: "Project",
    description: `${D?"Checked in at":"Saved in"} ./CLAUDE.md`
  }, ...D ? [{
    label: "Project memory (local)",
    value: "Local",
    description: "Gitignored in ./CLAUDE.local.md"
  }] : [], {
    label: "User memory",
    value: "User",
    description: "Saved in ~/.claude/CLAUDE.md"
  }, ...[]];
  return Y2(), Z0((W, J) => {
    if (J.escape) B()
  }), FB.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "remember",
    padding: 1,
    width: "100%"
  }, FB.createElement(h, {
    marginBottom: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }, FB.createElement(P, {
    color: "remember",
    bold: !0
  }, Q || "Where should this memory be saved?")), FB.createElement(h, {
    flexDirection: "column",
    paddingX: 1
  }, FB.createElement(p0, {
    focusValue: G,
    options: Y,
    onFocus: (W) => Z(W),
    onChange: (W) => {
      ZS2 = W, A(W)
    },
    onCancel: B
  })), FB.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, I ? I(G) : FB.createElement(qE5, {
    type: G
  })))
}
// @from(Start 9787730, End 9788277)
function qE5({
  type: A
}) {
  return FB.createElement(FB.Fragment, null, A === "Project" && FB.createElement(P, {
    dimColor: !0
  }, "Example project memory: “Run lint with the following command after major edits: npm run lint”"), A === "Local" && FB.createElement(P, {
    dimColor: !0
  }, "Example local memory: “Use my sandbox URL for testing: https://myapp.local”"), A === "User" && FB.createElement(P, {
    dimColor: !0
  }, "Example user memory: “Don't add new comments when editing code”"), A === "ExperimentalUltraClaudeMd" && !1)
}
// @from(Start 9788282, End 9788298)
sK = I1(U1(), 1)
// @from(Start 9788301, End 9789292)
function Mw1({
  context: A
} = {}) {
  let B = dG(),
    Q = [];
  if (A?.readFileState) Object.entries(A.readFileState).forEach(([Z, D]) => {
    if (Z.endsWith("/CLAUDE.md") && !B.some((Y) => Y.path === Z)) Q.push({
      path: Z,
      content: D.content,
      type: "Project",
      isNested: !0
    })
  });
  let I = [...B, ...Q];
  if (I.length === 0) return null;
  let G = new Map;
  return sK.createElement(h, {
    flexDirection: "column"
  }, I.map((Z, D) => {
    let Y = p81(Z.path),
      W = Z.isNested ? "nested: " : `${f11(Z.type)}: `,
      J = Z.parent ? (G.get(Z.parent) ?? 0) + 1 : 0;
    if (G.set(Z.path, J), J === 0) return sK.createElement(P, {
      key: D
    }, sK.createElement(P, {
      color: "secondaryText"
    }, " L "), `${W}${Y}`);
    else {
      let F = "  ".repeat(J - 1);
      return sK.createElement(P, {
        key: D
      }, " ".repeat(W.length + 2), F, sK.createElement(P, {
        color: "secondaryText"
      }, " L "), Y)
    }
  }))
}
// @from(Start 9789297, End 9791256)
ME5 = {
  type: "local-jsx",
  name: "memory",
  description: "Edit Claude memory files",
  isEnabled: () => !0,
  isHidden: !1,
  async call(A, B) {
    return P5.createElement(h, {
      flexDirection: "column"
    }, P5.createElement(h, {
      flexDirection: "column",
      marginTop: 1,
      marginBottom: 1
    }, P5.createElement(P, {
      bold: !0
    }, "Memory Files"), P5.createElement(Mw1, {
      context: B
    }), P5.createElement(h, {
      marginTop: 1
    }, P5.createElement(P, {
      dimColor: !0
    }, "Learn more:", " ", P5.createElement(kQ, {
      url: "https://docs.anthropic.com/en/docs/claude-code/memory"
    })))), P5.createElement(qw1, {
      title: "Select memory to edit:",
      onSelect: async (G) => {
        try {
          let Z = gK(G),
            D = G === "User" ? S4() : dA();
          if (!x1().existsSync(D)) x1().mkdirSync(D);
          if (!x1().existsSync(Z)) {
            if (x1().writeFileSync(Z, "", {
                encoding: "utf8",
                flush: !0
              }), G === "Local") await RH1(Z)
          }
          await GS2(Z);
          let Y = "default",
            W = "";
          if (process.env.VISUAL) Y = "$VISUAL", W = process.env.VISUAL;
          else if (process.env.EDITOR) Y = "$EDITOR", W = process.env.EDITOR;
          let J = Y !== "default" ? `Using ${Y}="${W}".` : "",
            F = J ? `> ${J} To change editor, set $EDITOR or $VISUAL environment variable.` : "> To use a different editor, set the $EDITOR or $VISUAL environment variable.";
          A(`Opened ${$H1(G).toLowerCase()} at ${LH1(Z)}

${F}`)
        } catch (Z) {
          b1(Z instanceof Error ? Z : new Error(String(Z))), A(`Error opening memory file: ${Z}`)
        }
      },
      onCancel: () => {
        A("Cancelled memory editing")
      },
      renderDetails: (G) => P5.createElement(LE5, {
        memoryType: G
      })
    }))
  },
  userFacingName() {
    return this.name
  }
}
// @from(Start 9791259, End 9791937)
function LE5({
  memoryType: A
}) {
  let B = gK(A);
  if (!x1().existsSync(B)) {
    let Y = {
      User: "~/.claude/CLAUDE.md",
      Project: "./CLAUDE.md",
      Local: "./CLAUDE.local.md + add to .gitignore"
    } [A];
    return P5.createElement(P5.Fragment, null, P5.createElement(P, {
      dimColor: !0
    }, "Memory file does not exist yet. [Enter] to create ", Y, "."))
  }
  let Z = u11(B).split(`
`).filter((D) => D.trim().startsWith("-") || D.trim().startsWith("*") || /^\s*\d+\./.test(D.trim())).length;
  return P5.createElement(P5.Fragment, null, P5.createElement(P, {
    color: "remember"
  }, Z, " ", Z === 1 ? "memory" : "memories", " in", " ", LH1(B)))
}
// @from(Start 9791942, End 9791951)
YS2 = ME5
// @from(Start 9791957, End 9791973)
Z2 = I1(U1(), 1)
// @from(Start 9791976, End 9795204)
function WS2({
  commands: A,
  onClose: B
}) {
  let Q = `Learn more at: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.README_URL}`,
    I = A.filter((Y) => !Y.isHidden).sort((Y, W) => Y.name.localeCompare(W.name)),
    [G, Z] = Z2.useState(0);
  Z2.useEffect(() => {
    let Y = setTimeout(() => {
      if (G < 3) Z(G + 1)
    }, 250);
    return () => clearTimeout(Y)
  }, [G]), Z0((Y, W) => {
    if (W.return || W.escape) B()
  });
  let D = Y2(B);
  return Z2.createElement(h, {
    flexDirection: "column",
    padding: 1
  }, Z2.createElement(P, {
    bold: !0,
    color: "claude"
  }, `${m0} v${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.34"}.VERSION}`), Z2.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, Z2.createElement(P, null, "Always review Claude's responses, especially when running code. Claude has read access to files in the current directory and can run commands and edit files with your permission.")), G >= 1 && Z2.createElement(h, {
    flexDirection: "column",
    marginTop: 1
  }, Z2.createElement(P, {
    bold: !0
  }, "Usage Modes:"), Z2.createElement(P, null, "• REPL: ", Z2.createElement(P, {
    bold: !0
  }, "claude"), " (interactive session)"), Z2.createElement(P, null, "• Non-interactive: ", Z2.createElement(P, {
    bold: !0
  }, 'claude -p "question"')), Z2.createElement(h, {
    marginTop: 1
  }, Z2.createElement(P, null, "Run ", Z2.createElement(P, {
    bold: !0
  }, "claude -h"), " for all command line options"))), G >= 2 && Z2.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, Z2.createElement(P, {
    bold: !0
  }, "Common Tasks:"), Z2.createElement(P, null, "• Ask questions about your codebase", " ", Z2.createElement(P, {
    color: "secondaryText"
  }, "> How does foo.py work?")), Z2.createElement(P, null, "• Edit files", " ", Z2.createElement(P, {
    color: "secondaryText"
  }, "> Update bar.ts to...")), Z2.createElement(P, null, "• Fix errors ", Z2.createElement(P, {
    color: "secondaryText"
  }, "> cargo build")), Z2.createElement(P, null, "• Run commands ", Z2.createElement(P, {
    color: "secondaryText"
  }, "> /help")), Z2.createElement(P, null, "• Run bash commands ", Z2.createElement(P, {
    color: "secondaryText"
  }, "> !ls"))), G >= 3 && Z2.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, Z2.createElement(P, {
    bold: !0
  }, "Interactive Mode Commands:"), Z2.createElement(h, {
    flexDirection: "column"
  }, I.map((Y, W) => Z2.createElement(h, {
    key: W,
    marginLeft: 1
  }, Z2.createElement(P, {
    bold: !0
  }, `/${Y.name}`), Z2.createElement(P, null, " - ", Y.description))))), Z2.createElement(h, {
    marginTop: 1
  }, Z2.createElement(P, {
    color: "secondaryText"
  }, Q)), Z2.createElement(h, {
    marginTop: 2
  }, D.pending ? Z2.createElement(P, {
    dimColor: !0
  }, "Press ", D.keyName, " again to exit") : Z2.createElement(bw, null)))
}
// @from(Start 9795209, End 9795226)
q0A = I1(U1(), 1)
// @from(Start 9795230, End 9795595)
RE5 = {
    type: "local-jsx",
    name: "help",
    description: "Show help and available commands",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, {
      options: {
        commands: B
      }
    }) {
      return q0A.createElement(WS2, {
        commands: B,
        onClose: A
      })
    },
    userFacingName() {
      return "help"
    }
  }
// @from(Start 9795599, End 9795608)
JS2 = RE5
// @from(Start 9795614, End 9795630)
XB = I1(U1(), 1)
// @from(Start 9795633, End 9798169)
function OE5({
  availableIDEs: A,
  unavailableIDEs: B,
  selectedIDE: Q,
  onClose: I,
  onSelect: G
}) {
  let Z = Y2(),
    [D, Y] = XB.useState(Q?.port?.toString() ?? "None"),
    W = XB.useCallback((F) => {
      G(A.find((X) => X.port === parseInt(F)))
    }, [A, G]),
    J = A.map((F) => ({
      label: `${F.name}`,
      value: F.port.toString()
    })).concat([{
      label: "None",
      value: "None"
    }]);
  return Z0((F, X) => {
    if (X.escape) I()
  }), XB.default.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, XB.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: "remember",
    paddingX: 2,
    paddingY: 1,
    width: "100%"
  }, XB.default.createElement(h, {
    flexDirection: "column"
  }, XB.default.createElement(P, {
    color: "remember",
    bold: !0
  }, "Select IDE"), XB.default.createElement(P, {
    dimColor: !0
  }, "Connect to an IDE for integrated development features."), A.length === 0 && XB.default.createElement(h, {
    marginTop: 1
  }, XB.default.createElement(P, {
    dimColor: !0
  }, hZ ? `No available IDEs detected. Please install the plugin and restart your IDE:
https://docs.anthropic.com/s/claude-code-jetbrains` : "No available IDEs detected. Make sure your IDE has the Claude Code extension or plugin installed and is running."))), A.length !== 0 && XB.default.createElement(h, {
    flexDirection: "column",
    paddingX: 1,
    marginTop: 1
  }, XB.default.createElement(p0, {
    defaultValue: D,
    focusValue: D,
    options: J,
    onFocus: (F) => Y(F),
    onChange: (F) => {
      Y(F), W(F)
    },
    onCancel: () => I()
  })), B.length > 0 && XB.default.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, XB.default.createElement(P, {
    dimColor: !0
  }, "Found ", B.length, " other running IDE(s). However, their workspace/project directories do not match the current cwd."), XB.default.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, B.map((F, X) => XB.default.createElement(h, {
    key: X,
    paddingLeft: 3
  }, XB.default.createElement(P, {
    dimColor: !0
  }, "• ", F.name, ": ", F.workspaceFolders.join(", "))))))), XB.default.createElement(h, {
    paddingX: 1
  }, XB.default.createElement(P, {
    dimColor: !0
  }, Z.pending ? XB.default.createElement(XB.default.Fragment, null, "Press ", Z.keyName, " again to exit") : XB.default.createElement(XB.default.Fragment, null, A.length !== 0 && "Enter to confirm · ", "Esc to exit"))))
}
// @from(Start 9798170, End 9798354)
async function TE5(A, B) {
  let Q = B?.ide;
  if (!Q || Q.type !== "sse-ide" && Q.type !== "ws-ide") return null;
  for (let I of A)
    if (I.url === Q.url) return I;
  return null
}
// @from(Start 9798359, End 9799805)
PE5 = {
    type: "local-jsx",
    name: "ide",
    description: "Manage IDE integrations and show status",
    isEnabled: () => !0,
    isHidden: !1,
    argumentHint: "[open]",
    async call(A, B, Q) {
      E1("tengu_ext_ide_command", {});
      let {
        options: {
          dynamicMcpConfig: I
        },
        onChangeDynamicMcpConfig: G
      } = B, Z = await bt(!0), D = Z.filter((F) => F.isValid), Y = Z.filter((F) => !F.isValid), W = await TE5(D, I);
      return XB.default.createElement(OE5, {
        availableIDEs: D,
        unavailableIDEs: Y,
        selectedIDE: W,
        onClose: () => A(),
        onSelect: async (F) => {
          try {
            if (!G) {
              A("Error connecting to IDE.");
              return
            }
            let X = {
              ...I || {}
            };
            if (W) delete X.ide;
            if (!F) A(W ? `Disconnected from ${W.name}.` : "No IDE selected.");
            else {
              let V = F.url;
              X.ide = {
                type: V.startsWith("ws:") ? "ws-ide" : "sse-ide",
                url: V,
                ideName: F.name,
                authToken: F.authToken,
                scope: "dynamic"
              }, A(`Connected to ${F.name}.`)
            }
            G(X)
          } catch (X) {
            A("Error connecting to IDE.")
          }
        }
      })
    },
    userFacingName() {
      return "ide"
    }
  }
// @from(Start 9799809, End 9799818)
FS2 = PE5
// @from(Start 9799824, End 9801812)
SE5 = {
    type: "prompt",
    name: "init",
    description: "Initialize a new CLAUDE.md file with codebase documentation",
    isEnabled: () => !0,
    isHidden: !1,
    progressMessage: "analyzing your codebase",
    userFacingName() {
      return "init"
    },
    async getPromptForCommand() {
      return ou(), [{
        type: "text",
        text: `Please analyze this codebase and create a CLAUDE.md file, which will be given to future instances of Claude Code to operate in this repository.
            
What to add:
1. Commands that will be commonly used, such as how to build, lint, and run tests. Include the necessary commands to develop in this codebase, such as how to run a single test.
2. High-level code architecture and structure so that future instances can be productive more quickly. Focus on the "big picture" architecture that requires reading multiple files to understand

Usage notes:
- If there's already a CLAUDE.md, suggest improvements to it.
- When you make the initial CLAUDE.md, do not repeat yourself and do not include obvious instructions like "Provide helpful error messages to users", "Write unit tests for all new utilities", "Never include sensitive information (API keys, tokens) in code or commits" 
- Avoid listing every component or file structure that can be easily discovered
- Don't include generic development practices
- If there are Cursor rules (in .cursor/rules/ or .cursorrules) or Copilot rules (in .github/copilot-instructions.md), make sure to include the important parts.
- If there is a README.md, make sure to include the important parts. 
- Do not make up information such as "Common Development Tasks", "Tips for Development", "Support and Documentation" unless this is expressly included in other files that you read.
- Be sure to prefix the file with the following text:

\`\`\`
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
\`\`\``
      }]
    }
  }
// @from(Start 9801816, End 9801825)
XS2 = SE5
// @from(Start 9801831, End 9801847)
cI = I1(U1(), 1)
// @from(Start 9801853, End 9801869)
G9 = I1(U1(), 1)
// @from(Start 9801928, End 9804477)
class M0A {
  localServer = null;
  promiseResolver = null;
  promiseRejecter = null;
  expectedState = null;
  pendingResponse = null;
  hasPendingResponse() {
    return this.pendingResponse !== null
  }
  async waitForAuthorization(A, B) {
    return new Promise((Q, I) => {
      this.promiseResolver = Q, this.promiseRejecter = I, this.expectedState = A, this.startLocalListener(B)
    })
  }
  handleSuccessRedirect(A) {
    if (!this.pendingResponse) return;
    let B = CL(A) ? BB().CLAUDEAI_SUCCESS_URL : BB().CONSOLE_SUCCESS_URL;
    this.pendingResponse.writeHead(302, {
      Location: B
    }), this.pendingResponse.end(), this.pendingResponse = null, E1("tengu_oauth_automatic_redirect", {})
  }
  handleErrorRedirect() {
    if (!this.pendingResponse) return;
    let A = BB().CLAUDEAI_SUCCESS_URL;
    this.pendingResponse.writeHead(302, {
      Location: A
    }), this.pendingResponse.end(), this.pendingResponse = null, E1("tengu_oauth_automatic_redirect_error", {})
  }
  startLocalListener(A) {
    if (this.localServer) this.close();
    this.localServer = VS2.createServer(this.handleRedirect.bind(this)), this.localServer.on("error", this.handleError.bind(this)), this.localServer.listen(BB().REDIRECT_PORT, () => A())
  }
  handleRedirect(A, B) {
    let Q = CS2.parse(A.url || "", !0);
    if (Q.pathname !== "/callback") {
      B.writeHead(404), B.end();
      return
    }
    let I = Q.query.code,
      G = Q.query.state;
    this.validateAndRespond(I, G, B)
  }
  validateAndRespond(A, B, Q) {
    if (!A) {
      Q.writeHead(400), Q.end("Authorization code not found"), this.reject(new Error("No authorization code received"));
      return
    }
    if (B !== this.expectedState) {
      Q.writeHead(400), Q.end("Invalid state parameter"), this.reject(new Error("Invalid state parameter"));
      return
    }
    this.pendingResponse = Q, this.resolve(A)
  }
  handleError(A) {
    let Q = A.code === "EADDRINUSE" ? `Port ${BB().REDIRECT_PORT} is already in use. Please ensure no other applications are using this port.` : A.message,
      I = new Error(Q);
    b1(I), this.close(), this.reject(I)
  }
  resolve(A) {
    if (this.promiseResolver) this.promiseResolver(A), this.promiseResolver = null, this.promiseRejecter = null
  }
  reject(A) {
    if (this.promiseRejecter) this.promiseRejecter(A), this.promiseResolver = null, this.promiseRejecter = null
  }
  close() {
    if (this.pendingResponse) this.handleErrorRedirect();
    if (this.localServer) this.localServer.close(), this.localServer = null
  }
}
// @from(Start 9804510, End 9804617)
function L0A(A) {
  return A.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}
// @from(Start 9804619, End 9804671)
function KS2() {
  return L0A(nA1.randomBytes(32))
}
// @from(Start 9804673, End 9804766)
function HS2(A) {
  let B = nA1.createHash("sha256");
  return B.update(A), L0A(B.digest())
}
// @from(Start 9804768, End 9804820)
function zS2() {
  return L0A(nA1.randomBytes(32))
}
// @from(Start 9804825, End 9804842)
R0A = I1(U1(), 1)
// @from(Start 9804845, End 9805163)
function O0A({
  clearOnboarding: A = !1
}) {
  zdA(), VJ().delete(), T0A();
  let Q = ZA();
  if (A) {
    if (Q.hasCompletedOnboarding = !1, Q.subscriptionNoticeCount = 0, Q.hasAvailableSubscription = !1, Q.customApiKeyResponses?.approved) Q.customApiKeyResponses.approved = []
  }
  Q.oauthAccount = void 0, j0(Q)
}
// @from(Start 9805168, End 9805258)
T0A = () => {
    $Z.cache?.clear?.(), jY.cache?.clear?.(), DZ0(), xx.cache?.clear?.()
  }
// @from(Start 9805262, End 9805716)
wS2 = {
    type: "local-jsx",
    name: "logout",
    description: "Sign out from your Anthropic account",
    isEnabled: () => !0,
    isHidden: !1,
    async call() {
      await D3(), O0A({
        clearOnboarding: !0
      });
      let A = R0A.createElement(P, null, "Successfully logged out from your Anthropic account.");
      return setTimeout(() => {
        MI(0)
      }, 200), A
    },
    userFacingName() {
      return "logout"
    }
  }
// @from(Start 9805718, End 9807821)
class P0A {
  codeVerifier;
  authCodeListener;
  manualAuthCodeResolver = null;
  constructor() {
    this.codeVerifier = KS2(), this.authCodeListener = new M0A
  }
  async startOAuthFlow(A, B) {
    let Q = HS2(this.codeVerifier),
      I = zS2(),
      G = {
        codeChallenge: Q,
        state: I,
        loginWithClaudeAi: B?.loginWithClaudeAi
      },
      Z = lS1({
        ...G,
        isManual: !0
      }),
      D = lS1({
        ...G,
        isManual: !1
      }),
      Y = await this.waitForAuthorizationCode(I, async () => {
        await A(Z), await Ap(D)
      }),
      W = this.authCodeListener.hasPendingResponse();
    try {
      let J = await bmA(Y, I, this.codeVerifier, !W);
      if (O0A({
          clearOnboarding: !1
        }), J.account) this.storeAccountInfo(J);
      if (W) {
        let X = O31(J.scope);
        this.authCodeListener.handleSuccessRedirect(X)
      }
      let F = await iS1(J.access_token);
      return this.formatTokens(J, F)
    } catch (J) {
      if (W) this.authCodeListener.handleErrorRedirect();
      throw J
    } finally {
      this.authCodeListener.close()
    }
  }
  async waitForAuthorizationCode(A, B) {
    return new Promise((Q, I) => {
      this.manualAuthCodeResolver = Q, this.authCodeListener.waitForAuthorization(A, B).then((G) => {
        this.manualAuthCodeResolver = null, Q(G)
      }).catch((G) => {
        this.manualAuthCodeResolver = null, I(G)
      })
    })
  }
  handleManualAuthCodeInput(A) {
    if (this.manualAuthCodeResolver) this.manualAuthCodeResolver(A.authorizationCode), this.manualAuthCodeResolver = null, this.authCodeListener.close()
  }
  storeAccountInfo(A) {
    let B = {
        accountUuid: A.account.uuid,
        emailAddress: A.account.email_address,
        organizationUuid: A.organization?.uuid
      },
      Q = ZA();
    Q.oauthAccount = B, j0(Q)
  }
  formatTokens(A, B) {
    return {
      accessToken: A.access_token,
      refreshToken: A.refresh_token,
      expiresAt: Date.now() + A.expires_in * 1000,
      scopes: O31(A.scope),
      subscriptionType: B
    }
  }
}
// @from(Start 9807826, End 9807843)
S0A = I1(U1(), 1)
// @from(Start 9807846, End 9808611)
function ES2() {
  return S0A.default.createElement(h, {
    flexDirection: "column",
    alignItems: "flex-start"
  }, S0A.default.createElement(P, {
    color: "claude"
  }, ` ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗
██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝
██║     ██║     ███████║██║   ██║██║  ██║█████╗  
██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  
╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗
 ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
 ██████╗ ██████╗ ██████╗ ███████╗                
██╔════╝██╔═══██╗██╔══██╗██╔════╝                
██║     ██║   ██║██║  ██║█████╗                  
██║     ██║   ██║██║  ██║██╔══╝                  
╚██████╗╚██████╔╝██████╔╝███████╗                
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝`))
}
// @from(Start 9808616, End 9808632)
F9 = I1(U1(), 1)
// @from(Start 9808636, End 9808652)
DF = I1(U1(), 1)
// @from(Start 9808658, End 9808674)
XT = I1(U1(), 1)
// @from(Start 9808677, End 9809044)
function US2(A, B, Q) {
  let [I, G] = XT.useState(A), Z = XT.useRef(), D = XT.useRef(A);
  return XT.useEffect(() => {
    D.current = A
  }, [A]), XT.useEffect(() => {
    if (Z.current) clearTimeout(Z.current);
    return Z.current = setTimeout(() => {
      G(D.current())
    }, Q), () => {
      if (Z.current) clearTimeout(Z.current)
    }
  }, [...B, Q]), I
}
// @from(Start 9809049, End 9809066)
Lw1 = I1(U1(), 1)
// @from(Start 9809068, End 9809370)
async function jE5() {
  try {
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX) return !0;
    return await P4.head("https://www.google.com", {
      timeout: 5000,
      headers: {
        "Cache-Control": "no-cache"
      }
    }), !0
  } catch {
    return !1
  }
}
// @from(Start 9809372, End 9809820)
function _0A(A) {
  let B = zm() ? 30000 : 1000,
    Q = A ?? B,
    [I, G] = Lw1.useState(null);
  return Lw1.useEffect(() => {
    let Z = !0;
    if (process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return;
    let D = async () => {
      if (!Z) return;
      let W = await jE5();
      if (Z) G(W)
    };
    D();
    let Y = setInterval(D, Q);
    return () => {
      Z = !1, clearInterval(Y)
    }
  }, [Q]), {
    isConnected: I
  }
}
// @from(Start 9809822, End 9810028)
function yE5() {
  if (process.env.TERM === "xterm-ghostty") return ["·", "✢", "✳", "✶", "✻", "*"];
  return process.platform === "darwin" ? ["·", "✢", "✳", "✶", "✻", "✽"] : ["·", "✢", "*", "✶", "✻", "✽"]
}
// @from(Start 9810033, End 9810044)
NS2 = yE5()
// @from(Start 9810048, End 9810085)
Rw1 = [...NS2, ...[...NS2].reverse()]
// @from(Start 9810089, End 9811296)
kE5 = ["Accomplishing", "Actioning", "Actualizing", "Baking", "Booping", "Brewing", "Calculating", "Cerebrating", "Channelling", "Churning", "Clauding", "Coalescing", "Cogitating", "Computing", "Combobulating", "Concocting", "Conjuring", "Considering", "Contemplating", "Cooking", "Crafting", "Creating", "Crunching", "Deciphering", "Deliberating", "Determining", "Discombobulating", "Divining", "Doing", "Effecting", "Elucidating", "Enchanting", "Envisioning", "Finagling", "Flibbertigibbeting", "Forging", "Forming", "Frolicking", "Generating", "Germinating", "Hatching", "Herding", "Honking", "Hustling", "Ideating", "Imagining", "Incubating", "Inferring", "Jiving", "Manifesting", "Marinating", "Meandering", "Moseying", "Mulling", "Mustering", "Musing", "Noodling", "Percolating", "Perusing", "Philosophising", "Pontificating", "Pondering", "Processing", "Puttering", "Puzzling", "Reticulating", "Ruminating", "Scheming", "Schlepping", "Shimmying", "Shucking", "Simmering", "Smooshing", "Spelunking", "Spinning", "Stewing", "Sussing", "Synthesizing", "Thinking", "Tinkering", "Transmuting", "Unfurling", "Unravelling", "Vibing", "Wandering", "Whirring", "Wibbling", "Wizarding", "Working", "Wrangling"]
// @from(Start 9811299, End 9813397)
function vy({
  mode: A,
  haikuWords: B,
  currentResponseLength: Q,
  overrideMessage: I
}) {
  let [G, Z] = DF.useState(0), [D, Y] = DF.useState(0), [W, J] = DF.useState(0), {
    isConnected: F
  } = _0A(), X = US2(() => EP(B.length > 0 ? B : kE5), [B.length], 1000), V = I || X, C = DF.useRef(Date.now()), K = DF.useRef(Q);
  DF.useEffect(() => {
    K.current = Q
  }, [Q]), CV(() => {
    if (!F) {
      Z(4);
      return
    }
    Z((q) => q + 1)
  }, 120), CV(() => {
    J((q) => {
      let O = K.current - q;
      if (O <= 0) return q;
      let R;
      if (O < 70) R = 1;
      else if (O < 200) R = Math.max(2, Math.ceil(O * 0.08));
      else R = 18;
      return Math.min(q + R, K.current)
    })
  }, 10), CV(() => {
    Y(Math.floor((Date.now() - C.current) / 1000))
  }, 10);
  let E = [F9.createElement(P, {
    color: "secondaryText",
    key: "elapsedTime"
  }, D, "s"), F9.createElement(h, {
    flexDirection: "row",
    key: "tokens"
  }, F9.createElement(xE5, {
    mode: A,
    key: "spinnerMode"
  }), F9.createElement(P, {
    color: "secondaryText"
  }, _G(Math.round(W / 4)), " tokens")), F9.createElement(h, {
    key: "esc"
  }, F9.createElement(P, {
    color: "secondaryText",
    bold: !0
  }, "esc", " "), F9.createElement(P, {
    color: "secondaryText"
  }, "to interrupt"))];
  if (F === !1) E.push(F9.createElement(h, {
    key: "offline"
  }, F9.createElement(P, {
    color: "error",
    bold: !0
  }, "offline")));
  let N = F === !1 ? "secondaryText" : "claude";
  return F9.createElement(h, {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 1,
    width: "100%"
  }, F9.createElement(h, {
    flexWrap: "wrap",
    height: 1,
    width: 2,
    key: "spinner"
  }, F9.createElement(P, {
    color: N
  }, Rw1[G % Rw1.length])), F9.createElement(P, {
    color: N,
    key: "message"
  }, V, "…", " "), F9.createElement(P, {
    color: "secondaryText"
  }, "("), FW(E, (q) => F9.createElement(P, {
    color: "secondaryText",
    key: `separator-${q}`
  }, " ", "·", " ")), F9.createElement(P, {
    color: "secondaryText"
  }, ")"))
}