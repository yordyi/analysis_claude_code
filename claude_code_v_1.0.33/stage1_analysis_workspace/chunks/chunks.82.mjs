
// @from(Start 8337628, End 8338080)
function wm2(A, B, Q, I) {
  if (!pB(A)) return A;
  B = sq(B, A);
  var G = -1,
    Z = B.length,
    D = Z - 1,
    Y = A;
  while (Y != null && ++G < Z) {
    var W = dH(B[G]),
      J = Q;
    if (W === "__proto__" || W === "constructor" || W === "prototype") return A;
    if (G != D) {
      var F = Y[W];
      if (J = I ? I(F, W, Y) : void 0, J === void 0) J = pB(F) ? F : uq(B[G + 1]) ? [] : {}
    }
    cq(Y, W, J), Y = Y[W]
  }
  return A
}
// @from(Start 8338085, End 8338094)
Z5A = wm2
// @from(Start 8338097, End 8338276)
function Em2(A, B, Q) {
  var I = -1,
    G = B.length,
    Z = {};
  while (++I < G) {
    var D = B[I],
      Y = nk(A, D);
    if (Q(Y, D)) Z5A(Z, sq(D, A), Y)
  }
  return Z
}
// @from(Start 8338281, End 8338290)
r21 = Em2
// @from(Start 8338293, End 8338473)
function Um2(A, B) {
  if (A == null) return {};
  var Q = xk(k21(A), function(I) {
    return [I]
  });
  return B = oq(B), r21(A, Q, function(I, G) {
    return B(I, G[0])
  })
}
// @from(Start 8338478, End 8338487)
_U1 = Um2
// @from(Start 8338493, End 8338608)
Nm2 = r6A(function(A, B, Q) {
    A[Q ? 0 : 1].push(B)
  }, function() {
    return [
      [],
      []
    ]
  })
// @from(Start 8338612, End 8338621)
jU1 = Nm2
// @from(Start 8338624, End 8338708)
function $m2(A, B) {
  return r21(A, B, function(Q, I) {
    return i21(A, I)
  })
}
// @from(Start 8338713, End 8338722)
D5A = $m2
// @from(Start 8338728, End 8338797)
qm2 = O4A(function(A, B) {
    return A == null ? {} : D5A(A, B)
  })
// @from(Start 8338801, End 8338810)
o21 = qm2
// @from(Start 8338857, End 8338917)
function Rm2(A, B) {
  return A + Mm2(Lm2() * (B - A + 1))
}
// @from(Start 8338922, End 8338931)
Y5A = Rm2
// @from(Start 8338934, End 8339012)
function Om2(A) {
  var B = A.length;
  return B ? A[Y5A(0, B - 1)] : void 0
}
// @from(Start 8339017, End 8339026)
t21 = Om2
// @from(Start 8339029, End 8339069)
function Tm2(A) {
  return t21(G5A(A))
}
// @from(Start 8339074, End 8339083)
W5A = Tm2
// @from(Start 8339086, End 8339148)
function Pm2(A) {
  var B = U8(A) ? t21 : W5A;
  return B(A)
}
// @from(Start 8339153, End 8339161)
EP = Pm2
// @from(Start 8339167, End 8339178)
Sm2 = 1 / 0
// @from(Start 8339182, End 8339276)
_m2 = !(rq && 1 / Ax(new rq([, -0]))[1] == Sm2) ? S9A : function(A) {
    return new rq(A)
  }
// @from(Start 8339280, End 8339289)
J5A = _m2
// @from(Start 8339295, End 8339304)
jm2 = 200
// @from(Start 8339307, End 8339905)
function ym2(A, B, Q) {
  var I = -1,
    G = g9A,
    Z = A.length,
    D = !0,
    Y = [],
    W = Y;
  if (Q) D = !1, G = Q5A;
  else if (Z >= jm2) {
    var J = B ? null : J5A(A);
    if (J) return Ax(J);
    D = !1, G = d21, W = new m21
  } else W = B ? [] : Y;
  A: while (++I < Z) {
    var F = A[I],
      X = B ? B(F) : F;
    if (F = Q || F !== 0 ? F : 0, D && X === X) {
      var V = W.length;
      while (V--)
        if (W[V] === X) continue A;
      if (B) W.push(X);
      Y.push(F)
    } else if (!G(W, X, Q)) {
      if (W !== Y) W.push(X);
      Y.push(F)
    }
  }
  return Y
}
// @from(Start 8339910, End 8339919)
F5A = ym2
// @from(Start 8339922, End 8339991)
function km2(A, B) {
  return A && A.length ? F5A(A, oq(B, 2)) : []
}
// @from(Start 8339996, End 8340004)
UP = km2
// @from(Start 8340007, End 8340182)
function xm2(A, B, Q) {
  var I = -1,
    G = A.length,
    Z = B.length,
    D = {};
  while (++I < G) {
    var Y = I < Z ? B[I] : void 0;
    Q(D, A[I], Y)
  }
  return D
}
// @from(Start 8340187, End 8340196)
X5A = xm2
// @from(Start 8340199, End 8340256)
function fm2(A, B) {
  return X5A(A || [], B || [], cq)
}
// @from(Start 8340261, End 8340270)
yU1 = fm2
// @from(Start 8340346, End 8340362)
ta = I1($c(), 1)
// @from(Start 8340730, End 8340747)
aL = I1(vJA(), 1)
// @from(Start 8340804, End 8341662)
xx = L0(() => {
  let A = fx(),
    B = ZA();
  return {
    customIDs: {
      sessionId: y9()
    },
    userID: A,
    appVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/s/claude-code",
      VERSION: "1.0.34"
    }.VERSION,
    email: CV9(),
    custom: {
      userType: "external",
      organizationUuid: B.oauthAccount?.organizationUuid,
      accountUuid: B.oauthAccount?.accountUuid,
      ...process.env.GITHUB_ACTIONS === "true" && {
        githubActor: process.env.GITHUB_ACTOR,
        githubActorId: process.env.GITHUB_ACTOR_ID,
        githubRepositoryOwner: process.env.GITHUB_REPOSITORY_OWNER,
        githubRepositoryOwnerId: process.env.GITHUB_REPOSITORY_OWNER_ID
      }
    }
  }
})
// @from(Start 8341665, End 8341792)
function CV9() {
  return;
  try {
    return VV9("git config --get user.email").toString().trim()
  } catch {
    return
  }
}
// @from(Start 8341797, End 8341891)
bJA = "https://e531a1d9ec1de9064fae9d4affb0b0f4@o1158394.ingest.us.sentry.io/4508259541909504"
// @from(Start 8341895, End 8341953)
gJA = "client-RRNS7R65EAtReO5XA4xDC3eU6ZdJQi6lLEP6b5j32Me"
// @from(Start 8341959, End 8341976)
If4 = I1(U1(), 1)
// @from(Start 8341979, End 8342061)
function El(A, B) {
  return function Q() {
    return A.apply(B, arguments)
  }
}
// @from(Start 8342422, End 8342578)
function CC9(A) {
  return A !== null && !Ul(A) && A.constructor !== null && !Ul(A.constructor) && IJ(A.constructor.isBuffer) && A.constructor.isBuffer(A)
}
// @from(Start 8342583, End 8342606)
oJA = BC("ArrayBuffer")
// @from(Start 8342609, End 8342782)
function KC9(A) {
  let B;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) B = ArrayBuffer.isView(A);
  else B = A && A.buffer && oJA(A.buffer);
  return B
}
// @from(Start 8343730, End 8344136)
function Nl(A, B, {
  allOwnKeys: Q = !1
} = {}) {
  if (A === null || typeof A === "undefined") return;
  let I, G;
  if (typeof A !== "object") A = [A];
  if (bx(A))
    for (I = 0, G = A.length; I < G; I++) B.call(null, A[I], I, A);
  else {
    let Z = Q ? Object.getOwnPropertyNames(A) : Object.keys(A),
      D = Z.length,
      Y;
    for (I = 0; I < D; I++) Y = Z[I], B.call(null, A[Y], Y, A)
  }
}
// @from(Start 8344138, End 8344317)
function eJA(A, B) {
  B = B.toLowerCase();
  let Q = Object.keys(A),
    I = Q.length,
    G;
  while (I-- > 0)
    if (G = Q[I], B === G.toLowerCase()) return G;
  return null
}
// @from(Start 8344322, End 8344500)
lP = (() => {
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global
  })()
// @from(Start 8344504, End 8344535)
AFA = (A) => !Ul(A) && A !== lP
// @from(Start 8344538, End 8344919)
function kq1() {
  let {
    caseless: A
  } = AFA(this) && this || {}, B = {}, Q = (I, G) => {
    let Z = A && eJA(B, G) || G;
    if (Q61(B[Z]) && Q61(I)) B[Z] = kq1(B[Z], I);
    else if (Q61(I)) B[Z] = kq1({}, I);
    else if (bx(I)) B[Z] = I.slice();
    else B[Z] = I
  };
  for (let I = 0, G = arguments.length; I < G; I++) arguments[I] && Nl(arguments[I], Q);
  return B
}
// @from(Start 8344924, End 8345105)
SC9 = (A, B, Q, {
    allOwnKeys: I
  } = {}) => {
    return Nl(B, (G, Z) => {
      if (Q && IJ(G)) A[Z] = El(G, Q);
      else A[Z] = G
    }, {
      allOwnKeys: I
    }), A
  }
// @from(Start 8345109, End 8345191)
_C9 = (A) => {
    if (A.charCodeAt(0) === 65279) A = A.slice(1);
    return A
  }
// @from(Start 8345195, End 8345404)
jC9 = (A, B, Q, I) => {
    A.prototype = Object.create(B.prototype, I), A.prototype.constructor = A, Object.defineProperty(A, "super", {
      value: B.prototype
    }), Q && Object.assign(A.prototype, Q)
  }
// @from(Start 8345408, End 8345767)
yC9 = (A, B, Q, I) => {
    let G, Z, D, Y = {};
    if (B = B || {}, A == null) return B;
    do {
      G = Object.getOwnPropertyNames(A), Z = G.length;
      while (Z-- > 0)
        if (D = G[Z], (!I || I(D, A, B)) && !Y[D]) B[D] = A[D], Y[D] = !0;
      A = Q !== !1 && xq1(A)
    } while (A && (!Q || Q(A, B)) && A !== Object.prototype);
    return B
  }
// @from(Start 8345771, End 8345941)
kC9 = (A, B, Q) => {
    if (A = String(A), Q === void 0 || Q > A.length) Q = A.length;
    Q -= B.length;
    let I = A.indexOf(B, Q);
    return I !== -1 && I === Q
  }
// @from(Start 8345945, End 8346137)
xC9 = (A) => {
    if (!A) return null;
    if (bx(A)) return A;
    let B = A.length;
    if (!tJA(B)) return null;
    let Q = new Array(B);
    while (B-- > 0) Q[B] = A[B];
    return Q
  }
// @from(Start 8346141, End 8346274)
fC9 = ((A) => {
    return (B) => {
      return A && B instanceof A
    }
  })(typeof Uint8Array !== "undefined" && xq1(Uint8Array))
// @from(Start 8346278, End 8346452)
vC9 = (A, B) => {
    let I = (A && A[Symbol.iterator]).call(A),
      G;
    while ((G = I.next()) && !G.done) {
      let Z = G.value;
      B.call(A, Z[0], Z[1])
    }
  }
// @from(Start 8346456, End 8346557)
bC9 = (A, B) => {
    let Q, I = [];
    while ((Q = A.exec(B)) !== null) I.push(Q);
    return I
  }
// @from(Start 8346561, End 8346588)
gC9 = BC("HTMLFormElement")
// @from(Start 8346592, End 8346732)
hC9 = (A) => {
    return A.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function B(Q, I, G) {
      return I.toUpperCase() + G
    })
  }
// @from(Start 8346736, End 8346817)
rJA = (({
    hasOwnProperty: A
  }) => (B, Q) => A.call(B, Q))(Object.prototype)
// @from(Start 8346821, End 8346839)
mC9 = BC("RegExp")
// @from(Start 8346843, End 8347049)
BFA = (A, B) => {
    let Q = Object.getOwnPropertyDescriptors(A),
      I = {};
    Nl(Q, (G, Z) => {
      let D;
      if ((D = B(G, Z, A)) !== !1) I[Z] = D || G
    }), Object.defineProperties(A, I)
  }
// @from(Start 8347053, End 8347436)
dC9 = (A) => {
    BFA(A, (B, Q) => {
      if (IJ(A) && ["arguments", "caller", "callee"].indexOf(Q) !== -1) return !1;
      let I = A[Q];
      if (!IJ(I)) return;
      if (B.enumerable = !1, "writable" in B) {
        B.writable = !1;
        return
      }
      if (!B.set) B.set = () => {
        throw Error("Can not rewrite read-only method '" + Q + "'")
      }
    })
  }
// @from(Start 8347440, End 8347614)
uC9 = (A, B) => {
    let Q = {},
      I = (G) => {
        G.forEach((Z) => {
          Q[Z] = !0
        })
      };
    return bx(A) ? I(A) : I(String(A).split(B)), Q
  }
// @from(Start 8347618, End 8347632)
pC9 = () => {}
// @from(Start 8347636, End 8347713)
cC9 = (A, B) => {
    return A != null && Number.isFinite(A = +A) ? A : B
  }
