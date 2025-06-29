
// @from(Start 4610179, End 4610690)
cO0 = z((uO0) => {
  Object.defineProperty(uO0, "__esModule", {
    value: !0
  });
  uO0.hexToBinary = void 0;

  function dO0(A) {
    if (A >= 48 && A <= 57) return A - 48;
    if (A >= 97 && A <= 102) return A - 87;
    return A - 55
  }

  function f26(A) {
    let B = new Uint8Array(A.length / 2),
      Q = 0;
    for (let I = 0; I < A.length; I += 2) {
      let G = dO0(A.charCodeAt(I)),
        Z = dO0(A.charCodeAt(I + 1));
      B[Q++] = G << 4 | Z
    }
    return B
  }
  uO0.hexToBinary = f26
})
// @from(Start 4610696, End 4612031)
vZ1 = z((sO0) => {
  Object.defineProperty(sO0, "__esModule", {
    value: !0
  });
  sO0.getOtlpEncoder = sO0.encodeAsString = sO0.encodeAsLongBits = sO0.toLongBits = sO0.hrTimeToNanos = void 0;
  var v26 = p8(),
    dg1 = cO0();

  function ug1(A) {
    let B = BigInt(1e9);
    return BigInt(A[0]) * B + BigInt(A[1])
  }
  sO0.hrTimeToNanos = ug1;

  function iO0(A) {
    let B = Number(BigInt.asUintN(32, A)),
      Q = Number(BigInt.asUintN(32, A >> BigInt(32)));
    return {
      low: B,
      high: Q
    }
  }
  sO0.toLongBits = iO0;

  function pg1(A) {
    let B = ug1(A);
    return iO0(B)
  }
  sO0.encodeAsLongBits = pg1;

  function nO0(A) {
    return ug1(A).toString()
  }
  sO0.encodeAsString = nO0;
  var b26 = typeof BigInt !== "undefined" ? nO0 : v26.hrTimeToNanoseconds;

  function lO0(A) {
    return A
  }

  function aO0(A) {
    if (A === void 0) return;
    return dg1.hexToBinary(A)
  }
  var g26 = {
    encodeHrTime: pg1,
    encodeSpanContext: dg1.hexToBinary,
    encodeOptionalSpanContext: aO0
  };

  function h26(A) {
    if (A === void 0) return g26;
    let B = A.useLongBits ?? !0,
      Q = A.useHex ?? !1;
    return {
      encodeHrTime: B ? pg1 : b26,
      encodeSpanContext: Q ? lO0 : dg1.hexToBinary,
      encodeOptionalSpanContext: Q ? lO0 : aO0
    }
  }
  sO0.getOtlpEncoder = h26
})
// @from(Start 4612037, End 4613379)
bZ1 = z((tO0) => {
  Object.defineProperty(tO0, "__esModule", {
    value: !0
  });
  tO0.toAnyValue = tO0.toKeyValue = tO0.toAttributes = tO0.createInstrumentationScope = tO0.createResource = void 0;

  function c26(A) {
    return {
      attributes: oO0(A.attributes),
      droppedAttributesCount: 0
    }
  }
  tO0.createResource = c26;

  function l26(A) {
    return {
      name: A.name,
      version: A.version
    }
  }
  tO0.createInstrumentationScope = l26;

  function oO0(A) {
    return Object.keys(A).map((B) => cg1(B, A[B]))
  }
  tO0.toAttributes = oO0;

  function cg1(A, B) {
    return {
      key: A,
      value: lg1(B)
    }
  }
  tO0.toKeyValue = cg1;

  function lg1(A) {
    let B = typeof A;
    if (B === "string") return {
      stringValue: A
    };
    if (B === "number") {
      if (!Number.isInteger(A)) return {
        doubleValue: A
      };
      return {
        intValue: A
      }
    }
    if (B === "boolean") return {
      boolValue: A
    };
    if (A instanceof Uint8Array) return {
      bytesValue: A
    };
    if (Array.isArray(A)) return {
      arrayValue: {
        values: A.map(lg1)
      }
    };
    if (B === "object" && A != null) return {
      kvlistValue: {
        values: Object.entries(A).map(([Q, I]) => cg1(Q, I))
      }
    };
    return {}
  }
  tO0.toAnyValue = lg1
})
// @from(Start 4613385, End 4615252)
ig1 = z((BT0) => {
  Object.defineProperty(BT0, "__esModule", {
    value: !0
  });
  BT0.toLogAttributes = BT0.createExportLogsServiceRequest = void 0;
  var r26 = vZ1(),
    gZ1 = bZ1();

  function o26(A, B) {
    let Q = r26.getOtlpEncoder(B);
    return {
      resourceLogs: e26(A, Q)
    }
  }
  BT0.createExportLogsServiceRequest = o26;

  function t26(A) {
    let B = new Map;
    for (let Q of A) {
      let {
        resource: I,
        instrumentationScope: {
          name: G,
          version: Z = "",
          schemaUrl: D = ""
        }
      } = Q, Y = B.get(I);
      if (!Y) Y = new Map, B.set(I, Y);
      let W = `${G}@${Z}:${D}`,
        J = Y.get(W);
      if (!J) J = [], Y.set(W, J);
      J.push(Q)
    }
    return B
  }

  function e26(A, B) {
    let Q = t26(A);
    return Array.from(Q, ([I, G]) => ({
      resource: gZ1.createResource(I),
      scopeLogs: Array.from(G, ([, Z]) => {
        return {
          scope: gZ1.createInstrumentationScope(Z[0].instrumentationScope),
          logRecords: Z.map((D) => A96(D, B)),
          schemaUrl: Z[0].instrumentationScope.schemaUrl
        }
      }),
      schemaUrl: void 0
    }))
  }

  function A96(A, B) {
    return {
      timeUnixNano: B.encodeHrTime(A.hrTime),
      observedTimeUnixNano: B.encodeHrTime(A.hrTimeObserved),
      severityNumber: B96(A.severityNumber),
      severityText: A.severityText,
      body: gZ1.toAnyValue(A.body),
      attributes: AT0(A.attributes),
      droppedAttributesCount: A.droppedAttributesCount,
      flags: A.spanContext?.traceFlags,
      traceId: B.encodeOptionalSpanContext(A.spanContext?.traceId),
      spanId: B.encodeOptionalSpanContext(A.spanContext?.spanId)
    }
  }

  function B96(A) {
    return A
  }

  function AT0(A) {
    return Object.keys(A).map((B) => gZ1.toKeyValue(B, A[B]))
  }
  BT0.toLogAttributes = AT0
})
// @from(Start 4615258, End 4615807)
DT0 = z((GT0) => {
  Object.defineProperty(GT0, "__esModule", {
    value: !0
  });
  GT0.ProtobufLogsSerializer = void 0;
  var IT0 = fZ1(),
    I96 = ig1(),
    G96 = IT0.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse,
    Z96 = IT0.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
  GT0.ProtobufLogsSerializer = {
    serializeRequest: (A) => {
      let B = I96.createExportLogsServiceRequest(A);
      return Z96.encode(B).finish()
    },
    deserializeResponse: (A) => {
      return G96.decode(A)
    }
  }
})
// @from(Start 4615813, End 4616107)
YT0 = z((ng1) => {
  Object.defineProperty(ng1, "__esModule", {
    value: !0
  });
  ng1.ProtobufLogsSerializer = void 0;
  var D96 = DT0();
  Object.defineProperty(ng1, "ProtobufLogsSerializer", {
    enumerable: !0,
    get: function() {
      return D96.ProtobufLogsSerializer
    }
  })
})
// @from(Start 4616113, End 4619662)
ag1 = z((CT0) => {
  Object.defineProperty(CT0, "__esModule", {
    value: !0
  });
  CT0.createExportMetricsServiceRequest = CT0.toMetric = CT0.toScopeMetrics = CT0.toResourceMetrics = void 0;
  var WT0 = s9(),
    dg = QR(),
    W96 = vZ1(),
    bs = bZ1();

  function FT0(A, B) {
    let Q = W96.getOtlpEncoder(B);
    return {
      resource: bs.createResource(A.resource),
      schemaUrl: void 0,
      scopeMetrics: XT0(A.scopeMetrics, Q)
    }
  }
  CT0.toResourceMetrics = FT0;

  function XT0(A, B) {
    return Array.from(A.map((Q) => ({
      scope: bs.createInstrumentationScope(Q.scope),
      metrics: Q.metrics.map((I) => VT0(I, B)),
      schemaUrl: Q.scope.schemaUrl
    })))
  }
  CT0.toScopeMetrics = XT0;

  function VT0(A, B) {
    let Q = {
        name: A.descriptor.name,
        description: A.descriptor.description,
        unit: A.descriptor.unit
      },
      I = V96(A.aggregationTemporality);
    switch (A.dataPointType) {
      case dg.DataPointType.SUM:
        Q.sum = {
          aggregationTemporality: I,
          isMonotonic: A.isMonotonic,
          dataPoints: JT0(A, B)
        };
        break;
      case dg.DataPointType.GAUGE:
        Q.gauge = {
          dataPoints: JT0(A, B)
        };
        break;
      case dg.DataPointType.HISTOGRAM:
        Q.histogram = {
          aggregationTemporality: I,
          dataPoints: F96(A, B)
        };
        break;
      case dg.DataPointType.EXPONENTIAL_HISTOGRAM:
        Q.exponentialHistogram = {
          aggregationTemporality: I,
          dataPoints: X96(A, B)
        };
        break
    }
    return Q
  }
  CT0.toMetric = VT0;

  function J96(A, B, Q) {
    let I = {
      attributes: bs.toAttributes(A.attributes),
      startTimeUnixNano: Q.encodeHrTime(A.startTime),
      timeUnixNano: Q.encodeHrTime(A.endTime)
    };
    switch (B) {
      case WT0.ValueType.INT:
        I.asInt = A.value;
        break;
      case WT0.ValueType.DOUBLE:
        I.asDouble = A.value;
        break
    }
    return I
  }

  function JT0(A, B) {
    return A.dataPoints.map((Q) => {
      return J96(Q, A.descriptor.valueType, B)
    })
  }

  function F96(A, B) {
    return A.dataPoints.map((Q) => {
      let I = Q.value;
      return {
        attributes: bs.toAttributes(Q.attributes),
        bucketCounts: I.buckets.counts,
        explicitBounds: I.buckets.boundaries,
        count: I.count,
        sum: I.sum,
        min: I.min,
        max: I.max,
        startTimeUnixNano: B.encodeHrTime(Q.startTime),
        timeUnixNano: B.encodeHrTime(Q.endTime)
      }
    })
  }

  function X96(A, B) {
    return A.dataPoints.map((Q) => {
      let I = Q.value;
      return {
        attributes: bs.toAttributes(Q.attributes),
        count: I.count,
        min: I.min,
        max: I.max,
        sum: I.sum,
        positive: {
          offset: I.positive.offset,
          bucketCounts: I.positive.bucketCounts
        },
        negative: {
          offset: I.negative.offset,
          bucketCounts: I.negative.bucketCounts
        },
        scale: I.scale,
        zeroCount: I.zeroCount,
        startTimeUnixNano: B.encodeHrTime(Q.startTime),
        timeUnixNano: B.encodeHrTime(Q.endTime)
      }
    })
  }

  function V96(A) {
    switch (A) {
      case dg.AggregationTemporality.DELTA:
        return 1;
      case dg.AggregationTemporality.CUMULATIVE:
        return 2
    }
  }

  function C96(A, B) {
    return {
      resourceMetrics: A.map((Q) => FT0(Q, B))
    }
  }
  CT0.createExportMetricsServiceRequest = C96
})
// @from(Start 4619668, End 4620240)
ET0 = z((zT0) => {
  Object.defineProperty(zT0, "__esModule", {
    value: !0
  });
  zT0.ProtobufMetricsSerializer = void 0;
  var HT0 = fZ1(),
    w96 = ag1(),
    E96 = HT0.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse,
    U96 = HT0.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
  zT0.ProtobufMetricsSerializer = {
    serializeRequest: (A) => {
      let B = w96.createExportMetricsServiceRequest([A]);
      return U96.encode(B).finish()
    },
    deserializeResponse: (A) => {
      return E96.decode(A)
    }
  }
})
// @from(Start 4620246, End 4620549)
UT0 = z((sg1) => {
  Object.defineProperty(sg1, "__esModule", {
    value: !0
  });
  sg1.ProtobufMetricsSerializer = void 0;
  var N96 = ET0();
  Object.defineProperty(sg1, "ProtobufMetricsSerializer", {
    enumerable: !0,
    get: function() {
      return N96.ProtobufMetricsSerializer
    }
  })
})
// @from(Start 4620555, End 4623566)
rg1 = z((MT0) => {
  Object.defineProperty(MT0, "__esModule", {
    value: !0
  });
  MT0.createExportTraceServiceRequest = MT0.toOtlpSpanEvent = MT0.toOtlpLink = MT0.sdkSpanToOtlpSpan = void 0;
  var gs = bZ1(),
    q96 = vZ1();

  function NT0(A, B) {
    let Q = A.spanContext(),
      I = A.status,
      G = A.parentSpanContext?.spanId ? B.encodeSpanContext(A.parentSpanContext?.spanId) : void 0;
    return {
      traceId: B.encodeSpanContext(Q.traceId),
      spanId: B.encodeSpanContext(Q.spanId),
      parentSpanId: G,
      traceState: Q.traceState?.serialize(),
      name: A.name,
      kind: A.kind == null ? 0 : A.kind + 1,
      startTimeUnixNano: B.encodeHrTime(A.startTime),
      endTimeUnixNano: B.encodeHrTime(A.endTime),
      attributes: gs.toAttributes(A.attributes),
      droppedAttributesCount: A.droppedAttributesCount,
      events: A.events.map((Z) => qT0(Z, B)),
      droppedEventsCount: A.droppedEventsCount,
      status: {
        code: I.code,
        message: I.message
      },
      links: A.links.map((Z) => $T0(Z, B)),
      droppedLinksCount: A.droppedLinksCount
    }
  }
  MT0.sdkSpanToOtlpSpan = NT0;

  function $T0(A, B) {
    return {
      attributes: A.attributes ? gs.toAttributes(A.attributes) : [],
      spanId: B.encodeSpanContext(A.context.spanId),
      traceId: B.encodeSpanContext(A.context.traceId),
      traceState: A.context.traceState?.serialize(),
      droppedAttributesCount: A.droppedAttributesCount || 0
    }
  }
  MT0.toOtlpLink = $T0;

  function qT0(A, B) {
    return {
      attributes: A.attributes ? gs.toAttributes(A.attributes) : [],
      name: A.name,
      timeUnixNano: B.encodeHrTime(A.time),
      droppedAttributesCount: A.droppedAttributesCount || 0
    }
  }
  MT0.toOtlpSpanEvent = qT0;

  function M96(A, B) {
    let Q = q96.getOtlpEncoder(B);
    return {
      resourceSpans: R96(A, Q)
    }
  }
  MT0.createExportTraceServiceRequest = M96;

  function L96(A) {
    let B = new Map;
    for (let Q of A) {
      let I = B.get(Q.resource);
      if (!I) I = new Map, B.set(Q.resource, I);
      let G = `${Q.instrumentationScope.name}@${Q.instrumentationScope.version||""}:${Q.instrumentationScope.schemaUrl||""}`,
        Z = I.get(G);
      if (!Z) Z = [], I.set(G, Z);
      Z.push(Q)
    }
    return B
  }

  function R96(A, B) {
    let Q = L96(A),
      I = [],
      G = Q.entries(),
      Z = G.next();
    while (!Z.done) {
      let [D, Y] = Z.value, W = [], J = Y.values(), F = J.next();
      while (!F.done) {
        let V = F.value;
        if (V.length > 0) {
          let C = V.map((K) => NT0(K, B));
          W.push({
            scope: gs.createInstrumentationScope(V[0].instrumentationScope),
            spans: C,
            schemaUrl: V[0].instrumentationScope.schemaUrl
          })
        }
        F = J.next()
      }
      let X = {
        resource: gs.createResource(D),
        scopeSpans: W,
        schemaUrl: void 0
      };
      I.push(X), Z = G.next()
    }
    return I
  }
})
// @from(Start 4623572, End 4624128)
PT0 = z((OT0) => {
  Object.defineProperty(OT0, "__esModule", {
    value: !0
  });
  OT0.ProtobufTraceSerializer = void 0;
  var RT0 = fZ1(),
    S96 = rg1(),
    _96 = RT0.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse,
    j96 = RT0.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
  OT0.ProtobufTraceSerializer = {
    serializeRequest: (A) => {
      let B = S96.createExportTraceServiceRequest(A);
      return j96.encode(B).finish()
    },
    deserializeResponse: (A) => {
      return _96.decode(A)
    }
  }
})
// @from(Start 4624134, End 4624431)
ST0 = z((og1) => {
  Object.defineProperty(og1, "__esModule", {
    value: !0
  });
  og1.ProtobufTraceSerializer = void 0;
  var y96 = PT0();
  Object.defineProperty(og1, "ProtobufTraceSerializer", {
    enumerable: !0,
    get: function() {
      return y96.ProtobufTraceSerializer
    }
  })
})
// @from(Start 4624437, End 4624921)
yT0 = z((_T0) => {
  Object.defineProperty(_T0, "__esModule", {
    value: !0
  });
  _T0.JsonLogsSerializer = void 0;
  var x96 = ig1();
  _T0.JsonLogsSerializer = {
    serializeRequest: (A) => {
      let B = x96.createExportLogsServiceRequest(A, {
        useHex: !0,
        useLongBits: !1
      });
      return new TextEncoder().encode(JSON.stringify(B))
    },
    deserializeResponse: (A) => {
      let B = new TextDecoder;
      return JSON.parse(B.decode(A))
    }
  }
})
// @from(Start 4624927, End 4625209)
kT0 = z((tg1) => {
  Object.defineProperty(tg1, "__esModule", {
    value: !0
  });
  tg1.JsonLogsSerializer = void 0;
  var f96 = yT0();
  Object.defineProperty(tg1, "JsonLogsSerializer", {
    enumerable: !0,
    get: function() {
      return f96.JsonLogsSerializer
    }
  })
})
// @from(Start 4625215, End 4625690)
vT0 = z((xT0) => {
  Object.defineProperty(xT0, "__esModule", {
    value: !0
  });
  xT0.JsonMetricsSerializer = void 0;
  var b96 = ag1();
  xT0.JsonMetricsSerializer = {
    serializeRequest: (A) => {
      let B = b96.createExportMetricsServiceRequest([A], {
        useLongBits: !1
      });
      return new TextEncoder().encode(JSON.stringify(B))
    },
    deserializeResponse: (A) => {
      let B = new TextDecoder;
      return JSON.parse(B.decode(A))
    }
  }
})
// @from(Start 4625696, End 4625987)
bT0 = z((eg1) => {
  Object.defineProperty(eg1, "__esModule", {
    value: !0
  });
  eg1.JsonMetricsSerializer = void 0;
  var g96 = vT0();
  Object.defineProperty(eg1, "JsonMetricsSerializer", {
    enumerable: !0,
    get: function() {
      return g96.JsonMetricsSerializer
    }
  })
})
// @from(Start 4625993, End 4626480)
mT0 = z((gT0) => {
  Object.defineProperty(gT0, "__esModule", {
    value: !0
  });
  gT0.JsonTraceSerializer = void 0;
  var m96 = rg1();
  gT0.JsonTraceSerializer = {
    serializeRequest: (A) => {
      let B = m96.createExportTraceServiceRequest(A, {
        useHex: !0,
        useLongBits: !1
      });
      return new TextEncoder().encode(JSON.stringify(B))
    },
    deserializeResponse: (A) => {
      let B = new TextDecoder;
      return JSON.parse(B.decode(A))
    }
  }
})
// @from(Start 4626486, End 4626771)
dT0 = z((Ah1) => {
  Object.defineProperty(Ah1, "__esModule", {
    value: !0
  });
  Ah1.JsonTraceSerializer = void 0;
  var d96 = mT0();
  Object.defineProperty(Ah1, "JsonTraceSerializer", {
    enumerable: !0,
    get: function() {
      return d96.JsonTraceSerializer
    }
  })
})
// @from(Start 4626777, End 4628039)
i_ = z((DR) => {
  Object.defineProperty(DR, "__esModule", {
    value: !0
  });
  DR.JsonTraceSerializer = DR.JsonMetricsSerializer = DR.JsonLogsSerializer = DR.ProtobufTraceSerializer = DR.ProtobufMetricsSerializer = DR.ProtobufLogsSerializer = void 0;
  var p96 = YT0();
  Object.defineProperty(DR, "ProtobufLogsSerializer", {
    enumerable: !0,
    get: function() {
      return p96.ProtobufLogsSerializer
    }
  });
  var c96 = UT0();
  Object.defineProperty(DR, "ProtobufMetricsSerializer", {
    enumerable: !0,
    get: function() {
      return c96.ProtobufMetricsSerializer
    }
  });
  var l96 = ST0();
  Object.defineProperty(DR, "ProtobufTraceSerializer", {
    enumerable: !0,
    get: function() {
      return l96.ProtobufTraceSerializer
    }
  });
  var i96 = kT0();
  Object.defineProperty(DR, "JsonLogsSerializer", {
    enumerable: !0,
    get: function() {
      return i96.JsonLogsSerializer
    }
  });
  var n96 = bT0();
  Object.defineProperty(DR, "JsonMetricsSerializer", {
    enumerable: !0,
    get: function() {
      return n96.JsonMetricsSerializer
    }
  });
  var a96 = dT0();
  Object.defineProperty(DR, "JsonTraceSerializer", {
    enumerable: !0,
    get: function() {
      return a96.JsonTraceSerializer
    }
  })
})
// @from(Start 4628045, End 4628181)
cT0 = z((uT0) => {
  Object.defineProperty(uT0, "__esModule", {
    value: !0
  });
  uT0.VERSION = void 0;
  uT0.VERSION = "0.200.0"
})
// @from(Start 4628187, End 4628705)
nT0 = z((lT0) => {
  Object.defineProperty(lT0, "__esModule", {
    value: !0
  });
  lT0.parseRetryAfterToMills = lT0.isExportRetryable = void 0;

  function r96(A) {
    return [429, 502, 503, 504].includes(A)
  }
  lT0.isExportRetryable = r96;

  function o96(A) {
    if (A == null) return;
    let B = Number.parseInt(A, 10);
    if (Number.isInteger(B)) return B > 0 ? B * 1000 : -1;
    let Q = new Date(A).getTime() - Date.now();
    if (Q >= 0) return Q;
    return 0
  }
  lT0.parseRetryAfterToMills = o96
})
// @from(Start 4628711, End 4631031)
AP0 = z((tT0) => {
  Object.defineProperty(tT0, "__esModule", {
    value: !0
  });
  tT0.createHttpAgent = tT0.compressAndSend = tT0.sendWithHttp = void 0;
  var sT0 = Z1("http"),
    rT0 = Z1("https"),
    e96 = Z1("zlib"),
    A46 = Z1("stream"),
    aT0 = nT0(),
    B46 = TZ1();

  function Q46(A, B, Q, I, G) {
    let Z = new URL(A.url),
      D = Number(process.versions.node.split(".")[0]),
      Y = {
        hostname: Z.hostname,
        port: Z.port,
        path: Z.pathname,
        method: "POST",
        headers: {
          ...A.headers()
        },
        agent: B
      },
      J = (Z.protocol === "http:" ? sT0.request : rT0.request)(Y, (X) => {
        let V = [];
        X.on("data", (C) => V.push(C)), X.on("end", () => {
          if (X.statusCode && X.statusCode < 299) I({
            status: "success",
            data: Buffer.concat(V)
          });
          else if (X.statusCode && aT0.isExportRetryable(X.statusCode)) I({
            status: "retryable",
            retryInMillis: aT0.parseRetryAfterToMills(X.headers["retry-after"])
          });
          else {
            let C = new B46.OTLPExporterError(X.statusMessage, X.statusCode, Buffer.concat(V).toString());
            I({
              status: "failure",
              error: C
            })
          }
        })
      });
    J.setTimeout(G, () => {
      J.destroy(), I({
        status: "failure",
        error: new Error("Request Timeout")
      })
    }), J.on("error", (X) => {
      I({
        status: "failure",
        error: X
      })
    });
    let F = D >= 14 ? "close" : "abort";
    J.on(F, () => {
      I({
        status: "failure",
        error: new Error("Request timed out")
      })
    }), oT0(J, A.compression, Q, (X) => {
      I({
        status: "failure",
        error: X
      })
    })
  }
  tT0.sendWithHttp = Q46;

  function oT0(A, B, Q, I) {
    let G = I46(Q);
    if (B === "gzip") A.setHeader("Content-Encoding", "gzip"), G = G.on("error", I).pipe(e96.createGzip()).on("error", I);
    G.pipe(A).on("error", I)
  }
  tT0.compressAndSend = oT0;

  function I46(A) {
    let B = new A46.Readable;
    return B.push(A), B.push(null), B
  }

  function G46(A, B) {
    return new(new URL(A).protocol === "http:" ? sT0.Agent : rT0.Agent)(B)
  }
  tT0.createHttpAgent = G46
})
// @from(Start 4631037, End 4631916)
GP0 = z((QP0) => {
  Object.defineProperty(QP0, "__esModule", {
    value: !0
  });
  QP0.createHttpExporterTransport = void 0;
  class BP0 {
    _parameters;
    _utils = null;
    constructor(A) {
      this._parameters = A
    }
    async send(A, B) {
      let {
        agent: Q,
        send: I
      } = this._loadUtils();
      return new Promise((G) => {
        I(this._parameters, Q, A, (Z) => {
          G(Z)
        }, B)
      })
    }
    shutdown() {}
    _loadUtils() {
      let A = this._utils;
      if (A === null) {
        let {
          sendWithHttp: B,
          createHttpAgent: Q
        } = AP0();
        A = this._utils = {
          agent: Q(this._parameters.url, this._parameters.agentOptions),
          send: B
        }
      }
      return A
    }
  }

  function Y46(A) {
    return new BP0(A)
  }
  QP0.createHttpExporterTransport = Y46
})
// @from(Start 4631922, End 4633033)
JP0 = z((YP0) => {
  Object.defineProperty(YP0, "__esModule", {
    value: !0
  });
  YP0.createRetryingTransport = void 0;
  var W46 = 5,
    J46 = 1000,
    F46 = 5000,
    X46 = 1.5,
    ZP0 = 0.2;

  function V46() {
    return Math.random() * (2 * ZP0) - ZP0
  }
  class DP0 {
    _transport;
    constructor(A) {
      this._transport = A
    }
    retry(A, B, Q) {
      return new Promise((I, G) => {
        setTimeout(() => {
          this._transport.send(A, B).then(I, G)
        }, Q)
      })
    }
    async send(A, B) {
      let Q = Date.now() + B,
        I = await this._transport.send(A, B),
        G = W46,
        Z = J46;
      while (I.status === "retryable" && G > 0) {
        G--;
        let D = Math.max(Math.min(Z, F46) + V46(), 0);
        Z = Z * X46;
        let Y = I.retryInMillis ?? D,
          W = Q - Date.now();
        if (Y > W) return I;
        I = await this.retry(A, W, Y)
      }
      return I
    }
    shutdown() {
      return this._transport.shutdown()
    }
  }

  function C46(A) {
    return new DP0(A.transport)
  }
  YP0.createRetryingTransport = C46
})
// @from(Start 4633039, End 4633598)
VP0 = z((FP0) => {
  Object.defineProperty(FP0, "__esModule", {
    value: !0
  });
  FP0.createOtlpHttpExportDelegate = void 0;
  var K46 = Ng1(),
    H46 = GP0(),
    z46 = Ug1(),
    w46 = JP0();

  function E46(A, B) {
    return K46.createOtlpExportDelegate({
      transport: w46.createRetryingTransport({
        transport: H46.createHttpExporterTransport(A)
      }),
      serializer: B,
      promiseHandler: z46.createBoundedQueueExportPromiseHandler(A)
    }, {
      timeout: A.timeoutMillis
    })
  }
  FP0.createOtlpHttpExportDelegate = E46
})
// @from(Start 4633604, End 4634741)
Bh1 = z((zP0) => {
  Object.defineProperty(zP0, "__esModule", {
    value: !0
  });
  zP0.getSharedConfigurationFromEnvironment = void 0;
  var HP0 = s9();

  function CP0(A) {
    let B = process.env[A]?.trim();
    if (B != null && B !== "") {
      let Q = Number(B);
      if (Number.isFinite(Q) && Q > 0) return Q;
      HP0.diag.warn(`Configuration: ${A} is invalid, expected number greater than 0 (actual: ${B})`)
    }
    return
  }

  function U46(A) {
    let B = CP0(`OTEL_EXPORTER_OTLP_${A}_TIMEOUT`),
      Q = CP0("OTEL_EXPORTER_OTLP_TIMEOUT");
    return B ?? Q
  }

  function KP0(A) {
    let B = process.env[A]?.trim();
    if (B === "") return;
    if (B == null || B === "none" || B === "gzip") return B;
    HP0.diag.warn(`Configuration: ${A} is invalid, expected 'none' or 'gzip' (actual: '${B}')`);
    return
  }

  function N46(A) {
    let B = KP0(`OTEL_EXPORTER_OTLP_${A}_COMPRESSION`),
      Q = KP0("OTEL_EXPORTER_OTLP_COMPRESSION");
    return B ?? Q
  }

  function $46(A) {
    return {
      timeoutMillis: U46(A),
      compression: N46(A)
    }
  }
  zP0.getSharedConfigurationFromEnvironment = $46
})
// @from(Start 4634747, End 4635223)
NP0 = z((EP0) => {
  Object.defineProperty(EP0, "__esModule", {
    value: !0
  });
  EP0.validateAndNormalizeHeaders = void 0;
  var q46 = s9();

  function M46(A) {
    return () => {
      let B = {};
      return Object.entries(A?.() ?? {}).forEach(([Q, I]) => {
        if (typeof I !== "undefined") B[Q] = String(I);
        else q46.diag.warn(`Header "${Q}" has invalid value (${I}) and will be ignored`)
      }), B
    }
  }
  EP0.validateAndNormalizeHeaders = M46
})
// @from(Start 4635229, End 4636487)
LP0 = z((qP0) => {
  Object.defineProperty(qP0, "__esModule", {
    value: !0
  });
  qP0.getHttpConfigurationDefaults = qP0.mergeOtlpHttpConfigurationWithDefaults = void 0;
  var $P0 = ks(),
    L46 = NP0();

  function R46(A, B, Q) {
    let I = {
        ...Q()
      },
      G = {};
    return () => {
      if (B != null) Object.assign(G, B());
      if (A != null) Object.assign(G, A());
      return Object.assign(G, I)
    }
  }

  function O46(A) {
    if (A == null) return;
    try {
      return new URL(A), A
    } catch (B) {
      throw new Error(`Configuration: Could not parse user-provided export URL: '${A}'`)
    }
  }

  function T46(A, B, Q) {
    return {
      ...$P0.mergeOtlpSharedConfigurationWithDefaults(A, B, Q),
      headers: R46(L46.validateAndNormalizeHeaders(A.headers), B.headers, Q.headers),
      url: O46(A.url) ?? B.url ?? Q.url,
      agentOptions: A.agentOptions ?? B.agentOptions ?? Q.agentOptions
    }
  }
  qP0.mergeOtlpHttpConfigurationWithDefaults = T46;

  function P46(A, B) {
    return {
      ...$P0.getSharedConfigurationDefaults(),
      headers: () => A,
      url: "http://localhost:4318/" + B,
      agentOptions: {
        keepAlive: !0
      }
    }
  }
  qP0.getHttpConfigurationDefaults = P46
})
// @from(Start 4636493, End 4638321)
TP0 = z((RP0) => {
  Object.defineProperty(RP0, "__esModule", {
    value: !0
  });
  RP0.getHttpConfigurationFromEnvironment = void 0;
  var hZ1 = p8(),
    Qh1 = s9(),
    _46 = Bh1(),
    j46 = ks();

  function y46(A) {
    let B = process.env[`OTEL_EXPORTER_OTLP_${A}_HEADERS`]?.trim(),
      Q = process.env.OTEL_EXPORTER_OTLP_HEADERS?.trim(),
      I = hZ1.parseKeyPairsIntoRecord(B),
      G = hZ1.parseKeyPairsIntoRecord(Q);
    if (Object.keys(I).length === 0 && Object.keys(G).length === 0) return;
    return Object.assign({}, hZ1.parseKeyPairsIntoRecord(Q), hZ1.parseKeyPairsIntoRecord(B))
  }

  function k46(A) {
    try {
      return new URL(A).toString()
    } catch {
      Qh1.diag.warn(`Configuration: Could not parse environment-provided export URL: '${A}', falling back to undefined`);
      return
    }
  }

  function x46(A, B) {
    try {
      new URL(A)
    } catch {
      Qh1.diag.warn(`Configuration: Could not parse environment-provided export URL: '${A}', falling back to undefined`);
      return
    }
    if (!A.endsWith("/")) A = A + "/";
    A += B;
    try {
      new URL(A)
    } catch {
      Qh1.diag.warn(`Configuration: Provided URL appended with '${B}' is not a valid URL, using 'undefined' instead of '${A}'`);
      return
    }
    return A
  }

  function f46(A) {
    let B = process.env.OTEL_EXPORTER_OTLP_ENDPOINT?.trim();
    if (B == null || B === "") return;
    return x46(B, A)
  }

  function v46(A) {
    let B = process.env[`OTEL_EXPORTER_OTLP_${A}_ENDPOINT`]?.trim();
    if (B == null || B === "") return;
    return k46(B)
  }

  function b46(A, B) {
    return {
      ..._46.getSharedConfigurationFromEnvironment(A),
      url: v46(A) ?? f46(B),
      headers: j46.wrapStaticHeadersInFunction(y46(A))
    }
  }
  RP0.getHttpConfigurationFromEnvironment = b46
})
// @from(Start 4638327, End 4639334)
jP0 = z((SP0) => {
  Object.defineProperty(SP0, "__esModule", {
    value: !0
  });
  SP0.convertLegacyHttpOptions = void 0;
  var PP0 = LP0(),
    g46 = TP0(),
    h46 = s9(),
    m46 = ks();

  function d46(A) {
    if (A?.keepAlive != null)
      if (A.httpAgentOptions != null) {
        if (A.httpAgentOptions.keepAlive == null) A.httpAgentOptions.keepAlive = A.keepAlive
      } else A.httpAgentOptions = {
        keepAlive: A.keepAlive
      };
    return A.httpAgentOptions
  }

  function u46(A, B, Q, I) {
    if (A.metadata) h46.diag.warn("Metadata cannot be set when using http");
    return PP0.mergeOtlpHttpConfigurationWithDefaults({
      url: A.url,
      headers: m46.wrapStaticHeadersInFunction(A.headers),
      concurrencyLimit: A.concurrencyLimit,
      timeoutMillis: A.timeoutMillis,
      compression: A.compression,
      agentOptions: d46(A)
    }, g46.getHttpConfigurationFromEnvironment(B, Q), PP0.getHttpConfigurationDefaults(I, Q))
  }
  SP0.convertLegacyHttpOptions = u46
})
// @from(Start 4639340, End 4640092)
ug = z((hs) => {
  Object.defineProperty(hs, "__esModule", {
    value: !0
  });
  hs.convertLegacyHttpOptions = hs.getSharedConfigurationFromEnvironment = hs.createOtlpHttpExportDelegate = void 0;
  var p46 = VP0();
  Object.defineProperty(hs, "createOtlpHttpExportDelegate", {
    enumerable: !0,
    get: function() {
      return p46.createOtlpHttpExportDelegate
    }
  });
  var c46 = Bh1();
  Object.defineProperty(hs, "getSharedConfigurationFromEnvironment", {
    enumerable: !0,
    get: function() {
      return c46.getSharedConfigurationFromEnvironment
    }
  });
  var l46 = jP0();
  Object.defineProperty(hs, "convertLegacyHttpOptions", {
    enumerable: !0,
    get: function() {
      return l46.convertLegacyHttpOptions
    }
  })
})
// @from(Start 4640098, End 4640694)
vP0 = z((xP0) => {
  Object.defineProperty(xP0, "__esModule", {
    value: !0
  });
  xP0.OTLPMetricExporter = void 0;
  var n46 = Mg1(),
    a46 = i_(),
    s46 = cT0(),
    yP0 = ug(),
    r46 = {
      "User-Agent": `OTel-OTLP-Exporter-JavaScript/${s46.VERSION}`
    };
  class kP0 extends n46.OTLPMetricExporterBase {
    constructor(A) {
      super(yP0.createOtlpHttpExportDelegate(yP0.convertLegacyHttpOptions(A ?? {}, "METRICS", "v1/metrics", {
        ...r46,
        "Content-Type": "application/json"
      }), a46.JsonMetricsSerializer), A)
    }
  }
  xP0.OTLPMetricExporter = kP0
})
// @from(Start 4640700, End 4640982)
bP0 = z((Ih1) => {
  Object.defineProperty(Ih1, "__esModule", {
    value: !0
  });
  Ih1.OTLPMetricExporter = void 0;
  var o46 = vP0();
  Object.defineProperty(Ih1, "OTLPMetricExporter", {
    enumerable: !0,
    get: function() {
      return o46.OTLPMetricExporter
    }
  })
})
// @from(Start 4640988, End 4641270)
gP0 = z((Gh1) => {
  Object.defineProperty(Gh1, "__esModule", {
    value: !0
  });
  Gh1.OTLPMetricExporter = void 0;
  var e46 = bP0();
  Object.defineProperty(Gh1, "OTLPMetricExporter", {
    enumerable: !0,
    get: function() {
      return e46.OTLPMetricExporter
    }
  })
})
// @from(Start 4641276, End 4642557)
dZ1 = z((YR) => {
  Object.defineProperty(YR, "__esModule", {
    value: !0
  });
  YR.OTLPMetricExporterBase = YR.LowMemoryTemporalitySelector = YR.DeltaTemporalitySelector = YR.CumulativeTemporalitySelector = YR.AggregationTemporalityPreference = YR.OTLPMetricExporter = void 0;
  var B66 = gP0();
  Object.defineProperty(YR, "OTLPMetricExporter", {
    enumerable: !0,
    get: function() {
      return B66.OTLPMetricExporter
    }
  });
  var Q66 = wg1();
  Object.defineProperty(YR, "AggregationTemporalityPreference", {
    enumerable: !0,
    get: function() {
      return Q66.AggregationTemporalityPreference
    }
  });
  var mZ1 = Mg1();
  Object.defineProperty(YR, "CumulativeTemporalitySelector", {
    enumerable: !0,
    get: function() {
      return mZ1.CumulativeTemporalitySelector
    }
  });
  Object.defineProperty(YR, "DeltaTemporalitySelector", {
    enumerable: !0,
    get: function() {
      return mZ1.DeltaTemporalitySelector
    }
  });
  Object.defineProperty(YR, "LowMemoryTemporalitySelector", {
    enumerable: !0,
    get: function() {
      return mZ1.LowMemoryTemporalitySelector
    }
  });
  Object.defineProperty(YR, "OTLPMetricExporterBase", {
    enumerable: !0,
    get: function() {
      return mZ1.OTLPMetricExporterBase
    }
  })
})
// @from(Start 4642563, End 4642699)
dP0 = z((hP0) => {
  Object.defineProperty(hP0, "__esModule", {
    value: !0
  });
  hP0.VERSION = void 0;
  hP0.VERSION = "0.200.0"
})
// @from(Start 4642705, End 4643279)
iP0 = z((cP0) => {
  Object.defineProperty(cP0, "__esModule", {
    value: !0
  });
  cP0.OTLPMetricExporter = void 0;
  var G66 = dZ1(),
    Z66 = i_(),
    D66 = dP0(),
    uP0 = ug();
  class pP0 extends G66.OTLPMetricExporterBase {
    constructor(A) {
      super(uP0.createOtlpHttpExportDelegate(uP0.convertLegacyHttpOptions(A ?? {}, "METRICS", "v1/metrics", {
        "User-Agent": `OTel-OTLP-Exporter-JavaScript/${D66.VERSION}`,
        "Content-Type": "application/x-protobuf"
      }), Z66.ProtobufMetricsSerializer), A)
    }
  }
  cP0.OTLPMetricExporter = pP0
})
// @from(Start 4643285, End 4643567)
nP0 = z((Zh1) => {
  Object.defineProperty(Zh1, "__esModule", {
    value: !0
  });
  Zh1.OTLPMetricExporter = void 0;
  var Y66 = iP0();
  Object.defineProperty(Zh1, "OTLPMetricExporter", {
    enumerable: !0,
    get: function() {
      return Y66.OTLPMetricExporter
    }
  })
})
// @from(Start 4643573, End 4645115)
y6 = z((oP0) => {
  Object.defineProperty(oP0, "__esModule", {
    value: !0
  });
  oP0.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = oP0.DEFAULT_MAX_SEND_MESSAGE_LENGTH = oP0.Propagate = oP0.LogVerbosity = oP0.Status = void 0;
  var aP0;
  (function(A) {
    A[A.OK = 0] = "OK", A[A.CANCELLED = 1] = "CANCELLED", A[A.UNKNOWN = 2] = "UNKNOWN", A[A.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", A[A.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", A[A.NOT_FOUND = 5] = "NOT_FOUND", A[A.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", A[A.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", A[A.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", A[A.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", A[A.ABORTED = 10] = "ABORTED", A[A.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", A[A.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", A[A.INTERNAL = 13] = "INTERNAL", A[A.UNAVAILABLE = 14] = "UNAVAILABLE", A[A.DATA_LOSS = 15] = "DATA_LOSS", A[A.UNAUTHENTICATED = 16] = "UNAUTHENTICATED"
  })(aP0 || (oP0.Status = aP0 = {}));
  var sP0;
  (function(A) {
    A[A.DEBUG = 0] = "DEBUG", A[A.INFO = 1] = "INFO", A[A.ERROR = 2] = "ERROR", A[A.NONE = 3] = "NONE"
  })(sP0 || (oP0.LogVerbosity = sP0 = {}));
  var rP0;
  (function(A) {
    A[A.DEADLINE = 1] = "DEADLINE", A[A.CENSUS_STATS_CONTEXT = 2] = "CENSUS_STATS_CONTEXT", A[A.CENSUS_TRACING_CONTEXT = 4] = "CENSUS_TRACING_CONTEXT", A[A.CANCELLATION = 8] = "CANCELLATION", A[A.DEFAULTS = 65535] = "DEFAULTS"
  })(rP0 || (oP0.Propagate = rP0 = {}));
  oP0.DEFAULT_MAX_SEND_MESSAGE_LENGTH = -1;
  oP0.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH = 4194304
})
// @from(Start 4645121, End 4648240)
Dh1 = z((D$8, C66) => {
  C66.exports = {
    name: "@grpc/grpc-js",
    version: "1.13.1",
    description: "gRPC Library for Node - pure JS implementation",
    homepage: "https://grpc.io/",
    repository: "https://github.com/grpc/grpc-node/tree/master/packages/grpc-js",
    main: "build/src/index.js",
    engines: {
      node: ">=12.10.0"
    },
    keywords: [],
    author: {
      name: "Google Inc."
    },
    types: "build/src/index.d.ts",
    license: "Apache-2.0",
    devDependencies: {
      "@grpc/proto-loader": "file:../proto-loader",
      "@types/gulp": "^4.0.17",
      "@types/gulp-mocha": "0.0.37",
      "@types/lodash": "^4.14.202",
      "@types/mocha": "^10.0.6",
      "@types/ncp": "^2.0.8",
      "@types/node": ">=20.11.20",
      "@types/pify": "^5.0.4",
      "@types/semver": "^7.5.8",
      "@typescript-eslint/eslint-plugin": "^7.1.0",
      "@typescript-eslint/parser": "^7.1.0",
      "@typescript-eslint/typescript-estree": "^7.1.0",
      "clang-format": "^1.8.0",
      eslint: "^8.42.0",
      "eslint-config-prettier": "^8.8.0",
      "eslint-plugin-node": "^11.1.0",
      "eslint-plugin-prettier": "^4.2.1",
      execa: "^2.0.3",
      gulp: "^4.0.2",
      "gulp-mocha": "^6.0.0",
      lodash: "^4.17.21",
      madge: "^5.0.1",
      "mocha-jenkins-reporter": "^0.4.1",
      ncp: "^2.0.0",
      pify: "^4.0.1",
      prettier: "^2.8.8",
      rimraf: "^3.0.2",
      semver: "^7.6.0",
      "ts-node": "^10.9.2",
      typescript: "^5.3.3"
    },
    contributors: [{
      name: "Google Inc."
    }],
    scripts: {
      build: "npm run compile",
      clean: "rimraf ./build",
      compile: "tsc -p .",
      format: 'clang-format -i -style="{Language: JavaScript, BasedOnStyle: Google, ColumnLimit: 80}" src/*.ts test/*.ts',
      lint: "eslint src/*.ts test/*.ts",
      prepare: "npm run generate-types && npm run compile",
      test: "gulp test",
      check: "npm run lint",
      fix: "eslint --fix src/*.ts test/*.ts",
      pretest: "npm run generate-types && npm run generate-test-types && npm run compile",
      posttest: "npm run check && madge -c ./build/src",
      "generate-types": "proto-loader-gen-types --keepCase --longs String --enums String --defaults --oneofs --includeComments --includeDirs proto/ --include-dirs test/fixtures/ -O src/generated/ --grpcLib ../index channelz.proto",
      "generate-test-types": "proto-loader-gen-types --keepCase --longs String --enums String --defaults --oneofs --includeComments --include-dirs test/fixtures/ -O test/generated/ --grpcLib ../../src/index test_service.proto"
    },
    dependencies: {
      "@grpc/proto-loader": "^0.7.13",
      "@js-sdsl/ordered-map": "^4.4.2"
    },
    files: ["src/**/*.ts", "build/src/**/*.{js,d.ts,js.map}", "proto/*.proto", "LICENSE", "deps/envoy-api/envoy/api/v2/**/*.proto", "deps/envoy-api/envoy/config/**/*.proto", "deps/envoy-api/envoy/service/**/*.proto", "deps/envoy-api/envoy/type/**/*.proto", "deps/udpa/udpa/**/*.proto", "deps/googleapis/google/api/*.proto", "deps/googleapis/google/rpc/*.proto", "deps/protoc-gen-validate/validate/**/*.proto"]
  }
})
// @from(Start 4648246, End 4650423)
GB = z((BS0) => {
  var Yh1, Wh1, Jh1, Fh1;
  Object.defineProperty(BS0, "__esModule", {
    value: !0
  });
  BS0.log = BS0.setLoggerVerbosity = BS0.setLogger = BS0.getLogger = void 0;
  BS0.trace = L66;
  BS0.isTracerEnabled = AS0;
  var WR = y6(),
    K66 = Z1("process"),
    H66 = Dh1().version,
    z66 = {
      error: (A, ...B) => {
        console.error("E " + A, ...B)
      },
      info: (A, ...B) => {
        console.error("I " + A, ...B)
      },
      debug: (A, ...B) => {
        console.error("D " + A, ...B)
      }
    },
    n_ = z66,
    pg = WR.LogVerbosity.ERROR,
    w66 = (Wh1 = (Yh1 = process.env.GRPC_NODE_VERBOSITY) !== null && Yh1 !== void 0 ? Yh1 : process.env.GRPC_VERBOSITY) !== null && Wh1 !== void 0 ? Wh1 : "";
  switch (w66.toUpperCase()) {
    case "DEBUG":
      pg = WR.LogVerbosity.DEBUG;
      break;
    case "INFO":
      pg = WR.LogVerbosity.INFO;
      break;
    case "ERROR":
      pg = WR.LogVerbosity.ERROR;
      break;
    case "NONE":
      pg = WR.LogVerbosity.NONE;
      break;
    default:
  }
  var E66 = () => {
    return n_
  };
  BS0.getLogger = E66;
  var U66 = (A) => {
    n_ = A
  };
  BS0.setLogger = U66;
  var N66 = (A) => {
    pg = A
  };
  BS0.setLoggerVerbosity = N66;
  var $66 = (A, ...B) => {
    let Q;
    if (A >= pg) {
      switch (A) {
        case WR.LogVerbosity.DEBUG:
          Q = n_.debug;
          break;
        case WR.LogVerbosity.INFO:
          Q = n_.info;
          break;
        case WR.LogVerbosity.ERROR:
          Q = n_.error;
          break
      }
      if (!Q) Q = n_.error;
      if (Q) Q.bind(n_)(...B)
    }
  };
  BS0.log = $66;
  var q66 = (Fh1 = (Jh1 = process.env.GRPC_NODE_TRACE) !== null && Jh1 !== void 0 ? Jh1 : process.env.GRPC_TRACE) !== null && Fh1 !== void 0 ? Fh1 : "",
    Xh1 = new Set,
    eP0 = new Set;
  for (let A of q66.split(","))
    if (A.startsWith("-")) eP0.add(A.substring(1));
    else Xh1.add(A);
  var M66 = Xh1.has("all");

  function L66(A, B, Q) {
    if (AS0(B)) BS0.log(A, new Date().toISOString() + " | v" + H66 + " " + K66.pid + " | " + B + " | " + Q)
  }

  function AS0(A) {
    return !eP0.has(A) && (M66 || Xh1.has(A))
  }
})
// @from(Start 4650429, End 4650818)
uZ1 = z((QS0) => {
  Object.defineProperty(QS0, "__esModule", {
    value: !0
  });
  QS0.getErrorMessage = _66;
  QS0.getErrorCode = j66;

  function _66(A) {
    if (A instanceof Error) return A.message;
    else return String(A)
  }

  function j66(A) {
    if (typeof A === "object" && A !== null && "code" in A && typeof A.code === "number") return A.code;
    else return null
  }
})
// @from(Start 4650824, End 4654356)
SZ = z((ZS0) => {
  Object.defineProperty(ZS0, "__esModule", {
    value: !0
  });
  ZS0.Metadata = void 0;
  var x66 = GB(),
    f66 = y6(),
    v66 = uZ1(),
    b66 = /^[0-9a-z_.-]+$/,
    g66 = /^[ -~]*$/;

  function h66(A) {
    return b66.test(A)
  }

  function m66(A) {
    return g66.test(A)
  }

  function GS0(A) {
    return A.endsWith("-bin")
  }

  function d66(A) {
    return !A.startsWith("grpc-")
  }

  function pZ1(A) {
    return A.toLowerCase()
  }

  function IS0(A, B) {
    if (!h66(A)) throw new Error('Metadata key "' + A + '" contains illegal characters');
    if (B !== null && B !== void 0)
      if (GS0(A)) {
        if (!Buffer.isBuffer(B)) throw new Error("keys that end with '-bin' must have Buffer values")
      } else {
        if (Buffer.isBuffer(B)) throw new Error("keys that don't end with '-bin' must have String values");
        if (!m66(B)) throw new Error('Metadata string value "' + B + '" contains illegal characters')
      }
  }
  class cZ1 {
    constructor(A = {}) {
      this.internalRepr = new Map, this.options = A
    }
    set(A, B) {
      A = pZ1(A), IS0(A, B), this.internalRepr.set(A, [B])
    }
    add(A, B) {
      A = pZ1(A), IS0(A, B);
      let Q = this.internalRepr.get(A);
      if (Q === void 0) this.internalRepr.set(A, [B]);
      else Q.push(B)
    }
    remove(A) {
      A = pZ1(A), this.internalRepr.delete(A)
    }
    get(A) {
      return A = pZ1(A), this.internalRepr.get(A) || []
    }
    getMap() {
      let A = {};
      for (let [B, Q] of this.internalRepr)
        if (Q.length > 0) {
          let I = Q[0];
          A[B] = Buffer.isBuffer(I) ? Buffer.from(I) : I
        } return A
    }
    clone() {
      let A = new cZ1(this.options),
        B = A.internalRepr;
      for (let [Q, I] of this.internalRepr) {
        let G = I.map((Z) => {
          if (Buffer.isBuffer(Z)) return Buffer.from(Z);
          else return Z
        });
        B.set(Q, G)
      }
      return A
    }
    merge(A) {
      for (let [B, Q] of A.internalRepr) {
        let I = (this.internalRepr.get(B) || []).concat(Q);
        this.internalRepr.set(B, I)
      }
    }
    setOptions(A) {
      this.options = A
    }
    getOptions() {
      return this.options
    }
    toHttp2Headers() {
      let A = {};
      for (let [B, Q] of this.internalRepr) A[B] = Q.map(u66);
      return A
    }
    toJSON() {
      let A = {};
      for (let [B, Q] of this.internalRepr) A[B] = Q;
      return A
    }
    static fromHttp2Headers(A) {
      let B = new cZ1;
      for (let Q of Object.keys(A)) {
        if (Q.charAt(0) === ":") continue;
        let I = A[Q];
        try {
          if (GS0(Q)) {
            if (Array.isArray(I)) I.forEach((G) => {
              B.add(Q, Buffer.from(G, "base64"))
            });
            else if (I !== void 0)
              if (d66(Q)) I.split(",").forEach((G) => {
                B.add(Q, Buffer.from(G.trim(), "base64"))
              });
              else B.add(Q, Buffer.from(I, "base64"))
          } else if (Array.isArray(I)) I.forEach((G) => {
            B.add(Q, G)
          });
          else if (I !== void 0) B.add(Q, I)
        } catch (G) {
          let Z = `Failed to add metadata entry ${Q}: ${I}. ${v66.getErrorMessage(G)}. For more information see https://github.com/grpc/grpc-node/issues/1173`;
          x66.log(f66.LogVerbosity.ERROR, Z)
        }
      }
      return B
    }
  }
  ZS0.Metadata = cZ1;
  var u66 = (A) => {
    return Buffer.isBuffer(A) ? A.toString("base64") : A
  }
})
// @from(Start 4654362, End 4656716)
iZ1 = z((YS0) => {
  Object.defineProperty(YS0, "__esModule", {
    value: !0
  });
  YS0.CallCredentials = void 0;
  var Ch1 = SZ();

  function p66(A) {
    return "getRequestHeaders" in A && typeof A.getRequestHeaders === "function"
  }
  class cg {
    static createFromMetadataGenerator(A) {
      return new Kh1(A)
    }
    static createFromGoogleCredential(A) {
      return cg.createFromMetadataGenerator((B, Q) => {
        let I;
        if (p66(A)) I = A.getRequestHeaders(B.service_url);
        else I = new Promise((G, Z) => {
          A.getRequestMetadata(B.service_url, (D, Y) => {
            if (D) {
              Z(D);
              return
            }
            if (!Y) {
              Z(new Error("Headers not set by metadata plugin"));
              return
            }
            G(Y)
          })
        });
        I.then((G) => {
          let Z = new Ch1.Metadata;
          for (let D of Object.keys(G)) Z.add(D, G[D]);
          Q(null, Z)
        }, (G) => {
          Q(G)
        })
      })
    }
    static createEmpty() {
      return new Hh1
    }
  }
  YS0.CallCredentials = cg;
  class lZ1 extends cg {
    constructor(A) {
      super();
      this.creds = A
    }
    async generateMetadata(A) {
      let B = new Ch1.Metadata,
        Q = await Promise.all(this.creds.map((I) => I.generateMetadata(A)));
      for (let I of Q) B.merge(I);
      return B
    }
    compose(A) {
      return new lZ1(this.creds.concat([A]))
    }
    _equals(A) {
      if (this === A) return !0;
      if (A instanceof lZ1) return this.creds.every((B, Q) => B._equals(A.creds[Q]));
      else return !1
    }
  }
  class Kh1 extends cg {
    constructor(A) {
      super();
      this.metadataGenerator = A
    }
    generateMetadata(A) {
      return new Promise((B, Q) => {
        this.metadataGenerator(A, (I, G) => {
          if (G !== void 0) B(G);
          else Q(I)
        })
      })
    }
    compose(A) {
      return new lZ1([this, A])
    }
    _equals(A) {
      if (this === A) return !0;
      if (A instanceof Kh1) return this.metadataGenerator === A.metadataGenerator;
      else return !1
    }
  }
  class Hh1 extends cg {
    generateMetadata(A) {
      return Promise.resolve(new Ch1.Metadata)
    }
    compose(A) {
      return A
    }
    _equals(A) {
      return A instanceof Hh1
    }
  }
})
// @from(Start 4656722, End 4657156)
wh1 = z((FS0) => {
  Object.defineProperty(FS0, "__esModule", {
    value: !0
  });
  FS0.CIPHER_SUITES = void 0;
  FS0.getDefaultRootsData = l66;
  var c66 = Z1("fs");
  FS0.CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES;
  var JS0 = process.env.GRPC_DEFAULT_SSL_ROOTS_FILE_PATH,
    zh1 = null;

  function l66() {
    if (JS0) {
      if (zh1 === null) zh1 = c66.readFileSync(JS0);
      return zh1
    }
    return null
  }
})
// @from(Start 4657162, End 4658667)
uY = z((CS0) => {
  Object.defineProperty(CS0, "__esModule", {
    value: !0
  });
  CS0.parseUri = a66;
  CS0.splitHostPort = s66;
  CS0.combineHostPort = r66;
  CS0.uriToString = o66;
  var n66 = /^(?:([A-Za-z0-9+.-]+):)?(?:\/\/([^/]*)\/)?(.+)$/;

  function a66(A) {
    let B = n66.exec(A);
    if (B === null) return null;
    return {
      scheme: B[1],
      authority: B[2],
      path: B[3]
    }
  }
  var VS0 = /^\d+$/;

  function s66(A) {
    if (A.startsWith("[")) {
      let B = A.indexOf("]");
      if (B === -1) return null;
      let Q = A.substring(1, B);
      if (Q.indexOf(":") === -1) return null;
      if (A.length > B + 1)
        if (A[B + 1] === ":") {
          let I = A.substring(B + 2);
          if (VS0.test(I)) return {
            host: Q,
            port: +I
          };
          else return null
        } else return null;
      else return {
        host: Q
      }
    } else {
      let B = A.split(":");
      if (B.length === 2)
        if (VS0.test(B[1])) return {
          host: B[0],
          port: +B[1]
        };
        else return null;
      else return {
        host: A
      }
    }
  }

  function r66(A) {
    if (A.port === void 0) return A.host;
    else if (A.host.includes(":")) return `[${A.host}]:${A.port}`;
    else return `${A.host}:${A.port}`
  }

  function o66(A) {
    let B = "";
    if (A.scheme !== void 0) B += A.scheme + ":";
    if (A.authority !== void 0) B += "//" + A.authority + "/";
    return B += A.path, B
  }
})
// @from(Start 4658673, End 4659661)
Zw = z((KS0) => {
  Object.defineProperty(KS0, "__esModule", {
    value: !0
  });
  KS0.registerResolver = Q56;
  KS0.registerDefaultScheme = I56;
  KS0.createResolver = G56;
  KS0.getDefaultAuthority = Z56;
  KS0.mapUriDefaultScheme = D56;
  var Uh1 = uY(),
    lg = {},
    Eh1 = null;

  function Q56(A, B) {
    lg[A] = B
  }

  function I56(A) {
    Eh1 = A
  }

  function G56(A, B, Q) {
    if (A.scheme !== void 0 && A.scheme in lg) return new lg[A.scheme](A, B, Q);
    else throw new Error(`No resolver could be created for target ${Uh1.uriToString(A)}`)
  }

  function Z56(A) {
    if (A.scheme !== void 0 && A.scheme in lg) return lg[A.scheme].getDefaultAuthority(A);
    else throw new Error(`Invalid target ${Uh1.uriToString(A)}`)
  }

  function D56(A) {
    if (A.scheme === void 0 || !(A.scheme in lg))
      if (Eh1 !== null) return {
        scheme: Eh1,
        authority: void 0,
        path: Uh1.uriToString(A)
      };
      else return null;
    return A
  }
})
// @from(Start 4659667, End 4669997)
us = z((ES0) => {
  Object.defineProperty(ES0, "__esModule", {
    value: !0
  });
  ES0.ChannelCredentials = void 0;
  ES0.createCertificateProviderChannelCredentials = K56;
  var ds = Z1("tls"),
    rZ1 = iZ1(),
    $h1 = wh1(),
    nZ1 = uY(),
    HS0 = Zw(),
    V56 = GB(),
    C56 = y6();

  function Nh1(A, B) {
    if (A && !(A instanceof Buffer)) throw new TypeError(`${B}, if provided, must be a Buffer.`)
  }
  class ig {
    compose(A) {
      return new sZ1(this, A)
    }
    static createSsl(A, B, Q, I) {
      var G;
      if (Nh1(A, "Root certificate"), Nh1(B, "Private key"), Nh1(Q, "Certificate chain"), B && !Q) throw new Error("Private key must be given with accompanying certificate chain");
      if (!B && Q) throw new Error("Certificate chain must be given with accompanying private key");
      let Z = ds.createSecureContext({
        ca: (G = A !== null && A !== void 0 ? A : $h1.getDefaultRootsData()) !== null && G !== void 0 ? G : void 0,
        key: B !== null && B !== void 0 ? B : void 0,
        cert: Q !== null && Q !== void 0 ? Q : void 0,
        ciphers: $h1.CIPHER_SUITES
      });
      return new aZ1(Z, I !== null && I !== void 0 ? I : {})
    }
    static createFromSecureContext(A, B) {
      return new aZ1(A, B !== null && B !== void 0 ? B : {})
    }
    static createInsecure() {
      return new qh1
    }
  }
  ES0.ChannelCredentials = ig;
  class qh1 extends ig {
    constructor() {
      super()
    }
    compose(A) {
      throw new Error("Cannot compose insecure credentials")
    }
    _isSecure() {
      return !1
    }
    _equals(A) {
      return A instanceof qh1
    }
    _createSecureConnector(A, B, Q) {
      return {
        connect(I) {
          return Promise.resolve({
            socket: I,
            secure: !1
          })
        },
        waitForReady: () => {
          return Promise.resolve()
        },
        getCallCredentials: () => {
          return Q !== null && Q !== void 0 ? Q : rZ1.CallCredentials.createEmpty()
        },
        destroy() {}
      }
    }
  }

  function zS0(A, B, Q, I) {
    var G, Z, D, Y;
    let W = {
      secureContext: A
    };
    if (B.checkServerIdentity) W.checkServerIdentity = B.checkServerIdentity;
    if (B.rejectUnauthorized !== void 0) W.rejectUnauthorized = B.rejectUnauthorized;
    if (W.ALPNProtocols = ["h2"], I["grpc.ssl_target_name_override"]) {
      let C = I["grpc.ssl_target_name_override"],
        K = (G = W.checkServerIdentity) !== null && G !== void 0 ? G : ds.checkServerIdentity;
      W.checkServerIdentity = (E, N) => {
        return K(C, N)
      }, W.servername = C
    } else if ("grpc.http_connect_target" in I) {
      let C = HS0.getDefaultAuthority((Z = nZ1.parseUri(I["grpc.http_connect_target"])) !== null && Z !== void 0 ? Z : {
          path: "localhost"
        }),
        K = nZ1.splitHostPort(C);
      W.servername = (D = K === null || K === void 0 ? void 0 : K.host) !== null && D !== void 0 ? D : C
    }
    if (I["grpc-node.tls_enable_trace"]) W.enableTrace = !0;
    let J = Q;
    if ("grpc.http_connect_target" in I) {
      let C = nZ1.parseUri(I["grpc.http_connect_target"]);
      if (C) J = C
    }
    let F = HS0.getDefaultAuthority(J),
      X = nZ1.splitHostPort(F),
      V = (Y = X === null || X === void 0 ? void 0 : X.host) !== null && Y !== void 0 ? Y : F;
    return W.host = V, W.servername = V, W
  }
  class wS0 {
    constructor(A, B) {
      this.connectionOptions = A, this.callCredentials = B
    }
    connect(A) {
      let B = Object.assign({
        socket: A
      }, this.connectionOptions);
      return new Promise((Q, I) => {
        let G = ds.connect(B, () => {
          var Z;
          if (((Z = this.connectionOptions.rejectUnauthorized) !== null && Z !== void 0 ? Z : !0) && !G.authorized) {
            I(G.authorizationError);
            return
          }
          Q({
            socket: G,
            secure: !0
          })
        });
        G.on("error", (Z) => {
          I(Z)
        })
      })
    }
    waitForReady() {
      return Promise.resolve()
    }
    getCallCredentials() {
      return this.callCredentials
    }
    destroy() {}
  }
  class aZ1 extends ig {
    constructor(A, B) {
      super();
      this.secureContext = A, this.verifyOptions = B
    }
    _isSecure() {
      return !0
    }
    _equals(A) {
      if (this === A) return !0;
      if (A instanceof aZ1) return this.secureContext === A.secureContext && this.verifyOptions.checkServerIdentity === A.verifyOptions.checkServerIdentity;
      else return !1
    }
    _createSecureConnector(A, B, Q) {
      let I = zS0(this.secureContext, this.verifyOptions, A, B);
      return new wS0(I, Q !== null && Q !== void 0 ? Q : rZ1.CallCredentials.createEmpty())
    }
  }
  class ms extends ig {
    constructor(A, B, Q) {
      super();
      this.caCertificateProvider = A, this.identityCertificateProvider = B, this.verifyOptions = Q, this.refcount = 0, this.latestCaUpdate = void 0, this.latestIdentityUpdate = void 0, this.caCertificateUpdateListener = this.handleCaCertificateUpdate.bind(this), this.identityCertificateUpdateListener = this.handleIdentityCertitificateUpdate.bind(this), this.secureContextWatchers = []
    }
    _isSecure() {
      return !0
    }
    _equals(A) {
      var B, Q;
      if (this === A) return !0;
      if (A instanceof ms) return this.caCertificateProvider === A.caCertificateProvider && this.identityCertificateProvider === A.identityCertificateProvider && ((B = this.verifyOptions) === null || B === void 0 ? void 0 : B.checkServerIdentity) === ((Q = A.verifyOptions) === null || Q === void 0 ? void 0 : Q.checkServerIdentity);
      else return !1
    }
    ref() {
      var A;
      if (this.refcount === 0) this.caCertificateProvider.addCaCertificateListener(this.caCertificateUpdateListener), (A = this.identityCertificateProvider) === null || A === void 0 || A.addIdentityCertificateListener(this.identityCertificateUpdateListener);
      this.refcount += 1
    }
    unref() {
      var A;
      if (this.refcount -= 1, this.refcount === 0) this.caCertificateProvider.removeCaCertificateListener(this.caCertificateUpdateListener), (A = this.identityCertificateProvider) === null || A === void 0 || A.removeIdentityCertificateListener(this.identityCertificateUpdateListener)
    }
    _createSecureConnector(A, B, Q) {
      return this.ref(), new ms.SecureConnectorImpl(this, A, B, Q !== null && Q !== void 0 ? Q : rZ1.CallCredentials.createEmpty())
    }
    maybeUpdateWatchers() {
      if (this.hasReceivedUpdates()) {
        for (let A of this.secureContextWatchers) A(this.getLatestSecureContext());
        this.secureContextWatchers = []
      }
    }
    handleCaCertificateUpdate(A) {
      this.latestCaUpdate = A, this.maybeUpdateWatchers()
    }
    handleIdentityCertitificateUpdate(A) {
      this.latestIdentityUpdate = A, this.maybeUpdateWatchers()
    }
    hasReceivedUpdates() {
      if (this.latestCaUpdate === void 0) return !1;
      if (this.identityCertificateProvider && this.latestIdentityUpdate === void 0) return !1;
      return !0
    }
    getSecureContext() {
      if (this.hasReceivedUpdates()) return Promise.resolve(this.getLatestSecureContext());
      else return new Promise((A) => {
        this.secureContextWatchers.push(A)
      })
    }
    getLatestSecureContext() {
      var A, B;
      if (!this.latestCaUpdate) return null;
      if (this.identityCertificateProvider !== null && !this.latestIdentityUpdate) return null;
      try {
        return ds.createSecureContext({
          ca: this.latestCaUpdate.caCertificate,
          key: (A = this.latestIdentityUpdate) === null || A === void 0 ? void 0 : A.privateKey,
          cert: (B = this.latestIdentityUpdate) === null || B === void 0 ? void 0 : B.certificate,
          ciphers: $h1.CIPHER_SUITES
        })
      } catch (Q) {
        return V56.log(C56.LogVerbosity.ERROR, "Failed to createSecureContext with error " + Q.message), null
      }
    }
  }
  ms.SecureConnectorImpl = class {
    constructor(A, B, Q, I) {
      this.parent = A, this.channelTarget = B, this.options = Q, this.callCredentials = I
    }
    connect(A) {
      return new Promise((B, Q) => {
        let I = this.parent.getLatestSecureContext();
        if (!I) {
          Q(new Error("Failed to load credentials"));
          return
        }
        if (A.closed) Q(new Error("Socket closed while loading credentials"));
        let G = zS0(I, this.parent.verifyOptions, this.channelTarget, this.options),
          Z = Object.assign({
            socket: A
          }, G),
          D = () => {
            Q(new Error("Socket closed"))
          },
          Y = (J) => {
            Q(J)
          },
          W = ds.connect(Z, () => {
            var J;
            if (W.removeListener("close", D), W.removeListener("error", Y), ((J = this.parent.verifyOptions.rejectUnauthorized) !== null && J !== void 0 ? J : !0) && !W.authorized) {
              Q(W.authorizationError);
              return
            }
            B({
              socket: W,
              secure: !0
            })
          });
        W.once("close", D), W.once("error", Y)
      })
    }
    async waitForReady() {
      await this.parent.getSecureContext()
    }
    getCallCredentials() {
      return this.callCredentials
    }
    destroy() {
      this.parent.unref()
    }
  };

  function K56(A, B, Q) {
    return new ms(A, B, Q !== null && Q !== void 0 ? Q : {})
  }
  class sZ1 extends ig {
    constructor(A, B) {
      super();
      if (this.channelCredentials = A, this.callCredentials = B, !A._isSecure()) throw new Error("Cannot compose insecure credentials")
    }
    compose(A) {
      let B = this.callCredentials.compose(A);
      return new sZ1(this.channelCredentials, B)
    }
    _isSecure() {
      return !0
    }
    _equals(A) {
      if (this === A) return !0;
      if (A instanceof sZ1) return this.channelCredentials._equals(A.channelCredentials) && this.callCredentials._equals(A.callCredentials);
      else return !1
    }
    _createSecureConnector(A, B, Q) {
      let I = this.callCredentials.compose(Q !== null && Q !== void 0 ? Q : rZ1.CallCredentials.createEmpty());
      return this.channelCredentials._createSecureConnector(A, B, I)
    }
  }
})
// @from(Start 4670003, End 4672518)
a_ = z(($S0) => {
  Object.defineProperty($S0, "__esModule", {
    value: !0
  });
  $S0.createChildChannelControlHelper = E56;
  $S0.registerLoadBalancerType = U56;
  $S0.registerDefaultLoadBalancerType = N56;
  $S0.createLoadBalancer = $56;
  $S0.isLoadBalancerNameRegistered = q56;
  $S0.parseLoadBalancingConfig = NS0;
  $S0.getDefaultConfig = M56;
  $S0.selectLbConfigFromList = L56;
  var z56 = GB(),
    w56 = y6();

  function E56(A, B) {
    var Q, I, G, Z, D, Y, W, J, F, X;
    return {
      createSubchannel: (I = (Q = B.createSubchannel) === null || Q === void 0 ? void 0 : Q.bind(B)) !== null && I !== void 0 ? I : A.createSubchannel.bind(A),
      updateState: (Z = (G = B.updateState) === null || G === void 0 ? void 0 : G.bind(B)) !== null && Z !== void 0 ? Z : A.updateState.bind(A),
      requestReresolution: (Y = (D = B.requestReresolution) === null || D === void 0 ? void 0 : D.bind(B)) !== null && Y !== void 0 ? Y : A.requestReresolution.bind(A),
      addChannelzChild: (J = (W = B.addChannelzChild) === null || W === void 0 ? void 0 : W.bind(B)) !== null && J !== void 0 ? J : A.addChannelzChild.bind(A),
      removeChannelzChild: (X = (F = B.removeChannelzChild) === null || F === void 0 ? void 0 : F.bind(B)) !== null && X !== void 0 ? X : A.removeChannelzChild.bind(A)
    }
  }
  var JR = {},
    ps = null;

  function U56(A, B, Q) {
    JR[A] = {
      LoadBalancer: B,
      LoadBalancingConfig: Q
    }
  }

  function N56(A) {
    ps = A
  }

  function $56(A, B) {
    let Q = A.getLoadBalancerName();
    if (Q in JR) return new JR[Q].LoadBalancer(B);
    else return null
  }

  function q56(A) {
    return A in JR
  }

  function NS0(A) {
    let B = Object.keys(A);
    if (B.length !== 1) throw new Error("Provided load balancing config has multiple conflicting entries");
    let Q = B[0];
    if (Q in JR) try {
      return JR[Q].LoadBalancingConfig.createFromJson(A[Q])
    } catch (I) {
      throw new Error(`${Q}: ${I.message}`)
    } else throw new Error(`Unrecognized load balancing config name ${Q}`)
  }

  function M56() {
    if (!ps) throw new Error("No default load balancer type registered");
    return new JR[ps].LoadBalancingConfig
  }

  function L56(A, B = !1) {
    for (let Q of A) try {
      return NS0(Q)
    } catch (I) {
      z56.log(w56.LogVerbosity.DEBUG, "Config parsing failed with error", I.message);
      continue
    }
    if (B)
      if (ps) return new JR[ps].LoadBalancingConfig;
      else return null;
    else return null
  }
})
// @from(Start 4672524, End 4682992)
Mh1 = z((LS0) => {
  Object.defineProperty(LS0, "__esModule", {
    value: !0
  });
  LS0.validateRetryThrottling = qS0;
  LS0.validateServiceConfig = MS0;
  LS0.extractAndSelectServiceConfig = u56;
  var k56 = Z1("os"),
    oZ1 = y6(),
    tZ1 = /^\d+(\.\d{1,9})?s$/,
    x56 = "node";

  function f56(A) {
    if ("service" in A && A.service !== "") {
      if (typeof A.service !== "string") throw new Error(`Invalid method config name: invalid service: expected type string, got ${typeof A.service}`);
      if ("method" in A && A.method !== "") {
        if (typeof A.method !== "string") throw new Error(`Invalid method config name: invalid method: expected type string, got ${typeof A.service}`);
        return {
          service: A.service,
          method: A.method
        }
      } else return {
        service: A.service
      }
    } else {
      if ("method" in A && A.method !== void 0) throw new Error("Invalid method config name: method set with empty or unset service");
      return {}
    }
  }

  function v56(A) {
    if (!("maxAttempts" in A) || !Number.isInteger(A.maxAttempts) || A.maxAttempts < 2) throw new Error("Invalid method config retry policy: maxAttempts must be an integer at least 2");
    if (!("initialBackoff" in A) || typeof A.initialBackoff !== "string" || !tZ1.test(A.initialBackoff)) throw new Error("Invalid method config retry policy: initialBackoff must be a string consisting of a positive integer or decimal followed by s");
    if (!("maxBackoff" in A) || typeof A.maxBackoff !== "string" || !tZ1.test(A.maxBackoff)) throw new Error("Invalid method config retry policy: maxBackoff must be a string consisting of a positive integer or decimal followed by s");
    if (!("backoffMultiplier" in A) || typeof A.backoffMultiplier !== "number" || A.backoffMultiplier <= 0) throw new Error("Invalid method config retry policy: backoffMultiplier must be a number greater than 0");
    if (!(("retryableStatusCodes" in A) && Array.isArray(A.retryableStatusCodes))) throw new Error("Invalid method config retry policy: retryableStatusCodes is required");
    if (A.retryableStatusCodes.length === 0) throw new Error("Invalid method config retry policy: retryableStatusCodes must be non-empty");
    for (let B of A.retryableStatusCodes)
      if (typeof B === "number") {
        if (!Object.values(oZ1.Status).includes(B)) throw new Error("Invalid method config retry policy: retryableStatusCodes value not in status code range")
      } else if (typeof B === "string") {
      if (!Object.values(oZ1.Status).includes(B.toUpperCase())) throw new Error("Invalid method config retry policy: retryableStatusCodes value not a status code name")
    } else throw new Error("Invalid method config retry policy: retryableStatusCodes value must be a string or number");
    return {
      maxAttempts: A.maxAttempts,
      initialBackoff: A.initialBackoff,
      maxBackoff: A.maxBackoff,
      backoffMultiplier: A.backoffMultiplier,
      retryableStatusCodes: A.retryableStatusCodes
    }
  }

  function b56(A) {
    if (!("maxAttempts" in A) || !Number.isInteger(A.maxAttempts) || A.maxAttempts < 2) throw new Error("Invalid method config hedging policy: maxAttempts must be an integer at least 2");
    if ("hedgingDelay" in A && (typeof A.hedgingDelay !== "string" || !tZ1.test(A.hedgingDelay))) throw new Error("Invalid method config hedging policy: hedgingDelay must be a string consisting of a positive integer followed by s");
    if ("nonFatalStatusCodes" in A && Array.isArray(A.nonFatalStatusCodes))
      for (let Q of A.nonFatalStatusCodes)
        if (typeof Q === "number") {
          if (!Object.values(oZ1.Status).includes(Q)) throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value not in status code range")
        } else if (typeof Q === "string") {
      if (!Object.values(oZ1.Status).includes(Q.toUpperCase())) throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value not a status code name")
    } else throw new Error("Invalid method config hedging policy: nonFatalStatusCodes value must be a string or number");
    let B = {
      maxAttempts: A.maxAttempts
    };
    if (A.hedgingDelay) B.hedgingDelay = A.hedgingDelay;
    if (A.nonFatalStatusCodes) B.nonFatalStatusCodes = A.nonFatalStatusCodes;
    return B
  }

  function g56(A) {
    var B;
    let Q = {
      name: []
    };
    if (!("name" in A) || !Array.isArray(A.name)) throw new Error("Invalid method config: invalid name array");
    for (let I of A.name) Q.name.push(f56(I));
    if ("waitForReady" in A) {
      if (typeof A.waitForReady !== "boolean") throw new Error("Invalid method config: invalid waitForReady");
      Q.waitForReady = A.waitForReady
    }
    if ("timeout" in A)
      if (typeof A.timeout === "object") {
        if (!("seconds" in A.timeout) || typeof A.timeout.seconds !== "number") throw new Error("Invalid method config: invalid timeout.seconds");
        if (!("nanos" in A.timeout) || typeof A.timeout.nanos !== "number") throw new Error("Invalid method config: invalid timeout.nanos");
        Q.timeout = A.timeout
      } else if (typeof A.timeout === "string" && tZ1.test(A.timeout)) {
      let I = A.timeout.substring(0, A.timeout.length - 1).split(".");
      Q.timeout = {
        seconds: I[0] | 0,
        nanos: ((B = I[1]) !== null && B !== void 0 ? B : 0) | 0
      }
    } else throw new Error("Invalid method config: invalid timeout");
    if ("maxRequestBytes" in A) {
      if (typeof A.maxRequestBytes !== "number") throw new Error("Invalid method config: invalid maxRequestBytes");
      Q.maxRequestBytes = A.maxRequestBytes
    }
    if ("maxResponseBytes" in A) {
      if (typeof A.maxResponseBytes !== "number") throw new Error("Invalid method config: invalid maxRequestBytes");
      Q.maxResponseBytes = A.maxResponseBytes
    }
    if ("retryPolicy" in A)
      if ("hedgingPolicy" in A) throw new Error("Invalid method config: retryPolicy and hedgingPolicy cannot both be specified");
      else Q.retryPolicy = v56(A.retryPolicy);
    else if ("hedgingPolicy" in A) Q.hedgingPolicy = b56(A.hedgingPolicy);
    return Q
  }

  function qS0(A) {
    if (!("maxTokens" in A) || typeof A.maxTokens !== "number" || A.maxTokens <= 0 || A.maxTokens > 1000) throw new Error("Invalid retryThrottling: maxTokens must be a number in (0, 1000]");
    if (!("tokenRatio" in A) || typeof A.tokenRatio !== "number" || A.tokenRatio <= 0) throw new Error("Invalid retryThrottling: tokenRatio must be a number greater than 0");
    return {
      maxTokens: +A.maxTokens.toFixed(3),
      tokenRatio: +A.tokenRatio.toFixed(3)
    }
  }

  function h56(A) {
    if (!(typeof A === "object" && A !== null)) throw new Error(`Invalid loadBalancingConfig: unexpected type ${typeof A}`);
    let B = Object.keys(A);
    if (B.length > 1) throw new Error(`Invalid loadBalancingConfig: unexpected multiple keys ${B}`);
    if (B.length === 0) throw new Error("Invalid loadBalancingConfig: load balancing policy name required");
    return {
      [B[0]]: A[B[0]]
    }
  }

  function MS0(A) {
    let B = {
      loadBalancingConfig: [],
      methodConfig: []
    };
    if ("loadBalancingPolicy" in A)
      if (typeof A.loadBalancingPolicy === "string") B.loadBalancingPolicy = A.loadBalancingPolicy;
      else throw new Error("Invalid service config: invalid loadBalancingPolicy");
    if ("loadBalancingConfig" in A)
      if (Array.isArray(A.loadBalancingConfig))
        for (let I of A.loadBalancingConfig) B.loadBalancingConfig.push(h56(I));
      else throw new Error("Invalid service config: invalid loadBalancingConfig");
    if ("methodConfig" in A) {
      if (Array.isArray(A.methodConfig))
        for (let I of A.methodConfig) B.methodConfig.push(g56(I))
    }
    if ("retryThrottling" in A) B.retryThrottling = qS0(A.retryThrottling);
    let Q = [];
    for (let I of B.methodConfig)
      for (let G of I.name) {
        for (let Z of Q)
          if (G.service === Z.service && G.method === Z.method) throw new Error(`Invalid service config: duplicate name ${G.service}/${G.method}`);
        Q.push(G)
      }
    return B
  }

  function m56(A) {
    if (!("serviceConfig" in A)) throw new Error("Invalid service config choice: missing service config");
    let B = {
      serviceConfig: MS0(A.serviceConfig)
    };
    if ("clientLanguage" in A)
      if (Array.isArray(A.clientLanguage)) {
        B.clientLanguage = [];
        for (let I of A.clientLanguage)
          if (typeof I === "string") B.clientLanguage.push(I);
          else throw new Error("Invalid service config choice: invalid clientLanguage")
      } else throw new Error("Invalid service config choice: invalid clientLanguage");
    if ("clientHostname" in A)
      if (Array.isArray(A.clientHostname)) {
        B.clientHostname = [];
        for (let I of A.clientHostname)
          if (typeof I === "string") B.clientHostname.push(I);
          else throw new Error("Invalid service config choice: invalid clientHostname")
      } else throw new Error("Invalid service config choice: invalid clientHostname");
    if ("percentage" in A)
      if (typeof A.percentage === "number" && 0 <= A.percentage && A.percentage <= 100) B.percentage = A.percentage;
      else throw new Error("Invalid service config choice: invalid percentage");
    let Q = ["clientLanguage", "percentage", "clientHostname", "serviceConfig"];
    for (let I in A)
      if (!Q.includes(I)) throw new Error(`Invalid service config choice: unexpected field ${I}`);
    return B
  }

  function d56(A, B) {
    if (!Array.isArray(A)) throw new Error("Invalid service config list");
    for (let Q of A) {
      let I = m56(Q);
      if (typeof I.percentage === "number" && B > I.percentage) continue;
      if (Array.isArray(I.clientHostname)) {
        let G = !1;
        for (let Z of I.clientHostname)
          if (Z === k56.hostname()) G = !0;
        if (!G) continue
      }
      if (Array.isArray(I.clientLanguage)) {
        let G = !1;
        for (let Z of I.clientLanguage)
          if (Z === x56) G = !0;
        if (!G) continue
      }
      return I.serviceConfig
    }
    throw new Error("No matching service config found")
  }

  function u56(A, B) {
    for (let Q of A)
      if (Q.length > 0 && Q[0].startsWith("grpc_config=")) {
        let I = Q.join("").substring(12),
          G = JSON.parse(I);
        return d56(G, B)
      } return null
  }
})
// @from(Start 4682998, End 4683364)
TX = z((OS0) => {
  Object.defineProperty(OS0, "__esModule", {
    value: !0
  });
  OS0.ConnectivityState = void 0;
  var RS0;
  (function(A) {
    A[A.IDLE = 0] = "IDLE", A[A.CONNECTING = 1] = "CONNECTING", A[A.READY = 2] = "READY", A[A.TRANSIENT_FAILURE = 3] = "TRANSIENT_FAILURE", A[A.SHUTDOWN = 4] = "SHUTDOWN"
  })(RS0 || (OS0.ConnectivityState = RS0 = {}))
})
// @from(Start 4683370, End 4684737)
FR = z((_S0) => {
  Object.defineProperty(_S0, "__esModule", {
    value: !0
  });
  _S0.QueuePicker = _S0.UnavailablePicker = _S0.PickResultType = void 0;
  var i56 = SZ(),
    n56 = y6(),
    eZ1;
  (function(A) {
    A[A.COMPLETE = 0] = "COMPLETE", A[A.QUEUE = 1] = "QUEUE", A[A.TRANSIENT_FAILURE = 2] = "TRANSIENT_FAILURE", A[A.DROP = 3] = "DROP"
  })(eZ1 || (_S0.PickResultType = eZ1 = {}));
  class PS0 {
    constructor(A) {
      this.status = Object.assign({
        code: n56.Status.UNAVAILABLE,
        details: "No connection established",
        metadata: new i56.Metadata
      }, A)
    }
    pick(A) {
      return {
        pickResultType: eZ1.TRANSIENT_FAILURE,
        subchannel: null,
        status: this.status,
        onCallStarted: null,
        onCallEnded: null
      }
    }
  }
  _S0.UnavailablePicker = PS0;
  class SS0 {
    constructor(A, B) {
      this.loadBalancer = A, this.childPicker = B, this.calledExitIdle = !1
    }
    pick(A) {
      if (!this.calledExitIdle) process.nextTick(() => {
        this.loadBalancer.exitIdle()
      }), this.calledExitIdle = !0;
      if (this.childPicker) return this.childPicker.pick(A);
      else return {
        pickResultType: eZ1.QUEUE,
        subchannel: null,
        status: null,
        onCallStarted: null,
        onCallEnded: null
      }
    }
  }
  _S0.QueuePicker = SS0
})
// @from(Start 4684743, End 4687523)
cs = z((yS0) => {
  Object.defineProperty(yS0, "__esModule", {
    value: !0
  });
  yS0.BackoffTimeout = void 0;
  var r56 = y6(),
    o56 = GB(),
    t56 = "backoff",
    e56 = 1000,
    A86 = 1.6,
    B86 = 120000,
    Q86 = 0.2;

  function I86(A, B) {
    return Math.random() * (B - A) + A
  }
  class AD1 {
    constructor(A, B) {
      if (this.callback = A, this.initialDelay = e56, this.multiplier = A86, this.maxDelay = B86, this.jitter = Q86, this.running = !1, this.hasRef = !0, this.startTime = new Date, this.endTime = new Date, this.id = AD1.getNextId(), B) {
        if (B.initialDelay) this.initialDelay = B.initialDelay;
        if (B.multiplier) this.multiplier = B.multiplier;
        if (B.jitter) this.jitter = B.jitter;
        if (B.maxDelay) this.maxDelay = B.maxDelay
      }
      this.trace("constructed initialDelay=" + this.initialDelay + " multiplier=" + this.multiplier + " jitter=" + this.jitter + " maxDelay=" + this.maxDelay), this.nextDelay = this.initialDelay, this.timerId = setTimeout(() => {}, 0), clearTimeout(this.timerId)
    }
    static getNextId() {
      return this.nextId++
    }
    trace(A) {
      o56.trace(r56.LogVerbosity.DEBUG, t56, "{" + this.id + "} " + A)
    }
    runTimer(A) {
      var B, Q;
      if (this.trace("runTimer(delay=" + A + ")"), this.endTime = this.startTime, this.endTime.setMilliseconds(this.endTime.getMilliseconds() + A), clearTimeout(this.timerId), this.timerId = setTimeout(() => {
          this.trace("timer fired"), this.running = !1, this.callback()
        }, A), !this.hasRef)(Q = (B = this.timerId).unref) === null || Q === void 0 || Q.call(B)
    }
    runOnce() {
      this.trace("runOnce()"), this.running = !0, this.startTime = new Date, this.runTimer(this.nextDelay);
      let A = Math.min(this.nextDelay * this.multiplier, this.maxDelay),
        B = A * this.jitter;
      this.nextDelay = A + I86(-B, B)
    }
    stop() {
      this.trace("stop()"), clearTimeout(this.timerId), this.running = !1
    }
    reset() {
      if (this.trace("reset() running=" + this.running), this.nextDelay = this.initialDelay, this.running) {
        let A = new Date,
          B = this.startTime;
        if (B.setMilliseconds(B.getMilliseconds() + this.nextDelay), clearTimeout(this.timerId), A < B) this.runTimer(B.getTime() - A.getTime());
        else this.running = !1
      }
    }
    isRunning() {
      return this.running
    }
    ref() {
      var A, B;
      this.hasRef = !0, (B = (A = this.timerId).ref) === null || B === void 0 || B.call(A)
    }
    unref() {
      var A, B;
      this.hasRef = !1, (B = (A = this.timerId).unref) === null || B === void 0 || B.call(A)
    }
    getEndTime() {
      return this.endTime
    }
  }
  yS0.BackoffTimeout = AD1;
  AD1.nextId = 0
})
// @from(Start 4687529, End 4690700)
BD1 = z((fS0) => {
  Object.defineProperty(fS0, "__esModule", {
    value: !0
  });
  fS0.ChildLoadBalancerHandler = void 0;
  var G86 = a_(),
    Z86 = TX(),
    D86 = "child_load_balancer_helper";
  class xS0 {
    constructor(A) {
      this.channelControlHelper = A, this.currentChild = null, this.pendingChild = null, this.latestConfig = null, this.ChildPolicyHelper = class {
        constructor(B) {
          this.parent = B, this.child = null
        }
        createSubchannel(B, Q) {
          return this.parent.channelControlHelper.createSubchannel(B, Q)
        }
        updateState(B, Q, I) {
          var G;
          if (this.calledByPendingChild()) {
            if (B === Z86.ConnectivityState.CONNECTING) return;
            (G = this.parent.currentChild) === null || G === void 0 || G.destroy(), this.parent.currentChild = this.parent.pendingChild, this.parent.pendingChild = null
          } else if (!this.calledByCurrentChild()) return;
          this.parent.channelControlHelper.updateState(B, Q, I)
        }
        requestReresolution() {
          var B;
          let Q = (B = this.parent.pendingChild) !== null && B !== void 0 ? B : this.parent.currentChild;
          if (this.child === Q) this.parent.channelControlHelper.requestReresolution()
        }
        setChild(B) {
          this.child = B
        }
        addChannelzChild(B) {
          this.parent.channelControlHelper.addChannelzChild(B)
        }
        removeChannelzChild(B) {
          this.parent.channelControlHelper.removeChannelzChild(B)
        }
        calledByPendingChild() {
          return this.child === this.parent.pendingChild
        }
        calledByCurrentChild() {
          return this.child === this.parent.currentChild
        }
      }
    }
    configUpdateRequiresNewPolicyInstance(A, B) {
      return A.getLoadBalancerName() !== B.getLoadBalancerName()
    }
    updateAddressList(A, B, Q) {
      let I;
      if (this.currentChild === null || this.latestConfig === null || this.configUpdateRequiresNewPolicyInstance(this.latestConfig, B)) {
        let G = new this.ChildPolicyHelper(this),
          Z = G86.createLoadBalancer(B, G);
        if (G.setChild(Z), this.currentChild === null) this.currentChild = Z, I = this.currentChild;
        else {
          if (this.pendingChild) this.pendingChild.destroy();
          this.pendingChild = Z, I = this.pendingChild
        }
      } else if (this.pendingChild === null) I = this.currentChild;
      else I = this.pendingChild;
      this.latestConfig = B, I.updateAddressList(A, B, Q)
    }
    exitIdle() {
      if (this.currentChild) {
        if (this.currentChild.exitIdle(), this.pendingChild) this.pendingChild.exitIdle()
      }
    }
    resetBackoff() {
      if (this.currentChild) {
        if (this.currentChild.resetBackoff(), this.pendingChild) this.pendingChild.resetBackoff()
      }
    }
    destroy() {
      if (this.currentChild) this.currentChild.destroy(), this.currentChild = null;
      if (this.pendingChild) this.pendingChild.destroy(), this.pendingChild = null
    }
    getTypeName() {
      return D86
    }
  }
  fS0.ChildLoadBalancerHandler = xS0
})
// @from(Start 4690706, End 4697494)
dS0 = z((hS0) => {
  Object.defineProperty(hS0, "__esModule", {
    value: !0
  });
  hS0.ResolvingLoadBalancer = void 0;
  var Y86 = a_(),
    W86 = Mh1(),
    pY = TX(),
    J86 = Zw(),
    ls = FR(),
    F86 = cs(),
    Lh1 = y6(),
    X86 = SZ(),
    V86 = GB(),
    C86 = y6(),
    K86 = uY(),
    H86 = BD1(),
    z86 = "resolving_load_balancer";

  function bS0(A) {
    V86.trace(C86.LogVerbosity.DEBUG, z86, A)
  }
  var w86 = ["SERVICE_AND_METHOD", "SERVICE", "EMPTY"];

  function E86(A, B, Q, I) {
    for (let G of Q.name) switch (I) {
      case "EMPTY":
        if (!G.service && !G.method) return !0;
        break;
      case "SERVICE":
        if (G.service === A && !G.method) return !0;
        break;
      case "SERVICE_AND_METHOD":
        if (G.service === A && G.method === B) return !0
    }
    return !1
  }

  function U86(A, B, Q, I) {
    for (let G of Q)
      if (E86(A, B, G, I)) return G;
    return null
  }

  function N86(A) {
    return {
      invoke(B, Q) {
        var I, G;
        let Z = B.split("/").filter((W) => W.length > 0),
          D = (I = Z[0]) !== null && I !== void 0 ? I : "",
          Y = (G = Z[1]) !== null && G !== void 0 ? G : "";
        if (A && A.methodConfig)
          for (let W of w86) {
            let J = U86(D, Y, A.methodConfig, W);
            if (J) return {
              methodConfig: J,
              pickInformation: {},
              status: Lh1.Status.OK,
              dynamicFilterFactories: []
            }
          }
        return {
          methodConfig: {
            name: []
          },
          pickInformation: {},
          status: Lh1.Status.OK,
          dynamicFilterFactories: []
        }
      },
      unref() {}
    }
  }
  class gS0 {
    constructor(A, B, Q, I, G) {
      if (this.target = A, this.channelControlHelper = B, this.channelOptions = Q, this.onSuccessfulResolution = I, this.onFailedResolution = G, this.latestChildState = pY.ConnectivityState.IDLE, this.latestChildPicker = new ls.QueuePicker(this), this.latestChildErrorMessage = null, this.currentState = pY.ConnectivityState.IDLE, this.previousServiceConfig = null, this.continueResolving = !1, Q["grpc.service_config"]) this.defaultServiceConfig = W86.validateServiceConfig(JSON.parse(Q["grpc.service_config"]));
      else this.defaultServiceConfig = {
        loadBalancingConfig: [],
        methodConfig: []
      };
      this.updateState(pY.ConnectivityState.IDLE, new ls.QueuePicker(this), null), this.childLoadBalancer = new H86.ChildLoadBalancerHandler({
        createSubchannel: B.createSubchannel.bind(B),
        requestReresolution: () => {
          if (this.backoffTimeout.isRunning()) bS0("requestReresolution delayed by backoff timer until " + this.backoffTimeout.getEndTime().toISOString()), this.continueResolving = !0;
          else this.updateResolution()
        },
        updateState: (D, Y, W) => {
          this.latestChildState = D, this.latestChildPicker = Y, this.latestChildErrorMessage = W, this.updateState(D, Y, W)
        },
        addChannelzChild: B.addChannelzChild.bind(B),
        removeChannelzChild: B.removeChannelzChild.bind(B)
      }), this.innerResolver = J86.createResolver(A, {
        onSuccessfulResolution: (D, Y, W, J, F) => {
          var X;
          this.backoffTimeout.stop(), this.backoffTimeout.reset();
          let V = null;
          if (Y === null)
            if (W === null) this.previousServiceConfig = null, V = this.defaultServiceConfig;
            else if (this.previousServiceConfig === null) this.handleResolutionFailure(W);
          else V = this.previousServiceConfig;
          else V = Y, this.previousServiceConfig = Y;
          let C = (X = V === null || V === void 0 ? void 0 : V.loadBalancingConfig) !== null && X !== void 0 ? X : [],
            K = Y86.selectLbConfigFromList(C, !0);
          if (K === null) {
            this.handleResolutionFailure({
              code: Lh1.Status.UNAVAILABLE,
              details: "All load balancer options in service config are not compatible",
              metadata: new X86.Metadata
            }), J === null || J === void 0 || J.unref();
            return
          }
          this.childLoadBalancer.updateAddressList(D, K, Object.assign(Object.assign({}, this.channelOptions), F));
          let E = V !== null && V !== void 0 ? V : this.defaultServiceConfig;
          this.onSuccessfulResolution(E, J !== null && J !== void 0 ? J : N86(E))
        },
        onError: (D) => {
          this.handleResolutionFailure(D)
        }
      }, Q);
      let Z = {
        initialDelay: Q["grpc.initial_reconnect_backoff_ms"],
        maxDelay: Q["grpc.max_reconnect_backoff_ms"]
      };
      this.backoffTimeout = new F86.BackoffTimeout(() => {
        if (this.continueResolving) this.updateResolution(), this.continueResolving = !1;
        else this.updateState(this.latestChildState, this.latestChildPicker, this.latestChildErrorMessage)
      }, Z), this.backoffTimeout.unref()
    }
    updateResolution() {
      if (this.innerResolver.updateResolution(), this.currentState === pY.ConnectivityState.IDLE) this.updateState(pY.ConnectivityState.CONNECTING, this.latestChildPicker, this.latestChildErrorMessage);
      this.backoffTimeout.runOnce()
    }
    updateState(A, B, Q) {
      if (bS0(K86.uriToString(this.target) + " " + pY.ConnectivityState[this.currentState] + " -> " + pY.ConnectivityState[A]), A === pY.ConnectivityState.IDLE) B = new ls.QueuePicker(this, B);
      this.currentState = A, this.channelControlHelper.updateState(A, B, Q)
    }
    handleResolutionFailure(A) {
      if (this.latestChildState === pY.ConnectivityState.IDLE) this.updateState(pY.ConnectivityState.TRANSIENT_FAILURE, new ls.UnavailablePicker(A), A.details), this.onFailedResolution(A)
    }
    exitIdle() {
      if (this.currentState === pY.ConnectivityState.IDLE || this.currentState === pY.ConnectivityState.TRANSIENT_FAILURE)
        if (this.backoffTimeout.isRunning()) this.continueResolving = !0;
        else this.updateResolution();
      this.childLoadBalancer.exitIdle()
    }
    updateAddressList(A, B) {
      throw new Error("updateAddressList not supported on ResolvingLoadBalancer")
    }
    resetBackoff() {
      this.backoffTimeout.reset(), this.childLoadBalancer.resetBackoff()
    }
    destroy() {
      this.childLoadBalancer.destroy(), this.innerResolver.destroy(), this.backoffTimeout.reset(), this.backoffTimeout.stop(), this.latestChildState = pY.ConnectivityState.IDLE, this.latestChildPicker = new ls.QueuePicker(this), this.currentState = pY.ConnectivityState.IDLE, this.previousServiceConfig = null, this.continueResolving = !1
    }
    getTypeName() {
      return "resolving_load_balancer"
    }
  }
  hS0.ResolvingLoadBalancer = gS0
})
// @from(Start 4697500, End 4699114)
cS0 = z((uS0) => {
  Object.defineProperty(uS0, "__esModule", {
    value: !0
  });
  uS0.recognizedOptions = void 0;
  uS0.channelOptionsEqual = $86;
  uS0.recognizedOptions = {
    "grpc.ssl_target_name_override": !0,
    "grpc.primary_user_agent": !0,
    "grpc.secondary_user_agent": !0,
    "grpc.default_authority": !0,
    "grpc.keepalive_time_ms": !0,
    "grpc.keepalive_timeout_ms": !0,
    "grpc.keepalive_permit_without_calls": !0,
    "grpc.service_config": !0,
    "grpc.max_concurrent_streams": !0,
    "grpc.initial_reconnect_backoff_ms": !0,
    "grpc.max_reconnect_backoff_ms": !0,
    "grpc.use_local_subchannel_pool": !0,
    "grpc.max_send_message_length": !0,
    "grpc.max_receive_message_length": !0,
    "grpc.enable_http_proxy": !0,
    "grpc.enable_channelz": !0,
    "grpc.dns_min_time_between_resolutions_ms": !0,
    "grpc.enable_retries": !0,
    "grpc.per_rpc_retry_buffer_size": !0,
    "grpc.retry_buffer_size": !0,
    "grpc.max_connection_age_ms": !0,
    "grpc.max_connection_age_grace_ms": !0,
    "grpc-node.max_session_memory": !0,
    "grpc.service_config_disable_resolution": !0,
    "grpc.client_idle_timeout_ms": !0,
    "grpc-node.tls_enable_trace": !0,
    "grpc.lb.ring_hash.ring_size_cap": !0,
    "grpc-node.retry_max_attempts_limit": !0,
    "grpc-node.flow_control_window": !0
  };

  function $86(A, B) {
    let Q = Object.keys(A).sort(),
      I = Object.keys(B).sort();
    if (Q.length !== I.length) return !1;
    for (let G = 0; G < Q.length; G += 1) {
      if (Q[G] !== I[G]) return !1;
      if (A[Q[G]] !== B[I[G]]) return !1
    }
    return !0
  }
})
// @from(Start 4699120, End 4702042)
PX = z((sS0) => {
  Object.defineProperty(sS0, "__esModule", {
    value: !0
  });
  sS0.EndpointMap = void 0;
  sS0.isTcpSubchannelAddress = ns;
  sS0.subchannelAddressEqual = QD1;
  sS0.subchannelAddressToString = iS0;
  sS0.stringToSubchannelAddress = L86;
  sS0.endpointEqual = R86;
  sS0.endpointToString = O86;
  sS0.endpointHasAddress = nS0;
  var lS0 = Z1("net");

  function ns(A) {
    return "port" in A
  }

  function QD1(A, B) {
    if (!A && !B) return !0;
    if (!A || !B) return !1;
    if (ns(A)) return ns(B) && A.host === B.host && A.port === B.port;
    else return !ns(B) && A.path === B.path
  }

  function iS0(A) {
    if (ns(A))
      if (lS0.isIPv6(A.host)) return "[" + A.host + "]:" + A.port;
      else return A.host + ":" + A.port;
    else return A.path
  }
  var M86 = 443;

  function L86(A, B) {
    if (lS0.isIP(A)) return {
      host: A,
      port: B !== null && B !== void 0 ? B : M86
    };
    else return {
      path: A
    }
  }

  function R86(A, B) {
    if (A.addresses.length !== B.addresses.length) return !1;
    for (let Q = 0; Q < A.addresses.length; Q++)
      if (!QD1(A.addresses[Q], B.addresses[Q])) return !1;
    return !0
  }

  function O86(A) {
    return "[" + A.addresses.map(iS0).join(", ") + "]"
  }

  function nS0(A, B) {
    for (let Q of A.addresses)
      if (QD1(Q, B)) return !0;
    return !1
  }

  function is(A, B) {
    if (A.addresses.length !== B.addresses.length) return !1;
    for (let Q of A.addresses) {
      let I = !1;
      for (let G of B.addresses)
        if (QD1(Q, G)) {
          I = !0;
          break
        } if (!I) return !1
    }
    return !0
  }
  class aS0 {
    constructor() {
      this.map = new Set
    }
    get size() {
      return this.map.size
    }
    getForSubchannelAddress(A) {
      for (let B of this.map)
        if (nS0(B.key, A)) return B.value;
      return
    }
    deleteMissing(A) {
      let B = [];
      for (let Q of this.map) {
        let I = !1;
        for (let G of A)
          if (is(G, Q.key)) I = !0;
        if (!I) B.push(Q.value), this.map.delete(Q)
      }
      return B
    }
    get(A) {
      for (let B of this.map)
        if (is(A, B.key)) return B.value;
      return
    }
    set(A, B) {
      for (let Q of this.map)
        if (is(A, Q.key)) {
          Q.value = B;
          return
        } this.map.add({
        key: A,
        value: B
      })
    }
    delete(A) {
      for (let B of this.map)
        if (is(A, B.key)) {
          this.map.delete(B);
          return
        }
    }
    has(A) {
      for (let B of this.map)
        if (is(A, B.key)) return !0;
      return !1
    }
    clear() {
      this.map.clear()
    }* keys() {
      for (let A of this.map) yield A.key
    }* values() {
      for (let A of this.map) yield A.value
    }* entries() {
      for (let A of this.map) yield [A.key, A.value]
    }
  }
  sS0.EndpointMap = aS0
})