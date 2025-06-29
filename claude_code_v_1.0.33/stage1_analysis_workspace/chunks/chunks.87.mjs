
// @from(Start 8797260, End 8798014)
function P({
  color: A,
  backgroundColor: B,
  dimColor: Q = !1,
  bold: I = !1,
  italic: G = !1,
  underline: Z = !1,
  strikethrough: D = !1,
  inverse: Y = !1,
  wrap: W = "wrap",
  children: J
}) {
  let [F] = q9();
  if (J === void 0 || J === null) return null;
  return WmA.default.createElement("ink-text", {
    style: {
      flexGrow: 0,
      flexShrink: 1,
      flexDirection: "row",
      textWrap: W
    },
    internal_transform: (V) => {
      if (Q) V = UA.dim(V);
      if (A) V = V9(A, F)(V);
      if (B) V = V9(B, F, "background")(V);
      if (I) V = UA.bold(V);
      if (G) V = UA.italic(V);
      if (Z) V = UA.underline(V);
      if (D) V = UA.strikethrough(V);
      if (Y) V = UA.inverse(V);
      return V
    }
  }, J)
}
// @from(Start 8798019, End 8798083)
JmA = (A) => {
    return A?.replace(`file://${XmA()}/`, "")
  }
// @from(Start 8798087, End 8798174)
FmA = new bS1.default({
    cwd: XmA(),
    internals: bS1.default.nodeInternals()
  })
// @from(Start 8798177, End 8800300)
function gS1({
  error: A
}) {
  let B = A.stack ? A.stack.split(`
`).slice(1) : void 0,
    Q = B ? FmA.parseLine(B[0]) : void 0,
    I = JmA(Q?.file),
    G, Z = 0;
  if (I && Q?.line && z31.existsSync(I)) {
    let D = z31.readFileSync(I, "utf8");
    if (G = ZmA(D, Q.line), G)
      for (let {
          line: Y
        }
        of G) Z = Math.max(Z, String(Y).length)
  }
  return G7.default.createElement(h, {
    flexDirection: "column",
    padding: 1
  }, G7.default.createElement(h, null, G7.default.createElement(P, {
    backgroundColor: "error",
    color: "text"
  }, " ", "ERROR", " "), G7.default.createElement(P, null, " ", A.message)), Q && I && G7.default.createElement(h, {
    marginTop: 1
  }, G7.default.createElement(P, {
    dimColor: !0
  }, I, ":", Q.line, ":", Q.column)), Q && G && G7.default.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, G.map(({
    line: D,
    value: Y
  }) => G7.default.createElement(h, {
    key: D
  }, G7.default.createElement(h, {
    width: Z + 1
  }, G7.default.createElement(P, {
    dimColor: D !== Q.line,
    backgroundColor: D === Q.line ? "error" : void 0,
    color: D === Q.line ? "text" : void 0
  }, String(D).padStart(Z, " "), ":")), G7.default.createElement(P, {
    key: D,
    backgroundColor: D === Q.line ? "error" : void 0,
    color: D === Q.line ? "text" : void 0
  }, " " + Y)))), A.stack && G7.default.createElement(h, {
    marginTop: 1,
    flexDirection: "column"
  }, A.stack.split(`
`).slice(1).map((D) => {
    let Y = FmA.parseLine(D);
    if (!Y) return G7.default.createElement(h, {
      key: D
    }, G7.default.createElement(P, {
      dimColor: !0
    }, "- "), G7.default.createElement(P, {
      dimColor: !0,
      bold: !0
    }, D));
    return G7.default.createElement(h, {
      key: D
    }, G7.default.createElement(P, {
      dimColor: !0
    }, "- "), G7.default.createElement(P, {
      dimColor: !0,
      bold: !0
    }, Y.function), G7.default.createElement(P, {
      dimColor: !0,
      color: "secondaryText"
    }, " ", "(", JmA(Y.file) ?? "", ":", Y.line, ":", Y.column, ")"))
  })))
}
// @from(Start 8800352, End 8800383)
RA4 = /^(?:\x1b)([a-zA-Z0-9])$/
// @from(Start 8800387, End 8800469)
OA4 = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/
// @from(Start 8800473, End 8800490)
TA4 = "\x1B[200~"
// @from(Start 8800494, End 8800511)
w31 = "\x1B[201~"
// @from(Start 8800514, End 8800679)
function PA4(A) {
  return {
    name: "",
    fn: !1,
    ctrl: !1,
    meta: !1,
    shift: !1,
    option: !1,
    sequence: A,
    raw: A,
    isPasted: !0
  }
}
// @from(Start 8800684, End 8800941)
SA4 = new RegExp("^(.*?)(" + ["\\x1b\\][0-9]*(?:;[^\\x07\\x1b]*)*(?:\\x07|\\x1b\\\\)", "\\x1bP[^\\x1b]*\\x1b\\\\", "\\x1b\\[[0-9]*(?:;[0-9]*)*[A-Za-z~]", "\\x1bO[A-Za-z]", "\\x1b[\\x00-\\x7F]", "\\x1b\\x1b", "$"].map((A) => `(?:${A})`).join("|") + ")", "s")
// @from(Start 8800945, End 8801134)
_A4 = new RegExp("(.*?)(" + ["\\x1b\\][0-9]*(?:;[^\\x07\\x1b]*)*$", "\\x1bP[^\\x1b]*$", "\\x1b\\[[0-9]*(?:;[0-9]*)*$", "\\x1bO$", "\\x1b$", "$"].map((A) => `(?:${A})`).join("|") + ")", "s")
// @from(Start 8801138, End 8801188)
CmA = {
    mode: "NORMAL",
    incomplete: ""
  }
// @from(Start 8801191, End 8801449)
function jA4(A) {
  if (LA4.isBuffer(A))
    if (A[0] > 127 && A[1] === void 0) return A[0] -= 128, "\x1B" + String(A);
    else return String(A);
  else if (A !== void 0 && typeof A !== "string") return String(A);
  else if (!A) return "";
  else return A
}
// @from(Start 8801451, End 8802547)
function KmA(A, B = "") {
  let Q = B === null,
    I = Q ? "" : jA4(B);
  if (A.mode === "IN_PASTE") {
    if ((A.incomplete.slice(-w31.length + 1) + I).indexOf(w31) === -1) return [
      [], {
        ...A,
        incomplete: A.incomplete + I
      }
    ]
  }
  let G = A.incomplete + I,
    Z = {
      ...A,
      incomplete: ""
    },
    D = [],
    Y = {
      NORMAL: () => {
        let W = SA4.exec(G);
        G = G.substring(W[0].length);
        let J = W[1];
        if (!W[2] && !Q) {
          let F = _A4.exec(J);
          Z.incomplete = F[2], J = F[1]
        }
        if (J) D.push(VmA(J));
        if (W[2] === TA4) Z.mode = "IN_PASTE";
        else if (W[2]) D.push(VmA(W[2]))
      },
      IN_PASTE: () => {
        let W = G.indexOf(w31);
        if (W === -1) {
          if (!Q) {
            Z.incomplete = G, G = "";
            return
          }
          W = G.length
        }
        let J = G.substring(0, W);
        if (J) D.push(PA4(J));
        G = G.substring(W + w31.length), Z.mode = "NORMAL"
      }
    };
  while (G) Y[Z.mode]();
  return [D, Z]
}
// @from(Start 8802552, End 8803797)
HmA = {
    OP: "f1",
    OQ: "f2",
    OR: "f3",
    OS: "f4",
    "[11~": "f1",
    "[12~": "f2",
    "[13~": "f3",
    "[14~": "f4",
    "[[A": "f1",
    "[[B": "f2",
    "[[C": "f3",
    "[[D": "f4",
    "[[E": "f5",
    "[15~": "f5",
    "[17~": "f6",
    "[18~": "f7",
    "[19~": "f8",
    "[20~": "f9",
    "[21~": "f10",
    "[23~": "f11",
    "[24~": "f12",
    "[A": "up",
    "[B": "down",
    "[C": "right",
    "[D": "left",
    "[E": "clear",
    "[F": "end",
    "[H": "home",
    OA: "up",
    OB: "down",
    OC: "right",
    OD: "left",
    OE: "clear",
    OF: "end",
    OH: "home",
    "[1~": "home",
    "[2~": "insert",
    "[3~": "delete",
    "[4~": "end",
    "[5~": "pageup",
    "[6~": "pagedown",
    "[[5~": "pageup",
    "[[6~": "pagedown",
    "[7~": "home",
    "[8~": "end",
    "[a": "up",
    "[b": "down",
    "[c": "right",
    "[d": "left",
    "[e": "clear",
    "[2$": "insert",
    "[3$": "delete",
    "[5$": "pageup",
    "[6$": "pagedown",
    "[7$": "home",
    "[8$": "end",
    Oa: "up",
    Ob: "down",
    Oc: "right",
    Od: "left",
    Oe: "clear",
    "[2^": "insert",
    "[3^": "delete",
    "[5^": "pageup",
    "[6^": "pagedown",
    "[7^": "home",
    "[8^": "end",
    "[Z": "tab"
  }
// @from(Start 8803801, End 8803843)
zmA = [...Object.values(HmA), "backspace"]
// @from(Start 8803847, End 8803967)
yA4 = (A) => {
    return ["[a", "[b", "[c", "[d", "[e", "[2$", "[3$", "[5$", "[6$", "[7$", "[8$", "[Z"].includes(A)
  }
// @from(Start 8803971, End 8804085)
kA4 = (A) => {
    return ["Oa", "Ob", "Oc", "Od", "Oe", "[2^", "[3^", "[5^", "[6^", "[7^", "[8^"].includes(A)
  }
// @from(Start 8804089, End 8807063)
VmA = (A = "") => {
    let B, Q = {
      name: "",
      fn: !1,
      ctrl: !1,
      meta: !1,
      shift: !1,
      option: !1,
      sequence: A,
      raw: A,
      isPasted: !1
    };
    if (Q.sequence = Q.sequence || A || Q.name, A === "\r") Q.raw = void 0, Q.name = "return";
    else if (A === `
`) Q.name = "enter";
    else if (A === "\t") Q.name = "tab";
    else if (A === "\b" || A === "\x1B\b") Q.name = "backspace", Q.meta = A.charAt(0) === "\x1B";
    else if (A === "" || A === "\x1B") Q.name = "backspace", Q.meta = A.charAt(0) === "\x1B";
    else if (A === "\x1B" || A === "\x1B\x1B") Q.name = "escape", Q.meta = A.length === 2;
    else if (A === " " || A === "\x1B ") Q.name = "space", Q.meta = A.length === 2;
    else if (A <= "\x1A" && A.length === 1) Q.name = String.fromCharCode(A.charCodeAt(0) + 97 - 1), Q.ctrl = !0;
    else if (A.length === 1 && A >= "0" && A <= "9") Q.name = "number";
    else if (A.length === 1 && A >= "a" && A <= "z") Q.name = A;
    else if (A.length === 1 && A >= "A" && A <= "Z") Q.name = A.toLowerCase(), Q.shift = !0;
    else if (B = RA4.exec(A)) Q.meta = !0, Q.shift = /^[A-Z]$/.test(B[1]);
    else if (B = OA4.exec(A)) {
      let I = [...A];
      if (I[0] === "\x1B" && I[1] === "\x1B") Q.option = !0;
      let G = [B[1], B[2], B[4], B[6]].filter(Boolean).join(""),
        Z = (B[3] || B[5] || 1) - 1;
      Q.ctrl = !!(Z & 4), Q.meta = !!(Z & 10), Q.shift = !!(Z & 1), Q.code = G, Q.name = HmA[G], Q.shift = yA4(G) || Q.shift, Q.ctrl = kA4(G) || Q.ctrl
    }
    if (Q.raw === "\x1Bb") Q.meta = !0, Q.name = "left";
    else if (Q.raw === "\x1Bf") Q.meta = !0, Q.name = "right";
    switch (A) {
      case "\x1B[1~":
        return {
          name: "home", ctrl: !1, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
        };
      case "\x1B[4~":
        return {
          name: "end", ctrl: !1, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
        };
      case "\x1B[5~":
        return {
          name: "pageup", ctrl: !1, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
        };
      case "\x1B[6~":
        return {
          name: "pagedown", ctrl: !1, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
        };
      case "\x1B[1;5D":
        return {
          name: "left", ctrl: !0, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
        };
      case "\x1B[1;5C":
        return {
          name: "right", ctrl: !0, meta: !1, shift: !1, option: !1, fn: !1, sequence: A, raw: A, isPasted: !1
        };
      case "\x1B[1~":
        return {
          name: "left", ctrl: !0, fn: !0, meta: !1, shift: !1, option: !1, sequence: A, raw: A, isPasted: !1
        };
      case "\x1B[4~":
        return {
          name: "right", ctrl: !0, fn: !0, meta: !1, shift: !1, option: !1, sequence: A, raw: A, isPasted: !1
        }
    }
    return Q
  }