// @from(Start 8347716, End 8347828)
function lC9(A) {
  return !!(A && IJ(A.append) && A[Symbol.toStringTag] === "FormData" && A[Symbol.iterator])
}
// @from(Start 8347833, End 8348263)
iC9 = (A) => {
    let B = new Array(10),
      Q = (I, G) => {
        if (Z61(I)) {
          if (B.indexOf(I) >= 0) return;
          if (!("toJSON" in I)) {
            B[G] = I;
            let Z = bx(I) ? [] : {};
            return Nl(I, (D, Y) => {
              let W = Q(D, G + 1);
              !Ul(W) && (Z[Y] = W)
            }), B[G] = void 0, Z
          }
        }
        return I
      };
    return Q(A, 0)
  }
// @from(Start 8348267, End 8348292)
nC9 = BC("AsyncFunction")
// @from(Start 8348296, End 8348360)
aC9 = (A) => A && (Z61(A) || IJ(A)) && IJ(A.then) && IJ(A.catch)
// @from(Start 8348364, End 8348789)
QFA = ((A, B) => {
    if (A) return setImmediate;
    return B ? ((Q, I) => {
      return lP.addEventListener("message", ({
        source: G,
        data: Z
      }) => {
        if (G === lP && Z === Q) I.length && I.shift()()
      }, !1), (G) => {
        I.push(G), lP.postMessage(Q, "*")
      }
    })(`axios@${Math.random()}`, []) : (Q) => setTimeout(Q)
  })(typeof setImmediate === "function", IJ(lP.postMessage))
// @from(Start 8348793, End 8348922)
sC9 = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(lP) : typeof process !== "undefined" && process.nextTick || QFA
// @from(Start 8348926, End 8350073)
WA = {
    isArray: bx,
    isArrayBuffer: oJA,
    isBuffer: CC9,
    isFormData: qC9,
    isArrayBufferView: KC9,
    isString: HC9,
    isNumber: tJA,
    isBoolean: zC9,
    isObject: Z61,
    isPlainObject: Q61,
    isReadableStream: LC9,
    isRequest: RC9,
    isResponse: OC9,
    isHeaders: TC9,
    isUndefined: Ul,
    isDate: wC9,
    isFile: EC9,
    isBlob: UC9,
    isRegExp: mC9,
    isFunction: IJ,
    isStream: $C9,
    isURLSearchParams: MC9,
    isTypedArray: fC9,
    isFileList: NC9,
    forEach: Nl,
    merge: kq1,
    extend: SC9,
    trim: PC9,
    stripBOM: _C9,
    inherits: jC9,
    toFlatObject: yC9,
    kindOf: I61,
    kindOfTest: BC,
    endsWith: kC9,
    toArray: xC9,
    forEachEntry: vC9,
    matchAll: bC9,
    isHTMLForm: gC9,
    hasOwnProperty: rJA,
    hasOwnProp: rJA,
    reduceDescriptors: BFA,
    freezeMethods: dC9,
    toObjectSet: uC9,
    toCamelCase: hC9,
    noop: pC9,
    toFiniteNumber: cC9,
    findKey: eJA,
    global: lP,
    isContextDefined: AFA,
    isSpecCompliantForm: lC9,
    toJSONObject: iC9,
    isAsyncFn: nC9,
    isThenable: aC9,
    setImmediate: QFA,
    asap: sC9
  }
// @from(Start 8350076, End 8350427)
function gx(A, B, Q, I, G) {
  if (Error.call(this), Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
  else this.stack = new Error().stack;
  if (this.message = A, this.name = "AxiosError", B && (this.code = B), Q && (this.config = Q), I && (this.request = I), G) this.response = G, this.status = G.status ? G.status : null
}
// @from(Start 8350848, End 8350866)
IFA = gx.prototype
// @from(Start 8350870, End 8350878)
GFA = {}
// @from(Start 8351549, End 8351556)
F2 = gx
// @from(Start 8351562, End 8351580)
JVA = I1(WVA(), 1)
// @from(Start 8351584, End 8351601)
H61 = JVA.default
// @from(Start 8351604, End 8351669)
function GM1(A) {
  return WA.isPlainObject(A) || WA.isArray(A)
}
// @from(Start 8351671, End 8351741)
function XVA(A) {
  return WA.endsWith(A, "[]") ? A.slice(0, -2) : A
}
// @from(Start 8351743, End 8351907)
function FVA(A, B, Q) {
  if (!A) return B;
  return A.concat(B).map(function I(G, Z) {
    return G = XVA(G), !Q && Z ? "[" + G + "]" : G
  }).join(Q ? "." : "")
}
// @from(Start 8351909, End 8351967)
function bH9(A) {
  return WA.isArray(A) && !A.some(GM1)
}
// @from(Start 8351972, End 8352054)
gH9 = WA.toFlatObject(WA, {}, null, function A(B) {
  return /^is[A-Z]/.test(B)
})
// @from(Start 8352057, End 8353996)
function hH9(A, B, Q) {
  if (!WA.isObject(A)) throw new TypeError("target must be an object");
  B = B || new(H61 || FormData), Q = WA.toFlatObject(Q, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function K(E, N) {
    return !WA.isUndefined(N[E])
  });
  let I = Q.metaTokens,
    G = Q.visitor || F,
    Z = Q.dots,
    D = Q.indexes,
    W = (Q.Blob || typeof Blob !== "undefined" && Blob) && WA.isSpecCompliantForm(B);
  if (!WA.isFunction(G)) throw new TypeError("visitor must be a function");

  function J(K) {
    if (K === null) return "";
    if (WA.isDate(K)) return K.toISOString();
    if (!W && WA.isBlob(K)) throw new F2("Blob is not supported. Use a Buffer instead.");
    if (WA.isArrayBuffer(K) || WA.isTypedArray(K)) return W && typeof Blob === "function" ? new Blob([K]) : Buffer.from(K);
    return K
  }

  function F(K, E, N) {
    let q = K;
    if (K && !N && typeof K === "object") {
      if (WA.endsWith(E, "{}")) E = I ? E : E.slice(0, -2), K = JSON.stringify(K);
      else if (WA.isArray(K) && bH9(K) || (WA.isFileList(K) || WA.endsWith(E, "[]")) && (q = WA.toArray(K))) return E = XVA(E), q.forEach(function O(R, T) {
        !(WA.isUndefined(R) || R === null) && B.append(D === !0 ? FVA([E], T, Z) : D === null ? E : E + "[]", J(R))
      }), !1
    }
    if (GM1(K)) return !0;
    return B.append(FVA(N, E, Z), J(K)), !1
  }
  let X = [],
    V = Object.assign(gH9, {
      defaultVisitor: F,
      convertValue: J,
      isVisitable: GM1
    });

  function C(K, E) {
    if (WA.isUndefined(K)) return;
    if (X.indexOf(K) !== -1) throw Error("Circular reference detected in " + E.join("."));
    X.push(K), WA.forEach(K, function N(q, O) {
      if ((!(WA.isUndefined(q) || q === null) && G.call(B, q, WA.isString(O) ? O.trim() : O, E, V)) === !0) C(q, E ? E.concat(O) : [O])
    }), X.pop()
  }
  if (!WA.isObject(A)) throw new TypeError("data must be an object");
  return C(A), B
}
// @from(Start 8354001, End 8354009)
JM = hH9
// @from(Start 8354012, End 8354258)
function VVA(A) {
  let B = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\x00"
  };
  return encodeURIComponent(A).replace(/[!'()~]|%20|%00/g, function Q(I) {
    return B[I]
  })
}
// @from(Start 8354260, End 8354322)
function CVA(A, B) {
  this._pairs = [], A && JM(A, this, B)
}
// @from(Start 8354327, End 8354346)
KVA = CVA.prototype
// @from(Start 8354614, End 8354623)
HVA = CVA
// @from(Start 8354626, End 8354806)
function mH9(A) {
  return encodeURIComponent(A).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
}
// @from(Start 8354808, End 8355212)
function nP(A, B, Q) {
  if (!B) return A;
  let I = Q && Q.encode || mH9;
  if (WA.isFunction(Q)) Q = {
    serialize: Q
  };
  let G = Q && Q.serialize,
    Z;
  if (G) Z = G(B, Q);
  else Z = WA.isURLSearchParams(B) ? B.toString() : new HVA(B, Q).toString(I);
  if (Z) {
    let D = A.indexOf("#");
    if (D !== -1) A = A.slice(0, D);
    A += (A.indexOf("?") === -1 ? "?" : "&") + Z
  }
  return A
}
// @from(Start 8355213, End 8355699)
class zVA {
  constructor() {
    this.handlers = []
  }
  use(A, B, Q) {
    return this.handlers.push({
      fulfilled: A,
      rejected: B,
      synchronous: Q ? Q.synchronous : !1,
      runWhen: Q ? Q.runWhen : null
    }), this.handlers.length - 1
  }
  eject(A) {
    if (this.handlers[A]) this.handlers[A] = null
  }
  clear() {
    if (this.handlers) this.handlers = []
  }
  forEach(A) {
    WA.forEach(this.handlers, function B(Q) {
      if (Q !== null) A(Q)
    })
  }
}
// @from(Start 8355704, End 8355713)
ZM1 = zVA
// @from(Start 8355719, End 8355803)
px = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}
// @from(Start 8355858, End 8355883)
wVA = dH9.URLSearchParams
// @from(Start 8355889, End 8355923)
DM1 = "abcdefghijklmnopqrstuvwxyz"
// @from(Start 8355927, End 8355945)
EVA = "0123456789"
// @from(Start 8355949, End 8356039)
UVA = {
    DIGIT: EVA,
    ALPHA: DM1,
    ALPHA_DIGIT: DM1 + DM1.toUpperCase() + EVA
  }
// @from(Start 8356043, End 8356262)
pH9 = (A = 16, B = UVA.ALPHA_DIGIT) => {
    let Q = "",
      {
        length: I
      } = B,
      G = new Uint32Array(A);
    uH9.randomFillSync(G);
    for (let Z = 0; Z < A; Z++) Q += B[G[Z] % I];
    return Q
  }
// @from(Start 8356266, End 8356513)
NVA = {
    isNode: !0,
    classes: {
      URLSearchParams: wVA,
      FormData: H61,
      Blob: typeof Blob !== "undefined" && Blob || null
    },
    ALPHABET: UVA,
    generateString: pH9,
    protocols: ["http", "https", "file", "data"]
  }
// @from(Start 8356519, End 8356527)
JM1 = {}
// @from(Start 8356700, End 8356770)
WM1 = typeof window !== "undefined" && typeof document !== "undefined"
// @from(Start 8356774, End 8356832)
YM1 = typeof navigator === "object" && navigator || void 0
// @from(Start 8356836, End 8356921)
cH9 = WM1 && (!YM1 || ["ReactNative", "NativeScript", "NS"].indexOf(YM1.product) < 0)
// @from(Start 8356925, End 8357079)
lH9 = (() => {
    return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function"
  })()
