
// @from(Start 5788043, End 5803463)
P12 = z((Vb8, T12) => {
  var {
    defineProperty: mF1,
    getOwnPropertyDescriptor: d_6,
    getOwnPropertyNames: u_6
  } = Object, p_6 = Object.prototype.hasOwnProperty, z7 = (A, B) => mF1(A, "name", {
    value: B,
    configurable: !0
  }), c_6 = (A, B) => {
    for (var Q in B) mF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, l_6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of u_6(B))
        if (!p_6.call(A, G) && G !== Q) mF1(A, G, {
          get: () => B[G],
          enumerable: !(I = d_6(B, G)) || I.enumerable
        })
    }
    return A
  }, i_6 = (A) => l_6(mF1({}, "__esModule", {
    value: !0
  }), A), C12 = {};
  c_6(C12, {
    SignatureV4: () => Uj6,
    clearCredentialCache: () => Jj6,
    createScope: () => gF1,
    getCanonicalHeaders: () => _i1,
    getCanonicalQuery: () => $12,
    getPayloadHash: () => hF1,
    getSigningKey: () => N12,
    moveHeadersToQuery: () => R12,
    prepareRequest: () => yi1
  });
  T12.exports = i_6(C12);
  var J12 = de0(),
    Ti1 = gt(),
    n_6 = "X-Amz-Algorithm",
    a_6 = "X-Amz-Credential",
    K12 = "X-Amz-Date",
    s_6 = "X-Amz-SignedHeaders",
    r_6 = "X-Amz-Expires",
    H12 = "X-Amz-Signature",
    z12 = "X-Amz-Security-Token",
    w12 = "authorization",
    E12 = K12.toLowerCase(),
    o_6 = "date",
    t_6 = [w12, E12, o_6],
    e_6 = H12.toLowerCase(),
    Si1 = "x-amz-content-sha256",
    Aj6 = z12.toLowerCase(),
    Bj6 = {
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
    Qj6 = /^proxy-/,
    Ij6 = /^sec-/,
    Pi1 = "AWS4-HMAC-SHA256",
    Gj6 = "AWS4-HMAC-SHA256-PAYLOAD",
    Zj6 = "UNSIGNED-PAYLOAD",
    Dj6 = 50,
    U12 = "aws4_request",
    Yj6 = 604800,
    eR = G12(),
    Wj6 = gt(),
    cm = {},
    bF1 = [],
    gF1 = z7((A, B, Q) => `${A}/${B}/${Q}/${U12}`, "createScope"),
    N12 = z7(async (A, B, Q, I, G) => {
      let Z = await F12(A, B.secretAccessKey, B.accessKeyId),
        D = `${Q}:${I}:${G}:${eR.toHex(Z)}:${B.sessionToken}`;
      if (D in cm) return cm[D];
      bF1.push(D);
      while (bF1.length > Dj6) delete cm[bF1.shift()];
      let Y = `AWS4${B.secretAccessKey}`;
      for (let W of [Q, I, G, U12]) Y = await F12(A, Y, W);
      return cm[D] = Y
    }, "getSigningKey"),
    Jj6 = z7(() => {
      bF1.length = 0, Object.keys(cm).forEach((A) => {
        delete cm[A]
      })
    }, "clearCredentialCache"),
    F12 = z7((A, B, Q) => {
      let I = new A(B);
      return I.update(Wj6.toUint8Array(Q)), I.digest()
    }, "hmac"),
    _i1 = z7(({
      headers: A
    }, B, Q) => {
      let I = {};
      for (let G of Object.keys(A).sort()) {
        if (A[G] == null) continue;
        let Z = G.toLowerCase();
        if (Z in Bj6 || (B == null ? void 0 : B.has(Z)) || Qj6.test(Z) || Ij6.test(Z)) {
          if (!Q || Q && !Q.has(Z)) continue
        }
        I[Z] = A[G].trim().replace(/\s+/g, " ")
      }
      return I
    }, "getCanonicalHeaders"),
    ht = W12(),
    $12 = z7(({
      query: A = {}
    }) => {
      let B = [],
        Q = {};
      for (let I of Object.keys(A).sort()) {
        if (I.toLowerCase() === e_6) continue;
        B.push(I);
        let G = A[I];
        if (typeof G === "string") Q[I] = `${ht.escapeUri(I)}=${ht.escapeUri(G)}`;
        else if (Array.isArray(G)) Q[I] = G.slice(0).reduce((Z, D) => Z.concat([`${ht.escapeUri(I)}=${ht.escapeUri(D)}`]), []).sort().join("&")
      }
      return B.map((I) => Q[I]).filter((I) => I).join("&")
    }, "getCanonicalQuery"),
    Fj6 = qi1(),
    Xj6 = gt(),
    hF1 = z7(async ({
      headers: A,
      body: B
    }, Q) => {
      for (let I of Object.keys(A))
        if (I.toLowerCase() === Si1) return A[I];
      if (B == null) return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
      else if (typeof B === "string" || ArrayBuffer.isView(B) || Fj6.isArrayBuffer(B)) {
        let I = new Q;
        return I.update(Xj6.toUint8Array(B)), eR.toHex(await I.digest())
      }
      return Zj6
    }, "getPayloadHash"),
    X12 = gt(),
    q12 = class A {
      format(B) {
        let Q = [];
        for (let Z of Object.keys(B)) {
          let D = X12.fromUtf8(Z);
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
            let Y = X12.fromUtf8(B.value),
              W = new DataView(new ArrayBuffer(3 + Y.byteLength));
            W.setUint8(0, 7), W.setUint16(1, Y.byteLength, !1);
            let J = new Uint8Array(W.buffer);
            return J.set(Y, 3), J;
          case "timestamp":
            let F = new Uint8Array(9);
            return F[0] = 8, F.set(Kj6.fromNumber(B.value.valueOf()).bytes, 1), F;
          case "uuid":
            if (!Cj6.test(B.value)) throw new Error(`Invalid UUID received: ${B.value}`);
            let X = new Uint8Array(17);
            return X[0] = 9, X.set(eR.fromHex(B.value.replace(/\-/g, "")), 1), X
        }
      }
    };
  z7(q12, "HeaderFormatter");
  var Vj6 = q12,
    Cj6 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    M12 = class A {
      constructor(B) {
        if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
      }
      static fromNumber(B) {
        if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
        let Q = new Uint8Array(8);
        for (let I = 7, G = Math.abs(Math.round(B)); I > -1 && G > 0; I--, G /= 256) Q[I] = G;
        if (B < 0) ji1(Q);
        return new A(Q)
      }
      valueOf() {
        let B = this.bytes.slice(0),
          Q = B[0] & 128;
        if (Q) ji1(B);
        return parseInt(eR.toHex(B), 16) * (Q ? -1 : 1)
      }
      toString() {
        return String(this.valueOf())
      }
    };
  z7(M12, "Int64");
  var Kj6 = M12;

  function ji1(A) {
    for (let B = 0; B < 8; B++) A[B] ^= 255;
    for (let B = 7; B > -1; B--)
      if (A[B]++, A[B] !== 0) break
  }
  z7(ji1, "negate");
  var Hj6 = z7((A, B) => {
      A = A.toLowerCase();
      for (let Q of Object.keys(B))
        if (A === Q.toLowerCase()) return !0;
      return !1
    }, "hasHeader"),
    L12 = z7(({
      headers: A,
      query: B,
      ...Q
    }) => ({
      ...Q,
      headers: {
        ...A
      },
      query: B ? zj6(B) : void 0
    }), "cloneRequest"),
    zj6 = z7((A) => Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {}), "cloneQuery"),
    R12 = z7((A, B = {}) => {
      var Q;
      let {
        headers: I,
        query: G = {}
      } = typeof A.clone === "function" ? A.clone() : L12(A);
      for (let Z of Object.keys(I)) {
        let D = Z.toLowerCase();
        if (D.slice(0, 6) === "x-amz-" && !((Q = B.unhoistableHeaders) == null ? void 0 : Q.has(D))) G[Z] = I[Z], delete I[Z]
      }
      return {
        ...A,
        headers: I,
        query: G
      }
    }, "moveHeadersToQuery"),
    yi1 = z7((A) => {
      A = typeof A.clone === "function" ? A.clone() : L12(A);
      for (let B of Object.keys(A.headers))
        if (t_6.indexOf(B.toLowerCase()) > -1) delete A.headers[B];
      return A
    }, "prepareRequest"),
    wj6 = z7((A) => Ej6(A).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601"),
    Ej6 = z7((A) => {
      if (typeof A === "number") return new Date(A * 1000);
      if (typeof A === "string") {
        if (Number(A)) return new Date(Number(A) * 1000);
        return new Date(A)
      }
      return A
    }, "toDate"),
    O12 = class A {
      constructor({
        applyChecksum: B,
        credentials: Q,
        region: I,
        service: G,
        sha256: Z,
        uriEscapePath: D = !0
      }) {
        this.headerFormatter = new Vj6, this.service = G, this.sha256 = Z, this.uriEscapePath = D, this.applyChecksum = typeof B === "boolean" ? B : !0, this.regionProvider = J12.normalizeProvider(I), this.credentialProvider = J12.normalizeProvider(Q)
      }
      async presign(B, Q = {}) {
        let {
          signingDate: I = new Date,
          expiresIn: G = 3600,
          unsignableHeaders: Z,
          unhoistableHeaders: D,
          signableHeaders: Y,
          signingRegion: W,
          signingService: J
        } = Q, F = await this.credentialProvider();
        this.validateResolvedCredentials(F);
        let X = W ?? await this.regionProvider(),
          {
            longDate: V,
            shortDate: C
          } = vF1(I);
        if (G > Yj6) return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
        let K = gF1(C, X, J ?? this.service),
          E = R12(yi1(B), {
            unhoistableHeaders: D
          });
        if (F.sessionToken) E.query[z12] = F.sessionToken;
        E.query[n_6] = Pi1, E.query[a_6] = `${F.accessKeyId}/${K}`, E.query[K12] = V, E.query[r_6] = G.toString(10);
        let N = _i1(E, Z, Y);
        return E.query[s_6] = V12(N), E.query[H12] = await this.getSignature(V, K, this.getSigningKey(F, X, C, J), this.createCanonicalRequest(E, N, await hF1(B, this.sha256))), E
      }
      async sign(B, Q) {
        if (typeof B === "string") return this.signString(B, Q);
        else if (B.headers && B.payload) return this.signEvent(B, Q);
        else if (B.message) return this.signMessage(B, Q);
        else return this.signRequest(B, Q)
      }
      async signEvent({
        headers: B,
        payload: Q
      }, {
        signingDate: I = new Date,
        priorSignature: G,
        signingRegion: Z,
        signingService: D
      }) {
        let Y = Z ?? await this.regionProvider(),
          {
            shortDate: W,
            longDate: J
          } = vF1(I),
          F = gF1(W, Y, D ?? this.service),
          X = await hF1({
            headers: {},
            body: Q
          }, this.sha256),
          V = new this.sha256;
        V.update(B);
        let C = eR.toHex(await V.digest()),
          K = [Gj6, J, F, G, C, X].join(`
`);
        return this.signString(K, {
          signingDate: I,
          signingRegion: Y,
          signingService: D
        })
      }
      async signMessage(B, {
        signingDate: Q = new Date,
        signingRegion: I,
        signingService: G
      }) {
        return this.signEvent({
          headers: this.headerFormatter.format(B.message.headers),
          payload: B.message.body
        }, {
          signingDate: Q,
          signingRegion: I,
          signingService: G,
          priorSignature: B.priorSignature
        }).then((D) => {
          return {
            message: B.message,
            signature: D
          }
        })
      }
      async signString(B, {
        signingDate: Q = new Date,
        signingRegion: I,
        signingService: G
      } = {}) {
        let Z = await this.credentialProvider();
        this.validateResolvedCredentials(Z);
        let D = I ?? await this.regionProvider(),
          {
            shortDate: Y
          } = vF1(Q),
          W = new this.sha256(await this.getSigningKey(Z, D, Y, G));
        return W.update(Ti1.toUint8Array(B)), eR.toHex(await W.digest())
      }
      async signRequest(B, {
        signingDate: Q = new Date,
        signableHeaders: I,
        unsignableHeaders: G,
        signingRegion: Z,
        signingService: D
      } = {}) {
        let Y = await this.credentialProvider();
        this.validateResolvedCredentials(Y);
        let W = Z ?? await this.regionProvider(),
          J = yi1(B),
          {
            longDate: F,
            shortDate: X
          } = vF1(Q),
          V = gF1(X, W, D ?? this.service);
        if (J.headers[E12] = F, Y.sessionToken) J.headers[Aj6] = Y.sessionToken;
        let C = await hF1(J, this.sha256);
        if (!Hj6(Si1, J.headers) && this.applyChecksum) J.headers[Si1] = C;
        let K = _i1(J, G, I),
          E = await this.getSignature(F, V, this.getSigningKey(Y, W, X, D), this.createCanonicalRequest(J, K, C));
        return J.headers[w12] = `${Pi1} Credential=${Y.accessKeyId}/${V}, SignedHeaders=${V12(K)}, Signature=${E}`, J
      }
      createCanonicalRequest(B, Q, I) {
        let G = Object.keys(Q).sort();
        return `${B.method}
${this.getCanonicalPath(B)}
${$12(B)}
${G.map((Z)=>`${Z}:${Q[Z]}`).join(`
`)}

${G.join(";")}
${I}`
      }
      async createStringToSign(B, Q, I) {
        let G = new this.sha256;
        G.update(Ti1.toUint8Array(I));
        let Z = await G.digest();
        return `${Pi1}
${B}
${Q}
${eR.toHex(Z)}`
      }
      getCanonicalPath({
        path: B
      }) {
        if (this.uriEscapePath) {
          let Q = [];
          for (let Z of B.split("/")) {
            if ((Z == null ? void 0 : Z.length) === 0) continue;
            if (Z === ".") continue;
            if (Z === "..") Q.pop();
            else Q.push(Z)
          }
          let I = `${(B==null?void 0:B.startsWith("/"))?"/":""}${Q.join("/")}${Q.length>0&&(B==null?void 0:B.endsWith("/"))?"/":""}`;
          return ht.escapeUri(I).replace(/%2F/g, "/")
        }
        return B
      }
      async getSignature(B, Q, I, G) {
        let Z = await this.createStringToSign(B, Q, G),
          D = new this.sha256(await I);
        return D.update(Ti1.toUint8Array(Z)), eR.toHex(await D.digest())
      }
      getSigningKey(B, Q, I, G) {
        return N12(this.sha256, B, I, Q, G || this.service)
      }
      validateResolvedCredentials(B) {
        if (typeof B !== "object" || typeof B.accessKeyId !== "string" || typeof B.secretAccessKey !== "string") throw new Error("Resolved credential object is not valid")
      }
    };
  z7(O12, "SignatureV4");
  var Uj6 = O12,
    vF1 = z7((A) => {
      let B = wj6(A).replace(/[\-:]/g, "");
      return {
        longDate: B,
        shortDate: B.slice(0, 8)
      }
    }, "formatDate"),
    V12 = z7((A) => Object.keys(A).sort().join(";"), "getCanonicalHeaderList")
})
// @from(Start 5803469, End 5820789)
IA2 = z((Cb8, pF1) => {
  var S12, _12, j12, y12, k12, x12, f12, v12, b12, g12, h12, m12, d12, dF1, ki1, u12, p12, c12, lm, l12, i12, n12, a12, s12, r12, o12, t12, e12, uF1, AA2, BA2, QA2;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof pF1 === "object" && typeof Cb8 === "object") A(Q(B, Q(Cb8)));
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
    S12 = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, _12 = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, j12 = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, y12 = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, k12 = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, x12 = function(Z, D, Y, W, J, F) {
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
    }, f12 = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, v12 = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, b12 = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, g12 = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, h12 = function(Z, D, Y, W) {
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
    }, m12 = function(Z, D) {
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
    }, d12 = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) uF1(D, Z, Y)
    }, uF1 = Object.create ? function(Z, D, Y, W) {
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
    }, dF1 = function(Z) {
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
    }, ki1 = function(Z, D) {
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
    }, u12 = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat(ki1(arguments[D]));
      return Z
    }, p12 = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, c12 = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, lm = function(Z) {
      return this instanceof lm ? (this.v = Z, this) : new lm(Z)
    }, l12 = function(Z, D, Y) {
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
        O.value instanceof lm ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
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
    }, i12 = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: lm(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, n12 = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof dF1 === "function" ? dF1(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
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
    }, a12 = function(Z, D) {
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
    s12 = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") uF1(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, r12 = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, o12 = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, t12 = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, e12 = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, AA2 = function(Z, D, Y) {
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
    BA2 = function(Z) {
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
    }, QA2 = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", S12), A("__assign", _12), A("__rest", j12), A("__decorate", y12), A("__param", k12), A("__esDecorate", x12), A("__runInitializers", f12), A("__propKey", v12), A("__setFunctionName", b12), A("__metadata", g12), A("__awaiter", h12), A("__generator", m12), A("__exportStar", d12), A("__createBinding", uF1), A("__values", dF1), A("__read", ki1), A("__spread", u12), A("__spreadArrays", p12), A("__spreadArray", c12), A("__await", lm), A("__asyncGenerator", l12), A("__asyncDelegator", i12), A("__asyncValues", n12), A("__makeTemplateObject", a12), A("__importStar", s12), A("__importDefault", r12), A("__classPrivateFieldGet", o12), A("__classPrivateFieldSet", t12), A("__classPrivateFieldIn", e12), A("__addDisposableResource", AA2), A("__disposeResources", BA2), A("__rewriteRelativeImportExtension", QA2)
  })
})
// @from(Start 5820795, End 5821847)
ZA2 = z((GA2) => {
  Object.defineProperty(GA2, "__esModule", {
    value: !0
  });
  GA2.propertyProviderChain = GA2.createCredentialChain = void 0;
  var Nj6 = $I(),
    $j6 = (...A) => {
      let B = -1,
        I = Object.assign(async (G) => {
          let Z = await GA2.propertyProviderChain(...A)(G);
          if (!Z.expiration && B !== -1) Z.expiration = new Date(Date.now() + B);
          return Z
        }, {
          expireAfter(G) {
            if (G < 300000) throw new Error("@aws-sdk/credential-providers - createCredentialChain(...).expireAfter(ms) may not be called with a duration lower than five minutes.");
            return B = G, I
          }
        });
      return I
    };
  GA2.createCredentialChain = $j6;
  var qj6 = (...A) => async (B) => {
    if (A.length === 0) throw new Nj6.ProviderError("No providers in chain");
    let Q;
    for (let I of A) try {
      return await I(B)
    } catch (G) {
      if (Q = G, G?.tryNextLink) continue;
      throw G
    }
    throw Q
  };
  GA2.propertyProviderChain = qj6
})
// @from(Start 5821853, End 5823583)
vi1 = z((DA2) => {
  Object.defineProperty(DA2, "__esModule", {
    value: !0
  });
  DA2.resolveHttpAuthSchemeConfig = DA2.defaultCognitoIdentityHttpAuthSchemeProvider = DA2.defaultCognitoIdentityHttpAuthSchemeParametersProvider = void 0;
  var Lj6 = IB(),
    fi1 = ZX(),
    Rj6 = async (A, B, Q) => {
      return {
        operation: fi1.getSmithyContext(B).operation,
        region: await fi1.normalizeProvider(A.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`")
        })()
      }
    };
  DA2.defaultCognitoIdentityHttpAuthSchemeParametersProvider = Rj6;

  function Oj6(A) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "cognito-identity",
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

  function cF1(A) {
    return {
      schemeId: "smithy.api#noAuth"
    }
  }
  var Tj6 = (A) => {
    let B = [];
    switch (A.operation) {
      case "GetCredentialsForIdentity": {
        B.push(cF1(A));
        break
      }
      case "GetId": {
        B.push(cF1(A));
        break
      }
      case "GetOpenIdToken": {
        B.push(cF1(A));
        break
      }
      case "UnlinkIdentity": {
        B.push(cF1(A));
        break
      }
      default:
        B.push(Oj6(A))
    }
    return B
  };
  DA2.defaultCognitoIdentityHttpAuthSchemeProvider = Tj6;
  var Pj6 = (A) => {
    let B = Lj6.resolveAwsSdkSigV4Config(A);
    return Object.assign(B, {
      authSchemePreference: fi1.normalizeProvider(A.authSchemePreference ?? [])
    })
  };
  DA2.resolveHttpAuthSchemeConfig = Pj6
})
// @from(Start 5823589, End 5840909)
vA2 = z((zb8, nF1) => {
  var WA2, JA2, FA2, XA2, VA2, CA2, KA2, HA2, zA2, wA2, EA2, UA2, NA2, lF1, bi1, $A2, qA2, MA2, im, LA2, RA2, OA2, TA2, PA2, SA2, _A2, jA2, yA2, iF1, kA2, xA2, fA2;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof nF1 === "object" && typeof zb8 === "object") A(Q(B, Q(zb8)));
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
    WA2 = function(Z, D) {
      if (typeof D !== "function" && D !== null) throw new TypeError("Class extends value " + String(D) + " is not a constructor or null");
      B(Z, D);

      function Y() {
        this.constructor = Z
      }
      Z.prototype = D === null ? Object.create(D) : (Y.prototype = D.prototype, new Y)
    }, JA2 = Object.assign || function(Z) {
      for (var D, Y = 1, W = arguments.length; Y < W; Y++) {
        D = arguments[Y];
        for (var J in D)
          if (Object.prototype.hasOwnProperty.call(D, J)) Z[J] = D[J]
      }
      return Z
    }, FA2 = function(Z, D) {
      var Y = {};
      for (var W in Z)
        if (Object.prototype.hasOwnProperty.call(Z, W) && D.indexOf(W) < 0) Y[W] = Z[W];
      if (Z != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var J = 0, W = Object.getOwnPropertySymbols(Z); J < W.length; J++)
          if (D.indexOf(W[J]) < 0 && Object.prototype.propertyIsEnumerable.call(Z, W[J])) Y[W[J]] = Z[W[J]]
      }
      return Y
    }, XA2 = function(Z, D, Y, W) {
      var J = arguments.length,
        F = J < 3 ? D : W === null ? W = Object.getOwnPropertyDescriptor(D, Y) : W,
        X;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") F = Reflect.decorate(Z, D, Y, W);
      else
        for (var V = Z.length - 1; V >= 0; V--)
          if (X = Z[V]) F = (J < 3 ? X(F) : J > 3 ? X(D, Y, F) : X(D, Y)) || F;
      return J > 3 && F && Object.defineProperty(D, Y, F), F
    }, VA2 = function(Z, D) {
      return function(Y, W) {
        D(Y, W, Z)
      }
    }, CA2 = function(Z, D, Y, W, J, F) {
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
    }, KA2 = function(Z, D, Y) {
      var W = arguments.length > 2;
      for (var J = 0; J < D.length; J++) Y = W ? D[J].call(Z, Y) : D[J].call(Z);
      return W ? Y : void 0
    }, HA2 = function(Z) {
      return typeof Z === "symbol" ? Z : "".concat(Z)
    }, zA2 = function(Z, D, Y) {
      if (typeof D === "symbol") D = D.description ? "[".concat(D.description, "]") : "";
      return Object.defineProperty(Z, "name", {
        configurable: !0,
        value: Y ? "".concat(Y, " ", D) : D
      })
    }, wA2 = function(Z, D) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Z, D)
    }, EA2 = function(Z, D, Y, W) {
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
    }, UA2 = function(Z, D) {
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
    }, NA2 = function(Z, D) {
      for (var Y in Z)
        if (Y !== "default" && !Object.prototype.hasOwnProperty.call(D, Y)) iF1(D, Z, Y)
    }, iF1 = Object.create ? function(Z, D, Y, W) {
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
    }, lF1 = function(Z) {
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
    }, bi1 = function(Z, D) {
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
    }, $A2 = function() {
      for (var Z = [], D = 0; D < arguments.length; D++) Z = Z.concat(bi1(arguments[D]));
      return Z
    }, qA2 = function() {
      for (var Z = 0, D = 0, Y = arguments.length; D < Y; D++) Z += arguments[D].length;
      for (var W = Array(Z), J = 0, D = 0; D < Y; D++)
        for (var F = arguments[D], X = 0, V = F.length; X < V; X++, J++) W[J] = F[X];
      return W
    }, MA2 = function(Z, D, Y) {
      if (Y || arguments.length === 2) {
        for (var W = 0, J = D.length, F; W < J; W++)
          if (F || !(W in D)) {
            if (!F) F = Array.prototype.slice.call(D, 0, W);
            F[W] = D[W]
          }
      }
      return Z.concat(F || Array.prototype.slice.call(D))
    }, im = function(Z) {
      return this instanceof im ? (this.v = Z, this) : new im(Z)
    }, LA2 = function(Z, D, Y) {
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
        O.value instanceof im ? Promise.resolve(O.value.v).then(E, N) : q(F[0][2], O)
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
    }, RA2 = function(Z) {
      var D, Y;
      return D = {}, W("next"), W("throw", function(J) {
        throw J
      }), W("return"), D[Symbol.iterator] = function() {
        return this
      }, D;

      function W(J, F) {
        D[J] = Z[J] ? function(X) {
          return (Y = !Y) ? {
            value: im(Z[J](X)),
            done: !1
          } : F ? F(X) : X
        } : F
      }
    }, OA2 = function(Z) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var D = Z[Symbol.asyncIterator],
        Y;
      return D ? D.call(Z) : (Z = typeof lF1 === "function" ? lF1(Z) : Z[Symbol.iterator](), Y = {}, W("next"), W("throw"), W("return"), Y[Symbol.asyncIterator] = function() {
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
    }, TA2 = function(Z, D) {
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
    PA2 = function(Z) {
      if (Z && Z.__esModule) return Z;
      var D = {};
      if (Z != null) {
        for (var Y = I(Z), W = 0; W < Y.length; W++)
          if (Y[W] !== "default") iF1(D, Z, Y[W])
      }
      return Q(D, Z), D
    }, SA2 = function(Z) {
      return Z && Z.__esModule ? Z : {
        default: Z
      }
    }, _A2 = function(Z, D, Y, W) {
      if (Y === "a" && !W) throw new TypeError("Private accessor was defined without a getter");
      if (typeof D === "function" ? Z !== D || !W : !D.has(Z)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Y === "m" ? W : Y === "a" ? W.call(Z) : W ? W.value : D.get(Z)
    }, jA2 = function(Z, D, Y, W, J) {
      if (W === "m") throw new TypeError("Private method is not writable");
      if (W === "a" && !J) throw new TypeError("Private accessor was defined without a setter");
      if (typeof D === "function" ? Z !== D || !J : !D.has(Z)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return W === "a" ? J.call(Z, Y) : J ? J.value = Y : D.set(Z, Y), Y
    }, yA2 = function(Z, D) {
      if (D === null || typeof D !== "object" && typeof D !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
      return typeof Z === "function" ? D === Z : Z.has(D)
    }, kA2 = function(Z, D, Y) {
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
    xA2 = function(Z) {
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
    }, fA2 = function(Z, D) {
      if (typeof Z === "string" && /^\.\.?\//.test(Z)) return Z.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(Y, W, J, F, X) {
        return W ? D ? ".jsx" : ".js" : J && (!F || !X) ? Y : J + F + "." + X.toLowerCase() + "js"
      });
      return Z
    }, A("__extends", WA2), A("__assign", JA2), A("__rest", FA2), A("__decorate", XA2), A("__param", VA2), A("__esDecorate", CA2), A("__runInitializers", KA2), A("__propKey", HA2), A("__setFunctionName", zA2), A("__metadata", wA2), A("__awaiter", EA2), A("__generator", UA2), A("__exportStar", NA2), A("__createBinding", iF1), A("__values", lF1), A("__read", bi1), A("__spread", $A2), A("__spreadArrays", qA2), A("__spreadArray", MA2), A("__await", im), A("__asyncGenerator", LA2), A("__asyncDelegator", RA2), A("__asyncValues", OA2), A("__makeTemplateObject", TA2), A("__importStar", PA2), A("__importDefault", SA2), A("__classPrivateFieldGet", _A2), A("__classPrivateFieldSet", jA2), A("__classPrivateFieldIn", yA2), A("__addDisposableResource", kA2), A("__disposeResources", xA2), A("__rewriteRelativeImportExtension", fA2)
  })
})
// @from(Start 5840915, End 5844856)
bA2 = z((wb8, jj6) => {
  jj6.exports = {
    name: "@aws-sdk/client-cognito-identity",
    description: "AWS SDK for JavaScript Cognito Identity Client for Node.js, Browser and React Native",
    version: "3.797.0",
    scripts: {
      build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
      "build:cjs": "node ../../scripts/compilation/inline client-cognito-identity",
      "build:es": "tsc -p tsconfig.es.json",
      "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
      "build:types": "tsc -p tsconfig.types.json",
      "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
      clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
      "extract:docs": "api-extractor run --local",
      "generate:client": "node ../../scripts/generate-clients/single-service --solo cognito-identity",
      "test:e2e": "yarn g:vitest run -c vitest.config.e2e.ts --mode development",
      "test:e2e:watch": "yarn g:vitest watch -c vitest.config.e2e.ts"
    },
    main: "./dist-cjs/index.js",
    types: "./dist-types/index.d.ts",
    module: "./dist-es/index.js",
    sideEffects: !1,
    dependencies: {
      "@aws-crypto/sha256-browser": "5.2.0",
      "@aws-crypto/sha256-js": "5.2.0",
      "@aws-sdk/core": "3.796.0",
      "@aws-sdk/credential-provider-node": "3.797.0",
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
      "@aws-sdk/client-iam": "3.797.0",
      "@tsconfig/node18": "18.2.4",
      "@types/chai": "^4.2.11",
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
    homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-cognito-identity",
    repository: {
      type: "git",
      url: "https://github.com/aws/aws-sdk-js-v3.git",
      directory: "clients/client-cognito-identity"
    }
  }
})
// @from(Start 5844862, End 5847645)
gi1 = z((Eb8, iA2) => {
  var {
    defineProperty: aF1,
    getOwnPropertyDescriptor: yj6,
    getOwnPropertyNames: kj6
  } = Object, xj6 = Object.prototype.hasOwnProperty, sF1 = (A, B) => aF1(A, "name", {
    value: B,
    configurable: !0
  }), fj6 = (A, B) => {
    for (var Q in B) aF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, vj6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of kj6(B))
        if (!xj6.call(A, G) && G !== Q) aF1(A, G, {
          get: () => B[G],
          enumerable: !(I = yj6(B, G)) || I.enumerable
        })
    }
    return A
  }, bj6 = (A) => vj6(aF1({}, "__esModule", {
    value: !0
  }), A), gA2 = {};
  fj6(gA2, {
    AlgorithmId: () => uA2,
    EndpointURLScheme: () => dA2,
    FieldPosition: () => pA2,
    HttpApiKeyAuthLocation: () => mA2,
    HttpAuthLocation: () => hA2,
    IniSectionType: () => cA2,
    RequestHandlerProtocol: () => lA2,
    SMITHY_CONTEXT_KEY: () => uj6,
    getDefaultClientConfiguration: () => mj6,
    resolveDefaultRuntimeConfig: () => dj6
  });
  iA2.exports = bj6(gA2);
  var hA2 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(hA2 || {}),
    mA2 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(mA2 || {}),
    dA2 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(dA2 || {}),
    uA2 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(uA2 || {}),
    gj6 = sF1((A) => {
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
    hj6 = sF1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    mj6 = sF1((A) => {
      return gj6(A)
    }, "getDefaultClientConfiguration"),
    dj6 = sF1((A) => {
      return hj6(A)
    }, "resolveDefaultRuntimeConfig"),
    pA2 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(pA2 || {}),
    uj6 = "__smithy_context",
    cA2 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(cA2 || {}),
    lA2 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(lA2 || {})
})
// @from(Start 5847651, End 5876188)
ct = z((Ub8, F02) => {
  var {
    defineProperty: tF1,
    getOwnPropertyDescriptor: pj6,
    getOwnPropertyNames: cj6
  } = Object, lj6 = Object.prototype.hasOwnProperty, Q2 = (A, B) => tF1(A, "name", {
    value: B,
    configurable: !0
  }), ij6 = (A, B) => {
    for (var Q in B) tF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, nj6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of cj6(B))
        if (!lj6.call(A, G) && G !== Q) tF1(A, G, {
          get: () => B[G],
          enumerable: !(I = pj6(B, G)) || I.enumerable
        })
    }
    return A
  }, aj6 = (A) => nj6(tF1({}, "__esModule", {
    value: !0
  }), A), aA2 = {};
  ij6(aA2, {
    Client: () => sj6,
    Command: () => rA2,
    LazyJsonString: () => hj,
    NoOpLogger: () => ly6,
    SENSITIVE_STRING: () => oj6,
    ServiceException: () => yy6,
    _json: () => li1,
    collectBody: () => hi1.collectBody,
    convertMap: () => iy6,
    createAggregatedClient: () => tj6,
    dateToUtcString: () => Q02,
    decorateServiceException: () => I02,
    emitWarningIfUnsupportedVersion: () => vy6,
    expectBoolean: () => Ay6,
    expectByte: () => ci1,
    expectFloat32: () => rF1,
    expectInt: () => Qy6,
    expectInt32: () => ui1,
    expectLong: () => ut,
    expectNonNull: () => Gy6,
    expectNumber: () => dt,
    expectObject: () => oA2,
    expectShort: () => pi1,
    expectString: () => Zy6,
    expectUnion: () => Dy6,
    extendedEncodeURIComponent: () => hi1.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => py6,
    getDefaultClientConfiguration: () => dy6,
    getDefaultExtensionConfiguration: () => Z02,
    getValueFromTextNode: () => D02,
    handleFloat: () => Jy6,
    isSerializableHeaderValue: () => cy6,
    limitedParseDouble: () => ai1,
    limitedParseFloat: () => Fy6,
    limitedParseFloat32: () => Xy6,
    loadConfigsForDefaultMode: () => fy6,
    logger: () => pt,
    map: () => ri1,
    parseBoolean: () => ej6,
    parseEpochTimestamp: () => My6,
    parseRfc3339DateTime: () => zy6,
    parseRfc3339DateTimeWithOffset: () => Ey6,
    parseRfc7231DateTime: () => qy6,
    quoteHeader: () => W02,
    resolveDefaultRuntimeConfig: () => uy6,
    resolvedPath: () => hi1.resolvedPath,
    serializeDateTime: () => ty6,
    serializeFloat: () => oy6,
    splitEvery: () => J02,
    splitHeader: () => ey6,
    strictParseByte: () => B02,
    strictParseDouble: () => ni1,
    strictParseFloat: () => Yy6,
    strictParseFloat32: () => tA2,
    strictParseInt: () => Vy6,
    strictParseInt32: () => Cy6,
    strictParseLong: () => A02,
    strictParseShort: () => nm,
    take: () => ny6,
    throwDefaultError: () => G02,
    withBaseException: () => ky6
  });
  F02.exports = aj6(aA2);
  var sA2 = WN(),
    sj6 = class {
      constructor(A) {
        this.config = A, this.middlewareStack = sA2.constructStack()
      }
      static {
        Q2(this, "Client")
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
    hi1 = vz(),
    di1 = gi1(),
    rA2 = class {
      constructor() {
        this.middlewareStack = sA2.constructStack()
      }
      static {
        Q2(this, "Command")
      }
      static classBuilder() {
        return new rj6
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
            [di1.SMITHY_CONTEXT_KEY]: {
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
    rj6 = class {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
      }
      static {
        Q2(this, "ClassBuilder")
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
        return B = class extends rA2 {
          constructor(...[Q]) {
            super();
            this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
          }
          static {
            Q2(this, "CommandRef")
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
    oj6 = "***SensitiveInformation***",
    tj6 = Q2((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = Q2(async function(D, Y, W) {
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
    ej6 = Q2((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    Ay6 = Q2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) pt.warn(oF1(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") pt.warn(oF1(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    dt = Q2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) pt.warn(oF1(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    By6 = Math.ceil(340282346638528860000000000000000000000),
    rF1 = Q2((A) => {
      let B = dt(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > By6) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    ut = Q2((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    Qy6 = ut,
    ui1 = Q2((A) => ii1(A, 32), "expectInt32"),
    pi1 = Q2((A) => ii1(A, 16), "expectShort"),
    ci1 = Q2((A) => ii1(A, 8), "expectByte"),
    ii1 = Q2((A, B) => {
      let Q = ut(A);
      if (Q !== void 0 && Iy6(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    Iy6 = Q2((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    Gy6 = Q2((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    oA2 = Q2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    Zy6 = Q2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return pt.warn(oF1(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    Dy6 = Q2((A) => {
      if (A === null || A === void 0) return;
      let B = oA2(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    ni1 = Q2((A) => {
      if (typeof A == "string") return dt(sm(A));
      return dt(A)
    }, "strictParseDouble"),
    Yy6 = ni1,
    tA2 = Q2((A) => {
      if (typeof A == "string") return rF1(sm(A));
      return rF1(A)
    }, "strictParseFloat32"),
    Wy6 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    sm = Q2((A) => {
      let B = A.match(Wy6);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    ai1 = Q2((A) => {
      if (typeof A == "string") return eA2(A);
      return dt(A)
    }, "limitedParseDouble"),
    Jy6 = ai1,
    Fy6 = ai1,
    Xy6 = Q2((A) => {
      if (typeof A == "string") return eA2(A);
      return rF1(A)
    }, "limitedParseFloat32"),
    eA2 = Q2((A) => {
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
    A02 = Q2((A) => {
      if (typeof A === "string") return ut(sm(A));
      return ut(A)
    }, "strictParseLong"),
    Vy6 = A02,
    Cy6 = Q2((A) => {
      if (typeof A === "string") return ui1(sm(A));
      return ui1(A)
    }, "strictParseInt32"),
    nm = Q2((A) => {
      if (typeof A === "string") return pi1(sm(A));
      return pi1(A)
    }, "strictParseShort"),
    B02 = Q2((A) => {
      if (typeof A === "string") return ci1(sm(A));
      return ci1(A)
    }, "strictParseByte"),
    oF1 = Q2((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    pt = {
      warn: console.warn
    },
    Ky6 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    si1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function Q02(A) {
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
    return `${Ky6[I]}, ${W} ${si1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  Q2(Q02, "dateToUtcString");
  var Hy6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    zy6 = Q2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = Hy6.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = nm(am(I)), X = hw(G, "month", 1, 12), V = hw(Z, "day", 1, 31);
      return mt(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    wy6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    Ey6 = Q2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = wy6.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = nm(am(I)), V = hw(G, "month", 1, 12), C = hw(Z, "day", 1, 31), K = mt(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - jy6(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    Uy6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    Ny6 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    $y6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    qy6 = Q2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = Uy6.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return mt(nm(am(Z)), mi1(G), hw(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = Ny6.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Oy6(mt(Ly6(Z), mi1(G), hw(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = $y6.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return mt(nm(am(J)), mi1(I), hw(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    My6 = Q2((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = ni1(A);
      else if (typeof A === "object" && A.tag === 1) B = A.value;
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    mt = Q2((A, B, Q, I) => {
      let G = B - 1;
      return Py6(A, G, Q), new Date(Date.UTC(A, G, Q, hw(I.hours, "hour", 0, 23), hw(I.minutes, "minute", 0, 59), hw(I.seconds, "seconds", 0, 60), _y6(I.fractionalMilliseconds)))
    }, "buildDate"),
    Ly6 = Q2((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + nm(am(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    Ry6 = 1576800000000,
    Oy6 = Q2((A) => {
      if (A.getTime() - new Date().getTime() > Ry6) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    mi1 = Q2((A) => {
      let B = si1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    Ty6 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Py6 = Q2((A, B, Q) => {
      let I = Ty6[B];
      if (B === 1 && Sy6(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${si1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    Sy6 = Q2((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    hw = Q2((A, B, Q, I) => {
      let G = B02(am(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    _y6 = Q2((A) => {
      if (A === null || A === void 0) return 0;
      return tA2("0." + A) * 1000
    }, "parseMilliseconds"),
    jy6 = Q2((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    am = Q2((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    yy6 = class A extends Error {
      static {
        Q2(this, "ServiceException")
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
    I02 = Q2((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    G02 = Q2(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = xy6(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: B?.code || B?.Code || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw I02(D, B)
    }, "throwDefaultError"),
    ky6 = Q2((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        G02({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    xy6 = Q2((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    fy6 = Q2((A) => {
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
    nA2 = !1,
    vy6 = Q2((A) => {
      if (A && !nA2 && parseInt(A.substring(1, A.indexOf("."))) < 16) nA2 = !0
    }, "emitWarningIfUnsupportedVersion"),
    by6 = Q2((A) => {
      let B = [];
      for (let Q in di1.AlgorithmId) {
        let I = di1.AlgorithmId[Q];
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
    gy6 = Q2((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    hy6 = Q2((A) => {
      return {
        setRetryStrategy(B) {
          A.retryStrategy = B
        },
        retryStrategy() {
          return A.retryStrategy
        }
      }
    }, "getRetryConfiguration"),
    my6 = Q2((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    Z02 = Q2((A) => {
      return Object.assign(by6(A), hy6(A))
    }, "getDefaultExtensionConfiguration"),
    dy6 = Z02,
    uy6 = Q2((A) => {
      return Object.assign(gy6(A), my6(A))
    }, "resolveDefaultRuntimeConfig"),
    py6 = Q2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    D02 = Q2((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = D02(A[Q]);
      return A
    }, "getValueFromTextNode"),
    cy6 = Q2((A) => {
      return A != null
    }, "isSerializableHeaderValue"),
    hj = Q2(function A(B) {
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
  hj.from = (A) => {
    if (A && typeof A === "object" && (A instanceof hj || ("deserializeJSON" in A))) return A;
    else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return hj(String(A));
    return hj(JSON.stringify(A))
  };
  hj.fromObject = hj.from;
  var ly6 = class {
    static {
      Q2(this, "NoOpLogger")
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };

  function ri1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, ay6(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      Y02(I, null, Z, D)
    }
    return I
  }
  Q2(ri1, "map");
  var iy6 = Q2((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    ny6 = Q2((A, B) => {
      let Q = {};
      for (let I in B) Y02(Q, A, B, I);
      return Q
    }, "take"),
    ay6 = Q2((A, B, Q) => {
      return ri1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    Y02 = Q2((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = sy6, W = ry6, J = I] = D;
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
    sy6 = Q2((A) => A != null, "nonNullish"),
    ry6 = Q2((A) => A, "pass");

  function W02(A) {
    if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
    return A
  }
  Q2(W02, "quoteHeader");
  var oy6 = Q2((A) => {
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
    ty6 = Q2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
    li1 = Q2((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(li1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = li1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function J02(A, B, Q) {
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
  Q2(J02, "splitEvery");
  var ey6 = Q2((A) => {
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
// @from(Start 5876194, End 5876684)
C02 = z((X02) => {
  Object.defineProperty(X02, "__esModule", {
    value: !0
  });
  X02.fromBase64 = void 0;
  var Ak6 = MZ(),
    Bk6 = /^[A-Za-z0-9+/]*={0,2}$/,
    Qk6 = (A) => {
      if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
      if (!Bk6.exec(A)) throw new TypeError("Invalid base64 string.");
      let B = Ak6.fromString(A, "base64");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
    };
  X02.fromBase64 = Qk6
})
// @from(Start 5876690, End 5877263)
z02 = z((K02) => {
  Object.defineProperty(K02, "__esModule", {
    value: !0
  });
  K02.toBase64 = void 0;
  var Ik6 = MZ(),
    Gk6 = RQ(),
    Zk6 = (A) => {
      let B;
      if (typeof A === "string") B = Gk6.fromUtf8(A);
      else B = A;
      if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
      return Ik6.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
    };
  K02.toBase64 = Zk6
})
// @from(Start 5877269, End 5877965)
U02 = z((Tb8, eF1) => {
  var {
    defineProperty: w02,
    getOwnPropertyDescriptor: Dk6,
    getOwnPropertyNames: Yk6
  } = Object, Wk6 = Object.prototype.hasOwnProperty, oi1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Yk6(B))
        if (!Wk6.call(A, G) && G !== Q) w02(A, G, {
          get: () => B[G],
          enumerable: !(I = Dk6(B, G)) || I.enumerable
        })
    }
    return A
  }, E02 = (A, B, Q) => (oi1(A, B, "default"), Q && oi1(Q, B, "default")), Jk6 = (A) => oi1(w02({}, "__esModule", {
    value: !0
  }), A), ti1 = {};
  eF1.exports = Jk6(ti1);
  E02(ti1, C02(), eF1.exports);
  E02(ti1, z02(), eF1.exports)
})
// @from(Start 5877971, End 5884114)
v02 = z((x02) => {
  Object.defineProperty(x02, "__esModule", {
    value: !0
  });
  x02.ruleSet = void 0;
  var _02 = "required",
    mZ = "fn",
    dZ = "argv",
    om = "ref",
    N02 = !0,
    $02 = "isSet",
    nt = "booleanEquals",
    rm = "error",
    mw = "endpoint",
    Y$ = "tree",
    ei1 = "PartitionResult",
    An1 = "getAttr",
    lt = "stringEquals",
    q02 = {
      [_02]: !1,
      type: "String"
    },
    M02 = {
      [_02]: !0,
      default: !1,
      type: "Boolean"
    },
    L02 = {
      [om]: "Endpoint"
    },
    j02 = {
      [mZ]: nt,
      [dZ]: [{
        [om]: "UseFIPS"
      }, !0]
    },
    y02 = {
      [mZ]: nt,
      [dZ]: [{
        [om]: "UseDualStack"
      }, !0]
    },
    w7 = {},
    it = {
      [om]: "Region"
    },
    R02 = {
      [mZ]: An1,
      [dZ]: [{
        [om]: ei1
      }, "supportsFIPS"]
    },
    k02 = {
      [om]: ei1
    },
    O02 = {
      [mZ]: nt,
      [dZ]: [!0, {
        [mZ]: An1,
        [dZ]: [k02, "supportsDualStack"]
      }]
    },
    T02 = [j02],
    P02 = [y02],
    S02 = [it],
    Fk6 = {
      version: "1.0",
      parameters: {
        Region: q02,
        UseDualStack: M02,
        UseFIPS: M02,
        Endpoint: q02
      },
      rules: [{
        conditions: [{
          [mZ]: $02,
          [dZ]: [L02]
        }],
        rules: [{
          conditions: T02,
          error: "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: rm
        }, {
          conditions: P02,
          error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
          type: rm
        }, {
          endpoint: {
            url: L02,
            properties: w7,
            headers: w7
          },
          type: mw
        }],
        type: Y$
      }, {
        conditions: [{
          [mZ]: $02,
          [dZ]: S02
        }],
        rules: [{
          conditions: [{
            [mZ]: "aws.partition",
            [dZ]: S02,
            assign: ei1
          }],
          rules: [{
            conditions: [j02, y02],
            rules: [{
              conditions: [{
                [mZ]: nt,
                [dZ]: [N02, R02]
              }, O02],
              rules: [{
                conditions: [{
                  [mZ]: lt,
                  [dZ]: [it, "us-east-1"]
                }],
                endpoint: {
                  url: "https://cognito-identity-fips.us-east-1.amazonaws.com",
                  properties: w7,
                  headers: w7
                },
                type: mw
              }, {
                conditions: [{
                  [mZ]: lt,
                  [dZ]: [it, "us-east-2"]
                }],
                endpoint: {
                  url: "https://cognito-identity-fips.us-east-2.amazonaws.com",
                  properties: w7,
                  headers: w7
                },
                type: mw
              }, {
                conditions: [{
                  [mZ]: lt,
                  [dZ]: [it, "us-west-1"]
                }],
                endpoint: {
                  url: "https://cognito-identity-fips.us-west-1.amazonaws.com",
                  properties: w7,
                  headers: w7
                },
                type: mw
              }, {
                conditions: [{
                  [mZ]: lt,
                  [dZ]: [it, "us-west-2"]
                }],
                endpoint: {
                  url: "https://cognito-identity-fips.us-west-2.amazonaws.com",
                  properties: w7,
                  headers: w7
                },
                type: mw
              }, {
                endpoint: {
                  url: "https://cognito-identity-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                  properties: w7,
                  headers: w7
                },
                type: mw
              }],
              type: Y$
            }, {
              error: "FIPS and DualStack are enabled, but this partition does not support one or both",
              type: rm
            }],
            type: Y$
          }, {
            conditions: T02,
            rules: [{
              conditions: [{
                [mZ]: nt,
                [dZ]: [R02, N02]
              }],
              rules: [{
                endpoint: {
                  url: "https://cognito-identity-fips.{Region}.{PartitionResult#dnsSuffix}",
                  properties: w7,
                  headers: w7
                },
                type: mw
              }],
              type: Y$
            }, {
              error: "FIPS is enabled but this partition does not support FIPS",
              type: rm
            }],
            type: Y$
          }, {
            conditions: P02,
            rules: [{
              conditions: [O02],
              rules: [{
                conditions: [{
                  [mZ]: lt,
                  [dZ]: ["aws", {
                    [mZ]: An1,
                    [dZ]: [k02, "name"]
                  }]
                }],
                endpoint: {
                  url: "https://cognito-identity.{Region}.amazonaws.com",
                  properties: w7,
                  headers: w7
                },
                type: mw
              }, {
                endpoint: {
                  url: "https://cognito-identity.{Region}.{PartitionResult#dualStackDnsSuffix}",
                  properties: w7,
                  headers: w7
                },
                type: mw
              }],
              type: Y$
            }, {
              error: "DualStack is enabled but this partition does not support DualStack",
              type: rm
            }],
            type: Y$
          }, {
            endpoint: {
              url: "https://cognito-identity.{Region}.{PartitionResult#dnsSuffix}",
              properties: w7,
              headers: w7
            },
            type: mw
          }],
          type: Y$
        }],
        type: Y$
      }, {
        error: "Invalid Configuration: Missing Region",
        type: rm
      }]
    };
  x02.ruleSet = Fk6
})
// @from(Start 5884120, End 5884678)
h02 = z((b02) => {
  Object.defineProperty(b02, "__esModule", {
    value: !0
  });
  b02.defaultEndpointResolver = void 0;
  var Xk6 = RL(),
    Bn1 = LL(),
    Vk6 = v02(),
    Ck6 = new Bn1.EndpointCache({
      size: 50,
      params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
    }),
    Kk6 = (A, B = {}) => {
      return Ck6.get(A, () => Bn1.resolveEndpoint(Vk6.ruleSet, {
        endpointParams: A,
        logger: B.logger
      }))
    };
  b02.defaultEndpointResolver = Kk6;
  Bn1.customEndpointFunctions.aws = Xk6.awsEndpointFunctions
})
// @from(Start 5884684, End 5886119)
c02 = z((u02) => {
  Object.defineProperty(u02, "__esModule", {
    value: !0
  });
  u02.getRuntimeConfig = void 0;
  var Hk6 = IB(),
    zk6 = NI(),
    wk6 = ct(),
    Ek6 = FN(),
    m02 = U02(),
    d02 = RQ(),
    Uk6 = vi1(),
    Nk6 = h02(),
    $k6 = (A) => {
      return {
        apiVersion: "2014-06-30",
        base64Decoder: A?.base64Decoder ?? m02.fromBase64,
        base64Encoder: A?.base64Encoder ?? m02.toBase64,
        disableHostPrefix: A?.disableHostPrefix ?? !1,
        endpointProvider: A?.endpointProvider ?? Nk6.defaultEndpointResolver,
        extensions: A?.extensions ?? [],
        httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? Uk6.defaultCognitoIdentityHttpAuthSchemeProvider,
        httpAuthSchemes: A?.httpAuthSchemes ?? [{
          schemeId: "aws.auth#sigv4",
          identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
          signer: new Hk6.AwsSdkSigV4Signer
        }, {
          schemeId: "smithy.api#noAuth",
          identityProvider: (B) => B.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new zk6.NoAuthSigner
        }],
        logger: A?.logger ?? new wk6.NoOpLogger,
        serviceId: A?.serviceId ?? "Cognito Identity",
        urlParser: A?.urlParser ?? Ek6.parseUrl,
        utf8Decoder: A?.utf8Decoder ?? d02.fromUtf8,
        utf8Encoder: A?.utf8Encoder ?? d02.toUtf8
      }
    };
  u02.getRuntimeConfig = $k6
})