
// @from(Start 5594469, End 5610175)
Im = z((OO8, xl0) => {
  var {
    extractBody: SE6,
    mixinBody: _E6,
    cloneBody: jE6,
    bodyUnusable: Nl0
  } = gh(), {
    Headers: Sl0,
    fill: yE6,
    HeadersList: TW1,
    setHeadersGuard: Zc1,
    getHeadersGuard: kE6,
    setHeadersList: _l0,
    getHeadersList: $l0
  } = $j(), {
    FinalizationRegistry: xE6
  } = Ul0()(), RW1 = C6(), ql0 = Z1("node:util"), {
    isValidHTTPToken: fE6,
    sameOrigin: Ml0,
    environmentSettingsObject: LW1
  } = MJ(), {
    forbiddenMethodsSet: vE6,
    corsSafeListedMethodsSet: bE6,
    referrerPolicy: gE6,
    requestRedirect: hE6,
    requestMode: mE6,
    requestCredentials: dE6,
    requestCache: uE6,
    requestDuplex: pE6
  } = fr(), {
    kEnumerableProperty: K7,
    normalizedMethodRecordsBase: cE6,
    normalizedMethodRecords: lE6
  } = RW1, {
    kHeaders: PJ,
    kSignal: OW1,
    kState: MB,
    kDispatcher: Gc1
  } = LR(), {
    webidl: o9
  } = jG(), {
    URLSerializer: iE6
  } = nY(), {
    kConstruct: PW1
  } = A3(), nE6 = Z1("node:assert"), {
    getMaxListeners: Ll0,
    setMaxListeners: Rl0,
    getEventListeners: aE6,
    defaultMaxListeners: Ol0
  } = Z1("node:events"), sE6 = Symbol("abortController"), jl0 = new xE6(({
    signal: A,
    abort: B
  }) => {
    A.removeEventListener("abort", B)
  }), SW1 = new WeakMap;

  function Tl0(A) {
    return B;

    function B() {
      let Q = A.deref();
      if (Q !== void 0) {
        jl0.unregister(B), this.removeEventListener("abort", B), Q.abort(this.reason);
        let I = SW1.get(Q.signal);
        if (I !== void 0) {
          if (I.size !== 0) {
            for (let G of I) {
              let Z = G.deref();
              if (Z !== void 0) Z.abort(this.reason)
            }
            I.clear()
          }
          SW1.delete(Q.signal)
        }
      }
    }
  }
  var Pl0 = !1;
  class c8 {
    constructor(A, B = {}) {
      if (o9.util.markAsUncloneable(this), A === PW1) return;
      let Q = "Request constructor";
      o9.argumentLengthCheck(arguments, 1, Q), A = o9.converters.RequestInfo(A, Q, "input"), B = o9.converters.RequestInit(B, Q, "init");
      let I = null,
        G = null,
        Z = LW1.settingsObject.baseUrl,
        D = null;
      if (typeof A === "string") {
        this[Gc1] = B.dispatcher;
        let N;
        try {
          N = new URL(A, Z)
        } catch (q) {
          throw new TypeError("Failed to parse URL from " + A, {
            cause: q
          })
        }
        if (N.username || N.password) throw new TypeError("Request cannot be constructed from a URL that includes credentials: " + A);
        I = _W1({
          urlList: [N]
        }), G = "cors"
      } else this[Gc1] = B.dispatcher || A[Gc1], nE6(A instanceof c8), I = A[MB], D = A[OW1];
      let Y = LW1.settingsObject.origin,
        W = "client";
      if (I.window?.constructor?.name === "EnvironmentSettingsObject" && Ml0(I.window, Y)) W = I.window;
      if (B.window != null) throw new TypeError(`'window' option '${W}' must be null`);
      if ("window" in B) W = "no-window";
      I = _W1({
        method: I.method,
        headersList: I.headersList,
        unsafeRequest: I.unsafeRequest,
        client: LW1.settingsObject,
        window: W,
        priority: I.priority,
        origin: I.origin,
        referrer: I.referrer,
        referrerPolicy: I.referrerPolicy,
        mode: I.mode,
        credentials: I.credentials,
        cache: I.cache,
        redirect: I.redirect,
        integrity: I.integrity,
        keepalive: I.keepalive,
        reloadNavigation: I.reloadNavigation,
        historyNavigation: I.historyNavigation,
        urlList: [...I.urlList]
      });
      let J = Object.keys(B).length !== 0;
      if (J) {
        if (I.mode === "navigate") I.mode = "same-origin";
        I.reloadNavigation = !1, I.historyNavigation = !1, I.origin = "client", I.referrer = "client", I.referrerPolicy = "", I.url = I.urlList[I.urlList.length - 1], I.urlList = [I.url]
      }
      if (B.referrer !== void 0) {
        let N = B.referrer;
        if (N === "") I.referrer = "no-referrer";
        else {
          let q;
          try {
            q = new URL(N, Z)
          } catch (O) {
            throw new TypeError(`Referrer "${N}" is not a valid URL.`, {
              cause: O
            })
          }
          if (q.protocol === "about:" && q.hostname === "client" || Y && !Ml0(q, LW1.settingsObject.baseUrl)) I.referrer = "client";
          else I.referrer = q
        }
      }
      if (B.referrerPolicy !== void 0) I.referrerPolicy = B.referrerPolicy;
      let F;
      if (B.mode !== void 0) F = B.mode;
      else F = G;
      if (F === "navigate") throw o9.errors.exception({
        header: "Request constructor",
        message: "invalid request mode navigate."
      });
      if (F != null) I.mode = F;
      if (B.credentials !== void 0) I.credentials = B.credentials;
      if (B.cache !== void 0) I.cache = B.cache;
      if (I.cache === "only-if-cached" && I.mode !== "same-origin") throw new TypeError("'only-if-cached' can be set only with 'same-origin' mode");
      if (B.redirect !== void 0) I.redirect = B.redirect;
      if (B.integrity != null) I.integrity = String(B.integrity);
      if (B.keepalive !== void 0) I.keepalive = Boolean(B.keepalive);
      if (B.method !== void 0) {
        let N = B.method,
          q = lE6[N];
        if (q !== void 0) I.method = q;
        else {
          if (!fE6(N)) throw new TypeError(`'${N}' is not a valid HTTP method.`);
          let O = N.toUpperCase();
          if (vE6.has(O)) throw new TypeError(`'${N}' HTTP method is unsupported.`);
          N = cE6[O] ?? N, I.method = N
        }
        if (!Pl0 && I.method === "patch") process.emitWarning("Using `patch` is highly likely to result in a `405 Method Not Allowed`. `PATCH` is much more likely to succeed.", {
          code: "UNDICI-FETCH-patch"
        }), Pl0 = !0
      }
      if (B.signal !== void 0) D = B.signal;
      this[MB] = I;
      let X = new AbortController;
      if (this[OW1] = X.signal, D != null) {
        if (!D || typeof D.aborted !== "boolean" || typeof D.addEventListener !== "function") throw new TypeError("Failed to construct 'Request': member signal is not of type AbortSignal.");
        if (D.aborted) X.abort(D.reason);
        else {
          this[sE6] = X;
          let N = new WeakRef(X),
            q = Tl0(N);
          try {
            if (typeof Ll0 === "function" && Ll0(D) === Ol0) Rl0(1500, D);
            else if (aE6(D, "abort").length >= Ol0) Rl0(1500, D)
          } catch {}
          RW1.addAbortListener(D, q), jl0.register(X, {
            signal: D,
            abort: q
          }, q)
        }
      }
      if (this[PJ] = new Sl0(PW1), _l0(this[PJ], I.headersList), Zc1(this[PJ], "request"), F === "no-cors") {
        if (!bE6.has(I.method)) throw new TypeError(`'${I.method} is unsupported in no-cors mode.`);
        Zc1(this[PJ], "request-no-cors")
      }
      if (J) {
        let N = $l0(this[PJ]),
          q = B.headers !== void 0 ? B.headers : new TW1(N);
        if (N.clear(), q instanceof TW1) {
          for (let {
              name: O,
              value: R
            }
            of q.rawValues()) N.append(O, R, !1);
          N.cookies = q.cookies
        } else yE6(this[PJ], q)
      }
      let V = A instanceof c8 ? A[MB].body : null;
      if ((B.body != null || V != null) && (I.method === "GET" || I.method === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body.");
      let C = null;
      if (B.body != null) {
        let [N, q] = SE6(B.body, I.keepalive);
        if (C = N, q && !$l0(this[PJ]).contains("content-type", !0)) this[PJ].append("content-type", q)
      }
      let K = C ?? V;
      if (K != null && K.source == null) {
        if (C != null && B.duplex == null) throw new TypeError("RequestInit: duplex option is required when sending a body.");
        if (I.mode !== "same-origin" && I.mode !== "cors") throw new TypeError('If request is made from ReadableStream, mode should be "same-origin" or "cors"');
        I.useCORSPreflightFlag = !0
      }
      let E = K;
      if (C == null && V != null) {
        if (Nl0(A)) throw new TypeError("Cannot construct a Request with a Request object that has already been used.");
        let N = new TransformStream;
        V.stream.pipeThrough(N), E = {
          source: V.source,
          length: V.length,
          stream: N.readable
        }
      }
      this[MB].body = E
    }
    get method() {
      return o9.brandCheck(this, c8), this[MB].method
    }
    get url() {
      return o9.brandCheck(this, c8), iE6(this[MB].url)
    }
    get headers() {
      return o9.brandCheck(this, c8), this[PJ]
    }
    get destination() {
      return o9.brandCheck(this, c8), this[MB].destination
    }
    get referrer() {
      if (o9.brandCheck(this, c8), this[MB].referrer === "no-referrer") return "";
      if (this[MB].referrer === "client") return "about:client";
      return this[MB].referrer.toString()
    }
    get referrerPolicy() {
      return o9.brandCheck(this, c8), this[MB].referrerPolicy
    }
    get mode() {
      return o9.brandCheck(this, c8), this[MB].mode
    }
    get credentials() {
      return this[MB].credentials
    }
    get cache() {
      return o9.brandCheck(this, c8), this[MB].cache
    }
    get redirect() {
      return o9.brandCheck(this, c8), this[MB].redirect
    }
    get integrity() {
      return o9.brandCheck(this, c8), this[MB].integrity
    }
    get keepalive() {
      return o9.brandCheck(this, c8), this[MB].keepalive
    }
    get isReloadNavigation() {
      return o9.brandCheck(this, c8), this[MB].reloadNavigation
    }
    get isHistoryNavigation() {
      return o9.brandCheck(this, c8), this[MB].historyNavigation
    }
    get signal() {
      return o9.brandCheck(this, c8), this[OW1]
    }
    get body() {
      return o9.brandCheck(this, c8), this[MB].body ? this[MB].body.stream : null
    }
    get bodyUsed() {
      return o9.brandCheck(this, c8), !!this[MB].body && RW1.isDisturbed(this[MB].body.stream)
    }
    get duplex() {
      return o9.brandCheck(this, c8), "half"
    }
    clone() {
      if (o9.brandCheck(this, c8), Nl0(this)) throw new TypeError("unusable");
      let A = yl0(this[MB]),
        B = new AbortController;
      if (this.signal.aborted) B.abort(this.signal.reason);
      else {
        let Q = SW1.get(this.signal);
        if (Q === void 0) Q = new Set, SW1.set(this.signal, Q);
        let I = new WeakRef(B);
        Q.add(I), RW1.addAbortListener(B.signal, Tl0(I))
      }
      return kl0(A, B.signal, kE6(this[PJ]))
    } [ql0.inspect.custom](A, B) {
      if (B.depth === null) B.depth = 2;
      B.colors ??= !0;
      let Q = {
        method: this.method,
        url: this.url,
        headers: this.headers,
        destination: this.destination,
        referrer: this.referrer,
        referrerPolicy: this.referrerPolicy,
        mode: this.mode,
        credentials: this.credentials,
        cache: this.cache,
        redirect: this.redirect,
        integrity: this.integrity,
        keepalive: this.keepalive,
        isReloadNavigation: this.isReloadNavigation,
        isHistoryNavigation: this.isHistoryNavigation,
        signal: this.signal
      };
      return `Request ${ql0.formatWithOptions(B,Q)}`
    }
  }
  _E6(c8);

  function _W1(A) {
    return {
      method: A.method ?? "GET",
      localURLsOnly: A.localURLsOnly ?? !1,
      unsafeRequest: A.unsafeRequest ?? !1,
      body: A.body ?? null,
      client: A.client ?? null,
      reservedClient: A.reservedClient ?? null,
      replacesClientId: A.replacesClientId ?? "",
      window: A.window ?? "client",
      keepalive: A.keepalive ?? !1,
      serviceWorkers: A.serviceWorkers ?? "all",
      initiator: A.initiator ?? "",
      destination: A.destination ?? "",
      priority: A.priority ?? null,
      origin: A.origin ?? "client",
      policyContainer: A.policyContainer ?? "client",
      referrer: A.referrer ?? "client",
      referrerPolicy: A.referrerPolicy ?? "",
      mode: A.mode ?? "no-cors",
      useCORSPreflightFlag: A.useCORSPreflightFlag ?? !1,
      credentials: A.credentials ?? "same-origin",
      useCredentials: A.useCredentials ?? !1,
      cache: A.cache ?? "default",
      redirect: A.redirect ?? "follow",
      integrity: A.integrity ?? "",
      cryptoGraphicsNonceMetadata: A.cryptoGraphicsNonceMetadata ?? "",
      parserMetadata: A.parserMetadata ?? "",
      reloadNavigation: A.reloadNavigation ?? !1,
      historyNavigation: A.historyNavigation ?? !1,
      userActivation: A.userActivation ?? !1,
      taintedOrigin: A.taintedOrigin ?? !1,
      redirectCount: A.redirectCount ?? 0,
      responseTainting: A.responseTainting ?? "basic",
      preventNoCacheCacheControlHeaderModification: A.preventNoCacheCacheControlHeaderModification ?? !1,
      done: A.done ?? !1,
      timingAllowFailed: A.timingAllowFailed ?? !1,
      urlList: A.urlList,
      url: A.urlList[0],
      headersList: A.headersList ? new TW1(A.headersList) : new TW1
    }
  }

  function yl0(A) {
    let B = _W1({
      ...A,
      body: null
    });
    if (A.body != null) B.body = jE6(B, A.body);
    return B
  }

  function kl0(A, B, Q) {
    let I = new c8(PW1);
    return I[MB] = A, I[OW1] = B, I[PJ] = new Sl0(PW1), _l0(I[PJ], A.headersList), Zc1(I[PJ], Q), I
  }
  Object.defineProperties(c8.prototype, {
    method: K7,
    url: K7,
    headers: K7,
    redirect: K7,
    clone: K7,
    signal: K7,
    duplex: K7,
    destination: K7,
    body: K7,
    bodyUsed: K7,
    isHistoryNavigation: K7,
    isReloadNavigation: K7,
    keepalive: K7,
    integrity: K7,
    cache: K7,
    credentials: K7,
    attribute: K7,
    referrerPolicy: K7,
    referrer: K7,
    mode: K7,
    [Symbol.toStringTag]: {
      value: "Request",
      configurable: !0
    }
  });
  o9.converters.Request = o9.interfaceConverter(c8);
  o9.converters.RequestInfo = function(A, B, Q) {
    if (typeof A === "string") return o9.converters.USVString(A, B, Q);
    if (A instanceof c8) return o9.converters.Request(A, B, Q);
    return o9.converters.USVString(A, B, Q)
  };
  o9.converters.AbortSignal = o9.interfaceConverter(AbortSignal);
  o9.converters.RequestInit = o9.dictionaryConverter([{
    key: "method",
    converter: o9.converters.ByteString
  }, {
    key: "headers",
    converter: o9.converters.HeadersInit
  }, {
    key: "body",
    converter: o9.nullableConverter(o9.converters.BodyInit)
  }, {
    key: "referrer",
    converter: o9.converters.USVString
  }, {
    key: "referrerPolicy",
    converter: o9.converters.DOMString,
    allowedValues: gE6
  }, {
    key: "mode",
    converter: o9.converters.DOMString,
    allowedValues: mE6
  }, {
    key: "credentials",
    converter: o9.converters.DOMString,
    allowedValues: dE6
  }, {
    key: "cache",
    converter: o9.converters.DOMString,
    allowedValues: uE6
  }, {
    key: "redirect",
    converter: o9.converters.DOMString,
    allowedValues: hE6
  }, {
    key: "integrity",
    converter: o9.converters.DOMString
  }, {
    key: "keepalive",
    converter: o9.converters.boolean
  }, {
    key: "signal",
    converter: o9.nullableConverter((A) => o9.converters.AbortSignal(A, "RequestInit", "signal", {
      strict: !1
    }))
  }, {
    key: "window",
    converter: o9.converters.any
  }, {
    key: "duplex",
    converter: o9.converters.DOMString,
    allowedValues: pE6
  }, {
    key: "dispatcher",
    converter: o9.converters.any
  }]);
  xl0.exports = {
    Request: c8,
    makeRequest: _W1,
    fromInnerRequest: kl0,
    cloneRequest: yl0
  }
})
// @from(Start 5610181, End 5635423)
wo = z((TO8, sl0) => {
  var {
    makeNetworkError: W8,
    makeAppropriateNetworkError: jW1,
    filterResponse: Dc1,
    makeResponse: yW1,
    fromInnerResponse: rE6
  } = Ho(), {
    HeadersList: fl0
  } = $j(), {
    Request: oE6,
    cloneRequest: tE6
  } = Im(), fR = Z1("node:zlib"), {
    bytesMatch: eE6,
    makePolicyContainer: AU6,
    clonePolicyContainer: BU6,
    requestBadPort: QU6,
    TAOCheck: IU6,
    appendRequestOriginHeader: GU6,
    responseLocationURL: ZU6,
    requestCurrentURL: jw,
    setRequestReferrerPolicyOnRedirect: DU6,
    tryUpgradeRequestToAPotentiallyTrustworthyURL: YU6,
    createOpaqueTimingInfo: Xc1,
    appendFetchMetadata: WU6,
    corsCheck: JU6,
    crossOriginResourcePolicyCheck: FU6,
    determineRequestsReferrer: XU6,
    coarsenedSharedCurrentTime: zo,
    createDeferredPromise: VU6,
    isBlobLike: CU6,
    sameOrigin: Fc1,
    isCancelled: qj,
    isAborted: vl0,
    isErrorLike: KU6,
    fullyReadBody: HU6,
    readableStreamClose: zU6,
    isomorphicEncode: kW1,
    urlIsLocal: wU6,
    urlIsHttpHttpsScheme: Vc1,
    urlHasHttpsScheme: EU6,
    clampAndCoarsenConnectionTimingInfo: UU6,
    simpleRangeHeaderValue: NU6,
    buildContentRange: $U6,
    createInflate: qU6,
    extractMimeType: MU6
  } = MJ(), {
    kState: ml0,
    kDispatcher: LU6
  } = LR(), Mj = Z1("node:assert"), {
    safelyExtractBody: Cc1,
    extractBody: bl0
  } = gh(), {
    redirectStatusSet: dl0,
    nullBodyStatus: ul0,
    safeMethodsSet: RU6,
    requestBodyHeader: OU6,
    subresourceSet: TU6
  } = fr(), PU6 = Z1("node:events"), {
    Readable: SU6,
    pipeline: _U6,
    finished: jU6
  } = Z1("node:stream"), {
    addAbortListener: yU6,
    isErrored: kU6,
    isReadable: xW1,
    bufferToLowerCasedHeaderName: gl0
  } = C6(), {
    dataURLProcessor: xU6,
    serializeAMimeType: fU6,
    minimizeSupportedMimeType: vU6
  } = nY(), {
    getGlobalDispatcher: bU6
  } = wW1(), {
    webidl: gU6
  } = jG(), {
    STATUS_CODES: hU6
  } = Z1("node:http"), mU6 = ["GET", "HEAD"], dU6 = typeof __UNDICI_IS_NODE__ !== "undefined" || typeof esbuildDetection !== "undefined" ? "node" : "undici", Yc1;
  class Kc1 extends PU6 {
    constructor(A) {
      super();
      this.dispatcher = A, this.connection = null, this.dump = !1, this.state = "ongoing"
    }
    terminate(A) {
      if (this.state !== "ongoing") return;
      this.state = "terminated", this.connection?.destroy(A), this.emit("terminated", A)
    }
    abort(A) {
      if (this.state !== "ongoing") return;
      if (this.state = "aborted", !A) A = new DOMException("The operation was aborted.", "AbortError");
      this.serializedAbortReason = A, this.connection?.destroy(A), this.emit("terminated", A)
    }
  }

  function uU6(A) {
    pl0(A, "fetch")
  }

  function pU6(A, B = void 0) {
    gU6.argumentLengthCheck(arguments, 1, "globalThis.fetch");
    let Q = VU6(),
      I;
    try {
      I = new oE6(A, B)
    } catch (F) {
      return Q.reject(F), Q.promise
    }
    let G = I[ml0];
    if (I.signal.aborted) return Wc1(Q, G, null, I.signal.reason), Q.promise;
    if (G.client.globalObject?.constructor?.name === "ServiceWorkerGlobalScope") G.serviceWorkers = "none";
    let D = null,
      Y = !1,
      W = null;
    return yU6(I.signal, () => {
      Y = !0, Mj(W != null), W.abort(I.signal.reason);
      let F = D?.deref();
      Wc1(Q, G, F, I.signal.reason)
    }), W = ll0({
      request: G,
      processResponseEndOfBody: uU6,
      processResponse: (F) => {
        if (Y) return;
        if (F.aborted) {
          Wc1(Q, G, D, W.serializedAbortReason);
          return
        }
        if (F.type === "error") {
          Q.reject(new TypeError("fetch failed", {
            cause: F.error
          }));
          return
        }
        D = new WeakRef(rE6(F, "immutable")), Q.resolve(D.deref()), Q = null
      },
      dispatcher: I[LU6]
    }), Q.promise
  }

  function pl0(A, B = "other") {
    if (A.type === "error" && A.aborted) return;
    if (!A.urlList?.length) return;
    let Q = A.urlList[0],
      I = A.timingInfo,
      G = A.cacheState;
    if (!Vc1(Q)) return;
    if (I === null) return;
    if (!A.timingAllowPassed) I = Xc1({
      startTime: I.startTime
    }), G = "";
    I.endTime = zo(), A.timingInfo = I, cl0(I, Q.href, B, globalThis, G)
  }
  var cl0 = performance.markResourceTiming;

  function Wc1(A, B, Q, I) {
    if (A) A.reject(I);
    if (B.body != null && xW1(B.body?.stream)) B.body.stream.cancel(I).catch((Z) => {
      if (Z.code === "ERR_INVALID_STATE") return;
      throw Z
    });
    if (Q == null) return;
    let G = Q[ml0];
    if (G.body != null && xW1(G.body?.stream)) G.body.stream.cancel(I).catch((Z) => {
      if (Z.code === "ERR_INVALID_STATE") return;
      throw Z
    })
  }

  function ll0({
    request: A,
    processRequestBodyChunkLength: B,
    processRequestEndOfBody: Q,
    processResponse: I,
    processResponseEndOfBody: G,
    processResponseConsumeBody: Z,
    useParallelQueue: D = !1,
    dispatcher: Y = bU6()
  }) {
    Mj(Y);
    let W = null,
      J = !1;
    if (A.client != null) W = A.client.globalObject, J = A.client.crossOriginIsolatedCapability;
    let F = zo(J),
      X = Xc1({
        startTime: F
      }),
      V = {
        controller: new Kc1(Y),
        request: A,
        timingInfo: X,
        processRequestBodyChunkLength: B,
        processRequestEndOfBody: Q,
        processResponse: I,
        processResponseConsumeBody: Z,
        processResponseEndOfBody: G,
        taskDestination: W,
        crossOriginIsolatedCapability: J
      };
    if (Mj(!A.body || A.body.stream), A.window === "client") A.window = A.client?.globalObject?.constructor?.name === "Window" ? A.client : "no-window";
    if (A.origin === "client") A.origin = A.client.origin;
    if (A.policyContainer === "client")
      if (A.client != null) A.policyContainer = BU6(A.client.policyContainer);
      else A.policyContainer = AU6();
    if (!A.headersList.contains("accept", !0)) A.headersList.append("accept", "*/*", !0);
    if (!A.headersList.contains("accept-language", !0)) A.headersList.append("accept-language", "*", !0);
    if (A.priority === null);
    if (TU6.has(A.destination));
    return il0(V).catch((C) => {
      V.controller.terminate(C)
    }), V.controller
  }
  async function il0(A, B = !1) {
    let Q = A.request,
      I = null;
    if (Q.localURLsOnly && !wU6(jw(Q))) I = W8("local URLs only");
    if (YU6(Q), QU6(Q) === "blocked") I = W8("bad port");
    if (Q.referrerPolicy === "") Q.referrerPolicy = Q.policyContainer.referrerPolicy;
    if (Q.referrer !== "no-referrer") Q.referrer = XU6(Q);
    if (I === null) I = await (async () => {
      let Z = jw(Q);
      if (Fc1(Z, Q.url) && Q.responseTainting === "basic" || Z.protocol === "data:" || (Q.mode === "navigate" || Q.mode === "websocket")) return Q.responseTainting = "basic", await hl0(A);
      if (Q.mode === "same-origin") return W8('request mode cannot be "same-origin"');
      if (Q.mode === "no-cors") {
        if (Q.redirect !== "follow") return W8('redirect mode cannot be "follow" for "no-cors" request');
        return Q.responseTainting = "opaque", await hl0(A)
      }
      if (!Vc1(jw(Q))) return W8("URL scheme must be a HTTP(S) scheme");
      return Q.responseTainting = "cors", await nl0(A)
    })();
    if (B) return I;
    if (I.status !== 0 && !I.internalResponse) {
      if (Q.responseTainting === "cors");
      if (Q.responseTainting === "basic") I = Dc1(I, "basic");
      else if (Q.responseTainting === "cors") I = Dc1(I, "cors");
      else if (Q.responseTainting === "opaque") I = Dc1(I, "opaque");
      else Mj(!1)
    }
    let G = I.status === 0 ? I : I.internalResponse;
    if (G.urlList.length === 0) G.urlList.push(...Q.urlList);
    if (!Q.timingAllowFailed) I.timingAllowPassed = !0;
    if (I.type === "opaque" && G.status === 206 && G.rangeRequested && !Q.headers.contains("range", !0)) I = G = W8();
    if (I.status !== 0 && (Q.method === "HEAD" || Q.method === "CONNECT" || ul0.includes(G.status))) G.body = null, A.controller.dump = !0;
    if (Q.integrity) {
      let Z = (Y) => Jc1(A, W8(Y));
      if (Q.responseTainting === "opaque" || I.body == null) {
        Z(I.error);
        return
      }
      let D = (Y) => {
        if (!eE6(Y, Q.integrity)) {
          Z("integrity mismatch");
          return
        }
        I.body = Cc1(Y)[0], Jc1(A, I)
      };
      await HU6(I.body, D, Z)
    } else Jc1(A, I)
  }

  function hl0(A) {
    if (qj(A) && A.request.redirectCount === 0) return Promise.resolve(jW1(A));
    let {
      request: B
    } = A, {
      protocol: Q
    } = jw(B);
    switch (Q) {
      case "about:":
        return Promise.resolve(W8("about scheme is not supported"));
      case "blob:": {
        if (!Yc1) Yc1 = Z1("node:buffer").resolveObjectURL;
        let I = jw(B);
        if (I.search.length !== 0) return Promise.resolve(W8("NetworkError when attempting to fetch resource."));
        let G = Yc1(I.toString());
        if (B.method !== "GET" || !CU6(G)) return Promise.resolve(W8("invalid method"));
        let Z = yW1(),
          D = G.size,
          Y = kW1(`${D}`),
          W = G.type;
        if (!B.headersList.contains("range", !0)) {
          let J = bl0(G);
          Z.statusText = "OK", Z.body = J[0], Z.headersList.set("content-length", Y, !0), Z.headersList.set("content-type", W, !0)
        } else {
          Z.rangeRequested = !0;
          let J = B.headersList.get("range", !0),
            F = NU6(J, !0);
          if (F === "failure") return Promise.resolve(W8("failed to fetch the data URL"));
          let {
            rangeStartValue: X,
            rangeEndValue: V
          } = F;
          if (X === null) X = D - V, V = X + V - 1;
          else {
            if (X >= D) return Promise.resolve(W8("Range start is greater than the blob's size."));
            if (V === null || V >= D) V = D - 1
          }
          let C = G.slice(X, V, W),
            K = bl0(C);
          Z.body = K[0];
          let E = kW1(`${C.size}`),
            N = $U6(X, V, D);
          Z.status = 206, Z.statusText = "Partial Content", Z.headersList.set("content-length", E, !0), Z.headersList.set("content-type", W, !0), Z.headersList.set("content-range", N, !0)
        }
        return Promise.resolve(Z)
      }
      case "data:": {
        let I = jw(B),
          G = xU6(I);
        if (G === "failure") return Promise.resolve(W8("failed to fetch the data URL"));
        let Z = fU6(G.mimeType);
        return Promise.resolve(yW1({
          statusText: "OK",
          headersList: [
            ["content-type", {
              name: "Content-Type",
              value: Z
            }]
          ],
          body: Cc1(G.body)[0]
        }))
      }
      case "file:":
        return Promise.resolve(W8("not implemented... yet..."));
      case "http:":
      case "https:":
        return nl0(A).catch((I) => W8(I));
      default:
        return Promise.resolve(W8("unknown scheme"))
    }
  }

  function cU6(A, B) {
    if (A.request.done = !0, A.processResponseDone != null) queueMicrotask(() => A.processResponseDone(B))
  }

  function Jc1(A, B) {
    let Q = A.timingInfo,
      I = () => {
        let Z = Date.now();
        if (A.request.destination === "document") A.controller.fullTimingInfo = Q;
        A.controller.reportTimingSteps = () => {
          if (A.request.url.protocol !== "https:") return;
          Q.endTime = Z;
          let {
            cacheState: Y,
            bodyInfo: W
          } = B;
          if (!B.timingAllowPassed) Q = Xc1(Q), Y = "";
          let J = 0;
          if (A.request.mode !== "navigator" || !B.hasCrossOriginRedirects) {
            J = B.status;
            let F = MU6(B.headersList);
            if (F !== "failure") W.contentType = vU6(F)
          }
          if (A.request.initiatorType != null) cl0(Q, A.request.url.href, A.request.initiatorType, globalThis, Y, W, J)
        };
        let D = () => {
          if (A.request.done = !0, A.processResponseEndOfBody != null) queueMicrotask(() => A.processResponseEndOfBody(B));
          if (A.request.initiatorType != null) A.controller.reportTimingSteps()
        };
        queueMicrotask(() => D())
      };
    if (A.processResponse != null) queueMicrotask(() => {
      A.processResponse(B), A.processResponse = null
    });
    let G = B.type === "error" ? B : B.internalResponse ?? B;
    if (G.body == null) I();
    else jU6(G.body.stream, () => {
      I()
    })
  }
  async function nl0(A) {
    let B = A.request,
      Q = null,
      I = null,
      G = A.timingInfo;
    if (B.serviceWorkers === "all");
    if (Q === null) {
      if (B.redirect === "follow") B.serviceWorkers = "none";
      if (I = Q = await al0(A), B.responseTainting === "cors" && JU6(B, Q) === "failure") return W8("cors failure");
      if (IU6(B, Q) === "failure") B.timingAllowFailed = !0
    }
    if ((B.responseTainting === "opaque" || Q.type === "opaque") && FU6(B.origin, B.client, B.destination, I) === "blocked") return W8("blocked");
    if (dl0.has(I.status)) {
      if (B.redirect !== "manual") A.controller.connection.destroy(void 0, !1);
      if (B.redirect === "error") Q = W8("unexpected redirect");
      else if (B.redirect === "manual") Q = I;
      else if (B.redirect === "follow") Q = await lU6(A, Q);
      else Mj(!1)
    }
    return Q.timingInfo = G, Q
  }

  function lU6(A, B) {
    let Q = A.request,
      I = B.internalResponse ? B.internalResponse : B,
      G;
    try {
      if (G = ZU6(I, jw(Q).hash), G == null) return B
    } catch (D) {
      return Promise.resolve(W8(D))
    }
    if (!Vc1(G)) return Promise.resolve(W8("URL scheme must be a HTTP(S) scheme"));
    if (Q.redirectCount === 20) return Promise.resolve(W8("redirect count exceeded"));
    if (Q.redirectCount += 1, Q.mode === "cors" && (G.username || G.password) && !Fc1(Q, G)) return Promise.resolve(W8('cross origin not allowed for request mode "cors"'));
    if (Q.responseTainting === "cors" && (G.username || G.password)) return Promise.resolve(W8('URL cannot contain credentials for request mode "cors"'));
    if (I.status !== 303 && Q.body != null && Q.body.source == null) return Promise.resolve(W8());
    if ([301, 302].includes(I.status) && Q.method === "POST" || I.status === 303 && !mU6.includes(Q.method)) {
      Q.method = "GET", Q.body = null;
      for (let D of OU6) Q.headersList.delete(D)
    }
    if (!Fc1(jw(Q), G)) Q.headersList.delete("authorization", !0), Q.headersList.delete("proxy-authorization", !0), Q.headersList.delete("cookie", !0), Q.headersList.delete("host", !0);
    if (Q.body != null) Mj(Q.body.source != null), Q.body = Cc1(Q.body.source)[0];
    let Z = A.timingInfo;
    if (Z.redirectEndTime = Z.postRedirectStartTime = zo(A.crossOriginIsolatedCapability), Z.redirectStartTime === 0) Z.redirectStartTime = Z.startTime;
    return Q.urlList.push(G), DU6(Q, I), il0(A, !0)
  }
  async function al0(A, B = !1, Q = !1) {
    let I = A.request,
      G = null,
      Z = null,
      D = null,
      Y = null,
      W = !1;
    if (I.window === "no-window" && I.redirect === "error") G = A, Z = I;
    else Z = tE6(I), G = {
      ...A
    }, G.request = Z;
    let J = I.credentials === "include" || I.credentials === "same-origin" && I.responseTainting === "basic",
      F = Z.body ? Z.body.length : null,
      X = null;
    if (Z.body == null && ["POST", "PUT"].includes(Z.method)) X = "0";
    if (F != null) X = kW1(`${F}`);
    if (X != null) Z.headersList.append("content-length", X, !0);
    if (F != null && Z.keepalive);
    if (Z.referrer instanceof URL) Z.headersList.append("referer", kW1(Z.referrer.href), !0);
    if (GU6(Z), WU6(Z), !Z.headersList.contains("user-agent", !0)) Z.headersList.append("user-agent", dU6);
    if (Z.cache === "default" && (Z.headersList.contains("if-modified-since", !0) || Z.headersList.contains("if-none-match", !0) || Z.headersList.contains("if-unmodified-since", !0) || Z.headersList.contains("if-match", !0) || Z.headersList.contains("if-range", !0))) Z.cache = "no-store";
    if (Z.cache === "no-cache" && !Z.preventNoCacheCacheControlHeaderModification && !Z.headersList.contains("cache-control", !0)) Z.headersList.append("cache-control", "max-age=0", !0);
    if (Z.cache === "no-store" || Z.cache === "reload") {
      if (!Z.headersList.contains("pragma", !0)) Z.headersList.append("pragma", "no-cache", !0);
      if (!Z.headersList.contains("cache-control", !0)) Z.headersList.append("cache-control", "no-cache", !0)
    }
    if (Z.headersList.contains("range", !0)) Z.headersList.append("accept-encoding", "identity", !0);
    if (!Z.headersList.contains("accept-encoding", !0))
      if (EU6(jw(Z))) Z.headersList.append("accept-encoding", "br, gzip, deflate", !0);
      else Z.headersList.append("accept-encoding", "gzip, deflate", !0);
    if (Z.headersList.delete("host", !0), Y == null) Z.cache = "no-store";
    if (Z.cache !== "no-store" && Z.cache !== "reload");
    if (D == null) {
      if (Z.cache === "only-if-cached") return W8("only if cached");
      let V = await iU6(G, J, Q);
      if (!RU6.has(Z.method) && V.status >= 200 && V.status <= 399);
      if (W && V.status === 304);
      if (D == null) D = V
    }
    if (D.urlList = [...Z.urlList], Z.headersList.contains("range", !0)) D.rangeRequested = !0;
    if (D.requestIncludesCredentials = J, D.status === 407) {
      if (I.window === "no-window") return W8();
      if (qj(A)) return jW1(A);
      return W8("proxy authentication required")
    }
    if (D.status === 421 && !Q && (I.body == null || I.body.source != null)) {
      if (qj(A)) return jW1(A);
      A.controller.connection.destroy(), D = await al0(A, B, !0)
    }
    return D
  }
  async function iU6(A, B = !1, Q = !1) {
    Mj(!A.controller.connection || A.controller.connection.destroyed), A.controller.connection = {
      abort: null,
      destroyed: !1,
      destroy(K, E = !0) {
        if (!this.destroyed) {
          if (this.destroyed = !0, E) this.abort?.(K ?? new DOMException("The operation was aborted.", "AbortError"))
        }
      }
    };
    let I = A.request,
      G = null,
      Z = A.timingInfo;
    if (!0) I.cache = "no-store";
    let Y = Q ? "yes" : "no";
    if (I.mode === "websocket");
    let W = null;
    if (I.body == null && A.processRequestEndOfBody) queueMicrotask(() => A.processRequestEndOfBody());
    else if (I.body != null) {
      let K = async function*(q) {
        if (qj(A)) return;
        yield q, A.processRequestBodyChunkLength?.(q.byteLength)
      }, E = () => {
        if (qj(A)) return;
        if (A.processRequestEndOfBody) A.processRequestEndOfBody()
      }, N = (q) => {
        if (qj(A)) return;
        if (q.name === "AbortError") A.controller.abort();
        else A.controller.terminate(q)
      };
      W = async function*() {
        try {
          for await (let q of I.body.stream) yield* K(q);
          E()
        } catch (q) {
          N(q)
        }
      }()
    }
    try {
      let {
        body: K,
        status: E,
        statusText: N,
        headersList: q,
        socket: O
      } = await C({
        body: W
      });
      if (O) G = yW1({
        status: E,
        statusText: N,
        headersList: q,
        socket: O
      });
      else {
        let R = K[Symbol.asyncIterator]();
        A.controller.next = () => R.next(), G = yW1({
          status: E,
          statusText: N,
          headersList: q
        })
      }
    } catch (K) {
      if (K.name === "AbortError") return A.controller.connection.destroy(), jW1(A, K);
      return W8(K)
    }
    let J = async () => {
      await A.controller.resume()
    }, F = (K) => {
      if (!qj(A)) A.controller.abort(K)
    }, X = new ReadableStream({
      async start(K) {
        A.controller.controller = K
      },
      async pull(K) {
        await J(K)
      },
      async cancel(K) {
        await F(K)
      },
      type: "bytes"
    });
    G.body = {
      stream: X,
      source: null,
      length: null
    }, A.controller.onAborted = V, A.controller.on("terminated", V), A.controller.resume = async () => {
      while (!0) {
        let K, E;
        try {
          let {
            done: q,
            value: O
          } = await A.controller.next();
          if (vl0(A)) break;
          K = q ? void 0 : O
        } catch (q) {
          if (A.controller.ended && !Z.encodedBodySize) K = void 0;
          else K = q, E = !0
        }
        if (K === void 0) {
          zU6(A.controller.controller), cU6(A, G);
          return
        }
        if (Z.decodedBodySize += K?.byteLength ?? 0, E) {
          A.controller.terminate(K);
          return
        }
        let N = new Uint8Array(K);
        if (N.byteLength) A.controller.controller.enqueue(N);
        if (kU6(X)) {
          A.controller.terminate();
          return
        }
        if (A.controller.controller.desiredSize <= 0) return
      }
    };

    function V(K) {
      if (vl0(A)) {
        if (G.aborted = !0, xW1(X)) A.controller.controller.error(A.controller.serializedAbortReason)
      } else if (xW1(X)) A.controller.controller.error(new TypeError("terminated", {
        cause: KU6(K) ? K : void 0
      }));
      A.controller.connection.destroy()
    }
    return G;

    function C({
      body: K
    }) {
      let E = jw(I),
        N = A.controller.dispatcher;
      return new Promise((q, O) => N.dispatch({
        path: E.pathname + E.search,
        origin: E.origin,
        method: I.method,
        body: N.isMockActive ? I.body && (I.body.source || I.body.stream) : K,
        headers: I.headersList.entries,
        maxRedirections: 0,
        upgrade: I.mode === "websocket" ? "websocket" : void 0
      }, {
        body: null,
        abort: null,
        onConnect(R) {
          let {
            connection: T
          } = A.controller;
          if (Z.finalConnectionTimingInfo = UU6(void 0, Z.postRedirectStartTime, A.crossOriginIsolatedCapability), T.destroyed) R(new DOMException("The operation was aborted.", "AbortError"));
          else A.controller.on("terminated", R), this.abort = T.abort = R;
          Z.finalNetworkRequestStartTime = zo(A.crossOriginIsolatedCapability)
        },
        onResponseStarted() {
          Z.finalNetworkResponseStartTime = zo(A.crossOriginIsolatedCapability)
        },
        onHeaders(R, T, L, _) {
          if (R < 200) return;
          let k = [],
            i = "",
            x = new fl0;
          for (let v = 0; v < T.length; v += 2) x.append(gl0(T[v]), T[v + 1].toString("latin1"), !0);
          let s = x.get("content-encoding", !0);
          if (s) k = s.toLowerCase().split(",").map((v) => v.trim());
          i = x.get("location", !0), this.body = new SU6({
            read: L
          });
          let d = [],
            F1 = i && I.redirect === "follow" && dl0.has(R);
          if (k.length !== 0 && I.method !== "HEAD" && I.method !== "CONNECT" && !ul0.includes(R) && !F1)
            for (let v = k.length - 1; v >= 0; --v) {
              let D1 = k[v];
              if (D1 === "x-gzip" || D1 === "gzip") d.push(fR.createGunzip({
                flush: fR.constants.Z_SYNC_FLUSH,
                finishFlush: fR.constants.Z_SYNC_FLUSH
              }));
              else if (D1 === "deflate") d.push(qU6({
                flush: fR.constants.Z_SYNC_FLUSH,
                finishFlush: fR.constants.Z_SYNC_FLUSH
              }));
              else if (D1 === "br") d.push(fR.createBrotliDecompress({
                flush: fR.constants.BROTLI_OPERATION_FLUSH,
                finishFlush: fR.constants.BROTLI_OPERATION_FLUSH
              }));
              else {
                d.length = 0;
                break
              }
            }
          let X1 = this.onError.bind(this);
          return q({
            status: R,
            statusText: _,
            headersList: x,
            body: d.length ? _U6(this.body, ...d, (v) => {
              if (v) this.onError(v)
            }).on("error", X1) : this.body.on("error", X1)
          }), !0
        },
        onData(R) {
          if (A.controller.dump) return;
          let T = R;
          return Z.encodedBodySize += T.byteLength, this.body.push(T)
        },
        onComplete() {
          if (this.abort) A.controller.off("terminated", this.abort);
          if (A.controller.onAborted) A.controller.off("terminated", A.controller.onAborted);
          A.controller.ended = !0, this.body.push(null)
        },
        onError(R) {
          if (this.abort) A.controller.off("terminated", this.abort);
          this.body?.destroy(R), A.controller.terminate(R), O(R)
        },
        onUpgrade(R, T, L) {
          if (R !== 101) return;
          let _ = new fl0;
          for (let k = 0; k < T.length; k += 2) _.append(gl0(T[k]), T[k + 1].toString("latin1"), !0);
          return q({
            status: R,
            statusText: hU6[R],
            headersList: _,
            socket: L
          }), !0
        }
      }))
    }
  }
  sl0.exports = {
    fetch: pU6,
    Fetch: Kc1,
    fetching: ll0,
    finalizeAndReportTiming: pl0
  }
})
// @from(Start 5635429, End 5635771)
Hc1 = z((PO8, rl0) => {
  rl0.exports = {
    kState: Symbol("FileReader state"),
    kResult: Symbol("FileReader result"),
    kError: Symbol("FileReader error"),
    kLastProgressEventFired: Symbol("FileReader last progress event fired timestamp"),
    kEvents: Symbol("FileReader events"),
    kAborted: Symbol("FileReader aborted")
  }
})
// @from(Start 5635777, End 5637156)
tl0 = z((SO8, ol0) => {
  var {
    webidl: SJ
  } = jG(), fW1 = Symbol("ProgressEvent state");
  class Eo extends Event {
    constructor(A, B = {}) {
      A = SJ.converters.DOMString(A, "ProgressEvent constructor", "type"), B = SJ.converters.ProgressEventInit(B ?? {});
      super(A, B);
      this[fW1] = {
        lengthComputable: B.lengthComputable,
        loaded: B.loaded,
        total: B.total
      }
    }
    get lengthComputable() {
      return SJ.brandCheck(this, Eo), this[fW1].lengthComputable
    }
    get loaded() {
      return SJ.brandCheck(this, Eo), this[fW1].loaded
    }
    get total() {
      return SJ.brandCheck(this, Eo), this[fW1].total
    }
  }
  SJ.converters.ProgressEventInit = SJ.dictionaryConverter([{
    key: "lengthComputable",
    converter: SJ.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "loaded",
    converter: SJ.converters["unsigned long long"],
    defaultValue: () => 0
  }, {
    key: "total",
    converter: SJ.converters["unsigned long long"],
    defaultValue: () => 0
  }, {
    key: "bubbles",
    converter: SJ.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "cancelable",
    converter: SJ.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "composed",
    converter: SJ.converters.boolean,
    defaultValue: () => !1
  }]);
  ol0.exports = {
    ProgressEvent: Eo
  }
})
// @from(Start 5637162, End 5644004)
Ai0 = z((_O8, el0) => {
  function nU6(A) {
    if (!A) return "failure";
    switch (A.trim().toLowerCase()) {
      case "unicode-1-1-utf-8":
      case "unicode11utf8":
      case "unicode20utf8":
      case "utf-8":
      case "utf8":
      case "x-unicode20utf8":
        return "UTF-8";
      case "866":
      case "cp866":
      case "csibm866":
      case "ibm866":
        return "IBM866";
      case "csisolatin2":
      case "iso-8859-2":
      case "iso-ir-101":
      case "iso8859-2":
      case "iso88592":
      case "iso_8859-2":
      case "iso_8859-2:1987":
      case "l2":
      case "latin2":
        return "ISO-8859-2";
      case "csisolatin3":
      case "iso-8859-3":
      case "iso-ir-109":
      case "iso8859-3":
      case "iso88593":
      case "iso_8859-3":
      case "iso_8859-3:1988":
      case "l3":
      case "latin3":
        return "ISO-8859-3";
      case "csisolatin4":
      case "iso-8859-4":
      case "iso-ir-110":
      case "iso8859-4":
      case "iso88594":
      case "iso_8859-4":
      case "iso_8859-4:1988":
      case "l4":
      case "latin4":
        return "ISO-8859-4";
      case "csisolatincyrillic":
      case "cyrillic":
      case "iso-8859-5":
      case "iso-ir-144":
      case "iso8859-5":
      case "iso88595":
      case "iso_8859-5":
      case "iso_8859-5:1988":
        return "ISO-8859-5";
      case "arabic":
      case "asmo-708":
      case "csiso88596e":
      case "csiso88596i":
      case "csisolatinarabic":
      case "ecma-114":
      case "iso-8859-6":
      case "iso-8859-6-e":
      case "iso-8859-6-i":
      case "iso-ir-127":
      case "iso8859-6":
      case "iso88596":
      case "iso_8859-6":
      case "iso_8859-6:1987":
        return "ISO-8859-6";
      case "csisolatingreek":
      case "ecma-118":
      case "elot_928":
      case "greek":
      case "greek8":
      case "iso-8859-7":
      case "iso-ir-126":
      case "iso8859-7":
      case "iso88597":
      case "iso_8859-7":
      case "iso_8859-7:1987":
      case "sun_eu_greek":
        return "ISO-8859-7";
      case "csiso88598e":
      case "csisolatinhebrew":
      case "hebrew":
      case "iso-8859-8":
      case "iso-8859-8-e":
      case "iso-ir-138":
      case "iso8859-8":
      case "iso88598":
      case "iso_8859-8":
      case "iso_8859-8:1988":
      case "visual":
        return "ISO-8859-8";
      case "csiso88598i":
      case "iso-8859-8-i":
      case "logical":
        return "ISO-8859-8-I";
      case "csisolatin6":
      case "iso-8859-10":
      case "iso-ir-157":
      case "iso8859-10":
      case "iso885910":
      case "l6":
      case "latin6":
        return "ISO-8859-10";
      case "iso-8859-13":
      case "iso8859-13":
      case "iso885913":
        return "ISO-8859-13";
      case "iso-8859-14":
      case "iso8859-14":
      case "iso885914":
        return "ISO-8859-14";
      case "csisolatin9":
      case "iso-8859-15":
      case "iso8859-15":
      case "iso885915":
      case "iso_8859-15":
      case "l9":
        return "ISO-8859-15";
      case "iso-8859-16":
        return "ISO-8859-16";
      case "cskoi8r":
      case "koi":
      case "koi8":
      case "koi8-r":
      case "koi8_r":
        return "KOI8-R";
      case "koi8-ru":
      case "koi8-u":
        return "KOI8-U";
      case "csmacintosh":
      case "mac":
      case "macintosh":
      case "x-mac-roman":
        return "macintosh";
      case "iso-8859-11":
      case "iso8859-11":
      case "iso885911":
      case "tis-620":
      case "windows-874":
        return "windows-874";
      case "cp1250":
      case "windows-1250":
      case "x-cp1250":
        return "windows-1250";
      case "cp1251":
      case "windows-1251":
      case "x-cp1251":
        return "windows-1251";
      case "ansi_x3.4-1968":
      case "ascii":
      case "cp1252":
      case "cp819":
      case "csisolatin1":
      case "ibm819":
      case "iso-8859-1":
      case "iso-ir-100":
      case "iso8859-1":
      case "iso88591":
      case "iso_8859-1":
      case "iso_8859-1:1987":
      case "l1":
      case "latin1":
      case "us-ascii":
      case "windows-1252":
      case "x-cp1252":
        return "windows-1252";
      case "cp1253":
      case "windows-1253":
      case "x-cp1253":
        return "windows-1253";
      case "cp1254":
      case "csisolatin5":
      case "iso-8859-9":
      case "iso-ir-148":
      case "iso8859-9":
      case "iso88599":
      case "iso_8859-9":
      case "iso_8859-9:1989":
      case "l5":
      case "latin5":
      case "windows-1254":
      case "x-cp1254":
        return "windows-1254";
      case "cp1255":
      case "windows-1255":
      case "x-cp1255":
        return "windows-1255";
      case "cp1256":
      case "windows-1256":
      case "x-cp1256":
        return "windows-1256";
      case "cp1257":
      case "windows-1257":
      case "x-cp1257":
        return "windows-1257";
      case "cp1258":
      case "windows-1258":
      case "x-cp1258":
        return "windows-1258";
      case "x-mac-cyrillic":
      case "x-mac-ukrainian":
        return "x-mac-cyrillic";
      case "chinese":
      case "csgb2312":
      case "csiso58gb231280":
      case "gb2312":
      case "gb_2312":
      case "gb_2312-80":
      case "gbk":
      case "iso-ir-58":
      case "x-gbk":
        return "GBK";
      case "gb18030":
        return "gb18030";
      case "big5":
      case "big5-hkscs":
      case "cn-big5":
      case "csbig5":
      case "x-x-big5":
        return "Big5";
      case "cseucpkdfmtjapanese":
      case "euc-jp":
      case "x-euc-jp":
        return "EUC-JP";
      case "csiso2022jp":
      case "iso-2022-jp":
        return "ISO-2022-JP";
      case "csshiftjis":
      case "ms932":
      case "ms_kanji":
      case "shift-jis":
      case "shift_jis":
      case "sjis":
      case "windows-31j":
      case "x-sjis":
        return "Shift_JIS";
      case "cseuckr":
      case "csksc56011987":
      case "euc-kr":
      case "iso-ir-149":
      case "korean":
      case "ks_c_5601-1987":
      case "ks_c_5601-1989":
      case "ksc5601":
      case "ksc_5601":
      case "windows-949":
        return "EUC-KR";
      case "csiso2022kr":
      case "hz-gb-2312":
      case "iso-2022-cn":
      case "iso-2022-cn-ext":
      case "iso-2022-kr":
      case "replacement":
        return "replacement";
      case "unicodefffe":
      case "utf-16be":
        return "UTF-16BE";
      case "csunicode":
      case "iso-10646-ucs-2":
      case "ucs-2":
      case "unicode":
      case "unicodefeff":
      case "utf-16":
      case "utf-16le":
        return "UTF-16LE";
      case "x-user-defined":
        return "x-user-defined";
      default:
        return "failure"
    }
  }
  el0.exports = {
    getEncoding: nU6
  }
})
// @from(Start 5644010, End 5647579)
Wi0 = z((jO8, Yi0) => {
  var {
    kState: Gm,
    kError: zc1,
    kResult: Bi0,
    kAborted: Uo,
    kLastProgressEventFired: wc1
  } = Hc1(), {
    ProgressEvent: aU6
  } = tl0(), {
    getEncoding: Qi0
  } = Ai0(), {
    serializeAMimeType: sU6,
    parseMIMEType: Ii0
  } = nY(), {
    types: rU6
  } = Z1("node:util"), {
    StringDecoder: Gi0
  } = Z1("string_decoder"), {
    btoa: Zi0
  } = Z1("node:buffer"), oU6 = {
    enumerable: !0,
    writable: !1,
    configurable: !1
  };

  function tU6(A, B, Q, I) {
    if (A[Gm] === "loading") throw new DOMException("Invalid state", "InvalidStateError");
    A[Gm] = "loading", A[Bi0] = null, A[zc1] = null;
    let Z = B.stream().getReader(),
      D = [],
      Y = Z.read(),
      W = !0;
    (async () => {
      while (!A[Uo]) try {
        let {
          done: J,
          value: F
        } = await Y;
        if (W && !A[Uo]) queueMicrotask(() => {
          vR("loadstart", A)
        });
        if (W = !1, !J && rU6.isUint8Array(F)) {
          if (D.push(F), (A[wc1] === void 0 || Date.now() - A[wc1] >= 50) && !A[Uo]) A[wc1] = Date.now(), queueMicrotask(() => {
            vR("progress", A)
          });
          Y = Z.read()
        } else if (J) {
          queueMicrotask(() => {
            A[Gm] = "done";
            try {
              let X = eU6(D, Q, B.type, I);
              if (A[Uo]) return;
              A[Bi0] = X, vR("load", A)
            } catch (X) {
              A[zc1] = X, vR("error", A)
            }
            if (A[Gm] !== "loading") vR("loadend", A)
          });
          break
        }
      } catch (J) {
        if (A[Uo]) return;
        queueMicrotask(() => {
          if (A[Gm] = "done", A[zc1] = J, vR("error", A), A[Gm] !== "loading") vR("loadend", A)
        });
        break
      }
    })()
  }

  function vR(A, B) {
    let Q = new aU6(A, {
      bubbles: !1,
      cancelable: !1
    });
    B.dispatchEvent(Q)
  }

  function eU6(A, B, Q, I) {
    switch (B) {
      case "DataURL": {
        let G = "data:",
          Z = Ii0(Q || "application/octet-stream");
        if (Z !== "failure") G += sU6(Z);
        G += ";base64,";
        let D = new Gi0("latin1");
        for (let Y of A) G += Zi0(D.write(Y));
        return G += Zi0(D.end()), G
      }
      case "Text": {
        let G = "failure";
        if (I) G = Qi0(I);
        if (G === "failure" && Q) {
          let Z = Ii0(Q);
          if (Z !== "failure") G = Qi0(Z.parameters.get("charset"))
        }
        if (G === "failure") G = "UTF-8";
        return AN6(A, G)
      }
      case "ArrayBuffer":
        return Di0(A).buffer;
      case "BinaryString": {
        let G = "",
          Z = new Gi0("latin1");
        for (let D of A) G += Z.write(D);
        return G += Z.end(), G
      }
    }
  }

  function AN6(A, B) {
    let Q = Di0(A),
      I = BN6(Q),
      G = 0;
    if (I !== null) B = I, G = I === "UTF-8" ? 3 : 2;
    let Z = Q.slice(G);
    return new TextDecoder(B).decode(Z)
  }

  function BN6(A) {
    let [B, Q, I] = A;
    if (B === 239 && Q === 187 && I === 191) return "UTF-8";
    else if (B === 254 && Q === 255) return "UTF-16BE";
    else if (B === 255 && Q === 254) return "UTF-16LE";
    return null
  }

  function Di0(A) {
    let B = A.reduce((I, G) => {
        return I + G.byteLength
      }, 0),
      Q = 0;
    return A.reduce((I, G) => {
      return I.set(G, Q), Q += G.byteLength, I
    }, new Uint8Array(B))
  }
  Yi0.exports = {
    staticPropertyDescriptors: oU6,
    readOperation: tU6,
    fireAProgressEvent: vR
  }
})
// @from(Start 5647585, End 5652607)
Vi0 = z((yO8, Xi0) => {
  var {
    staticPropertyDescriptors: Zm,
    readOperation: vW1,
    fireAProgressEvent: Ji0
  } = Wi0(), {
    kState: Lj,
    kError: Fi0,
    kResult: bW1,
    kEvents: p5,
    kAborted: QN6
  } = Hc1(), {
    webidl: L8
  } = jG(), {
    kEnumerableProperty: rY
  } = C6();
  class J8 extends EventTarget {
    constructor() {
      super();
      this[Lj] = "empty", this[bW1] = null, this[Fi0] = null, this[p5] = {
        loadend: null,
        error: null,
        abort: null,
        load: null,
        progress: null,
        loadstart: null
      }
    }
    readAsArrayBuffer(A) {
      L8.brandCheck(this, J8), L8.argumentLengthCheck(arguments, 1, "FileReader.readAsArrayBuffer"), A = L8.converters.Blob(A, {
        strict: !1
      }), vW1(this, A, "ArrayBuffer")
    }
    readAsBinaryString(A) {
      L8.brandCheck(this, J8), L8.argumentLengthCheck(arguments, 1, "FileReader.readAsBinaryString"), A = L8.converters.Blob(A, {
        strict: !1
      }), vW1(this, A, "BinaryString")
    }
    readAsText(A, B = void 0) {
      if (L8.brandCheck(this, J8), L8.argumentLengthCheck(arguments, 1, "FileReader.readAsText"), A = L8.converters.Blob(A, {
          strict: !1
        }), B !== void 0) B = L8.converters.DOMString(B, "FileReader.readAsText", "encoding");
      vW1(this, A, "Text", B)
    }
    readAsDataURL(A) {
      L8.brandCheck(this, J8), L8.argumentLengthCheck(arguments, 1, "FileReader.readAsDataURL"), A = L8.converters.Blob(A, {
        strict: !1
      }), vW1(this, A, "DataURL")
    }
    abort() {
      if (this[Lj] === "empty" || this[Lj] === "done") {
        this[bW1] = null;
        return
      }
      if (this[Lj] === "loading") this[Lj] = "done", this[bW1] = null;
      if (this[QN6] = !0, Ji0("abort", this), this[Lj] !== "loading") Ji0("loadend", this)
    }
    get readyState() {
      switch (L8.brandCheck(this, J8), this[Lj]) {
        case "empty":
          return this.EMPTY;
        case "loading":
          return this.LOADING;
        case "done":
          return this.DONE
      }
    }
    get result() {
      return L8.brandCheck(this, J8), this[bW1]
    }
    get error() {
      return L8.brandCheck(this, J8), this[Fi0]
    }
    get onloadend() {
      return L8.brandCheck(this, J8), this[p5].loadend
    }
    set onloadend(A) {
      if (L8.brandCheck(this, J8), this[p5].loadend) this.removeEventListener("loadend", this[p5].loadend);
      if (typeof A === "function") this[p5].loadend = A, this.addEventListener("loadend", A);
      else this[p5].loadend = null
    }
    get onerror() {
      return L8.brandCheck(this, J8), this[p5].error
    }
    set onerror(A) {
      if (L8.brandCheck(this, J8), this[p5].error) this.removeEventListener("error", this[p5].error);
      if (typeof A === "function") this[p5].error = A, this.addEventListener("error", A);
      else this[p5].error = null
    }
    get onloadstart() {
      return L8.brandCheck(this, J8), this[p5].loadstart
    }
    set onloadstart(A) {
      if (L8.brandCheck(this, J8), this[p5].loadstart) this.removeEventListener("loadstart", this[p5].loadstart);
      if (typeof A === "function") this[p5].loadstart = A, this.addEventListener("loadstart", A);
      else this[p5].loadstart = null
    }
    get onprogress() {
      return L8.brandCheck(this, J8), this[p5].progress
    }
    set onprogress(A) {
      if (L8.brandCheck(this, J8), this[p5].progress) this.removeEventListener("progress", this[p5].progress);
      if (typeof A === "function") this[p5].progress = A, this.addEventListener("progress", A);
      else this[p5].progress = null
    }
    get onload() {
      return L8.brandCheck(this, J8), this[p5].load
    }
    set onload(A) {
      if (L8.brandCheck(this, J8), this[p5].load) this.removeEventListener("load", this[p5].load);
      if (typeof A === "function") this[p5].load = A, this.addEventListener("load", A);
      else this[p5].load = null
    }
    get onabort() {
      return L8.brandCheck(this, J8), this[p5].abort
    }
    set onabort(A) {
      if (L8.brandCheck(this, J8), this[p5].abort) this.removeEventListener("abort", this[p5].abort);
      if (typeof A === "function") this[p5].abort = A, this.addEventListener("abort", A);
      else this[p5].abort = null
    }
  }
  J8.EMPTY = J8.prototype.EMPTY = 0;
  J8.LOADING = J8.prototype.LOADING = 1;
  J8.DONE = J8.prototype.DONE = 2;
  Object.defineProperties(J8.prototype, {
    EMPTY: Zm,
    LOADING: Zm,
    DONE: Zm,
    readAsArrayBuffer: rY,
    readAsBinaryString: rY,
    readAsText: rY,
    readAsDataURL: rY,
    abort: rY,
    readyState: rY,
    result: rY,
    error: rY,
    onloadstart: rY,
    onprogress: rY,
    onload: rY,
    onabort: rY,
    onerror: rY,
    onloadend: rY,
    [Symbol.toStringTag]: {
      value: "FileReader",
      writable: !1,
      enumerable: !1,
      configurable: !0
    }
  });
  Object.defineProperties(J8, {
    EMPTY: Zm,
    LOADING: Zm,
    DONE: Zm
  });
  Xi0.exports = {
    FileReader: J8
  }
})
// @from(Start 5652613, End 5652693)
gW1 = z((kO8, Ci0) => {
  Ci0.exports = {
    kConstruct: A3().kConstruct
  }
})
// @from(Start 5652699, End 5653165)
zi0 = z((xO8, Hi0) => {
  var IN6 = Z1("node:assert"),
    {
      URLSerializer: Ki0
    } = nY(),
    {
      isValidHeaderName: GN6
    } = MJ();

  function ZN6(A, B, Q = !1) {
    let I = Ki0(A, Q),
      G = Ki0(B, Q);
    return I === G
  }

  function DN6(A) {
    IN6(A !== null);
    let B = [];
    for (let Q of A.split(","))
      if (Q = Q.trim(), GN6(Q)) B.push(Q);
    return B
  }
  Hi0.exports = {
    urlEquals: ZN6,
    getFieldValues: DN6
  }
})
// @from(Start 5653171, End 5664904)
Ui0 = z((fO8, Ei0) => {
  var {
    kConstruct: YN6
  } = gW1(), {
    urlEquals: WN6,
    getFieldValues: Ec1
  } = zi0(), {
    kEnumerableProperty: Rj,
    isDisturbed: JN6
  } = C6(), {
    webidl: k9
  } = jG(), {
    Response: FN6,
    cloneResponse: XN6,
    fromInnerResponse: VN6
  } = Ho(), {
    Request: nN,
    fromInnerRequest: CN6
  } = Im(), {
    kState: BK
  } = LR(), {
    fetching: KN6
  } = wo(), {
    urlIsHttpHttpsScheme: hW1,
    createDeferredPromise: Dm,
    readAllBytes: HN6
  } = MJ(), Uc1 = Z1("node:assert");
  class yw {
    #A;
    constructor() {
      if (arguments[0] !== YN6) k9.illegalConstructor();
      k9.util.markAsUncloneable(this), this.#A = arguments[1]
    }
    async match(A, B = {}) {
      k9.brandCheck(this, yw);
      let Q = "Cache.match";
      k9.argumentLengthCheck(arguments, 1, Q), A = k9.converters.RequestInfo(A, Q, "request"), B = k9.converters.CacheQueryOptions(B, Q, "options");
      let I = this.#G(A, B, 1);
      if (I.length === 0) return;
      return I[0]
    }
    async matchAll(A = void 0, B = {}) {
      k9.brandCheck(this, yw);
      let Q = "Cache.matchAll";
      if (A !== void 0) A = k9.converters.RequestInfo(A, Q, "request");
      return B = k9.converters.CacheQueryOptions(B, Q, "options"), this.#G(A, B)
    }
    async add(A) {
      k9.brandCheck(this, yw);
      let B = "Cache.add";
      k9.argumentLengthCheck(arguments, 1, B), A = k9.converters.RequestInfo(A, B, "request");
      let Q = [A];
      return await this.addAll(Q)
    }
    async addAll(A) {
      k9.brandCheck(this, yw);
      let B = "Cache.addAll";
      k9.argumentLengthCheck(arguments, 1, B);
      let Q = [],
        I = [];
      for (let X of A) {
        if (X === void 0) throw k9.errors.conversionFailed({
          prefix: B,
          argument: "Argument 1",
          types: ["undefined is not allowed"]
        });
        if (X = k9.converters.RequestInfo(X), typeof X === "string") continue;
        let V = X[BK];
        if (!hW1(V.url) || V.method !== "GET") throw k9.errors.exception({
          header: B,
          message: "Expected http/s scheme when method is not GET."
        })
      }
      let G = [];
      for (let X of A) {
        let V = new nN(X)[BK];
        if (!hW1(V.url)) throw k9.errors.exception({
          header: B,
          message: "Expected http/s scheme."
        });
        V.initiator = "fetch", V.destination = "subresource", I.push(V);
        let C = Dm();
        G.push(KN6({
          request: V,
          processResponse(K) {
            if (K.type === "error" || K.status === 206 || K.status < 200 || K.status > 299) C.reject(k9.errors.exception({
              header: "Cache.addAll",
              message: "Received an invalid status code or the request failed."
            }));
            else if (K.headersList.contains("vary")) {
              let E = Ec1(K.headersList.get("vary"));
              for (let N of E)
                if (N === "*") {
                  C.reject(k9.errors.exception({
                    header: "Cache.addAll",
                    message: "invalid vary field value"
                  }));
                  for (let q of G) q.abort();
                  return
                }
            }
          },
          processResponseEndOfBody(K) {
            if (K.aborted) {
              C.reject(new DOMException("aborted", "AbortError"));
              return
            }
            C.resolve(K)
          }
        })), Q.push(C.promise)
      }
      let D = await Promise.all(Q),
        Y = [],
        W = 0;
      for (let X of D) {
        let V = {
          type: "put",
          request: I[W],
          response: X
        };
        Y.push(V), W++
      }
      let J = Dm(),
        F = null;
      try {
        this.#B(Y)
      } catch (X) {
        F = X
      }
      return queueMicrotask(() => {
        if (F === null) J.resolve(void 0);
        else J.reject(F)
      }), J.promise
    }
    async put(A, B) {
      k9.brandCheck(this, yw);
      let Q = "Cache.put";
      k9.argumentLengthCheck(arguments, 2, Q), A = k9.converters.RequestInfo(A, Q, "request"), B = k9.converters.Response(B, Q, "response");
      let I = null;
      if (A instanceof nN) I = A[BK];
      else I = new nN(A)[BK];
      if (!hW1(I.url) || I.method !== "GET") throw k9.errors.exception({
        header: Q,
        message: "Expected an http/s scheme when method is not GET"
      });
      let G = B[BK];
      if (G.status === 206) throw k9.errors.exception({
        header: Q,
        message: "Got 206 status"
      });
      if (G.headersList.contains("vary")) {
        let V = Ec1(G.headersList.get("vary"));
        for (let C of V)
          if (C === "*") throw k9.errors.exception({
            header: Q,
            message: "Got * vary field value"
          })
      }
      if (G.body && (JN6(G.body.stream) || G.body.stream.locked)) throw k9.errors.exception({
        header: Q,
        message: "Response body is locked or disturbed"
      });
      let Z = XN6(G),
        D = Dm();
      if (G.body != null) {
        let C = G.body.stream.getReader();
        HN6(C).then(D.resolve, D.reject)
      } else D.resolve(void 0);
      let Y = [],
        W = {
          type: "put",
          request: I,
          response: Z
        };
      Y.push(W);
      let J = await D.promise;
      if (Z.body != null) Z.body.source = J;
      let F = Dm(),
        X = null;
      try {
        this.#B(Y)
      } catch (V) {
        X = V
      }
      return queueMicrotask(() => {
        if (X === null) F.resolve();
        else F.reject(X)
      }), F.promise
    }
    async delete(A, B = {}) {
      k9.brandCheck(this, yw);
      let Q = "Cache.delete";
      k9.argumentLengthCheck(arguments, 1, Q), A = k9.converters.RequestInfo(A, Q, "request"), B = k9.converters.CacheQueryOptions(B, Q, "options");
      let I = null;
      if (A instanceof nN) {
        if (I = A[BK], I.method !== "GET" && !B.ignoreMethod) return !1
      } else Uc1(typeof A === "string"), I = new nN(A)[BK];
      let G = [],
        Z = {
          type: "delete",
          request: I,
          options: B
        };
      G.push(Z);
      let D = Dm(),
        Y = null,
        W;
      try {
        W = this.#B(G)
      } catch (J) {
        Y = J
      }
      return queueMicrotask(() => {
        if (Y === null) D.resolve(!!W?.length);
        else D.reject(Y)
      }), D.promise
    }
    async keys(A = void 0, B = {}) {
      k9.brandCheck(this, yw);
      let Q = "Cache.keys";
      if (A !== void 0) A = k9.converters.RequestInfo(A, Q, "request");
      B = k9.converters.CacheQueryOptions(B, Q, "options");
      let I = null;
      if (A !== void 0) {
        if (A instanceof nN) {
          if (I = A[BK], I.method !== "GET" && !B.ignoreMethod) return []
        } else if (typeof A === "string") I = new nN(A)[BK]
      }
      let G = Dm(),
        Z = [];
      if (A === void 0)
        for (let D of this.#A) Z.push(D[0]);
      else {
        let D = this.#Q(I, B);
        for (let Y of D) Z.push(Y[0])
      }
      return queueMicrotask(() => {
        let D = [];
        for (let Y of Z) {
          let W = CN6(Y, new AbortController().signal, "immutable");
          D.push(W)
        }
        G.resolve(Object.freeze(D))
      }), G.promise
    }
    #B(A) {
      let B = this.#A,
        Q = [...B],
        I = [],
        G = [];
      try {
        for (let Z of A) {
          if (Z.type !== "delete" && Z.type !== "put") throw k9.errors.exception({
            header: "Cache.#batchCacheOperations",
            message: 'operation type does not match "delete" or "put"'
          });
          if (Z.type === "delete" && Z.response != null) throw k9.errors.exception({
            header: "Cache.#batchCacheOperations",
            message: "delete operation should not have an associated response"
          });
          if (this.#Q(Z.request, Z.options, I).length) throw new DOMException("???", "InvalidStateError");
          let D;
          if (Z.type === "delete") {
            if (D = this.#Q(Z.request, Z.options), D.length === 0) return [];
            for (let Y of D) {
              let W = B.indexOf(Y);
              Uc1(W !== -1), B.splice(W, 1)
            }
          } else if (Z.type === "put") {
            if (Z.response == null) throw k9.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "put operation should have an associated response"
            });
            let Y = Z.request;
            if (!hW1(Y.url)) throw k9.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "expected http or https scheme"
            });
            if (Y.method !== "GET") throw k9.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "not get method"
            });
            if (Z.options != null) throw k9.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "options must not be defined"
            });
            D = this.#Q(Z.request);
            for (let W of D) {
              let J = B.indexOf(W);
              Uc1(J !== -1), B.splice(J, 1)
            }
            B.push([Z.request, Z.response]), I.push([Z.request, Z.response])
          }
          G.push([Z.request, Z.response])
        }
        return G
      } catch (Z) {
        throw this.#A.length = 0, this.#A = Q, Z
      }
    }
    #Q(A, B, Q) {
      let I = [],
        G = Q ?? this.#A;
      for (let Z of G) {
        let [D, Y] = Z;
        if (this.#I(A, D, Y, B)) I.push(Z)
      }
      return I
    }
    #I(A, B, Q = null, I) {
      let G = new URL(A.url),
        Z = new URL(B.url);
      if (I?.ignoreSearch) Z.search = "", G.search = "";
      if (!WN6(G, Z, !0)) return !1;
      if (Q == null || I?.ignoreVary || !Q.headersList.contains("vary")) return !0;
      let D = Ec1(Q.headersList.get("vary"));
      for (let Y of D) {
        if (Y === "*") return !1;
        let W = B.headersList.get(Y),
          J = A.headersList.get(Y);
        if (W !== J) return !1
      }
      return !0
    }
    #G(A, B, Q = 1 / 0) {
      let I = null;
      if (A !== void 0) {
        if (A instanceof nN) {
          if (I = A[BK], I.method !== "GET" && !B.ignoreMethod) return []
        } else if (typeof A === "string") I = new nN(A)[BK]
      }
      let G = [];
      if (A === void 0)
        for (let D of this.#A) G.push(D[1]);
      else {
        let D = this.#Q(I, B);
        for (let Y of D) G.push(Y[1])
      }
      let Z = [];
      for (let D of G) {
        let Y = VN6(D, "immutable");
        if (Z.push(Y.clone()), Z.length >= Q) break
      }
      return Object.freeze(Z)
    }
  }
  Object.defineProperties(yw.prototype, {
    [Symbol.toStringTag]: {
      value: "Cache",
      configurable: !0
    },
    match: Rj,
    matchAll: Rj,
    add: Rj,
    addAll: Rj,
    put: Rj,
    delete: Rj,
    keys: Rj
  });
  var wi0 = [{
    key: "ignoreSearch",
    converter: k9.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "ignoreMethod",
    converter: k9.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "ignoreVary",
    converter: k9.converters.boolean,
    defaultValue: () => !1
  }];
  k9.converters.CacheQueryOptions = k9.dictionaryConverter(wi0);
  k9.converters.MultiCacheQueryOptions = k9.dictionaryConverter([...wi0, {
    key: "cacheName",
    converter: k9.converters.DOMString
  }]);
  k9.converters.Response = k9.interfaceConverter(FN6);
  k9.converters["sequence<RequestInfo>"] = k9.sequenceConverter(k9.converters.RequestInfo);
  Ei0.exports = {
    Cache: yw
  }
})
// @from(Start 5664910, End 5666861)
$i0 = z((vO8, Ni0) => {
  var {
    kConstruct: No
  } = gW1(), {
    Cache: mW1
  } = Ui0(), {
    webidl: fZ
  } = jG(), {
    kEnumerableProperty: $o
  } = C6();
  class bR {
    #A = new Map;
    constructor() {
      if (arguments[0] !== No) fZ.illegalConstructor();
      fZ.util.markAsUncloneable(this)
    }
    async match(A, B = {}) {
      if (fZ.brandCheck(this, bR), fZ.argumentLengthCheck(arguments, 1, "CacheStorage.match"), A = fZ.converters.RequestInfo(A), B = fZ.converters.MultiCacheQueryOptions(B), B.cacheName != null) {
        if (this.#A.has(B.cacheName)) {
          let Q = this.#A.get(B.cacheName);
          return await new mW1(No, Q).match(A, B)
        }
      } else
        for (let Q of this.#A.values()) {
          let G = await new mW1(No, Q).match(A, B);
          if (G !== void 0) return G
        }
    }
    async has(A) {
      fZ.brandCheck(this, bR);
      let B = "CacheStorage.has";
      return fZ.argumentLengthCheck(arguments, 1, B), A = fZ.converters.DOMString(A, B, "cacheName"), this.#A.has(A)
    }
    async open(A) {
      fZ.brandCheck(this, bR);
      let B = "CacheStorage.open";
      if (fZ.argumentLengthCheck(arguments, 1, B), A = fZ.converters.DOMString(A, B, "cacheName"), this.#A.has(A)) {
        let I = this.#A.get(A);
        return new mW1(No, I)
      }
      let Q = [];
      return this.#A.set(A, Q), new mW1(No, Q)
    }
    async delete(A) {
      fZ.brandCheck(this, bR);
      let B = "CacheStorage.delete";
      return fZ.argumentLengthCheck(arguments, 1, B), A = fZ.converters.DOMString(A, B, "cacheName"), this.#A.delete(A)
    }
    async keys() {
      return fZ.brandCheck(this, bR), [...this.#A.keys()]
    }
  }
  Object.defineProperties(bR.prototype, {
    [Symbol.toStringTag]: {
      value: "CacheStorage",
      configurable: !0
    },
    match: $o,
    has: $o,
    open: $o,
    delete: $o,
    keys: $o
  });
  Ni0.exports = {
    CacheStorage: bR
  }
})
// @from(Start 5666867, End 5666979)
Mi0 = z((bO8, qi0) => {
  qi0.exports = {
    maxAttributeValueSize: 1024,
    maxNameValuePairSize: 4096
  }
})
// @from(Start 5666985, End 5669917)
Nc1 = z((gO8, Pi0) => {
  function zN6(A) {
    for (let B = 0; B < A.length; ++B) {
      let Q = A.charCodeAt(B);
      if (Q >= 0 && Q <= 8 || Q >= 10 && Q <= 31 || Q === 127) return !0
    }
    return !1
  }

  function Li0(A) {
    for (let B = 0; B < A.length; ++B) {
      let Q = A.charCodeAt(B);
      if (Q < 33 || Q > 126 || Q === 34 || Q === 40 || Q === 41 || Q === 60 || Q === 62 || Q === 64 || Q === 44 || Q === 59 || Q === 58 || Q === 92 || Q === 47 || Q === 91 || Q === 93 || Q === 63 || Q === 61 || Q === 123 || Q === 125) throw new Error("Invalid cookie name")
    }
  }

  function Ri0(A) {
    let B = A.length,
      Q = 0;
    if (A[0] === '"') {
      if (B === 1 || A[B - 1] !== '"') throw new Error("Invalid cookie value");
      --B, ++Q
    }
    while (Q < B) {
      let I = A.charCodeAt(Q++);
      if (I < 33 || I > 126 || I === 34 || I === 44 || I === 59 || I === 92) throw new Error("Invalid cookie value")
    }
  }

  function Oi0(A) {
    for (let B = 0; B < A.length; ++B) {
      let Q = A.charCodeAt(B);
      if (Q < 32 || Q === 127 || Q === 59) throw new Error("Invalid cookie path")
    }
  }

  function wN6(A) {
    if (A.startsWith("-") || A.endsWith(".") || A.endsWith("-")) throw new Error("Invalid cookie domain")
  }
  var EN6 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    UN6 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dW1 = Array(61).fill(0).map((A, B) => B.toString().padStart(2, "0"));

  function Ti0(A) {
    if (typeof A === "number") A = new Date(A);
    return `${EN6[A.getUTCDay()]}, ${dW1[A.getUTCDate()]} ${UN6[A.getUTCMonth()]} ${A.getUTCFullYear()} ${dW1[A.getUTCHours()]}:${dW1[A.getUTCMinutes()]}:${dW1[A.getUTCSeconds()]} GMT`
  }

  function NN6(A) {
    if (A < 0) throw new Error("Invalid cookie max-age")
  }

  function $N6(A) {
    if (A.name.length === 0) return null;
    Li0(A.name), Ri0(A.value);
    let B = [`${A.name}=${A.value}`];
    if (A.name.startsWith("__Secure-")) A.secure = !0;
    if (A.name.startsWith("__Host-")) A.secure = !0, A.domain = null, A.path = "/";
    if (A.secure) B.push("Secure");
    if (A.httpOnly) B.push("HttpOnly");
    if (typeof A.maxAge === "number") NN6(A.maxAge), B.push(`Max-Age=${A.maxAge}`);
    if (A.domain) wN6(A.domain), B.push(`Domain=${A.domain}`);
    if (A.path) Oi0(A.path), B.push(`Path=${A.path}`);
    if (A.expires && A.expires.toString() !== "Invalid Date") B.push(`Expires=${Ti0(A.expires)}`);
    if (A.sameSite) B.push(`SameSite=${A.sameSite}`);
    for (let Q of A.unparsed) {
      if (!Q.includes("=")) throw new Error("Invalid unparsed");
      let [I, ...G] = Q.split("=");
      B.push(`${I.trim()}=${G.join("=")}`)
    }
    return B.join("; ")
  }
  Pi0.exports = {
    isCTLExcludingHtab: zN6,
    validateCookieName: Li0,
    validateCookiePath: Oi0,
    validateCookieValue: Ri0,
    toIMFDate: Ti0,
    stringify: $N6
  }
})
// @from(Start 5669923, End 5672252)
_i0 = z((hO8, Si0) => {
  var {
    maxNameValuePairSize: qN6,
    maxAttributeValueSize: MN6
  } = Mi0(), {
    isCTLExcludingHtab: LN6
  } = Nc1(), {
    collectASequenceOfCodePointsFast: uW1
  } = nY(), RN6 = Z1("node:assert");

  function ON6(A) {
    if (LN6(A)) return null;
    let B = "",
      Q = "",
      I = "",
      G = "";
    if (A.includes(";")) {
      let Z = {
        position: 0
      };
      B = uW1(";", A, Z), Q = A.slice(Z.position)
    } else B = A;
    if (!B.includes("=")) G = B;
    else {
      let Z = {
        position: 0
      };
      I = uW1("=", B, Z), G = B.slice(Z.position + 1)
    }
    if (I = I.trim(), G = G.trim(), I.length + G.length > qN6) return null;
    return {
      name: I,
      value: G,
      ...Ym(Q)
    }
  }

  function Ym(A, B = {}) {
    if (A.length === 0) return B;
    RN6(A[0] === ";"), A = A.slice(1);
    let Q = "";
    if (A.includes(";")) Q = uW1(";", A, {
      position: 0
    }), A = A.slice(Q.length);
    else Q = A, A = "";
    let I = "",
      G = "";
    if (Q.includes("=")) {
      let D = {
        position: 0
      };
      I = uW1("=", Q, D), G = Q.slice(D.position + 1)
    } else I = Q;
    if (I = I.trim(), G = G.trim(), G.length > MN6) return Ym(A, B);
    let Z = I.toLowerCase();
    if (Z === "expires") {
      let D = new Date(G);
      B.expires = D
    } else if (Z === "max-age") {
      let D = G.charCodeAt(0);
      if ((D < 48 || D > 57) && G[0] !== "-") return Ym(A, B);
      if (!/^\d+$/.test(G)) return Ym(A, B);
      let Y = Number(G);
      B.maxAge = Y
    } else if (Z === "domain") {
      let D = G;
      if (D[0] === ".") D = D.slice(1);
      D = D.toLowerCase(), B.domain = D
    } else if (Z === "path") {
      let D = "";
      if (G.length === 0 || G[0] !== "/") D = "/";
      else D = G;
      B.path = D
    } else if (Z === "secure") B.secure = !0;
    else if (Z === "httponly") B.httpOnly = !0;
    else if (Z === "samesite") {
      let D = "Default",
        Y = G.toLowerCase();
      if (Y.includes("none")) D = "None";
      if (Y.includes("strict")) D = "Strict";
      if (Y.includes("lax")) D = "Lax";
      B.sameSite = D
    } else B.unparsed ??= [], B.unparsed.push(`${I}=${G}`);
    return Ym(A, B)
  }
  Si0.exports = {
    parseSetCookie: ON6,
    parseUnparsedAttributes: Ym
  }
})
// @from(Start 5672258, End 5675131)
ki0 = z((mO8, yi0) => {
  var {
    parseSetCookie: TN6
  } = _i0(), {
    stringify: PN6
  } = Nc1(), {
    webidl: x6
  } = jG(), {
    Headers: pW1
  } = $j();

  function SN6(A) {
    x6.argumentLengthCheck(arguments, 1, "getCookies"), x6.brandCheck(A, pW1, {
      strict: !1
    });
    let B = A.get("cookie"),
      Q = {};
    if (!B) return Q;
    for (let I of B.split(";")) {
      let [G, ...Z] = I.split("=");
      Q[G.trim()] = Z.join("=")
    }
    return Q
  }

  function _N6(A, B, Q) {
    x6.brandCheck(A, pW1, {
      strict: !1
    });
    let I = "deleteCookie";
    x6.argumentLengthCheck(arguments, 2, I), B = x6.converters.DOMString(B, I, "name"), Q = x6.converters.DeleteCookieAttributes(Q), ji0(A, {
      name: B,
      value: "",
      expires: new Date(0),
      ...Q
    })
  }

  function jN6(A) {
    x6.argumentLengthCheck(arguments, 1, "getSetCookies"), x6.brandCheck(A, pW1, {
      strict: !1
    });
    let B = A.getSetCookie();
    if (!B) return [];
    return B.map((Q) => TN6(Q))
  }

  function ji0(A, B) {
    x6.argumentLengthCheck(arguments, 2, "setCookie"), x6.brandCheck(A, pW1, {
      strict: !1
    }), B = x6.converters.Cookie(B);
    let Q = PN6(B);
    if (Q) A.append("Set-Cookie", Q)
  }
  x6.converters.DeleteCookieAttributes = x6.dictionaryConverter([{
    converter: x6.nullableConverter(x6.converters.DOMString),
    key: "path",
    defaultValue: () => null
  }, {
    converter: x6.nullableConverter(x6.converters.DOMString),
    key: "domain",
    defaultValue: () => null
  }]);
  x6.converters.Cookie = x6.dictionaryConverter([{
    converter: x6.converters.DOMString,
    key: "name"
  }, {
    converter: x6.converters.DOMString,
    key: "value"
  }, {
    converter: x6.nullableConverter((A) => {
      if (typeof A === "number") return x6.converters["unsigned long long"](A);
      return new Date(A)
    }),
    key: "expires",
    defaultValue: () => null
  }, {
    converter: x6.nullableConverter(x6.converters["long long"]),
    key: "maxAge",
    defaultValue: () => null
  }, {
    converter: x6.nullableConverter(x6.converters.DOMString),
    key: "domain",
    defaultValue: () => null
  }, {
    converter: x6.nullableConverter(x6.converters.DOMString),
    key: "path",
    defaultValue: () => null
  }, {
    converter: x6.nullableConverter(x6.converters.boolean),
    key: "secure",
    defaultValue: () => null
  }, {
    converter: x6.nullableConverter(x6.converters.boolean),
    key: "httpOnly",
    defaultValue: () => null
  }, {
    converter: x6.converters.USVString,
    key: "sameSite",
    allowedValues: ["Strict", "Lax", "None"]
  }, {
    converter: x6.sequenceConverter(x6.converters.DOMString),
    key: "unparsed",
    defaultValue: () => new Array(0)
  }]);
  yi0.exports = {
    getCookies: SN6,
    deleteCookie: _N6,
    getSetCookies: jN6,
    setCookie: ji0
  }
})
// @from(Start 5675137, End 5680821)
Jm = z((dO8, fi0) => {
  var {
    webidl: M9
  } = jG(), {
    kEnumerableProperty: oY
  } = C6(), {
    kConstruct: xi0
  } = A3(), {
    MessagePort: yN6
  } = Z1("node:worker_threads");
  class _J extends Event {
    #A;
    constructor(A, B = {}) {
      if (A === xi0) {
        super(arguments[1], arguments[2]);
        M9.util.markAsUncloneable(this);
        return
      }
      let Q = "MessageEvent constructor";
      M9.argumentLengthCheck(arguments, 1, Q), A = M9.converters.DOMString(A, Q, "type"), B = M9.converters.MessageEventInit(B, Q, "eventInitDict");
      super(A, B);
      this.#A = B, M9.util.markAsUncloneable(this)
    }
    get data() {
      return M9.brandCheck(this, _J), this.#A.data
    }
    get origin() {
      return M9.brandCheck(this, _J), this.#A.origin
    }
    get lastEventId() {
      return M9.brandCheck(this, _J), this.#A.lastEventId
    }
    get source() {
      return M9.brandCheck(this, _J), this.#A.source
    }
    get ports() {
      if (M9.brandCheck(this, _J), !Object.isFrozen(this.#A.ports)) Object.freeze(this.#A.ports);
      return this.#A.ports
    }
    initMessageEvent(A, B = !1, Q = !1, I = null, G = "", Z = "", D = null, Y = []) {
      return M9.brandCheck(this, _J), M9.argumentLengthCheck(arguments, 1, "MessageEvent.initMessageEvent"), new _J(A, {
        bubbles: B,
        cancelable: Q,
        data: I,
        origin: G,
        lastEventId: Z,
        source: D,
        ports: Y
      })
    }
    static createFastMessageEvent(A, B) {
      let Q = new _J(xi0, A, B);
      return Q.#A = B, Q.#A.data ??= null, Q.#A.origin ??= "", Q.#A.lastEventId ??= "", Q.#A.source ??= null, Q.#A.ports ??= [], Q
    }
  }
  var {
    createFastMessageEvent: kN6
  } = _J;
  delete _J.createFastMessageEvent;
  class Wm extends Event {
    #A;
    constructor(A, B = {}) {
      M9.argumentLengthCheck(arguments, 1, "CloseEvent constructor"), A = M9.converters.DOMString(A, "CloseEvent constructor", "type"), B = M9.converters.CloseEventInit(B);
      super(A, B);
      this.#A = B, M9.util.markAsUncloneable(this)
    }
    get wasClean() {
      return M9.brandCheck(this, Wm), this.#A.wasClean
    }
    get code() {
      return M9.brandCheck(this, Wm), this.#A.code
    }
    get reason() {
      return M9.brandCheck(this, Wm), this.#A.reason
    }
  }
  class gR extends Event {
    #A;
    constructor(A, B) {
      M9.argumentLengthCheck(arguments, 1, "ErrorEvent constructor");
      super(A, B);
      M9.util.markAsUncloneable(this), A = M9.converters.DOMString(A, "ErrorEvent constructor", "type"), B = M9.converters.ErrorEventInit(B ?? {}), this.#A = B
    }
    get message() {
      return M9.brandCheck(this, gR), this.#A.message
    }
    get filename() {
      return M9.brandCheck(this, gR), this.#A.filename
    }
    get lineno() {
      return M9.brandCheck(this, gR), this.#A.lineno
    }
    get colno() {
      return M9.brandCheck(this, gR), this.#A.colno
    }
    get error() {
      return M9.brandCheck(this, gR), this.#A.error
    }
  }
  Object.defineProperties(_J.prototype, {
    [Symbol.toStringTag]: {
      value: "MessageEvent",
      configurable: !0
    },
    data: oY,
    origin: oY,
    lastEventId: oY,
    source: oY,
    ports: oY,
    initMessageEvent: oY
  });
  Object.defineProperties(Wm.prototype, {
    [Symbol.toStringTag]: {
      value: "CloseEvent",
      configurable: !0
    },
    reason: oY,
    code: oY,
    wasClean: oY
  });
  Object.defineProperties(gR.prototype, {
    [Symbol.toStringTag]: {
      value: "ErrorEvent",
      configurable: !0
    },
    message: oY,
    filename: oY,
    lineno: oY,
    colno: oY,
    error: oY
  });
  M9.converters.MessagePort = M9.interfaceConverter(yN6);
  M9.converters["sequence<MessagePort>"] = M9.sequenceConverter(M9.converters.MessagePort);
  var $c1 = [{
    key: "bubbles",
    converter: M9.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "cancelable",
    converter: M9.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "composed",
    converter: M9.converters.boolean,
    defaultValue: () => !1
  }];
  M9.converters.MessageEventInit = M9.dictionaryConverter([...$c1, {
    key: "data",
    converter: M9.converters.any,
    defaultValue: () => null
  }, {
    key: "origin",
    converter: M9.converters.USVString,
    defaultValue: () => ""
  }, {
    key: "lastEventId",
    converter: M9.converters.DOMString,
    defaultValue: () => ""
  }, {
    key: "source",
    converter: M9.nullableConverter(M9.converters.MessagePort),
    defaultValue: () => null
  }, {
    key: "ports",
    converter: M9.converters["sequence<MessagePort>"],
    defaultValue: () => new Array(0)
  }]);
  M9.converters.CloseEventInit = M9.dictionaryConverter([...$c1, {
    key: "wasClean",
    converter: M9.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "code",
    converter: M9.converters["unsigned short"],
    defaultValue: () => 0
  }, {
    key: "reason",
    converter: M9.converters.USVString,
    defaultValue: () => ""
  }]);
  M9.converters.ErrorEventInit = M9.dictionaryConverter([...$c1, {
    key: "message",
    converter: M9.converters.DOMString,
    defaultValue: () => ""
  }, {
    key: "filename",
    converter: M9.converters.USVString,
    defaultValue: () => ""
  }, {
    key: "lineno",
    converter: M9.converters["unsigned long"],
    defaultValue: () => 0
  }, {
    key: "colno",
    converter: M9.converters["unsigned long"],
    defaultValue: () => 0
  }, {
    key: "error",
    converter: M9.converters.any
  }]);
  fi0.exports = {
    MessageEvent: _J,
    CloseEvent: Wm,
    ErrorEvent: gR,
    createFastMessageEvent: kN6
  }
})
// @from(Start 5680827, End 5681718)
Oj = z((uO8, vi0) => {
  var xN6 = {
      enumerable: !0,
      writable: !1,
      configurable: !1
    },
    fN6 = {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3
    },
    vN6 = {
      NOT_SENT: 0,
      PROCESSING: 1,
      SENT: 2
    },
    bN6 = {
      CONTINUATION: 0,
      TEXT: 1,
      BINARY: 2,
      CLOSE: 8,
      PING: 9,
      PONG: 10
    },
    gN6 = {
      INFO: 0,
      PAYLOADLENGTH_16: 2,
      PAYLOADLENGTH_64: 3,
      READ_DATA: 4
    },
    hN6 = Buffer.allocUnsafe(0),
    mN6 = {
      string: 1,
      typedArray: 2,
      arrayBuffer: 3,
      blob: 4
    };
  vi0.exports = {
    uid: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
    sentCloseFrameState: vN6,
    staticPropertyDescriptors: xN6,
    states: fN6,
    opcodes: bN6,
    maxUnsigned16Bit: 65535,
    parserStates: gN6,
    emptyBuffer: hN6,
    sendHints: mN6
  }
})
// @from(Start 5681724, End 5682082)
qo = z((pO8, bi0) => {
  bi0.exports = {
    kWebSocketURL: Symbol("url"),
    kReadyState: Symbol("ready state"),
    kController: Symbol("controller"),
    kResponse: Symbol("response"),
    kBinaryType: Symbol("binary type"),
    kSentClose: Symbol("sent close"),
    kReceivedClose: Symbol("received close"),
    kByteParser: Symbol("byte parser")
  }
})
// @from(Start 5682088, End 5685578)
Ro = z((cO8, ii0) => {
  var {
    kReadyState: Mo,
    kController: dN6,
    kResponse: uN6,
    kBinaryType: pN6,
    kWebSocketURL: cN6
  } = qo(), {
    states: Lo,
    opcodes: hR
  } = Oj(), {
    ErrorEvent: lN6,
    createFastMessageEvent: iN6
  } = Jm(), {
    isUtf8: nN6
  } = Z1("node:buffer"), {
    collectASequenceOfCodePointsFast: aN6,
    removeHTTPWhitespace: gi0
  } = nY();

  function sN6(A) {
    return A[Mo] === Lo.CONNECTING
  }

  function rN6(A) {
    return A[Mo] === Lo.OPEN
  }

  function oN6(A) {
    return A[Mo] === Lo.CLOSING
  }

  function tN6(A) {
    return A[Mo] === Lo.CLOSED
  }

  function qc1(A, B, Q = (G, Z) => new Event(G, Z), I = {}) {
    let G = Q(A, I);
    B.dispatchEvent(G)
  }

  function eN6(A, B, Q) {
    if (A[Mo] !== Lo.OPEN) return;
    let I;
    if (B === hR.TEXT) try {
      I = li0(Q)
    } catch {
      mi0(A, "Received invalid UTF-8 in text frame.");
      return
    } else if (B === hR.BINARY)
      if (A[pN6] === "blob") I = new Blob([Q]);
      else I = A$6(Q);
    qc1("message", A, iN6, {
      origin: A[cN6].origin,
      data: I
    })
  }

  function A$6(A) {
    if (A.byteLength === A.buffer.byteLength) return A.buffer;
    return A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength)
  }

  function B$6(A) {
    if (A.length === 0) return !1;
    for (let B = 0; B < A.length; ++B) {
      let Q = A.charCodeAt(B);
      if (Q < 33 || Q > 126 || Q === 34 || Q === 40 || Q === 41 || Q === 44 || Q === 47 || Q === 58 || Q === 59 || Q === 60 || Q === 61 || Q === 62 || Q === 63 || Q === 64 || Q === 91 || Q === 92 || Q === 93 || Q === 123 || Q === 125) return !1
    }
    return !0
  }

  function Q$6(A) {
    if (A >= 1000 && A < 1015) return A !== 1004 && A !== 1005 && A !== 1006;
    return A >= 3000 && A <= 4999
  }

  function mi0(A, B) {
    let {
      [dN6]: Q, [uN6]: I
    } = A;
    if (Q.abort(), I?.socket && !I.socket.destroyed) I.socket.destroy();
    if (B) qc1("error", A, (G, Z) => new lN6(G, Z), {
      error: new Error(B),
      message: B
    })
  }

  function di0(A) {
    return A === hR.CLOSE || A === hR.PING || A === hR.PONG
  }

  function ui0(A) {
    return A === hR.CONTINUATION
  }

  function pi0(A) {
    return A === hR.TEXT || A === hR.BINARY
  }

  function I$6(A) {
    return pi0(A) || ui0(A) || di0(A)
  }

  function G$6(A) {
    let B = {
        position: 0
      },
      Q = new Map;
    while (B.position < A.length) {
      let I = aN6(";", A, B),
        [G, Z = ""] = I.split("=");
      Q.set(gi0(G, !0, !1), gi0(Z, !1, !0)), B.position++
    }
    return Q
  }

  function Z$6(A) {
    for (let B = 0; B < A.length; B++) {
      let Q = A.charCodeAt(B);
      if (Q < 48 || Q > 57) return !1
    }
    return !0
  }
  var ci0 = typeof process.versions.icu === "string",
    hi0 = ci0 ? new TextDecoder("utf-8", {
      fatal: !0
    }) : void 0,
    li0 = ci0 ? hi0.decode.bind(hi0) : function(A) {
      if (nN6(A)) return A.toString("utf-8");
      throw new TypeError("Invalid utf-8 received.")
    };
  ii0.exports = {
    isConnecting: sN6,
    isEstablished: rN6,
    isClosing: oN6,
    isClosed: tN6,
    fireEvent: qc1,
    isValidSubprotocol: B$6,
    isValidStatusCode: Q$6,
    failWebsocketConnection: mi0,
    websocketMessageReceived: eN6,
    utf8Decode: li0,
    isControlFrame: di0,
    isContinuationFrame: ui0,
    isTextBinaryFrame: pi0,
    isValidOpcode: I$6,
    parseExtensions: G$6,
    isValidClientWindowBits: Z$6
  }
})
// @from(Start 5685584, End 5686854)
cW1 = z((lO8, ai0) => {
  var {
    maxUnsigned16Bit: D$6
  } = Oj(), Mc1, Oo = null, Fm = 16386;
  try {
    Mc1 = Z1("node:crypto")
  } catch {
    Mc1 = {
      randomFillSync: function A(B, Q, I) {
        for (let G = 0; G < B.length; ++G) B[G] = Math.random() * 255 | 0;
        return B
      }
    }
  }

  function Y$6() {
    if (Fm === 16386) Fm = 0, Mc1.randomFillSync(Oo ??= Buffer.allocUnsafe(16386), 0, 16386);
    return [Oo[Fm++], Oo[Fm++], Oo[Fm++], Oo[Fm++]]
  }
  class ni0 {
    constructor(A) {
      this.frameData = A
    }
    createFrame(A) {
      let B = this.frameData,
        Q = Y$6(),
        I = B?.byteLength ?? 0,
        G = I,
        Z = 6;
      if (I > D$6) Z += 8, G = 127;
      else if (I > 125) Z += 2, G = 126;
      let D = Buffer.allocUnsafe(I + Z);
      D[0] = D[1] = 0, D[0] |= 128, D[0] = (D[0] & 240) + A; /*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */
      if (D[Z - 4] = Q[0], D[Z - 3] = Q[1], D[Z - 2] = Q[2], D[Z - 1] = Q[3], D[1] = G, G === 126) D.writeUInt16BE(I, 2);
      else if (G === 127) D[2] = D[3] = 0, D.writeUIntBE(I, 4, 6);
      D[1] |= 128;
      for (let Y = 0; Y < I; ++Y) D[Z + Y] = B[Y] ^ Q[Y & 3];
      return D
    }
  }
  ai0.exports = {
    WebsocketFrameSend: ni0
  }
})
// @from(Start 5686860, End 5691829)
Rc1 = z((iO8, Bn0) => {
  var {
    uid: W$6,
    states: To,
    sentCloseFrameState: lW1,
    emptyBuffer: J$6,
    opcodes: F$6
  } = Oj(), {
    kReadyState: Po,
    kSentClose: iW1,
    kByteParser: ri0,
    kReceivedClose: si0,
    kResponse: oi0
  } = qo(), {
    fireEvent: X$6,
    failWebsocketConnection: mR,
    isClosing: V$6,
    isClosed: C$6,
    isEstablished: K$6,
    parseExtensions: H$6
  } = Ro(), {
    channels: Xm
  } = Rh(), {
    CloseEvent: z$6
  } = Jm(), {
    makeRequest: w$6
  } = Im(), {
    fetching: E$6
  } = wo(), {
    Headers: U$6,
    getHeadersList: N$6
  } = $j(), {
    getDecodeSplit: $$6
  } = MJ(), {
    WebsocketFrameSend: q$6
  } = cW1(), Lc1;
  try {
    Lc1 = Z1("node:crypto")
  } catch {}

  function M$6(A, B, Q, I, G, Z) {
    let D = A;
    D.protocol = A.protocol === "ws:" ? "http:" : "https:";
    let Y = w$6({
      urlList: [D],
      client: Q,
      serviceWorkers: "none",
      referrer: "no-referrer",
      mode: "websocket",
      credentials: "include",
      cache: "no-store",
      redirect: "error"
    });
    if (Z.headers) {
      let X = N$6(new U$6(Z.headers));
      Y.headersList = X
    }
    let W = Lc1.randomBytes(16).toString("base64");
    Y.headersList.append("sec-websocket-key", W), Y.headersList.append("sec-websocket-version", "13");
    for (let X of B) Y.headersList.append("sec-websocket-protocol", X);
    let J = "permessage-deflate; client_max_window_bits";
    return Y.headersList.append("sec-websocket-extensions", J), E$6({
      request: Y,
      useParallelQueue: !0,
      dispatcher: Z.dispatcher,
      processResponse(X) {
        if (X.type === "error" || X.status !== 101) {
          mR(I, "Received network error or non-101 status code.");
          return
        }
        if (B.length !== 0 && !X.headersList.get("Sec-WebSocket-Protocol")) {
          mR(I, "Server did not respond with sent protocols.");
          return
        }
        if (X.headersList.get("Upgrade")?.toLowerCase() !== "websocket") {
          mR(I, 'Server did not set Upgrade header to "websocket".');
          return
        }
        if (X.headersList.get("Connection")?.toLowerCase() !== "upgrade") {
          mR(I, 'Server did not set Connection header to "upgrade".');
          return
        }
        let V = X.headersList.get("Sec-WebSocket-Accept"),
          C = Lc1.createHash("sha1").update(W + W$6).digest("base64");
        if (V !== C) {
          mR(I, "Incorrect hash received in Sec-WebSocket-Accept header.");
          return
        }
        let K = X.headersList.get("Sec-WebSocket-Extensions"),
          E;
        if (K !== null) {
          if (E = H$6(K), !E.has("permessage-deflate")) {
            mR(I, "Sec-WebSocket-Extensions header does not match.");
            return
          }
        }
        let N = X.headersList.get("Sec-WebSocket-Protocol");
        if (N !== null) {
          if (!$$6("sec-websocket-protocol", Y.headersList).includes(N)) {
            mR(I, "Protocol was not set in the opening handshake.");
            return
          }
        }
        if (X.socket.on("data", ti0), X.socket.on("close", ei0), X.socket.on("error", An0), Xm.open.hasSubscribers) Xm.open.publish({
          address: X.socket.address(),
          protocol: N,
          extensions: K
        });
        G(X, E)
      }
    })
  }

  function L$6(A, B, Q, I) {
    if (V$6(A) || C$6(A));
    else if (!K$6(A)) mR(A, "Connection was closed before it was established."), A[Po] = To.CLOSING;
    else if (A[iW1] === lW1.NOT_SENT) {
      A[iW1] = lW1.PROCESSING;
      let G = new q$6;
      if (B !== void 0 && Q === void 0) G.frameData = Buffer.allocUnsafe(2), G.frameData.writeUInt16BE(B, 0);
      else if (B !== void 0 && Q !== void 0) G.frameData = Buffer.allocUnsafe(2 + I), G.frameData.writeUInt16BE(B, 0), G.frameData.write(Q, 2, "utf-8");
      else G.frameData = J$6;
      A[oi0].socket.write(G.createFrame(F$6.CLOSE)), A[iW1] = lW1.SENT, A[Po] = To.CLOSING
    } else A[Po] = To.CLOSING
  }

  function ti0(A) {
    if (!this.ws[ri0].write(A)) this.pause()
  }

  function ei0() {
    let {
      ws: A
    } = this, {
      [oi0]: B
    } = A;
    B.socket.off("data", ti0), B.socket.off("close", ei0), B.socket.off("error", An0);
    let Q = A[iW1] === lW1.SENT && A[si0],
      I = 1005,
      G = "",
      Z = A[ri0].closingInfo;
    if (Z && !Z.error) I = Z.code ?? 1005, G = Z.reason;
    else if (!A[si0]) I = 1006;
    if (A[Po] = To.CLOSED, X$6("close", A, (D, Y) => new z$6(D, Y), {
        wasClean: Q,
        code: I,
        reason: G
      }), Xm.close.hasSubscribers) Xm.close.publish({
      websocket: A,
      code: I,
      reason: G
    })
  }

  function An0(A) {
    let {
      ws: B
    } = this;
    if (B[Po] = To.CLOSING, Xm.socketError.hasSubscribers) Xm.socketError.publish(A);
    this.destroy()
  }
  Bn0.exports = {
    establishWebSocketConnection: M$6,
    closeWebSocketConnection: L$6
  }
})
// @from(Start 5691835, End 5693148)
Gn0 = z((nO8, In0) => {
  var {
    createInflateRaw: R$6,
    Z_DEFAULT_WINDOWBITS: O$6
  } = Z1("node:zlib"), {
    isValidClientWindowBits: T$6
  } = Ro(), P$6 = Buffer.from([0, 0, 255, 255]), nW1 = Symbol("kBuffer"), aW1 = Symbol("kLength");
  class Qn0 {
    #A;
    #B = {};
    constructor(A) {
      this.#B.serverNoContextTakeover = A.has("server_no_context_takeover"), this.#B.serverMaxWindowBits = A.get("server_max_window_bits")
    }
    decompress(A, B, Q) {
      if (!this.#A) {
        let I = O$6;
        if (this.#B.serverMaxWindowBits) {
          if (!T$6(this.#B.serverMaxWindowBits)) {
            Q(new Error("Invalid server_max_window_bits"));
            return
          }
          I = Number.parseInt(this.#B.serverMaxWindowBits)
        }
        this.#A = R$6({
          windowBits: I
        }), this.#A[nW1] = [], this.#A[aW1] = 0, this.#A.on("data", (G) => {
          this.#A[nW1].push(G), this.#A[aW1] += G.length
        }), this.#A.on("error", (G) => {
          this.#A = null, Q(G)
        })
      }
      if (this.#A.write(A), B) this.#A.write(P$6);
      this.#A.flush(() => {
        let I = Buffer.concat(this.#A[nW1], this.#A[aW1]);
        this.#A[nW1].length = 0, this.#A[aW1] = 0, Q(null, I)
      })
    }
  }
  In0.exports = {
    PerMessageDeflate: Qn0
  }
})