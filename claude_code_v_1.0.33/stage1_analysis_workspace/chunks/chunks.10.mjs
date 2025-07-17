
// @from(Start 962483, End 964374)
dKA = z((Wf) => {
  var EU9 = Wf && Wf.__awaiter || function(A, B, Q, I) {
    function G(Z) {
      return Z instanceof Q ? Z : new Q(function(D) {
        D(Z)
      })
    }
    return new(Q || (Q = Promise))(function(Z, D) {
      function Y(F) {
        try {
          J(I.next(F))
        } catch (X) {
          D(X)
        }
      }

      function W(F) {
        try {
          J(I.throw(F))
        } catch (X) {
          D(X)
        }
      }

      function J(F) {
        F.done ? Z(F.value) : G(F.value).then(Y, W)
      }
      J((I = I.apply(A, B || [])).next())
    })
  };
  Object.defineProperty(Wf, "__esModule", {
    value: !0
  });
  Wf._fetchTxtRecords = void 0;
  var UU9 = new Uint8Array([0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 13, 102, 101, 97, 116, 117, 114, 101, 97, 115, 115, 101, 116, 115, 3, 111, 114, 103, 0, 0, 16, 0, 1]),
    NU9 = "https://cloudflare-dns.com/dns-query",
    $U9 = ["i", "e", "d"],
    qU9 = 200;

  function MU9(A) {
    return EU9(this, void 0, void 0, function*() {
      let B = yield A(NU9, {
        method: "POST",
        headers: {
          "Content-Type": "application/dns-message",
          Accept: "application/dns-message"
        },
        body: UU9
      });
      if (!B.ok) {
        let G = new Error("Failed to fetch TXT records from DNS");
        throw G.name = "DnsTxtFetchError", G
      }
      let Q = yield B.arrayBuffer(), I = new Uint8Array(Q);
      return LU9(I)
    })
  }
  Wf._fetchTxtRecords = MU9;

  function LU9(A) {
    let B = A.findIndex((I, G) => G < qU9 && String.fromCharCode(I) === "=" && $U9.includes(String.fromCharCode(A[G - 1])));
    if (B === -1) {
      let I = new Error("Failed to parse TXT records from DNS");
      throw I.name = "DnsTxtParseError", I
    }
    let Q = "";
    for (let I = B - 1; I < A.length; I++) Q += String.fromCharCode(A[I]);
    return Q.split(",")
  }
})
// @from(Start 964380, End 969881)
aKA = z((KM) => {
  var uKA = KM && KM.__awaiter || function(A, B, Q, I) {
    function G(Z) {
      return Z instanceof Q ? Z : new Q(function(D) {
        D(Z)
      })
    }
    return new(Q || (Q = Promise))(function(Z, D) {
      function Y(F) {
        try {
          J(I.next(F))
        } catch (X) {
          D(X)
        }
      }

      function W(F) {
        try {
          J(I.throw(F))
        } catch (X) {
          D(X)
        }
      }

      function J(F) {
        F.done ? Z(F.value) : G(F.value).then(Y, W)
      }
      J((I = I.apply(A, B || [])).next())
    })
  };
  Object.defineProperty(KM, "__esModule", {
    value: !0
  });
  KM._isDomainFailure = KM.NetworkFallbackResolver = void 0;
  var RU9 = dKA(),
    OU9 = Qf(),
    TU9 = HZ(),
    CL1 = vU(),
    pKA = 604800000,
    PU9 = 14400000;
  class lKA {
    constructor(A) {
      var B;
      this._fallbackInfo = null, this._errorBoundary = null, this._dnsQueryCooldowns = {}, this._networkOverrideFunc = (B = A.networkConfig) === null || B === void 0 ? void 0 : B.networkOverrideFunc
    }
    setErrorBoundary(A) {
      this._errorBoundary = A
    }
    tryBumpExpiryTime(A, B) {
      var Q;
      let I = (Q = this._fallbackInfo) === null || Q === void 0 ? void 0 : Q[B.endpoint];
      if (!I) return;
      I.expiryTime = Date.now() + pKA, VL1(A, Object.assign(Object.assign({}, this._fallbackInfo), {
        [B.endpoint]: I
      }))
    }
    getActiveFallbackUrl(A, B) {
      var Q, I;
      let G = this._fallbackInfo;
      if (G == null) G = (Q = SU9(A)) !== null && Q !== void 0 ? Q : {}, this._fallbackInfo = G;
      let Z = G[B.endpoint];
      if (!Z || Date.now() > ((I = Z.expiryTime) !== null && I !== void 0 ? I : 0)) return delete G[B.endpoint], this._fallbackInfo = G, VL1(A, this._fallbackInfo), null;
      if (Z.url) return Z.url;
      return null
    }
    getFallbackFromProvided(A) {
      let B = cKA(A);
      if (B) return A.replace(B, "");
      return null
    }
    tryFetchUpdatedFallbackInfo(A, B, Q, I) {
      var G, Z;
      return uKA(this, void 0, void 0, function*() {
        try {
          if (!iKA(Q, I)) return !1;
          let Y = B.customUrl == null && B.fallbackUrls == null ? yield this._tryFetchFallbackUrlsFromNetwork(B): B.fallbackUrls, W = this._pickNewFallbackUrl((G = this._fallbackInfo) === null || G === void 0 ? void 0 : G[B.endpoint], Y);
          if (!W) return !1;
          return this._updateFallbackInfoWithNewUrl(A, B.endpoint, W), !0
        } catch (D) {
          return (Z = this._errorBoundary) === null || Z === void 0 || Z.logError("tryFetchUpdatedFallbackInfo", D), !1
        }
      })
    }
    _updateFallbackInfoWithNewUrl(A, B, Q) {
      var I, G, Z;
      let D = {
          url: Q,
          expiryTime: Date.now() + pKA,
          previous: []
        },
        Y = (I = this._fallbackInfo) === null || I === void 0 ? void 0 : I[B];
      if (Y) D.previous.push(...Y.previous);
      if (D.previous.length > 10) D.previous = [];
      let W = (Z = (G = this._fallbackInfo) === null || G === void 0 ? void 0 : G[B]) === null || Z === void 0 ? void 0 : Z.url;
      if (W != null) D.previous.push(W);
      this._fallbackInfo = Object.assign(Object.assign({}, this._fallbackInfo), {
        [B]: D
      }), VL1(A, this._fallbackInfo)
    }
    _tryFetchFallbackUrlsFromNetwork(A) {
      var B;
      return uKA(this, void 0, void 0, function*() {
        let Q = this._dnsQueryCooldowns[A.endpoint];
        if (Q && Date.now() < Q) return null;
        this._dnsQueryCooldowns[A.endpoint] = Date.now() + PU9;
        let I = [],
          G = yield RU9._fetchTxtRecords((B = this._networkOverrideFunc) !== null && B !== void 0 ? B : fetch), Z = cKA(A.defaultUrl);
        for (let D of G) {
          if (!D.startsWith(A.endpointDnsKey + "=")) continue;
          let Y = D.split("=");
          if (Y.length > 1) {
            let W = Y[1];
            if (W.endsWith("/")) W = W.slice(0, -1);
            I.push(`https://${W}${Z}`)
          }
        }
        return I
      })
    }
    _pickNewFallbackUrl(A, B) {
      var Q;
      if (B == null) return null;
      let I = new Set((Q = A === null || A === void 0 ? void 0 : A.previous) !== null && Q !== void 0 ? Q : []),
        G = A === null || A === void 0 ? void 0 : A.url,
        Z = null;
      for (let D of B) {
        let Y = D.endsWith("/") ? D.slice(0, -1) : D;
        if (!I.has(D) && Y !== G) {
          Z = Y;
          break
        }
      }
      return Z
    }
  }
  KM.NetworkFallbackResolver = lKA;

  function iKA(A, B) {
    var Q;
    let I = (Q = A === null || A === void 0 ? void 0 : A.toLowerCase()) !== null && Q !== void 0 ? Q : "";
    return B || I.includes("uncaught exception") || I.includes("failed to fetch") || I.includes("networkerror when attempting to fetch resource")
  }
  KM._isDomainFailure = iKA;

  function nKA(A) {
    return `statsig.network_fallback.${OU9._DJB2(A)}`
  }

  function VL1(A, B) {
    let Q = nKA(A);
    if (!B || Object.keys(B).length === 0) {
      CL1.Storage.removeItem(Q);
      return
    }
    CL1.Storage.setItem(Q, JSON.stringify(B))
  }

  function SU9(A) {
    let B = nKA(A),
      Q = CL1.Storage.getItem(B);
    if (!Q) return null;
    try {
      return JSON.parse(Q)
    } catch (I) {
      return TU9.Log.error("Failed to parse FallbackInfo"), null
    }
  }

  function cKA(A) {
    try {
      return new URL(A).pathname
    } catch (B) {
      return null
    }
  }
})
// @from(Start 969887, End 970237)
KL1 = z((rKA) => {
  Object.defineProperty(rKA, "__esModule", {
    value: !0
  });
  rKA.SDKFlags = void 0;
  var sKA = {};
  rKA.SDKFlags = {
    setFlags: (A, B) => {
      sKA[A] = B
    },
    get: (A, B) => {
      var Q, I;
      return (I = (Q = sKA[A]) === null || Q === void 0 ? void 0 : Q[B]) !== null && I !== void 0 ? I : !1
    }
  }
})
// @from(Start 970243, End 972286)
B51 = z((GHA) => {
  Object.defineProperty(GHA, "__esModule", {
    value: !0
  });
  GHA.StatsigSession = GHA.SessionID = void 0;
  var _U9 = dl(),
    jU9 = HZ(),
    eKA = vU(),
    AHA = n61(),
    BHA = 1800000,
    QHA = 14400000,
    A51 = {};
  GHA.SessionID = {
    get: (A) => {
      return GHA.StatsigSession.get(A).data.sessionID
    }
  };
  GHA.StatsigSession = {
    get: (A) => {
      if (A51[A] == null) A51[A] = yU9(A);
      let B = A51[A];
      return xU9(B)
    },
    overrideInitialSessionID: (A, B) => {
      A51[B] = kU9(A, B)
    }
  };

  function yU9(A) {
    let B = gU9(A),
      Q = Date.now();
    if (!B) B = {
      sessionID: AHA.getUUID(),
      startTime: Q,
      lastUpdate: Q
    };
    return {
      data: B,
      sdkKey: A
    }
  }

  function kU9(A, B) {
    let Q = Date.now();
    return {
      data: {
        sessionID: A,
        startTime: Q,
        lastUpdate: Q
      },
      sdkKey: B
    }
  }

  function xU9(A) {
    let B = Date.now(),
      Q = A.data;
    if (fU9(Q) || vU9(Q)) Q.sessionID = AHA.getUUID(), Q.startTime = B;
    Q.lastUpdate = B, bU9(Q, A.sdkKey), clearTimeout(A.idleTimeoutID), clearTimeout(A.ageTimeoutID);
    let I = B - Q.startTime,
      G = A.sdkKey;
    return A.idleTimeoutID = tKA(G, BHA), A.ageTimeoutID = tKA(G, QHA - I), A
  }

  function tKA(A, B) {
    return setTimeout(() => {
      let Q = __STATSIG__ === null || __STATSIG__ === void 0 ? void 0 : __STATSIG__.instance(A);
      if (Q) Q.$emt({
        name: "session_expired"
      })
    }, B)
  }

  function fU9({
    lastUpdate: A
  }) {
    return Date.now() - A > BHA
  }

  function vU9({
    startTime: A
  }) {
    return Date.now() - A > QHA
  }

  function IHA(A) {
    return `statsig.session_id.${_U9._getStorageKey(A)}`
  }

  function bU9(A, B) {
    let Q = IHA(B);
    try {
      eKA._setObjectInStorage(Q, A)
    } catch (I) {
      jU9.Log.warn("Failed to save SessionID")
    }
  }

  function gU9(A) {
    let B = IHA(A);
    return eKA._getObjectFromStorage(B)
  }
})
// @from(Start 972292, End 972459)
zL1 = z((ZHA) => {
  Object.defineProperty(ZHA, "__esModule", {
    value: !0
  });
  ZHA.ErrorTag = void 0;
  ZHA.ErrorTag = {
    NetworkError: "NetworkError"
  }
})
// @from(Start 972465, End 982988)
HHA = z((Ff) => {
  var Jf = Ff && Ff.__awaiter || function(A, B, Q, I) {
    function G(Z) {
      return Z instanceof Q ? Z : new Q(function(D) {
        D(Z)
      })
    }
    return new(Q || (Q = Promise))(function(Z, D) {
      function Y(F) {
        try {
          J(I.next(F))
        } catch (X) {
          D(X)
        }
      }

      function W(F) {
        try {
          J(I.throw(F))
        } catch (X) {
          D(X)
        }
      }

      function J(F) {
        F.done ? Z(F.value) : G(F.value).then(Y, W)
      }
      J((I = I.apply(A, B || [])).next())
    })
  };
  Object.defineProperty(Ff, "__esModule", {
    value: !0
  });
  Ff.NetworkCore = void 0;
  BS();
  var YHA = BS(),
    wL1 = x61(),
    GS = HZ(),
    GC = ul(),
    mU9 = aKA(),
    dU9 = KL1(),
    FHA = e61(),
    uU9 = QS(),
    XHA = B51(),
    pU9 = s61(),
    cU9 = zL1(),
    VHA = il(),
    lU9 = l61(),
    iU9 = 1e4,
    nU9 = 500,
    aU9 = 30000,
    sU9 = 1000,
    CHA = 50,
    rU9 = CHA / sU9,
    oU9 = new Set([408, 500, 502, 503, 504, 522, 524, 599]);
  class KHA {
    constructor(A, B) {
      if (this._emitter = B, this._errorBoundary = null, this._timeout = iU9, this._netConfig = {}, this._options = {}, this._leakyBucket = {}, this._lastUsedInitUrl = null, A) this._options = A;
      if (this._options.networkConfig) this._netConfig = this._options.networkConfig;
      if (this._netConfig.networkTimeoutMs) this._timeout = this._netConfig.networkTimeoutMs;
      this._fallbackResolver = new mU9.NetworkFallbackResolver(this._options)
    }
    setErrorBoundary(A) {
      this._errorBoundary = A, this._errorBoundary.wrap(this), this._errorBoundary.wrap(this._fallbackResolver), this._fallbackResolver.setErrorBoundary(A)
    }
    isBeaconSupported() {
      return typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function"
    }
    getLastUsedInitUrlAndReset() {
      let A = this._lastUsedInitUrl;
      return this._lastUsedInitUrl = null, A
    }
    beacon(A) {
      return Jf(this, void 0, void 0, function*() {
        if (!WHA(A)) return !1;
        let B = this._getInternalRequestArgs("POST", A);
        yield this._tryToCompressBody(B);
        let Q = yield this._getPopulatedURL(B), I = navigator;
        return I.sendBeacon.bind(I)(Q, B.body)
      })
    }
    post(A) {
      return Jf(this, void 0, void 0, function*() {
        let B = this._getInternalRequestArgs("POST", A);
        return this._tryEncodeBody(B), yield this._tryToCompressBody(B), this._sendRequest(B)
      })
    }
    get(A) {
      let B = this._getInternalRequestArgs("GET", A);
      return this._sendRequest(B)
    }
    _sendRequest(A) {
      var B, Q, I, G;
      return Jf(this, void 0, void 0, function*() {
        if (!WHA(A)) return null;
        if (this._netConfig.preventAllNetworkTraffic) return null;
        let {
          method: Z,
          body: D,
          retries: Y,
          attempt: W
        } = A, J = A.urlConfig.endpoint;
        if (this._isRateLimited(J)) return GS.Log.warn(`Request to ${J} was blocked because you are making requests too frequently.`), null;
        let F = W !== null && W !== void 0 ? W : 1,
          X = typeof AbortController !== "undefined" ? new AbortController : null,
          V = setTimeout(() => {
            X === null || X === void 0 || X.abort(`Timeout of ${this._timeout}ms expired.`)
          }, this._timeout),
          C = yield this._getPopulatedURL(A), K = null, E = lU9._isUnloading();
        try {
          let N = {
            method: Z,
            body: D,
            headers: Object.assign({}, A.headers),
            signal: X === null || X === void 0 ? void 0 : X.signal,
            priority: A.priority,
            keepalive: E
          };
          BN9(A, F);
          let q = this._leakyBucket[J];
          if (q) q.lastRequestTime = Date.now(), this._leakyBucket[J] = q;
          if (K = yield((B = this._netConfig.networkOverrideFunc) !== null && B !== void 0 ? B : fetch)(C, N), clearTimeout(V), !K.ok) {
            let T = yield K.text().catch(() => "No Text"), L = new Error(`NetworkError: ${C} ${T}`);
            throw L.name = "NetworkError", L
          }
          let R = yield K.text();
          return JHA(A, K, F, R), this._fallbackResolver.tryBumpExpiryTime(A.sdkKey, A.urlConfig), {
            body: R,
            code: K.status
          }
        } catch (N) {
          let q = eU9(X, N),
            O = AN9(X);
          if (JHA(A, K, F, "", N), yield this._fallbackResolver.tryFetchUpdatedFallbackInfo(A.sdkKey, A.urlConfig, q, O)) A.fallbackUrl = this._fallbackResolver.getActiveFallbackUrl(A.sdkKey, A.urlConfig);
          if (!Y || F > Y || !oU9.has((Q = K === null || K === void 0 ? void 0 : K.status) !== null && Q !== void 0 ? Q : 500)) {
            (I = this._emitter) === null || I === void 0 || I.call(this, {
              name: "error",
              error: N,
              tag: cU9.ErrorTag.NetworkError,
              requestArgs: A
            });
            let T = `A networking error occurred during ${Z} request to ${C}.`;
            return GS.Log.error(T, q, N), (G = this._errorBoundary) === null || G === void 0 || G.attachErrorIfNoneExists(T), null
          }
          return yield QN9(F), this._sendRequest(Object.assign(Object.assign({}, A), {
            retries: Y,
            attempt: F + 1
          }))
        }
      })
    }
    _isRateLimited(A) {
      var B;
      let Q = Date.now(),
        I = (B = this._leakyBucket[A]) !== null && B !== void 0 ? B : {
          count: 0,
          lastRequestTime: Q
        },
        G = Q - I.lastRequestTime,
        Z = Math.floor(G * rU9);
      if (I.count = Math.max(0, I.count - Z), I.count >= CHA) return !0;
      return I.count += 1, I.lastRequestTime = Q, this._leakyBucket[A] = I, !1
    }
    _getPopulatedURL(A) {
      var B;
      return Jf(this, void 0, void 0, function*() {
        let Q = (B = A.fallbackUrl) !== null && B !== void 0 ? B : A.urlConfig.getUrl();
        if (A.urlConfig.endpoint === GC.Endpoint._initialize || A.urlConfig.endpoint === GC.Endpoint._download_config_specs) this._lastUsedInitUrl = Q;
        let I = Object.assign({
            [GC.NetworkParam.SdkKey]: A.sdkKey,
            [GC.NetworkParam.SdkType]: FHA.SDKType._get(A.sdkKey),
            [GC.NetworkParam.SdkVersion]: VHA.SDK_VERSION,
            [GC.NetworkParam.Time]: String(Date.now()),
            [GC.NetworkParam.SessionID]: XHA.SessionID.get(A.sdkKey)
          }, A.params),
          G = Object.keys(I).map((Z) => {
            return `${encodeURIComponent(Z)}=${encodeURIComponent(I[Z])}`
          }).join("&");
        return `${Q}${G?`?${G}`:""}`
      })
    }
    _tryEncodeBody(A) {
      var B;
      let Q = uU9._getWindowSafe(),
        I = A.body;
      if (!A.isStatsigEncodable || this._options.disableStatsigEncoding || typeof I !== "string" || YHA._getStatsigGlobalFlag("no-encode") != null || !(Q === null || Q === void 0 ? void 0 : Q.btoa)) return;
      try {
        A.body = Q.btoa(I).split("").reverse().join(""), A.params = Object.assign(Object.assign({}, (B = A.params) !== null && B !== void 0 ? B : {}), {
          [GC.NetworkParam.StatsigEncoded]: "1"
        })
      } catch (G) {
        GS.Log.warn(`Request encoding failed for ${A.urlConfig.getUrl()}`, G)
      }
    }
    _tryToCompressBody(A) {
      var B;
      return Jf(this, void 0, void 0, function*() {
        let Q = A.body;
        if (!A.isCompressable || this._options.disableCompression || typeof Q !== "string" || dU9.SDKFlags.get(A.sdkKey, "enable_log_event_compression") !== !0 || YHA._getStatsigGlobalFlag("no-compress") != null || typeof CompressionStream === "undefined" || typeof TextEncoder === "undefined") return;
        try {
          let I = new TextEncoder().encode(Q),
            G = new CompressionStream("gzip"),
            Z = G.writable.getWriter();
          Z.write(I).catch(GS.Log.error), Z.close().catch(GS.Log.error);
          let D = G.readable.getReader(),
            Y = [],
            W;
          while (!(W = yield D.read()).done) Y.push(W.value);
          let J = Y.reduce((V, C) => V + C.length, 0),
            F = new Uint8Array(J),
            X = 0;
          for (let V of Y) F.set(V, X), X += V.length;
          A.body = F, A.params = Object.assign(Object.assign({}, (B = A.params) !== null && B !== void 0 ? B : {}), {
            [GC.NetworkParam.IsGzipped]: "1"
          })
        } catch (I) {
          GS.Log.warn(`Request compression failed for ${A.urlConfig.getUrl()}`, I)
        }
      })
    }
    _getInternalRequestArgs(A, B) {
      let Q = this._fallbackResolver.getActiveFallbackUrl(B.sdkKey, B.urlConfig),
        I = Object.assign(Object.assign({}, B), {
          method: A,
          fallbackUrl: Q
        });
      if ("data" in B) tU9(I, B.data);
      return I
    }
  }
  Ff.NetworkCore = KHA;
  var WHA = (A) => {
      if (!A.sdkKey) return GS.Log.warn("Unable to make request without an SDK key"), !1;
      return !0
    },
    tU9 = (A, B) => {
      let {
        sdkKey: Q,
        fallbackUrl: I
      } = A, G = pU9.StableID.get(Q), Z = XHA.SessionID.get(Q), D = FHA.SDKType._get(Q);
      A.body = JSON.stringify(Object.assign(Object.assign({}, B), {
        statsigMetadata: Object.assign(Object.assign({}, VHA.StatsigMetadataProvider.get()), {
          stableID: G,
          sessionID: Z,
          sdkType: D,
          fallbackUrl: I
        })
      }))
    };

  function eU9(A, B) {
    if ((A === null || A === void 0 ? void 0 : A.signal.aborted) && typeof A.signal.reason === "string") return A.signal.reason;
    if (typeof B === "string") return B;
    if (B instanceof Error) return `${B.name}: ${B.message}`;
    return "Unknown Error"
  }

  function AN9(A) {
    return (A === null || A === void 0 ? void 0 : A.signal.aborted) && typeof A.signal.reason === "string" && A.signal.reason.includes("Timeout") || !1
  }

  function BN9(A, B) {
    if (A.urlConfig.endpoint !== GC.Endpoint._initialize) return;
    wL1.Diagnostics._markInitNetworkReqStart(A.sdkKey, {
      attempt: B
    })
  }

  function JHA(A, B, Q, I, G) {
    if (A.urlConfig.endpoint !== GC.Endpoint._initialize) return;
    wL1.Diagnostics._markInitNetworkReqEnd(A.sdkKey, wL1.Diagnostics._getDiagnosticsData(B, Q, I, G))
  }

  function QN9(A) {
    return Jf(this, void 0, void 0, function*() {
      yield new Promise((B) => setTimeout(B, Math.min(nU9 * (A * A), aU9)))
    })
  }
})
// @from(Start 982994, End 983079)
wHA = z((zHA) => {
  Object.defineProperty(zHA, "__esModule", {
    value: !0
  })
})
// @from(Start 983085, End 983170)
UHA = z((EHA) => {
  Object.defineProperty(EHA, "__esModule", {
    value: !0
  })
})
// @from(Start 983176, End 988007)
$HA = z((Xf) => {
  var IN9 = Xf && Xf.__awaiter || function(A, B, Q, I) {
    function G(Z) {
      return Z instanceof Q ? Z : new Q(function(D) {
        D(Z)
      })
    }
    return new(Q || (Q = Promise))(function(Z, D) {
      function Y(F) {
        try {
          J(I.next(F))
        } catch (X) {
          D(X)
        }
      }

      function W(F) {
        try {
          J(I.throw(F))
        } catch (X) {
          D(X)
        }
      }

      function J(F) {
        F.done ? Z(F.value) : G(F.value).then(Y, W)
      }
      J((I = I.apply(A, B || [])).next())
    })
  };
  Object.defineProperty(Xf, "__esModule", {
    value: !0
  });
  Xf.StatsigClientBase = void 0;
  BS();
  var GN9 = BS(),
    ZN9 = FL1(),
    DN9 = ZL1(),
    EL1 = HZ(),
    YN9 = XL1(),
    WN9 = QS(),
    JN9 = B51(),
    Q51 = vU(),
    FN9 = 3000;
  class NHA {
    constructor(A, B, Q, I) {
      var G;
      this.loadingStatus = "Uninitialized", this._initializePromise = null, this._listeners = {};
      let Z = this.$emt.bind(this);
      (I === null || I === void 0 ? void 0 : I.logLevel) != null && (EL1.Log.level = I.logLevel), (I === null || I === void 0 ? void 0 : I.disableStorage) && Q51.Storage._setDisabled(!0), (I === null || I === void 0 ? void 0 : I.initialSessionID) && JN9.StatsigSession.overrideInitialSessionID(I.initialSessionID, A), (I === null || I === void 0 ? void 0 : I.storageProvider) && Q51.Storage._setProvider(I.storageProvider), this._sdkKey = A, this._options = I !== null && I !== void 0 ? I : {}, this._memoCache = {}, this.overrideAdapter = (G = I === null || I === void 0 ? void 0 : I.overrideAdapter) !== null && G !== void 0 ? G : null, this._logger = new DN9.EventLogger(A, Z, Q, I), this._errorBoundary = new ZN9.ErrorBoundary(A, I, Z), this._errorBoundary.wrap(this), this._errorBoundary.wrap(B), this._errorBoundary.wrap(this._logger), Q.setErrorBoundary(this._errorBoundary), this.dataAdapter = B, this.dataAdapter.attach(A, I), this.storageProvider = Q51.Storage, this._primeReadyRipcord(), XN9(A, this)
    }
    updateRuntimeOptions(A) {
      if (A.disableLogging != null) this._options.disableLogging = A.disableLogging, this._logger.setLoggingDisabled(A.disableLogging);
      if (A.disableStorage != null) this._options.disableStorage = A.disableStorage, Q51.Storage._setDisabled(A.disableStorage)
    }
    flush() {
      return this._logger.flush()
    }
    shutdown() {
      return IN9(this, void 0, void 0, function*() {
        this.$emt({
          name: "pre_shutdown"
        }), this._setStatus("Uninitialized", null), this._initializePromise = null, yield this._logger.stop()
      })
    }
    on(A, B) {
      if (!this._listeners[A]) this._listeners[A] = [];
      this._listeners[A].push(B)
    }
    off(A, B) {
      if (this._listeners[A]) {
        let Q = this._listeners[A].indexOf(B);
        if (Q !== -1) this._listeners[A].splice(Q, 1)
      }
    }
    $on(A, B) {
      B.__isInternal = !0, this.on(A, B)
    }
    $emt(A) {
      var B;
      let Q = (I) => {
        try {
          I(A)
        } catch (G) {
          if (I.__isInternal === !0) {
            this._errorBoundary.logError(`__emit:${A.name}`, G);
            return
          }
          EL1.Log.error("An error occurred in a StatsigClientEvent listener. This is not an issue with Statsig.", A)
        }
      };
      if (this._listeners[A.name]) this._listeners[A.name].forEach((I) => Q(I));
      (B = this._listeners["*"]) === null || B === void 0 || B.forEach(Q)
    }
    _setStatus(A, B) {
      this.loadingStatus = A, this._memoCache = {}, this.$emt({
        name: "values_updated",
        status: A,
        values: B
      })
    }
    _enqueueExposure(A, B, Q) {
      if ((Q === null || Q === void 0 ? void 0 : Q.disableExposureLog) === !0) {
        this._logger.incrementNonExposureCount(A);
        return
      }
      this._logger.enqueue(B)
    }
    _memoize(A, B) {
      return (Q, I) => {
        if (this._options.disableEvaluationMemoization) return B(Q, I);
        let G = YN9.createMemoKey(A, Q, I);
        if (!G) return B(Q, I);
        if (!(G in this._memoCache)) {
          if (Object.keys(this._memoCache).length >= FN9) this._memoCache = {};
          this._memoCache[G] = B(Q, I)
        }
        return this._memoCache[G]
      }
    }
  }
  Xf.StatsigClientBase = NHA;

  function XN9(A, B) {
    var Q;
    if (WN9._isServerEnv()) return;
    let I = GN9._getStatsigGlobal(),
      G = (Q = I.instances) !== null && Q !== void 0 ? Q : {},
      Z = B;
    if (G[A] != null) EL1.Log.warn("Creating multiple Statsig clients with the same SDK key can lead to unexpected behavior. Multi-instance support requires different SDK keys.");
    if (G[A] = Z, !I.firstInstance) I.firstInstance = Z;
    I.instances = G, __STATSIG__ = I
  }
})
// @from(Start 988013, End 988186)
LHA = z((qHA) => {
  Object.defineProperty(qHA, "__esModule", {
    value: !0
  });
  qHA.DataAdapterCachePrefix = void 0;
  qHA.DataAdapterCachePrefix = "statsig.cached"
})
// @from(Start 988192, End 988277)
OHA = z((RHA) => {
  Object.defineProperty(RHA, "__esModule", {
    value: !0
  })
})
// @from(Start 988283, End 988368)
PHA = z((THA) => {
  Object.defineProperty(THA, "__esModule", {
    value: !0
  })
})
// @from(Start 988374, End 990807)
yHA = z((_HA) => {
  Object.defineProperty(_HA, "__esModule", {
    value: !0
  });
  _HA._makeTypedGet = _HA._mergeOverride = _HA._makeLayer = _HA._makeExperiment = _HA._makeDynamicConfig = _HA._makeFeatureGate = void 0;
  var VN9 = HZ(),
    CN9 = f61(),
    KN9 = "default";

  function UL1(A, B, Q, I) {
    var G;
    return {
      name: A,
      details: B,
      ruleID: (G = Q === null || Q === void 0 ? void 0 : Q.rule_id) !== null && G !== void 0 ? G : KN9,
      __evaluation: Q,
      value: I
    }
  }

  function HN9(A, B, Q) {
    return UL1(A, B, Q, (Q === null || Q === void 0 ? void 0 : Q.value) === !0)
  }
  _HA._makeFeatureGate = HN9;

  function SHA(A, B, Q) {
    var I;
    let G = (I = Q === null || Q === void 0 ? void 0 : Q.value) !== null && I !== void 0 ? I : {};
    return Object.assign(Object.assign({}, UL1(A, B, Q, G)), {
      get: I51(A, Q === null || Q === void 0 ? void 0 : Q.value)
    })
  }
  _HA._makeDynamicConfig = SHA;

  function zN9(A, B, Q) {
    var I;
    let G = SHA(A, B, Q);
    return Object.assign(Object.assign({}, G), {
      groupName: (I = Q === null || Q === void 0 ? void 0 : Q.group_name) !== null && I !== void 0 ? I : null
    })
  }
  _HA._makeExperiment = zN9;

  function wN9(A, B, Q, I) {
    var G, Z;
    return Object.assign(Object.assign({}, UL1(A, B, Q, void 0)), {
      get: I51(A, Q === null || Q === void 0 ? void 0 : Q.value, I),
      groupName: (G = Q === null || Q === void 0 ? void 0 : Q.group_name) !== null && G !== void 0 ? G : null,
      __value: (Z = Q === null || Q === void 0 ? void 0 : Q.value) !== null && Z !== void 0 ? Z : {}
    })
  }
  _HA._makeLayer = wN9;

  function EN9(A, B, Q, I) {
    return Object.assign(Object.assign(Object.assign({}, A), B), {
      get: I51(A.name, Q, I)
    })
  }
  _HA._mergeOverride = EN9;

  function I51(A, B, Q) {
    return (I, G) => {
      var Z;
      let D = (Z = B === null || B === void 0 ? void 0 : B[I]) !== null && Z !== void 0 ? Z : null;
      if (D == null) return G !== null && G !== void 0 ? G : null;
      if (G != null && !CN9._isTypeMatch(D, G)) return VN9.Log.warn(`Parameter type mismatch. '${A}.${I}' was found to be type '${typeof D}' but fallback/return type is '${typeof G}'. See https://docs.statsig.com/client/javascript-sdk/#typed-getters`), G !== null && G !== void 0 ? G : null;
      return Q === null || Q === void 0 || Q(I), D
    }
  }
  _HA._makeTypedGet = I51
})
// @from(Start 990813, End 990898)
xHA = z((kHA) => {
  Object.defineProperty(kHA, "__esModule", {
    value: !0
  })
})
// @from(Start 990904, End 991473)
bHA = z((fHA) => {
  Object.defineProperty(fHA, "__esModule", {
    value: !0
  });
  fHA.UPDATE_DETAIL_ERROR_MESSAGES = fHA.createUpdateDetails = void 0;
  var LN9 = (A, B, Q, I, G, Z) => {
    return {
      duration: Q,
      source: B,
      success: A,
      error: I,
      sourceUrl: G,
      warnings: Z
    }
  };
  fHA.createUpdateDetails = LN9;
  fHA.UPDATE_DETAIL_ERROR_MESSAGES = {
    NO_NETWORK_DATA: "No data was returned from the network. This may be due to a network timeout if a timeout value was specified in the options or ad blocker error."
  }
})
// @from(Start 991479, End 993676)
HM = z((v9) => {
  var ON9 = v9 && v9.__createBinding || (Object.create ? function(A, B, Q, I) {
      if (I === void 0) I = Q;
      var G = Object.getOwnPropertyDescriptor(B, Q);
      if (!G || ("get" in G ? !B.__esModule : G.writable || G.configurable)) G = {
        enumerable: !0,
        get: function() {
          return B[Q]
        }
      };
      Object.defineProperty(A, I, G)
    } : function(A, B, Q, I) {
      if (I === void 0) I = Q;
      A[I] = B[Q]
    }),
    B6 = v9 && v9.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) ON9(B, A, Q)
    };
  Object.defineProperty(v9, "__esModule", {
    value: !0
  });
  v9.Storage = v9.Log = v9.EventLogger = v9.Diagnostics = void 0;
  BS();
  var TN9 = x61();
  Object.defineProperty(v9, "Diagnostics", {
    enumerable: !0,
    get: function() {
      return TN9.Diagnostics
    }
  });
  var PN9 = ZL1();
  Object.defineProperty(v9, "EventLogger", {
    enumerable: !0,
    get: function() {
      return PN9.EventLogger
    }
  });
  var gHA = HZ();
  Object.defineProperty(v9, "Log", {
    enumerable: !0,
    get: function() {
      return gHA.Log
    }
  });
  var SN9 = il(),
    _N9 = vU();
  Object.defineProperty(v9, "Storage", {
    enumerable: !0,
    get: function() {
      return _N9.Storage
    }
  });
  B6(BS(), v9);
  B6(dl(), v9);
  B6(YKA(), v9);
  B6(LKA(), v9);
  B6(x61(), v9);
  B6(OKA(), v9);
  B6(FL1(), v9);
  B6(xKA(), v9);
  B6(vKA(), v9);
  B6(Qf(), v9);
  B6(gKA(), v9);
  B6(HZ(), v9);
  B6(XL1(), v9);
  B6(ul(), v9);
  B6(HHA(), v9);
  B6(wHA(), v9);
  B6(UHA(), v9);
  B6(QS(), v9);
  B6(e61(), v9);
  B6(B51(), v9);
  B6(s61(), v9);
  B6($HA(), v9);
  B6(zL1(), v9);
  B6(LHA(), v9);
  B6(oM1(), v9);
  B6(il(), v9);
  B6(OHA(), v9);
  B6(PHA(), v9);
  B6(yHA(), v9);
  B6(xHA(), v9);
  B6(YL1(), v9);
  B6(vU(), v9);
  B6(WL1(), v9);
  B6(f61(), v9);
  B6(AL1(), v9);
  B6(n61(), v9);
  B6(l61(), v9);
  B6(bHA(), v9);
  B6(KL1(), v9);
  __STATSIG__ = Object.assign(Object.assign({}, __STATSIG__ !== null && __STATSIG__ !== void 0 ? __STATSIG__ : {}), {
    Log: gHA.Log,
    SDK_VERSION: SN9.SDK_VERSION
  })
})
// @from(Start 993682, End 997744)
dHA = z((mHA) => {
  Object.defineProperty(mHA, "__esModule", {
    value: !0
  });
  var ZS = HM();
  class hHA {
    constructor(A) {
      this._sdkKey = A, this._rawValues = null, this._values = null, this._source = "Uninitialized", this._lcut = 0, this._receivedAt = 0, this._bootstrapMetadata = null, this._warnings = new Set
    }
    reset() {
      this._values = null, this._rawValues = null, this._source = "Loading", this._lcut = 0, this._receivedAt = 0, this._bootstrapMetadata = null
    }
    finalize() {
      if (this._values) return;
      this._source = "NoValues"
    }
    getValues() {
      return this._rawValues ? ZS._typedJsonParse(this._rawValues, "has_updates", "EvaluationStoreValues") : null
    }
    setValues(A, B) {
      var Q;
      if (!A) return !1;
      let I = ZS._typedJsonParse(A.data, "has_updates", "EvaluationResponse");
      if (I == null) return !1;
      if (this._source = A.source, (I === null || I === void 0 ? void 0 : I.has_updates) !== !0) return !0;
      if (this._rawValues = A.data, this._lcut = I.time, this._receivedAt = A.receivedAt, this._values = I, this._bootstrapMetadata = this._extractBootstrapMetadata(A.source, I), A.source && I.user) this._setWarningState(B, I);
      return ZS.SDKFlags.setFlags(this._sdkKey, (Q = I.sdk_flags) !== null && Q !== void 0 ? Q : {}), !0
    }
    getWarnings() {
      if (this._warnings.size === 0) return;
      return Array.from(this._warnings)
    }
    getGate(A) {
      var B;
      return this._getDetailedStoreResult((B = this._values) === null || B === void 0 ? void 0 : B.feature_gates, A)
    }
    getConfig(A) {
      var B;
      return this._getDetailedStoreResult((B = this._values) === null || B === void 0 ? void 0 : B.dynamic_configs, A)
    }
    getLayer(A) {
      var B;
      return this._getDetailedStoreResult((B = this._values) === null || B === void 0 ? void 0 : B.layer_configs, A)
    }
    getParamStore(A) {
      var B;
      return this._getDetailedStoreResult((B = this._values) === null || B === void 0 ? void 0 : B.param_stores, A)
    }
    getSource() {
      return this._source
    }
    getExposureMapping() {
      var A;
      return (A = this._values) === null || A === void 0 ? void 0 : A.exposures
    }
    _extractBootstrapMetadata(A, B) {
      if (A !== "Bootstrap") return null;
      let Q = {};
      if (B.user) Q.user = B.user;
      if (B.sdkInfo) Q.generatorSDKInfo = B.sdkInfo;
      return Q.lcut = B.time, Q
    }
    _getDetailedStoreResult(A, B) {
      let Q = null;
      if (A) Q = A[B] ? A[B] : A[ZS._DJB2(B)];
      return {
        result: Q,
        details: this._getDetails(Q == null)
      }
    }
    _setWarningState(A, B) {
      var Q;
      let I = ZS.StableID.get(this._sdkKey);
      if (((Q = A.customIDs) === null || Q === void 0 ? void 0 : Q.stableID) !== I) {
        this._warnings.add("StableIDMismatch");
        return
      }
      if ("user" in B) {
        let G = B.user;
        if (ZS._getFullUserHash(A) !== ZS._getFullUserHash(G)) this._warnings.add("PartialUserMatch")
      }
    }
    getCurrentSourceDetails() {
      if (this._source === "Uninitialized" || this._source === "NoValues") return {
        reason: this._source
      };
      let A = {
        reason: this._source,
        lcut: this._lcut,
        receivedAt: this._receivedAt
      };
      if (this._warnings.size > 0) A.warnings = Array.from(this._warnings);
      return A
    }
    _getDetails(A) {
      var B, Q;
      let I = this.getCurrentSourceDetails(),
        G = I.reason,
        Z = (B = I.warnings) !== null && B !== void 0 ? B : [];
      if (this._source === "Bootstrap" && Z.length > 0) G = G + Z[0];
      if (G !== "Uninitialized" && G !== "NoValues") G = `${G}:${A?"Unrecognized":"Recognized"}`;
      let D = this._source === "Bootstrap" ? (Q = this._bootstrapMetadata) !== null && Q !== void 0 ? Q : void 0 : void 0;
      if (D) I.bootstrapMetadata = D;
      return Object.assign(Object.assign({}, I), {
        reason: G
      })
    }
  }
  mHA.default = hHA
})
// @from(Start 997750, End 999240)
lHA = z((pHA) => {
  Object.defineProperty(pHA, "__esModule", {
    value: !0
  });
  pHA._resolveDeltasResponse = void 0;
  var uHA = HM(),
    yN9 = 2;

  function kN9(A, B) {
    let Q = uHA._typedJsonParse(B, "checksum", "DeltasEvaluationResponse");
    if (!Q) return {
      hadBadDeltaChecksum: !0
    };
    let I = xN9(A, Q),
      G = fN9(I),
      Z = uHA._DJB2Object({
        feature_gates: G.feature_gates,
        dynamic_configs: G.dynamic_configs,
        layer_configs: G.layer_configs
      }, yN9);
    if (Z !== Q.checksumV2) return {
      hadBadDeltaChecksum: !0,
      badChecksum: Z,
      badMergedConfigs: G,
      badFullResponse: Q.deltas_full_response
    };
    return JSON.stringify(G)
  }
  pHA._resolveDeltasResponse = kN9;

  function xN9(A, B) {
    return Object.assign(Object.assign(Object.assign({}, A), B), {
      feature_gates: Object.assign(Object.assign({}, A.feature_gates), B.feature_gates),
      layer_configs: Object.assign(Object.assign({}, A.layer_configs), B.layer_configs),
      dynamic_configs: Object.assign(Object.assign({}, A.dynamic_configs), B.dynamic_configs)
    })
  }

  function fN9(A) {
    let B = A;
    return NL1(A.deleted_gates, B.feature_gates), delete B.deleted_gates, NL1(A.deleted_configs, B.dynamic_configs), delete B.deleted_configs, NL1(A.deleted_layers, B.layer_configs), delete B.deleted_layers, B
  }

  function NL1(A, B) {
    A === null || A === void 0 || A.forEach((Q) => {
      delete B[Q]
    })
  }
})
// @from(Start 999246, End 1002150)
$L1 = z((nl) => {
  var iHA = nl && nl.__awaiter || function(A, B, Q, I) {
    function G(Z) {
      return Z instanceof Q ? Z : new Q(function(D) {
        D(Z)
      })
    }
    return new(Q || (Q = Promise))(function(Z, D) {
      function Y(F) {
        try {
          J(I.next(F))
        } catch (X) {
          D(X)
        }
      }

      function W(F) {
        try {
          J(I.throw(F))
        } catch (X) {
          D(X)
        }
      }

      function J(F) {
        F.done ? Z(F.value) : G(F.value).then(Y, W)
      }
      J((I = I.apply(A, B || [])).next())
    })
  };
  Object.defineProperty(nl, "__esModule", {
    value: !0
  });
  var G51 = HM(),
    vN9 = lHA();
  class nHA extends G51.NetworkCore {
    constructor(A, B) {
      super(A, B);
      let Q = A === null || A === void 0 ? void 0 : A.networkConfig;
      this._initializeUrlConfig = new G51.UrlConfiguration(G51.Endpoint._initialize, Q === null || Q === void 0 ? void 0 : Q.initializeUrl, Q === null || Q === void 0 ? void 0 : Q.api, Q === null || Q === void 0 ? void 0 : Q.initializeFallbackUrls)
    }
    fetchEvaluations(A, B, Q, I, G) {
      return iHA(this, void 0, void 0, function*() {
        let Z = B ? G51._typedJsonParse(B, "has_updates", "InitializeResponse") : null,
          D = {
            user: I,
            hash: "djb2",
            deltasResponseRequested: !1,
            full_checksum: null
          };
        if (Z === null || Z === void 0 ? void 0 : Z.has_updates) D = Object.assign(Object.assign({}, D), {
          sinceTime: G ? Z.time : 0,
          previousDerivedFields: "derived_fields" in Z && G ? Z.derived_fields : {},
          deltasResponseRequested: !0,
          full_checksum: Z.full_checksum
        });
        return this._fetchEvaluations(A, Z, D, Q)
      })
    }
    _fetchEvaluations(A, B, Q, I) {
      var G, Z;
      return iHA(this, void 0, void 0, function*() {
        let D = yield this.post({
          sdkKey: A,
          urlConfig: this._initializeUrlConfig,
          data: Q,
          retries: 2,
          isStatsigEncodable: !0,
          priority: I
        });
        if ((D === null || D === void 0 ? void 0 : D.code) === 204) return '{"has_updates": false}';
        if ((D === null || D === void 0 ? void 0 : D.code) !== 200) return (G = D === null || D === void 0 ? void 0 : D.body) !== null && G !== void 0 ? G : null;
        if ((B === null || B === void 0 ? void 0 : B.has_updates) !== !0 || ((Z = D.body) === null || Z === void 0 ? void 0 : Z.includes('"is_delta":true')) !== !0 || Q.deltasResponseRequested !== !0) return D.body;
        let Y = vN9._resolveDeltasResponse(B, D.body);
        if (typeof Y === "string") return Y;
        return this._fetchEvaluations(A, B, Object.assign(Object.assign(Object.assign({}, Q), Y), {
          deltasResponseRequested: !1
        }), I)
      })
    }
  }
  nl.default = nHA
})
// @from(Start 1002156, End 1003864)
oHA = z((sHA) => {
  Object.defineProperty(sHA, "__esModule", {
    value: !0
  });
  sHA._makeParamStoreGetter = void 0;
  var aHA = HM(),
    Z51 = {
      disableExposureLog: !0
    };

  function D51(A) {
    return A == null || A.disableExposureLog === !1
  }

  function qL1(A, B) {
    return B != null && !aHA._isTypeMatch(A, B)
  }

  function bN9(A, B) {
    return A.value
  }

  function gN9(A, B, Q) {
    if (A.getFeatureGate(B.gate_name, D51(Q) ? void 0 : Z51).value) return B.pass_value;
    return B.fail_value
  }

  function hN9(A, B, Q, I) {
    let Z = A.getDynamicConfig(B.config_name, Z51).get(B.param_name);
    if (qL1(Z, Q)) return Q;
    if (D51(I)) A.getDynamicConfig(B.config_name);
    return Z
  }

  function mN9(A, B, Q, I) {
    let Z = A.getExperiment(B.experiment_name, Z51).get(B.param_name);
    if (qL1(Z, Q)) return Q;
    if (D51(I)) A.getExperiment(B.experiment_name);
    return Z
  }

  function dN9(A, B, Q, I) {
    let Z = A.getLayer(B.layer_name, Z51).get(B.param_name);
    if (qL1(Z, Q)) return Q;
    if (D51(I)) A.getLayer(B.layer_name).get(B.param_name);
    return Z
  }

  function uN9(A, B, Q) {
    return (I, G) => {
      if (B == null) return G;
      let Z = B[I];
      if (Z == null || G != null && aHA._typeOf(G) !== Z.param_type) return G;
      switch (Z.ref_type) {
        case "static":
          return bN9(Z, Q);
        case "gate":
          return gN9(A, Z, Q);
        case "dynamic_config":
          return hN9(A, Z, G, Q);
        case "experiment":
          return mN9(A, Z, G, Q);
        case "layer":
          return dN9(A, Z, G, Q);
        default:
          return G
      }
    }
  }
  sHA._makeParamStoreGetter = uN9
})
// @from(Start 1003870, End 1006188)
eHA = z((Vf) => {
  var pN9 = Vf && Vf.__awaiter || function(A, B, Q, I) {
    function G(Z) {
      return Z instanceof Q ? Z : new Q(function(D) {
        D(Z)
      })
    }
    return new(Q || (Q = Promise))(function(Z, D) {
      function Y(F) {
        try {
          J(I.next(F))
        } catch (X) {
          D(X)
        }
      }

      function W(F) {
        try {
          J(I.throw(F))
        } catch (X) {
          D(X)
        }
      }

      function J(F) {
        F.done ? Z(F.value) : G(F.value).then(Y, W)
      }
      J((I = I.apply(A, B || [])).next())
    })
  };
  Object.defineProperty(Vf, "__esModule", {
    value: !0
  });
  Vf.StatsigEvaluationsDataAdapter = void 0;
  var DS = HM(),
    cN9 = $L1();
  class tHA extends DS.DataAdapterCore {
    constructor() {
      super("EvaluationsDataAdapter", "evaluations");
      this._network = null, this._options = null
    }
    attach(A, B) {
      super.attach(A, B), this._network = new cN9.default(B !== null && B !== void 0 ? B : {})
    }
    getDataAsync(A, B, Q) {
      return this._getDataAsyncImpl(A, DS._normalizeUser(B, this._options), Q)
    }
    prefetchData(A, B) {
      return this._prefetchDataImpl(A, B)
    }
    setData(A) {
      let B = DS._typedJsonParse(A, "has_updates", "data");
      if (B && "user" in B) super.setData(A, B.user);
      else DS.Log.error("StatsigUser not found. You may be using an older server SDK version. Please upgrade your SDK or use setDataLegacy.")
    }
    setDataLegacy(A, B) {
      super.setData(A, B)
    }
    _fetchFromNetwork(A, B, Q, I) {
      var G;
      return pN9(this, void 0, void 0, function*() {
        let Z = yield(G = this._network) === null || G === void 0 ? void 0 : G.fetchEvaluations(this._getSdkKey(), A, Q === null || Q === void 0 ? void 0 : Q.priority, B, I);
        return Z !== null && Z !== void 0 ? Z : null
      })
    }
    _getCacheKey(A) {
      var B;
      let Q = DS._getStorageKey(this._getSdkKey(), A, (B = this._options) === null || B === void 0 ? void 0 : B.customUserCacheKeyFunc);
      return `${DS.DataAdapterCachePrefix}.${this._cacheSuffix}.${Q}`
    }
    _isCachedResultValidFor204(A, B) {
      return A.fullUserHash != null && A.fullUserHash === DS._getFullUserHash(B)
    }
  }
  Vf.StatsigEvaluationsDataAdapter = tHA
})
// @from(Start 1006194, End 1016597)
BzA = z((al) => {
  var ML1 = al && al.__awaiter || function(A, B, Q, I) {
    function G(Z) {
      return Z instanceof Q ? Z : new Q(function(D) {
        D(Z)
      })
    }
    return new(Q || (Q = Promise))(function(Z, D) {
      function Y(F) {
        try {
          J(I.next(F))
        } catch (X) {
          D(X)
        }
      }

      function W(F) {
        try {
          J(I.throw(F))
        } catch (X) {
          D(X)
        }
      }

      function J(F) {
        F.done ? Z(F.value) : G(F.value).then(Y, W)
      }
      J((I = I.apply(A, B || [])).next())
    })
  };
  Object.defineProperty(al, "__esModule", {
    value: !0
  });
  var F6 = HM(),
    lN9 = dHA(),
    iN9 = $L1(),
    AzA = oHA(),
    nN9 = eHA();
  class Y51 extends F6.StatsigClientBase {
    static instance(A) {
      let B = F6._getStatsigGlobal().instance(A);
      if (B instanceof Y51) return B;
      return F6.Log.warn(F6._isServerEnv() ? "StatsigClient.instance is not supported in server environments" : "Unable to find StatsigClient instance"), new Y51(A !== null && A !== void 0 ? A : "", {})
    }
    constructor(A, B, Q = null) {
      var I, G;
      F6.SDKType._setClientType(A, "javascript-client");
      let Z = new iN9.default(Q, (Y) => {
        this.$emt(Y)
      });
      super(A, (I = Q === null || Q === void 0 ? void 0 : Q.dataAdapter) !== null && I !== void 0 ? I : new nN9.StatsigEvaluationsDataAdapter, Z, Q);
      this.getFeatureGate = this._memoize(F6.MemoPrefix._gate, this._getFeatureGateImpl.bind(this)), this.getDynamicConfig = this._memoize(F6.MemoPrefix._dynamicConfig, this._getDynamicConfigImpl.bind(this)), this.getExperiment = this._memoize(F6.MemoPrefix._experiment, this._getExperimentImpl.bind(this)), this.getLayer = this._memoize(F6.MemoPrefix._layer, this._getLayerImpl.bind(this)), this.getParameterStore = this._memoize(F6.MemoPrefix._paramStore, this._getParameterStoreImpl.bind(this)), this._store = new lN9.default(A), this._network = Z, this._user = this._configureUser(B, Q);
      let D = (G = Q === null || Q === void 0 ? void 0 : Q.plugins) !== null && G !== void 0 ? G : [];
      for (let Y of D) Y.bind(this)
    }
    initializeSync(A) {
      var B;
      if (this.loadingStatus !== "Uninitialized") return F6.createUpdateDetails(!0, this._store.getSource(), -1, null, null, ["MultipleInitializations", ...(B = this._store.getWarnings()) !== null && B !== void 0 ? B : []]);
      return this._logger.start(), this.updateUserSync(this._user, A)
    }
    initializeAsync(A) {
      return ML1(this, void 0, void 0, function*() {
        if (this._initializePromise) return this._initializePromise;
        return this._initializePromise = this._initializeAsyncImpl(A), this._initializePromise
      })
    }
    updateUserSync(A, B) {
      var Q;
      let I = performance.now(),
        G = [...(Q = this._store.getWarnings()) !== null && Q !== void 0 ? Q : []];
      this._resetForUser(A);
      let Z = this.dataAdapter.getDataSync(this._user);
      if (Z == null) G.push("NoCachedValues");
      this._store.setValues(Z, this._user), this._finalizeUpdate(Z);
      let D = B === null || B === void 0 ? void 0 : B.disableBackgroundCacheRefresh;
      if (D === !0 || D == null && (Z === null || Z === void 0 ? void 0 : Z.source) === "Bootstrap") return F6.createUpdateDetails(!0, this._store.getSource(), performance.now() - I, this._errorBoundary.getLastSeenErrorAndReset(), this._network.getLastUsedInitUrlAndReset(), G);
      return this._runPostUpdate(Z !== null && Z !== void 0 ? Z : null, this._user), F6.createUpdateDetails(!0, this._store.getSource(), performance.now() - I, this._errorBoundary.getLastSeenErrorAndReset(), this._network.getLastUsedInitUrlAndReset(), G)
    }
    updateUserAsync(A, B) {
      return ML1(this, void 0, void 0, function*() {
        this._resetForUser(A);
        let Q = this._user;
        F6.Diagnostics._markInitOverallStart(this._sdkKey);
        let I = this.dataAdapter.getDataSync(Q);
        if (this._store.setValues(I, this._user), this._setStatus("Loading", I), I = yield this.dataAdapter.getDataAsync(I, Q, B), Q !== this._user) return F6.createUpdateDetails(!1, this._store.getSource(), -1, new Error("User changed during update"), this._network.getLastUsedInitUrlAndReset());
        let G = !1;
        if (I != null) F6.Diagnostics._markInitProcessStart(this._sdkKey), G = this._store.setValues(I, this._user), F6.Diagnostics._markInitProcessEnd(this._sdkKey, {
          success: G
        });
        if (this._finalizeUpdate(I), !G) this._errorBoundary.attachErrorIfNoneExists(F6.UPDATE_DETAIL_ERROR_MESSAGES.NO_NETWORK_DATA), this.$emt({
          name: "initialization_failure"
        });
        F6.Diagnostics._markInitOverallEnd(this._sdkKey, G, this._store.getCurrentSourceDetails());
        let Z = F6.Diagnostics._enqueueDiagnosticsEvent(this._user, this._logger, this._sdkKey, this._options);
        return F6.createUpdateDetails(G, this._store.getSource(), Z, this._errorBoundary.getLastSeenErrorAndReset(), this._network.getLastUsedInitUrlAndReset(), this._store.getWarnings())
      })
    }
    getContext() {
      return {
        sdkKey: this._sdkKey,
        options: this._options,
        values: this._store.getValues(),
        user: JSON.parse(JSON.stringify(this._user)),
        errorBoundary: this._errorBoundary,
        session: F6.StatsigSession.get(this._sdkKey),
        stableID: F6.StableID.get(this._sdkKey)
      }
    }
    checkGate(A, B) {
      return this.getFeatureGate(A, B).value
    }
    logEvent(A, B, Q) {
      let I = typeof A === "string" ? {
        eventName: A,
        value: B,
        metadata: Q
      } : A;
      this._logger.enqueue(Object.assign(Object.assign({}, I), {
        user: this._user,
        time: Date.now()
      }))
    }
    _primeReadyRipcord() {
      this.$on("error", () => {
        this.loadingStatus === "Loading" && this._finalizeUpdate(null)
      })
    }
    _initializeAsyncImpl(A) {
      return ML1(this, void 0, void 0, function*() {
        if (!F6.Storage.isReady()) yield F6.Storage.isReadyResolver();
        return this._logger.start(), this.updateUserAsync(this._user, A)
      })
    }
    _finalizeUpdate(A) {
      this._store.finalize(), this._setStatus("Ready", A)
    }
    _runPostUpdate(A, B) {
      this.dataAdapter.getDataAsync(A, B, {
        priority: "low"
      }).catch((Q) => {
        F6.Log.error("An error occurred after update.", Q)
      })
    }
    _resetForUser(A) {
      this._logger.reset(), this._store.reset(), this._user = this._configureUser(A, this._options)
    }
    _configureUser(A, B) {
      var Q;
      let I = F6._normalizeUser(A, B),
        G = (Q = I.customIDs) === null || Q === void 0 ? void 0 : Q.stableID;
      if (G) F6.StableID.setOverride(G, this._sdkKey);
      return I
    }
    _getFeatureGateImpl(A, B) {
      var Q, I;
      let {
        result: G,
        details: Z
      } = this._store.getGate(A), D = F6._makeFeatureGate(A, Z, G), Y = (I = (Q = this.overrideAdapter) === null || Q === void 0 ? void 0 : Q.getGateOverride) === null || I === void 0 ? void 0 : I.call(Q, D, this._user, B), W = Y !== null && Y !== void 0 ? Y : D;
      return this._enqueueExposure(A, F6._createGateExposure(this._user, W, this._store.getExposureMapping()), B), this.$emt({
        name: "gate_evaluation",
        gate: W
      }), W
    }
    _getDynamicConfigImpl(A, B) {
      var Q, I;
      let {
        result: G,
        details: Z
      } = this._store.getConfig(A), D = F6._makeDynamicConfig(A, Z, G), Y = (I = (Q = this.overrideAdapter) === null || Q === void 0 ? void 0 : Q.getDynamicConfigOverride) === null || I === void 0 ? void 0 : I.call(Q, D, this._user, B), W = Y !== null && Y !== void 0 ? Y : D;
      return this._enqueueExposure(A, F6._createConfigExposure(this._user, W, this._store.getExposureMapping()), B), this.$emt({
        name: "dynamic_config_evaluation",
        dynamicConfig: W
      }), W
    }
    _getExperimentImpl(A, B) {
      var Q, I, G, Z;
      let {
        result: D,
        details: Y
      } = this._store.getConfig(A), W = F6._makeExperiment(A, Y, D);
      if (W.__evaluation != null) W.__evaluation.secondary_exposures = F6._mapExposures((I = (Q = W.__evaluation) === null || Q === void 0 ? void 0 : Q.secondary_exposures) !== null && I !== void 0 ? I : [], this._store.getExposureMapping());
      let J = (Z = (G = this.overrideAdapter) === null || G === void 0 ? void 0 : G.getExperimentOverride) === null || Z === void 0 ? void 0 : Z.call(G, W, this._user, B),
        F = J !== null && J !== void 0 ? J : W;
      return this._enqueueExposure(A, F6._createConfigExposure(this._user, F, this._store.getExposureMapping()), B), this.$emt({
        name: "experiment_evaluation",
        experiment: F
      }), F
    }
    _getLayerImpl(A, B) {
      var Q, I, G;
      let {
        result: Z,
        details: D
      } = this._store.getLayer(A), Y = F6._makeLayer(A, D, Z), W = (I = (Q = this.overrideAdapter) === null || Q === void 0 ? void 0 : Q.getLayerOverride) === null || I === void 0 ? void 0 : I.call(Q, Y, this._user, B);
      if (B === null || B === void 0 ? void 0 : B.disableExposureLog) this._logger.incrementNonExposureCount(A);
      let J = F6._mergeOverride(Y, W, (G = W === null || W === void 0 ? void 0 : W.__value) !== null && G !== void 0 ? G : Y.__value, (F) => {
        if (B === null || B === void 0 ? void 0 : B.disableExposureLog) return;
        this._enqueueExposure(A, F6._createLayerParameterExposure(this._user, J, F, this._store.getExposureMapping()), B)
      });
      return this.$emt({
        name: "layer_evaluation",
        layer: J
      }), J
    }
    _getParameterStoreImpl(A, B) {
      var Q, I;
      let {
        result: G,
        details: Z
      } = this._store.getParamStore(A);
      this._logger.incrementNonExposureCount(A);
      let D = {
          name: A,
          details: Z,
          __configuration: G,
          get: AzA._makeParamStoreGetter(this, G, B)
        },
        Y = (I = (Q = this.overrideAdapter) === null || Q === void 0 ? void 0 : Q.getParamStoreOverride) === null || I === void 0 ? void 0 : I.call(Q, D, B);
      if (Y != null) D.__configuration = Y.config, D.details = Y.details, D.get = AzA._makeParamStoreGetter(this, Y.config, B);
      return D
    }
  }
  al.default = Y51
})
// @from(Start 1016603, End 1017602)
IzA = z((Yz) => {
  var aN9 = Yz && Yz.__createBinding || (Object.create ? function(A, B, Q, I) {
      if (I === void 0) I = Q;
      var G = Object.getOwnPropertyDescriptor(B, Q);
      if (!G || ("get" in G ? !B.__esModule : G.writable || G.configurable)) G = {
        enumerable: !0,
        get: function() {
          return B[Q]
        }
      };
      Object.defineProperty(A, I, G)
    } : function(A, B, Q, I) {
      if (I === void 0) I = Q;
      A[I] = B[Q]
    }),
    sN9 = Yz && Yz.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) aN9(B, A, Q)
    };
  Object.defineProperty(Yz, "__esModule", {
    value: !0
  });
  Yz.StatsigClient = void 0;
  var QzA = BzA();
  Yz.StatsigClient = QzA.default;
  sN9(HM(), Yz);
  __STATSIG__ = Object.assign(Object.assign({}, __STATSIG__ !== null && __STATSIG__ !== void 0 ? __STATSIG__ : {}), {
    StatsigClient: QzA.default
  });
  Yz.default = __STATSIG__
})
// @from(Start 1017608, End 1018609)
KzA = z((Tc5, CzA) => {
  CzA.exports = XzA;

  function XzA(A, B, Q) {
    if (A instanceof RegExp) A = FzA(A, Q);
    if (B instanceof RegExp) B = FzA(B, Q);
    var I = VzA(A, B, Q);
    return I && {
      start: I[0],
      end: I[1],
      pre: Q.slice(0, I[0]),
      body: Q.slice(I[0] + A.length, I[1]),
      post: Q.slice(I[1] + B.length)
    }
  }

  function FzA(A, B) {
    var Q = B.match(A);
    return Q ? Q[0] : null
  }
  XzA.range = VzA;

  function VzA(A, B, Q) {
    var I, G, Z, D, Y, W = Q.indexOf(A),
      J = Q.indexOf(B, W + 1),
      F = W;
    if (W >= 0 && J > 0) {
      if (A === B) return [W, J];
      I = [], Z = Q.length;
      while (F >= 0 && !Y) {
        if (F == W) I.push(F), W = Q.indexOf(A, F + 1);
        else if (I.length == 1) Y = [I.pop(), J];
        else {
          if (G = I.pop(), G < Z) Z = G, D = J;
          J = Q.indexOf(B, F + 1)
        }
        F = W < J && W >= 0 ? W : J
      }
      if (I.length) Y = [Z, D]
    }
    return Y
  }
})
// @from(Start 1018615, End 1022025)
qzA = z((Pc5, $zA) => {
  var HzA = KzA();
  $zA.exports = X$9;
  var zzA = "\x00SLASH" + Math.random() + "\x00",
    wzA = "\x00OPEN" + Math.random() + "\x00",
    SL1 = "\x00CLOSE" + Math.random() + "\x00",
    EzA = "\x00COMMA" + Math.random() + "\x00",
    UzA = "\x00PERIOD" + Math.random() + "\x00";

  function PL1(A) {
    return parseInt(A, 10) == A ? parseInt(A, 10) : A.charCodeAt(0)
  }

  function J$9(A) {
    return A.split("\\\\").join(zzA).split("\\{").join(wzA).split("\\}").join(SL1).split("\\,").join(EzA).split("\\.").join(UzA)
  }

  function F$9(A) {
    return A.split(zzA).join("\\").split(wzA).join("{").split(SL1).join("}").split(EzA).join(",").split(UzA).join(".")
  }

  function NzA(A) {
    if (!A) return [""];
    var B = [],
      Q = HzA("{", "}", A);
    if (!Q) return A.split(",");
    var {
      pre: I,
      body: G,
      post: Z
    } = Q, D = I.split(",");
    D[D.length - 1] += "{" + G + "}";
    var Y = NzA(Z);
    if (Z.length) D[D.length - 1] += Y.shift(), D.push.apply(D, Y);
    return B.push.apply(B, D), B
  }

  function X$9(A) {
    if (!A) return [];
    if (A.substr(0, 2) === "{}") A = "\\{\\}" + A.substr(2);
    return rl(J$9(A), !0).map(F$9)
  }

  function V$9(A) {
    return "{" + A + "}"
  }

  function C$9(A) {
    return /^-?0\d/.test(A)
  }

  function K$9(A, B) {
    return A <= B
  }

  function H$9(A, B) {
    return A >= B
  }

  function rl(A, B) {
    var Q = [],
      I = HzA("{", "}", A);
    if (!I) return [A];
    var G = I.pre,
      Z = I.post.length ? rl(I.post, !1) : [""];
    if (/\$$/.test(I.pre))
      for (var D = 0; D < Z.length; D++) {
        var Y = G + "{" + I.body + "}" + Z[D];
        Q.push(Y)
      } else {
        var W = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(I.body),
          J = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(I.body),
          F = W || J,
          X = I.body.indexOf(",") >= 0;
        if (!F && !X) {
          if (I.post.match(/,.*\}/)) return A = I.pre + "{" + I.body + SL1 + I.post, rl(A);
          return [A]
        }
        var V;
        if (F) V = I.body.split(/\.\./);
        else if (V = NzA(I.body), V.length === 1) {
          if (V = rl(V[0], !1).map(V$9), V.length === 1) return Z.map(function(s) {
            return I.pre + V[0] + s
          })
        }
        var C;
        if (F) {
          var K = PL1(V[0]),
            E = PL1(V[1]),
            N = Math.max(V[0].length, V[1].length),
            q = V.length == 3 ? Math.abs(PL1(V[2])) : 1,
            O = K$9,
            R = E < K;
          if (R) q *= -1, O = H$9;
          var T = V.some(C$9);
          C = [];
          for (var L = K; O(L, E); L += q) {
            var _;
            if (J) {
              if (_ = String.fromCharCode(L), _ === "\\") _ = ""
            } else if (_ = String(L), T) {
              var k = N - _.length;
              if (k > 0) {
                var i = new Array(k + 1).join("0");
                if (L < 0) _ = "-" + i + _.slice(1);
                else _ = i + _
              }
            }
            C.push(_)
          }
        } else {
          C = [];
          for (var x = 0; x < V.length; x++) C.push.apply(C, rl(V[x], !1))
        }
        for (var x = 0; x < C.length; x++)
          for (var D = 0; D < Z.length; D++) {
            var Y = G + C[x] + Z[D];
            if (!B || F || Y) Q.push(Y)
          }
      }
    return Q
  }
})
// @from(Start 1022031, End 1022226)
G8 = z((XwA) => {
  Object.defineProperty(XwA, "__esModule", {
    value: !0
  });
  XwA.isFunction = void 0;

  function vq9(A) {
    return typeof A === "function"
  }
  XwA.isFunction = vq9
})
// @from(Start 1022232, End 1022594)
UM = z((CwA) => {
  Object.defineProperty(CwA, "__esModule", {
    value: !0
  });
  CwA.createErrorClass = void 0;

  function bq9(A) {
    var B = function(I) {
        Error.call(I), I.stack = new Error().stack
      },
      Q = A(B);
    return Q.prototype = Object.create(Error.prototype), Q.prototype.constructor = Q, Q
  }
  CwA.createErrorClass = bq9
})
// @from(Start 1022600, End 1023075)
nL1 = z((HwA) => {
  Object.defineProperty(HwA, "__esModule", {
    value: !0
  });
  HwA.UnsubscriptionError = void 0;
  var gq9 = UM();
  HwA.UnsubscriptionError = gq9.createErrorClass(function(A) {
    return function B(Q) {
      A(this), this.message = Q ? Q.length + ` errors occurred during unsubscription:
` + Q.map(function(I, G) {
        return G + 1 + ") " + I.toString()
      }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = Q
    }
  })
})
// @from(Start 1023081, End 1023320)
mU = z((wwA) => {
  Object.defineProperty(wwA, "__esModule", {
    value: !0
  });
  wwA.arrRemove = void 0;

  function hq9(A, B) {
    if (A) {
      var Q = A.indexOf(B);
      0 <= Q && A.splice(Q, 1)
    }
  }
  wwA.arrRemove = hq9
})
// @from(Start 1023326, End 1028099)
DJ = z((PY) => {
  var UwA = PY && PY.__values || function(A) {
      var B = typeof Symbol === "function" && Symbol.iterator,
        Q = B && A[B],
        I = 0;
      if (Q) return Q.call(A);
      if (A && typeof A.length === "number") return {
        next: function() {
          if (A && I >= A.length) A = void 0;
          return {
            value: A && A[I++],
            done: !A
          }
        }
      };
      throw new TypeError(B ? "Object is not iterable." : "Symbol.iterator is not defined.")
    },
    NwA = PY && PY.__read || function(A, B) {
      var Q = typeof Symbol === "function" && A[Symbol.iterator];
      if (!Q) return A;
      var I = Q.call(A),
        G, Z = [],
        D;
      try {
        while ((B === void 0 || B-- > 0) && !(G = I.next()).done) Z.push(G.value)
      } catch (Y) {
        D = {
          error: Y
        }
      } finally {
        try {
          if (G && !G.done && (Q = I.return)) Q.call(I)
        } finally {
          if (D) throw D.error
        }
      }
      return Z
    },
    $wA = PY && PY.__spreadArray || function(A, B) {
      for (var Q = 0, I = B.length, G = A.length; Q < I; Q++, G++) A[G] = B[Q];
      return A
    };
  Object.defineProperty(PY, "__esModule", {
    value: !0
  });
  PY.isSubscription = PY.EMPTY_SUBSCRIPTION = PY.Subscription = void 0;
  var Ci = G8(),
    aL1 = nL1(),
    qwA = mU(),
    sL1 = function() {
      function A(B) {
        this.initialTeardown = B, this.closed = !1, this._parentage = null, this._finalizers = null
      }
      return A.prototype.unsubscribe = function() {
        var B, Q, I, G, Z;
        if (!this.closed) {
          this.closed = !0;
          var D = this._parentage;
          if (D)
            if (this._parentage = null, Array.isArray(D)) try {
              for (var Y = UwA(D), W = Y.next(); !W.done; W = Y.next()) {
                var J = W.value;
                J.remove(this)
              }
            } catch (E) {
              B = {
                error: E
              }
            } finally {
              try {
                if (W && !W.done && (Q = Y.return)) Q.call(Y)
              } finally {
                if (B) throw B.error
              }
            } else D.remove(this);
          var F = this.initialTeardown;
          if (Ci.isFunction(F)) try {
            F()
          } catch (E) {
            Z = E instanceof aL1.UnsubscriptionError ? E.errors : [E]
          }
          var X = this._finalizers;
          if (X) {
            this._finalizers = null;
            try {
              for (var V = UwA(X), C = V.next(); !C.done; C = V.next()) {
                var K = C.value;
                try {
                  MwA(K)
                } catch (E) {
                  if (Z = Z !== null && Z !== void 0 ? Z : [], E instanceof aL1.UnsubscriptionError) Z = $wA($wA([], NwA(Z)), NwA(E.errors));
                  else Z.push(E)
                }
              }
            } catch (E) {
              I = {
                error: E
              }
            } finally {
              try {
                if (C && !C.done && (G = V.return)) G.call(V)
              } finally {
                if (I) throw I.error
              }
            }
          }
          if (Z) throw new aL1.UnsubscriptionError(Z)
        }
      }, A.prototype.add = function(B) {
        var Q;
        if (B && B !== this)
          if (this.closed) MwA(B);
          else {
            if (B instanceof A) {
              if (B.closed || B._hasParent(this)) return;
              B._addParent(this)
            }(this._finalizers = (Q = this._finalizers) !== null && Q !== void 0 ? Q : []).push(B)
          }
      }, A.prototype._hasParent = function(B) {
        var Q = this._parentage;
        return Q === B || Array.isArray(Q) && Q.includes(B)
      }, A.prototype._addParent = function(B) {
        var Q = this._parentage;
        this._parentage = Array.isArray(Q) ? (Q.push(B), Q) : Q ? [Q, B] : B
      }, A.prototype._removeParent = function(B) {
        var Q = this._parentage;
        if (Q === B) this._parentage = null;
        else if (Array.isArray(Q)) qwA.arrRemove(Q, B)
      }, A.prototype.remove = function(B) {
        var Q = this._finalizers;
        if (Q && qwA.arrRemove(Q, B), B instanceof A) B._removeParent(this)
      }, A.EMPTY = function() {
        var B = new A;
        return B.closed = !0, B
      }(), A
    }();
  PY.Subscription = sL1;
  PY.EMPTY_SUBSCRIPTION = sL1.EMPTY;

  function mq9(A) {
    return A instanceof sL1 || A && "closed" in A && Ci.isFunction(A.remove) && Ci.isFunction(A.add) && Ci.isFunction(A.unsubscribe)
  }
  PY.isSubscription = mq9;

  function MwA(A) {
    if (Ci.isFunction(A)) A();
    else A.unsubscribe()
  }
})
// @from(Start 1028105, End 1028396)
qf = z((LwA) => {
  Object.defineProperty(LwA, "__esModule", {
    value: !0
  });
  LwA.config = void 0;
  LwA.config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1
  }
})
// @from(Start 1028402, End 1029769)
rL1 = z((Vz) => {
  var OwA = Vz && Vz.__read || function(A, B) {
      var Q = typeof Symbol === "function" && A[Symbol.iterator];
      if (!Q) return A;
      var I = Q.call(A),
        G, Z = [],
        D;
      try {
        while ((B === void 0 || B-- > 0) && !(G = I.next()).done) Z.push(G.value)
      } catch (Y) {
        D = {
          error: Y
        }
      } finally {
        try {
          if (G && !G.done && (Q = I.return)) Q.call(I)
        } finally {
          if (D) throw D.error
        }
      }
      return Z
    },
    TwA = Vz && Vz.__spreadArray || function(A, B) {
      for (var Q = 0, I = B.length, G = A.length; Q < I; Q++, G++) A[G] = B[Q];
      return A
    };
  Object.defineProperty(Vz, "__esModule", {
    value: !0
  });
  Vz.timeoutProvider = void 0;
  Vz.timeoutProvider = {
    setTimeout: function(A, B) {
      var Q = [];
      for (var I = 2; I < arguments.length; I++) Q[I - 2] = arguments[I];
      var G = Vz.timeoutProvider.delegate;
      if (G === null || G === void 0 ? void 0 : G.setTimeout) return G.setTimeout.apply(G, TwA([A, B], OwA(Q)));
      return setTimeout.apply(void 0, TwA([A, B], OwA(Q)))
    },
    clearTimeout: function(A) {
      var B = Vz.timeoutProvider.delegate;
      return ((B === null || B === void 0 ? void 0 : B.clearTimeout) || clearTimeout)(A)
    },
    delegate: void 0
  }
})
// @from(Start 1029775, End 1030127)
oL1 = z((PwA) => {
  Object.defineProperty(PwA, "__esModule", {
    value: !0
  });
  PwA.reportUnhandledError = void 0;
  var dq9 = qf(),
    uq9 = rL1();

  function pq9(A) {
    uq9.timeoutProvider.setTimeout(function() {
      var B = dq9.config.onUnhandledError;
      if (B) B(A);
      else throw A
    })
  }
  PwA.reportUnhandledError = pq9
})
// @from(Start 1030133, End 1030277)
zG = z((_wA) => {
  Object.defineProperty(_wA, "__esModule", {
    value: !0
  });
  _wA.noop = void 0;

  function cq9() {}
  _wA.noop = cq9
})
// @from(Start 1030283, End 1030865)
xwA = z((ywA) => {
  Object.defineProperty(ywA, "__esModule", {
    value: !0
  });
  ywA.createNotification = ywA.nextNotification = ywA.errorNotification = ywA.COMPLETE_NOTIFICATION = void 0;
  ywA.COMPLETE_NOTIFICATION = function() {
    return T51("C", void 0, void 0)
  }();

  function lq9(A) {
    return T51("E", void 0, A)
  }
  ywA.errorNotification = lq9;

  function iq9(A) {
    return T51("N", A, void 0)
  }
  ywA.nextNotification = iq9;

  function T51(A, B, Q) {
    return {
      kind: A,
      value: B,
      error: Q
    }
  }
  ywA.createNotification = T51
})
// @from(Start 1030871, End 1031539)
P51 = z((vwA) => {
  Object.defineProperty(vwA, "__esModule", {
    value: !0
  });
  vwA.captureError = vwA.errorContext = void 0;
  var fwA = qf(),
    FS = null;

  function rq9(A) {
    if (fwA.config.useDeprecatedSynchronousErrorHandling) {
      var B = !FS;
      if (B) FS = {
        errorThrown: !1,
        error: null
      };
      if (A(), B) {
        var Q = FS,
          I = Q.errorThrown,
          G = Q.error;
        if (FS = null, I) throw G
      }
    } else A()
  }
  vwA.errorContext = rq9;

  function oq9(A) {
    if (fwA.config.useDeprecatedSynchronousErrorHandling && FS) FS.errorThrown = !0, FS.error = A
  }
  vwA.captureError = oq9
})
// @from(Start 1031545, End 1035968)
Mf = z((WC) => {
  var mwA = WC && WC.__extends || function() {
    var A = function(B, Q) {
      return A = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(I, G) {
        I.__proto__ = G
      } || function(I, G) {
        for (var Z in G)
          if (Object.prototype.hasOwnProperty.call(G, Z)) I[Z] = G[Z]
      }, A(B, Q)
    };
    return function(B, Q) {
      if (typeof Q !== "function" && Q !== null) throw new TypeError("Class extends value " + String(Q) + " is not a constructor or null");
      A(B, Q);

      function I() {
        this.constructor = B
      }
      B.prototype = Q === null ? Object.create(Q) : (I.prototype = Q.prototype, new I)
    }
  }();
  Object.defineProperty(WC, "__esModule", {
    value: !0
  });
  WC.EMPTY_OBSERVER = WC.SafeSubscriber = WC.Subscriber = void 0;
  var eq9 = G8(),
    gwA = DJ(),
    BR1 = qf(),
    AM9 = oL1(),
    hwA = zG(),
    tL1 = xwA(),
    BM9 = rL1(),
    QM9 = P51(),
    dwA = function(A) {
      mwA(B, A);

      function B(Q) {
        var I = A.call(this) || this;
        if (I.isStopped = !1, Q) {
          if (I.destination = Q, gwA.isSubscription(Q)) Q.add(I)
        } else I.destination = WC.EMPTY_OBSERVER;
        return I
      }
      return B.create = function(Q, I, G) {
        return new uwA(Q, I, G)
      }, B.prototype.next = function(Q) {
        if (this.isStopped) AR1(tL1.nextNotification(Q), this);
        else this._next(Q)
      }, B.prototype.error = function(Q) {
        if (this.isStopped) AR1(tL1.errorNotification(Q), this);
        else this.isStopped = !0, this._error(Q)
      }, B.prototype.complete = function() {
        if (this.isStopped) AR1(tL1.COMPLETE_NOTIFICATION, this);
        else this.isStopped = !0, this._complete()
      }, B.prototype.unsubscribe = function() {
        if (!this.closed) this.isStopped = !0, A.prototype.unsubscribe.call(this), this.destination = null
      }, B.prototype._next = function(Q) {
        this.destination.next(Q)
      }, B.prototype._error = function(Q) {
        try {
          this.destination.error(Q)
        } finally {
          this.unsubscribe()
        }
      }, B.prototype._complete = function() {
        try {
          this.destination.complete()
        } finally {
          this.unsubscribe()
        }
      }, B
    }(gwA.Subscription);
  WC.Subscriber = dwA;
  var IM9 = Function.prototype.bind;

  function eL1(A, B) {
    return IM9.call(A, B)
  }
  var GM9 = function() {
      function A(B) {
        this.partialObserver = B
      }
      return A.prototype.next = function(B) {
        var Q = this.partialObserver;
        if (Q.next) try {
          Q.next(B)
        } catch (I) {
          S51(I)
        }
      }, A.prototype.error = function(B) {
        var Q = this.partialObserver;
        if (Q.error) try {
          Q.error(B)
        } catch (I) {
          S51(I)
        } else S51(B)
      }, A.prototype.complete = function() {
        var B = this.partialObserver;
        if (B.complete) try {
          B.complete()
        } catch (Q) {
          S51(Q)
        }
      }, A
    }(),
    uwA = function(A) {
      mwA(B, A);

      function B(Q, I, G) {
        var Z = A.call(this) || this,
          D;
        if (eq9.isFunction(Q) || !Q) D = {
          next: Q !== null && Q !== void 0 ? Q : void 0,
          error: I !== null && I !== void 0 ? I : void 0,
          complete: G !== null && G !== void 0 ? G : void 0
        };
        else {
          var Y;
          if (Z && BR1.config.useDeprecatedNextContext) Y = Object.create(Q), Y.unsubscribe = function() {
            return Z.unsubscribe()
          }, D = {
            next: Q.next && eL1(Q.next, Y),
            error: Q.error && eL1(Q.error, Y),
            complete: Q.complete && eL1(Q.complete, Y)
          };
          else D = Q
        }
        return Z.destination = new GM9(D), Z
      }
      return B
    }(dwA);
  WC.SafeSubscriber = uwA;

  function S51(A) {
    if (BR1.config.useDeprecatedSynchronousErrorHandling) QM9.captureError(A);
    else AM9.reportUnhandledError(A)
  }

  function ZM9(A) {
    throw A
  }

  function AR1(A, B) {
    var Q = BR1.config.onStoppedNotification;
    Q && BM9.timeoutProvider.setTimeout(function() {
      return Q(A, B)
    })
  }
  WC.EMPTY_OBSERVER = {
    closed: !0,
    next: hwA.noop,
    error: ZM9,
    complete: hwA.noop
  }
})
// @from(Start 1035974, End 1036203)
Ki = z((pwA) => {
  Object.defineProperty(pwA, "__esModule", {
    value: !0
  });
  pwA.observable = void 0;
  pwA.observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable"
  }()
})
// @from(Start 1036209, End 1036378)
wG = z((lwA) => {
  Object.defineProperty(lwA, "__esModule", {
    value: !0
  });
  lwA.identity = void 0;

  function DM9(A) {
    return A
  }
  lwA.identity = DM9
})
// @from(Start 1036384, End 1036909)
Hi = z((awA) => {
  Object.defineProperty(awA, "__esModule", {
    value: !0
  });
  awA.pipeFromArray = awA.pipe = void 0;
  var YM9 = wG();

  function WM9() {
    var A = [];
    for (var B = 0; B < arguments.length; B++) A[B] = arguments[B];
    return nwA(A)
  }
  awA.pipe = WM9;

  function nwA(A) {
    if (A.length === 0) return YM9.identity;
    if (A.length === 1) return A[0];
    return function B(Q) {
      return A.reduce(function(I, G) {
        return G(I)
      }, Q)
    }
  }
  awA.pipeFromArray = nwA
})
// @from(Start 1036915, End 1039465)
N8 = z((owA) => {
  Object.defineProperty(owA, "__esModule", {
    value: !0
  });
  owA.Observable = void 0;
  var IR1 = Mf(),
    FM9 = DJ(),
    XM9 = Ki(),
    VM9 = Hi(),
    CM9 = qf(),
    QR1 = G8(),
    KM9 = P51(),
    HM9 = function() {
      function A(B) {
        if (B) this._subscribe = B
      }
      return A.prototype.lift = function(B) {
        var Q = new A;
        return Q.source = this, Q.operator = B, Q
      }, A.prototype.subscribe = function(B, Q, I) {
        var G = this,
          Z = wM9(B) ? B : new IR1.SafeSubscriber(B, Q, I);
        return KM9.errorContext(function() {
          var D = G,
            Y = D.operator,
            W = D.source;
          Z.add(Y ? Y.call(Z, W) : W ? G._subscribe(Z) : G._trySubscribe(Z))
        }), Z
      }, A.prototype._trySubscribe = function(B) {
        try {
          return this._subscribe(B)
        } catch (Q) {
          B.error(Q)
        }
      }, A.prototype.forEach = function(B, Q) {
        var I = this;
        return Q = rwA(Q), new Q(function(G, Z) {
          var D = new IR1.SafeSubscriber({
            next: function(Y) {
              try {
                B(Y)
              } catch (W) {
                Z(W), D.unsubscribe()
              }
            },
            error: Z,
            complete: G
          });
          I.subscribe(D)
        })
      }, A.prototype._subscribe = function(B) {
        var Q;
        return (Q = this.source) === null || Q === void 0 ? void 0 : Q.subscribe(B)
      }, A.prototype[XM9.observable] = function() {
        return this
      }, A.prototype.pipe = function() {
        var B = [];
        for (var Q = 0; Q < arguments.length; Q++) B[Q] = arguments[Q];
        return VM9.pipeFromArray(B)(this)
      }, A.prototype.toPromise = function(B) {
        var Q = this;
        return B = rwA(B), new B(function(I, G) {
          var Z;
          Q.subscribe(function(D) {
            return Z = D
          }, function(D) {
            return G(D)
          }, function() {
            return I(Z)
          })
        })
      }, A.create = function(B) {
        return new A(B)
      }, A
    }();
  owA.Observable = HM9;

  function rwA(A) {
    var B;
    return (B = A !== null && A !== void 0 ? A : CM9.config.Promise) !== null && B !== void 0 ? B : Promise
  }

  function zM9(A) {
    return A && QR1.isFunction(A.next) && QR1.isFunction(A.error) && QR1.isFunction(A.complete)
  }

  function wM9(A) {
    return A && A instanceof IR1.Subscriber || zM9(A) && FM9.isSubscription(A)
  }
})
// @from(Start 1039471, End 1040028)
L2 = z((AEA) => {
  Object.defineProperty(AEA, "__esModule", {
    value: !0
  });
  AEA.operate = AEA.hasLift = void 0;
  var EM9 = G8();

  function ewA(A) {
    return EM9.isFunction(A === null || A === void 0 ? void 0 : A.lift)
  }
  AEA.hasLift = ewA;

  function UM9(A) {
    return function(B) {
      if (ewA(B)) return B.lift(function(Q) {
        try {
          return A(Q, this)
        } catch (I) {
          this.error(I)
        }
      });
      throw new TypeError("Unable to lift unknown Observable type")
    }
  }
  AEA.operate = UM9
})
// @from(Start 1040034, End 1042056)
B9 = z((NM) => {
  var $M9 = NM && NM.__extends || function() {
    var A = function(B, Q) {
      return A = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(I, G) {
        I.__proto__ = G
      } || function(I, G) {
        for (var Z in G)
          if (Object.prototype.hasOwnProperty.call(G, Z)) I[Z] = G[Z]
      }, A(B, Q)
    };
    return function(B, Q) {
      if (typeof Q !== "function" && Q !== null) throw new TypeError("Class extends value " + String(Q) + " is not a constructor or null");
      A(B, Q);

      function I() {
        this.constructor = B
      }
      B.prototype = Q === null ? Object.create(Q) : (I.prototype = Q.prototype, new I)
    }
  }();
  Object.defineProperty(NM, "__esModule", {
    value: !0
  });
  NM.OperatorSubscriber = NM.createOperatorSubscriber = void 0;
  var qM9 = Mf();

  function MM9(A, B, Q, I, G) {
    return new QEA(A, B, Q, I, G)
  }
  NM.createOperatorSubscriber = MM9;
  var QEA = function(A) {
    $M9(B, A);

    function B(Q, I, G, Z, D, Y) {
      var W = A.call(this, Q) || this;
      return W.onFinalize = D, W.shouldUnsubscribe = Y, W._next = I ? function(J) {
        try {
          I(J)
        } catch (F) {
          Q.error(F)
        }
      } : A.prototype._next, W._error = Z ? function(J) {
        try {
          Z(J)
        } catch (F) {
          Q.error(F)
        } finally {
          this.unsubscribe()
        }
      } : A.prototype._error, W._complete = G ? function() {
        try {
          G()
        } catch (J) {
          Q.error(J)
        } finally {
          this.unsubscribe()
        }
      } : A.prototype._complete, W
    }
    return B.prototype.unsubscribe = function() {
      var Q;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var I = this.closed;
        A.prototype.unsubscribe.call(this), !I && ((Q = this.onFinalize) === null || Q === void 0 || Q.call(this))
      }
    }, B
  }(qM9.Subscriber);
  NM.OperatorSubscriber = QEA
})
// @from(Start 1042062, End 1042725)
_51 = z((IEA) => {
  Object.defineProperty(IEA, "__esModule", {
    value: !0
  });
  IEA.refCount = void 0;
  var LM9 = L2(),
    RM9 = B9();

  function OM9() {
    return LM9.operate(function(A, B) {
      var Q = null;
      A._refCount++;
      var I = RM9.createOperatorSubscriber(B, void 0, void 0, void 0, function() {
        if (!A || A._refCount <= 0 || 0 < --A._refCount) {
          Q = null;
          return
        }
        var G = A._connection,
          Z = Q;
        if (Q = null, G && (!Z || G === Z)) G.unsubscribe();
        B.unsubscribe()
      });
      if (A.subscribe(I), !I.closed) Q = A.connect()
    })
  }
  IEA.refCount = OM9
})
// @from(Start 1042731, End 1045119)
zi = z((Lf) => {
  var TM9 = Lf && Lf.__extends || function() {
    var A = function(B, Q) {
      return A = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(I, G) {
        I.__proto__ = G
      } || function(I, G) {
        for (var Z in G)
          if (Object.prototype.hasOwnProperty.call(G, Z)) I[Z] = G[Z]
      }, A(B, Q)
    };
    return function(B, Q) {
      if (typeof Q !== "function" && Q !== null) throw new TypeError("Class extends value " + String(Q) + " is not a constructor or null");
      A(B, Q);

      function I() {
        this.constructor = B
      }
      B.prototype = Q === null ? Object.create(Q) : (I.prototype = Q.prototype, new I)
    }
  }();
  Object.defineProperty(Lf, "__esModule", {
    value: !0
  });
  Lf.ConnectableObservable = void 0;
  var PM9 = N8(),
    ZEA = DJ(),
    SM9 = _51(),
    _M9 = B9(),
    jM9 = L2(),
    yM9 = function(A) {
      TM9(B, A);

      function B(Q, I) {
        var G = A.call(this) || this;
        if (G.source = Q, G.subjectFactory = I, G._subject = null, G._refCount = 0, G._connection = null, jM9.hasLift(Q)) G.lift = Q.lift;
        return G
      }
      return B.prototype._subscribe = function(Q) {
        return this.getSubject().subscribe(Q)
      }, B.prototype.getSubject = function() {
        var Q = this._subject;
        if (!Q || Q.isStopped) this._subject = this.subjectFactory();
        return this._subject
      }, B.prototype._teardown = function() {
        this._refCount = 0;
        var Q = this._connection;
        this._subject = this._connection = null, Q === null || Q === void 0 || Q.unsubscribe()
      }, B.prototype.connect = function() {
        var Q = this,
          I = this._connection;
        if (!I) {
          I = this._connection = new ZEA.Subscription;
          var G = this.getSubject();
          if (I.add(this.source.subscribe(_M9.createOperatorSubscriber(G, void 0, function() {
              Q._teardown(), G.complete()
            }, function(Z) {
              Q._teardown(), G.error(Z)
            }, function() {
              return Q._teardown()
            }))), I.closed) this._connection = null, I = ZEA.Subscription.EMPTY
        }
        return I
      }, B.prototype.refCount = function() {
        return SM9.refCount()(this)
      }, B
    }(PM9.Observable);
  Lf.ConnectableObservable = yM9
})
// @from(Start 1045125, End 1045427)
YEA = z((DEA) => {
  Object.defineProperty(DEA, "__esModule", {
    value: !0
  });
  DEA.performanceTimestampProvider = void 0;
  DEA.performanceTimestampProvider = {
    now: function() {
      return (DEA.performanceTimestampProvider.delegate || performance).now()
    },
    delegate: void 0
  }
})
// @from(Start 1045433, End 1047354)
ZR1 = z((JC) => {
  var WEA = JC && JC.__read || function(A, B) {
      var Q = typeof Symbol === "function" && A[Symbol.iterator];
      if (!Q) return A;
      var I = Q.call(A),
        G, Z = [],
        D;
      try {
        while ((B === void 0 || B-- > 0) && !(G = I.next()).done) Z.push(G.value)
      } catch (Y) {
        D = {
          error: Y
        }
      } finally {
        try {
          if (G && !G.done && (Q = I.return)) Q.call(I)
        } finally {
          if (D) throw D.error
        }
      }
      return Z
    },
    JEA = JC && JC.__spreadArray || function(A, B) {
      for (var Q = 0, I = B.length, G = A.length; Q < I; Q++, G++) A[G] = B[Q];
      return A
    };
  Object.defineProperty(JC, "__esModule", {
    value: !0
  });
  JC.animationFrameProvider = void 0;
  var kM9 = DJ();
  JC.animationFrameProvider = {
    schedule: function(A) {
      var B = requestAnimationFrame,
        Q = cancelAnimationFrame,
        I = JC.animationFrameProvider.delegate;
      if (I) B = I.requestAnimationFrame, Q = I.cancelAnimationFrame;
      var G = B(function(Z) {
        Q = void 0, A(Z)
      });
      return new kM9.Subscription(function() {
        return Q === null || Q === void 0 ? void 0 : Q(G)
      })
    },
    requestAnimationFrame: function() {
      var A = [];
      for (var B = 0; B < arguments.length; B++) A[B] = arguments[B];
      var Q = JC.animationFrameProvider.delegate;
      return ((Q === null || Q === void 0 ? void 0 : Q.requestAnimationFrame) || requestAnimationFrame).apply(void 0, JEA([], WEA(A)))
    },
    cancelAnimationFrame: function() {
      var A = [];
      for (var B = 0; B < arguments.length; B++) A[B] = arguments[B];
      var Q = JC.animationFrameProvider.delegate;
      return ((Q === null || Q === void 0 ? void 0 : Q.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, JEA([], WEA(A)))
    },
    delegate: void 0
  }
})
// @from(Start 1047360, End 1048207)
KEA = z((VEA) => {
  Object.defineProperty(VEA, "__esModule", {
    value: !0
  });
  VEA.animationFrames = void 0;
  var xM9 = N8(),
    fM9 = YEA(),
    FEA = ZR1();

  function vM9(A) {
    return A ? XEA(A) : bM9
  }
  VEA.animationFrames = vM9;

  function XEA(A) {
    return new xM9.Observable(function(B) {
      var Q = A || fM9.performanceTimestampProvider,
        I = Q.now(),
        G = 0,
        Z = function() {
          if (!B.closed) G = FEA.animationFrameProvider.requestAnimationFrame(function(D) {
            G = 0;
            var Y = Q.now();
            B.next({
              timestamp: A ? Y : D,
              elapsed: Y - I
            }), Z()
          })
        };
      return Z(),
        function() {
          if (G) FEA.animationFrameProvider.cancelAnimationFrame(G)
        }
    })
  }
  var bM9 = XEA()
})
// @from(Start 1048213, End 1048552)
DR1 = z((HEA) => {
  Object.defineProperty(HEA, "__esModule", {
    value: !0
  });
  HEA.ObjectUnsubscribedError = void 0;
  var gM9 = UM();
  HEA.ObjectUnsubscribedError = gM9.createErrorClass(function(A) {
    return function B() {
      A(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
    }
  })
})
// @from(Start 1048558, End 1054303)
EG = z((Cz) => {
  var EEA = Cz && Cz.__extends || function() {
      var A = function(B, Q) {
        return A = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function(I, G) {
          I.__proto__ = G
        } || function(I, G) {
          for (var Z in G)
            if (Object.prototype.hasOwnProperty.call(G, Z)) I[Z] = G[Z]
        }, A(B, Q)
      };
      return function(B, Q) {
        if (typeof Q !== "function" && Q !== null) throw new TypeError("Class extends value " + String(Q) + " is not a constructor or null");
        A(B, Q);

        function I() {
          this.constructor = B
        }
        B.prototype = Q === null ? Object.create(Q) : (I.prototype = Q.prototype, new I)
      }
    }(),
    hM9 = Cz && Cz.__values || function(A) {
      var B = typeof Symbol === "function" && Symbol.iterator,
        Q = B && A[B],
        I = 0;
      if (Q) return Q.call(A);
      if (A && typeof A.length === "number") return {
        next: function() {
          if (A && I >= A.length) A = void 0;
          return {
            value: A && A[I++],
            done: !A
          }
        }
      };
      throw new TypeError(B ? "Object is not iterable." : "Symbol.iterator is not defined.")
    };
  Object.defineProperty(Cz, "__esModule", {
    value: !0
  });
  Cz.AnonymousSubject = Cz.Subject = void 0;
  var wEA = N8(),
    WR1 = DJ(),
    mM9 = DR1(),
    dM9 = mU(),
    YR1 = P51(),
    UEA = function(A) {
      EEA(B, A);

      function B() {
        var Q = A.call(this) || this;
        return Q.closed = !1, Q.currentObservers = null, Q.observers = [], Q.isStopped = !1, Q.hasError = !1, Q.thrownError = null, Q
      }
      return B.prototype.lift = function(Q) {
        var I = new JR1(this, this);
        return I.operator = Q, I
      }, B.prototype._throwIfClosed = function() {
        if (this.closed) throw new mM9.ObjectUnsubscribedError
      }, B.prototype.next = function(Q) {
        var I = this;
        YR1.errorContext(function() {
          var G, Z;
          if (I._throwIfClosed(), !I.isStopped) {
            if (!I.currentObservers) I.currentObservers = Array.from(I.observers);
            try {
              for (var D = hM9(I.currentObservers), Y = D.next(); !Y.done; Y = D.next()) {
                var W = Y.value;
                W.next(Q)
              }
            } catch (J) {
              G = {
                error: J
              }
            } finally {
              try {
                if (Y && !Y.done && (Z = D.return)) Z.call(D)
              } finally {
                if (G) throw G.error
              }
            }
          }
        })
      }, B.prototype.error = function(Q) {
        var I = this;
        YR1.errorContext(function() {
          if (I._throwIfClosed(), !I.isStopped) {
            I.hasError = I.isStopped = !0, I.thrownError = Q;
            var G = I.observers;
            while (G.length) G.shift().error(Q)
          }
        })
      }, B.prototype.complete = function() {
        var Q = this;
        YR1.errorContext(function() {
          if (Q._throwIfClosed(), !Q.isStopped) {
            Q.isStopped = !0;
            var I = Q.observers;
            while (I.length) I.shift().complete()
          }
        })
      }, B.prototype.unsubscribe = function() {
        this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
      }, Object.defineProperty(B.prototype, "observed", {
        get: function() {
          var Q;
          return ((Q = this.observers) === null || Q === void 0 ? void 0 : Q.length) > 0
        },
        enumerable: !1,
        configurable: !0
      }), B.prototype._trySubscribe = function(Q) {
        return this._throwIfClosed(), A.prototype._trySubscribe.call(this, Q)
      }, B.prototype._subscribe = function(Q) {
        return this._throwIfClosed(), this._checkFinalizedStatuses(Q), this._innerSubscribe(Q)
      }, B.prototype._innerSubscribe = function(Q) {
        var I = this,
          G = this,
          Z = G.hasError,
          D = G.isStopped,
          Y = G.observers;
        if (Z || D) return WR1.EMPTY_SUBSCRIPTION;
        return this.currentObservers = null, Y.push(Q), new WR1.Subscription(function() {
          I.currentObservers = null, dM9.arrRemove(Y, Q)
        })
      }, B.prototype._checkFinalizedStatuses = function(Q) {
        var I = this,
          G = I.hasError,
          Z = I.thrownError,
          D = I.isStopped;
        if (G) Q.error(Z);
        else if (D) Q.complete()
      }, B.prototype.asObservable = function() {
        var Q = new wEA.Observable;
        return Q.source = this, Q
      }, B.create = function(Q, I) {
        return new JR1(Q, I)
      }, B
    }(wEA.Observable);
  Cz.Subject = UEA;
  var JR1 = function(A) {
    EEA(B, A);

    function B(Q, I) {
      var G = A.call(this) || this;
      return G.destination = Q, G.source = I, G
    }
    return B.prototype.next = function(Q) {
      var I, G;
      (G = (I = this.destination) === null || I === void 0 ? void 0 : I.next) === null || G === void 0 || G.call(I, Q)
    }, B.prototype.error = function(Q) {
      var I, G;
      (G = (I = this.destination) === null || I === void 0 ? void 0 : I.error) === null || G === void 0 || G.call(I, Q)
    }, B.prototype.complete = function() {
      var Q, I;
      (I = (Q = this.destination) === null || Q === void 0 ? void 0 : Q.complete) === null || I === void 0 || I.call(Q)
    }, B.prototype._subscribe = function(Q) {
      var I, G;
      return (G = (I = this.source) === null || I === void 0 ? void 0 : I.subscribe(Q)) !== null && G !== void 0 ? G : WR1.EMPTY_SUBSCRIPTION
    }, B
  }(UEA);
  Cz.AnonymousSubject = JR1
})
// @from(Start 1054309, End 1055984)
FR1 = z((Rf) => {
  var uM9 = Rf && Rf.__extends || function() {
    var A = function(B, Q) {
      return A = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(I, G) {
        I.__proto__ = G
      } || function(I, G) {
        for (var Z in G)
          if (Object.prototype.hasOwnProperty.call(G, Z)) I[Z] = G[Z]
      }, A(B, Q)
    };
    return function(B, Q) {
      if (typeof Q !== "function" && Q !== null) throw new TypeError("Class extends value " + String(Q) + " is not a constructor or null");
      A(B, Q);

      function I() {
        this.constructor = B
      }
      B.prototype = Q === null ? Object.create(Q) : (I.prototype = Q.prototype, new I)
    }
  }();
  Object.defineProperty(Rf, "__esModule", {
    value: !0
  });
  Rf.BehaviorSubject = void 0;
  var pM9 = EG(),
    cM9 = function(A) {
      uM9(B, A);

      function B(Q) {
        var I = A.call(this) || this;
        return I._value = Q, I
      }
      return Object.defineProperty(B.prototype, "value", {
        get: function() {
          return this.getValue()
        },
        enumerable: !1,
        configurable: !0
      }), B.prototype._subscribe = function(Q) {
        var I = A.prototype._subscribe.call(this, Q);
        return !I.closed && Q.next(this._value), I
      }, B.prototype.getValue = function() {
        var Q = this,
          I = Q.hasError,
          G = Q.thrownError,
          Z = Q._value;
        if (I) throw G;
        return this._throwIfClosed(), Z
      }, B.prototype.next = function(Q) {
        A.prototype.next.call(this, this._value = Q)
      }, B
    }(pM9.Subject);
  Rf.BehaviorSubject = cM9
})
// @from(Start 1055990, End 1056264)
j51 = z((NEA) => {
  Object.defineProperty(NEA, "__esModule", {
    value: !0
  });
  NEA.dateTimestampProvider = void 0;
  NEA.dateTimestampProvider = {
    now: function() {
      return (NEA.dateTimestampProvider.delegate || Date).now()
    },
    delegate: void 0
  }
})
// @from(Start 1056270, End 1058826)
y51 = z((Of) => {
  var lM9 = Of && Of.__extends || function() {
    var A = function(B, Q) {
      return A = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(I, G) {
        I.__proto__ = G
      } || function(I, G) {
        for (var Z in G)
          if (Object.prototype.hasOwnProperty.call(G, Z)) I[Z] = G[Z]
      }, A(B, Q)
    };
    return function(B, Q) {
      if (typeof Q !== "function" && Q !== null) throw new TypeError("Class extends value " + String(Q) + " is not a constructor or null");
      A(B, Q);

      function I() {
        this.constructor = B
      }
      B.prototype = Q === null ? Object.create(Q) : (I.prototype = Q.prototype, new I)
    }
  }();
  Object.defineProperty(Of, "__esModule", {
    value: !0
  });
  Of.ReplaySubject = void 0;
  var iM9 = EG(),
    nM9 = j51(),
    aM9 = function(A) {
      lM9(B, A);

      function B(Q, I, G) {
        if (Q === void 0) Q = 1 / 0;
        if (I === void 0) I = 1 / 0;
        if (G === void 0) G = nM9.dateTimestampProvider;
        var Z = A.call(this) || this;
        return Z._bufferSize = Q, Z._windowTime = I, Z._timestampProvider = G, Z._buffer = [], Z._infiniteTimeWindow = !0, Z._infiniteTimeWindow = I === 1 / 0, Z._bufferSize = Math.max(1, Q), Z._windowTime = Math.max(1, I), Z
      }
      return B.prototype.next = function(Q) {
        var I = this,
          G = I.isStopped,
          Z = I._buffer,
          D = I._infiniteTimeWindow,
          Y = I._timestampProvider,
          W = I._windowTime;
        if (!G) Z.push(Q), !D && Z.push(Y.now() + W);
        this._trimBuffer(), A.prototype.next.call(this, Q)
      }, B.prototype._subscribe = function(Q) {
        this._throwIfClosed(), this._trimBuffer();
        var I = this._innerSubscribe(Q),
          G = this,
          Z = G._infiniteTimeWindow,
          D = G._buffer,
          Y = D.slice();
        for (var W = 0; W < Y.length && !Q.closed; W += Z ? 1 : 2) Q.next(Y[W]);
        return this._checkFinalizedStatuses(Q), I
      }, B.prototype._trimBuffer = function() {
        var Q = this,
          I = Q._bufferSize,
          G = Q._timestampProvider,
          Z = Q._buffer,
          D = Q._infiniteTimeWindow,
          Y = (D ? 1 : 2) * I;
        if (I < 1 / 0 && Y < Z.length && Z.splice(0, Z.length - Y), !D) {
          var W = G.now(),
            J = 0;
          for (var F = 1; F < Z.length && Z[F] <= W; F += 2) J = F;
          J && Z.splice(0, J + 1)
        }
      }, B
    }(iM9.Subject);
  Of.ReplaySubject = aM9
})
// @from(Start 1058832, End 1060623)
k51 = z((Tf) => {
  var sM9 = Tf && Tf.__extends || function() {
    var A = function(B, Q) {
      return A = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(I, G) {
        I.__proto__ = G
      } || function(I, G) {
        for (var Z in G)
          if (Object.prototype.hasOwnProperty.call(G, Z)) I[Z] = G[Z]
      }, A(B, Q)
    };
    return function(B, Q) {
      if (typeof Q !== "function" && Q !== null) throw new TypeError("Class extends value " + String(Q) + " is not a constructor or null");
      A(B, Q);

      function I() {
        this.constructor = B
      }
      B.prototype = Q === null ? Object.create(Q) : (I.prototype = Q.prototype, new I)
    }
  }();
  Object.defineProperty(Tf, "__esModule", {
    value: !0
  });
  Tf.AsyncSubject = void 0;
  var rM9 = EG(),
    oM9 = function(A) {
      sM9(B, A);

      function B() {
        var Q = A !== null && A.apply(this, arguments) || this;
        return Q._value = null, Q._hasValue = !1, Q._isComplete = !1, Q
      }
      return B.prototype._checkFinalizedStatuses = function(Q) {
        var I = this,
          G = I.hasError,
          Z = I._hasValue,
          D = I._value,
          Y = I.thrownError,
          W = I.isStopped,
          J = I._isComplete;
        if (G) Q.error(Y);
        else if (W || J) Z && Q.next(D), Q.complete()
      }, B.prototype.next = function(Q) {
        if (!this.isStopped) this._value = Q, this._hasValue = !0
      }, B.prototype.complete = function() {
        var Q = this,
          I = Q._hasValue,
          G = Q._value,
          Z = Q._isComplete;
        if (!Z) this._isComplete = !0, I && A.prototype.next.call(this, G), A.prototype.complete.call(this)
      }, B
    }(rM9.Subject);
  Tf.AsyncSubject = oM9
})