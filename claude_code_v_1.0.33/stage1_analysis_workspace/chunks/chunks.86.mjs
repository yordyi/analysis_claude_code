
// @from(Start 8702369, End 8740716)
xt9 = (() => {
  var A = typeof document != "undefined" && document.currentScript ? document.currentScript.src : void 0;
  return function(B = {}) {
    W || (W = B !== void 0 ? B : {}), W.ready = new Promise(function(S1, T1) {
      J = S1, F = T1
    });
    var Q, I, G = Object.assign({}, W),
      Z = "";
    typeof document != "undefined" && document.currentScript && (Z = document.currentScript.src), A && (Z = A), Z = Z.indexOf("blob:") !== 0 ? Z.substr(0, Z.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
    var D = console.log.bind(console),
      Y = console.warn.bind(console);
    Object.assign(W, G), G = null, typeof WebAssembly != "object" && X1("no native wasm support detected");
    var W, J, F, X, V = !1;

    function C(S1, T1, VA) {
      VA = T1 + VA;
      for (var OA = ""; !(T1 >= VA);) {
        var KA = S1[T1++];
        if (!KA) break;
        if (128 & KA) {
          var PA = 63 & S1[T1++];
          if ((224 & KA) == 192) OA += String.fromCharCode((31 & KA) << 6 | PA);
          else {
            var D0 = 63 & S1[T1++];
            65536 > (KA = (240 & KA) == 224 ? (15 & KA) << 12 | PA << 6 | D0 : (7 & KA) << 18 | PA << 12 | D0 << 6 | 63 & S1[T1++]) ? OA += String.fromCharCode(KA) : (KA -= 65536, OA += String.fromCharCode(55296 | KA >> 10, 56320 | 1023 & KA))
          }
        } else OA += String.fromCharCode(KA)
      }
      return OA
    }

    function K() {
      var S1 = X.buffer;
      W.HEAP8 = E = new Int8Array(S1), W.HEAP16 = q = new Int16Array(S1), W.HEAP32 = R = new Int32Array(S1), W.HEAPU8 = N = new Uint8Array(S1), W.HEAPU16 = O = new Uint16Array(S1), W.HEAPU32 = T = new Uint32Array(S1), W.HEAPF32 = L = new Float32Array(S1), W.HEAPF64 = _ = new Float64Array(S1)
    }
    var E, N, q, O, R, T, L, _, k, i = [],
      x = [],
      s = [],
      d = 0,
      F1 = null;

    function X1(S1) {
      throw Y(S1 = "Aborted(" + S1 + ")"), V = !0, F(S1 = new WebAssembly.RuntimeError(S1 + ". Build with -sASSERTIONS for more info.")), S1
    }

    function v() {
      return Q.startsWith("data:application/octet-stream;base64,")
    }

    function D1() {
      try {
        throw "both async and sync fetching of the wasm failed"
      } catch (S1) {
        X1(S1)
      }
    }

    function N1(S1) {
      for (; 0 < S1.length;) S1.shift()(W)
    }

    function u1(S1) {
      if (S1 === void 0) return "_unknown";
      var T1 = (S1 = S1.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
      return 48 <= T1 && 57 >= T1 ? "_" + S1 : S1
    }

    function d1(S1, T1) {
      return S1 = u1(S1),
        function() {
          return T1.apply(this, arguments)
        }
    }
    Q = "yoga.wasm", v() || (Q = Z + Q);
    var YA = [{}, {
        value: void 0
      }, {
        value: null
      }, {
        value: !0
      }, {
        value: !1
      }],
      bA = [];

    function e1(S1) {
      var T1 = Error,
        VA = d1(S1, function(OA) {
          this.name = S1, this.message = OA, (OA = Error(OA).stack) !== void 0 && (this.stack = this.toString() + `
` + OA.replace(/^Error(:[^\n]*)?\n/, ""))
        });
      return VA.prototype = Object.create(T1.prototype), VA.prototype.constructor = VA, VA.prototype.toString = function() {
        return this.message === void 0 ? this.name : this.name + ": " + this.message
      }, VA
    }
    var k1 = void 0;

    function Q1(S1) {
      throw new k1(S1)
    }
    var v1 = (S1) => (S1 || Q1("Cannot use deleted val. handle = " + S1), YA[S1].value),
      L1 = (S1) => {
        switch (S1) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            var T1 = bA.length ? bA.pop() : YA.length;
            return YA[T1] = {
              fa: 1,
              value: S1
            }, T1
        }
      },
      BA = void 0,
      HA = void 0;

    function MA(S1) {
      for (var T1 = ""; N[S1];) T1 += HA[N[S1++]];
      return T1
    }
    var t = [];

    function B1() {
      for (; t.length;) {
        var S1 = t.pop();
        S1.L.Z = !1, S1.delete()
      }
    }
    var W1 = void 0,
      w1 = {};

    function P1(S1, T1) {
      for (T1 === void 0 && Q1("ptr should not be undefined"); S1.P;) T1 = S1.aa(T1), S1 = S1.P;
      return T1
    }
    var e = {};

    function y1(S1) {
      var T1 = MA(S1 = cQ(S1));
      return zB(S1), T1
    }

    function O1(S1, T1) {
      var VA = e[S1];
      return VA === void 0 && Q1(T1 + " has unknown type " + y1(S1)), VA
    }

    function h1() {}
    var o1 = !1;

    function QA(S1) {
      --S1.count.value, S1.count.value === 0 && (S1.S ? S1.T.V(S1.S) : S1.O.M.V(S1.N))
    }
    var zA = {},
      Y0 = void 0;

    function fA(S1) {
      throw new Y0(S1)
    }

    function H0(S1, T1) {
      return T1.O && T1.N || fA("makeClassHandle requires ptr and ptrType"), !!T1.T != !!T1.S && fA("Both smartPtrType and smartPtr must be specified"), T1.count = {
        value: 1
      }, k2(Object.create(S1, {
        L: {
          value: T1
        }
      }))
    }

    function k2(S1) {
      return typeof FinalizationRegistry == "undefined" ? (k2 = (T1) => T1, S1) : (o1 = new FinalizationRegistry((T1) => {
        QA(T1.L)
      }), k2 = (T1) => {
        var VA = T1.L;
        return VA.S && o1.register(T1, {
          L: VA
        }, T1), T1
      }, h1 = (T1) => {
        o1.unregister(T1)
      }, k2(S1))
    }
    var s0 = {};

    function q2(S1) {
      for (; S1.length;) {
        var T1 = S1.pop();
        S1.pop()(T1)
      }
    }

    function h2(S1) {
      return this.fromWireType(R[S1 >> 2])
    }
    var j9 = {},
      w6 = {};

    function E0(S1, T1, VA) {
      function OA(lA) {
        (lA = VA(lA)).length !== S1.length && fA("Mismatched type converter count");
        for (var NA = 0; NA < S1.length; ++NA) y0(S1[NA], lA[NA])
      }
      S1.forEach(function(lA) {
        w6[lA] = T1
      });
      var KA = Array(T1.length),
        PA = [],
        D0 = 0;
      T1.forEach((lA, NA) => {
        e.hasOwnProperty(lA) ? KA[NA] = e[lA] : (PA.push(lA), j9.hasOwnProperty(lA) || (j9[lA] = []), j9[lA].push(() => {
          KA[NA] = e[lA], ++D0 === PA.length && OA(KA)
        }))
      }), PA.length === 0 && OA(KA)
    }

    function g0(S1) {
      switch (S1) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw TypeError("Unknown type size: " + S1)
      }
    }

    function y0(S1, T1, VA = {}) {
      if (!("argPackAdvance" in T1)) throw TypeError("registerType registeredInstance requires argPackAdvance");
      var OA = T1.name;
      if (S1 || Q1('type "' + OA + '" must have a positive integer typeid pointer'), e.hasOwnProperty(S1)) {
        if (VA.ta) return;
        Q1("Cannot register type '" + OA + "' twice")
      }
      e[S1] = T1, delete w6[S1], j9.hasOwnProperty(S1) && (T1 = j9[S1], delete j9[S1], T1.forEach((KA) => KA()))
    }

    function T0(S1) {
      Q1(S1.L.O.M.name + " instance already deleted")
    }

    function V0() {}

    function N2(S1, T1, VA) {
      if (S1[T1].R === void 0) {
        var OA = S1[T1];
        S1[T1] = function() {
          return S1[T1].R.hasOwnProperty(arguments.length) || Q1("Function '" + VA + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + S1[T1].R + ")!"), S1[T1].R[arguments.length].apply(this, arguments)
        }, S1[T1].R = [], S1[T1].R[OA.Y] = OA
      }
    }

    function h9(S1, T1, VA, OA, KA, PA, D0, lA) {
      this.name = S1, this.constructor = T1, this.W = VA, this.V = OA, this.P = KA, this.oa = PA, this.aa = D0, this.ma = lA, this.ia = []
    }

    function z5(S1, T1, VA) {
      for (; T1 !== VA;) T1.aa || Q1("Expected null or instance of " + VA.name + ", got an instance of " + T1.name), S1 = T1.aa(S1), T1 = T1.P;
      return S1
    }

    function W3(S1, T1) {
      return T1 === null ? (this.da && Q1("null is not a valid " + this.name), 0) : (T1.L || Q1('Cannot pass "' + F3(T1) + '" as a ' + this.name), T1.L.N || Q1("Cannot pass deleted object as a pointer of type " + this.name), z5(T1.L.N, T1.L.O.M, this.M))
    }

    function Z6(S1, T1) {
      if (T1 === null) {
        if (this.da && Q1("null is not a valid " + this.name), this.ca) {
          var VA = this.ea();
          return S1 !== null && S1.push(this.V, VA), VA
        }
        return 0
      }
      if (T1.L || Q1('Cannot pass "' + F3(T1) + '" as a ' + this.name), T1.L.N || Q1("Cannot pass deleted object as a pointer of type " + this.name), !this.ba && T1.L.O.ba && Q1("Cannot convert argument of type " + (T1.L.T ? T1.L.T.name : T1.L.O.name) + " to parameter type " + this.name), VA = z5(T1.L.N, T1.L.O.M, this.M), this.ca) switch (T1.L.S === void 0 && Q1("Passing raw pointer to smart pointer is illegal"), this.Aa) {
        case 0:
          T1.L.T === this ? VA = T1.L.S : Q1("Cannot convert argument of type " + (T1.L.T ? T1.L.T.name : T1.L.O.name) + " to parameter type " + this.name);
          break;
        case 1:
          VA = T1.L.S;
          break;
        case 2:
          if (T1.L.T === this) VA = T1.L.S;
          else {
            var OA = T1.clone();
            VA = this.wa(VA, L1(function() {
              OA.delete()
            })), S1 !== null && S1.push(this.V, VA)
          }
          break;
        default:
          Q1("Unsupporting sharing policy")
      }
      return VA
    }

    function r2(S1, T1) {
      return T1 === null ? (this.da && Q1("null is not a valid " + this.name), 0) : (T1.L || Q1('Cannot pass "' + F3(T1) + '" as a ' + this.name), T1.L.N || Q1("Cannot pass deleted object as a pointer of type " + this.name), T1.L.O.ba && Q1("Cannot convert argument of type " + T1.L.O.name + " to parameter type " + this.name), z5(T1.L.N, T1.L.O.M, this.M))
    }

    function v6(S1, T1, VA, OA) {
      this.name = S1, this.M = T1, this.da = VA, this.ba = OA, this.ca = !1, this.V = this.wa = this.ea = this.ja = this.Aa = this.va = void 0, T1.P !== void 0 ? this.toWireType = Z6 : (this.toWireType = OA ? W3 : r2, this.U = null)
    }
    var J3 = [];

    function uQ(S1) {
      var T1 = J3[S1];
      return T1 || (S1 >= J3.length && (J3.length = S1 + 1), J3[S1] = T1 = k.get(S1)), T1
    }

    function x0(S1, T1) {
      var VA, OA, KA = (S1 = MA(S1)).includes("j") ? (VA = S1, OA = [], function() {
        if (OA.length = 0, Object.assign(OA, arguments), VA.includes("j")) {
          var PA = W["dynCall_" + VA];
          PA = OA && OA.length ? PA.apply(null, [T1].concat(OA)) : PA.call(null, T1)
        } else PA = uQ(T1).apply(null, OA);
        return PA
      }) : uQ(T1);
      return typeof KA != "function" && Q1("unknown function pointer with signature " + S1 + ": " + T1), KA
    }
    var d0 = void 0;

    function L9(S1, T1) {
      var VA = [],
        OA = {};
      throw T1.forEach(function KA(PA) {
        OA[PA] || e[PA] || (w6[PA] ? w6[PA].forEach(KA) : (VA.push(PA), OA[PA] = !0))
      }), new d0(S1 + ": " + VA.map(y1).join([", "]))
    }

    function w5(S1, T1, VA, OA, KA) {
      var PA = T1.length;
      2 > PA && Q1("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var D0 = T1[1] !== null && VA !== null,
        lA = !1;
      for (VA = 1; VA < T1.length; ++VA)
        if (T1[VA] !== null && T1[VA].U === void 0) {
          lA = !0;
          break
        } var NA = T1[0].name !== "void",
        SA = PA - 2,
        uA = Array(SA),
        W2 = [],
        c0 = [];
      return function() {
        if (arguments.length !== SA && Q1("function " + S1 + " called with " + arguments.length + " arguments, expected " + SA + " args!"), c0.length = 0, W2.length = D0 ? 2 : 1, W2[0] = KA, D0) {
          var z2 = T1[1].toWireType(c0, this);
          W2[1] = z2
        }
        for (var V1 = 0; V1 < SA; ++V1) uA[V1] = T1[V1 + 2].toWireType(c0, arguments[V1]), W2.push(uA[V1]);
        if (V1 = OA.apply(null, W2), lA) q2(c0);
        else
          for (var c1 = D0 ? 1 : 2; c1 < T1.length; c1++) {
            var _1 = c1 === 1 ? z2 : uA[c1 - 2];
            T1[c1].U !== null && T1[c1].U(_1)
          }
        return NA ? T1[0].fromWireType(V1) : void 0
      }
    }

    function _B(S1, T1) {
      for (var VA = [], OA = 0; OA < S1; OA++) VA.push(T[T1 + 4 * OA >> 2]);
      return VA
    }

    function D6(S1) {
      4 < S1 && --YA[S1].fa == 0 && (YA[S1] = void 0, bA.push(S1))
    }

    function F3(S1) {
      if (S1 === null) return "null";
      var T1 = typeof S1;
      return T1 === "object" || T1 === "array" || T1 === "function" ? S1.toString() : "" + S1
    }

    function X3(S1, T1) {
      for (var VA = "", OA = 0; !(OA >= T1 / 2); ++OA) {
        var KA = q[S1 + 2 * OA >> 1];
        if (KA == 0) break;
        VA += String.fromCharCode(KA)
      }
      return VA
    }

    function q7(S1, T1, VA) {
      if (VA === void 0 && (VA = 2147483647), 2 > VA) return 0;
      VA -= 2;
      var OA = T1;
      VA = VA < 2 * S1.length ? VA / 2 : S1.length;
      for (var KA = 0; KA < VA; ++KA) q[T1 >> 1] = S1.charCodeAt(KA), T1 += 2;
      return q[T1 >> 1] = 0, T1 - OA
    }

    function V3(S1) {
      return 2 * S1.length
    }

    function H2(S1, T1) {
      for (var VA = 0, OA = ""; !(VA >= T1 / 4);) {
        var KA = R[S1 + 4 * VA >> 2];
        if (KA == 0) break;
        ++VA, 65536 <= KA ? (KA -= 65536, OA += String.fromCharCode(55296 | KA >> 10, 56320 | 1023 & KA)) : OA += String.fromCharCode(KA)
      }
      return OA
    }

    function w9(S1, T1, VA) {
      if (VA === void 0 && (VA = 2147483647), 4 > VA) return 0;
      var OA = T1;
      VA = OA + VA - 4;
      for (var KA = 0; KA < S1.length; ++KA) {
        var PA = S1.charCodeAt(KA);
        if (55296 <= PA && 57343 >= PA && (PA = 65536 + ((1023 & PA) << 10) | 1023 & S1.charCodeAt(++KA)), R[T1 >> 2] = PA, (T1 += 4) + 4 > VA) break
      }
      return R[T1 >> 2] = 0, T1 - OA
    }

    function j5(S1) {
      for (var T1 = 0, VA = 0; VA < S1.length; ++VA) {
        var OA = S1.charCodeAt(VA);
        55296 <= OA && 57343 >= OA && ++VA, T1 += 4
      }
      return T1
    }
    var j8 = {};

    function y3(S1) {
      var T1 = j8[S1];
      return T1 === void 0 ? MA(S1) : T1
    }
    var WQ = [],
      nI = [],
      AD = [null, [],
        []
      ];
    k1 = W.BindingError = e1("BindingError"), W.count_emval_handles = function() {
      for (var S1 = 0, T1 = 5; T1 < YA.length; ++T1) YA[T1] !== void 0 && ++S1;
      return S1
    }, W.get_first_emval = function() {
      for (var S1 = 5; S1 < YA.length; ++S1)
        if (YA[S1] !== void 0) return YA[S1];
      return null
    }, BA = W.PureVirtualError = e1("PureVirtualError");
    for (var aI = Array(256), pQ = 0; 256 > pQ; ++pQ) aI[pQ] = String.fromCharCode(pQ);
    HA = aI, W.getInheritedInstanceCount = function() {
      return Object.keys(w1).length
    }, W.getLiveInheritedInstances = function() {
      var S1, T1 = [];
      for (S1 in w1) w1.hasOwnProperty(S1) && T1.push(w1[S1]);
      return T1
    }, W.flushPendingDeletes = B1, W.setDelayFunction = function(S1) {
      W1 = S1, t.length && W1 && W1(B1)
    }, Y0 = W.InternalError = e1("InternalError"), V0.prototype.isAliasOf = function(S1) {
      if (!(this instanceof V0 && S1 instanceof V0)) return !1;
      var T1 = this.L.O.M,
        VA = this.L.N,
        OA = S1.L.O.M;
      for (S1 = S1.L.N; T1.P;) VA = T1.aa(VA), T1 = T1.P;
      for (; OA.P;) S1 = OA.aa(S1), OA = OA.P;
      return T1 === OA && VA === S1
    }, V0.prototype.clone = function() {
      if (this.L.N || T0(this), this.L.$) return this.L.count.value += 1, this;
      var S1 = k2,
        T1 = Object,
        VA = T1.create,
        OA = Object.getPrototypeOf(this),
        KA = this.L;
      return S1 = S1(VA.call(T1, OA, {
        L: {
          value: {
            count: KA.count,
            Z: KA.Z,
            $: KA.$,
            N: KA.N,
            O: KA.O,
            S: KA.S,
            T: KA.T
          }
        }
      })), S1.L.count.value += 1, S1.L.Z = !1, S1
    }, V0.prototype.delete = function() {
      this.L.N || T0(this), this.L.Z && !this.L.$ && Q1("Object already scheduled for deletion"), h1(this), QA(this.L), this.L.$ || (this.L.S = void 0, this.L.N = void 0)
    }, V0.prototype.isDeleted = function() {
      return !this.L.N
    }, V0.prototype.deleteLater = function() {
      return this.L.N || T0(this), this.L.Z && !this.L.$ && Q1("Object already scheduled for deletion"), t.push(this), t.length === 1 && W1 && W1(B1), this.L.Z = !0, this
    }, v6.prototype.pa = function(S1) {
      return this.ja && (S1 = this.ja(S1)), S1
    }, v6.prototype.ga = function(S1) {
      this.V && this.V(S1)
    }, v6.prototype.argPackAdvance = 8, v6.prototype.readValueFromPointer = h2, v6.prototype.deleteObject = function(S1) {
      S1 !== null && S1.delete()
    }, v6.prototype.fromWireType = function(S1) {
      function T1() {
        return this.ca ? H0(this.M.W, {
          O: this.va,
          N: OA,
          T: this,
          S: S1
        }) : H0(this.M.W, {
          O: this,
          N: S1
        })
      }
      var VA, OA = this.pa(S1);
      if (!OA) return this.ga(S1), null;
      var KA = w1[P1(this.M, OA)];
      if (KA !== void 0) return KA.L.count.value === 0 ? (KA.L.N = OA, KA.L.S = S1, KA.clone()) : (KA = KA.clone(), this.ga(S1), KA);
      if (!(KA = zA[KA = this.M.oa(OA)])) return T1.call(this);
      KA = this.ba ? KA.ka : KA.pointerType;
      var PA = function D0(lA, NA, SA) {
        return NA === SA ? lA : SA.P === void 0 ? null : (lA = D0(lA, NA, SA.P)) === null ? null : SA.ma(lA)
      }(OA, this.M, KA.M);
      return PA === null ? T1.call(this) : this.ca ? H0(KA.M.W, {
        O: KA,
        N: PA,
        T: this,
        S: S1
      }) : H0(KA.M.W, {
        O: KA,
        N: PA
      })
    }, d0 = W.UnboundTypeError = e1("UnboundTypeError");
    var BD = {
      q: function(S1, T1, VA) {
        S1 = MA(S1), T1 = O1(T1, "wrapper"), VA = v1(VA);
        var OA = [].slice,
          KA = T1.M,
          PA = KA.W,
          D0 = KA.P.W,
          lA = KA.P.constructor;
        for (var NA in S1 = d1(S1, function() {
            KA.P.ia.forEach(function(SA) {
              if (this[SA] === D0[SA]) throw new BA("Pure virtual function " + SA + " must be implemented in JavaScript")
            }.bind(this)), Object.defineProperty(this, "__parent", {
              value: PA
            }), this.__construct.apply(this, OA.call(arguments))
          }), PA.__construct = function() {
            this === PA && Q1("Pass correct 'this' to __construct");
            var SA = lA.implement.apply(void 0, [this].concat(OA.call(arguments)));
            h1(SA);
            var uA = SA.L;
            SA.notifyOnDestruction(), uA.$ = !0, Object.defineProperties(this, {
              L: {
                value: uA
              }
            }), k2(this), SA = P1(KA, SA = uA.N), w1.hasOwnProperty(SA) ? Q1("Tried to register registered instance: " + SA) : w1[SA] = this
          }, PA.__destruct = function() {
            this === PA && Q1("Pass correct 'this' to __destruct"), h1(this);
            var SA = this.L.N;
            SA = P1(KA, SA), w1.hasOwnProperty(SA) ? delete w1[SA] : Q1("Tried to unregister unregistered instance: " + SA)
          }, S1.prototype = Object.create(PA), VA) S1.prototype[NA] = VA[NA];
        return L1(S1)
      },
      l: function(S1) {
        var T1 = s0[S1];
        delete s0[S1];
        var {
          ea: VA,
          V: OA,
          ha: KA
        } = T1;
        E0([S1], KA.map((PA) => PA.sa).concat(KA.map((PA) => PA.ya)), (PA) => {
          var D0 = {};
          return KA.forEach((lA, NA) => {
            var SA = PA[NA],
              uA = lA.qa,
              W2 = lA.ra,
              c0 = PA[NA + KA.length],
              z2 = lA.xa,
              V1 = lA.za;
            D0[lA.na] = {
              read: (c1) => SA.fromWireType(uA(W2, c1)),
              write: (c1, _1) => {
                var t1 = [];
                z2(V1, c1, c0.toWireType(t1, _1)), q2(t1)
              }
            }
          }), [{
            name: T1.name,
            fromWireType: function(lA) {
              var NA, SA = {};
              for (NA in D0) SA[NA] = D0[NA].read(lA);
              return OA(lA), SA
            },
            toWireType: function(lA, NA) {
              for (var SA in D0)
                if (!(SA in NA)) throw TypeError('Missing field:  "' + SA + '"');
              var uA = VA();
              for (SA in D0) D0[SA].write(uA, NA[SA]);
              return lA !== null && lA.push(OA, uA), uA
            },
            argPackAdvance: 8,
            readValueFromPointer: h2,
            U: OA
          }]
        })
      },
      v: function() {},
      B: function(S1, T1, VA, OA, KA) {
        var PA = g0(VA);
        y0(S1, {
          name: T1 = MA(T1),
          fromWireType: function(D0) {
            return !!D0
          },
          toWireType: function(D0, lA) {
            return lA ? OA : KA
          },
          argPackAdvance: 8,
          readValueFromPointer: function(D0) {
            if (VA === 1) var lA = E;
            else if (VA === 2) lA = q;
            else if (VA === 4) lA = R;
            else throw TypeError("Unknown boolean type size: " + T1);
            return this.fromWireType(lA[D0 >> PA])
          },
          U: null
        })
      },
      h: function(S1, T1, VA, OA, KA, PA, D0, lA, NA, SA, uA, W2, c0) {
        uA = MA(uA), PA = x0(KA, PA), lA && (lA = x0(D0, lA)), SA && (SA = x0(NA, SA)), c0 = x0(W2, c0);
        var z2, V1 = u1(uA);
        z2 = function() {
          L9("Cannot construct " + uA + " due to unbound types", [OA])
        }, W.hasOwnProperty(V1) ? (Q1("Cannot register public name '" + V1 + "' twice"), N2(W, V1, V1), W.hasOwnProperty(void 0) && Q1("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), W[V1].R[void 0] = z2) : W[V1] = z2, E0([S1, T1, VA], OA ? [OA] : [], function(c1) {
          if (c1 = c1[0], OA) var _1, t1 = c1.M,
            DA = t1.W;
          else DA = V0.prototype;
          c1 = d1(V1, function() {
            if (Object.getPrototypeOf(this) !== IA) throw new k1("Use 'new' to construct " + uA);
            if (xA.X === void 0) throw new k1(uA + " has no accessible constructor");
            var sA = xA.X[arguments.length];
            if (sA === void 0) throw new k1("Tried to invoke ctor of " + uA + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(xA.X).toString() + ") parameters instead!");
            return sA.apply(this, arguments)
          });
          var IA = Object.create(DA, {
            constructor: {
              value: c1
            }
          });
          c1.prototype = IA;
          var xA = new h9(uA, c1, IA, c0, t1, PA, lA, SA);
          t1 = new v6(uA, xA, !0, !1), DA = new v6(uA + "*", xA, !1, !1);
          var oA = new v6(uA + " const*", xA, !1, !0);
          return zA[S1] = {
            pointerType: DA,
            ka: oA
          }, _1 = c1, W.hasOwnProperty(V1) || fA("Replacing nonexistant public symbol"), W[V1] = _1, W[V1].Y = void 0, [t1, DA, oA]
        })
      },
      d: function(S1, T1, VA, OA, KA, PA, D0) {
        var lA = _B(VA, OA);
        T1 = MA(T1), PA = x0(KA, PA), E0([], [S1], function(NA) {
          function SA() {
            L9("Cannot call " + uA + " due to unbound types", lA)
          }
          var uA = (NA = NA[0]).name + "." + T1;
          T1.startsWith("@@") && (T1 = Symbol[T1.substring(2)]);
          var W2 = NA.M.constructor;
          return W2[T1] === void 0 ? (SA.Y = VA - 1, W2[T1] = SA) : (N2(W2, T1, uA), W2[T1].R[VA - 1] = SA), E0([], lA, function(c0) {
            return c0 = w5(uA, [c0[0], null].concat(c0.slice(1)), null, PA, D0), W2[T1].R === void 0 ? (c0.Y = VA - 1, W2[T1] = c0) : W2[T1].R[VA - 1] = c0, []
          }), []
        })
      },
      p: function(S1, T1, VA, OA, KA, PA) {
        0 < T1 || X1();
        var D0 = _B(T1, VA);
        KA = x0(OA, KA), E0([], [S1], function(lA) {
          var NA = "constructor " + (lA = lA[0]).name;
          if (lA.M.X === void 0 && (lA.M.X = []), lA.M.X[T1 - 1] !== void 0) throw new k1("Cannot register multiple constructors with identical number of parameters (" + (T1 - 1) + ") for class '" + lA.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
          return lA.M.X[T1 - 1] = () => {
            L9("Cannot construct " + lA.name + " due to unbound types", D0)
          }, E0([], D0, function(SA) {
            return SA.splice(1, 0, null), lA.M.X[T1 - 1] = w5(NA, SA, null, KA, PA), []
          }), []
        })
      },
      a: function(S1, T1, VA, OA, KA, PA, D0, lA) {
        var NA = _B(VA, OA);
        T1 = MA(T1), PA = x0(KA, PA), E0([], [S1], function(SA) {
          function uA() {
            L9("Cannot call " + W2 + " due to unbound types", NA)
          }
          var W2 = (SA = SA[0]).name + "." + T1;
          T1.startsWith("@@") && (T1 = Symbol[T1.substring(2)]), lA && SA.M.ia.push(T1);
          var c0 = SA.M.W,
            z2 = c0[T1];
          return z2 === void 0 || z2.R === void 0 && z2.className !== SA.name && z2.Y === VA - 2 ? (uA.Y = VA - 2, uA.className = SA.name, c0[T1] = uA) : (N2(c0, T1, W2), c0[T1].R[VA - 2] = uA), E0([], NA, function(V1) {
            return V1 = w5(W2, V1, SA, PA, D0), c0[T1].R === void 0 ? (V1.Y = VA - 2, c0[T1] = V1) : c0[T1].R[VA - 2] = V1, []
          }), []
        })
      },
      A: function(S1, T1) {
        y0(S1, {
          name: T1 = MA(T1),
          fromWireType: function(VA) {
            var OA = v1(VA);
            return D6(VA), OA
          },
          toWireType: function(VA, OA) {
            return L1(OA)
          },
          argPackAdvance: 8,
          readValueFromPointer: h2,
          U: null
        })
      },
      n: function(S1, T1, VA) {
        VA = g0(VA), y0(S1, {
          name: T1 = MA(T1),
          fromWireType: function(OA) {
            return OA
          },
          toWireType: function(OA, KA) {
            return KA
          },
          argPackAdvance: 8,
          readValueFromPointer: function(OA, KA) {
            switch (KA) {
              case 2:
                return function(PA) {
                  return this.fromWireType(L[PA >> 2])
                };
              case 3:
                return function(PA) {
                  return this.fromWireType(_[PA >> 3])
                };
              default:
                throw TypeError("Unknown float type: " + OA)
            }
          }(T1, VA),
          U: null
        })
      },
      e: function(S1, T1, VA, OA, KA) {
        T1 = MA(T1), KA === -1 && (KA = 4294967295), KA = g0(VA);
        var PA = (lA) => lA;
        if (OA === 0) {
          var D0 = 32 - 8 * VA;
          PA = (lA) => lA << D0 >>> D0
        }
        VA = T1.includes("unsigned") ? function(lA, NA) {
          return NA >>> 0
        } : function(lA, NA) {
          return NA
        }, y0(S1, {
          name: T1,
          fromWireType: PA,
          toWireType: VA,
          argPackAdvance: 8,
          readValueFromPointer: function(lA, NA, SA) {
            switch (NA) {
              case 0:
                return SA ? function(uA) {
                  return E[uA]
                } : function(uA) {
                  return N[uA]
                };
              case 1:
                return SA ? function(uA) {
                  return q[uA >> 1]
                } : function(uA) {
                  return O[uA >> 1]
                };
              case 2:
                return SA ? function(uA) {
                  return R[uA >> 2]
                } : function(uA) {
                  return T[uA >> 2]
                };
              default:
                throw TypeError("Unknown integer type: " + lA)
            }
          }(T1, KA, OA !== 0),
          U: null
        })
      },
      b: function(S1, T1, VA) {
        function OA(PA) {
          PA >>= 2;
          var D0 = T;
          return new KA(D0.buffer, D0[PA + 1], D0[PA])
        }
        var KA = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][T1];
        y0(S1, {
          name: VA = MA(VA),
          fromWireType: OA,
          argPackAdvance: 8,
          readValueFromPointer: OA
        }, {
          ta: !0
        })
      },
      o: function(S1, T1) {
        var VA = (T1 = MA(T1)) === "std::string";
        y0(S1, {
          name: T1,
          fromWireType: function(OA) {
            var KA = T[OA >> 2],
              PA = OA + 4;
            if (VA)
              for (var D0 = PA, lA = 0; lA <= KA; ++lA) {
                var NA = PA + lA;
                if (lA == KA || N[NA] == 0) {
                  if (D0 = D0 ? C(N, D0, NA - D0) : "", SA === void 0) var SA = D0;
                  else SA += "\x00" + D0;
                  D0 = NA + 1
                }
              } else {
                for (lA = 0, SA = Array(KA); lA < KA; ++lA) SA[lA] = String.fromCharCode(N[PA + lA]);
                SA = SA.join("")
              }
            return zB(OA), SA
          },
          toWireType: function(OA, KA) {
            KA instanceof ArrayBuffer && (KA = new Uint8Array(KA));
            var PA, D0 = typeof KA == "string";
            if (D0 || KA instanceof Uint8Array || KA instanceof Uint8ClampedArray || KA instanceof Int8Array || Q1("Cannot pass non-string to std::string"), VA && D0) {
              var lA = 0;
              for (PA = 0; PA < KA.length; ++PA) {
                var NA = KA.charCodeAt(PA);
                127 >= NA ? lA++ : 2047 >= NA ? lA += 2 : 55296 <= NA && 57343 >= NA ? (lA += 4, ++PA) : lA += 3
              }
              PA = lA
            } else PA = KA.length;
            if (NA = (lA = rG(4 + PA + 1)) + 4, T[lA >> 2] = PA, VA && D0) {
              if (D0 = NA, NA = PA + 1, PA = N, 0 < NA) {
                NA = D0 + NA - 1;
                for (var SA = 0; SA < KA.length; ++SA) {
                  var uA = KA.charCodeAt(SA);
                  if (55296 <= uA && 57343 >= uA && (uA = 65536 + ((1023 & uA) << 10) | 1023 & KA.charCodeAt(++SA)), 127 >= uA) {
                    if (D0 >= NA) break;
                    PA[D0++] = uA
                  } else {
                    if (2047 >= uA) {
                      if (D0 + 1 >= NA) break;
                      PA[D0++] = 192 | uA >> 6
                    } else {
                      if (65535 >= uA) {
                        if (D0 + 2 >= NA) break;
                        PA[D0++] = 224 | uA >> 12
                      } else {
                        if (D0 + 3 >= NA) break;
                        PA[D0++] = 240 | uA >> 18, PA[D0++] = 128 | uA >> 12 & 63
                      }
                      PA[D0++] = 128 | uA >> 6 & 63
                    }
                    PA[D0++] = 128 | 63 & uA
                  }
                }
                PA[D0] = 0
              }
            } else if (D0)
              for (D0 = 0; D0 < PA; ++D0) 255 < (SA = KA.charCodeAt(D0)) && (zB(NA), Q1("String has UTF-16 code units that do not fit in 8 bits")), N[NA + D0] = SA;
            else
              for (D0 = 0; D0 < PA; ++D0) N[NA + D0] = KA[D0];
            return OA !== null && OA.push(zB, lA), lA
          },
          argPackAdvance: 8,
          readValueFromPointer: h2,
          U: function(OA) {
            zB(OA)
          }
        })
      },
      k: function(S1, T1, VA) {
        if (VA = MA(VA), T1 === 2) var OA = X3,
          KA = q7,
          PA = V3,
          D0 = () => O,
          lA = 1;
        else T1 === 4 && (OA = H2, KA = w9, PA = j5, D0 = () => T, lA = 2);
        y0(S1, {
          name: VA,
          fromWireType: function(NA) {
            for (var SA, uA = T[NA >> 2], W2 = D0(), c0 = NA + 4, z2 = 0; z2 <= uA; ++z2) {
              var V1 = NA + 4 + z2 * T1;
              (z2 == uA || W2[V1 >> lA] == 0) && (c0 = OA(c0, V1 - c0), SA === void 0 ? SA = c0 : SA += "\x00" + c0, c0 = V1 + T1)
            }
            return zB(NA), SA
          },
          toWireType: function(NA, SA) {
            typeof SA != "string" && Q1("Cannot pass non-string to C++ string type " + VA);
            var uA = PA(SA),
              W2 = rG(4 + uA + T1);
            return T[W2 >> 2] = uA >> lA, KA(SA, W2 + 4, uA + T1), NA !== null && NA.push(zB, W2), W2
          },
          argPackAdvance: 8,
          readValueFromPointer: h2,
          U: function(NA) {
            zB(NA)
          }
        })
      },
      m: function(S1, T1, VA, OA, KA, PA) {
        s0[S1] = {
          name: MA(T1),
          ea: x0(VA, OA),
          V: x0(KA, PA),
          ha: []
        }
      },
      c: function(S1, T1, VA, OA, KA, PA, D0, lA, NA, SA) {
        s0[S1].ha.push({
          na: MA(T1),
          sa: VA,
          qa: x0(OA, KA),
          ra: PA,
          ya: D0,
          xa: x0(lA, NA),
          za: SA
        })
      },
      C: function(S1, T1) {
        y0(S1, {
          ua: !0,
          name: T1 = MA(T1),
          argPackAdvance: 0,
          fromWireType: function() {},
          toWireType: function() {}
        })
      },
      t: function(S1, T1, VA, OA, KA) {
        S1 = WQ[S1], T1 = v1(T1), VA = y3(VA);
        var PA = [];
        return T[OA >> 2] = L1(PA), S1(T1, VA, PA, KA)
      },
      j: function(S1, T1, VA, OA) {
        S1 = WQ[S1], S1(T1 = v1(T1), VA = y3(VA), null, OA)
      },
      f: D6,
      g: function(S1, T1) {
        var VA, OA, KA = function(NA, SA) {
            for (var uA = Array(NA), W2 = 0; W2 < NA; ++W2) uA[W2] = O1(T[SA + 4 * W2 >> 2], "parameter " + W2);
            return uA
          }(S1, T1),
          PA = KA[0],
          D0 = nI[T1 = PA.name + "_$" + KA.slice(1).map(function(NA) {
            return NA.name
          }).join("_") + "$"];
        if (D0 !== void 0) return D0;
        var lA = Array(S1 - 1);
        return VA = (NA, SA, uA, W2) => {
          for (var c0 = 0, z2 = 0; z2 < S1 - 1; ++z2) lA[z2] = KA[z2 + 1].readValueFromPointer(W2 + c0), c0 += KA[z2 + 1].argPackAdvance;
          for (z2 = 0, NA = NA[SA].apply(NA, lA); z2 < S1 - 1; ++z2) KA[z2 + 1].la && KA[z2 + 1].la(lA[z2]);
          if (!PA.ua) return PA.toWireType(uA, NA)
        }, OA = WQ.length, WQ.push(VA), D0 = OA, nI[T1] = D0
      },
      r: function(S1) {
        4 < S1 && (YA[S1].fa += 1)
      },
      s: function(S1) {
        q2(v1(S1)), D6(S1)
      },
      i: function() {
        X1("")
      },
      x: function(S1, T1, VA) {
        N.copyWithin(S1, T1, T1 + VA)
      },
      w: function(S1) {
        var T1 = N.length;
        if (2147483648 < (S1 >>>= 0)) return !1;
        for (var VA = 1; 4 >= VA; VA *= 2) {
          var OA = T1 * (1 + 0.2 / VA);
          OA = Math.min(OA, S1 + 100663296);
          var KA = Math,
            PA = KA.min;
          OA = Math.max(S1, OA), OA += (65536 - OA % 65536) % 65536;
          A: {
            var D0 = X.buffer;
            try {
              X.grow(PA.call(KA, 2147483648, OA) - D0.byteLength + 65535 >>> 16), K();
              var lA = 1;
              break A
            } catch (NA) {}
            lA = void 0
          }
          if (lA) return !0
        }
        return !1
      },
      z: function() {
        return 52
      },
      u: function() {
        return 70
      },
      y: function(S1, T1, VA, OA) {
        for (var KA = 0, PA = 0; PA < VA; PA++) {
          var D0 = T[T1 >> 2],
            lA = T[T1 + 4 >> 2];
          T1 += 8;
          for (var NA = 0; NA < lA; NA++) {
            var SA = N[D0 + NA],
              uA = AD[S1];
            SA === 0 || SA === 10 ? ((S1 === 1 ? D : Y)(C(uA, 0)), uA.length = 0) : uA.push(SA)
          }
          KA += lA
        }
        return T[OA >> 2] = KA, 0
      }
    };
    (function() {
      function S1(KA) {
        W.asm = KA.exports, X = W.asm.D, K(), k = W.asm.I, x.unshift(W.asm.E), --d == 0 && F1 && (KA = F1, F1 = null, KA())
      }

      function T1(KA) {
        S1(KA.instance)
      }

      function VA(KA) {
        return (typeof fetch == "function" ? fetch(Q, {
          credentials: "same-origin"
        }).then(function(PA) {
          if (!PA.ok) throw "failed to load wasm binary file at '" + Q + "'";
          return PA.arrayBuffer()
        }).catch(function() {
          return D1()
        }) : Promise.resolve().then(function() {
          return D1()
        })).then(function(PA) {
          return WebAssembly.instantiate(PA, OA)
        }).then(function(PA) {
          return PA
        }).then(KA, function(PA) {
          Y("failed to asynchronously prepare wasm: " + PA), X1(PA)
        })
      }
      var OA = {
        a: BD
      };
      if (d++, W.instantiateWasm) try {
        return W.instantiateWasm(OA, S1)
      } catch (KA) {
        Y("Module.instantiateWasm callback failed with error: " + KA), F(KA)
      }(typeof WebAssembly.instantiateStreaming != "function" || v() || typeof fetch != "function" ? VA(T1) : fetch(Q, {
        credentials: "same-origin"
      }).then(function(KA) {
        return WebAssembly.instantiateStreaming(KA, OA).then(T1, function(PA) {
          return Y("wasm streaming compile failed: " + PA), Y("falling back to ArrayBuffer instantiation"), VA(T1)
        })
      })).catch(F)
    })();
    var cQ = W.___getTypeName = function() {
      return (cQ = W.___getTypeName = W.asm.F).apply(null, arguments)
    };

    function rG() {
      return (rG = W.asm.H).apply(null, arguments)
    }

    function zB() {
      return (zB = W.asm.J).apply(null, arguments)
    }

    function e7() {
      0 < d || (N1(i), 0 < d || I || (I = !0, W.calledRun = !0, V || (N1(x), J(W), N1(s))))
    }
    return W.__embind_initialize_bindings = function() {
      return (W.__embind_initialize_bindings = W.asm.G).apply(null, arguments)
    }, W.dynCall_jiji = function() {
      return (W.dynCall_jiji = W.asm.K).apply(null, arguments)
    }, F1 = function S1() {
      I || e7(), I || (F1 = S1)
    }, e7(), B.ready
  }
})()
// @from(Start 8740718, End 8740945)
async function kbA(A) {
  let B = await xt9({
    instantiateWasm(Q, I) {
      WebAssembly.instantiate(A, Q).then((G) => {
        G instanceof WebAssembly.Instance ? I(G) : I(G.instance)
      })
    }
  });
  return ybA(B)
}
// @from(Start 8741058, End 8741129)
SB1 = await kbA(await ft9(vt9(import.meta.url).resolve("./yoga.wasm")))
// @from(Start 8741132, End 8741456)
function lP1({
  onlyFirst: A = !1
} = {}) {
  let Q = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(Q, A ? void 0 : "g")
}
// @from(Start 8741461, End 8741472)
bt9 = lP1()
// @from(Start 8741475, End 8741617)
function UZ(A) {
  if (typeof A !== "string") throw new TypeError(`Expected a \`string\`, got \`${typeof A}\``);
  return A.replace(bt9, "")
}
// @from(Start 8741619, End 8745319)
function xbA(A) {
  return A === 161 || A === 164 || A === 167 || A === 168 || A === 170 || A === 173 || A === 174 || A >= 176 && A <= 180 || A >= 182 && A <= 186 || A >= 188 && A <= 191 || A === 198 || A === 208 || A === 215 || A === 216 || A >= 222 && A <= 225 || A === 230 || A >= 232 && A <= 234 || A === 236 || A === 237 || A === 240 || A === 242 || A === 243 || A >= 247 && A <= 250 || A === 252 || A === 254 || A === 257 || A === 273 || A === 275 || A === 283 || A === 294 || A === 295 || A === 299 || A >= 305 && A <= 307 || A === 312 || A >= 319 && A <= 322 || A === 324 || A >= 328 && A <= 331 || A === 333 || A === 338 || A === 339 || A === 358 || A === 359 || A === 363 || A === 462 || A === 464 || A === 466 || A === 468 || A === 470 || A === 472 || A === 474 || A === 476 || A === 593 || A === 609 || A === 708 || A === 711 || A >= 713 && A <= 715 || A === 717 || A === 720 || A >= 728 && A <= 731 || A === 733 || A === 735 || A >= 768 && A <= 879 || A >= 913 && A <= 929 || A >= 931 && A <= 937 || A >= 945 && A <= 961 || A >= 963 && A <= 969 || A === 1025 || A >= 1040 && A <= 1103 || A === 1105 || A === 8208 || A >= 8211 && A <= 8214 || A === 8216 || A === 8217 || A === 8220 || A === 8221 || A >= 8224 && A <= 8226 || A >= 8228 && A <= 8231 || A === 8240 || A === 8242 || A === 8243 || A === 8245 || A === 8251 || A === 8254 || A === 8308 || A === 8319 || A >= 8321 && A <= 8324 || A === 8364 || A === 8451 || A === 8453 || A === 8457 || A === 8467 || A === 8470 || A === 8481 || A === 8482 || A === 8486 || A === 8491 || A === 8531 || A === 8532 || A >= 8539 && A <= 8542 || A >= 8544 && A <= 8555 || A >= 8560 && A <= 8569 || A === 8585 || A >= 8592 && A <= 8601 || A === 8632 || A === 8633 || A === 8658 || A === 8660 || A === 8679 || A === 8704 || A === 8706 || A === 8707 || A === 8711 || A === 8712 || A === 8715 || A === 8719 || A === 8721 || A === 8725 || A === 8730 || A >= 8733 && A <= 8736 || A === 8739 || A === 8741 || A >= 8743 && A <= 8748 || A === 8750 || A >= 8756 && A <= 8759 || A === 8764 || A === 8765 || A === 8776 || A === 8780 || A === 8786 || A === 8800 || A === 8801 || A >= 8804 && A <= 8807 || A === 8810 || A === 8811 || A === 8814 || A === 8815 || A === 8834 || A === 8835 || A === 8838 || A === 8839 || A === 8853 || A === 8857 || A === 8869 || A === 8895 || A === 8978 || A >= 9312 && A <= 9449 || A >= 9451 && A <= 9547 || A >= 9552 && A <= 9587 || A >= 9600 && A <= 9615 || A >= 9618 && A <= 9621 || A === 9632 || A === 9633 || A >= 9635 && A <= 9641 || A === 9650 || A === 9651 || A === 9654 || A === 9655 || A === 9660 || A === 9661 || A === 9664 || A === 9665 || A >= 9670 && A <= 9672 || A === 9675 || A >= 9678 && A <= 9681 || A >= 9698 && A <= 9701 || A === 9711 || A === 9733 || A === 9734 || A === 9737 || A === 9742 || A === 9743 || A === 9756 || A === 9758 || A === 9792 || A === 9794 || A === 9824 || A === 9825 || A >= 9827 && A <= 9829 || A >= 9831 && A <= 9834 || A === 9836 || A === 9837 || A === 9839 || A === 9886 || A === 9887 || A === 9919 || A >= 9926 && A <= 9933 || A >= 9935 && A <= 9939 || A >= 9941 && A <= 9953 || A === 9955 || A === 9960 || A === 9961 || A >= 9963 && A <= 9969 || A === 9972 || A >= 9974 && A <= 9977 || A === 9979 || A === 9980 || A === 9982 || A === 9983 || A === 10045 || A >= 10102 && A <= 10111 || A >= 11094 && A <= 11097 || A >= 12872 && A <= 12879 || A >= 57344 && A <= 63743 || A >= 65024 && A <= 65039 || A === 65533 || A >= 127232 && A <= 127242 || A >= 127248 && A <= 127277 || A >= 127280 && A <= 127337 || A >= 127344 && A <= 127373 || A === 127375 || A === 127376 || A >= 127387 && A <= 127404 || A >= 917760 && A <= 917999 || A >= 983040 && A <= 1048573 || A >= 1048576 && A <= 1114109
}
// @from(Start 8745321, End 8745417)
function fbA(A) {
  return A === 12288 || A >= 65281 && A <= 65376 || A >= 65504 && A <= 65510
}
// @from(Start 8745419, End 8748529)
function vbA(A) {
  return A >= 4352 && A <= 4447 || A === 8986 || A === 8987 || A === 9001 || A === 9002 || A >= 9193 && A <= 9196 || A === 9200 || A === 9203 || A === 9725 || A === 9726 || A === 9748 || A === 9749 || A >= 9776 && A <= 9783 || A >= 9800 && A <= 9811 || A === 9855 || A >= 9866 && A <= 9871 || A === 9875 || A === 9889 || A === 9898 || A === 9899 || A === 9917 || A === 9918 || A === 9924 || A === 9925 || A === 9934 || A === 9940 || A === 9962 || A === 9970 || A === 9971 || A === 9973 || A === 9978 || A === 9981 || A === 9989 || A === 9994 || A === 9995 || A === 10024 || A === 10060 || A === 10062 || A >= 10067 && A <= 10069 || A === 10071 || A >= 10133 && A <= 10135 || A === 10160 || A === 10175 || A === 11035 || A === 11036 || A === 11088 || A === 11093 || A >= 11904 && A <= 11929 || A >= 11931 && A <= 12019 || A >= 12032 && A <= 12245 || A >= 12272 && A <= 12287 || A >= 12289 && A <= 12350 || A >= 12353 && A <= 12438 || A >= 12441 && A <= 12543 || A >= 12549 && A <= 12591 || A >= 12593 && A <= 12686 || A >= 12688 && A <= 12773 || A >= 12783 && A <= 12830 || A >= 12832 && A <= 12871 || A >= 12880 && A <= 42124 || A >= 42128 && A <= 42182 || A >= 43360 && A <= 43388 || A >= 44032 && A <= 55203 || A >= 63744 && A <= 64255 || A >= 65040 && A <= 65049 || A >= 65072 && A <= 65106 || A >= 65108 && A <= 65126 || A >= 65128 && A <= 65131 || A >= 94176 && A <= 94180 || A === 94192 || A === 94193 || A >= 94208 && A <= 100343 || A >= 100352 && A <= 101589 || A >= 101631 && A <= 101640 || A >= 110576 && A <= 110579 || A >= 110581 && A <= 110587 || A === 110589 || A === 110590 || A >= 110592 && A <= 110882 || A === 110898 || A >= 110928 && A <= 110930 || A === 110933 || A >= 110948 && A <= 110951 || A >= 110960 && A <= 111355 || A >= 119552 && A <= 119638 || A >= 119648 && A <= 119670 || A === 126980 || A === 127183 || A === 127374 || A >= 127377 && A <= 127386 || A >= 127488 && A <= 127490 || A >= 127504 && A <= 127547 || A >= 127552 && A <= 127560 || A === 127568 || A === 127569 || A >= 127584 && A <= 127589 || A >= 127744 && A <= 127776 || A >= 127789 && A <= 127797 || A >= 127799 && A <= 127868 || A >= 127870 && A <= 127891 || A >= 127904 && A <= 127946 || A >= 127951 && A <= 127955 || A >= 127968 && A <= 127984 || A === 127988 || A >= 127992 && A <= 128062 || A === 128064 || A >= 128066 && A <= 128252 || A >= 128255 && A <= 128317 || A >= 128331 && A <= 128334 || A >= 128336 && A <= 128359 || A === 128378 || A === 128405 || A === 128406 || A === 128420 || A >= 128507 && A <= 128591 || A >= 128640 && A <= 128709 || A === 128716 || A >= 128720 && A <= 128722 || A >= 128725 && A <= 128727 || A >= 128732 && A <= 128735 || A === 128747 || A === 128748 || A >= 128756 && A <= 128764 || A >= 128992 && A <= 129003 || A === 129008 || A >= 129292 && A <= 129338 || A >= 129340 && A <= 129349 || A >= 129351 && A <= 129535 || A >= 129648 && A <= 129660 || A >= 129664 && A <= 129673 || A >= 129679 && A <= 129734 || A >= 129742 && A <= 129756 || A >= 129759 && A <= 129769 || A >= 129776 && A <= 129784 || A >= 131072 && A <= 196605 || A >= 196608 && A <= 262141
}
// @from(Start 8748531, End 8748649)
function gt9(A) {
  if (!Number.isSafeInteger(A)) throw new TypeError(`Expected a code point, got \`${typeof A}\`.`)
}
// @from(Start 8748651, End 8748773)
function DL(A, {
  ambiguousAsWide: B = !1
} = {}) {
  if (gt9(A), fbA(A) || vbA(A) || B && xbA(A)) return 2;
  return 1
}
// @from(Start 8748778, End 8748796)
hbA = I1(gbA(), 1)
// @from(Start 8748800, End 8748824)
ht9 = new Intl.Segmenter
// @from(Start 8748828, End 8748871)
mt9 = /^\p{Default_Ignorable_Code_Point}$/u
// @from(Start 8748874, End 8749712)
function Kn(A, B = {}) {
  if (typeof A !== "string" || A.length === 0) return 0;
  let {
    ambiguousIsNarrow: Q = !0,
    countAnsiEscapeCodes: I = !1
  } = B;
  if (!I) A = UZ(A);
  if (A.length === 0) return 0;
  let G = 0,
    Z = {
      ambiguousAsWide: !Q
    };
  for (let {
      segment: D
    }
    of ht9.segment(A)) {
    let Y = D.codePointAt(0);
    if (Y <= 31 || Y >= 127 && Y <= 159) continue;
    if (Y >= 8203 && Y <= 8207 || Y === 65279) continue;
    if (Y >= 768 && Y <= 879 || Y >= 6832 && Y <= 6911 || Y >= 7616 && Y <= 7679 || Y >= 8400 && Y <= 8447 || Y >= 65056 && Y <= 65071) continue;
    if (Y >= 55296 && Y <= 57343) continue;
    if (Y >= 65024 && Y <= 65039) continue;
    if (mt9.test(D)) continue;
    if (hbA.default().test(D)) {
      G += 2;
      continue
    }
    G += DL(Y, Z)
  }
  return G
}
// @from(Start 8749714, End 8749810)
function pv(A) {
  let B = 0;
  for (let Q of A.split(`
`)) B = Math.max(B, Kn(Q));
  return B
}
// @from(Start 8749815, End 8749823)
mbA = {}
// @from(Start 8749827, End 8750109)
dt9 = (A) => {
    if (A.length === 0) return {
      width: 0,
      height: 0
    };
    let B = mbA[A];
    if (B) return B;
    let Q = pv(A),
      I = A.split(`
`).length;
    return mbA[A] = {
      width: Q,
      height: I
    }, {
      width: Q,
      height: I
    }
  }
// @from(Start 8750113, End 8750122)
iP1 = dt9
// @from(Start 8750128, End 8750146)
pbA = I1(ubA(), 1)
// @from(Start 8750150, End 8750174)
ut9 = new Intl.Segmenter
// @from(Start 8750178, End 8750221)
pt9 = /^\p{Default_Ignorable_Code_Point}$/u
// @from(Start 8750224, End 8751062)
function OS(A, B = {}) {
  if (typeof A !== "string" || A.length === 0) return 0;
  let {
    ambiguousIsNarrow: Q = !0,
    countAnsiEscapeCodes: I = !1
  } = B;
  if (!I) A = UZ(A);
  if (A.length === 0) return 0;
  let G = 0,
    Z = {
      ambiguousAsWide: !Q
    };
  for (let {
      segment: D
    }
    of ut9.segment(A)) {
    let Y = D.codePointAt(0);
    if (Y <= 31 || Y >= 127 && Y <= 159) continue;
    if (Y >= 8203 && Y <= 8207 || Y === 65279) continue;
    if (Y >= 768 && Y <= 879 || Y >= 6832 && Y <= 6911 || Y >= 7616 && Y <= 7679 || Y >= 8400 && Y <= 8447 || Y >= 65056 && Y <= 65071) continue;
    if (Y >= 55296 && Y <= 57343) continue;
    if (Y >= 65024 && Y <= 65039) continue;
    if (pt9.test(D)) continue;
    if (pbA.default().test(D)) {
      G += 2;
      continue
    }
    G += DL(Y, Z)
  }
  return G
}
// @from(Start 8751067, End 8751105)
cbA = (A = 0) => (B) => `\x1B[${B+A}m`
// @from(Start 8751109, End 8751155)
lbA = (A = 0) => (B) => `\x1B[${38+A};5;${B}m`
// @from(Start 8751159, End 8751221)
ibA = (A = 0) => (B, Q, I) => `\x1B[${38+A};2;${B};${Q};${I}m`
// @from(Start 8751225, End 8752472)
iB = {
    modifier: {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      overline: [53, 55],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29]
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      blackBright: [90, 39],
      gray: [90, 39],
      grey: [90, 39],
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39]
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgBlackBright: [100, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49]
    }
  }
