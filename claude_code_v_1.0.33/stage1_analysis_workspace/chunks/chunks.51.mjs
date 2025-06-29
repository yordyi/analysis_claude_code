
// @from(Start 5152298, End 5155319)
Nv0 = z((Ev0) => {
  Object.defineProperty(Ev0, "__esModule", {
    value: !0
  });
  Ev0.getOtlpGrpcConfigurationFromEnv = void 0;
  var Kv0 = p8(),
    Rr = Mr(),
    VY6 = ug(),
    CY6 = Z1("fs"),
    KY6 = Z1("path"),
    zv0 = s9();

  function fd1(A, B) {
    if (A != null && A !== "") return A;
    if (B != null && B !== "") return B;
    return
  }

  function HY6(A) {
    let B = process.env[`OTEL_EXPORTER_OTLP_${A}_HEADERS`]?.trim(),
      Q = process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim(),
      I = Kv0.parseKeyPairsIntoRecord(B),
      G = Kv0.parseKeyPairsIntoRecord(Q);
    if (Object.keys(I).length === 0 && Object.keys(G).length === 0) return;
    let Z = Object.assign({}, G, I),
      D = Rr.createEmptyMetadata();
    for (let [Y, W] of Object.entries(Z)) D.set(Y, W);
    return D
  }

  function zY6(A) {
    let B = HY6(A);
    if (B == null) return;
    return () => B
  }

  function wY6(A) {
    let B = process.env[`OTEL_EXPORTER_OTLP_${A}_ENDPOINT`]?.trim(),
      Q = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();
    return fd1(B, Q)
  }

  function EY6(A) {
    let B = process.env[`OTEL_EXPORTER_OTLP_${A}_INSECURE`]?.toLowerCase().trim(),
      Q = process.env.OTEL_EXPORTER_OTLP_INSECURE?.toLowerCase().trim();
    return fd1(B, Q) === "true"
  }

  function vd1(A, B, Q) {
    let I = process.env[A]?.trim(),
      G = process.env[B]?.trim(),
      Z = fd1(I, G);
    if (Z != null) try {
      return CY6.readFileSync(KY6.resolve(process.cwd(), Z))
    } catch {
      zv0.diag.warn(Q);
      return
    } else return
  }

  function UY6(A) {
    return vd1(`OTEL_EXPORTER_OTLP_${A}_CLIENT_CERTIFICATE`, "OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE", "Failed to read client certificate chain file")
  }

  function NY6(A) {
    return vd1(`OTEL_EXPORTER_OTLP_${A}_CLIENT_KEY`, "OTEL_EXPORTER_OTLP_CLIENT_KEY", "Failed to read client certificate private key file")
  }

  function Hv0(A) {
    return vd1(`OTEL_EXPORTER_OTLP_${A}_CERTIFICATE`, "OTEL_EXPORTER_OTLP_CERTIFICATE", "Failed to read root certificate file")
  }

  function wv0(A) {
    let B = NY6(A),
      Q = UY6(A),
      I = Hv0(A),
      G = B != null && Q != null;
    if (I != null && !G) return zv0.diag.warn("Client key and certificate must both be provided, but one was missing - attempting to create credentials from just the root certificate"), Rr.createSslCredentials(Hv0(A));
    return Rr.createSslCredentials(I, B, Q)
  }

  function $Y6(A) {
    if (EY6(A)) return Rr.createInsecureCredentials();
    return wv0(A)
  }

  function qY6(A) {
    return {
      ...VY6.getSharedConfigurationFromEnvironment(A),
      metadata: zY6(A),
      url: wY6(A),
      credentials: (B) => {
        if (B.startsWith("http://")) return () => {
          return Rr.createInsecureCredentials()
        };
        else if (B.startsWith("https://")) return () => {
          return wv0(A)
        };
        return () => {
          return $Y6(A)
        }
      }
    }
  }
  Ev0.getOtlpGrpcConfigurationFromEnv = qY6
})
// @from(Start 5155325, End 5156107)
Lv0 = z((qv0) => {
  Object.defineProperty(qv0, "__esModule", {
    value: !0
  });
  qv0.convertLegacyOtlpGrpcOptions = void 0;
  var MY6 = s9(),
    $v0 = Cv0(),
    LY6 = Mr(),
    RY6 = Nv0();

  function OY6(A, B) {
    if (A.headers) MY6.diag.warn("Headers cannot be set when using grpc");
    let Q = A.credentials;
    return $v0.mergeOtlpGrpcConfigurationWithDefaults({
      url: A.url,
      metadata: () => {
        return A.metadata ?? LY6.createEmptyMetadata()
      },
      compression: A.compression,
      timeoutMillis: A.timeoutMillis,
      concurrencyLimit: A.concurrencyLimit,
      credentials: Q != null ? () => Q : void 0
    }, RY6.getOtlpGrpcConfigurationFromEnv(B), $v0.getOtlpGrpcDefaultConfiguration())
  }
  qv0.convertLegacyOtlpGrpcOptions = OY6
})
// @from(Start 5156113, End 5156607)
Tv0 = z((Rv0) => {
  Object.defineProperty(Rv0, "__esModule", {
    value: !0
  });
  Rv0.createOtlpGrpcExportDelegate = void 0;
  var TY6 = p_(),
    PY6 = Mr();

  function SY6(A, B, Q, I) {
    return TY6.createOtlpNetworkExportDelegate(A, B, PY6.createOtlpGrpcExporterTransport({
      address: A.url,
      compression: A.compression,
      credentials: A.credentials,
      metadata: A.metadata,
      grpcName: Q,
      grpcPath: I
    }))
  }
  Rv0.createOtlpGrpcExportDelegate = SY6
})
// @from(Start 5156613, End 5157142)
bd1 = z((YY1) => {
  Object.defineProperty(YY1, "__esModule", {
    value: !0
  });
  YY1.createOtlpGrpcExportDelegate = YY1.convertLegacyOtlpGrpcOptions = void 0;
  var _Y6 = Lv0();
  Object.defineProperty(YY1, "convertLegacyOtlpGrpcOptions", {
    enumerable: !0,
    get: function() {
      return _Y6.convertLegacyOtlpGrpcOptions
    }
  });
  var jY6 = Tv0();
  Object.defineProperty(YY1, "createOtlpGrpcExportDelegate", {
    enumerable: !0,
    get: function() {
      return jY6.createOtlpGrpcExportDelegate
    }
  })
})
// @from(Start 5157148, End 5157657)
yv0 = z((_v0) => {
  Object.defineProperty(_v0, "__esModule", {
    value: !0
  });
  _v0.OTLPMetricExporter = void 0;
  var kY6 = dZ1(),
    Pv0 = bd1(),
    xY6 = i_();
  class Sv0 extends kY6.OTLPMetricExporterBase {
    constructor(A) {
      super(Pv0.createOtlpGrpcExportDelegate(Pv0.convertLegacyOtlpGrpcOptions(A ?? {}, "METRICS"), xY6.ProtobufMetricsSerializer, "MetricsExportService", "/opentelemetry.proto.collector.metrics.v1.MetricsService/Export"), A)
    }
  }
  _v0.OTLPMetricExporter = Sv0
})
// @from(Start 5157663, End 5157945)
kv0 = z((gd1) => {
  Object.defineProperty(gd1, "__esModule", {
    value: !0
  });
  gd1.OTLPMetricExporter = void 0;
  var fY6 = yv0();
  Object.defineProperty(gd1, "OTLPMetricExporter", {
    enumerable: !0,
    get: function() {
      return fY6.OTLPMetricExporter
    }
  })
})
// @from(Start 5157951, End 5162693)
dd1 = z((bv0) => {
  Object.defineProperty(bv0, "__esModule", {
    value: !0
  });
  bv0.PrometheusSerializer = void 0;
  var bY6 = s9(),
    Dj = QR(),
    xv0 = p8();

  function JY1(A) {
    return A.replace(/\\/g, "\\\\").replace(/\n/g, "\\n")
  }

  function fv0(A = "") {
    if (typeof A !== "string") A = JSON.stringify(A);
    return JY1(A).replace(/"/g, "\\\"")
  }
  var gY6 = /[^a-z0-9_]/gi,
    hY6 = /_{2,}/g;

  function md1(A) {
    return A.replace(gY6, "_").replace(hY6, "_")
  }

  function hd1(A, B) {
    if (!A.endsWith("_total") && B.dataPointType === Dj.DataPointType.SUM && B.isMonotonic) A = A + "_total";
    return A
  }

  function mY6(A) {
    if (A === 1 / 0) return "+Inf";
    else if (A === -1 / 0) return "-Inf";
    else return `${A}`
  }

  function dY6(A) {
    switch (A.dataPointType) {
      case Dj.DataPointType.SUM:
        if (A.isMonotonic) return "counter";
        return "gauge";
      case Dj.DataPointType.GAUGE:
        return "gauge";
      case Dj.DataPointType.HISTOGRAM:
        return "histogram";
      default:
        return "untyped"
    }
  }

  function WY1(A, B, Q, I, G) {
    let Z = !1,
      D = "";
    for (let [Y, W] of Object.entries(B)) {
      let J = md1(Y);
      Z = !0, D += `${D.length>0?",":""}${J}="${fv0(W)}"`
    }
    if (G)
      for (let [Y, W] of Object.entries(G)) {
        let J = md1(Y);
        Z = !0, D += `${D.length>0?",":""}${J}="${fv0(W)}"`
      }
    if (Z) A += `{${D}}`;
    return `${A} ${mY6(Q)}${I!==void 0?" "+String(I):""}
`
  }
  var uY6 = "# no registered metrics";
  class vv0 {
    _prefix;
    _appendTimestamp;
    _additionalAttributes;
    _withResourceConstantLabels;
    constructor(A, B = !1, Q) {
      if (A) this._prefix = A + "_";
      this._appendTimestamp = B, this._withResourceConstantLabels = Q
    }
    serialize(A) {
      let B = "";
      this._additionalAttributes = this._filterResourceConstantLabels(A.resource.attributes, this._withResourceConstantLabels);
      for (let Q of A.scopeMetrics) B += this._serializeScopeMetrics(Q);
      if (B === "") B += uY6;
      return this._serializeResource(A.resource) + B
    }
    _filterResourceConstantLabels(A, B) {
      if (B) {
        let Q = {};
        for (let [I, G] of Object.entries(A))
          if (I.match(B)) Q[I] = G;
        return Q
      }
      return
    }
    _serializeScopeMetrics(A) {
      let B = "";
      for (let Q of A.metrics) B += this._serializeMetricData(Q) + `
`;
      return B
    }
    _serializeMetricData(A) {
      let B = md1(JY1(A.descriptor.name));
      if (this._prefix) B = `${this._prefix}${B}`;
      let Q = A.dataPointType;
      B = hd1(B, A);
      let I = `# HELP ${B} ${JY1(A.descriptor.description||"description missing")}`,
        G = A.descriptor.unit ? `
# UNIT ${B} ${JY1(A.descriptor.unit)}` : "",
        Z = `# TYPE ${B} ${dY6(A)}`,
        D = "";
      switch (Q) {
        case Dj.DataPointType.SUM:
        case Dj.DataPointType.GAUGE: {
          D = A.dataPoints.map((Y) => this._serializeSingularDataPoint(B, A, Y)).join("");
          break
        }
        case Dj.DataPointType.HISTOGRAM: {
          D = A.dataPoints.map((Y) => this._serializeHistogramDataPoint(B, A, Y)).join("");
          break
        }
        default:
          bY6.diag.error(`Unrecognizable DataPointType: ${Q} for metric "${B}"`)
      }
      return `${I}${G}
${Z}
${D}`.trim()
    }
    _serializeSingularDataPoint(A, B, Q) {
      let I = "";
      A = hd1(A, B);
      let {
        value: G,
        attributes: Z
      } = Q, D = xv0.hrTimeToMilliseconds(Q.endTime);
      return I += WY1(A, Z, G, this._appendTimestamp ? D : void 0, this._additionalAttributes), I
    }
    _serializeHistogramDataPoint(A, B, Q) {
      let I = "";
      A = hd1(A, B);
      let {
        attributes: G,
        value: Z
      } = Q, D = xv0.hrTimeToMilliseconds(Q.endTime);
      for (let F of ["count", "sum"]) {
        let X = Z[F];
        if (X != null) I += WY1(A + "_" + F, G, X, this._appendTimestamp ? D : void 0, this._additionalAttributes)
      }
      let Y = 0,
        W = Z.buckets.counts.entries(),
        J = !1;
      for (let [F, X] of W) {
        Y += X;
        let V = Z.buckets.boundaries[F];
        if (V === void 0 && J) break;
        if (V === 1 / 0) J = !0;
        I += WY1(A + "_bucket", G, Y, this._appendTimestamp ? D : void 0, Object.assign({}, this._additionalAttributes ?? {}, {
          le: V === void 0 || V === 1 / 0 ? "+Inf" : String(V)
        }))
      }
      return I
    }
    _serializeResource(A) {
      return `# HELP target_info Target metadata
# TYPE target_info gauge
${WY1("target_info",A.attributes,1).trim()}
`
    }
  }
  bv0.PrometheusSerializer = vv0
})
// @from(Start 5162699, End 5166211)
dv0 = z((hv0) => {
  Object.defineProperty(hv0, "__esModule", {
    value: !0
  });
  hv0.PrometheusExporter = void 0;
  var Or = s9(),
    pY6 = p8(),
    ud1 = QR(),
    cY6 = Z1("http"),
    lY6 = dd1(),
    iY6 = Z1("url");
  class qR extends ud1.MetricReader {
    static DEFAULT_OPTIONS = {
      host: void 0,
      port: 9464,
      endpoint: "/metrics",
      prefix: "",
      appendTimestamp: !1,
      withResourceConstantLabels: void 0
    };
    _host;
    _port;
    _baseUrl;
    _endpoint;
    _server;
    _prefix;
    _appendTimestamp;
    _serializer;
    _startServerPromise;
    constructor(A = {}, B = () => {}) {
      super({
        aggregationSelector: (I) => {
          return {
            type: ud1.AggregationType.DEFAULT
          }
        },
        aggregationTemporalitySelector: (I) => ud1.AggregationTemporality.CUMULATIVE,
        metricProducers: A.metricProducers
      });
      this._host = A.host || process.env.OTEL_EXPORTER_PROMETHEUS_HOST || qR.DEFAULT_OPTIONS.host, this._port = A.port || Number(process.env.OTEL_EXPORTER_PROMETHEUS_PORT) || qR.DEFAULT_OPTIONS.port, this._prefix = A.prefix || qR.DEFAULT_OPTIONS.prefix, this._appendTimestamp = typeof A.appendTimestamp === "boolean" ? A.appendTimestamp : qR.DEFAULT_OPTIONS.appendTimestamp;
      let Q = A.withResourceConstantLabels || qR.DEFAULT_OPTIONS.withResourceConstantLabels;
      if (this._server = cY6.createServer(this._requestHandler).unref(), this._serializer = new lY6.PrometheusSerializer(this._prefix, this._appendTimestamp, Q), this._baseUrl = `http://${this._host}:${this._port}/`, this._endpoint = (A.endpoint || qR.DEFAULT_OPTIONS.endpoint).replace(/^([^/])/, "/$1"), A.preventServerStart !== !0) this.startServer().then(B, (I) => {
        Or.diag.error(I), B(I)
      });
      else if (B) queueMicrotask(B)
    }
    async onForceFlush() {}
    onShutdown() {
      return this.stopServer()
    }
    stopServer() {
      if (!this._server) return Or.diag.debug("Prometheus stopServer() was called but server was never started."), Promise.resolve();
      else return new Promise((A) => {
        this._server.close((B) => {
          if (!B) Or.diag.debug("Prometheus exporter was stopped");
          else if (B.code !== "ERR_SERVER_NOT_RUNNING") pY6.globalErrorHandler(B);
          A()
        })
      })
    }
    startServer() {
      return this._startServerPromise ??= new Promise((A, B) => {
        this._server.once("error", B), this._server.listen({
          port: this._port,
          host: this._host
        }, () => {
          Or.diag.debug(`Prometheus exporter server started: ${this._host}:${this._port}/${this._endpoint}`), A()
        })
      }), this._startServerPromise
    }
    getMetricsRequestHandler(A, B) {
      this._exportMetrics(B)
    }
    _requestHandler = (A, B) => {
      if (A.url != null && new iY6.URL(A.url, this._baseUrl).pathname === this._endpoint) this._exportMetrics(B);
      else this._notFound(B)
    };
    _exportMetrics = (A) => {
      A.statusCode = 200, A.setHeader("content-type", "text/plain"), this.collect().then((B) => {
        let {
          resourceMetrics: Q,
          errors: I
        } = B;
        if (I.length) Or.diag.error("PrometheusExporter: metrics collection errors", ...I);
        A.end(this._serializer.serialize(Q))
      }, (B) => {
        A.end(`# failed to export metrics: ${B}`)
      })
    };
    _notFound = (A) => {
      A.statusCode = 404, A.end()
    }
  }
  hv0.PrometheusExporter = qR
})
// @from(Start 5166217, End 5166692)
uv0 = z((FY1) => {
  Object.defineProperty(FY1, "__esModule", {
    value: !0
  });
  FY1.PrometheusSerializer = FY1.PrometheusExporter = void 0;
  var nY6 = dv0();
  Object.defineProperty(FY1, "PrometheusExporter", {
    enumerable: !0,
    get: function() {
      return nY6.PrometheusExporter
    }
  });
  var aY6 = dd1();
  Object.defineProperty(FY1, "PrometheusSerializer", {
    enumerable: !0,
    get: function() {
      return aY6.PrometheusSerializer
    }
  })
})
// @from(Start 5166698, End 5170263)
pd1 = z((cv0) => {
  Object.defineProperty(cv0, "__esModule", {
    value: !0
  });
  cv0.LogRecord = void 0;
  var rY6 = s9(),
    Eh = s9(),
    XY1 = p8();
  class pv0 {
    hrTime;
    hrTimeObserved;
    spanContext;
    resource;
    instrumentationScope;
    attributes = {};
    _severityText;
    _severityNumber;
    _body;
    totalAttributesCount = 0;
    _isReadonly = !1;
    _logRecordLimits;
    set severityText(A) {
      if (this._isLogRecordReadonly()) return;
      this._severityText = A
    }
    get severityText() {
      return this._severityText
    }
    set severityNumber(A) {
      if (this._isLogRecordReadonly()) return;
      this._severityNumber = A
    }
    get severityNumber() {
      return this._severityNumber
    }
    set body(A) {
      if (this._isLogRecordReadonly()) return;
      this._body = A
    }
    get body() {
      return this._body
    }
    get droppedAttributesCount() {
      return this.totalAttributesCount - Object.keys(this.attributes).length
    }
    constructor(A, B, Q) {
      let {
        timestamp: I,
        observedTimestamp: G,
        severityNumber: Z,
        severityText: D,
        body: Y,
        attributes: W = {},
        context: J
      } = Q, F = Date.now();
      if (this.hrTime = XY1.timeInputToHrTime(I ?? F), this.hrTimeObserved = XY1.timeInputToHrTime(G ?? F), J) {
        let X = Eh.trace.getSpanContext(J);
        if (X && Eh.isSpanContextValid(X)) this.spanContext = X
      }
      this.severityNumber = Z, this.severityText = D, this.body = Y, this.resource = A.resource, this.instrumentationScope = B, this._logRecordLimits = A.logRecordLimits, this.setAttributes(W)
    }
    setAttribute(A, B) {
      if (this._isLogRecordReadonly()) return this;
      if (B === null) return this;
      if (A.length === 0) return Eh.diag.warn(`Invalid attribute key: ${A}`), this;
      if (!XY1.isAttributeValue(B) && !(typeof B === "object" && !Array.isArray(B) && Object.keys(B).length > 0)) return Eh.diag.warn(`Invalid attribute value set for key: ${A}`), this;
      if (this.totalAttributesCount += 1, Object.keys(this.attributes).length >= this._logRecordLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, A)) {
        if (this.droppedAttributesCount === 1) Eh.diag.warn("Dropping extra attributes.");
        return this
      }
      if (XY1.isAttributeValue(B)) this.attributes[A] = this._truncateToSize(B);
      else this.attributes[A] = B;
      return this
    }
    setAttributes(A) {
      for (let [B, Q] of Object.entries(A)) this.setAttribute(B, Q);
      return this
    }
    setBody(A) {
      return this.body = A, this
    }
    setSeverityNumber(A) {
      return this.severityNumber = A, this
    }
    setSeverityText(A) {
      return this.severityText = A, this
    }
    _makeReadonly() {
      this._isReadonly = !0
    }
    _truncateToSize(A) {
      let B = this._logRecordLimits.attributeValueLengthLimit;
      if (B <= 0) return Eh.diag.warn(`Attribute value limit must be positive, got ${B}`), A;
      if (typeof A === "string") return this._truncateToLimitUtil(A, B);
      if (Array.isArray(A)) return A.map((Q) => typeof Q === "string" ? this._truncateToLimitUtil(Q, B) : Q);
      return A
    }
    _truncateToLimitUtil(A, B) {
      if (A.length <= B) return A;
      return A.substring(0, B)
    }
    _isLogRecordReadonly() {
      if (this._isReadonly) rY6.diag.warn("Can not execute the operation on emitted log record");
      return this._isReadonly
    }
  }
  cv0.LogRecord = pv0
})
// @from(Start 5170269, End 5170851)
sv0 = z((nv0) => {
  Object.defineProperty(nv0, "__esModule", {
    value: !0
  });
  nv0.Logger = void 0;
  var oY6 = s9(),
    tY6 = pd1();
  class iv0 {
    instrumentationScope;
    _sharedState;
    constructor(A, B) {
      this.instrumentationScope = A, this._sharedState = B
    }
    emit(A) {
      let B = A.context || oY6.context.active(),
        Q = new tY6.LogRecord(this._sharedState, this.instrumentationScope, {
          context: B,
          ...A
        });
      this._sharedState.activeProcessor.onEmit(Q, B), Q._makeReadonly()
    }
  }
  nv0.Logger = iv0
})
// @from(Start 5170857, End 5171849)
tv0 = z((rv0) => {
  Object.defineProperty(rv0, "__esModule", {
    value: !0
  });
  rv0.reconfigureLimits = rv0.loadDefaultConfig = void 0;
  var Uh = p8();

  function eY6() {
    return {
      forceFlushTimeoutMillis: 30000,
      logRecordLimits: {
        attributeValueLengthLimit: Uh.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? 1 / 0,
        attributeCountLimit: Uh.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT") ?? 128
      },
      includeTraceContext: !0
    }
  }
  rv0.loadDefaultConfig = eY6;

  function AW6(A) {
    return {
      attributeCountLimit: A.attributeCountLimit ?? Uh.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT") ?? Uh.getNumberFromEnv("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128,
      attributeValueLengthLimit: A.attributeValueLengthLimit ?? Uh.getNumberFromEnv("OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Uh.getNumberFromEnv("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? 1 / 0
    }
  }
  rv0.reconfigureLimits = AW6
})
// @from(Start 5171855, End 5172528)
Qb0 = z((Ab0) => {
  Object.defineProperty(Ab0, "__esModule", {
    value: !0
  });
  Ab0.MultiLogRecordProcessor = void 0;
  var QW6 = p8();
  class ev0 {
    processors;
    forceFlushTimeoutMillis;
    constructor(A, B) {
      this.processors = A, this.forceFlushTimeoutMillis = B
    }
    async forceFlush() {
      let A = this.forceFlushTimeoutMillis;
      await Promise.all(this.processors.map((B) => QW6.callWithTimeout(B.forceFlush(), A)))
    }
    onEmit(A, B) {
      this.processors.forEach((Q) => Q.onEmit(A, B))
    }
    async shutdown() {
      await Promise.all(this.processors.map((A) => A.shutdown()))
    }
  }
  Ab0.MultiLogRecordProcessor = ev0
})
// @from(Start 5172534, End 5172842)
cd1 = z((Gb0) => {
  Object.defineProperty(Gb0, "__esModule", {
    value: !0
  });
  Gb0.NoopLogRecordProcessor = void 0;
  class Ib0 {
    forceFlush() {
      return Promise.resolve()
    }
    onEmit(A, B) {}
    shutdown() {
      return Promise.resolve()
    }
  }
  Gb0.NoopLogRecordProcessor = Ib0
})
// @from(Start 5172848, End 5173371)
Jb0 = z((Yb0) => {
  Object.defineProperty(Yb0, "__esModule", {
    value: !0
  });
  Yb0.LoggerProviderSharedState = void 0;
  var IW6 = cd1();
  class Db0 {
    resource;
    forceFlushTimeoutMillis;
    logRecordLimits;
    loggers = new Map;
    activeProcessor;
    registeredLogRecordProcessors = [];
    constructor(A, B, Q) {
      this.resource = A, this.forceFlushTimeoutMillis = B, this.logRecordLimits = Q, this.activeProcessor = new IW6.NoopLogRecordProcessor
    }
  }
  Yb0.LoggerProviderSharedState = Db0
})
// @from(Start 5173377, End 5175687)
zb0 = z((Cb0) => {
  Object.defineProperty(Cb0, "__esModule", {
    value: !0
  });
  Cb0.LoggerProvider = Cb0.DEFAULT_LOGGER_NAME = void 0;
  var Tr = s9(),
    GW6 = Hb1(),
    ZW6 = $Z1(),
    Fb0 = p8(),
    DW6 = sv0(),
    Xb0 = tv0(),
    YW6 = Qb0(),
    WW6 = Jb0();
  Cb0.DEFAULT_LOGGER_NAME = "unknown";
  class Vb0 {
    _shutdownOnce;
    _sharedState;
    constructor(A = {}) {
      let B = Fb0.merge({}, Xb0.loadDefaultConfig(), A),
        Q = A.resource ?? ZW6.defaultResource();
      this._sharedState = new WW6.LoggerProviderSharedState(Q, B.forceFlushTimeoutMillis, Xb0.reconfigureLimits(B.logRecordLimits)), this._shutdownOnce = new Fb0.BindOnceFuture(this._shutdown, this)
    }
    getLogger(A, B, Q) {
      if (this._shutdownOnce.isCalled) return Tr.diag.warn("A shutdown LoggerProvider cannot provide a Logger"), GW6.NOOP_LOGGER;
      if (!A) Tr.diag.warn("Logger requested without instrumentation scope name.");
      let I = A || Cb0.DEFAULT_LOGGER_NAME,
        G = `${I}@${B||""}:${Q?.schemaUrl||""}`;
      if (!this._sharedState.loggers.has(G)) this._sharedState.loggers.set(G, new DW6.Logger({
        name: I,
        version: B,
        schemaUrl: Q?.schemaUrl
      }, this._sharedState));
      return this._sharedState.loggers.get(G)
    }
    addLogRecordProcessor(A) {
      if (this._sharedState.registeredLogRecordProcessors.length === 0) this._sharedState.activeProcessor.shutdown().catch((B) => Tr.diag.error("Error while trying to shutdown current log record processor", B));
      this._sharedState.registeredLogRecordProcessors.push(A), this._sharedState.activeProcessor = new YW6.MultiLogRecordProcessor(this._sharedState.registeredLogRecordProcessors, this._sharedState.forceFlushTimeoutMillis)
    }
    forceFlush() {
      if (this._shutdownOnce.isCalled) return Tr.diag.warn("invalid attempt to force flush after LoggerProvider shutdown"), this._shutdownOnce.promise;
      return this._sharedState.activeProcessor.forceFlush()
    }
    shutdown() {
      if (this._shutdownOnce.isCalled) return Tr.diag.warn("shutdown may only be called once per LoggerProvider"), this._shutdownOnce.promise;
      return this._shutdownOnce.call()
    }
    _shutdown() {
      return this._sharedState.activeProcessor.shutdown()
    }
  }
  Cb0.LoggerProvider = Vb0
})
// @from(Start 5175693, End 5176701)
Nb0 = z((Eb0) => {
  Object.defineProperty(Eb0, "__esModule", {
    value: !0
  });
  Eb0.ConsoleLogRecordExporter = void 0;
  var JW6 = p8(),
    FW6 = p8();
  class wb0 {
    export (A, B) {
      this._sendLogRecords(A, B)
    }
    shutdown() {
      return Promise.resolve()
    }
    _exportInfo(A) {
      return {
        resource: {
          attributes: A.resource.attributes
        },
        instrumentationScope: A.instrumentationScope,
        timestamp: JW6.hrTimeToMicroseconds(A.hrTime),
        traceId: A.spanContext?.traceId,
        spanId: A.spanContext?.spanId,
        traceFlags: A.spanContext?.traceFlags,
        severityText: A.severityText,
        severityNumber: A.severityNumber,
        body: A.body,
        attributes: A.attributes
      }
    }
    _sendLogRecords(A, B) {
      for (let Q of A) console.dir(this._exportInfo(Q), {
        depth: 3
      });
      B?.({
        code: FW6.ExportResultCode.SUCCESS
      })
    }
  }
  Eb0.ConsoleLogRecordExporter = wb0
})
// @from(Start 5176707, End 5177957)
Lb0 = z((qb0) => {
  Object.defineProperty(qb0, "__esModule", {
    value: !0
  });
  qb0.SimpleLogRecordProcessor = void 0;
  var Nh = p8();
  class $b0 {
    _exporter;
    _shutdownOnce;
    _unresolvedExports;
    constructor(A) {
      this._exporter = A, this._shutdownOnce = new Nh.BindOnceFuture(this._shutdown, this), this._unresolvedExports = new Set
    }
    onEmit(A) {
      if (this._shutdownOnce.isCalled) return;
      let B = () => Nh.internal._export(this._exporter, [A]).then((Q) => {
        if (Q.code !== Nh.ExportResultCode.SUCCESS) Nh.globalErrorHandler(Q.error ?? new Error(`SimpleLogRecordProcessor: log record export failed (status ${Q})`))
      }).catch(Nh.globalErrorHandler);
      if (A.resource.asyncAttributesPending) {
        let Q = A.resource.waitForAsyncAttributes?.().then(() => {
          return this._unresolvedExports.delete(Q), B()
        }, Nh.globalErrorHandler);
        if (Q != null) this._unresolvedExports.add(Q)
      } else B()
    }
    async forceFlush() {
      await Promise.all(Array.from(this._unresolvedExports))
    }
    shutdown() {
      return this._shutdownOnce.call()
    }
    _shutdown() {
      return this._exporter.shutdown()
    }
  }
  qb0.SimpleLogRecordProcessor = $b0
})
// @from(Start 5177963, End 5178700)
Sb0 = z((Tb0) => {
  Object.defineProperty(Tb0, "__esModule", {
    value: !0
  });
  Tb0.InMemoryLogRecordExporter = void 0;
  var Rb0 = p8();
  class Ob0 {
    _finishedLogRecords = [];
    _stopped = !1;
    export (A, B) {
      if (this._stopped) return B({
        code: Rb0.ExportResultCode.FAILED,
        error: new Error("Exporter has been stopped")
      });
      this._finishedLogRecords.push(...A), B({
        code: Rb0.ExportResultCode.SUCCESS
      })
    }
    shutdown() {
      return this._stopped = !0, this.reset(), Promise.resolve()
    }
    getFinishedLogRecords() {
      return this._finishedLogRecords
    }
    reset() {
      this._finishedLogRecords = []
    }
  }
  Tb0.InMemoryLogRecordExporter = Ob0
})
// @from(Start 5178706, End 5182147)
kb0 = z((jb0) => {
  Object.defineProperty(jb0, "__esModule", {
    value: !0
  });
  jb0.BatchLogRecordProcessorBase = void 0;
  var VY1 = p8(),
    XW6 = s9(),
    fN = p8();
  class _b0 {
    _exporter;
    _maxExportBatchSize;
    _maxQueueSize;
    _scheduledDelayMillis;
    _exportTimeoutMillis;
    _finishedLogRecords = [];
    _timer;
    _shutdownOnce;
    constructor(A, B) {
      if (this._exporter = A, this._maxExportBatchSize = B?.maxExportBatchSize ?? VY1.getNumberFromEnv("OTEL_BLRP_MAX_EXPORT_BATCH_SIZE") ?? 512, this._maxQueueSize = B?.maxQueueSize ?? VY1.getNumberFromEnv("OTEL_BLRP_MAX_QUEUE_SIZE") ?? 2048, this._scheduledDelayMillis = B?.scheduledDelayMillis ?? VY1.getNumberFromEnv("OTEL_BLRP_SCHEDULE_DELAY") ?? 5000, this._exportTimeoutMillis = B?.exportTimeoutMillis ?? VY1.getNumberFromEnv("OTEL_BLRP_EXPORT_TIMEOUT") ?? 30000, this._shutdownOnce = new fN.BindOnceFuture(this._shutdown, this), this._maxExportBatchSize > this._maxQueueSize) XW6.diag.warn("BatchLogRecordProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize"), this._maxExportBatchSize = this._maxQueueSize
    }
    onEmit(A) {
      if (this._shutdownOnce.isCalled) return;
      this._addToBuffer(A)
    }
    forceFlush() {
      if (this._shutdownOnce.isCalled) return this._shutdownOnce.promise;
      return this._flushAll()
    }
    shutdown() {
      return this._shutdownOnce.call()
    }
    async _shutdown() {
      this.onShutdown(), await this._flushAll(), await this._exporter.shutdown()
    }
    _addToBuffer(A) {
      if (this._finishedLogRecords.length >= this._maxQueueSize) return;
      this._finishedLogRecords.push(A), this._maybeStartTimer()
    }
    _flushAll() {
      return new Promise((A, B) => {
        let Q = [],
          I = Math.ceil(this._finishedLogRecords.length / this._maxExportBatchSize);
        for (let G = 0; G < I; G++) Q.push(this._flushOneBatch());
        Promise.all(Q).then(() => {
          A()
        }).catch(B)
      })
    }
    _flushOneBatch() {
      if (this._clearTimer(), this._finishedLogRecords.length === 0) return Promise.resolve();
      return new Promise((A, B) => {
        fN.callWithTimeout(this._export(this._finishedLogRecords.splice(0, this._maxExportBatchSize)), this._exportTimeoutMillis).then(() => A()).catch(B)
      })
    }
    _maybeStartTimer() {
      if (this._timer !== void 0) return;
      this._timer = setTimeout(() => {
        this._flushOneBatch().then(() => {
          if (this._finishedLogRecords.length > 0) this._clearTimer(), this._maybeStartTimer()
        }).catch((A) => {
          fN.globalErrorHandler(A)
        })
      }, this._scheduledDelayMillis), fN.unrefTimer(this._timer)
    }
    _clearTimer() {
      if (this._timer !== void 0) clearTimeout(this._timer), this._timer = void 0
    }
    _export(A) {
      let B = () => fN.internal._export(this._exporter, A).then((I) => {
          if (I.code !== fN.ExportResultCode.SUCCESS) fN.globalErrorHandler(I.error ?? new Error(`BatchLogRecordProcessor: log record export failed (status ${I})`))
        }).catch(fN.globalErrorHandler),
        Q = A.map((I) => I.resource).filter((I) => I.asyncAttributesPending);
      if (Q.length === 0) return B();
      else return Promise.all(Q.map((I) => I.waitForAsyncAttributes?.())).then(B, fN.globalErrorHandler)
    }
  }
  jb0.BatchLogRecordProcessorBase = _b0
})
// @from(Start 5182153, End 5182412)
bb0 = z((fb0) => {
  Object.defineProperty(fb0, "__esModule", {
    value: !0
  });
  fb0.BatchLogRecordProcessor = void 0;
  var VW6 = kb0();
  class xb0 extends VW6.BatchLogRecordProcessorBase {
    onShutdown() {}
  }
  fb0.BatchLogRecordProcessor = xb0
})
// @from(Start 5182418, End 5182715)
gb0 = z((ld1) => {
  Object.defineProperty(ld1, "__esModule", {
    value: !0
  });
  ld1.BatchLogRecordProcessor = void 0;
  var CW6 = bb0();
  Object.defineProperty(ld1, "BatchLogRecordProcessor", {
    enumerable: !0,
    get: function() {
      return CW6.BatchLogRecordProcessor
    }
  })
})
// @from(Start 5182721, End 5183018)
hb0 = z((id1) => {
  Object.defineProperty(id1, "__esModule", {
    value: !0
  });
  id1.BatchLogRecordProcessor = void 0;
  var HW6 = gb0();
  Object.defineProperty(id1, "BatchLogRecordProcessor", {
    enumerable: !0,
    get: function() {
      return HW6.BatchLogRecordProcessor
    }
  })
})
// @from(Start 5183024, End 5184457)
mb0 = z((vN) => {
  Object.defineProperty(vN, "__esModule", {
    value: !0
  });
  vN.BatchLogRecordProcessor = vN.InMemoryLogRecordExporter = vN.SimpleLogRecordProcessor = vN.ConsoleLogRecordExporter = vN.NoopLogRecordProcessor = vN.LogRecord = vN.LoggerProvider = void 0;
  var wW6 = zb0();
  Object.defineProperty(vN, "LoggerProvider", {
    enumerable: !0,
    get: function() {
      return wW6.LoggerProvider
    }
  });
  var EW6 = pd1();
  Object.defineProperty(vN, "LogRecord", {
    enumerable: !0,
    get: function() {
      return EW6.LogRecord
    }
  });
  var UW6 = cd1();
  Object.defineProperty(vN, "NoopLogRecordProcessor", {
    enumerable: !0,
    get: function() {
      return UW6.NoopLogRecordProcessor
    }
  });
  var NW6 = Nb0();
  Object.defineProperty(vN, "ConsoleLogRecordExporter", {
    enumerable: !0,
    get: function() {
      return NW6.ConsoleLogRecordExporter
    }
  });
  var $W6 = Lb0();
  Object.defineProperty(vN, "SimpleLogRecordProcessor", {
    enumerable: !0,
    get: function() {
      return $W6.SimpleLogRecordProcessor
    }
  });
  var qW6 = Sb0();
  Object.defineProperty(vN, "InMemoryLogRecordExporter", {
    enumerable: !0,
    get: function() {
      return qW6.InMemoryLogRecordExporter
    }
  });
  var MW6 = hb0();
  Object.defineProperty(vN, "BatchLogRecordProcessor", {
    enumerable: !0,
    get: function() {
      return MW6.BatchLogRecordProcessor
    }
  })
})
// @from(Start 5184463, End 5184599)
pb0 = z((db0) => {
  Object.defineProperty(db0, "__esModule", {
    value: !0
  });
  db0.VERSION = void 0;
  db0.VERSION = "0.200.0"
})
// @from(Start 5184605, End 5185153)
ab0 = z((ib0) => {
  Object.defineProperty(ib0, "__esModule", {
    value: !0
  });
  ib0.OTLPLogExporter = void 0;
  var RW6 = p_(),
    OW6 = i_(),
    cb0 = ug(),
    TW6 = pb0();
  class lb0 extends RW6.OTLPExporterBase {
    constructor(A = {}) {
      super(cb0.createOtlpHttpExportDelegate(cb0.convertLegacyHttpOptions(A, "LOGS", "v1/logs", {
        "User-Agent": `OTel-OTLP-Exporter-JavaScript/${TW6.VERSION}`,
        "Content-Type": "application/x-protobuf"
      }), OW6.ProtobufLogsSerializer))
    }
  }
  ib0.OTLPLogExporter = lb0
})
// @from(Start 5185159, End 5185432)
sb0 = z((nd1) => {
  Object.defineProperty(nd1, "__esModule", {
    value: !0
  });
  nd1.OTLPLogExporter = void 0;
  var PW6 = ab0();
  Object.defineProperty(nd1, "OTLPLogExporter", {
    enumerable: !0,
    get: function() {
      return PW6.OTLPLogExporter
    }
  })
})
// @from(Start 5185438, End 5185711)
rb0 = z((ad1) => {
  Object.defineProperty(ad1, "__esModule", {
    value: !0
  });
  ad1.OTLPLogExporter = void 0;
  var _W6 = sb0();
  Object.defineProperty(ad1, "OTLPLogExporter", {
    enumerable: !0,
    get: function() {
      return _W6.OTLPLogExporter
    }
  })
})
// @from(Start 5185717, End 5185990)
ob0 = z((sd1) => {
  Object.defineProperty(sd1, "__esModule", {
    value: !0
  });
  sd1.OTLPLogExporter = void 0;
  var yW6 = rb0();
  Object.defineProperty(sd1, "OTLPLogExporter", {
    enumerable: !0,
    get: function() {
      return yW6.OTLPLogExporter
    }
  })
})
// @from(Start 5185996, End 5186473)
Qg0 = z((Ag0) => {
  Object.defineProperty(Ag0, "__esModule", {
    value: !0
  });
  Ag0.OTLPLogExporter = void 0;
  var tb0 = bd1(),
    xW6 = i_(),
    fW6 = p_();
  class eb0 extends fW6.OTLPExporterBase {
    constructor(A = {}) {
      super(tb0.createOtlpGrpcExportDelegate(tb0.convertLegacyOtlpGrpcOptions(A, "LOGS"), xW6.ProtobufLogsSerializer, "LogsExportService", "/opentelemetry.proto.collector.logs.v1.LogsService/Export"))
    }
  }
  Ag0.OTLPLogExporter = eb0
})
// @from(Start 5186479, End 5186752)
Ig0 = z((rd1) => {
  Object.defineProperty(rd1, "__esModule", {
    value: !0
  });
  rd1.OTLPLogExporter = void 0;
  var vW6 = Qg0();
  Object.defineProperty(rd1, "OTLPLogExporter", {
    enumerable: !0,
    get: function() {
      return vW6.OTLPLogExporter
    }
  })
})
// @from(Start 5186758, End 5186894)
Dg0 = z((Gg0) => {
  Object.defineProperty(Gg0, "__esModule", {
    value: !0
  });
  Gg0.VERSION = void 0;
  Gg0.VERSION = "0.200.0"
})
// @from(Start 5186900, End 5187438)
Xg0 = z((Jg0) => {
  Object.defineProperty(Jg0, "__esModule", {
    value: !0
  });
  Jg0.OTLPLogExporter = void 0;
  var gW6 = p_(),
    hW6 = i_(),
    mW6 = Dg0(),
    Yg0 = ug();
  class Wg0 extends gW6.OTLPExporterBase {
    constructor(A = {}) {
      super(Yg0.createOtlpHttpExportDelegate(Yg0.convertLegacyHttpOptions(A, "LOGS", "v1/logs", {
        "User-Agent": `OTel-OTLP-Exporter-JavaScript/${mW6.VERSION}`,
        "Content-Type": "application/json"
      }), hW6.JsonLogsSerializer))
    }
  }
  Jg0.OTLPLogExporter = Wg0
})
// @from(Start 5187444, End 5187717)
Vg0 = z((od1) => {
  Object.defineProperty(od1, "__esModule", {
    value: !0
  });
  od1.OTLPLogExporter = void 0;
  var dW6 = Xg0();
  Object.defineProperty(od1, "OTLPLogExporter", {
    enumerable: !0,
    get: function() {
      return dW6.OTLPLogExporter
    }
  })
})
// @from(Start 5187723, End 5187996)
Cg0 = z((td1) => {
  Object.defineProperty(td1, "__esModule", {
    value: !0
  });
  td1.OTLPLogExporter = void 0;
  var pW6 = Vg0();
  Object.defineProperty(td1, "OTLPLogExporter", {
    enumerable: !0,
    get: function() {
      return pW6.OTLPLogExporter
    }
  })
})
// @from(Start 5188002, End 5188275)
Kg0 = z((ed1) => {
  Object.defineProperty(ed1, "__esModule", {
    value: !0
  });
  ed1.OTLPLogExporter = void 0;
  var lW6 = Cg0();
  Object.defineProperty(ed1, "OTLPLogExporter", {
    enumerable: !0,
    get: function() {
      return lW6.OTLPLogExporter
    }
  })
})
// @from(Start 5188281, End 5190096)
Tg0 = z((iY) => {
  var BJ6 = iY && iY.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    QJ6 = iY && iY.__setModuleDefault || (Object.create ? function(A, B) {
      Object.defineProperty(A, "default", {
        enumerable: !0,
        value: B
      })
    } : function(A, B) {
      A.default = B
    }),
    Rg0 = iY && iY.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var B = {};
      if (A != null) {
        for (var Q in A)
          if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) BJ6(B, A, Q)
      }
      return QJ6(B, A), B
    };
  Object.defineProperty(iY, "__esModule", {
    value: !0
  });
  iY.req = iY.json = iY.toBuffer = void 0;
  var IJ6 = Rg0(Z1("http")),
    GJ6 = Rg0(Z1("https"));
  async function Og0(A) {
    let B = 0,
      Q = [];
    for await (let I of A) B += I.length, Q.push(I);
    return Buffer.concat(Q, B)
  }
  iY.toBuffer = Og0;
  async function ZJ6(A) {
    let Q = (await Og0(A)).toString("utf8");
    try {
      return JSON.parse(Q)
    } catch (I) {
      let G = I;
      throw G.message += ` (input: ${Q})`, G
    }
  }
  iY.json = ZJ6;

  function DJ6(A, B = {}) {
    let I = ((typeof A === "string" ? A : A.href).startsWith("https:") ? GJ6 : IJ6).request(A, B),
      G = new Promise((Z, D) => {
        I.once("response", Z).once("error", D).end()
      });
    return I.then = G.then.bind(G), I
  }
  iY.req = DJ6
})
// @from(Start 5190102, End 5193886)
yg0 = z((qJ) => {
  var Sg0 = qJ && qJ.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    YJ6 = qJ && qJ.__setModuleDefault || (Object.create ? function(A, B) {
      Object.defineProperty(A, "default", {
        enumerable: !0,
        value: B
      })
    } : function(A, B) {
      A.default = B
    }),
    _g0 = qJ && qJ.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var B = {};
      if (A != null) {
        for (var Q in A)
          if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) Sg0(B, A, Q)
      }
      return YJ6(B, A), B
    },
    WJ6 = qJ && qJ.__exportStar || function(A, B) {
      for (var Q in A)
        if (Q !== "default" && !Object.prototype.hasOwnProperty.call(B, Q)) Sg0(B, A, Q)
    };
  Object.defineProperty(qJ, "__esModule", {
    value: !0
  });
  qJ.Agent = void 0;
  var JJ6 = _g0(Z1("net")),
    Pg0 = _g0(Z1("http")),
    FJ6 = Z1("https");
  WJ6(Tg0(), qJ);
  var Ew = Symbol("AgentBaseInternalState");
  class jg0 extends Pg0.Agent {
    constructor(A) {
      super(A);
      this[Ew] = {}
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
    incrementSockets(A) {
      if (this.maxSockets === 1 / 0 && this.maxTotalSockets === 1 / 0) return null;
      if (!this.sockets[A]) this.sockets[A] = [];
      let B = new JJ6.Socket({
        writable: !1
      });
      return this.sockets[A].push(B), this.totalSocketCount++, B
    }
    decrementSockets(A, B) {
      if (!this.sockets[A] || B === null) return;
      let Q = this.sockets[A],
        I = Q.indexOf(B);
      if (I !== -1) {
        if (Q.splice(I, 1), this.totalSocketCount--, Q.length === 0) delete this.sockets[A]
      }
    }
    getName(A) {
      if (typeof A.secureEndpoint === "boolean" ? A.secureEndpoint : this.isSecureEndpoint(A)) return FJ6.Agent.prototype.getName.call(this, A);
      return super.getName(A)
    }
    createSocket(A, B, Q) {
      let I = {
          ...B,
          secureEndpoint: this.isSecureEndpoint(B)
        },
        G = this.getName(I),
        Z = this.incrementSockets(G);
      Promise.resolve().then(() => this.connect(A, I)).then((D) => {
        if (this.decrementSockets(G, Z), D instanceof Pg0.Agent) try {
          return D.addRequest(A, I)
        } catch (Y) {
          return Q(Y)
        }
        this[Ew].currentSocket = D, super.createSocket(A, B, Q)
      }, (D) => {
        this.decrementSockets(G, Z), Q(D)
      })
    }
    createConnection() {
      let A = this[Ew].currentSocket;
      if (this[Ew].currentSocket = void 0, !A) throw new Error("No socket was returned in the `connect()` function");
      return A
    }
    get defaultPort() {
      return this[Ew].defaultPort ?? (this.protocol === "https:" ? 443 : 80)
    }
    set defaultPort(A) {
      if (this[Ew]) this[Ew].defaultPort = A
    }
    get protocol() {
      return this[Ew].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:")
    }
    set protocol(A) {
      if (this[Ew]) this[Ew].protocol = A
    }
  }
  qJ.Agent = jg0
})
// @from(Start 5193892, End 5196036)
kg0 = z((qh) => {
  var XJ6 = qh && qh.__importDefault || function(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  };
  Object.defineProperty(qh, "__esModule", {
    value: !0
  });
  qh.parseProxyResponse = void 0;
  var VJ6 = XJ6(_l()),
    EY1 = VJ6.default("https-proxy-agent:parse-proxy-response");

  function CJ6(A) {
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
        D(), EY1("onend"), Q(new Error("Proxy connection ended before receiving CONNECT response"))
      }

      function W(F) {
        D(), EY1("onerror %o", F), Q(F)
      }

      function J(F) {
        G.push(F), I += F.length;
        let X = Buffer.concat(G, I),
          V = X.indexOf(`\r
\r
`);
        if (V === -1) {
          EY1("have not received end of HTTP headers yet..."), Z();
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
        EY1("got proxy server response: %o %o", K, O), D(), B({
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
  qh.parseProxyResponse = CJ6
})
// @from(Start 5196042, End 5200210)
Du1 = z((xX) => {
  var KJ6 = xX && xX.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    HJ6 = xX && xX.__setModuleDefault || (Object.create ? function(A, B) {
      Object.defineProperty(A, "default", {
        enumerable: !0,
        value: B
      })
    } : function(A, B) {
      A.default = B
    }),
    bg0 = xX && xX.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var B = {};
      if (A != null) {
        for (var Q in A)
          if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) KJ6(B, A, Q)
      }
      return HJ6(B, A), B
    },
    gg0 = xX && xX.__importDefault || function(A) {
      return A && A.__esModule ? A : {
        default: A
      }
    };
  Object.defineProperty(xX, "__esModule", {
    value: !0
  });
  xX.HttpsProxyAgent = void 0;
  var UY1 = bg0(Z1("net")),
    xg0 = bg0(Z1("tls")),
    zJ6 = gg0(Z1("assert")),
    wJ6 = gg0(_l()),
    EJ6 = yg0(),
    UJ6 = Z1("url"),
    NJ6 = kg0(),
    _r = wJ6.default("https-proxy-agent"),
    fg0 = (A) => {
      if (A.servername === void 0 && A.host && !UY1.isIP(A.host)) return {
        ...A,
        servername: A.host
      };
      return A
    };
  class Zu1 extends EJ6.Agent {
    constructor(A, B) {
      super(B);
      this.options = {
        path: void 0
      }, this.proxy = typeof A === "string" ? new UJ6.URL(A) : A, this.proxyHeaders = B?.headers ?? {}, _r("Creating new HttpsProxyAgent instance: %o", this.proxy.href);
      let Q = (this.proxy.hostname || this.proxy.host).replace(/^\[|\]$/g, ""),
        I = this.proxy.port ? parseInt(this.proxy.port, 10) : this.proxy.protocol === "https:" ? 443 : 80;
      this.connectOpts = {
        ALPNProtocols: ["http/1.1"],
        ...B ? vg0(B, "headers") : null,
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
      if (Q.protocol === "https:") _r("Creating `tls.Socket`: %o", this.connectOpts), I = xg0.connect(fg0(this.connectOpts));
      else _r("Creating `net.Socket`: %o", this.connectOpts), I = UY1.connect(this.connectOpts);
      let G = typeof this.proxyHeaders === "function" ? this.proxyHeaders() : {
          ...this.proxyHeaders
        },
        Z = UY1.isIPv6(B.host) ? `[${B.host}]` : B.host,
        D = `CONNECT ${Z}:${B.port} HTTP/1.1\r
`;
      if (Q.username || Q.password) {
        let X = `${decodeURIComponent(Q.username)}:${decodeURIComponent(Q.password)}`;
        G["Proxy-Authorization"] = `Basic ${Buffer.from(X).toString("base64")}`
      }
      if (G.Host = `${Z}:${B.port}`, !G["Proxy-Connection"]) G["Proxy-Connection"] = this.keepAlive ? "Keep-Alive" : "close";
      for (let X of Object.keys(G)) D += `${X}: ${G[X]}\r
`;
      let Y = NJ6.parseProxyResponse(I);
      I.write(`${D}\r
`);
      let {
        connect: W,
        buffered: J
      } = await Y;
      if (A.emit("proxyConnect", W), this.emit("proxyConnect", W, A), W.statusCode === 200) {
        if (A.once("socket", $J6), B.secureEndpoint) return _r("Upgrading socket connection to TLS"), xg0.connect({
          ...vg0(fg0(B), "host", "path", "port"),
          socket: I
        });
        return I
      }
      I.destroy();
      let F = new UY1.Socket({
        writable: !1
      });
      return F.readable = !0, A.once("socket", (X) => {
        _r("Replaying proxy buffer for failed request"), zJ6.default(X.listenerCount("data") > 0), X.push(J), X.push(null)
      }), F
    }
  }
  Zu1.protocols = ["http", "https"];
  xX.HttpsProxyAgent = Zu1;

  function $J6(A) {
    A.resume()
  }

  function vg0(A, ...B) {
    let Q = {},
      I;
    for (I in A)
      if (!B.includes(I)) Q[I] = A[I];
    return Q
  }
})
// @from(Start 5200216, End 5202919)
A3 = z((HR8, hg0) => {
  hg0.exports = {
    kClose: Symbol("close"),
    kDestroy: Symbol("destroy"),
    kDispatch: Symbol("dispatch"),
    kUrl: Symbol("url"),
    kWriting: Symbol("writing"),
    kResuming: Symbol("resuming"),
    kQueue: Symbol("queue"),
    kConnect: Symbol("connect"),
    kConnecting: Symbol("connecting"),
    kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
    kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
    kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
    kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
    kKeepAlive: Symbol("keep alive"),
    kHeadersTimeout: Symbol("headers timeout"),
    kBodyTimeout: Symbol("body timeout"),
    kServerName: Symbol("server name"),
    kLocalAddress: Symbol("local address"),
    kHost: Symbol("host"),
    kNoRef: Symbol("no ref"),
    kBodyUsed: Symbol("used"),
    kBody: Symbol("abstracted request body"),
    kRunning: Symbol("running"),
    kBlocking: Symbol("blocking"),
    kPending: Symbol("pending"),
    kSize: Symbol("size"),
    kBusy: Symbol("busy"),
    kQueued: Symbol("queued"),
    kFree: Symbol("free"),
    kConnected: Symbol("connected"),
    kClosed: Symbol("closed"),
    kNeedDrain: Symbol("need drain"),
    kReset: Symbol("reset"),
    kDestroyed: Symbol.for("nodejs.stream.destroyed"),
    kResume: Symbol("resume"),
    kOnError: Symbol("on error"),
    kMaxHeadersSize: Symbol("max headers size"),
    kRunningIdx: Symbol("running index"),
    kPendingIdx: Symbol("pending index"),
    kError: Symbol("error"),
    kClients: Symbol("clients"),
    kClient: Symbol("client"),
    kParser: Symbol("parser"),
    kOnDestroyed: Symbol("destroy callbacks"),
    kPipelining: Symbol("pipelining"),
    kSocket: Symbol("socket"),
    kHostHeader: Symbol("host header"),
    kConnector: Symbol("connector"),
    kStrictContentLength: Symbol("strict content length"),
    kMaxRedirections: Symbol("maxRedirections"),
    kMaxRequests: Symbol("maxRequestsPerClient"),
    kProxy: Symbol("proxy agent options"),
    kCounter: Symbol("socket request counter"),
    kInterceptors: Symbol("dispatch interceptors"),
    kMaxResponseSize: Symbol("max response size"),
    kHTTP2Session: Symbol("http2Session"),
    kHTTP2SessionState: Symbol("http2Session state"),
    kRetryHandlerDefaultRetry: Symbol("retry agent default retry"),
    kConstruct: Symbol("constructable"),
    kListeners: Symbol("listeners"),
    kHTTPContext: Symbol("http context"),
    kMaxConcurrentStreams: Symbol("max concurrent streams"),
    kNoProxyAgent: Symbol("no proxy agent"),
    kHttpProxyAgent: Symbol("http proxy agent"),
    kHttpsProxyAgent: Symbol("https proxy agent")
  }
})
// @from(Start 5202925, End 5208542)
u5 = z((zR8, Yh0) => {
  class l3 extends Error {
    constructor(A) {
      super(A);
      this.name = "UndiciError", this.code = "UND_ERR"
    }
  }
  class mg0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "ConnectTimeoutError", this.message = A || "Connect Timeout Error", this.code = "UND_ERR_CONNECT_TIMEOUT"
    }
  }
  class dg0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "HeadersTimeoutError", this.message = A || "Headers Timeout Error", this.code = "UND_ERR_HEADERS_TIMEOUT"
    }
  }
  class ug0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "HeadersOverflowError", this.message = A || "Headers Overflow Error", this.code = "UND_ERR_HEADERS_OVERFLOW"
    }
  }
  class pg0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "BodyTimeoutError", this.message = A || "Body Timeout Error", this.code = "UND_ERR_BODY_TIMEOUT"
    }
  }
  class cg0 extends l3 {
    constructor(A, B, Q, I) {
      super(A);
      this.name = "ResponseStatusCodeError", this.message = A || "Response Status Code Error", this.code = "UND_ERR_RESPONSE_STATUS_CODE", this.body = I, this.status = B, this.statusCode = B, this.headers = Q
    }
  }
  class lg0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "InvalidArgumentError", this.message = A || "Invalid Argument Error", this.code = "UND_ERR_INVALID_ARG"
    }
  }
  class ig0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "InvalidReturnValueError", this.message = A || "Invalid Return Value Error", this.code = "UND_ERR_INVALID_RETURN_VALUE"
    }
  }
  class Yu1 extends l3 {
    constructor(A) {
      super(A);
      this.name = "AbortError", this.message = A || "The operation was aborted"
    }
  }
  class ng0 extends Yu1 {
    constructor(A) {
      super(A);
      this.name = "AbortError", this.message = A || "Request aborted", this.code = "UND_ERR_ABORTED"
    }
  }
  class ag0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "InformationalError", this.message = A || "Request information", this.code = "UND_ERR_INFO"
    }
  }
  class sg0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "RequestContentLengthMismatchError", this.message = A || "Request body length does not match content-length header", this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH"
    }
  }
  class rg0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "ResponseContentLengthMismatchError", this.message = A || "Response body length does not match content-length header", this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH"
    }
  }
  class og0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "ClientDestroyedError", this.message = A || "The client is destroyed", this.code = "UND_ERR_DESTROYED"
    }
  }
  class tg0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "ClientClosedError", this.message = A || "The client is closed", this.code = "UND_ERR_CLOSED"
    }
  }
  class eg0 extends l3 {
    constructor(A, B) {
      super(A);
      this.name = "SocketError", this.message = A || "Socket error", this.code = "UND_ERR_SOCKET", this.socket = B
    }
  }
  class Ah0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "NotSupportedError", this.message = A || "Not supported error", this.code = "UND_ERR_NOT_SUPPORTED"
    }
  }
  class Bh0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "MissingUpstreamError", this.message = A || "No upstream has been added to the BalancedPool", this.code = "UND_ERR_BPL_MISSING_UPSTREAM"
    }
  }
  class Qh0 extends Error {
    constructor(A, B, Q) {
      super(A);
      this.name = "HTTPParserError", this.code = B ? `HPE_${B}` : void 0, this.data = Q ? Q.toString() : void 0
    }
  }
  class Ih0 extends l3 {
    constructor(A) {
      super(A);
      this.name = "ResponseExceededMaxSizeError", this.message = A || "Response content exceeded max size", this.code = "UND_ERR_RES_EXCEEDED_MAX_SIZE"
    }
  }
  class Gh0 extends l3 {
    constructor(A, B, {
      headers: Q,
      data: I
    }) {
      super(A);
      this.name = "RequestRetryError", this.message = A || "Request retry error", this.code = "UND_ERR_REQ_RETRY", this.statusCode = B, this.data = I, this.headers = Q
    }
  }
  class Zh0 extends l3 {
    constructor(A, B, {
      headers: Q,
      data: I
    }) {
      super(A);
      this.name = "ResponseError", this.message = A || "Response error", this.code = "UND_ERR_RESPONSE", this.statusCode = B, this.data = I, this.headers = Q
    }
  }
  class Dh0 extends l3 {
    constructor(A, B, Q) {
      super(B, {
        cause: A,
        ...Q ?? {}
      });
      this.name = "SecureProxyConnectionError", this.message = B || "Secure Proxy Connection failed", this.code = "UND_ERR_PRX_TLS", this.cause = A
    }
  }
  Yh0.exports = {
    AbortError: Yu1,
    HTTPParserError: Qh0,
    UndiciError: l3,
    HeadersTimeoutError: dg0,
    HeadersOverflowError: ug0,
    BodyTimeoutError: pg0,
    RequestContentLengthMismatchError: sg0,
    ConnectTimeoutError: mg0,
    ResponseStatusCodeError: cg0,
    InvalidArgumentError: lg0,
    InvalidReturnValueError: ig0,
    RequestAbortedError: ng0,
    ClientDestroyedError: og0,
    ClientClosedError: tg0,
    InformationalError: ag0,
    SocketError: eg0,
    NotSupportedError: Ah0,
    ResponseContentLengthMismatchError: rg0,
    BalancedPoolMissingUpstreamError: Bh0,
    ResponseExceededMaxSizeError: Ih0,
    RequestRetryError: Gh0,
    ResponseError: Zh0,
    SecureProxyConnectionError: Dh0
  }
})
// @from(Start 5208548, End 5210610)
$Y1 = z((wR8, Wh0) => {
  var NY1 = {},
    Wu1 = ["Accept", "Accept-Encoding", "Accept-Language", "Accept-Ranges", "Access-Control-Allow-Credentials", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods", "Access-Control-Allow-Origin", "Access-Control-Expose-Headers", "Access-Control-Max-Age", "Access-Control-Request-Headers", "Access-Control-Request-Method", "Age", "Allow", "Alt-Svc", "Alt-Used", "Authorization", "Cache-Control", "Clear-Site-Data", "Connection", "Content-Disposition", "Content-Encoding", "Content-Language", "Content-Length", "Content-Location", "Content-Range", "Content-Security-Policy", "Content-Security-Policy-Report-Only", "Content-Type", "Cookie", "Cross-Origin-Embedder-Policy", "Cross-Origin-Opener-Policy", "Cross-Origin-Resource-Policy", "Date", "Device-Memory", "Downlink", "ECT", "ETag", "Expect", "Expect-CT", "Expires", "Forwarded", "From", "Host", "If-Match", "If-Modified-Since", "If-None-Match", "If-Range", "If-Unmodified-Since", "Keep-Alive", "Last-Modified", "Link", "Location", "Max-Forwards", "Origin", "Permissions-Policy", "Pragma", "Proxy-Authenticate", "Proxy-Authorization", "RTT", "Range", "Referer", "Referrer-Policy", "Refresh", "Retry-After", "Sec-WebSocket-Accept", "Sec-WebSocket-Extensions", "Sec-WebSocket-Key", "Sec-WebSocket-Protocol", "Sec-WebSocket-Version", "Server", "Server-Timing", "Service-Worker-Allowed", "Service-Worker-Navigation-Preload", "Set-Cookie", "SourceMap", "Strict-Transport-Security", "Supports-Loading-Mode", "TE", "Timing-Allow-Origin", "Trailer", "Transfer-Encoding", "Upgrade", "Upgrade-Insecure-Requests", "User-Agent", "Vary", "Via", "WWW-Authenticate", "X-Content-Type-Options", "X-DNS-Prefetch-Control", "X-Frame-Options", "X-Permitted-Cross-Domain-Policies", "X-Powered-By", "X-Requested-With", "X-XSS-Protection"];
  for (let A = 0; A < Wu1.length; ++A) {
    let B = Wu1[A],
      Q = B.toLowerCase();
    NY1[B] = NY1[Q] = Q
  }
  Object.setPrototypeOf(NY1, null);
  Wh0.exports = {
    wellknownHeaderNames: Wu1,
    headerNameLowerCasedRecord: NY1
  }
})
// @from(Start 5210616, End 5212697)
Vh0 = z((ER8, Xh0) => {
  var {
    wellknownHeaderNames: Jh0,
    headerNameLowerCasedRecord: qJ6
  } = $Y1();
  class Mh {
    value = null;
    left = null;
    middle = null;
    right = null;
    code;
    constructor(A, B, Q) {
      if (Q === void 0 || Q >= A.length) throw new TypeError("Unreachable");
      if ((this.code = A.charCodeAt(Q)) > 127) throw new TypeError("key must be ascii string");
      if (A.length !== ++Q) this.middle = new Mh(A, B, Q);
      else this.value = B
    }
    add(A, B) {
      let Q = A.length;
      if (Q === 0) throw new TypeError("Unreachable");
      let I = 0,
        G = this;
      while (!0) {
        let Z = A.charCodeAt(I);
        if (Z > 127) throw new TypeError("key must be ascii string");
        if (G.code === Z)
          if (Q === ++I) {
            G.value = B;
            break
          } else if (G.middle !== null) G = G.middle;
        else {
          G.middle = new Mh(A, B, I);
          break
        } else if (G.code < Z)
          if (G.left !== null) G = G.left;
          else {
            G.left = new Mh(A, B, I);
            break
          }
        else if (G.right !== null) G = G.right;
        else {
          G.right = new Mh(A, B, I);
          break
        }
      }
    }
    search(A) {
      let B = A.length,
        Q = 0,
        I = this;
      while (I !== null && Q < B) {
        let G = A[Q];
        if (G <= 90 && G >= 65) G |= 32;
        while (I !== null) {
          if (G === I.code) {
            if (B === ++Q) return I;
            I = I.middle;
            break
          }
          I = I.code < G ? I.left : I.right
        }
      }
      return null
    }
  }
  class Ju1 {
    node = null;
    insert(A, B) {
      if (this.node === null) this.node = new Mh(A, B, 0);
      else this.node.add(A, B)
    }
    lookup(A) {
      return this.node?.search(A)?.value ?? null
    }
  }
  var Fh0 = new Ju1;
  for (let A = 0; A < Jh0.length; ++A) {
    let B = qJ6[Jh0[A]];
    Fh0.insert(B, B)
  }
  Xh0.exports = {
    TernarySearchTree: Ju1,
    tree: Fh0
  }
})
// @from(Start 5212703, End 5225649)
C6 = z((UR8, Ph0) => {
  var jr = Z1("node:assert"),
    {
      kDestroyed: Kh0,
      kBodyUsed: Lh,
      kListeners: Fu1,
      kBody: Ch0
    } = A3(),
    {
      IncomingMessage: MJ6
    } = Z1("node:http"),
    MY1 = Z1("node:stream"),
    LJ6 = Z1("node:net"),
    {
      Blob: RJ6
    } = Z1("node:buffer"),
    OJ6 = Z1("node:util"),
    {
      stringify: TJ6
    } = Z1("node:querystring"),
    {
      EventEmitter: PJ6
    } = Z1("node:events"),
    {
      InvalidArgumentError: TI
    } = u5(),
    {
      headerNameLowerCasedRecord: SJ6
    } = $Y1(),
    {
      tree: Hh0
    } = Vh0(),
    [_J6, jJ6] = process.versions.node.split(".").map((A) => Number(A));
  class Xu1 {
    constructor(A) {
      this[Ch0] = A, this[Lh] = !1
    }
    async * [Symbol.asyncIterator]() {
      jr(!this[Lh], "disturbed"), this[Lh] = !0, yield* this[Ch0]
    }
  }

  function yJ6(A) {
    if (LY1(A)) {
      if (Nh0(A) === 0) A.on("data", function() {
        jr(!1)
      });
      if (typeof A.readableDidRead !== "boolean") A[Lh] = !1, PJ6.prototype.on.call(A, "data", function() {
        this[Lh] = !0
      });
      return A
    } else if (A && typeof A.pipeTo === "function") return new Xu1(A);
    else if (A && typeof A !== "string" && !ArrayBuffer.isView(A) && Uh0(A)) return new Xu1(A);
    else return A
  }

  function kJ6() {}

  function LY1(A) {
    return A && typeof A === "object" && typeof A.pipe === "function" && typeof A.on === "function"
  }

  function zh0(A) {
    if (A === null) return !1;
    else if (A instanceof RJ6) return !0;
    else if (typeof A !== "object") return !1;
    else {
      let B = A[Symbol.toStringTag];
      return (B === "Blob" || B === "File") && (("stream" in A) && typeof A.stream === "function" || ("arrayBuffer" in A) && typeof A.arrayBuffer === "function")
    }
  }

  function xJ6(A, B) {
    if (A.includes("?") || A.includes("#")) throw new Error('Query params cannot be passed when url already contains "?" or "#".');
    let Q = TJ6(B);
    if (Q) A += "?" + Q;
    return A
  }

  function wh0(A) {
    let B = parseInt(A, 10);
    return B === Number(A) && B >= 0 && B <= 65535
  }

  function qY1(A) {
    return A != null && A[0] === "h" && A[1] === "t" && A[2] === "t" && A[3] === "p" && (A[4] === ":" || A[4] === "s" && A[5] === ":")
  }

  function Eh0(A) {
    if (typeof A === "string") {
      if (A = new URL(A), !qY1(A.origin || A.protocol)) throw new TI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
      return A
    }
    if (!A || typeof A !== "object") throw new TI("Invalid URL: The URL argument must be a non-null object.");
    if (!(A instanceof URL)) {
      if (A.port != null && A.port !== "" && wh0(A.port) === !1) throw new TI("Invalid URL: port must be a valid integer or a string representation of an integer.");
      if (A.path != null && typeof A.path !== "string") throw new TI("Invalid URL path: the path must be a string or null/undefined.");
      if (A.pathname != null && typeof A.pathname !== "string") throw new TI("Invalid URL pathname: the pathname must be a string or null/undefined.");
      if (A.hostname != null && typeof A.hostname !== "string") throw new TI("Invalid URL hostname: the hostname must be a string or null/undefined.");
      if (A.origin != null && typeof A.origin !== "string") throw new TI("Invalid URL origin: the origin must be a string or null/undefined.");
      if (!qY1(A.origin || A.protocol)) throw new TI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
      let B = A.port != null ? A.port : A.protocol === "https:" ? 443 : 80,
        Q = A.origin != null ? A.origin : `${A.protocol||""}//${A.hostname||""}:${B}`,
        I = A.path != null ? A.path : `${A.pathname||""}${A.search||""}`;
      if (Q[Q.length - 1] === "/") Q = Q.slice(0, Q.length - 1);
      if (I && I[0] !== "/") I = `/${I}`;
      return new URL(`${Q}${I}`)
    }
    if (!qY1(A.origin || A.protocol)) throw new TI("Invalid URL protocol: the URL must start with `http:` or `https:`.");
    return A
  }

  function fJ6(A) {
    if (A = Eh0(A), A.pathname !== "/" || A.search || A.hash) throw new TI("invalid url");
    return A
  }

  function vJ6(A) {
    if (A[0] === "[") {
      let Q = A.indexOf("]");
      return jr(Q !== -1), A.substring(1, Q)
    }
    let B = A.indexOf(":");
    if (B === -1) return A;
    return A.substring(0, B)
  }

  function bJ6(A) {
    if (!A) return null;
    jr(typeof A === "string");
    let B = vJ6(A);
    if (LJ6.isIP(B)) return "";
    return B
  }

  function gJ6(A) {
    return JSON.parse(JSON.stringify(A))
  }

  function hJ6(A) {
    return A != null && typeof A[Symbol.asyncIterator] === "function"
  }

  function Uh0(A) {
    return A != null && (typeof A[Symbol.iterator] === "function" || typeof A[Symbol.asyncIterator] === "function")
  }

  function Nh0(A) {
    if (A == null) return 0;
    else if (LY1(A)) {
      let B = A._readableState;
      return B && B.objectMode === !1 && B.ended === !0 && Number.isFinite(B.length) ? B.length : null
    } else if (zh0(A)) return A.size != null ? A.size : null;
    else if (Mh0(A)) return A.byteLength;
    return null
  }

  function $h0(A) {
    return A && !!(A.destroyed || A[Kh0] || MY1.isDestroyed?.(A))
  }

  function mJ6(A, B) {
    if (A == null || !LY1(A) || $h0(A)) return;
    if (typeof A.destroy === "function") {
      if (Object.getPrototypeOf(A).constructor === MJ6) A.socket = null;
      A.destroy(B)
    } else if (B) queueMicrotask(() => {
      A.emit("error", B)
    });
    if (A.destroyed !== !0) A[Kh0] = !0
  }
  var dJ6 = /timeout=(\d+)/;

  function uJ6(A) {
    let B = A.toString().match(dJ6);
    return B ? parseInt(B[1], 10) * 1000 : null
  }

  function qh0(A) {
    return typeof A === "string" ? SJ6[A] ?? A.toLowerCase() : Hh0.lookup(A) ?? A.toString("latin1").toLowerCase()
  }

  function pJ6(A) {
    return Hh0.lookup(A) ?? A.toString("latin1").toLowerCase()
  }

  function cJ6(A, B) {
    if (B === void 0) B = {};
    for (let Q = 0; Q < A.length; Q += 2) {
      let I = qh0(A[Q]),
        G = B[I];
      if (G) {
        if (typeof G === "string") G = [G], B[I] = G;
        G.push(A[Q + 1].toString("utf8"))
      } else {
        let Z = A[Q + 1];
        if (typeof Z === "string") B[I] = Z;
        else B[I] = Array.isArray(Z) ? Z.map((D) => D.toString("utf8")) : Z.toString("utf8")
      }
    }
    if ("content-length" in B && "content-disposition" in B) B["content-disposition"] = Buffer.from(B["content-disposition"]).toString("latin1");
    return B
  }

  function lJ6(A) {
    let B = A.length,
      Q = new Array(B),
      I = !1,
      G = -1,
      Z, D, Y = 0;
    for (let W = 0; W < A.length; W += 2) {
      if (Z = A[W], D = A[W + 1], typeof Z !== "string" && (Z = Z.toString()), typeof D !== "string" && (D = D.toString("utf8")), Y = Z.length, Y === 14 && Z[7] === "-" && (Z === "content-length" || Z.toLowerCase() === "content-length")) I = !0;
      else if (Y === 19 && Z[7] === "-" && (Z === "content-disposition" || Z.toLowerCase() === "content-disposition")) G = W + 1;
      Q[W] = Z, Q[W + 1] = D
    }
    if (I && G !== -1) Q[G] = Buffer.from(Q[G]).toString("latin1");
    return Q
  }

  function Mh0(A) {
    return A instanceof Uint8Array || Buffer.isBuffer(A)
  }

  function iJ6(A, B, Q) {
    if (!A || typeof A !== "object") throw new TI("handler must be an object");
    if (typeof A.onConnect !== "function") throw new TI("invalid onConnect method");
    if (typeof A.onError !== "function") throw new TI("invalid onError method");
    if (typeof A.onBodySent !== "function" && A.onBodySent !== void 0) throw new TI("invalid onBodySent method");
    if (Q || B === "CONNECT") {
      if (typeof A.onUpgrade !== "function") throw new TI("invalid onUpgrade method")
    } else {
      if (typeof A.onHeaders !== "function") throw new TI("invalid onHeaders method");
      if (typeof A.onData !== "function") throw new TI("invalid onData method");
      if (typeof A.onComplete !== "function") throw new TI("invalid onComplete method")
    }
  }

  function nJ6(A) {
    return !!(A && (MY1.isDisturbed(A) || A[Lh]))
  }

  function aJ6(A) {
    return !!(A && MY1.isErrored(A))
  }

  function sJ6(A) {
    return !!(A && MY1.isReadable(A))
  }

  function rJ6(A) {
    return {
      localAddress: A.localAddress,
      localPort: A.localPort,
      remoteAddress: A.remoteAddress,
      remotePort: A.remotePort,
      remoteFamily: A.remoteFamily,
      timeout: A.timeout,
      bytesWritten: A.bytesWritten,
      bytesRead: A.bytesRead
    }
  }

  function oJ6(A) {
    let B;
    return new ReadableStream({
      async start() {
        B = A[Symbol.asyncIterator]()
      },
      async pull(Q) {
        let {
          done: I,
          value: G
        } = await B.next();
        if (I) queueMicrotask(() => {
          Q.close(), Q.byobRequest?.respond(0)
        });
        else {
          let Z = Buffer.isBuffer(G) ? G : Buffer.from(G);
          if (Z.byteLength) Q.enqueue(new Uint8Array(Z))
        }
        return Q.desiredSize > 0
      },
      async cancel(Q) {
        await B.return()
      },
      type: "bytes"
    })
  }

  function tJ6(A) {
    return A && typeof A === "object" && typeof A.append === "function" && typeof A.delete === "function" && typeof A.get === "function" && typeof A.getAll === "function" && typeof A.has === "function" && typeof A.set === "function" && A[Symbol.toStringTag] === "FormData"
  }

  function eJ6(A, B) {
    if ("addEventListener" in A) return A.addEventListener("abort", B, {
      once: !0
    }), () => A.removeEventListener("abort", B);
    return A.addListener("abort", B), () => A.removeListener("abort", B)
  }
  var AF6 = typeof String.prototype.toWellFormed === "function",
    BF6 = typeof String.prototype.isWellFormed === "function";

  function Lh0(A) {
    return AF6 ? `${A}`.toWellFormed() : OJ6.toUSVString(A)
  }

  function QF6(A) {
    return BF6 ? `${A}`.isWellFormed() : Lh0(A) === `${A}`
  }

  function Rh0(A) {
    switch (A) {
      case 34:
      case 40:
      case 41:
      case 44:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 123:
      case 125:
        return !1;
      default:
        return A >= 33 && A <= 126
    }
  }

  function IF6(A) {
    if (A.length === 0) return !1;
    for (let B = 0; B < A.length; ++B)
      if (!Rh0(A.charCodeAt(B))) return !1;
    return !0
  }
  var GF6 = /[^\t\x20-\x7e\x80-\xff]/;

  function ZF6(A) {
    return !GF6.test(A)
  }

  function DF6(A) {
    if (A == null || A === "") return {
      start: 0,
      end: null,
      size: null
    };
    let B = A ? A.match(/^bytes (\d+)-(\d+)\/(\d+)?$/) : null;
    return B ? {
      start: parseInt(B[1]),
      end: B[2] ? parseInt(B[2]) : null,
      size: B[3] ? parseInt(B[3]) : null
    } : null
  }

  function YF6(A, B, Q) {
    return (A[Fu1] ??= []).push([B, Q]), A.on(B, Q), A
  }

  function WF6(A) {
    for (let [B, Q] of A[Fu1] ?? []) A.removeListener(B, Q);
    A[Fu1] = null
  }

  function JF6(A, B, Q) {
    try {
      B.onError(Q), jr(B.aborted)
    } catch (I) {
      A.emit("error", I)
    }
  }
  var Oh0 = Object.create(null);
  Oh0.enumerable = !0;
  var Vu1 = {
      delete: "DELETE",
      DELETE: "DELETE",
      get: "GET",
      GET: "GET",
      head: "HEAD",
      HEAD: "HEAD",
      options: "OPTIONS",
      OPTIONS: "OPTIONS",
      post: "POST",
      POST: "POST",
      put: "PUT",
      PUT: "PUT"
    },
    Th0 = {
      ...Vu1,
      patch: "patch",
      PATCH: "PATCH"
    };
  Object.setPrototypeOf(Vu1, null);
  Object.setPrototypeOf(Th0, null);
  Ph0.exports = {
    kEnumerableProperty: Oh0,
    nop: kJ6,
    isDisturbed: nJ6,
    isErrored: aJ6,
    isReadable: sJ6,
    toUSVString: Lh0,
    isUSVString: QF6,
    isBlobLike: zh0,
    parseOrigin: fJ6,
    parseURL: Eh0,
    getServerName: bJ6,
    isStream: LY1,
    isIterable: Uh0,
    isAsyncIterable: hJ6,
    isDestroyed: $h0,
    headerNameToString: qh0,
    bufferToLowerCasedHeaderName: pJ6,
    addListener: YF6,
    removeAllListeners: WF6,
    errorRequest: JF6,
    parseRawHeaders: lJ6,
    parseHeaders: cJ6,
    parseKeepAliveTimeout: uJ6,
    destroy: mJ6,
    bodyLength: Nh0,
    deepClone: gJ6,
    ReadableStreamFrom: oJ6,
    isBuffer: Mh0,
    validateHandler: iJ6,
    getSocketInfo: rJ6,
    isFormDataLike: tJ6,
    buildURL: xJ6,
    addAbortListener: eJ6,
    isValidHTTPToken: IF6,
    isValidHeaderValue: ZF6,
    isTokenCharCode: Rh0,
    parseRangeHeader: DF6,
    normalizedMethodRecordsBase: Vu1,
    normalizedMethodRecords: Th0,
    isValidPort: wh0,
    isHttpOrHttpsPrefixed: qY1,
    nodeMajor: _J6,
    nodeMinor: jJ6,
    safeHTTPMethods: ["GET", "HEAD", "OPTIONS", "TRACE"],
    wrapRequestBody: yJ6
  }
})
// @from(Start 5225655, End 5230655)
Rh = z((NR8, _h0) => {
  var a5 = Z1("node:diagnostics_channel"),
    Ku1 = Z1("node:util"),
    RY1 = Ku1.debuglog("undici"),
    Cu1 = Ku1.debuglog("fetch"),
    Yj = Ku1.debuglog("websocket"),
    Sh0 = !1,
    FF6 = {
      beforeConnect: a5.channel("undici:client:beforeConnect"),
      connected: a5.channel("undici:client:connected"),
      connectError: a5.channel("undici:client:connectError"),
      sendHeaders: a5.channel("undici:client:sendHeaders"),
      create: a5.channel("undici:request:create"),
      bodySent: a5.channel("undici:request:bodySent"),
      headers: a5.channel("undici:request:headers"),
      trailers: a5.channel("undici:request:trailers"),
      error: a5.channel("undici:request:error"),
      open: a5.channel("undici:websocket:open"),
      close: a5.channel("undici:websocket:close"),
      socketError: a5.channel("undici:websocket:socket_error"),
      ping: a5.channel("undici:websocket:ping"),
      pong: a5.channel("undici:websocket:pong")
    };
  if (RY1.enabled || Cu1.enabled) {
    let A = Cu1.enabled ? Cu1 : RY1;
    a5.channel("undici:client:beforeConnect").subscribe((B) => {
      let {
        connectParams: {
          version: Q,
          protocol: I,
          port: G,
          host: Z
        }
      } = B;
      A("connecting to %s using %s%s", `${Z}${G?`:${G}`:""}`, I, Q)
    }), a5.channel("undici:client:connected").subscribe((B) => {
      let {
        connectParams: {
          version: Q,
          protocol: I,
          port: G,
          host: Z
        }
      } = B;
      A("connected to %s using %s%s", `${Z}${G?`:${G}`:""}`, I, Q)
    }), a5.channel("undici:client:connectError").subscribe((B) => {
      let {
        connectParams: {
          version: Q,
          protocol: I,
          port: G,
          host: Z
        },
        error: D
      } = B;
      A("connection to %s using %s%s errored - %s", `${Z}${G?`:${G}`:""}`, I, Q, D.message)
    }), a5.channel("undici:client:sendHeaders").subscribe((B) => {
      let {
        request: {
          method: Q,
          path: I,
          origin: G
        }
      } = B;
      A("sending request to %s %s/%s", Q, G, I)
    }), a5.channel("undici:request:headers").subscribe((B) => {
      let {
        request: {
          method: Q,
          path: I,
          origin: G
        },
        response: {
          statusCode: Z
        }
      } = B;
      A("received response to %s %s/%s - HTTP %d", Q, G, I, Z)
    }), a5.channel("undici:request:trailers").subscribe((B) => {
      let {
        request: {
          method: Q,
          path: I,
          origin: G
        }
      } = B;
      A("trailers received from %s %s/%s", Q, G, I)
    }), a5.channel("undici:request:error").subscribe((B) => {
      let {
        request: {
          method: Q,
          path: I,
          origin: G
        },
        error: Z
      } = B;
      A("request to %s %s/%s errored - %s", Q, G, I, Z.message)
    }), Sh0 = !0
  }
  if (Yj.enabled) {
    if (!Sh0) {
      let A = RY1.enabled ? RY1 : Yj;
      a5.channel("undici:client:beforeConnect").subscribe((B) => {
        let {
          connectParams: {
            version: Q,
            protocol: I,
            port: G,
            host: Z
          }
        } = B;
        A("connecting to %s%s using %s%s", Z, G ? `:${G}` : "", I, Q)
      }), a5.channel("undici:client:connected").subscribe((B) => {
        let {
          connectParams: {
            version: Q,
            protocol: I,
            port: G,
            host: Z
          }
        } = B;
        A("connected to %s%s using %s%s", Z, G ? `:${G}` : "", I, Q)
      }), a5.channel("undici:client:connectError").subscribe((B) => {
        let {
          connectParams: {
            version: Q,
            protocol: I,
            port: G,
            host: Z
          },
          error: D
        } = B;
        A("connection to %s%s using %s%s errored - %s", Z, G ? `:${G}` : "", I, Q, D.message)
      }), a5.channel("undici:client:sendHeaders").subscribe((B) => {
        let {
          request: {
            method: Q,
            path: I,
            origin: G
          }
        } = B;
        A("sending request to %s %s/%s", Q, G, I)
      })
    }
    a5.channel("undici:websocket:open").subscribe((A) => {
      let {
        address: {
          address: B,
          port: Q
        }
      } = A;
      Yj("connection opened %s%s", B, Q ? `:${Q}` : "")
    }), a5.channel("undici:websocket:close").subscribe((A) => {
      let {
        websocket: B,
        code: Q,
        reason: I
      } = A;
      Yj("closed connection to %s - %s %s", B.url, Q, I)
    }), a5.channel("undici:websocket:socket_error").subscribe((A) => {
      Yj("connection errored - %s", A.message)
    }), a5.channel("undici:websocket:ping").subscribe((A) => {
      Yj("ping received")
    }), a5.channel("undici:websocket:pong").subscribe((A) => {
      Yj("pong received")
    })
  }
  _h0.exports = {
    channels: FF6
  }
})
// @from(Start 5230661, End 5238533)
vh0 = z(($R8, fh0) => {
  var {
    InvalidArgumentError: q3,
    NotSupportedError: XF6
  } = u5(), bN = Z1("node:assert"), {
    isValidHTTPToken: kh0,
    isValidHeaderValue: jh0,
    isStream: VF6,
    destroy: CF6,
    isBuffer: KF6,
    isFormDataLike: HF6,
    isIterable: zF6,
    isBlobLike: wF6,
    buildURL: EF6,
    validateHandler: UF6,
    getServerName: NF6,
    normalizedMethodRecords: $F6
  } = C6(), {
    channels: Uw
  } = Rh(), {
    headerNameLowerCasedRecord: yh0
  } = $Y1(), qF6 = /[^\u0021-\u00ff]/, fX = Symbol("handler");
  class xh0 {
    constructor(A, {
      path: B,
      method: Q,
      body: I,
      headers: G,
      query: Z,
      idempotent: D,
      blocking: Y,
      upgrade: W,
      headersTimeout: J,
      bodyTimeout: F,
      reset: X,
      throwOnError: V,
      expectContinue: C,
      servername: K
    }, E) {
      if (typeof B !== "string") throw new q3("path must be a string");
      else if (B[0] !== "/" && !(B.startsWith("http://") || B.startsWith("https://")) && Q !== "CONNECT") throw new q3("path must be an absolute URL or start with a slash");
      else if (qF6.test(B)) throw new q3("invalid request path");
      if (typeof Q !== "string") throw new q3("method must be a string");
      else if ($F6[Q] === void 0 && !kh0(Q)) throw new q3("invalid request method");
      if (W && typeof W !== "string") throw new q3("upgrade must be a string");
      if (J != null && (!Number.isFinite(J) || J < 0)) throw new q3("invalid headersTimeout");
      if (F != null && (!Number.isFinite(F) || F < 0)) throw new q3("invalid bodyTimeout");
      if (X != null && typeof X !== "boolean") throw new q3("invalid reset");
      if (C != null && typeof C !== "boolean") throw new q3("invalid expectContinue");
      if (this.headersTimeout = J, this.bodyTimeout = F, this.throwOnError = V === !0, this.method = Q, this.abort = null, I == null) this.body = null;
      else if (VF6(I)) {
        this.body = I;
        let N = this.body._readableState;
        if (!N || !N.autoDestroy) this.endHandler = function q() {
          CF6(this)
        }, this.body.on("end", this.endHandler);
        this.errorHandler = (q) => {
          if (this.abort) this.abort(q);
          else this.error = q
        }, this.body.on("error", this.errorHandler)
      } else if (KF6(I)) this.body = I.byteLength ? I : null;
      else if (ArrayBuffer.isView(I)) this.body = I.buffer.byteLength ? Buffer.from(I.buffer, I.byteOffset, I.byteLength) : null;
      else if (I instanceof ArrayBuffer) this.body = I.byteLength ? Buffer.from(I) : null;
      else if (typeof I === "string") this.body = I.length ? Buffer.from(I) : null;
      else if (HF6(I) || zF6(I) || wF6(I)) this.body = I;
      else throw new q3("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
      if (this.completed = !1, this.aborted = !1, this.upgrade = W || null, this.path = Z ? EF6(B, Z) : B, this.origin = A, this.idempotent = D == null ? Q === "HEAD" || Q === "GET" : D, this.blocking = Y == null ? !1 : Y, this.reset = X == null ? null : X, this.host = null, this.contentLength = null, this.contentType = null, this.headers = [], this.expectContinue = C != null ? C : !1, Array.isArray(G)) {
        if (G.length % 2 !== 0) throw new q3("headers array must be even");
        for (let N = 0; N < G.length; N += 2) OY1(this, G[N], G[N + 1])
      } else if (G && typeof G === "object")
        if (G[Symbol.iterator])
          for (let N of G) {
            if (!Array.isArray(N) || N.length !== 2) throw new q3("headers must be in key-value pair format");
            OY1(this, N[0], N[1])
          } else {
            let N = Object.keys(G);
            for (let q = 0; q < N.length; ++q) OY1(this, N[q], G[N[q]])
          } else if (G != null) throw new q3("headers must be an object or an array");
      if (UF6(E, Q, W), this.servername = K || NF6(this.host), this[fX] = E, Uw.create.hasSubscribers) Uw.create.publish({
        request: this
      })
    }
    onBodySent(A) {
      if (this[fX].onBodySent) try {
        return this[fX].onBodySent(A)
      } catch (B) {
        this.abort(B)
      }
    }
    onRequestSent() {
      if (Uw.bodySent.hasSubscribers) Uw.bodySent.publish({
        request: this
      });
      if (this[fX].onRequestSent) try {
        return this[fX].onRequestSent()
      } catch (A) {
        this.abort(A)
      }
    }
    onConnect(A) {
      if (bN(!this.aborted), bN(!this.completed), this.error) A(this.error);
      else return this.abort = A, this[fX].onConnect(A)
    }
    onResponseStarted() {
      return this[fX].onResponseStarted?.()
    }
    onHeaders(A, B, Q, I) {
      if (bN(!this.aborted), bN(!this.completed), Uw.headers.hasSubscribers) Uw.headers.publish({
        request: this,
        response: {
          statusCode: A,
          headers: B,
          statusText: I
        }
      });
      try {
        return this[fX].onHeaders(A, B, Q, I)
      } catch (G) {
        this.abort(G)
      }
    }
    onData(A) {
      bN(!this.aborted), bN(!this.completed);
      try {
        return this[fX].onData(A)
      } catch (B) {
        return this.abort(B), !1
      }
    }
    onUpgrade(A, B, Q) {
      return bN(!this.aborted), bN(!this.completed), this[fX].onUpgrade(A, B, Q)
    }
    onComplete(A) {
      if (this.onFinally(), bN(!this.aborted), this.completed = !0, Uw.trailers.hasSubscribers) Uw.trailers.publish({
        request: this,
        trailers: A
      });
      try {
        return this[fX].onComplete(A)
      } catch (B) {
        this.onError(B)
      }
    }
    onError(A) {
      if (this.onFinally(), Uw.error.hasSubscribers) Uw.error.publish({
        request: this,
        error: A
      });
      if (this.aborted) return;
      return this.aborted = !0, this[fX].onError(A)
    }
    onFinally() {
      if (this.errorHandler) this.body.off("error", this.errorHandler), this.errorHandler = null;
      if (this.endHandler) this.body.off("end", this.endHandler), this.endHandler = null
    }
    addHeader(A, B) {
      return OY1(this, A, B), this
    }
  }

  function OY1(A, B, Q) {
    if (Q && (typeof Q === "object" && !Array.isArray(Q))) throw new q3(`invalid ${B} header`);
    else if (Q === void 0) return;
    let I = yh0[B];
    if (I === void 0) {
      if (I = B.toLowerCase(), yh0[I] === void 0 && !kh0(I)) throw new q3("invalid header key")
    }
    if (Array.isArray(Q)) {
      let G = [];
      for (let Z = 0; Z < Q.length; Z++)
        if (typeof Q[Z] === "string") {
          if (!jh0(Q[Z])) throw new q3(`invalid ${B} header`);
          G.push(Q[Z])
        } else if (Q[Z] === null) G.push("");
      else if (typeof Q[Z] === "object") throw new q3(`invalid ${B} header`);
      else G.push(`${Q[Z]}`);
      Q = G
    } else if (typeof Q === "string") {
      if (!jh0(Q)) throw new q3(`invalid ${B} header`)
    } else if (Q === null) Q = "";
    else Q = `${Q}`;
    if (A.host === null && I === "host") {
      if (typeof Q !== "string") throw new q3("invalid host header");
      A.host = Q
    } else if (A.contentLength === null && I === "content-length") {
      if (A.contentLength = parseInt(Q, 10), !Number.isFinite(A.contentLength)) throw new q3("invalid content-length header")
    } else if (A.contentType === null && I === "content-type") A.contentType = Q, A.headers.push(B, Q);
    else if (I === "transfer-encoding" || I === "keep-alive" || I === "upgrade") throw new q3(`invalid ${I} header`);
    else if (I === "connection") {
      let G = typeof Q === "string" ? Q.toLowerCase() : null;
      if (G !== "close" && G !== "keep-alive") throw new q3("invalid connection header");
      if (G === "close") A.reset = !0
    } else if (I === "expect") throw new XF6("expect header not supported");
    else A.headers.push(B, Q)
  }
  fh0.exports = xh0
})
// @from(Start 5238539, End 5239582)
yr = z((qR8, gh0) => {
  var MF6 = Z1("node:events");
  class Hu1 extends MF6 {
    dispatch() {
      throw new Error("not implemented")
    }
    close() {
      throw new Error("not implemented")
    }
    destroy() {
      throw new Error("not implemented")
    }
    compose(...A) {
      let B = Array.isArray(A[0]) ? A[0] : A,
        Q = this.dispatch.bind(this);
      for (let I of B) {
        if (I == null) continue;
        if (typeof I !== "function") throw new TypeError(`invalid interceptor, expected function received ${typeof I}`);
        if (Q = I(Q), Q == null || typeof Q !== "function" || Q.length !== 2) throw new TypeError("invalid interceptor")
      }
      return new bh0(this, Q)
    }
  }
  class bh0 extends Hu1 {
    #A = null;
    #B = null;
    constructor(A, B) {
      super();
      this.#A = A, this.#B = B
    }
    dispatch(...A) {
      this.#B(...A)
    }
    close(...A) {
      return this.#A.close(...A)
    }
    destroy(...A) {
      return this.#A.destroy(...A)
    }
  }
  gh0.exports = Hu1
})
// @from(Start 5239588, End 5242706)
Sh = z((MR8, mh0) => {
  var LF6 = yr(),
    {
      ClientDestroyedError: zu1,
      ClientClosedError: RF6,
      InvalidArgumentError: Oh
    } = u5(),
    {
      kDestroy: OF6,
      kClose: TF6,
      kClosed: kr,
      kDestroyed: Th,
      kDispatch: wu1,
      kInterceptors: Wj
    } = A3(),
    gN = Symbol("onDestroyed"),
    Ph = Symbol("onClosed"),
    TY1 = Symbol("Intercepted Dispatch");
  class hh0 extends LF6 {
    constructor() {
      super();
      this[Th] = !1, this[gN] = null, this[kr] = !1, this[Ph] = []
    }
    get destroyed() {
      return this[Th]
    }
    get closed() {
      return this[kr]
    }
    get interceptors() {
      return this[Wj]
    }
    set interceptors(A) {
      if (A) {
        for (let B = A.length - 1; B >= 0; B--)
          if (typeof this[Wj][B] !== "function") throw new Oh("interceptor must be an function")
      }
      this[Wj] = A
    }
    close(A) {
      if (A === void 0) return new Promise((Q, I) => {
        this.close((G, Z) => {
          return G ? I(G) : Q(Z)
        })
      });
      if (typeof A !== "function") throw new Oh("invalid callback");
      if (this[Th]) {
        queueMicrotask(() => A(new zu1, null));
        return
      }
      if (this[kr]) {
        if (this[Ph]) this[Ph].push(A);
        else queueMicrotask(() => A(null, null));
        return
      }
      this[kr] = !0, this[Ph].push(A);
      let B = () => {
        let Q = this[Ph];
        this[Ph] = null;
        for (let I = 0; I < Q.length; I++) Q[I](null, null)
      };
      this[TF6]().then(() => this.destroy()).then(() => {
        queueMicrotask(B)
      })
    }
    destroy(A, B) {
      if (typeof A === "function") B = A, A = null;
      if (B === void 0) return new Promise((I, G) => {
        this.destroy(A, (Z, D) => {
          return Z ? G(Z) : I(D)
        })
      });
      if (typeof B !== "function") throw new Oh("invalid callback");
      if (this[Th]) {
        if (this[gN]) this[gN].push(B);
        else queueMicrotask(() => B(null, null));
        return
      }
      if (!A) A = new zu1;
      this[Th] = !0, this[gN] = this[gN] || [], this[gN].push(B);
      let Q = () => {
        let I = this[gN];
        this[gN] = null;
        for (let G = 0; G < I.length; G++) I[G](null, null)
      };
      this[OF6](A).then(() => {
        queueMicrotask(Q)
      })
    } [TY1](A, B) {
      if (!this[Wj] || this[Wj].length === 0) return this[TY1] = this[wu1], this[wu1](A, B);
      let Q = this[wu1].bind(this);
      for (let I = this[Wj].length - 1; I >= 0; I--) Q = this[Wj][I](Q);
      return this[TY1] = Q, Q(A, B)
    }
    dispatch(A, B) {
      if (!B || typeof B !== "object") throw new Oh("handler must be an object");
      try {
        if (!A || typeof A !== "object") throw new Oh("opts must be an object.");
        if (this[Th] || this[gN]) throw new zu1;
        if (this[kr]) throw new RF6;
        return this[TY1](A, B)
      } catch (Q) {
        if (typeof B.onError !== "function") throw new Oh("invalid onError method");
        return B.onError(Q), !1
      }
    }
  }
  mh0.exports = hh0
})
// @from(Start 5242712, End 5244456)
Ru1 = z((LR8, ch0) => {
  var _h = 0,
    Eu1 = 1000,
    Uu1 = (Eu1 >> 1) - 1,
    hN, Nu1 = Symbol("kFastTimer"),
    mN = [],
    $u1 = -2,
    qu1 = -1,
    uh0 = 0,
    dh0 = 1;

  function Mu1() {
    _h += Uu1;
    let A = 0,
      B = mN.length;
    while (A < B) {
      let Q = mN[A];
      if (Q._state === uh0) Q._idleStart = _h - Uu1, Q._state = dh0;
      else if (Q._state === dh0 && _h >= Q._idleStart + Q._idleTimeout) Q._state = qu1, Q._idleStart = -1, Q._onTimeout(Q._timerArg);
      if (Q._state === qu1) {
        if (Q._state = $u1, --B !== 0) mN[A] = mN[B]
      } else ++A
    }
    if (mN.length = B, mN.length !== 0) ph0()
  }

  function ph0() {
    if (hN) hN.refresh();
    else if (clearTimeout(hN), hN = setTimeout(Mu1, Uu1), hN.unref) hN.unref()
  }
  class Lu1 {
    [Nu1] = !0;
    _state = $u1;
    _idleTimeout = -1;
    _idleStart = -1;
    _onTimeout;
    _timerArg;
    constructor(A, B, Q) {
      this._onTimeout = A, this._idleTimeout = B, this._timerArg = Q, this.refresh()
    }
    refresh() {
      if (this._state === $u1) mN.push(this);
      if (!hN || mN.length === 1) ph0();
      this._state = uh0
    }
    clear() {
      this._state = qu1, this._idleStart = -1
    }
  }
  ch0.exports = {
    setTimeout(A, B, Q) {
      return B <= Eu1 ? setTimeout(A, B, Q) : new Lu1(A, B, Q)
    },
    clearTimeout(A) {
      if (A[Nu1]) A.clear();
      else clearTimeout(A)
    },
    setFastTimeout(A, B, Q) {
      return new Lu1(A, B, Q)
    },
    clearFastTimeout(A) {
      A.clear()
    },
    now() {
      return _h
    },
    tick(A = 0) {
      _h += A - Eu1 + 1, Mu1(), Mu1()
    },
    reset() {
      _h = 0, mN.length = 0, clearTimeout(hN), hN = null
    },
    kFastTimer: Nu1
  }
})
// @from(Start 5244462, End 5249018)
xr = z((RR8, sh0) => {
  var PF6 = Z1("node:net"),
    lh0 = Z1("node:assert"),
    ah0 = C6(),
    {
      InvalidArgumentError: SF6,
      ConnectTimeoutError: _F6
    } = u5(),
    PY1 = Ru1();

  function ih0() {}
  var Ou1, Tu1;
  if (global.FinalizationRegistry && !(process.env.NODE_V8_COVERAGE || process.env.UNDICI_NO_FG)) Tu1 = class A {
    constructor(B) {
      this._maxCachedSessions = B, this._sessionCache = new Map, this._sessionRegistry = new global.FinalizationRegistry((Q) => {
        if (this._sessionCache.size < this._maxCachedSessions) return;
        let I = this._sessionCache.get(Q);
        if (I !== void 0 && I.deref() === void 0) this._sessionCache.delete(Q)
      })
    }
    get(B) {
      let Q = this._sessionCache.get(B);
      return Q ? Q.deref() : null
    }
    set(B, Q) {
      if (this._maxCachedSessions === 0) return;
      this._sessionCache.set(B, new WeakRef(Q)), this._sessionRegistry.register(Q, B)
    }
  };
  else Tu1 = class A {
    constructor(B) {
      this._maxCachedSessions = B, this._sessionCache = new Map
    }
    get(B) {
      return this._sessionCache.get(B)
    }
    set(B, Q) {
      if (this._maxCachedSessions === 0) return;
      if (this._sessionCache.size >= this._maxCachedSessions) {
        let {
          value: I
        } = this._sessionCache.keys().next();
        this._sessionCache.delete(I)
      }
      this._sessionCache.set(B, Q)
    }
  };

  function jF6({
    allowH2: A,
    maxCachedSessions: B,
    socketPath: Q,
    timeout: I,
    session: G,
    ...Z
  }) {
    if (B != null && (!Number.isInteger(B) || B < 0)) throw new SF6("maxCachedSessions must be a positive integer or zero");
    let D = {
        path: Q,
        ...Z
      },
      Y = new Tu1(B == null ? 100 : B);
    return I = I == null ? 1e4 : I, A = A != null ? A : !1,
      function W({
        hostname: J,
        host: F,
        protocol: X,
        port: V,
        servername: C,
        localAddress: K,
        httpSocket: E
      }, N) {
        let q;
        if (X === "https:") {
          if (!Ou1) Ou1 = Z1("node:tls");
          C = C || D.servername || ah0.getServerName(F) || null;
          let R = C || J;
          lh0(R);
          let T = G || Y.get(R) || null;
          V = V || 443, q = Ou1.connect({
            highWaterMark: 16384,
            ...D,
            servername: C,
            session: T,
            localAddress: K,
            ALPNProtocols: A ? ["http/1.1", "h2"] : ["http/1.1"],
            socket: E,
            port: V,
            host: J
          }), q.on("session", function(L) {
            Y.set(R, L)
          })
        } else lh0(!E, "httpSocket can only be sent on TLS update"), V = V || 80, q = PF6.connect({
          highWaterMark: 65536,
          ...D,
          localAddress: K,
          port: V,
          host: J
        });
        if (D.keepAlive == null || D.keepAlive) {
          let R = D.keepAliveInitialDelay === void 0 ? 60000 : D.keepAliveInitialDelay;
          q.setKeepAlive(!0, R)
        }
        let O = yF6(new WeakRef(q), {
          timeout: I,
          hostname: J,
          port: V
        });
        return q.setNoDelay(!0).once(X === "https:" ? "secureConnect" : "connect", function() {
          if (queueMicrotask(O), N) {
            let R = N;
            N = null, R(null, this)
          }
        }).on("error", function(R) {
          if (queueMicrotask(O), N) {
            let T = N;
            N = null, T(R)
          }
        }), q
      }
  }
  var yF6 = process.platform === "win32" ? (A, B) => {
    if (!B.timeout) return ih0;
    let Q = null,
      I = null,
      G = PY1.setFastTimeout(() => {
        Q = setImmediate(() => {
          I = setImmediate(() => nh0(A.deref(), B))
        })
      }, B.timeout);
    return () => {
      PY1.clearFastTimeout(G), clearImmediate(Q), clearImmediate(I)
    }
  } : (A, B) => {
    if (!B.timeout) return ih0;
    let Q = null,
      I = PY1.setFastTimeout(() => {
        Q = setImmediate(() => {
          nh0(A.deref(), B)
        })
      }, B.timeout);
    return () => {
      PY1.clearFastTimeout(I), clearImmediate(Q)
    }
  };

  function nh0(A, B) {
    if (A == null) return;
    let Q = "Connect Timeout Error";
    if (Array.isArray(A.autoSelectFamilyAttemptedAddresses)) Q += ` (attempted addresses: ${A.autoSelectFamilyAttemptedAddresses.join(", ")},`;
    else Q += ` (attempted address: ${B.hostname}:${B.port},`;
    Q += ` timeout: ${B.timeout}ms)`, ah0.destroy(A, new _F6(Q))
  }
  sh0.exports = jF6
})
// @from(Start 5249024, End 5249314)
th0 = z((rh0) => {
  Object.defineProperty(rh0, "__esModule", {
    value: !0
  });
  rh0.enumToMap = void 0;

  function kF6(A) {
    let B = {};
    return Object.keys(A).forEach((Q) => {
      let I = A[Q];
      if (typeof I === "number") B[Q] = I
    }), B
  }
  rh0.enumToMap = kF6
})