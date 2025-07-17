
// @from(Start 289271, End 299085)
OZA = z((RZA) => {
  Object.defineProperty(RZA, "__esModule", {
    value: !0
  });
  var qQ = z4(),
    dF = rA(),
    ZM = MY(),
    bQ9 = d$1(),
    UZA = Tx(),
    Yl = s$1(),
    $ZA = L41(),
    BJ = eW(),
    qZA = "BrowserTracing",
    gQ9 = {
      ...qQ.TRACING_DEFAULTS,
      instrumentNavigation: !0,
      instrumentPageLoad: !0,
      markBackgroundSpan: !0,
      enableLongTask: !0,
      enableInp: !1,
      interactionsSampleRate: 1,
      _experiments: {},
      ...$ZA.defaultRequestInstrumentationOptions
    },
    hQ9 = (A = {}) => {
      let B = ZM.DEBUG_BUILD ? !!(A.tracePropagationTargets || A.tracingOrigins) : !1;
      if (qQ.addTracingExtensions(), !A.tracePropagationTargets && A.tracingOrigins) A.tracePropagationTargets = A.tracingOrigins;
      let Q = {
          ...gQ9,
          ...A
        },
        I = Yl.startTrackingWebVitals(),
        G = {};
      if (Q.enableInp) Yl.startTrackingINP(G, Q.interactionsSampleRate);
      if (Q.enableLongTask) Yl.startTrackingLongTasks();
      if (Q._experiments.enableInteractions) Yl.startTrackingInteractions();
      let Z = {
        name: void 0,
        context: void 0
      };

      function D(Y) {
        let W = qQ.getCurrentHub(),
          {
            beforeStartSpan: J,
            idleTimeout: F,
            finalTimeout: X,
            heartbeatInterval: V
          } = Q,
          C = Y.op === "pageload",
          K;
        if (C) {
          let O = C ? e$1("sentry-trace") : "",
            R = C ? e$1("baggage") : void 0,
            {
              traceId: T,
              dsc: L,
              parentSpanId: _,
              sampled: k
            } = dF.propagationContextFromHeaders(O, R);
          K = {
            traceId: T,
            parentSpanId: _,
            parentSampled: k,
            ...Y,
            metadata: {
              ...Y.metadata,
              dynamicSamplingContext: L
            },
            trimEnd: !0
          }
        } else K = {
          trimEnd: !0,
          ...Y
        };
        let E = J ? J(K) : K;
        if (E.metadata = E.name !== K.name ? {
            ...E.metadata,
            source: "custom"
          } : E.metadata, Z.name = E.name, Z.context = E, E.sampled === !1) ZM.DEBUG_BUILD && dF.logger.log(`[Tracing] Will not send ${E.op} transaction because of beforeNavigate.`);
        ZM.DEBUG_BUILD && dF.logger.log(`[Tracing] Starting ${E.op} transaction on scope`);
        let {
          location: N
        } = BJ.WINDOW, q = qQ.startIdleTransaction(W, E, F, X, !0, {
          location: N
        }, V, C);
        if (C && BJ.WINDOW.document) {
          if (BJ.WINDOW.document.addEventListener("readystatechange", () => {
              if (["interactive", "complete"].includes(BJ.WINDOW.document.readyState)) q.sendAutoFinishSignal()
            }), ["interactive", "complete"].includes(BJ.WINDOW.document.readyState)) q.sendAutoFinishSignal()
        }
        return q.registerBeforeFinishCallback((O) => {
          I(), Yl.addPerformanceEntries(O)
        }), q
      }
      return {
        name: qZA,
        setupOnce: () => {},
        afterAllSetup(Y) {
          let W = Y.getOptions(),
            {
              markBackgroundSpan: J,
              traceFetch: F,
              traceXHR: X,
              shouldCreateSpanForRequest: V,
              enableHTTPTimings: C,
              _experiments: K
            } = Q,
            E = W && W.tracePropagationTargets,
            N = E || Q.tracePropagationTargets;
          if (ZM.DEBUG_BUILD && B && E) dF.logger.warn("[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used.");
          let q, O = BJ.WINDOW.location && BJ.WINDOW.location.href;
          if (Y.on) Y.on("startNavigationSpan", (R) => {
            if (q) ZM.DEBUG_BUILD && dF.logger.log(`[Tracing] Finishing current transaction with op: ${qQ.spanToJSON(q).op}`), q.end();
            q = D({
              op: "navigation",
              ...R
            })
          }), Y.on("startPageLoadSpan", (R) => {
            if (q) ZM.DEBUG_BUILD && dF.logger.log(`[Tracing] Finishing current transaction with op: ${qQ.spanToJSON(q).op}`), q.end();
            q = D({
              op: "pageload",
              ...R
            })
          });
          if (Q.instrumentPageLoad && Y.emit && BJ.WINDOW.location) {
            let R = {
              name: BJ.WINDOW.location.pathname,
              startTimestamp: dF.browserPerformanceTimeOrigin ? dF.browserPerformanceTimeOrigin / 1000 : void 0,
              origin: "auto.pageload.browser",
              attributes: {
                [qQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
              }
            };
            MZA(Y, R)
          }
          if (Q.instrumentNavigation && Y.emit && BJ.WINDOW.location) dF.addHistoryInstrumentationHandler(({
            to: R,
            from: T
          }) => {
            if (T === void 0 && O && O.indexOf(R) !== -1) {
              O = void 0;
              return
            }
            if (T !== R) {
              O = void 0;
              let L = {
                name: BJ.WINDOW.location.pathname,
                origin: "auto.navigation.browser",
                attributes: {
                  [qQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
                }
              };
              LZA(Y, L)
            }
          });
          if (J) bQ9.registerBackgroundTabDetection();
          if (K.enableInteractions) mQ9(Q, Z);
          if (Q.enableInp) uQ9(G, Z);
          $ZA.instrumentOutgoingRequests({
            traceFetch: F,
            traceXHR: X,
            tracePropagationTargets: N,
            shouldCreateSpanForRequest: V,
            enableHTTPTimings: C
          })
        },
        options: Q
      }
    };

  function MZA(A, B) {
    if (!A.emit) return;
    A.emit("startPageLoadSpan", B);
    let Q = qQ.getActiveSpan();
    return (Q && qQ.spanToJSON(Q).op) === "pageload" ? Q : void 0
  }

  function LZA(A, B) {
    if (!A.emit) return;
    A.emit("startNavigationSpan", B);
    let Q = qQ.getActiveSpan();
    return (Q && qQ.spanToJSON(Q).op) === "navigation" ? Q : void 0
  }

  function e$1(A) {
    let B = dF.getDomElement(`meta[name=${A}]`);
    return B ? B.getAttribute("content") : void 0
  }

  function mQ9(A, B) {
    let Q, I = () => {
      let {
        idleTimeout: G,
        finalTimeout: Z,
        heartbeatInterval: D
      } = A, Y = "ui.action.click", W = qQ.getActiveTransaction();
      if (W && W.op && ["navigation", "pageload"].includes(W.op)) {
        ZM.DEBUG_BUILD && dF.logger.warn("[Tracing] Did not create ui.action.click transaction because a pageload or navigation transaction is in progress.");
        return
      }
      if (Q) Q.setFinishReason("interactionInterrupted"), Q.end(), Q = void 0;
      if (!B.name) {
        ZM.DEBUG_BUILD && dF.logger.warn("[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing.");
        return
      }
      let {
        location: J
      } = BJ.WINDOW, F = {
        name: B.name,
        op: "ui.action.click",
        trimEnd: !0,
        data: {
          [qQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: B.context ? pQ9(B.context) : "url"
        }
      };
      Q = qQ.startIdleTransaction(qQ.getCurrentHub(), F, G, Z, !0, {
        location: J
      }, D)
    };
    ["click"].forEach((G) => {
      if (BJ.WINDOW.document) addEventListener(G, I, {
        once: !1,
        capture: !0
      })
    })
  }

  function dQ9(A) {
    return "duration" in A
  }
  var NZA = 10;

  function uQ9(A, B) {
    let Q = ({
      entries: I
    }) => {
      let G = qQ.getClient(),
        Z = G !== void 0 && G.getIntegrationByName !== void 0 ? G.getIntegrationByName("Replay") : void 0,
        D = Z !== void 0 ? Z.getReplayId() : void 0,
        Y = qQ.getActiveTransaction(),
        W = qQ.getCurrentScope(),
        J = W !== void 0 ? W.getUser() : void 0;
      I.forEach((F) => {
        if (dQ9(F)) {
          let X = F.interactionId;
          if (X === void 0) return;
          let V = A[X],
            C = F.duration,
            K = F.startTime,
            E = Object.keys(A),
            N = E.length > 0 ? E.reduce((q, O) => {
              return A[q].duration < A[O].duration ? q : O
            }) : void 0;
          if (F.entryType === "first-input") {
            if (E.map((O) => A[O]).some((O) => {
                return O.duration === C && O.startTime === K
              })) return
          }
          if (!X) return;
          if (V) V.duration = Math.max(V.duration, C);
          else if (E.length < NZA || N === void 0 || C > A[N].duration) {
            let {
              name: q,
              context: O
            } = B;
            if (q && O) {
              if (N && Object.keys(A).length >= NZA) delete A[N];
              A[X] = {
                routeName: q,
                duration: C,
                parentContext: O,
                user: J,
                activeTransaction: Y,
                replayId: D,
                startTime: K
              }
            }
          }
        }
      })
    };
    UZA.addPerformanceInstrumentationHandler("event", Q), UZA.addPerformanceInstrumentationHandler("first-input", Q)
  }

  function pQ9(A) {
    let B = A.attributes && A.attributes[qQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
      Q = A.data && A.data[qQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE],
      I = A.metadata && A.metadata.source;
    return B || Q || I
  }
  RZA.BROWSER_TRACING_INTEGRATION_ID = qZA;
  RZA.browserTracingIntegration = hQ9;
  RZA.getMetaContent = e$1;
  RZA.startBrowserTracingNavigationSpan = LZA;
  RZA.startBrowserTracingPageLoadSpan = MZA
})
// @from(Start 299091, End 300158)
SZA = z((PZA, Wl) => {
  Object.defineProperty(PZA, "__esModule", {
    value: !0
  });
  var TZA = z4(),
    Px = rA();

  function sQ9() {
    let A = TZA.getMainCarrier();
    if (!A.__SENTRY__) return;
    let B = {
        mongodb() {
          return new(Px.dynamicRequire(Wl, "./node/integrations/mongo")).Mongo
        },
        mongoose() {
          return new(Px.dynamicRequire(Wl, "./node/integrations/mongo")).Mongo
        },
        mysql() {
          return new(Px.dynamicRequire(Wl, "./node/integrations/mysql")).Mysql
        },
        pg() {
          return new(Px.dynamicRequire(Wl, "./node/integrations/postgres")).Postgres
        }
      },
      Q = Object.keys(B).filter((I) => !!Px.loadModule(I)).map((I) => {
        try {
          return B[I]()
        } catch (G) {
          return
        }
      }).filter((I) => I);
    if (Q.length > 0) A.__SENTRY__.integrations = [...A.__SENTRY__.integrations || [], ...Q]
  }

  function rQ9() {
    if (TZA.addTracingExtensions(), Px.isNodeEnv()) sQ9()
  }
  PZA.addExtensionMethods = rQ9
})
// @from(Start 300164, End 302327)
Bq1 = z((xZA) => {
  Object.defineProperty(xZA, "__esModule", {
    value: !0
  });
  var yU = z4(),
    _ZA = rA(),
    tQ9 = mIA(),
    eQ9 = uIA(),
    A79 = cIA(),
    B79 = nIA(),
    Q79 = rIA(),
    I79 = eIA(),
    G79 = QGA(),
    Z79 = GGA(),
    jZA = EZA(),
    Aq1 = OZA(),
    yZA = L41(),
    R41 = Tx(),
    kZA = r$1(),
    D79 = SZA();
  xZA.IdleTransaction = yU.IdleTransaction;
  xZA.Span = yU.Span;
  xZA.SpanStatus = yU.SpanStatus;
  xZA.Transaction = yU.Transaction;
  xZA.extractTraceparentData = yU.extractTraceparentData;
  xZA.getActiveTransaction = yU.getActiveTransaction;
  xZA.hasTracingEnabled = yU.hasTracingEnabled;
  xZA.spanStatusfromHttpCode = yU.spanStatusfromHttpCode;
  xZA.startIdleTransaction = yU.startIdleTransaction;
  xZA.TRACEPARENT_REGEXP = _ZA.TRACEPARENT_REGEXP;
  xZA.stripUrlQueryAndFragment = _ZA.stripUrlQueryAndFragment;
  xZA.Express = tQ9.Express;
  xZA.Postgres = eQ9.Postgres;
  xZA.Mysql = A79.Mysql;
  xZA.Mongo = B79.Mongo;
  xZA.Prisma = Q79.Prisma;
  xZA.GraphQL = I79.GraphQL;
  xZA.Apollo = G79.Apollo;
  xZA.lazyLoadedNodePerformanceMonitoringIntegrations = Z79.lazyLoadedNodePerformanceMonitoringIntegrations;
  xZA.BROWSER_TRACING_INTEGRATION_ID = jZA.BROWSER_TRACING_INTEGRATION_ID;
  xZA.BrowserTracing = jZA.BrowserTracing;
  xZA.browserTracingIntegration = Aq1.browserTracingIntegration;
  xZA.startBrowserTracingNavigationSpan = Aq1.startBrowserTracingNavigationSpan;
  xZA.startBrowserTracingPageLoadSpan = Aq1.startBrowserTracingPageLoadSpan;
  xZA.defaultRequestInstrumentationOptions = yZA.defaultRequestInstrumentationOptions;
  xZA.instrumentOutgoingRequests = yZA.instrumentOutgoingRequests;
  xZA.addClsInstrumentationHandler = R41.addClsInstrumentationHandler;
  xZA.addFidInstrumentationHandler = R41.addFidInstrumentationHandler;
  xZA.addLcpInstrumentationHandler = R41.addLcpInstrumentationHandler;
  xZA.addPerformanceInstrumentationHandler = R41.addPerformanceInstrumentationHandler;
  xZA.addTracingHeadersToFetchRequest = kZA.addTracingHeadersToFetchRequest;
  xZA.instrumentFetchRequest = kZA.instrumentFetchRequest;
  xZA.addExtensionMethods = D79.addExtensionMethods
})
// @from(Start 302333, End 302882)
vZA = z((fZA) => {
  Object.defineProperty(fZA, "__esModule", {
    value: !0
  });
  var m79 = Bq1(),
    d79 = rA();

  function u79() {
    let A = m79.lazyLoadedNodePerformanceMonitoringIntegrations.map((B) => {
      try {
        return B()
      } catch (Q) {
        return
      }
    }).filter((B) => !!B);
    if (A.length === 0) d79.logger.warn("Performance monitoring integrations could not be automatically loaded.");
    return A.filter((B) => !!B.loadDependency())
  }
  fZA.autoDiscoverNodePerformanceMonitoringIntegrations = u79
})
// @from(Start 302888, End 303538)
Qq1 = z((hZA) => {
  Object.defineProperty(hZA, "__esModule", {
    value: !0
  });
  var c79 = Z1("os"),
    l79 = Z1("util"),
    bZA = z4();
  class gZA extends bZA.ServerRuntimeClient {
    constructor(A) {
      bZA.applySdkMetadata(A, "node"), A.transportOptions = {
        textEncoder: new l79.TextEncoder,
        ...A.transportOptions
      };
      let B = {
        ...A,
        platform: "node",
        runtime: {
          name: "node",
          version: global.process.version
        },
        serverName: A.serverName || global.process.env.SENTRY_NAME || c79.hostname()
      };
      super(B)
    }
  }
  hZA.NodeClient = gZA
})
// @from(Start 303544, End 305189)
cZA = z((pZA) => {
  var {
    _nullishCoalesce: mZA
  } = rA();
  Object.defineProperty(pZA, "__esModule", {
    value: !0
  });
  var dZA = Z1("http");
  Z1("https");
  var eH = Symbol("AgentBaseInternalState");
  class uZA extends dZA.Agent {
    constructor(A) {
      super(A);
      this[eH] = {}
    }
    isSecureEndpoint(A) {
      if (A) {
        if (typeof A.secureEndpoint === "boolean") return A.secureEndpoint;
        if (typeof A.protocol === "string") return A.protocol === "https:"
      }
      let {
        stack: B
      } = new Error;
      if (typeof B !== "string") return !1;
      return B.split(`
`).some((Q) => Q.indexOf("(https.js:") !== -1 || Q.indexOf("node:https:") !== -1)
    }
    createSocket(A, B, Q) {
      let I = {
        ...B,
        secureEndpoint: this.isSecureEndpoint(B)
      };
      Promise.resolve().then(() => this.connect(A, I)).then((G) => {
        if (G instanceof dZA.Agent) return G.addRequest(A, I);
        this[eH].currentSocket = G, super.createSocket(A, B, Q)
      }, Q)
    }
    createConnection() {
      let A = this[eH].currentSocket;
      if (this[eH].currentSocket = void 0, !A) throw new Error("No socket was returned in the `connect()` function");
      return A
    }
    get defaultPort() {
      return mZA(this[eH].defaultPort, () => this.protocol === "https:" ? 443 : 80)
    }
    set defaultPort(A) {
      if (this[eH]) this[eH].defaultPort = A
    }
    get protocol() {
      return mZA(this[eH].protocol, () => this.isSecureEndpoint() ? "https:" : "http:")
    }
    set protocol(A) {
      if (this[eH]) this[eH].protocol = A
    }
  }
  pZA.Agent = uZA
})
// @from(Start 305195, End 307216)
iZA = z((lZA) => {
  Object.defineProperty(lZA, "__esModule", {
    value: !0
  });
  var a79 = rA();

  function O41(...A) {
    a79.logger.log("[https-proxy-agent:parse-proxy-response]", ...A)
  }

  function s79(A) {
    return new Promise((B, Q) => {
      let I = 0,
        G = [];

      function Z() {
        let F = A.read();
        if (F) J(F);
        else A.once("readable", Z)
      }

      function D() {
        A.removeListener("end", Y), A.removeListener("error", W), A.removeListener("readable", Z)
      }

      function Y() {
        D(), O41("onend"), Q(new Error("Proxy connection ended before receiving CONNECT response"))
      }

      function W(F) {
        D(), O41("onerror %o", F), Q(F)
      }

      function J(F) {
        G.push(F), I += F.length;
        let X = Buffer.concat(G, I),
          V = X.indexOf(`\r
\r
`);
        if (V === -1) {
          O41("have not received end of HTTP headers yet..."), Z();
          return
        }
        let C = X.slice(0, V).toString("ascii").split(`\r
`),
          K = C.shift();
        if (!K) return A.destroy(), Q(new Error("No header received from proxy CONNECT response"));
        let E = K.split(" "),
          N = +E[1],
          q = E.slice(2).join(" "),
          O = {};
        for (let R of C) {
          if (!R) continue;
          let T = R.indexOf(":");
          if (T === -1) return A.destroy(), Q(new Error(`Invalid header from proxy CONNECT response: "${R}"`));
          let L = R.slice(0, T).toLowerCase(),
            _ = R.slice(T + 1).trimStart(),
            k = O[L];
          if (typeof k === "string") O[L] = [k, _];
          else if (Array.isArray(k)) k.push(_);
          else O[L] = _
        }
        O41("got proxy server response: %o %o", K, O), D(), B({
          connect: {
            statusCode: N,
            statusText: q,
            headers: O
          },
          buffered: X
        })
      }
      A.on("error", W), A.on("end", Y), Z()
    })
  }
  lZA.parseProxyResponse = s79
})
// @from(Start 307222, End 310474)
rZA = z((sZA) => {
  var {
    _nullishCoalesce: o79,
    _optionalChain: t79
  } = rA();
  Object.defineProperty(sZA, "__esModule", {
    value: !0
  });
  var Jl = Z1("net"),
    nZA = Z1("tls"),
    e79 = Z1("url"),
    AI9 = rA(),
    BI9 = cZA(),
    QI9 = iZA();

  function Fl(...A) {
    AI9.logger.log("[https-proxy-agent]", ...A)
  }
  class Iq1 extends BI9.Agent {
    static __initStatic() {
      this.protocols = ["http", "https"]
    }
    constructor(A, B) {
      super(B);
      this.options = {}, this.proxy = typeof A === "string" ? new e79.URL(A) : A, this.proxyHeaders = o79(t79([B, "optionalAccess", (G) => G.headers]), () => ({})), Fl("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
      let Q = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""),
        I = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
      this.connectOpts = {
        ALPNProtocols: ["http/1.1"],
        ...B ? aZA(B, "headers") : null,
        host: Q,
        port: I
      }
    }
    async connect(A, B) {
      let {
        proxy: Q
      } = this;
      if (!B.host) throw new TypeError('No "host" provided');
      let I;
      if (Q.protocol === "https:") {
        Fl("Creating `tls.Socket`: %o", this.connectOpts);
        let X = this.connectOpts.servername || this.connectOpts.host;
        I = nZA.connect({
          ...this.connectOpts,
          servername: X && Jl.isIP(X) ? void 0 : X
        })
      } else Fl("Creating `net.Socket`: %o", this.connectOpts), I = Jl.connect(this.connectOpts);
      let G = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : {
          ...this.proxyHeaders
        },
        Z = Jl.isIPv6(B.host) ? `[${B.host}]` : B.host,
        D = `CONNECT ${Z}:${B.port} HTTP/1.1\r
`;
      if (Q.username || Q.password) {
        let X = `${decodeURIComponent(Q.username)}:${decodeURIComponent(Q.password)}`;
        G["Proxy-Authorization"] = `Basic ${Buffer.from(X).toString("base64")}`
      }
      if (G.Host = `${Z}:${B.port}`, !G["Proxy-Connection"]) G["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
      for (let X of Object.keys(G)) D += `${X}: ${G[X]}\r
`;
      let Y = QI9.parseProxyResponse(I);
      I.write(`${D}\r
`);
      let {
        connect: W,
        buffered: J
      } = await Y;
      if (A.emit("proxyConnect", W), this.emit("proxyConnect", W, A), W.statusCode === 200) {
        if (A.once("socket", II9), B.secureEndpoint) {
          Fl("Upgrading socket connection to TLS");
          let X = B.servername || B.host;
          return nZA.connect({
            ...aZA(B, "host", "path", "port"),
            socket: I,
            servername: Jl.isIP(X) ? void 0 : X
          })
        }
        return I
      }
      I.destroy();
      let F = new Jl.Socket({
        writable: !1
      });
      return F.readable = !0, A.once("socket", (X) => {
        Fl("Replaying proxy buffer for failed request"), X.push(J), X.push(null)
      }), F
    }
  }
  Iq1.__initStatic();

  function II9(A) {
    A.resume()
  }

  function aZA(A, ...B) {
    let Q = {},
      I;
    for (I in A)
      if (!B.includes(I)) Q[I] = A[I];
    return Q
  }
  sZA.HttpsProxyAgent = Iq1
})
// @from(Start 310480, End 313011)
Zq1 = z((eZA) => {
  var {
    _nullishCoalesce: Gq1
  } = rA();
  Object.defineProperty(eZA, "__esModule", {
    value: !0
  });
  var ZI9 = Z1("http"),
    DI9 = Z1("https"),
    YI9 = Z1("stream"),
    tZA = Z1("url"),
    WI9 = Z1("zlib"),
    oZA = z4(),
    JI9 = rA(),
    FI9 = rZA(),
    XI9 = 32768;

  function VI9(A) {
    return new YI9.Readable({
      read() {
        this.push(A), this.push(null)
      }
    })
  }

  function CI9(A) {
    let B;
    try {
      B = new tZA.URL(A.url)
    } catch (W) {
      return JI9.consoleSandbox(() => {
        console.warn("[@sentry/node]: Invalid dsn or tunnel option, will not send any events. The tunnel option must be a full URL when used.")
      }), oZA.createTransport(A, () => Promise.resolve({}))
    }
    let Q = B.protocol === "https:",
      I = KI9(B, A.proxy || (Q ? process.env.https_proxy : void 0) || process.env.http_proxy),
      G = Q ? DI9 : ZI9,
      Z = A.keepAlive === void 0 ? !1 : A.keepAlive,
      D = I ? new FI9.HttpsProxyAgent(I) : new G.Agent({
        keepAlive: Z,
        maxSockets: 30,
        timeout: 2000
      }),
      Y = HI9(A, Gq1(A.httpModule, () => G), D);
    return oZA.createTransport(A, Y)
  }

  function KI9(A, B) {
    let {
      no_proxy: Q
    } = process.env;
    if (Q && Q.split(",").some((G) => A.host.endsWith(G) || A.hostname.endsWith(G))) return;
    else return B
  }

  function HI9(A, B, Q) {
    let {
      hostname: I,
      pathname: G,
      port: Z,
      protocol: D,
      search: Y
    } = new tZA.URL(A.url);
    return function W(J) {
      return new Promise((F, X) => {
        let V = VI9(J.body),
          C = {
            ...A.headers
          };
        if (J.body.length > XI9) C["content-encoding"] = "gzip", V = V.pipe(WI9.createGzip());
        let K = B.request({
          method: "POST",
          agent: Q,
          headers: C,
          hostname: I,
          path: `${G}${Y}`,
          port: Z,
          protocol: D,
          ca: A.caCerts
        }, (E) => {
          E.on("data", () => {}), E.on("end", () => {}), E.setEncoding("utf8");
          let N = Gq1(E.headers["retry-after"], () => null),
            q = Gq1(E.headers["x-sentry-rate-limits"], () => null);
          F({
            statusCode: E.statusCode,
            headers: {
              "retry-after": N,
              "x-sentry-rate-limits": Array.isArray(q) ? q[0] : q
            }
          })
        });
        K.on("error", X), V.pipe(K)
      })
    }
  }
  eZA.makeNodeTransport = CI9
})
// @from(Start 313017, End 313195)
fP = z((ADA) => {
  Object.defineProperty(ADA, "__esModule", {
    value: !0
  });
  var wI9 = rA(),
    EI9 = wI9.parseSemver(process.versions.node);
  ADA.NODE_VERSION = EI9
})
// @from(Start 313201, End 314104)
GDA = z((IDA) => {
  var {
    _optionalChain: NI9
  } = rA();
  Object.defineProperty(IDA, "__esModule", {
    value: !0
  });
  var BDA = Z1("domain"),
    vP = z4();

  function QDA() {
    return BDA.active
  }

  function $I9() {
    let A = QDA();
    if (!A) return;
    return vP.ensureHubOnCarrier(A), vP.getHubFromCarrier(A)
  }

  function qI9(A) {
    let B = {};
    return vP.ensureHubOnCarrier(B, A), vP.getHubFromCarrier(B)
  }

  function MI9(A, B) {
    let Q = QDA();
    if (Q && NI9([B, "optionalAccess", (D) => D.reuseExisting])) return A();
    let I = BDA.create(),
      G = Q ? vP.getHubFromCarrier(Q) : void 0,
      Z = qI9(G);
    return vP.setHubOnCarrier(I, Z), I.bind(() => {
      return A()
    })()
  }

  function LI9() {
    vP.setAsyncContextStrategy({
      getCurrentHub: $I9,
      runWithAsyncContext: MI9
    })
  }
  IDA.setDomainAsyncContextStrategy = LI9
})
// @from(Start 314110, End 314877)
DDA = z((ZDA) => {
  var {
    _optionalChain: OI9
  } = rA();
  Object.defineProperty(ZDA, "__esModule", {
    value: !0
  });
  var Dq1 = z4(),
    TI9 = Z1("async_hooks"),
    T41;

  function PI9() {
    if (!T41) T41 = new TI9.AsyncLocalStorage;

    function A() {
      return T41.getStore()
    }

    function B(I) {
      let G = {};
      return Dq1.ensureHubOnCarrier(G, I), Dq1.getHubFromCarrier(G)
    }

    function Q(I, G) {
      let Z = A();
      if (Z && OI9([G, "optionalAccess", (Y) => Y.reuseExisting])) return I();
      let D = B(Z);
      return T41.run(D, () => {
        return I()
      })
    }
    Dq1.setAsyncContextStrategy({
      getCurrentHub: A,
      runWithAsyncContext: Q
    })
  }
  ZDA.setHooksAsyncContextStrategy = PI9
})
// @from(Start 314883, End 315204)
WDA = z((YDA) => {
  Object.defineProperty(YDA, "__esModule", {
    value: !0
  });
  var _I9 = fP(),
    jI9 = GDA(),
    yI9 = DDA();

  function kI9() {
    if (_I9.NODE_VERSION.major >= 14) yI9.setHooksAsyncContextStrategy();
    else jI9.setDomainAsyncContextStrategy()
  }
  YDA.setNodeAsyncContextStrategy = kI9
})
// @from(Start 315210, End 316061)
S41 = z((VDA) => {
  Object.defineProperty(VDA, "__esModule", {
    value: !0
  });
  var fI9 = Z1("util"),
    P41 = z4(),
    JDA = rA(),
    FDA = "Console",
    vI9 = () => {
      return {
        name: FDA,
        setupOnce() {},
        setup(A) {
          JDA.addConsoleInstrumentationHandler(({
            args: B,
            level: Q
          }) => {
            if (P41.getClient() !== A) return;
            P41.addBreadcrumb({
              category: "console",
              level: JDA.severityLevelFromString(Q),
              message: fI9.format.apply(void 0, B)
            }, {
              input: [...B],
              level: Q
            })
          })
        }
      }
    },
    XDA = P41.defineIntegration(vI9),
    bI9 = P41.convertIntegrationFnToClass(FDA, XDA);
  VDA.Console = bI9;
  VDA.consoleIntegration = XDA
})
// @from(Start 316067, End 323929)
_41 = z((qDA) => {
  var {
    _optionalChain: bP
  } = rA();
  Object.defineProperty(qDA, "__esModule", {
    value: !0
  });
  var mI9 = Z1("child_process"),
    KDA = Z1("fs"),
    uF = Z1("os"),
    dI9 = Z1("path"),
    HDA = Z1("util"),
    zDA = z4(),
    wDA = HDA.promisify(KDA.readFile),
    EDA = HDA.promisify(KDA.readdir),
    UDA = "Context",
    uI9 = (A = {}) => {
      let B, Q = {
        app: !0,
        os: !0,
        device: !0,
        culture: !0,
        cloudResource: !0,
        ...A
      };
      async function I(Z) {
        if (B === void 0) B = G();
        let D = cI9(await B);
        return Z.contexts = {
          ...Z.contexts,
          app: {
            ...D.app,
            ...bP([Z, "access", (Y) => Y.contexts, "optionalAccess", (Y) => Y.app])
          },
          os: {
            ...D.os,
            ...bP([Z, "access", (Y) => Y.contexts, "optionalAccess", (Y) => Y.os])
          },
          device: {
            ...D.device,
            ...bP([Z, "access", (Y) => Y.contexts, "optionalAccess", (Y) => Y.device])
          },
          culture: {
            ...D.culture,
            ...bP([Z, "access", (Y) => Y.contexts, "optionalAccess", (Y) => Y.culture])
          },
          cloud_resource: {
            ...D.cloud_resource,
            ...bP([Z, "access", (Y) => Y.contexts, "optionalAccess", (Y) => Y.cloud_resource])
          }
        }, Z
      }
      async function G() {
        let Z = {};
        if (Q.os) Z.os = await lI9();
        if (Q.app) Z.app = nI9();
        if (Q.device) Z.device = $DA(Q.device);
        if (Q.culture) {
          let D = iI9();
          if (D) Z.culture = D
        }
        if (Q.cloudResource) Z.cloud_resource = eI9();
        return Z
      }
      return {
        name: UDA,
        setupOnce() {},
        processEvent(Z) {
          return I(Z)
        }
      }
    },
    NDA = zDA.defineIntegration(uI9),
    pI9 = zDA.convertIntegrationFnToClass(UDA, NDA);

  function cI9(A) {
    if (bP([A, "optionalAccess", (B) => B.app, "optionalAccess", (B) => B.app_memory])) A.app.app_memory = process.memoryUsage().rss;
    if (bP([A, "optionalAccess", (B) => B.device, "optionalAccess", (B) => B.free_memory])) A.device.free_memory = uF.freemem();
    return A
  }
  async function lI9() {
    let A = uF.platform();
    switch (A) {
      case "darwin":
        return oI9();
      case "linux":
        return tI9();
      default:
        return {
          name: aI9[A] || A, version: uF.release()
        }
    }
  }

  function iI9() {
    try {
      if (typeof process.versions.icu !== "string") return;
      let A = new Date(900000000);
      if (new Intl.DateTimeFormat("es", {
          month: "long"
        }).format(A) === "enero") {
        let Q = Intl.DateTimeFormat().resolvedOptions();
        return {
          locale: Q.locale,
          timezone: Q.timeZone
        }
      }
    } catch (A) {}
    return
  }

  function nI9() {
    let A = process.memoryUsage().rss;
    return {
      app_start_time: new Date(Date.now() - process.uptime() * 1000).toISOString(),
      app_memory: A
    }
  }

  function $DA(A) {
    let B = {},
      Q;
    try {
      Q = uF.uptime && uF.uptime()
    } catch (I) {}
    if (typeof Q === "number") B.boot_time = new Date(Date.now() - Q * 1000).toISOString();
    if (B.arch = uF.arch(), A === !0 || A.memory) B.memory_size = uF.totalmem(), B.free_memory = uF.freemem();
    if (A === !0 || A.cpu) {
      let I = uF.cpus();
      if (I && I.length) {
        let G = I[0];
        B.processor_count = I.length, B.cpu_description = G.model, B.processor_frequency = G.speed
      }
    }
    return B
  }
  var aI9 = {
      aix: "IBM AIX",
      freebsd: "FreeBSD",
      openbsd: "OpenBSD",
      sunos: "SunOS",
      win32: "Windows"
    },
    sI9 = [{
      name: "fedora-release",
      distros: ["Fedora"]
    }, {
      name: "redhat-release",
      distros: ["Red Hat Linux", "Centos"]
    }, {
      name: "redhat_version",
      distros: ["Red Hat Linux"]
    }, {
      name: "SuSE-release",
      distros: ["SUSE Linux"]
    }, {
      name: "lsb-release",
      distros: ["Ubuntu Linux", "Arch Linux"]
    }, {
      name: "debian_version",
      distros: ["Debian"]
    }, {
      name: "debian_release",
      distros: ["Debian"]
    }, {
      name: "arch-release",
      distros: ["Arch Linux"]
    }, {
      name: "gentoo-release",
      distros: ["Gentoo Linux"]
    }, {
      name: "novell-release",
      distros: ["SUSE Linux"]
    }, {
      name: "alpine-release",
      distros: ["Alpine Linux"]
    }],
    rI9 = {
      alpine: (A) => A,
      arch: (A) => Az(/distrib_release=(.*)/, A),
      centos: (A) => Az(/release ([^ ]+)/, A),
      debian: (A) => A,
      fedora: (A) => Az(/release (..)/, A),
      mint: (A) => Az(/distrib_release=(.*)/, A),
      red: (A) => Az(/release ([^ ]+)/, A),
      suse: (A) => Az(/VERSION = (.*)\n/, A),
      ubuntu: (A) => Az(/distrib_release=(.*)/, A)
    };

  function Az(A, B) {
    let Q = A.exec(B);
    return Q ? Q[1] : void 0
  }
  async function oI9() {
    let A = {
      kernel_version: uF.release(),
      name: "Mac OS X",
      version: `10.${Number(uF.release().split(".")[0])-4}`
    };
    try {
      let B = await new Promise((Q, I) => {
        mI9.execFile("/usr/bin/sw_vers", (G, Z) => {
          if (G) {
            I(G);
            return
          }
          Q(Z)
        })
      });
      A.name = Az(/^ProductName:\s+(.*)$/m, B), A.version = Az(/^ProductVersion:\s+(.*)$/m, B), A.build = Az(/^BuildVersion:\s+(.*)$/m, B)
    } catch (B) {}
    return A
  }

  function CDA(A) {
    return A.split(" ")[0].toLowerCase()
  }
  async function tI9() {
    let A = {
      kernel_version: uF.release(),
      name: "Linux"
    };
    try {
      let B = await EDA("/etc"),
        Q = sI9.find((Y) => B.includes(Y.name));
      if (!Q) return A;
      let I = dI9.join("/etc", Q.name),
        G = (await wDA(I, {
          encoding: "utf-8"
        })).toLowerCase(),
        {
          distros: Z
        } = Q;
      A.name = Z.find((Y) => G.indexOf(CDA(Y)) >= 0) || Z[0];
      let D = CDA(A.name);
      A.version = rI9[D](G)
    } catch (B) {}
    return A
  }

  function eI9() {
    if (process.env.VERCEL) return {
      "cloud.provider": "vercel",
      "cloud.region": process.env.VERCEL_REGION
    };
    else if (process.env.AWS_REGION) return {
      "cloud.provider": "aws",
      "cloud.region": process.env.AWS_REGION,
      "cloud.platform": process.env.AWS_EXECUTION_ENV
    };
    else if (process.env.GCP_PROJECT) return {
      "cloud.provider": "gcp"
    };
    else if (process.env.ALIYUN_REGION_ID) return {
      "cloud.provider": "alibaba_cloud",
      "cloud.region": process.env.ALIYUN_REGION_ID
    };
    else if (process.env.WEBSITE_SITE_NAME && process.env.REGION_NAME) return {
      "cloud.provider": "azure",
      "cloud.region": process.env.REGION_NAME
    };
    else if (process.env.IBM_CLOUD_REGION) return {
      "cloud.provider": "ibm_cloud",
      "cloud.region": process.env.IBM_CLOUD_REGION
    };
    else if (process.env.TENCENTCLOUD_REGION) return {
      "cloud.provider": "tencent_cloud",
      "cloud.region": process.env.TENCENTCLOUD_REGION,
      "cloud.account.id": process.env.TENCENTCLOUD_APPID,
      "cloud.availability_zone": process.env.TENCENTCLOUD_ZONE
    };
    else if (process.env.NETLIFY) return {
      "cloud.provider": "netlify"
    };
    else if (process.env.FLY_REGION) return {
      "cloud.provider": "fly.io",
      "cloud.region": process.env.FLY_REGION
    };
    else if (process.env.DYNO) return {
      "cloud.provider": "heroku"
    };
    else return
  }
  qDA.Context = pI9;
  qDA.getDeviceContext = $DA;
  qDA.nodeContextIntegration = NDA;
  qDA.readDirAsync = EDA;
  qDA.readFileAsync = wDA
})
// @from(Start 323935, End 326012)
y41 = z((TDA) => {
  var {
    _optionalChain: Yq1
  } = rA();
  Object.defineProperty(TDA, "__esModule", {
    value: !0
  });
  var ZG9 = Z1("fs"),
    MDA = z4(),
    LDA = rA(),
    j41 = new LDA.LRUMap(100),
    DG9 = 7,
    RDA = "ContextLines";

  function YG9(A) {
    return new Promise((B, Q) => {
      ZG9.readFile(A, "utf8", (I, G) => {
        if (I) Q(I);
        else B(G)
      })
    })
  }
  var WG9 = (A = {}) => {
      let B = A.frameContextLines !== void 0 ? A.frameContextLines : DG9;
      return {
        name: RDA,
        setupOnce() {},
        processEvent(Q) {
          return FG9(Q, B)
        }
      }
    },
    ODA = MDA.defineIntegration(WG9),
    JG9 = MDA.convertIntegrationFnToClass(RDA, ODA);
  async function FG9(A, B) {
    let Q = {},
      I = [];
    if (B > 0 && Yq1([A, "access", (G) => G.exception, "optionalAccess", (G) => G.values]))
      for (let G of A.exception.values) {
        if (!Yq1([G, "access", (Z) => Z.stacktrace, "optionalAccess", (Z) => Z.frames])) continue;
        for (let Z = G.stacktrace.frames.length - 1; Z >= 0; Z--) {
          let D = G.stacktrace.frames[Z];
          if (D.filename && !Q[D.filename] && !j41.get(D.filename)) I.push(VG9(D.filename)), Q[D.filename] = 1
        }
      }
    if (I.length > 0) await Promise.all(I);
    if (B > 0 && Yq1([A, "access", (G) => G.exception, "optionalAccess", (G) => G.values])) {
      for (let G of A.exception.values)
        if (G.stacktrace && G.stacktrace.frames) await XG9(G.stacktrace.frames, B)
    }
    return A
  }

  function XG9(A, B) {
    for (let Q of A)
      if (Q.filename && Q.context_line === void 0) {
        let I = j41.get(Q.filename);
        if (I) try {
          LDA.addContextToFrame(I, Q, B)
        } catch (G) {}
      }
  }
  async function VG9(A) {
    let B = j41.get(A);
    if (B === null) return null;
    if (B !== void 0) return B;
    let Q = null;
    try {
      Q = (await YG9(A)).split(`
`)
    } catch (I) {}
    return j41.set(A, Q), Q
  }
  TDA.ContextLines = JG9;
  TDA.contextLinesIntegration = ODA
})
// @from(Start 326018, End 326200)
Xl = z((PDA) => {
  Object.defineProperty(PDA, "__esModule", {
    value: !0
  });
  var HG9 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
  PDA.DEBUG_BUILD = HG9
})
// @from(Start 326206, End 329175)
yDA = z((jDA) => {
  var {
    _optionalChain: Bz
  } = rA();
  Object.defineProperty(jDA, "__esModule", {
    value: !0
  });
  var Wq1 = Z1("url"),
    wG9 = fP();

  function EG9(A) {
    let {
      protocol: B,
      hostname: Q,
      port: I
    } = _DA(A), G = A.path ? A.path : "/";
    return `${B}//${Q}${I}${G}`
  }

  function SDA(A) {
    let {
      protocol: B,
      hostname: Q,
      port: I
    } = _DA(A), G = A.pathname || "/", Z = A.auth ? UG9(A.auth) : "";
    return `${B}//${Z}${Q}${I}${G}`
  }

  function UG9(A) {
    let [B, Q] = A.split(":");
    return `${B?"[Filtered]":""}:${Q?"[Filtered]":""}@`
  }

  function NG9(A, B, Q) {
    if (!A) return A;
    let [I, G] = A.split(" ");
    if (B.host && !B.protocol) B.protocol = Bz([Q, "optionalAccess", (Z) => Z.agent, "optionalAccess", (Z) => Z.protocol]), G = SDA(B);
    if (Bz([G, "optionalAccess", (Z) => Z.startsWith, "call", (Z) => Z("///")])) G = G.slice(2);
    return `${I} ${G}`
  }

  function Jq1(A) {
    let B = {
      protocol: A.protocol,
      hostname: typeof A.hostname === "string" && A.hostname.startsWith("[") ? A.hostname.slice(1, -1) : A.hostname,
      hash: A.hash,
      search: A.search,
      pathname: A.pathname,
      path: `${A.pathname||""}${A.search||""}`,
      href: A.href
    };
    if (A.port !== "") B.port = Number(A.port);
    if (A.username || A.password) B.auth = `${A.username}:${A.password}`;
    return B
  }

  function $G9(A, B) {
    let Q, I;
    if (typeof B[B.length - 1] === "function") Q = B.pop();
    if (typeof B[0] === "string") I = Jq1(new Wq1.URL(B[0]));
    else if (B[0] instanceof Wq1.URL) I = Jq1(B[0]);
    else {
      I = B[0];
      try {
        let G = new Wq1.URL(I.path || "", `${I.protocol||"http:"}//${I.hostname}`);
        I = {
          pathname: G.pathname,
          search: G.search,
          hash: G.hash,
          ...I
        }
      } catch (G) {}
    }
    if (B.length === 2) I = {
      ...I,
      ...B[1]
    };
    if (I.protocol === void 0)
      if (wG9.NODE_VERSION.major > 8) I.protocol = Bz([Bz([A, "optionalAccess", (G) => G.globalAgent]), "optionalAccess", (G) => G.protocol]) || Bz([I.agent, "optionalAccess", (G) => G.protocol]) || Bz([I._defaultAgent, "optionalAccess", (G) => G.protocol]);
      else I.protocol = Bz([I.agent, "optionalAccess", (G) => G.protocol]) || Bz([I._defaultAgent, "optionalAccess", (G) => G.protocol]) || Bz([Bz([A, "optionalAccess", (G) => G.globalAgent]), "optionalAccess", (G) => G.protocol]);
    if (Q) return [I, Q];
    else return [I]
  }

  function _DA(A) {
    let B = A.protocol || "",
      Q = A.hostname || A.host || "",
      I = !A.port || A.port === 80 || A.port === 443 || /^(.*):(\d+)$/.test(Q) ? "" : `:${A.port}`;
    return {
      protocol: B,
      hostname: Q,
      port: I
    }
  }
  jDA.cleanSpanDescription = NG9;
  jDA.extractRawUrl = EG9;
  jDA.extractUrl = SDA;
  jDA.normalizeRequestArgs = $G9;
  jDA.urlToOptions = Jq1
})
// @from(Start 329181, End 335097)
k41 = z((vDA) => {
  var {
    _optionalChain: Sx
  } = rA();
  Object.defineProperty(vDA, "__esModule", {
    value: !0
  });
  var KZ = z4(),
    QJ = rA(),
    Fq1 = Xl(),
    TG9 = fP(),
    Vl = yDA(),
    PG9 = (A = {}) => {
      let {
        breadcrumbs: B,
        tracing: Q,
        shouldCreateSpanForRequest: I
      } = A, G = {
        breadcrumbs: B,
        tracing: Q === !1 ? !1 : QJ.dropUndefinedKeys({
          enableIfHasTracingEnabled: Q === !0 ? void 0 : !0,
          shouldCreateSpanForRequest: I
        })
      };
      return new gP(G)
    },
    SG9 = KZ.defineIntegration(PG9);
  class gP {
    static __initStatic() {
      this.id = "Http"
    }
    __init() {
      this.name = gP.id
    }
    constructor(A = {}) {
      gP.prototype.__init.call(this), this._breadcrumbs = typeof A.breadcrumbs === "undefined" ? !0 : A.breadcrumbs, this._tracing = !A.tracing ? void 0 : A.tracing === !0 ? {} : A.tracing
    }
    setupOnce(A, B) {
      let Q = Sx([B, "call", (W) => W(), "access", (W) => W.getClient, "call", (W) => W(), "optionalAccess", (W) => W.getOptions, "call", (W) => W()]),
        I = xDA(this._tracing, Q);
      if (!this._breadcrumbs && !I) return;
      if (Q && Q.instrumenter !== "sentry") {
        Fq1.DEBUG_BUILD && QJ.logger.log("HTTP Integration is skipped because of instrumenter configuration.");
        return
      }
      let G = fDA(I, this._tracing, Q),
        Z = Sx([Q, "optionalAccess", (W) => W.tracePropagationTargets]) || Sx([this, "access", (W) => W._tracing, "optionalAccess", (W) => W.tracePropagationTargets]),
        D = Z1("http"),
        Y = kDA(D, this._breadcrumbs, G, Z);
      if (QJ.fill(D, "get", Y), QJ.fill(D, "request", Y), TG9.NODE_VERSION.major > 8) {
        let W = Z1("https"),
          J = kDA(W, this._breadcrumbs, G, Z);
        QJ.fill(W, "get", J), QJ.fill(W, "request", J)
      }
    }
  }
  gP.__initStatic();

  function kDA(A, B, Q, I) {
    let G = new QJ.LRUMap(100),
      Z = new QJ.LRUMap(100),
      D = (J) => {
        if (Q === void 0) return !0;
        let F = G.get(J);
        if (F !== void 0) return F;
        let X = Q(J);
        return G.set(J, X), X
      },
      Y = (J) => {
        if (I === void 0) return !0;
        let F = Z.get(J);
        if (F !== void 0) return F;
        let X = QJ.stringMatchesSomePattern(J, I);
        return Z.set(J, X), X
      };

    function W(J, F, X, V) {
      if (!KZ.getCurrentHub().getIntegration(gP)) return;
      KZ.addBreadcrumb({
        category: "http",
        data: {
          status_code: V && V.statusCode,
          ...F
        },
        type: "http"
      }, {
        event: J,
        request: X,
        response: V
      })
    }
    return function J(F) {
      return function X(...V) {
        let C = Vl.normalizeRequestArgs(A, V),
          K = C[0],
          E = Vl.extractRawUrl(K),
          N = Vl.extractUrl(K),
          q = KZ.getClient();
        if (KZ.isSentryRequestUrl(N, q)) return F.apply(A, C);
        let O = KZ.getCurrentScope(),
          R = KZ.getIsolationScope(),
          T = KZ.getActiveSpan(),
          L = jG9(N, K),
          _ = D(E) ? Sx([T, "optionalAccess", (k) => k.startChild, "call", (k) => k({
            op: "http.client",
            origin: "auto.http.node.http",
            description: `${L["http.method"]} ${L.url}`,
            data: L
          })]) : void 0;
        if (q && Y(E)) {
          let {
            traceId: k,
            spanId: i,
            sampled: x,
            dsc: s
          } = {
            ...R.getPropagationContext(),
            ...O.getPropagationContext()
          }, d = _ ? KZ.spanToTraceHeader(_) : QJ.generateSentryTraceHeader(k, i, x), F1 = QJ.dynamicSamplingContextToSentryBaggageHeader(s || (_ ? KZ.getDynamicSamplingContextFromSpan(_) : KZ.getDynamicSamplingContextFromClient(k, q, O)));
          _G9(K, N, d, F1)
        } else Fq1.DEBUG_BUILD && QJ.logger.log(`[Tracing] Not adding sentry-trace header to outgoing request (${N}) due to mismatching tracePropagationTargets option.`);
        return F.apply(A, C).once("response", function(k) {
          let i = this;
          if (B) W("response", L, i, k);
          if (_) {
            if (k.statusCode) KZ.setHttpStatus(_, k.statusCode);
            _.updateName(Vl.cleanSpanDescription(KZ.spanToJSON(_).description || "", K, i) || ""), _.end()
          }
        }).once("error", function() {
          let k = this;
          if (B) W("error", L, k);
          if (_) KZ.setHttpStatus(_, 500), _.updateName(Vl.cleanSpanDescription(KZ.spanToJSON(_).description || "", K, k) || ""), _.end()
        })
      }
    }
  }

  function _G9(A, B, Q, I) {
    if ((A.headers || {})["sentry-trace"]) return;
    Fq1.DEBUG_BUILD && QJ.logger.log(`[Tracing] Adding sentry-trace header ${Q} to outgoing request to "${B}": `), A.headers = {
      ...A.headers,
      "sentry-trace": Q,
      ...I && I.length > 0 && {
        baggage: yG9(A, I)
      }
    }
  }

  function jG9(A, B) {
    let Q = B.method || "GET",
      I = {
        url: A,
        "http.method": Q
      };
    if (B.hash) I["http.fragment"] = B.hash.substring(1);
    if (B.search) I["http.query"] = B.search.substring(1);
    return I
  }

  function yG9(A, B) {
    if (!A.headers || !A.headers.baggage) return B;
    else if (!B) return A.headers.baggage;
    else if (Array.isArray(A.headers.baggage)) return [...A.headers.baggage, B];
    return [A.headers.baggage, B]
  }

  function xDA(A, B) {
    return A === void 0 ? !1 : A.enableIfHasTracingEnabled ? KZ.hasTracingEnabled(B) : !0
  }

  function fDA(A, B, Q) {
    return A ? Sx([B, "optionalAccess", (G) => G.shouldCreateSpanForRequest]) || Sx([Q, "optionalAccess", (G) => G.shouldCreateSpanForRequest]) : () => !1
  }
  vDA.Http = gP;
  vDA._getShouldCreateSpanForRequest = fDA;
  vDA._shouldCreateSpans = xDA;
  vDA.httpIntegration = SG9
})
// @from(Start 335103, End 336047)
hDA = z((gDA) => {
  Object.defineProperty(gDA, "__esModule", {
    value: !0
  });

  function bG9(A, B, Q) {
    let I = 0,
      G = 5,
      Z = 0;
    return setInterval(() => {
      if (Z === 0) {
        if (I > A) {
          if (G *= 2, Q(G), G > 86400) G = 86400;
          Z = G
        }
      } else if (Z -= 1, Z === 0) B();
      I = 0
    }, 1000).unref(), () => {
      I += 1
    }
  }

  function Xq1(A) {
    return A !== void 0 && (A.length === 0 || A === "?" || A === "<anonymous>")
  }

  function gG9(A, B) {
    return A === B || Xq1(A) && Xq1(B)
  }

  function bDA(A) {
    if (A === void 0) return;
    return A.slice(-10).reduce((B, Q) => `${B},${Q.function},${Q.lineno},${Q.colno}`, "")
  }

  function hG9(A, B) {
    if (B === void 0) return;
    return bDA(A(B, 1))
  }
  gDA.createRateLimiter = bG9;
  gDA.functionNamesMatch = gG9;
  gDA.hashFrames = bDA;
  gDA.hashFromStack = hG9;
  gDA.isAnonymous = Xq1
})
// @from(Start 336053, End 343384)
cDA = z((pDA) => {
  var {
    _optionalChain: h3
  } = rA();
  Object.defineProperty(pDA, "__esModule", {
    value: !0
  });
  var Vq1 = z4(),
    x41 = rA(),
    lG9 = fP(),
    f41 = hDA();

  function Cq1(A) {
    let B = [],
      Q = !1;

    function I(D) {
      if (B = [], Q) return;
      Q = !0, A(D)
    }
    B.push(I);

    function G(D) {
      B.push(D)
    }

    function Z(D) {
      let Y = B.pop() || I;
      try {
        Y(D)
      } catch (W) {
        I(D)
      }
    }
    return {
      add: G,
      next: Z
    }
  }
  class mDA {
    constructor() {
      let {
        Session: A
      } = Z1("inspector");
      this._session = new A
    }
    configureAndConnect(A, B) {
      this._session.connect(), this._session.on("Debugger.paused", (Q) => {
        A(Q, () => {
          this._session.post("Debugger.resume")
        })
      }), this._session.post("Debugger.enable"), this._session.post("Debugger.setPauseOnExceptions", {
        state: B ? "all" : "uncaught"
      })
    }
    setPauseOnExceptions(A) {
      this._session.post("Debugger.setPauseOnExceptions", {
        state: A ? "all" : "uncaught"
      })
    }
    getLocalVariables(A, B) {
      this._getProperties(A, (Q) => {
        let {
          add: I,
          next: G
        } = Cq1(B);
        for (let Z of Q)
          if (h3([Z, "optionalAccess", (D) => D.value, "optionalAccess", (D) => D.objectId]) && h3([Z, "optionalAccess", (D) => D.value, "access", (D) => D.className]) === "Array") {
            let D = Z.value.objectId;
            I((Y) => this._unrollArray(D, Z.name, Y, G))
          } else if (h3([Z, "optionalAccess", (D) => D.value, "optionalAccess", (D) => D.objectId]) && h3([Z, "optionalAccess", (D) => D.value, "optionalAccess", (D) => D.className]) === "Object") {
          let D = Z.value.objectId;
          I((Y) => this._unrollObject(D, Z.name, Y, G))
        } else if (h3([Z, "optionalAccess", (D) => D.value, "optionalAccess", (D) => D.value]) != null || h3([Z, "optionalAccess", (D) => D.value, "optionalAccess", (D) => D.description]) != null) I((D) => this._unrollOther(Z, D, G));
        G({})
      })
    }
    _getProperties(A, B) {
      this._session.post("Runtime.getProperties", {
        objectId: A,
        ownProperties: !0
      }, (Q, I) => {
        if (Q) B([]);
        else B(I.result)
      })
    }
    _unrollArray(A, B, Q, I) {
      this._getProperties(A, (G) => {
        Q[B] = G.filter((Z) => Z.name !== "length" && !isNaN(parseInt(Z.name, 10))).sort((Z, D) => parseInt(Z.name, 10) - parseInt(D.name, 10)).map((Z) => h3([Z, "optionalAccess", (D) => D.value, "optionalAccess", (D) => D.value])), I(Q)
      })
    }
    _unrollObject(A, B, Q, I) {
      this._getProperties(A, (G) => {
        Q[B] = G.map((Z) => [Z.name, h3([Z, "optionalAccess", (D) => D.value, "optionalAccess", (D) => D.value])]).reduce((Z, [D, Y]) => {
          return Z[D] = Y, Z
        }, {}), I(Q)
      })
    }
    _unrollOther(A, B, Q) {
      if (h3([A, "optionalAccess", (I) => I.value, "optionalAccess", (I) => I.value]) != null) B[A.name] = A.value.value;
      else if (h3([A, "optionalAccess", (I) => I.value, "optionalAccess", (I) => I.description]) != null && h3([A, "optionalAccess", (I) => I.value, "optionalAccess", (I) => I.type]) !== "function") B[A.name] = `<${A.value.description}>`;
      Q(B)
    }
  }

  function iG9() {
    try {
      return new mDA
    } catch (A) {
      return
    }
  }
  var dDA = "LocalVariables",
    nG9 = (A = {}, B = iG9()) => {
      let Q = new x41.LRUMap(20),
        I, G = !1;

      function Z(W, {
        params: {
          reason: J,
          data: F,
          callFrames: X
        }
      }, V) {
        if (J !== "exception" && J !== "promiseRejection") {
          V();
          return
        }
        h3([I, "optionalCall", (N) => N()]);
        let C = f41.hashFromStack(W, h3([F, "optionalAccess", (N) => N.description]));
        if (C == null) {
          V();
          return
        }
        let {
          add: K,
          next: E
        } = Cq1((N) => {
          Q.set(C, N), V()
        });
        for (let N = 0; N < Math.min(X.length, 5); N++) {
          let {
            scopeChain: q,
            functionName: O,
            this: R
          } = X[N], T = q.find((_) => _.type === "local"), L = R.className === "global" || !R.className ? O : `${R.className}.${O}`;
          if (h3([T, "optionalAccess", (_) => _.object, "access", (_) => _.objectId]) === void 0) K((_) => {
            _[N] = {
              function: L
            }, E(_)
          });
          else {
            let _ = T.object.objectId;
            K((k) => h3([B, "optionalAccess", (i) => i.getLocalVariables, "call", (i) => i(_, (x) => {
              k[N] = {
                function: L,
                vars: x
              }, E(k)
            })]))
          }
        }
        E([])
      }

      function D(W) {
        let J = f41.hashFrames(h3([W, "optionalAccess", (V) => V.stacktrace, "optionalAccess", (V) => V.frames]));
        if (J === void 0) return;
        let F = Q.remove(J);
        if (F === void 0) return;
        let X = (h3([W, "access", (V) => V.stacktrace, "optionalAccess", (V) => V.frames]) || []).filter((V) => V.function !== "new Promise");
        for (let V = 0; V < X.length; V++) {
          let C = X.length - V - 1;
          if (!X[C] || !F[V]) break;
          if (F[V].vars === void 0 || X[C].in_app === !1 || !f41.functionNamesMatch(X[C].function, F[V].function)) continue;
          X[C].vars = F[V].vars
        }
      }

      function Y(W) {
        for (let J of h3([W, "optionalAccess", (F) => F.exception, "optionalAccess", (F) => F.values]) || []) D(J);
        return W
      }
      return {
        name: dDA,
        setupOnce() {
          let W = Vq1.getClient(),
            J = h3([W, "optionalAccess", (F) => F.getOptions, "call", (F) => F()]);
          if (B && h3([J, "optionalAccess", (F) => F.includeLocalVariables])) {
            if (lG9.NODE_VERSION.major < 18) {
              x41.logger.log("The `LocalVariables` integration is only supported on Node >= v18.");
              return
            }
            let X = A.captureAllExceptions !== !1;
            if (B.configureAndConnect((V, C) => Z(J.stackParser, V, C), X), X) {
              let V = A.maxExceptionsPerSecond || 50;
              I = f41.createRateLimiter(V, () => {
                x41.logger.log("Local variables rate-limit lifted."), h3([B, "optionalAccess", (C) => C.setPauseOnExceptions, "call", (C) => C(!0)])
              }, (C) => {
                x41.logger.log(`Local variables rate-limit exceeded. Disabling capturing of caught exceptions for ${C} seconds.`), h3([B, "optionalAccess", (K) => K.setPauseOnExceptions, "call", (K) => K(!1)])
              })
            }
            G = !0
          }
        },
        processEvent(W) {
          if (G) return Y(W);
          return W
        },
        _getCachedFramesCount() {
          return Q.size
        },
        _getFirstCachedFrame() {
          return Q.values()[0]
        }
      }
    },
    uDA = Vq1.defineIntegration(nG9),
    aG9 = Vq1.convertIntegrationFnToClass(dDA, uDA);
  pDA.LocalVariablesSync = aG9;
  pDA.createCallbackList = Cq1;
  pDA.localVariablesSyncIntegration = uDA
})
// @from(Start 343390, End 343640)
v41 = z((iDA) => {
  Object.defineProperty(iDA, "__esModule", {
    value: !0
  });
  var lDA = cDA(),
    tG9 = lDA.LocalVariablesSync,
    eG9 = lDA.localVariablesSyncIntegration;
  iDA.LocalVariables = tG9;
  iDA.localVariablesIntegration = eG9
})
// @from(Start 343646, End 344955)
b41 = z((tDA) => {
  Object.defineProperty(tDA, "__esModule", {
    value: !0
  });
  var nDA = Z1("fs"),
    aDA = Z1("path"),
    sDA = z4(),
    Kq1, rDA = "Modules";

  function QZ9() {
    try {
      return Z1.cache ? Object.keys(Z1.cache) : []
    } catch (A) {
      return []
    }
  }

  function IZ9() {
    let A = Z1.main && Z1.main.paths || [],
      B = QZ9(),
      Q = {},
      I = {};
    return B.forEach((G) => {
      let Z = G,
        D = () => {
          let Y = Z;
          if (Z = aDA.dirname(Y), !Z || Y === Z || I[Y]) return;
          if (A.indexOf(Z) < 0) return D();
          let W = aDA.join(Y, "package.json");
          if (I[Y] = !0, !nDA.existsSync(W)) return D();
          try {
            let J = JSON.parse(nDA.readFileSync(W, "utf8"));
            Q[J.name] = J.version
          } catch (J) {}
        };
      D()
    }), Q
  }

  function GZ9() {
    if (!Kq1) Kq1 = IZ9();
    return Kq1
  }
  var ZZ9 = () => {
      return {
        name: rDA,
        setupOnce() {},
        processEvent(A) {
          return A.modules = {
            ...A.modules,
            ...GZ9()
          }, A
        }
      }
    },
    oDA = sDA.defineIntegration(ZZ9),
    DZ9 = sDA.convertIntegrationFnToClass(rDA, oDA);
  tDA.Modules = DZ9;
  tDA.modulesIntegration = oDA
})
// @from(Start 344961, End 345772)
zq1 = z((eDA) => {
  Object.defineProperty(eDA, "__esModule", {
    value: !0
  });
  var JZ9 = z4(),
    g41 = rA(),
    Hq1 = Xl(),
    FZ9 = 2000;

  function XZ9(A) {
    g41.consoleSandbox(() => {
      console.error(A)
    });
    let B = JZ9.getClient();
    if (B === void 0) Hq1.DEBUG_BUILD && g41.logger.warn("No NodeClient was defined, we are exiting the process now."), global.process.exit(1);
    let Q = B.getOptions(),
      I = Q && Q.shutdownTimeout && Q.shutdownTimeout > 0 && Q.shutdownTimeout || FZ9;
    B.close(I).then((G) => {
      if (!G) Hq1.DEBUG_BUILD && g41.logger.warn("We reached the timeout for emptying the request buffer, still exiting now!");
      global.process.exit(1)
    }, (G) => {
      Hq1.DEBUG_BUILD && g41.logger.error(G)
    })
  }
  eDA.logAndExitProcess = XZ9
})
// @from(Start 345778, End 347709)
m41 = z((GYA) => {
  Object.defineProperty(GYA, "__esModule", {
    value: !0
  });
  var h41 = z4(),
    CZ9 = rA(),
    KZ9 = Xl(),
    AYA = zq1(),
    BYA = "OnUncaughtException",
    HZ9 = (A = {}) => {
      let B = {
        exitEvenIfOtherHandlersAreRegistered: !0,
        ...A
      };
      return {
        name: BYA,
        setupOnce() {},
        setup(Q) {
          global.process.on("uncaughtException", IYA(Q, B))
        }
      }
    },
    QYA = h41.defineIntegration(HZ9),
    zZ9 = h41.convertIntegrationFnToClass(BYA, QYA);

  function IYA(A, B) {
    let I = !1,
      G = !1,
      Z = !1,
      D, Y = A.getOptions();
    return Object.assign((W) => {
      let J = AYA.logAndExitProcess;
      if (B.onFatalError) J = B.onFatalError;
      else if (Y.onFatalError) J = Y.onFatalError;
      let X = global.process.listeners("uncaughtException").reduce((C, K) => {
          if (K.name === "domainUncaughtExceptionClear" || K.tag && K.tag === "sentry_tracingErrorCallback" || K._errorHandler) return C;
          else return C + 1
        }, 0) === 0,
        V = B.exitEvenIfOtherHandlersAreRegistered || X;
      if (!I) {
        if (D = W, I = !0, h41.getClient() === A) h41.captureException(W, {
          originalException: W,
          captureContext: {
            level: "fatal"
          },
          mechanism: {
            handled: !1,
            type: "onuncaughtexception"
          }
        });
        if (!Z && V) Z = !0, J(W)
      } else if (V) {
        if (Z) KZ9.DEBUG_BUILD && CZ9.logger.warn("uncaught exception after calling fatal error shutdown callback - this is bad! forcing shutdown"), AYA.logAndExitProcess(W);
        else if (!G) G = !0, setTimeout(() => {
          if (!Z) Z = !0, J(D, W)
        }, 2000)
      }
    }, {
      _errorHandler: !0
    })
  }
  GYA.OnUncaughtException = zZ9;
  GYA.makeErrorHandler = IYA;
  GYA.onUncaughtExceptionIntegration = QYA
})
// @from(Start 347715, End 349216)
u41 = z((JYA) => {
  Object.defineProperty(JYA, "__esModule", {
    value: !0
  });
  var d41 = z4(),
    ZYA = rA(),
    NZ9 = zq1(),
    DYA = "OnUnhandledRejection",
    $Z9 = (A = {}) => {
      let B = A.mode || "warn";
      return {
        name: DYA,
        setupOnce() {},
        setup(Q) {
          global.process.on("unhandledRejection", WYA(Q, {
            mode: B
          }))
        }
      }
    },
    YYA = d41.defineIntegration($Z9),
    qZ9 = d41.convertIntegrationFnToClass(DYA, YYA);

  function WYA(A, B) {
    return function Q(I, G) {
      if (d41.getClient() !== A) return;
      d41.captureException(I, {
        originalException: G,
        captureContext: {
          extra: {
            unhandledPromiseRejection: !0
          }
        },
        mechanism: {
          handled: !1,
          type: "onunhandledrejection"
        }
      }), MZ9(I, B)
    }
  }

  function MZ9(A, B) {
    let Q = "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason:";
    if (B.mode === "warn") ZYA.consoleSandbox(() => {
      console.warn(Q), console.error(A && A.stack ? A.stack : A)
    });
    else if (B.mode === "strict") ZYA.consoleSandbox(() => {
      console.warn(Q)
    }), NZ9.logAndExitProcess(A)
  }
  JYA.OnUnhandledRejection = qZ9;
  JYA.makeUnhandledPromiseHandler = WYA;
  JYA.onUnhandledRejectionIntegration = YYA
})
// @from(Start 349222, End 351330)
p41 = z((KYA) => {
  Object.defineProperty(KYA, "__esModule", {
    value: !0
  });
  var TZ9 = Z1("http"),
    PZ9 = Z1("url"),
    FYA = z4(),
    _x = rA(),
    XYA = "Spotlight",
    SZ9 = (A = {}) => {
      let B = {
        sidecarUrl: A.sidecarUrl || "http://localhost:8969/stream"
      };
      return {
        name: XYA,
        setupOnce() {},
        setup(Q) {
          if (typeof process === "object" && process.env) _x.logger.warn("[Spotlight] It seems you're not in dev mode. Do you really want to have Spotlight enabled?");
          jZ9(Q, B)
        }
      }
    },
    VYA = FYA.defineIntegration(SZ9),
    _Z9 = FYA.convertIntegrationFnToClass(XYA, VYA);

  function jZ9(A, B) {
    let Q = yZ9(B.sidecarUrl);
    if (!Q) return;
    let I = 0;
    if (typeof A.on !== "function") {
      _x.logger.warn("[Spotlight] Cannot connect to spotlight due to missing method on SDK client (`client.on`)");
      return
    }
    A.on("beforeEnvelope", (G) => {
      if (I > 3) {
        _x.logger.warn("[Spotlight] Disabled Sentry -> Spotlight integration due to too many failed requests");
        return
      }
      let Z = _x.serializeEnvelope(G),
        Y = CYA()({
          method: "POST",
          path: Q.pathname,
          hostname: Q.hostname,
          port: Q.port,
          headers: {
            "Content-Type": "application/x-sentry-envelope"
          }
        }, (W) => {
          W.on("data", () => {}), W.on("end", () => {}), W.setEncoding("utf8")
        });
      Y.on("error", () => {
        I++, _x.logger.warn("[Spotlight] Failed to send envelope to Spotlight Sidecar")
      }), Y.write(Z), Y.end()
    })
  }

  function yZ9(A) {
    try {
      return new PZ9.URL(`${A}`)
    } catch (B) {
      _x.logger.warn(`[Spotlight] Invalid sidecar URL: ${A}`);
      return
    }
  }

  function CYA() {
    let {
      request: A
    } = TZ9;
    if (kZ9(A)) return A.__sentry_original__;
    return A
  }

  function kZ9(A) {
    return "__sentry_original__" in A
  }
  KYA.Spotlight = _Z9;
  KYA.getNativeHttpRequest = CYA;
  KYA.spotlightIntegration = VYA
})
// @from(Start 351336, End 357174)
l41 = z((HYA) => {
  var {
    _optionalChain: c41
  } = rA();
  Object.defineProperty(HYA, "__esModule", {
    value: !0
  });
  var Q7 = z4(),
    hP = rA(),
    bZ9 = fP();
  HYA.ChannelName = void 0;
  (function(A) {
    A.RequestCreate = "undici:request:create";
    let Q = "undici:request:headers";
    A.RequestEnd = Q;
    let I = "undici:request:error";
    A.RequestError = I
  })(HYA.ChannelName || (HYA.ChannelName = {}));
  var gZ9 = (A) => {
      return new RY(A)
    },
    hZ9 = Q7.defineIntegration(gZ9);
  class RY {
    static __initStatic() {
      this.id = "Undici"
    }
    __init() {
      this.name = RY.id
    }
    __init2() {
      this._createSpanUrlMap = new hP.LRUMap(100)
    }
    __init3() {
      this._headersUrlMap = new hP.LRUMap(100)
    }
    constructor(A = {}) {
      RY.prototype.__init.call(this), RY.prototype.__init2.call(this), RY.prototype.__init3.call(this), RY.prototype.__init4.call(this), RY.prototype.__init5.call(this), RY.prototype.__init6.call(this), this._options = {
        breadcrumbs: A.breadcrumbs === void 0 ? !0 : A.breadcrumbs,
        tracing: A.tracing,
        shouldCreateSpanForRequest: A.shouldCreateSpanForRequest
      }
    }
    setupOnce(A) {
      if (bZ9.NODE_VERSION.major < 16) return;
      let B;
      try {
        B = Z1("diagnostics_channel")
      } catch (Q) {}
      if (!B || !B.subscribe) return;
      B.subscribe(HYA.ChannelName.RequestCreate, this._onRequestCreate), B.subscribe(HYA.ChannelName.RequestEnd, this._onRequestEnd), B.subscribe(HYA.ChannelName.RequestError, this._onRequestError)
    }
    _shouldCreateSpan(A) {
      if (this._options.tracing === !1 || this._options.tracing === void 0 && !Q7.hasTracingEnabled()) return !1;
      if (this._options.shouldCreateSpanForRequest === void 0) return !0;
      let B = this._createSpanUrlMap.get(A);
      if (B !== void 0) return B;
      let Q = this._options.shouldCreateSpanForRequest(A);
      return this._createSpanUrlMap.set(A, Q), Q
    }
    __init4() {
      this._onRequestCreate = (A) => {
        if (!c41([Q7.getClient, "call", (F) => F(), "optionalAccess", (F) => F.getIntegration, "call", (F) => F(RY)])) return;
        let {
          request: B
        } = A, Q = B.origin ? B.origin.toString() + B.path : B.path, I = Q7.getClient();
        if (!I) return;
        if (Q7.isSentryRequestUrl(Q, I) || B.__sentry_span__ !== void 0) return;
        let G = I.getOptions(),
          Z = Q7.getCurrentScope(),
          D = Q7.getIsolationScope(),
          Y = Q7.getActiveSpan(),
          W = this._shouldCreateSpan(Q) ? dZ9(Y, B, Q) : void 0;
        if (W) B.__sentry_span__ = W;
        if (((F) => {
            if (G.tracePropagationTargets === void 0) return !0;
            let X = this._headersUrlMap.get(F);
            if (X !== void 0) return X;
            let V = hP.stringMatchesSomePattern(F, G.tracePropagationTargets);
            return this._headersUrlMap.set(F, V), V
          })(Q)) {
          let {
            traceId: F,
            spanId: X,
            sampled: V,
            dsc: C
          } = {
            ...D.getPropagationContext(),
            ...Z.getPropagationContext()
          }, K = W ? Q7.spanToTraceHeader(W) : hP.generateSentryTraceHeader(F, X, V), E = hP.dynamicSamplingContextToSentryBaggageHeader(C || (W ? Q7.getDynamicSamplingContextFromSpan(W) : Q7.getDynamicSamplingContextFromClient(F, I, Z)));
          mZ9(B, K, E)
        }
      }
    }
    __init5() {
      this._onRequestEnd = (A) => {
        if (!c41([Q7.getClient, "call", (Z) => Z(), "optionalAccess", (Z) => Z.getIntegration, "call", (Z) => Z(RY)])) return;
        let {
          request: B,
          response: Q
        } = A, I = B.origin ? B.origin.toString() + B.path : B.path;
        if (Q7.isSentryRequestUrl(I, Q7.getClient())) return;
        let G = B.__sentry_span__;
        if (G) Q7.setHttpStatus(G, Q.statusCode), G.end();
        if (this._options.breadcrumbs) Q7.addBreadcrumb({
          category: "http",
          data: {
            method: B.method,
            status_code: Q.statusCode,
            url: I
          },
          type: "http"
        }, {
          event: "response",
          request: B,
          response: Q
        })
      }
    }
    __init6() {
      this._onRequestError = (A) => {
        if (!c41([Q7.getClient, "call", (G) => G(), "optionalAccess", (G) => G.getIntegration, "call", (G) => G(RY)])) return;
        let {
          request: B
        } = A, Q = B.origin ? B.origin.toString() + B.path : B.path;
        if (Q7.isSentryRequestUrl(Q, Q7.getClient())) return;
        let I = B.__sentry_span__;
        if (I) I.setStatus("internal_error"), I.end();
        if (this._options.breadcrumbs) Q7.addBreadcrumb({
          category: "http",
          data: {
            method: B.method,
            url: Q
          },
          level: "error",
          type: "http"
        }, {
          event: "error",
          request: B
        })
      }
    }
  }
  RY.__initStatic();

  function mZ9(A, B, Q) {
    let I;
    if (Array.isArray(A.headers)) I = A.headers.some((G) => G === "sentry-trace");
    else I = A.headers.split(`\r
`).some((Z) => Z.startsWith("sentry-trace:"));
    if (I) return;
    if (A.addHeader("sentry-trace", B), Q) A.addHeader("baggage", Q)
  }

  function dZ9(A, B, Q) {
    let I = hP.parseUrl(Q),
      G = B.method || "GET",
      Z = {
        "http.method": G
      };
    if (I.search) Z["http.query"] = I.search;
    if (I.hash) Z["http.fragment"] = I.hash;
    return c41([A, "optionalAccess", (D) => D.startChild, "call", (D) => D({
      op: "http.client",
      origin: "auto.http.node.undici",
      description: `${G} ${hP.getSanitizedUrlString(I)}`,
      data: Z
    })])
  }
  HYA.Undici = RY;
  HYA.nativeNodeFetchintegration = hZ9
})
// @from(Start 357180, End 358126)
wq1 = z((EYA) => {
  Object.defineProperty(EYA, "__esModule", {
    value: !0
  });
  var zYA = Z1("path"),
    cZ9 = rA();

  function wYA(A) {
    return A.replace(/^[A-Z]:/, "").replace(/\\/g, "/")
  }

  function lZ9(A = process.argv[1] ? cZ9.dirname(process.argv[1]) : process.cwd(), B = zYA.sep === "\\") {
    let Q = B ? wYA(A) : A;
    return (I) => {
      if (!I) return;
      let G = B ? wYA(I) : I,
        {
          dir: Z,
          base: D,
          ext: Y
        } = zYA.posix.parse(G);
      if (Y === ".js" || Y === ".mjs" || Y === ".cjs") D = D.slice(0, Y.length * -1);
      if (!Z) Z = ".";
      let W = Z.lastIndexOf("/node_modules");
      if (W > -1) return `${Z.slice(W+14).replace(/\//g,".")}:${D}`;
      if (Z.startsWith(Q)) {
        let J = Z.slice(Q.length + 1).replace(/\//g, ".");
        if (J) J += ":";
        return J += D, J
      }
      return D
    }
  }
  EYA.createGetModuleFromFilename = lZ9
})
// @from(Start 358132, End 362186)
Eq1 = z((MYA) => {
  var {
    _optionalChain: nZ9
  } = rA();
  Object.defineProperty(MYA, "__esModule", {
    value: !0
  });
  var pF = z4(),
    mP = rA(),
    aZ9 = WDA(),
    sZ9 = Qq1(),
    rZ9 = S41(),
    oZ9 = _41(),
    tZ9 = y41(),
    eZ9 = k41(),
    AD9 = v41(),
    BD9 = b41(),
    QD9 = m41(),
    ID9 = u41(),
    GD9 = p41(),
    ZD9 = l41(),
    DD9 = wq1(),
    YD9 = Zq1(),
    UYA = [pF.inboundFiltersIntegration(), pF.functionToStringIntegration(), pF.linkedErrorsIntegration(), pF.requestDataIntegration(), rZ9.consoleIntegration(), eZ9.httpIntegration(), ZD9.nativeNodeFetchintegration(), QD9.onUncaughtExceptionIntegration(), ID9.onUnhandledRejectionIntegration(), tZ9.contextLinesIntegration(), AD9.localVariablesIntegration(), oZ9.nodeContextIntegration(), BD9.modulesIntegration()];

  function NYA(A) {
    let B = pF.getMainCarrier(),
      Q = nZ9([B, "access", (I) => I.__SENTRY__, "optionalAccess", (I) => I.integrations]) || [];
    return [...UYA, ...Q]
  }

  function WD9(A = {}) {
    if (aZ9.setNodeAsyncContextStrategy(), A.defaultIntegrations === void 0) A.defaultIntegrations = NYA();
    if (A.dsn === void 0 && process.env.SENTRY_DSN) A.dsn = process.env.SENTRY_DSN;
    let B = process.env.SENTRY_TRACES_SAMPLE_RATE;
    if (A.tracesSampleRate === void 0 && B) {
      let I = parseFloat(B);
      if (isFinite(I)) A.tracesSampleRate = I
    }
    if (A.release === void 0) {
      let I = $YA();
      if (I !== void 0) A.release = I;
      else A.autoSessionTracking = !1
    }
    if (A.environment === void 0 && process.env.SENTRY_ENVIRONMENT) A.environment = process.env.SENTRY_ENVIRONMENT;
    if (A.autoSessionTracking === void 0 && A.dsn !== void 0) A.autoSessionTracking = !0;
    if (A.instrumenter === void 0) A.instrumenter = "sentry";
    let Q = {
      ...A,
      stackParser: mP.stackParserFromStackParserOptions(A.stackParser || qYA),
      integrations: pF.getIntegrationsToSetup(A),
      transport: A.transport || YD9.makeNodeTransport
    };
    if (pF.initAndBind(A.clientClass || sZ9.NodeClient, Q), A.autoSessionTracking) FD9();
    if (XD9(), A.spotlight) {
      let I = pF.getClient();
      if (I && I.addIntegration) {
        let G = I.getOptions().integrations;
        for (let Z of G) I.addIntegration(Z);
        I.addIntegration(GD9.spotlightIntegration({
          sidecarUrl: typeof A.spotlight === "string" ? A.spotlight : void 0
        }))
      }
    }
  }

  function JD9(A) {
    if (A === void 0) return !1;
    let B = A && A.getOptions();
    if (B && B.autoSessionTracking !== void 0) return B.autoSessionTracking;
    return !1
  }

  function $YA(A) {
    if (process.env.SENTRY_RELEASE) return process.env.SENTRY_RELEASE;
    if (mP.GLOBAL_OBJ.SENTRY_RELEASE && mP.GLOBAL_OBJ.SENTRY_RELEASE.id) return mP.GLOBAL_OBJ.SENTRY_RELEASE.id;
    return process.env.GITHUB_SHA || process.env.COMMIT_REF || process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.VERCEL_GITLAB_COMMIT_SHA || process.env.VERCEL_BITBUCKET_COMMIT_SHA || process.env.ZEIT_GITHUB_COMMIT_SHA || process.env.ZEIT_GITLAB_COMMIT_SHA || process.env.ZEIT_BITBUCKET_COMMIT_SHA || process.env.CF_PAGES_COMMIT_SHA || A
  }
  var qYA = mP.createStackParser(mP.nodeStackLineParser(DD9.createGetModuleFromFilename()));

  function FD9() {
    pF.startSession(), process.on("beforeExit", () => {
      let A = pF.getIsolationScope().getSession();
      if (A && !["exited", "crashed"].includes(A.status)) pF.endSession()
    })
  }

  function XD9() {
    let A = (process.env.SENTRY_USE_ENVIRONMENT || "").toLowerCase();
    if (!["false", "n", "no", "off", "0"].includes(A)) {
      let B = process.env.SENTRY_TRACE,
        Q = process.env.SENTRY_BAGGAGE,
        I = mP.propagationContextFromHeaders(B, Q);
      pF.getCurrentScope().setPropagationContext(I)
    }
  }
  MYA.defaultIntegrations = UYA;
  MYA.defaultStackParser = qYA;
  MYA.getDefaultIntegrations = NYA;
  MYA.getSentryRelease = $YA;
  MYA.init = WD9;
  MYA.isAutoSessionTrackingEnabled = JD9
})
// @from(Start 362192, End 362893)
RYA = z((LYA) => {
  Object.defineProperty(LYA, "__esModule", {
    value: !0
  });
  var i41 = Z1("fs"),
    Uq1 = Z1("path");

  function ED9(A) {
    let B = Uq1.resolve(A);
    if (!i41.existsSync(B)) throw new Error(`Cannot read contents of ${B}. Directory does not exist.`);
    if (!i41.statSync(B).isDirectory()) throw new Error(`Cannot read contents of ${B}, because it is not a directory.`);
    let Q = (I) => {
      return i41.readdirSync(I).reduce((G, Z) => {
        let D = Uq1.join(I, Z);
        if (i41.statSync(D).isDirectory()) return G.concat(Q(D));
        return G.push(D), G
      }, [])
    };
    return Q(B).map((I) => Uq1.relative(B, I))
  }
  LYA.deepReadDirSync = ED9
})