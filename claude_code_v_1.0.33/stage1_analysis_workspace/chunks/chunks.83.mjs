
// @from(Start 8430347, End 8442840)
class iF {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  regexp;
  constructor(A, B = {}) {
    if (ol(A), B = B || {}, this.options = B, this.pattern = A, this.platform = B.platform || kzA, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!B.windowsPathsNoEscape || B.allowWindowsEscape === !1, this.windowsPathsNoEscape) this.pattern = this.pattern.replace(/\\/g, "/");
    this.preserveMultipleSlashes = !!B.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!B.nonegate, this.comment = !1, this.empty = !1, this.partial = !!B.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = B.windowsNoMagicRoot !== void 0 ? B.windowsNoMagicRoot : !!(this.isWindows && this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make()
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return !0;
    for (let A of this.set)
      for (let B of A)
        if (typeof B !== "string") return !0;
    return !1
  }
  debug(...A) {}
  make() {
    let A = this.pattern,
      B = this.options;
    if (!B.nocomment && A.charAt(0) === "#") {
      this.comment = !0;
      return
    }
    if (!A) {
      this.empty = !0;
      return
    }
    if (this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], B.debug) this.debug = (...G) => console.error(...G);
    this.debug(this.pattern, this.globSet);
    let Q = this.globSet.map((G) => this.slashSplit(G));
    this.globParts = this.preprocess(Q), this.debug(this.pattern, this.globParts);
    let I = this.globParts.map((G, Z, D) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        let Y = G[0] === "" && G[1] === "" && (G[2] === "?" || !SzA.test(G[2])) && !SzA.test(G[3]),
          W = /^[a-z]:/i.test(G[0]);
        if (Y) return [...G.slice(0, 4), ...G.slice(4).map((J) => this.parse(J))];
        else if (W) return [G[0], ...G.slice(1).map((J) => this.parse(J))]
      }
      return G.map((Y) => this.parse(Y))
    });
    if (this.debug(this.pattern, I), this.set = I.filter((G) => G.indexOf(!1) === -1), this.isWindows)
      for (let G = 0; G < this.set.length; G++) {
        let Z = this.set[G];
        if (Z[0] === "" && Z[1] === "" && this.globParts[G][2] === "?" && typeof Z[3] === "string" && /^[a-z]:$/i.test(Z[3])) Z[2] = "?"
      }
    this.debug(this.pattern, this.set)
  }
  preprocess(A) {
    if (this.options.noglobstar) {
      for (let Q = 0; Q < A.length; Q++)
        for (let I = 0; I < A[Q].length; I++)
          if (A[Q][I] === "**") A[Q][I] = "*"
    }
    let {
      optimizationLevel: B = 1
    } = this.options;
    if (B >= 2) A = this.firstPhasePreProcess(A), A = this.secondPhasePreProcess(A);
    else if (B >= 1) A = this.levelOneOptimize(A);
    else A = this.adjascentGlobstarOptimize(A);
    return A
  }
  adjascentGlobstarOptimize(A) {
    return A.map((B) => {
      let Q = -1;
      while ((Q = B.indexOf("**", Q + 1)) !== -1) {
        let I = Q;
        while (B[I + 1] === "**") I++;
        if (I !== Q) B.splice(Q, I - Q)
      }
      return B
    })
  }
  levelOneOptimize(A) {
    return A.map((B) => {
      return B = B.reduce((Q, I) => {
        let G = Q[Q.length - 1];
        if (I === "**" && G === "**") return Q;
        if (I === "..") {
          if (G && G !== ".." && G !== "." && G !== "**") return Q.pop(), Q
        }
        return Q.push(I), Q
      }, []), B.length === 0 ? [""] : B
    })
  }
  levelTwoFileOptimize(A) {
    if (!Array.isArray(A)) A = this.slashSplit(A);
    let B = !1;
    do {
      if (B = !1, !this.preserveMultipleSlashes) {
        for (let I = 1; I < A.length - 1; I++) {
          let G = A[I];
          if (I === 1 && G === "" && A[0] === "") continue;
          if (G === "." || G === "") B = !0, A.splice(I, 1), I--
        }
        if (A[0] === "." && A.length === 2 && (A[1] === "." || A[1] === "")) B = !0, A.pop()
      }
      let Q = 0;
      while ((Q = A.indexOf("..", Q + 1)) !== -1) {
        let I = A[Q - 1];
        if (I && I !== "." && I !== ".." && I !== "**") B = !0, A.splice(Q - 1, 2), Q -= 2
      }
    } while (B);
    return A.length === 0 ? [""] : A
  }
  firstPhasePreProcess(A) {
    let B = !1;
    do {
      B = !1;
      for (let Q of A) {
        let I = -1;
        while ((I = Q.indexOf("**", I + 1)) !== -1) {
          let Z = I;
          while (Q[Z + 1] === "**") Z++;
          if (Z > I) Q.splice(I + 1, Z - I);
          let D = Q[I + 1],
            Y = Q[I + 2],
            W = Q[I + 3];
          if (D !== "..") continue;
          if (!Y || Y === "." || Y === ".." || !W || W === "." || W === "..") continue;
          B = !0, Q.splice(I, 1);
          let J = Q.slice(0);
          J[I] = "**", A.push(J), I--
        }
        if (!this.preserveMultipleSlashes) {
          for (let Z = 1; Z < Q.length - 1; Z++) {
            let D = Q[Z];
            if (Z === 1 && D === "" && Q[0] === "") continue;
            if (D === "." || D === "") B = !0, Q.splice(Z, 1), Z--
          }
          if (Q[0] === "." && Q.length === 2 && (Q[1] === "." || Q[1] === "")) B = !0, Q.pop()
        }
        let G = 0;
        while ((G = Q.indexOf("..", G + 1)) !== -1) {
          let Z = Q[G - 1];
          if (Z && Z !== "." && Z !== ".." && Z !== "**") {
            B = !0;
            let Y = G === 1 && Q[G + 1] === "**" ? ["."] : [];
            if (Q.splice(G - 1, 2, ...Y), Q.length === 0) Q.push("");
            G -= 2
          }
        }
      }
    } while (B);
    return A
  }
  secondPhasePreProcess(A) {
    for (let B = 0; B < A.length - 1; B++)
      for (let Q = B + 1; Q < A.length; Q++) {
        let I = this.partsMatch(A[B], A[Q], !this.preserveMultipleSlashes);
        if (I) {
          A[B] = [], A[Q] = I;
          break
        }
      }
    return A.filter((B) => B.length)
  }
  partsMatch(A, B, Q = !1) {
    let I = 0,
      G = 0,
      Z = [],
      D = "";
    while (I < A.length && G < B.length)
      if (A[I] === B[G]) Z.push(D === "b" ? B[G] : A[I]), I++, G++;
      else if (Q && A[I] === "**" && B[G] === A[I + 1]) Z.push(A[I]), I++;
    else if (Q && B[G] === "**" && A[I] === B[G + 1]) Z.push(B[G]), G++;
    else if (A[I] === "*" && B[G] && (this.options.dot || !B[G].startsWith(".")) && B[G] !== "**") {
      if (D === "b") return !1;
      D = "a", Z.push(A[I]), I++, G++
    } else if (B[G] === "*" && A[I] && (this.options.dot || !A[I].startsWith(".")) && A[I] !== "**") {
      if (D === "a") return !1;
      D = "b", Z.push(B[G]), I++, G++
    } else return !1;
    return A.length === B.length && Z
  }
  parseNegate() {
    if (this.nonegate) return;
    let A = this.pattern,
      B = !1,
      Q = 0;
    for (let I = 0; I < A.length && A.charAt(I) === "!"; I++) B = !B, Q++;
    if (Q) this.pattern = A.slice(Q);
    this.negate = B
  }
  matchOne(A, B, Q = !1) {
    let I = this.options;
    if (this.isWindows) {
      let K = typeof A[0] === "string" && /^[a-z]:$/i.test(A[0]),
        E = !K && A[0] === "" && A[1] === "" && A[2] === "?" && /^[a-z]:$/i.test(A[3]),
        N = typeof B[0] === "string" && /^[a-z]:$/i.test(B[0]),
        q = !N && B[0] === "" && B[1] === "" && B[2] === "?" && typeof B[3] === "string" && /^[a-z]:$/i.test(B[3]),
        O = E ? 3 : K ? 0 : void 0,
        R = q ? 3 : N ? 0 : void 0;
      if (typeof O === "number" && typeof R === "number") {
        let [T, L] = [A[O], B[R]];
        if (T.toLowerCase() === L.toLowerCase()) {
          if (B[R] = T, R > O) B = B.slice(R);
          else if (O > R) A = A.slice(O)
        }
      }
    }
    let {
      optimizationLevel: G = 1
    } = this.options;
    if (G >= 2) A = this.levelTwoFileOptimize(A);
    this.debug("matchOne", this, {
      file: A,
      pattern: B
    }), this.debug("matchOne", A.length, B.length);
    for (var Z = 0, D = 0, Y = A.length, W = B.length; Z < Y && D < W; Z++, D++) {
      this.debug("matchOne loop");
      var J = B[D],
        F = A[Z];
      if (this.debug(B, J, F), J === !1) return !1;
      if (J === HG) {
        this.debug("GLOBSTAR", [B, J, F]);
        var X = Z,
          V = D + 1;
        if (V === W) {
          this.debug("** at the end");
          for (; Z < Y; Z++)
            if (A[Z] === "." || A[Z] === ".." || !I.dot && A[Z].charAt(0) === ".") return !1;
          return !0
        }
        while (X < Y) {
          var C = A[X];
          if (this.debug(`
globstar while`, A, X, B, V, C), this.matchOne(A.slice(X), B.slice(V), Q)) return this.debug("globstar found match!", X, Y, C), !0;
          else {
            if (C === "." || C === ".." || !I.dot && C.charAt(0) === ".") {
              this.debug("dot detected!", A, X, B, V);
              break
            }
            this.debug("globstar swallow a segment, and continue"), X++
          }
        }
        if (Q) {
          if (this.debug(`
>>> no match, partial?`, A, X, B, V), X === Y) return !0
        }
        return !1
      }
      let K;
      if (typeof J === "string") K = F === J, this.debug("string match", J, F, K);
      else K = J.test(F), this.debug("pattern match", J, F, K);
      if (!K) return !1
    }
    if (Z === Y && D === W) return !0;
    else if (Z === Y) return Q;
    else if (D === W) return Z === Y - 1 && A[Z] === "";
    else throw new Error("wtf?")
  }
  braceExpand() {
    return xzA(this.pattern, this.options)
  }
  parse(A) {
    ol(A);
    let B = this.options;
    if (A === "**") return HG;
    if (A === "") return "";
    let Q, I = null;
    if (Q = A.match(x$9)) I = B.dot ? v$9 : f$9;
    else if (Q = A.match(L$9)) I = (B.nocase ? B.dot ? P$9 : T$9 : B.dot ? O$9 : R$9)(Q[1]);
    else if (Q = A.match(b$9)) I = (B.nocase ? B.dot ? h$9 : g$9 : B.dot ? m$9 : d$9)(Q);
    else if (Q = A.match(S$9)) I = B.dot ? j$9 : _$9;
    else if (Q = A.match(y$9)) I = k$9;
    let G = KG.fromGlob(A, this.options).toMMPattern();
    if (I && typeof G === "object") Reflect.defineProperty(G, "test", {
      value: I
    });
    return G
  }
  makeRe() {
    if (this.regexp || this.regexp === !1) return this.regexp;
    let A = this.set;
    if (!A.length) return this.regexp = !1, this.regexp;
    let B = this.options,
      Q = B.noglobstar ? c$9 : B.dot ? l$9 : i$9,
      I = new Set(B.nocase ? ["i"] : []),
      G = A.map((Y) => {
        let W = Y.map((J) => {
          if (J instanceof RegExp)
            for (let F of J.flags.split("")) I.add(F);
          return typeof J === "string" ? o$9(J) : J === HG ? HG : J._src
        });
        return W.forEach((J, F) => {
          let X = W[F + 1],
            V = W[F - 1];
          if (J !== HG || V === HG) return;
          if (V === void 0)
            if (X !== void 0 && X !== HG) W[F + 1] = "(?:\\/|" + Q + "\\/)?" + X;
            else W[F] = Q;
          else if (X === void 0) W[F - 1] = V + "(?:\\/|" + Q + ")?";
          else if (X !== HG) W[F - 1] = V + "(?:\\/|\\/" + Q + "\\/)" + X, W[F + 1] = HG
        }), W.filter((J) => J !== HG).join("/")
      }).join("|"),
      [Z, D] = A.length > 1 ? ["(?:", ")"] : ["", ""];
    if (G = "^" + Z + G + D + "$", this.negate) G = "^(?!" + G + ").+$";
    try {
      this.regexp = new RegExp(G, [...I].join(""))
    } catch (Y) {
      this.regexp = !1
    }
    return this.regexp
  }
  slashSplit(A) {
    if (this.preserveMultipleSlashes) return A.split("/");
    else if (this.isWindows && /^\/\/[^\/]+/.test(A)) return ["", ...A.split(/\/+/)];
    else return A.split(/\/+/)
  }
  match(A, B = this.partial) {
    if (this.debug("match", A, this.pattern), this.comment) return !1;
    if (this.empty) return A === "";
    if (A === "/" && B) return !0;
    let Q = this.options;
    if (this.isWindows) A = A.split("\\").join("/");
    let I = this.slashSplit(A);
    this.debug(this.pattern, "split", I);
    let G = this.set;
    this.debug(this.pattern, "set", G);
    let Z = I[I.length - 1];
    if (!Z)
      for (let D = I.length - 2; !Z && D >= 0; D--) Z = I[D];
    for (let D = 0; D < G.length; D++) {
      let Y = G[D],
        W = I;
      if (Q.matchBase && Y.length === 1) W = [Z];
      if (this.matchOne(W, Y, B)) {
        if (Q.flipNegate) return !0;
        return !this.negate
      }
    }
    if (Q.flipNegate) return !1;
    return this.negate
  }
  static defaults(A) {
    return qD.defaults(A).Minimatch
  }
}
// @from(Start 8442962, End 8443075)
wf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date
// @from(Start 8443079, End 8443092)
vzA = new Set
// @from(Start 8443096, End 8443157)
jL1 = typeof process === "object" && !!process ? process : {}
// @from(Start 8443161, End 8443297)
bzA = (A, B, Q, I) => {
    typeof jL1.emitWarning === "function" ? jL1.emitWarning(A, B, Q, I) : console.error(`[${Q}] ${B}: ${A}`)
  }
