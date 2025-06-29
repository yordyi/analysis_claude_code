
// @from(Start 4199219, End 4202829)
x$0 = z((P$0) => {
  Object.defineProperty(P$0, "__esModule", {
    value: !0
  });
  P$0.DEFAULT_AGGREGATION = P$0.EXPONENTIAL_HISTOGRAM_AGGREGATION = P$0.HISTOGRAM_AGGREGATION = P$0.LAST_VALUE_AGGREGATION = P$0.SUM_AGGREGATION = P$0.DROP_AGGREGATION = P$0.DefaultAggregation = P$0.ExponentialHistogramAggregation = P$0.ExplicitBucketHistogramAggregation = P$0.HistogramAggregation = P$0.LastValueAggregation = P$0.SumAggregation = P$0.DropAggregation = void 0;
  var ie4 = s9(),
    x_ = T$0(),
    Qw = tL();
  class CZ1 {
    static DEFAULT_INSTANCE = new x_.DropAggregator;
    createAggregator(A) {
      return CZ1.DEFAULT_INSTANCE
    }
  }
  P$0.DropAggregation = CZ1;
  class Ls {
    static MONOTONIC_INSTANCE = new x_.SumAggregator(!0);
    static NON_MONOTONIC_INSTANCE = new x_.SumAggregator(!1);
    createAggregator(A) {
      switch (A.type) {
        case Qw.InstrumentType.COUNTER:
        case Qw.InstrumentType.OBSERVABLE_COUNTER:
        case Qw.InstrumentType.HISTOGRAM:
          return Ls.MONOTONIC_INSTANCE;
        default:
          return Ls.NON_MONOTONIC_INSTANCE
      }
    }
  }
  P$0.SumAggregation = Ls;
  class KZ1 {
    static DEFAULT_INSTANCE = new x_.LastValueAggregator;
    createAggregator(A) {
      return KZ1.DEFAULT_INSTANCE
    }
  }
  P$0.LastValueAggregation = KZ1;
  class HZ1 {
    static DEFAULT_INSTANCE = new x_.HistogramAggregator([0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000, 7500, 1e4], !0);
    createAggregator(A) {
      return HZ1.DEFAULT_INSTANCE
    }
  }
  P$0.HistogramAggregation = HZ1;
  class ub1 {
    _recordMinMax;
    _boundaries;
    constructor(A, B = !0) {
      if (this._recordMinMax = B, A == null) throw new Error("ExplicitBucketHistogramAggregation should be created with explicit boundaries, if a single bucket histogram is required, please pass an empty array");
      A = A.concat(), A = A.sort((G, Z) => G - Z);
      let Q = A.lastIndexOf(-1 / 0),
        I = A.indexOf(1 / 0);
      if (I === -1) I = void 0;
      this._boundaries = A.slice(Q + 1, I)
    }
    createAggregator(A) {
      return new x_.HistogramAggregator(this._boundaries, this._recordMinMax)
    }
  }
  P$0.ExplicitBucketHistogramAggregation = ub1;
  class pb1 {
    _maxSize;
    _recordMinMax;
    constructor(A = 160, B = !0) {
      this._maxSize = A, this._recordMinMax = B
    }
    createAggregator(A) {
      return new x_.ExponentialHistogramAggregator(this._maxSize, this._recordMinMax)
    }
  }
  P$0.ExponentialHistogramAggregation = pb1;
  class cb1 {
    _resolve(A) {
      switch (A.type) {
        case Qw.InstrumentType.COUNTER:
        case Qw.InstrumentType.UP_DOWN_COUNTER:
        case Qw.InstrumentType.OBSERVABLE_COUNTER:
        case Qw.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
          return P$0.SUM_AGGREGATION;
        case Qw.InstrumentType.GAUGE:
        case Qw.InstrumentType.OBSERVABLE_GAUGE:
          return P$0.LAST_VALUE_AGGREGATION;
        case Qw.InstrumentType.HISTOGRAM: {
          if (A.advice.explicitBucketBoundaries) return new ub1(A.advice.explicitBucketBoundaries);
          return P$0.HISTOGRAM_AGGREGATION
        }
      }
      return ie4.diag.warn(`Unable to recognize instrument type: ${A.type}`), P$0.DROP_AGGREGATION
    }
    createAggregator(A) {
      return this._resolve(A).createAggregator(A)
    }
  }
  P$0.DefaultAggregation = cb1;
  P$0.DROP_AGGREGATION = new CZ1;
  P$0.SUM_AGGREGATION = new Ls;
  P$0.LAST_VALUE_AGGREGATION = new KZ1;
  P$0.HISTOGRAM_AGGREGATION = new HZ1;
  P$0.EXPONENTIAL_HISTOGRAM_AGGREGATION = new pb1;
  P$0.DEFAULT_AGGREGATION = new cb1
})
// @from(Start 4202835, End 4204110)
Rs = z((v$0) => {
  Object.defineProperty(v$0, "__esModule", {
    value: !0
  });
  v$0.toAggregation = v$0.AggregationType = void 0;
  var f_ = x$0(),
    v_;
  (function(A) {
    A[A.DEFAULT = 0] = "DEFAULT", A[A.DROP = 1] = "DROP", A[A.SUM = 2] = "SUM", A[A.LAST_VALUE = 3] = "LAST_VALUE", A[A.EXPLICIT_BUCKET_HISTOGRAM = 4] = "EXPLICIT_BUCKET_HISTOGRAM", A[A.EXPONENTIAL_HISTOGRAM = 5] = "EXPONENTIAL_HISTOGRAM"
  })(v_ = v$0.AggregationType || (v$0.AggregationType = {}));

  function B16(A) {
    switch (A.type) {
      case v_.DEFAULT:
        return f_.DEFAULT_AGGREGATION;
      case v_.DROP:
        return f_.DROP_AGGREGATION;
      case v_.SUM:
        return f_.SUM_AGGREGATION;
      case v_.LAST_VALUE:
        return f_.LAST_VALUE_AGGREGATION;
      case v_.EXPONENTIAL_HISTOGRAM: {
        let B = A;
        return new f_.ExponentialHistogramAggregation(B.options?.maxSize, B.options?.recordMinMax)
      }
      case v_.EXPLICIT_BUCKET_HISTOGRAM: {
        let B = A;
        if (B.options == null) return f_.HISTOGRAM_AGGREGATION;
        else return new f_.ExplicitBucketHistogramAggregation(B.options?.boundaries, B.options?.recordMinMax)
      }
      default:
        throw new Error("Unsupported Aggregation")
    }
  }
  v$0.toAggregation = B16
})
// @from(Start 4204116, End 4204573)
lb1 = z((g$0) => {
  Object.defineProperty(g$0, "__esModule", {
    value: !0
  });
  g$0.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = g$0.DEFAULT_AGGREGATION_SELECTOR = void 0;
  var Q16 = oG1(),
    I16 = Rs(),
    G16 = (A) => {
      return {
        type: I16.AggregationType.DEFAULT
      }
    };
  g$0.DEFAULT_AGGREGATION_SELECTOR = G16;
  var Z16 = (A) => Q16.AggregationTemporality.CUMULATIVE;
  g$0.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = Z16
})
// @from(Start 4204579, End 4207171)
ib1 = z((p$0) => {
  Object.defineProperty(p$0, "__esModule", {
    value: !0
  });
  p$0.MetricReader = void 0;
  var m$0 = s9(),
    zZ1 = gC(),
    d$0 = lb1();
  class u$0 {
    _shutdown = !1;
    _metricProducers;
    _sdkMetricProducer;
    _aggregationTemporalitySelector;
    _aggregationSelector;
    _cardinalitySelector;
    constructor(A) {
      this._aggregationSelector = A?.aggregationSelector ?? d$0.DEFAULT_AGGREGATION_SELECTOR, this._aggregationTemporalitySelector = A?.aggregationTemporalitySelector ?? d$0.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR, this._metricProducers = A?.metricProducers ?? [], this._cardinalitySelector = A?.cardinalitySelector
    }
    setMetricProducer(A) {
      if (this._sdkMetricProducer) throw new Error("MetricReader can not be bound to a MeterProvider again.");
      this._sdkMetricProducer = A, this.onInitialized()
    }
    selectAggregation(A) {
      return this._aggregationSelector(A)
    }
    selectAggregationTemporality(A) {
      return this._aggregationTemporalitySelector(A)
    }
    selectCardinalityLimit(A) {
      return this._cardinalitySelector ? this._cardinalitySelector(A) : 2000
    }
    onInitialized() {}
    async collect(A) {
      if (this._sdkMetricProducer === void 0) throw new Error("MetricReader is not bound to a MetricProducer");
      if (this._shutdown) throw new Error("MetricReader is shutdown");
      let [B, ...Q] = await Promise.all([this._sdkMetricProducer.collect({
        timeoutMillis: A?.timeoutMillis
      }), ...this._metricProducers.map((D) => D.collect({
        timeoutMillis: A?.timeoutMillis
      }))]), I = B.errors.concat(zZ1.FlatMap(Q, (D) => D.errors)), G = B.resourceMetrics.resource, Z = B.resourceMetrics.scopeMetrics.concat(zZ1.FlatMap(Q, (D) => D.resourceMetrics.scopeMetrics));
      return {
        resourceMetrics: {
          resource: G,
          scopeMetrics: Z
        },
        errors: I
      }
    }
    async shutdown(A) {
      if (this._shutdown) {
        m$0.diag.error("Cannot call shutdown twice.");
        return
      }
      if (A?.timeoutMillis == null) await this.onShutdown();
      else await zZ1.callWithTimeout(this.onShutdown(), A.timeoutMillis);
      this._shutdown = !0
    }
    async forceFlush(A) {
      if (this._shutdown) {
        m$0.diag.warn("Cannot forceFlush on already shutdown MetricReader.");
        return
      }
      if (A?.timeoutMillis == null) {
        await this.onForceFlush();
        return
      }
      await zZ1.callWithTimeout(this.onForceFlush(), A.timeoutMillis)
    }
  }
  p$0.MetricReader = u$0
})
// @from(Start 4207177, End 4209949)
s$0 = z((n$0) => {
  Object.defineProperty(n$0, "__esModule", {
    value: !0
  });
  n$0.PeriodicExportingMetricReader = void 0;
  var nb1 = s9(),
    Os = p8(),
    Y16 = ib1(),
    l$0 = gC();
  class i$0 extends Y16.MetricReader {
    _interval;
    _exporter;
    _exportInterval;
    _exportTimeout;
    constructor(A) {
      super({
        aggregationSelector: A.exporter.selectAggregation?.bind(A.exporter),
        aggregationTemporalitySelector: A.exporter.selectAggregationTemporality?.bind(A.exporter),
        metricProducers: A.metricProducers
      });
      if (A.exportIntervalMillis !== void 0 && A.exportIntervalMillis <= 0) throw Error("exportIntervalMillis must be greater than 0");
      if (A.exportTimeoutMillis !== void 0 && A.exportTimeoutMillis <= 0) throw Error("exportTimeoutMillis must be greater than 0");
      if (A.exportTimeoutMillis !== void 0 && A.exportIntervalMillis !== void 0 && A.exportIntervalMillis < A.exportTimeoutMillis) throw Error("exportIntervalMillis must be greater than or equal to exportTimeoutMillis");
      this._exportInterval = A.exportIntervalMillis ?? 60000, this._exportTimeout = A.exportTimeoutMillis ?? 30000, this._exporter = A.exporter
    }
    async _runOnce() {
      try {
        await l$0.callWithTimeout(this._doRun(), this._exportTimeout)
      } catch (A) {
        if (A instanceof l$0.TimeoutError) {
          nb1.diag.error("Export took longer than %s milliseconds and timed out.", this._exportTimeout);
          return
        }
        Os.globalErrorHandler(A)
      }
    }
    async _doRun() {
      let {
        resourceMetrics: A,
        errors: B
      } = await this.collect({
        timeoutMillis: this._exportTimeout
      });
      if (B.length > 0) nb1.diag.error("PeriodicExportingMetricReader: metrics collection errors", ...B);
      if (A.resource.asyncAttributesPending) try {
        await A.resource.waitForAsyncAttributes?.()
      } catch (I) {
        nb1.diag.debug("Error while resolving async portion of resource: ", I), Os.globalErrorHandler(I)
      }
      if (A.scopeMetrics.length === 0) return;
      let Q = await Os.internal._export(this._exporter, A);
      if (Q.code !== Os.ExportResultCode.SUCCESS) throw new Error(`PeriodicExportingMetricReader: metrics export failed (error ${Q.error})`)
    }
    onInitialized() {
      this._interval = setInterval(() => {
        this._runOnce()
      }, this._exportInterval), Os.unrefTimer(this._interval)
    }
    async onForceFlush() {
      await this._runOnce(), await this._exporter.forceFlush()
    }
    async onShutdown() {
      if (this._interval) clearInterval(this._interval);
      await this.onForceFlush(), await this._exporter.shutdown()
    }
  }
  n$0.PeriodicExportingMetricReader = i$0
})
// @from(Start 4209955, End 4210871)
Aq0 = z((t$0) => {
  Object.defineProperty(t$0, "__esModule", {
    value: !0
  });
  t$0.InMemoryMetricExporter = void 0;
  var r$0 = p8();
  class o$0 {
    _shutdown = !1;
    _aggregationTemporality;
    _metrics = [];
    constructor(A) {
      this._aggregationTemporality = A
    }
    export (A, B) {
      if (this._shutdown) {
        setTimeout(() => B({
          code: r$0.ExportResultCode.FAILED
        }), 0);
        return
      }
      this._metrics.push(A), setTimeout(() => B({
        code: r$0.ExportResultCode.SUCCESS
      }), 0)
    }
    getMetrics() {
      return this._metrics
    }
    forceFlush() {
      return Promise.resolve()
    }
    reset() {
      this._metrics = []
    }
    selectAggregationTemporality(A) {
      return this._aggregationTemporality
    }
    shutdown() {
      return this._shutdown = !0, Promise.resolve()
    }
  }
  t$0.InMemoryMetricExporter = o$0
})
// @from(Start 4210877, End 4212021)
Gq0 = z((Qq0) => {
  Object.defineProperty(Qq0, "__esModule", {
    value: !0
  });
  Qq0.ConsoleMetricExporter = void 0;
  var Bq0 = p8(),
    W16 = lb1();
  class ab1 {
    _shutdown = !1;
    _temporalitySelector;
    constructor(A) {
      this._temporalitySelector = A?.temporalitySelector ?? W16.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR
    }
    export (A, B) {
      if (this._shutdown) {
        setImmediate(B, {
          code: Bq0.ExportResultCode.FAILED
        });
        return
      }
      return ab1._sendMetrics(A, B)
    }
    forceFlush() {
      return Promise.resolve()
    }
    selectAggregationTemporality(A) {
      return this._temporalitySelector(A)
    }
    shutdown() {
      return this._shutdown = !0, Promise.resolve()
    }
    static _sendMetrics(A, B) {
      for (let Q of A.scopeMetrics)
        for (let I of Q.metrics) console.dir({
          descriptor: I.descriptor,
          dataPointType: I.dataPointType,
          dataPoints: I.dataPoints
        }, {
          depth: null
        });
      B({
        code: Bq0.ExportResultCode.SUCCESS
      })
    }
  }
  Qq0.ConsoleMetricExporter = ab1
})
// @from(Start 4212027, End 4212249)
Yq0 = z((Zq0) => {
  Object.defineProperty(Zq0, "__esModule", {
    value: !0
  });
  Zq0.defaultServiceName = void 0;

  function J16() {
    return `unknown_service:${process.argv0}`
  }
  Zq0.defaultServiceName = J16
})
// @from(Start 4212255, End 4212537)
Wq0 = z((sb1) => {
  Object.defineProperty(sb1, "__esModule", {
    value: !0
  });
  sb1.defaultServiceName = void 0;
  var F16 = Yq0();
  Object.defineProperty(sb1, "defaultServiceName", {
    enumerable: !0,
    get: function() {
      return F16.defaultServiceName
    }
  })
})
// @from(Start 4212543, End 4212825)
ob1 = z((rb1) => {
  Object.defineProperty(rb1, "__esModule", {
    value: !0
  });
  rb1.defaultServiceName = void 0;
  var V16 = Wq0();
  Object.defineProperty(rb1, "defaultServiceName", {
    enumerable: !0,
    get: function() {
      return V16.defaultServiceName
    }
  })
})
// @from(Start 4212831, End 4213153)
Xq0 = z((Jq0) => {
  Object.defineProperty(Jq0, "__esModule", {
    value: !0
  });
  Jq0.identity = Jq0.isPromiseLike = void 0;
  var K16 = (A) => {
    return A !== null && typeof A === "object" && typeof A.then === "function"
  };
  Jq0.isPromiseLike = K16;

  function H16(A) {
    return A
  }
  Jq0.identity = H16
})
// @from(Start 4213159, End 4215925)
Bg1 = z((Vq0) => {
  Object.defineProperty(Vq0, "__esModule", {
    value: !0
  });
  Vq0.defaultResource = Vq0.emptyResource = Vq0.resourceFromDetectedResource = Vq0.resourceFromAttributes = void 0;
  var tb1 = s9(),
    eb1 = p8(),
    b_ = LN(),
    w16 = ob1(),
    wZ1 = Xq0();
  class Ts {
    _rawAttributes;
    _asyncAttributesPending = !1;
    _memoizedAttributes;
    static FromAttributeList(A) {
      let B = new Ts({});
      return B._rawAttributes = A, B._asyncAttributesPending = A.filter(([Q, I]) => wZ1.isPromiseLike(I)).length > 0, B
    }
    constructor(A) {
      let B = A.attributes ?? {};
      this._rawAttributes = Object.entries(B).map(([Q, I]) => {
        if (wZ1.isPromiseLike(I)) this._asyncAttributesPending = !0;
        return [Q, I]
      })
    }
    get asyncAttributesPending() {
      return this._asyncAttributesPending
    }
    async waitForAsyncAttributes() {
      if (!this.asyncAttributesPending) return;
      for (let A = 0; A < this._rawAttributes.length; A++) {
        let [B, Q] = this._rawAttributes[A];
        try {
          this._rawAttributes[A] = [B, wZ1.isPromiseLike(Q) ? await Q : Q]
        } catch (I) {
          tb1.diag.debug("a resource's async attributes promise rejected: %s", I), this._rawAttributes[A] = [B, void 0]
        }
      }
      this._asyncAttributesPending = !1
    }
    get attributes() {
      if (this.asyncAttributesPending) tb1.diag.error("Accessing resource attributes before async attributes settled");
      if (this._memoizedAttributes) return this._memoizedAttributes;
      let A = {};
      for (let [B, Q] of this._rawAttributes) {
        if (wZ1.isPromiseLike(Q)) {
          tb1.diag.debug(`Unsettled resource attribute ${B} skipped`);
          continue
        }
        if (Q != null) A[B] ??= Q
      }
      if (!this._asyncAttributesPending) this._memoizedAttributes = A;
      return A
    }
    getRawAttributes() {
      return this._rawAttributes
    }
    merge(A) {
      if (A == null) return this;
      return Ts.FromAttributeList([...A.getRawAttributes(), ...this.getRawAttributes()])
    }
  }

  function Ag1(A) {
    return Ts.FromAttributeList(Object.entries(A))
  }
  Vq0.resourceFromAttributes = Ag1;

  function E16(A) {
    return new Ts(A)
  }
  Vq0.resourceFromDetectedResource = E16;

  function U16() {
    return Ag1({})
  }
  Vq0.emptyResource = U16;

  function N16() {
    return Ag1({
      [b_.ATTR_SERVICE_NAME]: w16.defaultServiceName(),
      [b_.ATTR_TELEMETRY_SDK_LANGUAGE]: eb1.SDK_INFO[b_.ATTR_TELEMETRY_SDK_LANGUAGE],
      [b_.ATTR_TELEMETRY_SDK_NAME]: eb1.SDK_INFO[b_.ATTR_TELEMETRY_SDK_NAME],
      [b_.ATTR_TELEMETRY_SDK_VERSION]: eb1.SDK_INFO[b_.ATTR_TELEMETRY_SDK_VERSION]
    })
  }
  Vq0.defaultResource = N16
})
// @from(Start 4215931, End 4216759)
zq0 = z((Kq0) => {
  Object.defineProperty(Kq0, "__esModule", {
    value: !0
  });
  Kq0.detectResources = void 0;
  var Ig1 = s9(),
    Qg1 = Bg1(),
    L16 = (A = {}) => {
      let B = (A.detectors || []).map((Q) => {
        try {
          let I = Qg1.resourceFromDetectedResource(Q.detect(A));
          return Ig1.diag.debug(`${Q.constructor.name} found resource.`, I), I
        } catch (I) {
          return Ig1.diag.debug(`${Q.constructor.name} failed: ${I.message}`), Qg1.emptyResource()
        }
      });
      return R16(B), B.reduce((Q, I) => Q.merge(I), Qg1.emptyResource())
    };
  Kq0.detectResources = L16;
  var R16 = (A) => {
    A.forEach((B) => {
      if (Object.keys(B.attributes).length > 0) {
        let Q = JSON.stringify(B.attributes, null, 4);
        Ig1.diag.verbose(Q)
      }
    })
  }
})
// @from(Start 4216765, End 4218770)
$q0 = z((Uq0) => {
  Object.defineProperty(Uq0, "__esModule", {
    value: !0
  });
  Uq0.envDetector = void 0;
  var O16 = s9(),
    T16 = LN(),
    wq0 = p8();
  class Eq0 {
    _MAX_LENGTH = 255;
    _COMMA_SEPARATOR = ",";
    _LABEL_KEY_VALUE_SPLITTER = "=";
    _ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.";
    _ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
    detect(A) {
      let B = {},
        Q = wq0.getStringFromEnv("OTEL_RESOURCE_ATTRIBUTES"),
        I = wq0.getStringFromEnv("OTEL_SERVICE_NAME");
      if (Q) try {
        let G = this._parseResourceAttributes(Q);
        Object.assign(B, G)
      } catch (G) {
        O16.diag.debug(`EnvDetector failed: ${G.message}`)
      }
      if (I) B[T16.SEMRESATTRS_SERVICE_NAME] = I;
      return {
        attributes: B
      }
    }
    _parseResourceAttributes(A) {
      if (!A) return {};
      let B = {},
        Q = A.split(this._COMMA_SEPARATOR, -1);
      for (let I of Q) {
        let G = I.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
        if (G.length !== 2) continue;
        let [Z, D] = G;
        if (Z = Z.trim(), D = D.trim().split(/^"|"$/).join(""), !this._isValidAndNotEmpty(Z)) throw new Error(`Attribute key ${this._ERROR_MESSAGE_INVALID_CHARS}`);
        if (!this._isValid(D)) throw new Error(`Attribute value ${this._ERROR_MESSAGE_INVALID_VALUE}`);
        B[Z] = decodeURIComponent(D)
      }
      return B
    }
    _isValid(A) {
      return A.length <= this._MAX_LENGTH && this._isBaggageOctetString(A)
    }
    _isBaggageOctetString(A) {
      for (let B = 0; B < A.length; B++) {
        let Q = A.charCodeAt(B);
        if (Q < 33 || Q === 44 || Q === 59 || Q === 92 || Q > 126) return !1
      }
      return !0
    }
    _isValidAndNotEmpty(A) {
      return A.length > 0 && this._isValid(A)
    }
  }
  Uq0.envDetector = new Eq0
})
// @from(Start 4218776, End 4218985)
EZ1 = z((qq0) => {
  Object.defineProperty(qq0, "__esModule", {
    value: !0
  });
  qq0.execAsync = void 0;
  var P16 = Z1("child_process"),
    S16 = Z1("util");
  qq0.execAsync = S16.promisify(P16.exec)
})
// @from(Start 4218991, End 4219539)
Oq0 = z((Lq0) => {
  Object.defineProperty(Lq0, "__esModule", {
    value: !0
  });
  Lq0.getMachineId = void 0;
  var _16 = EZ1(),
    j16 = s9();
  async function y16() {
    try {
      let B = (await _16.execAsync('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout.split(`
`).find((I) => I.includes("IOPlatformUUID"));
      if (!B) return;
      let Q = B.split('" = "');
      if (Q.length === 2) return Q[1].slice(0, -1)
    } catch (A) {
      j16.diag.debug(`error reading machine id: ${A}`)
    }
    return
  }
  Lq0.getMachineId = y16
})
// @from(Start 4219545, End 4220019)
Sq0 = z((Tq0) => {
  Object.defineProperty(Tq0, "__esModule", {
    value: !0
  });
  Tq0.getMachineId = void 0;
  var k16 = Z1("fs"),
    x16 = s9();
  async function f16() {
    let A = ["/etc/machine-id", "/var/lib/dbus/machine-id"];
    for (let B of A) try {
      return (await k16.promises.readFile(B, {
        encoding: "utf8"
      })).trim()
    } catch (Q) {
      x16.diag.debug(`error reading machine id: ${Q}`)
    }
    return
  }
  Tq0.getMachineId = f16
})
// @from(Start 4220025, End 4220618)
kq0 = z((jq0) => {
  Object.defineProperty(jq0, "__esModule", {
    value: !0
  });
  jq0.getMachineId = void 0;
  var v16 = Z1("fs"),
    b16 = EZ1(),
    _q0 = s9();
  async function g16() {
    try {
      return (await v16.promises.readFile("/etc/hostid", {
        encoding: "utf8"
      })).trim()
    } catch (A) {
      _q0.diag.debug(`error reading machine id: ${A}`)
    }
    try {
      return (await b16.execAsync("kenv -q smbios.system.uuid")).stdout.trim()
    } catch (A) {
      _q0.diag.debug(`error reading machine id: ${A}`)
    }
    return
  }
  jq0.getMachineId = g16
})
// @from(Start 4220624, End 4221296)
bq0 = z((fq0) => {
  Object.defineProperty(fq0, "__esModule", {
    value: !0
  });
  fq0.getMachineId = void 0;
  var xq0 = Z1("process"),
    h16 = EZ1(),
    m16 = s9();
  async function d16() {
    let B = "%windir%\\System32\\REG.exe";
    if (xq0.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in xq0.env) B = "%windir%\\sysnative\\cmd.exe /c " + B;
    try {
      let I = (await h16.execAsync(`${B} QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid`)).stdout.split("REG_SZ");
      if (I.length === 2) return I[1].trim()
    } catch (Q) {
      m16.diag.debug(`error reading machine id: ${Q}`)
    }
    return
  }
  fq0.getMachineId = d16
})
// @from(Start 4221302, End 4221571)
mq0 = z((gq0) => {
  Object.defineProperty(gq0, "__esModule", {
    value: !0
  });
  gq0.getMachineId = void 0;
  var u16 = s9();
  async function p16() {
    u16.diag.debug("could not read machine-id: unsupported platform");
    return
  }
  gq0.getMachineId = p16
})
// @from(Start 4221577, End 4222171)
uq0 = z((dq0) => {
  Object.defineProperty(dq0, "__esModule", {
    value: !0
  });
  dq0.getMachineId = void 0;
  var c16 = Z1("process"),
    kg;
  dq0.getMachineId = kg;
  switch (c16.platform) {
    case "darwin":
      dq0.getMachineId = kg = Oq0().getMachineId;
      break;
    case "linux":
      dq0.getMachineId = kg = Sq0().getMachineId;
      break;
    case "freebsd":
      dq0.getMachineId = kg = kq0().getMachineId;
      break;
    case "win32":
      dq0.getMachineId = kg = bq0().getMachineId;
      break;
    default:
      dq0.getMachineId = kg = mq0().getMachineId
  }
})
// @from(Start 4222177, End 4222746)
Gg1 = z((pq0) => {
  Object.defineProperty(pq0, "__esModule", {
    value: !0
  });
  pq0.normalizeType = pq0.normalizeArch = void 0;
  var l16 = (A) => {
    switch (A) {
      case "arm":
        return "arm32";
      case "ppc":
        return "ppc32";
      case "x64":
        return "amd64";
      default:
        return A
    }
  };
  pq0.normalizeArch = l16;
  var i16 = (A) => {
    switch (A) {
      case "sunos":
        return "solaris";
      case "win32":
        return "windows";
      default:
        return A
    }
  };
  pq0.normalizeType = i16
})
// @from(Start 4222752, End 4223244)
sq0 = z((nq0) => {
  Object.defineProperty(nq0, "__esModule", {
    value: !0
  });
  nq0.hostDetector = void 0;
  var Zg1 = LN(),
    lq0 = Z1("os"),
    a16 = uq0(),
    s16 = Gg1();
  class iq0 {
    detect(A) {
      return {
        attributes: {
          [Zg1.SEMRESATTRS_HOST_NAME]: lq0.hostname(),
          [Zg1.SEMRESATTRS_HOST_ARCH]: s16.normalizeArch(lq0.arch()),
          [Zg1.SEMRESATTRS_HOST_ID]: a16.getMachineId()
        }
      }
    }
  }
  nq0.hostDetector = new iq0
})
// @from(Start 4223250, End 4223666)
BM0 = z((eq0) => {
  Object.defineProperty(eq0, "__esModule", {
    value: !0
  });
  eq0.osDetector = void 0;
  var rq0 = LN(),
    oq0 = Z1("os"),
    r16 = Gg1();
  class tq0 {
    detect(A) {
      return {
        attributes: {
          [rq0.SEMRESATTRS_OS_TYPE]: r16.normalizeType(oq0.platform()),
          [rq0.SEMRESATTRS_OS_VERSION]: oq0.release()
        }
      }
    }
  }
  eq0.osDetector = new tq0
})
// @from(Start 4223672, End 4224751)
ZM0 = z((IM0) => {
  Object.defineProperty(IM0, "__esModule", {
    value: !0
  });
  IM0.processDetector = void 0;
  var o16 = s9(),
    ON = LN(),
    t16 = Z1("os");
  class QM0 {
    detect(A) {
      let B = {
        [ON.SEMRESATTRS_PROCESS_PID]: process.pid,
        [ON.SEMRESATTRS_PROCESS_EXECUTABLE_NAME]: process.title,
        [ON.SEMRESATTRS_PROCESS_EXECUTABLE_PATH]: process.execPath,
        [ON.SEMRESATTRS_PROCESS_COMMAND_ARGS]: [process.argv[0], ...process.execArgv, ...process.argv.slice(1)],
        [ON.SEMRESATTRS_PROCESS_RUNTIME_VERSION]: process.versions.node,
        [ON.SEMRESATTRS_PROCESS_RUNTIME_NAME]: "nodejs",
        [ON.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION]: "Node.js"
      };
      if (process.argv.length > 1) B[ON.SEMRESATTRS_PROCESS_COMMAND] = process.argv[1];
      try {
        let Q = t16.userInfo();
        B[ON.SEMRESATTRS_PROCESS_OWNER] = Q.username
      } catch (Q) {
        o16.diag.debug(`error obtaining process owner: ${Q}`)
      }
      return {
        attributes: B
      }
    }
  }
  IM0.processDetector = new QM0
})
// @from(Start 4224757, End 4225130)
JM0 = z((YM0) => {
  Object.defineProperty(YM0, "__esModule", {
    value: !0
  });
  YM0.serviceInstanceIdDetector = void 0;
  var e16 = LN(),
    AA6 = Z1("crypto");
  class DM0 {
    detect(A) {
      return {
        attributes: {
          [e16.SEMRESATTRS_SERVICE_INSTANCE_ID]: AA6.randomUUID()
        }
      }
    }
  }
  YM0.serviceInstanceIdDetector = new DM0
})
// @from(Start 4225136, End 4225939)
FM0 = z((xg) => {
  Object.defineProperty(xg, "__esModule", {
    value: !0
  });
  xg.serviceInstanceIdDetector = xg.processDetector = xg.osDetector = xg.hostDetector = void 0;
  var BA6 = sq0();
  Object.defineProperty(xg, "hostDetector", {
    enumerable: !0,
    get: function() {
      return BA6.hostDetector
    }
  });
  var QA6 = BM0();
  Object.defineProperty(xg, "osDetector", {
    enumerable: !0,
    get: function() {
      return QA6.osDetector
    }
  });
  var IA6 = ZM0();
  Object.defineProperty(xg, "processDetector", {
    enumerable: !0,
    get: function() {
      return IA6.processDetector
    }
  });
  var GA6 = JM0();
  Object.defineProperty(xg, "serviceInstanceIdDetector", {
    enumerable: !0,
    get: function() {
      return GA6.serviceInstanceIdDetector
    }
  })
})
// @from(Start 4225945, End 4226691)
XM0 = z((fg) => {
  Object.defineProperty(fg, "__esModule", {
    value: !0
  });
  fg.serviceInstanceIdDetector = fg.processDetector = fg.osDetector = fg.hostDetector = void 0;
  var UZ1 = FM0();
  Object.defineProperty(fg, "hostDetector", {
    enumerable: !0,
    get: function() {
      return UZ1.hostDetector
    }
  });
  Object.defineProperty(fg, "osDetector", {
    enumerable: !0,
    get: function() {
      return UZ1.osDetector
    }
  });
  Object.defineProperty(fg, "processDetector", {
    enumerable: !0,
    get: function() {
      return UZ1.processDetector
    }
  });
  Object.defineProperty(fg, "serviceInstanceIdDetector", {
    enumerable: !0,
    get: function() {
      return UZ1.serviceInstanceIdDetector
    }
  })
})
// @from(Start 4226697, End 4226971)
KM0 = z((VM0) => {
  Object.defineProperty(VM0, "__esModule", {
    value: !0
  });
  VM0.noopDetector = VM0.NoopDetector = void 0;
  class Dg1 {
    detect() {
      return {
        attributes: {}
      }
    }
  }
  VM0.NoopDetector = Dg1;
  VM0.noopDetector = new Dg1
})
// @from(Start 4226977, End 4228054)
HM0 = z((BR) => {
  Object.defineProperty(BR, "__esModule", {
    value: !0
  });
  BR.noopDetector = BR.serviceInstanceIdDetector = BR.processDetector = BR.osDetector = BR.hostDetector = BR.envDetector = void 0;
  var WA6 = $q0();
  Object.defineProperty(BR, "envDetector", {
    enumerable: !0,
    get: function() {
      return WA6.envDetector
    }
  });
  var NZ1 = XM0();
  Object.defineProperty(BR, "hostDetector", {
    enumerable: !0,
    get: function() {
      return NZ1.hostDetector
    }
  });
  Object.defineProperty(BR, "osDetector", {
    enumerable: !0,
    get: function() {
      return NZ1.osDetector
    }
  });
  Object.defineProperty(BR, "processDetector", {
    enumerable: !0,
    get: function() {
      return NZ1.processDetector
    }
  });
  Object.defineProperty(BR, "serviceInstanceIdDetector", {
    enumerable: !0,
    get: function() {
      return NZ1.serviceInstanceIdDetector
    }
  });
  var JA6 = KM0();
  Object.defineProperty(BR, "noopDetector", {
    enumerable: !0,
    get: function() {
      return JA6.noopDetector
    }
  })
})
// @from(Start 4228060, End 4229811)
$Z1 = z((LX) => {
  Object.defineProperty(LX, "__esModule", {
    value: !0
  });
  LX.defaultServiceName = LX.emptyResource = LX.defaultResource = LX.resourceFromAttributes = LX.serviceInstanceIdDetector = LX.processDetector = LX.osDetector = LX.hostDetector = LX.envDetector = LX.detectResources = void 0;
  var XA6 = zq0();
  Object.defineProperty(LX, "detectResources", {
    enumerable: !0,
    get: function() {
      return XA6.detectResources
    }
  });
  var Ps = HM0();
  Object.defineProperty(LX, "envDetector", {
    enumerable: !0,
    get: function() {
      return Ps.envDetector
    }
  });
  Object.defineProperty(LX, "hostDetector", {
    enumerable: !0,
    get: function() {
      return Ps.hostDetector
    }
  });
  Object.defineProperty(LX, "osDetector", {
    enumerable: !0,
    get: function() {
      return Ps.osDetector
    }
  });
  Object.defineProperty(LX, "processDetector", {
    enumerable: !0,
    get: function() {
      return Ps.processDetector
    }
  });
  Object.defineProperty(LX, "serviceInstanceIdDetector", {
    enumerable: !0,
    get: function() {
      return Ps.serviceInstanceIdDetector
    }
  });
  var Yg1 = Bg1();
  Object.defineProperty(LX, "resourceFromAttributes", {
    enumerable: !0,
    get: function() {
      return Yg1.resourceFromAttributes
    }
  });
  Object.defineProperty(LX, "defaultResource", {
    enumerable: !0,
    get: function() {
      return Yg1.defaultResource
    }
  });
  Object.defineProperty(LX, "emptyResource", {
    enumerable: !0,
    get: function() {
      return Yg1.emptyResource
    }
  });
  var VA6 = ob1();
  Object.defineProperty(LX, "defaultServiceName", {
    enumerable: !0,
    get: function() {
      return VA6.defaultServiceName
    }
  })
})
// @from(Start 4229817, End 4230635)
UM0 = z((wM0) => {
  Object.defineProperty(wM0, "__esModule", {
    value: !0
  });
  wM0.ViewRegistry = void 0;
  class zM0 {
    _registeredViews = [];
    addView(A) {
      this._registeredViews.push(A)
    }
    findViews(A, B) {
      return this._registeredViews.filter((I) => {
        return this._matchInstrument(I.instrumentSelector, A) && this._matchMeter(I.meterSelector, B)
      })
    }
    _matchInstrument(A, B) {
      return (A.getType() === void 0 || B.type === A.getType()) && A.getNameFilter().match(B.name) && A.getUnitFilter().match(B.unit)
    }
    _matchMeter(A, B) {
      return A.getNameFilter().match(B.name) && (B.version === void 0 || A.getVersionFilter().match(B.version)) && (B.schemaUrl === void 0 || A.getSchemaUrlFilter().match(B.schemaUrl))
    }
  }
  wM0.ViewRegistry = zM0
})
// @from(Start 4230641, End 4231907)
Ss = z((qM0) => {
  Object.defineProperty(qM0, "__esModule", {
    value: !0
  });
  qM0.isValidName = qM0.isDescriptorCompatibleWith = qM0.createInstrumentDescriptorWithView = qM0.createInstrumentDescriptor = void 0;
  var NM0 = s9(),
    KA6 = gC();

  function HA6(A, B, Q) {
    if (!$M0(A)) NM0.diag.warn(`Invalid metric name: "${A}". The metric name should be a ASCII string with a length no greater than 255 characters.`);
    return {
      name: A,
      type: B,
      description: Q?.description ?? "",
      unit: Q?.unit ?? "",
      valueType: Q?.valueType ?? NM0.ValueType.DOUBLE,
      advice: Q?.advice ?? {}
    }
  }
  qM0.createInstrumentDescriptor = HA6;

  function zA6(A, B) {
    return {
      name: A.name ?? B.name,
      description: A.description ?? B.description,
      type: B.type,
      unit: B.unit,
      valueType: B.valueType,
      advice: B.advice
    }
  }
  qM0.createInstrumentDescriptorWithView = zA6;

  function wA6(A, B) {
    return KA6.equalsCaseInsensitive(A.name, B.name) && A.unit === B.unit && A.type === B.type && A.valueType === B.valueType
  }
  qM0.isDescriptorCompatibleWith = wA6;
  var EA6 = /^[a-z][a-z0-9_.\-/]{0,254}$/i;

  function $M0(A) {
    return A.match(EA6) != null
  }
  qM0.isValidName = $M0
})
// @from(Start 4231913, End 4234495)
qZ1 = z((jM0) => {
  Object.defineProperty(jM0, "__esModule", {
    value: !0
  });
  jM0.isObservableInstrument = jM0.ObservableUpDownCounterInstrument = jM0.ObservableGaugeInstrument = jM0.ObservableCounterInstrument = jM0.ObservableInstrument = jM0.HistogramInstrument = jM0.GaugeInstrument = jM0.CounterInstrument = jM0.UpDownCounterInstrument = jM0.SyncInstrument = void 0;
  var vg = s9(),
    qA6 = p8();
  class bg {
    _writableMetricStorage;
    _descriptor;
    constructor(A, B) {
      this._writableMetricStorage = A, this._descriptor = B
    }
    _record(A, B = {}, Q = vg.context.active()) {
      if (typeof A !== "number") {
        vg.diag.warn(`non-number value provided to metric ${this._descriptor.name}: ${A}`);
        return
      }
      if (this._descriptor.valueType === vg.ValueType.INT && !Number.isInteger(A)) {
        if (vg.diag.warn(`INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`), A = Math.trunc(A), !Number.isInteger(A)) return
      }
      this._writableMetricStorage.record(A, B, Q, qA6.millisToHrTime(Date.now()))
    }
  }
  jM0.SyncInstrument = bg;
  class LM0 extends bg {
    add(A, B, Q) {
      this._record(A, B, Q)
    }
  }
  jM0.UpDownCounterInstrument = LM0;
  class RM0 extends bg {
    add(A, B, Q) {
      if (A < 0) {
        vg.diag.warn(`negative value provided to counter ${this._descriptor.name}: ${A}`);
        return
      }
      this._record(A, B, Q)
    }
  }
  jM0.CounterInstrument = RM0;
  class OM0 extends bg {
    record(A, B, Q) {
      this._record(A, B, Q)
    }
  }
  jM0.GaugeInstrument = OM0;
  class TM0 extends bg {
    record(A, B, Q) {
      if (A < 0) {
        vg.diag.warn(`negative value provided to histogram ${this._descriptor.name}: ${A}`);
        return
      }
      this._record(A, B, Q)
    }
  }
  jM0.HistogramInstrument = TM0;
  class gg {
    _observableRegistry;
    _metricStorages;
    _descriptor;
    constructor(A, B, Q) {
      this._observableRegistry = Q, this._descriptor = A, this._metricStorages = B
    }
    addCallback(A) {
      this._observableRegistry.addCallback(A, this)
    }
    removeCallback(A) {
      this._observableRegistry.removeCallback(A, this)
    }
  }
  jM0.ObservableInstrument = gg;
  class PM0 extends gg {}
  jM0.ObservableCounterInstrument = PM0;
  class SM0 extends gg {}
  jM0.ObservableGaugeInstrument = SM0;
  class _M0 extends gg {}
  jM0.ObservableUpDownCounterInstrument = _M0;

  function MA6(A) {
    return A instanceof gg
  }
  jM0.isObservableInstrument = MA6
})
// @from(Start 4234501, End 4236790)
vM0 = z((xM0) => {
  Object.defineProperty(xM0, "__esModule", {
    value: !0
  });
  xM0.Meter = void 0;
  var h_ = Ss(),
    m_ = qZ1(),
    d_ = tL();
  class kM0 {
    _meterSharedState;
    constructor(A) {
      this._meterSharedState = A
    }
    createGauge(A, B) {
      let Q = h_.createInstrumentDescriptor(A, d_.InstrumentType.GAUGE, B),
        I = this._meterSharedState.registerMetricStorage(Q);
      return new m_.GaugeInstrument(I, Q)
    }
    createHistogram(A, B) {
      let Q = h_.createInstrumentDescriptor(A, d_.InstrumentType.HISTOGRAM, B),
        I = this._meterSharedState.registerMetricStorage(Q);
      return new m_.HistogramInstrument(I, Q)
    }
    createCounter(A, B) {
      let Q = h_.createInstrumentDescriptor(A, d_.InstrumentType.COUNTER, B),
        I = this._meterSharedState.registerMetricStorage(Q);
      return new m_.CounterInstrument(I, Q)
    }
    createUpDownCounter(A, B) {
      let Q = h_.createInstrumentDescriptor(A, d_.InstrumentType.UP_DOWN_COUNTER, B),
        I = this._meterSharedState.registerMetricStorage(Q);
      return new m_.UpDownCounterInstrument(I, Q)
    }
    createObservableGauge(A, B) {
      let Q = h_.createInstrumentDescriptor(A, d_.InstrumentType.OBSERVABLE_GAUGE, B),
        I = this._meterSharedState.registerAsyncMetricStorage(Q);
      return new m_.ObservableGaugeInstrument(Q, I, this._meterSharedState.observableRegistry)
    }
    createObservableCounter(A, B) {
      let Q = h_.createInstrumentDescriptor(A, d_.InstrumentType.OBSERVABLE_COUNTER, B),
        I = this._meterSharedState.registerAsyncMetricStorage(Q);
      return new m_.ObservableCounterInstrument(Q, I, this._meterSharedState.observableRegistry)
    }
    createObservableUpDownCounter(A, B) {
      let Q = h_.createInstrumentDescriptor(A, d_.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER, B),
        I = this._meterSharedState.registerAsyncMetricStorage(Q);
      return new m_.ObservableUpDownCounterInstrument(Q, I, this._meterSharedState.observableRegistry)
    }
    addBatchObservableCallback(A, B) {
      this._meterSharedState.observableRegistry.addBatchCallback(A, B)
    }
    removeBatchObservableCallback(A, B) {
      this._meterSharedState.observableRegistry.removeBatchCallback(A, B)
    }
  }
  xM0.Meter = kM0
})
// @from(Start 4236796, End 4237497)
Wg1 = z((gM0) => {
  Object.defineProperty(gM0, "__esModule", {
    value: !0
  });
  gM0.MetricStorage = void 0;
  var kA6 = Ss();
  class bM0 {
    _instrumentDescriptor;
    constructor(A) {
      this._instrumentDescriptor = A
    }
    getInstrumentDescriptor() {
      return this._instrumentDescriptor
    }
    updateDescription(A) {
      this._instrumentDescriptor = kA6.createInstrumentDescriptor(this._instrumentDescriptor.name, this._instrumentDescriptor.type, {
        description: A,
        valueType: this._instrumentDescriptor.valueType,
        unit: this._instrumentDescriptor.unit,
        advice: this._instrumentDescriptor.advice
      })
    }
  }
  gM0.MetricStorage = bM0
})
// @from(Start 4237503, End 4238833)
_s = z((dM0) => {
  Object.defineProperty(dM0, "__esModule", {
    value: !0
  });
  dM0.AttributeHashMap = dM0.HashMap = void 0;
  var xA6 = gC();
  class Jg1 {
    _hash;
    _valueMap = new Map;
    _keyMap = new Map;
    constructor(A) {
      this._hash = A
    }
    get(A, B) {
      return B ??= this._hash(A), this._valueMap.get(B)
    }
    getOrDefault(A, B) {
      let Q = this._hash(A);
      if (this._valueMap.has(Q)) return this._valueMap.get(Q);
      let I = B();
      if (!this._keyMap.has(Q)) this._keyMap.set(Q, A);
      return this._valueMap.set(Q, I), I
    }
    set(A, B, Q) {
      if (Q ??= this._hash(A), !this._keyMap.has(Q)) this._keyMap.set(Q, A);
      this._valueMap.set(Q, B)
    }
    has(A, B) {
      return B ??= this._hash(A), this._valueMap.has(B)
    }* keys() {
      let A = this._keyMap.entries(),
        B = A.next();
      while (B.done !== !0) yield [B.value[1], B.value[0]], B = A.next()
    }* entries() {
      let A = this._valueMap.entries(),
        B = A.next();
      while (B.done !== !0) yield [this._keyMap.get(B.value[0]), B.value[1], B.value[0]], B = A.next()
    }
    get size() {
      return this._valueMap.size
    }
  }
  dM0.HashMap = Jg1;
  class mM0 extends Jg1 {
    constructor() {
      super(xA6.hashAttributes)
    }
  }
  dM0.AttributeHashMap = mM0
})
// @from(Start 4238839, End 4240982)
Xg1 = z((cM0) => {
  Object.defineProperty(cM0, "__esModule", {
    value: !0
  });
  cM0.DeltaMetricProcessor = void 0;
  var vA6 = gC(),
    Fg1 = _s();
  class pM0 {
    _aggregator;
    _activeCollectionStorage = new Fg1.AttributeHashMap;
    _cumulativeMemoStorage = new Fg1.AttributeHashMap;
    _cardinalityLimit;
    _overflowAttributes = {
      "otel.metric.overflow": !0
    };
    _overflowHashCode;
    constructor(A, B) {
      this._aggregator = A, this._cardinalityLimit = (B ?? 2000) - 1, this._overflowHashCode = vA6.hashAttributes(this._overflowAttributes)
    }
    record(A, B, Q, I) {
      let G = this._activeCollectionStorage.get(B);
      if (!G) {
        if (this._activeCollectionStorage.size >= this._cardinalityLimit) {
          this._activeCollectionStorage.getOrDefault(this._overflowAttributes, () => this._aggregator.createAccumulation(I))?.record(A);
          return
        }
        G = this._aggregator.createAccumulation(I), this._activeCollectionStorage.set(B, G)
      }
      G?.record(A)
    }
    batchCumulate(A, B) {
      Array.from(A.entries()).forEach(([Q, I, G]) => {
        let Z = this._aggregator.createAccumulation(B);
        Z?.record(I);
        let D = Z;
        if (this._cumulativeMemoStorage.has(Q, G)) {
          let Y = this._cumulativeMemoStorage.get(Q, G);
          D = this._aggregator.diff(Y, Z)
        } else if (this._cumulativeMemoStorage.size >= this._cardinalityLimit) {
          if (Q = this._overflowAttributes, G = this._overflowHashCode, this._cumulativeMemoStorage.has(Q, G)) {
            let Y = this._cumulativeMemoStorage.get(Q, G);
            D = this._aggregator.diff(Y, Z)
          }
        }
        if (this._activeCollectionStorage.has(Q, G)) {
          let Y = this._activeCollectionStorage.get(Q, G);
          D = this._aggregator.merge(Y, D)
        }
        this._cumulativeMemoStorage.set(Q, Z, G), this._activeCollectionStorage.set(Q, D, G)
      })
    }
    collect() {
      let A = this._activeCollectionStorage;
      return this._activeCollectionStorage = new Fg1.AttributeHashMap, A
    }
  }
  cM0.DeltaMetricProcessor = pM0
})
// @from(Start 4240988, End 4243291)
Vg1 = z((iM0) => {
  Object.defineProperty(iM0, "__esModule", {
    value: !0
  });
  iM0.TemporalMetricProcessor = void 0;
  var bA6 = oG1(),
    gA6 = _s();
  class js {
    _aggregator;
    _unreportedAccumulations = new Map;
    _reportHistory = new Map;
    constructor(A, B) {
      this._aggregator = A, B.forEach((Q) => {
        this._unreportedAccumulations.set(Q, [])
      })
    }
    buildMetrics(A, B, Q, I) {
      this._stashAccumulations(Q);
      let G = this._getMergedUnreportedAccumulations(A),
        Z = G,
        D;
      if (this._reportHistory.has(A)) {
        let W = this._reportHistory.get(A),
          J = W.collectionTime;
        if (D = W.aggregationTemporality, D === bA6.AggregationTemporality.CUMULATIVE) Z = js.merge(W.accumulations, G, this._aggregator);
        else Z = js.calibrateStartTime(W.accumulations, G, J)
      } else D = A.selectAggregationTemporality(B.type);
      this._reportHistory.set(A, {
        accumulations: Z,
        collectionTime: I,
        aggregationTemporality: D
      });
      let Y = hA6(Z);
      if (Y.length === 0) return;
      return this._aggregator.toMetricData(B, D, Y, I)
    }
    _stashAccumulations(A) {
      let B = this._unreportedAccumulations.keys();
      for (let Q of B) {
        let I = this._unreportedAccumulations.get(Q);
        if (I === void 0) I = [], this._unreportedAccumulations.set(Q, I);
        I.push(A)
      }
    }
    _getMergedUnreportedAccumulations(A) {
      let B = new gA6.AttributeHashMap,
        Q = this._unreportedAccumulations.get(A);
      if (this._unreportedAccumulations.set(A, []), Q === void 0) return B;
      for (let I of Q) B = js.merge(B, I, this._aggregator);
      return B
    }
    static merge(A, B, Q) {
      let I = A,
        G = B.entries(),
        Z = G.next();
      while (Z.done !== !0) {
        let [D, Y, W] = Z.value;
        if (A.has(D, W)) {
          let J = A.get(D, W),
            F = Q.merge(J, Y);
          I.set(D, F, W)
        } else I.set(D, Y, W);
        Z = G.next()
      }
      return I
    }
    static calibrateStartTime(A, B, Q) {
      for (let [I, G] of A.keys()) B.get(I, G)?.setStartTime(Q);
      return B
    }
  }
  iM0.TemporalMetricProcessor = js;

  function hA6(A) {
    return Array.from(A.entries())
  }
})
// @from(Start 4243297, End 4244363)
oM0 = z((sM0) => {
  Object.defineProperty(sM0, "__esModule", {
    value: !0
  });
  sM0.AsyncMetricStorage = void 0;
  var mA6 = Wg1(),
    dA6 = Xg1(),
    uA6 = Vg1(),
    pA6 = _s();
  class aM0 extends mA6.MetricStorage {
    _attributesProcessor;
    _aggregationCardinalityLimit;
    _deltaMetricStorage;
    _temporalMetricStorage;
    constructor(A, B, Q, I, G) {
      super(A);
      this._attributesProcessor = Q, this._aggregationCardinalityLimit = G, this._deltaMetricStorage = new dA6.DeltaMetricProcessor(B, this._aggregationCardinalityLimit), this._temporalMetricStorage = new uA6.TemporalMetricProcessor(B, I)
    }
    record(A, B) {
      let Q = new pA6.AttributeHashMap;
      Array.from(A.entries()).forEach(([I, G]) => {
        Q.set(this._attributesProcessor.process(I), G)
      }), this._deltaMetricStorage.batchCumulate(Q, B)
    }
    collect(A, B) {
      let Q = this._deltaMetricStorage.collect();
      return this._temporalMetricStorage.buildMetrics(A, this._instrumentDescriptor, Q, B)
    }
  }
  sM0.AsyncMetricStorage = aM0
})
// @from(Start 4244369, End 4246652)
GL0 = z((QL0) => {
  Object.defineProperty(QL0, "__esModule", {
    value: !0
  });
  QL0.getConflictResolutionRecipe = QL0.getDescriptionResolutionRecipe = QL0.getTypeConflictResolutionRecipe = QL0.getUnitConflictResolutionRecipe = QL0.getValueTypeConflictResolutionRecipe = QL0.getIncompatibilityDetails = void 0;

  function cA6(A, B) {
    let Q = "";
    if (A.unit !== B.unit) Q += `	- Unit '${A.unit}' does not match '${B.unit}'
`;
    if (A.type !== B.type) Q += `	- Type '${A.type}' does not match '${B.type}'
`;
    if (A.valueType !== B.valueType) Q += `	- Value Type '${A.valueType}' does not match '${B.valueType}'
`;
    if (A.description !== B.description) Q += `	- Description '${A.description}' does not match '${B.description}'
`;
    return Q
  }
  QL0.getIncompatibilityDetails = cA6;

  function tM0(A, B) {
    return `	- use valueType '${A.valueType}' on instrument creation or use an instrument name other than '${B.name}'`
  }
  QL0.getValueTypeConflictResolutionRecipe = tM0;

  function eM0(A, B) {
    return `	- use unit '${A.unit}' on instrument creation or use an instrument name other than '${B.name}'`
  }
  QL0.getUnitConflictResolutionRecipe = eM0;

  function AL0(A, B) {
    let Q = {
        name: B.name,
        type: B.type,
        unit: B.unit
      },
      I = JSON.stringify(Q);
    return `	- create a new view with a name other than '${A.name}' and InstrumentSelector '${I}'`
  }
  QL0.getTypeConflictResolutionRecipe = AL0;

  function BL0(A, B) {
    let Q = {
        name: B.name,
        type: B.type,
        unit: B.unit
      },
      I = JSON.stringify(Q);
    return `	- create a new view with a name other than '${A.name}' and InstrumentSelector '${I}'
    	- OR - create a new view with the name ${A.name} and description '${A.description}' and InstrumentSelector ${I}
    	- OR - create a new view with the name ${B.name} and description '${A.description}' and InstrumentSelector ${I}`
  }
  QL0.getDescriptionResolutionRecipe = BL0;

  function lA6(A, B) {
    if (A.valueType !== B.valueType) return tM0(A, B);
    if (A.unit !== B.unit) return eM0(A, B);
    if (A.type !== B.type) return AL0(A, B);
    if (A.description !== B.description) return BL0(A, B);
    return ""
  }
  QL0.getConflictResolutionRecipe = lA6
})
// @from(Start 4246658, End 4249177)
WL0 = z((DL0) => {
  Object.defineProperty(DL0, "__esModule", {
    value: !0
  });
  DL0.MetricStorageRegistry = void 0;
  var oA6 = Ss(),
    ZL0 = s9(),
    MZ1 = GL0();
  class Cg1 {
    _sharedRegistry = new Map;
    _perCollectorRegistry = new Map;
    static create() {
      return new Cg1
    }
    getStorages(A) {
      let B = [];
      for (let I of this._sharedRegistry.values()) B = B.concat(I);
      let Q = this._perCollectorRegistry.get(A);
      if (Q != null)
        for (let I of Q.values()) B = B.concat(I);
      return B
    }
    register(A) {
      this._registerStorage(A, this._sharedRegistry)
    }
    registerForCollector(A, B) {
      let Q = this._perCollectorRegistry.get(A);
      if (Q == null) Q = new Map, this._perCollectorRegistry.set(A, Q);
      this._registerStorage(B, Q)
    }
    findOrUpdateCompatibleStorage(A) {
      let B = this._sharedRegistry.get(A.name);
      if (B === void 0) return null;
      return this._findOrUpdateCompatibleStorage(A, B)
    }
    findOrUpdateCompatibleCollectorStorage(A, B) {
      let Q = this._perCollectorRegistry.get(A);
      if (Q === void 0) return null;
      let I = Q.get(B.name);
      if (I === void 0) return null;
      return this._findOrUpdateCompatibleStorage(B, I)
    }
    _registerStorage(A, B) {
      let Q = A.getInstrumentDescriptor(),
        I = B.get(Q.name);
      if (I === void 0) {
        B.set(Q.name, [A]);
        return
      }
      I.push(A)
    }
    _findOrUpdateCompatibleStorage(A, B) {
      let Q = null;
      for (let I of B) {
        let G = I.getInstrumentDescriptor();
        if (oA6.isDescriptorCompatibleWith(G, A)) {
          if (G.description !== A.description) {
            if (A.description.length > G.description.length) I.updateDescription(A.description);
            ZL0.diag.warn("A view or instrument with the name ", A.name, ` has already been registered, but has a different description and is incompatible with another registered view.
`, `Details:
`, MZ1.getIncompatibilityDetails(G, A), `The longer description will be used.
To resolve the conflict:`, MZ1.getConflictResolutionRecipe(G, A))
          }
          Q = I
        } else ZL0.diag.warn("A view or instrument with the name ", A.name, ` has already been registered and is incompatible with another registered view.
`, `Details:
`, MZ1.getIncompatibilityDetails(G, A), `To resolve the conflict:
`, MZ1.getConflictResolutionRecipe(G, A))
      }
      return Q
    }
  }
  DL0.MetricStorageRegistry = Cg1
})
// @from(Start 4249183, End 4249548)
VL0 = z((FL0) => {
  Object.defineProperty(FL0, "__esModule", {
    value: !0
  });
  FL0.MultiMetricStorage = void 0;
  class JL0 {
    _backingStorages;
    constructor(A) {
      this._backingStorages = A
    }
    record(A, B, Q, I) {
      this._backingStorages.forEach((G) => {
        G.record(A, B, Q, I)
      })
    }
  }
  FL0.MultiMetricStorage = JL0
})
// @from(Start 4249554, End 4251167)
EL0 = z((zL0) => {
  Object.defineProperty(zL0, "__esModule", {
    value: !0
  });
  zL0.BatchObservableResultImpl = zL0.ObservableResultImpl = void 0;
  var hg = s9(),
    CL0 = _s(),
    tA6 = qZ1();
  class KL0 {
    _instrumentName;
    _valueType;
    _buffer = new CL0.AttributeHashMap;
    constructor(A, B) {
      this._instrumentName = A, this._valueType = B
    }
    observe(A, B = {}) {
      if (typeof A !== "number") {
        hg.diag.warn(`non-number value provided to metric ${this._instrumentName}: ${A}`);
        return
      }
      if (this._valueType === hg.ValueType.INT && !Number.isInteger(A)) {
        if (hg.diag.warn(`INT value type cannot accept a floating-point value for ${this._instrumentName}, ignoring the fractional digits.`), A = Math.trunc(A), !Number.isInteger(A)) return
      }
      this._buffer.set(B, A)
    }
  }
  zL0.ObservableResultImpl = KL0;
  class HL0 {
    _buffer = new Map;
    observe(A, B, Q = {}) {
      if (!tA6.isObservableInstrument(A)) return;
      let I = this._buffer.get(A);
      if (I == null) I = new CL0.AttributeHashMap, this._buffer.set(A, I);
      if (typeof B !== "number") {
        hg.diag.warn(`non-number value provided to metric ${A._descriptor.name}: ${B}`);
        return
      }
      if (A._descriptor.valueType === hg.ValueType.INT && !Number.isInteger(B)) {
        if (hg.diag.warn(`INT value type cannot accept a floating-point value for ${A._descriptor.name}, ignoring the fractional digits.`), B = Math.trunc(B), !Number.isInteger(B)) return
      }
      I.set(Q, B)
    }
  }
  zL0.BatchObservableResultImpl = HL0
})
// @from(Start 4251173, End 4253810)
LL0 = z((qL0) => {
  Object.defineProperty(qL0, "__esModule", {
    value: !0
  });
  qL0.ObservableRegistry = void 0;
  var A06 = s9(),
    UL0 = qZ1(),
    NL0 = EL0(),
    ys = gC();
  class $L0 {
    _callbacks = [];
    _batchCallbacks = [];
    addCallback(A, B) {
      if (this._findCallback(A, B) >= 0) return;
      this._callbacks.push({
        callback: A,
        instrument: B
      })
    }
    removeCallback(A, B) {
      let Q = this._findCallback(A, B);
      if (Q < 0) return;
      this._callbacks.splice(Q, 1)
    }
    addBatchCallback(A, B) {
      let Q = new Set(B.filter(UL0.isObservableInstrument));
      if (Q.size === 0) {
        A06.diag.error("BatchObservableCallback is not associated with valid instruments", B);
        return
      }
      if (this._findBatchCallback(A, Q) >= 0) return;
      this._batchCallbacks.push({
        callback: A,
        instruments: Q
      })
    }
    removeBatchCallback(A, B) {
      let Q = new Set(B.filter(UL0.isObservableInstrument)),
        I = this._findBatchCallback(A, Q);
      if (I < 0) return;
      this._batchCallbacks.splice(I, 1)
    }
    async observe(A, B) {
      let Q = this._observeCallbacks(A, B),
        I = this._observeBatchCallbacks(A, B);
      return (await ys.PromiseAllSettled([...Q, ...I])).filter(ys.isPromiseAllSettledRejectionResult).map((D) => D.reason)
    }
    _observeCallbacks(A, B) {
      return this._callbacks.map(async ({
        callback: Q,
        instrument: I
      }) => {
        let G = new NL0.ObservableResultImpl(I._descriptor.name, I._descriptor.valueType),
          Z = Promise.resolve(Q(G));
        if (B != null) Z = ys.callWithTimeout(Z, B);
        await Z, I._metricStorages.forEach((D) => {
          D.record(G._buffer, A)
        })
      })
    }
    _observeBatchCallbacks(A, B) {
      return this._batchCallbacks.map(async ({
        callback: Q,
        instruments: I
      }) => {
        let G = new NL0.BatchObservableResultImpl,
          Z = Promise.resolve(Q(G));
        if (B != null) Z = ys.callWithTimeout(Z, B);
        await Z, I.forEach((D) => {
          let Y = G._buffer.get(D);
          if (Y == null) return;
          D._metricStorages.forEach((W) => {
            W.record(Y, A)
          })
        })
      })
    }
    _findCallback(A, B) {
      return this._callbacks.findIndex((Q) => {
        return Q.callback === A && Q.instrument === B
      })
    }
    _findBatchCallback(A, B) {
      return this._batchCallbacks.findIndex((Q) => {
        return Q.callback === A && ys.setEquals(Q.instruments, B)
      })
    }
  }
  qL0.ObservableRegistry = $L0
})
// @from(Start 4253816, End 4254763)
PL0 = z((OL0) => {
  Object.defineProperty(OL0, "__esModule", {
    value: !0
  });
  OL0.SyncMetricStorage = void 0;
  var B06 = Wg1(),
    Q06 = Xg1(),
    I06 = Vg1();
  class RL0 extends B06.MetricStorage {
    _attributesProcessor;
    _aggregationCardinalityLimit;
    _deltaMetricStorage;
    _temporalMetricStorage;
    constructor(A, B, Q, I, G) {
      super(A);
      this._attributesProcessor = Q, this._aggregationCardinalityLimit = G, this._deltaMetricStorage = new Q06.DeltaMetricProcessor(B, this._aggregationCardinalityLimit), this._temporalMetricStorage = new I06.TemporalMetricProcessor(B, I)
    }
    record(A, B, Q, I) {
      B = this._attributesProcessor.process(B, Q), this._deltaMetricStorage.record(A, B, Q, I)
    }
    collect(A, B) {
      let Q = this._deltaMetricStorage.collect();
      return this._temporalMetricStorage.buildMetrics(A, this._instrumentDescriptor, Q, B)
    }
  }
  OL0.SyncMetricStorage = RL0
})
// @from(Start 4254769, End 4256202)
LZ1 = z((kL0) => {
  Object.defineProperty(kL0, "__esModule", {
    value: !0
  });
  kL0.createDenyListAttributesProcessor = kL0.createAllowListAttributesProcessor = kL0.createMultiAttributesProcessor = kL0.createNoopAttributesProcessor = void 0;
  class SL0 {
    process(A, B) {
      return A
    }
  }
  class _L0 {
    _processors;
    constructor(A) {
      this._processors = A
    }
    process(A, B) {
      let Q = A;
      for (let I of this._processors) Q = I.process(Q, B);
      return Q
    }
  }
  class jL0 {
    _allowedAttributeNames;
    constructor(A) {
      this._allowedAttributeNames = A
    }
    process(A, B) {
      let Q = {};
      return Object.keys(A).filter((I) => this._allowedAttributeNames.includes(I)).forEach((I) => Q[I] = A[I]), Q
    }
  }
  class yL0 {
    _deniedAttributeNames;
    constructor(A) {
      this._deniedAttributeNames = A
    }
    process(A, B) {
      let Q = {};
      return Object.keys(A).filter((I) => !this._deniedAttributeNames.includes(I)).forEach((I) => Q[I] = A[I]), Q
    }
  }

  function G06() {
    return W06
  }
  kL0.createNoopAttributesProcessor = G06;

  function Z06(A) {
    return new _L0(A)
  }
  kL0.createMultiAttributesProcessor = Z06;

  function D06(A) {
    return new jL0(A)
  }
  kL0.createAllowListAttributesProcessor = D06;

  function Y06(A) {
    return new yL0(A)
  }
  kL0.createDenyListAttributesProcessor = Y06;
  var W06 = new SL0
})
// @from(Start 4256208, End 4258760)
gL0 = z((vL0) => {
  Object.defineProperty(vL0, "__esModule", {
    value: !0
  });
  vL0.MeterSharedState = void 0;
  var V06 = Ss(),
    C06 = vM0(),
    K06 = gC(),
    H06 = oM0(),
    z06 = WL0(),
    w06 = VL0(),
    E06 = LL0(),
    U06 = PL0(),
    N06 = LZ1();
  class fL0 {
    _meterProviderSharedState;
    _instrumentationScope;
    metricStorageRegistry = new z06.MetricStorageRegistry;
    observableRegistry = new E06.ObservableRegistry;
    meter;
    constructor(A, B) {
      this._meterProviderSharedState = A, this._instrumentationScope = B, this.meter = new C06.Meter(this)
    }
    registerMetricStorage(A) {
      let B = this._registerMetricStorage(A, U06.SyncMetricStorage);
      if (B.length === 1) return B[0];
      return new w06.MultiMetricStorage(B)
    }
    registerAsyncMetricStorage(A) {
      return this._registerMetricStorage(A, H06.AsyncMetricStorage)
    }
    async collect(A, B, Q) {
      let I = await this.observableRegistry.observe(B, Q?.timeoutMillis),
        G = this.metricStorageRegistry.getStorages(A);
      if (G.length === 0) return null;
      let Z = G.map((D) => {
        return D.collect(A, B)
      }).filter(K06.isNotNullish);
      if (Z.length === 0) return {
        errors: I
      };
      return {
        scopeMetrics: {
          scope: this._instrumentationScope,
          metrics: Z
        },
        errors: I
      }
    }
    _registerMetricStorage(A, B) {
      let I = this._meterProviderSharedState.viewRegistry.findViews(A, this._instrumentationScope).map((G) => {
        let Z = V06.createInstrumentDescriptorWithView(G, A),
          D = this.metricStorageRegistry.findOrUpdateCompatibleStorage(Z);
        if (D != null) return D;
        let Y = G.aggregation.createAggregator(Z),
          W = new B(Z, Y, G.attributesProcessor, this._meterProviderSharedState.metricCollectors, G.aggregationCardinalityLimit);
        return this.metricStorageRegistry.register(W), W
      });
      if (I.length === 0) {
        let Z = this._meterProviderSharedState.selectAggregations(A.type).map(([D, Y]) => {
          let W = this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(D, A);
          if (W != null) return W;
          let J = Y.createAggregator(A),
            F = D.selectCardinalityLimit(A.type),
            X = new B(A, J, N06.createNoopAttributesProcessor(), [D], F);
          return this.metricStorageRegistry.registerForCollector(D, X), X
        });
        I = I.concat(Z)
      }
      return I
    }
  }
  vL0.MeterSharedState = fL0
})
// @from(Start 4258766, End 4259580)
uL0 = z((mL0) => {
  Object.defineProperty(mL0, "__esModule", {
    value: !0
  });
  mL0.MeterProviderSharedState = void 0;
  var $06 = gC(),
    q06 = UM0(),
    M06 = gL0(),
    L06 = Rs();
  class hL0 {
    resource;
    viewRegistry = new q06.ViewRegistry;
    metricCollectors = [];
    meterSharedStates = new Map;
    constructor(A) {
      this.resource = A
    }
    getMeterSharedState(A) {
      let B = $06.instrumentationScopeId(A),
        Q = this.meterSharedStates.get(B);
      if (Q == null) Q = new M06.MeterSharedState(this, A), this.meterSharedStates.set(B, Q);
      return Q
    }
    selectAggregations(A) {
      let B = [];
      for (let Q of this.metricCollectors) B.push([Q, L06.toAggregation(Q.selectAggregation(A))]);
      return B
    }
  }
  mL0.MeterProviderSharedState = hL0
})
// @from(Start 4259586, End 4260882)
iL0 = z((cL0) => {
  Object.defineProperty(cL0, "__esModule", {
    value: !0
  });
  cL0.MetricCollector = void 0;
  var R06 = p8();
  class pL0 {
    _sharedState;
    _metricReader;
    constructor(A, B) {
      this._sharedState = A, this._metricReader = B
    }
    async collect(A) {
      let B = R06.millisToHrTime(Date.now()),
        Q = [],
        I = [],
        G = Array.from(this._sharedState.meterSharedStates.values()).map(async (Z) => {
          let D = await Z.collect(this, B, A);
          if (D?.scopeMetrics != null) Q.push(D.scopeMetrics);
          if (D?.errors != null) I.push(...D.errors)
        });
      return await Promise.all(G), {
        resourceMetrics: {
          resource: this._sharedState.resource,
          scopeMetrics: Q
        },
        errors: I
      }
    }
    async forceFlush(A) {
      await this._metricReader.forceFlush(A)
    }
    async shutdown(A) {
      await this._metricReader.shutdown(A)
    }
    selectAggregationTemporality(A) {
      return this._metricReader.selectAggregationTemporality(A)
    }
    selectAggregation(A) {
      return this._metricReader.selectAggregation(A)
    }
    selectCardinalityLimit(A) {
      return this._metricReader.selectCardinalityLimit?.(A) ?? 2000
    }
  }
  cL0.MetricCollector = pL0
})
// @from(Start 4260888, End 4261832)
RZ1 = z((aL0) => {
  Object.defineProperty(aL0, "__esModule", {
    value: !0
  });
  aL0.ExactPredicate = aL0.PatternPredicate = void 0;
  var O06 = /[\^$\\.+?()[\]{}|]/g;
  class Kg1 {
    _matchAll;
    _regexp;
    constructor(A) {
      if (A === "*") this._matchAll = !0, this._regexp = /.*/;
      else this._matchAll = !1, this._regexp = new RegExp(Kg1.escapePattern(A))
    }
    match(A) {
      if (this._matchAll) return !0;
      return this._regexp.test(A)
    }
    static escapePattern(A) {
      return `^${A.replace(O06,"\\$&").replace("*",".*")}$`
    }
    static hasWildcard(A) {
      return A.includes("*")
    }
  }
  aL0.PatternPredicate = Kg1;
  class nL0 {
    _matchAll;
    _pattern;
    constructor(A) {
      this._matchAll = A === void 0, this._pattern = A
    }
    match(A) {
      if (this._matchAll) return !0;
      if (A === this._pattern) return !0;
      return !1
    }
  }
  aL0.ExactPredicate = nL0
})
// @from(Start 4261838, End 4262401)
AR0 = z((tL0) => {
  Object.defineProperty(tL0, "__esModule", {
    value: !0
  });
  tL0.InstrumentSelector = void 0;
  var rL0 = RZ1();
  class oL0 {
    _nameFilter;
    _type;
    _unitFilter;
    constructor(A) {
      this._nameFilter = new rL0.PatternPredicate(A?.name ?? "*"), this._type = A?.type, this._unitFilter = new rL0.ExactPredicate(A?.unit)
    }
    getType() {
      return this._type
    }
    getNameFilter() {
      return this._nameFilter
    }
    getUnitFilter() {
      return this._unitFilter
    }
  }
  tL0.InstrumentSelector = oL0
})
// @from(Start 4262407, End 4263039)
GR0 = z((QR0) => {
  Object.defineProperty(QR0, "__esModule", {
    value: !0
  });
  QR0.MeterSelector = void 0;
  var Hg1 = RZ1();
  class BR0 {
    _nameFilter;
    _versionFilter;
    _schemaUrlFilter;
    constructor(A) {
      this._nameFilter = new Hg1.ExactPredicate(A?.name), this._versionFilter = new Hg1.ExactPredicate(A?.version), this._schemaUrlFilter = new Hg1.ExactPredicate(A?.schemaUrl)
    }
    getNameFilter() {
      return this._nameFilter
    }
    getVersionFilter() {
      return this._versionFilter
    }
    getSchemaUrlFilter() {
      return this._schemaUrlFilter
    }
  }
  QR0.MeterSelector = BR0
})
// @from(Start 4263045, End 4264759)
FR0 = z((WR0) => {
  Object.defineProperty(WR0, "__esModule", {
    value: !0
  });
  WR0.View = void 0;
  var P06 = RZ1(),
    ZR0 = LZ1(),
    S06 = AR0(),
    _06 = GR0(),
    DR0 = Rs();

  function j06(A) {
    return A.instrumentName == null && A.instrumentType == null && A.instrumentUnit == null && A.meterName == null && A.meterVersion == null && A.meterSchemaUrl == null
  }

  function y06(A) {
    if (j06(A)) throw new Error("Cannot create view with no selector arguments supplied");
    if (A.name != null && (A?.instrumentName == null || P06.PatternPredicate.hasWildcard(A.instrumentName))) throw new Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.")
  }
  class YR0 {
    name;
    description;
    aggregation;
    attributesProcessor;
    instrumentSelector;
    meterSelector;
    aggregationCardinalityLimit;
    constructor(A) {
      if (y06(A), A.attributesProcessors != null) this.attributesProcessor = ZR0.createMultiAttributesProcessor(A.attributesProcessors);
      else this.attributesProcessor = ZR0.createNoopAttributesProcessor();
      this.name = A.name, this.description = A.description, this.aggregation = DR0.toAggregation(A.aggregation ?? {
        type: DR0.AggregationType.DEFAULT
      }), this.instrumentSelector = new S06.InstrumentSelector({
        name: A.instrumentName,
        type: A.instrumentType,
        unit: A.instrumentUnit
      }), this.meterSelector = new _06.MeterSelector({
        name: A.meterName,
        version: A.meterVersion,
        schemaUrl: A.meterSchemaUrl
      }), this.aggregationCardinalityLimit = A.aggregationCardinalityLimit
    }
  }
  WR0.View = YR0
})
// @from(Start 4264765, End 4266417)
KR0 = z((VR0) => {
  Object.defineProperty(VR0, "__esModule", {
    value: !0
  });
  VR0.MeterProvider = void 0;
  var OZ1 = s9(),
    k06 = $Z1(),
    x06 = uL0(),
    f06 = iL0(),
    v06 = FR0();
  class XR0 {
    _sharedState;
    _shutdown = !1;
    constructor(A) {
      if (this._sharedState = new x06.MeterProviderSharedState(A?.resource ?? k06.defaultResource()), A?.views != null && A.views.length > 0)
        for (let B of A.views) this._sharedState.viewRegistry.addView(new v06.View(B));
      if (A?.readers != null && A.readers.length > 0)
        for (let B of A.readers) {
          let Q = new f06.MetricCollector(this._sharedState, B);
          B.setMetricProducer(Q), this._sharedState.metricCollectors.push(Q)
        }
    }
    getMeter(A, B = "", Q = {}) {
      if (this._shutdown) return OZ1.diag.warn("A shutdown MeterProvider cannot provide a Meter"), OZ1.createNoopMeter();
      return this._sharedState.getMeterSharedState({
        name: A,
        version: B,
        schemaUrl: Q.schemaUrl
      }).meter
    }
    async shutdown(A) {
      if (this._shutdown) {
        OZ1.diag.warn("shutdown may only be called once per MeterProvider");
        return
      }
      this._shutdown = !0, await Promise.all(this._sharedState.metricCollectors.map((B) => {
        return B.shutdown(A)
      }))
    }
    async forceFlush(A) {
      if (this._shutdown) {
        OZ1.diag.warn("invalid attempt to force flush after MeterProvider shutdown");
        return
      }
      await Promise.all(this._sharedState.metricCollectors.map((B) => {
        return B.forceFlush(A)
      }))
    }
  }
  VR0.MeterProvider = XR0
})
// @from(Start 4266423, End 4268766)
QR = z((mY) => {
  Object.defineProperty(mY, "__esModule", {
    value: !0
  });
  mY.TimeoutError = mY.createDenyListAttributesProcessor = mY.createAllowListAttributesProcessor = mY.AggregationType = mY.MeterProvider = mY.ConsoleMetricExporter = mY.InMemoryMetricExporter = mY.PeriodicExportingMetricReader = mY.MetricReader = mY.InstrumentType = mY.DataPointType = mY.AggregationTemporality = void 0;
  var b06 = oG1();
  Object.defineProperty(mY, "AggregationTemporality", {
    enumerable: !0,
    get: function() {
      return b06.AggregationTemporality
    }
  });
  var HR0 = tL();
  Object.defineProperty(mY, "DataPointType", {
    enumerable: !0,
    get: function() {
      return HR0.DataPointType
    }
  });
  Object.defineProperty(mY, "InstrumentType", {
    enumerable: !0,
    get: function() {
      return HR0.InstrumentType
    }
  });
  var g06 = ib1();
  Object.defineProperty(mY, "MetricReader", {
    enumerable: !0,
    get: function() {
      return g06.MetricReader
    }
  });
  var h06 = s$0();
  Object.defineProperty(mY, "PeriodicExportingMetricReader", {
    enumerable: !0,
    get: function() {
      return h06.PeriodicExportingMetricReader
    }
  });
  var m06 = Aq0();
  Object.defineProperty(mY, "InMemoryMetricExporter", {
    enumerable: !0,
    get: function() {
      return m06.InMemoryMetricExporter
    }
  });
  var d06 = Gq0();
  Object.defineProperty(mY, "ConsoleMetricExporter", {
    enumerable: !0,
    get: function() {
      return d06.ConsoleMetricExporter
    }
  });
  var u06 = KR0();
  Object.defineProperty(mY, "MeterProvider", {
    enumerable: !0,
    get: function() {
      return u06.MeterProvider
    }
  });
  var p06 = Rs();
  Object.defineProperty(mY, "AggregationType", {
    enumerable: !0,
    get: function() {
      return p06.AggregationType
    }
  });
  var zR0 = LZ1();
  Object.defineProperty(mY, "createAllowListAttributesProcessor", {
    enumerable: !0,
    get: function() {
      return zR0.createAllowListAttributesProcessor
    }
  });
  Object.defineProperty(mY, "createDenyListAttributesProcessor", {
    enumerable: !0,
    get: function() {
      return zR0.createDenyListAttributesProcessor
    }
  });
  var c06 = gC();
  Object.defineProperty(mY, "TimeoutError", {
    enumerable: !0,
    get: function() {
      return c06.TimeoutError
    }
  })
})
// @from(Start 4268772, End 4269130)
wg1 = z((wR0) => {
  Object.defineProperty(wR0, "__esModule", {
    value: !0
  });
  wR0.AggregationTemporalityPreference = void 0;
  var i06;
  (function(A) {
    A[A.DELTA = 0] = "DELTA", A[A.CUMULATIVE = 1] = "CUMULATIVE", A[A.LOWMEMORY = 2] = "LOWMEMORY"
  })(i06 = wR0.AggregationTemporalityPreference || (wR0.AggregationTemporalityPreference = {}))
})
// @from(Start 4269136, End 4269557)
$R0 = z((UR0) => {
  Object.defineProperty(UR0, "__esModule", {
    value: !0
  });
  UR0.OTLPExporterBase = void 0;
  class ER0 {
    _delegate;
    constructor(A) {
      this._delegate = A
    }
    export (A, B) {
      this._delegate.export(A, B)
    }
    forceFlush() {
      return this._delegate.forceFlush()
    }
    shutdown() {
      return this._delegate.shutdown()
    }
  }
  UR0.OTLPExporterBase = ER0
})
// @from(Start 4269563, End 4269881)
TZ1 = z((MR0) => {
  Object.defineProperty(MR0, "__esModule", {
    value: !0
  });
  MR0.OTLPExporterError = void 0;
  class qR0 extends Error {
    code;
    name = "OTLPExporterError";
    data;
    constructor(A, B, Q) {
      super(A);
      this.data = Q, this.code = B
    }
  }
  MR0.OTLPExporterError = qR0
})
// @from(Start 4269887, End 4270965)
ks = z((OR0) => {
  Object.defineProperty(OR0, "__esModule", {
    value: !0
  });
  OR0.getSharedConfigurationDefaults = OR0.mergeOtlpSharedConfigurationWithDefaults = OR0.wrapStaticHeadersInFunction = OR0.validateTimeoutMillis = void 0;

  function RR0(A) {
    if (Number.isFinite(A) && A > 0) return A;
    throw new Error(`Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '${A}')`)
  }
  OR0.validateTimeoutMillis = RR0;

  function n06(A) {
    if (A == null) return;
    return () => A
  }
  OR0.wrapStaticHeadersInFunction = n06;

  function a06(A, B, Q) {
    return {
      timeoutMillis: RR0(A.timeoutMillis ?? B.timeoutMillis ?? Q.timeoutMillis),
      concurrencyLimit: A.concurrencyLimit ?? B.concurrencyLimit ?? Q.concurrencyLimit,
      compression: A.compression ?? B.compression ?? Q.compression
    }
  }
  OR0.mergeOtlpSharedConfigurationWithDefaults = a06;

  function s06() {
    return {
      timeoutMillis: 1e4,
      concurrencyLimit: 30,
      compression: "none"
    }
  }
  OR0.getSharedConfigurationDefaults = s06
})
// @from(Start 4270971, End 4271231)
SR0 = z((PR0) => {
  Object.defineProperty(PR0, "__esModule", {
    value: !0
  });
  PR0.CompressionAlgorithm = void 0;
  var e06;
  (function(A) {
    A.NONE = "none", A.GZIP = "gzip"
  })(e06 = PR0.CompressionAlgorithm || (PR0.CompressionAlgorithm = {}))
})
// @from(Start 4271237, End 4272082)
Ug1 = z((jR0) => {
  Object.defineProperty(jR0, "__esModule", {
    value: !0
  });
  jR0.createBoundedQueueExportPromiseHandler = void 0;
  class _R0 {
    _concurrencyLimit;
    _sendingPromises = [];
    constructor(A) {
      this._concurrencyLimit = A
    }
    pushPromise(A) {
      if (this.hasReachedLimit()) throw new Error("Concurrency Limit reached");
      this._sendingPromises.push(A);
      let B = () => {
        let Q = this._sendingPromises.indexOf(A);
        this._sendingPromises.splice(Q, 1)
      };
      A.then(B, B)
    }
    hasReachedLimit() {
      return this._sendingPromises.length >= this._concurrencyLimit
    }
    async awaitAll() {
      await Promise.all(this._sendingPromises)
    }
  }

  function A26(A) {
    return new _R0(A.concurrencyLimit)
  }
  jR0.createBoundedQueueExportPromiseHandler = A26
})
// @from(Start 4272088, End 4272687)
fR0 = z((kR0) => {
  Object.defineProperty(kR0, "__esModule", {
    value: !0
  });
  kR0.createLoggingPartialSuccessResponseHandler = void 0;
  var B26 = s9();

  function Q26(A) {
    return Object.prototype.hasOwnProperty.call(A, "partialSuccess")
  }

  function I26() {
    return {
      handleResponse(A) {
        if (A == null || !Q26(A) || A.partialSuccess == null || Object.keys(A.partialSuccess).length === 0) return;
        B26.diag.warn("Received Partial Success response:", JSON.stringify(A.partialSuccess))
      }
    }
  }
  kR0.createLoggingPartialSuccessResponseHandler = I26
})
// @from(Start 4272693, End 4275277)
Ng1 = z((gR0) => {
  Object.defineProperty(gR0, "__esModule", {
    value: !0
  });
  gR0.createOtlpExportDelegate = void 0;
  var u_ = p8(),
    vR0 = TZ1(),
    G26 = fR0(),
    Z26 = s9();
  class bR0 {
    _transport;
    _serializer;
    _responseHandler;
    _promiseQueue;
    _timeout;
    _diagLogger;
    constructor(A, B, Q, I, G) {
      this._transport = A, this._serializer = B, this._responseHandler = Q, this._promiseQueue = I, this._timeout = G, this._diagLogger = Z26.diag.createComponentLogger({
        namespace: "OTLPExportDelegate"
      })
    }
    export (A, B) {
      if (this._diagLogger.debug("items to be sent", A), this._promiseQueue.hasReachedLimit()) {
        B({
          code: u_.ExportResultCode.FAILED,
          error: new Error("Concurrent export limit reached")
        });
        return
      }
      let Q = this._serializer.serializeRequest(A);
      if (Q == null) {
        B({
          code: u_.ExportResultCode.FAILED,
          error: new Error("Nothing to send")
        });
        return
      }
      this._promiseQueue.pushPromise(this._transport.send(Q, this._timeout).then((I) => {
        if (I.status === "success") {
          if (I.data != null) try {
            this._responseHandler.handleResponse(this._serializer.deserializeResponse(I.data))
          } catch (G) {
            this._diagLogger.warn("Export succeeded but could not deserialize response - is the response specification compliant?", G, I.data)
          }
          B({
            code: u_.ExportResultCode.SUCCESS
          });
          return
        } else if (I.status === "failure" && I.error) {
          B({
            code: u_.ExportResultCode.FAILED,
            error: I.error
          });
          return
        } else if (I.status === "retryable") B({
          code: u_.ExportResultCode.FAILED,
          error: new vR0.OTLPExporterError("Export failed with retryable status")
        });
        else B({
          code: u_.ExportResultCode.FAILED,
          error: new vR0.OTLPExporterError("Export failed with unknown error")
        })
      }, (I) => B({
        code: u_.ExportResultCode.FAILED,
        error: I
      })))
    }
    forceFlush() {
      return this._promiseQueue.awaitAll()
    }
    async shutdown() {
      this._diagLogger.debug("shutdown started"), await this.forceFlush(), this._transport.shutdown()
    }
  }

  function D26(A, B) {
    return new bR0(A.transport, A.serializer, G26.createLoggingPartialSuccessResponseHandler(), A.promiseHandler, B.timeout)
  }
  gR0.createOtlpExportDelegate = D26
})
// @from(Start 4275283, End 4275726)
uR0 = z((mR0) => {
  Object.defineProperty(mR0, "__esModule", {
    value: !0
  });
  mR0.createOtlpNetworkExportDelegate = void 0;
  var Y26 = Ug1(),
    W26 = Ng1();

  function J26(A, B, Q) {
    return W26.createOtlpExportDelegate({
      transport: Q,
      serializer: B,
      promiseHandler: Y26.createBoundedQueueExportPromiseHandler(A)
    }, {
      timeout: A.timeoutMillis
    })
  }
  mR0.createOtlpNetworkExportDelegate = J26
})
// @from(Start 4275732, End 4277052)
p_ = z((IR) => {
  Object.defineProperty(IR, "__esModule", {
    value: !0
  });
  IR.createOtlpNetworkExportDelegate = IR.CompressionAlgorithm = IR.getSharedConfigurationDefaults = IR.mergeOtlpSharedConfigurationWithDefaults = IR.OTLPExporterError = IR.OTLPExporterBase = void 0;
  var F26 = $R0();
  Object.defineProperty(IR, "OTLPExporterBase", {
    enumerable: !0,
    get: function() {
      return F26.OTLPExporterBase
    }
  });
  var X26 = TZ1();
  Object.defineProperty(IR, "OTLPExporterError", {
    enumerable: !0,
    get: function() {
      return X26.OTLPExporterError
    }
  });
  var pR0 = ks();
  Object.defineProperty(IR, "mergeOtlpSharedConfigurationWithDefaults", {
    enumerable: !0,
    get: function() {
      return pR0.mergeOtlpSharedConfigurationWithDefaults
    }
  });
  Object.defineProperty(IR, "getSharedConfigurationDefaults", {
    enumerable: !0,
    get: function() {
      return pR0.getSharedConfigurationDefaults
    }
  });
  var V26 = SR0();
  Object.defineProperty(IR, "CompressionAlgorithm", {
    enumerable: !0,
    get: function() {
      return V26.CompressionAlgorithm
    }
  });
  var C26 = uR0();
  Object.defineProperty(IR, "createOtlpNetworkExportDelegate", {
    enumerable: !0,
    get: function() {
      return C26.createOtlpNetworkExportDelegate
    }
  })
})
// @from(Start 4277058, End 4279969)
Mg1 = z((iR0) => {
  Object.defineProperty(iR0, "__esModule", {
    value: !0
  });
  iR0.OTLPMetricExporterBase = iR0.LowMemoryTemporalitySelector = iR0.DeltaTemporalitySelector = iR0.CumulativeTemporalitySelector = void 0;
  var H26 = p8(),
    F7 = QR(),
    cR0 = wg1(),
    z26 = p_(),
    w26 = s9(),
    E26 = () => F7.AggregationTemporality.CUMULATIVE;
  iR0.CumulativeTemporalitySelector = E26;
  var U26 = (A) => {
    switch (A) {
      case F7.InstrumentType.COUNTER:
      case F7.InstrumentType.OBSERVABLE_COUNTER:
      case F7.InstrumentType.GAUGE:
      case F7.InstrumentType.HISTOGRAM:
      case F7.InstrumentType.OBSERVABLE_GAUGE:
        return F7.AggregationTemporality.DELTA;
      case F7.InstrumentType.UP_DOWN_COUNTER:
      case F7.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
        return F7.AggregationTemporality.CUMULATIVE
    }
  };
  iR0.DeltaTemporalitySelector = U26;
  var N26 = (A) => {
    switch (A) {
      case F7.InstrumentType.COUNTER:
      case F7.InstrumentType.HISTOGRAM:
        return F7.AggregationTemporality.DELTA;
      case F7.InstrumentType.GAUGE:
      case F7.InstrumentType.UP_DOWN_COUNTER:
      case F7.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
      case F7.InstrumentType.OBSERVABLE_COUNTER:
      case F7.InstrumentType.OBSERVABLE_GAUGE:
        return F7.AggregationTemporality.CUMULATIVE
    }
  };
  iR0.LowMemoryTemporalitySelector = N26;

  function $26() {
    let A = (H26.getStringFromEnv("OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE") ?? "cumulative").toLowerCase();
    if (A === "cumulative") return iR0.CumulativeTemporalitySelector;
    if (A === "delta") return iR0.DeltaTemporalitySelector;
    if (A === "lowmemory") return iR0.LowMemoryTemporalitySelector;
    return w26.diag.warn(`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE is set to '${A}', but only 'cumulative' and 'delta' are allowed. Using default ('cumulative') instead.`), iR0.CumulativeTemporalitySelector
  }

  function q26(A) {
    if (A != null) {
      if (A === cR0.AggregationTemporalityPreference.DELTA) return iR0.DeltaTemporalitySelector;
      else if (A === cR0.AggregationTemporalityPreference.LOWMEMORY) return iR0.LowMemoryTemporalitySelector;
      return iR0.CumulativeTemporalitySelector
    }
    return $26()
  }
  var M26 = Object.freeze({
    type: F7.AggregationType.DEFAULT
  });

  function L26(A) {
    return A?.aggregationPreference ?? (() => M26)
  }
  class lR0 extends z26.OTLPExporterBase {
    _aggregationTemporalitySelector;
    _aggregationSelector;
    constructor(A, B) {
      super(A);
      this._aggregationSelector = L26(B), this._aggregationTemporalitySelector = q26(B?.temporalityPreference)
    }
    selectAggregation(A) {
      return this._aggregationSelector(A)
    }
    selectAggregationTemporality(A) {
      return this._aggregationTemporalitySelector(A)
    }
  }
  iR0.OTLPMetricExporterBase = lR0
})
// @from(Start 4279975, End 4280612)
Lg1 = z((nU8, aR0) => {
  aR0.exports = R26;

  function R26(A, B) {
    var Q = new Array(arguments.length - 1),
      I = 0,
      G = 2,
      Z = !0;
    while (G < arguments.length) Q[I++] = arguments[G++];
    return new Promise(function D(Y, W) {
      Q[I] = function J(F) {
        if (Z)
          if (Z = !1, F) W(F);
          else {
            var X = new Array(arguments.length - 1),
              V = 0;
            while (V < X.length) X[V++] = arguments[V];
            Y.apply(null, X)
          }
      };
      try {
        A.apply(B || null, Q)
      } catch (J) {
        if (Z) Z = !1, W(J)
      }
    })
  }
})
// @from(Start 4280618, End 4282621)
tR0 = z((oR0) => {
  var SZ1 = oR0;
  SZ1.length = function A(B) {
    var Q = B.length;
    if (!Q) return 0;
    var I = 0;
    while (--Q % 4 > 1 && B.charAt(Q) === "=") ++I;
    return Math.ceil(B.length * 3) / 4 - I
  };
  var mg = new Array(64),
    rR0 = new Array(123);
  for (RX = 0; RX < 64;) rR0[mg[RX] = RX < 26 ? RX + 65 : RX < 52 ? RX + 71 : RX < 62 ? RX - 4 : RX - 59 | 43] = RX++;
  var RX;
  SZ1.encode = function A(B, Q, I) {
    var G = null,
      Z = [],
      D = 0,
      Y = 0,
      W;
    while (Q < I) {
      var J = B[Q++];
      switch (Y) {
        case 0:
          Z[D++] = mg[J >> 2], W = (J & 3) << 4, Y = 1;
          break;
        case 1:
          Z[D++] = mg[W | J >> 4], W = (J & 15) << 2, Y = 2;
          break;
        case 2:
          Z[D++] = mg[W | J >> 6], Z[D++] = mg[J & 63], Y = 0;
          break
      }
      if (D > 8191)(G || (G = [])).push(String.fromCharCode.apply(String, Z)), D = 0
    }
    if (Y) {
      if (Z[D++] = mg[W], Z[D++] = 61, Y === 1) Z[D++] = 61
    }
    if (G) {
      if (D) G.push(String.fromCharCode.apply(String, Z.slice(0, D)));
      return G.join("")
    }
    return String.fromCharCode.apply(String, Z.slice(0, D))
  };
  var sR0 = "invalid encoding";
  SZ1.decode = function A(B, Q, I) {
    var G = I,
      Z = 0,
      D;
    for (var Y = 0; Y < B.length;) {
      var W = B.charCodeAt(Y++);
      if (W === 61 && Z > 1) break;
      if ((W = rR0[W]) === void 0) throw Error(sR0);
      switch (Z) {
        case 0:
          D = W, Z = 1;
          break;
        case 1:
          Q[I++] = D << 2 | (W & 48) >> 4, D = W, Z = 2;
          break;
        case 2:
          Q[I++] = (D & 15) << 4 | (W & 60) >> 2, D = W, Z = 3;
          break;
        case 3:
          Q[I++] = (D & 3) << 6 | W, Z = 0;
          break
      }
    }
    if (Z === 1) throw Error(sR0);
    return I - G
  };
  SZ1.test = function A(B) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(B)
  }
})
// @from(Start 4282627, End 4283457)
AO0 = z((sU8, eR0) => {
  eR0.exports = _Z1;

  function _Z1() {
    this._listeners = {}
  }
  _Z1.prototype.on = function A(B, Q, I) {
    return (this._listeners[B] || (this._listeners[B] = [])).push({
      fn: Q,
      ctx: I || this
    }), this
  };
  _Z1.prototype.off = function A(B, Q) {
    if (B === void 0) this._listeners = {};
    else if (Q === void 0) this._listeners[B] = [];
    else {
      var I = this._listeners[B];
      for (var G = 0; G < I.length;)
        if (I[G].fn === Q) I.splice(G, 1);
        else ++G
    }
    return this
  };
  _Z1.prototype.emit = function A(B) {
    var Q = this._listeners[B];
    if (Q) {
      var I = [],
        G = 1;
      for (; G < arguments.length;) I.push(arguments[G++]);
      for (G = 0; G < Q.length;) Q[G].fn.apply(Q[G++].ctx, I)
    }
    return this
  }
})
// @from(Start 4283463, End 4289580)
YO0 = z((rU8, DO0) => {
  DO0.exports = BO0(BO0);

  function BO0(A) {
    if (typeof Float32Array !== "undefined")(function() {
      var B = new Float32Array([-0]),
        Q = new Uint8Array(B.buffer),
        I = Q[3] === 128;

      function G(W, J, F) {
        B[0] = W, J[F] = Q[0], J[F + 1] = Q[1], J[F + 2] = Q[2], J[F + 3] = Q[3]
      }

      function Z(W, J, F) {
        B[0] = W, J[F] = Q[3], J[F + 1] = Q[2], J[F + 2] = Q[1], J[F + 3] = Q[0]
      }
      A.writeFloatLE = I ? G : Z, A.writeFloatBE = I ? Z : G;

      function D(W, J) {
        return Q[0] = W[J], Q[1] = W[J + 1], Q[2] = W[J + 2], Q[3] = W[J + 3], B[0]
      }

      function Y(W, J) {
        return Q[3] = W[J], Q[2] = W[J + 1], Q[1] = W[J + 2], Q[0] = W[J + 3], B[0]
      }
      A.readFloatLE = I ? D : Y, A.readFloatBE = I ? Y : D
    })();
    else(function() {
      function B(I, G, Z, D) {
        var Y = G < 0 ? 1 : 0;
        if (Y) G = -G;
        if (G === 0) I(1 / G > 0 ? 0 : 2147483648, Z, D);
        else if (isNaN(G)) I(2143289344, Z, D);
        else if (G > 340282346638528860000000000000000000000) I((Y << 31 | 2139095040) >>> 0, Z, D);
        else if (G < 0.000000000000000000000000000000000000011754943508222875) I((Y << 31 | Math.round(G / 0.000000000000000000000000000000000000000000001401298464324817)) >>> 0, Z, D);
        else {
          var W = Math.floor(Math.log(G) / Math.LN2),
            J = Math.round(G * Math.pow(2, -W) * 8388608) & 8388607;
          I((Y << 31 | W + 127 << 23 | J) >>> 0, Z, D)
        }
      }
      A.writeFloatLE = B.bind(null, QO0), A.writeFloatBE = B.bind(null, IO0);

      function Q(I, G, Z) {
        var D = I(G, Z),
          Y = (D >> 31) * 2 + 1,
          W = D >>> 23 & 255,
          J = D & 8388607;
        return W === 255 ? J ? NaN : Y * (1 / 0) : W === 0 ? Y * 0.000000000000000000000000000000000000000000001401298464324817 * J : Y * Math.pow(2, W - 150) * (J + 8388608)
      }
      A.readFloatLE = Q.bind(null, GO0), A.readFloatBE = Q.bind(null, ZO0)
    })();
    if (typeof Float64Array !== "undefined")(function() {
      var B = new Float64Array([-0]),
        Q = new Uint8Array(B.buffer),
        I = Q[7] === 128;

      function G(W, J, F) {
        B[0] = W, J[F] = Q[0], J[F + 1] = Q[1], J[F + 2] = Q[2], J[F + 3] = Q[3], J[F + 4] = Q[4], J[F + 5] = Q[5], J[F + 6] = Q[6], J[F + 7] = Q[7]
      }

      function Z(W, J, F) {
        B[0] = W, J[F] = Q[7], J[F + 1] = Q[6], J[F + 2] = Q[5], J[F + 3] = Q[4], J[F + 4] = Q[3], J[F + 5] = Q[2], J[F + 6] = Q[1], J[F + 7] = Q[0]
      }
      A.writeDoubleLE = I ? G : Z, A.writeDoubleBE = I ? Z : G;

      function D(W, J) {
        return Q[0] = W[J], Q[1] = W[J + 1], Q[2] = W[J + 2], Q[3] = W[J + 3], Q[4] = W[J + 4], Q[5] = W[J + 5], Q[6] = W[J + 6], Q[7] = W[J + 7], B[0]
      }

      function Y(W, J) {
        return Q[7] = W[J], Q[6] = W[J + 1], Q[5] = W[J + 2], Q[4] = W[J + 3], Q[3] = W[J + 4], Q[2] = W[J + 5], Q[1] = W[J + 6], Q[0] = W[J + 7], B[0]
      }
      A.readDoubleLE = I ? D : Y, A.readDoubleBE = I ? Y : D
    })();
    else(function() {
      function B(I, G, Z, D, Y, W) {
        var J = D < 0 ? 1 : 0;
        if (J) D = -D;
        if (D === 0) I(0, Y, W + G), I(1 / D > 0 ? 0 : 2147483648, Y, W + Z);
        else if (isNaN(D)) I(0, Y, W + G), I(2146959360, Y, W + Z);
        else if (D > 179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000) I(0, Y, W + G), I((J << 31 | 2146435072) >>> 0, Y, W + Z);
        else {
          var F;
          if (D < 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000022250738585072014) F = D / 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005, I(F >>> 0, Y, W + G), I((J << 31 | F / 4294967296) >>> 0, Y, W + Z);
          else {
            var X = Math.floor(Math.log(D) / Math.LN2);
            if (X === 1024) X = 1023;
            F = D * Math.pow(2, -X), I(F * 4503599627370496 >>> 0, Y, W + G), I((J << 31 | X + 1023 << 20 | F * 1048576 & 1048575) >>> 0, Y, W + Z)
          }
        }
      }
      A.writeDoubleLE = B.bind(null, QO0, 0, 4), A.writeDoubleBE = B.bind(null, IO0, 4, 0);

      function Q(I, G, Z, D, Y) {
        var W = I(D, Y + G),
          J = I(D, Y + Z),
          F = (J >> 31) * 2 + 1,
          X = J >>> 20 & 2047,
          V = 4294967296 * (J & 1048575) + W;
        return X === 2047 ? V ? NaN : F * (1 / 0) : X === 0 ? F * 0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005 * V : F * Math.pow(2, X - 1075) * (V + 4503599627370496)
      }
      A.readDoubleLE = Q.bind(null, GO0, 0, 4), A.readDoubleBE = Q.bind(null, ZO0, 4, 0)
    })();
    return A
  }

  function QO0(A, B, Q) {
    B[Q] = A & 255, B[Q + 1] = A >>> 8 & 255, B[Q + 2] = A >>> 16 & 255, B[Q + 3] = A >>> 24
  }

  function IO0(A, B, Q) {
    B[Q] = A >>> 24, B[Q + 1] = A >>> 16 & 255, B[Q + 2] = A >>> 8 & 255, B[Q + 3] = A & 255
  }

  function GO0(A, B) {
    return (A[B] | A[B + 1] << 8 | A[B + 2] << 16 | A[B + 3] << 24) >>> 0
  }

  function ZO0(A, B) {
    return (A[B] << 24 | A[B + 1] << 16 | A[B + 2] << 8 | A[B + 3]) >>> 0
  }
})
// @from(Start 4289586, End 4289843)
Og1 = z((WO0, Rg1) => {
  Rg1.exports = O26;

  function O26(moduleName) {
    try {
      var mod = eval("quire".replace(/^/, "re"))(moduleName);
      if (mod && (mod.length || Object.keys(mod).length)) return mod
    } catch (A) {}
    return null
  }
})
// @from(Start 4289849, End 4291551)
FO0 = z((JO0) => {
  var Tg1 = JO0;
  Tg1.length = function A(B) {
    var Q = 0,
      I = 0;
    for (var G = 0; G < B.length; ++G)
      if (I = B.charCodeAt(G), I < 128) Q += 1;
      else if (I < 2048) Q += 2;
    else if ((I & 64512) === 55296 && (B.charCodeAt(G + 1) & 64512) === 56320) ++G, Q += 4;
    else Q += 3;
    return Q
  };
  Tg1.read = function A(B, Q, I) {
    var G = I - Q;
    if (G < 1) return "";
    var Z = null,
      D = [],
      Y = 0,
      W;
    while (Q < I) {
      if (W = B[Q++], W < 128) D[Y++] = W;
      else if (W > 191 && W < 224) D[Y++] = (W & 31) << 6 | B[Q++] & 63;
      else if (W > 239 && W < 365) W = ((W & 7) << 18 | (B[Q++] & 63) << 12 | (B[Q++] & 63) << 6 | B[Q++] & 63) - 65536, D[Y++] = 55296 + (W >> 10), D[Y++] = 56320 + (W & 1023);
      else D[Y++] = (W & 15) << 12 | (B[Q++] & 63) << 6 | B[Q++] & 63;
      if (Y > 8191)(Z || (Z = [])).push(String.fromCharCode.apply(String, D)), Y = 0
    }
    if (Z) {
      if (Y) Z.push(String.fromCharCode.apply(String, D.slice(0, Y)));
      return Z.join("")
    }
    return String.fromCharCode.apply(String, D.slice(0, Y))
  };
  Tg1.write = function A(B, Q, I) {
    var G = I,
      Z, D;
    for (var Y = 0; Y < B.length; ++Y)
      if (Z = B.charCodeAt(Y), Z < 128) Q[I++] = Z;
      else if (Z < 2048) Q[I++] = Z >> 6 | 192, Q[I++] = Z & 63 | 128;
    else if ((Z & 64512) === 55296 && ((D = B.charCodeAt(Y + 1)) & 64512) === 56320) Z = 65536 + ((Z & 1023) << 10) + (D & 1023), ++Y, Q[I++] = Z >> 18 | 240, Q[I++] = Z >> 12 & 63 | 128, Q[I++] = Z >> 6 & 63 | 128, Q[I++] = Z & 63 | 128;
    else Q[I++] = Z >> 12 | 224, Q[I++] = Z >> 6 & 63 | 128, Q[I++] = Z & 63 | 128;
    return I - G
  }
})
// @from(Start 4291557, End 4291901)
VO0 = z((tU8, XO0) => {
  XO0.exports = T26;

  function T26(A, B, Q) {
    var I = Q || 8192,
      G = I >>> 1,
      Z = null,
      D = I;
    return function Y(W) {
      if (W < 1 || W > G) return A(W);
      if (D + W > I) Z = A(I), D = 0;
      var J = B.call(Z, D, D += W);
      if (D & 7) D = (D | 7) + 1;
      return J
    }
  }
})
// @from(Start 4291907, End 4294518)
KO0 = z((eU8, CO0) => {
  CO0.exports = LI;
  var xs = Iw();

  function LI(A, B) {
    this.lo = A >>> 0, this.hi = B >>> 0
  }
  var c_ = LI.zero = new LI(0, 0);
  c_.toNumber = function() {
    return 0
  };
  c_.zzEncode = c_.zzDecode = function() {
    return this
  };
  c_.length = function() {
    return 1
  };
  var P26 = LI.zeroHash = "\x00\x00\x00\x00\x00\x00\x00\x00";
  LI.fromNumber = function A(B) {
    if (B === 0) return c_;
    var Q = B < 0;
    if (Q) B = -B;
    var I = B >>> 0,
      G = (B - I) / 4294967296 >>> 0;
    if (Q) {
      if (G = ~G >>> 0, I = ~I >>> 0, ++I > 4294967295) {
        if (I = 0, ++G > 4294967295) G = 0
      }
    }
    return new LI(I, G)
  };
  LI.from = function A(B) {
    if (typeof B === "number") return LI.fromNumber(B);
    if (xs.isString(B))
      if (xs.Long) B = xs.Long.fromString(B);
      else return LI.fromNumber(parseInt(B, 10));
    return B.low || B.high ? new LI(B.low >>> 0, B.high >>> 0) : c_
  };
  LI.prototype.toNumber = function A(B) {
    if (!B && this.hi >>> 31) {
      var Q = ~this.lo + 1 >>> 0,
        I = ~this.hi >>> 0;
      if (!Q) I = I + 1 >>> 0;
      return -(Q + I * 4294967296)
    }
    return this.lo + this.hi * 4294967296
  };
  LI.prototype.toLong = function A(B) {
    return xs.Long ? new xs.Long(this.lo | 0, this.hi | 0, Boolean(B)) : {
      low: this.lo | 0,
      high: this.hi | 0,
      unsigned: Boolean(B)
    }
  };
  var GR = String.prototype.charCodeAt;
  LI.fromHash = function A(B) {
    if (B === P26) return c_;
    return new LI((GR.call(B, 0) | GR.call(B, 1) << 8 | GR.call(B, 2) << 16 | GR.call(B, 3) << 24) >>> 0, (GR.call(B, 4) | GR.call(B, 5) << 8 | GR.call(B, 6) << 16 | GR.call(B, 7) << 24) >>> 0)
  };
  LI.prototype.toHash = function A() {
    return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
  };
  LI.prototype.zzEncode = function A() {
    var B = this.hi >> 31;
    return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ B) >>> 0, this.lo = (this.lo << 1 ^ B) >>> 0, this
  };
  LI.prototype.zzDecode = function A() {
    var B = -(this.lo & 1);
    return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ B) >>> 0, this.hi = (this.hi >>> 1 ^ B) >>> 0, this
  };
  LI.prototype.length = function A() {
    var B = this.lo,
      Q = (this.lo >>> 28 | this.hi << 4) >>> 0,
      I = this.hi >>> 24;
    return I === 0 ? Q === 0 ? B < 16384 ? B < 128 ? 1 : 2 : B < 2097152 ? 3 : 4 : Q < 16384 ? Q < 128 ? 5 : 6 : Q < 2097152 ? 7 : 8 : I < 128 ? 9 : 10
  }
})