// @from(Start 8807069, End 8807079)
fA4 = "\t"
// @from(Start 8807083, End 8807097)
vA4 = "\x1B[Z"
// @from(Start 8807101, End 8807113)
bA4 = "\x1B"
// @from(Start 8807115, End 8813775)
class E31 extends Sz.PureComponent {
  static displayName = "InternalApp";
  static getDerivedStateFromError(A) {
    return {
      error: A
    }
  }
  state = {
    isFocusEnabled: !0,
    activeFocusId: void 0,
    focusables: [],
    error: void 0
  };
  rawModeEnabledCount = 0;
  internal_eventEmitter = new xA4;
  keyParseState = CmA;
  incompleteEscapeTimer = null;
  NORMAL_TIMEOUT = 50;
  PASTE_TIMEOUT = 500;
  isRawModeSupported() {
    return this.props.stdin.isTTY
  }
  render() {
    return Sz.default.createElement(jS1.Provider, {
      value: {
        exit: this.handleExit
      }
    }, Sz.default.createElement(vS1, {
      initialState: this.props.initialTheme
    }, Sz.default.createElement(V31.Provider, {
      value: {
        stdin: this.props.stdin,
        setRawMode: this.handleSetRawMode,
        isRawModeSupported: this.isRawModeSupported(),
        internal_exitOnCtrlC: this.props.exitOnCtrlC,
        internal_eventEmitter: this.internal_eventEmitter
      }
    }, Sz.default.createElement(yS1.Provider, {
      value: {
        stdout: this.props.stdout,
        write: this.props.writeToStdout
      }
    }, Sz.default.createElement(kS1.Provider, {
      value: {
        stderr: this.props.stderr,
        write: this.props.writeToStderr
      }
    }, Sz.default.createElement(C31.Provider, {
      value: {
        activeId: this.state.activeFocusId,
        add: this.addFocusable,
        remove: this.removeFocusable,
        activate: this.activateFocusable,
        deactivate: this.deactivateFocusable,
        enableFocus: this.enableFocus,
        disableFocus: this.disableFocus,
        focusNext: this.focusNext,
        focusPrevious: this.focusPrevious,
        focus: this.focus
      }
    }, this.state.error ? Sz.default.createElement(gS1, {
      error: this.state.error
    }) : this.props.children))))))
  }
  componentDidMount() {
    ev.hide(this.props.stdout)
  }
  componentWillUnmount() {
    if (ev.show(this.props.stdout), this.incompleteEscapeTimer) clearTimeout(this.incompleteEscapeTimer), this.incompleteEscapeTimer = null;
    if (this.isRawModeSupported()) this.handleSetRawMode(!1)
  }
  componentDidCatch(A) {
    this.handleExit(A)
  }
  handleSetRawMode = (A) => {
    let {
      stdin: B
    } = this.props;
    if (!this.isRawModeSupported())
      if (B === process.stdin) throw new Error(`Raw mode is not supported on the current process.stdin, which Ink uses as input stream by default.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);
      else throw new Error(`Raw mode is not supported on the stdin provided to Ink.
Read about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported`);
    if (B.setEncoding("utf8"), A) {
      if (this.rawModeEnabledCount === 0) B.ref(), B.setRawMode(!0), B.addListener("readable", this.handleReadable), this.props.stdout.write("\x1B[?2004h");
      this.rawModeEnabledCount++;
      return
    }
    if (--this.rawModeEnabledCount === 0) this.props.stdout.write("\x1B[?2004l"), B.setRawMode(!1), B.removeListener("readable", this.handleReadable), B.unref()
  };
  flushIncomplete = () => {
    if (this.incompleteEscapeTimer = null, !this.keyParseState.incomplete) return;
    this.processInput(null)
  };
  processInput = (A) => {
    let [B, Q] = KmA(this.keyParseState, A);
    this.keyParseState = Q;
    for (let I of B) this.handleInput(I.sequence), this.internal_eventEmitter.emit("input", I);
    if (this.keyParseState.incomplete) {
      if (this.incompleteEscapeTimer) clearTimeout(this.incompleteEscapeTimer);
      this.incompleteEscapeTimer = setTimeout(this.flushIncomplete, this.keyParseState.mode === "IN_PASTE" ? this.PASTE_TIMEOUT : this.NORMAL_TIMEOUT)
    }
  };
  handleReadable = () => {
    let A;
    while ((A = this.props.stdin.read()) !== null) this.processInput(A)
  };
  handleInput = (A) => {
    if (A === "\x03" && this.props.exitOnCtrlC) this.handleExit();
    if (A === bA4 && this.state.activeFocusId) this.setState({
      activeFocusId: void 0
    });
    if (this.state.isFocusEnabled && this.state.focusables.length > 0) {
      if (A === fA4) this.focusNext();
      if (A === vA4) this.focusPrevious()
    }
  };
  handleExit = (A) => {
    if (this.isRawModeSupported()) this.handleSetRawMode(!1);
    this.props.onExit(A)
  };
  enableFocus = () => {
    this.setState({
      isFocusEnabled: !0
    })
  };
  disableFocus = () => {
    this.setState({
      isFocusEnabled: !1
    })
  };
  focus = (A) => {
    this.setState((B) => {
      if (!B.focusables.some((I) => I?.id === A)) return B;
      return {
        activeFocusId: A
      }
    })
  };
  focusNext = () => {
    this.setState((A) => {
      let B = A.focusables.find((I) => I.isActive)?.id;
      return {
        activeFocusId: this.findNextFocusable(A) ?? B
      }
    })
  };
  focusPrevious = () => {
    this.setState((A) => {
      let B = A.focusables.findLast((I) => I.isActive)?.id;
      return {
        activeFocusId: this.findPreviousFocusable(A) ?? B
      }
    })
  };
  addFocusable = (A, {
    autoFocus: B
  }) => {
    this.setState((Q) => {
      let I = Q.activeFocusId;
      if (!I && B) I = A;
      return {
        activeFocusId: I,
        focusables: [...Q.focusables, {
          id: A,
          isActive: !0
        }]
      }
    })
  };
  removeFocusable = (A) => {
    this.setState((B) => ({
      activeFocusId: B.activeFocusId === A ? void 0 : B.activeFocusId,
      focusables: B.focusables.filter((Q) => {
        return Q.id !== A
      })
    }))
  };
  activateFocusable = (A) => {
    this.setState((B) => ({
      focusables: B.focusables.map((Q) => {
        if (Q.id !== A) return Q;
        return {
          id: A,
          isActive: !0
        }
      })
    }))
  };
  deactivateFocusable = (A) => {
    this.setState((B) => ({
      activeFocusId: B.activeFocusId === A ? void 0 : B.activeFocusId,
      focusables: B.focusables.map((Q) => {
        if (Q.id !== A) return Q;
        return {
          id: A,
          isActive: !1
        }
      })
    }))
  };
  findNextFocusable = (A) => {
    let B = A.focusables.findIndex((Q) => {
      return Q.id === A.activeFocusId
    });
    for (let Q = B + 1; Q < A.focusables.length; Q++) {
      let I = A.focusables[Q];
      if (I?.isActive) return I.id
    }
    return
  };
  findPreviousFocusable = (A) => {
    let B = A.focusables.findIndex((Q) => {
      return Q.id === A.activeFocusId
    });
    for (let Q = B - 1; Q >= 0; Q--) {
      let I = A.focusables[Q];
      if (I?.isActive) return I.id
    }
    return
  }
}
// @from(Start 8813780, End 8813796)
Bb = Boolean(!1)
// @from(Start 8813800, End 8813814)
wmA = () => {}
// @from(Start 8813816, End 8819014)
class U31 {
  options;
  log;
  throttledLog;
  isUnmounted;
  lastOutput;
  lastOutputHeight;
  container;
  rootNode = null;
  fullStaticOutput;
  exitPromise;
  restoreConsole;
  unsubscribeResize;
  constructor(A) {
    this.options = A;
    if (TP1(this), this.log = dhA.create(A.stdout), this.throttledLog = A.debug ? this.log : r81(this.log, void 0, {
        leading: !0,
        trailing: !0
      }), this.isUnmounted = !1, this.lastOutput = "", this.lastOutputHeight = 0, this.fullStaticOutput = "", this.unsubscribeExit = mvA(this.unmount, {
        alwaysLast: !1
      }), A.patchConsole) this.patchConsole();
    if (!Bb) A.stdout.on("resize", this.resized), this.unsubscribeResize = () => {
      A.stdout.off("resize", this.resized)
    };
    if (this.rootNode = vB1("ink-root"), this.rootNode.onComputeLayout = this.calculateLayout, this.rootNode.onRender = A.debug ? this.onRender : r81(this.onRender, 32, {
        leading: !0,
        trailing: !0
      }), this.rootNode.onImmediateRender = this.onRender, this.container = jS.createContainer(this.rootNode, 0, null, !1, null, "id", () => {}, null), process.env.DEV === "true") jS.injectIntoDevTools({
      bundleType: 0,
      version: "16.13.1",
      rendererPackageName: "ink"
    })
  }
  resized = () => {
    this.calculateLayout(), this.onRender(!0)
  };
  resolveExitPromise = () => {};
  rejectExitPromise = () => {};
  unsubscribeExit = () => {};
  calculateLayout = () => {
    let A = this.options.stdout.columns || 80;
    if (!this.rootNode) return;
    this.rootNode.yogaNode.setWidth(A), this.rootNode.yogaNode.calculateLayout(void 0, void 0, SB1.DIRECTION_LTR)
  };
  setTheme(A) {
    this.options.theme = A
  }
  onRender(A = !1) {
    if (this.isUnmounted) return;
    if (!this.rootNode) return;
    let {
      output: B,
      outputHeight: Q,
      staticOutput: I
    } = _hA(this.rootNode, this.options.theme), G = I && I !== `
`;
    if (this.options.debug) {
      if (G) this.fullStaticOutput += I;
      this.options.stdout.write(this.fullStaticOutput + B);
      return
    }
    if (Bb) {
      if (G) this.options.stdout.write(I);
      this.lastOutput = B, this.lastOutputHeight = Q;
      return
    }
    if (G) this.fullStaticOutput += I;
    if (Q >= this.options.stdout.rows || this.lastOutputHeight >= this.options.stdout.rows) {
      if (this.options.onFlicker) this.options.onFlicker();
      this.options.stdout.write(BL.clearTerminal + this.fullStaticOutput + B + `
`), this.lastOutput = B, this.lastOutputHeight = Q, this.log.updateLineCount(B + `
`);
      return
    }
    if (A) {
      this.options.stdout.write(BL.clearTerminal + this.fullStaticOutput + B + `
`), this.lastOutput = B, this.lastOutputHeight = Q, this.log.updateLineCount(B + `
`);
      return
    }
    if (G) this.log.clear(), this.options.stdout.write(I), this.throttledLog(B);
    if (!G && B !== this.lastOutput) this.throttledLog(B);
    this.lastOutput = B, this.lastOutputHeight = Q
  }
  render(A) {
    let B = EmA.default.createElement(E31, {
      initialTheme: this.options.theme,
      stdin: this.options.stdin,
      stdout: this.options.stdout,
      stderr: this.options.stderr,
      writeToStdout: this.writeToStdout,
      writeToStderr: this.writeToStderr,
      exitOnCtrlC: this.options.exitOnCtrlC,
      onExit: this.unmount
    }, A);
    jS.updateContainer(B, this.container, null, wmA)
  }
  writeToStdout(A) {
    if (this.isUnmounted) return;
    if (this.options.debug) {
      this.options.stdout.write(A + this.fullStaticOutput + this.lastOutput);
      return
    }
    if (Bb) {
      this.options.stdout.write(A);
      return
    }
    this.log.clear(), this.options.stdout.write(A), this.log(this.lastOutput)
  }
  writeToStderr(A) {
    if (this.isUnmounted) return;
    if (this.options.debug) {
      this.options.stderr.write(A), this.options.stdout.write(this.fullStaticOutput + this.lastOutput);
      return
    }
    if (Bb) {
      this.options.stderr.write(A);
      return
    }
    this.log.clear(), this.options.stderr.write(A), this.log(this.lastOutput)
  }
  unmount(A) {
    if (this.isUnmounted) return;
    if (this.calculateLayout(), this.onRender(), this.unsubscribeExit(), typeof this.restoreConsole === "function") this.restoreConsole();
    if (typeof this.unsubscribeResize === "function") this.unsubscribeResize();
    if (Bb) this.options.stdout.write(this.lastOutput + `
`);
    else if (!this.options.debug) this.log.done();
    if (this.isUnmounted = !0, jS.updateContainer(null, this.container, null, wmA), fS.delete(this.options.stdout), A instanceof Error) this.rejectExitPromise(A);
    else this.resolveExitPromise()
  }
  async waitUntilExit() {
    return this.exitPromise ||= new Promise((A, B) => {
      this.resolveExitPromise = A, this.rejectExitPromise = B
    }), this.exitPromise
  }
  clear() {
    if (!Bb && !this.options.debug) this.log.clear()
  }
  patchConsole() {
    if (this.options.debug) return;
    this.restoreConsole = pvA((A, B) => {
      if (A === "stdout") this.writeToStdout(B);
      if (A === "stderr") {
        if (!B.startsWith("The above error occurred")) this.writeToStderr(B)
      }
    })
  }
}
// @from(Start 8819016, End 8819080)
function YmA(A) {
  fS.forEach((B) => {
    B.setTheme(A)
  })
}
// @from(Start 8819085, End 8819611)
hA4 = (A, B) => {
    let Q = mA4(B),
      I = {
        stdout: process.stdout,
        stdin: process.stdin,
        stderr: process.stderr,
        debug: !1,
        exitOnCtrlC: !0,
        patchConsole: !0,
        theme: Q.theme ?? ZA().theme,
        ...Q
      },
      G = dA4(I.stdout, () => new U31(I));
    return G.render(A), {
      rerender: G.render,
      unmount() {
        G.unmount()
      },
      waitUntilExit: G.waitUntilExit,
      cleanup: () => fS.delete(I.stdout),
      clear: G.clear
    }
  }
// @from(Start 8819615, End 8819623)
n5 = hA4
// @from(Start 8819627, End 8819749)
mA4 = (A = {}) => {
    if (A instanceof gA4) return {
      stdout: A,
      stdin: process.stdin
    };
    return A
  }
// @from(Start 8819753, End 8819845)
dA4 = (A, B) => {
    let Q = fS.get(A);
    if (!Q) Q = B(), fS.set(A, Q);
    return Q
  }
// @from(Start 8819851, End 8819867)
_z = I1(U1(), 1)
// @from(Start 8819873, End 8819890)
hS1 = I1(U1(), 1)
// @from(Start 8819894, End 8819911)
UmA = I1(U1(), 1)
// @from(Start 8819915, End 8819950)
NmA = hS1.default.createContext(!1)
// @from(Start 8819953, End 8820061)
function $mA({
  children: A
}) {
  return hS1.default.createElement(NmA.Provider, {
    value: !0
  }, A)
}
// @from(Start 8820063, End 8820110)
function N31() {
  return UmA.useContext(NmA)
}
// @from(Start 8820112, End 8820642)
function $31(A) {
  let {
    items: B,
    children: Q,
    style: I
  } = A, [G, Z] = _z.useState(0), D = _z.useMemo(() => {
    return B.slice(G)
  }, [B, G]);
  _z.useLayoutEffect(() => {
    Z(B.length)
  }, [B.length]);
  let Y = D.map((J, F) => {
      return Q(J, G + F)
    }),
    W = _z.useMemo(() => ({
      position: "absolute",
      flexDirection: "column",
      ...I
    }), [I]);
  return _z.default.createElement($mA, null, _z.default.createElement("ink-box", {
    internal_static: !0,
    style: W
  }, Y))
}
// @from(Start 8820647, End 8820664)
qmA = I1(U1(), 1)
// @from(Start 8820667, End 8820935)
function q31({
  children: A,
  transform: B
}) {
  if (A === void 0 || A === null) return null;
  return qmA.default.createElement("ink-text", {
    style: {
      flexGrow: 0,
      flexShrink: 1,
      flexDirection: "row"
    },
    internal_transform: B
  }, A)
}
// @from(Start 8820940, End 8820957)
MmA = I1(U1(), 1)
// @from(Start 8820960, End 8821063)
function UI({
  count: A = 1
}) {
  return MmA.default.createElement("ink-text", null, `
`.repeat(A))
}
// @from(Start 8821068, End 8821085)
uA4 = I1(U1(), 1)
// @from(Start 8821091, End 8821108)
mS1 = I1(U1(), 1)
// @from(Start 8821114, End 8821131)
LmA = I1(U1(), 1)
// @from(Start 8821137, End 8821168)
pA4 = () => LmA.useContext(V31)
// @from(Start 8821172, End 8821180)
Qb = pA4
// @from(Start 8821186, End 8822754)
cA4 = (A, B = {}) => {
    let {
      stdin: Q,
      setRawMode: I,
      internal_exitOnCtrlC: G,
      internal_eventEmitter: Z
    } = Qb();
    mS1.useEffect(() => {
      if (B.isActive === !1) return;
      return I(!0), () => {
        I(!1)
      }
    }, [B.isActive, I]), mS1.useEffect(() => {
      if (B.isActive === !1) return;
      let D = (Y) => {
        let W = {
            upArrow: Y.name === "up",
            downArrow: Y.name === "down",
            leftArrow: Y.name === "left",
            rightArrow: Y.name === "right",
            pageDown: Y.name === "pagedown",
            pageUp: Y.name === "pageup",
            home: Y.name === "home",
            end: Y.name === "end",
            return: Y.name === "return",
            escape: Y.name === "escape",
            fn: Y.fn,
            ctrl: Y.ctrl,
            shift: Y.shift,
            tab: Y.name === "tab",
            backspace: Y.name === "backspace",
            delete: Y.name === "delete",
            meta: Y.meta || Y.name === "escape" || Y.option
          },
          J = Y.ctrl ? Y.name : Y.sequence;
        if (J === void 0) return;
        if (Y.name && zmA.includes(Y.name)) J = "";
        if (J.startsWith("\x1B")) J = J.slice(1);
        if (J.length === 1 && typeof J[0] === "string" && J[0].toUpperCase() === J[0]) W.shift = !0;
        if (!(J === "c" && W.ctrl) || !G) jS.batchedUpdates(() => {
          A(J, W)
        })
      };
      return Z?.on("input", D), () => {
        Z?.removeListener("input", D)
      }
    }, [B.isActive, Q, G, A])
  }
// @from(Start 8822758, End 8822766)
Z0 = cA4
// @from(Start 8822772, End 8822789)
lA4 = I1(U1(), 1)
// @from(Start 8822795, End 8822812)
iA4 = I1(U1(), 1)
// @from(Start 8822818, End 8822835)
nA4 = I1(U1(), 1)
// @from(Start 8822841, End 8822858)
dS1 = I1(U1(), 1)
// @from(Start 8822864, End 8822881)
aA4 = I1(U1(), 1)
// @from(Start 8822887, End 8823004)
sA4 = (A) => ({
    width: A.yogaNode?.getComputedWidth() ?? 0,
    height: A.yogaNode?.getComputedHeight() ?? 0
  })
// @from(Start 8823008, End 8823017)
M31 = sA4
// @from(Start 8823020, End 8823128)
function EC(A) {
  for (let B = 0; B < A.length; B += 2000) process.stdout.write(A.substring(B, B + 2000))
}
// @from(Start 8823130, End 8823221)
function L31() {
  return process.argv.includes("--debug") || process.argv.includes("-d")
}
// @from(Start 8823223, End 8823308)
function O9(A) {
  if (!L31()) return;
  console.log(UA.dim(`[DEBUG] ${A.trim()}`))
}
// @from(Start 8823310, End 8823404)
function M6(A) {
  if (!L31()) return;
  EC(V9("error", ZA().theme)(`[ERROR] ${A.trim()}
`))
}
// @from(Start 8823409, End 8823431)
uS1 = ["macos", "wsl"]
// @from(Start 8823435, End 8824079)
Z7 = L0(() => {
    try {
      if (process.platform === "darwin") return "macos";
      if (process.platform === "win32") return "windows";
      if (process.platform === "linux") {
        try {
          let A = x1().readFileSync("/proc/version", {
            encoding: "utf8"
          });
          if (A.toLowerCase().includes("microsoft") || A.toLowerCase().includes("wsl")) return "wsl"
        } catch (A) {
          b1(A instanceof Error ? A : new Error(String(A)))
        }
        return "linux"
      }
      return "unknown"
    } catch (A) {
      return b1(A instanceof Error ? A : new Error(String(A))), "unknown"
    }
  })
// @from(Start 8824162, End 8824296)
jz = L0(async () => {
    let {
      code: A
    } = await u0("git", ["rev-parse", "--is-inside-work-tree"]);
    return A === 0
  })
// @from(Start 8824300, End 8824487)
RmA = async (A) => {
    let {
      code: B
    } = await PD("git", ["rev-parse", "--is-inside-work-tree"], {
      preserveOutputOnError: !1,
      cwd: A
    });
    return B === 0
  }
// @from(Start 8824493, End 8824600)
oA4 = async () => {
  let {
    stdout: A
  } = await u0("git", ["rev-parse", "HEAD"]);
  return A.trim()
}
// @from(Start 8824602, End 8824762)
OmA = async () => {
  let {
    stdout: A
  } = await u0("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    preserveOutputOnError: !1
  });
  return A.trim()
}
// @from(Start 8824764, End 8824948)
TmA = async () => {
  let {
    stdout: A,
    code: B
  } = await u0("git", ["remote", "get-url", "origin"], {
    preserveOutputOnError: !1
  });
  return B === 0 ? A.trim() : null
}
// @from(Start 8824950, End 8825091)
tA4 = async () => {
  let {
    code: A
  } = await u0("git", ["rev-parse", "@{u}"], {
    preserveOutputOnError: !1
  });
  return A === 0
}
// @from(Start 8825093, End 8825254)
PmA = async () => {
  let {
    stdout: A
  } = await u0("git", ["status", "--porcelain"], {
    preserveOutputOnError: !1
  });
  return A.trim().length === 0
}
// @from(Start 8825256, End 8825511)
kn = async () => {
  try {
    let {
      stdout: A,
      code: B
    } = await u0("git", ["worktree", "list"], {
      preserveOutputOnError: !1
    });
    if (B !== 0) return 0;
    return A.trim().split(`
`).length
  } catch (A) {
    return 0
  }
}
// @from(Start 8825513, End 8825819)
async function SmA() {
  try {
    let [A, B, Q, I, G, Z] = await Promise.all([oA4(), OmA(), TmA(), tA4(), PmA(), kn()]);
    return {
      commitHash: A,
      branchName: B,
      remoteUrl: Q,
      isHeadOnRemote: I,
      isClean: G,
      worktreeCount: Z
    }
  } catch (A) {
    return null
  }
}
// @from(Start 8825820, End 8825978)
async function eA4(A, B) {
  let {
    code: Q
  } = await PD("git", ["check-ignore", A], {
    preserveOutputOnError: !1,
    cwd: B
  });
  return Q === 0
}
// @from(Start 8825980, End 8826046)
function A04() {
  return _mA(jmA(), ".config", "git", "ignore")
}
// @from(Start 8826047, End 8826462)
async function R31(A, B = dA()) {
  try {
    if (!await RmA(B)) return;
    let Q = `**/${A}`;
    if (await eA4(A, B)) return;
    let I = A04(),
      G = x1(),
      Z = _mA(jmA(), ".config", "git");
    if (!G.existsSync(Z)) G.mkdirSync(Z);
    if (G.existsSync(I)) G.appendFileSync(I, `
${Q}
`);
    else G.appendFileSync(I, `${Q}
`)
  } catch (Q) {
    b1(Q instanceof Error ? Q : new Error(String(Q)))
  }
}
// @from(Start 8826464, End 8826623)
function pS1() {
  switch (Z7()) {
    case "macos":
      return "/Library/Application Support/ClaudeCode";
    default:
      return "/etc/claude-code"
  }
}
// @from(Start 8826625, End 8826687)
function Q04() {
  return xn(pS1(), "managed-settings.json")
}
// @from(Start 8826689, End 8827178)
function I04(A) {
  if (!x1().existsSync(A)) return null;
  try {
    let B = wI(A),
      Q = Z8(B),
      I = kfA.safeParse(Q);
    if (!I.success) return b1(new Error(`Invalid settings: ${I.error.message}`)), null;
    return I.data
  } catch (B) {
    if (typeof B === "object" && B && "code" in B && B.code === "ENOENT") O9(`Broken symlink or missing file encountered for settings.json at path: ${A}`);
    else b1(B instanceof Error ? B : new Error(String(B)));
    return null
  }
}
// @from(Start 8827180, End 8827371)
function g81(A) {
  switch (A) {
    case "userSettings":
      return ymA(S4());
    case "policySettings":
    case "projectSettings":
    case "localSettings":
      return ymA(e9())
  }
}
// @from(Start 8827373, End 8827610)
function h81(A) {
  switch (A) {
    case "userSettings":
      return xn(g81(A), "settings.json");
    case "projectSettings":
    case "localSettings":
      return xn(g81(A), fn(A));
    case "policySettings":
      return Q04()
  }
}
// @from(Start 8827612, End 8827798)
function fn(A) {
  switch (A) {
    case "projectSettings":
      return xn(".claude", "settings.json");
    case "localSettings":
      return xn(".claude", "settings.local.json")
  }
}
// @from(Start 8827800, End 8827839)
function KC(A) {
  return I04(h81(A))
}
// @from(Start 8827841, End 8828115)
function qB(A, B) {
  if (A === "policySettings") return;
  let Q = h81(A),
    I = B04(Q);
  if (!x1().existsSync(I)) x1().mkdirSync(I);
  let Z = {
    ...KC(A),
    ...B
  };
  if (eM(Q, JSON.stringify(Z, null, 2)), A === "localSettings") R31(fn("localSettings"), e9())
}
// @from(Start 8828117, End 8828195)
function G04(A, B) {
  let Q = [...A, ...B];
  return Array.from(new Set(Q))
}
// @from(Start 8828197, End 8828407)
function m6() {
  let A = {};
  for (let B of nM) {
    let Q = KC(B);
    if (Q) A = SU1(A, Q, (I, G) => {
      if (Array.isArray(I) && Array.isArray(G)) return G04(I, G);
      return
    })
  }
  return A
}
// @from(Start 8828409, End 8829156)
function kmA(A, B = 300000) {
  let Q = new Map,
    I = (...G) => {
      let Z = JSON.stringify(G),
        D = Q.get(Z),
        Y = Date.now();
      if (!D) Q.set(Z, {
        value: A(...G),
        timestamp: Y,
        refreshing: !1
      });
      if (D && Y - D.timestamp > B && !D.refreshing) return D.refreshing = !0, Promise.resolve().then(() => {
        let W = A(...G);
        Q.set(Z, {
          value: W,
          timestamp: Date.now(),
          refreshing: !1
        })
      }).catch((W) => {
        b1(W instanceof Error ? W : new Error(String(W)));
        let J = Q.get(Z);
        if (J) J.refreshing = !1
      }), D.value;
      return Q.get(Z).value
    };
  return I.cache = {
    clear: () => Q.clear()
  }, I
}
// @from(Start 8829204, End 8829374)
function vn(A = "") {
  let B = S4(),
    I = !process.env.CLAUDE_CONFIG_DIR ? "" : `-${Z04("sha256").update(B).digest("hex").substring(0,8)}`;
  return `${m0}${A}${I}`
}
// @from(Start 8829376, End 8830131)
function xmA() {
  let A = vn("-credentials");
  return {
    name: "keychain",
    read() {
      try {
        let B = NZ(`security find-generic-password -a $USER -w -s "${A}"`);
        if (B) return JSON.parse(B)
      } catch (B) {
        return null
      }
      return null
    },
    update(B) {
      try {
        let I = JSON.stringify(B).replace(/"/g, "\\\""),
          G = `security add-generic-password -U -a $USER -s "${A}" -w "${I}"`;
        return NZ(G), {
          success: !0
        }
      } catch (Q) {
        return {
          success: !1
        }
      }
    },
    delete() {
      try {
        return NZ(`security delete-generic-password -a $USER -s "${A}"`), !0
      } catch (B) {
        return !1
      }
    }
  }
}
// @from(Start 8830171, End 8831100)
function cS1() {
  let A = S4(),
    B = ".credentials.json",
    Q = D04(A, ".credentials.json");
  return {
    name: "plaintext",
    read() {
      if (x1().existsSync(Q)) try {
        let I = x1().readFileSync(Q, {
          encoding: "utf8"
        });
        return JSON.parse(I)
      } catch (I) {
        return null
      }
      return null
    },
    update(I) {
      try {
        if (!x1().existsSync(A)) x1().mkdirSync(A);
        return x1().writeFileSync(Q, JSON.stringify(I), {
          encoding: "utf8",
          flush: !1
        }), x1().chmodSync(Q, 384), {
          success: !0,
          warning: "Warning: Storing credentials in plaintext."
        }
      } catch (G) {
        return {
          success: !1
        }
      }
    },
    delete() {
      if (x1().existsSync(Q)) try {
        return x1().unlinkSync(Q), !0
      } catch (I) {
        return !1
      }
      return !0
    }
  }
}
// @from(Start 8831102, End 8831661)
function Y04(A) {
  let B = cS1();
  return {
    name: `${A.name}-with-${B.name}-fallback`,
    read() {
      let Q = A.read();
      if (Q !== null && Q !== void 0) return Q;
      return B.read() || {}
    },
    update(Q) {
      let I = A.update(Q);
      if (I.success) return B.delete(), I;
      let G = B.update(Q);
      if (G.success) return {
        success: !0,
        warning: G.warning
      };
      return {
        success: !1
      }
    },
    delete() {
      let Q = A.delete(),
        I = B.delete();
      return Q || I
    }
  }
}
// @from(Start 8831663, End 8831775)
function VJ() {
  if (process.platform === "darwin") {
    let A = xmA();
    return Y04(A)
  }
  return cS1()
}
// @from(Start 8831776, End 8832147)
async function fmA(A) {
  let Q = ZA().oauthAccount?.accountUuid,
    I = qG(A);
  if (!Q || !I) return;
  let G = `${BB().BASE_API_URL}/api/claude_cli_profile`;
  try {
    return (await P4.get(G, {
      headers: {
        "x-api-key": I,
        "anthropic-beta": Kf
      },
      params: {
        account_uuid: Q
      }
    })).data
  } catch (Z) {
    b1(Z)
  }
}
// @from(Start 8832148, End 8832412)
async function vmA(A) {
  let B = `${BB().BASE_API_URL}/api/oauth/profile`;
  try {
    return (await P4.get(B, {
      headers: {
        Authorization: `Bearer ${A}`,
        "Content-Type": "application/json"
      }
    })).data
  } catch (Q) {
    b1(Q)
  }
}
// @from(Start 8832414, End 8832467)
function CL(A) {
  return Boolean(A?.includes(YzA))
}
// @from(Start 8832469, End 8832533)
function O31(A) {
  return A?.split(" ").filter(Boolean) ?? []
}
// @from(Start 8832535, End 8833191)
function lS1({
  codeChallenge: A,
  state: B,
  isManual: Q,
  loginWithClaudeAi: I
}) {
  let G = I ? BB().CLAUDE_AI_AUTHORIZE_URL : BB().CONSOLE_AUTHORIZE_URL,
    Z = new URL(G);
  return Z.searchParams.append("code", "true"), Z.searchParams.append("client_id", BB().CLIENT_ID), Z.searchParams.append("response_type", "code"), Z.searchParams.append("redirect_uri", Q ? BB().MANUAL_REDIRECT_URL : `http://localhost:${BB().REDIRECT_PORT}/callback`), Z.searchParams.append("scope", BB().SCOPES.join(" ")), Z.searchParams.append("code_challenge", A), Z.searchParams.append("code_challenge_method", "S256"), Z.searchParams.append("state", B), Z.toString()
}
// @from(Start 8833192, End 8833784)
async function bmA(A, B, Q, I = !1) {
  let G = {
      grant_type: "authorization_code",
      code: A,
      redirect_uri: I ? BB().MANUAL_REDIRECT_URL : `http://localhost:${BB().REDIRECT_PORT}/callback`,
      client_id: BB().CLIENT_ID,
      code_verifier: Q,
      state: B
    },
    Z = await P4.post(BB().TOKEN_URL, G, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  if (Z.status !== 200) throw new Error(Z.status === 401 ? "Authentication failed: Invalid authorization code" : `Token exchange failed (${Z.status}): ${Z.statusText}`);
  return Z.data
}
// @from(Start 8833785, End 8834581)
async function gmA(A) {
  let B = {
    grant_type: "refresh_token",
    refresh_token: A,
    client_id: BB().CLIENT_ID
  };
  try {
    let Q = await P4.post(BB().TOKEN_URL, B, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (Q.status !== 200) throw new Error(`Token refresh failed: ${Q.statusText}`);
    let I = Q.data,
      {
        access_token: G,
        refresh_token: Z = A,
        expires_in: D
      } = I,
      Y = Date.now() + D * 1000,
      W = O31(I.scope);
    E1("tengu_oauth_token_refresh_success", {});
    let J = await iS1(G);
    return {
      accessToken: G,
      refreshToken: Z,
      expiresAt: Y,
      scopes: W,
      subscriptionType: J
    }
  } catch (Q) {
    throw E1("tengu_oauth_token_refresh_failure", {}), Q
  }
}
// @from(Start 8834582, End 8835159)
async function hmA(A) {
  let B = await P4.get(BB().ROLES_URL, {
    headers: {
      Authorization: `Bearer ${A}`
    }
  });
  if (B.status !== 200) throw new Error(`Failed to fetch user roles: ${B.statusText}`);
  let Q = B.data,
    I = ZA();
  if (!I.oauthAccount) throw new Error("OAuth account information not found in config");
  I.oauthAccount.organizationRole = Q.organization_role, I.oauthAccount.workspaceRole = Q.workspace_role, I.oauthAccount.organizationName = Q.organization_name, j0(I), E1("tengu_oauth_roles_stored", {
    org_role: Q.organization_role
  })
}
// @from(Start 8835160, End 8835632)
async function mmA(A) {
  try {
    let B = await P4.post(BB().API_KEY_URL, null, {
        headers: {
          Authorization: `Bearer ${A}`
        }
      }),
      Q = B.data?.raw_key;
    if (Q) return dmA(Q), E1("tengu_oauth_api_key", {
      status: "success",
      statusCode: B.status
    }), Q;
    return null
  } catch (B) {
    throw E1("tengu_oauth_api_key", {
      status: "failure",
      error: B instanceof Error ? B.message : String(B)
    }), B
  }
}
// @from(Start 8835634, End 8835687)
function T31(A) {
  return Date.now() + 300000 >= A
}
// @from(Start 8835688, End 8835997)
async function iS1(A) {
  switch ((await vmA(A))?.organization?.organization_type) {
    case "claude_max":
      return "max";
    case "claude_pro":
      return "pro";
    case "claude_enterprise":
      return "enterprise";
    case "claude_team":
      return "team";
    default:
      return null
  }
}
// @from(Start 8836002, End 8836020)
CdA = I1(W_1(), 1)
// @from(Start 8836026, End 8836038)
r04 = 300000
// @from(Start 8836041, End 8836332)
function mS() {
  let A = process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX,
    B = m6().apiKeyHelper,
    Q = process.env.ANTHROPIC_AUTH_TOKEN || B,
    {
      source: I
    } = GX(V9A());
  return !(A || Q || (I === "ANTHROPIC_API_KEY" || I === "apiKeyHelper"))
}
// @from(Start 8836334, End 8836693)
function h31() {
  if (process.env.ANTHROPIC_AUTH_TOKEN) return {
    source: "ANTHROPIC_AUTH_TOKEN",
    hasToken: !0
  };
  if (dS()) return {
    source: "apiKeyHelper",
    hasToken: !0
  };
  let B = $Z();
  if (CL(B?.scopes) && B?.accessToken) return {
    source: "claude.ai",
    hasToken: !0
  };
  return {
    source: "none",
    hasToken: !1
  }
}
// @from(Start 8836695, End 8836756)
function qG(A) {
  let {
    key: B
  } = GX(A);
  return B
}
// @from(Start 8836758, End 8837494)
function GX(A) {
  if (A && process.env.ANTHROPIC_API_KEY) return {
    key: process.env.ANTHROPIC_API_KEY,
    source: "ANTHROPIC_API_KEY"
  };
  if (!1 === "true") {
    if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY env var is required");
    return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    }
  }
  if (process.env.ANTHROPIC_API_KEY && ZA().customApiKeyResponses?.approved?.includes(CJ(process.env.ANTHROPIC_API_KEY))) return {
    key: process.env.ANTHROPIC_API_KEY,
    source: "ANTHROPIC_API_KEY"
  };
  let B = dS();
  if (B) return {
    key: B,
    source: "apiKeyHelper"
  };
  let Q = un();
  if (Q) return Q;
  return {
    key: null,
    source: "none"
  }
}
// @from(Start 8837496, End 8837773)
function o04() {
  let A = process.env.CLAUDE_CODE_API_KEY_HELPER_TTL_MS;
  if (A) {
    let B = parseInt(A, 10);
    if (!Number.isNaN(B) && B >= 0) return B;
    M6(`Found CLAUDE_CODE_API_KEY_HELPER_TTL_MS env var, but it was not a valid number. Got ${A}`)
  }
  return r04
}
// @from(Start 8837778, End 8838293)
dS = kmA(() => {
  let B = m6().apiKeyHelper;
  if (!B) return null;
  try {
    let Q = NZ(B)?.toString().trim();
    if (!Q) throw new Error("apiKeyHelper did not return a valid value");
    return Q
  } catch (Q) {
    let I = UA.red("Error getting API key from apiKeyHelper (in settings or ~/.claude.json):");
    if (Q instanceof Error && "stderr" in Q) console.error(I, String(Q.stderr));
    else if (Q instanceof Error) console.error(I, Q.message);
    else console.error(I, Q);
    return " "
  }
}, o04())
// @from(Start 8838296, End 8838333)
function KdA() {
  dS.cache.clear()
}
// @from(Start 8838335, End 8838375)
function CJ(A) {
  return A.slice(-20)
}
// @from(Start 8838380, End 8838789)
un = L0(() => {
  if (process.platform === "darwin") {
    let B = vn();
    try {
      let Q = NZ(`security find-generic-password -a $USER -w -s "${B}"`);
      if (Q) return {
        key: Q,
        source: "/login managed key"
      }
    } catch (Q) {
      b1(Q)
    }
  }
  let A = ZA();
  if (!A.primaryApiKey) return null;
  return {
    key: A.primaryApiKey,
    source: "/login managed key"
  }
})
// @from(Start 8838792, End 8838847)
function t04(A) {
  return /^[a-zA-Z0-9-_]+$/.test(A)
}
// @from(Start 8838849, End 8839551)
function dmA(A) {
  if (!t04(A)) throw new Error("Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores.");
  let B = ZA();
  if (wdA(), process.platform === "darwin") try {
    let I = vn();
    NZ(`security add-generic-password -a $USER -s "${I}" -w ${A}`)
  } catch (I) {
    b1(I), B.primaryApiKey = A
  } else B.primaryApiKey = A;
  if (!B.customApiKeyResponses) B.customApiKeyResponses = {
    approved: [],
    rejected: []
  };
  if (!B.customApiKeyResponses.approved) B.customApiKeyResponses.approved = [];
  let Q = CJ(A);
  if (!B.customApiKeyResponses.approved.includes(Q)) B.customApiKeyResponses.approved.push(Q);
  j0(B), un.cache.clear?.()
}
// @from(Start 8839553, End 8839665)
function HdA(A) {
  let B = ZA(),
    Q = CJ(A);
  return B.customApiKeyResponses?.approved?.includes(Q) ?? !1
}
// @from(Start 8839667, End 8839764)
function zdA() {
  wdA();
  let A = ZA();
  A.primaryApiKey = void 0, j0(A), un.cache.clear?.()
}
// @from(Start 8839766, End 8839937)
function wdA() {
  if (process.platform === "darwin") try {
    let A = vn();
    NZ(`security delete-generic-password -a $USER -s "${A}"`)
  } catch (A) {
    b1(A)
  }
}
// @from(Start 8839939, End 8840449)
function J_1(A) {
  if (!CL(A.scopes)) return {
    success: !0
  };
  try {
    let B = VJ(),
      Q = B.read() || {};
    Q.claudeAiOauth = {
      accessToken: A.accessToken,
      refreshToken: A.refreshToken,
      expiresAt: A.expiresAt,
      scopes: A.scopes,
      subscriptionType: A.subscriptionType
    };
    let I = B.update(Q);
    return $Z.cache?.clear?.(), jY.cache?.clear?.(), I
  } catch (B) {
    return b1(B), {
      success: !1,
      warning: "Failed to save OAuth tokens"
    }
  }
}
// @from(Start 8840454, End 8840762)
$Z = L0(() => {
  try {
    let Q = VJ().read()?.claudeAiOauth;
    if (!Q?.accessToken) return null;
    if (!Q.subscriptionType) {
      let I = Q.isMax === !1 ? "pro" : "max";
      return {
        ...Q,
        subscriptionType: I
      }
    }
    return Q
  } catch (A) {
    return b1(A), null
  }
})
// @from(Start 8840764, End 8841566)
async function F_1(A = 0) {
  let Q = $Z();
  if (!Q?.refreshToken || !T31(Q.expiresAt)) return !1;
  if ($Z.cache?.clear?.(), Q = $Z(), !Q?.refreshToken || !T31(Q.expiresAt)) return !1;
  let I = S4();
  x1().mkdirSync(I);
  let Z;
  try {
    Z = await CdA.lock(I)
  } catch (D) {
    if (D.code === "ELOCKED") {
      if (A < 5) return await new Promise((Y) => setTimeout(Y, 1000 + Math.random() * 1000)), F_1(A + 1);
      return !1
    }
    return b1(D), !1
  }
  try {
    if ($Z.cache?.clear?.(), Q = $Z(), !Q?.refreshToken || !T31(Q.expiresAt)) return !1;
    let D = await gmA(Q.refreshToken);
    return J_1({
      ...D,
      scopes: Q.scopes
    }), $Z.cache?.clear?.(), !0
  } catch (D) {
    return b1(D instanceof Error ? D : new Error(String(D))), !1
  } finally {
    await Z()
  }
}
// @from(Start 8841568, End 8841635)
function T9() {
  if (!mS()) return !1;
  return CL($Z()?.scopes)
}
// @from(Start 8841637, End 8841730)
function qZ() {
  let A = UdA();
  return A === "max" || A === "enterprise" || A === "team"
}
// @from(Start 8841732, End 8841764)
function EdA() {
  return qZ()
}
// @from(Start 8841766, End 8841885)
function UdA() {
  if (!mS()) return null;
  let A = $Z();
  if (!A) return null;
  return A.subscriptionType ?? null
}
// @from(Start 8841887, End 8842155)
function m31() {
  switch (UdA()) {
    case "enterprise":
      return "Claude Enterprise";
    case "team":
      return "Claude Team";
    case "max":
      return "Claude Max";
    case "pro":
      return "Claude Pro";
    default:
      return "Claude API"
  }
}
// @from(Start 8842157, End 8842261)
function Yb() {
  return !!(process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX)
}
// @from(Start 8842263, End 8842535)
function e04(A) {
  let B = MQ();
  if (B === "bedrock") return !1;
  else if (B === "firstParty") return A.includes("claude-3-7") || A.includes("claude-opus-4") || A.includes("claude-sonnet-4");
  else return A.includes("claude-opus-4") || A.includes("claude-sonnet-4")
}
// @from(Start 8842540, End 8842975)
jY = L0((A) => {
  let B = [],
    Q = A.includes("haiku");
  if (!Q) B.push(ZzA);
  if (T9()) B.push(Kf);
  if (!yY(process.env.DISABLE_INTERLEAVED_THINKING) && e04(A)) B.push(W51);
  if (MQ() === "firstParty" && !yY(process.env.CLAUDE_CODE_DISABLE_FINE_GRAINED_TOOL_STREAMING)) B.push(DzA);
  if (process.env.ANTHROPIC_BETAS && !Q) B.push(...process.env.ANTHROPIC_BETAS.split(",").map((G) => G.trim()).filter(Boolean));
  return B
})
// @from(Start 8842981, End 8843139)
uS = {
    firstParty: "claude-3-7-sonnet-20250219",
    bedrock: "us.anthropic.claude-3-7-sonnet-20250219-v1:0",
    vertex: "claude-3-7-sonnet@20250219"
  }
// @from(Start 8843143, End 8843301)
pS = {
    firstParty: "claude-3-5-sonnet-20241022",
    bedrock: "anthropic.claude-3-5-sonnet-20241022-v2:0",
    vertex: "claude-3-5-sonnet-v2@20241022"
  }
// @from(Start 8843305, End 8843460)
pn = {
    firstParty: "claude-3-5-haiku-20241022",
    bedrock: "us.anthropic.claude-3-5-haiku-20241022-v1:0",
    vertex: "claude-3-5-haiku@20241022"
  }
// @from(Start 8843464, End 8843616)
UC = {
    firstParty: "claude-sonnet-4-20250514",
    bedrock: "us.anthropic.claude-sonnet-4-20250514-v1:0",
    vertex: "claude-sonnet-4@20250514"
  }
// @from(Start 8843620, End 8843766)
GN = {
    firstParty: "claude-opus-4-20250514",
    bedrock: "us.anthropic.claude-opus-4-20250514-v1:0",
    vertex: "claude-opus-4@20250514"
  }
// @from(Start 8843769, End 8844131)
function NdA(A) {
  let B = A.toLowerCase();
  if (B.includes("claude-sonnet-4")) return "Sonnet 4";
  if (B.includes("claude-opus-4")) return "Opus 4";
  if (B.includes("claude-3-7-sonnet")) return "Claude 3.7 Sonnet";
  if (B.includes("claude-3-5-sonnet")) return "Claude 3.5 Sonnet";
  if (B.includes("claude-3-5-haiku")) return "Claude 3.5 Haiku";
  return
}
// @from(Start 8844136, End 8844154)
zG1 = I1(rG0(), 1)
// @from(Start 8844160, End 8844526)
oG0 = L0(async function() {
  let A = Xg(),
    B = new zG1.BedrockClient({
      region: A
    }),
    Q = new zG1.ListInferenceProfilesCommand;
  try {
    return ((await B.send(Q)).inferenceProfileSummaries || []).filter((Y) => Y.inferenceProfileId?.includes("anthropic")).map((Y) => Y.inferenceProfileId).filter(Boolean)
  } catch (I) {
    throw b1(I), I
  }
})
// @from(Start 8844529, End 8844596)
function Fg(A, B) {
  return A.find((Q) => Q.includes(B)) ?? null
}
// @from(Start 8844598, End 8845190)
function wG1(A) {
  let B = [],
    Q = !1;
  async function I() {
    if (Q) return;
    if (B.length === 0) return;
    Q = !0;
    while (B.length > 0) {
      let {
        args: G,
        resolve: Z,
        reject: D,
        context: Y
      } = B.shift();
      try {
        let W = await A.apply(Y, G);
        Z(W)
      } catch (W) {
        D(W)
      }
    }
    if (Q = !1, B.length > 0) I()
  }
  return function(...G) {
    return new Promise((Z, D) => {
      B.push({
        args: G,
        resolve: Z,
        reject: D,
        context: this
      }), I()
    })
  }
}
// @from(Start 8845192, End 8845327)
function EG1(A) {
  return {
    haiku35: pn[A],
    sonnet35: pS[A],
    sonnet37: uS[A],
    sonnet40: UC[A],
    opus40: GN[A]
  }
}
// @from(Start 8845328, End 8845869)
async function ox4() {
  let A;
  try {
    A = await oG0()
  } catch (D) {
    return b1(D), EG1("bedrock")
  }
  if (!A?.length) return EG1("bedrock");
  let B = Fg(A, "claude-3-5-haiku-20241022"),
    Q = Fg(A, "claude-3-5-sonnet-20241022"),
    I = Fg(A, "claude-3-7-sonnet-20250219"),
    G = Fg(A, "claude-sonnet-4-20250514"),
    Z = Fg(A, "claude-opus-4-20250514");
  return {
    haiku35: B || pn.bedrock,
    sonnet35: Q || pS.bedrock,
    sonnet37: I || uS.bedrock,
    sonnet40: G || UC.bedrock,
    opus40: Z || GN.bedrock
  }
}
// @from(Start 8845874, End 8846004)
tx4 = wG1(async () => {
  if (K21() !== null) return;
  try {
    let A = await ox4();
    UU1(A)
  } catch (A) {
    b1(A)
  }
})
// @from(Start 8846007, End 8846126)
function ex4() {
  if (K21() !== null) return;
  if (MQ() !== "bedrock") {
    UU1(EG1(MQ()));
    return
  }
  tx4()
}
// @from(Start 8846128, End 8846216)
function zX() {
  let A = K21();
  if (A === null) return ex4(), EG1(MQ());
  return A
}
// @from(Start 8846221, End 8846229)
Af4 = UC
// @from(Start 8846233, End 8846253)
tG0 = Af4.firstParty
// @from(Start 8846256, End 8846337)
function K_() {
  return process.env.ANTHROPIC_SMALL_FAST_MODEL || zX().haiku35
}
// @from(Start 8846339, End 8846385)
function UG1(A) {
  return A === zX().opus40
}
// @from(Start 8846387, End 8846578)
function Vg() {
  let A, B = A9A();
  if (B !== void 0) A = B;
  else A = process.env.ANTHROPIC_MODEL || m6().model || void 0;
  if (T9() && !qZ() && A?.includes("opus")) return;
  return A
}
// @from(Start 8846580, End 8846714)
function J7() {
  let A = Vg();
  if (A !== void 0 && A !== null) return Cg(A);
  if (A === null && HP()) return wX();
  return sa()
}
// @from(Start 8846716, End 8846805)
function eG0() {
  if (MQ() === "bedrock") return zX().sonnet37;
  return zX().sonnet40
}
// @from(Start 8846810, End 8846843)
xY8 = L0(() => {
  return null
})
// @from(Start 8846846, End 8846910)
function sa() {
  if (qZ()) return zX().opus40;
  return eG0()
}
// @from(Start 8846912, End 8846944)
function wX() {
  return eG0()
}
// @from(Start 8846946, End 8847051)
function kC(A) {
  let B = A.match(/(claude-(\d+-\d+-)?\w+)/);
  if (B && B[1]) return B[1];
  return A
}
// @from(Start 8847053, End 8847331)
function NG1() {
  if (T9() && !qZ()) return $G1.description;
  let A = ZA().fallbackAvailableWarningThreshold;
  if (A === void 0) return "Use Opus 4 or Sonnet 4 based on Max usage limits";
  return `Opus 4 for up to ${(A*100).toFixed(0)}% of usage limits, then use Sonnet 4`
}
// @from(Start 8847333, End 8847461)
function H_(A) {
  if (A === zX().opus40) return "Opus 4";
  if (A === zX().sonnet40) return "Sonnet 4";
  return "Sonnet 3.7"
}
// @from(Start 8847463, End 8847839)
function C_() {
  if (T9() && !qZ()) return {
    value: null,
    label: "Sonnet",
    description: $G1.description
  };
  if (qZ()) return {
    value: null,
    label: "Default (recommended)",
    description: NG1()
  };
  return {
    value: null,
    label: "Default (recommended)",
    description: `Use the default model (currently ${H_(sa())}) · $3/$15 per Mtok`
  }
}
// @from(Start 8847844, End 8847957)
AZ0 = {
    value: "sonnet",
    label: "Sonnet",
    description: "Sonnet 4 for daily use · $3/$15 per Mtok"
  }
// @from(Start 8847961, End 8848073)
vf1 = {
    value: "opus",
    label: "Opus",
    description: "Opus 4 for complex tasks · $15/$75 per Mtok"
  }
// @from(Start 8848077, End 8848204)
Bf4 = {
    value: "opus",
    label: "Opus",
    description: "Opus 4 for complex tasks · Reaches usage limits ~5x faster"
  }
// @from(Start 8848208, End 8848303)
$G1 = {
    value: "sonnet",
    label: "Sonnet",
    description: "Sonnet 4 for daily use"
  }
// @from(Start 8848306, End 8848469)
function Qf4() {
  if (T9() && !qZ()) return [C_()];
  if (qZ()) return [C_(), Bf4, $G1];
  if (MQ() === "bedrock") return [C_(), AZ0, vf1];
  return [C_(), vf1]
}
// @from(Start 8848471, End 8848823)
function BZ0() {
  let A = Qf4(),
    B = null,
    Q = Vg(),
    I = C21();
  if (Q !== void 0 && Q !== null) B = Q;
  else if (I !== null) B = I;
  if (B === null || A.some((G) => G.value === B)) return A;
  if (QZ0(B)) A.push(B === "sonnet" ? AZ0 : vf1);
  else A.push({
    value: B,
    label: B,
    description: "Custom model"
  });
  return A
}
// @from(Start 8848825, End 8848884)
function QZ0(A) {
  return ["sonnet", "opus"].includes(A)
}
// @from(Start 8848886, End 8849016)
function Cg(A) {
  let B = A.toLowerCase().trim();
  if (QZ0(B)) return B === "sonnet" ? zX().sonnet40 : zX().opus40;
  return B
}
// @from(Start 8849018, End 8849254)
function z_(A) {
  if (A === null) {
    if (T9() && !qZ()) return `Sonnet (${$G1.description})`;
    else if (T9()) return `Default (${NG1()})`;
    return `Default (${sa()})`
  }
  let B = Cg(A);
  return A === B ? B : `${A} (${B})`
}
// @from(Start 8849256, End 8849286)
function IZ0(A) {
  return A
}
// @from(Start 8849291, End 8849299)
GZ0 = {}
// @from(Start 8849303, End 8849312)
w_ = null
// @from(Start 8849316, End 8850401)
ZZ0 = L0(() => {
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return null;
    let A = xx(),
      B = {
        networkConfig: {
          api: "https://statsig.anthropic.com/v1/"
        },
        environment: {
          tier: ["test", "dev"].includes("production") ? "development" : "production"
        },
        includeCurrentPageUrlWithEvents: !1,
        logLevel: qG1.LogLevel.None,
        storageProvider: new LL1,
        customUserCacheKeyFunc: (I, G) => {
          return Gf4("sha1").update(I).update(G.userID || "").digest("hex").slice(0, 10)
        }
      };
    w_ = new qG1.StatsigClient(gJA, A, B), w_.on("error", () => {
      P4.head("https://api.anthropic.com/api/hello").catch(() => {})
    });
    let Q = w_.initializeAsync().then(() => {});
    return process.on("beforeExit", async () => {
      await w_?.flush()
    }), process.on("exit", () => {
      w_?.flush()
    }), {
      client: w_,
      initialized: Q
    }
  })
// @from(Start 8850405, End 8850516)
E_ = L0(async () => {
    let A = ZZ0();
    if (!A) return null;
    return await A.initialized, A.client
  })
// @from(Start 8850519, End 8850635)
function DZ0() {
  w_ = null, ZZ0.cache?.clear?.(), E_.cache?.clear?.(), Zf4.cache?.clear?.(), wJ.cache?.clear?.()
}
// @from(Start 8850636, End 8852533)
async function E1(A, B) {
  if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return;
  try {
    let Q = B.model ? String(B.model) : J7(),
      I = jY(Q),
      [G, Z, D] = await Promise.all([E_(), mA.getPackageManagers(), mA.getRuntimes()]);
    if (!G) return;
    let Y = {
        ...B,
        model: Q,
        sessionId: y9(),
        userType: "external",
        ...I.length > 0 ? {
          betas: I.join(",")
        } : {},
        env: JSON.stringify({
          platform: mA.platform,
          nodeVersion: mA.nodeVersion,
          terminal: mA.terminal,
          packageManagers: Z.join(","),
          runtimes: D.join(","),
          isRunningWithBun: mA.isRunningWithBun(),
          isCi: !1 === "true",
          isClaubbit: process.env.CLAUBBIT === "true",
          isGithubAction: process.env.GITHUB_ACTIONS === "true",
          isClaudeCodeAction: process.env.CLAUDE_CODE_ACTION === "1" || process.env.CLAUDE_CODE_ACTION === "true",
          isClaudeAiAuth: T9(),
          version: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.34"
          }.VERSION,
          ...process.env.GITHUB_ACTIONS === "true" && {
            githubEventName: process.env.GITHUB_EVENT_NAME,
            githubActionsRunnerEnvironment: process.env.RUNNER_ENVIRONMENT,
            githubActionsRunnerOs: process.env.RUNNER_OS
          }
        }),
        entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT,
        ...void 0,
        ...!1
      },
      W = {
        eventName: A,
        metadata: Y
      };
    G.logEvent(W), await G.flush()
  } catch (Q) {}
}
// @from(Start 8852538, End 8852836)
wJ = L0(async (A) => {
  if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return !1;
  let B = await E_();
  if (!B) return !1;
  let Q = B.checkGate(A);
  return GZ0[A] = Q, Q
})
// @from(Start 8852839, End 8852883)
function YZ0() {
  return {
    ...GZ0
  }
}
// @from(Start 8852888, End 8853237)
Zf4 = L0(async (A, B) => {
  if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return B;
  let Q = await E_();
  if (!Q) return B;
  let I = Q.getExperiment(A);
  if (Object.keys(I.value).length === 0) return B;
  return I.value
})
// @from(Start 8853239, End 8853589)
async function xC(A, B) {
  if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return B;
  let Q = await E_();
  if (!Q) return B;
  let I = Q.getDynamicConfig(A);
  if (Object.keys(I.value).length === 0) return B;
  return I.value
}
// @from(Start 8853594, End 8853606)
WZ0 = L0(xC)
// @from(Start 8853609, End 8854044)
function JZ0() {
  aL.init({
    dsn: bJA,
    environment: "external",
    release: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION,
    defaultIntegrations: !1,
    tracesSampleRate: 1,
    tracePropagationTargets: ["localhost"]
  })
}
// @from(Start 8854046, End 8854704)
function MG1(A) {
  try {
    let B = xx();
    aL.setExtras({
      nodeVersion: mA.nodeVersion,
      platform: mA.platform,
      isCI: mA.isCI,
      isTest: !1,
      packageVersion: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.34"
      }.VERSION,
      sessionId: y9(),
      statsigGates: YZ0(),
      terminal: mA.terminal,
      userType: "external"
    }), aL.setUser({
      id: B.userID,
      email: B.email
    }), aL.captureException(A)
  } catch {}
}
// @from(Start 8854788, End 8854859)
Df4 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
// @from(Start 8854862, End 8854954)
function fC(A) {
  if (typeof A !== "string") return null;
  return Df4.test(A) ? A : null
}
// @from(Start 8854959, End 8854969)
gf1 = dA()
// @from(Start 8854972, End 8855019)
function oa() {
  return ra(S4(), "projects")
}
// @from(Start 8855021, End 8855091)
function FZ0() {
  let A = LG1(gf1);
  return ra(A, `${y9()}.jsonl`)
}
// @from(Start 8855093, End 8855133)
function Wf4() {
  return "production"
}
// @from(Start 8855135, End 8855173)
function XZ0() {
  return "external"
}
// @from(Start 8855175, End 8855245)
function LG1(A) {
  return ra(oa(), A.replace(/[^a-zA-Z0-9]/g, "-"))
}
// @from(Start 8855250, End 8855260)
bf1 = null
// @from(Start 8855263, End 8855320)
function Kg() {
  if (!bf1) bf1 = new VZ0;
  return bf1
}
// @from(Start 8855321, End 8859090)
class VZ0 {
  summaries;
  messages;
  sessionMessages;
  didLoad = !1;
  sessionFile = null;
  constructor() {
    this.summaries = new Map, this.messages = new Map, this.sessionMessages = new Map
  }
  async insertMessageChain(A, B = !1) {
    let Q = null;
    for (let I of A) {
      let G = {
        parentUuid: Q,
        isSidechain: B,
        userType: XZ0(),
        cwd: dA(),
        sessionId: y9(),
        version: {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://docs.anthropic.com/s/claude-code",
          VERSION: "1.0.34"
        }.VERSION,
        ...I
      };
      this.messages.set(I.uuid, G), await this.appendEntry(G), Q = I.uuid
    }
  }
  async appendEntry(A) {
    if (Wf4() === "test" || m6().cleanupPeriodDays === 0) return;
    let B = x1();
    if (this.sessionFile === null) {
      let I = LG1(gf1);
      try {
        B.statSync(I)
      } catch {
        B.mkdirSync(I)
      }
      this.sessionFile = FZ0();
      try {
        B.statSync(this.sessionFile)
      } catch {
        B.writeFileSync(this.sessionFile, "", {
          encoding: "utf8",
          flush: !0
        })
      }
    }
    let Q = y9();
    if (A.type === "summary") B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`);
    else {
      let I = await Xf4(Q);
      if (!I.has(A.uuid)) B.appendFileSync(this.sessionFile, JSON.stringify(A) + `
`), I.add(A.uuid)
    }
  }
  async getAllTranscripts() {
    await this.loadAllSessions();
    let A = [...this.messages.values()],
      B = new Set(A.map((Q) => Q.parentUuid));
    return A.filter((Q) => !B.has(Q.uuid)).map((Q) => this.getTranscript(Q)).filter((Q) => Q.length)
  }
  getTranscript(A) {
    let B = [],
      Q = A;
    while (Q) B.unshift(Q), Q = Q.parentUuid ? this.messages.get(Q.parentUuid) : void 0;
    return B
  }
  async getLastLog(A) {
    let {
      messages: B
    } = await mf1(A);
    if (B.size === 0) return null;
    let I = Array.from(B.values()).sort((D, Y) => new Date(Y.timestamp).getTime() - new Date(D.timestamp).getTime())[0];
    if (!I) return null;
    let G = [],
      Z = I;
    while (Z) G.unshift(Z), Z = Z.parentUuid ? B.get(Z.parentUuid) : void 0;
    return G
  }
  loadAllSessions = L0(async () => {
    let A = LG1(gf1),
      B = x1();
    if (this.didLoad) return this;
    try {
      B.statSync(A)
    } catch {
      return this
    }
    let I = B.readdirSync(A).filter((Z) => Z.isFile() && Z.name.endsWith(".jsonl")).map((Z) => ra(A, Z.name)),
      G = await Promise.all(I.sort((Z, D) => {
        let Y = B.statSync(Z),
          W = B.statSync(D);
        return Y.mtime.getTime() - W.mtime.getTime()
      }).map(async (Z) => {
        let D = fC(Yf4(Z, ".jsonl"));
        if (!D) return {
          sessionId: D,
          sessionMessages: new Set
        };
        let Y = new Map,
          W = new Map;
        try {
          await B.stat(Z);
          for (let J of await n81(Z))
            if (J.type === "user" || J.type === "assistant" || J.type === "attachment" || J.type === "system") Y.set(J.uuid, J);
            else if (J.type === "summary" && J.leafUuid) W.set(J.leafUuid, J.summary)
        } catch {}
        return {
          sessionId: D,
          sessionMessages: Y,
          summaries: W
        }
      }));
    for (let {
        sessionId: Z,
        sessionMessages: D,
        summaries: Y
      }
      of G) {
      if (!Z) continue;
      this.sessionMessages.set(Z, new Set(D.keys()));
      for (let [W, J] of D.entries()) this.messages.set(W, J);
      for (let [W, J] of Y.entries()) this.summaries.set(W, J)
    }
    return this.didLoad = !0, this
  })
}
// @from(Start 8859091, End 8859207)
async function RG1(A) {
  let B = EZ0(A);
  return await Kg().insertMessageChain(B), B[B.length - 1]?.uuid || null
}
// @from(Start 8859208, End 8859277)
async function CZ0(A) {
  await Kg().insertMessageChain(EZ0(A), !0)
}
// @from(Start 8859279, End 8859677)
function Jf4(A) {
  let B = A.find((G) => G.type === "user");
  if (!B || B.type !== "user") return "No prompt";
  let Q = B.message?.content,
    I = "";
  if (typeof Q === "string") I = Q;
  else if (Array.isArray(Q)) I = Q.find((Z) => Z.type === "text")?.text || "No prompt";
  else I = "No prompt";
  if (I = I.replace(/\n/g, " ").trim(), I.length > 45) I = I.slice(0, 45) + "...";
  return I
}
// @from(Start 8859679, End 8859815)
function Ff4(A) {
  return A.map((B) => {
    let {
      isSidechain: Q,
      parentUuid: I,
      ...G
    } = B;
    return G
  })
}
// @from(Start 8859817, End 8860210)
function KZ0(A, B = 0, Q) {
  let I = A[A.length - 1],
    G = A[0],
    Z = Jf4(A),
    D = new Date(G.timestamp),
    Y = new Date(I.timestamp);
  return {
    date: I.timestamp,
    messages: Ff4(A),
    fullPath: "n/a",
    value: B,
    created: D,
    modified: Y,
    firstPrompt: Z,
    messageCount: A.length,
    isSidechain: G.isSidechain,
    leafUuid: I.uuid,
    summary: Q
  }
}
// @from(Start 8860211, End 8860501)
async function HZ0() {
  let A = await Kg().getAllTranscripts(),
    B = Kg().summaries;
  return A.map((Q, I) => {
    let G = Q[Q.length - 1],
      Z = G ? B.get(G.uuid) : void 0;
    return KZ0(Q, I, Z)
  }).sort((Q, I) => {
    return I.modified.getTime() - Q.modified.getTime()
  })
}
// @from(Start 8860502, End 8860615)
async function zZ0(A, B) {
  await Kg().appendEntry({
    type: "summary",
    summary: B,
    leafUuid: A
  })
}
// @from(Start 8860616, End 8860997)
async function hf1(A) {
  let B = new Map,
    Q = new Map;
  try {
    let I = await n81(A);
    for (let G of I)
      if (G.type === "user" || G.type === "assistant" || G.type === "attachment" || G.type === "system") B.set(G.uuid, G);
      else if (G.type === "summary" && G.leafUuid) Q.set(G.leafUuid, G.summary)
  } catch {}
  return {
    messages: B,
    summaries: Q
  }
}
// @from(Start 8860998, End 8861078)
async function mf1(A) {
  let B = ra(LG1(dA()), `${A}.jsonl`);
  return hf1(B)
}
// @from(Start 8861083, End 8861190)
Xf4 = L0(async (A) => {
  let {
    messages: B
  } = await mf1(A);
  return new Set(B.keys())
}, (A) => A)
// @from(Start 8861192, End 8861451)
async function wZ0(A) {
  let B = await Kg().getLastLog(A);
  if (B !== null && B !== void 0) {
    let Q = B[B.length - 1],
      {
        summaries: I
      } = await mf1(A),
      G = Q ? I.get(Q.uuid) : void 0;
    return KZ0(B, 0, G)
  }
  return null
}
// @from(Start 8861453, End 8861623)
function EZ0(A) {
  return A.filter((B) => {
    if (B.type === "progress") return !1;
    if (B.type === "attachment" && XZ0() !== "ant") return !1;
    return !0
  })
}
// @from(Start 8861628, End 8861636)
OG1 = []
// @from(Start 8861640, End 8861649)
Cf4 = 100
// @from(Start 8861652, End 8861718)
function Kf4(A) {
  return A.toISOString().replace(/[:.]/g, "-")
}
// @from(Start 8861723, End 8861742)
pf1 = Kf4(new Date)
// @from(Start 8861745, End 8861803)
function Hf4() {
  return uf1(Mz.errors(), pf1 + ".txt")
}
// @from(Start 8861808, End 8861816)
df1 = !1
// @from(Start 8861819, End 8862320)
function b1(A) {
  if (df1) return;
  df1 = !0;
  try {
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_ERROR_REPORTING || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return;
    let B = A.stack || A.message,
      Q = {
        error: B,
        timestamp: new Date().toISOString()
      };
    if (OG1.length >= Cf4) OG1.shift();
    OG1.push(Q), zf4(Hf4(), {
      error: B
    })
  } catch {} finally {
    df1 = !1
  }
  MG1(A)
}
// @from(Start 8862322, End 8862358)
function UZ0() {
  return [...OG1]
}
// @from(Start 8862360, End 8862531)
function cf1(A) {
  if (!x1().existsSync(A)) return [];
  try {
    return JSON.parse(x1().readFileSync(A, {
      encoding: "utf8"
    }))
  } catch {
    return []
  }
}
// @from(Start 8862533, End 8862564)
function zf4(A, B) {
  return
}
// @from(Start 8862565, End 8862706)
async function Hg() {
  let A = await HZ0();
  return wf4(A.filter((B) => B.messages.length)).map((B, Q) => ({
    ...B,
    value: Q
  }))
}
// @from(Start 8862707, End 8862754)
async function NZ0(A) {
  return await wZ0(A)
}
// @from(Start 8862755, End 8862813)
async function $Z0(A) {
  return (await Hg())[A] || null
}
// @from(Start 8862815, End 8863086)
function wf4(A) {
  return A.sort((B, Q) => {
    let I = Q.modified.getTime() - B.modified.getTime();
    if (I !== 0) return I;
    let G = Q.created.getTime() - B.created.getTime();
    if (G !== 0) return G;
    return B.created.getTime() - Q.created.getTime()
  })
}
// @from(Start 8863088, End 8863771)
function m7(A, B) {
  if (M6(UA.red(`MCP server "${A}" ${B}`)), m6().cleanupPeriodDays === 0) return;
  try {
    let Q = Mz.mcpLogs(A),
      I = B instanceof Error ? B.stack || B.message : String(B),
      G = new Date().toISOString(),
      Z = uf1(Q, pf1 + ".txt");
    if (!x1().existsSync(Q)) x1().mkdirSync(Q);
    if (!x1().existsSync(Z)) x1().writeFileSync(Z, "[]", {
      encoding: "utf8",
      flush: !1
    });
    let D = {
        error: I,
        timestamp: G,
        sessionId: y9(),
        cwd: x1().cwd()
      },
      Y = cf1(Z);
    Y.push(D), x1().writeFileSync(Z, JSON.stringify(Y, null, 2), {
      encoding: "utf8",
      flush: !1
    })
  } catch {}
}
// @from(Start 8863773, End 8864342)
function p2(A, B) {
  O9(`MCP server "${A}": ${B}`);
  try {
    let Q = Mz.mcpLogs(A),
      I = new Date().toISOString(),
      G = uf1(Q, pf1 + ".txt");
    if (!x1().existsSync(Q)) x1().mkdirSync(Q);
    if (!x1().existsSync(G)) x1().writeFileSync(G, "[]", {
      encoding: "utf8",
      flush: !1
    });
    let Z = {
        debug: B,
        timestamp: I,
        sessionId: y9(),
        cwd: x1().cwd()
      },
      D = cf1(G);
    D.push(Z), x1().writeFileSync(G, JSON.stringify(D, null, 2), {
      encoding: "utf8",
      flush: !1
    })
  } catch {}
}
// @from(Start 8864418, End 8864578)
function MZ0(A, B) {
  let Q = [],
    I = "";
  for (let G of A)
    if ([...I].length < B) I += G;
    else Q.push(I), I = G;
  if (I) Q.push(I);
  return Q
}
// @from(Start 8864580, End 8864914)
function U_(A) {
  if (A < 60000) {
    let G = (A / 1000).toFixed(1);
    return `${G.endsWith(".0")?G.slice(0,-2):G}s`
  }
  let B = Math.floor(A / 3600000),
    Q = Math.floor(A % 3600000 / 60000),
    I = (A % 60000 / 1000).toFixed(1);
  if (B > 0) return `${B}h ${Q}m ${I}s`;
  if (Q > 0) return `${Q}m ${I}s`;
  return `${I}s`
}
// @from(Start 8864916, End 8865115)
function _G(A) {
  let B = A >= 1000;
  return new Intl.NumberFormat("en", {
    notation: "compact",
    minimumFractionDigits: B ? 1 : 0,
    maximumFractionDigits: 1
  }).format(A).toLowerCase()
}
// @from(Start 8865117, End 8866261)
function qZ0(A, B = {}) {
  let {
    style: Q = "narrow",
    numeric: I = "always",
    now: G = new Date
  } = B, Z = A.getTime() - G.getTime(), D = Math.trunc(Z / 1000), Y = [{
    unit: "year",
    seconds: 31536000,
    shortUnit: "y"
  }, {
    unit: "month",
    seconds: 2592000,
    shortUnit: "mo"
  }, {
    unit: "week",
    seconds: 604800,
    shortUnit: "w"
  }, {
    unit: "day",
    seconds: 86400,
    shortUnit: "d"
  }, {
    unit: "hour",
    seconds: 3600,
    shortUnit: "h"
  }, {
    unit: "minute",
    seconds: 60,
    shortUnit: "m"
  }, {
    unit: "second",
    seconds: 1,
    shortUnit: "s"
  }];
  for (let {
      unit: J,
      seconds: F,
      shortUnit: X
    }
    of Y)
    if (Math.abs(D) >= F) {
      let V = Math.trunc(D / F);
      if (Q === "narrow" && F < 86400) return D < 0 ? `${Math.abs(V)}${X} ago` : `in ${V}${X}`;
      return new Intl.RelativeTimeFormat("en", {
        style: "long",
        numeric: I
      }).format(V, J)
    } if (Q === "narrow") return D <= 0 ? "0s ago" : "in 0s";
  return new Intl.RelativeTimeFormat("en", {
    style: Q,
    numeric: I
  }).format(0, "second")
}
// @from(Start 8866263, End 8866462)
function lf1(A, B = {}) {
  let {
    now: Q = new Date,
    ...I
  } = B;
  if (A > Q) return qZ0(A, {
    ...I,
    now: Q
  });
  return qZ0(A, {
    ...I,
    numeric: "always",
    now: Q
  })
}
// @from(Start 8866464, End 8866834)
function zg(A, B = !1) {
  if (!A) return;
  let Q = new Date(A * 1000),
    I = Q.getMinutes(),
    G = Q.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: I === 0 ? void 0 : "2-digit",
      hour12: !0
    }),
    Z = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return G.replace(/ ([AP]M)/i, (D, Y) => Y.toLowerCase()) + (B ? ` (${Z})` : "")
}
// @from(Start 8866839, End 8866857)
kZ0 = I1(SZ0(), 1)
// @from(Start 8866861, End 8866870)
_Z0 = 137
// @from(Start 8866874, End 8866883)
jZ0 = 143
// @from(Start 8866886, End 8867164)
function yZ0(A) {
  let B = null,
    Q = "";
  A.on("data", (G) => {
    if (B) B.write(G);
    else Q += G
  });
  let I = () => Q;
  return {
    get: I,
    asStream() {
      return B = new Uf4({
        highWaterMark: 10485760
      }), B.write(I()), Q = "", B
    }
  }
}
// @from(Start 8867166, End 8868509)
function xZ0(A, B, Q) {
  let I = "running",
    G, Z = yZ0(A.stdout),
    D = yZ0(A.stderr),
    Y = (X) => {
      if (I = "killed", A.pid) kZ0.default(A.pid, "SIGKILL")
    },
    W = null,
    J, F = new Promise((X) => {
      let V = () => Y();
      J = () => {
        if (W) clearTimeout(W), W = null;
        B.removeEventListener("abort", V)
      }, B.addEventListener("abort", V, {
        once: !0
      }), new Promise((C) => {
        let K = Y;
        Y = (E) => {
          K(), C(E || _Z0)
        }, W = setTimeout(() => {
          Y(jZ0)
        }, Q), A.on("close", (E, N) => {
          C(E !== null && E !== void 0 ? E : N === "SIGTERM" ? 144 : 1)
        }), A.on("error", () => C(1))
      }).then((C) => {
        if (J(), I === "running") I = "completed";
        let K = {
          code: C,
          stdout: Z.get(),
          stderr: D.get(),
          interrupted: C === _Z0,
          backgroundTaskId: G
        };
        if (C === jZ0) K.stderr = [`Command timed out after ${U_(Q)}`, K.stderr].filter(Boolean).join(" ");
        X(K)
      })
    });
  return {
    background: (X) => {
      if (I === "running") return G = X, I = "backgrounded", J(), {
        stdoutStream: Z.asStream(),
        stderrStream: D.asStream()
      };
      else return null
    },
    kill: () => Y(),
    result: F
  }
}
// @from(Start 8868511, End 8868764)
function fZ0(A) {
  return {
    background: () => null,
    kill: () => {},
    result: Promise.resolve({
      code: 145,
      stdout: "",
      stderr: "Command aborted before execution",
      interrupted: !0,
      backgroundTaskId: A
    })
  }
}
// @from(Start 8868769, End 8868786)
TG1 = I1($c(), 1)
// @from(Start 8868885, End 8870337)
class gZ0 {
  profilePath;
  defaultProfile = `(version 1)
;; Default deny (whitelist approach)
(deny default)

;; Essential filesystem operations
(allow file-read*)
(allow file-read-metadata)
(allow file-ioctl)

;; Allow writes to /dev/null
(allow file-write* (literal "/dev/null"))
(allow file-read-data (subpath "/dev/fd"))

;; Limited sys operations needed for basic functionality
(allow sysctl-read)
(allow mach-lookup)
(allow process-exec)
(allow process-fork)

;; Allow signals to self and process group (descendants)
(allow signal (target pgrp))`;
  constructor() {
    let A = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0");
    this.profilePath = bZ0.join(vZ0.tmpdir(), `claude-sandbox-${A}.sb`), this.writeProfile(this.defaultProfile)
  }
  getProfilePath() {
    return this.profilePath
  }
  writeProfile(A) {
    try {
      x1().writeFileSync(this.profilePath, A, {
        encoding: "utf8",
        flush: !1
      })
    } catch (B) {
      throw b1(new Error(`Failed to write sandbox profile: ${B}`)), B
    }
  }
  cleanup() {
    try {
      if (x1().existsSync(this.profilePath)) x1().unlinkSync(this.profilePath)
    } catch (A) {
      b1(new Error(`Failed to clean up sandbox profile: ${A}`))
    }
  }
  wrapCommand(A) {
    let B = TG1.default.quote([this.profilePath]),
      Q = `set -o pipefail; ${A}`;
    return TG1.default.quote([`/usr/bin/sandbox-exec -f ${B} bash -c ${TG1.default.quote([Q])}`])
  }
}
// @from(Start 8870339, End 8870369)
function PG1() {
  return !1
}
// @from(Start 8870371, End 8870510)
function nf1() {
  return !1;
  try {
    return x1().accessSync("/usr/bin/sandbox-exec", Nf4.X_OK), !0
  } catch (A) {
    return !1
  }
}
// @from(Start 8870512, End 8870839)
function hZ0(A) {
  if (!nf1()) throw new Error("Sandbox mode requested but not available on this system");
  try {
    let B = new gZ0;
    return {
      finalCommand: B.wrapCommand(A),
      cleanup: () => B.cleanup()
    }
  } catch (B) {
    throw new Error("Sandbox mode requested but not available on this system")
  }
}
// @from(Start 8870844, End 8870860)
wg = I1($c(), 1)
// @from(Start 8870864, End 8873856)
$f4 = [{
    patterns: [/^\s*(?:.*\/)?git\s+/],
    env: {
      GIT_TERMINAL_PROMPT: "0",
      GIT_OPTIONAL_LOCKS: "0"
    },
    configArgs: ["-c", "core.fsmonitor=false", "-c", "maintenance.auto=false", "-c", "credential.helper="]
  }, {
    patterns: [/\bnpm\b(?!-)/],
    env: {
      NPM_CONFIG_CACHE: "/dev/null",
      NPM_CONFIG_AUDIT: "false",
      NPM_CONFIG_UPDATE_NOTIFIER: "false",
      NPM_CONFIG_FUND: "false",
      NPM_CONFIG_PREFER_OFFLINE: "true",
      NPM_CONFIG_OFFLINE: "true",
      NPM_CONFIG_IGNORE_SCRIPTS: "true"
    }
  }, {
    patterns: [/\byarn\b/],
    env: {
      YARN_CACHE_FOLDER: "/dev/null",
      YARN_ENABLE_GLOBAL_CACHE: "false",
      YARN_ENABLE_MIRROR: "false",
      YARN_ENABLE_NETWORK: "false",
      YARN_ENABLE_OFFLINE_MODE: "true",
      YARN_ENABLE_HARDLINKS_IN_NODE_MODULES: "false",
      YARN_INSTALL_STATE_PATH: "/dev/null",
      YARN_ENABLE_TELEMETRY: "0",
      YARN_ENABLE_SCRIPTS: "false"
    }
  }, {
    patterns: [/\bpnpm\b/],
    env: {
      PNPM_OFFLINE: "true",
      PNPM_NO_UPDATE_NOTIFIER: "true",
      PNPM_IGNORE_SCRIPTS: "true"
    }
  }, {
    patterns: [/\bpip\b|\bpip3\b|\bpython\s+-m\s+pip\b|\bpython3\s+-m\s+pip\b/],
    env: {
      PIP_NO_CACHE_DIR: "1",
      PIP_DISABLE_PIP_VERSION_CHECK: "1",
      PYTHONDONTWRITEBYTECODE: "1"
    }
  }, {
    patterns: [/\bpipenv\b/],
    env: {
      PIPENV_CACHE_DIR: "/dev/null",
      PIPENV_VENV_IN_PROJECT: "false",
      PIPENV_VIRTUALENV: "false",
      PYTHONDONTWRITEBYTECODE: "1"
    }
  }, {
    patterns: [/\bpoetry\b/],
    env: {
      POETRY_CACHE_DIR: "/dev/null",
      POETRY_VIRTUALENVS_CREATE: "false",
      POETRY_VIRTUALENVS_IN_PROJECT: "false",
      POETRY_INSTALLER_PARALLEL: "false"
    }
  }, {
    patterns: [/\bcargo\s+(build|test|run|check|clippy|doc|bench|install|update|search|publish|clean)\b/],
    env: {
      CARGO_NET_OFFLINE: "true",
      CARGO_REGISTRIES_CRATES_IO_PROTOCOL: "sparse",
      RUST_BACKTRACE: "0"
    }
  }, {
    patterns: [/\bgo\b/],
    env: {
      GOCACHE: "off",
      GOPROXY: "off",
      GOSUMDB: "off",
      GOFLAGS: "-mod=readonly"
    }
  }, {
    patterns: [/\bbundle\b|\bgem\b/],
    env: {
      BUNDLE_CACHE_PATH: "/dev/null",
      BUNDLE_DISABLE_VERSION_CHECK: "true",
      GEM_SKIP_DOC_INSTALL: "true"
    }
  }, {
    patterns: [/\bsvn\b|\bhg\b|\bbzr\b/],
    env: {
      SVN_INTERACTIVE: "no",
      HGPLAIN: "1",
      BZR_LOG: "/dev/null"
    }
  }, {
    patterns: [/\bmake\b|\bcmake\b|\bgradle\b|\bmvn\b/],
    env: {
      MAKEFLAGS: "--no-print-directory",
      GRADLE_DAEMON: "false",
      MAVEN_OPTS: "-o"
    }
  }, {
    patterns: [/\bnode\b|\bnodemon\b|\bts-node\b/],
    env: {
      NODE_DISABLE_COLORS: "1",
      NO_UPDATE_NOTIFIER: "1",
      NODE_ENV: "production"
    }
  }, {
    patterns: [/\bpsql\b|\bmysql\b|\bmongo\b|\bredis-cli\b/],
    env: {
      PSQL_HISTORY: "/dev/null",
      MYSQL_HISTFILE: "/dev/null",
      REDISCLI_HISTFILE: "/dev/null"
    }
  }]
// @from(Start 8873859, End 8874728)
function af1(A) {
  let B = {},
    Q = [];
  if (/^\s*env\s+/.test(A)) return {
    env: {},
    configArgs: []
  };
  if (/^\s*RUN\s+/.test(A)) return {
    env: {},
    configArgs: []
  };
  if (/^\s*[`$(]|echo\s+[`$(]/.test(A)) return {
    env: {},
    configArgs: []
  };
  let I = wg.parse(A),
    G = A,
    Z = 0;
  for (let D = 0; D < I.length; D++) {
    let Y = I[D];
    if (typeof Y === "string") {
      if (Y.includes("=") && D === Z) {
        Z = D + 1;
        continue
      }
      break
    }
  }
  if (Z < I.length) G = I.slice(Z).map((D) => {
    if (typeof D === "string") return wg.quote([D]);
    return D
  }).join(" ");
  for (let D of $f4)
    if (D.patterns.some((Y) => Y.test(G))) {
      if (B = {
          ...B,
          ...D.env
        }, D.configArgs) Q = [...Q, ...D.configArgs]
    } return {
    env: B,
    configArgs: Q
  }
}
// @from(Start 8874730, End 8875559)
function mZ0(A) {
  let B = wg.parse(A),
    Q = -1,
    I = 0;
  for (let G = 0; G < B.length; G++) {
    let Z = B[G];
    if (typeof Z === "string") {
      if (Z.includes("=") && G === I) {
        I++;
        continue
      }
      if (Z === "git" || Z.endsWith("/git")) {
        Q = G;
        break
      }
      break
    }
  }
  if (Q !== -1) {
    let {
      configArgs: G
    } = af1(A);
    if (G && G.length > 0) {
      let Z = [...B.slice(0, Q + 1), ...G, ...B.slice(Q + 1)];
      return Z.map((D, Y) => {
        if (typeof D === "string") {
          if (D.includes("=") && Y < Q || D.startsWith("-c")) return D;
          if (Y > 0 && Z[Y - 1] === "-c" && D.includes("=")) return D;
          return wg.quote([D])
        }
        return ""
      }).filter((D) => D !== "").join(" ")
    }
  }
  return A
}
// @from(Start 8875564, End 8875577)
jf4 = 1800000
// @from(Start 8875581, End 8875591)
sf1 = "\\"
// @from(Start 8875594, End 8875722)
function cZ0(A) {
  let B = A.includes("zsh") ? ".zshrc" : A.includes("bash") ? ".bashrc" : ".profile";
  return _f4(Rf4(), B)
}
// @from(Start 8875724, End 8878326)
function yf4(A, B) {
  let Q = cZ0(A),
    I = Q.endsWith(".zshrc"),
    G = "";
  if (I) G = `
      echo "# Functions" >> $SNAPSHOT_FILE
      
      # Force autoload all functions first
      typeset -f > /dev/null 2>&1
      
      # Now get user function names - filter system ones and write directly to file
      typeset +f | grep -vE '^(_|__)' | while read func; do
        typeset -f "$func" >> $SNAPSHOT_FILE
      done
      
      echo "# Shell Options" >> $SNAPSHOT_FILE
      setopt | sed 's/^/setopt /' | head -n 1000 >> $SNAPSHOT_FILE
    `;
  else G = `
      echo "# Functions" >> $SNAPSHOT_FILE
      
      # Force autoload all functions first
      declare -f > /dev/null 2>&1
      
      # Now get user function names - filter system ones and give the rest to eval in b64 encoding
      declare -F | cut -d' ' -f3 | grep -vE '^(_|__)' | while read func; do
        # Encode the function to base64, preserving all special characters
        encoded_func=$(declare -f "$func" | base64 )
        # Write the function definition to the snapshot
        echo "eval ${sf1}"${sf1}$(echo '$encoded_func' | base64 -d)${sf1}" > /dev/null 2>&1" >> $SNAPSHOT_FILE
      done

      echo "# Shell Options" >> $SNAPSHOT_FILE
      shopt -p | head -n 1000 >> $SNAPSHOT_FILE
      set -o | grep "on" | awk '{print "set -o " $1}' | head -n 1000 >> $SNAPSHOT_FILE
      echo "shopt -s expand_aliases" >> $SNAPSHOT_FILE
    `;
  return `SNAPSHOT_FILE=${ta.default.quote([B])}
      source "${Q}" < /dev/null
      
      # First, create/clear the snapshot file
      echo "# Snapshot file" >| $SNAPSHOT_FILE
      
      # When this file is sourced, we first unalias to avoid conflicts
      # This is necessary because aliases get "frozen" inside function definitions at definition time,
      # which can cause unexpected behavior when functions use commands that conflict with aliases
      echo "# Unset all aliases to avoid conflicts with functions" >> $SNAPSHOT_FILE
      echo "unalias -a 2>/dev/null || true" >> $SNAPSHOT_FILE
      
      ${G}
      
      echo "# Aliases" >> $SNAPSHOT_FILE
      alias | sed 's/^alias //g' | sed 's/^/alias -- /' | head -n 1000 >> $SNAPSHOT_FILE
      
      # Check if rg is available, if not create an alias to bundled ripgrep
      echo "# Check for rg availability" >> $SNAPSHOT_FILE
      echo "if ! command -v rg >/dev/null 2>&1; then" >> $SNAPSHOT_FILE
      echo "  alias rg='${Zv()}'" >> $SNAPSHOT_FILE
      echo "fi" >> $SNAPSHOT_FILE
      
      # Add PATH to the file
      echo "export PATH='${process.env.PATH}'" >> $SNAPSHOT_FILE
    `
}
// @from(Start 8878328, End 8878562)
function uZ0(A) {
  try {
    return x1().accessSync(A, qf4.X_OK), !0
  } catch (B) {
    try {
      return pZ0(`${A} --version`, {
        timeout: 1000,
        stdio: "ignore"
      }), !0
    } catch {
      return !1
    }
  }
}
// @from(Start 8878567, End 8879523)
lZ0 = L0(function() {
  let A = (F) => {
      try {
        return pZ0(`which ${F}`, {
          stdio: ["ignore", "pipe", "ignore"]
        }).toString().trim()
      } catch {
        return null
      }
    },
    B = process.env.SHELL,
    Q = B && (B.includes("bash") || B.includes("zsh")),
    I = B?.includes("bash"),
    G = A("zsh"),
    Z = A("bash"),
    D = ["/bin", "/usr/bin", "/usr/local/bin", "/opt/homebrew/bin"],
    W = (I ? ["bash", "zsh"] : ["zsh", "bash"]).flatMap((F) => D.map((X) => `${X}/${F}`));
  if (I) {
    if (Z) W.unshift(Z);
    if (G) W.push(G)
  } else {
    if (G) W.unshift(G);
    if (Z) W.push(Z)
  }
  if (Q && uZ0(B)) W.unshift(B);
  let J = W.find((F) => F && uZ0(F));
  if (!J) {
    let F = "No suitable shell found. Claude CLI requires a Posix shell environment. Please ensure you have a valid shell installed and the SHELL environment variable set.";
    throw b1(new Error(F)), new Error(F)
  }
  return J
})
// @from(Start 8879526, End 8880617)
function kf4() {
  let A = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0"),
    B = lZ0(),
    Q = `${rf1.tmpdir()}/claude-shell-snapshot-${A}`;
  return new Promise((I) => {
    try {
      let G = cZ0(B);
      if (!dZ0(G)) {
        I(void 0);
        return
      }
      let Z = yf4(B, Q);
      Of4(B, ["-c", "-l", Z], {
        env: {
          ...process.env.CLAUDE_CODE_DONT_INHERIT_ENV ? {} : process.env,
          SHELL: B,
          GIT_EDITOR: "true",
          CLAUDECODE: "1"
        },
        timeout: 1e4,
        maxBuffer: 1048576
      }, (D, Y, W) => {
        if (D) b1(new Error(`Failed to create shell snapshot: ${W}`)), E1("shell_snapshot_failed", {
          stderr_length: W.length
        }), I(void 0);
        else if (dZ0(Q)) {
          let J = Lf4(Q).size;
          E1("shell_snapshot_created", {
            snapshot_size: J
          }), I(Q)
        } else E1("shell_unknown_error", {}), I(void 0)
      })
    } catch (G) {
      b1(G instanceof Error ? G : new Error(String(G))), E1("shell_snapshot_error", {}), I(void 0)
    }
  })
}
// @from(Start 8880622, End 8880735)
of1 = L0(async function() {
  let A = await kf4();
  return {
    binShell: lZ0(),
    snapshotFilePath: A
  }
})
// @from(Start 8880737, End 8882181)
async function xf4(A, B, Q, I = !1, G) {
  let Z = Q || jf4,
    {
      binShell: D,
      snapshotFilePath: Y
    } = await of1();
  if (G) D = G, Y = void 0;
  let W = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0"),
    J = `${rf1.tmpdir()}/claude-${W}-cwd`,
    F = ta.default.quote([A, "<", "/dev/null"]);
  if (D.includes("bash") && !I) {
    let E = A.split(/(?<!\|)\|(?!\|)/);
    if (E.length > 1) F = ta.default.quote([E[0], "<", "/dev/null", "|", E.slice(1).join("|")])
  }
  if (I) A = mZ0(A), F = ta.default.quote([A, "<", "/dev/null"]);
  let X = () => {};
  if (I) {
    let E = hZ0(F);
    F = E.finalCommand, X = E.cleanup
  }
  let V = [];
  if (Y) V.push(`source ${Y}`);
  V.push(`eval ${F}`), V.push(`pwd -P >| ${J}`);
  let C = V.join(" && "),
    K = iZ0();
  if (B.aborted) return fZ0();
  try {
    let E = af1(A),
      N = Tf4(D, ["-c", "-l", C], {
        env: {
          ...process.env,
          SHELL: D,
          GIT_EDITOR: "true",
          CLAUDECODE: "1",
          ...I ? E.env : {}
        },
        cwd: K,
        detached: !0
      }),
      q = xZ0(N, B, Z);
    return q.result.then((O) => {
      if (O && !O.backgroundTaskId) try {
        EX(Mf4(J, {
          encoding: "utf8"
        }).trim(), K)
      } catch {
        E1("shell_set_cwd", {
          success: !1
        })
      }
      X()
    }).catch(() => {
      X()
    }), X = () => {}, q
  } finally {
    X()
  }
}
// @from(Start 8882183, End 8882216)
function iZ0() {
  return l2A()
}
// @from(Start 8882218, End 8882446)
function EX(A, B) {
  let Q = Pf4(A) ? A : Sf4(B || x1().cwd(), A);
  if (!x1().existsSync(Q)) throw new Error(`Path "${Q}" does not exist`);
  let I = x1().realpathSync(Q);
  i2A(I), E1("shell_set_cwd", {
    success: !0
  })
}
// @from(Start 8882451, End 8882460)
ff4 = xf4
// @from(Start 8882463, End 8882494)
function nZ0() {
  return ff4
}
// @from(Start 8882496, End 8882570)
function dA() {
  try {
    return iZ0()
  } catch {
    return e9()
  }
}
// @from(Start 8882575, End 8882584)
ea = 1000
// @from(Start 8882588, End 8882595)
As = 60
// @from(Start 8882598, End 8882878)
function u0(A, B, Q = {
  timeout: 10 * As * ea,
  preserveOutputOnError: !0,
  useCwd: !0
}) {
  return PD(A, B, {
    abortSignal: Q.abortSignal,
    timeout: Q.timeout,
    preserveOutputOnError: Q.preserveOutputOnError,
    cwd: Q.useCwd ? dA() : void 0,
    env: Q.env
  })
}
// @from(Start 8882880, End 8883856)
function PD(A, B, Q = {
  timeout: 10 * As * ea,
  preserveOutputOnError: !0
}) {
  let {
    abortSignal: I,
    timeout: G = 10 * As * ea,
    preserveOutputOnError: Z = !0,
    cwd: D,
    env: Y
  } = Q;
  return new Promise((W) => {
    try {
      vf4(A, B, {
        maxBuffer: 1e6,
        signal: I,
        timeout: G,
        cwd: D,
        env: Y
      }, (J, F, X) => {
        if (J)
          if (Z) {
            let V = typeof J.code === "number" ? J.code : 1;
            W({
              stdout: F || "",
              stderr: X || "",
              code: V,
              error: typeof J.code === "string" ? J.code : String(V)
            })
          } else W({
            stdout: "",
            stderr: "",
            code: 1
          });
        else W({
          stdout: F,
          stderr: X,
          code: 0
        })
      })
    } catch (J) {
      b1(J), W({
        stdout: "",
        stderr: "",
        code: 1
      })
    }
  })
}
// @from(Start 8883858, End 8884317)
function NZ(A, B, Q = 10 * As * ea) {
  let I;
  if (B === void 0) I = {};
  else if (B instanceof AbortSignal) I = {
    abortSignal: B,
    timeout: Q
  };
  else I = B;
  let {
    abortSignal: G,
    timeout: Z = 10 * As * ea
  } = I;
  G?.throwIfAborted();
  let D = bf4(A, {
    env: process.env,
    maxBuffer: 1e6,
    timeout: Z,
    cwd: dA(),
    stdio: ["ignore", "pipe", "pipe"]
  });
  if (!D) return null;
  return D.toString().trim() || null
}
// @from(Start 8884399, End 8884417)
rZ0 = I1(NT1(), 1)
// @from(Start 8884420, End 8884501)
function S4() {
  return process.env.CLAUDE_CONFIG_DIR ?? SG1(sZ0(), ".claude")
}
// @from(Start 8884503, End 8884673)
function UX() {
  if (x1().existsSync(SG1(S4(), ".config.json"))) return SG1(S4(), ".config.json");
  return SG1(process.env.CLAUDE_CONFIG_DIR || sZ0(), ".claude.json")
}
// @from(Start 8884678, End 8884846)
gf4 = L0(async () => {
    let {
      code: A
    } = await u0("test", ["-f", "/.dockerenv"]);
    if (A !== 0) return !1;
    return process.platform === "linux"
  })
// @from(Start 8884850, End 8885107)
hf4 = L0(async () => {
    try {
      let A = new AbortController,
        B = setTimeout(() => A.abort(), 1000);
      return await P4.head("http://1.1.1.1", {
        signal: A.signal
      }), clearTimeout(B), !0
    } catch {
      return !1
    }
  })
// @from(Start 8885109, End 8885261)
async function Eg(A, B = ["--version"]) {
  return (await u0(A, B, {
    timeout: 1000,
    preserveOutputOnError: !0,
    useCwd: !1
  })).code === 0
}
// @from(Start 8885266, End 8885446)
mf4 = L0(async () => {
    let A = [];
    if (await Eg("npm")) A.push("npm");
    if (await Eg("yarn")) A.push("yarn");
    if (await Eg("pnpm")) A.push("pnpm");
    return A
  })
// @from(Start 8885450, End 8885630)
df4 = L0(async () => {
    let A = [];
    if (await Eg("bun")) A.push("bun");
    if (await Eg("deno")) A.push("deno");
    if (await Eg("node")) A.push("node");
    return A
  })
// @from(Start 8885634, End 8885759)
uf4 = L0(() => {
    if (process.versions.bun !== void 0 || process.env.BUN_INSTALL !== void 0) return !0;
    return !1
  })
// @from(Start 8885763, End 8885902)
oZ0 = L0(() => {
    try {
      return x1().existsSync("/proc/sys/fs/binfmt_misc/WSLInterop")
    } catch (A) {
      return !1
    }
  })
// @from(Start 8885906, End 8886117)
pf4 = L0(() => {
    try {
      if (!oZ0()) return !1;
      let {
        cmd: A
      } = rZ0.findActualExecutable("npm", []);
      return A.startsWith("/mnt/c/")
    } catch (A) {
      return !1
    }
  })