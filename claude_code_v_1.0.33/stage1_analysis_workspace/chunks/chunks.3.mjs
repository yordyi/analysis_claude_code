
// @from(Start 196572, End 197815)
M7A = z((q7A) => {
  Object.defineProperty(q7A, "__esModule", {
    value: !0
  });
  var T$1 = rA(),
    N7A = new Map,
    U7A = new Set;

  function U99(A) {
    if (!T$1.GLOBAL_OBJ._sentryModuleMetadata) return;
    for (let B of Object.keys(T$1.GLOBAL_OBJ._sentryModuleMetadata)) {
      let Q = T$1.GLOBAL_OBJ._sentryModuleMetadata[B];
      if (U7A.has(B)) continue;
      U7A.add(B);
      let I = A(B);
      for (let G of I.reverse())
        if (G.filename) {
          N7A.set(G.filename, Q);
          break
        }
    }
  }

  function $7A(A, B) {
    return U99(A), N7A.get(B)
  }

  function N99(A, B) {
    try {
      B.exception.values.forEach((Q) => {
        if (!Q.stacktrace) return;
        for (let I of Q.stacktrace.frames || []) {
          if (!I.filename) continue;
          let G = $7A(A, I.filename);
          if (G) I.module_metadata = G
        }
      })
    } catch (Q) {}
  }

  function $99(A) {
    try {
      A.exception.values.forEach((B) => {
        if (!B.stacktrace) return;
        for (let Q of B.stacktrace.frames || []) delete Q.module_metadata
      })
    } catch (B) {}
  }
  q7A.addMetadataToStackFrames = N99;
  q7A.getMetadataForUrl = $7A;
  q7A.stripMetadataFromStackFrames = $99
})
// @from(Start 197821, End 198756)
S7A = z((P7A) => {
  Object.defineProperty(P7A, "__esModule", {
    value: !0
  });
  var R99 = rA(),
    R7A = RU(),
    L7A = M7A(),
    O7A = "ModuleMetadata",
    O99 = () => {
      return {
        name: O7A,
        setupOnce() {},
        setup(A) {
          if (typeof A.on !== "function") return;
          A.on("beforeEnvelope", (B) => {
            R99.forEachEnvelopeItem(B, (Q, I) => {
              if (I === "event") {
                let G = Array.isArray(Q) ? Q[1] : void 0;
                if (G) L7A.stripMetadataFromStackFrames(G), Q[1] = G
              }
            })
          })
        },
        processEvent(A, B, Q) {
          let I = Q.getOptions().stackParser;
          return L7A.addMetadataToStackFrames(I, A), A
        }
      }
    },
    T7A = R7A.defineIntegration(O99),
    T99 = R7A.convertIntegrationFnToClass(O7A, T7A);
  P7A.ModuleMetadata = T99;
  P7A.moduleMetadataIntegration = T7A
})
// @from(Start 198762, End 201395)
f7A = z((x7A) => {
  Object.defineProperty(x7A, "__esModule", {
    value: !0
  });
  var _7A = rA(),
    j7A = RU(),
    _99 = NY(),
    P$1 = {
      include: {
        cookies: !0,
        data: !0,
        headers: !0,
        ip: !1,
        query_string: !0,
        url: !0,
        user: {
          id: !0,
          username: !0,
          email: !0
        }
      },
      transactionNamingScheme: "methodPath"
    },
    y7A = "RequestData",
    j99 = (A = {}) => {
      let B = _7A.addRequestDataToEvent,
        Q = {
          ...P$1,
          ...A,
          include: {
            method: !0,
            ...P$1.include,
            ...A.include,
            user: A.include && typeof A.include.user === "boolean" ? A.include.user : {
              ...P$1.include.user,
              ...(A.include || {}).user
            }
          }
        };
      return {
        name: y7A,
        setupOnce() {},
        processEvent(I, G, Z) {
          let {
            transactionNamingScheme: D
          } = Q, {
            sdkProcessingMetadata: Y = {}
          } = I, W = Y.request;
          if (!W) return I;
          let J = Y.requestDataOptionsFromExpressHandler || Y.requestDataOptionsFromGCPWrapper || k99(Q),
            F = B(I, W, J);
          if (I.type === "transaction" || D === "handler") return F;
          let V = W._sentryTransaction;
          if (V) {
            let C = _99.spanToJSON(V).description || "",
              K = x99(Z) === "sentry.javascript.nextjs" ? C.startsWith("/api") : D !== "path",
              [E] = _7A.extractPathForTransaction(W, {
                path: !0,
                method: K,
                customRoute: C
              });
            F.transaction = E
          }
          return F
        }
      }
    },
    k7A = j7A.defineIntegration(j99),
    y99 = j7A.convertIntegrationFnToClass(y7A, k7A);

  function k99(A) {
    let {
      transactionNamingScheme: B,
      include: {
        ip: Q,
        user: I,
        ...G
      }
    } = A, Z = [];
    for (let [Y, W] of Object.entries(G))
      if (W) Z.push(Y);
    let D;
    if (I === void 0) D = !0;
    else if (typeof I === "boolean") D = I;
    else {
      let Y = [];
      for (let [W, J] of Object.entries(I))
        if (J) Y.push(W);
      D = Y
    }
    return {
      include: {
        ip: Q,
        user: D,
        request: Z.length !== 0 ? Z : void 0,
        transaction: B
      }
    }
  }

  function x99(A) {
    try {
      return A.getOptions()._metadata.sdk.name
    } catch (B) {
      return
    }
  }
  x7A.RequestData = y99;
  x7A.requestDataIntegration = k7A
})
// @from(Start 201401, End 205417)
S$1 = z((h7A) => {
  Object.defineProperty(h7A, "__esModule", {
    value: !0
  });
  var FI = rA(),
    PP = B7(),
    v7A = RU(),
    b99 = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/, /^ResizeObserver loop completed with undelivered notifications.$/, /^Cannot redefine property: googletag$/],
    g99 = [/^.*\/healthcheck$/, /^.*\/healthy$/, /^.*\/live$/, /^.*\/ready$/, /^.*\/heartbeat$/, /^.*\/health$/, /^.*\/healthz$/],
    b7A = "InboundFilters",
    h99 = (A = {}) => {
      return {
        name: b7A,
        setupOnce() {},
        processEvent(B, Q, I) {
          let G = I.getOptions(),
            Z = d99(A, G);
          return u99(B, Z) ? null : B
        }
      }
    },
    g7A = v7A.defineIntegration(h99),
    m99 = v7A.convertIntegrationFnToClass(b7A, g7A);

  function d99(A = {}, B = {}) {
    return {
      allowUrls: [...A.allowUrls || [], ...B.allowUrls || []],
      denyUrls: [...A.denyUrls || [], ...B.denyUrls || []],
      ignoreErrors: [...A.ignoreErrors || [], ...B.ignoreErrors || [], ...A.disableErrorDefaults ? [] : b99],
      ignoreTransactions: [...A.ignoreTransactions || [], ...B.ignoreTransactions || [], ...A.disableTransactionDefaults ? [] : g99],
      ignoreInternal: A.ignoreInternal !== void 0 ? A.ignoreInternal : !0
    }
  }

  function u99(A, B) {
    if (B.ignoreInternal && a99(A)) return PP.DEBUG_BUILD && FI.logger.warn(`Event dropped due to being internal Sentry Error.
Event: ${FI.getEventDescription(A)}`), !0;
    if (p99(A, B.ignoreErrors)) return PP.DEBUG_BUILD && FI.logger.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${FI.getEventDescription(A)}`), !0;
    if (c99(A, B.ignoreTransactions)) return PP.DEBUG_BUILD && FI.logger.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${FI.getEventDescription(A)}`), !0;
    if (l99(A, B.denyUrls)) return PP.DEBUG_BUILD && FI.logger.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${FI.getEventDescription(A)}.
Url: ${A41(A)}`), !0;
    if (!i99(A, B.allowUrls)) return PP.DEBUG_BUILD && FI.logger.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${FI.getEventDescription(A)}.
Url: ${A41(A)}`), !0;
    return !1
  }

  function p99(A, B) {
    if (A.type || !B || !B.length) return !1;
    return n99(A).some((Q) => FI.stringMatchesSomePattern(Q, B))
  }

  function c99(A, B) {
    if (A.type !== "transaction" || !B || !B.length) return !1;
    let Q = A.transaction;
    return Q ? FI.stringMatchesSomePattern(Q, B) : !1
  }

  function l99(A, B) {
    if (!B || !B.length) return !1;
    let Q = A41(A);
    return !Q ? !1 : FI.stringMatchesSomePattern(Q, B)
  }

  function i99(A, B) {
    if (!B || !B.length) return !0;
    let Q = A41(A);
    return !Q ? !0 : FI.stringMatchesSomePattern(Q, B)
  }

  function n99(A) {
    let B = [];
    if (A.message) B.push(A.message);
    let Q;
    try {
      Q = A.exception.values[A.exception.values.length - 1]
    } catch (I) {}
    if (Q) {
      if (Q.value) {
        if (B.push(Q.value), Q.type) B.push(`${Q.type}: ${Q.value}`)
      }
    }
    if (PP.DEBUG_BUILD && B.length === 0) FI.logger.error(`Could not extract message for event ${FI.getEventDescription(A)}`);
    return B
  }

  function a99(A) {
    try {
      return A.exception.values[0].type === "SentryError"
    } catch (B) {}
    return !1
  }

  function s99(A = []) {
    for (let B = A.length - 1; B >= 0; B--) {
      let Q = A[B];
      if (Q && Q.filename !== "<anonymous>" && Q.filename !== "[native code]") return Q.filename || null
    }
    return null
  }

  function A41(A) {
    try {
      let B;
      try {
        B = A.exception.values[0].stacktrace.frames
      } catch (Q) {}
      return B ? s99(B) : null
    } catch (B) {
      return PP.DEBUG_BUILD && FI.logger.error(`Cannot extract url for event ${FI.getEventDescription(A)}`), null
    }
  }
  h7A.InboundFilters = m99;
  h7A.inboundFiltersIntegration = g7A
})
// @from(Start 205423, End 206254)
_$1 = z((l7A) => {
  Object.defineProperty(l7A, "__esModule", {
    value: !0
  });
  var t99 = rA(),
    e99 = mF(),
    u7A = RU(),
    m7A, p7A = "FunctionToString",
    d7A = new WeakMap,
    A49 = () => {
      return {
        name: p7A,
        setupOnce() {
          m7A = Function.prototype.toString;
          try {
            Function.prototype.toString = function(...A) {
              let B = t99.getOriginalFunction(this),
                Q = d7A.has(e99.getClient()) && B !== void 0 ? B : this;
              return m7A.apply(Q, A)
            }
          } catch (A) {}
        },
        setup(A) {
          d7A.set(A, !0)
        }
      }
    },
    c7A = u7A.defineIntegration(A49),
    B49 = u7A.convertIntegrationFnToClass(p7A, c7A);
  l7A.FunctionToString = B49;
  l7A.functionToStringIntegration = c7A
})
// @from(Start 206260, End 206934)
j$1 = z((r7A) => {
  Object.defineProperty(r7A, "__esModule", {
    value: !0
  });
  var i7A = rA(),
    n7A = RU(),
    G49 = "cause",
    Z49 = 5,
    a7A = "LinkedErrors",
    D49 = (A = {}) => {
      let B = A.limit || Z49,
        Q = A.key || G49;
      return {
        name: a7A,
        setupOnce() {},
        preprocessEvent(I, G, Z) {
          let D = Z.getOptions();
          i7A.applyAggregateErrorsToEvent(i7A.exceptionFromError, D.stackParser, D.maxValueLength, Q, B, I, G)
        }
      }
    },
    s7A = n7A.defineIntegration(D49),
    Y49 = n7A.convertIntegrationFnToClass(a7A, s7A);
  r7A.LinkedErrors = Y49;
  r7A.linkedErrorsIntegration = s7A
})
// @from(Start 206940, End 207207)
t7A = z((o7A) => {
  Object.defineProperty(o7A, "__esModule", {
    value: !0
  });
  var F49 = _$1(),
    X49 = S$1(),
    V49 = j$1();
  o7A.FunctionToString = F49.FunctionToString;
  o7A.InboundFilters = X49.InboundFilters;
  o7A.LinkedErrors = V49.LinkedErrors
})
// @from(Start 207213, End 208667)
QIA = z((BIA) => {
  Object.defineProperty(BIA, "__esModule", {
    value: !0
  });
  var z49 = rA(),
    e7A = nc(),
    w49 = $$1(),
    E49 = pc(),
    B41 = ic();
  class AIA {
    constructor(A) {
      this._client = A, this._buckets = new Map, this._interval = setInterval(() => this.flush(), e7A.DEFAULT_BROWSER_FLUSH_INTERVAL)
    }
    add(A, B, Q, I = "none", G = {}, Z = z49.timestampInSeconds()) {
      let D = Math.floor(Z),
        Y = B41.sanitizeMetricKey(B),
        W = B41.sanitizeTags(G),
        J = B41.sanitizeUnit(I),
        F = B41.getBucketKey(A, Y, J, W),
        X = this._buckets.get(F),
        V = X && A === e7A.SET_METRIC_TYPE ? X.metric.weight : 0;
      if (X) {
        if (X.metric.add(Q), X.timestamp < D) X.timestamp = D
      } else X = {
        metric: new w49.METRIC_MAP[A](Q),
        timestamp: D,
        metricType: A,
        name: Y,
        unit: J,
        tags: W
      }, this._buckets.set(F, X);
      let C = typeof Q === "string" ? X.metric.weight - V : Q;
      E49.updateMetricSummaryOnActiveSpan(A, Y, C, J, G, F)
    }
    flush() {
      if (this._buckets.size === 0) return;
      if (this._client.captureAggregateMetrics) {
        let A = Array.from(this._buckets).map(([, B]) => B);
        this._client.captureAggregateMetrics(A)
      }
      this._buckets.clear()
    }
    close() {
      clearInterval(this._interval), this.flush()
    }
  }
  BIA.BrowserMetricsAggregator = AIA
})
// @from(Start 208673, End 209176)
YIA = z((DIA) => {
  Object.defineProperty(DIA, "__esModule", {
    value: !0
  });
  var IIA = RU(),
    N49 = QIA(),
    GIA = "MetricsAggregator",
    $49 = () => {
      return {
        name: GIA,
        setupOnce() {},
        setup(A) {
          A.metricsAggregator = new N49.BrowserMetricsAggregator(A)
        }
      }
    },
    ZIA = IIA.defineIntegration($49),
    q49 = IIA.convertIntegrationFnToClass(GIA, ZIA);
  DIA.MetricsAggregator = q49;
  DIA.metricsAggregatorIntegration = ZIA
})
// @from(Start 209182, End 210763)
wIA = z((zIA) => {
  Object.defineProperty(zIA, "__esModule", {
    value: !0
  });
  var WIA = rA(),
    JIA = B7(),
    FIA = mF(),
    R49 = NY(),
    Q41 = nc(),
    XIA = YIA();

  function I41(A, B, Q, I = {}) {
    let G = FIA.getClient(),
      Z = FIA.getCurrentScope();
    if (G) {
      if (!G.metricsAggregator) {
        JIA.DEBUG_BUILD && WIA.logger.warn("No metrics aggregator enabled. Please add the MetricsAggregator integration to use metrics APIs");
        return
      }
      let {
        unit: D,
        tags: Y,
        timestamp: W
      } = I, {
        release: J,
        environment: F
      } = G.getOptions(), X = Z.getTransaction(), V = {};
      if (J) V.release = J;
      if (F) V.environment = F;
      if (X) V.transaction = R49.spanToJSON(X).description || "";
      JIA.DEBUG_BUILD && WIA.logger.log(`Adding value of ${Q} to ${A} metric ${B}`), G.metricsAggregator.add(A, B, Q, D, {
        ...V,
        ...Y
      }, W)
    }
  }

  function VIA(A, B = 1, Q) {
    I41(Q41.COUNTER_METRIC_TYPE, A, B, Q)
  }

  function CIA(A, B, Q) {
    I41(Q41.DISTRIBUTION_METRIC_TYPE, A, B, Q)
  }

  function KIA(A, B, Q) {
    I41(Q41.SET_METRIC_TYPE, A, B, Q)
  }

  function HIA(A, B, Q) {
    I41(Q41.GAUGE_METRIC_TYPE, A, B, Q)
  }
  var O49 = {
    increment: VIA,
    distribution: CIA,
    set: KIA,
    gauge: HIA,
    MetricsAggregator: XIA.MetricsAggregator,
    metricsAggregatorIntegration: XIA.metricsAggregatorIntegration
  };
  zIA.distribution = CIA;
  zIA.gauge = HIA;
  zIA.increment = VIA;
  zIA.metrics = O49;
  zIA.set = KIA
})
// @from(Start 210769, End 217204)
z4 = z((x$1) => {
  Object.defineProperty(x$1, "__esModule", {
    value: !0
  });
  var EIA = W$1(),
    UIA = D$1(),
    y49 = d91(),
    k49 = c91(),
    NIA = x91(),
    G41 = Cx(),
    SP = m91(),
    $IA = LP(),
    x49 = EQA(),
    f49 = Y$1(),
    sc = cc(),
    qIA = J$1(),
    AB = mF(),
    sH = iH(),
    y$1 = Jx(),
    v49 = F$1(),
    k$1 = P91(),
    MIA = fc(),
    LIA = a91(),
    RIA = K$1(),
    b49 = nQA(),
    OIA = oQA(),
    g49 = Q7A(),
    h49 = Z7A(),
    m49 = Y7A(),
    d49 = j91(),
    Z41 = RU(),
    TIA = T91(),
    u49 = O91(),
    p49 = z$1(),
    c49 = F7A(),
    l49 = v91(),
    i49 = C7A(),
    n49 = Q$1(),
    a49 = H7A(),
    D41 = NY(),
    s49 = Fx(),
    r49 = E7A(),
    o49 = Wx(),
    PIA = S7A(),
    SIA = f7A(),
    _IA = S$1(),
    jIA = _$1(),
    yIA = j$1(),
    t49 = t7A(),
    e49 = wIA(),
    A69 = t49;
  x$1.addTracingExtensions = EIA.addTracingExtensions;
  x$1.startIdleTransaction = EIA.startIdleTransaction;
  x$1.IdleTransaction = UIA.IdleTransaction;
  x$1.TRACING_DEFAULTS = UIA.TRACING_DEFAULTS;
  x$1.Span = y49.Span;
  x$1.Transaction = k49.Transaction;
  x$1.extractTraceparentData = NIA.extractTraceparentData;
  x$1.getActiveTransaction = NIA.getActiveTransaction;
  Object.defineProperty(x$1, "SpanStatus", {
    enumerable: !0,
    get: () => G41.SpanStatus
  });
  x$1.getSpanStatusFromHttpCode = G41.getSpanStatusFromHttpCode;
  x$1.setHttpStatus = G41.setHttpStatus;
  x$1.spanStatusfromHttpCode = G41.spanStatusfromHttpCode;
  x$1.continueTrace = SP.continueTrace;
  x$1.getActiveSpan = SP.getActiveSpan;
  x$1.startActiveSpan = SP.startActiveSpan;
  x$1.startInactiveSpan = SP.startInactiveSpan;
  x$1.startSpan = SP.startSpan;
  x$1.startSpanManual = SP.startSpanManual;
  x$1.trace = SP.trace;
  x$1.getDynamicSamplingContextFromClient = $IA.getDynamicSamplingContextFromClient;
  x$1.getDynamicSamplingContextFromSpan = $IA.getDynamicSamplingContextFromSpan;
  x$1.setMeasurement = x49.setMeasurement;
  x$1.isValidSampleRate = f49.isValidSampleRate;
  x$1.SEMANTIC_ATTRIBUTE_PROFILE_ID = sc.SEMANTIC_ATTRIBUTE_PROFILE_ID;
  x$1.SEMANTIC_ATTRIBUTE_SENTRY_OP = sc.SEMANTIC_ATTRIBUTE_SENTRY_OP;
  x$1.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = sc.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN;
  x$1.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = sc.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE;
  x$1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = sc.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE;
  x$1.createEventEnvelope = qIA.createEventEnvelope;
  x$1.createSessionEnvelope = qIA.createSessionEnvelope;
  x$1.addBreadcrumb = AB.addBreadcrumb;
  x$1.captureCheckIn = AB.captureCheckIn;
  x$1.captureEvent = AB.captureEvent;
  x$1.captureException = AB.captureException;
  x$1.captureMessage = AB.captureMessage;
  x$1.captureSession = AB.captureSession;
  x$1.close = AB.close;
  x$1.configureScope = AB.configureScope;
  x$1.endSession = AB.endSession;
  x$1.flush = AB.flush;
  x$1.getClient = AB.getClient;
  x$1.getCurrentScope = AB.getCurrentScope;
  x$1.isInitialized = AB.isInitialized;
  x$1.lastEventId = AB.lastEventId;
  x$1.setContext = AB.setContext;
  x$1.setExtra = AB.setExtra;
  x$1.setExtras = AB.setExtras;
  x$1.setTag = AB.setTag;
  x$1.setTags = AB.setTags;
  x$1.setUser = AB.setUser;
  x$1.startSession = AB.startSession;
  x$1.startTransaction = AB.startTransaction;
  x$1.withActiveSpan = AB.withActiveSpan;
  x$1.withIsolationScope = AB.withIsolationScope;
  x$1.withMonitor = AB.withMonitor;
  x$1.withScope = AB.withScope;
  x$1.Hub = sH.Hub;
  x$1.ensureHubOnCarrier = sH.ensureHubOnCarrier;
  x$1.getCurrentHub = sH.getCurrentHub;
  x$1.getHubFromCarrier = sH.getHubFromCarrier;
  x$1.getIsolationScope = sH.getIsolationScope;
  x$1.getMainCarrier = sH.getMainCarrier;
  x$1.makeMain = sH.makeMain;
  x$1.runWithAsyncContext = sH.runWithAsyncContext;
  x$1.setAsyncContextStrategy = sH.setAsyncContextStrategy;
  x$1.setHubOnCarrier = sH.setHubOnCarrier;
  x$1.closeSession = y$1.closeSession;
  x$1.makeSession = y$1.makeSession;
  x$1.updateSession = y$1.updateSession;
  x$1.SessionFlusher = v49.SessionFlusher;
  x$1.Scope = k$1.Scope;
  x$1.getGlobalScope = k$1.getGlobalScope;
  x$1.setGlobalScope = k$1.setGlobalScope;
  x$1.addGlobalEventProcessor = MIA.addGlobalEventProcessor;
  x$1.notifyEventProcessors = MIA.notifyEventProcessors;
  x$1.getEnvelopeEndpointWithUrlEncodedAuth = LIA.getEnvelopeEndpointWithUrlEncodedAuth;
  x$1.getReportDialogEndpoint = LIA.getReportDialogEndpoint;
  x$1.BaseClient = RIA.BaseClient;
  x$1.addEventProcessor = RIA.addEventProcessor;
  x$1.ServerRuntimeClient = b49.ServerRuntimeClient;
  x$1.initAndBind = OIA.initAndBind;
  x$1.setCurrentClient = OIA.setCurrentClient;
  x$1.createTransport = g49.createTransport;
  x$1.makeOfflineTransport = h49.makeOfflineTransport;
  x$1.makeMultiplexedTransport = m49.makeMultiplexedTransport;
  x$1.SDK_VERSION = d49.SDK_VERSION;
  x$1.addIntegration = Z41.addIntegration;
  x$1.convertIntegrationFnToClass = Z41.convertIntegrationFnToClass;
  x$1.defineIntegration = Z41.defineIntegration;
  x$1.getIntegrationsToSetup = Z41.getIntegrationsToSetup;
  x$1.applyScopeDataToEvent = TIA.applyScopeDataToEvent;
  x$1.mergeScopeData = TIA.mergeScopeData;
  x$1.prepareEvent = u49.prepareEvent;
  x$1.createCheckInEnvelope = p49.createCheckInEnvelope;
  x$1.createSpanEnvelope = c49.createSpanEnvelope;
  x$1.hasTracingEnabled = l49.hasTracingEnabled;
  x$1.isSentryRequestUrl = i49.isSentryRequestUrl;
  x$1.handleCallbackErrors = n49.handleCallbackErrors;
  x$1.parameterize = a49.parameterize;
  x$1.spanIsSampled = D41.spanIsSampled;
  x$1.spanToJSON = D41.spanToJSON;
  x$1.spanToTraceContext = D41.spanToTraceContext;
  x$1.spanToTraceHeader = D41.spanToTraceHeader;
  x$1.getRootSpan = s49.getRootSpan;
  x$1.applySdkMetadata = r49.applySdkMetadata;
  x$1.DEFAULT_ENVIRONMENT = o49.DEFAULT_ENVIRONMENT;
  x$1.ModuleMetadata = PIA.ModuleMetadata;
  x$1.moduleMetadataIntegration = PIA.moduleMetadataIntegration;
  x$1.RequestData = SIA.RequestData;
  x$1.requestDataIntegration = SIA.requestDataIntegration;
  x$1.InboundFilters = _IA.InboundFilters;
  x$1.inboundFiltersIntegration = _IA.inboundFiltersIntegration;
  x$1.FunctionToString = jIA.FunctionToString;
  x$1.functionToStringIntegration = jIA.functionToStringIntegration;
  x$1.LinkedErrors = yIA.LinkedErrors;
  x$1.linkedErrorsIntegration = yIA.linkedErrorsIntegration;
  x$1.metrics = e49.metrics;
  x$1.Integrations = A69
})
// @from(Start 217210, End 217392)
MY = z((kIA) => {
  Object.defineProperty(kIA, "__esModule", {
    value: !0
  });
  var F89 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
  kIA.DEBUG_BUILD = F89
})
// @from(Start 217398, End 217836)
BM = z((fIA) => {
  var {
    _optionalChain: xIA
  } = rA();
  Object.defineProperty(fIA, "__esModule", {
    value: !0
  });

  function V89(A) {
    let B = xIA([A, "call", (I) => I(), "access", (I) => I.getClient, "call", (I) => I(), "optionalAccess", (I) => I.getOptions, "call", (I) => I()]);
    return (xIA([B, "optionalAccess", (I) => I.instrumenter]) || "sentry") !== "sentry"
  }
  fIA.shouldDisableAutoInstrumentation = V89
})
// @from(Start 217842, End 224949)
mIA = z((hIA) => {
  var {
    _optionalChain: oV
  } = rA();
  Object.defineProperty(hIA, "__esModule", {
    value: !0
  });
  var f$1 = z4(),
    LY = rA(),
    Y41 = MY(),
    K89 = BM();
  class W41 {
    static __initStatic() {
      this.id = "Express"
    }
    constructor(A = {}) {
      this.name = W41.id, this._router = A.router || A.app, this._methods = (Array.isArray(A.methods) ? A.methods : []).concat("use")
    }
    setupOnce(A, B) {
      if (!this._router) {
        Y41.DEBUG_BUILD && LY.logger.error("ExpressIntegration is missing an Express instance");
        return
      }
      if (K89.shouldDisableAutoInstrumentation(B)) {
        Y41.DEBUG_BUILD && LY.logger.log("Express Integration is skipped because of instrumenter configuration.");
        return
      }
      w89(this._router, this._methods), E89(this._router)
    }
  }
  W41.__initStatic();

  function vIA(A, B) {
    let Q = A.length;
    switch (Q) {
      case 2:
        return function(I, G) {
          let Z = G.__sentry_transaction;
          if (Z) {
            let D = Z.startChild({
              description: A.name,
              op: `middleware.express.${B}`,
              origin: "auto.middleware.express"
            });
            G.once("finish", () => {
              D.end()
            })
          }
          return A.call(this, I, G)
        };
      case 3:
        return function(I, G, Z) {
          let D = G.__sentry_transaction,
            Y = oV([D, "optionalAccess", (W) => W.startChild, "call", (W) => W({
              description: A.name,
              op: `middleware.express.${B}`,
              origin: "auto.middleware.express"
            })]);
          A.call(this, I, G, function(...W) {
            oV([Y, "optionalAccess", (J) => J.end, "call", (J) => J()]), Z.call(this, ...W)
          })
        };
      case 4:
        return function(I, G, Z, D) {
          let Y = Z.__sentry_transaction,
            W = oV([Y, "optionalAccess", (J) => J.startChild, "call", (J) => J({
              description: A.name,
              op: `middleware.express.${B}`,
              origin: "auto.middleware.express"
            })]);
          A.call(this, I, G, Z, function(...J) {
            oV([W, "optionalAccess", (F) => F.end, "call", (F) => F()]), D.call(this, ...J)
          })
        };
      default:
        throw new Error(`Express middleware takes 2-4 arguments. Got: ${Q}`)
    }
  }

  function H89(A, B) {
    return A.map((Q) => {
      if (typeof Q === "function") return vIA(Q, B);
      if (Array.isArray(Q)) return Q.map((I) => {
        if (typeof I === "function") return vIA(I, B);
        return I
      });
      return Q
    })
  }

  function z89(A, B) {
    let Q = A[B];
    return A[B] = function(...I) {
      return Q.call(this, ...H89(I, B))
    }, A
  }

  function w89(A, B = []) {
    B.forEach((Q) => z89(A, Q))
  }

  function E89(A) {
    let B = "settings" in A;
    if (B && A._router === void 0 && A.lazyrouter) A.lazyrouter();
    let Q = B ? A._router : A;
    if (!Q) {
      Y41.DEBUG_BUILD && LY.logger.debug("Cannot instrument router for URL Parameterization (did not find a valid router)."), Y41.DEBUG_BUILD && LY.logger.debug("Routing instrumentation is currently only supported in Express 4.");
      return
    }
    let I = Object.getPrototypeOf(Q),
      G = I.process_params;
    I.process_params = function Z(D, Y, W, J, F) {
      if (!W._reconstructedRoute) W._reconstructedRoute = "";
      let {
        layerRoutePath: X,
        isRegex: V,
        isArray: C,
        numExtraSegments: K
      } = U89(D);
      if (X || V || C) W._hasParameters = !0;
      let E;
      if (X) E = X;
      else E = gIA(W.originalUrl, W._reconstructedRoute, D.path) || "";
      let N = E.split("/").filter((R) => R.length > 0 && (V || C || !R.includes("*"))).join("/");
      if (N && N.length > 0) W._reconstructedRoute += `/${N}${V?"/":""}`;
      let q = LY.getNumberOfUrlSegments(LY.stripUrlQueryAndFragment(W.originalUrl || "")) + K,
        O = LY.getNumberOfUrlSegments(W._reconstructedRoute);
      if (q === O) {
        if (!W._hasParameters) {
          if (W._reconstructedRoute !== W.originalUrl) W._reconstructedRoute = W.originalUrl ? LY.stripUrlQueryAndFragment(W.originalUrl) : W.originalUrl
        }
        let R = J.__sentry_transaction,
          T = R && f$1.spanToJSON(R).data || {};
        if (R && T[f$1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] !== "custom") {
          let L = W._reconstructedRoute || "/",
            [_, k] = LY.extractPathForTransaction(W, {
              path: !0,
              method: !0,
              customRoute: L
            });
          R.updateName(_), R.setAttribute(f$1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, k)
        }
      }
      return G.call(this, D, Y, W, J, F)
    }
  }
  var bIA = (A, B, Q) => {
    if (!A || !B || !Q || Object.keys(Q).length === 0 || oV([Q, "access", (J) => J[0], "optionalAccess", (J) => J.offset]) === void 0 || oV([Q, "access", (J) => J[0], "optionalAccess", (J) => J.offset]) === null) return;
    let I = Q.sort((J, F) => J.offset - F.offset),
      Z = new RegExp(B, `${B.flags}d`).exec(A);
    if (!Z || !Z.indices) return;
    let [, ...D] = Z.indices;
    if (D.length !== I.length) return;
    let Y = A,
      W = 0;
    return D.forEach((J, F) => {
      if (J) {
        let [X, V] = J, C = Y.substring(0, X - W), K = `:${I[F].name}`, E = Y.substring(V - W);
        Y = C + K + E, W = W + (V - X - K.length)
      }
    }), Y
  };

  function U89(A) {
    let B = oV([A, "access", (D) => D.route, "optionalAccess", (D) => D.path]),
      Q = LY.isRegExp(B),
      I = Array.isArray(B);
    if (!B) {
      let [D] = LY.GLOBAL_OBJ.process.versions.node.split(".").map(Number);
      if (D >= 16) B = bIA(A.path, A.regexp, A.keys)
    }
    if (!B) return {
      isRegex: Q,
      isArray: I,
      numExtraSegments: 0
    };
    let G = I ? Math.max(N89(B) - LY.getNumberOfUrlSegments(A.path || ""), 0) : 0;
    return {
      layerRoutePath: $89(I, B),
      isRegex: Q,
      isArray: I,
      numExtraSegments: G
    }
  }

  function N89(A) {
    return A.reduce((B, Q) => {
      return B + LY.getNumberOfUrlSegments(Q.toString())
    }, 0)
  }

  function $89(A, B) {
    if (A) return B.map((Q) => Q.toString()).join(",");
    return B && B.toString()
  }

  function gIA(A, B, Q) {
    let I = LY.stripUrlQueryAndFragment(A || ""),
      G = oV([I, "optionalAccess", (W) => W.split, "call", (W) => W("/"), "access", (W) => W.filter, "call", (W) => W((J) => !!J)]),
      Z = 0,
      D = oV([B, "optionalAccess", (W) => W.split, "call", (W) => W("/"), "access", (W) => W.filter, "call", (W) => W((J) => !!J), "access", (W) => W.length]) || 0;
    return oV([Q, "optionalAccess", (W) => W.split, "call", (W) => W("/"), "access", (W) => W.filter, "call", (W) => W((J) => {
      if (oV([G, "optionalAccess", (F) => F[D + Z]]) === J) return Z += 1, !0;
      return !1
    }), "access", (W) => W.join, "call", (W) => W("/")])
  }
  hIA.Express = W41;
  hIA.extractOriginalRoute = bIA;
  hIA.preventDuplicateSegments = gIA
})
// @from(Start 224955, End 227532)
uIA = z((dIA) => {
  var {
    _optionalChain: Nx
  } = rA();
  Object.defineProperty(dIA, "__esModule", {
    value: !0
  });
  var $x = rA(),
    v$1 = MY(),
    R89 = BM();
  class J41 {
    static __initStatic() {
      this.id = "Postgres"
    }
    constructor(A = {}) {
      this.name = J41.id, this._usePgNative = !!A.usePgNative, this._module = A.module
    }
    loadDependency() {
      return this._module = this._module || $x.loadModule("pg")
    }
    setupOnce(A, B) {
      if (R89.shouldDisableAutoInstrumentation(B)) {
        v$1.DEBUG_BUILD && $x.logger.log("Postgres Integration is skipped because of instrumenter configuration.");
        return
      }
      let Q = this.loadDependency();
      if (!Q) {
        v$1.DEBUG_BUILD && $x.logger.error("Postgres Integration was unable to require `pg` package.");
        return
      }
      let I = this._usePgNative ? Nx([Q, "access", (G) => G.native, "optionalAccess", (G) => G.Client]) : Q.Client;
      if (!I) {
        v$1.DEBUG_BUILD && $x.logger.error("Postgres Integration was unable to access 'pg-native' bindings.");
        return
      }
      $x.fill(I.prototype, "query", function(G) {
        return function(Z, D, Y) {
          let J = B().getScope().getSpan(),
            F = {
              "db.system": "postgresql"
            };
          try {
            if (this.database) F["db.name"] = this.database;
            if (this.host) F["server.address"] = this.host;
            if (this.port) F["server.port"] = this.port;
            if (this.user) F["db.user"] = this.user
          } catch (C) {}
          let X = Nx([J, "optionalAccess", (C) => C.startChild, "call", (C) => C({
            description: typeof Z === "string" ? Z : Z.text,
            op: "db",
            origin: "auto.db.postgres",
            data: F
          })]);
          if (typeof Y === "function") return G.call(this, Z, D, function(C, K) {
            Nx([X, "optionalAccess", (E) => E.end, "call", (E) => E()]), Y(C, K)
          });
          if (typeof D === "function") return G.call(this, Z, function(C, K) {
            Nx([X, "optionalAccess", (E) => E.end, "call", (E) => E()]), D(C, K)
          });
          let V = typeof D !== "undefined" ? G.call(this, Z, D) : G.call(this, Z);
          if ($x.isThenable(V)) return V.then((C) => {
            return Nx([X, "optionalAccess", (K) => K.end, "call", (K) => K()]), C
          });
          return Nx([X, "optionalAccess", (C) => C.end, "call", (C) => C()]), V
        }
      })
    }
  }
  J41.__initStatic();
  dIA.Postgres = J41
})
// @from(Start 227538, End 229898)
cIA = z((pIA) => {
  var {
    _optionalChain: T89
  } = rA();
  Object.defineProperty(pIA, "__esModule", {
    value: !0
  });
  var rc = rA(),
    b$1 = MY(),
    P89 = BM();
  class F41 {
    static __initStatic() {
      this.id = "Mysql"
    }
    constructor() {
      this.name = F41.id
    }
    loadDependency() {
      return this._module = this._module || rc.loadModule("mysql/lib/Connection.js")
    }
    setupOnce(A, B) {
      if (P89.shouldDisableAutoInstrumentation(B)) {
        b$1.DEBUG_BUILD && rc.logger.log("Mysql Integration is skipped because of instrumenter configuration.");
        return
      }
      let Q = this.loadDependency();
      if (!Q) {
        b$1.DEBUG_BUILD && rc.logger.error("Mysql Integration was unable to require `mysql` package.");
        return
      }
      let I = void 0;
      try {
        Q.prototype.connect = new Proxy(Q.prototype.connect, {
          apply(D, Y, W) {
            if (!I) I = Y.config;
            return D.apply(Y, W)
          }
        })
      } catch (D) {
        b$1.DEBUG_BUILD && rc.logger.error("Mysql Integration was unable to instrument `mysql` config.")
      }

      function G() {
        if (!I) return {};
        return {
          "server.address": I.host,
          "server.port": I.port,
          "db.user": I.user
        }
      }

      function Z(D) {
        if (!D) return;
        let Y = G();
        Object.keys(Y).forEach((W) => {
          D.setAttribute(W, Y[W])
        }), D.end()
      }
      rc.fill(Q, "createQuery", function(D) {
        return function(Y, W, J) {
          let X = B().getScope().getSpan(),
            V = T89([X, "optionalAccess", (K) => K.startChild, "call", (K) => K({
              description: typeof Y === "string" ? Y : Y.sql,
              op: "db",
              origin: "auto.db.mysql",
              data: {
                "db.system": "mysql"
              }
            })]);
          if (typeof J === "function") return D.call(this, Y, W, function(K, E, N) {
            Z(V), J(K, E, N)
          });
          if (typeof W === "function") return D.call(this, Y, function(K, E, N) {
            Z(V), W(K, E, N)
          });
          let C = D.call(this, Y, W);
          return C.on("end", () => {
            Z(V)
          }), C
        }
      })
    }
  }
  F41.__initStatic();
  pIA.Mysql = F41
})
// @from(Start 229904, End 235041)
nIA = z((iIA) => {
  var {
    _optionalChain: QM
  } = rA();
  Object.defineProperty(iIA, "__esModule", {
    value: !0
  });
  var oc = rA(),
    lIA = MY(),
    _89 = BM(),
    j89 = ["aggregate", "bulkWrite", "countDocuments", "createIndex", "createIndexes", "deleteMany", "deleteOne", "distinct", "drop", "dropIndex", "dropIndexes", "estimatedDocumentCount", "find", "findOne", "findOneAndDelete", "findOneAndReplace", "findOneAndUpdate", "indexes", "indexExists", "indexInformation", "initializeOrderedBulkOp", "insertMany", "insertOne", "isCapped", "mapReduce", "options", "parallelCollectionScan", "rename", "replaceOne", "stats", "updateMany", "updateOne"],
    y89 = {
      bulkWrite: ["operations"],
      countDocuments: ["query"],
      createIndex: ["fieldOrSpec"],
      createIndexes: ["indexSpecs"],
      deleteMany: ["filter"],
      deleteOne: ["filter"],
      distinct: ["key", "query"],
      dropIndex: ["indexName"],
      find: ["query"],
      findOne: ["query"],
      findOneAndDelete: ["filter"],
      findOneAndReplace: ["filter", "replacement"],
      findOneAndUpdate: ["filter", "update"],
      indexExists: ["indexes"],
      insertMany: ["docs"],
      insertOne: ["doc"],
      mapReduce: ["map", "reduce"],
      rename: ["newName"],
      replaceOne: ["filter", "doc"],
      updateMany: ["filter", "update"],
      updateOne: ["filter", "update"]
    };

  function k89(A) {
    return A && typeof A === "object" && A.once && typeof A.once === "function"
  }
  class X41 {
    static __initStatic() {
      this.id = "Mongo"
    }
    constructor(A = {}) {
      this.name = X41.id, this._operations = Array.isArray(A.operations) ? A.operations : j89, this._describeOperations = "describeOperations" in A ? A.describeOperations : !0, this._useMongoose = !!A.useMongoose
    }
    loadDependency() {
      let A = this._useMongoose ? "mongoose" : "mongodb";
      return this._module = this._module || oc.loadModule(A)
    }
    setupOnce(A, B) {
      if (_89.shouldDisableAutoInstrumentation(B)) {
        lIA.DEBUG_BUILD && oc.logger.log("Mongo Integration is skipped because of instrumenter configuration.");
        return
      }
      let Q = this.loadDependency();
      if (!Q) {
        let I = this._useMongoose ? "mongoose" : "mongodb";
        lIA.DEBUG_BUILD && oc.logger.error(`Mongo Integration was unable to require \`${I}\` package.`);
        return
      }
      this._instrumentOperations(Q.Collection, this._operations, B)
    }
    _instrumentOperations(A, B, Q) {
      B.forEach((I) => this._patchOperation(A, I, Q))
    }
    _patchOperation(A, B, Q) {
      if (!(B in A.prototype)) return;
      let I = this._getSpanContextFromOperationArguments.bind(this);
      oc.fill(A.prototype, B, function(G) {
        return function(...Z) {
          let D = Z[Z.length - 1],
            Y = Q(),
            W = Y.getScope(),
            J = Y.getClient(),
            F = W.getSpan(),
            X = QM([J, "optionalAccess", (C) => C.getOptions, "call", (C) => C(), "access", (C) => C.sendDefaultPii]);
          if (typeof D !== "function" || B === "mapReduce" && Z.length === 2) {
            let C = QM([F, "optionalAccess", (E) => E.startChild, "call", (E) => E(I(this, B, Z, X))]),
              K = G.call(this, ...Z);
            if (oc.isThenable(K)) return K.then((E) => {
              return QM([C, "optionalAccess", (N) => N.end, "call", (N) => N()]), E
            });
            else if (k89(K)) {
              let E = K;
              try {
                E.once("close", () => {
                  QM([C, "optionalAccess", (N) => N.end, "call", (N) => N()])
                })
              } catch (N) {
                QM([C, "optionalAccess", (q) => q.end, "call", (q) => q()])
              }
              return E
            } else return QM([C, "optionalAccess", (E) => E.end, "call", (E) => E()]), K
          }
          let V = QM([F, "optionalAccess", (C) => C.startChild, "call", (C) => C(I(this, B, Z.slice(0, -1)))]);
          return G.call(this, ...Z.slice(0, -1), function(C, K) {
            QM([V, "optionalAccess", (E) => E.end, "call", (E) => E()]), D(C, K)
          })
        }
      })
    }
    _getSpanContextFromOperationArguments(A, B, Q, I = !1) {
      let G = {
          "db.system": "mongodb",
          "db.name": A.dbName,
          "db.operation": B,
          "db.mongodb.collection": A.collectionName
        },
        Z = {
          op: "db",
          origin: "auto.db.mongo",
          description: B,
          data: G
        },
        D = y89[B],
        Y = Array.isArray(this._describeOperations) ? this._describeOperations.includes(B) : this._describeOperations;
      if (!D || !Y || !I) return Z;
      try {
        if (B === "mapReduce") {
          let [W, J] = Q;
          G[D[0]] = typeof W === "string" ? W : W.name || "<anonymous>", G[D[1]] = typeof J === "string" ? J : J.name || "<anonymous>"
        } else
          for (let W = 0; W < D.length; W++) G[`db.mongodb.${D[W]}`] = JSON.stringify(Q[W])
      } catch (W) {}
      return Z
    }
  }
  X41.__initStatic();
  iIA.Mongo = X41
})
// @from(Start 235047, End 236586)
rIA = z((sIA) => {
  Object.defineProperty(sIA, "__esModule", {
    value: !0
  });
  var g$1 = z4(),
    aIA = rA(),
    f89 = MY(),
    v89 = BM();

  function b89(A) {
    return !!A && !!A.$use
  }
  class V41 {
    static __initStatic() {
      this.id = "Prisma"
    }
    constructor(A = {}) {
      if (this.name = V41.id, b89(A.client) && !A.client._sentryInstrumented) {
        aIA.addNonEnumerableProperty(A.client, "_sentryInstrumented", !0);
        let B = {};
        try {
          let Q = A.client._engineConfig;
          if (Q) {
            let {
              activeProvider: I,
              clientVersion: G
            } = Q;
            if (I) B["db.system"] = I;
            if (G) B["db.prisma.version"] = G
          }
        } catch (Q) {}
        A.client.$use((Q, I) => {
          if (v89.shouldDisableAutoInstrumentation(g$1.getCurrentHub)) return I(Q);
          let {
            action: G,
            model: Z
          } = Q;
          return g$1.startSpan({
            name: Z ? `${Z} ${G}` : G,
            onlyIfParent: !0,
            op: "db.prisma",
            attributes: {
              [g$1.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.db.prisma"
            },
            data: {
              ...B,
              "db.operation": G
            }
          }, () => I(Q))
        })
      } else f89.DEBUG_BUILD && aIA.logger.warn("Unsupported Prisma client provided to PrismaIntegration. Provided client:", A.client)
    }
    setupOnce() {}
  }
  V41.__initStatic();
  sIA.Prisma = V41
})
// @from(Start 236592, End 238323)
eIA = z((tIA) => {
  var {
    _optionalChain: qx
  } = rA();
  Object.defineProperty(tIA, "__esModule", {
    value: !0
  });
  var tc = rA(),
    oIA = MY(),
    h89 = BM();
  class C41 {
    static __initStatic() {
      this.id = "GraphQL"
    }
    constructor() {
      this.name = C41.id
    }
    loadDependency() {
      return this._module = this._module || tc.loadModule("graphql/execution/execute.js")
    }
    setupOnce(A, B) {
      if (h89.shouldDisableAutoInstrumentation(B)) {
        oIA.DEBUG_BUILD && tc.logger.log("GraphQL Integration is skipped because of instrumenter configuration.");
        return
      }
      let Q = this.loadDependency();
      if (!Q) {
        oIA.DEBUG_BUILD && tc.logger.error("GraphQL Integration was unable to require graphql/execution package.");
        return
      }
      tc.fill(Q, "execute", function(I) {
        return function(...G) {
          let Z = B().getScope(),
            D = Z.getSpan(),
            Y = qx([D, "optionalAccess", (J) => J.startChild, "call", (J) => J({
              description: "execute",
              op: "graphql.execute",
              origin: "auto.graphql.graphql"
            })]);
          qx([Z, "optionalAccess", (J) => J.setSpan, "call", (J) => J(Y)]);
          let W = I.call(this, ...G);
          if (tc.isThenable(W)) return W.then((J) => {
            return qx([Y, "optionalAccess", (F) => F.end, "call", (F) => F()]), qx([Z, "optionalAccess", (F) => F.setSpan, "call", (F) => F(D)]), J
          });
          return qx([Y, "optionalAccess", (J) => J.end, "call", (J) => J()]), qx([Z, "optionalAccess", (J) => J.setSpan, "call", (J) => J(D)]), W
        }
      })
    }
  }
  C41.__initStatic();
  tIA.GraphQL = C41
})
// @from(Start 238329, End 241855)
QGA = z((BGA) => {
  var {
    _optionalChain: h$1
  } = rA();
  Object.defineProperty(BGA, "__esModule", {
    value: !0
  });
  var CZ = rA(),
    K41 = MY(),
    d89 = BM();
  class H41 {
    static __initStatic() {
      this.id = "Apollo"
    }
    constructor(A = {
      useNestjs: !1
    }) {
      this.name = H41.id, this._useNest = !!A.useNestjs
    }
    loadDependency() {
      if (this._useNest) this._module = this._module || CZ.loadModule("@nestjs/graphql");
      else this._module = this._module || CZ.loadModule("apollo-server-core");
      return this._module
    }
    setupOnce(A, B) {
      if (d89.shouldDisableAutoInstrumentation(B)) {
        K41.DEBUG_BUILD && CZ.logger.log("Apollo Integration is skipped because of instrumenter configuration.");
        return
      }
      if (this._useNest) {
        let Q = this.loadDependency();
        if (!Q) {
          K41.DEBUG_BUILD && CZ.logger.error("Apollo-NestJS Integration was unable to require @nestjs/graphql package.");
          return
        }
        CZ.fill(Q.GraphQLFactory.prototype, "mergeWithSchema", function(I) {
          return function(...G) {
            return CZ.fill(this.resolversExplorerService, "explore", function(Z) {
              return function() {
                let D = CZ.arrayify(Z.call(this));
                return AGA(D, B)
              }
            }), I.call(this, ...G)
          }
        })
      } else {
        let Q = this.loadDependency();
        if (!Q) {
          K41.DEBUG_BUILD && CZ.logger.error("Apollo Integration was unable to require apollo-server-core package.");
          return
        }
        CZ.fill(Q.ApolloServerBase.prototype, "constructSchema", function(I) {
          return function() {
            if (!this.config.resolvers) {
              if (K41.DEBUG_BUILD) {
                if (this.config.schema) CZ.logger.warn("Apollo integration is not able to trace `ApolloServer` instances constructed via `schema` property.If you are using NestJS with Apollo, please use `Sentry.Integrations.Apollo({ useNestjs: true })` instead."), CZ.logger.warn();
                else if (this.config.modules) CZ.logger.warn("Apollo integration is not able to trace `ApolloServer` instances constructed via `modules` property.");
                CZ.logger.error("Skipping tracing as no resolvers found on the `ApolloServer` instance.")
              }
              return I.call(this)
            }
            let G = CZ.arrayify(this.config.resolvers);
            return this.config.resolvers = AGA(G, B), I.call(this)
          }
        })
      }
    }
  }
  H41.__initStatic();

  function AGA(A, B) {
    return A.map((Q) => {
      return Object.keys(Q).forEach((I) => {
        Object.keys(Q[I]).forEach((G) => {
          if (typeof Q[I][G] !== "function") return;
          u89(Q, I, G, B)
        })
      }), Q
    })
  }

  function u89(A, B, Q, I) {
    CZ.fill(A[B], Q, function(G) {
      return function(...Z) {
        let Y = I().getScope().getSpan(),
          W = h$1([Y, "optionalAccess", (F) => F.startChild, "call", (F) => F({
            description: `${B}.${Q}`,
            op: "graphql.resolve",
            origin: "auto.graphql.apollo"
          })]),
          J = G.call(this, ...Z);
        if (CZ.isThenable(J)) return J.then((F) => {
          return h$1([W, "optionalAccess", (X) => X.end, "call", (X) => X()]), F
        });
        return h$1([W, "optionalAccess", (F) => F.end, "call", (F) => F()]), J
      }
    })
  }
  BGA.Apollo = H41
})
// @from(Start 241861, End 242623)
GGA = z((IGA, IM) => {
  Object.defineProperty(IGA, "__esModule", {
    value: !0
  });
  var _P = rA(),
    c89 = [() => {
      return new(_P.dynamicRequire(IM, "./apollo")).Apollo
    }, () => {
      return new(_P.dynamicRequire(IM, "./apollo")).Apollo({
        useNestjs: !0
      })
    }, () => {
      return new(_P.dynamicRequire(IM, "./graphql")).GraphQL
    }, () => {
      return new(_P.dynamicRequire(IM, "./mongo")).Mongo
    }, () => {
      return new(_P.dynamicRequire(IM, "./mongo")).Mongo({
        mongoose: !0
      })
    }, () => {
      return new(_P.dynamicRequire(IM, "./mysql")).Mysql
    }, () => {
      return new(_P.dynamicRequire(IM, "./postgres")).Postgres
    }];
  IGA.lazyLoadedNodePerformanceMonitoringIntegrations = c89
})
// @from(Start 242629, End 242777)
eW = z((ZGA) => {
  Object.defineProperty(ZGA, "__esModule", {
    value: !0
  });
  var i89 = rA(),
    n89 = i89.GLOBAL_OBJ;
  ZGA.WINDOW = n89
})
// @from(Start 242783, End 243636)
d$1 = z((JGA) => {
  Object.defineProperty(JGA, "__esModule", {
    value: !0
  });
  var DGA = z4(),
    YGA = rA(),
    WGA = MY(),
    m$1 = eW();

  function s89() {
    if (m$1.WINDOW.document) m$1.WINDOW.document.addEventListener("visibilitychange", () => {
      let A = DGA.getActiveTransaction();
      if (m$1.WINDOW.document.hidden && A) {
        let {
          op: Q,
          status: I
        } = DGA.spanToJSON(A);
        if (WGA.DEBUG_BUILD && YGA.logger.log(`[Tracing] Transaction: cancelled -> since tab moved to the background, op: ${Q}`), !I) A.setStatus("cancelled");
        A.setTag("visibilitychange", "document.hidden"), A.end()
      }
    });
    else WGA.DEBUG_BUILD && YGA.logger.warn("[Tracing] Could not set up background tab detection due to lack of global document")
  }
  JGA.registerBackgroundTabDetection = s89
})
// @from(Start 243642, End 243978)
Mx = z((FGA) => {
  Object.defineProperty(FGA, "__esModule", {
    value: !0
  });
  var o89 = (A, B, Q) => {
    let I, G;
    return (Z) => {
      if (B.value >= 0) {
        if (Z || Q) {
          if (G = B.value - (I || 0), G || I === void 0) I = B.value, B.delta = G, A(B)
        }
      }
    }
  };
  FGA.bindReporter = o89
})
// @from(Start 243984, End 244211)
VGA = z((XGA) => {
  Object.defineProperty(XGA, "__esModule", {
    value: !0
  });
  var e89 = () => {
    return `v3-${Date.now()}-${Math.floor(Math.random()*8999999999999)+1000000000000}`
  };
  XGA.generateUniqueID = e89
})
// @from(Start 244217, End 245080)
Al = z((CGA) => {
  Object.defineProperty(CGA, "__esModule", {
    value: !0
  });
  var ec = eW(),
    BB9 = () => {
      let A = ec.WINDOW.performance.timing,
        B = ec.WINDOW.performance.navigation.type,
        Q = {
          entryType: "navigation",
          startTime: 0,
          type: B == 2 ? "back_forward" : B === 1 ? "reload" : "navigate"
        };
      for (let I in A)
        if (I !== "navigationStart" && I !== "toJSON") Q[I] = Math.max(A[I] - A.navigationStart, 0);
      return Q
    },
    QB9 = () => {
      if (ec.WINDOW.__WEB_VITALS_POLYFILL__) return ec.WINDOW.performance && (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || BB9());
      else return ec.WINDOW.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
    };
  CGA.getNavigationEntry = QB9
})
// @from(Start 245086, End 245327)
z41 = z((KGA) => {
  Object.defineProperty(KGA, "__esModule", {
    value: !0
  });
  var GB9 = Al(),
    ZB9 = () => {
      let A = GB9.getNavigationEntry();
      return A && A.activationStart || 0
    };
  KGA.getActivationStart = ZB9
})
// @from(Start 245333, End 245992)
Lx = z((zGA) => {
  Object.defineProperty(zGA, "__esModule", {
    value: !0
  });
  var HGA = eW(),
    YB9 = VGA(),
    WB9 = z41(),
    JB9 = Al(),
    FB9 = (A, B) => {
      let Q = JB9.getNavigationEntry(),
        I = "navigate";
      if (Q)
        if (HGA.WINDOW.document && HGA.WINDOW.document.prerendering || WB9.getActivationStart() > 0) I = "prerender";
        else I = Q.type.replace(/_/g, "-");
      return {
        name: A,
        value: typeof B === "undefined" ? -1 : B,
        rating: "good",
        delta: 0,
        entries: [],
        id: YB9.generateUniqueID(),
        navigationType: I
      }
    };
  zGA.initMetric = FB9
})
// @from(Start 245998, End 246444)
jP = z((wGA) => {
  Object.defineProperty(wGA, "__esModule", {
    value: !0
  });
  var VB9 = (A, B, Q) => {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(A)) {
        let I = new PerformanceObserver((G) => {
          B(G.getEntries())
        });
        return I.observe(Object.assign({
          type: A,
          buffered: !0
        }, Q || {})), I
      }
    } catch (I) {}
    return
  };
  wGA.observe = VB9
})
// @from(Start 246450, End 246956)
Rx = z((UGA) => {
  Object.defineProperty(UGA, "__esModule", {
    value: !0
  });
  var EGA = eW(),
    KB9 = (A, B) => {
      let Q = (I) => {
        if (I.type === "pagehide" || EGA.WINDOW.document.visibilityState === "hidden") {
          if (A(I), B) removeEventListener("visibilitychange", Q, !0), removeEventListener("pagehide", Q, !0)
        }
      };
      if (EGA.WINDOW.document) addEventListener("visibilitychange", Q, !0), addEventListener("pagehide", Q, !0)
    };
  UGA.onHidden = KB9
})
// @from(Start 246962, End 247952)
$GA = z((NGA) => {
  Object.defineProperty(NGA, "__esModule", {
    value: !0
  });
  var zB9 = Mx(),
    wB9 = Lx(),
    EB9 = jP(),
    UB9 = Rx(),
    NB9 = (A, B = {}) => {
      let Q = wB9.initMetric("CLS", 0),
        I, G = 0,
        Z = [],
        D = (W) => {
          W.forEach((J) => {
            if (!J.hadRecentInput) {
              let F = Z[0],
                X = Z[Z.length - 1];
              if (G && Z.length !== 0 && J.startTime - X.startTime < 1000 && J.startTime - F.startTime < 5000) G += J.value, Z.push(J);
              else G = J.value, Z = [J];
              if (G > Q.value) {
                if (Q.value = G, Q.entries = Z, I) I()
              }
            }
          })
        },
        Y = EB9.observe("layout-shift", D);
      if (Y) {
        I = zB9.bindReporter(A, Q, B.reportAllChanges);
        let W = () => {
          D(Y.takeRecords()), I(!0)
        };
        return UB9.onHidden(W), W
      }
      return
    };
  NGA.onCLS = NB9
})
// @from(Start 247958, End 248579)
U41 = z((qGA) => {
  Object.defineProperty(qGA, "__esModule", {
    value: !0
  });
  var w41 = eW(),
    qB9 = Rx(),
    E41 = -1,
    MB9 = () => {
      if (w41.WINDOW.document && w41.WINDOW.document.visibilityState) E41 = w41.WINDOW.document.visibilityState === "hidden" && !w41.WINDOW.document.prerendering ? 0 : 1 / 0
    },
    LB9 = () => {
      qB9.onHidden(({
        timeStamp: A
      }) => {
        E41 = A
      }, !0)
    },
    RB9 = () => {
      if (E41 < 0) MB9(), LB9();
      return {
        get firstHiddenTime() {
          return E41
        }
      }
    };
  qGA.getVisibilityWatcher = RB9
})
// @from(Start 248585, End 249241)
LGA = z((MGA) => {
  Object.defineProperty(MGA, "__esModule", {
    value: !0
  });
  var TB9 = Mx(),
    PB9 = U41(),
    SB9 = Lx(),
    _B9 = jP(),
    jB9 = Rx(),
    yB9 = (A) => {
      let B = PB9.getVisibilityWatcher(),
        Q = SB9.initMetric("FID"),
        I, G = (Y) => {
          if (Y.startTime < B.firstHiddenTime) Q.value = Y.processingStart - Y.startTime, Q.entries.push(Y), I(!0)
        },
        Z = (Y) => {
          Y.forEach(G)
        },
        D = _B9.observe("first-input", Z);
      if (I = TB9.bindReporter(A, Q), D) jB9.onHidden(() => {
        Z(D.takeRecords()), D.disconnect()
      }, !0)
    };
  MGA.onFID = yB9
})
// @from(Start 249247, End 249966)
TGA = z((OGA) => {
  Object.defineProperty(OGA, "__esModule", {
    value: !0
  });
  var xB9 = jP(),
    RGA = 0,
    u$1 = 1 / 0,
    N41 = 0,
    fB9 = (A) => {
      A.forEach((B) => {
        if (B.interactionId) u$1 = Math.min(u$1, B.interactionId), N41 = Math.max(N41, B.interactionId), RGA = N41 ? (N41 - u$1) / 7 + 1 : 0
      })
    },
    p$1, vB9 = () => {
      return p$1 ? RGA : performance.interactionCount || 0
    },
    bB9 = () => {
      if ("interactionCount" in performance || p$1) return;
      p$1 = xB9.observe("event", fB9, {
        type: "event",
        buffered: !0,
        durationThreshold: 0
      })
    };
  OGA.getInteractionCount = vB9;
  OGA.initInteractionCountPolyfill = bB9
})
// @from(Start 249972, End 251920)
kGA = z((yGA) => {
  Object.defineProperty(yGA, "__esModule", {
    value: !0
  });
  var mB9 = Mx(),
    dB9 = Lx(),
    uB9 = jP(),
    pB9 = Rx(),
    _GA = TGA(),
    jGA = () => {
      return _GA.getInteractionCount()
    },
    PGA = 10,
    TU = [],
    c$1 = {},
    SGA = (A) => {
      let B = TU[TU.length - 1],
        Q = c$1[A.interactionId];
      if (Q || TU.length < PGA || A.duration > B.latency) {
        if (Q) Q.entries.push(A), Q.latency = Math.max(Q.latency, A.duration);
        else {
          let I = {
            id: A.interactionId,
            latency: A.duration,
            entries: [A]
          };
          c$1[I.id] = I, TU.push(I)
        }
        TU.sort((I, G) => G.latency - I.latency), TU.splice(PGA).forEach((I) => {
          delete c$1[I.id]
        })
      }
    },
    cB9 = () => {
      let A = Math.min(TU.length - 1, Math.floor(jGA() / 50));
      return TU[A]
    },
    lB9 = (A, B) => {
      B = B || {}, _GA.initInteractionCountPolyfill();
      let Q = dB9.initMetric("INP"),
        I, G = (D) => {
          D.forEach((W) => {
            if (W.interactionId) SGA(W);
            if (W.entryType === "first-input") {
              if (!TU.some((F) => {
                  return F.entries.some((X) => {
                    return W.duration === X.duration && W.startTime === X.startTime
                  })
                })) SGA(W)
            }
          });
          let Y = cB9();
          if (Y && Y.latency !== Q.value) Q.value = Y.latency, Q.entries = Y.entries, I()
        },
        Z = uB9.observe("event", G, {
          durationThreshold: B.durationThreshold || 40
        });
      if (I = mB9.bindReporter(A, Q, B.reportAllChanges), Z) Z.observe({
        type: "first-input",
        buffered: !0
      }), pB9.onHidden(() => {
        if (G(Z.takeRecords()), Q.value < 0 && jGA() > 0) Q.value = 0, Q.entries = [];
        I(!0)
      })
    };
  yGA.onINP = lB9
})
// @from(Start 251926, End 252964)
vGA = z((fGA) => {
  Object.defineProperty(fGA, "__esModule", {
    value: !0
  });
  var nB9 = eW(),
    aB9 = Mx(),
    sB9 = z41(),
    rB9 = U41(),
    oB9 = Lx(),
    tB9 = jP(),
    eB9 = Rx(),
    xGA = {},
    A39 = (A) => {
      let B = rB9.getVisibilityWatcher(),
        Q = oB9.initMetric("LCP"),
        I, G = (D) => {
          let Y = D[D.length - 1];
          if (Y) {
            let W = Math.max(Y.startTime - sB9.getActivationStart(), 0);
            if (W < B.firstHiddenTime) Q.value = W, Q.entries = [Y], I()
          }
        },
        Z = tB9.observe("largest-contentful-paint", G);
      if (Z) {
        I = aB9.bindReporter(A, Q);
        let D = () => {
          if (!xGA[Q.id]) G(Z.takeRecords()), Z.disconnect(), xGA[Q.id] = !0, I(!0)
        };
        return ["keydown", "click"].forEach((Y) => {
          if (nB9.WINDOW.document) addEventListener(Y, D, {
            once: !0,
            capture: !0
          })
        }), eB9.onHidden(D, !0), D
      }
      return
    };
  fGA.onLCP = A39
})
// @from(Start 252970, End 253864)
gGA = z((bGA) => {
  Object.defineProperty(bGA, "__esModule", {
    value: !0
  });
  var l$1 = eW(),
    Q39 = Mx(),
    I39 = z41(),
    G39 = Al(),
    Z39 = Lx(),
    i$1 = (A) => {
      if (!l$1.WINDOW.document) return;
      if (l$1.WINDOW.document.prerendering) addEventListener("prerenderingchange", () => i$1(A), !0);
      else if (l$1.WINDOW.document.readyState !== "complete") addEventListener("load", () => i$1(A), !0);
      else setTimeout(A, 0)
    },
    D39 = (A, B) => {
      B = B || {};
      let Q = Z39.initMetric("TTFB"),
        I = Q39.bindReporter(A, Q, B.reportAllChanges);
      i$1(() => {
        let G = G39.getNavigationEntry();
        if (G) {
          if (Q.value = Math.max(G.responseStart - I39.getActivationStart(), 0), Q.value < 0 || Q.value > performance.now()) return;
          Q.entries = [G], I(!0)
        }
      })
    };
  bGA.onTTFB = D39
})
// @from(Start 253870, End 256320)
Tx = z((nGA) => {
  Object.defineProperty(nGA, "__esModule", {
    value: !0
  });
  var hGA = rA(),
    W39 = MY(),
    J39 = $GA(),
    F39 = LGA(),
    X39 = kGA(),
    V39 = vGA(),
    C39 = jP(),
    K39 = gGA(),
    Bl = {},
    $41 = {},
    mGA, dGA, uGA, pGA, cGA;

  function H39(A, B = !1) {
    return Ql("cls", A, $39, mGA, B)
  }

  function z39(A, B = !1) {
    return Ql("lcp", A, M39, uGA, B)
  }

  function w39(A) {
    return Ql("ttfb", A, L39, pGA)
  }

  function E39(A) {
    return Ql("fid", A, q39, dGA)
  }

  function U39(A) {
    return Ql("inp", A, R39, cGA)
  }

  function N39(A, B) {
    if (lGA(A, B), !$41[A]) O39(A), $41[A] = !0;
    return iGA(A, B)
  }

  function Ox(A, B) {
    let Q = Bl[A];
    if (!Q || !Q.length) return;
    for (let I of Q) try {
      I(B)
    } catch (G) {
      W39.DEBUG_BUILD && hGA.logger.error(`Error while triggering instrumentation handler.
Type: ${A}
Name: ${hGA.getFunctionName(I)}
Error:`, G)
    }
  }

  function $39() {
    return J39.onCLS((A) => {
      Ox("cls", {
        metric: A
      }), mGA = A
    }, {
      reportAllChanges: !0
    })
  }

  function q39() {
    return F39.onFID((A) => {
      Ox("fid", {
        metric: A
      }), dGA = A
    })
  }

  function M39() {
    return V39.onLCP((A) => {
      Ox("lcp", {
        metric: A
      }), uGA = A
    })
  }

  function L39() {
    return K39.onTTFB((A) => {
      Ox("ttfb", {
        metric: A
      }), pGA = A
    })
  }

  function R39() {
    return X39.onINP((A) => {
      Ox("inp", {
        metric: A
      }), cGA = A
    })
  }

  function Ql(A, B, Q, I, G = !1) {
    lGA(A, B);
    let Z;
    if (!$41[A]) Z = Q(), $41[A] = !0;
    if (I) B({
      metric: I
    });
    return iGA(A, B, G ? Z : void 0)
  }

  function O39(A) {
    let B = {};
    if (A === "event") B.durationThreshold = 0;
    C39.observe(A, (Q) => {
      Ox(A, {
        entries: Q
      })
    }, B)
  }

  function lGA(A, B) {
    Bl[A] = Bl[A] || [], Bl[A].push(B)
  }

  function iGA(A, B, Q) {
    return () => {
      if (Q) Q();
      let I = Bl[A];
      if (!I) return;
      let G = I.indexOf(B);
      if (G !== -1) I.splice(G, 1)
    }
  }
  nGA.addClsInstrumentationHandler = H39;
  nGA.addFidInstrumentationHandler = E39;
  nGA.addInpInstrumentationHandler = U39;
  nGA.addLcpInstrumentationHandler = z39;
  nGA.addPerformanceInstrumentationHandler = N39;
  nGA.addTtfbInstrumentationHandler = w39
})
// @from(Start 256326, End 256731)
sGA = z((aGA) => {
  Object.defineProperty(aGA, "__esModule", {
    value: !0
  });

  function k39(A) {
    return typeof A === "number" && isFinite(A)
  }

  function x39(A, {
    startTimestamp: B,
    ...Q
  }) {
    if (B && A.startTimestamp > B) A.startTimestamp = B;
    return A.startChild({
      startTimestamp: B,
      ...Q
    })
  }
  aGA._startChild = x39;
  aGA.isMeasurementValue = k39
})
// @from(Start 256737, End 269992)
s$1 = z((AZA) => {
  Object.defineProperty(AZA, "__esModule", {
    value: !0
  });
  var PU = z4(),
    g8 = rA(),
    AJ = MY(),
    yP = Tx(),
    SU = eW(),
    b39 = U41(),
    _U = sGA(),
    g39 = Al(),
    h39 = 2147483647;

  function v7(A) {
    return A / 1000
  }

  function a$1() {
    return SU.WINDOW && SU.WINDOW.addEventListener && SU.WINDOW.performance
  }
  var rGA = 0,
    g3 = {},
    rH, Il;

  function m39() {
    let A = a$1();
    if (A && g8.browserPerformanceTimeOrigin) {
      if (A.mark) SU.WINDOW.performance.mark("sentry-tracing-init");
      let B = i39(),
        Q = c39(),
        I = l39(),
        G = n39();
      return () => {
        B(), Q(), I(), G()
      }
    }
    return () => {
      return
    }
  }

  function d39() {
    yP.addPerformanceInstrumentationHandler("longtask", ({
      entries: A
    }) => {
      for (let B of A) {
        let Q = PU.getActiveTransaction();
        if (!Q) return;
        let I = v7(g8.browserPerformanceTimeOrigin + B.startTime),
          G = v7(B.duration);
        Q.startChild({
          description: "Main UI thread blocked",
          op: "ui.long-task",
          origin: "auto.ui.browser.metrics",
          startTimestamp: I,
          endTimestamp: I + G
        })
      }
    })
  }

  function u39() {
    yP.addPerformanceInstrumentationHandler("event", ({
      entries: A
    }) => {
      for (let B of A) {
        let Q = PU.getActiveTransaction();
        if (!Q) return;
        if (B.name === "click") {
          let I = v7(g8.browserPerformanceTimeOrigin + B.startTime),
            G = v7(B.duration),
            Z = {
              description: g8.htmlTreeAsString(B.target),
              op: `ui.interaction.${B.name}`,
              origin: "auto.ui.browser.metrics",
              startTimestamp: I,
              endTimestamp: I + G
            },
            D = g8.getComponentName(B.target);
          if (D) Z.attributes = {
            "ui.component_name": D
          };
          Q.startChild(Z)
        }
      }
    })
  }

  function p39(A, B) {
    if (a$1() && g8.browserPerformanceTimeOrigin) {
      let I = a39(A, B);
      return () => {
        I()
      }
    }
    return () => {
      return
    }
  }

  function c39() {
    return yP.addClsInstrumentationHandler(({
      metric: A
    }) => {
      let B = A.entries[A.entries.length - 1];
      if (!B) return;
      AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding CLS"), g3.cls = {
        value: A.value,
        unit: ""
      }, Il = B
    }, !0)
  }

  function l39() {
    return yP.addLcpInstrumentationHandler(({
      metric: A
    }) => {
      let B = A.entries[A.entries.length - 1];
      if (!B) return;
      AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding LCP"), g3.lcp = {
        value: A.value,
        unit: "millisecond"
      }, rH = B
    }, !0)
  }

  function i39() {
    return yP.addFidInstrumentationHandler(({
      metric: A
    }) => {
      let B = A.entries[A.entries.length - 1];
      if (!B) return;
      let Q = v7(g8.browserPerformanceTimeOrigin),
        I = v7(B.startTime);
      AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding FID"), g3.fid = {
        value: A.value,
        unit: "millisecond"
      }, g3["mark.fid"] = {
        value: Q + I,
        unit: "second"
      }
    })
  }

  function n39() {
    return yP.addTtfbInstrumentationHandler(({
      metric: A
    }) => {
      if (!A.entries[A.entries.length - 1]) return;
      AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding TTFB"), g3.ttfb = {
        value: A.value,
        unit: "millisecond"
      }
    })
  }
  var oGA = {
    click: "click",
    pointerdown: "click",
    pointerup: "click",
    mousedown: "click",
    mouseup: "click",
    touchstart: "click",
    touchend: "click",
    mouseover: "hover",
    mouseout: "hover",
    mouseenter: "hover",
    mouseleave: "hover",
    pointerover: "hover",
    pointerout: "hover",
    pointerenter: "hover",
    pointerleave: "hover",
    dragstart: "drag",
    dragend: "drag",
    drag: "drag",
    dragenter: "drag",
    dragleave: "drag",
    dragover: "drag",
    drop: "drag",
    keydown: "press",
    keyup: "press",
    keypress: "press",
    input: "press"
  };

  function a39(A, B) {
    return yP.addInpInstrumentationHandler(({
      metric: Q
    }) => {
      if (Q.value === void 0) return;
      let I = Q.entries.find((R) => R.duration === Q.value && oGA[R.name] !== void 0),
        G = PU.getClient();
      if (!I || !G) return;
      let Z = oGA[I.name],
        D = G.getOptions(),
        Y = v7(g8.browserPerformanceTimeOrigin + I.startTime),
        W = v7(Q.value),
        J = I.interactionId !== void 0 ? A[I.interactionId] : void 0;
      if (J === void 0) return;
      let {
        routeName: F,
        parentContext: X,
        activeTransaction: V,
        user: C,
        replayId: K
      } = J, E = C !== void 0 ? C.email || C.id || C.ip_address : void 0, N = V !== void 0 ? V.getProfileId() : void 0, q = new PU.Span({
        startTimestamp: Y,
        endTimestamp: Y + W,
        op: `ui.interaction.${Z}`,
        name: g8.htmlTreeAsString(I.target),
        attributes: {
          release: D.release,
          environment: D.environment,
          transaction: F,
          ...E !== void 0 && E !== "" ? {
            user: E
          } : {},
          ...N !== void 0 ? {
            profile_id: N
          } : {},
          ...K !== void 0 ? {
            replay_id: K
          } : {}
        },
        exclusiveTime: Q.value,
        measurements: {
          inp: {
            value: Q.value,
            unit: "millisecond"
          }
        }
      }), O = BQ9(X, D, B);
      if (!O) return;
      if (Math.random() < O) {
        let R = q ? PU.createSpanEnvelope([q], G.getDsn()) : void 0,
          T = G && G.getTransport();
        if (T && R) T.send(R).then(null, (L) => {
          AJ.DEBUG_BUILD && g8.logger.error("Error while sending interaction:", L)
        });
        return
      }
    })
  }

  function s39(A) {
    let B = a$1();
    if (!B || !SU.WINDOW.performance.getEntries || !g8.browserPerformanceTimeOrigin) return;
    AJ.DEBUG_BUILD && g8.logger.log("[Tracing] Adding & adjusting spans using Performance API");
    let Q = v7(g8.browserPerformanceTimeOrigin),
      I = B.getEntries(),
      {
        op: G,
        start_timestamp: Z
      } = PU.spanToJSON(A);
    if (I.slice(rGA).forEach((D) => {
        let Y = v7(D.startTime),
          W = v7(D.duration);
        if (A.op === "navigation" && Z && Q + Y < Z) return;
        switch (D.entryType) {
          case "navigation": {
            r39(A, D, Q);
            break
          }
          case "mark":
          case "paint":
          case "measure": {
            tGA(A, D, Y, W, Q);
            let J = b39.getVisibilityWatcher(),
              F = D.startTime < J.firstHiddenTime;
            if (D.name === "first-paint" && F) AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding FP"), g3.fp = {
              value: D.startTime,
              unit: "millisecond"
            };
            if (D.name === "first-contentful-paint" && F) AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding FCP"), g3.fcp = {
              value: D.startTime,
              unit: "millisecond"
            };
            break
          }
          case "resource": {
            eGA(A, D, D.name, Y, W, Q);
            break
          }
        }
      }), rGA = Math.max(I.length - 1, 0), t39(A), G === "pageload") {
      AQ9(g3), ["fcp", "fp", "lcp"].forEach((Y) => {
        if (!g3[Y] || !Z || Q >= Z) return;
        let W = g3[Y].value,
          J = Q + v7(W),
          F = Math.abs((J - Z) * 1000),
          X = F - W;
        AJ.DEBUG_BUILD && g8.logger.log(`[Measurements] Normalized ${Y} from ${W} to ${F} (${X})`), g3[Y].value = F
      });
      let D = g3["mark.fid"];
      if (D && g3.fid) _U._startChild(A, {
        description: "first input delay",
        endTimestamp: D.value + v7(g3.fid.value),
        op: "ui.action",
        origin: "auto.ui.browser.metrics",
        startTimestamp: D.value
      }), delete g3["mark.fid"];
      if (!("fcp" in g3)) delete g3.cls;
      Object.keys(g3).forEach((Y) => {
        PU.setMeasurement(Y, g3[Y].value, g3[Y].unit)
      }), e39(A)
    }
    rH = void 0, Il = void 0, g3 = {}
  }

  function tGA(A, B, Q, I, G) {
    let Z = G + Q,
      D = Z + I;
    return _U._startChild(A, {
      description: B.name,
      endTimestamp: D,
      op: B.entryType,
      origin: "auto.resource.browser.metrics",
      startTimestamp: Z
    }), Z
  }

  function r39(A, B, Q) {
    ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach((I) => {
      q41(A, B, I, Q)
    }), q41(A, B, "secureConnection", Q, "TLS/SSL", "connectEnd"), q41(A, B, "fetch", Q, "cache", "domainLookupStart"), q41(A, B, "domainLookup", Q, "DNS"), o39(A, B, Q)
  }

  function q41(A, B, Q, I, G, Z) {
    let D = Z ? B[Z] : B[`${Q}End`],
      Y = B[`${Q}Start`];
    if (!Y || !D) return;
    _U._startChild(A, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: G || Q,
      startTimestamp: I + v7(Y),
      endTimestamp: I + v7(D)
    })
  }

  function o39(A, B, Q) {
    if (B.responseEnd) _U._startChild(A, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "request",
      startTimestamp: Q + v7(B.requestStart),
      endTimestamp: Q + v7(B.responseEnd)
    }), _U._startChild(A, {
      op: "browser",
      origin: "auto.browser.browser.metrics",
      description: "response",
      startTimestamp: Q + v7(B.responseStart),
      endTimestamp: Q + v7(B.responseEnd)
    })
  }

  function eGA(A, B, Q, I, G, Z) {
    if (B.initiatorType === "xmlhttprequest" || B.initiatorType === "fetch") return;
    let D = g8.parseUrl(Q),
      Y = {};
    if (n$1(Y, B, "transferSize", "http.response_transfer_size"), n$1(Y, B, "encodedBodySize", "http.response_content_length"), n$1(Y, B, "decodedBodySize", "http.decoded_response_content_length"), "renderBlockingStatus" in B) Y["resource.render_blocking_status"] = B.renderBlockingStatus;
    if (D.protocol) Y["url.scheme"] = D.protocol.split(":").pop();
    if (D.host) Y["server.address"] = D.host;
    Y["url.same_origin"] = Q.includes(SU.WINDOW.location.origin);
    let W = Z + I,
      J = W + G;
    _U._startChild(A, {
      description: Q.replace(SU.WINDOW.location.origin, ""),
      endTimestamp: J,
      op: B.initiatorType ? `resource.${B.initiatorType}` : "resource.other",
      origin: "auto.resource.browser.metrics",
      startTimestamp: W,
      data: Y
    })
  }

  function t39(A) {
    let B = SU.WINDOW.navigator;
    if (!B) return;
    let Q = B.connection;
    if (Q) {
      if (Q.effectiveType) A.setTag("effectiveConnectionType", Q.effectiveType);
      if (Q.type) A.setTag("connectionType", Q.type);
      if (_U.isMeasurementValue(Q.rtt)) g3["connection.rtt"] = {
        value: Q.rtt,
        unit: "millisecond"
      }
    }
    if (_U.isMeasurementValue(B.deviceMemory)) A.setTag("deviceMemory", `${B.deviceMemory} GB`);
    if (_U.isMeasurementValue(B.hardwareConcurrency)) A.setTag("hardwareConcurrency", String(B.hardwareConcurrency))
  }

  function e39(A) {
    if (rH) {
      if (AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding LCP Data"), rH.element) A.setTag("lcp.element", g8.htmlTreeAsString(rH.element));
      if (rH.id) A.setTag("lcp.id", rH.id);
      if (rH.url) A.setTag("lcp.url", rH.url.trim().slice(0, 200));
      A.setTag("lcp.size", rH.size)
    }
    if (Il && Il.sources) AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding CLS Data"), Il.sources.forEach((B, Q) => A.setTag(`cls.source.${Q+1}`, g8.htmlTreeAsString(B.node)))
  }

  function n$1(A, B, Q, I) {
    let G = B[Q];
    if (G != null && G < h39) A[I] = G
  }

  function AQ9(A) {
    let B = g39.getNavigationEntry();
    if (!B) return;
    let {
      responseStart: Q,
      requestStart: I
    } = B;
    if (I <= Q) AJ.DEBUG_BUILD && g8.logger.log("[Measurements] Adding TTFB Request Time"), A["ttfb.requestTime"] = {
      value: Q - I,
      unit: "millisecond"
    }
  }

  function BQ9(A, B, Q) {
    if (!PU.hasTracingEnabled(B)) return !1;
    let I;
    if (A !== void 0 && typeof B.tracesSampler === "function") I = B.tracesSampler({
      transactionContext: A,
      name: A.name,
      parentSampled: A.parentSampled,
      attributes: {
        ...A.data,
        ...A.attributes
      },
      location: SU.WINDOW.location
    });
    else if (A !== void 0 && A.sampled !== void 0) I = A.sampled;
    else if (typeof B.tracesSampleRate !== "undefined") I = B.tracesSampleRate;
    else I = 1;
    if (!PU.isValidSampleRate(I)) return AJ.DEBUG_BUILD && g8.logger.warn("[Tracing] Discarding interaction span because of invalid sample rate."), !1;
    if (I === !0) return Q;
    else if (I === !1) return 0;
    return I * Q
  }
  AZA._addMeasureSpans = tGA;
  AZA._addResourceSpans = eGA;
  AZA.addPerformanceEntries = s39;
  AZA.startTrackingINP = p39;
  AZA.startTrackingInteractions = u39;
  AZA.startTrackingLongTasks = d39;
  AZA.startTrackingWebVitals = m39
})
// @from(Start 269998, End 273120)
r$1 = z((QZA) => {
  Object.defineProperty(QZA, "__esModule", {
    value: !0
  });
  var oH = z4(),
    kP = rA();

  function JQ9(A, B, Q, I, G = "auto.http.browser") {
    if (!oH.hasTracingEnabled() || !A.fetchData) return;
    let Z = B(A.fetchData.url);
    if (A.endTimestamp && Z) {
      let C = A.fetchData.__span;
      if (!C) return;
      let K = I[C];
      if (K) XQ9(K, A), delete I[C];
      return
    }
    let D = oH.getCurrentScope(),
      Y = oH.getClient(),
      {
        method: W,
        url: J
      } = A.fetchData,
      F = FQ9(J),
      X = F ? kP.parseUrl(F).host : void 0,
      V = Z ? oH.startInactiveSpan({
        name: `${W} ${J}`,
        onlyIfParent: !0,
        attributes: {
          url: J,
          type: "fetch",
          "http.method": W,
          "http.url": F,
          "server.address": X,
          [oH.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: G
        },
        op: "http.client"
      }) : void 0;
    if (V) A.fetchData.__span = V.spanContext().spanId, I[V.spanContext().spanId] = V;
    if (Q(A.fetchData.url) && Y) {
      let C = A.args[0];
      A.args[1] = A.args[1] || {};
      let K = A.args[1];
      K.headers = BZA(C, Y, D, K, V)
    }
    return V
  }

  function BZA(A, B, Q, I, G) {
    let Z = G || Q.getSpan(),
      D = oH.getIsolationScope(),
      {
        traceId: Y,
        spanId: W,
        sampled: J,
        dsc: F
      } = {
        ...D.getPropagationContext(),
        ...Q.getPropagationContext()
      },
      X = Z ? oH.spanToTraceHeader(Z) : kP.generateSentryTraceHeader(Y, W, J),
      V = kP.dynamicSamplingContextToSentryBaggageHeader(F || (Z ? oH.getDynamicSamplingContextFromSpan(Z) : oH.getDynamicSamplingContextFromClient(Y, B, Q))),
      C = I.headers || (typeof Request !== "undefined" && kP.isInstanceOf(A, Request) ? A.headers : void 0);
    if (!C) return {
      "sentry-trace": X,
      baggage: V
    };
    else if (typeof Headers !== "undefined" && kP.isInstanceOf(C, Headers)) {
      let K = new Headers(C);
      if (K.append("sentry-trace", X), V) K.append(kP.BAGGAGE_HEADER_NAME, V);
      return K
    } else if (Array.isArray(C)) {
      let K = [...C, ["sentry-trace", X]];
      if (V) K.push([kP.BAGGAGE_HEADER_NAME, V]);
      return K
    } else {
      let K = "baggage" in C ? C.baggage : void 0,
        E = [];
      if (Array.isArray(K)) E.push(...K);
      else if (K) E.push(K);
      if (V) E.push(V);
      return {
        ...C,
        "sentry-trace": X,
        baggage: E.length > 0 ? E.join(",") : void 0
      }
    }
  }

  function FQ9(A) {
    try {
      return new URL(A).href
    } catch (B) {
      return
    }
  }

  function XQ9(A, B) {
    if (B.response) {
      oH.setHttpStatus(A, B.response.status);
      let Q = B.response && B.response.headers && B.response.headers.get("content-length");
      if (Q) {
        let I = parseInt(Q);
        if (I > 0) A.setAttribute("http.response_content_length", I)
      }
    } else if (B.error) A.setStatus("internal_error");
    A.end()
  }
  QZA.addTracingHeadersToFetchRequest = BZA;
  QZA.instrumentFetchRequest = JQ9
})
// @from(Start 273126, End 278398)
L41 = z((WZA) => {
  Object.defineProperty(WZA, "__esModule", {
    value: !0
  });
  var tV = z4(),
    eV = rA(),
    KQ9 = r$1(),
    HQ9 = Tx(),
    zQ9 = eW(),
    M41 = ["localhost", /^\/(?!\/)/],
    o$1 = {
      traceFetch: !0,
      traceXHR: !0,
      enableHTTPTimings: !0,
      tracingOrigins: M41,
      tracePropagationTargets: M41
    };

  function wQ9(A) {
    let {
      traceFetch: B,
      traceXHR: Q,
      tracePropagationTargets: I,
      tracingOrigins: G,
      shouldCreateSpanForRequest: Z,
      enableHTTPTimings: D
    } = {
      traceFetch: o$1.traceFetch,
      traceXHR: o$1.traceXHR,
      ...A
    }, Y = typeof Z === "function" ? Z : (F) => !0, W = (F) => ZZA(F, I || G), J = {};
    if (B) eV.addFetchInstrumentationHandler((F) => {
      let X = KQ9.instrumentFetchRequest(F, Y, W, J);
      if (X) {
        let V = YZA(F.fetchData.url),
          C = V ? eV.parseUrl(V).host : void 0;
        X.setAttributes({
          "http.url": V,
          "server.address": C
        })
      }
      if (D && X) IZA(X)
    });
    if (Q) eV.addXhrInstrumentationHandler((F) => {
      let X = DZA(F, Y, W, J);
      if (D && X) IZA(X)
    })
  }

  function EQ9(A) {
    return A.entryType === "resource" && "initiatorType" in A && typeof A.nextHopProtocol === "string" && (A.initiatorType === "fetch" || A.initiatorType === "xmlhttprequest")
  }

  function IZA(A) {
    let {
      url: B
    } = tV.spanToJSON(A).data || {};
    if (!B || typeof B !== "string") return;
    let Q = HQ9.addPerformanceInstrumentationHandler("resource", ({
      entries: I
    }) => {
      I.forEach((G) => {
        if (EQ9(G) && G.name.endsWith(B)) UQ9(G).forEach((D) => A.setAttribute(...D)), setTimeout(Q)
      })
    })
  }

  function GZA(A) {
    let B = "unknown",
      Q = "unknown",
      I = "";
    for (let G of A) {
      if (G === "/") {
        [B, Q] = A.split("/");
        break
      }
      if (!isNaN(Number(G))) {
        B = I === "h" ? "http" : I, Q = A.split(I)[1];
        break
      }
      I += G
    }
    if (I === A) B = I;
    return {
      name: B,
      version: Q
    }
  }

  function tH(A = 0) {
    return ((eV.browserPerformanceTimeOrigin || performance.timeOrigin) + A) / 1000
  }

  function UQ9(A) {
    let {
      name: B,
      version: Q
    } = GZA(A.nextHopProtocol), I = [];
    if (I.push(["network.protocol.version", Q], ["network.protocol.name", B]), !eV.browserPerformanceTimeOrigin) return I;
    return [...I, ["http.request.redirect_start", tH(A.redirectStart)],
      ["http.request.fetch_start", tH(A.fetchStart)],
      ["http.request.domain_lookup_start", tH(A.domainLookupStart)],
      ["http.request.domain_lookup_end", tH(A.domainLookupEnd)],
      ["http.request.connect_start", tH(A.connectStart)],
      ["http.request.secure_connection_start", tH(A.secureConnectionStart)],
      ["http.request.connection_end", tH(A.connectEnd)],
      ["http.request.request_start", tH(A.requestStart)],
      ["http.request.response_start", tH(A.responseStart)],
      ["http.request.response_end", tH(A.responseEnd)]
    ]
  }

  function ZZA(A, B) {
    return eV.stringMatchesSomePattern(A, B || M41)
  }

  function DZA(A, B, Q, I) {
    let G = A.xhr,
      Z = G && G[eV.SENTRY_XHR_DATA_KEY];
    if (!tV.hasTracingEnabled() || !G || G.__sentry_own_request__ || !Z) return;
    let D = B(Z.url);
    if (A.endTimestamp && D) {
      let C = G.__sentry_xhr_span_id__;
      if (!C) return;
      let K = I[C];
      if (K && Z.status_code !== void 0) tV.setHttpStatus(K, Z.status_code), K.end(), delete I[C];
      return
    }
    let Y = tV.getCurrentScope(),
      W = tV.getIsolationScope(),
      J = YZA(Z.url),
      F = J ? eV.parseUrl(J).host : void 0,
      X = D ? tV.startInactiveSpan({
        name: `${Z.method} ${Z.url}`,
        onlyIfParent: !0,
        attributes: {
          type: "xhr",
          "http.method": Z.method,
          "http.url": J,
          url: Z.url,
          "server.address": F,
          [tV.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser"
        },
        op: "http.client"
      }) : void 0;
    if (X) G.__sentry_xhr_span_id__ = X.spanContext().spanId, I[G.__sentry_xhr_span_id__] = X;
    let V = tV.getClient();
    if (G.setRequestHeader && Q(Z.url) && V) {
      let {
        traceId: C,
        spanId: K,
        sampled: E,
        dsc: N
      } = {
        ...W.getPropagationContext(),
        ...Y.getPropagationContext()
      }, q = X ? tV.spanToTraceHeader(X) : eV.generateSentryTraceHeader(C, K, E), O = eV.dynamicSamplingContextToSentryBaggageHeader(N || (X ? tV.getDynamicSamplingContextFromSpan(X) : tV.getDynamicSamplingContextFromClient(C, V, Y)));
      NQ9(G, q, O)
    }
    return X
  }

  function NQ9(A, B, Q) {
    try {
      if (A.setRequestHeader("sentry-trace", B), Q) A.setRequestHeader(eV.BAGGAGE_HEADER_NAME, Q)
    } catch (I) {}
  }

  function YZA(A) {
    try {
      return new URL(A, zQ9.WINDOW.location.origin).href
    } catch (B) {
      return
    }
  }
  WZA.DEFAULT_TRACE_PROPAGATION_TARGETS = M41;
  WZA.defaultRequestInstrumentationOptions = o$1;
  WZA.extractNetworkProtocol = GZA;
  WZA.instrumentOutgoingRequests = wQ9;
  WZA.shouldAttachHeaders = ZZA;
  WZA.xhrCallback = DZA
})
// @from(Start 278404, End 279683)
XZA = z((FZA) => {
  Object.defineProperty(FZA, "__esModule", {
    value: !0
  });
  var Gl = rA(),
    JZA = MY(),
    Zl = eW();

  function TQ9(A, B = !0, Q = !0) {
    if (!Zl.WINDOW || !Zl.WINDOW.location) {
      JZA.DEBUG_BUILD && Gl.logger.warn("Could not initialize routing instrumentation due to invalid location");
      return
    }
    let I = Zl.WINDOW.location.href,
      G;
    if (B) G = A({
      name: Zl.WINDOW.location.pathname,
      startTimestamp: Gl.browserPerformanceTimeOrigin ? Gl.browserPerformanceTimeOrigin / 1000 : void 0,
      op: "pageload",
      origin: "auto.pageload.browser",
      metadata: {
        source: "url"
      }
    });
    if (Q) Gl.addHistoryInstrumentationHandler(({
      to: Z,
      from: D
    }) => {
      if (D === void 0 && I && I.indexOf(Z) !== -1) {
        I = void 0;
        return
      }
      if (D !== Z) {
        if (I = void 0, G) JZA.DEBUG_BUILD && Gl.logger.log(`[Tracing] Finishing current transaction with op: ${G.op}`), G.end();
        G = A({
          name: Zl.WINDOW.location.pathname,
          op: "navigation",
          origin: "auto.navigation.browser",
          metadata: {
            source: "url"
          }
        })
      }
    })
  }
  FZA.instrumentRoutingWithDefaults = TQ9
})
// @from(Start 279689, End 289265)
EZA = z((wZA) => {
  Object.defineProperty(wZA, "__esModule", {
    value: !0
  });
  var AC = z4(),
    jU = rA(),
    GM = MY(),
    SQ9 = d$1(),
    VZA = Tx(),
    Dl = s$1(),
    KZA = L41(),
    _Q9 = XZA(),
    xP = eW(),
    HZA = "BrowserTracing",
    jQ9 = {
      ...AC.TRACING_DEFAULTS,
      markBackgroundTransactions: !0,
      routingInstrumentation: _Q9.instrumentRoutingWithDefaults,
      startTransactionOnLocationChange: !0,
      startTransactionOnPageLoad: !0,
      enableLongTask: !0,
      enableInp: !1,
      interactionsSampleRate: 1,
      _experiments: {},
      ...KZA.defaultRequestInstrumentationOptions
    },
    CZA = 10;
  class zZA {
    constructor(A) {
      if (this.name = HZA, this._hasSetTracePropagationTargets = !1, AC.addTracingExtensions(), GM.DEBUG_BUILD) this._hasSetTracePropagationTargets = !!(A && (A.tracePropagationTargets || A.tracingOrigins));
      if (this.options = {
          ...jQ9,
          ...A
        }, this.options._experiments.enableLongTask !== void 0) this.options.enableLongTask = this.options._experiments.enableLongTask;
      if (A && !A.tracePropagationTargets && A.tracingOrigins) this.options.tracePropagationTargets = A.tracingOrigins;
      if (this._collectWebVitals = Dl.startTrackingWebVitals(), this._interactionIdToRouteNameMapping = {}, this.options.enableInp) Dl.startTrackingINP(this._interactionIdToRouteNameMapping, this.options.interactionsSampleRate);
      if (this.options.enableLongTask) Dl.startTrackingLongTasks();
      if (this.options._experiments.enableInteractions) Dl.startTrackingInteractions();
      this._latestRoute = {
        name: void 0,
        context: void 0
      }
    }
    setupOnce(A, B) {
      this._getCurrentHub = B;
      let I = B().getClient(),
        G = I && I.getOptions(),
        {
          routingInstrumentation: Z,
          startTransactionOnLocationChange: D,
          startTransactionOnPageLoad: Y,
          markBackgroundTransactions: W,
          traceFetch: J,
          traceXHR: F,
          shouldCreateSpanForRequest: X,
          enableHTTPTimings: V,
          _experiments: C
        } = this.options,
        K = G && G.tracePropagationTargets,
        E = K || this.options.tracePropagationTargets;
      if (GM.DEBUG_BUILD && this._hasSetTracePropagationTargets && K) jU.logger.warn("[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used.");
      if (Z((N) => {
          let q = this._createRouteTransaction(N);
          return this.options._experiments.onStartRouteTransaction && this.options._experiments.onStartRouteTransaction(q, N, B), q
        }, Y, D), W) SQ9.registerBackgroundTabDetection();
      if (C.enableInteractions) this._registerInteractionListener();
      if (this.options.enableInp) this._registerInpInteractionListener();
      KZA.instrumentOutgoingRequests({
        traceFetch: J,
        traceXHR: F,
        tracePropagationTargets: E,
        shouldCreateSpanForRequest: X,
        enableHTTPTimings: V
      })
    }
    _createRouteTransaction(A) {
      if (!this._getCurrentHub) {
        GM.DEBUG_BUILD && jU.logger.warn(`[Tracing] Did not create ${A.op} transaction because _getCurrentHub is invalid.`);
        return
      }
      let B = this._getCurrentHub(),
        {
          beforeNavigate: Q,
          idleTimeout: I,
          finalTimeout: G,
          heartbeatInterval: Z
        } = this.options,
        D = A.op === "pageload",
        Y;
      if (D) {
        let V = D ? t$1("sentry-trace") : "",
          C = D ? t$1("baggage") : void 0,
          {
            traceId: K,
            dsc: E,
            parentSpanId: N,
            sampled: q
          } = jU.propagationContextFromHeaders(V, C);
        Y = {
          traceId: K,
          parentSpanId: N,
          parentSampled: q,
          ...A,
          metadata: {
            ...A.metadata,
            dynamicSamplingContext: E
          },
          trimEnd: !0
        }
      } else Y = {
        trimEnd: !0,
        ...A
      };
      let W = typeof Q === "function" ? Q(Y) : Y,
        J = W === void 0 ? {
          ...Y,
          sampled: !1
        } : W;
      if (J.metadata = J.name !== Y.name ? {
          ...J.metadata,
          source: "custom"
        } : J.metadata, this._latestRoute.name = J.name, this._latestRoute.context = J, J.sampled === !1) GM.DEBUG_BUILD && jU.logger.log(`[Tracing] Will not send ${J.op} transaction because of beforeNavigate.`);
      GM.DEBUG_BUILD && jU.logger.log(`[Tracing] Starting ${J.op} transaction on scope`);
      let {
        location: F
      } = xP.WINDOW, X = AC.startIdleTransaction(B, J, I, G, !0, {
        location: F
      }, Z, D);
      if (D) {
        if (xP.WINDOW.document) {
          if (xP.WINDOW.document.addEventListener("readystatechange", () => {
              if (["interactive", "complete"].includes(xP.WINDOW.document.readyState)) X.sendAutoFinishSignal()
            }), ["interactive", "complete"].includes(xP.WINDOW.document.readyState)) X.sendAutoFinishSignal()
        }
      }
      return X.registerBeforeFinishCallback((V) => {
        this._collectWebVitals(), Dl.addPerformanceEntries(V)
      }), X
    }
    _registerInteractionListener() {
      let A, B = () => {
        let {
          idleTimeout: Q,
          finalTimeout: I,
          heartbeatInterval: G
        } = this.options, Z = "ui.action.click", D = AC.getActiveTransaction();
        if (D && D.op && ["navigation", "pageload"].includes(D.op)) {
          GM.DEBUG_BUILD && jU.logger.warn("[Tracing] Did not create ui.action.click transaction because a pageload or navigation transaction is in progress.");
          return
        }
        if (A) A.setFinishReason("interactionInterrupted"), A.end(), A = void 0;
        if (!this._getCurrentHub) {
          GM.DEBUG_BUILD && jU.logger.warn("[Tracing] Did not create ui.action.click transaction because _getCurrentHub is invalid.");
          return
        }
        if (!this._latestRoute.name) {
          GM.DEBUG_BUILD && jU.logger.warn("[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing.");
          return
        }
        let Y = this._getCurrentHub(),
          {
            location: W
          } = xP.WINDOW,
          J = {
            name: this._latestRoute.name,
            op: "ui.action.click",
            trimEnd: !0,
            data: {
              [AC.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: this._latestRoute.context ? yQ9(this._latestRoute.context) : "url"
            }
          };
        A = AC.startIdleTransaction(Y, J, Q, I, !0, {
          location: W
        }, G)
      };
      ["click"].forEach((Q) => {
        if (xP.WINDOW.document) addEventListener(Q, B, {
          once: !1,
          capture: !0
        })
      })
    }
    _registerInpInteractionListener() {
      let A = ({
        entries: B
      }) => {
        let Q = AC.getClient(),
          I = Q !== void 0 && Q.getIntegrationByName !== void 0 ? Q.getIntegrationByName("Replay") : void 0,
          G = I !== void 0 ? I.getReplayId() : void 0,
          Z = AC.getActiveTransaction(),
          D = AC.getCurrentScope(),
          Y = D !== void 0 ? D.getUser() : void 0;
        B.forEach((W) => {
          if (kQ9(W)) {
            let J = W.interactionId;
            if (J === void 0) return;
            let F = this._interactionIdToRouteNameMapping[J],
              X = W.duration,
              V = W.startTime,
              C = Object.keys(this._interactionIdToRouteNameMapping),
              K = C.length > 0 ? C.reduce((E, N) => {
                return this._interactionIdToRouteNameMapping[E].duration < this._interactionIdToRouteNameMapping[N].duration ? E : N
              }) : void 0;
            if (W.entryType === "first-input") {
              if (C.map((N) => this._interactionIdToRouteNameMapping[N]).some((N) => {
                  return N.duration === X && N.startTime === V
                })) return
            }
            if (!J) return;
            if (F) F.duration = Math.max(F.duration, X);
            else if (C.length < CZA || K === void 0 || X > this._interactionIdToRouteNameMapping[K].duration) {
              let E = this._latestRoute.name,
                N = this._latestRoute.context;
              if (E && N) {
                if (K && Object.keys(this._interactionIdToRouteNameMapping).length >= CZA) delete this._interactionIdToRouteNameMapping[K];
                this._interactionIdToRouteNameMapping[J] = {
                  routeName: E,
                  duration: X,
                  parentContext: N,
                  user: Y,
                  activeTransaction: Z,
                  replayId: G,
                  startTime: V
                }
              }
            }
          }
        })
      };
      VZA.addPerformanceInstrumentationHandler("event", A), VZA.addPerformanceInstrumentationHandler("first-input", A)
    }
  }

  function t$1(A) {
    let B = jU.getDomElement(`meta[name=${A}]`);
    return B ? B.getAttribute("content") : void 0
  }

  function yQ9(A) {
    let B = A.attributes && A.attributes[AC.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
      Q = A.data && A.data[AC.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
      I = A.metadata && A.metadata.source;
    return B || Q || I
  }

  function kQ9(A) {
    return "duration" in A
  }
  wZA.BROWSER_TRACING_INTEGRATION_ID = HZA;
  wZA.BrowserTracing = zZA;
  wZA.getMetaContent = t$1
})