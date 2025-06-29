
// @from(Start 5505649, End 5509786)
qp1 = z((oR8, du0) => {
  var {
    kProxy: vH6,
    kClose: bH6,
    kDestroy: gH6,
    kInterceptors: hH6
  } = A3(), {
    URL: Io
  } = Z1("node:url"), mH6 = ih(), dH6 = lh(), uH6 = Sh(), {
    InvalidArgumentError: YW1,
    RequestAbortedError: pH6,
    SecureProxyConnectionError: cH6
  } = u5(), bu0 = xr(), ZW1 = Symbol("proxy agent"), DW1 = Symbol("proxy client"), Go = Symbol("proxy headers"), $p1 = Symbol("request tls settings"), gu0 = Symbol("proxy tls settings"), hu0 = Symbol("connect endpoint function");

  function lH6(A) {
    return A === "https:" ? 443 : 80
  }

  function iH6(A, B) {
    return new dH6(A, B)
  }
  var nH6 = () => {};
  class mu0 extends uH6 {
    constructor(A) {
      super();
      if (!A || typeof A === "object" && !(A instanceof Io) && !A.uri) throw new YW1("Proxy uri is mandatory");
      let {
        clientFactory: B = iH6
      } = A;
      if (typeof B !== "function") throw new YW1("Proxy opts.clientFactory must be a function.");
      let Q = this.#A(A),
        {
          href: I,
          origin: G,
          port: Z,
          protocol: D,
          username: Y,
          password: W,
          hostname: J
        } = Q;
      if (this[vH6] = {
          uri: I,
          protocol: D
        }, this[hH6] = A.interceptors?.ProxyAgent && Array.isArray(A.interceptors.ProxyAgent) ? A.interceptors.ProxyAgent : [], this[$p1] = A.requestTls, this[gu0] = A.proxyTls, this[Go] = A.headers || {}, A.auth && A.token) throw new YW1("opts.auth cannot be used in combination with opts.token");
      else if (A.auth) this[Go]["proxy-authorization"] = `Basic ${A.auth}`;
      else if (A.token) this[Go]["proxy-authorization"] = A.token;
      else if (Y && W) this[Go]["proxy-authorization"] = `Basic ${Buffer.from(`${decodeURIComponent(Y)}:${decodeURIComponent(W)}`).toString("base64")}`;
      let F = bu0({
        ...A.proxyTls
      });
      this[hu0] = bu0({
        ...A.requestTls
      }), this[DW1] = B(Q, {
        connect: F
      }), this[ZW1] = new mH6({
        ...A,
        connect: async (X, V) => {
          let C = X.host;
          if (!X.port) C += `:${lH6(X.protocol)}`;
          try {
            let {
              socket: K,
              statusCode: E
            } = await this[DW1].connect({
              origin: G,
              port: Z,
              path: C,
              signal: X.signal,
              headers: {
                ...this[Go],
                host: X.host
              },
              servername: this[gu0]?.servername || J
            });
            if (E !== 200) K.on("error", nH6).destroy(), V(new pH6(`Proxy response (${E}) !== 200 when HTTP Tunneling`));
            if (X.protocol !== "https:") {
              V(null, K);
              return
            }
            let N;
            if (this[$p1]) N = this[$p1].servername;
            else N = X.servername;
            this[hu0]({
              ...X,
              servername: N,
              httpSocket: K
            }, V)
          } catch (K) {
            if (K.code === "ERR_TLS_CERT_ALTNAME_INVALID") V(new cH6(K));
            else V(K)
          }
        }
      })
    }
    dispatch(A, B) {
      let Q = aH6(A.headers);
      if (sH6(Q), Q && !("host" in Q) && !("Host" in Q)) {
        let {
          host: I
        } = new Io(A.origin);
        Q.host = I
      }
      return this[ZW1].dispatch({
        ...A,
        headers: Q
      }, B)
    }
    #A(A) {
      if (typeof A === "string") return new Io(A);
      else if (A instanceof Io) return A;
      else return new Io(A.uri)
    }
    async [bH6]() {
      await this[ZW1].close(), await this[DW1].close()
    }
    async [gH6]() {
      await this[ZW1].destroy(), await this[DW1].destroy()
    }
  }

  function aH6(A) {
    if (Array.isArray(A)) {
      let B = {};
      for (let Q = 0; Q < A.length; Q += 2) B[A[Q]] = A[Q + 1];
      return B
    }
    return A
  }

  function sH6(A) {
    if (A && Object.keys(A).find((Q) => Q.toLowerCase() === "proxy-authorization")) throw new YW1("Proxy-Authorization should be sent in ProxyAgent constructor")
  }
  du0.exports = mu0
})
// @from(Start 5509792, End 5512673)
au0 = z((tR8, nu0) => {
  var rH6 = Sh(),
    {
      kClose: oH6,
      kDestroy: tH6,
      kClosed: uu0,
      kDestroyed: pu0,
      kDispatch: eH6,
      kNoProxyAgent: Zo,
      kHttpProxyAgent: kR,
      kHttpsProxyAgent: wj
    } = A3(),
    cu0 = qp1(),
    Az6 = ih(),
    Bz6 = {
      "http:": 80,
      "https:": 443
    },
    lu0 = !1;
  class iu0 extends rH6 {
    #A = null;
    #B = null;
    #Q = null;
    constructor(A = {}) {
      super();
      if (this.#Q = A, !lu0) lu0 = !0, process.emitWarning("EnvHttpProxyAgent is experimental, expect them to change at any time.", {
        code: "UNDICI-EHPA"
      });
      let {
        httpProxy: B,
        httpsProxy: Q,
        noProxy: I,
        ...G
      } = A;
      this[Zo] = new Az6(G);
      let Z = B ?? process.env.http_proxy ?? process.env.HTTP_PROXY;
      if (Z) this[kR] = new cu0({
        ...G,
        uri: Z
      });
      else this[kR] = this[Zo];
      let D = Q ?? process.env.https_proxy ?? process.env.HTTPS_PROXY;
      if (D) this[wj] = new cu0({
        ...G,
        uri: D
      });
      else this[wj] = this[kR];
      this.#W()
    } [eH6](A, B) {
      let Q = new URL(A.origin);
      return this.#I(Q).dispatch(A, B)
    }
    async [oH6]() {
      if (await this[Zo].close(), !this[kR][uu0]) await this[kR].close();
      if (!this[wj][uu0]) await this[wj].close()
    }
    async [tH6](A) {
      if (await this[Zo].destroy(A), !this[kR][pu0]) await this[kR].destroy(A);
      if (!this[wj][pu0]) await this[wj].destroy(A)
    }
    #I(A) {
      let {
        protocol: B,
        host: Q,
        port: I
      } = A;
      if (Q = Q.replace(/:\d*$/, "").toLowerCase(), I = Number.parseInt(I, 10) || Bz6[B] || 0, !this.#G(Q, I)) return this[Zo];
      if (B === "https:") return this[wj];
      return this[kR]
    }
    #G(A, B) {
      if (this.#Z) this.#W();
      if (this.#B.length === 0) return !0;
      if (this.#A === "*") return !1;
      for (let Q = 0; Q < this.#B.length; Q++) {
        let I = this.#B[Q];
        if (I.port && I.port !== B) continue;
        if (!/^[.*]/.test(I.hostname)) {
          if (A === I.hostname) return !1
        } else if (A.endsWith(I.hostname.replace(/^\*/, ""))) return !1
      }
      return !0
    }
    #W() {
      let A = this.#Q.noProxy ?? this.#F,
        B = A.split(/[,\s]/),
        Q = [];
      for (let I = 0; I < B.length; I++) {
        let G = B[I];
        if (!G) continue;
        let Z = G.match(/^(.+):(\d+)$/);
        Q.push({
          hostname: (Z ? Z[1] : G).toLowerCase(),
          port: Z ? Number.parseInt(Z[2], 10) : 0
        })
      }
      this.#A = A, this.#B = Q
    }
    get #Z() {
      if (this.#Q.noProxy !== void 0) return !1;
      return this.#A !== this.#F
    }
    get #F() {
      return process.env.no_proxy ?? process.env.NO_PROXY ?? ""
    }
  }
  nu0.exports = iu0
})
// @from(Start 5512679, End 5519367)
WW1 = z((eR8, tu0) => {
  var nh = Z1("node:assert"),
    {
      kRetryHandlerDefaultRetry: su0
    } = A3(),
    {
      RequestRetryError: Do
    } = u5(),
    {
      isDisturbed: ru0,
      parseHeaders: Qz6,
      parseRangeHeader: ou0,
      wrapRequestBody: Iz6
    } = C6();

  function Gz6(A) {
    let B = Date.now();
    return new Date(A).getTime() - B
  }
  class Mp1 {
    constructor(A, B) {
      let {
        retryOptions: Q,
        ...I
      } = A, {
        retry: G,
        maxRetries: Z,
        maxTimeout: D,
        minTimeout: Y,
        timeoutFactor: W,
        methods: J,
        errorCodes: F,
        retryAfter: X,
        statusCodes: V
      } = Q ?? {};
      this.dispatch = B.dispatch, this.handler = B.handler, this.opts = {
        ...I,
        body: Iz6(A.body)
      }, this.abort = null, this.aborted = !1, this.retryOpts = {
        retry: G ?? Mp1[su0],
        retryAfter: X ?? !0,
        maxTimeout: D ?? 30000,
        minTimeout: Y ?? 500,
        timeoutFactor: W ?? 2,
        maxRetries: Z ?? 5,
        methods: J ?? ["GET", "HEAD", "OPTIONS", "PUT", "DELETE", "TRACE"],
        statusCodes: V ?? [500, 502, 503, 504, 429],
        errorCodes: F ?? ["ECONNRESET", "ECONNREFUSED", "ENOTFOUND", "ENETDOWN", "ENETUNREACH", "EHOSTDOWN", "EHOSTUNREACH", "EPIPE", "UND_ERR_SOCKET"]
      }, this.retryCount = 0, this.retryCountCheckpoint = 0, this.start = 0, this.end = null, this.etag = null, this.resume = null, this.handler.onConnect((C) => {
        if (this.aborted = !0, this.abort) this.abort(C);
        else this.reason = C
      })
    }
    onRequestSent() {
      if (this.handler.onRequestSent) this.handler.onRequestSent()
    }
    onUpgrade(A, B, Q) {
      if (this.handler.onUpgrade) this.handler.onUpgrade(A, B, Q)
    }
    onConnect(A) {
      if (this.aborted) A(this.reason);
      else this.abort = A
    }
    onBodySent(A) {
      if (this.handler.onBodySent) return this.handler.onBodySent(A)
    }
    static[su0](A, {
      state: B,
      opts: Q
    }, I) {
      let {
        statusCode: G,
        code: Z,
        headers: D
      } = A, {
        method: Y,
        retryOptions: W
      } = Q, {
        maxRetries: J,
        minTimeout: F,
        maxTimeout: X,
        timeoutFactor: V,
        statusCodes: C,
        errorCodes: K,
        methods: E
      } = W, {
        counter: N
      } = B;
      if (Z && Z !== "UND_ERR_REQ_RETRY" && !K.includes(Z)) {
        I(A);
        return
      }
      if (Array.isArray(E) && !E.includes(Y)) {
        I(A);
        return
      }
      if (G != null && Array.isArray(C) && !C.includes(G)) {
        I(A);
        return
      }
      if (N > J) {
        I(A);
        return
      }
      let q = D?.["retry-after"];
      if (q) q = Number(q), q = Number.isNaN(q) ? Gz6(q) : q * 1000;
      let O = q > 0 ? Math.min(q, X) : Math.min(F * V ** (N - 1), X);
      setTimeout(() => I(null), O)
    }
    onHeaders(A, B, Q, I) {
      let G = Qz6(B);
      if (this.retryCount += 1, A >= 300)
        if (this.retryOpts.statusCodes.includes(A) === !1) return this.handler.onHeaders(A, B, Q, I);
        else return this.abort(new Do("Request failed", A, {
          headers: G,
          data: {
            count: this.retryCount
          }
        })), !1;
      if (this.resume != null) {
        if (this.resume = null, A !== 206 && (this.start > 0 || A !== 200)) return this.abort(new Do("server does not support the range header and the payload was partially consumed", A, {
          headers: G,
          data: {
            count: this.retryCount
          }
        })), !1;
        let D = ou0(G["content-range"]);
        if (!D) return this.abort(new Do("Content-Range mismatch", A, {
          headers: G,
          data: {
            count: this.retryCount
          }
        })), !1;
        if (this.etag != null && this.etag !== G.etag) return this.abort(new Do("ETag mismatch", A, {
          headers: G,
          data: {
            count: this.retryCount
          }
        })), !1;
        let {
          start: Y,
          size: W,
          end: J = W - 1
        } = D;
        return nh(this.start === Y, "content-range mismatch"), nh(this.end == null || this.end === J, "content-range mismatch"), this.resume = Q, !0
      }
      if (this.end == null) {
        if (A === 206) {
          let D = ou0(G["content-range"]);
          if (D == null) return this.handler.onHeaders(A, B, Q, I);
          let {
            start: Y,
            size: W,
            end: J = W - 1
          } = D;
          nh(Y != null && Number.isFinite(Y), "content-range mismatch"), nh(J != null && Number.isFinite(J), "invalid content-length"), this.start = Y, this.end = J
        }
        if (this.end == null) {
          let D = G["content-length"];
          this.end = D != null ? Number(D) - 1 : null
        }
        if (nh(Number.isFinite(this.start)), nh(this.end == null || Number.isFinite(this.end), "invalid content-length"), this.resume = Q, this.etag = G.etag != null ? G.etag : null, this.etag != null && this.etag.startsWith("W/")) this.etag = null;
        return this.handler.onHeaders(A, B, Q, I)
      }
      let Z = new Do("Request failed", A, {
        headers: G,
        data: {
          count: this.retryCount
        }
      });
      return this.abort(Z), !1
    }
    onData(A) {
      return this.start += A.length, this.handler.onData(A)
    }
    onComplete(A) {
      return this.retryCount = 0, this.handler.onComplete(A)
    }
    onError(A) {
      if (this.aborted || ru0(this.opts.body)) return this.handler.onError(A);
      if (this.retryCount - this.retryCountCheckpoint > 0) this.retryCount = this.retryCountCheckpoint + (this.retryCount - this.retryCountCheckpoint);
      else this.retryCount += 1;
      this.retryOpts.retry(A, {
        state: {
          counter: this.retryCount
        },
        opts: {
          retryOptions: this.retryOpts,
          ...this.opts
        }
      }, B.bind(this));

      function B(Q) {
        if (Q != null || this.aborted || ru0(this.opts.body)) return this.handler.onError(Q);
        if (this.start !== 0) {
          let I = {
            range: `bytes=${this.start}-${this.end??""}`
          };
          if (this.etag != null) I["if-match"] = this.etag;
          this.opts = {
            ...this.opts,
            headers: {
              ...this.opts.headers,
              ...I
            }
          }
        }
        try {
          this.retryCountCheckpoint = this.retryCount, this.dispatch(this.opts, this)
        } catch (I) {
          this.handler.onError(I)
        }
      }
    }
  }
  tu0.exports = Mp1
})
// @from(Start 5519373, End 5519919)
Bp0 = z((AO8, Ap0) => {
  var Zz6 = yr(),
    Dz6 = WW1();
  class eu0 extends Zz6 {
    #A = null;
    #B = null;
    constructor(A, B = {}) {
      super(B);
      this.#A = A, this.#B = B
    }
    dispatch(A, B) {
      let Q = new Dz6({
        ...A,
        retryOptions: this.#B
      }, {
        dispatch: this.#A.dispatch.bind(this.#A),
        handler: B
      });
      return this.#A.dispatch(A, Q)
    }
    close() {
      return this.#A.close()
    }
    destroy() {
      return this.#A.destroy()
    }
  }
  Ap0.exports = eu0
})
// @from(Start 5519925, End 5525757)
Pp1 = z((BO8, Xp0) => {
  var Dp0 = Z1("node:assert"),
    {
      Readable: Yz6
    } = Z1("node:stream"),
    {
      RequestAbortedError: Yp0,
      NotSupportedError: Wz6,
      InvalidArgumentError: Jz6,
      AbortError: Lp1
    } = u5(),
    Wp0 = C6(),
    {
      ReadableStreamFrom: Fz6
    } = C6(),
    LJ = Symbol("kConsume"),
    Yo = Symbol("kReading"),
    xR = Symbol("kBody"),
    Qp0 = Symbol("kAbort"),
    Jp0 = Symbol("kContentType"),
    Ip0 = Symbol("kContentLength"),
    Xz6 = () => {};
  class Fp0 extends Yz6 {
    constructor({
      resume: A,
      abort: B,
      contentType: Q = "",
      contentLength: I,
      highWaterMark: G = 65536
    }) {
      super({
        autoDestroy: !0,
        read: A,
        highWaterMark: G
      });
      this._readableState.dataEmitted = !1, this[Qp0] = B, this[LJ] = null, this[xR] = null, this[Jp0] = Q, this[Ip0] = I, this[Yo] = !1
    }
    destroy(A) {
      if (!A && !this._readableState.endEmitted) A = new Yp0;
      if (A) this[Qp0]();
      return super.destroy(A)
    }
    _destroy(A, B) {
      if (!this[Yo]) setImmediate(() => {
        B(A)
      });
      else B(A)
    }
    on(A, ...B) {
      if (A === "data" || A === "readable") this[Yo] = !0;
      return super.on(A, ...B)
    }
    addListener(A, ...B) {
      return this.on(A, ...B)
    }
    off(A, ...B) {
      let Q = super.off(A, ...B);
      if (A === "data" || A === "readable") this[Yo] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0;
      return Q
    }
    removeListener(A, ...B) {
      return this.off(A, ...B)
    }
    push(A) {
      if (this[LJ] && A !== null) return Op1(this[LJ], A), this[Yo] ? super.push(A) : !0;
      return super.push(A)
    }
    async text() {
      return Wo(this, "text")
    }
    async json() {
      return Wo(this, "json")
    }
    async blob() {
      return Wo(this, "blob")
    }
    async bytes() {
      return Wo(this, "bytes")
    }
    async arrayBuffer() {
      return Wo(this, "arrayBuffer")
    }
    async formData() {
      throw new Wz6
    }
    get bodyUsed() {
      return Wp0.isDisturbed(this)
    }
    get body() {
      if (!this[xR]) {
        if (this[xR] = Fz6(this), this[LJ]) this[xR].getReader(), Dp0(this[xR].locked)
      }
      return this[xR]
    }
    async dump(A) {
      let B = Number.isFinite(A?.limit) ? A.limit : 131072,
        Q = A?.signal;
      if (Q != null && (typeof Q !== "object" || !("aborted" in Q))) throw new Jz6("signal must be an AbortSignal");
      if (Q?.throwIfAborted(), this._readableState.closeEmitted) return null;
      return await new Promise((I, G) => {
        if (this[Ip0] > B) this.destroy(new Lp1);
        let Z = () => {
          this.destroy(Q.reason ?? new Lp1)
        };
        Q?.addEventListener("abort", Z), this.on("close", function() {
          if (Q?.removeEventListener("abort", Z), Q?.aborted) G(Q.reason ?? new Lp1);
          else I(null)
        }).on("error", Xz6).on("data", function(D) {
          if (B -= D.length, B <= 0) this.destroy()
        }).resume()
      })
    }
  }

  function Vz6(A) {
    return A[xR] && A[xR].locked === !0 || A[LJ]
  }

  function Cz6(A) {
    return Wp0.isDisturbed(A) || Vz6(A)
  }
  async function Wo(A, B) {
    return Dp0(!A[LJ]), new Promise((Q, I) => {
      if (Cz6(A)) {
        let G = A._readableState;
        if (G.destroyed && G.closeEmitted === !1) A.on("error", (Z) => {
          I(Z)
        }).on("close", () => {
          I(new TypeError("unusable"))
        });
        else I(G.errored ?? new TypeError("unusable"))
      } else queueMicrotask(() => {
        A[LJ] = {
          type: B,
          stream: A,
          resolve: Q,
          reject: I,
          length: 0,
          body: []
        }, A.on("error", function(G) {
          Tp1(this[LJ], G)
        }).on("close", function() {
          if (this[LJ].body !== null) Tp1(this[LJ], new Yp0)
        }), Kz6(A[LJ])
      })
    })
  }

  function Kz6(A) {
    if (A.body === null) return;
    let {
      _readableState: B
    } = A.stream;
    if (B.bufferIndex) {
      let Q = B.bufferIndex,
        I = B.buffer.length;
      for (let G = Q; G < I; G++) Op1(A, B.buffer[G])
    } else
      for (let Q of B.buffer) Op1(A, Q);
    if (B.endEmitted) Zp0(this[LJ]);
    else A.stream.on("end", function() {
      Zp0(this[LJ])
    });
    A.stream.resume();
    while (A.stream.read() != null);
  }

  function Rp1(A, B) {
    if (A.length === 0 || B === 0) return "";
    let Q = A.length === 1 ? A[0] : Buffer.concat(A, B),
      I = Q.length,
      G = I > 2 && Q[0] === 239 && Q[1] === 187 && Q[2] === 191 ? 3 : 0;
    return Q.utf8Slice(G, I)
  }

  function Gp0(A, B) {
    if (A.length === 0 || B === 0) return new Uint8Array(0);
    if (A.length === 1) return new Uint8Array(A[0]);
    let Q = new Uint8Array(Buffer.allocUnsafeSlow(B).buffer),
      I = 0;
    for (let G = 0; G < A.length; ++G) {
      let Z = A[G];
      Q.set(Z, I), I += Z.length
    }
    return Q
  }

  function Zp0(A) {
    let {
      type: B,
      body: Q,
      resolve: I,
      stream: G,
      length: Z
    } = A;
    try {
      if (B === "text") I(Rp1(Q, Z));
      else if (B === "json") I(JSON.parse(Rp1(Q, Z)));
      else if (B === "arrayBuffer") I(Gp0(Q, Z).buffer);
      else if (B === "blob") I(new Blob(Q, {
        type: G[Jp0]
      }));
      else if (B === "bytes") I(Gp0(Q, Z));
      Tp1(A)
    } catch (D) {
      G.destroy(D)
    }
  }

  function Op1(A, B) {
    A.length += B.length, A.body.push(B)
  }

  function Tp1(A, B) {
    if (A.body === null) return;
    if (B) A.reject(B);
    else A.resolve();
    A.type = null, A.stream = null, A.resolve = null, A.reject = null, A.length = 0, A.body = null
  }
  Xp0.exports = {
    Readable: Fp0,
    chunksDecode: Rp1
  }
})
// @from(Start 5525763, End 5527283)
Sp1 = z((QO8, zp0) => {
  var Hz6 = Z1("node:assert"),
    {
      ResponseStatusCodeError: Vp0
    } = u5(),
    {
      chunksDecode: Cp0
    } = Pp1();
  async function zz6({
    callback: A,
    body: B,
    contentType: Q,
    statusCode: I,
    statusMessage: G,
    headers: Z
  }) {
    Hz6(B);
    let D = [],
      Y = 0;
    try {
      for await (let X of B) if (D.push(X), Y += X.length, Y > 131072) {
        D = [], Y = 0;
        break
      }
    } catch {
      D = [], Y = 0
    }
    let W = `Response status code ${I}${G?`: ${G}`:""}`;
    if (I === 204 || !Q || !Y) {
      queueMicrotask(() => A(new Vp0(W, I, Z)));
      return
    }
    let J = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    let F;
    try {
      if (Kp0(Q)) F = JSON.parse(Cp0(D, Y));
      else if (Hp0(Q)) F = Cp0(D, Y)
    } catch {} finally {
      Error.stackTraceLimit = J
    }
    queueMicrotask(() => A(new Vp0(W, I, Z, F)))
  }
  var Kp0 = (A) => {
      return A.length > 15 && A[11] === "/" && A[0] === "a" && A[1] === "p" && A[2] === "p" && A[3] === "l" && A[4] === "i" && A[5] === "c" && A[6] === "a" && A[7] === "t" && A[8] === "i" && A[9] === "o" && A[10] === "n" && A[12] === "j" && A[13] === "s" && A[14] === "o" && A[15] === "n"
    },
    Hp0 = (A) => {
      return A.length > 4 && A[4] === "/" && A[0] === "t" && A[1] === "e" && A[2] === "x" && A[3] === "t"
    };
  zp0.exports = {
    getResolveErrorBodyCallback: zz6,
    isContentTypeApplicationJson: Kp0,
    isContentTypeText: Hp0
  }
})
// @from(Start 5527289, End 5532026)
Up0 = z((IO8, jp1) => {
  var wz6 = Z1("node:assert"),
    {
      Readable: Ez6
    } = Pp1(),
    {
      InvalidArgumentError: ah,
      RequestAbortedError: wp0
    } = u5(),
    RJ = C6(),
    {
      getResolveErrorBodyCallback: Uz6
    } = Sp1(),
    {
      AsyncResource: Nz6
    } = Z1("node:async_hooks");
  class _p1 extends Nz6 {
    constructor(A, B) {
      if (!A || typeof A !== "object") throw new ah("invalid opts");
      let {
        signal: Q,
        method: I,
        opaque: G,
        body: Z,
        onInfo: D,
        responseHeaders: Y,
        throwOnError: W,
        highWaterMark: J
      } = A;
      try {
        if (typeof B !== "function") throw new ah("invalid callback");
        if (J && (typeof J !== "number" || J < 0)) throw new ah("invalid highWaterMark");
        if (Q && typeof Q.on !== "function" && typeof Q.addEventListener !== "function") throw new ah("signal must be an EventEmitter or EventTarget");
        if (I === "CONNECT") throw new ah("invalid method");
        if (D && typeof D !== "function") throw new ah("invalid onInfo callback");
        super("UNDICI_REQUEST")
      } catch (F) {
        if (RJ.isStream(Z)) RJ.destroy(Z.on("error", RJ.nop), F);
        throw F
      }
      if (this.method = I, this.responseHeaders = Y || null, this.opaque = G || null, this.callback = B, this.res = null, this.abort = null, this.body = Z, this.trailers = {}, this.context = null, this.onInfo = D || null, this.throwOnError = W, this.highWaterMark = J, this.signal = Q, this.reason = null, this.removeAbortListener = null, RJ.isStream(Z)) Z.on("error", (F) => {
        this.onError(F)
      });
      if (this.signal)
        if (this.signal.aborted) this.reason = this.signal.reason ?? new wp0;
        else this.removeAbortListener = RJ.addAbortListener(this.signal, () => {
          if (this.reason = this.signal.reason ?? new wp0, this.res) RJ.destroy(this.res.on("error", RJ.nop), this.reason);
          else if (this.abort) this.abort(this.reason);
          if (this.removeAbortListener) this.res?.off("close", this.removeAbortListener), this.removeAbortListener(), this.removeAbortListener = null
        })
    }
    onConnect(A, B) {
      if (this.reason) {
        A(this.reason);
        return
      }
      wz6(this.callback), this.abort = A, this.context = B
    }
    onHeaders(A, B, Q, I) {
      let {
        callback: G,
        opaque: Z,
        abort: D,
        context: Y,
        responseHeaders: W,
        highWaterMark: J
      } = this, F = W === "raw" ? RJ.parseRawHeaders(B) : RJ.parseHeaders(B);
      if (A < 200) {
        if (this.onInfo) this.onInfo({
          statusCode: A,
          headers: F
        });
        return
      }
      let X = W === "raw" ? RJ.parseHeaders(B) : F,
        V = X["content-type"],
        C = X["content-length"],
        K = new Ez6({
          resume: Q,
          abort: D,
          contentType: V,
          contentLength: this.method !== "HEAD" && C ? Number(C) : null,
          highWaterMark: J
        });
      if (this.removeAbortListener) K.on("close", this.removeAbortListener);
      if (this.callback = null, this.res = K, G !== null)
        if (this.throwOnError && A >= 400) this.runInAsyncScope(Uz6, null, {
          callback: G,
          body: K,
          contentType: V,
          statusCode: A,
          statusMessage: I,
          headers: F
        });
        else this.runInAsyncScope(G, null, null, {
          statusCode: A,
          headers: F,
          trailers: this.trailers,
          opaque: Z,
          body: K,
          context: Y
        })
    }
    onData(A) {
      return this.res.push(A)
    }
    onComplete(A) {
      RJ.parseHeaders(A, this.trailers), this.res.push(null)
    }
    onError(A) {
      let {
        res: B,
        callback: Q,
        body: I,
        opaque: G
      } = this;
      if (Q) this.callback = null, queueMicrotask(() => {
        this.runInAsyncScope(Q, null, A, {
          opaque: G
        })
      });
      if (B) this.res = null, queueMicrotask(() => {
        RJ.destroy(B, A)
      });
      if (I) this.body = null, RJ.destroy(I, A);
      if (this.removeAbortListener) B?.off("close", this.removeAbortListener), this.removeAbortListener(), this.removeAbortListener = null
    }
  }

  function Ep0(A, B) {
    if (B === void 0) return new Promise((Q, I) => {
      Ep0.call(this, A, (G, Z) => {
        return G ? I(G) : Q(Z)
      })
    });
    try {
      this.dispatch(A, new _p1(A, B))
    } catch (Q) {
      if (typeof B !== "function") throw Q;
      let I = A?.opaque;
      queueMicrotask(() => B(Q, {
        opaque: I
      }))
    }
  }
  jp1.exports = Ep0;
  jp1.exports.RequestHandler = _p1
})
// @from(Start 5532032, End 5532809)
Jo = z((GO8, qp0) => {
  var {
    addAbortListener: $z6
  } = C6(), {
    RequestAbortedError: qz6
  } = u5(), sh = Symbol("kListener"), Sw = Symbol("kSignal");

  function Np0(A) {
    if (A.abort) A.abort(A[Sw]?.reason);
    else A.reason = A[Sw]?.reason ?? new qz6;
    $p0(A)
  }

  function Mz6(A, B) {
    if (A.reason = null, A[Sw] = null, A[sh] = null, !B) return;
    if (B.aborted) {
      Np0(A);
      return
    }
    A[Sw] = B, A[sh] = () => {
      Np0(A)
    }, $z6(A[Sw], A[sh])
  }

  function $p0(A) {
    if (!A[Sw]) return;
    if ("removeEventListener" in A[Sw]) A[Sw].removeEventListener("abort", A[sh]);
    else A[Sw].removeListener("abort", A[sh]);
    A[Sw] = null, A[sh] = null
  }
  qp0.exports = {
    addSignal: Mz6,
    removeSignal: $p0
  }
})
// @from(Start 5532815, End 5537365)
Tp0 = z((ZO8, Op0) => {
  var Lz6 = Z1("node:assert"),
    {
      finished: Rz6,
      PassThrough: Oz6
    } = Z1("node:stream"),
    {
      InvalidArgumentError: rh,
      InvalidReturnValueError: Tz6
    } = u5(),
    AK = C6(),
    {
      getResolveErrorBodyCallback: Pz6
    } = Sp1(),
    {
      AsyncResource: Sz6
    } = Z1("node:async_hooks"),
    {
      addSignal: _z6,
      removeSignal: Mp0
    } = Jo();
  class Lp0 extends Sz6 {
    constructor(A, B, Q) {
      if (!A || typeof A !== "object") throw new rh("invalid opts");
      let {
        signal: I,
        method: G,
        opaque: Z,
        body: D,
        onInfo: Y,
        responseHeaders: W,
        throwOnError: J
      } = A;
      try {
        if (typeof Q !== "function") throw new rh("invalid callback");
        if (typeof B !== "function") throw new rh("invalid factory");
        if (I && typeof I.on !== "function" && typeof I.addEventListener !== "function") throw new rh("signal must be an EventEmitter or EventTarget");
        if (G === "CONNECT") throw new rh("invalid method");
        if (Y && typeof Y !== "function") throw new rh("invalid onInfo callback");
        super("UNDICI_STREAM")
      } catch (F) {
        if (AK.isStream(D)) AK.destroy(D.on("error", AK.nop), F);
        throw F
      }
      if (this.responseHeaders = W || null, this.opaque = Z || null, this.factory = B, this.callback = Q, this.res = null, this.abort = null, this.context = null, this.trailers = null, this.body = D, this.onInfo = Y || null, this.throwOnError = J || !1, AK.isStream(D)) D.on("error", (F) => {
        this.onError(F)
      });
      _z6(this, I)
    }
    onConnect(A, B) {
      if (this.reason) {
        A(this.reason);
        return
      }
      Lz6(this.callback), this.abort = A, this.context = B
    }
    onHeaders(A, B, Q, I) {
      let {
        factory: G,
        opaque: Z,
        context: D,
        callback: Y,
        responseHeaders: W
      } = this, J = W === "raw" ? AK.parseRawHeaders(B) : AK.parseHeaders(B);
      if (A < 200) {
        if (this.onInfo) this.onInfo({
          statusCode: A,
          headers: J
        });
        return
      }
      this.factory = null;
      let F;
      if (this.throwOnError && A >= 400) {
        let C = (W === "raw" ? AK.parseHeaders(B) : J)["content-type"];
        F = new Oz6, this.callback = null, this.runInAsyncScope(Pz6, null, {
          callback: Y,
          body: F,
          contentType: C,
          statusCode: A,
          statusMessage: I,
          headers: J
        })
      } else {
        if (G === null) return;
        if (F = this.runInAsyncScope(G, null, {
            statusCode: A,
            headers: J,
            opaque: Z,
            context: D
          }), !F || typeof F.write !== "function" || typeof F.end !== "function" || typeof F.on !== "function") throw new Tz6("expected Writable");
        Rz6(F, {
          readable: !1
        }, (V) => {
          let {
            callback: C,
            res: K,
            opaque: E,
            trailers: N,
            abort: q
          } = this;
          if (this.res = null, V || !K.readable) AK.destroy(K, V);
          if (this.callback = null, this.runInAsyncScope(C, null, V || null, {
              opaque: E,
              trailers: N
            }), V) q()
        })
      }
      return F.on("drain", Q), this.res = F, (F.writableNeedDrain !== void 0 ? F.writableNeedDrain : F._writableState?.needDrain) !== !0
    }
    onData(A) {
      let {
        res: B
      } = this;
      return B ? B.write(A) : !0
    }
    onComplete(A) {
      let {
        res: B
      } = this;
      if (Mp0(this), !B) return;
      this.trailers = AK.parseHeaders(A), B.end()
    }
    onError(A) {
      let {
        res: B,
        callback: Q,
        opaque: I,
        body: G
      } = this;
      if (Mp0(this), this.factory = null, B) this.res = null, AK.destroy(B, A);
      else if (Q) this.callback = null, queueMicrotask(() => {
        this.runInAsyncScope(Q, null, A, {
          opaque: I
        })
      });
      if (G) this.body = null, AK.destroy(G, A)
    }
  }

  function Rp0(A, B, Q) {
    if (Q === void 0) return new Promise((I, G) => {
      Rp0.call(this, A, B, (Z, D) => {
        return Z ? G(Z) : I(D)
      })
    });
    try {
      this.dispatch(A, new Lp0(A, B, Q))
    } catch (I) {
      if (typeof Q !== "function") throw I;
      let G = A?.opaque;
      queueMicrotask(() => Q(I, {
        opaque: G
      }))
    }
  }
  Op0.exports = Rp0
})
// @from(Start 5537371, End 5542178)
xp0 = z((DO8, kp0) => {
  var {
    Readable: Sp0,
    Duplex: jz6,
    PassThrough: yz6
  } = Z1("node:stream"), {
    InvalidArgumentError: Fo,
    InvalidReturnValueError: kz6,
    RequestAbortedError: yp1
  } = u5(), mX = C6(), {
    AsyncResource: xz6
  } = Z1("node:async_hooks"), {
    addSignal: fz6,
    removeSignal: vz6
  } = Jo(), Pp0 = Z1("node:assert"), oh = Symbol("resume");
  class _p0 extends Sp0 {
    constructor() {
      super({
        autoDestroy: !0
      });
      this[oh] = null
    }
    _read() {
      let {
        [oh]: A
      } = this;
      if (A) this[oh] = null, A()
    }
    _destroy(A, B) {
      this._read(), B(A)
    }
  }
  class jp0 extends Sp0 {
    constructor(A) {
      super({
        autoDestroy: !0
      });
      this[oh] = A
    }
    _read() {
      this[oh]()
    }
    _destroy(A, B) {
      if (!A && !this._readableState.endEmitted) A = new yp1;
      B(A)
    }
  }
  class yp0 extends xz6 {
    constructor(A, B) {
      if (!A || typeof A !== "object") throw new Fo("invalid opts");
      if (typeof B !== "function") throw new Fo("invalid handler");
      let {
        signal: Q,
        method: I,
        opaque: G,
        onInfo: Z,
        responseHeaders: D
      } = A;
      if (Q && typeof Q.on !== "function" && typeof Q.addEventListener !== "function") throw new Fo("signal must be an EventEmitter or EventTarget");
      if (I === "CONNECT") throw new Fo("invalid method");
      if (Z && typeof Z !== "function") throw new Fo("invalid onInfo callback");
      super("UNDICI_PIPELINE");
      this.opaque = G || null, this.responseHeaders = D || null, this.handler = B, this.abort = null, this.context = null, this.onInfo = Z || null, this.req = new _p0().on("error", mX.nop), this.ret = new jz6({
        readableObjectMode: A.objectMode,
        autoDestroy: !0,
        read: () => {
          let {
            body: Y
          } = this;
          if (Y?.resume) Y.resume()
        },
        write: (Y, W, J) => {
          let {
            req: F
          } = this;
          if (F.push(Y, W) || F._readableState.destroyed) J();
          else F[oh] = J
        },
        destroy: (Y, W) => {
          let {
            body: J,
            req: F,
            res: X,
            ret: V,
            abort: C
          } = this;
          if (!Y && !V._readableState.endEmitted) Y = new yp1;
          if (C && Y) C();
          mX.destroy(J, Y), mX.destroy(F, Y), mX.destroy(X, Y), vz6(this), W(Y)
        }
      }).on("prefinish", () => {
        let {
          req: Y
        } = this;
        Y.push(null)
      }), this.res = null, fz6(this, Q)
    }
    onConnect(A, B) {
      let {
        ret: Q,
        res: I
      } = this;
      if (this.reason) {
        A(this.reason);
        return
      }
      Pp0(!I, "pipeline cannot be retried"), Pp0(!Q.destroyed), this.abort = A, this.context = B
    }
    onHeaders(A, B, Q) {
      let {
        opaque: I,
        handler: G,
        context: Z
      } = this;
      if (A < 200) {
        if (this.onInfo) {
          let Y = this.responseHeaders === "raw" ? mX.parseRawHeaders(B) : mX.parseHeaders(B);
          this.onInfo({
            statusCode: A,
            headers: Y
          })
        }
        return
      }
      this.res = new jp0(Q);
      let D;
      try {
        this.handler = null;
        let Y = this.responseHeaders === "raw" ? mX.parseRawHeaders(B) : mX.parseHeaders(B);
        D = this.runInAsyncScope(G, null, {
          statusCode: A,
          headers: Y,
          opaque: I,
          body: this.res,
          context: Z
        })
      } catch (Y) {
        throw this.res.on("error", mX.nop), Y
      }
      if (!D || typeof D.on !== "function") throw new kz6("expected Readable");
      D.on("data", (Y) => {
        let {
          ret: W,
          body: J
        } = this;
        if (!W.push(Y) && J.pause) J.pause()
      }).on("error", (Y) => {
        let {
          ret: W
        } = this;
        mX.destroy(W, Y)
      }).on("end", () => {
        let {
          ret: Y
        } = this;
        Y.push(null)
      }).on("close", () => {
        let {
          ret: Y
        } = this;
        if (!Y._readableState.ended) mX.destroy(Y, new yp1)
      }), this.body = D
    }
    onData(A) {
      let {
        res: B
      } = this;
      return B.push(A)
    }
    onComplete(A) {
      let {
        res: B
      } = this;
      B.push(null)
    }
    onError(A) {
      let {
        ret: B
      } = this;
      this.handler = null, mX.destroy(B, A)
    }
  }

  function bz6(A, B) {
    try {
      let Q = new yp0(A, B);
      return this.dispatch({
        ...A,
        body: Q.req
      }, Q), Q.ret
    } catch (Q) {
      return new yz6().destroy(Q)
    }
  }
  kp0.exports = bz6
})
// @from(Start 5542184, End 5544415)
dp0 = z((YO8, mp0) => {
  var {
    InvalidArgumentError: kp1,
    SocketError: gz6
  } = u5(), {
    AsyncResource: hz6
  } = Z1("node:async_hooks"), fp0 = C6(), {
    addSignal: mz6,
    removeSignal: vp0
  } = Jo(), bp0 = Z1("node:assert");
  class gp0 extends hz6 {
    constructor(A, B) {
      if (!A || typeof A !== "object") throw new kp1("invalid opts");
      if (typeof B !== "function") throw new kp1("invalid callback");
      let {
        signal: Q,
        opaque: I,
        responseHeaders: G
      } = A;
      if (Q && typeof Q.on !== "function" && typeof Q.addEventListener !== "function") throw new kp1("signal must be an EventEmitter or EventTarget");
      super("UNDICI_UPGRADE");
      this.responseHeaders = G || null, this.opaque = I || null, this.callback = B, this.abort = null, this.context = null, mz6(this, Q)
    }
    onConnect(A, B) {
      if (this.reason) {
        A(this.reason);
        return
      }
      bp0(this.callback), this.abort = A, this.context = null
    }
    onHeaders() {
      throw new gz6("bad upgrade", null)
    }
    onUpgrade(A, B, Q) {
      bp0(A === 101);
      let {
        callback: I,
        opaque: G,
        context: Z
      } = this;
      vp0(this), this.callback = null;
      let D = this.responseHeaders === "raw" ? fp0.parseRawHeaders(B) : fp0.parseHeaders(B);
      this.runInAsyncScope(I, null, null, {
        headers: D,
        socket: Q,
        opaque: G,
        context: Z
      })
    }
    onError(A) {
      let {
        callback: B,
        opaque: Q
      } = this;
      if (vp0(this), B) this.callback = null, queueMicrotask(() => {
        this.runInAsyncScope(B, null, A, {
          opaque: Q
        })
      })
    }
  }

  function hp0(A, B) {
    if (B === void 0) return new Promise((Q, I) => {
      hp0.call(this, A, (G, Z) => {
        return G ? I(G) : Q(Z)
      })
    });
    try {
      let Q = new gp0(A, B);
      this.dispatch({
        ...A,
        method: A.method || "GET",
        upgrade: A.protocol || "Websocket"
      }, Q)
    } catch (Q) {
      if (typeof B !== "function") throw Q;
      let I = A?.opaque;
      queueMicrotask(() => B(Q, {
        opaque: I
      }))
    }
  }
  mp0.exports = hp0
})
// @from(Start 5544421, End 5546637)
np0 = z((WO8, ip0) => {
  var dz6 = Z1("node:assert"),
    {
      AsyncResource: uz6
    } = Z1("node:async_hooks"),
    {
      InvalidArgumentError: xp1,
      SocketError: pz6
    } = u5(),
    up0 = C6(),
    {
      addSignal: cz6,
      removeSignal: pp0
    } = Jo();
  class cp0 extends uz6 {
    constructor(A, B) {
      if (!A || typeof A !== "object") throw new xp1("invalid opts");
      if (typeof B !== "function") throw new xp1("invalid callback");
      let {
        signal: Q,
        opaque: I,
        responseHeaders: G
      } = A;
      if (Q && typeof Q.on !== "function" && typeof Q.addEventListener !== "function") throw new xp1("signal must be an EventEmitter or EventTarget");
      super("UNDICI_CONNECT");
      this.opaque = I || null, this.responseHeaders = G || null, this.callback = B, this.abort = null, cz6(this, Q)
    }
    onConnect(A, B) {
      if (this.reason) {
        A(this.reason);
        return
      }
      dz6(this.callback), this.abort = A, this.context = B
    }
    onHeaders() {
      throw new pz6("bad connect", null)
    }
    onUpgrade(A, B, Q) {
      let {
        callback: I,
        opaque: G,
        context: Z
      } = this;
      pp0(this), this.callback = null;
      let D = B;
      if (D != null) D = this.responseHeaders === "raw" ? up0.parseRawHeaders(B) : up0.parseHeaders(B);
      this.runInAsyncScope(I, null, null, {
        statusCode: A,
        headers: D,
        socket: Q,
        opaque: G,
        context: Z
      })
    }
    onError(A) {
      let {
        callback: B,
        opaque: Q
      } = this;
      if (pp0(this), B) this.callback = null, queueMicrotask(() => {
        this.runInAsyncScope(B, null, A, {
          opaque: Q
        })
      })
    }
  }

  function lp0(A, B) {
    if (B === void 0) return new Promise((Q, I) => {
      lp0.call(this, A, (G, Z) => {
        return G ? I(G) : Q(Z)
      })
    });
    try {
      let Q = new cp0(A, B);
      this.dispatch({
        ...A,
        method: "CONNECT"
      }, Q)
    } catch (Q) {
      if (typeof B !== "function") throw Q;
      let I = A?.opaque;
      queueMicrotask(() => B(Q, {
        opaque: I
      }))
    }
  }
  ip0.exports = lp0
})
// @from(Start 5546643, End 5546782)
ap0 = z((lz6, th) => {
  lz6.request = Up0();
  lz6.stream = Tp0();
  lz6.pipeline = xp0();
  lz6.upgrade = dp0();
  lz6.connect = np0()
})
// @from(Start 5546788, End 5547181)
vp1 = z((JO8, sp0) => {
  var {
    UndiciError: oz6
  } = u5();
  class fp1 extends oz6 {
    constructor(A) {
      super(A);
      Error.captureStackTrace(this, fp1), this.name = "MockNotMatchedError", this.message = A || "The request does not match any registered mock dispatches", this.code = "UND_MOCK_ERR_MOCK_NOT_MATCHED"
    }
  }
  sp0.exports = {
    MockNotMatchedError: fp1
  }
})
// @from(Start 5547187, End 5548006)
eh = z((FO8, rp0) => {
  rp0.exports = {
    kAgent: Symbol("agent"),
    kOptions: Symbol("options"),
    kFactory: Symbol("factory"),
    kDispatches: Symbol("dispatches"),
    kDispatchKey: Symbol("dispatch key"),
    kDefaultHeaders: Symbol("default headers"),
    kDefaultTrailers: Symbol("default trailers"),
    kContentLength: Symbol("content length"),
    kMockAgent: Symbol("mock agent"),
    kMockAgentSet: Symbol("mock agent set"),
    kMockAgentGet: Symbol("mock agent get"),
    kMockDispatch: Symbol("mock dispatch"),
    kClose: Symbol("close"),
    kOriginalClose: Symbol("original agent close"),
    kOrigin: Symbol("origin"),
    kIsMockActive: Symbol("is mock active"),
    kNetConnect: Symbol("net connect"),
    kGetNetConnect: Symbol("get net connect"),
    kConnected: Symbol("connected")
  }
})
// @from(Start 5548012, End 5554990)
Xo = z((XO8, Yc0) => {
  var {
    MockNotMatchedError: Ej
  } = vp1(), {
    kDispatches: JW1,
    kMockAgent: tz6,
    kOriginalDispatch: ez6,
    kOrigin: Aw6,
    kGetNetConnect: Bw6
  } = eh(), {
    buildURL: Qw6
  } = C6(), {
    STATUS_CODES: Iw6
  } = Z1("node:http"), {
    types: {
      isPromise: Gw6
    }
  } = Z1("node:util");

  function lN(A, B) {
    if (typeof A === "string") return A === B;
    if (A instanceof RegExp) return A.test(B);
    if (typeof A === "function") return A(B) === !0;
    return !1
  }

  function tp0(A) {
    return Object.fromEntries(Object.entries(A).map(([B, Q]) => {
      return [B.toLocaleLowerCase(), Q]
    }))
  }

  function ep0(A, B) {
    if (Array.isArray(A)) {
      for (let Q = 0; Q < A.length; Q += 2)
        if (A[Q].toLocaleLowerCase() === B.toLocaleLowerCase()) return A[Q + 1];
      return
    } else if (typeof A.get === "function") return A.get(B);
    else return tp0(A)[B.toLocaleLowerCase()]
  }

  function hp1(A) {
    let B = A.slice(),
      Q = [];
    for (let I = 0; I < B.length; I += 2) Q.push([B[I], B[I + 1]]);
    return Object.fromEntries(Q)
  }

  function Ac0(A, B) {
    if (typeof A.headers === "function") {
      if (Array.isArray(B)) B = hp1(B);
      return A.headers(B ? tp0(B) : {})
    }
    if (typeof A.headers === "undefined") return !0;
    if (typeof B !== "object" || typeof A.headers !== "object") return !1;
    for (let [Q, I] of Object.entries(A.headers)) {
      let G = ep0(B, Q);
      if (!lN(I, G)) return !1
    }
    return !0
  }

  function op0(A) {
    if (typeof A !== "string") return A;
    let B = A.split("?");
    if (B.length !== 2) return A;
    let Q = new URLSearchParams(B.pop());
    return Q.sort(), [...B, Q.toString()].join("?")
  }

  function Zw6(A, {
    path: B,
    method: Q,
    body: I,
    headers: G
  }) {
    let Z = lN(A.path, B),
      D = lN(A.method, Q),
      Y = typeof A.body !== "undefined" ? lN(A.body, I) : !0,
      W = Ac0(A, G);
    return Z && D && Y && W
  }

  function Bc0(A) {
    if (Buffer.isBuffer(A)) return A;
    else if (A instanceof Uint8Array) return A;
    else if (A instanceof ArrayBuffer) return A;
    else if (typeof A === "object") return JSON.stringify(A);
    else return A.toString()
  }

  function Qc0(A, B) {
    let Q = B.query ? Qw6(B.path, B.query) : B.path,
      I = typeof Q === "string" ? op0(Q) : Q,
      G = A.filter(({
        consumed: Z
      }) => !Z).filter(({
        path: Z
      }) => lN(op0(Z), I));
    if (G.length === 0) throw new Ej(`Mock dispatch not matched for path '${I}'`);
    if (G = G.filter(({
        method: Z
      }) => lN(Z, B.method)), G.length === 0) throw new Ej(`Mock dispatch not matched for method '${B.method}' on path '${I}'`);
    if (G = G.filter(({
        body: Z
      }) => typeof Z !== "undefined" ? lN(Z, B.body) : !0), G.length === 0) throw new Ej(`Mock dispatch not matched for body '${B.body}' on path '${I}'`);
    if (G = G.filter((Z) => Ac0(Z, B.headers)), G.length === 0) {
      let Z = typeof B.headers === "object" ? JSON.stringify(B.headers) : B.headers;
      throw new Ej(`Mock dispatch not matched for headers '${Z}' on path '${I}'`)
    }
    return G[0]
  }

  function Dw6(A, B, Q) {
    let I = {
        timesInvoked: 0,
        times: 1,
        persist: !1,
        consumed: !1
      },
      G = typeof Q === "function" ? {
        callback: Q
      } : {
        ...Q
      },
      Z = {
        ...I,
        ...B,
        pending: !0,
        data: {
          error: null,
          ...G
        }
      };
    return A.push(Z), Z
  }

  function bp1(A, B) {
    let Q = A.findIndex((I) => {
      if (!I.consumed) return !1;
      return Zw6(I, B)
    });
    if (Q !== -1) A.splice(Q, 1)
  }

  function Ic0(A) {
    let {
      path: B,
      method: Q,
      body: I,
      headers: G,
      query: Z
    } = A;
    return {
      path: B,
      method: Q,
      body: I,
      headers: G,
      query: Z
    }
  }

  function gp1(A) {
    let B = Object.keys(A),
      Q = [];
    for (let I = 0; I < B.length; ++I) {
      let G = B[I],
        Z = A[G],
        D = Buffer.from(`${G}`);
      if (Array.isArray(Z))
        for (let Y = 0; Y < Z.length; ++Y) Q.push(D, Buffer.from(`${Z[Y]}`));
      else Q.push(D, Buffer.from(`${Z}`))
    }
    return Q
  }

  function Gc0(A) {
    return Iw6[A] || "unknown"
  }
  async function Yw6(A) {
    let B = [];
    for await (let Q of A) B.push(Q);
    return Buffer.concat(B).toString("utf8")
  }

  function Zc0(A, B) {
    let Q = Ic0(A),
      I = Qc0(this[JW1], Q);
    if (I.timesInvoked++, I.data.callback) I.data = {
      ...I.data,
      ...I.data.callback(A)
    };
    let {
      data: {
        statusCode: G,
        data: Z,
        headers: D,
        trailers: Y,
        error: W
      },
      delay: J,
      persist: F
    } = I, {
      timesInvoked: X,
      times: V
    } = I;
    if (I.consumed = !F && X >= V, I.pending = X < V, W !== null) return bp1(this[JW1], Q), B.onError(W), !0;
    if (typeof J === "number" && J > 0) setTimeout(() => {
      C(this[JW1])
    }, J);
    else C(this[JW1]);

    function C(E, N = Z) {
      let q = Array.isArray(A.headers) ? hp1(A.headers) : A.headers,
        O = typeof N === "function" ? N({
          ...A,
          headers: q
        }) : N;
      if (Gw6(O)) {
        O.then((_) => C(E, _));
        return
      }
      let R = Bc0(O),
        T = gp1(D),
        L = gp1(Y);
      B.onConnect?.((_) => B.onError(_), null), B.onHeaders?.(G, T, K, Gc0(G)), B.onData?.(Buffer.from(R)), B.onComplete?.(L), bp1(E, Q)
    }

    function K() {}
    return !0
  }

  function Ww6() {
    let A = this[tz6],
      B = this[Aw6],
      Q = this[ez6];
    return function I(G, Z) {
      if (A.isMockActive) try {
        Zc0.call(this, G, Z)
      } catch (D) {
        if (D instanceof Ej) {
          let Y = A[Bw6]();
          if (Y === !1) throw new Ej(`${D.message}: subsequent request to origin ${B} was not allowed (net.connect disabled)`);
          if (Dc0(Y, B)) Q.call(this, G, Z);
          else throw new Ej(`${D.message}: subsequent request to origin ${B} was not allowed (net.connect is not enabled for this origin)`)
        } else throw D
      } else Q.call(this, G, Z)
    }
  }

  function Dc0(A, B) {
    let Q = new URL(B);
    if (A === !0) return !0;
    else if (Array.isArray(A) && A.some((I) => lN(I, Q.host))) return !0;
    return !1
  }

  function Jw6(A) {
    if (A) {
      let {
        agent: B,
        ...Q
      } = A;
      return Q
    }
  }
  Yc0.exports = {
    getResponseData: Bc0,
    getMockDispatch: Qc0,
    addMockDispatch: Dw6,
    deleteMockDispatch: bp1,
    buildKey: Ic0,
    generateKeyValues: gp1,
    matchValue: lN,
    getResponse: Yw6,
    getStatusText: Gc0,
    mockDispatch: Zc0,
    buildMockDispatch: Ww6,
    checkNetConnect: Dc0,
    buildMockOptions: Jw6,
    getHeaderByName: ep0,
    buildHeadersFromArray: hp1
  }
})
// @from(Start 5554996, End 5558686)
lp1 = z((Cw6, cp1) => {
  var {
    getResponseData: Fw6,
    buildKey: Xw6,
    addMockDispatch: mp1
  } = Xo(), {
    kDispatches: FW1,
    kDispatchKey: XW1,
    kDefaultHeaders: dp1,
    kDefaultTrailers: up1,
    kContentLength: pp1,
    kMockDispatch: VW1
  } = eh(), {
    InvalidArgumentError: _w
  } = u5(), {
    buildURL: Vw6
  } = C6();
  class Vo {
    constructor(A) {
      this[VW1] = A
    }
    delay(A) {
      if (typeof A !== "number" || !Number.isInteger(A) || A <= 0) throw new _w("waitInMs must be a valid integer > 0");
      return this[VW1].delay = A, this
    }
    persist() {
      return this[VW1].persist = !0, this
    }
    times(A) {
      if (typeof A !== "number" || !Number.isInteger(A) || A <= 0) throw new _w("repeatTimes must be a valid integer > 0");
      return this[VW1].times = A, this
    }
  }
  class Wc0 {
    constructor(A, B) {
      if (typeof A !== "object") throw new _w("opts must be an object");
      if (typeof A.path === "undefined") throw new _w("opts.path must be defined");
      if (typeof A.method === "undefined") A.method = "GET";
      if (typeof A.path === "string")
        if (A.query) A.path = Vw6(A.path, A.query);
        else {
          let Q = new URL(A.path, "data://");
          A.path = Q.pathname + Q.search
        } if (typeof A.method === "string") A.method = A.method.toUpperCase();
      this[XW1] = Xw6(A), this[FW1] = B, this[dp1] = {}, this[up1] = {}, this[pp1] = !1
    }
    createMockScopeDispatchData({
      statusCode: A,
      data: B,
      responseOptions: Q
    }) {
      let I = Fw6(B),
        G = this[pp1] ? {
          "content-length": I.length
        } : {},
        Z = {
          ...this[dp1],
          ...G,
          ...Q.headers
        },
        D = {
          ...this[up1],
          ...Q.trailers
        };
      return {
        statusCode: A,
        data: B,
        headers: Z,
        trailers: D
      }
    }
    validateReplyParameters(A) {
      if (typeof A.statusCode === "undefined") throw new _w("statusCode must be defined");
      if (typeof A.responseOptions !== "object" || A.responseOptions === null) throw new _w("responseOptions must be an object")
    }
    reply(A) {
      if (typeof A === "function") {
        let G = (D) => {
            let Y = A(D);
            if (typeof Y !== "object" || Y === null) throw new _w("reply options callback must return an object");
            let W = {
              data: "",
              responseOptions: {},
              ...Y
            };
            return this.validateReplyParameters(W), {
              ...this.createMockScopeDispatchData(W)
            }
          },
          Z = mp1(this[FW1], this[XW1], G);
        return new Vo(Z)
      }
      let B = {
        statusCode: A,
        data: arguments[1] === void 0 ? "" : arguments[1],
        responseOptions: arguments[2] === void 0 ? {} : arguments[2]
      };
      this.validateReplyParameters(B);
      let Q = this.createMockScopeDispatchData(B),
        I = mp1(this[FW1], this[XW1], Q);
      return new Vo(I)
    }
    replyWithError(A) {
      if (typeof A === "undefined") throw new _w("error must be defined");
      let B = mp1(this[FW1], this[XW1], {
        error: A
      });
      return new Vo(B)
    }
    defaultReplyHeaders(A) {
      if (typeof A === "undefined") throw new _w("headers must be defined");
      return this[dp1] = A, this
    }
    defaultReplyTrailers(A) {
      if (typeof A === "undefined") throw new _w("trailers must be defined");
      return this[up1] = A, this
    }
    replyContentLength() {
      return this[pp1] = !0, this
    }
  }
  Cw6.MockInterceptor = Wc0;
  Cw6.MockScope = Vo
})
// @from(Start 5558692, End 5559728)
np1 = z((VO8, zc0) => {
  var {
    promisify: zw6
  } = Z1("node:util"), ww6 = er(), {
    buildMockDispatch: Ew6
  } = Xo(), {
    kDispatches: Jc0,
    kMockAgent: Fc0,
    kClose: Xc0,
    kOriginalClose: Vc0,
    kOrigin: Cc0,
    kOriginalDispatch: Uw6,
    kConnected: ip1
  } = eh(), {
    MockInterceptor: Nw6
  } = lp1(), Kc0 = A3(), {
    InvalidArgumentError: $w6
  } = u5();
  class Hc0 extends ww6 {
    constructor(A, B) {
      super(A, B);
      if (!B || !B.agent || typeof B.agent.dispatch !== "function") throw new $w6("Argument opts.agent must implement Agent");
      this[Fc0] = B.agent, this[Cc0] = A, this[Jc0] = [], this[ip1] = 1, this[Uw6] = this.dispatch, this[Vc0] = this.close.bind(this), this.dispatch = Ew6.call(this), this.close = this[Xc0]
    }
    get[Kc0.kConnected]() {
      return this[ip1]
    }
    intercept(A) {
      return new Nw6(A, this[Jc0])
    }
    async [Xc0]() {
      await zw6(this[Vc0])(), this[ip1] = 0, this[Fc0][Kc0.kClients].delete(this[Cc0])
    }
  }
  zc0.exports = Hc0
})
// @from(Start 5559734, End 5560770)
sp1 = z((CO8, Lc0) => {
  var {
    promisify: qw6
  } = Z1("node:util"), Mw6 = lh(), {
    buildMockDispatch: Lw6
  } = Xo(), {
    kDispatches: wc0,
    kMockAgent: Ec0,
    kClose: Uc0,
    kOriginalClose: Nc0,
    kOrigin: $c0,
    kOriginalDispatch: Rw6,
    kConnected: ap1
  } = eh(), {
    MockInterceptor: Ow6
  } = lp1(), qc0 = A3(), {
    InvalidArgumentError: Tw6
  } = u5();
  class Mc0 extends Mw6 {
    constructor(A, B) {
      super(A, B);
      if (!B || !B.agent || typeof B.agent.dispatch !== "function") throw new Tw6("Argument opts.agent must implement Agent");
      this[Ec0] = B.agent, this[$c0] = A, this[wc0] = [], this[ap1] = 1, this[Rw6] = this.dispatch, this[Nc0] = this.close.bind(this), this.dispatch = Lw6.call(this), this.close = this[Uc0]
    }
    get[qc0.kConnected]() {
      return this[ap1]
    }
    intercept(A) {
      return new Ow6(A, this[wc0])
    }
    async [Uc0]() {
      await qw6(this[Nc0])(), this[ap1] = 0, this[Ec0][qc0.kClients].delete(this[$c0])
    }
  }
  Lc0.exports = Mc0
})
// @from(Start 5560776, End 5561287)
Oc0 = z((KO8, Rc0) => {
  var Pw6 = {
      pronoun: "it",
      is: "is",
      was: "was",
      this: "this"
    },
    Sw6 = {
      pronoun: "they",
      is: "are",
      was: "were",
      this: "these"
    };
  Rc0.exports = class A {
    constructor(B, Q) {
      this.singular = B, this.plural = Q
    }
    pluralize(B) {
      let Q = B === 1,
        I = Q ? Pw6 : Sw6,
        G = Q ? this.singular : this.plural;
      return {
        ...I,
        count: B,
        noun: G
      }
    }
  }
})
// @from(Start 5561293, End 5562304)
Pc0 = z((HO8, Tc0) => {
  var {
    Transform: _w6
  } = Z1("node:stream"), {
    Console: jw6
  } = Z1("node:console"), yw6 = process.versions.icu ? "✅" : "Y ", kw6 = process.versions.icu ? "❌" : "N ";
  Tc0.exports = class A {
    constructor({
      disableColors: B
    } = {}) {
      this.transform = new _w6({
        transform(Q, I, G) {
          G(null, Q)
        }
      }), this.logger = new jw6({
        stdout: this.transform,
        inspectOptions: {
          colors: !B && !0
        }
      })
    }
    format(B) {
      let Q = B.map(({
        method: I,
        path: G,
        data: {
          statusCode: Z
        },
        persist: D,
        times: Y,
        timesInvoked: W,
        origin: J
      }) => ({
        Method: I,
        Origin: J,
        Path: G,
        "Status code": Z,
        Persistent: D ? yw6 : kw6,
        Invocations: W,
        Remaining: D ? 1 / 0 : Y - W
      }));
      return this.logger.table(Q), this.transform.read().toString()
    }
  }
})
// @from(Start 5562310, End 5565158)
kc0 = z((zO8, yc0) => {
  var {
    kClients: Uj
  } = A3(), xw6 = ih(), {
    kAgent: rp1,
    kMockAgentSet: CW1,
    kMockAgentGet: Sc0,
    kDispatches: op1,
    kIsMockActive: KW1,
    kNetConnect: Nj,
    kGetNetConnect: fw6,
    kOptions: HW1,
    kFactory: zW1
  } = eh(), vw6 = np1(), bw6 = sp1(), {
    matchValue: gw6,
    buildMockOptions: hw6
  } = Xo(), {
    InvalidArgumentError: _c0,
    UndiciError: mw6
  } = u5(), dw6 = yr(), uw6 = Oc0(), pw6 = Pc0();
  class jc0 extends dw6 {
    constructor(A) {
      super(A);
      if (this[Nj] = !0, this[KW1] = !0, A?.agent && typeof A.agent.dispatch !== "function") throw new _c0("Argument opts.agent must implement Agent");
      let B = A?.agent ? A.agent : new xw6(A);
      this[rp1] = B, this[Uj] = B[Uj], this[HW1] = hw6(A)
    }
    get(A) {
      let B = this[Sc0](A);
      if (!B) B = this[zW1](A), this[CW1](A, B);
      return B
    }
    dispatch(A, B) {
      return this.get(A.origin), this[rp1].dispatch(A, B)
    }
    async close() {
      await this[rp1].close(), this[Uj].clear()
    }
    deactivate() {
      this[KW1] = !1
    }
    activate() {
      this[KW1] = !0
    }
    enableNetConnect(A) {
      if (typeof A === "string" || typeof A === "function" || A instanceof RegExp)
        if (Array.isArray(this[Nj])) this[Nj].push(A);
        else this[Nj] = [A];
      else if (typeof A === "undefined") this[Nj] = !0;
      else throw new _c0("Unsupported matcher. Must be one of String|Function|RegExp.")
    }
    disableNetConnect() {
      this[Nj] = !1
    }
    get isMockActive() {
      return this[KW1]
    } [CW1](A, B) {
      this[Uj].set(A, B)
    } [zW1](A) {
      let B = Object.assign({
        agent: this
      }, this[HW1]);
      return this[HW1] && this[HW1].connections === 1 ? new vw6(A, B) : new bw6(A, B)
    } [Sc0](A) {
      let B = this[Uj].get(A);
      if (B) return B;
      if (typeof A !== "string") {
        let Q = this[zW1]("http://localhost:9999");
        return this[CW1](A, Q), Q
      }
      for (let [Q, I] of Array.from(this[Uj]))
        if (I && typeof Q !== "string" && gw6(Q, A)) {
          let G = this[zW1](A);
          return this[CW1](A, G), G[op1] = I[op1], G
        }
    } [fw6]() {
      return this[Nj]
    }
    pendingInterceptors() {
      let A = this[Uj];
      return Array.from(A.entries()).flatMap(([B, Q]) => Q[op1].map((I) => ({
        ...I,
        origin: B
      }))).filter(({
        pending: B
      }) => B)
    }
    assertNoPendingInterceptors({
      pendingInterceptorsFormatter: A = new pw6
    } = {}) {
      let B = this.pendingInterceptors();
      if (B.length === 0) return;
      let Q = new uw6("interceptor", "interceptors").pluralize(B.length);
      throw new mw6(`
${Q.count} ${Q.noun} ${Q.is} pending:

${A.format(B)}
`.trim())
    }
  }
  yc0.exports = jc0
})
// @from(Start 5565164, End 5565741)
wW1 = z((wO8, bc0) => {
  var xc0 = Symbol.for("undici.globalDispatcher.1"),
    {
      InvalidArgumentError: cw6
    } = u5(),
    lw6 = ih();
  if (vc0() === void 0) fc0(new lw6);

  function fc0(A) {
    if (!A || typeof A.dispatch !== "function") throw new cw6("Argument agent must implement Agent");
    Object.defineProperty(globalThis, xc0, {
      value: A,
      writable: !0,
      enumerable: !1,
      configurable: !1
    })
  }

  function vc0() {
    return globalThis[xc0]
  }
  bc0.exports = {
    setGlobalDispatcher: fc0,
    getGlobalDispatcher: vc0
  }
})
// @from(Start 5565747, End 5566499)
EW1 = z((EO8, gc0) => {
  gc0.exports = class A {
    #A;
    constructor(B) {
      if (typeof B !== "object" || B === null) throw new TypeError("handler must be an object");
      this.#A = B
    }
    onConnect(...B) {
      return this.#A.onConnect?.(...B)
    }
    onError(...B) {
      return this.#A.onError?.(...B)
    }
    onUpgrade(...B) {
      return this.#A.onUpgrade?.(...B)
    }
    onResponseStarted(...B) {
      return this.#A.onResponseStarted?.(...B)
    }
    onHeaders(...B) {
      return this.#A.onHeaders?.(...B)
    }
    onData(...B) {
      return this.#A.onData?.(...B)
    }
    onComplete(...B) {
      return this.#A.onComplete?.(...B)
    }
    onBodySent(...B) {
      return this.#A.onBodySent?.(...B)
    }
  }
})
// @from(Start 5566505, End 5566847)
mc0 = z((UO8, hc0) => {
  var iw6 = tY1();
  hc0.exports = (A) => {
    let B = A?.maxRedirections;
    return (Q) => {
      return function I(G, Z) {
        let {
          maxRedirections: D = B,
          ...Y
        } = G;
        if (!D) return Q(G, Z);
        let W = new iw6(Q, D, G, Z);
        return Q(Y, W)
      }
    }
  }
})
// @from(Start 5566853, End 5567194)
uc0 = z((NO8, dc0) => {
  var nw6 = WW1();
  dc0.exports = (A) => {
    return (B) => {
      return function Q(I, G) {
        return B(I, new nw6({
          ...I,
          retryOptions: {
            ...A,
            ...I.retryOptions
          }
        }, {
          handler: G,
          dispatch: B
        }))
      }
    }
  }
})
// @from(Start 5567200, End 5568842)
lc0 = z(($O8, cc0) => {
  var aw6 = C6(),
    {
      InvalidArgumentError: sw6,
      RequestAbortedError: rw6
    } = u5(),
    ow6 = EW1();
  class pc0 extends ow6 {
    #A = 1048576;
    #B = null;
    #Q = !1;
    #I = !1;
    #G = 0;
    #W = null;
    #Z = null;
    constructor({
      maxSize: A
    }, B) {
      super(B);
      if (A != null && (!Number.isFinite(A) || A < 1)) throw new sw6("maxSize must be a number greater than 0");
      this.#A = A ?? this.#A, this.#Z = B
    }
    onConnect(A) {
      this.#B = A, this.#Z.onConnect(this.#F.bind(this))
    }
    #F(A) {
      this.#I = !0, this.#W = A
    }
    onHeaders(A, B, Q, I) {
      let Z = aw6.parseHeaders(B)["content-length"];
      if (Z != null && Z > this.#A) throw new rw6(`Response size (${Z}) larger than maxSize (${this.#A})`);
      if (this.#I) return !0;
      return this.#Z.onHeaders(A, B, Q, I)
    }
    onError(A) {
      if (this.#Q) return;
      A = this.#W ?? A, this.#Z.onError(A)
    }
    onData(A) {
      if (this.#G = this.#G + A.length, this.#G >= this.#A)
        if (this.#Q = !0, this.#I) this.#Z.onError(this.#W);
        else this.#Z.onComplete([]);
      return !0
    }
    onComplete(A) {
      if (this.#Q) return;
      if (this.#I) {
        this.#Z.onError(this.reason);
        return
      }
      this.#Z.onComplete(A)
    }
  }

  function tw6({
    maxSize: A
  } = {
    maxSize: 1048576
  }) {
    return (B) => {
      return function Q(I, G) {
        let {
          dumpMaxSize: Z = A
        } = I, D = new pc0({
          maxSize: Z
        }, G);
        return B(I, D)
      }
    }
  }
  cc0.exports = tw6
})
// @from(Start 5568848, End 5575046)
rc0 = z((qO8, sc0) => {
  var {
    isIP: ew6
  } = Z1("node:net"), {
    lookup: AE6
  } = Z1("node:dns"), BE6 = EW1(), {
    InvalidArgumentError: Am,
    InformationalError: QE6
  } = u5(), ic0 = Math.pow(2, 31) - 1;
  class nc0 {
    #A = 0;
    #B = 0;
    #Q = new Map;
    dualStack = !0;
    affinity = null;
    lookup = null;
    pick = null;
    constructor(A) {
      this.#A = A.maxTTL, this.#B = A.maxItems, this.dualStack = A.dualStack, this.affinity = A.affinity, this.lookup = A.lookup ?? this.#I, this.pick = A.pick ?? this.#G
    }
    get full() {
      return this.#Q.size === this.#B
    }
    runLookup(A, B, Q) {
      let I = this.#Q.get(A.hostname);
      if (I == null && this.full) {
        Q(null, A.origin);
        return
      }
      let G = {
        affinity: this.affinity,
        dualStack: this.dualStack,
        lookup: this.lookup,
        pick: this.pick,
        ...B.dns,
        maxTTL: this.#A,
        maxItems: this.#B
      };
      if (I == null) this.lookup(A, G, (Z, D) => {
        if (Z || D == null || D.length === 0) {
          Q(Z ?? new QE6("No DNS entries found"));
          return
        }
        this.setRecords(A, D);
        let Y = this.#Q.get(A.hostname),
          W = this.pick(A, Y, G.affinity),
          J;
        if (typeof W.port === "number") J = `:${W.port}`;
        else if (A.port !== "") J = `:${A.port}`;
        else J = "";
        Q(null, `${A.protocol}//${W.family===6?`[${W.address}]`:W.address}${J}`)
      });
      else {
        let Z = this.pick(A, I, G.affinity);
        if (Z == null) {
          this.#Q.delete(A.hostname), this.runLookup(A, B, Q);
          return
        }
        let D;
        if (typeof Z.port === "number") D = `:${Z.port}`;
        else if (A.port !== "") D = `:${A.port}`;
        else D = "";
        Q(null, `${A.protocol}//${Z.family===6?`[${Z.address}]`:Z.address}${D}`)
      }
    }
    #I(A, B, Q) {
      AE6(A.hostname, {
        all: !0,
        family: this.dualStack === !1 ? this.affinity : 0,
        order: "ipv4first"
      }, (I, G) => {
        if (I) return Q(I);
        let Z = new Map;
        for (let D of G) Z.set(`${D.address}:${D.family}`, D);
        Q(null, Z.values())
      })
    }
    #G(A, B, Q) {
      let I = null,
        {
          records: G,
          offset: Z
        } = B,
        D;
      if (this.dualStack) {
        if (Q == null)
          if (Z == null || Z === ic0) B.offset = 0, Q = 4;
          else B.offset++, Q = (B.offset & 1) === 1 ? 6 : 4;
        if (G[Q] != null && G[Q].ips.length > 0) D = G[Q];
        else D = G[Q === 4 ? 6 : 4]
      } else D = G[Q];
      if (D == null || D.ips.length === 0) return I;
      if (D.offset == null || D.offset === ic0) D.offset = 0;
      else D.offset++;
      let Y = D.offset % D.ips.length;
      if (I = D.ips[Y] ?? null, I == null) return I;
      if (Date.now() - I.timestamp > I.ttl) return D.ips.splice(Y, 1), this.pick(A, B, Q);
      return I
    }
    setRecords(A, B) {
      let Q = Date.now(),
        I = {
          records: {
            4: null,
            6: null
          }
        };
      for (let G of B) {
        if (G.timestamp = Q, typeof G.ttl === "number") G.ttl = Math.min(G.ttl, this.#A);
        else G.ttl = this.#A;
        let Z = I.records[G.family] ?? {
          ips: []
        };
        Z.ips.push(G), I.records[G.family] = Z
      }
      this.#Q.set(A.hostname, I)
    }
    getHandler(A, B) {
      return new ac0(this, A, B)
    }
  }
  class ac0 extends BE6 {
    #A = null;
    #B = null;
    #Q = null;
    #I = null;
    #G = null;
    constructor(A, {
      origin: B,
      handler: Q,
      dispatch: I
    }, G) {
      super(Q);
      this.#G = B, this.#I = Q, this.#B = {
        ...G
      }, this.#A = A, this.#Q = I
    }
    onError(A) {
      switch (A.code) {
        case "ETIMEDOUT":
        case "ECONNREFUSED": {
          if (this.#A.dualStack) {
            this.#A.runLookup(this.#G, this.#B, (B, Q) => {
              if (B) return this.#I.onError(B);
              let I = {
                ...this.#B,
                origin: Q
              };
              this.#Q(I, this)
            });
            return
          }
          this.#I.onError(A);
          return
        }
        case "ENOTFOUND":
          this.#A.deleteRecord(this.#G);
        default:
          this.#I.onError(A);
          break
      }
    }
  }
  sc0.exports = (A) => {
    if (A?.maxTTL != null && (typeof A?.maxTTL !== "number" || A?.maxTTL < 0)) throw new Am("Invalid maxTTL. Must be a positive number");
    if (A?.maxItems != null && (typeof A?.maxItems !== "number" || A?.maxItems < 1)) throw new Am("Invalid maxItems. Must be a positive number and greater than zero");
    if (A?.affinity != null && A?.affinity !== 4 && A?.affinity !== 6) throw new Am("Invalid affinity. Must be either 4 or 6");
    if (A?.dualStack != null && typeof A?.dualStack !== "boolean") throw new Am("Invalid dualStack. Must be a boolean");
    if (A?.lookup != null && typeof A?.lookup !== "function") throw new Am("Invalid lookup. Must be a function");
    if (A?.pick != null && typeof A?.pick !== "function") throw new Am("Invalid pick. Must be a function");
    let B = A?.dualStack ?? !0,
      Q;
    if (B) Q = A?.affinity ?? null;
    else Q = A?.affinity ?? 4;
    let I = {
        maxTTL: A?.maxTTL ?? 1e4,
        lookup: A?.lookup ?? null,
        pick: A?.pick ?? null,
        dualStack: B,
        affinity: Q,
        maxItems: A?.maxItems ?? 1 / 0
      },
      G = new nc0(I);
    return (Z) => {
      return function D(Y, W) {
        let J = Y.origin.constructor === URL ? Y.origin : new URL(Y.origin);
        if (ew6(J.hostname) !== 0) return Z(Y, W);
        return G.runLookup(J, Y, (F, X) => {
          if (F) return W.onError(F);
          let V = null;
          V = {
            ...Y,
            servername: J.hostname,
            origin: X,
            headers: {
              host: J.hostname,
              ...Y.headers
            }
          }, Z(V, G.getHandler({
            origin: J,
            dispatch: Z,
            handler: W
          }, Y))
        }), !0
      }
    }
  }
})
// @from(Start 5575052, End 5584590)
$j = z((MO8, Il0) => {
  var {
    kConstruct: IE6
  } = A3(), {
    kEnumerableProperty: Bm
  } = C6(), {
    iteratorMixin: GE6,
    isValidHeaderName: Co,
    isValidHeaderValue: tc0
  } = MJ(), {
    webidl: G5
  } = jG(), tp1 = Z1("node:assert"), UW1 = Z1("node:util"), C7 = Symbol("headers map"), OJ = Symbol("headers map sorted");

  function oc0(A) {
    return A === 10 || A === 13 || A === 9 || A === 32
  }

  function ec0(A) {
    let B = 0,
      Q = A.length;
    while (Q > B && oc0(A.charCodeAt(Q - 1))) --Q;
    while (Q > B && oc0(A.charCodeAt(B))) ++B;
    return B === 0 && Q === A.length ? A : A.substring(B, Q)
  }

  function Al0(A, B) {
    if (Array.isArray(B))
      for (let Q = 0; Q < B.length; ++Q) {
        let I = B[Q];
        if (I.length !== 2) throw G5.errors.exception({
          header: "Headers constructor",
          message: `expected name/value pair to be length 2, found ${I.length}.`
        });
        ep1(A, I[0], I[1])
      } else if (typeof B === "object" && B !== null) {
        let Q = Object.keys(B);
        for (let I = 0; I < Q.length; ++I) ep1(A, Q[I], B[Q[I]])
      } else throw G5.errors.conversionFailed({
        prefix: "Headers constructor",
        argument: "Argument 1",
        types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
      })
  }

  function ep1(A, B, Q) {
    if (Q = ec0(Q), !Co(B)) throw G5.errors.invalidArgument({
      prefix: "Headers.append",
      value: B,
      type: "header name"
    });
    else if (!tc0(Q)) throw G5.errors.invalidArgument({
      prefix: "Headers.append",
      value: Q,
      type: "header value"
    });
    if (Ql0(A) === "immutable") throw new TypeError("immutable");
    return Ac1(A).append(B, Q, !1)
  }

  function Bl0(A, B) {
    return A[0] < B[0] ? -1 : 1
  }
  class NW1 {
    cookies = null;
    constructor(A) {
      if (A instanceof NW1) this[C7] = new Map(A[C7]), this[OJ] = A[OJ], this.cookies = A.cookies === null ? null : [...A.cookies];
      else this[C7] = new Map(A), this[OJ] = null
    }
    contains(A, B) {
      return this[C7].has(B ? A : A.toLowerCase())
    }
    clear() {
      this[C7].clear(), this[OJ] = null, this.cookies = null
    }
    append(A, B, Q) {
      this[OJ] = null;
      let I = Q ? A : A.toLowerCase(),
        G = this[C7].get(I);
      if (G) {
        let Z = I === "cookie" ? "; " : ", ";
        this[C7].set(I, {
          name: G.name,
          value: `${G.value}${Z}${B}`
        })
      } else this[C7].set(I, {
        name: A,
        value: B
      });
      if (I === "set-cookie")(this.cookies ??= []).push(B)
    }
    set(A, B, Q) {
      this[OJ] = null;
      let I = Q ? A : A.toLowerCase();
      if (I === "set-cookie") this.cookies = [B];
      this[C7].set(I, {
        name: A,
        value: B
      })
    }
    delete(A, B) {
      if (this[OJ] = null, !B) A = A.toLowerCase();
      if (A === "set-cookie") this.cookies = null;
      this[C7].delete(A)
    }
    get(A, B) {
      return this[C7].get(B ? A : A.toLowerCase())?.value ?? null
    }*[Symbol.iterator]() {
      for (let {
          0: A,
          1: {
            value: B
          }
        }
        of this[C7]) yield [A, B]
    }
    get entries() {
      let A = {};
      if (this[C7].size !== 0)
        for (let {
            name: B,
            value: Q
          }
          of this[C7].values()) A[B] = Q;
      return A
    }
    rawValues() {
      return this[C7].values()
    }
    get entriesList() {
      let A = [];
      if (this[C7].size !== 0)
        for (let {
            0: B,
            1: {
              name: Q,
              value: I
            }
          }
          of this[C7])
          if (B === "set-cookie")
            for (let G of this.cookies) A.push([Q, G]);
          else A.push([Q, I]);
      return A
    }
    toSortedArray() {
      let A = this[C7].size,
        B = new Array(A);
      if (A <= 32) {
        if (A === 0) return B;
        let Q = this[C7][Symbol.iterator](),
          I = Q.next().value;
        B[0] = [I[0], I[1].value], tp1(I[1].value !== null);
        for (let G = 1, Z = 0, D = 0, Y = 0, W = 0, J, F; G < A; ++G) {
          F = Q.next().value, J = B[G] = [F[0], F[1].value], tp1(J[1] !== null), Y = 0, D = G;
          while (Y < D)
            if (W = Y + (D - Y >> 1), B[W][0] <= J[0]) Y = W + 1;
            else D = W;
          if (G !== W) {
            Z = G;
            while (Z > Y) B[Z] = B[--Z];
            B[Y] = J
          }
        }
        if (!Q.next().done) throw new TypeError("Unreachable");
        return B
      } else {
        let Q = 0;
        for (let {
            0: I,
            1: {
              value: G
            }
          }
          of this[C7]) B[Q++] = [I, G], tp1(G !== null);
        return B.sort(Bl0)
      }
    }
  }
  class kZ {
    #A;
    #B;
    constructor(A = void 0) {
      if (G5.util.markAsUncloneable(this), A === IE6) return;
      if (this.#B = new NW1, this.#A = "none", A !== void 0) A = G5.converters.HeadersInit(A, "Headers contructor", "init"), Al0(this, A)
    }
    append(A, B) {
      G5.brandCheck(this, kZ), G5.argumentLengthCheck(arguments, 2, "Headers.append");
      let Q = "Headers.append";
      return A = G5.converters.ByteString(A, Q, "name"), B = G5.converters.ByteString(B, Q, "value"), ep1(this, A, B)
    }
    delete(A) {
      G5.brandCheck(this, kZ), G5.argumentLengthCheck(arguments, 1, "Headers.delete");
      let B = "Headers.delete";
      if (A = G5.converters.ByteString(A, B, "name"), !Co(A)) throw G5.errors.invalidArgument({
        prefix: "Headers.delete",
        value: A,
        type: "header name"
      });
      if (this.#A === "immutable") throw new TypeError("immutable");
      if (!this.#B.contains(A, !1)) return;
      this.#B.delete(A, !1)
    }
    get(A) {
      G5.brandCheck(this, kZ), G5.argumentLengthCheck(arguments, 1, "Headers.get");
      let B = "Headers.get";
      if (A = G5.converters.ByteString(A, B, "name"), !Co(A)) throw G5.errors.invalidArgument({
        prefix: B,
        value: A,
        type: "header name"
      });
      return this.#B.get(A, !1)
    }
    has(A) {
      G5.brandCheck(this, kZ), G5.argumentLengthCheck(arguments, 1, "Headers.has");
      let B = "Headers.has";
      if (A = G5.converters.ByteString(A, B, "name"), !Co(A)) throw G5.errors.invalidArgument({
        prefix: B,
        value: A,
        type: "header name"
      });
      return this.#B.contains(A, !1)
    }
    set(A, B) {
      G5.brandCheck(this, kZ), G5.argumentLengthCheck(arguments, 2, "Headers.set");
      let Q = "Headers.set";
      if (A = G5.converters.ByteString(A, Q, "name"), B = G5.converters.ByteString(B, Q, "value"), B = ec0(B), !Co(A)) throw G5.errors.invalidArgument({
        prefix: Q,
        value: A,
        type: "header name"
      });
      else if (!tc0(B)) throw G5.errors.invalidArgument({
        prefix: Q,
        value: B,
        type: "header value"
      });
      if (this.#A === "immutable") throw new TypeError("immutable");
      this.#B.set(A, B, !1)
    }
    getSetCookie() {
      G5.brandCheck(this, kZ);
      let A = this.#B.cookies;
      if (A) return [...A];
      return []
    }
    get[OJ]() {
      if (this.#B[OJ]) return this.#B[OJ];
      let A = [],
        B = this.#B.toSortedArray(),
        Q = this.#B.cookies;
      if (Q === null || Q.length === 1) return this.#B[OJ] = B;
      for (let I = 0; I < B.length; ++I) {
        let {
          0: G,
          1: Z
        } = B[I];
        if (G === "set-cookie")
          for (let D = 0; D < Q.length; ++D) A.push([G, Q[D]]);
        else A.push([G, Z])
      }
      return this.#B[OJ] = A
    } [UW1.inspect.custom](A, B) {
      return B.depth ??= A, `Headers ${UW1.formatWithOptions(B,this.#B.entries)}`
    }
    static getHeadersGuard(A) {
      return A.#A
    }
    static setHeadersGuard(A, B) {
      A.#A = B
    }
    static getHeadersList(A) {
      return A.#B
    }
    static setHeadersList(A, B) {
      A.#B = B
    }
  }
  var {
    getHeadersGuard: Ql0,
    setHeadersGuard: ZE6,
    getHeadersList: Ac1,
    setHeadersList: DE6
  } = kZ;
  Reflect.deleteProperty(kZ, "getHeadersGuard");
  Reflect.deleteProperty(kZ, "setHeadersGuard");
  Reflect.deleteProperty(kZ, "getHeadersList");
  Reflect.deleteProperty(kZ, "setHeadersList");
  GE6("Headers", kZ, OJ, 0, 1);
  Object.defineProperties(kZ.prototype, {
    append: Bm,
    delete: Bm,
    get: Bm,
    has: Bm,
    set: Bm,
    getSetCookie: Bm,
    [Symbol.toStringTag]: {
      value: "Headers",
      configurable: !0
    },
    [UW1.inspect.custom]: {
      enumerable: !1
    }
  });
  G5.converters.HeadersInit = function(A, B, Q) {
    if (G5.util.Type(A) === "Object") {
      let I = Reflect.get(A, Symbol.iterator);
      if (!UW1.types.isProxy(A) && I === kZ.prototype.entries) try {
        return Ac1(A).entriesList
      } catch {}
      if (typeof I === "function") return G5.converters["sequence<sequence<ByteString>>"](A, B, Q, I.bind(A));
      return G5.converters["record<ByteString, ByteString>"](A, B, Q)
    }
    throw G5.errors.conversionFailed({
      prefix: "Headers constructor",
      argument: "Argument 1",
      types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
    })
  };
  Il0.exports = {
    fill: Al0,
    compareHeaderName: Bl0,
    Headers: kZ,
    HeadersList: NW1,
    getHeadersGuard: Ql0,
    setHeadersGuard: ZE6,
    setHeadersList: DE6,
    getHeadersList: Ac1
  }
})
// @from(Start 5584596, End 5593665)
Ho = z((LO8, Cl0) => {
  var {
    Headers: Jl0,
    HeadersList: Gl0,
    fill: YE6,
    getHeadersGuard: WE6,
    setHeadersGuard: Fl0,
    setHeadersList: Xl0
  } = $j(), {
    extractBody: Zl0,
    cloneBody: JE6,
    mixinBody: FE6,
    hasFinalizationRegistry: XE6,
    streamRegistry: VE6,
    bodyUnusable: CE6
  } = gh(), Bc1 = C6(), Dl0 = Z1("node:util"), {
    kEnumerableProperty: TJ
  } = Bc1, {
    isValidReasonPhrase: KE6,
    isCancelled: HE6,
    isAborted: zE6,
    isBlobLike: wE6,
    serializeJavascriptValueToJSONString: EE6,
    isErrorLike: UE6,
    isomorphicEncode: NE6,
    environmentSettingsObject: $E6
  } = MJ(), {
    redirectStatusSet: qE6,
    nullBodyStatus: ME6
  } = fr(), {
    kState: n3,
    kHeaders: iN
  } = LR(), {
    webidl: a4
  } = jG(), {
    FormData: LE6
  } = mr(), {
    URLSerializer: Yl0
  } = nY(), {
    kConstruct: qW1
  } = A3(), Qc1 = Z1("node:assert"), {
    types: RE6
  } = Z1("node:util"), OE6 = new TextEncoder("utf-8");
  class xZ {
    static error() {
      return Ko(MW1(), "immutable")
    }
    static json(A, B = {}) {
      if (a4.argumentLengthCheck(arguments, 1, "Response.json"), B !== null) B = a4.converters.ResponseInit(B);
      let Q = OE6.encode(EE6(A)),
        I = Zl0(Q),
        G = Ko(Qm({}), "response");
      return Wl0(G, B, {
        body: I[0],
        type: "application/json"
      }), G
    }
    static redirect(A, B = 302) {
      a4.argumentLengthCheck(arguments, 1, "Response.redirect"), A = a4.converters.USVString(A), B = a4.converters["unsigned short"](B);
      let Q;
      try {
        Q = new URL(A, $E6.settingsObject.baseUrl)
      } catch (Z) {
        throw new TypeError(`Failed to parse URL from ${A}`, {
          cause: Z
        })
      }
      if (!qE6.has(B)) throw new RangeError(`Invalid status code ${B}`);
      let I = Ko(Qm({}), "immutable");
      I[n3].status = B;
      let G = NE6(Yl0(Q));
      return I[n3].headersList.append("location", G, !0), I
    }
    constructor(A = null, B = {}) {
      if (a4.util.markAsUncloneable(this), A === qW1) return;
      if (A !== null) A = a4.converters.BodyInit(A);
      B = a4.converters.ResponseInit(B), this[n3] = Qm({}), this[iN] = new Jl0(qW1), Fl0(this[iN], "response"), Xl0(this[iN], this[n3].headersList);
      let Q = null;
      if (A != null) {
        let [I, G] = Zl0(A);
        Q = {
          body: I,
          type: G
        }
      }
      Wl0(this, B, Q)
    }
    get type() {
      return a4.brandCheck(this, xZ), this[n3].type
    }
    get url() {
      a4.brandCheck(this, xZ);
      let A = this[n3].urlList,
        B = A[A.length - 1] ?? null;
      if (B === null) return "";
      return Yl0(B, !0)
    }
    get redirected() {
      return a4.brandCheck(this, xZ), this[n3].urlList.length > 1
    }
    get status() {
      return a4.brandCheck(this, xZ), this[n3].status
    }
    get ok() {
      return a4.brandCheck(this, xZ), this[n3].status >= 200 && this[n3].status <= 299
    }
    get statusText() {
      return a4.brandCheck(this, xZ), this[n3].statusText
    }
    get headers() {
      return a4.brandCheck(this, xZ), this[iN]
    }
    get body() {
      return a4.brandCheck(this, xZ), this[n3].body ? this[n3].body.stream : null
    }
    get bodyUsed() {
      return a4.brandCheck(this, xZ), !!this[n3].body && Bc1.isDisturbed(this[n3].body.stream)
    }
    clone() {
      if (a4.brandCheck(this, xZ), CE6(this)) throw a4.errors.exception({
        header: "Response.clone",
        message: "Body has already been consumed."
      });
      let A = Ic1(this[n3]);
      return Ko(A, WE6(this[iN]))
    } [Dl0.inspect.custom](A, B) {
      if (B.depth === null) B.depth = 2;
      B.colors ??= !0;
      let Q = {
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        body: this.body,
        bodyUsed: this.bodyUsed,
        ok: this.ok,
        redirected: this.redirected,
        type: this.type,
        url: this.url
      };
      return `Response ${Dl0.formatWithOptions(B,Q)}`
    }
  }
  FE6(xZ);
  Object.defineProperties(xZ.prototype, {
    type: TJ,
    url: TJ,
    status: TJ,
    ok: TJ,
    redirected: TJ,
    statusText: TJ,
    headers: TJ,
    clone: TJ,
    body: TJ,
    bodyUsed: TJ,
    [Symbol.toStringTag]: {
      value: "Response",
      configurable: !0
    }
  });
  Object.defineProperties(xZ, {
    json: TJ,
    redirect: TJ,
    error: TJ
  });

  function Ic1(A) {
    if (A.internalResponse) return Vl0(Ic1(A.internalResponse), A.type);
    let B = Qm({
      ...A,
      body: null
    });
    if (A.body != null) B.body = JE6(B, A.body);
    return B
  }

  function Qm(A) {
    return {
      aborted: !1,
      rangeRequested: !1,
      timingAllowPassed: !1,
      requestIncludesCredentials: !1,
      type: "default",
      status: 200,
      timingInfo: null,
      cacheState: "",
      statusText: "",
      ...A,
      headersList: A?.headersList ? new Gl0(A?.headersList) : new Gl0,
      urlList: A?.urlList ? [...A.urlList] : []
    }
  }

  function MW1(A) {
    let B = UE6(A);
    return Qm({
      type: "error",
      status: 0,
      error: B ? A : new Error(A ? String(A) : A),
      aborted: A && A.name === "AbortError"
    })
  }

  function TE6(A) {
    return A.type === "error" && A.status === 0
  }

  function $W1(A, B) {
    return B = {
      internalResponse: A,
      ...B
    }, new Proxy(A, {
      get(Q, I) {
        return I in B ? B[I] : Q[I]
      },
      set(Q, I, G) {
        return Qc1(!(I in B)), Q[I] = G, !0
      }
    })
  }

  function Vl0(A, B) {
    if (B === "basic") return $W1(A, {
      type: "basic",
      headersList: A.headersList
    });
    else if (B === "cors") return $W1(A, {
      type: "cors",
      headersList: A.headersList
    });
    else if (B === "opaque") return $W1(A, {
      type: "opaque",
      urlList: Object.freeze([]),
      status: 0,
      statusText: "",
      body: null
    });
    else if (B === "opaqueredirect") return $W1(A, {
      type: "opaqueredirect",
      status: 0,
      statusText: "",
      headersList: [],
      body: null
    });
    else Qc1(!1)
  }

  function PE6(A, B = null) {
    return Qc1(HE6(A)), zE6(A) ? MW1(Object.assign(new DOMException("The operation was aborted.", "AbortError"), {
      cause: B
    })) : MW1(Object.assign(new DOMException("Request was cancelled."), {
      cause: B
    }))
  }

  function Wl0(A, B, Q) {
    if (B.status !== null && (B.status < 200 || B.status > 599)) throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
    if ("statusText" in B && B.statusText != null) {
      if (!KE6(String(B.statusText))) throw new TypeError("Invalid statusText")
    }
    if ("status" in B && B.status != null) A[n3].status = B.status;
    if ("statusText" in B && B.statusText != null) A[n3].statusText = B.statusText;
    if ("headers" in B && B.headers != null) YE6(A[iN], B.headers);
    if (Q) {
      if (ME6.includes(A.status)) throw a4.errors.exception({
        header: "Response constructor",
        message: `Invalid response status code ${A.status}`
      });
      if (A[n3].body = Q.body, Q.type != null && !A[n3].headersList.contains("content-type", !0)) A[n3].headersList.append("content-type", Q.type, !0)
    }
  }

  function Ko(A, B) {
    let Q = new xZ(qW1);
    if (Q[n3] = A, Q[iN] = new Jl0(qW1), Xl0(Q[iN], A.headersList), Fl0(Q[iN], B), XE6 && A.body?.stream) VE6.register(Q, new WeakRef(A.body.stream));
    return Q
  }
  a4.converters.ReadableStream = a4.interfaceConverter(ReadableStream);
  a4.converters.FormData = a4.interfaceConverter(LE6);
  a4.converters.URLSearchParams = a4.interfaceConverter(URLSearchParams);
  a4.converters.XMLHttpRequestBodyInit = function(A, B, Q) {
    if (typeof A === "string") return a4.converters.USVString(A, B, Q);
    if (wE6(A)) return a4.converters.Blob(A, B, Q, {
      strict: !1
    });
    if (ArrayBuffer.isView(A) || RE6.isArrayBuffer(A)) return a4.converters.BufferSource(A, B, Q);
    if (Bc1.isFormDataLike(A)) return a4.converters.FormData(A, B, Q, {
      strict: !1
    });
    if (A instanceof URLSearchParams) return a4.converters.URLSearchParams(A, B, Q);
    return a4.converters.DOMString(A, B, Q)
  };
  a4.converters.BodyInit = function(A, B, Q) {
    if (A instanceof ReadableStream) return a4.converters.ReadableStream(A, B, Q);
    if (A?.[Symbol.asyncIterator]) return A;
    return a4.converters.XMLHttpRequestBodyInit(A, B, Q)
  };
  a4.converters.ResponseInit = a4.dictionaryConverter([{
    key: "status",
    converter: a4.converters["unsigned short"],
    defaultValue: () => 200
  }, {
    key: "statusText",
    converter: a4.converters.ByteString,
    defaultValue: () => ""
  }, {
    key: "headers",
    converter: a4.converters.HeadersInit
  }]);
  Cl0.exports = {
    isNetworkError: TE6,
    makeNetworkError: MW1,
    makeResponse: Qm,
    makeAppropriateNetworkError: PE6,
    filterResponse: Vl0,
    Response: xZ,
    cloneResponse: Ic1,
    fromInnerResponse: Ko
  }
})
// @from(Start 5593671, End 5594463)
Ul0 = z((RO8, El0) => {
  var {
    kConnected: Kl0,
    kSize: Hl0
  } = A3();
  class zl0 {
    constructor(A) {
      this.value = A
    }
    deref() {
      return this.value[Kl0] === 0 && this.value[Hl0] === 0 ? void 0 : this.value
    }
  }
  class wl0 {
    constructor(A) {
      this.finalizer = A
    }
    register(A, B) {
      if (A.on) A.on("disconnect", () => {
        if (A[Kl0] === 0 && A[Hl0] === 0) this.finalizer(B)
      })
    }
    unregister(A) {}
  }
  El0.exports = function() {
    if (process.env.NODE_V8_COVERAGE && process.version.startsWith("v18")) return process._rawDebug("Using compatibility WeakRef and FinalizationRegistry"), {
      WeakRef: zl0,
      FinalizationRegistry: wl0
    };
    return {
      WeakRef,
      FinalizationRegistry
    }
  }
})