
// @from(Start 4702048, End 4715500)
Z_0 = z((G_0) => {
  Object.defineProperty(G_0, "t", {
    value: !0
  });
  class Rh1 {
    constructor(A, B, Q = 1) {
      this.i = void 0, this.h = void 0, this.o = void 0, this.u = A, this.l = B, this.p = Q
    }
    I() {
      let A = this,
        B = A.o.o === A;
      if (B && A.p === 1) A = A.h;
      else if (A.i) {
        A = A.i;
        while (A.h) A = A.h
      } else {
        if (B) return A.o;
        let Q = A.o;
        while (Q.i === A) A = Q, Q = A.o;
        A = Q
      }
      return A
    }
    B() {
      let A = this;
      if (A.h) {
        A = A.h;
        while (A.i) A = A.i;
        return A
      } else {
        let B = A.o;
        while (B.h === A) A = B, B = A.o;
        if (A.h !== B) return B;
        else return A
      }
    }
    _() {
      let A = this.o,
        B = this.h,
        Q = B.i;
      if (A.o === this) A.o = B;
      else if (A.i === this) A.i = B;
      else A.h = B;
      if (B.o = A, B.i = this, this.o = B, this.h = Q, Q) Q.o = this;
      return B
    }
    g() {
      let A = this.o,
        B = this.i,
        Q = B.h;
      if (A.o === this) A.o = B;
      else if (A.i === this) A.i = B;
      else A.h = B;
      if (B.o = A, B.h = this, this.o = B, this.i = Q, Q) Q.o = this;
      return B
    }
  }
  class oS0 extends Rh1 {
    constructor() {
      super(...arguments);
      this.M = 1
    }
    _() {
      let A = super._();
      return this.O(), A.O(), A
    }
    g() {
      let A = super.g();
      return this.O(), A.O(), A
    }
    O() {
      if (this.M = 1, this.i) this.M += this.i.M;
      if (this.h) this.M += this.h.M
    }
  }
  class tS0 {
    constructor(A = 0) {
      this.iteratorType = A
    }
    equals(A) {
      return this.T === A.T
    }
  }
  class eS0 {
    constructor() {
      this.m = 0
    }
    get length() {
      return this.m
    }
    size() {
      return this.m
    }
    empty() {
      return this.m === 0
    }
  }
  class A_0 extends eS0 {}

  function s_() {
    throw new RangeError("Iterator access denied!")
  }
  class B_0 extends A_0 {
    constructor(A = function(Q, I) {
      if (Q < I) return -1;
      if (Q > I) return 1;
      return 0
    }, B = !1) {
      super();
      this.v = void 0, this.A = A, this.enableIndex = B, this.N = B ? oS0 : Rh1, this.C = new this.N
    }
    R(A, B) {
      let Q = this.C;
      while (A) {
        let I = this.A(A.u, B);
        if (I < 0) A = A.h;
        else if (I > 0) Q = A, A = A.i;
        else return A
      }
      return Q
    }
    K(A, B) {
      let Q = this.C;
      while (A)
        if (this.A(A.u, B) <= 0) A = A.h;
        else Q = A, A = A.i;
      return Q
    }
    L(A, B) {
      let Q = this.C;
      while (A) {
        let I = this.A(A.u, B);
        if (I < 0) Q = A, A = A.h;
        else if (I > 0) A = A.i;
        else return A
      }
      return Q
    }
    k(A, B) {
      let Q = this.C;
      while (A)
        if (this.A(A.u, B) < 0) Q = A, A = A.h;
        else A = A.i;
      return Q
    }
    P(A) {
      while (!0) {
        let B = A.o;
        if (B === this.C) return;
        if (A.p === 1) {
          A.p = 0;
          return
        }
        if (A === B.i) {
          let Q = B.h;
          if (Q.p === 1)
            if (Q.p = 0, B.p = 1, B === this.v) this.v = B._();
            else B._();
          else if (Q.h && Q.h.p === 1) {
            if (Q.p = B.p, B.p = 0, Q.h.p = 0, B === this.v) this.v = B._();
            else B._();
            return
          } else if (Q.i && Q.i.p === 1) Q.p = 1, Q.i.p = 0, Q.g();
          else Q.p = 1, A = B
        } else {
          let Q = B.i;
          if (Q.p === 1)
            if (Q.p = 0, B.p = 1, B === this.v) this.v = B.g();
            else B.g();
          else if (Q.i && Q.i.p === 1) {
            if (Q.p = B.p, B.p = 0, Q.i.p = 0, B === this.v) this.v = B.g();
            else B.g();
            return
          } else if (Q.h && Q.h.p === 1) Q.p = 1, Q.h.p = 0, Q._();
          else Q.p = 1, A = B
        }
      }
    }
    S(A) {
      if (this.m === 1) {
        this.clear();
        return
      }
      let B = A;
      while (B.i || B.h) {
        if (B.h) {
          B = B.h;
          while (B.i) B = B.i
        } else B = B.i;
        let I = A.u;
        A.u = B.u, B.u = I;
        let G = A.l;
        A.l = B.l, B.l = G, A = B
      }
      if (this.C.i === B) this.C.i = B.o;
      else if (this.C.h === B) this.C.h = B.o;
      this.P(B);
      let Q = B.o;
      if (B === Q.i) Q.i = void 0;
      else Q.h = void 0;
      if (this.m -= 1, this.v.p = 0, this.enableIndex)
        while (Q !== this.C) Q.M -= 1, Q = Q.o
    }
    U(A) {
      let B = typeof A === "number" ? A : void 0,
        Q = typeof A === "function" ? A : void 0,
        I = typeof A === "undefined" ? [] : void 0,
        G = 0,
        Z = this.v,
        D = [];
      while (D.length || Z)
        if (Z) D.push(Z), Z = Z.i;
        else {
          if (Z = D.pop(), G === B) return Z;
          I && I.push(Z), Q && Q(Z, G, this), G += 1, Z = Z.h
        } return I
    }
    j(A) {
      while (!0) {
        let B = A.o;
        if (B.p === 0) return;
        let Q = B.o;
        if (B === Q.i) {
          let I = Q.h;
          if (I && I.p === 1) {
            if (I.p = B.p = 0, Q === this.v) return;
            Q.p = 1, A = Q;
            continue
          } else if (A === B.h) {
            if (A.p = 0, A.i) A.i.o = B;
            if (A.h) A.h.o = Q;
            if (B.h = A.i, Q.i = A.h, A.i = B, A.h = Q, Q === this.v) this.v = A, this.C.o = A;
            else {
              let G = Q.o;
              if (G.i === Q) G.i = A;
              else G.h = A
            }
            A.o = Q.o, B.o = A, Q.o = A, Q.p = 1
          } else {
            if (B.p = 0, Q === this.v) this.v = Q.g();
            else Q.g();
            Q.p = 1;
            return
          }
        } else {
          let I = Q.i;
          if (I && I.p === 1) {
            if (I.p = B.p = 0, Q === this.v) return;
            Q.p = 1, A = Q;
            continue
          } else if (A === B.i) {
            if (A.p = 0, A.i) A.i.o = Q;
            if (A.h) A.h.o = B;
            if (Q.h = A.i, B.i = A.h, A.i = Q, A.h = B, Q === this.v) this.v = A, this.C.o = A;
            else {
              let G = Q.o;
              if (G.i === Q) G.i = A;
              else G.h = A
            }
            A.o = Q.o, B.o = A, Q.o = A, Q.p = 1
          } else {
            if (B.p = 0, Q === this.v) this.v = Q._();
            else Q._();
            Q.p = 1;
            return
          }
        }
        if (this.enableIndex) B.O(), Q.O(), A.O();
        return
      }
    }
    q(A, B, Q) {
      if (this.v === void 0) return this.m += 1, this.v = new this.N(A, B, 0), this.v.o = this.C, this.C.o = this.C.i = this.C.h = this.v, this.m;
      let I, G = this.C.i,
        Z = this.A(G.u, A);
      if (Z === 0) return G.l = B, this.m;
      else if (Z > 0) G.i = new this.N(A, B), G.i.o = G, I = G.i, this.C.i = I;
      else {
        let D = this.C.h,
          Y = this.A(D.u, A);
        if (Y === 0) return D.l = B, this.m;
        else if (Y < 0) D.h = new this.N(A, B), D.h.o = D, I = D.h, this.C.h = I;
        else {
          if (Q !== void 0) {
            let W = Q.T;
            if (W !== this.C) {
              let J = this.A(W.u, A);
              if (J === 0) return W.l = B, this.m;
              else if (J > 0) {
                let F = W.I(),
                  X = this.A(F.u, A);
                if (X === 0) return F.l = B, this.m;
                else if (X < 0)
                  if (I = new this.N(A, B), F.h === void 0) F.h = I, I.o = F;
                  else W.i = I, I.o = W
              }
            }
          }
          if (I === void 0) {
            I = this.v;
            while (!0) {
              let W = this.A(I.u, A);
              if (W > 0) {
                if (I.i === void 0) {
                  I.i = new this.N(A, B), I.i.o = I, I = I.i;
                  break
                }
                I = I.i
              } else if (W < 0) {
                if (I.h === void 0) {
                  I.h = new this.N(A, B), I.h.o = I, I = I.h;
                  break
                }
                I = I.h
              } else return I.l = B, this.m
            }
          }
        }
      }
      if (this.enableIndex) {
        let D = I.o;
        while (D !== this.C) D.M += 1, D = D.o
      }
      return this.j(I), this.m += 1, this.m
    }
    H(A, B) {
      while (A) {
        let Q = this.A(A.u, B);
        if (Q < 0) A = A.h;
        else if (Q > 0) A = A.i;
        else return A
      }
      return A || this.C
    }
    clear() {
      this.m = 0, this.v = void 0, this.C.o = void 0, this.C.i = this.C.h = void 0
    }
    updateKeyByIterator(A, B) {
      let Q = A.T;
      if (Q === this.C) s_();
      if (this.m === 1) return Q.u = B, !0;
      let I = Q.B().u;
      if (Q === this.C.i) {
        if (this.A(I, B) > 0) return Q.u = B, !0;
        return !1
      }
      let G = Q.I().u;
      if (Q === this.C.h) {
        if (this.A(G, B) < 0) return Q.u = B, !0;
        return !1
      }
      if (this.A(G, B) >= 0 || this.A(I, B) <= 0) return !1;
      return Q.u = B, !0
    }
    eraseElementByPos(A) {
      if (A < 0 || A > this.m - 1) throw new RangeError;
      let B = this.U(A);
      return this.S(B), this.m
    }
    eraseElementByKey(A) {
      if (this.m === 0) return !1;
      let B = this.H(this.v, A);
      if (B === this.C) return !1;
      return this.S(B), !0
    }
    eraseElementByIterator(A) {
      let B = A.T;
      if (B === this.C) s_();
      let Q = B.h === void 0;
      if (A.iteratorType === 0) {
        if (Q) A.next()
      } else if (!Q || B.i === void 0) A.next();
      return this.S(B), A
    }
    getHeight() {
      if (this.m === 0) return 0;

      function A(B) {
        if (!B) return 0;
        return Math.max(A(B.i), A(B.h)) + 1
      }
      return A(this.v)
    }
  }
  class Q_0 extends tS0 {
    constructor(A, B, Q) {
      super(Q);
      if (this.T = A, this.C = B, this.iteratorType === 0) this.pre = function() {
        if (this.T === this.C.i) s_();
        return this.T = this.T.I(), this
      }, this.next = function() {
        if (this.T === this.C) s_();
        return this.T = this.T.B(), this
      };
      else this.pre = function() {
        if (this.T === this.C.h) s_();
        return this.T = this.T.B(), this
      }, this.next = function() {
        if (this.T === this.C) s_();
        return this.T = this.T.I(), this
      }
    }
    get index() {
      let A = this.T,
        B = this.C.o;
      if (A === this.C) {
        if (B) return B.M - 1;
        return 0
      }
      let Q = 0;
      if (A.i) Q += A.i.M;
      while (A !== B) {
        let I = A.o;
        if (A === I.h) {
          if (Q += 1, I.i) Q += I.i.M
        }
        A = I
      }
      return Q
    }
    isAccessible() {
      return this.T !== this.C
    }
  }
  class uC extends Q_0 {
    constructor(A, B, Q, I) {
      super(A, B, I);
      this.container = Q
    }
    get pointer() {
      if (this.T === this.C) s_();
      let A = this;
      return new Proxy([], {
        get(B, Q) {
          if (Q === "0") return A.T.u;
          else if (Q === "1") return A.T.l;
          return B[0] = A.T.u, B[1] = A.T.l, B[Q]
        },
        set(B, Q, I) {
          if (Q !== "1") throw new TypeError("prop must be 1");
          return A.T.l = I, !0
        }
      })
    }
    copy() {
      return new uC(this.T, this.C, this.container, this.iteratorType)
    }
  }
  class I_0 extends B_0 {
    constructor(A = [], B, Q) {
      super(B, Q);
      let I = this;
      A.forEach(function(G) {
        I.setElement(G[0], G[1])
      })
    }
    begin() {
      return new uC(this.C.i || this.C, this.C, this)
    }
    end() {
      return new uC(this.C, this.C, this)
    }
    rBegin() {
      return new uC(this.C.h || this.C, this.C, this, 1)
    }
    rEnd() {
      return new uC(this.C, this.C, this, 1)
    }
    front() {
      if (this.m === 0) return;
      let A = this.C.i;
      return [A.u, A.l]
    }
    back() {
      if (this.m === 0) return;
      let A = this.C.h;
      return [A.u, A.l]
    }
    lowerBound(A) {
      let B = this.R(this.v, A);
      return new uC(B, this.C, this)
    }
    upperBound(A) {
      let B = this.K(this.v, A);
      return new uC(B, this.C, this)
    }
    reverseLowerBound(A) {
      let B = this.L(this.v, A);
      return new uC(B, this.C, this)
    }
    reverseUpperBound(A) {
      let B = this.k(this.v, A);
      return new uC(B, this.C, this)
    }
    forEach(A) {
      this.U(function(B, Q, I) {
        A([B.u, B.l], Q, I)
      })
    }
    setElement(A, B, Q) {
      return this.q(A, B, Q)
    }
    getElementByPos(A) {
      if (A < 0 || A > this.m - 1) throw new RangeError;
      let B = this.U(A);
      return [B.u, B.l]
    }
    find(A) {
      let B = this.H(this.v, A);
      return new uC(B, this.C, this)
    }
    getElementByKey(A) {
      return this.H(this.v, A).l
    }
    union(A) {
      let B = this;
      return A.forEach(function(Q) {
        B.setElement(Q[0], Q[1])
      }), this.m
    }*[Symbol.iterator]() {
      let A = this.m,
        B = this.U();
      for (let Q = 0; Q < A; ++Q) {
        let I = B[Q];
        yield [I.u, I.l]
      }
    }
  }
  G_0.OrderedMap = I_0
})
// @from(Start 4715506, End 4715923)
ID1 = z((Y_0) => {
  Object.defineProperty(Y_0, "__esModule", {
    value: !0
  });
  Y_0.registerAdminService = f86;
  Y_0.addAdminServicesToServer = v86;
  var D_0 = [];

  function f86(A, B) {
    D_0.push({
      getServiceDefinition: A,
      getHandlers: B
    })
  }

  function v86(A) {
    for (let {
        getServiceDefinition: B,
        getHandlers: Q
      }
      of D_0) A.addService(B(), Q())
  }
})
// @from(Start 4715929, End 4719222)
K_0 = z((V_0) => {
  Object.defineProperty(V_0, "__esModule", {
    value: !0
  });
  V_0.ClientDuplexStreamImpl = V_0.ClientWritableStreamImpl = V_0.ClientReadableStreamImpl = V_0.ClientUnaryCallImpl = void 0;
  V_0.callErrorFromStatus = m86;
  var h86 = Z1("events"),
    Oh1 = Z1("stream"),
    as = y6();

  function m86(A, B) {
    let Q = `${A.code} ${as.Status[A.code]}: ${A.details}`,
      G = `${new Error(Q).stack}
for call at
${B}`;
    return Object.assign(new Error(Q), A, {
      stack: G
    })
  }
  class W_0 extends h86.EventEmitter {
    constructor() {
      super()
    }
    cancel() {
      var A;
      (A = this.call) === null || A === void 0 || A.cancelWithStatus(as.Status.CANCELLED, "Cancelled on client")
    }
    getPeer() {
      var A, B;
      return (B = (A = this.call) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : "unknown"
    }
  }
  V_0.ClientUnaryCallImpl = W_0;
  class J_0 extends Oh1.Readable {
    constructor(A) {
      super({
        objectMode: !0
      });
      this.deserialize = A
    }
    cancel() {
      var A;
      (A = this.call) === null || A === void 0 || A.cancelWithStatus(as.Status.CANCELLED, "Cancelled on client")
    }
    getPeer() {
      var A, B;
      return (B = (A = this.call) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : "unknown"
    }
    _read(A) {
      var B;
      (B = this.call) === null || B === void 0 || B.startRead()
    }
  }
  V_0.ClientReadableStreamImpl = J_0;
  class F_0 extends Oh1.Writable {
    constructor(A) {
      super({
        objectMode: !0
      });
      this.serialize = A
    }
    cancel() {
      var A;
      (A = this.call) === null || A === void 0 || A.cancelWithStatus(as.Status.CANCELLED, "Cancelled on client")
    }
    getPeer() {
      var A, B;
      return (B = (A = this.call) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : "unknown"
    }
    _write(A, B, Q) {
      var I;
      let G = {
          callback: Q
        },
        Z = Number(B);
      if (!Number.isNaN(Z)) G.flags = Z;
      (I = this.call) === null || I === void 0 || I.sendMessageWithContext(G, A)
    }
    _final(A) {
      var B;
      (B = this.call) === null || B === void 0 || B.halfClose(), A()
    }
  }
  V_0.ClientWritableStreamImpl = F_0;
  class X_0 extends Oh1.Duplex {
    constructor(A, B) {
      super({
        objectMode: !0
      });
      this.serialize = A, this.deserialize = B
    }
    cancel() {
      var A;
      (A = this.call) === null || A === void 0 || A.cancelWithStatus(as.Status.CANCELLED, "Cancelled on client")
    }
    getPeer() {
      var A, B;
      return (B = (A = this.call) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : "unknown"
    }
    _read(A) {
      var B;
      (B = this.call) === null || B === void 0 || B.startRead()
    }
    _write(A, B, Q) {
      var I;
      let G = {
          callback: Q
        },
        Z = Number(B);
      if (!Number.isNaN(Z)) G.flags = Z;
      (I = this.call) === null || I === void 0 || I.sendMessageWithContext(G, A)
    }
    _final(A) {
      var B;
      (B = this.call) === null || B === void 0 || B.halfClose(), A()
    }
  }
  V_0.ClientDuplexStreamImpl = X_0
})
// @from(Start 4719228, End 4720845)
E_0 = z((z_0) => {
  Object.defineProperty(z_0, "__esModule", {
    value: !0
  });
  z_0.InterceptingListenerImpl = void 0;
  z_0.isInterceptingListener = l86;

  function l86(A) {
    return A.onReceiveMetadata !== void 0 && A.onReceiveMetadata.length === 1
  }
  class H_0 {
    constructor(A, B) {
      this.listener = A, this.nextListener = B, this.processingMetadata = !1, this.hasPendingMessage = !1, this.processingMessage = !1, this.pendingStatus = null
    }
    processPendingMessage() {
      if (this.hasPendingMessage) this.nextListener.onReceiveMessage(this.pendingMessage), this.pendingMessage = null, this.hasPendingMessage = !1
    }
    processPendingStatus() {
      if (this.pendingStatus) this.nextListener.onReceiveStatus(this.pendingStatus)
    }
    onReceiveMetadata(A) {
      this.processingMetadata = !0, this.listener.onReceiveMetadata(A, (B) => {
        this.processingMetadata = !1, this.nextListener.onReceiveMetadata(B), this.processPendingMessage(), this.processPendingStatus()
      })
    }
    onReceiveMessage(A) {
      this.processingMessage = !0, this.listener.onReceiveMessage(A, (B) => {
        if (this.processingMessage = !1, this.processingMetadata) this.pendingMessage = B, this.hasPendingMessage = !0;
        else this.nextListener.onReceiveMessage(B), this.processPendingStatus()
      })
    }
    onReceiveStatus(A) {
      this.listener.onReceiveStatus(A, (B) => {
        if (this.processingMetadata || this.processingMessage) this.pendingStatus = B;
        else this.nextListener.onReceiveStatus(B)
      })
    }
  }
  z_0.InterceptingListenerImpl = H_0
})
// @from(Start 4720851, End 4730206)
Sh1 = z((T_0) => {
  Object.defineProperty(T_0, "__esModule", {
    value: !0
  });
  T_0.InterceptingCall = T_0.RequesterBuilder = T_0.ListenerBuilder = T_0.InterceptorConfigurationError = void 0;
  T_0.getInterceptingCall = r86;
  var n86 = SZ(),
    U_0 = E_0(),
    N_0 = y6(),
    $_0 = uZ1();
  class rs extends Error {
    constructor(A) {
      super(A);
      this.name = "InterceptorConfigurationError", Error.captureStackTrace(this, rs)
    }
  }
  T_0.InterceptorConfigurationError = rs;
  class q_0 {
    constructor() {
      this.metadata = void 0, this.message = void 0, this.status = void 0
    }
    withOnReceiveMetadata(A) {
      return this.metadata = A, this
    }
    withOnReceiveMessage(A) {
      return this.message = A, this
    }
    withOnReceiveStatus(A) {
      return this.status = A, this
    }
    build() {
      return {
        onReceiveMetadata: this.metadata,
        onReceiveMessage: this.message,
        onReceiveStatus: this.status
      }
    }
  }
  T_0.ListenerBuilder = q_0;
  class M_0 {
    constructor() {
      this.start = void 0, this.message = void 0, this.halfClose = void 0, this.cancel = void 0
    }
    withStart(A) {
      return this.start = A, this
    }
    withSendMessage(A) {
      return this.message = A, this
    }
    withHalfClose(A) {
      return this.halfClose = A, this
    }
    withCancel(A) {
      return this.cancel = A, this
    }
    build() {
      return {
        start: this.start,
        sendMessage: this.message,
        halfClose: this.halfClose,
        cancel: this.cancel
      }
    }
  }
  T_0.RequesterBuilder = M_0;
  var Th1 = {
      onReceiveMetadata: (A, B) => {
        B(A)
      },
      onReceiveMessage: (A, B) => {
        B(A)
      },
      onReceiveStatus: (A, B) => {
        B(A)
      }
    },
    ss = {
      start: (A, B, Q) => {
        Q(A, B)
      },
      sendMessage: (A, B) => {
        B(A)
      },
      halfClose: (A) => {
        A()
      },
      cancel: (A) => {
        A()
      }
    };
  class L_0 {
    constructor(A, B) {
      var Q, I, G, Z;
      if (this.nextCall = A, this.processingMetadata = !1, this.pendingMessageContext = null, this.processingMessage = !1, this.pendingHalfClose = !1, B) this.requester = {
        start: (Q = B.start) !== null && Q !== void 0 ? Q : ss.start,
        sendMessage: (I = B.sendMessage) !== null && I !== void 0 ? I : ss.sendMessage,
        halfClose: (G = B.halfClose) !== null && G !== void 0 ? G : ss.halfClose,
        cancel: (Z = B.cancel) !== null && Z !== void 0 ? Z : ss.cancel
      };
      else this.requester = ss
    }
    cancelWithStatus(A, B) {
      this.requester.cancel(() => {
        this.nextCall.cancelWithStatus(A, B)
      })
    }
    getPeer() {
      return this.nextCall.getPeer()
    }
    processPendingMessage() {
      if (this.pendingMessageContext) this.nextCall.sendMessageWithContext(this.pendingMessageContext, this.pendingMessage), this.pendingMessageContext = null, this.pendingMessage = null
    }
    processPendingHalfClose() {
      if (this.pendingHalfClose) this.nextCall.halfClose()
    }
    start(A, B) {
      var Q, I, G, Z, D, Y;
      let W = {
        onReceiveMetadata: (I = (Q = B === null || B === void 0 ? void 0 : B.onReceiveMetadata) === null || Q === void 0 ? void 0 : Q.bind(B)) !== null && I !== void 0 ? I : (J) => {},
        onReceiveMessage: (Z = (G = B === null || B === void 0 ? void 0 : B.onReceiveMessage) === null || G === void 0 ? void 0 : G.bind(B)) !== null && Z !== void 0 ? Z : (J) => {},
        onReceiveStatus: (Y = (D = B === null || B === void 0 ? void 0 : B.onReceiveStatus) === null || D === void 0 ? void 0 : D.bind(B)) !== null && Y !== void 0 ? Y : (J) => {}
      };
      this.processingMetadata = !0, this.requester.start(A, W, (J, F) => {
        var X, V, C;
        this.processingMetadata = !1;
        let K;
        if (U_0.isInterceptingListener(F)) K = F;
        else {
          let E = {
            onReceiveMetadata: (X = F.onReceiveMetadata) !== null && X !== void 0 ? X : Th1.onReceiveMetadata,
            onReceiveMessage: (V = F.onReceiveMessage) !== null && V !== void 0 ? V : Th1.onReceiveMessage,
            onReceiveStatus: (C = F.onReceiveStatus) !== null && C !== void 0 ? C : Th1.onReceiveStatus
          };
          K = new U_0.InterceptingListenerImpl(E, W)
        }
        this.nextCall.start(J, K), this.processPendingMessage(), this.processPendingHalfClose()
      })
    }
    sendMessageWithContext(A, B) {
      this.processingMessage = !0, this.requester.sendMessage(B, (Q) => {
        if (this.processingMessage = !1, this.processingMetadata) this.pendingMessageContext = A, this.pendingMessage = B;
        else this.nextCall.sendMessageWithContext(A, Q), this.processPendingHalfClose()
      })
    }
    sendMessage(A) {
      this.sendMessageWithContext({}, A)
    }
    startRead() {
      this.nextCall.startRead()
    }
    halfClose() {
      this.requester.halfClose(() => {
        if (this.processingMetadata || this.processingMessage) this.pendingHalfClose = !0;
        else this.nextCall.halfClose()
      })
    }
  }
  T_0.InterceptingCall = L_0;

  function a86(A, B, Q) {
    var I, G;
    let Z = (I = Q.deadline) !== null && I !== void 0 ? I : 1 / 0,
      D = Q.host,
      Y = (G = Q.parent) !== null && G !== void 0 ? G : null,
      W = Q.propagate_flags,
      J = Q.credentials,
      F = A.createCall(B, Z, D, Y, W);
    if (J) F.setCredentials(J);
    return F
  }
  class Ph1 {
    constructor(A, B) {
      this.call = A, this.methodDefinition = B
    }
    cancelWithStatus(A, B) {
      this.call.cancelWithStatus(A, B)
    }
    getPeer() {
      return this.call.getPeer()
    }
    sendMessageWithContext(A, B) {
      let Q;
      try {
        Q = this.methodDefinition.requestSerialize(B)
      } catch (I) {
        this.call.cancelWithStatus(N_0.Status.INTERNAL, `Request message serialization failure: ${$_0.getErrorMessage(I)}`);
        return
      }
      this.call.sendMessageWithContext(A, Q)
    }
    sendMessage(A) {
      this.sendMessageWithContext({}, A)
    }
    start(A, B) {
      let Q = null;
      this.call.start(A, {
        onReceiveMetadata: (I) => {
          var G;
          (G = B === null || B === void 0 ? void 0 : B.onReceiveMetadata) === null || G === void 0 || G.call(B, I)
        },
        onReceiveMessage: (I) => {
          var G;
          let Z;
          try {
            Z = this.methodDefinition.responseDeserialize(I)
          } catch (D) {
            Q = {
              code: N_0.Status.INTERNAL,
              details: `Response message parsing error: ${$_0.getErrorMessage(D)}`,
              metadata: new n86.Metadata
            }, this.call.cancelWithStatus(Q.code, Q.details);
            return
          }(G = B === null || B === void 0 ? void 0 : B.onReceiveMessage) === null || G === void 0 || G.call(B, Z)
        },
        onReceiveStatus: (I) => {
          var G, Z;
          if (Q)(G = B === null || B === void 0 ? void 0 : B.onReceiveStatus) === null || G === void 0 || G.call(B, Q);
          else(Z = B === null || B === void 0 ? void 0 : B.onReceiveStatus) === null || Z === void 0 || Z.call(B, I)
        }
      })
    }
    startRead() {
      this.call.startRead()
    }
    halfClose() {
      this.call.halfClose()
    }
  }
  class R_0 extends Ph1 {
    constructor(A, B) {
      super(A, B)
    }
    start(A, B) {
      var Q, I;
      let G = !1,
        Z = {
          onReceiveMetadata: (I = (Q = B === null || B === void 0 ? void 0 : B.onReceiveMetadata) === null || Q === void 0 ? void 0 : Q.bind(B)) !== null && I !== void 0 ? I : (D) => {},
          onReceiveMessage: (D) => {
            var Y;
            G = !0, (Y = B === null || B === void 0 ? void 0 : B.onReceiveMessage) === null || Y === void 0 || Y.call(B, D)
          },
          onReceiveStatus: (D) => {
            var Y, W;
            if (!G)(Y = B === null || B === void 0 ? void 0 : B.onReceiveMessage) === null || Y === void 0 || Y.call(B, null);
            (W = B === null || B === void 0 ? void 0 : B.onReceiveStatus) === null || W === void 0 || W.call(B, D)
          }
        };
      super.start(A, Z), this.call.startRead()
    }
  }
  class O_0 extends Ph1 {}

  function s86(A, B, Q) {
    let I = a86(A, Q.path, B);
    if (Q.responseStream) return new O_0(I, Q);
    else return new R_0(I, Q)
  }

  function r86(A, B, Q, I) {
    if (A.clientInterceptors.length > 0 && A.clientInterceptorProviders.length > 0) throw new rs("Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed.");
    if (A.callInterceptors.length > 0 && A.callInterceptorProviders.length > 0) throw new rs("Both interceptors and interceptor_providers were passed as call options. Only one of these is allowed.");
    let G = [];
    if (A.callInterceptors.length > 0 || A.callInterceptorProviders.length > 0) G = [].concat(A.callInterceptors, A.callInterceptorProviders.map((Y) => Y(B))).filter((Y) => Y);
    else G = [].concat(A.clientInterceptors, A.clientInterceptorProviders.map((Y) => Y(B))).filter((Y) => Y);
    let Z = Object.assign({}, Q, {
      method_definition: B
    });
    return G.reduceRight((Y, W) => {
      return (J) => W(J, Y)
    }, (Y) => s86(I, Y, B))(Z)
  }
})
// @from(Start 4730212, End 4740097)
jh1 = z((__0) => {
  Object.defineProperty(__0, "__esModule", {
    value: !0
  });
  __0.Client = void 0;
  var Dw = K_0(),
    BB6 = yh1(),
    QB6 = TX(),
    XR = y6(),
    ng = SZ(),
    GD1 = Sh1(),
    pC = Symbol(),
    ag = Symbol(),
    sg = Symbol(),
    TN = Symbol();

  function _h1(A) {
    return typeof A === "function"
  }

  function rg(A) {
    var B;
    return ((B = A.stack) === null || B === void 0 ? void 0 : B.split(`
`).slice(1).join(`
`)) || "no stack trace available"
  }
  class S_0 {
    constructor(A, B, Q = {}) {
      var I, G;
      if (Q = Object.assign({}, Q), this[ag] = (I = Q.interceptors) !== null && I !== void 0 ? I : [], delete Q.interceptors, this[sg] = (G = Q.interceptor_providers) !== null && G !== void 0 ? G : [], delete Q.interceptor_providers, this[ag].length > 0 && this[sg].length > 0) throw new Error("Both interceptors and interceptor_providers were passed as options to the client constructor. Only one of these is allowed.");
      if (this[TN] = Q.callInvocationTransformer, delete Q.callInvocationTransformer, Q.channelOverride) this[pC] = Q.channelOverride;
      else if (Q.channelFactoryOverride) {
        let Z = Q.channelFactoryOverride;
        delete Q.channelFactoryOverride, this[pC] = Z(A, B, Q)
      } else this[pC] = new BB6.ChannelImplementation(A, B, Q)
    }
    close() {
      this[pC].close()
    }
    getChannel() {
      return this[pC]
    }
    waitForReady(A, B) {
      let Q = (I) => {
        if (I) {
          B(new Error("Failed to connect before the deadline"));
          return
        }
        let G;
        try {
          G = this[pC].getConnectivityState(!0)
        } catch (Z) {
          B(new Error("The channel has been closed"));
          return
        }
        if (G === QB6.ConnectivityState.READY) B();
        else try {
          this[pC].watchConnectivityState(G, A, Q)
        } catch (Z) {
          B(new Error("The channel has been closed"))
        }
      };
      setImmediate(Q)
    }
    checkOptionalUnaryResponseArguments(A, B, Q) {
      if (_h1(A)) return {
        metadata: new ng.Metadata,
        options: {},
        callback: A
      };
      else if (_h1(B))
        if (A instanceof ng.Metadata) return {
          metadata: A,
          options: {},
          callback: B
        };
        else return {
          metadata: new ng.Metadata,
          options: A,
          callback: B
        };
      else {
        if (!(A instanceof ng.Metadata && B instanceof Object && _h1(Q))) throw new Error("Incorrect arguments passed");
        return {
          metadata: A,
          options: B,
          callback: Q
        }
      }
    }
    makeUnaryRequest(A, B, Q, I, G, Z, D) {
      var Y, W;
      let J = this.checkOptionalUnaryResponseArguments(G, Z, D),
        F = {
          path: A,
          requestStream: !1,
          responseStream: !1,
          requestSerialize: B,
          responseDeserialize: Q
        },
        X = {
          argument: I,
          metadata: J.metadata,
          call: new Dw.ClientUnaryCallImpl,
          channel: this[pC],
          methodDefinition: F,
          callOptions: J.options,
          callback: J.callback
        };
      if (this[TN]) X = this[TN](X);
      let V = X.call,
        C = {
          clientInterceptors: this[ag],
          clientInterceptorProviders: this[sg],
          callInterceptors: (Y = X.callOptions.interceptors) !== null && Y !== void 0 ? Y : [],
          callInterceptorProviders: (W = X.callOptions.interceptor_providers) !== null && W !== void 0 ? W : []
        },
        K = GD1.getInterceptingCall(C, X.methodDefinition, X.callOptions, X.channel);
      V.call = K;
      let E = null,
        N = !1,
        q = new Error;
      return K.start(X.metadata, {
        onReceiveMetadata: (O) => {
          V.emit("metadata", O)
        },
        onReceiveMessage(O) {
          if (E !== null) K.cancelWithStatus(XR.Status.UNIMPLEMENTED, "Too many responses received");
          E = O
        },
        onReceiveStatus(O) {
          if (N) return;
          if (N = !0, O.code === XR.Status.OK)
            if (E === null) {
              let R = rg(q);
              X.callback(Dw.callErrorFromStatus({
                code: XR.Status.UNIMPLEMENTED,
                details: "No message received",
                metadata: O.metadata
              }, R))
            } else X.callback(null, E);
          else {
            let R = rg(q);
            X.callback(Dw.callErrorFromStatus(O, R))
          }
          q = null, V.emit("status", O)
        }
      }), K.sendMessage(I), K.halfClose(), V
    }
    makeClientStreamRequest(A, B, Q, I, G, Z) {
      var D, Y;
      let W = this.checkOptionalUnaryResponseArguments(I, G, Z),
        J = {
          path: A,
          requestStream: !0,
          responseStream: !1,
          requestSerialize: B,
          responseDeserialize: Q
        },
        F = {
          metadata: W.metadata,
          call: new Dw.ClientWritableStreamImpl(B),
          channel: this[pC],
          methodDefinition: J,
          callOptions: W.options,
          callback: W.callback
        };
      if (this[TN]) F = this[TN](F);
      let X = F.call,
        V = {
          clientInterceptors: this[ag],
          clientInterceptorProviders: this[sg],
          callInterceptors: (D = F.callOptions.interceptors) !== null && D !== void 0 ? D : [],
          callInterceptorProviders: (Y = F.callOptions.interceptor_providers) !== null && Y !== void 0 ? Y : []
        },
        C = GD1.getInterceptingCall(V, F.methodDefinition, F.callOptions, F.channel);
      X.call = C;
      let K = null,
        E = !1,
        N = new Error;
      return C.start(F.metadata, {
        onReceiveMetadata: (q) => {
          X.emit("metadata", q)
        },
        onReceiveMessage(q) {
          if (K !== null) C.cancelWithStatus(XR.Status.UNIMPLEMENTED, "Too many responses received");
          K = q, C.startRead()
        },
        onReceiveStatus(q) {
          if (E) return;
          if (E = !0, q.code === XR.Status.OK)
            if (K === null) {
              let O = rg(N);
              F.callback(Dw.callErrorFromStatus({
                code: XR.Status.UNIMPLEMENTED,
                details: "No message received",
                metadata: q.metadata
              }, O))
            } else F.callback(null, K);
          else {
            let O = rg(N);
            F.callback(Dw.callErrorFromStatus(q, O))
          }
          N = null, X.emit("status", q)
        }
      }), X
    }
    checkMetadataAndOptions(A, B) {
      let Q, I;
      if (A instanceof ng.Metadata)
        if (Q = A, B) I = B;
        else I = {};
      else {
        if (A) I = A;
        else I = {};
        Q = new ng.Metadata
      }
      return {
        metadata: Q,
        options: I
      }
    }
    makeServerStreamRequest(A, B, Q, I, G, Z) {
      var D, Y;
      let W = this.checkMetadataAndOptions(G, Z),
        J = {
          path: A,
          requestStream: !1,
          responseStream: !0,
          requestSerialize: B,
          responseDeserialize: Q
        },
        F = {
          argument: I,
          metadata: W.metadata,
          call: new Dw.ClientReadableStreamImpl(Q),
          channel: this[pC],
          methodDefinition: J,
          callOptions: W.options
        };
      if (this[TN]) F = this[TN](F);
      let X = F.call,
        V = {
          clientInterceptors: this[ag],
          clientInterceptorProviders: this[sg],
          callInterceptors: (D = F.callOptions.interceptors) !== null && D !== void 0 ? D : [],
          callInterceptorProviders: (Y = F.callOptions.interceptor_providers) !== null && Y !== void 0 ? Y : []
        },
        C = GD1.getInterceptingCall(V, F.methodDefinition, F.callOptions, F.channel);
      X.call = C;
      let K = !1,
        E = new Error;
      return C.start(F.metadata, {
        onReceiveMetadata(N) {
          X.emit("metadata", N)
        },
        onReceiveMessage(N) {
          X.push(N)
        },
        onReceiveStatus(N) {
          if (K) return;
          if (K = !0, X.push(null), N.code !== XR.Status.OK) {
            let q = rg(E);
            X.emit("error", Dw.callErrorFromStatus(N, q))
          }
          E = null, X.emit("status", N)
        }
      }), C.sendMessage(I), C.halfClose(), X
    }
    makeBidiStreamRequest(A, B, Q, I, G) {
      var Z, D;
      let Y = this.checkMetadataAndOptions(I, G),
        W = {
          path: A,
          requestStream: !0,
          responseStream: !0,
          requestSerialize: B,
          responseDeserialize: Q
        },
        J = {
          metadata: Y.metadata,
          call: new Dw.ClientDuplexStreamImpl(B, Q),
          channel: this[pC],
          methodDefinition: W,
          callOptions: Y.options
        };
      if (this[TN]) J = this[TN](J);
      let F = J.call,
        X = {
          clientInterceptors: this[ag],
          clientInterceptorProviders: this[sg],
          callInterceptors: (Z = J.callOptions.interceptors) !== null && Z !== void 0 ? Z : [],
          callInterceptorProviders: (D = J.callOptions.interceptor_providers) !== null && D !== void 0 ? D : []
        },
        V = GD1.getInterceptingCall(X, J.methodDefinition, J.callOptions, J.channel);
      F.call = V;
      let C = !1,
        K = new Error;
      return V.start(J.metadata, {
        onReceiveMetadata(E) {
          F.emit("metadata", E)
        },
        onReceiveMessage(E) {
          F.push(E)
        },
        onReceiveStatus(E) {
          if (C) return;
          if (C = !0, F.push(null), E.code !== XR.Status.OK) {
            let N = rg(K);
            F.emit("error", Dw.callErrorFromStatus(E, N))
          }
          K = null, F.emit("status", E)
        }
      }), F
    }
  }
  __0.Client = S_0
})
// @from(Start 4740103, End 4742010)
xh1 = z((k_0) => {
  Object.defineProperty(k_0, "__esModule", {
    value: !0
  });
  k_0.makeClientConstructor = y_0;
  k_0.loadPackageDefinition = DB6;
  var os = jh1(),
    IB6 = {
      unary: os.Client.prototype.makeUnaryRequest,
      server_stream: os.Client.prototype.makeServerStreamRequest,
      client_stream: os.Client.prototype.makeClientStreamRequest,
      bidi: os.Client.prototype.makeBidiStreamRequest
    };

  function kh1(A) {
    return ["__proto__", "prototype", "constructor"].includes(A)
  }

  function y_0(A, B, Q) {
    if (!Q) Q = {};
    class I extends os.Client {}
    return Object.keys(A).forEach((G) => {
      if (kh1(G)) return;
      let Z = A[G],
        D;
      if (typeof G === "string" && G.charAt(0) === "$") throw new Error("Method names cannot start with $");
      if (Z.requestStream)
        if (Z.responseStream) D = "bidi";
        else D = "client_stream";
      else if (Z.responseStream) D = "server_stream";
      else D = "unary";
      let {
        requestSerialize: Y,
        responseDeserialize: W
      } = Z, J = GB6(IB6[D], Z.path, Y, W);
      if (I.prototype[G] = J, Object.assign(I.prototype[G], Z), Z.originalName && !kh1(Z.originalName)) I.prototype[Z.originalName] = I.prototype[G]
    }), I.service = A, I.serviceName = B, I
  }

  function GB6(A, B, Q, I) {
    return function(...G) {
      return A.call(this, B, Q, I, ...G)
    }
  }

  function ZB6(A) {
    return "format" in A
  }

  function DB6(A) {
    let B = {};
    for (let Q in A)
      if (Object.prototype.hasOwnProperty.call(A, Q)) {
        let I = A[Q],
          G = Q.split(".");
        if (G.some((Y) => kh1(Y))) continue;
        let Z = G[G.length - 1],
          D = B;
        for (let Y of G.slice(0, -1)) {
          if (!D[Y]) D[Y] = {};
          D = D[Y]
        }
        if (ZB6(I)) D[Z] = I;
        else D[Z] = y_0(I, Z, {})
      } return B
  }
})
// @from(Start 4742016, End 4749836)
Gj0 = z((k$8, Ij0) => {
  var JB6 = 1 / 0,
    FB6 = "[object Symbol]",
    XB6 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
    VB6 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
    DD1 = "\\ud800-\\udfff",
    d_0 = "\\u0300-\\u036f\\ufe20-\\ufe23",
    u_0 = "\\u20d0-\\u20f0",
    p_0 = "\\u2700-\\u27bf",
    c_0 = "a-z\\xdf-\\xf6\\xf8-\\xff",
    CB6 = "\\xac\\xb1\\xd7\\xf7",
    KB6 = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
    HB6 = "\\u2000-\\u206f",
    zB6 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
    l_0 = "A-Z\\xc0-\\xd6\\xd8-\\xde",
    i_0 = "\\ufe0e\\ufe0f",
    n_0 = CB6 + KB6 + HB6 + zB6,
    vh1 = "['’]",
    wB6 = "[" + DD1 + "]",
    x_0 = "[" + n_0 + "]",
    ZD1 = "[" + d_0 + u_0 + "]",
    a_0 = "\\d+",
    EB6 = "[" + p_0 + "]",
    s_0 = "[" + c_0 + "]",
    r_0 = "[^" + DD1 + n_0 + a_0 + p_0 + c_0 + l_0 + "]",
    fh1 = "\\ud83c[\\udffb-\\udfff]",
    UB6 = "(?:" + ZD1 + "|" + fh1 + ")",
    o_0 = "[^" + DD1 + "]",
    bh1 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    gh1 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    og = "[" + l_0 + "]",
    t_0 = "\\u200d",
    f_0 = "(?:" + s_0 + "|" + r_0 + ")",
    NB6 = "(?:" + og + "|" + r_0 + ")",
    v_0 = "(?:" + vh1 + "(?:d|ll|m|re|s|t|ve))?",
    b_0 = "(?:" + vh1 + "(?:D|LL|M|RE|S|T|VE))?",
    e_0 = UB6 + "?",
    Aj0 = "[" + i_0 + "]?",
    $B6 = "(?:" + t_0 + "(?:" + [o_0, bh1, gh1].join("|") + ")" + Aj0 + e_0 + ")*",
    Bj0 = Aj0 + e_0 + $B6,
    qB6 = "(?:" + [EB6, bh1, gh1].join("|") + ")" + Bj0,
    MB6 = "(?:" + [o_0 + ZD1 + "?", ZD1, bh1, gh1, wB6].join("|") + ")",
    LB6 = RegExp(vh1, "g"),
    RB6 = RegExp(ZD1, "g"),
    OB6 = RegExp(fh1 + "(?=" + fh1 + ")|" + MB6 + Bj0, "g"),
    TB6 = RegExp([og + "?" + s_0 + "+" + v_0 + "(?=" + [x_0, og, "$"].join("|") + ")", NB6 + "+" + b_0 + "(?=" + [x_0, og + f_0, "$"].join("|") + ")", og + "?" + f_0 + "+" + v_0, og + "+" + b_0, a_0, qB6].join("|"), "g"),
    PB6 = RegExp("[" + t_0 + DD1 + d_0 + u_0 + i_0 + "]"),
    SB6 = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
    _B6 = {
      "À": "A",
      "Á": "A",
      "Â": "A",
      "Ã": "A",
      "Ä": "A",
      "Å": "A",
      "à": "a",
      "á": "a",
      "â": "a",
      "ã": "a",
      "ä": "a",
      "å": "a",
      "Ç": "C",
      "ç": "c",
      "Ð": "D",
      "ð": "d",
      "È": "E",
      "É": "E",
      "Ê": "E",
      "Ë": "E",
      "è": "e",
      "é": "e",
      "ê": "e",
      "ë": "e",
      "Ì": "I",
      "Í": "I",
      "Î": "I",
      "Ï": "I",
      "ì": "i",
      "í": "i",
      "î": "i",
      "ï": "i",
      "Ñ": "N",
      "ñ": "n",
      "Ò": "O",
      "Ó": "O",
      "Ô": "O",
      "Õ": "O",
      "Ö": "O",
      "Ø": "O",
      "ò": "o",
      "ó": "o",
      "ô": "o",
      "õ": "o",
      "ö": "o",
      "ø": "o",
      "Ù": "U",
      "Ú": "U",
      "Û": "U",
      "Ü": "U",
      "ù": "u",
      "ú": "u",
      "û": "u",
      "ü": "u",
      "Ý": "Y",
      "ý": "y",
      "ÿ": "y",
      "Æ": "Ae",
      "æ": "ae",
      "Þ": "Th",
      "þ": "th",
      "ß": "ss",
      "Ā": "A",
      "Ă": "A",
      "Ą": "A",
      "ā": "a",
      "ă": "a",
      "ą": "a",
      "Ć": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Č": "C",
      "ć": "c",
      "ĉ": "c",
      "ċ": "c",
      "č": "c",
      "Ď": "D",
      "Đ": "D",
      "ď": "d",
      "đ": "d",
      "Ē": "E",
      "Ĕ": "E",
      "Ė": "E",
      "Ę": "E",
      "Ě": "E",
      "ē": "e",
      "ĕ": "e",
      "ė": "e",
      "ę": "e",
      "ě": "e",
      "Ĝ": "G",
      "Ğ": "G",
      "Ġ": "G",
      "Ģ": "G",
      "ĝ": "g",
      "ğ": "g",
      "ġ": "g",
      "ģ": "g",
      "Ĥ": "H",
      "Ħ": "H",
      "ĥ": "h",
      "ħ": "h",
      "Ĩ": "I",
      "Ī": "I",
      "Ĭ": "I",
      "Į": "I",
      "İ": "I",
      "ĩ": "i",
      "ī": "i",
      "ĭ": "i",
      "į": "i",
      "ı": "i",
      "Ĵ": "J",
      "ĵ": "j",
      "Ķ": "K",
      "ķ": "k",
      "ĸ": "k",
      "Ĺ": "L",
      "Ļ": "L",
      "Ľ": "L",
      "Ŀ": "L",
      "Ł": "L",
      "ĺ": "l",
      "ļ": "l",
      "ľ": "l",
      "ŀ": "l",
      "ł": "l",
      "Ń": "N",
      "Ņ": "N",
      "Ň": "N",
      "Ŋ": "N",
      "ń": "n",
      "ņ": "n",
      "ň": "n",
      "ŋ": "n",
      "Ō": "O",
      "Ŏ": "O",
      "Ő": "O",
      "ō": "o",
      "ŏ": "o",
      "ő": "o",
      "Ŕ": "R",
      "Ŗ": "R",
      "Ř": "R",
      "ŕ": "r",
      "ŗ": "r",
      "ř": "r",
      "Ś": "S",
      "Ŝ": "S",
      "Ş": "S",
      "Š": "S",
      "ś": "s",
      "ŝ": "s",
      "ş": "s",
      "š": "s",
      "Ţ": "T",
      "Ť": "T",
      "Ŧ": "T",
      "ţ": "t",
      "ť": "t",
      "ŧ": "t",
      "Ũ": "U",
      "Ū": "U",
      "Ŭ": "U",
      "Ů": "U",
      "Ű": "U",
      "Ų": "U",
      "ũ": "u",
      "ū": "u",
      "ŭ": "u",
      "ů": "u",
      "ű": "u",
      "ų": "u",
      "Ŵ": "W",
      "ŵ": "w",
      "Ŷ": "Y",
      "ŷ": "y",
      "Ÿ": "Y",
      "Ź": "Z",
      "Ż": "Z",
      "Ž": "Z",
      "ź": "z",
      "ż": "z",
      "ž": "z",
      "Ĳ": "IJ",
      "ĳ": "ij",
      "Œ": "Oe",
      "œ": "oe",
      "ŉ": "'n",
      "ſ": "ss"
    },
    jB6 = typeof global == "object" && global && global.Object === Object && global,
    yB6 = typeof self == "object" && self && self.Object === Object && self,
    kB6 = jB6 || yB6 || Function("return this")();

  function xB6(A, B, Q, I) {
    var G = -1,
      Z = A ? A.length : 0;
    if (I && Z) Q = A[++G];
    while (++G < Z) Q = B(Q, A[G], G, A);
    return Q
  }

  function fB6(A) {
    return A.split("")
  }

  function vB6(A) {
    return A.match(XB6) || []
  }

  function bB6(A) {
    return function(B) {
      return A == null ? void 0 : A[B]
    }
  }
  var gB6 = bB6(_B6);

  function Qj0(A) {
    return PB6.test(A)
  }

  function hB6(A) {
    return SB6.test(A)
  }

  function mB6(A) {
    return Qj0(A) ? dB6(A) : fB6(A)
  }

  function dB6(A) {
    return A.match(OB6) || []
  }

  function uB6(A) {
    return A.match(TB6) || []
  }
  var pB6 = Object.prototype,
    cB6 = pB6.toString,
    g_0 = kB6.Symbol,
    h_0 = g_0 ? g_0.prototype : void 0,
    m_0 = h_0 ? h_0.toString : void 0;

  function lB6(A, B, Q) {
    var I = -1,
      G = A.length;
    if (B < 0) B = -B > G ? 0 : G + B;
    if (Q = Q > G ? G : Q, Q < 0) Q += G;
    G = B > Q ? 0 : Q - B >>> 0, B >>>= 0;
    var Z = Array(G);
    while (++I < G) Z[I] = A[I + B];
    return Z
  }

  function iB6(A) {
    if (typeof A == "string") return A;
    if (oB6(A)) return m_0 ? m_0.call(A) : "";
    var B = A + "";
    return B == "0" && 1 / A == -JB6 ? "-0" : B
  }

  function nB6(A, B, Q) {
    var I = A.length;
    return Q = Q === void 0 ? I : Q, !B && Q >= I ? A : lB6(A, B, Q)
  }

  function aB6(A) {
    return function(B) {
      B = YD1(B);
      var Q = Qj0(B) ? mB6(B) : void 0,
        I = Q ? Q[0] : B.charAt(0),
        G = Q ? nB6(Q, 1).join("") : B.slice(1);
      return I[A]() + G
    }
  }

  function sB6(A) {
    return function(B) {
      return xB6(Q36(A36(B).replace(LB6, "")), A, "")
    }
  }

  function rB6(A) {
    return !!A && typeof A == "object"
  }

  function oB6(A) {
    return typeof A == "symbol" || rB6(A) && cB6.call(A) == FB6
  }

  function YD1(A) {
    return A == null ? "" : iB6(A)
  }
  var tB6 = sB6(function(A, B, Q) {
    return B = B.toLowerCase(), A + (Q ? eB6(B) : B)
  });

  function eB6(A) {
    return B36(YD1(A).toLowerCase())
  }

  function A36(A) {
    return A = YD1(A), A && A.replace(VB6, gB6).replace(RB6, "")
  }
  var B36 = aB6("toUpperCase");

  function Q36(A, B, Q) {
    if (A = YD1(A), B = Q ? void 0 : B, B === void 0) return hB6(A) ? uB6(A) : vB6(A);
    return A.match(B) || []
  }
  Ij0.exports = tB6
})
// @from(Start 4749842, End 4751266)
Dj0 = z((x$8, Zj0) => {
  Zj0.exports = hh1;

  function hh1(A, B) {
    if (typeof A === "string") B = A, A = void 0;
    var Q = [];

    function I(Z) {
      if (typeof Z !== "string") {
        var D = G();
        if (hh1.verbose) console.log("codegen: " + D);
        if (D = "return " + D, Z) {
          var Y = Object.keys(Z),
            W = new Array(Y.length + 1),
            J = new Array(Y.length),
            F = 0;
          while (F < Y.length) W[F] = Y[F], J[F] = Z[Y[F++]];
          return W[F] = D, Function.apply(null, W).apply(null, J)
        }
        return Function(D)()
      }
      var X = new Array(arguments.length - 1),
        V = 0;
      while (V < X.length) X[V] = arguments[++V];
      if (V = 0, Z = Z.replace(/%([%dfijs])/g, function C(K, E) {
          var N = X[V++];
          switch (E) {
            case "d":
            case "f":
              return String(Number(N));
            case "i":
              return String(Math.floor(N));
            case "j":
              return JSON.stringify(N);
            case "s":
              return String(N)
          }
          return "%"
        }), V !== X.length) throw Error("parameter count mismatch");
      return Q.push(Z), I
    }

    function G(Z) {
      return "function " + (Z || B || "") + "(" + (A && A.join(",") || "") + `){
  ` + Q.join(`
  `) + `
}`
    }
    return I.toString = G, I
  }
  hh1.verbose = !1
})
// @from(Start 4751272, End 4752536)
Wj0 = z((f$8, Yj0) => {
  Yj0.exports = ts;
  var I36 = Lg1(),
    G36 = Og1(),
    mh1 = G36("fs");

  function ts(A, B, Q) {
    if (typeof B === "function") Q = B, B = {};
    else if (!B) B = {};
    if (!Q) return I36(ts, this, A, B);
    if (!B.xhr && mh1 && mh1.readFile) return mh1.readFile(A, function I(G, Z) {
      return G && typeof XMLHttpRequest !== "undefined" ? ts.xhr(A, B, Q) : G ? Q(G) : Q(null, B.binary ? Z : Z.toString("utf8"))
    });
    return ts.xhr(A, B, Q)
  }
  ts.xhr = function A(B, Q, I) {
    var G = new XMLHttpRequest;
    if (G.onreadystatechange = function Z() {
        if (G.readyState !== 4) return;
        if (G.status !== 0 && G.status !== 200) return I(Error("status " + G.status));
        if (Q.binary) {
          var D = G.response;
          if (!D) {
            D = [];
            for (var Y = 0; Y < G.responseText.length; ++Y) D.push(G.responseText.charCodeAt(Y) & 255)
          }
          return I(null, typeof Uint8Array !== "undefined" ? new Uint8Array(D) : D)
        }
        return I(null, G.responseText)
      }, Q.binary) {
      if ("overrideMimeType" in G) G.overrideMimeType("text/plain; charset=x-user-defined");
      G.responseType = "arraybuffer"
    }
    G.open("GET", B), G.send()
  }
})
// @from(Start 4752542, End 4753333)
Xj0 = z((Fj0) => {
  var uh1 = Fj0,
    Jj0 = uh1.isAbsolute = function A(B) {
      return /^(?:\/|\w+:)/.test(B)
    },
    dh1 = uh1.normalize = function A(B) {
      B = B.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
      var Q = B.split("/"),
        I = Jj0(B),
        G = "";
      if (I) G = Q.shift() + "/";
      for (var Z = 0; Z < Q.length;)
        if (Q[Z] === "..")
          if (Z > 0 && Q[Z - 1] !== "..") Q.splice(--Z, 2);
          else if (I) Q.splice(Z, 1);
      else ++Z;
      else if (Q[Z] === ".") Q.splice(Z, 1);
      else ++Z;
      return G + Q.join("/")
    };
  uh1.resolve = function A(B, Q, I) {
    if (!I) Q = dh1(Q);
    if (Jj0(Q)) return Q;
    if (!I) B = dh1(B);
    return (B = B.replace(/(?:\/|^)[^/]+$/, "")).length ? dh1(B + "/" + Q) : Q
  }
})
// @from(Start 4753339, End 4753988)
r_ = z((Vj0) => {
  var es = Vj0,
    Z36 = RI(),
    D36 = ["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes"];

  function Ar(A, B) {
    var Q = 0,
      I = {};
    B |= 0;
    while (Q < A.length) I[D36[Q + B]] = A[Q++];
    return I
  }
  es.basic = Ar([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]);
  es.defaults = Ar([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, !1, "", Z36.emptyArray, null]);
  es.long = Ar([0, 0, 0, 1, 1], 7);
  es.mapKey = Ar([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2);
  es.packed = Ar([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0])
})
// @from(Start 4753994, End 4758267)
VR = z((g$8, Hj0) => {
  Hj0.exports = SX;
  var WD1 = o_();
  ((SX.prototype = Object.create(WD1.prototype)).constructor = SX).className = "Field";
  var Cj0 = cC(),
    Kj0 = r_(),
    X7 = RI(),
    ph1, Y36 = /^required|optional|repeated$/;
  SX.fromJSON = function A(B, Q) {
    return new SX(B, Q.id, Q.type, Q.rule, Q.extend, Q.options, Q.comment)
  };

  function SX(A, B, Q, I, G, Z, D) {
    if (X7.isObject(I)) D = G, Z = I, I = G = void 0;
    else if (X7.isObject(G)) D = Z, Z = G, G = void 0;
    if (WD1.call(this, A, Z), !X7.isInteger(B) || B < 0) throw TypeError("id must be a non-negative integer");
    if (!X7.isString(Q)) throw TypeError("type must be a string");
    if (I !== void 0 && !Y36.test(I = I.toString().toLowerCase())) throw TypeError("rule must be a string rule");
    if (G !== void 0 && !X7.isString(G)) throw TypeError("extend must be a string");
    if (I === "proto3_optional") I = "optional";
    this.rule = I && I !== "optional" ? I : void 0, this.type = Q, this.id = B, this.extend = G || void 0, this.required = I === "required", this.optional = !this.required, this.repeated = I === "repeated", this.map = !1, this.message = null, this.partOf = null, this.typeDefault = null, this.defaultValue = null, this.long = X7.Long ? Kj0.long[Q] !== void 0 : !1, this.bytes = Q === "bytes", this.resolvedType = null, this.extensionField = null, this.declaringField = null, this._packed = null, this.comment = D
  }
  Object.defineProperty(SX.prototype, "packed", {
    get: function() {
      if (this._packed === null) this._packed = this.getOption("packed") !== !1;
      return this._packed
    }
  });
  SX.prototype.setOption = function A(B, Q, I) {
    if (B === "packed") this._packed = null;
    return WD1.prototype.setOption.call(this, B, Q, I)
  };
  SX.prototype.toJSON = function A(B) {
    var Q = B ? Boolean(B.keepComments) : !1;
    return X7.toObject(["rule", this.rule !== "optional" && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", Q ? this.comment : void 0])
  };
  SX.prototype.resolve = function A() {
    if (this.resolved) return this;
    if ((this.typeDefault = Kj0.defaults[this.type]) === void 0)
      if (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof ph1) this.typeDefault = null;
      else this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
    else if (this.options && this.options.proto3_optional) this.typeDefault = null;
    if (this.options && this.options.default != null) {
      if (this.typeDefault = this.options.default, this.resolvedType instanceof Cj0 && typeof this.typeDefault === "string") this.typeDefault = this.resolvedType.values[this.typeDefault]
    }
    if (this.options) {
      if (this.options.packed === !0 || this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Cj0)) delete this.options.packed;
      if (!Object.keys(this.options).length) this.options = void 0
    }
    if (this.long) {
      if (this.typeDefault = X7.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u"), Object.freeze) Object.freeze(this.typeDefault)
    } else if (this.bytes && typeof this.typeDefault === "string") {
      var B;
      if (X7.base64.test(this.typeDefault)) X7.base64.decode(this.typeDefault, B = X7.newBuffer(X7.base64.length(this.typeDefault)), 0);
      else X7.utf8.write(this.typeDefault, B = X7.newBuffer(X7.utf8.length(this.typeDefault)), 0);
      this.typeDefault = B
    }
    if (this.map) this.defaultValue = X7.emptyObject;
    else if (this.repeated) this.defaultValue = X7.emptyArray;
    else this.defaultValue = this.typeDefault;
    if (this.parent instanceof ph1) this.parent.ctor.prototype[this.name] = this.defaultValue;
    return WD1.prototype.resolve.call(this)
  };
  SX.d = function A(B, Q, I, G) {
    if (typeof Q === "function") Q = X7.decorateType(Q).name;
    else if (Q && typeof Q === "object") Q = X7.decorateEnum(Q).name;
    return function Z(D, Y) {
      X7.decorateType(D.constructor).add(new SX(Y, B, Q, I, {
        default: G
      }))
    }
  };
  SX._configure = function A(B) {
    ph1 = B
  }
})
// @from(Start 4758273, End 4760628)
tg = z((h$8, Ej0) => {
  Ej0.exports = _X;
  var FD1 = o_();
  ((_X.prototype = Object.create(FD1.prototype)).constructor = _X).className = "OneOf";
  var zj0 = VR(),
    JD1 = RI();

  function _X(A, B, Q, I) {
    if (!Array.isArray(B)) Q = B, B = void 0;
    if (FD1.call(this, A, Q), !(B === void 0 || Array.isArray(B))) throw TypeError("fieldNames must be an Array");
    this.oneof = B || [], this.fieldsArray = [], this.comment = I
  }
  _X.fromJSON = function A(B, Q) {
    return new _X(B, Q.oneof, Q.options, Q.comment)
  };
  _X.prototype.toJSON = function A(B) {
    var Q = B ? Boolean(B.keepComments) : !1;
    return JD1.toObject(["options", this.options, "oneof", this.oneof, "comment", Q ? this.comment : void 0])
  };

  function wj0(A) {
    if (A.parent) {
      for (var B = 0; B < A.fieldsArray.length; ++B)
        if (!A.fieldsArray[B].parent) A.parent.add(A.fieldsArray[B])
    }
  }
  _X.prototype.add = function A(B) {
    if (!(B instanceof zj0)) throw TypeError("field must be a Field");
    if (B.parent && B.parent !== this.parent) B.parent.remove(B);
    return this.oneof.push(B.name), this.fieldsArray.push(B), B.partOf = this, wj0(this), this
  };
  _X.prototype.remove = function A(B) {
    if (!(B instanceof zj0)) throw TypeError("field must be a Field");
    var Q = this.fieldsArray.indexOf(B);
    if (Q < 0) throw Error(B + " is not a member of " + this);
    if (this.fieldsArray.splice(Q, 1), Q = this.oneof.indexOf(B.name), Q > -1) this.oneof.splice(Q, 1);
    return B.partOf = null, this
  };
  _X.prototype.onAdd = function A(B) {
    FD1.prototype.onAdd.call(this, B);
    var Q = this;
    for (var I = 0; I < this.oneof.length; ++I) {
      var G = B.get(this.oneof[I]);
      if (G && !G.partOf) G.partOf = Q, Q.fieldsArray.push(G)
    }
    wj0(this)
  };
  _X.prototype.onRemove = function A(B) {
    for (var Q = 0, I; Q < this.fieldsArray.length; ++Q)
      if ((I = this.fieldsArray[Q]).parent) I.parent.remove(I);
    FD1.prototype.onRemove.call(this, B)
  };
  _X.d = function A() {
    var B = new Array(arguments.length),
      Q = 0;
    while (Q < arguments.length) B[Q] = arguments[Q++];
    return function I(G, Z) {
      JD1.decorateType(G.constructor).add(new _X(Z, B)), Object.defineProperty(G, Z, {
        get: JD1.oneOfGetter(B),
        set: JD1.oneOfSetter(B)
      })
    }
  }
})
// @from(Start 4760634, End 4765915)
Bh = z((m$8, qj0) => {
  qj0.exports = R5;
  var ch1 = o_();
  ((R5.prototype = Object.create(ch1.prototype)).constructor = R5).className = "Namespace";
  var Uj0 = VR(),
    XD1 = RI(),
    W36 = tg(),
    eg, Br, Ah;
  R5.fromJSON = function A(B, Q) {
    return new R5(B, Q.options).addJSON(Q.nested)
  };

  function Nj0(A, B) {
    if (!(A && A.length)) return;
    var Q = {};
    for (var I = 0; I < A.length; ++I) Q[A[I].name] = A[I].toJSON(B);
    return Q
  }
  R5.arrayToJSON = Nj0;
  R5.isReservedId = function A(B, Q) {
    if (B) {
      for (var I = 0; I < B.length; ++I)
        if (typeof B[I] !== "string" && B[I][0] <= Q && B[I][1] > Q) return !0
    }
    return !1
  };
  R5.isReservedName = function A(B, Q) {
    if (B) {
      for (var I = 0; I < B.length; ++I)
        if (B[I] === Q) return !0
    }
    return !1
  };

  function R5(A, B) {
    ch1.call(this, A, B), this.nested = void 0, this._nestedArray = null
  }

  function $j0(A) {
    return A._nestedArray = null, A
  }
  Object.defineProperty(R5.prototype, "nestedArray", {
    get: function() {
      return this._nestedArray || (this._nestedArray = XD1.toArray(this.nested))
    }
  });
  R5.prototype.toJSON = function A(B) {
    return XD1.toObject(["options", this.options, "nested", Nj0(this.nestedArray, B)])
  };
  R5.prototype.addJSON = function A(B) {
    var Q = this;
    if (B)
      for (var I = Object.keys(B), G = 0, Z; G < I.length; ++G) Z = B[I[G]], Q.add((Z.fields !== void 0 ? eg.fromJSON : Z.values !== void 0 ? Ah.fromJSON : Z.methods !== void 0 ? Br.fromJSON : Z.id !== void 0 ? Uj0.fromJSON : R5.fromJSON)(I[G], Z));
    return this
  };
  R5.prototype.get = function A(B) {
    return this.nested && this.nested[B] || null
  };
  R5.prototype.getEnum = function A(B) {
    if (this.nested && this.nested[B] instanceof Ah) return this.nested[B].values;
    throw Error("no such enum: " + B)
  };
  R5.prototype.add = function A(B) {
    if (!(B instanceof Uj0 && B.extend !== void 0 || B instanceof eg || B instanceof W36 || B instanceof Ah || B instanceof Br || B instanceof R5)) throw TypeError("object must be a valid nested object");
    if (!this.nested) this.nested = {};
    else {
      var Q = this.get(B.name);
      if (Q)
        if (Q instanceof R5 && B instanceof R5 && !(Q instanceof eg || Q instanceof Br)) {
          var I = Q.nestedArray;
          for (var G = 0; G < I.length; ++G) B.add(I[G]);
          if (this.remove(Q), !this.nested) this.nested = {};
          B.setOptions(Q.options, !0)
        } else throw Error("duplicate name '" + B.name + "' in " + this)
    }
    return this.nested[B.name] = B, B.onAdd(this), $j0(this)
  };
  R5.prototype.remove = function A(B) {
    if (!(B instanceof ch1)) throw TypeError("object must be a ReflectionObject");
    if (B.parent !== this) throw Error(B + " is not a member of " + this);
    if (delete this.nested[B.name], !Object.keys(this.nested).length) this.nested = void 0;
    return B.onRemove(this), $j0(this)
  };
  R5.prototype.define = function A(B, Q) {
    if (XD1.isString(B)) B = B.split(".");
    else if (!Array.isArray(B)) throw TypeError("illegal path");
    if (B && B.length && B[0] === "") throw Error("path must be relative");
    var I = this;
    while (B.length > 0) {
      var G = B.shift();
      if (I.nested && I.nested[G]) {
        if (I = I.nested[G], !(I instanceof R5)) throw Error("path conflicts with non-namespace objects")
      } else I.add(I = new R5(G))
    }
    if (Q) I.addJSON(Q);
    return I
  };
  R5.prototype.resolveAll = function A() {
    var B = this.nestedArray,
      Q = 0;
    while (Q < B.length)
      if (B[Q] instanceof R5) B[Q++].resolveAll();
      else B[Q++].resolve();
    return this.resolve()
  };
  R5.prototype.lookup = function A(B, Q, I) {
    if (typeof Q === "boolean") I = Q, Q = void 0;
    else if (Q && !Array.isArray(Q)) Q = [Q];
    if (XD1.isString(B) && B.length) {
      if (B === ".") return this.root;
      B = B.split(".")
    } else if (!B.length) return this;
    if (B[0] === "") return this.root.lookup(B.slice(1), Q);
    var G = this.get(B[0]);
    if (G) {
      if (B.length === 1) {
        if (!Q || Q.indexOf(G.constructor) > -1) return G
      } else if (G instanceof R5 && (G = G.lookup(B.slice(1), Q, !0))) return G
    } else
      for (var Z = 0; Z < this.nestedArray.length; ++Z)
        if (this._nestedArray[Z] instanceof R5 && (G = this._nestedArray[Z].lookup(B, Q, !0))) return G;
    if (this.parent === null || I) return null;
    return this.parent.lookup(B, Q)
  };
  R5.prototype.lookupType = function A(B) {
    var Q = this.lookup(B, [eg]);
    if (!Q) throw Error("no such type: " + B);
    return Q
  };
  R5.prototype.lookupEnum = function A(B) {
    var Q = this.lookup(B, [Ah]);
    if (!Q) throw Error("no such Enum '" + B + "' in " + this);
    return Q
  };
  R5.prototype.lookupTypeOrEnum = function A(B) {
    var Q = this.lookup(B, [eg, Ah]);
    if (!Q) throw Error("no such Type or Enum '" + B + "' in " + this);
    return Q
  };
  R5.prototype.lookupService = function A(B) {
    var Q = this.lookup(B, [Br]);
    if (!Q) throw Error("no such Service '" + B + "' in " + this);
    return Q
  };
  R5._configure = function(A, B, Q) {
    eg = A, Br = B, Ah = Q
  }
})
// @from(Start 4765921, End 4767183)
VD1 = z((d$8, Mj0) => {
  Mj0.exports = PN;
  var lh1 = VR();
  ((PN.prototype = Object.create(lh1.prototype)).constructor = PN).className = "MapField";
  var J36 = r_(),
    Qr = RI();

  function PN(A, B, Q, I, G, Z) {
    if (lh1.call(this, A, B, I, void 0, void 0, G, Z), !Qr.isString(Q)) throw TypeError("keyType must be a string");
    this.keyType = Q, this.resolvedKeyType = null, this.map = !0
  }
  PN.fromJSON = function A(B, Q) {
    return new PN(B, Q.id, Q.keyType, Q.type, Q.options, Q.comment)
  };
  PN.prototype.toJSON = function A(B) {
    var Q = B ? Boolean(B.keepComments) : !1;
    return Qr.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", Q ? this.comment : void 0])
  };
  PN.prototype.resolve = function A() {
    if (this.resolved) return this;
    if (J36.mapKey[this.keyType] === void 0) throw Error("invalid key type: " + this.keyType);
    return lh1.prototype.resolve.call(this)
  };
  PN.d = function A(B, Q, I) {
    if (typeof I === "function") I = Qr.decorateType(I).name;
    else if (I && typeof I === "object") I = Qr.decorateEnum(I).name;
    return function G(Z, D) {
      Qr.decorateType(Z.constructor).add(new PN(D, B, Q, I))
    }
  }
})
// @from(Start 4767189, End 4768866)
CD1 = z((u$8, Lj0) => {
  Lj0.exports = t_;
  var ih1 = o_();
  ((t_.prototype = Object.create(ih1.prototype)).constructor = t_).className = "Method";
  var Qh = RI();

  function t_(A, B, Q, I, G, Z, D, Y, W) {
    if (Qh.isObject(G)) D = G, G = Z = void 0;
    else if (Qh.isObject(Z)) D = Z, Z = void 0;
    if (!(B === void 0 || Qh.isString(B))) throw TypeError("type must be a string");
    if (!Qh.isString(Q)) throw TypeError("requestType must be a string");
    if (!Qh.isString(I)) throw TypeError("responseType must be a string");
    ih1.call(this, A, D), this.type = B || "rpc", this.requestType = Q, this.requestStream = G ? !0 : void 0, this.responseType = I, this.responseStream = Z ? !0 : void 0, this.resolvedRequestType = null, this.resolvedResponseType = null, this.comment = Y, this.parsedOptions = W
  }
  t_.fromJSON = function A(B, Q) {
    return new t_(B, Q.type, Q.requestType, Q.responseType, Q.requestStream, Q.responseStream, Q.options, Q.comment, Q.parsedOptions)
  };
  t_.prototype.toJSON = function A(B) {
    var Q = B ? Boolean(B.keepComments) : !1;
    return Qh.toObject(["type", this.type !== "rpc" && this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", Q ? this.comment : void 0, "parsedOptions", this.parsedOptions])
  };
  t_.prototype.resolve = function A() {
    if (this.resolved) return this;
    return this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), ih1.prototype.resolve.call(this)
  }
})
// @from(Start 4768872, End 4771295)
KD1 = z((p$8, Oj0) => {
  Oj0.exports = jX;
  var CR = Bh();
  ((jX.prototype = Object.create(CR.prototype)).constructor = jX).className = "Service";
  var nh1 = CD1(),
    Ir = RI(),
    F36 = gg1();

  function jX(A, B) {
    CR.call(this, A, B), this.methods = {}, this._methodsArray = null
  }
  jX.fromJSON = function A(B, Q) {
    var I = new jX(B, Q.options);
    if (Q.methods)
      for (var G = Object.keys(Q.methods), Z = 0; Z < G.length; ++Z) I.add(nh1.fromJSON(G[Z], Q.methods[G[Z]]));
    if (Q.nested) I.addJSON(Q.nested);
    return I.comment = Q.comment, I
  };
  jX.prototype.toJSON = function A(B) {
    var Q = CR.prototype.toJSON.call(this, B),
      I = B ? Boolean(B.keepComments) : !1;
    return Ir.toObject(["options", Q && Q.options || void 0, "methods", CR.arrayToJSON(this.methodsArray, B) || {}, "nested", Q && Q.nested || void 0, "comment", I ? this.comment : void 0])
  };
  Object.defineProperty(jX.prototype, "methodsArray", {
    get: function() {
      return this._methodsArray || (this._methodsArray = Ir.toArray(this.methods))
    }
  });

  function Rj0(A) {
    return A._methodsArray = null, A
  }
  jX.prototype.get = function A(B) {
    return this.methods[B] || CR.prototype.get.call(this, B)
  };
  jX.prototype.resolveAll = function A() {
    var B = this.methodsArray;
    for (var Q = 0; Q < B.length; ++Q) B[Q].resolve();
    return CR.prototype.resolve.call(this)
  };
  jX.prototype.add = function A(B) {
    if (this.get(B.name)) throw Error("duplicate name '" + B.name + "' in " + this);
    if (B instanceof nh1) return this.methods[B.name] = B, B.parent = this, Rj0(this);
    return CR.prototype.add.call(this, B)
  };
  jX.prototype.remove = function A(B) {
    if (B instanceof nh1) {
      if (this.methods[B.name] !== B) throw Error(B + " is not a member of " + this);
      return delete this.methods[B.name], B.parent = null, Rj0(this)
    }
    return CR.prototype.remove.call(this, B)
  };
  jX.prototype.create = function A(B, Q, I) {
    var G = new F36.Service(B, Q, I);
    for (var Z = 0, D; Z < this.methodsArray.length; ++Z) {
      var Y = Ir.lcFirst((D = this._methodsArray[Z]).resolve().name).replace(/[^$\w_]/g, "");
      G[Y] = Ir.codegen(["r", "c"], Ir.isReserved(Y) ? Y + "_" : Y)("return this.rpcCall(m,q,s,r,c)")({
        m: D,
        q: D.resolvedRequestType.ctor,
        s: D.resolvedResponseType.ctor
      })
    }
    return G
  }
})
// @from(Start 4771301, End 4772183)
HD1 = z((c$8, Tj0) => {
  Tj0.exports = Yw;
  var X36 = Iw();

  function Yw(A) {
    if (A)
      for (var B = Object.keys(A), Q = 0; Q < B.length; ++Q) this[B[Q]] = A[B[Q]]
  }
  Yw.create = function A(B) {
    return this.$type.create(B)
  };
  Yw.encode = function A(B, Q) {
    return this.$type.encode(B, Q)
  };
  Yw.encodeDelimited = function A(B, Q) {
    return this.$type.encodeDelimited(B, Q)
  };
  Yw.decode = function A(B) {
    return this.$type.decode(B)
  };
  Yw.decodeDelimited = function A(B) {
    return this.$type.decodeDelimited(B)
  };
  Yw.verify = function A(B) {
    return this.$type.verify(B)
  };
  Yw.fromObject = function A(B) {
    return this.$type.fromObject(B)
  };
  Yw.toObject = function A(B, Q) {
    return this.$type.toObject(B, Q)
  };
  Yw.prototype.toJSON = function A() {
    return this.$type.toObject(this, X36.toJSONOptions)
  }
})
// @from(Start 4772189, End 4774589)
ah1 = z((l$8, Sj0) => {
  Sj0.exports = K36;
  var V36 = cC(),
    SN = r_(),
    Pj0 = RI();

  function C36(A) {
    return "missing required '" + A.name + "'"
  }

  function K36(A) {
    var B = Pj0.codegen(["r", "l"], A.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (A.fieldsArray.filter(function(Y) {
      return Y.map
    }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
    if (A.group) B("if((t&7)===4)")("break");
    B("switch(t>>>3){");
    var Q = 0;
    for (; Q < A.fieldsArray.length; ++Q) {
      var I = A._fieldsArray[Q].resolve(),
        G = I.resolvedType instanceof V36 ? "int32" : I.type,
        Z = "m" + Pj0.safeProp(I.name);
      if (B("case %i: {", I.id), I.map) {
        if (B("if(%s===util.emptyObject)", Z)("%s={}", Z)("var c2 = r.uint32()+r.pos"), SN.defaults[I.keyType] !== void 0) B("k=%j", SN.defaults[I.keyType]);
        else B("k=null");
        if (SN.defaults[G] !== void 0) B("value=%j", SN.defaults[G]);
        else B("value=null");
        if (B("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", I.keyType)("case 2:"), SN.basic[G] === void 0) B("value=types[%i].decode(r,r.uint32())", Q);
        else B("value=r.%s()", G);
        if (B("break")("default:")("r.skipType(tag2&7)")("break")("}")("}"), SN.long[I.keyType] !== void 0) B('%s[typeof k==="object"?util.longToHash(k):k]=value', Z);
        else B("%s[k]=value", Z)
      } else if (I.repeated) {
        if (B("if(!(%s&&%s.length))", Z, Z)("%s=[]", Z), SN.packed[G] !== void 0) B("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", Z, G)("}else");
        if (SN.basic[G] === void 0) B(I.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", Z, Q);
        else B("%s.push(r.%s())", Z, G)
      } else if (SN.basic[G] === void 0) B(I.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", Z, Q);
      else B("%s=r.%s()", Z, G);
      B("break")("}")
    }
    B("default:")("r.skipType(t&7)")("break")("}")("}");
    for (Q = 0; Q < A._fieldsArray.length; ++Q) {
      var D = A._fieldsArray[Q];
      if (D.required) B("if(!m.hasOwnProperty(%j))", D.name)("throw util.ProtocolError(%j,{instance:m})", C36(D))
    }
    return B("return m")
  }
})
// @from(Start 4774595, End 4777957)
oh1 = z((i$8, _j0) => {
  _j0.exports = w36;
  var H36 = cC(),
    sh1 = RI();

  function yX(A, B) {
    return A.name + ": " + B + (A.repeated && B !== "array" ? "[]" : A.map && B !== "object" ? "{k:" + A.keyType + "}" : "") + " expected"
  }

  function rh1(A, B, Q, I) {
    if (B.resolvedType)
      if (B.resolvedType instanceof H36) {
        A("switch(%s){", I)("default:")("return%j", yX(B, "enum value"));
        for (var G = Object.keys(B.resolvedType.values), Z = 0; Z < G.length; ++Z) A("case %i:", B.resolvedType.values[G[Z]]);
        A("break")("}")
      } else A("{")("var e=types[%i].verify(%s);", Q, I)("if(e)")("return%j+e", B.name + ".")("}");
    else switch (B.type) {
      case "int32":
      case "uint32":
      case "sint32":
      case "fixed32":
      case "sfixed32":
        A("if(!util.isInteger(%s))", I)("return%j", yX(B, "integer"));
        break;
      case "int64":
      case "uint64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        A("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", I, I, I, I)("return%j", yX(B, "integer|Long"));
        break;
      case "float":
      case "double":
        A('if(typeof %s!=="number")', I)("return%j", yX(B, "number"));
        break;
      case "bool":
        A('if(typeof %s!=="boolean")', I)("return%j", yX(B, "boolean"));
        break;
      case "string":
        A("if(!util.isString(%s))", I)("return%j", yX(B, "string"));
        break;
      case "bytes":
        A('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', I, I, I)("return%j", yX(B, "buffer"));
        break
    }
    return A
  }

  function z36(A, B, Q) {
    switch (B.keyType) {
      case "int32":
      case "uint32":
      case "sint32":
      case "fixed32":
      case "sfixed32":
        A("if(!util.key32Re.test(%s))", Q)("return%j", yX(B, "integer key"));
        break;
      case "int64":
      case "uint64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        A("if(!util.key64Re.test(%s))", Q)("return%j", yX(B, "integer|Long key"));
        break;
      case "bool":
        A("if(!util.key2Re.test(%s))", Q)("return%j", yX(B, "boolean key"));
        break
    }
    return A
  }

  function w36(A) {
    var B = sh1.codegen(["m"], A.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected"),
      Q = A.oneofsArray,
      I = {};
    if (Q.length) B("var p={}");
    for (var G = 0; G < A.fieldsArray.length; ++G) {
      var Z = A._fieldsArray[G].resolve(),
        D = "m" + sh1.safeProp(Z.name);
      if (Z.optional) B("if(%s!=null&&m.hasOwnProperty(%j)){", D, Z.name);
      if (Z.map) B("if(!util.isObject(%s))", D)("return%j", yX(Z, "object"))("var k=Object.keys(%s)", D)("for(var i=0;i<k.length;++i){"), z36(B, Z, "k[i]"), rh1(B, Z, G, D + "[k[i]]")("}");
      else if (Z.repeated) B("if(!Array.isArray(%s))", D)("return%j", yX(Z, "array"))("for(var i=0;i<%s.length;++i){", D), rh1(B, Z, G, D + "[i]")("}");
      else {
        if (Z.partOf) {
          var Y = sh1.safeProp(Z.partOf.name);
          if (I[Z.partOf.name] === 1) B("if(p%s===1)", Y)("return%j", Z.partOf.name + ": multiple values");
          I[Z.partOf.name] = 1, B("p%s=1", Y)
        }
        rh1(B, Z, G, D)
      }
      if (Z.optional) B("}")
    }
    return B("return null")
  }
})
// @from(Start 4777963, End 4784449)
Am1 = z((yj0) => {
  var jj0 = yj0,
    Gr = cC(),
    Ww = RI();

  function th1(A, B, Q, I) {
    var G = !1;
    if (B.resolvedType)
      if (B.resolvedType instanceof Gr) {
        A("switch(d%s){", I);
        for (var Z = B.resolvedType.values, D = Object.keys(Z), Y = 0; Y < D.length; ++Y) {
          if (Z[D[Y]] === B.typeDefault && !G) {
            if (A("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', I, I, I), !B.repeated) A("break");
            G = !0
          }
          A("case%j:", D[Y])("case %i:", Z[D[Y]])("m%s=%j", I, Z[D[Y]])("break")
        }
        A("}")
      } else A('if(typeof d%s!=="object")', I)("throw TypeError(%j)", B.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", I, Q, I);
    else {
      var W = !1;
      switch (B.type) {
        case "double":
        case "float":
          A("m%s=Number(d%s)", I, I);
          break;
        case "uint32":
        case "fixed32":
          A("m%s=d%s>>>0", I, I);
          break;
        case "int32":
        case "sint32":
        case "sfixed32":
          A("m%s=d%s|0", I, I);
          break;
        case "uint64":
          W = !0;
        case "int64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          A("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", I, I, W)('else if(typeof d%s==="string")', I)("m%s=parseInt(d%s,10)", I, I)('else if(typeof d%s==="number")', I)("m%s=d%s", I, I)('else if(typeof d%s==="object")', I)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", I, I, I, W ? "true" : "");
          break;
        case "bytes":
          A('if(typeof d%s==="string")', I)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", I, I, I)("else if(d%s.length >= 0)", I)("m%s=d%s", I, I);
          break;
        case "string":
          A("m%s=String(d%s)", I, I);
          break;
        case "bool":
          A("m%s=Boolean(d%s)", I, I);
          break
      }
    }
    return A
  }
  jj0.fromObject = function A(B) {
    var Q = B.fieldsArray,
      I = Ww.codegen(["d"], B.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
    if (!Q.length) return I("return new this.ctor");
    I("var m=new this.ctor");
    for (var G = 0; G < Q.length; ++G) {
      var Z = Q[G].resolve(),
        D = Ww.safeProp(Z.name);
      if (Z.map) I("if(d%s){", D)('if(typeof d%s!=="object")', D)("throw TypeError(%j)", Z.fullName + ": object expected")("m%s={}", D)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", D), th1(I, Z, G, D + "[ks[i]]")("}")("}");
      else if (Z.repeated) I("if(d%s){", D)("if(!Array.isArray(d%s))", D)("throw TypeError(%j)", Z.fullName + ": array expected")("m%s=[]", D)("for(var i=0;i<d%s.length;++i){", D), th1(I, Z, G, D + "[i]")("}")("}");
      else {
        if (!(Z.resolvedType instanceof Gr)) I("if(d%s!=null){", D);
        if (th1(I, Z, G, D), !(Z.resolvedType instanceof Gr)) I("}")
      }
    }
    return I("return m")
  };

  function eh1(A, B, Q, I) {
    if (B.resolvedType)
      if (B.resolvedType instanceof Gr) A("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", I, Q, I, I, Q, I, I);
      else A("d%s=types[%i].toObject(m%s,o)", I, Q, I);
    else {
      var G = !1;
      switch (B.type) {
        case "double":
        case "float":
          A("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", I, I, I, I);
          break;
        case "uint64":
          G = !0;
        case "int64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          A('if(typeof m%s==="number")', I)("d%s=o.longs===String?String(m%s):m%s", I, I, I)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", I, I, I, I, G ? "true" : "", I);
          break;
        case "bytes":
          A("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", I, I, I, I, I);
          break;
        default:
          A("d%s=m%s", I, I);
          break
      }
    }
    return A
  }
  jj0.toObject = function A(B) {
    var Q = B.fieldsArray.slice().sort(Ww.compareFieldsById);
    if (!Q.length) return Ww.codegen()("return {}");
    var I = Ww.codegen(["m", "o"], B.name + "$toObject")("if(!o)")("o={}")("var d={}"),
      G = [],
      Z = [],
      D = [],
      Y = 0;
    for (; Y < Q.length; ++Y)
      if (!Q[Y].partOf)(Q[Y].resolve().repeated ? G : Q[Y].map ? Z : D).push(Q[Y]);
    if (G.length) {
      I("if(o.arrays||o.defaults){");
      for (Y = 0; Y < G.length; ++Y) I("d%s=[]", Ww.safeProp(G[Y].name));
      I("}")
    }
    if (Z.length) {
      I("if(o.objects||o.defaults){");
      for (Y = 0; Y < Z.length; ++Y) I("d%s={}", Ww.safeProp(Z[Y].name));
      I("}")
    }
    if (D.length) {
      I("if(o.defaults){");
      for (Y = 0; Y < D.length; ++Y) {
        var W = D[Y],
          J = Ww.safeProp(W.name);
        if (W.resolvedType instanceof Gr) I("d%s=o.enums===String?%j:%j", J, W.resolvedType.valuesById[W.typeDefault], W.typeDefault);
        else if (W.long) I("if(util.Long){")("var n=new util.Long(%i,%i,%j)", W.typeDefault.low, W.typeDefault.high, W.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", J)("}else")("d%s=o.longs===String?%j:%i", J, W.typeDefault.toString(), W.typeDefault.toNumber());
        else if (W.bytes) {
          var F = "[" + Array.prototype.slice.call(W.typeDefault).join(",") + "]";
          I("if(o.bytes===String)d%s=%j", J, String.fromCharCode.apply(String, W.typeDefault))("else{")("d%s=%s", J, F)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", J, J)("}")
        } else I("d%s=%j", J, W.typeDefault)
      }
      I("}")
    }
    var X = !1;
    for (Y = 0; Y < Q.length; ++Y) {
      var W = Q[Y],
        V = B._fieldsArray.indexOf(W),
        J = Ww.safeProp(W.name);
      if (W.map) {
        if (!X) X = !0, I("var ks2");
        I("if(m%s&&(ks2=Object.keys(m%s)).length){", J, J)("d%s={}", J)("for(var j=0;j<ks2.length;++j){"), eh1(I, W, V, J + "[ks2[j]]")("}")
      } else if (W.repeated) I("if(m%s&&m%s.length){", J, J)("d%s=[]", J)("for(var j=0;j<m%s.length;++j){", J), eh1(I, W, V, J + "[j]")("}");
      else if (I("if(m%s!=null&&m.hasOwnProperty(%j)){", J, W.name), eh1(I, W, V, J), W.partOf) I("if(o.oneofs)")("d%s=%j", Ww.safeProp(W.partOf.name), W.name);
      I("}")
    }
    return I("return d")
  }
})
// @from(Start 4784455, End 4785704)
Bm1 = z((kj0) => {
  var E36 = kj0,
    U36 = HD1();
  E36[".google.protobuf.Any"] = {
    fromObject: function(A) {
      if (A && A["@type"]) {
        var B = A["@type"].substring(A["@type"].lastIndexOf("/") + 1),
          Q = this.lookup(B);
        if (Q) {
          var I = A["@type"].charAt(0) === "." ? A["@type"].slice(1) : A["@type"];
          if (I.indexOf("/") === -1) I = "/" + I;
          return this.create({
            type_url: I,
            value: Q.encode(Q.fromObject(A)).finish()
          })
        }
      }
      return this.fromObject(A)
    },
    toObject: function(A, B) {
      var Q = "type.googleapis.com/",
        I = "",
        G = "";
      if (B && B.json && A.type_url && A.value) {
        G = A.type_url.substring(A.type_url.lastIndexOf("/") + 1), I = A.type_url.substring(0, A.type_url.lastIndexOf("/") + 1);
        var Z = this.lookup(G);
        if (Z) A = Z.decode(A.value)
      }
      if (!(A instanceof this.ctor) && A instanceof U36) {
        var D = A.$type.toObject(A, B),
          Y = A.$type.fullName[0] === "." ? A.$type.fullName.slice(1) : A.$type.fullName;
        if (I === "") I = Q;
        return G = I + Y, D["@type"] = G, D
      }
      return this.toObject(A, B)
    }
  }
})
// @from(Start 4785710, End 4793643)
ED1 = z((s$8, fj0) => {
  fj0.exports = ZB;
  var lC = Bh();
  ((ZB.prototype = Object.create(lC.prototype)).constructor = ZB).className = "Type";
  var N36 = cC(),
    Gm1 = tg(),
    zD1 = VR(),
    $36 = VD1(),
    q36 = KD1(),
    Qm1 = HD1(),
    Im1 = xZ1(),
    M36 = yZ1(),
    _Z = RI(),
    L36 = Zm1(),
    R36 = ah1(),
    O36 = oh1(),
    xj0 = Am1(),
    T36 = Bm1();

  function ZB(A, B) {
    lC.call(this, A, B), this.fields = {}, this.oneofs = void 0, this.extensions = void 0, this.reserved = void 0, this.group = void 0, this._fieldsById = null, this._fieldsArray = null, this._oneofsArray = null, this._ctor = null
  }
  Object.defineProperties(ZB.prototype, {
    fieldsById: {
      get: function() {
        if (this._fieldsById) return this._fieldsById;
        this._fieldsById = {};
        for (var A = Object.keys(this.fields), B = 0; B < A.length; ++B) {
          var Q = this.fields[A[B]],
            I = Q.id;
          if (this._fieldsById[I]) throw Error("duplicate id " + I + " in " + this);
          this._fieldsById[I] = Q
        }
        return this._fieldsById
      }
    },
    fieldsArray: {
      get: function() {
        return this._fieldsArray || (this._fieldsArray = _Z.toArray(this.fields))
      }
    },
    oneofsArray: {
      get: function() {
        return this._oneofsArray || (this._oneofsArray = _Z.toArray(this.oneofs))
      }
    },
    ctor: {
      get: function() {
        return this._ctor || (this.ctor = ZB.generateConstructor(this)())
      },
      set: function(A) {
        var B = A.prototype;
        if (!(B instanceof Qm1))(A.prototype = new Qm1).constructor = A, _Z.merge(A.prototype, B);
        A.$type = A.prototype.$type = this, _Z.merge(A, Qm1, !0), this._ctor = A;
        var Q = 0;
        for (; Q < this.fieldsArray.length; ++Q) this._fieldsArray[Q].resolve();
        var I = {};
        for (Q = 0; Q < this.oneofsArray.length; ++Q) I[this._oneofsArray[Q].resolve().name] = {
          get: _Z.oneOfGetter(this._oneofsArray[Q].oneof),
          set: _Z.oneOfSetter(this._oneofsArray[Q].oneof)
        };
        if (Q) Object.defineProperties(A.prototype, I)
      }
    }
  });
  ZB.generateConstructor = function A(B) {
    var Q = _Z.codegen(["p"], B.name);
    for (var I = 0, G; I < B.fieldsArray.length; ++I)
      if ((G = B._fieldsArray[I]).map) Q("this%s={}", _Z.safeProp(G.name));
      else if (G.repeated) Q("this%s=[]", _Z.safeProp(G.name));
    return Q("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]")
  };

  function wD1(A) {
    return A._fieldsById = A._fieldsArray = A._oneofsArray = null, delete A.encode, delete A.decode, delete A.verify, A
  }
  ZB.fromJSON = function A(B, Q) {
    var I = new ZB(B, Q.options);
    I.extensions = Q.extensions, I.reserved = Q.reserved;
    var G = Object.keys(Q.fields),
      Z = 0;
    for (; Z < G.length; ++Z) I.add((typeof Q.fields[G[Z]].keyType !== "undefined" ? $36.fromJSON : zD1.fromJSON)(G[Z], Q.fields[G[Z]]));
    if (Q.oneofs)
      for (G = Object.keys(Q.oneofs), Z = 0; Z < G.length; ++Z) I.add(Gm1.fromJSON(G[Z], Q.oneofs[G[Z]]));
    if (Q.nested)
      for (G = Object.keys(Q.nested), Z = 0; Z < G.length; ++Z) {
        var D = Q.nested[G[Z]];
        I.add((D.id !== void 0 ? zD1.fromJSON : D.fields !== void 0 ? ZB.fromJSON : D.values !== void 0 ? N36.fromJSON : D.methods !== void 0 ? q36.fromJSON : lC.fromJSON)(G[Z], D))
      }
    if (Q.extensions && Q.extensions.length) I.extensions = Q.extensions;
    if (Q.reserved && Q.reserved.length) I.reserved = Q.reserved;
    if (Q.group) I.group = !0;
    if (Q.comment) I.comment = Q.comment;
    return I
  };
  ZB.prototype.toJSON = function A(B) {
    var Q = lC.prototype.toJSON.call(this, B),
      I = B ? Boolean(B.keepComments) : !1;
    return _Z.toObject(["options", Q && Q.options || void 0, "oneofs", lC.arrayToJSON(this.oneofsArray, B), "fields", lC.arrayToJSON(this.fieldsArray.filter(function(G) {
      return !G.declaringField
    }), B) || {}, "extensions", this.extensions && this.extensions.length ? this.extensions : void 0, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "group", this.group || void 0, "nested", Q && Q.nested || void 0, "comment", I ? this.comment : void 0])
  };
  ZB.prototype.resolveAll = function A() {
    var B = this.fieldsArray,
      Q = 0;
    while (Q < B.length) B[Q++].resolve();
    var I = this.oneofsArray;
    Q = 0;
    while (Q < I.length) I[Q++].resolve();
    return lC.prototype.resolveAll.call(this)
  };
  ZB.prototype.get = function A(B) {
    return this.fields[B] || this.oneofs && this.oneofs[B] || this.nested && this.nested[B] || null
  };
  ZB.prototype.add = function A(B) {
    if (this.get(B.name)) throw Error("duplicate name '" + B.name + "' in " + this);
    if (B instanceof zD1 && B.extend === void 0) {
      if (this._fieldsById ? this._fieldsById[B.id] : this.fieldsById[B.id]) throw Error("duplicate id " + B.id + " in " + this);
      if (this.isReservedId(B.id)) throw Error("id " + B.id + " is reserved in " + this);
      if (this.isReservedName(B.name)) throw Error("name '" + B.name + "' is reserved in " + this);
      if (B.parent) B.parent.remove(B);
      return this.fields[B.name] = B, B.message = this, B.onAdd(this), wD1(this)
    }
    if (B instanceof Gm1) {
      if (!this.oneofs) this.oneofs = {};
      return this.oneofs[B.name] = B, B.onAdd(this), wD1(this)
    }
    return lC.prototype.add.call(this, B)
  };
  ZB.prototype.remove = function A(B) {
    if (B instanceof zD1 && B.extend === void 0) {
      if (!this.fields || this.fields[B.name] !== B) throw Error(B + " is not a member of " + this);
      return delete this.fields[B.name], B.parent = null, B.onRemove(this), wD1(this)
    }
    if (B instanceof Gm1) {
      if (!this.oneofs || this.oneofs[B.name] !== B) throw Error(B + " is not a member of " + this);
      return delete this.oneofs[B.name], B.parent = null, B.onRemove(this), wD1(this)
    }
    return lC.prototype.remove.call(this, B)
  };
  ZB.prototype.isReservedId = function A(B) {
    return lC.isReservedId(this.reserved, B)
  };
  ZB.prototype.isReservedName = function A(B) {
    return lC.isReservedName(this.reserved, B)
  };
  ZB.prototype.create = function A(B) {
    return new this.ctor(B)
  };
  ZB.prototype.setup = function A() {
    var B = this.fullName,
      Q = [];
    for (var I = 0; I < this.fieldsArray.length; ++I) Q.push(this._fieldsArray[I].resolve().resolvedType);
    this.encode = L36(this)({
      Writer: M36,
      types: Q,
      util: _Z
    }), this.decode = R36(this)({
      Reader: Im1,
      types: Q,
      util: _Z
    }), this.verify = O36(this)({
      types: Q,
      util: _Z
    }), this.fromObject = xj0.fromObject(this)({
      types: Q,
      util: _Z
    }), this.toObject = xj0.toObject(this)({
      types: Q,
      util: _Z
    });
    var G = T36[B];
    if (G) {
      var Z = Object.create(this);
      Z.fromObject = this.fromObject, this.fromObject = G.fromObject.bind(Z), Z.toObject = this.toObject, this.toObject = G.toObject.bind(Z)
    }
    return this
  };
  ZB.prototype.encode = function A(B, Q) {
    return this.setup().encode(B, Q)
  };
  ZB.prototype.encodeDelimited = function A(B, Q) {
    return this.encode(B, Q && Q.len ? Q.fork() : Q).ldelim()
  };
  ZB.prototype.decode = function A(B, Q) {
    return this.setup().decode(B, Q)
  };
  ZB.prototype.decodeDelimited = function A(B) {
    if (!(B instanceof Im1)) B = Im1.create(B);
    return this.decode(B, B.uint32())
  };
  ZB.prototype.verify = function A(B) {
    return this.setup().verify(B)
  };
  ZB.prototype.fromObject = function A(B) {
    return this.setup().fromObject(B)
  };
  ZB.prototype.toObject = function A(B, Q) {
    return this.setup().toObject(B, Q)
  };
  ZB.d = function A(B) {
    return function Q(I) {
      _Z.decorateType(I, B)
    }
  }
})
// @from(Start 4793649, End 4798275)
$D1 = z((r$8, mj0) => {
  mj0.exports = NJ;
  var ND1 = Bh();
  ((NJ.prototype = Object.create(ND1.prototype)).constructor = NJ).className = "Root";
  var Ym1 = VR(),
    bj0 = cC(),
    P36 = tg(),
    KR = RI(),
    gj0, Dm1, Zr;

  function NJ(A) {
    ND1.call(this, "", A), this.deferred = [], this.files = []
  }
  NJ.fromJSON = function A(B, Q) {
    if (!Q) Q = new NJ;
    if (B.options) Q.setOptions(B.options);
    return Q.addJSON(B.nested)
  };
  NJ.prototype.resolvePath = KR.path.resolve;
  NJ.prototype.fetch = KR.fetch;

  function hj0() {}
  NJ.prototype.load = function A(B, Q, I) {
    if (typeof Q === "function") I = Q, Q = void 0;
    var G = this;
    if (!I) return KR.asPromise(A, G, B, Q);
    var Z = I === hj0;

    function D(C, K) {
      if (!I) return;
      if (Z) throw C;
      var E = I;
      I = null, E(C, K)
    }

    function Y(C) {
      var K = C.lastIndexOf("google/protobuf/");
      if (K > -1) {
        var E = C.substring(K);
        if (E in Zr) return E
      }
      return null
    }

    function W(C, K) {
      try {
        if (KR.isString(K) && K.charAt(0) === "{") K = JSON.parse(K);
        if (!KR.isString(K)) G.setOptions(K.options).addJSON(K.nested);
        else {
          Dm1.filename = C;
          var E = Dm1(K, G, Q),
            N, q = 0;
          if (E.imports) {
            for (; q < E.imports.length; ++q)
              if (N = Y(E.imports[q]) || G.resolvePath(C, E.imports[q])) J(N)
          }
          if (E.weakImports) {
            for (q = 0; q < E.weakImports.length; ++q)
              if (N = Y(E.weakImports[q]) || G.resolvePath(C, E.weakImports[q])) J(N, !0)
          }
        }
      } catch (O) {
        D(O)
      }
      if (!Z && !F) D(null, G)
    }

    function J(C, K) {
      if (C = Y(C) || C, G.files.indexOf(C) > -1) return;
      if (G.files.push(C), C in Zr) {
        if (Z) W(C, Zr[C]);
        else ++F, setTimeout(function() {
          --F, W(C, Zr[C])
        });
        return
      }
      if (Z) {
        var E;
        try {
          E = KR.fs.readFileSync(C).toString("utf8")
        } catch (N) {
          if (!K) D(N);
          return
        }
        W(C, E)
      } else ++F, G.fetch(C, function(N, q) {
        if (--F, !I) return;
        if (N) {
          if (!K) D(N);
          else if (!F) D(null, G);
          return
        }
        W(C, q)
      })
    }
    var F = 0;
    if (KR.isString(B)) B = [B];
    for (var X = 0, V; X < B.length; ++X)
      if (V = G.resolvePath("", B[X])) J(V);
    if (Z) return G;
    if (!F) D(null, G);
    return
  };
  NJ.prototype.loadSync = function A(B, Q) {
    if (!KR.isNode) throw Error("not supported");
    return this.load(B, Q, hj0)
  };
  NJ.prototype.resolveAll = function A() {
    if (this.deferred.length) throw Error("unresolvable extensions: " + this.deferred.map(function(B) {
      return "'extend " + B.extend + "' in " + B.parent.fullName
    }).join(", "));
    return ND1.prototype.resolveAll.call(this)
  };
  var UD1 = /^[A-Z]/;

  function vj0(A, B) {
    var Q = B.parent.lookup(B.extend);
    if (Q) {
      var I = new Ym1(B.fullName, B.id, B.type, B.rule, void 0, B.options);
      if (Q.get(I.name)) return !0;
      return I.declaringField = B, B.extensionField = I, Q.add(I), !0
    }
    return !1
  }
  NJ.prototype._handleAdd = function A(B) {
    if (B instanceof Ym1) {
      if (B.extend !== void 0 && !B.extensionField) {
        if (!vj0(this, B)) this.deferred.push(B)
      }
    } else if (B instanceof bj0) {
      if (UD1.test(B.name)) B.parent[B.name] = B.values
    } else if (!(B instanceof P36)) {
      if (B instanceof gj0)
        for (var Q = 0; Q < this.deferred.length;)
          if (vj0(this, this.deferred[Q])) this.deferred.splice(Q, 1);
          else ++Q;
      for (var I = 0; I < B.nestedArray.length; ++I) this._handleAdd(B._nestedArray[I]);
      if (UD1.test(B.name)) B.parent[B.name] = B
    }
  };
  NJ.prototype._handleRemove = function A(B) {
    if (B instanceof Ym1) {
      if (B.extend !== void 0)
        if (B.extensionField) B.extensionField.parent.remove(B.extensionField), B.extensionField = null;
        else {
          var Q = this.deferred.indexOf(B);
          if (Q > -1) this.deferred.splice(Q, 1)
        }
    } else if (B instanceof bj0) {
      if (UD1.test(B.name)) delete B.parent[B.name]
    } else if (B instanceof ND1) {
      for (var I = 0; I < B.nestedArray.length; ++I) this._handleRemove(B._nestedArray[I]);
      if (UD1.test(B.name)) delete B.parent[B.name]
    }
  };
  NJ._configure = function(A, B, Q) {
    gj0 = A, Dm1 = B, Zr = Q
  }
})
// @from(Start 4798281, End 4801164)
RI = z((o$8, uj0) => {
  var SQ = uj0.exports = Iw(),
    dj0 = hg1(),
    Wm1, Jm1;
  SQ.codegen = Dj0();
  SQ.fetch = Wj0();
  SQ.path = Xj0();
  SQ.fs = SQ.inquire("fs");
  SQ.toArray = function A(B) {
    if (B) {
      var Q = Object.keys(B),
        I = new Array(Q.length),
        G = 0;
      while (G < Q.length) I[G] = B[Q[G++]];
      return I
    }
    return []
  };
  SQ.toObject = function A(B) {
    var Q = {},
      I = 0;
    while (I < B.length) {
      var G = B[I++],
        Z = B[I++];
      if (Z !== void 0) Q[G] = Z
    }
    return Q
  };
  var S36 = /\\/g,
    _36 = /"/g;
  SQ.isReserved = function A(B) {
    return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(B)
  };
  SQ.safeProp = function A(B) {
    if (!/^[$\w_]+$/.test(B) || SQ.isReserved(B)) return '["' + B.replace(S36, "\\\\").replace(_36, "\\\"") + '"]';
    return "." + B
  };
  SQ.ucFirst = function A(B) {
    return B.charAt(0).toUpperCase() + B.substring(1)
  };
  var j36 = /_([a-z])/g;
  SQ.camelCase = function A(B) {
    return B.substring(0, 1) + B.substring(1).replace(j36, function(Q, I) {
      return I.toUpperCase()
    })
  };
  SQ.compareFieldsById = function A(B, Q) {
    return B.id - Q.id
  };
  SQ.decorateType = function A(B, Q) {
    if (B.$type) {
      if (Q && B.$type.name !== Q) SQ.decorateRoot.remove(B.$type), B.$type.name = Q, SQ.decorateRoot.add(B.$type);
      return B.$type
    }
    if (!Wm1) Wm1 = ED1();
    var I = new Wm1(Q || B.name);
    return SQ.decorateRoot.add(I), I.ctor = B, Object.defineProperty(B, "$type", {
      value: I,
      enumerable: !1
    }), Object.defineProperty(B.prototype, "$type", {
      value: I,
      enumerable: !1
    }), I
  };
  var y36 = 0;
  SQ.decorateEnum = function A(B) {
    if (B.$type) return B.$type;
    if (!Jm1) Jm1 = cC();
    var Q = new Jm1("Enum" + y36++, B);
    return SQ.decorateRoot.add(Q), Object.defineProperty(B, "$type", {
      value: Q,
      enumerable: !1
    }), Q
  };
  SQ.setProperty = function A(B, Q, I) {
    function G(Z, D, Y) {
      var W = D.shift();
      if (W === "__proto__" || W === "prototype") return Z;
      if (D.length > 0) Z[W] = G(Z[W] || {}, D, Y);
      else {
        var J = Z[W];
        if (J) Y = [].concat(J).concat(Y);
        Z[W] = Y
      }
      return Z
    }
    if (typeof B !== "object") throw TypeError("dst must be an object");
    if (!Q) throw TypeError("path must be specified");
    return Q = Q.split("."), G(B, Q, I)
  };
  Object.defineProperty(SQ, "decorateRoot", {
    get: function() {
      return dj0.decorated || (dj0.decorated = new($D1()))
    }
  })
})