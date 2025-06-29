
// @from(Start 5980379, End 5991742)
Un1 = z((ng8, EX1) => {
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var N62, $62, q62, M62, L62, R62, O62, T62, P62, wX1, En1, S62, _62, Bd, j62, y62, k62, x62, f62, v62, b62, g62, h62;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof EX1 === "object" && typeof ng8 === "object") A(Q(B, Q(ng8)));
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
    instanceof Array && function(Q, I) {
      Q.__proto__ = I
    } || function(Q, I) {
      for (var G in I)
        if (I.hasOwnProperty(G)) Q[G] = I[G]
    };
    N62 = function(Q, I) {
      B(Q, I);

      function G() {
        this.constructor = Q
      }
      Q.prototype = I === null ? Object.create(I) : (G.prototype = I.prototype, new G)
    }, $62 = Object.assign || function(Q) {
      for (var I, G = 1, Z = arguments.length; G < Z; G++) {
        I = arguments[G];
        for (var D in I)
          if (Object.prototype.hasOwnProperty.call(I, D)) Q[D] = I[D]
      }
      return Q
    }, q62 = function(Q, I) {
      var G = {};
      for (var Z in Q)
        if (Object.prototype.hasOwnProperty.call(Q, Z) && I.indexOf(Z) < 0) G[Z] = Q[Z];
      if (Q != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var D = 0, Z = Object.getOwnPropertySymbols(Q); D < Z.length; D++)
          if (I.indexOf(Z[D]) < 0 && Object.prototype.propertyIsEnumerable.call(Q, Z[D])) G[Z[D]] = Q[Z[D]]
      }
      return G
    }, M62 = function(Q, I, G, Z) {
      var D = arguments.length,
        Y = D < 3 ? I : Z === null ? Z = Object.getOwnPropertyDescriptor(I, G) : Z,
        W;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") Y = Reflect.decorate(Q, I, G, Z);
      else
        for (var J = Q.length - 1; J >= 0; J--)
          if (W = Q[J]) Y = (D < 3 ? W(Y) : D > 3 ? W(I, G, Y) : W(I, G)) || Y;
      return D > 3 && Y && Object.defineProperty(I, G, Y), Y
    }, L62 = function(Q, I) {
      return function(G, Z) {
        I(G, Z, Q)
      }
    }, R62 = function(Q, I) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Q, I)
    }, O62 = function(Q, I, G, Z) {
      function D(Y) {
        return Y instanceof G ? Y : new G(function(W) {
          W(Y)
        })
      }
      return new(G || (G = Promise))(function(Y, W) {
        function J(V) {
          try {
            X(Z.next(V))
          } catch (C) {
            W(C)
          }
        }

        function F(V) {
          try {
            X(Z.throw(V))
          } catch (C) {
            W(C)
          }
        }

        function X(V) {
          V.done ? Y(V.value) : D(V.value).then(J, F)
        }
        X((Z = Z.apply(Q, I || [])).next())
      })
    }, T62 = function(Q, I) {
      var G = {
          label: 0,
          sent: function() {
            if (Y[0] & 1) throw Y[1];
            return Y[1]
          },
          trys: [],
          ops: []
        },
        Z, D, Y, W;
      return W = {
        next: J(0),
        throw: J(1),
        return: J(2)
      }, typeof Symbol === "function" && (W[Symbol.iterator] = function() {
        return this
      }), W;

      function J(X) {
        return function(V) {
          return F([X, V])
        }
      }

      function F(X) {
        if (Z) throw new TypeError("Generator is already executing.");
        while (G) try {
          if (Z = 1, D && (Y = X[0] & 2 ? D.return : X[0] ? D.throw || ((Y = D.return) && Y.call(D), 0) : D.next) && !(Y = Y.call(D, X[1])).done) return Y;
          if (D = 0, Y) X = [X[0] & 2, Y.value];
          switch (X[0]) {
            case 0:
            case 1:
              Y = X;
              break;
            case 4:
              return G.label++, {
                value: X[1],
                done: !1
              };
            case 5:
              G.label++, D = X[1], X = [0];
              continue;
            case 7:
              X = G.ops.pop(), G.trys.pop();
              continue;
            default:
              if ((Y = G.trys, !(Y = Y.length > 0 && Y[Y.length - 1])) && (X[0] === 6 || X[0] === 2)) {
                G = 0;
                continue
              }
              if (X[0] === 3 && (!Y || X[1] > Y[0] && X[1] < Y[3])) {
                G.label = X[1];
                break
              }
              if (X[0] === 6 && G.label < Y[1]) {
                G.label = Y[1], Y = X;
                break
              }
              if (Y && G.label < Y[2]) {
                G.label = Y[2], G.ops.push(X);
                break
              }
              if (Y[2]) G.ops.pop();
              G.trys.pop();
              continue
          }
          X = I.call(Q, G)
        } catch (V) {
          X = [6, V], D = 0
        } finally {
          Z = Y = 0
        }
        if (X[0] & 5) throw X[1];
        return {
          value: X[0] ? X[1] : void 0,
          done: !0
        }
      }
    }, h62 = function(Q, I, G, Z) {
      if (Z === void 0) Z = G;
      Q[Z] = I[G]
    }, P62 = function(Q, I) {
      for (var G in Q)
        if (G !== "default" && !I.hasOwnProperty(G)) I[G] = Q[G]
    }, wX1 = function(Q) {
      var I = typeof Symbol === "function" && Symbol.iterator,
        G = I && Q[I],
        Z = 0;
      if (G) return G.call(Q);
      if (Q && typeof Q.length === "number") return {
        next: function() {
          if (Q && Z >= Q.length) Q = void 0;
          return {
            value: Q && Q[Z++],
            done: !Q
          }
        }
      };
      throw new TypeError(I ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, En1 = function(Q, I) {
      var G = typeof Symbol === "function" && Q[Symbol.iterator];
      if (!G) return Q;
      var Z = G.call(Q),
        D, Y = [],
        W;
      try {
        while ((I === void 0 || I-- > 0) && !(D = Z.next()).done) Y.push(D.value)
      } catch (J) {
        W = {
          error: J
        }
      } finally {
        try {
          if (D && !D.done && (G = Z.return)) G.call(Z)
        } finally {
          if (W) throw W.error
        }
      }
      return Y
    }, S62 = function() {
      for (var Q = [], I = 0; I < arguments.length; I++) Q = Q.concat(En1(arguments[I]));
      return Q
    }, _62 = function() {
      for (var Q = 0, I = 0, G = arguments.length; I < G; I++) Q += arguments[I].length;
      for (var Z = Array(Q), D = 0, I = 0; I < G; I++)
        for (var Y = arguments[I], W = 0, J = Y.length; W < J; W++, D++) Z[D] = Y[W];
      return Z
    }, Bd = function(Q) {
      return this instanceof Bd ? (this.v = Q, this) : new Bd(Q)
    }, j62 = function(Q, I, G) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var Z = G.apply(Q, I || []),
        D, Y = [];
      return D = {}, W("next"), W("throw"), W("return"), D[Symbol.asyncIterator] = function() {
        return this
      }, D;

      function W(K) {
        if (Z[K]) D[K] = function(E) {
          return new Promise(function(N, q) {
            Y.push([K, E, N, q]) > 1 || J(K, E)
          })
        }
      }

      function J(K, E) {
        try {
          F(Z[K](E))
        } catch (N) {
          C(Y[0][3], N)
        }
      }

      function F(K) {
        K.value instanceof Bd ? Promise.resolve(K.value.v).then(X, V) : C(Y[0][2], K)
      }

      function X(K) {
        J("next", K)
      }

      function V(K) {
        J("throw", K)
      }

      function C(K, E) {
        if (K(E), Y.shift(), Y.length) J(Y[0][0], Y[0][1])
      }
    }, y62 = function(Q) {
      var I, G;
      return I = {}, Z("next"), Z("throw", function(D) {
        throw D
      }), Z("return"), I[Symbol.iterator] = function() {
        return this
      }, I;

      function Z(D, Y) {
        I[D] = Q[D] ? function(W) {
          return (G = !G) ? {
            value: Bd(Q[D](W)),
            done: D === "return"
          } : Y ? Y(W) : W
        } : Y
      }
    }, k62 = function(Q) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var I = Q[Symbol.asyncIterator],
        G;
      return I ? I.call(Q) : (Q = typeof wX1 === "function" ? wX1(Q) : Q[Symbol.iterator](), G = {}, Z("next"), Z("throw"), Z("return"), G[Symbol.asyncIterator] = function() {
        return this
      }, G);

      function Z(Y) {
        G[Y] = Q[Y] && function(W) {
          return new Promise(function(J, F) {
            W = Q[Y](W), D(J, F, W.done, W.value)
          })
        }
      }

      function D(Y, W, J, F) {
        Promise.resolve(F).then(function(X) {
          Y({
            value: X,
            done: J
          })
        }, W)
      }
    }, x62 = function(Q, I) {
      if (Object.defineProperty) Object.defineProperty(Q, "raw", {
        value: I
      });
      else Q.raw = I;
      return Q
    }, f62 = function(Q) {
      if (Q && Q.__esModule) return Q;
      var I = {};
      if (Q != null) {
        for (var G in Q)
          if (Object.hasOwnProperty.call(Q, G)) I[G] = Q[G]
      }
      return I.default = Q, I
    }, v62 = function(Q) {
      return Q && Q.__esModule ? Q : {
        default: Q
      }
    }, b62 = function(Q, I) {
      if (!I.has(Q)) throw new TypeError("attempted to get private field on non-instance");
      return I.get(Q)
    }, g62 = function(Q, I, G) {
      if (!I.has(Q)) throw new TypeError("attempted to set private field on non-instance");
      return I.set(Q, G), G
    }, A("__extends", N62), A("__assign", $62), A("__rest", q62), A("__decorate", M62), A("__param", L62), A("__metadata", R62), A("__awaiter", O62), A("__generator", T62), A("__exportStar", P62), A("__createBinding", h62), A("__values", wX1), A("__read", En1), A("__spread", S62), A("__spreadArrays", _62), A("__await", Bd), A("__asyncGenerator", j62), A("__asyncDelegator", y62), A("__asyncValues", k62), A("__makeTemplateObject", x62), A("__importStar", f62), A("__importDefault", v62), A("__classPrivateFieldGet", b62), A("__classPrivateFieldSet", g62)
  })
})
// @from(Start 5991748, End 5992308)
u62 = z((m62) => {
  Object.defineProperty(m62, "__esModule", {
    value: !0
  });
  m62.convertToBuffer = void 0;
  var Vb6 = Hn1(),
    Cb6 = typeof Buffer !== "undefined" && Buffer.from ? function(A) {
      return Buffer.from(A, "utf8")
    } : Vb6.fromUtf8;

  function Kb6(A) {
    if (A instanceof Uint8Array) return A;
    if (typeof A === "string") return Cb6(A);
    if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    return new Uint8Array(A)
  }
  m62.convertToBuffer = Kb6
})
// @from(Start 5992314, End 5992561)
l62 = z((p62) => {
  Object.defineProperty(p62, "__esModule", {
    value: !0
  });
  p62.isEmptyData = void 0;

  function Hb6(A) {
    if (typeof A === "string") return A.length === 0;
    return A.byteLength === 0
  }
  p62.isEmptyData = Hb6
})
// @from(Start 5992567, End 5992829)
a62 = z((i62) => {
  Object.defineProperty(i62, "__esModule", {
    value: !0
  });
  i62.numToUint8 = void 0;

  function zb6(A) {
    return new Uint8Array([(A & 4278190080) >> 24, (A & 16711680) >> 16, (A & 65280) >> 8, A & 255])
  }
  i62.numToUint8 = zb6
})
// @from(Start 5992835, End 5993191)
o62 = z((s62) => {
  Object.defineProperty(s62, "__esModule", {
    value: !0
  });
  s62.uint32ArrayFrom = void 0;

  function wb6(A) {
    if (!Uint32Array.from) {
      var B = new Uint32Array(A.length),
        Q = 0;
      while (Q < A.length) B[Q] = A[Q], Q += 1;
      return B
    }
    return Uint32Array.from(A)
  }
  s62.uint32ArrayFrom = wb6
})
// @from(Start 5993197, End 5993967)
Nn1 = z((Qd) => {
  Object.defineProperty(Qd, "__esModule", {
    value: !0
  });
  Qd.uint32ArrayFrom = Qd.numToUint8 = Qd.isEmptyData = Qd.convertToBuffer = void 0;
  var Eb6 = u62();
  Object.defineProperty(Qd, "convertToBuffer", {
    enumerable: !0,
    get: function() {
      return Eb6.convertToBuffer
    }
  });
  var Ub6 = l62();
  Object.defineProperty(Qd, "isEmptyData", {
    enumerable: !0,
    get: function() {
      return Ub6.isEmptyData
    }
  });
  var Nb6 = a62();
  Object.defineProperty(Qd, "numToUint8", {
    enumerable: !0,
    get: function() {
      return Nb6.numToUint8
    }
  });
  var $b6 = o62();
  Object.defineProperty(Qd, "uint32ArrayFrom", {
    enumerable: !0,
    get: function() {
      return $b6.uint32ArrayFrom
    }
  })
})
// @from(Start 5993973, End 5994724)
Q52 = z((A52) => {
  Object.defineProperty(A52, "__esModule", {
    value: !0
  });
  A52.AwsCrc32 = void 0;
  var t62 = Un1(),
    $n1 = Nn1(),
    e62 = UX1(),
    Mb6 = function() {
      function A() {
        this.crc32 = new e62.Crc32
      }
      return A.prototype.update = function(B) {
        if ($n1.isEmptyData(B)) return;
        this.crc32.update($n1.convertToBuffer(B))
      }, A.prototype.digest = function() {
        return t62.__awaiter(this, void 0, void 0, function() {
          return t62.__generator(this, function(B) {
            return [2, $n1.numToUint8(this.crc32.digest())]
          })
        })
      }, A.prototype.reset = function() {
        this.crc32 = new e62.Crc32
      }, A
    }();
  A52.AwsCrc32 = Mb6
})
// @from(Start 5994730, End 5998885)
UX1 = z((qn1) => {
  Object.defineProperty(qn1, "__esModule", {
    value: !0
  });
  qn1.AwsCrc32 = qn1.Crc32 = qn1.crc32 = void 0;
  var Lb6 = Un1(),
    Rb6 = Nn1();

  function Ob6(A) {
    return new I52().update(A).digest()
  }
  qn1.crc32 = Ob6;
  var I52 = function() {
    function A() {
      this.checksum = 4294967295
    }
    return A.prototype.update = function(B) {
      var Q, I;
      try {
        for (var G = Lb6.__values(B), Z = G.next(); !Z.done; Z = G.next()) {
          var D = Z.value;
          this.checksum = this.checksum >>> 8 ^ Pb6[(this.checksum ^ D) & 255]
        }
      } catch (Y) {
        Q = {
          error: Y
        }
      } finally {
        try {
          if (Z && !Z.done && (I = G.return)) I.call(G)
        } finally {
          if (Q) throw Q.error
        }
      }
      return this
    }, A.prototype.digest = function() {
      return (this.checksum ^ 4294967295) >>> 0
    }, A
  }();
  qn1.Crc32 = I52;
  var Tb6 = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117],
    Pb6 = Rb6.uint32ArrayFrom(Tb6),
    Sb6 = Q52();
  Object.defineProperty(qn1, "AwsCrc32", {
    enumerable: !0,
    get: function() {
      return Sb6.AwsCrc32
    }
  })
})
// @from(Start 5998891, End 6000425)
F52 = z((Gh8, J52) => {
  var {
    defineProperty: NX1,
    getOwnPropertyDescriptor: kb6,
    getOwnPropertyNames: xb6
  } = Object, fb6 = Object.prototype.hasOwnProperty, G52 = (A, B) => NX1(A, "name", {
    value: B,
    configurable: !0
  }), vb6 = (A, B) => {
    for (var Q in B) NX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, bb6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of xb6(B))
        if (!fb6.call(A, G) && G !== Q) NX1(A, G, {
          get: () => B[G],
          enumerable: !(I = kb6(B, G)) || I.enumerable
        })
    }
    return A
  }, gb6 = (A) => bb6(NX1({}, "__esModule", {
    value: !0
  }), A), Z52 = {};
  vb6(Z52, {
    fromHex: () => Y52,
    toHex: () => W52
  });
  J52.exports = gb6(Z52);
  var D52 = {},
    Mn1 = {};
  for (let A = 0; A < 256; A++) {
    let B = A.toString(16).toLowerCase();
    if (B.length === 1) B = `0${B}`;
    D52[A] = B, Mn1[B] = A
  }

  function Y52(A) {
    if (A.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
    let B = new Uint8Array(A.length / 2);
    for (let Q = 0; Q < A.length; Q += 2) {
      let I = A.slice(Q, Q + 2).toLowerCase();
      if (I in Mn1) B[Q / 2] = Mn1[I];
      else throw new Error(`Cannot decode unrecognized sequence ${I} as hexadecimal`)
    }
    return B
  }
  G52(Y52, "fromHex");

  function W52(A) {
    let B = "";
    for (let Q = 0; Q < A.byteLength; Q++) B += D52[A[Q]];
    return B
  }
  G52(W52, "toHex")
})
// @from(Start 6000431, End 6011118)
L52 = z((Zh8, M52) => {
  var {
    defineProperty: qX1,
    getOwnPropertyDescriptor: hb6,
    getOwnPropertyNames: mb6
  } = Object, db6 = Object.prototype.hasOwnProperty, W$ = (A, B) => qX1(A, "name", {
    value: B,
    configurable: !0
  }), ub6 = (A, B) => {
    for (var Q in B) qX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, pb6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of mb6(B))
        if (!db6.call(A, G) && G !== Q) qX1(A, G, {
          get: () => B[G],
          enumerable: !(I = hb6(B, G)) || I.enumerable
        })
    }
    return A
  }, cb6 = (A) => pb6(qX1({}, "__esModule", {
    value: !0
  }), A), V52 = {};
  ub6(V52, {
    EventStreamCodec: () => Ig6,
    HeaderMarshaller: () => H52,
    Int64: () => $X1,
    MessageDecoderStream: () => Gg6,
    MessageEncoderStream: () => Zg6,
    SmithyMessageDecoderStream: () => Dg6,
    SmithyMessageEncoderStream: () => Yg6
  });
  M52.exports = cb6(V52);
  var lb6 = UX1(),
    mj = F52(),
    C52 = class A {
      constructor(B) {
        if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
      }
      static fromNumber(B) {
        if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
        let Q = new Uint8Array(8);
        for (let I = 7, G = Math.abs(Math.round(B)); I > -1 && G > 0; I--, G /= 256) Q[I] = G;
        if (B < 0) Ln1(Q);
        return new A(Q)
      }
      valueOf() {
        let B = this.bytes.slice(0),
          Q = B[0] & 128;
        if (Q) Ln1(B);
        return parseInt(mj.toHex(B), 16) * (Q ? -1 : 1)
      }
      toString() {
        return String(this.valueOf())
      }
    };
  W$(C52, "Int64");
  var $X1 = C52;

  function Ln1(A) {
    for (let B = 0; B < 8; B++) A[B] ^= 255;
    for (let B = 7; B > -1; B--)
      if (A[B]++, A[B] !== 0) break
  }
  W$(Ln1, "negate");
  var K52 = class A {
    constructor(B, Q) {
      this.toUtf8 = B, this.fromUtf8 = Q
    }
    format(B) {
      let Q = [];
      for (let Z of Object.keys(B)) {
        let D = this.fromUtf8(Z);
        Q.push(Uint8Array.from([D.byteLength]), D, this.formatHeaderValue(B[Z]))
      }
      let I = new Uint8Array(Q.reduce((Z, D) => Z + D.byteLength, 0)),
        G = 0;
      for (let Z of Q) I.set(Z, G), G += Z.byteLength;
      return I
    }
    formatHeaderValue(B) {
      switch (B.type) {
        case "boolean":
          return Uint8Array.from([B.value ? 0 : 1]);
        case "byte":
          return Uint8Array.from([2, B.value]);
        case "short":
          let Q = new DataView(new ArrayBuffer(3));
          return Q.setUint8(0, 3), Q.setInt16(1, B.value, !1), new Uint8Array(Q.buffer);
        case "integer":
          let I = new DataView(new ArrayBuffer(5));
          return I.setUint8(0, 4), I.setInt32(1, B.value, !1), new Uint8Array(I.buffer);
        case "long":
          let G = new Uint8Array(9);
          return G[0] = 5, G.set(B.value.bytes, 1), G;
        case "binary":
          let Z = new DataView(new ArrayBuffer(3 + B.value.byteLength));
          Z.setUint8(0, 6), Z.setUint16(1, B.value.byteLength, !1);
          let D = new Uint8Array(Z.buffer);
          return D.set(B.value, 3), D;
        case "string":
          let Y = this.fromUtf8(B.value),
            W = new DataView(new ArrayBuffer(3 + Y.byteLength));
          W.setUint8(0, 7), W.setUint16(1, Y.byteLength, !1);
          let J = new Uint8Array(W.buffer);
          return J.set(Y, 3), J;
        case "timestamp":
          let F = new Uint8Array(9);
          return F[0] = 8, F.set($X1.fromNumber(B.value.valueOf()).bytes, 1), F;
        case "uuid":
          if (!Ag6.test(B.value)) throw new Error(`Invalid UUID received: ${B.value}`);
          let X = new Uint8Array(17);
          return X[0] = 9, X.set(mj.fromHex(B.value.replace(/\-/g, "")), 1), X
      }
    }
    parse(B) {
      let Q = {},
        I = 0;
      while (I < B.byteLength) {
        let G = B.getUint8(I++),
          Z = this.toUtf8(new Uint8Array(B.buffer, B.byteOffset + I, G));
        switch (I += G, B.getUint8(I++)) {
          case 0:
            Q[Z] = {
              type: X52,
              value: !0
            };
            break;
          case 1:
            Q[Z] = {
              type: X52,
              value: !1
            };
            break;
          case 2:
            Q[Z] = {
              type: ib6,
              value: B.getInt8(I++)
            };
            break;
          case 3:
            Q[Z] = {
              type: nb6,
              value: B.getInt16(I, !1)
            }, I += 2;
            break;
          case 4:
            Q[Z] = {
              type: ab6,
              value: B.getInt32(I, !1)
            }, I += 4;
            break;
          case 5:
            Q[Z] = {
              type: sb6,
              value: new $X1(new Uint8Array(B.buffer, B.byteOffset + I, 8))
            }, I += 8;
            break;
          case 6:
            let D = B.getUint16(I, !1);
            I += 2, Q[Z] = {
              type: rb6,
              value: new Uint8Array(B.buffer, B.byteOffset + I, D)
            }, I += D;
            break;
          case 7:
            let Y = B.getUint16(I, !1);
            I += 2, Q[Z] = {
              type: ob6,
              value: this.toUtf8(new Uint8Array(B.buffer, B.byteOffset + I, Y))
            }, I += Y;
            break;
          case 8:
            Q[Z] = {
              type: tb6,
              value: new Date(new $X1(new Uint8Array(B.buffer, B.byteOffset + I, 8)).valueOf())
            }, I += 8;
            break;
          case 9:
            let W = new Uint8Array(B.buffer, B.byteOffset + I, 16);
            I += 16, Q[Z] = {
              type: eb6,
              value: `${mj.toHex(W.subarray(0,4))}-${mj.toHex(W.subarray(4,6))}-${mj.toHex(W.subarray(6,8))}-${mj.toHex(W.subarray(8,10))}-${mj.toHex(W.subarray(10))}`
            };
            break;
          default:
            throw new Error("Unrecognized header type tag")
        }
      }
      return Q
    }
  };
  W$(K52, "HeaderMarshaller");
  var H52 = K52,
    X52 = "boolean",
    ib6 = "byte",
    nb6 = "short",
    ab6 = "integer",
    sb6 = "long",
    rb6 = "binary",
    ob6 = "string",
    tb6 = "timestamp",
    eb6 = "uuid",
    Ag6 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    Bg6 = UX1(),
    z52 = 4,
    QO = z52 * 2,
    dj = 4,
    Qg6 = QO + dj * 2;

  function w52({
    byteLength: A,
    byteOffset: B,
    buffer: Q
  }) {
    if (A < Qg6) throw new Error("Provided message too short to accommodate event stream message overhead");
    let I = new DataView(Q, B, A),
      G = I.getUint32(0, !1);
    if (A !== G) throw new Error("Reported message length does not match received message length");
    let Z = I.getUint32(z52, !1),
      D = I.getUint32(QO, !1),
      Y = I.getUint32(A - dj, !1),
      W = new Bg6.Crc32().update(new Uint8Array(Q, B, QO));
    if (D !== W.digest()) throw new Error(`The prelude checksum specified in the message (${D}) does not match the calculated CRC32 checksum (${W.digest()})`);
    if (W.update(new Uint8Array(Q, B + QO, A - (QO + dj))), Y !== W.digest()) throw new Error(`The message checksum (${W.digest()}) did not match the expected value of ${Y}`);
    return {
      headers: new DataView(Q, B + QO + dj, Z),
      body: new Uint8Array(Q, B + QO + dj + Z, G - Z - (QO + dj + dj))
    }
  }
  W$(w52, "splitMessage");
  var E52 = class A {
    constructor(B, Q) {
      this.headerMarshaller = new H52(B, Q), this.messageBuffer = [], this.isEndOfStream = !1
    }
    feed(B) {
      this.messageBuffer.push(this.decode(B))
    }
    endOfStream() {
      this.isEndOfStream = !0
    }
    getMessage() {
      let B = this.messageBuffer.pop(),
        Q = this.isEndOfStream;
      return {
        getMessage() {
          return B
        },
        isEndOfStream() {
          return Q
        }
      }
    }
    getAvailableMessages() {
      let B = this.messageBuffer;
      this.messageBuffer = [];
      let Q = this.isEndOfStream;
      return {
        getMessages() {
          return B
        },
        isEndOfStream() {
          return Q
        }
      }
    }
    encode({
      headers: B,
      body: Q
    }) {
      let I = this.headerMarshaller.format(B),
        G = I.byteLength + Q.byteLength + 16,
        Z = new Uint8Array(G),
        D = new DataView(Z.buffer, Z.byteOffset, Z.byteLength),
        Y = new lb6.Crc32;
      return D.setUint32(0, G, !1), D.setUint32(4, I.byteLength, !1), D.setUint32(8, Y.update(Z.subarray(0, 8)).digest(), !1), Z.set(I, 12), Z.set(Q, I.byteLength + 12), D.setUint32(G - 4, Y.update(Z.subarray(8, G - 4)).digest(), !1), Z
    }
    decode(B) {
      let {
        headers: Q,
        body: I
      } = w52(B);
      return {
        headers: this.headerMarshaller.parse(Q),
        body: I
      }
    }
    formatHeaders(B) {
      return this.headerMarshaller.format(B)
    }
  };
  W$(E52, "EventStreamCodec");
  var Ig6 = E52,
    U52 = class A {
      constructor(B) {
        this.options = B
      } [Symbol.asyncIterator]() {
        return this.asyncIterator()
      }
      async * asyncIterator() {
        for await (let B of this.options.inputStream) yield this.options.decoder.decode(B)
      }
    };
  W$(U52, "MessageDecoderStream");
  var Gg6 = U52,
    N52 = class A {
      constructor(B) {
        this.options = B
      } [Symbol.asyncIterator]() {
        return this.asyncIterator()
      }
      async * asyncIterator() {
        for await (let B of this.options.messageStream) yield this.options.encoder.encode(B);
        if (this.options.includeEndFrame) yield new Uint8Array(0)
      }
    };
  W$(N52, "MessageEncoderStream");
  var Zg6 = N52,
    $52 = class A {
      constructor(B) {
        this.options = B
      } [Symbol.asyncIterator]() {
        return this.asyncIterator()
      }
      async * asyncIterator() {
        for await (let B of this.options.messageStream) {
          let Q = await this.options.deserializer(B);
          if (Q === void 0) continue;
          yield Q
        }
      }
    };
  W$($52, "SmithyMessageDecoderStream");
  var Dg6 = $52,
    q52 = class A {
      constructor(B) {
        this.options = B
      } [Symbol.asyncIterator]() {
        return this.asyncIterator()
      }
      async * asyncIterator() {
        for await (let B of this.options.inputStream) yield this.options.serializer(B)
      }
    };
  W$(q52, "SmithyMessageEncoderStream");
  var Yg6 = q52
})
// @from(Start 6011124, End 6015100)
j52 = z((Dh8, _52) => {
  var {
    defineProperty: MX1,
    getOwnPropertyDescriptor: Wg6,
    getOwnPropertyNames: Jg6
  } = Object, Fg6 = Object.prototype.hasOwnProperty, Id = (A, B) => MX1(A, "name", {
    value: B,
    configurable: !0
  }), Xg6 = (A, B) => {
    for (var Q in B) MX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Vg6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Jg6(B))
        if (!Fg6.call(A, G) && G !== Q) MX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Wg6(B, G)) || I.enumerable
        })
    }
    return A
  }, Cg6 = (A) => Vg6(MX1({}, "__esModule", {
    value: !0
  }), A), R52 = {};
  Xg6(R52, {
    EventStreamMarshaller: () => S52,
    eventStreamSerdeProvider: () => Kg6
  });
  _52.exports = Cg6(R52);
  var at = L52();

  function O52(A) {
    let B = 0,
      Q = 0,
      I = null,
      G = null,
      Z = Id((Y) => {
        if (typeof Y !== "number") throw new Error("Attempted to allocate an event message where size was not a number: " + Y);
        B = Y, Q = 4, I = new Uint8Array(Y), new DataView(I.buffer).setUint32(0, Y, !1)
      }, "allocateMessage"),
      D = Id(async function*() {
        let Y = A[Symbol.asyncIterator]();
        while (!0) {
          let {
            value: W,
            done: J
          } = await Y.next();
          if (J) {
            if (!B) return;
            else if (B === Q) yield I;
            else throw new Error("Truncated event message received.");
            return
          }
          let F = W.length,
            X = 0;
          while (X < F) {
            if (!I) {
              let C = F - X;
              if (!G) G = new Uint8Array(4);
              let K = Math.min(4 - Q, C);
              if (G.set(W.slice(X, X + K), Q), Q += K, X += K, Q < 4) break;
              Z(new DataView(G.buffer).getUint32(0, !1)), G = null
            }
            let V = Math.min(B - Q, F - X);
            if (I.set(W.slice(X, X + V), Q), Q += V, X += V, B && B === Q) yield I, I = null, B = 0, Q = 0
          }
        }
      }, "iterator");
    return {
      [Symbol.asyncIterator]: D
    }
  }
  Id(O52, "getChunkedStream");

  function T52(A, B) {
    return async function(Q) {
      let {
        value: I
      } = Q.headers[":message-type"];
      if (I === "error") {
        let G = new Error(Q.headers[":error-message"].value || "UnknownError");
        throw G.name = Q.headers[":error-code"].value, G
      } else if (I === "exception") {
        let G = Q.headers[":exception-type"].value,
          Z = {
            [G]: Q
          },
          D = await A(Z);
        if (D.$unknown) {
          let Y = new Error(B(Q.body));
          throw Y.name = G, Y
        }
        throw D[G]
      } else if (I === "event") {
        let G = {
            [Q.headers[":event-type"].value]: Q
          },
          Z = await A(G);
        if (Z.$unknown) return;
        return Z
      } else throw Error(`Unrecognizable event type: ${Q.headers[":event-type"].value}`)
    }
  }
  Id(T52, "getMessageUnmarshaller");
  var P52 = class A {
    constructor({
      utf8Encoder: B,
      utf8Decoder: Q
    }) {
      this.eventStreamCodec = new at.EventStreamCodec(B, Q), this.utfEncoder = B
    }
    deserialize(B, Q) {
      let I = O52(B);
      return new at.SmithyMessageDecoderStream({
        messageStream: new at.MessageDecoderStream({
          inputStream: I,
          decoder: this.eventStreamCodec
        }),
        deserializer: T52(Q, this.utfEncoder)
      })
    }
    serialize(B, Q) {
      return new at.MessageEncoderStream({
        messageStream: new at.SmithyMessageEncoderStream({
          inputStream: B,
          serializer: Q
        }),
        encoder: this.eventStreamCodec,
        includeEndFrame: !0
      })
    }
  };
  Id(P52, "EventStreamMarshaller");
  var S52 = P52,
    Kg6 = Id((A) => new S52(A), "eventStreamSerdeProvider")
})
// @from(Start 6015106, End 6017015)
b52 = z((Yh8, v52) => {
  var {
    defineProperty: LX1,
    getOwnPropertyDescriptor: Hg6,
    getOwnPropertyNames: zg6
  } = Object, wg6 = Object.prototype.hasOwnProperty, Rn1 = (A, B) => LX1(A, "name", {
    value: B,
    configurable: !0
  }), Eg6 = (A, B) => {
    for (var Q in B) LX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Ug6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of zg6(B))
        if (!wg6.call(A, G) && G !== Q) LX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Hg6(B, G)) || I.enumerable
        })
    }
    return A
  }, Ng6 = (A) => Ug6(LX1({}, "__esModule", {
    value: !0
  }), A), y52 = {};
  Eg6(y52, {
    EventStreamMarshaller: () => f52,
    eventStreamSerdeProvider: () => Mg6
  });
  v52.exports = Ng6(y52);
  var $g6 = j52(),
    qg6 = Z1("stream");
  async function* k52(A) {
    let B = !1,
      Q = !1,
      I = new Array;
    A.on("error", (G) => {
      if (!B) B = !0;
      if (G) throw G
    }), A.on("data", (G) => {
      I.push(G)
    }), A.on("end", () => {
      B = !0
    });
    while (!Q) {
      let G = await new Promise((Z) => setTimeout(() => Z(I.shift()), 0));
      if (G) yield G;
      Q = B && I.length === 0
    }
  }
  Rn1(k52, "readabletoIterable");
  var x52 = class A {
    constructor({
      utf8Encoder: B,
      utf8Decoder: Q
    }) {
      this.universalMarshaller = new $g6.EventStreamMarshaller({
        utf8Decoder: Q,
        utf8Encoder: B
      })
    }
    deserialize(B, Q) {
      let I = typeof B[Symbol.asyncIterator] === "function" ? B : k52(B);
      return this.universalMarshaller.deserialize(I, Q)
    }
    serialize(B, Q) {
      return qg6.Readable.from(this.universalMarshaller.serialize(B, Q))
    }
  };
  Rn1(x52, "EventStreamMarshaller");
  var f52 = x52,
    Mg6 = Rn1((A) => new f52(A), "eventStreamSerdeProvider")
})
// @from(Start 6017021, End 6017974)
m52 = z((Wh8, h52) => {
  var {
    defineProperty: RX1,
    getOwnPropertyDescriptor: Lg6,
    getOwnPropertyNames: Rg6
  } = Object, Og6 = Object.prototype.hasOwnProperty, Tg6 = (A, B) => RX1(A, "name", {
    value: B,
    configurable: !0
  }), Pg6 = (A, B) => {
    for (var Q in B) RX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Sg6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Rg6(B))
        if (!Og6.call(A, G) && G !== Q) RX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Lg6(B, G)) || I.enumerable
        })
    }
    return A
  }, _g6 = (A) => Sg6(RX1({}, "__esModule", {
    value: !0
  }), A), g52 = {};
  Pg6(g52, {
    isArrayBuffer: () => jg6
  });
  h52.exports = _g6(g52);
  var jg6 = Tg6((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
})
// @from(Start 6017980, End 6019329)
TX1 = z((Jh8, p52) => {
  var {
    defineProperty: OX1,
    getOwnPropertyDescriptor: yg6,
    getOwnPropertyNames: kg6
  } = Object, xg6 = Object.prototype.hasOwnProperty, d52 = (A, B) => OX1(A, "name", {
    value: B,
    configurable: !0
  }), fg6 = (A, B) => {
    for (var Q in B) OX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, vg6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of kg6(B))
        if (!xg6.call(A, G) && G !== Q) OX1(A, G, {
          get: () => B[G],
          enumerable: !(I = yg6(B, G)) || I.enumerable
        })
    }
    return A
  }, bg6 = (A) => vg6(OX1({}, "__esModule", {
    value: !0
  }), A), u52 = {};
  fg6(u52, {
    fromArrayBuffer: () => hg6,
    fromString: () => mg6
  });
  p52.exports = bg6(u52);
  var gg6 = m52(),
    On1 = Z1("buffer"),
    hg6 = d52((A, B = 0, Q = A.byteLength - B) => {
      if (!gg6.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
      return On1.Buffer.from(A, B, Q)
    }, "fromArrayBuffer"),
    mg6 = d52((A, B) => {
      if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
      return B ? On1.Buffer.from(A, B) : On1.Buffer.from(A)
    }, "fromString")
})
// @from(Start 6019335, End 6019826)
i52 = z((c52) => {
  Object.defineProperty(c52, "__esModule", {
    value: !0
  });
  c52.fromBase64 = void 0;
  var dg6 = TX1(),
    ug6 = /^[A-Za-z0-9+/]*={0,2}$/,
    pg6 = (A) => {
      if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
      if (!ug6.exec(A)) throw new TypeError("Invalid base64 string.");
      let B = dg6.fromString(A, "base64");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
    };
  c52.fromBase64 = pg6
})
// @from(Start 6019832, End 6021489)
o52 = z((Xh8, r52) => {
  var {
    defineProperty: PX1,
    getOwnPropertyDescriptor: cg6,
    getOwnPropertyNames: lg6
  } = Object, ig6 = Object.prototype.hasOwnProperty, Tn1 = (A, B) => PX1(A, "name", {
    value: B,
    configurable: !0
  }), ng6 = (A, B) => {
    for (var Q in B) PX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, ag6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of lg6(B))
        if (!ig6.call(A, G) && G !== Q) PX1(A, G, {
          get: () => B[G],
          enumerable: !(I = cg6(B, G)) || I.enumerable
        })
    }
    return A
  }, sg6 = (A) => ag6(PX1({}, "__esModule", {
    value: !0
  }), A), n52 = {};
  ng6(n52, {
    fromUtf8: () => s52,
    toUint8Array: () => rg6,
    toUtf8: () => og6
  });
  r52.exports = sg6(n52);
  var a52 = TX1(),
    s52 = Tn1((A) => {
      let B = a52.fromString(A, "utf8");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
    }, "fromUtf8"),
    rg6 = Tn1((A) => {
      if (typeof A === "string") return s52(A);
      if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      return new Uint8Array(A)
    }, "toUint8Array"),
    og6 = Tn1((A) => {
      if (typeof A === "string") return A;
      if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
      return a52.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
    }, "toUtf8")
})
// @from(Start 6021495, End 6022070)
A82 = z((t52) => {
  Object.defineProperty(t52, "__esModule", {
    value: !0
  });
  t52.toBase64 = void 0;
  var tg6 = TX1(),
    eg6 = o52(),
    Ah6 = (A) => {
      let B;
      if (typeof A === "string") B = eg6.fromUtf8(A);
      else B = A;
      if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
      return tg6.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
    };
  t52.toBase64 = Ah6
})
// @from(Start 6022076, End 6022772)
_X1 = z((Ch8, SX1) => {
  var {
    defineProperty: B82,
    getOwnPropertyDescriptor: Bh6,
    getOwnPropertyNames: Qh6
  } = Object, Ih6 = Object.prototype.hasOwnProperty, Pn1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Qh6(B))
        if (!Ih6.call(A, G) && G !== Q) B82(A, G, {
          get: () => B[G],
          enumerable: !(I = Bh6(B, G)) || I.enumerable
        })
    }
    return A
  }, Q82 = (A, B, Q) => (Pn1(A, B, "default"), Q && Pn1(Q, B, "default")), Gh6 = (A) => Pn1(B82({}, "__esModule", {
    value: !0
  }), A), Sn1 = {};
  SX1.exports = Gh6(Sn1);
  Q82(Sn1, i52(), SX1.exports);
  Q82(Sn1, A82(), SX1.exports)
})
// @from(Start 6022778, End 6023831)
D82 = z((Kh8, Z82) => {
  var {
    defineProperty: jX1,
    getOwnPropertyDescriptor: Zh6,
    getOwnPropertyNames: Dh6
  } = Object, Yh6 = Object.prototype.hasOwnProperty, _n1 = (A, B) => jX1(A, "name", {
    value: B,
    configurable: !0
  }), Wh6 = (A, B) => {
    for (var Q in B) jX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Jh6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Dh6(B))
        if (!Yh6.call(A, G) && G !== Q) jX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Zh6(B, G)) || I.enumerable
        })
    }
    return A
  }, Fh6 = (A) => Jh6(jX1({}, "__esModule", {
    value: !0
  }), A), I82 = {};
  Wh6(I82, {
    escapeUri: () => G82,
    escapeUriPath: () => Vh6
  });
  Z82.exports = Fh6(I82);
  var G82 = _n1((A) => encodeURIComponent(A).replace(/[!'()*]/g, Xh6), "escapeUri"),
    Xh6 = _n1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
    Vh6 = _n1((A) => A.split("/").map(G82).join("/"), "escapeUriPath")
})
// @from(Start 6023837, End 6025075)
yn1 = z((Hh8, J82) => {
  var {
    defineProperty: yX1,
    getOwnPropertyDescriptor: Ch6,
    getOwnPropertyNames: Kh6
  } = Object, Hh6 = Object.prototype.hasOwnProperty, zh6 = (A, B) => yX1(A, "name", {
    value: B,
    configurable: !0
  }), wh6 = (A, B) => {
    for (var Q in B) yX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Eh6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Kh6(B))
        if (!Hh6.call(A, G) && G !== Q) yX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Ch6(B, G)) || I.enumerable
        })
    }
    return A
  }, Uh6 = (A) => Eh6(yX1({}, "__esModule", {
    value: !0
  }), A), Y82 = {};
  wh6(Y82, {
    buildQueryString: () => W82
  });
  J82.exports = Uh6(Y82);
  var jn1 = D82();

  function W82(A) {
    let B = [];
    for (let Q of Object.keys(A).sort()) {
      let I = A[Q];
      if (Q = jn1.escapeUri(Q), Array.isArray(I))
        for (let G = 0, Z = I.length; G < Z; G++) B.push(`${Q}=${jn1.escapeUri(I[G])}`);
      else {
        let G = Q;
        if (I || typeof I === "string") G += `=${jn1.escapeUri(I)}`;
        B.push(G)
      }
    }
    return B.join("&")
  }
  zh6(W82, "buildQueryString")
})
// @from(Start 6025081, End 6030185)
U82 = z((zh8, E82) => {
  var {
    defineProperty: kX1,
    getOwnPropertyDescriptor: Nh6,
    getOwnPropertyNames: $h6
  } = Object, qh6 = Object.prototype.hasOwnProperty, Gd = (A, B) => kX1(A, "name", {
    value: B,
    configurable: !0
  }), Mh6 = (A, B) => {
    for (var Q in B) kX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Lh6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of $h6(B))
        if (!qh6.call(A, G) && G !== Q) kX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Nh6(B, G)) || I.enumerable
        })
    }
    return A
  }, Rh6 = (A) => Lh6(kX1({}, "__esModule", {
    value: !0
  }), A), X82 = {};
  Mh6(X82, {
    FetchHttpHandler: () => Th6,
    keepAliveSupport: () => C82,
    streamCollector: () => Sh6
  });
  E82.exports = Rh6(X82);
  var F82 = VX1(),
    Oh6 = yn1();

  function V82(A = 0) {
    return new Promise((B, Q) => {
      if (A) setTimeout(() => {
        let I = new Error(`Request did not complete within ${A} ms`);
        I.name = "TimeoutError", Q(I)
      }, A)
    })
  }
  Gd(V82, "requestTimeout");
  var C82 = {
      supported: Boolean(typeof Request !== "undefined" && "keepalive" in new Request("https://[::1]"))
    },
    K82 = class A {
      static create(B) {
        if (typeof(B == null ? void 0 : B.handle) === "function") return B;
        return new A(B)
      }
      constructor(B) {
        if (typeof B === "function") this.configProvider = B().then((Q) => Q || {});
        else this.config = B ?? {}, this.configProvider = Promise.resolve(this.config)
      }
      destroy() {}
      async handle(B, {
        abortSignal: Q
      } = {}) {
        if (!this.config) this.config = await this.configProvider;
        let I = this.config.requestTimeout,
          G = this.config.keepAlive === !0;
        if (Q == null ? void 0 : Q.aborted) {
          let E = new Error("Request aborted");
          return E.name = "AbortError", Promise.reject(E)
        }
        let Z = B.path,
          D = Oh6.buildQueryString(B.query || {});
        if (D) Z += `?${D}`;
        if (B.fragment) Z += `#${B.fragment}`;
        let Y = "";
        if (B.username != null || B.password != null) {
          let E = B.username ?? "",
            N = B.password ?? "";
          Y = `${E}:${N}@`
        }
        let {
          port: W,
          method: J
        } = B, F = `${B.protocol}//${Y}${B.hostname}${W?`:${W}`:""}${Z}`, V = {
          body: J === "GET" || J === "HEAD" ? void 0 : B.body,
          headers: new Headers(B.headers),
          method: J
        };
        if (typeof AbortController !== "undefined") V.signal = Q;
        if (C82.supported) V.keepalive = G;
        let C = new Request(F, V),
          K = [fetch(C).then((E) => {
            let N = E.headers,
              q = {};
            for (let R of N.entries()) q[R[0]] = R[1];
            if (E.body == null) return E.blob().then((R) => ({
              response: new F82.HttpResponse({
                headers: q,
                reason: E.statusText,
                statusCode: E.status,
                body: R
              })
            }));
            return {
              response: new F82.HttpResponse({
                headers: q,
                reason: E.statusText,
                statusCode: E.status,
                body: E.body
              })
            }
          }), V82(I)];
        if (Q) K.push(new Promise((E, N) => {
          Q.onabort = () => {
            let q = new Error("Request aborted");
            q.name = "AbortError", N(q)
          }
        }));
        return Promise.race(K)
      }
      updateHttpClientConfig(B, Q) {
        this.config = void 0, this.configProvider = this.configProvider.then((I) => {
          return I[B] = Q, I
        })
      }
      httpHandlerConfigs() {
        return this.config ?? {}
      }
    };
  Gd(K82, "FetchHttpHandler");
  var Th6 = K82,
    Ph6 = _X1(),
    Sh6 = Gd((A) => {
      if (typeof Blob === "function" && A instanceof Blob) return H82(A);
      return z82(A)
    }, "streamCollector");
  async function H82(A) {
    let B = await w82(A),
      Q = Ph6.fromBase64(B);
    return new Uint8Array(Q)
  }
  Gd(H82, "collectBlob");
  async function z82(A) {
    let B = new Uint8Array(0),
      Q = A.getReader(),
      I = !1;
    while (!I) {
      let {
        done: G,
        value: Z
      } = await Q.read();
      if (Z) {
        let D = B;
        B = new Uint8Array(D.length + Z.length), B.set(D), B.set(Z, D.length)
      }
      I = G
    }
    return B
  }
  Gd(z82, "collectStream");

  function w82(A) {
    return new Promise((B, Q) => {
      let I = new FileReader;
      I.onloadend = () => {
        if (I.readyState !== 2) return Q(new Error("Reader aborted too early"));
        let G = I.result ?? "",
          Z = G.indexOf(","),
          D = Z > -1 ? Z + 1 : G.length;
        B(G.substring(D))
      }, I.onabort = () => Q(new Error("Read aborted")), I.onerror = () => Q(I.error), I.readAsDataURL(A)
    })
  }
  Gd(w82, "readToBase64")
})
// @from(Start 6030191, End 6038310)
L82 = z((wh8, M82) => {
  var {
    defineProperty: xX1,
    getOwnPropertyDescriptor: _h6,
    getOwnPropertyNames: jh6
  } = Object, yh6 = Object.prototype.hasOwnProperty, tX = (A, B) => xX1(A, "name", {
    value: B,
    configurable: !0
  }), kh6 = (A, B) => {
    for (var Q in B) xX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, xh6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of jh6(B))
        if (!yh6.call(A, G) && G !== Q) xX1(A, G, {
          get: () => B[G],
          enumerable: !(I = _h6(B, G)) || I.enumerable
        })
    }
    return A
  }, fh6 = (A) => xh6(xX1({}, "__esModule", {
    value: !0
  }), A), q82 = {};
  kh6(q82, {
    constructStack: () => kn1
  });
  M82.exports = fh6(q82);
  var uj = tX((A, B) => {
      let Q = [];
      if (A) Q.push(A);
      if (B)
        for (let I of B) Q.push(I);
      return Q
    }, "getAllAliases"),
    IO = tX((A, B) => {
      return `${A||"anonymous"}${B&&B.length>0?` (a.k.a. ${B.join(",")})`:""}`
    }, "getMiddlewareNameWithAliases"),
    kn1 = tX(() => {
      let A = [],
        B = [],
        Q = !1,
        I = new Set,
        G = tX((X) => X.sort((V, C) => N82[C.step] - N82[V.step] || $82[C.priority || "normal"] - $82[V.priority || "normal"]), "sort"),
        Z = tX((X) => {
          let V = !1,
            C = tX((K) => {
              let E = uj(K.name, K.aliases);
              if (E.includes(X)) {
                V = !0;
                for (let N of E) I.delete(N);
                return !1
              }
              return !0
            }, "filterCb");
          return A = A.filter(C), B = B.filter(C), V
        }, "removeByName"),
        D = tX((X) => {
          let V = !1,
            C = tX((K) => {
              if (K.middleware === X) {
                V = !0;
                for (let E of uj(K.name, K.aliases)) I.delete(E);
                return !1
              }
              return !0
            }, "filterCb");
          return A = A.filter(C), B = B.filter(C), V
        }, "removeByReference"),
        Y = tX((X) => {
          var V;
          return A.forEach((C) => {
            X.add(C.middleware, {
              ...C
            })
          }), B.forEach((C) => {
            X.addRelativeTo(C.middleware, {
              ...C
            })
          }), (V = X.identifyOnResolve) == null || V.call(X, F.identifyOnResolve()), X
        }, "cloneTo"),
        W = tX((X) => {
          let V = [];
          return X.before.forEach((C) => {
            if (C.before.length === 0 && C.after.length === 0) V.push(C);
            else V.push(...W(C))
          }), V.push(X), X.after.reverse().forEach((C) => {
            if (C.before.length === 0 && C.after.length === 0) V.push(C);
            else V.push(...W(C))
          }), V
        }, "expandRelativeMiddlewareList"),
        J = tX((X = !1) => {
          let V = [],
            C = [],
            K = {};
          return A.forEach((N) => {
            let q = {
              ...N,
              before: [],
              after: []
            };
            for (let O of uj(q.name, q.aliases)) K[O] = q;
            V.push(q)
          }), B.forEach((N) => {
            let q = {
              ...N,
              before: [],
              after: []
            };
            for (let O of uj(q.name, q.aliases)) K[O] = q;
            C.push(q)
          }), C.forEach((N) => {
            if (N.toMiddleware) {
              let q = K[N.toMiddleware];
              if (q === void 0) {
                if (X) return;
                throw new Error(`${N.toMiddleware} is not found when adding ${IO(N.name,N.aliases)} middleware ${N.relation} ${N.toMiddleware}`)
              }
              if (N.relation === "after") q.after.push(N);
              if (N.relation === "before") q.before.push(N)
            }
          }), G(V).map(W).reduce((N, q) => {
            return N.push(...q), N
          }, [])
        }, "getMiddlewareList"),
        F = {
          add: (X, V = {}) => {
            let {
              name: C,
              override: K,
              aliases: E
            } = V, N = {
              step: "initialize",
              priority: "normal",
              middleware: X,
              ...V
            }, q = uj(C, E);
            if (q.length > 0) {
              if (q.some((O) => I.has(O))) {
                if (!K) throw new Error(`Duplicate middleware name '${IO(C,E)}'`);
                for (let O of q) {
                  let R = A.findIndex((L) => {
                    var _;
                    return L.name === O || ((_ = L.aliases) == null ? void 0 : _.some((k) => k === O))
                  });
                  if (R === -1) continue;
                  let T = A[R];
                  if (T.step !== N.step || N.priority !== T.priority) throw new Error(`"${IO(T.name,T.aliases)}" middleware with ${T.priority} priority in ${T.step} step cannot be overridden by "${IO(C,E)}" middleware with ${N.priority} priority in ${N.step} step.`);
                  A.splice(R, 1)
                }
              }
              for (let O of q) I.add(O)
            }
            A.push(N)
          },
          addRelativeTo: (X, V) => {
            let {
              name: C,
              override: K,
              aliases: E
            } = V, N = {
              middleware: X,
              ...V
            }, q = uj(C, E);
            if (q.length > 0) {
              if (q.some((O) => I.has(O))) {
                if (!K) throw new Error(`Duplicate middleware name '${IO(C,E)}'`);
                for (let O of q) {
                  let R = B.findIndex((L) => {
                    var _;
                    return L.name === O || ((_ = L.aliases) == null ? void 0 : _.some((k) => k === O))
                  });
                  if (R === -1) continue;
                  let T = B[R];
                  if (T.toMiddleware !== N.toMiddleware || T.relation !== N.relation) throw new Error(`"${IO(T.name,T.aliases)}" middleware ${T.relation} "${T.toMiddleware}" middleware cannot be overridden by "${IO(C,E)}" middleware ${N.relation} "${N.toMiddleware}" middleware.`);
                  B.splice(R, 1)
                }
              }
              for (let O of q) I.add(O)
            }
            B.push(N)
          },
          clone: () => Y(kn1()),
          use: (X) => {
            X.applyToStack(F)
          },
          remove: (X) => {
            if (typeof X === "string") return Z(X);
            else return D(X)
          },
          removeByTag: (X) => {
            let V = !1,
              C = tX((K) => {
                let {
                  tags: E,
                  name: N,
                  aliases: q
                } = K;
                if (E && E.includes(X)) {
                  let O = uj(N, q);
                  for (let R of O) I.delete(R);
                  return V = !0, !1
                }
                return !0
              }, "filterCb");
            return A = A.filter(C), B = B.filter(C), V
          },
          concat: (X) => {
            var V;
            let C = Y(kn1());
            return C.use(X), C.identifyOnResolve(Q || C.identifyOnResolve() || (((V = X.identifyOnResolve) == null ? void 0 : V.call(X)) ?? !1)), C
          },
          applyToStack: Y,
          identify: () => {
            return J(!0).map((X) => {
              let V = X.step ?? X.relation + " " + X.toMiddleware;
              return IO(X.name, X.aliases) + " - " + V
            })
          },
          identifyOnResolve(X) {
            if (typeof X === "boolean") Q = X;
            return Q
          },
          resolve: (X, V) => {
            for (let C of J().map((K) => K.middleware).reverse()) X = C(X, V);
            if (Q) console.log(F.identify());
            return X
          }
        };
      return F
    }, "constructStack"),
    N82 = {
      initialize: 5,
      serialize: 4,
      build: 3,
      finalizeRequest: 2,
      deserialize: 1
    },
    $82 = {
      high: 3,
      normal: 2,
      low: 1
    }
})
// @from(Start 6038316, End 6039269)
T82 = z((Eh8, O82) => {
  var {
    defineProperty: fX1,
    getOwnPropertyDescriptor: vh6,
    getOwnPropertyNames: bh6
  } = Object, gh6 = Object.prototype.hasOwnProperty, hh6 = (A, B) => fX1(A, "name", {
    value: B,
    configurable: !0
  }), mh6 = (A, B) => {
    for (var Q in B) fX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, dh6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of bh6(B))
        if (!gh6.call(A, G) && G !== Q) fX1(A, G, {
          get: () => B[G],
          enumerable: !(I = vh6(B, G)) || I.enumerable
        })
    }
    return A
  }, uh6 = (A) => dh6(fX1({}, "__esModule", {
    value: !0
  }), A), R82 = {};
  mh6(R82, {
    isArrayBuffer: () => ph6
  });
  O82.exports = uh6(R82);
  var ph6 = hh6((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
})
// @from(Start 6039275, End 6040624)
fn1 = z((Uh8, _82) => {
  var {
    defineProperty: vX1,
    getOwnPropertyDescriptor: ch6,
    getOwnPropertyNames: lh6
  } = Object, ih6 = Object.prototype.hasOwnProperty, P82 = (A, B) => vX1(A, "name", {
    value: B,
    configurable: !0
  }), nh6 = (A, B) => {
    for (var Q in B) vX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, ah6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of lh6(B))
        if (!ih6.call(A, G) && G !== Q) vX1(A, G, {
          get: () => B[G],
          enumerable: !(I = ch6(B, G)) || I.enumerable
        })
    }
    return A
  }, sh6 = (A) => ah6(vX1({}, "__esModule", {
    value: !0
  }), A), S82 = {};
  nh6(S82, {
    fromArrayBuffer: () => oh6,
    fromString: () => th6
  });
  _82.exports = sh6(S82);
  var rh6 = T82(),
    xn1 = Z1("buffer"),
    oh6 = P82((A, B = 0, Q = A.byteLength - B) => {
      if (!rh6.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
      return xn1.Buffer.from(A, B, Q)
    }, "fromArrayBuffer"),
    th6 = P82((A, B) => {
      if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
      return B ? xn1.Buffer.from(A, B) : xn1.Buffer.from(A)
    }, "fromString")
})
// @from(Start 6040630, End 6042287)
f82 = z((Nh8, x82) => {
  var {
    defineProperty: bX1,
    getOwnPropertyDescriptor: eh6,
    getOwnPropertyNames: Am6
  } = Object, Bm6 = Object.prototype.hasOwnProperty, vn1 = (A, B) => bX1(A, "name", {
    value: B,
    configurable: !0
  }), Qm6 = (A, B) => {
    for (var Q in B) bX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Im6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Am6(B))
        if (!Bm6.call(A, G) && G !== Q) bX1(A, G, {
          get: () => B[G],
          enumerable: !(I = eh6(B, G)) || I.enumerable
        })
    }
    return A
  }, Gm6 = (A) => Im6(bX1({}, "__esModule", {
    value: !0
  }), A), j82 = {};
  Qm6(j82, {
    fromUtf8: () => k82,
    toUint8Array: () => Zm6,
    toUtf8: () => Dm6
  });
  x82.exports = Gm6(j82);
  var y82 = fn1(),
    k82 = vn1((A) => {
      let B = y82.fromString(A, "utf8");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
    }, "fromUtf8"),
    Zm6 = vn1((A) => {
      if (typeof A === "string") return k82(A);
      if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      return new Uint8Array(A)
    }, "toUint8Array"),
    Dm6 = vn1((A) => {
      if (typeof A === "string") return A;
      if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
      return y82.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
    }, "toUtf8")
})
// @from(Start 6042293, End 6043153)
g82 = z((v82) => {
  Object.defineProperty(v82, "__esModule", {
    value: !0
  });
  v82.getAwsChunkedEncodingStream = void 0;
  var Ym6 = Z1("stream"),
    Wm6 = (A, B) => {
      let {
        base64Encoder: Q,
        bodyLengthChecker: I,
        checksumAlgorithmFn: G,
        checksumLocationName: Z,
        streamHasher: D
      } = B, Y = Q !== void 0 && G !== void 0 && Z !== void 0 && D !== void 0, W = Y ? D(G, A) : void 0, J = new Ym6.Readable({
        read: () => {}
      });
      return A.on("data", (F) => {
        let X = I(F) || 0;
        J.push(`${X.toString(16)}\r
`), J.push(F), J.push(`\r
`)
      }), A.on("end", async () => {
        if (J.push(`0\r
`), Y) {
          let F = Q(await W);
          J.push(`${Z}:${F}\r
`), J.push(`\r
`)
        }
        J.push(null)
      }), J
    };
  v82.getAwsChunkedEncodingStream = Wm6
})
// @from(Start 6043159, End 6059824)
AB2 = z((qh8, e82) => {
  var {
    create: Jm6,
    defineProperty: st,
    getOwnPropertyDescriptor: Fm6,
    getOwnPropertyNames: Xm6,
    getPrototypeOf: Vm6
  } = Object, Cm6 = Object.prototype.hasOwnProperty, jI = (A, B) => st(A, "name", {
    value: B,
    configurable: !0
  }), Km6 = (A, B) => {
    for (var Q in B) st(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, d82 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Xm6(B))
        if (!Cm6.call(A, G) && G !== Q) st(A, G, {
          get: () => B[G],
          enumerable: !(I = Fm6(B, G)) || I.enumerable
        })
    }
    return A
  }, Hm6 = (A, B, Q) => (Q = A != null ? Jm6(Vm6(A)) : {}, d82(B || !A || !A.__esModule ? st(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q, A)), zm6 = (A) => d82(st({}, "__esModule", {
    value: !0
  }), A), u82 = {};
  Km6(u82, {
    DEFAULT_REQUEST_TIMEOUT: () => $m6,
    NodeHttp2Handler: () => Om6,
    NodeHttpHandler: () => qm6,
    streamCollector: () => Pm6
  });
  e82.exports = zm6(u82);
  var p82 = VX1(),
    c82 = yn1(),
    bn1 = Z1("http"),
    gn1 = Z1("https"),
    wm6 = ["ECONNRESET", "EPIPE", "ETIMEDOUT"],
    l82 = jI((A) => {
      let B = {};
      for (let Q of Object.keys(A)) {
        let I = A[Q];
        B[Q] = Array.isArray(I) ? I.join(",") : I
      }
      return B
    }, "getTransformedHeaders"),
    Em6 = jI((A, B, Q = 0) => {
      if (!Q) return;
      let I = setTimeout(() => {
        A.destroy(), B(Object.assign(new Error(`Socket timed out without establishing a connection within ${Q} ms`), {
          name: "TimeoutError"
        }))
      }, Q);
      A.on("socket", (G) => {
        if (G.connecting) G.on("connect", () => {
          clearTimeout(I)
        });
        else clearTimeout(I)
      })
    }, "setConnectionTimeout"),
    Um6 = jI((A, {
      keepAlive: B,
      keepAliveMsecs: Q
    }) => {
      if (B !== !0) return;
      A.on("socket", (I) => {
        I.setKeepAlive(B, Q || 0)
      })
    }, "setSocketKeepAlive"),
    Nm6 = jI((A, B, Q = 0) => {
      A.setTimeout(Q, () => {
        A.destroy(), B(Object.assign(new Error(`Connection timed out after ${Q} ms`), {
          name: "TimeoutError"
        }))
      })
    }, "setSocketTimeout"),
    i82 = Z1("stream"),
    h82 = 1000;
  async function hn1(A, B, Q = h82) {
    let I = B.headers ?? {},
      G = I.Expect || I.expect,
      Z = -1,
      D = !1;
    if (G === "100-continue") await Promise.race([new Promise((Y) => {
      Z = Number(setTimeout(Y, Math.max(h82, Q)))
    }), new Promise((Y) => {
      A.on("continue", () => {
        clearTimeout(Z), Y()
      }), A.on("error", () => {
        D = !0, clearTimeout(Z), Y()
      })
    })]);
    if (!D) n82(A, B.body)
  }
  jI(hn1, "writeRequestBody");

  function n82(A, B) {
    if (B instanceof i82.Readable) {
      B.pipe(A);
      return
    }
    if (B) {
      if (Buffer.isBuffer(B) || typeof B === "string") {
        A.end(B);
        return
      }
      let Q = B;
      if (typeof Q === "object" && Q.buffer && typeof Q.byteOffset === "number" && typeof Q.byteLength === "number") {
        A.end(Buffer.from(Q.buffer, Q.byteOffset, Q.byteLength));
        return
      }
      A.end(Buffer.from(B));
      return
    }
    A.end()
  }
  jI(n82, "writeBody");
  var $m6 = 0,
    a82 = class A {
      constructor(B) {
        this.socketWarningTimestamp = 0, this.metadata = {
          handlerProtocol: "http/1.1"
        }, this.configProvider = new Promise((Q, I) => {
          if (typeof B === "function") B().then((G) => {
            Q(this.resolveDefaultConfig(G))
          }).catch(I);
          else Q(this.resolveDefaultConfig(B))
        })
      }
      static create(B) {
        if (typeof(B == null ? void 0 : B.handle) === "function") return B;
        return new A(B)
      }
      static checkSocketUsage(B, Q) {
        var I, G;
        let {
          sockets: Z,
          requests: D,
          maxSockets: Y
        } = B;
        if (typeof Y !== "number" || Y === 1 / 0) return Q;
        let W = 15000;
        if (Date.now() - W < Q) return Q;
        if (Z && D)
          for (let J in Z) {
            let F = ((I = Z[J]) == null ? void 0 : I.length) ?? 0,
              X = ((G = D[J]) == null ? void 0 : G.length) ?? 0;
            if (F >= Y && X >= 2 * Y) return console.warn("@smithy/node-http-handler:WARN", `socket usage at capacity=${F} and ${X} additional requests are enqueued.`, "See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html", "or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config."), Date.now()
          }
        return Q
      }
      resolveDefaultConfig(B) {
        let {
          requestTimeout: Q,
          connectionTimeout: I,
          socketTimeout: G,
          httpAgent: Z,
          httpsAgent: D
        } = B || {}, Y = !0, W = 50;
        return {
          connectionTimeout: I,
          requestTimeout: Q ?? G,
          httpAgent: (() => {
            if (Z instanceof bn1.Agent || typeof(Z == null ? void 0 : Z.destroy) === "function") return Z;
            return new bn1.Agent({
              keepAlive: !0,
              maxSockets: 50,
              ...Z
            })
          })(),
          httpsAgent: (() => {
            if (D instanceof gn1.Agent || typeof(D == null ? void 0 : D.destroy) === "function") return D;
            return new gn1.Agent({
              keepAlive: !0,
              maxSockets: 50,
              ...D
            })
          })()
        }
      }
      destroy() {
        var B, Q, I, G;
        (Q = (B = this.config) == null ? void 0 : B.httpAgent) == null || Q.destroy(), (G = (I = this.config) == null ? void 0 : I.httpsAgent) == null || G.destroy()
      }
      async handle(B, {
        abortSignal: Q
      } = {}) {
        if (!this.config) this.config = await this.configProvider;
        let I;
        return new Promise((G, Z) => {
          let D = void 0,
            Y = jI(async (O) => {
              await D, clearTimeout(I), G(O)
            }, "resolve"),
            W = jI(async (O) => {
              await D, Z(O)
            }, "reject");
          if (!this.config) throw new Error("Node HTTP request handler config is not resolved");
          if (Q == null ? void 0 : Q.aborted) {
            let O = new Error("Request aborted");
            O.name = "AbortError", W(O);
            return
          }
          let J = B.protocol === "https:",
            F = J ? this.config.httpsAgent : this.config.httpAgent;
          I = setTimeout(() => {
            this.socketWarningTimestamp = A.checkSocketUsage(F, this.socketWarningTimestamp)
          }, this.config.socketAcquisitionWarningTimeout ?? (this.config.requestTimeout ?? 2000) + (this.config.connectionTimeout ?? 1000));
          let X = c82.buildQueryString(B.query || {}),
            V = void 0;
          if (B.username != null || B.password != null) {
            let O = B.username ?? "",
              R = B.password ?? "";
            V = `${O}:${R}`
          }
          let C = B.path;
          if (X) C += `?${X}`;
          if (B.fragment) C += `#${B.fragment}`;
          let K = {
              headers: B.headers,
              host: B.hostname,
              method: B.method,
              path: C,
              port: B.port,
              agent: F,
              auth: V
            },
            N = (J ? gn1.request : bn1.request)(K, (O) => {
              let R = new p82.HttpResponse({
                statusCode: O.statusCode || -1,
                reason: O.statusMessage,
                headers: l82(O.headers),
                body: O
              });
              Y({
                response: R
              })
            });
          if (N.on("error", (O) => {
              if (wm6.includes(O.code)) W(Object.assign(O, {
                name: "TimeoutError"
              }));
              else W(O)
            }), Em6(N, W, this.config.connectionTimeout), Nm6(N, W, this.config.requestTimeout), Q) Q.onabort = () => {
            N.abort();
            let O = new Error("Request aborted");
            O.name = "AbortError", W(O)
          };
          let q = K.agent;
          if (typeof q === "object" && "keepAlive" in q) Um6(N, {
            keepAlive: q.keepAlive,
            keepAliveMsecs: q.keepAliveMsecs
          });
          D = hn1(N, B, this.config.requestTimeout).catch(Z)
        })
      }
      updateHttpClientConfig(B, Q) {
        this.config = void 0, this.configProvider = this.configProvider.then((I) => {
          return {
            ...I,
            [B]: Q
          }
        })
      }
      httpHandlerConfigs() {
        return this.config ?? {}
      }
    };
  jI(a82, "NodeHttpHandler");
  var qm6 = a82,
    m82 = Z1("http2"),
    Mm6 = Hm6(Z1("http2")),
    s82 = class A {
      constructor(B) {
        this.sessions = [], this.sessions = B ?? []
      }
      poll() {
        if (this.sessions.length > 0) return this.sessions.shift()
      }
      offerLast(B) {
        this.sessions.push(B)
      }
      contains(B) {
        return this.sessions.includes(B)
      }
      remove(B) {
        this.sessions = this.sessions.filter((Q) => Q !== B)
      } [Symbol.iterator]() {
        return this.sessions[Symbol.iterator]()
      }
      destroy(B) {
        for (let Q of this.sessions)
          if (Q === B) {
            if (!Q.destroyed) Q.destroy()
          }
      }
    };
  jI(s82, "NodeHttp2ConnectionPool");
  var Lm6 = s82,
    r82 = class A {
      constructor(B) {
        if (this.sessionCache = new Map, this.config = B, this.config.maxConcurrency && this.config.maxConcurrency <= 0) throw new RangeError("maxConcurrency must be greater than zero.")
      }
      lease(B, Q) {
        let I = this.getUrlString(B),
          G = this.sessionCache.get(I);
        if (G) {
          let W = G.poll();
          if (W && !this.config.disableConcurrency) return W
        }
        let Z = Mm6.default.connect(I);
        if (this.config.maxConcurrency) Z.settings({
          maxConcurrentStreams: this.config.maxConcurrency
        }, (W) => {
          if (W) throw new Error("Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + B.destination.toString())
        });
        Z.unref();
        let D = jI(() => {
          Z.destroy(), this.deleteSession(I, Z)
        }, "destroySessionCb");
        if (Z.on("goaway", D), Z.on("error", D), Z.on("frameError", D), Z.on("close", () => this.deleteSession(I, Z)), Q.requestTimeout) Z.setTimeout(Q.requestTimeout, D);
        let Y = this.sessionCache.get(I) || new Lm6;
        return Y.offerLast(Z), this.sessionCache.set(I, Y), Z
      }
      deleteSession(B, Q) {
        let I = this.sessionCache.get(B);
        if (!I) return;
        if (!I.contains(Q)) return;
        I.remove(Q), this.sessionCache.set(B, I)
      }
      release(B, Q) {
        var I;
        let G = this.getUrlString(B);
        (I = this.sessionCache.get(G)) == null || I.offerLast(Q)
      }
      destroy() {
        for (let [B, Q] of this.sessionCache) {
          for (let I of Q) {
            if (!I.destroyed) I.destroy();
            Q.remove(I)
          }
          this.sessionCache.delete(B)
        }
      }
      setMaxConcurrentStreams(B) {
        if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) throw new RangeError("maxConcurrentStreams must be greater than zero.");
        this.config.maxConcurrency = B
      }
      setDisableConcurrentStreams(B) {
        this.config.disableConcurrency = B
      }
      getUrlString(B) {
        return B.destination.toString()
      }
    };
  jI(r82, "NodeHttp2ConnectionManager");
  var Rm6 = r82,
    o82 = class A {
      constructor(B) {
        this.metadata = {
          handlerProtocol: "h2"
        }, this.connectionManager = new Rm6({}), this.configProvider = new Promise((Q, I) => {
          if (typeof B === "function") B().then((G) => {
            Q(G || {})
          }).catch(I);
          else Q(B || {})
        })
      }
      static create(B) {
        if (typeof(B == null ? void 0 : B.handle) === "function") return B;
        return new A(B)
      }
      destroy() {
        this.connectionManager.destroy()
      }
      async handle(B, {
        abortSignal: Q
      } = {}) {
        if (!this.config) {
          if (this.config = await this.configProvider, this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || !1), this.config.maxConcurrentStreams) this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams)
        }
        let {
          requestTimeout: I,
          disableConcurrentStreams: G
        } = this.config;
        return new Promise((Z, D) => {
          var Y;
          let W = !1,
            J = void 0,
            F = jI(async (x) => {
              await J, Z(x)
            }, "resolve"),
            X = jI(async (x) => {
              await J, D(x)
            }, "reject");
          if (Q == null ? void 0 : Q.aborted) {
            W = !0;
            let x = new Error("Request aborted");
            x.name = "AbortError", X(x);
            return
          }
          let {
            hostname: V,
            method: C,
            port: K,
            protocol: E,
            query: N
          } = B, q = "";
          if (B.username != null || B.password != null) {
            let x = B.username ?? "",
              s = B.password ?? "";
            q = `${x}:${s}@`
          }
          let O = `${E}//${q}${V}${K?`:${K}`:""}`,
            R = {
              destination: new URL(O)
            },
            T = this.connectionManager.lease(R, {
              requestTimeout: (Y = this.config) == null ? void 0 : Y.sessionTimeout,
              disableConcurrentStreams: G || !1
            }),
            L = jI((x) => {
              if (G) this.destroySession(T);
              W = !0, X(x)
            }, "rejectWithDestroy"),
            _ = c82.buildQueryString(N || {}),
            k = B.path;
          if (_) k += `?${_}`;
          if (B.fragment) k += `#${B.fragment}`;
          let i = T.request({
            ...B.headers,
            [m82.constants.HTTP2_HEADER_PATH]: k,
            [m82.constants.HTTP2_HEADER_METHOD]: C
          });
          if (T.ref(), i.on("response", (x) => {
              let s = new p82.HttpResponse({
                statusCode: x[":status"] || -1,
                headers: l82(x),
                body: i
              });
              if (W = !0, F({
                  response: s
                }), G) T.close(), this.connectionManager.deleteSession(O, T)
            }), I) i.setTimeout(I, () => {
            i.close();
            let x = new Error(`Stream timed out because of no activity for ${I} ms`);
            x.name = "TimeoutError", L(x)
          });
          if (Q) Q.onabort = () => {
            i.close();
            let x = new Error("Request aborted");
            x.name = "AbortError", L(x)
          };
          i.on("frameError", (x, s, d) => {
            L(new Error(`Frame type id ${x} in stream id ${d} has failed with code ${s}.`))
          }), i.on("error", L), i.on("aborted", () => {
            L(new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${i.rstCode}.`))
          }), i.on("close", () => {
            if (T.unref(), G) T.destroy();
            if (!W) L(new Error("Unexpected error: http2 request did not get a response"))
          }), J = hn1(i, B, I)
        })
      }
      updateHttpClientConfig(B, Q) {
        this.config = void 0, this.configProvider = this.configProvider.then((I) => {
          return {
            ...I,
            [B]: Q
          }
        })
      }
      httpHandlerConfigs() {
        return this.config ?? {}
      }
      destroySession(B) {
        if (!B.destroyed) B.destroy()
      }
    };
  jI(o82, "NodeHttp2Handler");
  var Om6 = o82,
    t82 = class A extends i82.Writable {
      constructor() {
        super(...arguments);
        this.bufferedBytes = []
      }
      _write(B, Q, I) {
        this.bufferedBytes.push(B), I()
      }
    };
  jI(t82, "Collector");
  var Tm6 = t82,
    Pm6 = jI((A) => new Promise((B, Q) => {
      let I = new Tm6;
      A.pipe(I), A.on("error", (G) => {
        I.end(), Q(G)
      }), I.on("error", Q), I.on("finish", function() {
        let G = new Uint8Array(Buffer.concat(this.bufferedBytes));
        B(G)
      })
    }), "streamCollector")
})
// @from(Start 6059830, End 6061405)
GB2 = z((QB2) => {
  Object.defineProperty(QB2, "__esModule", {
    value: !0
  });
  QB2.sdkStreamMixin = void 0;
  var Sm6 = AB2(),
    _m6 = fn1(),
    mn1 = Z1("stream"),
    jm6 = Z1("util"),
    BB2 = "The stream has already been transformed.",
    ym6 = (A) => {
      var B, Q;
      if (!(A instanceof mn1.Readable)) {
        let Z = ((Q = (B = A === null || A === void 0 ? void 0 : A.__proto__) === null || B === void 0 ? void 0 : B.constructor) === null || Q === void 0 ? void 0 : Q.name) || A;
        throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${Z}`)
      }
      let I = !1,
        G = async () => {
          if (I) throw new Error(BB2);
          return I = !0, await Sm6.streamCollector(A)
        };
      return Object.assign(A, {
        transformToByteArray: G,
        transformToString: async (Z) => {
          let D = await G();
          if (Z === void 0 || Buffer.isEncoding(Z)) return _m6.fromArrayBuffer(D.buffer, D.byteOffset, D.byteLength).toString(Z);
          else return new jm6.TextDecoder(Z).decode(D)
        },
        transformToWebStream: () => {
          if (I) throw new Error(BB2);
          if (A.readableFlowing !== null) throw new Error("The stream has been consumed by other callbacks.");
          if (typeof mn1.Readable.toWeb !== "function") throw new Error("Readable.toWeb() is not supported. Please make sure you are using Node.js >= 17.0.0, or polyfill is available.");
          return I = !0, mn1.Readable.toWeb(A)
        }
      })
    };
  QB2.sdkStreamMixin = ym6
})
// @from(Start 6061411, End 6063177)
XB2 = z((Lh8, mX1) => {
  var {
    defineProperty: gX1,
    getOwnPropertyDescriptor: km6,
    getOwnPropertyNames: xm6
  } = Object, fm6 = Object.prototype.hasOwnProperty, pn1 = (A, B) => gX1(A, "name", {
    value: B,
    configurable: !0
  }), vm6 = (A, B) => {
    for (var Q in B) gX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, dn1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of xm6(B))
        if (!fm6.call(A, G) && G !== Q) gX1(A, G, {
          get: () => B[G],
          enumerable: !(I = km6(B, G)) || I.enumerable
        })
    }
    return A
  }, ZB2 = (A, B, Q) => (dn1(A, B, "default"), Q && dn1(Q, B, "default")), bm6 = (A) => dn1(gX1({}, "__esModule", {
    value: !0
  }), A), hX1 = {};
  vm6(hX1, {
    Uint8ArrayBlobAdapter: () => un1
  });
  mX1.exports = bm6(hX1);
  var DB2 = _X1(),
    YB2 = f82();

  function WB2(A, B = "utf-8") {
    if (B === "base64") return DB2.toBase64(A);
    return YB2.toUtf8(A)
  }
  pn1(WB2, "transformToString");

  function JB2(A, B) {
    if (B === "base64") return un1.mutate(DB2.fromBase64(A));
    return un1.mutate(YB2.fromUtf8(A))
  }
  pn1(JB2, "transformFromString");
  var FB2 = class A extends Uint8Array {
    static fromString(B, Q = "utf-8") {
      switch (typeof B) {
        case "string":
          return JB2(B, Q);
        default:
          throw new Error(`Unsupported conversion from ${typeof B} to Uint8ArrayBlobAdapter.`)
      }
    }
    static mutate(B) {
      return Object.setPrototypeOf(B, A.prototype), B
    }
    transformToString(B = "utf-8") {
      return WB2(this, B)
    }
  };
  pn1(FB2, "Uint8ArrayBlobAdapter");
  var un1 = FB2;
  ZB2(hX1, g82(), mX1.exports);
  ZB2(hX1, GB2(), mX1.exports)
})