
// @from(Start 865147, End 865329)
KFA = z((_g5, CFA) => {
  /*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   */
  CFA.exports = VFA()
})
// @from(Start 865335, End 867294)
UFA = z((ZK9) => {
  /*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */
  var D61 = KFA(),
    eC9 = Z1("path").extname,
    HFA = /^\s*([^;\s]*)(?:;|\s|$)/,
    AK9 = /^text\//i;
  ZK9.charset = zFA;
  ZK9.charsets = {
    lookup: zFA
  };
  ZK9.contentType = BK9;
  ZK9.extension = QK9;
  ZK9.extensions = Object.create(null);
  ZK9.lookup = IK9;
  ZK9.types = Object.create(null);
  GK9(ZK9.extensions, ZK9.types);

  function zFA(A) {
    if (!A || typeof A !== "string") return !1;
    var B = HFA.exec(A),
      Q = B && D61[B[1].toLowerCase()];
    if (Q && Q.charset) return Q.charset;
    if (B && AK9.test(B[1])) return "UTF-8";
    return !1
  }

  function BK9(A) {
    if (!A || typeof A !== "string") return !1;
    var B = A.indexOf("/") === -1 ? ZK9.lookup(A) : A;
    if (!B) return !1;
    if (B.indexOf("charset") === -1) {
      var Q = ZK9.charset(B);
      if (Q) B += "; charset=" + Q.toLowerCase()
    }
    return B
  }

  function QK9(A) {
    if (!A || typeof A !== "string") return !1;
    var B = HFA.exec(A),
      Q = B && ZK9.extensions[B[1].toLowerCase()];
    if (!Q || !Q.length) return !1;
    return Q[0]
  }

  function IK9(A) {
    if (!A || typeof A !== "string") return !1;
    var B = eC9("x." + A).toLowerCase().substr(1);
    if (!B) return !1;
    return ZK9.types[B] || !1
  }

  function GK9(A, B) {
    var Q = ["nginx", "apache", void 0, "iana"];
    Object.keys(D61).forEach(function I(G) {
      var Z = D61[G],
        D = Z.extensions;
      if (!D || !D.length) return;
      A[G] = D;
      for (var Y = 0; Y < D.length; Y++) {
        var W = D[Y];
        if (B[W]) {
          var J = Q.indexOf(D61[B[W]].source),
            F = Q.indexOf(Z.source);
          if (B[W] !== "application/octet-stream" && (J > F || J === F && B[W].substr(0, 12) === "application/")) continue
        }
        B[W] = G
      }
    })
  }
})
// @from(Start 867300, End 867573)
$FA = z((yg5, NFA) => {
  NFA.exports = JK9;

  function JK9(A) {
    var B = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
    if (B) B(A);
    else setTimeout(A, 0)
  }
})
// @from(Start 867579, End 867857)
bq1 = z((kg5, MFA) => {
  var qFA = $FA();
  MFA.exports = FK9;

  function FK9(A) {
    var B = !1;
    return qFA(function() {
        B = !0
      }),
      function Q(I, G) {
        if (B) A(I, G);
        else qFA(function Z() {
          A(I, G)
        })
      }
  }
})
// @from(Start 867863, End 868076)
gq1 = z((xg5, LFA) => {
  LFA.exports = XK9;

  function XK9(A) {
    Object.keys(A.jobs).forEach(VK9.bind(A)), A.jobs = {}
  }

  function VK9(A) {
    if (typeof this.jobs[A] == "function") this.jobs[A]()
  }
})
// @from(Start 868082, End 868566)
hq1 = z((fg5, OFA) => {
  var RFA = bq1(),
    CK9 = gq1();
  OFA.exports = KK9;

  function KK9(A, B, Q, I) {
    var G = Q.keyedList ? Q.keyedList[Q.index] : Q.index;
    Q.jobs[G] = HK9(B, G, A[G], function(Z, D) {
      if (!(G in Q.jobs)) return;
      if (delete Q.jobs[G], Z) CK9(Q);
      else Q.results[G] = D;
      I(Z, Q.results)
    })
  }

  function HK9(A, B, Q, I) {
    var G;
    if (A.length == 2) G = A(Q, RFA(I));
    else G = A(Q, B, RFA(I));
    return G
  }
})
// @from(Start 868572, End 868968)
mq1 = z((vg5, TFA) => {
  TFA.exports = zK9;

  function zK9(A, B) {
    var Q = !Array.isArray(A),
      I = {
        index: 0,
        keyedList: Q || B ? Object.keys(A) : null,
        jobs: {},
        results: Q ? {} : [],
        size: Q ? Object.keys(A).length : A.length
      };
    if (B) I.keyedList.sort(Q ? B : function(G, Z) {
      return B(A[G], A[Z])
    });
    return I
  }
})
// @from(Start 868974, End 869196)
dq1 = z((bg5, PFA) => {
  var wK9 = gq1(),
    EK9 = bq1();
  PFA.exports = UK9;

  function UK9(A) {
    if (!Object.keys(this.jobs).length) return;
    this.index = this.size, wK9(this), EK9(A)(null, this.results)
  }
})
// @from(Start 869202, End 869628)
_FA = z((gg5, SFA) => {
  var NK9 = hq1(),
    $K9 = mq1(),
    qK9 = dq1();
  SFA.exports = MK9;

  function MK9(A, B, Q) {
    var I = $K9(A);
    while (I.index < (I.keyedList || A).length) NK9(A, B, I, function(G, Z) {
      if (G) {
        Q(G, Z);
        return
      }
      if (Object.keys(I.jobs).length === 0) {
        Q(null, I.results);
        return
      }
    }), I.index++;
    return qK9.bind(I, Q)
  }
})
// @from(Start 869634, End 870228)
uq1 = z((hg5, Y61) => {
  var jFA = hq1(),
    LK9 = mq1(),
    RK9 = dq1();
  Y61.exports = OK9;
  Y61.exports.ascending = yFA;
  Y61.exports.descending = TK9;

  function OK9(A, B, Q, I) {
    var G = LK9(A, Q);
    return jFA(A, B, G, function Z(D, Y) {
      if (D) {
        I(D, Y);
        return
      }
      if (G.index++, G.index < (G.keyedList || A).length) {
        jFA(A, B, G, Z);
        return
      }
      I(null, G.results)
    }), RK9.bind(G, I)
  }

  function yFA(A, B) {
    return A < B ? -1 : A > B ? 1 : 0
  }

  function TK9(A, B) {
    return -1 * yFA(A, B)
  }
})
// @from(Start 870234, End 870361)
xFA = z((mg5, kFA) => {
  var PK9 = uq1();
  kFA.exports = SK9;

  function SK9(A, B, Q) {
    return PK9(A, B, null, Q)
  }
})
// @from(Start 870367, End 870480)
vFA = z((dg5, fFA) => {
  fFA.exports = {
    parallel: _FA(),
    serial: xFA(),
    serialOrdered: uq1()
  }
})
// @from(Start 870486, End 870535)
pq1 = z((ug5, bFA) => {
  bFA.exports = Object
})
// @from(Start 870541, End 870589)
hFA = z((pg5, gFA) => {
  gFA.exports = Error
})
// @from(Start 870595, End 870647)
dFA = z((cg5, mFA) => {
  mFA.exports = EvalError
})
// @from(Start 870653, End 870706)
pFA = z((lg5, uFA) => {
  uFA.exports = RangeError
})
// @from(Start 870712, End 870769)
lFA = z((ig5, cFA) => {
  cFA.exports = ReferenceError
})
// @from(Start 870775, End 870829)
nFA = z((ng5, iFA) => {
  iFA.exports = SyntaxError
})
// @from(Start 870835, End 870887)
W61 = z((ag5, aFA) => {
  aFA.exports = TypeError
})
// @from(Start 870893, End 870944)
rFA = z((sg5, sFA) => {
  sFA.exports = URIError
})
// @from(Start 870950, End 871001)
tFA = z((rg5, oFA) => {
  oFA.exports = Math.abs
})
// @from(Start 871007, End 871060)
AXA = z((og5, eFA) => {
  eFA.exports = Math.floor
})
// @from(Start 871066, End 871117)
QXA = z((tg5, BXA) => {
  BXA.exports = Math.max
})
// @from(Start 871123, End 871174)
GXA = z((eg5, IXA) => {
  IXA.exports = Math.min
})
// @from(Start 871180, End 871231)
DXA = z((Ah5, ZXA) => {
  ZXA.exports = Math.pow
})
// @from(Start 871237, End 871290)
WXA = z((Bh5, YXA) => {
  YXA.exports = Math.round
})
// @from(Start 871296, End 871393)
FXA = z((Qh5, JXA) => {
  JXA.exports = Number.isNaN || function A(B) {
    return B !== B
  }
})
// @from(Start 871399, End 871543)
VXA = z((Ih5, XXA) => {
  var _K9 = FXA();
  XXA.exports = function A(B) {
    if (_K9(B) || B === 0) return B;
    return B < 0 ? -1 : 1
  }
})
// @from(Start 871549, End 871623)
KXA = z((Gh5, CXA) => {
  CXA.exports = Object.getOwnPropertyDescriptor
})
// @from(Start 871629, End 871768)
cq1 = z((Zh5, HXA) => {
  var J61 = KXA();
  if (J61) try {
    J61([], "length")
  } catch (A) {
    J61 = null
  }
  HXA.exports = J61
})
// @from(Start 871774, End 871952)
wXA = z((Dh5, zXA) => {
  var F61 = Object.defineProperty || !1;
  if (F61) try {
    F61({}, "a", {
      value: 1
    })
  } catch (A) {
    F61 = !1
  }
  zXA.exports = F61
})
// @from(Start 871958, End 873057)
lq1 = z((Yh5, EXA) => {
  EXA.exports = function A() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") return !1;
    if (typeof Symbol.iterator === "symbol") return !0;
    var B = {},
      Q = Symbol("test"),
      I = Object(Q);
    if (typeof Q === "string") return !1;
    if (Object.prototype.toString.call(Q) !== "[object Symbol]") return !1;
    if (Object.prototype.toString.call(I) !== "[object Symbol]") return !1;
    var G = 42;
    B[Q] = G;
    for (var Z in B) return !1;
    if (typeof Object.keys === "function" && Object.keys(B).length !== 0) return !1;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(B).length !== 0) return !1;
    var D = Object.getOwnPropertySymbols(B);
    if (D.length !== 1 || D[0] !== Q) return !1;
    if (!Object.prototype.propertyIsEnumerable.call(B, Q)) return !1;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var Y = Object.getOwnPropertyDescriptor(B, Q);
      if (Y.value !== G || Y.enumerable !== !0) return !1
    }
    return !0
  }
})
// @from(Start 873063, End 873411)
$XA = z((Wh5, NXA) => {
  var UXA = typeof Symbol !== "undefined" && Symbol,
    jK9 = lq1();
  NXA.exports = function A() {
    if (typeof UXA !== "function") return !1;
    if (typeof Symbol !== "function") return !1;
    if (typeof UXA("foo") !== "symbol") return !1;
    if (typeof Symbol("bar") !== "symbol") return !1;
    return jK9()
  }
})
// @from(Start 873417, End 873524)
iq1 = z((Jh5, qXA) => {
  qXA.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null
})
// @from(Start 873530, End 873618)
nq1 = z((Fh5, MXA) => {
  var yK9 = pq1();
  MXA.exports = yK9.getPrototypeOf || null
})
// @from(Start 873624, End 875066)
OXA = z((Xh5, RXA) => {
  var kK9 = "Function.prototype.bind called on incompatible ",
    xK9 = Object.prototype.toString,
    fK9 = Math.max,
    vK9 = "[object Function]",
    LXA = function A(B, Q) {
      var I = [];
      for (var G = 0; G < B.length; G += 1) I[G] = B[G];
      for (var Z = 0; Z < Q.length; Z += 1) I[Z + B.length] = Q[Z];
      return I
    },
    bK9 = function A(B, Q) {
      var I = [];
      for (var G = Q || 0, Z = 0; G < B.length; G += 1, Z += 1) I[Z] = B[G];
      return I
    },
    gK9 = function(A, B) {
      var Q = "";
      for (var I = 0; I < A.length; I += 1)
        if (Q += A[I], I + 1 < A.length) Q += B;
      return Q
    };
  RXA.exports = function A(B) {
    var Q = this;
    if (typeof Q !== "function" || xK9.apply(Q) !== vK9) throw new TypeError(kK9 + Q);
    var I = bK9(arguments, 1),
      G, Z = function() {
        if (this instanceof G) {
          var F = Q.apply(this, LXA(I, arguments));
          if (Object(F) === F) return F;
          return this
        }
        return Q.apply(B, LXA(I, arguments))
      },
      D = fK9(0, Q.length - I.length),
      Y = [];
    for (var W = 0; W < D; W++) Y[W] = "$" + W;
    if (G = Function("binder", "return function (" + gK9(Y, ",") + "){ return binder.apply(this,arguments); }")(Z), Q.prototype) {
      var J = function F() {};
      J.prototype = Q.prototype, G.prototype = new J, J.prototype = null
    }
    return G
  }
})
// @from(Start 875072, End 875163)
$l = z((Vh5, TXA) => {
  var hK9 = OXA();
  TXA.exports = Function.prototype.bind || hK9
})
// @from(Start 875169, End 875235)
X61 = z((Ch5, PXA) => {
  PXA.exports = Function.prototype.call
})
// @from(Start 875241, End 875308)
aq1 = z((Kh5, SXA) => {
  SXA.exports = Function.prototype.apply
})
// @from(Start 875314, End 875415)
jXA = z((Hh5, _XA) => {
  _XA.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply
})
// @from(Start 875421, End 875558)
kXA = z((zh5, yXA) => {
  var mK9 = $l(),
    dK9 = aq1(),
    uK9 = X61(),
    pK9 = jXA();
  yXA.exports = pK9 || mK9.call(uK9, dK9)
})
// @from(Start 875564, End 875816)
fXA = z((wh5, xXA) => {
  var cK9 = $l(),
    lK9 = W61(),
    iK9 = X61(),
    nK9 = kXA();
  xXA.exports = function A(B) {
    if (B.length < 1 || typeof B[0] !== "function") throw new lK9("a function is required");
    return nK9(cK9, iK9, B)
  }
})
// @from(Start 875822, End 876336)
dXA = z((Eh5, mXA) => {
  var aK9 = fXA(),
    vXA = cq1(),
    gXA;
  try {
    gXA = [].__proto__ === Array.prototype
  } catch (A) {
    if (!A || typeof A !== "object" || !("code" in A) || A.code !== "ERR_PROTO_ACCESS") throw A
  }
  var sq1 = !!gXA && vXA && vXA(Object.prototype, "__proto__"),
    hXA = Object,
    bXA = hXA.getPrototypeOf;
  mXA.exports = sq1 && typeof sq1.get === "function" ? aK9([sq1.get]) : typeof bXA === "function" ? function A(B) {
    return bXA(B == null ? B : hXA(B))
  } : !1
})
// @from(Start 876342, End 876692)
iXA = z((Uh5, lXA) => {
  var uXA = iq1(),
    pXA = nq1(),
    cXA = dXA();
  lXA.exports = uXA ? function A(B) {
    return uXA(B)
  } : pXA ? function A(B) {
    if (!B || typeof B !== "object" && typeof B !== "function") throw new TypeError("getProto: not an object");
    return pXA(B)
  } : cXA ? function A(B) {
    return cXA(B)
  } : null
})
// @from(Start 876698, End 876855)
rq1 = z((Nh5, nXA) => {
  var sK9 = Function.prototype.call,
    rK9 = Object.prototype.hasOwnProperty,
    oK9 = $l();
  nXA.exports = oK9.call(sK9, rK9)
})
// @from(Start 876861, End 888285)
eXA = z(($h5, tXA) => {
  var q6, tK9 = pq1(),
    eK9 = hFA(),
    AH9 = dFA(),
    BH9 = pFA(),
    QH9 = lFA(),
    ux = nFA(),
    dx = W61(),
    IH9 = rFA(),
    GH9 = tFA(),
    ZH9 = AXA(),
    DH9 = QXA(),
    YH9 = GXA(),
    WH9 = DXA(),
    JH9 = WXA(),
    FH9 = VXA(),
    rXA = Function,
    oq1 = function(A) {
      try {
        return rXA('"use strict"; return (' + A + ").constructor;")()
      } catch (B) {}
    },
    ql = cq1(),
    XH9 = wXA(),
    tq1 = function() {
      throw new dx
    },
    VH9 = ql ? function() {
      try {
        return arguments.callee, tq1
      } catch (A) {
        try {
          return ql(arguments, "callee").get
        } catch (B) {
          return tq1
        }
      }
    }() : tq1,
    hx = $XA()(),
    VI = iXA(),
    CH9 = nq1(),
    KH9 = iq1(),
    oXA = aq1(),
    Ml = X61(),
    mx = {},
    HH9 = typeof Uint8Array === "undefined" || !VI ? q6 : VI(Uint8Array),
    iP = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? q6 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? q6 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hx && VI ? VI([][Symbol.iterator]()) : q6,
      "%AsyncFromSyncIteratorPrototype%": q6,
      "%AsyncFunction%": mx,
      "%AsyncGenerator%": mx,
      "%AsyncGeneratorFunction%": mx,
      "%AsyncIteratorPrototype%": mx,
      "%Atomics%": typeof Atomics === "undefined" ? q6 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? q6 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? q6 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? q6 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? q6 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": eK9,
      "%eval%": eval,
      "%EvalError%": AH9,
      "%Float16Array%": typeof Float16Array === "undefined" ? q6 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? q6 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? q6 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? q6 : FinalizationRegistry,
      "%Function%": rXA,
      "%GeneratorFunction%": mx,
      "%Int8Array%": typeof Int8Array === "undefined" ? q6 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? q6 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? q6 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hx && VI ? VI(VI([][Symbol.iterator]())) : q6,
      "%JSON%": typeof JSON === "object" ? JSON : q6,
      "%Map%": typeof Map === "undefined" ? q6 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hx || !VI ? q6 : VI(new Map()[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": tK9,
      "%Object.getOwnPropertyDescriptor%": ql,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? q6 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? q6 : Proxy,
      "%RangeError%": BH9,
      "%ReferenceError%": QH9,
      "%Reflect%": typeof Reflect === "undefined" ? q6 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? q6 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hx || !VI ? q6 : VI(new Set()[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? q6 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hx && VI ? VI("" [Symbol.iterator]()) : q6,
      "%Symbol%": hx ? Symbol : q6,
      "%SyntaxError%": ux,
      "%ThrowTypeError%": VH9,
      "%TypedArray%": HH9,
      "%TypeError%": dx,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? q6 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? q6 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? q6 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? q6 : Uint32Array,
      "%URIError%": IH9,
      "%WeakMap%": typeof WeakMap === "undefined" ? q6 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? q6 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? q6 : WeakSet,
      "%Function.prototype.call%": Ml,
      "%Function.prototype.apply%": oXA,
      "%Object.defineProperty%": XH9,
      "%Object.getPrototypeOf%": CH9,
      "%Math.abs%": GH9,
      "%Math.floor%": ZH9,
      "%Math.max%": DH9,
      "%Math.min%": YH9,
      "%Math.pow%": WH9,
      "%Math.round%": JH9,
      "%Math.sign%": FH9,
      "%Reflect.getPrototypeOf%": KH9
    };
  if (VI) try {
    null.error
  } catch (A) {
    eq1 = VI(VI(A)), iP["%Error.prototype%"] = eq1
  }
  var eq1, zH9 = function A(B) {
      var Q;
      if (B === "%AsyncFunction%") Q = oq1("async function () {}");
      else if (B === "%GeneratorFunction%") Q = oq1("function* () {}");
      else if (B === "%AsyncGeneratorFunction%") Q = oq1("async function* () {}");
      else if (B === "%AsyncGenerator%") {
        var I = A("%AsyncGeneratorFunction%");
        if (I) Q = I.prototype
      } else if (B === "%AsyncIteratorPrototype%") {
        var G = A("%AsyncGenerator%");
        if (G && VI) Q = VI(G.prototype)
      }
      return iP[B] = Q, Q
    },
    aXA = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    },
    Ll = $l(),
    V61 = rq1(),
    wH9 = Ll.call(Ml, Array.prototype.concat),
    EH9 = Ll.call(oXA, Array.prototype.splice),
    sXA = Ll.call(Ml, String.prototype.replace),
    C61 = Ll.call(Ml, String.prototype.slice),
    UH9 = Ll.call(Ml, RegExp.prototype.exec),
    NH9 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
    $H9 = /\\(\\)?/g,
    qH9 = function A(B) {
      var Q = C61(B, 0, 1),
        I = C61(B, -1);
      if (Q === "%" && I !== "%") throw new ux("invalid intrinsic syntax, expected closing `%`");
      else if (I === "%" && Q !== "%") throw new ux("invalid intrinsic syntax, expected opening `%`");
      var G = [];
      return sXA(B, NH9, function(Z, D, Y, W) {
        G[G.length] = Y ? sXA(W, $H9, "$1") : D || Z
      }), G
    },
    MH9 = function A(B, Q) {
      var I = B,
        G;
      if (V61(aXA, I)) G = aXA[I], I = "%" + G[0] + "%";
      if (V61(iP, I)) {
        var Z = iP[I];
        if (Z === mx) Z = zH9(I);
        if (typeof Z === "undefined" && !Q) throw new dx("intrinsic " + B + " exists, but is not available. Please file an issue!");
        return {
          alias: G,
          name: I,
          value: Z
        }
      }
      throw new ux("intrinsic " + B + " does not exist!")
    };
  tXA.exports = function A(B, Q) {
    if (typeof B !== "string" || B.length === 0) throw new dx("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof Q !== "boolean") throw new dx('"allowMissing" argument must be a boolean');
    if (UH9(/^%?[^%]*%?$/, B) === null) throw new ux("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var I = qH9(B),
      G = I.length > 0 ? I[0] : "",
      Z = MH9("%" + G + "%", Q),
      D = Z.name,
      Y = Z.value,
      W = !1,
      J = Z.alias;
    if (J) G = J[0], EH9(I, wH9([0, 1], J));
    for (var F = 1, X = !0; F < I.length; F += 1) {
      var V = I[F],
        C = C61(V, 0, 1),
        K = C61(V, -1);
      if ((C === '"' || C === "'" || C === "`" || (K === '"' || K === "'" || K === "`")) && C !== K) throw new ux("property names with quotes must have matching quotes");
      if (V === "constructor" || !X) W = !0;
      if (G += "." + V, D = "%" + G + "%", V61(iP, D)) Y = iP[D];
      else if (Y != null) {
        if (!(V in Y)) {
          if (!Q) throw new dx("base intrinsic for " + B + " exists, but the property is not available.");
          return
        }
        if (ql && F + 1 >= I.length) {
          var E = ql(Y, V);
          if (X = !!E, X && "get" in E && !("originalValue" in E.get)) Y = E.get;
          else Y = Y[V]
        } else X = V61(Y, V), Y = Y[V];
        if (X && !W) iP[D] = Y
      }
    }
    return Y
  }
})
// @from(Start 888291, End 888412)
BVA = z((qh5, AVA) => {
  var LH9 = lq1();
  AVA.exports = function A() {
    return LH9() && !!Symbol.toStringTag
  }
})
// @from(Start 888418, End 889198)
GVA = z((Mh5, IVA) => {
  var RH9 = eXA(),
    QVA = RH9("%Object.defineProperty%", !0),
    OH9 = BVA()(),
    TH9 = rq1(),
    PH9 = W61(),
    K61 = OH9 ? Symbol.toStringTag : null;
  IVA.exports = function A(B, Q) {
    var I = arguments.length > 2 && !!arguments[2] && arguments[2].force,
      G = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
    if (typeof I !== "undefined" && typeof I !== "boolean" || typeof G !== "undefined" && typeof G !== "boolean") throw new PH9("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
    if (K61 && (I || !TH9(B, K61)))
      if (QVA) QVA(B, K61, {
        configurable: !G,
        enumerable: !1,
        value: Q,
        writable: !1
      });
      else B[K61] = Q
  }
})
// @from(Start 889204, End 889351)
DVA = z((Lh5, ZVA) => {
  ZVA.exports = function(A, B) {
    return Object.keys(B).forEach(function(Q) {
      A[Q] = A[Q] || B[Q]
    }), A
  }
})
// @from(Start 889357, End 896863)
WVA = z((Rh5, YVA) => {
  var IM1 = XFA(),
    SH9 = Z1("util"),
    AM1 = Z1("path"),
    _H9 = Z1("http"),
    jH9 = Z1("https"),
    yH9 = Z1("url").parse,
    kH9 = Z1("fs"),
    xH9 = Z1("stream").Stream,
    BM1 = UFA(),
    fH9 = vFA(),
    vH9 = GVA(),
    QM1 = DVA();
  YVA.exports = e6;
  SH9.inherits(e6, IM1);

  function e6(A) {
    if (!(this instanceof e6)) return new e6(A);
    this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], IM1.call(this), A = A || {};
    for (var B in A) this[B] = A[B]
  }
  e6.LINE_BREAK = `\r
`;
  e6.DEFAULT_CONTENT_TYPE = "application/octet-stream";
  e6.prototype.append = function(A, B, Q) {
    if (Q = Q || {}, typeof Q == "string") Q = {
      filename: Q
    };
    var I = IM1.prototype.append.bind(this);
    if (typeof B == "number") B = "" + B;
    if (Array.isArray(B)) {
      this._error(new Error("Arrays are not supported."));
      return
    }
    var G = this._multiPartHeader(A, B, Q),
      Z = this._multiPartFooter();
    I(G), I(B), I(Z), this._trackLength(G, B, Q)
  };
  e6.prototype._trackLength = function(A, B, Q) {
    var I = 0;
    if (Q.knownLength != null) I += +Q.knownLength;
    else if (Buffer.isBuffer(B)) I = B.length;
    else if (typeof B === "string") I = Buffer.byteLength(B);
    if (this._valueLength += I, this._overheadLength += Buffer.byteLength(A) + e6.LINE_BREAK.length, !B || !B.path && !(B.readable && Object.prototype.hasOwnProperty.call(B, "httpVersion")) && !(B instanceof xH9)) return;
    if (!Q.knownLength) this._valuesToMeasure.push(B)
  };
  e6.prototype._lengthRetriever = function(A, B) {
    if (Object.prototype.hasOwnProperty.call(A, "fd"))
      if (A.end != null && A.end != 1 / 0 && A.start != null) B(null, A.end + 1 - (A.start ? A.start : 0));
      else kH9.stat(A.path, function(Q, I) {
        var G;
        if (Q) {
          B(Q);
          return
        }
        G = I.size - (A.start ? A.start : 0), B(null, G)
      });
    else if (Object.prototype.hasOwnProperty.call(A, "httpVersion")) B(null, +A.headers["content-length"]);
    else if (Object.prototype.hasOwnProperty.call(A, "httpModule")) A.on("response", function(Q) {
      A.pause(), B(null, +Q.headers["content-length"])
    }), A.resume();
    else B("Unknown stream")
  };
  e6.prototype._multiPartHeader = function(A, B, Q) {
    if (typeof Q.header == "string") return Q.header;
    var I = this._getContentDisposition(B, Q),
      G = this._getContentType(B, Q),
      Z = "",
      D = {
        "Content-Disposition": ["form-data", 'name="' + A + '"'].concat(I || []),
        "Content-Type": [].concat(G || [])
      };
    if (typeof Q.header == "object") QM1(D, Q.header);
    var Y;
    for (var W in D)
      if (Object.prototype.hasOwnProperty.call(D, W)) {
        if (Y = D[W], Y == null) continue;
        if (!Array.isArray(Y)) Y = [Y];
        if (Y.length) Z += W + ": " + Y.join("; ") + e6.LINE_BREAK
      } return "--" + this.getBoundary() + e6.LINE_BREAK + Z + e6.LINE_BREAK
  };
  e6.prototype._getContentDisposition = function(A, B) {
    var Q, I;
    if (typeof B.filepath === "string") Q = AM1.normalize(B.filepath).replace(/\\/g, "/");
    else if (B.filename || A.name || A.path) Q = AM1.basename(B.filename || A.name || A.path);
    else if (A.readable && Object.prototype.hasOwnProperty.call(A, "httpVersion")) Q = AM1.basename(A.client._httpMessage.path || "");
    if (Q) I = 'filename="' + Q + '"';
    return I
  };
  e6.prototype._getContentType = function(A, B) {
    var Q = B.contentType;
    if (!Q && A.name) Q = BM1.lookup(A.name);
    if (!Q && A.path) Q = BM1.lookup(A.path);
    if (!Q && A.readable && Object.prototype.hasOwnProperty.call(A, "httpVersion")) Q = A.headers["content-type"];
    if (!Q && (B.filepath || B.filename)) Q = BM1.lookup(B.filepath || B.filename);
    if (!Q && typeof A == "object") Q = e6.DEFAULT_CONTENT_TYPE;
    return Q
  };
  e6.prototype._multiPartFooter = function() {
    return function(A) {
      var B = e6.LINE_BREAK,
        Q = this._streams.length === 0;
      if (Q) B += this._lastBoundary();
      A(B)
    }.bind(this)
  };
  e6.prototype._lastBoundary = function() {
    return "--" + this.getBoundary() + "--" + e6.LINE_BREAK
  };
  e6.prototype.getHeaders = function(A) {
    var B, Q = {
      "content-type": "multipart/form-data; boundary=" + this.getBoundary()
    };
    for (B in A)
      if (Object.prototype.hasOwnProperty.call(A, B)) Q[B.toLowerCase()] = A[B];
    return Q
  };
  e6.prototype.setBoundary = function(A) {
    this._boundary = A
  };
  e6.prototype.getBoundary = function() {
    if (!this._boundary) this._generateBoundary();
    return this._boundary
  };
  e6.prototype.getBuffer = function() {
    var A = new Buffer.alloc(0),
      B = this.getBoundary();
    for (var Q = 0, I = this._streams.length; Q < I; Q++)
      if (typeof this._streams[Q] !== "function") {
        if (Buffer.isBuffer(this._streams[Q])) A = Buffer.concat([A, this._streams[Q]]);
        else A = Buffer.concat([A, Buffer.from(this._streams[Q])]);
        if (typeof this._streams[Q] !== "string" || this._streams[Q].substring(2, B.length + 2) !== B) A = Buffer.concat([A, Buffer.from(e6.LINE_BREAK)])
      } return Buffer.concat([A, Buffer.from(this._lastBoundary())])
  };
  e6.prototype._generateBoundary = function() {
    var A = "--------------------------";
    for (var B = 0; B < 24; B++) A += Math.floor(Math.random() * 10).toString(16);
    this._boundary = A
  };
  e6.prototype.getLengthSync = function() {
    var A = this._overheadLength + this._valueLength;
    if (this._streams.length) A += this._lastBoundary().length;
    if (!this.hasKnownLength()) this._error(new Error("Cannot calculate proper length in synchronous way."));
    return A
  };
  e6.prototype.hasKnownLength = function() {
    var A = !0;
    if (this._valuesToMeasure.length) A = !1;
    return A
  };
  e6.prototype.getLength = function(A) {
    var B = this._overheadLength + this._valueLength;
    if (this._streams.length) B += this._lastBoundary().length;
    if (!this._valuesToMeasure.length) {
      process.nextTick(A.bind(this, null, B));
      return
    }
    fH9.parallel(this._valuesToMeasure, this._lengthRetriever, function(Q, I) {
      if (Q) {
        A(Q);
        return
      }
      I.forEach(function(G) {
        B += G
      }), A(null, B)
    })
  };
  e6.prototype.submit = function(A, B) {
    var Q, I, G = {
      method: "post"
    };
    if (typeof A == "string") A = yH9(A), I = QM1({
      port: A.port,
      path: A.pathname,
      host: A.hostname,
      protocol: A.protocol
    }, G);
    else if (I = QM1(A, G), !I.port) I.port = I.protocol == "https:" ? 443 : 80;
    if (I.headers = this.getHeaders(A.headers), I.protocol == "https:") Q = jH9.request(I);
    else Q = _H9.request(I);
    return this.getLength(function(Z, D) {
      if (Z && Z !== "Unknown stream") {
        this._error(Z);
        return
      }
      if (D) Q.setHeader("Content-Length", D);
      if (this.pipe(Q), B) {
        var Y, W = function(J, F) {
          return Q.removeListener("error", W), Q.removeListener("response", Y), B.call(this, J, F)
        };
        Y = W.bind(this, null), Q.on("error", W), Q.on("response", Y)
      }
    }.bind(this)), Q
  };
  e6.prototype._error = function(A) {
    if (!this.error) this.error = A, this.pause(), this.emit("error", A)
  };
  e6.prototype.toString = function() {
    return "[object FormData]"
  };
  vH9(e6, "FormData")
})
// @from(Start 896869, End 898306)
LVA = z((Yz9) => {
  var Qz9 = Z1("url").parse,
    Iz9 = {
      ftp: 21,
      gopher: 70,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443
    },
    Gz9 = String.prototype.endsWith || function(A) {
      return A.length <= this.length && this.indexOf(A, this.length - A.length) !== -1
    };

  function Zz9(A) {
    var B = typeof A === "string" ? Qz9(A) : A || {},
      Q = B.protocol,
      I = B.host,
      G = B.port;
    if (typeof I !== "string" || !I || typeof Q !== "string") return "";
    if (Q = Q.split(":", 1)[0], I = I.replace(/:\d*$/, ""), G = parseInt(G) || Iz9[Q] || 0, !Dz9(I, G)) return "";
    var Z = lx("npm_config_" + Q + "_proxy") || lx(Q + "_proxy") || lx("npm_config_proxy") || lx("all_proxy");
    if (Z && Z.indexOf("://") === -1) Z = Q + "://" + Z;
    return Z
  }

  function Dz9(A, B) {
    var Q = (lx("npm_config_no_proxy") || lx("no_proxy")).toLowerCase();
    if (!Q) return !0;
    if (Q === "*") return !1;
    return Q.split(/[,\s]/).every(function(I) {
      if (!I) return !0;
      var G = I.match(/^(.+):(\d+)$/),
        Z = G ? G[1] : I,
        D = G ? parseInt(G[2]) : 0;
      if (D && D !== B) return !0;
      if (!/^[.*]/.test(Z)) return A !== Z;
      if (Z.charAt(0) === "*") Z = Z.slice(1);
      return !Gz9.call(A, Z)
    })
  }

  function lx(A) {
    return process.env[A.toLowerCase()] || process.env[A.toUpperCase()] || ""
  }
  Yz9.getProxyForUrl = Zz9
})
// @from(Start 898312, End 900518)
OVA = z((Pm5, RVA) => {
  var ix = 1000,
    nx = ix * 60,
    ax = nx * 60,
    sP = ax * 24,
    Jz9 = sP * 7,
    Fz9 = sP * 365.25;
  RVA.exports = function(A, B) {
    B = B || {};
    var Q = typeof A;
    if (Q === "string" && A.length > 0) return Xz9(A);
    else if (Q === "number" && isFinite(A)) return B.long ? Cz9(A) : Vz9(A);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(A))
  };

  function Xz9(A) {
    if (A = String(A), A.length > 100) return;
    var B = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(A);
    if (!B) return;
    var Q = parseFloat(B[1]),
      I = (B[2] || "ms").toLowerCase();
    switch (I) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return Q * Fz9;
      case "weeks":
      case "week":
      case "w":
        return Q * Jz9;
      case "days":
      case "day":
      case "d":
        return Q * sP;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return Q * ax;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return Q * nx;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return Q * ix;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return Q;
      default:
        return
    }
  }

  function Vz9(A) {
    var B = Math.abs(A);
    if (B >= sP) return Math.round(A / sP) + "d";
    if (B >= ax) return Math.round(A / ax) + "h";
    if (B >= nx) return Math.round(A / nx) + "m";
    if (B >= ix) return Math.round(A / ix) + "s";
    return A + "ms"
  }

  function Cz9(A) {
    var B = Math.abs(A);
    if (B >= sP) return E61(A, B, sP, "day");
    if (B >= ax) return E61(A, B, ax, "hour");
    if (B >= nx) return E61(A, B, nx, "minute");
    if (B >= ix) return E61(A, B, ix, "second");
    return A + " ms"
  }

  function E61(A, B, Q, I) {
    var G = B >= Q * 1.5;
    return Math.round(A / Q) + " " + I + (G ? "s" : "")
  }
})
// @from(Start 900524, End 903677)
HM1 = z((Sm5, TVA) => {
  function Kz9(A) {
    Q.debug = Q, Q.default = Q, Q.coerce = W, Q.disable = D, Q.enable = G, Q.enabled = Y, Q.humanize = OVA(), Q.destroy = J, Object.keys(A).forEach((F) => {
      Q[F] = A[F]
    }), Q.names = [], Q.skips = [], Q.formatters = {};

    function B(F) {
      let X = 0;
      for (let V = 0; V < F.length; V++) X = (X << 5) - X + F.charCodeAt(V), X |= 0;
      return Q.colors[Math.abs(X) % Q.colors.length]
    }
    Q.selectColor = B;

    function Q(F) {
      let X, V = null,
        C, K;

      function E(...N) {
        if (!E.enabled) return;
        let q = E,
          O = Number(new Date),
          R = O - (X || O);
        if (q.diff = R, q.prev = X, q.curr = O, X = O, N[0] = Q.coerce(N[0]), typeof N[0] !== "string") N.unshift("%O");
        let T = 0;
        N[0] = N[0].replace(/%([a-zA-Z%])/g, (_, k) => {
          if (_ === "%%") return "%";
          T++;
          let i = Q.formatters[k];
          if (typeof i === "function") {
            let x = N[T];
            _ = i.call(q, x), N.splice(T, 1), T--
          }
          return _
        }), Q.formatArgs.call(q, N), (q.log || Q.log).apply(q, N)
      }
      if (E.namespace = F, E.useColors = Q.useColors(), E.color = Q.selectColor(F), E.extend = I, E.destroy = Q.destroy, Object.defineProperty(E, "enabled", {
          enumerable: !0,
          configurable: !1,
          get: () => {
            if (V !== null) return V;
            if (C !== Q.namespaces) C = Q.namespaces, K = Q.enabled(F);
            return K
          },
          set: (N) => {
            V = N
          }
        }), typeof Q.init === "function") Q.init(E);
      return E
    }

    function I(F, X) {
      let V = Q(this.namespace + (typeof X === "undefined" ? ":" : X) + F);
      return V.log = this.log, V
    }

    function G(F) {
      Q.save(F), Q.namespaces = F, Q.names = [], Q.skips = [];
      let X = (typeof F === "string" ? F : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (let V of X)
        if (V[0] === "-") Q.skips.push(V.slice(1));
        else Q.names.push(V)
    }

    function Z(F, X) {
      let V = 0,
        C = 0,
        K = -1,
        E = 0;
      while (V < F.length)
        if (C < X.length && (X[C] === F[V] || X[C] === "*"))
          if (X[C] === "*") K = C, E = V, C++;
          else V++, C++;
      else if (K !== -1) C = K + 1, E++, V = E;
      else return !1;
      while (C < X.length && X[C] === "*") C++;
      return C === X.length
    }

    function D() {
      let F = [...Q.names, ...Q.skips.map((X) => "-" + X)].join(",");
      return Q.enable(""), F
    }

    function Y(F) {
      for (let X of Q.skips)
        if (Z(F, X)) return !1;
      for (let X of Q.names)
        if (Z(F, X)) return !0;
      return !1
    }

    function W(F) {
      if (F instanceof Error) return F.stack || F.message;
      return F
    }

    function J() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
    }
    return Q.enable(Q.load()), Q
  }
  TVA.exports = Kz9
})
// @from(Start 903683, End 906958)
SVA = z((PVA, N61) => {
  PVA.formatArgs = zz9;
  PVA.save = wz9;
  PVA.load = Ez9;
  PVA.useColors = Hz9;
  PVA.storage = Uz9();
  PVA.destroy = (() => {
    let A = !1;
    return () => {
      if (!A) A = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
    }
  })();
  PVA.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];

  function Hz9() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
    let A;
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (A = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(A[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
  }

  function zz9(A) {
    if (A[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + A[0] + (this.useColors ? "%c " : " ") + "+" + N61.exports.humanize(this.diff), !this.useColors) return;
    let B = "color: " + this.color;
    A.splice(1, 0, B, "color: inherit");
    let Q = 0,
      I = 0;
    A[0].replace(/%[a-zA-Z%]/g, (G) => {
      if (G === "%%") return;
      if (Q++, G === "%c") I = Q
    }), A.splice(I, 0, B)
  }
  PVA.log = console.debug || console.log || (() => {});

  function wz9(A) {
    try {
      if (A) PVA.storage.setItem("debug", A);
      else PVA.storage.removeItem("debug")
    } catch (B) {}
  }

  function Ez9() {
    let A;
    try {
      A = PVA.storage.getItem("debug")
    } catch (B) {}
    if (!A && typeof process !== "undefined" && "env" in process) A = process.env.DEBUG;
    return A
  }

  function Uz9() {
    try {
      return localStorage
    } catch (A) {}
  }
  N61.exports = HM1()(PVA);
  var {
    formatters: Nz9
  } = N61.exports;
  Nz9.j = function(A) {
    try {
      return JSON.stringify(A)
    } catch (B) {
      return "[UnexpectedJSONParseError]: " + B.message
    }
  }
})
// @from(Start 906964, End 907200)
Sl = z((jm5, _VA) => {
  _VA.exports = (A, B = process.argv) => {
    let Q = A.startsWith("-") ? "" : A.length === 1 ? "-" : "--",
      I = B.indexOf(Q + A),
      G = B.indexOf("--");
    return I !== -1 && (G === -1 || I < G)
  }
})
// @from(Start 907206, End 909636)
kVA = z((ym5, yVA) => {
  var Pz9 = Z1("os"),
    jVA = Z1("tty"),
    cF = Sl(),
    {
      env: CI
    } = process,
    $61;
  if (cF("no-color") || cF("no-colors") || cF("color=false") || cF("color=never")) $61 = 0;
  else if (cF("color") || cF("colors") || cF("color=true") || cF("color=always")) $61 = 1;

  function Sz9() {
    if ("FORCE_COLOR" in CI) {
      if (CI.FORCE_COLOR === "true") return 1;
      if (CI.FORCE_COLOR === "false") return 0;
      return CI.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(CI.FORCE_COLOR, 10), 3)
    }
  }

  function _z9(A) {
    if (A === 0) return !1;
    return {
      level: A,
      hasBasic: !0,
      has256: A >= 2,
      has16m: A >= 3
    }
  }

  function jz9(A, {
    streamIsTTY: B,
    sniffFlags: Q = !0
  } = {}) {
    let I = Sz9();
    if (I !== void 0) $61 = I;
    let G = Q ? $61 : I;
    if (G === 0) return 0;
    if (Q) {
      if (cF("color=16m") || cF("color=full") || cF("color=truecolor")) return 3;
      if (cF("color=256")) return 2
    }
    if (A && !B && G === void 0) return 0;
    let Z = G || 0;
    if (CI.TERM === "dumb") return Z;
    if (process.platform === "win32") {
      let D = Pz9.release().split(".");
      if (Number(D[0]) >= 10 && Number(D[2]) >= 10586) return Number(D[2]) >= 14931 ? 3 : 2;
      return 1
    }
    if ("CI" in CI) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE"].some((D) => (D in CI)) || CI.CI_NAME === "codeship") return 1;
      return Z
    }
    if ("TEAMCITY_VERSION" in CI) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(CI.TEAMCITY_VERSION) ? 1 : 0;
    if (CI.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in CI) {
      let D = Number.parseInt((CI.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (CI.TERM_PROGRAM) {
        case "iTerm.app":
          return D >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2
      }
    }
    if (/-256(color)?$/i.test(CI.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(CI.TERM)) return 1;
    if ("COLORTERM" in CI) return 1;
    return Z
  }

  function zM1(A, B = {}) {
    let Q = jz9(A, {
      streamIsTTY: A && A.isTTY,
      ...B
    });
    return _z9(Q)
  }
  yVA.exports = {
    supportsColor: zM1,
    stdout: zM1({
      isTTY: jVA.isatty(1)
    }),
    stderr: zM1({
      isTTY: jVA.isatty(2)
    })
  }
})
// @from(Start 909642, End 912335)
bVA = z((fVA, M61) => {
  var yz9 = Z1("tty"),
    q61 = Z1("util");
  fVA.init = hz9;
  fVA.log = vz9;
  fVA.formatArgs = xz9;
  fVA.save = bz9;
  fVA.load = gz9;
  fVA.useColors = kz9;
  fVA.destroy = q61.deprecate(() => {}, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  fVA.colors = [6, 2, 3, 4, 5, 1];
  try {
    let A = kVA();
    if (A && (A.stderr || A).level >= 2) fVA.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221]
  } catch (A) {}
  fVA.inspectOpts = Object.keys(process.env).filter((A) => {
    return /^debug_/i.test(A)
  }).reduce((A, B) => {
    let Q = B.substring(6).toLowerCase().replace(/_([a-z])/g, (G, Z) => {
        return Z.toUpperCase()
      }),
      I = process.env[B];
    if (/^(yes|on|true|enabled)$/i.test(I)) I = !0;
    else if (/^(no|off|false|disabled)$/i.test(I)) I = !1;
    else if (I === "null") I = null;
    else I = Number(I);
    return A[Q] = I, A
  }, {});

  function kz9() {
    return "colors" in fVA.inspectOpts ? Boolean(fVA.inspectOpts.colors) : yz9.isatty(process.stderr.fd)
  }

  function xz9(A) {
    let {
      namespace: B,
      useColors: Q
    } = this;
    if (Q) {
      let I = this.color,
        G = "\x1B[3" + (I < 8 ? I : "8;5;" + I),
        Z = `  ${G};1m${B} \x1B[0m`;
      A[0] = Z + A[0].split(`
`).join(`
` + Z), A.push(G + "m+" + M61.exports.humanize(this.diff) + "\x1B[0m")
    } else A[0] = fz9() + B + " " + A[0]
  }

  function fz9() {
    if (fVA.inspectOpts.hideDate) return "";
    return new Date().toISOString() + " "
  }

  function vz9(...A) {
    return process.stderr.write(q61.formatWithOptions(fVA.inspectOpts, ...A) + `
`)
  }

  function bz9(A) {
    if (A) process.env.DEBUG = A;
    else delete process.env.DEBUG
  }

  function gz9() {
    return process.env.DEBUG
  }

  function hz9(A) {
    A.inspectOpts = {};
    let B = Object.keys(fVA.inspectOpts);
    for (let Q = 0; Q < B.length; Q++) A.inspectOpts[B[Q]] = fVA.inspectOpts[B[Q]]
  }
  M61.exports = HM1()(fVA);
  var {
    formatters: xVA
  } = M61.exports;
  xVA.o = function(A) {
    return this.inspectOpts.colors = this.useColors, q61.inspect(A, this.inspectOpts).split(`
`).map((B) => B.trim()).join(" ")
  };
  xVA.O = function(A) {
    return this.inspectOpts.colors = this.useColors, q61.inspect(A, this.inspectOpts)
  }
})
// @from(Start 912341, End 912507)
_l = z((xm5, wM1) => {
  if (typeof process === "undefined" || process.type === "renderer" || !1 || process.__nwjs) wM1.exports = SVA();
  else wM1.exports = bVA()
})
// @from(Start 912513, End 912759)
hVA = z((fm5, gVA) => {
  var jl;
  gVA.exports = function() {
    if (!jl) {
      try {
        jl = _l()("follow-redirects")
      } catch (A) {}
      if (typeof jl !== "function") jl = function() {}
    }
    jl.apply(null, arguments)
  }
})
// @from(Start 912765, End 923766)
cVA = z((vm5, SM1) => {
  var kl = Z1("url"),
    yl = kl.URL,
    nz9 = Z1("http"),
    az9 = Z1("https"),
    qM1 = Z1("stream").Writable,
    MM1 = Z1("assert"),
    mVA = hVA();
  (function A() {
    var B = typeof process !== "undefined",
      Q = typeof window !== "undefined" && typeof document !== "undefined",
      I = tP(Error.captureStackTrace);
    if (!B && (Q || !I)) console.warn("The follow-redirects package should be excluded from browser builds.")
  })();
  var LM1 = !1;
  try {
    MM1(new yl(""))
  } catch (A) {
    LM1 = A.code === "ERR_INVALID_URL"
  }
  var sz9 = ["auth", "host", "hostname", "href", "path", "pathname", "port", "protocol", "query", "search", "hash"],
    RM1 = ["abort", "aborted", "connect", "error", "socket", "timeout"],
    OM1 = Object.create(null);
  RM1.forEach(function(A) {
    OM1[A] = function(B, Q, I) {
      this._redirectable.emit(A, B, Q, I)
    }
  });
  var UM1 = xl("ERR_INVALID_URL", "Invalid URL", TypeError),
    NM1 = xl("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed"),
    rz9 = xl("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", NM1),
    oz9 = xl("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit"),
    tz9 = xl("ERR_STREAM_WRITE_AFTER_END", "write after end"),
    ez9 = qM1.prototype.destroy || uVA;

  function TY(A, B) {
    if (qM1.call(this), this._sanitizeOptions(A), this._options = A, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], B) this.on("response", B);
    var Q = this;
    this._onNativeResponse = function(I) {
      try {
        Q._processResponse(I)
      } catch (G) {
        Q.emit("error", G instanceof NM1 ? G : new NM1({
          cause: G
        }))
      }
    }, this._performRequest()
  }
  TY.prototype = Object.create(qM1.prototype);
  TY.prototype.abort = function() {
    PM1(this._currentRequest), this._currentRequest.abort(), this.emit("abort")
  };
  TY.prototype.destroy = function(A) {
    return PM1(this._currentRequest, A), ez9.call(this, A), this
  };
  TY.prototype.write = function(A, B, Q) {
    if (this._ending) throw new tz9;
    if (!oP(A) && !Qw9(A)) throw new TypeError("data should be a string, Buffer or Uint8Array");
    if (tP(B)) Q = B, B = null;
    if (A.length === 0) {
      if (Q) Q();
      return
    }
    if (this._requestBodyLength + A.length <= this._options.maxBodyLength) this._requestBodyLength += A.length, this._requestBodyBuffers.push({
      data: A,
      encoding: B
    }), this._currentRequest.write(A, B, Q);
    else this.emit("error", new oz9), this.abort()
  };
  TY.prototype.end = function(A, B, Q) {
    if (tP(A)) Q = A, A = B = null;
    else if (tP(B)) Q = B, B = null;
    if (!A) this._ended = this._ending = !0, this._currentRequest.end(null, null, Q);
    else {
      var I = this,
        G = this._currentRequest;
      this.write(A, B, function() {
        I._ended = !0, G.end(null, null, Q)
      }), this._ending = !0
    }
  };
  TY.prototype.setHeader = function(A, B) {
    this._options.headers[A] = B, this._currentRequest.setHeader(A, B)
  };
  TY.prototype.removeHeader = function(A) {
    delete this._options.headers[A], this._currentRequest.removeHeader(A)
  };
  TY.prototype.setTimeout = function(A, B) {
    var Q = this;

    function I(D) {
      D.setTimeout(A), D.removeListener("timeout", D.destroy), D.addListener("timeout", D.destroy)
    }

    function G(D) {
      if (Q._timeout) clearTimeout(Q._timeout);
      Q._timeout = setTimeout(function() {
        Q.emit("timeout"), Z()
      }, A), I(D)
    }

    function Z() {
      if (Q._timeout) clearTimeout(Q._timeout), Q._timeout = null;
      if (Q.removeListener("abort", Z), Q.removeListener("error", Z), Q.removeListener("response", Z), Q.removeListener("close", Z), B) Q.removeListener("timeout", B);
      if (!Q.socket) Q._currentRequest.removeListener("socket", G)
    }
    if (B) this.on("timeout", B);
    if (this.socket) G(this.socket);
    else this._currentRequest.once("socket", G);
    return this.on("socket", I), this.on("abort", Z), this.on("error", Z), this.on("response", Z), this.on("close", Z), this
  };
  ["flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive"].forEach(function(A) {
    TY.prototype[A] = function(B, Q) {
      return this._currentRequest[A](B, Q)
    }
  });
  ["aborted", "connection", "socket"].forEach(function(A) {
    Object.defineProperty(TY.prototype, A, {
      get: function() {
        return this._currentRequest[A]
      }
    })
  });
  TY.prototype._sanitizeOptions = function(A) {
    if (!A.headers) A.headers = {};
    if (A.host) {
      if (!A.hostname) A.hostname = A.host;
      delete A.host
    }
    if (!A.pathname && A.path) {
      var B = A.path.indexOf("?");
      if (B < 0) A.pathname = A.path;
      else A.pathname = A.path.substring(0, B), A.search = A.path.substring(B)
    }
  };
  TY.prototype._performRequest = function() {
    var A = this._options.protocol,
      B = this._options.nativeProtocols[A];
    if (!B) throw new TypeError("Unsupported protocol " + A);
    if (this._options.agents) {
      var Q = A.slice(0, -1);
      this._options.agent = this._options.agents[Q]
    }
    var I = this._currentRequest = B.request(this._options, this._onNativeResponse);
    I._redirectable = this;
    for (var G of RM1) I.on(G, OM1[G]);
    if (this._currentUrl = /^\//.test(this._options.path) ? kl.format(this._options) : this._options.path, this._isRedirect) {
      var Z = 0,
        D = this,
        Y = this._requestBodyBuffers;
      (function W(J) {
        if (I === D._currentRequest) {
          if (J) D.emit("error", J);
          else if (Z < Y.length) {
            var F = Y[Z++];
            if (!I.finished) I.write(F.data, F.encoding, W)
          } else if (D._ended) I.end()
        }
      })()
    }
  };
  TY.prototype._processResponse = function(A) {
    var B = A.statusCode;
    if (this._options.trackRedirects) this._redirects.push({
      url: this._currentUrl,
      headers: A.headers,
      statusCode: B
    });
    var Q = A.headers.location;
    if (!Q || this._options.followRedirects === !1 || B < 300 || B >= 400) {
      A.responseUrl = this._currentUrl, A.redirects = this._redirects, this.emit("response", A), this._requestBodyBuffers = [];
      return
    }
    if (PM1(this._currentRequest), A.destroy(), ++this._redirectCount > this._options.maxRedirects) throw new rz9;
    var I, G = this._options.beforeRedirect;
    if (G) I = Object.assign({
      Host: A.req.getHeader("host")
    }, this._options.headers);
    var Z = this._options.method;
    if ((B === 301 || B === 302) && this._options.method === "POST" || B === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) this._options.method = "GET", this._requestBodyBuffers = [], EM1(/^content-/i, this._options.headers);
    var D = EM1(/^host$/i, this._options.headers),
      Y = TM1(this._currentUrl),
      W = D || Y.host,
      J = /^\w+:/.test(Q) ? this._currentUrl : kl.format(Object.assign(Y, {
        host: W
      })),
      F = Aw9(Q, J);
    if (mVA("redirecting to", F.href), this._isRedirect = !0, $M1(F, this._options), F.protocol !== Y.protocol && F.protocol !== "https:" || F.host !== W && !Bw9(F.host, W)) EM1(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
    if (tP(G)) {
      var X = {
          headers: A.headers,
          statusCode: B
        },
        V = {
          url: J,
          method: Z,
          headers: I
        };
      G(this._options, X, V), this._sanitizeOptions(this._options)
    }
    this._performRequest()
  };

  function dVA(A) {
    var B = {
        maxRedirects: 21,
        maxBodyLength: 10485760
      },
      Q = {};
    return Object.keys(A).forEach(function(I) {
      var G = I + ":",
        Z = Q[G] = A[I],
        D = B[I] = Object.create(Z);

      function Y(J, F, X) {
        if (Iw9(J)) J = $M1(J);
        else if (oP(J)) J = $M1(TM1(J));
        else X = F, F = pVA(J), J = {
          protocol: G
        };
        if (tP(F)) X = F, F = null;
        if (F = Object.assign({
            maxRedirects: B.maxRedirects,
            maxBodyLength: B.maxBodyLength
          }, J, F), F.nativeProtocols = Q, !oP(F.host) && !oP(F.hostname)) F.hostname = "::1";
        return MM1.equal(F.protocol, G, "protocol mismatch"), mVA("options", F), new TY(F, X)
      }

      function W(J, F, X) {
        var V = D.request(J, F, X);
        return V.end(), V
      }
      Object.defineProperties(D, {
        request: {
          value: Y,
          configurable: !0,
          enumerable: !0,
          writable: !0
        },
        get: {
          value: W,
          configurable: !0,
          enumerable: !0,
          writable: !0
        }
      })
    }), B
  }

  function uVA() {}

  function TM1(A) {
    var B;
    if (LM1) B = new yl(A);
    else if (B = pVA(kl.parse(A)), !oP(B.protocol)) throw new UM1({
      input: A
    });
    return B
  }

  function Aw9(A, B) {
    return LM1 ? new yl(A, B) : TM1(kl.resolve(B, A))
  }

  function pVA(A) {
    if (/^\[/.test(A.hostname) && !/^\[[:0-9a-f]+\]$/i.test(A.hostname)) throw new UM1({
      input: A.href || A
    });
    if (/^\[/.test(A.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(A.host)) throw new UM1({
      input: A.href || A
    });
    return A
  }

  function $M1(A, B) {
    var Q = B || {};
    for (var I of sz9) Q[I] = A[I];
    if (Q.hostname.startsWith("[")) Q.hostname = Q.hostname.slice(1, -1);
    if (Q.port !== "") Q.port = Number(Q.port);
    return Q.path = Q.search ? Q.pathname + Q.search : Q.pathname, Q
  }

  function EM1(A, B) {
    var Q;
    for (var I in B)
      if (A.test(I)) Q = B[I], delete B[I];
    return Q === null || typeof Q === "undefined" ? void 0 : String(Q).trim()
  }

  function xl(A, B, Q) {
    function I(G) {
      if (tP(Error.captureStackTrace)) Error.captureStackTrace(this, this.constructor);
      Object.assign(this, G || {}), this.code = A, this.message = this.cause ? B + ": " + this.cause.message : B
    }
    return I.prototype = new(Q || Error), Object.defineProperties(I.prototype, {
      constructor: {
        value: I,
        enumerable: !1
      },
      name: {
        value: "Error [" + A + "]",
        enumerable: !1
      }
    }), I
  }

  function PM1(A, B) {
    for (var Q of RM1) A.removeListener(Q, OM1[Q]);
    A.on("error", uVA), A.destroy(B)
  }

  function Bw9(A, B) {
    MM1(oP(A) && oP(B));
    var Q = A.length - B.length - 1;
    return Q > 0 && A[Q] === "." && A.endsWith(B)
  }

  function oP(A) {
    return typeof A === "string" || A instanceof String
  }

  function tP(A) {
    return typeof A === "function"
  }

  function Qw9(A) {
    return typeof A === "object" && "length" in A
  }

  function Iw9(A) {
    return yl && A instanceof yl
  }
  SM1.exports = dVA({
    http: nz9,
    https: az9
  });
  SM1.exports.wrap = dVA
})
// @from(Start 923772, End 924600)
HZ = z((MCA) => {
  Object.defineProperty(MCA, "__esModule", {
    value: !0
  });
  MCA.Log = MCA.LogLevel = void 0;
  var mw9 = " DEBUG ",
    dw9 = "  INFO ",
    uw9 = "  WARN ",
    pw9 = " ERROR ";

  function j61(A) {
    return A.unshift("[Statsig]"), A
  }
  MCA.LogLevel = {
    None: 0,
    Error: 1,
    Warn: 2,
    Info: 3,
    Debug: 4
  };
  class AS {
    static info(...A) {
      if (AS.level >= MCA.LogLevel.Info) console.info(dw9, ...j61(A))
    }
    static debug(...A) {
      if (AS.level >= MCA.LogLevel.Debug) console.debug(mw9, ...j61(A))
    }
    static warn(...A) {
      if (AS.level >= MCA.LogLevel.Warn) console.warn(uw9, ...j61(A))
    }
    static error(...A) {
      if (AS.level >= MCA.LogLevel.Error) console.error(pw9, ...j61(A))
    }
  }
  MCA.Log = AS;
  AS.level = MCA.LogLevel.Warn
})
// @from(Start 924606, End 925886)
BS = z((PCA) => {
  var dM1, uM1, pM1;
  Object.defineProperty(PCA, "__esModule", {
    value: !0
  });
  PCA._getInstance = PCA._getStatsigGlobalFlag = PCA._getStatsigGlobal = void 0;
  var cw9 = HZ(),
    lw9 = () => {
      return __STATSIG__ ? __STATSIG__ : y61
    };
  PCA._getStatsigGlobal = lw9;
  var iw9 = (A) => {
    return PCA._getStatsigGlobal()[A]
  };
  PCA._getStatsigGlobalFlag = iw9;
  var nw9 = (A) => {
    let B = PCA._getStatsigGlobal();
    if (!A) {
      if (B.instances && Object.keys(B.instances).length > 1) cw9.Log.warn("Call made to Statsig global instance without an SDK key but there is more than one client instance. If you are using mulitple clients, please specify the SDK key.");
      return B.firstInstance
    }
    return B.instances && B.instances[A]
  };
  PCA._getInstance = nw9;
  var ex = "__STATSIG__",
    RCA = typeof window !== "undefined" ? window : {},
    OCA = typeof global !== "undefined" ? global : {},
    TCA = typeof globalThis !== "undefined" ? globalThis : {},
    y61 = (pM1 = (uM1 = (dM1 = RCA[ex]) !== null && dM1 !== void 0 ? dM1 : OCA[ex]) !== null && uM1 !== void 0 ? uM1 : TCA[ex]) !== null && pM1 !== void 0 ? pM1 : {
      instance: PCA._getInstance
    };
  RCA[ex] = y61;
  OCA[ex] = y61;
  TCA[ex] = y61
})
// @from(Start 925892, End 928532)
x61 = z((SCA) => {
  Object.defineProperty(SCA, "__esModule", {
    value: !0
  });
  SCA.Diagnostics = void 0;
  var k61 = new Map,
    iM1 = "start",
    nM1 = "end",
    sw9 = "statsig::diagnostics";
  SCA.Diagnostics = {
    _getMarkers: (A) => {
      return k61.get(A)
    },
    _markInitOverallStart: (A) => {
      Bf(A, Af({}, iM1, "overall"))
    },
    _markInitOverallEnd: (A, B, Q) => {
      Bf(A, Af({
        success: B,
        error: B ? void 0 : {
          name: "InitializeError",
          message: "Failed to initialize"
        },
        evaluationDetails: Q
      }, nM1, "overall"))
    },
    _markInitNetworkReqStart: (A, B) => {
      Bf(A, Af(B, iM1, "initialize", "network_request"))
    },
    _markInitNetworkReqEnd: (A, B) => {
      Bf(A, Af(B, nM1, "initialize", "network_request"))
    },
    _markInitProcessStart: (A) => {
      Bf(A, Af({}, iM1, "initialize", "process"))
    },
    _markInitProcessEnd: (A, B) => {
      Bf(A, Af(B, nM1, "initialize", "process"))
    },
    _clearMarkers: (A) => {
      k61.delete(A)
    },
    _formatError(A) {
      if (!(A && typeof A === "object")) return;
      return {
        code: aM1(A, "code"),
        name: aM1(A, "name"),
        message: aM1(A, "message")
      }
    },
    _getDiagnosticsData(A, B, Q, I) {
      var G;
      return {
        success: (A === null || A === void 0 ? void 0 : A.ok) === !0,
        statusCode: A === null || A === void 0 ? void 0 : A.status,
        sdkRegion: (G = A === null || A === void 0 ? void 0 : A.headers) === null || G === void 0 ? void 0 : G.get("x-statsig-region"),
        isDelta: Q.includes('"is_delta":true') === !0 ? !0 : void 0,
        attempt: B,
        error: SCA.Diagnostics._formatError(I)
      }
    },
    _enqueueDiagnosticsEvent(A, B, Q, I) {
      let G = SCA.Diagnostics._getMarkers(Q);
      if (G == null || G.length <= 0) return -1;
      let Z = G[G.length - 1].timestamp - G[0].timestamp;
      SCA.Diagnostics._clearMarkers(Q);
      let D = rw9(A, {
        context: "initialize",
        markers: G.slice(),
        statsigOptions: I
      });
      return B.enqueue(D), Z
    }
  };

  function Af(A, B, Q, I) {
    return Object.assign({
      key: Q,
      action: B,
      step: I,
      timestamp: Date.now()
    }, A)
  }

  function rw9(A, B) {
    return {
      eventName: sw9,
      user: A,
      value: null,
      metadata: B,
      time: Date.now()
    }
  }

  function Bf(A, B) {
    var Q;
    let I = (Q = k61.get(A)) !== null && Q !== void 0 ? Q : [];
    I.push(B), k61.set(A, I)
  }

  function aM1(A, B) {
    if (B in A) return A[B];
    return
  }
})
// @from(Start 928538, End 928898)
f61 = z((_CA) => {
  Object.defineProperty(_CA, "__esModule", {
    value: !0
  });
  _CA._isTypeMatch = _CA._typeOf = void 0;

  function ow9(A) {
    return Array.isArray(A) ? "array" : typeof A
  }
  _CA._typeOf = ow9;

  function tw9(A, B) {
    let Q = (I) => Array.isArray(I) ? "array" : typeof I;
    return Q(A) === Q(B)
  }
  _CA._isTypeMatch = tw9
})
// @from(Start 928904, End 929757)
Qf = z((yCA) => {
  Object.defineProperty(yCA, "__esModule", {
    value: !0
  });
  yCA._getSortedObject = yCA._DJB2Object = yCA._DJB2 = void 0;
  var AE9 = f61(),
    BE9 = (A) => {
      let B = 0;
      for (let Q = 0; Q < A.length; Q++) {
        let I = A.charCodeAt(Q);
        B = (B << 5) - B + I, B = B & B
      }
      return String(B >>> 0)
    };
  yCA._DJB2 = BE9;
  var QE9 = (A, B) => {
    return yCA._DJB2(JSON.stringify(yCA._getSortedObject(A, B)))
  };
  yCA._DJB2Object = QE9;
  var IE9 = (A, B) => {
    if (A == null) return null;
    let Q = Object.keys(A).sort(),
      I = {};
    return Q.forEach((G) => {
      let Z = A[G];
      if (B === 0 || AE9._typeOf(Z) !== "object") {
        I[G] = Z;
        return
      }
      I[G] = yCA._getSortedObject(Z, B != null ? B - 1 : B)
    }), I
  };
  yCA._getSortedObject = IE9
})
// @from(Start 929763, End 930417)
dl = z((vCA) => {
  Object.defineProperty(vCA, "__esModule", {
    value: !0
  });
  vCA._getStorageKey = vCA._getUserStorageKey = void 0;
  var xCA = Qf();

  function fCA(A, B, Q) {
    var I;
    if (Q) return Q(A, B);
    let G = B && B.customIDs ? B.customIDs : {},
      Z = [`uid:${(I=B===null||B===void 0?void 0:B.userID)!==null&&I!==void 0?I:""}`, `cids:${Object.keys(G).sort((D,Y)=>D.localeCompare(Y)).map((D)=>`${D}-${G[D]}`).join(",")}`, `k:${A}`];
    return xCA._DJB2(Z.join("|"))
  }
  vCA._getUserStorageKey = fCA;

  function ZE9(A, B, Q) {
    if (B) return fCA(A, B, Q);
    return xCA._DJB2(`k:${A}`)
  }
  vCA._getStorageKey = ZE9
})
// @from(Start 930423, End 931120)
ul = z((gCA) => {
  Object.defineProperty(gCA, "__esModule", {
    value: !0
  });
  gCA.NetworkParam = gCA.NetworkDefault = gCA.Endpoint = void 0;
  gCA.Endpoint = {
    _initialize: "initialize",
    _rgstr: "rgstr",
    _download_config_specs: "download_config_specs"
  };
  gCA.NetworkDefault = {
    [gCA.Endpoint._rgstr]: "https://prodregistryv2.org/v1",
    [gCA.Endpoint._initialize]: "https://featureassets.org/v1",
    [gCA.Endpoint._download_config_specs]: "https://api.statsigcdn.com/v1"
  };
  gCA.NetworkParam = {
    EventCount: "ec",
    SdkKey: "k",
    SdkType: "st",
    SdkVersion: "sv",
    Time: "t",
    SessionID: "sid",
    StatsigEncoded: "se",
    IsGzipped: "gz"
  }
})
// @from(Start 931126, End 932618)
QS = z((mCA) => {
  Object.defineProperty(mCA, "__esModule", {
    value: !0
  });
  mCA._getCurrentPageUrlSafe = mCA._addDocumentEventListenerSafe = mCA._addWindowEventListenerSafe = mCA._isServerEnv = mCA._getDocumentSafe = mCA._getWindowSafe = void 0;
  var WE9 = () => {
    return typeof window !== "undefined" ? window : null
  };
  mCA._getWindowSafe = WE9;
  var JE9 = () => {
    var A;
    let B = mCA._getWindowSafe();
    return (A = B === null || B === void 0 ? void 0 : B.document) !== null && A !== void 0 ? A : null
  };
  mCA._getDocumentSafe = JE9;
  var FE9 = () => {
    if (mCA._getDocumentSafe() !== null) return !1;
    let A = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
    return typeof EdgeRuntime === "string" || A
  };
  mCA._isServerEnv = FE9;
  var XE9 = (A, B) => {
    let Q = mCA._getWindowSafe();
    if (typeof(Q === null || Q === void 0 ? void 0 : Q.addEventListener) === "function") Q.addEventListener(A, B)
  };
  mCA._addWindowEventListenerSafe = XE9;
  var VE9 = (A, B) => {
    let Q = mCA._getDocumentSafe();
    if (typeof(Q === null || Q === void 0 ? void 0 : Q.addEventListener) === "function") Q.addEventListener(A, B)
  };
  mCA._addDocumentEventListenerSafe = VE9;
  var CE9 = () => {
    var A;
    try {
      return (A = mCA._getWindowSafe()) === null || A === void 0 ? void 0 : A.location.href.split(/[?#]/)[0]
    } catch (B) {
      return
    }
  };
  mCA._getCurrentPageUrlSafe = CE9
})
// @from(Start 932624, End 935642)
oM1 = z((lCA) => {
  Object.defineProperty(lCA, "__esModule", {
    value: !0
  });
  lCA._createLayerParameterExposure = lCA._createConfigExposure = lCA._mapExposures = lCA._createGateExposure = lCA._isExposureEvent = void 0;
  var uCA = "statsig::config_exposure",
    pCA = "statsig::gate_exposure",
    cCA = "statsig::layer_exposure",
    rM1 = (A, B, Q, I, G) => {
      if (Q.bootstrapMetadata) I.bootstrapMetadata = Q.bootstrapMetadata;
      return {
        eventName: A,
        user: B,
        value: null,
        metadata: $E9(Q, I),
        secondaryExposures: G,
        time: Date.now()
      }
    },
    wE9 = ({
      eventName: A
    }) => {
      return A === pCA || A === uCA || A === cCA
    };
  lCA._isExposureEvent = wE9;
  var EE9 = (A, B, Q) => {
    var I, G, Z;
    let D = {
      gate: B.name,
      gateValue: String(B.value),
      ruleID: B.ruleID
    };
    if (((I = B.__evaluation) === null || I === void 0 ? void 0 : I.version) != null) D.configVersion = B.__evaluation.version;
    return rM1(pCA, A, B.details, D, h61((Z = (G = B.__evaluation) === null || G === void 0 ? void 0 : G.secondary_exposures) !== null && Z !== void 0 ? Z : [], Q))
  };
  lCA._createGateExposure = EE9;

  function h61(A, B) {
    return A.map((Q) => {
      if (typeof Q === "string") return (B !== null && B !== void 0 ? B : {})[Q];
      return Q
    }).filter((Q) => Q != null)
  }
  lCA._mapExposures = h61;
  var UE9 = (A, B, Q) => {
    var I, G, Z, D;
    let Y = {
      config: B.name,
      ruleID: B.ruleID
    };
    if (((I = B.__evaluation) === null || I === void 0 ? void 0 : I.version) != null) Y.configVersion = B.__evaluation.version;
    if (((G = B.__evaluation) === null || G === void 0 ? void 0 : G.passed) != null) Y.rulePassed = String(B.__evaluation.passed);
    return rM1(uCA, A, B.details, Y, h61((D = (Z = B.__evaluation) === null || Z === void 0 ? void 0 : Z.secondary_exposures) !== null && D !== void 0 ? D : [], Q))
  };
  lCA._createConfigExposure = UE9;
  var NE9 = (A, B, Q, I) => {
    var G, Z, D, Y;
    let W = B.__evaluation,
      J = ((G = W === null || W === void 0 ? void 0 : W.explicit_parameters) === null || G === void 0 ? void 0 : G.includes(Q)) === !0,
      F = "",
      X = (Z = W === null || W === void 0 ? void 0 : W.undelegated_secondary_exposures) !== null && Z !== void 0 ? Z : [];
    if (J) F = (D = W.allocated_experiment_name) !== null && D !== void 0 ? D : "", X = W.secondary_exposures;
    let V = {
      config: B.name,
      parameterName: Q,
      ruleID: B.ruleID,
      allocatedExperiment: F,
      isExplicitParameter: String(J)
    };
    if (((Y = B.__evaluation) === null || Y === void 0 ? void 0 : Y.version) != null) V.configVersion = B.__evaluation.version;
    return rM1(cCA, A, B.details, V, h61(X, I))
  };
  lCA._createLayerParameterExposure = NE9;
  var $E9 = (A, B) => {
    if (B.reason = A.reason, A.lcut) B.lcut = String(A.lcut);
    if (A.receivedAt) B.receivedAt = String(A.receivedAt);
    return B
  }
})
// @from(Start 935648, End 937698)
vU = z((nCA) => {
  Object.defineProperty(nCA, "__esModule", {
    value: !0
  });
  nCA._setObjectInStorage = nCA._getObjectFromStorage = nCA.Storage = void 0;
  var OE9 = HZ(),
    TE9 = QS(),
    pl = {},
    eM1 = {
      isReady: () => !0,
      isReadyResolver: () => null,
      getProviderName: () => "InMemory",
      getItem: (A) => pl[A] ? pl[A] : null,
      setItem: (A, B) => {
        pl[A] = B
      },
      removeItem: (A) => {
        delete pl[A]
      },
      getAllKeys: () => Object.keys(pl)
    },
    m61 = null;
  try {
    let A = TE9._getWindowSafe();
    if (A && A.localStorage && typeof A.localStorage.getItem === "function") m61 = {
      isReady: () => !0,
      isReadyResolver: () => null,
      getProviderName: () => "LocalStorage",
      getItem: (B) => A.localStorage.getItem(B),
      setItem: (B, Q) => A.localStorage.setItem(B, Q),
      removeItem: (B) => A.localStorage.removeItem(B),
      getAllKeys: () => Object.keys(A.localStorage)
    }
  } catch (A) {
    OE9.Log.warn("Failed to setup localStorageProvider.")
  }
  var tM1 = m61 !== null && m61 !== void 0 ? m61 : eM1,
    Dz = tM1;

  function PE9(A) {
    try {
      return A()
    } catch (B) {
      if (B instanceof Error && B.name === "SecurityError") return nCA.Storage._setProvider(eM1), null;
      throw B
    }
  }
  nCA.Storage = {
    isReady: () => Dz.isReady(),
    isReadyResolver: () => Dz.isReadyResolver(),
    getProviderName: () => Dz.getProviderName(),
    getItem: (A) => PE9(() => Dz.getItem(A)),
    setItem: (A, B) => Dz.setItem(A, B),
    removeItem: (A) => Dz.removeItem(A),
    getAllKeys: () => Dz.getAllKeys(),
    _setProvider: (A) => {
      tM1 = A, Dz = A
    },
    _setDisabled: (A) => {
      if (A) Dz = eM1;
      else Dz = tM1
    }
  };

  function SE9(A) {
    let B = nCA.Storage.getItem(A);
    return JSON.parse(B !== null && B !== void 0 ? B : "null")
  }
  nCA._getObjectFromStorage = SE9;

  function _E9(A, B) {
    nCA.Storage.setItem(A, JSON.stringify(B))
  }
  nCA._setObjectInStorage = _E9
})
// @from(Start 937704, End 938500)
AL1 = z((rCA) => {
  Object.defineProperty(rCA, "__esModule", {
    value: !0
  });
  rCA.UrlConfiguration = void 0;
  var u61 = ul(),
    yE9 = {
      [u61.Endpoint._initialize]: "i",
      [u61.Endpoint._rgstr]: "e",
      [u61.Endpoint._download_config_specs]: "d"
    };
  class sCA {
    constructor(A, B, Q, I) {
      if (this.customUrl = null, this.fallbackUrls = null, this.endpoint = A, this.endpointDnsKey = yE9[A], B) this.customUrl = B;
      if (!B && Q) this.customUrl = Q.endsWith("/") ? `${Q}${A}` : `${Q}/${A}`;
      if (I) this.fallbackUrls = I;
      let G = u61.NetworkDefault[A];
      this.defaultUrl = `${G}/${A}`
    }
    getUrl() {
      var A;
      return (A = this.customUrl) !== null && A !== void 0 ? A : this.defaultUrl
    }
  }
  rCA.UrlConfiguration = sCA
})
// @from(Start 938506, End 939625)
l61 = z((eCA) => {
  Object.defineProperty(eCA, "__esModule", {
    value: !0
  });
  eCA._notifyVisibilityChanged = eCA._subscribeToVisiblityChanged = eCA._isUnloading = eCA._isCurrentlyVisible = void 0;
  var p61 = QS(),
    c61 = "foreground",
    QL1 = "background",
    tCA = [],
    BL1 = c61,
    IL1 = !1,
    kE9 = () => {
      return BL1 === c61
    };
  eCA._isCurrentlyVisible = kE9;
  var xE9 = () => IL1;
  eCA._isUnloading = xE9;
  var fE9 = (A) => {
    tCA.unshift(A)
  };
  eCA._subscribeToVisiblityChanged = fE9;
  var vE9 = (A) => {
    if (A === BL1) return;
    BL1 = A, tCA.forEach((B) => B(A))
  };
  eCA._notifyVisibilityChanged = vE9;
  p61._addWindowEventListenerSafe("focus", () => {
    IL1 = !1, eCA._notifyVisibilityChanged(c61)
  });
  p61._addWindowEventListenerSafe("blur", () => eCA._notifyVisibilityChanged(QL1));
  p61._addWindowEventListenerSafe("beforeunload", () => {
    IL1 = !0, eCA._notifyVisibilityChanged(QL1)
  });
  p61._addDocumentEventListenerSafe("visibilitychange", () => {
    eCA._notifyVisibilityChanged(document.visibilityState === "visible" ? c61 : QL1)
  })
})
// @from(Start 939631, End 947984)
ZL1 = z((Df) => {
  var Gf = Df && Df.__awaiter || function(A, B, Q, I) {
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
  Object.defineProperty(Df, "__esModule", {
    value: !0
  });
  Df.EventLogger = void 0;
  var mE9 = dl(),
    dE9 = Qf(),
    cl = HZ(),
    AKA = ul(),
    GL1 = QS(),
    uE9 = oM1(),
    Zf = vU(),
    pE9 = AL1(),
    BKA = l61(),
    cE9 = 100,
    lE9 = 1e4,
    iE9 = 1000,
    nE9 = 600000,
    aE9 = 500,
    QKA = 200,
    ll = {},
    i61 = {
      Startup: "startup",
      GainedFocus: "gained_focus"
    };
  class IS {
    static _safeFlushAndForget(A) {
      var B;
      (B = ll[A]) === null || B === void 0 || B.flush().catch(() => {})
    }
    static _safeRetryFailedLogs(A) {
      var B;
      (B = ll[A]) === null || B === void 0 || B._retryFailedLogs(i61.GainedFocus)
    }
    constructor(A, B, Q, I) {
      var G;
      this._sdkKey = A, this._emitter = B, this._network = Q, this._options = I, this._queue = [], this._lastExposureTimeMap = {}, this._nonExposedChecks = {}, this._hasRunQuickFlush = !1, this._creationTime = Date.now(), this._isLoggingDisabled = (I === null || I === void 0 ? void 0 : I.disableLogging) === !0, this._maxQueueSize = (G = I === null || I === void 0 ? void 0 : I.loggingBufferMaxSize) !== null && G !== void 0 ? G : cE9;
      let Z = I === null || I === void 0 ? void 0 : I.networkConfig;
      this._logEventUrlConfig = new pE9.UrlConfiguration(AKA.Endpoint._rgstr, Z === null || Z === void 0 ? void 0 : Z.logEventUrl, Z === null || Z === void 0 ? void 0 : Z.api, Z === null || Z === void 0 ? void 0 : Z.logEventFallbackUrls)
    }
    setLoggingDisabled(A) {
      this._isLoggingDisabled = A
    }
    enqueue(A) {
      if (!this._shouldLogEvent(A)) return;
      if (this._normalizeAndAppendEvent(A), this._quickFlushIfNeeded(), this._queue.length > this._maxQueueSize) IS._safeFlushAndForget(this._sdkKey)
    }
    incrementNonExposureCount(A) {
      var B;
      let Q = (B = this._nonExposedChecks[A]) !== null && B !== void 0 ? B : 0;
      this._nonExposedChecks[A] = Q + 1
    }
    reset() {
      this._lastExposureTimeMap = {}
    }
    start() {
      if (GL1._isServerEnv()) return;
      ll[this._sdkKey] = this, BKA._subscribeToVisiblityChanged((A) => {
        if (A === "background") IS._safeFlushAndForget(this._sdkKey);
        else if (A === "foreground") IS._safeRetryFailedLogs(this._sdkKey)
      }), this._retryFailedLogs(i61.Startup), this._startBackgroundFlushInterval()
    }
    stop() {
      return Gf(this, void 0, void 0, function*() {
        if (this._flushIntervalId) clearInterval(this._flushIntervalId), this._flushIntervalId = null;
        delete ll[this._sdkKey], yield this.flush()
      })
    }
    flush() {
      return Gf(this, void 0, void 0, function*() {
        if (this._appendAndResetNonExposedChecks(), this._queue.length === 0) return;
        let A = this._queue;
        this._queue = [], yield this._sendEvents(A)
      })
    }
    _quickFlushIfNeeded() {
      if (this._hasRunQuickFlush) return;
      if (this._hasRunQuickFlush = !0, Date.now() - this._creationTime > QKA) return;
      setTimeout(() => IS._safeFlushAndForget(this._sdkKey), QKA)
    }
    _shouldLogEvent(A) {
      if (GL1._isServerEnv()) return !1;
      if (!uE9._isExposureEvent(A)) return !0;
      let B = A.user ? A.user : {
          statsigEnvironment: void 0
        },
        Q = mE9._getUserStorageKey(this._sdkKey, B),
        I = A.metadata ? A.metadata : {},
        G = [A.eventName, Q, I.gate, I.config, I.ruleID, I.allocatedExperiment, I.parameterName, String(I.isExplicitParameter), I.reason].join("|"),
        Z = this._lastExposureTimeMap[G],
        D = Date.now();
      if (Z && D - Z < nE9) return !1;
      if (Object.keys(this._lastExposureTimeMap).length > iE9) this._lastExposureTimeMap = {};
      return this._lastExposureTimeMap[G] = D, !0
    }
    _sendEvents(A) {
      var B, Q;
      return Gf(this, void 0, void 0, function*() {
        if (this._isLoggingDisabled) return this._saveFailedLogsToStorage(A), !1;
        try {
          let G = BKA._isUnloading() && this._network.isBeaconSupported() && ((Q = (B = this._options) === null || B === void 0 ? void 0 : B.networkConfig) === null || Q === void 0 ? void 0 : Q.networkOverrideFunc) == null;
          if (this._emitter({
              name: "pre_logs_flushed",
              events: A
            }), (G ? yield this._sendEventsViaBeacon(A): yield this._sendEventsViaPost(A)).success) return this._emitter({
            name: "logs_flushed",
            events: A
          }), !0;
          else return cl.Log.warn("Failed to flush events."), this._saveFailedLogsToStorage(A), !1
        } catch (I) {
          return cl.Log.warn("Failed to flush events."), !1
        }
      })
    }
    _sendEventsViaPost(A) {
      var B;
      return Gf(this, void 0, void 0, function*() {
        let Q = yield this._network.post(this._getRequestData(A)), I = (B = Q === null || Q === void 0 ? void 0 : Q.code) !== null && B !== void 0 ? B : -1;
        return {
          success: I >= 200 && I < 300
        }
      })
    }
    _sendEventsViaBeacon(A) {
      return Gf(this, void 0, void 0, function*() {
        return {
          success: yield this._network.beacon(this._getRequestData(A))
        }
      })
    }
    _getRequestData(A) {
      return {
        sdkKey: this._sdkKey,
        data: {
          events: A
        },
        urlConfig: this._logEventUrlConfig,
        retries: 3,
        isCompressable: !0,
        params: {
          [AKA.NetworkParam.EventCount]: String(A.length)
        }
      }
    }
    _saveFailedLogsToStorage(A) {
      while (A.length > aE9) A.shift();
      let B = this._getStorageKey();
      try {
        Zf._setObjectInStorage(B, A)
      } catch (Q) {
        cl.Log.warn("Unable to save failed logs to storage")
      }
    }
    _retryFailedLogs(A) {
      let B = this._getStorageKey();
      (() => Gf(this, void 0, void 0, function*() {
        if (!Zf.Storage.isReady()) yield Zf.Storage.isReadyResolver();
        let Q = Zf._getObjectFromStorage(B);
        if (!Q) return;
        if (A === i61.Startup) Zf.Storage.removeItem(B);
        if ((yield this._sendEvents(Q)) && A === i61.GainedFocus) Zf.Storage.removeItem(B)
      }))().catch(() => {
        cl.Log.warn("Failed to flush stored logs")
      })
    }
    _getStorageKey() {
      return `statsig.failed_logs.${dE9._DJB2(this._sdkKey)}`
    }
    _normalizeAndAppendEvent(A) {
      if (A.user) A.user = Object.assign({}, A.user), delete A.user.privateAttributes;
      let B = {},
        Q = this._getCurrentPageUrl();
      if (Q) B.statsigMetadata = {
        currentPage: Q
      };
      let I = Object.assign(Object.assign({}, A), B);
      cl.Log.debug("Enqueued Event:", I), this._queue.push(I)
    }
    _appendAndResetNonExposedChecks() {
      if (Object.keys(this._nonExposedChecks).length === 0) return;
      this._normalizeAndAppendEvent({
        eventName: "statsig::non_exposed_checks",
        user: null,
        time: Date.now(),
        metadata: {
          checks: Object.assign({}, this._nonExposedChecks)
        }
      }), this._nonExposedChecks = {}
    }
    _getCurrentPageUrl() {
      var A;
      if (((A = this._options) === null || A === void 0 ? void 0 : A.includeCurrentPageUrlWithEvents) === !1) return;
      return GL1._getCurrentPageUrlSafe()
    }
    _startBackgroundFlushInterval() {
      var A, B;
      let Q = (B = (A = this._options) === null || A === void 0 ? void 0 : A.loggingIntervalMs) !== null && B !== void 0 ? B : lE9,
        I = setInterval(() => {
          let G = ll[this._sdkKey];
          if (!G || G._flushIntervalId !== I) clearInterval(I);
          else IS._safeFlushAndForget(this._sdkKey)
        }, Q);
      this._flushIntervalId = I
    }
  }
  Df.EventLogger = IS
})
// @from(Start 947990, End 948373)
il = z((IKA) => {
  Object.defineProperty(IKA, "__esModule", {
    value: !0
  });
  IKA.StatsigMetadataProvider = IKA.SDK_VERSION = void 0;
  IKA.SDK_VERSION = "3.12.1";
  var DL1 = {
    sdkVersion: IKA.SDK_VERSION,
    sdkType: "js-mono"
  };
  IKA.StatsigMetadataProvider = {
    get: () => DL1,
    add: (A) => {
      DL1 = Object.assign(Object.assign({}, DL1), A)
    }
  }
})
// @from(Start 948379, End 948464)
YKA = z((DKA) => {
  Object.defineProperty(DKA, "__esModule", {
    value: !0
  })
})
// @from(Start 948470, End 949194)
n61 = z((WKA) => {
  Object.defineProperty(WKA, "__esModule", {
    value: !0
  });
  WKA.getUUID = void 0;

  function sE9() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
    let A = new Date().getTime(),
      B = typeof performance !== "undefined" && performance.now && performance.now() * 1000 || 0;
    return `xxxxxxxx-xxxx-4xxx-${"89ab"[Math.floor(Math.random()*4)]}xxx-xxxxxxxxxxxx`.replace(/[xy]/g, (I) => {
      let G = Math.random() * 16;
      if (A > 0) G = (A + G) % 16 | 0, A = Math.floor(A / 16);
      else G = (B + G) % 16 | 0, B = Math.floor(B / 16);
      return (I === "x" ? G : G & 7 | 8).toString(16)
    })
  }
  WKA.getUUID = sE9
})
// @from(Start 949200, End 949986)
s61 = z((CKA) => {
  Object.defineProperty(CKA, "__esModule", {
    value: !0
  });
  CKA.StableID = void 0;
  var rE9 = dl(),
    oE9 = HZ(),
    XKA = vU(),
    tE9 = n61(),
    a61 = {};
  CKA.StableID = {
    get: (A) => {
      if (a61[A] == null) {
        let B = eE9(A);
        if (B == null) B = tE9.getUUID(), FKA(B, A);
        a61[A] = B
      }
      return a61[A]
    },
    setOverride: (A, B) => {
      a61[B] = A, FKA(A, B)
    }
  };

  function VKA(A) {
    return `statsig.stable_id.${rE9._getStorageKey(A)}`
  }

  function FKA(A, B) {
    let Q = VKA(B);
    try {
      XKA._setObjectInStorage(Q, A)
    } catch (I) {
      oE9.Log.warn("Failed to save StableID")
    }
  }

  function eE9(A) {
    let B = VKA(A);
    return XKA._getObjectFromStorage(B)
  }
})
// @from(Start 949992, End 950680)
YL1 = z((HKA) => {
  Object.defineProperty(HKA, "__esModule", {
    value: !0
  });
  HKA._getFullUserHash = HKA._normalizeUser = void 0;
  var AU9 = Qf(),
    BU9 = HZ();

  function QU9(A, B, Q) {
    try {
      let I = JSON.parse(JSON.stringify(A));
      if (B != null && B.environment != null) I.statsigEnvironment = B.environment;
      else if (Q != null) I.statsigEnvironment = {
        tier: Q
      };
      return I
    } catch (I) {
      return BU9.Log.error("Failed to JSON.stringify user"), {
        statsigEnvironment: void 0
      }
    }
  }
  HKA._normalizeUser = QU9;

  function IU9(A) {
    return A ? AU9._DJB2Object(A) : null
  }
  HKA._getFullUserHash = IU9
})
// @from(Start 950686, End 951051)
WL1 = z((wKA) => {
  Object.defineProperty(wKA, "__esModule", {
    value: !0
  });
  wKA._typedJsonParse = void 0;
  var ZU9 = HZ();

  function DU9(A, B, Q) {
    try {
      let I = JSON.parse(A);
      if (I && typeof I === "object" && B in I) return I
    } catch (I) {}
    return ZU9.Log.error(`Failed to parse ${Q}`), null
  }
  wKA._typedJsonParse = DU9
})
// @from(Start 951057, End 956670)
LKA = z((CM) => {
  var JL1 = CM && CM.__awaiter || function(A, B, Q, I) {
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
  Object.defineProperty(CM, "__esModule", {
    value: !0
  });
  CM._makeDataAdapterResult = CM.DataAdapterCore = void 0;
  var r61 = HZ(),
    YU9 = s61(),
    o61 = YL1(),
    VM = vU(),
    UKA = WL1(),
    NKA = 10;
  class $KA {
    constructor(A, B) {
      this._adapterName = A, this._cacheSuffix = B, this._options = null, this._sdkKey = null, this._lastModifiedStoreKey = `statsig.last_modified_time.${B}`, this._inMemoryCache = new qKA
    }
    attach(A, B) {
      this._sdkKey = A, this._options = B
    }
    getDataSync(A) {
      let B = A && o61._normalizeUser(A, this._options),
        Q = this._getCacheKey(B),
        I = this._inMemoryCache.get(Q, B);
      if (I) return I;
      let G = this._loadFromCache(Q);
      if (G) return this._inMemoryCache.add(Q, G), this._inMemoryCache.get(Q, B);
      return null
    }
    setData(A, B) {
      let Q = B && o61._normalizeUser(B, this._options),
        I = this._getCacheKey(Q);
      this._inMemoryCache.add(I, t61("Bootstrap", A, null, Q))
    }
    _getDataAsyncImpl(A, B, Q) {
      return JL1(this, void 0, void 0, function*() {
        if (!VM.Storage.isReady()) yield VM.Storage.isReadyResolver();
        let I = A !== null && A !== void 0 ? A : this.getDataSync(B),
          G = [this._fetchAndPrepFromNetwork(I, B, Q)];
        if (Q === null || Q === void 0 ? void 0 : Q.timeoutMs) G.push(new Promise((Z) => setTimeout(Z, Q.timeoutMs)).then(() => {
          return r61.Log.debug("Fetching latest value timed out"), null
        }));
        return yield Promise.race(G)
      })
    }
    _prefetchDataImpl(A, B) {
      return JL1(this, void 0, void 0, function*() {
        let Q = A && o61._normalizeUser(A, this._options),
          I = this._getCacheKey(Q),
          G = yield this._getDataAsyncImpl(null, Q, B);
        if (G) this._inMemoryCache.add(I, Object.assign(Object.assign({}, G), {
          source: "Prefetch"
        }))
      })
    }
    _fetchAndPrepFromNetwork(A, B, Q) {
      var I;
      return JL1(this, void 0, void 0, function*() {
        let G = (I = A === null || A === void 0 ? void 0 : A.data) !== null && I !== void 0 ? I : null,
          Z = A != null && this._isCachedResultValidFor204(A, B),
          D = yield this._fetchFromNetwork(G, B, Q, Z);
        if (!D) return r61.Log.debug("No response returned for latest value"), null;
        let Y = UKA._typedJsonParse(D, "has_updates", "Response"),
          W = this._getSdkKey(),
          J = YU9.StableID.get(W),
          F = null;
        if ((Y === null || Y === void 0 ? void 0 : Y.has_updates) === !0) F = t61("Network", D, J, B);
        else if (G && (Y === null || Y === void 0 ? void 0 : Y.has_updates) === !1) F = t61("NetworkNotModified", G, J, B);
        else return null;
        let X = this._getCacheKey(B);
        return this._inMemoryCache.add(X, F), this._writeToCache(X, F), F
      })
    }
    _getSdkKey() {
      if (this._sdkKey != null) return this._sdkKey;
      return r61.Log.error(`${this._adapterName} is not attached to a Client`), ""
    }
    _loadFromCache(A) {
      var B;
      let Q = (B = VM.Storage.getItem) === null || B === void 0 ? void 0 : B.call(VM.Storage, A);
      if (Q == null) return null;
      let I = UKA._typedJsonParse(Q, "source", "Cached Result");
      return I ? Object.assign(Object.assign({}, I), {
        source: "Cache"
      }) : null
    }
    _writeToCache(A, B) {
      VM.Storage.setItem(A, JSON.stringify(B)), this._runLocalStorageCacheEviction(A)
    }
    _runLocalStorageCacheEviction(A) {
      var B;
      let Q = (B = VM._getObjectFromStorage(this._lastModifiedStoreKey)) !== null && B !== void 0 ? B : {};
      Q[A] = Date.now();
      let I = MKA(Q, NKA);
      if (I) delete Q[I], VM.Storage.removeItem(I);
      VM._setObjectInStorage(this._lastModifiedStoreKey, Q)
    }
  }
  CM.DataAdapterCore = $KA;

  function t61(A, B, Q, I) {
    return {
      source: A,
      data: B,
      receivedAt: Date.now(),
      stableID: Q,
      fullUserHash: o61._getFullUserHash(I)
    }
  }
  CM._makeDataAdapterResult = t61;
  class qKA {
    constructor() {
      this._data = {}
    }
    get(A, B) {
      var Q;
      let I = this._data[A],
        G = I === null || I === void 0 ? void 0 : I.stableID,
        Z = (Q = B === null || B === void 0 ? void 0 : B.customIDs) === null || Q === void 0 ? void 0 : Q.stableID;
      if (Z && G && Z !== G) return r61.Log.warn("'StatsigUser.customIDs.stableID' mismatch"), null;
      return I
    }
    add(A, B) {
      let Q = MKA(this._data, NKA - 1);
      if (Q) delete this._data[Q];
      this._data[A] = B
    }
    merge(A) {
      this._data = Object.assign(Object.assign({}, this._data), A)
    }
  }

  function MKA(A, B) {
    let Q = Object.keys(A);
    if (Q.length <= B) return null;
    return Q.reduce((I, G) => {
      let Z = A[I],
        D = A[G];
      if (typeof Z === "object" && typeof D === "object") return D.receivedAt < Z.receivedAt ? G : I;
      return D < Z ? G : I
    })
  }
})
// @from(Start 956676, End 956761)
OKA = z((RKA) => {
  Object.defineProperty(RKA, "__esModule", {
    value: !0
  })
})
// @from(Start 956767, End 957203)
e61 = z((PKA) => {
  Object.defineProperty(PKA, "__esModule", {
    value: !0
  });
  PKA.SDKType = void 0;
  var TKA = {},
    Yf;
  PKA.SDKType = {
    _get: (A) => {
      var B;
      return ((B = TKA[A]) !== null && B !== void 0 ? B : "js-mono") + (Yf !== null && Yf !== void 0 ? Yf : "")
    },
    _setClientType(A, B) {
      TKA[A] = B
    },
    _setBindingType(A) {
      if (!Yf || Yf === "-react") Yf = "-" + A
    }
  }
})
// @from(Start 957209, End 961607)
FL1 = z((bU) => {
  var WU9 = bU && bU.__awaiter || function(A, B, Q, I) {
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
  Object.defineProperty(bU, "__esModule", {
    value: !0
  });
  bU.ErrorBoundary = bU.EXCEPTION_ENDPOINT = void 0;
  var JU9 = HZ(),
    FU9 = e61(),
    XU9 = il();
  bU.EXCEPTION_ENDPOINT = "https://statsigapi.net/v1/sdk_exception";
  var jKA = "[Statsig] UnknownError";
  class yKA {
    constructor(A, B, Q, I) {
      this._sdkKey = A, this._options = B, this._emitter = Q, this._lastSeenError = I, this._seen = new Set
    }
    wrap(A) {
      try {
        let B = A;
        CU9(B).forEach((Q) => {
          let I = B[Q];
          if ("$EB" in I) return;
          B[Q] = (...G) => {
            return this._capture(Q, () => I.apply(A, G))
          }, B[Q].$EB = !0
        })
      } catch (B) {
        this._onError("eb:wrap", B)
      }
    }
    logError(A, B) {
      this._onError(A, B)
    }
    getLastSeenErrorAndReset() {
      let A = this._lastSeenError;
      return this._lastSeenError = void 0, A !== null && A !== void 0 ? A : null
    }
    attachErrorIfNoneExists(A) {
      if (this._lastSeenError) return;
      this._lastSeenError = _KA(A)
    }
    _capture(A, B) {
      try {
        let Q = B();
        if (Q && Q instanceof Promise) return Q.catch((I) => this._onError(A, I));
        return Q
      } catch (Q) {
        return this._onError(A, Q), null
      }
    }
    _onError(A, B) {
      try {
        JU9.Log.warn(`Caught error in ${A}`, {
          error: B
        }), (() => WU9(this, void 0, void 0, function*() {
          var I, G, Z, D, Y, W, J;
          let F = B ? B : Error(jKA),
            X = F instanceof Error,
            V = X ? F.name : "No Name",
            C = _KA(F);
          if (this._lastSeenError = C, this._seen.has(V)) return;
          if (this._seen.add(V), (G = (I = this._options) === null || I === void 0 ? void 0 : I.networkConfig) === null || G === void 0 ? void 0 : G.preventAllNetworkTraffic) {
            (Z = this._emitter) === null || Z === void 0 || Z.call(this, {
              name: "error",
              error: B,
              tag: A
            });
            return
          }
          let K = FU9.SDKType._get(this._sdkKey),
            E = XU9.StatsigMetadataProvider.get(),
            N = X ? F.stack : VU9(F),
            q = JSON.stringify(Object.assign({
              tag: A,
              exception: V,
              info: N
            }, Object.assign(Object.assign({}, E), {
              sdkType: K
            })));
          yield((W = (Y = (D = this._options) === null || D === void 0 ? void 0 : D.networkConfig) === null || Y === void 0 ? void 0 : Y.networkOverrideFunc) !== null && W !== void 0 ? W : fetch)(bU.EXCEPTION_ENDPOINT, {
            method: "POST",
            headers: {
              "STATSIG-API-KEY": this._sdkKey,
              "STATSIG-SDK-TYPE": String(K),
              "STATSIG-SDK-VERSION": String(E.sdkVersion),
              "Content-Type": "application/json"
            },
            body: q
          }), (J = this._emitter) === null || J === void 0 || J.call(this, {
            name: "error",
            error: B,
            tag: A
          })
        }))().then(() => {}).catch(() => {})
      } catch (Q) {}
    }
  }
  bU.ErrorBoundary = yKA;

  function _KA(A) {
    if (A instanceof Error) return A;
    else if (typeof A === "string") return new Error(A);
    else return new Error("An unknown error occurred.")
  }

  function VU9(A) {
    try {
      return JSON.stringify(A)
    } catch (B) {
      return jKA
    }
  }

  function CU9(A) {
    let B = new Set,
      Q = Object.getPrototypeOf(A);
    while (Q && Q !== Object.prototype) Object.getOwnPropertyNames(Q).filter((I) => typeof(Q === null || Q === void 0 ? void 0 : Q[I]) === "function").forEach((I) => B.add(I)), Q = Object.getPrototypeOf(Q);
    return Array.from(B)
  }
})
// @from(Start 961613, End 961698)
xKA = z((kKA) => {
  Object.defineProperty(kKA, "__esModule", {
    value: !0
  })
})
// @from(Start 961704, End 961789)
vKA = z((fKA) => {
  Object.defineProperty(fKA, "__esModule", {
    value: !0
  })
})
// @from(Start 961795, End 961880)
gKA = z((bKA) => {
  Object.defineProperty(bKA, "__esModule", {
    value: !0
  })
})
// @from(Start 961886, End 962477)
XL1 = z((hKA) => {
  Object.defineProperty(hKA, "__esModule", {
    value: !0
  });
  hKA.createMemoKey = hKA.MemoPrefix = void 0;
  hKA.MemoPrefix = {
    _gate: "g",
    _dynamicConfig: "c",
    _experiment: "e",
    _layer: "l",
    _paramStore: "p"
  };
  var KU9 = new Set([]),
    HU9 = new Set(["userPersistedValues"]);

  function zU9(A, B, Q) {
    let I = `${A}|${B}`;
    if (!Q) return I;
    for (let G of Object.keys(Q)) {
      if (HU9.has(G)) return;
      if (KU9.has(G)) I += `|${G}=true`;
      else I += `|${G}=${Q[G]}`
    }
    return I
  }
  hKA.createMemoKey = zU9
})