// @from(Start 8752476, End 8752506)
q98 = Object.keys(iB.modifier)
// @from(Start 8752510, End 8752537)
ct9 = Object.keys(iB.color)
// @from(Start 8752541, End 8752570)
lt9 = Object.keys(iB.bgColor)
// @from(Start 8752574, End 8752596)
M98 = [...ct9, ...lt9]
// @from(Start 8752599, End 8754879)
function it9() {
  let A = new Map;
  for (let [B, Q] of Object.entries(iB)) {
    for (let [I, G] of Object.entries(Q)) iB[I] = {
      open: `\x1B[${G[0]}m`,
      close: `\x1B[${G[1]}m`
    }, Q[I] = iB[I], A.set(G[0], G[1]);
    Object.defineProperty(iB, B, {
      value: Q,
      enumerable: !1
    })
  }
  return Object.defineProperty(iB, "codes", {
    value: A,
    enumerable: !1
  }), iB.color.close = "\x1B[39m", iB.bgColor.close = "\x1B[49m", iB.color.ansi = cbA(), iB.color.ansi256 = lbA(), iB.color.ansi16m = ibA(), iB.bgColor.ansi = cbA(10), iB.bgColor.ansi256 = lbA(10), iB.bgColor.ansi16m = ibA(10), Object.defineProperties(iB, {
    rgbToAnsi256: {
      value: (B, Q, I) => {
        if (B === Q && Q === I) {
          if (B < 8) return 16;
          if (B > 248) return 231;
          return Math.round((B - 8) / 247 * 24) + 232
        }
        return 16 + 36 * Math.round(B / 255 * 5) + 6 * Math.round(Q / 255 * 5) + Math.round(I / 255 * 5)
      },
      enumerable: !1
    },
    hexToRgb: {
      value: (B) => {
        let Q = /[a-f\d]{6}|[a-f\d]{3}/i.exec(B.toString(16));
        if (!Q) return [0, 0, 0];
        let [I] = Q;
        if (I.length === 3) I = [...I].map((Z) => Z + Z).join("");
        let G = Number.parseInt(I, 16);
        return [G >> 16 & 255, G >> 8 & 255, G & 255]
      },
      enumerable: !1
    },
    hexToAnsi256: {
      value: (B) => iB.rgbToAnsi256(...iB.hexToRgb(B)),
      enumerable: !1
    },
    ansi256ToAnsi: {
      value: (B) => {
        if (B < 8) return 30 + B;
        if (B < 16) return 90 + (B - 8);
        let Q, I, G;
        if (B >= 232) Q = ((B - 232) * 10 + 8) / 255, I = Q, G = Q;
        else {
          B -= 16;
          let Y = B % 36;
          Q = Math.floor(B / 36) / 5, I = Math.floor(Y / 6) / 5, G = Y % 6 / 5
        }
        let Z = Math.max(Q, I, G) * 2;
        if (Z === 0) return 30;
        let D = 30 + (Math.round(G) << 2 | Math.round(I) << 1 | Math.round(Q));
        if (Z === 2) D += 60;
        return D
      },
      enumerable: !1
    },
    rgbToAnsi: {
      value: (B, Q, I) => iB.ansi256ToAnsi(iB.rgbToAnsi256(B, Q, I)),
      enumerable: !1
    },
    hexToAnsi: {
      value: (B) => iB.ansi256ToAnsi(iB.hexToAnsi256(B)),
      enumerable: !1
    }
  }), iB
}
// @from(Start 8754884, End 8754895)
nt9 = it9()
// @from(Start 8754899, End 8754907)
nB = nt9
// @from(Start 8754913, End 8754941)
jB1 = new Set(["\x1B", ""])
// @from(Start 8754945, End 8754953)
at9 = 39
// @from(Start 8754957, End 8754969)
aP1 = "\x07"
// @from(Start 8754973, End 8754982)
sbA = "["
// @from(Start 8754986, End 8754995)
st9 = "]"
// @from(Start 8754999, End 8755008)
rbA = "m"
// @from(Start 8755012, End 8755029)
_B1 = `${st9}8;;`
// @from(Start 8755033, End 8755092)
nbA = (A) => `${jB1.values().next().value}${sbA}${A}${rbA}`
// @from(Start 8755096, End 8755155)
abA = (A) => `${jB1.values().next().value}${_B1}${A}${aP1}`
// @from(Start 8755159, End 8755202)
rt9 = (A) => A.split(" ").map((B) => OS(B))
// @from(Start 8755206, End 8755809)
nP1 = (A, B, Q) => {
    let I = [...B],
      G = !1,
      Z = !1,
      D = OS(UZ(A.at(-1)));
    for (let [Y, W] of I.entries()) {
      let J = OS(W);
      if (D + J <= Q) A[A.length - 1] += W;
      else A.push(W), D = 0;
      if (jB1.has(W)) G = !0, Z = I.slice(Y + 1, Y + 1 + _B1.length).join("") === _B1;
      if (G) {
        if (Z) {
          if (W === aP1) G = !1, Z = !1
        } else if (W === rbA) G = !1;
        continue
      }
      if (D += J, D === Q && Y < I.length - 1) A.push(""), D = 0
    }
    if (!D && A.at(-1).length > 0 && A.length > 1) A[A.length - 2] += A.pop()
  }
