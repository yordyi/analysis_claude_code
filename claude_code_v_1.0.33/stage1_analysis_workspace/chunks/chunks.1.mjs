
// @from(Start 291, End 310)
Fk2 = Object.create
// @from(Start 407, End 444)
Ck2 = Object.prototype.hasOwnProperty
// @from(Start 450, End 731)
I1 = (A, B, Q) => {
  Q = A != null ? Fk2(Xk2(A)) : {};
  let I = B || !A || !A.__esModule ? HU1(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q;
  for (let G of Vk2(A))
    if (!Ck2.call(I, G)) HU1(I, G, {
      get: () => A[G],
      enumerable: !0
    });
  return I
}
// @from(Start 737, End 812)
z = (A, B) => () => (B || A((B = {
  exports: {}
}).exports, B), B.exports)
// @from(Start 818, End 960)
jk = (A, B) => {
  for (var Q in B) HU1(A, Q, {
    get: B[Q],
    enumerable: !0,
    configurable: !0,
    set: (I) => B[Q] = () => I
  })
}
// @from(Start 966, End 1012)
J21 = (A, B) => () => (A && (B = A(A = 0)), B)
// @from(Start 1018, End 1043)
Z1 = Kk2(import.meta.url)
// @from(Start 1049, End 1530)
C5A = z((Ox5, V5A) => {
  V5A.exports = function A(B) {
    return B.map(function(Q) {
      if (Q === "") return "''";
      if (Q && typeof Q === "object") return Q.op.replace(/(.)/g, "\\$1");
      if (/["\s\\]/.test(Q) && !/'/.test(Q)) return "'" + Q.replace(/(['])/g, "\\$1") + "'";
      if (/["'\s]/.test(Q)) return '"' + Q.replace(/(["\\$`!])/g, "\\$1") + '"';
      return String(Q).replace(/([A-Za-z]:)?([#!"$&'()*,:;<=>?@[\\\]^`{|}])/g, "$1\\$2")
    }).join(" ")
  }
})
// @from(Start 1536, End 5126)
N5A = z((Tx5, U5A) => {
  var E5A = "(?:" + ["\\|\\|", "\\&\\&", ";;", "\\|\\&", "\\<\\(", "\\<\\<\\<", ">>", ">\\&", "<\\&", "[&;()|<>]"].join("|") + ")",
    K5A = new RegExp("^" + E5A + "$"),
    H5A = "|&;()<> \\t",
    vm2 = '"((\\\\"|[^"])*?)"',
    bm2 = "'((\\\\'|[^'])*?)'",
    gm2 = /^#$/,
    z5A = "'",
    w5A = '"',
    kU1 = "$",
    NP = "",
    hm2 = 4294967296;
  for (e21 = 0; e21 < 4; e21++) NP += (hm2 * Math.random()).toString(16);
  var e21, mm2 = new RegExp("^" + NP);

  function dm2(A, B) {
    var Q = B.lastIndex,
      I = [],
      G;
    while (G = B.exec(A))
      if (I.push(G), B.lastIndex === G.index) B.lastIndex += 1;
    return B.lastIndex = Q, I
  }

  function um2(A, B, Q) {
    var I = typeof A === "function" ? A(Q) : A[Q];
    if (typeof I === "undefined" && Q != "") I = "";
    else if (typeof I === "undefined") I = "$";
    if (typeof I === "object") return B + NP + JSON.stringify(I) + NP;
    return B + I
  }

  function pm2(A, B, Q) {
    if (!Q) Q = {};
    var I = Q.escape || "\\",
      G = "(\\" + I + `['"` + H5A + `]|[^\\s'"` + H5A + "])+",
      Z = new RegExp(["(" + E5A + ")", "(" + G + "|" + vm2 + "|" + bm2 + ")+"].join("|"), "g"),
      D = dm2(A, Z);
    if (D.length === 0) return [];
    if (!B) B = {};
    var Y = !1;
    return D.map(function(W) {
      var J = W[0];
      if (!J || Y) return;
      if (K5A.test(J)) return {
        op: J
      };
      var F = !1,
        X = !1,
        V = "",
        C = !1,
        K;

      function E() {
        K += 1;
        var O, R, T = J.charAt(K);
        if (T === "{") {
          if (K += 1, J.charAt(K) === "}") throw new Error("Bad substitution: " + J.slice(K - 2, K + 1));
          if (O = J.indexOf("}", K), O < 0) throw new Error("Bad substitution: " + J.slice(K));
          R = J.slice(K, O), K = O
        } else if (/[*@#?$!_-]/.test(T)) R = T, K += 1;
        else {
          var L = J.slice(K);
          if (O = L.match(/[^\w\d_]/), !O) R = L, K = J.length;
          else R = L.slice(0, O.index), K += O.index - 1
        }
        return um2(B, "", R)
      }
      for (K = 0; K < J.length; K++) {
        var N = J.charAt(K);
        if (C = C || !F && (N === "*" || N === "?"), X) V += N, X = !1;
        else if (F)
          if (N === F) F = !1;
          else if (F == z5A) V += N;
        else if (N === I)
          if (K += 1, N = J.charAt(K), N === w5A || N === I || N === kU1) V += N;
          else V += I + N;
        else if (N === kU1) V += E();
        else V += N;
        else if (N === w5A || N === z5A) F = N;
        else if (K5A.test(N)) return {
          op: J
        };
        else if (gm2.test(N)) {
          Y = !0;
          var q = {
            comment: A.slice(W.index + K + 1)
          };
          if (V.length) return [V, q];
          return [q]
        } else if (N === I) X = !0;
        else if (N === kU1) V += E();
        else V += N
      }
      if (C) return {
        op: "glob",
        pattern: V
      };
      return V
    }).reduce(function(W, J) {
      return typeof J === "undefined" ? W : W.concat(J)
    }, [])
  }
  U5A.exports = function A(B, Q, I) {
    var G = pm2(B, Q, I);
    if (typeof Q !== "function") return G;
    return G.reduce(function(Z, D) {
      if (typeof D === "object") return Z.concat(D);
      var Y = D.split(RegExp("(" + NP + ".*?" + NP + ")", "g"));
      if (Y.length === 1) return Z.concat(Y[0]);
      return Z.concat(Y.filter(Boolean).map(function(W) {
        if (mm2.test(W)) return JSON.parse(W.split(NP)[1]);
        return W
      }))
    }, [])
  }
})
// @from(Start 5132, End 5193)
$c = z((cm2) => {
  cm2.quote = C5A();
  cm2.parse = N5A()
})
// @from(Start 5199, End 7242)
bF = z((L5A) => {
  Object.defineProperty(L5A, "__esModule", {
    value: !0
  });
  var $5A = Object.prototype.toString;

  function nm2(A) {
    switch ($5A.call(A)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return A91(A, Error)
    }
  }

  function Qx(A, B) {
    return $5A.call(A) === `[object ${B}]`
  }

  function am2(A) {
    return Qx(A, "ErrorEvent")
  }

  function sm2(A) {
    return Qx(A, "DOMError")
  }

  function rm2(A) {
    return Qx(A, "DOMException")
  }

  function om2(A) {
    return Qx(A, "String")
  }

  function q5A(A) {
    return typeof A === "object" && A !== null && "__sentry_template_string__" in A && "__sentry_template_values__" in A
  }

  function tm2(A) {
    return A === null || q5A(A) || typeof A !== "object" && typeof A !== "function"
  }

  function M5A(A) {
    return Qx(A, "Object")
  }

  function em2(A) {
    return typeof Event !== "undefined" && A91(A, Event)
  }

  function Ad2(A) {
    return typeof Element !== "undefined" && A91(A, Element)
  }

  function Bd2(A) {
    return Qx(A, "RegExp")
  }

  function Qd2(A) {
    return Boolean(A && A.then && typeof A.then === "function")
  }

  function Id2(A) {
    return M5A(A) && "nativeEvent" in A && "preventDefault" in A && "stopPropagation" in A
  }

  function Gd2(A) {
    return typeof A === "number" && A !== A
  }

  function A91(A, B) {
    try {
      return A instanceof B
    } catch (Q) {
      return !1
    }
  }

  function Zd2(A) {
    return !!(typeof A === "object" && A !== null && (A.__isVue || A._isVue))
  }
  L5A.isDOMError = sm2;
  L5A.isDOMException = rm2;
  L5A.isElement = Ad2;
  L5A.isError = nm2;
  L5A.isErrorEvent = am2;
  L5A.isEvent = em2;
  L5A.isInstanceOf = A91;
  L5A.isNaN = Gd2;
  L5A.isParameterizedString = q5A;
  L5A.isPlainObject = M5A;
  L5A.isPrimitive = tm2;
  L5A.isRegExp = Bd2;
  L5A.isString = om2;
  L5A.isSyntheticEvent = Id2;
  L5A.isThenable = Qd2;
  L5A.isVueViewModel = Zd2
})
// @from(Start 7248, End 8610)
qc = z((O5A) => {
  Object.defineProperty(O5A, "__esModule", {
    value: !0
  });
  var B91 = bF();

  function qd2(A, B = 0) {
    if (typeof A !== "string" || B === 0) return A;
    return A.length <= B ? A : `${A.slice(0,B)}...`
  }

  function Md2(A, B) {
    let Q = A,
      I = Q.length;
    if (I <= 150) return Q;
    if (B > I) B = I;
    let G = Math.max(B - 60, 0);
    if (G < 5) G = 0;
    let Z = Math.min(G + 140, I);
    if (Z > I - 5) Z = I;
    if (Z === I) G = Math.max(Z - 140, 0);
    if (Q = Q.slice(G, Z), G > 0) Q = `'{snip} ${Q}`;
    if (Z < I) Q += " {snip}";
    return Q
  }

  function Ld2(A, B) {
    if (!Array.isArray(A)) return "";
    let Q = [];
    for (let I = 0; I < A.length; I++) {
      let G = A[I];
      try {
        if (B91.isVueViewModel(G)) Q.push("[VueViewModel]");
        else Q.push(String(G))
      } catch (Z) {
        Q.push("[value cannot be serialized]")
      }
    }
    return Q.join(B)
  }

  function R5A(A, B, Q = !1) {
    if (!B91.isString(A)) return !1;
    if (B91.isRegExp(B)) return B.test(A);
    if (B91.isString(B)) return Q ? A === B : A.includes(B);
    return !1
  }

  function Rd2(A, B = [], Q = !1) {
    return B.some((I) => R5A(A, I, Q))
  }
  O5A.isMatchingPattern = R5A;
  O5A.safeJoin = Ld2;
  O5A.snipLine = Md2;
  O5A.stringMatchesSomePattern = Rd2;
  O5A.truncate = qd2
})
// @from(Start 8616, End 10331)
_5A = z((S5A) => {
  Object.defineProperty(S5A, "__esModule", {
    value: !0
  });
  var xU1 = bF(),
    jd2 = qc();

  function yd2(A, B, Q = 250, I, G, Z, D) {
    if (!Z.exception || !Z.exception.values || !D || !xU1.isInstanceOf(D.originalException, Error)) return;
    let Y = Z.exception.values.length > 0 ? Z.exception.values[Z.exception.values.length - 1] : void 0;
    if (Y) Z.exception.values = kd2(fU1(A, B, G, D.originalException, I, Z.exception.values, Y, 0), Q)
  }

  function fU1(A, B, Q, I, G, Z, D, Y) {
    if (Z.length >= Q + 1) return Z;
    let W = [...Z];
    if (xU1.isInstanceOf(I[G], Error)) {
      T5A(D, Y);
      let J = A(B, I[G]),
        F = W.length;
      P5A(J, G, F, Y), W = fU1(A, B, Q, I[G], G, [J, ...W], J, F)
    }
    if (Array.isArray(I.errors)) I.errors.forEach((J, F) => {
      if (xU1.isInstanceOf(J, Error)) {
        T5A(D, Y);
        let X = A(B, J),
          V = W.length;
        P5A(X, `errors[${F}]`, V, Y), W = fU1(A, B, Q, J, G, [X, ...W], X, V)
      }
    });
    return W
  }

  function T5A(A, B) {
    A.mechanism = A.mechanism || {
      type: "generic",
      handled: !0
    }, A.mechanism = {
      ...A.mechanism,
      ...A.type === "AggregateError" && {
        is_exception_group: !0
      },
      exception_id: B
    }
  }

  function P5A(A, B, Q, I) {
    A.mechanism = A.mechanism || {
      type: "generic",
      handled: !0
    }, A.mechanism = {
      ...A.mechanism,
      type: "chained",
      source: B,
      exception_id: Q,
      parent_id: I
    }
  }

  function kd2(A, B) {
    return A.map((Q) => {
      if (Q.value) Q.value = jd2.truncate(Q.value, B);
      return Q
    })
  }
  S5A.applyAggregateErrorsToEvent = yd2
})
// @from(Start 10337, End 10978)
FZ = z((j5A) => {
  Object.defineProperty(j5A, "__esModule", {
    value: !0
  });

  function Q91(A) {
    return A && A.Math == Math ? A : void 0
  }
  var vU1 = typeof globalThis == "object" && Q91(globalThis) || typeof window == "object" && Q91(window) || typeof self == "object" && Q91(self) || typeof global == "object" && Q91(global) || function() {
    return this
  }() || {};

  function fd2() {
    return vU1
  }

  function vd2(A, B, Q) {
    let I = Q || vU1,
      G = I.__SENTRY__ = I.__SENTRY__ || {};
    return G[A] || (G[A] = B())
  }
  j5A.GLOBAL_OBJ = vU1;
  j5A.getGlobalObject = fd2;
  j5A.getGlobalSingleton = vd2
})
// @from(Start 10984, End 13241)
bU1 = z((y5A) => {
  Object.defineProperty(y5A, "__esModule", {
    value: !0
  });
  var md2 = bF(),
    dd2 = FZ(),
    Ix = dd2.getGlobalObject(),
    ud2 = 80;

  function pd2(A, B = {}) {
    if (!A) return "<unknown>";
    try {
      let Q = A,
        I = 5,
        G = [],
        Z = 0,
        D = 0,
        Y = " > ",
        W = Y.length,
        J, F = Array.isArray(B) ? B : B.keyAttrs,
        X = !Array.isArray(B) && B.maxStringLength || ud2;
      while (Q && Z++ < I) {
        if (J = cd2(Q, F), J === "html" || Z > 1 && D + G.length * W + J.length >= X) break;
        G.push(J), D += J.length, Q = Q.parentNode
      }
      return G.reverse().join(Y)
    } catch (Q) {
      return "<unknown>"
    }
  }

  function cd2(A, B) {
    let Q = A,
      I = [],
      G, Z, D, Y, W;
    if (!Q || !Q.tagName) return "";
    if (Ix.HTMLElement) {
      if (Q instanceof HTMLElement && Q.dataset && Q.dataset.sentryComponent) return Q.dataset.sentryComponent
    }
    I.push(Q.tagName.toLowerCase());
    let J = B && B.length ? B.filter((X) => Q.getAttribute(X)).map((X) => [X, Q.getAttribute(X)]) : null;
    if (J && J.length) J.forEach((X) => {
      I.push(`[${X[0]}="${X[1]}"]`)
    });
    else {
      if (Q.id) I.push(`#${Q.id}`);
      if (G = Q.className, G && md2.isString(G)) {
        Z = G.split(/\s+/);
        for (W = 0; W < Z.length; W++) I.push(`.${Z[W]}`)
      }
    }
    let F = ["aria-label", "type", "name", "title", "alt"];
    for (W = 0; W < F.length; W++)
      if (D = F[W], Y = Q.getAttribute(D), Y) I.push(`[${D}="${Y}"]`);
    return I.join("")
  }

  function ld2() {
    try {
      return Ix.document.location.href
    } catch (A) {
      return ""
    }
  }

  function id2(A) {
    if (Ix.document && Ix.document.querySelector) return Ix.document.querySelector(A);
    return null
  }

  function nd2(A) {
    if (!Ix.HTMLElement) return null;
    let B = A,
      Q = 5;
    for (let I = 0; I < Q; I++) {
      if (!B) return null;
      if (B instanceof HTMLElement && B.dataset.sentryComponent) return B.dataset.sentryComponent;
      B = B.parentNode
    }
    return null
  }
  y5A.getComponentName = nd2;
  y5A.getDomElement = id2;
  y5A.getLocationHref = ld2;
  y5A.htmlTreeAsString = pd2
})
// @from(Start 13247, End 13429)
pH = z((k5A) => {
  Object.defineProperty(k5A, "__esModule", {
    value: !0
  });
  var td2 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
  k5A.DEBUG_BUILD = td2
})
// @from(Start 13435, End 14609)
rV = z((f5A) => {
  Object.defineProperty(f5A, "__esModule", {
    value: !0
  });
  var Au2 = pH(),
    gU1 = FZ(),
    Bu2 = "Sentry Logger ",
    hU1 = ["debug", "info", "warn", "error", "log", "assert", "trace"],
    mU1 = {};

  function x5A(A) {
    if (!("console" in gU1.GLOBAL_OBJ)) return A();
    let B = gU1.GLOBAL_OBJ.console,
      Q = {},
      I = Object.keys(mU1);
    I.forEach((G) => {
      let Z = mU1[G];
      Q[G] = B[G], B[G] = Z
    });
    try {
      return A()
    } finally {
      I.forEach((G) => {
        B[G] = Q[G]
      })
    }
  }

  function Qu2() {
    let A = !1,
      B = {
        enable: () => {
          A = !0
        },
        disable: () => {
          A = !1
        },
        isEnabled: () => A
      };
    if (Au2.DEBUG_BUILD) hU1.forEach((Q) => {
      B[Q] = (...I) => {
        if (A) x5A(() => {
          gU1.GLOBAL_OBJ.console[Q](`${Bu2}[${Q}]:`, ...I)
        })
      }
    });
    else hU1.forEach((Q) => {
      B[Q] = () => {
        return
      }
    });
    return B
  }
  var Iu2 = Qu2();
  f5A.CONSOLE_LEVELS = hU1;
  f5A.consoleSandbox = x5A;
  f5A.logger = Iu2;
  f5A.originalConsoleMethods = mU1
})
// @from(Start 14615, End 16736)
dU1 = z((g5A) => {
  Object.defineProperty(g5A, "__esModule", {
    value: !0
  });
  var Wu2 = pH(),
    Mc = rV(),
    Ju2 = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;

  function Fu2(A) {
    return A === "http" || A === "https"
  }

  function Xu2(A, B = !1) {
    let {
      host: Q,
      path: I,
      pass: G,
      port: Z,
      projectId: D,
      protocol: Y,
      publicKey: W
    } = A;
    return `${Y}://${W}${B&&G?`:${G}`:""}@${Q}${Z?`:${Z}`:""}/${I?`${I}/`:I}${D}`
  }

  function v5A(A) {
    let B = Ju2.exec(A);
    if (!B) {
      Mc.consoleSandbox(() => {
        console.error(`Invalid Sentry Dsn: ${A}`)
      });
      return
    }
    let [Q, I, G = "", Z, D = "", Y] = B.slice(1), W = "", J = Y, F = J.split("/");
    if (F.length > 1) W = F.slice(0, -1).join("/"), J = F.pop();
    if (J) {
      let X = J.match(/^\d+/);
      if (X) J = X[0]
    }
    return b5A({
      host: Z,
      pass: G,
      path: W,
      projectId: J,
      port: D,
      protocol: Q,
      publicKey: I
    })
  }

  function b5A(A) {
    return {
      protocol: A.protocol,
      publicKey: A.publicKey || "",
      pass: A.pass || "",
      host: A.host,
      port: A.port || "",
      path: A.path || "",
      projectId: A.projectId
    }
  }

  function Vu2(A) {
    if (!Wu2.DEBUG_BUILD) return !0;
    let {
      port: B,
      projectId: Q,
      protocol: I
    } = A;
    if (["protocol", "publicKey", "host", "projectId"].find((D) => {
        if (!A[D]) return Mc.logger.error(`Invalid Sentry Dsn: ${D} missing`), !0;
        return !1
      })) return !1;
    if (!Q.match(/^\d+$/)) return Mc.logger.error(`Invalid Sentry Dsn: Invalid projectId ${Q}`), !1;
    if (!Fu2(I)) return Mc.logger.error(`Invalid Sentry Dsn: Invalid protocol ${I}`), !1;
    if (B && isNaN(parseInt(B, 10))) return Mc.logger.error(`Invalid Sentry Dsn: Invalid port ${B}`), !1;
    return !0
  }

  function Cu2(A) {
    let B = typeof A === "string" ? v5A(A) : b5A(A);
    if (!B || !Vu2(B)) return;
    return B
  }
  g5A.dsnFromString = v5A;
  g5A.dsnToString = Xu2;
  g5A.makeDsn = Cu2
})
// @from(Start 16742, End 17083)
uU1 = z((m5A) => {
  Object.defineProperty(m5A, "__esModule", {
    value: !0
  });
  class h5A extends Error {
    constructor(A, B = "warn") {
      super(A);
      this.message = A, this.name = new.target.prototype.constructor.name, Object.setPrototypeOf(this, new.target.prototype), this.logLevel = B
    }
  }
  m5A.SentryError = h5A
})
// @from(Start 17089, End 20640)
gF = z((n5A) => {
  Object.defineProperty(n5A, "__esModule", {
    value: !0
  });
  var Eu2 = bU1(),
    Uu2 = pH(),
    Gx = bF(),
    Nu2 = rV(),
    d5A = qc();

  function $u2(A, B, Q) {
    if (!(B in A)) return;
    let I = A[B],
      G = Q(I);
    if (typeof G === "function") l5A(G, I);
    A[B] = G
  }

  function c5A(A, B, Q) {
    try {
      Object.defineProperty(A, B, {
        value: Q,
        writable: !0,
        configurable: !0
      })
    } catch (I) {
      Uu2.DEBUG_BUILD && Nu2.logger.log(`Failed to add non-enumerable property "${B}" to object`, A)
    }
  }

  function l5A(A, B) {
    try {
      let Q = B.prototype || {};
      A.prototype = B.prototype = Q, c5A(A, "__sentry_original__", B)
    } catch (Q) {}
  }

  function qu2(A) {
    return A.__sentry_original__
  }

  function Mu2(A) {
    return Object.keys(A).map((B) => `${encodeURIComponent(B)}=${encodeURIComponent(A[B])}`).join("&")
  }

  function i5A(A) {
    if (Gx.isError(A)) return {
      message: A.message,
      name: A.name,
      stack: A.stack,
      ...p5A(A)
    };
    else if (Gx.isEvent(A)) {
      let B = {
        type: A.type,
        target: u5A(A.target),
        currentTarget: u5A(A.currentTarget),
        ...p5A(A)
      };
      if (typeof CustomEvent !== "undefined" && Gx.isInstanceOf(A, CustomEvent)) B.detail = A.detail;
      return B
    } else return A
  }

  function u5A(A) {
    try {
      return Gx.isElement(A) ? Eu2.htmlTreeAsString(A) : Object.prototype.toString.call(A)
    } catch (B) {
      return "<unknown>"
    }
  }

  function p5A(A) {
    if (typeof A === "object" && A !== null) {
      let B = {};
      for (let Q in A)
        if (Object.prototype.hasOwnProperty.call(A, Q)) B[Q] = A[Q];
      return B
    } else return {}
  }

  function Lu2(A, B = 40) {
    let Q = Object.keys(i5A(A));
    if (Q.sort(), !Q.length) return "[object has no keys]";
    if (Q[0].length >= B) return d5A.truncate(Q[0], B);
    for (let I = Q.length; I > 0; I--) {
      let G = Q.slice(0, I).join(", ");
      if (G.length > B) continue;
      if (I === Q.length) return G;
      return d5A.truncate(G, B)
    }
    return ""
  }

  function Ru2(A) {
    return pU1(A, new Map)
  }

  function pU1(A, B) {
    if (Ou2(A)) {
      let Q = B.get(A);
      if (Q !== void 0) return Q;
      let I = {};
      B.set(A, I);
      for (let G of Object.keys(A))
        if (typeof A[G] !== "undefined") I[G] = pU1(A[G], B);
      return I
    }
    if (Array.isArray(A)) {
      let Q = B.get(A);
      if (Q !== void 0) return Q;
      let I = [];
      return B.set(A, I), A.forEach((G) => {
        I.push(pU1(G, B))
      }), I
    }
    return A
  }

  function Ou2(A) {
    if (!Gx.isPlainObject(A)) return !1;
    try {
      let B = Object.getPrototypeOf(A).constructor.name;
      return !B || B === "Object"
    } catch (B) {
      return !0
    }
  }

  function Tu2(A) {
    let B;
    switch (!0) {
      case (A === void 0 || A === null):
        B = new String(A);
        break;
      case (typeof A === "symbol" || typeof A === "bigint"):
        B = Object(A);
        break;
      case Gx.isPrimitive(A):
        B = new A.constructor(A);
        break;
      default:
        B = A;
        break
    }
    return B
  }
  n5A.addNonEnumerableProperty = c5A;
  n5A.convertToPlainObject = i5A;
  n5A.dropUndefinedKeys = Ru2;
  n5A.extractExceptionKeysForMessage = Lu2;
  n5A.fill = $u2;
  n5A.getOriginalFunction = qu2;
  n5A.markFunctionWrapped = l5A;
  n5A.objectify = Tu2;
  n5A.urlEncode = Mu2
})
// @from(Start 20646, End 22229)
I91 = z((s5A) => {
  Object.defineProperty(s5A, "__esModule", {
    value: !0
  });

  function a5A(A, B = !1) {
    return !(B || A && !A.startsWith("/") && !A.match(/^[A-Z]:/) && !A.startsWith(".") && !A.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//)) && A !== void 0 && !A.includes("node_modules/")
  }

  function bu2(A) {
    let B = /^\s*[-]{4,}$/,
      Q = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
    return (I) => {
      let G = I.match(Q);
      if (G) {
        let Z, D, Y, W, J;
        if (G[1]) {
          Y = G[1];
          let V = Y.lastIndexOf(".");
          if (Y[V - 1] === ".") V--;
          if (V > 0) {
            Z = Y.slice(0, V), D = Y.slice(V + 1);
            let C = Z.indexOf(".Module");
            if (C > 0) Y = Y.slice(C + 1), Z = Z.slice(0, C)
          }
          W = void 0
        }
        if (D) W = Z, J = D;
        if (D === "<anonymous>") J = void 0, Y = void 0;
        if (Y === void 0) J = J || "<anonymous>", Y = W ? `${W}.${J}` : J;
        let F = G[2] && G[2].startsWith("file://") ? G[2].slice(7) : G[2],
          X = G[5] === "native";
        if (F && F.match(/\/[A-Z]:/)) F = F.slice(1);
        if (!F && G[5] && !X) F = G[5];
        return {
          filename: F,
          module: A ? A(F) : void 0,
          function: Y,
          lineno: parseInt(G[3], 10) || void 0,
          colno: parseInt(G[4], 10) || void 0,
          in_app: a5A(F, X)
        }
      }
      if (I.match(B)) return {
        filename: I
      };
      return
    }
  }
  s5A.filenameIsInApp = a5A;
  s5A.node = bu2
})
// @from(Start 22235, End 23982)
G91 = z((Q8A) => {
  Object.defineProperty(Q8A, "__esModule", {
    value: !0
  });
  var t5A = I91(),
    e5A = 50,
    r5A = /\(error: (.*)\)/,
    o5A = /captureMessage|captureException/;

  function A8A(...A) {
    let B = A.sort((Q, I) => Q[0] - I[0]).map((Q) => Q[1]);
    return (Q, I = 0) => {
      let G = [],
        Z = Q.split(`
`);
      for (let D = I; D < Z.length; D++) {
        let Y = Z[D];
        if (Y.length > 1024) continue;
        let W = r5A.test(Y) ? Y.replace(r5A, "$1") : Y;
        if (W.match(/\S*Error: /)) continue;
        for (let J of B) {
          let F = J(W);
          if (F) {
            G.push(F);
            break
          }
        }
        if (G.length >= e5A) break
      }
      return B8A(G)
    }
  }

  function mu2(A) {
    if (Array.isArray(A)) return A8A(...A);
    return A
  }

  function B8A(A) {
    if (!A.length) return [];
    let B = Array.from(A);
    if (/sentryWrapped/.test(B[B.length - 1].function || "")) B.pop();
    if (B.reverse(), o5A.test(B[B.length - 1].function || "")) {
      if (B.pop(), o5A.test(B[B.length - 1].function || "")) B.pop()
    }
    return B.slice(0, e5A).map((Q) => ({
      ...Q,
      filename: Q.filename || B[B.length - 1].filename,
      function: Q.function || "?"
    }))
  }
  var cU1 = "<anonymous>";

  function du2(A) {
    try {
      if (!A || typeof A !== "function") return cU1;
      return A.name || cU1
    } catch (B) {
      return cU1
    }
  }

  function uu2(A) {
    return [90, t5A.node(A)]
  }
  Q8A.filenameIsInApp = t5A.filenameIsInApp;
  Q8A.createStackParser = A8A;
  Q8A.getFunctionName = du2;
  Q8A.nodeStackLineParser = uu2;
  Q8A.stackParserFromStackParserOptions = mu2;
  Q8A.stripSentryFramesAndReverse = B8A
})
// @from(Start 23988, End 24772)
NU = z((G8A) => {
  Object.defineProperty(G8A, "__esModule", {
    value: !0
  });
  var su2 = pH(),
    ru2 = rV(),
    ou2 = G91(),
    Zx = {},
    I8A = {};

  function tu2(A, B) {
    Zx[A] = Zx[A] || [], Zx[A].push(B)
  }

  function eu2() {
    Object.keys(Zx).forEach((A) => {
      Zx[A] = void 0
    })
  }

  function Ap2(A, B) {
    if (!I8A[A]) B(), I8A[A] = !0
  }

  function Bp2(A, B) {
    let Q = A && Zx[A];
    if (!Q) return;
    for (let I of Q) try {
      I(B)
    } catch (G) {
      su2.DEBUG_BUILD && ru2.logger.error(`Error while triggering instrumentation handler.
Type: ${A}
Name: ${ou2.getFunctionName(I)}
Error:`, G)
    }
  }
  G8A.addHandler = tu2;
  G8A.maybeInstrument = Ap2;
  G8A.resetInstrumentationHandlers = eu2;
  G8A.triggerHandlers = Bp2
})
// @from(Start 24778, End 25631)
nU1 = z((Z8A) => {
  Object.defineProperty(Z8A, "__esModule", {
    value: !0
  });
  var lU1 = rV(),
    Dp2 = gF(),
    Z91 = FZ(),
    iU1 = NU();

  function Yp2(A) {
    iU1.addHandler("console", A), iU1.maybeInstrument("console", Wp2)
  }

  function Wp2() {
    if (!("console" in Z91.GLOBAL_OBJ)) return;
    lU1.CONSOLE_LEVELS.forEach(function(A) {
      if (!(A in Z91.GLOBAL_OBJ.console)) return;
      Dp2.fill(Z91.GLOBAL_OBJ.console, A, function(B) {
        return lU1.originalConsoleMethods[A] = B,
          function(...Q) {
            let I = {
              args: Q,
              level: A
            };
            iU1.triggerHandlers("console", I);
            let G = lU1.originalConsoleMethods[A];
            G && G.apply(Z91.GLOBAL_OBJ.console, Q)
          }
      })
    })
  }
  Z8A.addConsoleInstrumentationHandler = Yp2
})
// @from(Start 25637, End 28584)
Lc = z((Y8A) => {
  Object.defineProperty(Y8A, "__esModule", {
    value: !0
  });
  var Fp2 = gF(),
    aU1 = qc(),
    Xp2 = FZ();

  function Vp2() {
    let A = Xp2.GLOBAL_OBJ,
      B = A.crypto || A.msCrypto,
      Q = () => Math.random() * 16;
    try {
      if (B && B.randomUUID) return B.randomUUID().replace(/-/g, "");
      if (B && B.getRandomValues) Q = () => {
        let I = new Uint8Array(1);
        return B.getRandomValues(I), I[0]
      }
    } catch (I) {}
    return ([1e7] + 1000 + 4000 + 8000 + 100000000000).replace(/[018]/g, (I) => (I ^ (Q() & 15) >> I / 4).toString(16))
  }

  function D8A(A) {
    return A.exception && A.exception.values ? A.exception.values[0] : void 0
  }

  function Cp2(A) {
    let {
      message: B,
      event_id: Q
    } = A;
    if (B) return B;
    let I = D8A(A);
    if (I) {
      if (I.type && I.value) return `${I.type}: ${I.value}`;
      return I.type || I.value || Q || "<unknown>"
    }
    return Q || "<unknown>"
  }

  function Kp2(A, B, Q) {
    let I = A.exception = A.exception || {},
      G = I.values = I.values || [],
      Z = G[0] = G[0] || {};
    if (!Z.value) Z.value = B || "";
    if (!Z.type) Z.type = Q || "Error"
  }

  function Hp2(A, B) {
    let Q = D8A(A);
    if (!Q) return;
    let I = {
        type: "generic",
        handled: !0
      },
      G = Q.mechanism;
    if (Q.mechanism = {
        ...I,
        ...G,
        ...B
      }, B && "data" in B) {
      let Z = {
        ...G && G.data,
        ...B.data
      };
      Q.mechanism.data = Z
    }
  }
  var zp2 = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

  function wp2(A) {
    let B = A.match(zp2) || [],
      Q = parseInt(B[1], 10),
      I = parseInt(B[2], 10),
      G = parseInt(B[3], 10);
    return {
      buildmetadata: B[5],
      major: isNaN(Q) ? void 0 : Q,
      minor: isNaN(I) ? void 0 : I,
      patch: isNaN(G) ? void 0 : G,
      prerelease: B[4]
    }
  }

  function Ep2(A, B, Q = 5) {
    if (B.lineno === void 0) return;
    let I = A.length,
      G = Math.max(Math.min(I - 1, B.lineno - 1), 0);
    B.pre_context = A.slice(Math.max(0, G - Q), G).map((Z) => aU1.snipLine(Z, 0)), B.context_line = aU1.snipLine(A[Math.min(I - 1, G)], B.colno || 0), B.post_context = A.slice(Math.min(G + 1, I), G + 1 + Q).map((Z) => aU1.snipLine(Z, 0))
  }

  function Up2(A) {
    if (A && A.__sentry_captured__) return !0;
    try {
      Fp2.addNonEnumerableProperty(A, "__sentry_captured__", !0)
    } catch (B) {}
    return !1
  }

  function Np2(A) {
    return Array.isArray(A) ? A : [A]
  }
  Y8A.addContextToFrame = Ep2;
  Y8A.addExceptionMechanism = Hp2;
  Y8A.addExceptionTypeValue = Kp2;
  Y8A.arrayify = Np2;
  Y8A.checkOrSetAlreadyCaught = Up2;
  Y8A.getEventDescription = Cp2;
  Y8A.parseSemver = wp2;
  Y8A.uuid4 = Vp2
})
// @from(Start 28590, End 31587)
tU1 = z((X8A) => {
  Object.defineProperty(X8A, "__esModule", {
    value: !0
  });
  var Sp2 = Lc(),
    D91 = gF(),
    _p2 = FZ(),
    sU1 = NU(),
    Dx = _p2.GLOBAL_OBJ,
    jp2 = 1000,
    W8A, rU1, oU1;

  function yp2(A) {
    sU1.addHandler("dom", A), sU1.maybeInstrument("dom", F8A)
  }

  function F8A() {
    if (!Dx.document) return;
    let A = sU1.triggerHandlers.bind(null, "dom"),
      B = J8A(A, !0);
    Dx.document.addEventListener("click", B, !1), Dx.document.addEventListener("keypress", B, !1), ["EventTarget", "Node"].forEach((Q) => {
      let I = Dx[Q] && Dx[Q].prototype;
      if (!I || !I.hasOwnProperty || !I.hasOwnProperty("addEventListener")) return;
      D91.fill(I, "addEventListener", function(G) {
        return function(Z, D, Y) {
          if (Z === "click" || Z == "keypress") try {
            let W = this,
              J = W.__sentry_instrumentation_handlers__ = W.__sentry_instrumentation_handlers__ || {},
              F = J[Z] = J[Z] || {
                refCount: 0
              };
            if (!F.handler) {
              let X = J8A(A);
              F.handler = X, G.call(this, Z, X, Y)
            }
            F.refCount++
          } catch (W) {}
          return G.call(this, Z, D, Y)
        }
      }), D91.fill(I, "removeEventListener", function(G) {
        return function(Z, D, Y) {
          if (Z === "click" || Z == "keypress") try {
            let W = this,
              J = W.__sentry_instrumentation_handlers__ || {},
              F = J[Z];
            if (F) {
              if (F.refCount--, F.refCount <= 0) G.call(this, Z, F.handler, Y), F.handler = void 0, delete J[Z];
              if (Object.keys(J).length === 0) delete W.__sentry_instrumentation_handlers__
            }
          } catch (W) {}
          return G.call(this, Z, D, Y)
        }
      })
    })
  }

  function kp2(A) {
    if (A.type !== rU1) return !1;
    try {
      if (!A.target || A.target._sentryId !== oU1) return !1
    } catch (B) {}
    return !0
  }

  function xp2(A, B) {
    if (A !== "keypress") return !1;
    if (!B || !B.tagName) return !0;
    if (B.tagName === "INPUT" || B.tagName === "TEXTAREA" || B.isContentEditable) return !1;
    return !0
  }

  function J8A(A, B = !1) {
    return (Q) => {
      if (!Q || Q._sentryCaptured) return;
      let I = fp2(Q);
      if (xp2(Q.type, I)) return;
      if (D91.addNonEnumerableProperty(Q, "_sentryCaptured", !0), I && !I._sentryId) D91.addNonEnumerableProperty(I, "_sentryId", Sp2.uuid4());
      let G = Q.type === "keypress" ? "input" : Q.type;
      if (!kp2(Q)) A({
        event: Q,
        name: G,
        global: B
      }), rU1 = Q.type, oU1 = I ? I._sentryId : void 0;
      clearTimeout(W8A), W8A = Dx.setTimeout(() => {
        oU1 = void 0, rU1 = void 0
      }, jp2)
    }
  }

  function fp2(A) {
    try {
      return A.target
    } catch (B) {
      return null
    }
  }
  X8A.addClickKeypressInstrumentationHandler = yp2;
  X8A.instrumentDOM = F8A
})
// @from(Start 31593, End 33459)
BN1 = z((V8A) => {
  Object.defineProperty(V8A, "__esModule", {
    value: !0
  });
  var gp2 = pH(),
    hp2 = rV(),
    mp2 = FZ(),
    Y91 = mp2.getGlobalObject();

  function dp2() {
    try {
      return new ErrorEvent(""), !0
    } catch (A) {
      return !1
    }
  }

  function up2() {
    try {
      return new DOMError(""), !0
    } catch (A) {
      return !1
    }
  }

  function pp2() {
    try {
      return new DOMException(""), !0
    } catch (A) {
      return !1
    }
  }

  function AN1() {
    if (!("fetch" in Y91)) return !1;
    try {
      return new Request("http://www.example.com"), !0
    } catch (A) {
      return !1
    }
  }

  function eU1(A) {
    return A && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(A.toString())
  }

  function cp2() {
    if (typeof EdgeRuntime === "string") return !0;
    if (!AN1()) return !1;
    if (eU1(Y91.fetch)) return !0;
    let A = !1,
      B = Y91.document;
    if (B && typeof B.createElement === "function") try {
      let Q = B.createElement("iframe");
      if (Q.hidden = !0, B.head.appendChild(Q), Q.contentWindow && Q.contentWindow.fetch) A = eU1(Q.contentWindow.fetch);
      B.head.removeChild(Q)
    } catch (Q) {
      gp2.DEBUG_BUILD && hp2.logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", Q)
    }
    return A
  }

  function lp2() {
    return "ReportingObserver" in Y91
  }

  function ip2() {
    if (!AN1()) return !1;
    try {
      return new Request("_", {
        referrerPolicy: "origin"
      }), !0
    } catch (A) {
      return !1
    }
  }
  V8A.isNativeFetch = eU1;
  V8A.supportsDOMError = up2;
  V8A.supportsDOMException = pp2;
  V8A.supportsErrorEvent = dp2;
  V8A.supportsFetch = AN1;
  V8A.supportsNativeFetch = cp2;
  V8A.supportsReferrerPolicy = ip2;
  V8A.supportsReportingObserver = lp2
})
// @from(Start 33465, End 35292)
IN1 = z((z8A) => {
  Object.defineProperty(z8A, "__esModule", {
    value: !0
  });
  var Bc2 = gF(),
    Qc2 = BN1(),
    C8A = FZ(),
    Rc = NU();

  function Ic2(A) {
    Rc.addHandler("fetch", A), Rc.maybeInstrument("fetch", Gc2)
  }

  function Gc2() {
    if (!Qc2.supportsNativeFetch()) return;
    Bc2.fill(C8A.GLOBAL_OBJ, "fetch", function(A) {
      return function(...B) {
        let {
          method: Q,
          url: I
        } = H8A(B), G = {
          args: B,
          fetchData: {
            method: Q,
            url: I
          },
          startTimestamp: Date.now()
        };
        return Rc.triggerHandlers("fetch", {
          ...G
        }), A.apply(C8A.GLOBAL_OBJ, B).then((Z) => {
          let D = {
            ...G,
            endTimestamp: Date.now(),
            response: Z
          };
          return Rc.triggerHandlers("fetch", D), Z
        }, (Z) => {
          let D = {
            ...G,
            endTimestamp: Date.now(),
            error: Z
          };
          throw Rc.triggerHandlers("fetch", D), Z
        })
      }
    })
  }

  function QN1(A, B) {
    return !!A && typeof A === "object" && !!A[B]
  }

  function K8A(A) {
    if (typeof A === "string") return A;
    if (!A) return "";
    if (QN1(A, "url")) return A.url;
    if (A.toString) return A.toString();
    return ""
  }

  function H8A(A) {
    if (A.length === 0) return {
      method: "GET",
      url: ""
    };
    if (A.length === 2) {
      let [Q, I] = A;
      return {
        url: K8A(Q),
        method: QN1(I, "method") ? String(I.method).toUpperCase() : "GET"
      }
    }
    let B = A[0];
    return {
      url: K8A(B),
      method: QN1(B, "method") ? String(B.method).toUpperCase() : "GET"
    }
  }
  z8A.addFetchInstrumentationHandler = Ic2;
  z8A.parseFetchArgs = H8A
})
// @from(Start 35298, End 35977)
DN1 = z((w8A) => {
  Object.defineProperty(w8A, "__esModule", {
    value: !0
  });
  var GN1 = FZ(),
    ZN1 = NU(),
    W91 = null;

  function Yc2(A) {
    ZN1.addHandler("error", A), ZN1.maybeInstrument("error", Wc2)
  }

  function Wc2() {
    W91 = GN1.GLOBAL_OBJ.onerror, GN1.GLOBAL_OBJ.onerror = function(A, B, Q, I, G) {
      let Z = {
        column: I,
        error: G,
        line: Q,
        msg: A,
        url: B
      };
      if (ZN1.triggerHandlers("error", Z), W91 && !W91.__SENTRY_LOADER__) return W91.apply(this, arguments);
      return !1
    }, GN1.GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = !0
  }
  w8A.addGlobalErrorInstrumentationHandler = Yc2
})
// @from(Start 35983, End 36648)
JN1 = z((E8A) => {
  Object.defineProperty(E8A, "__esModule", {
    value: !0
  });
  var YN1 = FZ(),
    WN1 = NU(),
    J91 = null;

  function Fc2(A) {
    WN1.addHandler("unhandledrejection", A), WN1.maybeInstrument("unhandledrejection", Xc2)
  }

  function Xc2() {
    J91 = YN1.GLOBAL_OBJ.onunhandledrejection, YN1.GLOBAL_OBJ.onunhandledrejection = function(A) {
      let B = A;
      if (WN1.triggerHandlers("unhandledrejection", B), J91 && !J91.__SENTRY_LOADER__) return J91.apply(this, arguments);
      return !0
    }, YN1.GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0
  }
  E8A.addGlobalUnhandledRejectionInstrumentationHandler = Fc2
})
// @from(Start 36654, End 37010)
FN1 = z((U8A) => {
  Object.defineProperty(U8A, "__esModule", {
    value: !0
  });
  var Cc2 = FZ(),
    F91 = Cc2.getGlobalObject();

  function Kc2() {
    let A = F91.chrome,
      B = A && A.app && A.app.runtime,
      Q = "history" in F91 && !!F91.history.pushState && !!F91.history.replaceState;
    return !B && Q
  }
  U8A.supportsHistory = Kc2
})
// @from(Start 37016, End 38160)
XN1 = z(($8A) => {
  Object.defineProperty($8A, "__esModule", {
    value: !0
  });
  var N8A = gF();
  pH();
  rV();
  var zc2 = FZ(),
    wc2 = FN1(),
    V91 = NU(),
    Oc = zc2.GLOBAL_OBJ,
    X91;

  function Ec2(A) {
    V91.addHandler("history", A), V91.maybeInstrument("history", Uc2)
  }

  function Uc2() {
    if (!wc2.supportsHistory()) return;
    let A = Oc.onpopstate;
    Oc.onpopstate = function(...Q) {
      let I = Oc.location.href,
        G = X91;
      X91 = I;
      let Z = {
        from: G,
        to: I
      };
      if (V91.triggerHandlers("history", Z), A) try {
        return A.apply(this, Q)
      } catch (D) {}
    };

    function B(Q) {
      return function(...I) {
        let G = I.length > 2 ? I[2] : void 0;
        if (G) {
          let Z = X91,
            D = String(G);
          X91 = D;
          let Y = {
            from: Z,
            to: D
          };
          V91.triggerHandlers("history", Y)
        }
        return Q.apply(this, I)
      }
    }
    N8A.fill(Oc.history, "pushState", B), N8A.fill(Oc.history, "replaceState", B)
  }
  $8A.addHistoryInstrumentationHandler = Ec2
})
// @from(Start 38166, End 40640)
VN1 = z((M8A) => {
  Object.defineProperty(M8A, "__esModule", {
    value: !0
  });
  var K91 = bF(),
    C91 = gF(),
    $c2 = FZ(),
    H91 = NU(),
    qc2 = $c2.GLOBAL_OBJ,
    Tc = "__sentry_xhr_v3__";

  function Mc2(A) {
    H91.addHandler("xhr", A), H91.maybeInstrument("xhr", q8A)
  }

  function q8A() {
    if (!qc2.XMLHttpRequest) return;
    let A = XMLHttpRequest.prototype;
    C91.fill(A, "open", function(B) {
      return function(...Q) {
        let I = Date.now(),
          G = K91.isString(Q[0]) ? Q[0].toUpperCase() : void 0,
          Z = Lc2(Q[1]);
        if (!G || !Z) return B.apply(this, Q);
        if (this[Tc] = {
            method: G,
            url: Z,
            request_headers: {}
          }, G === "POST" && Z.match(/sentry_key/)) this.__sentry_own_request__ = !0;
        let D = () => {
          let Y = this[Tc];
          if (!Y) return;
          if (this.readyState === 4) {
            try {
              Y.status_code = this.status
            } catch (J) {}
            let W = {
              args: [G, Z],
              endTimestamp: Date.now(),
              startTimestamp: I,
              xhr: this
            };
            H91.triggerHandlers("xhr", W)
          }
        };
        if ("onreadystatechange" in this && typeof this.onreadystatechange === "function") C91.fill(this, "onreadystatechange", function(Y) {
          return function(...W) {
            return D(), Y.apply(this, W)
          }
        });
        else this.addEventListener("readystatechange", D);
        return C91.fill(this, "setRequestHeader", function(Y) {
          return function(...W) {
            let [J, F] = W, X = this[Tc];
            if (X && K91.isString(J) && K91.isString(F)) X.request_headers[J.toLowerCase()] = F;
            return Y.apply(this, W)
          }
        }), B.apply(this, Q)
      }
    }), C91.fill(A, "send", function(B) {
      return function(...Q) {
        let I = this[Tc];
        if (!I) return B.apply(this, Q);
        if (Q[0] !== void 0) I.body = Q[0];
        let G = {
          args: [I.method, I.url],
          startTimestamp: Date.now(),
          xhr: this
        };
        return H91.triggerHandlers("xhr", G), B.apply(this, Q)
      }
    })
  }

  function Lc2(A) {
    if (K91.isString(A)) return A;
    try {
      return A.toString()
    } catch (B) {}
    return
  }
  M8A.SENTRY_XHR_DATA_KEY = Tc;
  M8A.addXhrInstrumentationHandler = Mc2;
  M8A.instrumentXHR = q8A
})
// @from(Start 40646, End 42282)
j8A = z((_8A) => {
  Object.defineProperty(_8A, "__esModule", {
    value: !0
  });
  var Pc2 = pH(),
    Sc2 = rV(),
    L8A = nU1(),
    R8A = tU1(),
    O8A = IN1(),
    T8A = DN1(),
    P8A = JN1(),
    S8A = XN1(),
    CN1 = VN1();

  function _c2(A, B) {
    switch (A) {
      case "console":
        return L8A.addConsoleInstrumentationHandler(B);
      case "dom":
        return R8A.addClickKeypressInstrumentationHandler(B);
      case "xhr":
        return CN1.addXhrInstrumentationHandler(B);
      case "fetch":
        return O8A.addFetchInstrumentationHandler(B);
      case "history":
        return S8A.addHistoryInstrumentationHandler(B);
      case "error":
        return T8A.addGlobalErrorInstrumentationHandler(B);
      case "unhandledrejection":
        return P8A.addGlobalUnhandledRejectionInstrumentationHandler(B);
      default:
        Pc2.DEBUG_BUILD && Sc2.logger.warn("unknown instrumentation type:", A)
    }
  }
  _8A.addConsoleInstrumentationHandler = L8A.addConsoleInstrumentationHandler;
  _8A.addClickKeypressInstrumentationHandler = R8A.addClickKeypressInstrumentationHandler;
  _8A.addFetchInstrumentationHandler = O8A.addFetchInstrumentationHandler;
  _8A.addGlobalErrorInstrumentationHandler = T8A.addGlobalErrorInstrumentationHandler;
  _8A.addGlobalUnhandledRejectionInstrumentationHandler = P8A.addGlobalUnhandledRejectionInstrumentationHandler;
  _8A.addHistoryInstrumentationHandler = S8A.addHistoryInstrumentationHandler;
  _8A.SENTRY_XHR_DATA_KEY = CN1.SENTRY_XHR_DATA_KEY;
  _8A.addXhrInstrumentationHandler = CN1.addXhrInstrumentationHandler;
  _8A.addInstrumentationHandler = _c2
})
// @from(Start 42288, End 42584)
KN1 = z((y8A) => {
  Object.defineProperty(y8A, "__esModule", {
    value: !0
  });

  function mc2() {
    return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__
  }

  function dc2() {
    return "npm"
  }
  y8A.getSDKSource = dc2;
  y8A.isBrowserBundle = mc2
})
// @from(Start 42590, End 43221)
HN1 = z((k8A, w91) => {
  Object.defineProperty(k8A, "__esModule", {
    value: !0
  });
  var cc2 = KN1();

  function lc2() {
    return !cc2.isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]"
  }

  function z91(A, B) {
    return A.require(B)
  }

  function ic2(A) {
    let B;
    try {
      B = z91(w91, A)
    } catch (Q) {}
    try {
      let {
        cwd: Q
      } = z91(w91, "process");
      B = z91(w91, `${Q()}/node_modules/${A}`)
    } catch (Q) {}
    return B
  }
  k8A.dynamicRequire = z91;
  k8A.isNodeEnv = lc2;
  k8A.loadModule = ic2
})
// @from(Start 43227, End 43581)
v8A = z((f8A) => {
  Object.defineProperty(f8A, "__esModule", {
    value: !0
  });
  var rc2 = HN1(),
    x8A = FZ();

  function oc2() {
    return typeof window !== "undefined" && (!rc2.isNodeEnv() || tc2())
  }

  function tc2() {
    return x8A.GLOBAL_OBJ.process !== void 0 && x8A.GLOBAL_OBJ.process.type === "renderer"
  }
  f8A.isBrowser = oc2
})
// @from(Start 43587, End 44221)
zN1 = z((b8A) => {
  Object.defineProperty(b8A, "__esModule", {
    value: !0
  });

  function Al2() {
    let A = typeof WeakSet === "function",
      B = A ? new WeakSet : [];

    function Q(G) {
      if (A) {
        if (B.has(G)) return !0;
        return B.add(G), !1
      }
      for (let Z = 0; Z < B.length; Z++)
        if (B[Z] === G) return !0;
      return B.push(G), !1
    }

    function I(G) {
      if (A) B.delete(G);
      else
        for (let Z = 0; Z < B.length; Z++)
          if (B[Z] === G) {
            B.splice(Z, 1);
            break
          }
    }
    return [Q, I]
  }
  b8A.memoBuilder = Al2
})
// @from(Start 44227, End 47326)
Pc = z((m8A) => {
  Object.defineProperty(m8A, "__esModule", {
    value: !0
  });
  var wN1 = bF(),
    Ql2 = zN1(),
    Il2 = gF(),
    Gl2 = G91();

  function g8A(A, B = 100, Q = 1 / 0) {
    try {
      return E91("", A, B, Q)
    } catch (I) {
      return {
        ERROR: `**non-serializable** (${I})`
      }
    }
  }

  function h8A(A, B = 3, Q = 102400) {
    let I = g8A(A, B);
    if (Wl2(I) > Q) return h8A(A, B - 1, Q);
    return I
  }

  function E91(A, B, Q = 1 / 0, I = 1 / 0, G = Ql2.memoBuilder()) {
    let [Z, D] = G;
    if (B == null || ["number", "boolean", "string"].includes(typeof B) && !wN1.isNaN(B)) return B;
    let Y = Zl2(A, B);
    if (!Y.startsWith("[object ")) return Y;
    if (B.__sentry_skip_normalization__) return B;
    let W = typeof B.__sentry_override_normalization_depth__ === "number" ? B.__sentry_override_normalization_depth__ : Q;
    if (W === 0) return Y.replace("object ", "");
    if (Z(B)) return "[Circular ~]";
    let J = B;
    if (J && typeof J.toJSON === "function") try {
      let C = J.toJSON();
      return E91("", C, W - 1, I, G)
    } catch (C) {}
    let F = Array.isArray(B) ? [] : {},
      X = 0,
      V = Il2.convertToPlainObject(B);
    for (let C in V) {
      if (!Object.prototype.hasOwnProperty.call(V, C)) continue;
      if (X >= I) {
        F[C] = "[MaxProperties ~]";
        break
      }
      let K = V[C];
      F[C] = E91(C, K, W - 1, I, G), X++
    }
    return D(B), F
  }

  function Zl2(A, B) {
    try {
      if (A === "domain" && B && typeof B === "object" && B._events) return "[Domain]";
      if (A === "domainEmitter") return "[DomainEmitter]";
      if (typeof global !== "undefined" && B === global) return "[Global]";
      if (typeof window !== "undefined" && B === window) return "[Window]";
      if (typeof document !== "undefined" && B === document) return "[Document]";
      if (wN1.isVueViewModel(B)) return "[VueViewModel]";
      if (wN1.isSyntheticEvent(B)) return "[SyntheticEvent]";
      if (typeof B === "number" && B !== B) return "[NaN]";
      if (typeof B === "function") return `[Function: ${Gl2.getFunctionName(B)}]`;
      if (typeof B === "symbol") return `[${String(B)}]`;
      if (typeof B === "bigint") return `[BigInt: ${String(B)}]`;
      let Q = Dl2(B);
      if (/^HTML(\w*)Element$/.test(Q)) return `[HTMLElement: ${Q}]`;
      return `[object ${Q}]`
    } catch (Q) {
      return `**non-serializable** (${Q})`
    }
  }

  function Dl2(A) {
    let B = Object.getPrototypeOf(A);
    return B ? B.constructor.name : "null prototype"
  }

  function Yl2(A) {
    return ~-encodeURI(A).split(/%..|./).length
  }

  function Wl2(A) {
    return Yl2(JSON.stringify(A))
  }

  function Jl2(A, B) {
    let Q = B.replace(/\\/g, "/").replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"),
      I = A;
    try {
      I = decodeURI(A)
    } catch (G) {}
    return I.replace(/\\/g, "/").replace(/webpack:\/?/g, "").replace(new RegExp(`(file://)?/*${Q}/*`, "ig"), "app:///")
  }
  m8A.normalize = g8A;
  m8A.normalizeToSize = h8A;
  m8A.normalizeUrlToBase = Jl2;
  m8A.walk = E91
})
// @from(Start 47332, End 49697)
n8A = z((i8A) => {
  Object.defineProperty(i8A, "__esModule", {
    value: !0
  });

  function u8A(A, B) {
    let Q = 0;
    for (let I = A.length - 1; I >= 0; I--) {
      let G = A[I];
      if (G === ".") A.splice(I, 1);
      else if (G === "..") A.splice(I, 1), Q++;
      else if (Q) A.splice(I, 1), Q--
    }
    if (B)
      for (; Q--; Q) A.unshift("..");
    return A
  }
  var Kl2 = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;

  function p8A(A) {
    let B = A.length > 1024 ? `<truncated>${A.slice(-1024)}` : A,
      Q = Kl2.exec(B);
    return Q ? Q.slice(1) : []
  }

  function EN1(...A) {
    let B = "",
      Q = !1;
    for (let I = A.length - 1; I >= -1 && !Q; I--) {
      let G = I >= 0 ? A[I] : "/";
      if (!G) continue;
      B = `${G}/${B}`, Q = G.charAt(0) === "/"
    }
    return B = u8A(B.split("/").filter((I) => !!I), !Q).join("/"), (Q ? "/" : "") + B || "."
  }

  function d8A(A) {
    let B = 0;
    for (; B < A.length; B++)
      if (A[B] !== "") break;
    let Q = A.length - 1;
    for (; Q >= 0; Q--)
      if (A[Q] !== "") break;
    if (B > Q) return [];
    return A.slice(B, Q - B + 1)
  }

  function Hl2(A, B) {
    A = EN1(A).slice(1), B = EN1(B).slice(1);
    let Q = d8A(A.split("/")),
      I = d8A(B.split("/")),
      G = Math.min(Q.length, I.length),
      Z = G;
    for (let Y = 0; Y < G; Y++)
      if (Q[Y] !== I[Y]) {
        Z = Y;
        break
      } let D = [];
    for (let Y = Z; Y < Q.length; Y++) D.push("..");
    return D = D.concat(I.slice(Z)), D.join("/")
  }

  function c8A(A) {
    let B = l8A(A),
      Q = A.slice(-1) === "/",
      I = u8A(A.split("/").filter((G) => !!G), !B).join("/");
    if (!I && !B) I = ".";
    if (I && Q) I += "/";
    return (B ? "/" : "") + I
  }

  function l8A(A) {
    return A.charAt(0) === "/"
  }

  function zl2(...A) {
    return c8A(A.join("/"))
  }

  function wl2(A) {
    let B = p8A(A),
      Q = B[0],
      I = B[1];
    if (!Q && !I) return ".";
    if (I) I = I.slice(0, I.length - 1);
    return Q + I
  }

  function El2(A, B) {
    let Q = p8A(A)[2];
    if (B && Q.slice(B.length * -1) === B) Q = Q.slice(0, Q.length - B.length);
    return Q
  }
  i8A.basename = El2;
  i8A.dirname = wl2;
  i8A.isAbsolute = l8A;
  i8A.join = zl2;
  i8A.normalizePath = c8A;
  i8A.relative = Hl2;
  i8A.resolve = EN1
})
// @from(Start 49703, End 52202)
UN1 = z((a8A) => {
  Object.defineProperty(a8A, "__esModule", {
    value: !0
  });
  var Ol2 = bF(),
    $U;
  (function(A) {
    A[A.PENDING = 0] = "PENDING";
    let Q = 1;
    A[A.RESOLVED = Q] = "RESOLVED";
    let I = 2;
    A[A.REJECTED = I] = "REJECTED"
  })($U || ($U = {}));

  function Tl2(A) {
    return new cH((B) => {
      B(A)
    })
  }

  function Pl2(A) {
    return new cH((B, Q) => {
      Q(A)
    })
  }
  class cH {
    constructor(A) {
      cH.prototype.__init.call(this), cH.prototype.__init2.call(this), cH.prototype.__init3.call(this), cH.prototype.__init4.call(this), this._state = $U.PENDING, this._handlers = [];
      try {
        A(this._resolve, this._reject)
      } catch (B) {
        this._reject(B)
      }
    }
    then(A, B) {
      return new cH((Q, I) => {
        this._handlers.push([!1, (G) => {
          if (!A) Q(G);
          else try {
            Q(A(G))
          } catch (Z) {
            I(Z)
          }
        }, (G) => {
          if (!B) I(G);
          else try {
            Q(B(G))
          } catch (Z) {
            I(Z)
          }
        }]), this._executeHandlers()
      })
    } catch (A) {
      return this.then((B) => B, A)
    } finally(A) {
      return new cH((B, Q) => {
        let I, G;
        return this.then((Z) => {
          if (G = !1, I = Z, A) A()
        }, (Z) => {
          if (G = !0, I = Z, A) A()
        }).then(() => {
          if (G) {
            Q(I);
            return
          }
          B(I)
        })
      })
    }
    __init() {
      this._resolve = (A) => {
        this._setResult($U.RESOLVED, A)
      }
    }
    __init2() {
      this._reject = (A) => {
        this._setResult($U.REJECTED, A)
      }
    }
    __init3() {
      this._setResult = (A, B) => {
        if (this._state !== $U.PENDING) return;
        if (Ol2.isThenable(B)) {
          B.then(this._resolve, this._reject);
          return
        }
        this._state = A, this._value = B, this._executeHandlers()
      }
    }
    __init4() {
      this._executeHandlers = () => {
        if (this._state === $U.PENDING) return;
        let A = this._handlers.slice();
        this._handlers = [], A.forEach((B) => {
          if (B[0]) return;
          if (this._state === $U.RESOLVED) B[1](this._value);
          if (this._state === $U.REJECTED) B[2](this._value);
          B[0] = !0
        })
      }
    }
  }
  a8A.SyncPromise = cH;
  a8A.rejectedSyncPromise = Pl2;
  a8A.resolvedSyncPromise = Tl2
})
// @from(Start 52208, End 53258)
r8A = z((s8A) => {
  Object.defineProperty(s8A, "__esModule", {
    value: !0
  });
  var yl2 = uU1(),
    NN1 = UN1();

  function kl2(A) {
    let B = [];

    function Q() {
      return A === void 0 || B.length < A
    }

    function I(D) {
      return B.splice(B.indexOf(D), 1)[0]
    }

    function G(D) {
      if (!Q()) return NN1.rejectedSyncPromise(new yl2.SentryError("Not adding Promise because buffer limit was reached."));
      let Y = D();
      if (B.indexOf(Y) === -1) B.push(Y);
      return Y.then(() => I(Y)).then(null, () => I(Y).then(null, () => {})), Y
    }

    function Z(D) {
      return new NN1.SyncPromise((Y, W) => {
        let J = B.length;
        if (!J) return Y(!0);
        let F = setTimeout(() => {
          if (D && D > 0) Y(!1)
        }, D);
        B.forEach((X) => {
          NN1.resolvedSyncPromise(X).then(() => {
            if (!--J) clearTimeout(F), Y(!0)
          }, W)
        })
      })
    }
    return {
      $: B,
      add: G,
      drain: Z
    }
  }
  s8A.makePromiseBuffer = kl2
})
// @from(Start 53264, End 54012)
t8A = z((o8A) => {
  Object.defineProperty(o8A, "__esModule", {
    value: !0
  });

  function fl2(A) {
    let B = {},
      Q = 0;
    while (Q < A.length) {
      let I = A.indexOf("=", Q);
      if (I === -1) break;
      let G = A.indexOf(";", Q);
      if (G === -1) G = A.length;
      else if (G < I) {
        Q = A.lastIndexOf(";", I - 1) + 1;
        continue
      }
      let Z = A.slice(Q, I).trim();
      if (B[Z] === void 0) {
        let D = A.slice(I + 1, G).trim();
        if (D.charCodeAt(0) === 34) D = D.slice(1, -1);
        try {
          B[Z] = D.indexOf("%") !== -1 ? decodeURIComponent(D) : D
        } catch (Y) {
          B[Z] = D
        }
      }
      Q = G + 1
    }
    return B
  }
  o8A.parseCookie = fl2
})
// @from(Start 54018, End 54972)
$N1 = z((e8A) => {
  Object.defineProperty(e8A, "__esModule", {
    value: !0
  });

  function bl2(A) {
    if (!A) return {};
    let B = A.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!B) return {};
    let Q = B[6] || "",
      I = B[8] || "";
    return {
      host: B[4],
      path: B[5],
      protocol: B[2],
      search: Q,
      hash: I,
      relative: B[5] + Q + I
    }
  }

  function gl2(A) {
    return A.split(/[\?#]/, 1)[0]
  }

  function hl2(A) {
    return A.split(/\\?\//).filter((B) => B.length > 0 && B !== ",").length
  }

  function ml2(A) {
    let {
      protocol: B,
      host: Q,
      path: I
    } = A, G = Q && Q.replace(/^.*@/, "[filtered]:[filtered]@").replace(/(:80)$/, "").replace(/(:443)$/, "") || "";
    return `${B?`${B}://`:""}${G}${I}`
  }
  e8A.getNumberOfUrlSegments = hl2;
  e8A.getSanitizedUrlString = ml2;
  e8A.parseUrl = bl2;
  e8A.stripUrlQueryAndFragment = gl2
})
// @from(Start 54978, End 59843)
ZBA = z((GBA) => {
  Object.defineProperty(GBA, "__esModule", {
    value: !0
  });
  var ll2 = t8A(),
    il2 = pH(),
    ABA = bF(),
    nl2 = rV(),
    al2 = Pc(),
    sl2 = $N1(),
    rl2 = {
      ip: !1,
      request: !0,
      transaction: !0,
      user: !0
    },
    ol2 = ["cookies", "data", "headers", "method", "query_string", "url"],
    BBA = ["id", "username", "email"];

  function tl2(A, B, Q) {
    if (!A) return;
    if (!A.metadata.source || A.metadata.source === "url") {
      let [I, G] = U91(B, {
        path: !0,
        method: !0
      });
      A.updateName(I), A.setMetadata({
        source: G
      })
    }
    if (A.setAttribute("url", B.originalUrl || B.url), B.baseUrl) A.setAttribute("baseUrl", B.baseUrl);
    A.setData("query", QBA(B, Q))
  }

  function U91(A, B = {}) {
    let Q = A.method && A.method.toUpperCase(),
      I = "",
      G = "url";
    if (B.customRoute || A.route) I = B.customRoute || `${A.baseUrl||""}${A.route&&A.route.path}`, G = "route";
    else if (A.originalUrl || A.url) I = sl2.stripUrlQueryAndFragment(A.originalUrl || A.url || "");
    let Z = "";
    if (B.method && Q) Z += Q;
    if (B.method && B.path) Z += " ";
    if (B.path && I) Z += I;
    return [Z, G]
  }

  function el2(A, B) {
    switch (B) {
      case "path":
        return U91(A, {
          path: !0
        })[0];
      case "handler":
        return A.route && A.route.stack && A.route.stack[0] && A.route.stack[0].name || "<anonymous>";
      case "methodPath":
      default: {
        let Q = A._reconstructedRoute ? A._reconstructedRoute : void 0;
        return U91(A, {
          path: !0,
          method: !0,
          customRoute: Q
        })[0]
      }
    }
  }

  function Ai2(A, B) {
    let Q = {};
    return (Array.isArray(B) ? B : BBA).forEach((G) => {
      if (A && G in A) Q[G] = A[G]
    }), Q
  }

  function qN1(A, B) {
    let {
      include: Q = ol2,
      deps: I
    } = B || {}, G = {}, Z = A.headers || {}, D = A.method, Y = Z.host || A.hostname || A.host || "<no host>", W = A.protocol === "https" || A.socket && A.socket.encrypted ? "https" : "http", J = A.originalUrl || A.url || "", F = J.startsWith(W) ? J : `${W}://${Y}${J}`;
    return Q.forEach((X) => {
      switch (X) {
        case "headers": {
          if (G.headers = Z, !Q.includes("cookies")) delete G.headers.cookie;
          break
        }
        case "method": {
          G.method = D;
          break
        }
        case "url": {
          G.url = F;
          break
        }
        case "cookies": {
          G.cookies = A.cookies || Z.cookie && ll2.parseCookie(Z.cookie) || {};
          break
        }
        case "query_string": {
          G.query_string = QBA(A, I);
          break
        }
        case "data": {
          if (D === "GET" || D === "HEAD") break;
          if (A.body !== void 0) G.data = ABA.isString(A.body) ? A.body : JSON.stringify(al2.normalize(A.body));
          break
        }
        default:
          if ({}.hasOwnProperty.call(A, X)) G[X] = A[X]
      }
    }), G
  }

  function Bi2(A, B, Q) {
    let I = {
      ...rl2,
      ...Q && Q.include
    };
    if (I.request) {
      let G = Array.isArray(I.request) ? qN1(B, {
        include: I.request,
        deps: Q && Q.deps
      }) : qN1(B, {
        deps: Q && Q.deps
      });
      A.request = {
        ...A.request,
        ...G
      }
    }
    if (I.user) {
      let G = B.user && ABA.isPlainObject(B.user) ? Ai2(B.user, I.user) : {};
      if (Object.keys(G).length) A.user = {
        ...A.user,
        ...G
      }
    }
    if (I.ip) {
      let G = B.ip || B.socket && B.socket.remoteAddress;
      if (G) A.user = {
        ...A.user,
        ip_address: G
      }
    }
    if (I.transaction && !A.transaction) A.transaction = el2(B, I.transaction);
    return A
  }

  function QBA(A, B) {
    let Q = A.originalUrl || A.url || "";
    if (!Q) return;
    if (Q.startsWith("/")) Q = `http://dogs.are.great${Q}`;
    try {
      return A.query || typeof URL !== "undefined" && new URL(Q).search.slice(1) || B && B.url && B.url.parse(Q).query || void 0
    } catch (I) {
      return
    }
  }

  function IBA(A) {
    let B = {};
    try {
      A.forEach((Q, I) => {
        if (typeof Q === "string") B[I] = Q
      })
    } catch (Q) {
      il2.DEBUG_BUILD && nl2.logger.warn("Sentry failed extracting headers from a request object. If you see this, please file an issue.")
    }
    return B
  }

  function Qi2(A) {
    let B = IBA(A.headers);
    return {
      method: A.method,
      url: A.url,
      headers: B
    }
  }
  GBA.DEFAULT_USER_INCLUDES = BBA;
  GBA.addRequestDataToEvent = Bi2;
  GBA.addRequestDataToTransaction = tl2;
  GBA.extractPathForTransaction = U91;
  GBA.extractRequestData = qN1;
  GBA.winterCGHeadersToDict = IBA;
  GBA.winterCGRequestToRequestData = Qi2
})
// @from(Start 59849, End 60237)
JBA = z((WBA) => {
  Object.defineProperty(WBA, "__esModule", {
    value: !0
  });
  var DBA = ["fatal", "error", "warning", "log", "info", "debug"];

  function Fi2(A) {
    return YBA(A)
  }

  function YBA(A) {
    return A === "warn" ? "warning" : DBA.includes(A) ? A : "log"
  }
  WBA.severityFromString = Fi2;
  WBA.severityLevelFromString = YBA;
  WBA.validSeverityLevels = DBA
})
// @from(Start 60243, End 61591)
MN1 = z((KBA) => {
  Object.defineProperty(KBA, "__esModule", {
    value: !0
  });
  var FBA = FZ(),
    XBA = 1000;

  function VBA() {
    return Date.now() / XBA
  }

  function Ki2() {
    let {
      performance: A
    } = FBA.GLOBAL_OBJ;
    if (!A || !A.now) return VBA;
    let B = Date.now() - A.now(),
      Q = A.timeOrigin == null ? B : A.timeOrigin;
    return () => {
      return (Q + A.now()) / XBA
    }
  }
  var CBA = Ki2(),
    Hi2 = CBA;
  KBA._browserPerformanceTimeOriginMode = void 0;
  var zi2 = (() => {
    let {
      performance: A
    } = FBA.GLOBAL_OBJ;
    if (!A || !A.now) {
      KBA._browserPerformanceTimeOriginMode = "none";
      return
    }
    let B = 3600000,
      Q = A.now(),
      I = Date.now(),
      G = A.timeOrigin ? Math.abs(A.timeOrigin + Q - I) : B,
      Z = G < B,
      D = A.timing && A.timing.navigationStart,
      W = typeof D === "number" ? Math.abs(D + Q - I) : B,
      J = W < B;
    if (Z || J)
      if (G <= W) return KBA._browserPerformanceTimeOriginMode = "timeOrigin", A.timeOrigin;
      else return KBA._browserPerformanceTimeOriginMode = "navigationStart", D;
    return KBA._browserPerformanceTimeOriginMode = "dateNow", I
  })();
  KBA.browserPerformanceTimeOrigin = zi2;
  KBA.dateTimestampInSeconds = VBA;
  KBA.timestampInSeconds = CBA;
  KBA.timestampWithMs = Hi2
})
// @from(Start 61597, End 63390)
RN1 = z((EBA) => {
  Object.defineProperty(EBA, "__esModule", {
    value: !0
  });
  var $i2 = pH(),
    qi2 = bF(),
    Mi2 = rV(),
    Li2 = "baggage",
    LN1 = "sentry-",
    zBA = /^sentry-/,
    wBA = 8192;

  function Ri2(A) {
    if (!qi2.isString(A) && !Array.isArray(A)) return;
    let B = {};
    if (Array.isArray(A)) B = A.reduce((I, G) => {
      let Z = HBA(G);
      for (let D of Object.keys(Z)) I[D] = Z[D];
      return I
    }, {});
    else {
      if (!A) return;
      B = HBA(A)
    }
    let Q = Object.entries(B).reduce((I, [G, Z]) => {
      if (G.match(zBA)) {
        let D = G.slice(LN1.length);
        I[D] = Z
      }
      return I
    }, {});
    if (Object.keys(Q).length > 0) return Q;
    else return
  }

  function Oi2(A) {
    if (!A) return;
    let B = Object.entries(A).reduce((Q, [I, G]) => {
      if (G) Q[`${LN1}${I}`] = G;
      return Q
    }, {});
    return Ti2(B)
  }

  function HBA(A) {
    return A.split(",").map((B) => B.split("=").map((Q) => decodeURIComponent(Q.trim()))).reduce((B, [Q, I]) => {
      return B[Q] = I, B
    }, {})
  }

  function Ti2(A) {
    if (Object.keys(A).length === 0) return;
    return Object.entries(A).reduce((B, [Q, I], G) => {
      let Z = `${encodeURIComponent(Q)}=${encodeURIComponent(I)}`,
        D = G === 0 ? Z : `${B},${Z}`;
      if (D.length > wBA) return $i2.DEBUG_BUILD && Mi2.logger.warn(`Not adding key: ${Q} with val: ${I} to baggage header due to exceeding baggage size limits.`), B;
      else return D
    }, "")
  }
  EBA.BAGGAGE_HEADER_NAME = Li2;
  EBA.MAX_BAGGAGE_STRING_LENGTH = wBA;
  EBA.SENTRY_BAGGAGE_KEY_PREFIX = LN1;
  EBA.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = zBA;
  EBA.baggageHeaderToDynamicSamplingContext = Ri2;
  EBA.dynamicSamplingContextToSentryBaggageHeader = Oi2
})
// @from(Start 63396, End 65383)
qBA = z(($BA) => {
  Object.defineProperty($BA, "__esModule", {
    value: !0
  });
  var UBA = RN1(),
    hF = Lc(),
    NBA = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");

  function ON1(A) {
    if (!A) return;
    let B = A.match(NBA);
    if (!B) return;
    let Q;
    if (B[3] === "1") Q = !0;
    else if (B[3] === "0") Q = !1;
    return {
      traceId: B[1],
      parentSampled: Q,
      parentSpanId: B[2]
    }
  }

  function xi2(A, B) {
    let Q = ON1(A),
      I = UBA.baggageHeaderToDynamicSamplingContext(B),
      {
        traceId: G,
        parentSpanId: Z,
        parentSampled: D
      } = Q || {};
    if (!Q) return {
      traceparentData: Q,
      dynamicSamplingContext: void 0,
      propagationContext: {
        traceId: G || hF.uuid4(),
        spanId: hF.uuid4().substring(16)
      }
    };
    else return {
      traceparentData: Q,
      dynamicSamplingContext: I || {},
      propagationContext: {
        traceId: G || hF.uuid4(),
        parentSpanId: Z || hF.uuid4().substring(16),
        spanId: hF.uuid4().substring(16),
        sampled: D,
        dsc: I || {}
      }
    }
  }

  function fi2(A, B) {
    let Q = ON1(A),
      I = UBA.baggageHeaderToDynamicSamplingContext(B),
      {
        traceId: G,
        parentSpanId: Z,
        parentSampled: D
      } = Q || {};
    if (!Q) return {
      traceId: G || hF.uuid4(),
      spanId: hF.uuid4().substring(16)
    };
    else return {
      traceId: G || hF.uuid4(),
      parentSpanId: Z || hF.uuid4().substring(16),
      spanId: hF.uuid4().substring(16),
      sampled: D,
      dsc: I || {}
    }
  }

  function vi2(A = hF.uuid4(), B = hF.uuid4().substring(16), Q) {
    let I = "";
    if (Q !== void 0) I = Q ? "-1" : "-0";
    return `${A}-${B}${I}`
  }
  $BA.TRACEPARENT_REGEXP = NBA;
  $BA.extractTraceparentData = ON1;
  $BA.generateSentryTraceHeader = vi2;
  $BA.propagationContextFromHeaders = fi2;
  $BA.tracingContextFromHeaders = xi2
})
// @from(Start 65389, End 68871)
PN1 = z((RBA) => {
  Object.defineProperty(RBA, "__esModule", {
    value: !0
  });
  var ui2 = dU1(),
    pi2 = Pc(),
    MBA = gF();

  function ci2(A, B = []) {
    return [A, B]
  }

  function li2(A, B) {
    let [Q, I] = A;
    return [Q, [...I, B]]
  }

  function LBA(A, B) {
    let Q = A[1];
    for (let I of Q) {
      let G = I[0].type;
      if (B(I, G)) return !0
    }
    return !1
  }

  function ii2(A, B) {
    return LBA(A, (Q, I) => B.includes(I))
  }

  function TN1(A, B) {
    return (B || new TextEncoder).encode(A)
  }

  function ni2(A, B) {
    let [Q, I] = A, G = JSON.stringify(Q);

    function Z(D) {
      if (typeof G === "string") G = typeof D === "string" ? G + D : [TN1(G, B), D];
      else G.push(typeof D === "string" ? TN1(D, B) : D)
    }
    for (let D of I) {
      let [Y, W] = D;
      if (Z(`
${JSON.stringify(Y)}
`), typeof W === "string" || W instanceof Uint8Array) Z(W);
      else {
        let J;
        try {
          J = JSON.stringify(W)
        } catch (F) {
          J = JSON.stringify(pi2.normalize(W))
        }
        Z(J)
      }
    }
    return typeof G === "string" ? G : ai2(G)
  }

  function ai2(A) {
    let B = A.reduce((G, Z) => G + Z.length, 0),
      Q = new Uint8Array(B),
      I = 0;
    for (let G of A) Q.set(G, I), I += G.length;
    return Q
  }

  function si2(A, B, Q) {
    let I = typeof A === "string" ? B.encode(A) : A;

    function G(W) {
      let J = I.subarray(0, W);
      return I = I.subarray(W + 1), J
    }

    function Z() {
      let W = I.indexOf(10);
      if (W < 0) W = I.length;
      return JSON.parse(Q.decode(G(W)))
    }
    let D = Z(),
      Y = [];
    while (I.length) {
      let W = Z(),
        J = typeof W.length === "number" ? W.length : void 0;
      Y.push([W, J ? G(J) : Z()])
    }
    return [D, Y]
  }

  function ri2(A, B) {
    let Q = typeof A.data === "string" ? TN1(A.data, B) : A.data;
    return [MBA.dropUndefinedKeys({
      type: "attachment",
      length: Q.length,
      filename: A.filename,
      content_type: A.contentType,
      attachment_type: A.attachmentType
    }), Q]
  }
  var oi2 = {
    session: "session",
    sessions: "session",
    attachment: "attachment",
    transaction: "transaction",
    event: "error",
    client_report: "internal",
    user_report: "default",
    profile: "profile",
    replay_event: "replay",
    replay_recording: "replay",
    check_in: "monitor",
    feedback: "feedback",
    span: "span",
    statsd: "metric_bucket"
  };

  function ti2(A) {
    return oi2[A]
  }

  function ei2(A) {
    if (!A || !A.sdk) return;
    let {
      name: B,
      version: Q
    } = A.sdk;
    return {
      name: B,
      version: Q
    }
  }

  function An2(A, B, Q, I) {
    let G = A.sdkProcessingMetadata && A.sdkProcessingMetadata.dynamicSamplingContext;
    return {
      event_id: A.event_id,
      sent_at: new Date().toISOString(),
      ...B && {
        sdk: B
      },
      ...!!Q && I && {
        dsn: ui2.dsnToString(I)
      },
      ...G && {
        trace: MBA.dropUndefinedKeys({
          ...G
        })
      }
    }
  }
  RBA.addItemToEnvelope = li2;
  RBA.createAttachmentEnvelopeItem = ri2;
  RBA.createEnvelope = ci2;
  RBA.createEventEnvelopeHeaders = An2;
  RBA.envelopeContainsItemType = ii2;
  RBA.envelopeItemTypeToDataCategory = ti2;
  RBA.forEachEnvelopeItem = LBA;
  RBA.getSdkMetadataForEnvelopeHeader = ei2;
  RBA.parseEnvelope = si2;
  RBA.serializeEnvelope = ni2
})
// @from(Start 68877, End 69273)
TBA = z((OBA) => {
  Object.defineProperty(OBA, "__esModule", {
    value: !0
  });
  var Xn2 = PN1(),
    Vn2 = MN1();

  function Cn2(A, B, Q) {
    let I = [{
      type: "client_report"
    }, {
      timestamp: Q || Vn2.dateTimestampInSeconds(),
      discarded_events: A
    }];
    return Xn2.createEnvelope(B ? {
      dsn: B
    } : {}, [I])
  }
  OBA.createClientReportEnvelope = Cn2
})
// @from(Start 69279, End 70525)
yBA = z((jBA) => {
  Object.defineProperty(jBA, "__esModule", {
    value: !0
  });
  var PBA = 60000;

  function SBA(A, B = Date.now()) {
    let Q = parseInt(`${A}`, 10);
    if (!isNaN(Q)) return Q * 1000;
    let I = Date.parse(`${A}`);
    if (!isNaN(I)) return I - B;
    return PBA
  }

  function _BA(A, B) {
    return A[B] || A.all || 0
  }

  function Hn2(A, B, Q = Date.now()) {
    return _BA(A, B) > Q
  }

  function zn2(A, {
    statusCode: B,
    headers: Q
  }, I = Date.now()) {
    let G = {
        ...A
      },
      Z = Q && Q["x-sentry-rate-limits"],
      D = Q && Q["retry-after"];
    if (Z)
      for (let Y of Z.trim().split(",")) {
        let [W, J, , , F] = Y.split(":", 5), X = parseInt(W, 10), V = (!isNaN(X) ? X : 60) * 1000;
        if (!J) G.all = I + V;
        else
          for (let C of J.split(";"))
            if (C === "metric_bucket") {
              if (!F || F.split(";").includes("custom")) G[C] = I + V
            } else G[C] = I + V
      } else if (D) G.all = I + SBA(D, I);
      else if (B === 429) G.all = I + 60000;
    return G
  }
  jBA.DEFAULT_RETRY_AFTER = PBA;
  jBA.disabledUntil = _BA;
  jBA.isRateLimited = Hn2;
  jBA.parseRetryAfterHeader = SBA;
  jBA.updateRateLimits = zn2
})
// @from(Start 70531, End 71303)
vBA = z((fBA) => {
  Object.defineProperty(fBA, "__esModule", {
    value: !0
  });

  function kBA(A, B, Q) {
    let I = B.match(/([a-z_]+)\.(.*)/i);
    if (I === null) A[B] = Q;
    else {
      let G = A[I[1]];
      kBA(G, I[2], Q)
    }
  }

  function qn2(A, B, Q = {}) {
    return Array.isArray(B) ? xBA(A, B, Q) : Mn2(A, B, Q)
  }

  function xBA(A, B, Q) {
    let I = B.find((G) => G.name === A.name);
    if (I) {
      for (let [G, Z] of Object.entries(Q)) kBA(I, G, Z);
      return B
    }
    return [...B, A]
  }

  function Mn2(A, B, Q) {
    return (G) => {
      let Z = B(G);
      if (A.allowExclusionByUser) {
        if (!Z.find((Y) => Y.name === A.name)) return Z
      }
      return xBA(A, Z, Q)
    }
  }
  fBA.addOrUpdateIntegration = qn2
})
// @from(Start 71309, End 72051)
gBA = z((bBA) => {
  Object.defineProperty(bBA, "__esModule", {
    value: !0
  });

  function Rn2(A) {
    let B = [],
      Q = {};
    return {
      add(I, G) {
        while (B.length >= A) {
          let Z = B.shift();
          if (Z !== void 0) delete Q[Z]
        }
        if (Q[I]) this.delete(I);
        B.push(I), Q[I] = G
      },
      clear() {
        Q = {}, B = []
      },
      get(I) {
        return Q[I]
      },
      size() {
        return B.length
      },
      delete(I) {
        if (!Q[I]) return !1;
        delete Q[I];
        for (let G = 0; G < B.length; G++)
          if (B[G] === I) {
            B.splice(G, 1);
            break
          } return !0
      }
    }
  }
  bBA.makeFifoCache = Rn2
})
// @from(Start 72057, End 74488)
uBA = z((dBA) => {
  Object.defineProperty(dBA, "__esModule", {
    value: !0
  });
  var SN1 = bF(),
    hBA = Lc(),
    Tn2 = Pc(),
    Pn2 = gF();

  function _N1(A, B) {
    return A(B.stack || "", 1)
  }

  function mBA(A, B) {
    let Q = {
        type: B.name || B.constructor.name,
        value: B.message
      },
      I = _N1(A, B);
    if (I.length) Q.stacktrace = {
      frames: I
    };
    return Q
  }

  function Sn2(A) {
    if ("name" in A && typeof A.name === "string") {
      let B = `'${A.name}' captured as exception`;
      if ("message" in A && typeof A.message === "string") B += ` with message '${A.message}'`;
      return B
    } else if ("message" in A && typeof A.message === "string") return A.message;
    else return `Object captured as exception with keys: ${Pn2.extractExceptionKeysForMessage(A)}`
  }

  function _n2(A, B, Q, I) {
    let G = typeof A === "function" ? A().getClient() : A,
      Z = Q,
      Y = I && I.data && I.data.mechanism || {
        handled: !0,
        type: "generic"
      },
      W;
    if (!SN1.isError(Q)) {
      if (SN1.isPlainObject(Q)) {
        let F = G && G.getOptions().normalizeDepth;
        W = {
          ["__serialized__"]: Tn2.normalizeToSize(Q, F)
        };
        let X = Sn2(Q);
        Z = I && I.syntheticException || new Error(X), Z.message = X
      } else Z = I && I.syntheticException || new Error(Q), Z.message = Q;
      Y.synthetic = !0
    }
    let J = {
      exception: {
        values: [mBA(B, Z)]
      }
    };
    if (W) J.extra = W;
    return hBA.addExceptionTypeValue(J, void 0, void 0), hBA.addExceptionMechanism(J, Y), {
      ...J,
      event_id: I && I.event_id
    }
  }

  function jn2(A, B, Q = "info", I, G) {
    let Z = {
      event_id: I && I.event_id,
      level: Q
    };
    if (G && I && I.syntheticException) {
      let D = _N1(A, I.syntheticException);
      if (D.length) Z.exception = {
        values: [{
          value: B,
          stacktrace: {
            frames: D
          }
        }]
      }
    }
    if (SN1.isParameterizedString(B)) {
      let {
        __sentry_template_string__: D,
        __sentry_template_values__: Y
      } = B;
      return Z.logentry = {
        message: D,
        params: Y
      }, Z
    }
    return Z.message = B, Z
  }
  dBA.eventFromMessage = jn2;
  dBA.eventFromUnknownInput = _n2;
  dBA.exceptionFromError = mBA;
  dBA.parseStackFrames = _N1
})
// @from(Start 74494, End 75458)
cBA = z((pBA) => {
  Object.defineProperty(pBA, "__esModule", {
    value: !0
  });
  var vn2 = gF(),
    bn2 = I91();

  function gn2(A, B, Q, I) {
    let G = A(),
      Z = !1,
      D = !0;
    return setInterval(() => {
      let Y = G.getTimeMs();
      if (Z === !1 && Y > B + Q) {
        if (Z = !0, D) I()
      }
      if (Y < B + Q) Z = !1
    }, 20), {
      poll: () => {
        G.reset()
      },
      enabled: (Y) => {
        D = Y
      }
    }
  }

  function hn2(A, B, Q) {
    let I = B ? B.replace(/^file:\/\//, "") : void 0,
      G = A.location.columnNumber ? A.location.columnNumber + 1 : void 0,
      Z = A.location.lineNumber ? A.location.lineNumber + 1 : void 0;
    return vn2.dropUndefinedKeys({
      filename: I,
      module: Q(I),
      function: A.functionName || "?",
      colno: G,
      lineno: Z,
      in_app: I ? bn2.filenameIsInApp(I) : void 0
    })
  }
  pBA.callFrameToStackFrame = hn2;
  pBA.watchdogTimer = gn2
})
// @from(Start 75464, End 76317)
nBA = z((iBA) => {
  Object.defineProperty(iBA, "__esModule", {
    value: !0
  });
  class lBA {
    constructor(A) {
      this._maxSize = A, this._cache = new Map
    }
    get size() {
      return this._cache.size
    }
    get(A) {
      let B = this._cache.get(A);
      if (B === void 0) return;
      return this._cache.delete(A), this._cache.set(A, B), B
    }
    set(A, B) {
      if (this._cache.size >= this._maxSize) this._cache.delete(this._cache.keys().next().value);
      this._cache.set(A, B)
    }
    remove(A) {
      let B = this._cache.get(A);
      if (B) this._cache.delete(A);
      return B
    }
    clear() {
      this._cache.clear()
    }
    keys() {
      return Array.from(this._cache.keys())
    }
    values() {
      let A = [];
      return this._cache.forEach((B) => A.push(B)), A
    }
  }
  iBA.LRUMap = lBA
})
// @from(Start 76323, End 76497)
jN1 = z((aBA) => {
  Object.defineProperty(aBA, "__esModule", {
    value: !0
  });

  function pn2(A, B) {
    return A != null ? A : B()
  }
  aBA._nullishCoalesce = pn2
})
// @from(Start 76503, End 76713)
rBA = z((sBA) => {
  Object.defineProperty(sBA, "__esModule", {
    value: !0
  });
  var ln2 = jN1();
  async function in2(A, B) {
    return ln2._nullishCoalesce(A, B)
  }
  sBA._asyncNullishCoalesce = in2
})
// @from(Start 76719, End 77272)
yN1 = z((oBA) => {
  Object.defineProperty(oBA, "__esModule", {
    value: !0
  });
  async function an2(A) {
    let B = void 0,
      Q = A[0],
      I = 1;
    while (I < A.length) {
      let G = A[I],
        Z = A[I + 1];
      if (I += 2, (G === "optionalAccess" || G === "optionalCall") && Q == null) return;
      if (G === "access" || G === "optionalAccess") B = Q, Q = await Z(Q);
      else if (G === "call" || G === "optionalCall") Q = await Z((...D) => Q.call(B, ...D)), B = void 0
    }
    return Q
  }
  oBA._asyncOptionalChain = an2
})
// @from(Start 77278, End 77527)
eBA = z((tBA) => {
  Object.defineProperty(tBA, "__esModule", {
    value: !0
  });
  var rn2 = yN1();
  async function on2(A) {
    let B = await rn2._asyncOptionalChain(A);
    return B == null ? !0 : B
  }
  tBA._asyncOptionalChainDelete = on2
})
// @from(Start 77533, End 78064)
kN1 = z((A3A) => {
  Object.defineProperty(A3A, "__esModule", {
    value: !0
  });

  function en2(A) {
    let B = void 0,
      Q = A[0],
      I = 1;
    while (I < A.length) {
      let G = A[I],
        Z = A[I + 1];
      if (I += 2, (G === "optionalAccess" || G === "optionalCall") && Q == null) return;
      if (G === "access" || G === "optionalAccess") B = Q, Q = Z(Q);
      else if (G === "call" || G === "optionalCall") Q = Z((...D) => Q.call(B, ...D)), B = void 0
    }
    return Q
  }
  A3A._optionalChain = en2
})
// @from(Start 78070, End 78298)
Q3A = z((B3A) => {
  Object.defineProperty(B3A, "__esModule", {
    value: !0
  });
  var Ba2 = kN1();

  function Qa2(A) {
    let B = Ba2._optionalChain(A);
    return B == null ? !0 : B
  }
  B3A._optionalChainDelete = Qa2
})
// @from(Start 78304, End 78523)
G3A = z((I3A) => {
  Object.defineProperty(I3A, "__esModule", {
    value: !0
  });

  function Ga2(A) {
    return A.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d")
  }
  I3A.escapeStringForRegex = Ga2
})
// @from(Start 78529, End 87729)
rA = z((hN1) => {
  Object.defineProperty(hN1, "__esModule", {
    value: !0
  });
  var Da2 = _5A(),
    N91 = bU1(),
    xN1 = dU1(),
    Ya2 = uU1(),
    fN1 = FZ(),
    Wa2 = j8A(),
    XZ = bF(),
    Ja2 = v8A(),
    $91 = rV(),
    Fa2 = zN1(),
    tq = Lc(),
    vN1 = HN1(),
    q91 = Pc(),
    qU = gF(),
    $P = n8A(),
    Xa2 = r8A(),
    qP = ZBA(),
    bN1 = JBA(),
    _c = G91(),
    jc = qc(),
    eq = BN1(),
    gN1 = UN1(),
    yc = MN1(),
    kc = qBA(),
    Z3A = KN1(),
    lH = PN1(),
    Va2 = TBA(),
    xc = yBA(),
    Yx = RN1(),
    M91 = $N1(),
    Ca2 = vBA(),
    Ka2 = gBA(),
    L91 = uBA(),
    D3A = cBA(),
    Ha2 = nBA(),
    za2 = rBA(),
    wa2 = yN1(),
    Ea2 = eBA(),
    Ua2 = jN1(),
    Na2 = kN1(),
    $a2 = Q3A(),
    qa2 = nU1(),
    Ma2 = tU1(),
    Y3A = VN1(),
    La2 = IN1(),
    Ra2 = XN1(),
    Oa2 = DN1(),
    Ta2 = JN1(),
    Pa2 = NU(),
    Sa2 = I91(),
    _a2 = G3A(),
    ja2 = FN1();
  hN1.applyAggregateErrorsToEvent = Da2.applyAggregateErrorsToEvent;
  hN1.getComponentName = N91.getComponentName;
  hN1.getDomElement = N91.getDomElement;
  hN1.getLocationHref = N91.getLocationHref;
  hN1.htmlTreeAsString = N91.htmlTreeAsString;
  hN1.dsnFromString = xN1.dsnFromString;
  hN1.dsnToString = xN1.dsnToString;
  hN1.makeDsn = xN1.makeDsn;
  hN1.SentryError = Ya2.SentryError;
  hN1.GLOBAL_OBJ = fN1.GLOBAL_OBJ;
  hN1.getGlobalObject = fN1.getGlobalObject;
  hN1.getGlobalSingleton = fN1.getGlobalSingleton;
  hN1.addInstrumentationHandler = Wa2.addInstrumentationHandler;
  hN1.isDOMError = XZ.isDOMError;
  hN1.isDOMException = XZ.isDOMException;
  hN1.isElement = XZ.isElement;
  hN1.isError = XZ.isError;
  hN1.isErrorEvent = XZ.isErrorEvent;
  hN1.isEvent = XZ.isEvent;
  hN1.isInstanceOf = XZ.isInstanceOf;
  hN1.isNaN = XZ.isNaN;
  hN1.isParameterizedString = XZ.isParameterizedString;
  hN1.isPlainObject = XZ.isPlainObject;
  hN1.isPrimitive = XZ.isPrimitive;
  hN1.isRegExp = XZ.isRegExp;
  hN1.isString = XZ.isString;
  hN1.isSyntheticEvent = XZ.isSyntheticEvent;
  hN1.isThenable = XZ.isThenable;
  hN1.isVueViewModel = XZ.isVueViewModel;
  hN1.isBrowser = Ja2.isBrowser;
  hN1.CONSOLE_LEVELS = $91.CONSOLE_LEVELS;
  hN1.consoleSandbox = $91.consoleSandbox;
  hN1.logger = $91.logger;
  hN1.originalConsoleMethods = $91.originalConsoleMethods;
  hN1.memoBuilder = Fa2.memoBuilder;
  hN1.addContextToFrame = tq.addContextToFrame;
  hN1.addExceptionMechanism = tq.addExceptionMechanism;
  hN1.addExceptionTypeValue = tq.addExceptionTypeValue;
  hN1.arrayify = tq.arrayify;
  hN1.checkOrSetAlreadyCaught = tq.checkOrSetAlreadyCaught;
  hN1.getEventDescription = tq.getEventDescription;
  hN1.parseSemver = tq.parseSemver;
  hN1.uuid4 = tq.uuid4;
  hN1.dynamicRequire = vN1.dynamicRequire;
  hN1.isNodeEnv = vN1.isNodeEnv;
  hN1.loadModule = vN1.loadModule;
  hN1.normalize = q91.normalize;
  hN1.normalizeToSize = q91.normalizeToSize;
  hN1.normalizeUrlToBase = q91.normalizeUrlToBase;
  hN1.walk = q91.walk;
  hN1.addNonEnumerableProperty = qU.addNonEnumerableProperty;
  hN1.convertToPlainObject = qU.convertToPlainObject;
  hN1.dropUndefinedKeys = qU.dropUndefinedKeys;
  hN1.extractExceptionKeysForMessage = qU.extractExceptionKeysForMessage;
  hN1.fill = qU.fill;
  hN1.getOriginalFunction = qU.getOriginalFunction;
  hN1.markFunctionWrapped = qU.markFunctionWrapped;
  hN1.objectify = qU.objectify;
  hN1.urlEncode = qU.urlEncode;
  hN1.basename = $P.basename;
  hN1.dirname = $P.dirname;
  hN1.isAbsolute = $P.isAbsolute;
  hN1.join = $P.join;
  hN1.normalizePath = $P.normalizePath;
  hN1.relative = $P.relative;
  hN1.resolve = $P.resolve;
  hN1.makePromiseBuffer = Xa2.makePromiseBuffer;
  hN1.DEFAULT_USER_INCLUDES = qP.DEFAULT_USER_INCLUDES;
  hN1.addRequestDataToEvent = qP.addRequestDataToEvent;
  hN1.addRequestDataToTransaction = qP.addRequestDataToTransaction;
  hN1.extractPathForTransaction = qP.extractPathForTransaction;
  hN1.extractRequestData = qP.extractRequestData;
  hN1.winterCGHeadersToDict = qP.winterCGHeadersToDict;
  hN1.winterCGRequestToRequestData = qP.winterCGRequestToRequestData;
  hN1.severityFromString = bN1.severityFromString;
  hN1.severityLevelFromString = bN1.severityLevelFromString;
  hN1.validSeverityLevels = bN1.validSeverityLevels;
  hN1.createStackParser = _c.createStackParser;
  hN1.getFunctionName = _c.getFunctionName;
  hN1.nodeStackLineParser = _c.nodeStackLineParser;
  hN1.stackParserFromStackParserOptions = _c.stackParserFromStackParserOptions;
  hN1.stripSentryFramesAndReverse = _c.stripSentryFramesAndReverse;
  hN1.isMatchingPattern = jc.isMatchingPattern;
  hN1.safeJoin = jc.safeJoin;
  hN1.snipLine = jc.snipLine;
  hN1.stringMatchesSomePattern = jc.stringMatchesSomePattern;
  hN1.truncate = jc.truncate;
  hN1.isNativeFetch = eq.isNativeFetch;
  hN1.supportsDOMError = eq.supportsDOMError;
  hN1.supportsDOMException = eq.supportsDOMException;
  hN1.supportsErrorEvent = eq.supportsErrorEvent;
  hN1.supportsFetch = eq.supportsFetch;
  hN1.supportsNativeFetch = eq.supportsNativeFetch;
  hN1.supportsReferrerPolicy = eq.supportsReferrerPolicy;
  hN1.supportsReportingObserver = eq.supportsReportingObserver;
  hN1.SyncPromise = gN1.SyncPromise;
  hN1.rejectedSyncPromise = gN1.rejectedSyncPromise;
  hN1.resolvedSyncPromise = gN1.resolvedSyncPromise;
  Object.defineProperty(hN1, "_browserPerformanceTimeOriginMode", {
    enumerable: !0,
    get: () => yc._browserPerformanceTimeOriginMode
  });
  hN1.browserPerformanceTimeOrigin = yc.browserPerformanceTimeOrigin;
  hN1.dateTimestampInSeconds = yc.dateTimestampInSeconds;
  hN1.timestampInSeconds = yc.timestampInSeconds;
  hN1.timestampWithMs = yc.timestampWithMs;
  hN1.TRACEPARENT_REGEXP = kc.TRACEPARENT_REGEXP;
  hN1.extractTraceparentData = kc.extractTraceparentData;
  hN1.generateSentryTraceHeader = kc.generateSentryTraceHeader;
  hN1.propagationContextFromHeaders = kc.propagationContextFromHeaders;
  hN1.tracingContextFromHeaders = kc.tracingContextFromHeaders;
  hN1.getSDKSource = Z3A.getSDKSource;
  hN1.isBrowserBundle = Z3A.isBrowserBundle;
  hN1.addItemToEnvelope = lH.addItemToEnvelope;
  hN1.createAttachmentEnvelopeItem = lH.createAttachmentEnvelopeItem;
  hN1.createEnvelope = lH.createEnvelope;
  hN1.createEventEnvelopeHeaders = lH.createEventEnvelopeHeaders;
  hN1.envelopeContainsItemType = lH.envelopeContainsItemType;
  hN1.envelopeItemTypeToDataCategory = lH.envelopeItemTypeToDataCategory;
  hN1.forEachEnvelopeItem = lH.forEachEnvelopeItem;
  hN1.getSdkMetadataForEnvelopeHeader = lH.getSdkMetadataForEnvelopeHeader;
  hN1.parseEnvelope = lH.parseEnvelope;
  hN1.serializeEnvelope = lH.serializeEnvelope;
  hN1.createClientReportEnvelope = Va2.createClientReportEnvelope;
  hN1.DEFAULT_RETRY_AFTER = xc.DEFAULT_RETRY_AFTER;
  hN1.disabledUntil = xc.disabledUntil;
  hN1.isRateLimited = xc.isRateLimited;
  hN1.parseRetryAfterHeader = xc.parseRetryAfterHeader;
  hN1.updateRateLimits = xc.updateRateLimits;
  hN1.BAGGAGE_HEADER_NAME = Yx.BAGGAGE_HEADER_NAME;
  hN1.MAX_BAGGAGE_STRING_LENGTH = Yx.MAX_BAGGAGE_STRING_LENGTH;
  hN1.SENTRY_BAGGAGE_KEY_PREFIX = Yx.SENTRY_BAGGAGE_KEY_PREFIX;
  hN1.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = Yx.SENTRY_BAGGAGE_KEY_PREFIX_REGEX;
  hN1.baggageHeaderToDynamicSamplingContext = Yx.baggageHeaderToDynamicSamplingContext;
  hN1.dynamicSamplingContextToSentryBaggageHeader = Yx.dynamicSamplingContextToSentryBaggageHeader;
  hN1.getNumberOfUrlSegments = M91.getNumberOfUrlSegments;
  hN1.getSanitizedUrlString = M91.getSanitizedUrlString;
  hN1.parseUrl = M91.parseUrl;
  hN1.stripUrlQueryAndFragment = M91.stripUrlQueryAndFragment;
  hN1.addOrUpdateIntegration = Ca2.addOrUpdateIntegration;
  hN1.makeFifoCache = Ka2.makeFifoCache;
  hN1.eventFromMessage = L91.eventFromMessage;
  hN1.eventFromUnknownInput = L91.eventFromUnknownInput;
  hN1.exceptionFromError = L91.exceptionFromError;
  hN1.parseStackFrames = L91.parseStackFrames;
  hN1.callFrameToStackFrame = D3A.callFrameToStackFrame;
  hN1.watchdogTimer = D3A.watchdogTimer;
  hN1.LRUMap = Ha2.LRUMap;
  hN1._asyncNullishCoalesce = za2._asyncNullishCoalesce;
  hN1._asyncOptionalChain = wa2._asyncOptionalChain;
  hN1._asyncOptionalChainDelete = Ea2._asyncOptionalChainDelete;
  hN1._nullishCoalesce = Ua2._nullishCoalesce;
  hN1._optionalChain = Na2._optionalChain;
  hN1._optionalChainDelete = $a2._optionalChainDelete;
  hN1.addConsoleInstrumentationHandler = qa2.addConsoleInstrumentationHandler;
  hN1.addClickKeypressInstrumentationHandler = Ma2.addClickKeypressInstrumentationHandler;
  hN1.SENTRY_XHR_DATA_KEY = Y3A.SENTRY_XHR_DATA_KEY;
  hN1.addXhrInstrumentationHandler = Y3A.addXhrInstrumentationHandler;
  hN1.addFetchInstrumentationHandler = La2.addFetchInstrumentationHandler;
  hN1.addHistoryInstrumentationHandler = Ra2.addHistoryInstrumentationHandler;
  hN1.addGlobalErrorInstrumentationHandler = Oa2.addGlobalErrorInstrumentationHandler;
  hN1.addGlobalUnhandledRejectionInstrumentationHandler = Ta2.addGlobalUnhandledRejectionInstrumentationHandler;
  hN1.resetInstrumentationHandlers = Pa2.resetInstrumentationHandlers;
  hN1.filenameIsInApp = Sa2.filenameIsInApp;
  hN1.escapeStringForRegex = _a2.escapeStringForRegex;
  hN1.supportsHistory = ja2.supportsHistory
})
// @from(Start 87735, End 87917)
B7 = z((W3A) => {
  Object.defineProperty(W3A, "__esModule", {
    value: !0
  });
  var yo2 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
  W3A.DEBUG_BUILD = yo2
})
// @from(Start 87923, End 88066)
Wx = z((J3A) => {
  Object.defineProperty(J3A, "__esModule", {
    value: !0
  });
  var xo2 = "production";
  J3A.DEFAULT_ENVIRONMENT = xo2
})
// @from(Start 88072, End 88914)
fc = z((X3A) => {
  Object.defineProperty(X3A, "__esModule", {
    value: !0
  });
  var R91 = rA(),
    vo2 = B7();

  function F3A() {
    return R91.getGlobalSingleton("globalEventProcessors", () => [])
  }

  function bo2(A) {
    F3A().push(A)
  }

  function mN1(A, B, Q, I = 0) {
    return new R91.SyncPromise((G, Z) => {
      let D = A[I];
      if (B === null || typeof D !== "function") G(B);
      else {
        let Y = D({
          ...B
        }, Q);
        if (vo2.DEBUG_BUILD && D.id && Y === null && R91.logger.log(`Event processor "${D.id}" dropped event`), R91.isThenable(Y)) Y.then((W) => mN1(A, W, Q, I + 1).then(G)).then(null, Z);
        else mN1(A, Y, Q, I + 1).then(G).then(null, Z)
      }
    })
  }
  X3A.addGlobalEventProcessor = bo2;
  X3A.getGlobalEventProcessors = F3A;
  X3A.notifyEventProcessors = mN1
})
// @from(Start 88920, End 91331)
Jx = z((V3A) => {
  Object.defineProperty(V3A, "__esModule", {
    value: !0
  });
  var vc = rA();

  function do2(A) {
    let B = vc.timestampInSeconds(),
      Q = {
        sid: vc.uuid4(),
        init: !0,
        timestamp: B,
        started: B,
        duration: 0,
        status: "ok",
        errors: 0,
        ignoreDuration: !1,
        toJSON: () => po2(Q)
      };
    if (A) dN1(Q, A);
    return Q
  }

  function dN1(A, B = {}) {
    if (B.user) {
      if (!A.ipAddress && B.user.ip_address) A.ipAddress = B.user.ip_address;
      if (!A.did && !B.did) A.did = B.user.id || B.user.email || B.user.username
    }
    if (A.timestamp = B.timestamp || vc.timestampInSeconds(), B.abnormal_mechanism) A.abnormal_mechanism = B.abnormal_mechanism;
    if (B.ignoreDuration) A.ignoreDuration = B.ignoreDuration;
    if (B.sid) A.sid = B.sid.length === 32 ? B.sid : vc.uuid4();
    if (B.init !== void 0) A.init = B.init;
    if (!A.did && B.did) A.did = `${B.did}`;
    if (typeof B.started === "number") A.started = B.started;
    if (A.ignoreDuration) A.duration = void 0;
    else if (typeof B.duration === "number") A.duration = B.duration;
    else {
      let Q = A.timestamp - A.started;
      A.duration = Q >= 0 ? Q : 0
    }
    if (B.release) A.release = B.release;
    if (B.environment) A.environment = B.environment;
    if (!A.ipAddress && B.ipAddress) A.ipAddress = B.ipAddress;
    if (!A.userAgent && B.userAgent) A.userAgent = B.userAgent;
    if (typeof B.errors === "number") A.errors = B.errors;
    if (B.status) A.status = B.status
  }

  function uo2(A, B) {
    let Q = {};
    if (B) Q = {
      status: B
    };
    else if (A.status === "ok") Q = {
      status: "exited"
    };
    dN1(A, Q)
  }

  function po2(A) {
    return vc.dropUndefinedKeys({
      sid: `${A.sid}`,
      init: A.init,
      started: new Date(A.started * 1000).toISOString(),
      timestamp: new Date(A.timestamp * 1000).toISOString(),
      status: A.status,
      errors: A.errors,
      did: typeof A.did === "number" || typeof A.did === "string" ? `${A.did}` : void 0,
      duration: A.duration,
      abnormal_mechanism: A.abnormal_mechanism,
      attrs: {
        release: A.release,
        environment: A.environment,
        ip_address: A.ipAddress,
        user_agent: A.userAgent
      }
    })
  }
  V3A.closeSession = uo2;
  V3A.makeSession = do2;
  V3A.updateSession = dN1
})
// @from(Start 91337, End 92820)
NY = z((w3A) => {
  Object.defineProperty(w3A, "__esModule", {
    value: !0
  });
  var uN1 = rA(),
    no2 = 0,
    K3A = 1;

  function ao2(A) {
    let {
      spanId: B,
      traceId: Q
    } = A.spanContext(), {
      data: I,
      op: G,
      parent_span_id: Z,
      status: D,
      tags: Y,
      origin: W
    } = H3A(A);
    return uN1.dropUndefinedKeys({
      data: I,
      op: G,
      parent_span_id: Z,
      span_id: B,
      status: D,
      tags: Y,
      trace_id: Q,
      origin: W
    })
  }

  function so2(A) {
    let {
      traceId: B,
      spanId: Q
    } = A.spanContext(), I = z3A(A);
    return uN1.generateSentryTraceHeader(B, Q, I)
  }

  function ro2(A) {
    if (typeof A === "number") return C3A(A);
    if (Array.isArray(A)) return A[0] + A[1] / 1e9;
    if (A instanceof Date) return C3A(A.getTime());
    return uN1.timestampInSeconds()
  }

  function C3A(A) {
    return A > 9999999999 ? A / 1000 : A
  }

  function H3A(A) {
    if (oo2(A)) return A.getSpanJSON();
    if (typeof A.toJSON === "function") return A.toJSON();
    return {}
  }

  function oo2(A) {
    return typeof A.getSpanJSON === "function"
  }

  function z3A(A) {
    let {
      traceFlags: B
    } = A.spanContext();
    return Boolean(B & K3A)
  }
  w3A.TRACE_FLAG_NONE = no2;
  w3A.TRACE_FLAG_SAMPLED = K3A;
  w3A.spanIsSampled = z3A;
  w3A.spanTimeInputToSeconds = ro2;
  w3A.spanToJSON = H3A;
  w3A.spanToTraceContext = ao2;
  w3A.spanToTraceHeader = so2
})
// @from(Start 92826, End 97839)
O91 = z((q3A) => {
  Object.defineProperty(q3A, "__esModule", {
    value: !0
  });
  var tW = rA(),
    Zt2 = Wx(),
    E3A = fc(),
    cN1 = P91(),
    pN1 = T91(),
    Dt2 = NY();

  function Yt2(A, B, Q, I, G, Z) {
    let {
      normalizeDepth: D = 3,
      normalizeMaxBreadth: Y = 1000
    } = A, W = {
      ...B,
      event_id: B.event_id || Q.event_id || tW.uuid4(),
      timestamp: B.timestamp || tW.dateTimestampInSeconds()
    }, J = Q.integrations || A.integrations.map((N) => N.name);
    if (Wt2(W, A), Jt2(W, J), B.type === void 0) N3A(W, A.stackParser);
    let F = Xt2(I, Q.captureContext);
    if (Q.mechanism) tW.addExceptionMechanism(W, Q.mechanism);
    let X = G && G.getEventProcessors ? G.getEventProcessors() : [],
      V = cN1.getGlobalScope().getScopeData();
    if (Z) {
      let N = Z.getScopeData();
      pN1.mergeScopeData(V, N)
    }
    if (F) {
      let N = F.getScopeData();
      pN1.mergeScopeData(V, N)
    }
    let C = [...Q.attachments || [], ...V.attachments];
    if (C.length) Q.attachments = C;
    pN1.applyScopeDataToEvent(W, V);
    let K = [...X, ...E3A.getGlobalEventProcessors(), ...V.eventProcessors];
    return E3A.notifyEventProcessors(K, W, Q).then((N) => {
      if (N) $3A(N);
      if (typeof D === "number" && D > 0) return Ft2(N, D, Y);
      return N
    })
  }

  function Wt2(A, B) {
    let {
      environment: Q,
      release: I,
      dist: G,
      maxValueLength: Z = 250
    } = B;
    if (!("environment" in A)) A.environment = "environment" in B ? Q : Zt2.DEFAULT_ENVIRONMENT;
    if (A.release === void 0 && I !== void 0) A.release = I;
    if (A.dist === void 0 && G !== void 0) A.dist = G;
    if (A.message) A.message = tW.truncate(A.message, Z);
    let D = A.exception && A.exception.values && A.exception.values[0];
    if (D && D.value) D.value = tW.truncate(D.value, Z);
    let Y = A.request;
    if (Y && Y.url) Y.url = tW.truncate(Y.url, Z)
  }
  var U3A = new WeakMap;

  function N3A(A, B) {
    let Q = tW.GLOBAL_OBJ._sentryDebugIds;
    if (!Q) return;
    let I, G = U3A.get(B);
    if (G) I = G;
    else I = new Map, U3A.set(B, I);
    let Z = Object.keys(Q).reduce((D, Y) => {
      let W, J = I.get(Y);
      if (J) W = J;
      else W = B(Y), I.set(Y, W);
      for (let F = W.length - 1; F >= 0; F--) {
        let X = W[F];
        if (X.filename) {
          D[X.filename] = Q[Y];
          break
        }
      }
      return D
    }, {});
    try {
      A.exception.values.forEach((D) => {
        D.stacktrace.frames.forEach((Y) => {
          if (Y.filename) Y.debug_id = Z[Y.filename]
        })
      })
    } catch (D) {}
  }

  function $3A(A) {
    let B = {};
    try {
      A.exception.values.forEach((I) => {
        I.stacktrace.frames.forEach((G) => {
          if (G.debug_id) {
            if (G.abs_path) B[G.abs_path] = G.debug_id;
            else if (G.filename) B[G.filename] = G.debug_id;
            delete G.debug_id
          }
        })
      })
    } catch (I) {}
    if (Object.keys(B).length === 0) return;
    A.debug_meta = A.debug_meta || {}, A.debug_meta.images = A.debug_meta.images || [];
    let Q = A.debug_meta.images;
    Object.keys(B).forEach((I) => {
      Q.push({
        type: "sourcemap",
        code_file: I,
        debug_id: B[I]
      })
    })
  }

  function Jt2(A, B) {
    if (B.length > 0) A.sdk = A.sdk || {}, A.sdk.integrations = [...A.sdk.integrations || [], ...B]
  }

  function Ft2(A, B, Q) {
    if (!A) return null;
    let I = {
      ...A,
      ...A.breadcrumbs && {
        breadcrumbs: A.breadcrumbs.map((G) => ({
          ...G,
          ...G.data && {
            data: tW.normalize(G.data, B, Q)
          }
        }))
      },
      ...A.user && {
        user: tW.normalize(A.user, B, Q)
      },
      ...A.contexts && {
        contexts: tW.normalize(A.contexts, B, Q)
      },
      ...A.extra && {
        extra: tW.normalize(A.extra, B, Q)
      }
    };
    if (A.contexts && A.contexts.trace && I.contexts) {
      if (I.contexts.trace = A.contexts.trace, A.contexts.trace.data) I.contexts.trace.data = tW.normalize(A.contexts.trace.data, B, Q)
    }
    if (A.spans) I.spans = A.spans.map((G) => {
      let Z = Dt2.spanToJSON(G).data;
      if (Z) G.data = tW.normalize(Z, B, Q);
      return G
    });
    return I
  }

  function Xt2(A, B) {
    if (!B) return A;
    let Q = A ? A.clone() : new cN1.Scope;
    return Q.update(B), Q
  }

  function Vt2(A) {
    if (!A) return;
    if (Ct2(A)) return {
      captureContext: A
    };
    if (Ht2(A)) return {
      captureContext: A
    };
    return A
  }

  function Ct2(A) {
    return A instanceof cN1.Scope || typeof A === "function"
  }
  var Kt2 = ["user", "level", "extra", "contexts", "tags", "fingerprint", "requestSession", "propagationContext"];

  function Ht2(A) {
    return Object.keys(A).some((B) => Kt2.includes(B))
  }
  q3A.applyDebugIds = N3A;
  q3A.applyDebugMeta = $3A;
  q3A.parseEventHintOrCaptureContext = Vt2;
  q3A.prepareEvent = Yt2
})