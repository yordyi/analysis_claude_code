
// @from(Start 4024177, End 4025992)
SZ0 = z((OW8, PZ0) => {
  var TZ0 = Z1("child_process"),
    LZ0 = TZ0.spawn,
    Ef4 = TZ0.exec;
  PZ0.exports = function(A, B, Q) {
    if (typeof B === "function" && Q === void 0) Q = B, B = void 0;
    if (A = parseInt(A), Number.isNaN(A))
      if (Q) return Q(new Error("pid must be a number"));
      else throw new Error("pid must be a number");
    var I = {},
      G = {};
    switch (I[A] = [], G[A] = 1, process.platform) {
      case "win32":
        Ef4("taskkill /pid " + A + " /T /F", Q);
        break;
      case "darwin":
        if1(A, I, G, function(Z) {
          return LZ0("pgrep", ["-P", Z])
        }, function() {
          RZ0(I, B, Q)
        });
        break;
      default:
        if1(A, I, G, function(Z) {
          return LZ0("ps", ["-o", "pid", "--no-headers", "--ppid", Z])
        }, function() {
          RZ0(I, B, Q)
        });
        break
    }
  };

  function RZ0(A, B, Q) {
    var I = {};
    try {
      Object.keys(A).forEach(function(G) {
        if (A[G].forEach(function(Z) {
            if (!I[Z]) OZ0(Z, B), I[Z] = 1
          }), !I[G]) OZ0(G, B), I[G] = 1
      })
    } catch (G) {
      if (Q) return Q(G);
      else throw G
    }
    if (Q) return Q()
  }

  function OZ0(A, B) {
    try {
      process.kill(parseInt(A, 10), B)
    } catch (Q) {
      if (Q.code !== "ESRCH") throw Q
    }
  }

  function if1(A, B, Q, I, G) {
    var Z = I(A),
      D = "";
    Z.stdout.on("data", function(J) {
      var J = J.toString("ascii");
      D += J
    });
    var Y = function(W) {
      if (delete Q[A], W != 0) {
        if (Object.keys(Q).length == 0) G();
        return
      }
      D.match(/\d+/g).forEach(function(J) {
        J = parseInt(J, 10), B[A].push(J), B[J] = [], Q[J] = 1, if1(J, B, Q, I, G)
      })
    };
    Z.on("close", Y)
  }
})
// @from(Start 4025998, End 4028248)
UD0 = z((bJ8, ED0) => {
  var Wv4 = function A(B) {
    return Jv4(B) && !Fv4(B)
  };

  function Jv4(A) {
    return !!A && typeof A === "object"
  }

  function Fv4(A) {
    var B = Object.prototype.toString.call(A);
    return B === "[object RegExp]" || B === "[object Date]" || Cv4(A)
  }
  var Xv4 = typeof Symbol === "function" && Symbol.for,
    Vv4 = Xv4 ? Symbol.for("react.element") : 60103;

  function Cv4(A) {
    return A.$$typeof === Vv4
  }

  function Kv4(A) {
    return Array.isArray(A) ? [] : {}
  }

  function Is(A, B) {
    return B.clone !== !1 && B.isMergeableObject(A) ? $g(Kv4(A), A, B) : A
  }

  function Hv4(A, B, Q) {
    return A.concat(B).map(function(I) {
      return Is(I, Q)
    })
  }

  function zv4(A, B) {
    if (!B.customMerge) return $g;
    var Q = B.customMerge(A);
    return typeof Q === "function" ? Q : $g
  }

  function wv4(A) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(A).filter(function(B) {
      return Object.propertyIsEnumerable.call(A, B)
    }) : []
  }

  function zD0(A) {
    return Object.keys(A).concat(wv4(A))
  }

  function wD0(A, B) {
    try {
      return B in A
    } catch (Q) {
      return !1
    }
  }

  function Ev4(A, B) {
    return wD0(A, B) && !(Object.hasOwnProperty.call(A, B) && Object.propertyIsEnumerable.call(A, B))
  }

  function Uv4(A, B, Q) {
    var I = {};
    if (Q.isMergeableObject(A)) zD0(A).forEach(function(G) {
      I[G] = Is(A[G], Q)
    });
    return zD0(B).forEach(function(G) {
      if (Ev4(A, G)) return;
      if (wD0(A, G) && Q.isMergeableObject(B[G])) I[G] = zv4(G, Q)(A[G], B[G], Q);
      else I[G] = Is(B[G], Q)
    }), I
  }

  function $g(A, B, Q) {
    Q = Q || {}, Q.arrayMerge = Q.arrayMerge || Hv4, Q.isMergeableObject = Q.isMergeableObject || Wv4, Q.cloneUnlessOtherwiseSpecified = Is;
    var I = Array.isArray(B),
      G = Array.isArray(A),
      Z = I === G;
    if (!Z) return Is(B, Q);
    else if (I) return Q.arrayMerge(A, B, Q);
    else return Uv4(A, B, Q)
  }
  $g.all = function A(B, Q) {
    if (!Array.isArray(B)) throw new Error("first argument should be an array");
    return B.reduce(function(I, G) {
      return $g(I, G, Q)
    }, {})
  };
  var Nv4 = $g;
  ED0.exports = Nv4
})
// @from(Start 4028254, End 4028441)
GY0 = z((QY0) => {
  Object.defineProperty(QY0, "__esModule", {
    value: !0
  });
  QY0._globalThis = void 0;
  QY0._globalThis = typeof globalThis === "object" ? globalThis : global
})
// @from(Start 4028447, End 4029045)
ZY0 = z((M_) => {
  var Zb4 = M_ && M_.__createBinding || (Object.create ? function(A, B, Q, I) {
      if (I === void 0) I = Q;
      Object.defineProperty(A, I, {
        enumerable: !0,
        get: function() {
          return B[Q]
        }
      })
    } : function(A, B, Q, I) {
      if (I === void 0) I = Q;
      A[I] = B[Q]
    }),
    Db4 = M_ && M_.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) Zb4(B, A, Q)
    };
  Object.defineProperty(M_, "__esModule", {
    value: !0
  });
  Db4(GY0(), M_)
})
// @from(Start 4029051, End 4029649)
DY0 = z((L_) => {
  var Yb4 = L_ && L_.__createBinding || (Object.create ? function(A, B, Q, I) {
      if (I === void 0) I = Q;
      Object.defineProperty(A, I, {
        enumerable: !0,
        get: function() {
          return B[Q]
        }
      })
    } : function(A, B, Q, I) {
      if (I === void 0) I = Q;
      A[I] = B[Q]
    }),
    Wb4 = L_ && L_.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) Yb4(B, A, Q)
    };
  Object.defineProperty(L_, "__esModule", {
    value: !0
  });
  Wb4(ZY0(), L_)
})
// @from(Start 4029655, End 4029789)
Kv1 = z((YY0) => {
  Object.defineProperty(YY0, "__esModule", {
    value: !0
  });
  YY0.VERSION = void 0;
  YY0.VERSION = "1.9.0"
})
// @from(Start 4029795, End 4031030)
CY0 = z((XY0) => {
  Object.defineProperty(XY0, "__esModule", {
    value: !0
  });
  XY0.isCompatible = XY0._makeCompatibilityCheck = void 0;
  var Jb4 = Kv1(),
    JY0 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;

  function FY0(A) {
    let B = new Set([A]),
      Q = new Set,
      I = A.match(JY0);
    if (!I) return () => !1;
    let G = {
      major: +I[1],
      minor: +I[2],
      patch: +I[3],
      prerelease: I[4]
    };
    if (G.prerelease != null) return function Y(W) {
      return W === A
    };

    function Z(Y) {
      return Q.add(Y), !1
    }

    function D(Y) {
      return B.add(Y), !0
    }
    return function Y(W) {
      if (B.has(W)) return !0;
      if (Q.has(W)) return !1;
      let J = W.match(JY0);
      if (!J) return Z(W);
      let F = {
        major: +J[1],
        minor: +J[2],
        patch: +J[3],
        prerelease: J[4]
      };
      if (F.prerelease != null) return Z(W);
      if (G.major !== F.major) return Z(W);
      if (G.major === 0) {
        if (G.minor === F.minor && G.patch <= F.patch) return D(W);
        return Z(W)
      }
      if (G.minor <= F.minor) return D(W);
      return Z(W)
    }
  }
  XY0._makeCompatibilityCheck = FY0;
  XY0.isCompatible = FY0(Jb4.VERSION)
})
// @from(Start 4031036, End 4032472)
R_ = z((KY0) => {
  Object.defineProperty(KY0, "__esModule", {
    value: !0
  });
  KY0.unregisterGlobal = KY0.getGlobal = KY0.registerGlobal = void 0;
  var Xb4 = DY0(),
    Rg = Kv1(),
    Vb4 = CY0(),
    Cb4 = Rg.VERSION.split(".")[0],
    Js = Symbol.for(`opentelemetry.js.api.${Cb4}`),
    Fs = Xb4._globalThis;

  function Kb4(A, B, Q, I = !1) {
    var G;
    let Z = Fs[Js] = (G = Fs[Js]) !== null && G !== void 0 ? G : {
      version: Rg.VERSION
    };
    if (!I && Z[A]) {
      let D = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${A}`);
      return Q.error(D.stack || D.message), !1
    }
    if (Z.version !== Rg.VERSION) {
      let D = new Error(`@opentelemetry/api: Registration of version v${Z.version} for ${A} does not match previously registered API v${Rg.VERSION}`);
      return Q.error(D.stack || D.message), !1
    }
    return Z[A] = B, Q.debug(`@opentelemetry/api: Registered a global for ${A} v${Rg.VERSION}.`), !0
  }
  KY0.registerGlobal = Kb4;

  function Hb4(A) {
    var B, Q;
    let I = (B = Fs[Js]) === null || B === void 0 ? void 0 : B.version;
    if (!I || !Vb4.isCompatible(I)) return;
    return (Q = Fs[Js]) === null || Q === void 0 ? void 0 : Q[A]
  }
  KY0.getGlobal = Hb4;

  function zb4(A, B) {
    B.debug(`@opentelemetry/api: Unregistering a global for ${A} v${Rg.VERSION}.`);
    let Q = Fs[Js];
    if (Q) delete Q[A]
  }
  KY0.unregisterGlobal = zb4
})
// @from(Start 4032478, End 4033223)
UY0 = z((wY0) => {
  Object.defineProperty(wY0, "__esModule", {
    value: !0
  });
  wY0.DiagComponentLogger = void 0;
  var Ub4 = R_();
  class zY0 {
    constructor(A) {
      this._namespace = A.namespace || "DiagComponentLogger"
    }
    debug(...A) {
      return Xs("debug", this._namespace, A)
    }
    error(...A) {
      return Xs("error", this._namespace, A)
    }
    info(...A) {
      return Xs("info", this._namespace, A)
    }
    warn(...A) {
      return Xs("warn", this._namespace, A)
    }
    verbose(...A) {
      return Xs("verbose", this._namespace, A)
    }
  }
  wY0.DiagComponentLogger = zY0;

  function Xs(A, B, Q) {
    let I = Ub4.getGlobal("diag");
    if (!I) return;
    return Q.unshift(B), I[A](...Q)
  }
})
// @from(Start 4033229, End 4033615)
uG1 = z((NY0) => {
  Object.defineProperty(NY0, "__esModule", {
    value: !0
  });
  NY0.DiagLogLevel = void 0;
  var Nb4;
  (function(A) {
    A[A.NONE = 0] = "NONE", A[A.ERROR = 30] = "ERROR", A[A.WARN = 50] = "WARN", A[A.INFO = 60] = "INFO", A[A.DEBUG = 70] = "DEBUG", A[A.VERBOSE = 80] = "VERBOSE", A[A.ALL = 9999] = "ALL"
  })(Nb4 = NY0.DiagLogLevel || (NY0.DiagLogLevel = {}))
})
// @from(Start 4033621, End 4034369)
MY0 = z(($Y0) => {
  Object.defineProperty($Y0, "__esModule", {
    value: !0
  });
  $Y0.createLogLevelDiagLogger = void 0;
  var qN = uG1();

  function $b4(A, B) {
    if (A < qN.DiagLogLevel.NONE) A = qN.DiagLogLevel.NONE;
    else if (A > qN.DiagLogLevel.ALL) A = qN.DiagLogLevel.ALL;
    B = B || {};

    function Q(I, G) {
      let Z = B[I];
      if (typeof Z === "function" && A >= G) return Z.bind(B);
      return function() {}
    }
    return {
      error: Q("error", qN.DiagLogLevel.ERROR),
      warn: Q("warn", qN.DiagLogLevel.WARN),
      info: Q("info", qN.DiagLogLevel.INFO),
      debug: Q("debug", qN.DiagLogLevel.DEBUG),
      verbose: Q("verbose", qN.DiagLogLevel.VERBOSE)
    }
  }
  $Y0.createLogLevelDiagLogger = $b4
})
// @from(Start 4034375, End 4036231)
O_ = z((RY0) => {
  Object.defineProperty(RY0, "__esModule", {
    value: !0
  });
  RY0.DiagAPI = void 0;
  var qb4 = UY0(),
    Mb4 = MY0(),
    LY0 = uG1(),
    pG1 = R_(),
    Lb4 = "diag";
  class zv1 {
    constructor() {
      function A(I) {
        return function(...G) {
          let Z = pG1.getGlobal("diag");
          if (!Z) return;
          return Z[I](...G)
        }
      }
      let B = this,
        Q = (I, G = {
          logLevel: LY0.DiagLogLevel.INFO
        }) => {
          var Z, D, Y;
          if (I === B) {
            let F = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            return B.error((Z = F.stack) !== null && Z !== void 0 ? Z : F.message), !1
          }
          if (typeof G === "number") G = {
            logLevel: G
          };
          let W = pG1.getGlobal("diag"),
            J = Mb4.createLogLevelDiagLogger((D = G.logLevel) !== null && D !== void 0 ? D : LY0.DiagLogLevel.INFO, I);
          if (W && !G.suppressOverrideMessage) {
            let F = (Y = new Error().stack) !== null && Y !== void 0 ? Y : "<failed to generate stacktrace>";
            W.warn(`Current logger will be overwritten from ${F}`), J.warn(`Current logger will overwrite one already registered from ${F}`)
          }
          return pG1.registerGlobal("diag", J, B, !0)
        };
      B.setLogger = Q, B.disable = () => {
        pG1.unregisterGlobal(Lb4, B)
      }, B.createComponentLogger = (I) => {
        return new qb4.DiagComponentLogger(I)
      }, B.verbose = A("verbose"), B.debug = A("debug"), B.info = A("info"), B.warn = A("warn"), B.error = A("error")
    }
    static instance() {
      if (!this._instance) this._instance = new zv1;
      return this._instance
    }
  }
  RY0.DiagAPI = zv1
})
// @from(Start 4036237, End 4037053)
SY0 = z((TY0) => {
  Object.defineProperty(TY0, "__esModule", {
    value: !0
  });
  TY0.BaggageImpl = void 0;
  class Og {
    constructor(A) {
      this._entries = A ? new Map(A) : new Map
    }
    getEntry(A) {
      let B = this._entries.get(A);
      if (!B) return;
      return Object.assign({}, B)
    }
    getAllEntries() {
      return Array.from(this._entries.entries()).map(([A, B]) => [A, B])
    }
    setEntry(A, B) {
      let Q = new Og(this._entries);
      return Q._entries.set(A, B), Q
    }
    removeEntry(A) {
      let B = new Og(this._entries);
      return B._entries.delete(A), B
    }
    removeEntries(...A) {
      let B = new Og(this._entries);
      for (let Q of A) B._entries.delete(Q);
      return B
    }
    clear() {
      return new Og
    }
  }
  TY0.BaggageImpl = Og
})
// @from(Start 4037059, End 4037254)
yY0 = z((_Y0) => {
  Object.defineProperty(_Y0, "__esModule", {
    value: !0
  });
  _Y0.baggageEntryMetadataSymbol = void 0;
  _Y0.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata")
})
// @from(Start 4037260, End 4037909)
wv1 = z((kY0) => {
  Object.defineProperty(kY0, "__esModule", {
    value: !0
  });
  kY0.baggageEntryMetadataFromString = kY0.createBaggage = void 0;
  var Rb4 = O_(),
    Ob4 = SY0(),
    Tb4 = yY0(),
    Pb4 = Rb4.DiagAPI.instance();

  function Sb4(A = {}) {
    return new Ob4.BaggageImpl(new Map(Object.entries(A)))
  }
  kY0.createBaggage = Sb4;

  function _b4(A) {
    if (typeof A !== "string") Pb4.error(`Cannot create baggage metadata from unknown type: ${typeof A}`), A = "";
    return {
      __TYPE__: Tb4.baggageEntryMetadataSymbol,
      toString() {
        return A
      }
    }
  }
  kY0.baggageEntryMetadataFromString = _b4
})
// @from(Start 4037915, End 4038571)
Vs = z((fY0) => {
  Object.defineProperty(fY0, "__esModule", {
    value: !0
  });
  fY0.ROOT_CONTEXT = fY0.createContextKey = void 0;

  function yb4(A) {
    return Symbol.for(A)
  }
  fY0.createContextKey = yb4;
  class cG1 {
    constructor(A) {
      let B = this;
      B._currentContext = A ? new Map(A) : new Map, B.getValue = (Q) => B._currentContext.get(Q), B.setValue = (Q, I) => {
        let G = new cG1(B._currentContext);
        return G._currentContext.set(Q, I), G
      }, B.deleteValue = (Q) => {
        let I = new cG1(B._currentContext);
        return I._currentContext.delete(Q), I
      }
    }
  }
  fY0.ROOT_CONTEXT = new cG1
})
// @from(Start 4038577, End 4039312)
mY0 = z((gY0) => {
  Object.defineProperty(gY0, "__esModule", {
    value: !0
  });
  gY0.DiagConsoleLogger = void 0;
  var Ev1 = [{
    n: "error",
    c: "error"
  }, {
    n: "warn",
    c: "warn"
  }, {
    n: "info",
    c: "info"
  }, {
    n: "debug",
    c: "debug"
  }, {
    n: "verbose",
    c: "trace"
  }];
  class bY0 {
    constructor() {
      function A(B) {
        return function(...Q) {
          if (console) {
            let I = console[B];
            if (typeof I !== "function") I = console.log;
            if (typeof I === "function") return I.apply(console, Q)
          }
        }
      }
      for (let B = 0; B < Ev1.length; B++) this[Ev1[B].n] = A(Ev1[B].c)
    }
  }
  gY0.DiagConsoleLogger = bY0
})
// @from(Start 4039318, End 4041733)
Tv1 = z((dY0) => {
  Object.defineProperty(dY0, "__esModule", {
    value: !0
  });
  dY0.createNoopMeter = dY0.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = dY0.NOOP_OBSERVABLE_GAUGE_METRIC = dY0.NOOP_OBSERVABLE_COUNTER_METRIC = dY0.NOOP_UP_DOWN_COUNTER_METRIC = dY0.NOOP_HISTOGRAM_METRIC = dY0.NOOP_GAUGE_METRIC = dY0.NOOP_COUNTER_METRIC = dY0.NOOP_METER = dY0.NoopObservableUpDownCounterMetric = dY0.NoopObservableGaugeMetric = dY0.NoopObservableCounterMetric = dY0.NoopObservableMetric = dY0.NoopHistogramMetric = dY0.NoopGaugeMetric = dY0.NoopUpDownCounterMetric = dY0.NoopCounterMetric = dY0.NoopMetric = dY0.NoopMeter = void 0;
  class Uv1 {
    constructor() {}
    createGauge(A, B) {
      return dY0.NOOP_GAUGE_METRIC
    }
    createHistogram(A, B) {
      return dY0.NOOP_HISTOGRAM_METRIC
    }
    createCounter(A, B) {
      return dY0.NOOP_COUNTER_METRIC
    }
    createUpDownCounter(A, B) {
      return dY0.NOOP_UP_DOWN_COUNTER_METRIC
    }
    createObservableGauge(A, B) {
      return dY0.NOOP_OBSERVABLE_GAUGE_METRIC
    }
    createObservableCounter(A, B) {
      return dY0.NOOP_OBSERVABLE_COUNTER_METRIC
    }
    createObservableUpDownCounter(A, B) {
      return dY0.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC
    }
    addBatchObservableCallback(A, B) {}
    removeBatchObservableCallback(A) {}
  }
  dY0.NoopMeter = Uv1;
  class Tg {}
  dY0.NoopMetric = Tg;
  class Nv1 extends Tg {
    add(A, B) {}
  }
  dY0.NoopCounterMetric = Nv1;
  class $v1 extends Tg {
    add(A, B) {}
  }
  dY0.NoopUpDownCounterMetric = $v1;
  class qv1 extends Tg {
    record(A, B) {}
  }
  dY0.NoopGaugeMetric = qv1;
  class Mv1 extends Tg {
    record(A, B) {}
  }
  dY0.NoopHistogramMetric = Mv1;
  class Cs {
    addCallback(A) {}
    removeCallback(A) {}
  }
  dY0.NoopObservableMetric = Cs;
  class Lv1 extends Cs {}
  dY0.NoopObservableCounterMetric = Lv1;
  class Rv1 extends Cs {}
  dY0.NoopObservableGaugeMetric = Rv1;
  class Ov1 extends Cs {}
  dY0.NoopObservableUpDownCounterMetric = Ov1;
  dY0.NOOP_METER = new Uv1;
  dY0.NOOP_COUNTER_METRIC = new Nv1;
  dY0.NOOP_GAUGE_METRIC = new qv1;
  dY0.NOOP_HISTOGRAM_METRIC = new Mv1;
  dY0.NOOP_UP_DOWN_COUNTER_METRIC = new $v1;
  dY0.NOOP_OBSERVABLE_COUNTER_METRIC = new Lv1;
  dY0.NOOP_OBSERVABLE_GAUGE_METRIC = new Rv1;
  dY0.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new Ov1;

  function xb4() {
    return dY0.NOOP_METER
  }
  dY0.createNoopMeter = xb4
})
// @from(Start 4041739, End 4041982)
tY0 = z((oY0) => {
  Object.defineProperty(oY0, "__esModule", {
    value: !0
  });
  oY0.ValueType = void 0;
  var lb4;
  (function(A) {
    A[A.INT = 0] = "INT", A[A.DOUBLE = 1] = "DOUBLE"
  })(lb4 = oY0.ValueType || (oY0.ValueType = {}))
})
// @from(Start 4041988, End 4042428)
Sv1 = z((eY0) => {
  Object.defineProperty(eY0, "__esModule", {
    value: !0
  });
  eY0.defaultTextMapSetter = eY0.defaultTextMapGetter = void 0;
  eY0.defaultTextMapGetter = {
    get(A, B) {
      if (A == null) return;
      return A[B]
    },
    keys(A) {
      if (A == null) return [];
      return Object.keys(A)
    }
  };
  eY0.defaultTextMapSetter = {
    set(A, B, Q) {
      if (A == null) return;
      A[B] = Q
    }
  }
})
// @from(Start 4042434, End 4042851)
GW0 = z((QW0) => {
  Object.defineProperty(QW0, "__esModule", {
    value: !0
  });
  QW0.NoopContextManager = void 0;
  var nb4 = Vs();
  class BW0 {
    active() {
      return nb4.ROOT_CONTEXT
    }
    with(A, B, Q, ...I) {
      return B.call(Q, ...I)
    }
    bind(A, B) {
      return B
    }
    enable() {
      return this
    }
    disable() {
      return this
    }
  }
  QW0.NoopContextManager = BW0
})
// @from(Start 4042857, End 4043778)
Ks = z((DW0) => {
  Object.defineProperty(DW0, "__esModule", {
    value: !0
  });
  DW0.ContextAPI = void 0;
  var ab4 = GW0(),
    _v1 = R_(),
    ZW0 = O_(),
    jv1 = "context",
    sb4 = new ab4.NoopContextManager;
  class yv1 {
    constructor() {}
    static getInstance() {
      if (!this._instance) this._instance = new yv1;
      return this._instance
    }
    setGlobalContextManager(A) {
      return _v1.registerGlobal(jv1, A, ZW0.DiagAPI.instance())
    }
    active() {
      return this._getContextManager().active()
    }
    with(A, B, Q, ...I) {
      return this._getContextManager().with(A, B, Q, ...I)
    }
    bind(A, B) {
      return this._getContextManager().bind(A, B)
    }
    _getContextManager() {
      return _v1.getGlobal(jv1) || sb4
    }
    disable() {
      this._getContextManager().disable(), _v1.unregisterGlobal(jv1, ZW0.DiagAPI.instance())
    }
  }
  DW0.ContextAPI = yv1
})
// @from(Start 4043784, End 4044034)
xv1 = z((WW0) => {
  Object.defineProperty(WW0, "__esModule", {
    value: !0
  });
  WW0.TraceFlags = void 0;
  var rb4;
  (function(A) {
    A[A.NONE = 0] = "NONE", A[A.SAMPLED = 1] = "SAMPLED"
  })(rb4 = WW0.TraceFlags || (WW0.TraceFlags = {}))
})
// @from(Start 4044040, End 4044465)
lG1 = z((JW0) => {
  Object.defineProperty(JW0, "__esModule", {
    value: !0
  });
  JW0.INVALID_SPAN_CONTEXT = JW0.INVALID_TRACEID = JW0.INVALID_SPANID = void 0;
  var ob4 = xv1();
  JW0.INVALID_SPANID = "0000000000000000";
  JW0.INVALID_TRACEID = "00000000000000000000000000000000";
  JW0.INVALID_SPAN_CONTEXT = {
    traceId: JW0.INVALID_TRACEID,
    spanId: JW0.INVALID_SPANID,
    traceFlags: ob4.TraceFlags.NONE
  }
})
// @from(Start 4044471, End 4045191)
iG1 = z((KW0) => {
  Object.defineProperty(KW0, "__esModule", {
    value: !0
  });
  KW0.NonRecordingSpan = void 0;
  var tb4 = lG1();
  class CW0 {
    constructor(A = tb4.INVALID_SPAN_CONTEXT) {
      this._spanContext = A
    }
    spanContext() {
      return this._spanContext
    }
    setAttribute(A, B) {
      return this
    }
    setAttributes(A) {
      return this
    }
    addEvent(A, B) {
      return this
    }
    addLink(A) {
      return this
    }
    addLinks(A) {
      return this
    }
    setStatus(A) {
      return this
    }
    updateName(A) {
      return this
    }
    end(A) {}
    isRecording() {
      return !1
    }
    recordException(A, B) {}
  }
  KW0.NonRecordingSpan = CW0
})
// @from(Start 4045197, End 4046105)
bv1 = z((wW0) => {
  Object.defineProperty(wW0, "__esModule", {
    value: !0
  });
  wW0.getSpanContext = wW0.setSpanContext = wW0.deleteSpan = wW0.setSpan = wW0.getActiveSpan = wW0.getSpan = void 0;
  var eb4 = Vs(),
    Ag4 = iG1(),
    Bg4 = Ks(),
    fv1 = eb4.createContextKey("OpenTelemetry Context Key SPAN");

  function vv1(A) {
    return A.getValue(fv1) || void 0
  }
  wW0.getSpan = vv1;

  function Qg4() {
    return vv1(Bg4.ContextAPI.getInstance().active())
  }
  wW0.getActiveSpan = Qg4;

  function zW0(A, B) {
    return A.setValue(fv1, B)
  }
  wW0.setSpan = zW0;

  function Ig4(A) {
    return A.deleteValue(fv1)
  }
  wW0.deleteSpan = Ig4;

  function Gg4(A, B) {
    return zW0(A, new Ag4.NonRecordingSpan(B))
  }
  wW0.setSpanContext = Gg4;

  function Zg4(A) {
    var B;
    return (B = vv1(A)) === null || B === void 0 ? void 0 : B.spanContext()
  }
  wW0.getSpanContext = Zg4
})
// @from(Start 4046111, End 4046791)
nG1 = z((qW0) => {
  Object.defineProperty(qW0, "__esModule", {
    value: !0
  });
  qW0.wrapSpanContext = qW0.isSpanContextValid = qW0.isValidSpanId = qW0.isValidTraceId = void 0;
  var UW0 = lG1(),
    Xg4 = iG1(),
    Vg4 = /^([0-9a-f]{32})$/i,
    Cg4 = /^[0-9a-f]{16}$/i;

  function NW0(A) {
    return Vg4.test(A) && A !== UW0.INVALID_TRACEID
  }
  qW0.isValidTraceId = NW0;

  function $W0(A) {
    return Cg4.test(A) && A !== UW0.INVALID_SPANID
  }
  qW0.isValidSpanId = $W0;

  function Kg4(A) {
    return NW0(A.traceId) && $W0(A.spanId)
  }
  qW0.isSpanContextValid = Kg4;

  function Hg4(A) {
    return new Xg4.NonRecordingSpan(A)
  }
  qW0.wrapSpanContext = Hg4
})
// @from(Start 4046797, End 4047930)
mv1 = z((OW0) => {
  Object.defineProperty(OW0, "__esModule", {
    value: !0
  });
  OW0.NoopTracer = void 0;
  var Ug4 = Ks(),
    LW0 = bv1(),
    gv1 = iG1(),
    Ng4 = nG1(),
    hv1 = Ug4.ContextAPI.getInstance();
  class RW0 {
    startSpan(A, B, Q = hv1.active()) {
      if (Boolean(B === null || B === void 0 ? void 0 : B.root)) return new gv1.NonRecordingSpan;
      let G = Q && LW0.getSpanContext(Q);
      if ($g4(G) && Ng4.isSpanContextValid(G)) return new gv1.NonRecordingSpan(G);
      else return new gv1.NonRecordingSpan
    }
    startActiveSpan(A, B, Q, I) {
      let G, Z, D;
      if (arguments.length < 2) return;
      else if (arguments.length === 2) D = B;
      else if (arguments.length === 3) G = B, D = Q;
      else G = B, Z = Q, D = I;
      let Y = Z !== null && Z !== void 0 ? Z : hv1.active(),
        W = this.startSpan(A, G, Y),
        J = LW0.setSpan(Y, W);
      return hv1.with(J, D, void 0, W)
    }
  }
  OW0.NoopTracer = RW0;

  function $g4(A) {
    return typeof A === "object" && typeof A.spanId === "string" && typeof A.traceId === "string" && typeof A.traceFlags === "number"
  }
})
// @from(Start 4047936, End 4048702)
dv1 = z((SW0) => {
  Object.defineProperty(SW0, "__esModule", {
    value: !0
  });
  SW0.ProxyTracer = void 0;
  var qg4 = mv1(),
    Mg4 = new qg4.NoopTracer;
  class PW0 {
    constructor(A, B, Q, I) {
      this._provider = A, this.name = B, this.version = Q, this.options = I
    }
    startSpan(A, B, Q) {
      return this._getTracer().startSpan(A, B, Q)
    }
    startActiveSpan(A, B, Q, I) {
      let G = this._getTracer();
      return Reflect.apply(G.startActiveSpan, G, arguments)
    }
    _getTracer() {
      if (this._delegate) return this._delegate;
      let A = this._provider.getDelegateTracer(this.name, this.version, this.options);
      if (!A) return Mg4;
      return this._delegate = A, this._delegate
    }
  }
  SW0.ProxyTracer = PW0
})
// @from(Start 4048708, End 4048960)
xW0 = z((yW0) => {
  Object.defineProperty(yW0, "__esModule", {
    value: !0
  });
  yW0.NoopTracerProvider = void 0;
  var Lg4 = mv1();
  class jW0 {
    getTracer(A, B, Q) {
      return new Lg4.NoopTracer
    }
  }
  yW0.NoopTracerProvider = jW0
})
// @from(Start 4048966, End 4049676)
uv1 = z((vW0) => {
  Object.defineProperty(vW0, "__esModule", {
    value: !0
  });
  vW0.ProxyTracerProvider = void 0;
  var Rg4 = dv1(),
    Og4 = xW0(),
    Tg4 = new Og4.NoopTracerProvider;
  class fW0 {
    getTracer(A, B, Q) {
      var I;
      return (I = this.getDelegateTracer(A, B, Q)) !== null && I !== void 0 ? I : new Rg4.ProxyTracer(this, A, B, Q)
    }
    getDelegate() {
      var A;
      return (A = this._delegate) !== null && A !== void 0 ? A : Tg4
    }
    setDelegate(A) {
      this._delegate = A
    }
    getDelegateTracer(A, B, Q) {
      var I;
      return (I = this._delegate) === null || I === void 0 ? void 0 : I.getTracer(A, B, Q)
    }
  }
  vW0.ProxyTracerProvider = fW0
})
// @from(Start 4049682, End 4050012)
hW0 = z((gW0) => {
  Object.defineProperty(gW0, "__esModule", {
    value: !0
  });
  gW0.SamplingDecision = void 0;
  var Pg4;
  (function(A) {
    A[A.NOT_RECORD = 0] = "NOT_RECORD", A[A.RECORD = 1] = "RECORD", A[A.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED"
  })(Pg4 = gW0.SamplingDecision || (gW0.SamplingDecision = {}))
})
// @from(Start 4050018, End 4050360)
dW0 = z((mW0) => {
  Object.defineProperty(mW0, "__esModule", {
    value: !0
  });
  mW0.SpanKind = void 0;
  var Sg4;
  (function(A) {
    A[A.INTERNAL = 0] = "INTERNAL", A[A.SERVER = 1] = "SERVER", A[A.CLIENT = 2] = "CLIENT", A[A.PRODUCER = 3] = "PRODUCER", A[A.CONSUMER = 4] = "CONSUMER"
  })(Sg4 = mW0.SpanKind || (mW0.SpanKind = {}))
})
// @from(Start 4050366, End 4050646)
pW0 = z((uW0) => {
  Object.defineProperty(uW0, "__esModule", {
    value: !0
  });
  uW0.SpanStatusCode = void 0;
  var _g4;
  (function(A) {
    A[A.UNSET = 0] = "UNSET", A[A.OK = 1] = "OK", A[A.ERROR = 2] = "ERROR"
  })(_g4 = uW0.SpanStatusCode || (uW0.SpanStatusCode = {}))
})
// @from(Start 4050652, End 4051157)
iW0 = z((cW0) => {
  Object.defineProperty(cW0, "__esModule", {
    value: !0
  });
  cW0.validateValue = cW0.validateKey = void 0;
  var iv1 = "[_0-9a-z-*/]",
    jg4 = `[a-z]${iv1}{0,255}`,
    yg4 = `[a-z0-9]${iv1}{0,240}@[a-z]${iv1}{0,13}`,
    kg4 = new RegExp(`^(?:${jg4}|${yg4})$`),
    xg4 = /^[ -~]{0,255}[!-~]$/,
    fg4 = /,|=/;

  function vg4(A) {
    return kg4.test(A)
  }
  cW0.validateKey = vg4;

  function bg4(A) {
    return xg4.test(A) && !fg4.test(A)
  }
  cW0.validateValue = bg4
})
// @from(Start 4051163, End 4052676)
eW0 = z((oW0) => {
  Object.defineProperty(oW0, "__esModule", {
    value: !0
  });
  oW0.TraceStateImpl = void 0;
  var nW0 = iW0(),
    aW0 = 32,
    hg4 = 512,
    sW0 = ",",
    rW0 = "=";
  class nv1 {
    constructor(A) {
      if (this._internalState = new Map, A) this._parse(A)
    }
    set(A, B) {
      let Q = this._clone();
      if (Q._internalState.has(A)) Q._internalState.delete(A);
      return Q._internalState.set(A, B), Q
    }
    unset(A) {
      let B = this._clone();
      return B._internalState.delete(A), B
    }
    get(A) {
      return this._internalState.get(A)
    }
    serialize() {
      return this._keys().reduce((A, B) => {
        return A.push(B + rW0 + this.get(B)), A
      }, []).join(sW0)
    }
    _parse(A) {
      if (A.length > hg4) return;
      if (this._internalState = A.split(sW0).reverse().reduce((B, Q) => {
          let I = Q.trim(),
            G = I.indexOf(rW0);
          if (G !== -1) {
            let Z = I.slice(0, G),
              D = I.slice(G + 1, Q.length);
            if (nW0.validateKey(Z) && nW0.validateValue(D)) B.set(Z, D)
          }
          return B
        }, new Map), this._internalState.size > aW0) this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, aW0))
    }
    _keys() {
      return Array.from(this._internalState.keys()).reverse()
    }
    _clone() {
      let A = new nv1;
      return A._internalState = new Map(this._internalState), A
    }
  }
  oW0.TraceStateImpl = nv1
})
// @from(Start 4052682, End 4052911)
QJ0 = z((AJ0) => {
  Object.defineProperty(AJ0, "__esModule", {
    value: !0
  });
  AJ0.createTraceState = void 0;
  var mg4 = eW0();

  function dg4(A) {
    return new mg4.TraceStateImpl(A)
  }
  AJ0.createTraceState = dg4
})
// @from(Start 4052917, End 4053090)
ZJ0 = z((IJ0) => {
  Object.defineProperty(IJ0, "__esModule", {
    value: !0
  });
  IJ0.context = void 0;
  var ug4 = Ks();
  IJ0.context = ug4.ContextAPI.getInstance()
})
// @from(Start 4053096, End 4053257)
WJ0 = z((DJ0) => {
  Object.defineProperty(DJ0, "__esModule", {
    value: !0
  });
  DJ0.diag = void 0;
  var pg4 = O_();
  DJ0.diag = pg4.DiagAPI.instance()
})
// @from(Start 4053263, End 4053571)
XJ0 = z((JJ0) => {
  Object.defineProperty(JJ0, "__esModule", {
    value: !0
  });
  JJ0.NOOP_METER_PROVIDER = JJ0.NoopMeterProvider = void 0;
  var cg4 = Tv1();
  class av1 {
    getMeter(A, B, Q) {
      return cg4.NOOP_METER
    }
  }
  JJ0.NoopMeterProvider = av1;
  JJ0.NOOP_METER_PROVIDER = new av1
})
// @from(Start 4053577, End 4054293)
HJ0 = z((CJ0) => {
  Object.defineProperty(CJ0, "__esModule", {
    value: !0
  });
  CJ0.MetricsAPI = void 0;
  var ig4 = XJ0(),
    sv1 = R_(),
    VJ0 = O_(),
    rv1 = "metrics";
  class ov1 {
    constructor() {}
    static getInstance() {
      if (!this._instance) this._instance = new ov1;
      return this._instance
    }
    setGlobalMeterProvider(A) {
      return sv1.registerGlobal(rv1, A, VJ0.DiagAPI.instance())
    }
    getMeterProvider() {
      return sv1.getGlobal(rv1) || ig4.NOOP_METER_PROVIDER
    }
    getMeter(A, B, Q) {
      return this.getMeterProvider().getMeter(A, B, Q)
    }
    disable() {
      sv1.unregisterGlobal(rv1, VJ0.DiagAPI.instance())
    }
  }
  CJ0.MetricsAPI = ov1
})
// @from(Start 4054299, End 4054473)
EJ0 = z((zJ0) => {
  Object.defineProperty(zJ0, "__esModule", {
    value: !0
  });
  zJ0.metrics = void 0;
  var ng4 = HJ0();
  zJ0.metrics = ng4.MetricsAPI.getInstance()
})
// @from(Start 4054479, End 4054753)
qJ0 = z((NJ0) => {
  Object.defineProperty(NJ0, "__esModule", {
    value: !0
  });
  NJ0.NoopTextMapPropagator = void 0;
  class UJ0 {
    inject(A, B) {}
    extract(A, B) {
      return A
    }
    fields() {
      return []
    }
  }
  NJ0.NoopTextMapPropagator = UJ0
})
// @from(Start 4054759, End 4055384)
OJ0 = z((LJ0) => {
  Object.defineProperty(LJ0, "__esModule", {
    value: !0
  });
  LJ0.deleteBaggage = LJ0.setBaggage = LJ0.getActiveBaggage = LJ0.getBaggage = void 0;
  var ag4 = Ks(),
    sg4 = Vs(),
    tv1 = sg4.createContextKey("OpenTelemetry Baggage Key");

  function MJ0(A) {
    return A.getValue(tv1) || void 0
  }
  LJ0.getBaggage = MJ0;

  function rg4() {
    return MJ0(ag4.ContextAPI.getInstance().active())
  }
  LJ0.getActiveBaggage = rg4;

  function og4(A, B) {
    return A.setValue(tv1, B)
  }
  LJ0.setBaggage = og4;

  function tg4(A) {
    return A.deleteValue(tv1)
  }
  LJ0.deleteBaggage = tg4
})
// @from(Start 4055390, End 4056607)
jJ0 = z((SJ0) => {
  Object.defineProperty(SJ0, "__esModule", {
    value: !0
  });
  SJ0.PropagationAPI = void 0;
  var ev1 = R_(),
    Qh4 = qJ0(),
    TJ0 = Sv1(),
    aG1 = OJ0(),
    Ih4 = wv1(),
    PJ0 = O_(),
    Ab1 = "propagation",
    Gh4 = new Qh4.NoopTextMapPropagator;
  class Bb1 {
    constructor() {
      this.createBaggage = Ih4.createBaggage, this.getBaggage = aG1.getBaggage, this.getActiveBaggage = aG1.getActiveBaggage, this.setBaggage = aG1.setBaggage, this.deleteBaggage = aG1.deleteBaggage
    }
    static getInstance() {
      if (!this._instance) this._instance = new Bb1;
      return this._instance
    }
    setGlobalPropagator(A) {
      return ev1.registerGlobal(Ab1, A, PJ0.DiagAPI.instance())
    }
    inject(A, B, Q = TJ0.defaultTextMapSetter) {
      return this._getGlobalPropagator().inject(A, B, Q)
    }
    extract(A, B, Q = TJ0.defaultTextMapGetter) {
      return this._getGlobalPropagator().extract(A, B, Q)
    }
    fields() {
      return this._getGlobalPropagator().fields()
    }
    disable() {
      ev1.unregisterGlobal(Ab1, PJ0.DiagAPI.instance())
    }
    _getGlobalPropagator() {
      return ev1.getGlobal(Ab1) || Gh4
    }
  }
  SJ0.PropagationAPI = Bb1
})
// @from(Start 4056613, End 4056799)
xJ0 = z((yJ0) => {
  Object.defineProperty(yJ0, "__esModule", {
    value: !0
  });
  yJ0.propagation = void 0;
  var Zh4 = jJ0();
  yJ0.propagation = Zh4.PropagationAPI.getInstance()
})
// @from(Start 4056805, End 4058071)
mJ0 = z((gJ0) => {
  Object.defineProperty(gJ0, "__esModule", {
    value: !0
  });
  gJ0.TraceAPI = void 0;
  var Qb1 = R_(),
    fJ0 = uv1(),
    vJ0 = nG1(),
    Pg = bv1(),
    bJ0 = O_(),
    Ib1 = "trace";
  class Gb1 {
    constructor() {
      this._proxyTracerProvider = new fJ0.ProxyTracerProvider, this.wrapSpanContext = vJ0.wrapSpanContext, this.isSpanContextValid = vJ0.isSpanContextValid, this.deleteSpan = Pg.deleteSpan, this.getSpan = Pg.getSpan, this.getActiveSpan = Pg.getActiveSpan, this.getSpanContext = Pg.getSpanContext, this.setSpan = Pg.setSpan, this.setSpanContext = Pg.setSpanContext
    }
    static getInstance() {
      if (!this._instance) this._instance = new Gb1;
      return this._instance
    }
    setGlobalTracerProvider(A) {
      let B = Qb1.registerGlobal(Ib1, this._proxyTracerProvider, bJ0.DiagAPI.instance());
      if (B) this._proxyTracerProvider.setDelegate(A);
      return B
    }
    getTracerProvider() {
      return Qb1.getGlobal(Ib1) || this._proxyTracerProvider
    }
    getTracer(A, B) {
      return this.getTracerProvider().getTracer(A, B)
    }
    disable() {
      Qb1.unregisterGlobal(Ib1, bJ0.DiagAPI.instance()), this._proxyTracerProvider = new fJ0.ProxyTracerProvider
    }
  }
  gJ0.TraceAPI = Gb1
})
// @from(Start 4058077, End 4058245)
pJ0 = z((dJ0) => {
  Object.defineProperty(dJ0, "__esModule", {
    value: !0
  });
  dJ0.trace = void 0;
  var Dh4 = mJ0();
  dJ0.trace = Dh4.TraceAPI.getInstance()
})
// @from(Start 4058251, End 4063033)
s9 = z((Y8) => {
  Object.defineProperty(Y8, "__esModule", {
    value: !0
  });
  Y8.trace = Y8.propagation = Y8.metrics = Y8.diag = Y8.context = Y8.INVALID_SPAN_CONTEXT = Y8.INVALID_TRACEID = Y8.INVALID_SPANID = Y8.isValidSpanId = Y8.isValidTraceId = Y8.isSpanContextValid = Y8.createTraceState = Y8.TraceFlags = Y8.SpanStatusCode = Y8.SpanKind = Y8.SamplingDecision = Y8.ProxyTracerProvider = Y8.ProxyTracer = Y8.defaultTextMapSetter = Y8.defaultTextMapGetter = Y8.ValueType = Y8.createNoopMeter = Y8.DiagLogLevel = Y8.DiagConsoleLogger = Y8.ROOT_CONTEXT = Y8.createContextKey = Y8.baggageEntryMetadataFromString = void 0;
  var Yh4 = wv1();
  Object.defineProperty(Y8, "baggageEntryMetadataFromString", {
    enumerable: !0,
    get: function() {
      return Yh4.baggageEntryMetadataFromString
    }
  });
  var cJ0 = Vs();
  Object.defineProperty(Y8, "createContextKey", {
    enumerable: !0,
    get: function() {
      return cJ0.createContextKey
    }
  });
  Object.defineProperty(Y8, "ROOT_CONTEXT", {
    enumerable: !0,
    get: function() {
      return cJ0.ROOT_CONTEXT
    }
  });
  var Wh4 = mY0();
  Object.defineProperty(Y8, "DiagConsoleLogger", {
    enumerable: !0,
    get: function() {
      return Wh4.DiagConsoleLogger
    }
  });
  var Jh4 = uG1();
  Object.defineProperty(Y8, "DiagLogLevel", {
    enumerable: !0,
    get: function() {
      return Jh4.DiagLogLevel
    }
  });
  var Fh4 = Tv1();
  Object.defineProperty(Y8, "createNoopMeter", {
    enumerable: !0,
    get: function() {
      return Fh4.createNoopMeter
    }
  });
  var Xh4 = tY0();
  Object.defineProperty(Y8, "ValueType", {
    enumerable: !0,
    get: function() {
      return Xh4.ValueType
    }
  });
  var lJ0 = Sv1();
  Object.defineProperty(Y8, "defaultTextMapGetter", {
    enumerable: !0,
    get: function() {
      return lJ0.defaultTextMapGetter
    }
  });
  Object.defineProperty(Y8, "defaultTextMapSetter", {
    enumerable: !0,
    get: function() {
      return lJ0.defaultTextMapSetter
    }
  });
  var Vh4 = dv1();
  Object.defineProperty(Y8, "ProxyTracer", {
    enumerable: !0,
    get: function() {
      return Vh4.ProxyTracer
    }
  });
  var Ch4 = uv1();
  Object.defineProperty(Y8, "ProxyTracerProvider", {
    enumerable: !0,
    get: function() {
      return Ch4.ProxyTracerProvider
    }
  });
  var Kh4 = hW0();
  Object.defineProperty(Y8, "SamplingDecision", {
    enumerable: !0,
    get: function() {
      return Kh4.SamplingDecision
    }
  });
  var Hh4 = dW0();
  Object.defineProperty(Y8, "SpanKind", {
    enumerable: !0,
    get: function() {
      return Hh4.SpanKind
    }
  });
  var zh4 = pW0();
  Object.defineProperty(Y8, "SpanStatusCode", {
    enumerable: !0,
    get: function() {
      return zh4.SpanStatusCode
    }
  });
  var wh4 = xv1();
  Object.defineProperty(Y8, "TraceFlags", {
    enumerable: !0,
    get: function() {
      return wh4.TraceFlags
    }
  });
  var Eh4 = QJ0();
  Object.defineProperty(Y8, "createTraceState", {
    enumerable: !0,
    get: function() {
      return Eh4.createTraceState
    }
  });
  var Zb1 = nG1();
  Object.defineProperty(Y8, "isSpanContextValid", {
    enumerable: !0,
    get: function() {
      return Zb1.isSpanContextValid
    }
  });
  Object.defineProperty(Y8, "isValidTraceId", {
    enumerable: !0,
    get: function() {
      return Zb1.isValidTraceId
    }
  });
  Object.defineProperty(Y8, "isValidSpanId", {
    enumerable: !0,
    get: function() {
      return Zb1.isValidSpanId
    }
  });
  var Db1 = lG1();
  Object.defineProperty(Y8, "INVALID_SPANID", {
    enumerable: !0,
    get: function() {
      return Db1.INVALID_SPANID
    }
  });
  Object.defineProperty(Y8, "INVALID_TRACEID", {
    enumerable: !0,
    get: function() {
      return Db1.INVALID_TRACEID
    }
  });
  Object.defineProperty(Y8, "INVALID_SPAN_CONTEXT", {
    enumerable: !0,
    get: function() {
      return Db1.INVALID_SPAN_CONTEXT
    }
  });
  var iJ0 = ZJ0();
  Object.defineProperty(Y8, "context", {
    enumerable: !0,
    get: function() {
      return iJ0.context
    }
  });
  var nJ0 = WJ0();
  Object.defineProperty(Y8, "diag", {
    enumerable: !0,
    get: function() {
      return nJ0.diag
    }
  });
  var aJ0 = EJ0();
  Object.defineProperty(Y8, "metrics", {
    enumerable: !0,
    get: function() {
      return aJ0.metrics
    }
  });
  var sJ0 = xJ0();
  Object.defineProperty(Y8, "propagation", {
    enumerable: !0,
    get: function() {
      return sJ0.propagation
    }
  });
  var rJ0 = pJ0();
  Object.defineProperty(Y8, "trace", {
    enumerable: !0,
    get: function() {
      return rJ0.trace
    }
  });
  Y8.default = {
    context: iJ0.context,
    diag: nJ0.diag,
    metrics: aJ0.metrics,
    propagation: sJ0.propagation,
    trace: rJ0.trace
  }
})
// @from(Start 4063039, End 4063944)
tJ0 = z((oJ0) => {
  Object.defineProperty(oJ0, "__esModule", {
    value: !0
  });
  oJ0.SeverityNumber = void 0;
  var $h4;
  (function(A) {
    A[A.UNSPECIFIED = 0] = "UNSPECIFIED", A[A.TRACE = 1] = "TRACE", A[A.TRACE2 = 2] = "TRACE2", A[A.TRACE3 = 3] = "TRACE3", A[A.TRACE4 = 4] = "TRACE4", A[A.DEBUG = 5] = "DEBUG", A[A.DEBUG2 = 6] = "DEBUG2", A[A.DEBUG3 = 7] = "DEBUG3", A[A.DEBUG4 = 8] = "DEBUG4", A[A.INFO = 9] = "INFO", A[A.INFO2 = 10] = "INFO2", A[A.INFO3 = 11] = "INFO3", A[A.INFO4 = 12] = "INFO4", A[A.WARN = 13] = "WARN", A[A.WARN2 = 14] = "WARN2", A[A.WARN3 = 15] = "WARN3", A[A.WARN4 = 16] = "WARN4", A[A.ERROR = 17] = "ERROR", A[A.ERROR2 = 18] = "ERROR2", A[A.ERROR3 = 19] = "ERROR3", A[A.ERROR4 = 20] = "ERROR4", A[A.FATAL = 21] = "FATAL", A[A.FATAL2 = 22] = "FATAL2", A[A.FATAL3 = 23] = "FATAL3", A[A.FATAL4 = 24] = "FATAL4"
  })($h4 = oJ0.SeverityNumber || (oJ0.SeverityNumber = {}))
})
// @from(Start 4063950, End 4064166)
sG1 = z((eJ0) => {
  Object.defineProperty(eJ0, "__esModule", {
    value: !0
  });
  eJ0.NOOP_LOGGER = eJ0.NoopLogger = void 0;
  class Wb1 {
    emit(A) {}
  }
  eJ0.NoopLogger = Wb1;
  eJ0.NOOP_LOGGER = new Wb1
})
// @from(Start 4064172, End 4064489)
rG1 = z((BF0) => {
  Object.defineProperty(BF0, "__esModule", {
    value: !0
  });
  BF0.NOOP_LOGGER_PROVIDER = BF0.NoopLoggerProvider = void 0;
  var Mh4 = sG1();
  class Jb1 {
    getLogger(A, B, Q) {
      return new Mh4.NoopLogger
    }
  }
  BF0.NoopLoggerProvider = Jb1;
  BF0.NOOP_LOGGER_PROVIDER = new Jb1
})
// @from(Start 4064495, End 4065081)
Fb1 = z((GF0) => {
  Object.defineProperty(GF0, "__esModule", {
    value: !0
  });
  GF0.ProxyLogger = void 0;
  var Rh4 = sG1();
  class IF0 {
    constructor(A, B, Q, I) {
      this._provider = A, this.name = B, this.version = Q, this.options = I
    }
    emit(A) {
      this._getLogger().emit(A)
    }
    _getLogger() {
      if (this._delegate) return this._delegate;
      let A = this._provider.getDelegateLogger(this.name, this.version, this.options);
      if (!A) return Rh4.NOOP_LOGGER;
      return this._delegate = A, this._delegate
    }
  }
  GF0.ProxyLogger = IF0
})
// @from(Start 4065087, End 4065780)
Xb1 = z((YF0) => {
  Object.defineProperty(YF0, "__esModule", {
    value: !0
  });
  YF0.ProxyLoggerProvider = void 0;
  var Oh4 = rG1(),
    Th4 = Fb1();
  class DF0 {
    getLogger(A, B, Q) {
      var I;
      return (I = this.getDelegateLogger(A, B, Q)) !== null && I !== void 0 ? I : new Th4.ProxyLogger(this, A, B, Q)
    }
    getDelegate() {
      var A;
      return (A = this._delegate) !== null && A !== void 0 ? A : Oh4.NOOP_LOGGER_PROVIDER
    }
    setDelegate(A) {
      this._delegate = A
    }
    getDelegateLogger(A, B, Q) {
      var I;
      return (I = this._delegate) === null || I === void 0 ? void 0 : I.getLogger(A, B, Q)
    }
  }
  YF0.ProxyLoggerProvider = DF0
})
// @from(Start 4065786, End 4065973)
XF0 = z((JF0) => {
  Object.defineProperty(JF0, "__esModule", {
    value: !0
  });
  JF0._globalThis = void 0;
  JF0._globalThis = typeof globalThis === "object" ? globalThis : global
})
// @from(Start 4065979, End 4066240)
VF0 = z((Vb1) => {
  Object.defineProperty(Vb1, "__esModule", {
    value: !0
  });
  Vb1._globalThis = void 0;
  var Ph4 = XF0();
  Object.defineProperty(Vb1, "_globalThis", {
    enumerable: !0,
    get: function() {
      return Ph4._globalThis
    }
  })
})
// @from(Start 4066246, End 4066507)
CF0 = z((Cb1) => {
  Object.defineProperty(Cb1, "__esModule", {
    value: !0
  });
  Cb1._globalThis = void 0;
  var _h4 = VF0();
  Object.defineProperty(Cb1, "_globalThis", {
    enumerable: !0,
    get: function() {
      return _h4._globalThis
    }
  })
})
// @from(Start 4066513, End 4066967)
zF0 = z((KF0) => {
  Object.defineProperty(KF0, "__esModule", {
    value: !0
  });
  KF0.API_BACKWARDS_COMPATIBILITY_VERSION = KF0.makeGetter = KF0._global = KF0.GLOBAL_LOGS_API_KEY = void 0;
  var yh4 = CF0();
  KF0.GLOBAL_LOGS_API_KEY = Symbol.for("io.opentelemetry.js.api.logs");
  KF0._global = yh4._globalThis;

  function kh4(A, B, Q) {
    return (I) => I === A ? B : Q
  }
  KF0.makeGetter = kh4;
  KF0.API_BACKWARDS_COMPATIBILITY_VERSION = 1
})
// @from(Start 4066973, End 4068146)
NF0 = z((EF0) => {
  Object.defineProperty(EF0, "__esModule", {
    value: !0
  });
  EF0.LogsAPI = void 0;
  var $X = zF0(),
    bh4 = rG1(),
    wF0 = Xb1();
  class Kb1 {
    constructor() {
      this._proxyLoggerProvider = new wF0.ProxyLoggerProvider
    }
    static getInstance() {
      if (!this._instance) this._instance = new Kb1;
      return this._instance
    }
    setGlobalLoggerProvider(A) {
      if ($X._global[$X.GLOBAL_LOGS_API_KEY]) return this.getLoggerProvider();
      return $X._global[$X.GLOBAL_LOGS_API_KEY] = $X.makeGetter($X.API_BACKWARDS_COMPATIBILITY_VERSION, A, bh4.NOOP_LOGGER_PROVIDER), this._proxyLoggerProvider.setDelegate(A), A
    }
    getLoggerProvider() {
      var A, B;
      return (B = (A = $X._global[$X.GLOBAL_LOGS_API_KEY]) === null || A === void 0 ? void 0 : A.call($X._global, $X.API_BACKWARDS_COMPATIBILITY_VERSION)) !== null && B !== void 0 ? B : this._proxyLoggerProvider
    }
    getLogger(A, B, Q) {
      return this.getLoggerProvider().getLogger(A, B, Q)
    }
    disable() {
      delete $X._global[$X.GLOBAL_LOGS_API_KEY], this._proxyLoggerProvider = new wF0.ProxyLoggerProvider
    }
  }
  EF0.LogsAPI = Kb1
})
// @from(Start 4068152, End 4069501)
Hb1 = z((MN) => {
  Object.defineProperty(MN, "__esModule", {
    value: !0
  });
  MN.logs = MN.ProxyLoggerProvider = MN.ProxyLogger = MN.NoopLoggerProvider = MN.NOOP_LOGGER_PROVIDER = MN.NoopLogger = MN.NOOP_LOGGER = MN.SeverityNumber = void 0;
  var gh4 = tJ0();
  Object.defineProperty(MN, "SeverityNumber", {
    enumerable: !0,
    get: function() {
      return gh4.SeverityNumber
    }
  });
  var $F0 = sG1();
  Object.defineProperty(MN, "NOOP_LOGGER", {
    enumerable: !0,
    get: function() {
      return $F0.NOOP_LOGGER
    }
  });
  Object.defineProperty(MN, "NoopLogger", {
    enumerable: !0,
    get: function() {
      return $F0.NoopLogger
    }
  });
  var qF0 = rG1();
  Object.defineProperty(MN, "NOOP_LOGGER_PROVIDER", {
    enumerable: !0,
    get: function() {
      return qF0.NOOP_LOGGER_PROVIDER
    }
  });
  Object.defineProperty(MN, "NoopLoggerProvider", {
    enumerable: !0,
    get: function() {
      return qF0.NoopLoggerProvider
    }
  });
  var hh4 = Fb1();
  Object.defineProperty(MN, "ProxyLogger", {
    enumerable: !0,
    get: function() {
      return hh4.ProxyLogger
    }
  });
  var mh4 = Xb1();
  Object.defineProperty(MN, "ProxyLoggerProvider", {
    enumerable: !0,
    get: function() {
      return mh4.ProxyLoggerProvider
    }
  });
  var dh4 = NF0();
  MN.logs = dh4.LogsAPI.getInstance()
})
// @from(Start 4069507, End 4069801)
oG1 = z((LF0) => {
  Object.defineProperty(LF0, "__esModule", {
    value: !0
  });
  LF0.AggregationTemporality = void 0;
  var uh4;
  (function(A) {
    A[A.DELTA = 0] = "DELTA", A[A.CUMULATIVE = 1] = "CUMULATIVE"
  })(uh4 = LF0.AggregationTemporality || (LF0.AggregationTemporality = {}))
})
// @from(Start 4069807, End 4070519)
tL = z((OF0) => {
  Object.defineProperty(OF0, "__esModule", {
    value: !0
  });
  OF0.DataPointType = OF0.InstrumentType = void 0;
  var ph4;
  (function(A) {
    A.COUNTER = "COUNTER", A.GAUGE = "GAUGE", A.HISTOGRAM = "HISTOGRAM", A.UP_DOWN_COUNTER = "UP_DOWN_COUNTER", A.OBSERVABLE_COUNTER = "OBSERVABLE_COUNTER", A.OBSERVABLE_GAUGE = "OBSERVABLE_GAUGE", A.OBSERVABLE_UP_DOWN_COUNTER = "OBSERVABLE_UP_DOWN_COUNTER"
  })(ph4 = OF0.InstrumentType || (OF0.InstrumentType = {}));
  var ch4;
  (function(A) {
    A[A.HISTOGRAM = 0] = "HISTOGRAM", A[A.EXPONENTIAL_HISTOGRAM = 1] = "EXPONENTIAL_HISTOGRAM", A[A.GAUGE = 2] = "GAUGE", A[A.SUM = 3] = "SUM"
  })(ch4 = OF0.DataPointType || (OF0.DataPointType = {}))
})
// @from(Start 4070525, End 4072818)
gC = z((TF0) => {
  Object.defineProperty(TF0, "__esModule", {
    value: !0
  });
  TF0.equalsCaseInsensitive = TF0.binarySearchUB = TF0.setEquals = TF0.FlatMap = TF0.isPromiseAllSettledRejectionResult = TF0.PromiseAllSettled = TF0.callWithTimeout = TF0.TimeoutError = TF0.instrumentationScopeId = TF0.hashAttributes = TF0.isNotNullish = void 0;

  function lh4(A) {
    return A !== void 0 && A !== null
  }
  TF0.isNotNullish = lh4;

  function ih4(A) {
    let B = Object.keys(A);
    if (B.length === 0) return "";
    return B = B.sort(), JSON.stringify(B.map((Q) => [Q, A[Q]]))
  }
  TF0.hashAttributes = ih4;

  function nh4(A) {
    return `${A.name}:${A.version??""}:${A.schemaUrl??""}`
  }
  TF0.instrumentationScopeId = nh4;
  class tG1 extends Error {
    constructor(A) {
      super(A);
      Object.setPrototypeOf(this, tG1.prototype)
    }
  }
  TF0.TimeoutError = tG1;

  function ah4(A, B) {
    let Q, I = new Promise(function G(Z, D) {
      Q = setTimeout(function Y() {
        D(new tG1("Operation timed out."))
      }, B)
    });
    return Promise.race([A, I]).then((G) => {
      return clearTimeout(Q), G
    }, (G) => {
      throw clearTimeout(Q), G
    })
  }
  TF0.callWithTimeout = ah4;
  async function sh4(A) {
    return Promise.all(A.map(async (B) => {
      try {
        return {
          status: "fulfilled",
          value: await B
        }
      } catch (Q) {
        return {
          status: "rejected",
          reason: Q
        }
      }
    }))
  }
  TF0.PromiseAllSettled = sh4;

  function rh4(A) {
    return A.status === "rejected"
  }
  TF0.isPromiseAllSettledRejectionResult = rh4;

  function oh4(A, B) {
    let Q = [];
    return A.forEach((I) => {
      Q.push(...B(I))
    }), Q
  }
  TF0.FlatMap = oh4;

  function th4(A, B) {
    if (A.size !== B.size) return !1;
    for (let Q of A)
      if (!B.has(Q)) return !1;
    return !0
  }
  TF0.setEquals = th4;

  function eh4(A, B) {
    let Q = 0,
      I = A.length - 1,
      G = A.length;
    while (I >= Q) {
      let Z = Q + Math.trunc((I - Q) / 2);
      if (A[Z] < B) Q = Z + 1;
      else G = Z, I = Z - 1
    }
    return G
  }
  TF0.binarySearchUB = eh4;

  function Am4(A, B) {
    return A.toLowerCase() === B.toLowerCase()
  }
  TF0.equalsCaseInsensitive = Am4
})
// @from(Start 4072824, End 4073205)
Sg = z((SF0) => {
  Object.defineProperty(SF0, "__esModule", {
    value: !0
  });
  SF0.AggregatorKind = void 0;
  var Xm4;
  (function(A) {
    A[A.DROP = 0] = "DROP", A[A.SUM = 1] = "SUM", A[A.LAST_VALUE = 2] = "LAST_VALUE", A[A.HISTOGRAM = 3] = "HISTOGRAM", A[A.EXPONENTIAL_HISTOGRAM = 4] = "EXPONENTIAL_HISTOGRAM"
  })(Xm4 = SF0.AggregatorKind || (SF0.AggregatorKind = {}))
})
// @from(Start 4073211, End 4073596)
kF0 = z((jF0) => {
  Object.defineProperty(jF0, "__esModule", {
    value: !0
  });
  jF0.DropAggregator = void 0;
  var Vm4 = Sg();
  class _F0 {
    kind = Vm4.AggregatorKind.DROP;
    createAccumulation() {
      return
    }
    merge(A, B) {
      return
    }
    diff(A, B) {
      return
    }
    toMetricData(A, B, Q, I) {
      return
    }
  }
  jF0.DropAggregator = _F0
})
// @from(Start 4073602, End 4077299)
bF0 = z((fF0) => {
  Object.defineProperty(fF0, "__esModule", {
    value: !0
  });
  fF0.HistogramAggregator = fF0.HistogramAccumulation = void 0;
  var Cm4 = Sg(),
    Hs = tL(),
    Km4 = gC();

  function Hm4(A) {
    let B = A.map(() => 0);
    return B.push(0), {
      buckets: {
        boundaries: A,
        counts: B
      },
      sum: 0,
      count: 0,
      hasMinMax: !1,
      min: 1 / 0,
      max: -1 / 0
    }
  }
  class zs {
    startTime;
    _boundaries;
    _recordMinMax;
    _current;
    constructor(A, B, Q = !0, I = Hm4(B)) {
      this.startTime = A, this._boundaries = B, this._recordMinMax = Q, this._current = I
    }
    record(A) {
      if (Number.isNaN(A)) return;
      if (this._current.count += 1, this._current.sum += A, this._recordMinMax) this._current.min = Math.min(A, this._current.min), this._current.max = Math.max(A, this._current.max), this._current.hasMinMax = !0;
      let B = Km4.binarySearchUB(this._boundaries, A);
      this._current.buckets.counts[B] += 1
    }
    setStartTime(A) {
      this.startTime = A
    }
    toPointValue() {
      return this._current
    }
  }
  fF0.HistogramAccumulation = zs;
  class xF0 {
    _boundaries;
    _recordMinMax;
    kind = Cm4.AggregatorKind.HISTOGRAM;
    constructor(A, B) {
      this._boundaries = A, this._recordMinMax = B
    }
    createAccumulation(A) {
      return new zs(A, this._boundaries, this._recordMinMax)
    }
    merge(A, B) {
      let Q = A.toPointValue(),
        I = B.toPointValue(),
        G = Q.buckets.counts,
        Z = I.buckets.counts,
        D = new Array(G.length);
      for (let J = 0; J < G.length; J++) D[J] = G[J] + Z[J];
      let Y = 1 / 0,
        W = -1 / 0;
      if (this._recordMinMax) {
        if (Q.hasMinMax && I.hasMinMax) Y = Math.min(Q.min, I.min), W = Math.max(Q.max, I.max);
        else if (Q.hasMinMax) Y = Q.min, W = Q.max;
        else if (I.hasMinMax) Y = I.min, W = I.max
      }
      return new zs(A.startTime, Q.buckets.boundaries, this._recordMinMax, {
        buckets: {
          boundaries: Q.buckets.boundaries,
          counts: D
        },
        count: Q.count + I.count,
        sum: Q.sum + I.sum,
        hasMinMax: this._recordMinMax && (Q.hasMinMax || I.hasMinMax),
        min: Y,
        max: W
      })
    }
    diff(A, B) {
      let Q = A.toPointValue(),
        I = B.toPointValue(),
        G = Q.buckets.counts,
        Z = I.buckets.counts,
        D = new Array(G.length);
      for (let Y = 0; Y < G.length; Y++) D[Y] = Z[Y] - G[Y];
      return new zs(B.startTime, Q.buckets.boundaries, this._recordMinMax, {
        buckets: {
          boundaries: Q.buckets.boundaries,
          counts: D
        },
        count: I.count - Q.count,
        sum: I.sum - Q.sum,
        hasMinMax: !1,
        min: 1 / 0,
        max: -1 / 0
      })
    }
    toMetricData(A, B, Q, I) {
      return {
        descriptor: A,
        aggregationTemporality: B,
        dataPointType: Hs.DataPointType.HISTOGRAM,
        dataPoints: Q.map(([G, Z]) => {
          let D = Z.toPointValue(),
            Y = A.type === Hs.InstrumentType.GAUGE || A.type === Hs.InstrumentType.UP_DOWN_COUNTER || A.type === Hs.InstrumentType.OBSERVABLE_GAUGE || A.type === Hs.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
          return {
            attributes: G,
            startTime: Z.startTime,
            endTime: I,
            value: {
              min: D.hasMinMax ? D.min : void 0,
              max: D.hasMinMax ? D.max : void 0,
              sum: !Y ? D.sum : void 0,
              buckets: D.buckets,
              count: D.count
            }
          }
        })
      }
    }
  }
  fF0.HistogramAggregator = xF0
})
// @from(Start 4077305, End 4080750)
mF0 = z((gF0) => {
  Object.defineProperty(gF0, "__esModule", {
    value: !0
  });
  gF0.Buckets = void 0;
  class Ub1 {
    backing;
    indexBase;
    indexStart;
    indexEnd;
    constructor(A = new Nb1, B = 0, Q = 0, I = 0) {
      this.backing = A, this.indexBase = B, this.indexStart = Q, this.indexEnd = I
    }
    get offset() {
      return this.indexStart
    }
    get length() {
      if (this.backing.length === 0) return 0;
      if (this.indexEnd === this.indexStart && this.at(0) === 0) return 0;
      return this.indexEnd - this.indexStart + 1
    }
    counts() {
      return Array.from({
        length: this.length
      }, (A, B) => this.at(B))
    }
    at(A) {
      let B = this.indexBase - this.indexStart;
      if (A < B) A += this.backing.length;
      return A -= B, this.backing.countAt(A)
    }
    incrementBucket(A, B) {
      this.backing.increment(A, B)
    }
    decrementBucket(A, B) {
      this.backing.decrement(A, B)
    }
    trim() {
      for (let A = 0; A < this.length; A++)
        if (this.at(A) !== 0) {
          this.indexStart += A;
          break
        } else if (A === this.length - 1) {
        this.indexStart = this.indexEnd = this.indexBase = 0;
        return
      }
      for (let A = this.length - 1; A >= 0; A--)
        if (this.at(A) !== 0) {
          this.indexEnd -= this.length - A - 1;
          break
        } this._rotate()
    }
    downscale(A) {
      this._rotate();
      let B = 1 + this.indexEnd - this.indexStart,
        Q = 1 << A,
        I = 0,
        G = 0;
      for (let Z = this.indexStart; Z <= this.indexEnd;) {
        let D = Z % Q;
        if (D < 0) D += Q;
        for (let Y = D; Y < Q && I < B; Y++) this._relocateBucket(G, I), I++, Z++;
        G++
      }
      this.indexStart >>= A, this.indexEnd >>= A, this.indexBase = this.indexStart
    }
    clone() {
      return new Ub1(this.backing.clone(), this.indexBase, this.indexStart, this.indexEnd)
    }
    _rotate() {
      let A = this.indexBase - this.indexStart;
      if (A === 0) return;
      else if (A > 0) this.backing.reverse(0, this.backing.length), this.backing.reverse(0, A), this.backing.reverse(A, this.backing.length);
      else this.backing.reverse(0, this.backing.length), this.backing.reverse(0, this.backing.length + A);
      this.indexBase = this.indexStart
    }
    _relocateBucket(A, B) {
      if (A === B) return;
      this.incrementBucket(A, this.backing.emptyBucket(B))
    }
  }
  gF0.Buckets = Ub1;
  class Nb1 {
    _counts;
    constructor(A = [0]) {
      this._counts = A
    }
    get length() {
      return this._counts.length
    }
    countAt(A) {
      return this._counts[A]
    }
    growTo(A, B, Q) {
      let I = new Array(A).fill(0);
      I.splice(Q, this._counts.length - B, ...this._counts.slice(B)), I.splice(0, B, ...this._counts.slice(0, B)), this._counts = I
    }
    reverse(A, B) {
      let Q = Math.floor((A + B) / 2) - A;
      for (let I = 0; I < Q; I++) {
        let G = this._counts[A + I];
        this._counts[A + I] = this._counts[B - I - 1], this._counts[B - I - 1] = G
      }
    }
    emptyBucket(A) {
      let B = this._counts[A];
      return this._counts[A] = 0, B
    }
    increment(A, B) {
      this._counts[A] += B
    }
    decrement(A, B) {
      if (this._counts[A] >= B) this._counts[A] -= B;
      else this._counts[A] = 0
    }
    clone() {
      return new Nb1([...this._counts])
    }
  }
})
// @from(Start 4080756, End 4081570)
qb1 = z((dF0) => {
  Object.defineProperty(dF0, "__esModule", {
    value: !0
  });
  dF0.getSignificand = dF0.getNormalBase2 = dF0.MIN_VALUE = dF0.MAX_NORMAL_EXPONENT = dF0.MIN_NORMAL_EXPONENT = dF0.SIGNIFICAND_WIDTH = void 0;
  dF0.SIGNIFICAND_WIDTH = 52;
  var wm4 = 2146435072,
    Em4 = 1048575,
    $b1 = 1023;
  dF0.MIN_NORMAL_EXPONENT = -$b1 + 1;
  dF0.MAX_NORMAL_EXPONENT = $b1;
  dF0.MIN_VALUE = Math.pow(2, -1022);

  function Um4(A) {
    let B = new DataView(new ArrayBuffer(8));
    return B.setFloat64(0, A), ((B.getUint32(0) & wm4) >> 20) - $b1
  }
  dF0.getNormalBase2 = Um4;

  function Nm4(A) {
    let B = new DataView(new ArrayBuffer(8));
    B.setFloat64(0, A);
    let Q = B.getUint32(0),
      I = B.getUint32(4);
    return (Q & Em4) * Math.pow(2, 32) + I
  }
  dF0.getSignificand = Nm4
})
// @from(Start 4081576, End 4082043)
eG1 = z((pF0) => {
  Object.defineProperty(pF0, "__esModule", {
    value: !0
  });
  pF0.nextGreaterSquare = pF0.ldexp = void 0;

  function Om4(A, B) {
    if (A === 0 || A === Number.POSITIVE_INFINITY || A === Number.NEGATIVE_INFINITY || Number.isNaN(A)) return A;
    return A * Math.pow(2, B)
  }
  pF0.ldexp = Om4;

  function Tm4(A) {
    return A--, A |= A >> 1, A |= A >> 2, A |= A >> 4, A |= A >> 8, A |= A >> 16, A++, A
  }
  pF0.nextGreaterSquare = Tm4
})
// @from(Start 4082049, End 4082218)
AZ1 = z((iF0) => {
  Object.defineProperty(iF0, "__esModule", {
    value: !0
  });
  iF0.MappingError = void 0;
  class lF0 extends Error {}
  iF0.MappingError = lF0
})
// @from(Start 4082224, End 4083519)
tF0 = z((rF0) => {
  Object.defineProperty(rF0, "__esModule", {
    value: !0
  });
  rF0.ExponentMapping = void 0;
  var _g = qb1(),
    Sm4 = eG1(),
    aF0 = AZ1();
  class sF0 {
    _shift;
    constructor(A) {
      this._shift = -A
    }
    mapToIndex(A) {
      if (A < _g.MIN_VALUE) return this._minNormalLowerBoundaryIndex();
      let B = _g.getNormalBase2(A),
        Q = this._rightShift(_g.getSignificand(A) - 1, _g.SIGNIFICAND_WIDTH);
      return B + Q >> this._shift
    }
    lowerBoundary(A) {
      let B = this._minNormalLowerBoundaryIndex();
      if (A < B) throw new aF0.MappingError(`underflow: ${A} is < minimum lower boundary: ${B}`);
      let Q = this._maxNormalLowerBoundaryIndex();
      if (A > Q) throw new aF0.MappingError(`overflow: ${A} is > maximum lower boundary: ${Q}`);
      return Sm4.ldexp(1, A << this._shift)
    }
    get scale() {
      if (this._shift === 0) return 0;
      return -this._shift
    }
    _minNormalLowerBoundaryIndex() {
      let A = _g.MIN_NORMAL_EXPONENT >> this._shift;
      if (this._shift < 2) A--;
      return A
    }
    _maxNormalLowerBoundaryIndex() {
      return _g.MAX_NORMAL_EXPONENT >> this._shift
    }
    _rightShift(A, B) {
      return Math.floor(A * Math.pow(2, -B))
    }
  }
  rF0.ExponentMapping = sF0
})
// @from(Start 4083525, End 4085159)
GX0 = z((QX0) => {
  Object.defineProperty(QX0, "__esModule", {
    value: !0
  });
  QX0.LogarithmMapping = void 0;
  var jg = qb1(),
    eF0 = eG1(),
    AX0 = AZ1();
  class BX0 {
    _scale;
    _scaleFactor;
    _inverseFactor;
    constructor(A) {
      this._scale = A, this._scaleFactor = eF0.ldexp(Math.LOG2E, A), this._inverseFactor = eF0.ldexp(Math.LN2, -A)
    }
    mapToIndex(A) {
      if (A <= jg.MIN_VALUE) return this._minNormalLowerBoundaryIndex() - 1;
      if (jg.getSignificand(A) === 0) return (jg.getNormalBase2(A) << this._scale) - 1;
      let B = Math.floor(Math.log(A) * this._scaleFactor),
        Q = this._maxNormalLowerBoundaryIndex();
      if (B >= Q) return Q;
      return B
    }
    lowerBoundary(A) {
      let B = this._maxNormalLowerBoundaryIndex();
      if (A >= B) {
        if (A === B) return 2 * Math.exp((A - (1 << this._scale)) / this._scaleFactor);
        throw new AX0.MappingError(`overflow: ${A} is > maximum lower boundary: ${B}`)
      }
      let Q = this._minNormalLowerBoundaryIndex();
      if (A <= Q) {
        if (A === Q) return jg.MIN_VALUE;
        else if (A === Q - 1) return Math.exp((A + (1 << this._scale)) / this._scaleFactor) / 2;
        throw new AX0.MappingError(`overflow: ${A} is < minimum lower boundary: ${Q}`)
      }
      return Math.exp(A * this._inverseFactor)
    }
    get scale() {
      return this._scale
    }
    _minNormalLowerBoundaryIndex() {
      return jg.MIN_NORMAL_EXPONENT << this._scale
    }
    _maxNormalLowerBoundaryIndex() {
      return (jg.MAX_NORMAL_EXPONENT + 1 << this._scale) - 1
    }
  }
  QX0.LogarithmMapping = BX0
})
// @from(Start 4085165, End 4085710)
JX0 = z((YX0) => {
  Object.defineProperty(YX0, "__esModule", {
    value: !0
  });
  YX0.getMapping = void 0;
  var _m4 = tF0(),
    jm4 = GX0(),
    ym4 = AZ1(),
    ZX0 = -10,
    DX0 = 20,
    km4 = Array.from({
      length: 31
    }, (A, B) => {
      if (B > 10) return new jm4.LogarithmMapping(B - 10);
      return new _m4.ExponentMapping(B - 10)
    });

  function xm4(A) {
    if (A > DX0 || A < ZX0) throw new ym4.MappingError(`expected scale >= ${ZX0} && <= ${DX0}, got: ${A}`);
    return km4[A + 10]
  }
  YX0.getMapping = xm4
})
// @from(Start 4085716, End 4093915)
HX0 = z((CX0) => {
  Object.defineProperty(CX0, "__esModule", {
    value: !0
  });
  CX0.ExponentialHistogramAggregator = CX0.ExponentialHistogramAccumulation = void 0;
  var fm4 = Sg(),
    ws = tL(),
    vm4 = s9(),
    FX0 = mF0(),
    XX0 = JX0(),
    bm4 = eG1();
  class yg {
    low;
    high;
    static combine(A, B) {
      return new yg(Math.min(A.low, B.low), Math.max(A.high, B.high))
    }
    constructor(A, B) {
      this.low = A, this.high = B
    }
  }
  var gm4 = 20,
    hm4 = 160,
    Mb1 = 2;
  class BZ1 {
    startTime;
    _maxSize;
    _recordMinMax;
    _sum;
    _count;
    _zeroCount;
    _min;
    _max;
    _positive;
    _negative;
    _mapping;
    constructor(A = A, B = hm4, Q = !0, I = 0, G = 0, Z = 0, D = Number.POSITIVE_INFINITY, Y = Number.NEGATIVE_INFINITY, W = new FX0.Buckets, J = new FX0.Buckets, F = XX0.getMapping(gm4)) {
      if (this.startTime = A, this._maxSize = B, this._recordMinMax = Q, this._sum = I, this._count = G, this._zeroCount = Z, this._min = D, this._max = Y, this._positive = W, this._negative = J, this._mapping = F, this._maxSize < Mb1) vm4.diag.warn(`Exponential Histogram Max Size set to ${this._maxSize},                 changing to the minimum size of: ${Mb1}`), this._maxSize = Mb1
    }
    record(A) {
      this.updateByIncrement(A, 1)
    }
    setStartTime(A) {
      this.startTime = A
    }
    toPointValue() {
      return {
        hasMinMax: this._recordMinMax,
        min: this.min,
        max: this.max,
        sum: this.sum,
        positive: {
          offset: this.positive.offset,
          bucketCounts: this.positive.counts()
        },
        negative: {
          offset: this.negative.offset,
          bucketCounts: this.negative.counts()
        },
        count: this.count,
        scale: this.scale,
        zeroCount: this.zeroCount
      }
    }
    get sum() {
      return this._sum
    }
    get min() {
      return this._min
    }
    get max() {
      return this._max
    }
    get count() {
      return this._count
    }
    get zeroCount() {
      return this._zeroCount
    }
    get scale() {
      if (this._count === this._zeroCount) return 0;
      return this._mapping.scale
    }
    get positive() {
      return this._positive
    }
    get negative() {
      return this._negative
    }
    updateByIncrement(A, B) {
      if (Number.isNaN(A)) return;
      if (A > this._max) this._max = A;
      if (A < this._min) this._min = A;
      if (this._count += B, A === 0) {
        this._zeroCount += B;
        return
      }
      if (this._sum += A * B, A > 0) this._updateBuckets(this._positive, A, B);
      else this._updateBuckets(this._negative, -A, B)
    }
    merge(A) {
      if (this._count === 0) this._min = A.min, this._max = A.max;
      else if (A.count !== 0) {
        if (A.min < this.min) this._min = A.min;
        if (A.max > this.max) this._max = A.max
      }
      this.startTime = A.startTime, this._sum += A.sum, this._count += A.count, this._zeroCount += A.zeroCount;
      let B = this._minScale(A);
      this._downscale(this.scale - B), this._mergeBuckets(this.positive, A, A.positive, B), this._mergeBuckets(this.negative, A, A.negative, B)
    }
    diff(A) {
      this._min = 1 / 0, this._max = -1 / 0, this._sum -= A.sum, this._count -= A.count, this._zeroCount -= A.zeroCount;
      let B = this._minScale(A);
      this._downscale(this.scale - B), this._diffBuckets(this.positive, A, A.positive, B), this._diffBuckets(this.negative, A, A.negative, B)
    }
    clone() {
      return new BZ1(this.startTime, this._maxSize, this._recordMinMax, this._sum, this._count, this._zeroCount, this._min, this._max, this.positive.clone(), this.negative.clone(), this._mapping)
    }
    _updateBuckets(A, B, Q) {
      let I = this._mapping.mapToIndex(B),
        G = !1,
        Z = 0,
        D = 0;
      if (A.length === 0) A.indexStart = I, A.indexEnd = A.indexStart, A.indexBase = A.indexStart;
      else if (I < A.indexStart && A.indexEnd - I >= this._maxSize) G = !0, D = I, Z = A.indexEnd;
      else if (I > A.indexEnd && I - A.indexStart >= this._maxSize) G = !0, D = A.indexStart, Z = I;
      if (G) {
        let Y = this._changeScale(Z, D);
        this._downscale(Y), I = this._mapping.mapToIndex(B)
      }
      this._incrementIndexBy(A, I, Q)
    }
    _incrementIndexBy(A, B, Q) {
      if (Q === 0) return;
      if (A.length === 0) A.indexStart = A.indexEnd = A.indexBase = B;
      if (B < A.indexStart) {
        let G = A.indexEnd - B;
        if (G >= A.backing.length) this._grow(A, G + 1);
        A.indexStart = B
      } else if (B > A.indexEnd) {
        let G = B - A.indexStart;
        if (G >= A.backing.length) this._grow(A, G + 1);
        A.indexEnd = B
      }
      let I = B - A.indexBase;
      if (I < 0) I += A.backing.length;
      A.incrementBucket(I, Q)
    }
    _grow(A, B) {
      let Q = A.backing.length,
        I = A.indexBase - A.indexStart,
        G = Q - I,
        Z = bm4.nextGreaterSquare(B);
      if (Z > this._maxSize) Z = this._maxSize;
      let D = Z - I;
      A.backing.growTo(Z, G, D)
    }
    _changeScale(A, B) {
      let Q = 0;
      while (A - B >= this._maxSize) A >>= 1, B >>= 1, Q++;
      return Q
    }
    _downscale(A) {
      if (A === 0) return;
      if (A < 0) throw new Error(`impossible change of scale: ${this.scale}`);
      let B = this._mapping.scale - A;
      this._positive.downscale(A), this._negative.downscale(A), this._mapping = XX0.getMapping(B)
    }
    _minScale(A) {
      let B = Math.min(this.scale, A.scale),
        Q = yg.combine(this._highLowAtScale(this.positive, this.scale, B), this._highLowAtScale(A.positive, A.scale, B)),
        I = yg.combine(this._highLowAtScale(this.negative, this.scale, B), this._highLowAtScale(A.negative, A.scale, B));
      return Math.min(B - this._changeScale(Q.high, Q.low), B - this._changeScale(I.high, I.low))
    }
    _highLowAtScale(A, B, Q) {
      if (A.length === 0) return new yg(0, -1);
      let I = B - Q;
      return new yg(A.indexStart >> I, A.indexEnd >> I)
    }
    _mergeBuckets(A, B, Q, I) {
      let G = Q.offset,
        Z = B.scale - I;
      for (let D = 0; D < Q.length; D++) this._incrementIndexBy(A, G + D >> Z, Q.at(D))
    }
    _diffBuckets(A, B, Q, I) {
      let G = Q.offset,
        Z = B.scale - I;
      for (let D = 0; D < Q.length; D++) {
        let W = (G + D >> Z) - A.indexBase;
        if (W < 0) W += A.backing.length;
        A.decrementBucket(W, Q.at(D))
      }
      A.trim()
    }
  }
  CX0.ExponentialHistogramAccumulation = BZ1;
  class VX0 {
    _maxSize;
    _recordMinMax;
    kind = fm4.AggregatorKind.EXPONENTIAL_HISTOGRAM;
    constructor(A, B) {
      this._maxSize = A, this._recordMinMax = B
    }
    createAccumulation(A) {
      return new BZ1(A, this._maxSize, this._recordMinMax)
    }
    merge(A, B) {
      let Q = B.clone();
      return Q.merge(A), Q
    }
    diff(A, B) {
      let Q = B.clone();
      return Q.diff(A), Q
    }
    toMetricData(A, B, Q, I) {
      return {
        descriptor: A,
        aggregationTemporality: B,
        dataPointType: ws.DataPointType.EXPONENTIAL_HISTOGRAM,
        dataPoints: Q.map(([G, Z]) => {
          let D = Z.toPointValue(),
            Y = A.type === ws.InstrumentType.GAUGE || A.type === ws.InstrumentType.UP_DOWN_COUNTER || A.type === ws.InstrumentType.OBSERVABLE_GAUGE || A.type === ws.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
          return {
            attributes: G,
            startTime: Z.startTime,
            endTime: I,
            value: {
              min: D.hasMinMax ? D.min : void 0,
              max: D.hasMinMax ? D.max : void 0,
              sum: !Y ? D.sum : void 0,
              positive: {
                offset: D.positive.offset,
                bucketCounts: D.positive.bucketCounts
              },
              negative: {
                offset: D.negative.offset,
                bucketCounts: D.negative.bucketCounts
              },
              count: D.count,
              scale: D.scale,
              zeroCount: D.zeroCount
            }
          }
        })
      }
    }
  }
  CX0.ExponentialHistogramAggregator = VX0
})
// @from(Start 4093921, End 4094450)
Es = z((zX0) => {
  Object.defineProperty(zX0, "__esModule", {
    value: !0
  });
  zX0.isTracingSuppressed = zX0.unsuppressTracing = zX0.suppressTracing = void 0;
  var dm4 = s9(),
    Lb1 = dm4.createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");

  function um4(A) {
    return A.setValue(Lb1, !0)
  }
  zX0.suppressTracing = um4;

  function pm4(A) {
    return A.deleteValue(Lb1)
  }
  zX0.unsuppressTracing = pm4;

  function cm4(A) {
    return A.getValue(Lb1) === !0
  }
  zX0.isTracingSuppressed = cm4
})
// @from(Start 4094456, End 4095056)
Rb1 = z((EX0) => {
  Object.defineProperty(EX0, "__esModule", {
    value: !0
  });
  EX0.BAGGAGE_MAX_TOTAL_LENGTH = EX0.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = EX0.BAGGAGE_MAX_NAME_VALUE_PAIRS = EX0.BAGGAGE_HEADER = EX0.BAGGAGE_ITEMS_SEPARATOR = EX0.BAGGAGE_PROPERTIES_SEPARATOR = EX0.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
  EX0.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
  EX0.BAGGAGE_PROPERTIES_SEPARATOR = ";";
  EX0.BAGGAGE_ITEMS_SEPARATOR = ",";
  EX0.BAGGAGE_HEADER = "baggage";
  EX0.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
  EX0.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
  EX0.BAGGAGE_MAX_TOTAL_LENGTH = 8192
})
// @from(Start 4095062, End 4096678)
Ob1 = z(($X0) => {
  Object.defineProperty($X0, "__esModule", {
    value: !0
  });
  $X0.parseKeyPairsIntoRecord = $X0.parsePairKeyValue = $X0.getKeyPairs = $X0.serializeKeyPairs = void 0;
  var em4 = s9(),
    T_ = Rb1();

  function Ad4(A) {
    return A.reduce((B, Q) => {
      let I = `${B}${B!==""?T_.BAGGAGE_ITEMS_SEPARATOR:""}${Q}`;
      return I.length > T_.BAGGAGE_MAX_TOTAL_LENGTH ? B : I
    }, "")
  }
  $X0.serializeKeyPairs = Ad4;

  function Bd4(A) {
    return A.getAllEntries().map(([B, Q]) => {
      let I = `${encodeURIComponent(B)}=${encodeURIComponent(Q.value)}`;
      if (Q.metadata !== void 0) I += T_.BAGGAGE_PROPERTIES_SEPARATOR + Q.metadata.toString();
      return I
    })
  }
  $X0.getKeyPairs = Bd4;

  function NX0(A) {
    let B = A.split(T_.BAGGAGE_PROPERTIES_SEPARATOR);
    if (B.length <= 0) return;
    let Q = B.shift();
    if (!Q) return;
    let I = Q.indexOf(T_.BAGGAGE_KEY_PAIR_SEPARATOR);
    if (I <= 0) return;
    let G = decodeURIComponent(Q.substring(0, I).trim()),
      Z = decodeURIComponent(Q.substring(I + 1).trim()),
      D;
    if (B.length > 0) D = em4.baggageEntryMetadataFromString(B.join(T_.BAGGAGE_PROPERTIES_SEPARATOR));
    return {
      key: G,
      value: Z,
      metadata: D
    }
  }
  $X0.parsePairKeyValue = NX0;

  function Qd4(A) {
    if (typeof A !== "string" || A.length === 0) return {};
    return A.split(T_.BAGGAGE_ITEMS_SEPARATOR).map((B) => {
      return NX0(B)
    }).filter((B) => B !== void 0 && B.value.length > 0).reduce((B, Q) => {
      return B[Q.key] = Q.value, B
    }, {})
  }
  $X0.parseKeyPairsIntoRecord = Qd4
})
// @from(Start 4096684, End 4097999)
OX0 = z((LX0) => {
  Object.defineProperty(LX0, "__esModule", {
    value: !0
  });
  LX0.W3CBaggagePropagator = void 0;
  var Tb1 = s9(),
    Dd4 = Es(),
    P_ = Rb1(),
    Pb1 = Ob1();
  class MX0 {
    inject(A, B, Q) {
      let I = Tb1.propagation.getBaggage(A);
      if (!I || Dd4.isTracingSuppressed(A)) return;
      let G = Pb1.getKeyPairs(I).filter((D) => {
          return D.length <= P_.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS
        }).slice(0, P_.BAGGAGE_MAX_NAME_VALUE_PAIRS),
        Z = Pb1.serializeKeyPairs(G);
      if (Z.length > 0) Q.set(B, P_.BAGGAGE_HEADER, Z)
    }
    extract(A, B, Q) {
      let I = Q.get(B, P_.BAGGAGE_HEADER),
        G = Array.isArray(I) ? I.join(P_.BAGGAGE_ITEMS_SEPARATOR) : I;
      if (!G) return A;
      let Z = {};
      if (G.length === 0) return A;
      if (G.split(P_.BAGGAGE_ITEMS_SEPARATOR).forEach((Y) => {
          let W = Pb1.parsePairKeyValue(Y);
          if (W) {
            let J = {
              value: W.value
            };
            if (W.metadata) J.metadata = W.metadata;
            Z[W.key] = J
          }
        }), Object.entries(Z).length === 0) return A;
      return Tb1.propagation.setBaggage(A, Tb1.propagation.createBaggage(Z))
    }
    fields() {
      return [P_.BAGGAGE_HEADER]
    }
  }
  LX0.W3CBaggagePropagator = MX0
})
// @from(Start 4098005, End 4098474)
_X0 = z((PX0) => {
  Object.defineProperty(PX0, "__esModule", {
    value: !0
  });
  PX0.AnchoredClock = void 0;
  class TX0 {
    _monotonicClock;
    _epochMillis;
    _performanceMillis;
    constructor(A, B) {
      this._monotonicClock = B, this._epochMillis = A.now(), this._performanceMillis = B.now()
    }
    now() {
      let A = this._monotonicClock.now() - this._performanceMillis;
      return this._epochMillis + A
    }
  }
  PX0.AnchoredClock = TX0
})
// @from(Start 4098480, End 4099809)
bX0 = z((fX0) => {
  Object.defineProperty(fX0, "__esModule", {
    value: !0
  });
  fX0.isAttributeValue = fX0.isAttributeKey = fX0.sanitizeAttributes = void 0;
  var jX0 = s9();

  function Yd4(A) {
    let B = {};
    if (typeof A !== "object" || A == null) return B;
    for (let [Q, I] of Object.entries(A)) {
      if (!yX0(Q)) {
        jX0.diag.warn(`Invalid attribute key: ${Q}`);
        continue
      }
      if (!kX0(I)) {
        jX0.diag.warn(`Invalid attribute value set for key: ${Q}`);
        continue
      }
      if (Array.isArray(I)) B[Q] = I.slice();
      else B[Q] = I
    }
    return B
  }
  fX0.sanitizeAttributes = Yd4;

  function yX0(A) {
    return typeof A === "string" && A.length > 0
  }
  fX0.isAttributeKey = yX0;

  function kX0(A) {
    if (A == null) return !0;
    if (Array.isArray(A)) return Wd4(A);
    return xX0(A)
  }
  fX0.isAttributeValue = kX0;

  function Wd4(A) {
    let B;
    for (let Q of A) {
      if (Q == null) continue;
      if (!B) {
        if (xX0(Q)) {
          B = typeof Q;
          continue
        }
        return !1
      }
      if (typeof Q === B) continue;
      return !1
    }
    return !0
  }

  function xX0(A) {
    switch (typeof A) {
      case "number":
      case "boolean":
      case "string":
        return !0
    }
    return !1
  }
})
// @from(Start 4099815, End 4100421)
Sb1 = z((gX0) => {
  Object.defineProperty(gX0, "__esModule", {
    value: !0
  });
  gX0.loggingErrorHandler = void 0;
  var Xd4 = s9();

  function Vd4() {
    return (A) => {
      Xd4.diag.error(Cd4(A))
    }
  }
  gX0.loggingErrorHandler = Vd4;

  function Cd4(A) {
    if (typeof A === "string") return A;
    else return JSON.stringify(Kd4(A))
  }

  function Kd4(A) {
    let B = {},
      Q = A;
    while (Q !== null) Object.getOwnPropertyNames(Q).forEach((I) => {
      if (B[I]) return;
      let G = Q[I];
      if (G) B[I] = String(G)
    }), Q = Object.getPrototypeOf(Q);
    return B
  }
})
// @from(Start 4100427, End 4100798)
pX0 = z((dX0) => {
  Object.defineProperty(dX0, "__esModule", {
    value: !0
  });
  dX0.globalErrorHandler = dX0.setGlobalErrorHandler = void 0;
  var Hd4 = Sb1(),
    mX0 = Hd4.loggingErrorHandler();

  function zd4(A) {
    mX0 = A
  }
  dX0.setGlobalErrorHandler = zd4;

  function wd4(A) {
    try {
      mX0(A)
    } catch {}
  }
  dX0.globalErrorHandler = wd4
})
// @from(Start 4100804, End 4101977)
sX0 = z((nX0) => {
  Object.defineProperty(nX0, "__esModule", {
    value: !0
  });
  nX0.getStringListFromEnv = nX0.getBooleanFromEnv = nX0.getStringFromEnv = nX0.getNumberFromEnv = void 0;
  var cX0 = s9(),
    lX0 = Z1("util");

  function Ud4(A) {
    let B = process.env[A];
    if (B == null || B.trim() === "") return;
    let Q = Number(B);
    if (isNaN(Q)) {
      cX0.diag.warn(`Unknown value ${lX0.inspect(B)} for ${A}, expected a number, using defaults`);
      return
    }
    return Q
  }
  nX0.getNumberFromEnv = Ud4;

  function iX0(A) {
    let B = process.env[A];
    if (B == null || B.trim() === "") return;
    return B
  }
  nX0.getStringFromEnv = iX0;

  function Nd4(A) {
    let B = process.env[A]?.trim().toLowerCase();
    if (B == null || B === "") return !1;
    if (B === "true") return !0;
    else if (B === "false") return !1;
    else return cX0.diag.warn(`Unknown value ${lX0.inspect(B)} for ${A}, expected 'true' or 'false', falling back to 'false' (default)`), !1
  }
  nX0.getBooleanFromEnv = Nd4;

  function $d4(A) {
    return iX0(A)?.split(",").map((B) => B.trim()).filter((B) => B !== "")
  }
  nX0.getStringListFromEnv = $d4
})
// @from(Start 4101983, End 4102170)
tX0 = z((rX0) => {
  Object.defineProperty(rX0, "__esModule", {
    value: !0
  });
  rX0._globalThis = void 0;
  rX0._globalThis = typeof globalThis === "object" ? globalThis : global
})
// @from(Start 4102176, End 4102360)
BV0 = z((eX0) => {
  Object.defineProperty(eX0, "__esModule", {
    value: !0
  });
  eX0.otperformance = void 0;
  var Rd4 = Z1("perf_hooks");
  eX0.otperformance = Rd4.performance
})
// @from(Start 4102366, End 4102500)
GV0 = z((QV0) => {
  Object.defineProperty(QV0, "__esModule", {
    value: !0
  });
  QV0.VERSION = void 0;
  QV0.VERSION = "2.0.0"
})
// @from(Start 4102506, End 4102850)
_b1 = z((ZV0) => {
  Object.defineProperty(ZV0, "__esModule", {
    value: !0
  });
  ZV0.createConstMap = void 0;

  function Od4(A) {
    let B = {},
      Q = A.length;
    for (let I = 0; I < Q; I++) {
      let G = A[I];
      if (G) B[String(G).toUpperCase().replace(/[-.]/g, "_")] = G
    }
    return B
  }
  ZV0.createConstMap = Od4
})