// @from(Start 8755813, End 8756039)
ot9 = (A) => {
    let B = A.split(" "),
      Q = B.length;
    while (Q > 0) {
      if (OS(B[Q - 1]) > 0) break;
      Q--
    }
    if (Q === B.length) return A;
    return B.slice(0, Q).join(" ") + B.slice(Q).join("")
  }
// @from(Start 8756043, End 8757807)
tt9 = (A, B, Q = {}) => {
    if (Q.trim !== !1 && A.trim() === "") return "";
    let I = "",
      G, Z, D = rt9(A),
      Y = [""];
    for (let [X, V] of A.split(" ").entries()) {
      if (Q.trim !== !1) Y[Y.length - 1] = Y.at(-1).trimStart();
      let C = OS(Y.at(-1));
      if (X !== 0) {
        if (C >= B && (Q.wordWrap === !1 || Q.trim === !1)) Y.push(""), C = 0;
        if (C > 0 || Q.trim === !1) Y[Y.length - 1] += " ", C++
      }
      if (Q.hard && D[X] > B) {
        let K = B - C,
          E = 1 + Math.floor((D[X] - K - 1) / B);
        if (Math.floor((D[X] - 1) / B) < E) Y.push("");
        nP1(Y, V, B);
        continue
      }
      if (C + D[X] > B && C > 0 && D[X] > 0) {
        if (Q.wordWrap === !1 && C < B) {
          nP1(Y, V, B);
          continue
        }
        Y.push("")
      }
      if (C + D[X] > B && Q.wordWrap === !1) {
        nP1(Y, V, B);
        continue
      }
      Y[Y.length - 1] += V
    }
    if (Q.trim !== !1) Y = Y.map((X) => ot9(X));
    let W = Y.join(`
`),
      J = [...W],
      F = 0;
    for (let [X, V] of J.entries()) {
      if (I += V, jB1.has(V)) {
        let {
          groups: K
        } = new RegExp(`(?:\\${sbA}(?<code>\\d+)m|\\${_B1}(?<uri>.*)${aP1})`).exec(W.slice(F)) || {
          groups: {}
        };
        if (K.code !== void 0) {
          let E = Number.parseFloat(K.code);
          G = E === at9 ? void 0 : E
        } else if (K.uri !== void 0) Z = K.uri.length === 0 ? void 0 : K.uri
      }
      let C = nB.codes.get(Number(G));
      if (J[X + 1] === `
`) {
        if (Z) I += abA("");
        if (G && C) I += nbA(C)
      } else if (V === `
`) {
        if (G && C) I += nbA(G);
        if (Z) I += abA(Z)
      }
      F += V.length
    }
    return I
  }
