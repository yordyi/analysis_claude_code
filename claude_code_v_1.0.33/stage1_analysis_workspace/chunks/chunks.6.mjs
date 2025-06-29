
// @from(Start 552073, End 555684)
a41 = z((_YA, jYA) => {
  var {
    _optionalChain: qD9,
    _optionalChainDelete: TYA
  } = rA();
  Object.defineProperty(_YA, "__esModule", {
    value: !0
  });
  var MD9 = Z1("url"),
    kU = z4(),
    n41 = rA(),
    Nq1 = fP(),
    LD9 = OYA(),
    RD9 = 50,
    OD9 = 5000;

  function $q1(A, ...B) {
    n41.logger.log(`[ANR] ${A}`, ...B)
  }

  function TD9() {
    return n41.GLOBAL_OBJ
  }

  function PD9() {
    let A = kU.getGlobalScope().getScopeData();
    return kU.mergeScopeData(A, kU.getIsolationScope().getScopeData()), kU.mergeScopeData(A, kU.getCurrentScope().getScopeData()), A.attachments = [], A.eventProcessors = [], A
  }

  function SD9() {
    return n41.dynamicRequire(jYA, "worker_threads")
  }
  async function _D9(A) {
    let B = {
        message: "ANR"
      },
      Q = {};
    for (let I of A.getEventProcessors()) {
      if (B === null) break;
      B = await I(B, Q)
    }
    return qD9([B, "optionalAccess", (I) => I.contexts]) || {}
  }
  var PYA = "Anr",
    jD9 = (A = {}) => {
      if (Nq1.NODE_VERSION.major < 16 || Nq1.NODE_VERSION.major === 16 && Nq1.NODE_VERSION.minor < 17) throw new Error("ANR detection requires Node 16.17.0 or later");
      let B, Q, I = TD9();
      return I.__SENTRY_GET_SCOPES__ = PD9, {
        name: PYA,
        setupOnce() {},
        startWorker: () => {
          if (B) return;
          if (Q) B = kD9(Q, A)
        },
        stopWorker: () => {
          if (B) B.then((G) => {
            G(), B = void 0
          })
        },
        setup(G) {
          Q = G, setImmediate(() => this.startWorker())
        }
      }
    },
    SYA = kU.defineIntegration(jD9),
    yD9 = kU.convertIntegrationFnToClass(PYA, SYA);
  async function kD9(A, B) {
    let Q = A.getDsn();
    if (!Q) return () => {};
    let I = await _D9(A);
    TYA([I, "access", (F) => F.app, "optionalAccess", (F) => delete F.app_memory]), TYA([I, "access", (F) => F.device, "optionalAccess", (F) => delete F.free_memory]);
    let G = A.getOptions(),
      Z = A.getSdkMetadata() || {};
    if (Z.sdk) Z.sdk.integrations = G.integrations.map((F) => F.name);
    let D = {
      debug: n41.logger.isEnabled(),
      dsn: Q,
      environment: G.environment || "production",
      release: G.release,
      dist: G.dist,
      sdkMetadata: Z,
      appRootPath: B.appRootPath,
      pollInterval: B.pollInterval || RD9,
      anrThreshold: B.anrThreshold || OD9,
      captureStackTrace: !!B.captureStackTrace,
      staticTags: B.staticTags || {},
      contexts: I
    };
    if (D.captureStackTrace) {
      let F = Z1("inspector");
      if (!F.url()) F.open(0)
    }
    let {
      Worker: Y
    } = SD9(), W = new Y(new MD9.URL(`data:application/javascript;base64,${LD9.base64WorkerScript}`), {
      workerData: D
    });
    process.on("exit", () => {
      W.terminate()
    });
    let J = setInterval(() => {
      try {
        let F = kU.getCurrentScope().getSession(),
          X = F ? {
            ...F,
            toJSON: void 0
          } : void 0;
        W.postMessage({
          session: X
        })
      } catch (F) {}
    }, D.pollInterval);
    return J.unref(), W.on("message", (F) => {
      if (F === "session-ended") $q1("ANR event sent from ANR worker. Clearing session in this thread."), kU.getCurrentScope().setSession(void 0)
    }), W.once("error", (F) => {
      clearInterval(J), $q1("ANR worker error", F)
    }), W.once("exit", (F) => {
      clearInterval(J), $q1("ANR worker exit", F)
    }), W.unref(), () => {
      W.terminate(), clearInterval(J)
    }
  }
  _YA.Anr = yD9;
  _YA.anrIntegration = SYA
})
// @from(Start 555690, End 555950)
kYA = z((yYA) => {
  Object.defineProperty(yYA, "__esModule", {
    value: !0
  });
  var vD9 = z4(),
    bD9 = a41();

  function gD9(A) {
    let B = vD9.getClient();
    return new bD9.Anr(A).setup(B), Promise.resolve()
  }
  yYA.enableAnrDetection = gD9
})
// @from(Start 555956, End 557611)
qq1 = z((vYA) => {
  var {
    _optionalChain: xYA
  } = rA();
  Object.defineProperty(vYA, "__esModule", {
    value: !0
  });
  var yx = z4(),
    fYA = rA();

  function mD9(A = {}) {
    return function({
      path: B,
      type: Q,
      next: I,
      rawInput: G
    }) {
      let Z = xYA([yx.getClient, "call", (J) => J(), "optionalAccess", (J) => J.getOptions, "call", (J) => J()]),
        D = yx.getCurrentScope().getTransaction();
      if (D) {
        D.updateName(`trpc/${B}`), D.setAttribute(yx.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "route"), D.op = "rpc.server";
        let J = {
          procedure_type: Q
        };
        if (A.attachRpcInput !== void 0 ? A.attachRpcInput : xYA([Z, "optionalAccess", (F) => F.sendDefaultPii])) J.input = fYA.normalize(G);
        D.setContext("trpc", J)
      }

      function Y(J) {
        if (!J.ok) yx.captureException(J.error, {
          mechanism: {
            handled: !1,
            data: {
              function: "trpcMiddleware"
            }
          }
        })
      }
      let W;
      try {
        W = I()
      } catch (J) {
        throw yx.captureException(J, {
          mechanism: {
            handled: !1,
            data: {
              function: "trpcMiddleware"
            }
          }
        }), J
      }
      if (fYA.isThenable(W)) Promise.resolve(W).then((J) => {
        Y(J)
      }, (J) => {
        yx.captureException(J, {
          mechanism: {
            handled: !1,
            data: {
              function: "trpcMiddleware"
            }
          }
        })
      });
      else Y(W);
      return W
    }
  }
  vYA.trpcMiddleware = mD9
})
// @from(Start 557617, End 557974)
hYA = z((gYA) => {
  Object.defineProperty(gYA, "__esModule", {
    value: !0
  });
  var bYA = rA();

  function uD9(A, B) {
    return bYA.extractRequestData(A, {
      include: B
    })
  }

  function pD9(A, B, Q = {}) {
    return bYA.addRequestDataToEvent(A, B, {
      include: Q
    })
  }
  gYA.extractRequestData = uD9;
  gYA.parseRequest = pD9
})
// @from(Start 557980, End 562531)
uYA = z((dYA) => {
  var {
    _optionalChain: s41
  } = rA();
  Object.defineProperty(dYA, "__esModule", {
    value: !0
  });
  var XI = z4(),
    kx = rA(),
    iD9 = Xl(),
    r41 = Eq1(),
    nD9 = qq1(),
    mYA = hYA();

  function aD9() {
    return function A(B, Q, I) {
      let G = s41([XI.getClient, "call", (F) => F(), "optionalAccess", (F) => F.getOptions, "call", (F) => F()]);
      if (!G || G.instrumenter !== "sentry" || s41([B, "access", (F) => F.method, "optionalAccess", (F) => F.toUpperCase, "call", (F) => F()]) === "OPTIONS" || s41([B, "access", (F) => F.method, "optionalAccess", (F) => F.toUpperCase, "call", (F) => F()]) === "HEAD") return I();
      let Z = B.headers && kx.isString(B.headers["sentry-trace"]) ? B.headers["sentry-trace"] : void 0,
        D = s41([B, "access", (F) => F.headers, "optionalAccess", (F) => F.baggage]);
      if (!XI.hasTracingEnabled(G)) return I();
      let [Y, W] = kx.extractPathForTransaction(B, {
        path: !0,
        method: !0
      }), J = XI.continueTrace({
        sentryTrace: Z,
        baggage: D
      }, (F) => XI.startTransaction({
        name: Y,
        op: "http.server",
        origin: "auto.http.node.tracingHandler",
        ...F,
        data: {
          [XI.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: W
        },
        metadata: {
          ...F.metadata,
          request: B
        }
      }, {
        request: kx.extractRequestData(B)
      }));
      XI.getCurrentScope().setSpan(J), Q.__sentry_transaction = J, Q.once("finish", () => {
        setImmediate(() => {
          kx.addRequestDataToTransaction(J, B), XI.setHttpStatus(J, Q.statusCode), J.end()
        })
      }), I()
    }
  }

  function sD9(A = {}) {
    let B;
    if ("include" in A) B = {
      include: A.include
    };
    else {
      let {
        ip: Q,
        request: I,
        transaction: G,
        user: Z
      } = A;
      if (Q || I || G || Z) B = {
        include: kx.dropUndefinedKeys({
          ip: Q,
          request: I,
          transaction: G,
          user: Z
        })
      }
    }
    return B
  }

  function rD9(A) {
    let B = sD9(A),
      Q = XI.getClient();
    if (Q && r41.isAutoSessionTrackingEnabled(Q)) {
      Q.initSessionFlusher();
      let I = XI.getCurrentScope();
      if (I.getSession()) I.setSession()
    }
    return function I(G, Z, D) {
      if (A && A.flushTimeout && A.flushTimeout > 0) {
        let Y = Z.end;
        Z.end = function(W, J, F) {
          XI.flush(A.flushTimeout).then(() => {
            Y.call(this, W, J, F)
          }).then(null, (X) => {
            iD9.DEBUG_BUILD && kx.logger.error(X), Y.call(this, W, J, F)
          })
        }
      }
      XI.runWithAsyncContext(() => {
        let Y = XI.getCurrentScope();
        Y.setSDKProcessingMetadata({
          request: G,
          requestDataOptionsFromExpressHandler: B
        });
        let W = XI.getClient();
        if (r41.isAutoSessionTrackingEnabled(W)) Y.setRequestSession({
          status: "ok"
        });
        Z.once("finish", () => {
          let J = XI.getClient();
          if (r41.isAutoSessionTrackingEnabled(J)) setImmediate(() => {
            if (J && J._captureRequestSession) J._captureRequestSession()
          })
        }), D()
      })
    }
  }

  function oD9(A) {
    let B = A.status || A.statusCode || A.status_code || A.output && A.output.statusCode;
    return B ? parseInt(B, 10) : 500
  }

  function tD9(A) {
    return oD9(A) >= 500
  }

  function eD9(A) {
    return function B(Q, I, G, Z) {
      if ((A && A.shouldHandleError || tD9)(Q)) {
        XI.withScope((Y) => {
          Y.setSDKProcessingMetadata({
            request: I
          });
          let W = G.__sentry_transaction;
          if (W && !XI.getActiveSpan()) Y.setSpan(W);
          let J = XI.getClient();
          if (J && r41.isAutoSessionTrackingEnabled(J)) {
            if (J._sessionFlusher !== void 0) {
              let V = Y.getRequestSession();
              if (V && V.status !== void 0) V.status = "crashed"
            }
          }
          let F = XI.captureException(Q, {
            mechanism: {
              type: "middleware",
              handled: !1
            }
          });
          G.sentry = F, Z(Q)
        });
        return
      }
      Z(Q)
    }
  }
  var AY9 = nD9.trpcMiddleware;
  dYA.extractRequestData = mYA.extractRequestData;
  dYA.parseRequest = mYA.parseRequest;
  dYA.errorHandler = eD9;
  dYA.requestHandler = rD9;
  dYA.tracingHandler = aD9;
  dYA.trpcMiddleware = AY9
})
// @from(Start 562537, End 565204)
Mq1 = z((sYA) => {
  Object.defineProperty(sYA, "__esModule", {
    value: !0
  });
  var OY = z4(),
    cYA = rA();

  function pYA(A) {
    return A && A.statusCode !== void 0
  }

  function YY9(A) {
    return A && A.error !== void 0
  }

  function WY9(A) {
    OY.captureException(A, {
      mechanism: {
        type: "hapi",
        handled: !1,
        data: {
          function: "hapiErrorPlugin"
        }
      }
    })
  }
  var lYA = {
      name: "SentryHapiErrorPlugin",
      version: OY.SDK_VERSION,
      register: async function(A) {
        A.events.on("request", (Q, I) => {
          let G = OY.getActiveTransaction();
          if (YY9(I)) WY9(I.error);
          if (G) G.setStatus("internal_error"), G.end()
        })
      }
    },
    iYA = {
      name: "SentryHapiTracingPlugin",
      version: OY.SDK_VERSION,
      register: async function(A) {
        let B = A;
        B.ext("onPreHandler", (Q, I) => {
          let G = OY.continueTrace({
            sentryTrace: Q.headers["sentry-trace"] || void 0,
            baggage: Q.headers.baggage || void 0
          }, (Z) => {
            return OY.startTransaction({
              ...Z,
              op: "hapi.request",
              name: Q.route.path,
              description: `${Q.route.method} ${Q.path}`
            })
          });
          return OY.getCurrentScope().setSpan(G), I.continue
        }), B.ext("onPreResponse", (Q, I) => {
          let G = OY.getActiveTransaction();
          if (Q.response && pYA(Q.response) && G) {
            let Z = Q.response;
            Z.header("sentry-trace", OY.spanToTraceHeader(G));
            let D = cYA.dynamicSamplingContextToSentryBaggageHeader(OY.getDynamicSamplingContextFromSpan(G));
            if (D) Z.header("baggage", D)
          }
          return I.continue
        }), B.ext("onPostHandler", (Q, I) => {
          let G = OY.getActiveTransaction();
          if (G) {
            if (Q.response && pYA(Q.response)) OY.setHttpStatus(G, Q.response.statusCode);
            G.end()
          }
          return I.continue
        })
      }
    },
    nYA = "Hapi",
    JY9 = (A = {}) => {
      let B = A.server;
      return {
        name: nYA,
        setupOnce() {
          if (!B) return;
          cYA.fill(B, "start", (Q) => {
            return async function() {
              return await this.register(iYA), await this.register(lYA), Q.apply(this)
            }
          })
        }
      }
    },
    aYA = OY.defineIntegration(JY9),
    FY9 = OY.convertIntegrationFnToClass(nYA, aYA);
  sYA.Hapi = FY9;
  sYA.hapiErrorPlugin = lYA;
  sYA.hapiIntegration = aYA;
  sYA.hapiTracingPlugin = iYA
})
// @from(Start 565210, End 565958)
oYA = z((rYA) => {
  Object.defineProperty(rYA, "__esModule", {
    value: !0
  });
  var HY9 = S41(),
    zY9 = k41(),
    wY9 = m41(),
    EY9 = u41(),
    UY9 = b41(),
    NY9 = y41(),
    $Y9 = _41(),
    qY9 = z4(),
    MY9 = v41(),
    LY9 = l41(),
    RY9 = p41(),
    OY9 = a41(),
    TY9 = Mq1();
  rYA.Console = HY9.Console;
  rYA.Http = zY9.Http;
  rYA.OnUncaughtException = wY9.OnUncaughtException;
  rYA.OnUnhandledRejection = EY9.OnUnhandledRejection;
  rYA.Modules = UY9.Modules;
  rYA.ContextLines = NY9.ContextLines;
  rYA.Context = $Y9.Context;
  rYA.RequestData = qY9.RequestData;
  rYA.LocalVariables = MY9.LocalVariables;
  rYA.Undici = LY9.Undici;
  rYA.Spotlight = RY9.Spotlight;
  rYA.Anr = OY9.Anr;
  rYA.Hapi = TY9.Hapi
})
// @from(Start 565964, End 566253)
eYA = z((tYA) => {
  Object.defineProperty(tYA, "__esModule", {
    value: !0
  });
  var dP = Bq1();
  tYA.Apollo = dP.Apollo;
  tYA.Express = dP.Express;
  tYA.GraphQL = dP.GraphQL;
  tYA.Mongo = dP.Mongo;
  tYA.Mysql = dP.Mysql;
  tYA.Postgres = dP.Postgres;
  tYA.Prisma = dP.Prisma
})
// @from(Start 566259, End 567767)
IWA = z((QWA) => {
  Object.defineProperty(QWA, "__esModule", {
    value: !0
  });
  var uP = z4(),
    pP = rA(),
    AWA = "CaptureConsole",
    aY9 = (A = {}) => {
      let B = A.levels || pP.CONSOLE_LEVELS;
      return {
        name: AWA,
        setupOnce() {},
        setup(Q) {
          if (!("console" in pP.GLOBAL_OBJ)) return;
          pP.addConsoleInstrumentationHandler(({
            args: I,
            level: G
          }) => {
            if (uP.getClient() !== Q || !B.includes(G)) return;
            rY9(I, G)
          })
        }
      }
    },
    BWA = uP.defineIntegration(aY9),
    sY9 = uP.convertIntegrationFnToClass(AWA, BWA);

  function rY9(A, B) {
    let Q = {
      level: pP.severityLevelFromString(B),
      extra: {
        arguments: A
      }
    };
    uP.withScope((I) => {
      if (I.addEventProcessor((D) => {
          return D.logger = "console", pP.addExceptionMechanism(D, {
            handled: !1,
            type: "console"
          }), D
        }), B === "assert" && A[0] === !1) {
        let D = `Assertion failed: ${pP.safeJoin(A.slice(1)," ")||"console.assert"}`;
        I.setExtra("arguments", A.slice(1)), uP.captureMessage(D, Q);
        return
      }
      let G = A.find((D) => D instanceof Error);
      if (B === "error" && G) {
        uP.captureException(G, Q);
        return
      }
      let Z = pP.safeJoin(A, " ");
      uP.captureMessage(Z, Q)
    })
  }
  QWA.CaptureConsole = sY9;
  QWA.captureConsoleIntegration = BWA
})
// @from(Start 567773, End 568686)
WWA = z((YWA) => {
  Object.defineProperty(YWA, "__esModule", {
    value: !0
  });
  var GWA = z4(),
    eY9 = rA(),
    ZWA = "Debug",
    AW9 = (A = {}) => {
      let B = {
        debugger: !1,
        stringify: !1,
        ...A
      };
      return {
        name: ZWA,
        setupOnce() {},
        setup(Q) {
          if (!Q.on) return;
          Q.on("beforeSendEvent", (I, G) => {
            if (B.debugger) debugger;
            eY9.consoleSandbox(() => {
              if (B.stringify) {
                if (console.log(JSON.stringify(I, null, 2)), G && Object.keys(G).length) console.log(JSON.stringify(G, null, 2))
              } else if (console.log(I), G && Object.keys(G).length) console.log(G)
            })
          })
        }
      }
    },
    DWA = GWA.defineIntegration(AW9),
    BW9 = GWA.convertIntegrationFnToClass(ZWA, DWA);
  YWA.Debug = BW9;
  YWA.debugIntegration = DWA
})
// @from(Start 568692, End 568874)
Cl = z((JWA) => {
  Object.defineProperty(JWA, "__esModule", {
    value: !0
  });
  var GW9 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
  JWA.DEBUG_BUILD = GW9
})
// @from(Start 568880, End 571112)
UWA = z((EWA) => {
  Object.defineProperty(EWA, "__esModule", {
    value: !0
  });
  var VWA = z4(),
    DW9 = rA(),
    YW9 = Cl(),
    CWA = "Dedupe",
    WW9 = () => {
      let A;
      return {
        name: CWA,
        setupOnce() {},
        processEvent(B) {
          if (B.type) return B;
          try {
            if (HWA(B, A)) return YW9.DEBUG_BUILD && DW9.logger.warn("Event dropped due to being a duplicate of previously captured event."), null
          } catch (Q) {}
          return A = B
        }
      }
    },
    KWA = VWA.defineIntegration(WW9),
    JW9 = VWA.convertIntegrationFnToClass(CWA, KWA);

  function HWA(A, B) {
    if (!B) return !1;
    if (FW9(A, B)) return !0;
    if (XW9(A, B)) return !0;
    return !1
  }

  function FW9(A, B) {
    let Q = A.message,
      I = B.message;
    if (!Q && !I) return !1;
    if (Q && !I || !Q && I) return !1;
    if (Q !== I) return !1;
    if (!wWA(A, B)) return !1;
    if (!zWA(A, B)) return !1;
    return !0
  }

  function XW9(A, B) {
    let Q = FWA(B),
      I = FWA(A);
    if (!Q || !I) return !1;
    if (Q.type !== I.type || Q.value !== I.value) return !1;
    if (!wWA(A, B)) return !1;
    if (!zWA(A, B)) return !1;
    return !0
  }

  function zWA(A, B) {
    let Q = XWA(A),
      I = XWA(B);
    if (!Q && !I) return !0;
    if (Q && !I || !Q && I) return !1;
    if (Q = Q, I = I, I.length !== Q.length) return !1;
    for (let G = 0; G < I.length; G++) {
      let Z = I[G],
        D = Q[G];
      if (Z.filename !== D.filename || Z.lineno !== D.lineno || Z.colno !== D.colno || Z.function !== D.function) return !1
    }
    return !0
  }

  function wWA(A, B) {
    let Q = A.fingerprint,
      I = B.fingerprint;
    if (!Q && !I) return !0;
    if (Q && !I || !Q && I) return !1;
    Q = Q, I = I;
    try {
      return Q.join("") === I.join("")
    } catch (G) {
      return !1
    }
  }

  function FWA(A) {
    return A.exception && A.exception.values && A.exception.values[0]
  }

  function XWA(A) {
    let B = A.exception;
    if (B) try {
      return B.values[0].stacktrace.frames
    } catch (Q) {
      return
    }
    return
  }
  EWA.Dedupe = JW9;
  EWA._shouldDropEvent = HWA;
  EWA.dedupeIntegration = KWA
})
// @from(Start 571118, End 572970)
LWA = z((MWA) => {
  Object.defineProperty(MWA, "__esModule", {
    value: !0
  });
  var NWA = z4(),
    DM = rA(),
    HW9 = Cl(),
    $WA = "ExtraErrorData",
    zW9 = (A = {}) => {
      let B = A.depth || 3,
        Q = A.captureErrorCause || !1;
      return {
        name: $WA,
        setupOnce() {},
        processEvent(I, G) {
          return EW9(I, G, B, Q)
        }
      }
    },
    qWA = NWA.defineIntegration(zW9),
    wW9 = NWA.convertIntegrationFnToClass($WA, qWA);

  function EW9(A, B = {}, Q, I) {
    if (!B.originalException || !DM.isError(B.originalException)) return A;
    let G = B.originalException.name || B.originalException.constructor.name,
      Z = UW9(B.originalException, I);
    if (Z) {
      let D = {
          ...A.contexts
        },
        Y = DM.normalize(Z, Q);
      if (DM.isPlainObject(Y)) DM.addNonEnumerableProperty(Y, "__sentry_skip_normalization__", !0), D[G] = Y;
      return {
        ...A,
        contexts: D
      }
    }
    return A
  }

  function UW9(A, B) {
    try {
      let Q = ["name", "message", "stack", "line", "column", "fileName", "lineNumber", "columnNumber", "toJSON"],
        I = {};
      for (let G of Object.keys(A)) {
        if (Q.indexOf(G) !== -1) continue;
        let Z = A[G];
        I[G] = DM.isError(Z) ? Z.toString() : Z
      }
      if (B && A.cause !== void 0) I.cause = DM.isError(A.cause) ? A.cause.toString() : A.cause;
      if (typeof A.toJSON === "function") {
        let G = A.toJSON();
        for (let Z of Object.keys(G)) {
          let D = G[Z];
          I[Z] = DM.isError(D) ? D.toString() : D
        }
      }
      return I
    } catch (Q) {
      HW9.DEBUG_BUILD && DM.logger.error("Unable to extract extra data from the Error object:", Q)
    }
    return null
  }
  MWA.ExtraErrorData = wW9;
  MWA.extraErrorDataIntegration = qWA
})
// @from(Start 572976, End 631200)
OWA = z((RWA, Lq1) => {
  /*!
      localForage -- Offline Storage, Improved
      Version 1.10.0
      https://localforage.github.io/localForage
      (c) 2013-2017 Mozilla, Apache License 2.0
  */
  (function(A) {
    if (typeof RWA === "object" && typeof Lq1 !== "undefined") Lq1.exports = A();
    else if (typeof define === "function" && define.amd) define([], A);
    else {
      var B;
      if (typeof window !== "undefined") B = window;
      else if (typeof global !== "undefined") B = global;
      else if (typeof self !== "undefined") B = self;
      else B = this;
      B.localforage = A()
    }
  })(function() {
    var A, B, Q;
    return function I(G, Z, D) {
      function Y(F, X) {
        if (!Z[F]) {
          if (!G[F]) {
            var V = Z1;
            if (!X && V) return V(F, !0);
            if (W) return W(F, !0);
            var C = new Error("Cannot find module '" + F + "'");
            throw C.code = "MODULE_NOT_FOUND", C
          }
          var K = Z[F] = {
            exports: {}
          };
          G[F][0].call(K.exports, function(E) {
            var N = G[F][1][E];
            return Y(N ? N : E)
          }, K, K.exports, I, G, Z, D)
        }
        return Z[F].exports
      }
      var W = Z1;
      for (var J = 0; J < D.length; J++) Y(D[J]);
      return Y
    }({
      1: [function(I, G, Z) {
        (function(D) {
          var Y = D.MutationObserver || D.WebKitMutationObserver,
            W;
          if (Y) {
            var J = 0,
              F = new Y(E),
              X = D.document.createTextNode("");
            F.observe(X, {
              characterData: !0
            }), W = function() {
              X.data = J = ++J % 2
            }
          } else if (!D.setImmediate && typeof D.MessageChannel !== "undefined") {
            var V = new D.MessageChannel;
            V.port1.onmessage = E, W = function() {
              V.port2.postMessage(0)
            }
          } else if ("document" in D && "onreadystatechange" in D.document.createElement("script")) W = function() {
            var q = D.document.createElement("script");
            q.onreadystatechange = function() {
              E(), q.onreadystatechange = null, q.parentNode.removeChild(q), q = null
            }, D.document.documentElement.appendChild(q)
          };
          else W = function() {
            setTimeout(E, 0)
          };
          var C, K = [];

          function E() {
            C = !0;
            var q, O, R = K.length;
            while (R) {
              O = K, K = [], q = -1;
              while (++q < R) O[q]();
              R = K.length
            }
            C = !1
          }
          G.exports = N;

          function N(q) {
            if (K.push(q) === 1 && !C) W()
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
      }, {}],
      2: [function(I, G, Z) {
        var D = I(1);

        function Y() {}
        var W = {},
          J = ["REJECTED"],
          F = ["FULFILLED"],
          X = ["PENDING"];
        G.exports = V;

        function V(_) {
          if (typeof _ !== "function") throw new TypeError("resolver must be a function");
          if (this.state = X, this.queue = [], this.outcome = void 0, _ !== Y) N(this, _)
        }
        V.prototype.catch = function(_) {
          return this.then(null, _)
        }, V.prototype.then = function(_, k) {
          if (typeof _ !== "function" && this.state === F || typeof k !== "function" && this.state === J) return this;
          var i = new this.constructor(Y);
          if (this.state !== X) {
            var x = this.state === F ? _ : k;
            K(i, x, this.outcome)
          } else this.queue.push(new C(i, _, k));
          return i
        };

        function C(_, k, i) {
          if (this.promise = _, typeof k === "function") this.onFulfilled = k, this.callFulfilled = this.otherCallFulfilled;
          if (typeof i === "function") this.onRejected = i, this.callRejected = this.otherCallRejected
        }
        C.prototype.callFulfilled = function(_) {
          W.resolve(this.promise, _)
        }, C.prototype.otherCallFulfilled = function(_) {
          K(this.promise, this.onFulfilled, _)
        }, C.prototype.callRejected = function(_) {
          W.reject(this.promise, _)
        }, C.prototype.otherCallRejected = function(_) {
          K(this.promise, this.onRejected, _)
        };

        function K(_, k, i) {
          D(function() {
            var x;
            try {
              x = k(i)
            } catch (s) {
              return W.reject(_, s)
            }
            if (x === _) W.reject(_, new TypeError("Cannot resolve promise with itself"));
            else W.resolve(_, x)
          })
        }
        W.resolve = function(_, k) {
          var i = q(E, k);
          if (i.status === "error") return W.reject(_, i.value);
          var x = i.value;
          if (x) N(_, x);
          else {
            _.state = F, _.outcome = k;
            var s = -1,
              d = _.queue.length;
            while (++s < d) _.queue[s].callFulfilled(k)
          }
          return _
        }, W.reject = function(_, k) {
          _.state = J, _.outcome = k;
          var i = -1,
            x = _.queue.length;
          while (++i < x) _.queue[i].callRejected(k);
          return _
        };

        function E(_) {
          var k = _ && _.then;
          if (_ && (typeof _ === "object" || typeof _ === "function") && typeof k === "function") return function i() {
            k.apply(_, arguments)
          }
        }

        function N(_, k) {
          var i = !1;

          function x(X1) {
            if (i) return;
            i = !0, W.reject(_, X1)
          }

          function s(X1) {
            if (i) return;
            i = !0, W.resolve(_, X1)
          }

          function d() {
            k(s, x)
          }
          var F1 = q(d);
          if (F1.status === "error") x(F1.value)
        }

        function q(_, k) {
          var i = {};
          try {
            i.value = _(k), i.status = "success"
          } catch (x) {
            i.status = "error", i.value = x
          }
          return i
        }
        V.resolve = O;

        function O(_) {
          if (_ instanceof this) return _;
          return W.resolve(new this(Y), _)
        }
        V.reject = R;

        function R(_) {
          var k = new this(Y);
          return W.reject(k, _)
        }
        V.all = T;

        function T(_) {
          var k = this;
          if (Object.prototype.toString.call(_) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var i = _.length,
            x = !1;
          if (!i) return this.resolve([]);
          var s = new Array(i),
            d = 0,
            F1 = -1,
            X1 = new this(Y);
          while (++F1 < i) v(_[F1], F1);
          return X1;

          function v(D1, N1) {
            k.resolve(D1).then(u1, function(d1) {
              if (!x) x = !0, W.reject(X1, d1)
            });

            function u1(d1) {
              if (s[N1] = d1, ++d === i && !x) x = !0, W.resolve(X1, s)
            }
          }
        }
        V.race = L;

        function L(_) {
          var k = this;
          if (Object.prototype.toString.call(_) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var i = _.length,
            x = !1;
          if (!i) return this.resolve([]);
          var s = -1,
            d = new this(Y);
          while (++s < i) F1(_[s]);
          return d;

          function F1(X1) {
            k.resolve(X1).then(function(v) {
              if (!x) x = !0, W.resolve(d, v)
            }, function(v) {
              if (!x) x = !0, W.reject(d, v)
            })
          }
        }
      }, {
        "1": 1
      }],
      3: [function(I, G, Z) {
        (function(D) {
          if (typeof D.Promise !== "function") D.Promise = I(2)
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
      }, {
        "2": 2
      }],
      4: [function(I, G, Z) {
        var D = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(V1) {
          return typeof V1
        } : function(V1) {
          return V1 && typeof Symbol === "function" && V1.constructor === Symbol && V1 !== Symbol.prototype ? "symbol" : typeof V1
        };

        function Y(V1, c1) {
          if (!(V1 instanceof c1)) throw new TypeError("Cannot call a class as a function")
        }

        function W() {
          try {
            if (typeof indexedDB !== "undefined") return indexedDB;
            if (typeof webkitIndexedDB !== "undefined") return webkitIndexedDB;
            if (typeof mozIndexedDB !== "undefined") return mozIndexedDB;
            if (typeof OIndexedDB !== "undefined") return OIndexedDB;
            if (typeof msIndexedDB !== "undefined") return msIndexedDB
          } catch (V1) {
            return
          }
        }
        var J = W();

        function F() {
          try {
            if (!J || !J.open) return !1;
            var V1 = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform),
              c1 = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
            return (!V1 || c1) && typeof indexedDB !== "undefined" && typeof IDBKeyRange !== "undefined"
          } catch (_1) {
            return !1
          }
        }

        function X(V1, c1) {
          V1 = V1 || [], c1 = c1 || {};
          try {
            return new Blob(V1, c1)
          } catch (IA) {
            if (IA.name !== "TypeError") throw IA;
            var _1 = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder,
              t1 = new _1;
            for (var DA = 0; DA < V1.length; DA += 1) t1.append(V1[DA]);
            return t1.getBlob(c1.type)
          }
        }
        if (typeof Promise === "undefined") I(3);
        var V = Promise;

        function C(V1, c1) {
          if (c1) V1.then(function(_1) {
            c1(null, _1)
          }, function(_1) {
            c1(_1)
          })
        }

        function K(V1, c1, _1) {
          if (typeof c1 === "function") V1.then(c1);
          if (typeof _1 === "function") V1.catch(_1)
        }

        function E(V1) {
          if (typeof V1 !== "string") console.warn(V1 + " used as a key, but it is not a string."), V1 = String(V1);
          return V1
        }

        function N() {
          if (arguments.length && typeof arguments[arguments.length - 1] === "function") return arguments[arguments.length - 1]
        }
        var q = "local-forage-detect-blob-support",
          O = void 0,
          R = {},
          T = Object.prototype.toString,
          L = "readonly",
          _ = "readwrite";

        function k(V1) {
          var c1 = V1.length,
            _1 = new ArrayBuffer(c1),
            t1 = new Uint8Array(_1);
          for (var DA = 0; DA < c1; DA++) t1[DA] = V1.charCodeAt(DA);
          return _1
        }

        function i(V1) {
          return new V(function(c1) {
            var _1 = V1.transaction(q, _),
              t1 = X([""]);
            _1.objectStore(q).put(t1, "key"), _1.onabort = function(DA) {
              DA.preventDefault(), DA.stopPropagation(), c1(!1)
            }, _1.oncomplete = function() {
              var DA = navigator.userAgent.match(/Chrome\/(\d+)/),
                IA = navigator.userAgent.match(/Edge\//);
              c1(IA || !DA || parseInt(DA[1], 10) >= 43)
            }
          }).catch(function() {
            return !1
          })
        }

        function x(V1) {
          if (typeof O === "boolean") return V.resolve(O);
          return i(V1).then(function(c1) {
            return O = c1, O
          })
        }

        function s(V1) {
          var c1 = R[V1.name],
            _1 = {};
          if (_1.promise = new V(function(t1, DA) {
              _1.resolve = t1, _1.reject = DA
            }), c1.deferredOperations.push(_1), !c1.dbReady) c1.dbReady = _1.promise;
          else c1.dbReady = c1.dbReady.then(function() {
            return _1.promise
          })
        }

        function d(V1) {
          var c1 = R[V1.name],
            _1 = c1.deferredOperations.pop();
          if (_1) return _1.resolve(), _1.promise
        }

        function F1(V1, c1) {
          var _1 = R[V1.name],
            t1 = _1.deferredOperations.pop();
          if (t1) return t1.reject(c1), t1.promise
        }

        function X1(V1, c1) {
          return new V(function(_1, t1) {
            if (R[V1.name] = R[V1.name] || Q1(), V1.db)
              if (c1) s(V1), V1.db.close();
              else return _1(V1.db);
            var DA = [V1.name];
            if (c1) DA.push(V1.version);
            var IA = J.open.apply(J, DA);
            if (c1) IA.onupgradeneeded = function(xA) {
              var oA = IA.result;
              try {
                if (oA.createObjectStore(V1.storeName), xA.oldVersion <= 1) oA.createObjectStore(q)
              } catch (sA) {
                if (sA.name === "ConstraintError") console.warn('The database "' + V1.name + '" has been upgraded from version ' + xA.oldVersion + " to version " + xA.newVersion + ', but the storage "' + V1.storeName + '" already exists.');
                else throw sA
              }
            };
            IA.onerror = function(xA) {
              xA.preventDefault(), t1(IA.error)
            }, IA.onsuccess = function() {
              var xA = IA.result;
              xA.onversionchange = function(oA) {
                oA.target.close()
              }, _1(xA), d(V1)
            }
          })
        }

        function v(V1) {
          return X1(V1, !1)
        }

        function D1(V1) {
          return X1(V1, !0)
        }

        function N1(V1, c1) {
          if (!V1.db) return !0;
          var _1 = !V1.db.objectStoreNames.contains(V1.storeName),
            t1 = V1.version < V1.db.version,
            DA = V1.version > V1.db.version;
          if (t1) {
            if (V1.version !== c1) console.warn('The database "' + V1.name + `" can't be downgraded from version ` + V1.db.version + " to version " + V1.version + ".");
            V1.version = V1.db.version
          }
          if (DA || _1) {
            if (_1) {
              var IA = V1.db.version + 1;
              if (IA > V1.version) V1.version = IA
            }
            return !0
          }
          return !1
        }

        function u1(V1) {
          return new V(function(c1, _1) {
            var t1 = new FileReader;
            t1.onerror = _1, t1.onloadend = function(DA) {
              var IA = btoa(DA.target.result || "");
              c1({
                __local_forage_encoded_blob: !0,
                data: IA,
                type: V1.type
              })
            }, t1.readAsBinaryString(V1)
          })
        }

        function d1(V1) {
          var c1 = k(atob(V1.data));
          return X([c1], {
            type: V1.type
          })
        }

        function YA(V1) {
          return V1 && V1.__local_forage_encoded_blob
        }

        function bA(V1) {
          var c1 = this,
            _1 = c1._initReady().then(function() {
              var t1 = R[c1._dbInfo.name];
              if (t1 && t1.dbReady) return t1.dbReady
            });
          return K(_1, V1, V1), _1
        }

        function e1(V1) {
          s(V1);
          var c1 = R[V1.name],
            _1 = c1.forages;
          for (var t1 = 0; t1 < _1.length; t1++) {
            var DA = _1[t1];
            if (DA._dbInfo.db) DA._dbInfo.db.close(), DA._dbInfo.db = null
          }
          return V1.db = null, v(V1).then(function(IA) {
            if (V1.db = IA, N1(V1)) return D1(V1);
            return IA
          }).then(function(IA) {
            V1.db = c1.db = IA;
            for (var xA = 0; xA < _1.length; xA++) _1[xA]._dbInfo.db = IA
          }).catch(function(IA) {
            throw F1(V1, IA), IA
          })
        }

        function k1(V1, c1, _1, t1) {
          if (t1 === void 0) t1 = 1;
          try {
            var DA = V1.db.transaction(V1.storeName, c1);
            _1(null, DA)
          } catch (IA) {
            if (t1 > 0 && (!V1.db || IA.name === "InvalidStateError" || IA.name === "NotFoundError")) return V.resolve().then(function() {
              if (!V1.db || IA.name === "NotFoundError" && !V1.db.objectStoreNames.contains(V1.storeName) && V1.version <= V1.db.version) {
                if (V1.db) V1.version = V1.db.version + 1;
                return D1(V1)
              }
            }).then(function() {
              return e1(V1).then(function() {
                k1(V1, c1, _1, t1 - 1)
              })
            }).catch(_1);
            _1(IA)
          }
        }

        function Q1() {
          return {
            forages: [],
            db: null,
            dbReady: null,
            deferredOperations: []
          }
        }

        function v1(V1) {
          var c1 = this,
            _1 = {
              db: null
            };
          if (V1)
            for (var t1 in V1) _1[t1] = V1[t1];
          var DA = R[_1.name];
          if (!DA) DA = Q1(), R[_1.name] = DA;
          if (DA.forages.push(c1), !c1._initReady) c1._initReady = c1.ready, c1.ready = bA;
          var IA = [];

          function xA() {
            return V.resolve()
          }
          for (var oA = 0; oA < DA.forages.length; oA++) {
            var sA = DA.forages[oA];
            if (sA !== c1) IA.push(sA._initReady().catch(xA))
          }
          var C0 = DA.forages.slice(0);
          return V.all(IA).then(function() {
            return _1.db = DA.db, v(_1)
          }).then(function(U0) {
            if (_1.db = U0, N1(_1, c1._defaultConfig.version)) return D1(_1);
            return U0
          }).then(function(U0) {
            _1.db = DA.db = U0, c1._dbInfo = _1;
            for (var i0 = 0; i0 < C0.length; i0++) {
              var R9 = C0[i0];
              if (R9 !== c1) R9._dbInfo.db = _1.db, R9._dbInfo.version = _1.version
            }
          })
        }

        function L1(V1, c1) {
          var _1 = this;
          V1 = E(V1);
          var t1 = new V(function(DA, IA) {
            _1.ready().then(function() {
              k1(_1._dbInfo, L, function(xA, oA) {
                if (xA) return IA(xA);
                try {
                  var sA = oA.objectStore(_1._dbInfo.storeName),
                    C0 = sA.get(V1);
                  C0.onsuccess = function() {
                    var U0 = C0.result;
                    if (U0 === void 0) U0 = null;
                    if (YA(U0)) U0 = d1(U0);
                    DA(U0)
                  }, C0.onerror = function() {
                    IA(C0.error)
                  }
                } catch (U0) {
                  IA(U0)
                }
              })
            }).catch(IA)
          });
          return C(t1, c1), t1
        }

        function BA(V1, c1) {
          var _1 = this,
            t1 = new V(function(DA, IA) {
              _1.ready().then(function() {
                k1(_1._dbInfo, L, function(xA, oA) {
                  if (xA) return IA(xA);
                  try {
                    var sA = oA.objectStore(_1._dbInfo.storeName),
                      C0 = sA.openCursor(),
                      U0 = 1;
                    C0.onsuccess = function() {
                      var i0 = C0.result;
                      if (i0) {
                        var R9 = i0.value;
                        if (YA(R9)) R9 = d1(R9);
                        var Z4 = V1(R9, i0.key, U0++);
                        if (Z4 !== void 0) DA(Z4);
                        else i0.continue()
                      } else DA()
                    }, C0.onerror = function() {
                      IA(C0.error)
                    }
                  } catch (i0) {
                    IA(i0)
                  }
                })
              }).catch(IA)
            });
          return C(t1, c1), t1
        }

        function HA(V1, c1, _1) {
          var t1 = this;
          V1 = E(V1);
          var DA = new V(function(IA, xA) {
            var oA;
            t1.ready().then(function() {
              if (oA = t1._dbInfo, T.call(c1) === "[object Blob]") return x(oA.db).then(function(sA) {
                if (sA) return c1;
                return u1(c1)
              });
              return c1
            }).then(function(sA) {
              k1(t1._dbInfo, _, function(C0, U0) {
                if (C0) return xA(C0);
                try {
                  var i0 = U0.objectStore(t1._dbInfo.storeName);
                  if (sA === null) sA = void 0;
                  var R9 = i0.put(sA, V1);
                  U0.oncomplete = function() {
                    if (sA === void 0) sA = null;
                    IA(sA)
                  }, U0.onabort = U0.onerror = function() {
                    var Z4 = R9.error ? R9.error : R9.transaction.error;
                    xA(Z4)
                  }
                } catch (Z4) {
                  xA(Z4)
                }
              })
            }).catch(xA)
          });
          return C(DA, _1), DA
        }

        function MA(V1, c1) {
          var _1 = this;
          V1 = E(V1);
          var t1 = new V(function(DA, IA) {
            _1.ready().then(function() {
              k1(_1._dbInfo, _, function(xA, oA) {
                if (xA) return IA(xA);
                try {
                  var sA = oA.objectStore(_1._dbInfo.storeName),
                    C0 = sA.delete(V1);
                  oA.oncomplete = function() {
                    DA()
                  }, oA.onerror = function() {
                    IA(C0.error)
                  }, oA.onabort = function() {
                    var U0 = C0.error ? C0.error : C0.transaction.error;
                    IA(U0)
                  }
                } catch (U0) {
                  IA(U0)
                }
              })
            }).catch(IA)
          });
          return C(t1, c1), t1
        }

        function t(V1) {
          var c1 = this,
            _1 = new V(function(t1, DA) {
              c1.ready().then(function() {
                k1(c1._dbInfo, _, function(IA, xA) {
                  if (IA) return DA(IA);
                  try {
                    var oA = xA.objectStore(c1._dbInfo.storeName),
                      sA = oA.clear();
                    xA.oncomplete = function() {
                      t1()
                    }, xA.onabort = xA.onerror = function() {
                      var C0 = sA.error ? sA.error : sA.transaction.error;
                      DA(C0)
                    }
                  } catch (C0) {
                    DA(C0)
                  }
                })
              }).catch(DA)
            });
          return C(_1, V1), _1
        }

        function B1(V1) {
          var c1 = this,
            _1 = new V(function(t1, DA) {
              c1.ready().then(function() {
                k1(c1._dbInfo, L, function(IA, xA) {
                  if (IA) return DA(IA);
                  try {
                    var oA = xA.objectStore(c1._dbInfo.storeName),
                      sA = oA.count();
                    sA.onsuccess = function() {
                      t1(sA.result)
                    }, sA.onerror = function() {
                      DA(sA.error)
                    }
                  } catch (C0) {
                    DA(C0)
                  }
                })
              }).catch(DA)
            });
          return C(_1, V1), _1
        }

        function W1(V1, c1) {
          var _1 = this,
            t1 = new V(function(DA, IA) {
              if (V1 < 0) {
                DA(null);
                return
              }
              _1.ready().then(function() {
                k1(_1._dbInfo, L, function(xA, oA) {
                  if (xA) return IA(xA);
                  try {
                    var sA = oA.objectStore(_1._dbInfo.storeName),
                      C0 = !1,
                      U0 = sA.openKeyCursor();
                    U0.onsuccess = function() {
                      var i0 = U0.result;
                      if (!i0) {
                        DA(null);
                        return
                      }
                      if (V1 === 0) DA(i0.key);
                      else if (!C0) C0 = !0, i0.advance(V1);
                      else DA(i0.key)
                    }, U0.onerror = function() {
                      IA(U0.error)
                    }
                  } catch (i0) {
                    IA(i0)
                  }
                })
              }).catch(IA)
            });
          return C(t1, c1), t1
        }

        function w1(V1) {
          var c1 = this,
            _1 = new V(function(t1, DA) {
              c1.ready().then(function() {
                k1(c1._dbInfo, L, function(IA, xA) {
                  if (IA) return DA(IA);
                  try {
                    var oA = xA.objectStore(c1._dbInfo.storeName),
                      sA = oA.openKeyCursor(),
                      C0 = [];
                    sA.onsuccess = function() {
                      var U0 = sA.result;
                      if (!U0) {
                        t1(C0);
                        return
                      }
                      C0.push(U0.key), U0.continue()
                    }, sA.onerror = function() {
                      DA(sA.error)
                    }
                  } catch (U0) {
                    DA(U0)
                  }
                })
              }).catch(DA)
            });
          return C(_1, V1), _1
        }

        function P1(V1, c1) {
          c1 = N.apply(this, arguments);
          var _1 = this.config();
          if (V1 = typeof V1 !== "function" && V1 || {}, !V1.name) V1.name = V1.name || _1.name, V1.storeName = V1.storeName || _1.storeName;
          var t1 = this,
            DA;
          if (!V1.name) DA = V.reject("Invalid arguments");
          else {
            var IA = V1.name === _1.name && t1._dbInfo.db,
              xA = IA ? V.resolve(t1._dbInfo.db) : v(V1).then(function(oA) {
                var sA = R[V1.name],
                  C0 = sA.forages;
                sA.db = oA;
                for (var U0 = 0; U0 < C0.length; U0++) C0[U0]._dbInfo.db = oA;
                return oA
              });
            if (!V1.storeName) DA = xA.then(function(oA) {
              s(V1);
              var sA = R[V1.name],
                C0 = sA.forages;
              oA.close();
              for (var U0 = 0; U0 < C0.length; U0++) {
                var i0 = C0[U0];
                i0._dbInfo.db = null
              }
              var R9 = new V(function(Z4, x4) {
                var W5 = J.deleteDatabase(V1.name);
                W5.onerror = function() {
                  var b6 = W5.result;
                  if (b6) b6.close();
                  x4(W5.error)
                }, W5.onblocked = function() {
                  console.warn('dropInstance blocked for database "' + V1.name + '" until all open connections are closed')
                }, W5.onsuccess = function() {
                  var b6 = W5.result;
                  if (b6) b6.close();
                  Z4(b6)
                }
              });
              return R9.then(function(Z4) {
                sA.db = Z4;
                for (var x4 = 0; x4 < C0.length; x4++) {
                  var W5 = C0[x4];
                  d(W5._dbInfo)
                }
              }).catch(function(Z4) {
                throw (F1(V1, Z4) || V.resolve()).catch(function() {}), Z4
              })
            });
            else DA = xA.then(function(oA) {
              if (!oA.objectStoreNames.contains(V1.storeName)) return;
              var sA = oA.version + 1;
              s(V1);
              var C0 = R[V1.name],
                U0 = C0.forages;
              oA.close();
              for (var i0 = 0; i0 < U0.length; i0++) {
                var R9 = U0[i0];
                R9._dbInfo.db = null, R9._dbInfo.version = sA
              }
              var Z4 = new V(function(x4, W5) {
                var b6 = J.open(V1.name, sA);
                b6.onerror = function(C3) {
                  var AI = b6.result;
                  AI.close(), W5(C3)
                }, b6.onupgradeneeded = function() {
                  var C3 = b6.result;
                  C3.deleteObjectStore(V1.storeName)
                }, b6.onsuccess = function() {
                  var C3 = b6.result;
                  C3.close(), x4(C3)
                }
              });
              return Z4.then(function(x4) {
                C0.db = x4;
                for (var W5 = 0; W5 < U0.length; W5++) {
                  var b6 = U0[W5];
                  b6._dbInfo.db = x4, d(b6._dbInfo)
                }
              }).catch(function(x4) {
                throw (F1(V1, x4) || V.resolve()).catch(function() {}), x4
              })
            })
          }
          return C(DA, c1), DA
        }
        var e = {
          _driver: "asyncStorage",
          _initStorage: v1,
          _support: F(),
          iterate: BA,
          getItem: L1,
          setItem: HA,
          removeItem: MA,
          clear: t,
          length: B1,
          key: W1,
          keys: w1,
          dropInstance: P1
        };

        function y1() {
          return typeof openDatabase === "function"
        }
        var O1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          h1 = "~~local_forage_type~",
          o1 = /^~~local_forage_type~([^~]+)~/,
          QA = "__lfsc__:",
          zA = QA.length,
          Y0 = "arbf",
          fA = "blob",
          H0 = "si08",
          k2 = "ui08",
          s0 = "uic8",
          q2 = "si16",
          h2 = "si32",
          j9 = "ur16",
          w6 = "ui32",
          E0 = "fl32",
          g0 = "fl64",
          y0 = zA + Y0.length,
          T0 = Object.prototype.toString;

        function V0(V1) {
          var c1 = V1.length * 0.75,
            _1 = V1.length,
            t1, DA = 0,
            IA, xA, oA, sA;
          if (V1[V1.length - 1] === "=") {
            if (c1--, V1[V1.length - 2] === "=") c1--
          }
          var C0 = new ArrayBuffer(c1),
            U0 = new Uint8Array(C0);
          for (t1 = 0; t1 < _1; t1 += 4) IA = O1.indexOf(V1[t1]), xA = O1.indexOf(V1[t1 + 1]), oA = O1.indexOf(V1[t1 + 2]), sA = O1.indexOf(V1[t1 + 3]), U0[DA++] = IA << 2 | xA >> 4, U0[DA++] = (xA & 15) << 4 | oA >> 2, U0[DA++] = (oA & 3) << 6 | sA & 63;
          return C0
        }

        function N2(V1) {
          var c1 = new Uint8Array(V1),
            _1 = "",
            t1;
          for (t1 = 0; t1 < c1.length; t1 += 3) _1 += O1[c1[t1] >> 2], _1 += O1[(c1[t1] & 3) << 4 | c1[t1 + 1] >> 4], _1 += O1[(c1[t1 + 1] & 15) << 2 | c1[t1 + 2] >> 6], _1 += O1[c1[t1 + 2] & 63];
          if (c1.length % 3 === 2) _1 = _1.substring(0, _1.length - 1) + "=";
          else if (c1.length % 3 === 1) _1 = _1.substring(0, _1.length - 2) + "==";
          return _1
        }

        function h9(V1, c1) {
          var _1 = "";
          if (V1) _1 = T0.call(V1);
          if (V1 && (_1 === "[object ArrayBuffer]" || V1.buffer && T0.call(V1.buffer) === "[object ArrayBuffer]")) {
            var t1, DA = QA;
            if (V1 instanceof ArrayBuffer) t1 = V1, DA += Y0;
            else if (t1 = V1.buffer, _1 === "[object Int8Array]") DA += H0;
            else if (_1 === "[object Uint8Array]") DA += k2;
            else if (_1 === "[object Uint8ClampedArray]") DA += s0;
            else if (_1 === "[object Int16Array]") DA += q2;
            else if (_1 === "[object Uint16Array]") DA += j9;
            else if (_1 === "[object Int32Array]") DA += h2;
            else if (_1 === "[object Uint32Array]") DA += w6;
            else if (_1 === "[object Float32Array]") DA += E0;
            else if (_1 === "[object Float64Array]") DA += g0;
            else c1(new Error("Failed to get type for BinaryArray"));
            c1(DA + N2(t1))
          } else if (_1 === "[object Blob]") {
            var IA = new FileReader;
            IA.onload = function() {
              var xA = h1 + V1.type + "~" + N2(this.result);
              c1(QA + fA + xA)
            }, IA.readAsArrayBuffer(V1)
          } else try {
            c1(JSON.stringify(V1))
          } catch (xA) {
            console.error("Couldn't convert value into a JSON string: ", V1), c1(null, xA)
          }
        }

        function z5(V1) {
          if (V1.substring(0, zA) !== QA) return JSON.parse(V1);
          var c1 = V1.substring(y0),
            _1 = V1.substring(zA, y0),
            t1;
          if (_1 === fA && o1.test(c1)) {
            var DA = c1.match(o1);
            t1 = DA[1], c1 = c1.substring(DA[0].length)
          }
          var IA = V0(c1);
          switch (_1) {
            case Y0:
              return IA;
            case fA:
              return X([IA], {
                type: t1
              });
            case H0:
              return new Int8Array(IA);
            case k2:
              return new Uint8Array(IA);
            case s0:
              return new Uint8ClampedArray(IA);
            case q2:
              return new Int16Array(IA);
            case j9:
              return new Uint16Array(IA);
            case h2:
              return new Int32Array(IA);
            case w6:
              return new Uint32Array(IA);
            case E0:
              return new Float32Array(IA);
            case g0:
              return new Float64Array(IA);
            default:
              throw new Error("Unkown type: " + _1)
          }
        }
        var W3 = {
          serialize: h9,
          deserialize: z5,
          stringToBuffer: V0,
          bufferToString: N2
        };

        function Z6(V1, c1, _1, t1) {
          V1.executeSql("CREATE TABLE IF NOT EXISTS " + c1.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], _1, t1)
        }

        function r2(V1) {
          var c1 = this,
            _1 = {
              db: null
            };
          if (V1)
            for (var t1 in V1) _1[t1] = typeof V1[t1] !== "string" ? V1[t1].toString() : V1[t1];
          var DA = new V(function(IA, xA) {
            try {
              _1.db = openDatabase(_1.name, String(_1.version), _1.description, _1.size)
            } catch (oA) {
              return xA(oA)
            }
            _1.db.transaction(function(oA) {
              Z6(oA, _1, function() {
                c1._dbInfo = _1, IA()
              }, function(sA, C0) {
                xA(C0)
              })
            }, xA)
          });
          return _1.serializer = W3, DA
        }

        function v6(V1, c1, _1, t1, DA, IA) {
          V1.executeSql(_1, t1, DA, function(xA, oA) {
            if (oA.code === oA.SYNTAX_ERR) xA.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [c1.storeName], function(sA, C0) {
              if (!C0.rows.length) Z6(sA, c1, function() {
                sA.executeSql(_1, t1, DA, IA)
              }, IA);
              else IA(sA, oA)
            }, IA);
            else IA(xA, oA)
          }, IA)
        }

        function J3(V1, c1) {
          var _1 = this;
          V1 = E(V1);
          var t1 = new V(function(DA, IA) {
            _1.ready().then(function() {
              var xA = _1._dbInfo;
              xA.db.transaction(function(oA) {
                v6(oA, xA, "SELECT * FROM " + xA.storeName + " WHERE key = ? LIMIT 1", [V1], function(sA, C0) {
                  var U0 = C0.rows.length ? C0.rows.item(0).value : null;
                  if (U0) U0 = xA.serializer.deserialize(U0);
                  DA(U0)
                }, function(sA, C0) {
                  IA(C0)
                })
              })
            }).catch(IA)
          });
          return C(t1, c1), t1
        }

        function uQ(V1, c1) {
          var _1 = this,
            t1 = new V(function(DA, IA) {
              _1.ready().then(function() {
                var xA = _1._dbInfo;
                xA.db.transaction(function(oA) {
                  v6(oA, xA, "SELECT * FROM " + xA.storeName, [], function(sA, C0) {
                    var U0 = C0.rows,
                      i0 = U0.length;
                    for (var R9 = 0; R9 < i0; R9++) {
                      var Z4 = U0.item(R9),
                        x4 = Z4.value;
                      if (x4) x4 = xA.serializer.deserialize(x4);
                      if (x4 = V1(x4, Z4.key, R9 + 1), x4 !== void 0) {
                        DA(x4);
                        return
                      }
                    }
                    DA()
                  }, function(sA, C0) {
                    IA(C0)
                  })
                })
              }).catch(IA)
            });
          return C(t1, c1), t1
        }

        function x0(V1, c1, _1, t1) {
          var DA = this;
          V1 = E(V1);
          var IA = new V(function(xA, oA) {
            DA.ready().then(function() {
              if (c1 === void 0) c1 = null;
              var sA = c1,
                C0 = DA._dbInfo;
              C0.serializer.serialize(c1, function(U0, i0) {
                if (i0) oA(i0);
                else C0.db.transaction(function(R9) {
                  v6(R9, C0, "INSERT OR REPLACE INTO " + C0.storeName + " (key, value) VALUES (?, ?)", [V1, U0], function() {
                    xA(sA)
                  }, function(Z4, x4) {
                    oA(x4)
                  })
                }, function(R9) {
                  if (R9.code === R9.QUOTA_ERR) {
                    if (t1 > 0) {
                      xA(x0.apply(DA, [V1, sA, _1, t1 - 1]));
                      return
                    }
                    oA(R9)
                  }
                })
              })
            }).catch(oA)
          });
          return C(IA, _1), IA
        }

        function d0(V1, c1, _1) {
          return x0.apply(this, [V1, c1, _1, 1])
        }

        function L9(V1, c1) {
          var _1 = this;
          V1 = E(V1);
          var t1 = new V(function(DA, IA) {
            _1.ready().then(function() {
              var xA = _1._dbInfo;
              xA.db.transaction(function(oA) {
                v6(oA, xA, "DELETE FROM " + xA.storeName + " WHERE key = ?", [V1], function() {
                  DA()
                }, function(sA, C0) {
                  IA(C0)
                })
              })
            }).catch(IA)
          });
          return C(t1, c1), t1
        }

        function w5(V1) {
          var c1 = this,
            _1 = new V(function(t1, DA) {
              c1.ready().then(function() {
                var IA = c1._dbInfo;
                IA.db.transaction(function(xA) {
                  v6(xA, IA, "DELETE FROM " + IA.storeName, [], function() {
                    t1()
                  }, function(oA, sA) {
                    DA(sA)
                  })
                })
              }).catch(DA)
            });
          return C(_1, V1), _1
        }

        function _B(V1) {
          var c1 = this,
            _1 = new V(function(t1, DA) {
              c1.ready().then(function() {
                var IA = c1._dbInfo;
                IA.db.transaction(function(xA) {
                  v6(xA, IA, "SELECT COUNT(key) as c FROM " + IA.storeName, [], function(oA, sA) {
                    var C0 = sA.rows.item(0).c;
                    t1(C0)
                  }, function(oA, sA) {
                    DA(sA)
                  })
                })
              }).catch(DA)
            });
          return C(_1, V1), _1
        }

        function D6(V1, c1) {
          var _1 = this,
            t1 = new V(function(DA, IA) {
              _1.ready().then(function() {
                var xA = _1._dbInfo;
                xA.db.transaction(function(oA) {
                  v6(oA, xA, "SELECT key FROM " + xA.storeName + " WHERE id = ? LIMIT 1", [V1 + 1], function(sA, C0) {
                    var U0 = C0.rows.length ? C0.rows.item(0).key : null;
                    DA(U0)
                  }, function(sA, C0) {
                    IA(C0)
                  })
                })
              }).catch(IA)
            });
          return C(t1, c1), t1
        }

        function F3(V1) {
          var c1 = this,
            _1 = new V(function(t1, DA) {
              c1.ready().then(function() {
                var IA = c1._dbInfo;
                IA.db.transaction(function(xA) {
                  v6(xA, IA, "SELECT key FROM " + IA.storeName, [], function(oA, sA) {
                    var C0 = [];
                    for (var U0 = 0; U0 < sA.rows.length; U0++) C0.push(sA.rows.item(U0).key);
                    t1(C0)
                  }, function(oA, sA) {
                    DA(sA)
                  })
                })
              }).catch(DA)
            });
          return C(_1, V1), _1
        }

        function X3(V1) {
          return new V(function(c1, _1) {
            V1.transaction(function(t1) {
              t1.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(DA, IA) {
                var xA = [];
                for (var oA = 0; oA < IA.rows.length; oA++) xA.push(IA.rows.item(oA).name);
                c1({
                  db: V1,
                  storeNames: xA
                })
              }, function(DA, IA) {
                _1(IA)
              })
            }, function(t1) {
              _1(t1)
            })
          })
        }

        function q7(V1, c1) {
          c1 = N.apply(this, arguments);
          var _1 = this.config();
          if (V1 = typeof V1 !== "function" && V1 || {}, !V1.name) V1.name = V1.name || _1.name, V1.storeName = V1.storeName || _1.storeName;
          var t1 = this,
            DA;
          if (!V1.name) DA = V.reject("Invalid arguments");
          else DA = new V(function(IA) {
            var xA;
            if (V1.name === _1.name) xA = t1._dbInfo.db;
            else xA = openDatabase(V1.name, "", "", 0);
            if (!V1.storeName) IA(X3(xA));
            else IA({
              db: xA,
              storeNames: [V1.storeName]
            })
          }).then(function(IA) {
            return new V(function(xA, oA) {
              IA.db.transaction(function(sA) {
                function C0(Z4) {
                  return new V(function(x4, W5) {
                    sA.executeSql("DROP TABLE IF EXISTS " + Z4, [], function() {
                      x4()
                    }, function(b6, C3) {
                      W5(C3)
                    })
                  })
                }
                var U0 = [];
                for (var i0 = 0, R9 = IA.storeNames.length; i0 < R9; i0++) U0.push(C0(IA.storeNames[i0]));
                V.all(U0).then(function() {
                  xA()
                }).catch(function(Z4) {
                  oA(Z4)
                })
              }, function(sA) {
                oA(sA)
              })
            })
          });
          return C(DA, c1), DA
        }
        var V3 = {
          _driver: "webSQLStorage",
          _initStorage: r2,
          _support: y1(),
          iterate: uQ,
          getItem: J3,
          setItem: d0,
          removeItem: L9,
          clear: w5,
          length: _B,
          key: D6,
          keys: F3,
          dropInstance: q7
        };

        function H2() {
          try {
            return typeof localStorage !== "undefined" && "setItem" in localStorage && !!localStorage.setItem
          } catch (V1) {
            return !1
          }
        }

        function w9(V1, c1) {
          var _1 = V1.name + "/";
          if (V1.storeName !== c1.storeName) _1 += V1.storeName + "/";
          return _1
        }

        function j5() {
          var V1 = "_localforage_support_test";
          try {
            return localStorage.setItem(V1, !0), localStorage.removeItem(V1), !1
          } catch (c1) {
            return !0
          }
        }

        function j8() {
          return !j5() || localStorage.length > 0
        }

        function y3(V1) {
          var c1 = this,
            _1 = {};
          if (V1)
            for (var t1 in V1) _1[t1] = V1[t1];
          if (_1.keyPrefix = w9(V1, c1._defaultConfig), !j8()) return V.reject();
          return c1._dbInfo = _1, _1.serializer = W3, V.resolve()
        }

        function WQ(V1) {
          var c1 = this,
            _1 = c1.ready().then(function() {
              var t1 = c1._dbInfo.keyPrefix;
              for (var DA = localStorage.length - 1; DA >= 0; DA--) {
                var IA = localStorage.key(DA);
                if (IA.indexOf(t1) === 0) localStorage.removeItem(IA)
              }
            });
          return C(_1, V1), _1
        }

        function nI(V1, c1) {
          var _1 = this;
          V1 = E(V1);
          var t1 = _1.ready().then(function() {
            var DA = _1._dbInfo,
              IA = localStorage.getItem(DA.keyPrefix + V1);
            if (IA) IA = DA.serializer.deserialize(IA);
            return IA
          });
          return C(t1, c1), t1
        }

        function AD(V1, c1) {
          var _1 = this,
            t1 = _1.ready().then(function() {
              var DA = _1._dbInfo,
                IA = DA.keyPrefix,
                xA = IA.length,
                oA = localStorage.length,
                sA = 1;
              for (var C0 = 0; C0 < oA; C0++) {
                var U0 = localStorage.key(C0);
                if (U0.indexOf(IA) !== 0) continue;
                var i0 = localStorage.getItem(U0);
                if (i0) i0 = DA.serializer.deserialize(i0);
                if (i0 = V1(i0, U0.substring(xA), sA++), i0 !== void 0) return i0
              }
            });
          return C(t1, c1), t1
        }

        function aI(V1, c1) {
          var _1 = this,
            t1 = _1.ready().then(function() {
              var DA = _1._dbInfo,
                IA;
              try {
                IA = localStorage.key(V1)
              } catch (xA) {
                IA = null
              }
              if (IA) IA = IA.substring(DA.keyPrefix.length);
              return IA
            });
          return C(t1, c1), t1
        }

        function pQ(V1) {
          var c1 = this,
            _1 = c1.ready().then(function() {
              var t1 = c1._dbInfo,
                DA = localStorage.length,
                IA = [];
              for (var xA = 0; xA < DA; xA++) {
                var oA = localStorage.key(xA);
                if (oA.indexOf(t1.keyPrefix) === 0) IA.push(oA.substring(t1.keyPrefix.length))
              }
              return IA
            });
          return C(_1, V1), _1
        }

        function BD(V1) {
          var c1 = this,
            _1 = c1.keys().then(function(t1) {
              return t1.length
            });
          return C(_1, V1), _1
        }

        function cQ(V1, c1) {
          var _1 = this;
          V1 = E(V1);
          var t1 = _1.ready().then(function() {
            var DA = _1._dbInfo;
            localStorage.removeItem(DA.keyPrefix + V1)
          });
          return C(t1, c1), t1
        }

        function rG(V1, c1, _1) {
          var t1 = this;
          V1 = E(V1);
          var DA = t1.ready().then(function() {
            if (c1 === void 0) c1 = null;
            var IA = c1;
            return new V(function(xA, oA) {
              var sA = t1._dbInfo;
              sA.serializer.serialize(c1, function(C0, U0) {
                if (U0) oA(U0);
                else try {
                  localStorage.setItem(sA.keyPrefix + V1, C0), xA(IA)
                } catch (i0) {
                  if (i0.name === "QuotaExceededError" || i0.name === "NS_ERROR_DOM_QUOTA_REACHED") oA(i0);
                  oA(i0)
                }
              })
            })
          });
          return C(DA, _1), DA
        }

        function zB(V1, c1) {
          if (c1 = N.apply(this, arguments), V1 = typeof V1 !== "function" && V1 || {}, !V1.name) {
            var _1 = this.config();
            V1.name = V1.name || _1.name, V1.storeName = V1.storeName || _1.storeName
          }
          var t1 = this,
            DA;
          if (!V1.name) DA = V.reject("Invalid arguments");
          else DA = new V(function(IA) {
            if (!V1.storeName) IA(V1.name + "/");
            else IA(w9(V1, t1._defaultConfig))
          }).then(function(IA) {
            for (var xA = localStorage.length - 1; xA >= 0; xA--) {
              var oA = localStorage.key(xA);
              if (oA.indexOf(IA) === 0) localStorage.removeItem(oA)
            }
          });
          return C(DA, c1), DA
        }
        var e7 = {
            _driver: "localStorageWrapper",
            _initStorage: y3,
            _support: H2(),
            iterate: AD,
            getItem: nI,
            setItem: rG,
            removeItem: cQ,
            clear: WQ,
            length: BD,
            key: aI,
            keys: pQ,
            dropInstance: zB
          },
          S1 = function V1(c1, _1) {
            return c1 === _1 || typeof c1 === "number" && typeof _1 === "number" && isNaN(c1) && isNaN(_1)
          },
          T1 = function V1(c1, _1) {
            var t1 = c1.length,
              DA = 0;
            while (DA < t1) {
              if (S1(c1[DA], _1)) return !0;
              DA++
            }
            return !1
          },
          VA = Array.isArray || function(V1) {
            return Object.prototype.toString.call(V1) === "[object Array]"
          },
          OA = {},
          KA = {},
          PA = {
            INDEXEDDB: e,
            WEBSQL: V3,
            LOCALSTORAGE: e7
          },
          D0 = [PA.INDEXEDDB._driver, PA.WEBSQL._driver, PA.LOCALSTORAGE._driver],
          lA = ["dropInstance"],
          NA = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(lA),
          SA = {
            description: "",
            driver: D0.slice(),
            name: "localforage",
            size: 4980736,
            storeName: "keyvaluepairs",
            version: 1
          };

        function uA(V1, c1) {
          V1[c1] = function() {
            var _1 = arguments;
            return V1.ready().then(function() {
              return V1[c1].apply(V1, _1)
            })
          }
        }

        function W2() {
          for (var V1 = 1; V1 < arguments.length; V1++) {
            var c1 = arguments[V1];
            if (c1) {
              for (var _1 in c1)
                if (c1.hasOwnProperty(_1))
                  if (VA(c1[_1])) arguments[0][_1] = c1[_1].slice();
                  else arguments[0][_1] = c1[_1]
            }
          }
          return arguments[0]
        }
        var c0 = function() {
            function V1(c1) {
              Y(this, V1);
              for (var _1 in PA)
                if (PA.hasOwnProperty(_1)) {
                  var t1 = PA[_1],
                    DA = t1._driver;
                  if (this[_1] = DA, !OA[DA]) this.defineDriver(t1)
                } this._defaultConfig = W2({}, SA), this._config = W2({}, this._defaultConfig, c1), this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch(function() {})
            }
            return V1.prototype.config = function c1(_1) {
              if ((typeof _1 === "undefined" ? "undefined" : D(_1)) === "object") {
                if (this._ready) return new Error("Can't call config() after localforage has been used.");
                for (var t1 in _1) {
                  if (t1 === "storeName") _1[t1] = _1[t1].replace(/\W/g, "_");
                  if (t1 === "version" && typeof _1[t1] !== "number") return new Error("Database version must be a number.");
                  this._config[t1] = _1[t1]
                }
                if ("driver" in _1 && _1.driver) return this.setDriver(this._config.driver);
                return !0
              } else if (typeof _1 === "string") return this._config[_1];
              else return this._config
            }, V1.prototype.defineDriver = function c1(_1, t1, DA) {
              var IA = new V(function(xA, oA) {
                try {
                  var sA = _1._driver,
                    C0 = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                  if (!_1._driver) {
                    oA(C0);
                    return
                  }
                  var U0 = NA.concat("_initStorage");
                  for (var i0 = 0, R9 = U0.length; i0 < R9; i0++) {
                    var Z4 = U0[i0],
                      x4 = !T1(lA, Z4);
                    if ((x4 || _1[Z4]) && typeof _1[Z4] !== "function") {
                      oA(C0);
                      return
                    }
                  }
                  var W5 = function C3() {
                    var AI = function yW(ID) {
                      return function() {
                        var L4 = new Error("Method " + ID + " is not implemented by the current driver"),
                          QI = V.reject(L4);
                        return C(QI, arguments[arguments.length - 1]), QI
                      }
                    };
                    for (var QD = 0, jW = lA.length; QD < jW; QD++) {
                      var BI = lA[QD];
                      if (!_1[BI]) _1[BI] = AI(BI)
                    }
                  };
                  W5();
                  var b6 = function C3(AI) {
                    if (OA[sA]) console.info("Redefining LocalForage driver: " + sA);
                    OA[sA] = _1, KA[sA] = AI, xA()
                  };
                  if ("_support" in _1)
                    if (_1._support && typeof _1._support === "function") _1._support().then(b6, oA);
                    else b6(!!_1._support);
                  else b6(!0)
                } catch (C3) {
                  oA(C3)
                }
              });
              return K(IA, t1, DA), IA
            }, V1.prototype.driver = function c1() {
              return this._driver || null
            }, V1.prototype.getDriver = function c1(_1, t1, DA) {
              var IA = OA[_1] ? V.resolve(OA[_1]) : V.reject(new Error("Driver not found."));
              return K(IA, t1, DA), IA
            }, V1.prototype.getSerializer = function c1(_1) {
              var t1 = V.resolve(W3);
              return K(t1, _1), t1
            }, V1.prototype.ready = function c1(_1) {
              var t1 = this,
                DA = t1._driverSet.then(function() {
                  if (t1._ready === null) t1._ready = t1._initDriver();
                  return t1._ready
                });
              return K(DA, _1, _1), DA
            }, V1.prototype.setDriver = function c1(_1, t1, DA) {
              var IA = this;
              if (!VA(_1)) _1 = [_1];
              var xA = this._getSupportedDrivers(_1);

              function oA() {
                IA._config.driver = IA.driver()
              }

              function sA(i0) {
                return IA._extend(i0), oA(), IA._ready = IA._initStorage(IA._config), IA._ready
              }

              function C0(i0) {
                return function() {
                  var R9 = 0;

                  function Z4() {
                    while (R9 < i0.length) {
                      var x4 = i0[R9];
                      return R9++, IA._dbInfo = null, IA._ready = null, IA.getDriver(x4).then(sA).catch(Z4)
                    }
                    oA();
                    var W5 = new Error("No available storage method found.");
                    return IA._driverSet = V.reject(W5), IA._driverSet
                  }
                  return Z4()
                }
              }
              var U0 = this._driverSet !== null ? this._driverSet.catch(function() {
                return V.resolve()
              }) : V.resolve();
              return this._driverSet = U0.then(function() {
                var i0 = xA[0];
                return IA._dbInfo = null, IA._ready = null, IA.getDriver(i0).then(function(R9) {
                  IA._driver = R9._driver, oA(), IA._wrapLibraryMethodsWithReady(), IA._initDriver = C0(xA)
                })
              }).catch(function() {
                oA();
                var i0 = new Error("No available storage method found.");
                return IA._driverSet = V.reject(i0), IA._driverSet
              }), K(this._driverSet, t1, DA), this._driverSet
            }, V1.prototype.supports = function c1(_1) {
              return !!KA[_1]
            }, V1.prototype._extend = function c1(_1) {
              W2(this, _1)
            }, V1.prototype._getSupportedDrivers = function c1(_1) {
              var t1 = [];
              for (var DA = 0, IA = _1.length; DA < IA; DA++) {
                var xA = _1[DA];
                if (this.supports(xA)) t1.push(xA)
              }
              return t1
            }, V1.prototype._wrapLibraryMethodsWithReady = function c1() {
              for (var _1 = 0, t1 = NA.length; _1 < t1; _1++) uA(this, NA[_1])
            }, V1.prototype.createInstance = function c1(_1) {
              return new V1(_1)
            }, V1
          }(),
          z2 = new c0;
        G.exports = z2
      }, {
        "3": 3
      }]
    }, {}, [4])(4)
  })
})
// @from(Start 631206, End 633774)
PWA = z((TWA) => {
  Object.defineProperty(TWA, "__esModule", {
    value: !0
  });
  var Qz = rA(),
    qW9 = OWA(),
    cP = Cl(),
    YM = Qz.GLOBAL_OBJ;
  class Kl {
    static __initStatic() {
      this.id = "Offline"
    }
    constructor(A = {}) {
      this.name = Kl.id, this.maxStoredEvents = A.maxStoredEvents || 30, this.offlineEventStore = qW9.createInstance({
        name: "sentry/offlineEventStore"
      })
    }
    setupOnce(A, B) {
      if (this.hub = B(), "addEventListener" in YM) YM.addEventListener("online", () => {
        this._sendEvents().catch(() => {
          cP.DEBUG_BUILD && Qz.logger.warn("could not send cached events")
        })
      });
      let Q = (I) => {
        if (this.hub && this.hub.getIntegration(Kl)) {
          if ("navigator" in YM && "onLine" in YM.navigator && !YM.navigator.onLine) return cP.DEBUG_BUILD && Qz.logger.log("Event dropped due to being a offline - caching instead"), this._cacheEvent(I).then((G) => this._enforceMaxEvents()).catch((G) => {
            cP.DEBUG_BUILD && Qz.logger.warn("could not cache event while offline")
          }), null
        }
        return I
      };
      if (Q.id = this.name, A(Q), "navigator" in YM && "onLine" in YM.navigator && YM.navigator.onLine) this._sendEvents().catch(() => {
        cP.DEBUG_BUILD && Qz.logger.warn("could not send cached events")
      })
    }
    async _cacheEvent(A) {
      return this.offlineEventStore.setItem(Qz.uuid4(), Qz.normalize(A))
    }
    async _enforceMaxEvents() {
      let A = [];
      return this.offlineEventStore.iterate((B, Q, I) => {
        A.push({
          cacheKey: Q,
          event: B
        })
      }).then(() => this._purgeEvents(A.sort((B, Q) => (Q.event.timestamp || 0) - (B.event.timestamp || 0)).slice(this.maxStoredEvents < A.length ? this.maxStoredEvents : A.length).map((B) => B.cacheKey))).catch((B) => {
        cP.DEBUG_BUILD && Qz.logger.warn("could not enforce max events")
      })
    }
    async _purgeEvent(A) {
      return this.offlineEventStore.removeItem(A)
    }
    async _purgeEvents(A) {
      return Promise.all(A.map((B) => this._purgeEvent(B))).then()
    }
    async _sendEvents() {
      return this.offlineEventStore.iterate((A, B, Q) => {
        if (this.hub) this.hub.captureEvent(A), this._purgeEvent(B).catch((I) => {
          cP.DEBUG_BUILD && Qz.logger.warn("could not purge event from cache")
        });
        else cP.DEBUG_BUILD && Qz.logger.warn("no hub found - could not send cached event")
      })
    }
  }
  Kl.__initStatic();
  TWA.Offline = Kl
})
// @from(Start 633780, End 635158)
xWA = z((kWA) => {
  Object.defineProperty(kWA, "__esModule", {
    value: !0
  });
  var Hl = z4(),
    _WA = rA(),
    LW9 = _WA.GLOBAL_OBJ,
    jWA = "ReportingObserver",
    SWA = new WeakMap,
    RW9 = (A = {}) => {
      let B = A.types || ["crash", "deprecation", "intervention"];

      function Q(I) {
        if (!SWA.has(Hl.getClient())) return;
        for (let G of I) Hl.withScope((Z) => {
          Z.setExtra("url", G.url);
          let D = `ReportingObserver [${G.type}]`,
            Y = "No details available";
          if (G.body) {
            let W = {};
            for (let J in G.body) W[J] = G.body[J];
            if (Z.setExtra("body", W), G.type === "crash") {
              let J = G.body;
              Y = [J.crashId || "", J.reason || ""].join(" ").trim() || Y
            } else Y = G.body.message || Y
          }
          Hl.captureMessage(`${D}: ${Y}`)
        })
      }
      return {
        name: jWA,
        setupOnce() {
          if (!_WA.supportsReportingObserver()) return;
          new LW9.ReportingObserver(Q, {
            buffered: !0,
            types: B
          }).observe()
        },
        setup(I) {
          SWA.set(I, !0)
        }
      }
    },
    yWA = Hl.defineIntegration(RW9),
    OW9 = Hl.convertIntegrationFnToClass(jWA, yWA);
  kWA.ReportingObserver = OW9;
  kWA.reportingObserverIntegration = yWA
})
// @from(Start 635164, End 636795)
mWA = z((hWA) => {
  Object.defineProperty(hWA, "__esModule", {
    value: !0
  });
  var vWA = z4(),
    fWA = rA(),
    bWA = "RewriteFrames",
    SW9 = (A = {}) => {
      let B = A.root,
        Q = A.prefix || "app:///",
        I = A.iteratee || ((D) => {
          if (!D.filename) return D;
          let Y = /^[a-zA-Z]:\\/.test(D.filename) || D.filename.includes("\\") && !D.filename.includes("/"),
            W = /^\//.test(D.filename);
          if (Y || W) {
            let J = Y ? D.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/") : D.filename,
              F = B ? fWA.relative(B, J) : fWA.basename(J);
            D.filename = `${Q}${F}`
          }
          return D
        });

      function G(D) {
        try {
          return {
            ...D,
            exception: {
              ...D.exception,
              values: D.exception.values.map((Y) => ({
                ...Y,
                ...Y.stacktrace && {
                  stacktrace: Z(Y.stacktrace)
                }
              }))
            }
          }
        } catch (Y) {
          return D
        }
      }

      function Z(D) {
        return {
          ...D,
          frames: D && D.frames && D.frames.map((Y) => I(Y))
        }
      }
      return {
        name: bWA,
        setupOnce() {},
        processEvent(D) {
          let Y = D;
          if (D.exception && Array.isArray(D.exception.values)) Y = G(Y);
          return Y
        }
      }
    },
    gWA = vWA.defineIntegration(SW9),
    _W9 = vWA.convertIntegrationFnToClass(bWA, gWA);
  hWA.RewriteFrames = _W9;
  hWA.rewriteFramesIntegration = gWA
})
// @from(Start 636801, End 637492)
lWA = z((cWA) => {
  Object.defineProperty(cWA, "__esModule", {
    value: !0
  });
  var dWA = z4(),
    uWA = "SessionTiming",
    kW9 = () => {
      let A = Date.now();
      return {
        name: uWA,
        setupOnce() {},
        processEvent(B) {
          let Q = Date.now();
          return {
            ...B,
            extra: {
              ...B.extra,
              ["session:start"]: A,
              ["session:duration"]: Q - A,
              ["session:end"]: Q
            }
          }
        }
      }
    },
    pWA = dWA.defineIntegration(kW9),
    xW9 = dWA.convertIntegrationFnToClass(uWA, pWA);
  cWA.SessionTiming = xW9;
  cWA.sessionTimingIntegration = pWA
})
// @from(Start 637498, End 638341)
aWA = z((nWA) => {
  Object.defineProperty(nWA, "__esModule", {
    value: !0
  });
  var bW9 = z4(),
    iWA = "Transaction",
    gW9 = () => {
      return {
        name: iWA,
        setupOnce() {},
        processEvent(A) {
          let B = mW9(A);
          for (let Q = B.length - 1; Q >= 0; Q--) {
            let I = B[Q];
            if (I.in_app === !0) {
              A.transaction = dW9(I);
              break
            }
          }
          return A
        }
      }
    },
    hW9 = bW9.convertIntegrationFnToClass(iWA, gW9);

  function mW9(A) {
    let B = A.exception && A.exception.values && A.exception.values[0];
    return B && B.stacktrace && B.stacktrace.frames || []
  }

  function dW9(A) {
    return A.module || A.function ? `${A.module||"?"}/${A.function||"?"}` : "<unknown>"
  }
  nWA.Transaction = hW9
})
// @from(Start 638347, End 643522)
QJA = z((BJA) => {
  Object.defineProperty(BJA, "__esModule", {
    value: !0
  });
  var xU = z4(),
    Iz = rA(),
    o41 = Cl(),
    sWA = "HttpClient",
    pW9 = (A = {}) => {
      let B = {
        failedRequestStatusCodes: [
          [500, 599]
        ],
        failedRequestTargets: [/.*/],
        ...A
      };
      return {
        name: sWA,
        setupOnce() {},
        setup(Q) {
          tW9(Q, B), eW9(Q, B)
        }
      }
    },
    rWA = xU.defineIntegration(pW9),
    cW9 = xU.convertIntegrationFnToClass(sWA, rWA);

  function lW9(A, B, Q, I) {
    if (tWA(A, Q.status, Q.url)) {
      let G = AJ9(B, I),
        Z, D, Y, W;
      if (AJA())[{
        headers: Z,
        cookies: Y
      }, {
        headers: D,
        cookies: W
      }] = [{
        cookieHeader: "Cookie",
        obj: G
      }, {
        cookieHeader: "Set-Cookie",
        obj: Q
      }].map(({
        cookieHeader: F,
        obj: X
      }) => {
        let V = aW9(X.headers),
          C;
        try {
          let K = V[F] || V[F.toLowerCase()] || void 0;
          if (K) C = oWA(K)
        } catch (K) {
          o41.DEBUG_BUILD && Iz.logger.log(`Could not extract cookies from header ${F}`)
        }
        return {
          headers: V,
          cookies: C
        }
      });
      let J = eWA({
        url: G.url,
        method: G.method,
        status: Q.status,
        requestHeaders: Z,
        responseHeaders: D,
        requestCookies: Y,
        responseCookies: W
      });
      xU.captureEvent(J)
    }
  }

  function iW9(A, B, Q, I) {
    if (tWA(A, B.status, B.responseURL)) {
      let G, Z, D;
      if (AJA()) {
        try {
          let W = B.getResponseHeader("Set-Cookie") || B.getResponseHeader("set-cookie") || void 0;
          if (W) Z = oWA(W)
        } catch (W) {
          o41.DEBUG_BUILD && Iz.logger.log("Could not extract cookies from response headers")
        }
        try {
          D = sW9(B)
        } catch (W) {
          o41.DEBUG_BUILD && Iz.logger.log("Could not extract headers from response")
        }
        G = I
      }
      let Y = eWA({
        url: B.responseURL,
        method: Q,
        status: B.status,
        requestHeaders: G,
        responseHeaders: D,
        responseCookies: Z
      });
      xU.captureEvent(Y)
    }
  }

  function nW9(A) {
    if (A) {
      let B = A["Content-Length"] || A["content-length"];
      if (B) return parseInt(B, 10)
    }
    return
  }

  function oWA(A) {
    return A.split("; ").reduce((B, Q) => {
      let [I, G] = Q.split("=");
      return B[I] = G, B
    }, {})
  }

  function aW9(A) {
    let B = {};
    return A.forEach((Q, I) => {
      B[I] = Q
    }), B
  }

  function sW9(A) {
    let B = A.getAllResponseHeaders();
    if (!B) return {};
    return B.split(`\r
`).reduce((Q, I) => {
      let [G, Z] = I.split(": ");
      return Q[G] = Z, Q
    }, {})
  }

  function rW9(A, B) {
    return A.some((Q) => {
      if (typeof Q === "string") return B.includes(Q);
      return Q.test(B)
    })
  }

  function oW9(A, B) {
    return A.some((Q) => {
      if (typeof Q === "number") return Q === B;
      return B >= Q[0] && B <= Q[1]
    })
  }

  function tW9(A, B) {
    if (!Iz.supportsNativeFetch()) return;
    Iz.addFetchInstrumentationHandler((Q) => {
      if (xU.getClient() !== A) return;
      let {
        response: I,
        args: G
      } = Q, [Z, D] = G;
      if (!I) return;
      lW9(B, Z, I, D)
    })
  }

  function eW9(A, B) {
    if (!("XMLHttpRequest" in Iz.GLOBAL_OBJ)) return;
    Iz.addXhrInstrumentationHandler((Q) => {
      if (xU.getClient() !== A) return;
      let I = Q.xhr,
        G = I[Iz.SENTRY_XHR_DATA_KEY];
      if (!G) return;
      let {
        method: Z,
        request_headers: D
      } = G;
      try {
        iW9(B, I, Z, D)
      } catch (Y) {
        o41.DEBUG_BUILD && Iz.logger.warn("Error while extracting response event form XHR response", Y)
      }
    })
  }

  function tWA(A, B, Q) {
    return oW9(A.failedRequestStatusCodes, B) && rW9(A.failedRequestTargets, Q) && !xU.isSentryRequestUrl(Q, xU.getClient())
  }

  function eWA(A) {
    let B = `HTTP Client Error with status code: ${A.status}`,
      Q = {
        message: B,
        exception: {
          values: [{
            type: "Error",
            value: B
          }]
        },
        request: {
          url: A.url,
          method: A.method,
          headers: A.requestHeaders,
          cookies: A.requestCookies
        },
        contexts: {
          response: {
            status_code: A.status,
            headers: A.responseHeaders,
            cookies: A.responseCookies,
            body_size: nW9(A.responseHeaders)
          }
        }
      };
    return Iz.addExceptionMechanism(Q, {
      type: "http.client",
      handled: !1
    }), Q
  }

  function AJ9(A, B) {
    if (!B && A instanceof Request) return A;
    if (A instanceof Request && A.bodyUsed) return A;
    return new Request(A, B)
  }

  function AJA() {
    let A = xU.getClient();
    return A ? Boolean(A.getOptions().sendDefaultPii) : !1
  }
  BJA.HttpClient = cW9;
  BJA.httpClientIntegration = rWA
})
// @from(Start 643528, End 644791)
WJA = z((YJA) => {
  Object.defineProperty(YJA, "__esModule", {
    value: !0
  });
  var IJA = z4(),
    Oq1 = rA(),
    Rq1 = Oq1.GLOBAL_OBJ,
    IJ9 = 7,
    GJA = "ContextLines",
    GJ9 = (A = {}) => {
      let B = A.frameContextLines != null ? A.frameContextLines : IJ9;
      return {
        name: GJA,
        setupOnce() {},
        processEvent(Q) {
          return DJ9(Q, B)
        }
      }
    },
    ZJA = IJA.defineIntegration(GJ9),
    ZJ9 = IJA.convertIntegrationFnToClass(GJA, ZJA);

  function DJ9(A, B) {
    let Q = Rq1.document,
      I = Rq1.location && Oq1.stripUrlQueryAndFragment(Rq1.location.href);
    if (!Q || !I) return A;
    let G = A.exception && A.exception.values;
    if (!G || !G.length) return A;
    let Z = Q.documentElement.innerHTML;
    if (!Z) return A;
    let D = ["<!DOCTYPE html>", "<html>", ...Z.split(`
`), "</html>"];
    return G.forEach((Y) => {
      let W = Y.stacktrace;
      if (W && W.frames) W.frames = W.frames.map((J) => DJA(J, D, I, B))
    }), A
  }

  function DJA(A, B, Q, I) {
    if (A.filename !== Q || !A.lineno || !B.length) return A;
    return Oq1.addContextToFrame(B, A, I), A
  }
  YJA.ContextLines = ZJ9;
  YJA.applySourceContextToFrame = DJA;
  YJA.contextLinesIntegration = ZJA
})
// @from(Start 644797, End 646021)
UJA = z((EJA) => {
  Object.defineProperty(EJA, "__esModule", {
    value: !0
  });
  var JJA = IWA(),
    FJA = WWA(),
    XJA = UWA(),
    VJA = LWA(),
    FJ9 = PWA(),
    CJA = xWA(),
    KJA = mWA(),
    HJA = lWA(),
    XJ9 = aWA(),
    zJA = QJA(),
    wJA = WJA();
  EJA.CaptureConsole = JJA.CaptureConsole;
  EJA.captureConsoleIntegration = JJA.captureConsoleIntegration;
  EJA.Debug = FJA.Debug;
  EJA.debugIntegration = FJA.debugIntegration;
  EJA.Dedupe = XJA.Dedupe;
  EJA.dedupeIntegration = XJA.dedupeIntegration;
  EJA.ExtraErrorData = VJA.ExtraErrorData;
  EJA.extraErrorDataIntegration = VJA.extraErrorDataIntegration;
  EJA.Offline = FJ9.Offline;
  EJA.ReportingObserver = CJA.ReportingObserver;
  EJA.reportingObserverIntegration = CJA.reportingObserverIntegration;
  EJA.RewriteFrames = KJA.RewriteFrames;
  EJA.rewriteFramesIntegration = KJA.rewriteFramesIntegration;
  EJA.SessionTiming = HJA.SessionTiming;
  EJA.sessionTimingIntegration = HJA.sessionTimingIntegration;
  EJA.Transaction = XJ9.Transaction;
  EJA.HttpClient = zJA.HttpClient;
  EJA.httpClientIntegration = zJA.httpClientIntegration;
  EJA.ContextLines = wJA.ContextLines;
  EJA.contextLinesIntegration = wJA.contextLinesIntegration
})
// @from(Start 646027, End 647017)
t41 = z((NJA) => {
  Object.defineProperty(NJA, "__esModule", {
    value: !0
  });
  var yJ9 = [
    ["january", "1"],
    ["february", "2"],
    ["march", "3"],
    ["april", "4"],
    ["may", "5"],
    ["june", "6"],
    ["july", "7"],
    ["august", "8"],
    ["september", "9"],
    ["october", "10"],
    ["november", "11"],
    ["december", "12"],
    ["jan", "1"],
    ["feb", "2"],
    ["mar", "3"],
    ["apr", "4"],
    ["may", "5"],
    ["jun", "6"],
    ["jul", "7"],
    ["aug", "8"],
    ["sep", "9"],
    ["oct", "10"],
    ["nov", "11"],
    ["dec", "12"],
    ["sunday", "0"],
    ["monday", "1"],
    ["tuesday", "2"],
    ["wednesday", "3"],
    ["thursday", "4"],
    ["friday", "5"],
    ["saturday", "6"],
    ["sun", "0"],
    ["mon", "1"],
    ["tue", "2"],
    ["wed", "3"],
    ["thu", "4"],
    ["fri", "5"],
    ["sat", "6"]
  ];

  function kJ9(A) {
    return yJ9.reduce((B, [Q, I]) => B.replace(new RegExp(Q, "gi"), I), A)
  }
  NJA.replaceCronNames = kJ9
})
// @from(Start 647023, End 648619)
RJA = z((LJA) => {
  Object.defineProperty(LJA, "__esModule", {
    value: !0
  });
  var $JA = z4(),
    qJA = t41(),
    MJA = "Automatic instrumentation of CronJob only supports crontab string";

  function fJ9(A, B) {
    let Q = !1;
    return new Proxy(A, {
      construct(I, G) {
        let [Z, D, Y, W, J, ...F] = G;
        if (typeof Z !== "string") throw new Error(MJA);
        if (Q) throw new Error(`A job named '${B}' has already been scheduled`);
        Q = !0;
        let X = qJA.replaceCronNames(Z);

        function V(C, K) {
          return $JA.withMonitor(B, () => {
            return D(C, K)
          }, {
            schedule: {
              type: "crontab",
              value: X
            },
            timezone: J || void 0
          })
        }
        return new I(Z, V, Y, W, J, ...F)
      },
      get(I, G) {
        if (G === "from") return (Z) => {
          let {
            cronTime: D,
            onTick: Y,
            timeZone: W
          } = Z;
          if (typeof D !== "string") throw new Error(MJA);
          if (Q) throw new Error(`A job named '${B}' has already been scheduled`);
          Q = !0;
          let J = qJA.replaceCronNames(D);
          return Z.onTick = (F, X) => {
            return $JA.withMonitor(B, () => {
              return Y(F, X)
            }, {
              schedule: {
                type: "crontab",
                value: J
              },
              timezone: W || void 0
            })
          }, I.from(Z)
        };
        else return I[G]
      }
    })
  }
  LJA.instrumentCron = fJ9
})
// @from(Start 648625, End 649562)
PJA = z((TJA) => {
  var {
    _optionalChain: OJA
  } = rA();
  Object.defineProperty(TJA, "__esModule", {
    value: !0
  });
  var bJ9 = z4(),
    gJ9 = t41();

  function hJ9(A) {
    return new Proxy(A, {
      get(B, Q) {
        if (Q === "schedule" && B.schedule) return new Proxy(B.schedule, {
          apply(I, G, Z) {
            let [D, , Y] = Z;
            if (!OJA([Y, "optionalAccess", (W) => W.name])) throw new Error('Missing "name" for scheduled job. A name is required for Sentry check-in monitoring.');
            return bJ9.withMonitor(Y.name, () => {
              return I.apply(G, Z)
            }, {
              schedule: {
                type: "crontab",
                value: gJ9.replaceCronNames(D)
              },
              timezone: OJA([Y, "optionalAccess", (W) => W.timezone])
            })
          }
        });
        else return B[Q]
      }
    })
  }
  TJA.instrumentNodeCron = hJ9
})
// @from(Start 649568, End 650500)
_JA = z((SJA) => {
  Object.defineProperty(SJA, "__esModule", {
    value: !0
  });
  var dJ9 = z4(),
    uJ9 = t41();

  function pJ9(A) {
    return new Proxy(A, {
      get(B, Q) {
        if (Q === "scheduleJob") return new Proxy(B.scheduleJob, {
          apply(I, G, Z) {
            let [D, Y] = Z;
            if (typeof D !== "string" || typeof Y !== "string") throw new Error("Automatic instrumentation of 'node-schedule' requires the first parameter of 'scheduleJob' to be a job name string and the second parameter to be a crontab string");
            let W = D,
              J = Y;
            return dJ9.withMonitor(W, () => {
              return I.apply(G, Z)
            }, {
              schedule: {
                type: "crontab",
                value: uJ9.replaceCronNames(J)
              }
            })
          }
        });
        return B[Q]
      }
    })
  }
  SJA.instrumentNodeSchedule = pJ9
})