// @from(Start 8357083, End 8357138)
iH9 = WM1 && window.location.href || "http://localhost"
// @from(Start 8357144, End 8357171)
q5 = {
  ...JM1,
  ...NVA
}
// @from(Start 8357174, End 8357451)
function FM1(A, B) {
  return JM(A, new q5.classes.URLSearchParams, Object.assign({
    visitor: function(Q, I, G, Z) {
      if (q5.isNode && WA.isBuffer(Q)) return this.append(I, Q.toString("base64")), !1;
      return Z.defaultVisitor.apply(this, arguments)
    }
  }, B))
}
// @from(Start 8357453, End 8357576)
function nH9(A) {
  return WA.matchAll(/\w+|\[(\w*)]/g, A).map((B) => {
    return B[0] === "[]" ? "" : B[1] || B[0]
  })
}
// @from(Start 8357578, End 8357723)
function aH9(A) {
  let B = {},
    Q = Object.keys(A),
    I, G = Q.length,
    Z;
  for (I = 0; I < G; I++) Z = Q[I], B[Z] = A[Z];
  return B
}
// @from(Start 8357725, End 8358327)
function sH9(A) {
  function B(Q, I, G, Z) {
    let D = Q[Z++];
    if (D === "__proto__") return !0;
    let Y = Number.isFinite(+D),
      W = Z >= Q.length;
    if (D = !D && WA.isArray(G) ? G.length : D, W) {
      if (WA.hasOwnProp(G, D)) G[D] = [G[D], I];
      else G[D] = I;
      return !Y
    }
    if (!G[D] || !WA.isObject(G[D])) G[D] = [];
    if (B(Q, I, G[D], Z) && WA.isArray(G[D])) G[D] = aH9(G[D]);
    return !Y
  }
  if (WA.isFormData(A) && WA.isFunction(A.entries)) {
    let Q = {};
    return WA.forEachEntry(A, (I, G) => {
      B(nH9(I), G, Q, 0)
    }), Q
  }
  return null
}
// @from(Start 8358332, End 8358341)
z61 = sH9
// @from(Start 8358344, End 8358537)
function rH9(A, B, Q) {
  if (WA.isString(A)) try {
    return (B || JSON.parse)(A), WA.trim(A)
  } catch (I) {
    if (I.name !== "SyntaxError") throw I
  }
  return (Q || JSON.stringify)(A)
}
// @from(Start 8358542, End 8360616)
XM1 = {
  transitional: px,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function A(B, Q) {
    let I = Q.getContentType() || "",
      G = I.indexOf("application/json") > -1,
      Z = WA.isObject(B);
    if (Z && WA.isHTMLForm(B)) B = new FormData(B);
    if (WA.isFormData(B)) return G ? JSON.stringify(z61(B)) : B;
    if (WA.isArrayBuffer(B) || WA.isBuffer(B) || WA.isStream(B) || WA.isFile(B) || WA.isBlob(B) || WA.isReadableStream(B)) return B;
    if (WA.isArrayBufferView(B)) return B.buffer;
    if (WA.isURLSearchParams(B)) return Q.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), B.toString();
    let Y;
    if (Z) {
      if (I.indexOf("application/x-www-form-urlencoded") > -1) return FM1(B, this.formSerializer).toString();
      if ((Y = WA.isFileList(B)) || I.indexOf("multipart/form-data") > -1) {
        let W = this.env && this.env.FormData;
        return JM(Y ? {
          "files[]": B
        } : B, W && new W, this.formSerializer)
      }
    }
    if (Z || G) return Q.setContentType("application/json", !1), rH9(B);
    return B
  }],
  transformResponse: [function A(B) {
    let Q = this.transitional || XM1.transitional,
      I = Q && Q.forcedJSONParsing,
      G = this.responseType === "json";
    if (WA.isResponse(B) || WA.isReadableStream(B)) return B;
    if (B && WA.isString(B) && (I && !this.responseType || G)) {
      let D = !(Q && Q.silentJSONParsing) && G;
      try {
        return JSON.parse(B)
      } catch (Y) {
        if (D) {
          if (Y.name === "SyntaxError") throw F2.from(Y, F2.ERR_BAD_RESPONSE, this, null, this.response);
          throw Y
        }
      }
    }
    return B
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: q5.classes.FormData,
    Blob: q5.classes.Blob
  },
  validateStatus: function A(B) {
    return B >= 200 && B < 300
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
}
// @from(Start 8360719, End 8360727)
cx = XM1
// @from(Start 8360733, End 8361000)
oH9 = WA.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"])
// @from(Start 8361004, End 8361383)
$VA = (A) => {
    let B = {},
      Q, I, G;
    return A && A.split(`
`).forEach(function Z(D) {
      if (G = D.indexOf(":"), Q = D.substring(0, G).trim().toLowerCase(), I = D.substring(G + 1).trim(), !Q || B[Q] && oH9[Q]) return;
      if (Q === "set-cookie")
        if (B[Q]) B[Q].push(I);
        else B[Q] = [I];
      else B[Q] = B[Q] ? B[Q] + ", " + I : I
    }), B
  }
// @from(Start 8361389, End 8361414)
qVA = Symbol("internals")
// @from(Start 8361417, End 8361480)
function Rl(A) {
  return A && String(A).trim().toLowerCase()
}
// @from(Start 8361482, End 8361588)
function w61(A) {
  if (A === !1 || A == null) return A;
  return WA.isArray(A) ? A.map(w61) : String(A)
}
// @from(Start 8361590, End 8361742)
function tH9(A) {
  let B = Object.create(null),
    Q = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,
    I;
  while (I = Q.exec(A)) B[I[1]] = I[2];
  return B
}
// @from(Start 8361747, End 8361807)
eH9 = (A) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(A.trim())
// @from(Start 8361810, End 8362028)
function VM1(A, B, Q, I, G) {
  if (WA.isFunction(I)) return I.call(this, B, Q);
  if (G) B = Q;
  if (!WA.isString(B)) return;
  if (WA.isString(I)) return B.indexOf(I) !== -1;
  if (WA.isRegExp(I)) return I.test(B)
}
// @from(Start 8362030, End 8362159)
function Az9(A) {
  return A.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (B, Q, I) => {
    return Q.toUpperCase() + I
  })
}
// @from(Start 8362161, End 8362420)
function Bz9(A, B) {
  let Q = WA.toCamelCase(" " + B);
  ["get", "set", "has"].forEach((I) => {
    Object.defineProperty(A, I + Q, {
      value: function(G, Z, D) {
        return this[I].call(this, B, G, Z, D)
      },
      configurable: !0
    })
  })
}
// @from(Start 8362421, End 8365382)
class Ol {
  constructor(A) {
    A && this.set(A)
  }
  set(A, B, Q) {
    let I = this;

    function G(D, Y, W) {
      let J = Rl(Y);
      if (!J) throw new Error("header name must be a non-empty string");
      let F = WA.findKey(I, J);
      if (!F || I[F] === void 0 || W === !0 || W === void 0 && I[F] !== !1) I[F || Y] = w61(D)
    }
    let Z = (D, Y) => WA.forEach(D, (W, J) => G(W, J, Y));
    if (WA.isPlainObject(A) || A instanceof this.constructor) Z(A, B);
    else if (WA.isString(A) && (A = A.trim()) && !eH9(A)) Z($VA(A), B);
    else if (WA.isHeaders(A))
      for (let [D, Y] of A.entries()) G(Y, D, Q);
    else A != null && G(B, A, Q);
    return this
  }
  get(A, B) {
    if (A = Rl(A), A) {
      let Q = WA.findKey(this, A);
      if (Q) {
        let I = this[Q];
        if (!B) return I;
        if (B === !0) return tH9(I);
        if (WA.isFunction(B)) return B.call(this, I, Q);
        if (WA.isRegExp(B)) return B.exec(I);
        throw new TypeError("parser must be boolean|regexp|function")
      }
    }
  }
  has(A, B) {
    if (A = Rl(A), A) {
      let Q = WA.findKey(this, A);
      return !!(Q && this[Q] !== void 0 && (!B || VM1(this, this[Q], Q, B)))
    }
    return !1
  }
  delete(A, B) {
    let Q = this,
      I = !1;

    function G(Z) {
      if (Z = Rl(Z), Z) {
        let D = WA.findKey(Q, Z);
        if (D && (!B || VM1(Q, Q[D], D, B))) delete Q[D], I = !0
      }
    }
    if (WA.isArray(A)) A.forEach(G);
    else G(A);
    return I
  }
  clear(A) {
    let B = Object.keys(this),
      Q = B.length,
      I = !1;
    while (Q--) {
      let G = B[Q];
      if (!A || VM1(this, this[G], G, A, !0)) delete this[G], I = !0
    }
    return I
  }
  normalize(A) {
    let B = this,
      Q = {};
    return WA.forEach(this, (I, G) => {
      let Z = WA.findKey(Q, G);
      if (Z) {
        B[Z] = w61(I), delete B[G];
        return
      }
      let D = A ? Az9(G) : String(G).trim();
      if (D !== G) delete B[G];
      B[D] = w61(I), Q[D] = !0
    }), this
  }
  concat(...A) {
    return this.constructor.concat(this, ...A)
  }
  toJSON(A) {
    let B = Object.create(null);
    return WA.forEach(this, (Q, I) => {
      Q != null && Q !== !1 && (B[I] = A && WA.isArray(Q) ? Q.join(", ") : Q)
    }), B
  } [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]()
  }
  toString() {
    return Object.entries(this.toJSON()).map(([A, B]) => A + ": " + B).join(`
`)
  }
  get[Symbol.toStringTag]() {
    return "AxiosHeaders"
  }
  static from(A) {
    return A instanceof this ? A : new this(A)
  }
  static concat(A, ...B) {
    let Q = new this(A);
    return B.forEach((I) => Q.set(I)), Q
  }
  static accessor(A) {
    let Q = (this[qVA] = this[qVA] = {
        accessors: {}
      }).accessors,
      I = this.prototype;

    function G(Z) {
      let D = Rl(Z);
      if (!Q[D]) Bz9(I, Z), Q[D] = !0
    }
    return WA.isArray(A) ? A.forEach(G) : G(A), this
  }
}
// @from(Start 8365695, End 8365702)
w3 = Ol
// @from(Start 8365705, End 8365929)
function Tl(A, B) {
  let Q = this || cx,
    I = B || Q,
    G = w3.from(I.headers),
    Z = I.data;
  return WA.forEach(A, function D(Y) {
    Z = Y.call(Q, Z, G.normalize(), B ? B.status : void 0)
  }), G.normalize(), Z
}
// @from(Start 8365931, End 8365980)
function Pl(A) {
  return !!(A && A.__CANCEL__)
}
// @from(Start 8365982, End 8366103)
function MVA(A, B, Q) {
  F2.call(this, A == null ? "canceled" : A, F2.ERR_CANCELED, B, Q), this.name = "CanceledError"
}
// @from(Start 8366152, End 8366160)
GJ = MVA
// @from(Start 8366163, End 8366429)
function Gz(A, B, Q) {
  let I = Q.config.validateStatus;
  if (!Q.status || !I || I(Q.status)) A(Q);
  else B(new F2("Request failed with status code " + Q.status, [F2.ERR_BAD_REQUEST, F2.ERR_BAD_RESPONSE][Math.floor(Q.status / 100) - 4], Q.config, Q.request, Q))
}
// @from(Start 8366431, End 8366497)
function CM1(A) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(A)
}
// @from(Start 8366499, End 8366592)
function KM1(A, B) {
  return B ? A.replace(/\/?\/$/, "") + "/" + B.replace(/^\/+/, "") : A
}
// @from(Start 8366594, End 8366693)
function aP(A, B, Q) {
  let I = !CM1(B);
  if (A && (I || Q == !1)) return KM1(A, B);
  return B
}
// @from(Start 8366698, End 8366716)
ZCA = I1(LVA(), 1)
// @from(Start 8366720, End 8366738)
DCA = I1(cVA(), 1)
// @from(Start 8366840, End 8366852)
eP = "1.8.4"
// @from(Start 8366855, End 8366945)
function fl(A) {
  let B = /^([-+\w]{1,25})(:?\/\/|:)/.exec(A);
  return B && B[1] || ""
}
// @from(Start 8366950, End 8367003)
Gw9 = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/
// @from(Start 8367006, End 8367618)
function _M1(A, B, Q) {
  let I = Q && Q.Blob || q5.classes.Blob,
    G = fl(A);
  if (B === void 0 && I) B = !0;
  if (G === "data") {
    A = G.length ? A.slice(G.length + 1) : A;
    let Z = Gw9.exec(A);
    if (!Z) throw new F2("Invalid URL", F2.ERR_INVALID_URL);
    let D = Z[1],
      Y = Z[2],
      W = Z[3],
      J = Buffer.from(decodeURIComponent(W), Y ? "base64" : "utf8");
    if (B) {
      if (!I) throw new F2("Blob is not supported", F2.ERR_NOT_SUPPORT);
      return new I([J], {
        type: D
      })
    }
    return J
  }
  throw new F2("Unsupported protocol " + G, F2.ERR_NOT_SUPPORT)
}
// @from(Start 8367674, End 8367699)
jM1 = Symbol("internals")
// @from(Start 8367701, End 8369850)
class lVA extends Zw9.Transform {
  constructor(A) {
    A = WA.toFlatObject(A, {
      maxRate: 0,
      chunkSize: 65536,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (Q, I) => {
      return !WA.isUndefined(I[Q])
    });
    super({
      readableHighWaterMark: A.chunkSize
    });
    let B = this[jM1] = {
      timeWindow: A.timeWindow,
      chunkSize: A.chunkSize,
      maxRate: A.maxRate,
      minChunkSize: A.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (Q) => {
      if (Q === "progress") {
        if (!B.isCaptured) B.isCaptured = !0
      }
    })
  }
  _read(A) {
    let B = this[jM1];
    if (B.onReadCallback) B.onReadCallback();
    return super._read(A)
  }
  _transform(A, B, Q) {
    let I = this[jM1],
      G = I.maxRate,
      Z = this.readableHighWaterMark,
      D = I.timeWindow,
      Y = 1000 / D,
      W = G / Y,
      J = I.minChunkSize !== !1 ? Math.max(I.minChunkSize, W * 0.01) : 0,
      F = (V, C) => {
        let K = Buffer.byteLength(V);
        if (I.bytesSeen += K, I.bytes += K, I.isCaptured && this.emit("progress", I.bytesSeen), this.push(V)) process.nextTick(C);
        else I.onReadCallback = () => {
          I.onReadCallback = null, process.nextTick(C)
        }
      },
      X = (V, C) => {
        let K = Buffer.byteLength(V),
          E = null,
          N = Z,
          q, O = 0;
        if (G) {
          let R = Date.now();
          if (!I.ts || (O = R - I.ts) >= D) I.ts = R, q = W - I.bytes, I.bytes = q < 0 ? -q : 0, O = 0;
          q = W - I.bytes
        }
        if (G) {
          if (q <= 0) return setTimeout(() => {
            C(null, V)
          }, D - O);
          if (q < N) N = q
        }
        if (N && K > N && K - N > J) E = V.subarray(N), V = V.subarray(0, N);
        F(V, E ? () => {
          process.nextTick(C, null, E)
        } : C)
      };
    X(A, function V(C, K) {
      if (C) return Q(C);
      if (K) X(K, V);
      else Q(null)
    })
  }
}
// @from(Start 8369855, End 8369864)
yM1 = lVA
// @from(Start 8370207, End 8370243)
Jw9 = q5.ALPHABET.ALPHA_DIGIT + "-_"
// @from(Start 8370247, End 8370325)
vl = typeof TextEncoder === "function" ? new TextEncoder : new Yw9.TextEncoder
// @from(Start 8370329, End 8370339)
FM = `\r
`
// @from(Start 8370343, End 8370362)
Fw9 = vl.encode(FM)
// @from(Start 8370366, End 8370373)
Xw9 = 2
// @from(Start 8370375, End 8371221)
class nVA {
  constructor(A, B) {
    let {
      escapeName: Q
    } = this.constructor, I = WA.isString(B), G = `Content-Disposition: form-data; name="${Q(A)}"${!I&&B.name?`; filename="${Q(B.name)}"`:""}${FM}`;
    if (I) B = vl.encode(String(B).replace(/\r?\n|\r\n?/g, FM));
    else G += `Content-Type: ${B.type||"application/octet-stream"}${FM}`;
    this.headers = vl.encode(G + FM), this.contentLength = I ? B.byteLength : B.size, this.size = this.headers.byteLength + this.contentLength + Xw9, this.name = A, this.value = B
  }
  async * encode() {
    yield this.headers;
    let {
      value: A
    } = this;
    if (WA.isTypedArray(A)) yield A;
    else yield* L61(A);
    yield Fw9
  }
  static escapeName(A) {
    return String(A).replace(/[\r\n"]/g, (B) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[B])
  }
}
// @from(Start 8371226, End 8372109)
Vw9 = (A, B, Q) => {
    let {
      tag: I = "form-data-boundary",
      size: G = 25,
      boundary: Z = I + "-" + q5.generateString(G, Jw9)
    } = Q || {};
    if (!WA.isFormData(A)) throw TypeError("FormData instance required");
    if (Z.length < 1 || Z.length > 70) throw Error("boundary must be 10-70 characters long");
    let D = vl.encode("--" + Z + FM),
      Y = vl.encode("--" + Z + "--" + FM + FM),
      W = Y.byteLength,
      J = Array.from(A.entries()).map(([X, V]) => {
        let C = new nVA(X, V);
        return W += C.size, C
      });
    W += D.byteLength * J.length, W = WA.toFiniteNumber(W);
    let F = {
      "Content-Type": `multipart/form-data; boundary=${Z}`
    };
    if (Number.isFinite(W)) F["Content-Length"] = W;
    return B && B(F), Ww9.from(async function*() {
      for (let X of J) yield D, yield* X.encode();
      yield Y
    }())
  }
// @from(Start 8372113, End 8372122)
aVA = Vw9
// @from(Start 8372150, End 8372477)
class sVA extends Cw9.Transform {
  __transform(A, B, Q) {
    this.push(A), Q()
  }
  _transform(A, B, Q) {
    if (A.length !== 0) {
      if (this._transform = this.__transform, A[0] !== 120) {
        let I = Buffer.alloc(2);
        I[0] = 120, I[1] = 156, this.push(I, B)
      }
    }
    this.__transform(A, B, Q)
  }
}
// @from(Start 8372482, End 8372491)
rVA = sVA
// @from(Start 8372497, End 8372751)
Kw9 = (A, B) => {
    return WA.isAsyncFn(A) ? function(...Q) {
      let I = Q.pop();
      A.apply(this, Q).then((G) => {
        try {
          B ? I(null, ...B(G)) : I(null, G)
        } catch (Z) {
          I(Z)
        }
      }, I)
    } : A
  }
// @from(Start 8372755, End 8372764)
oVA = Kw9
// @from(Start 8372767, End 8373271)
function Hw9(A, B) {
  A = A || 10;
  let Q = new Array(A),
    I = new Array(A),
    G = 0,
    Z = 0,
    D;
  return B = B !== void 0 ? B : 1000,
    function Y(W) {
      let J = Date.now(),
        F = I[Z];
      if (!D) D = J;
      Q[G] = W, I[G] = J;
      let X = Z,
        V = 0;
      while (X !== G) V += Q[X++], X = X % A;
      if (G = (G + 1) % A, G === Z) Z = (Z + 1) % A;
      if (J - D < B) return;
      let C = F && J - F;
      return C ? Math.round(V * 1000 / C) : void 0
    }
}
// @from(Start 8373276, End 8373285)
tVA = Hw9
// @from(Start 8373288, End 8373659)
function zw9(A, B) {
  let Q = 0,
    I = 1000 / B,
    G, Z, D = (J, F = Date.now()) => {
      if (Q = F, G = null, Z) clearTimeout(Z), Z = null;
      A.apply(null, J)
    };
  return [(...J) => {
    let F = Date.now(),
      X = F - Q;
    if (X >= I) D(J, F);
    else if (G = J, !Z) Z = setTimeout(() => {
      Z = null, D(G)
    }, I - X)
  }, () => G && D(G)]
}
// @from(Start 8373664, End 8373673)
eVA = zw9
// @from(Start 8373679, End 8374233)
fU = (A, B, Q = 3) => {
    let I = 0,
      G = tVA(50, 250);
    return eVA((Z) => {
      let D = Z.loaded,
        Y = Z.lengthComputable ? Z.total : void 0,
        W = D - I,
        J = G(W),
        F = D <= Y;
      I = D;
      let X = {
        loaded: D,
        total: Y,
        progress: Y ? D / Y : void 0,
        bytes: W,
        rate: J ? J : void 0,
        estimated: J && Y && F ? (Y - D) / J : void 0,
        event: Z,
        lengthComputable: Y != null,
        [B ? "download" : "upload"]: !0
      };
      A(X)
    }, Q)
  }
// @from(Start 8374237, End 8374379)
sx = (A, B) => {
    let Q = A != null;
    return [(I) => B[0]({
      lengthComputable: Q,
      total: A,
      loaded: I
    }), B[1]]
  }
// @from(Start 8374383, End 8374427)
rx = (A) => (...B) => WA.asap(() => A(...B))
// @from(Start 8374899, End 8375043)
function Rw9(A, B) {
  if (A.beforeRedirects.proxy) A.beforeRedirects.proxy(A);
  if (A.beforeRedirects.config) A.beforeRedirects.config(A, B)
}
// @from(Start 8375045, End 8375838)
function YCA(A, B, Q) {
  let I = B;
  if (!I && I !== !1) {
    let G = ZCA.default.getProxyForUrl(Q);
    if (G) I = new URL(G)
  }
  if (I) {
    if (I.username) I.auth = (I.username || "") + ":" + (I.password || "");
    if (I.auth) {
      if (I.auth.username || I.auth.password) I.auth = (I.auth.username || "") + ":" + (I.auth.password || "");
      let Z = Buffer.from(I.auth, "utf8").toString("base64");
      A.headers["Proxy-Authorization"] = "Basic " + Z
    }
    A.headers.host = A.hostname + (A.port ? ":" + A.port : "");
    let G = I.hostname || I.host;
    if (A.hostname = G, A.host = G, A.port = I.port, A.path = Q, I.protocol) A.protocol = I.protocol.includes(":") ? I.protocol : `${I.protocol}:`
  }
  A.beforeRedirects.proxy = function G(Z) {
    YCA(Z, B, Z.href)
  }
}
// @from(Start 8375843, End 8375915)
Ow9 = typeof process !== "undefined" && WA.kindOf(process) === "process"
// @from(Start 8375919, End 8376225)
Tw9 = (A) => {
    return new Promise((B, Q) => {
      let I, G, Z = (W, J) => {
          if (G) return;
          G = !0, I && I(W, J)
        },
        D = (W) => {
          Z(W), B(W)
        },
        Y = (W) => {
          Z(W, !0), Q(W)
        };
      A(D, Y, (W) => I = W).catch(Y)
    })
  }
// @from(Start 8376229, End 8376436)
Pw9 = ({
    address: A,
    family: B
  }) => {
    if (!WA.isString(A)) throw TypeError("address must be a string");
    return {
      address: A,
      family: B || (A.indexOf(".") < 0 ? 6 : 4)
    }
  }
// @from(Start 8376440, End 8376517)
GCA = (A, B) => Pw9(WA.isObject(A) ? A : {
    address: A,
    family: B
  })
// @from(Start 8376521, End 8386421)
WCA = Ow9 && function A(B) {
    return Tw9(async function Q(I, G, Z) {
      let {
        data: D,
        lookup: Y,
        family: W
      } = B, {
        responseType: J,
        responseEncoding: F
      } = B, X = B.method.toUpperCase(), V, C = !1, K;
      if (Y) {
        let u1 = oVA(Y, (d1) => WA.isArray(d1) ? d1 : [d1]);
        Y = (d1, YA, bA) => {
          u1(d1, YA, (e1, k1, Q1) => {
            if (e1) return bA(e1);
            let v1 = WA.isArray(k1) ? k1.map((L1) => GCA(L1)) : [GCA(k1, Q1)];
            YA.all ? bA(e1, v1) : bA(e1, v1[0].address, v1[0].family)
          })
        }
      }
      let E = new Nw9,
        N = () => {
          if (B.cancelToken) B.cancelToken.unsubscribe(q);
          if (B.signal) B.signal.removeEventListener("abort", q);
          E.removeAllListeners()
        };
      Z((u1, d1) => {
        if (V = !0, d1) C = !0, N()
      });

      function q(u1) {
        E.emit("abort", !u1 || u1.type ? new GJ(null, B, K) : u1)
      }
      if (E.once("abort", G), B.cancelToken || B.signal) {
        if (B.cancelToken && B.cancelToken.subscribe(q), B.signal) B.signal.aborted ? q() : B.signal.addEventListener("abort", q)
      }
      let O = aP(B.baseURL, B.url, B.allowAbsoluteUrls),
        R = new URL(O, q5.hasBrowserEnv ? q5.origin : void 0),
        T = R.protocol || QCA[0];
      if (T === "data:") {
        let u1;
        if (X !== "GET") return Gz(I, G, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: B
        });
        try {
          u1 = _M1(B.url, J === "blob", {
            Blob: B.env && B.env.Blob
          })
        } catch (d1) {
          throw F2.from(d1, F2.ERR_BAD_REQUEST, B)
        }
        if (J === "text") {
          if (u1 = u1.toString(F), !F || F === "utf8") u1 = WA.stripBOM(u1)
        } else if (J === "stream") u1 = ox.Readable.from(u1);
        return Gz(I, G, {
          data: u1,
          status: 200,
          statusText: "OK",
          headers: new w3,
          config: B
        })
      }
      if (QCA.indexOf(T) === -1) return G(new F2("Unsupported protocol " + T, F2.ERR_BAD_REQUEST, B));
      let L = w3.from(B.headers).normalize();
      L.set("User-Agent", "axios/" + eP, !1);
      let {
        onUploadProgress: _,
        onDownloadProgress: k
      } = B, i = B.maxRate, x = void 0, s = void 0;
      if (WA.isSpecCompliantForm(D)) {
        let u1 = L.getContentType(/boundary=([-_\w\d]{10,70})/i);
        D = aVA(D, (d1) => {
          L.set(d1)
        }, {
          tag: `axios-${eP}-boundary`,
          boundary: u1 && u1[1] || void 0
        })
      } else if (WA.isFormData(D) && WA.isFunction(D.getHeaders)) {
        if (L.set(D.getHeaders()), !L.hasContentLength()) try {
          let u1 = await Uw9.promisify(D.getLength).call(D);
          Number.isFinite(u1) && u1 >= 0 && L.setContentLength(u1)
        } catch (u1) {}
      } else if (WA.isBlob(D) || WA.isFile(D)) D.size && L.setContentType(D.type || "application/octet-stream"), L.setContentLength(D.size || 0), D = ox.Readable.from(L61(D));
      else if (D && !WA.isStream(D)) {
        if (Buffer.isBuffer(D));
        else if (WA.isArrayBuffer(D)) D = Buffer.from(new Uint8Array(D));
        else if (WA.isString(D)) D = Buffer.from(D, "utf-8");
        else return G(new F2("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", F2.ERR_BAD_REQUEST, B));
        if (L.setContentLength(D.length, !1), B.maxBodyLength > -1 && D.length > B.maxBodyLength) return G(new F2("Request body larger than maxBodyLength limit", F2.ERR_BAD_REQUEST, B))
      }
      let d = WA.toFiniteNumber(L.getContentLength());
      if (WA.isArray(i)) x = i[0], s = i[1];
      else x = s = i;
      if (D && (_ || x)) {
        if (!WA.isStream(D)) D = ox.Readable.from(D, {
          objectMode: !1
        });
        D = ox.pipeline([D, new yM1({
          maxRate: WA.toFiniteNumber(x)
        })], WA.noop), _ && D.on("progress", ICA(D, sx(d, fU(rx(_), !1, 3))))
      }
      let F1 = void 0;
      if (B.auth) {
        let u1 = B.auth.username || "",
          d1 = B.auth.password || "";
        F1 = u1 + ":" + d1
      }
      if (!F1 && R.username) {
        let {
          username: u1,
          password: d1
        } = R;
        F1 = u1 + ":" + d1
      }
      F1 && L.delete("authorization");
      let X1;
      try {
        X1 = nP(R.pathname + R.search, B.params, B.paramsSerializer).replace(/^\?/, "")
      } catch (u1) {
        let d1 = new Error(u1.message);
        return d1.config = B, d1.url = B.url, d1.exists = !0, G(d1)
      }
      L.set("Accept-Encoding", "gzip, compress, deflate" + (BCA ? ", br" : ""), !1);
      let v = {
        path: X1,
        method: X,
        headers: L.toJSON(),
        agents: {
          http: B.httpAgent,
          https: B.httpsAgent
        },
        auth: F1,
        protocol: T,
        family: W,
        beforeRedirect: Rw9,
        beforeRedirects: {}
      };
      if (!WA.isUndefined(Y) && (v.lookup = Y), B.socketPath) v.socketPath = B.socketPath;
      else v.hostname = R.hostname.startsWith("[") ? R.hostname.slice(1, -1) : R.hostname, v.port = R.port, YCA(v, B.proxy, T + "//" + R.hostname + (R.port ? ":" + R.port : "") + v.path);
      let D1, N1 = Lw9.test(v.protocol);
      if (v.agent = N1 ? B.httpsAgent : B.httpAgent, B.transport) D1 = B.transport;
      else if (B.maxRedirects === 0) D1 = N1 ? Ew9 : ww9;
      else {
        if (B.maxRedirects) v.maxRedirects = B.maxRedirects;
        if (B.beforeRedirect) v.beforeRedirects.config = B.beforeRedirect;
        D1 = N1 ? Mw9 : qw9
      }
      if (B.maxBodyLength > -1) v.maxBodyLength = B.maxBodyLength;
      else v.maxBodyLength = 1 / 0;
      if (B.insecureHTTPParser) v.insecureHTTPParser = B.insecureHTTPParser;
      if (K = D1.request(v, function u1(d1) {
          if (K.destroyed) return;
          let YA = [d1],
            bA = +d1.headers["content-length"];
          if (k || s) {
            let L1 = new yM1({
              maxRate: WA.toFiniteNumber(s)
            });
            k && L1.on("progress", ICA(L1, sx(bA, fU(rx(k), !0, 3)))), YA.push(L1)
          }
          let e1 = d1,
            k1 = d1.req || K;
          if (B.decompress !== !1 && d1.headers["content-encoding"]) {
            if (X === "HEAD" || d1.statusCode === 204) delete d1.headers["content-encoding"];
            switch ((d1.headers["content-encoding"] || "").toLowerCase()) {
              case "gzip":
              case "x-gzip":
              case "compress":
              case "x-compress":
                YA.push(XM.createUnzip(ACA)), delete d1.headers["content-encoding"];
                break;
              case "deflate":
                YA.push(new rVA), YA.push(XM.createUnzip(ACA)), delete d1.headers["content-encoding"];
                break;
              case "br":
                if (BCA) YA.push(XM.createBrotliDecompress($w9)), delete d1.headers["content-encoding"]
            }
          }
          e1 = YA.length > 1 ? ox.pipeline(YA, WA.noop) : YA[0];
          let Q1 = ox.finished(e1, () => {
              Q1(), N()
            }),
            v1 = {
              status: d1.statusCode,
              statusText: d1.statusMessage,
              headers: new w3(d1.headers),
              config: B,
              request: k1
            };
          if (J === "stream") v1.data = e1, Gz(I, G, v1);
          else {
            let L1 = [],
              BA = 0;
            e1.on("data", function HA(MA) {
              if (L1.push(MA), BA += MA.length, B.maxContentLength > -1 && BA > B.maxContentLength) C = !0, e1.destroy(), G(new F2("maxContentLength size of " + B.maxContentLength + " exceeded", F2.ERR_BAD_RESPONSE, B, k1))
            }), e1.on("aborted", function HA() {
              if (C) return;
              let MA = new F2("stream has been aborted", F2.ERR_BAD_RESPONSE, B, k1);
              e1.destroy(MA), G(MA)
            }), e1.on("error", function HA(MA) {
              if (K.destroyed) return;
              G(F2.from(MA, null, B, k1))
            }), e1.on("end", function HA() {
              try {
                let MA = L1.length === 1 ? L1[0] : Buffer.concat(L1);
                if (J !== "arraybuffer") {
                  if (MA = MA.toString(F), !F || F === "utf8") MA = WA.stripBOM(MA)
                }
                v1.data = MA
              } catch (MA) {
                return G(F2.from(MA, null, B, v1.request, v1))
              }
              Gz(I, G, v1)
            })
          }
          E.once("abort", (L1) => {
            if (!e1.destroyed) e1.emit("error", L1), e1.destroy()
          })
        }), E.once("abort", (u1) => {
          G(u1), K.destroy(u1)
        }), K.on("error", function u1(d1) {
          G(F2.from(d1, null, B, K))
        }), K.on("socket", function u1(d1) {
          d1.setKeepAlive(!0, 60000)
        }), B.timeout) {
        let u1 = parseInt(B.timeout, 10);
        if (Number.isNaN(u1)) {
          G(new F2("error trying to parse `config.timeout` to int", F2.ERR_BAD_OPTION_VALUE, B, K));
          return
        }
        K.setTimeout(u1, function d1() {
          if (V) return;
          let YA = B.timeout ? "timeout of " + B.timeout + "ms exceeded" : "timeout exceeded",
            bA = B.transitional || px;
          if (B.timeoutErrorMessage) YA = B.timeoutErrorMessage;
          G(new F2(YA, bA.clarifyTimeoutError ? F2.ETIMEDOUT : F2.ECONNABORTED, B, K)), q()
        })
      }
      if (WA.isStream(D)) {
        let u1 = !1,
          d1 = !1;
        D.on("end", () => {
          u1 = !0
        }), D.once("error", (YA) => {
          d1 = !0, K.destroy(YA)
        }), D.on("close", () => {
          if (!u1 && !d1) q(new GJ("Request stream has been aborted", B, K))
        }), D.pipe(K)
      } else K.end(D)
    })
  }
// @from(Start 8386427, End 8386688)
JCA = q5.hasStandardBrowserEnv ? ((A, B) => (Q) => {
  return Q = new URL(Q, q5.origin), A.protocol === Q.protocol && A.host === Q.host && (B || A.port === Q.port)
})(new URL(q5.origin), q5.navigator && /(msie|trident)/i.test(q5.navigator.userAgent)) : () => !0
// @from(Start 8386694, End 8387293)
FCA = q5.hasStandardBrowserEnv ? {
  write(A, B, Q, I, G, Z) {
    let D = [A + "=" + encodeURIComponent(B)];
    WA.isNumber(Q) && D.push("expires=" + new Date(Q).toGMTString()), WA.isString(I) && D.push("path=" + I), WA.isString(G) && D.push("domain=" + G), Z === !0 && D.push("secure"), document.cookie = D.join("; ")
  },
  read(A) {
    let B = document.cookie.match(new RegExp("(^|;\\s*)(" + A + ")=([^;]*)"));
    return B ? decodeURIComponent(B[3]) : null
  },
  remove(A) {
    this.write(A, "", Date.now() - 86400000)
  }
} : {
  write() {},
  read() {
    return null
  },
  remove() {}
}
// @from(Start 8387299, End 8387344)
XCA = (A) => A instanceof w3 ? {
  ...A
} : A
// @from(Start 8387347, End 8388929)
function IC(A, B) {
  B = B || {};
  let Q = {};

  function I(J, F, X, V) {
    if (WA.isPlainObject(J) && WA.isPlainObject(F)) return WA.merge.call({
      caseless: V
    }, J, F);
    else if (WA.isPlainObject(F)) return WA.merge({}, F);
    else if (WA.isArray(F)) return F.slice();
    return F
  }

  function G(J, F, X, V) {
    if (!WA.isUndefined(F)) return I(J, F, X, V);
    else if (!WA.isUndefined(J)) return I(void 0, J, X, V)
  }

  function Z(J, F) {
    if (!WA.isUndefined(F)) return I(void 0, F)
  }

  function D(J, F) {
    if (!WA.isUndefined(F)) return I(void 0, F);
    else if (!WA.isUndefined(J)) return I(void 0, J)
  }

  function Y(J, F, X) {
    if (X in B) return I(J, F);
    else if (X in A) return I(void 0, J)
  }
  let W = {
    url: Z,
    method: Z,
    data: Z,
    baseURL: D,
    transformRequest: D,
    transformResponse: D,
    paramsSerializer: D,
    timeout: D,
    timeoutMessage: D,
    withCredentials: D,
    withXSRFToken: D,
    adapter: D,
    responseType: D,
    xsrfCookieName: D,
    xsrfHeaderName: D,
    onUploadProgress: D,
    onDownloadProgress: D,
    decompress: D,
    maxContentLength: D,
    maxBodyLength: D,
    beforeRedirect: D,
    transport: D,
    httpAgent: D,
    httpsAgent: D,
    cancelToken: D,
    socketPath: D,
    responseEncoding: D,
    validateStatus: Y,
    headers: (J, F, X) => G(XCA(J), XCA(F), X, !0)
  };
  return WA.forEach(Object.keys(Object.assign({}, A, B)), function J(F) {
    let X = W[F] || G,
      V = X(A[F], B[F], F);
    WA.isUndefined(V) && X !== Y || (Q[F] = V)
  }), Q
}
// @from(Start 8388934, End 8389896)
R61 = (A) => {
  let B = IC({}, A),
    {
      data: Q,
      withXSRFToken: I,
      xsrfHeaderName: G,
      xsrfCookieName: Z,
      headers: D,
      auth: Y
    } = B;
  if (B.headers = D = w3.from(D), B.url = nP(aP(B.baseURL, B.url, B.allowAbsoluteUrls), A.params, A.paramsSerializer), Y) D.set("Authorization", "Basic " + btoa((Y.username || "") + ":" + (Y.password ? unescape(encodeURIComponent(Y.password)) : "")));
  let W;
  if (WA.isFormData(Q)) {
    if (q5.hasStandardBrowserEnv || q5.hasStandardBrowserWebWorkerEnv) D.setContentType(void 0);
    else if ((W = D.getContentType()) !== !1) {
      let [J, ...F] = W ? W.split(";").map((X) => X.trim()).filter(Boolean) : [];
      D.setContentType([J || "multipart/form-data", ...F].join("; "))
    }
  }
  if (q5.hasStandardBrowserEnv) {
    if (I && WA.isFunction(I) && (I = I(B)), I || I !== !1 && JCA(B.url)) {
      let J = G && Z && FCA.read(Z);
      if (J) D.set(G, J)
    }
  }
  return B
}
// @from(Start 8389902, End 8389945)
Sw9 = typeof XMLHttpRequest !== "undefined"
// @from(Start 8389949, End 8392866)
VCA = Sw9 && function(A) {
    return new Promise(function B(Q, I) {
      let G = R61(A),
        Z = G.data,
        D = w3.from(G.headers).normalize(),
        {
          responseType: Y,
          onUploadProgress: W,
          onDownloadProgress: J
        } = G,
        F, X, V, C, K;

      function E() {
        C && C(), K && K(), G.cancelToken && G.cancelToken.unsubscribe(F), G.signal && G.signal.removeEventListener("abort", F)
      }
      let N = new XMLHttpRequest;
      N.open(G.method.toUpperCase(), G.url, !0), N.timeout = G.timeout;

      function q() {
        if (!N) return;
        let R = w3.from("getAllResponseHeaders" in N && N.getAllResponseHeaders()),
          L = {
            data: !Y || Y === "text" || Y === "json" ? N.responseText : N.response,
            status: N.status,
            statusText: N.statusText,
            headers: R,
            config: A,
            request: N
          };
        Gz(function _(k) {
          Q(k), E()
        }, function _(k) {
          I(k), E()
        }, L), N = null
      }
      if ("onloadend" in N) N.onloadend = q;
      else N.onreadystatechange = function R() {
        if (!N || N.readyState !== 4) return;
        if (N.status === 0 && !(N.responseURL && N.responseURL.indexOf("file:") === 0)) return;
        setTimeout(q)
      };
      if (N.onabort = function R() {
          if (!N) return;
          I(new F2("Request aborted", F2.ECONNABORTED, A, N)), N = null
        }, N.onerror = function R() {
          I(new F2("Network Error", F2.ERR_NETWORK, A, N)), N = null
        }, N.ontimeout = function R() {
          let T = G.timeout ? "timeout of " + G.timeout + "ms exceeded" : "timeout exceeded",
            L = G.transitional || px;
          if (G.timeoutErrorMessage) T = G.timeoutErrorMessage;
          I(new F2(T, L.clarifyTimeoutError ? F2.ETIMEDOUT : F2.ECONNABORTED, A, N)), N = null
        }, Z === void 0 && D.setContentType(null), "setRequestHeader" in N) WA.forEach(D.toJSON(), function R(T, L) {
        N.setRequestHeader(L, T)
      });
      if (!WA.isUndefined(G.withCredentials)) N.withCredentials = !!G.withCredentials;
      if (Y && Y !== "json") N.responseType = G.responseType;
      if (J)[V, K] = fU(J, !0), N.addEventListener("progress", V);
      if (W && N.upload)[X, C] = fU(W), N.upload.addEventListener("progress", X), N.upload.addEventListener("loadend", C);
      if (G.cancelToken || G.signal) {
        if (F = (R) => {
            if (!N) return;
            I(!R || R.type ? new GJ(null, A, N) : R), N.abort(), N = null
          }, G.cancelToken && G.cancelToken.subscribe(F), G.signal) G.signal.aborted ? F() : G.signal.addEventListener("abort", F)
      }
      let O = fl(G.url);
      if (O && q5.protocols.indexOf(O) === -1) {
        I(new F2("Unsupported protocol " + O + ":", F2.ERR_BAD_REQUEST, A));
        return
      }
      N.send(Z || null)
    })
  }
// @from(Start 8392872, End 8393736)
_w9 = (A, B) => {
    let {
      length: Q
    } = A = A ? A.filter(Boolean) : [];
    if (B || Q) {
      let I = new AbortController,
        G, Z = function(J) {
          if (!G) {
            G = !0, Y();
            let F = J instanceof Error ? J : this.reason;
            I.abort(F instanceof F2 ? F : new GJ(F instanceof Error ? F.message : F))
          }
        },
        D = B && setTimeout(() => {
          D = null, Z(new F2(`timeout ${B} of ms exceeded`, F2.ETIMEDOUT))
        }, B),
        Y = () => {
          if (A) D && clearTimeout(D), D = null, A.forEach((J) => {
            J.unsubscribe ? J.unsubscribe(Z) : J.removeEventListener("abort", Z)
          }), A = null
        };
      A.forEach((J) => J.addEventListener("abort", Z));
      let {
        signal: W
      } = I;
      return W.unsubscribe = () => WA.asap(Y), W
    }
  }
// @from(Start 8393740, End 8393749)
CCA = _w9
// @from(Start 8393755, End 8393945)
jw9 = function*(A, B) {
    let Q = A.byteLength;
    if (!B || Q < B) {
      yield A;
      return
    }
    let I = 0,
      G;
    while (I < Q) G = I + B, yield A.slice(I, G), I = G
  }
// @from(Start 8393949, End 8394031)
yw9 = async function*(A, B) {
    for await (let Q of kw9(A)) yield* jw9(Q, B)
  }
// @from(Start 8394033, End 8394358)
kw9 = async function*(A) {
    if (A[Symbol.asyncIterator]) {
      yield* A;
      return
    }
    let B = A.getReader();
    try {
      for (;;) {
        let {
          done: Q,
          value: I
        } = await B.read();
        if (Q) break;
        yield I
      }
    } finally {
      await B.cancel()
    }
  }
// @from(Start 8394360, End 8395031)
kM1 = (A, B, Q, I) => {
    let G = yw9(A, B),
      Z = 0,
      D, Y = (W) => {
        if (!D) D = !0, I && I(W)
      };
    return new ReadableStream({
      async pull(W) {
        try {
          let {
            done: J,
            value: F
          } = await G.next();
          if (J) {
            Y(), W.close();
            return
          }
          let X = F.byteLength;
          if (Q) {
            let V = Z += X;
            Q(V)
          }
          W.enqueue(new Uint8Array(F))
        } catch (J) {
          throw Y(J), J
        }
      },
      cancel(W) {
        return Y(W), G.return()
      }
    }, {
      highWaterMark: 2
    })
  }
// @from(Start 8395037, End 8395137)
T61 = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function"
// @from(Start 8395141, End 8395190)
HCA = T61 && typeof ReadableStream === "function"
// @from(Start 8395194, End 8395356)
xw9 = T61 && (typeof TextEncoder === "function" ? ((A) => (B) => A.encode(B))(new TextEncoder) : async (A) => new Uint8Array(await new Response(A).arrayBuffer()))
// @from(Start 8395360, End 8395457)
zCA = (A, ...B) => {
    try {
      return !!A(...B)
    } catch (Q) {
      return !1
    }
  }
// @from(Start 8395461, End 8395721)
fw9 = HCA && zCA(() => {
    let A = !1,
      B = new Request(q5.origin, {
        body: new ReadableStream,
        method: "POST",
        get duplex() {
          return A = !0, "half"
        }
      }).headers.has("Content-Type");
    return A && !B
  })
// @from(Start 8395725, End 8395736)
KCA = 65536
// @from(Start 8395740, End 8395806)
xM1 = HCA && zCA(() => WA.isReadableStream(new Response("").body))
// @from(Start 8395810, End 8395856)
O61 = {
    stream: xM1 && ((A) => A.body)
  }
// @from(Start 8396140, End 8396533)
vw9 = async (A) => {
  if (A == null) return 0;
  if (WA.isBlob(A)) return A.size;
  if (WA.isSpecCompliantForm(A)) return (await new Request(q5.origin, {
    method: "POST",
    body: A
  }).arrayBuffer()).byteLength;
  if (WA.isArrayBufferView(A) || WA.isArrayBuffer(A)) return A.byteLength;
  if (WA.isURLSearchParams(A)) A = A + "";
  if (WA.isString(A)) return (await xw9(A)).byteLength
}
// @from(Start 8396535, End 8396643)
bw9 = async (A, B) => {
  let Q = WA.toFiniteNumber(A.getContentLength());
  return Q == null ? vw9(B) : Q
}
// @from(Start 8396645, End 8398816)
wCA = T61 && (async (A) => {
  let {
    url: B,
    method: Q,
    data: I,
    signal: G,
    cancelToken: Z,
    timeout: D,
    onDownloadProgress: Y,
    onUploadProgress: W,
    responseType: J,
    headers: F,
    withCredentials: X = "same-origin",
    fetchOptions: V
  } = R61(A);
  J = J ? (J + "").toLowerCase() : "text";
  let C = CCA([G, Z && Z.toAbortSignal()], D),
    K, E = C && C.unsubscribe && (() => {
      C.unsubscribe()
    }),
    N;
  try {
    if (W && fw9 && Q !== "get" && Q !== "head" && (N = await bw9(F, I)) !== 0) {
      let L = new Request(B, {
          method: "POST",
          body: I,
          duplex: "half"
        }),
        _;
      if (WA.isFormData(I) && (_ = L.headers.get("content-type"))) F.setContentType(_);
      if (L.body) {
        let [k, i] = sx(N, fU(rx(W)));
        I = kM1(L.body, KCA, k, i)
      }
    }
    if (!WA.isString(X)) X = X ? "include" : "omit";
    let q = "credentials" in Request.prototype;
    K = new Request(B, {
      ...V,
      signal: C,
      method: Q.toUpperCase(),
      headers: F.normalize().toJSON(),
      body: I,
      duplex: "half",
      credentials: q ? X : void 0
    });
    let O = await fetch(K),
      R = xM1 && (J === "stream" || J === "response");
    if (xM1 && (Y || R && E)) {
      let L = {};
      ["status", "statusText", "headers"].forEach((x) => {
        L[x] = O[x]
      });
      let _ = WA.toFiniteNumber(O.headers.get("content-length")),
        [k, i] = Y && sx(_, fU(rx(Y), !0)) || [];
      O = new Response(kM1(O.body, KCA, k, () => {
        i && i(), E && E()
      }), L)
    }
    J = J || "text";
    let T = await O61[WA.findKey(O61, J) || "text"](O, A);
    return !R && E && E(), await new Promise((L, _) => {
      Gz(L, _, {
        data: T,
        headers: w3.from(O.headers),
        status: O.status,
        statusText: O.statusText,
        config: A,
        request: K
      })
    })
  } catch (q) {
    if (E && E(), q && q.name === "TypeError" && /fetch/i.test(q.message)) throw Object.assign(new F2("Network Error", F2.ERR_NETWORK, A, K), {
      cause: q.cause || q
    });
    throw F2.from(q, q && q.code, A, K)
  }
})
// @from(Start 8398822, End 8398869)
fM1 = {
  http: WCA,
  xhr: VCA,
  fetch: wCA
}
// @from(Start 8399086, End 8399107)
ECA = (A) => `- ${A}`
// @from(Start 8399111, End 8399166)
gw9 = (A) => WA.isFunction(A) || A === null || A === !1
// @from(Start 8399170, End 8400006)
P61 = {
    getAdapter: (A) => {
      A = WA.isArray(A) ? A : [A];
      let {
        length: B
      } = A, Q, I, G = {};
      for (let Z = 0; Z < B; Z++) {
        Q = A[Z];
        let D;
        if (I = Q, !gw9(Q)) {
          if (I = fM1[(D = String(Q)).toLowerCase()], I === void 0) throw new F2(`Unknown adapter '${D}'`)
        }
        if (I) break;
        G[D || "#" + Z] = I
      }
      if (!I) {
        let Z = Object.entries(G).map(([Y, W]) => `adapter ${Y} ` + (W === !1 ? "is not supported by the environment" : "is not available in the build")),
          D = B ? Z.length > 1 ? `since :
` + Z.map(ECA).join(`
`) : " " + ECA(Z[0]) : "as no adapter specified";
        throw new F2("There is no suitable adapter to dispatch the request " + D, "ERR_NOT_SUPPORT")
      }
      return I
    },
    adapters: fM1
  }
// @from(Start 8400009, End 8400141)
function vM1(A) {
  if (A.cancelToken) A.cancelToken.throwIfRequested();
  if (A.signal && A.signal.aborted) throw new GJ(null, A)
}
// @from(Start 8400143, End 8400764)
function S61(A) {
  if (vM1(A), A.headers = w3.from(A.headers), A.data = Tl.call(A, A.transformRequest), ["post", "put", "patch"].indexOf(A.method) !== -1) A.headers.setContentType("application/x-www-form-urlencoded", !1);
  return P61.getAdapter(A.adapter || cx.adapter)(A).then(function Q(I) {
    return vM1(A), I.data = Tl.call(A, A.transformResponse, I), I.headers = w3.from(I.headers), I
  }, function Q(I) {
    if (!Pl(I)) {
      if (vM1(A), I && I.response) I.response.data = Tl.call(A, A.transformResponse, I.response), I.response.headers = w3.from(I.response.headers)
    }
    return Promise.reject(I)
  })
}
// @from(Start 8400769, End 8400777)
_61 = {}
// @from(Start 8400962, End 8400970)
UCA = {}
// @from(Start 8401556, End 8402039)
function hw9(A, B, Q) {
  if (typeof A !== "object") throw new F2("options must be an object", F2.ERR_BAD_OPTION_VALUE);
  let I = Object.keys(A),
    G = I.length;
  while (G-- > 0) {
    let Z = I[G],
      D = B[Z];
    if (D) {
      let Y = A[Z],
        W = Y === void 0 || D(Y, Z, A);
      if (W !== !0) throw new F2("option " + Z + " must be " + W, F2.ERR_BAD_OPTION_VALUE);
      continue
    }
    if (Q !== !0) throw new F2("Unknown option " + Z, F2.ERR_BAD_OPTION)
  }
}
// @from(Start 8402044, End 8402092)
bl = {
  assertOptions: hw9,
  validators: _61
}
// @from(Start 8402098, End 8402116)
Zz = bl.validators
// @from(Start 8402118, End 8405082)
class gl {
  constructor(A) {
    this.defaults = A, this.interceptors = {
      request: new ZM1,
      response: new ZM1
    }
  }
  async request(A, B) {
    try {
      return await this._request(A, B)
    } catch (Q) {
      if (Q instanceof Error) {
        let I = {};
        Error.captureStackTrace ? Error.captureStackTrace(I) : I = new Error;
        let G = I.stack ? I.stack.replace(/^.+\n/, "") : "";
        try {
          if (!Q.stack) Q.stack = G;
          else if (G && !String(Q.stack).endsWith(G.replace(/^.+\n.+\n/, ""))) Q.stack += `
` + G
        } catch (Z) {}
      }
      throw Q
    }
  }
  _request(A, B) {
    if (typeof A === "string") B = B || {}, B.url = A;
    else B = A || {};
    B = IC(this.defaults, B);
    let {
      transitional: Q,
      paramsSerializer: I,
      headers: G
    } = B;
    if (Q !== void 0) bl.assertOptions(Q, {
      silentJSONParsing: Zz.transitional(Zz.boolean),
      forcedJSONParsing: Zz.transitional(Zz.boolean),
      clarifyTimeoutError: Zz.transitional(Zz.boolean)
    }, !1);
    if (I != null)
      if (WA.isFunction(I)) B.paramsSerializer = {
        serialize: I
      };
      else bl.assertOptions(I, {
        encode: Zz.function,
        serialize: Zz.function
      }, !0);
    if (B.allowAbsoluteUrls !== void 0);
    else if (this.defaults.allowAbsoluteUrls !== void 0) B.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    else B.allowAbsoluteUrls = !0;
    bl.assertOptions(B, {
      baseUrl: Zz.spelling("baseURL"),
      withXsrfToken: Zz.spelling("withXSRFToken")
    }, !0), B.method = (B.method || this.defaults.method || "get").toLowerCase();
    let Z = G && WA.merge(G.common, G[B.method]);
    G && WA.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (C) => {
      delete G[C]
    }), B.headers = w3.concat(Z, G);
    let D = [],
      Y = !0;
    this.interceptors.request.forEach(function C(K) {
      if (typeof K.runWhen === "function" && K.runWhen(B) === !1) return;
      Y = Y && K.synchronous, D.unshift(K.fulfilled, K.rejected)
    });
    let W = [];
    this.interceptors.response.forEach(function C(K) {
      W.push(K.fulfilled, K.rejected)
    });
    let J, F = 0,
      X;
    if (!Y) {
      let C = [S61.bind(this), void 0];
      C.unshift.apply(C, D), C.push.apply(C, W), X = C.length, J = Promise.resolve(B);
      while (F < X) J = J.then(C[F++], C[F++]);
      return J
    }
    X = D.length;
    let V = B;
    F = 0;
    while (F < X) {
      let C = D[F++],
        K = D[F++];
      try {
        V = C(V)
      } catch (E) {
        K.call(this, E);
        break
      }
    }
    try {
      J = S61.call(this, V)
    } catch (C) {
      return Promise.reject(C)
    }
    F = 0, X = W.length;
    while (F < X) J = J.then(W[F++], W[F++]);
    return J
  }
  getUri(A) {
    A = IC(this.defaults, A);
    let B = aP(A.baseURL, A.url, A.allowAbsoluteUrls);
    return nP(B, A.params, A.paramsSerializer)
  }
}
// @from(Start 8405665, End 8405672)
hl = gl
// @from(Start 8405674, End 8407069)
class bM1 {
  constructor(A) {
    if (typeof A !== "function") throw new TypeError("executor must be a function.");
    let B;
    this.promise = new Promise(function I(G) {
      B = G
    });
    let Q = this;
    this.promise.then((I) => {
      if (!Q._listeners) return;
      let G = Q._listeners.length;
      while (G-- > 0) Q._listeners[G](I);
      Q._listeners = null
    }), this.promise.then = (I) => {
      let G, Z = new Promise((D) => {
        Q.subscribe(D), G = D
      }).then(I);
      return Z.cancel = function D() {
        Q.unsubscribe(G)
      }, Z
    }, A(function I(G, Z, D) {
      if (Q.reason) return;
      Q.reason = new GJ(G, Z, D), B(Q.reason)
    })
  }
  throwIfRequested() {
    if (this.reason) throw this.reason
  }
  subscribe(A) {
    if (this.reason) {
      A(this.reason);
      return
    }
    if (this._listeners) this._listeners.push(A);
    else this._listeners = [A]
  }
  unsubscribe(A) {
    if (!this._listeners) return;
    let B = this._listeners.indexOf(A);
    if (B !== -1) this._listeners.splice(B, 1)
  }
  toAbortSignal() {
    let A = new AbortController,
      B = (Q) => {
        A.abort(Q)
      };
    return this.subscribe(B), A.signal.unsubscribe = () => this.unsubscribe(B), A.signal
  }
  static source() {
    let A;
    return {
      token: new bM1(function Q(I) {
        A = I
      }),
      cancel: A
    }
  }
}
// @from(Start 8407074, End 8407083)
NCA = bM1
// @from(Start 8407086, End 8407162)
function gM1(A) {
  return function B(Q) {
    return A.apply(null, Q)
  }
}
// @from(Start 8407164, End 8407232)
function hM1(A) {
  return WA.isObject(A) && A.isAxiosError === !0
}
// @from(Start 8407237, End 8408690)
mM1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
}
// @from(Start 8408755, End 8408764)
$CA = mM1
// @from(Start 8408767, End 8409018)
function qCA(A) {
  let B = new hl(A),
    Q = El(hl.prototype.request, B);
  return WA.extend(Q, hl.prototype, B, {
    allOwnKeys: !0
  }), WA.extend(Q, B, null, {
    allOwnKeys: !0
  }), Q.create = function I(G) {
    return qCA(IC(A, G))
  }, Q
}
// @from(Start 8409023, End 8409035)
I7 = qCA(cx)
// @from(Start 8409483, End 8409490)
P4 = I7
// @from(Start 8409496, End 8409514)
qG1 = I1(IzA(), 1)
// @from(Start 8409566, End 8409691)
rN9 = {
    visibilityState: "visible",
    documentElement: {
      lang: "en"
    },
    addEventListener: (A, B) => {}
  }