// @from(Start 8757810, End 8757934)
function Hn(A, B, Q) {
  return String(A).normalize().replaceAll(`\r
`, `
`).split(`
`).map((I) => tt9(I, B, Q)).join(`
`)
}
// @from(Start 8757936, End 8758440)
function zn(A) {
  if (!Number.isInteger(A)) return !1;
  return A >= 4352 && (A <= 4447 || A === 9001 || A === 9002 || 11904 <= A && A <= 12871 && A !== 12351 || 12880 <= A && A <= 19903 || 19968 <= A && A <= 42182 || 43360 <= A && A <= 43388 || 44032 <= A && A <= 55203 || 63744 <= A && A <= 64255 || 65040 <= A && A <= 65049 || 65072 <= A && A <= 65131 || 65281 <= A && A <= 65376 || 65504 <= A && A <= 65510 || 110592 <= A && A <= 110593 || 127488 <= A && A <= 127569 || 131072 <= A && A <= 262141)
}
// @from(Start 8758445, End 8758485)
et9 = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/
// @from(Start 8758489, End 8758508)
tbA = ["\x1B", ""]
// @from(Start 8758512, End 8758542)
yB1 = (A) => `${tbA[0]}[${A}m`
// @from(Start 8758546, End 8759221)
obA = (A, B, Q) => {
    let I = [];
    A = [...A];
    for (let G of A) {
      let Z = G;
      if (G.includes(";")) G = G.split(";")[0][0] + "0";
      let D = nB.codes.get(Number.parseInt(G, 10));
      if (D) {
        let Y = A.indexOf(D.toString());
        if (Y === -1) I.push(yB1(B ? D : Z));
        else A.splice(Y, 1)
      } else if (B) {
        I.push(yB1(0));
        break
      } else I.push(yB1(Z))
    }
    if (B) {
      if (I = I.filter((G, Z) => I.indexOf(G) === Z), Q !== void 0) {
        let G = yB1(nB.codes.get(Number.parseInt(Q, 10)));
        I = I.reduce((Z, D) => D === G ? [D, ...Z] : [...Z, D], [])
      }
    }
    return I.join("")
  }
