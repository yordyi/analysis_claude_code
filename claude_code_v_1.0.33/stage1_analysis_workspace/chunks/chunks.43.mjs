
// @from(Start 4294524, End 4298822)
Iw = z((Pg1) => {
  var z9 = Pg1;
  z9.asPromise = Lg1();
  z9.base64 = tR0();
  z9.EventEmitter = AO0();
  z9.float = YO0();
  z9.inquire = Og1();
  z9.utf8 = FO0();
  z9.pool = VO0();
  z9.LongBits = KO0();
  z9.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
  z9.global = z9.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || Pg1;
  z9.emptyArray = Object.freeze ? Object.freeze([]) : [];
  z9.emptyObject = Object.freeze ? Object.freeze({}) : {};
  z9.isInteger = Number.isInteger || function A(B) {
    return typeof B === "number" && isFinite(B) && Math.floor(B) === B
  };
  z9.isString = function A(B) {
    return typeof B === "string" || B instanceof String
  };
  z9.isObject = function A(B) {
    return B && typeof B === "object"
  };
  z9.isset = z9.isSet = function A(B, Q) {
    var I = B[Q];
    if (I != null && B.hasOwnProperty(Q)) return typeof I !== "object" || (Array.isArray(I) ? I.length : Object.keys(I).length) > 0;
    return !1
  };
  z9.Buffer = function() {
    try {
      var A = z9.inquire("buffer").Buffer;
      return A.prototype.utf8Write ? A : null
    } catch (B) {
      return null
    }
  }();
  z9._Buffer_from = null;
  z9._Buffer_allocUnsafe = null;
  z9.newBuffer = function A(B) {
    return typeof B === "number" ? z9.Buffer ? z9._Buffer_allocUnsafe(B) : new z9.Array(B) : z9.Buffer ? z9._Buffer_from(B) : typeof Uint8Array === "undefined" ? B : new Uint8Array(B)
  };
  z9.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  z9.Long = z9.global.dcodeIO && z9.global.dcodeIO.Long || z9.global.Long || z9.inquire("long");
  z9.key2Re = /^true|false|0|1$/;
  z9.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
  z9.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
  z9.longToHash = function A(B) {
    return B ? z9.LongBits.from(B).toHash() : z9.LongBits.zeroHash
  };
  z9.longFromHash = function A(B, Q) {
    var I = z9.LongBits.fromHash(B);
    if (z9.Long) return z9.Long.fromBits(I.lo, I.hi, Q);
    return I.toNumber(Boolean(Q))
  };

  function HO0(A, B, Q) {
    for (var I = Object.keys(B), G = 0; G < I.length; ++G)
      if (A[I[G]] === void 0 || !Q) A[I[G]] = B[I[G]];
    return A
  }
  z9.merge = HO0;
  z9.lcFirst = function A(B) {
    return B.charAt(0).toLowerCase() + B.substring(1)
  };

  function zO0(A) {
    function B(Q, I) {
      if (!(this instanceof B)) return new B(Q, I);
      if (Object.defineProperty(this, "message", {
          get: function() {
            return Q
          }
        }), Error.captureStackTrace) Error.captureStackTrace(this, B);
      else Object.defineProperty(this, "stack", {
        value: new Error().stack || ""
      });
      if (I) HO0(this, I)
    }
    return B.prototype = Object.create(Error.prototype, {
      constructor: {
        value: B,
        writable: !0,
        enumerable: !1,
        configurable: !0
      },
      name: {
        get: function Q() {
          return A
        },
        set: void 0,
        enumerable: !1,
        configurable: !0
      },
      toString: {
        value: function Q() {
          return this.name + ": " + this.message
        },
        writable: !0,
        enumerable: !1,
        configurable: !0
      }
    }), B
  }
  z9.newError = zO0;
  z9.ProtocolError = zO0("ProtocolError");
  z9.oneOfGetter = function A(B) {
    var Q = {};
    for (var I = 0; I < B.length; ++I) Q[B[I]] = 1;
    return function() {
      for (var G = Object.keys(this), Z = G.length - 1; Z > -1; --Z)
        if (Q[G[Z]] === 1 && this[G[Z]] !== void 0 && this[G[Z]] !== null) return G[Z]
    }
  };
  z9.oneOfSetter = function A(B) {
    return function(Q) {
      for (var I = 0; I < B.length; ++I)
        if (B[I] !== Q) delete this[B[I]]
    }
  };
  z9.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: !0
  };
  z9._configure = function() {
    var A = z9.Buffer;
    if (!A) {
      z9._Buffer_from = z9._Buffer_allocUnsafe = null;
      return
    }
    z9._Buffer_from = A.from !== Uint8Array.from && A.from || function B(Q, I) {
      return new A(Q, I)
    }, z9._Buffer_allocUnsafe = A.allocUnsafe || function B(Q) {
      return new A(Q)
    }
  }
})
// @from(Start 4298828, End 4303187)
yZ1 = z((BN8, NO0) => {
  NO0.exports = V5;
  var OX = Iw(),
    Sg1, jZ1 = OX.LongBits,
    wO0 = OX.base64,
    EO0 = OX.utf8;

  function fs(A, B, Q) {
    this.fn = A, this.len = B, this.next = void 0, this.val = Q
  }

  function jg1() {}

  function S26(A) {
    this.head = A.head, this.tail = A.tail, this.len = A.len, this.next = A.states
  }

  function V5() {
    this.len = 0, this.head = new fs(jg1, 0, 0), this.tail = this.head, this.states = null
  }
  var UO0 = function A() {
    return OX.Buffer ? function B() {
      return (V5.create = function Q() {
        return new Sg1
      })()
    } : function B() {
      return new V5
    }
  };
  V5.create = UO0();
  V5.alloc = function A(B) {
    return new OX.Array(B)
  };
  if (OX.Array !== Array) V5.alloc = OX.pool(V5.alloc, OX.Array.prototype.subarray);
  V5.prototype._push = function A(B, Q, I) {
    return this.tail = this.tail.next = new fs(B, Q, I), this.len += Q, this
  };

  function yg1(A, B, Q) {
    B[Q] = A & 255
  }

  function _26(A, B, Q) {
    while (A > 127) B[Q++] = A & 127 | 128, A >>>= 7;
    B[Q] = A
  }

  function kg1(A, B) {
    this.len = A, this.next = void 0, this.val = B
  }
  kg1.prototype = Object.create(fs.prototype);
  kg1.prototype.fn = _26;
  V5.prototype.uint32 = function A(B) {
    return this.len += (this.tail = this.tail.next = new kg1((B = B >>> 0) < 128 ? 1 : B < 16384 ? 2 : B < 2097152 ? 3 : B < 268435456 ? 4 : 5, B)).len, this
  };
  V5.prototype.int32 = function A(B) {
    return B < 0 ? this._push(xg1, 10, jZ1.fromNumber(B)) : this.uint32(B)
  };
  V5.prototype.sint32 = function A(B) {
    return this.uint32((B << 1 ^ B >> 31) >>> 0)
  };

  function xg1(A, B, Q) {
    while (A.hi) B[Q++] = A.lo & 127 | 128, A.lo = (A.lo >>> 7 | A.hi << 25) >>> 0, A.hi >>>= 7;
    while (A.lo > 127) B[Q++] = A.lo & 127 | 128, A.lo = A.lo >>> 7;
    B[Q++] = A.lo
  }
  V5.prototype.uint64 = function A(B) {
    var Q = jZ1.from(B);
    return this._push(xg1, Q.length(), Q)
  };
  V5.prototype.int64 = V5.prototype.uint64;
  V5.prototype.sint64 = function A(B) {
    var Q = jZ1.from(B).zzEncode();
    return this._push(xg1, Q.length(), Q)
  };
  V5.prototype.bool = function A(B) {
    return this._push(yg1, 1, B ? 1 : 0)
  };

  function _g1(A, B, Q) {
    B[Q] = A & 255, B[Q + 1] = A >>> 8 & 255, B[Q + 2] = A >>> 16 & 255, B[Q + 3] = A >>> 24
  }
  V5.prototype.fixed32 = function A(B) {
    return this._push(_g1, 4, B >>> 0)
  };
  V5.prototype.sfixed32 = V5.prototype.fixed32;
  V5.prototype.fixed64 = function A(B) {
    var Q = jZ1.from(B);
    return this._push(_g1, 4, Q.lo)._push(_g1, 4, Q.hi)
  };
  V5.prototype.sfixed64 = V5.prototype.fixed64;
  V5.prototype.float = function A(B) {
    return this._push(OX.float.writeFloatLE, 4, B)
  };
  V5.prototype.double = function A(B) {
    return this._push(OX.float.writeDoubleLE, 8, B)
  };
  var j26 = OX.Array.prototype.set ? function A(B, Q, I) {
    Q.set(B, I)
  } : function A(B, Q, I) {
    for (var G = 0; G < B.length; ++G) Q[I + G] = B[G]
  };
  V5.prototype.bytes = function A(B) {
    var Q = B.length >>> 0;
    if (!Q) return this._push(yg1, 1, 0);
    if (OX.isString(B)) {
      var I = V5.alloc(Q = wO0.length(B));
      wO0.decode(B, I, 0), B = I
    }
    return this.uint32(Q)._push(j26, Q, B)
  };
  V5.prototype.string = function A(B) {
    var Q = EO0.length(B);
    return Q ? this.uint32(Q)._push(EO0.write, Q, B) : this._push(yg1, 1, 0)
  };
  V5.prototype.fork = function A() {
    return this.states = new S26(this), this.head = this.tail = new fs(jg1, 0, 0), this.len = 0, this
  };
  V5.prototype.reset = function A() {
    if (this.states) this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next;
    else this.head = this.tail = new fs(jg1, 0, 0), this.len = 0;
    return this
  };
  V5.prototype.ldelim = function A() {
    var B = this.head,
      Q = this.tail,
      I = this.len;
    if (this.reset().uint32(I), I) this.tail.next = B.next, this.tail = Q, this.len += I;
    return this
  };
  V5.prototype.finish = function A() {
    var B = this.head.next,
      Q = this.constructor.alloc(this.len),
      I = 0;
    while (B) B.fn(B.val, Q, I), I += B.len, B = B.next;
    return Q
  };
  V5._configure = function(A) {
    Sg1 = A, V5.create = UO0(), Sg1._configure()
  }
})
// @from(Start 4303193, End 4304290)
MO0 = z((QN8, qO0) => {
  qO0.exports = Gw;
  var $O0 = yZ1();
  (Gw.prototype = Object.create($O0.prototype)).constructor = Gw;
  var ZR = Iw();

  function Gw() {
    $O0.call(this)
  }
  Gw._configure = function() {
    Gw.alloc = ZR._Buffer_allocUnsafe, Gw.writeBytesBuffer = ZR.Buffer && ZR.Buffer.prototype instanceof Uint8Array && ZR.Buffer.prototype.set.name === "set" ? function A(B, Q, I) {
      Q.set(B, I)
    } : function A(B, Q, I) {
      if (B.copy) B.copy(Q, I, 0, B.length);
      else
        for (var G = 0; G < B.length;) Q[I++] = B[G++]
    }
  };
  Gw.prototype.bytes = function A(B) {
    if (ZR.isString(B)) B = ZR._Buffer_from(B, "base64");
    var Q = B.length >>> 0;
    if (this.uint32(Q), Q) this._push(Gw.writeBytesBuffer, Q, B);
    return this
  };

  function y26(A, B, Q) {
    if (A.length < 40) ZR.utf8.write(A, B, Q);
    else if (B.utf8Write) B.utf8Write(A, Q);
    else B.write(A, Q)
  }
  Gw.prototype.string = function A(B) {
    var Q = ZR.Buffer.byteLength(B);
    if (this.uint32(Q), Q) this._push(y26, Q, B);
    return this
  };
  Gw._configure()
})
// @from(Start 4304296, End 4309921)
xZ1 = z((IN8, PO0) => {
  PO0.exports = PQ;
  var mC = Iw(),
    vg1, OO0 = mC.LongBits,
    k26 = mC.utf8;

  function dC(A, B) {
    return RangeError("index out of range: " + A.pos + " + " + (B || 1) + " > " + A.len)
  }

  function PQ(A) {
    this.buf = A, this.pos = 0, this.len = A.length
  }
  var LO0 = typeof Uint8Array !== "undefined" ? function A(B) {
      if (B instanceof Uint8Array || Array.isArray(B)) return new PQ(B);
      throw Error("illegal buffer")
    } : function A(B) {
      if (Array.isArray(B)) return new PQ(B);
      throw Error("illegal buffer")
    },
    TO0 = function A() {
      return mC.Buffer ? function B(Q) {
        return (PQ.create = function I(G) {
          return mC.Buffer.isBuffer(G) ? new vg1(G) : LO0(G)
        })(Q)
      } : LO0
    };
  PQ.create = TO0();
  PQ.prototype._slice = mC.Array.prototype.subarray || mC.Array.prototype.slice;
  PQ.prototype.uint32 = function A() {
    var B = 4294967295;
    return function Q() {
      if (B = (this.buf[this.pos] & 127) >>> 0, this.buf[this.pos++] < 128) return B;
      if (B = (B | (this.buf[this.pos] & 127) << 7) >>> 0, this.buf[this.pos++] < 128) return B;
      if (B = (B | (this.buf[this.pos] & 127) << 14) >>> 0, this.buf[this.pos++] < 128) return B;
      if (B = (B | (this.buf[this.pos] & 127) << 21) >>> 0, this.buf[this.pos++] < 128) return B;
      if (B = (B | (this.buf[this.pos] & 15) << 28) >>> 0, this.buf[this.pos++] < 128) return B;
      if ((this.pos += 5) > this.len) throw this.pos = this.len, dC(this, 10);
      return B
    }
  }();
  PQ.prototype.int32 = function A() {
    return this.uint32() | 0
  };
  PQ.prototype.sint32 = function A() {
    var B = this.uint32();
    return B >>> 1 ^ -(B & 1) | 0
  };

  function fg1() {
    var A = new OO0(0, 0),
      B = 0;
    if (this.len - this.pos > 4) {
      for (; B < 4; ++B)
        if (A.lo = (A.lo | (this.buf[this.pos] & 127) << B * 7) >>> 0, this.buf[this.pos++] < 128) return A;
      if (A.lo = (A.lo | (this.buf[this.pos] & 127) << 28) >>> 0, A.hi = (A.hi | (this.buf[this.pos] & 127) >> 4) >>> 0, this.buf[this.pos++] < 128) return A;
      B = 0
    } else {
      for (; B < 3; ++B) {
        if (this.pos >= this.len) throw dC(this);
        if (A.lo = (A.lo | (this.buf[this.pos] & 127) << B * 7) >>> 0, this.buf[this.pos++] < 128) return A
      }
      return A.lo = (A.lo | (this.buf[this.pos++] & 127) << B * 7) >>> 0, A
    }
    if (this.len - this.pos > 4) {
      for (; B < 5; ++B)
        if (A.hi = (A.hi | (this.buf[this.pos] & 127) << B * 7 + 3) >>> 0, this.buf[this.pos++] < 128) return A
    } else
      for (; B < 5; ++B) {
        if (this.pos >= this.len) throw dC(this);
        if (A.hi = (A.hi | (this.buf[this.pos] & 127) << B * 7 + 3) >>> 0, this.buf[this.pos++] < 128) return A
      }
    throw Error("invalid varint encoding")
  }
  PQ.prototype.bool = function A() {
    return this.uint32() !== 0
  };

  function kZ1(A, B) {
    return (A[B - 4] | A[B - 3] << 8 | A[B - 2] << 16 | A[B - 1] << 24) >>> 0
  }
  PQ.prototype.fixed32 = function A() {
    if (this.pos + 4 > this.len) throw dC(this, 4);
    return kZ1(this.buf, this.pos += 4)
  };
  PQ.prototype.sfixed32 = function A() {
    if (this.pos + 4 > this.len) throw dC(this, 4);
    return kZ1(this.buf, this.pos += 4) | 0
  };

  function RO0() {
    if (this.pos + 8 > this.len) throw dC(this, 8);
    return new OO0(kZ1(this.buf, this.pos += 4), kZ1(this.buf, this.pos += 4))
  }
  PQ.prototype.float = function A() {
    if (this.pos + 4 > this.len) throw dC(this, 4);
    var B = mC.float.readFloatLE(this.buf, this.pos);
    return this.pos += 4, B
  };
  PQ.prototype.double = function A() {
    if (this.pos + 8 > this.len) throw dC(this, 4);
    var B = mC.float.readDoubleLE(this.buf, this.pos);
    return this.pos += 8, B
  };
  PQ.prototype.bytes = function A() {
    var B = this.uint32(),
      Q = this.pos,
      I = this.pos + B;
    if (I > this.len) throw dC(this, B);
    if (this.pos += B, Array.isArray(this.buf)) return this.buf.slice(Q, I);
    if (Q === I) {
      var G = mC.Buffer;
      return G ? G.alloc(0) : new this.buf.constructor(0)
    }
    return this._slice.call(this.buf, Q, I)
  };
  PQ.prototype.string = function A() {
    var B = this.bytes();
    return k26.read(B, 0, B.length)
  };
  PQ.prototype.skip = function A(B) {
    if (typeof B === "number") {
      if (this.pos + B > this.len) throw dC(this, B);
      this.pos += B
    } else
      do
        if (this.pos >= this.len) throw dC(this); while (this.buf[this.pos++] & 128);
    return this
  };
  PQ.prototype.skipType = function(A) {
    switch (A) {
      case 0:
        this.skip();
        break;
      case 1:
        this.skip(8);
        break;
      case 2:
        this.skip(this.uint32());
        break;
      case 3:
        while ((A = this.uint32() & 7) !== 4) this.skipType(A);
        break;
      case 5:
        this.skip(4);
        break;
      default:
        throw Error("invalid wire type " + A + " at offset " + this.pos)
    }
    return this
  };
  PQ._configure = function(A) {
    vg1 = A, PQ.create = TO0(), vg1._configure();
    var B = mC.Long ? "toLong" : "toNumber";
    mC.merge(PQ.prototype, {
      int64: function Q() {
        return fg1.call(this)[B](!1)
      },
      uint64: function Q() {
        return fg1.call(this)[B](!0)
      },
      sint64: function Q() {
        return fg1.call(this).zzDecode()[B](!1)
      },
      fixed64: function Q() {
        return RO0.call(this)[B](!0)
      },
      sfixed64: function Q() {
        return RO0.call(this)[B](!1)
      }
    })
  }
})
// @from(Start 4309927, End 4310506)
yO0 = z((GN8, jO0) => {
  jO0.exports = l_;
  var _O0 = xZ1();
  (l_.prototype = Object.create(_O0.prototype)).constructor = l_;
  var SO0 = Iw();

  function l_(A) {
    _O0.call(this, A)
  }
  l_._configure = function() {
    if (SO0.Buffer) l_.prototype._slice = SO0.Buffer.prototype.slice
  };
  l_.prototype.string = function A() {
    var B = this.uint32();
    return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + B, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + B, this.len))
  };
  l_._configure()
})
// @from(Start 4310512, End 4311979)
xO0 = z((ZN8, kO0) => {
  kO0.exports = vs;
  var bg1 = Iw();
  (vs.prototype = Object.create(bg1.EventEmitter.prototype)).constructor = vs;

  function vs(A, B, Q) {
    if (typeof A !== "function") throw TypeError("rpcImpl must be a function");
    bg1.EventEmitter.call(this), this.rpcImpl = A, this.requestDelimited = Boolean(B), this.responseDelimited = Boolean(Q)
  }
  vs.prototype.rpcCall = function A(B, Q, I, G, Z) {
    if (!G) throw TypeError("request must be specified");
    var D = this;
    if (!Z) return bg1.asPromise(A, D, B, Q, I, G);
    if (!D.rpcImpl) {
      setTimeout(function() {
        Z(Error("already ended"))
      }, 0);
      return
    }
    try {
      return D.rpcImpl(B, Q[D.requestDelimited ? "encodeDelimited" : "encode"](G).finish(), function Y(W, J) {
        if (W) return D.emit("error", W, B), Z(W);
        if (J === null) {
          D.end(!0);
          return
        }
        if (!(J instanceof I)) try {
          J = I[D.responseDelimited ? "decodeDelimited" : "decode"](J)
        } catch (F) {
          return D.emit("error", F, B), Z(F)
        }
        return D.emit("data", J, B), Z(null, J)
      })
    } catch (Y) {
      D.emit("error", Y, B), setTimeout(function() {
        Z(Y)
      }, 0);
      return
    }
  };
  vs.prototype.end = function A(B) {
    if (this.rpcImpl) {
      if (!B) this.rpcImpl(null, null, null);
      this.rpcImpl = null, this.emit("end").off()
    }
    return this
  }
})
// @from(Start 4311985, End 4312045)
gg1 = z((fO0) => {
  var x26 = fO0;
  x26.Service = xO0()
})
// @from(Start 4312051, End 4312096)
hg1 = z((YN8, vO0) => {
  vO0.exports = {}
})
// @from(Start 4312102, End 4312472)
mg1 = z((gO0) => {
  var dY = gO0;
  dY.build = "minimal";
  dY.Writer = yZ1();
  dY.BufferWriter = MO0();
  dY.Reader = xZ1();
  dY.BufferReader = yO0();
  dY.util = Iw();
  dY.rpc = gg1();
  dY.roots = hg1();
  dY.configure = bO0;

  function bO0() {
    dY.util._configure(), dY.Writer._configure(dY.BufferWriter), dY.Reader._configure(dY.BufferReader)
  }
  bO0()
})