// @from(Start 8409695, End 8410048)
oN9 = {
    document: rN9,
    location: {
      href: "node://localhost",
      pathname: "/"
    },
    addEventListener: (A, B) => {
      if (A === "beforeunload") process.on("exit", () => {
        if (typeof B === "function") B({});
        else B.handleEvent({})
      })
    },
    focus: () => {},
    innerHeight: 768,
    innerWidth: 1024
  }
// @from(Start 8410052, End 8410232)
tN9 = {
    sendBeacon: (A, B) => {
      return !0
    },
    userAgent: "Mozilla/5.0 (Node.js) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0",
    language: "en-US"
  }
// @from(Start 8410533, End 8410584)
function Cf() {
  return sl.join(S4(), "statsig")
}
// @from(Start 8410585, End 8411638)
class LL1 {
  cache = new Map;
  ready = !1;
  constructor() {
    try {
      if (!GzA(Cf())) eN9(Cf(), {
        recursive: !0
      });
      let A = A$9(Cf());
      for (let B of A) {
        let Q = decodeURIComponent(B),
          I = B$9(sl.join(Cf(), B), "utf8");
        this.cache.set(Q, I)
      }
      this.ready = !0
    } catch (A) {
      b1(A), this.ready = !0
    }
  }
  isReady() {
    return this.ready
  }
  isReadyResolver() {
    return this.ready ? Promise.resolve() : null
  }
  getProviderName() {
    return "FileSystemStorageProvider"
  }
  getItem(A) {
    return this.cache.get(A) ?? null
  }
  setItem(A, B) {
    this.cache.set(A, B);
    try {
      let Q = encodeURIComponent(A);
      Q$9(sl.join(Cf(), Q), B, "utf8")
    } catch (Q) {
      b1(Q)
    }
  }
  removeItem(A) {
    this.cache.delete(A);
    let B = encodeURIComponent(A),
      Q = sl.join(Cf(), B);
    if (!GzA(Q)) return;
    try {
      I$9(Q)
    } catch (I) {
      b1(I)
    }
  }
  getAllKeys() {
    return Array.from(this.cache.keys())
  }
}
// @from(Start 8411643, End 8411671)
ZzA = "claude-code-20250219"
// @from(Start 8411675, End 8411714)
W51 = "interleaved-thinking-2025-05-14"
// @from(Start 8411718, End 8411764)
DzA = "fine-grained-tool-streaming-2025-05-14"
// @from(Start 8411770, End 8411792)
YzA = "user:inference"
// @from(Start 8411798, End 8411821)
Kf = "oauth-2025-04-20"
// @from(Start 8411825, End 8411931)
WzA = {
    REDIRECT_PORT: 54545,
    SCOPES: ["org:create_api_key", "user:profile", "user:inference"]
  }