// @from(Start 8759224, End 8759937)
function Tz(A, B, Q) {
  let I = [...A],
    G = [],
    Z = typeof Q === "number" ? Q : I.length,
    D = !1,
    Y, W = 0,
    J = "";
  for (let [F, X] of I.entries()) {
    let V = !1;
    if (tbA.includes(X)) {
      let C = /\d[^m]*/.exec(A.slice(F, F + 18));
      if (Y = C && C.length > 0 ? C[0] : void 0, W < Z) {
        if (D = !0, Y !== void 0) G.push(Y)
      }
    } else if (D && X === "m") D = !1, V = !0;
    if (!D && !V) W++;
    if (!et9.test(X) && zn(X.codePointAt())) {
      if (W++, typeof Q !== "number") Z++
    }
    if (W > B && W <= Z) J += X;
    else if (W === B && !D && Y !== void 0) J = obA(G);
    else if (W >= Z) {
      J += obA(G, !0, Y);
      break
    }
  }
  return J
}
// @from(Start 8759942, End 8759960)
BgA = I1(AgA(), 1)
// @from(Start 8759964, End 8759988)
Ae9 = new Intl.Segmenter
// @from(Start 8759992, End 8760035)
Be9 = /^\p{Default_Ignorable_Code_Point}$/u
// @from(Start 8760038, End 8760876)
function cv(A, B = {}) {
  if (typeof A !== "string" || A.length === 0) return 0;
  let {
    ambiguousIsNarrow: Q = !0,
    countAnsiEscapeCodes: I = !1
  } = B;
  if (!I) A = UZ(A);
  if (A.length === 0) return 0;
  let G = 0,
    Z = {
      ambiguousAsWide: !Q
    };
  for (let {
      segment: D
    }
    of Ae9.segment(A)) {
    let Y = D.codePointAt(0);
    if (Y <= 31 || Y >= 127 && Y <= 159) continue;
    if (Y >= 8203 && Y <= 8207 || Y === 65279) continue;
    if (Y >= 768 && Y <= 879 || Y >= 6832 && Y <= 6911 || Y >= 7616 && Y <= 7679 || Y >= 8400 && Y <= 8447 || Y >= 65056 && Y <= 65071) continue;
    if (Y >= 55296 && Y <= 57343) continue;
    if (Y >= 65024 && Y <= 65039) continue;
    if (Be9.test(D)) continue;
    if (BgA.default().test(D)) {
      G += 2;
      continue
    }
    G += DL(Y, Z)
  }
  return G
}
// @from(Start 8760878, End 8761071)
function kB1(A, B, Q) {
  if (A.charAt(B) === " ") return B;
  let I = Q ? 1 : -1;
  for (let G = 0; G <= 3; G++) {
    let Z = B + G * I;
    if (A.charAt(Z) === " ") return Z
  }
  return B
}
// @from(Start 8761073, End 8762290)
function sP1(A, B, Q = {}) {
  let {
    position: I = "end",
    space: G = !1,
    preferTruncationOnSpace: Z = !1
  } = Q, {
    truncationCharacter: D = "…"
  } = Q;
  if (typeof A !== "string") throw new TypeError(`Expected \`input\` to be a string, got ${typeof A}`);
  if (typeof B !== "number") throw new TypeError(`Expected \`columns\` to be a number, got ${typeof B}`);
  if (B < 1) return "";
  if (B === 1) return D;
  let Y = cv(A);
  if (Y <= B) return A;
  if (I === "start") {
    if (Z) {
      let W = kB1(A, Y - B + 1, !0);
      return D + Tz(A, W, Y).trim()
    }
    if (G === !0) D += " ";
    return D + Tz(A, Y - B + cv(D), Y)
  }
  if (I === "middle") {
    if (G === !0) D = ` ${D} `;
    let W = Math.floor(B / 2);
    if (Z) {
      let J = kB1(A, W),
        F = kB1(A, Y - (B - W) + 1, !0);
      return Tz(A, 0, J) + D + Tz(A, F, Y).trim()
    }
    return Tz(A, 0, W) + D + Tz(A, Y - (B - W) + cv(D), Y)
  }
  if (I === "end") {
    if (Z) {
      let W = kB1(A, B - 1);
      return Tz(A, 0, W) + D
    }
    if (G === !0) D = ` ${D}`;
    return Tz(A, 0, B - cv(D)) + D
  }
  throw new Error(`Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${I}`)
}
// @from(Start 8762295, End 8762303)
QgA = {}
// @from(Start 8762307, End 8762735)
Qe9 = (A, B, Q) => {
    let I = A + String(B) + String(Q),
      G = QgA[I];
    if (G) return G;
    let Z = A;
    if (Q === "wrap") Z = Hn(A, B, {
      trim: !1,
      hard: !0
    });
    if (Q.startsWith("truncate")) {
      let D = "end";
      if (Q === "truncate-middle") D = "middle";
      if (Q === "truncate-start") D = "start";
      Z = sP1(A, B, {
        position: D
      })
    }
    return QgA[I] = Z, Z
  }
// @from(Start 8762739, End 8762748)
xB1 = Qe9
// @from(Start 8762754, End 8763218)
IgA = (A) => {
    let B = "";
    for (let Q = 0; Q < A.childNodes.length; Q++) {
      let I = A.childNodes[Q];
      if (I === void 0) continue;
      let G = "";
      if (I.nodeName === "#text") G = I.nodeValue;
      else {
        if (I.nodeName === "ink-text" || I.nodeName === "ink-virtual-text") G = IgA(I);
        if (G.length > 0 && typeof I.internal_transform === "function") G = I.internal_transform(G, Q)
      }
      B += G
    }
    return B
  }
// @from(Start 8763222, End 8763231)
fB1 = IgA
// @from(Start 8763237, End 8763538)
vB1 = (A) => {
    let B = {
      nodeName: A,
      style: {},
      attributes: {},
      childNodes: [],
      parentNode: void 0,
      yogaNode: A === "ink-virtual-text" ? void 0 : SB1.Node.create()
    };
    if (A === "ink-text") B.yogaNode?.setMeasureFunc(Ie9.bind(null, B));
    return B
  }
// @from(Start 8763542, End 8763810)
bB1 = (A, B) => {
    if (B.parentNode) wn(B.parentNode, B);
    if (B.parentNode = A, A.childNodes.push(B), B.yogaNode) A.yogaNode?.insertChild(B.yogaNode, A.yogaNode.getChildCount());
    if (A.nodeName === "ink-text" || A.nodeName === "ink-virtual-text") gB1(A)
  }
