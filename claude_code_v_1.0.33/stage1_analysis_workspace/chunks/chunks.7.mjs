
// @from(Start 650506, End 656272)
vJA = z((fJA) => {
  Object.defineProperty(fJA, "__esModule", {
    value: !0
  });
  var d2 = z4(),
    lJ9 = vZA(),
    iJ9 = Qq1(),
    nJ9 = Zq1(),
    zl = Eq1(),
    Tq1 = rA(),
    aJ9 = RYA(),
    jJA = wq1(),
    sJ9 = kYA(),
    rJ9 = uYA(),
    oJ9 = oYA(),
    tJ9 = eYA(),
    WM = UJA(),
    eJ9 = S41(),
    AF9 = m41(),
    BF9 = u41(),
    QF9 = b41(),
    IF9 = y41(),
    GF9 = _41(),
    ZF9 = v41(),
    DF9 = p41(),
    YF9 = a41(),
    yJA = Mq1(),
    kJA = l41(),
    xJA = k41(),
    WF9 = qq1(),
    JF9 = RJA(),
    FF9 = PJA(),
    XF9 = _JA(),
    VF9 = jJA.createGetModuleFromFilename(),
    CF9 = {
      ...d2.Integrations,
      ...oJ9,
      ...tJ9
    },
    KF9 = {
      instrumentCron: JF9.instrumentCron,
      instrumentNodeCron: FF9.instrumentNodeCron,
      instrumentNodeSchedule: XF9.instrumentNodeSchedule
    };
  fJA.Hub = d2.Hub;
  fJA.SDK_VERSION = d2.SDK_VERSION;
  fJA.SEMANTIC_ATTRIBUTE_SENTRY_OP = d2.SEMANTIC_ATTRIBUTE_SENTRY_OP;
  fJA.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = d2.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN;
  fJA.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = d2.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE;
  fJA.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = d2.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE;
  fJA.Scope = d2.Scope;
  fJA.addBreadcrumb = d2.addBreadcrumb;
  fJA.addEventProcessor = d2.addEventProcessor;
  fJA.addGlobalEventProcessor = d2.addGlobalEventProcessor;
  fJA.addIntegration = d2.addIntegration;
  fJA.captureCheckIn = d2.captureCheckIn;
  fJA.captureEvent = d2.captureEvent;
  fJA.captureException = d2.captureException;
  fJA.captureMessage = d2.captureMessage;
  fJA.captureSession = d2.captureSession;
  fJA.close = d2.close;
  fJA.configureScope = d2.configureScope;
  fJA.continueTrace = d2.continueTrace;
  fJA.createTransport = d2.createTransport;
  fJA.endSession = d2.endSession;
  fJA.extractTraceparentData = d2.extractTraceparentData;
  fJA.flush = d2.flush;
  fJA.functionToStringIntegration = d2.functionToStringIntegration;
  fJA.getActiveSpan = d2.getActiveSpan;
  fJA.getActiveTransaction = d2.getActiveTransaction;
  fJA.getClient = d2.getClient;
  fJA.getCurrentHub = d2.getCurrentHub;
  fJA.getCurrentScope = d2.getCurrentScope;
  fJA.getGlobalScope = d2.getGlobalScope;
  fJA.getHubFromCarrier = d2.getHubFromCarrier;
  fJA.getIsolationScope = d2.getIsolationScope;
  fJA.getSpanStatusFromHttpCode = d2.getSpanStatusFromHttpCode;
  fJA.inboundFiltersIntegration = d2.inboundFiltersIntegration;
  fJA.isInitialized = d2.isInitialized;
  fJA.lastEventId = d2.lastEventId;
  fJA.linkedErrorsIntegration = d2.linkedErrorsIntegration;
  fJA.makeMain = d2.makeMain;
  fJA.metrics = d2.metrics;
  fJA.parameterize = d2.parameterize;
  fJA.requestDataIntegration = d2.requestDataIntegration;
  fJA.runWithAsyncContext = d2.runWithAsyncContext;
  fJA.setContext = d2.setContext;
  fJA.setCurrentClient = d2.setCurrentClient;
  fJA.setExtra = d2.setExtra;
  fJA.setExtras = d2.setExtras;
  fJA.setHttpStatus = d2.setHttpStatus;
  fJA.setMeasurement = d2.setMeasurement;
  fJA.setTag = d2.setTag;
  fJA.setTags = d2.setTags;
  fJA.setUser = d2.setUser;
  fJA.spanStatusfromHttpCode = d2.spanStatusfromHttpCode;
  fJA.startActiveSpan = d2.startActiveSpan;
  fJA.startInactiveSpan = d2.startInactiveSpan;
  fJA.startSession = d2.startSession;
  fJA.startSpan = d2.startSpan;
  fJA.startSpanManual = d2.startSpanManual;
  fJA.startTransaction = d2.startTransaction;
  fJA.trace = d2.trace;
  fJA.withActiveSpan = d2.withActiveSpan;
  fJA.withIsolationScope = d2.withIsolationScope;
  fJA.withMonitor = d2.withMonitor;
  fJA.withScope = d2.withScope;
  fJA.autoDiscoverNodePerformanceMonitoringIntegrations = lJ9.autoDiscoverNodePerformanceMonitoringIntegrations;
  fJA.NodeClient = iJ9.NodeClient;
  fJA.makeNodeTransport = nJ9.makeNodeTransport;
  fJA.defaultIntegrations = zl.defaultIntegrations;
  fJA.defaultStackParser = zl.defaultStackParser;
  fJA.getDefaultIntegrations = zl.getDefaultIntegrations;
  fJA.getSentryRelease = zl.getSentryRelease;
  fJA.init = zl.init;
  fJA.DEFAULT_USER_INCLUDES = Tq1.DEFAULT_USER_INCLUDES;
  fJA.addRequestDataToEvent = Tq1.addRequestDataToEvent;
  fJA.extractRequestData = Tq1.extractRequestData;
  fJA.deepReadDirSync = aJ9.deepReadDirSync;
  fJA.createGetModuleFromFilename = jJA.createGetModuleFromFilename;
  fJA.enableAnrDetection = sJ9.enableAnrDetection;
  fJA.Handlers = rJ9;
  fJA.captureConsoleIntegration = WM.captureConsoleIntegration;
  fJA.debugIntegration = WM.debugIntegration;
  fJA.dedupeIntegration = WM.dedupeIntegration;
  fJA.extraErrorDataIntegration = WM.extraErrorDataIntegration;
  fJA.httpClientIntegration = WM.httpClientIntegration;
  fJA.reportingObserverIntegration = WM.reportingObserverIntegration;
  fJA.rewriteFramesIntegration = WM.rewriteFramesIntegration;
  fJA.sessionTimingIntegration = WM.sessionTimingIntegration;
  fJA.consoleIntegration = eJ9.consoleIntegration;
  fJA.onUncaughtExceptionIntegration = AF9.onUncaughtExceptionIntegration;
  fJA.onUnhandledRejectionIntegration = BF9.onUnhandledRejectionIntegration;
  fJA.modulesIntegration = QF9.modulesIntegration;
  fJA.contextLinesIntegration = IF9.contextLinesIntegration;
  fJA.nodeContextIntegration = GF9.nodeContextIntegration;
  fJA.localVariablesIntegration = ZF9.localVariablesIntegration;
  fJA.spotlightIntegration = DF9.spotlightIntegration;
  fJA.anrIntegration = YF9.anrIntegration;
  fJA.hapiErrorPlugin = yJA.hapiErrorPlugin;
  fJA.hapiIntegration = yJA.hapiIntegration;
  fJA.Undici = kJA.Undici;
  fJA.nativeNodeFetchintegration = kJA.nativeNodeFetchintegration;
  fJA.Http = xJA.Http;
  fJA.httpIntegration = xJA.httpIntegration;
  fJA.trpcMiddleware = WF9.trpcMiddleware;
  fJA.Integrations = CF9;
  fJA.cron = KF9;
  fJA.getModuleFromFilename = VF9
})
// @from(Start 656278, End 665637)
U1 = z((SV9) => {
  var wl = Symbol.for("react.element"),
    KV9 = Symbol.for("react.portal"),
    HV9 = Symbol.for("react.fragment"),
    zV9 = Symbol.for("react.strict_mode"),
    wV9 = Symbol.for("react.profiler"),
    EV9 = Symbol.for("react.provider"),
    UV9 = Symbol.for("react.context"),
    NV9 = Symbol.for("react.forward_ref"),
    $V9 = Symbol.for("react.suspense"),
    qV9 = Symbol.for("react.memo"),
    MV9 = Symbol.for("react.lazy"),
    hJA = Symbol.iterator;

  function LV9(A) {
    if (A === null || typeof A !== "object") return null;
    return A = hJA && A[hJA] || A["@@iterator"], typeof A === "function" ? A : null
  }
  var uJA = {
      isMounted: function() {
        return !1
      },
      enqueueForceUpdate: function() {},
      enqueueReplaceState: function() {},
      enqueueSetState: function() {}
    },
    pJA = Object.assign,
    cJA = {};

  function vx(A, B, Q) {
    this.props = A, this.context = B, this.refs = cJA, this.updater = Q || uJA
  }
  vx.prototype.isReactComponent = {};
  vx.prototype.setState = function(A, B) {
    if (typeof A !== "object" && typeof A !== "function" && A != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, A, B, "setState")
  };
  vx.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate")
  };

  function lJA() {}
  lJA.prototype = vx.prototype;

  function Sq1(A, B, Q) {
    this.props = A, this.context = B, this.refs = cJA, this.updater = Q || uJA
  }
  var _q1 = Sq1.prototype = new lJA;
  _q1.constructor = Sq1;
  pJA(_q1, vx.prototype);
  _q1.isPureReactComponent = !0;
  var mJA = Array.isArray,
    iJA = Object.prototype.hasOwnProperty,
    jq1 = {
      current: null
    },
    nJA = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    };

  function aJA(A, B, Q) {
    var I, G = {},
      Z = null,
      D = null;
    if (B != null)
      for (I in B.ref !== void 0 && (D = B.ref), B.key !== void 0 && (Z = "" + B.key), B) iJA.call(B, I) && !nJA.hasOwnProperty(I) && (G[I] = B[I]);
    var Y = arguments.length - 2;
    if (Y === 1) G.children = Q;
    else if (1 < Y) {
      for (var W = Array(Y), J = 0; J < Y; J++) W[J] = arguments[J + 2];
      G.children = W
    }
    if (A && A.defaultProps)
      for (I in Y = A.defaultProps, Y) G[I] === void 0 && (G[I] = Y[I]);
    return {
      $$typeof: wl,
      type: A,
      key: Z,
      ref: D,
      props: G,
      _owner: jq1.current
    }
  }

  function RV9(A, B) {
    return {
      $$typeof: wl,
      type: A.type,
      key: B,
      ref: A.ref,
      props: A.props,
      _owner: A._owner
    }
  }

  function yq1(A) {
    return typeof A === "object" && A !== null && A.$$typeof === wl
  }

  function OV9(A) {
    var B = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + A.replace(/[=:]/g, function(Q) {
      return B[Q]
    })
  }
  var dJA = /\/+/g;

  function Pq1(A, B) {
    return typeof A === "object" && A !== null && A.key != null ? OV9("" + A.key) : B.toString(36)
  }

  function A61(A, B, Q, I, G) {
    var Z = typeof A;
    if (Z === "undefined" || Z === "boolean") A = null;
    var D = !1;
    if (A === null) D = !0;
    else switch (Z) {
      case "string":
      case "number":
        D = !0;
        break;
      case "object":
        switch (A.$$typeof) {
          case wl:
          case KV9:
            D = !0
        }
    }
    if (D) return D = A, G = G(D), A = I === "" ? "." + Pq1(D, 0) : I, mJA(G) ? (Q = "", A != null && (Q = A.replace(dJA, "$&/") + "/"), A61(G, B, Q, "", function(J) {
      return J
    })) : G != null && (yq1(G) && (G = RV9(G, Q + (!G.key || D && D.key === G.key ? "" : ("" + G.key).replace(dJA, "$&/") + "/") + A)), B.push(G)), 1;
    if (D = 0, I = I === "" ? "." : I + ":", mJA(A))
      for (var Y = 0; Y < A.length; Y++) {
        Z = A[Y];
        var W = I + Pq1(Z, Y);
        D += A61(Z, B, Q, W, G)
      } else if (W = LV9(A), typeof W === "function")
        for (A = W.call(A), Y = 0; !(Z = A.next()).done;) Z = Z.value, W = I + Pq1(Z, Y++), D += A61(Z, B, Q, W, G);
      else if (Z === "object") throw B = String(A), Error("Objects are not valid as a React child (found: " + (B === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : B) + "). If you meant to render a collection of children, use an array instead.");
    return D
  }

  function e41(A, B, Q) {
    if (A == null) return A;
    var I = [],
      G = 0;
    return A61(A, I, "", "", function(Z) {
      return B.call(Q, Z, G++)
    }), I
  }

  function TV9(A) {
    if (A._status === -1) {
      var B = A._result;
      B = B(), B.then(function(Q) {
        if (A._status === 0 || A._status === -1) A._status = 1, A._result = Q
      }, function(Q) {
        if (A._status === 0 || A._status === -1) A._status = 2, A._result = Q
      }), A._status === -1 && (A._status = 0, A._result = B)
    }
    if (A._status === 1) return A._result.default;
    throw A._result
  }
  var $D = {
      current: null
    },
    B61 = {
      transition: null
    },
    PV9 = {
      ReactCurrentDispatcher: $D,
      ReactCurrentBatchConfig: B61,
      ReactCurrentOwner: jq1
    };

  function sJA() {
    throw Error("act(...) is not supported in production builds of React.")
  }
  SV9.Children = {
    map: e41,
    forEach: function(A, B, Q) {
      e41(A, function() {
        B.apply(this, arguments)
      }, Q)
    },
    count: function(A) {
      var B = 0;
      return e41(A, function() {
        B++
      }), B
    },
    toArray: function(A) {
      return e41(A, function(B) {
        return B
      }) || []
    },
    only: function(A) {
      if (!yq1(A)) throw Error("React.Children.only expected to receive a single React element child.");
      return A
    }
  };
  SV9.Component = vx;
  SV9.Fragment = HV9;
  SV9.Profiler = wV9;
  SV9.PureComponent = Sq1;
  SV9.StrictMode = zV9;
  SV9.Suspense = $V9;
  SV9.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = PV9;
  SV9.act = sJA;
  SV9.cloneElement = function(A, B, Q) {
    if (A === null || A === void 0) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + A + ".");
    var I = pJA({}, A.props),
      G = A.key,
      Z = A.ref,
      D = A._owner;
    if (B != null) {
      if (B.ref !== void 0 && (Z = B.ref, D = jq1.current), B.key !== void 0 && (G = "" + B.key), A.type && A.type.defaultProps) var Y = A.type.defaultProps;
      for (W in B) iJA.call(B, W) && !nJA.hasOwnProperty(W) && (I[W] = B[W] === void 0 && Y !== void 0 ? Y[W] : B[W])
    }
    var W = arguments.length - 2;
    if (W === 1) I.children = Q;
    else if (1 < W) {
      Y = Array(W);
      for (var J = 0; J < W; J++) Y[J] = arguments[J + 2];
      I.children = Y
    }
    return {
      $$typeof: wl,
      type: A.type,
      key: G,
      ref: Z,
      props: I,
      _owner: D
    }
  };
  SV9.createContext = function(A) {
    return A = {
      $$typeof: UV9,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null
    }, A.Provider = {
      $$typeof: EV9,
      _context: A
    }, A.Consumer = A
  };
  SV9.createElement = aJA;
  SV9.createFactory = function(A) {
    var B = aJA.bind(null, A);
    return B.type = A, B
  };
  SV9.createRef = function() {
    return {
      current: null
    }
  };
  SV9.forwardRef = function(A) {
    return {
      $$typeof: NV9,
      render: A
    }
  };
  SV9.isValidElement = yq1;
  SV9.lazy = function(A) {
    return {
      $$typeof: MV9,
      _payload: {
        _status: -1,
        _result: A
      },
      _init: TV9
    }
  };
  SV9.memo = function(A, B) {
    return {
      $$typeof: qV9,
      type: A,
      compare: B === void 0 ? null : B
    }
  };
  SV9.startTransition = function(A) {
    var B = B61.transition;
    B61.transition = {};
    try {
      A()
    } finally {
      B61.transition = B
    }
  };
  SV9.unstable_act = sJA;
  SV9.useCallback = function(A, B) {
    return $D.current.useCallback(A, B)
  };
  SV9.useContext = function(A) {
    return $D.current.useContext(A)
  };
  SV9.useDebugValue = function() {};
  SV9.useDeferredValue = function(A) {
    return $D.current.useDeferredValue(A)
  };
  SV9.useEffect = function(A, B) {
    return $D.current.useEffect(A, B)
  };
  SV9.useId = function() {
    return $D.current.useId()
  };
  SV9.useImperativeHandle = function(A, B, Q) {
    return $D.current.useImperativeHandle(A, B, Q)
  };
  SV9.useInsertionEffect = function(A, B) {
    return $D.current.useInsertionEffect(A, B)
  };
  SV9.useLayoutEffect = function(A, B) {
    return $D.current.useLayoutEffect(A, B)
  };
  SV9.useMemo = function(A, B) {
    return $D.current.useMemo(A, B)
  };
  SV9.useReducer = function(A, B, Q) {
    return $D.current.useReducer(A, B, Q)
  };
  SV9.useRef = function(A) {
    return $D.current.useRef(A)
  };
  SV9.useState = function(A) {
    return $D.current.useState(A)
  };
  SV9.useSyncExternalStore = function(A, B, Q) {
    return $D.current.useSyncExternalStore(A, B, Q)
  };
  SV9.useTransition = function() {
    return $D.current.useTransition()
  };
  SV9.version = "18.3.1"
})
// @from(Start 665643, End 667603)
YFA = z((Tg5, DFA) => {
  var ZFA = Z1("stream").Stream,
    rC9 = Z1("util");
  DFA.exports = QC;

  function QC() {
    this.source = null, this.dataSize = 0, this.maxDataSize = 1048576, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = []
  }
  rC9.inherits(QC, ZFA);
  QC.create = function(A, B) {
    var Q = new this;
    B = B || {};
    for (var I in B) Q[I] = B[I];
    Q.source = A;
    var G = A.emit;
    if (A.emit = function() {
        return Q._handleEmit(arguments), G.apply(A, arguments)
      }, A.on("error", function() {}), Q.pauseStream) A.pause();
    return Q
  };
  Object.defineProperty(QC.prototype, "readable", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.source.readable
    }
  });
  QC.prototype.setEncoding = function() {
    return this.source.setEncoding.apply(this.source, arguments)
  };
  QC.prototype.resume = function() {
    if (!this._released) this.release();
    this.source.resume()
  };
  QC.prototype.pause = function() {
    this.source.pause()
  };
  QC.prototype.release = function() {
    this._released = !0, this._bufferedEvents.forEach(function(A) {
      this.emit.apply(this, A)
    }.bind(this)), this._bufferedEvents = []
  };
  QC.prototype.pipe = function() {
    var A = ZFA.prototype.pipe.apply(this, arguments);
    return this.resume(), A
  };
  QC.prototype._handleEmit = function(A) {
    if (this._released) {
      this.emit.apply(this, A);
      return
    }
    if (A[0] === "data") this.dataSize += A[1].length, this._checkIfMaxDataSizeExceeded();
    this._bufferedEvents.push(A)
  };
  QC.prototype._checkIfMaxDataSizeExceeded = function() {
    if (this._maxDataSizeExceeded) return;
    if (this.dataSize <= this.maxDataSize) return;
    this._maxDataSizeExceeded = !0;
    var A = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(A))
  }
})
// @from(Start 667609, End 671451)
XFA = z((Pg5, FFA) => {
  var oC9 = Z1("util"),
    JFA = Z1("stream").Stream,
    WFA = YFA();
  FFA.exports = m3;

  function m3() {
    this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2097152, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1
  }
  oC9.inherits(m3, JFA);
  m3.create = function(A) {
    var B = new this;
    A = A || {};
    for (var Q in A) B[Q] = A[Q];
    return B
  };
  m3.isStreamLike = function(A) {
    return typeof A !== "function" && typeof A !== "string" && typeof A !== "boolean" && typeof A !== "number" && !Buffer.isBuffer(A)
  };
  m3.prototype.append = function(A) {
    var B = m3.isStreamLike(A);
    if (B) {
      if (!(A instanceof WFA)) {
        var Q = WFA.create(A, {
          maxDataSize: 1 / 0,
          pauseStream: this.pauseStreams
        });
        A.on("data", this._checkDataSize.bind(this)), A = Q
      }
      if (this._handleErrors(A), this.pauseStreams) A.pause()
    }
    return this._streams.push(A), this
  };
  m3.prototype.pipe = function(A, B) {
    return JFA.prototype.pipe.call(this, A, B), this.resume(), A
  };
  m3.prototype._getNext = function() {
    if (this._currentStream = null, this._insideLoop) {
      this._pendingNext = !0;
      return
    }
    this._insideLoop = !0;
    try {
      do this._pendingNext = !1, this._realGetNext(); while (this._pendingNext)
    } finally {
      this._insideLoop = !1
    }
  };
  m3.prototype._realGetNext = function() {
    var A = this._streams.shift();
    if (typeof A == "undefined") {
      this.end();
      return
    }
    if (typeof A !== "function") {
      this._pipeNext(A);
      return
    }
    var B = A;
    B(function(Q) {
      var I = m3.isStreamLike(Q);
      if (I) Q.on("data", this._checkDataSize.bind(this)), this._handleErrors(Q);
      this._pipeNext(Q)
    }.bind(this))
  };
  m3.prototype._pipeNext = function(A) {
    this._currentStream = A;
    var B = m3.isStreamLike(A);
    if (B) {
      A.on("end", this._getNext.bind(this)), A.pipe(this, {
        end: !1
      });
      return
    }
    var Q = A;
    this.write(Q), this._getNext()
  };
  m3.prototype._handleErrors = function(A) {
    var B = this;
    A.on("error", function(Q) {
      B._emitError(Q)
    })
  };
  m3.prototype.write = function(A) {
    this.emit("data", A)
  };
  m3.prototype.pause = function() {
    if (!this.pauseStreams) return;
    if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
    this.emit("pause")
  };
  m3.prototype.resume = function() {
    if (!this._released) this._released = !0, this.writable = !0, this._getNext();
    if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
    this.emit("resume")
  };
  m3.prototype.end = function() {
    this._reset(), this.emit("end")
  };
  m3.prototype.destroy = function() {
    this._reset(), this.emit("close")
  };
  m3.prototype._reset = function() {
    this.writable = !1, this._streams = [], this._currentStream = null
  };
  m3.prototype._checkDataSize = function() {
    if (this._updateDataSize(), this.dataSize <= this.maxDataSize) return;
    var A = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(A))
  };
  m3.prototype._updateDataSize = function() {
    this.dataSize = 0;
    var A = this;
    if (this._streams.forEach(function(B) {
        if (!B.dataSize) return;
        A.dataSize += B.dataSize
      }), this._currentStream && this._currentStream.dataSize) this.dataSize += this._currentStream.dataSize
  };
  m3.prototype._emitError = function(A) {
    this._reset(), this.emit("error", A)
  }
})