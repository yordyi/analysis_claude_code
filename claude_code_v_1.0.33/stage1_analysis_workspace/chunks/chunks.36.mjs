
// @from(Start 3659490, End 3676810)
Ok1 = z((hG8, yI1) => {
  var S40, _40, j40, y40, k40, x40, f40, v40, b40, g40, h40, m40, d40, _I1, Rk1, u40, p40, c40, db, l40, i40, n40, a40, s40, r40, o40, t40, e40, jI1, A60, B60, Q60;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof yI1 === "object" && typeof hG8 === "object") A(Q(B, Q(hG8)));
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
    S40 = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, _40 = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, j40 = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, y40 = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, k40 = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, x40 = function(Z, D, Y, W, J, F) {
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
    }, f40 = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, v40 = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, b40 = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, g40 = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, h40 = function(Z, D, Y, W) {
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
    }, m40 = function(Z, D) {
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
    }, d40 = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) jI1(D, Z, Y)
    }, jI1 = Object.create ? function(Z, D, Y, W) {
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
    }, _I1 = function(Z) {
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
    }, Rk1 = function(Z, D) {
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
    }, u40 = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat(Rk1(arguments[D]));
      return Z
    }, p40 = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, c40 = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, db = function(Z) {
      return this instanceof db ? (this.v = Z, this) : new db(Z)
    }, l40 = function(Z, D, Y) {
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
        O.value instanceof db ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
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
    }, i40 = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: db(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, n40 = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof _I1 === "function" ? _I1(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
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
    }, a40 = function(Z, D) {
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
    s40 = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") jI1(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, r40 = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, o40 = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, t40 = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, e40 = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, A60 = function(Z, D, Y) {
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
    B60 = function(Z) {
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
    }, Q60 = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", S40), A("__assign", _40), A("__rest", j40), A("__decorate", y40), A("__param", k40), A("__esDecorate", x40), A("__runInitializers", f40), A("__propKey", v40), A("__setFunctionName", b40), A("__metadata", g40), A("__awaiter", h40), A("__generator", m40), A("__exportStar", d40), A("__createBinding", jI1), A("__values", _I1), A("__read", Rk1), A("__spread", u40), A("__spreadArrays", p40), A("__spreadArray", c40), A("__await", db), A("__asyncGenerator", l40), A("__asyncDelegator", i40), A("__asyncValues", n40), A("__makeTemplateObject", a40), A("__importStar", s40), A("__importDefault", r40), A("__classPrivateFieldGet", o40), A("__classPrivateFieldSet", t40), A("__classPrivateFieldIn", e40), A("__addDisposableResource", A60), A("__disposeResources", B60), A("__rewriteRelativeImportExtension", Q60)
  })
})
// @from(Start 3676816, End 3681097)
Tk1 = z((mG8, F$4) => {
  F$4.exports = {
    name: "@aws-sdk/nested-clients",
    version: "3.797.0",
    description: "Nested clients for AWS SDK packages.",
    main: "./dist-cjs/index.js",
    module: "./dist-es/index.js",
    types: "./dist-types/index.d.ts",
    scripts: {
      build: "yarn lint && concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
      "build:cjs": "node ../../scripts/compilation/inline nested-clients",
      "build:es": "tsc -p tsconfig.es.json",
      "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
      "build:types": "tsc -p tsconfig.types.json",
      "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
      clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
      lint: "node ../../scripts/validation/submodules-linter.js --pkg nested-clients",
      test: "yarn g:vitest run",
      "test:watch": "yarn g:vitest watch"
    },
    engines: {
      node: ">=18.0.0"
    },
    author: {
      name: "AWS SDK for JavaScript Team",
      url: "https://aws.amazon.com/javascript/"
    },
    license: "Apache-2.0",
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
      concurrently: "7.0.0",
      "downlevel-dts": "0.10.1",
      rimraf: "3.0.2",
      typescript: "~5.2.2"
    },
    typesVersions: {
      "<4.0": {
        "dist-types/*": ["dist-types/ts3.4/*"]
      }
    },
    files: ["./sso-oidc.d.ts", "./sso-oidc.js", "./sts.d.ts", "./sts.js", "dist-*/**"],
    browser: {
      "./dist-es/submodules/sso-oidc/runtimeConfig": "./dist-es/submodules/sso-oidc/runtimeConfig.browser",
      "./dist-es/submodules/sts/runtimeConfig": "./dist-es/submodules/sts/runtimeConfig.browser"
    },
    "react-native": {},
    homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients",
    repository: {
      type: "git",
      url: "https://github.com/aws/aws-sdk-js-v3.git",
      directory: "packages/nested-clients"
    },
    exports: {
      "./sso-oidc": {
        types: "./dist-types/submodules/sso-oidc/index.d.ts",
        module: "./dist-es/submodules/sso-oidc/index.js",
        node: "./dist-cjs/submodules/sso-oidc/index.js",
        import: "./dist-es/submodules/sso-oidc/index.js",
        require: "./dist-cjs/submodules/sso-oidc/index.js"
      },
      "./sts": {
        types: "./dist-types/submodules/sts/index.d.ts",
        module: "./dist-es/submodules/sts/index.js",
        node: "./dist-cjs/submodules/sts/index.js",
        import: "./dist-es/submodules/sts/index.js",
        require: "./dist-cjs/submodules/sts/index.js"
      }
    }
  }
})
// @from(Start 3681103, End 3681593)
Z60 = z((I60) => {
  Object.defineProperty(I60, "__esModule", {
    value: !0
  });
  I60.fromBase64 = void 0;
  var X$4 = MZ(),
    V$4 = /^[A-Za-z0-9+/]*={0,2}$/,
    C$4 = (A) => {
      if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
      if (!V$4.exec(A)) throw new TypeError("Invalid base64 string.");
      let B = X$4.fromString(A, "base64");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
    };
  I60.fromBase64 = C$4
})
// @from(Start 3681599, End 3682172)
W60 = z((D60) => {
  Object.defineProperty(D60, "__esModule", {
    value: !0
  });
  D60.toBase64 = void 0;
  var K$4 = MZ(),
    H$4 = RQ(),
    z$4 = (A) => {
      let B;
      if (typeof A === "string") B = H$4.fromUtf8(A);
      else B = A;
      if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
      return K$4.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
    };
  D60.toBase64 = z$4
})
// @from(Start 3682178, End 3682874)
_k1 = z((pG8, kI1) => {
  var {
    defineProperty: J60,
    getOwnPropertyDescriptor: w$4,
    getOwnPropertyNames: E$4
  } = Object, U$4 = Object.prototype.hasOwnProperty, Pk1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of E$4(B))
        if (!U$4.call(A, G) && G !== Q) J60(A, G, {
          get: () => B[G],
          enumerable: !(I = w$4(B, G)) || I.enumerable
        })
    }
    return A
  }, F60 = (A, B, Q) => (Pk1(A, B, "default"), Q && Pk1(Q, B, "default")), N$4 = (A) => Pk1(J60({}, "__esModule", {
    value: !0
  }), A), Sk1 = {};
  kI1.exports = N$4(Sk1);
  F60(Sk1, Z60(), kI1.exports);
  F60(Sk1, W60(), kI1.exports)
})
// @from(Start 3682880, End 3687520)
T60 = z((R60) => {
  Object.defineProperty(R60, "__esModule", {
    value: !0
  });
  R60.ruleSet = void 0;
  var $60 = "required",
    VX = "fn",
    CX = "argv",
    cb = "ref",
    X60 = !0,
    V60 = "isSet",
    Sa = "booleanEquals",
    ub = "error",
    pb = "endpoint",
    KN = "tree",
    jk1 = "PartitionResult",
    yk1 = "getAttr",
    C60 = {
      [$60]: !1,
      type: "String"
    },
    K60 = {
      [$60]: !0,
      default: !1,
      type: "Boolean"
    },
    H60 = {
      [cb]: "Endpoint"
    },
    q60 = {
      [VX]: Sa,
      [CX]: [{
        [cb]: "UseFIPS"
      }, !0]
    },
    M60 = {
      [VX]: Sa,
      [CX]: [{
        [cb]: "UseDualStack"
      }, !0]
    },
    XX = {},
    z60 = {
      [VX]: yk1,
      [CX]: [{
        [cb]: jk1
      }, "supportsFIPS"]
    },
    L60 = {
      [cb]: jk1
    },
    w60 = {
      [VX]: Sa,
      [CX]: [!0, {
        [VX]: yk1,
        [CX]: [L60, "supportsDualStack"]
      }]
    },
    E60 = [q60],
    U60 = [M60],
    N60 = [{
      [cb]: "Region"
    }],
    $$4 = {
      version: "1.0",
      parameters: {
        Region: C60,
        UseDualStack: K60,
        UseFIPS: K60,
        Endpoint: C60
      },
      rules: [{
        conditions: [{
          [VX]: V60,
          [CX]: [H60]
        }],
        rules: [{
          conditions: E60,
          error: "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: ub
        }, {
          conditions: U60,
          error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
          type: ub
        }, {
          endpoint: {
            url: H60,
            properties: XX,
            headers: XX
          },
          type: pb
        }],
        type: KN
      }, {
        conditions: [{
          [VX]: V60,
          [CX]: N60
        }],
        rules: [{
          conditions: [{
            [VX]: "aws.partition",
            [CX]: N60,
            assign: jk1
          }],
          rules: [{
            conditions: [q60, M60],
            rules: [{
              conditions: [{
                [VX]: Sa,
                [CX]: [X60, z60]
              }, w60],
              rules: [{
                endpoint: {
                  url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                  properties: XX,
                  headers: XX
                },
                type: pb
              }],
              type: KN
            }, {
              error: "FIPS and DualStack are enabled, but this partition does not support one or both",
              type: ub
            }],
            type: KN
          }, {
            conditions: E60,
            rules: [{
              conditions: [{
                [VX]: Sa,
                [CX]: [z60, X60]
              }],
              rules: [{
                conditions: [{
                  [VX]: "stringEquals",
                  [CX]: [{
                    [VX]: yk1,
                    [CX]: [L60, "name"]
                  }, "aws-us-gov"]
                }],
                endpoint: {
                  url: "https://oidc.{Region}.amazonaws.com",
                  properties: XX,
                  headers: XX
                },
                type: pb
              }, {
                endpoint: {
                  url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                  properties: XX,
                  headers: XX
                },
                type: pb
              }],
              type: KN
            }, {
              error: "FIPS is enabled but this partition does not support FIPS",
              type: ub
            }],
            type: KN
          }, {
            conditions: U60,
            rules: [{
              conditions: [w60],
              rules: [{
                endpoint: {
                  url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                  properties: XX,
                  headers: XX
                },
                type: pb
              }],
              type: KN
            }, {
              error: "DualStack is enabled but this partition does not support DualStack",
              type: ub
            }],
            type: KN
          }, {
            endpoint: {
              url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}",
              properties: XX,
              headers: XX
            },
            type: pb
          }],
          type: KN
        }],
        type: KN
      }, {
        error: "Invalid Configuration: Missing Region",
        type: ub
      }]
    };
  R60.ruleSet = $$4
})
// @from(Start 3687526, End 3688084)
_60 = z((P60) => {
  Object.defineProperty(P60, "__esModule", {
    value: !0
  });
  P60.defaultEndpointResolver = void 0;
  var q$4 = RL(),
    kk1 = LL(),
    M$4 = T60(),
    L$4 = new kk1.EndpointCache({
      size: 50,
      params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
    }),
    R$4 = (A, B = {}) => {
      return L$4.get(A, () => kk1.resolveEndpoint(M$4.ruleSet, {
        endpointParams: A,
        logger: B.logger
      }))
    };
  P60.defaultEndpointResolver = R$4;
  kk1.customEndpointFunctions.aws = q$4.awsEndpointFunctions
})
// @from(Start 3688090, End 3689509)
f60 = z((k60) => {
  Object.defineProperty(k60, "__esModule", {
    value: !0
  });
  k60.getRuntimeConfig = void 0;
  var O$4 = IB(),
    T$4 = NI(),
    P$4 = p3(),
    S$4 = FN(),
    j60 = _k1(),
    y60 = RQ(),
    _$4 = Lk1(),
    j$4 = _60(),
    y$4 = (A) => {
      return {
        apiVersion: "2019-06-10",
        base64Decoder: A?.base64Decoder ?? j60.fromBase64,
        base64Encoder: A?.base64Encoder ?? j60.toBase64,
        disableHostPrefix: A?.disableHostPrefix ?? !1,
        endpointProvider: A?.endpointProvider ?? j$4.defaultEndpointResolver,
        extensions: A?.extensions ?? [],
        httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? _$4.defaultSSOOIDCHttpAuthSchemeProvider,
        httpAuthSchemes: A?.httpAuthSchemes ?? [{
          schemeId: "aws.auth#sigv4",
          identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
          signer: new O$4.AwsSdkSigV4Signer
        }, {
          schemeId: "smithy.api#noAuth",
          identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new T$4.NoAuthSigner
        }],
        logger: A?.logger ?? new P$4.NoOpLogger,
        serviceId: A?.serviceId ?? "SSO OIDC",
        urlParser: A?.urlParser ?? S$4.parseUrl,
        utf8Decoder: A?.utf8Decoder ?? y60.fromUtf8,
        utf8Encoder: A?.utf8Encoder ?? y60.toUtf8
      }
    };
  k60.getRuntimeConfig = y$4
})
// @from(Start 3689515, End 3691612)
d60 = z((h60) => {
  Object.defineProperty(h60, "__esModule", {
    value: !0
  });
  h60.getRuntimeConfig = void 0;
  var k$4 = Ok1(),
    x$4 = k$4.__importDefault(Tk1()),
    f$4 = IB(),
    v60 = I_(),
    xI1 = _D(),
    v$4 = G_(),
    b60 = KJ(),
    lb = qC(),
    g60 = DN(),
    b$4 = Z_(),
    g$4 = vL(),
    h$4 = f60(),
    m$4 = p3(),
    d$4 = Y_(),
    u$4 = p3(),
    p$4 = (A) => {
      u$4.emitWarningIfUnsupportedVersion(process.version);
      let B = d$4.resolveDefaultsModeConfig(A),
        Q = () => B().then(m$4.loadConfigsForDefaultMode),
        I = h$4.getRuntimeConfig(A);
      f$4.emitWarningIfUnsupportedVersion(process.version);
      let G = {
        profile: A?.profile
      };
      return {
        ...I,
        ...A,
        runtime: "node",
        defaultsMode: B,
        bodyLengthChecker: A?.bodyLengthChecker ?? b$4.calculateBodyLength,
        defaultUserAgentProvider: A?.defaultUserAgentProvider ?? v60.createDefaultUserAgentProvider({
          serviceId: I.serviceId,
          clientVersion: x$4.default.version
        }),
        maxAttempts: A?.maxAttempts ?? lb.loadConfig(b60.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
        region: A?.region ?? lb.loadConfig(xI1.NODE_REGION_CONFIG_OPTIONS, {
          ...xI1.NODE_REGION_CONFIG_FILE_OPTIONS,
          ...G
        }),
        requestHandler: g60.NodeHttpHandler.create(A?.requestHandler ?? Q),
        retryMode: A?.retryMode ?? lb.loadConfig({
          ...b60.NODE_RETRY_MODE_CONFIG_OPTIONS,
          default: async () => (await Q()).retryMode || g$4.DEFAULT_RETRY_MODE
        }, A),
        sha256: A?.sha256 ?? v$4.Hash.bind(null, "sha256"),
        streamCollector: A?.streamCollector ?? g60.streamCollector,
        useDualstackEndpoint: A?.useDualstackEndpoint ?? lb.loadConfig(xI1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, G),
        useFipsEndpoint: A?.useFipsEndpoint ?? lb.loadConfig(xI1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, G),
        userAgentAppId: A?.userAgentAppId ?? lb.loadConfig(v60.NODE_APP_ID_CONFIG_OPTIONS, G)
      }
    };
  h60.getRuntimeConfig = p$4
})
// @from(Start 3691618, End 3696125)
vI1 = z((aG8, i60) => {
  var {
    defineProperty: fI1,
    getOwnPropertyDescriptor: c$4,
    getOwnPropertyNames: l$4
  } = Object, i$4 = Object.prototype.hasOwnProperty, dL = (A, B) => fI1(A, "name", {
    value: B,
    configurable: !0
  }), n$4 = (A, B) => {
    for (var Q in B) fI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, a$4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of l$4(B))
        if (!i$4.call(A, G) && G !== Q) fI1(A, G, {
          get: () => B[G],
          enumerable: !(I = c$4(B, G)) || I.enumerable
        })
    }
    return A
  }, s$4 = (A) => a$4(fI1({}, "__esModule", {
    value: !0
  }), A), u60 = {};
  n$4(u60, {
    Field: () => t$4,
    Fields: () => e$4,
    HttpRequest: () => Aq4,
    HttpResponse: () => Bq4,
    IHttpRequest: () => p60.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => r$4,
    isValidHostname: () => l60,
    resolveHttpHandlerRuntimeConfig: () => o$4
  });
  i60.exports = s$4(u60);
  var r$4 = dL((A) => {
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
    o$4 = dL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    p60 = Fk1(),
    t$4 = class {
      static {
        dL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = p60.FieldPosition.HEADER,
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
    e$4 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        dL(this, "Fields")
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
    Aq4 = class A {
      static {
        dL(this, "HttpRequest")
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
        if (Q.query) Q.query = c60(Q.query);
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

  function c60(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  dL(c60, "cloneQuery");
  var Bq4 = class {
    static {
      dL(this, "HttpResponse")
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

  function l60(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  dL(l60, "isValidHostname")
})
// @from(Start 3696131, End 3715607)
vk1 = z((tG8, U50) => {
  var {
    defineProperty: bI1,
    getOwnPropertyDescriptor: Qq4,
    getOwnPropertyNames: Iq4
  } = Object, Gq4 = Object.prototype.hasOwnProperty, X6 = (A, B) => bI1(A, "name", {
    value: B,
    configurable: !0
  }), Zq4 = (A, B) => {
    for (var Q in B) bI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Dq4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Iq4(B))
        if (!Gq4.call(A, G) && G !== Q) bI1(A, G, {
          get: () => B[G],
          enumerable: !(I = Qq4(B, G)) || I.enumerable
        })
    }
    return A
  }, Yq4 = (A) => Dq4(bI1({}, "__esModule", {
    value: !0
  }), A), A50 = {};
  Zq4(A50, {
    $Command: () => I50.Command,
    AccessDeniedException: () => G50,
    AuthorizationPendingException: () => Z50,
    CreateTokenCommand: () => w50,
    CreateTokenRequestFilterSensitiveLog: () => D50,
    CreateTokenResponseFilterSensitiveLog: () => Y50,
    ExpiredTokenException: () => W50,
    InternalServerException: () => J50,
    InvalidClientException: () => F50,
    InvalidGrantException: () => X50,
    InvalidRequestException: () => V50,
    InvalidScopeException: () => C50,
    SSOOIDC: () => E50,
    SSOOIDCClient: () => Q50,
    SSOOIDCServiceException: () => HJ,
    SlowDownException: () => K50,
    UnauthorizedClientException: () => H50,
    UnsupportedGrantTypeException: () => z50,
    __Client: () => B50.Client
  });
  U50.exports = Yq4(A50);
  var n60 = cS(),
    Wq4 = lS(),
    Jq4 = iS(),
    a60 = jL(),
    Fq4 = _D(),
    xk1 = NI(),
    Xq4 = tS(),
    Vq4 = hz(),
    s60 = KJ(),
    B50 = p3(),
    r60 = Lk1(),
    Cq4 = X6((A) => {
      return Object.assign(A, {
        useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
        useFipsEndpoint: A.useFipsEndpoint ?? !1,
        defaultSigningName: "sso-oauth"
      })
    }, "resolveClientEndpointParameters"),
    Kq4 = {
      UseFIPS: {
        type: "builtInParams",
        name: "useFipsEndpoint"
      },
      Endpoint: {
        type: "builtInParams",
        name: "endpoint"
      },
      Region: {
        type: "builtInParams",
        name: "region"
      },
      UseDualStack: {
        type: "builtInParams",
        name: "useDualstackEndpoint"
      }
    },
    Hq4 = d60(),
    o60 = W_(),
    t60 = vI1(),
    e60 = p3(),
    zq4 = X6((A) => {
      let {
        httpAuthSchemes: B,
        httpAuthSchemeProvider: Q,
        credentials: I
      } = A;
      return {
        setHttpAuthScheme(G) {
          let Z = B.findIndex((D) => D.schemeId === G.schemeId);
          if (Z === -1) B.push(G);
          else B.splice(Z, 1, G)
        },
        httpAuthSchemes() {
          return B
        },
        setHttpAuthSchemeProvider(G) {
          Q = G
        },
        httpAuthSchemeProvider() {
          return Q
        },
        setCredentials(G) {
          I = G
        },
        credentials() {
          return I
        }
      }
    }, "getHttpAuthExtensionConfiguration"),
    wq4 = X6((A) => {
      return {
        httpAuthSchemes: A.httpAuthSchemes(),
        httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
        credentials: A.credentials()
      }
    }, "resolveHttpAuthRuntimeConfig"),
    Eq4 = X6((A, B) => {
      let Q = Object.assign(o60.getAwsRegionExtensionConfiguration(A), e60.getDefaultExtensionConfiguration(A), t60.getHttpHandlerExtensionConfiguration(A), zq4(A));
      return B.forEach((I) => I.configure(Q)), Object.assign(A, o60.resolveAwsRegionExtensionConfiguration(Q), e60.resolveDefaultRuntimeConfig(Q), t60.resolveHttpHandlerRuntimeConfig(Q), wq4(Q))
    }, "resolveRuntimeExtensions"),
    Q50 = class extends B50.Client {
      static {
        X6(this, "SSOOIDCClient")
      }
      config;
      constructor(...[A]) {
        let B = Hq4.getRuntimeConfig(A || {});
        super(B);
        this.initConfig = B;
        let Q = Cq4(B),
          I = a60.resolveUserAgentConfig(Q),
          G = s60.resolveRetryConfig(I),
          Z = Fq4.resolveRegionConfig(G),
          D = n60.resolveHostHeaderConfig(Z),
          Y = Vq4.resolveEndpointConfig(D),
          W = r60.resolveHttpAuthSchemeConfig(Y),
          J = Eq4(W, A?.extensions || []);
        this.config = J, this.middlewareStack.use(a60.getUserAgentPlugin(this.config)), this.middlewareStack.use(s60.getRetryPlugin(this.config)), this.middlewareStack.use(Xq4.getContentLengthPlugin(this.config)), this.middlewareStack.use(n60.getHostHeaderPlugin(this.config)), this.middlewareStack.use(Wq4.getLoggerPlugin(this.config)), this.middlewareStack.use(Jq4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(xk1.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: r60.defaultSSOOIDCHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: X6(async (F) => new xk1.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": F.credentials
          }), "identityProviderConfigProvider")
        })), this.middlewareStack.use(xk1.getHttpSigningPlugin(this.config))
      }
      destroy() {
        super.destroy()
      }
    },
    Uq4 = p3(),
    Nq4 = hz(),
    $q4 = yz(),
    I50 = p3(),
    ib = p3(),
    qq4 = p3(),
    HJ = class A extends qq4.ServiceException {
      static {
        X6(this, "SSOOIDCServiceException")
      }
      constructor(B) {
        super(B);
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    G50 = class A extends HJ {
      static {
        X6(this, "AccessDeniedException")
      }
      name = "AccessDeniedException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "AccessDeniedException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    Z50 = class A extends HJ {
      static {
        X6(this, "AuthorizationPendingException")
      }
      name = "AuthorizationPendingException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "AuthorizationPendingException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    D50 = X6((A) => ({
      ...A,
      ...A.clientSecret && {
        clientSecret: ib.SENSITIVE_STRING
      },
      ...A.refreshToken && {
        refreshToken: ib.SENSITIVE_STRING
      },
      ...A.codeVerifier && {
        codeVerifier: ib.SENSITIVE_STRING
      }
    }), "CreateTokenRequestFilterSensitiveLog"),
    Y50 = X6((A) => ({
      ...A,
      ...A.accessToken && {
        accessToken: ib.SENSITIVE_STRING
      },
      ...A.refreshToken && {
        refreshToken: ib.SENSITIVE_STRING
      },
      ...A.idToken && {
        idToken: ib.SENSITIVE_STRING
      }
    }), "CreateTokenResponseFilterSensitiveLog"),
    W50 = class A extends HJ {
      static {
        X6(this, "ExpiredTokenException")
      }
      name = "ExpiredTokenException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "ExpiredTokenException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    J50 = class A extends HJ {
      static {
        X6(this, "InternalServerException")
      }
      name = "InternalServerException";
      $fault = "server";
      error;
      error_description;
      constructor(B) {
        super({
          name: "InternalServerException",
          $fault: "server",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    F50 = class A extends HJ {
      static {
        X6(this, "InvalidClientException")
      }
      name = "InvalidClientException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "InvalidClientException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    X50 = class A extends HJ {
      static {
        X6(this, "InvalidGrantException")
      }
      name = "InvalidGrantException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "InvalidGrantException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    V50 = class A extends HJ {
      static {
        X6(this, "InvalidRequestException")
      }
      name = "InvalidRequestException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "InvalidRequestException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    C50 = class A extends HJ {
      static {
        X6(this, "InvalidScopeException")
      }
      name = "InvalidScopeException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "InvalidScopeException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    K50 = class A extends HJ {
      static {
        X6(this, "SlowDownException")
      }
      name = "SlowDownException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "SlowDownException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    H50 = class A extends HJ {
      static {
        X6(this, "UnauthorizedClientException")
      }
      name = "UnauthorizedClientException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "UnauthorizedClientException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    z50 = class A extends HJ {
      static {
        X6(this, "UnsupportedGrantTypeException")
      }
      name = "UnsupportedGrantTypeException";
      $fault = "client";
      error;
      error_description;
      constructor(B) {
        super({
          name: "UnsupportedGrantTypeException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.error = B.error, this.error_description = B.error_description
      }
    },
    fk1 = IB(),
    Mq4 = NI(),
    j2 = p3(),
    Lq4 = X6(async (A, B) => {
      let Q = Mq4.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/token");
      let G;
      return G = JSON.stringify(j2.take(A, {
        clientId: [],
        clientSecret: [],
        code: [],
        codeVerifier: [],
        deviceCode: [],
        grantType: [],
        redirectUri: [],
        refreshToken: [],
        scope: X6((Z) => j2._json(Z), "scope")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_CreateTokenCommand"),
    Rq4 = X6(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return Oq4(A, B);
      let Q = j2.map({
          $metadata: KX(A)
        }),
        I = j2.expectNonNull(j2.expectObject(await fk1.parseJsonBody(A.body, B)), "body"),
        G = j2.take(I, {
          accessToken: j2.expectString,
          expiresIn: j2.expectInt32,
          idToken: j2.expectString,
          refreshToken: j2.expectString,
          tokenType: j2.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_CreateTokenCommand"),
    Oq4 = X6(async (A, B) => {
      let Q = {
          ...A,
          body: await fk1.parseJsonErrorBody(A.body, B)
        },
        I = fk1.loadRestJsonErrorCode(A, Q.body);
      switch (I) {
        case "AccessDeniedException":
        case "com.amazonaws.ssooidc#AccessDeniedException":
          throw await Pq4(Q, B);
        case "AuthorizationPendingException":
        case "com.amazonaws.ssooidc#AuthorizationPendingException":
          throw await Sq4(Q, B);
        case "ExpiredTokenException":
        case "com.amazonaws.ssooidc#ExpiredTokenException":
          throw await _q4(Q, B);
        case "InternalServerException":
        case "com.amazonaws.ssooidc#InternalServerException":
          throw await jq4(Q, B);
        case "InvalidClientException":
        case "com.amazonaws.ssooidc#InvalidClientException":
          throw await yq4(Q, B);
        case "InvalidGrantException":
        case "com.amazonaws.ssooidc#InvalidGrantException":
          throw await kq4(Q, B);
        case "InvalidRequestException":
        case "com.amazonaws.ssooidc#InvalidRequestException":
          throw await xq4(Q, B);
        case "InvalidScopeException":
        case "com.amazonaws.ssooidc#InvalidScopeException":
          throw await fq4(Q, B);
        case "SlowDownException":
        case "com.amazonaws.ssooidc#SlowDownException":
          throw await vq4(Q, B);
        case "UnauthorizedClientException":
        case "com.amazonaws.ssooidc#UnauthorizedClientException":
          throw await bq4(Q, B);
        case "UnsupportedGrantTypeException":
        case "com.amazonaws.ssooidc#UnsupportedGrantTypeException":
          throw await gq4(Q, B);
        default:
          let G = Q.body;
          return Tq4({
            output: A,
            parsedBody: G,
            errorCode: I
          })
      }
    }, "de_CommandError"),
    Tq4 = j2.withBaseException(HJ),
    Pq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new G50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_AccessDeniedExceptionRes"),
    Sq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new Z50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_AuthorizationPendingExceptionRes"),
    _q4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new W50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_ExpiredTokenExceptionRes"),
    jq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new J50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_InternalServerExceptionRes"),
    yq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new F50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_InvalidClientExceptionRes"),
    kq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new X50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_InvalidGrantExceptionRes"),
    xq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new V50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_InvalidRequestExceptionRes"),
    fq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new C50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_InvalidScopeExceptionRes"),
    vq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new K50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_SlowDownExceptionRes"),
    bq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new H50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_UnauthorizedClientExceptionRes"),
    gq4 = X6(async (A, B) => {
      let Q = j2.map({}),
        I = A.body,
        G = j2.take(I, {
          error: j2.expectString,
          error_description: j2.expectString
        });
      Object.assign(Q, G);
      let Z = new z50({
        $metadata: KX(A),
        ...Q
      });
      return j2.decorateServiceException(Z, A.body)
    }, "de_UnsupportedGrantTypeExceptionRes"),
    KX = X6((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    w50 = class extends I50.Command.classBuilder().ep(Kq4).m(function(A, B, Q, I) {
      return [$q4.getSerdePlugin(Q, this.serialize, this.deserialize), Nq4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").f(D50, Y50).ser(Lq4).de(Rq4).build() {
      static {
        X6(this, "CreateTokenCommand")
      }
    },
    hq4 = {
      CreateTokenCommand: w50
    },
    E50 = class extends Q50 {
      static {
        X6(this, "SSOOIDC")
      }
    };
  Uq4.createAggregatedClient(hq4, E50)
})
// @from(Start 3715613, End 3721038)
T50 = z((QZ8, O50) => {
  var {
    create: mq4,
    defineProperty: ja,
    getOwnPropertyDescriptor: dq4,
    getOwnPropertyNames: uq4,
    getPrototypeOf: pq4
  } = Object, cq4 = Object.prototype.hasOwnProperty, uL = (A, B) => ja(A, "name", {
    value: B,
    configurable: !0
  }), lq4 = (A, B) => {
    for (var Q in B) ja(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, q50 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of uq4(B))
        if (!cq4.call(A, G) && G !== Q) ja(A, G, {
          get: () => B[G],
          enumerable: !(I = dq4(B, G)) || I.enumerable
        })
    }
    return A
  }, M50 = (A, B, Q) => (Q = A != null ? mq4(pq4(A)) : {}, q50(B || !A || !A.__esModule ? ja(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q, A)), iq4 = (A) => q50(ja({}, "__esModule", {
    value: !0
  }), A), L50 = {};
  lq4(L50, {
    fromSso: () => R50,
    fromStatic: () => eq4,
    nodeProvider: () => AM4
  });
  O50.exports = iq4(L50);
  var nq4 = 300000,
    bk1 = "To refresh this SSO session run 'aws sso login' with the corresponding profile.",
    aq4 = uL(async (A, B = {}) => {
      let {
        SSOOIDCClient: Q
      } = await Promise.resolve().then(() => M50(vk1()));
      return new Q(Object.assign({}, B.clientConfig ?? {}, {
        region: A ?? B.clientConfig?.region,
        logger: B.clientConfig?.logger ?? B.parentClientConfig?.logger
      }))
    }, "getSsoOidcClient"),
    sq4 = uL(async (A, B, Q = {}) => {
      let {
        CreateTokenCommand: I
      } = await Promise.resolve().then(() => M50(vk1()));
      return (await aq4(B, Q)).send(new I({
        clientId: A.clientId,
        clientSecret: A.clientSecret,
        refreshToken: A.refreshToken,
        grantType: "refresh_token"
      }))
    }, "getNewSsoOidcToken"),
    OC = $I(),
    N50 = uL((A) => {
      if (A.expiration && A.expiration.getTime() < Date.now()) throw new OC.TokenProviderError(`Token is expired. ${bk1}`, !1)
    }, "validateTokenExpiry"),
    F_ = uL((A, B, Q = !1) => {
      if (typeof B === "undefined") throw new OC.TokenProviderError(`Value not present for '${A}' in SSO Token${Q?". Cannot refresh":""}. ${bk1}`, !1)
    }, "validateTokenKey"),
    _a = xL(),
    rq4 = Z1("fs"),
    {
      writeFile: oq4
    } = rq4.promises,
    tq4 = uL((A, B) => {
      let Q = _a.getSSOTokenFilepath(A),
        I = JSON.stringify(B, null, 2);
      return oq4(Q, I)
    }, "writeSSOTokenToFile"),
    $50 = new Date(0),
    R50 = uL((A = {}) => async ({
      callerClientConfig: B
    } = {}) => {
      let Q = {
        ...A,
        parentClientConfig: {
          ...B,
          ...A.parentClientConfig
        }
      };
      Q.logger?.debug("@aws-sdk/token-providers - fromSso");
      let I = await _a.parseKnownFiles(Q),
        G = _a.getProfileName({
          profile: Q.profile ?? B?.profile
        }),
        Z = I[G];
      if (!Z) throw new OC.TokenProviderError(`Profile '${G}' could not be found in shared credentials file.`, !1);
      else if (!Z.sso_session) throw new OC.TokenProviderError(`Profile '${G}' is missing required property 'sso_session'.`);
      let D = Z.sso_session,
        W = (await _a.loadSsoSessionData(Q))[D];
      if (!W) throw new OC.TokenProviderError(`Sso session '${D}' could not be found in shared credentials file.`, !1);
      for (let E of ["sso_start_url", "sso_region"])
        if (!W[E]) throw new OC.TokenProviderError(`Sso session '${D}' is missing required property '${E}'.`, !1);
      let {
        sso_start_url: J,
        sso_region: F
      } = W, X;
      try {
        X = await _a.getSSOTokenFromFile(D)
      } catch (E) {
        throw new OC.TokenProviderError(`The SSO session token associated with profile=${G} was not found or is invalid. ${bk1}`, !1)
      }
      F_("accessToken", X.accessToken), F_("expiresAt", X.expiresAt);
      let {
        accessToken: V,
        expiresAt: C
      } = X, K = {
        token: V,
        expiration: new Date(C)
      };
      if (K.expiration.getTime() - Date.now() > nq4) return K;
      if (Date.now() - $50.getTime() < 30000) return N50(K), K;
      F_("clientId", X.clientId, !0), F_("clientSecret", X.clientSecret, !0), F_("refreshToken", X.refreshToken, !0);
      try {
        $50.setTime(Date.now());
        let E = await sq4(X, F, Q);
        F_("accessToken", E.accessToken), F_("expiresIn", E.expiresIn);
        let N = new Date(Date.now() + E.expiresIn * 1000);
        try {
          await tq4(D, {
            ...X,
            accessToken: E.accessToken,
            expiresAt: N.toISOString(),
            refreshToken: E.refreshToken
          })
        } catch (q) {}
        return {
          token: E.accessToken,
          expiration: N
        }
      } catch (E) {
        return N50(K), K
      }
    }, "fromSso"),
    eq4 = uL(({
      token: A,
      logger: B
    }) => async () => {
      if (B?.debug("@aws-sdk/token-providers - fromStatic"), !A || !A.token) throw new OC.TokenProviderError("Please pass a valid token to fromStatic", !1);
      return A
    }, "fromStatic"),
    AM4 = uL((A = {}) => OC.memoize(OC.chain(R50(A), async () => {
      throw new OC.TokenProviderError("Could not load token from any providers", !1)
    }), (B) => B.expiration !== void 0 && B.expiration.getTime() - Date.now() < 300000, (B) => B.expiration !== void 0), "nodeProvider")
})
// @from(Start 3721044, End 3728244)
dI1 = z((IZ8, v50) => {
  var {
    defineProperty: hI1,
    getOwnPropertyDescriptor: BM4,
    getOwnPropertyNames: _50
  } = Object, QM4 = Object.prototype.hasOwnProperty, mI1 = (A, B) => hI1(A, "name", {
    value: B,
    configurable: !0
  }), IM4 = (A, B) => function Q() {
    return A && (B = A[_50(A)[0]](A = 0)), B
  }, j50 = (A, B) => {
    for (var Q in B) hI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, GM4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of _50(B))
        if (!QM4.call(A, G) && G !== Q) hI1(A, G, {
          get: () => B[G],
          enumerable: !(I = BM4(B, G)) || I.enumerable
        })
    }
    return A
  }, ZM4 = (A) => GM4(hI1({}, "__esModule", {
    value: !0
  }), A), y50 = {};
  j50(y50, {
    GetRoleCredentialsCommand: () => gk1.GetRoleCredentialsCommand,
    SSOClient: () => gk1.SSOClient
  });
  var gk1, DM4 = IM4({
      "src/loadSso.ts"() {
        gk1 = e90()
      }
    }),
    k50 = {};
  j50(k50, {
    fromSSO: () => WM4,
    isSsoProfile: () => x50,
    validateSsoProfile: () => f50
  });
  v50.exports = ZM4(k50);
  var x50 = mI1((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
    P50 = NC(),
    YM4 = T50(),
    TC = $I(),
    gI1 = xL(),
    ya = !1,
    S50 = mI1(async ({
      ssoStartUrl: A,
      ssoSession: B,
      ssoAccountId: Q,
      ssoRegion: I,
      ssoRoleName: G,
      ssoClient: Z,
      clientConfig: D,
      parentClientConfig: Y,
      profile: W,
      logger: J
    }) => {
      let F, X = "To refresh this SSO session run aws sso login with the corresponding profile.";
      if (B) try {
        let i = await YM4.fromSso({
          profile: W
        })();
        F = {
          accessToken: i.token,
          expiresAt: new Date(i.expiration).toISOString()
        }
      } catch (i) {
        throw new TC.CredentialsProviderError(i.message, {
          tryNextLink: ya,
          logger: J
        })
      } else try {
        F = await gI1.getSSOTokenFromFile(A)
      } catch (i) {
        throw new TC.CredentialsProviderError("The SSO session associated with this profile is invalid. To refresh this SSO session run aws sso login with the corresponding profile.", {
          tryNextLink: ya,
          logger: J
        })
      }
      if (new Date(F.expiresAt).getTime() - Date.now() <= 0) throw new TC.CredentialsProviderError("The SSO session associated with this profile has expired. To refresh this SSO session run aws sso login with the corresponding profile.", {
        tryNextLink: ya,
        logger: J
      });
      let {
        accessToken: V
      } = F, {
        SSOClient: C,
        GetRoleCredentialsCommand: K
      } = await Promise.resolve().then(() => (DM4(), y50)), E = Z || new C(Object.assign({}, D ?? {}, {
        logger: D?.logger ?? Y?.logger,
        region: D?.region ?? I
      })), N;
      try {
        N = await E.send(new K({
          accountId: Q,
          roleName: G,
          accessToken: V
        }))
      } catch (i) {
        throw new TC.CredentialsProviderError(i, {
          tryNextLink: ya,
          logger: J
        })
      }
      let {
        roleCredentials: {
          accessKeyId: q,
          secretAccessKey: O,
          sessionToken: R,
          expiration: T,
          credentialScope: L,
          accountId: _
        } = {}
      } = N;
      if (!q || !O || !R || !T) throw new TC.CredentialsProviderError("SSO returns an invalid temporary credential.", {
        tryNextLink: ya,
        logger: J
      });
      let k = {
        accessKeyId: q,
        secretAccessKey: O,
        sessionToken: R,
        expiration: new Date(T),
        ...L && {
          credentialScope: L
        },
        ..._ && {
          accountId: _
        }
      };
      if (B) P50.setCredentialFeature(k, "CREDENTIALS_SSO", "s");
      else P50.setCredentialFeature(k, "CREDENTIALS_SSO_LEGACY", "u");
      return k
    }, "resolveSSOCredentials"),
    f50 = mI1((A, B) => {
      let {
        sso_start_url: Q,
        sso_account_id: I,
        sso_region: G,
        sso_role_name: Z
      } = A;
      if (!Q || !I || !G || !Z) throw new TC.CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(A).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, {
        tryNextLink: !1,
        logger: B
      });
      return A
    }, "validateSsoProfile"),
    WM4 = mI1((A = {}) => async ({
      callerClientConfig: B
    } = {}) => {
      A.logger?.debug("@aws-sdk/credential-provider-sso - fromSSO");
      let {
        ssoStartUrl: Q,
        ssoAccountId: I,
        ssoRegion: G,
        ssoRoleName: Z,
        ssoSession: D
      } = A, {
        ssoClient: Y
      } = A, W = gI1.getProfileName({
        profile: A.profile ?? B?.profile
      });
      if (!Q && !I && !G && !Z && !D) {
        let F = (await gI1.parseKnownFiles(A))[W];
        if (!F) throw new TC.CredentialsProviderError(`Profile ${W} was not found.`, {
          logger: A.logger
        });
        if (!x50(F)) throw new TC.CredentialsProviderError(`Profile ${W} is not configured with SSO credentials.`, {
          logger: A.logger
        });
        if (F?.sso_session) {
          let q = (await gI1.loadSsoSessionData(A))[F.sso_session],
            O = ` configurations in profile ${W} and sso-session ${F.sso_session}`;
          if (G && G !== q.sso_region) throw new TC.CredentialsProviderError("Conflicting SSO region" + O, {
            tryNextLink: !1,
            logger: A.logger
          });
          if (Q && Q !== q.sso_start_url) throw new TC.CredentialsProviderError("Conflicting SSO start_url" + O, {
            tryNextLink: !1,
            logger: A.logger
          });
          F.sso_region = q.sso_region, F.sso_start_url = q.sso_start_url
        }
        let {
          sso_start_url: X,
          sso_account_id: V,
          sso_region: C,
          sso_role_name: K,
          sso_session: E
        } = f50(F, A.logger);
        return S50({
          ssoStartUrl: X,
          ssoSession: E,
          ssoAccountId: V,
          ssoRegion: C,
          ssoRoleName: K,
          ssoClient: Y,
          clientConfig: A.clientConfig,
          parentClientConfig: A.parentClientConfig,
          profile: W
        })
      } else if (!Q || !I || !G || !Z) throw new TC.CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"', {
        tryNextLink: !1,
        logger: A.logger
      });
      else return S50({
        ssoStartUrl: Q,
        ssoSession: D,
        ssoAccountId: I,
        ssoRegion: G,
        ssoRoleName: Z,
        ssoClient: Y,
        clientConfig: A.clientConfig,
        parentClientConfig: A.parentClientConfig,
        profile: W
      })
    }, "fromSSO")
})
// @from(Start 3728250, End 3729890)
mk1 = z((b50) => {
  Object.defineProperty(b50, "__esModule", {
    value: !0
  });
  b50.resolveHttpAuthSchemeConfig = b50.resolveStsAuthConfig = b50.defaultSTSHttpAuthSchemeProvider = b50.defaultSTSHttpAuthSchemeParametersProvider = void 0;
  var JM4 = IB(),
    hk1 = ZX(),
    FM4 = ka(),
    XM4 = async (A, B, Q) => {
      return {
        operation: hk1.getSmithyContext(B).operation,
        region: await hk1.normalizeProvider(A.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
        })()
      }
    };
  b50.defaultSTSHttpAuthSchemeParametersProvider = XM4;

  function VM4(A) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "sts",
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

  function CM4(A) {
    return {
      schemeId: "smithy.api#noAuth"
    }
  }
  var KM4 = (A) => {
    let B = [];
    switch (A.operation) {
      case "AssumeRoleWithWebIdentity": {
        B.push(CM4(A));
        break
      }
      default:
        B.push(VM4(A))
    }
    return B
  };
  b50.defaultSTSHttpAuthSchemeProvider = KM4;
  var HM4 = (A) => Object.assign(A, {
    stsClientCtor: FM4.STSClient
  });
  b50.resolveStsAuthConfig = HM4;
  var zM4 = (A) => {
    let B = b50.resolveStsAuthConfig(A),
      Q = JM4.resolveAwsSdkSigV4Config(B);
    return Object.assign(Q, {
      authSchemePreference: hk1.normalizeProvider(A.authSchemePreference ?? [])
    })
  };
  b50.resolveHttpAuthSchemeConfig = zM4
})
// @from(Start 3729896, End 3730783)
xa = z((m50) => {
  Object.defineProperty(m50, "__esModule", {
    value: !0
  });
  m50.commonParams = m50.resolveClientEndpointParameters = void 0;
  var UM4 = (A) => {
    return Object.assign(A, {
      useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
      useFipsEndpoint: A.useFipsEndpoint ?? !1,
      useGlobalEndpoint: A.useGlobalEndpoint ?? !1,
      defaultSigningName: "sts"
    })
  };
  m50.resolveClientEndpointParameters = UM4;
  m50.commonParams = {
    UseGlobalEndpoint: {
      type: "builtInParams",
      name: "useGlobalEndpoint"
    },
    UseFIPS: {
      type: "builtInParams",
      name: "useFipsEndpoint"
    },
    Endpoint: {
      type: "builtInParams",
      name: "endpoint"
    },
    Region: {
      type: "builtInParams",
      name: "region"
    },
    UseDualStack: {
      type: "builtInParams",
      name: "useDualstackEndpoint"
    }
  }
})
// @from(Start 3730789, End 3738959)
X80 = z((J80) => {
  Object.defineProperty(J80, "__esModule", {
    value: !0
  });
  J80.ruleSet = void 0;
  var e50 = "required",
    n4 = "type",
    M5 = "fn",
    L5 = "argv",
    cL = "ref",
    u50 = !1,
    dk1 = !0,
    pL = "booleanEquals",
    TG = "stringEquals",
    A80 = "sigv4",
    B80 = "sts",
    Q80 = "us-east-1",
    oB = "endpoint",
    p50 = "https://sts.{Region}.{PartitionResult#dnsSuffix}",
    iz = "tree",
    nb = "error",
    pk1 = "getAttr",
    c50 = {
      [e50]: !1,
      [n4]: "String"
    },
    uk1 = {
      [e50]: !0,
      default: !1,
      [n4]: "Boolean"
    },
    I80 = {
      [cL]: "Endpoint"
    },
    l50 = {
      [M5]: "isSet",
      [L5]: [{
        [cL]: "Region"
      }]
    },
    PG = {
      [cL]: "Region"
    },
    i50 = {
      [M5]: "aws.partition",
      [L5]: [PG],
      assign: "PartitionResult"
    },
    G80 = {
      [cL]: "UseFIPS"
    },
    Z80 = {
      [cL]: "UseDualStack"
    },
    LZ = {
      url: "https://sts.amazonaws.com",
      properties: {
        authSchemes: [{
          name: A80,
          signingName: B80,
          signingRegion: Q80
        }]
      },
      headers: {}
    },
    zJ = {},
    n50 = {
      conditions: [{
        [M5]: TG,
        [L5]: [PG, "aws-global"]
      }],
      [oB]: LZ,
      [n4]: oB
    },
    D80 = {
      [M5]: pL,
      [L5]: [G80, !0]
    },
    Y80 = {
      [M5]: pL,
      [L5]: [Z80, !0]
    },
    a50 = {
      [M5]: pk1,
      [L5]: [{
        [cL]: "PartitionResult"
      }, "supportsFIPS"]
    },
    W80 = {
      [cL]: "PartitionResult"
    },
    s50 = {
      [M5]: pL,
      [L5]: [!0, {
        [M5]: pk1,
        [L5]: [W80, "supportsDualStack"]
      }]
    },
    r50 = [{
      [M5]: "isSet",
      [L5]: [I80]
    }],
    o50 = [D80],
    t50 = [Y80],
    $M4 = {
      version: "1.0",
      parameters: {
        Region: c50,
        UseDualStack: uk1,
        UseFIPS: uk1,
        Endpoint: c50,
        UseGlobalEndpoint: uk1
      },
      rules: [{
        conditions: [{
          [M5]: pL,
          [L5]: [{
            [cL]: "UseGlobalEndpoint"
          }, dk1]
        }, {
          [M5]: "not",
          [L5]: r50
        }, l50, i50, {
          [M5]: pL,
          [L5]: [G80, u50]
        }, {
          [M5]: pL,
          [L5]: [Z80, u50]
        }],
        rules: [{
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "ap-northeast-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "ap-south-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "ap-southeast-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "ap-southeast-2"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, n50, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "ca-central-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "eu-central-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "eu-north-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "eu-west-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "eu-west-2"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "eu-west-3"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "sa-east-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, Q80]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "us-east-2"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "us-west-1"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          conditions: [{
            [M5]: TG,
            [L5]: [PG, "us-west-2"]
          }],
          endpoint: LZ,
          [n4]: oB
        }, {
          endpoint: {
            url: p50,
            properties: {
              authSchemes: [{
                name: A80,
                signingName: B80,
                signingRegion: "{Region}"
              }]
            },
            headers: zJ
          },
          [n4]: oB
        }],
        [n4]: iz
      }, {
        conditions: r50,
        rules: [{
          conditions: o50,
          error: "Invalid Configuration: FIPS and custom endpoint are not supported",
          [n4]: nb
        }, {
          conditions: t50,
          error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
          [n4]: nb
        }, {
          endpoint: {
            url: I80,
            properties: zJ,
            headers: zJ
          },
          [n4]: oB
        }],
        [n4]: iz
      }, {
        conditions: [l50],
        rules: [{
          conditions: [i50],
          rules: [{
            conditions: [D80, Y80],
            rules: [{
              conditions: [{
                [M5]: pL,
                [L5]: [dk1, a50]
              }, s50],
              rules: [{
                endpoint: {
                  url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                  properties: zJ,
                  headers: zJ
                },
                [n4]: oB
              }],
              [n4]: iz
            }, {
              error: "FIPS and DualStack are enabled, but this partition does not support one or both",
              [n4]: nb
            }],
            [n4]: iz
          }, {
            conditions: o50,
            rules: [{
              conditions: [{
                [M5]: pL,
                [L5]: [a50, dk1]
              }],
              rules: [{
                conditions: [{
                  [M5]: TG,
                  [L5]: [{
                    [M5]: pk1,
                    [L5]: [W80, "name"]
                  }, "aws-us-gov"]
                }],
                endpoint: {
                  url: "https://sts.{Region}.amazonaws.com",
                  properties: zJ,
                  headers: zJ
                },
                [n4]: oB
              }, {
                endpoint: {
                  url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                  properties: zJ,
                  headers: zJ
                },
                [n4]: oB
              }],
              [n4]: iz
            }, {
              error: "FIPS is enabled but this partition does not support FIPS",
              [n4]: nb
            }],
            [n4]: iz
          }, {
            conditions: t50,
            rules: [{
              conditions: [s50],
              rules: [{
                endpoint: {
                  url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                  properties: zJ,
                  headers: zJ
                },
                [n4]: oB
              }],
              [n4]: iz
            }, {
              error: "DualStack is enabled but this partition does not support DualStack",
              [n4]: nb
            }],
            [n4]: iz
          }, n50, {
            endpoint: {
              url: p50,
              properties: zJ,
              headers: zJ
            },
            [n4]: oB
          }],
          [n4]: iz
        }],
        [n4]: iz
      }, {
        error: "Invalid Configuration: Missing Region",
        [n4]: nb
      }]
    };
  J80.ruleSet = $M4
})
// @from(Start 3738965, End 3739544)
K80 = z((V80) => {
  Object.defineProperty(V80, "__esModule", {
    value: !0
  });
  V80.defaultEndpointResolver = void 0;
  var qM4 = RL(),
    ck1 = LL(),
    MM4 = X80(),
    LM4 = new ck1.EndpointCache({
      size: 50,
      params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
    }),
    RM4 = (A, B = {}) => {
      return LM4.get(A, () => ck1.resolveEndpoint(MM4.ruleSet, {
        endpointParams: A,
        logger: B.logger
      }))
    };
  V80.defaultEndpointResolver = RM4;
  ck1.customEndpointFunctions.aws = qM4.awsEndpointFunctions
})
// @from(Start 3739550, End 3740960)
U80 = z((w80) => {
  Object.defineProperty(w80, "__esModule", {
    value: !0
  });
  w80.getRuntimeConfig = void 0;
  var OM4 = IB(),
    TM4 = NI(),
    PM4 = p3(),
    SM4 = FN(),
    H80 = _k1(),
    z80 = RQ(),
    _M4 = mk1(),
    jM4 = K80(),
    yM4 = (A) => {
      return {
        apiVersion: "2011-06-15",
        base64Decoder: A?.base64Decoder ?? H80.fromBase64,
        base64Encoder: A?.base64Encoder ?? H80.toBase64,
        disableHostPrefix: A?.disableHostPrefix ?? !1,
        endpointProvider: A?.endpointProvider ?? jM4.defaultEndpointResolver,
        extensions: A?.extensions ?? [],
        httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? _M4.defaultSTSHttpAuthSchemeProvider,
        httpAuthSchemes: A?.httpAuthSchemes ?? [{
          schemeId: "aws.auth#sigv4",
          identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
          signer: new OM4.AwsSdkSigV4Signer
        }, {
          schemeId: "smithy.api#noAuth",
          identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new TM4.NoAuthSigner
        }],
        logger: A?.logger ?? new PM4.NoOpLogger,
        serviceId: A?.serviceId ?? "STS",
        urlParser: A?.urlParser ?? SM4.parseUrl,
        utf8Decoder: A?.utf8Decoder ?? z80.fromUtf8,
        utf8Encoder: A?.utf8Encoder ?? z80.toUtf8
      }
    };
  w80.getRuntimeConfig = yM4
})
// @from(Start 3740966, End 3743566)
O80 = z((L80) => {
  Object.defineProperty(L80, "__esModule", {
    value: !0
  });
  L80.getRuntimeConfig = void 0;
  var kM4 = Ok1(),
    xM4 = kM4.__importDefault(Tk1()),
    N80 = IB(),
    $80 = I_(),
    uI1 = _D(),
    fM4 = NI(),
    vM4 = G_(),
    q80 = KJ(),
    ab = qC(),
    M80 = DN(),
    bM4 = Z_(),
    gM4 = vL(),
    hM4 = U80(),
    mM4 = p3(),
    dM4 = Y_(),
    uM4 = p3(),
    pM4 = (A) => {
      uM4.emitWarningIfUnsupportedVersion(process.version);
      let B = dM4.resolveDefaultsModeConfig(A),
        Q = () => B().then(mM4.loadConfigsForDefaultMode),
        I = hM4.getRuntimeConfig(A);
      N80.emitWarningIfUnsupportedVersion(process.version);
      let G = {
        profile: A?.profile
      };
      return {
        ...I,
        ...A,
        runtime: "node",
        defaultsMode: B,
        bodyLengthChecker: A?.bodyLengthChecker ?? bM4.calculateBodyLength,
        defaultUserAgentProvider: A?.defaultUserAgentProvider ?? $80.createDefaultUserAgentProvider({
          serviceId: I.serviceId,
          clientVersion: xM4.default.version
        }),
        httpAuthSchemes: A?.httpAuthSchemes ?? [{
          schemeId: "aws.auth#sigv4",
          identityProvider: (Z) => Z.getIdentityProvider("aws.auth#sigv4") || (async (D) => await A.credentialDefaultProvider(D?.__config || {})()),
          signer: new N80.AwsSdkSigV4Signer
        }, {
          schemeId: "smithy.api#noAuth",
          identityProvider: (Z) => Z.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new fM4.NoAuthSigner
        }],
        maxAttempts: A?.maxAttempts ?? ab.loadConfig(q80.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
        region: A?.region ?? ab.loadConfig(uI1.NODE_REGION_CONFIG_OPTIONS, {
          ...uI1.NODE_REGION_CONFIG_FILE_OPTIONS,
          ...G
        }),
        requestHandler: M80.NodeHttpHandler.create(A?.requestHandler ?? Q),
        retryMode: A?.retryMode ?? ab.loadConfig({
          ...q80.NODE_RETRY_MODE_CONFIG_OPTIONS,
          default: async () => (await Q()).retryMode || gM4.DEFAULT_RETRY_MODE
        }, A),
        sha256: A?.sha256 ?? vM4.Hash.bind(null, "sha256"),
        streamCollector: A?.streamCollector ?? M80.streamCollector,
        useDualstackEndpoint: A?.useDualstackEndpoint ?? ab.loadConfig(uI1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, G),
        useFipsEndpoint: A?.useFipsEndpoint ?? ab.loadConfig(uI1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, G),
        userAgentAppId: A?.userAgentAppId ?? ab.loadConfig($80.NODE_APP_ID_CONFIG_OPTIONS, G)
      }
    };
  L80.getRuntimeConfig = pM4
})
// @from(Start 3743572, End 3744591)
S80 = z((T80) => {
  Object.defineProperty(T80, "__esModule", {
    value: !0
  });
  T80.resolveHttpAuthRuntimeConfig = T80.getHttpAuthExtensionConfiguration = void 0;
  var cM4 = (A) => {
    let {
      httpAuthSchemes: B,
      httpAuthSchemeProvider: Q,
      credentials: I
    } = A;
    return {
      setHttpAuthScheme(G) {
        let Z = B.findIndex((D) => D.schemeId === G.schemeId);
        if (Z === -1) B.push(G);
        else B.splice(Z, 1, G)
      },
      httpAuthSchemes() {
        return B
      },
      setHttpAuthSchemeProvider(G) {
        Q = G
      },
      httpAuthSchemeProvider() {
        return Q
      },
      setCredentials(G) {
        I = G
      },
      credentials() {
        return I
      }
    }
  };
  T80.getHttpAuthExtensionConfiguration = cM4;
  var lM4 = (A) => {
    return {
      httpAuthSchemes: A.httpAuthSchemes(),
      httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
      credentials: A.credentials()
    }
  };
  T80.resolveHttpAuthRuntimeConfig = lM4
})
// @from(Start 3744597, End 3745282)
v80 = z((x80) => {
  Object.defineProperty(x80, "__esModule", {
    value: !0
  });
  x80.resolveRuntimeExtensions = void 0;
  var _80 = W_(),
    j80 = vI1(),
    y80 = p3(),
    k80 = S80(),
    nM4 = (A, B) => {
      let Q = Object.assign(_80.getAwsRegionExtensionConfiguration(A), y80.getDefaultExtensionConfiguration(A), j80.getHttpHandlerExtensionConfiguration(A), k80.getHttpAuthExtensionConfiguration(A));
      return B.forEach((I) => I.configure(Q)), Object.assign(A, _80.resolveAwsRegionExtensionConfiguration(Q), y80.resolveDefaultRuntimeConfig(Q), j80.resolveHttpHandlerRuntimeConfig(Q), k80.resolveHttpAuthRuntimeConfig(Q))
    };
  x80.resolveRuntimeExtensions = nM4
})
// @from(Start 3745288, End 3747179)
ka = z((ik1) => {
  Object.defineProperty(ik1, "__esModule", {
    value: !0
  });
  ik1.STSClient = ik1.__Client = void 0;
  var b80 = cS(),
    aM4 = lS(),
    sM4 = iS(),
    g80 = jL(),
    rM4 = _D(),
    lk1 = NI(),
    oM4 = tS(),
    tM4 = hz(),
    h80 = KJ(),
    d80 = p3();
  Object.defineProperty(ik1, "__Client", {
    enumerable: !0,
    get: function() {
      return d80.Client
    }
  });
  var m80 = mk1(),
    eM4 = xa(),
    AL4 = O80(),
    BL4 = v80();
  class u80 extends d80.Client {
    config;
    constructor(...[A]) {
      let B = AL4.getRuntimeConfig(A || {});
      super(B);
      this.initConfig = B;
      let Q = eM4.resolveClientEndpointParameters(B),
        I = g80.resolveUserAgentConfig(Q),
        G = h80.resolveRetryConfig(I),
        Z = rM4.resolveRegionConfig(G),
        D = b80.resolveHostHeaderConfig(Z),
        Y = tM4.resolveEndpointConfig(D),
        W = m80.resolveHttpAuthSchemeConfig(Y),
        J = BL4.resolveRuntimeExtensions(W, A?.extensions || []);
      this.config = J, this.middlewareStack.use(g80.getUserAgentPlugin(this.config)), this.middlewareStack.use(h80.getRetryPlugin(this.config)), this.middlewareStack.use(oM4.getContentLengthPlugin(this.config)), this.middlewareStack.use(b80.getHostHeaderPlugin(this.config)), this.middlewareStack.use(aM4.getLoggerPlugin(this.config)), this.middlewareStack.use(sM4.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(lk1.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
        httpAuthSchemeParametersProvider: m80.defaultSTSHttpAuthSchemeParametersProvider,
        identityProviderConfigProvider: async (F) => new lk1.DefaultIdentityProviderConfig({
          "aws.auth#sigv4": F.credentials
        })
      })), this.middlewareStack.use(lk1.getHttpSigningPlugin(this.config))
    }
    destroy() {
      super.destroy()
    }
  }
  ik1.STSClient = u80
})