// @from(Start 8763814, End 8764255)
rP1 = (A, B, Q) => {
    if (B.parentNode) wn(B.parentNode, B);
    B.parentNode = A;
    let I = A.childNodes.indexOf(Q);
    if (I >= 0) {
      if (A.childNodes.splice(I, 0, B), B.yogaNode) A.yogaNode?.insertChild(B.yogaNode, I);
      return
    }
    if (A.childNodes.push(B), B.yogaNode) A.yogaNode?.insertChild(B.yogaNode, A.yogaNode.getChildCount());
    if (A.nodeName === "ink-text" || A.nodeName === "ink-virtual-text") gB1(A)
  }
// @from(Start 8764259, End 8764534)
wn = (A, B) => {
    if (B.yogaNode) B.parentNode?.yogaNode?.removeChild(B.yogaNode);
    B.parentNode = void 0;
    let Q = A.childNodes.indexOf(B);
    if (Q >= 0) A.childNodes.splice(Q, 1);
    if (A.nodeName === "ink-text" || A.nodeName === "ink-virtual-text") gB1(A)
  }
// @from(Start 8764538, End 8764586)
oP1 = (A, B, Q) => {
    A.attributes[B] = Q
  }
// @from(Start 8764590, End 8764627)
tP1 = (A, B) => {
    A.style = B
  }
// @from(Start 8764631, End 8764804)
GgA = (A) => {
    let B = {
      nodeName: "#text",
      nodeValue: A,
      yogaNode: void 0,
      parentNode: void 0,
      style: {}
    };
    return En(B, A), B
  }
// @from(Start 8764808, End 8765076)
Ie9 = function(A, B) {
    let Q = A.nodeName === "#text" ? A.nodeValue : fB1(A),
      I = iP1(Q);
    if (I.width <= B) return I;
    if (I.width >= 1 && B > 0 && B < 1) return I;
    let G = A.style?.textWrap ?? "wrap",
      Z = xB1(Q, B, G);
    return iP1(Z)
  }
// @from(Start 8765080, End 8765173)
ZgA = (A) => {
    if (!A?.parentNode) return;
    return A.yogaNode ?? ZgA(A.parentNode)
  }
// @from(Start 8765177, End 8765219)
gB1 = (A) => {
    ZgA(A)?.markDirty()
  }
// @from(Start 8765223, End 8765317)
En = (A, B) => {
    if (typeof B !== "string") B = String(B);
    A.nodeValue = B, gB1(A)
  }
// @from(Start 8765323, End 8765426)
Ze9 = (A, B) => {
    if ("position" in B) A.setPositionType(B.position === "absolute" ? LB1 : MB1)
  }
// @from(Start 8765430, End 8765877)
De9 = (A, B) => {
    if ("margin" in B) A.setMargin(Cn, B.margin ?? 0);
    if ("marginX" in B) A.setMargin(Xn, B.marginX ?? 0);
    if ("marginY" in B) A.setMargin(Vn, B.marginY ?? 0);
    if ("marginLeft" in B) A.setMargin(WB1, B.marginLeft || 0);
    if ("marginRight" in B) A.setMargin(JB1, B.marginRight || 0);
    if ("marginTop" in B) A.setMargin(GL, B.marginTop || 0);
    if ("marginBottom" in B) A.setMargin(ZL, B.marginBottom || 0)
  }
// @from(Start 8765881, End 8766347)
Ye9 = (A, B) => {
    if ("padding" in B) A.setPadding(Cn, B.padding ?? 0);
    if ("paddingX" in B) A.setPadding(Xn, B.paddingX ?? 0);
    if ("paddingY" in B) A.setPadding(Vn, B.paddingY ?? 0);
    if ("paddingLeft" in B) A.setPadding(Rz, B.paddingLeft || 0);
    if ("paddingRight" in B) A.setPadding(Oz, B.paddingRight || 0);
    if ("paddingTop" in B) A.setPadding(GL, B.paddingTop || 0);
    if ("paddingBottom" in B) A.setPadding(ZL, B.paddingBottom || 0)
  }
// @from(Start 8766351, End 8768329)
We9 = (A, B) => {
    if ("flexGrow" in B) A.setFlexGrow(B.flexGrow ?? 0);
    if ("flexShrink" in B) A.setFlexShrink(typeof B.flexShrink === "number" ? B.flexShrink : 1);
    if ("flexWrap" in B) {
      if (B.flexWrap === "nowrap") A.setFlexWrap(RB1);
      if (B.flexWrap === "wrap") A.setFlexWrap(OB1);
      if (B.flexWrap === "wrap-reverse") A.setFlexWrap(TB1)
    }
    if ("flexDirection" in B) {
      if (B.flexDirection === "row") A.setFlexDirection(VB1);
      if (B.flexDirection === "row-reverse") A.setFlexDirection(CB1);
      if (B.flexDirection === "column") A.setFlexDirection(FB1);
      if (B.flexDirection === "column-reverse") A.setFlexDirection(XB1)
    }
    if ("flexBasis" in B)
      if (typeof B.flexBasis === "number") A.setFlexBasis(B.flexBasis);
      else if (typeof B.flexBasis === "string") A.setFlexBasisPercent(Number.parseInt(B.flexBasis, 10));
    else A.setFlexBasis(Number.NaN);
    if ("alignItems" in B) {
      if (B.alignItems === "stretch" || !B.alignItems) A.setAlignItems(YB1);
      if (B.alignItems === "flex-start") A.setAlignItems(Wn);
      if (B.alignItems === "center") A.setAlignItems(Jn);
      if (B.alignItems === "flex-end") A.setAlignItems(Fn)
    }
    if ("alignSelf" in B) {
      if (B.alignSelf === "auto" || !B.alignSelf) A.setAlignSelf(DB1);
      if (B.alignSelf === "flex-start") A.setAlignSelf(Wn);
      if (B.alignSelf === "center") A.setAlignSelf(Jn);
      if (B.alignSelf === "flex-end") A.setAlignSelf(Fn)
    }
    if ("justifyContent" in B) {
      if (B.justifyContent === "flex-start" || !B.justifyContent) A.setJustifyContent(wB1);
      if (B.justifyContent === "center") A.setJustifyContent(EB1);
      if (B.justifyContent === "flex-end") A.setJustifyContent(UB1);
      if (B.justifyContent === "space-between") A.setJustifyContent(NB1);
      if (B.justifyContent === "space-around") A.setJustifyContent($B1);
      if (B.justifyContent === "space-evenly") A.setJustifyContent(qB1)
    }
  }
// @from(Start 8768333, End 8769101)
Je9 = (A, B) => {
    if ("width" in B)
      if (typeof B.width === "number") A.setWidth(B.width);
      else if (typeof B.width === "string") A.setWidthPercent(Number.parseInt(B.width, 10));
    else A.setWidthAuto();
    if ("height" in B)
      if (typeof B.height === "number") A.setHeight(B.height);
      else if (typeof B.height === "string") A.setHeightPercent(Number.parseInt(B.height, 10));
    else A.setHeightAuto();
    if ("minWidth" in B)
      if (typeof B.minWidth === "string") A.setMinWidthPercent(Number.parseInt(B.minWidth, 10));
      else A.setMinWidth(B.minWidth ?? 0);
    if ("minHeight" in B)
      if (typeof B.minHeight === "string") A.setMinHeightPercent(Number.parseInt(B.minHeight, 10));
      else A.setMinHeight(B.minHeight ?? 0)
  }
// @from(Start 8769105, End 8769195)
Fe9 = (A, B) => {
    if ("display" in B) A.setDisplay(B.display === "flex" ? uv : IL)
  }
// @from(Start 8769199, End 8769498)
Xe9 = (A, B) => {
    if ("borderStyle" in B) {
      let Q = B.borderStyle ? 1 : 0;
      if (B.borderTop !== !1) A.setBorder(GL, Q);
      if (B.borderBottom !== !1) A.setBorder(ZL, Q);
      if (B.borderLeft !== !1) A.setBorder(Rz, Q);
      if (B.borderRight !== !1) A.setBorder(Oz, Q)
    }
  }
// @from(Start 8769502, End 8769681)
Ve9 = (A, B) => {
    if ("gap" in B) A.setGap(zB1, B.gap ?? 0);
    if ("columnGap" in B) A.setGap(KB1, B.columnGap ?? 0);
    if ("rowGap" in B) A.setGap(HB1, B.rowGap ?? 0)
  }
// @from(Start 8769685, End 8769802)
Ce9 = (A, B = {}) => {
    Ze9(A, B), De9(A, B), Ye9(A, B), We9(A, B), Je9(A, B), Fe9(A, B), Xe9(A, B), Ve9(A, B)
  }
// @from(Start 8769806, End 8769815)
eP1 = Ce9
// @from(Start 8770258, End 8770582)
VhA = (A, B) => {
    if (A === B) return;
    if (!A) return B;
    let Q = {},
      I = !1;
    for (let G of Object.keys(A))
      if (B ? !Object.hasOwn(B, G) : !0) Q[G] = void 0, I = !0;
    if (B) {
      for (let G of Object.keys(B))
        if (B[G] !== A[G]) Q[G] = B[G], I = !0
    }
    return I ? Q : void 0
  }
// @from(Start 8770586, End 8770650)
ChA = (A) => {
    A?.unsetMeasureFunc(), A?.freeRecursive()
  }
// @from(Start 8770654, End 8774221)
jS = KhA.default({
    getRootHostContext: () => ({
      isInsideText: !1
    }),
    prepareForCommit: () => null,
    preparePortalMount: () => null,
    clearContainer: () => !1,
    resetAfterCommit(A) {
      if (typeof A.onComputeLayout === "function") A.onComputeLayout();
      if (A.isStaticDirty) {
        if (A.isStaticDirty = !1, typeof A.onImmediateRender === "function") A.onImmediateRender();
        return
      }
      if (typeof A.onRender === "function") A.onRender()
    },
    getChildHostContext(A, B) {
      let Q = A.isInsideText,
        I = B === "ink-text" || B === "ink-virtual-text";
      if (Q === I) return A;
      return {
        isInsideText: I
      }
    },
    shouldSetTextContent: () => !1,
    createInstance(A, B, Q, I) {
      if (I.isInsideText && A === "ink-box") throw new Error("<Box> can’t be nested inside <Text> component");
      let G = A === "ink-text" && I.isInsideText ? "ink-virtual-text" : A,
        Z = vB1(G);
      for (let [D, Y] of Object.entries(B)) {
        if (D === "children") continue;
        if (D === "style") {
          if (tP1(Z, Y), Z.yogaNode) eP1(Z.yogaNode, Y);
          continue
        }
        if (D === "internal_transform") {
          Z.internal_transform = Y;
          continue
        }
        if (D === "internal_static") {
          Z.internal_static = !0;
          continue
        }
        oP1(Z, D, Y)
      }
      return Z
    },
    createTextInstance(A, B, Q) {
      if (!Q.isInsideText) throw new Error(`Text string "${A}" must be rendered inside <Text> component`);
      return GgA(A)
    },
    resetTextContent() {},
    hideTextInstance(A) {
      En(A, "")
    },
    unhideTextInstance(A, B) {
      En(A, B)
    },
    getPublicInstance: (A) => A,
    hideInstance(A) {
      A.yogaNode?.setDisplay(IL)
    },
    unhideInstance(A) {
      A.yogaNode?.setDisplay(uv)
    },
    appendInitialChild: bB1,
    appendChild: bB1,
    insertBefore: rP1,
    finalizeInitialChildren(A, B, Q, I) {
      if (A.internal_static) I.isStaticDirty = !0, I.staticNode = A;
      return !1
    },
    isPrimaryRenderer: !0,
    supportsMutation: !0,
    supportsPersistence: !1,
    supportsHydration: !1,
    scheduleTimeout: setTimeout,
    cancelTimeout: clearTimeout,
    noTimeout: -1,
    getCurrentEventPriority: () => cP1,
    beforeActiveInstanceBlur() {},
    afterActiveInstanceBlur() {},
    detachDeletedInstance() {},
    getInstanceFromNode: () => null,
    prepareScopeUpdate() {},
    getInstanceFromScope: () => null,
    appendChildToContainer: bB1,
    insertInContainerBefore: rP1,
    removeChildFromContainer(A, B) {
      wn(A, B), ChA(B.yogaNode)
    },
    prepareUpdate(A, B, Q, I, G) {
      if (A.internal_static) G.isStaticDirty = !0;
      let Z = VhA(Q, I),
        D = VhA(Q.style, I.style);
      if (!Z && !D) return null;
      return {
        props: Z,
        style: D
      }
    },
    commitUpdate(A, {
      props: B,
      style: Q
    }) {
      if (B)
        for (let [I, G] of Object.entries(B)) {
          if (I === "style") {
            tP1(A, G);
            continue
          }
          if (I === "internal_transform") {
            A.internal_transform = G;
            continue
          }
          if (I === "internal_static") {
            A.internal_static = !0;
            continue
          }
          oP1(A, I, G)
        }
      if (Q && A.yogaNode) eP1(A.yogaNode, Q)
    },
    commitTextUpdate(A, B, Q) {
      En(A, Q)
    },
    removeChild(A, B) {
      wn(A, B), ChA(B.yogaNode)
    }
  })
// @from(Start 8774224, End 8774856)
function HS1(A, B = 1, Q = {}) {
  let {
    indent: I = " ",
    includeEmptyLines: G = !1
  } = Q;
  if (typeof A !== "string") throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof A}\``);
  if (typeof B !== "number") throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof B}\``);
  if (B < 0) throw new RangeError(`Expected \`count\` to be at least 0, got \`${B}\``);
  if (typeof I !== "string") throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof I}\``);
  if (B === 0) return A;
  let Z = G ? /^/gm : /^(?!\s*$)/gm;
  return A.replace(Z, I.repeat(B))
}
// @from(Start 8774861, End 8775017)
v14 = (A) => {
    return A.getComputedWidth() - A.getComputedPadding(Rz) - A.getComputedPadding(Oz) - A.getComputedBorder(Rz) - A.getComputedBorder(Oz)
  }
// @from(Start 8775021, End 8775030)
HhA = v14
// @from(Start 8775036, End 8775054)
NhA = I1(EhA(), 1)
// @from(Start 8775060, End 8775858)
g14 = {
    autoAccept: "rgb(135,0,255)",
    bashBorder: "rgb(255,0,135)",
    claude: "rgb(215,119,87)",
    permission: "rgb(87,105,247)",
    planMode: "rgb(0,102,102)",
    secondaryBorder: "rgb(153,153,153)",
    text: "rgb(0,0,0)",
    inverseText: "rgb(255,255,255)",
    secondaryText: "rgb(102,102,102)",
    suggestion: "rgb(87,105,247)",
    remember: "rgb(0,0,255)",
    success: "rgb(44,122,57)",
    error: "rgb(171,43,63)",
    warning: "rgb(150,108,30)",
    diffAdded: "rgb(105,219,124)",
    diffRemoved: "rgb(255,168,180)",
    diffAddedDimmed: "rgb(199,225,203)",
    diffRemovedDimmed: "rgb(253,210,216)",
    diffAddedWord: "rgb(47,157,68)",
    diffRemovedWord: "rgb(209,69,75)",
    diffAddedWordDimmed: "rgb(144,194,156)",
    diffRemovedWordDimmed: "rgb(232,165,173)"
  }