// @from(Start 8411935, End 8412709)
G$9 = {
    ...WzA,
    BASE_API_URL: "https://api.anthropic.com",
    CONSOLE_AUTHORIZE_URL: "https://console.anthropic.com/oauth/authorize",
    CLAUDE_AI_AUTHORIZE_URL: "https://claude.ai/oauth/authorize",
    TOKEN_URL: "https://console.anthropic.com/v1/oauth/token",
    API_KEY_URL: "https://api.anthropic.com/api/oauth/claude_cli/create_api_key",
    ROLES_URL: "https://api.anthropic.com/api/oauth/claude_cli/roles",
    CONSOLE_SUCCESS_URL: "https://console.anthropic.com/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code",
    CLAUDEAI_SUCCESS_URL: "https://console.anthropic.com/oauth/code/success?app=claude-code",
    MANUAL_REDIRECT_URL: "https://console.anthropic.com/oauth/code/callback",
    CLIENT_ID: "9d1c250a-e61b-44d9-88ed-5944d1962f5e"
  }
// @from(Start 8412715, End 8413427)
Z$9 = {
  ...WzA,
  BASE_API_URL: "http://localhost:3000",
  CONSOLE_AUTHORIZE_URL: "http://localhost:3000/oauth/authorize",
  CLAUDE_AI_AUTHORIZE_URL: "http://localhost:4000/oauth/authorize",
  TOKEN_URL: "http://localhost:3000/v1/oauth/token",
  API_KEY_URL: "http://localhost:3000/api/oauth/claude_cli/create_api_key",
  ROLES_URL: "http://localhost:3000/api/oauth/claude_cli/roles",
  CONSOLE_SUCCESS_URL: "http://localhost:3000/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code",
  CLAUDEAI_SUCCESS_URL: "http://localhost:3000/oauth/code/success?app=claude-code",
  MANUAL_REDIRECT_URL: "https://console.staging.ant.dev/oauth/code/callback",
  CLIENT_ID: "22422756-60c9-4084-8eb7-27705fd5cf9a"
}
// @from(Start 8413430, End 8413512)
function BB() {
  return process.env.USE_LOCAL_OAUTH === "1" && Z$9 || !1 || G$9
}
// @from(Start 8413514, End 8413651)
function MQ() {
  return process.env.CLAUDE_CODE_USE_BEDROCK ? "bedrock" : process.env.CLAUDE_CODE_USE_VERTEX ? "vertex" : "firstParty"
}
// @from(Start 8413653, End 8413684)
function Wz() {
  return MQ()
}
// @from(Start 8415101, End 8415375)
function TL1(A, {
  suffix: B = "nodejs"
} = {}) {
  if (typeof A !== "string") throw new TypeError(`Expected a string, got ${typeof A}`);
  if (B) A += `-${B}`;
  if (RL1.platform === "darwin") return D$9(A);
  if (RL1.platform === "win32") return Y$9(A);
  return W$9(A)
}
// @from(Start 8415380, End 8415398)
_zA = I1(qzA(), 1)
// @from(Start 8415404, End 8415555)
ol = (A) => {
  if (typeof A !== "string") throw new TypeError("invalid pattern");
  if (A.length > 65536) throw new TypeError("pattern is too long")
}
// @from(Start 8415561, End 8416116)
z$9 = {
    "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
    "[:alpha:]": ["\\p{L}\\p{Nl}", !0],
    "[:ascii:]": ["\\x00-\\x7f", !1],
    "[:blank:]": ["\\p{Zs}\\t", !0],
    "[:cntrl:]": ["\\p{Cc}", !0],
    "[:digit:]": ["\\p{Nd}", !0],
    "[:graph:]": ["\\p{Z}\\p{C}", !0, !0],
    "[:lower:]": ["\\p{Ll}", !0],
    "[:print:]": ["\\p{C}", !0],
    "[:punct:]": ["\\p{P}", !0],
    "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
    "[:upper:]": ["\\p{Lu}", !0],
    "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
    "[:xdigit:]": ["A-Fa-f0-9", !1]
  }
