
// @from(Start 3182562, End 3199882)
$nA = z((uQ8, bQ1) => {
  var niA, aiA, siA, riA, oiA, tiA, eiA, AnA, BnA, QnA, InA, GnA, ZnA, fQ1, i_1, DnA, YnA, WnA, Xb, JnA, FnA, XnA, VnA, CnA, KnA, HnA, znA, wnA, vQ1, EnA, UnA, NnA;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof bQ1 === "object" && typeof uQ8 === "object") A(Q(B, Q(uQ8)));
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
    niA = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, aiA = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, siA = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, riA = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, oiA = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, tiA = function(Z, D, Y, W, J, F) {
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
    }, eiA = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, AnA = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, BnA = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, QnA = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, InA = function(Z, D, Y, W) {
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
    }, GnA = function(Z, D) {
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
    }, ZnA = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) vQ1(D, Z, Y)
    }, vQ1 = Object.create ? function(Z, D, Y, W) {
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
    }, fQ1 = function(Z) {
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
    }, i_1 = function(Z, D) {
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
    }, DnA = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat(i_1(arguments[D]));
      return Z
    }, YnA = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, WnA = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, Xb = function(Z) {
      return this instanceof Xb ? (this.v = Z, this) : new Xb(Z)
    }, JnA = function(Z, D, Y) {
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
        O.value instanceof Xb ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
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
    }, FnA = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: Xb(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, XnA = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof fQ1 === "function" ? fQ1(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
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
    }, VnA = function(Z, D) {
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
    CnA = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") vQ1(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, KnA = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, HnA = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, znA = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, wnA = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, EnA = function(Z, D, Y) {
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
    UnA = function(Z) {
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
    }, NnA = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", niA), A("__assign", aiA), A("__rest", siA), A("__decorate", riA), A("__param", oiA), A("__esDecorate", tiA), A("__runInitializers", eiA), A("__propKey", AnA), A("__setFunctionName", BnA), A("__metadata", QnA), A("__awaiter", InA), A("__generator", GnA), A("__exportStar", ZnA), A("__createBinding", vQ1), A("__values", fQ1), A("__read", i_1), A("__spread", DnA), A("__spreadArrays", YnA), A("__spreadArray", WnA), A("__await", Xb), A("__asyncGenerator", JnA), A("__asyncDelegator", FnA), A("__asyncValues", XnA), A("__makeTemplateObject", VnA), A("__importStar", CnA), A("__importDefault", KnA), A("__classPrivateFieldGet", HnA), A("__classPrivateFieldSet", znA), A("__classPrivateFieldIn", wnA), A("__addDisposableResource", EnA), A("__disposeResources", UnA), A("__rewriteRelativeImportExtension", NnA)
  })
})
// @from(Start 3199888, End 3201710)
NC = z((pQ8, RnA) => {
  var {
    defineProperty: gQ1,
    getOwnPropertyDescriptor: h34,
    getOwnPropertyNames: m34
  } = Object, d34 = Object.prototype.hasOwnProperty, a_1 = (A, B) => gQ1(A, "name", {
    value: B,
    configurable: !0
  }), u34 = (A, B) => {
    for (var Q in B) gQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, p34 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of m34(B))
        if (!d34.call(A, G) && G !== Q) gQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = h34(B, G)) || I.enumerable
        })
    }
    return A
  }, c34 = (A) => p34(gQ1({}, "__esModule", {
    value: !0
  }), A), qnA = {};
  u34(qnA, {
    emitWarningIfUnsupportedVersion: () => l34,
    setCredentialFeature: () => MnA,
    setFeature: () => LnA,
    state: () => n_1
  });
  RnA.exports = c34(qnA);
  var n_1 = {
      warningEmitted: !1
    },
    l34 = a_1((A) => {
      if (A && !n_1.warningEmitted && parseInt(A.substring(1, A.indexOf("."))) < 18) n_1.warningEmitted = !0, process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)
    }, "emitWarningIfUnsupportedVersion");

  function MnA(A, B, Q) {
    if (!A.$source) A.$source = {};
    return A.$source[B] = Q, A
  }
  a_1(MnA, "setCredentialFeature");

  function LnA(A, B, Q) {
    if (!A.__aws_sdk_context) A.__aws_sdk_context = {
      features: {}
    };
    else if (!A.__aws_sdk_context.features) A.__aws_sdk_context.features = {};
    A.__aws_sdk_context.features[B] = Q
  }
  a_1(LnA, "setFeature")
})
// @from(Start 3201716, End 3204499)
s_1 = z((cQ8, xnA) => {
  var {
    defineProperty: hQ1,
    getOwnPropertyDescriptor: i34,
    getOwnPropertyNames: n34
  } = Object, a34 = Object.prototype.hasOwnProperty, mQ1 = (A, B) => hQ1(A, "name", {
    value: B,
    configurable: !0
  }), s34 = (A, B) => {
    for (var Q in B) hQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, r34 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of n34(B))
        if (!a34.call(A, G) && G !== Q) hQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = i34(B, G)) || I.enumerable
        })
    }
    return A
  }, o34 = (A) => r34(hQ1({}, "__esModule", {
    value: !0
  }), A), OnA = {};
  s34(OnA, {
    AlgorithmId: () => _nA,
    EndpointURLScheme: () => SnA,
    FieldPosition: () => jnA,
    HttpApiKeyAuthLocation: () => PnA,
    HttpAuthLocation: () => TnA,
    IniSectionType: () => ynA,
    RequestHandlerProtocol: () => knA,
    SMITHY_CONTEXT_KEY: () => QQ4,
    getDefaultClientConfiguration: () => AQ4,
    resolveDefaultRuntimeConfig: () => BQ4
  });
  xnA.exports = o34(OnA);
  var TnA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(TnA || {}),
    PnA = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(PnA || {}),
    SnA = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(SnA || {}),
    _nA = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(_nA || {}),
    t34 = mQ1((A) => {
      let B = [];
      if (A.sha256 !== void 0) B.push({
        algorithmId: () => "sha256",
        checksumConstructor: () => A.sha256
      });
      if (A.md5 != null) B.push({
        algorithmId: () => "md5",
        checksumConstructor: () => A.md5
      });
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    e34 = mQ1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    AQ4 = mQ1((A) => {
      return t34(A)
    }, "getDefaultClientConfiguration"),
    BQ4 = mQ1((A) => {
      return e34(A)
    }, "resolveDefaultRuntimeConfig"),
    jnA = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(jnA || {}),
    QQ4 = "__smithy_context",
    ynA = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(ynA || {}),
    knA = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(knA || {})
})
// @from(Start 3204505, End 3209011)
nn = z((lQ8, hnA) => {
  var {
    defineProperty: dQ1,
    getOwnPropertyDescriptor: IQ4,
    getOwnPropertyNames: GQ4
  } = Object, ZQ4 = Object.prototype.hasOwnProperty, TL = (A, B) => dQ1(A, "name", {
    value: B,
    configurable: !0
  }), DQ4 = (A, B) => {
    for (var Q in B) dQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, YQ4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of GQ4(B))
        if (!ZQ4.call(A, G) && G !== Q) dQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = IQ4(B, G)) || I.enumerable
        })
    }
    return A
  }, WQ4 = (A) => YQ4(dQ1({}, "__esModule", {
    value: !0
  }), A), fnA = {};
  DQ4(fnA, {
    Field: () => XQ4,
    Fields: () => VQ4,
    HttpRequest: () => CQ4,
    HttpResponse: () => KQ4,
    IHttpRequest: () => vnA.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => JQ4,
    isValidHostname: () => gnA,
    resolveHttpHandlerRuntimeConfig: () => FQ4
  });
  hnA.exports = WQ4(fnA);
  var JQ4 = TL((A) => {
      return {
        setHttpHandler(B) {
          A.httpHandler = B
        },
        httpHandler() {
          return A.httpHandler
        },
        updateHttpClientConfig(B, Q) {
          A.httpHandler?.updateHttpClientConfig(B, Q)
        },
        httpHandlerConfigs() {
          return A.httpHandler.httpHandlerConfigs()
        }
      }
    }, "getHttpHandlerExtensionConfiguration"),
    FQ4 = TL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    vnA = s_1(),
    XQ4 = class {
      static {
        TL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = vnA.FieldPosition.HEADER,
        values: Q = []
      }) {
        this.name = A, this.kind = B, this.values = Q
      }
      add(A) {
        this.values.push(A)
      }
      set(A) {
        this.values = A
      }
      remove(A) {
        this.values = this.values.filter((B) => B !== A)
      }
      toString() {
        return this.values.map((A) => A.includes(",") || A.includes(" ") ? `"${A}"` : A).join(", ")
      }
      get() {
        return this.values
      }
    },
    VQ4 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        TL(this, "Fields")
      }
      setField(A) {
        this.entries[A.name.toLowerCase()] = A
      }
      getField(A) {
        return this.entries[A.toLowerCase()]
      }
      removeField(A) {
        delete this.entries[A.toLowerCase()]
      }
      getByType(A) {
        return Object.values(this.entries).filter((B) => B.kind === A)
      }
    },
    CQ4 = class A {
      static {
        TL(this, "HttpRequest")
      }
      constructor(B) {
        this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
      }
      static clone(B) {
        let Q = new A({
          ...B,
          headers: {
            ...B.headers
          }
        });
        if (Q.query) Q.query = bnA(Q.query);
        return Q
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
      }
      clone() {
        return A.clone(this)
      }
    };

  function bnA(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  TL(bnA, "cloneQuery");
  var KQ4 = class {
    static {
      TL(this, "HttpResponse")
    }
    constructor(A) {
      this.statusCode = A.statusCode, this.reason = A.reason, this.headers = A.headers || {}, this.body = A.body
    }
    static isInstance(A) {
      if (!A) return !1;
      let B = A;
      return typeof B.statusCode === "number" && typeof B.headers === "object"
    }
  };

  function gnA(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  TL(gnA, "isValidHostname")
})
// @from(Start 3209017, End 3212009)
$I = z((sQ8, dnA) => {
  var {
    defineProperty: uQ1,
    getOwnPropertyDescriptor: HQ4,
    getOwnPropertyNames: zQ4
  } = Object, wQ4 = Object.prototype.hasOwnProperty, nS = (A, B) => uQ1(A, "name", {
    value: B,
    configurable: !0
  }), EQ4 = (A, B) => {
    for (var Q in B) uQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, UQ4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of zQ4(B))
        if (!wQ4.call(A, G) && G !== Q) uQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = HQ4(B, G)) || I.enumerable
        })
    }
    return A
  }, NQ4 = (A) => UQ4(uQ1({}, "__esModule", {
    value: !0
  }), A), mnA = {};
  EQ4(mnA, {
    CredentialsProviderError: () => $Q4,
    ProviderError: () => pQ1,
    TokenProviderError: () => qQ4,
    chain: () => MQ4,
    fromStatic: () => LQ4,
    memoize: () => RQ4
  });
  dnA.exports = NQ4(mnA);
  var pQ1 = class A extends Error {
      constructor(B, Q = !0) {
        let I, G = !0;
        if (typeof Q === "boolean") I = void 0, G = Q;
        else if (Q != null && typeof Q === "object") I = Q.logger, G = Q.tryNextLink ?? !0;
        super(B);
        this.name = "ProviderError", this.tryNextLink = G, Object.setPrototypeOf(this, A.prototype), I?.debug?.(`@smithy/property-provider ${G?"->":"(!)"} ${B}`)
      }
      static {
        nS(this, "ProviderError")
      }
      static from(B, Q = !0) {
        return Object.assign(new this(B.message, Q), B)
      }
    },
    $Q4 = class A extends pQ1 {
      constructor(B, Q = !0) {
        super(B, Q);
        this.name = "CredentialsProviderError", Object.setPrototypeOf(this, A.prototype)
      }
      static {
        nS(this, "CredentialsProviderError")
      }
    },
    qQ4 = class A extends pQ1 {
      constructor(B, Q = !0) {
        super(B, Q);
        this.name = "TokenProviderError", Object.setPrototypeOf(this, A.prototype)
      }
      static {
        nS(this, "TokenProviderError")
      }
    },
    MQ4 = nS((...A) => async () => {
      if (A.length === 0) throw new pQ1("No providers in chain");
      let B;
      for (let Q of A) try {
        return await Q()
      } catch (I) {
        if (B = I, I?.tryNextLink) continue;
        throw I
      }
      throw B
    }, "chain"),
    LQ4 = nS((A) => () => Promise.resolve(A), "fromStatic"),
    RQ4 = nS((A, B, Q) => {
      let I, G, Z, D = !1,
        Y = nS(async () => {
          if (!G) G = A();
          try {
            I = await G, Z = !0, D = !1
          } finally {
            G = void 0
          }
          return I
        }, "coalesceProvider");
      if (B === void 0) return async (W) => {
        if (!Z || W?.forceRefresh) I = await Y();
        return I
      };
      return async (W) => {
        if (!Z || W?.forceRefresh) I = await Y();
        if (D) return I;
        if (Q && !Q(I)) return D = !0, I;
        if (B(I)) return await Y(), I;
        return I
      }
    }, "memoize")
})
// @from(Start 3212015, End 3212968)
cnA = z((rQ8, pnA) => {
  var {
    defineProperty: cQ1,
    getOwnPropertyDescriptor: OQ4,
    getOwnPropertyNames: TQ4
  } = Object, PQ4 = Object.prototype.hasOwnProperty, SQ4 = (A, B) => cQ1(A, "name", {
    value: B,
    configurable: !0
  }), _Q4 = (A, B) => {
    for (var Q in B) cQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, jQ4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of TQ4(B))
        if (!PQ4.call(A, G) && G !== Q) cQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = OQ4(B, G)) || I.enumerable
        })
    }
    return A
  }, yQ4 = (A) => jQ4(cQ1({}, "__esModule", {
    value: !0
  }), A), unA = {};
  _Q4(unA, {
    isArrayBuffer: () => kQ4
  });
  pnA.exports = yQ4(unA);
  var kQ4 = SQ4((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
})
// @from(Start 3212974, End 3214027)
anA = z((oQ8, nnA) => {
  var {
    defineProperty: lQ1,
    getOwnPropertyDescriptor: xQ4,
    getOwnPropertyNames: fQ4
  } = Object, vQ4 = Object.prototype.hasOwnProperty, r_1 = (A, B) => lQ1(A, "name", {
    value: B,
    configurable: !0
  }), bQ4 = (A, B) => {
    for (var Q in B) lQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, gQ4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of fQ4(B))
        if (!vQ4.call(A, G) && G !== Q) lQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = xQ4(B, G)) || I.enumerable
        })
    }
    return A
  }, hQ4 = (A) => gQ4(lQ1({}, "__esModule", {
    value: !0
  }), A), lnA = {};
  bQ4(lnA, {
    escapeUri: () => inA,
    escapeUriPath: () => dQ4
  });
  nnA.exports = hQ4(lnA);
  var inA = r_1((A) => encodeURIComponent(A).replace(/[!'()*]/g, mQ4), "escapeUri"),
    mQ4 = r_1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
    dQ4 = r_1((A) => A.split("/").map(inA).join("/"), "escapeUriPath")
})
// @from(Start 3214033, End 3230850)
qaA = z((tQ8, $aA) => {
  var {
    defineProperty: tQ1,
    getOwnPropertyDescriptor: uQ4,
    getOwnPropertyNames: pQ4
  } = Object, cQ4 = Object.prototype.hasOwnProperty, LG = (A, B) => tQ1(A, "name", {
    value: B,
    configurable: !0
  }), lQ4 = (A, B) => {
    for (var Q in B) tQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, iQ4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of pQ4(B))
        if (!cQ4.call(A, G) && G !== Q) tQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = uQ4(B, G)) || I.enumerable
        })
    }
    return A
  }, nQ4 = (A) => iQ4(tQ1({}, "__esModule", {
    value: !0
  }), A), enA = {};
  lQ4(enA, {
    ALGORITHM_IDENTIFIER: () => iQ1,
    ALGORITHM_IDENTIFIER_V4A: () => oQ4,
    ALGORITHM_QUERY_PARAM: () => AaA,
    ALWAYS_UNSIGNABLE_HEADERS: () => WaA,
    AMZ_DATE_HEADER: () => Gj1,
    AMZ_DATE_QUERY_PARAM: () => Aj1,
    AUTH_HEADER: () => Ij1,
    CREDENTIAL_QUERY_PARAM: () => BaA,
    DATE_HEADER: () => GaA,
    EVENT_ALGORITHM_IDENTIFIER: () => XaA,
    EXPIRES_QUERY_PARAM: () => IaA,
    GENERATED_HEADERS: () => ZaA,
    HOST_HEADER: () => sQ4,
    KEY_TYPE_IDENTIFIER: () => Zj1,
    MAX_CACHE_SIZE: () => CaA,
    MAX_PRESIGNED_TTL: () => KaA,
    PROXY_HEADER_PATTERN: () => JaA,
    REGION_SET_PARAM: () => aQ4,
    SEC_HEADER_PATTERN: () => FaA,
    SHA256_HEADER: () => oQ1,
    SIGNATURE_HEADER: () => DaA,
    SIGNATURE_QUERY_PARAM: () => Bj1,
    SIGNED_HEADERS_QUERY_PARAM: () => QaA,
    SignatureV4: () => W74,
    SignatureV4Base: () => NaA,
    TOKEN_HEADER: () => YaA,
    TOKEN_QUERY_PARAM: () => Qj1,
    UNSIGNABLE_PATTERNS: () => rQ4,
    UNSIGNED_PAYLOAD: () => VaA,
    clearCredentialCache: () => eQ4,
    createScope: () => aQ1,
    getCanonicalHeaders: () => o_1,
    getCanonicalQuery: () => UaA,
    getPayloadHash: () => sQ1,
    getSigningKey: () => HaA,
    hasHeader: () => zaA,
    moveHeadersToQuery: () => EaA,
    prepareRequest: () => e_1,
    signatureV4aContainer: () => J74
  });
  $aA.exports = nQ4(enA);
  var snA = RQ(),
    AaA = "X-Amz-Algorithm",
    BaA = "X-Amz-Credential",
    Aj1 = "X-Amz-Date",
    QaA = "X-Amz-SignedHeaders",
    IaA = "X-Amz-Expires",
    Bj1 = "X-Amz-Signature",
    Qj1 = "X-Amz-Security-Token",
    aQ4 = "X-Amz-Region-Set",
    Ij1 = "authorization",
    Gj1 = Aj1.toLowerCase(),
    GaA = "date",
    ZaA = [Ij1, Gj1, GaA],
    DaA = Bj1.toLowerCase(),
    oQ1 = "x-amz-content-sha256",
    YaA = Qj1.toLowerCase(),
    sQ4 = "host",
    WaA = {
      authorization: !0,
      "cache-control": !0,
      connection: !0,
      expect: !0,
      from: !0,
      "keep-alive": !0,
      "max-forwards": !0,
      pragma: !0,
      referer: !0,
      te: !0,
      trailer: !0,
      "transfer-encoding": !0,
      upgrade: !0,
      "user-agent": !0,
      "x-amzn-trace-id": !0
    },
    JaA = /^proxy-/,
    FaA = /^sec-/,
    rQ4 = [/^proxy-/i, /^sec-/i],
    iQ1 = "AWS4-HMAC-SHA256",
    oQ4 = "AWS4-ECDSA-P256-SHA256",
    XaA = "AWS4-HMAC-SHA256-PAYLOAD",
    VaA = "UNSIGNED-PAYLOAD",
    CaA = 50,
    Zj1 = "aws4_request",
    KaA = 604800,
    PL = MQ1(),
    tQ4 = RQ(),
    Vb = {},
    nQ1 = [],
    aQ1 = LG((A, B, Q) => `${A}/${B}/${Q}/${Zj1}`, "createScope"),
    HaA = LG(async (A, B, Q, I, G) => {
      let Z = await rnA(A, B.secretAccessKey, B.accessKeyId),
        D = `${Q}:${I}:${G}:${PL.toHex(Z)}:${B.sessionToken}`;
      if (D in Vb) return Vb[D];
      nQ1.push(D);
      while (nQ1.length > CaA) delete Vb[nQ1.shift()];
      let Y = `AWS4${B.secretAccessKey}`;
      for (let W of [Q, I, G, Zj1]) Y = await rnA(A, Y, W);
      return Vb[D] = Y
    }, "getSigningKey"),
    eQ4 = LG(() => {
      nQ1.length = 0, Object.keys(Vb).forEach((A) => {
        delete Vb[A]
      })
    }, "clearCredentialCache"),
    rnA = LG((A, B, Q) => {
      let I = new A(B);
      return I.update(tQ4.toUint8Array(Q)), I.digest()
    }, "hmac"),
    o_1 = LG(({
      headers: A
    }, B, Q) => {
      let I = {};
      for (let G of Object.keys(A).sort()) {
        if (A[G] == null) continue;
        let Z = G.toLowerCase();
        if (Z in WaA || B?.has(Z) || JaA.test(Z) || FaA.test(Z)) {
          if (!Q || Q && !Q.has(Z)) continue
        }
        I[Z] = A[G].trim().replace(/\s+/g, " ")
      }
      return I
    }, "getCanonicalHeaders"),
    A74 = cnA(),
    B74 = RQ(),
    sQ1 = LG(async ({
      headers: A,
      body: B
    }, Q) => {
      for (let I of Object.keys(A))
        if (I.toLowerCase() === oQ1) return A[I];
      if (B == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
      else if (typeof B === "string" || ArrayBuffer.isView(B) || A74.isArrayBuffer(B)) {
        let I = new Q;
        return I.update(B74.toUint8Array(B)), PL.toHex(await I.digest())
      }
      return VaA
    }, "getPayloadHash"),
    onA = RQ(),
    Q74 = class {
      static {
        LG(this, "HeaderFormatter")
      }
      format(A) {
        let B = [];
        for (let G of Object.keys(A)) {
          let Z = onA.fromUtf8(G);
          B.push(Uint8Array.from([Z.byteLength]), Z, this.formatHeaderValue(A[G]))
        }
        let Q = new Uint8Array(B.reduce((G, Z) => G + Z.byteLength, 0)),
          I = 0;
        for (let G of B) Q.set(G, I), I += G.byteLength;
        return Q
      }
      formatHeaderValue(A) {
        switch (A.type) {
          case "boolean":
            return Uint8Array.from([A.value ? 0 : 1]);
          case "byte":
            return Uint8Array.from([2, A.value]);
          case "short":
            let B = new DataView(new ArrayBuffer(3));
            return B.setUint8(0, 3), B.setInt16(1, A.value, !1), new Uint8Array(B.buffer);
          case "integer":
            let Q = new DataView(new ArrayBuffer(5));
            return Q.setUint8(0, 4), Q.setInt32(1, A.value, !1), new Uint8Array(Q.buffer);
          case "long":
            let I = new Uint8Array(9);
            return I[0] = 5, I.set(A.value.bytes, 1), I;
          case "binary":
            let G = new DataView(new ArrayBuffer(3 + A.value.byteLength));
            G.setUint8(0, 6), G.setUint16(1, A.value.byteLength, !1);
            let Z = new Uint8Array(G.buffer);
            return Z.set(A.value, 3), Z;
          case "string":
            let D = onA.fromUtf8(A.value),
              Y = new DataView(new ArrayBuffer(3 + D.byteLength));
            Y.setUint8(0, 7), Y.setUint16(1, D.byteLength, !1);
            let W = new Uint8Array(Y.buffer);
            return W.set(D, 3), W;
          case "timestamp":
            let J = new Uint8Array(9);
            return J[0] = 8, J.set(G74.fromNumber(A.value.valueOf()).bytes, 1), J;
          case "uuid":
            if (!I74.test(A.value)) throw new Error(`Invalid UUID received: ${A.value}`);
            let F = new Uint8Array(17);
            return F[0] = 9, F.set(PL.fromHex(A.value.replace(/\-/g, "")), 1), F
        }
      }
    },
    I74 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    G74 = class A {
      constructor(B) {
        if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
      }
      static {
        LG(this, "Int64")
      }
      static fromNumber(B) {
        if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
        let Q = new Uint8Array(8);
        for (let I = 7, G = Math.abs(Math.round(B)); I > -1 && G > 0; I--, G /= 256) Q[I] = G;
        if (B < 0) t_1(Q);
        return new A(Q)
      }
      valueOf() {
        let B = this.bytes.slice(0),
          Q = B[0] & 128;
        if (Q) t_1(B);
        return parseInt(PL.toHex(B), 16) * (Q ? -1 : 1)
      }
      toString() {
        return String(this.valueOf())
      }
    };

  function t_1(A) {
    for (let B = 0; B < 8; B++) A[B] ^= 255;
    for (let B = 7; B > -1; B--)
      if (A[B]++, A[B] !== 0) break
  }
  LG(t_1, "negate");
  var zaA = LG((A, B) => {
      A = A.toLowerCase();
      for (let Q of Object.keys(B))
        if (A === Q.toLowerCase()) return !0;
      return !1
    }, "hasHeader"),
    waA = nn(),
    EaA = LG((A, B = {}) => {
      let {
        headers: Q,
        query: I = {}
      } = waA.HttpRequest.clone(A);
      for (let G of Object.keys(Q)) {
        let Z = G.toLowerCase();
        if (Z.slice(0, 6) === "x-amz-" && !B.unhoistableHeaders?.has(Z) || B.hoistableHeaders?.has(Z)) I[G] = Q[G], delete Q[G]
      }
      return {
        ...A,
        headers: Q,
        query: I
      }
    }, "moveHeadersToQuery"),
    e_1 = LG((A) => {
      A = waA.HttpRequest.clone(A);
      for (let B of Object.keys(A.headers))
        if (ZaA.indexOf(B.toLowerCase()) > -1) delete A.headers[B];
      return A
    }, "prepareRequest"),
    tnA = ZX(),
    Z74 = RQ(),
    rQ1 = anA(),
    UaA = LG(({
      query: A = {}
    }) => {
      let B = [],
        Q = {};
      for (let I of Object.keys(A)) {
        if (I.toLowerCase() === DaA) continue;
        let G = rQ1.escapeUri(I);
        B.push(G);
        let Z = A[I];
        if (typeof Z === "string") Q[G] = `${G}=${rQ1.escapeUri(Z)}`;
        else if (Array.isArray(Z)) Q[G] = Z.slice(0).reduce((D, Y) => D.concat([`${G}=${rQ1.escapeUri(Y)}`]), []).sort().join("&")
      }
      return B.sort().map((I) => Q[I]).filter((I) => I).join("&")
    }, "getCanonicalQuery"),
    D74 = LG((A) => Y74(A).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601"),
    Y74 = LG((A) => {
      if (typeof A === "number") return new Date(A * 1000);
      if (typeof A === "string") {
        if (Number(A)) return new Date(Number(A) * 1000);
        return new Date(A)
      }
      return A
    }, "toDate"),
    NaA = class {
      static {
        LG(this, "SignatureV4Base")
      }
      constructor({
        applyChecksum: A,
        credentials: B,
        region: Q,
        service: I,
        sha256: G,
        uriEscapePath: Z = !0
      }) {
        this.service = I, this.sha256 = G, this.uriEscapePath = Z, this.applyChecksum = typeof A === "boolean" ? A : !0, this.regionProvider = tnA.normalizeProvider(Q), this.credentialProvider = tnA.normalizeProvider(B)
      }
      createCanonicalRequest(A, B, Q) {
        let I = Object.keys(B).sort();
        return `${A.method}
${this.getCanonicalPath(A)}
${UaA(A)}
${I.map((G)=>`${G}:${B[G]}`).join(`
`)}

${I.join(";")}
${Q}`
      }
      async createStringToSign(A, B, Q, I) {
        let G = new this.sha256;
        G.update(Z74.toUint8Array(Q));
        let Z = await G.digest();
        return `${I}
${A}
${B}
${PL.toHex(Z)}`
      }
      getCanonicalPath({
        path: A
      }) {
        if (this.uriEscapePath) {
          let B = [];
          for (let G of A.split("/")) {
            if (G?.length === 0) continue;
            if (G === ".") continue;
            if (G === "..") B.pop();
            else B.push(G)
          }
          let Q = `${A?.startsWith("/")?"/":""}${B.join("/")}${B.length>0&&A?.endsWith("/")?"/":""}`;
          return rQ1.escapeUri(Q).replace(/%2F/g, "/")
        }
        return A
      }
      validateResolvedCredentials(A) {
        if (typeof A !== "object" || typeof A.accessKeyId !== "string" || typeof A.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid")
      }
      formatDate(A) {
        let B = D74(A).replace(/[\-:]/g, "");
        return {
          longDate: B,
          shortDate: B.slice(0, 8)
        }
      }
      getCanonicalHeaderList(A) {
        return Object.keys(A).sort().join(";")
      }
    },
    W74 = class extends NaA {
      constructor({
        applyChecksum: A,
        credentials: B,
        region: Q,
        service: I,
        sha256: G,
        uriEscapePath: Z = !0
      }) {
        super({
          applyChecksum: A,
          credentials: B,
          region: Q,
          service: I,
          sha256: G,
          uriEscapePath: Z
        });
        this.headerFormatter = new Q74
      }
      static {
        LG(this, "SignatureV4")
      }
      async presign(A, B = {}) {
        let {
          signingDate: Q = new Date,
          expiresIn: I = 3600,
          unsignableHeaders: G,
          unhoistableHeaders: Z,
          signableHeaders: D,
          hoistableHeaders: Y,
          signingRegion: W,
          signingService: J
        } = B, F = await this.credentialProvider();
        this.validateResolvedCredentials(F);
        let X = W ?? await this.regionProvider(),
          {
            longDate: V,
            shortDate: C
          } = this.formatDate(Q);
        if (I > KaA) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
        let K = aQ1(C, X, J ?? this.service),
          E = EaA(e_1(A), {
            unhoistableHeaders: Z,
            hoistableHeaders: Y
          });
        if (F.sessionToken) E.query[Qj1] = F.sessionToken;
        E.query[AaA] = iQ1, E.query[BaA] = `${F.accessKeyId}/${K}`, E.query[Aj1] = V, E.query[IaA] = I.toString(10);
        let N = o_1(E, G, D);
        return E.query[QaA] = this.getCanonicalHeaderList(N), E.query[Bj1] = await this.getSignature(V, K, this.getSigningKey(F, X, C, J), this.createCanonicalRequest(E, N, await sQ1(A, this.sha256))), E
      }
      async sign(A, B) {
        if (typeof A === "string") return this.signString(A, B);
        else if (A.headers && A.payload) return this.signEvent(A, B);
        else if (A.message) return this.signMessage(A, B);
        else return this.signRequest(A, B)
      }
      async signEvent({
        headers: A,
        payload: B
      }, {
        signingDate: Q = new Date,
        priorSignature: I,
        signingRegion: G,
        signingService: Z
      }) {
        let D = G ?? await this.regionProvider(),
          {
            shortDate: Y,
            longDate: W
          } = this.formatDate(Q),
          J = aQ1(Y, D, Z ?? this.service),
          F = await sQ1({
            headers: {},
            body: B
          }, this.sha256),
          X = new this.sha256;
        X.update(A);
        let V = PL.toHex(await X.digest()),
          C = [XaA, W, J, I, V, F].join(`
`);
        return this.signString(C, {
          signingDate: Q,
          signingRegion: D,
          signingService: Z
        })
      }
      async signMessage(A, {
        signingDate: B = new Date,
        signingRegion: Q,
        signingService: I
      }) {
        return this.signEvent({
          headers: this.headerFormatter.format(A.message.headers),
          payload: A.message.body
        }, {
          signingDate: B,
          signingRegion: Q,
          signingService: I,
          priorSignature: A.priorSignature
        }).then((Z) => {
          return {
            message: A.message,
            signature: Z
          }
        })
      }
      async signString(A, {
        signingDate: B = new Date,
        signingRegion: Q,
        signingService: I
      } = {}) {
        let G = await this.credentialProvider();
        this.validateResolvedCredentials(G);
        let Z = Q ?? await this.regionProvider(),
          {
            shortDate: D
          } = this.formatDate(B),
          Y = new this.sha256(await this.getSigningKey(G, Z, D, I));
        return Y.update(snA.toUint8Array(A)), PL.toHex(await Y.digest())
      }
      async signRequest(A, {
        signingDate: B = new Date,
        signableHeaders: Q,
        unsignableHeaders: I,
        signingRegion: G,
        signingService: Z
      } = {}) {
        let D = await this.credentialProvider();
        this.validateResolvedCredentials(D);
        let Y = G ?? await this.regionProvider(),
          W = e_1(A),
          {
            longDate: J,
            shortDate: F
          } = this.formatDate(B),
          X = aQ1(F, Y, Z ?? this.service);
        if (W.headers[Gj1] = J, D.sessionToken) W.headers[YaA] = D.sessionToken;
        let V = await sQ1(W, this.sha256);
        if (!zaA(oQ1, W.headers) && this.applyChecksum) W.headers[oQ1] = V;
        let C = o_1(W, I, Q),
          K = await this.getSignature(J, X, this.getSigningKey(D, Y, F, Z), this.createCanonicalRequest(W, C, V));
        return W.headers[Ij1] = `${iQ1} Credential=${D.accessKeyId}/${X}, SignedHeaders=${this.getCanonicalHeaderList(C)}, Signature=${K}`, W
      }
      async getSignature(A, B, Q, I) {
        let G = await this.createStringToSign(A, B, I, iQ1),
          Z = new this.sha256(await Q);
        return Z.update(snA.toUint8Array(G)), PL.toHex(await Z.digest())
      }
      getSigningKey(A, B, Q, I) {
        return HaA(this.sha256, A, Q, B, I || this.service)
      }
    },
    J74 = {
      SignatureV4a: null
    }
})
// @from(Start 3230856, End 3239418)
yaA = z((Q78, jaA) => {
  var {
    defineProperty: eQ1,
    getOwnPropertyDescriptor: F74,
    getOwnPropertyNames: X74
  } = Object, V74 = Object.prototype.hasOwnProperty, RG = (A, B) => eQ1(A, "name", {
    value: B,
    configurable: !0
  }), C74 = (A, B) => {
    for (var Q in B) eQ1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, K74 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of X74(B))
        if (!V74.call(A, G) && G !== Q) eQ1(A, G, {
          get: () => B[G],
          enumerable: !(I = F74(B, G)) || I.enumerable
        })
    }
    return A
  }, H74 = (A) => K74(eQ1({}, "__esModule", {
    value: !0
  }), A), TaA = {};
  C74(TaA, {
    AWSSDKSigV4Signer: () => U74,
    AwsSdkSigV4ASigner: () => $74,
    AwsSdkSigV4Signer: () => Wj1,
    NODE_SIGV4A_CONFIG_OPTIONS: () => L74,
    resolveAWSSDKSigV4Config: () => O74,
    resolveAwsSdkSigV4AConfig: () => M74,
    resolveAwsSdkSigV4Config: () => PaA,
    validateSigningProperties: () => Yj1
  });
  jaA.exports = H74(TaA);
  var z74 = nn(),
    w74 = nn(),
    MaA = RG((A) => w74.HttpResponse.isInstance(A) ? A.headers?.date ?? A.headers?.Date : void 0, "getDateHeader"),
    Dj1 = RG((A) => new Date(Date.now() + A), "getSkewCorrectedDate"),
    E74 = RG((A, B) => Math.abs(Dj1(B).getTime() - A) >= 300000, "isClockSkewed"),
    LaA = RG((A, B) => {
      let Q = Date.parse(A);
      if (E74(Q, B)) return Q - Date.now();
      return B
    }, "getUpdatedSystemClockOffset"),
    an = RG((A, B) => {
      if (!B) throw new Error(`Property \`${A}\` is not resolved for AWS SDK SigV4Auth`);
      return B
    }, "throwSigningPropertyError"),
    Yj1 = RG(async (A) => {
      let B = an("context", A.context),
        Q = an("config", A.config),
        I = B.endpointV2?.properties?.authSchemes?.[0],
        Z = await an("signer", Q.signer)(I),
        D = A?.signingRegion,
        Y = A?.signingRegionSet,
        W = A?.signingName;
      return {
        config: Q,
        signer: Z,
        signingRegion: D,
        signingRegionSet: Y,
        signingName: W
      }
    }, "validateSigningProperties"),
    Wj1 = class {
      static {
        RG(this, "AwsSdkSigV4Signer")
      }
      async sign(A, B, Q) {
        if (!z74.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
        let I = await Yj1(Q),
          {
            config: G,
            signer: Z
          } = I,
          {
            signingRegion: D,
            signingName: Y
          } = I,
          W = Q.context;
        if (W?.authSchemes?.length ?? 0 > 1) {
          let [F, X] = W.authSchemes;
          if (F?.name === "sigv4a" && X?.name === "sigv4") D = X?.signingRegion ?? D, Y = X?.signingName ?? Y
        }
        return await Z.sign(A, {
          signingDate: Dj1(G.systemClockOffset),
          signingRegion: D,
          signingService: Y
        })
      }
      errorHandler(A) {
        return (B) => {
          let Q = B.ServerTime ?? MaA(B.$response);
          if (Q) {
            let I = an("config", A.config),
              G = I.systemClockOffset;
            if (I.systemClockOffset = LaA(Q, I.systemClockOffset), I.systemClockOffset !== G && B.$metadata) B.$metadata.clockSkewCorrected = !0
          }
          throw B
        }
      }
      successHandler(A, B) {
        let Q = MaA(A);
        if (Q) {
          let I = an("config", B.config);
          I.systemClockOffset = LaA(Q, I.systemClockOffset)
        }
      }
    },
    U74 = Wj1,
    N74 = nn(),
    $74 = class extends Wj1 {
      static {
        RG(this, "AwsSdkSigV4ASigner")
      }
      async sign(A, B, Q) {
        if (!N74.HttpRequest.isInstance(A)) throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
        let {
          config: I,
          signer: G,
          signingRegion: Z,
          signingRegionSet: D,
          signingName: Y
        } = await Yj1(Q), J = (await I.sigv4aSigningRegionSet?.() ?? D ?? [Z]).join(",");
        return await G.sign(A, {
          signingDate: Dj1(I.systemClockOffset),
          signingRegion: J,
          signingService: Y
        })
      }
    },
    q74 = NI(),
    RaA = $I(),
    M74 = RG((A) => {
      return A.sigv4aSigningRegionSet = q74.normalizeProvider(A.sigv4aSigningRegionSet), A
    }, "resolveAwsSdkSigV4AConfig"),
    L74 = {
      environmentVariableSelector(A) {
        if (A.AWS_SIGV4A_SIGNING_REGION_SET) return A.AWS_SIGV4A_SIGNING_REGION_SET.split(",").map((B) => B.trim());
        throw new RaA.ProviderError("AWS_SIGV4A_SIGNING_REGION_SET not set in env.", {
          tryNextLink: !0
        })
      },
      configFileSelector(A) {
        if (A.sigv4a_signing_region_set) return (A.sigv4a_signing_region_set ?? "").split(",").map((B) => B.trim());
        throw new RaA.ProviderError("sigv4a_signing_region_set not set in profile.", {
          tryNextLink: !0
        })
      },
      default: void 0
    },
    R74 = NC(),
    aS = NI(),
    OaA = qaA(),
    PaA = RG((A) => {
      let B = A.credentials,
        Q = !!A.credentials,
        I = void 0;
      Object.defineProperty(A, "credentials", {
        set(J) {
          if (J && J !== B && J !== I) Q = !0;
          B = J;
          let F = SaA(A, {
              credentials: B,
              credentialDefaultProvider: A.credentialDefaultProvider
            }),
            X = _aA(A, F);
          if (Q && !X.attributed) I = RG(async (V) => X(V).then((C) => R74.setCredentialFeature(C, "CREDENTIALS_CODE", "e")), "resolvedCredentials"), I.memoized = X.memoized, I.configBound = X.configBound, I.attributed = !0;
          else I = X
        },
        get() {
          return I
        },
        enumerable: !0,
        configurable: !0
      }), A.credentials = B;
      let {
        signingEscapePath: G = !0,
        systemClockOffset: Z = A.systemClockOffset || 0,
        sha256: D
      } = A, Y;
      if (A.signer) Y = aS.normalizeProvider(A.signer);
      else if (A.regionInfoProvider) Y = RG(() => aS.normalizeProvider(A.region)().then(async (J) => [await A.regionInfoProvider(J, {
        useFipsEndpoint: await A.useFipsEndpoint(),
        useDualstackEndpoint: await A.useDualstackEndpoint()
      }) || {}, J]).then(([J, F]) => {
        let {
          signingRegion: X,
          signingService: V
        } = J;
        A.signingRegion = A.signingRegion || X || F, A.signingName = A.signingName || V || A.serviceId;
        let C = {
          ...A,
          credentials: A.credentials,
          region: A.signingRegion,
          service: A.signingName,
          sha256: D,
          uriEscapePath: G
        };
        return new(A.signerConstructor || OaA.SignatureV4)(C)
      }), "signer");
      else Y = RG(async (J) => {
        J = Object.assign({}, {
          name: "sigv4",
          signingName: A.signingName || A.defaultSigningName,
          signingRegion: await aS.normalizeProvider(A.region)(),
          properties: {}
        }, J);
        let {
          signingRegion: F,
          signingName: X
        } = J;
        A.signingRegion = A.signingRegion || F, A.signingName = A.signingName || X || A.serviceId;
        let V = {
          ...A,
          credentials: A.credentials,
          region: A.signingRegion,
          service: A.signingName,
          sha256: D,
          uriEscapePath: G
        };
        return new(A.signerConstructor || OaA.SignatureV4)(V)
      }, "signer");
      return Object.assign(A, {
        systemClockOffset: Z,
        signingEscapePath: G,
        signer: Y
      })
    }, "resolveAwsSdkSigV4Config"),
    O74 = PaA;

  function SaA(A, {
    credentials: B,
    credentialDefaultProvider: Q
  }) {
    let I;
    if (B)
      if (!B?.memoized) I = aS.memoizeIdentityProvider(B, aS.isIdentityExpired, aS.doesIdentityRequireRefresh);
      else I = B;
    else if (Q) I = aS.normalizeProvider(Q(Object.assign({}, A, {
      parentClientConfig: A
    })));
    else I = RG(async () => {
      throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.")
    }, "credentialsProvider");
    return I.memoized = !0, I
  }
  RG(SaA, "normalizeCredentialProvider");

  function _aA(A, B) {
    if (B.configBound) return B;
    let Q = RG(async (I) => B({
      ...I,
      callerClientConfig: A
    }), "fn");
    return Q.memoized = B.memoized, Q.configBound = !0, Q
  }
  RG(_aA, "bindCallerConfig")
})
// @from(Start 3239424, End 3247240)
WN = z((Z78, vaA) => {
  var {
    defineProperty: A71,
    getOwnPropertyDescriptor: T74,
    getOwnPropertyNames: P74
  } = Object, S74 = Object.prototype.hasOwnProperty, DX = (A, B) => A71(A, "name", {
    value: B,
    configurable: !0
  }), _74 = (A, B) => {
    for (var Q in B) A71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, j74 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of P74(B))
        if (!S74.call(A, G) && G !== Q) A71(A, G, {
          get: () => B[G],
          enumerable: !(I = T74(B, G)) || I.enumerable
        })
    }
    return A
  }, y74 = (A) => j74(A71({}, "__esModule", {
    value: !0
  }), A), faA = {};
  _74(faA, {
    constructStack: () => Jj1
  });
  vaA.exports = y74(faA);
  var sS = DX((A, B) => {
      let Q = [];
      if (A) Q.push(A);
      if (B)
        for (let I of B) Q.push(I);
      return Q
    }, "getAllAliases"),
    SL = DX((A, B) => {
      return `${A||"anonymous"}${B&&B.length>0?` (a.k.a. ${B.join(",")})`:""}`
    }, "getMiddlewareNameWithAliases"),
    Jj1 = DX(() => {
      let A = [],
        B = [],
        Q = !1,
        I = new Set,
        G = DX((X) => X.sort((V, C) => kaA[C.step] - kaA[V.step] || xaA[C.priority || "normal"] - xaA[V.priority || "normal"]), "sort"),
        Z = DX((X) => {
          let V = !1,
            C = DX((K) => {
              let E = sS(K.name, K.aliases);
              if (E.includes(X)) {
                V = !0;
                for (let N of E) I.delete(N);
                return !1
              }
              return !0
            }, "filterCb");
          return A = A.filter(C), B = B.filter(C), V
        }, "removeByName"),
        D = DX((X) => {
          let V = !1,
            C = DX((K) => {
              if (K.middleware === X) {
                V = !0;
                for (let E of sS(K.name, K.aliases)) I.delete(E);
                return !1
              }
              return !0
            }, "filterCb");
          return A = A.filter(C), B = B.filter(C), V
        }, "removeByReference"),
        Y = DX((X) => {
          return A.forEach((V) => {
            X.add(V.middleware, {
              ...V
            })
          }), B.forEach((V) => {
            X.addRelativeTo(V.middleware, {
              ...V
            })
          }), X.identifyOnResolve?.(F.identifyOnResolve()), X
        }, "cloneTo"),
        W = DX((X) => {
          let V = [];
          return X.before.forEach((C) => {
            if (C.before.length === 0 && C.after.length === 0) V.push(C);
            else V.push(...W(C))
          }), V.push(X), X.after.reverse().forEach((C) => {
            if (C.before.length === 0 && C.after.length === 0) V.push(C);
            else V.push(...W(C))
          }), V
        }, "expandRelativeMiddlewareList"),
        J = DX((X = !1) => {
          let V = [],
            C = [],
            K = {};
          return A.forEach((N) => {
            let q = {
              ...N,
              before: [],
              after: []
            };
            for (let O of sS(q.name, q.aliases)) K[O] = q;
            V.push(q)
          }), B.forEach((N) => {
            let q = {
              ...N,
              before: [],
              after: []
            };
            for (let O of sS(q.name, q.aliases)) K[O] = q;
            C.push(q)
          }), C.forEach((N) => {
            if (N.toMiddleware) {
              let q = K[N.toMiddleware];
              if (q === void 0) {
                if (X) return;
                throw new Error(`${N.toMiddleware} is not found when adding ${SL(N.name,N.aliases)} middleware ${N.relation} ${N.toMiddleware}`)
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
            }, q = sS(C, E);
            if (q.length > 0) {
              if (q.some((O) => I.has(O))) {
                if (!K) throw new Error(`Duplicate middleware name '${SL(C,E)}'`);
                for (let O of q) {
                  let R = A.findIndex((L) => L.name === O || L.aliases?.some((_) => _ === O));
                  if (R === -1) continue;
                  let T = A[R];
                  if (T.step !== N.step || N.priority !== T.priority) throw new Error(`"${SL(T.name,T.aliases)}" middleware with ${T.priority} priority in ${T.step} step cannot be overridden by "${SL(C,E)}" middleware with ${N.priority} priority in ${N.step} step.`);
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
            }, q = sS(C, E);
            if (q.length > 0) {
              if (q.some((O) => I.has(O))) {
                if (!K) throw new Error(`Duplicate middleware name '${SL(C,E)}'`);
                for (let O of q) {
                  let R = B.findIndex((L) => L.name === O || L.aliases?.some((_) => _ === O));
                  if (R === -1) continue;
                  let T = B[R];
                  if (T.toMiddleware !== N.toMiddleware || T.relation !== N.relation) throw new Error(`"${SL(T.name,T.aliases)}" middleware ${T.relation} "${T.toMiddleware}" middleware cannot be overridden by "${SL(C,E)}" middleware ${N.relation} "${N.toMiddleware}" middleware.`);
                  B.splice(R, 1)
                }
              }
              for (let O of q) I.add(O)
            }
            B.push(N)
          },
          clone: () => Y(Jj1()),
          use: (X) => {
            X.applyToStack(F)
          },
          remove: (X) => {
            if (typeof X === "string") return Z(X);
            else return D(X)
          },
          removeByTag: (X) => {
            let V = !1,
              C = DX((K) => {
                let {
                  tags: E,
                  name: N,
                  aliases: q
                } = K;
                if (E && E.includes(X)) {
                  let O = sS(N, q);
                  for (let R of O) I.delete(R);
                  return V = !0, !1
                }
                return !0
              }, "filterCb");
            return A = A.filter(C), B = B.filter(C), V
          },
          concat: (X) => {
            let V = Y(Jj1());
            return V.use(X), V.identifyOnResolve(Q || V.identifyOnResolve() || (X.identifyOnResolve?.() ?? !1)), V
          },
          applyToStack: Y,
          identify: () => {
            return J(!0).map((X) => {
              let V = X.step ?? X.relation + " " + X.toMiddleware;
              return SL(X.name, X.aliases) + " - " + V
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
    kaA = {
      initialize: 5,
      serialize: 4,
      build: 3,
      finalizeRequest: 2,
      deserialize: 1
    },
    xaA = {
      high: 3,
      normal: 2,
      low: 1
    }
})
// @from(Start 3247246, End 3275784)
G71 = z((D78, AsA) => {
  var {
    defineProperty: I71,
    getOwnPropertyDescriptor: k74,
    getOwnPropertyNames: x74
  } = Object, f74 = Object.prototype.hasOwnProperty, r0 = (A, B) => I71(A, "name", {
    value: B,
    configurable: !0
  }), v74 = (A, B) => {
    for (var Q in B) I71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, b74 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of x74(B))
        if (!f74.call(A, G) && G !== Q) I71(A, G, {
          get: () => B[G],
          enumerable: !(I = k74(B, G)) || I.enumerable
        })
    }
    return A
  }, g74 = (A) => b74(I71({}, "__esModule", {
    value: !0
  }), A), gaA = {};
  v74(gaA, {
    Client: () => h74,
    Command: () => maA,
    LazyJsonString: () => rS,
    NoOpLogger: () => fI4,
    SENSITIVE_STRING: () => d74,
    ServiceException: () => qI4,
    _json: () => zj1,
    collectBody: () => Fj1.collectBody,
    convertMap: () => vI4,
    createAggregatedClient: () => u74,
    dateToUtcString: () => iaA,
    decorateServiceException: () => naA,
    emitWarningIfUnsupportedVersion: () => OI4,
    expectBoolean: () => c74,
    expectByte: () => Hj1,
    expectFloat32: () => B71,
    expectInt: () => i74,
    expectInt32: () => Cj1,
    expectLong: () => on,
    expectNonNull: () => a74,
    expectNumber: () => rn,
    expectObject: () => daA,
    expectShort: () => Kj1,
    expectString: () => s74,
    expectUnion: () => r74,
    extendedEncodeURIComponent: () => Fj1.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => kI4,
    getDefaultClientConfiguration: () => jI4,
    getDefaultExtensionConfiguration: () => saA,
    getValueFromTextNode: () => raA,
    handleFloat: () => e74,
    isSerializableHeaderValue: () => xI4,
    limitedParseDouble: () => Uj1,
    limitedParseFloat: () => AI4,
    limitedParseFloat32: () => BI4,
    loadConfigsForDefaultMode: () => RI4,
    logger: () => tn,
    map: () => $j1,
    parseBoolean: () => p74,
    parseEpochTimestamp: () => CI4,
    parseRfc3339DateTime: () => DI4,
    parseRfc3339DateTimeWithOffset: () => WI4,
    parseRfc7231DateTime: () => VI4,
    quoteHeader: () => taA,
    resolveDefaultRuntimeConfig: () => yI4,
    resolvedPath: () => Fj1.resolvedPath,
    serializeDateTime: () => uI4,
    serializeFloat: () => dI4,
    splitEvery: () => eaA,
    splitHeader: () => pI4,
    strictParseByte: () => laA,
    strictParseDouble: () => Ej1,
    strictParseFloat: () => o74,
    strictParseFloat32: () => uaA,
    strictParseInt: () => QI4,
    strictParseInt32: () => II4,
    strictParseLong: () => caA,
    strictParseShort: () => Cb,
    take: () => bI4,
    throwDefaultError: () => aaA,
    withBaseException: () => MI4
  });
  AsA.exports = g74(gaA);
  var haA = WN(),
    h74 = class {
      constructor(A) {
        this.config = A, this.middlewareStack = haA.constructStack()
      }
      static {
        r0(this, "Client")
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
    Fj1 = vz(),
    Vj1 = s_1(),
    maA = class {
      constructor() {
        this.middlewareStack = haA.constructStack()
      }
      static {
        r0(this, "Command")
      }
      static classBuilder() {
        return new m74
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
            [Vj1.SMITHY_CONTEXT_KEY]: {
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
    m74 = class {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
      }
      static {
        r0(this, "ClassBuilder")
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
        return B = class extends maA {
          constructor(...[Q]) {
            super();
            this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
          }
          static {
            r0(this, "CommandRef")
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
    d74 = "***SensitiveInformation***",
    u74 = r0((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = r0(async function(D, Y, W) {
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
    p74 = r0((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    c74 = r0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) tn.warn(Q71(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") tn.warn(Q71(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    rn = r0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) tn.warn(Q71(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    l74 = Math.ceil(340282346638528860000000000000000000000),
    B71 = r0((A) => {
      let B = rn(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > l74) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    on = r0((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    i74 = on,
    Cj1 = r0((A) => wj1(A, 32), "expectInt32"),
    Kj1 = r0((A) => wj1(A, 16), "expectShort"),
    Hj1 = r0((A) => wj1(A, 8), "expectByte"),
    wj1 = r0((A, B) => {
      let Q = on(A);
      if (Q !== void 0 && n74(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    n74 = r0((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    a74 = r0((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    daA = r0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    s74 = r0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return tn.warn(Q71(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    r74 = r0((A) => {
      if (A === null || A === void 0) return;
      let B = daA(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    Ej1 = r0((A) => {
      if (typeof A == "string") return rn(Hb(A));
      return rn(A)
    }, "strictParseDouble"),
    o74 = Ej1,
    uaA = r0((A) => {
      if (typeof A == "string") return B71(Hb(A));
      return B71(A)
    }, "strictParseFloat32"),
    t74 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    Hb = r0((A) => {
      let B = A.match(t74);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    Uj1 = r0((A) => {
      if (typeof A == "string") return paA(A);
      return rn(A)
    }, "limitedParseDouble"),
    e74 = Uj1,
    AI4 = Uj1,
    BI4 = r0((A) => {
      if (typeof A == "string") return paA(A);
      return B71(A)
    }, "limitedParseFloat32"),
    paA = r0((A) => {
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
    caA = r0((A) => {
      if (typeof A === "string") return on(Hb(A));
      return on(A)
    }, "strictParseLong"),
    QI4 = caA,
    II4 = r0((A) => {
      if (typeof A === "string") return Cj1(Hb(A));
      return Cj1(A)
    }, "strictParseInt32"),
    Cb = r0((A) => {
      if (typeof A === "string") return Kj1(Hb(A));
      return Kj1(A)
    }, "strictParseShort"),
    laA = r0((A) => {
      if (typeof A === "string") return Hj1(Hb(A));
      return Hj1(A)
    }, "strictParseByte"),
    Q71 = r0((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    tn = {
      warn: console.warn
    },
    GI4 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Nj1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function iaA(A) {
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
    return `${GI4[I]}, ${W} ${Nj1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  r0(iaA, "dateToUtcString");
  var ZI4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    DI4 = r0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = ZI4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = Cb(Kb(I)), X = bz(G, "month", 1, 12), V = bz(Z, "day", 1, 31);
      return sn(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    YI4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    WI4 = r0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = YI4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = Cb(Kb(I)), V = bz(G, "month", 1, 12), C = bz(Z, "day", 1, 31), K = sn(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - $I4(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    JI4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    FI4 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    XI4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    VI4 = r0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = JI4.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return sn(Cb(Kb(Z)), Xj1(G), bz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = FI4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return zI4(sn(KI4(Z), Xj1(G), bz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = XI4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return sn(Cb(Kb(J)), Xj1(I), bz(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    CI4 = r0((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = Ej1(A);
      else if (typeof A === "object" && A.tag === 1) B = A.value;
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    sn = r0((A, B, Q, I) => {
      let G = B - 1;
      return EI4(A, G, Q), new Date(Date.UTC(A, G, Q, bz(I.hours, "hour", 0, 23), bz(I.minutes, "minute", 0, 59), bz(I.seconds, "seconds", 0, 60), NI4(I.fractionalMilliseconds)))
    }, "buildDate"),
    KI4 = r0((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + Cb(Kb(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    HI4 = 1576800000000,
    zI4 = r0((A) => {
      if (A.getTime() - new Date().getTime() > HI4) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    Xj1 = r0((A) => {
      let B = Nj1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    wI4 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    EI4 = r0((A, B, Q) => {
      let I = wI4[B];
      if (B === 1 && UI4(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${Nj1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    UI4 = r0((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    bz = r0((A, B, Q, I) => {
      let G = laA(Kb(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    NI4 = r0((A) => {
      if (A === null || A === void 0) return 0;
      return uaA("0." + A) * 1000
    }, "parseMilliseconds"),
    $I4 = r0((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    Kb = r0((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    qI4 = class A extends Error {
      static {
        r0(this, "ServiceException")
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
    naA = r0((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    aaA = r0(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = LI4(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: B?.code || B?.Code || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw naA(D, B)
    }, "throwDefaultError"),
    MI4 = r0((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        aaA({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    LI4 = r0((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    RI4 = r0((A) => {
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
    baA = !1,
    OI4 = r0((A) => {
      if (A && !baA && parseInt(A.substring(1, A.indexOf("."))) < 16) baA = !0
    }, "emitWarningIfUnsupportedVersion"),
    TI4 = r0((A) => {
      let B = [];
      for (let Q in Vj1.AlgorithmId) {
        let I = Vj1.AlgorithmId[Q];
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
    PI4 = r0((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    SI4 = r0((A) => {
      return {
        setRetryStrategy(B) {
          A.retryStrategy = B
        },
        retryStrategy() {
          return A.retryStrategy
        }
      }
    }, "getRetryConfiguration"),
    _I4 = r0((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    saA = r0((A) => {
      return Object.assign(TI4(A), SI4(A))
    }, "getDefaultExtensionConfiguration"),
    jI4 = saA,
    yI4 = r0((A) => {
      return Object.assign(PI4(A), _I4(A))
    }, "resolveDefaultRuntimeConfig"),
    kI4 = r0((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    raA = r0((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = raA(A[Q]);
      return A
    }, "getValueFromTextNode"),
    xI4 = r0((A) => {
      return A != null
    }, "isSerializableHeaderValue"),
    rS = r0(function A(B) {
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
  rS.from = (A) => {
    if (A && typeof A === "object" && (A instanceof rS || ("deserializeJSON" in A))) return A;
    else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return rS(String(A));
    return rS(JSON.stringify(A))
  };
  rS.fromObject = rS.from;
  var fI4 = class {
    static {
      r0(this, "NoOpLogger")
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };

  function $j1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, gI4(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      oaA(I, null, Z, D)
    }
    return I
  }
  r0($j1, "map");
  var vI4 = r0((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    bI4 = r0((A, B) => {
      let Q = {};
      for (let I in B) oaA(Q, A, B, I);
      return Q
    }, "take"),
    gI4 = r0((A, B, Q) => {
      return $j1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    oaA = r0((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = hI4, W = mI4, J = I] = D;
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
    hI4 = r0((A) => A != null, "nonNullish"),
    mI4 = r0((A) => A, "pass");

  function taA(A) {
    if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
    return A
  }
  r0(taA, "quoteHeader");
  var dI4 = r0((A) => {
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
    uI4 = r0((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
    zj1 = r0((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(zj1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = zj1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function eaA(A, B, Q) {
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
  r0(eaA, "splitEvery");
  var pI4 = r0((A) => {
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
// @from(Start 3275790, End 3277228)
Z71 = z((aI4) => {
  var cI4 = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
    BsA = "[:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][" + cI4 + "]*",
    lI4 = new RegExp("^" + BsA + "$"),
    iI4 = function(A, B) {
      let Q = [],
        I = B.exec(A);
      while (I) {
        let G = [];
        G.startIndex = B.lastIndex - I[0].length;
        let Z = I.length;
        for (let D = 0; D < Z; D++) G.push(I[D]);
        Q.push(G), I = B.exec(A)
      }
      return Q
    },
    nI4 = function(A) {
      let B = lI4.exec(A);
      return !(B === null || typeof B === "undefined")
    };
  aI4.isExist = function(A) {
    return typeof A !== "undefined"
  };
  aI4.isEmptyObject = function(A) {
    return Object.keys(A).length === 0
  };
  aI4.merge = function(A, B, Q) {
    if (B) {
      let I = Object.keys(B),
        G = I.length;
      for (let Z = 0; Z < G; Z++)
        if (Q === "strict") A[I[Z]] = [B[I[Z]]];
        else A[I[Z]] = B[I[Z]]
    }
  };
  aI4.getValue = function(A) {
    if (aI4.isExist(A)) return A;
    else return ""
  };
  aI4.isName = nI4;
  aI4.getAllMatches = iI4;
  aI4.nameRegexp = BsA
})