// @from(Start 8775862, End 8776490)
h14 = {
    autoAccept: "#cd00cd",
    bashBorder: "#cd00cd",
    claude: "#cdcd00",
    permission: "#0000ee",
    planMode: "#00cdcd",
    secondaryBorder: "#e5e5e5",
    text: "#000000",
    inverseText: "#ffffff",
    secondaryText: "#7f7f7f",
    suggestion: "#0000ee",
    remember: "#0000ee",
    success: "#00cd00",
    error: "#cd0000",
    warning: "#cdcd00",
    diffAdded: "#00cd00",
    diffRemoved: "#cd0000",
    diffAddedDimmed: "#00cd00",
    diffRemovedDimmed: "#cd0000",
    diffAddedWord: "#00ff00",
    diffRemovedWord: "#ff0000",
    diffAddedWordDimmed: "#00cd00",
    diffRemovedWordDimmed: "#cd0000"
  }
// @from(Start 8776494, End 8777122)
m14 = {
    autoAccept: "#ff00ff",
    bashBorder: "#ff00ff",
    claude: "#cdcd00",
    permission: "#5c5cff",
    planMode: "#00ffff",
    secondaryBorder: "#e5e5e5",
    text: "#ffffff",
    inverseText: "#000000",
    secondaryText: "#e5e5e5",
    suggestion: "#5c5cff",
    remember: "#5c5cff",
    success: "#00ff00",
    error: "#ff0000",
    warning: "#ffff00",
    diffAdded: "#00cd00",
    diffRemoved: "#cd0000",
    diffAddedDimmed: "#00cd00",
    diffRemovedDimmed: "#cd0000",
    diffAddedWord: "#00ff00",
    diffRemovedWord: "#ff0000",
    diffAddedWordDimmed: "#00cd00",
    diffRemovedWordDimmed: "#cd0000"
  }
// @from(Start 8777126, End 8777926)
d14 = {
    autoAccept: "rgb(135,0,255)",
    bashBorder: "rgb(0,102,204)",
    claude: "rgb(255,153,51)",
    permission: "rgb(51,102,255)",
    planMode: "rgb(51,102,102)",
    secondaryBorder: "rgb(153,153,153)",
    text: "rgb(0,0,0)",
    inverseText: "rgb(255,255,255)",
    secondaryText: "rgb(102,102,102)",
    suggestion: "rgb(51,102,255)",
    remember: "rgb(51,102,255)",
    success: "rgb(0,102,153)",
    error: "rgb(204,0,0)",
    warning: "rgb(255,153,0)",
    diffAdded: "rgb(153,204,255)",
    diffRemoved: "rgb(255,204,204)",
    diffAddedDimmed: "rgb(209,231,253)",
    diffRemovedDimmed: "rgb(255,233,233)",
    diffAddedWord: "rgb(51,102,204)",
    diffRemovedWord: "rgb(153,51,51)",
    diffAddedWordDimmed: "rgb(102,153,204)",
    diffRemovedWordDimmed: "rgb(204,153,153)"
  }
// @from(Start 8777930, End 8778727)
u14 = {
    autoAccept: "rgb(175,135,255)",
    bashBorder: "rgb(253,93,177)",
    claude: "rgb(215,119,87)",
    permission: "rgb(177,185,249)",
    planMode: "rgb(72,150,140)",
    secondaryBorder: "rgb(136,136,136)",
    text: "rgb(255,255,255)",
    inverseText: "rgb(0,0,0)",
    secondaryText: "rgb(153,153,153)",
    suggestion: "rgb(177,185,249)",
    remember: "rgb(177,185,249)",
    success: "rgb(78,186,101)",
    error: "rgb(255,107,128)",
    warning: "rgb(255,193,7)",
    diffAdded: "rgb(34,92,43)",
    diffRemoved: "rgb(122,41,54)",
    diffAddedDimmed: "rgb(71,88,74)",
    diffRemovedDimmed: "rgb(105,72,77)",
    diffAddedWord: "rgb(56,166,96)",
    diffRemovedWord: "rgb(179,89,107)",
    diffAddedWordDimmed: "rgb(46,107,58)",
    diffRemovedWordDimmed: "rgb(139,57,69)"
  }
// @from(Start 8778731, End 8779523)
p14 = {
    autoAccept: "rgb(175,135,255)",
    bashBorder: "rgb(51,153,255)",
    claude: "rgb(255,153,51)",
    permission: "rgb(153,204,255)",
    planMode: "rgb(102,153,153)",
    secondaryBorder: "rgb(136,136,136)",
    text: "rgb(255,255,255)",
    inverseText: "rgb(0,0,0)",
    secondaryText: "rgb(153,153,153)",
    suggestion: "rgb(153,204,255)",
    remember: "rgb(153,204,255)",
    success: "rgb(51,153,255)",
    error: "rgb(255,102,102)",
    warning: "rgb(255,204,0)",
    diffAdded: "rgb(0,68,102)",
    diffRemoved: "rgb(102,0,0)",
    diffAddedDimmed: "rgb(62,81,91)",
    diffRemovedDimmed: "rgb(62,44,44)",
    diffAddedWord: "rgb(0,119,179)",
    diffRemovedWord: "rgb(179,0,0)",
    diffAddedWordDimmed: "rgb(26,99,128)",
    diffRemovedWordDimmed: "rgb(128,21,21)"
  }
// @from(Start 8779526, End 8779804)
function UhA(A) {
  switch (A) {
    case "light":
      return g14;
    case "light-ansi":
      return h14;
    case "dark-ansi":
      return m14;
    case "light-daltonized":
      return d14;
    case "dark-daltonized":
      return p14;
    default:
      return u14
  }
}
// @from(Start 8779809, End 8779855)
c14 = /^rgb\(\s?(\d+),\s?(\d+),\s?(\d+)\s?\)$/
// @from(Start 8779859, End 8779891)
l14 = /^ansi256\(\s?(\d+)\s?\)$/
// @from(Start 8779895, End 8780476)
i14 = (A, B, Q) => {
    if (!B) return A;
    if (B.startsWith("#")) return Q === "foreground" ? UA.hex(B)(A) : UA.bgHex(B)(A);
    if (B.startsWith("ansi256")) {
      let I = l14.exec(B);
      if (!I) return A;
      let G = Number(I[1]);
      return Q === "foreground" ? UA.ansi256(G)(A) : UA.bgAnsi256(G)(A)
    }
    if (B.startsWith("rgb")) {
      let I = c14.exec(B);
      if (!I) return A;
      let G = Number(I[1]),
        Z = Number(I[2]),
        D = Number(I[3]);
      return Q === "foreground" ? UA.rgb(G, Z, D)(A) : UA.bgRgb(G, Z, D)(A)
    }
    return A
  }
// @from(Start 8780479, End 8780568)
function V9(A, B, Q = "foreground") {
  return (I) => i14(I, A ? UhA(B)[A] : void 0, Q)
}
// @from(Start 8780573, End 8782355)
n14 = (A, B, Q, I, G) => {
    if (Q.style.borderStyle) {
      let Z = Q.yogaNode.getComputedWidth(),
        D = Q.yogaNode.getComputedHeight(),
        Y = typeof Q.style.borderStyle === "string" ? NhA.default[Q.style.borderStyle] : Q.style.borderStyle,
        W = Q.style.borderTopColor ?? Q.style.borderColor,
        J = Q.style.borderBottomColor ?? Q.style.borderColor,
        F = Q.style.borderLeftColor ?? Q.style.borderColor,
        X = Q.style.borderRightColor ?? Q.style.borderColor,
        V = Q.style.borderTopDimColor ?? Q.style.borderDimColor,
        C = Q.style.borderBottomDimColor ?? Q.style.borderDimColor,
        K = Q.style.borderLeftDimColor ?? Q.style.borderDimColor,
        E = Q.style.borderRightDimColor ?? Q.style.borderDimColor,
        N = Q.style.borderTop !== !1,
        q = Q.style.borderBottom !== !1,
        O = Q.style.borderLeft !== !1,
        R = Q.style.borderRight !== !1,
        T = Z - (O ? 1 : 0) - (R ? 1 : 0),
        L = N ? V9(W, G)((O ? Y.topLeft : "") + Y.top.repeat(T) + (R ? Y.topRight : "")) : void 0;
      if (N && V) L = UA.dim(L);
      let _ = D;
      if (N) _ -= 1;
      if (q) _ -= 1;
      let k = (V9(F, G)(Y.left) + `
`).repeat(_);
      if (K) k = UA.dim(k);
      let i = (V9(X, G)(Y.right) + `
`).repeat(_);
      if (E) i = UA.dim(i);
      let x = q ? V9(J, G)((O ? Y.bottomLeft : "") + Y.bottom.repeat(T) + (R ? Y.bottomRight : "")) : void 0;
      if (q && C) x = UA.dim(x);
      let s = N ? 1 : 0;
      if (L) I.write(A, B, L, {
        transformers: []
      });
      if (O) I.write(A, B + s, k, {
        transformers: []
      });
      if (R) I.write(A + Z - 1, B + s, i, {
        transformers: []
      });
      if (x) I.write(A, B + D - 1, x, {
        transformers: []
      })
    }
  }
// @from(Start 8782359, End 8782368)
$hA = n14
// @from(Start 8782374, End 8782569)
a14 = (A, B) => {
    let Q = A.childNodes[0]?.yogaNode;
    if (Q) {
      let I = Q.getComputedLeft(),
        G = Q.getComputedTop();
      B = `
`.repeat(G) + HS1(B, I)
    }
    return B
  }
// @from(Start 8782573, End 8784358)
qhA = (A, B, {
    offsetX: Q = 0,
    offsetY: I = 0,
    transformers: G = [],
    skipStaticElements: Z,
    theme: D
  }) => {
    if (Z && A.internal_static) return;
    let {
      yogaNode: Y
    } = A;
    if (Y) {
      if (Y.getDisplay() === IL) return;
      let W = Q + Y.getComputedLeft(),
        J = I + Y.getComputedTop(),
        F = G;
      if (typeof A.internal_transform === "function") F = [A.internal_transform, ...G];
      if (A.nodeName === "ink-text") {
        let V = fB1(A);
        if (V.length > 0) {
          let C = pv(V),
            K = HhA(Y);
          if (C > K) {
            let E = A.style.textWrap ?? "wrap";
            V = xB1(V, K, E)
          }
          V = a14(A, V), B.write(W, J, V, {
            transformers: F
          })
        }
        return
      }
      let X = !1;
      if (A.nodeName === "ink-box") {
        $hA(W, J, A, B, D);
        let V = A.style.overflowX === "hidden" || A.style.overflow === "hidden",
          C = A.style.overflowY === "hidden" || A.style.overflow === "hidden";
        if (V || C) {
          let K = V ? W + Y.getComputedBorder(Rz) : void 0,
            E = V ? W + Y.getComputedWidth() - Y.getComputedBorder(Oz) : void 0,
            N = C ? J + Y.getComputedBorder(GL) : void 0,
            q = C ? J + Y.getComputedHeight() - Y.getComputedBorder(ZL) : void 0;
          B.clip({
            x1: K,
            x2: E,
            y1: N,
            y2: q
          }), X = !0
        }
      }
      if (A.nodeName === "ink-root" || A.nodeName === "ink-box") {
        for (let V of A.childNodes) qhA(V, B, {
          offsetX: W,
          offsetY: J,
          transformers: F,
          skipStaticElements: Z,
          theme: D
        });
        if (X) B.unclip()
      }
    }
  }
