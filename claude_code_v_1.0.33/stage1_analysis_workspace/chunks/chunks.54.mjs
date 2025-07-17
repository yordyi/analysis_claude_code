
// @from(Start 5407111, End 5425572)
MJ = z((xR8, tm0) => {
  var {
    Transform: PX6
  } = Z1("node:stream"), vm0 = Z1("node:zlib"), {
    redirectStatusSet: SX6,
    referrerPolicySet: _X6,
    badPortsSet: jX6
  } = fr(), {
    getGlobalOrigin: bm0
  } = ku1(), {
    collectASequenceOfCodePoints: Jj,
    collectAnHTTPQuotedString: yX6,
    removeChars: kX6,
    parseMIMEType: xX6
  } = nY(), {
    performance: fX6
  } = Z1("node:perf_hooks"), {
    isBlobLike: vX6,
    ReadableStreamFrom: bX6,
    isValidHTTPToken: gm0,
    normalizedMethodRecordsBase: gX6
  } = C6(), Fj = Z1("node:assert"), {
    isUint8Array: hX6
  } = Z1("node:util/types"), {
    webidl: br
  } = jG(), hm0 = [], fY1;
  try {
    fY1 = Z1("node:crypto");
    let A = ["sha256", "sha384", "sha512"];
    hm0 = fY1.getHashes().filter((B) => A.includes(B))
  } catch {}

  function mm0(A) {
    let B = A.urlList,
      Q = B.length;
    return Q === 0 ? null : B[Q - 1].toString()
  }

  function mX6(A, B) {
    if (!SX6.has(A.status)) return null;
    let Q = A.headersList.get("location", !0);
    if (Q !== null && um0(Q)) {
      if (!dm0(Q)) Q = dX6(Q);
      Q = new URL(Q, mm0(A))
    }
    if (Q && !Q.hash) Q.hash = B;
    return Q
  }

  function dm0(A) {
    for (let B = 0; B < A.length; ++B) {
      let Q = A.charCodeAt(B);
      if (Q > 126 || Q < 32) return !1
    }
    return !0
  }

  function dX6(A) {
    return Buffer.from(A, "binary").toString("utf8")
  }

  function hr(A) {
    return A.urlList[A.urlList.length - 1]
  }

  function uX6(A) {
    let B = hr(A);
    if (nm0(B) && jX6.has(B.port)) return "blocked";
    return "allowed"
  }

  function pX6(A) {
    return A instanceof Error || (A?.constructor?.name === "Error" || A?.constructor?.name === "DOMException")
  }

  function cX6(A) {
    for (let B = 0; B < A.length; ++B) {
      let Q = A.charCodeAt(B);
      if (!(Q === 9 || Q >= 32 && Q <= 126 || Q >= 128 && Q <= 255)) return !1
    }
    return !0
  }
  var lX6 = gm0;

  function um0(A) {
    return (A[0] === "\t" || A[0] === " " || A[A.length - 1] === "\t" || A[A.length - 1] === " " || A.includes(`
`) || A.includes("\r") || A.includes("\x00")) === !1
  }

  function iX6(A, B) {
    let {
      headersList: Q
    } = B, I = (Q.get("referrer-policy", !0) ?? "").split(","), G = "";
    if (I.length > 0)
      for (let Z = I.length; Z !== 0; Z--) {
        let D = I[Z - 1].trim();
        if (_X6.has(D)) {
          G = D;
          break
        }
      }
    if (G !== "") A.referrerPolicy = G
  }

  function nX6() {
    return "allowed"
  }

  function aX6() {
    return "success"
  }

  function sX6() {
    return "success"
  }

  function rX6(A) {
    let B = null;
    B = A.mode, A.headersList.set("sec-fetch-mode", B, !0)
  }

  function oX6(A) {
    let B = A.origin;
    if (B === "client" || B === void 0) return;
    if (A.responseTainting === "cors" || A.mode === "websocket") A.headersList.append("origin", B, !0);
    else if (A.method !== "GET" && A.method !== "HEAD") {
      switch (A.referrerPolicy) {
        case "no-referrer":
          B = null;
          break;
        case "no-referrer-when-downgrade":
        case "strict-origin":
        case "strict-origin-when-cross-origin":
          if (A.origin && bu1(A.origin) && !bu1(hr(A))) B = null;
          break;
        case "same-origin":
          if (!vY1(A, hr(A))) B = null;
          break;
        default:
      }
      A.headersList.append("origin", B, !0)
    }
  }

  function kh(A, B) {
    return A
  }

  function tX6(A, B, Q) {
    if (!A?.startTime || A.startTime < B) return {
      domainLookupStartTime: B,
      domainLookupEndTime: B,
      connectionStartTime: B,
      connectionEndTime: B,
      secureConnectionStartTime: B,
      ALPNNegotiatedProtocol: A?.ALPNNegotiatedProtocol
    };
    return {
      domainLookupStartTime: kh(A.domainLookupStartTime, Q),
      domainLookupEndTime: kh(A.domainLookupEndTime, Q),
      connectionStartTime: kh(A.connectionStartTime, Q),
      connectionEndTime: kh(A.connectionEndTime, Q),
      secureConnectionStartTime: kh(A.secureConnectionStartTime, Q),
      ALPNNegotiatedProtocol: A.ALPNNegotiatedProtocol
    }
  }

  function eX6(A) {
    return kh(fX6.now(), A)
  }

  function AV6(A) {
    return {
      startTime: A.startTime ?? 0,
      redirectStartTime: 0,
      redirectEndTime: 0,
      postRedirectStartTime: A.startTime ?? 0,
      finalServiceWorkerStartTime: 0,
      finalNetworkResponseStartTime: 0,
      finalNetworkRequestStartTime: 0,
      endTime: 0,
      encodedBodySize: 0,
      decodedBodySize: 0,
      finalConnectionTimingInfo: null
    }
  }

  function pm0() {
    return {
      referrerPolicy: "strict-origin-when-cross-origin"
    }
  }

  function BV6(A) {
    return {
      referrerPolicy: A.referrerPolicy
    }
  }

  function QV6(A) {
    let B = A.referrerPolicy;
    Fj(B);
    let Q = null;
    if (A.referrer === "client") {
      let Y = bm0();
      if (!Y || Y.origin === "null") return "no-referrer";
      Q = new URL(Y)
    } else if (A.referrer instanceof URL) Q = A.referrer;
    let I = vu1(Q),
      G = vu1(Q, !0);
    if (I.toString().length > 4096) I = G;
    let Z = vY1(A, I),
      D = gr(I) && !gr(A.url);
    switch (B) {
      case "origin":
        return G != null ? G : vu1(Q, !0);
      case "unsafe-url":
        return I;
      case "same-origin":
        return Z ? G : "no-referrer";
      case "origin-when-cross-origin":
        return Z ? I : G;
      case "strict-origin-when-cross-origin": {
        let Y = hr(A);
        if (vY1(I, Y)) return I;
        if (gr(I) && !gr(Y)) return "no-referrer";
        return G
      }
      case "strict-origin":
      case "no-referrer-when-downgrade":
      default:
        return D ? "no-referrer" : G
    }
  }

  function vu1(A, B) {
    if (Fj(A instanceof URL), A = new URL(A), A.protocol === "file:" || A.protocol === "about:" || A.protocol === "blank:") return "no-referrer";
    if (A.username = "", A.password = "", A.hash = "", B) A.pathname = "", A.search = "";
    return A
  }

  function gr(A) {
    if (!(A instanceof URL)) return !1;
    if (A.href === "about:blank" || A.href === "about:srcdoc") return !0;
    if (A.protocol === "data:") return !0;
    if (A.protocol === "file:") return !0;
    return B(A.origin);

    function B(Q) {
      if (Q == null || Q === "null") return !1;
      let I = new URL(Q);
      if (I.protocol === "https:" || I.protocol === "wss:") return !0;
      if (/^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(I.hostname) || (I.hostname === "localhost" || I.hostname.includes("localhost.")) || I.hostname.endsWith(".localhost")) return !0;
      return !1
    }
  }

  function IV6(A, B) {
    if (fY1 === void 0) return !0;
    let Q = cm0(B);
    if (Q === "no metadata") return !0;
    if (Q.length === 0) return !0;
    let I = ZV6(Q),
      G = DV6(Q, I);
    for (let Z of G) {
      let {
        algo: D,
        hash: Y
      } = Z, W = fY1.createHash(D).update(A).digest("base64");
      if (W[W.length - 1] === "=")
        if (W[W.length - 2] === "=") W = W.slice(0, -2);
        else W = W.slice(0, -1);
      if (YV6(W, Y)) return !0
    }
    return !1
  }
  var GV6 = /(?<algo>sha256|sha384|sha512)-((?<hash>[A-Za-z0-9+/]+|[A-Za-z0-9_-]+)={0,2}(?:\s|$)( +[!-~]*)?)?/i;

  function cm0(A) {
    let B = [],
      Q = !0;
    for (let I of A.split(" ")) {
      Q = !1;
      let G = GV6.exec(I);
      if (G === null || G.groups === void 0 || G.groups.algo === void 0) continue;
      let Z = G.groups.algo.toLowerCase();
      if (hm0.includes(Z)) B.push(G.groups)
    }
    if (Q === !0) return "no metadata";
    return B
  }

  function ZV6(A) {
    let B = A[0].algo;
    if (B[3] === "5") return B;
    for (let Q = 1; Q < A.length; ++Q) {
      let I = A[Q];
      if (I.algo[3] === "5") {
        B = "sha512";
        break
      } else if (B[3] === "3") continue;
      else if (I.algo[3] === "3") B = "sha384"
    }
    return B
  }

  function DV6(A, B) {
    if (A.length === 1) return A;
    let Q = 0;
    for (let I = 0; I < A.length; ++I)
      if (A[I].algo === B) A[Q++] = A[I];
    return A.length = Q, A
  }

  function YV6(A, B) {
    if (A.length !== B.length) return !1;
    for (let Q = 0; Q < A.length; ++Q)
      if (A[Q] !== B[Q]) {
        if (A[Q] === "+" && B[Q] === "-" || A[Q] === "/" && B[Q] === "_") continue;
        return !1
      } return !0
  }

  function WV6(A) {}

  function vY1(A, B) {
    if (A.origin === B.origin && A.origin === "null") return !0;
    if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) return !0;
    return !1
  }

  function JV6() {
    let A, B;
    return {
      promise: new Promise((I, G) => {
        A = I, B = G
      }),
      resolve: A,
      reject: B
    }
  }

  function FV6(A) {
    return A.controller.state === "aborted"
  }

  function XV6(A) {
    return A.controller.state === "aborted" || A.controller.state === "terminated"
  }

  function VV6(A) {
    return gX6[A.toLowerCase()] ?? A
  }

  function CV6(A) {
    let B = JSON.stringify(A);
    if (B === void 0) throw new TypeError("Value is not JSON serializable");
    return Fj(typeof B === "string"), B
  }
  var KV6 = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

  function lm0(A, B, Q = 0, I = 1) {
    class G {
      #A;
      #B;
      #Q;
      constructor(Z, D) {
        this.#A = Z, this.#B = D, this.#Q = 0
      }
      next() {
        if (typeof this !== "object" || this === null || !(#A in this)) throw new TypeError(`'next' called on an object that does not implement interface ${A} Iterator.`);
        let Z = this.#Q,
          D = this.#A[B],
          Y = D.length;
        if (Z >= Y) return {
          value: void 0,
          done: !0
        };
        let {
          [Q]: W, [I]: J
        } = D[Z];
        this.#Q = Z + 1;
        let F;
        switch (this.#B) {
          case "key":
            F = W;
            break;
          case "value":
            F = J;
            break;
          case "key+value":
            F = [W, J];
            break
        }
        return {
          value: F,
          done: !1
        }
      }
    }
    return delete G.prototype.constructor, Object.setPrototypeOf(G.prototype, KV6), Object.defineProperties(G.prototype, {
        [Symbol.toStringTag]: {
          writable: !1,
          enumerable: !1,
          configurable: !0,
          value: `${A} Iterator`
        },
        next: {
          writable: !0,
          enumerable: !0,
          configurable: !0
        }
      }),
      function(Z, D) {
        return new G(Z, D)
      }
  }

  function HV6(A, B, Q, I = 0, G = 1) {
    let Z = lm0(A, Q, I, G),
      D = {
        keys: {
          writable: !0,
          enumerable: !0,
          configurable: !0,
          value: function Y() {
            return br.brandCheck(this, B), Z(this, "key")
          }
        },
        values: {
          writable: !0,
          enumerable: !0,
          configurable: !0,
          value: function Y() {
            return br.brandCheck(this, B), Z(this, "value")
          }
        },
        entries: {
          writable: !0,
          enumerable: !0,
          configurable: !0,
          value: function Y() {
            return br.brandCheck(this, B), Z(this, "key+value")
          }
        },
        forEach: {
          writable: !0,
          enumerable: !0,
          configurable: !0,
          value: function Y(W, J = globalThis) {
            if (br.brandCheck(this, B), br.argumentLengthCheck(arguments, 1, `${A}.forEach`), typeof W !== "function") throw new TypeError(`Failed to execute 'forEach' on '${A}': parameter 1 is not of type 'Function'.`);
            for (let {
                0: F,
                1: X
              }
              of Z(this, "key+value")) W.call(J, X, F, this)
          }
        }
      };
    return Object.defineProperties(B.prototype, {
      ...D,
      [Symbol.iterator]: {
        writable: !0,
        enumerable: !1,
        configurable: !0,
        value: D.entries.value
      }
    })
  }
  async function zV6(A, B, Q) {
    let I = B,
      G = Q,
      Z;
    try {
      Z = A.stream.getReader()
    } catch (D) {
      G(D);
      return
    }
    try {
      I(await im0(Z))
    } catch (D) {
      G(D)
    }
  }

  function wV6(A) {
    return A instanceof ReadableStream || A[Symbol.toStringTag] === "ReadableStream" && typeof A.tee === "function"
  }

  function EV6(A) {
    try {
      A.close(), A.byobRequest?.respond(0)
    } catch (B) {
      if (!B.message.includes("Controller is already closed") && !B.message.includes("ReadableStream is already closed")) throw B
    }
  }
  var UV6 = /[^\x00-\xFF]/;

  function xY1(A) {
    return Fj(!UV6.test(A)), A
  }
  async function im0(A) {
    let B = [],
      Q = 0;
    while (!0) {
      let {
        done: I,
        value: G
      } = await A.read();
      if (I) return Buffer.concat(B, Q);
      if (!hX6(G)) throw new TypeError("Received non-Uint8Array chunk");
      B.push(G), Q += G.length
    }
  }

  function NV6(A) {
    Fj("protocol" in A);
    let B = A.protocol;
    return B === "about:" || B === "blob:" || B === "data:"
  }

  function bu1(A) {
    return typeof A === "string" && A[5] === ":" && A[0] === "h" && A[1] === "t" && A[2] === "t" && A[3] === "p" && A[4] === "s" || A.protocol === "https:"
  }

  function nm0(A) {
    Fj("protocol" in A);
    let B = A.protocol;
    return B === "http:" || B === "https:"
  }

  function $V6(A, B) {
    let Q = A;
    if (!Q.startsWith("bytes")) return "failure";
    let I = {
      position: 5
    };
    if (B) Jj((W) => W === "\t" || W === " ", Q, I);
    if (Q.charCodeAt(I.position) !== 61) return "failure";
    if (I.position++, B) Jj((W) => W === "\t" || W === " ", Q, I);
    let G = Jj((W) => {
        let J = W.charCodeAt(0);
        return J >= 48 && J <= 57
      }, Q, I),
      Z = G.length ? Number(G) : null;
    if (B) Jj((W) => W === "\t" || W === " ", Q, I);
    if (Q.charCodeAt(I.position) !== 45) return "failure";
    if (I.position++, B) Jj((W) => W === "\t" || W === " ", Q, I);
    let D = Jj((W) => {
        let J = W.charCodeAt(0);
        return J >= 48 && J <= 57
      }, Q, I),
      Y = D.length ? Number(D) : null;
    if (I.position < Q.length) return "failure";
    if (Y === null && Z === null) return "failure";
    if (Z > Y) return "failure";
    return {
      rangeStartValue: Z,
      rangeEndValue: Y
    }
  }

  function qV6(A, B, Q) {
    let I = "bytes ";
    return I += xY1(`${A}`), I += "-", I += xY1(`${B}`), I += "/", I += xY1(`${Q}`), I
  }
  class am0 extends PX6 {
    #A;
    constructor(A) {
      super();
      this.#A = A
    }
    _transform(A, B, Q) {
      if (!this._inflateStream) {
        if (A.length === 0) {
          Q();
          return
        }
        this._inflateStream = (A[0] & 15) === 8 ? vm0.createInflate(this.#A) : vm0.createInflateRaw(this.#A), this._inflateStream.on("data", this.push.bind(this)), this._inflateStream.on("end", () => this.push(null)), this._inflateStream.on("error", (I) => this.destroy(I))
      }
      this._inflateStream.write(A, B, Q)
    }
    _final(A) {
      if (this._inflateStream) this._inflateStream.end(), this._inflateStream = null;
      A()
    }
  }

  function MV6(A) {
    return new am0(A)
  }

  function LV6(A) {
    let B = null,
      Q = null,
      I = null,
      G = sm0("content-type", A);
    if (G === null) return "failure";
    for (let Z of G) {
      let D = xX6(Z);
      if (D === "failure" || D.essence === "*/*") continue;
      if (I = D, I.essence !== Q) {
        if (B = null, I.parameters.has("charset")) B = I.parameters.get("charset");
        Q = I.essence
      } else if (!I.parameters.has("charset") && B !== null) I.parameters.set("charset", B)
    }
    if (I == null) return "failure";
    return I
  }

  function RV6(A) {
    let B = A,
      Q = {
        position: 0
      },
      I = [],
      G = "";
    while (Q.position < B.length) {
      if (G += Jj((Z) => Z !== '"' && Z !== ",", B, Q), Q.position < B.length)
        if (B.charCodeAt(Q.position) === 34) {
          if (G += yX6(B, Q), Q.position < B.length) continue
        } else Fj(B.charCodeAt(Q.position) === 44), Q.position++;
      G = kX6(G, !0, !0, (Z) => Z === 9 || Z === 32), I.push(G), G = ""
    }
    return I
  }

  function sm0(A, B) {
    let Q = B.get(A, !0);
    if (Q === null) return null;
    return RV6(Q)
  }
  var OV6 = new TextDecoder;

  function TV6(A) {
    if (A.length === 0) return "";
    if (A[0] === 239 && A[1] === 187 && A[2] === 191) A = A.subarray(3);
    return OV6.decode(A)
  }
  class rm0 {
    get baseUrl() {
      return bm0()
    }
    get origin() {
      return this.baseUrl?.origin
    }
    policyContainer = pm0()
  }
  class om0 {
    settingsObject = new rm0
  }
  var PV6 = new om0;
  tm0.exports = {
    isAborted: FV6,
    isCancelled: XV6,
    isValidEncodedURL: dm0,
    createDeferredPromise: JV6,
    ReadableStreamFrom: bX6,
    tryUpgradeRequestToAPotentiallyTrustworthyURL: WV6,
    clampAndCoarsenConnectionTimingInfo: tX6,
    coarsenedSharedCurrentTime: eX6,
    determineRequestsReferrer: QV6,
    makePolicyContainer: pm0,
    clonePolicyContainer: BV6,
    appendFetchMetadata: rX6,
    appendRequestOriginHeader: oX6,
    TAOCheck: sX6,
    corsCheck: aX6,
    crossOriginResourcePolicyCheck: nX6,
    createOpaqueTimingInfo: AV6,
    setRequestReferrerPolicyOnRedirect: iX6,
    isValidHTTPToken: gm0,
    requestBadPort: uX6,
    requestCurrentURL: hr,
    responseURL: mm0,
    responseLocationURL: mX6,
    isBlobLike: vX6,
    isURLPotentiallyTrustworthy: gr,
    isValidReasonPhrase: cX6,
    sameOrigin: vY1,
    normalizeMethod: VV6,
    serializeJavascriptValueToJSONString: CV6,
    iteratorMixin: HV6,
    createIterator: lm0,
    isValidHeaderName: lX6,
    isValidHeaderValue: um0,
    isErrorLike: pX6,
    fullyReadBody: zV6,
    bytesMatch: IV6,
    isReadableStreamLike: wV6,
    readableStreamClose: EV6,
    isomorphicEncode: xY1,
    urlIsLocal: NV6,
    urlHasHttpsScheme: bu1,
    urlIsHttpHttpsScheme: nm0,
    readAllBytes: im0,
    simpleRangeHeaderValue: $V6,
    buildContentRange: qV6,
    parseMetadata: cm0,
    createInflate: MV6,
    extractMimeType: LV6,
    getDecodeSplit: sm0,
    utf8DecodeBytes: TV6,
    environmentSettingsObject: PV6
  }
})
// @from(Start 5425578, End 5425781)
LR = z((fR8, em0) => {
  em0.exports = {
    kUrl: Symbol("url"),
    kHeaders: Symbol("headers"),
    kSignal: Symbol("signal"),
    kState: Symbol("state"),
    kDispatcher: Symbol("dispatcher")
  }
})
// @from(Start 5425787, End 5427225)
gu1 = z((vR8, Ad0) => {
  var {
    Blob: SV6,
    File: _V6
  } = Z1("node:buffer"), {
    kState: dN
  } = LR(), {
    webidl: $w
  } = jG();
  class qw {
    constructor(A, B, Q = {}) {
      let I = B,
        G = Q.type,
        Z = Q.lastModified ?? Date.now();
      this[dN] = {
        blobLike: A,
        name: I,
        type: G,
        lastModified: Z
      }
    }
    stream(...A) {
      return $w.brandCheck(this, qw), this[dN].blobLike.stream(...A)
    }
    arrayBuffer(...A) {
      return $w.brandCheck(this, qw), this[dN].blobLike.arrayBuffer(...A)
    }
    slice(...A) {
      return $w.brandCheck(this, qw), this[dN].blobLike.slice(...A)
    }
    text(...A) {
      return $w.brandCheck(this, qw), this[dN].blobLike.text(...A)
    }
    get size() {
      return $w.brandCheck(this, qw), this[dN].blobLike.size
    }
    get type() {
      return $w.brandCheck(this, qw), this[dN].blobLike.type
    }
    get name() {
      return $w.brandCheck(this, qw), this[dN].name
    }
    get lastModified() {
      return $w.brandCheck(this, qw), this[dN].lastModified
    }
    get[Symbol.toStringTag]() {
      return "File"
    }
  }
  $w.converters.Blob = $w.interfaceConverter(SV6);

  function jV6(A) {
    return A instanceof _V6 || A && (typeof A.stream === "function" || typeof A.arrayBuffer === "function") && A[Symbol.toStringTag] === "File"
  }
  Ad0.exports = {
    FileLike: qw,
    isFileLike: jV6
  }
})
// @from(Start 5427231, End 5431382)
mr = z((bR8, Zd0) => {
  var {
    isBlobLike: bY1,
    iteratorMixin: yV6
  } = MJ(), {
    kState: xD
  } = LR(), {
    kEnumerableProperty: xh
  } = C6(), {
    FileLike: Bd0,
    isFileLike: kV6
  } = gu1(), {
    webidl: DB
  } = jG(), {
    File: Gd0
  } = Z1("node:buffer"), Qd0 = Z1("node:util"), Id0 = globalThis.File ?? Gd0;
  class Mw {
    constructor(A) {
      if (DB.util.markAsUncloneable(this), A !== void 0) throw DB.errors.conversionFailed({
        prefix: "FormData constructor",
        argument: "Argument 1",
        types: ["undefined"]
      });
      this[xD] = []
    }
    append(A, B, Q = void 0) {
      DB.brandCheck(this, Mw);
      let I = "FormData.append";
      if (DB.argumentLengthCheck(arguments, 2, I), arguments.length === 3 && !bY1(B)) throw new TypeError("Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'");
      A = DB.converters.USVString(A, I, "name"), B = bY1(B) ? DB.converters.Blob(B, I, "value", {
        strict: !1
      }) : DB.converters.USVString(B, I, "value"), Q = arguments.length === 3 ? DB.converters.USVString(Q, I, "filename") : void 0;
      let G = hu1(A, B, Q);
      this[xD].push(G)
    }
    delete(A) {
      DB.brandCheck(this, Mw);
      let B = "FormData.delete";
      DB.argumentLengthCheck(arguments, 1, B), A = DB.converters.USVString(A, B, "name"), this[xD] = this[xD].filter((Q) => Q.name !== A)
    }
    get(A) {
      DB.brandCheck(this, Mw);
      let B = "FormData.get";
      DB.argumentLengthCheck(arguments, 1, B), A = DB.converters.USVString(A, B, "name");
      let Q = this[xD].findIndex((I) => I.name === A);
      if (Q === -1) return null;
      return this[xD][Q].value
    }
    getAll(A) {
      DB.brandCheck(this, Mw);
      let B = "FormData.getAll";
      return DB.argumentLengthCheck(arguments, 1, B), A = DB.converters.USVString(A, B, "name"), this[xD].filter((Q) => Q.name === A).map((Q) => Q.value)
    }
    has(A) {
      DB.brandCheck(this, Mw);
      let B = "FormData.has";
      return DB.argumentLengthCheck(arguments, 1, B), A = DB.converters.USVString(A, B, "name"), this[xD].findIndex((Q) => Q.name === A) !== -1
    }
    set(A, B, Q = void 0) {
      DB.brandCheck(this, Mw);
      let I = "FormData.set";
      if (DB.argumentLengthCheck(arguments, 2, I), arguments.length === 3 && !bY1(B)) throw new TypeError("Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'");
      A = DB.converters.USVString(A, I, "name"), B = bY1(B) ? DB.converters.Blob(B, I, "name", {
        strict: !1
      }) : DB.converters.USVString(B, I, "name"), Q = arguments.length === 3 ? DB.converters.USVString(Q, I, "name") : void 0;
      let G = hu1(A, B, Q),
        Z = this[xD].findIndex((D) => D.name === A);
      if (Z !== -1) this[xD] = [...this[xD].slice(0, Z), G, ...this[xD].slice(Z + 1).filter((D) => D.name !== A)];
      else this[xD].push(G)
    } [Qd0.inspect.custom](A, B) {
      let Q = this[xD].reduce((G, Z) => {
        if (G[Z.name])
          if (Array.isArray(G[Z.name])) G[Z.name].push(Z.value);
          else G[Z.name] = [G[Z.name], Z.value];
        else G[Z.name] = Z.value;
        return G
      }, {
        __proto__: null
      });
      B.depth ??= A, B.colors ??= !0;
      let I = Qd0.formatWithOptions(B, Q);
      return `FormData ${I.slice(I.indexOf("]")+2)}`
    }
  }
  yV6("FormData", Mw, xD, "name", "value");
  Object.defineProperties(Mw.prototype, {
    append: xh,
    delete: xh,
    get: xh,
    getAll: xh,
    has: xh,
    set: xh,
    [Symbol.toStringTag]: {
      value: "FormData",
      configurable: !0
    }
  });

  function hu1(A, B, Q) {
    if (typeof B === "string");
    else {
      if (!kV6(B)) B = B instanceof Blob ? new Id0([B], "blob", {
        type: B.type
      }) : new Bd0(B, "blob", {
        type: B.type
      });
      if (Q !== void 0) {
        let I = {
          type: B.type,
          lastModified: B.lastModified
        };
        B = B instanceof Gd0 ? new Id0([B], Q, I) : new Bd0(B, Q, I)
      }
    }
    return {
      name: A,
      value: B
    }
  }
  Zd0.exports = {
    FormData: Mw,
    makeEntry: hu1
  }
})
// @from(Start 5431388, End 5436614)
Xd0 = z((gR8, Fd0) => {
  var {
    isUSVString: Dd0,
    bufferToLowerCasedHeaderName: xV6
  } = C6(), {
    utf8DecodeBytes: fV6
  } = MJ(), {
    HTTP_TOKEN_CODEPOINTS: vV6,
    isomorphicDecode: Yd0
  } = nY(), {
    isFileLike: bV6
  } = gu1(), {
    makeEntry: gV6
  } = mr(), gY1 = Z1("node:assert"), {
    File: hV6
  } = Z1("node:buffer"), mV6 = globalThis.File ?? hV6, dV6 = Buffer.from('form-data; name="'), Wd0 = Buffer.from("; filename"), uV6 = Buffer.from("--"), pV6 = Buffer.from(`--\r
`);

  function cV6(A) {
    for (let B = 0; B < A.length; ++B)
      if ((A.charCodeAt(B) & -128) !== 0) return !1;
    return !0
  }

  function lV6(A) {
    let B = A.length;
    if (B < 27 || B > 70) return !1;
    for (let Q = 0; Q < B; ++Q) {
      let I = A.charCodeAt(Q);
      if (!(I >= 48 && I <= 57 || I >= 65 && I <= 90 || I >= 97 && I <= 122 || I === 39 || I === 45 || I === 95)) return !1
    }
    return !0
  }

  function iV6(A, B) {
    gY1(B !== "failure" && B.essence === "multipart/form-data");
    let Q = B.parameters.get("boundary");
    if (Q === void 0) return "failure";
    let I = Buffer.from(`--${Q}`, "utf8"),
      G = [],
      Z = {
        position: 0
      };
    while (A[Z.position] === 13 && A[Z.position + 1] === 10) Z.position += 2;
    let D = A.length;
    while (A[D - 1] === 10 && A[D - 2] === 13) D -= 2;
    if (D !== A.length) A = A.subarray(0, D);
    while (!0) {
      if (A.subarray(Z.position, Z.position + I.length).equals(I)) Z.position += I.length;
      else return "failure";
      if (Z.position === A.length - 2 && hY1(A, uV6, Z) || Z.position === A.length - 4 && hY1(A, pV6, Z)) return G;
      if (A[Z.position] !== 13 || A[Z.position + 1] !== 10) return "failure";
      Z.position += 2;
      let Y = nV6(A, Z);
      if (Y === "failure") return "failure";
      let {
        name: W,
        filename: J,
        contentType: F,
        encoding: X
      } = Y;
      Z.position += 2;
      let V;
      {
        let K = A.indexOf(I.subarray(2), Z.position);
        if (K === -1) return "failure";
        if (V = A.subarray(Z.position, K - 4), Z.position += V.length, X === "base64") V = Buffer.from(V.toString(), "base64")
      }
      if (A[Z.position] !== 13 || A[Z.position + 1] !== 10) return "failure";
      else Z.position += 2;
      let C;
      if (J !== null) {
        if (F ??= "text/plain", !cV6(F)) F = "";
        C = new mV6([V], J, {
          type: F
        })
      } else C = fV6(Buffer.from(V));
      gY1(Dd0(W)), gY1(typeof C === "string" && Dd0(C) || bV6(C)), G.push(gV6(W, C, J))
    }
  }

  function nV6(A, B) {
    let Q = null,
      I = null,
      G = null,
      Z = null;
    while (!0) {
      if (A[B.position] === 13 && A[B.position + 1] === 10) {
        if (Q === null) return "failure";
        return {
          name: Q,
          filename: I,
          contentType: G,
          encoding: Z
        }
      }
      let D = fh((Y) => Y !== 10 && Y !== 13 && Y !== 58, A, B);
      if (D = mu1(D, !0, !0, (Y) => Y === 9 || Y === 32), !vV6.test(D.toString())) return "failure";
      if (A[B.position] !== 58) return "failure";
      switch (B.position++, fh((Y) => Y === 32 || Y === 9, A, B), xV6(D)) {
        case "content-disposition": {
          if (Q = I = null, !hY1(A, dV6, B)) return "failure";
          if (B.position += 17, Q = Jd0(A, B), Q === null) return "failure";
          if (hY1(A, Wd0, B)) {
            let Y = B.position + Wd0.length;
            if (A[Y] === 42) B.position += 1, Y += 1;
            if (A[Y] !== 61 || A[Y + 1] !== 34) return "failure";
            if (B.position += 12, I = Jd0(A, B), I === null) return "failure"
          }
          break
        }
        case "content-type": {
          let Y = fh((W) => W !== 10 && W !== 13, A, B);
          Y = mu1(Y, !1, !0, (W) => W === 9 || W === 32), G = Yd0(Y);
          break
        }
        case "content-transfer-encoding": {
          let Y = fh((W) => W !== 10 && W !== 13, A, B);
          Y = mu1(Y, !1, !0, (W) => W === 9 || W === 32), Z = Yd0(Y);
          break
        }
        default:
          fh((Y) => Y !== 10 && Y !== 13, A, B)
      }
      if (A[B.position] !== 13 && A[B.position + 1] !== 10) return "failure";
      else B.position += 2
    }
  }

  function Jd0(A, B) {
    gY1(A[B.position - 1] === 34);
    let Q = fh((I) => I !== 10 && I !== 13 && I !== 34, A, B);
    if (A[B.position] !== 34) return null;
    else B.position++;
    return Q = new TextDecoder().decode(Q).replace(/%0A/ig, `
`).replace(/%0D/ig, "\r").replace(/%22/g, '"'), Q
  }

  function fh(A, B, Q) {
    let I = Q.position;
    while (I < B.length && A(B[I])) ++I;
    return B.subarray(Q.position, Q.position = I)
  }

  function mu1(A, B, Q, I) {
    let G = 0,
      Z = A.length - 1;
    if (B)
      while (G < A.length && I(A[G])) G++;
    if (Q)
      while (Z > 0 && I(A[Z])) Z--;
    return G === 0 && Z === A.length - 1 ? A : A.subarray(G, Z + 1)
  }

  function hY1(A, B, Q) {
    if (A.length < B.length) return !1;
    for (let I = 0; I < B.length; I++)
      if (B[I] !== A[Q.position + I]) return !1;
    return !0
  }
  Fd0.exports = {
    multipartFormDataParser: iV6,
    validateBoundary: lV6
  }
})
// @from(Start 5436620, End 5443925)
gh = z((hR8, Ud0) => {
  var dr = C6(),
    {
      ReadableStreamFrom: aV6,
      isBlobLike: Vd0,
      isReadableStreamLike: sV6,
      readableStreamClose: rV6,
      createDeferredPromise: oV6,
      fullyReadBody: tV6,
      extractMimeType: eV6,
      utf8DecodeBytes: Hd0
    } = MJ(),
    {
      FormData: Cd0
    } = mr(),
    {
      kState: bh
    } = LR(),
    {
      webidl: AC6
    } = jG(),
    {
      Blob: BC6
    } = Z1("node:buffer"),
    du1 = Z1("node:assert"),
    {
      isErrored: zd0,
      isDisturbed: QC6
    } = Z1("node:stream"),
    {
      isArrayBuffer: IC6
    } = Z1("node:util/types"),
    {
      serializeAMimeType: GC6
    } = nY(),
    {
      multipartFormDataParser: ZC6
    } = Xd0(),
    uu1;
  try {
    let A = Z1("node:crypto");
    uu1 = (B) => A.randomInt(0, B)
  } catch {
    uu1 = (A) => Math.floor(Math.random(A))
  }
  var mY1 = new TextEncoder;

  function DC6() {}
  var pu1 = globalThis.FinalizationRegistry && process.version.indexOf("v18") !== 0,
    cu1;
  if (pu1) cu1 = new FinalizationRegistry((A) => {
    let B = A.deref();
    if (B && !B.locked && !QC6(B) && !zd0(B)) B.cancel("Response object has been garbage collected").catch(DC6)
  });

  function wd0(A, B = !1) {
    let Q = null;
    if (A instanceof ReadableStream) Q = A;
    else if (Vd0(A)) Q = A.stream();
    else Q = new ReadableStream({
      async pull(W) {
        let J = typeof G === "string" ? mY1.encode(G) : G;
        if (J.byteLength) W.enqueue(J);
        queueMicrotask(() => rV6(W))
      },
      start() {},
      type: "bytes"
    });
    du1(sV6(Q));
    let I = null,
      G = null,
      Z = null,
      D = null;
    if (typeof A === "string") G = A, D = "text/plain;charset=UTF-8";
    else if (A instanceof URLSearchParams) G = A.toString(), D = "application/x-www-form-urlencoded;charset=UTF-8";
    else if (IC6(A)) G = new Uint8Array(A.slice());
    else if (ArrayBuffer.isView(A)) G = new Uint8Array(A.buffer.slice(A.byteOffset, A.byteOffset + A.byteLength));
    else if (dr.isFormDataLike(A)) {
      let W = `----formdata-undici-0${`${uu1(100000000000)}`.padStart(11,"0")}`,
        J = `--${W}\r
Content-Disposition: form-data`; /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
      let F = (N) => N.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"),
        X = (N) => N.replace(/\r?\n|\r/g, `\r
`),
        V = [],
        C = new Uint8Array([13, 10]);
      Z = 0;
      let K = !1;
      for (let [N, q] of A)
        if (typeof q === "string") {
          let O = mY1.encode(J + `; name="${F(X(N))}"\r
\r
${X(q)}\r
`);
          V.push(O), Z += O.byteLength
        } else {
          let O = mY1.encode(`${J}; name="${F(X(N))}"` + (q.name ? `; filename="${F(q.name)}"` : "") + `\r
Content-Type: ${q.type||"application/octet-stream"}\r
\r
`);
          if (V.push(O, q, C), typeof q.size === "number") Z += O.byteLength + q.size + C.byteLength;
          else K = !0
        } let E = mY1.encode(`--${W}--`);
      if (V.push(E), Z += E.byteLength, K) Z = null;
      G = A, I = async function*() {
        for (let N of V)
          if (N.stream) yield* N.stream();
          else yield N
      }, D = `multipart/form-data; boundary=${W}`
    } else if (Vd0(A)) {
      if (G = A, Z = A.size, A.type) D = A.type
    } else if (typeof A[Symbol.asyncIterator] === "function") {
      if (B) throw new TypeError("keepalive");
      if (dr.isDisturbed(A) || A.locked) throw new TypeError("Response body object should not be disturbed or locked");
      Q = A instanceof ReadableStream ? A : aV6(A)
    }
    if (typeof G === "string" || dr.isBuffer(G)) Z = Buffer.byteLength(G);
    if (I != null) {
      let W;
      Q = new ReadableStream({
        async start() {
          W = I(A)[Symbol.asyncIterator]()
        },
        async pull(J) {
          let {
            value: F,
            done: X
          } = await W.next();
          if (X) queueMicrotask(() => {
            J.close(), J.byobRequest?.respond(0)
          });
          else if (!zd0(Q)) {
            let V = new Uint8Array(F);
            if (V.byteLength) J.enqueue(V)
          }
          return J.desiredSize > 0
        },
        async cancel(J) {
          await W.return()
        },
        type: "bytes"
      })
    }
    return [{
      stream: Q,
      source: G,
      length: Z
    }, D]
  }

  function YC6(A, B = !1) {
    if (A instanceof ReadableStream) du1(!dr.isDisturbed(A), "The body has already been consumed."), du1(!A.locked, "The stream is locked.");
    return wd0(A, B)
  }

  function WC6(A, B) {
    let [Q, I] = B.stream.tee();
    if (pu1) cu1.register(A, new WeakRef(Q));
    return B.stream = Q, {
      stream: I,
      length: B.length,
      source: B.source
    }
  }

  function JC6(A) {
    if (A.aborted) throw new DOMException("The operation was aborted.", "AbortError")
  }

  function FC6(A) {
    return {
      blob() {
        return vh(this, (Q) => {
          let I = Kd0(this);
          if (I === null) I = "";
          else if (I) I = GC6(I);
          return new BC6([Q], {
            type: I
          })
        }, A)
      },
      arrayBuffer() {
        return vh(this, (Q) => {
          return new Uint8Array(Q).buffer
        }, A)
      },
      text() {
        return vh(this, Hd0, A)
      },
      json() {
        return vh(this, VC6, A)
      },
      formData() {
        return vh(this, (Q) => {
          let I = Kd0(this);
          if (I !== null) switch (I.essence) {
            case "multipart/form-data": {
              let G = ZC6(Q, I);
              if (G === "failure") throw new TypeError("Failed to parse body as FormData.");
              let Z = new Cd0;
              return Z[bh] = G, Z
            }
            case "application/x-www-form-urlencoded": {
              let G = new URLSearchParams(Q.toString()),
                Z = new Cd0;
              for (let [D, Y] of G) Z.append(D, Y);
              return Z
            }
          }
          throw new TypeError('Content-Type was not one of "multipart/form-data" or "application/x-www-form-urlencoded".')
        }, A)
      },
      bytes() {
        return vh(this, (Q) => {
          return new Uint8Array(Q)
        }, A)
      }
    }
  }

  function XC6(A) {
    Object.assign(A.prototype, FC6(A))
  }
  async function vh(A, B, Q) {
    if (AC6.brandCheck(A, Q), Ed0(A)) throw new TypeError("Body is unusable: Body has already been read");
    JC6(A[bh]);
    let I = oV6(),
      G = (D) => I.reject(D),
      Z = (D) => {
        try {
          I.resolve(B(D))
        } catch (Y) {
          G(Y)
        }
      };
    if (A[bh].body == null) return Z(Buffer.allocUnsafe(0)), I.promise;
    return await tV6(A[bh].body, Z, G), I.promise
  }

  function Ed0(A) {
    let B = A[bh].body;
    return B != null && (B.stream.locked || dr.isDisturbed(B.stream))
  }

  function VC6(A) {
    return JSON.parse(Hd0(A))
  }

  function Kd0(A) {
    let B = A[bh].headersList,
      Q = eV6(B);
    if (Q === "failure") return null;
    return Q
  }
  Ud0.exports = {
    extractBody: wd0,
    safelyExtractBody: YC6,
    cloneBody: WC6,
    mixinBody: XC6,
    streamRegistry: cu1,
    hasFinalizationRegistry: pu1,
    bodyUnusable: Ed0
  }
})
// @from(Start 5443931, End 5466893)
jd0 = z((mR8, _d0) => {
  var r9 = Z1("node:assert"),
    $4 = C6(),
    {
      channels: Nd0
    } = Rh(),
    lu1 = Ru1(),
    {
      RequestContentLengthMismatchError: Xj,
      ResponseContentLengthMismatchError: CC6,
      RequestAbortedError: Od0,
      HeadersTimeoutError: KC6,
      HeadersOverflowError: HC6,
      SocketError: iY1,
      InformationalError: hh,
      BodyTimeoutError: zC6,
      HTTPParserError: wC6,
      ResponseExceededMaxSizeError: EC6
    } = u5(),
    {
      kUrl: Td0,
      kReset: aY,
      kClient: su1,
      kParser: i3,
      kBlocking: cr,
      kRunning: jZ,
      kPending: UC6,
      kSize: $d0,
      kWriting: OR,
      kQueue: aC,
      kNoRef: ur,
      kKeepAliveDefaultTimeout: NC6,
      kHostHeader: $C6,
      kPendingIdx: qC6,
      kRunningIdx: vX,
      kError: bX,
      kPipelining: cY1,
      kSocket: mh,
      kKeepAliveTimeoutValue: nY1,
      kMaxHeadersSize: iu1,
      kKeepAliveMaxTimeout: MC6,
      kKeepAliveTimeoutThreshold: LC6,
      kHeadersTimeout: RC6,
      kBodyTimeout: OC6,
      kStrictContentLength: ru1,
      kMaxRequests: qd0,
      kCounter: TC6,
      kMaxResponseSize: PC6,
      kOnError: SC6,
      kResume: RR,
      kHTTPContext: Pd0
    } = A3(),
    Lw = Hm0(),
    _C6 = Buffer.alloc(0),
    dY1 = Buffer[Symbol.species],
    uY1 = $4.addListener,
    jC6 = $4.removeAllListeners,
    nu1;
  async function yC6() {
    let A = process.env.JEST_WORKER_ID ? ju1() : void 0,
      B;
    try {
      B = await WebAssembly.compile(Em0())
    } catch (Q) {
      B = await WebAssembly.compile(A || ju1())
    }
    return await WebAssembly.instantiate(B, {
      env: {
        wasm_on_url: (Q, I, G) => {
          return 0
        },
        wasm_on_status: (Q, I, G) => {
          r9(u7.ptr === Q);
          let Z = I - Ow + Rw.byteOffset;
          return u7.onStatus(new dY1(Rw.buffer, Z, G)) || 0
        },
        wasm_on_message_begin: (Q) => {
          return r9(u7.ptr === Q), u7.onMessageBegin() || 0
        },
        wasm_on_header_field: (Q, I, G) => {
          r9(u7.ptr === Q);
          let Z = I - Ow + Rw.byteOffset;
          return u7.onHeaderField(new dY1(Rw.buffer, Z, G)) || 0
        },
        wasm_on_header_value: (Q, I, G) => {
          r9(u7.ptr === Q);
          let Z = I - Ow + Rw.byteOffset;
          return u7.onHeaderValue(new dY1(Rw.buffer, Z, G)) || 0
        },
        wasm_on_headers_complete: (Q, I, G, Z) => {
          return r9(u7.ptr === Q), u7.onHeadersComplete(I, Boolean(G), Boolean(Z)) || 0
        },
        wasm_on_body: (Q, I, G) => {
          r9(u7.ptr === Q);
          let Z = I - Ow + Rw.byteOffset;
          return u7.onBody(new dY1(Rw.buffer, Z, G)) || 0
        },
        wasm_on_message_complete: (Q) => {
          return r9(u7.ptr === Q), u7.onMessageComplete() || 0
        }
      }
    })
  }
  var au1 = null,
    ou1 = yC6();
  ou1.catch();
  var u7 = null,
    Rw = null,
    pY1 = 0,
    Ow = null,
    kC6 = 0,
    pr = 1,
    dh = 2 | pr,
    lY1 = 4 | pr,
    tu1 = 8 | kC6;
  class Sd0 {
    constructor(A, B, {
      exports: Q
    }) {
      r9(Number.isFinite(A[iu1]) && A[iu1] > 0), this.llhttp = Q, this.ptr = this.llhttp.llhttp_alloc(Lw.TYPE.RESPONSE), this.client = A, this.socket = B, this.timeout = null, this.timeoutValue = null, this.timeoutType = null, this.statusCode = null, this.statusText = "", this.upgrade = !1, this.headers = [], this.headersSize = 0, this.headersMaxSize = A[iu1], this.shouldKeepAlive = !1, this.paused = !1, this.resume = this.resume.bind(this), this.bytesRead = 0, this.keepAlive = "", this.contentLength = "", this.connection = "", this.maxResponseSize = A[PC6]
    }
    setTimeout(A, B) {
      if (A !== this.timeoutValue || B & pr ^ this.timeoutType & pr) {
        if (this.timeout) lu1.clearTimeout(this.timeout), this.timeout = null;
        if (A)
          if (B & pr) this.timeout = lu1.setFastTimeout(Md0, A, new WeakRef(this));
          else this.timeout = setTimeout(Md0, A, new WeakRef(this)), this.timeout.unref();
        this.timeoutValue = A
      } else if (this.timeout) {
        if (this.timeout.refresh) this.timeout.refresh()
      }
      this.timeoutType = B
    }
    resume() {
      if (this.socket.destroyed || !this.paused) return;
      if (r9(this.ptr != null), r9(u7 == null), this.llhttp.llhttp_resume(this.ptr), r9(this.timeoutType === lY1), this.timeout) {
        if (this.timeout.refresh) this.timeout.refresh()
      }
      this.paused = !1, this.execute(this.socket.read() || _C6), this.readMore()
    }
    readMore() {
      while (!this.paused && this.ptr) {
        let A = this.socket.read();
        if (A === null) break;
        this.execute(A)
      }
    }
    execute(A) {
      r9(this.ptr != null), r9(u7 == null), r9(!this.paused);
      let {
        socket: B,
        llhttp: Q
      } = this;
      if (A.length > pY1) {
        if (Ow) Q.free(Ow);
        pY1 = Math.ceil(A.length / 4096) * 4096, Ow = Q.malloc(pY1)
      }
      new Uint8Array(Q.memory.buffer, Ow, pY1).set(A);
      try {
        let I;
        try {
          Rw = A, u7 = this, I = Q.llhttp_execute(this.ptr, Ow, A.length)
        } catch (Z) {
          throw Z
        } finally {
          u7 = null, Rw = null
        }
        let G = Q.llhttp_get_error_pos(this.ptr) - Ow;
        if (I === Lw.ERROR.PAUSED_UPGRADE) this.onUpgrade(A.slice(G));
        else if (I === Lw.ERROR.PAUSED) this.paused = !0, B.unshift(A.slice(G));
        else if (I !== Lw.ERROR.OK) {
          let Z = Q.llhttp_get_error_reason(this.ptr),
            D = "";
          if (Z) {
            let Y = new Uint8Array(Q.memory.buffer, Z).indexOf(0);
            D = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(Q.memory.buffer, Z, Y).toString() + ")"
          }
          throw new wC6(D, Lw.ERROR[I], A.slice(G))
        }
      } catch (I) {
        $4.destroy(B, I)
      }
    }
    destroy() {
      r9(this.ptr != null), r9(u7 == null), this.llhttp.llhttp_free(this.ptr), this.ptr = null, this.timeout && lu1.clearTimeout(this.timeout), this.timeout = null, this.timeoutValue = null, this.timeoutType = null, this.paused = !1
    }
    onStatus(A) {
      this.statusText = A.toString()
    }
    onMessageBegin() {
      let {
        socket: A,
        client: B
      } = this;
      if (A.destroyed) return -1;
      let Q = B[aC][B[vX]];
      if (!Q) return -1;
      Q.onResponseStarted()
    }
    onHeaderField(A) {
      let B = this.headers.length;
      if ((B & 1) === 0) this.headers.push(A);
      else this.headers[B - 1] = Buffer.concat([this.headers[B - 1], A]);
      this.trackHeader(A.length)
    }
    onHeaderValue(A) {
      let B = this.headers.length;
      if ((B & 1) === 1) this.headers.push(A), B += 1;
      else this.headers[B - 1] = Buffer.concat([this.headers[B - 1], A]);
      let Q = this.headers[B - 2];
      if (Q.length === 10) {
        let I = $4.bufferToLowerCasedHeaderName(Q);
        if (I === "keep-alive") this.keepAlive += A.toString();
        else if (I === "connection") this.connection += A.toString()
      } else if (Q.length === 14 && $4.bufferToLowerCasedHeaderName(Q) === "content-length") this.contentLength += A.toString();
      this.trackHeader(A.length)
    }
    trackHeader(A) {
      if (this.headersSize += A, this.headersSize >= this.headersMaxSize) $4.destroy(this.socket, new HC6)
    }
    onUpgrade(A) {
      let {
        upgrade: B,
        client: Q,
        socket: I,
        headers: G,
        statusCode: Z
      } = this;
      r9(B), r9(Q[mh] === I), r9(!I.destroyed), r9(!this.paused), r9((G.length & 1) === 0);
      let D = Q[aC][Q[vX]];
      r9(D), r9(D.upgrade || D.method === "CONNECT"), this.statusCode = null, this.statusText = "", this.shouldKeepAlive = null, this.headers = [], this.headersSize = 0, I.unshift(A), I[i3].destroy(), I[i3] = null, I[su1] = null, I[bX] = null, jC6(I), Q[mh] = null, Q[Pd0] = null, Q[aC][Q[vX]++] = null, Q.emit("disconnect", Q[Td0], [Q], new hh("upgrade"));
      try {
        D.onUpgrade(Z, G, I)
      } catch (Y) {
        $4.destroy(I, Y)
      }
      Q[RR]()
    }
    onHeadersComplete(A, B, Q) {
      let {
        client: I,
        socket: G,
        headers: Z,
        statusText: D
      } = this;
      if (G.destroyed) return -1;
      let Y = I[aC][I[vX]];
      if (!Y) return -1;
      if (r9(!this.upgrade), r9(this.statusCode < 200), A === 100) return $4.destroy(G, new iY1("bad response", $4.getSocketInfo(G))), -1;
      if (B && !Y.upgrade) return $4.destroy(G, new iY1("bad upgrade", $4.getSocketInfo(G))), -1;
      if (r9(this.timeoutType === dh), this.statusCode = A, this.shouldKeepAlive = Q || Y.method === "HEAD" && !G[aY] && this.connection.toLowerCase() === "keep-alive", this.statusCode >= 200) {
        let J = Y.bodyTimeout != null ? Y.bodyTimeout : I[OC6];
        this.setTimeout(J, lY1)
      } else if (this.timeout) {
        if (this.timeout.refresh) this.timeout.refresh()
      }
      if (Y.method === "CONNECT") return r9(I[jZ] === 1), this.upgrade = !0, 2;
      if (B) return r9(I[jZ] === 1), this.upgrade = !0, 2;
      if (r9((this.headers.length & 1) === 0), this.headers = [], this.headersSize = 0, this.shouldKeepAlive && I[cY1]) {
        let J = this.keepAlive ? $4.parseKeepAliveTimeout(this.keepAlive) : null;
        if (J != null) {
          let F = Math.min(J - I[LC6], I[MC6]);
          if (F <= 0) G[aY] = !0;
          else I[nY1] = F
        } else I[nY1] = I[NC6]
      } else G[aY] = !0;
      let W = Y.onHeaders(A, Z, this.resume, D) === !1;
      if (Y.aborted) return -1;
      if (Y.method === "HEAD") return 1;
      if (A < 200) return 1;
      if (G[cr]) G[cr] = !1, I[RR]();
      return W ? Lw.ERROR.PAUSED : 0
    }
    onBody(A) {
      let {
        client: B,
        socket: Q,
        statusCode: I,
        maxResponseSize: G
      } = this;
      if (Q.destroyed) return -1;
      let Z = B[aC][B[vX]];
      if (r9(Z), r9(this.timeoutType === lY1), this.timeout) {
        if (this.timeout.refresh) this.timeout.refresh()
      }
      if (r9(I >= 200), G > -1 && this.bytesRead + A.length > G) return $4.destroy(Q, new EC6), -1;
      if (this.bytesRead += A.length, Z.onData(A) === !1) return Lw.ERROR.PAUSED
    }
    onMessageComplete() {
      let {
        client: A,
        socket: B,
        statusCode: Q,
        upgrade: I,
        headers: G,
        contentLength: Z,
        bytesRead: D,
        shouldKeepAlive: Y
      } = this;
      if (B.destroyed && (!Q || Y)) return -1;
      if (I) return;
      r9(Q >= 100), r9((this.headers.length & 1) === 0);
      let W = A[aC][A[vX]];
      if (r9(W), this.statusCode = null, this.statusText = "", this.bytesRead = 0, this.contentLength = "", this.keepAlive = "", this.connection = "", this.headers = [], this.headersSize = 0, Q < 200) return;
      if (W.method !== "HEAD" && Z && D !== parseInt(Z, 10)) return $4.destroy(B, new CC6), -1;
      if (W.onComplete(G), A[aC][A[vX]++] = null, B[OR]) return r9(A[jZ] === 0), $4.destroy(B, new hh("reset")), Lw.ERROR.PAUSED;
      else if (!Y) return $4.destroy(B, new hh("reset")), Lw.ERROR.PAUSED;
      else if (B[aY] && A[jZ] === 0) return $4.destroy(B, new hh("reset")), Lw.ERROR.PAUSED;
      else if (A[cY1] == null || A[cY1] === 1) setImmediate(() => A[RR]());
      else A[RR]()
    }
  }

  function Md0(A) {
    let {
      socket: B,
      timeoutType: Q,
      client: I,
      paused: G
    } = A.deref();
    if (Q === dh) {
      if (!B[OR] || B.writableNeedDrain || I[jZ] > 1) r9(!G, "cannot be paused while waiting for headers"), $4.destroy(B, new KC6)
    } else if (Q === lY1) {
      if (!G) $4.destroy(B, new zC6)
    } else if (Q === tu1) r9(I[jZ] === 0 && I[nY1]), $4.destroy(B, new hh("socket idle timeout"))
  }
  async function xC6(A, B) {
    if (A[mh] = B, !au1) au1 = await ou1, ou1 = null;
    B[ur] = !1, B[OR] = !1, B[aY] = !1, B[cr] = !1, B[i3] = new Sd0(A, B, au1), uY1(B, "error", function(I) {
      r9(I.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
      let G = this[i3];
      if (I.code === "ECONNRESET" && G.statusCode && !G.shouldKeepAlive) {
        G.onMessageComplete();
        return
      }
      this[bX] = I, this[su1][SC6](I)
    }), uY1(B, "readable", function() {
      let I = this[i3];
      if (I) I.readMore()
    }), uY1(B, "end", function() {
      let I = this[i3];
      if (I.statusCode && !I.shouldKeepAlive) {
        I.onMessageComplete();
        return
      }
      $4.destroy(this, new iY1("other side closed", $4.getSocketInfo(this)))
    }), uY1(B, "close", function() {
      let I = this[su1],
        G = this[i3];
      if (G) {
        if (!this[bX] && G.statusCode && !G.shouldKeepAlive) G.onMessageComplete();
        this[i3].destroy(), this[i3] = null
      }
      let Z = this[bX] || new iY1("closed", $4.getSocketInfo(this));
      if (I[mh] = null, I[Pd0] = null, I.destroyed) {
        r9(I[UC6] === 0);
        let D = I[aC].splice(I[vX]);
        for (let Y = 0; Y < D.length; Y++) {
          let W = D[Y];
          $4.errorRequest(I, W, Z)
        }
      } else if (I[jZ] > 0 && Z.code !== "UND_ERR_INFO") {
        let D = I[aC][I[vX]];
        I[aC][I[vX]++] = null, $4.errorRequest(I, D, Z)
      }
      I[qC6] = I[vX], r9(I[jZ] === 0), I.emit("disconnect", I[Td0], [I], Z), I[RR]()
    });
    let Q = !1;
    return B.on("close", () => {
      Q = !0
    }), {
      version: "h1",
      defaultPipelining: 1,
      write(...I) {
        return bC6(A, ...I)
      },
      resume() {
        fC6(A)
      },
      destroy(I, G) {
        if (Q) queueMicrotask(G);
        else B.destroy(I).on("close", G)
      },
      get destroyed() {
        return B.destroyed
      },
      busy(I) {
        if (B[OR] || B[aY] || B[cr]) return !0;
        if (I) {
          if (A[jZ] > 0 && !I.idempotent) return !0;
          if (A[jZ] > 0 && (I.upgrade || I.method === "CONNECT")) return !0;
          if (A[jZ] > 0 && $4.bodyLength(I.body) !== 0 && ($4.isStream(I.body) || $4.isAsyncIterable(I.body) || $4.isFormDataLike(I.body))) return !0
        }
        return !1
      }
    }
  }

  function fC6(A) {
    let B = A[mh];
    if (B && !B.destroyed) {
      if (A[$d0] === 0) {
        if (!B[ur] && B.unref) B.unref(), B[ur] = !0
      } else if (B[ur] && B.ref) B.ref(), B[ur] = !1;
      if (A[$d0] === 0) {
        if (B[i3].timeoutType !== tu1) B[i3].setTimeout(A[nY1], tu1)
      } else if (A[jZ] > 0 && B[i3].statusCode < 200) {
        if (B[i3].timeoutType !== dh) {
          let Q = A[aC][A[vX]],
            I = Q.headersTimeout != null ? Q.headersTimeout : A[RC6];
          B[i3].setTimeout(I, dh)
        }
      }
    }
  }

  function vC6(A) {
    return A !== "GET" && A !== "HEAD" && A !== "OPTIONS" && A !== "TRACE" && A !== "CONNECT"
  }

  function bC6(A, B) {
    let {
      method: Q,
      path: I,
      host: G,
      upgrade: Z,
      blocking: D,
      reset: Y
    } = B, {
      body: W,
      headers: J,
      contentLength: F
    } = B, X = Q === "PUT" || Q === "POST" || Q === "PATCH" || Q === "QUERY" || Q === "PROPFIND" || Q === "PROPPATCH";
    if ($4.isFormDataLike(W)) {
      if (!nu1) nu1 = gh().extractBody;
      let [N, q] = nu1(W);
      if (B.contentType == null) J.push("content-type", q);
      W = N.stream, F = N.length
    } else if ($4.isBlobLike(W) && B.contentType == null && W.type) J.push("content-type", W.type);
    if (W && typeof W.read === "function") W.read(0);
    let V = $4.bodyLength(W);
    if (F = V ?? F, F === null) F = B.contentLength;
    if (F === 0 && !X) F = null;
    if (vC6(Q) && F > 0 && B.contentLength !== null && B.contentLength !== F) {
      if (A[ru1]) return $4.errorRequest(A, B, new Xj), !1;
      process.emitWarning(new Xj)
    }
    let C = A[mh],
      K = (N) => {
        if (B.aborted || B.completed) return;
        $4.errorRequest(A, B, N || new Od0), $4.destroy(W), $4.destroy(C, new hh("aborted"))
      };
    try {
      B.onConnect(K)
    } catch (N) {
      $4.errorRequest(A, B, N)
    }
    if (B.aborted) return !1;
    if (Q === "HEAD") C[aY] = !0;
    if (Z || Q === "CONNECT") C[aY] = !0;
    if (Y != null) C[aY] = Y;
    if (A[qd0] && C[TC6]++ >= A[qd0]) C[aY] = !0;
    if (D) C[cr] = !0;
    let E = `${Q} ${I} HTTP/1.1\r
`;
    if (typeof G === "string") E += `host: ${G}\r
`;
    else E += A[$C6];
    if (Z) E += `connection: upgrade\r
upgrade: ${Z}\r
`;
    else if (A[cY1] && !C[aY]) E += `connection: keep-alive\r
`;
    else E += `connection: close\r
`;
    if (Array.isArray(J))
      for (let N = 0; N < J.length; N += 2) {
        let q = J[N + 0],
          O = J[N + 1];
        if (Array.isArray(O))
          for (let R = 0; R < O.length; R++) E += `${q}: ${O[R]}\r
`;
        else E += `${q}: ${O}\r
`
      }
    if (Nd0.sendHeaders.hasSubscribers) Nd0.sendHeaders.publish({
      request: B,
      headers: E,
      socket: C
    });
    if (!W || V === 0) Ld0(K, null, A, B, C, F, E, X);
    else if ($4.isBuffer(W)) Ld0(K, W, A, B, C, F, E, X);
    else if ($4.isBlobLike(W))
      if (typeof W.stream === "function") Rd0(K, W.stream(), A, B, C, F, E, X);
      else hC6(K, W, A, B, C, F, E, X);
    else if ($4.isStream(W)) gC6(K, W, A, B, C, F, E, X);
    else if ($4.isIterable(W)) Rd0(K, W, A, B, C, F, E, X);
    else r9(!1);
    return !0
  }

  function gC6(A, B, Q, I, G, Z, D, Y) {
    r9(Z !== 0 || Q[jZ] === 0, "stream body cannot be pipelined");
    let W = !1,
      J = new eu1({
        abort: A,
        socket: G,
        request: I,
        contentLength: Z,
        client: Q,
        expectsPayload: Y,
        header: D
      }),
      F = function(K) {
        if (W) return;
        try {
          if (!J.write(K) && this.pause) this.pause()
        } catch (E) {
          $4.destroy(this, E)
        }
      },
      X = function() {
        if (W) return;
        if (B.resume) B.resume()
      },
      V = function() {
        if (queueMicrotask(() => {
            B.removeListener("error", C)
          }), !W) {
          let K = new Od0;
          queueMicrotask(() => C(K))
        }
      },
      C = function(K) {
        if (W) return;
        if (W = !0, r9(G.destroyed || G[OR] && Q[jZ] <= 1), G.off("drain", X).off("error", C), B.removeListener("data", F).removeListener("end", C).removeListener("close", V), !K) try {
          J.end()
        } catch (E) {
          K = E
        }
        if (J.destroy(K), K && (K.code !== "UND_ERR_INFO" || K.message !== "reset")) $4.destroy(B, K);
        else $4.destroy(B)
      };
    if (B.on("data", F).on("end", C).on("error", C).on("close", V), B.resume) B.resume();
    if (G.on("drain", X).on("error", C), B.errorEmitted ?? B.errored) setImmediate(() => C(B.errored));
    else if (B.endEmitted ?? B.readableEnded) setImmediate(() => C(null));
    if (B.closeEmitted ?? B.closed) setImmediate(V)
  }

  function Ld0(A, B, Q, I, G, Z, D, Y) {
    try {
      if (!B)
        if (Z === 0) G.write(`${D}content-length: 0\r
\r
`, "latin1");
        else r9(Z === null, "no body must not have content length"), G.write(`${D}\r
`, "latin1");
      else if ($4.isBuffer(B)) {
        if (r9(Z === B.byteLength, "buffer body must have content length"), G.cork(), G.write(`${D}content-length: ${Z}\r
\r
`, "latin1"), G.write(B), G.uncork(), I.onBodySent(B), !Y && I.reset !== !1) G[aY] = !0
      }
      I.onRequestSent(), Q[RR]()
    } catch (W) {
      A(W)
    }
  }
  async function hC6(A, B, Q, I, G, Z, D, Y) {
    r9(Z === B.size, "blob body must have content length");
    try {
      if (Z != null && Z !== B.size) throw new Xj;
      let W = Buffer.from(await B.arrayBuffer());
      if (G.cork(), G.write(`${D}content-length: ${Z}\r
\r
`, "latin1"), G.write(W), G.uncork(), I.onBodySent(W), I.onRequestSent(), !Y && I.reset !== !1) G[aY] = !0;
      Q[RR]()
    } catch (W) {
      A(W)
    }
  }
  async function Rd0(A, B, Q, I, G, Z, D, Y) {
    r9(Z !== 0 || Q[jZ] === 0, "iterator body cannot be pipelined");
    let W = null;

    function J() {
      if (W) {
        let V = W;
        W = null, V()
      }
    }
    let F = () => new Promise((V, C) => {
      if (r9(W === null), G[bX]) C(G[bX]);
      else W = V
    });
    G.on("close", J).on("drain", J);
    let X = new eu1({
      abort: A,
      socket: G,
      request: I,
      contentLength: Z,
      client: Q,
      expectsPayload: Y,
      header: D
    });
    try {
      for await (let V of B) {
        if (G[bX]) throw G[bX];
        if (!X.write(V)) await F()
      }
      X.end()
    } catch (V) {
      X.destroy(V)
    } finally {
      G.off("close", J).off("drain", J)
    }
  }
  class eu1 {
    constructor({
      abort: A,
      socket: B,
      request: Q,
      contentLength: I,
      client: G,
      expectsPayload: Z,
      header: D
    }) {
      this.socket = B, this.request = Q, this.contentLength = I, this.client = G, this.bytesWritten = 0, this.expectsPayload = Z, this.header = D, this.abort = A, B[OR] = !0
    }
    write(A) {
      let {
        socket: B,
        request: Q,
        contentLength: I,
        client: G,
        bytesWritten: Z,
        expectsPayload: D,
        header: Y
      } = this;
      if (B[bX]) throw B[bX];
      if (B.destroyed) return !1;
      let W = Buffer.byteLength(A);
      if (!W) return !0;
      if (I !== null && Z + W > I) {
        if (G[ru1]) throw new Xj;
        process.emitWarning(new Xj)
      }
      if (B.cork(), Z === 0) {
        if (!D && Q.reset !== !1) B[aY] = !0;
        if (I === null) B.write(`${Y}transfer-encoding: chunked\r
`, "latin1");
        else B.write(`${Y}content-length: ${I}\r
\r
`, "latin1")
      }
      if (I === null) B.write(`\r
${W.toString(16)}\r
`, "latin1");
      this.bytesWritten += W;
      let J = B.write(A);
      if (B.uncork(), Q.onBodySent(A), !J) {
        if (B[i3].timeout && B[i3].timeoutType === dh) {
          if (B[i3].timeout.refresh) B[i3].timeout.refresh()
        }
      }
      return J
    }
    end() {
      let {
        socket: A,
        contentLength: B,
        client: Q,
        bytesWritten: I,
        expectsPayload: G,
        header: Z,
        request: D
      } = this;
      if (D.onRequestSent(), A[OR] = !1, A[bX]) throw A[bX];
      if (A.destroyed) return;
      if (I === 0)
        if (G) A.write(`${Z}content-length: 0\r
\r
`, "latin1");
        else A.write(`${Z}\r
`, "latin1");
      else if (B === null) A.write(`\r
0\r
\r
`, "latin1");
      if (B !== null && I !== B)
        if (Q[ru1]) throw new Xj;
        else process.emitWarning(new Xj);
      if (A[i3].timeout && A[i3].timeoutType === dh) {
        if (A[i3].timeout.refresh) A[i3].timeout.refresh()
      }
      Q[RR]()
    }
    destroy(A) {
      let {
        socket: B,
        client: Q,
        abort: I
      } = this;
      if (B[OR] = !1, A) r9(Q[jZ] <= 1, "pipeline should only contain this request"), I(A)
    }
  }
  _d0.exports = xC6
})
// @from(Start 5466899, End 5476838)
hd0 = z((dR8, gd0) => {
  var gX = Z1("node:assert"),
    {
      pipeline: mC6
    } = Z1("node:stream"),
    k6 = C6(),
    {
      RequestContentLengthMismatchError: Ap1,
      RequestAbortedError: yd0,
      SocketError: lr,
      InformationalError: Bp1
    } = u5(),
    {
      kUrl: aY1,
      kReset: rY1,
      kClient: uh,
      kRunning: oY1,
      kPending: dC6,
      kQueue: TR,
      kPendingIdx: Qp1,
      kRunningIdx: sC,
      kError: oC,
      kSocket: PI,
      kStrictContentLength: uC6,
      kOnError: Ip1,
      kMaxConcurrentStreams: bd0,
      kHTTP2Session: rC,
      kResume: PR,
      kSize: pC6,
      kHTTPContext: cC6
    } = A3(),
    uN = Symbol("open streams"),
    kd0, xd0 = !1,
    sY1;
  try {
    sY1 = Z1("node:http2")
  } catch {
    sY1 = {
      constants: {}
    }
  }
  var {
    constants: {
      HTTP2_HEADER_AUTHORITY: lC6,
      HTTP2_HEADER_METHOD: iC6,
      HTTP2_HEADER_PATH: nC6,
      HTTP2_HEADER_SCHEME: aC6,
      HTTP2_HEADER_CONTENT_LENGTH: sC6,
      HTTP2_HEADER_EXPECT: rC6,
      HTTP2_HEADER_STATUS: oC6
    }
  } = sY1;

  function tC6(A) {
    let B = [];
    for (let [Q, I] of Object.entries(A))
      if (Array.isArray(I))
        for (let G of I) B.push(Buffer.from(Q), Buffer.from(G));
      else B.push(Buffer.from(Q), Buffer.from(I));
    return B
  }
  async function eC6(A, B) {
    if (A[PI] = B, !xd0) xd0 = !0, process.emitWarning("H2 support is experimental, expect them to change at any time.", {
      code: "UNDICI-H2"
    });
    let Q = sY1.connect(A[aY1], {
      createConnection: () => B,
      peerMaxConcurrentStreams: A[bd0]
    });
    Q[uN] = 0, Q[uh] = A, Q[PI] = B, k6.addListener(Q, "error", BK6), k6.addListener(Q, "frameError", QK6), k6.addListener(Q, "end", IK6), k6.addListener(Q, "goaway", GK6), k6.addListener(Q, "close", function() {
      let {
        [uh]: G
      } = this, {
        [PI]: Z
      } = G, D = this[PI][oC] || this[oC] || new lr("closed", k6.getSocketInfo(Z));
      if (G[rC] = null, G.destroyed) {
        gX(G[dC6] === 0);
        let Y = G[TR].splice(G[sC]);
        for (let W = 0; W < Y.length; W++) {
          let J = Y[W];
          k6.errorRequest(G, J, D)
        }
      }
    }), Q.unref(), A[rC] = Q, B[rC] = Q, k6.addListener(B, "error", function(G) {
      gX(G.code !== "ERR_TLS_CERT_ALTNAME_INVALID"), this[oC] = G, this[uh][Ip1](G)
    }), k6.addListener(B, "end", function() {
      k6.destroy(this, new lr("other side closed", k6.getSocketInfo(this)))
    }), k6.addListener(B, "close", function() {
      let G = this[oC] || new lr("closed", k6.getSocketInfo(this));
      if (A[PI] = null, this[rC] != null) this[rC].destroy(G);
      A[Qp1] = A[sC], gX(A[oY1] === 0), A.emit("disconnect", A[aY1], [A], G), A[PR]()
    });
    let I = !1;
    return B.on("close", () => {
      I = !0
    }), {
      version: "h2",
      defaultPipelining: 1 / 0,
      write(...G) {
        return DK6(A, ...G)
      },
      resume() {
        AK6(A)
      },
      destroy(G, Z) {
        if (I) queueMicrotask(Z);
        else B.destroy(G).on("close", Z)
      },
      get destroyed() {
        return B.destroyed
      },
      busy() {
        return !1
      }
    }
  }

  function AK6(A) {
    let B = A[PI];
    if (B?.destroyed === !1)
      if (A[pC6] === 0 && A[bd0] === 0) B.unref(), A[rC].unref();
      else B.ref(), A[rC].ref()
  }

  function BK6(A) {
    gX(A.code !== "ERR_TLS_CERT_ALTNAME_INVALID"), this[PI][oC] = A, this[uh][Ip1](A)
  }

  function QK6(A, B, Q) {
    if (Q === 0) {
      let I = new Bp1(`HTTP/2: "frameError" received - type ${A}, code ${B}`);
      this[PI][oC] = I, this[uh][Ip1](I)
    }
  }

  function IK6() {
    let A = new lr("other side closed", k6.getSocketInfo(this[PI]));
    this.destroy(A), k6.destroy(this[PI], A)
  }

  function GK6(A) {
    let B = this[oC] || new lr(`HTTP/2: "GOAWAY" frame received with code ${A}`, k6.getSocketInfo(this)),
      Q = this[uh];
    if (Q[PI] = null, Q[cC6] = null, this[rC] != null) this[rC].destroy(B), this[rC] = null;
    if (k6.destroy(this[PI], B), Q[sC] < Q[TR].length) {
      let I = Q[TR][Q[sC]];
      Q[TR][Q[sC]++] = null, k6.errorRequest(Q, I, B), Q[Qp1] = Q[sC]
    }
    gX(Q[oY1] === 0), Q.emit("disconnect", Q[aY1], [Q], B), Q[PR]()
  }

  function ZK6(A) {
    return A !== "GET" && A !== "HEAD" && A !== "OPTIONS" && A !== "TRACE" && A !== "CONNECT"
  }

  function DK6(A, B) {
    let Q = A[rC],
      {
        method: I,
        path: G,
        host: Z,
        upgrade: D,
        expectContinue: Y,
        signal: W,
        headers: J
      } = B,
      {
        body: F
      } = B;
    if (D) return k6.errorRequest(A, B, new Error("Upgrade not supported for H2")), !1;
    let X = {};
    for (let T = 0; T < J.length; T += 2) {
      let L = J[T + 0],
        _ = J[T + 1];
      if (Array.isArray(_))
        for (let k = 0; k < _.length; k++)
          if (X[L]) X[L] += `,${_[k]}`;
          else X[L] = _[k];
      else X[L] = _
    }
    let V, {
      hostname: C,
      port: K
    } = A[aY1];
    X[lC6] = Z || `${C}${K?`:${K}`:""}`, X[iC6] = I;
    let E = (T) => {
      if (B.aborted || B.completed) return;
      if (T = T || new yd0, k6.errorRequest(A, B, T), V != null) k6.destroy(V, T);
      k6.destroy(F, T), A[TR][A[sC]++] = null, A[PR]()
    };
    try {
      B.onConnect(E)
    } catch (T) {
      k6.errorRequest(A, B, T)
    }
    if (B.aborted) return !1;
    if (I === "CONNECT") {
      if (Q.ref(), V = Q.request(X, {
          endStream: !1,
          signal: W
        }), V.id && !V.pending) B.onUpgrade(null, null, V), ++Q[uN], A[TR][A[sC]++] = null;
      else V.once("ready", () => {
        B.onUpgrade(null, null, V), ++Q[uN], A[TR][A[sC]++] = null
      });
      return V.once("close", () => {
        if (Q[uN] -= 1, Q[uN] === 0) Q.unref()
      }), !0
    }
    X[nC6] = G, X[aC6] = "https";
    let N = I === "PUT" || I === "POST" || I === "PATCH";
    if (F && typeof F.read === "function") F.read(0);
    let q = k6.bodyLength(F);
    if (k6.isFormDataLike(F)) {
      kd0 ??= gh().extractBody;
      let [T, L] = kd0(F);
      X["content-type"] = L, F = T.stream, q = T.length
    }
    if (q == null) q = B.contentLength;
    if (q === 0 || !N) q = null;
    if (ZK6(I) && q > 0 && B.contentLength != null && B.contentLength !== q) {
      if (A[uC6]) return k6.errorRequest(A, B, new Ap1), !1;
      process.emitWarning(new Ap1)
    }
    if (q != null) gX(F, "no body must not have content length"), X[sC6] = `${q}`;
    Q.ref();
    let O = I === "GET" || I === "HEAD" || F === null;
    if (Y) X[rC6] = "100-continue", V = Q.request(X, {
      endStream: O,
      signal: W
    }), V.once("continue", R);
    else V = Q.request(X, {
      endStream: O,
      signal: W
    }), R();
    return ++Q[uN], V.once("response", (T) => {
      let {
        [oC6]: L, ..._
      } = T;
      if (B.onResponseStarted(), B.aborted) {
        let k = new yd0;
        k6.errorRequest(A, B, k), k6.destroy(V, k);
        return
      }
      if (B.onHeaders(Number(L), tC6(_), V.resume.bind(V), "") === !1) V.pause();
      V.on("data", (k) => {
        if (B.onData(k) === !1) V.pause()
      })
    }), V.once("end", () => {
      if (V.state?.state == null || V.state.state < 6) B.onComplete([]);
      if (Q[uN] === 0) Q.unref();
      E(new Bp1("HTTP/2: stream half-closed (remote)")), A[TR][A[sC]++] = null, A[Qp1] = A[sC], A[PR]()
    }), V.once("close", () => {
      if (Q[uN] -= 1, Q[uN] === 0) Q.unref()
    }), V.once("error", function(T) {
      E(T)
    }), V.once("frameError", (T, L) => {
      E(new Bp1(`HTTP/2: "frameError" received - type ${T}, code ${L}`))
    }), !0;

    function R() {
      if (!F || q === 0) fd0(E, V, null, A, B, A[PI], q, N);
      else if (k6.isBuffer(F)) fd0(E, V, F, A, B, A[PI], q, N);
      else if (k6.isBlobLike(F))
        if (typeof F.stream === "function") vd0(E, V, F.stream(), A, B, A[PI], q, N);
        else WK6(E, V, F, A, B, A[PI], q, N);
      else if (k6.isStream(F)) YK6(E, A[PI], N, V, F, A, B, q);
      else if (k6.isIterable(F)) vd0(E, V, F, A, B, A[PI], q, N);
      else gX(!1)
    }
  }

  function fd0(A, B, Q, I, G, Z, D, Y) {
    try {
      if (Q != null && k6.isBuffer(Q)) gX(D === Q.byteLength, "buffer body must have content length"), B.cork(), B.write(Q), B.uncork(), B.end(), G.onBodySent(Q);
      if (!Y) Z[rY1] = !0;
      G.onRequestSent(), I[PR]()
    } catch (W) {
      A(W)
    }
  }

  function YK6(A, B, Q, I, G, Z, D, Y) {
    gX(Y !== 0 || Z[oY1] === 0, "stream body cannot be pipelined");
    let W = mC6(G, I, (F) => {
      if (F) k6.destroy(W, F), A(F);
      else {
        if (k6.removeAllListeners(W), D.onRequestSent(), !Q) B[rY1] = !0;
        Z[PR]()
      }
    });
    k6.addListener(W, "data", J);

    function J(F) {
      D.onBodySent(F)
    }
  }
  async function WK6(A, B, Q, I, G, Z, D, Y) {
    gX(D === Q.size, "blob body must have content length");
    try {
      if (D != null && D !== Q.size) throw new Ap1;
      let W = Buffer.from(await Q.arrayBuffer());
      if (B.cork(), B.write(W), B.uncork(), B.end(), G.onBodySent(W), G.onRequestSent(), !Y) Z[rY1] = !0;
      I[PR]()
    } catch (W) {
      A(W)
    }
  }
  async function vd0(A, B, Q, I, G, Z, D, Y) {
    gX(D !== 0 || I[oY1] === 0, "iterator body cannot be pipelined");
    let W = null;

    function J() {
      if (W) {
        let X = W;
        W = null, X()
      }
    }
    let F = () => new Promise((X, V) => {
      if (gX(W === null), Z[oC]) V(Z[oC]);
      else W = X
    });
    B.on("close", J).on("drain", J);
    try {
      for await (let X of Q) {
        if (Z[oC]) throw Z[oC];
        let V = B.write(X);
        if (G.onBodySent(X), !V) await F()
      }
      if (B.end(), G.onRequestSent(), !Y) Z[rY1] = !0;
      I[PR]()
    } catch (X) {
      A(X)
    } finally {
      B.off("close", J).off("drain", J)
    }
  }
  gd0.exports = eC6
})
// @from(Start 5476844, End 5481006)
tY1 = z((uR8, pd0) => {
  var Tw = C6(),
    {
      kBodyUsed: ir
    } = A3(),
    Zp1 = Z1("node:assert"),
    {
      InvalidArgumentError: JK6
    } = u5(),
    FK6 = Z1("node:events"),
    XK6 = [300, 301, 302, 303, 307, 308],
    md0 = Symbol("body");
  class Gp1 {
    constructor(A) {
      this[md0] = A, this[ir] = !1
    }
    async * [Symbol.asyncIterator]() {
      Zp1(!this[ir], "disturbed"), this[ir] = !0, yield* this[md0]
    }
  }
  class ud0 {
    constructor(A, B, Q, I) {
      if (B != null && (!Number.isInteger(B) || B < 0)) throw new JK6("maxRedirections must be a positive number");
      if (Tw.validateHandler(I, Q.method, Q.upgrade), this.dispatch = A, this.location = null, this.abort = null, this.opts = {
          ...Q,
          maxRedirections: 0
        }, this.maxRedirections = B, this.handler = I, this.history = [], this.redirectionLimitReached = !1, Tw.isStream(this.opts.body)) {
        if (Tw.bodyLength(this.opts.body) === 0) this.opts.body.on("data", function() {
          Zp1(!1)
        });
        if (typeof this.opts.body.readableDidRead !== "boolean") this.opts.body[ir] = !1, FK6.prototype.on.call(this.opts.body, "data", function() {
          this[ir] = !0
        })
      } else if (this.opts.body && typeof this.opts.body.pipeTo === "function") this.opts.body = new Gp1(this.opts.body);
      else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && Tw.isIterable(this.opts.body)) this.opts.body = new Gp1(this.opts.body)
    }
    onConnect(A) {
      this.abort = A, this.handler.onConnect(A, {
        history: this.history
      })
    }
    onUpgrade(A, B, Q) {
      this.handler.onUpgrade(A, B, Q)
    }
    onError(A) {
      this.handler.onError(A)
    }
    onHeaders(A, B, Q, I) {
      if (this.location = this.history.length >= this.maxRedirections || Tw.isDisturbed(this.opts.body) ? null : VK6(A, B), this.opts.throwOnMaxRedirect && this.history.length >= this.maxRedirections) {
        if (this.request) this.request.abort(new Error("max redirects"));
        this.redirectionLimitReached = !0, this.abort(new Error("max redirects"));
        return
      }
      if (this.opts.origin) this.history.push(new URL(this.opts.path, this.opts.origin));
      if (!this.location) return this.handler.onHeaders(A, B, Q, I);
      let {
        origin: G,
        pathname: Z,
        search: D
      } = Tw.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin))), Y = D ? `${Z}${D}` : Z;
      if (this.opts.headers = CK6(this.opts.headers, A === 303, this.opts.origin !== G), this.opts.path = Y, this.opts.origin = G, this.opts.maxRedirections = 0, this.opts.query = null, A === 303 && this.opts.method !== "HEAD") this.opts.method = "GET", this.opts.body = null
    }
    onData(A) {
      if (this.location);
      else return this.handler.onData(A)
    }
    onComplete(A) {
      if (this.location) this.location = null, this.abort = null, this.dispatch(this.opts, this);
      else this.handler.onComplete(A)
    }
    onBodySent(A) {
      if (this.handler.onBodySent) this.handler.onBodySent(A)
    }
  }

  function VK6(A, B) {
    if (XK6.indexOf(A) === -1) return null;
    for (let Q = 0; Q < B.length; Q += 2)
      if (B[Q].length === 8 && Tw.headerNameToString(B[Q]) === "location") return B[Q + 1]
  }

  function dd0(A, B, Q) {
    if (A.length === 4) return Tw.headerNameToString(A) === "host";
    if (B && Tw.headerNameToString(A).startsWith("content-")) return !0;
    if (Q && (A.length === 13 || A.length === 6 || A.length === 19)) {
      let I = Tw.headerNameToString(A);
      return I === "authorization" || I === "cookie" || I === "proxy-authorization"
    }
    return !1
  }

  function CK6(A, B, Q) {
    let I = [];
    if (Array.isArray(A)) {
      for (let G = 0; G < A.length; G += 2)
        if (!dd0(A[G], B, Q)) I.push(A[G], A[G + 1])
    } else if (A && typeof A === "object") {
      for (let G of Object.keys(A))
        if (!dd0(G, B, Q)) I.push(G, A[G])
    } else Zp1(A == null, "headers must be an object or an array");
    return I
  }
  pd0.exports = ud0
})
// @from(Start 5481012, End 5481411)
eY1 = z((pR8, cd0) => {
  var KK6 = tY1();

  function HK6({
    maxRedirections: A
  }) {
    return (B) => {
      return function Q(I, G) {
        let {
          maxRedirections: Z = A
        } = I;
        if (!Z) return B(I, G);
        let D = new KK6(B, Z, I, G);
        return I = {
          ...I,
          maxRedirections: 0
        }, B(I, D)
      }
    }
  }
  cd0.exports = HK6
})
// @from(Start 5481417, End 5492692)
er = z((cR8, Bu0) => {
  var pN = Z1("node:assert"),
    rd0 = Z1("node:net"),
    zK6 = Z1("node:http"),
    Vj = C6(),
    {
      channels: ph
    } = Rh(),
    wK6 = vh0(),
    EK6 = Sh(),
    {
      InvalidArgumentError: jQ,
      InformationalError: UK6,
      ClientDestroyedError: NK6
    } = u5(),
    $K6 = xr(),
    {
      kUrl: Pw,
      kServerName: SR,
      kClient: qK6,
      kBusy: Dp1,
      kConnect: MK6,
      kResuming: Cj,
      kRunning: or,
      kPending: tr,
      kSize: rr,
      kQueue: tC,
      kConnected: LK6,
      kConnecting: ch,
      kNeedDrain: jR,
      kKeepAliveDefaultTimeout: ld0,
      kHostHeader: RK6,
      kPendingIdx: eC,
      kRunningIdx: cN,
      kError: OK6,
      kPipelining: AW1,
      kKeepAliveTimeoutValue: TK6,
      kMaxHeadersSize: PK6,
      kKeepAliveMaxTimeout: SK6,
      kKeepAliveTimeoutThreshold: _K6,
      kHeadersTimeout: jK6,
      kBodyTimeout: yK6,
      kStrictContentLength: kK6,
      kConnector: nr,
      kMaxRedirections: xK6,
      kMaxRequests: Yp1,
      kCounter: fK6,
      kClose: vK6,
      kDestroy: bK6,
      kDispatch: gK6,
      kInterceptors: id0,
      kLocalAddress: ar,
      kMaxResponseSize: hK6,
      kOnError: mK6,
      kHTTPContext: yQ,
      kMaxConcurrentStreams: dK6,
      kResume: sr
    } = A3(),
    uK6 = jd0(),
    pK6 = hd0(),
    nd0 = !1,
    _R = Symbol("kClosedResolve"),
    ad0 = () => {};

  function od0(A) {
    return A[AW1] ?? A[yQ]?.defaultPipelining ?? 1
  }
  class td0 extends EK6 {
    constructor(A, {
      interceptors: B,
      maxHeaderSize: Q,
      headersTimeout: I,
      socketTimeout: G,
      requestTimeout: Z,
      connectTimeout: D,
      bodyTimeout: Y,
      idleTimeout: W,
      keepAlive: J,
      keepAliveTimeout: F,
      maxKeepAliveTimeout: X,
      keepAliveMaxTimeout: V,
      keepAliveTimeoutThreshold: C,
      socketPath: K,
      pipelining: E,
      tls: N,
      strictContentLength: q,
      maxCachedSessions: O,
      maxRedirections: R,
      connect: T,
      maxRequestsPerClient: L,
      localAddress: _,
      maxResponseSize: k,
      autoSelectFamily: i,
      autoSelectFamilyAttemptTimeout: x,
      maxConcurrentStreams: s,
      allowH2: d
    } = {}) {
      super();
      if (J !== void 0) throw new jQ("unsupported keepAlive, use pipelining=0 instead");
      if (G !== void 0) throw new jQ("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
      if (Z !== void 0) throw new jQ("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
      if (W !== void 0) throw new jQ("unsupported idleTimeout, use keepAliveTimeout instead");
      if (X !== void 0) throw new jQ("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
      if (Q != null && !Number.isFinite(Q)) throw new jQ("invalid maxHeaderSize");
      if (K != null && typeof K !== "string") throw new jQ("invalid socketPath");
      if (D != null && (!Number.isFinite(D) || D < 0)) throw new jQ("invalid connectTimeout");
      if (F != null && (!Number.isFinite(F) || F <= 0)) throw new jQ("invalid keepAliveTimeout");
      if (V != null && (!Number.isFinite(V) || V <= 0)) throw new jQ("invalid keepAliveMaxTimeout");
      if (C != null && !Number.isFinite(C)) throw new jQ("invalid keepAliveTimeoutThreshold");
      if (I != null && (!Number.isInteger(I) || I < 0)) throw new jQ("headersTimeout must be a positive integer or zero");
      if (Y != null && (!Number.isInteger(Y) || Y < 0)) throw new jQ("bodyTimeout must be a positive integer or zero");
      if (T != null && typeof T !== "function" && typeof T !== "object") throw new jQ("connect must be a function or an object");
      if (R != null && (!Number.isInteger(R) || R < 0)) throw new jQ("maxRedirections must be a positive number");
      if (L != null && (!Number.isInteger(L) || L < 0)) throw new jQ("maxRequestsPerClient must be a positive number");
      if (_ != null && (typeof _ !== "string" || rd0.isIP(_) === 0)) throw new jQ("localAddress must be valid string IP address");
      if (k != null && (!Number.isInteger(k) || k < -1)) throw new jQ("maxResponseSize must be a positive number");
      if (x != null && (!Number.isInteger(x) || x < -1)) throw new jQ("autoSelectFamilyAttemptTimeout must be a positive number");
      if (d != null && typeof d !== "boolean") throw new jQ("allowH2 must be a valid boolean value");
      if (s != null && (typeof s !== "number" || s < 1)) throw new jQ("maxConcurrentStreams must be a positive integer, greater than 0");
      if (typeof T !== "function") T = $K6({
        ...N,
        maxCachedSessions: O,
        allowH2: d,
        socketPath: K,
        timeout: D,
        ...i ? {
          autoSelectFamily: i,
          autoSelectFamilyAttemptTimeout: x
        } : void 0,
        ...T
      });
      if (B?.Client && Array.isArray(B.Client)) {
        if (this[id0] = B.Client, !nd0) nd0 = !0, process.emitWarning("Client.Options#interceptor is deprecated. Use Dispatcher#compose instead.", {
          code: "UNDICI-CLIENT-INTERCEPTOR-DEPRECATED"
        })
      } else this[id0] = [cK6({
        maxRedirections: R
      })];
      this[Pw] = Vj.parseOrigin(A), this[nr] = T, this[AW1] = E != null ? E : 1, this[PK6] = Q || zK6.maxHeaderSize, this[ld0] = F == null ? 4000 : F, this[SK6] = V == null ? 600000 : V, this[_K6] = C == null ? 2000 : C, this[TK6] = this[ld0], this[SR] = null, this[ar] = _ != null ? _ : null, this[Cj] = 0, this[jR] = 0, this[RK6] = `host: ${this[Pw].hostname}${this[Pw].port?`:${this[Pw].port}`:""}\r
`, this[yK6] = Y != null ? Y : 300000, this[jK6] = I != null ? I : 300000, this[kK6] = q == null ? !0 : q, this[xK6] = R, this[Yp1] = L, this[_R] = null, this[hK6] = k > -1 ? k : -1, this[dK6] = s != null ? s : 100, this[yQ] = null, this[tC] = [], this[cN] = 0, this[eC] = 0, this[sr] = (F1) => Wp1(this, F1), this[mK6] = (F1) => ed0(this, F1)
    }
    get pipelining() {
      return this[AW1]
    }
    set pipelining(A) {
      this[AW1] = A, this[sr](!0)
    }
    get[tr]() {
      return this[tC].length - this[eC]
    }
    get[or]() {
      return this[eC] - this[cN]
    }
    get[rr]() {
      return this[tC].length - this[cN]
    }
    get[LK6]() {
      return !!this[yQ] && !this[ch] && !this[yQ].destroyed
    }
    get[Dp1]() {
      return Boolean(this[yQ]?.busy(null) || this[rr] >= (od0(this) || 1) || this[tr] > 0)
    } [MK6](A) {
      Au0(this), this.once("connect", A)
    } [gK6](A, B) {
      let Q = A.origin || this[Pw].origin,
        I = new wK6(Q, A, B);
      if (this[tC].push(I), this[Cj]);
      else if (Vj.bodyLength(I.body) == null && Vj.isIterable(I.body)) this[Cj] = 1, queueMicrotask(() => Wp1(this));
      else this[sr](!0);
      if (this[Cj] && this[jR] !== 2 && this[Dp1]) this[jR] = 2;
      return this[jR] < 2
    }
    async [vK6]() {
      return new Promise((A) => {
        if (this[rr]) this[_R] = A;
        else A(null)
      })
    }
    async [bK6](A) {
      return new Promise((B) => {
        let Q = this[tC].splice(this[eC]);
        for (let G = 0; G < Q.length; G++) {
          let Z = Q[G];
          Vj.errorRequest(this, Z, A)
        }
        let I = () => {
          if (this[_R]) this[_R](), this[_R] = null;
          B(null)
        };
        if (this[yQ]) this[yQ].destroy(A, I), this[yQ] = null;
        else queueMicrotask(I);
        this[sr]()
      })
    }
  }
  var cK6 = eY1();

  function ed0(A, B) {
    if (A[or] === 0 && B.code !== "UND_ERR_INFO" && B.code !== "UND_ERR_SOCKET") {
      pN(A[eC] === A[cN]);
      let Q = A[tC].splice(A[cN]);
      for (let I = 0; I < Q.length; I++) {
        let G = Q[I];
        Vj.errorRequest(A, G, B)
      }
      pN(A[rr] === 0)
    }
  }
  async function Au0(A) {
    pN(!A[ch]), pN(!A[yQ]);
    let {
      host: B,
      hostname: Q,
      protocol: I,
      port: G
    } = A[Pw];
    if (Q[0] === "[") {
      let Z = Q.indexOf("]");
      pN(Z !== -1);
      let D = Q.substring(1, Z);
      pN(rd0.isIP(D)), Q = D
    }
    if (A[ch] = !0, ph.beforeConnect.hasSubscribers) ph.beforeConnect.publish({
      connectParams: {
        host: B,
        hostname: Q,
        protocol: I,
        port: G,
        version: A[yQ]?.version,
        servername: A[SR],
        localAddress: A[ar]
      },
      connector: A[nr]
    });
    try {
      let Z = await new Promise((D, Y) => {
        A[nr]({
          host: B,
          hostname: Q,
          protocol: I,
          port: G,
          servername: A[SR],
          localAddress: A[ar]
        }, (W, J) => {
          if (W) Y(W);
          else D(J)
        })
      });
      if (A.destroyed) {
        Vj.destroy(Z.on("error", ad0), new NK6);
        return
      }
      pN(Z);
      try {
        A[yQ] = Z.alpnProtocol === "h2" ? await pK6(A, Z) : await uK6(A, Z)
      } catch (D) {
        throw Z.destroy().on("error", ad0), D
      }
      if (A[ch] = !1, Z[fK6] = 0, Z[Yp1] = A[Yp1], Z[qK6] = A, Z[OK6] = null, ph.connected.hasSubscribers) ph.connected.publish({
        connectParams: {
          host: B,
          hostname: Q,
          protocol: I,
          port: G,
          version: A[yQ]?.version,
          servername: A[SR],
          localAddress: A[ar]
        },
        connector: A[nr],
        socket: Z
      });
      A.emit("connect", A[Pw], [A])
    } catch (Z) {
      if (A.destroyed) return;
      if (A[ch] = !1, ph.connectError.hasSubscribers) ph.connectError.publish({
        connectParams: {
          host: B,
          hostname: Q,
          protocol: I,
          port: G,
          version: A[yQ]?.version,
          servername: A[SR],
          localAddress: A[ar]
        },
        connector: A[nr],
        error: Z
      });
      if (Z.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
        pN(A[or] === 0);
        while (A[tr] > 0 && A[tC][A[eC]].servername === A[SR]) {
          let D = A[tC][A[eC]++];
          Vj.errorRequest(A, D, Z)
        }
      } else ed0(A, Z);
      A.emit("connectionError", A[Pw], [A], Z)
    }
    A[sr]()
  }

  function sd0(A) {
    A[jR] = 0, A.emit("drain", A[Pw], [A])
  }

  function Wp1(A, B) {
    if (A[Cj] === 2) return;
    if (A[Cj] = 2, lK6(A, B), A[Cj] = 0, A[cN] > 256) A[tC].splice(0, A[cN]), A[eC] -= A[cN], A[cN] = 0
  }

  function lK6(A, B) {
    while (!0) {
      if (A.destroyed) {
        pN(A[tr] === 0);
        return
      }
      if (A[_R] && !A[rr]) {
        A[_R](), A[_R] = null;
        return
      }
      if (A[yQ]) A[yQ].resume();
      if (A[Dp1]) A[jR] = 2;
      else if (A[jR] === 2) {
        if (B) A[jR] = 1, queueMicrotask(() => sd0(A));
        else sd0(A);
        continue
      }
      if (A[tr] === 0) return;
      if (A[or] >= (od0(A) || 1)) return;
      let Q = A[tC][A[eC]];
      if (A[Pw].protocol === "https:" && A[SR] !== Q.servername) {
        if (A[or] > 0) return;
        A[SR] = Q.servername, A[yQ]?.destroy(new UK6("servername changed"), () => {
          A[yQ] = null, Wp1(A)
        })
      }
      if (A[ch]) return;
      if (!A[yQ]) {
        Au0(A);
        return
      }
      if (A[yQ].destroyed) return;
      if (A[yQ].busy(Q)) return;
      if (!Q.aborted && A[yQ].write(Q)) A[eC]++;
      else A[tC].splice(A[eC], 1)
    }
  }
  Bu0.exports = td0
})
// @from(Start 5492698, End 5493652)
Fp1 = z((lR8, Qu0) => {
  class Jp1 {
    constructor() {
      this.bottom = 0, this.top = 0, this.list = new Array(2048), this.next = null
    }
    isEmpty() {
      return this.top === this.bottom
    }
    isFull() {
      return (this.top + 1 & 2047) === this.bottom
    }
    push(A) {
      this.list[this.top] = A, this.top = this.top + 1 & 2047
    }
    shift() {
      let A = this.list[this.bottom];
      if (A === void 0) return null;
      return this.list[this.bottom] = void 0, this.bottom = this.bottom + 1 & 2047, A
    }
  }
  Qu0.exports = class A {
    constructor() {
      this.head = this.tail = new Jp1
    }
    isEmpty() {
      return this.head.isEmpty()
    }
    push(B) {
      if (this.head.isFull()) this.head = this.head.next = new Jp1;
      this.head.push(B)
    }
    shift() {
      let B = this.tail,
        Q = B.shift();
      if (B.isEmpty() && B.next !== null) this.tail = B.next;
      return Q
    }
  }
})
// @from(Start 5493658, End 5494230)
Zu0 = z((iR8, Gu0) => {
  var {
    kFree: iK6,
    kConnected: nK6,
    kPending: aK6,
    kQueued: sK6,
    kRunning: rK6,
    kSize: oK6
  } = A3(), Kj = Symbol("pool");
  class Iu0 {
    constructor(A) {
      this[Kj] = A
    }
    get connected() {
      return this[Kj][nK6]
    }
    get free() {
      return this[Kj][iK6]
    }
    get pending() {
      return this[Kj][aK6]
    }
    get queued() {
      return this[Kj][sK6]
    }
    get running() {
      return this[Kj][rK6]
    }
    get size() {
      return this[Kj][oK6]
    }
  }
  Gu0.exports = Iu0
})
// @from(Start 5494236, End 5497655)
Hp1 = z((nR8, zu0) => {
  var tK6 = Sh(),
    eK6 = Fp1(),
    {
      kConnected: Xp1,
      kSize: Du0,
      kRunning: Yu0,
      kPending: Wu0,
      kQueued: Ao,
      kBusy: AH6,
      kFree: BH6,
      kUrl: QH6,
      kClose: IH6,
      kDestroy: GH6,
      kDispatch: ZH6
    } = A3(),
    DH6 = Zu0(),
    sY = Symbol("clients"),
    fD = Symbol("needDrain"),
    Bo = Symbol("queue"),
    Vp1 = Symbol("closed resolve"),
    Cp1 = Symbol("onDrain"),
    Ju0 = Symbol("onConnect"),
    Fu0 = Symbol("onDisconnect"),
    Xu0 = Symbol("onConnectionError"),
    Kp1 = Symbol("get dispatcher"),
    Cu0 = Symbol("add client"),
    Ku0 = Symbol("remove client"),
    Vu0 = Symbol("stats");
  class Hu0 extends tK6 {
    constructor() {
      super();
      this[Bo] = new eK6, this[sY] = [], this[Ao] = 0;
      let A = this;
      this[Cp1] = function B(Q, I) {
        let G = A[Bo],
          Z = !1;
        while (!Z) {
          let D = G.shift();
          if (!D) break;
          A[Ao]--, Z = !this.dispatch(D.opts, D.handler)
        }
        if (this[fD] = Z, !this[fD] && A[fD]) A[fD] = !1, A.emit("drain", Q, [A, ...I]);
        if (A[Vp1] && G.isEmpty()) Promise.all(A[sY].map((D) => D.close())).then(A[Vp1])
      }, this[Ju0] = (B, Q) => {
        A.emit("connect", B, [A, ...Q])
      }, this[Fu0] = (B, Q, I) => {
        A.emit("disconnect", B, [A, ...Q], I)
      }, this[Xu0] = (B, Q, I) => {
        A.emit("connectionError", B, [A, ...Q], I)
      }, this[Vu0] = new DH6(this)
    }
    get[AH6]() {
      return this[fD]
    }
    get[Xp1]() {
      return this[sY].filter((A) => A[Xp1]).length
    }
    get[BH6]() {
      return this[sY].filter((A) => A[Xp1] && !A[fD]).length
    }
    get[Wu0]() {
      let A = this[Ao];
      for (let {
          [Wu0]: B
        }
        of this[sY]) A += B;
      return A
    }
    get[Yu0]() {
      let A = 0;
      for (let {
          [Yu0]: B
        }
        of this[sY]) A += B;
      return A
    }
    get[Du0]() {
      let A = this[Ao];
      for (let {
          [Du0]: B
        }
        of this[sY]) A += B;
      return A
    }
    get stats() {
      return this[Vu0]
    }
    async [IH6]() {
      if (this[Bo].isEmpty()) await Promise.all(this[sY].map((A) => A.close()));
      else await new Promise((A) => {
        this[Vp1] = A
      })
    }
    async [GH6](A) {
      while (!0) {
        let B = this[Bo].shift();
        if (!B) break;
        B.handler.onError(A)
      }
      await Promise.all(this[sY].map((B) => B.destroy(A)))
    } [ZH6](A, B) {
      let Q = this[Kp1]();
      if (!Q) this[fD] = !0, this[Bo].push({
        opts: A,
        handler: B
      }), this[Ao]++;
      else if (!Q.dispatch(A, B)) Q[fD] = !0, this[fD] = !this[Kp1]();
      return !this[fD]
    } [Cu0](A) {
      if (A.on("drain", this[Cp1]).on("connect", this[Ju0]).on("disconnect", this[Fu0]).on("connectionError", this[Xu0]), this[sY].push(A), this[fD]) queueMicrotask(() => {
        if (this[fD]) this[Cp1](A[QH6], [this, A])
      });
      return this
    } [Ku0](A) {
      A.close(() => {
        let B = this[sY].indexOf(A);
        if (B !== -1) this[sY].splice(B, 1)
      }), this[fD] = this[sY].some((B) => !B[fD] && B.closed !== !0 && B.destroyed !== !0)
    }
  }
  zu0.exports = {
    PoolBase: Hu0,
    kClients: sY,
    kNeedDrain: fD,
    kAddClient: Cu0,
    kRemoveClient: Ku0,
    kGetDispatcher: Kp1
  }
})
// @from(Start 5497661, End 5499597)
lh = z((aR8, qu0) => {
  var {
    PoolBase: YH6,
    kClients: wu0,
    kNeedDrain: WH6,
    kAddClient: JH6,
    kGetDispatcher: FH6
  } = Hp1(), XH6 = er(), {
    InvalidArgumentError: zp1
  } = u5(), Eu0 = C6(), {
    kUrl: Uu0,
    kInterceptors: VH6
  } = A3(), CH6 = xr(), wp1 = Symbol("options"), Ep1 = Symbol("connections"), Nu0 = Symbol("factory");

  function KH6(A, B) {
    return new XH6(A, B)
  }
  class $u0 extends YH6 {
    constructor(A, {
      connections: B,
      factory: Q = KH6,
      connect: I,
      connectTimeout: G,
      tls: Z,
      maxCachedSessions: D,
      socketPath: Y,
      autoSelectFamily: W,
      autoSelectFamilyAttemptTimeout: J,
      allowH2: F,
      ...X
    } = {}) {
      super();
      if (B != null && (!Number.isFinite(B) || B < 0)) throw new zp1("invalid connections");
      if (typeof Q !== "function") throw new zp1("factory must be a function.");
      if (I != null && typeof I !== "function" && typeof I !== "object") throw new zp1("connect must be a function or an object");
      if (typeof I !== "function") I = CH6({
        ...Z,
        maxCachedSessions: D,
        allowH2: F,
        socketPath: Y,
        timeout: G,
        ...W ? {
          autoSelectFamily: W,
          autoSelectFamilyAttemptTimeout: J
        } : void 0,
        ...I
      });
      this[VH6] = X.interceptors?.Pool && Array.isArray(X.interceptors.Pool) ? X.interceptors.Pool : [], this[Ep1] = B || null, this[Uu0] = Eu0.parseOrigin(A), this[wp1] = {
        ...Eu0.deepClone(X),
        connect: I,
        allowH2: F
      }, this[wp1].interceptors = X.interceptors ? {
        ...X.interceptors
      } : void 0, this[Nu0] = Q
    } [FH6]() {
      for (let A of this[wu0])
        if (!A[WH6]) return A;
      if (!this[Ep1] || this[wu0].length < this[Ep1]) {
        let A = this[Nu0](this[Uu0], this[wp1]);
        return this[JH6](A), A
      }
    }
  }
  qu0.exports = $u0
})
// @from(Start 5499603, End 5502957)
Pu0 = z((sR8, Tu0) => {
  var {
    BalancedPoolMissingUpstreamError: HH6,
    InvalidArgumentError: zH6
  } = u5(), {
    PoolBase: wH6,
    kClients: yZ,
    kNeedDrain: Qo,
    kAddClient: EH6,
    kRemoveClient: UH6,
    kGetDispatcher: NH6
  } = Hp1(), $H6 = lh(), {
    kUrl: Up1,
    kInterceptors: qH6
  } = A3(), {
    parseOrigin: Mu0
  } = C6(), Lu0 = Symbol("factory"), BW1 = Symbol("options"), Ru0 = Symbol("kGreatestCommonDivisor"), Hj = Symbol("kCurrentWeight"), zj = Symbol("kIndex"), hX = Symbol("kWeight"), QW1 = Symbol("kMaxWeightPerServer"), IW1 = Symbol("kErrorPenalty");

  function MH6(A, B) {
    if (A === 0) return B;
    while (B !== 0) {
      let Q = B;
      B = A % B, A = Q
    }
    return A
  }

  function LH6(A, B) {
    return new $H6(A, B)
  }
  class Ou0 extends wH6 {
    constructor(A = [], {
      factory: B = LH6,
      ...Q
    } = {}) {
      super();
      if (this[BW1] = Q, this[zj] = -1, this[Hj] = 0, this[QW1] = this[BW1].maxWeightPerServer || 100, this[IW1] = this[BW1].errorPenalty || 15, !Array.isArray(A)) A = [A];
      if (typeof B !== "function") throw new zH6("factory must be a function.");
      this[qH6] = Q.interceptors?.BalancedPool && Array.isArray(Q.interceptors.BalancedPool) ? Q.interceptors.BalancedPool : [], this[Lu0] = B;
      for (let I of A) this.addUpstream(I);
      this._updateBalancedPoolStats()
    }
    addUpstream(A) {
      let B = Mu0(A).origin;
      if (this[yZ].find((I) => I[Up1].origin === B && I.closed !== !0 && I.destroyed !== !0)) return this;
      let Q = this[Lu0](B, Object.assign({}, this[BW1]));
      this[EH6](Q), Q.on("connect", () => {
        Q[hX] = Math.min(this[QW1], Q[hX] + this[IW1])
      }), Q.on("connectionError", () => {
        Q[hX] = Math.max(1, Q[hX] - this[IW1]), this._updateBalancedPoolStats()
      }), Q.on("disconnect", (...I) => {
        let G = I[2];
        if (G && G.code === "UND_ERR_SOCKET") Q[hX] = Math.max(1, Q[hX] - this[IW1]), this._updateBalancedPoolStats()
      });
      for (let I of this[yZ]) I[hX] = this[QW1];
      return this._updateBalancedPoolStats(), this
    }
    _updateBalancedPoolStats() {
      let A = 0;
      for (let B = 0; B < this[yZ].length; B++) A = MH6(this[yZ][B][hX], A);
      this[Ru0] = A
    }
    removeUpstream(A) {
      let B = Mu0(A).origin,
        Q = this[yZ].find((I) => I[Up1].origin === B && I.closed !== !0 && I.destroyed !== !0);
      if (Q) this[UH6](Q);
      return this
    }
    get upstreams() {
      return this[yZ].filter((A) => A.closed !== !0 && A.destroyed !== !0).map((A) => A[Up1].origin)
    } [NH6]() {
      if (this[yZ].length === 0) throw new HH6;
      if (!this[yZ].find((G) => !G[Qo] && G.closed !== !0 && G.destroyed !== !0)) return;
      if (this[yZ].map((G) => G[Qo]).reduce((G, Z) => G && Z, !0)) return;
      let Q = 0,
        I = this[yZ].findIndex((G) => !G[Qo]);
      while (Q++ < this[yZ].length) {
        this[zj] = (this[zj] + 1) % this[yZ].length;
        let G = this[yZ][this[zj]];
        if (G[hX] > this[yZ][I][hX] && !G[Qo]) I = this[zj];
        if (this[zj] === 0) {
          if (this[Hj] = this[Hj] - this[Ru0], this[Hj] <= 0) this[Hj] = this[QW1]
        }
        if (G[hX] >= this[Hj] && !G[Qo]) return G
      }
      return this[Hj] = this[yZ][I][hX], this[zj] = I, this[yZ][I]
    }
  }
  Tu0.exports = Ou0
})
// @from(Start 5502963, End 5505643)
ih = z((rR8, vu0) => {
  var {
    InvalidArgumentError: GW1
  } = u5(), {
    kClients: yR,
    kRunning: Su0,
    kClose: RH6,
    kDestroy: OH6,
    kDispatch: TH6,
    kInterceptors: PH6
  } = A3(), SH6 = Sh(), _H6 = lh(), jH6 = er(), yH6 = C6(), kH6 = eY1(), _u0 = Symbol("onConnect"), ju0 = Symbol("onDisconnect"), yu0 = Symbol("onConnectionError"), xH6 = Symbol("maxRedirections"), ku0 = Symbol("onDrain"), xu0 = Symbol("factory"), Np1 = Symbol("options");

  function fH6(A, B) {
    return B && B.connections === 1 ? new jH6(A, B) : new _H6(A, B)
  }
  class fu0 extends SH6 {
    constructor({
      factory: A = fH6,
      maxRedirections: B = 0,
      connect: Q,
      ...I
    } = {}) {
      super();
      if (typeof A !== "function") throw new GW1("factory must be a function.");
      if (Q != null && typeof Q !== "function" && typeof Q !== "object") throw new GW1("connect must be a function or an object");
      if (!Number.isInteger(B) || B < 0) throw new GW1("maxRedirections must be a positive number");
      if (Q && typeof Q !== "function") Q = {
        ...Q
      };
      this[PH6] = I.interceptors?.Agent && Array.isArray(I.interceptors.Agent) ? I.interceptors.Agent : [kH6({
        maxRedirections: B
      })], this[Np1] = {
        ...yH6.deepClone(I),
        connect: Q
      }, this[Np1].interceptors = I.interceptors ? {
        ...I.interceptors
      } : void 0, this[xH6] = B, this[xu0] = A, this[yR] = new Map, this[ku0] = (G, Z) => {
        this.emit("drain", G, [this, ...Z])
      }, this[_u0] = (G, Z) => {
        this.emit("connect", G, [this, ...Z])
      }, this[ju0] = (G, Z, D) => {
        this.emit("disconnect", G, [this, ...Z], D)
      }, this[yu0] = (G, Z, D) => {
        this.emit("connectionError", G, [this, ...Z], D)
      }
    }
    get[Su0]() {
      let A = 0;
      for (let B of this[yR].values()) A += B[Su0];
      return A
    } [TH6](A, B) {
      let Q;
      if (A.origin && (typeof A.origin === "string" || A.origin instanceof URL)) Q = String(A.origin);
      else throw new GW1("opts.origin must be a non-empty string or URL.");
      let I = this[yR].get(Q);
      if (!I) I = this[xu0](A.origin, this[Np1]).on("drain", this[ku0]).on("connect", this[_u0]).on("disconnect", this[ju0]).on("connectionError", this[yu0]), this[yR].set(Q, I);
      return I.dispatch(A, B)
    }
    async [RH6]() {
      let A = [];
      for (let B of this[yR].values()) A.push(B.close());
      this[yR].clear(), await Promise.all(A)
    }
    async [OH6](A) {
      let B = [];
      for (let Q of this[yR].values()) B.push(Q.destroy(A));
      this[yR].clear(), await Promise.all(B)
    }
  }
  vu0.exports = fu0
})