// @from(Start 8416120, End 8416162)
tl = (A) => A.replace(/[[\]\\-]/g, "\\$&")
// @from(Start 8416166, End 8416224)
w$9 = (A) => A.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
// @from(Start 8416228, End 8416251)
MzA = (A) => A.join("")
// @from(Start 8416255, End 8418000)
LzA = (A, B) => {
    let Q = B;
    if (A.charAt(Q) !== "[") throw new Error("not in a brace expression");
    let I = [],
      G = [],
      Z = Q + 1,
      D = !1,
      Y = !1,
      W = !1,
      J = !1,
      F = Q,
      X = "";
    A: while (Z < A.length) {
      let E = A.charAt(Z);
      if ((E === "!" || E === "^") && Z === Q + 1) {
        J = !0, Z++;
        continue
      }
      if (E === "]" && D && !W) {
        F = Z + 1;
        break
      }
      if (D = !0, E === "\\") {
        if (!W) {
          W = !0, Z++;
          continue
        }
      }
      if (E === "[" && !W) {
        for (let [N, [q, O, R]] of Object.entries(z$9))
          if (A.startsWith(N, Z)) {
            if (X) return ["$.", !1, A.length - Q, !0];
            if (Z += N.length, R) G.push(q);
            else I.push(q);
            Y = Y || O;
            continue A
          }
      }
      if (W = !1, X) {
        if (E > X) I.push(tl(X) + "-" + tl(E));
        else if (E === X) I.push(tl(E));
        X = "", Z++;
        continue
      }
      if (A.startsWith("-]", Z + 1)) {
        I.push(tl(E + "-")), Z += 2;
        continue
      }
      if (A.startsWith("-", Z + 1)) {
        X = E, Z += 2;
        continue
      }
      I.push(tl(E)), Z++
    }
    if (F < Z) return ["", !1, 0, !1];
    if (!I.length && !G.length) return ["$.", !1, A.length - Q, !0];
    if (G.length === 0 && I.length === 1 && /^\\?.$/.test(I[0]) && !J) {
      let E = I[0].length === 2 ? I[0].slice(-1) : I[0];
      return [w$9(E), !1, F - Q, !1]
    }
    let V = "[" + (J ? "^" : "") + MzA(I) + "]",
      C = "[" + (J ? "" : "^") + MzA(G) + "]";
    return [I.length && G.length ? "(" + V + "|" + C + ")" : I.length ? V : C, Y, F - Q, !0]
  }