// @from(Start 8784362, End 8784371)
wS1 = qhA
// @from(Start 8784374, End 8784453)
function ES1(A) {
  if (!Number.isInteger(A)) return !1;
  return DL(A) === 2
}
// @from(Start 8784458, End 8784482)
s14 = new Set([27, 155])
// @from(Start 8784486, End 8784510)
r14 = "0".codePointAt(0)
// @from(Start 8784514, End 8784538)
o14 = "9".codePointAt(0)
// @from(Start 8784542, End 8784555)
NS1 = new Set
// @from(Start 8784559, End 8784572)
US1 = new Map
// @from(Start 8784676, End 8784920)
function t14(A) {
  if (NS1.has(A)) return A;
  if (US1.has(A)) return US1.get(A);
  if (A = A.slice(2), A.includes(";")) A = A[0] + "0";
  let B = nB.codes.get(Number.parseInt(A, 10));
  if (B) return nB.color.ansi(B);
  return nB.reset.open
}
// @from(Start 8784922, End 8785065)
function e14(A) {
  for (let B = 0; B < A.length; B++) {
    let Q = A.codePointAt(B);
    if (Q >= r14 && Q <= o14) return B
  }
  return -1
}
// @from(Start 8785067, End 8785247)
function AA4(A, B) {
  A = A.slice(B, B + 19);
  let Q = e14(A);
  if (Q !== -1) {
    let I = A.indexOf("m", Q);
    if (I === -1) I = A.length;
    return A.slice(0, I + 1)
  }
}
// @from(Start 8785249, End 8785812)
function BA4(A, B = Number.POSITIVE_INFINITY) {
  let Q = [],
    I = 0,
    G = 0;
  while (I < A.length) {
    let Z = A.codePointAt(I);
    if (s14.has(Z)) {
      let W = AA4(A, I);
      if (W) {
        Q.push({
          type: "ansi",
          code: W,
          endCode: t14(W)
        }), I += W.length;
        continue
      }
    }
    let D = ES1(Z),
      Y = String.fromCodePoint(Z);
    if (Q.push({
        type: "character",
        value: Y,
        isFullWidth: D
      }), I += Y.length, G += D ? 2 : Y.length, G >= B) break
  }
  return Q
}
// @from(Start 8785814, End 8786056)
function MhA(A) {
  let B = [];
  for (let Q of A)
    if (Q.code === nB.reset.open) B = [];
    else if (NS1.has(Q.code)) B = B.filter((I) => I.endCode !== Q.code);
  else B = B.filter((I) => I.endCode !== Q.endCode), B.push(Q);
  return B
}
// @from(Start 8786058, End 8786145)
function QA4(A) {
  return MhA(A).map(({
    endCode: I
  }) => I).reverse().join("")
}
// @from(Start 8786147, End 8786583)
function $S1(A, B, Q) {
  let I = BA4(A, Q),
    G = [],
    Z = 0,
    D = "",
    Y = !1;
  for (let W of I) {
    if (Q !== void 0 && Z >= Q) break;
    if (W.type === "ansi") {
      if (G.push(W), Y) D += W.code
    } else {
      if (!Y && Z >= B) Y = !0, G = MhA(G), D = G.map(({
        code: J
      }) => J).join("");
      if (Y) D += W.value;
      Z += W.isFullWidth ? 2 : W.value.length
    }
  }
  return D += QA4(G), D
}
// @from(Start 8786588, End 8786612)
LhA = new Set([27, 155])
// @from(Start 8786616, End 8786629)
Q31 = new Set
// @from(Start 8786633, End 8786646)
qS1 = new Map
// @from(Start 8786753, End 8786769)
I31 = "\x1B]8;;"
// @from(Start 8786773, End 8786820)
MS1 = I31.split("").map((A) => A.charCodeAt(0))
// @from(Start 8786824, End 8786836)
RhA = "\x07"
// @from(Start 8786840, End 8786863)
c48 = RhA.charCodeAt(0)
// @from(Start 8786867, End 8786889)
IA4 = `\x1B]8;;${RhA}`
// @from(Start 8786892, End 8787171)
function OhA(A) {
  if (Q31.has(A)) return A;
  if (qS1.has(A)) return qS1.get(A);
  if (A.startsWith(I31)) return IA4;
  if (A = A.slice(2), A.includes(";")) A = A[0] + "0";
  let B = nB.codes.get(parseInt(A, 10));
  if (B) return nB.color.ansi(B);
  else return nB.reset.open
}
// @from(Start 8787173, End 8787230)
function Pn(A) {
  return A.map((B) => B.code).join("")
}
// @from(Start 8787232, End 8787271)
function LS1(A) {
  return G31([], A)
}
// @from(Start 8787273, End 8787522)
function G31(A, B) {
  let Q = [...A];
  for (let I of B)
    if (I.code === nB.reset.open) Q = [];
    else if (Q31.has(I.code)) Q = Q.filter((G) => G.endCode !== I.code);
  else Q = Q.filter((G) => G.endCode !== I.endCode), Q.push(I);
  return Q
}
// @from(Start 8787524, End 8787619)
function RS1(A) {
  return LS1(A).reverse().map((B) => ({
    ...B,
    code: B.endCode
  }))
}
// @from(Start 8787621, End 8787816)
function Z31(A, B) {
  let Q = new Set(B.map((G) => G.endCode)),
    I = new Set(A.map((G) => G.code));
  return [...RS1(A.filter((G) => !Q.has(G.endCode))), ...B.filter((G) => !I.has(G.code))]
}
// @from(Start 8787818, End 8788013)
function ThA(A) {
  let B = [],
    Q = [];
  for (let I of A)
    if (I.type === "ansi") B = G31(B, [I]);
    else if (I.type === "char") Q.push({
    ...I,
    styles: [...B]
  });
  return Q
}
// @from(Start 8788015, End 8788275)
function PhA(A) {
  let B = "";
  for (let Q = 0; Q < A.length; Q++) {
    let I = A[Q];
    if (Q === 0) B += Pn(I.styles);
    else B += Pn(Z31(A[Q - 1].styles, I.styles));
    if (B += I.value, Q === A.length - 1) B += Pn(Z31(I.styles, []))
  }
  return B
}
// @from(Start 8788277, End 8788417)
function GA4(A) {
  for (let B = 0; B < A.length; B++) {
    let Q = A.charCodeAt(B);
    if (Q >= 48 && Q <= 57) return B
  }
  return -1
}
// @from(Start 8788419, End 8788634)
function ZA4(A, B) {
  A = A.slice(B);
  for (let I = 1; I < MS1.length; I++)
    if (A.charCodeAt(I) !== MS1[I]) return;
  let Q = A.indexOf("\x07", I31.length);
  if (Q === -1) return;
  return A.slice(0, Q + 1)
}
// @from(Start 8788636, End 8788816)
function DA4(A, B) {
  A = A.slice(B, B + 19);
  let Q = GA4(A);
  if (Q !== -1) {
    let I = A.indexOf("m", Q);
    if (I === -1) I = A.length;
    return A.slice(0, I + 1)
  }
}
// @from(Start 8788818, End 8789386)
function ShA(A, B = Number.POSITIVE_INFINITY) {
  let Q = [],
    I = 0,
    G = 0;
  while (I < A.length) {
    let Z = A.codePointAt(I);
    if (LhA.has(Z)) {
      let W = ZA4(A, I) || DA4(A, I);
      if (W) {
        Q.push({
          type: "ansi",
          code: W,
          endCode: OhA(W)
        }), I += W.length;
        continue
      }
    }
    let D = zn(Z),
      Y = String.fromCodePoint(Z);
    if (Q.push({
        type: "char",
        value: Y,
        fullWidth: D
      }), I += Y.length, G += D ? 2 : Y.length, G >= B) break
  }
  return Q
}
// @from(Start 8789387, End 8792426)
class Sn {
  width;
  height;
  operations = [];
  charCache = {};
  styledCharsToStringCache = {};
  constructor(A) {
    let {
      width: B,
      height: Q
    } = A;
    this.width = B, this.height = Q
  }
  write(A, B, Q, I) {
    let {
      transformers: G
    } = I;
    if (!Q) return;
    this.operations.push({
      type: "write",
      x: A,
      y: B,
      text: Q,
      transformers: G
    })
  }
  clip(A) {
    this.operations.push({
      type: "clip",
      clip: A
    })
  }
  unclip() {
    this.operations.push({
      type: "unclip"
    })
  }
  get() {
    let A = [];
    for (let I = 0; I < this.height; I++) {
      let G = [];
      for (let Z = 0; Z < this.width; Z++) G.push({
        type: "char",
        value: " ",
        fullWidth: !1,
        styles: []
      });
      A.push(G)
    }
    let B = [];
    for (let I of this.operations) {
      if (I.type === "clip") B.push(I.clip);
      if (I.type === "unclip") B.pop();
      if (I.type === "write") {
        let {
          text: G,
          transformers: Z
        } = I, {
          x: D,
          y: Y
        } = I, W = G.split(`
`), J = B.at(-1);
        if (J) {
          let X = typeof J?.x1 === "number" && typeof J?.x2 === "number",
            V = typeof J?.y1 === "number" && typeof J?.y2 === "number";
          if (X) {
            let C = pv(G);
            if (D + C < J.x1 || D > J.x2) continue
          }
          if (V) {
            let C = W.length;
            if (Y + C < J.y1 || Y > J.y2) continue
          }
          if (X) {
            if (W = W.map((C) => {
                let K = D < J.x1 ? J.x1 - D : 0,
                  E = Kn(C),
                  N = D + E > J.x2 ? J.x2 - D : E;
                return $S1(C, K, N)
              }), D < J.x1) D = J.x1
          }
          if (V) {
            let C = Y < J.y1 ? J.y1 - Y : 0,
              K = W.length,
              E = Y + K > J.y2 ? J.y2 - Y : K;
            if (W = W.slice(C, E), Y < J.y1) Y = J.y1
          }
        }
        let F = 0;
        for (let [X, V] of W.entries()) {
          let C = A[Y + F];
          if (!C) continue;
          for (let N of Z) V = N(V, X);
          if (!this.charCache.hasOwnProperty(V)) this.charCache[V] = ThA(ShA(V));
          let K = this.charCache[V],
            E = D;
          for (let N of K) {
            C[E] = N;
            let q = N.fullWidth || N.value.length > 1;
            if (q) C[E + 1] = {
              type: "char",
              value: "",
              fullWidth: !1,
              styles: N.styles
            };
            E += q ? 2 : 1
          }
          F++
        }
      }
    }
    return {
      output: A.map((I) => {
        let G = I.filter((D) => D !== void 0),
          Z = JSON.stringify(G);
        if (!this.styledCharsToStringCache.hasOwnProperty(Z)) {
          let D = PhA(G).trimEnd();
          this.styledCharsToStringCache[Z] = D
        }
        return this.styledCharsToStringCache[Z]
      }).join(`
`),
      height: A.length
    }
  }
}
// @from(Start 8792431, End 8793220)
YA4 = (A, B) => {
    if (A.yogaNode) {
      let Q = new Sn({
        width: A.yogaNode.getComputedWidth(),
        height: A.yogaNode.getComputedHeight()
      });
      wS1(A, Q, {
        skipStaticElements: !0,
        theme: B
      });
      let I;
      if (A.staticNode?.yogaNode) I = new Sn({
        width: A.staticNode.yogaNode.getComputedWidth(),
        height: A.staticNode.yogaNode.getComputedHeight()
      }), wS1(A.staticNode, I, {
        skipStaticElements: !1,
        theme: B
      });
      let {
        output: G,
        height: Z
      } = Q.get();
      return {
        output: G,
        outputHeight: Z,
        staticOutput: I ? `${I.get().output}
` : ""
      }
    }
    return {
      output: "",
      outputHeight: 0,
      staticOutput: ""
    }
  }
// @from(Start 8793224, End 8793233)
_hA = YA4
// @from(Start 8793271, End 8793289)
bhA = I1(xhA(), 1)
// @from(Start 8793293, End 8793311)
ghA = I1(vhA(), 1)
// @from(Start 8793349, End 8793476)
FA4 = bhA.default(() => {
    ghA.default(() => {
      JA4.stderr.write("\x1B[?25h")
    }, {
      alwaysLast: !0
    })
  })
// @from(Start 8793480, End 8793489)
hhA = FA4
// @from(Start 8793495, End 8793503)
X31 = !1
// @from(Start 8793507, End 8793514)
tv = {}
// @from(Start 8793808, End 8793815)
ev = tv
// @from(Start 8793821, End 8794332)
XA4 = (A, {
    showCursor: B = !1
  } = {}) => {
    let Q = 0,
      I = "",
      G = !1,
      Z = (D) => {
        if (!B && !G) ev.hide(), G = !0;
        let Y = D + `
`;
        if (Y === I) return;
        I = Y, A.write(BL.eraseLines(Q) + Y), Q = Y.split(`
`).length
      };
    return Z.clear = () => {
      A.write(BL.eraseLines(Q)), I = "", Q = 0
    }, Z.updateLineCount = (D) => {
      Q = D.split(`
`).length
    }, Z.done = () => {
      if (I = "", Q = 0, !B) ev.show(), G = !1
    }, Z
  }
// @from(Start 8794336, End 8794363)
VA4 = {
    create: XA4
  }
// @from(Start 8794367, End 8794376)
dhA = VA4
// @from(Start 8794382, End 8794395)
CA4 = new Map
// @from(Start 8794399, End 8794407)
fS = CA4
// @from(Start 8794413, End 8794429)
Sz = I1(U1(), 1)
// @from(Start 8794488, End 8794505)
uhA = I1(U1(), 1)
// @from(Start 8794509, End 8794553)
phA = uhA.createContext({
    exit() {}
  })
// @from(Start 8794599, End 8794608)
jS1 = phA
// @from(Start 8794614, End 8794631)
chA = I1(U1(), 1)
// @from(Start 8794690, End 8794848)
lhA = chA.createContext({
  stdin: process.stdin,
  internal_eventEmitter: new KA4,
  setRawMode() {},
  isRawModeSupported: !1,
  internal_exitOnCtrlC: !0
})
// @from(Start 8794896, End 8794905)
V31 = lhA
// @from(Start 8794911, End 8794928)
ihA = I1(U1(), 1)
// @from(Start 8794932, End 8795005)
nhA = ihA.createContext({
    stdout: process.stdout,
    write() {}
  })
// @from(Start 8795054, End 8795063)
yS1 = nhA
// @from(Start 8795069, End 8795086)
ahA = I1(U1(), 1)
// @from(Start 8795090, End 8795163)
shA = ahA.createContext({
    stderr: process.stderr,
    write() {}
  })
// @from(Start 8795212, End 8795221)
kS1 = shA
// @from(Start 8795227, End 8795244)
rhA = I1(U1(), 1)
// @from(Start 8795248, End 8795475)
ohA = rhA.createContext({
    activeId: void 0,
    add() {},
    remove() {},
    activate() {},
    deactivate() {},
    enableFocus() {},
    disableFocus() {},
    focusNext() {},
    focusPrevious() {},
    focus() {}
  })
// @from(Start 8795523, End 8795532)
C31 = ohA
// @from(Start 8795538, End 8795554)
G7 = I1(U1(), 1)
// @from(Start 8795558, End 8795576)
bS1 = I1(ImA(), 1)
// @from(Start 8795659, End 8795748)
$A4 = (A, B = 2) => {
    return A.replace(/^\t+/gm, (Q) => " ".repeat(Q.length * B))
  }
// @from(Start 8795752, End 8795761)
GmA = $A4
// @from(Start 8795767, End 8795895)
qA4 = (A, B) => {
    let Q = [],
      I = A - B,
      G = A + B;
    for (let Z = I; Z <= G; Z++) Q.push(Z);
    return Q
  }
// @from(Start 8795899, End 8796322)
MA4 = (A, B, Q = {}) => {
    var I;
    if (typeof A !== "string") throw new TypeError("Source code is missing.");
    if (!B || B < 1) throw new TypeError("Line number must start from `1`.");
    let G = GmA(A).split(/\r?\n/);
    if (B > G.length) return;
    return qA4(B, (I = Q.around) !== null && I !== void 0 ? I : 3).filter((Z) => G[Z - 1] !== void 0).map((Z) => ({
      line: Z,
      value: G[Z - 1]
    }))
  }
// @from(Start 8796326, End 8796335)
ZmA = MA4
// @from(Start 8796341, End 8796358)
K31 = I1(U1(), 1)
// @from(Start 8796362, End 8796657)
fS1 = K31.forwardRef(({
    children: A,
    ...B
  }, Q) => {
    return K31.default.createElement("ink-box", {
      ref: Q,
      style: {
        ...B,
        overflowX: B.overflowX ?? B.overflow ?? "visible",
        overflowY: B.overflowY ?? B.overflow ?? "visible"
      }
    }, A)
  })
// @from(Start 8796789, End 8796796)
h = fS1
// @from(Start 8796802, End 8796819)
WmA = I1(U1(), 1)
// @from(Start 8796825, End 8796842)
H31 = I1(U1(), 1)
// @from(Start 8796846, End 8796862)
Ab = I1(U1(), 1)
// @from(Start 8796868, End 8796908)
DmA = Ab.createContext([null, (A) => A])
// @from(Start 8796911, End 8797063)
function vS1({
  children: A,
  initialState: B
}) {
  let Q = Ab.useState(B);
  return H31.default.createElement(DmA.Provider, {
    value: Q
  }, A)
}
// @from(Start 8797065, End 8797258)
function q9() {
  let [A, B] = Ab.useContext(DmA);
  return H31.useMemo(() => {
    return [A, (Q) => {
      j0({
        ...ZA(),
        theme: Q
      }), B(Q), YmA(Q)
    }]
  }, [A, B])
}