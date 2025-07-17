
// @from(Start 3083822, End 3086605)
GcA = z((AQ8, IcA) => {
  var {
    defineProperty: FQ1,
    getOwnPropertyDescriptor: q64,
    getOwnPropertyNames: M64
  } = Object, L64 = Object.prototype.hasOwnProperty, XQ1 = (A, B) => FQ1(A, "name", {
    value: B,
    configurable: !0
  }), R64 = (A, B) => {
    for (var Q in B) FQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, O64 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of M64(B))
        if (!L64.call(A, G) && G !== Q) FQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = q64(B, G)) || I.enumerable
        })
    }
    return A
  }, T64 = (A) => O64(FQ1({}, "__esModule", {
    value: !0
  }), A), spA = {};
  R64(spA, {
    AlgorithmId: () => epA,
    EndpointURLScheme: () => tpA,
    FieldPosition: () => AcA,
    HttpApiKeyAuthLocation: () => opA,
    HttpAuthLocation: () => rpA,
    IniSectionType: () => BcA,
    RequestHandlerProtocol: () => QcA,
    SMITHY_CONTEXT_KEY: () => y64,
    getDefaultClientConfiguration: () => _64,
    resolveDefaultRuntimeConfig: () => j64
  });
  IcA.exports = T64(spA);
  var rpA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(rpA || {}),
    opA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(opA || {}),
    tpA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(tpA || {}),
    epA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(epA || {}),
    P64 = XQ1((A) => {
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
    S64 = XQ1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    _64 = XQ1((A) => {
      return P64(A)
    }, "getDefaultClientConfiguration"),
    j64 = XQ1((A) => {
      return S64(A)
    }, "resolveDefaultRuntimeConfig"),
    AcA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(AcA || {}),
    y64 = "__smithy_context",
    BcA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(BcA || {}),
    QcA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(QcA || {})
})
// @from(Start 3086611, End 3091118)
FcA = z((BQ8, JcA) => {
  var {
    defineProperty: VQ1,
    getOwnPropertyDescriptor: k64,
    getOwnPropertyNames: x64
  } = Object, f64 = Object.prototype.hasOwnProperty, $L = (A, B) => VQ1(A, "name", {
    value: B,
    configurable: !0
  }), v64 = (A, B) => {
    for (var Q in B) VQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, b64 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of x64(B))
        if (!f64.call(A, G) && G !== Q) VQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = k64(B, G)) || I.enumerable
        })
    }
    return A
  }, g64 = (A) => b64(VQ1({}, "__esModule", {
    value: !0
  }), A), ZcA = {};
  v64(ZcA, {
    Field: () => d64,
    Fields: () => u64,
    HttpRequest: () => p64,
    HttpResponse: () => c64,
    IHttpRequest: () => DcA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => h64,
    isValidHostname: () => WcA,
    resolveHttpHandlerRuntimeConfig: () => m64
  });
  JcA.exports = g64(ZcA);
  var h64 = $L((A) => {
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
    m64 = $L((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    DcA = GcA(),
    d64 = class {
      static {
        $L(this, "Field")
      }
      constructor({
        name: A,
        kind: B = DcA.FieldPosition.HEADER,
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
    u64 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        $L(this, "Fields")
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
    p64 = class A {
      static {
        $L(this, "HttpRequest")
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
        if (Q.query) Q.query = YcA(Q.query);
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

  function YcA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  $L(YcA, "cloneQuery");
  var c64 = class {
    static {
      $L(this, "HttpResponse")
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

  function WcA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  $L(WcA, "isValidHostname")
})
// @from(Start 3091124, End 3092177)
KcA = z((ZQ8, CcA) => {
  var {
    defineProperty: CQ1,
    getOwnPropertyDescriptor: l64,
    getOwnPropertyNames: i64
  } = Object, n64 = Object.prototype.hasOwnProperty, q_1 = (A, B) => CQ1(A, "name", {
    value: B,
    configurable: !0
  }), a64 = (A, B) => {
    for (var Q in B) CQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, s64 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of i64(B))
        if (!n64.call(A, G) && G !== Q) CQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = l64(B, G)) || I.enumerable
        })
    }
    return A
  }, r64 = (A) => s64(CQ1({}, "__esModule", {
    value: !0
  }), A), XcA = {};
  a64(XcA, {
    escapeUri: () => VcA,
    escapeUriPath: () => t64
  });
  CcA.exports = r64(XcA);
  var VcA = q_1((A) => encodeURIComponent(A).replace(/[!'()*]/g, o64), "escapeUri"),
    o64 = q_1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
    t64 = q_1((A) => A.split("/").map(VcA).join("/"), "escapeUriPath")
})
// @from(Start 3092183, End 3093421)
EcA = z((DQ8, wcA) => {
  var {
    defineProperty: KQ1,
    getOwnPropertyDescriptor: e64,
    getOwnPropertyNames: A54
  } = Object, B54 = Object.prototype.hasOwnProperty, Q54 = (A, B) => KQ1(A, "name", {
    value: B,
    configurable: !0
  }), I54 = (A, B) => {
    for (var Q in B) KQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, G54 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of A54(B))
        if (!B54.call(A, G) && G !== Q) KQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = e64(B, G)) || I.enumerable
        })
    }
    return A
  }, Z54 = (A) => G54(KQ1({}, "__esModule", {
    value: !0
  }), A), HcA = {};
  I54(HcA, {
    buildQueryString: () => zcA
  });
  wcA.exports = Z54(HcA);
  var M_1 = KcA();

  function zcA(A) {
    let B = [];
    for (let Q of Object.keys(A).sort()) {
      let I = A[Q];
      if (Q = M_1.escapeUri(Q), Array.isArray(I))
        for (let G = 0, Z = I.length; G < Z; G++) B.push(`${Q}=${M_1.escapeUri(I[G])}`);
      else {
        let G = Q;
        if (I || typeof I === "string") G += `=${M_1.escapeUri(I)}`;
        B.push(G)
      }
    }
    return B.join("&")
  }
  Q54(zcA, "buildQueryString")
})
// @from(Start 3093427, End 3112413)
DN = z((YQ8, ycA) => {
  var {
    create: D54,
    defineProperty: cn,
    getOwnPropertyDescriptor: Y54,
    getOwnPropertyNames: W54,
    getPrototypeOf: J54
  } = Object, F54 = Object.prototype.hasOwnProperty, d8 = (A, B) => cn(A, "name", {
    value: B,
    configurable: !0
  }), X54 = (A, B) => {
    for (var Q in B) cn(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, McA = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of W54(B))
        if (!F54.call(A, G) && G !== Q) cn(A, G, {
          get: () => B[G],
          enumerable: !(I = Y54(B, G)) || I.enumerable
        })
    }
    return A
  }, V54 = (A, B, Q) => (Q = A != null ? D54(J54(A)) : {}, McA(B || !A || !A.__esModule ? cn(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q, A)), C54 = (A) => McA(cn({}, "__esModule", {
    value: !0
  }), A), LcA = {};
  X54(LcA, {
    DEFAULT_REQUEST_TIMEOUT: () => _cA,
    NodeHttp2Handler: () => M54,
    NodeHttpHandler: () => U54,
    streamCollector: () => R54
  });
  ycA.exports = C54(LcA);
  var RcA = FcA(),
    OcA = EcA(),
    L_1 = Z1("http"),
    R_1 = Z1("https"),
    K54 = ["ECONNRESET", "EPIPE", "ETIMEDOUT"],
    TcA = d8((A) => {
      let B = {};
      for (let Q of Object.keys(A)) {
        let I = A[Q];
        B[Q] = Array.isArray(I) ? I.join(",") : I
      }
      return B
    }, "getTransformedHeaders"),
    kY = {
      setTimeout: (A, B) => setTimeout(A, B),
      clearTimeout: (A) => clearTimeout(A)
    },
    UcA = 1000,
    H54 = d8((A, B, Q = 0) => {
      if (!Q) return -1;
      let I = d8((G) => {
        let Z = kY.setTimeout(() => {
            A.destroy(), B(Object.assign(new Error(`Socket timed out without establishing a connection within ${Q} ms`), {
              name: "TimeoutError"
            }))
          }, Q - G),
          D = d8((Y) => {
            if (Y?.connecting) Y.on("connect", () => {
              kY.clearTimeout(Z)
            });
            else kY.clearTimeout(Z)
          }, "doWithSocket");
        if (A.socket) D(A.socket);
        else A.on("socket", D)
      }, "registerTimeout");
      if (Q < 2000) return I(0), 0;
      return kY.setTimeout(I.bind(null, UcA), UcA)
    }, "setConnectionTimeout"),
    z54 = 3000,
    w54 = d8((A, {
      keepAlive: B,
      keepAliveMsecs: Q
    }, I = z54) => {
      if (B !== !0) return -1;
      let G = d8(() => {
        if (A.socket) A.socket.setKeepAlive(B, Q || 0);
        else A.on("socket", (Z) => {
          Z.setKeepAlive(B, Q || 0)
        })
      }, "registerListener");
      if (I === 0) return G(), 0;
      return kY.setTimeout(G, I)
    }, "setSocketKeepAlive"),
    NcA = 3000,
    E54 = d8((A, B, Q = _cA) => {
      let I = d8((G) => {
        let Z = Q - G,
          D = d8(() => {
            A.destroy(), B(Object.assign(new Error(`Connection timed out after ${Q} ms`), {
              name: "TimeoutError"
            }))
          }, "onTimeout");
        if (A.socket) A.socket.setTimeout(Z, D), A.on("close", () => A.socket?.removeListener("timeout", D));
        else A.setTimeout(Z, D)
      }, "registerTimeout");
      if (0 < Q && Q < 6000) return I(0), 0;
      return kY.setTimeout(I.bind(null, Q === 0 ? 0 : NcA), NcA)
    }, "setSocketTimeout"),
    PcA = Z1("stream"),
    $cA = 6000;
  async function O_1(A, B, Q = $cA) {
    let I = B.headers ?? {},
      G = I.Expect || I.expect,
      Z = -1,
      D = !0;
    if (G === "100-continue") D = await Promise.race([new Promise((Y) => {
      Z = Number(kY.setTimeout(() => Y(!0), Math.max($cA, Q)))
    }), new Promise((Y) => {
      A.on("continue", () => {
        kY.clearTimeout(Z), Y(!0)
      }), A.on("response", () => {
        kY.clearTimeout(Z), Y(!1)
      }), A.on("error", () => {
        kY.clearTimeout(Z), Y(!1)
      })
    })]);
    if (D) ScA(A, B.body)
  }
  d8(O_1, "writeRequestBody");

  function ScA(A, B) {
    if (B instanceof PcA.Readable) {
      B.pipe(A);
      return
    }
    if (B) {
      if (Buffer.isBuffer(B) || typeof B === "string") {
        A.end(B);
        return
      }
      let Q = B;
      if (typeof Q === "object" && Q.buffer && typeof Q.byteOffset === "number" && typeof Q.byteLength === "number") {
        A.end(Buffer.from(Q.buffer, Q.byteOffset, Q.byteLength));
        return
      }
      A.end(Buffer.from(B));
      return
    }
    A.end()
  }
  d8(ScA, "writeBody");
  var _cA = 0,
    U54 = class A {
      constructor(B) {
        this.socketWarningTimestamp = 0, this.metadata = {
          handlerProtocol: "http/1.1"
        }, this.configProvider = new Promise((Q, I) => {
          if (typeof B === "function") B().then((G) => {
            Q(this.resolveDefaultConfig(G))
          }).catch(I);
          else Q(this.resolveDefaultConfig(B))
        })
      }
      static {
        d8(this, "NodeHttpHandler")
      }
      static create(B) {
        if (typeof B?.handle === "function") return B;
        return new A(B)
      }
      static checkSocketUsage(B, Q, I = console) {
        let {
          sockets: G,
          requests: Z,
          maxSockets: D
        } = B;
        if (typeof D !== "number" || D === 1 / 0) return Q;
        let Y = 15000;
        if (Date.now() - Y < Q) return Q;
        if (G && Z)
          for (let W in G) {
            let J = G[W]?.length ?? 0,
              F = Z[W]?.length ?? 0;
            if (J >= D && F >= 2 * D) return I?.warn?.(`@smithy/node-http-handler:WARN - socket usage at capacity=${J} and ${F} additional requests are enqueued.
See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.`), Date.now()
          }
        return Q
      }
      resolveDefaultConfig(B) {
        let {
          requestTimeout: Q,
          connectionTimeout: I,
          socketTimeout: G,
          socketAcquisitionWarningTimeout: Z,
          httpAgent: D,
          httpsAgent: Y
        } = B || {}, W = !0, J = 50;
        return {
          connectionTimeout: I,
          requestTimeout: Q ?? G,
          socketAcquisitionWarningTimeout: Z,
          httpAgent: (() => {
            if (D instanceof L_1.Agent || typeof D?.destroy === "function") return D;
            return new L_1.Agent({
              keepAlive: !0,
              maxSockets: 50,
              ...D
            })
          })(),
          httpsAgent: (() => {
            if (Y instanceof R_1.Agent || typeof Y?.destroy === "function") return Y;
            return new R_1.Agent({
              keepAlive: !0,
              maxSockets: 50,
              ...Y
            })
          })(),
          logger: console
        }
      }
      destroy() {
        this.config?.httpAgent?.destroy(), this.config?.httpsAgent?.destroy()
      }
      async handle(B, {
        abortSignal: Q
      } = {}) {
        if (!this.config) this.config = await this.configProvider;
        return new Promise((I, G) => {
          let Z = void 0,
            D = [],
            Y = d8(async (R) => {
              await Z, D.forEach(kY.clearTimeout), I(R)
            }, "resolve"),
            W = d8(async (R) => {
              await Z, D.forEach(kY.clearTimeout), G(R)
            }, "reject");
          if (!this.config) throw new Error("Node HTTP request handler config is not resolved");
          if (Q?.aborted) {
            let R = new Error("Request aborted");
            R.name = "AbortError", W(R);
            return
          }
          let J = B.protocol === "https:",
            F = J ? this.config.httpsAgent : this.config.httpAgent;
          D.push(kY.setTimeout(() => {
            this.socketWarningTimestamp = A.checkSocketUsage(F, this.socketWarningTimestamp, this.config.logger)
          }, this.config.socketAcquisitionWarningTimeout ?? (this.config.requestTimeout ?? 2000) + (this.config.connectionTimeout ?? 1000)));
          let X = OcA.buildQueryString(B.query || {}),
            V = void 0;
          if (B.username != null || B.password != null) {
            let R = B.username ?? "",
              T = B.password ?? "";
            V = `${R}:${T}`
          }
          let C = B.path;
          if (X) C += `?${X}`;
          if (B.fragment) C += `#${B.fragment}`;
          let K = B.hostname ?? "";
          if (K[0] === "[" && K.endsWith("]")) K = B.hostname.slice(1, -1);
          else K = B.hostname;
          let E = {
              headers: B.headers,
              host: K,
              method: B.method,
              path: C,
              port: B.port,
              agent: F,
              auth: V
            },
            q = (J ? R_1.request : L_1.request)(E, (R) => {
              let T = new RcA.HttpResponse({
                statusCode: R.statusCode || -1,
                reason: R.statusMessage,
                headers: TcA(R.headers),
                body: R
              });
              Y({
                response: T
              })
            });
          if (q.on("error", (R) => {
              if (K54.includes(R.code)) W(Object.assign(R, {
                name: "TimeoutError"
              }));
              else W(R)
            }), Q) {
            let R = d8(() => {
              q.destroy();
              let T = new Error("Request aborted");
              T.name = "AbortError", W(T)
            }, "onAbort");
            if (typeof Q.addEventListener === "function") {
              let T = Q;
              T.addEventListener("abort", R, {
                once: !0
              }), q.once("close", () => T.removeEventListener("abort", R))
            } else Q.onabort = R
          }
          D.push(H54(q, W, this.config.connectionTimeout)), D.push(E54(q, W, this.config.requestTimeout));
          let O = E.agent;
          if (typeof O === "object" && "keepAlive" in O) D.push(w54(q, {
            keepAlive: O.keepAlive,
            keepAliveMsecs: O.keepAliveMsecs
          }));
          Z = O_1(q, B, this.config.requestTimeout).catch((R) => {
            return D.forEach(kY.clearTimeout), G(R)
          })
        })
      }
      updateHttpClientConfig(B, Q) {
        this.config = void 0, this.configProvider = this.configProvider.then((I) => {
          return {
            ...I,
            [B]: Q
          }
        })
      }
      httpHandlerConfigs() {
        return this.config ?? {}
      }
    },
    qcA = Z1("http2"),
    N54 = V54(Z1("http2")),
    $54 = class {
      constructor(A) {
        this.sessions = [], this.sessions = A ?? []
      }
      static {
        d8(this, "NodeHttp2ConnectionPool")
      }
      poll() {
        if (this.sessions.length > 0) return this.sessions.shift()
      }
      offerLast(A) {
        this.sessions.push(A)
      }
      contains(A) {
        return this.sessions.includes(A)
      }
      remove(A) {
        this.sessions = this.sessions.filter((B) => B !== A)
      } [Symbol.iterator]() {
        return this.sessions[Symbol.iterator]()
      }
      destroy(A) {
        for (let B of this.sessions)
          if (B === A) {
            if (!B.destroyed) B.destroy()
          }
      }
    },
    q54 = class {
      constructor(A) {
        if (this.sessionCache = new Map, this.config = A, this.config.maxConcurrency && this.config.maxConcurrency <= 0) throw new RangeError("maxConcurrency must be greater than zero.")
      }
      static {
        d8(this, "NodeHttp2ConnectionManager")
      }
      lease(A, B) {
        let Q = this.getUrlString(A),
          I = this.sessionCache.get(Q);
        if (I) {
          let Y = I.poll();
          if (Y && !this.config.disableConcurrency) return Y
        }
        let G = N54.default.connect(Q);
        if (this.config.maxConcurrency) G.settings({
          maxConcurrentStreams: this.config.maxConcurrency
        }, (Y) => {
          if (Y) throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + A.destination.toString())
        });
        G.unref();
        let Z = d8(() => {
          G.destroy(), this.deleteSession(Q, G)
        }, "destroySessionCb");
        if (G.on("goaway", Z), G.on("error", Z), G.on("frameError", Z), G.on("close", () => this.deleteSession(Q, G)), B.requestTimeout) G.setTimeout(B.requestTimeout, Z);
        let D = this.sessionCache.get(Q) || new $54;
        return D.offerLast(G), this.sessionCache.set(Q, D), G
      }
      deleteSession(A, B) {
        let Q = this.sessionCache.get(A);
        if (!Q) return;
        if (!Q.contains(B)) return;
        Q.remove(B), this.sessionCache.set(A, Q)
      }
      release(A, B) {
        let Q = this.getUrlString(A);
        this.sessionCache.get(Q)?.offerLast(B)
      }
      destroy() {
        for (let [A, B] of this.sessionCache) {
          for (let Q of B) {
            if (!Q.destroyed) Q.destroy();
            B.remove(Q)
          }
          this.sessionCache.delete(A)
        }
      }
      setMaxConcurrentStreams(A) {
        if (A && A <= 0) throw new RangeError("maxConcurrentStreams must be greater than zero.");
        this.config.maxConcurrency = A
      }
      setDisableConcurrentStreams(A) {
        this.config.disableConcurrency = A
      }
      getUrlString(A) {
        return A.destination.toString()
      }
    },
    M54 = class A {
      constructor(B) {
        this.metadata = {
          handlerProtocol: "h2"
        }, this.connectionManager = new q54({}), this.configProvider = new Promise((Q, I) => {
          if (typeof B === "function") B().then((G) => {
            Q(G || {})
          }).catch(I);
          else Q(B || {})
        })
      }
      static {
        d8(this, "NodeHttp2Handler")
      }
      static create(B) {
        if (typeof B?.handle === "function") return B;
        return new A(B)
      }
      destroy() {
        this.connectionManager.destroy()
      }
      async handle(B, {
        abortSignal: Q
      } = {}) {
        if (!this.config) {
          if (this.config = await this.configProvider, this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || !1), this.config.maxConcurrentStreams) this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams)
        }
        let {
          requestTimeout: I,
          disableConcurrentStreams: G
        } = this.config;
        return new Promise((Z, D) => {
          let Y = !1,
            W = void 0,
            J = d8(async (i) => {
              await W, Z(i)
            }, "resolve"),
            F = d8(async (i) => {
              await W, D(i)
            }, "reject");
          if (Q?.aborted) {
            Y = !0;
            let i = new Error("Request aborted");
            i.name = "AbortError", F(i);
            return
          }
          let {
            hostname: X,
            method: V,
            port: C,
            protocol: K,
            query: E
          } = B, N = "";
          if (B.username != null || B.password != null) {
            let i = B.username ?? "",
              x = B.password ?? "";
            N = `${i}:${x}@`
          }
          let q = `${K}//${N}${X}${C?`:${C}`:""}`,
            O = {
              destination: new URL(q)
            },
            R = this.connectionManager.lease(O, {
              requestTimeout: this.config?.sessionTimeout,
              disableConcurrentStreams: G || !1
            }),
            T = d8((i) => {
              if (G) this.destroySession(R);
              Y = !0, F(i)
            }, "rejectWithDestroy"),
            L = OcA.buildQueryString(E || {}),
            _ = B.path;
          if (L) _ += `?${L}`;
          if (B.fragment) _ += `#${B.fragment}`;
          let k = R.request({
            ...B.headers,
            [qcA.constants.HTTP2_HEADER_PATH]: _,
            [qcA.constants.HTTP2_HEADER_METHOD]: V
          });
          if (R.ref(), k.on("response", (i) => {
              let x = new RcA.HttpResponse({
                statusCode: i[":status"] || -1,
                headers: TcA(i),
                body: k
              });
              if (Y = !0, J({
                  response: x
                }), G) R.close(), this.connectionManager.deleteSession(q, R)
            }), I) k.setTimeout(I, () => {
            k.close();
            let i = new Error(`Stream timed out because of no activity for ${I} ms`);
            i.name = "TimeoutError", T(i)
          });
          if (Q) {
            let i = d8(() => {
              k.close();
              let x = new Error("Request aborted");
              x.name = "AbortError", T(x)
            }, "onAbort");
            if (typeof Q.addEventListener === "function") {
              let x = Q;
              x.addEventListener("abort", i, {
                once: !0
              }), k.once("close", () => x.removeEventListener("abort", i))
            } else Q.onabort = i
          }
          k.on("frameError", (i, x, s) => {
            T(new Error(`Frame type id ${i} in stream id ${s} has failed with code ${x}.`))
          }), k.on("error", T), k.on("aborted", () => {
            T(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${k.rstCode}.`))
          }), k.on("close", () => {
            if (R.unref(), G) R.destroy();
            if (!Y) T(new Error("Unexpected error: http2 request did not get a response"))
          }), W = O_1(k, B, I)
        })
      }
      updateHttpClientConfig(B, Q) {
        this.config = void 0, this.configProvider = this.configProvider.then((I) => {
          return {
            ...I,
            [B]: Q
          }
        })
      }
      httpHandlerConfigs() {
        return this.config ?? {}
      }
      destroySession(B) {
        if (!B.destroyed) B.destroy()
      }
    },
    L54 = class extends PcA.Writable {
      constructor() {
        super(...arguments);
        this.bufferedBytes = []
      }
      static {
        d8(this, "Collector")
      }
      _write(A, B, Q) {
        this.bufferedBytes.push(A), Q()
      }
    },
    R54 = d8((A) => {
      if (O54(A)) return jcA(A);
      return new Promise((B, Q) => {
        let I = new L54;
        A.pipe(I), A.on("error", (G) => {
          I.end(), Q(G)
        }), I.on("error", Q), I.on("finish", function() {
          let G = new Uint8Array(Buffer.concat(this.bufferedBytes));
          B(G)
        })
      })
    }, "streamCollector"),
    O54 = d8((A) => typeof ReadableStream === "function" && A instanceof ReadableStream, "isReadableStreamInstance");
  async function jcA(A) {
    let B = [],
      Q = A.getReader(),
      I = !1,
      G = 0;
    while (!I) {
      let {
        done: Y,
        value: W
      } = await Q.read();
      if (W) B.push(W), G += W.length;
      I = Y
    }
    let Z = new Uint8Array(G),
      D = 0;
    for (let Y of B) Z.set(Y, D), D += Y.length;
    return Z
  }
  d8(jcA, "collectReadableStream")
})
// @from(Start 3112419, End 3115202)
ucA = z((XQ8, dcA) => {
  var {
    defineProperty: HQ1,
    getOwnPropertyDescriptor: T54,
    getOwnPropertyNames: P54
  } = Object, S54 = Object.prototype.hasOwnProperty, zQ1 = (A, B) => HQ1(A, "name", {
    value: B,
    configurable: !0
  }), _54 = (A, B) => {
    for (var Q in B) HQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, j54 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of P54(B))
        if (!S54.call(A, G) && G !== Q) HQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = T54(B, G)) || I.enumerable
        })
    }
    return A
  }, y54 = (A) => j54(HQ1({}, "__esModule", {
    value: !0
  }), A), kcA = {};
  _54(kcA, {
    AlgorithmId: () => bcA,
    EndpointURLScheme: () => vcA,
    FieldPosition: () => gcA,
    HttpApiKeyAuthLocation: () => fcA,
    HttpAuthLocation: () => xcA,
    IniSectionType: () => hcA,
    RequestHandlerProtocol: () => mcA,
    SMITHY_CONTEXT_KEY: () => b54,
    getDefaultClientConfiguration: () => f54,
    resolveDefaultRuntimeConfig: () => v54
  });
  dcA.exports = y54(kcA);
  var xcA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(xcA || {}),
    fcA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(fcA || {}),
    vcA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(vcA || {}),
    bcA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(bcA || {}),
    k54 = zQ1((A) => {
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
    x54 = zQ1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    f54 = zQ1((A) => {
      return k54(A)
    }, "getDefaultClientConfiguration"),
    v54 = zQ1((A) => {
      return x54(A)
    }, "resolveDefaultRuntimeConfig"),
    gcA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(gcA || {}),
    b54 = "__smithy_context",
    hcA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(hcA || {}),
    mcA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(mcA || {})
})
// @from(Start 3115208, End 3119715)
acA = z((VQ8, ncA) => {
  var {
    defineProperty: wQ1,
    getOwnPropertyDescriptor: g54,
    getOwnPropertyNames: h54
  } = Object, m54 = Object.prototype.hasOwnProperty, qL = (A, B) => wQ1(A, "name", {
    value: B,
    configurable: !0
  }), d54 = (A, B) => {
    for (var Q in B) wQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, u54 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of h54(B))
        if (!m54.call(A, G) && G !== Q) wQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = g54(B, G)) || I.enumerable
        })
    }
    return A
  }, p54 = (A) => u54(wQ1({}, "__esModule", {
    value: !0
  }), A), pcA = {};
  d54(pcA, {
    Field: () => i54,
    Fields: () => n54,
    HttpRequest: () => a54,
    HttpResponse: () => s54,
    IHttpRequest: () => ccA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => c54,
    isValidHostname: () => icA,
    resolveHttpHandlerRuntimeConfig: () => l54
  });
  ncA.exports = p54(pcA);
  var c54 = qL((A) => {
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
    l54 = qL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    ccA = ucA(),
    i54 = class {
      static {
        qL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = ccA.FieldPosition.HEADER,
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
    n54 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        qL(this, "Fields")
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
    a54 = class A {
      static {
        qL(this, "HttpRequest")
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
        if (Q.query) Q.query = lcA(Q.query);
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

  function lcA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  qL(lcA, "cloneQuery");
  var s54 = class {
    static {
      qL(this, "HttpResponse")
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

  function icA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  qL(icA, "isValidHostname")
})
// @from(Start 3119721, End 3120774)
tcA = z((zQ8, ocA) => {
  var {
    defineProperty: EQ1,
    getOwnPropertyDescriptor: r54,
    getOwnPropertyNames: o54
  } = Object, t54 = Object.prototype.hasOwnProperty, T_1 = (A, B) => EQ1(A, "name", {
    value: B,
    configurable: !0
  }), e54 = (A, B) => {
    for (var Q in B) EQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, A84 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of o54(B))
        if (!t54.call(A, G) && G !== Q) EQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = r54(B, G)) || I.enumerable
        })
    }
    return A
  }, B84 = (A) => A84(EQ1({}, "__esModule", {
    value: !0
  }), A), scA = {};
  e54(scA, {
    escapeUri: () => rcA,
    escapeUriPath: () => I84
  });
  ocA.exports = B84(scA);
  var rcA = T_1((A) => encodeURIComponent(A).replace(/[!'()*]/g, Q84), "escapeUri"),
    Q84 = T_1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
    I84 = T_1((A) => A.split("/").map(rcA).join("/"), "escapeUriPath")
})
// @from(Start 3120780, End 3122018)
QlA = z((wQ8, BlA) => {
  var {
    defineProperty: UQ1,
    getOwnPropertyDescriptor: G84,
    getOwnPropertyNames: Z84
  } = Object, D84 = Object.prototype.hasOwnProperty, Y84 = (A, B) => UQ1(A, "name", {
    value: B,
    configurable: !0
  }), W84 = (A, B) => {
    for (var Q in B) UQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, J84 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Z84(B))
        if (!D84.call(A, G) && G !== Q) UQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = G84(B, G)) || I.enumerable
        })
    }
    return A
  }, F84 = (A) => J84(UQ1({}, "__esModule", {
    value: !0
  }), A), ecA = {};
  W84(ecA, {
    buildQueryString: () => AlA
  });
  BlA.exports = F84(ecA);
  var P_1 = tcA();

  function AlA(A) {
    let B = [];
    for (let Q of Object.keys(A).sort()) {
      let I = A[Q];
      if (Q = P_1.escapeUri(Q), Array.isArray(I))
        for (let G = 0, Z = I.length; G < Z; G++) B.push(`${Q}=${P_1.escapeUri(I[G])}`);
      else {
        let G = Q;
        if (I || typeof I === "string") G += `=${P_1.escapeUri(I)}`;
        B.push(G)
      }
    }
    return B.join("&")
  }
  Y84(AlA, "buildQueryString")
})
// @from(Start 3122024, End 3128018)
FlA = z((EQ8, JlA) => {
  var {
    defineProperty: $Q1,
    getOwnPropertyDescriptor: X84,
    getOwnPropertyNames: V84
  } = Object, C84 = Object.prototype.hasOwnProperty, kz = (A, B) => $Q1(A, "name", {
    value: B,
    configurable: !0
  }), K84 = (A, B) => {
    for (var Q in B) $Q1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, H84 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of V84(B))
        if (!C84.call(A, G) && G !== Q) $Q1(A, G, {
          get: () => B[G],
          enumerable: !(I = X84(B, G)) || I.enumerable
        })
    }
    return A
  }, z84 = (A) => H84($Q1({}, "__esModule", {
    value: !0
  }), A), GlA = {};
  K84(GlA, {
    FetchHttpHandler: () => E84,
    keepAliveSupport: () => NQ1,
    streamCollector: () => N84
  });
  JlA.exports = z84(GlA);
  var IlA = acA(),
    w84 = QlA();

  function S_1(A, B) {
    return new Request(A, B)
  }
  kz(S_1, "createRequest");

  function ZlA(A = 0) {
    return new Promise((B, Q) => {
      if (A) setTimeout(() => {
        let I = new Error(`Request did not complete within ${A} ms`);
        I.name = "TimeoutError", Q(I)
      }, A)
    })
  }
  kz(ZlA, "requestTimeout");
  var NQ1 = {
      supported: void 0
    },
    E84 = class A {
      static {
        kz(this, "FetchHttpHandler")
      }
      static create(B) {
        if (typeof B?.handle === "function") return B;
        return new A(B)
      }
      constructor(B) {
        if (typeof B === "function") this.configProvider = B().then((Q) => Q || {});
        else this.config = B ?? {}, this.configProvider = Promise.resolve(this.config);
        if (NQ1.supported === void 0) NQ1.supported = Boolean(typeof Request !== "undefined" && "keepalive" in S_1("https://[::1]"))
      }
      destroy() {}
      async handle(B, {
        abortSignal: Q
      } = {}) {
        if (!this.config) this.config = await this.configProvider;
        let I = this.config.requestTimeout,
          G = this.config.keepAlive === !0,
          Z = this.config.credentials;
        if (Q?.aborted) {
          let q = new Error("Request aborted");
          return q.name = "AbortError", Promise.reject(q)
        }
        let D = B.path,
          Y = w84.buildQueryString(B.query || {});
        if (Y) D += `?${Y}`;
        if (B.fragment) D += `#${B.fragment}`;
        let W = "";
        if (B.username != null || B.password != null) {
          let q = B.username ?? "",
            O = B.password ?? "";
          W = `${q}:${O}@`
        }
        let {
          port: J,
          method: F
        } = B, X = `${B.protocol}//${W}${B.hostname}${J?`:${J}`:""}${D}`, V = F === "GET" || F === "HEAD" ? void 0 : B.body, C = {
          body: V,
          headers: new Headers(B.headers),
          method: F,
          credentials: Z
        };
        if (this.config?.cache) C.cache = this.config.cache;
        if (V) C.duplex = "half";
        if (typeof AbortController !== "undefined") C.signal = Q;
        if (NQ1.supported) C.keepalive = G;
        if (typeof this.config.requestInit === "function") Object.assign(C, this.config.requestInit(B));
        let K = kz(() => {}, "removeSignalEventListener"),
          E = S_1(X, C),
          N = [fetch(E).then((q) => {
            let O = q.headers,
              R = {};
            for (let L of O.entries()) R[L[0]] = L[1];
            if (q.body == null) return q.blob().then((L) => ({
              response: new IlA.HttpResponse({
                headers: R,
                reason: q.statusText,
                statusCode: q.status,
                body: L
              })
            }));
            return {
              response: new IlA.HttpResponse({
                headers: R,
                reason: q.statusText,
                statusCode: q.status,
                body: q.body
              })
            }
          }), ZlA(I)];
        if (Q) N.push(new Promise((q, O) => {
          let R = kz(() => {
            let T = new Error("Request aborted");
            T.name = "AbortError", O(T)
          }, "onAbort");
          if (typeof Q.addEventListener === "function") {
            let T = Q;
            T.addEventListener("abort", R, {
              once: !0
            }), K = kz(() => T.removeEventListener("abort", R), "removeSignalEventListener")
          } else Q.onabort = R
        }));
        return Promise.race(N).finally(K)
      }
      updateHttpClientConfig(B, Q) {
        this.config = void 0, this.configProvider = this.configProvider.then((I) => {
          return I[B] = Q, I
        })
      }
      httpHandlerConfigs() {
        return this.config ?? {}
      }
    },
    U84 = Wb(),
    N84 = kz(async (A) => {
      if (typeof Blob === "function" && A instanceof Blob || A.constructor?.name === "Blob") {
        if (Blob.prototype.arrayBuffer !== void 0) return new Uint8Array(await A.arrayBuffer());
        return DlA(A)
      }
      return YlA(A)
    }, "streamCollector");
  async function DlA(A) {
    let B = await WlA(A),
      Q = U84.fromBase64(B);
    return new Uint8Array(Q)
  }
  kz(DlA, "collectBlob");
  async function YlA(A) {
    let B = [],
      Q = A.getReader(),
      I = !1,
      G = 0;
    while (!I) {
      let {
        done: Y,
        value: W
      } = await Q.read();
      if (W) B.push(W), G += W.length;
      I = Y
    }
    let Z = new Uint8Array(G),
      D = 0;
    for (let Y of B) Z.set(Y, D), D += Y.length;
    return Z
  }
  kz(YlA, "collectStream");

  function WlA(A) {
    return new Promise((B, Q) => {
      let I = new FileReader;
      I.onloadend = () => {
        if (I.readyState !== 2) return Q(new Error("Reader aborted too early"));
        let G = I.result ?? "",
          Z = G.indexOf(","),
          D = Z > -1 ? Z + 1 : G.length;
        B(G.substring(D))
      }, I.onabort = () => Q(new Error("Read aborted")), I.onerror = () => Q(I.error), I.readAsDataURL(A)
    })
  }
  kz(WlA, "readToBase64")
})
// @from(Start 3128024, End 3129558)
MQ1 = z((UQ8, zlA) => {
  var {
    defineProperty: qQ1,
    getOwnPropertyDescriptor: $84,
    getOwnPropertyNames: q84
  } = Object, M84 = Object.prototype.hasOwnProperty, XlA = (A, B) => qQ1(A, "name", {
    value: B,
    configurable: !0
  }), L84 = (A, B) => {
    for (var Q in B) qQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, R84 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of q84(B))
        if (!M84.call(A, G) && G !== Q) qQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = $84(B, G)) || I.enumerable
        })
    }
    return A
  }, O84 = (A) => R84(qQ1({}, "__esModule", {
    value: !0
  }), A), VlA = {};
  L84(VlA, {
    fromHex: () => KlA,
    toHex: () => HlA
  });
  zlA.exports = O84(VlA);
  var ClA = {},
    __1 = {};
  for (let A = 0; A < 256; A++) {
    let B = A.toString(16).toLowerCase();
    if (B.length === 1) B = `0${B}`;
    ClA[A] = B, __1[B] = A
  }

  function KlA(A) {
    if (A.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
    let B = new Uint8Array(A.length / 2);
    for (let Q = 0; Q < A.length; Q += 2) {
      let I = A.slice(Q, Q + 2).toLowerCase();
      if (I in __1) B[Q / 2] = __1[I];
      else throw new Error(`Cannot decode unrecognized sequence ${I} as hexadecimal`)
    }
    return B
  }
  XlA(KlA, "fromHex");

  function HlA(A) {
    let B = "";
    for (let Q = 0; Q < A.byteLength; Q++) B += ClA[A[Q]];
    return B
  }
  XlA(HlA, "toHex")
})
// @from(Start 3129564, End 3131603)
qlA = z((NlA) => {
  Object.defineProperty(NlA, "__esModule", {
    value: !0
  });
  NlA.sdkStreamMixin = void 0;
  var T84 = FlA(),
    P84 = Wb(),
    S84 = MQ1(),
    _84 = RQ(),
    wlA = NL(),
    ElA = "The stream has already been transformed.",
    j84 = (A) => {
      var B, Q;
      if (!UlA(A) && !wlA.isReadableStream(A)) {
        let D = ((Q = (B = A === null || A === void 0 ? void 0 : A.__proto__) === null || B === void 0 ? void 0 : B.constructor) === null || Q === void 0 ? void 0 : Q.name) || A;
        throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${D}`)
      }
      let I = !1,
        G = async () => {
          if (I) throw new Error(ElA);
          return I = !0, await T84.streamCollector(A)
        }, Z = (D) => {
          if (typeof D.stream !== "function") throw new Error(`Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.
If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body`);
          return D.stream()
        };
      return Object.assign(A, {
        transformToByteArray: G,
        transformToString: async (D) => {
          let Y = await G();
          if (D === "base64") return P84.toBase64(Y);
          else if (D === "hex") return S84.toHex(Y);
          else if (D === void 0 || D === "utf8" || D === "utf-8") return _84.toUtf8(Y);
          else if (typeof TextDecoder === "function") return new TextDecoder(D).decode(Y);
          else throw new Error("TextDecoder is not available, please make sure polyfill is provided.")
        },
        transformToWebStream: () => {
          if (I) throw new Error(ElA);
          if (I = !0, UlA(A)) return Z(A);
          else if (wlA.isReadableStream(A)) return A;
          else throw new Error(`Cannot transform payload to web stream, got ${A}`)
        }
      })
    };
  NlA.sdkStreamMixin = j84;
  var UlA = (A) => typeof Blob === "function" && A instanceof Blob
})
// @from(Start 3131609, End 3133197)
OlA = z((LlA) => {
  Object.defineProperty(LlA, "__esModule", {
    value: !0
  });
  LlA.sdkStreamMixin = void 0;
  var y84 = DN(),
    k84 = MZ(),
    j_1 = Z1("stream"),
    x84 = qlA(),
    MlA = "The stream has already been transformed.",
    f84 = (A) => {
      var B, Q;
      if (!(A instanceof j_1.Readable)) try {
        return x84.sdkStreamMixin(A)
      } catch (Z) {
        let D = ((Q = (B = A === null || A === void 0 ? void 0 : A.__proto__) === null || B === void 0 ? void 0 : B.constructor) === null || Q === void 0 ? void 0 : Q.name) || A;
        throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${D}`)
      }
      let I = !1,
        G = async () => {
          if (I) throw new Error(MlA);
          return I = !0, await y84.streamCollector(A)
        };
      return Object.assign(A, {
        transformToByteArray: G,
        transformToString: async (Z) => {
          let D = await G();
          if (Z === void 0 || Buffer.isEncoding(Z)) return k84.fromArrayBuffer(D.buffer, D.byteOffset, D.byteLength).toString(Z);
          else return new TextDecoder(Z).decode(D)
        },
        transformToWebStream: () => {
          if (I) throw new Error(MlA);
          if (A.readableFlowing !== null) throw new Error("The stream has been consumed by other callbacks.");
          if (typeof j_1.Readable.toWeb !== "function") throw new Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");
          return I = !0, j_1.Readable.toWeb(A)
        }
      })
    };
  LlA.sdkStreamMixin = f84
})
// @from(Start 3133203, End 3133446)
SlA = z((TlA) => {
  Object.defineProperty(TlA, "__esModule", {
    value: !0
  });
  TlA.splitStream = void 0;
  async function v84(A) {
    if (typeof A.stream === "function") A = A.stream();
    return A.tee()
  }
  TlA.splitStream = v84
})
// @from(Start 3133452, End 3133860)
xlA = z((ylA) => {
  Object.defineProperty(ylA, "__esModule", {
    value: !0
  });
  ylA.splitStream = void 0;
  var _lA = Z1("stream"),
    b84 = SlA(),
    jlA = NL();
  async function g84(A) {
    if (jlA.isReadableStream(A) || jlA.isBlob(A)) return b84.splitStream(A);
    let B = new _lA.PassThrough,
      Q = new _lA.PassThrough;
    return A.pipe(B), A.pipe(Q), [B, Q]
  }
  ylA.splitStream = g84
})
// @from(Start 3133866, End 3135797)
f_1 = z((LQ8, fz) => {
  var {
    defineProperty: LQ1,
    getOwnPropertyDescriptor: h84,
    getOwnPropertyNames: m84
  } = Object, d84 = Object.prototype.hasOwnProperty, x_1 = (A, B) => LQ1(A, "name", {
    value: B,
    configurable: !0
  }), u84 = (A, B) => {
    for (var Q in B) LQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, y_1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of m84(B))
        if (!d84.call(A, G) && G !== Q) LQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = h84(B, G)) || I.enumerable
        })
    }
    return A
  }, ML = (A, B, Q) => (y_1(A, B, "default"), Q && y_1(Q, B, "default")), p84 = (A) => y_1(LQ1({}, "__esModule", {
    value: !0
  }), A), xz = {};
  u84(xz, {
    Uint8ArrayBlobAdapter: () => k_1
  });
  fz.exports = p84(xz);
  var flA = Wb(),
    vlA = RQ();

  function blA(A, B = "utf-8") {
    if (B === "base64") return flA.toBase64(A);
    return vlA.toUtf8(A)
  }
  x_1(blA, "transformToString");

  function glA(A, B) {
    if (B === "base64") return k_1.mutate(flA.fromBase64(A));
    return k_1.mutate(vlA.fromUtf8(A))
  }
  x_1(glA, "transformFromString");
  var k_1 = class A extends Uint8Array {
    static {
      x_1(this, "Uint8ArrayBlobAdapter")
    }
    static fromString(B, Q = "utf-8") {
      switch (typeof B) {
        case "string":
          return glA(B, Q);
        default:
          throw new Error(`Unsupported conversion from ${typeof B} to Uint8ArrayBlobAdapter.`)
      }
    }
    static mutate(B) {
      return Object.setPrototypeOf(B, A.prototype), B
    }
    transformToString(B = "utf-8") {
      return blA(this, B)
    }
  };
  ML(xz, N_1(), fz.exports);
  ML(xz, RpA(), fz.exports);
  ML(xz, gpA(), fz.exports);
  ML(xz, dpA(), fz.exports);
  ML(xz, apA(), fz.exports);
  ML(xz, OlA(), fz.exports);
  ML(xz, xlA(), fz.exports);
  ML(xz, NL(), fz.exports)
})
// @from(Start 3135803, End 3138853)
vz = z((RQ8, ulA) => {
  var {
    defineProperty: g_1,
    getOwnPropertyDescriptor: c84,
    getOwnPropertyNames: l84
  } = Object, i84 = Object.prototype.hasOwnProperty, n84 = (A, B) => {
    for (var Q in B) g_1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, a84 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of l84(B))
        if (!i84.call(A, G) && G !== Q) g_1(A, G, {
          get: () => B[G],
          enumerable: !(I = c84(B, G)) || I.enumerable
        })
    }
    return A
  }, s84 = (A) => a84(g_1({}, "__esModule", {
    value: !0
  }), A), hlA = {};
  n84(hlA, {
    RequestBuilder: () => dlA,
    collectBody: () => r84,
    extendedEncodeURIComponent: () => b_1,
    requestBuilder: () => t84,
    resolvedPath: () => mlA
  });
  ulA.exports = s84(hlA);
  var v_1 = f_1(),
    r84 = async (A = new Uint8Array, B) => {
      if (A instanceof Uint8Array) return v_1.Uint8ArrayBlobAdapter.mutate(A);
      if (!A) return v_1.Uint8ArrayBlobAdapter.mutate(new Uint8Array);
      let Q = B.streamCollector(A);
      return v_1.Uint8ArrayBlobAdapter.mutate(await Q)
    };

  function b_1(A) {
    return encodeURIComponent(A).replace(/[!'()*]/g, function(B) {
      return "%" + B.charCodeAt(0).toString(16).toUpperCase()
    })
  }
  var o84 = H_1(),
    mlA = (A, B, Q, I, G, Z) => {
      if (B != null && B[Q] !== void 0) {
        let D = I();
        if (D.length <= 0) throw new Error("Empty value provided for input HTTP label: " + Q + ".");
        A = A.replace(G, Z ? D.split("/").map((Y) => b_1(Y)).join("/") : b_1(D))
      } else throw new Error("No value provided for input HTTP label: " + Q + ".");
      return A
    };

  function t84(A, B) {
    return new dlA(A, B)
  }
  var dlA = class {
    constructor(A, B) {
      this.input = A, this.context = B, this.query = {}, this.method = "", this.headers = {}, this.path = "", this.body = null, this.hostname = "", this.resolvePathStack = []
    }
    async build() {
      let {
        hostname: A,
        protocol: B = "https",
        port: Q,
        path: I
      } = await this.context.endpoint();
      this.path = I;
      for (let G of this.resolvePathStack) G(this.path);
      return new o84.HttpRequest({
        protocol: B,
        hostname: this.hostname || A,
        port: Q,
        method: this.method,
        path: this.path,
        query: this.query,
        body: this.body,
        headers: this.headers
      })
    }
    hn(A) {
      return this.hostname = A, this
    }
    bp(A) {
      return this.resolvePathStack.push((B) => {
        this.path = `${B?.endsWith("/")?B.slice(0,-1):B||""}` + A
      }), this
    }
    p(A, B, Q, I) {
      return this.resolvePathStack.push((G) => {
        this.path = mlA(G, this.input, A, B, Q, I)
      }), this
    }
    h(A) {
      return this.headers = A, this
    }
    q(A) {
      return this.query = A, this
    }
    b(A) {
      return this.body = A, this
    }
    m(A) {
      return this.method = A, this
    }
  }
})
// @from(Start 3138859, End 3148887)
NI = z((TQ8, BiA) => {
  var {
    defineProperty: OQ1,
    getOwnPropertyDescriptor: e84,
    getOwnPropertyNames: AB4
  } = Object, BB4 = Object.prototype.hasOwnProperty, rB = (A, B) => OQ1(A, "name", {
    value: B,
    configurable: !0
  }), QB4 = (A, B) => {
    for (var Q in B) OQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, IB4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of AB4(B))
        if (!BB4.call(A, G) && G !== Q) OQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = e84(B, G)) || I.enumerable
        })
    }
    return A
  }, GB4 = (A) => IB4(OQ1({}, "__esModule", {
    value: !0
  }), A), plA = {};
  QB4(plA, {
    DefaultIdentityProviderConfig: () => wB4,
    EXPIRATION_MS: () => elA,
    HttpApiKeyAuthSigner: () => EB4,
    HttpBearerAuthSigner: () => UB4,
    NoAuthSigner: () => NB4,
    createIsIdentityExpiredFunction: () => tlA,
    createPaginator: () => rlA,
    doesIdentityRequireRefresh: () => AiA,
    getHttpAuthSchemeEndpointRuleSetPlugin: () => YB4,
    getHttpAuthSchemePlugin: () => JB4,
    getHttpSigningPlugin: () => VB4,
    getSmithyContext: () => ZB4,
    httpAuthSchemeEndpointRuleSetMiddlewareOptions: () => ilA,
    httpAuthSchemeMiddleware: () => h_1,
    httpAuthSchemeMiddlewareOptions: () => nlA,
    httpSigningMiddleware: () => alA,
    httpSigningMiddlewareOptions: () => slA,
    isIdentityExpired: () => $B4,
    memoizeIdentityProvider: () => qB4,
    normalizeProvider: () => CB4,
    requestBuilder: () => zB4.requestBuilder,
    setFeature: () => olA
  });
  BiA.exports = GB4(plA);
  var RQ1 = C_1(),
    ZB4 = rB((A) => A[RQ1.SMITHY_CONTEXT_KEY] || (A[RQ1.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext"),
    clA = ZX(),
    DB4 = rB((A, B) => {
      if (!B || B.length === 0) return A;
      let Q = [];
      for (let I of B)
        for (let G of A)
          if (G.schemeId.split("#")[1] === I) Q.push(G);
      for (let I of A)
        if (!Q.find(({
            schemeId: G
          }) => G === I.schemeId)) Q.push(I);
      return Q
    }, "resolveAuthOptions");

  function llA(A) {
    let B = new Map;
    for (let Q of A) B.set(Q.schemeId, Q);
    return B
  }
  rB(llA, "convertHttpAuthSchemesToMap");
  var h_1 = rB((A, B) => (Q, I) => async (G) => {
      let Z = A.httpAuthSchemeProvider(await B.httpAuthSchemeParametersProvider(A, I, G.input)),
        D = A.authSchemePreference ? await A.authSchemePreference() : [],
        Y = DB4(Z, D),
        W = llA(A.httpAuthSchemes),
        J = clA.getSmithyContext(I),
        F = [];
      for (let X of Y) {
        let V = W.get(X.schemeId);
        if (!V) {
          F.push(`HttpAuthScheme \`${X.schemeId}\` was not enabled for this service.`);
          continue
        }
        let C = V.identityProvider(await B.identityProviderConfigProvider(A));
        if (!C) {
          F.push(`HttpAuthScheme \`${X.schemeId}\` did not have an IdentityProvider configured.`);
          continue
        }
        let {
          identityProperties: K = {},
          signingProperties: E = {}
        } = X.propertiesExtractor?.(A, I) || {};
        X.identityProperties = Object.assign(X.identityProperties || {}, K), X.signingProperties = Object.assign(X.signingProperties || {}, E), J.selectedHttpAuthScheme = {
          httpAuthOption: X,
          identity: await C(X.identityProperties),
          signer: V.signer
        };
        break
      }
      if (!J.selectedHttpAuthScheme) throw new Error(F.join(`
`));
      return Q(G)
    }, "httpAuthSchemeMiddleware"),
    ilA = {
      step: "serialize",
      tags: ["HTTP_AUTH_SCHEME"],
      name: "httpAuthSchemeMiddleware",
      override: !0,
      relation: "before",
      toMiddleware: "endpointV2Middleware"
    },
    YB4 = rB((A, {
      httpAuthSchemeParametersProvider: B,
      identityProviderConfigProvider: Q
    }) => ({
      applyToStack: (I) => {
        I.addRelativeTo(h_1(A, {
          httpAuthSchemeParametersProvider: B,
          identityProviderConfigProvider: Q
        }), ilA)
      }
    }), "getHttpAuthSchemeEndpointRuleSetPlugin"),
    WB4 = yz(),
    nlA = {
      step: "serialize",
      tags: ["HTTP_AUTH_SCHEME"],
      name: "httpAuthSchemeMiddleware",
      override: !0,
      relation: "before",
      toMiddleware: WB4.serializerMiddlewareOption.name
    },
    JB4 = rB((A, {
      httpAuthSchemeParametersProvider: B,
      identityProviderConfigProvider: Q
    }) => ({
      applyToStack: (I) => {
        I.addRelativeTo(h_1(A, {
          httpAuthSchemeParametersProvider: B,
          identityProviderConfigProvider: Q
        }), nlA)
      }
    }), "getHttpAuthSchemePlugin"),
    m_1 = H_1(),
    FB4 = rB((A) => (B) => {
      throw B
    }, "defaultErrorHandler"),
    XB4 = rB((A, B) => {}, "defaultSuccessHandler"),
    alA = rB((A) => (B, Q) => async (I) => {
      if (!m_1.HttpRequest.isInstance(I.request)) return B(I);
      let Z = clA.getSmithyContext(Q).selectedHttpAuthScheme;
      if (!Z) throw new Error("No HttpAuthScheme was selected: unable to sign request");
      let {
        httpAuthOption: {
          signingProperties: D = {}
        },
        identity: Y,
        signer: W
      } = Z, J = await B({
        ...I,
        request: await W.sign(I.request, Y, D)
      }).catch((W.errorHandler || FB4)(D));
      return (W.successHandler || XB4)(J.response, D), J
    }, "httpSigningMiddleware"),
    slA = {
      step: "finalizeRequest",
      tags: ["HTTP_SIGNING"],
      name: "httpSigningMiddleware",
      aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
      override: !0,
      relation: "after",
      toMiddleware: "retryMiddleware"
    },
    VB4 = rB((A) => ({
      applyToStack: (B) => {
        B.addRelativeTo(alA(A), slA)
      }
    }), "getHttpSigningPlugin"),
    CB4 = rB((A) => {
      if (typeof A === "function") return A;
      let B = Promise.resolve(A);
      return () => B
    }, "normalizeProvider"),
    KB4 = rB(async (A, B, Q, I = (Z) => Z, ...G) => {
      let Z = new A(Q);
      return Z = I(Z) ?? Z, await B.send(Z, ...G)
    }, "makePagedClientRequest");

  function rlA(A, B, Q, I, G) {
    return rB(async function* Z(D, Y, ...W) {
      let J = Y,
        F = D.startingToken ?? J[Q],
        X = !0,
        V;
      while (X) {
        if (J[Q] = F, G) J[G] = J[G] ?? D.pageSize;
        if (D.client instanceof A) V = await KB4(B, D.client, Y, D.withCommand, ...W);
        else throw new Error(`Invalid client, expected instance of ${A.name}`);
        yield V;
        let C = F;
        F = HB4(V, I), X = !!(F && (!D.stopOnSameToken || F !== C))
      }
      return
    }, "paginateOperation")
  }
  rB(rlA, "createPaginator");
  var HB4 = rB((A, B) => {
      let Q = A,
        I = B.split(".");
      for (let G of I) {
        if (!Q || typeof Q !== "object") return;
        Q = Q[G]
      }
      return Q
    }, "get"),
    zB4 = vz();

  function olA(A, B, Q) {
    if (!A.__smithy_context) A.__smithy_context = {
      features: {}
    };
    else if (!A.__smithy_context.features) A.__smithy_context.features = {};
    A.__smithy_context.features[B] = Q
  }
  rB(olA, "setFeature");
  var wB4 = class {
      constructor(A) {
        this.authSchemes = new Map;
        for (let [B, Q] of Object.entries(A))
          if (Q !== void 0) this.authSchemes.set(B, Q)
      }
      static {
        rB(this, "DefaultIdentityProviderConfig")
      }
      getIdentityProvider(A) {
        return this.authSchemes.get(A)
      }
    },
    EB4 = class {
      static {
        rB(this, "HttpApiKeyAuthSigner")
      }
      async sign(A, B, Q) {
        if (!Q) throw new Error("request could not be signed with `apiKey` since the `name` and `in` signer properties are missing");
        if (!Q.name) throw new Error("request could not be signed with `apiKey` since the `name` signer property is missing");
        if (!Q.in) throw new Error("request could not be signed with `apiKey` since the `in` signer property is missing");
        if (!B.apiKey) throw new Error("request could not be signed with `apiKey` since the `apiKey` is not defined");
        let I = m_1.HttpRequest.clone(A);
        if (Q.in === RQ1.HttpApiKeyAuthLocation.QUERY) I.query[Q.name] = B.apiKey;
        else if (Q.in === RQ1.HttpApiKeyAuthLocation.HEADER) I.headers[Q.name] = Q.scheme ? `${Q.scheme} ${B.apiKey}` : B.apiKey;
        else throw new Error("request can only be signed with `apiKey` locations `query` or `header`, but found: `" + Q.in + "`");
        return I
      }
    },
    UB4 = class {
      static {
        rB(this, "HttpBearerAuthSigner")
      }
      async sign(A, B, Q) {
        let I = m_1.HttpRequest.clone(A);
        if (!B.token) throw new Error("request could not be signed with `token` since the `token` is not defined");
        return I.headers.Authorization = `Bearer ${B.token}`, I
      }
    },
    NB4 = class {
      static {
        rB(this, "NoAuthSigner")
      }
      async sign(A, B, Q) {
        return A
      }
    },
    tlA = rB((A) => (B) => AiA(B) && B.expiration.getTime() - Date.now() < A, "createIsIdentityExpiredFunction"),
    elA = 300000,
    $B4 = tlA(elA),
    AiA = rB((A) => A.expiration !== void 0, "doesIdentityRequireRefresh"),
    qB4 = rB((A, B, Q) => {
      if (A === void 0) return;
      let I = typeof A !== "function" ? async () => Promise.resolve(A): A, G, Z, D, Y = !1, W = rB(async (J) => {
        if (!Z) Z = I(J);
        try {
          G = await Z, D = !0, Y = !1
        } finally {
          Z = void 0
        }
        return G
      }, "coalesceProvider");
      if (B === void 0) return async (J) => {
        if (!D || J?.forceRefresh) G = await W(J);
        return G
      };
      return async (J) => {
        if (!D || J?.forceRefresh) G = await W(J);
        if (Y) return G;
        if (!Q(G)) return Y = !0, G;
        if (B(G)) return await W(J), G;
        return G
      }
    }, "memoizeIdentityProvider")
})
// @from(Start 3148893, End 3151676)
XiA = z((yQ8, FiA) => {
  var {
    defineProperty: TQ1,
    getOwnPropertyDescriptor: MB4,
    getOwnPropertyNames: LB4
  } = Object, RB4 = Object.prototype.hasOwnProperty, PQ1 = (A, B) => TQ1(A, "name", {
    value: B,
    configurable: !0
  }), OB4 = (A, B) => {
    for (var Q in B) TQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, TB4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of LB4(B))
        if (!RB4.call(A, G) && G !== Q) TQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = MB4(B, G)) || I.enumerable
        })
    }
    return A
  }, PB4 = (A) => TB4(TQ1({}, "__esModule", {
    value: !0
  }), A), QiA = {};
  OB4(QiA, {
    AlgorithmId: () => DiA,
    EndpointURLScheme: () => ZiA,
    FieldPosition: () => YiA,
    HttpApiKeyAuthLocation: () => GiA,
    HttpAuthLocation: () => IiA,
    IniSectionType: () => WiA,
    RequestHandlerProtocol: () => JiA,
    SMITHY_CONTEXT_KEY: () => kB4,
    getDefaultClientConfiguration: () => jB4,
    resolveDefaultRuntimeConfig: () => yB4
  });
  FiA.exports = PB4(QiA);
  var IiA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(IiA || {}),
    GiA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(GiA || {}),
    ZiA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(ZiA || {}),
    DiA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(DiA || {}),
    SB4 = PQ1((A) => {
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
    _B4 = PQ1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    jB4 = PQ1((A) => {
      return SB4(A)
    }, "getDefaultClientConfiguration"),
    yB4 = PQ1((A) => {
      return _B4(A)
    }, "resolveDefaultRuntimeConfig"),
    YiA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(YiA || {}),
    kB4 = "__smithy_context",
    WiA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(WiA || {}),
    JiA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(JiA || {})
})
// @from(Start 3151682, End 3163891)
LL = z((kQ8, NiA) => {
  var {
    defineProperty: SQ1,
    getOwnPropertyDescriptor: xB4,
    getOwnPropertyNames: fB4
  } = Object, vB4 = Object.prototype.hasOwnProperty, D8 = (A, B) => SQ1(A, "name", {
    value: B,
    configurable: !0
  }), bB4 = (A, B) => {
    for (var Q in B) SQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, gB4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of fB4(B))
        if (!vB4.call(A, G) && G !== Q) SQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = xB4(B, G)) || I.enumerable
        })
    }
    return A
  }, hB4 = (A) => gB4(SQ1({}, "__esModule", {
    value: !0
  }), A), ViA = {};
  bB4(ViA, {
    EndpointCache: () => mB4,
    EndpointError: () => xY,
    customEndpointFunctions: () => u_1,
    isIpAddress: () => CiA,
    isValidHostLabel: () => c_1,
    resolveEndpoint: () => Z34
  });
  NiA.exports = hB4(ViA);
  var mB4 = class {
      constructor({
        size: A,
        params: B
      }) {
        if (this.data = new Map, this.parameters = [], this.capacity = A ?? 50, B) this.parameters = B
      }
      static {
        D8(this, "EndpointCache")
      }
      get(A, B) {
        let Q = this.hash(A);
        if (Q === !1) return B();
        if (!this.data.has(Q)) {
          if (this.data.size > this.capacity + 10) {
            let I = this.data.keys(),
              G = 0;
            while (!0) {
              let {
                value: Z,
                done: D
              } = I.next();
              if (this.data.delete(Z), D || ++G > 10) break
            }
          }
          this.data.set(Q, B())
        }
        return this.data.get(Q)
      }
      size() {
        return this.data.size
      }
      hash(A) {
        let B = "",
          {
            parameters: Q
          } = this;
        if (Q.length === 0) return !1;
        for (let I of Q) {
          let G = String(A[I] ?? "");
          if (G.includes("|;")) return !1;
          B += G + "|;"
        }
        return B
      }
    },
    dB4 = new RegExp("^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$"),
    CiA = D8((A) => dB4.test(A) || A.startsWith("[") && A.endsWith("]"), "isIpAddress"),
    uB4 = new RegExp("^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$"),
    c_1 = D8((A, B = !1) => {
      if (!B) return uB4.test(A);
      let Q = A.split(".");
      for (let I of Q)
        if (!c_1(I)) return !1;
      return !0
    }, "isValidHostLabel"),
    u_1 = {},
    ln = "endpoints";

  function YN(A) {
    if (typeof A !== "object" || A == null) return A;
    if ("ref" in A) return `$${YN(A.ref)}`;
    if ("fn" in A) return `${A.fn}(${(A.argv||[]).map(YN).join(", ")})`;
    return JSON.stringify(A, null, 2)
  }
  D8(YN, "toDebugString");
  var xY = class extends Error {
      static {
        D8(this, "EndpointError")
      }
      constructor(A) {
        super(A);
        this.name = "EndpointError"
      }
    },
    pB4 = D8((A, B) => A === B, "booleanEquals"),
    cB4 = D8((A) => {
      let B = A.split("."),
        Q = [];
      for (let I of B) {
        let G = I.indexOf("[");
        if (G !== -1) {
          if (I.indexOf("]") !== I.length - 1) throw new xY(`Path: '${A}' does not end with ']'`);
          let Z = I.slice(G + 1, -1);
          if (Number.isNaN(parseInt(Z))) throw new xY(`Invalid array index: '${Z}' in path: '${A}'`);
          if (G !== 0) Q.push(I.slice(0, G));
          Q.push(Z)
        } else Q.push(I)
      }
      return Q
    }, "getAttrPathList"),
    KiA = D8((A, B) => cB4(B).reduce((Q, I) => {
      if (typeof Q !== "object") throw new xY(`Index '${I}' in '${B}' not found in '${JSON.stringify(A)}'`);
      else if (Array.isArray(Q)) return Q[parseInt(I)];
      return Q[I]
    }, A), "getAttr"),
    lB4 = D8((A) => A != null, "isSet"),
    iB4 = D8((A) => !A, "not"),
    p_1 = XiA(),
    d_1 = {
      [p_1.EndpointURLScheme.HTTP]: 80,
      [p_1.EndpointURLScheme.HTTPS]: 443
    },
    nB4 = D8((A) => {
      let B = (() => {
        try {
          if (A instanceof URL) return A;
          if (typeof A === "object" && "hostname" in A) {
            let {
              hostname: V,
              port: C,
              protocol: K = "",
              path: E = "",
              query: N = {}
            } = A, q = new URL(`${K}//${V}${C?`:${C}`:""}${E}`);
            return q.search = Object.entries(N).map(([O, R]) => `${O}=${R}`).join("&"), q
          }
          return new URL(A)
        } catch (V) {
          return null
        }
      })();
      if (!B) return console.error(`Unable to parse ${JSON.stringify(A)} as a whatwg URL.`), null;
      let Q = B.href,
        {
          host: I,
          hostname: G,
          pathname: Z,
          protocol: D,
          search: Y
        } = B;
      if (Y) return null;
      let W = D.slice(0, -1);
      if (!Object.values(p_1.EndpointURLScheme).includes(W)) return null;
      let J = CiA(G),
        F = Q.includes(`${I}:${d_1[W]}`) || typeof A === "string" && A.includes(`${I}:${d_1[W]}`),
        X = `${I}${F?`:${d_1[W]}`:""}`;
      return {
        scheme: W,
        authority: X,
        path: Z,
        normalizedPath: Z.endsWith("/") ? Z : `${Z}/`,
        isIp: J
      }
    }, "parseURL"),
    aB4 = D8((A, B) => A === B, "stringEquals"),
    sB4 = D8((A, B, Q, I) => {
      if (B >= Q || A.length < Q) return null;
      if (!I) return A.substring(B, Q);
      return A.substring(A.length - Q, A.length - B)
    }, "substring"),
    rB4 = D8((A) => encodeURIComponent(A).replace(/[!*'()]/g, (B) => `%${B.charCodeAt(0).toString(16).toUpperCase()}`), "uriEncode"),
    oB4 = {
      booleanEquals: pB4,
      getAttr: KiA,
      isSet: lB4,
      isValidHostLabel: c_1,
      not: iB4,
      parseURL: nB4,
      stringEquals: aB4,
      substring: sB4,
      uriEncode: rB4
    },
    HiA = D8((A, B) => {
      let Q = [],
        I = {
          ...B.endpointParams,
          ...B.referenceRecord
        },
        G = 0;
      while (G < A.length) {
        let Z = A.indexOf("{", G);
        if (Z === -1) {
          Q.push(A.slice(G));
          break
        }
        Q.push(A.slice(G, Z));
        let D = A.indexOf("}", Z);
        if (D === -1) {
          Q.push(A.slice(Z));
          break
        }
        if (A[Z + 1] === "{" && A[D + 1] === "}") Q.push(A.slice(Z + 1, D)), G = D + 2;
        let Y = A.substring(Z + 1, D);
        if (Y.includes("#")) {
          let [W, J] = Y.split("#");
          Q.push(KiA(I[W], J))
        } else Q.push(I[Y]);
        G = D + 1
      }
      return Q.join("")
    }, "evaluateTemplate"),
    tB4 = D8(({
      ref: A
    }, B) => {
      return {
        ...B.endpointParams,
        ...B.referenceRecord
      } [A]
    }, "getReferenceValue"),
    _Q1 = D8((A, B, Q) => {
      if (typeof A === "string") return HiA(A, Q);
      else if (A.fn) return ziA(A, Q);
      else if (A.ref) return tB4(A, Q);
      throw new xY(`'${B}': ${String(A)} is not a string, function or reference.`)
    }, "evaluateExpression"),
    ziA = D8(({
      fn: A,
      argv: B
    }, Q) => {
      let I = B.map((Z) => ["boolean", "number"].includes(typeof Z) ? Z : _Q1(Z, "arg", Q)),
        G = A.split(".");
      if (G[0] in u_1 && G[1] != null) return u_1[G[0]][G[1]](...I);
      return oB4[A](...I)
    }, "callFunction"),
    eB4 = D8(({
      assign: A,
      ...B
    }, Q) => {
      if (A && A in Q.referenceRecord) throw new xY(`'${A}' is already defined in Reference Record.`);
      let I = ziA(B, Q);
      return Q.logger?.debug?.(`${ln} evaluateCondition: ${YN(B)} = ${YN(I)}`), {
        result: I === "" ? !0 : !!I,
        ...A != null && {
          toAssign: {
            name: A,
            value: I
          }
        }
      }
    }, "evaluateCondition"),
    l_1 = D8((A = [], B) => {
      let Q = {};
      for (let I of A) {
        let {
          result: G,
          toAssign: Z
        } = eB4(I, {
          ...B,
          referenceRecord: {
            ...B.referenceRecord,
            ...Q
          }
        });
        if (!G) return {
          result: G
        };
        if (Z) Q[Z.name] = Z.value, B.logger?.debug?.(`${ln} assign: ${Z.name} := ${YN(Z.value)}`)
      }
      return {
        result: !0,
        referenceRecord: Q
      }
    }, "evaluateConditions"),
    A34 = D8((A, B) => Object.entries(A).reduce((Q, [I, G]) => ({
      ...Q,
      [I]: G.map((Z) => {
        let D = _Q1(Z, "Header value entry", B);
        if (typeof D !== "string") throw new xY(`Header '${I}' value '${D}' is not a string`);
        return D
      })
    }), {}), "getEndpointHeaders"),
    wiA = D8((A, B) => {
      if (Array.isArray(A)) return A.map((Q) => wiA(Q, B));
      switch (typeof A) {
        case "string":
          return HiA(A, B);
        case "object":
          if (A === null) throw new xY(`Unexpected endpoint property: ${A}`);
          return EiA(A, B);
        case "boolean":
          return A;
        default:
          throw new xY(`Unexpected endpoint property type: ${typeof A}`)
      }
    }, "getEndpointProperty"),
    EiA = D8((A, B) => Object.entries(A).reduce((Q, [I, G]) => ({
      ...Q,
      [I]: wiA(G, B)
    }), {}), "getEndpointProperties"),
    B34 = D8((A, B) => {
      let Q = _Q1(A, "Endpoint URL", B);
      if (typeof Q === "string") try {
        return new URL(Q)
      } catch (I) {
        throw console.error(`Failed to construct URL with ${Q}`, I), I
      }
      throw new xY(`Endpoint URL must be a string, got ${typeof Q}`)
    }, "getEndpointUrl"),
    Q34 = D8((A, B) => {
      let {
        conditions: Q,
        endpoint: I
      } = A, {
        result: G,
        referenceRecord: Z
      } = l_1(Q, B);
      if (!G) return;
      let D = {
          ...B,
          referenceRecord: {
            ...B.referenceRecord,
            ...Z
          }
        },
        {
          url: Y,
          properties: W,
          headers: J
        } = I;
      return B.logger?.debug?.(`${ln} Resolving endpoint from template: ${YN(I)}`), {
        ...J != null && {
          headers: A34(J, D)
        },
        ...W != null && {
          properties: EiA(W, D)
        },
        url: B34(Y, D)
      }
    }, "evaluateEndpointRule"),
    I34 = D8((A, B) => {
      let {
        conditions: Q,
        error: I
      } = A, {
        result: G,
        referenceRecord: Z
      } = l_1(Q, B);
      if (!G) return;
      throw new xY(_Q1(I, "Error", {
        ...B,
        referenceRecord: {
          ...B.referenceRecord,
          ...Z
        }
      }))
    }, "evaluateErrorRule"),
    G34 = D8((A, B) => {
      let {
        conditions: Q,
        rules: I
      } = A, {
        result: G,
        referenceRecord: Z
      } = l_1(Q, B);
      if (!G) return;
      return UiA(I, {
        ...B,
        referenceRecord: {
          ...B.referenceRecord,
          ...Z
        }
      })
    }, "evaluateTreeRule"),
    UiA = D8((A, B) => {
      for (let Q of A)
        if (Q.type === "endpoint") {
          let I = Q34(Q, B);
          if (I) return I
        } else if (Q.type === "error") I34(Q, B);
      else if (Q.type === "tree") {
        let I = G34(Q, B);
        if (I) return I
      } else throw new xY(`Unknown endpoint rule: ${Q}`);
      throw new xY("Rules evaluation failed")
    }, "evaluateRules"),
    Z34 = D8((A, B) => {
      let {
        endpointParams: Q,
        logger: I
      } = B, {
        parameters: G,
        rules: Z
      } = A;
      B.logger?.debug?.(`${ln} Initial EndpointParams: ${YN(Q)}`);
      let D = Object.entries(G).filter(([, J]) => J.default != null).map(([J, F]) => [J, F.default]);
      if (D.length > 0)
        for (let [J, F] of D) Q[J] = Q[J] ?? F;
      let Y = Object.entries(G).filter(([, J]) => J.required).map(([J]) => J);
      for (let J of Y)
        if (Q[J] == null) throw new xY(`Missing required parameter: '${J}'`);
      let W = UiA(Z, {
        endpointParams: Q,
        logger: I,
        referenceRecord: {}
      });
      return B.logger?.debug?.(`${ln} Resolved endpoint: ${YN(W)}`), W
    }, "resolveEndpoint")
})
// @from(Start 3163897, End 3175254)
RL = z((vQ8, _iA) => {
  var {
    defineProperty: jQ1,
    getOwnPropertyDescriptor: D34,
    getOwnPropertyNames: Y34
  } = Object, W34 = Object.prototype.hasOwnProperty, Fb = (A, B) => jQ1(A, "name", {
    value: B,
    configurable: !0
  }), J34 = (A, B) => {
    for (var Q in B) jQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, F34 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Y34(B))
        if (!W34.call(A, G) && G !== Q) jQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = D34(B, G)) || I.enumerable
        })
    }
    return A
  }, X34 = (A) => F34(jQ1({}, "__esModule", {
    value: !0
  }), A), qiA = {};
  J34(qiA, {
    ConditionObject: () => QB.ConditionObject,
    DeprecatedObject: () => QB.DeprecatedObject,
    EndpointError: () => QB.EndpointError,
    EndpointObject: () => QB.EndpointObject,
    EndpointObjectHeaders: () => QB.EndpointObjectHeaders,
    EndpointObjectProperties: () => QB.EndpointObjectProperties,
    EndpointParams: () => QB.EndpointParams,
    EndpointResolverOptions: () => QB.EndpointResolverOptions,
    EndpointRuleObject: () => QB.EndpointRuleObject,
    ErrorRuleObject: () => QB.ErrorRuleObject,
    EvaluateOptions: () => QB.EvaluateOptions,
    Expression: () => QB.Expression,
    FunctionArgv: () => QB.FunctionArgv,
    FunctionObject: () => QB.FunctionObject,
    FunctionReturn: () => QB.FunctionReturn,
    ParameterObject: () => QB.ParameterObject,
    ReferenceObject: () => QB.ReferenceObject,
    ReferenceRecord: () => QB.ReferenceRecord,
    RuleSetObject: () => QB.RuleSetObject,
    RuleSetRules: () => QB.RuleSetRules,
    TreeRuleObject: () => QB.TreeRuleObject,
    awsEndpointFunctions: () => SiA,
    getUserAgentPrefix: () => H34,
    isIpAddress: () => QB.isIpAddress,
    partition: () => TiA,
    resolveEndpoint: () => QB.resolveEndpoint,
    setPartitionInfo: () => PiA,
    useDefaultPartitionInfo: () => K34
  });
  _iA.exports = X34(qiA);
  var QB = LL(),
    MiA = Fb((A, B = !1) => {
      if (B) {
        for (let Q of A.split("."))
          if (!MiA(Q)) return !1;
        return !0
      }
      if (!QB.isValidHostLabel(A)) return !1;
      if (A.length < 3 || A.length > 63) return !1;
      if (A !== A.toLowerCase()) return !1;
      if (QB.isIpAddress(A)) return !1;
      return !0
    }, "isVirtualHostableS3Bucket"),
    $iA = ":",
    V34 = "/",
    C34 = Fb((A) => {
      let B = A.split($iA);
      if (B.length < 6) return null;
      let [Q, I, G, Z, D, ...Y] = B;
      if (Q !== "arn" || I === "" || G === "" || Y.join($iA) === "") return null;
      let W = Y.map((J) => J.split(V34)).flat();
      return {
        partition: I,
        service: G,
        region: Z,
        accountId: D,
        resourceId: W
      }
    }, "parseArn"),
    LiA = {
      partitions: [{
        id: "aws",
        outputs: {
          dnsSuffix: "amazonaws.com",
          dualStackDnsSuffix: "api.aws",
          implicitGlobalRegion: "us-east-1",
          name: "aws",
          supportsDualStack: !0,
          supportsFIPS: !0
        },
        regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$",
        regions: {
          "af-south-1": {
            description: "Africa (Cape Town)"
          },
          "ap-east-1": {
            description: "Asia Pacific (Hong Kong)"
          },
          "ap-northeast-1": {
            description: "Asia Pacific (Tokyo)"
          },
          "ap-northeast-2": {
            description: "Asia Pacific (Seoul)"
          },
          "ap-northeast-3": {
            description: "Asia Pacific (Osaka)"
          },
          "ap-south-1": {
            description: "Asia Pacific (Mumbai)"
          },
          "ap-south-2": {
            description: "Asia Pacific (Hyderabad)"
          },
          "ap-southeast-1": {
            description: "Asia Pacific (Singapore)"
          },
          "ap-southeast-2": {
            description: "Asia Pacific (Sydney)"
          },
          "ap-southeast-3": {
            description: "Asia Pacific (Jakarta)"
          },
          "ap-southeast-4": {
            description: "Asia Pacific (Melbourne)"
          },
          "ap-southeast-5": {
            description: "Asia Pacific (Malaysia)"
          },
          "ap-southeast-7": {
            description: "Asia Pacific (Thailand)"
          },
          "aws-global": {
            description: "AWS Standard global region"
          },
          "ca-central-1": {
            description: "Canada (Central)"
          },
          "ca-west-1": {
            description: "Canada West (Calgary)"
          },
          "eu-central-1": {
            description: "Europe (Frankfurt)"
          },
          "eu-central-2": {
            description: "Europe (Zurich)"
          },
          "eu-north-1": {
            description: "Europe (Stockholm)"
          },
          "eu-south-1": {
            description: "Europe (Milan)"
          },
          "eu-south-2": {
            description: "Europe (Spain)"
          },
          "eu-west-1": {
            description: "Europe (Ireland)"
          },
          "eu-west-2": {
            description: "Europe (London)"
          },
          "eu-west-3": {
            description: "Europe (Paris)"
          },
          "il-central-1": {
            description: "Israel (Tel Aviv)"
          },
          "me-central-1": {
            description: "Middle East (UAE)"
          },
          "me-south-1": {
            description: "Middle East (Bahrain)"
          },
          "mx-central-1": {
            description: "Mexico (Central)"
          },
          "sa-east-1": {
            description: "South America (Sao Paulo)"
          },
          "us-east-1": {
            description: "US East (N. Virginia)"
          },
          "us-east-2": {
            description: "US East (Ohio)"
          },
          "us-west-1": {
            description: "US West (N. California)"
          },
          "us-west-2": {
            description: "US West (Oregon)"
          }
        }
      }, {
        id: "aws-cn",
        outputs: {
          dnsSuffix: "amazonaws.com.cn",
          dualStackDnsSuffix: "api.amazonwebservices.com.cn",
          implicitGlobalRegion: "cn-northwest-1",
          name: "aws-cn",
          supportsDualStack: !0,
          supportsFIPS: !0
        },
        regionRegex: "^cn\\-\\w+\\-\\d+$",
        regions: {
          "aws-cn-global": {
            description: "AWS China global region"
          },
          "cn-north-1": {
            description: "China (Beijing)"
          },
          "cn-northwest-1": {
            description: "China (Ningxia)"
          }
        }
      }, {
        id: "aws-us-gov",
        outputs: {
          dnsSuffix: "amazonaws.com",
          dualStackDnsSuffix: "api.aws",
          implicitGlobalRegion: "us-gov-west-1",
          name: "aws-us-gov",
          supportsDualStack: !0,
          supportsFIPS: !0
        },
        regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
        regions: {
          "aws-us-gov-global": {
            description: "AWS GovCloud (US) global region"
          },
          "us-gov-east-1": {
            description: "AWS GovCloud (US-East)"
          },
          "us-gov-west-1": {
            description: "AWS GovCloud (US-West)"
          }
        }
      }, {
        id: "aws-iso",
        outputs: {
          dnsSuffix: "c2s.ic.gov",
          dualStackDnsSuffix: "c2s.ic.gov",
          implicitGlobalRegion: "us-iso-east-1",
          name: "aws-iso",
          supportsDualStack: !1,
          supportsFIPS: !0
        },
        regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-global": {
            description: "AWS ISO (US) global region"
          },
          "us-iso-east-1": {
            description: "US ISO East"
          },
          "us-iso-west-1": {
            description: "US ISO WEST"
          }
        }
      }, {
        id: "aws-iso-b",
        outputs: {
          dnsSuffix: "sc2s.sgov.gov",
          dualStackDnsSuffix: "sc2s.sgov.gov",
          implicitGlobalRegion: "us-isob-east-1",
          name: "aws-iso-b",
          supportsDualStack: !1,
          supportsFIPS: !0
        },
        regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-b-global": {
            description: "AWS ISOB (US) global region"
          },
          "us-isob-east-1": {
            description: "US ISOB East (Ohio)"
          }
        }
      }, {
        id: "aws-iso-e",
        outputs: {
          dnsSuffix: "cloud.adc-e.uk",
          dualStackDnsSuffix: "cloud.adc-e.uk",
          implicitGlobalRegion: "eu-isoe-west-1",
          name: "aws-iso-e",
          supportsDualStack: !1,
          supportsFIPS: !0
        },
        regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-e-global": {
            description: "AWS ISOE (Europe) global region"
          },
          "eu-isoe-west-1": {
            description: "EU ISOE West"
          }
        }
      }, {
        id: "aws-iso-f",
        outputs: {
          dnsSuffix: "csp.hci.ic.gov",
          dualStackDnsSuffix: "csp.hci.ic.gov",
          implicitGlobalRegion: "us-isof-south-1",
          name: "aws-iso-f",
          supportsDualStack: !1,
          supportsFIPS: !0
        },
        regionRegex: "^us\\-isof\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-f-global": {
            description: "AWS ISOF global region"
          },
          "us-isof-east-1": {
            description: "US ISOF EAST"
          },
          "us-isof-south-1": {
            description: "US ISOF SOUTH"
          }
        }
      }, {
        id: "aws-eusc",
        outputs: {
          dnsSuffix: "amazonaws.eu",
          dualStackDnsSuffix: "amazonaws.eu",
          implicitGlobalRegion: "eusc-de-east-1",
          name: "aws-eusc",
          supportsDualStack: !1,
          supportsFIPS: !0
        },
        regionRegex: "^eusc\\-(de)\\-\\w+\\-\\d+$",
        regions: {
          "eusc-de-east-1": {
            description: "EU (Germany)"
          }
        }
      }],
      version: "1.1"
    },
    RiA = LiA,
    OiA = "",
    TiA = Fb((A) => {
      let {
        partitions: B
      } = RiA;
      for (let I of B) {
        let {
          regions: G,
          outputs: Z
        } = I;
        for (let [D, Y] of Object.entries(G))
          if (D === A) return {
            ...Z,
            ...Y
          }
      }
      for (let I of B) {
        let {
          regionRegex: G,
          outputs: Z
        } = I;
        if (new RegExp(G).test(A)) return {
          ...Z
        }
      }
      let Q = B.find((I) => I.id === "aws");
      if (!Q) throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
      return {
        ...Q.outputs
      }
    }, "partition"),
    PiA = Fb((A, B = "") => {
      RiA = A, OiA = B
    }, "setPartitionInfo"),
    K34 = Fb(() => {
      PiA(LiA, "")
    }, "useDefaultPartitionInfo"),
    H34 = Fb(() => OiA, "getUserAgentPrefix"),
    SiA = {
      isVirtualHostableS3Bucket: MiA,
      parseArn: C34,
      partition: TiA
    };
  QB.customEndpointFunctions.aws = SiA
})
// @from(Start 3175260, End 3178043)
miA = z((bQ8, hiA) => {
  var {
    defineProperty: yQ1,
    getOwnPropertyDescriptor: z34,
    getOwnPropertyNames: w34
  } = Object, E34 = Object.prototype.hasOwnProperty, kQ1 = (A, B) => yQ1(A, "name", {
    value: B,
    configurable: !0
  }), U34 = (A, B) => {
    for (var Q in B) yQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, N34 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of w34(B))
        if (!E34.call(A, G) && G !== Q) yQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = z34(B, G)) || I.enumerable
        })
    }
    return A
  }, $34 = (A) => N34(yQ1({}, "__esModule", {
    value: !0
  }), A), jiA = {};
  U34(jiA, {
    AlgorithmId: () => fiA,
    EndpointURLScheme: () => xiA,
    FieldPosition: () => viA,
    HttpApiKeyAuthLocation: () => kiA,
    HttpAuthLocation: () => yiA,
    IniSectionType: () => biA,
    RequestHandlerProtocol: () => giA,
    SMITHY_CONTEXT_KEY: () => O34,
    getDefaultClientConfiguration: () => L34,
    resolveDefaultRuntimeConfig: () => R34
  });
  hiA.exports = $34(jiA);
  var yiA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(yiA || {}),
    kiA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(kiA || {}),
    xiA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(xiA || {}),
    fiA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(fiA || {}),
    q34 = kQ1((A) => {
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
    M34 = kQ1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    L34 = kQ1((A) => {
      return q34(A)
    }, "getDefaultClientConfiguration"),
    R34 = kQ1((A) => {
      return M34(A)
    }, "resolveDefaultRuntimeConfig"),
    viA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(viA || {}),
    O34 = "__smithy_context",
    biA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(biA || {}),
    giA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(giA || {})
})
// @from(Start 3178049, End 3182556)
iiA = z((gQ8, liA) => {
  var {
    defineProperty: xQ1,
    getOwnPropertyDescriptor: T34,
    getOwnPropertyNames: P34
  } = Object, S34 = Object.prototype.hasOwnProperty, OL = (A, B) => xQ1(A, "name", {
    value: B,
    configurable: !0
  }), _34 = (A, B) => {
    for (var Q in B) xQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, j34 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of P34(B))
        if (!S34.call(A, G) && G !== Q) xQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = T34(B, G)) || I.enumerable
        })
    }
    return A
  }, y34 = (A) => j34(xQ1({}, "__esModule", {
    value: !0
  }), A), diA = {};
  _34(diA, {
    Field: () => f34,
    Fields: () => v34,
    HttpRequest: () => b34,
    HttpResponse: () => g34,
    IHttpRequest: () => uiA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => k34,
    isValidHostname: () => ciA,
    resolveHttpHandlerRuntimeConfig: () => x34
  });
  liA.exports = y34(diA);
  var k34 = OL((A) => {
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
    x34 = OL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    uiA = miA(),
    f34 = class {
      static {
        OL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = uiA.FieldPosition.HEADER,
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
    v34 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        OL(this, "Fields")
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
    b34 = class A {
      static {
        OL(this, "HttpRequest")
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
        if (Q.query) Q.query = piA(Q.query);
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

  function piA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  OL(piA, "cloneQuery");
  var g34 = class {
    static {
      OL(this, "HttpResponse")
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

  function ciA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  OL(ciA, "isValidHostname")
})