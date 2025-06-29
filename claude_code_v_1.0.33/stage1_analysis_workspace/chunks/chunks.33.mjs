
// @from(Start 3375448, End 3376272)
Da = z((eoA) => {
  Object.defineProperty(eoA, "__esModule", {
    value: !0
  });
  eoA.default = void 0;
  eoA.unsafeStringify = toA;
  var KJ4 = HJ4(Za());

  function HJ4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var OG = [];
  for (let A = 0; A < 256; ++A) OG.push((A + 256).toString(16).slice(1));

  function toA(A, B = 0) {
    return OG[A[B + 0]] + OG[A[B + 1]] + OG[A[B + 2]] + OG[A[B + 3]] + "-" + OG[A[B + 4]] + OG[A[B + 5]] + "-" + OG[A[B + 6]] + OG[A[B + 7]] + "-" + OG[A[B + 8]] + OG[A[B + 9]] + "-" + OG[A[B + 10]] + OG[A[B + 11]] + OG[A[B + 12]] + OG[A[B + 13]] + OG[A[B + 14]] + OG[A[B + 15]]
  }

  function zJ4(A, B = 0) {
    let Q = toA(A, B);
    if (!KJ4.default(Q)) throw TypeError("Stringified UUID is invalid");
    return Q
  }
  var wJ4 = zJ4;
  eoA.default = wJ4
})
// @from(Start 3376278, End 3377815)
GtA = z((QtA) => {
  Object.defineProperty(QtA, "__esModule", {
    value: !0
  });
  QtA.default = void 0;
  var UJ4 = $J4(dj1()),
    NJ4 = Da();

  function $J4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var BtA, uj1, pj1 = 0,
    cj1 = 0;

  function qJ4(A, B, Q) {
    let I = B && Q || 0,
      G = B || new Array(16);
    A = A || {};
    let Z = A.node || BtA,
      D = A.clockseq !== void 0 ? A.clockseq : uj1;
    if (Z == null || D == null) {
      let V = A.random || (A.rng || UJ4.default)();
      if (Z == null) Z = BtA = [V[0] | 1, V[1], V[2], V[3], V[4], V[5]];
      if (D == null) D = uj1 = (V[6] << 8 | V[7]) & 16383
    }
    let Y = A.msecs !== void 0 ? A.msecs : Date.now(),
      W = A.nsecs !== void 0 ? A.nsecs : cj1 + 1,
      J = Y - pj1 + (W - cj1) / 1e4;
    if (J < 0 && A.clockseq === void 0) D = D + 1 & 16383;
    if ((J < 0 || Y > pj1) && A.nsecs === void 0) W = 0;
    if (W >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    pj1 = Y, cj1 = W, uj1 = D, Y += 12219292800000;
    let F = ((Y & 268435455) * 1e4 + W) % 4294967296;
    G[I++] = F >>> 24 & 255, G[I++] = F >>> 16 & 255, G[I++] = F >>> 8 & 255, G[I++] = F & 255;
    let X = Y / 4294967296 * 1e4 & 268435455;
    G[I++] = X >>> 8 & 255, G[I++] = X & 255, G[I++] = X >>> 24 & 15 | 16, G[I++] = X >>> 16 & 255, G[I++] = D >>> 8 | 128, G[I++] = D & 255;
    for (let V = 0; V < 6; ++V) G[I + V] = Z[V];
    return B || NJ4.unsafeStringify(G)
  }
  var MJ4 = qJ4;
  QtA.default = MJ4
})
// @from(Start 3377821, End 3378699)
lj1 = z((ZtA) => {
  Object.defineProperty(ZtA, "__esModule", {
    value: !0
  });
  ZtA.default = void 0;
  var LJ4 = RJ4(Za());

  function RJ4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function OJ4(A) {
    if (!LJ4.default(A)) throw TypeError("Invalid UUID");
    let B, Q = new Uint8Array(16);
    return Q[0] = (B = parseInt(A.slice(0, 8), 16)) >>> 24, Q[1] = B >>> 16 & 255, Q[2] = B >>> 8 & 255, Q[3] = B & 255, Q[4] = (B = parseInt(A.slice(9, 13), 16)) >>> 8, Q[5] = B & 255, Q[6] = (B = parseInt(A.slice(14, 18), 16)) >>> 8, Q[7] = B & 255, Q[8] = (B = parseInt(A.slice(19, 23), 16)) >>> 8, Q[9] = B & 255, Q[10] = (B = parseInt(A.slice(24, 36), 16)) / 1099511627776 & 255, Q[11] = B / 4294967296 & 255, Q[12] = B >>> 24 & 255, Q[13] = B >>> 16 & 255, Q[14] = B >>> 8 & 255, Q[15] = B & 255, Q
  }
  var TJ4 = OJ4;
  ZtA.default = TJ4
})
// @from(Start 3378705, End 3379965)
ij1 = z((JtA) => {
  Object.defineProperty(JtA, "__esModule", {
    value: !0
  });
  JtA.URL = JtA.DNS = void 0;
  JtA.default = yJ4;
  var PJ4 = Da(),
    SJ4 = _J4(lj1());

  function _J4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function jJ4(A) {
    A = unescape(encodeURIComponent(A));
    let B = [];
    for (let Q = 0; Q < A.length; ++Q) B.push(A.charCodeAt(Q));
    return B
  }
  var YtA = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  JtA.DNS = YtA;
  var WtA = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  JtA.URL = WtA;

  function yJ4(A, B, Q) {
    function I(G, Z, D, Y) {
      var W;
      if (typeof G === "string") G = jJ4(G);
      if (typeof Z === "string") Z = SJ4.default(Z);
      if (((W = Z) === null || W === void 0 ? void 0 : W.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      let J = new Uint8Array(16 + G.length);
      if (J.set(Z), J.set(G, Z.length), J = Q(J), J[6] = J[6] & 15 | B, J[8] = J[8] & 63 | 128, D) {
        Y = Y || 0;
        for (let F = 0; F < 16; ++F) D[Y + F] = J[F];
        return D
      }
      return PJ4.unsafeStringify(J)
    }
    try {
      I.name = A
    } catch (G) {}
    return I.DNS = YtA, I.URL = WtA, I
  }
})
// @from(Start 3379971, End 3380429)
CtA = z((XtA) => {
  Object.defineProperty(XtA, "__esModule", {
    value: !0
  });
  XtA.default = void 0;
  var fJ4 = vJ4(Z1("crypto"));

  function vJ4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function bJ4(A) {
    if (Array.isArray(A)) A = Buffer.from(A);
    else if (typeof A === "string") A = Buffer.from(A, "utf8");
    return fJ4.default.createHash("md5").update(A).digest()
  }
  var gJ4 = bJ4;
  XtA.default = gJ4
})
// @from(Start 3380435, End 3380759)
wtA = z((HtA) => {
  Object.defineProperty(HtA, "__esModule", {
    value: !0
  });
  HtA.default = void 0;
  var hJ4 = KtA(ij1()),
    mJ4 = KtA(CtA());

  function KtA(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var dJ4 = hJ4.default("v3", 48, mJ4.default),
    uJ4 = dJ4;
  HtA.default = uJ4
})
// @from(Start 3380765, End 3381069)
NtA = z((EtA) => {
  Object.defineProperty(EtA, "__esModule", {
    value: !0
  });
  EtA.default = void 0;
  var pJ4 = cJ4(Z1("crypto"));

  function cJ4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var lJ4 = {
    randomUUID: pJ4.default.randomUUID
  };
  EtA.default = lJ4
})
// @from(Start 3381075, End 3381729)
RtA = z((MtA) => {
  Object.defineProperty(MtA, "__esModule", {
    value: !0
  });
  MtA.default = void 0;
  var $tA = qtA(NtA()),
    iJ4 = qtA(dj1()),
    nJ4 = Da();

  function qtA(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function aJ4(A, B, Q) {
    if ($tA.default.randomUUID && !B && !A) return $tA.default.randomUUID();
    A = A || {};
    let I = A.random || (A.rng || iJ4.default)();
    if (I[6] = I[6] & 15 | 64, I[8] = I[8] & 63 | 128, B) {
      Q = Q || 0;
      for (let G = 0; G < 16; ++G) B[Q + G] = I[G];
      return B
    }
    return nJ4.unsafeStringify(I)
  }
  var sJ4 = aJ4;
  MtA.default = sJ4
})
// @from(Start 3381735, End 3382194)
PtA = z((OtA) => {
  Object.defineProperty(OtA, "__esModule", {
    value: !0
  });
  OtA.default = void 0;
  var rJ4 = oJ4(Z1("crypto"));

  function oJ4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function tJ4(A) {
    if (Array.isArray(A)) A = Buffer.from(A);
    else if (typeof A === "string") A = Buffer.from(A, "utf8");
    return rJ4.default.createHash("sha1").update(A).digest()
  }
  var eJ4 = tJ4;
  OtA.default = eJ4
})
// @from(Start 3382200, End 3382524)
ytA = z((_tA) => {
  Object.defineProperty(_tA, "__esModule", {
    value: !0
  });
  _tA.default = void 0;
  var AF4 = StA(ij1()),
    BF4 = StA(PtA());

  function StA(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var QF4 = AF4.default("v5", 80, BF4.default),
    IF4 = QF4;
  _tA.default = IF4
})
// @from(Start 3382530, End 3382712)
ftA = z((ktA) => {
  Object.defineProperty(ktA, "__esModule", {
    value: !0
  });
  ktA.default = void 0;
  var GF4 = "00000000-0000-0000-0000-000000000000";
  ktA.default = GF4
})
// @from(Start 3382718, End 3383097)
gtA = z((vtA) => {
  Object.defineProperty(vtA, "__esModule", {
    value: !0
  });
  vtA.default = void 0;
  var ZF4 = DF4(Za());

  function DF4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function YF4(A) {
    if (!ZF4.default(A)) throw TypeError("Invalid UUID");
    return parseInt(A.slice(14, 15), 16)
  }
  var WF4 = YF4;
  vtA.default = WF4
})
// @from(Start 3383103, End 3384517)
htA = z((LC) => {
  Object.defineProperty(LC, "__esModule", {
    value: !0
  });
  Object.defineProperty(LC, "NIL", {
    enumerable: !0,
    get: function() {
      return CF4.default
    }
  });
  Object.defineProperty(LC, "parse", {
    enumerable: !0,
    get: function() {
      return wF4.default
    }
  });
  Object.defineProperty(LC, "stringify", {
    enumerable: !0,
    get: function() {
      return zF4.default
    }
  });
  Object.defineProperty(LC, "v1", {
    enumerable: !0,
    get: function() {
      return JF4.default
    }
  });
  Object.defineProperty(LC, "v3", {
    enumerable: !0,
    get: function() {
      return FF4.default
    }
  });
  Object.defineProperty(LC, "v4", {
    enumerable: !0,
    get: function() {
      return XF4.default
    }
  });
  Object.defineProperty(LC, "v5", {
    enumerable: !0,
    get: function() {
      return VF4.default
    }
  });
  Object.defineProperty(LC, "validate", {
    enumerable: !0,
    get: function() {
      return HF4.default
    }
  });
  Object.defineProperty(LC, "version", {
    enumerable: !0,
    get: function() {
      return KF4.default
    }
  });
  var JF4 = XN(GtA()),
    FF4 = XN(wtA()),
    XF4 = XN(RtA()),
    VF4 = XN(ytA()),
    CF4 = XN(ftA()),
    KF4 = XN(gtA()),
    HF4 = XN(Za()),
    zF4 = XN(Da()),
    wF4 = XN(lj1());

  function XN(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
})
// @from(Start 3384523, End 3386973)
aj1 = z((KI8, utA) => {
  var {
    defineProperty: j71,
    getOwnPropertyDescriptor: EF4,
    getOwnPropertyNames: UF4
  } = Object, NF4 = Object.prototype.hasOwnProperty, Eb = (A, B) => j71(A, "name", {
    value: B,
    configurable: !0
  }), $F4 = (A, B) => {
    for (var Q in B) j71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, qF4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of UF4(B))
        if (!NF4.call(A, G) && G !== Q) j71(A, G, {
          get: () => B[G],
          enumerable: !(I = EF4(B, G)) || I.enumerable
        })
    }
    return A
  }, MF4 = (A) => qF4(j71({}, "__esModule", {
    value: !0
  }), A), mtA = {};
  $F4(mtA, {
    isClockSkewCorrectedError: () => dtA,
    isClockSkewError: () => _F4,
    isRetryableByTrait: () => SF4,
    isServerError: () => yF4,
    isThrottlingError: () => jF4,
    isTransientError: () => nj1
  });
  utA.exports = MF4(mtA);
  var LF4 = ["AuthFailure", "InvalidSignatureException", "RequestExpired", "RequestInTheFuture", "RequestTimeTooSkewed", "SignatureDoesNotMatch"],
    RF4 = ["BandwidthLimitExceeded", "EC2ThrottledException", "LimitExceededException", "PriorRequestNotComplete", "ProvisionedThroughputExceededException", "RequestLimitExceeded", "RequestThrottled", "RequestThrottledException", "SlowDown", "ThrottledException", "Throttling", "ThrottlingException", "TooManyRequestsException", "TransactionInProgressException"],
    OF4 = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"],
    TF4 = [500, 502, 503, 504],
    PF4 = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"],
    SF4 = Eb((A) => A.$retryable !== void 0, "isRetryableByTrait"),
    _F4 = Eb((A) => LF4.includes(A.name), "isClockSkewError"),
    dtA = Eb((A) => A.$metadata?.clockSkewCorrected, "isClockSkewCorrectedError"),
    jF4 = Eb((A) => A.$metadata?.httpStatusCode === 429 || RF4.includes(A.name) || A.$retryable?.throttling == !0, "isThrottlingError"),
    nj1 = Eb((A, B = 0) => dtA(A) || OF4.includes(A.name) || PF4.includes(A?.code || "") || TF4.includes(A.$metadata?.httpStatusCode || 0) || A.cause !== void 0 && B <= 10 && nj1(A.cause, B + 1), "isTransientError"),
    yF4 = Eb((A) => {
      if (A.$metadata?.httpStatusCode !== void 0) {
        let B = A.$metadata.httpStatusCode;
        if (500 <= B && B <= 599 && !nj1(A)) return !0;
        return !1
      }
      return !1
    }, "isServerError")
})
// @from(Start 3386979, End 3395865)
vL = z((HI8, otA) => {
  var {
    defineProperty: y71,
    getOwnPropertyDescriptor: kF4,
    getOwnPropertyNames: xF4
  } = Object, fF4 = Object.prototype.hasOwnProperty, RC = (A, B) => y71(A, "name", {
    value: B,
    configurable: !0
  }), vF4 = (A, B) => {
    for (var Q in B) y71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, bF4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of xF4(B))
        if (!fF4.call(A, G) && G !== Q) y71(A, G, {
          get: () => B[G],
          enumerable: !(I = kF4(B, G)) || I.enumerable
        })
    }
    return A
  }, gF4 = (A) => bF4(y71({}, "__esModule", {
    value: !0
  }), A), ctA = {};
  vF4(ctA, {
    AdaptiveRetryStrategy: () => cF4,
    ConfiguredRetryStrategy: () => lF4,
    DEFAULT_MAX_ATTEMPTS: () => sj1,
    DEFAULT_RETRY_DELAY_BASE: () => Ya,
    DEFAULT_RETRY_MODE: () => hF4,
    DefaultRateLimiter: () => itA,
    INITIAL_RETRY_TOKENS: () => rj1,
    INVOCATION_ID_HEADER: () => dF4,
    MAXIMUM_RETRY_DELAY: () => oj1,
    NO_RETRY_INCREMENT: () => rtA,
    REQUEST_HEADER: () => uF4,
    RETRY_COST: () => atA,
    RETRY_MODES: () => ltA,
    StandardRetryStrategy: () => tj1,
    THROTTLING_RETRY_DELAY_BASE: () => ntA,
    TIMEOUT_RETRY_COST: () => stA
  });
  otA.exports = gF4(ctA);
  var ltA = ((A) => {
      return A.STANDARD = "standard", A.ADAPTIVE = "adaptive", A
    })(ltA || {}),
    sj1 = 3,
    hF4 = "standard",
    mF4 = aj1(),
    itA = class A {
      constructor(B) {
        this.currentCapacity = 0, this.enabled = !1, this.lastMaxRate = 0, this.measuredTxRate = 0, this.requestCount = 0, this.lastTimestamp = 0, this.timeWindow = 0, this.beta = B?.beta ?? 0.7, this.minCapacity = B?.minCapacity ?? 1, this.minFillRate = B?.minFillRate ?? 0.5, this.scaleConstant = B?.scaleConstant ?? 0.4, this.smooth = B?.smooth ?? 0.8;
        let Q = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = Q, this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds()), this.fillRate = this.minFillRate, this.maxCapacity = this.minCapacity
      }
      static {
        RC(this, "DefaultRateLimiter")
      }
      static {
        this.setTimeoutFn = setTimeout
      }
      getCurrentTimeInSeconds() {
        return Date.now() / 1000
      }
      async getSendToken() {
        return this.acquireTokenBucket(1)
      }
      async acquireTokenBucket(B) {
        if (!this.enabled) return;
        if (this.refillTokenBucket(), B > this.currentCapacity) {
          let Q = (B - this.currentCapacity) / this.fillRate * 1000;
          await new Promise((I) => A.setTimeoutFn(I, Q))
        }
        this.currentCapacity = this.currentCapacity - B
      }
      refillTokenBucket() {
        let B = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
          this.lastTimestamp = B;
          return
        }
        let Q = (B - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + Q), this.lastTimestamp = B
      }
      updateClientSendingRate(B) {
        let Q;
        if (this.updateMeasuredRate(), mF4.isThrottlingError(B)) {
          let G = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
          this.lastMaxRate = G, this.calculateTimeWindow(), this.lastThrottleTime = this.getCurrentTimeInSeconds(), Q = this.cubicThrottle(G), this.enableTokenBucket()
        } else this.calculateTimeWindow(), Q = this.cubicSuccess(this.getCurrentTimeInSeconds());
        let I = Math.min(Q, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(I)
      }
      calculateTimeWindow() {
        this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 0.3333333333333333))
      }
      cubicThrottle(B) {
        return this.getPrecise(B * this.beta)
      }
      cubicSuccess(B) {
        return this.getPrecise(this.scaleConstant * Math.pow(B - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate)
      }
      enableTokenBucket() {
        this.enabled = !0
      }
      updateTokenBucketRate(B) {
        this.refillTokenBucket(), this.fillRate = Math.max(B, this.minFillRate), this.maxCapacity = Math.max(B, this.minCapacity), this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity)
      }
      updateMeasuredRate() {
        let B = this.getCurrentTimeInSeconds(),
          Q = Math.floor(B * 2) / 2;
        if (this.requestCount++, Q > this.lastTxRateBucket) {
          let I = this.requestCount / (Q - this.lastTxRateBucket);
          this.measuredTxRate = this.getPrecise(I * this.smooth + this.measuredTxRate * (1 - this.smooth)), this.requestCount = 0, this.lastTxRateBucket = Q
        }
      }
      getPrecise(B) {
        return parseFloat(B.toFixed(8))
      }
    },
    Ya = 100,
    oj1 = 20000,
    ntA = 500,
    rj1 = 500,
    atA = 5,
    stA = 10,
    rtA = 1,
    dF4 = "amz-sdk-invocation-id",
    uF4 = "amz-sdk-request",
    pF4 = RC(() => {
      let A = Ya;
      return {
        computeNextBackoffDelay: RC((I) => {
          return Math.floor(Math.min(oj1, Math.random() * 2 ** I * A))
        }, "computeNextBackoffDelay"),
        setDelayBase: RC((I) => {
          A = I
        }, "setDelayBase")
      }
    }, "getDefaultRetryBackoffStrategy"),
    ptA = RC(({
      retryDelay: A,
      retryCount: B,
      retryCost: Q
    }) => {
      return {
        getRetryCount: RC(() => B, "getRetryCount"),
        getRetryDelay: RC(() => Math.min(oj1, A), "getRetryDelay"),
        getRetryCost: RC(() => Q, "getRetryCost")
      }
    }, "createDefaultRetryToken"),
    tj1 = class {
      constructor(A) {
        this.maxAttempts = A, this.mode = "standard", this.capacity = rj1, this.retryBackoffStrategy = pF4(), this.maxAttemptsProvider = typeof A === "function" ? A : async () => A
      }
      static {
        RC(this, "StandardRetryStrategy")
      }
      async acquireInitialRetryToken(A) {
        return ptA({
          retryDelay: Ya,
          retryCount: 0
        })
      }
      async refreshRetryTokenForRetry(A, B) {
        let Q = await this.getMaxAttempts();
        if (this.shouldRetry(A, B, Q)) {
          let I = B.errorType;
          this.retryBackoffStrategy.setDelayBase(I === "THROTTLING" ? ntA : Ya);
          let G = this.retryBackoffStrategy.computeNextBackoffDelay(A.getRetryCount()),
            Z = B.retryAfterHint ? Math.max(B.retryAfterHint.getTime() - Date.now() || 0, G) : G,
            D = this.getCapacityCost(I);
          return this.capacity -= D, ptA({
            retryDelay: Z,
            retryCount: A.getRetryCount() + 1,
            retryCost: D
          })
        }
        throw new Error("No retry token available")
      }
      recordSuccess(A) {
        this.capacity = Math.max(rj1, this.capacity + (A.getRetryCost() ?? rtA))
      }
      getCapacity() {
        return this.capacity
      }
      async getMaxAttempts() {
        try {
          return await this.maxAttemptsProvider()
        } catch (A) {
          return console.warn(`Max attempts provider could not resolve. Using default of ${sj1}`), sj1
        }
      }
      shouldRetry(A, B, Q) {
        return A.getRetryCount() + 1 < Q && this.capacity >= this.getCapacityCost(B.errorType) && this.isRetryableError(B.errorType)
      }
      getCapacityCost(A) {
        return A === "TRANSIENT" ? stA : atA
      }
      isRetryableError(A) {
        return A === "THROTTLING" || A === "TRANSIENT"
      }
    },
    cF4 = class {
      constructor(A, B) {
        this.maxAttemptsProvider = A, this.mode = "adaptive";
        let {
          rateLimiter: Q
        } = B ?? {};
        this.rateLimiter = Q ?? new itA, this.standardRetryStrategy = new tj1(A)
      }
      static {
        RC(this, "AdaptiveRetryStrategy")
      }
      async acquireInitialRetryToken(A) {
        return await this.rateLimiter.getSendToken(), this.standardRetryStrategy.acquireInitialRetryToken(A)
      }
      async refreshRetryTokenForRetry(A, B) {
        return this.rateLimiter.updateClientSendingRate(B), this.standardRetryStrategy.refreshRetryTokenForRetry(A, B)
      }
      recordSuccess(A) {
        this.rateLimiter.updateClientSendingRate({}), this.standardRetryStrategy.recordSuccess(A)
      }
    },
    lF4 = class extends tj1 {
      static {
        RC(this, "ConfiguredRetryStrategy")
      }
      constructor(A, B = Ya) {
        super(typeof A === "function" ? A : async () => A);
        if (typeof B === "number") this.computeNextBackoffDelay = () => B;
        else this.computeNextBackoffDelay = B
      }
      async refreshRetryTokenForRetry(A, B) {
        let Q = await super.refreshRetryTokenForRetry(A, B);
        return Q.getRetryDelay = () => this.computeNextBackoffDelay(Q.getRetryCount()), Q
      }
    }
})
// @from(Start 3395871, End 3424409)
zeA = z((UI8, HeA) => {
  var {
    defineProperty: f71,
    getOwnPropertyDescriptor: iF4,
    getOwnPropertyNames: nF4
  } = Object, aF4 = Object.prototype.hasOwnProperty, o0 = (A, B) => f71(A, "name", {
    value: B,
    configurable: !0
  }), sF4 = (A, B) => {
    for (var Q in B) f71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, rF4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of nF4(B))
        if (!aF4.call(A, G) && G !== Q) f71(A, G, {
          get: () => B[G],
          enumerable: !(I = iF4(B, G)) || I.enumerable
        })
    }
    return A
  }, oF4 = (A) => rF4(f71({}, "__esModule", {
    value: !0
  }), A), etA = {};
  sF4(etA, {
    Client: () => tF4,
    Command: () => BeA,
    LazyJsonString: () => A_,
    NoOpLogger: () => aX4,
    SENSITIVE_STRING: () => AX4,
    ServiceException: () => fX4,
    _json: () => Zy1,
    collectBody: () => ej1.collectBody,
    convertMap: () => sX4,
    createAggregatedClient: () => BX4,
    dateToUtcString: () => YeA,
    decorateServiceException: () => WeA,
    emitWarningIfUnsupportedVersion: () => hX4,
    expectBoolean: () => IX4,
    expectByte: () => Gy1,
    expectFloat32: () => k71,
    expectInt: () => ZX4,
    expectInt32: () => Qy1,
    expectLong: () => Fa,
    expectNonNull: () => YX4,
    expectNumber: () => Ja,
    expectObject: () => QeA,
    expectShort: () => Iy1,
    expectString: () => WX4,
    expectUnion: () => JX4,
    extendedEncodeURIComponent: () => ej1.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => iX4,
    getDefaultClientConfiguration: () => cX4,
    getDefaultExtensionConfiguration: () => FeA,
    getValueFromTextNode: () => XeA,
    handleFloat: () => VX4,
    isSerializableHeaderValue: () => nX4,
    limitedParseDouble: () => Wy1,
    limitedParseFloat: () => CX4,
    limitedParseFloat32: () => KX4,
    loadConfigsForDefaultMode: () => gX4,
    logger: () => Xa,
    map: () => Fy1,
    parseBoolean: () => QX4,
    parseEpochTimestamp: () => OX4,
    parseRfc3339DateTime: () => UX4,
    parseRfc3339DateTimeWithOffset: () => $X4,
    parseRfc7231DateTime: () => RX4,
    quoteHeader: () => CeA,
    resolveDefaultRuntimeConfig: () => lX4,
    resolvedPath: () => ej1.resolvedPath,
    serializeDateTime: () => BV4,
    serializeFloat: () => AV4,
    splitEvery: () => KeA,
    splitHeader: () => QV4,
    strictParseByte: () => DeA,
    strictParseDouble: () => Yy1,
    strictParseFloat: () => FX4,
    strictParseFloat32: () => IeA,
    strictParseInt: () => HX4,
    strictParseInt32: () => zX4,
    strictParseLong: () => ZeA,
    strictParseShort: () => Ub,
    take: () => rX4,
    throwDefaultError: () => JeA,
    withBaseException: () => vX4
  });
  HeA.exports = oF4(etA);
  var AeA = WN(),
    tF4 = class {
      constructor(A) {
        this.config = A, this.middlewareStack = AeA.constructStack()
      }
      static {
        o0(this, "Client")
      }
      send(A, B, Q) {
        let I = typeof B !== "function" ? B : void 0,
          G = typeof B === "function" ? B : Q,
          Z = I === void 0 && this.config.cacheMiddleware === !0,
          D;
        if (Z) {
          if (!this.handlers) this.handlers = new WeakMap;
          let Y = this.handlers;
          if (Y.has(A.constructor)) D = Y.get(A.constructor);
          else D = A.resolveMiddleware(this.middlewareStack, this.config, I), Y.set(A.constructor, D)
        } else delete this.handlers, D = A.resolveMiddleware(this.middlewareStack, this.config, I);
        if (G) D(A).then((Y) => G(null, Y.output), (Y) => G(Y)).catch(() => {});
        else return D(A).then((Y) => Y.output)
      }
      destroy() {
        this.config?.requestHandler?.destroy?.(), delete this.handlers
      }
    },
    ej1 = vz(),
    By1 = mj1(),
    BeA = class {
      constructor() {
        this.middlewareStack = AeA.constructStack()
      }
      static {
        o0(this, "Command")
      }
      static classBuilder() {
        return new eF4
      }
      resolveMiddlewareWithContext(A, B, Q, {
        middlewareFn: I,
        clientName: G,
        commandName: Z,
        inputFilterSensitiveLog: D,
        outputFilterSensitiveLog: Y,
        smithyContext: W,
        additionalContext: J,
        CommandCtor: F
      }) {
        for (let E of I.bind(this)(F, A, B, Q)) this.middlewareStack.use(E);
        let X = A.concat(this.middlewareStack),
          {
            logger: V
          } = B,
          C = {
            logger: V,
            clientName: G,
            commandName: Z,
            inputFilterSensitiveLog: D,
            outputFilterSensitiveLog: Y,
            [By1.SMITHY_CONTEXT_KEY]: {
              commandInstance: this,
              ...W
            },
            ...J
          },
          {
            requestHandler: K
          } = B;
        return X.resolve((E) => K.handle(E.request, Q || {}), C)
      }
    },
    eF4 = class {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
      }
      static {
        o0(this, "ClassBuilder")
      }
      init(A) {
        this._init = A
      }
      ep(A) {
        return this._ep = A, this
      }
      m(A) {
        return this._middlewareFn = A, this
      }
      s(A, B, Q = {}) {
        return this._smithyContext = {
          service: A,
          operation: B,
          ...Q
        }, this
      }
      c(A = {}) {
        return this._additionalContext = A, this
      }
      n(A, B) {
        return this._clientName = A, this._commandName = B, this
      }
      f(A = (Q) => Q, B = (Q) => Q) {
        return this._inputFilterSensitiveLog = A, this._outputFilterSensitiveLog = B, this
      }
      ser(A) {
        return this._serializer = A, this
      }
      de(A) {
        return this._deserializer = A, this
      }
      build() {
        let A = this,
          B;
        return B = class extends BeA {
          constructor(...[Q]) {
            super();
            this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
          }
          static {
            o0(this, "CommandRef")
          }
          static getEndpointParameterInstructions() {
            return A._ep
          }
          resolveMiddleware(Q, I, G) {
            return this.resolveMiddlewareWithContext(Q, I, G, {
              CommandCtor: B,
              middlewareFn: A._middlewareFn,
              clientName: A._clientName,
              commandName: A._commandName,
              inputFilterSensitiveLog: A._inputFilterSensitiveLog,
              outputFilterSensitiveLog: A._outputFilterSensitiveLog,
              smithyContext: A._smithyContext,
              additionalContext: A._additionalContext
            })
          }
        }
      }
    },
    AX4 = "***SensitiveInformation***",
    BX4 = o0((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = o0(async function(D, Y, W) {
            let J = new I(D);
            if (typeof Y === "function") this.send(J, Y);
            else if (typeof W === "function") {
              if (typeof Y !== "object") throw new Error(`Expected http options but got ${typeof Y}`);
              this.send(J, Y || {}, W)
            } else return this.send(J, Y)
          }, "methodImpl"),
          Z = (Q[0].toLowerCase() + Q.slice(1)).replace(/Command$/, "");
        B.prototype[Z] = G
      }
    }, "createAggregatedClient"),
    QX4 = o0((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    IX4 = o0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) Xa.warn(x71(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") Xa.warn(x71(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    Ja = o0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) Xa.warn(x71(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    GX4 = Math.ceil(340282346638528860000000000000000000000),
    k71 = o0((A) => {
      let B = Ja(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > GX4) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    Fa = o0((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    ZX4 = Fa,
    Qy1 = o0((A) => Dy1(A, 32), "expectInt32"),
    Iy1 = o0((A) => Dy1(A, 16), "expectShort"),
    Gy1 = o0((A) => Dy1(A, 8), "expectByte"),
    Dy1 = o0((A, B) => {
      let Q = Fa(A);
      if (Q !== void 0 && DX4(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    DX4 = o0((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    YX4 = o0((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    QeA = o0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    WX4 = o0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return Xa.warn(x71(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    JX4 = o0((A) => {
      if (A === null || A === void 0) return;
      let B = QeA(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    Yy1 = o0((A) => {
      if (typeof A == "string") return Ja($b(A));
      return Ja(A)
    }, "strictParseDouble"),
    FX4 = Yy1,
    IeA = o0((A) => {
      if (typeof A == "string") return k71($b(A));
      return k71(A)
    }, "strictParseFloat32"),
    XX4 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    $b = o0((A) => {
      let B = A.match(XX4);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    Wy1 = o0((A) => {
      if (typeof A == "string") return GeA(A);
      return Ja(A)
    }, "limitedParseDouble"),
    VX4 = Wy1,
    CX4 = Wy1,
    KX4 = o0((A) => {
      if (typeof A == "string") return GeA(A);
      return k71(A)
    }, "limitedParseFloat32"),
    GeA = o0((A) => {
      switch (A) {
        case "NaN":
          return NaN;
        case "Infinity":
          return 1 / 0;
        case "-Infinity":
          return -1 / 0;
        default:
          throw new Error(`Unable to parse float value: ${A}`)
      }
    }, "parseFloatString"),
    ZeA = o0((A) => {
      if (typeof A === "string") return Fa($b(A));
      return Fa(A)
    }, "strictParseLong"),
    HX4 = ZeA,
    zX4 = o0((A) => {
      if (typeof A === "string") return Qy1($b(A));
      return Qy1(A)
    }, "strictParseInt32"),
    Ub = o0((A) => {
      if (typeof A === "string") return Iy1($b(A));
      return Iy1(A)
    }, "strictParseShort"),
    DeA = o0((A) => {
      if (typeof A === "string") return Gy1($b(A));
      return Gy1(A)
    }, "strictParseByte"),
    x71 = o0((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    Xa = {
      warn: console.warn
    },
    wX4 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Jy1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function YeA(A) {
    let B = A.getUTCFullYear(),
      Q = A.getUTCMonth(),
      I = A.getUTCDay(),
      G = A.getUTCDate(),
      Z = A.getUTCHours(),
      D = A.getUTCMinutes(),
      Y = A.getUTCSeconds(),
      W = G < 10 ? `0${G}` : `${G}`,
      J = Z < 10 ? `0${Z}` : `${Z}`,
      F = D < 10 ? `0${D}` : `${D}`,
      X = Y < 10 ? `0${Y}` : `${Y}`;
    return `${wX4[I]}, ${W} ${Jy1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  o0(YeA, "dateToUtcString");
  var EX4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    UX4 = o0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = EX4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = Ub(Nb(I)), X = mz(G, "month", 1, 12), V = mz(Z, "day", 1, 31);
      return Wa(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    NX4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    $X4 = o0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = NX4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = Ub(Nb(I)), V = mz(G, "month", 1, 12), C = mz(Z, "day", 1, 31), K = Wa(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - xX4(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    qX4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    MX4 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    LX4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    RX4 = o0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = qX4.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Wa(Ub(Nb(Z)), Ay1(G), mz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = MX4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return SX4(Wa(TX4(Z), Ay1(G), mz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = LX4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Wa(Ub(Nb(J)), Ay1(I), mz(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    OX4 = o0((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = Yy1(A);
      else if (typeof A === "object" && A.tag === 1) B = A.value;
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    Wa = o0((A, B, Q, I) => {
      let G = B - 1;
      return jX4(A, G, Q), new Date(Date.UTC(A, G, Q, mz(I.hours, "hour", 0, 23), mz(I.minutes, "minute", 0, 59), mz(I.seconds, "seconds", 0, 60), kX4(I.fractionalMilliseconds)))
    }, "buildDate"),
    TX4 = o0((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + Ub(Nb(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    PX4 = 1576800000000,
    SX4 = o0((A) => {
      if (A.getTime() - new Date().getTime() > PX4) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    Ay1 = o0((A) => {
      let B = Jy1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    _X4 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    jX4 = o0((A, B, Q) => {
      let I = _X4[B];
      if (B === 1 && yX4(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${Jy1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    yX4 = o0((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    mz = o0((A, B, Q, I) => {
      let G = DeA(Nb(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    kX4 = o0((A) => {
      if (A === null || A === void 0) return 0;
      return IeA("0." + A) * 1000
    }, "parseMilliseconds"),
    xX4 = o0((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    Nb = o0((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    fX4 = class A extends Error {
      static {
        o0(this, "ServiceException")
      }
      constructor(B) {
        super(B.message);
        Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = B.name, this.$fault = B.$fault, this.$metadata = B.$metadata
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return A.prototype.isPrototypeOf(Q) || Boolean(Q.$fault) && Boolean(Q.$metadata) && (Q.$fault === "client" || Q.$fault === "server")
      }
      static[Symbol.hasInstance](B) {
        if (!B) return !1;
        let Q = B;
        if (this === A) return A.isInstance(B);
        if (A.isInstance(B)) {
          if (Q.name && this.name) return this.prototype.isPrototypeOf(B) || Q.name === this.name;
          return this.prototype.isPrototypeOf(B)
        }
        return !1
      }
    },
    WeA = o0((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    JeA = o0(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = bX4(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: B?.code || B?.Code || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw WeA(D, B)
    }, "throwDefaultError"),
    vX4 = o0((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        JeA({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    bX4 = o0((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    gX4 = o0((A) => {
      switch (A) {
        case "standard":
          return {
            retryMode: "standard", connectionTimeout: 3100
          };
        case "in-region":
          return {
            retryMode: "standard", connectionTimeout: 1100
          };
        case "cross-region":
          return {
            retryMode: "standard", connectionTimeout: 3100
          };
        case "mobile":
          return {
            retryMode: "standard", connectionTimeout: 30000
          };
        default:
          return {}
      }
    }, "loadConfigsForDefaultMode"),
    ttA = !1,
    hX4 = o0((A) => {
      if (A && !ttA && parseInt(A.substring(1, A.indexOf("."))) < 16) ttA = !0
    }, "emitWarningIfUnsupportedVersion"),
    mX4 = o0((A) => {
      let B = [];
      for (let Q in By1.AlgorithmId) {
        let I = By1.AlgorithmId[Q];
        if (A[I] === void 0) continue;
        B.push({
          algorithmId: () => I,
          checksumConstructor: () => A[I]
        })
      }
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    dX4 = o0((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    uX4 = o0((A) => {
      return {
        setRetryStrategy(B) {
          A.retryStrategy = B
        },
        retryStrategy() {
          return A.retryStrategy
        }
      }
    }, "getRetryConfiguration"),
    pX4 = o0((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    FeA = o0((A) => {
      return Object.assign(mX4(A), uX4(A))
    }, "getDefaultExtensionConfiguration"),
    cX4 = FeA,
    lX4 = o0((A) => {
      return Object.assign(dX4(A), pX4(A))
    }, "resolveDefaultRuntimeConfig"),
    iX4 = o0((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    XeA = o0((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = XeA(A[Q]);
      return A
    }, "getValueFromTextNode"),
    nX4 = o0((A) => {
      return A != null
    }, "isSerializableHeaderValue"),
    A_ = o0(function A(B) {
      return Object.assign(new String(B), {
        deserializeJSON() {
          return JSON.parse(String(B))
        },
        toString() {
          return String(B)
        },
        toJSON() {
          return String(B)
        }
      })
    }, "LazyJsonString");
  A_.from = (A) => {
    if (A && typeof A === "object" && (A instanceof A_ || ("deserializeJSON" in A))) return A;
    else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return A_(String(A));
    return A_(JSON.stringify(A))
  };
  A_.fromObject = A_.from;
  var aX4 = class {
    static {
      o0(this, "NoOpLogger")
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };

  function Fy1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, oX4(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      VeA(I, null, Z, D)
    }
    return I
  }
  o0(Fy1, "map");
  var sX4 = o0((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    rX4 = o0((A, B) => {
      let Q = {};
      for (let I in B) VeA(Q, A, B, I);
      return Q
    }, "take"),
    oX4 = o0((A, B, Q) => {
      return Fy1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    VeA = o0((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = tX4, W = eX4, J = I] = D;
        if (typeof Y === "function" && Y(B[J]) || typeof Y !== "function" && !!Y) A[I] = W(B[J]);
        return
      }
      let [G, Z] = Q[I];
      if (typeof Z === "function") {
        let D, Y = G === void 0 && (D = Z()) != null,
          W = typeof G === "function" && !!G(void 0) || typeof G !== "function" && !!G;
        if (Y) A[I] = D;
        else if (W) A[I] = Z()
      } else {
        let D = G === void 0 && Z != null,
          Y = typeof G === "function" && !!G(Z) || typeof G !== "function" && !!G;
        if (D || Y) A[I] = Z
      }
    }, "applyInstruction"),
    tX4 = o0((A) => A != null, "nonNullish"),
    eX4 = o0((A) => A, "pass");

  function CeA(A) {
    if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
    return A
  }
  o0(CeA, "quoteHeader");
  var AV4 = o0((A) => {
      if (A !== A) return "NaN";
      switch (A) {
        case 1 / 0:
          return "Infinity";
        case -1 / 0:
          return "-Infinity";
        default:
          return A
      }
    }, "serializeFloat"),
    BV4 = o0((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
    Zy1 = o0((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(Zy1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = Zy1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function KeA(A, B, Q) {
    if (Q <= 0 || !Number.isInteger(Q)) throw new Error("Invalid number of delimiters (" + Q + ") for splitEvery.");
    let I = A.split(B);
    if (Q === 1) return I;
    let G = [],
      Z = "";
    for (let D = 0; D < I.length; D++) {
      if (Z === "") Z = I[D];
      else Z += B + I[D];
      if ((D + 1) % Q === 0) G.push(Z), Z = ""
    }
    if (Z !== "") G.push(Z);
    return G
  }
  o0(KeA, "splitEvery");
  var QV4 = o0((A) => {
    let B = A.length,
      Q = [],
      I = !1,
      G = void 0,
      Z = 0;
    for (let D = 0; D < B; ++D) {
      let Y = A[D];
      switch (Y) {
        case '"':
          if (G !== "\\") I = !I;
          break;
        case ",":
          if (!I) Q.push(A.slice(Z, D)), Z = D + 1;
          break;
        default:
      }
      G = Y
    }
    return Q.push(A.slice(Z)), Q.map((D) => {
      D = D.trim();
      let Y = D.length;
      if (Y < 2) return D;
      if (D[0] === '"' && D[Y - 1] === '"') D = D.slice(1, Y - 1);
      return D.replace(/\\"/g, '"')
    })
  }, "splitHeader")
})
// @from(Start 3424415, End 3424799)
UeA = z((weA) => {
  Object.defineProperty(weA, "__esModule", {
    value: !0
  });
  weA.isStreamingPayload = void 0;
  var IV4 = Z1("stream"),
    GV4 = (A) => (A === null || A === void 0 ? void 0 : A.body) instanceof IV4.Readable || typeof ReadableStream !== "undefined" && (A === null || A === void 0 ? void 0 : A.body) instanceof ReadableStream;
  weA.isStreamingPayload = GV4
})
// @from(Start 3424805, End 3435450)
KJ = z((OI8, xeA) => {
  var {
    defineProperty: v71,
    getOwnPropertyDescriptor: ZV4,
    getOwnPropertyNames: DV4
  } = Object, YV4 = Object.prototype.hasOwnProperty, D7 = (A, B) => v71(A, "name", {
    value: B,
    configurable: !0
  }), WV4 = (A, B) => {
    for (var Q in B) v71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, JV4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of DV4(B))
        if (!YV4.call(A, G) && G !== Q) v71(A, G, {
          get: () => B[G],
          enumerable: !(I = ZV4(B, G)) || I.enumerable
        })
    }
    return A
  }, FV4 = (A) => JV4(v71({}, "__esModule", {
    value: !0
  }), A), $eA = {};
  WV4($eA, {
    AdaptiveRetryStrategy: () => CV4,
    CONFIG_MAX_ATTEMPTS: () => Vy1,
    CONFIG_RETRY_MODE: () => PeA,
    ENV_MAX_ATTEMPTS: () => Xy1,
    ENV_RETRY_MODE: () => TeA,
    NODE_MAX_ATTEMPT_CONFIG_OPTIONS: () => KV4,
    NODE_RETRY_MODE_CONFIG_OPTIONS: () => zV4,
    StandardRetryStrategy: () => OeA,
    defaultDelayDecider: () => MeA,
    defaultRetryDecider: () => LeA,
    getOmitRetryHeadersPlugin: () => wV4,
    getRetryAfterHint: () => keA,
    getRetryPlugin: () => MV4,
    omitRetryHeadersMiddleware: () => SeA,
    omitRetryHeadersMiddlewareOptions: () => _eA,
    resolveRetryConfig: () => HV4,
    retryMiddleware: () => jeA,
    retryMiddlewareOptions: () => yeA
  });
  xeA.exports = FV4($eA);
  var qb = loA(),
    qeA = htA(),
    $3 = vL(),
    XV4 = D7((A, B) => {
      let Q = A,
        I = B?.noRetryIncrement ?? $3.NO_RETRY_INCREMENT,
        G = B?.retryCost ?? $3.RETRY_COST,
        Z = B?.timeoutRetryCost ?? $3.TIMEOUT_RETRY_COST,
        D = A,
        Y = D7((X) => X.name === "TimeoutError" ? Z : G, "getCapacityAmount"),
        W = D7((X) => Y(X) <= D, "hasRetryTokens");
      return Object.freeze({
        hasRetryTokens: W,
        retrieveRetryTokens: D7((X) => {
          if (!W(X)) throw new Error("No retry token available");
          let V = Y(X);
          return D -= V, V
        }, "retrieveRetryTokens"),
        releaseRetryTokens: D7((X) => {
          D += X ?? I, D = Math.min(D, Q)
        }, "releaseRetryTokens")
      })
    }, "getDefaultRetryQuota"),
    MeA = D7((A, B) => Math.floor(Math.min($3.MAXIMUM_RETRY_DELAY, Math.random() * 2 ** B * A)), "defaultDelayDecider"),
    bL = aj1(),
    LeA = D7((A) => {
      if (!A) return !1;
      return bL.isRetryableByTrait(A) || bL.isClockSkewError(A) || bL.isThrottlingError(A) || bL.isTransientError(A)
    }, "defaultRetryDecider"),
    ReA = D7((A) => {
      if (A instanceof Error) return A;
      if (A instanceof Object) return Object.assign(new Error, A);
      if (typeof A === "string") return new Error(A);
      return new Error(`AWS SDK error wrapper for ${A}`)
    }, "asSdkError"),
    OeA = class {
      constructor(A, B) {
        this.maxAttemptsProvider = A, this.mode = $3.RETRY_MODES.STANDARD, this.retryDecider = B?.retryDecider ?? LeA, this.delayDecider = B?.delayDecider ?? MeA, this.retryQuota = B?.retryQuota ?? XV4($3.INITIAL_RETRY_TOKENS)
      }
      static {
        D7(this, "StandardRetryStrategy")
      }
      shouldRetry(A, B, Q) {
        return B < Q && this.retryDecider(A) && this.retryQuota.hasRetryTokens(A)
      }
      async getMaxAttempts() {
        let A;
        try {
          A = await this.maxAttemptsProvider()
        } catch (B) {
          A = $3.DEFAULT_MAX_ATTEMPTS
        }
        return A
      }
      async retry(A, B, Q) {
        let I, G = 0,
          Z = 0,
          D = await this.getMaxAttempts(),
          {
            request: Y
          } = B;
        if (qb.HttpRequest.isInstance(Y)) Y.headers[$3.INVOCATION_ID_HEADER] = qeA.v4();
        while (!0) try {
          if (qb.HttpRequest.isInstance(Y)) Y.headers[$3.REQUEST_HEADER] = `attempt=${G+1}; max=${D}`;
          if (Q?.beforeRequest) await Q.beforeRequest();
          let {
            response: W,
            output: J
          } = await A(B);
          if (Q?.afterRequest) Q.afterRequest(W);
          return this.retryQuota.releaseRetryTokens(I), J.$metadata.attempts = G + 1, J.$metadata.totalRetryDelay = Z, {
            response: W,
            output: J
          }
        } catch (W) {
          let J = ReA(W);
          if (G++, this.shouldRetry(J, G, D)) {
            I = this.retryQuota.retrieveRetryTokens(J);
            let F = this.delayDecider(bL.isThrottlingError(J) ? $3.THROTTLING_RETRY_DELAY_BASE : $3.DEFAULT_RETRY_DELAY_BASE, G),
              X = VV4(J.$response),
              V = Math.max(X || 0, F);
            Z += V, await new Promise((C) => setTimeout(C, V));
            continue
          }
          if (!J.$metadata) J.$metadata = {};
          throw J.$metadata.attempts = G, J.$metadata.totalRetryDelay = Z, J
        }
      }
    },
    VV4 = D7((A) => {
      if (!qb.HttpResponse.isInstance(A)) return;
      let B = Object.keys(A.headers).find((Z) => Z.toLowerCase() === "retry-after");
      if (!B) return;
      let Q = A.headers[B],
        I = Number(Q);
      if (!Number.isNaN(I)) return I * 1000;
      return new Date(Q).getTime() - Date.now()
    }, "getDelayFromRetryAfterHeader"),
    CV4 = class extends OeA {
      static {
        D7(this, "AdaptiveRetryStrategy")
      }
      constructor(A, B) {
        let {
          rateLimiter: Q,
          ...I
        } = B ?? {};
        super(A, I);
        this.rateLimiter = Q ?? new $3.DefaultRateLimiter, this.mode = $3.RETRY_MODES.ADAPTIVE
      }
      async retry(A, B) {
        return super.retry(A, B, {
          beforeRequest: async () => {
            return this.rateLimiter.getSendToken()
          },
          afterRequest: (Q) => {
            this.rateLimiter.updateClientSendingRate(Q)
          }
        })
      }
    },
    NeA = ZX(),
    Xy1 = "AWS_MAX_ATTEMPTS",
    Vy1 = "max_attempts",
    KV4 = {
      environmentVariableSelector: (A) => {
        let B = A[Xy1];
        if (!B) return;
        let Q = parseInt(B);
        if (Number.isNaN(Q)) throw new Error(`Environment variable ${Xy1} mast be a number, got "${B}"`);
        return Q
      },
      configFileSelector: (A) => {
        let B = A[Vy1];
        if (!B) return;
        let Q = parseInt(B);
        if (Number.isNaN(Q)) throw new Error(`Shared config file entry ${Vy1} mast be a number, got "${B}"`);
        return Q
      },
      default: $3.DEFAULT_MAX_ATTEMPTS
    },
    HV4 = D7((A) => {
      let {
        retryStrategy: B,
        retryMode: Q,
        maxAttempts: I
      } = A, G = NeA.normalizeProvider(I ?? $3.DEFAULT_MAX_ATTEMPTS);
      return Object.assign(A, {
        maxAttempts: G,
        retryStrategy: async () => {
          if (B) return B;
          if (await NeA.normalizeProvider(Q)() === $3.RETRY_MODES.ADAPTIVE) return new $3.AdaptiveRetryStrategy(G);
          return new $3.StandardRetryStrategy(G)
        }
      })
    }, "resolveRetryConfig"),
    TeA = "AWS_RETRY_MODE",
    PeA = "retry_mode",
    zV4 = {
      environmentVariableSelector: (A) => A[TeA],
      configFileSelector: (A) => A[PeA],
      default: $3.DEFAULT_RETRY_MODE
    },
    SeA = D7(() => (A) => async (B) => {
      let {
        request: Q
      } = B;
      if (qb.HttpRequest.isInstance(Q)) delete Q.headers[$3.INVOCATION_ID_HEADER], delete Q.headers[$3.REQUEST_HEADER];
      return A(B)
    }, "omitRetryHeadersMiddleware"),
    _eA = {
      name: "omitRetryHeadersMiddleware",
      tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
      relation: "before",
      toMiddleware: "awsAuthMiddleware",
      override: !0
    },
    wV4 = D7((A) => ({
      applyToStack: (B) => {
        B.addRelativeTo(SeA(), _eA)
      }
    }), "getOmitRetryHeadersPlugin"),
    EV4 = zeA(),
    UV4 = UeA(),
    jeA = D7((A) => (B, Q) => async (I) => {
      let G = await A.retryStrategy(),
        Z = await A.maxAttempts();
      if (NV4(G)) {
        G = G;
        let D = await G.acquireInitialRetryToken(Q.partition_id),
          Y = new Error,
          W = 0,
          J = 0,
          {
            request: F
          } = I,
          X = qb.HttpRequest.isInstance(F);
        if (X) F.headers[$3.INVOCATION_ID_HEADER] = qeA.v4();
        while (!0) try {
          if (X) F.headers[$3.REQUEST_HEADER] = `attempt=${W+1}; max=${Z}`;
          let {
            response: V,
            output: C
          } = await B(I);
          return G.recordSuccess(D), C.$metadata.attempts = W + 1, C.$metadata.totalRetryDelay = J, {
            response: V,
            output: C
          }
        } catch (V) {
          let C = $V4(V);
          if (Y = ReA(V), X && UV4.isStreamingPayload(F)) throw (Q.logger instanceof EV4.NoOpLogger ? console : Q.logger)?.warn("An error was encountered in a non-retryable streaming request."), Y;
          try {
            D = await G.refreshRetryTokenForRetry(D, C)
          } catch (E) {
            if (!Y.$metadata) Y.$metadata = {};
            throw Y.$metadata.attempts = W + 1, Y.$metadata.totalRetryDelay = J, Y
          }
          W = D.getRetryCount();
          let K = D.getRetryDelay();
          J += K, await new Promise((E) => setTimeout(E, K))
        }
      } else {
        if (G = G, G?.mode) Q.userAgent = [...Q.userAgent || [],
          ["cfg/retry-mode", G.mode]
        ];
        return G.retry(B, I)
      }
    }, "retryMiddleware"),
    NV4 = D7((A) => typeof A.acquireInitialRetryToken !== "undefined" && typeof A.refreshRetryTokenForRetry !== "undefined" && typeof A.recordSuccess !== "undefined", "isRetryStrategyV2"),
    $V4 = D7((A) => {
      let B = {
          error: A,
          errorType: qV4(A)
        },
        Q = keA(A.$response);
      if (Q) B.retryAfterHint = Q;
      return B
    }, "getRetryErrorInfo"),
    qV4 = D7((A) => {
      if (bL.isThrottlingError(A)) return "THROTTLING";
      if (bL.isTransientError(A)) return "TRANSIENT";
      if (bL.isServerError(A)) return "SERVER_ERROR";
      return "CLIENT_ERROR"
    }, "getRetryErrorType"),
    yeA = {
      name: "retryMiddleware",
      tags: ["RETRY"],
      step: "finalizeRequest",
      priority: "high",
      override: !0
    },
    MV4 = D7((A) => ({
      applyToStack: (B) => {
        B.add(jeA(A), yeA)
      }
    }), "getRetryPlugin"),
    keA = D7((A) => {
      if (!qb.HttpResponse.isInstance(A)) return;
      let B = Object.keys(A.headers).find((Z) => Z.toLowerCase() === "retry-after");
      if (!B) return;
      let Q = A.headers[B],
        I = Number(Q);
      if (!Number.isNaN(I)) return new Date(I * 1000);
      return new Date(Q)
    }, "getRetryAfterHint")
})
// @from(Start 3435456, End 3436755)
Ky1 = z((feA) => {
  Object.defineProperty(feA, "__esModule", {
    value: !0
  });
  feA.resolveHttpAuthSchemeConfig = feA.defaultBedrockHttpAuthSchemeProvider = feA.defaultBedrockHttpAuthSchemeParametersProvider = void 0;
  var LV4 = IB(),
    Cy1 = ZX(),
    RV4 = async (A, B, Q) => {
      return {
        operation: Cy1.getSmithyContext(B).operation,
        region: await Cy1.normalizeProvider(A.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
        })()
      }
    };
  feA.defaultBedrockHttpAuthSchemeParametersProvider = RV4;

  function OV4(A) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "bedrock",
        region: A.region
      },
      propertiesExtractor: (B, Q) => ({
        signingProperties: {
          config: B,
          context: Q
        }
      })
    }
  }
  var TV4 = (A) => {
    let B = [];
    switch (A.operation) {
      default:
        B.push(OV4(A))
    }
    return B
  };
  feA.defaultBedrockHttpAuthSchemeProvider = TV4;
  var PV4 = (A) => {
    let B = LV4.resolveAwsSdkSigV4Config(A);
    return Object.assign(B, {
      authSchemePreference: Cy1.normalizeProvider(A.authSchemePreference ?? [])
    })
  };
  feA.resolveHttpAuthSchemeConfig = PV4
})
// @from(Start 3436761, End 3454081)
X10 = z((_I8, h71) => {
  var beA, geA, heA, meA, deA, ueA, peA, ceA, leA, ieA, neA, aeA, seA, b71, Hy1, reA, oeA, teA, Mb, eeA, A10, B10, Q10, I10, G10, Z10, D10, Y10, g71, W10, J10, F10;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof h71 === "object" && typeof _I8 === "object") A(Q(B, Q(_I8)));
    else A(Q(B));

    function Q(I, G) {
      if (I !== B)
        if (typeof Object.create === "function") Object.defineProperty(I, "__esModule", {
          value: !0
        });
        else I.__esModule = !0;
      return function(Z, D) {
        return I[Z] = G ? G(Z, D) : D
      }
    }
  })(function(A) {
    var B = Object.setPrototypeOf || {
      __proto__: []
    }
    instanceof Array && function(Z, D) {
      Z.__proto__ = D
    } || function(Z, D) {
      for (var Y in D)
        if (Object.prototype.hasOwnProperty.call(D, Y)) Z[Y] = D[Y]
    };
    beA = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, geA = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, heA = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, meA = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, deA = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, ueA = function(Z, D, Y, W, J, F) {
      function X(_) {
        if (_ !== void 0 && typeof _ !== "function") throw new TypeError("Function expected");
        return _
      }
      var V = W.kind,
        C = V === "getter" ? "get" : V === "setter" ? "set" : "value",
        K = !D && Z ? W.static ? Z : Z.prototype : null,
        E = D || (K ? Object.getOwnPropertyDescriptor(K, W.name) : {}),
        N, q = !1;
      for (var O = Y.length - 1; O >= 0; O--) {
        var R = {};
        for (var T in W) R[T] = T === "access" ? {} : W[T];
        for (var T in W.access) R.access[T] = W.access[T];
        R.addInitializer = function(_) {
          if (q) throw new TypeError("Cannot add initializers after decoration has completed");
          F.push(X(_ || null))
        };
        var L = Y[O](V === "accessor" ? {
          get: E.get,
          set: E.set
        } : E[C], R);
        if (V === "accessor") {
          if (L === void 0) continue;
          if (L === null || typeof L !== "object") throw new TypeError("Object expected");
          if (N = X(L.get)) E.get = N;
          if (N = X(L.set)) E.set = N;
          if (N = X(L.init)) J.unshift(N)
        } else if (N = X(L))
          if (V === "field") J.unshift(N);
          else E[C] = N
      }
      if (K) Object.defineProperty(K, W.name, E);
      q = !0
    }, peA = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, ceA = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, leA = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, ieA = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, neA = function(Z, D, Y, W) {
      function J(F) {
        return F instanceof Y ? F : new Y(function(X) {
          X(F)
        })
      }
      return new(Y || (Y = Promise))(function(F, X) {
        function V(E) {
          try {
            K(W.next(E))
          } catch (N) {
            X(N)
          }
        }

        function C(E) {
          try {
            K(W.throw(E))
          } catch (N) {
            X(N)
          }
        }

        function K(E) {
          E.done ? F(E.value) : J(E.value).then(V, C)
        }
        K((W = W.apply(Z, D || [])).next())
      })
    }, aeA = function(Z, D) {
      var Y = {
          label: 0,
          sent: function() {
            if (F[0] & 1) throw F[1];
            return F[1]
          },
          trys: [],
          ops: []
        },
        W, J, F, X = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return X.next = V(0), X.throw = V(1), X.return = V(2), typeof Symbol === "function" && (X[Symbol.iterator] = function() {
        return this
      }), X;

      function V(K) {
        return function(E) {
          return C([K, E])
        }
      }

      function C(K) {
        if (W) throw new TypeError("Generator is already executing.");
        while (X && (X = 0, K[0] && (Y = 0)), Y) try {
          if (W = 1, J && (F = K[0] & 2 ? J.return : K[0] ? J.throw || ((F = J.return) && F.call(J), 0) : J.next) && !(F = F.call(J, K[1])).done) return F;
          if (J = 0, F) K = [K[0] & 2, F.value];
          switch (K[0]) {
            case 0:
            case 1:
              F = K;
              break;
            case 4:
              return Y.label++, {
                value: K[1],
                done: !1
              };
            case 5:
              Y.label++, J = K[1], K = [0];
              continue;
            case 7:
              K = Y.ops.pop(), Y.trys.pop();
              continue;
            default:
              if ((F = Y.trys, !(F = F.length > 0 && F[F.length - 1])) && (K[0] === 6 || K[0] === 2)) {
                Y = 0;
                continue
              }
              if (K[0] === 3 && (!F || K[1] > F[0] && K[1] < F[3])) {
                Y.label = K[1];
                break
              }
              if (K[0] === 6 && Y.label < F[1]) {
                Y.label = F[1], F = K;
                break
              }
              if (F && Y.label < F[2]) {
                Y.label = F[2], Y.ops.push(K);
                break
              }
              if (F[2]) Y.ops.pop();
              Y.trys.pop();
              continue
          }
          K = D.call(Z, Y)
        } catch (E) {
          K = [6, E], J = 0
        } finally {
          W = F = 0
        }
        if (K[0] & 5) throw K[1];
        return {
          value: K[0] ? K[1] : void 0,
          done: !0
        }
      }
    }, seA = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) g71(D, Z, Y)
    }, g71 = Object.create ? function(Z, D, Y, W) {
      if (W === void 0) W = Y;
      var J = Object.getOwnPropertyDescriptor(D, Y);
      if (!J || ("get" in J ? !D.__esModule : J.writable || J.configurable)) J = {
        enumerable: !0,
        get: function() {
          return D[Y]
        }
      };
      Object.defineProperty(Z, W, J)
    } : function(Z, D, Y, W) {
      if (W === void 0) W = Y;
      Z[W] = D[Y]
    }, b71 = function(Z) {
      var D = typeof Symbol === "function" && Symbol.iterator,
        Y = D && Z[D],
        W = 0;
      if (Y) return Y.call(Z);
      if (Z && typeof Z.length === "number") return {
        next: function() {
          if (Z && W >= Z.length) Z = void 0;
          return {
            value: Z && Z[W++],
            done: !Z
          }
        }
      };
      throw new TypeError(D ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, Hy1 = function(Z, D) {
      var Y = typeof Symbol === "function" && Z[Symbol.iterator];
      if (!Y) return Z;
      var W = Y.call(Z),
        J, F = [],
        X;
      try {
        while ((D === void 0 || D-- > 0) && !(J = W.next()).done) F.push(J.value)
      } catch (V) {
        X = {
          error: V
        }
      } finally {
        try {
          if (J && !J.done && (Y = W.return)) Y.call(W)
        } finally {
          if (X) throw X.error
        }
      }
      return F
    }, reA = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat(Hy1(arguments[D]));
      return Z
    }, oeA = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, teA = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, Mb = function(Z) {
      return this instanceof Mb ? (this.v = Z, this) : new Mb(Z)
    }, eeA = function(Z, D, Y) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var W = Y.apply(Z, D || []),
        J, F = [];
      return J = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), V("next"), V("throw"), V("return", X), J[Symbol.asyncIterator] = function() {
        return this
      }, J;

      function X(O) {
        return function(R) {
          return Promise.resolve(R).then(O, N)
        }
      }

      function V(O, R) {
        if (W[O]) {
          if (J[O] = function(T) {
              return new Promise(function(L, _) {
                F.push([O, T, L, _]) > 1 || C(O, T)
              })
            }, R) J[O] = R(J[O])
        }
      }

      function C(O, R) {
        try {
          K(W[O](R))
        } catch (T) {
          q(F[0][3], T)
        }
      }

      function K(O) {
        O.value instanceof Mb ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
      }

      function E(O) {
        C("next", O)
      }

      function N(O) {
        C("throw", O)
      }

      function q(O, R) {
        if (O(R), F.shift(), F.length) C(F[0][0], F[0][1])
      }
    }, A10 = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: Mb(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, B10 = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof b71 === "function" ? b71(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
        return this
      }, Y);

      function W(F) {
        Y[F] = Z[F] && function(X) {
          return new Promise(function(V, C) {
            X = Z[F](X), J(V, C, X.done, X.value)
          })
        }
      }

      function J(F, X, V, C) {
        Promise.resolve(C).then(function(K) {
          F({
            value: K,
            done: V
          })
        }, X)
      }
    }, Q10 = function(Z, D) {
      if (Object.defineProperty) Object.defineProperty(Z, "raw", {
        value: D
      });
      else Z.raw = D;
      return Z
    };
    var Q = Object.create ? function(Z, D) {
        Object.defineProperty(Z, "default", {
          enumerable: !0,
          value: D
        })
      } : function(Z, D) {
        Z.default = D
      },
      I = function(Z) {
        return I = Object.getOwnPropertyNames || function(D) {
          var Y = [];
          for (var W in D)
            if (Object.prototype.hasOwnProperty.call(D, W)) Y[Y.length] = W;
          return Y
        }, I(Z)
      };
    I10 = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") g71(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, G10 = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, Z10 = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, D10 = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, Y10 = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, W10 = function(Z, D, Y) {
      if (D !== null && D !== void 0) {
        if (typeof D !== "object" && typeof D !== "function") throw new TypeError("Object expected.");
        var W, J;
        if (Y) {
          if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
          W = D[Symbol.asyncDispose]
        }
        if (W === void 0) {
          if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
          if (W = D[Symbol.dispose], Y) J = W
        }
        if (typeof W !== "function") throw new TypeError("Object not disposable.");
        if (J) W = function() {
          try {
            J.call(this)
          } catch (F) {
            return Promise.reject(F)
          }
        };
        Z.stack.push({
          value: D,
          dispose: W,
          async: Y
        })
      } else if (Y) Z.stack.push({
        async: !0
      });
      return D
    };
    var G = typeof SuppressedError === "function" ? SuppressedError : function(Z, D, Y) {
      var W = new Error(Y);
      return W.name = "SuppressedError", W.error = Z, W.suppressed = D, W
    };
    J10 = function(Z) {
      function D(F) {
        Z.error = Z.hasError ? new G(F, Z.error, "An error was suppressed during disposal.") : F, Z.hasError = !0
      }
      var Y, W = 0;

      function J() {
        while (Y = Z.stack.pop()) try {
          if (!Y.async && W === 1) return W = 0, Z.stack.push(Y), Promise.resolve().then(J);
          if (Y.dispose) {
            var F = Y.dispose.call(Y.value);
            if (Y.async) return W |= 2, Promise.resolve(F).then(J, function(X) {
              return D(X), J()
            })
          } else W |= 1
        } catch (X) {
          D(X)
        }
        if (W === 1) return Z.hasError ? Promise.reject(Z.error) : Promise.resolve();
        if (Z.hasError) throw Z.error
      }
      return J()
    }, F10 = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", beA), A("__assign", geA), A("__rest", heA), A("__decorate", meA), A("__param", deA), A("__esDecorate", ueA), A("__runInitializers", peA), A("__propKey", ceA), A("__setFunctionName", leA), A("__metadata", ieA), A("__awaiter", neA), A("__generator", aeA), A("__exportStar", seA), A("__createBinding", g71), A("__values", b71), A("__read", Hy1), A("__spread", reA), A("__spreadArrays", oeA), A("__spreadArray", teA), A("__await", Mb), A("__asyncGenerator", eeA), A("__asyncDelegator", A10), A("__asyncValues", B10), A("__makeTemplateObject", Q10), A("__importStar", I10), A("__importDefault", G10), A("__classPrivateFieldGet", Z10), A("__classPrivateFieldSet", D10), A("__classPrivateFieldIn", Y10), A("__addDisposableResource", W10), A("__disposeResources", J10), A("__rewriteRelativeImportExtension", F10)
  })
})
// @from(Start 3454087, End 3457802)
V10 = z((jI8, jV4) => {
  jV4.exports = {
    name: "@aws-sdk/client-bedrock",
    description: "AWS SDK for JavaScript Bedrock Client for Node.js, Browser and React Native",
    version: "3.797.0",
    scripts: {
      build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
      "build:cjs": "node ../../scripts/compilation/inline client-bedrock",
      "build:es": "tsc -p tsconfig.es.json",
      "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
      "build:types": "tsc -p tsconfig.types.json",
      "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
      clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
      "extract:docs": "api-extractor run --local",
      "generate:client": "node ../../scripts/generate-clients/single-service --solo bedrock"
    },
    main: "./dist-cjs/index.js",
    types: "./dist-types/index.d.ts",
    module: "./dist-es/index.js",
    sideEffects: !1,
    dependencies: {
      "@aws-crypto/sha256-browser": "5.2.0",
      "@aws-crypto/sha256-js": "5.2.0",
      "@aws-sdk/core": "3.796.0",
      "@aws-sdk/credential-provider-node": "3.797.0",
      "@aws-sdk/middleware-host-header": "3.775.0",
      "@aws-sdk/middleware-logger": "3.775.0",
      "@aws-sdk/middleware-recursion-detection": "3.775.0",
      "@aws-sdk/middleware-user-agent": "3.796.0",
      "@aws-sdk/region-config-resolver": "3.775.0",
      "@aws-sdk/types": "3.775.0",
      "@aws-sdk/util-endpoints": "3.787.0",
      "@aws-sdk/util-user-agent-browser": "3.775.0",
      "@aws-sdk/util-user-agent-node": "3.796.0",
      "@smithy/config-resolver": "^4.1.0",
      "@smithy/core": "^3.2.0",
      "@smithy/fetch-http-handler": "^5.0.2",
      "@smithy/hash-node": "^4.0.2",
      "@smithy/invalid-dependency": "^4.0.2",
      "@smithy/middleware-content-length": "^4.0.2",
      "@smithy/middleware-endpoint": "^4.1.0",
      "@smithy/middleware-retry": "^4.1.0",
      "@smithy/middleware-serde": "^4.0.3",
      "@smithy/middleware-stack": "^4.0.2",
      "@smithy/node-config-provider": "^4.0.2",
      "@smithy/node-http-handler": "^4.0.4",
      "@smithy/protocol-http": "^5.1.0",
      "@smithy/smithy-client": "^4.2.0",
      "@smithy/types": "^4.2.0",
      "@smithy/url-parser": "^4.0.2",
      "@smithy/util-base64": "^4.0.0",
      "@smithy/util-body-length-browser": "^4.0.0",
      "@smithy/util-body-length-node": "^4.0.0",
      "@smithy/util-defaults-mode-browser": "^4.0.8",
      "@smithy/util-defaults-mode-node": "^4.0.8",
      "@smithy/util-endpoints": "^3.0.2",
      "@smithy/util-middleware": "^4.0.2",
      "@smithy/util-retry": "^4.0.2",
      "@smithy/util-utf8": "^4.0.0",
      "@types/uuid": "^9.0.1",
      tslib: "^2.6.2",
      uuid: "^9.0.1"
    },
    devDependencies: {
      "@tsconfig/node18": "18.2.4",
      "@types/node": "^18.19.69",
      concurrently: "7.0.0",
      "downlevel-dts": "0.10.1",
      rimraf: "3.0.2",
      typescript: "~5.2.2"
    },
    engines: {
      node: ">=18.0.0"
    },
    typesVersions: {
      "<4.0": {
        "dist-types/*": ["dist-types/ts3.4/*"]
      }
    },
    files: ["dist-*/**"],
    author: {
      name: "AWS SDK for JavaScript Team",
      url: "https://aws.amazon.com/javascript/"
    },
    license: "Apache-2.0",
    browser: {
      "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
    },
    "react-native": {
      "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
    },
    homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-bedrock",
    repository: {
      type: "git",
      url: "https://github.com/aws/aws-sdk-js-v3.git",
      directory: "clients/client-bedrock"
    }
  }
})
// @from(Start 3457808, End 3459876)
d71 = z((yI8, N10) => {
  var {
    defineProperty: m71,
    getOwnPropertyDescriptor: yV4,
    getOwnPropertyNames: kV4
  } = Object, xV4 = Object.prototype.hasOwnProperty, fV4 = (A, B) => m71(A, "name", {
    value: B,
    configurable: !0
  }), vV4 = (A, B) => {
    for (var Q in B) m71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, bV4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of kV4(B))
        if (!xV4.call(A, G) && G !== Q) m71(A, G, {
          get: () => B[G],
          enumerable: !(I = yV4(B, G)) || I.enumerable
        })
    }
    return A
  }, gV4 = (A) => bV4(m71({}, "__esModule", {
    value: !0
  }), A), C10 = {};
  vV4(C10, {
    ENV_ACCOUNT_ID: () => U10,
    ENV_CREDENTIAL_SCOPE: () => E10,
    ENV_EXPIRATION: () => w10,
    ENV_KEY: () => K10,
    ENV_SECRET: () => H10,
    ENV_SESSION: () => z10,
    fromEnv: () => dV4
  });
  N10.exports = gV4(C10);
  var hV4 = NC(),
    mV4 = $I(),
    K10 = "AWS_ACCESS_KEY_ID",
    H10 = "AWS_SECRET_ACCESS_KEY",
    z10 = "AWS_SESSION_TOKEN",
    w10 = "AWS_CREDENTIAL_EXPIRATION",
    E10 = "AWS_CREDENTIAL_SCOPE",
    U10 = "AWS_ACCOUNT_ID",
    dV4 = fV4((A) => async () => {
      A?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
      let B = process.env[K10],
        Q = process.env[H10],
        I = process.env[z10],
        G = process.env[w10],
        Z = process.env[E10],
        D = process.env[U10];
      if (B && Q) {
        let Y = {
          accessKeyId: B,
          secretAccessKey: Q,
          ...I && {
            sessionToken: I
          },
          ...G && {
            expiration: new Date(G)
          },
          ...Z && {
            credentialScope: Z
          },
          ...D && {
            accountId: D
          }
        };
        return hV4.setCredentialFeature(Y, "CREDENTIALS_ENV_VARS", "g"), Y
      }
      throw new mV4.CredentialsProviderError("Unable to find environment variable credentials.", {
        logger: A?.logger
      })
    }, "fromEnv")
})
// @from(Start 3459882, End 3471484)
B_ = z((kI8, k10) => {
  var {
    defineProperty: c71,
    getOwnPropertyDescriptor: uV4,
    getOwnPropertyNames: pV4
  } = Object, cV4 = Object.prototype.hasOwnProperty, Y7 = (A, B) => c71(A, "name", {
    value: B,
    configurable: !0
  }), lV4 = (A, B) => {
    for (var Q in B) c71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, iV4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of pV4(B))
        if (!cV4.call(A, G) && G !== Q) c71(A, G, {
          get: () => B[G],
          enumerable: !(I = uV4(B, G)) || I.enumerable
        })
    }
    return A
  }, nV4 = (A) => iV4(c71({}, "__esModule", {
    value: !0
  }), A), L10 = {};
  lV4(L10, {
    DEFAULT_MAX_RETRIES: () => P10,
    DEFAULT_TIMEOUT: () => T10,
    ENV_CMDS_AUTH_TOKEN: () => Ey1,
    ENV_CMDS_FULL_URI: () => u71,
    ENV_CMDS_RELATIVE_URI: () => p71,
    Endpoint: () => S10,
    fromContainerMetadata: () => oV4,
    fromInstanceMetadata: () => EC4,
    getInstanceMetadataEndpoint: () => j10,
    httpRequest: () => Lb,
    providerConfigFromInit: () => Uy1
  });
  k10.exports = nV4(L10);
  var aV4 = Z1("url"),
    dz = $I(),
    sV4 = Z1("buffer"),
    rV4 = Z1("http");

  function Lb(A) {
    return new Promise((B, Q) => {
      let I = rV4.request({
        method: "GET",
        ...A,
        hostname: A.hostname?.replace(/^\[(.+)\]$/, "$1")
      });
      I.on("error", (G) => {
        Q(Object.assign(new dz.ProviderError("Unable to connect to instance metadata service"), G)), I.destroy()
      }), I.on("timeout", () => {
        Q(new dz.ProviderError("TimeoutError from instance metadata service")), I.destroy()
      }), I.on("response", (G) => {
        let {
          statusCode: Z = 400
        } = G;
        if (Z < 200 || 300 <= Z) Q(Object.assign(new dz.ProviderError("Error response received from instance metadata service"), {
          statusCode: Z
        })), I.destroy();
        let D = [];
        G.on("data", (Y) => {
          D.push(Y)
        }), G.on("end", () => {
          B(sV4.Buffer.concat(D)), I.destroy()
        })
      }), I.end()
    })
  }
  Y7(Lb, "httpRequest");
  var R10 = Y7((A) => Boolean(A) && typeof A === "object" && typeof A.AccessKeyId === "string" && typeof A.SecretAccessKey === "string" && typeof A.Token === "string" && typeof A.Expiration === "string", "isImdsCredentials"),
    O10 = Y7((A) => ({
      accessKeyId: A.AccessKeyId,
      secretAccessKey: A.SecretAccessKey,
      sessionToken: A.Token,
      expiration: new Date(A.Expiration),
      ...A.AccountId && {
        accountId: A.AccountId
      }
    }), "fromImdsCredentials"),
    T10 = 1000,
    P10 = 0,
    Uy1 = Y7(({
      maxRetries: A = P10,
      timeout: B = T10
    }) => ({
      maxRetries: A,
      timeout: B
    }), "providerConfigFromInit"),
    wy1 = Y7((A, B) => {
      let Q = A();
      for (let I = 0; I < B; I++) Q = Q.catch(A);
      return Q
    }, "retry"),
    u71 = "AWS_CONTAINER_CREDENTIALS_FULL_URI",
    p71 = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
    Ey1 = "AWS_CONTAINER_AUTHORIZATION_TOKEN",
    oV4 = Y7((A = {}) => {
      let {
        timeout: B,
        maxRetries: Q
      } = Uy1(A);
      return () => wy1(async () => {
        let I = await QC4({
            logger: A.logger
          }),
          G = JSON.parse(await tV4(B, I));
        if (!R10(G)) throw new dz.CredentialsProviderError("Invalid response received from instance metadata service.", {
          logger: A.logger
        });
        return O10(G)
      }, Q)
    }, "fromContainerMetadata"),
    tV4 = Y7(async (A, B) => {
      if (process.env[Ey1]) B.headers = {
        ...B.headers,
        Authorization: process.env[Ey1]
      };
      return (await Lb({
        ...B,
        timeout: A
      })).toString()
    }, "requestFromEcsImds"),
    eV4 = "169.254.170.2",
    AC4 = {
      localhost: !0,
      "127.0.0.1": !0
    },
    BC4 = {
      "http:": !0,
      "https:": !0
    },
    QC4 = Y7(async ({
      logger: A
    }) => {
      if (process.env[p71]) return {
        hostname: eV4,
        path: process.env[p71]
      };
      if (process.env[u71]) {
        let B = aV4.parse(process.env[u71]);
        if (!B.hostname || !(B.hostname in AC4)) throw new dz.CredentialsProviderError(`${B.hostname} is not a valid container metadata service hostname`, {
          tryNextLink: !1,
          logger: A
        });
        if (!B.protocol || !(B.protocol in BC4)) throw new dz.CredentialsProviderError(`${B.protocol} is not a valid container metadata service protocol`, {
          tryNextLink: !1,
          logger: A
        });
        return {
          ...B,
          port: B.port ? parseInt(B.port, 10) : void 0
        }
      }
      throw new dz.CredentialsProviderError(`The container metadata credential provider cannot be used unless the ${p71} or ${u71} environment variable is set`, {
        tryNextLink: !1,
        logger: A
      })
    }, "getCmdsUri"),
    IC4 = class A extends dz.CredentialsProviderError {
      constructor(B, Q = !0) {
        super(B, Q);
        this.tryNextLink = Q, this.name = "InstanceMetadataV1FallbackError", Object.setPrototypeOf(this, A.prototype)
      }
      static {
        Y7(this, "InstanceMetadataV1FallbackError")
      }
    },
    Ny1 = qC(),
    GC4 = FN(),
    S10 = ((A) => {
      return A.IPv4 = "http://169.254.169.254", A.IPv6 = "http://[fd00:ec2::254]", A
    })(S10 || {}),
    ZC4 = "AWS_EC2_METADATA_SERVICE_ENDPOINT",
    DC4 = "ec2_metadata_service_endpoint",
    YC4 = {
      environmentVariableSelector: (A) => A[ZC4],
      configFileSelector: (A) => A[DC4],
      default: void 0
    },
    _10 = ((A) => {
      return A.IPv4 = "IPv4", A.IPv6 = "IPv6", A
    })(_10 || {}),
    WC4 = "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE",
    JC4 = "ec2_metadata_service_endpoint_mode",
    FC4 = {
      environmentVariableSelector: (A) => A[WC4],
      configFileSelector: (A) => A[JC4],
      default: "IPv4"
    },
    j10 = Y7(async () => GC4.parseUrl(await XC4() || await VC4()), "getInstanceMetadataEndpoint"),
    XC4 = Y7(async () => Ny1.loadConfig(YC4)(), "getFromEndpointConfig"),
    VC4 = Y7(async () => {
      let A = await Ny1.loadConfig(FC4)();
      switch (A) {
        case "IPv4":
          return "http://169.254.169.254";
        case "IPv6":
          return "http://[fd00:ec2::254]";
        default:
          throw new Error(`Unsupported endpoint mode: ${A}. Select from ${Object.values(_10)}`)
      }
    }, "getFromEndpointModeConfig"),
    CC4 = 300,
    KC4 = 300,
    HC4 = "https://docs.aws.amazon.com/sdkref/latest/guide/feature-static-credentials.html",
    $10 = Y7((A, B) => {
      let Q = CC4 + Math.floor(Math.random() * KC4),
        I = new Date(Date.now() + Q * 1000);
      B.warn(`Attempting credential expiration extension due to a credential service availability issue. A refresh of these credentials will be attempted after ${new Date(I)}.
For more information, please visit: ` + HC4);
      let G = A.originalExpiration ?? A.expiration;
      return {
        ...A,
        ...G ? {
          originalExpiration: G
        } : {},
        expiration: I
      }
    }, "getExtendedInstanceMetadataCredentials"),
    zC4 = Y7((A, B = {}) => {
      let Q = B?.logger || console,
        I;
      return async () => {
        let G;
        try {
          if (G = await A(), G.expiration && G.expiration.getTime() < Date.now()) G = $10(G, Q)
        } catch (Z) {
          if (I) Q.warn("Credential renew failed: ", Z), G = $10(I, Q);
          else throw Z
        }
        return I = G, G
      }
    }, "staticStabilityProvider"),
    y10 = "/latest/meta-data/iam/security-credentials/",
    wC4 = "/latest/api/token",
    zy1 = "AWS_EC2_METADATA_V1_DISABLED",
    q10 = "ec2_metadata_v1_disabled",
    M10 = "x-aws-ec2-metadata-token",
    EC4 = Y7((A = {}) => zC4(UC4(A), {
      logger: A.logger
    }), "fromInstanceMetadata"),
    UC4 = Y7((A = {}) => {
      let B = !1,
        {
          logger: Q,
          profile: I
        } = A,
        {
          timeout: G,
          maxRetries: Z
        } = Uy1(A),
        D = Y7(async (Y, W) => {
          if (B || W.headers?.[M10] == null) {
            let X = !1,
              V = !1,
              C = await Ny1.loadConfig({
                environmentVariableSelector: (K) => {
                  let E = K[zy1];
                  if (V = !!E && E !== "false", E === void 0) throw new dz.CredentialsProviderError(`${zy1} not set in env, checking config file next.`, {
                    logger: A.logger
                  });
                  return V
                },
                configFileSelector: (K) => {
                  let E = K[q10];
                  return X = !!E && E !== "false", X
                },
                default: !1
              }, {
                profile: I
              })();
            if (A.ec2MetadataV1Disabled || C) {
              let K = [];
              if (A.ec2MetadataV1Disabled) K.push("credential provider initialization (runtime option ec2MetadataV1Disabled)");
              if (X) K.push(`config file profile (${q10})`);
              if (V) K.push(`process environment variable (${zy1})`);
              throw new IC4(`AWS EC2 Metadata v1 fallback has been blocked by AWS SDK configuration in the following: [${K.join(", ")}].`)
            }
          }
          let F = (await wy1(async () => {
            let X;
            try {
              X = await $C4(W)
            } catch (V) {
              if (V.statusCode === 401) B = !1;
              throw V
            }
            return X
          }, Y)).trim();
          return wy1(async () => {
            let X;
            try {
              X = await qC4(F, W, A)
            } catch (V) {
              if (V.statusCode === 401) B = !1;
              throw V
            }
            return X
          }, Y)
        }, "getCredentials");
      return async () => {
        let Y = await j10();
        if (B) return Q?.debug("AWS SDK Instance Metadata", "using v1 fallback (no token fetch)"), D(Z, {
          ...Y,
          timeout: G
        });
        else {
          let W;
          try {
            W = (await NC4({
              ...Y,
              timeout: G
            })).toString()
          } catch (J) {
            if (J?.statusCode === 400) throw Object.assign(J, {
              message: "EC2 Metadata token request returned error"
            });
            else if (J.message === "TimeoutError" || [403, 404, 405].includes(J.statusCode)) B = !0;
            return Q?.debug("AWS SDK Instance Metadata", "using v1 fallback (initial)"), D(Z, {
              ...Y,
              timeout: G
            })
          }
          return D(Z, {
            ...Y,
            headers: {
              [M10]: W
            },
            timeout: G
          })
        }
      }
    }, "getInstanceMetadataProvider"),
    NC4 = Y7(async (A) => Lb({
      ...A,
      path: wC4,
      method: "PUT",
      headers: {
        "x-aws-ec2-metadata-token-ttl-seconds": "21600"
      }
    }), "getMetadataToken"),
    $C4 = Y7(async (A) => (await Lb({
      ...A,
      path: y10
    })).toString(), "getProfile"),
    qC4 = Y7(async (A, B, Q) => {
      let I = JSON.parse((await Lb({
        ...B,
        path: y10 + A
      })).toString());
      if (!R10(I)) throw new dz.CredentialsProviderError("Invalid response received from instance metadata service.", {
        logger: Q.logger
      });
      return O10(I)
    }, "getCredentialsFromProfile")
})