// @from(Start 8443301, End 8443333)
F51 = globalThis.AbortController
// @from(Start 8443337, End 8443365)
fzA = globalThis.AbortSignal
// @from(Start 8444404, End 8444428)
t$9 = (A) => !vzA.has(A)
// @from(Start 8444432, End 8444452)
cc5 = Symbol("type")
// @from(Start 8444456, End 8444516)
wM = (A) => A && A === Math.floor(A) && A > 0 && isFinite(A)
// @from(Start 8444520, End 8444698)
gzA = (A) => !wM(A) ? null : A <= Math.pow(2, 8) ? Uint8Array : A <= Math.pow(2, 16) ? Uint16Array : A <= Math.pow(2, 32) ? Uint32Array : A <= Number.MAX_SAFE_INTEGER ? el : null
// @from(Start 8444700, End 8444780)
class el extends Array {
  constructor(A) {
    super(A);
    this.fill(0)
  }
}
// @from(Start 8444781, End 8445211)
class Ef {
  heap;
  length;
  static #A = !1;
  static create(A) {
    let B = gzA(A);
    if (!B) return [];
    Ef.#A = !0;
    let Q = new Ef(A, B);
    return Ef.#A = !1, Q
  }
  constructor(A, B) {
    if (!Ef.#A) throw new TypeError("instantiate Stack using Stack.create(n)");
    this.heap = new B(A), this.length = 0
  }
  push(A) {
    this.heap[this.length++] = A
  }
  pop() {
    return this.heap[--this.length]
  }
}
// @from(Start 8445212, End 8467091)
class Ai {
  #A;
  #B;
  #Q;
  #I;
  #G;
  #W;
  ttl;
  ttlResolution;
  ttlAutopurge;
  updateAgeOnGet;
  updateAgeOnHas;
  allowStale;
  noDisposeOnSet;
  noUpdateTTL;
  maxEntrySize;
  sizeCalculation;
  noDeleteOnFetchRejection;
  noDeleteOnStaleGet;
  allowStaleOnFetchAbort;
  allowStaleOnFetchRejection;
  ignoreFetchAbort;
  #Z;
  #F;
  #J;
  #X;
  #Y;
  #w;
  #E;
  #K;
  #C;
  #M;
  #z;
  #L;
  #R;
  #N;
  #$;
  #q;
  #H;
  static unsafeExposeInternals(A) {
    return {
      starts: A.#R,
      ttls: A.#N,
      sizes: A.#L,
      keyMap: A.#J,
      keyList: A.#X,
      valList: A.#Y,
      next: A.#w,
      prev: A.#E,
      get head() {
        return A.#K
      },
      get tail() {
        return A.#C
      },
      free: A.#M,
      isBackgroundFetch: (B) => A.#V(B),
      backgroundFetch: (B, Q, I, G) => A.#g(B, Q, I, G),
      moveToTail: (B) => A.#m(B),
      indexes: (B) => A.#T(B),
      rindexes: (B) => A.#P(B),
      isStale: (B) => A.#U(B)
    }
  }
  get max() {
    return this.#A
  }
  get maxSize() {
    return this.#B
  }
  get calculatedSize() {
    return this.#F
  }
  get size() {
    return this.#Z
  }
  get fetchMethod() {
    return this.#G
  }
  get memoMethod() {
    return this.#W
  }
  get dispose() {
    return this.#Q
  }
  get disposeAfter() {
    return this.#I
  }
  constructor(A) {
    let {
      max: B = 0,
      ttl: Q,
      ttlResolution: I = 1,
      ttlAutopurge: G,
      updateAgeOnGet: Z,
      updateAgeOnHas: D,
      allowStale: Y,
      dispose: W,
      disposeAfter: J,
      noDisposeOnSet: F,
      noUpdateTTL: X,
      maxSize: V = 0,
      maxEntrySize: C = 0,
      sizeCalculation: K,
      fetchMethod: E,
      memoMethod: N,
      noDeleteOnFetchRejection: q,
      noDeleteOnStaleGet: O,
      allowStaleOnFetchRejection: R,
      allowStaleOnFetchAbort: T,
      ignoreFetchAbort: L
    } = A;
    if (B !== 0 && !wM(B)) throw new TypeError("max option must be a nonnegative integer");
    let _ = B ? gzA(B) : Array;
    if (!_) throw new Error("invalid max value: " + B);
    if (this.#A = B, this.#B = V, this.maxEntrySize = C || this.#B, this.sizeCalculation = K, this.sizeCalculation) {
      if (!this.#B && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      if (typeof this.sizeCalculation !== "function") throw new TypeError("sizeCalculation set to non-function")
    }
    if (N !== void 0 && typeof N !== "function") throw new TypeError("memoMethod must be a function if defined");
    if (this.#W = N, E !== void 0 && typeof E !== "function") throw new TypeError("fetchMethod must be a function if specified");
    if (this.#G = E, this.#q = !!E, this.#J = new Map, this.#X = new Array(B).fill(void 0), this.#Y = new Array(B).fill(void 0), this.#w = new _(B), this.#E = new _(B), this.#K = 0, this.#C = 0, this.#M = Ef.create(B), this.#Z = 0, this.#F = 0, typeof W === "function") this.#Q = W;
    if (typeof J === "function") this.#I = J, this.#z = [];
    else this.#I = void 0, this.#z = void 0;
    if (this.#$ = !!this.#Q, this.#H = !!this.#I, this.noDisposeOnSet = !!F, this.noUpdateTTL = !!X, this.noDeleteOnFetchRejection = !!q, this.allowStaleOnFetchRejection = !!R, this.allowStaleOnFetchAbort = !!T, this.ignoreFetchAbort = !!L, this.maxEntrySize !== 0) {
      if (this.#B !== 0) {
        if (!wM(this.#B)) throw new TypeError("maxSize must be a positive integer if specified")
      }
      if (!wM(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
      this.#_()
    }
    if (this.allowStale = !!Y, this.noDeleteOnStaleGet = !!O, this.updateAgeOnGet = !!Z, this.updateAgeOnHas = !!D, this.ttlResolution = wM(I) || I === 0 ? I : 1, this.ttlAutopurge = !!G, this.ttl = Q || 0, this.ttl) {
      if (!wM(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
      this.#S()
    }
    if (this.#A === 0 && this.ttl === 0 && this.#B === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !this.#A && !this.#B) {
      if (t$9("LRU_CACHE_UNBOUNDED")) vzA.add("LRU_CACHE_UNBOUNDED"), bzA("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", "LRU_CACHE_UNBOUNDED", Ai)
    }
  }
  getRemainingTTL(A) {
    return this.#J.has(A) ? 1 / 0 : 0
  }
  #S() {
    let A = new el(this.#A),
      B = new el(this.#A);
    this.#N = A, this.#R = B, this.#y = (G, Z, D = wf.now()) => {
      if (B[G] = Z !== 0 ? D : 0, A[G] = Z, Z !== 0 && this.ttlAutopurge) {
        let Y = setTimeout(() => {
          if (this.#U(G)) this.#j(this.#X[G], "expire")
        }, Z + 1);
        if (Y.unref) Y.unref()
      }
    }, this.#O = (G) => {
      B[G] = A[G] !== 0 ? wf.now() : 0
    }, this.#D = (G, Z) => {
      if (A[Z]) {
        let D = A[Z],
          Y = B[Z];
        if (!D || !Y) return;
        G.ttl = D, G.start = Y, G.now = Q || I();
        let W = G.now - Y;
        G.remainingTTL = D - W
      }
    };
    let Q = 0,
      I = () => {
        let G = wf.now();
        if (this.ttlResolution > 0) {
          Q = G;
          let Z = setTimeout(() => Q = 0, this.ttlResolution);
          if (Z.unref) Z.unref()
        }
        return G
      };
    this.getRemainingTTL = (G) => {
      let Z = this.#J.get(G);
      if (Z === void 0) return 0;
      let D = A[Z],
        Y = B[Z];
      if (!D || !Y) return 1 / 0;
      let W = (Q || I()) - Y;
      return D - W
    }, this.#U = (G) => {
      let Z = B[G],
        D = A[G];
      return !!D && !!Z && (Q || I()) - Z > D
    }
  }
  #O = () => {};
  #D = () => {};
  #y = () => {};
  #U = () => !1;
  #_() {
    let A = new el(this.#A);
    this.#F = 0, this.#L = A, this.#k = (B) => {
      this.#F -= A[B], A[B] = 0
    }, this.#f = (B, Q, I, G) => {
      if (this.#V(Q)) return 0;
      if (!wM(I))
        if (G) {
          if (typeof G !== "function") throw new TypeError("sizeCalculation must be a function");
          if (I = G(Q, B), !wM(I)) throw new TypeError("sizeCalculation return invalid (expect positive integer)")
        } else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      return I
    }, this.#x = (B, Q, I) => {
      if (A[B] = Q, this.#B) {
        let G = this.#B - A[B];
        while (this.#F > G) this.#b(!0)
      }
      if (this.#F += A[B], I) I.entrySize = Q, I.totalCalculatedSize = this.#F
    }
  }
  #k = (A) => {};
  #x = (A, B, Q) => {};
  #f = (A, B, Q, I) => {
    if (Q || I) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    return 0
  };* #T({
    allowStale: A = this.allowStale
  } = {}) {
    if (this.#Z)
      for (let B = this.#C;;) {
        if (!this.#v(B)) break;
        if (A || !this.#U(B)) yield B;
        if (B === this.#K) break;
        else B = this.#E[B]
      }
  }* #P({
    allowStale: A = this.allowStale
  } = {}) {
    if (this.#Z)
      for (let B = this.#K;;) {
        if (!this.#v(B)) break;
        if (A || !this.#U(B)) yield B;
        if (B === this.#C) break;
        else B = this.#w[B]
      }
  }
  #v(A) {
    return A !== void 0 && this.#J.get(this.#X[A]) === A
  }* entries() {
    for (let A of this.#T())
      if (this.#Y[A] !== void 0 && this.#X[A] !== void 0 && !this.#V(this.#Y[A])) yield [this.#X[A], this.#Y[A]]
  }* rentries() {
    for (let A of this.#P())
      if (this.#Y[A] !== void 0 && this.#X[A] !== void 0 && !this.#V(this.#Y[A])) yield [this.#X[A], this.#Y[A]]
  }* keys() {
    for (let A of this.#T()) {
      let B = this.#X[A];
      if (B !== void 0 && !this.#V(this.#Y[A])) yield B
    }
  }* rkeys() {
    for (let A of this.#P()) {
      let B = this.#X[A];
      if (B !== void 0 && !this.#V(this.#Y[A])) yield B
    }
  }* values() {
    for (let A of this.#T())
      if (this.#Y[A] !== void 0 && !this.#V(this.#Y[A])) yield this.#Y[A]
  }* rvalues() {
    for (let A of this.#P())
      if (this.#Y[A] !== void 0 && !this.#V(this.#Y[A])) yield this.#Y[A]
  } [Symbol.iterator]() {
    return this.entries()
  } [Symbol.toStringTag] = "LRUCache";
  find(A, B = {}) {
    for (let Q of this.#T()) {
      let I = this.#Y[Q],
        G = this.#V(I) ? I.__staleWhileFetching : I;
      if (G === void 0) continue;
      if (A(G, this.#X[Q], this)) return this.get(this.#X[Q], B)
    }
  }
  forEach(A, B = this) {
    for (let Q of this.#T()) {
      let I = this.#Y[Q],
        G = this.#V(I) ? I.__staleWhileFetching : I;
      if (G === void 0) continue;
      A.call(B, G, this.#X[Q], this)
    }
  }
  rforEach(A, B = this) {
    for (let Q of this.#P()) {
      let I = this.#Y[Q],
        G = this.#V(I) ? I.__staleWhileFetching : I;
      if (G === void 0) continue;
      A.call(B, G, this.#X[Q], this)
    }
  }
  purgeStale() {
    let A = !1;
    for (let B of this.#P({
        allowStale: !0
      }))
      if (this.#U(B)) this.#j(this.#X[B], "expire"), A = !0;
    return A
  }
  info(A) {
    let B = this.#J.get(A);
    if (B === void 0) return;
    let Q = this.#Y[B],
      I = this.#V(Q) ? Q.__staleWhileFetching : Q;
    if (I === void 0) return;
    let G = {
      value: I
    };
    if (this.#N && this.#R) {
      let Z = this.#N[B],
        D = this.#R[B];
      if (Z && D) {
        let Y = Z - (wf.now() - D);
        G.ttl = Y, G.start = Date.now()
      }
    }
    if (this.#L) G.size = this.#L[B];
    return G
  }
  dump() {
    let A = [];
    for (let B of this.#T({
        allowStale: !0
      })) {
      let Q = this.#X[B],
        I = this.#Y[B],
        G = this.#V(I) ? I.__staleWhileFetching : I;
      if (G === void 0 || Q === void 0) continue;
      let Z = {
        value: G
      };
      if (this.#N && this.#R) {
        Z.ttl = this.#N[B];
        let D = wf.now() - this.#R[B];
        Z.start = Math.floor(Date.now() - D)
      }
      if (this.#L) Z.size = this.#L[B];
      A.unshift([Q, Z])
    }
    return A
  }
  load(A) {
    this.clear();
    for (let [B, Q] of A) {
      if (Q.start) {
        let I = Date.now() - Q.start;
        Q.start = wf.now() - I
      }
      this.set(B, Q.value, Q)
    }
  }
  set(A, B, Q = {}) {
    if (B === void 0) return this.delete(A), this;
    let {
      ttl: I = this.ttl,
      start: G,
      noDisposeOnSet: Z = this.noDisposeOnSet,
      sizeCalculation: D = this.sizeCalculation,
      status: Y
    } = Q, {
      noUpdateTTL: W = this.noUpdateTTL
    } = Q, J = this.#f(A, B, Q.size || 0, D);
    if (this.maxEntrySize && J > this.maxEntrySize) {
      if (Y) Y.set = "miss", Y.maxEntrySizeExceeded = !0;
      return this.#j(A, "set"), this
    }
    let F = this.#Z === 0 ? void 0 : this.#J.get(A);
    if (F === void 0) {
      if (F = this.#Z === 0 ? this.#C : this.#M.length !== 0 ? this.#M.pop() : this.#Z === this.#A ? this.#b(!1) : this.#Z, this.#X[F] = A, this.#Y[F] = B, this.#J.set(A, F), this.#w[this.#C] = F, this.#E[F] = this.#C, this.#C = F, this.#Z++, this.#x(F, J, Y), Y) Y.set = "add";
      W = !1
    } else {
      this.#m(F);
      let X = this.#Y[F];
      if (B !== X) {
        if (this.#q && this.#V(X)) {
          X.__abortController.abort(new Error("replaced"));
          let {
            __staleWhileFetching: V
          } = X;
          if (V !== void 0 && !Z) {
            if (this.#$) this.#Q?.(V, A, "set");
            if (this.#H) this.#z?.push([V, A, "set"])
          }
        } else if (!Z) {
          if (this.#$) this.#Q?.(X, A, "set");
          if (this.#H) this.#z?.push([X, A, "set"])
        }
        if (this.#k(F), this.#x(F, J, Y), this.#Y[F] = B, Y) {
          Y.set = "replace";
          let V = X && this.#V(X) ? X.__staleWhileFetching : X;
          if (V !== void 0) Y.oldValue = V
        }
      } else if (Y) Y.set = "update"
    }
    if (I !== 0 && !this.#N) this.#S();
    if (this.#N) {
      if (!W) this.#y(F, I, G);
      if (Y) this.#D(Y, F)
    }
    if (!Z && this.#H && this.#z) {
      let X = this.#z,
        V;
      while (V = X?.shift()) this.#I?.(...V)
    }
    return this
  }
  pop() {
    try {
      while (this.#Z) {
        let A = this.#Y[this.#K];
        if (this.#b(!0), this.#V(A)) {
          if (A.__staleWhileFetching) return A.__staleWhileFetching
        } else if (A !== void 0) return A
      }
    } finally {
      if (this.#H && this.#z) {
        let A = this.#z,
          B;
        while (B = A?.shift()) this.#I?.(...B)
      }
    }
  }
  #b(A) {
    let B = this.#K,
      Q = this.#X[B],
      I = this.#Y[B];
    if (this.#q && this.#V(I)) I.__abortController.abort(new Error("evicted"));
    else if (this.#$ || this.#H) {
      if (this.#$) this.#Q?.(I, Q, "evict");
      if (this.#H) this.#z?.push([I, Q, "evict"])
    }
    if (this.#k(B), A) this.#X[B] = void 0, this.#Y[B] = void 0, this.#M.push(B);
    if (this.#Z === 1) this.#K = this.#C = 0, this.#M.length = 0;
    else this.#K = this.#w[B];
    return this.#J.delete(Q), this.#Z--, B
  }
  has(A, B = {}) {
    let {
      updateAgeOnHas: Q = this.updateAgeOnHas,
      status: I
    } = B, G = this.#J.get(A);
    if (G !== void 0) {
      let Z = this.#Y[G];
      if (this.#V(Z) && Z.__staleWhileFetching === void 0) return !1;
      if (!this.#U(G)) {
        if (Q) this.#O(G);
        if (I) I.has = "hit", this.#D(I, G);
        return !0
      } else if (I) I.has = "stale", this.#D(I, G)
    } else if (I) I.has = "miss";
    return !1
  }
  peek(A, B = {}) {
    let {
      allowStale: Q = this.allowStale
    } = B, I = this.#J.get(A);
    if (I === void 0 || !Q && this.#U(I)) return;
    let G = this.#Y[I];
    return this.#V(G) ? G.__staleWhileFetching : G
  }
  #g(A, B, Q, I) {
    let G = B === void 0 ? void 0 : this.#Y[B];
    if (this.#V(G)) return G;
    let Z = new F51,
      {
        signal: D
      } = Q;
    D?.addEventListener("abort", () => Z.abort(D.reason), {
      signal: Z.signal
    });
    let Y = {
        signal: Z.signal,
        options: Q,
        context: I
      },
      W = (K, E = !1) => {
        let {
          aborted: N
        } = Z.signal, q = Q.ignoreFetchAbort && K !== void 0;
        if (Q.status)
          if (N && !E) {
            if (Q.status.fetchAborted = !0, Q.status.fetchError = Z.signal.reason, q) Q.status.fetchAbortIgnored = !0
          } else Q.status.fetchResolved = !0;
        if (N && !q && !E) return F(Z.signal.reason);
        let O = V;
        if (this.#Y[B] === V)
          if (K === void 0)
            if (O.__staleWhileFetching) this.#Y[B] = O.__staleWhileFetching;
            else this.#j(A, "fetch");
        else {
          if (Q.status) Q.status.fetchUpdated = !0;
          this.set(A, K, Y.options)
        }
        return K
      },
      J = (K) => {
        if (Q.status) Q.status.fetchRejected = !0, Q.status.fetchError = K;
        return F(K)
      },
      F = (K) => {
        let {
          aborted: E
        } = Z.signal, N = E && Q.allowStaleOnFetchAbort, q = N || Q.allowStaleOnFetchRejection, O = q || Q.noDeleteOnFetchRejection, R = V;
        if (this.#Y[B] === V) {
          if (!O || R.__staleWhileFetching === void 0) this.#j(A, "fetch");
          else if (!N) this.#Y[B] = R.__staleWhileFetching
        }
        if (q) {
          if (Q.status && R.__staleWhileFetching !== void 0) Q.status.returnedStale = !0;
          return R.__staleWhileFetching
        } else if (R.__returned === R) throw K
      },
      X = (K, E) => {
        let N = this.#G?.(A, G, Y);
        if (N && N instanceof Promise) N.then((q) => K(q === void 0 ? void 0 : q), E);
        Z.signal.addEventListener("abort", () => {
          if (!Q.ignoreFetchAbort || Q.allowStaleOnFetchAbort) {
            if (K(void 0), Q.allowStaleOnFetchAbort) K = (q) => W(q, !0)
          }
        })
      };
    if (Q.status) Q.status.fetchDispatched = !0;
    let V = new Promise(X).then(W, J),
      C = Object.assign(V, {
        __abortController: Z,
        __staleWhileFetching: G,
        __returned: void 0
      });
    if (B === void 0) this.set(A, C, {
      ...Y.options,
      status: void 0
    }), B = this.#J.get(A);
    else this.#Y[B] = C;
    return C
  }
  #V(A) {
    if (!this.#q) return !1;
    let B = A;
    return !!B && B instanceof Promise && B.hasOwnProperty("__staleWhileFetching") && B.__abortController instanceof F51
  }
  async fetch(A, B = {}) {
    let {
      allowStale: Q = this.allowStale,
      updateAgeOnGet: I = this.updateAgeOnGet,
      noDeleteOnStaleGet: G = this.noDeleteOnStaleGet,
      ttl: Z = this.ttl,
      noDisposeOnSet: D = this.noDisposeOnSet,
      size: Y = 0,
      sizeCalculation: W = this.sizeCalculation,
      noUpdateTTL: J = this.noUpdateTTL,
      noDeleteOnFetchRejection: F = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection: X = this.allowStaleOnFetchRejection,
      ignoreFetchAbort: V = this.ignoreFetchAbort,
      allowStaleOnFetchAbort: C = this.allowStaleOnFetchAbort,
      context: K,
      forceRefresh: E = !1,
      status: N,
      signal: q
    } = B;
    if (!this.#q) {
      if (N) N.fetch = "get";
      return this.get(A, {
        allowStale: Q,
        updateAgeOnGet: I,
        noDeleteOnStaleGet: G,
        status: N
      })
    }
    let O = {
        allowStale: Q,
        updateAgeOnGet: I,
        noDeleteOnStaleGet: G,
        ttl: Z,
        noDisposeOnSet: D,
        size: Y,
        sizeCalculation: W,
        noUpdateTTL: J,
        noDeleteOnFetchRejection: F,
        allowStaleOnFetchRejection: X,
        allowStaleOnFetchAbort: C,
        ignoreFetchAbort: V,
        status: N,
        signal: q
      },
      R = this.#J.get(A);
    if (R === void 0) {
      if (N) N.fetch = "miss";
      let T = this.#g(A, R, O, K);
      return T.__returned = T
    } else {
      let T = this.#Y[R];
      if (this.#V(T)) {
        let x = Q && T.__staleWhileFetching !== void 0;
        if (N) {
          if (N.fetch = "inflight", x) N.returnedStale = !0
        }
        return x ? T.__staleWhileFetching : T.__returned = T
      }
      let L = this.#U(R);
      if (!E && !L) {
        if (N) N.fetch = "hit";
        if (this.#m(R), I) this.#O(R);
        if (N) this.#D(N, R);
        return T
      }
      let _ = this.#g(A, R, O, K),
        i = _.__staleWhileFetching !== void 0 && Q;
      if (N) {
        if (N.fetch = L ? "stale" : "refresh", i && L) N.returnedStale = !0
      }
      return i ? _.__staleWhileFetching : _.__returned = _
    }
  }
  async forceFetch(A, B = {}) {
    let Q = await this.fetch(A, B);
    if (Q === void 0) throw new Error("fetch() returned undefined");
    return Q
  }
  memo(A, B = {}) {
    let Q = this.#W;
    if (!Q) throw new Error("no memoMethod provided to constructor");
    let {
      context: I,
      forceRefresh: G,
      ...Z
    } = B, D = this.get(A, Z);
    if (!G && D !== void 0) return D;
    let Y = Q(A, D, {
      options: Z,
      context: I
    });
    return this.set(A, Y, Z), Y
  }
  get(A, B = {}) {
    let {
      allowStale: Q = this.allowStale,
      updateAgeOnGet: I = this.updateAgeOnGet,
      noDeleteOnStaleGet: G = this.noDeleteOnStaleGet,
      status: Z
    } = B, D = this.#J.get(A);
    if (D !== void 0) {
      let Y = this.#Y[D],
        W = this.#V(Y);
      if (Z) this.#D(Z, D);
      if (this.#U(D)) {
        if (Z) Z.get = "stale";
        if (!W) {
          if (!G) this.#j(A, "expire");
          if (Z && Q) Z.returnedStale = !0;
          return Q ? Y : void 0
        } else {
          if (Z && Q && Y.__staleWhileFetching !== void 0) Z.returnedStale = !0;
          return Q ? Y.__staleWhileFetching : void 0
        }
      } else {
        if (Z) Z.get = "hit";
        if (W) return Y.__staleWhileFetching;
        if (this.#m(D), I) this.#O(D);
        return Y
      }
    } else if (Z) Z.get = "miss"
  }
  #h(A, B) {
    this.#E[B] = A, this.#w[A] = B
  }
  #m(A) {
    if (A !== this.#C) {
      if (A === this.#K) this.#K = this.#w[A];
      else this.#h(this.#E[A], this.#w[A]);
      this.#h(this.#C, A), this.#C = A
    }
  }
  delete(A) {
    return this.#j(A, "delete")
  }
  #j(A, B) {
    let Q = !1;
    if (this.#Z !== 0) {
      let I = this.#J.get(A);
      if (I !== void 0)
        if (Q = !0, this.#Z === 1) this.#d(B);
        else {
          this.#k(I);
          let G = this.#Y[I];
          if (this.#V(G)) G.__abortController.abort(new Error("deleted"));
          else if (this.#$ || this.#H) {
            if (this.#$) this.#Q?.(G, A, B);
            if (this.#H) this.#z?.push([G, A, B])
          }
          if (this.#J.delete(A), this.#X[I] = void 0, this.#Y[I] = void 0, I === this.#C) this.#C = this.#E[I];
          else if (I === this.#K) this.#K = this.#w[I];
          else {
            let Z = this.#E[I];
            this.#w[Z] = this.#w[I];
            let D = this.#w[I];
            this.#E[D] = this.#E[I]
          }
          this.#Z--, this.#M.push(I)
        }
    }
    if (this.#H && this.#z?.length) {
      let I = this.#z,
        G;
      while (G = I?.shift()) this.#I?.(...G)
    }
    return Q
  }
  clear() {
    return this.#d("delete")
  }
  #d(A) {
    for (let B of this.#P({
        allowStale: !0
      })) {
      let Q = this.#Y[B];
      if (this.#V(Q)) Q.__abortController.abort(new Error("deleted"));
      else {
        let I = this.#X[B];
        if (this.#$) this.#Q?.(Q, I, A);
        if (this.#H) this.#z?.push([Q, I, A])
      }
    }
    if (this.#J.clear(), this.#Y.fill(void 0), this.#X.fill(void 0), this.#N && this.#R) this.#N.fill(0), this.#R.fill(0);
    if (this.#L) this.#L.fill(0);
    if (this.#K = 0, this.#C = 0, this.#M.length = 0, this.#F = 0, this.#Z = 0, this.#H && this.#z) {
      let B = this.#z,
        Q;
      while (Q = B?.shift()) this.#I?.(...Q)
    }
  }
}
// @from(Start 8467619, End 8467716)
hzA = typeof process === "object" && process ? process : {
    stdout: null,
    stderr: null
  }
// @from(Start 8467720, End 8467822)
Aq9 = (A) => !!A && typeof A === "object" && (A instanceof WS || A instanceof pzA || Bq9(A) || Qq9(A))
// @from(Start 8467826, End 8467961)
Bq9 = (A) => !!A && typeof A === "object" && A instanceof bL1 && typeof A.pipe === "function" && A.pipe !== pzA.Writable.prototype.pipe
// @from(Start 8467965, End 8468090)
Qq9 = (A) => !!A && typeof A === "object" && A instanceof bL1 && typeof A.write === "function" && typeof A.end === "function"
// @from(Start 8468094, End 8468112)
gU = Symbol("EOF")
// @from(Start 8468116, End 8468143)
hU = Symbol("maybeEmitEnd")
// @from(Start 8468147, End 8468172)
EM = Symbol("emittedEnd")
// @from(Start 8468176, End 8468203)
X51 = Symbol("emittingEnd")
// @from(Start 8468207, End 8468234)
Bi = Symbol("emittedError")
// @from(Start 8468238, End 8468260)
V51 = Symbol("closed")
// @from(Start 8468264, End 8468284)
mzA = Symbol("read")
// @from(Start 8468288, End 8468309)
C51 = Symbol("flush")
// @from(Start 8468313, End 8468339)
dzA = Symbol("flushChunk")
// @from(Start 8468343, End 8468366)
DC = Symbol("encoding")
// @from(Start 8468370, End 8468392)
Uf = Symbol("decoder")
// @from(Start 8468396, End 8468418)
KI = Symbol("flowing")
// @from(Start 8468422, End 8468443)
Qi = Symbol("paused")
// @from(Start 8468447, End 8468468)
Nf = Symbol("resume")
// @from(Start 8468472, End 8468493)
HI = Symbol("buffer")
// @from(Start 8468497, End 8468517)
MD = Symbol("pipes")
// @from(Start 8468521, End 8468548)
zI = Symbol("bufferLength")
// @from(Start 8468552, End 8468578)
yL1 = Symbol("bufferPush")
// @from(Start 8468582, End 8468609)
K51 = Symbol("bufferShift")
// @from(Start 8468613, End 8468638)
zZ = Symbol("objectMode")
// @from(Start 8468642, End 8468666)
LQ = Symbol("destroyed")
// @from(Start 8468670, End 8468691)
kL1 = Symbol("error")
// @from(Start 8468695, End 8468719)
xL1 = Symbol("emitData")
// @from(Start 8468723, End 8468746)
uzA = Symbol("emitEnd")
// @from(Start 8468750, End 8468774)
fL1 = Symbol("emitEnd2")
// @from(Start 8468778, End 8468798)
Jz = Symbol("async")
// @from(Start 8468802, End 8468823)
vL1 = Symbol("abort")
// @from(Start 8468827, End 8468850)
H51 = Symbol("aborted")
// @from(Start 8468854, End 8468875)
Ii = Symbol("signal")
// @from(Start 8468879, End 8468907)
YS = Symbol("dataListeners")
// @from(Start 8468911, End 8468935)
ZJ = Symbol("discarded")
// @from(Start 8468939, End 8468976)
Gi = (A) => Promise.resolve().then(A)
// @from(Start 8468980, End 8468996)
Iq9 = (A) => A()
// @from(Start 8469000, End 8469063)
Gq9 = (A) => A === "end" || A === "finish" || A === "prefinish"
// @from(Start 8469067, End 8469214)
Zq9 = (A) => A instanceof ArrayBuffer || !!A && typeof A === "object" && A.constructor && A.constructor.name === "ArrayBuffer" && A.byteLength >= 0
// @from(Start 8469218, End 8469275)
Dq9 = (A) => !Buffer.isBuffer(A) && ArrayBuffer.isView(A)
// @from(Start 8469277, End 8469624)
class gL1 {
  src;
  dest;
  opts;
  ondrain;
  constructor(A, B, Q) {
    this.src = A, this.dest = B, this.opts = Q, this.ondrain = () => A[Nf](), this.dest.on("drain", this.ondrain)
  }
  unpipe() {
    this.dest.removeListener("drain", this.ondrain)
  }
  proxyErrors(A) {}
  end() {
    if (this.unpipe(), this.opts.end) this.dest.end()
  }
}
// @from(Start 8469625, End 8469869)
class czA extends gL1 {
  unpipe() {
    this.src.removeListener("error", this.proxyErrors), super.unpipe()
  }
  constructor(A, B, Q) {
    super(A, B, Q);
    this.proxyErrors = (I) => B.emit("error", I), A.on("error", this.proxyErrors)
  }
}
// @from(Start 8469874, End 8469901)
Yq9 = (A) => !!A.objectMode
// @from(Start 8469905, End 8469974)
Wq9 = (A) => !A.objectMode && !!A.encoding && A.encoding !== "buffer"
// @from(Start 8469976, End 8481377)
class WS extends bL1 {
  [KI] = !1;
  [Qi] = !1;
  [MD] = [];
  [HI] = [];
  [zZ];
  [DC];
  [Jz];
  [Uf];
  [gU] = !1;
  [EM] = !1;
  [X51] = !1;
  [V51] = !1;
  [Bi] = null;
  [zI] = 0;
  [LQ] = !1;
  [Ii];
  [H51] = !1;
  [YS] = 0;
  [ZJ] = !1;
  writable = !0;
  readable = !0;
  constructor(...A) {
    let B = A[0] || {};
    super();
    if (B.objectMode && typeof B.encoding === "string") throw new TypeError("Encoding and objectMode may not be used together");
    if (Yq9(B)) this[zZ] = !0, this[DC] = null;
    else if (Wq9(B)) this[DC] = B.encoding, this[zZ] = !1;
    else this[zZ] = !1, this[DC] = null;
    if (this[Jz] = !!B.async, this[Uf] = this[DC] ? new e$9(this[DC]) : null, B && B.debugExposeBuffer === !0) Object.defineProperty(this, "buffer", {
      get: () => this[HI]
    });
    if (B && B.debugExposePipes === !0) Object.defineProperty(this, "pipes", {
      get: () => this[MD]
    });
    let {
      signal: Q
    } = B;
    if (Q)
      if (this[Ii] = Q, Q.aborted) this[vL1]();
      else Q.addEventListener("abort", () => this[vL1]())
  }
  get bufferLength() {
    return this[zI]
  }
  get encoding() {
    return this[DC]
  }
  set encoding(A) {
    throw new Error("Encoding must be set at instantiation time")
  }
  setEncoding(A) {
    throw new Error("Encoding must be set at instantiation time")
  }
  get objectMode() {
    return this[zZ]
  }
  set objectMode(A) {
    throw new Error("objectMode must be set at instantiation time")
  }
  get["async"]() {
    return this[Jz]
  }
  set["async"](A) {
    this[Jz] = this[Jz] || !!A
  } [vL1]() {
    this[H51] = !0, this.emit("abort", this[Ii]?.reason), this.destroy(this[Ii]?.reason)
  }
  get aborted() {
    return this[H51]
  }
  set aborted(A) {}
  write(A, B, Q) {
    if (this[H51]) return !1;
    if (this[gU]) throw new Error("write after end");
    if (this[LQ]) return this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), {
      code: "ERR_STREAM_DESTROYED"
    })), !0;
    if (typeof B === "function") Q = B, B = "utf8";
    if (!B) B = "utf8";
    let I = this[Jz] ? Gi : Iq9;
    if (!this[zZ] && !Buffer.isBuffer(A)) {
      if (Dq9(A)) A = Buffer.from(A.buffer, A.byteOffset, A.byteLength);
      else if (Zq9(A)) A = Buffer.from(A);
      else if (typeof A !== "string") throw new Error("Non-contiguous data written to non-objectMode stream")
    }
    if (this[zZ]) {
      if (this[KI] && this[zI] !== 0) this[C51](!0);
      if (this[KI]) this.emit("data", A);
      else this[yL1](A);
      if (this[zI] !== 0) this.emit("readable");
      if (Q) I(Q);
      return this[KI]
    }
    if (!A.length) {
      if (this[zI] !== 0) this.emit("readable");
      if (Q) I(Q);
      return this[KI]
    }
    if (typeof A === "string" && !(B === this[DC] && !this[Uf]?.lastNeed)) A = Buffer.from(A, B);
    if (Buffer.isBuffer(A) && this[DC]) A = this[Uf].write(A);
    if (this[KI] && this[zI] !== 0) this[C51](!0);
    if (this[KI]) this.emit("data", A);
    else this[yL1](A);
    if (this[zI] !== 0) this.emit("readable");
    if (Q) I(Q);
    return this[KI]
  }
  read(A) {
    if (this[LQ]) return null;
    if (this[ZJ] = !1, this[zI] === 0 || A === 0 || A && A > this[zI]) return this[hU](), null;
    if (this[zZ]) A = null;
    if (this[HI].length > 1 && !this[zZ]) this[HI] = [this[DC] ? this[HI].join("") : Buffer.concat(this[HI], this[zI])];
    let B = this[mzA](A || null, this[HI][0]);
    return this[hU](), B
  } [mzA](A, B) {
    if (this[zZ]) this[K51]();
    else {
      let Q = B;
      if (A === Q.length || A === null) this[K51]();
      else if (typeof Q === "string") this[HI][0] = Q.slice(A), B = Q.slice(0, A), this[zI] -= A;
      else this[HI][0] = Q.subarray(A), B = Q.subarray(0, A), this[zI] -= A
    }
    if (this.emit("data", B), !this[HI].length && !this[gU]) this.emit("drain");
    return B
  }
  end(A, B, Q) {
    if (typeof A === "function") Q = A, A = void 0;
    if (typeof B === "function") Q = B, B = "utf8";
    if (A !== void 0) this.write(A, B);
    if (Q) this.once("end", Q);
    if (this[gU] = !0, this.writable = !1, this[KI] || !this[Qi]) this[hU]();
    return this
  } [Nf]() {
    if (this[LQ]) return;
    if (!this[YS] && !this[MD].length) this[ZJ] = !0;
    if (this[Qi] = !1, this[KI] = !0, this.emit("resume"), this[HI].length) this[C51]();
    else if (this[gU]) this[hU]();
    else this.emit("drain")
  }
  resume() {
    return this[Nf]()
  }
  pause() {
    this[KI] = !1, this[Qi] = !0, this[ZJ] = !1
  }
  get destroyed() {
    return this[LQ]
  }
  get flowing() {
    return this[KI]
  }
  get paused() {
    return this[Qi]
  } [yL1](A) {
    if (this[zZ]) this[zI] += 1;
    else this[zI] += A.length;
    this[HI].push(A)
  } [K51]() {
    if (this[zZ]) this[zI] -= 1;
    else this[zI] -= this[HI][0].length;
    return this[HI].shift()
  } [C51](A = !1) {
    do; while (this[dzA](this[K51]()) && this[HI].length);
    if (!A && !this[HI].length && !this[gU]) this.emit("drain")
  } [dzA](A) {
    return this.emit("data", A), this[KI]
  }
  pipe(A, B) {
    if (this[LQ]) return A;
    this[ZJ] = !1;
    let Q = this[EM];
    if (B = B || {}, A === hzA.stdout || A === hzA.stderr) B.end = !1;
    else B.end = B.end !== !1;
    if (B.proxyErrors = !!B.proxyErrors, Q) {
      if (B.end) A.end()
    } else if (this[MD].push(!B.proxyErrors ? new gL1(this, A, B) : new czA(this, A, B)), this[Jz]) Gi(() => this[Nf]());
    else this[Nf]();
    return A
  }
  unpipe(A) {
    let B = this[MD].find((Q) => Q.dest === A);
    if (B) {
      if (this[MD].length === 1) {
        if (this[KI] && this[YS] === 0) this[KI] = !1;
        this[MD] = []
      } else this[MD].splice(this[MD].indexOf(B), 1);
      B.unpipe()
    }
  }
  addListener(A, B) {
    return this.on(A, B)
  }
  on(A, B) {
    let Q = super.on(A, B);
    if (A === "data") {
      if (this[ZJ] = !1, this[YS]++, !this[MD].length && !this[KI]) this[Nf]()
    } else if (A === "readable" && this[zI] !== 0) super.emit("readable");
    else if (Gq9(A) && this[EM]) super.emit(A), this.removeAllListeners(A);
    else if (A === "error" && this[Bi]) {
      let I = B;
      if (this[Jz]) Gi(() => I.call(this, this[Bi]));
      else I.call(this, this[Bi])
    }
    return Q
  }
  removeListener(A, B) {
    return this.off(A, B)
  }
  off(A, B) {
    let Q = super.off(A, B);
    if (A === "data") {
      if (this[YS] = this.listeners("data").length, this[YS] === 0 && !this[ZJ] && !this[MD].length) this[KI] = !1
    }
    return Q
  }
  removeAllListeners(A) {
    let B = super.removeAllListeners(A);
    if (A === "data" || A === void 0) {
      if (this[YS] = 0, !this[ZJ] && !this[MD].length) this[KI] = !1
    }
    return B
  }
  get emittedEnd() {
    return this[EM]
  } [hU]() {
    if (!this[X51] && !this[EM] && !this[LQ] && this[HI].length === 0 && this[gU]) {
      if (this[X51] = !0, this.emit("end"), this.emit("prefinish"), this.emit("finish"), this[V51]) this.emit("close");
      this[X51] = !1
    }
  }
  emit(A, ...B) {
    let Q = B[0];
    if (A !== "error" && A !== "close" && A !== LQ && this[LQ]) return !1;
    else if (A === "data") return !this[zZ] && !Q ? !1 : this[Jz] ? (Gi(() => this[xL1](Q)), !0) : this[xL1](Q);
    else if (A === "end") return this[uzA]();
    else if (A === "close") {
      if (this[V51] = !0, !this[EM] && !this[LQ]) return !1;
      let G = super.emit("close");
      return this.removeAllListeners("close"), G
    } else if (A === "error") {
      this[Bi] = Q, super.emit(kL1, Q);
      let G = !this[Ii] || this.listeners("error").length ? super.emit("error", Q) : !1;
      return this[hU](), G
    } else if (A === "resume") {
      let G = super.emit("resume");
      return this[hU](), G
    } else if (A === "finish" || A === "prefinish") {
      let G = super.emit(A);
      return this.removeAllListeners(A), G
    }
    let I = super.emit(A, ...B);
    return this[hU](), I
  } [xL1](A) {
    for (let Q of this[MD])
      if (Q.dest.write(A) === !1) this.pause();
    let B = this[ZJ] ? !1 : super.emit("data", A);
    return this[hU](), B
  } [uzA]() {
    if (this[EM]) return !1;
    return this[EM] = !0, this.readable = !1, this[Jz] ? (Gi(() => this[fL1]()), !0) : this[fL1]()
  } [fL1]() {
    if (this[Uf]) {
      let B = this[Uf].end();
      if (B) {
        for (let Q of this[MD]) Q.dest.write(B);
        if (!this[ZJ]) super.emit("data", B)
      }
    }
    for (let B of this[MD]) B.end();
    let A = super.emit("end");
    return this.removeAllListeners("end"), A
  }
  async collect() {
    let A = Object.assign([], {
      dataLength: 0
    });
    if (!this[zZ]) A.dataLength = 0;
    let B = this.promise();
    return this.on("data", (Q) => {
      if (A.push(Q), !this[zZ]) A.dataLength += Q.length
    }), await B, A
  }
  async concat() {
    if (this[zZ]) throw new Error("cannot concat in objectMode");
    let A = await this.collect();
    return this[DC] ? A.join("") : Buffer.concat(A, A.dataLength)
  }
  async promise() {
    return new Promise((A, B) => {
      this.on(LQ, () => B(new Error("stream destroyed"))), this.on("error", (Q) => B(Q)), this.on("end", () => A())
    })
  } [Symbol.asyncIterator]() {
    this[ZJ] = !1;
    let A = !1,
      B = async () => {
        return this.pause(), A = !0, {
          value: void 0,
          done: !0
        }
      };
    return {
      next: () => {
        if (A) return B();
        let I = this.read();
        if (I !== null) return Promise.resolve({
          done: !1,
          value: I
        });
        if (this[gU]) return B();
        let G, Z, D = (F) => {
            this.off("data", Y), this.off("end", W), this.off(LQ, J), B(), Z(F)
          },
          Y = (F) => {
            this.off("error", D), this.off("end", W), this.off(LQ, J), this.pause(), G({
              value: F,
              done: !!this[gU]
            })
          },
          W = () => {
            this.off("error", D), this.off("data", Y), this.off(LQ, J), B(), G({
              done: !0,
              value: void 0
            })
          },
          J = () => D(new Error("stream destroyed"));
        return new Promise((F, X) => {
          Z = X, G = F, this.once(LQ, J), this.once("error", D), this.once("end", W), this.once("data", Y)
        })
      },
      throw: B,
      return: B,
      [Symbol.asyncIterator]() {
        return this
      }
    }
  } [Symbol.iterator]() {
    this[ZJ] = !1;
    let A = !1,
      B = () => {
        return this.pause(), this.off(kL1, B), this.off(LQ, B), this.off("end", B), A = !0, {
          done: !0,
          value: void 0
        }
      },
      Q = () => {
        if (A) return B();
        let I = this.read();
        return I === null ? B() : {
          done: !1,
          value: I
        }
      };
    return this.once("end", B), this.once(kL1, B), this.once(LQ, B), {
      next: Q,
      throw: B,
      return: B,
      [Symbol.iterator]() {
        return this
      }
    }
  }
  destroy(A) {
    if (this[LQ]) {
      if (A) this.emit("error", A);
      else this.emit(LQ);
      return this
    }
    this[LQ] = !0, this[ZJ] = !0, this[HI].length = 0, this[zI] = 0;
    let B = this;
    if (typeof B.close === "function" && !this[V51]) B.close();
    if (A) this.emit("error", A);
    else this.emit(LQ);
    return this
  }
  static get isStream() {
    return Aq9
  }
}
// @from(Start 8481382, End 8481398)
wq9 = Hq9.native
// @from(Start 8481402, End 8481619)
Di = {
    lstatSync: Xq9,
    readdir: Vq9,
    readdirSync: Cq9,
    readlinkSync: Kq9,
    realpathSync: wq9,
    promises: {
      lstat: Eq9,
      readdir: Uq9,
      readlink: Nq9,
      realpath: $q9
    }
  }
// @from(Start 8481623, End 8481767)
szA = (A) => !A || A === Di || A === zq9 ? Di : {
    ...Di,
    ...A,
    promises: {
      ...Di.promises,
      ...A.promises || {}
    }
  }
// @from(Start 8481771, End 8481801)
rzA = /^\\\\\?\\([a-z]:)\\?$/i
// @from(Start 8481805, End 8481861)
qq9 = (A) => A.replace(/\//g, "\\").replace(rzA, "$1\\")
// @from(Start 8481865, End 8481879)
Mq9 = /[\\\/]/
// @from(Start 8481883, End 8481889)
aF = 0
// @from(Start 8481893, End 8481900)
ozA = 1
// @from(Start 8481904, End 8481911)
tzA = 2
// @from(Start 8481915, End 8481921)
Fz = 4
// @from(Start 8481925, End 8481932)
ezA = 6
// @from(Start 8481936, End 8481943)
AwA = 8
// @from(Start 8481947, End 8481954)
JS = 10
// @from(Start 8481958, End 8481966)
BwA = 12
// @from(Start 8481970, End 8481977)
nF = 15
// @from(Start 8481981, End 8481989)
Zi = ~nF
// @from(Start 8481993, End 8482001)
hL1 = 16
// @from(Start 8482005, End 8482013)
lzA = 32
// @from(Start 8482017, End 8482024)
Yi = 64
// @from(Start 8482028, End 8482036)
YC = 128
// @from(Start 8482040, End 8482049)
z51 = 256
// @from(Start 8482053, End 8482062)
E51 = 512
// @from(Start 8482066, End 8482085)
izA = Yi | YC | E51
// @from(Start 8482089, End 8482099)
Lq9 = 1023
// @from(Start 8482103, End 8482282)
mL1 = (A) => A.isFile() ? AwA : A.isDirectory() ? Fz : A.isSymbolicLink() ? JS : A.isCharacterDevice() ? tzA : A.isBlockDevice() ? ezA : A.isSocket() ? BwA : A.isFIFO() ? ozA : aF
// @from(Start 8482286, End 8482299)
nzA = new Map
// @from(Start 8482303, End 8482426)
Wi = (A) => {
    let B = nzA.get(A);
    if (B) return B;
    let Q = A.normalize("NFKD");
    return nzA.set(A, Q), Q
  }
// @from(Start 8482430, End 8482443)
azA = new Map
// @from(Start 8482447, End 8482571)
w51 = (A) => {
    let B = azA.get(A);
    if (B) return B;
    let Q = Wi(A.toLowerCase());
    return azA.set(A, Q), Q
  }
// @from(Start 8482573, End 8482653)
class uL1 extends Ai {
  constructor() {
    super({
      max: 256
    })
  }
}
// @from(Start 8482654, End 8482789)
class QwA extends Ai {
  constructor(A = 16384) {
    super({
      maxSize: A,
      sizeCalculation: (B) => B.length + 1
    })
  }
}
// @from(Start 8482794, End 8482829)
IwA = Symbol("PathScurry setAsCwd")
// @from(Start 8482831, End 8494353)
class LD {
  name;
  root;
  roots;
  parent;
  nocase;
  isCWD = !1;
  #A;
  #B;
  get dev() {
    return this.#B
  }
  #Q;
  get mode() {
    return this.#Q
  }
  #I;
  get nlink() {
    return this.#I
  }
  #G;
  get uid() {
    return this.#G
  }
  #W;
  get gid() {
    return this.#W
  }
  #Z;
  get rdev() {
    return this.#Z
  }
  #F;
  get blksize() {
    return this.#F
  }
  #J;
  get ino() {
    return this.#J
  }
  #X;
  get size() {
    return this.#X
  }
  #Y;
  get blocks() {
    return this.#Y
  }
  #w;
  get atimeMs() {
    return this.#w
  }
  #E;
  get mtimeMs() {
    return this.#E
  }
  #K;
  get ctimeMs() {
    return this.#K
  }
  #C;
  get birthtimeMs() {
    return this.#C
  }
  #M;
  get atime() {
    return this.#M
  }
  #z;
  get mtime() {
    return this.#z
  }
  #L;
  get ctime() {
    return this.#L
  }
  #R;
  get birthtime() {
    return this.#R
  }
  #N;
  #$;
  #q;
  #H;
  #S;
  #O;
  #D;
  #y;
  #U;
  #_;
  get parentPath() {
    return (this.parent || this).fullpath()
  }
  get path() {
    return this.parentPath
  }
  constructor(A, B = aF, Q, I, G, Z, D) {
    if (this.name = A, this.#N = G ? w51(A) : Wi(A), this.#D = B & Lq9, this.nocase = G, this.roots = I, this.root = Q || this, this.#y = Z, this.#q = D.fullpath, this.#S = D.relative, this.#O = D.relativePosix, this.parent = D.parent, this.parent) this.#A = this.parent.#A;
    else this.#A = szA(D.fs)
  }
  depth() {
    if (this.#$ !== void 0) return this.#$;
    if (!this.parent) return this.#$ = 0;
    return this.#$ = this.parent.depth() + 1
  }
  childrenCache() {
    return this.#y
  }
  resolve(A) {
    if (!A) return this;
    let B = this.getRootString(A),
      I = A.substring(B.length).split(this.splitSep);
    return B ? this.getRoot(B).#k(I) : this.#k(I)
  }
  #k(A) {
    let B = this;
    for (let Q of A) B = B.child(Q);
    return B
  }
  children() {
    let A = this.#y.get(this);
    if (A) return A;
    let B = Object.assign([], {
      provisional: 0
    });
    return this.#y.set(this, B), this.#D &= ~hL1, B
  }
  child(A, B) {
    if (A === "" || A === ".") return this;
    if (A === "..") return this.parent || this;
    let Q = this.children(),
      I = this.nocase ? w51(A) : Wi(A);
    for (let Y of Q)
      if (Y.#N === I) return Y;
    let G = this.parent ? this.sep : "",
      Z = this.#q ? this.#q + G + A : void 0,
      D = this.newChild(A, aF, {
        ...B,
        parent: this,
        fullpath: Z
      });
    if (!this.canReaddir()) D.#D |= YC;
    return Q.push(D), D
  }
  relative() {
    if (this.isCWD) return "";
    if (this.#S !== void 0) return this.#S;
    let A = this.name,
      B = this.parent;
    if (!B) return this.#S = this.name;
    let Q = B.relative();
    return Q + (!Q || !B.parent ? "" : this.sep) + A
  }
  relativePosix() {
    if (this.sep === "/") return this.relative();
    if (this.isCWD) return "";
    if (this.#O !== void 0) return this.#O;
    let A = this.name,
      B = this.parent;
    if (!B) return this.#O = this.fullpathPosix();
    let Q = B.relativePosix();
    return Q + (!Q || !B.parent ? "" : "/") + A
  }
  fullpath() {
    if (this.#q !== void 0) return this.#q;
    let A = this.name,
      B = this.parent;
    if (!B) return this.#q = this.name;
    let I = B.fullpath() + (!B.parent ? "" : this.sep) + A;
    return this.#q = I
  }
  fullpathPosix() {
    if (this.#H !== void 0) return this.#H;
    if (this.sep === "/") return this.#H = this.fullpath();
    if (!this.parent) {
      let I = this.fullpath().replace(/\\/g, "/");
      if (/^[a-z]:\//i.test(I)) return this.#H = `//?/${I}`;
      else return this.#H = I
    }
    let A = this.parent,
      B = A.fullpathPosix(),
      Q = B + (!B || !A.parent ? "" : "/") + this.name;
    return this.#H = Q
  }
  isUnknown() {
    return (this.#D & nF) === aF
  }
  isType(A) {
    return this[`is${A}`]()
  }
  getType() {
    return this.isUnknown() ? "Unknown" : this.isDirectory() ? "Directory" : this.isFile() ? "File" : this.isSymbolicLink() ? "SymbolicLink" : this.isFIFO() ? "FIFO" : this.isCharacterDevice() ? "CharacterDevice" : this.isBlockDevice() ? "BlockDevice" : this.isSocket() ? "Socket" : "Unknown"
  }
  isFile() {
    return (this.#D & nF) === AwA
  }
  isDirectory() {
    return (this.#D & nF) === Fz
  }
  isCharacterDevice() {
    return (this.#D & nF) === tzA
  }
  isBlockDevice() {
    return (this.#D & nF) === ezA
  }
  isFIFO() {
    return (this.#D & nF) === ozA
  }
  isSocket() {
    return (this.#D & nF) === BwA
  }
  isSymbolicLink() {
    return (this.#D & JS) === JS
  }
  lstatCached() {
    return this.#D & lzA ? this : void 0
  }
  readlinkCached() {
    return this.#U
  }
  realpathCached() {
    return this.#_
  }
  readdirCached() {
    let A = this.children();
    return A.slice(0, A.provisional)
  }
  canReadlink() {
    if (this.#U) return !0;
    if (!this.parent) return !1;
    let A = this.#D & nF;
    return !(A !== aF && A !== JS || this.#D & z51 || this.#D & YC)
  }
  calledReaddir() {
    return !!(this.#D & hL1)
  }
  isENOENT() {
    return !!(this.#D & YC)
  }
  isNamed(A) {
    return !this.nocase ? this.#N === Wi(A) : this.#N === w51(A)
  }
  async readlink() {
    let A = this.#U;
    if (A) return A;
    if (!this.canReadlink()) return;
    if (!this.parent) return;
    try {
      let B = await this.#A.promises.readlink(this.fullpath()),
        Q = (await this.parent.realpath())?.resolve(B);
      if (Q) return this.#U = Q
    } catch (B) {
      this.#V(B.code);
      return
    }
  }
  readlinkSync() {
    let A = this.#U;
    if (A) return A;
    if (!this.canReadlink()) return;
    if (!this.parent) return;
    try {
      let B = this.#A.readlinkSync(this.fullpath()),
        Q = this.parent.realpathSync()?.resolve(B);
      if (Q) return this.#U = Q
    } catch (B) {
      this.#V(B.code);
      return
    }
  }
  #x(A) {
    this.#D |= hL1;
    for (let B = A.provisional; B < A.length; B++) {
      let Q = A[B];
      if (Q) Q.#f()
    }
  }
  #f() {
    if (this.#D & YC) return;
    this.#D = (this.#D | YC) & Zi, this.#T()
  }
  #T() {
    let A = this.children();
    A.provisional = 0;
    for (let B of A) B.#f()
  }
  #P() {
    this.#D |= E51, this.#v()
  }
  #v() {
    if (this.#D & Yi) return;
    let A = this.#D;
    if ((A & nF) === Fz) A &= Zi;
    this.#D = A | Yi, this.#T()
  }
  #b(A = "") {
    if (A === "ENOTDIR" || A === "EPERM") this.#v();
    else if (A === "ENOENT") this.#f();
    else this.children().provisional = 0
  }
  #g(A = "") {
    if (A === "ENOTDIR") this.parent.#v();
    else if (A === "ENOENT") this.#f()
  }
  #V(A = "") {
    let B = this.#D;
    if (B |= z51, A === "ENOENT") B |= YC;
    if (A === "EINVAL" || A === "UNKNOWN") B &= Zi;
    if (this.#D = B, A === "ENOTDIR" && this.parent) this.parent.#v()
  }
  #h(A, B) {
    return this.#j(A, B) || this.#m(A, B)
  }
  #m(A, B) {
    let Q = mL1(A),
      I = this.newChild(A.name, Q, {
        parent: this
      }),
      G = I.#D & nF;
    if (G !== Fz && G !== JS && G !== aF) I.#D |= Yi;
    return B.unshift(I), B.provisional++, I
  }
  #j(A, B) {
    for (let Q = B.provisional; Q < B.length; Q++) {
      let I = B[Q];
      if ((this.nocase ? w51(A.name) : Wi(A.name)) !== I.#N) continue;
      return this.#d(A, I, Q, B)
    }
  }
  #d(A, B, Q, I) {
    let G = B.name;
    if (B.#D = B.#D & Zi | mL1(A), G !== A.name) B.name = A.name;
    if (Q !== I.provisional) {
      if (Q === I.length - 1) I.pop();
      else I.splice(Q, 1);
      I.unshift(B)
    }
    return I.provisional++, B
  }
  async lstat() {
    if ((this.#D & YC) === 0) try {
      return this.#l(await this.#A.promises.lstat(this.fullpath())), this
    } catch (A) {
      this.#g(A.code)
    }
  }
  lstatSync() {
    if ((this.#D & YC) === 0) try {
      return this.#l(this.#A.lstatSync(this.fullpath())), this
    } catch (A) {
      this.#g(A.code)
    }
  }
  #l(A) {
    let {
      atime: B,
      atimeMs: Q,
      birthtime: I,
      birthtimeMs: G,
      blksize: Z,
      blocks: D,
      ctime: Y,
      ctimeMs: W,
      dev: J,
      gid: F,
      ino: X,
      mode: V,
      mtime: C,
      mtimeMs: K,
      nlink: E,
      rdev: N,
      size: q,
      uid: O
    } = A;
    this.#M = B, this.#w = Q, this.#R = I, this.#C = G, this.#F = Z, this.#Y = D, this.#L = Y, this.#K = W, this.#B = J, this.#W = F, this.#J = X, this.#Q = V, this.#z = C, this.#E = K, this.#I = E, this.#Z = N, this.#X = q, this.#G = O;
    let R = mL1(A);
    if (this.#D = this.#D & Zi | R | lzA, R !== aF && R !== Fz && R !== JS) this.#D |= Yi
  }
  #p = [];
  #c = !1;
  #i(A) {
    this.#c = !1;
    let B = this.#p.slice();
    this.#p.length = 0, B.forEach((Q) => Q(null, A))
  }
  readdirCB(A, B = !1) {
    if (!this.canReaddir()) {
      if (B) A(null, []);
      else queueMicrotask(() => A(null, []));
      return
    }
    let Q = this.children();
    if (this.calledReaddir()) {
      let G = Q.slice(0, Q.provisional);
      if (B) A(null, G);
      else queueMicrotask(() => A(null, G));
      return
    }
    if (this.#p.push(A), this.#c) return;
    this.#c = !0;
    let I = this.fullpath();
    this.#A.readdir(I, {
      withFileTypes: !0
    }, (G, Z) => {
      if (G) this.#b(G.code), Q.provisional = 0;
      else {
        for (let D of Z) this.#h(D, Q);
        this.#x(Q)
      }
      this.#i(Q.slice(0, Q.provisional));
      return
    })
  }
  #u;
  async readdir() {
    if (!this.canReaddir()) return [];
    let A = this.children();
    if (this.calledReaddir()) return A.slice(0, A.provisional);
    let B = this.fullpath();
    if (this.#u) await this.#u;
    else {
      let Q = () => {};
      this.#u = new Promise((I) => Q = I);
      try {
        for (let I of await this.#A.promises.readdir(B, {
            withFileTypes: !0
          })) this.#h(I, A);
        this.#x(A)
      } catch (I) {
        this.#b(I.code), A.provisional = 0
      }
      this.#u = void 0, Q()
    }
    return A.slice(0, A.provisional)
  }
  readdirSync() {
    if (!this.canReaddir()) return [];
    let A = this.children();
    if (this.calledReaddir()) return A.slice(0, A.provisional);
    let B = this.fullpath();
    try {
      for (let Q of this.#A.readdirSync(B, {
          withFileTypes: !0
        })) this.#h(Q, A);
      this.#x(A)
    } catch (Q) {
      this.#b(Q.code), A.provisional = 0
    }
    return A.slice(0, A.provisional)
  }
  canReaddir() {
    if (this.#D & izA) return !1;
    let A = nF & this.#D;
    if (!(A === aF || A === Fz || A === JS)) return !1;
    return !0
  }
  shouldWalk(A, B) {
    return (this.#D & Fz) === Fz && !(this.#D & izA) && !A.has(this) && (!B || B(this))
  }
  async realpath() {
    if (this.#_) return this.#_;
    if ((E51 | z51 | YC) & this.#D) return;
    try {
      let A = await this.#A.promises.realpath(this.fullpath());
      return this.#_ = this.resolve(A)
    } catch (A) {
      this.#P()
    }
  }
  realpathSync() {
    if (this.#_) return this.#_;
    if ((E51 | z51 | YC) & this.#D) return;
    try {
      let A = this.#A.realpathSync(this.fullpath());
      return this.#_ = this.resolve(A)
    } catch (A) {
      this.#P()
    }
  } [IwA](A) {
    if (A === this) return;
    A.isCWD = !1, this.isCWD = !0;
    let B = new Set([]),
      Q = [],
      I = this;
    while (I && I.parent) B.add(I), I.#S = Q.join(this.sep), I.#O = Q.join("/"), I = I.parent, Q.push("..");
    I = A;
    while (I && I.parent && !B.has(I)) I.#S = void 0, I.#O = void 0, I = I.parent
  }
}
// @from(Start 8494354, End 8495034)
class U51 extends LD {
  sep = "\\";
  splitSep = Mq9;
  constructor(A, B = aF, Q, I, G, Z, D) {
    super(A, B, Q, I, G, Z, D)
  }
  newChild(A, B = aF, Q = {}) {
    return new U51(A, B, this.root, this.roots, this.nocase, this.childrenCache(), Q)
  }
  getRootString(A) {
    return dL1.parse(A).root
  }
  getRoot(A) {
    if (A = qq9(A.toUpperCase()), A === this.root.name) return this.root;
    for (let [B, Q] of Object.entries(this.roots))
      if (this.sameRoot(A, B)) return this.roots[A] = Q;
    return this.roots[A] = new Ji(A, this).root
  }
  sameRoot(A, B = this.root.name) {
    return A = A.toUpperCase().replace(/\//g, "\\").replace(rzA, "$1\\"), A === B
  }
}
// @from(Start 8495035, End 8495394)
class N51 extends LD {
  splitSep = "/";
  sep = "/";
  constructor(A, B = aF, Q, I, G, Z, D) {
    super(A, B, Q, I, G, Z, D)
  }
  getRootString(A) {
    return A.startsWith("/") ? "/" : ""
  }
  getRoot(A) {
    return this.root
  }
  newChild(A, B = aF, Q = {}) {
    return new N51(A, B, this.root, this.roots, this.nocase, this.childrenCache(), Q)
  }
}
// @from(Start 8495395, End 8505362)
class pL1 {
  root;
  rootPath;
  roots;
  cwd;
  #A;
  #B;
  #Q;
  nocase;
  #I;
  constructor(A = process.cwd(), B, Q, {
    nocase: I,
    childrenCacheSize: G = 16384,
    fs: Z = Di
  } = {}) {
    if (this.#I = szA(Z), A instanceof URL || A.startsWith("file://")) A = Fq9(A);
    let D = B.resolve(A);
    this.roots = Object.create(null), this.rootPath = this.parseRootPath(D), this.#A = new uL1, this.#B = new uL1, this.#Q = new QwA(G);
    let Y = D.substring(this.rootPath.length).split(Q);
    if (Y.length === 1 && !Y[0]) Y.pop();
    if (I === void 0) throw new TypeError("must provide nocase setting to PathScurryBase ctor");
    this.nocase = I, this.root = this.newRoot(this.#I), this.roots[this.rootPath] = this.root;
    let W = this.root,
      J = Y.length - 1,
      F = B.sep,
      X = this.rootPath,
      V = !1;
    for (let C of Y) {
      let K = J--;
      W = W.child(C, {
        relative: new Array(K).fill("..").join(F),
        relativePosix: new Array(K).fill("..").join("/"),
        fullpath: X += (V ? "" : F) + C
      }), V = !0
    }
    this.cwd = W
  }
  depth(A = this.cwd) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    return A.depth()
  }
  childrenCache() {
    return this.#Q
  }
  resolve(...A) {
    let B = "";
    for (let G = A.length - 1; G >= 0; G--) {
      let Z = A[G];
      if (!Z || Z === ".") continue;
      if (B = B ? `${Z}/${B}` : Z, this.isAbsolute(Z)) break
    }
    let Q = this.#A.get(B);
    if (Q !== void 0) return Q;
    let I = this.cwd.resolve(B).fullpath();
    return this.#A.set(B, I), I
  }
  resolvePosix(...A) {
    let B = "";
    for (let G = A.length - 1; G >= 0; G--) {
      let Z = A[G];
      if (!Z || Z === ".") continue;
      if (B = B ? `${Z}/${B}` : Z, this.isAbsolute(Z)) break
    }
    let Q = this.#B.get(B);
    if (Q !== void 0) return Q;
    let I = this.cwd.resolve(B).fullpathPosix();
    return this.#B.set(B, I), I
  }
  relative(A = this.cwd) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    return A.relative()
  }
  relativePosix(A = this.cwd) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    return A.relativePosix()
  }
  basename(A = this.cwd) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    return A.name
  }
  dirname(A = this.cwd) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    return (A.parent || A).fullpath()
  }
  async readdir(A = this.cwd, B = {
    withFileTypes: !0
  }) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A, A = this.cwd;
    let {
      withFileTypes: Q
    } = B;
    if (!A.canReaddir()) return [];
    else {
      let I = await A.readdir();
      return Q ? I : I.map((G) => G.name)
    }
  }
  readdirSync(A = this.cwd, B = {
    withFileTypes: !0
  }) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A, A = this.cwd;
    let {
      withFileTypes: Q = !0
    } = B;
    if (!A.canReaddir()) return [];
    else if (Q) return A.readdirSync();
    else return A.readdirSync().map((I) => I.name)
  }
  async lstat(A = this.cwd) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    return A.lstat()
  }
  lstatSync(A = this.cwd) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    return A.lstatSync()
  }
  async readlink(A = this.cwd, {
    withFileTypes: B
  } = {
    withFileTypes: !1
  }) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A.withFileTypes, A = this.cwd;
    let Q = await A.readlink();
    return B ? Q : Q?.fullpath()
  }
  readlinkSync(A = this.cwd, {
    withFileTypes: B
  } = {
    withFileTypes: !1
  }) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A.withFileTypes, A = this.cwd;
    let Q = A.readlinkSync();
    return B ? Q : Q?.fullpath()
  }
  async realpath(A = this.cwd, {
    withFileTypes: B
  } = {
    withFileTypes: !1
  }) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A.withFileTypes, A = this.cwd;
    let Q = await A.realpath();
    return B ? Q : Q?.fullpath()
  }
  realpathSync(A = this.cwd, {
    withFileTypes: B
  } = {
    withFileTypes: !1
  }) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A.withFileTypes, A = this.cwd;
    let Q = A.realpathSync();
    return B ? Q : Q?.fullpath()
  }
  async walk(A = this.cwd, B = {}) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A, A = this.cwd;
    let {
      withFileTypes: Q = !0,
      follow: I = !1,
      filter: G,
      walkFilter: Z
    } = B, D = [];
    if (!G || G(A)) D.push(Q ? A : A.fullpath());
    let Y = new Set,
      W = (F, X) => {
        Y.add(F), F.readdirCB((V, C) => {
          if (V) return X(V);
          let K = C.length;
          if (!K) return X();
          let E = () => {
            if (--K === 0) X()
          };
          for (let N of C) {
            if (!G || G(N)) D.push(Q ? N : N.fullpath());
            if (I && N.isSymbolicLink()) N.realpath().then((q) => q?.isUnknown() ? q.lstat() : q).then((q) => q?.shouldWalk(Y, Z) ? W(q, E) : E());
            else if (N.shouldWalk(Y, Z)) W(N, E);
            else E()
          }
        }, !0)
      },
      J = A;
    return new Promise((F, X) => {
      W(J, (V) => {
        if (V) return X(V);
        F(D)
      })
    })
  }
  walkSync(A = this.cwd, B = {}) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A, A = this.cwd;
    let {
      withFileTypes: Q = !0,
      follow: I = !1,
      filter: G,
      walkFilter: Z
    } = B, D = [];
    if (!G || G(A)) D.push(Q ? A : A.fullpath());
    let Y = new Set([A]);
    for (let W of Y) {
      let J = W.readdirSync();
      for (let F of J) {
        if (!G || G(F)) D.push(Q ? F : F.fullpath());
        let X = F;
        if (F.isSymbolicLink()) {
          if (!(I && (X = F.realpathSync()))) continue;
          if (X.isUnknown()) X.lstatSync()
        }
        if (X.shouldWalk(Y, Z)) Y.add(X)
      }
    }
    return D
  } [Symbol.asyncIterator]() {
    return this.iterate()
  }
  iterate(A = this.cwd, B = {}) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A, A = this.cwd;
    return this.stream(A, B)[Symbol.asyncIterator]()
  } [Symbol.iterator]() {
    return this.iterateSync()
  }* iterateSync(A = this.cwd, B = {}) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A, A = this.cwd;
    let {
      withFileTypes: Q = !0,
      follow: I = !1,
      filter: G,
      walkFilter: Z
    } = B;
    if (!G || G(A)) yield Q ? A : A.fullpath();
    let D = new Set([A]);
    for (let Y of D) {
      let W = Y.readdirSync();
      for (let J of W) {
        if (!G || G(J)) yield Q ? J : J.fullpath();
        let F = J;
        if (J.isSymbolicLink()) {
          if (!(I && (F = J.realpathSync()))) continue;
          if (F.isUnknown()) F.lstatSync()
        }
        if (F.shouldWalk(D, Z)) D.add(F)
      }
    }
  }
  stream(A = this.cwd, B = {}) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A, A = this.cwd;
    let {
      withFileTypes: Q = !0,
      follow: I = !1,
      filter: G,
      walkFilter: Z
    } = B, D = new WS({
      objectMode: !0
    });
    if (!G || G(A)) D.write(Q ? A : A.fullpath());
    let Y = new Set,
      W = [A],
      J = 0,
      F = () => {
        let X = !1;
        while (!X) {
          let V = W.shift();
          if (!V) {
            if (J === 0) D.end();
            return
          }
          J++, Y.add(V);
          let C = (E, N, q = !1) => {
              if (E) return D.emit("error", E);
              if (I && !q) {
                let O = [];
                for (let R of N)
                  if (R.isSymbolicLink()) O.push(R.realpath().then((T) => T?.isUnknown() ? T.lstat() : T));
                if (O.length) {
                  Promise.all(O).then(() => C(null, N, !0));
                  return
                }
              }
              for (let O of N)
                if (O && (!G || G(O))) {
                  if (!D.write(Q ? O : O.fullpath())) X = !0
                } J--;
              for (let O of N) {
                let R = O.realpathCached() || O;
                if (R.shouldWalk(Y, Z)) W.push(R)
              }
              if (X && !D.flowing) D.once("drain", F);
              else if (!K) F()
            },
            K = !0;
          V.readdirCB(C, !0), K = !1
        }
      };
    return F(), D
  }
  streamSync(A = this.cwd, B = {}) {
    if (typeof A === "string") A = this.cwd.resolve(A);
    else if (!(A instanceof LD)) B = A, A = this.cwd;
    let {
      withFileTypes: Q = !0,
      follow: I = !1,
      filter: G,
      walkFilter: Z
    } = B, D = new WS({
      objectMode: !0
    }), Y = new Set;
    if (!G || G(A)) D.write(Q ? A : A.fullpath());
    let W = [A],
      J = 0,
      F = () => {
        let X = !1;
        while (!X) {
          let V = W.shift();
          if (!V) {
            if (J === 0) D.end();
            return
          }
          J++, Y.add(V);
          let C = V.readdirSync();
          for (let K of C)
            if (!G || G(K)) {
              if (!D.write(Q ? K : K.fullpath())) X = !0
            } J--;
          for (let K of C) {
            let E = K;
            if (K.isSymbolicLink()) {
              if (!(I && (E = K.realpathSync()))) continue;
              if (E.isUnknown()) E.lstatSync()
            }
            if (E.shouldWalk(Y, Z)) W.push(E)
          }
        }
        if (X && !D.flowing) D.once("drain", F)
      };
    return F(), D
  }
  chdir(A = this.cwd) {
    let B = this.cwd;
    this.cwd = typeof A === "string" ? this.cwd.resolve(A) : A, this.cwd[IwA](B)
  }
}
// @from(Start 8505363, End 8505943)
class Ji extends pL1 {
  sep = "\\";
  constructor(A = process.cwd(), B = {}) {
    let {
      nocase: Q = !0
    } = B;
    super(A, dL1, "\\", {
      ...B,
      nocase: Q
    });
    this.nocase = Q;
    for (let I = this.cwd; I; I = I.parent) I.nocase = this.nocase
  }
  parseRootPath(A) {
    return dL1.parse(A).root.toUpperCase()
  }
  newRoot(A) {
    return new U51(this.rootPath, Fz, void 0, this.roots, this.nocase, this.childrenCache(), {
      fs: A
    })
  }
  isAbsolute(A) {
    return A.startsWith("/") || A.startsWith("\\") || /^[a-z]:(\/|\\)/i.test(A)
  }
}
// @from(Start 8505944, End 8506375)
class Fi extends pL1 {
  sep = "/";
  constructor(A = process.cwd(), B = {}) {
    let {
      nocase: Q = !1
    } = B;
    super(A, Jq9, "/", {
      ...B,
      nocase: Q
    });
    this.nocase = Q
  }
  parseRootPath(A) {
    return "/"
  }
  newRoot(A) {
    return new N51(this.rootPath, Fz, void 0, this.roots, this.nocase, this.childrenCache(), {
      fs: A
    })
  }
  isAbsolute(A) {
    return A.startsWith("/")
  }
}
// @from(Start 8506376, End 8506539)
class $51 extends Fi {
  constructor(A = process.cwd(), B = {}) {
    let {
      nocase: Q = !0
    } = B;
    super(A, {
      ...B,
      nocase: Q
    })
  }
}
// @from(Start 8506544, End 8506590)
Ql5 = process.platform === "win32" ? U51 : N51
// @from(Start 8506594, End 8506676)
GwA = process.platform === "win32" ? Ji : process.platform === "darwin" ? $51 : Fi
// @from(Start 8506682, End 8506708)
Rq9 = (A) => A.length >= 1
// @from(Start 8506712, End 8506738)
Oq9 = (A) => A.length >= 1
// @from(Start 8506740, End 8509514)
class $f {
  #A;
  #B;
  #Q;
  length;
  #I;
  #G;
  #W;
  #Z;
  #F;
  #J;
  #X = !0;
  constructor(A, B, Q, I) {
    if (!Rq9(A)) throw new TypeError("empty pattern list");
    if (!Oq9(B)) throw new TypeError("empty glob list");
    if (B.length !== A.length) throw new TypeError("mismatched pattern list and glob list lengths");
    if (this.length = A.length, Q < 0 || Q >= this.length) throw new TypeError("index out of range");
    if (this.#A = A, this.#B = B, this.#Q = Q, this.#I = I, this.#Q === 0) {
      if (this.isUNC()) {
        let [G, Z, D, Y, ...W] = this.#A, [J, F, X, V, ...C] = this.#B;
        if (W[0] === "") W.shift(), C.shift();
        let K = [G, Z, D, Y, ""].join("/"),
          E = [J, F, X, V, ""].join("/");
        this.#A = [K, ...W], this.#B = [E, ...C], this.length = this.#A.length
      } else if (this.isDrive() || this.isAbsolute()) {
        let [G, ...Z] = this.#A, [D, ...Y] = this.#B;
        if (Z[0] === "") Z.shift(), Y.shift();
        let W = G + "/",
          J = D + "/";
        this.#A = [W, ...Z], this.#B = [J, ...Y], this.length = this.#A.length
      }
    }
  }
  pattern() {
    return this.#A[this.#Q]
  }
  isString() {
    return typeof this.#A[this.#Q] === "string"
  }
  isGlobstar() {
    return this.#A[this.#Q] === HG
  }
  isRegExp() {
    return this.#A[this.#Q] instanceof RegExp
  }
  globString() {
    return this.#W = this.#W || (this.#Q === 0 ? this.isAbsolute() ? this.#B[0] + this.#B.slice(1).join("/") : this.#B.join("/") : this.#B.slice(this.#Q).join("/"))
  }
  hasMore() {
    return this.length > this.#Q + 1
  }
  rest() {
    if (this.#G !== void 0) return this.#G;
    if (!this.hasMore()) return this.#G = null;
    return this.#G = new $f(this.#A, this.#B, this.#Q + 1, this.#I), this.#G.#J = this.#J, this.#G.#F = this.#F, this.#G.#Z = this.#Z, this.#G
  }
  isUNC() {
    let A = this.#A;
    return this.#F !== void 0 ? this.#F : this.#F = this.#I === "win32" && this.#Q === 0 && A[0] === "" && A[1] === "" && typeof A[2] === "string" && !!A[2] && typeof A[3] === "string" && !!A[3]
  }
  isDrive() {
    let A = this.#A;
    return this.#Z !== void 0 ? this.#Z : this.#Z = this.#I === "win32" && this.#Q === 0 && this.length > 1 && typeof A[0] === "string" && /^[a-z]:$/i.test(A[0])
  }
  isAbsolute() {
    let A = this.#A;
    return this.#J !== void 0 ? this.#J : this.#J = A[0] === "" && A.length > 1 || this.isDrive() || this.isUNC()
  }
  root() {
    let A = this.#A[0];
    return typeof A === "string" && this.isAbsolute() && this.#Q === 0 ? A : ""
  }
  checkFollowGlobstar() {
    return !(this.#Q === 0 || !this.isGlobstar() || !this.#X)
  }
  markFollowGlobstar() {
    if (this.#Q === 0 || !this.isGlobstar() || !this.#X) return !1;
    return this.#X = !1, !0
  }
}
// @from(Start 8509519, End 8509632)
Tq9 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux"
// @from(Start 8509634, End 8511360)
class Xi {
  relative;
  relativeChildren;
  absolute;
  absoluteChildren;
  platform;
  mmopts;
  constructor(A, {
    nobrace: B,
    nocase: Q,
    noext: I,
    noglobstar: G,
    platform: Z = Tq9
  }) {
    this.relative = [], this.absolute = [], this.relativeChildren = [], this.absoluteChildren = [], this.platform = Z, this.mmopts = {
      dot: !0,
      nobrace: B,
      nocase: Q,
      noext: I,
      noglobstar: G,
      optimizationLevel: 2,
      platform: Z,
      nocomment: !0,
      nonegate: !0
    };
    for (let D of A) this.add(D)
  }
  add(A) {
    let B = new iF(A, this.mmopts);
    for (let Q = 0; Q < B.set.length; Q++) {
      let I = B.set[Q],
        G = B.globParts[Q];
      if (!I || !G) throw new Error("invalid pattern object");
      while (I[0] === "." && G[0] === ".") I.shift(), G.shift();
      let Z = new $f(I, G, 0, this.platform),
        D = new iF(Z.globString(), this.mmopts),
        Y = G[G.length - 1] === "**",
        W = Z.isAbsolute();
      if (W) this.absolute.push(D);
      else this.relative.push(D);
      if (Y)
        if (W) this.absoluteChildren.push(D);
        else this.relativeChildren.push(D)
    }
  }
  ignored(A) {
    let B = A.fullpath(),
      Q = `${B}/`,
      I = A.relative() || ".",
      G = `${I}/`;
    for (let Z of this.relative)
      if (Z.match(I) || Z.match(G)) return !0;
    for (let Z of this.absolute)
      if (Z.match(B) || Z.match(Q)) return !0;
    return !1
  }
  childrenIgnored(A) {
    let B = A.fullpath() + "/",
      Q = (A.relative() || ".") + "/";
    for (let I of this.relativeChildren)
      if (I.match(Q)) return !0;
    for (let I of this.absoluteChildren)
      if (I.match(B)) return !0;
    return !1
  }
}
// @from(Start 8511361, End 8511744)
class cL1 {
  store;
  constructor(A = new Map) {
    this.store = A
  }
  copy() {
    return new cL1(new Map(this.store))
  }
  hasWalked(A, B) {
    return this.store.get(A.fullpath())?.has(B.globString())
  }
  storeWalked(A, B) {
    let Q = A.fullpath(),
      I = this.store.get(Q);
    if (I) I.add(B.globString());
    else this.store.set(Q, new Set([B.globString()]))
  }
}
// @from(Start 8511745, End 8512012)
class ZwA {
  store = new Map;
  add(A, B, Q) {
    let I = (B ? 2 : 0) | (Q ? 1 : 0),
      G = this.store.get(A);
    this.store.set(A, G === void 0 ? I : I & G)
  }
  entries() {
    return [...this.store.entries()].map(([A, B]) => [A, !!(B & 2), !!(B & 1)])
  }
}
// @from(Start 8512013, End 8512523)
class DwA {
  store = new Map;
  add(A, B) {
    if (!A.canReaddir()) return;
    let Q = this.store.get(A);
    if (Q) {
      if (!Q.find((I) => I.globString() === B.globString())) Q.push(B)
    } else this.store.set(A, [B])
  }
  get(A) {
    let B = this.store.get(A);
    if (!B) throw new Error("attempting to walk unknown path");
    return B
  }
  entries() {
    return this.keys().map((A) => [A, this.store.get(A)])
  }
  keys() {
    return [...this.store.keys()].filter((A) => A.canReaddir())
  }
}
// @from(Start 8512524, End 8515810)
class Vi {
  hasWalkedCache;
  matches = new ZwA;
  subwalks = new DwA;
  patterns;
  follow;
  dot;
  opts;
  constructor(A, B) {
    this.opts = A, this.follow = !!A.follow, this.dot = !!A.dot, this.hasWalkedCache = B ? B.copy() : new cL1
  }
  processPatterns(A, B) {
    this.patterns = B;
    let Q = B.map((I) => [A, I]);
    for (let [I, G] of Q) {
      this.hasWalkedCache.storeWalked(I, G);
      let Z = G.root(),
        D = G.isAbsolute() && this.opts.absolute !== !1;
      if (Z) {
        I = I.resolve(Z === "/" && this.opts.root !== void 0 ? this.opts.root : Z);
        let F = G.rest();
        if (!F) {
          this.matches.add(I, !0, !1);
          continue
        } else G = F
      }
      if (I.isENOENT()) continue;
      let Y, W, J = !1;
      while (typeof(Y = G.pattern()) === "string" && (W = G.rest())) I = I.resolve(Y), G = W, J = !0;
      if (Y = G.pattern(), W = G.rest(), J) {
        if (this.hasWalkedCache.hasWalked(I, G)) continue;
        this.hasWalkedCache.storeWalked(I, G)
      }
      if (typeof Y === "string") {
        let F = Y === ".." || Y === "" || Y === ".";
        this.matches.add(I.resolve(Y), D, F);
        continue
      } else if (Y === HG) {
        if (!I.isSymbolicLink() || this.follow || G.checkFollowGlobstar()) this.subwalks.add(I, G);
        let F = W?.pattern(),
          X = W?.rest();
        if (!W || (F === "" || F === ".") && !X) this.matches.add(I, D, F === "" || F === ".");
        else if (F === "..") {
          let V = I.parent || I;
          if (!X) this.matches.add(V, D, !0);
          else if (!this.hasWalkedCache.hasWalked(V, X)) this.subwalks.add(V, X)
        }
      } else if (Y instanceof RegExp) this.subwalks.add(I, G)
    }
    return this
  }
  subwalkTargets() {
    return this.subwalks.keys()
  }
  child() {
    return new Vi(this.opts, this.hasWalkedCache)
  }
  filterEntries(A, B) {
    let Q = this.subwalks.get(A),
      I = this.child();
    for (let G of B)
      for (let Z of Q) {
        let D = Z.isAbsolute(),
          Y = Z.pattern(),
          W = Z.rest();
        if (Y === HG) I.testGlobstar(G, Z, W, D);
        else if (Y instanceof RegExp) I.testRegExp(G, Y, W, D);
        else I.testString(G, Y, W, D)
      }
    return I
  }
  testGlobstar(A, B, Q, I) {
    if (this.dot || !A.name.startsWith(".")) {
      if (!B.hasMore()) this.matches.add(A, I, !1);
      if (A.canReaddir()) {
        if (this.follow || !A.isSymbolicLink()) this.subwalks.add(A, B);
        else if (A.isSymbolicLink()) {
          if (Q && B.checkFollowGlobstar()) this.subwalks.add(A, Q);
          else if (B.markFollowGlobstar()) this.subwalks.add(A, B)
        }
      }
    }
    if (Q) {
      let G = Q.pattern();
      if (typeof G === "string" && G !== ".." && G !== "" && G !== ".") this.testString(A, G, Q.rest(), I);
      else if (G === "..") {
        let Z = A.parent || A;
        this.subwalks.add(Z, Q)
      } else if (G instanceof RegExp) this.testRegExp(A, G, Q.rest(), I)
    }
  }
  testRegExp(A, B, Q, I) {
    if (!B.test(A.name)) return;
    if (!Q) this.matches.add(A, I, !1);
    else this.subwalks.add(A, Q)
  }
  testString(A, B, Q, I) {
    if (!A.isNamed(B)) return;
    if (!Q) this.matches.add(A, I, !1);
    else this.subwalks.add(A, Q)
  }
}
// @from(Start 8515815, End 8515907)
Pq9 = (A, B) => typeof A === "string" ? new Xi([A], B) : Array.isArray(A) ? new Xi(A, B) : A
// @from(Start 8515909, End 8521487)
class lL1 {
  path;
  patterns;
  opts;
  seen = new Set;
  paused = !1;
  aborted = !1;
  #A = [];
  #B;
  #Q;
  signal;
  maxDepth;
  includeChildMatches;
  constructor(A, B, Q) {
    if (this.patterns = A, this.path = B, this.opts = Q, this.#Q = !Q.posix && Q.platform === "win32" ? "\\" : "/", this.includeChildMatches = Q.includeChildMatches !== !1, Q.ignore || !this.includeChildMatches) {
      if (this.#B = Pq9(Q.ignore ?? [], Q), !this.includeChildMatches && typeof this.#B.add !== "function") throw new Error("cannot ignore child matches, ignore lacks add() method.")
    }
    if (this.maxDepth = Q.maxDepth || 1 / 0, Q.signal) this.signal = Q.signal, this.signal.addEventListener("abort", () => {
      this.#A.length = 0
    })
  }
  #I(A) {
    return this.seen.has(A) || !!this.#B?.ignored?.(A)
  }
  #G(A) {
    return !!this.#B?.childrenIgnored?.(A)
  }
  pause() {
    this.paused = !0
  }
  resume() {
    if (this.signal?.aborted) return;
    this.paused = !1;
    let A = void 0;
    while (!this.paused && (A = this.#A.shift())) A()
  }
  onResume(A) {
    if (this.signal?.aborted) return;
    if (!this.paused) A();
    else this.#A.push(A)
  }
  async matchCheck(A, B) {
    if (B && this.opts.nodir) return;
    let Q;
    if (this.opts.realpath) {
      if (Q = A.realpathCached() || await A.realpath(), !Q) return;
      A = Q
    }
    let G = A.isUnknown() || this.opts.stat ? await A.lstat() : A;
    if (this.opts.follow && this.opts.nodir && G?.isSymbolicLink()) {
      let Z = await G.realpath();
      if (Z && (Z.isUnknown() || this.opts.stat)) await Z.lstat()
    }
    return this.matchCheckTest(G, B)
  }
  matchCheckTest(A, B) {
    return A && (this.maxDepth === 1 / 0 || A.depth() <= this.maxDepth) && (!B || A.canReaddir()) && (!this.opts.nodir || !A.isDirectory()) && (!this.opts.nodir || !this.opts.follow || !A.isSymbolicLink() || !A.realpathCached()?.isDirectory()) && !this.#I(A) ? A : void 0
  }
  matchCheckSync(A, B) {
    if (B && this.opts.nodir) return;
    let Q;
    if (this.opts.realpath) {
      if (Q = A.realpathCached() || A.realpathSync(), !Q) return;
      A = Q
    }
    let G = A.isUnknown() || this.opts.stat ? A.lstatSync() : A;
    if (this.opts.follow && this.opts.nodir && G?.isSymbolicLink()) {
      let Z = G.realpathSync();
      if (Z && (Z?.isUnknown() || this.opts.stat)) Z.lstatSync()
    }
    return this.matchCheckTest(G, B)
  }
  matchFinish(A, B) {
    if (this.#I(A)) return;
    if (!this.includeChildMatches && this.#B?.add) {
      let G = `${A.relativePosix()}/**`;
      this.#B.add(G)
    }
    let Q = this.opts.absolute === void 0 ? B : this.opts.absolute;
    this.seen.add(A);
    let I = this.opts.mark && A.isDirectory() ? this.#Q : "";
    if (this.opts.withFileTypes) this.matchEmit(A);
    else if (Q) {
      let G = this.opts.posix ? A.fullpathPosix() : A.fullpath();
      this.matchEmit(G + I)
    } else {
      let G = this.opts.posix ? A.relativePosix() : A.relative(),
        Z = this.opts.dotRelative && !G.startsWith(".." + this.#Q) ? "." + this.#Q : "";
      this.matchEmit(!G ? "." + I : Z + G + I)
    }
  }
  async match(A, B, Q) {
    let I = await this.matchCheck(A, Q);
    if (I) this.matchFinish(I, B)
  }
  matchSync(A, B, Q) {
    let I = this.matchCheckSync(A, Q);
    if (I) this.matchFinish(I, B)
  }
  walkCB(A, B, Q) {
    if (this.signal?.aborted) Q();
    this.walkCB2(A, B, new Vi(this.opts), Q)
  }
  walkCB2(A, B, Q, I) {
    if (this.#G(A)) return I();
    if (this.signal?.aborted) I();
    if (this.paused) {
      this.onResume(() => this.walkCB2(A, B, Q, I));
      return
    }
    Q.processPatterns(A, B);
    let G = 1,
      Z = () => {
        if (--G === 0) I()
      };
    for (let [D, Y, W] of Q.matches.entries()) {
      if (this.#I(D)) continue;
      G++, this.match(D, Y, W).then(() => Z())
    }
    for (let D of Q.subwalkTargets()) {
      if (this.maxDepth !== 1 / 0 && D.depth() >= this.maxDepth) continue;
      G++;
      let Y = D.readdirCached();
      if (D.calledReaddir()) this.walkCB3(D, Y, Q, Z);
      else D.readdirCB((W, J) => this.walkCB3(D, J, Q, Z), !0)
    }
    Z()
  }
  walkCB3(A, B, Q, I) {
    Q = Q.filterEntries(A, B);
    let G = 1,
      Z = () => {
        if (--G === 0) I()
      };
    for (let [D, Y, W] of Q.matches.entries()) {
      if (this.#I(D)) continue;
      G++, this.match(D, Y, W).then(() => Z())
    }
    for (let [D, Y] of Q.subwalks.entries()) G++, this.walkCB2(D, Y, Q.child(), Z);
    Z()
  }
  walkCBSync(A, B, Q) {
    if (this.signal?.aborted) Q();
    this.walkCB2Sync(A, B, new Vi(this.opts), Q)
  }
  walkCB2Sync(A, B, Q, I) {
    if (this.#G(A)) return I();
    if (this.signal?.aborted) I();
    if (this.paused) {
      this.onResume(() => this.walkCB2Sync(A, B, Q, I));
      return
    }
    Q.processPatterns(A, B);
    let G = 1,
      Z = () => {
        if (--G === 0) I()
      };
    for (let [D, Y, W] of Q.matches.entries()) {
      if (this.#I(D)) continue;
      this.matchSync(D, Y, W)
    }
    for (let D of Q.subwalkTargets()) {
      if (this.maxDepth !== 1 / 0 && D.depth() >= this.maxDepth) continue;
      G++;
      let Y = D.readdirSync();
      this.walkCB3Sync(D, Y, Q, Z)
    }
    Z()
  }
  walkCB3Sync(A, B, Q, I) {
    Q = Q.filterEntries(A, B);
    let G = 1,
      Z = () => {
        if (--G === 0) I()
      };
    for (let [D, Y, W] of Q.matches.entries()) {
      if (this.#I(D)) continue;
      this.matchSync(D, Y, W)
    }
    for (let [D, Y] of Q.subwalks.entries()) G++, this.walkCB2Sync(D, Y, Q.child(), Z);
    Z()
  }
}
// @from(Start 8521488, End 8522237)
class q51 extends lL1 {
  matches = new Set;
  constructor(A, B, Q) {
    super(A, B, Q)
  }
  matchEmit(A) {
    this.matches.add(A)
  }
  async walk() {
    if (this.signal?.aborted) throw this.signal.reason;
    if (this.path.isUnknown()) await this.path.lstat();
    return await new Promise((A, B) => {
      this.walkCB(this.path, this.patterns, () => {
        if (this.signal?.aborted) B(this.signal.reason);
        else A(this.matches)
      })
    }), this.matches
  }
  walkSync() {
    if (this.signal?.aborted) throw this.signal.reason;
    if (this.path.isUnknown()) this.path.lstatSync();
    return this.walkCBSync(this.path, this.patterns, () => {
      if (this.signal?.aborted) throw this.signal.reason
    }), this.matches
  }
}
// @from(Start 8522238, End 8523003)
class M51 extends lL1 {
  results;
  constructor(A, B, Q) {
    super(A, B, Q);
    this.results = new WS({
      signal: this.signal,
      objectMode: !0
    }), this.results.on("drain", () => this.resume()), this.results.on("resume", () => this.resume())
  }
  matchEmit(A) {
    if (this.results.write(A), !this.results.flowing) this.pause()
  }
  stream() {
    let A = this.path;
    if (A.isUnknown()) A.lstat().then(() => {
      this.walkCB(A, this.patterns, () => this.results.end())
    });
    else this.walkCB(A, this.patterns, () => this.results.end());
    return this.results
  }
  streamSync() {
    if (this.path.isUnknown()) this.path.lstatSync();
    return this.walkCBSync(this.path, this.patterns, () => this.results.end()), this.results
  }
}
// @from(Start 8523008, End 8523121)
_q9 = typeof process === "object" && process && typeof process.platform === "string" ? process.platform : "linux"
// @from(Start 8523123, End 8527655)
class Xz {
  absolute;
  cwd;
  root;
  dot;
  dotRelative;
  follow;
  ignore;
  magicalBraces;
  mark;
  matchBase;
  maxDepth;
  nobrace;
  nocase;
  nodir;
  noext;
  noglobstar;
  pattern;
  platform;
  realpath;
  scurry;
  stat;
  signal;
  windowsPathsNoEscape;
  withFileTypes;
  includeChildMatches;
  opts;
  patterns;
  constructor(A, B) {
    if (!B) throw new TypeError("glob options required");
    if (this.withFileTypes = !!B.withFileTypes, this.signal = B.signal, this.follow = !!B.follow, this.dot = !!B.dot, this.dotRelative = !!B.dotRelative, this.nodir = !!B.nodir, this.mark = !!B.mark, !B.cwd) this.cwd = "";
    else if (B.cwd instanceof URL || B.cwd.startsWith("file://")) B.cwd = Sq9(B.cwd);
    if (this.cwd = B.cwd || "", this.root = B.root, this.magicalBraces = !!B.magicalBraces, this.nobrace = !!B.nobrace, this.noext = !!B.noext, this.realpath = !!B.realpath, this.absolute = B.absolute, this.includeChildMatches = B.includeChildMatches !== !1, this.noglobstar = !!B.noglobstar, this.matchBase = !!B.matchBase, this.maxDepth = typeof B.maxDepth === "number" ? B.maxDepth : 1 / 0, this.stat = !!B.stat, this.ignore = B.ignore, this.withFileTypes && this.absolute !== void 0) throw new Error("cannot set absolute and withFileTypes:true");
    if (typeof A === "string") A = [A];
    if (this.windowsPathsNoEscape = !!B.windowsPathsNoEscape || B.allowWindowsEscape === !1, this.windowsPathsNoEscape) A = A.map((Y) => Y.replace(/\\/g, "/"));
    if (this.matchBase) {
      if (B.noglobstar) throw new TypeError("base matching requires globstar");
      A = A.map((Y) => Y.includes("/") ? Y : `./**/${Y}`)
    }
    if (this.pattern = A, this.platform = B.platform || _q9, this.opts = {
        ...B,
        platform: this.platform
      }, B.scurry) {
      if (this.scurry = B.scurry, B.nocase !== void 0 && B.nocase !== B.scurry.nocase) throw new Error("nocase option contradicts provided scurry option")
    } else {
      let Y = B.platform === "win32" ? Ji : B.platform === "darwin" ? $51 : B.platform ? Fi : GwA;
      this.scurry = new Y(this.cwd, {
        nocase: B.nocase,
        fs: B.fs
      })
    }
    this.nocase = this.scurry.nocase;
    let Q = this.platform === "darwin" || this.platform === "win32",
      I = {
        ...B,
        dot: this.dot,
        matchBase: this.matchBase,
        nobrace: this.nobrace,
        nocase: this.nocase,
        nocaseMagicOnly: Q,
        nocomment: !0,
        noext: this.noext,
        nonegate: !0,
        optimizationLevel: 2,
        platform: this.platform,
        windowsPathsNoEscape: this.windowsPathsNoEscape,
        debug: !!this.opts.debug
      },
      G = this.pattern.map((Y) => new iF(Y, I)),
      [Z, D] = G.reduce((Y, W) => {
        return Y[0].push(...W.set), Y[1].push(...W.globParts), Y
      }, [
        [],
        []
      ]);
    this.patterns = Z.map((Y, W) => {
      let J = D[W];
      if (!J) throw new Error("invalid pattern object");
      return new $f(Y, J, 0, this.platform)
    })
  }
  async walk() {
    return [...await new q51(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).walk()]
  }
  walkSync() {
    return [...new q51(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).walkSync()]
  }
  stream() {
    return new M51(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).stream()
  }
  streamSync() {
    return new M51(this.patterns, this.scurry.cwd, {
      ...this.opts,
      maxDepth: this.maxDepth !== 1 / 0 ? this.maxDepth + this.scurry.cwd.depth() : 1 / 0,
      platform: this.platform,
      nocase: this.nocase,
      includeChildMatches: this.includeChildMatches
    }).streamSync()
  }
  iterateSync() {
    return this.streamSync()[Symbol.iterator]()
  } [Symbol.iterator]() {
    return this.iterateSync()
  }
  iterate() {
    return this.stream()[Symbol.asyncIterator]()
  } [Symbol.asyncIterator]() {
    return this.iterate()
  }
}
// @from(Start 8527660, End 8527793)
iL1 = (A, B = {}) => {
  if (!Array.isArray(A)) A = [A];
  for (let Q of A)
    if (new iF(Q, B).hasMagic()) return !0;
  return !1
}
// @from(Start 8527796, End 8527858)
function R51(A, B = {}) {
  return new Xz(A, B).streamSync()
}
// @from(Start 8527860, End 8527918)
function WwA(A, B = {}) {
  return new Xz(A, B).stream()
}