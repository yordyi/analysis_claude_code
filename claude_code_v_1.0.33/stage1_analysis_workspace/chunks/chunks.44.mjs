
// @from(Start 4312478, End 4610173)
fZ1 = z((hO0, mO0) => {
  Object.defineProperty(hO0, "__esModule", {
    value: !0
  });
  var b9 = mg1(),
    LA = b9.Reader,
    p4 = b9.Writer,
    J1 = b9.util,
    G1 = b9.roots.default || (b9.roots.default = {});
  G1.opentelemetry = function() {
    var A = {};
    return A.proto = function() {
      var B = {};
      return B.common = function() {
        var Q = {};
        return Q.v1 = function() {
          var I = {};
          return I.AnyValue = function() {
            function G(D) {
              if (D) {
                for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                  if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
              }
            }
            G.prototype.stringValue = null, G.prototype.boolValue = null, G.prototype.intValue = null, G.prototype.doubleValue = null, G.prototype.arrayValue = null, G.prototype.kvlistValue = null, G.prototype.bytesValue = null;
            var Z;
            return Object.defineProperty(G.prototype, "value", {
              get: J1.oneOfGetter(Z = ["stringValue", "boolValue", "intValue", "doubleValue", "arrayValue", "kvlistValue", "bytesValue"]),
              set: J1.oneOfSetter(Z)
            }), G.create = function D(Y) {
              return new G(Y)
            }, G.encode = function D(Y, W) {
              if (!W) W = p4.create();
              if (Y.stringValue != null && Object.hasOwnProperty.call(Y, "stringValue")) W.uint32(10).string(Y.stringValue);
              if (Y.boolValue != null && Object.hasOwnProperty.call(Y, "boolValue")) W.uint32(16).bool(Y.boolValue);
              if (Y.intValue != null && Object.hasOwnProperty.call(Y, "intValue")) W.uint32(24).int64(Y.intValue);
              if (Y.doubleValue != null && Object.hasOwnProperty.call(Y, "doubleValue")) W.uint32(33).double(Y.doubleValue);
              if (Y.arrayValue != null && Object.hasOwnProperty.call(Y, "arrayValue")) G1.opentelemetry.proto.common.v1.ArrayValue.encode(Y.arrayValue, W.uint32(42).fork()).ldelim();
              if (Y.kvlistValue != null && Object.hasOwnProperty.call(Y, "kvlistValue")) G1.opentelemetry.proto.common.v1.KeyValueList.encode(Y.kvlistValue, W.uint32(50).fork()).ldelim();
              if (Y.bytesValue != null && Object.hasOwnProperty.call(Y, "bytesValue")) W.uint32(58).bytes(Y.bytesValue);
              return W
            }, G.encodeDelimited = function D(Y, W) {
              return this.encode(Y, W).ldelim()
            }, G.decode = function D(Y, W) {
              if (!(Y instanceof LA)) Y = LA.create(Y);
              var J = W === void 0 ? Y.len : Y.pos + W,
                F = new G1.opentelemetry.proto.common.v1.AnyValue;
              while (Y.pos < J) {
                var X = Y.uint32();
                switch (X >>> 3) {
                  case 1: {
                    F.stringValue = Y.string();
                    break
                  }
                  case 2: {
                    F.boolValue = Y.bool();
                    break
                  }
                  case 3: {
                    F.intValue = Y.int64();
                    break
                  }
                  case 4: {
                    F.doubleValue = Y.double();
                    break
                  }
                  case 5: {
                    F.arrayValue = G1.opentelemetry.proto.common.v1.ArrayValue.decode(Y, Y.uint32());
                    break
                  }
                  case 6: {
                    F.kvlistValue = G1.opentelemetry.proto.common.v1.KeyValueList.decode(Y, Y.uint32());
                    break
                  }
                  case 7: {
                    F.bytesValue = Y.bytes();
                    break
                  }
                  default:
                    Y.skipType(X & 7);
                    break
                }
              }
              return F
            }, G.decodeDelimited = function D(Y) {
              if (!(Y instanceof LA)) Y = new LA(Y);
              return this.decode(Y, Y.uint32())
            }, G.verify = function D(Y) {
              if (typeof Y !== "object" || Y === null) return "object expected";
              var W = {};
              if (Y.stringValue != null && Y.hasOwnProperty("stringValue")) {
                if (W.value = 1, !J1.isString(Y.stringValue)) return "stringValue: string expected"
              }
              if (Y.boolValue != null && Y.hasOwnProperty("boolValue")) {
                if (W.value === 1) return "value: multiple values";
                if (W.value = 1, typeof Y.boolValue !== "boolean") return "boolValue: boolean expected"
              }
              if (Y.intValue != null && Y.hasOwnProperty("intValue")) {
                if (W.value === 1) return "value: multiple values";
                if (W.value = 1, !J1.isInteger(Y.intValue) && !(Y.intValue && J1.isInteger(Y.intValue.low) && J1.isInteger(Y.intValue.high))) return "intValue: integer|Long expected"
              }
              if (Y.doubleValue != null && Y.hasOwnProperty("doubleValue")) {
                if (W.value === 1) return "value: multiple values";
                if (W.value = 1, typeof Y.doubleValue !== "number") return "doubleValue: number expected"
              }
              if (Y.arrayValue != null && Y.hasOwnProperty("arrayValue")) {
                if (W.value === 1) return "value: multiple values";
                W.value = 1;
                {
                  var J = G1.opentelemetry.proto.common.v1.ArrayValue.verify(Y.arrayValue);
                  if (J) return "arrayValue." + J
                }
              }
              if (Y.kvlistValue != null && Y.hasOwnProperty("kvlistValue")) {
                if (W.value === 1) return "value: multiple values";
                W.value = 1;
                {
                  var J = G1.opentelemetry.proto.common.v1.KeyValueList.verify(Y.kvlistValue);
                  if (J) return "kvlistValue." + J
                }
              }
              if (Y.bytesValue != null && Y.hasOwnProperty("bytesValue")) {
                if (W.value === 1) return "value: multiple values";
                if (W.value = 1, !(Y.bytesValue && typeof Y.bytesValue.length === "number" || J1.isString(Y.bytesValue))) return "bytesValue: buffer expected"
              }
              return null
            }, G.fromObject = function D(Y) {
              if (Y instanceof G1.opentelemetry.proto.common.v1.AnyValue) return Y;
              var W = new G1.opentelemetry.proto.common.v1.AnyValue;
              if (Y.stringValue != null) W.stringValue = String(Y.stringValue);
              if (Y.boolValue != null) W.boolValue = Boolean(Y.boolValue);
              if (Y.intValue != null) {
                if (J1.Long)(W.intValue = J1.Long.fromValue(Y.intValue)).unsigned = !1;
                else if (typeof Y.intValue === "string") W.intValue = parseInt(Y.intValue, 10);
                else if (typeof Y.intValue === "number") W.intValue = Y.intValue;
                else if (typeof Y.intValue === "object") W.intValue = new J1.LongBits(Y.intValue.low >>> 0, Y.intValue.high >>> 0).toNumber()
              }
              if (Y.doubleValue != null) W.doubleValue = Number(Y.doubleValue);
              if (Y.arrayValue != null) {
                if (typeof Y.arrayValue !== "object") throw TypeError(".opentelemetry.proto.common.v1.AnyValue.arrayValue: object expected");
                W.arrayValue = G1.opentelemetry.proto.common.v1.ArrayValue.fromObject(Y.arrayValue)
              }
              if (Y.kvlistValue != null) {
                if (typeof Y.kvlistValue !== "object") throw TypeError(".opentelemetry.proto.common.v1.AnyValue.kvlistValue: object expected");
                W.kvlistValue = G1.opentelemetry.proto.common.v1.KeyValueList.fromObject(Y.kvlistValue)
              }
              if (Y.bytesValue != null) {
                if (typeof Y.bytesValue === "string") J1.base64.decode(Y.bytesValue, W.bytesValue = J1.newBuffer(J1.base64.length(Y.bytesValue)), 0);
                else if (Y.bytesValue.length >= 0) W.bytesValue = Y.bytesValue
              }
              return W
            }, G.toObject = function D(Y, W) {
              if (!W) W = {};
              var J = {};
              if (Y.stringValue != null && Y.hasOwnProperty("stringValue")) {
                if (J.stringValue = Y.stringValue, W.oneofs) J.value = "stringValue"
              }
              if (Y.boolValue != null && Y.hasOwnProperty("boolValue")) {
                if (J.boolValue = Y.boolValue, W.oneofs) J.value = "boolValue"
              }
              if (Y.intValue != null && Y.hasOwnProperty("intValue")) {
                if (typeof Y.intValue === "number") J.intValue = W.longs === String ? String(Y.intValue) : Y.intValue;
                else J.intValue = W.longs === String ? J1.Long.prototype.toString.call(Y.intValue) : W.longs === Number ? new J1.LongBits(Y.intValue.low >>> 0, Y.intValue.high >>> 0).toNumber() : Y.intValue;
                if (W.oneofs) J.value = "intValue"
              }
              if (Y.doubleValue != null && Y.hasOwnProperty("doubleValue")) {
                if (J.doubleValue = W.json && !isFinite(Y.doubleValue) ? String(Y.doubleValue) : Y.doubleValue, W.oneofs) J.value = "doubleValue"
              }
              if (Y.arrayValue != null && Y.hasOwnProperty("arrayValue")) {
                if (J.arrayValue = G1.opentelemetry.proto.common.v1.ArrayValue.toObject(Y.arrayValue, W), W.oneofs) J.value = "arrayValue"
              }
              if (Y.kvlistValue != null && Y.hasOwnProperty("kvlistValue")) {
                if (J.kvlistValue = G1.opentelemetry.proto.common.v1.KeyValueList.toObject(Y.kvlistValue, W), W.oneofs) J.value = "kvlistValue"
              }
              if (Y.bytesValue != null && Y.hasOwnProperty("bytesValue")) {
                if (J.bytesValue = W.bytes === String ? J1.base64.encode(Y.bytesValue, 0, Y.bytesValue.length) : W.bytes === Array ? Array.prototype.slice.call(Y.bytesValue) : Y.bytesValue, W.oneofs) J.value = "bytesValue"
              }
              return J
            }, G.prototype.toJSON = function D() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function D(Y) {
              if (Y === void 0) Y = "type.googleapis.com";
              return Y + "/opentelemetry.proto.common.v1.AnyValue"
            }, G
          }(), I.ArrayValue = function() {
            function G(Z) {
              if (this.values = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.values = J1.emptyArray, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.values != null && D.values.length)
                for (var W = 0; W < D.values.length; ++W) G1.opentelemetry.proto.common.v1.AnyValue.encode(D.values[W], Y.uint32(10).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.common.v1.ArrayValue;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.values && J.values.length)) J.values = [];
                    J.values.push(G1.opentelemetry.proto.common.v1.AnyValue.decode(D, D.uint32()));
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.values != null && D.hasOwnProperty("values")) {
                if (!Array.isArray(D.values)) return "values: array expected";
                for (var Y = 0; Y < D.values.length; ++Y) {
                  var W = G1.opentelemetry.proto.common.v1.AnyValue.verify(D.values[Y]);
                  if (W) return "values." + W
                }
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.common.v1.ArrayValue) return D;
              var Y = new G1.opentelemetry.proto.common.v1.ArrayValue;
              if (D.values) {
                if (!Array.isArray(D.values)) throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: array expected");
                Y.values = [];
                for (var W = 0; W < D.values.length; ++W) {
                  if (typeof D.values[W] !== "object") throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: object expected");
                  Y.values[W] = G1.opentelemetry.proto.common.v1.AnyValue.fromObject(D.values[W])
                }
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.values = [];
              if (D.values && D.values.length) {
                W.values = [];
                for (var J = 0; J < D.values.length; ++J) W.values[J] = G1.opentelemetry.proto.common.v1.AnyValue.toObject(D.values[J], Y)
              }
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.common.v1.ArrayValue"
            }, G
          }(), I.KeyValueList = function() {
            function G(Z) {
              if (this.values = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.values = J1.emptyArray, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.values != null && D.values.length)
                for (var W = 0; W < D.values.length; ++W) G1.opentelemetry.proto.common.v1.KeyValue.encode(D.values[W], Y.uint32(10).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.common.v1.KeyValueList;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.values && J.values.length)) J.values = [];
                    J.values.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(D, D.uint32()));
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.values != null && D.hasOwnProperty("values")) {
                if (!Array.isArray(D.values)) return "values: array expected";
                for (var Y = 0; Y < D.values.length; ++Y) {
                  var W = G1.opentelemetry.proto.common.v1.KeyValue.verify(D.values[Y]);
                  if (W) return "values." + W
                }
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.common.v1.KeyValueList) return D;
              var Y = new G1.opentelemetry.proto.common.v1.KeyValueList;
              if (D.values) {
                if (!Array.isArray(D.values)) throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: array expected");
                Y.values = [];
                for (var W = 0; W < D.values.length; ++W) {
                  if (typeof D.values[W] !== "object") throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: object expected");
                  Y.values[W] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(D.values[W])
                }
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.values = [];
              if (D.values && D.values.length) {
                W.values = [];
                for (var J = 0; J < D.values.length; ++J) W.values[J] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(D.values[J], Y)
              }
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.common.v1.KeyValueList"
            }, G
          }(), I.KeyValue = function() {
            function G(Z) {
              if (Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.key = null, G.prototype.value = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.key != null && Object.hasOwnProperty.call(D, "key")) Y.uint32(10).string(D.key);
              if (D.value != null && Object.hasOwnProperty.call(D, "value")) G1.opentelemetry.proto.common.v1.AnyValue.encode(D.value, Y.uint32(18).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.common.v1.KeyValue;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.key = D.string();
                    break
                  }
                  case 2: {
                    J.value = G1.opentelemetry.proto.common.v1.AnyValue.decode(D, D.uint32());
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.key != null && D.hasOwnProperty("key")) {
                if (!J1.isString(D.key)) return "key: string expected"
              }
              if (D.value != null && D.hasOwnProperty("value")) {
                var Y = G1.opentelemetry.proto.common.v1.AnyValue.verify(D.value);
                if (Y) return "value." + Y
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.common.v1.KeyValue) return D;
              var Y = new G1.opentelemetry.proto.common.v1.KeyValue;
              if (D.key != null) Y.key = String(D.key);
              if (D.value != null) {
                if (typeof D.value !== "object") throw TypeError(".opentelemetry.proto.common.v1.KeyValue.value: object expected");
                Y.value = G1.opentelemetry.proto.common.v1.AnyValue.fromObject(D.value)
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.defaults) W.key = "", W.value = null;
              if (D.key != null && D.hasOwnProperty("key")) W.key = D.key;
              if (D.value != null && D.hasOwnProperty("value")) W.value = G1.opentelemetry.proto.common.v1.AnyValue.toObject(D.value, Y);
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.common.v1.KeyValue"
            }, G
          }(), I.InstrumentationScope = function() {
            function G(Z) {
              if (this.attributes = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.name = null, G.prototype.version = null, G.prototype.attributes = J1.emptyArray, G.prototype.droppedAttributesCount = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.name != null && Object.hasOwnProperty.call(D, "name")) Y.uint32(10).string(D.name);
              if (D.version != null && Object.hasOwnProperty.call(D, "version")) Y.uint32(18).string(D.version);
              if (D.attributes != null && D.attributes.length)
                for (var W = 0; W < D.attributes.length; ++W) G1.opentelemetry.proto.common.v1.KeyValue.encode(D.attributes[W], Y.uint32(26).fork()).ldelim();
              if (D.droppedAttributesCount != null && Object.hasOwnProperty.call(D, "droppedAttributesCount")) Y.uint32(32).uint32(D.droppedAttributesCount);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.common.v1.InstrumentationScope;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.name = D.string();
                    break
                  }
                  case 2: {
                    J.version = D.string();
                    break
                  }
                  case 3: {
                    if (!(J.attributes && J.attributes.length)) J.attributes = [];
                    J.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(D, D.uint32()));
                    break
                  }
                  case 4: {
                    J.droppedAttributesCount = D.uint32();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.name != null && D.hasOwnProperty("name")) {
                if (!J1.isString(D.name)) return "name: string expected"
              }
              if (D.version != null && D.hasOwnProperty("version")) {
                if (!J1.isString(D.version)) return "version: string expected"
              }
              if (D.attributes != null && D.hasOwnProperty("attributes")) {
                if (!Array.isArray(D.attributes)) return "attributes: array expected";
                for (var Y = 0; Y < D.attributes.length; ++Y) {
                  var W = G1.opentelemetry.proto.common.v1.KeyValue.verify(D.attributes[Y]);
                  if (W) return "attributes." + W
                }
              }
              if (D.droppedAttributesCount != null && D.hasOwnProperty("droppedAttributesCount")) {
                if (!J1.isInteger(D.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.common.v1.InstrumentationScope) return D;
              var Y = new G1.opentelemetry.proto.common.v1.InstrumentationScope;
              if (D.name != null) Y.name = String(D.name);
              if (D.version != null) Y.version = String(D.version);
              if (D.attributes) {
                if (!Array.isArray(D.attributes)) throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: array expected");
                Y.attributes = [];
                for (var W = 0; W < D.attributes.length; ++W) {
                  if (typeof D.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: object expected");
                  Y.attributes[W] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(D.attributes[W])
                }
              }
              if (D.droppedAttributesCount != null) Y.droppedAttributesCount = D.droppedAttributesCount >>> 0;
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.attributes = [];
              if (Y.defaults) W.name = "", W.version = "", W.droppedAttributesCount = 0;
              if (D.name != null && D.hasOwnProperty("name")) W.name = D.name;
              if (D.version != null && D.hasOwnProperty("version")) W.version = D.version;
              if (D.attributes && D.attributes.length) {
                W.attributes = [];
                for (var J = 0; J < D.attributes.length; ++J) W.attributes[J] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(D.attributes[J], Y)
              }
              if (D.droppedAttributesCount != null && D.hasOwnProperty("droppedAttributesCount")) W.droppedAttributesCount = D.droppedAttributesCount;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.common.v1.InstrumentationScope"
            }, G
          }(), I
        }(), Q
      }(), B.resource = function() {
        var Q = {};
        return Q.v1 = function() {
          var I = {};
          return I.Resource = function() {
            function G(Z) {
              if (this.attributes = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.attributes = J1.emptyArray, G.prototype.droppedAttributesCount = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.attributes != null && D.attributes.length)
                for (var W = 0; W < D.attributes.length; ++W) G1.opentelemetry.proto.common.v1.KeyValue.encode(D.attributes[W], Y.uint32(10).fork()).ldelim();
              if (D.droppedAttributesCount != null && Object.hasOwnProperty.call(D, "droppedAttributesCount")) Y.uint32(16).uint32(D.droppedAttributesCount);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.resource.v1.Resource;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.attributes && J.attributes.length)) J.attributes = [];
                    J.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(D, D.uint32()));
                    break
                  }
                  case 2: {
                    J.droppedAttributesCount = D.uint32();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.attributes != null && D.hasOwnProperty("attributes")) {
                if (!Array.isArray(D.attributes)) return "attributes: array expected";
                for (var Y = 0; Y < D.attributes.length; ++Y) {
                  var W = G1.opentelemetry.proto.common.v1.KeyValue.verify(D.attributes[Y]);
                  if (W) return "attributes." + W
                }
              }
              if (D.droppedAttributesCount != null && D.hasOwnProperty("droppedAttributesCount")) {
                if (!J1.isInteger(D.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.resource.v1.Resource) return D;
              var Y = new G1.opentelemetry.proto.resource.v1.Resource;
              if (D.attributes) {
                if (!Array.isArray(D.attributes)) throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: array expected");
                Y.attributes = [];
                for (var W = 0; W < D.attributes.length; ++W) {
                  if (typeof D.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: object expected");
                  Y.attributes[W] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(D.attributes[W])
                }
              }
              if (D.droppedAttributesCount != null) Y.droppedAttributesCount = D.droppedAttributesCount >>> 0;
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.attributes = [];
              if (Y.defaults) W.droppedAttributesCount = 0;
              if (D.attributes && D.attributes.length) {
                W.attributes = [];
                for (var J = 0; J < D.attributes.length; ++J) W.attributes[J] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(D.attributes[J], Y)
              }
              if (D.droppedAttributesCount != null && D.hasOwnProperty("droppedAttributesCount")) W.droppedAttributesCount = D.droppedAttributesCount;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.resource.v1.Resource"
            }, G
          }(), I
        }(), Q
      }(), B.trace = function() {
        var Q = {};
        return Q.v1 = function() {
          var I = {};
          return I.TracesData = function() {
            function G(Z) {
              if (this.resourceSpans = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.resourceSpans = J1.emptyArray, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.resourceSpans != null && D.resourceSpans.length)
                for (var W = 0; W < D.resourceSpans.length; ++W) G1.opentelemetry.proto.trace.v1.ResourceSpans.encode(D.resourceSpans[W], Y.uint32(10).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.trace.v1.TracesData;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.resourceSpans && J.resourceSpans.length)) J.resourceSpans = [];
                    J.resourceSpans.push(G1.opentelemetry.proto.trace.v1.ResourceSpans.decode(D, D.uint32()));
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.resourceSpans != null && D.hasOwnProperty("resourceSpans")) {
                if (!Array.isArray(D.resourceSpans)) return "resourceSpans: array expected";
                for (var Y = 0; Y < D.resourceSpans.length; ++Y) {
                  var W = G1.opentelemetry.proto.trace.v1.ResourceSpans.verify(D.resourceSpans[Y]);
                  if (W) return "resourceSpans." + W
                }
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.trace.v1.TracesData) return D;
              var Y = new G1.opentelemetry.proto.trace.v1.TracesData;
              if (D.resourceSpans) {
                if (!Array.isArray(D.resourceSpans)) throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: array expected");
                Y.resourceSpans = [];
                for (var W = 0; W < D.resourceSpans.length; ++W) {
                  if (typeof D.resourceSpans[W] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: object expected");
                  Y.resourceSpans[W] = G1.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(D.resourceSpans[W])
                }
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.resourceSpans = [];
              if (D.resourceSpans && D.resourceSpans.length) {
                W.resourceSpans = [];
                for (var J = 0; J < D.resourceSpans.length; ++J) W.resourceSpans[J] = G1.opentelemetry.proto.trace.v1.ResourceSpans.toObject(D.resourceSpans[J], Y)
              }
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.trace.v1.TracesData"
            }, G
          }(), I.ResourceSpans = function() {
            function G(Z) {
              if (this.scopeSpans = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.resource = null, G.prototype.scopeSpans = J1.emptyArray, G.prototype.schemaUrl = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.resource != null && Object.hasOwnProperty.call(D, "resource")) G1.opentelemetry.proto.resource.v1.Resource.encode(D.resource, Y.uint32(10).fork()).ldelim();
              if (D.scopeSpans != null && D.scopeSpans.length)
                for (var W = 0; W < D.scopeSpans.length; ++W) G1.opentelemetry.proto.trace.v1.ScopeSpans.encode(D.scopeSpans[W], Y.uint32(18).fork()).ldelim();
              if (D.schemaUrl != null && Object.hasOwnProperty.call(D, "schemaUrl")) Y.uint32(26).string(D.schemaUrl);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.trace.v1.ResourceSpans;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.resource = G1.opentelemetry.proto.resource.v1.Resource.decode(D, D.uint32());
                    break
                  }
                  case 2: {
                    if (!(J.scopeSpans && J.scopeSpans.length)) J.scopeSpans = [];
                    J.scopeSpans.push(G1.opentelemetry.proto.trace.v1.ScopeSpans.decode(D, D.uint32()));
                    break
                  }
                  case 3: {
                    J.schemaUrl = D.string();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.resource != null && D.hasOwnProperty("resource")) {
                var Y = G1.opentelemetry.proto.resource.v1.Resource.verify(D.resource);
                if (Y) return "resource." + Y
              }
              if (D.scopeSpans != null && D.hasOwnProperty("scopeSpans")) {
                if (!Array.isArray(D.scopeSpans)) return "scopeSpans: array expected";
                for (var W = 0; W < D.scopeSpans.length; ++W) {
                  var Y = G1.opentelemetry.proto.trace.v1.ScopeSpans.verify(D.scopeSpans[W]);
                  if (Y) return "scopeSpans." + Y
                }
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) {
                if (!J1.isString(D.schemaUrl)) return "schemaUrl: string expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.trace.v1.ResourceSpans) return D;
              var Y = new G1.opentelemetry.proto.trace.v1.ResourceSpans;
              if (D.resource != null) {
                if (typeof D.resource !== "object") throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.resource: object expected");
                Y.resource = G1.opentelemetry.proto.resource.v1.Resource.fromObject(D.resource)
              }
              if (D.scopeSpans) {
                if (!Array.isArray(D.scopeSpans)) throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: array expected");
                Y.scopeSpans = [];
                for (var W = 0; W < D.scopeSpans.length; ++W) {
                  if (typeof D.scopeSpans[W] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: object expected");
                  Y.scopeSpans[W] = G1.opentelemetry.proto.trace.v1.ScopeSpans.fromObject(D.scopeSpans[W])
                }
              }
              if (D.schemaUrl != null) Y.schemaUrl = String(D.schemaUrl);
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.scopeSpans = [];
              if (Y.defaults) W.resource = null, W.schemaUrl = "";
              if (D.resource != null && D.hasOwnProperty("resource")) W.resource = G1.opentelemetry.proto.resource.v1.Resource.toObject(D.resource, Y);
              if (D.scopeSpans && D.scopeSpans.length) {
                W.scopeSpans = [];
                for (var J = 0; J < D.scopeSpans.length; ++J) W.scopeSpans[J] = G1.opentelemetry.proto.trace.v1.ScopeSpans.toObject(D.scopeSpans[J], Y)
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) W.schemaUrl = D.schemaUrl;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.trace.v1.ResourceSpans"
            }, G
          }(), I.ScopeSpans = function() {
            function G(Z) {
              if (this.spans = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.scope = null, G.prototype.spans = J1.emptyArray, G.prototype.schemaUrl = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.scope != null && Object.hasOwnProperty.call(D, "scope")) G1.opentelemetry.proto.common.v1.InstrumentationScope.encode(D.scope, Y.uint32(10).fork()).ldelim();
              if (D.spans != null && D.spans.length)
                for (var W = 0; W < D.spans.length; ++W) G1.opentelemetry.proto.trace.v1.Span.encode(D.spans[W], Y.uint32(18).fork()).ldelim();
              if (D.schemaUrl != null && Object.hasOwnProperty.call(D, "schemaUrl")) Y.uint32(26).string(D.schemaUrl);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.trace.v1.ScopeSpans;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.decode(D, D.uint32());
                    break
                  }
                  case 2: {
                    if (!(J.spans && J.spans.length)) J.spans = [];
                    J.spans.push(G1.opentelemetry.proto.trace.v1.Span.decode(D, D.uint32()));
                    break
                  }
                  case 3: {
                    J.schemaUrl = D.string();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.scope != null && D.hasOwnProperty("scope")) {
                var Y = G1.opentelemetry.proto.common.v1.InstrumentationScope.verify(D.scope);
                if (Y) return "scope." + Y
              }
              if (D.spans != null && D.hasOwnProperty("spans")) {
                if (!Array.isArray(D.spans)) return "spans: array expected";
                for (var W = 0; W < D.spans.length; ++W) {
                  var Y = G1.opentelemetry.proto.trace.v1.Span.verify(D.spans[W]);
                  if (Y) return "spans." + Y
                }
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) {
                if (!J1.isString(D.schemaUrl)) return "schemaUrl: string expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.trace.v1.ScopeSpans) return D;
              var Y = new G1.opentelemetry.proto.trace.v1.ScopeSpans;
              if (D.scope != null) {
                if (typeof D.scope !== "object") throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.scope: object expected");
                Y.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(D.scope)
              }
              if (D.spans) {
                if (!Array.isArray(D.spans)) throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: array expected");
                Y.spans = [];
                for (var W = 0; W < D.spans.length; ++W) {
                  if (typeof D.spans[W] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: object expected");
                  Y.spans[W] = G1.opentelemetry.proto.trace.v1.Span.fromObject(D.spans[W])
                }
              }
              if (D.schemaUrl != null) Y.schemaUrl = String(D.schemaUrl);
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.spans = [];
              if (Y.defaults) W.scope = null, W.schemaUrl = "";
              if (D.scope != null && D.hasOwnProperty("scope")) W.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.toObject(D.scope, Y);
              if (D.spans && D.spans.length) {
                W.spans = [];
                for (var J = 0; J < D.spans.length; ++J) W.spans[J] = G1.opentelemetry.proto.trace.v1.Span.toObject(D.spans[J], Y)
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) W.schemaUrl = D.schemaUrl;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.trace.v1.ScopeSpans"
            }, G
          }(), I.Span = function() {
            function G(Z) {
              if (this.attributes = [], this.events = [], this.links = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.traceId = null, G.prototype.spanId = null, G.prototype.traceState = null, G.prototype.parentSpanId = null, G.prototype.name = null, G.prototype.kind = null, G.prototype.startTimeUnixNano = null, G.prototype.endTimeUnixNano = null, G.prototype.attributes = J1.emptyArray, G.prototype.droppedAttributesCount = null, G.prototype.events = J1.emptyArray, G.prototype.droppedEventsCount = null, G.prototype.links = J1.emptyArray, G.prototype.droppedLinksCount = null, G.prototype.status = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.traceId != null && Object.hasOwnProperty.call(D, "traceId")) Y.uint32(10).bytes(D.traceId);
              if (D.spanId != null && Object.hasOwnProperty.call(D, "spanId")) Y.uint32(18).bytes(D.spanId);
              if (D.traceState != null && Object.hasOwnProperty.call(D, "traceState")) Y.uint32(26).string(D.traceState);
              if (D.parentSpanId != null && Object.hasOwnProperty.call(D, "parentSpanId")) Y.uint32(34).bytes(D.parentSpanId);
              if (D.name != null && Object.hasOwnProperty.call(D, "name")) Y.uint32(42).string(D.name);
              if (D.kind != null && Object.hasOwnProperty.call(D, "kind")) Y.uint32(48).int32(D.kind);
              if (D.startTimeUnixNano != null && Object.hasOwnProperty.call(D, "startTimeUnixNano")) Y.uint32(57).fixed64(D.startTimeUnixNano);
              if (D.endTimeUnixNano != null && Object.hasOwnProperty.call(D, "endTimeUnixNano")) Y.uint32(65).fixed64(D.endTimeUnixNano);
              if (D.attributes != null && D.attributes.length)
                for (var W = 0; W < D.attributes.length; ++W) G1.opentelemetry.proto.common.v1.KeyValue.encode(D.attributes[W], Y.uint32(74).fork()).ldelim();
              if (D.droppedAttributesCount != null && Object.hasOwnProperty.call(D, "droppedAttributesCount")) Y.uint32(80).uint32(D.droppedAttributesCount);
              if (D.events != null && D.events.length)
                for (var W = 0; W < D.events.length; ++W) G1.opentelemetry.proto.trace.v1.Span.Event.encode(D.events[W], Y.uint32(90).fork()).ldelim();
              if (D.droppedEventsCount != null && Object.hasOwnProperty.call(D, "droppedEventsCount")) Y.uint32(96).uint32(D.droppedEventsCount);
              if (D.links != null && D.links.length)
                for (var W = 0; W < D.links.length; ++W) G1.opentelemetry.proto.trace.v1.Span.Link.encode(D.links[W], Y.uint32(106).fork()).ldelim();
              if (D.droppedLinksCount != null && Object.hasOwnProperty.call(D, "droppedLinksCount")) Y.uint32(112).uint32(D.droppedLinksCount);
              if (D.status != null && Object.hasOwnProperty.call(D, "status")) G1.opentelemetry.proto.trace.v1.Status.encode(D.status, Y.uint32(122).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.trace.v1.Span;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.traceId = D.bytes();
                    break
                  }
                  case 2: {
                    J.spanId = D.bytes();
                    break
                  }
                  case 3: {
                    J.traceState = D.string();
                    break
                  }
                  case 4: {
                    J.parentSpanId = D.bytes();
                    break
                  }
                  case 5: {
                    J.name = D.string();
                    break
                  }
                  case 6: {
                    J.kind = D.int32();
                    break
                  }
                  case 7: {
                    J.startTimeUnixNano = D.fixed64();
                    break
                  }
                  case 8: {
                    J.endTimeUnixNano = D.fixed64();
                    break
                  }
                  case 9: {
                    if (!(J.attributes && J.attributes.length)) J.attributes = [];
                    J.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(D, D.uint32()));
                    break
                  }
                  case 10: {
                    J.droppedAttributesCount = D.uint32();
                    break
                  }
                  case 11: {
                    if (!(J.events && J.events.length)) J.events = [];
                    J.events.push(G1.opentelemetry.proto.trace.v1.Span.Event.decode(D, D.uint32()));
                    break
                  }
                  case 12: {
                    J.droppedEventsCount = D.uint32();
                    break
                  }
                  case 13: {
                    if (!(J.links && J.links.length)) J.links = [];
                    J.links.push(G1.opentelemetry.proto.trace.v1.Span.Link.decode(D, D.uint32()));
                    break
                  }
                  case 14: {
                    J.droppedLinksCount = D.uint32();
                    break
                  }
                  case 15: {
                    J.status = G1.opentelemetry.proto.trace.v1.Status.decode(D, D.uint32());
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.traceId != null && D.hasOwnProperty("traceId")) {
                if (!(D.traceId && typeof D.traceId.length === "number" || J1.isString(D.traceId))) return "traceId: buffer expected"
              }
              if (D.spanId != null && D.hasOwnProperty("spanId")) {
                if (!(D.spanId && typeof D.spanId.length === "number" || J1.isString(D.spanId))) return "spanId: buffer expected"
              }
              if (D.traceState != null && D.hasOwnProperty("traceState")) {
                if (!J1.isString(D.traceState)) return "traceState: string expected"
              }
              if (D.parentSpanId != null && D.hasOwnProperty("parentSpanId")) {
                if (!(D.parentSpanId && typeof D.parentSpanId.length === "number" || J1.isString(D.parentSpanId))) return "parentSpanId: buffer expected"
              }
              if (D.name != null && D.hasOwnProperty("name")) {
                if (!J1.isString(D.name)) return "name: string expected"
              }
              if (D.kind != null && D.hasOwnProperty("kind")) switch (D.kind) {
                default:
                  return "kind: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                  break
              }
              if (D.startTimeUnixNano != null && D.hasOwnProperty("startTimeUnixNano")) {
                if (!J1.isInteger(D.startTimeUnixNano) && !(D.startTimeUnixNano && J1.isInteger(D.startTimeUnixNano.low) && J1.isInteger(D.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
              }
              if (D.endTimeUnixNano != null && D.hasOwnProperty("endTimeUnixNano")) {
                if (!J1.isInteger(D.endTimeUnixNano) && !(D.endTimeUnixNano && J1.isInteger(D.endTimeUnixNano.low) && J1.isInteger(D.endTimeUnixNano.high))) return "endTimeUnixNano: integer|Long expected"
              }
              if (D.attributes != null && D.hasOwnProperty("attributes")) {
                if (!Array.isArray(D.attributes)) return "attributes: array expected";
                for (var Y = 0; Y < D.attributes.length; ++Y) {
                  var W = G1.opentelemetry.proto.common.v1.KeyValue.verify(D.attributes[Y]);
                  if (W) return "attributes." + W
                }
              }
              if (D.droppedAttributesCount != null && D.hasOwnProperty("droppedAttributesCount")) {
                if (!J1.isInteger(D.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
              }
              if (D.events != null && D.hasOwnProperty("events")) {
                if (!Array.isArray(D.events)) return "events: array expected";
                for (var Y = 0; Y < D.events.length; ++Y) {
                  var W = G1.opentelemetry.proto.trace.v1.Span.Event.verify(D.events[Y]);
                  if (W) return "events." + W
                }
              }
              if (D.droppedEventsCount != null && D.hasOwnProperty("droppedEventsCount")) {
                if (!J1.isInteger(D.droppedEventsCount)) return "droppedEventsCount: integer expected"
              }
              if (D.links != null && D.hasOwnProperty("links")) {
                if (!Array.isArray(D.links)) return "links: array expected";
                for (var Y = 0; Y < D.links.length; ++Y) {
                  var W = G1.opentelemetry.proto.trace.v1.Span.Link.verify(D.links[Y]);
                  if (W) return "links." + W
                }
              }
              if (D.droppedLinksCount != null && D.hasOwnProperty("droppedLinksCount")) {
                if (!J1.isInteger(D.droppedLinksCount)) return "droppedLinksCount: integer expected"
              }
              if (D.status != null && D.hasOwnProperty("status")) {
                var W = G1.opentelemetry.proto.trace.v1.Status.verify(D.status);
                if (W) return "status." + W
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.trace.v1.Span) return D;
              var Y = new G1.opentelemetry.proto.trace.v1.Span;
              if (D.traceId != null) {
                if (typeof D.traceId === "string") J1.base64.decode(D.traceId, Y.traceId = J1.newBuffer(J1.base64.length(D.traceId)), 0);
                else if (D.traceId.length >= 0) Y.traceId = D.traceId
              }
              if (D.spanId != null) {
                if (typeof D.spanId === "string") J1.base64.decode(D.spanId, Y.spanId = J1.newBuffer(J1.base64.length(D.spanId)), 0);
                else if (D.spanId.length >= 0) Y.spanId = D.spanId
              }
              if (D.traceState != null) Y.traceState = String(D.traceState);
              if (D.parentSpanId != null) {
                if (typeof D.parentSpanId === "string") J1.base64.decode(D.parentSpanId, Y.parentSpanId = J1.newBuffer(J1.base64.length(D.parentSpanId)), 0);
                else if (D.parentSpanId.length >= 0) Y.parentSpanId = D.parentSpanId
              }
              if (D.name != null) Y.name = String(D.name);
              switch (D.kind) {
                default:
                  if (typeof D.kind === "number") {
                    Y.kind = D.kind;
                    break
                  }
                  break;
                case "SPAN_KIND_UNSPECIFIED":
                case 0:
                  Y.kind = 0;
                  break;
                case "SPAN_KIND_INTERNAL":
                case 1:
                  Y.kind = 1;
                  break;
                case "SPAN_KIND_SERVER":
                case 2:
                  Y.kind = 2;
                  break;
                case "SPAN_KIND_CLIENT":
                case 3:
                  Y.kind = 3;
                  break;
                case "SPAN_KIND_PRODUCER":
                case 4:
                  Y.kind = 4;
                  break;
                case "SPAN_KIND_CONSUMER":
                case 5:
                  Y.kind = 5;
                  break
              }
              if (D.startTimeUnixNano != null) {
                if (J1.Long)(Y.startTimeUnixNano = J1.Long.fromValue(D.startTimeUnixNano)).unsigned = !1;
                else if (typeof D.startTimeUnixNano === "string") Y.startTimeUnixNano = parseInt(D.startTimeUnixNano, 10);
                else if (typeof D.startTimeUnixNano === "number") Y.startTimeUnixNano = D.startTimeUnixNano;
                else if (typeof D.startTimeUnixNano === "object") Y.startTimeUnixNano = new J1.LongBits(D.startTimeUnixNano.low >>> 0, D.startTimeUnixNano.high >>> 0).toNumber()
              }
              if (D.endTimeUnixNano != null) {
                if (J1.Long)(Y.endTimeUnixNano = J1.Long.fromValue(D.endTimeUnixNano)).unsigned = !1;
                else if (typeof D.endTimeUnixNano === "string") Y.endTimeUnixNano = parseInt(D.endTimeUnixNano, 10);
                else if (typeof D.endTimeUnixNano === "number") Y.endTimeUnixNano = D.endTimeUnixNano;
                else if (typeof D.endTimeUnixNano === "object") Y.endTimeUnixNano = new J1.LongBits(D.endTimeUnixNano.low >>> 0, D.endTimeUnixNano.high >>> 0).toNumber()
              }
              if (D.attributes) {
                if (!Array.isArray(D.attributes)) throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: array expected");
                Y.attributes = [];
                for (var W = 0; W < D.attributes.length; ++W) {
                  if (typeof D.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: object expected");
                  Y.attributes[W] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(D.attributes[W])
                }
              }
              if (D.droppedAttributesCount != null) Y.droppedAttributesCount = D.droppedAttributesCount >>> 0;
              if (D.events) {
                if (!Array.isArray(D.events)) throw TypeError(".opentelemetry.proto.trace.v1.Span.events: array expected");
                Y.events = [];
                for (var W = 0; W < D.events.length; ++W) {
                  if (typeof D.events[W] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.events: object expected");
                  Y.events[W] = G1.opentelemetry.proto.trace.v1.Span.Event.fromObject(D.events[W])
                }
              }
              if (D.droppedEventsCount != null) Y.droppedEventsCount = D.droppedEventsCount >>> 0;
              if (D.links) {
                if (!Array.isArray(D.links)) throw TypeError(".opentelemetry.proto.trace.v1.Span.links: array expected");
                Y.links = [];
                for (var W = 0; W < D.links.length; ++W) {
                  if (typeof D.links[W] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.links: object expected");
                  Y.links[W] = G1.opentelemetry.proto.trace.v1.Span.Link.fromObject(D.links[W])
                }
              }
              if (D.droppedLinksCount != null) Y.droppedLinksCount = D.droppedLinksCount >>> 0;
              if (D.status != null) {
                if (typeof D.status !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.status: object expected");
                Y.status = G1.opentelemetry.proto.trace.v1.Status.fromObject(D.status)
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.attributes = [], W.events = [], W.links = [];
              if (Y.defaults) {
                if (Y.bytes === String) W.traceId = "";
                else if (W.traceId = [], Y.bytes !== Array) W.traceId = J1.newBuffer(W.traceId);
                if (Y.bytes === String) W.spanId = "";
                else if (W.spanId = [], Y.bytes !== Array) W.spanId = J1.newBuffer(W.spanId);
                if (W.traceState = "", Y.bytes === String) W.parentSpanId = "";
                else if (W.parentSpanId = [], Y.bytes !== Array) W.parentSpanId = J1.newBuffer(W.parentSpanId);
                if (W.name = "", W.kind = Y.enums === String ? "SPAN_KIND_UNSPECIFIED" : 0, J1.Long) {
                  var J = new J1.Long(0, 0, !1);
                  W.startTimeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                } else W.startTimeUnixNano = Y.longs === String ? "0" : 0;
                if (J1.Long) {
                  var J = new J1.Long(0, 0, !1);
                  W.endTimeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                } else W.endTimeUnixNano = Y.longs === String ? "0" : 0;
                W.droppedAttributesCount = 0, W.droppedEventsCount = 0, W.droppedLinksCount = 0, W.status = null
              }
              if (D.traceId != null && D.hasOwnProperty("traceId")) W.traceId = Y.bytes === String ? J1.base64.encode(D.traceId, 0, D.traceId.length) : Y.bytes === Array ? Array.prototype.slice.call(D.traceId) : D.traceId;
              if (D.spanId != null && D.hasOwnProperty("spanId")) W.spanId = Y.bytes === String ? J1.base64.encode(D.spanId, 0, D.spanId.length) : Y.bytes === Array ? Array.prototype.slice.call(D.spanId) : D.spanId;
              if (D.traceState != null && D.hasOwnProperty("traceState")) W.traceState = D.traceState;
              if (D.parentSpanId != null && D.hasOwnProperty("parentSpanId")) W.parentSpanId = Y.bytes === String ? J1.base64.encode(D.parentSpanId, 0, D.parentSpanId.length) : Y.bytes === Array ? Array.prototype.slice.call(D.parentSpanId) : D.parentSpanId;
              if (D.name != null && D.hasOwnProperty("name")) W.name = D.name;
              if (D.kind != null && D.hasOwnProperty("kind")) W.kind = Y.enums === String ? G1.opentelemetry.proto.trace.v1.Span.SpanKind[D.kind] === void 0 ? D.kind : G1.opentelemetry.proto.trace.v1.Span.SpanKind[D.kind] : D.kind;
              if (D.startTimeUnixNano != null && D.hasOwnProperty("startTimeUnixNano"))
                if (typeof D.startTimeUnixNano === "number") W.startTimeUnixNano = Y.longs === String ? String(D.startTimeUnixNano) : D.startTimeUnixNano;
                else W.startTimeUnixNano = Y.longs === String ? J1.Long.prototype.toString.call(D.startTimeUnixNano) : Y.longs === Number ? new J1.LongBits(D.startTimeUnixNano.low >>> 0, D.startTimeUnixNano.high >>> 0).toNumber() : D.startTimeUnixNano;
              if (D.endTimeUnixNano != null && D.hasOwnProperty("endTimeUnixNano"))
                if (typeof D.endTimeUnixNano === "number") W.endTimeUnixNano = Y.longs === String ? String(D.endTimeUnixNano) : D.endTimeUnixNano;
                else W.endTimeUnixNano = Y.longs === String ? J1.Long.prototype.toString.call(D.endTimeUnixNano) : Y.longs === Number ? new J1.LongBits(D.endTimeUnixNano.low >>> 0, D.endTimeUnixNano.high >>> 0).toNumber() : D.endTimeUnixNano;
              if (D.attributes && D.attributes.length) {
                W.attributes = [];
                for (var F = 0; F < D.attributes.length; ++F) W.attributes[F] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(D.attributes[F], Y)
              }
              if (D.droppedAttributesCount != null && D.hasOwnProperty("droppedAttributesCount")) W.droppedAttributesCount = D.droppedAttributesCount;
              if (D.events && D.events.length) {
                W.events = [];
                for (var F = 0; F < D.events.length; ++F) W.events[F] = G1.opentelemetry.proto.trace.v1.Span.Event.toObject(D.events[F], Y)
              }
              if (D.droppedEventsCount != null && D.hasOwnProperty("droppedEventsCount")) W.droppedEventsCount = D.droppedEventsCount;
              if (D.links && D.links.length) {
                W.links = [];
                for (var F = 0; F < D.links.length; ++F) W.links[F] = G1.opentelemetry.proto.trace.v1.Span.Link.toObject(D.links[F], Y)
              }
              if (D.droppedLinksCount != null && D.hasOwnProperty("droppedLinksCount")) W.droppedLinksCount = D.droppedLinksCount;
              if (D.status != null && D.hasOwnProperty("status")) W.status = G1.opentelemetry.proto.trace.v1.Status.toObject(D.status, Y);
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.trace.v1.Span"
            }, G.SpanKind = function() {
              var Z = {},
                D = Object.create(Z);
              return D[Z[0] = "SPAN_KIND_UNSPECIFIED"] = 0, D[Z[1] = "SPAN_KIND_INTERNAL"] = 1, D[Z[2] = "SPAN_KIND_SERVER"] = 2, D[Z[3] = "SPAN_KIND_CLIENT"] = 3, D[Z[4] = "SPAN_KIND_PRODUCER"] = 4, D[Z[5] = "SPAN_KIND_CONSUMER"] = 5, D
            }(), G.Event = function() {
              function Z(D) {
                if (this.attributes = [], D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.timeUnixNano = null, Z.prototype.name = null, Z.prototype.attributes = J1.emptyArray, Z.prototype.droppedAttributesCount = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.timeUnixNano != null && Object.hasOwnProperty.call(Y, "timeUnixNano")) W.uint32(9).fixed64(Y.timeUnixNano);
                if (Y.name != null && Object.hasOwnProperty.call(Y, "name")) W.uint32(18).string(Y.name);
                if (Y.attributes != null && Y.attributes.length)
                  for (var J = 0; J < Y.attributes.length; ++J) G1.opentelemetry.proto.common.v1.KeyValue.encode(Y.attributes[J], W.uint32(26).fork()).ldelim();
                if (Y.droppedAttributesCount != null && Object.hasOwnProperty.call(Y, "droppedAttributesCount")) W.uint32(32).uint32(Y.droppedAttributesCount);
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.trace.v1.Span.Event;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.timeUnixNano = Y.fixed64();
                      break
                    }
                    case 2: {
                      F.name = Y.string();
                      break
                    }
                    case 3: {
                      if (!(F.attributes && F.attributes.length)) F.attributes = [];
                      F.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(Y, Y.uint32()));
                      break
                    }
                    case 4: {
                      F.droppedAttributesCount = Y.uint32();
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano")) {
                  if (!J1.isInteger(Y.timeUnixNano) && !(Y.timeUnixNano && J1.isInteger(Y.timeUnixNano.low) && J1.isInteger(Y.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
                }
                if (Y.name != null && Y.hasOwnProperty("name")) {
                  if (!J1.isString(Y.name)) return "name: string expected"
                }
                if (Y.attributes != null && Y.hasOwnProperty("attributes")) {
                  if (!Array.isArray(Y.attributes)) return "attributes: array expected";
                  for (var W = 0; W < Y.attributes.length; ++W) {
                    var J = G1.opentelemetry.proto.common.v1.KeyValue.verify(Y.attributes[W]);
                    if (J) return "attributes." + J
                  }
                }
                if (Y.droppedAttributesCount != null && Y.hasOwnProperty("droppedAttributesCount")) {
                  if (!J1.isInteger(Y.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.trace.v1.Span.Event) return Y;
                var W = new G1.opentelemetry.proto.trace.v1.Span.Event;
                if (Y.timeUnixNano != null) {
                  if (J1.Long)(W.timeUnixNano = J1.Long.fromValue(Y.timeUnixNano)).unsigned = !1;
                  else if (typeof Y.timeUnixNano === "string") W.timeUnixNano = parseInt(Y.timeUnixNano, 10);
                  else if (typeof Y.timeUnixNano === "number") W.timeUnixNano = Y.timeUnixNano;
                  else if (typeof Y.timeUnixNano === "object") W.timeUnixNano = new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber()
                }
                if (Y.name != null) W.name = String(Y.name);
                if (Y.attributes) {
                  if (!Array.isArray(Y.attributes)) throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: array expected");
                  W.attributes = [];
                  for (var J = 0; J < Y.attributes.length; ++J) {
                    if (typeof Y.attributes[J] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: object expected");
                    W.attributes[J] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(Y.attributes[J])
                  }
                }
                if (Y.droppedAttributesCount != null) W.droppedAttributesCount = Y.droppedAttributesCount >>> 0;
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.arrays || W.defaults) J.attributes = [];
                if (W.defaults) {
                  if (J1.Long) {
                    var F = new J1.Long(0, 0, !1);
                    J.timeUnixNano = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                  } else J.timeUnixNano = W.longs === String ? "0" : 0;
                  J.name = "", J.droppedAttributesCount = 0
                }
                if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano"))
                  if (typeof Y.timeUnixNano === "number") J.timeUnixNano = W.longs === String ? String(Y.timeUnixNano) : Y.timeUnixNano;
                  else J.timeUnixNano = W.longs === String ? J1.Long.prototype.toString.call(Y.timeUnixNano) : W.longs === Number ? new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber() : Y.timeUnixNano;
                if (Y.name != null && Y.hasOwnProperty("name")) J.name = Y.name;
                if (Y.attributes && Y.attributes.length) {
                  J.attributes = [];
                  for (var X = 0; X < Y.attributes.length; ++X) J.attributes[X] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(Y.attributes[X], W)
                }
                if (Y.droppedAttributesCount != null && Y.hasOwnProperty("droppedAttributesCount")) J.droppedAttributesCount = Y.droppedAttributesCount;
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.trace.v1.Span.Event"
              }, Z
            }(), G.Link = function() {
              function Z(D) {
                if (this.attributes = [], D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.traceId = null, Z.prototype.spanId = null, Z.prototype.traceState = null, Z.prototype.attributes = J1.emptyArray, Z.prototype.droppedAttributesCount = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.traceId != null && Object.hasOwnProperty.call(Y, "traceId")) W.uint32(10).bytes(Y.traceId);
                if (Y.spanId != null && Object.hasOwnProperty.call(Y, "spanId")) W.uint32(18).bytes(Y.spanId);
                if (Y.traceState != null && Object.hasOwnProperty.call(Y, "traceState")) W.uint32(26).string(Y.traceState);
                if (Y.attributes != null && Y.attributes.length)
                  for (var J = 0; J < Y.attributes.length; ++J) G1.opentelemetry.proto.common.v1.KeyValue.encode(Y.attributes[J], W.uint32(34).fork()).ldelim();
                if (Y.droppedAttributesCount != null && Object.hasOwnProperty.call(Y, "droppedAttributesCount")) W.uint32(40).uint32(Y.droppedAttributesCount);
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.trace.v1.Span.Link;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.traceId = Y.bytes();
                      break
                    }
                    case 2: {
                      F.spanId = Y.bytes();
                      break
                    }
                    case 3: {
                      F.traceState = Y.string();
                      break
                    }
                    case 4: {
                      if (!(F.attributes && F.attributes.length)) F.attributes = [];
                      F.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(Y, Y.uint32()));
                      break
                    }
                    case 5: {
                      F.droppedAttributesCount = Y.uint32();
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.traceId != null && Y.hasOwnProperty("traceId")) {
                  if (!(Y.traceId && typeof Y.traceId.length === "number" || J1.isString(Y.traceId))) return "traceId: buffer expected"
                }
                if (Y.spanId != null && Y.hasOwnProperty("spanId")) {
                  if (!(Y.spanId && typeof Y.spanId.length === "number" || J1.isString(Y.spanId))) return "spanId: buffer expected"
                }
                if (Y.traceState != null && Y.hasOwnProperty("traceState")) {
                  if (!J1.isString(Y.traceState)) return "traceState: string expected"
                }
                if (Y.attributes != null && Y.hasOwnProperty("attributes")) {
                  if (!Array.isArray(Y.attributes)) return "attributes: array expected";
                  for (var W = 0; W < Y.attributes.length; ++W) {
                    var J = G1.opentelemetry.proto.common.v1.KeyValue.verify(Y.attributes[W]);
                    if (J) return "attributes." + J
                  }
                }
                if (Y.droppedAttributesCount != null && Y.hasOwnProperty("droppedAttributesCount")) {
                  if (!J1.isInteger(Y.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.trace.v1.Span.Link) return Y;
                var W = new G1.opentelemetry.proto.trace.v1.Span.Link;
                if (Y.traceId != null) {
                  if (typeof Y.traceId === "string") J1.base64.decode(Y.traceId, W.traceId = J1.newBuffer(J1.base64.length(Y.traceId)), 0);
                  else if (Y.traceId.length >= 0) W.traceId = Y.traceId
                }
                if (Y.spanId != null) {
                  if (typeof Y.spanId === "string") J1.base64.decode(Y.spanId, W.spanId = J1.newBuffer(J1.base64.length(Y.spanId)), 0);
                  else if (Y.spanId.length >= 0) W.spanId = Y.spanId
                }
                if (Y.traceState != null) W.traceState = String(Y.traceState);
                if (Y.attributes) {
                  if (!Array.isArray(Y.attributes)) throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: array expected");
                  W.attributes = [];
                  for (var J = 0; J < Y.attributes.length; ++J) {
                    if (typeof Y.attributes[J] !== "object") throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: object expected");
                    W.attributes[J] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(Y.attributes[J])
                  }
                }
                if (Y.droppedAttributesCount != null) W.droppedAttributesCount = Y.droppedAttributesCount >>> 0;
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.arrays || W.defaults) J.attributes = [];
                if (W.defaults) {
                  if (W.bytes === String) J.traceId = "";
                  else if (J.traceId = [], W.bytes !== Array) J.traceId = J1.newBuffer(J.traceId);
                  if (W.bytes === String) J.spanId = "";
                  else if (J.spanId = [], W.bytes !== Array) J.spanId = J1.newBuffer(J.spanId);
                  J.traceState = "", J.droppedAttributesCount = 0
                }
                if (Y.traceId != null && Y.hasOwnProperty("traceId")) J.traceId = W.bytes === String ? J1.base64.encode(Y.traceId, 0, Y.traceId.length) : W.bytes === Array ? Array.prototype.slice.call(Y.traceId) : Y.traceId;
                if (Y.spanId != null && Y.hasOwnProperty("spanId")) J.spanId = W.bytes === String ? J1.base64.encode(Y.spanId, 0, Y.spanId.length) : W.bytes === Array ? Array.prototype.slice.call(Y.spanId) : Y.spanId;
                if (Y.traceState != null && Y.hasOwnProperty("traceState")) J.traceState = Y.traceState;
                if (Y.attributes && Y.attributes.length) {
                  J.attributes = [];
                  for (var F = 0; F < Y.attributes.length; ++F) J.attributes[F] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(Y.attributes[F], W)
                }
                if (Y.droppedAttributesCount != null && Y.hasOwnProperty("droppedAttributesCount")) J.droppedAttributesCount = Y.droppedAttributesCount;
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.trace.v1.Span.Link"
              }, Z
            }(), G
          }(), I.Status = function() {
            function G(Z) {
              if (Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.message = null, G.prototype.code = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.message != null && Object.hasOwnProperty.call(D, "message")) Y.uint32(18).string(D.message);
              if (D.code != null && Object.hasOwnProperty.call(D, "code")) Y.uint32(24).int32(D.code);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.trace.v1.Status;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 2: {
                    J.message = D.string();
                    break
                  }
                  case 3: {
                    J.code = D.int32();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.message != null && D.hasOwnProperty("message")) {
                if (!J1.isString(D.message)) return "message: string expected"
              }
              if (D.code != null && D.hasOwnProperty("code")) switch (D.code) {
                default:
                  return "code: enum value expected";
                case 0:
                case 1:
                case 2:
                  break
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.trace.v1.Status) return D;
              var Y = new G1.opentelemetry.proto.trace.v1.Status;
              if (D.message != null) Y.message = String(D.message);
              switch (D.code) {
                default:
                  if (typeof D.code === "number") {
                    Y.code = D.code;
                    break
                  }
                  break;
                case "STATUS_CODE_UNSET":
                case 0:
                  Y.code = 0;
                  break;
                case "STATUS_CODE_OK":
                case 1:
                  Y.code = 1;
                  break;
                case "STATUS_CODE_ERROR":
                case 2:
                  Y.code = 2;
                  break
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.defaults) W.message = "", W.code = Y.enums === String ? "STATUS_CODE_UNSET" : 0;
              if (D.message != null && D.hasOwnProperty("message")) W.message = D.message;
              if (D.code != null && D.hasOwnProperty("code")) W.code = Y.enums === String ? G1.opentelemetry.proto.trace.v1.Status.StatusCode[D.code] === void 0 ? D.code : G1.opentelemetry.proto.trace.v1.Status.StatusCode[D.code] : D.code;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.trace.v1.Status"
            }, G.StatusCode = function() {
              var Z = {},
                D = Object.create(Z);
              return D[Z[0] = "STATUS_CODE_UNSET"] = 0, D[Z[1] = "STATUS_CODE_OK"] = 1, D[Z[2] = "STATUS_CODE_ERROR"] = 2, D
            }(), G
          }(), I
        }(), Q
      }(), B.collector = function() {
        var Q = {};
        return Q.trace = function() {
          var I = {};
          return I.v1 = function() {
            var G = {};
            return G.TraceService = function() {
              function Z(D, Y, W) {
                b9.rpc.Service.call(this, D, Y, W)
              }
              return (Z.prototype = Object.create(b9.rpc.Service.prototype)).constructor = Z, Z.create = function D(Y, W, J) {
                return new this(Y, W, J)
              }, Object.defineProperty(Z.prototype.export = function D(Y, W) {
                return this.rpcCall(D, G1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest, G1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse, Y, W)
              }, "name", {
                value: "Export"
              }), Z
            }(), G.ExportTraceServiceRequest = function() {
              function Z(D) {
                if (this.resourceSpans = [], D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.resourceSpans = J1.emptyArray, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.resourceSpans != null && Y.resourceSpans.length)
                  for (var J = 0; J < Y.resourceSpans.length; ++J) G1.opentelemetry.proto.trace.v1.ResourceSpans.encode(Y.resourceSpans[J], W.uint32(10).fork()).ldelim();
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      if (!(F.resourceSpans && F.resourceSpans.length)) F.resourceSpans = [];
                      F.resourceSpans.push(G1.opentelemetry.proto.trace.v1.ResourceSpans.decode(Y, Y.uint32()));
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.resourceSpans != null && Y.hasOwnProperty("resourceSpans")) {
                  if (!Array.isArray(Y.resourceSpans)) return "resourceSpans: array expected";
                  for (var W = 0; W < Y.resourceSpans.length; ++W) {
                    var J = G1.opentelemetry.proto.trace.v1.ResourceSpans.verify(Y.resourceSpans[W]);
                    if (J) return "resourceSpans." + J
                  }
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest) return Y;
                var W = new G1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
                if (Y.resourceSpans) {
                  if (!Array.isArray(Y.resourceSpans)) throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: array expected");
                  W.resourceSpans = [];
                  for (var J = 0; J < Y.resourceSpans.length; ++J) {
                    if (typeof Y.resourceSpans[J] !== "object") throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: object expected");
                    W.resourceSpans[J] = G1.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(Y.resourceSpans[J])
                  }
                }
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.arrays || W.defaults) J.resourceSpans = [];
                if (Y.resourceSpans && Y.resourceSpans.length) {
                  J.resourceSpans = [];
                  for (var F = 0; F < Y.resourceSpans.length; ++F) J.resourceSpans[F] = G1.opentelemetry.proto.trace.v1.ResourceSpans.toObject(Y.resourceSpans[F], W)
                }
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest"
              }, Z
            }(), G.ExportTraceServiceResponse = function() {
              function Z(D) {
                if (D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.partialSuccess = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.partialSuccess != null && Object.hasOwnProperty.call(Y, "partialSuccess")) G1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.encode(Y.partialSuccess, W.uint32(10).fork()).ldelim();
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.partialSuccess = G1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.decode(Y, Y.uint32());
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.partialSuccess != null && Y.hasOwnProperty("partialSuccess")) {
                  var W = G1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.verify(Y.partialSuccess);
                  if (W) return "partialSuccess." + W
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse) return Y;
                var W = new G1.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse;
                if (Y.partialSuccess != null) {
                  if (typeof Y.partialSuccess !== "object") throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse.partialSuccess: object expected");
                  W.partialSuccess = G1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.fromObject(Y.partialSuccess)
                }
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.defaults) J.partialSuccess = null;
                if (Y.partialSuccess != null && Y.hasOwnProperty("partialSuccess")) J.partialSuccess = G1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.toObject(Y.partialSuccess, W);
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse"
              }, Z
            }(), G.ExportTracePartialSuccess = function() {
              function Z(D) {
                if (D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.rejectedSpans = null, Z.prototype.errorMessage = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.rejectedSpans != null && Object.hasOwnProperty.call(Y, "rejectedSpans")) W.uint32(8).int64(Y.rejectedSpans);
                if (Y.errorMessage != null && Object.hasOwnProperty.call(Y, "errorMessage")) W.uint32(18).string(Y.errorMessage);
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.rejectedSpans = Y.int64();
                      break
                    }
                    case 2: {
                      F.errorMessage = Y.string();
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.rejectedSpans != null && Y.hasOwnProperty("rejectedSpans")) {
                  if (!J1.isInteger(Y.rejectedSpans) && !(Y.rejectedSpans && J1.isInteger(Y.rejectedSpans.low) && J1.isInteger(Y.rejectedSpans.high))) return "rejectedSpans: integer|Long expected"
                }
                if (Y.errorMessage != null && Y.hasOwnProperty("errorMessage")) {
                  if (!J1.isString(Y.errorMessage)) return "errorMessage: string expected"
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess) return Y;
                var W = new G1.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess;
                if (Y.rejectedSpans != null) {
                  if (J1.Long)(W.rejectedSpans = J1.Long.fromValue(Y.rejectedSpans)).unsigned = !1;
                  else if (typeof Y.rejectedSpans === "string") W.rejectedSpans = parseInt(Y.rejectedSpans, 10);
                  else if (typeof Y.rejectedSpans === "number") W.rejectedSpans = Y.rejectedSpans;
                  else if (typeof Y.rejectedSpans === "object") W.rejectedSpans = new J1.LongBits(Y.rejectedSpans.low >>> 0, Y.rejectedSpans.high >>> 0).toNumber()
                }
                if (Y.errorMessage != null) W.errorMessage = String(Y.errorMessage);
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.defaults) {
                  if (J1.Long) {
                    var F = new J1.Long(0, 0, !1);
                    J.rejectedSpans = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                  } else J.rejectedSpans = W.longs === String ? "0" : 0;
                  J.errorMessage = ""
                }
                if (Y.rejectedSpans != null && Y.hasOwnProperty("rejectedSpans"))
                  if (typeof Y.rejectedSpans === "number") J.rejectedSpans = W.longs === String ? String(Y.rejectedSpans) : Y.rejectedSpans;
                  else J.rejectedSpans = W.longs === String ? J1.Long.prototype.toString.call(Y.rejectedSpans) : W.longs === Number ? new J1.LongBits(Y.rejectedSpans.low >>> 0, Y.rejectedSpans.high >>> 0).toNumber() : Y.rejectedSpans;
                if (Y.errorMessage != null && Y.hasOwnProperty("errorMessage")) J.errorMessage = Y.errorMessage;
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess"
              }, Z
            }(), G
          }(), I
        }(), Q.metrics = function() {
          var I = {};
          return I.v1 = function() {
            var G = {};
            return G.MetricsService = function() {
              function Z(D, Y, W) {
                b9.rpc.Service.call(this, D, Y, W)
              }
              return (Z.prototype = Object.create(b9.rpc.Service.prototype)).constructor = Z, Z.create = function D(Y, W, J) {
                return new this(Y, W, J)
              }, Object.defineProperty(Z.prototype.export = function D(Y, W) {
                return this.rpcCall(D, G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest, G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse, Y, W)
              }, "name", {
                value: "Export"
              }), Z
            }(), G.ExportMetricsServiceRequest = function() {
              function Z(D) {
                if (this.resourceMetrics = [], D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.resourceMetrics = J1.emptyArray, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.resourceMetrics != null && Y.resourceMetrics.length)
                  for (var J = 0; J < Y.resourceMetrics.length; ++J) G1.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(Y.resourceMetrics[J], W.uint32(10).fork()).ldelim();
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      if (!(F.resourceMetrics && F.resourceMetrics.length)) F.resourceMetrics = [];
                      F.resourceMetrics.push(G1.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(Y, Y.uint32()));
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.resourceMetrics != null && Y.hasOwnProperty("resourceMetrics")) {
                  if (!Array.isArray(Y.resourceMetrics)) return "resourceMetrics: array expected";
                  for (var W = 0; W < Y.resourceMetrics.length; ++W) {
                    var J = G1.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(Y.resourceMetrics[W]);
                    if (J) return "resourceMetrics." + J
                  }
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest) return Y;
                var W = new G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
                if (Y.resourceMetrics) {
                  if (!Array.isArray(Y.resourceMetrics)) throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: array expected");
                  W.resourceMetrics = [];
                  for (var J = 0; J < Y.resourceMetrics.length; ++J) {
                    if (typeof Y.resourceMetrics[J] !== "object") throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: object expected");
                    W.resourceMetrics[J] = G1.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(Y.resourceMetrics[J])
                  }
                }
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.arrays || W.defaults) J.resourceMetrics = [];
                if (Y.resourceMetrics && Y.resourceMetrics.length) {
                  J.resourceMetrics = [];
                  for (var F = 0; F < Y.resourceMetrics.length; ++F) J.resourceMetrics[F] = G1.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(Y.resourceMetrics[F], W)
                }
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest"
              }, Z
            }(), G.ExportMetricsServiceResponse = function() {
              function Z(D) {
                if (D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.partialSuccess = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.partialSuccess != null && Object.hasOwnProperty.call(Y, "partialSuccess")) G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.encode(Y.partialSuccess, W.uint32(10).fork()).ldelim();
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.partialSuccess = G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.decode(Y, Y.uint32());
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.partialSuccess != null && Y.hasOwnProperty("partialSuccess")) {
                  var W = G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.verify(Y.partialSuccess);
                  if (W) return "partialSuccess." + W
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse) return Y;
                var W = new G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse;
                if (Y.partialSuccess != null) {
                  if (typeof Y.partialSuccess !== "object") throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse.partialSuccess: object expected");
                  W.partialSuccess = G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.fromObject(Y.partialSuccess)
                }
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.defaults) J.partialSuccess = null;
                if (Y.partialSuccess != null && Y.hasOwnProperty("partialSuccess")) J.partialSuccess = G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.toObject(Y.partialSuccess, W);
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse"
              }, Z
            }(), G.ExportMetricsPartialSuccess = function() {
              function Z(D) {
                if (D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.rejectedDataPoints = null, Z.prototype.errorMessage = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.rejectedDataPoints != null && Object.hasOwnProperty.call(Y, "rejectedDataPoints")) W.uint32(8).int64(Y.rejectedDataPoints);
                if (Y.errorMessage != null && Object.hasOwnProperty.call(Y, "errorMessage")) W.uint32(18).string(Y.errorMessage);
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.rejectedDataPoints = Y.int64();
                      break
                    }
                    case 2: {
                      F.errorMessage = Y.string();
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.rejectedDataPoints != null && Y.hasOwnProperty("rejectedDataPoints")) {
                  if (!J1.isInteger(Y.rejectedDataPoints) && !(Y.rejectedDataPoints && J1.isInteger(Y.rejectedDataPoints.low) && J1.isInteger(Y.rejectedDataPoints.high))) return "rejectedDataPoints: integer|Long expected"
                }
                if (Y.errorMessage != null && Y.hasOwnProperty("errorMessage")) {
                  if (!J1.isString(Y.errorMessage)) return "errorMessage: string expected"
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess) return Y;
                var W = new G1.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess;
                if (Y.rejectedDataPoints != null) {
                  if (J1.Long)(W.rejectedDataPoints = J1.Long.fromValue(Y.rejectedDataPoints)).unsigned = !1;
                  else if (typeof Y.rejectedDataPoints === "string") W.rejectedDataPoints = parseInt(Y.rejectedDataPoints, 10);
                  else if (typeof Y.rejectedDataPoints === "number") W.rejectedDataPoints = Y.rejectedDataPoints;
                  else if (typeof Y.rejectedDataPoints === "object") W.rejectedDataPoints = new J1.LongBits(Y.rejectedDataPoints.low >>> 0, Y.rejectedDataPoints.high >>> 0).toNumber()
                }
                if (Y.errorMessage != null) W.errorMessage = String(Y.errorMessage);
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.defaults) {
                  if (J1.Long) {
                    var F = new J1.Long(0, 0, !1);
                    J.rejectedDataPoints = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                  } else J.rejectedDataPoints = W.longs === String ? "0" : 0;
                  J.errorMessage = ""
                }
                if (Y.rejectedDataPoints != null && Y.hasOwnProperty("rejectedDataPoints"))
                  if (typeof Y.rejectedDataPoints === "number") J.rejectedDataPoints = W.longs === String ? String(Y.rejectedDataPoints) : Y.rejectedDataPoints;
                  else J.rejectedDataPoints = W.longs === String ? J1.Long.prototype.toString.call(Y.rejectedDataPoints) : W.longs === Number ? new J1.LongBits(Y.rejectedDataPoints.low >>> 0, Y.rejectedDataPoints.high >>> 0).toNumber() : Y.rejectedDataPoints;
                if (Y.errorMessage != null && Y.hasOwnProperty("errorMessage")) J.errorMessage = Y.errorMessage;
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess"
              }, Z
            }(), G
          }(), I
        }(), Q.logs = function() {
          var I = {};
          return I.v1 = function() {
            var G = {};
            return G.LogsService = function() {
              function Z(D, Y, W) {
                b9.rpc.Service.call(this, D, Y, W)
              }
              return (Z.prototype = Object.create(b9.rpc.Service.prototype)).constructor = Z, Z.create = function D(Y, W, J) {
                return new this(Y, W, J)
              }, Object.defineProperty(Z.prototype.export = function D(Y, W) {
                return this.rpcCall(D, G1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest, G1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse, Y, W)
              }, "name", {
                value: "Export"
              }), Z
            }(), G.ExportLogsServiceRequest = function() {
              function Z(D) {
                if (this.resourceLogs = [], D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.resourceLogs = J1.emptyArray, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.resourceLogs != null && Y.resourceLogs.length)
                  for (var J = 0; J < Y.resourceLogs.length; ++J) G1.opentelemetry.proto.logs.v1.ResourceLogs.encode(Y.resourceLogs[J], W.uint32(10).fork()).ldelim();
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      if (!(F.resourceLogs && F.resourceLogs.length)) F.resourceLogs = [];
                      F.resourceLogs.push(G1.opentelemetry.proto.logs.v1.ResourceLogs.decode(Y, Y.uint32()));
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.resourceLogs != null && Y.hasOwnProperty("resourceLogs")) {
                  if (!Array.isArray(Y.resourceLogs)) return "resourceLogs: array expected";
                  for (var W = 0; W < Y.resourceLogs.length; ++W) {
                    var J = G1.opentelemetry.proto.logs.v1.ResourceLogs.verify(Y.resourceLogs[W]);
                    if (J) return "resourceLogs." + J
                  }
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest) return Y;
                var W = new G1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
                if (Y.resourceLogs) {
                  if (!Array.isArray(Y.resourceLogs)) throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: array expected");
                  W.resourceLogs = [];
                  for (var J = 0; J < Y.resourceLogs.length; ++J) {
                    if (typeof Y.resourceLogs[J] !== "object") throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: object expected");
                    W.resourceLogs[J] = G1.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(Y.resourceLogs[J])
                  }
                }
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.arrays || W.defaults) J.resourceLogs = [];
                if (Y.resourceLogs && Y.resourceLogs.length) {
                  J.resourceLogs = [];
                  for (var F = 0; F < Y.resourceLogs.length; ++F) J.resourceLogs[F] = G1.opentelemetry.proto.logs.v1.ResourceLogs.toObject(Y.resourceLogs[F], W)
                }
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest"
              }, Z
            }(), G.ExportLogsServiceResponse = function() {
              function Z(D) {
                if (D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.partialSuccess = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.partialSuccess != null && Object.hasOwnProperty.call(Y, "partialSuccess")) G1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.encode(Y.partialSuccess, W.uint32(10).fork()).ldelim();
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.partialSuccess = G1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.decode(Y, Y.uint32());
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.partialSuccess != null && Y.hasOwnProperty("partialSuccess")) {
                  var W = G1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.verify(Y.partialSuccess);
                  if (W) return "partialSuccess." + W
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse) return Y;
                var W = new G1.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse;
                if (Y.partialSuccess != null) {
                  if (typeof Y.partialSuccess !== "object") throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse.partialSuccess: object expected");
                  W.partialSuccess = G1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.fromObject(Y.partialSuccess)
                }
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.defaults) J.partialSuccess = null;
                if (Y.partialSuccess != null && Y.hasOwnProperty("partialSuccess")) J.partialSuccess = G1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.toObject(Y.partialSuccess, W);
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse"
              }, Z
            }(), G.ExportLogsPartialSuccess = function() {
              function Z(D) {
                if (D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.rejectedLogRecords = null, Z.prototype.errorMessage = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.rejectedLogRecords != null && Object.hasOwnProperty.call(Y, "rejectedLogRecords")) W.uint32(8).int64(Y.rejectedLogRecords);
                if (Y.errorMessage != null && Object.hasOwnProperty.call(Y, "errorMessage")) W.uint32(18).string(Y.errorMessage);
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.rejectedLogRecords = Y.int64();
                      break
                    }
                    case 2: {
                      F.errorMessage = Y.string();
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.rejectedLogRecords != null && Y.hasOwnProperty("rejectedLogRecords")) {
                  if (!J1.isInteger(Y.rejectedLogRecords) && !(Y.rejectedLogRecords && J1.isInteger(Y.rejectedLogRecords.low) && J1.isInteger(Y.rejectedLogRecords.high))) return "rejectedLogRecords: integer|Long expected"
                }
                if (Y.errorMessage != null && Y.hasOwnProperty("errorMessage")) {
                  if (!J1.isString(Y.errorMessage)) return "errorMessage: string expected"
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess) return Y;
                var W = new G1.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess;
                if (Y.rejectedLogRecords != null) {
                  if (J1.Long)(W.rejectedLogRecords = J1.Long.fromValue(Y.rejectedLogRecords)).unsigned = !1;
                  else if (typeof Y.rejectedLogRecords === "string") W.rejectedLogRecords = parseInt(Y.rejectedLogRecords, 10);
                  else if (typeof Y.rejectedLogRecords === "number") W.rejectedLogRecords = Y.rejectedLogRecords;
                  else if (typeof Y.rejectedLogRecords === "object") W.rejectedLogRecords = new J1.LongBits(Y.rejectedLogRecords.low >>> 0, Y.rejectedLogRecords.high >>> 0).toNumber()
                }
                if (Y.errorMessage != null) W.errorMessage = String(Y.errorMessage);
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.defaults) {
                  if (J1.Long) {
                    var F = new J1.Long(0, 0, !1);
                    J.rejectedLogRecords = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                  } else J.rejectedLogRecords = W.longs === String ? "0" : 0;
                  J.errorMessage = ""
                }
                if (Y.rejectedLogRecords != null && Y.hasOwnProperty("rejectedLogRecords"))
                  if (typeof Y.rejectedLogRecords === "number") J.rejectedLogRecords = W.longs === String ? String(Y.rejectedLogRecords) : Y.rejectedLogRecords;
                  else J.rejectedLogRecords = W.longs === String ? J1.Long.prototype.toString.call(Y.rejectedLogRecords) : W.longs === Number ? new J1.LongBits(Y.rejectedLogRecords.low >>> 0, Y.rejectedLogRecords.high >>> 0).toNumber() : Y.rejectedLogRecords;
                if (Y.errorMessage != null && Y.hasOwnProperty("errorMessage")) J.errorMessage = Y.errorMessage;
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess"
              }, Z
            }(), G
          }(), I
        }(), Q
      }(), B.metrics = function() {
        var Q = {};
        return Q.v1 = function() {
          var I = {};
          return I.MetricsData = function() {
            function G(Z) {
              if (this.resourceMetrics = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.resourceMetrics = J1.emptyArray, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.resourceMetrics != null && D.resourceMetrics.length)
                for (var W = 0; W < D.resourceMetrics.length; ++W) G1.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(D.resourceMetrics[W], Y.uint32(10).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.MetricsData;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.resourceMetrics && J.resourceMetrics.length)) J.resourceMetrics = [];
                    J.resourceMetrics.push(G1.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(D, D.uint32()));
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.resourceMetrics != null && D.hasOwnProperty("resourceMetrics")) {
                if (!Array.isArray(D.resourceMetrics)) return "resourceMetrics: array expected";
                for (var Y = 0; Y < D.resourceMetrics.length; ++Y) {
                  var W = G1.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(D.resourceMetrics[Y]);
                  if (W) return "resourceMetrics." + W
                }
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.MetricsData) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.MetricsData;
              if (D.resourceMetrics) {
                if (!Array.isArray(D.resourceMetrics)) throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: array expected");
                Y.resourceMetrics = [];
                for (var W = 0; W < D.resourceMetrics.length; ++W) {
                  if (typeof D.resourceMetrics[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: object expected");
                  Y.resourceMetrics[W] = G1.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(D.resourceMetrics[W])
                }
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.resourceMetrics = [];
              if (D.resourceMetrics && D.resourceMetrics.length) {
                W.resourceMetrics = [];
                for (var J = 0; J < D.resourceMetrics.length; ++J) W.resourceMetrics[J] = G1.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(D.resourceMetrics[J], Y)
              }
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.MetricsData"
            }, G
          }(), I.ResourceMetrics = function() {
            function G(Z) {
              if (this.scopeMetrics = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.resource = null, G.prototype.scopeMetrics = J1.emptyArray, G.prototype.schemaUrl = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.resource != null && Object.hasOwnProperty.call(D, "resource")) G1.opentelemetry.proto.resource.v1.Resource.encode(D.resource, Y.uint32(10).fork()).ldelim();
              if (D.scopeMetrics != null && D.scopeMetrics.length)
                for (var W = 0; W < D.scopeMetrics.length; ++W) G1.opentelemetry.proto.metrics.v1.ScopeMetrics.encode(D.scopeMetrics[W], Y.uint32(18).fork()).ldelim();
              if (D.schemaUrl != null && Object.hasOwnProperty.call(D, "schemaUrl")) Y.uint32(26).string(D.schemaUrl);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.ResourceMetrics;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.resource = G1.opentelemetry.proto.resource.v1.Resource.decode(D, D.uint32());
                    break
                  }
                  case 2: {
                    if (!(J.scopeMetrics && J.scopeMetrics.length)) J.scopeMetrics = [];
                    J.scopeMetrics.push(G1.opentelemetry.proto.metrics.v1.ScopeMetrics.decode(D, D.uint32()));
                    break
                  }
                  case 3: {
                    J.schemaUrl = D.string();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.resource != null && D.hasOwnProperty("resource")) {
                var Y = G1.opentelemetry.proto.resource.v1.Resource.verify(D.resource);
                if (Y) return "resource." + Y
              }
              if (D.scopeMetrics != null && D.hasOwnProperty("scopeMetrics")) {
                if (!Array.isArray(D.scopeMetrics)) return "scopeMetrics: array expected";
                for (var W = 0; W < D.scopeMetrics.length; ++W) {
                  var Y = G1.opentelemetry.proto.metrics.v1.ScopeMetrics.verify(D.scopeMetrics[W]);
                  if (Y) return "scopeMetrics." + Y
                }
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) {
                if (!J1.isString(D.schemaUrl)) return "schemaUrl: string expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.ResourceMetrics) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.ResourceMetrics;
              if (D.resource != null) {
                if (typeof D.resource !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.resource: object expected");
                Y.resource = G1.opentelemetry.proto.resource.v1.Resource.fromObject(D.resource)
              }
              if (D.scopeMetrics) {
                if (!Array.isArray(D.scopeMetrics)) throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: array expected");
                Y.scopeMetrics = [];
                for (var W = 0; W < D.scopeMetrics.length; ++W) {
                  if (typeof D.scopeMetrics[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: object expected");
                  Y.scopeMetrics[W] = G1.opentelemetry.proto.metrics.v1.ScopeMetrics.fromObject(D.scopeMetrics[W])
                }
              }
              if (D.schemaUrl != null) Y.schemaUrl = String(D.schemaUrl);
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.scopeMetrics = [];
              if (Y.defaults) W.resource = null, W.schemaUrl = "";
              if (D.resource != null && D.hasOwnProperty("resource")) W.resource = G1.opentelemetry.proto.resource.v1.Resource.toObject(D.resource, Y);
              if (D.scopeMetrics && D.scopeMetrics.length) {
                W.scopeMetrics = [];
                for (var J = 0; J < D.scopeMetrics.length; ++J) W.scopeMetrics[J] = G1.opentelemetry.proto.metrics.v1.ScopeMetrics.toObject(D.scopeMetrics[J], Y)
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) W.schemaUrl = D.schemaUrl;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.ResourceMetrics"
            }, G
          }(), I.ScopeMetrics = function() {
            function G(Z) {
              if (this.metrics = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.scope = null, G.prototype.metrics = J1.emptyArray, G.prototype.schemaUrl = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.scope != null && Object.hasOwnProperty.call(D, "scope")) G1.opentelemetry.proto.common.v1.InstrumentationScope.encode(D.scope, Y.uint32(10).fork()).ldelim();
              if (D.metrics != null && D.metrics.length)
                for (var W = 0; W < D.metrics.length; ++W) G1.opentelemetry.proto.metrics.v1.Metric.encode(D.metrics[W], Y.uint32(18).fork()).ldelim();
              if (D.schemaUrl != null && Object.hasOwnProperty.call(D, "schemaUrl")) Y.uint32(26).string(D.schemaUrl);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.ScopeMetrics;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.decode(D, D.uint32());
                    break
                  }
                  case 2: {
                    if (!(J.metrics && J.metrics.length)) J.metrics = [];
                    J.metrics.push(G1.opentelemetry.proto.metrics.v1.Metric.decode(D, D.uint32()));
                    break
                  }
                  case 3: {
                    J.schemaUrl = D.string();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.scope != null && D.hasOwnProperty("scope")) {
                var Y = G1.opentelemetry.proto.common.v1.InstrumentationScope.verify(D.scope);
                if (Y) return "scope." + Y
              }
              if (D.metrics != null && D.hasOwnProperty("metrics")) {
                if (!Array.isArray(D.metrics)) return "metrics: array expected";
                for (var W = 0; W < D.metrics.length; ++W) {
                  var Y = G1.opentelemetry.proto.metrics.v1.Metric.verify(D.metrics[W]);
                  if (Y) return "metrics." + Y
                }
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) {
                if (!J1.isString(D.schemaUrl)) return "schemaUrl: string expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.ScopeMetrics) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.ScopeMetrics;
              if (D.scope != null) {
                if (typeof D.scope !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.scope: object expected");
                Y.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(D.scope)
              }
              if (D.metrics) {
                if (!Array.isArray(D.metrics)) throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: array expected");
                Y.metrics = [];
                for (var W = 0; W < D.metrics.length; ++W) {
                  if (typeof D.metrics[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: object expected");
                  Y.metrics[W] = G1.opentelemetry.proto.metrics.v1.Metric.fromObject(D.metrics[W])
                }
              }
              if (D.schemaUrl != null) Y.schemaUrl = String(D.schemaUrl);
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.metrics = [];
              if (Y.defaults) W.scope = null, W.schemaUrl = "";
              if (D.scope != null && D.hasOwnProperty("scope")) W.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.toObject(D.scope, Y);
              if (D.metrics && D.metrics.length) {
                W.metrics = [];
                for (var J = 0; J < D.metrics.length; ++J) W.metrics[J] = G1.opentelemetry.proto.metrics.v1.Metric.toObject(D.metrics[J], Y)
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) W.schemaUrl = D.schemaUrl;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.ScopeMetrics"
            }, G
          }(), I.Metric = function() {
            function G(D) {
              if (D) {
                for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                  if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
              }
            }
            G.prototype.name = null, G.prototype.description = null, G.prototype.unit = null, G.prototype.gauge = null, G.prototype.sum = null, G.prototype.histogram = null, G.prototype.exponentialHistogram = null, G.prototype.summary = null;
            var Z;
            return Object.defineProperty(G.prototype, "data", {
              get: J1.oneOfGetter(Z = ["gauge", "sum", "histogram", "exponentialHistogram", "summary"]),
              set: J1.oneOfSetter(Z)
            }), G.create = function D(Y) {
              return new G(Y)
            }, G.encode = function D(Y, W) {
              if (!W) W = p4.create();
              if (Y.name != null && Object.hasOwnProperty.call(Y, "name")) W.uint32(10).string(Y.name);
              if (Y.description != null && Object.hasOwnProperty.call(Y, "description")) W.uint32(18).string(Y.description);
              if (Y.unit != null && Object.hasOwnProperty.call(Y, "unit")) W.uint32(26).string(Y.unit);
              if (Y.gauge != null && Object.hasOwnProperty.call(Y, "gauge")) G1.opentelemetry.proto.metrics.v1.Gauge.encode(Y.gauge, W.uint32(42).fork()).ldelim();
              if (Y.sum != null && Object.hasOwnProperty.call(Y, "sum")) G1.opentelemetry.proto.metrics.v1.Sum.encode(Y.sum, W.uint32(58).fork()).ldelim();
              if (Y.histogram != null && Object.hasOwnProperty.call(Y, "histogram")) G1.opentelemetry.proto.metrics.v1.Histogram.encode(Y.histogram, W.uint32(74).fork()).ldelim();
              if (Y.exponentialHistogram != null && Object.hasOwnProperty.call(Y, "exponentialHistogram")) G1.opentelemetry.proto.metrics.v1.ExponentialHistogram.encode(Y.exponentialHistogram, W.uint32(82).fork()).ldelim();
              if (Y.summary != null && Object.hasOwnProperty.call(Y, "summary")) G1.opentelemetry.proto.metrics.v1.Summary.encode(Y.summary, W.uint32(90).fork()).ldelim();
              return W
            }, G.encodeDelimited = function D(Y, W) {
              return this.encode(Y, W).ldelim()
            }, G.decode = function D(Y, W) {
              if (!(Y instanceof LA)) Y = LA.create(Y);
              var J = W === void 0 ? Y.len : Y.pos + W,
                F = new G1.opentelemetry.proto.metrics.v1.Metric;
              while (Y.pos < J) {
                var X = Y.uint32();
                switch (X >>> 3) {
                  case 1: {
                    F.name = Y.string();
                    break
                  }
                  case 2: {
                    F.description = Y.string();
                    break
                  }
                  case 3: {
                    F.unit = Y.string();
                    break
                  }
                  case 5: {
                    F.gauge = G1.opentelemetry.proto.metrics.v1.Gauge.decode(Y, Y.uint32());
                    break
                  }
                  case 7: {
                    F.sum = G1.opentelemetry.proto.metrics.v1.Sum.decode(Y, Y.uint32());
                    break
                  }
                  case 9: {
                    F.histogram = G1.opentelemetry.proto.metrics.v1.Histogram.decode(Y, Y.uint32());
                    break
                  }
                  case 10: {
                    F.exponentialHistogram = G1.opentelemetry.proto.metrics.v1.ExponentialHistogram.decode(Y, Y.uint32());
                    break
                  }
                  case 11: {
                    F.summary = G1.opentelemetry.proto.metrics.v1.Summary.decode(Y, Y.uint32());
                    break
                  }
                  default:
                    Y.skipType(X & 7);
                    break
                }
              }
              return F
            }, G.decodeDelimited = function D(Y) {
              if (!(Y instanceof LA)) Y = new LA(Y);
              return this.decode(Y, Y.uint32())
            }, G.verify = function D(Y) {
              if (typeof Y !== "object" || Y === null) return "object expected";
              var W = {};
              if (Y.name != null && Y.hasOwnProperty("name")) {
                if (!J1.isString(Y.name)) return "name: string expected"
              }
              if (Y.description != null && Y.hasOwnProperty("description")) {
                if (!J1.isString(Y.description)) return "description: string expected"
              }
              if (Y.unit != null && Y.hasOwnProperty("unit")) {
                if (!J1.isString(Y.unit)) return "unit: string expected"
              }
              if (Y.gauge != null && Y.hasOwnProperty("gauge")) {
                W.data = 1;
                {
                  var J = G1.opentelemetry.proto.metrics.v1.Gauge.verify(Y.gauge);
                  if (J) return "gauge." + J
                }
              }
              if (Y.sum != null && Y.hasOwnProperty("sum")) {
                if (W.data === 1) return "data: multiple values";
                W.data = 1;
                {
                  var J = G1.opentelemetry.proto.metrics.v1.Sum.verify(Y.sum);
                  if (J) return "sum." + J
                }
              }
              if (Y.histogram != null && Y.hasOwnProperty("histogram")) {
                if (W.data === 1) return "data: multiple values";
                W.data = 1;
                {
                  var J = G1.opentelemetry.proto.metrics.v1.Histogram.verify(Y.histogram);
                  if (J) return "histogram." + J
                }
              }
              if (Y.exponentialHistogram != null && Y.hasOwnProperty("exponentialHistogram")) {
                if (W.data === 1) return "data: multiple values";
                W.data = 1;
                {
                  var J = G1.opentelemetry.proto.metrics.v1.ExponentialHistogram.verify(Y.exponentialHistogram);
                  if (J) return "exponentialHistogram." + J
                }
              }
              if (Y.summary != null && Y.hasOwnProperty("summary")) {
                if (W.data === 1) return "data: multiple values";
                W.data = 1;
                {
                  var J = G1.opentelemetry.proto.metrics.v1.Summary.verify(Y.summary);
                  if (J) return "summary." + J
                }
              }
              return null
            }, G.fromObject = function D(Y) {
              if (Y instanceof G1.opentelemetry.proto.metrics.v1.Metric) return Y;
              var W = new G1.opentelemetry.proto.metrics.v1.Metric;
              if (Y.name != null) W.name = String(Y.name);
              if (Y.description != null) W.description = String(Y.description);
              if (Y.unit != null) W.unit = String(Y.unit);
              if (Y.gauge != null) {
                if (typeof Y.gauge !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.gauge: object expected");
                W.gauge = G1.opentelemetry.proto.metrics.v1.Gauge.fromObject(Y.gauge)
              }
              if (Y.sum != null) {
                if (typeof Y.sum !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.sum: object expected");
                W.sum = G1.opentelemetry.proto.metrics.v1.Sum.fromObject(Y.sum)
              }
              if (Y.histogram != null) {
                if (typeof Y.histogram !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.histogram: object expected");
                W.histogram = G1.opentelemetry.proto.metrics.v1.Histogram.fromObject(Y.histogram)
              }
              if (Y.exponentialHistogram != null) {
                if (typeof Y.exponentialHistogram !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.exponentialHistogram: object expected");
                W.exponentialHistogram = G1.opentelemetry.proto.metrics.v1.ExponentialHistogram.fromObject(Y.exponentialHistogram)
              }
              if (Y.summary != null) {
                if (typeof Y.summary !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Metric.summary: object expected");
                W.summary = G1.opentelemetry.proto.metrics.v1.Summary.fromObject(Y.summary)
              }
              return W
            }, G.toObject = function D(Y, W) {
              if (!W) W = {};
              var J = {};
              if (W.defaults) J.name = "", J.description = "", J.unit = "";
              if (Y.name != null && Y.hasOwnProperty("name")) J.name = Y.name;
              if (Y.description != null && Y.hasOwnProperty("description")) J.description = Y.description;
              if (Y.unit != null && Y.hasOwnProperty("unit")) J.unit = Y.unit;
              if (Y.gauge != null && Y.hasOwnProperty("gauge")) {
                if (J.gauge = G1.opentelemetry.proto.metrics.v1.Gauge.toObject(Y.gauge, W), W.oneofs) J.data = "gauge"
              }
              if (Y.sum != null && Y.hasOwnProperty("sum")) {
                if (J.sum = G1.opentelemetry.proto.metrics.v1.Sum.toObject(Y.sum, W), W.oneofs) J.data = "sum"
              }
              if (Y.histogram != null && Y.hasOwnProperty("histogram")) {
                if (J.histogram = G1.opentelemetry.proto.metrics.v1.Histogram.toObject(Y.histogram, W), W.oneofs) J.data = "histogram"
              }
              if (Y.exponentialHistogram != null && Y.hasOwnProperty("exponentialHistogram")) {
                if (J.exponentialHistogram = G1.opentelemetry.proto.metrics.v1.ExponentialHistogram.toObject(Y.exponentialHistogram, W), W.oneofs) J.data = "exponentialHistogram"
              }
              if (Y.summary != null && Y.hasOwnProperty("summary")) {
                if (J.summary = G1.opentelemetry.proto.metrics.v1.Summary.toObject(Y.summary, W), W.oneofs) J.data = "summary"
              }
              return J
            }, G.prototype.toJSON = function D() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function D(Y) {
              if (Y === void 0) Y = "type.googleapis.com";
              return Y + "/opentelemetry.proto.metrics.v1.Metric"
            }, G
          }(), I.Gauge = function() {
            function G(Z) {
              if (this.dataPoints = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.dataPoints = J1.emptyArray, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.dataPoints != null && D.dataPoints.length)
                for (var W = 0; W < D.dataPoints.length; ++W) G1.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(D.dataPoints[W], Y.uint32(10).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.Gauge;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.dataPoints && J.dataPoints.length)) J.dataPoints = [];
                    J.dataPoints.push(G1.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(D, D.uint32()));
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.dataPoints != null && D.hasOwnProperty("dataPoints")) {
                if (!Array.isArray(D.dataPoints)) return "dataPoints: array expected";
                for (var Y = 0; Y < D.dataPoints.length; ++Y) {
                  var W = G1.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(D.dataPoints[Y]);
                  if (W) return "dataPoints." + W
                }
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.Gauge) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.Gauge;
              if (D.dataPoints) {
                if (!Array.isArray(D.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: array expected");
                Y.dataPoints = [];
                for (var W = 0; W < D.dataPoints.length; ++W) {
                  if (typeof D.dataPoints[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: object expected");
                  Y.dataPoints[W] = G1.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(D.dataPoints[W])
                }
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.dataPoints = [];
              if (D.dataPoints && D.dataPoints.length) {
                W.dataPoints = [];
                for (var J = 0; J < D.dataPoints.length; ++J) W.dataPoints[J] = G1.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(D.dataPoints[J], Y)
              }
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.Gauge"
            }, G
          }(), I.Sum = function() {
            function G(Z) {
              if (this.dataPoints = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.dataPoints = J1.emptyArray, G.prototype.aggregationTemporality = null, G.prototype.isMonotonic = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.dataPoints != null && D.dataPoints.length)
                for (var W = 0; W < D.dataPoints.length; ++W) G1.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(D.dataPoints[W], Y.uint32(10).fork()).ldelim();
              if (D.aggregationTemporality != null && Object.hasOwnProperty.call(D, "aggregationTemporality")) Y.uint32(16).int32(D.aggregationTemporality);
              if (D.isMonotonic != null && Object.hasOwnProperty.call(D, "isMonotonic")) Y.uint32(24).bool(D.isMonotonic);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.Sum;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.dataPoints && J.dataPoints.length)) J.dataPoints = [];
                    J.dataPoints.push(G1.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(D, D.uint32()));
                    break
                  }
                  case 2: {
                    J.aggregationTemporality = D.int32();
                    break
                  }
                  case 3: {
                    J.isMonotonic = D.bool();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.dataPoints != null && D.hasOwnProperty("dataPoints")) {
                if (!Array.isArray(D.dataPoints)) return "dataPoints: array expected";
                for (var Y = 0; Y < D.dataPoints.length; ++Y) {
                  var W = G1.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(D.dataPoints[Y]);
                  if (W) return "dataPoints." + W
                }
              }
              if (D.aggregationTemporality != null && D.hasOwnProperty("aggregationTemporality")) switch (D.aggregationTemporality) {
                default:
                  return "aggregationTemporality: enum value expected";
                case 0:
                case 1:
                case 2:
                  break
              }
              if (D.isMonotonic != null && D.hasOwnProperty("isMonotonic")) {
                if (typeof D.isMonotonic !== "boolean") return "isMonotonic: boolean expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.Sum) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.Sum;
              if (D.dataPoints) {
                if (!Array.isArray(D.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: array expected");
                Y.dataPoints = [];
                for (var W = 0; W < D.dataPoints.length; ++W) {
                  if (typeof D.dataPoints[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: object expected");
                  Y.dataPoints[W] = G1.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(D.dataPoints[W])
                }
              }
              switch (D.aggregationTemporality) {
                default:
                  if (typeof D.aggregationTemporality === "number") {
                    Y.aggregationTemporality = D.aggregationTemporality;
                    break
                  }
                  break;
                case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                case 0:
                  Y.aggregationTemporality = 0;
                  break;
                case "AGGREGATION_TEMPORALITY_DELTA":
                case 1:
                  Y.aggregationTemporality = 1;
                  break;
                case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                case 2:
                  Y.aggregationTemporality = 2;
                  break
              }
              if (D.isMonotonic != null) Y.isMonotonic = Boolean(D.isMonotonic);
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.dataPoints = [];
              if (Y.defaults) W.aggregationTemporality = Y.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0, W.isMonotonic = !1;
              if (D.dataPoints && D.dataPoints.length) {
                W.dataPoints = [];
                for (var J = 0; J < D.dataPoints.length; ++J) W.dataPoints[J] = G1.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(D.dataPoints[J], Y)
              }
              if (D.aggregationTemporality != null && D.hasOwnProperty("aggregationTemporality")) W.aggregationTemporality = Y.enums === String ? G1.opentelemetry.proto.metrics.v1.AggregationTemporality[D.aggregationTemporality] === void 0 ? D.aggregationTemporality : G1.opentelemetry.proto.metrics.v1.AggregationTemporality[D.aggregationTemporality] : D.aggregationTemporality;
              if (D.isMonotonic != null && D.hasOwnProperty("isMonotonic")) W.isMonotonic = D.isMonotonic;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.Sum"
            }, G
          }(), I.Histogram = function() {
            function G(Z) {
              if (this.dataPoints = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.dataPoints = J1.emptyArray, G.prototype.aggregationTemporality = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.dataPoints != null && D.dataPoints.length)
                for (var W = 0; W < D.dataPoints.length; ++W) G1.opentelemetry.proto.metrics.v1.HistogramDataPoint.encode(D.dataPoints[W], Y.uint32(10).fork()).ldelim();
              if (D.aggregationTemporality != null && Object.hasOwnProperty.call(D, "aggregationTemporality")) Y.uint32(16).int32(D.aggregationTemporality);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.Histogram;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.dataPoints && J.dataPoints.length)) J.dataPoints = [];
                    J.dataPoints.push(G1.opentelemetry.proto.metrics.v1.HistogramDataPoint.decode(D, D.uint32()));
                    break
                  }
                  case 2: {
                    J.aggregationTemporality = D.int32();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.dataPoints != null && D.hasOwnProperty("dataPoints")) {
                if (!Array.isArray(D.dataPoints)) return "dataPoints: array expected";
                for (var Y = 0; Y < D.dataPoints.length; ++Y) {
                  var W = G1.opentelemetry.proto.metrics.v1.HistogramDataPoint.verify(D.dataPoints[Y]);
                  if (W) return "dataPoints." + W
                }
              }
              if (D.aggregationTemporality != null && D.hasOwnProperty("aggregationTemporality")) switch (D.aggregationTemporality) {
                default:
                  return "aggregationTemporality: enum value expected";
                case 0:
                case 1:
                case 2:
                  break
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.Histogram) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.Histogram;
              if (D.dataPoints) {
                if (!Array.isArray(D.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: array expected");
                Y.dataPoints = [];
                for (var W = 0; W < D.dataPoints.length; ++W) {
                  if (typeof D.dataPoints[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: object expected");
                  Y.dataPoints[W] = G1.opentelemetry.proto.metrics.v1.HistogramDataPoint.fromObject(D.dataPoints[W])
                }
              }
              switch (D.aggregationTemporality) {
                default:
                  if (typeof D.aggregationTemporality === "number") {
                    Y.aggregationTemporality = D.aggregationTemporality;
                    break
                  }
                  break;
                case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                case 0:
                  Y.aggregationTemporality = 0;
                  break;
                case "AGGREGATION_TEMPORALITY_DELTA":
                case 1:
                  Y.aggregationTemporality = 1;
                  break;
                case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                case 2:
                  Y.aggregationTemporality = 2;
                  break
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.dataPoints = [];
              if (Y.defaults) W.aggregationTemporality = Y.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
              if (D.dataPoints && D.dataPoints.length) {
                W.dataPoints = [];
                for (var J = 0; J < D.dataPoints.length; ++J) W.dataPoints[J] = G1.opentelemetry.proto.metrics.v1.HistogramDataPoint.toObject(D.dataPoints[J], Y)
              }
              if (D.aggregationTemporality != null && D.hasOwnProperty("aggregationTemporality")) W.aggregationTemporality = Y.enums === String ? G1.opentelemetry.proto.metrics.v1.AggregationTemporality[D.aggregationTemporality] === void 0 ? D.aggregationTemporality : G1.opentelemetry.proto.metrics.v1.AggregationTemporality[D.aggregationTemporality] : D.aggregationTemporality;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.Histogram"
            }, G
          }(), I.ExponentialHistogram = function() {
            function G(Z) {
              if (this.dataPoints = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.dataPoints = J1.emptyArray, G.prototype.aggregationTemporality = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.dataPoints != null && D.dataPoints.length)
                for (var W = 0; W < D.dataPoints.length; ++W) G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.encode(D.dataPoints[W], Y.uint32(10).fork()).ldelim();
              if (D.aggregationTemporality != null && Object.hasOwnProperty.call(D, "aggregationTemporality")) Y.uint32(16).int32(D.aggregationTemporality);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.ExponentialHistogram;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.dataPoints && J.dataPoints.length)) J.dataPoints = [];
                    J.dataPoints.push(G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.decode(D, D.uint32()));
                    break
                  }
                  case 2: {
                    J.aggregationTemporality = D.int32();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.dataPoints != null && D.hasOwnProperty("dataPoints")) {
                if (!Array.isArray(D.dataPoints)) return "dataPoints: array expected";
                for (var Y = 0; Y < D.dataPoints.length; ++Y) {
                  var W = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.verify(D.dataPoints[Y]);
                  if (W) return "dataPoints." + W
                }
              }
              if (D.aggregationTemporality != null && D.hasOwnProperty("aggregationTemporality")) switch (D.aggregationTemporality) {
                default:
                  return "aggregationTemporality: enum value expected";
                case 0:
                case 1:
                case 2:
                  break
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.ExponentialHistogram) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.ExponentialHistogram;
              if (D.dataPoints) {
                if (!Array.isArray(D.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: array expected");
                Y.dataPoints = [];
                for (var W = 0; W < D.dataPoints.length; ++W) {
                  if (typeof D.dataPoints[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: object expected");
                  Y.dataPoints[W] = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.fromObject(D.dataPoints[W])
                }
              }
              switch (D.aggregationTemporality) {
                default:
                  if (typeof D.aggregationTemporality === "number") {
                    Y.aggregationTemporality = D.aggregationTemporality;
                    break
                  }
                  break;
                case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                case 0:
                  Y.aggregationTemporality = 0;
                  break;
                case "AGGREGATION_TEMPORALITY_DELTA":
                case 1:
                  Y.aggregationTemporality = 1;
                  break;
                case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                case 2:
                  Y.aggregationTemporality = 2;
                  break
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.dataPoints = [];
              if (Y.defaults) W.aggregationTemporality = Y.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
              if (D.dataPoints && D.dataPoints.length) {
                W.dataPoints = [];
                for (var J = 0; J < D.dataPoints.length; ++J) W.dataPoints[J] = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.toObject(D.dataPoints[J], Y)
              }
              if (D.aggregationTemporality != null && D.hasOwnProperty("aggregationTemporality")) W.aggregationTemporality = Y.enums === String ? G1.opentelemetry.proto.metrics.v1.AggregationTemporality[D.aggregationTemporality] === void 0 ? D.aggregationTemporality : G1.opentelemetry.proto.metrics.v1.AggregationTemporality[D.aggregationTemporality] : D.aggregationTemporality;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.ExponentialHistogram"
            }, G
          }(), I.Summary = function() {
            function G(Z) {
              if (this.dataPoints = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.dataPoints = J1.emptyArray, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.dataPoints != null && D.dataPoints.length)
                for (var W = 0; W < D.dataPoints.length; ++W) G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.encode(D.dataPoints[W], Y.uint32(10).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.Summary;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.dataPoints && J.dataPoints.length)) J.dataPoints = [];
                    J.dataPoints.push(G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.decode(D, D.uint32()));
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.dataPoints != null && D.hasOwnProperty("dataPoints")) {
                if (!Array.isArray(D.dataPoints)) return "dataPoints: array expected";
                for (var Y = 0; Y < D.dataPoints.length; ++Y) {
                  var W = G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.verify(D.dataPoints[Y]);
                  if (W) return "dataPoints." + W
                }
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.Summary) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.Summary;
              if (D.dataPoints) {
                if (!Array.isArray(D.dataPoints)) throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: array expected");
                Y.dataPoints = [];
                for (var W = 0; W < D.dataPoints.length; ++W) {
                  if (typeof D.dataPoints[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: object expected");
                  Y.dataPoints[W] = G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.fromObject(D.dataPoints[W])
                }
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.dataPoints = [];
              if (D.dataPoints && D.dataPoints.length) {
                W.dataPoints = [];
                for (var J = 0; J < D.dataPoints.length; ++J) W.dataPoints[J] = G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.toObject(D.dataPoints[J], Y)
              }
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.Summary"
            }, G
          }(), I.AggregationTemporality = function() {
            var G = {},
              Z = Object.create(G);
            return Z[G[0] = "AGGREGATION_TEMPORALITY_UNSPECIFIED"] = 0, Z[G[1] = "AGGREGATION_TEMPORALITY_DELTA"] = 1, Z[G[2] = "AGGREGATION_TEMPORALITY_CUMULATIVE"] = 2, Z
          }(), I.DataPointFlags = function() {
            var G = {},
              Z = Object.create(G);
            return Z[G[0] = "DATA_POINT_FLAGS_DO_NOT_USE"] = 0, Z[G[1] = "DATA_POINT_FLAGS_NO_RECORDED_VALUE_MASK"] = 1, Z
          }(), I.NumberDataPoint = function() {
            function G(D) {
              if (this.attributes = [], this.exemplars = [], D) {
                for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                  if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
              }
            }
            G.prototype.attributes = J1.emptyArray, G.prototype.startTimeUnixNano = null, G.prototype.timeUnixNano = null, G.prototype.asDouble = null, G.prototype.asInt = null, G.prototype.exemplars = J1.emptyArray, G.prototype.flags = null;
            var Z;
            return Object.defineProperty(G.prototype, "value", {
              get: J1.oneOfGetter(Z = ["asDouble", "asInt"]),
              set: J1.oneOfSetter(Z)
            }), G.create = function D(Y) {
              return new G(Y)
            }, G.encode = function D(Y, W) {
              if (!W) W = p4.create();
              if (Y.startTimeUnixNano != null && Object.hasOwnProperty.call(Y, "startTimeUnixNano")) W.uint32(17).fixed64(Y.startTimeUnixNano);
              if (Y.timeUnixNano != null && Object.hasOwnProperty.call(Y, "timeUnixNano")) W.uint32(25).fixed64(Y.timeUnixNano);
              if (Y.asDouble != null && Object.hasOwnProperty.call(Y, "asDouble")) W.uint32(33).double(Y.asDouble);
              if (Y.exemplars != null && Y.exemplars.length)
                for (var J = 0; J < Y.exemplars.length; ++J) G1.opentelemetry.proto.metrics.v1.Exemplar.encode(Y.exemplars[J], W.uint32(42).fork()).ldelim();
              if (Y.asInt != null && Object.hasOwnProperty.call(Y, "asInt")) W.uint32(49).sfixed64(Y.asInt);
              if (Y.attributes != null && Y.attributes.length)
                for (var J = 0; J < Y.attributes.length; ++J) G1.opentelemetry.proto.common.v1.KeyValue.encode(Y.attributes[J], W.uint32(58).fork()).ldelim();
              if (Y.flags != null && Object.hasOwnProperty.call(Y, "flags")) W.uint32(64).uint32(Y.flags);
              return W
            }, G.encodeDelimited = function D(Y, W) {
              return this.encode(Y, W).ldelim()
            }, G.decode = function D(Y, W) {
              if (!(Y instanceof LA)) Y = LA.create(Y);
              var J = W === void 0 ? Y.len : Y.pos + W,
                F = new G1.opentelemetry.proto.metrics.v1.NumberDataPoint;
              while (Y.pos < J) {
                var X = Y.uint32();
                switch (X >>> 3) {
                  case 7: {
                    if (!(F.attributes && F.attributes.length)) F.attributes = [];
                    F.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(Y, Y.uint32()));
                    break
                  }
                  case 2: {
                    F.startTimeUnixNano = Y.fixed64();
                    break
                  }
                  case 3: {
                    F.timeUnixNano = Y.fixed64();
                    break
                  }
                  case 4: {
                    F.asDouble = Y.double();
                    break
                  }
                  case 6: {
                    F.asInt = Y.sfixed64();
                    break
                  }
                  case 5: {
                    if (!(F.exemplars && F.exemplars.length)) F.exemplars = [];
                    F.exemplars.push(G1.opentelemetry.proto.metrics.v1.Exemplar.decode(Y, Y.uint32()));
                    break
                  }
                  case 8: {
                    F.flags = Y.uint32();
                    break
                  }
                  default:
                    Y.skipType(X & 7);
                    break
                }
              }
              return F
            }, G.decodeDelimited = function D(Y) {
              if (!(Y instanceof LA)) Y = new LA(Y);
              return this.decode(Y, Y.uint32())
            }, G.verify = function D(Y) {
              if (typeof Y !== "object" || Y === null) return "object expected";
              var W = {};
              if (Y.attributes != null && Y.hasOwnProperty("attributes")) {
                if (!Array.isArray(Y.attributes)) return "attributes: array expected";
                for (var J = 0; J < Y.attributes.length; ++J) {
                  var F = G1.opentelemetry.proto.common.v1.KeyValue.verify(Y.attributes[J]);
                  if (F) return "attributes." + F
                }
              }
              if (Y.startTimeUnixNano != null && Y.hasOwnProperty("startTimeUnixNano")) {
                if (!J1.isInteger(Y.startTimeUnixNano) && !(Y.startTimeUnixNano && J1.isInteger(Y.startTimeUnixNano.low) && J1.isInteger(Y.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
              }
              if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano")) {
                if (!J1.isInteger(Y.timeUnixNano) && !(Y.timeUnixNano && J1.isInteger(Y.timeUnixNano.low) && J1.isInteger(Y.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
              }
              if (Y.asDouble != null && Y.hasOwnProperty("asDouble")) {
                if (W.value = 1, typeof Y.asDouble !== "number") return "asDouble: number expected"
              }
              if (Y.asInt != null && Y.hasOwnProperty("asInt")) {
                if (W.value === 1) return "value: multiple values";
                if (W.value = 1, !J1.isInteger(Y.asInt) && !(Y.asInt && J1.isInteger(Y.asInt.low) && J1.isInteger(Y.asInt.high))) return "asInt: integer|Long expected"
              }
              if (Y.exemplars != null && Y.hasOwnProperty("exemplars")) {
                if (!Array.isArray(Y.exemplars)) return "exemplars: array expected";
                for (var J = 0; J < Y.exemplars.length; ++J) {
                  var F = G1.opentelemetry.proto.metrics.v1.Exemplar.verify(Y.exemplars[J]);
                  if (F) return "exemplars." + F
                }
              }
              if (Y.flags != null && Y.hasOwnProperty("flags")) {
                if (!J1.isInteger(Y.flags)) return "flags: integer expected"
              }
              return null
            }, G.fromObject = function D(Y) {
              if (Y instanceof G1.opentelemetry.proto.metrics.v1.NumberDataPoint) return Y;
              var W = new G1.opentelemetry.proto.metrics.v1.NumberDataPoint;
              if (Y.attributes) {
                if (!Array.isArray(Y.attributes)) throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: array expected");
                W.attributes = [];
                for (var J = 0; J < Y.attributes.length; ++J) {
                  if (typeof Y.attributes[J] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: object expected");
                  W.attributes[J] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(Y.attributes[J])
                }
              }
              if (Y.startTimeUnixNano != null) {
                if (J1.Long)(W.startTimeUnixNano = J1.Long.fromValue(Y.startTimeUnixNano)).unsigned = !1;
                else if (typeof Y.startTimeUnixNano === "string") W.startTimeUnixNano = parseInt(Y.startTimeUnixNano, 10);
                else if (typeof Y.startTimeUnixNano === "number") W.startTimeUnixNano = Y.startTimeUnixNano;
                else if (typeof Y.startTimeUnixNano === "object") W.startTimeUnixNano = new J1.LongBits(Y.startTimeUnixNano.low >>> 0, Y.startTimeUnixNano.high >>> 0).toNumber()
              }
              if (Y.timeUnixNano != null) {
                if (J1.Long)(W.timeUnixNano = J1.Long.fromValue(Y.timeUnixNano)).unsigned = !1;
                else if (typeof Y.timeUnixNano === "string") W.timeUnixNano = parseInt(Y.timeUnixNano, 10);
                else if (typeof Y.timeUnixNano === "number") W.timeUnixNano = Y.timeUnixNano;
                else if (typeof Y.timeUnixNano === "object") W.timeUnixNano = new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber()
              }
              if (Y.asDouble != null) W.asDouble = Number(Y.asDouble);
              if (Y.asInt != null) {
                if (J1.Long)(W.asInt = J1.Long.fromValue(Y.asInt)).unsigned = !1;
                else if (typeof Y.asInt === "string") W.asInt = parseInt(Y.asInt, 10);
                else if (typeof Y.asInt === "number") W.asInt = Y.asInt;
                else if (typeof Y.asInt === "object") W.asInt = new J1.LongBits(Y.asInt.low >>> 0, Y.asInt.high >>> 0).toNumber()
              }
              if (Y.exemplars) {
                if (!Array.isArray(Y.exemplars)) throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: array expected");
                W.exemplars = [];
                for (var J = 0; J < Y.exemplars.length; ++J) {
                  if (typeof Y.exemplars[J] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: object expected");
                  W.exemplars[J] = G1.opentelemetry.proto.metrics.v1.Exemplar.fromObject(Y.exemplars[J])
                }
              }
              if (Y.flags != null) W.flags = Y.flags >>> 0;
              return W
            }, G.toObject = function D(Y, W) {
              if (!W) W = {};
              var J = {};
              if (W.arrays || W.defaults) J.exemplars = [], J.attributes = [];
              if (W.defaults) {
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.startTimeUnixNano = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.startTimeUnixNano = W.longs === String ? "0" : 0;
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.timeUnixNano = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.timeUnixNano = W.longs === String ? "0" : 0;
                J.flags = 0
              }
              if (Y.startTimeUnixNano != null && Y.hasOwnProperty("startTimeUnixNano"))
                if (typeof Y.startTimeUnixNano === "number") J.startTimeUnixNano = W.longs === String ? String(Y.startTimeUnixNano) : Y.startTimeUnixNano;
                else J.startTimeUnixNano = W.longs === String ? J1.Long.prototype.toString.call(Y.startTimeUnixNano) : W.longs === Number ? new J1.LongBits(Y.startTimeUnixNano.low >>> 0, Y.startTimeUnixNano.high >>> 0).toNumber() : Y.startTimeUnixNano;
              if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano"))
                if (typeof Y.timeUnixNano === "number") J.timeUnixNano = W.longs === String ? String(Y.timeUnixNano) : Y.timeUnixNano;
                else J.timeUnixNano = W.longs === String ? J1.Long.prototype.toString.call(Y.timeUnixNano) : W.longs === Number ? new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber() : Y.timeUnixNano;
              if (Y.asDouble != null && Y.hasOwnProperty("asDouble")) {
                if (J.asDouble = W.json && !isFinite(Y.asDouble) ? String(Y.asDouble) : Y.asDouble, W.oneofs) J.value = "asDouble"
              }
              if (Y.exemplars && Y.exemplars.length) {
                J.exemplars = [];
                for (var X = 0; X < Y.exemplars.length; ++X) J.exemplars[X] = G1.opentelemetry.proto.metrics.v1.Exemplar.toObject(Y.exemplars[X], W)
              }
              if (Y.asInt != null && Y.hasOwnProperty("asInt")) {
                if (typeof Y.asInt === "number") J.asInt = W.longs === String ? String(Y.asInt) : Y.asInt;
                else J.asInt = W.longs === String ? J1.Long.prototype.toString.call(Y.asInt) : W.longs === Number ? new J1.LongBits(Y.asInt.low >>> 0, Y.asInt.high >>> 0).toNumber() : Y.asInt;
                if (W.oneofs) J.value = "asInt"
              }
              if (Y.attributes && Y.attributes.length) {
                J.attributes = [];
                for (var X = 0; X < Y.attributes.length; ++X) J.attributes[X] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(Y.attributes[X], W)
              }
              if (Y.flags != null && Y.hasOwnProperty("flags")) J.flags = Y.flags;
              return J
            }, G.prototype.toJSON = function D() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function D(Y) {
              if (Y === void 0) Y = "type.googleapis.com";
              return Y + "/opentelemetry.proto.metrics.v1.NumberDataPoint"
            }, G
          }(), I.HistogramDataPoint = function() {
            function G(D) {
              if (this.attributes = [], this.bucketCounts = [], this.explicitBounds = [], this.exemplars = [], D) {
                for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                  if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
              }
            }
            G.prototype.attributes = J1.emptyArray, G.prototype.startTimeUnixNano = null, G.prototype.timeUnixNano = null, G.prototype.count = null, G.prototype.sum = null, G.prototype.bucketCounts = J1.emptyArray, G.prototype.explicitBounds = J1.emptyArray, G.prototype.exemplars = J1.emptyArray, G.prototype.flags = null, G.prototype.min = null, G.prototype.max = null;
            var Z;
            return Object.defineProperty(G.prototype, "_sum", {
              get: J1.oneOfGetter(Z = ["sum"]),
              set: J1.oneOfSetter(Z)
            }), Object.defineProperty(G.prototype, "_min", {
              get: J1.oneOfGetter(Z = ["min"]),
              set: J1.oneOfSetter(Z)
            }), Object.defineProperty(G.prototype, "_max", {
              get: J1.oneOfGetter(Z = ["max"]),
              set: J1.oneOfSetter(Z)
            }), G.create = function D(Y) {
              return new G(Y)
            }, G.encode = function D(Y, W) {
              if (!W) W = p4.create();
              if (Y.startTimeUnixNano != null && Object.hasOwnProperty.call(Y, "startTimeUnixNano")) W.uint32(17).fixed64(Y.startTimeUnixNano);
              if (Y.timeUnixNano != null && Object.hasOwnProperty.call(Y, "timeUnixNano")) W.uint32(25).fixed64(Y.timeUnixNano);
              if (Y.count != null && Object.hasOwnProperty.call(Y, "count")) W.uint32(33).fixed64(Y.count);
              if (Y.sum != null && Object.hasOwnProperty.call(Y, "sum")) W.uint32(41).double(Y.sum);
              if (Y.bucketCounts != null && Y.bucketCounts.length) {
                W.uint32(50).fork();
                for (var J = 0; J < Y.bucketCounts.length; ++J) W.fixed64(Y.bucketCounts[J]);
                W.ldelim()
              }
              if (Y.explicitBounds != null && Y.explicitBounds.length) {
                W.uint32(58).fork();
                for (var J = 0; J < Y.explicitBounds.length; ++J) W.double(Y.explicitBounds[J]);
                W.ldelim()
              }
              if (Y.exemplars != null && Y.exemplars.length)
                for (var J = 0; J < Y.exemplars.length; ++J) G1.opentelemetry.proto.metrics.v1.Exemplar.encode(Y.exemplars[J], W.uint32(66).fork()).ldelim();
              if (Y.attributes != null && Y.attributes.length)
                for (var J = 0; J < Y.attributes.length; ++J) G1.opentelemetry.proto.common.v1.KeyValue.encode(Y.attributes[J], W.uint32(74).fork()).ldelim();
              if (Y.flags != null && Object.hasOwnProperty.call(Y, "flags")) W.uint32(80).uint32(Y.flags);
              if (Y.min != null && Object.hasOwnProperty.call(Y, "min")) W.uint32(89).double(Y.min);
              if (Y.max != null && Object.hasOwnProperty.call(Y, "max")) W.uint32(97).double(Y.max);
              return W
            }, G.encodeDelimited = function D(Y, W) {
              return this.encode(Y, W).ldelim()
            }, G.decode = function D(Y, W) {
              if (!(Y instanceof LA)) Y = LA.create(Y);
              var J = W === void 0 ? Y.len : Y.pos + W,
                F = new G1.opentelemetry.proto.metrics.v1.HistogramDataPoint;
              while (Y.pos < J) {
                var X = Y.uint32();
                switch (X >>> 3) {
                  case 9: {
                    if (!(F.attributes && F.attributes.length)) F.attributes = [];
                    F.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(Y, Y.uint32()));
                    break
                  }
                  case 2: {
                    F.startTimeUnixNano = Y.fixed64();
                    break
                  }
                  case 3: {
                    F.timeUnixNano = Y.fixed64();
                    break
                  }
                  case 4: {
                    F.count = Y.fixed64();
                    break
                  }
                  case 5: {
                    F.sum = Y.double();
                    break
                  }
                  case 6: {
                    if (!(F.bucketCounts && F.bucketCounts.length)) F.bucketCounts = [];
                    if ((X & 7) === 2) {
                      var V = Y.uint32() + Y.pos;
                      while (Y.pos < V) F.bucketCounts.push(Y.fixed64())
                    } else F.bucketCounts.push(Y.fixed64());
                    break
                  }
                  case 7: {
                    if (!(F.explicitBounds && F.explicitBounds.length)) F.explicitBounds = [];
                    if ((X & 7) === 2) {
                      var V = Y.uint32() + Y.pos;
                      while (Y.pos < V) F.explicitBounds.push(Y.double())
                    } else F.explicitBounds.push(Y.double());
                    break
                  }
                  case 8: {
                    if (!(F.exemplars && F.exemplars.length)) F.exemplars = [];
                    F.exemplars.push(G1.opentelemetry.proto.metrics.v1.Exemplar.decode(Y, Y.uint32()));
                    break
                  }
                  case 10: {
                    F.flags = Y.uint32();
                    break
                  }
                  case 11: {
                    F.min = Y.double();
                    break
                  }
                  case 12: {
                    F.max = Y.double();
                    break
                  }
                  default:
                    Y.skipType(X & 7);
                    break
                }
              }
              return F
            }, G.decodeDelimited = function D(Y) {
              if (!(Y instanceof LA)) Y = new LA(Y);
              return this.decode(Y, Y.uint32())
            }, G.verify = function D(Y) {
              if (typeof Y !== "object" || Y === null) return "object expected";
              var W = {};
              if (Y.attributes != null && Y.hasOwnProperty("attributes")) {
                if (!Array.isArray(Y.attributes)) return "attributes: array expected";
                for (var J = 0; J < Y.attributes.length; ++J) {
                  var F = G1.opentelemetry.proto.common.v1.KeyValue.verify(Y.attributes[J]);
                  if (F) return "attributes." + F
                }
              }
              if (Y.startTimeUnixNano != null && Y.hasOwnProperty("startTimeUnixNano")) {
                if (!J1.isInteger(Y.startTimeUnixNano) && !(Y.startTimeUnixNano && J1.isInteger(Y.startTimeUnixNano.low) && J1.isInteger(Y.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
              }
              if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano")) {
                if (!J1.isInteger(Y.timeUnixNano) && !(Y.timeUnixNano && J1.isInteger(Y.timeUnixNano.low) && J1.isInteger(Y.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
              }
              if (Y.count != null && Y.hasOwnProperty("count")) {
                if (!J1.isInteger(Y.count) && !(Y.count && J1.isInteger(Y.count.low) && J1.isInteger(Y.count.high))) return "count: integer|Long expected"
              }
              if (Y.sum != null && Y.hasOwnProperty("sum")) {
                if (W._sum = 1, typeof Y.sum !== "number") return "sum: number expected"
              }
              if (Y.bucketCounts != null && Y.hasOwnProperty("bucketCounts")) {
                if (!Array.isArray(Y.bucketCounts)) return "bucketCounts: array expected";
                for (var J = 0; J < Y.bucketCounts.length; ++J)
                  if (!J1.isInteger(Y.bucketCounts[J]) && !(Y.bucketCounts[J] && J1.isInteger(Y.bucketCounts[J].low) && J1.isInteger(Y.bucketCounts[J].high))) return "bucketCounts: integer|Long[] expected"
              }
              if (Y.explicitBounds != null && Y.hasOwnProperty("explicitBounds")) {
                if (!Array.isArray(Y.explicitBounds)) return "explicitBounds: array expected";
                for (var J = 0; J < Y.explicitBounds.length; ++J)
                  if (typeof Y.explicitBounds[J] !== "number") return "explicitBounds: number[] expected"
              }
              if (Y.exemplars != null && Y.hasOwnProperty("exemplars")) {
                if (!Array.isArray(Y.exemplars)) return "exemplars: array expected";
                for (var J = 0; J < Y.exemplars.length; ++J) {
                  var F = G1.opentelemetry.proto.metrics.v1.Exemplar.verify(Y.exemplars[J]);
                  if (F) return "exemplars." + F
                }
              }
              if (Y.flags != null && Y.hasOwnProperty("flags")) {
                if (!J1.isInteger(Y.flags)) return "flags: integer expected"
              }
              if (Y.min != null && Y.hasOwnProperty("min")) {
                if (W._min = 1, typeof Y.min !== "number") return "min: number expected"
              }
              if (Y.max != null && Y.hasOwnProperty("max")) {
                if (W._max = 1, typeof Y.max !== "number") return "max: number expected"
              }
              return null
            }, G.fromObject = function D(Y) {
              if (Y instanceof G1.opentelemetry.proto.metrics.v1.HistogramDataPoint) return Y;
              var W = new G1.opentelemetry.proto.metrics.v1.HistogramDataPoint;
              if (Y.attributes) {
                if (!Array.isArray(Y.attributes)) throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: array expected");
                W.attributes = [];
                for (var J = 0; J < Y.attributes.length; ++J) {
                  if (typeof Y.attributes[J] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: object expected");
                  W.attributes[J] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(Y.attributes[J])
                }
              }
              if (Y.startTimeUnixNano != null) {
                if (J1.Long)(W.startTimeUnixNano = J1.Long.fromValue(Y.startTimeUnixNano)).unsigned = !1;
                else if (typeof Y.startTimeUnixNano === "string") W.startTimeUnixNano = parseInt(Y.startTimeUnixNano, 10);
                else if (typeof Y.startTimeUnixNano === "number") W.startTimeUnixNano = Y.startTimeUnixNano;
                else if (typeof Y.startTimeUnixNano === "object") W.startTimeUnixNano = new J1.LongBits(Y.startTimeUnixNano.low >>> 0, Y.startTimeUnixNano.high >>> 0).toNumber()
              }
              if (Y.timeUnixNano != null) {
                if (J1.Long)(W.timeUnixNano = J1.Long.fromValue(Y.timeUnixNano)).unsigned = !1;
                else if (typeof Y.timeUnixNano === "string") W.timeUnixNano = parseInt(Y.timeUnixNano, 10);
                else if (typeof Y.timeUnixNano === "number") W.timeUnixNano = Y.timeUnixNano;
                else if (typeof Y.timeUnixNano === "object") W.timeUnixNano = new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber()
              }
              if (Y.count != null) {
                if (J1.Long)(W.count = J1.Long.fromValue(Y.count)).unsigned = !1;
                else if (typeof Y.count === "string") W.count = parseInt(Y.count, 10);
                else if (typeof Y.count === "number") W.count = Y.count;
                else if (typeof Y.count === "object") W.count = new J1.LongBits(Y.count.low >>> 0, Y.count.high >>> 0).toNumber()
              }
              if (Y.sum != null) W.sum = Number(Y.sum);
              if (Y.bucketCounts) {
                if (!Array.isArray(Y.bucketCounts)) throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.bucketCounts: array expected");
                W.bucketCounts = [];
                for (var J = 0; J < Y.bucketCounts.length; ++J)
                  if (J1.Long)(W.bucketCounts[J] = J1.Long.fromValue(Y.bucketCounts[J])).unsigned = !1;
                  else if (typeof Y.bucketCounts[J] === "string") W.bucketCounts[J] = parseInt(Y.bucketCounts[J], 10);
                else if (typeof Y.bucketCounts[J] === "number") W.bucketCounts[J] = Y.bucketCounts[J];
                else if (typeof Y.bucketCounts[J] === "object") W.bucketCounts[J] = new J1.LongBits(Y.bucketCounts[J].low >>> 0, Y.bucketCounts[J].high >>> 0).toNumber()
              }
              if (Y.explicitBounds) {
                if (!Array.isArray(Y.explicitBounds)) throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.explicitBounds: array expected");
                W.explicitBounds = [];
                for (var J = 0; J < Y.explicitBounds.length; ++J) W.explicitBounds[J] = Number(Y.explicitBounds[J])
              }
              if (Y.exemplars) {
                if (!Array.isArray(Y.exemplars)) throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: array expected");
                W.exemplars = [];
                for (var J = 0; J < Y.exemplars.length; ++J) {
                  if (typeof Y.exemplars[J] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: object expected");
                  W.exemplars[J] = G1.opentelemetry.proto.metrics.v1.Exemplar.fromObject(Y.exemplars[J])
                }
              }
              if (Y.flags != null) W.flags = Y.flags >>> 0;
              if (Y.min != null) W.min = Number(Y.min);
              if (Y.max != null) W.max = Number(Y.max);
              return W
            }, G.toObject = function D(Y, W) {
              if (!W) W = {};
              var J = {};
              if (W.arrays || W.defaults) J.bucketCounts = [], J.explicitBounds = [], J.exemplars = [], J.attributes = [];
              if (W.defaults) {
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.startTimeUnixNano = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.startTimeUnixNano = W.longs === String ? "0" : 0;
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.timeUnixNano = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.timeUnixNano = W.longs === String ? "0" : 0;
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.count = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.count = W.longs === String ? "0" : 0;
                J.flags = 0
              }
              if (Y.startTimeUnixNano != null && Y.hasOwnProperty("startTimeUnixNano"))
                if (typeof Y.startTimeUnixNano === "number") J.startTimeUnixNano = W.longs === String ? String(Y.startTimeUnixNano) : Y.startTimeUnixNano;
                else J.startTimeUnixNano = W.longs === String ? J1.Long.prototype.toString.call(Y.startTimeUnixNano) : W.longs === Number ? new J1.LongBits(Y.startTimeUnixNano.low >>> 0, Y.startTimeUnixNano.high >>> 0).toNumber() : Y.startTimeUnixNano;
              if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano"))
                if (typeof Y.timeUnixNano === "number") J.timeUnixNano = W.longs === String ? String(Y.timeUnixNano) : Y.timeUnixNano;
                else J.timeUnixNano = W.longs === String ? J1.Long.prototype.toString.call(Y.timeUnixNano) : W.longs === Number ? new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber() : Y.timeUnixNano;
              if (Y.count != null && Y.hasOwnProperty("count"))
                if (typeof Y.count === "number") J.count = W.longs === String ? String(Y.count) : Y.count;
                else J.count = W.longs === String ? J1.Long.prototype.toString.call(Y.count) : W.longs === Number ? new J1.LongBits(Y.count.low >>> 0, Y.count.high >>> 0).toNumber() : Y.count;
              if (Y.sum != null && Y.hasOwnProperty("sum")) {
                if (J.sum = W.json && !isFinite(Y.sum) ? String(Y.sum) : Y.sum, W.oneofs) J._sum = "sum"
              }
              if (Y.bucketCounts && Y.bucketCounts.length) {
                J.bucketCounts = [];
                for (var X = 0; X < Y.bucketCounts.length; ++X)
                  if (typeof Y.bucketCounts[X] === "number") J.bucketCounts[X] = W.longs === String ? String(Y.bucketCounts[X]) : Y.bucketCounts[X];
                  else J.bucketCounts[X] = W.longs === String ? J1.Long.prototype.toString.call(Y.bucketCounts[X]) : W.longs === Number ? new J1.LongBits(Y.bucketCounts[X].low >>> 0, Y.bucketCounts[X].high >>> 0).toNumber() : Y.bucketCounts[X]
              }
              if (Y.explicitBounds && Y.explicitBounds.length) {
                J.explicitBounds = [];
                for (var X = 0; X < Y.explicitBounds.length; ++X) J.explicitBounds[X] = W.json && !isFinite(Y.explicitBounds[X]) ? String(Y.explicitBounds[X]) : Y.explicitBounds[X]
              }
              if (Y.exemplars && Y.exemplars.length) {
                J.exemplars = [];
                for (var X = 0; X < Y.exemplars.length; ++X) J.exemplars[X] = G1.opentelemetry.proto.metrics.v1.Exemplar.toObject(Y.exemplars[X], W)
              }
              if (Y.attributes && Y.attributes.length) {
                J.attributes = [];
                for (var X = 0; X < Y.attributes.length; ++X) J.attributes[X] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(Y.attributes[X], W)
              }
              if (Y.flags != null && Y.hasOwnProperty("flags")) J.flags = Y.flags;
              if (Y.min != null && Y.hasOwnProperty("min")) {
                if (J.min = W.json && !isFinite(Y.min) ? String(Y.min) : Y.min, W.oneofs) J._min = "min"
              }
              if (Y.max != null && Y.hasOwnProperty("max")) {
                if (J.max = W.json && !isFinite(Y.max) ? String(Y.max) : Y.max, W.oneofs) J._max = "max"
              }
              return J
            }, G.prototype.toJSON = function D() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function D(Y) {
              if (Y === void 0) Y = "type.googleapis.com";
              return Y + "/opentelemetry.proto.metrics.v1.HistogramDataPoint"
            }, G
          }(), I.ExponentialHistogramDataPoint = function() {
            function G(D) {
              if (this.attributes = [], this.exemplars = [], D) {
                for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                  if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
              }
            }
            G.prototype.attributes = J1.emptyArray, G.prototype.startTimeUnixNano = null, G.prototype.timeUnixNano = null, G.prototype.count = null, G.prototype.sum = null, G.prototype.scale = null, G.prototype.zeroCount = null, G.prototype.positive = null, G.prototype.negative = null, G.prototype.flags = null, G.prototype.exemplars = J1.emptyArray, G.prototype.min = null, G.prototype.max = null, G.prototype.zeroThreshold = null;
            var Z;
            return Object.defineProperty(G.prototype, "_sum", {
              get: J1.oneOfGetter(Z = ["sum"]),
              set: J1.oneOfSetter(Z)
            }), Object.defineProperty(G.prototype, "_min", {
              get: J1.oneOfGetter(Z = ["min"]),
              set: J1.oneOfSetter(Z)
            }), Object.defineProperty(G.prototype, "_max", {
              get: J1.oneOfGetter(Z = ["max"]),
              set: J1.oneOfSetter(Z)
            }), G.create = function D(Y) {
              return new G(Y)
            }, G.encode = function D(Y, W) {
              if (!W) W = p4.create();
              if (Y.attributes != null && Y.attributes.length)
                for (var J = 0; J < Y.attributes.length; ++J) G1.opentelemetry.proto.common.v1.KeyValue.encode(Y.attributes[J], W.uint32(10).fork()).ldelim();
              if (Y.startTimeUnixNano != null && Object.hasOwnProperty.call(Y, "startTimeUnixNano")) W.uint32(17).fixed64(Y.startTimeUnixNano);
              if (Y.timeUnixNano != null && Object.hasOwnProperty.call(Y, "timeUnixNano")) W.uint32(25).fixed64(Y.timeUnixNano);
              if (Y.count != null && Object.hasOwnProperty.call(Y, "count")) W.uint32(33).fixed64(Y.count);
              if (Y.sum != null && Object.hasOwnProperty.call(Y, "sum")) W.uint32(41).double(Y.sum);
              if (Y.scale != null && Object.hasOwnProperty.call(Y, "scale")) W.uint32(48).sint32(Y.scale);
              if (Y.zeroCount != null && Object.hasOwnProperty.call(Y, "zeroCount")) W.uint32(57).fixed64(Y.zeroCount);
              if (Y.positive != null && Object.hasOwnProperty.call(Y, "positive")) G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(Y.positive, W.uint32(66).fork()).ldelim();
              if (Y.negative != null && Object.hasOwnProperty.call(Y, "negative")) G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(Y.negative, W.uint32(74).fork()).ldelim();
              if (Y.flags != null && Object.hasOwnProperty.call(Y, "flags")) W.uint32(80).uint32(Y.flags);
              if (Y.exemplars != null && Y.exemplars.length)
                for (var J = 0; J < Y.exemplars.length; ++J) G1.opentelemetry.proto.metrics.v1.Exemplar.encode(Y.exemplars[J], W.uint32(90).fork()).ldelim();
              if (Y.min != null && Object.hasOwnProperty.call(Y, "min")) W.uint32(97).double(Y.min);
              if (Y.max != null && Object.hasOwnProperty.call(Y, "max")) W.uint32(105).double(Y.max);
              if (Y.zeroThreshold != null && Object.hasOwnProperty.call(Y, "zeroThreshold")) W.uint32(113).double(Y.zeroThreshold);
              return W
            }, G.encodeDelimited = function D(Y, W) {
              return this.encode(Y, W).ldelim()
            }, G.decode = function D(Y, W) {
              if (!(Y instanceof LA)) Y = LA.create(Y);
              var J = W === void 0 ? Y.len : Y.pos + W,
                F = new G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint;
              while (Y.pos < J) {
                var X = Y.uint32();
                switch (X >>> 3) {
                  case 1: {
                    if (!(F.attributes && F.attributes.length)) F.attributes = [];
                    F.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(Y, Y.uint32()));
                    break
                  }
                  case 2: {
                    F.startTimeUnixNano = Y.fixed64();
                    break
                  }
                  case 3: {
                    F.timeUnixNano = Y.fixed64();
                    break
                  }
                  case 4: {
                    F.count = Y.fixed64();
                    break
                  }
                  case 5: {
                    F.sum = Y.double();
                    break
                  }
                  case 6: {
                    F.scale = Y.sint32();
                    break
                  }
                  case 7: {
                    F.zeroCount = Y.fixed64();
                    break
                  }
                  case 8: {
                    F.positive = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(Y, Y.uint32());
                    break
                  }
                  case 9: {
                    F.negative = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(Y, Y.uint32());
                    break
                  }
                  case 10: {
                    F.flags = Y.uint32();
                    break
                  }
                  case 11: {
                    if (!(F.exemplars && F.exemplars.length)) F.exemplars = [];
                    F.exemplars.push(G1.opentelemetry.proto.metrics.v1.Exemplar.decode(Y, Y.uint32()));
                    break
                  }
                  case 12: {
                    F.min = Y.double();
                    break
                  }
                  case 13: {
                    F.max = Y.double();
                    break
                  }
                  case 14: {
                    F.zeroThreshold = Y.double();
                    break
                  }
                  default:
                    Y.skipType(X & 7);
                    break
                }
              }
              return F
            }, G.decodeDelimited = function D(Y) {
              if (!(Y instanceof LA)) Y = new LA(Y);
              return this.decode(Y, Y.uint32())
            }, G.verify = function D(Y) {
              if (typeof Y !== "object" || Y === null) return "object expected";
              var W = {};
              if (Y.attributes != null && Y.hasOwnProperty("attributes")) {
                if (!Array.isArray(Y.attributes)) return "attributes: array expected";
                for (var J = 0; J < Y.attributes.length; ++J) {
                  var F = G1.opentelemetry.proto.common.v1.KeyValue.verify(Y.attributes[J]);
                  if (F) return "attributes." + F
                }
              }
              if (Y.startTimeUnixNano != null && Y.hasOwnProperty("startTimeUnixNano")) {
                if (!J1.isInteger(Y.startTimeUnixNano) && !(Y.startTimeUnixNano && J1.isInteger(Y.startTimeUnixNano.low) && J1.isInteger(Y.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
              }
              if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano")) {
                if (!J1.isInteger(Y.timeUnixNano) && !(Y.timeUnixNano && J1.isInteger(Y.timeUnixNano.low) && J1.isInteger(Y.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
              }
              if (Y.count != null && Y.hasOwnProperty("count")) {
                if (!J1.isInteger(Y.count) && !(Y.count && J1.isInteger(Y.count.low) && J1.isInteger(Y.count.high))) return "count: integer|Long expected"
              }
              if (Y.sum != null && Y.hasOwnProperty("sum")) {
                if (W._sum = 1, typeof Y.sum !== "number") return "sum: number expected"
              }
              if (Y.scale != null && Y.hasOwnProperty("scale")) {
                if (!J1.isInteger(Y.scale)) return "scale: integer expected"
              }
              if (Y.zeroCount != null && Y.hasOwnProperty("zeroCount")) {
                if (!J1.isInteger(Y.zeroCount) && !(Y.zeroCount && J1.isInteger(Y.zeroCount.low) && J1.isInteger(Y.zeroCount.high))) return "zeroCount: integer|Long expected"
              }
              if (Y.positive != null && Y.hasOwnProperty("positive")) {
                var F = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(Y.positive);
                if (F) return "positive." + F
              }
              if (Y.negative != null && Y.hasOwnProperty("negative")) {
                var F = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(Y.negative);
                if (F) return "negative." + F
              }
              if (Y.flags != null && Y.hasOwnProperty("flags")) {
                if (!J1.isInteger(Y.flags)) return "flags: integer expected"
              }
              if (Y.exemplars != null && Y.hasOwnProperty("exemplars")) {
                if (!Array.isArray(Y.exemplars)) return "exemplars: array expected";
                for (var J = 0; J < Y.exemplars.length; ++J) {
                  var F = G1.opentelemetry.proto.metrics.v1.Exemplar.verify(Y.exemplars[J]);
                  if (F) return "exemplars." + F
                }
              }
              if (Y.min != null && Y.hasOwnProperty("min")) {
                if (W._min = 1, typeof Y.min !== "number") return "min: number expected"
              }
              if (Y.max != null && Y.hasOwnProperty("max")) {
                if (W._max = 1, typeof Y.max !== "number") return "max: number expected"
              }
              if (Y.zeroThreshold != null && Y.hasOwnProperty("zeroThreshold")) {
                if (typeof Y.zeroThreshold !== "number") return "zeroThreshold: number expected"
              }
              return null
            }, G.fromObject = function D(Y) {
              if (Y instanceof G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint) return Y;
              var W = new G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint;
              if (Y.attributes) {
                if (!Array.isArray(Y.attributes)) throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: array expected");
                W.attributes = [];
                for (var J = 0; J < Y.attributes.length; ++J) {
                  if (typeof Y.attributes[J] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: object expected");
                  W.attributes[J] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(Y.attributes[J])
                }
              }
              if (Y.startTimeUnixNano != null) {
                if (J1.Long)(W.startTimeUnixNano = J1.Long.fromValue(Y.startTimeUnixNano)).unsigned = !1;
                else if (typeof Y.startTimeUnixNano === "string") W.startTimeUnixNano = parseInt(Y.startTimeUnixNano, 10);
                else if (typeof Y.startTimeUnixNano === "number") W.startTimeUnixNano = Y.startTimeUnixNano;
                else if (typeof Y.startTimeUnixNano === "object") W.startTimeUnixNano = new J1.LongBits(Y.startTimeUnixNano.low >>> 0, Y.startTimeUnixNano.high >>> 0).toNumber()
              }
              if (Y.timeUnixNano != null) {
                if (J1.Long)(W.timeUnixNano = J1.Long.fromValue(Y.timeUnixNano)).unsigned = !1;
                else if (typeof Y.timeUnixNano === "string") W.timeUnixNano = parseInt(Y.timeUnixNano, 10);
                else if (typeof Y.timeUnixNano === "number") W.timeUnixNano = Y.timeUnixNano;
                else if (typeof Y.timeUnixNano === "object") W.timeUnixNano = new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber()
              }
              if (Y.count != null) {
                if (J1.Long)(W.count = J1.Long.fromValue(Y.count)).unsigned = !1;
                else if (typeof Y.count === "string") W.count = parseInt(Y.count, 10);
                else if (typeof Y.count === "number") W.count = Y.count;
                else if (typeof Y.count === "object") W.count = new J1.LongBits(Y.count.low >>> 0, Y.count.high >>> 0).toNumber()
              }
              if (Y.sum != null) W.sum = Number(Y.sum);
              if (Y.scale != null) W.scale = Y.scale | 0;
              if (Y.zeroCount != null) {
                if (J1.Long)(W.zeroCount = J1.Long.fromValue(Y.zeroCount)).unsigned = !1;
                else if (typeof Y.zeroCount === "string") W.zeroCount = parseInt(Y.zeroCount, 10);
                else if (typeof Y.zeroCount === "number") W.zeroCount = Y.zeroCount;
                else if (typeof Y.zeroCount === "object") W.zeroCount = new J1.LongBits(Y.zeroCount.low >>> 0, Y.zeroCount.high >>> 0).toNumber()
              }
              if (Y.positive != null) {
                if (typeof Y.positive !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.positive: object expected");
                W.positive = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(Y.positive)
              }
              if (Y.negative != null) {
                if (typeof Y.negative !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.negative: object expected");
                W.negative = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(Y.negative)
              }
              if (Y.flags != null) W.flags = Y.flags >>> 0;
              if (Y.exemplars) {
                if (!Array.isArray(Y.exemplars)) throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: array expected");
                W.exemplars = [];
                for (var J = 0; J < Y.exemplars.length; ++J) {
                  if (typeof Y.exemplars[J] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: object expected");
                  W.exemplars[J] = G1.opentelemetry.proto.metrics.v1.Exemplar.fromObject(Y.exemplars[J])
                }
              }
              if (Y.min != null) W.min = Number(Y.min);
              if (Y.max != null) W.max = Number(Y.max);
              if (Y.zeroThreshold != null) W.zeroThreshold = Number(Y.zeroThreshold);
              return W
            }, G.toObject = function D(Y, W) {
              if (!W) W = {};
              var J = {};
              if (W.arrays || W.defaults) J.attributes = [], J.exemplars = [];
              if (W.defaults) {
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.startTimeUnixNano = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.startTimeUnixNano = W.longs === String ? "0" : 0;
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.timeUnixNano = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.timeUnixNano = W.longs === String ? "0" : 0;
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.count = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.count = W.longs === String ? "0" : 0;
                if (J.scale = 0, J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.zeroCount = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.zeroCount = W.longs === String ? "0" : 0;
                J.positive = null, J.negative = null, J.flags = 0, J.zeroThreshold = 0
              }
              if (Y.attributes && Y.attributes.length) {
                J.attributes = [];
                for (var X = 0; X < Y.attributes.length; ++X) J.attributes[X] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(Y.attributes[X], W)
              }
              if (Y.startTimeUnixNano != null && Y.hasOwnProperty("startTimeUnixNano"))
                if (typeof Y.startTimeUnixNano === "number") J.startTimeUnixNano = W.longs === String ? String(Y.startTimeUnixNano) : Y.startTimeUnixNano;
                else J.startTimeUnixNano = W.longs === String ? J1.Long.prototype.toString.call(Y.startTimeUnixNano) : W.longs === Number ? new J1.LongBits(Y.startTimeUnixNano.low >>> 0, Y.startTimeUnixNano.high >>> 0).toNumber() : Y.startTimeUnixNano;
              if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano"))
                if (typeof Y.timeUnixNano === "number") J.timeUnixNano = W.longs === String ? String(Y.timeUnixNano) : Y.timeUnixNano;
                else J.timeUnixNano = W.longs === String ? J1.Long.prototype.toString.call(Y.timeUnixNano) : W.longs === Number ? new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber() : Y.timeUnixNano;
              if (Y.count != null && Y.hasOwnProperty("count"))
                if (typeof Y.count === "number") J.count = W.longs === String ? String(Y.count) : Y.count;
                else J.count = W.longs === String ? J1.Long.prototype.toString.call(Y.count) : W.longs === Number ? new J1.LongBits(Y.count.low >>> 0, Y.count.high >>> 0).toNumber() : Y.count;
              if (Y.sum != null && Y.hasOwnProperty("sum")) {
                if (J.sum = W.json && !isFinite(Y.sum) ? String(Y.sum) : Y.sum, W.oneofs) J._sum = "sum"
              }
              if (Y.scale != null && Y.hasOwnProperty("scale")) J.scale = Y.scale;
              if (Y.zeroCount != null && Y.hasOwnProperty("zeroCount"))
                if (typeof Y.zeroCount === "number") J.zeroCount = W.longs === String ? String(Y.zeroCount) : Y.zeroCount;
                else J.zeroCount = W.longs === String ? J1.Long.prototype.toString.call(Y.zeroCount) : W.longs === Number ? new J1.LongBits(Y.zeroCount.low >>> 0, Y.zeroCount.high >>> 0).toNumber() : Y.zeroCount;
              if (Y.positive != null && Y.hasOwnProperty("positive")) J.positive = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(Y.positive, W);
              if (Y.negative != null && Y.hasOwnProperty("negative")) J.negative = G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(Y.negative, W);
              if (Y.flags != null && Y.hasOwnProperty("flags")) J.flags = Y.flags;
              if (Y.exemplars && Y.exemplars.length) {
                J.exemplars = [];
                for (var X = 0; X < Y.exemplars.length; ++X) J.exemplars[X] = G1.opentelemetry.proto.metrics.v1.Exemplar.toObject(Y.exemplars[X], W)
              }
              if (Y.min != null && Y.hasOwnProperty("min")) {
                if (J.min = W.json && !isFinite(Y.min) ? String(Y.min) : Y.min, W.oneofs) J._min = "min"
              }
              if (Y.max != null && Y.hasOwnProperty("max")) {
                if (J.max = W.json && !isFinite(Y.max) ? String(Y.max) : Y.max, W.oneofs) J._max = "max"
              }
              if (Y.zeroThreshold != null && Y.hasOwnProperty("zeroThreshold")) J.zeroThreshold = W.json && !isFinite(Y.zeroThreshold) ? String(Y.zeroThreshold) : Y.zeroThreshold;
              return J
            }, G.prototype.toJSON = function D() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function D(Y) {
              if (Y === void 0) Y = "type.googleapis.com";
              return Y + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint"
            }, G.Buckets = function() {
              function D(Y) {
                if (this.bucketCounts = [], Y) {
                  for (var W = Object.keys(Y), J = 0; J < W.length; ++J)
                    if (Y[W[J]] != null) this[W[J]] = Y[W[J]]
                }
              }
              return D.prototype.offset = null, D.prototype.bucketCounts = J1.emptyArray, D.create = function Y(W) {
                return new D(W)
              }, D.encode = function Y(W, J) {
                if (!J) J = p4.create();
                if (W.offset != null && Object.hasOwnProperty.call(W, "offset")) J.uint32(8).sint32(W.offset);
                if (W.bucketCounts != null && W.bucketCounts.length) {
                  J.uint32(18).fork();
                  for (var F = 0; F < W.bucketCounts.length; ++F) J.uint64(W.bucketCounts[F]);
                  J.ldelim()
                }
                return J
              }, D.encodeDelimited = function Y(W, J) {
                return this.encode(W, J).ldelim()
              }, D.decode = function Y(W, J) {
                if (!(W instanceof LA)) W = LA.create(W);
                var F = J === void 0 ? W.len : W.pos + J,
                  X = new G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets;
                while (W.pos < F) {
                  var V = W.uint32();
                  switch (V >>> 3) {
                    case 1: {
                      X.offset = W.sint32();
                      break
                    }
                    case 2: {
                      if (!(X.bucketCounts && X.bucketCounts.length)) X.bucketCounts = [];
                      if ((V & 7) === 2) {
                        var C = W.uint32() + W.pos;
                        while (W.pos < C) X.bucketCounts.push(W.uint64())
                      } else X.bucketCounts.push(W.uint64());
                      break
                    }
                    default:
                      W.skipType(V & 7);
                      break
                  }
                }
                return X
              }, D.decodeDelimited = function Y(W) {
                if (!(W instanceof LA)) W = new LA(W);
                return this.decode(W, W.uint32())
              }, D.verify = function Y(W) {
                if (typeof W !== "object" || W === null) return "object expected";
                if (W.offset != null && W.hasOwnProperty("offset")) {
                  if (!J1.isInteger(W.offset)) return "offset: integer expected"
                }
                if (W.bucketCounts != null && W.hasOwnProperty("bucketCounts")) {
                  if (!Array.isArray(W.bucketCounts)) return "bucketCounts: array expected";
                  for (var J = 0; J < W.bucketCounts.length; ++J)
                    if (!J1.isInteger(W.bucketCounts[J]) && !(W.bucketCounts[J] && J1.isInteger(W.bucketCounts[J].low) && J1.isInteger(W.bucketCounts[J].high))) return "bucketCounts: integer|Long[] expected"
                }
                return null
              }, D.fromObject = function Y(W) {
                if (W instanceof G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets) return W;
                var J = new G1.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets;
                if (W.offset != null) J.offset = W.offset | 0;
                if (W.bucketCounts) {
                  if (!Array.isArray(W.bucketCounts)) throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.bucketCounts: array expected");
                  J.bucketCounts = [];
                  for (var F = 0; F < W.bucketCounts.length; ++F)
                    if (J1.Long)(J.bucketCounts[F] = J1.Long.fromValue(W.bucketCounts[F])).unsigned = !0;
                    else if (typeof W.bucketCounts[F] === "string") J.bucketCounts[F] = parseInt(W.bucketCounts[F], 10);
                  else if (typeof W.bucketCounts[F] === "number") J.bucketCounts[F] = W.bucketCounts[F];
                  else if (typeof W.bucketCounts[F] === "object") J.bucketCounts[F] = new J1.LongBits(W.bucketCounts[F].low >>> 0, W.bucketCounts[F].high >>> 0).toNumber(!0)
                }
                return J
              }, D.toObject = function Y(W, J) {
                if (!J) J = {};
                var F = {};
                if (J.arrays || J.defaults) F.bucketCounts = [];
                if (J.defaults) F.offset = 0;
                if (W.offset != null && W.hasOwnProperty("offset")) F.offset = W.offset;
                if (W.bucketCounts && W.bucketCounts.length) {
                  F.bucketCounts = [];
                  for (var X = 0; X < W.bucketCounts.length; ++X)
                    if (typeof W.bucketCounts[X] === "number") F.bucketCounts[X] = J.longs === String ? String(W.bucketCounts[X]) : W.bucketCounts[X];
                    else F.bucketCounts[X] = J.longs === String ? J1.Long.prototype.toString.call(W.bucketCounts[X]) : J.longs === Number ? new J1.LongBits(W.bucketCounts[X].low >>> 0, W.bucketCounts[X].high >>> 0).toNumber(!0) : W.bucketCounts[X]
                }
                return F
              }, D.prototype.toJSON = function Y() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, D.getTypeUrl = function Y(W) {
                if (W === void 0) W = "type.googleapis.com";
                return W + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets"
              }, D
            }(), G
          }(), I.SummaryDataPoint = function() {
            function G(Z) {
              if (this.attributes = [], this.quantileValues = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.attributes = J1.emptyArray, G.prototype.startTimeUnixNano = null, G.prototype.timeUnixNano = null, G.prototype.count = null, G.prototype.sum = null, G.prototype.quantileValues = J1.emptyArray, G.prototype.flags = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.startTimeUnixNano != null && Object.hasOwnProperty.call(D, "startTimeUnixNano")) Y.uint32(17).fixed64(D.startTimeUnixNano);
              if (D.timeUnixNano != null && Object.hasOwnProperty.call(D, "timeUnixNano")) Y.uint32(25).fixed64(D.timeUnixNano);
              if (D.count != null && Object.hasOwnProperty.call(D, "count")) Y.uint32(33).fixed64(D.count);
              if (D.sum != null && Object.hasOwnProperty.call(D, "sum")) Y.uint32(41).double(D.sum);
              if (D.quantileValues != null && D.quantileValues.length)
                for (var W = 0; W < D.quantileValues.length; ++W) G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.encode(D.quantileValues[W], Y.uint32(50).fork()).ldelim();
              if (D.attributes != null && D.attributes.length)
                for (var W = 0; W < D.attributes.length; ++W) G1.opentelemetry.proto.common.v1.KeyValue.encode(D.attributes[W], Y.uint32(58).fork()).ldelim();
              if (D.flags != null && Object.hasOwnProperty.call(D, "flags")) Y.uint32(64).uint32(D.flags);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.metrics.v1.SummaryDataPoint;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 7: {
                    if (!(J.attributes && J.attributes.length)) J.attributes = [];
                    J.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(D, D.uint32()));
                    break
                  }
                  case 2: {
                    J.startTimeUnixNano = D.fixed64();
                    break
                  }
                  case 3: {
                    J.timeUnixNano = D.fixed64();
                    break
                  }
                  case 4: {
                    J.count = D.fixed64();
                    break
                  }
                  case 5: {
                    J.sum = D.double();
                    break
                  }
                  case 6: {
                    if (!(J.quantileValues && J.quantileValues.length)) J.quantileValues = [];
                    J.quantileValues.push(G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.decode(D, D.uint32()));
                    break
                  }
                  case 8: {
                    J.flags = D.uint32();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.attributes != null && D.hasOwnProperty("attributes")) {
                if (!Array.isArray(D.attributes)) return "attributes: array expected";
                for (var Y = 0; Y < D.attributes.length; ++Y) {
                  var W = G1.opentelemetry.proto.common.v1.KeyValue.verify(D.attributes[Y]);
                  if (W) return "attributes." + W
                }
              }
              if (D.startTimeUnixNano != null && D.hasOwnProperty("startTimeUnixNano")) {
                if (!J1.isInteger(D.startTimeUnixNano) && !(D.startTimeUnixNano && J1.isInteger(D.startTimeUnixNano.low) && J1.isInteger(D.startTimeUnixNano.high))) return "startTimeUnixNano: integer|Long expected"
              }
              if (D.timeUnixNano != null && D.hasOwnProperty("timeUnixNano")) {
                if (!J1.isInteger(D.timeUnixNano) && !(D.timeUnixNano && J1.isInteger(D.timeUnixNano.low) && J1.isInteger(D.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
              }
              if (D.count != null && D.hasOwnProperty("count")) {
                if (!J1.isInteger(D.count) && !(D.count && J1.isInteger(D.count.low) && J1.isInteger(D.count.high))) return "count: integer|Long expected"
              }
              if (D.sum != null && D.hasOwnProperty("sum")) {
                if (typeof D.sum !== "number") return "sum: number expected"
              }
              if (D.quantileValues != null && D.hasOwnProperty("quantileValues")) {
                if (!Array.isArray(D.quantileValues)) return "quantileValues: array expected";
                for (var Y = 0; Y < D.quantileValues.length; ++Y) {
                  var W = G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.verify(D.quantileValues[Y]);
                  if (W) return "quantileValues." + W
                }
              }
              if (D.flags != null && D.hasOwnProperty("flags")) {
                if (!J1.isInteger(D.flags)) return "flags: integer expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.metrics.v1.SummaryDataPoint) return D;
              var Y = new G1.opentelemetry.proto.metrics.v1.SummaryDataPoint;
              if (D.attributes) {
                if (!Array.isArray(D.attributes)) throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: array expected");
                Y.attributes = [];
                for (var W = 0; W < D.attributes.length; ++W) {
                  if (typeof D.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: object expected");
                  Y.attributes[W] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(D.attributes[W])
                }
              }
              if (D.startTimeUnixNano != null) {
                if (J1.Long)(Y.startTimeUnixNano = J1.Long.fromValue(D.startTimeUnixNano)).unsigned = !1;
                else if (typeof D.startTimeUnixNano === "string") Y.startTimeUnixNano = parseInt(D.startTimeUnixNano, 10);
                else if (typeof D.startTimeUnixNano === "number") Y.startTimeUnixNano = D.startTimeUnixNano;
                else if (typeof D.startTimeUnixNano === "object") Y.startTimeUnixNano = new J1.LongBits(D.startTimeUnixNano.low >>> 0, D.startTimeUnixNano.high >>> 0).toNumber()
              }
              if (D.timeUnixNano != null) {
                if (J1.Long)(Y.timeUnixNano = J1.Long.fromValue(D.timeUnixNano)).unsigned = !1;
                else if (typeof D.timeUnixNano === "string") Y.timeUnixNano = parseInt(D.timeUnixNano, 10);
                else if (typeof D.timeUnixNano === "number") Y.timeUnixNano = D.timeUnixNano;
                else if (typeof D.timeUnixNano === "object") Y.timeUnixNano = new J1.LongBits(D.timeUnixNano.low >>> 0, D.timeUnixNano.high >>> 0).toNumber()
              }
              if (D.count != null) {
                if (J1.Long)(Y.count = J1.Long.fromValue(D.count)).unsigned = !1;
                else if (typeof D.count === "string") Y.count = parseInt(D.count, 10);
                else if (typeof D.count === "number") Y.count = D.count;
                else if (typeof D.count === "object") Y.count = new J1.LongBits(D.count.low >>> 0, D.count.high >>> 0).toNumber()
              }
              if (D.sum != null) Y.sum = Number(D.sum);
              if (D.quantileValues) {
                if (!Array.isArray(D.quantileValues)) throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: array expected");
                Y.quantileValues = [];
                for (var W = 0; W < D.quantileValues.length; ++W) {
                  if (typeof D.quantileValues[W] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: object expected");
                  Y.quantileValues[W] = G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.fromObject(D.quantileValues[W])
                }
              }
              if (D.flags != null) Y.flags = D.flags >>> 0;
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.quantileValues = [], W.attributes = [];
              if (Y.defaults) {
                if (J1.Long) {
                  var J = new J1.Long(0, 0, !1);
                  W.startTimeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                } else W.startTimeUnixNano = Y.longs === String ? "0" : 0;
                if (J1.Long) {
                  var J = new J1.Long(0, 0, !1);
                  W.timeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                } else W.timeUnixNano = Y.longs === String ? "0" : 0;
                if (J1.Long) {
                  var J = new J1.Long(0, 0, !1);
                  W.count = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                } else W.count = Y.longs === String ? "0" : 0;
                W.sum = 0, W.flags = 0
              }
              if (D.startTimeUnixNano != null && D.hasOwnProperty("startTimeUnixNano"))
                if (typeof D.startTimeUnixNano === "number") W.startTimeUnixNano = Y.longs === String ? String(D.startTimeUnixNano) : D.startTimeUnixNano;
                else W.startTimeUnixNano = Y.longs === String ? J1.Long.prototype.toString.call(D.startTimeUnixNano) : Y.longs === Number ? new J1.LongBits(D.startTimeUnixNano.low >>> 0, D.startTimeUnixNano.high >>> 0).toNumber() : D.startTimeUnixNano;
              if (D.timeUnixNano != null && D.hasOwnProperty("timeUnixNano"))
                if (typeof D.timeUnixNano === "number") W.timeUnixNano = Y.longs === String ? String(D.timeUnixNano) : D.timeUnixNano;
                else W.timeUnixNano = Y.longs === String ? J1.Long.prototype.toString.call(D.timeUnixNano) : Y.longs === Number ? new J1.LongBits(D.timeUnixNano.low >>> 0, D.timeUnixNano.high >>> 0).toNumber() : D.timeUnixNano;
              if (D.count != null && D.hasOwnProperty("count"))
                if (typeof D.count === "number") W.count = Y.longs === String ? String(D.count) : D.count;
                else W.count = Y.longs === String ? J1.Long.prototype.toString.call(D.count) : Y.longs === Number ? new J1.LongBits(D.count.low >>> 0, D.count.high >>> 0).toNumber() : D.count;
              if (D.sum != null && D.hasOwnProperty("sum")) W.sum = Y.json && !isFinite(D.sum) ? String(D.sum) : D.sum;
              if (D.quantileValues && D.quantileValues.length) {
                W.quantileValues = [];
                for (var F = 0; F < D.quantileValues.length; ++F) W.quantileValues[F] = G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.toObject(D.quantileValues[F], Y)
              }
              if (D.attributes && D.attributes.length) {
                W.attributes = [];
                for (var F = 0; F < D.attributes.length; ++F) W.attributes[F] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(D.attributes[F], Y)
              }
              if (D.flags != null && D.hasOwnProperty("flags")) W.flags = D.flags;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.metrics.v1.SummaryDataPoint"
            }, G.ValueAtQuantile = function() {
              function Z(D) {
                if (D) {
                  for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                    if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
                }
              }
              return Z.prototype.quantile = null, Z.prototype.value = null, Z.create = function D(Y) {
                return new Z(Y)
              }, Z.encode = function D(Y, W) {
                if (!W) W = p4.create();
                if (Y.quantile != null && Object.hasOwnProperty.call(Y, "quantile")) W.uint32(9).double(Y.quantile);
                if (Y.value != null && Object.hasOwnProperty.call(Y, "value")) W.uint32(17).double(Y.value);
                return W
              }, Z.encodeDelimited = function D(Y, W) {
                return this.encode(Y, W).ldelim()
              }, Z.decode = function D(Y, W) {
                if (!(Y instanceof LA)) Y = LA.create(Y);
                var J = W === void 0 ? Y.len : Y.pos + W,
                  F = new G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile;
                while (Y.pos < J) {
                  var X = Y.uint32();
                  switch (X >>> 3) {
                    case 1: {
                      F.quantile = Y.double();
                      break
                    }
                    case 2: {
                      F.value = Y.double();
                      break
                    }
                    default:
                      Y.skipType(X & 7);
                      break
                  }
                }
                return F
              }, Z.decodeDelimited = function D(Y) {
                if (!(Y instanceof LA)) Y = new LA(Y);
                return this.decode(Y, Y.uint32())
              }, Z.verify = function D(Y) {
                if (typeof Y !== "object" || Y === null) return "object expected";
                if (Y.quantile != null && Y.hasOwnProperty("quantile")) {
                  if (typeof Y.quantile !== "number") return "quantile: number expected"
                }
                if (Y.value != null && Y.hasOwnProperty("value")) {
                  if (typeof Y.value !== "number") return "value: number expected"
                }
                return null
              }, Z.fromObject = function D(Y) {
                if (Y instanceof G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile) return Y;
                var W = new G1.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile;
                if (Y.quantile != null) W.quantile = Number(Y.quantile);
                if (Y.value != null) W.value = Number(Y.value);
                return W
              }, Z.toObject = function D(Y, W) {
                if (!W) W = {};
                var J = {};
                if (W.defaults) J.quantile = 0, J.value = 0;
                if (Y.quantile != null && Y.hasOwnProperty("quantile")) J.quantile = W.json && !isFinite(Y.quantile) ? String(Y.quantile) : Y.quantile;
                if (Y.value != null && Y.hasOwnProperty("value")) J.value = W.json && !isFinite(Y.value) ? String(Y.value) : Y.value;
                return J
              }, Z.prototype.toJSON = function D() {
                return this.constructor.toObject(this, b9.util.toJSONOptions)
              }, Z.getTypeUrl = function D(Y) {
                if (Y === void 0) Y = "type.googleapis.com";
                return Y + "/opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile"
              }, Z
            }(), G
          }(), I.Exemplar = function() {
            function G(D) {
              if (this.filteredAttributes = [], D) {
                for (var Y = Object.keys(D), W = 0; W < Y.length; ++W)
                  if (D[Y[W]] != null) this[Y[W]] = D[Y[W]]
              }
            }
            G.prototype.filteredAttributes = J1.emptyArray, G.prototype.timeUnixNano = null, G.prototype.asDouble = null, G.prototype.asInt = null, G.prototype.spanId = null, G.prototype.traceId = null;
            var Z;
            return Object.defineProperty(G.prototype, "value", {
              get: J1.oneOfGetter(Z = ["asDouble", "asInt"]),
              set: J1.oneOfSetter(Z)
            }), G.create = function D(Y) {
              return new G(Y)
            }, G.encode = function D(Y, W) {
              if (!W) W = p4.create();
              if (Y.timeUnixNano != null && Object.hasOwnProperty.call(Y, "timeUnixNano")) W.uint32(17).fixed64(Y.timeUnixNano);
              if (Y.asDouble != null && Object.hasOwnProperty.call(Y, "asDouble")) W.uint32(25).double(Y.asDouble);
              if (Y.spanId != null && Object.hasOwnProperty.call(Y, "spanId")) W.uint32(34).bytes(Y.spanId);
              if (Y.traceId != null && Object.hasOwnProperty.call(Y, "traceId")) W.uint32(42).bytes(Y.traceId);
              if (Y.asInt != null && Object.hasOwnProperty.call(Y, "asInt")) W.uint32(49).sfixed64(Y.asInt);
              if (Y.filteredAttributes != null && Y.filteredAttributes.length)
                for (var J = 0; J < Y.filteredAttributes.length; ++J) G1.opentelemetry.proto.common.v1.KeyValue.encode(Y.filteredAttributes[J], W.uint32(58).fork()).ldelim();
              return W
            }, G.encodeDelimited = function D(Y, W) {
              return this.encode(Y, W).ldelim()
            }, G.decode = function D(Y, W) {
              if (!(Y instanceof LA)) Y = LA.create(Y);
              var J = W === void 0 ? Y.len : Y.pos + W,
                F = new G1.opentelemetry.proto.metrics.v1.Exemplar;
              while (Y.pos < J) {
                var X = Y.uint32();
                switch (X >>> 3) {
                  case 7: {
                    if (!(F.filteredAttributes && F.filteredAttributes.length)) F.filteredAttributes = [];
                    F.filteredAttributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(Y, Y.uint32()));
                    break
                  }
                  case 2: {
                    F.timeUnixNano = Y.fixed64();
                    break
                  }
                  case 3: {
                    F.asDouble = Y.double();
                    break
                  }
                  case 6: {
                    F.asInt = Y.sfixed64();
                    break
                  }
                  case 4: {
                    F.spanId = Y.bytes();
                    break
                  }
                  case 5: {
                    F.traceId = Y.bytes();
                    break
                  }
                  default:
                    Y.skipType(X & 7);
                    break
                }
              }
              return F
            }, G.decodeDelimited = function D(Y) {
              if (!(Y instanceof LA)) Y = new LA(Y);
              return this.decode(Y, Y.uint32())
            }, G.verify = function D(Y) {
              if (typeof Y !== "object" || Y === null) return "object expected";
              var W = {};
              if (Y.filteredAttributes != null && Y.hasOwnProperty("filteredAttributes")) {
                if (!Array.isArray(Y.filteredAttributes)) return "filteredAttributes: array expected";
                for (var J = 0; J < Y.filteredAttributes.length; ++J) {
                  var F = G1.opentelemetry.proto.common.v1.KeyValue.verify(Y.filteredAttributes[J]);
                  if (F) return "filteredAttributes." + F
                }
              }
              if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano")) {
                if (!J1.isInteger(Y.timeUnixNano) && !(Y.timeUnixNano && J1.isInteger(Y.timeUnixNano.low) && J1.isInteger(Y.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
              }
              if (Y.asDouble != null && Y.hasOwnProperty("asDouble")) {
                if (W.value = 1, typeof Y.asDouble !== "number") return "asDouble: number expected"
              }
              if (Y.asInt != null && Y.hasOwnProperty("asInt")) {
                if (W.value === 1) return "value: multiple values";
                if (W.value = 1, !J1.isInteger(Y.asInt) && !(Y.asInt && J1.isInteger(Y.asInt.low) && J1.isInteger(Y.asInt.high))) return "asInt: integer|Long expected"
              }
              if (Y.spanId != null && Y.hasOwnProperty("spanId")) {
                if (!(Y.spanId && typeof Y.spanId.length === "number" || J1.isString(Y.spanId))) return "spanId: buffer expected"
              }
              if (Y.traceId != null && Y.hasOwnProperty("traceId")) {
                if (!(Y.traceId && typeof Y.traceId.length === "number" || J1.isString(Y.traceId))) return "traceId: buffer expected"
              }
              return null
            }, G.fromObject = function D(Y) {
              if (Y instanceof G1.opentelemetry.proto.metrics.v1.Exemplar) return Y;
              var W = new G1.opentelemetry.proto.metrics.v1.Exemplar;
              if (Y.filteredAttributes) {
                if (!Array.isArray(Y.filteredAttributes)) throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: array expected");
                W.filteredAttributes = [];
                for (var J = 0; J < Y.filteredAttributes.length; ++J) {
                  if (typeof Y.filteredAttributes[J] !== "object") throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: object expected");
                  W.filteredAttributes[J] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(Y.filteredAttributes[J])
                }
              }
              if (Y.timeUnixNano != null) {
                if (J1.Long)(W.timeUnixNano = J1.Long.fromValue(Y.timeUnixNano)).unsigned = !1;
                else if (typeof Y.timeUnixNano === "string") W.timeUnixNano = parseInt(Y.timeUnixNano, 10);
                else if (typeof Y.timeUnixNano === "number") W.timeUnixNano = Y.timeUnixNano;
                else if (typeof Y.timeUnixNano === "object") W.timeUnixNano = new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber()
              }
              if (Y.asDouble != null) W.asDouble = Number(Y.asDouble);
              if (Y.asInt != null) {
                if (J1.Long)(W.asInt = J1.Long.fromValue(Y.asInt)).unsigned = !1;
                else if (typeof Y.asInt === "string") W.asInt = parseInt(Y.asInt, 10);
                else if (typeof Y.asInt === "number") W.asInt = Y.asInt;
                else if (typeof Y.asInt === "object") W.asInt = new J1.LongBits(Y.asInt.low >>> 0, Y.asInt.high >>> 0).toNumber()
              }
              if (Y.spanId != null) {
                if (typeof Y.spanId === "string") J1.base64.decode(Y.spanId, W.spanId = J1.newBuffer(J1.base64.length(Y.spanId)), 0);
                else if (Y.spanId.length >= 0) W.spanId = Y.spanId
              }
              if (Y.traceId != null) {
                if (typeof Y.traceId === "string") J1.base64.decode(Y.traceId, W.traceId = J1.newBuffer(J1.base64.length(Y.traceId)), 0);
                else if (Y.traceId.length >= 0) W.traceId = Y.traceId
              }
              return W
            }, G.toObject = function D(Y, W) {
              if (!W) W = {};
              var J = {};
              if (W.arrays || W.defaults) J.filteredAttributes = [];
              if (W.defaults) {
                if (J1.Long) {
                  var F = new J1.Long(0, 0, !1);
                  J.timeUnixNano = W.longs === String ? F.toString() : W.longs === Number ? F.toNumber() : F
                } else J.timeUnixNano = W.longs === String ? "0" : 0;
                if (W.bytes === String) J.spanId = "";
                else if (J.spanId = [], W.bytes !== Array) J.spanId = J1.newBuffer(J.spanId);
                if (W.bytes === String) J.traceId = "";
                else if (J.traceId = [], W.bytes !== Array) J.traceId = J1.newBuffer(J.traceId)
              }
              if (Y.timeUnixNano != null && Y.hasOwnProperty("timeUnixNano"))
                if (typeof Y.timeUnixNano === "number") J.timeUnixNano = W.longs === String ? String(Y.timeUnixNano) : Y.timeUnixNano;
                else J.timeUnixNano = W.longs === String ? J1.Long.prototype.toString.call(Y.timeUnixNano) : W.longs === Number ? new J1.LongBits(Y.timeUnixNano.low >>> 0, Y.timeUnixNano.high >>> 0).toNumber() : Y.timeUnixNano;
              if (Y.asDouble != null && Y.hasOwnProperty("asDouble")) {
                if (J.asDouble = W.json && !isFinite(Y.asDouble) ? String(Y.asDouble) : Y.asDouble, W.oneofs) J.value = "asDouble"
              }
              if (Y.spanId != null && Y.hasOwnProperty("spanId")) J.spanId = W.bytes === String ? J1.base64.encode(Y.spanId, 0, Y.spanId.length) : W.bytes === Array ? Array.prototype.slice.call(Y.spanId) : Y.spanId;
              if (Y.traceId != null && Y.hasOwnProperty("traceId")) J.traceId = W.bytes === String ? J1.base64.encode(Y.traceId, 0, Y.traceId.length) : W.bytes === Array ? Array.prototype.slice.call(Y.traceId) : Y.traceId;
              if (Y.asInt != null && Y.hasOwnProperty("asInt")) {
                if (typeof Y.asInt === "number") J.asInt = W.longs === String ? String(Y.asInt) : Y.asInt;
                else J.asInt = W.longs === String ? J1.Long.prototype.toString.call(Y.asInt) : W.longs === Number ? new J1.LongBits(Y.asInt.low >>> 0, Y.asInt.high >>> 0).toNumber() : Y.asInt;
                if (W.oneofs) J.value = "asInt"
              }
              if (Y.filteredAttributes && Y.filteredAttributes.length) {
                J.filteredAttributes = [];
                for (var X = 0; X < Y.filteredAttributes.length; ++X) J.filteredAttributes[X] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(Y.filteredAttributes[X], W)
              }
              return J
            }, G.prototype.toJSON = function D() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function D(Y) {
              if (Y === void 0) Y = "type.googleapis.com";
              return Y + "/opentelemetry.proto.metrics.v1.Exemplar"
            }, G
          }(), I
        }(), Q
      }(), B.logs = function() {
        var Q = {};
        return Q.v1 = function() {
          var I = {};
          return I.LogsData = function() {
            function G(Z) {
              if (this.resourceLogs = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.resourceLogs = J1.emptyArray, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.resourceLogs != null && D.resourceLogs.length)
                for (var W = 0; W < D.resourceLogs.length; ++W) G1.opentelemetry.proto.logs.v1.ResourceLogs.encode(D.resourceLogs[W], Y.uint32(10).fork()).ldelim();
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.logs.v1.LogsData;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    if (!(J.resourceLogs && J.resourceLogs.length)) J.resourceLogs = [];
                    J.resourceLogs.push(G1.opentelemetry.proto.logs.v1.ResourceLogs.decode(D, D.uint32()));
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.resourceLogs != null && D.hasOwnProperty("resourceLogs")) {
                if (!Array.isArray(D.resourceLogs)) return "resourceLogs: array expected";
                for (var Y = 0; Y < D.resourceLogs.length; ++Y) {
                  var W = G1.opentelemetry.proto.logs.v1.ResourceLogs.verify(D.resourceLogs[Y]);
                  if (W) return "resourceLogs." + W
                }
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.logs.v1.LogsData) return D;
              var Y = new G1.opentelemetry.proto.logs.v1.LogsData;
              if (D.resourceLogs) {
                if (!Array.isArray(D.resourceLogs)) throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: array expected");
                Y.resourceLogs = [];
                for (var W = 0; W < D.resourceLogs.length; ++W) {
                  if (typeof D.resourceLogs[W] !== "object") throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: object expected");
                  Y.resourceLogs[W] = G1.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(D.resourceLogs[W])
                }
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.resourceLogs = [];
              if (D.resourceLogs && D.resourceLogs.length) {
                W.resourceLogs = [];
                for (var J = 0; J < D.resourceLogs.length; ++J) W.resourceLogs[J] = G1.opentelemetry.proto.logs.v1.ResourceLogs.toObject(D.resourceLogs[J], Y)
              }
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.logs.v1.LogsData"
            }, G
          }(), I.ResourceLogs = function() {
            function G(Z) {
              if (this.scopeLogs = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.resource = null, G.prototype.scopeLogs = J1.emptyArray, G.prototype.schemaUrl = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.resource != null && Object.hasOwnProperty.call(D, "resource")) G1.opentelemetry.proto.resource.v1.Resource.encode(D.resource, Y.uint32(10).fork()).ldelim();
              if (D.scopeLogs != null && D.scopeLogs.length)
                for (var W = 0; W < D.scopeLogs.length; ++W) G1.opentelemetry.proto.logs.v1.ScopeLogs.encode(D.scopeLogs[W], Y.uint32(18).fork()).ldelim();
              if (D.schemaUrl != null && Object.hasOwnProperty.call(D, "schemaUrl")) Y.uint32(26).string(D.schemaUrl);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.logs.v1.ResourceLogs;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.resource = G1.opentelemetry.proto.resource.v1.Resource.decode(D, D.uint32());
                    break
                  }
                  case 2: {
                    if (!(J.scopeLogs && J.scopeLogs.length)) J.scopeLogs = [];
                    J.scopeLogs.push(G1.opentelemetry.proto.logs.v1.ScopeLogs.decode(D, D.uint32()));
                    break
                  }
                  case 3: {
                    J.schemaUrl = D.string();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.resource != null && D.hasOwnProperty("resource")) {
                var Y = G1.opentelemetry.proto.resource.v1.Resource.verify(D.resource);
                if (Y) return "resource." + Y
              }
              if (D.scopeLogs != null && D.hasOwnProperty("scopeLogs")) {
                if (!Array.isArray(D.scopeLogs)) return "scopeLogs: array expected";
                for (var W = 0; W < D.scopeLogs.length; ++W) {
                  var Y = G1.opentelemetry.proto.logs.v1.ScopeLogs.verify(D.scopeLogs[W]);
                  if (Y) return "scopeLogs." + Y
                }
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) {
                if (!J1.isString(D.schemaUrl)) return "schemaUrl: string expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.logs.v1.ResourceLogs) return D;
              var Y = new G1.opentelemetry.proto.logs.v1.ResourceLogs;
              if (D.resource != null) {
                if (typeof D.resource !== "object") throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.resource: object expected");
                Y.resource = G1.opentelemetry.proto.resource.v1.Resource.fromObject(D.resource)
              }
              if (D.scopeLogs) {
                if (!Array.isArray(D.scopeLogs)) throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: array expected");
                Y.scopeLogs = [];
                for (var W = 0; W < D.scopeLogs.length; ++W) {
                  if (typeof D.scopeLogs[W] !== "object") throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: object expected");
                  Y.scopeLogs[W] = G1.opentelemetry.proto.logs.v1.ScopeLogs.fromObject(D.scopeLogs[W])
                }
              }
              if (D.schemaUrl != null) Y.schemaUrl = String(D.schemaUrl);
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.scopeLogs = [];
              if (Y.defaults) W.resource = null, W.schemaUrl = "";
              if (D.resource != null && D.hasOwnProperty("resource")) W.resource = G1.opentelemetry.proto.resource.v1.Resource.toObject(D.resource, Y);
              if (D.scopeLogs && D.scopeLogs.length) {
                W.scopeLogs = [];
                for (var J = 0; J < D.scopeLogs.length; ++J) W.scopeLogs[J] = G1.opentelemetry.proto.logs.v1.ScopeLogs.toObject(D.scopeLogs[J], Y)
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) W.schemaUrl = D.schemaUrl;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.logs.v1.ResourceLogs"
            }, G
          }(), I.ScopeLogs = function() {
            function G(Z) {
              if (this.logRecords = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.scope = null, G.prototype.logRecords = J1.emptyArray, G.prototype.schemaUrl = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.scope != null && Object.hasOwnProperty.call(D, "scope")) G1.opentelemetry.proto.common.v1.InstrumentationScope.encode(D.scope, Y.uint32(10).fork()).ldelim();
              if (D.logRecords != null && D.logRecords.length)
                for (var W = 0; W < D.logRecords.length; ++W) G1.opentelemetry.proto.logs.v1.LogRecord.encode(D.logRecords[W], Y.uint32(18).fork()).ldelim();
              if (D.schemaUrl != null && Object.hasOwnProperty.call(D, "schemaUrl")) Y.uint32(26).string(D.schemaUrl);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.logs.v1.ScopeLogs;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.decode(D, D.uint32());
                    break
                  }
                  case 2: {
                    if (!(J.logRecords && J.logRecords.length)) J.logRecords = [];
                    J.logRecords.push(G1.opentelemetry.proto.logs.v1.LogRecord.decode(D, D.uint32()));
                    break
                  }
                  case 3: {
                    J.schemaUrl = D.string();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.scope != null && D.hasOwnProperty("scope")) {
                var Y = G1.opentelemetry.proto.common.v1.InstrumentationScope.verify(D.scope);
                if (Y) return "scope." + Y
              }
              if (D.logRecords != null && D.hasOwnProperty("logRecords")) {
                if (!Array.isArray(D.logRecords)) return "logRecords: array expected";
                for (var W = 0; W < D.logRecords.length; ++W) {
                  var Y = G1.opentelemetry.proto.logs.v1.LogRecord.verify(D.logRecords[W]);
                  if (Y) return "logRecords." + Y
                }
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) {
                if (!J1.isString(D.schemaUrl)) return "schemaUrl: string expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.logs.v1.ScopeLogs) return D;
              var Y = new G1.opentelemetry.proto.logs.v1.ScopeLogs;
              if (D.scope != null) {
                if (typeof D.scope !== "object") throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.scope: object expected");
                Y.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(D.scope)
              }
              if (D.logRecords) {
                if (!Array.isArray(D.logRecords)) throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: array expected");
                Y.logRecords = [];
                for (var W = 0; W < D.logRecords.length; ++W) {
                  if (typeof D.logRecords[W] !== "object") throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: object expected");
                  Y.logRecords[W] = G1.opentelemetry.proto.logs.v1.LogRecord.fromObject(D.logRecords[W])
                }
              }
              if (D.schemaUrl != null) Y.schemaUrl = String(D.schemaUrl);
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.logRecords = [];
              if (Y.defaults) W.scope = null, W.schemaUrl = "";
              if (D.scope != null && D.hasOwnProperty("scope")) W.scope = G1.opentelemetry.proto.common.v1.InstrumentationScope.toObject(D.scope, Y);
              if (D.logRecords && D.logRecords.length) {
                W.logRecords = [];
                for (var J = 0; J < D.logRecords.length; ++J) W.logRecords[J] = G1.opentelemetry.proto.logs.v1.LogRecord.toObject(D.logRecords[J], Y)
              }
              if (D.schemaUrl != null && D.hasOwnProperty("schemaUrl")) W.schemaUrl = D.schemaUrl;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.logs.v1.ScopeLogs"
            }, G
          }(), I.SeverityNumber = function() {
            var G = {},
              Z = Object.create(G);
            return Z[G[0] = "SEVERITY_NUMBER_UNSPECIFIED"] = 0, Z[G[1] = "SEVERITY_NUMBER_TRACE"] = 1, Z[G[2] = "SEVERITY_NUMBER_TRACE2"] = 2, Z[G[3] = "SEVERITY_NUMBER_TRACE3"] = 3, Z[G[4] = "SEVERITY_NUMBER_TRACE4"] = 4, Z[G[5] = "SEVERITY_NUMBER_DEBUG"] = 5, Z[G[6] = "SEVERITY_NUMBER_DEBUG2"] = 6, Z[G[7] = "SEVERITY_NUMBER_DEBUG3"] = 7, Z[G[8] = "SEVERITY_NUMBER_DEBUG4"] = 8, Z[G[9] = "SEVERITY_NUMBER_INFO"] = 9, Z[G[10] = "SEVERITY_NUMBER_INFO2"] = 10, Z[G[11] = "SEVERITY_NUMBER_INFO3"] = 11, Z[G[12] = "SEVERITY_NUMBER_INFO4"] = 12, Z[G[13] = "SEVERITY_NUMBER_WARN"] = 13, Z[G[14] = "SEVERITY_NUMBER_WARN2"] = 14, Z[G[15] = "SEVERITY_NUMBER_WARN3"] = 15, Z[G[16] = "SEVERITY_NUMBER_WARN4"] = 16, Z[G[17] = "SEVERITY_NUMBER_ERROR"] = 17, Z[G[18] = "SEVERITY_NUMBER_ERROR2"] = 18, Z[G[19] = "SEVERITY_NUMBER_ERROR3"] = 19, Z[G[20] = "SEVERITY_NUMBER_ERROR4"] = 20, Z[G[21] = "SEVERITY_NUMBER_FATAL"] = 21, Z[G[22] = "SEVERITY_NUMBER_FATAL2"] = 22, Z[G[23] = "SEVERITY_NUMBER_FATAL3"] = 23, Z[G[24] = "SEVERITY_NUMBER_FATAL4"] = 24, Z
          }(), I.LogRecordFlags = function() {
            var G = {},
              Z = Object.create(G);
            return Z[G[0] = "LOG_RECORD_FLAGS_DO_NOT_USE"] = 0, Z[G[255] = "LOG_RECORD_FLAGS_TRACE_FLAGS_MASK"] = 255, Z
          }(), I.LogRecord = function() {
            function G(Z) {
              if (this.attributes = [], Z) {
                for (var D = Object.keys(Z), Y = 0; Y < D.length; ++Y)
                  if (Z[D[Y]] != null) this[D[Y]] = Z[D[Y]]
              }
            }
            return G.prototype.timeUnixNano = null, G.prototype.observedTimeUnixNano = null, G.prototype.severityNumber = null, G.prototype.severityText = null, G.prototype.body = null, G.prototype.attributes = J1.emptyArray, G.prototype.droppedAttributesCount = null, G.prototype.flags = null, G.prototype.traceId = null, G.prototype.spanId = null, G.create = function Z(D) {
              return new G(D)
            }, G.encode = function Z(D, Y) {
              if (!Y) Y = p4.create();
              if (D.timeUnixNano != null && Object.hasOwnProperty.call(D, "timeUnixNano")) Y.uint32(9).fixed64(D.timeUnixNano);
              if (D.severityNumber != null && Object.hasOwnProperty.call(D, "severityNumber")) Y.uint32(16).int32(D.severityNumber);
              if (D.severityText != null && Object.hasOwnProperty.call(D, "severityText")) Y.uint32(26).string(D.severityText);
              if (D.body != null && Object.hasOwnProperty.call(D, "body")) G1.opentelemetry.proto.common.v1.AnyValue.encode(D.body, Y.uint32(42).fork()).ldelim();
              if (D.attributes != null && D.attributes.length)
                for (var W = 0; W < D.attributes.length; ++W) G1.opentelemetry.proto.common.v1.KeyValue.encode(D.attributes[W], Y.uint32(50).fork()).ldelim();
              if (D.droppedAttributesCount != null && Object.hasOwnProperty.call(D, "droppedAttributesCount")) Y.uint32(56).uint32(D.droppedAttributesCount);
              if (D.flags != null && Object.hasOwnProperty.call(D, "flags")) Y.uint32(69).fixed32(D.flags);
              if (D.traceId != null && Object.hasOwnProperty.call(D, "traceId")) Y.uint32(74).bytes(D.traceId);
              if (D.spanId != null && Object.hasOwnProperty.call(D, "spanId")) Y.uint32(82).bytes(D.spanId);
              if (D.observedTimeUnixNano != null && Object.hasOwnProperty.call(D, "observedTimeUnixNano")) Y.uint32(89).fixed64(D.observedTimeUnixNano);
              return Y
            }, G.encodeDelimited = function Z(D, Y) {
              return this.encode(D, Y).ldelim()
            }, G.decode = function Z(D, Y) {
              if (!(D instanceof LA)) D = LA.create(D);
              var W = Y === void 0 ? D.len : D.pos + Y,
                J = new G1.opentelemetry.proto.logs.v1.LogRecord;
              while (D.pos < W) {
                var F = D.uint32();
                switch (F >>> 3) {
                  case 1: {
                    J.timeUnixNano = D.fixed64();
                    break
                  }
                  case 11: {
                    J.observedTimeUnixNano = D.fixed64();
                    break
                  }
                  case 2: {
                    J.severityNumber = D.int32();
                    break
                  }
                  case 3: {
                    J.severityText = D.string();
                    break
                  }
                  case 5: {
                    J.body = G1.opentelemetry.proto.common.v1.AnyValue.decode(D, D.uint32());
                    break
                  }
                  case 6: {
                    if (!(J.attributes && J.attributes.length)) J.attributes = [];
                    J.attributes.push(G1.opentelemetry.proto.common.v1.KeyValue.decode(D, D.uint32()));
                    break
                  }
                  case 7: {
                    J.droppedAttributesCount = D.uint32();
                    break
                  }
                  case 8: {
                    J.flags = D.fixed32();
                    break
                  }
                  case 9: {
                    J.traceId = D.bytes();
                    break
                  }
                  case 10: {
                    J.spanId = D.bytes();
                    break
                  }
                  default:
                    D.skipType(F & 7);
                    break
                }
              }
              return J
            }, G.decodeDelimited = function Z(D) {
              if (!(D instanceof LA)) D = new LA(D);
              return this.decode(D, D.uint32())
            }, G.verify = function Z(D) {
              if (typeof D !== "object" || D === null) return "object expected";
              if (D.timeUnixNano != null && D.hasOwnProperty("timeUnixNano")) {
                if (!J1.isInteger(D.timeUnixNano) && !(D.timeUnixNano && J1.isInteger(D.timeUnixNano.low) && J1.isInteger(D.timeUnixNano.high))) return "timeUnixNano: integer|Long expected"
              }
              if (D.observedTimeUnixNano != null && D.hasOwnProperty("observedTimeUnixNano")) {
                if (!J1.isInteger(D.observedTimeUnixNano) && !(D.observedTimeUnixNano && J1.isInteger(D.observedTimeUnixNano.low) && J1.isInteger(D.observedTimeUnixNano.high))) return "observedTimeUnixNano: integer|Long expected"
              }
              if (D.severityNumber != null && D.hasOwnProperty("severityNumber")) switch (D.severityNumber) {
                default:
                  return "severityNumber: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 23:
                case 24:
                  break
              }
              if (D.severityText != null && D.hasOwnProperty("severityText")) {
                if (!J1.isString(D.severityText)) return "severityText: string expected"
              }
              if (D.body != null && D.hasOwnProperty("body")) {
                var Y = G1.opentelemetry.proto.common.v1.AnyValue.verify(D.body);
                if (Y) return "body." + Y
              }
              if (D.attributes != null && D.hasOwnProperty("attributes")) {
                if (!Array.isArray(D.attributes)) return "attributes: array expected";
                for (var W = 0; W < D.attributes.length; ++W) {
                  var Y = G1.opentelemetry.proto.common.v1.KeyValue.verify(D.attributes[W]);
                  if (Y) return "attributes." + Y
                }
              }
              if (D.droppedAttributesCount != null && D.hasOwnProperty("droppedAttributesCount")) {
                if (!J1.isInteger(D.droppedAttributesCount)) return "droppedAttributesCount: integer expected"
              }
              if (D.flags != null && D.hasOwnProperty("flags")) {
                if (!J1.isInteger(D.flags)) return "flags: integer expected"
              }
              if (D.traceId != null && D.hasOwnProperty("traceId")) {
                if (!(D.traceId && typeof D.traceId.length === "number" || J1.isString(D.traceId))) return "traceId: buffer expected"
              }
              if (D.spanId != null && D.hasOwnProperty("spanId")) {
                if (!(D.spanId && typeof D.spanId.length === "number" || J1.isString(D.spanId))) return "spanId: buffer expected"
              }
              return null
            }, G.fromObject = function Z(D) {
              if (D instanceof G1.opentelemetry.proto.logs.v1.LogRecord) return D;
              var Y = new G1.opentelemetry.proto.logs.v1.LogRecord;
              if (D.timeUnixNano != null) {
                if (J1.Long)(Y.timeUnixNano = J1.Long.fromValue(D.timeUnixNano)).unsigned = !1;
                else if (typeof D.timeUnixNano === "string") Y.timeUnixNano = parseInt(D.timeUnixNano, 10);
                else if (typeof D.timeUnixNano === "number") Y.timeUnixNano = D.timeUnixNano;
                else if (typeof D.timeUnixNano === "object") Y.timeUnixNano = new J1.LongBits(D.timeUnixNano.low >>> 0, D.timeUnixNano.high >>> 0).toNumber()
              }
              if (D.observedTimeUnixNano != null) {
                if (J1.Long)(Y.observedTimeUnixNano = J1.Long.fromValue(D.observedTimeUnixNano)).unsigned = !1;
                else if (typeof D.observedTimeUnixNano === "string") Y.observedTimeUnixNano = parseInt(D.observedTimeUnixNano, 10);
                else if (typeof D.observedTimeUnixNano === "number") Y.observedTimeUnixNano = D.observedTimeUnixNano;
                else if (typeof D.observedTimeUnixNano === "object") Y.observedTimeUnixNano = new J1.LongBits(D.observedTimeUnixNano.low >>> 0, D.observedTimeUnixNano.high >>> 0).toNumber()
              }
              switch (D.severityNumber) {
                default:
                  if (typeof D.severityNumber === "number") {
                    Y.severityNumber = D.severityNumber;
                    break
                  }
                  break;
                case "SEVERITY_NUMBER_UNSPECIFIED":
                case 0:
                  Y.severityNumber = 0;
                  break;
                case "SEVERITY_NUMBER_TRACE":
                case 1:
                  Y.severityNumber = 1;
                  break;
                case "SEVERITY_NUMBER_TRACE2":
                case 2:
                  Y.severityNumber = 2;
                  break;
                case "SEVERITY_NUMBER_TRACE3":
                case 3:
                  Y.severityNumber = 3;
                  break;
                case "SEVERITY_NUMBER_TRACE4":
                case 4:
                  Y.severityNumber = 4;
                  break;
                case "SEVERITY_NUMBER_DEBUG":
                case 5:
                  Y.severityNumber = 5;
                  break;
                case "SEVERITY_NUMBER_DEBUG2":
                case 6:
                  Y.severityNumber = 6;
                  break;
                case "SEVERITY_NUMBER_DEBUG3":
                case 7:
                  Y.severityNumber = 7;
                  break;
                case "SEVERITY_NUMBER_DEBUG4":
                case 8:
                  Y.severityNumber = 8;
                  break;
                case "SEVERITY_NUMBER_INFO":
                case 9:
                  Y.severityNumber = 9;
                  break;
                case "SEVERITY_NUMBER_INFO2":
                case 10:
                  Y.severityNumber = 10;
                  break;
                case "SEVERITY_NUMBER_INFO3":
                case 11:
                  Y.severityNumber = 11;
                  break;
                case "SEVERITY_NUMBER_INFO4":
                case 12:
                  Y.severityNumber = 12;
                  break;
                case "SEVERITY_NUMBER_WARN":
                case 13:
                  Y.severityNumber = 13;
                  break;
                case "SEVERITY_NUMBER_WARN2":
                case 14:
                  Y.severityNumber = 14;
                  break;
                case "SEVERITY_NUMBER_WARN3":
                case 15:
                  Y.severityNumber = 15;
                  break;
                case "SEVERITY_NUMBER_WARN4":
                case 16:
                  Y.severityNumber = 16;
                  break;
                case "SEVERITY_NUMBER_ERROR":
                case 17:
                  Y.severityNumber = 17;
                  break;
                case "SEVERITY_NUMBER_ERROR2":
                case 18:
                  Y.severityNumber = 18;
                  break;
                case "SEVERITY_NUMBER_ERROR3":
                case 19:
                  Y.severityNumber = 19;
                  break;
                case "SEVERITY_NUMBER_ERROR4":
                case 20:
                  Y.severityNumber = 20;
                  break;
                case "SEVERITY_NUMBER_FATAL":
                case 21:
                  Y.severityNumber = 21;
                  break;
                case "SEVERITY_NUMBER_FATAL2":
                case 22:
                  Y.severityNumber = 22;
                  break;
                case "SEVERITY_NUMBER_FATAL3":
                case 23:
                  Y.severityNumber = 23;
                  break;
                case "SEVERITY_NUMBER_FATAL4":
                case 24:
                  Y.severityNumber = 24;
                  break
              }
              if (D.severityText != null) Y.severityText = String(D.severityText);
              if (D.body != null) {
                if (typeof D.body !== "object") throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.body: object expected");
                Y.body = G1.opentelemetry.proto.common.v1.AnyValue.fromObject(D.body)
              }
              if (D.attributes) {
                if (!Array.isArray(D.attributes)) throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: array expected");
                Y.attributes = [];
                for (var W = 0; W < D.attributes.length; ++W) {
                  if (typeof D.attributes[W] !== "object") throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: object expected");
                  Y.attributes[W] = G1.opentelemetry.proto.common.v1.KeyValue.fromObject(D.attributes[W])
                }
              }
              if (D.droppedAttributesCount != null) Y.droppedAttributesCount = D.droppedAttributesCount >>> 0;
              if (D.flags != null) Y.flags = D.flags >>> 0;
              if (D.traceId != null) {
                if (typeof D.traceId === "string") J1.base64.decode(D.traceId, Y.traceId = J1.newBuffer(J1.base64.length(D.traceId)), 0);
                else if (D.traceId.length >= 0) Y.traceId = D.traceId
              }
              if (D.spanId != null) {
                if (typeof D.spanId === "string") J1.base64.decode(D.spanId, Y.spanId = J1.newBuffer(J1.base64.length(D.spanId)), 0);
                else if (D.spanId.length >= 0) Y.spanId = D.spanId
              }
              return Y
            }, G.toObject = function Z(D, Y) {
              if (!Y) Y = {};
              var W = {};
              if (Y.arrays || Y.defaults) W.attributes = [];
              if (Y.defaults) {
                if (J1.Long) {
                  var J = new J1.Long(0, 0, !1);
                  W.timeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                } else W.timeUnixNano = Y.longs === String ? "0" : 0;
                if (W.severityNumber = Y.enums === String ? "SEVERITY_NUMBER_UNSPECIFIED" : 0, W.severityText = "", W.body = null, W.droppedAttributesCount = 0, W.flags = 0, Y.bytes === String) W.traceId = "";
                else if (W.traceId = [], Y.bytes !== Array) W.traceId = J1.newBuffer(W.traceId);
                if (Y.bytes === String) W.spanId = "";
                else if (W.spanId = [], Y.bytes !== Array) W.spanId = J1.newBuffer(W.spanId);
                if (J1.Long) {
                  var J = new J1.Long(0, 0, !1);
                  W.observedTimeUnixNano = Y.longs === String ? J.toString() : Y.longs === Number ? J.toNumber() : J
                } else W.observedTimeUnixNano = Y.longs === String ? "0" : 0
              }
              if (D.timeUnixNano != null && D.hasOwnProperty("timeUnixNano"))
                if (typeof D.timeUnixNano === "number") W.timeUnixNano = Y.longs === String ? String(D.timeUnixNano) : D.timeUnixNano;
                else W.timeUnixNano = Y.longs === String ? J1.Long.prototype.toString.call(D.timeUnixNano) : Y.longs === Number ? new J1.LongBits(D.timeUnixNano.low >>> 0, D.timeUnixNano.high >>> 0).toNumber() : D.timeUnixNano;
              if (D.severityNumber != null && D.hasOwnProperty("severityNumber")) W.severityNumber = Y.enums === String ? G1.opentelemetry.proto.logs.v1.SeverityNumber[D.severityNumber] === void 0 ? D.severityNumber : G1.opentelemetry.proto.logs.v1.SeverityNumber[D.severityNumber] : D.severityNumber;
              if (D.severityText != null && D.hasOwnProperty("severityText")) W.severityText = D.severityText;
              if (D.body != null && D.hasOwnProperty("body")) W.body = G1.opentelemetry.proto.common.v1.AnyValue.toObject(D.body, Y);
              if (D.attributes && D.attributes.length) {
                W.attributes = [];
                for (var F = 0; F < D.attributes.length; ++F) W.attributes[F] = G1.opentelemetry.proto.common.v1.KeyValue.toObject(D.attributes[F], Y)
              }
              if (D.droppedAttributesCount != null && D.hasOwnProperty("droppedAttributesCount")) W.droppedAttributesCount = D.droppedAttributesCount;
              if (D.flags != null && D.hasOwnProperty("flags")) W.flags = D.flags;
              if (D.traceId != null && D.hasOwnProperty("traceId")) W.traceId = Y.bytes === String ? J1.base64.encode(D.traceId, 0, D.traceId.length) : Y.bytes === Array ? Array.prototype.slice.call(D.traceId) : D.traceId;
              if (D.spanId != null && D.hasOwnProperty("spanId")) W.spanId = Y.bytes === String ? J1.base64.encode(D.spanId, 0, D.spanId.length) : Y.bytes === Array ? Array.prototype.slice.call(D.spanId) : D.spanId;
              if (D.observedTimeUnixNano != null && D.hasOwnProperty("observedTimeUnixNano"))
                if (typeof D.observedTimeUnixNano === "number") W.observedTimeUnixNano = Y.longs === String ? String(D.observedTimeUnixNano) : D.observedTimeUnixNano;
                else W.observedTimeUnixNano = Y.longs === String ? J1.Long.prototype.toString.call(D.observedTimeUnixNano) : Y.longs === Number ? new J1.LongBits(D.observedTimeUnixNano.low >>> 0, D.observedTimeUnixNano.high >>> 0).toNumber() : D.observedTimeUnixNano;
              return W
            }, G.prototype.toJSON = function Z() {
              return this.constructor.toObject(this, b9.util.toJSONOptions)
            }, G.getTypeUrl = function Z(D) {
              if (D === void 0) D = "type.googleapis.com";
              return D + "/opentelemetry.proto.logs.v1.LogRecord"
            }, G
          }(), I
        }(), Q
      }(), B
    }(), A
  }();
  mO0.exports = G1
})