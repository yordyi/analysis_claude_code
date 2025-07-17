
// @from(Start 2988209, End 2988217)
f14 = {}
// @from(Start 2988223, End 2988226)
FhA
// @from(Start 2988232, End 2988317)
XhA = J21(() => {
  WhA();
  FhA = I1(JhA(), 1);
  FhA.default.connectToDevTools()
})
// @from(Start 2988323, End 2989803)
zhA = z((q48, b14) => {
  b14.exports = {
    single: {
      topLeft: "┌",
      top: "─",
      topRight: "┐",
      right: "│",
      bottomRight: "┘",
      bottom: "─",
      bottomLeft: "└",
      left: "│"
    },
    double: {
      topLeft: "╔",
      top: "═",
      topRight: "╗",
      right: "║",
      bottomRight: "╝",
      bottom: "═",
      bottomLeft: "╚",
      left: "║"
    },
    round: {
      topLeft: "╭",
      top: "─",
      topRight: "╮",
      right: "│",
      bottomRight: "╯",
      bottom: "─",
      bottomLeft: "╰",
      left: "│"
    },
    bold: {
      topLeft: "┏",
      top: "━",
      topRight: "┓",
      right: "┃",
      bottomRight: "┛",
      bottom: "━",
      bottomLeft: "┗",
      left: "┃"
    },
    singleDouble: {
      topLeft: "╓",
      top: "─",
      topRight: "╖",
      right: "║",
      bottomRight: "╜",
      bottom: "─",
      bottomLeft: "╙",
      left: "║"
    },
    doubleSingle: {
      topLeft: "╒",
      top: "═",
      topRight: "╕",
      right: "│",
      bottomRight: "╛",
      bottom: "═",
      bottomLeft: "╘",
      left: "│"
    },
    classic: {
      topLeft: "+",
      top: "-",
      topRight: "+",
      right: "|",
      bottomRight: "+",
      bottom: "-",
      bottomLeft: "+",
      left: "|"
    },
    arrow: {
      topLeft: "↘",
      top: "↓",
      topRight: "↙",
      right: "←",
      bottomRight: "↖",
      bottom: "↑",
      bottomLeft: "↗",
      left: "→"
    }
  }
})
// @from(Start 2989809, End 2989903)
EhA = z((M48, zS1) => {
  var whA = zhA();
  zS1.exports = whA;
  zS1.exports.default = whA
})
// @from(Start 2989909, End 2990132)
yhA = z(($68, OS1) => {
  var jhA = (A, B) => {
    for (let Q of Reflect.ownKeys(B)) Object.defineProperty(A, Q, Object.getOwnPropertyDescriptor(B, Q));
    return A
  };
  OS1.exports = jhA;
  OS1.exports.default = jhA
})
// @from(Start 2990138, End 2990889)
xhA = z((q68, Y31) => {
  var WA4 = yhA(),
    D31 = new WeakMap,
    khA = (A, B = {}) => {
      if (typeof A !== "function") throw new TypeError("Expected a function");
      let Q, I = 0,
        G = A.displayName || A.name || "<anonymous>",
        Z = function(...D) {
          if (D31.set(Z, ++I), I === 1) Q = A.apply(this, D), A = null;
          else if (B.throw === !0) throw new Error(`Function \`${G}\` can only be called once`);
          return Q
        };
      return WA4(Z, A), D31.set(Z, I), Z
    };
  Y31.exports = khA;
  Y31.exports.default = khA;
  Y31.exports.callCount = (A) => {
    if (!D31.has(A)) throw new Error(`The given function \`${A.name}\` is not wrapped by the \`onetime\` package`);
    return D31.get(A)
  }
})
// @from(Start 2990895, End 2991243)
fhA = z((M68, W31) => {
  W31.exports = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
  if (process.platform !== "win32") W31.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
  if (process.platform === "linux") W31.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED")
})
// @from(Start 2991249, End 2994176)
vhA = z((L68, ov) => {
  var aB = global.process,
    yS = function(A) {
      return A && typeof A === "object" && typeof A.removeListener === "function" && typeof A.emit === "function" && typeof A.reallyExit === "function" && typeof A.listeners === "function" && typeof A.kill === "function" && typeof A.pid === "number" && typeof A.on === "function"
    };
  if (!yS(aB)) ov.exports = function() {
    return function() {}
  };
  else {
    if (TS1 = Z1("assert"), kS = fhA(), PS1 = /^win/i.test(aB.platform), rv = Z1("events"), typeof rv !== "function") rv = rv.EventEmitter;
    if (aB.__signal_exit_emitter__) g7 = aB.__signal_exit_emitter__;
    else g7 = aB.__signal_exit_emitter__ = new rv, g7.count = 0, g7.emitted = {};
    if (!g7.infinite) g7.setMaxListeners(1 / 0), g7.infinite = !0;
    ov.exports = function(A, B) {
      if (!yS(global.process)) return function() {};
      if (TS1.equal(typeof A, "function", "a callback must be provided for exit handler"), xS === !1) J31();
      var Q = "exit";
      if (B && B.alwaysLast) Q = "afterexit";
      var I = function() {
        if (g7.removeListener(Q, A), g7.listeners("exit").length === 0 && g7.listeners("afterexit").length === 0) _n()
      };
      return g7.on(Q, A), I
    }, _n = function A() {
      if (!xS || !yS(global.process)) return;
      xS = !1, kS.forEach(function(B) {
        try {
          aB.removeListener(B, jn[B])
        } catch (Q) {}
      }), aB.emit = yn, aB.reallyExit = F31, g7.count -= 1
    }, ov.exports.unload = _n, VL = function A(B, Q, I) {
      if (g7.emitted[B]) return;
      g7.emitted[B] = !0, g7.emit(B, Q, I)
    }, jn = {}, kS.forEach(function(A) {
      jn[A] = function B() {
        if (!yS(global.process)) return;
        var Q = aB.listeners(A);
        if (Q.length === g7.count) {
          if (_n(), VL("exit", null, A), VL("afterexit", null, A), PS1 && A === "SIGHUP") A = "SIGINT";
          aB.kill(aB.pid, A)
        }
      }
    }), ov.exports.signals = function() {
      return kS
    }, xS = !1, J31 = function A() {
      if (xS || !yS(global.process)) return;
      xS = !0, g7.count += 1, kS = kS.filter(function(B) {
        try {
          return aB.on(B, jn[B]), !0
        } catch (Q) {
          return !1
        }
      }), aB.emit = _S1, aB.reallyExit = SS1
    }, ov.exports.load = J31, F31 = aB.reallyExit, SS1 = function A(B) {
      if (!yS(global.process)) return;
      aB.exitCode = B || 0, VL("exit", aB.exitCode, null), VL("afterexit", aB.exitCode, null), F31.call(aB, aB.exitCode)
    }, yn = aB.emit, _S1 = function A(B, Q) {
      if (B === "exit" && yS(global.process)) {
        if (Q !== void 0) aB.exitCode = Q;
        var I = yn.apply(this, arguments);
        return VL("exit", aB.exitCode, null), VL("afterexit", aB.exitCode, null), I
      } else return yn.apply(this, arguments)
    }
  }
  var TS1, kS, PS1, rv, g7, _n, VL, jn, xS, J31, F31, SS1, yn, _S1
})
// @from(Start 2994182, End 2994380)
ehA = z((m68, thA) => {
  var HA4 = /[|\\{}()[\]^$+*?.-]/g;
  thA.exports = (A) => {
    if (typeof A !== "string") throw new TypeError("Expected a string");
    return A.replace(HA4, "\\$&")
  }
})
// @from(Start 2994386, End 2999432)
ImA = z((d68, QmA) => {
  var zA4 = ehA(),
    wA4 = typeof process === "object" && process && typeof process.cwd === "function" ? process.cwd() : ".",
    BmA = [].concat(Z1("module").builtinModules, "bootstrap_node", "node").map((A) => new RegExp(`(?:\\((?:node:)?${A}(?:\\.js)?:\\d+:\\d+\\)$|^\\s*at (?:node:)?${A}(?:\\.js)?:\\d+:\\d+$)`));
  BmA.push(/\((?:node:)?internal\/[^:]+:\d+:\d+\)$/, /\s*at (?:node:)?internal\/[^:]+:\d+:\d+$/, /\/\.node-spawn-wrap-\w+-\w+\/node:\d+:\d+\)?$/);
  class xS1 {
    constructor(A) {
      if (A = {
          ignoredPackages: [],
          ...A
        }, "internals" in A === !1) A.internals = xS1.nodeInternals();
      if ("cwd" in A === !1) A.cwd = wA4;
      this._cwd = A.cwd.replace(/\\/g, "/"), this._internals = [].concat(A.internals, EA4(A.ignoredPackages)), this._wrapCallSite = A.wrapCallSite || !1
    }
    static nodeInternals() {
      return [...BmA]
    }
    clean(A, B = 0) {
      if (B = " ".repeat(B), !Array.isArray(A)) A = A.split(`
`);
      if (!/^\s*at /.test(A[0]) && /^\s*at /.test(A[1])) A = A.slice(1);
      let Q = !1,
        I = null,
        G = [];
      return A.forEach((Z) => {
        if (Z = Z.replace(/\\/g, "/"), this._internals.some((Y) => Y.test(Z))) return;
        let D = /^\s*at /.test(Z);
        if (Q) Z = Z.trimEnd().replace(/^(\s+)at /, "$1");
        else if (Z = Z.trim(), D) Z = Z.slice(3);
        if (Z = Z.replace(`${this._cwd}/`, ""), Z)
          if (D) {
            if (I) G.push(I), I = null;
            G.push(Z)
          } else Q = !0, I = Z
      }), G.map((Z) => `${B}${Z}
`).join("")
    }
    captureString(A, B = this.captureString) {
      if (typeof A === "function") B = A, A = 1 / 0;
      let {
        stackTraceLimit: Q
      } = Error;
      if (A) Error.stackTraceLimit = A;
      let I = {};
      Error.captureStackTrace(I, B);
      let {
        stack: G
      } = I;
      return Error.stackTraceLimit = Q, this.clean(G)
    }
    capture(A, B = this.capture) {
      if (typeof A === "function") B = A, A = 1 / 0;
      let {
        prepareStackTrace: Q,
        stackTraceLimit: I
      } = Error;
      if (Error.prepareStackTrace = (D, Y) => {
          if (this._wrapCallSite) return Y.map(this._wrapCallSite);
          return Y
        }, A) Error.stackTraceLimit = A;
      let G = {};
      Error.captureStackTrace(G, B);
      let {
        stack: Z
      } = G;
      return Object.assign(Error, {
        prepareStackTrace: Q,
        stackTraceLimit: I
      }), Z
    }
    at(A = this.at) {
      let [B] = this.capture(1, A);
      if (!B) return {};
      let Q = {
        line: B.getLineNumber(),
        column: B.getColumnNumber()
      };
      if (AmA(Q, B.getFileName(), this._cwd), B.isConstructor()) Object.defineProperty(Q, "constructor", {
        value: !0,
        configurable: !0
      });
      if (B.isEval()) Q.evalOrigin = B.getEvalOrigin();
      if (B.isNative()) Q.native = !0;
      let I;
      try {
        I = B.getTypeName()
      } catch (D) {}
      if (I && I !== "Object" && I !== "[object Object]") Q.type = I;
      let G = B.getFunctionName();
      if (G) Q.function = G;
      let Z = B.getMethodName();
      if (Z && G !== Z) Q.method = Z;
      return Q
    }
    parseLine(A) {
      let B = A && A.match(UA4);
      if (!B) return null;
      let Q = B[1] === "new",
        I = B[2],
        G = B[3],
        Z = B[4],
        D = Number(B[5]),
        Y = Number(B[6]),
        W = B[7],
        J = B[8],
        F = B[9],
        X = B[10] === "native",
        V = B[11] === ")",
        C, K = {};
      if (J) K.line = Number(J);
      if (F) K.column = Number(F);
      if (V && W) {
        let E = 0;
        for (let N = W.length - 1; N > 0; N--)
          if (W.charAt(N) === ")") E++;
          else if (W.charAt(N) === "(" && W.charAt(N - 1) === " ") {
          if (E--, E === -1 && W.charAt(N - 1) === " ") {
            let q = W.slice(0, N - 1);
            W = W.slice(N + 1), I += ` (${q}`;
            break
          }
        }
      }
      if (I) {
        let E = I.match(NA4);
        if (E) I = E[1], C = E[2]
      }
      if (AmA(K, W, this._cwd), Q) Object.defineProperty(K, "constructor", {
        value: !0,
        configurable: !0
      });
      if (G) K.evalOrigin = G, K.evalLine = D, K.evalColumn = Y, K.evalFile = Z && Z.replace(/\\/g, "/");
      if (X) K.native = !0;
      if (I) K.function = I;
      if (C && I !== C) K.method = C;
      return K
    }
  }

  function AmA(A, B, Q) {
    if (B) {
      if (B = B.replace(/\\/g, "/"), B.startsWith(`${Q}/`)) B = B.slice(Q.length + 1);
      A.file = B
    }
  }

  function EA4(A) {
    if (A.length === 0) return [];
    let B = A.map((Q) => zA4(Q));
    return new RegExp(`[/\\\\]node_modules[/\\\\](?:${B.join("|")})[/\\\\][^:]+:\\d+:\\d+`)
  }
  var UA4 = new RegExp("^(?:\\s*at )?(?:(new) )?(?:(.*?) \\()?(?:eval at ([^ ]+) \\((.+?):(\\d+):(\\d+)\\), )?(?:(.+?):(\\d+):(\\d+)|(native))(\\)?)$"),
    NA4 = /^(.*?) \[as (.*?)\]$/;
  QmA.exports = xS1
})
// @from(Start 2999438, End 3005791)
pmA = z((vB8, umA) => {
  var KL = Z1("constants"),
    J04 = process.cwd,
    P31 = null,
    F04 = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    if (!P31) P31 = J04.call(process);
    return P31
  };
  try {
    process.cwd()
  } catch (A) {}
  if (typeof process.chdir === "function") {
    if (S31 = process.chdir, process.chdir = function(A) {
        P31 = null, S31.call(process, A)
      }, Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, S31)
  }
  var S31;
  umA.exports = X04;

  function X04(A) {
    if (KL.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) B(A);
    if (!A.lutimes) Q(A);
    if (A.chown = Z(A.chown), A.fchown = Z(A.fchown), A.lchown = Z(A.lchown), A.chmod = I(A.chmod), A.fchmod = I(A.fchmod), A.lchmod = I(A.lchmod), A.chownSync = D(A.chownSync), A.fchownSync = D(A.fchownSync), A.lchownSync = D(A.lchownSync), A.chmodSync = G(A.chmodSync), A.fchmodSync = G(A.fchmodSync), A.lchmodSync = G(A.lchmodSync), A.stat = Y(A.stat), A.fstat = Y(A.fstat), A.lstat = Y(A.lstat), A.statSync = W(A.statSync), A.fstatSync = W(A.fstatSync), A.lstatSync = W(A.lstatSync), A.chmod && !A.lchmod) A.lchmod = function(F, X, V) {
      if (V) process.nextTick(V)
    }, A.lchmodSync = function() {};
    if (A.chown && !A.lchown) A.lchown = function(F, X, V, C) {
      if (C) process.nextTick(C)
    }, A.lchownSync = function() {};
    if (F04 === "win32") A.rename = typeof A.rename !== "function" ? A.rename : function(F) {
      function X(V, C, K) {
        var E = Date.now(),
          N = 0;
        F(V, C, function q(O) {
          if (O && (O.code === "EACCES" || O.code === "EPERM" || O.code === "EBUSY") && Date.now() - E < 60000) {
            if (setTimeout(function() {
                A.stat(C, function(R, T) {
                  if (R && R.code === "ENOENT") F(V, C, q);
                  else K(O)
                })
              }, N), N < 100) N += 10;
            return
          }
          if (K) K(O)
        })
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(X, F);
      return X
    }(A.rename);
    A.read = typeof A.read !== "function" ? A.read : function(F) {
      function X(V, C, K, E, N, q) {
        var O;
        if (q && typeof q === "function") {
          var R = 0;
          O = function(T, L, _) {
            if (T && T.code === "EAGAIN" && R < 10) return R++, F.call(A, V, C, K, E, N, O);
            q.apply(this, arguments)
          }
        }
        return F.call(A, V, C, K, E, N, O)
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(X, F);
      return X
    }(A.read), A.readSync = typeof A.readSync !== "function" ? A.readSync : function(F) {
      return function(X, V, C, K, E) {
        var N = 0;
        while (!0) try {
          return F.call(A, X, V, C, K, E)
        } catch (q) {
          if (q.code === "EAGAIN" && N < 10) {
            N++;
            continue
          }
          throw q
        }
      }
    }(A.readSync);

    function B(F) {
      F.lchmod = function(X, V, C) {
        F.open(X, KL.O_WRONLY | KL.O_SYMLINK, V, function(K, E) {
          if (K) {
            if (C) C(K);
            return
          }
          F.fchmod(E, V, function(N) {
            F.close(E, function(q) {
              if (C) C(N || q)
            })
          })
        })
      }, F.lchmodSync = function(X, V) {
        var C = F.openSync(X, KL.O_WRONLY | KL.O_SYMLINK, V),
          K = !0,
          E;
        try {
          E = F.fchmodSync(C, V), K = !1
        } finally {
          if (K) try {
            F.closeSync(C)
          } catch (N) {} else F.closeSync(C)
        }
        return E
      }
    }

    function Q(F) {
      if (KL.hasOwnProperty("O_SYMLINK") && F.futimes) F.lutimes = function(X, V, C, K) {
        F.open(X, KL.O_SYMLINK, function(E, N) {
          if (E) {
            if (K) K(E);
            return
          }
          F.futimes(N, V, C, function(q) {
            F.close(N, function(O) {
              if (K) K(q || O)
            })
          })
        })
      }, F.lutimesSync = function(X, V, C) {
        var K = F.openSync(X, KL.O_SYMLINK),
          E, N = !0;
        try {
          E = F.futimesSync(K, V, C), N = !1
        } finally {
          if (N) try {
            F.closeSync(K)
          } catch (q) {} else F.closeSync(K)
        }
        return E
      };
      else if (F.futimes) F.lutimes = function(X, V, C, K) {
        if (K) process.nextTick(K)
      }, F.lutimesSync = function() {}
    }

    function I(F) {
      if (!F) return F;
      return function(X, V, C) {
        return F.call(A, X, V, function(K) {
          if (J(K)) K = null;
          if (C) C.apply(this, arguments)
        })
      }
    }

    function G(F) {
      if (!F) return F;
      return function(X, V) {
        try {
          return F.call(A, X, V)
        } catch (C) {
          if (!J(C)) throw C
        }
      }
    }

    function Z(F) {
      if (!F) return F;
      return function(X, V, C, K) {
        return F.call(A, X, V, C, function(E) {
          if (J(E)) E = null;
          if (K) K.apply(this, arguments)
        })
      }
    }

    function D(F) {
      if (!F) return F;
      return function(X, V, C) {
        try {
          return F.call(A, X, V, C)
        } catch (K) {
          if (!J(K)) throw K
        }
      }
    }

    function Y(F) {
      if (!F) return F;
      return function(X, V, C) {
        if (typeof V === "function") C = V, V = null;

        function K(E, N) {
          if (N) {
            if (N.uid < 0) N.uid += 4294967296;
            if (N.gid < 0) N.gid += 4294967296
          }
          if (C) C.apply(this, arguments)
        }
        return V ? F.call(A, X, V, K) : F.call(A, X, K)
      }
    }

    function W(F) {
      if (!F) return F;
      return function(X, V) {
        var C = V ? F.call(A, X, V) : F.call(A, X);
        if (C) {
          if (C.uid < 0) C.uid += 4294967296;
          if (C.gid < 0) C.gid += 4294967296
        }
        return C
      }
    }

    function J(F) {
      if (!F) return !0;
      if (F.code === "ENOSYS") return !0;
      var X = !process.getuid || process.getuid() !== 0;
      if (X) {
        if (F.code === "EINVAL" || F.code === "EPERM") return !0
      }
      return !1
    }
  }
})
// @from(Start 3005797, End 3007921)
imA = z((bB8, lmA) => {
  var cmA = Z1("stream").Stream;
  lmA.exports = V04;

  function V04(A) {
    return {
      ReadStream: B,
      WriteStream: Q
    };

    function B(I, G) {
      if (!(this instanceof B)) return new B(I, G);
      cmA.call(this);
      var Z = this;
      this.path = I, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 65536, G = G || {};
      var D = Object.keys(G);
      for (var Y = 0, W = D.length; Y < W; Y++) {
        var J = D[Y];
        this[J] = G[J]
      }
      if (this.encoding) this.setEncoding(this.encoding);
      if (this.start !== void 0) {
        if (typeof this.start !== "number") throw TypeError("start must be a Number");
        if (this.end === void 0) this.end = 1 / 0;
        else if (typeof this.end !== "number") throw TypeError("end must be a Number");
        if (this.start > this.end) throw new Error("start must be <= end");
        this.pos = this.start
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          Z._read()
        });
        return
      }
      A.open(this.path, this.flags, this.mode, function(F, X) {
        if (F) {
          Z.emit("error", F), Z.readable = !1;
          return
        }
        Z.fd = X, Z.emit("open", X), Z._read()
      })
    }

    function Q(I, G) {
      if (!(this instanceof Q)) return new Q(I, G);
      cmA.call(this), this.path = I, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, G = G || {};
      var Z = Object.keys(G);
      for (var D = 0, Y = Z.length; D < Y; D++) {
        var W = Z[D];
        this[W] = G[W]
      }
      if (this.start !== void 0) {
        if (typeof this.start !== "number") throw TypeError("start must be a Number");
        if (this.start < 0) throw new Error("start must be >= zero");
        this.pos = this.start
      }
      if (this.busy = !1, this._queue = [], this.fd === null) this._open = A.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush()
    }
  }
})
// @from(Start 3007927, End 3008387)
amA = z((gB8, nmA) => {
  nmA.exports = K04;
  var C04 = Object.getPrototypeOf || function(A) {
    return A.__proto__
  };

  function K04(A) {
    if (A === null || typeof A !== "object") return A;
    if (A instanceof Object) var B = {
      __proto__: C04(A)
    };
    else var B = Object.create(null);
    return Object.getOwnPropertyNames(A).forEach(function(Q) {
      Object.defineProperty(B, Q, Object.getOwnPropertyDescriptor(A, Q))
    }), B
  }
})
// @from(Start 3008393, End 3016213)
oS1 = z((hB8, rS1) => {
  var N3 = Z1("fs"),
    H04 = pmA(),
    z04 = imA(),
    w04 = amA(),
    _31 = Z1("util"),
    MG, y31;
  if (typeof Symbol === "function" && typeof Symbol.for === "function") MG = Symbol.for("graceful-fs.queue"), y31 = Symbol.for("graceful-fs.previous");
  else MG = "___graceful-fs.queue", y31 = "___graceful-fs.previous";

  function E04() {}

  function rmA(A, B) {
    Object.defineProperty(A, MG, {
      get: function() {
        return B
      }
    })
  }
  var vS = E04;
  if (_31.debuglog) vS = _31.debuglog("gfs4");
  else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) vS = function() {
    var A = _31.format.apply(_31, arguments);
    A = "GFS4: " + A.split(/\n/).join(`
GFS4: `), console.error(A)
  };
  if (!N3[MG]) {
    if (nS1 = global[MG] || [], rmA(N3, nS1), N3.close = function(A) {
        function B(Q, I) {
          return A.call(N3, Q, function(G) {
            if (!G) smA();
            if (typeof I === "function") I.apply(this, arguments)
          })
        }
        return Object.defineProperty(B, y31, {
          value: A
        }), B
      }(N3.close), N3.closeSync = function(A) {
        function B(Q) {
          A.apply(N3, arguments), smA()
        }
        return Object.defineProperty(B, y31, {
          value: A
        }), B
      }(N3.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) process.on("exit", function() {
      vS(N3[MG]), Z1("assert").equal(N3[MG].length, 0)
    })
  }
  var nS1;
  if (!global[MG]) rmA(global, N3[MG]);
  rS1.exports = aS1(w04(N3));
  if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !N3.__patched) rS1.exports = aS1(N3), N3.__patched = !0;

  function aS1(A) {
    H04(A), A.gracefulify = aS1, A.createReadStream = L, A.createWriteStream = _;
    var B = A.readFile;
    A.readFile = Q;

    function Q(x, s, d) {
      if (typeof s === "function") d = s, s = null;
      return F1(x, s, d);

      function F1(X1, v, D1, N1) {
        return B(X1, v, function(u1) {
          if (u1 && (u1.code === "EMFILE" || u1.code === "ENFILE")) Ib([F1, [X1, v, D1], u1, N1 || Date.now(), Date.now()]);
          else if (typeof D1 === "function") D1.apply(this, arguments)
        })
      }
    }
    var I = A.writeFile;
    A.writeFile = G;

    function G(x, s, d, F1) {
      if (typeof d === "function") F1 = d, d = null;
      return X1(x, s, d, F1);

      function X1(v, D1, N1, u1, d1) {
        return I(v, D1, N1, function(YA) {
          if (YA && (YA.code === "EMFILE" || YA.code === "ENFILE")) Ib([X1, [v, D1, N1, u1], YA, d1 || Date.now(), Date.now()]);
          else if (typeof u1 === "function") u1.apply(this, arguments)
        })
      }
    }
    var Z = A.appendFile;
    if (Z) A.appendFile = D;

    function D(x, s, d, F1) {
      if (typeof d === "function") F1 = d, d = null;
      return X1(x, s, d, F1);

      function X1(v, D1, N1, u1, d1) {
        return Z(v, D1, N1, function(YA) {
          if (YA && (YA.code === "EMFILE" || YA.code === "ENFILE")) Ib([X1, [v, D1, N1, u1], YA, d1 || Date.now(), Date.now()]);
          else if (typeof u1 === "function") u1.apply(this, arguments)
        })
      }
    }
    var Y = A.copyFile;
    if (Y) A.copyFile = W;

    function W(x, s, d, F1) {
      if (typeof d === "function") F1 = d, d = 0;
      return X1(x, s, d, F1);

      function X1(v, D1, N1, u1, d1) {
        return Y(v, D1, N1, function(YA) {
          if (YA && (YA.code === "EMFILE" || YA.code === "ENFILE")) Ib([X1, [v, D1, N1, u1], YA, d1 || Date.now(), Date.now()]);
          else if (typeof u1 === "function") u1.apply(this, arguments)
        })
      }
    }
    var J = A.readdir;
    A.readdir = X;
    var F = /^v[0-5]\./;

    function X(x, s, d) {
      if (typeof s === "function") d = s, s = null;
      var F1 = F.test(process.version) ? function v(D1, N1, u1, d1) {
        return J(D1, X1(D1, N1, u1, d1))
      } : function v(D1, N1, u1, d1) {
        return J(D1, N1, X1(D1, N1, u1, d1))
      };
      return F1(x, s, d);

      function X1(v, D1, N1, u1) {
        return function(d1, YA) {
          if (d1 && (d1.code === "EMFILE" || d1.code === "ENFILE")) Ib([F1, [v, D1, N1], d1, u1 || Date.now(), Date.now()]);
          else {
            if (YA && YA.sort) YA.sort();
            if (typeof N1 === "function") N1.call(this, d1, YA)
          }
        }
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var V = z04(A);
      q = V.ReadStream, R = V.WriteStream
    }
    var C = A.ReadStream;
    if (C) q.prototype = Object.create(C.prototype), q.prototype.open = O;
    var K = A.WriteStream;
    if (K) R.prototype = Object.create(K.prototype), R.prototype.open = T;
    Object.defineProperty(A, "ReadStream", {
      get: function() {
        return q
      },
      set: function(x) {
        q = x
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(A, "WriteStream", {
      get: function() {
        return R
      },
      set: function(x) {
        R = x
      },
      enumerable: !0,
      configurable: !0
    });
    var E = q;
    Object.defineProperty(A, "FileReadStream", {
      get: function() {
        return E
      },
      set: function(x) {
        E = x
      },
      enumerable: !0,
      configurable: !0
    });
    var N = R;
    Object.defineProperty(A, "FileWriteStream", {
      get: function() {
        return N
      },
      set: function(x) {
        N = x
      },
      enumerable: !0,
      configurable: !0
    });

    function q(x, s) {
      if (this instanceof q) return C.apply(this, arguments), this;
      else return q.apply(Object.create(q.prototype), arguments)
    }

    function O() {
      var x = this;
      i(x.path, x.flags, x.mode, function(s, d) {
        if (s) {
          if (x.autoClose) x.destroy();
          x.emit("error", s)
        } else x.fd = d, x.emit("open", d), x.read()
      })
    }

    function R(x, s) {
      if (this instanceof R) return K.apply(this, arguments), this;
      else return R.apply(Object.create(R.prototype), arguments)
    }

    function T() {
      var x = this;
      i(x.path, x.flags, x.mode, function(s, d) {
        if (s) x.destroy(), x.emit("error", s);
        else x.fd = d, x.emit("open", d)
      })
    }

    function L(x, s) {
      return new A.ReadStream(x, s)
    }

    function _(x, s) {
      return new A.WriteStream(x, s)
    }
    var k = A.open;
    A.open = i;

    function i(x, s, d, F1) {
      if (typeof d === "function") F1 = d, d = null;
      return X1(x, s, d, F1);

      function X1(v, D1, N1, u1, d1) {
        return k(v, D1, N1, function(YA, bA) {
          if (YA && (YA.code === "EMFILE" || YA.code === "ENFILE")) Ib([X1, [v, D1, N1, u1], YA, d1 || Date.now(), Date.now()]);
          else if (typeof u1 === "function") u1.apply(this, arguments)
        })
      }
    }
    return A
  }

  function Ib(A) {
    vS("ENQUEUE", A[0].name, A[1]), N3[MG].push(A), sS1()
  }
  var j31;

  function smA() {
    var A = Date.now();
    for (var B = 0; B < N3[MG].length; ++B)
      if (N3[MG][B].length > 2) N3[MG][B][3] = A, N3[MG][B][4] = A;
    sS1()
  }

  function sS1() {
    if (clearTimeout(j31), j31 = void 0, N3[MG].length === 0) return;
    var A = N3[MG].shift(),
      B = A[0],
      Q = A[1],
      I = A[2],
      G = A[3],
      Z = A[4];
    if (G === void 0) vS("RETRY", B.name, Q), B.apply(null, Q);
    else if (Date.now() - G >= 60000) {
      vS("TIMEOUT", B.name, Q);
      var D = Q.pop();
      if (typeof D === "function") D.call(null, I)
    } else {
      var Y = Date.now() - Z,
        W = Math.max(Z - G, 1),
        J = Math.min(W * 1.2, 100);
      if (Y >= J) vS("RETRY", B.name, Q), B.apply(null, Q.concat([G]));
      else N3[MG].push(A)
    }
    if (j31 === void 0) j31 = setTimeout(sS1, 0)
  }
})
// @from(Start 3016219, End 3019115)
tmA = z((mB8, omA) => {
  function IX(A, B) {
    if (typeof B === "boolean") B = {
      forever: B
    };
    if (this._originalTimeouts = JSON.parse(JSON.stringify(A)), this._timeouts = A, this._options = B || {}, this._maxRetryTime = B && B.maxRetryTime || 1 / 0, this._fn = null, this._errors = [], this._attempts = 1, this._operationTimeout = null, this._operationTimeoutCb = null, this._timeout = null, this._operationStart = null, this._options.forever) this._cachedTimeouts = this._timeouts.slice(0)
  }
  omA.exports = IX;
  IX.prototype.reset = function() {
    this._attempts = 1, this._timeouts = this._originalTimeouts
  };
  IX.prototype.stop = function() {
    if (this._timeout) clearTimeout(this._timeout);
    this._timeouts = [], this._cachedTimeouts = null
  };
  IX.prototype.retry = function(A) {
    if (this._timeout) clearTimeout(this._timeout);
    if (!A) return !1;
    var B = new Date().getTime();
    if (A && B - this._operationStart >= this._maxRetryTime) return this._errors.unshift(new Error("RetryOperation timeout occurred")), !1;
    this._errors.push(A);
    var Q = this._timeouts.shift();
    if (Q === void 0)
      if (this._cachedTimeouts) this._errors.splice(this._errors.length - 1, this._errors.length), this._timeouts = this._cachedTimeouts.slice(0), Q = this._timeouts.shift();
      else return !1;
    var I = this,
      G = setTimeout(function() {
        if (I._attempts++, I._operationTimeoutCb) {
          if (I._timeout = setTimeout(function() {
              I._operationTimeoutCb(I._attempts)
            }, I._operationTimeout), I._options.unref) I._timeout.unref()
        }
        I._fn(I._attempts)
      }, Q);
    if (this._options.unref) G.unref();
    return !0
  };
  IX.prototype.attempt = function(A, B) {
    if (this._fn = A, B) {
      if (B.timeout) this._operationTimeout = B.timeout;
      if (B.cb) this._operationTimeoutCb = B.cb
    }
    var Q = this;
    if (this._operationTimeoutCb) this._timeout = setTimeout(function() {
      Q._operationTimeoutCb()
    }, Q._operationTimeout);
    this._operationStart = new Date().getTime(), this._fn(this._attempts)
  };
  IX.prototype.try = function(A) {
    console.log("Using RetryOperation.try() is deprecated"), this.attempt(A)
  };
  IX.prototype.start = function(A) {
    console.log("Using RetryOperation.start() is deprecated"), this.attempt(A)
  };
  IX.prototype.start = IX.prototype.try;
  IX.prototype.errors = function() {
    return this._errors
  };
  IX.prototype.attempts = function() {
    return this._attempts
  };
  IX.prototype.mainError = function() {
    if (this._errors.length === 0) return null;
    var A = {},
      B = null,
      Q = 0;
    for (var I = 0; I < this._errors.length; I++) {
      var G = this._errors[I],
        Z = G.message,
        D = (A[Z] || 0) + 1;
      if (A[Z] = D, D >= Q) B = G, Q = D
    }
    return B
  }
})
// @from(Start 3019121, End 3020790)
AdA = z((N04) => {
  var U04 = tmA();
  N04.operation = function(A) {
    var B = N04.timeouts(A);
    return new U04(B, {
      forever: A && A.forever,
      unref: A && A.unref,
      maxRetryTime: A && A.maxRetryTime
    })
  };
  N04.timeouts = function(A) {
    if (A instanceof Array) return [].concat(A);
    var B = {
      retries: 10,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 1 / 0,
      randomize: !1
    };
    for (var Q in A) B[Q] = A[Q];
    if (B.minTimeout > B.maxTimeout) throw new Error("minTimeout is greater than maxTimeout");
    var I = [];
    for (var G = 0; G < B.retries; G++) I.push(this.createTimeout(G, B));
    if (A && A.forever && !I.length) I.push(this.createTimeout(G, B));
    return I.sort(function(Z, D) {
      return Z - D
    }), I
  };
  N04.createTimeout = function(A, B) {
    var Q = B.randomize ? Math.random() + 1 : 1,
      I = Math.round(Q * B.minTimeout * Math.pow(B.factor, A));
    return I = Math.min(I, B.maxTimeout), I
  };
  N04.wrap = function(A, B, Q) {
    if (B instanceof Array) Q = B, B = null;
    if (!Q) {
      Q = [];
      for (var I in A)
        if (typeof A[I] === "function") Q.push(I)
    }
    for (var G = 0; G < Q.length; G++) {
      var Z = Q[G],
        D = A[Z];
      A[Z] = function Y(W) {
        var J = N04.operation(B),
          F = Array.prototype.slice.call(arguments, 1),
          X = F.pop();
        F.push(function(V) {
          if (J.retry(V)) return;
          if (V) arguments[0] = J.mainError();
          X.apply(this, arguments)
        }), J.attempt(function() {
          W.apply(A, F)
        })
      }.bind(A, D), A[Z].options = B
    }
  }
})
// @from(Start 3020796, End 3021144)
BdA = z((uB8, k31) => {
  k31.exports = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
  if (process.platform !== "win32") k31.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
  if (process.platform === "linux") k31.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED")
})
// @from(Start 3021150, End 3024077)
QdA = z((pB8, Zb) => {
  var sB = global.process,
    bS = function(A) {
      return A && typeof A === "object" && typeof A.removeListener === "function" && typeof A.emit === "function" && typeof A.reallyExit === "function" && typeof A.listeners === "function" && typeof A.kill === "function" && typeof A.pid === "number" && typeof A.on === "function"
    };
  if (!bS(sB)) Zb.exports = function() {
    return function() {}
  };
  else {
    if (tS1 = Z1("assert"), gS = BdA(), eS1 = /^win/i.test(sB.platform), Gb = Z1("events"), typeof Gb !== "function") Gb = Gb.EventEmitter;
    if (sB.__signal_exit_emitter__) h7 = sB.__signal_exit_emitter__;
    else h7 = sB.__signal_exit_emitter__ = new Gb, h7.count = 0, h7.emitted = {};
    if (!h7.infinite) h7.setMaxListeners(1 / 0), h7.infinite = !0;
    Zb.exports = function(A, B) {
      if (!bS(global.process)) return function() {};
      if (tS1.equal(typeof A, "function", "a callback must be provided for exit handler"), hS === !1) x31();
      var Q = "exit";
      if (B && B.alwaysLast) Q = "afterexit";
      var I = function() {
        if (h7.removeListener(Q, A), h7.listeners("exit").length === 0 && h7.listeners("afterexit").length === 0) bn()
      };
      return h7.on(Q, A), I
    }, bn = function A() {
      if (!hS || !bS(global.process)) return;
      hS = !1, gS.forEach(function(B) {
        try {
          sB.removeListener(B, gn[B])
        } catch (Q) {}
      }), sB.emit = hn, sB.reallyExit = f31, h7.count -= 1
    }, Zb.exports.unload = bn, HL = function A(B, Q, I) {
      if (h7.emitted[B]) return;
      h7.emitted[B] = !0, h7.emit(B, Q, I)
    }, gn = {}, gS.forEach(function(A) {
      gn[A] = function B() {
        if (!bS(global.process)) return;
        var Q = sB.listeners(A);
        if (Q.length === h7.count) {
          if (bn(), HL("exit", null, A), HL("afterexit", null, A), eS1 && A === "SIGHUP") A = "SIGINT";
          sB.kill(sB.pid, A)
        }
      }
    }), Zb.exports.signals = function() {
      return gS
    }, hS = !1, x31 = function A() {
      if (hS || !bS(global.process)) return;
      hS = !0, h7.count += 1, gS = gS.filter(function(B) {
        try {
          return sB.on(B, gn[B]), !0
        } catch (Q) {
          return !1
        }
      }), sB.emit = B_1, sB.reallyExit = A_1
    }, Zb.exports.load = x31, f31 = sB.reallyExit, A_1 = function A(B) {
      if (!bS(global.process)) return;
      sB.exitCode = B || 0, HL("exit", sB.exitCode, null), HL("afterexit", sB.exitCode, null), f31.call(sB, sB.exitCode)
    }, hn = sB.emit, B_1 = function A(B, Q) {
      if (B === "exit" && bS(global.process)) {
        if (Q !== void 0) sB.exitCode = Q;
        var I = hn.apply(this, arguments);
        return HL("exit", sB.exitCode, null), HL("afterexit", sB.exitCode, null), I
      } else return hn.apply(this, arguments)
    }
  }
  var tS1, gS, eS1, Gb, h7, bn, HL, gn, hS, x31, f31, A_1, hn, B_1
})
// @from(Start 3024083, End 3024789)
GdA = z((O04, Q_1) => {
  var IdA = Symbol();

  function L04(A, B, Q) {
    let I = B[IdA];
    if (I) return B.stat(A, (Z, D) => {
      if (Z) return Q(Z);
      Q(null, D.mtime, I)
    });
    let G = new Date(Math.ceil(Date.now() / 1000) * 1000 + 5);
    B.utimes(A, G, G, (Z) => {
      if (Z) return Q(Z);
      B.stat(A, (D, Y) => {
        if (D) return Q(D);
        let W = Y.mtime.getTime() % 1000 === 0 ? "s" : "ms";
        Object.defineProperty(B, IdA, {
          value: W
        }), Q(null, Y.mtime, W)
      })
    })
  }

  function R04(A) {
    let B = Date.now();
    if (A === "s") B = Math.ceil(B / 1000) * 1000;
    return new Date(B)
  }
  O04.probe = L04;
  O04.getMtime = R04
})
// @from(Start 3024795, End 3029908)
JdA = z((f04, dn) => {
  var S04 = Z1("path"),
    Z_1 = oS1(),
    _04 = AdA(),
    j04 = QdA(),
    ZdA = GdA(),
    IN = {};

  function mn(A, B) {
    return B.lockfilePath || `${A}.lock`
  }

  function D_1(A, B, Q) {
    if (!B.realpath) return Q(null, S04.resolve(A));
    B.fs.realpath(A, Q)
  }

  function G_1(A, B, Q) {
    let I = mn(A, B);
    B.fs.mkdir(I, (G) => {
      if (!G) return ZdA.probe(I, B.fs, (Z, D, Y) => {
        if (Z) return B.fs.rmdir(I, () => {}), Q(Z);
        Q(null, D, Y)
      });
      if (G.code !== "EEXIST") return Q(G);
      if (B.stale <= 0) return Q(Object.assign(new Error("Lock file is already being held"), {
        code: "ELOCKED",
        file: A
      }));
      B.fs.stat(I, (Z, D) => {
        if (Z) {
          if (Z.code === "ENOENT") return G_1(A, {
            ...B,
            stale: 0
          }, Q);
          return Q(Z)
        }
        if (!DdA(D, B)) return Q(Object.assign(new Error("Lock file is already being held"), {
          code: "ELOCKED",
          file: A
        }));
        YdA(A, B, (Y) => {
          if (Y) return Q(Y);
          G_1(A, {
            ...B,
            stale: 0
          }, Q)
        })
      })
    })
  }

  function DdA(A, B) {
    return A.mtime.getTime() < Date.now() - B.stale
  }

  function YdA(A, B, Q) {
    B.fs.rmdir(mn(A, B), (I) => {
      if (I && I.code !== "ENOENT") return Q(I);
      Q()
    })
  }

  function v31(A, B) {
    let Q = IN[A];
    if (Q.updateTimeout) return;
    if (Q.updateDelay = Q.updateDelay || B.update, Q.updateTimeout = setTimeout(() => {
        Q.updateTimeout = null, B.fs.stat(Q.lockfilePath, (I, G) => {
          let Z = Q.lastUpdate + B.stale < Date.now();
          if (I) {
            if (I.code === "ENOENT" || Z) return I_1(A, Q, Object.assign(I, {
              code: "ECOMPROMISED"
            }));
            return Q.updateDelay = 1000, v31(A, B)
          }
          if (Q.mtime.getTime() !== G.mtime.getTime()) return I_1(A, Q, Object.assign(new Error("Unable to update lock within the stale threshold"), {
            code: "ECOMPROMISED"
          }));
          let Y = ZdA.getMtime(Q.mtimePrecision);
          B.fs.utimes(Q.lockfilePath, Y, Y, (W) => {
            let J = Q.lastUpdate + B.stale < Date.now();
            if (Q.released) return;
            if (W) {
              if (W.code === "ENOENT" || J) return I_1(A, Q, Object.assign(W, {
                code: "ECOMPROMISED"
              }));
              return Q.updateDelay = 1000, v31(A, B)
            }
            Q.mtime = Y, Q.lastUpdate = Date.now(), Q.updateDelay = null, v31(A, B)
          })
        })
      }, Q.updateDelay), Q.updateTimeout.unref) Q.updateTimeout.unref()
  }

  function I_1(A, B, Q) {
    if (B.released = !0, B.updateTimeout) clearTimeout(B.updateTimeout);
    if (IN[A] === B) delete IN[A];
    B.options.onCompromised(Q)
  }

  function y04(A, B, Q) {
    B = {
      stale: 1e4,
      update: null,
      realpath: !0,
      retries: 0,
      fs: Z_1,
      onCompromised: (I) => {
        throw I
      },
      ...B
    }, B.retries = B.retries || 0, B.retries = typeof B.retries === "number" ? {
      retries: B.retries
    } : B.retries, B.stale = Math.max(B.stale || 0, 2000), B.update = B.update == null ? B.stale / 2 : B.update || 0, B.update = Math.max(Math.min(B.update, B.stale / 2), 1000), D_1(A, B, (I, G) => {
      if (I) return Q(I);
      let Z = _04.operation(B.retries);
      Z.attempt(() => {
        G_1(G, B, (D, Y, W) => {
          if (Z.retry(D)) return;
          if (D) return Q(Z.mainError());
          let J = IN[G] = {
            lockfilePath: mn(G, B),
            mtime: Y,
            mtimePrecision: W,
            options: B,
            lastUpdate: Date.now()
          };
          v31(G, B), Q(null, (F) => {
            if (J.released) return F && F(Object.assign(new Error("Lock is already released"), {
              code: "ERELEASED"
            }));
            WdA(G, {
              ...B,
              realpath: !1
            }, F)
          })
        })
      })
    })
  }

  function WdA(A, B, Q) {
    B = {
      fs: Z_1,
      realpath: !0,
      ...B
    }, D_1(A, B, (I, G) => {
      if (I) return Q(I);
      let Z = IN[G];
      if (!Z) return Q(Object.assign(new Error("Lock is not acquired/owned by you"), {
        code: "ENOTACQUIRED"
      }));
      Z.updateTimeout && clearTimeout(Z.updateTimeout), Z.released = !0, delete IN[G], YdA(G, B, Q)
    })
  }

  function k04(A, B, Q) {
    B = {
      stale: 1e4,
      realpath: !0,
      fs: Z_1,
      ...B
    }, B.stale = Math.max(B.stale || 0, 2000), D_1(A, B, (I, G) => {
      if (I) return Q(I);
      B.fs.stat(mn(G, B), (Z, D) => {
        if (Z) return Z.code === "ENOENT" ? Q(null, !1) : Q(Z);
        return Q(null, !DdA(D, B))
      })
    })
  }

  function x04() {
    return IN
  }
  j04(() => {
    for (let A in IN) {
      let B = IN[A].options;
      try {
        B.fs.rmdirSync(mn(A, B))
      } catch (Q) {}
    }
  });
  f04.lock = y04;
  f04.unlock = WdA;
  f04.check = k04;
  f04.getLocks = x04
})
// @from(Start 3029914, End 3031050)
XdA = z((cB8, FdA) => {
  var m04 = oS1();

  function d04(A) {
    let B = ["mkdir", "realpath", "stat", "rmdir", "utimes"],
      Q = {
        ...A
      };
    return B.forEach((I) => {
      Q[I] = (...G) => {
        let Z = G.pop(),
          D;
        try {
          D = A[`${I}Sync`](...G)
        } catch (Y) {
          return Z(Y)
        }
        Z(null, D)
      }
    }), Q
  }

  function u04(A) {
    return (...B) => new Promise((Q, I) => {
      B.push((G, Z) => {
        if (G) I(G);
        else Q(Z)
      }), A(...B)
    })
  }

  function p04(A) {
    return (...B) => {
      let Q, I;
      if (B.push((G, Z) => {
          Q = G, I = Z
        }), A(...B), Q) throw Q;
      return I
    }
  }

  function c04(A) {
    if (A = {
        ...A
      }, A.fs = d04(A.fs || m04), typeof A.retries === "number" && A.retries > 0 || A.retries && typeof A.retries.retries === "number" && A.retries.retries > 0) throw Object.assign(new Error("Cannot use retries with the sync api"), {
      code: "ESYNC"
    });
    return A
  }
  FdA.exports = {
    toPromise: u04,
    toSync: p04,
    toSyncOptions: c04
  }
})
// @from(Start 3031056, End 3031793)
W_1 = z((lB8, zL) => {
  var Db = JdA(),
    {
      toPromise: b31,
      toSync: g31,
      toSyncOptions: Y_1
    } = XdA();
  async function VdA(A, B) {
    let Q = await b31(Db.lock)(A, B);
    return b31(Q)
  }

  function l04(A, B) {
    let Q = g31(Db.lock)(A, Y_1(B));
    return g31(Q)
  }

  function i04(A, B) {
    return b31(Db.unlock)(A, B)
  }

  function n04(A, B) {
    return g31(Db.unlock)(A, Y_1(B))
  }

  function a04(A, B) {
    return b31(Db.check)(A, B)
  }

  function s04(A, B) {
    return g31(Db.check)(A, Y_1(B))
  }
  zL.exports = VdA;
  zL.exports.lock = VdA;
  zL.exports.unlock = i04;
  zL.exports.lockSync = l04;
  zL.exports.unlockSync = n04;
  zL.exports.check = a04;
  zL.exports.checkSync = s04
})
// @from(Start 3031799, End 3034582)
_dA = z((z38, SdA) => {
  var {
    defineProperty: d31,
    getOwnPropertyDescriptor: A24,
    getOwnPropertyNames: B24
  } = Object, Q24 = Object.prototype.hasOwnProperty, u31 = (A, B) => d31(A, "name", {
    value: B,
    configurable: !0
  }), I24 = (A, B) => {
    for (var Q in B) d31(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, G24 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of B24(B))
        if (!Q24.call(A, G) && G !== Q) d31(A, G, {
          get: () => B[G],
          enumerable: !(I = A24(B, G)) || I.enumerable
        })
    }
    return A
  }, Z24 = (A) => G24(d31({}, "__esModule", {
    value: !0
  }), A), $dA = {};
  I24($dA, {
    AlgorithmId: () => RdA,
    EndpointURLScheme: () => LdA,
    FieldPosition: () => OdA,
    HttpApiKeyAuthLocation: () => MdA,
    HttpAuthLocation: () => qdA,
    IniSectionType: () => TdA,
    RequestHandlerProtocol: () => PdA,
    SMITHY_CONTEXT_KEY: () => F24,
    getDefaultClientConfiguration: () => W24,
    resolveDefaultRuntimeConfig: () => J24
  });
  SdA.exports = Z24($dA);
  var qdA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(qdA || {}),
    MdA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(MdA || {}),
    LdA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(LdA || {}),
    RdA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(RdA || {}),
    D24 = u31((A) => {
      let B = [];
      if (A.sha256 !== void 0) B.push({
        algorithmId: () => "sha256",
        checksumConstructor: () => A.sha256
      });
      if (A.md5 != null) B.push({
        algorithmId: () => "md5",
        checksumConstructor: () => A.md5
      });
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    Y24 = u31((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    W24 = u31((A) => {
      return D24(A)
    }, "getDefaultClientConfiguration"),
    J24 = u31((A) => {
      return Y24(A)
    }, "resolveDefaultRuntimeConfig"),
    OdA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(OdA || {}),
    F24 = "__smithy_context",
    TdA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(TdA || {}),
    PdA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(PdA || {})
})
// @from(Start 3034588, End 3039095)
vdA = z((w38, fdA) => {
  var {
    defineProperty: p31,
    getOwnPropertyDescriptor: X24,
    getOwnPropertyNames: V24
  } = Object, C24 = Object.prototype.hasOwnProperty, wL = (A, B) => p31(A, "name", {
    value: B,
    configurable: !0
  }), K24 = (A, B) => {
    for (var Q in B) p31(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, H24 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of V24(B))
        if (!C24.call(A, G) && G !== Q) p31(A, G, {
          get: () => B[G],
          enumerable: !(I = X24(B, G)) || I.enumerable
        })
    }
    return A
  }, z24 = (A) => H24(p31({}, "__esModule", {
    value: !0
  }), A), jdA = {};
  K24(jdA, {
    Field: () => U24,
    Fields: () => N24,
    HttpRequest: () => $24,
    HttpResponse: () => q24,
    IHttpRequest: () => ydA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => w24,
    isValidHostname: () => xdA,
    resolveHttpHandlerRuntimeConfig: () => E24
  });
  fdA.exports = z24(jdA);
  var w24 = wL((A) => {
      return {
        setHttpHandler(B) {
          A.httpHandler = B
        },
        httpHandler() {
          return A.httpHandler
        },
        updateHttpClientConfig(B, Q) {
          A.httpHandler?.updateHttpClientConfig(B, Q)
        },
        httpHandlerConfigs() {
          return A.httpHandler.httpHandlerConfigs()
        }
      }
    }, "getHttpHandlerExtensionConfiguration"),
    E24 = wL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    ydA = _dA(),
    U24 = class {
      static {
        wL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = ydA.FieldPosition.HEADER,
        values: Q = []
      }) {
        this.name = A, this.kind = B, this.values = Q
      }
      add(A) {
        this.values.push(A)
      }
      set(A) {
        this.values = A
      }
      remove(A) {
        this.values = this.values.filter((B) => B !== A)
      }
      toString() {
        return this.values.map((A) => A.includes(",") || A.includes(" ") ? `"${A}"` : A).join(", ")
      }
      get() {
        return this.values
      }
    },
    N24 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        wL(this, "Fields")
      }
      setField(A) {
        this.entries[A.name.toLowerCase()] = A
      }
      getField(A) {
        return this.entries[A.toLowerCase()]
      }
      removeField(A) {
        delete this.entries[A.toLowerCase()]
      }
      getByType(A) {
        return Object.values(this.entries).filter((B) => B.kind === A)
      }
    },
    $24 = class A {
      static {
        wL(this, "HttpRequest")
      }
      constructor(B) {
        this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
      }
      static clone(B) {
        let Q = new A({
          ...B,
          headers: {
            ...B.headers
          }
        });
        if (Q.query) Q.query = kdA(Q.query);
        return Q
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
      }
      clone() {
        return A.clone(this)
      }
    };

  function kdA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  wL(kdA, "cloneQuery");
  var q24 = class {
    static {
      wL(this, "HttpResponse")
    }
    constructor(A) {
      this.statusCode = A.statusCode, this.reason = A.reason, this.headers = A.headers || {}, this.body = A.body
    }
    static isInstance(A) {
      if (!A) return !1;
      let B = A;
      return typeof B.statusCode === "number" && typeof B.headers === "object"
    }
  };

  function xdA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  wL(xdA, "isValidHostname")
})
// @from(Start 3039101, End 3040964)
cS = z(($38, ddA) => {
  var {
    defineProperty: l31,
    getOwnPropertyDescriptor: M24,
    getOwnPropertyNames: L24
  } = Object, R24 = Object.prototype.hasOwnProperty, c31 = (A, B) => l31(A, "name", {
    value: B,
    configurable: !0
  }), O24 = (A, B) => {
    for (var Q in B) l31(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, T24 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of L24(B))
        if (!R24.call(A, G) && G !== Q) l31(A, G, {
          get: () => B[G],
          enumerable: !(I = M24(B, G)) || I.enumerable
        })
    }
    return A
  }, P24 = (A) => T24(l31({}, "__esModule", {
    value: !0
  }), A), bdA = {};
  O24(bdA, {
    getHostHeaderPlugin: () => _24,
    hostHeaderMiddleware: () => hdA,
    hostHeaderMiddlewareOptions: () => mdA,
    resolveHostHeaderConfig: () => gdA
  });
  ddA.exports = P24(bdA);
  var S24 = vdA();

  function gdA(A) {
    return A
  }
  c31(gdA, "resolveHostHeaderConfig");
  var hdA = c31((A) => (B) => async (Q) => {
      if (!S24.HttpRequest.isInstance(Q.request)) return B(Q);
      let {
        request: I
      } = Q, {
        handlerProtocol: G = ""
      } = A.requestHandler.metadata || {};
      if (G.indexOf("h2") >= 0 && !I.headers[":authority"]) delete I.headers.host, I.headers[":authority"] = I.hostname + (I.port ? ":" + I.port : "");
      else if (!I.headers.host) {
        let Z = I.hostname;
        if (I.port != null) Z += `:${I.port}`;
        I.headers.host = Z
      }
      return B(Q)
    }, "hostHeaderMiddleware"),
    mdA = {
      name: "hostHeaderMiddleware",
      step: "build",
      priority: "low",
      tags: ["HOST"],
      override: !0
    },
    _24 = c31((A) => ({
      applyToStack: c31((B) => {
        B.add(hdA(A), mdA)
      }, "applyToStack")
    }), "getHostHeaderPlugin")
})
// @from(Start 3040970, End 3043269)
lS = z((q38, ldA) => {
  var {
    defineProperty: i31,
    getOwnPropertyDescriptor: j24,
    getOwnPropertyNames: y24
  } = Object, k24 = Object.prototype.hasOwnProperty, X_1 = (A, B) => i31(A, "name", {
    value: B,
    configurable: !0
  }), x24 = (A, B) => {
    for (var Q in B) i31(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, f24 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of y24(B))
        if (!k24.call(A, G) && G !== Q) i31(A, G, {
          get: () => B[G],
          enumerable: !(I = j24(B, G)) || I.enumerable
        })
    }
    return A
  }, v24 = (A) => f24(i31({}, "__esModule", {
    value: !0
  }), A), udA = {};
  x24(udA, {
    getLoggerPlugin: () => b24,
    loggerMiddleware: () => pdA,
    loggerMiddlewareOptions: () => cdA
  });
  ldA.exports = v24(udA);
  var pdA = X_1(() => (A, B) => async (Q) => {
      try {
        let I = await A(Q),
          {
            clientName: G,
            commandName: Z,
            logger: D,
            dynamoDbDocumentClientOptions: Y = {}
          } = B,
          {
            overrideInputFilterSensitiveLog: W,
            overrideOutputFilterSensitiveLog: J
          } = Y,
          F = W ?? B.inputFilterSensitiveLog,
          X = J ?? B.outputFilterSensitiveLog,
          {
            $metadata: V,
            ...C
          } = I.output;
        return D?.info?.({
          clientName: G,
          commandName: Z,
          input: F(Q.input),
          output: X(C),
          metadata: V
        }), I
      } catch (I) {
        let {
          clientName: G,
          commandName: Z,
          logger: D,
          dynamoDbDocumentClientOptions: Y = {}
        } = B, {
          overrideInputFilterSensitiveLog: W
        } = Y, J = W ?? B.inputFilterSensitiveLog;
        throw D?.error?.({
          clientName: G,
          commandName: Z,
          input: J(Q.input),
          error: I,
          metadata: I.$metadata
        }), I
      }
    }, "loggerMiddleware"),
    cdA = {
      name: "loggerMiddleware",
      tags: ["LOGGER"],
      step: "initialize",
      override: !0
    },
    b24 = X_1((A) => ({
      applyToStack: X_1((B) => {
        B.add(pdA(), cdA)
      }, "applyToStack")
    }), "getLoggerPlugin")
})
// @from(Start 3043275, End 3046058)
BuA = z((M38, AuA) => {
  var {
    defineProperty: n31,
    getOwnPropertyDescriptor: g24,
    getOwnPropertyNames: h24
  } = Object, m24 = Object.prototype.hasOwnProperty, a31 = (A, B) => n31(A, "name", {
    value: B,
    configurable: !0
  }), d24 = (A, B) => {
    for (var Q in B) n31(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, u24 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of h24(B))
        if (!m24.call(A, G) && G !== Q) n31(A, G, {
          get: () => B[G],
          enumerable: !(I = g24(B, G)) || I.enumerable
        })
    }
    return A
  }, p24 = (A) => u24(n31({}, "__esModule", {
    value: !0
  }), A), idA = {};
  d24(idA, {
    AlgorithmId: () => rdA,
    EndpointURLScheme: () => sdA,
    FieldPosition: () => odA,
    HttpApiKeyAuthLocation: () => adA,
    HttpAuthLocation: () => ndA,
    IniSectionType: () => tdA,
    RequestHandlerProtocol: () => edA,
    SMITHY_CONTEXT_KEY: () => a24,
    getDefaultClientConfiguration: () => i24,
    resolveDefaultRuntimeConfig: () => n24
  });
  AuA.exports = p24(idA);
  var ndA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(ndA || {}),
    adA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(adA || {}),
    sdA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(sdA || {}),
    rdA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(rdA || {}),
    c24 = a31((A) => {
      let B = [];
      if (A.sha256 !== void 0) B.push({
        algorithmId: () => "sha256",
        checksumConstructor: () => A.sha256
      });
      if (A.md5 != null) B.push({
        algorithmId: () => "md5",
        checksumConstructor: () => A.md5
      });
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    l24 = a31((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    i24 = a31((A) => {
      return c24(A)
    }, "getDefaultClientConfiguration"),
    n24 = a31((A) => {
      return l24(A)
    }, "resolveDefaultRuntimeConfig"),
    odA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(odA || {}),
    a24 = "__smithy_context",
    tdA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(tdA || {}),
    edA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(edA || {})
})
// @from(Start 3046064, End 3050571)
YuA = z((L38, DuA) => {
  var {
    defineProperty: s31,
    getOwnPropertyDescriptor: s24,
    getOwnPropertyNames: r24
  } = Object, o24 = Object.prototype.hasOwnProperty, EL = (A, B) => s31(A, "name", {
    value: B,
    configurable: !0
  }), t24 = (A, B) => {
    for (var Q in B) s31(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, e24 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of r24(B))
        if (!o24.call(A, G) && G !== Q) s31(A, G, {
          get: () => B[G],
          enumerable: !(I = s24(B, G)) || I.enumerable
        })
    }
    return A
  }, A94 = (A) => e24(s31({}, "__esModule", {
    value: !0
  }), A), QuA = {};
  t24(QuA, {
    Field: () => I94,
    Fields: () => G94,
    HttpRequest: () => Z94,
    HttpResponse: () => D94,
    IHttpRequest: () => IuA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => B94,
    isValidHostname: () => ZuA,
    resolveHttpHandlerRuntimeConfig: () => Q94
  });
  DuA.exports = A94(QuA);
  var B94 = EL((A) => {
      return {
        setHttpHandler(B) {
          A.httpHandler = B
        },
        httpHandler() {
          return A.httpHandler
        },
        updateHttpClientConfig(B, Q) {
          A.httpHandler?.updateHttpClientConfig(B, Q)
        },
        httpHandlerConfigs() {
          return A.httpHandler.httpHandlerConfigs()
        }
      }
    }, "getHttpHandlerExtensionConfiguration"),
    Q94 = EL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    IuA = BuA(),
    I94 = class {
      static {
        EL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = IuA.FieldPosition.HEADER,
        values: Q = []
      }) {
        this.name = A, this.kind = B, this.values = Q
      }
      add(A) {
        this.values.push(A)
      }
      set(A) {
        this.values = A
      }
      remove(A) {
        this.values = this.values.filter((B) => B !== A)
      }
      toString() {
        return this.values.map((A) => A.includes(",") || A.includes(" ") ? `"${A}"` : A).join(", ")
      }
      get() {
        return this.values
      }
    },
    G94 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        EL(this, "Fields")
      }
      setField(A) {
        this.entries[A.name.toLowerCase()] = A
      }
      getField(A) {
        return this.entries[A.toLowerCase()]
      }
      removeField(A) {
        delete this.entries[A.toLowerCase()]
      }
      getByType(A) {
        return Object.values(this.entries).filter((B) => B.kind === A)
      }
    },
    Z94 = class A {
      static {
        EL(this, "HttpRequest")
      }
      constructor(B) {
        this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
      }
      static clone(B) {
        let Q = new A({
          ...B,
          headers: {
            ...B.headers
          }
        });
        if (Q.query) Q.query = GuA(Q.query);
        return Q
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
      }
      clone() {
        return A.clone(this)
      }
    };

  function GuA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  EL(GuA, "cloneQuery");
  var D94 = class {
    static {
      EL(this, "HttpResponse")
    }
    constructor(A) {
      this.statusCode = A.statusCode, this.reason = A.reason, this.headers = A.headers || {}, this.body = A.body
    }
    static isInstance(A) {
      if (!A) return !1;
      let B = A;
      return typeof B.statusCode === "number" && typeof B.headers === "object"
    }
  };

  function ZuA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  EL(ZuA, "isValidHostname")
})
// @from(Start 3050577, End 3052509)
iS = z((P38, XuA) => {
  var {
    defineProperty: o31,
    getOwnPropertyDescriptor: Y94,
    getOwnPropertyNames: W94
  } = Object, J94 = Object.prototype.hasOwnProperty, r31 = (A, B) => o31(A, "name", {
    value: B,
    configurable: !0
  }), F94 = (A, B) => {
    for (var Q in B) o31(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, X94 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of W94(B))
        if (!J94.call(A, G) && G !== Q) o31(A, G, {
          get: () => B[G],
          enumerable: !(I = Y94(B, G)) || I.enumerable
        })
    }
    return A
  }, V94 = (A) => X94(o31({}, "__esModule", {
    value: !0
  }), A), WuA = {};
  F94(WuA, {
    addRecursionDetectionMiddlewareOptions: () => FuA,
    getRecursionDetectionPlugin: () => z94,
    recursionDetectionMiddleware: () => JuA
  });
  XuA.exports = V94(WuA);
  var C94 = YuA(),
    V_1 = "X-Amzn-Trace-Id",
    K94 = "AWS_LAMBDA_FUNCTION_NAME",
    H94 = "_X_AMZN_TRACE_ID",
    JuA = r31((A) => (B) => async (Q) => {
      let {
        request: I
      } = Q;
      if (!C94.HttpRequest.isInstance(I) || A.runtime !== "node") return B(Q);
      let G = Object.keys(I.headers ?? {}).find((W) => W.toLowerCase() === V_1.toLowerCase()) ?? V_1;
      if (I.headers.hasOwnProperty(G)) return B(Q);
      let Z = process.env[K94],
        D = process.env[H94],
        Y = r31((W) => typeof W === "string" && W.length > 0, "nonEmptyString");
      if (Y(Z) && Y(D)) I.headers[V_1] = D;
      return B({
        ...Q,
        request: I
      })
    }, "recursionDetectionMiddleware"),
    FuA = {
      step: "build",
      tags: ["RECURSION_DETECTION"],
      name: "recursionDetectionMiddleware",
      override: !0,
      priority: "low"
    },
    z94 = r31((A) => ({
      applyToStack: r31((B) => {
        B.add(JuA(A), FuA)
      }, "applyToStack")
    }), "getRecursionDetectionPlugin")
})
// @from(Start 3052515, End 3055298)
C_1 = z((S38, NuA) => {
  var {
    defineProperty: t31,
    getOwnPropertyDescriptor: w94,
    getOwnPropertyNames: E94
  } = Object, U94 = Object.prototype.hasOwnProperty, e31 = (A, B) => t31(A, "name", {
    value: B,
    configurable: !0
  }), N94 = (A, B) => {
    for (var Q in B) t31(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, $94 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of E94(B))
        if (!U94.call(A, G) && G !== Q) t31(A, G, {
          get: () => B[G],
          enumerable: !(I = w94(B, G)) || I.enumerable
        })
    }
    return A
  }, q94 = (A) => $94(t31({}, "__esModule", {
    value: !0
  }), A), VuA = {};
  N94(VuA, {
    AlgorithmId: () => zuA,
    EndpointURLScheme: () => HuA,
    FieldPosition: () => wuA,
    HttpApiKeyAuthLocation: () => KuA,
    HttpAuthLocation: () => CuA,
    IniSectionType: () => EuA,
    RequestHandlerProtocol: () => UuA,
    SMITHY_CONTEXT_KEY: () => T94,
    getDefaultClientConfiguration: () => R94,
    resolveDefaultRuntimeConfig: () => O94
  });
  NuA.exports = q94(VuA);
  var CuA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(CuA || {}),
    KuA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(KuA || {}),
    HuA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(HuA || {}),
    zuA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(zuA || {}),
    M94 = e31((A) => {
      let B = [];
      if (A.sha256 !== void 0) B.push({
        algorithmId: () => "sha256",
        checksumConstructor: () => A.sha256
      });
      if (A.md5 != null) B.push({
        algorithmId: () => "md5",
        checksumConstructor: () => A.md5
      });
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    L94 = e31((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    R94 = e31((A) => {
      return M94(A)
    }, "getDefaultClientConfiguration"),
    O94 = e31((A) => {
      return L94(A)
    }, "resolveDefaultRuntimeConfig"),
    wuA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(wuA || {}),
    T94 = "__smithy_context",
    EuA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(EuA || {}),
    UuA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(UuA || {})
})
// @from(Start 3055304, End 3058087)
_uA = z((_38, SuA) => {
  var {
    defineProperty: AQ1,
    getOwnPropertyDescriptor: P94,
    getOwnPropertyNames: S94
  } = Object, _94 = Object.prototype.hasOwnProperty, BQ1 = (A, B) => AQ1(A, "name", {
    value: B,
    configurable: !0
  }), j94 = (A, B) => {
    for (var Q in B) AQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, y94 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of S94(B))
        if (!_94.call(A, G) && G !== Q) AQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = P94(B, G)) || I.enumerable
        })
    }
    return A
  }, k94 = (A) => y94(AQ1({}, "__esModule", {
    value: !0
  }), A), $uA = {};
  j94($uA, {
    AlgorithmId: () => RuA,
    EndpointURLScheme: () => LuA,
    FieldPosition: () => OuA,
    HttpApiKeyAuthLocation: () => MuA,
    HttpAuthLocation: () => quA,
    IniSectionType: () => TuA,
    RequestHandlerProtocol: () => PuA,
    SMITHY_CONTEXT_KEY: () => g94,
    getDefaultClientConfiguration: () => v94,
    resolveDefaultRuntimeConfig: () => b94
  });
  SuA.exports = k94($uA);
  var quA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(quA || {}),
    MuA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(MuA || {}),
    LuA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(LuA || {}),
    RuA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(RuA || {}),
    x94 = BQ1((A) => {
      let B = [];
      if (A.sha256 !== void 0) B.push({
        algorithmId: () => "sha256",
        checksumConstructor: () => A.sha256
      });
      if (A.md5 != null) B.push({
        algorithmId: () => "md5",
        checksumConstructor: () => A.md5
      });
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    f94 = BQ1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    v94 = BQ1((A) => {
      return x94(A)
    }, "getDefaultClientConfiguration"),
    b94 = BQ1((A) => {
      return f94(A)
    }, "resolveDefaultRuntimeConfig"),
    OuA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(OuA || {}),
    g94 = "__smithy_context",
    TuA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(TuA || {}),
    PuA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(PuA || {})
})
// @from(Start 3058093, End 3059190)
ZX = z((j38, xuA) => {
  var {
    defineProperty: QQ1,
    getOwnPropertyDescriptor: h94,
    getOwnPropertyNames: m94
  } = Object, d94 = Object.prototype.hasOwnProperty, yuA = (A, B) => QQ1(A, "name", {
    value: B,
    configurable: !0
  }), u94 = (A, B) => {
    for (var Q in B) QQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, p94 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of m94(B))
        if (!d94.call(A, G) && G !== Q) QQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = h94(B, G)) || I.enumerable
        })
    }
    return A
  }, c94 = (A) => p94(QQ1({}, "__esModule", {
    value: !0
  }), A), kuA = {};
  u94(kuA, {
    getSmithyContext: () => l94,
    normalizeProvider: () => i94
  });
  xuA.exports = c94(kuA);
  var juA = _uA(),
    l94 = yuA((A) => A[juA.SMITHY_CONTEXT_KEY] || (A[juA.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext"),
    i94 = yuA((A) => {
      if (typeof A === "function") return A;
      let B = Promise.resolve(A);
      return () => B
    }, "normalizeProvider")
})
// @from(Start 3059196, End 3062056)
yz = z((y38, duA) => {
  var {
    defineProperty: IQ1,
    getOwnPropertyDescriptor: n94,
    getOwnPropertyNames: a94
  } = Object, s94 = Object.prototype.hasOwnProperty, K_1 = (A, B) => IQ1(A, "name", {
    value: B,
    configurable: !0
  }), r94 = (A, B) => {
    for (var Q in B) IQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, o94 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of a94(B))
        if (!s94.call(A, G) && G !== Q) IQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = n94(B, G)) || I.enumerable
        })
    }
    return A
  }, t94 = (A) => o94(IQ1({}, "__esModule", {
    value: !0
  }), A), fuA = {};
  r94(fuA, {
    deserializerMiddleware: () => vuA,
    deserializerMiddlewareOption: () => guA,
    getSerdePlugin: () => muA,
    serializerMiddleware: () => buA,
    serializerMiddlewareOption: () => huA
  });
  duA.exports = t94(fuA);
  var vuA = K_1((A, B) => (Q, I) => async (G) => {
      let {
        response: Z
      } = await Q(G);
      try {
        let D = await B(Z, A);
        return {
          response: Z,
          output: D
        }
      } catch (D) {
        if (Object.defineProperty(D, "$response", {
            value: Z
          }), !("$metadata" in D)) {
          try {
            D.message += `
  Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`
          } catch (W) {
            if (!I.logger || I.logger?.constructor?.name === "NoOpLogger") console.warn("Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.");
            else I.logger?.warn?.("Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.")
          }
          if (typeof D.$responseBodyText !== "undefined") {
            if (D.$response) D.$response.body = D.$responseBodyText
          }
        }
        throw D
      }
    }, "deserializerMiddleware"),
    buA = K_1((A, B) => (Q, I) => async (G) => {
      let Z = I.endpointV2?.url && A.urlParser ? async () => A.urlParser(I.endpointV2.url): A.endpoint;
      if (!Z) throw new Error("No valid endpoint provider available.");
      let D = await B(G.input, {
        ...A,
        endpoint: Z
      });
      return Q({
        ...G,
        request: D
      })
    }, "serializerMiddleware"),
    guA = {
      name: "deserializerMiddleware",
      step: "deserialize",
      tags: ["DESERIALIZER"],
      override: !0
    },
    huA = {
      name: "serializerMiddleware",
      step: "serialize",
      tags: ["SERIALIZER"],
      override: !0
    };

  function muA(A, B, Q) {
    return {
      applyToStack: (I) => {
        I.add(vuA(A, Q), guA), I.add(buA(A, B), huA)
      }
    }
  }
  K_1(muA, "getSerdePlugin")
})
// @from(Start 3062062, End 3066569)
H_1 = z((k38, iuA) => {
  var {
    defineProperty: GQ1,
    getOwnPropertyDescriptor: e94,
    getOwnPropertyNames: A44
  } = Object, B44 = Object.prototype.hasOwnProperty, UL = (A, B) => GQ1(A, "name", {
    value: B,
    configurable: !0
  }), Q44 = (A, B) => {
    for (var Q in B) GQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, I44 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of A44(B))
        if (!B44.call(A, G) && G !== Q) GQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = e94(B, G)) || I.enumerable
        })
    }
    return A
  }, G44 = (A) => I44(GQ1({}, "__esModule", {
    value: !0
  }), A), uuA = {};
  Q44(uuA, {
    Field: () => Y44,
    Fields: () => W44,
    HttpRequest: () => J44,
    HttpResponse: () => F44,
    IHttpRequest: () => puA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => Z44,
    isValidHostname: () => luA,
    resolveHttpHandlerRuntimeConfig: () => D44
  });
  iuA.exports = G44(uuA);
  var Z44 = UL((A) => {
      return {
        setHttpHandler(B) {
          A.httpHandler = B
        },
        httpHandler() {
          return A.httpHandler
        },
        updateHttpClientConfig(B, Q) {
          A.httpHandler?.updateHttpClientConfig(B, Q)
        },
        httpHandlerConfigs() {
          return A.httpHandler.httpHandlerConfigs()
        }
      }
    }, "getHttpHandlerExtensionConfiguration"),
    D44 = UL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    puA = C_1(),
    Y44 = class {
      static {
        UL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = puA.FieldPosition.HEADER,
        values: Q = []
      }) {
        this.name = A, this.kind = B, this.values = Q
      }
      add(A) {
        this.values.push(A)
      }
      set(A) {
        this.values = A
      }
      remove(A) {
        this.values = this.values.filter((B) => B !== A)
      }
      toString() {
        return this.values.map((A) => A.includes(",") || A.includes(" ") ? `"${A}"` : A).join(", ")
      }
      get() {
        return this.values
      }
    },
    W44 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        UL(this, "Fields")
      }
      setField(A) {
        this.entries[A.name.toLowerCase()] = A
      }
      getField(A) {
        return this.entries[A.toLowerCase()]
      }
      removeField(A) {
        delete this.entries[A.toLowerCase()]
      }
      getByType(A) {
        return Object.values(this.entries).filter((B) => B.kind === A)
      }
    },
    J44 = class A {
      static {
        UL(this, "HttpRequest")
      }
      constructor(B) {
        this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
      }
      static clone(B) {
        let Q = new A({
          ...B,
          headers: {
            ...B.headers
          }
        });
        if (Q.query) Q.query = cuA(Q.query);
        return Q
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
      }
      clone() {
        return A.clone(this)
      }
    };

  function cuA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  UL(cuA, "cloneQuery");
  var F44 = class {
    static {
      UL(this, "HttpResponse")
    }
    constructor(A) {
      this.statusCode = A.statusCode, this.reason = A.reason, this.headers = A.headers || {}, this.body = A.body
    }
    static isInstance(A) {
      if (!A) return !1;
      let B = A;
      return typeof B.statusCode === "number" && typeof B.headers === "object"
    }
  };

  function luA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  UL(luA, "isValidHostname")
})
// @from(Start 3066575, End 3067528)
suA = z((b38, auA) => {
  var {
    defineProperty: ZQ1,
    getOwnPropertyDescriptor: X44,
    getOwnPropertyNames: V44
  } = Object, C44 = Object.prototype.hasOwnProperty, K44 = (A, B) => ZQ1(A, "name", {
    value: B,
    configurable: !0
  }), H44 = (A, B) => {
    for (var Q in B) ZQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, z44 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of V44(B))
        if (!C44.call(A, G) && G !== Q) ZQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = X44(B, G)) || I.enumerable
        })
    }
    return A
  }, w44 = (A) => z44(ZQ1({}, "__esModule", {
    value: !0
  }), A), nuA = {};
  H44(nuA, {
    isArrayBuffer: () => E44
  });
  auA.exports = w44(nuA);
  var E44 = K44((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
})
// @from(Start 3067534, End 3068882)
MZ = z((g38, tuA) => {
  var {
    defineProperty: DQ1,
    getOwnPropertyDescriptor: U44,
    getOwnPropertyNames: N44
  } = Object, $44 = Object.prototype.hasOwnProperty, ruA = (A, B) => DQ1(A, "name", {
    value: B,
    configurable: !0
  }), q44 = (A, B) => {
    for (var Q in B) DQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, M44 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of N44(B))
        if (!$44.call(A, G) && G !== Q) DQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = U44(B, G)) || I.enumerable
        })
    }
    return A
  }, L44 = (A) => M44(DQ1({}, "__esModule", {
    value: !0
  }), A), ouA = {};
  q44(ouA, {
    fromArrayBuffer: () => O44,
    fromString: () => T44
  });
  tuA.exports = L44(ouA);
  var R44 = suA(),
    z_1 = Z1("buffer"),
    O44 = ruA((A, B = 0, Q = A.byteLength - B) => {
      if (!R44.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
      return z_1.Buffer.from(A, B, Q)
    }, "fromArrayBuffer"),
    T44 = ruA((A, B) => {
      if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
      return B ? z_1.Buffer.from(A, B) : z_1.Buffer.from(A)
    }, "fromString")
})
// @from(Start 3068888, End 3069378)
BpA = z((euA) => {
  Object.defineProperty(euA, "__esModule", {
    value: !0
  });
  euA.fromBase64 = void 0;
  var P44 = MZ(),
    S44 = /^[A-Za-z0-9+/]*={0,2}$/,
    _44 = (A) => {
      if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
      if (!S44.exec(A)) throw new TypeError("Invalid base64 string.");
      let B = P44.fromString(A, "base64");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
    };
  euA.fromBase64 = _44
})
// @from(Start 3069384, End 3071039)
RQ = z((m38, ZpA) => {
  var {
    defineProperty: YQ1,
    getOwnPropertyDescriptor: j44,
    getOwnPropertyNames: y44
  } = Object, k44 = Object.prototype.hasOwnProperty, w_1 = (A, B) => YQ1(A, "name", {
    value: B,
    configurable: !0
  }), x44 = (A, B) => {
    for (var Q in B) YQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, f44 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of y44(B))
        if (!k44.call(A, G) && G !== Q) YQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = j44(B, G)) || I.enumerable
        })
    }
    return A
  }, v44 = (A) => f44(YQ1({}, "__esModule", {
    value: !0
  }), A), QpA = {};
  x44(QpA, {
    fromUtf8: () => GpA,
    toUint8Array: () => b44,
    toUtf8: () => g44
  });
  ZpA.exports = v44(QpA);
  var IpA = MZ(),
    GpA = w_1((A) => {
      let B = IpA.fromString(A, "utf8");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
    }, "fromUtf8"),
    b44 = w_1((A) => {
      if (typeof A === "string") return GpA(A);
      if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      return new Uint8Array(A)
    }, "toUint8Array"),
    g44 = w_1((A) => {
      if (typeof A === "string") return A;
      if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
      return IpA.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
    }, "toUtf8")
})
// @from(Start 3071045, End 3071618)
WpA = z((DpA) => {
  Object.defineProperty(DpA, "__esModule", {
    value: !0
  });
  DpA.toBase64 = void 0;
  var h44 = MZ(),
    m44 = RQ(),
    d44 = (A) => {
      let B;
      if (typeof A === "string") B = m44.fromUtf8(A);
      else B = A;
      if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
      return h44.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
    };
  DpA.toBase64 = d44
})
// @from(Start 3071624, End 3072319)
Wb = z((u38, WQ1) => {
  var {
    defineProperty: JpA,
    getOwnPropertyDescriptor: u44,
    getOwnPropertyNames: p44
  } = Object, c44 = Object.prototype.hasOwnProperty, E_1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of p44(B))
        if (!c44.call(A, G) && G !== Q) JpA(A, G, {
          get: () => B[G],
          enumerable: !(I = u44(B, G)) || I.enumerable
        })
    }
    return A
  }, FpA = (A, B, Q) => (E_1(A, B, "default"), Q && E_1(Q, B, "default")), l44 = (A) => E_1(JpA({}, "__esModule", {
    value: !0
  }), A), U_1 = {};
  WQ1.exports = l44(U_1);
  FpA(U_1, BpA(), WQ1.exports);
  FpA(U_1, WpA(), WQ1.exports)
})
// @from(Start 3072325, End 3073732)
N_1 = z((VpA) => {
  Object.defineProperty(VpA, "__esModule", {
    value: !0
  });
  VpA.ChecksumStream = void 0;
  var i44 = Wb(),
    n44 = Z1("stream");
  class XpA extends n44.Duplex {
    constructor({
      expectedChecksum: A,
      checksum: B,
      source: Q,
      checksumSourceLocation: I,
      base64Encoder: G
    }) {
      var Z, D;
      super();
      if (typeof Q.pipe === "function") this.source = Q;
      else throw new Error(`@smithy/util-stream: unsupported source type ${(D=(Z=Q===null||Q===void 0?void 0:Q.constructor)===null||Z===void 0?void 0:Z.name)!==null&&D!==void 0?D:Q} in ChecksumStream.`);
      this.base64Encoder = G !== null && G !== void 0 ? G : i44.toBase64, this.expectedChecksum = A, this.checksum = B, this.checksumSourceLocation = I, this.source.pipe(this)
    }
    _read(A) {}
    _write(A, B, Q) {
      try {
        this.checksum.update(A), this.push(A)
      } catch (I) {
        return Q(I)
      }
      return Q()
    }
    async _final(A) {
      try {
        let B = await this.checksum.digest(),
          Q = this.base64Encoder(B);
        if (this.expectedChecksum !== Q) return A(new Error(`Checksum mismatch: expected "${this.expectedChecksum}" but received "${Q}" in response header "${this.checksumSourceLocation}".`))
      } catch (B) {
        return A(B)
      }
      return this.push(null), A()
    }
  }
  VpA.ChecksumStream = XpA
})
// @from(Start 3073738, End 3074384)
NL = z((KpA) => {
  Object.defineProperty(KpA, "__esModule", {
    value: !0
  });
  KpA.isBlob = KpA.isReadableStream = void 0;
  var a44 = (A) => {
    var B;
    return typeof ReadableStream === "function" && (((B = A === null || A === void 0 ? void 0 : A.constructor) === null || B === void 0 ? void 0 : B.name) === ReadableStream.name || A instanceof ReadableStream)
  };
  KpA.isReadableStream = a44;
  var s44 = (A) => {
    var B;
    return typeof Blob === "function" && (((B = A === null || A === void 0 ? void 0 : A.constructor) === null || B === void 0 ? void 0 : B.name) === Blob.name || A instanceof Blob)
  };
  KpA.isBlob = s44
})
// @from(Start 3074390, End 3074644)
UpA = z((wpA) => {
  Object.defineProperty(wpA, "__esModule", {
    value: !0
  });
  wpA.ChecksumStream = void 0;
  var o44 = typeof ReadableStream === "function" ? ReadableStream : function() {};
  class zpA extends o44 {}
  wpA.ChecksumStream = zpA
})
// @from(Start 3074650, End 3076052)
qpA = z((NpA) => {
  Object.defineProperty(NpA, "__esModule", {
    value: !0
  });
  NpA.createChecksumStream = void 0;
  var t44 = Wb(),
    e44 = NL(),
    A64 = UpA(),
    B64 = ({
      expectedChecksum: A,
      checksum: B,
      source: Q,
      checksumSourceLocation: I,
      base64Encoder: G
    }) => {
      var Z, D;
      if (!e44.isReadableStream(Q)) throw new Error(`@smithy/util-stream: unsupported source type ${(D=(Z=Q===null||Q===void 0?void 0:Q.constructor)===null||Z===void 0?void 0:Z.name)!==null&&D!==void 0?D:Q} in ChecksumStream.`);
      let Y = G !== null && G !== void 0 ? G : t44.toBase64;
      if (typeof TransformStream !== "function") throw new Error("@smithy/util-stream: unable to instantiate ChecksumStream because API unavailable: ReadableStream/TransformStream.");
      let W = new TransformStream({
        start() {},
        async transform(F, X) {
          B.update(F), X.enqueue(F)
        },
        async flush(F) {
          let X = await B.digest(),
            V = Y(X);
          if (A !== V) {
            let C = new Error(`Checksum mismatch: expected "${A}" but received "${V}" in response header "${I}".`);
            F.error(C)
          } else F.terminate()
        }
      });
      Q.pipeThrough(W);
      let J = W.readable;
      return Object.setPrototypeOf(J, A64.ChecksumStream.prototype), J
    };
  NpA.createChecksumStream = B64
})
// @from(Start 3076058, End 3076444)
RpA = z((MpA) => {
  Object.defineProperty(MpA, "__esModule", {
    value: !0
  });
  MpA.createChecksumStream = void 0;
  var Q64 = NL(),
    I64 = N_1(),
    G64 = qpA();

  function Z64(A) {
    if (typeof ReadableStream === "function" && Q64.isReadableStream(A.source)) return G64.createChecksumStream(A);
    return new I64.ChecksumStream(A)
  }
  MpA.createChecksumStream = Z64
})
// @from(Start 3076450, End 3077244)
$_1 = z((TpA) => {
  Object.defineProperty(TpA, "__esModule", {
    value: !0
  });
  TpA.ByteArrayCollector = void 0;
  class OpA {
    constructor(A) {
      this.allocByteArray = A, this.byteLength = 0, this.byteArrays = []
    }
    push(A) {
      this.byteArrays.push(A), this.byteLength += A.byteLength
    }
    flush() {
      if (this.byteArrays.length === 1) {
        let Q = this.byteArrays[0];
        return this.reset(), Q
      }
      let A = this.allocByteArray(this.byteLength),
        B = 0;
      for (let Q = 0; Q < this.byteArrays.length; ++Q) {
        let I = this.byteArrays[Q];
        A.set(I, B), B += I.byteLength
      }
      return this.reset(), A
    }
    reset() {
      this.byteArrays = [], this.byteLength = 0
    }
  }
  TpA.ByteArrayCollector = OpA
})
// @from(Start 3077250, End 3079652)
xpA = z((ypA) => {
  Object.defineProperty(ypA, "__esModule", {
    value: !0
  });
  ypA.modeOf = ypA.sizeOf = ypA.flush = ypA.merge = ypA.createBufferedReadable = ypA.createBufferedReadableStream = void 0;
  var D64 = $_1();

  function SpA(A, B, Q) {
    let I = A.getReader(),
      G = !1,
      Z = 0,
      D = ["", new D64.ByteArrayCollector((J) => new Uint8Array(J))],
      Y = -1,
      W = async (J) => {
        let {
          value: F,
          done: X
        } = await I.read(), V = F;
        if (X) {
          if (Y !== -1) {
            let C = JQ1(D, Y);
            if (Jb(C) > 0) J.enqueue(C)
          }
          J.close()
        } else {
          let C = jpA(V, !1);
          if (Y !== C) {
            if (Y >= 0) J.enqueue(JQ1(D, Y));
            Y = C
          }
          if (Y === -1) {
            J.enqueue(V);
            return
          }
          let K = Jb(V);
          Z += K;
          let E = Jb(D[Y]);
          if (K >= B && E === 0) J.enqueue(V);
          else {
            let N = _pA(D, Y, V);
            if (!G && Z > B * 2) G = !0, Q === null || Q === void 0 || Q.warn(`@smithy/util-stream - stream chunk size ${K} is below threshold of ${B}, automatically buffering.`);
            if (N >= B) J.enqueue(JQ1(D, Y));
            else await W(J)
          }
        }
      };
    return new ReadableStream({
      pull: W
    })
  }
  ypA.createBufferedReadableStream = SpA;
  ypA.createBufferedReadable = SpA;

  function _pA(A, B, Q) {
    switch (B) {
      case 0:
        return A[0] += Q, Jb(A[0]);
      case 1:
      case 2:
        return A[B].push(Q), Jb(A[B])
    }
  }
  ypA.merge = _pA;

  function JQ1(A, B) {
    switch (B) {
      case 0:
        let Q = A[0];
        return A[0] = "", Q;
      case 1:
      case 2:
        return A[B].flush()
    }
    throw new Error(`@smithy/util-stream - invalid index ${B} given to flush()`)
  }
  ypA.flush = JQ1;

  function Jb(A) {
    var B, Q;
    return (Q = (B = A === null || A === void 0 ? void 0 : A.byteLength) !== null && B !== void 0 ? B : A === null || A === void 0 ? void 0 : A.length) !== null && Q !== void 0 ? Q : 0
  }
  ypA.sizeOf = Jb;

  function jpA(A, B = !0) {
    if (B && typeof Buffer !== "undefined" && A instanceof Buffer) return 2;
    if (A instanceof Uint8Array) return 1;
    if (typeof A === "string") return 0;
    return -1
  }
  ypA.modeOf = jpA
})
// @from(Start 3079658, End 3081011)
gpA = z((vpA) => {
  Object.defineProperty(vpA, "__esModule", {
    value: !0
  });
  vpA.createBufferedReadable = void 0;
  var V64 = Z1("node:stream"),
    fpA = $_1(),
    ZN = xpA(),
    C64 = NL();

  function K64(A, B, Q) {
    if (C64.isReadableStream(A)) return ZN.createBufferedReadableStream(A, B, Q);
    let I = new V64.Readable({
        read() {}
      }),
      G = !1,
      Z = 0,
      D = ["", new fpA.ByteArrayCollector((W) => new Uint8Array(W)), new fpA.ByteArrayCollector((W) => Buffer.from(new Uint8Array(W)))],
      Y = -1;
    return A.on("data", (W) => {
      let J = ZN.modeOf(W, !0);
      if (Y !== J) {
        if (Y >= 0) I.push(ZN.flush(D, Y));
        Y = J
      }
      if (Y === -1) {
        I.push(W);
        return
      }
      let F = ZN.sizeOf(W);
      Z += F;
      let X = ZN.sizeOf(D[Y]);
      if (F >= B && X === 0) I.push(W);
      else {
        let V = ZN.merge(D, Y, W);
        if (!G && Z > B * 2) G = !0, Q === null || Q === void 0 || Q.warn(`@smithy/util-stream - stream chunk size ${F} is below threshold of ${B}, automatically buffering.`);
        if (V >= B) I.push(ZN.flush(D, Y))
      }
    }), A.on("end", () => {
      if (Y !== -1) {
        let W = ZN.flush(D, Y);
        if (ZN.sizeOf(W) > 0) I.push(W)
      }
      I.push(null)
    }), I
  }
  vpA.createBufferedReadable = K64
})
// @from(Start 3081017, End 3081877)
dpA = z((hpA) => {
  Object.defineProperty(hpA, "__esModule", {
    value: !0
  });
  hpA.getAwsChunkedEncodingStream = void 0;
  var H64 = Z1("stream"),
    z64 = (A, B) => {
      let {
        base64Encoder: Q,
        bodyLengthChecker: I,
        checksumAlgorithmFn: G,
        checksumLocationName: Z,
        streamHasher: D
      } = B, Y = Q !== void 0 && G !== void 0 && Z !== void 0 && D !== void 0, W = Y ? D(G, A) : void 0, J = new H64.Readable({
        read: () => {}
      });
      return A.on("data", (F) => {
        let X = I(F) || 0;
        J.push(`${X.toString(16)}\r
`), J.push(F), J.push(`\r
`)
      }), A.on("end", async () => {
        if (J.push(`0\r
`), Y) {
          let F = Q(await W);
          J.push(`${Z}:${F}\r
`), J.push(`\r
`)
        }
        J.push(null)
      }), J
    };
  hpA.getAwsChunkedEncodingStream = z64
})
// @from(Start 3081883, End 3082659)
cpA = z((upA) => {
  Object.defineProperty(upA, "__esModule", {
    value: !0
  });
  upA.headStream = void 0;
  async function w64(A, B) {
    var Q;
    let I = 0,
      G = [],
      Z = A.getReader(),
      D = !1;
    while (!D) {
      let {
        done: J,
        value: F
      } = await Z.read();
      if (F) G.push(F), I += (Q = F === null || F === void 0 ? void 0 : F.byteLength) !== null && Q !== void 0 ? Q : 0;
      if (I >= B) break;
      D = J
    }
    Z.releaseLock();
    let Y = new Uint8Array(Math.min(B, I)),
      W = 0;
    for (let J of G) {
      if (J.byteLength > Y.byteLength - W) {
        Y.set(J.subarray(0, Y.byteLength - W), W);
        break
      } else Y.set(J, W);
      W += J.length
    }
    return Y
  }
  upA.headStream = w64
})
// @from(Start 3082665, End 3083816)
apA = z((ipA) => {
  Object.defineProperty(ipA, "__esModule", {
    value: !0
  });
  ipA.headStream = void 0;
  var E64 = Z1("stream"),
    U64 = cpA(),
    N64 = NL(),
    $64 = (A, B) => {
      if (N64.isReadableStream(A)) return U64.headStream(A, B);
      return new Promise((Q, I) => {
        let G = new lpA;
        G.limit = B, A.pipe(G), A.on("error", (Z) => {
          G.end(), I(Z)
        }), G.on("error", I), G.on("finish", function() {
          let Z = new Uint8Array(Buffer.concat(this.buffers));
          Q(Z)
        })
      })
    };
  ipA.headStream = $64;
  class lpA extends E64.Writable {
    constructor() {
      super(...arguments);
      this.buffers = [], this.limit = 1 / 0, this.bytesBuffered = 0
    }
    _write(A, B, Q) {
      var I;
      if (this.buffers.push(A), this.bytesBuffered += (I = A.byteLength) !== null && I !== void 0 ? I : 0, this.bytesBuffered >= this.limit) {
        let G = this.bytesBuffered - this.limit,
          Z = this.buffers[this.buffers.length - 1];
        this.buffers[this.buffers.length - 1] = Z.subarray(0, Z.byteLength - G), this.emit("finish")
      }
      Q()
    }
  }
})