// @from(Start 8418006, End 8418186)
ZC = (A, {
  windowsPathsNoEscape: B = !1
} = {}) => {
  return B ? A.replace(/\[([^\/\\])\]/g, "$1") : A.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1")
}
// @from(Start 8418192, End 8418232)
E$9 = new Set(["!", "?", "+", "*", "@"])
// @from(Start 8418236, End 8418259)
RzA = (A) => E$9.has(A)
// @from(Start 8418263, End 8418296)
U$9 = "(?!(?:^|/)\\.\\.?(?:$|/))"
// @from(Start 8418300, End 8418315)
J51 = "(?!\\.)"
// @from(Start 8418319, End 8418344)
N$9 = new Set(["[", "."])
// @from(Start 8418348, End 8418374)
$$9 = new Set(["..", "."])
// @from(Start 8418378, End 8418410)
q$9 = new Set("().*{}+?[]^$\\!")
// @from(Start 8418414, End 8418472)
M$9 = (A) => A.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
// @from(Start 8418476, End 8418488)
_L1 = "[^/]"
// @from(Start 8418492, End 8418508)
OzA = _L1 + "*?"
// @from(Start 8418512, End 8418528)
TzA = _L1 + "+?"
// @from(Start 8418530, End 8426525)
class KG {
  type;
  #A;
  #B;
  #Q = !1;
  #I = [];
  #G;
  #W;
  #Z;
  #F = !1;
  #J;
  #X;
  #Y = !1;
  constructor(A, B, Q = {}) {
    if (this.type = A, A) this.#B = !0;
    if (this.#G = B, this.#A = this.#G ? this.#G.#A : this, this.#J = this.#A === this ? Q : this.#A.#J, this.#Z = this.#A === this ? [] : this.#A.#Z, A === "!" && !this.#A.#F) this.#Z.push(this);
    this.#W = this.#G ? this.#G.#I.length : 0
  }
  get hasMagic() {
    if (this.#B !== void 0) return this.#B;
    for (let A of this.#I) {
      if (typeof A === "string") continue;
      if (A.type || A.hasMagic) return this.#B = !0
    }
    return this.#B
  }
  toString() {
    if (this.#X !== void 0) return this.#X;
    if (!this.type) return this.#X = this.#I.map((A) => String(A)).join("");
    else return this.#X = this.type + "(" + this.#I.map((A) => String(A)).join("|") + ")"
  }
  #w() {
    if (this !== this.#A) throw new Error("should only call on root");
    if (this.#F) return this;
    this.toString(), this.#F = !0;
    let A;
    while (A = this.#Z.pop()) {
      if (A.type !== "!") continue;
      let B = A,
        Q = B.#G;
      while (Q) {
        for (let I = B.#W + 1; !Q.type && I < Q.#I.length; I++)
          for (let G of A.#I) {
            if (typeof G === "string") throw new Error("string part in extglob AST??");
            G.copyIn(Q.#I[I])
          }
        B = Q, Q = B.#G
      }
    }
    return this
  }
  push(...A) {
    for (let B of A) {
      if (B === "") continue;
      if (typeof B !== "string" && !(B instanceof KG && B.#G === this)) throw new Error("invalid part: " + B);
      this.#I.push(B)
    }
  }
  toJSON() {
    let A = this.type === null ? this.#I.slice().map((B) => typeof B === "string" ? B : B.toJSON()) : [this.type, ...this.#I.map((B) => B.toJSON())];
    if (this.isStart() && !this.type) A.unshift([]);
    if (this.isEnd() && (this === this.#A || this.#A.#F && this.#G?.type === "!")) A.push({});
    return A
  }
  isStart() {
    if (this.#A === this) return !0;
    if (!this.#G?.isStart()) return !1;
    if (this.#W === 0) return !0;
    let A = this.#G;
    for (let B = 0; B < this.#W; B++) {
      let Q = A.#I[B];
      if (!(Q instanceof KG && Q.type === "!")) return !1
    }
    return !0
  }
  isEnd() {
    if (this.#A === this) return !0;
    if (this.#G?.type === "!") return !0;
    if (!this.#G?.isEnd()) return !1;
    if (!this.type) return this.#G?.isEnd();
    let A = this.#G ? this.#G.#I.length : 0;
    return this.#W === A - 1
  }
  copyIn(A) {
    if (typeof A === "string") this.push(A);
    else this.push(A.clone(this))
  }
  clone(A) {
    let B = new KG(this.type, A);
    for (let Q of this.#I) B.copyIn(Q);
    return B
  }
  static #E(A, B, Q, I) {
    let G = !1,
      Z = !1,
      D = -1,
      Y = !1;
    if (B.type === null) {
      let V = Q,
        C = "";
      while (V < A.length) {
        let K = A.charAt(V++);
        if (G || K === "\\") {
          G = !G, C += K;
          continue
        }
        if (Z) {
          if (V === D + 1) {
            if (K === "^" || K === "!") Y = !0
          } else if (K === "]" && !(V === D + 2 && Y)) Z = !1;
          C += K;
          continue
        } else if (K === "[") {
          Z = !0, D = V, Y = !1, C += K;
          continue
        }
        if (!I.noext && RzA(K) && A.charAt(V) === "(") {
          B.push(C), C = "";
          let E = new KG(K, B);
          V = KG.#E(A, E, V, I), B.push(E);
          continue
        }
        C += K
      }
      return B.push(C), V
    }
    let W = Q + 1,
      J = new KG(null, B),
      F = [],
      X = "";
    while (W < A.length) {
      let V = A.charAt(W++);
      if (G || V === "\\") {
        G = !G, X += V;
        continue
      }
      if (Z) {
        if (W === D + 1) {
          if (V === "^" || V === "!") Y = !0
        } else if (V === "]" && !(W === D + 2 && Y)) Z = !1;
        X += V;
        continue
      } else if (V === "[") {
        Z = !0, D = W, Y = !1, X += V;
        continue
      }
      if (RzA(V) && A.charAt(W) === "(") {
        J.push(X), X = "";
        let C = new KG(V, J);
        J.push(C), W = KG.#E(A, C, W, I);
        continue
      }
      if (V === "|") {
        J.push(X), X = "", F.push(J), J = new KG(null, B);
        continue
      }
      if (V === ")") {
        if (X === "" && B.#I.length === 0) B.#Y = !0;
        return J.push(X), X = "", B.push(...F, J), W
      }
      X += V
    }
    return B.type = null, B.#B = void 0, B.#I = [A.substring(Q - 1)], W
  }
  static fromGlob(A, B = {}) {
    let Q = new KG(null, void 0, B);
    return KG.#E(A, Q, 0, B), Q
  }
  toMMPattern() {
    if (this !== this.#A) return this.#A.toMMPattern();
    let A = this.toString(),
      [B, Q, I, G] = this.toRegExpSource();
    if (!(I || this.#B || this.#J.nocase && !this.#J.nocaseMagicOnly && A.toUpperCase() !== A.toLowerCase())) return Q;
    let D = (this.#J.nocase ? "i" : "") + (G ? "u" : "");
    return Object.assign(new RegExp(`^${B}$`, D), {
      _src: B,
      _glob: A
    })
  }
  get options() {
    return this.#J
  }
  toRegExpSource(A) {
    let B = A ?? !!this.#J.dot;
    if (this.#A === this) this.#w();
    if (!this.type) {
      let Y = this.isStart() && this.isEnd(),
        W = this.#I.map((V) => {
          let [C, K, E, N] = typeof V === "string" ? KG.#C(V, this.#B, Y) : V.toRegExpSource(A);
          return this.#B = this.#B || E, this.#Q = this.#Q || N, C
        }).join(""),
        J = "";
      if (this.isStart()) {
        if (typeof this.#I[0] === "string") {
          if (!(this.#I.length === 1 && $$9.has(this.#I[0]))) {
            let C = N$9,
              K = B && C.has(W.charAt(0)) || W.startsWith("\\.") && C.has(W.charAt(2)) || W.startsWith("\\.\\.") && C.has(W.charAt(4)),
              E = !B && !A && C.has(W.charAt(0));
            J = K ? U$9 : E ? J51 : ""
          }
        }
      }
      let F = "";
      if (this.isEnd() && this.#A.#F && this.#G?.type === "!") F = "(?:$|\\/)";
      return [J + W + F, ZC(W), this.#B = !!this.#B, this.#Q]
    }
    let Q = this.type === "*" || this.type === "+",
      I = this.type === "!" ? "(?:(?!(?:" : "(?:",
      G = this.#K(B);
    if (this.isStart() && this.isEnd() && !G && this.type !== "!") {
      let Y = this.toString();
      return this.#I = [Y], this.type = null, this.#B = void 0, [Y, ZC(this.toString()), !1, !1]
    }
    let Z = !Q || A || B || !J51 ? "" : this.#K(!0);
    if (Z === G) Z = "";
    if (Z) G = `(?:${G})(?:${Z})*?`;
    let D = "";
    if (this.type === "!" && this.#Y) D = (this.isStart() && !B ? J51 : "") + TzA;
    else {
      let Y = this.type === "!" ? "))" + (this.isStart() && !B && !A ? J51 : "") + OzA + ")" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && Z ? ")" : this.type === "*" && Z ? ")?" : `)${this.type}`;
      D = I + G + Y
    }
    return [D, ZC(G), this.#B = !!this.#B, this.#Q]
  }
  #K(A) {
    return this.#I.map((B) => {
      if (typeof B === "string") throw new Error("string type in extglob ast??");
      let [Q, I, G, Z] = B.toRegExpSource(A);
      return this.#Q = this.#Q || Z, Q
    }).filter((B) => !(this.isStart() && this.isEnd()) || !!B).join("|")
  }
  static #C(A, B, Q = !1) {
    let I = !1,
      G = "",
      Z = !1;
    for (let D = 0; D < A.length; D++) {
      let Y = A.charAt(D);
      if (I) {
        I = !1, G += (q$9.has(Y) ? "\\" : "") + Y;
        continue
      }
      if (Y === "\\") {
        if (D === A.length - 1) G += "\\\\";
        else I = !0;
        continue
      }
      if (Y === "[") {
        let [W, J, F, X] = LzA(A, D);
        if (F) {
          G += W, Z = Z || J, D += F - 1, B = B || X;
          continue
        }
      }
      if (Y === "*") {
        if (Q && A === "*") G += TzA;
        else G += OzA;
        B = !0;
        continue
      }
      if (Y === "?") {
        G += _L1, B = !0;
        continue
      }
      G += M$9(Y)
    }
    return [G, ZC(A), !!B, Z]
  }
}
// @from(Start 8426530, End 8426667)
zf = (A, {
  windowsPathsNoEscape: B = !1
} = {}) => {
  return B ? A.replace(/[?*()[\]]/g, "[$&]") : A.replace(/[?*()[\]\\]/g, "\\$&")
}
// @from(Start 8426673, End 8426797)
qD = (A, B, Q = {}) => {
    if (ol(B), !Q.nocomment && B.charAt(0) === "#") return !1;
    return new iF(B, Q).match(A)
  }
// @from(Start 8426801, End 8426830)
L$9 = /^\*+([^+@!?\*\[\(]*)$/
// @from(Start 8426834, End 8426889)
R$9 = (A) => (B) => !B.startsWith(".") && B.endsWith(A)
// @from(Start 8426893, End 8426926)
O$9 = (A) => (B) => B.endsWith(A)
// @from(Start 8426930, End 8427037)
T$9 = (A) => {
    return A = A.toLowerCase(), (B) => !B.startsWith(".") && B.toLowerCase().endsWith(A)
  }
// @from(Start 8427041, End 8427126)
P$9 = (A) => {
    return A = A.toLowerCase(), (B) => B.toLowerCase().endsWith(A)
  }
// @from(Start 8427130, End 8427148)
S$9 = /^\*+\.\*+$/
// @from(Start 8427152, End 8427202)
_$9 = (A) => !A.startsWith(".") && A.includes(".")
// @from(Start 8427206, End 8427261)
j$9 = (A) => A !== "." && A !== ".." && A.includes(".")
// @from(Start 8427265, End 8427280)
y$9 = /^\.\*+$/
// @from(Start 8427284, End 8427341)
k$9 = (A) => A !== "." && A !== ".." && A.startsWith(".")
// @from(Start 8427345, End 8427358)
x$9 = /^\*+$/
// @from(Start 8427362, End 8427411)
f$9 = (A) => A.length !== 0 && !A.startsWith(".")
// @from(Start 8427415, End 8427469)
v$9 = (A) => A.length !== 0 && A !== "." && A !== ".."
// @from(Start 8427473, End 8427503)
b$9 = /^\?+([^+@!?\*\[\(]*)?$/
// @from(Start 8427507, End 8427654)
g$9 = ([A, B = ""]) => {
    let Q = jzA([A]);
    if (!B) return Q;
    return B = B.toLowerCase(), (I) => Q(I) && I.toLowerCase().endsWith(B)
  }
// @from(Start 8427658, End 8427805)
h$9 = ([A, B = ""]) => {
    let Q = yzA([A]);
    if (!B) return Q;
    return B = B.toLowerCase(), (I) => Q(I) && I.toLowerCase().endsWith(B)
  }
// @from(Start 8427809, End 8427908)
m$9 = ([A, B = ""]) => {
    let Q = yzA([A]);
    return !B ? Q : (I) => Q(I) && I.endsWith(B)
  }
// @from(Start 8427912, End 8428011)
d$9 = ([A, B = ""]) => {
    let Q = jzA([A]);
    return !B ? Q : (I) => Q(I) && I.endsWith(B)
  }
// @from(Start 8428015, End 8428112)
jzA = ([A]) => {
    let B = A.length;
    return (Q) => Q.length === B && !Q.startsWith(".")
  }
// @from(Start 8428116, End 8428218)
yzA = ([A]) => {
    let B = A.length;
    return (Q) => Q.length === B && Q !== "." && Q !== ".."
  }
// @from(Start 8428222, End 8428391)
kzA = typeof process === "object" && process ? typeof process.env === "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix"
// @from(Start 8428395, End 8428476)
PzA = {
    win32: {
      sep: "\\"
    },
    posix: {
      sep: "/"
    }
  }
// @from(Start 8428480, End 8428533)
u$9 = kzA === "win32" ? PzA.win32.sep : PzA.posix.sep
// @from(Start 8428553, End 8428579)
HG = Symbol("globstar **")
// @from(Start 8428603, End 8428615)
p$9 = "[^/]"
// @from(Start 8428619, End 8428635)
c$9 = p$9 + "*?"
// @from(Start 8428639, End 8428686)
l$9 = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?"
// @from(Start 8428690, End 8428721)
i$9 = "(?:(?!(?:\\/|^)\\.).)*?"
// @from(Start 8428725, End 8428764)
n$9 = (A, B = {}) => (Q) => qD(Q, A, B)
// @from(Start 8428787, End 8428830)
lF = (A, B = {}) => Object.assign({}, A, B)
// @from(Start 8428834, End 8429854)
a$9 = (A) => {
    if (!A || typeof A !== "object" || !Object.keys(A).length) return qD;
    let B = qD;
    return Object.assign((I, G, Z = {}) => B(I, G, lF(A, Z)), {
      Minimatch: class I extends B.Minimatch {
        constructor(G, Z = {}) {
          super(G, lF(A, Z))
        }
        static defaults(G) {
          return B.defaults(lF(A, G)).Minimatch
        }
      },
      AST: class I extends B.AST {
        constructor(G, Z, D = {}) {
          super(G, Z, lF(A, D))
        }
        static fromGlob(G, Z = {}) {
          return B.AST.fromGlob(G, lF(A, Z))
        }
      },
      unescape: (I, G = {}) => B.unescape(I, lF(A, G)),
      escape: (I, G = {}) => B.escape(I, lF(A, G)),
      filter: (I, G = {}) => B.filter(I, lF(A, G)),
      defaults: (I) => B.defaults(lF(A, I)),
      makeRe: (I, G = {}) => B.makeRe(I, lF(A, G)),
      braceExpand: (I, G = {}) => B.braceExpand(I, lF(A, G)),
      match: (I, G, Z = {}) => B.match(I, G, lF(A, Z)),
      sep: B.sep,
      GLOBSTAR: HG
    })
  }
// @from(Start 8429879, End 8429994)
xzA = (A, B = {}) => {
  if (ol(A), B.nobrace || !/\{(?:(?!\{).)*\}/.test(A)) return [A];
  return _zA.default(A)
}
// @from(Start 8430022, End 8430064)
s$9 = (A, B = {}) => new iF(A, B).makeRe()
// @from(Start 8430087, End 8430230)
r$9 = (A, B, Q = {}) => {
  let I = new iF(B, Q);
  if (A = A.filter((G) => I.match(G)), I.options.nonull && !A.length) A.push(B);
  return A
}
// @from(Start 8430252, End 8430283)
SzA = /[?*]|[+@!]\(.*?\)|\[|\]/
// @from(Start 8430287, End 8430345)
o$9 = (A) => A.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")