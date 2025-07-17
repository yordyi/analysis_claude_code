
// @from(Start 3471490, End 3488810)
WA0 = z((xI8, n71) => {
  var x10, f10, v10, b10, g10, h10, m10, d10, u10, p10, c10, l10, i10, l71, $y1, n10, a10, s10, Rb, r10, o10, t10, e10, AA0, BA0, QA0, IA0, GA0, i71, ZA0, DA0, YA0;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof n71 === "object" && typeof xI8 === "object") A(Q(B, Q(xI8)));
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
    x10 = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, f10 = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, v10 = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, b10 = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, g10 = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, h10 = function(Z, D, Y, W, J, F) {
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
    }, m10 = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, d10 = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, u10 = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, p10 = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, c10 = function(Z, D, Y, W) {
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
    }, l10 = function(Z, D) {
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
    }, i10 = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) i71(D, Z, Y)
    }, i71 = Object.create ? function(Z, D, Y, W) {
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
    }, l71 = function(Z) {
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
    }, $y1 = function(Z, D) {
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
    }, n10 = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat($y1(arguments[D]));
      return Z
    }, a10 = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, s10 = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, Rb = function(Z) {
      return this instanceof Rb ? (this.v = Z, this) : new Rb(Z)
    }, r10 = function(Z, D, Y) {
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
        O.value instanceof Rb ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
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
    }, o10 = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: Rb(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, t10 = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof l71 === "function" ? l71(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
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
    }, e10 = function(Z, D) {
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
    AA0 = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") i71(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, BA0 = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, QA0 = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, IA0 = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, GA0 = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, ZA0 = function(Z, D, Y) {
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
    DA0 = function(Z) {
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
    }, YA0 = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", x10), A("__assign", f10), A("__rest", v10), A("__decorate", b10), A("__param", g10), A("__esDecorate", h10), A("__runInitializers", m10), A("__propKey", d10), A("__setFunctionName", u10), A("__metadata", p10), A("__awaiter", c10), A("__generator", l10), A("__exportStar", i10), A("__createBinding", i71), A("__values", l71), A("__read", $y1), A("__spread", n10), A("__spreadArrays", a10), A("__spreadArray", s10), A("__await", Rb), A("__asyncGenerator", r10), A("__asyncDelegator", o10), A("__asyncValues", t10), A("__makeTemplateObject", e10), A("__importStar", AA0), A("__importDefault", BA0), A("__classPrivateFieldGet", QA0), A("__classPrivateFieldSet", IA0), A("__classPrivateFieldIn", GA0), A("__addDisposableResource", ZA0), A("__disposeResources", DA0), A("__rewriteRelativeImportExtension", YA0)
  })
})
// @from(Start 3488816, End 3489939)
XA0 = z((JA0) => {
  Object.defineProperty(JA0, "__esModule", {
    value: !0
  });
  JA0.checkUrl = void 0;
  var MC4 = $I(),
    LC4 = "169.254.170.2",
    RC4 = "169.254.170.23",
    OC4 = "[fd00:ec2::23]",
    TC4 = (A, B) => {
      if (A.protocol === "https:") return;
      if (A.hostname === LC4 || A.hostname === RC4 || A.hostname === OC4) return;
      if (A.hostname.includes("[")) {
        if (A.hostname === "[::1]" || A.hostname === "[0000:0000:0000:0000:0000:0000:0000:0001]") return
      } else {
        if (A.hostname === "localhost") return;
        let Q = A.hostname.split("."),
          I = (G) => {
            let Z = parseInt(G, 10);
            return 0 <= Z && Z <= 255
          };
        if (Q[0] === "127" && I(Q[1]) && I(Q[2]) && I(Q[3]) && Q.length === 4) return
      }
      throw new MC4.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`, {
        logger: B
      })
    };
  JA0.checkUrl = TC4
})
// @from(Start 3489945, End 3492728)
qy1 = z((vI8, NA0) => {
  var {
    defineProperty: a71,
    getOwnPropertyDescriptor: PC4,
    getOwnPropertyNames: SC4
  } = Object, _C4 = Object.prototype.hasOwnProperty, s71 = (A, B) => a71(A, "name", {
    value: B,
    configurable: !0
  }), jC4 = (A, B) => {
    for (var Q in B) a71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, yC4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of SC4(B))
        if (!_C4.call(A, G) && G !== Q) a71(A, G, {
          get: () => B[G],
          enumerable: !(I = PC4(B, G)) || I.enumerable
        })
    }
    return A
  }, kC4 = (A) => yC4(a71({}, "__esModule", {
    value: !0
  }), A), VA0 = {};
  jC4(VA0, {
    AlgorithmId: () => zA0,
    EndpointURLScheme: () => HA0,
    FieldPosition: () => wA0,
    HttpApiKeyAuthLocation: () => KA0,
    HttpAuthLocation: () => CA0,
    IniSectionType: () => EA0,
    RequestHandlerProtocol: () => UA0,
    SMITHY_CONTEXT_KEY: () => gC4,
    getDefaultClientConfiguration: () => vC4,
    resolveDefaultRuntimeConfig: () => bC4
  });
  NA0.exports = kC4(VA0);
  var CA0 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(CA0 || {}),
    KA0 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(KA0 || {}),
    HA0 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(HA0 || {}),
    zA0 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(zA0 || {}),
    xC4 = s71((A) => {
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
    fC4 = s71((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    vC4 = s71((A) => {
      return xC4(A)
    }, "getDefaultClientConfiguration"),
    bC4 = s71((A) => {
      return fC4(A)
    }, "resolveDefaultRuntimeConfig"),
    wA0 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(wA0 || {}),
    gC4 = "__smithy_context",
    EA0 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(EA0 || {}),
    UA0 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(UA0 || {})
})
// @from(Start 3492734, End 3497241)
OA0 = z((bI8, RA0) => {
  var {
    defineProperty: r71,
    getOwnPropertyDescriptor: hC4,
    getOwnPropertyNames: mC4
  } = Object, dC4 = Object.prototype.hasOwnProperty, gL = (A, B) => r71(A, "name", {
    value: B,
    configurable: !0
  }), uC4 = (A, B) => {
    for (var Q in B) r71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, pC4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of mC4(B))
        if (!dC4.call(A, G) && G !== Q) r71(A, G, {
          get: () => B[G],
          enumerable: !(I = hC4(B, G)) || I.enumerable
        })
    }
    return A
  }, cC4 = (A) => pC4(r71({}, "__esModule", {
    value: !0
  }), A), $A0 = {};
  uC4($A0, {
    Field: () => nC4,
    Fields: () => aC4,
    HttpRequest: () => sC4,
    HttpResponse: () => rC4,
    IHttpRequest: () => qA0.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => lC4,
    isValidHostname: () => LA0,
    resolveHttpHandlerRuntimeConfig: () => iC4
  });
  RA0.exports = cC4($A0);
  var lC4 = gL((A) => {
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
    iC4 = gL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    qA0 = qy1(),
    nC4 = class {
      static {
        gL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = qA0.FieldPosition.HEADER,
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
    aC4 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        gL(this, "Fields")
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
    sC4 = class A {
      static {
        gL(this, "HttpRequest")
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
        if (Q.query) Q.query = MA0(Q.query);
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

  function MA0(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  gL(MA0, "cloneQuery");
  var rC4 = class {
    static {
      gL(this, "HttpResponse")
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

  function LA0(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  gL(LA0, "isValidHostname")
})
// @from(Start 3497247, End 3525785)
lA0 = z((dI8, cA0) => {
  var {
    defineProperty: e71,
    getOwnPropertyDescriptor: oC4,
    getOwnPropertyNames: tC4
  } = Object, eC4 = Object.prototype.hasOwnProperty, t0 = (A, B) => e71(A, "name", {
    value: B,
    configurable: !0
  }), AK4 = (A, B) => {
    for (var Q in B) e71(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, BK4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of tC4(B))
        if (!eC4.call(A, G) && G !== Q) e71(A, G, {
          get: () => B[G],
          enumerable: !(I = oC4(B, G)) || I.enumerable
        })
    }
    return A
  }, QK4 = (A) => BK4(e71({}, "__esModule", {
    value: !0
  }), A), PA0 = {};
  AK4(PA0, {
    Client: () => IK4,
    Command: () => _A0,
    LazyJsonString: () => Q_,
    NoOpLogger: () => eK4,
    SENSITIVE_STRING: () => ZK4,
    ServiceException: () => mK4,
    _json: () => Sy1,
    collectBody: () => My1.collectBody,
    convertMap: () => AH4,
    createAggregatedClient: () => DK4,
    dateToUtcString: () => vA0,
    decorateServiceException: () => bA0,
    emitWarningIfUnsupportedVersion: () => cK4,
    expectBoolean: () => WK4,
    expectByte: () => Py1,
    expectFloat32: () => o71,
    expectInt: () => FK4,
    expectInt32: () => Oy1,
    expectLong: () => Ka,
    expectNonNull: () => VK4,
    expectNumber: () => Ca,
    expectObject: () => jA0,
    expectShort: () => Ty1,
    expectString: () => CK4,
    expectUnion: () => KK4,
    extendedEncodeURIComponent: () => My1.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => oK4,
    getDefaultClientConfiguration: () => sK4,
    getDefaultExtensionConfiguration: () => hA0,
    getValueFromTextNode: () => mA0,
    handleFloat: () => wK4,
    isSerializableHeaderValue: () => tK4,
    limitedParseDouble: () => yy1,
    limitedParseFloat: () => EK4,
    limitedParseFloat32: () => UK4,
    loadConfigsForDefaultMode: () => pK4,
    logger: () => Ha,
    map: () => xy1,
    parseBoolean: () => YK4,
    parseEpochTimestamp: () => jK4,
    parseRfc3339DateTime: () => LK4,
    parseRfc3339DateTimeWithOffset: () => OK4,
    parseRfc7231DateTime: () => _K4,
    quoteHeader: () => uA0,
    resolveDefaultRuntimeConfig: () => rK4,
    resolvedPath: () => My1.resolvedPath,
    serializeDateTime: () => DH4,
    serializeFloat: () => ZH4,
    splitEvery: () => pA0,
    splitHeader: () => YH4,
    strictParseByte: () => fA0,
    strictParseDouble: () => jy1,
    strictParseFloat: () => HK4,
    strictParseFloat32: () => yA0,
    strictParseInt: () => NK4,
    strictParseInt32: () => $K4,
    strictParseLong: () => xA0,
    strictParseShort: () => Ob,
    take: () => BH4,
    throwDefaultError: () => gA0,
    withBaseException: () => dK4
  });
  cA0.exports = QK4(PA0);
  var SA0 = WN(),
    IK4 = class {
      constructor(A) {
        this.config = A, this.middlewareStack = SA0.constructStack()
      }
      static {
        t0(this, "Client")
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
    My1 = vz(),
    Ry1 = qy1(),
    _A0 = class {
      constructor() {
        this.middlewareStack = SA0.constructStack()
      }
      static {
        t0(this, "Command")
      }
      static classBuilder() {
        return new GK4
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
            [Ry1.SMITHY_CONTEXT_KEY]: {
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
    GK4 = class {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
      }
      static {
        t0(this, "ClassBuilder")
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
        return B = class extends _A0 {
          constructor(...[Q]) {
            super();
            this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
          }
          static {
            t0(this, "CommandRef")
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
    ZK4 = "***SensitiveInformation***",
    DK4 = t0((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = t0(async function(D, Y, W) {
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
    YK4 = t0((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    WK4 = t0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) Ha.warn(t71(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") Ha.warn(t71(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    Ca = t0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) Ha.warn(t71(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    JK4 = Math.ceil(340282346638528860000000000000000000000),
    o71 = t0((A) => {
      let B = Ca(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > JK4) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    Ka = t0((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    FK4 = Ka,
    Oy1 = t0((A) => _y1(A, 32), "expectInt32"),
    Ty1 = t0((A) => _y1(A, 16), "expectShort"),
    Py1 = t0((A) => _y1(A, 8), "expectByte"),
    _y1 = t0((A, B) => {
      let Q = Ka(A);
      if (Q !== void 0 && XK4(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    XK4 = t0((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    VK4 = t0((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    jA0 = t0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    CK4 = t0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return Ha.warn(t71(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    KK4 = t0((A) => {
      if (A === null || A === void 0) return;
      let B = jA0(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    jy1 = t0((A) => {
      if (typeof A == "string") return Ca(Pb(A));
      return Ca(A)
    }, "strictParseDouble"),
    HK4 = jy1,
    yA0 = t0((A) => {
      if (typeof A == "string") return o71(Pb(A));
      return o71(A)
    }, "strictParseFloat32"),
    zK4 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    Pb = t0((A) => {
      let B = A.match(zK4);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    yy1 = t0((A) => {
      if (typeof A == "string") return kA0(A);
      return Ca(A)
    }, "limitedParseDouble"),
    wK4 = yy1,
    EK4 = yy1,
    UK4 = t0((A) => {
      if (typeof A == "string") return kA0(A);
      return o71(A)
    }, "limitedParseFloat32"),
    kA0 = t0((A) => {
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
    xA0 = t0((A) => {
      if (typeof A === "string") return Ka(Pb(A));
      return Ka(A)
    }, "strictParseLong"),
    NK4 = xA0,
    $K4 = t0((A) => {
      if (typeof A === "string") return Oy1(Pb(A));
      return Oy1(A)
    }, "strictParseInt32"),
    Ob = t0((A) => {
      if (typeof A === "string") return Ty1(Pb(A));
      return Ty1(A)
    }, "strictParseShort"),
    fA0 = t0((A) => {
      if (typeof A === "string") return Py1(Pb(A));
      return Py1(A)
    }, "strictParseByte"),
    t71 = t0((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    Ha = {
      warn: console.warn
    },
    qK4 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ky1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function vA0(A) {
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
    return `${qK4[I]}, ${W} ${ky1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  t0(vA0, "dateToUtcString");
  var MK4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    LK4 = t0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = MK4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = Ob(Tb(I)), X = uz(G, "month", 1, 12), V = uz(Z, "day", 1, 31);
      return Va(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    RK4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    OK4 = t0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = RK4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = Ob(Tb(I)), V = uz(G, "month", 1, 12), C = uz(Z, "day", 1, 31), K = Va(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - hK4(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    TK4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    PK4 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    SK4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    _K4 = t0((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = TK4.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Va(Ob(Tb(Z)), Ly1(G), uz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = PK4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return xK4(Va(yK4(Z), Ly1(G), uz(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = SK4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Va(Ob(Tb(J)), Ly1(I), uz(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    jK4 = t0((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = jy1(A);
      else if (typeof A === "object" && A.tag === 1) B = A.value;
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    Va = t0((A, B, Q, I) => {
      let G = B - 1;
      return vK4(A, G, Q), new Date(Date.UTC(A, G, Q, uz(I.hours, "hour", 0, 23), uz(I.minutes, "minute", 0, 59), uz(I.seconds, "seconds", 0, 60), gK4(I.fractionalMilliseconds)))
    }, "buildDate"),
    yK4 = t0((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + Ob(Tb(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    kK4 = 1576800000000,
    xK4 = t0((A) => {
      if (A.getTime() - new Date().getTime() > kK4) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    Ly1 = t0((A) => {
      let B = ky1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    fK4 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    vK4 = t0((A, B, Q) => {
      let I = fK4[B];
      if (B === 1 && bK4(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${ky1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    bK4 = t0((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    uz = t0((A, B, Q, I) => {
      let G = fA0(Tb(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    gK4 = t0((A) => {
      if (A === null || A === void 0) return 0;
      return yA0("0." + A) * 1000
    }, "parseMilliseconds"),
    hK4 = t0((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    Tb = t0((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    mK4 = class A extends Error {
      static {
        t0(this, "ServiceException")
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
    bA0 = t0((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    gA0 = t0(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = uK4(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: B?.code || B?.Code || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw bA0(D, B)
    }, "throwDefaultError"),
    dK4 = t0((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        gA0({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    uK4 = t0((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    pK4 = t0((A) => {
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
    TA0 = !1,
    cK4 = t0((A) => {
      if (A && !TA0 && parseInt(A.substring(1, A.indexOf("."))) < 16) TA0 = !0
    }, "emitWarningIfUnsupportedVersion"),
    lK4 = t0((A) => {
      let B = [];
      for (let Q in Ry1.AlgorithmId) {
        let I = Ry1.AlgorithmId[Q];
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
    iK4 = t0((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    nK4 = t0((A) => {
      return {
        setRetryStrategy(B) {
          A.retryStrategy = B
        },
        retryStrategy() {
          return A.retryStrategy
        }
      }
    }, "getRetryConfiguration"),
    aK4 = t0((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    hA0 = t0((A) => {
      return Object.assign(lK4(A), nK4(A))
    }, "getDefaultExtensionConfiguration"),
    sK4 = hA0,
    rK4 = t0((A) => {
      return Object.assign(iK4(A), aK4(A))
    }, "resolveDefaultRuntimeConfig"),
    oK4 = t0((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    mA0 = t0((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = mA0(A[Q]);
      return A
    }, "getValueFromTextNode"),
    tK4 = t0((A) => {
      return A != null
    }, "isSerializableHeaderValue"),
    Q_ = t0(function A(B) {
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
  Q_.from = (A) => {
    if (A && typeof A === "object" && (A instanceof Q_ || ("deserializeJSON" in A))) return A;
    else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return Q_(String(A));
    return Q_(JSON.stringify(A))
  };
  Q_.fromObject = Q_.from;
  var eK4 = class {
    static {
      t0(this, "NoOpLogger")
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };

  function xy1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, QH4(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      dA0(I, null, Z, D)
    }
    return I
  }
  t0(xy1, "map");
  var AH4 = t0((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    BH4 = t0((A, B) => {
      let Q = {};
      for (let I in B) dA0(Q, A, B, I);
      return Q
    }, "take"),
    QH4 = t0((A, B, Q) => {
      return xy1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    dA0 = t0((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = IH4, W = GH4, J = I] = D;
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
    IH4 = t0((A) => A != null, "nonNullish"),
    GH4 = t0((A) => A, "pass");

  function uA0(A) {
    if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
    return A
  }
  t0(uA0, "quoteHeader");
  var ZH4 = t0((A) => {
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
    DH4 = t0((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
    Sy1 = t0((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(Sy1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = Sy1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function pA0(A, B, Q) {
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
  t0(pA0, "splitEvery");
  var YH4 = t0((A) => {
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
// @from(Start 3525791, End 3527578)
aA0 = z((iA0) => {
  Object.defineProperty(iA0, "__esModule", {
    value: !0
  });
  iA0.getCredentials = iA0.createGetRequest = void 0;
  var fy1 = $I(),
    WH4 = OA0(),
    JH4 = lA0(),
    FH4 = f_1();

  function XH4(A) {
    return new WH4.HttpRequest({
      protocol: A.protocol,
      hostname: A.hostname,
      port: Number(A.port),
      path: A.pathname,
      query: Array.from(A.searchParams.entries()).reduce((B, [Q, I]) => {
        return B[Q] = I, B
      }, {}),
      fragment: A.hash
    })
  }
  iA0.createGetRequest = XH4;
  async function VH4(A, B) {
    let I = await FH4.sdkStreamMixin(A.body).transformToString();
    if (A.statusCode === 200) {
      let G = JSON.parse(I);
      if (typeof G.AccessKeyId !== "string" || typeof G.SecretAccessKey !== "string" || typeof G.Token !== "string" || typeof G.Expiration !== "string") throw new fy1.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }", {
        logger: B
      });
      return {
        accessKeyId: G.AccessKeyId,
        secretAccessKey: G.SecretAccessKey,
        sessionToken: G.Token,
        expiration: JH4.parseRfc3339DateTime(G.Expiration)
      }
    }
    if (A.statusCode >= 400 && A.statusCode < 500) {
      let G = {};
      try {
        G = JSON.parse(I)
      } catch (Z) {}
      throw Object.assign(new fy1.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
        logger: B
      }), {
        Code: G.Code,
        Message: G.Message
      })
    }
    throw new fy1.CredentialsProviderError(`Server responded with status: ${A.statusCode}`, {
      logger: B
    })
  }
  iA0.getCredentials = VH4
})
// @from(Start 3527584, End 3527954)
oA0 = z((sA0) => {
  Object.defineProperty(sA0, "__esModule", {
    value: !0
  });
  sA0.retryWrapper = void 0;
  var KH4 = (A, B, Q) => {
    return async () => {
      for (let I = 0; I < B; ++I) try {
        return await A()
      } catch (G) {
        await new Promise((Z) => setTimeout(Z, Q))
      }
      return await A()
    }
  };
  sA0.retryWrapper = KH4
})
// @from(Start 3527960, End 3530423)
Q00 = z((A00) => {
  Object.defineProperty(A00, "__esModule", {
    value: !0
  });
  A00.fromHttp = void 0;
  var HH4 = WA0(),
    zH4 = NC(),
    wH4 = DN(),
    tA0 = $I(),
    EH4 = HH4.__importDefault(Z1("fs/promises")),
    UH4 = XA0(),
    eA0 = aA0(),
    NH4 = oA0(),
    $H4 = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI",
    qH4 = "http://169.254.170.2",
    MH4 = "AWS_CONTAINER_CREDENTIALS_FULL_URI",
    LH4 = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE",
    RH4 = "AWS_CONTAINER_AUTHORIZATION_TOKEN",
    OH4 = (A = {}) => {
      A.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");
      let B, Q = A.awsContainerCredentialsRelativeUri ?? process.env[$H4],
        I = A.awsContainerCredentialsFullUri ?? process.env[MH4],
        G = A.awsContainerAuthorizationToken ?? process.env[RH4],
        Z = A.awsContainerAuthorizationTokenFile ?? process.env[LH4],
        D = A.logger?.constructor?.name === "NoOpLogger" || !A.logger ? console.warn : A.logger.warn;
      if (Q && I) D("@aws-sdk/credential-provider-http: you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri."), D("awsContainerCredentialsFullUri will take precedence.");
      if (G && Z) D("@aws-sdk/credential-provider-http: you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile."), D("awsContainerAuthorizationToken will take precedence.");
      if (I) B = I;
      else if (Q) B = `${qH4}${Q}`;
      else throw new tA0.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`, {
        logger: A.logger
      });
      let Y = new URL(B);
      UH4.checkUrl(Y, A.logger);
      let W = new wH4.NodeHttpHandler({
        requestTimeout: A.timeout ?? 1000,
        connectionTimeout: A.timeout ?? 1000
      });
      return NH4.retryWrapper(async () => {
        let J = eA0.createGetRequest(Y);
        if (G) J.headers.Authorization = G;
        else if (Z) J.headers.Authorization = (await EH4.default.readFile(Z)).toString();
        try {
          let F = await W.handle(J);
          return eA0.getCredentials(F.response).then((X) => zH4.setCredentialFeature(X, "CREDENTIALS_HTTP", "z"))
        } catch (F) {
          throw new tA0.CredentialsProviderError(String(F), {
            logger: A.logger
          })
        }
      }, A.maxRetries ?? 3, A.timeout ?? 1000)
    };
  A00.fromHttp = OH4
})
// @from(Start 3530429, End 3530681)
AI1 = z((vy1) => {
  Object.defineProperty(vy1, "__esModule", {
    value: !0
  });
  vy1.fromHttp = void 0;
  var TH4 = Q00();
  Object.defineProperty(vy1, "fromHttp", {
    enumerable: !0,
    get: function() {
      return TH4.fromHttp
    }
  })
})
// @from(Start 3530687, End 3532359)
gy1 = z((I00) => {
  Object.defineProperty(I00, "__esModule", {
    value: !0
  });
  I00.resolveHttpAuthSchemeConfig = I00.defaultSSOHttpAuthSchemeProvider = I00.defaultSSOHttpAuthSchemeParametersProvider = void 0;
  var SH4 = IB(),
    by1 = ZX(),
    _H4 = async (A, B, Q) => {
      return {
        operation: by1.getSmithyContext(B).operation,
        region: await by1.normalizeProvider(A.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
        })()
      }
    };
  I00.defaultSSOHttpAuthSchemeParametersProvider = _H4;

  function jH4(A) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "awsssoportal",
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

  function BI1(A) {
    return {
      schemeId: "smithy.api#noAuth"
    }
  }
  var yH4 = (A) => {
    let B = [];
    switch (A.operation) {
      case "GetRoleCredentials": {
        B.push(BI1(A));
        break
      }
      case "ListAccountRoles": {
        B.push(BI1(A));
        break
      }
      case "ListAccounts": {
        B.push(BI1(A));
        break
      }
      case "Logout": {
        B.push(BI1(A));
        break
      }
      default:
        B.push(jH4(A))
    }
    return B
  };
  I00.defaultSSOHttpAuthSchemeProvider = yH4;
  var kH4 = (A) => {
    let B = SH4.resolveAwsSdkSigV4Config(A);
    return Object.assign(B, {
      authSchemePreference: by1.normalizeProvider(A.authSchemePreference ?? [])
    })
  };
  I00.resolveHttpAuthSchemeConfig = kH4
})
// @from(Start 3532365, End 3549685)
k00 = z((tI8, GI1) => {
  var Z00, D00, Y00, W00, J00, F00, X00, V00, C00, K00, H00, z00, w00, QI1, hy1, E00, U00, N00, Sb, $00, q00, M00, L00, R00, O00, T00, P00, S00, II1, _00, j00, y00;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof GI1 === "object" && typeof tI8 === "object") A(Q(B, Q(tI8)));
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
    Z00 = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, D00 = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, Y00 = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, W00 = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, J00 = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, F00 = function(Z, D, Y, W, J, F) {
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
    }, X00 = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, V00 = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, C00 = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, K00 = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, H00 = function(Z, D, Y, W) {
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
    }, z00 = function(Z, D) {
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
    }, w00 = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) II1(D, Z, Y)
    }, II1 = Object.create ? function(Z, D, Y, W) {
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
    }, QI1 = function(Z) {
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
    }, hy1 = function(Z, D) {
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
    }, E00 = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat(hy1(arguments[D]));
      return Z
    }, U00 = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, N00 = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, Sb = function(Z) {
      return this instanceof Sb ? (this.v = Z, this) : new Sb(Z)
    }, $00 = function(Z, D, Y) {
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
        O.value instanceof Sb ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
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
    }, q00 = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: Sb(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, M00 = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof QI1 === "function" ? QI1(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
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
    }, L00 = function(Z, D) {
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
    R00 = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") II1(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, O00 = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, T00 = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, P00 = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, S00 = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, _00 = function(Z, D, Y) {
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
    j00 = function(Z) {
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
    }, y00 = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", Z00), A("__assign", D00), A("__rest", Y00), A("__decorate", W00), A("__param", J00), A("__esDecorate", F00), A("__runInitializers", X00), A("__propKey", V00), A("__setFunctionName", C00), A("__metadata", K00), A("__awaiter", H00), A("__generator", z00), A("__exportStar", w00), A("__createBinding", II1), A("__values", QI1), A("__read", hy1), A("__spread", E00), A("__spreadArrays", U00), A("__spreadArray", N00), A("__await", Sb), A("__asyncGenerator", $00), A("__asyncDelegator", q00), A("__asyncValues", M00), A("__makeTemplateObject", L00), A("__importStar", R00), A("__importDefault", O00), A("__classPrivateFieldGet", T00), A("__classPrivateFieldSet", P00), A("__classPrivateFieldIn", S00), A("__addDisposableResource", _00), A("__disposeResources", j00), A("__rewriteRelativeImportExtension", y00)
  })
})
// @from(Start 3549691, End 3553275)
x00 = z((eI8, vH4) => {
  vH4.exports = {
    name: "@aws-sdk/client-sso",
    description: "AWS SDK for JavaScript Sso Client for Node.js, Browser and React Native",
    version: "3.797.0",
    scripts: {
      build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
      "build:cjs": "node ../../scripts/compilation/inline client-sso",
      "build:es": "tsc -p tsconfig.es.json",
      "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
      "build:types": "tsc -p tsconfig.types.json",
      "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
      clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
      "extract:docs": "api-extractor run --local",
      "generate:client": "node ../../scripts/generate-clients/single-service --solo sso"
    },
    main: "./dist-cjs/index.js",
    types: "./dist-types/index.d.ts",
    module: "./dist-es/index.js",
    sideEffects: !1,
    dependencies: {
      "@aws-crypto/sha256-browser": "5.2.0",
      "@aws-crypto/sha256-js": "5.2.0",
      "@aws-sdk/core": "3.796.0",
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
      tslib: "^2.6.2"
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
    homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sso",
    repository: {
      type: "git",
      url: "https://github.com/aws/aws-sdk-js-v3.git",
      directory: "clients/client-sso"
    }
  }
})
// @from(Start 3553281, End 3555446)
I_ = z((AG8, d00) => {
  var {
    defineProperty: DI1,
    getOwnPropertyDescriptor: bH4,
    getOwnPropertyNames: gH4
  } = Object, hH4 = Object.prototype.hasOwnProperty, ZI1 = (A, B) => DI1(A, "name", {
    value: B,
    configurable: !0
  }), mH4 = (A, B) => {
    for (var Q in B) DI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, dH4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of gH4(B))
        if (!hH4.call(A, G) && G !== Q) DI1(A, G, {
          get: () => B[G],
          enumerable: !(I = bH4(B, G)) || I.enumerable
        })
    }
    return A
  }, uH4 = (A) => dH4(DI1({}, "__esModule", {
    value: !0
  }), A), v00 = {};
  mH4(v00, {
    NODE_APP_ID_CONFIG_OPTIONS: () => nH4,
    UA_APP_ID_ENV_NAME: () => h00,
    UA_APP_ID_INI_NAME: () => m00,
    createDefaultUserAgentProvider: () => g00,
    crtAvailability: () => b00,
    defaultUserAgent: () => cH4
  });
  d00.exports = uH4(v00);
  var f00 = Z1("os"),
    my1 = Z1("process"),
    b00 = {
      isCrtAvailable: !1
    },
    pH4 = ZI1(() => {
      if (b00.isCrtAvailable) return ["md/crt-avail"];
      return null
    }, "isCrtAvailable"),
    g00 = ZI1(({
      serviceId: A,
      clientVersion: B
    }) => {
      return async (Q) => {
        let I = [
            ["aws-sdk-js", B],
            ["ua", "2.1"],
            [`os/${f00.platform()}`, f00.release()],
            ["lang/js"],
            ["md/nodejs", `${my1.versions.node}`]
          ],
          G = pH4();
        if (G) I.push(G);
        if (A) I.push([`api/${A}`, B]);
        if (my1.env.AWS_EXECUTION_ENV) I.push([`exec-env/${my1.env.AWS_EXECUTION_ENV}`]);
        let Z = await Q?.userAgentAppId?.();
        return Z ? [...I, [`app/${Z}`]] : [...I]
      }
    }, "createDefaultUserAgentProvider"),
    cH4 = g00,
    lH4 = jL(),
    h00 = "AWS_SDK_UA_APP_ID",
    m00 = "sdk_ua_app_id",
    iH4 = "sdk-ua-app-id",
    nH4 = {
      environmentVariableSelector: ZI1((A) => A[h00], "environmentVariableSelector"),
      configFileSelector: ZI1((A) => A[m00] ?? A[iH4], "configFileSelector"),
      default: lH4.DEFAULT_UA_APP_ID
    }
})
// @from(Start 3555452, End 3557095)
G_ = z((BG8, l00) => {
  var {
    defineProperty: YI1,
    getOwnPropertyDescriptor: aH4,
    getOwnPropertyNames: sH4
  } = Object, rH4 = Object.prototype.hasOwnProperty, p00 = (A, B) => YI1(A, "name", {
    value: B,
    configurable: !0
  }), oH4 = (A, B) => {
    for (var Q in B) YI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, tH4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of sH4(B))
        if (!rH4.call(A, G) && G !== Q) YI1(A, G, {
          get: () => B[G],
          enumerable: !(I = aH4(B, G)) || I.enumerable
        })
    }
    return A
  }, eH4 = (A) => tH4(YI1({}, "__esModule", {
    value: !0
  }), A), c00 = {};
  oH4(c00, {
    Hash: () => Qz4
  });
  l00.exports = eH4(c00);
  var dy1 = MZ(),
    Az4 = RQ(),
    Bz4 = Z1("buffer"),
    u00 = Z1("crypto"),
    Qz4 = class {
      static {
        p00(this, "Hash")
      }
      constructor(A, B) {
        this.algorithmIdentifier = A, this.secret = B, this.reset()
      }
      update(A, B) {
        this.hash.update(Az4.toUint8Array(uy1(A, B)))
      }
      digest() {
        return Promise.resolve(this.hash.digest())
      }
      reset() {
        this.hash = this.secret ? u00.createHmac(this.algorithmIdentifier, uy1(this.secret)) : u00.createHash(this.algorithmIdentifier)
      }
    };

  function uy1(A, B) {
    if (Bz4.Buffer.isBuffer(A)) return A;
    if (typeof A === "string") return dy1.fromString(A, B);
    if (ArrayBuffer.isView(A)) return dy1.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength);
    return dy1.fromArrayBuffer(A)
  }
  p00(uy1, "castSourceData")
})
// @from(Start 3557101, End 3558526)
Z_ = z((IG8, a00) => {
  var {
    defineProperty: WI1,
    getOwnPropertyDescriptor: Iz4,
    getOwnPropertyNames: Gz4
  } = Object, Zz4 = Object.prototype.hasOwnProperty, Dz4 = (A, B) => WI1(A, "name", {
    value: B,
    configurable: !0
  }), Yz4 = (A, B) => {
    for (var Q in B) WI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Wz4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Gz4(B))
        if (!Zz4.call(A, G) && G !== Q) WI1(A, G, {
          get: () => B[G],
          enumerable: !(I = Iz4(B, G)) || I.enumerable
        })
    }
    return A
  }, Jz4 = (A) => Wz4(WI1({}, "__esModule", {
    value: !0
  }), A), n00 = {};
  Yz4(n00, {
    calculateBodyLength: () => Fz4
  });
  a00.exports = Jz4(n00);
  var i00 = Z1("fs"),
    Fz4 = Dz4((A) => {
      if (!A) return 0;
      if (typeof A === "string") return Buffer.byteLength(A);
      else if (typeof A.byteLength === "number") return A.byteLength;
      else if (typeof A.size === "number") return A.size;
      else if (typeof A.start === "number" && typeof A.end === "number") return A.end + 1 - A.start;
      else if (typeof A.path === "string" || Buffer.isBuffer(A.path)) return i00.lstatSync(A.path).size;
      else if (typeof A.fd === "number") return i00.fstatSync(A.fd).size;
      throw new Error(`Body Length computation failed for ${A}`)
    }, "calculateBodyLength")
})
// @from(Start 3558532, End 3561315)
py1 = z((GG8, I20) => {
  var {
    defineProperty: JI1,
    getOwnPropertyDescriptor: Xz4,
    getOwnPropertyNames: Vz4
  } = Object, Cz4 = Object.prototype.hasOwnProperty, FI1 = (A, B) => JI1(A, "name", {
    value: B,
    configurable: !0
  }), Kz4 = (A, B) => {
    for (var Q in B) JI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Hz4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Vz4(B))
        if (!Cz4.call(A, G) && G !== Q) JI1(A, G, {
          get: () => B[G],
          enumerable: !(I = Xz4(B, G)) || I.enumerable
        })
    }
    return A
  }, zz4 = (A) => Hz4(JI1({}, "__esModule", {
    value: !0
  }), A), s00 = {};
  Kz4(s00, {
    AlgorithmId: () => e00,
    EndpointURLScheme: () => t00,
    FieldPosition: () => A20,
    HttpApiKeyAuthLocation: () => o00,
    HttpAuthLocation: () => r00,
    IniSectionType: () => B20,
    RequestHandlerProtocol: () => Q20,
    SMITHY_CONTEXT_KEY: () => $z4,
    getDefaultClientConfiguration: () => Uz4,
    resolveDefaultRuntimeConfig: () => Nz4
  });
  I20.exports = zz4(s00);
  var r00 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(r00 || {}),
    o00 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(o00 || {}),
    t00 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(t00 || {}),
    e00 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(e00 || {}),
    wz4 = FI1((A) => {
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
    Ez4 = FI1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    Uz4 = FI1((A) => {
      return wz4(A)
    }, "getDefaultClientConfiguration"),
    Nz4 = FI1((A) => {
      return Ez4(A)
    }, "resolveDefaultRuntimeConfig"),
    A20 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(A20 || {}),
    $z4 = "__smithy_context",
    B20 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(B20 || {}),
    Q20 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(Q20 || {})
})