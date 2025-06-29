
// @from(Start 97845, End 102798)
mF = z((R3A) => {
  Object.defineProperty(R3A, "__esModule", {
    value: !0
  });
  var MU = rA(),
    Nt2 = Wx(),
    S91 = B7(),
    $Q = iH(),
    lN1 = Jx(),
    $t2 = O91();

  function qt2(A, B) {
    return $Q.getCurrentHub().captureException(A, $t2.parseEventHintOrCaptureContext(B))
  }

  function Mt2(A, B) {
    let Q = typeof B === "string" ? B : void 0,
      I = typeof B !== "string" ? {
        captureContext: B
      } : void 0;
    return $Q.getCurrentHub().captureMessage(A, Q, I)
  }

  function Lt2(A, B) {
    return $Q.getCurrentHub().captureEvent(A, B)
  }

  function Rt2(A) {
    $Q.getCurrentHub().configureScope(A)
  }

  function Ot2(A, B) {
    $Q.getCurrentHub().addBreadcrumb(A, B)
  }

  function Tt2(A, B) {
    $Q.getCurrentHub().setContext(A, B)
  }

  function Pt2(A) {
    $Q.getCurrentHub().setExtras(A)
  }

  function St2(A, B) {
    $Q.getCurrentHub().setExtra(A, B)
  }

  function _t2(A) {
    $Q.getCurrentHub().setTags(A)
  }

  function jt2(A, B) {
    $Q.getCurrentHub().setTag(A, B)
  }

  function yt2(A) {
    $Q.getCurrentHub().setUser(A)
  }

  function M3A(...A) {
    let B = $Q.getCurrentHub();
    if (A.length === 2) {
      let [Q, I] = A;
      if (!Q) return B.withScope(I);
      return B.withScope(() => {
        return B.getStackTop().scope = Q, I(Q)
      })
    }
    return B.withScope(A[0])
  }

  function kt2(A) {
    return $Q.runWithAsyncContext(() => {
      return A($Q.getIsolationScope())
    })
  }

  function xt2(A, B) {
    return M3A((Q) => {
      return Q.setSpan(A), B(Q)
    })
  }

  function ft2(A, B) {
    return $Q.getCurrentHub().startTransaction({
      ...A
    }, B)
  }

  function iN1(A, B) {
    let Q = bc(),
      I = MP();
    if (!I) S91.DEBUG_BUILD && MU.logger.warn("Cannot capture check-in. No client defined.");
    else if (!I.captureCheckIn) S91.DEBUG_BUILD && MU.logger.warn("Cannot capture check-in. Client does not support sending check-ins.");
    else return I.captureCheckIn(A, B, Q);
    return MU.uuid4()
  }

  function vt2(A, B, Q) {
    let I = iN1({
        monitorSlug: A,
        status: "in_progress"
      }, Q),
      G = MU.timestampInSeconds();

    function Z(Y) {
      iN1({
        monitorSlug: A,
        status: Y,
        checkInId: I,
        duration: MU.timestampInSeconds() - G
      })
    }
    let D;
    try {
      D = B()
    } catch (Y) {
      throw Z("error"), Y
    }
    if (MU.isThenable(D)) Promise.resolve(D).then(() => {
      Z("ok")
    }, () => {
      Z("error")
    });
    else Z("ok");
    return D
  }
  async function bt2(A) {
    let B = MP();
    if (B) return B.flush(A);
    return S91.DEBUG_BUILD && MU.logger.warn("Cannot flush events. No client defined."), Promise.resolve(!1)
  }
  async function gt2(A) {
    let B = MP();
    if (B) return B.close(A);
    return S91.DEBUG_BUILD && MU.logger.warn("Cannot flush events and disable SDK. No client defined."), Promise.resolve(!1)
  }

  function ht2() {
    return $Q.getCurrentHub().lastEventId()
  }

  function MP() {
    return $Q.getCurrentHub().getClient()
  }

  function mt2() {
    return !!MP()
  }

  function bc() {
    return $Q.getCurrentHub().getScope()
  }

  function dt2(A) {
    let B = MP(),
      Q = $Q.getIsolationScope(),
      I = bc(),
      {
        release: G,
        environment: Z = Nt2.DEFAULT_ENVIRONMENT
      } = B && B.getOptions() || {},
      {
        userAgent: D
      } = MU.GLOBAL_OBJ.navigator || {},
      Y = lN1.makeSession({
        release: G,
        environment: Z,
        user: I.getUser() || Q.getUser(),
        ...D && {
          userAgent: D
        },
        ...A
      }),
      W = Q.getSession();
    if (W && W.status === "ok") lN1.updateSession(W, {
      status: "exited"
    });
    return nN1(), Q.setSession(Y), I.setSession(Y), Y
  }

  function nN1() {
    let A = $Q.getIsolationScope(),
      B = bc(),
      Q = B.getSession() || A.getSession();
    if (Q) lN1.closeSession(Q);
    L3A(), A.setSession(), B.setSession()
  }

  function L3A() {
    let A = $Q.getIsolationScope(),
      B = bc(),
      Q = MP(),
      I = B.getSession() || A.getSession();
    if (I && Q && Q.captureSession) Q.captureSession(I)
  }

  function ut2(A = !1) {
    if (A) {
      nN1();
      return
    }
    L3A()
  }
  R3A.addBreadcrumb = Ot2;
  R3A.captureCheckIn = iN1;
  R3A.captureEvent = Lt2;
  R3A.captureException = qt2;
  R3A.captureMessage = Mt2;
  R3A.captureSession = ut2;
  R3A.close = gt2;
  R3A.configureScope = Rt2;
  R3A.endSession = nN1;
  R3A.flush = bt2;
  R3A.getClient = MP;
  R3A.getCurrentScope = bc;
  R3A.isInitialized = mt2;
  R3A.lastEventId = ht2;
  R3A.setContext = Tt2;
  R3A.setExtra = St2;
  R3A.setExtras = Pt2;
  R3A.setTag = jt2;
  R3A.setTags = _t2;
  R3A.setUser = yt2;
  R3A.startSession = dt2;
  R3A.startTransaction = ft2;
  R3A.withActiveSpan = xt2;
  R3A.withIsolationScope = kt2;
  R3A.withMonitor = vt2;
  R3A.withScope = M3A
})
// @from(Start 102804, End 102963)
Fx = z((O3A) => {
  Object.defineProperty(O3A, "__esModule", {
    value: !0
  });

  function He2(A) {
    return A.transaction
  }
  O3A.getRootSpan = He2
})
// @from(Start 102969, End 104222)
LP = z((S3A) => {
  Object.defineProperty(S3A, "__esModule", {
    value: !0
  });
  var we2 = rA(),
    Ee2 = Wx(),
    T3A = mF(),
    Ue2 = Fx(),
    aN1 = NY();

  function P3A(A, B, Q) {
    let I = B.getOptions(),
      {
        publicKey: G
      } = B.getDsn() || {},
      {
        segment: Z
      } = Q && Q.getUser() || {},
      D = we2.dropUndefinedKeys({
        environment: I.environment || Ee2.DEFAULT_ENVIRONMENT,
        release: I.release,
        user_segment: Z,
        public_key: G,
        trace_id: A
      });
    return B.emit && B.emit("createDsc", D), D
  }

  function Ne2(A) {
    let B = T3A.getClient();
    if (!B) return {};
    let Q = P3A(aN1.spanToJSON(A).trace_id || "", B, T3A.getCurrentScope()),
      I = Ue2.getRootSpan(A);
    if (!I) return Q;
    let G = I && I._frozenDynamicSamplingContext;
    if (G) return G;
    let {
      sampleRate: Z,
      source: D
    } = I.metadata;
    if (Z != null) Q.sample_rate = `${Z}`;
    let Y = aN1.spanToJSON(I);
    if (D && D !== "url") Q.transaction = Y.description;
    return Q.sampled = String(aN1.spanIsSampled(I)), B.emit && B.emit("createDsc", Q), Q
  }
  S3A.getDynamicSamplingContextFromClient = P3A;
  S3A.getDynamicSamplingContextFromSpan = Ne2
})
// @from(Start 104228, End 107298)
T91 = z((j3A) => {
  Object.defineProperty(j3A, "__esModule", {
    value: !0
  });
  var gc = rA(),
    Me2 = LP(),
    Le2 = Fx(),
    _3A = NY();

  function Re2(A, B) {
    let {
      fingerprint: Q,
      span: I,
      breadcrumbs: G,
      sdkProcessingMetadata: Z
    } = B;
    if (Te2(A, B), I) _e2(A, I);
    je2(A, Q), Pe2(A, G), Se2(A, Z)
  }

  function Oe2(A, B) {
    let {
      extra: Q,
      tags: I,
      user: G,
      contexts: Z,
      level: D,
      sdkProcessingMetadata: Y,
      breadcrumbs: W,
      fingerprint: J,
      eventProcessors: F,
      attachments: X,
      propagationContext: V,
      transactionName: C,
      span: K
    } = B;
    if (Xx(A, "extra", Q), Xx(A, "tags", I), Xx(A, "user", G), Xx(A, "contexts", Z), Xx(A, "sdkProcessingMetadata", Y), D) A.level = D;
    if (C) A.transactionName = C;
    if (K) A.span = K;
    if (W.length) A.breadcrumbs = [...A.breadcrumbs, ...W];
    if (J.length) A.fingerprint = [...A.fingerprint, ...J];
    if (F.length) A.eventProcessors = [...A.eventProcessors, ...F];
    if (X.length) A.attachments = [...A.attachments, ...X];
    A.propagationContext = {
      ...A.propagationContext,
      ...V
    }
  }

  function Xx(A, B, Q) {
    if (Q && Object.keys(Q).length) {
      A[B] = {
        ...A[B]
      };
      for (let I in Q)
        if (Object.prototype.hasOwnProperty.call(Q, I)) A[B][I] = Q[I]
    }
  }

  function Te2(A, B) {
    let {
      extra: Q,
      tags: I,
      user: G,
      contexts: Z,
      level: D,
      transactionName: Y
    } = B, W = gc.dropUndefinedKeys(Q);
    if (W && Object.keys(W).length) A.extra = {
      ...W,
      ...A.extra
    };
    let J = gc.dropUndefinedKeys(I);
    if (J && Object.keys(J).length) A.tags = {
      ...J,
      ...A.tags
    };
    let F = gc.dropUndefinedKeys(G);
    if (F && Object.keys(F).length) A.user = {
      ...F,
      ...A.user
    };
    let X = gc.dropUndefinedKeys(Z);
    if (X && Object.keys(X).length) A.contexts = {
      ...X,
      ...A.contexts
    };
    if (D) A.level = D;
    if (Y) A.transaction = Y
  }

  function Pe2(A, B) {
    let Q = [...A.breadcrumbs || [], ...B];
    A.breadcrumbs = Q.length ? Q : void 0
  }

  function Se2(A, B) {
    A.sdkProcessingMetadata = {
      ...A.sdkProcessingMetadata,
      ...B
    }
  }

  function _e2(A, B) {
    A.contexts = {
      trace: _3A.spanToTraceContext(B),
      ...A.contexts
    };
    let Q = Le2.getRootSpan(B);
    if (Q) {
      A.sdkProcessingMetadata = {
        dynamicSamplingContext: Me2.getDynamicSamplingContextFromSpan(B),
        ...A.sdkProcessingMetadata
      };
      let I = _3A.spanToJSON(Q).description;
      if (I) A.tags = {
        transaction: I,
        ...A.tags
      }
    }
  }

  function je2(A, B) {
    if (A.fingerprint = A.fingerprint ? gc.arrayify(A.fingerprint) : [], B) A.fingerprint = A.fingerprint.concat(B);
    if (A.fingerprint && !A.fingerprint.length) delete A.fingerprint
  }
  j3A.applyScopeDataToEvent = Re2;
  j3A.mergeAndOverwriteScopeData = Xx;
  j3A.mergeScopeData = Oe2
})
// @from(Start 107304, End 116116)
P91 = z((x3A) => {
  Object.defineProperty(x3A, "__esModule", {
    value: !0
  });
  var nH = rA(),
    y3A = fc(),
    fe2 = Jx(),
    ve2 = T91(),
    be2 = 100,
    _91;
  class Vx {
    constructor() {
      this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = k3A()
    }
    static clone(A) {
      return A ? A.clone() : new Vx
    }
    clone() {
      let A = new Vx;
      return A._breadcrumbs = [...this._breadcrumbs], A._tags = {
        ...this._tags
      }, A._extra = {
        ...this._extra
      }, A._contexts = {
        ...this._contexts
      }, A._user = this._user, A._level = this._level, A._span = this._span, A._session = this._session, A._transactionName = this._transactionName, A._fingerprint = this._fingerprint, A._eventProcessors = [...this._eventProcessors], A._requestSession = this._requestSession, A._attachments = [...this._attachments], A._sdkProcessingMetadata = {
        ...this._sdkProcessingMetadata
      }, A._propagationContext = {
        ...this._propagationContext
      }, A._client = this._client, A
    }
    setClient(A) {
      this._client = A
    }
    getClient() {
      return this._client
    }
    addScopeListener(A) {
      this._scopeListeners.push(A)
    }
    addEventProcessor(A) {
      return this._eventProcessors.push(A), this
    }
    setUser(A) {
      if (this._user = A || {
          email: void 0,
          id: void 0,
          ip_address: void 0,
          segment: void 0,
          username: void 0
        }, this._session) fe2.updateSession(this._session, {
        user: A
      });
      return this._notifyScopeListeners(), this
    }
    getUser() {
      return this._user
    }
    getRequestSession() {
      return this._requestSession
    }
    setRequestSession(A) {
      return this._requestSession = A, this
    }
    setTags(A) {
      return this._tags = {
        ...this._tags,
        ...A
      }, this._notifyScopeListeners(), this
    }
    setTag(A, B) {
      return this._tags = {
        ...this._tags,
        [A]: B
      }, this._notifyScopeListeners(), this
    }
    setExtras(A) {
      return this._extra = {
        ...this._extra,
        ...A
      }, this._notifyScopeListeners(), this
    }
    setExtra(A, B) {
      return this._extra = {
        ...this._extra,
        [A]: B
      }, this._notifyScopeListeners(), this
    }
    setFingerprint(A) {
      return this._fingerprint = A, this._notifyScopeListeners(), this
    }
    setLevel(A) {
      return this._level = A, this._notifyScopeListeners(), this
    }
    setTransactionName(A) {
      return this._transactionName = A, this._notifyScopeListeners(), this
    }
    setContext(A, B) {
      if (B === null) delete this._contexts[A];
      else this._contexts[A] = B;
      return this._notifyScopeListeners(), this
    }
    setSpan(A) {
      return this._span = A, this._notifyScopeListeners(), this
    }
    getSpan() {
      return this._span
    }
    getTransaction() {
      let A = this._span;
      return A && A.transaction
    }
    setSession(A) {
      if (!A) delete this._session;
      else this._session = A;
      return this._notifyScopeListeners(), this
    }
    getSession() {
      return this._session
    }
    update(A) {
      if (!A) return this;
      let B = typeof A === "function" ? A(this) : A;
      if (B instanceof Vx) {
        let Q = B.getScopeData();
        if (this._tags = {
            ...this._tags,
            ...Q.tags
          }, this._extra = {
            ...this._extra,
            ...Q.extra
          }, this._contexts = {
            ...this._contexts,
            ...Q.contexts
          }, Q.user && Object.keys(Q.user).length) this._user = Q.user;
        if (Q.level) this._level = Q.level;
        if (Q.fingerprint.length) this._fingerprint = Q.fingerprint;
        if (B.getRequestSession()) this._requestSession = B.getRequestSession();
        if (Q.propagationContext) this._propagationContext = Q.propagationContext
      } else if (nH.isPlainObject(B)) {
        let Q = A;
        if (this._tags = {
            ...this._tags,
            ...Q.tags
          }, this._extra = {
            ...this._extra,
            ...Q.extra
          }, this._contexts = {
            ...this._contexts,
            ...Q.contexts
          }, Q.user) this._user = Q.user;
        if (Q.level) this._level = Q.level;
        if (Q.fingerprint) this._fingerprint = Q.fingerprint;
        if (Q.requestSession) this._requestSession = Q.requestSession;
        if (Q.propagationContext) this._propagationContext = Q.propagationContext
      }
      return this
    }
    clear() {
      return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._requestSession = void 0, this._span = void 0, this._session = void 0, this._notifyScopeListeners(), this._attachments = [], this._propagationContext = k3A(), this
    }
    addBreadcrumb(A, B) {
      let Q = typeof B === "number" ? B : be2;
      if (Q <= 0) return this;
      let I = {
          timestamp: nH.dateTimestampInSeconds(),
          ...A
        },
        G = this._breadcrumbs;
      return G.push(I), this._breadcrumbs = G.length > Q ? G.slice(-Q) : G, this._notifyScopeListeners(), this
    }
    getLastBreadcrumb() {
      return this._breadcrumbs[this._breadcrumbs.length - 1]
    }
    clearBreadcrumbs() {
      return this._breadcrumbs = [], this._notifyScopeListeners(), this
    }
    addAttachment(A) {
      return this._attachments.push(A), this
    }
    getAttachments() {
      return this.getScopeData().attachments
    }
    clearAttachments() {
      return this._attachments = [], this
    }
    getScopeData() {
      let {
        _breadcrumbs: A,
        _attachments: B,
        _contexts: Q,
        _tags: I,
        _extra: G,
        _user: Z,
        _level: D,
        _fingerprint: Y,
        _eventProcessors: W,
        _propagationContext: J,
        _sdkProcessingMetadata: F,
        _transactionName: X,
        _span: V
      } = this;
      return {
        breadcrumbs: A,
        attachments: B,
        contexts: Q,
        tags: I,
        extra: G,
        user: Z,
        level: D,
        fingerprint: Y || [],
        eventProcessors: W,
        propagationContext: J,
        sdkProcessingMetadata: F,
        transactionName: X,
        span: V
      }
    }
    applyToEvent(A, B = {}, Q = []) {
      ve2.applyScopeDataToEvent(A, this.getScopeData());
      let I = [...Q, ...y3A.getGlobalEventProcessors(), ...this._eventProcessors];
      return y3A.notifyEventProcessors(I, A, B)
    }
    setSDKProcessingMetadata(A) {
      return this._sdkProcessingMetadata = {
        ...this._sdkProcessingMetadata,
        ...A
      }, this
    }
    setPropagationContext(A) {
      return this._propagationContext = A, this
    }
    getPropagationContext() {
      return this._propagationContext
    }
    captureException(A, B) {
      let Q = B && B.event_id ? B.event_id : nH.uuid4();
      if (!this._client) return nH.logger.warn("No client configured on scope - will not capture exception!"), Q;
      let I = new Error("Sentry syntheticException");
      return this._client.captureException(A, {
        originalException: A,
        syntheticException: I,
        ...B,
        event_id: Q
      }, this), Q
    }
    captureMessage(A, B, Q) {
      let I = Q && Q.event_id ? Q.event_id : nH.uuid4();
      if (!this._client) return nH.logger.warn("No client configured on scope - will not capture message!"), I;
      let G = new Error(A);
      return this._client.captureMessage(A, B, {
        originalException: A,
        syntheticException: G,
        ...Q,
        event_id: I
      }, this), I
    }
    captureEvent(A, B) {
      let Q = B && B.event_id ? B.event_id : nH.uuid4();
      if (!this._client) return nH.logger.warn("No client configured on scope - will not capture event!"), Q;
      return this._client.captureEvent(A, {
        ...B,
        event_id: Q
      }, this), Q
    }
    _notifyScopeListeners() {
      if (!this._notifyingListeners) this._notifyingListeners = !0, this._scopeListeners.forEach((A) => {
        A(this)
      }), this._notifyingListeners = !1
    }
  }

  function ge2() {
    if (!_91) _91 = new Vx;
    return _91
  }

  function he2(A) {
    _91 = A
  }

  function k3A() {
    return {
      traceId: nH.uuid4(),
      spanId: nH.uuid4().substring(16)
    }
  }
  x3A.Scope = Vx;
  x3A.getGlobalScope = ge2;
  x3A.setGlobalScope = he2
})
// @from(Start 116122, End 116255)
j91 = z((f3A) => {
  Object.defineProperty(f3A, "__esModule", {
    value: !0
  });
  var pe2 = "7.120.3";
  f3A.SDK_VERSION = pe2
})
// @from(Start 116261, End 124314)
iH = z((m3A) => {
  Object.defineProperty(m3A, "__esModule", {
    value: !0
  });
  var ND = rA(),
    le2 = Wx(),
    sN1 = B7(),
    v3A = P91(),
    rN1 = Jx(),
    ie2 = j91(),
    y91 = parseFloat(ie2.SDK_VERSION),
    ne2 = 100;
  class mc {
    constructor(A, B, Q, I = y91) {
      this._version = I;
      let G;
      if (!B) G = new v3A.Scope, G.setClient(A);
      else G = B;
      let Z;
      if (!Q) Z = new v3A.Scope, Z.setClient(A);
      else Z = Q;
      if (this._stack = [{
          scope: G
        }], A) this.bindClient(A);
      this._isolationScope = Z
    }
    isOlderThan(A) {
      return this._version < A
    }
    bindClient(A) {
      let B = this.getStackTop();
      if (B.client = A, B.scope.setClient(A), A && A.setupIntegrations) A.setupIntegrations()
    }
    pushScope() {
      let A = this.getScope().clone();
      return this.getStack().push({
        client: this.getClient(),
        scope: A
      }), A
    }
    popScope() {
      if (this.getStack().length <= 1) return !1;
      return !!this.getStack().pop()
    }
    withScope(A) {
      let B = this.pushScope(),
        Q;
      try {
        Q = A(B)
      } catch (I) {
        throw this.popScope(), I
      }
      if (ND.isThenable(Q)) return Q.then((I) => {
        return this.popScope(), I
      }, (I) => {
        throw this.popScope(), I
      });
      return this.popScope(), Q
    }
    getClient() {
      return this.getStackTop().client
    }
    getScope() {
      return this.getStackTop().scope
    }
    getIsolationScope() {
      return this._isolationScope
    }
    getStack() {
      return this._stack
    }
    getStackTop() {
      return this._stack[this._stack.length - 1]
    }
    captureException(A, B) {
      let Q = this._lastEventId = B && B.event_id ? B.event_id : ND.uuid4(),
        I = new Error("Sentry syntheticException");
      return this.getScope().captureException(A, {
        originalException: A,
        syntheticException: I,
        ...B,
        event_id: Q
      }), Q
    }
    captureMessage(A, B, Q) {
      let I = this._lastEventId = Q && Q.event_id ? Q.event_id : ND.uuid4(),
        G = new Error(A);
      return this.getScope().captureMessage(A, B, {
        originalException: A,
        syntheticException: G,
        ...Q,
        event_id: I
      }), I
    }
    captureEvent(A, B) {
      let Q = B && B.event_id ? B.event_id : ND.uuid4();
      if (!A.type) this._lastEventId = Q;
      return this.getScope().captureEvent(A, {
        ...B,
        event_id: Q
      }), Q
    }
    lastEventId() {
      return this._lastEventId
    }
    addBreadcrumb(A, B) {
      let {
        scope: Q,
        client: I
      } = this.getStackTop();
      if (!I) return;
      let {
        beforeBreadcrumb: G = null,
        maxBreadcrumbs: Z = ne2
      } = I.getOptions && I.getOptions() || {};
      if (Z <= 0) return;
      let Y = {
          timestamp: ND.dateTimestampInSeconds(),
          ...A
        },
        W = G ? ND.consoleSandbox(() => G(Y, B)) : Y;
      if (W === null) return;
      if (I.emit) I.emit("beforeAddBreadcrumb", W, B);
      Q.addBreadcrumb(W, Z)
    }
    setUser(A) {
      this.getScope().setUser(A), this.getIsolationScope().setUser(A)
    }
    setTags(A) {
      this.getScope().setTags(A), this.getIsolationScope().setTags(A)
    }
    setExtras(A) {
      this.getScope().setExtras(A), this.getIsolationScope().setExtras(A)
    }
    setTag(A, B) {
      this.getScope().setTag(A, B), this.getIsolationScope().setTag(A, B)
    }
    setExtra(A, B) {
      this.getScope().setExtra(A, B), this.getIsolationScope().setExtra(A, B)
    }
    setContext(A, B) {
      this.getScope().setContext(A, B), this.getIsolationScope().setContext(A, B)
    }
    configureScope(A) {
      let {
        scope: B,
        client: Q
      } = this.getStackTop();
      if (Q) A(B)
    }
    run(A) {
      let B = oN1(this);
      try {
        A(this)
      } finally {
        oN1(B)
      }
    }
    getIntegration(A) {
      let B = this.getClient();
      if (!B) return null;
      try {
        return B.getIntegration(A)
      } catch (Q) {
        return sN1.DEBUG_BUILD && ND.logger.warn(`Cannot retrieve integration ${A.id} from the current Hub`), null
      }
    }
    startTransaction(A, B) {
      let Q = this._callExtensionMethod("startTransaction", A, B);
      if (sN1.DEBUG_BUILD && !Q)
        if (!this.getClient()) ND.logger.warn("Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'");
        else ND.logger.warn(`Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`);
      return Q
    }
    traceHeaders() {
      return this._callExtensionMethod("traceHeaders")
    }
    captureSession(A = !1) {
      if (A) return this.endSession();
      this._sendSessionUpdate()
    }
    endSession() {
      let B = this.getStackTop().scope,
        Q = B.getSession();
      if (Q) rN1.closeSession(Q);
      this._sendSessionUpdate(), B.setSession()
    }
    startSession(A) {
      let {
        scope: B,
        client: Q
      } = this.getStackTop(), {
        release: I,
        environment: G = le2.DEFAULT_ENVIRONMENT
      } = Q && Q.getOptions() || {}, {
        userAgent: Z
      } = ND.GLOBAL_OBJ.navigator || {}, D = rN1.makeSession({
        release: I,
        environment: G,
        user: B.getUser(),
        ...Z && {
          userAgent: Z
        },
        ...A
      }), Y = B.getSession && B.getSession();
      if (Y && Y.status === "ok") rN1.updateSession(Y, {
        status: "exited"
      });
      return this.endSession(), B.setSession(D), D
    }
    shouldSendDefaultPii() {
      let A = this.getClient(),
        B = A && A.getOptions();
      return Boolean(B && B.sendDefaultPii)
    }
    _sendSessionUpdate() {
      let {
        scope: A,
        client: B
      } = this.getStackTop(), Q = A.getSession();
      if (Q && B && B.captureSession) B.captureSession(Q)
    }
    _callExtensionMethod(A, ...B) {
      let I = RP().__SENTRY__;
      if (I && I.extensions && typeof I.extensions[A] === "function") return I.extensions[A].apply(this, B);
      sN1.DEBUG_BUILD && ND.logger.warn(`Extension method ${A} couldn't be found, doing nothing.`)
    }
  }

  function RP() {
    return ND.GLOBAL_OBJ.__SENTRY__ = ND.GLOBAL_OBJ.__SENTRY__ || {
      extensions: {},
      hub: void 0
    }, ND.GLOBAL_OBJ
  }

  function oN1(A) {
    let B = RP(),
      Q = hc(B);
    return k91(B, A), Q
  }

  function b3A() {
    let A = RP();
    if (A.__SENTRY__ && A.__SENTRY__.acs) {
      let B = A.__SENTRY__.acs.getCurrentHub();
      if (B) return B
    }
    return g3A(A)
  }

  function ae2() {
    return b3A().getIsolationScope()
  }

  function g3A(A = RP()) {
    if (!h3A(A) || hc(A).isOlderThan(y91)) k91(A, new mc);
    return hc(A)
  }

  function se2(A, B = g3A()) {
    if (!h3A(A) || hc(A).isOlderThan(y91)) {
      let Q = B.getClient(),
        I = B.getScope(),
        G = B.getIsolationScope();
      k91(A, new mc(Q, I.clone(), G.clone()))
    }
  }

  function re2(A) {
    let B = RP();
    B.__SENTRY__ = B.__SENTRY__ || {}, B.__SENTRY__.acs = A
  }

  function oe2(A, B = {}) {
    let Q = RP();
    if (Q.__SENTRY__ && Q.__SENTRY__.acs) return Q.__SENTRY__.acs.runWithAsyncContext(A, B);
    return A()
  }

  function h3A(A) {
    return !!(A && A.__SENTRY__ && A.__SENTRY__.hub)
  }

  function hc(A) {
    return ND.getGlobalSingleton("hub", () => new mc, A)
  }

  function k91(A, B) {
    if (!A) return !1;
    let Q = A.__SENTRY__ = A.__SENTRY__ || {};
    return Q.hub = B, !0
  }
  m3A.API_VERSION = y91;
  m3A.Hub = mc;
  m3A.ensureHubOnCarrier = se2;
  m3A.getCurrentHub = b3A;
  m3A.getHubFromCarrier = hc;
  m3A.getIsolationScope = ae2;
  m3A.getMainCarrier = RP;
  m3A.makeMain = oN1;
  m3A.runWithAsyncContext = oe2;
  m3A.setAsyncContextStrategy = re2;
  m3A.setHubOnCarrier = k91
})
// @from(Start 124320, End 124703)
x91 = z((u3A) => {
  Object.defineProperty(u3A, "__esModule", {
    value: !0
  });
  var d3A = rA(),
    J19 = iH();

  function F19(A) {
    return (A || J19.getCurrentHub()).getScope().getTransaction()
  }
  var X19 = d3A.extractTraceparentData;
  u3A.stripUrlQueryAndFragment = d3A.stripUrlQueryAndFragment;
  u3A.extractTraceparentData = X19;
  u3A.getActiveTransaction = F19
})
// @from(Start 124709, End 125314)
f91 = z((c3A) => {
  Object.defineProperty(c3A, "__esModule", {
    value: !0
  });
  var tN1 = rA(),
    H19 = B7(),
    z19 = x91(),
    p3A = !1;

  function w19() {
    if (p3A) return;
    p3A = !0, tN1.addGlobalErrorInstrumentationHandler(eN1), tN1.addGlobalUnhandledRejectionInstrumentationHandler(eN1)
  }

  function eN1() {
    let A = z19.getActiveTransaction();
    if (A) H19.DEBUG_BUILD && tN1.logger.log("[Tracing] Transaction: internal_error -> Global error occured"), A.setStatus("internal_error")
  }
  eN1.tag = "sentry_tracingErrorCallback";
  c3A.registerErrorInstrumentation = w19
})
// @from(Start 125320, End 127408)
Cx = z((l3A) => {
  Object.defineProperty(l3A, "__esModule", {
    value: !0
  });
  l3A.SpanStatus = void 0;
  (function(A) {
    A.Ok = "ok";
    let Q = "deadline_exceeded";
    A.DeadlineExceeded = Q;
    let I = "unauthenticated";
    A.Unauthenticated = I;
    let G = "permission_denied";
    A.PermissionDenied = G;
    let Z = "not_found";
    A.NotFound = Z;
    let D = "resource_exhausted";
    A.ResourceExhausted = D;
    let Y = "invalid_argument";
    A.InvalidArgument = Y;
    let W = "unimplemented";
    A.Unimplemented = W;
    let J = "unavailable";
    A.Unavailable = J;
    let F = "internal_error";
    A.InternalError = F;
    let X = "unknown_error";
    A.UnknownError = X;
    let V = "cancelled";
    A.Cancelled = V;
    let C = "already_exists";
    A.AlreadyExists = C;
    let K = "failed_precondition";
    A.FailedPrecondition = K;
    let E = "aborted";
    A.Aborted = E;
    let N = "out_of_range";
    A.OutOfRange = N;
    let q = "data_loss";
    A.DataLoss = q
  })(l3A.SpanStatus || (l3A.SpanStatus = {}));

  function B$1(A) {
    if (A < 400 && A >= 100) return "ok";
    if (A >= 400 && A < 500) switch (A) {
      case 401:
        return "unauthenticated";
      case 403:
        return "permission_denied";
      case 404:
        return "not_found";
      case 409:
        return "already_exists";
      case 413:
        return "failed_precondition";
      case 429:
        return "resource_exhausted";
      default:
        return "invalid_argument"
    }
    if (A >= 500 && A < 600) switch (A) {
      case 501:
        return "unimplemented";
      case 503:
        return "unavailable";
      case 504:
        return "deadline_exceeded";
      default:
        return "internal_error"
    }
    return "unknown_error"
  }
  var U19 = B$1;

  function N19(A, B) {
    A.setTag("http.status_code", String(B)), A.setData("http.response.status_code", B);
    let Q = B$1(B);
    if (Q !== "unknown_error") A.setStatus(Q)
  }
  l3A.getSpanStatusFromHttpCode = B$1;
  l3A.setHttpStatus = N19;
  l3A.spanStatusfromHttpCode = U19
})
// @from(Start 127414, End 127869)
Q$1 = z((i3A) => {
  Object.defineProperty(i3A, "__esModule", {
    value: !0
  });
  var L19 = rA();

  function R19(A, B, Q = () => {}) {
    let I;
    try {
      I = A()
    } catch (G) {
      throw B(G), Q(), G
    }
    return O19(I, B, Q)
  }

  function O19(A, B, Q) {
    if (L19.isThenable(A)) return A.then((I) => {
      return Q(), I
    }, (I) => {
      throw B(I), Q(), I
    });
    return Q(), A
  }
  i3A.handleCallbackErrors = R19
})
// @from(Start 127875, End 128273)
v91 = z((n3A) => {
  Object.defineProperty(n3A, "__esModule", {
    value: !0
  });
  var P19 = mF();

  function S19(A) {
    if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) return !1;
    let B = P19.getClient(),
      Q = A || B && B.getOptions();
    return !!Q && (Q.enableTracing || ("tracesSampleRate" in Q) || ("tracesSampler" in Q))
  }
  n3A.hasTracingEnabled = S19
})
// @from(Start 128279, End 133220)
m91 = z((e3A) => {
  Object.defineProperty(e3A, "__esModule", {
    value: !0
  });
  var dc = rA(),
    j19 = B7(),
    AM = iH(),
    b91 = NY();
  f91();
  Cx();
  var y19 = LP(),
    Kx = mF(),
    I$1 = Q$1(),
    a3A = v91();

  function k19(A, B, Q = () => {}, I = () => {}) {
    let G = AM.getCurrentHub(),
      Z = Kx.getCurrentScope(),
      D = Z.getSpan(),
      Y = h91(A),
      W = g91(G, {
        parentSpan: D,
        spanContext: Y,
        forceTransaction: !1,
        scope: Z
      });
    return Z.setSpan(W), I$1.handleCallbackErrors(() => B(W), (J) => {
      W && W.setStatus("internal_error"), Q(J, W)
    }, () => {
      W && W.end(), Z.setSpan(D), I()
    })
  }

  function s3A(A, B) {
    let Q = h91(A);
    return AM.runWithAsyncContext(() => {
      return Kx.withScope(A.scope, (I) => {
        let G = AM.getCurrentHub(),
          Z = I.getSpan(),
          Y = A.onlyIfParent && !Z ? void 0 : g91(G, {
            parentSpan: Z,
            spanContext: Q,
            forceTransaction: A.forceTransaction,
            scope: I
          });
        return I$1.handleCallbackErrors(() => B(Y), () => {
          if (Y) {
            let {
              status: W
            } = b91.spanToJSON(Y);
            if (!W || W === "ok") Y.setStatus("internal_error")
          }
        }, () => Y && Y.end())
      })
    })
  }
  var x19 = s3A;

  function f19(A, B) {
    let Q = h91(A);
    return AM.runWithAsyncContext(() => {
      return Kx.withScope(A.scope, (I) => {
        let G = AM.getCurrentHub(),
          Z = I.getSpan(),
          Y = A.onlyIfParent && !Z ? void 0 : g91(G, {
            parentSpan: Z,
            spanContext: Q,
            forceTransaction: A.forceTransaction,
            scope: I
          });

        function W() {
          Y && Y.end()
        }
        return I$1.handleCallbackErrors(() => B(Y, W), () => {
          if (Y && Y.isRecording()) {
            let {
              status: J
            } = b91.spanToJSON(Y);
            if (!J || J === "ok") Y.setStatus("internal_error")
          }
        })
      })
    })
  }

  function v19(A) {
    if (!a3A.hasTracingEnabled()) return;
    let B = h91(A),
      Q = AM.getCurrentHub(),
      I = A.scope ? A.scope.getSpan() : r3A();
    if (A.onlyIfParent && !I) return;
    let D = (A.scope || Kx.getCurrentScope()).clone();
    return g91(Q, {
      parentSpan: I,
      spanContext: B,
      forceTransaction: A.forceTransaction,
      scope: D
    })
  }

  function r3A() {
    return Kx.getCurrentScope().getSpan()
  }
  var b19 = ({
    sentryTrace: A,
    baggage: B
  }, Q) => {
    let I = Kx.getCurrentScope(),
      {
        traceparentData: G,
        dynamicSamplingContext: Z,
        propagationContext: D
      } = dc.tracingContextFromHeaders(A, B);
    if (I.setPropagationContext(D), j19.DEBUG_BUILD && G) dc.logger.log(`[Tracing] Continuing trace ${G.traceId}.`);
    let Y = {
      ...G,
      metadata: dc.dropUndefinedKeys({
        dynamicSamplingContext: Z
      })
    };
    if (!Q) return Y;
    return AM.runWithAsyncContext(() => {
      return Q(Y)
    })
  };

  function g91(A, {
    parentSpan: B,
    spanContext: Q,
    forceTransaction: I,
    scope: G
  }) {
    if (!a3A.hasTracingEnabled()) return;
    let Z = AM.getIsolationScope(),
      D;
    if (B && !I) D = B.startChild(Q);
    else if (B) {
      let Y = y19.getDynamicSamplingContextFromSpan(B),
        {
          traceId: W,
          spanId: J
        } = B.spanContext(),
        F = b91.spanIsSampled(B);
      D = A.startTransaction({
        traceId: W,
        parentSpanId: J,
        parentSampled: F,
        ...Q,
        metadata: {
          dynamicSamplingContext: Y,
          ...Q.metadata
        }
      })
    } else {
      let {
        traceId: Y,
        dsc: W,
        parentSpanId: J,
        sampled: F
      } = {
        ...Z.getPropagationContext(),
        ...G.getPropagationContext()
      };
      D = A.startTransaction({
        traceId: Y,
        parentSpanId: J,
        parentSampled: F,
        ...Q,
        metadata: {
          dynamicSamplingContext: W,
          ...Q.metadata
        }
      })
    }
    return G.setSpan(D), g19(D, G, Z), D
  }

  function h91(A) {
    if (A.startTime) {
      let B = {
        ...A
      };
      return B.startTimestamp = b91.spanTimeInputToSeconds(A.startTime), delete B.startTime, B
    }
    return A
  }
  var o3A = "_sentryScope",
    t3A = "_sentryIsolationScope";

  function g19(A, B, Q) {
    if (A) dc.addNonEnumerableProperty(A, t3A, Q), dc.addNonEnumerableProperty(A, o3A, B)
  }

  function h19(A) {
    return {
      scope: A[o3A],
      isolationScope: A[t3A]
    }
  }
  e3A.continueTrace = b19;
  e3A.getActiveSpan = r3A;
  e3A.getCapturedScopesOnSpan = h19;
  e3A.startActiveSpan = x19;
  e3A.startInactiveSpan = v19;
  e3A.startSpan = s3A;
  e3A.startSpanManual = f19;
  e3A.trace = k19
})
// @from(Start 133226, End 134302)
pc = z((BQA) => {
  Object.defineProperty(BQA, "__esModule", {
    value: !0
  });
  var a19 = rA();
  B7();
  f91();
  Cx();
  var s19 = m91(),
    uc;

  function AQA(A) {
    return uc ? uc.get(A) : void 0
  }

  function r19(A) {
    let B = AQA(A);
    if (!B) return;
    let Q = {};
    for (let [, [I, G]] of B) {
      if (!Q[I]) Q[I] = [];
      Q[I].push(a19.dropUndefinedKeys(G))
    }
    return Q
  }

  function o19(A, B, Q, I, G, Z) {
    let D = s19.getActiveSpan();
    if (D) {
      let Y = AQA(D) || new Map,
        W = `${A}:${B}@${I}`,
        J = Y.get(Z);
      if (J) {
        let [, F] = J;
        Y.set(Z, [W, {
          min: Math.min(F.min, Q),
          max: Math.max(F.max, Q),
          count: F.count += 1,
          sum: F.sum += Q,
          tags: F.tags
        }])
      } else Y.set(Z, [W, {
        min: Q,
        max: Q,
        count: 1,
        sum: Q,
        tags: G
      }]);
      if (!uc) uc = new WeakMap;
      uc.set(D, Y)
    }
  }
  BQA.getMetricSummaryJsonForSpan = r19;
  BQA.updateMetricSummaryOnActiveSpan = o19
})
// @from(Start 134308, End 134755)
cc = z((QQA) => {
  Object.defineProperty(QQA, "__esModule", {
    value: !0
  });
  var AA9 = "sentry.source",
    BA9 = "sentry.sample_rate",
    QA9 = "sentry.op",
    IA9 = "sentry.origin",
    GA9 = "profile_id";
  QQA.SEMANTIC_ATTRIBUTE_PROFILE_ID = GA9;
  QQA.SEMANTIC_ATTRIBUTE_SENTRY_OP = QA9;
  QQA.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = IA9;
  QQA.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = BA9;
  QQA.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = AA9
})
// @from(Start 134761, End 141832)
d91 = z((DQA) => {
  Object.defineProperty(DQA, "__esModule", {
    value: !0
  });
  var OP = rA(),
    IQA = B7(),
    FA9 = pc(),
    LU = cc(),
    GQA = Fx(),
    Hx = NY(),
    XA9 = Cx();
  class ZQA {
    constructor(A = 1000) {
      this._maxlen = A, this.spans = []
    }
    add(A) {
      if (this.spans.length > this._maxlen) A.spanRecorder = void 0;
      else this.spans.push(A)
    }
  }
  class G$1 {
    constructor(A = {}) {
      if (this._traceId = A.traceId || OP.uuid4(), this._spanId = A.spanId || OP.uuid4().substring(16), this._startTime = A.startTimestamp || OP.timestampInSeconds(), this.tags = A.tags ? {
          ...A.tags
        } : {}, this.data = A.data ? {
          ...A.data
        } : {}, this.instrumenter = A.instrumenter || "sentry", this._attributes = {}, this.setAttributes({
          [LU.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: A.origin || "manual",
          [LU.SEMANTIC_ATTRIBUTE_SENTRY_OP]: A.op,
          ...A.attributes
        }), this._name = A.name || A.description, A.parentSpanId) this._parentSpanId = A.parentSpanId;
      if ("sampled" in A) this._sampled = A.sampled;
      if (A.status) this._status = A.status;
      if (A.endTimestamp) this._endTime = A.endTimestamp;
      if (A.exclusiveTime !== void 0) this._exclusiveTime = A.exclusiveTime;
      this._measurements = A.measurements ? {
        ...A.measurements
      } : {}
    }
    get name() {
      return this._name || ""
    }
    set name(A) {
      this.updateName(A)
    }
    get description() {
      return this._name
    }
    set description(A) {
      this._name = A
    }
    get traceId() {
      return this._traceId
    }
    set traceId(A) {
      this._traceId = A
    }
    get spanId() {
      return this._spanId
    }
    set spanId(A) {
      this._spanId = A
    }
    set parentSpanId(A) {
      this._parentSpanId = A
    }
    get parentSpanId() {
      return this._parentSpanId
    }
    get sampled() {
      return this._sampled
    }
    set sampled(A) {
      this._sampled = A
    }
    get attributes() {
      return this._attributes
    }
    set attributes(A) {
      this._attributes = A
    }
    get startTimestamp() {
      return this._startTime
    }
    set startTimestamp(A) {
      this._startTime = A
    }
    get endTimestamp() {
      return this._endTime
    }
    set endTimestamp(A) {
      this._endTime = A
    }
    get status() {
      return this._status
    }
    set status(A) {
      this._status = A
    }
    get op() {
      return this._attributes[LU.SEMANTIC_ATTRIBUTE_SENTRY_OP]
    }
    set op(A) {
      this.setAttribute(LU.SEMANTIC_ATTRIBUTE_SENTRY_OP, A)
    }
    get origin() {
      return this._attributes[LU.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]
    }
    set origin(A) {
      this.setAttribute(LU.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, A)
    }
    spanContext() {
      let {
        _spanId: A,
        _traceId: B,
        _sampled: Q
      } = this;
      return {
        spanId: A,
        traceId: B,
        traceFlags: Q ? Hx.TRACE_FLAG_SAMPLED : Hx.TRACE_FLAG_NONE
      }
    }
    startChild(A) {
      let B = new G$1({
        ...A,
        parentSpanId: this._spanId,
        sampled: this._sampled,
        traceId: this._traceId
      });
      if (B.spanRecorder = this.spanRecorder, B.spanRecorder) B.spanRecorder.add(B);
      let Q = GQA.getRootSpan(this);
      if (B.transaction = Q, IQA.DEBUG_BUILD && Q) {
        let I = A && A.op || "< unknown op >",
          G = Hx.spanToJSON(B).description || "< unknown name >",
          Z = Q.spanContext().spanId,
          D = `[Tracing] Starting '${I}' span on transaction '${G}' (${Z}).`;
        OP.logger.log(D), this._logMessage = D
      }
      return B
    }
    setTag(A, B) {
      return this.tags = {
        ...this.tags,
        [A]: B
      }, this
    }
    setData(A, B) {
      return this.data = {
        ...this.data,
        [A]: B
      }, this
    }
    setAttribute(A, B) {
      if (B === void 0) delete this._attributes[A];
      else this._attributes[A] = B
    }
    setAttributes(A) {
      Object.keys(A).forEach((B) => this.setAttribute(B, A[B]))
    }
    setStatus(A) {
      return this._status = A, this
    }
    setHttpStatus(A) {
      return XA9.setHttpStatus(this, A), this
    }
    setName(A) {
      this.updateName(A)
    }
    updateName(A) {
      return this._name = A, this
    }
    isSuccess() {
      return this._status === "ok"
    }
    finish(A) {
      return this.end(A)
    }
    end(A) {
      if (this._endTime) return;
      let B = GQA.getRootSpan(this);
      if (IQA.DEBUG_BUILD && B && B.spanContext().spanId !== this._spanId) {
        let Q = this._logMessage;
        if (Q) OP.logger.log(Q.replace("Starting", "Finishing"))
      }
      this._endTime = Hx.spanTimeInputToSeconds(A)
    }
    toTraceparent() {
      return Hx.spanToTraceHeader(this)
    }
    toContext() {
      return OP.dropUndefinedKeys({
        data: this._getData(),
        description: this._name,
        endTimestamp: this._endTime,
        op: this.op,
        parentSpanId: this._parentSpanId,
        sampled: this._sampled,
        spanId: this._spanId,
        startTimestamp: this._startTime,
        status: this._status,
        tags: this.tags,
        traceId: this._traceId
      })
    }
    updateWithContext(A) {
      return this.data = A.data || {}, this._name = A.name || A.description, this._endTime = A.endTimestamp, this.op = A.op, this._parentSpanId = A.parentSpanId, this._sampled = A.sampled, this._spanId = A.spanId || this._spanId, this._startTime = A.startTimestamp || this._startTime, this._status = A.status, this.tags = A.tags || {}, this._traceId = A.traceId || this._traceId, this
    }
    getTraceContext() {
      return Hx.spanToTraceContext(this)
    }
    getSpanJSON() {
      return OP.dropUndefinedKeys({
        data: this._getData(),
        description: this._name,
        op: this._attributes[LU.SEMANTIC_ATTRIBUTE_SENTRY_OP],
        parent_span_id: this._parentSpanId,
        span_id: this._spanId,
        start_timestamp: this._startTime,
        status: this._status,
        tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
        timestamp: this._endTime,
        trace_id: this._traceId,
        origin: this._attributes[LU.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
        _metrics_summary: FA9.getMetricSummaryJsonForSpan(this),
        profile_id: this._attributes[LU.SEMANTIC_ATTRIBUTE_PROFILE_ID],
        exclusive_time: this._exclusiveTime,
        measurements: Object.keys(this._measurements).length > 0 ? this._measurements : void 0
      })
    }
    isRecording() {
      return !this._endTime && !!this._sampled
    }
    toJSON() {
      return this.getSpanJSON()
    }
    _getData() {
      let {
        data: A,
        _attributes: B
      } = this, Q = Object.keys(A).length > 0, I = Object.keys(B).length > 0;
      if (!Q && !I) return;
      if (Q && I) return {
        ...A,
        ...B
      };
      return Q ? A : B
    }
  }
  DQA.Span = G$1;
  DQA.SpanRecorder = ZQA
})
// @from(Start 141838, End 146672)
c91 = z((FQA) => {
  Object.defineProperty(FQA, "__esModule", {
    value: !0
  });
  var zx = rA(),
    u91 = B7(),
    KA9 = iH(),
    HA9 = pc(),
    lc = cc(),
    p91 = NY(),
    YQA = LP(),
    WQA = d91(),
    zA9 = m91();
  class JQA extends WQA.Span {
    constructor(A, B) {
      super(A);
      this._contexts = {}, this._hub = B || KA9.getCurrentHub(), this._name = A.name || "", this._metadata = {
        ...A.metadata
      }, this._trimEnd = A.trimEnd, this.transaction = this;
      let Q = this._metadata.dynamicSamplingContext;
      if (Q) this._frozenDynamicSamplingContext = {
        ...Q
      }
    }
    get name() {
      return this._name
    }
    set name(A) {
      this.setName(A)
    }
    get metadata() {
      return {
        source: "custom",
        spanMetadata: {},
        ...this._metadata,
        ...this._attributes[lc.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] && {
          source: this._attributes[lc.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]
        },
        ...this._attributes[lc.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE] && {
          sampleRate: this._attributes[lc.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]
        }
      }
    }
    set metadata(A) {
      this._metadata = A
    }
    setName(A, B = "custom") {
      this._name = A, this.setAttribute(lc.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, B)
    }
    updateName(A) {
      return this._name = A, this
    }
    initSpanRecorder(A = 1000) {
      if (!this.spanRecorder) this.spanRecorder = new WQA.SpanRecorder(A);
      this.spanRecorder.add(this)
    }
    setContext(A, B) {
      if (B === null) delete this._contexts[A];
      else this._contexts[A] = B
    }
    setMeasurement(A, B, Q = "") {
      this._measurements[A] = {
        value: B,
        unit: Q
      }
    }
    setMetadata(A) {
      this._metadata = {
        ...this._metadata,
        ...A
      }
    }
    end(A) {
      let B = p91.spanTimeInputToSeconds(A),
        Q = this._finishTransaction(B);
      if (!Q) return;
      return this._hub.captureEvent(Q)
    }
    toContext() {
      let A = super.toContext();
      return zx.dropUndefinedKeys({
        ...A,
        name: this._name,
        trimEnd: this._trimEnd
      })
    }
    updateWithContext(A) {
      return super.updateWithContext(A), this._name = A.name || "", this._trimEnd = A.trimEnd, this
    }
    getDynamicSamplingContext() {
      return YQA.getDynamicSamplingContextFromSpan(this)
    }
    setHub(A) {
      this._hub = A
    }
    getProfileId() {
      if (this._contexts !== void 0 && this._contexts.profile !== void 0) return this._contexts.profile.profile_id;
      return
    }
    _finishTransaction(A) {
      if (this._endTime !== void 0) return;
      if (!this._name) u91.DEBUG_BUILD && zx.logger.warn("Transaction has no name, falling back to `<unlabeled transaction>`."), this._name = "<unlabeled transaction>";
      super.end(A);
      let B = this._hub.getClient();
      if (B && B.emit) B.emit("finishTransaction", this);
      if (this._sampled !== !0) {
        if (u91.DEBUG_BUILD && zx.logger.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."), B) B.recordDroppedEvent("sample_rate", "transaction");
        return
      }
      let Q = this.spanRecorder ? this.spanRecorder.spans.filter((J) => J !== this && p91.spanToJSON(J).timestamp) : [];
      if (this._trimEnd && Q.length > 0) {
        let J = Q.map((F) => p91.spanToJSON(F).timestamp).filter(Boolean);
        this._endTime = J.reduce((F, X) => {
          return F > X ? F : X
        })
      }
      let {
        scope: I,
        isolationScope: G
      } = zA9.getCapturedScopesOnSpan(this), {
        metadata: Z
      } = this, {
        source: D
      } = Z, Y = {
        contexts: {
          ...this._contexts,
          trace: p91.spanToTraceContext(this)
        },
        spans: Q,
        start_timestamp: this._startTime,
        tags: this.tags,
        timestamp: this._endTime,
        transaction: this._name,
        type: "transaction",
        sdkProcessingMetadata: {
          ...Z,
          capturedSpanScope: I,
          capturedSpanIsolationScope: G,
          ...zx.dropUndefinedKeys({
            dynamicSamplingContext: YQA.getDynamicSamplingContextFromSpan(this)
          })
        },
        _metrics_summary: HA9.getMetricSummaryJsonForSpan(this),
        ...D && {
          transaction_info: {
            source: D
          }
        }
      };
      if (Object.keys(this._measurements).length > 0) u91.DEBUG_BUILD && zx.logger.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)), Y.measurements = this._measurements;
      return u91.DEBUG_BUILD && zx.logger.log(`[Tracing] Finishing ${this.op} transaction: ${this._name}.`), Y
    }
  }
  FQA.Transaction = JQA
})
// @from(Start 146678, End 153342)
D$1 = z((VQA) => {
  Object.defineProperty(VQA, "__esModule", {
    value: !0
  });
  var VZ = rA(),
    $Y = B7(),
    l91 = NY(),
    EA9 = d91(),
    UA9 = c91(),
    i91 = {
      idleTimeout: 1000,
      finalTimeout: 30000,
      heartbeatInterval: 5000
    },
    NA9 = "finishReason",
    wx = ["heartbeatFailed", "idleTimeout", "documentHidden", "finalTimeout", "externalFinish", "cancelled"];
  class Z$1 extends EA9.SpanRecorder {
    constructor(A, B, Q, I) {
      super(I);
      this._pushActivity = A, this._popActivity = B, this.transactionSpanId = Q
    }
    add(A) {
      if (A.spanContext().spanId !== this.transactionSpanId) {
        let B = A.end;
        if (A.end = (...Q) => {
            return this._popActivity(A.spanContext().spanId), B.apply(A, Q)
          }, l91.spanToJSON(A).timestamp === void 0) this._pushActivity(A.spanContext().spanId)
      }
      super.add(A)
    }
  }
  class XQA extends UA9.Transaction {
    constructor(A, B, Q = i91.idleTimeout, I = i91.finalTimeout, G = i91.heartbeatInterval, Z = !1, D = !1) {
      super(A, B);
      if (this._idleHub = B, this._idleTimeout = Q, this._finalTimeout = I, this._heartbeatInterval = G, this._onScope = Z, this.activities = {}, this._heartbeatCounter = 0, this._finished = !1, this._idleTimeoutCanceledPermanently = !1, this._beforeFinishCallbacks = [], this._finishReason = wx[4], this._autoFinishAllowed = !D, Z) $Y.DEBUG_BUILD && VZ.logger.log(`Setting idle transaction on scope. Span ID: ${this.spanContext().spanId}`), B.getScope().setSpan(this);
      if (!D) this._restartIdleTimeout();
      setTimeout(() => {
        if (!this._finished) this.setStatus("deadline_exceeded"), this._finishReason = wx[3], this.end()
      }, this._finalTimeout)
    }
    end(A) {
      let B = l91.spanTimeInputToSeconds(A);
      if (this._finished = !0, this.activities = {}, this.op === "ui.action.click") this.setAttribute(NA9, this._finishReason);
      if (this.spanRecorder) {
        $Y.DEBUG_BUILD && VZ.logger.log("[Tracing] finishing IdleTransaction", new Date(B * 1000).toISOString(), this.op);
        for (let Q of this._beforeFinishCallbacks) Q(this, B);
        this.spanRecorder.spans = this.spanRecorder.spans.filter((Q) => {
          if (Q.spanContext().spanId === this.spanContext().spanId) return !0;
          if (!l91.spanToJSON(Q).timestamp) Q.setStatus("cancelled"), Q.end(B), $Y.DEBUG_BUILD && VZ.logger.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(Q, void 0, 2));
          let {
            start_timestamp: I,
            timestamp: G
          } = l91.spanToJSON(Q), Z = I && I < B, D = (this._finalTimeout + this._idleTimeout) / 1000, Y = G && I && G - I < D;
          if ($Y.DEBUG_BUILD) {
            let W = JSON.stringify(Q, void 0, 2);
            if (!Z) VZ.logger.log("[Tracing] discarding Span since it happened after Transaction was finished", W);
            else if (!Y) VZ.logger.log("[Tracing] discarding Span since it finished after Transaction final timeout", W)
          }
          return Z && Y
        }), $Y.DEBUG_BUILD && VZ.logger.log("[Tracing] flushing IdleTransaction")
      } else $Y.DEBUG_BUILD && VZ.logger.log("[Tracing] No active IdleTransaction");
      if (this._onScope) {
        let Q = this._idleHub.getScope();
        if (Q.getTransaction() === this) Q.setSpan(void 0)
      }
      return super.end(A)
    }
    registerBeforeFinishCallback(A) {
      this._beforeFinishCallbacks.push(A)
    }
    initSpanRecorder(A) {
      if (!this.spanRecorder) {
        let B = (I) => {
            if (this._finished) return;
            this._pushActivity(I)
          },
          Q = (I) => {
            if (this._finished) return;
            this._popActivity(I)
          };
        this.spanRecorder = new Z$1(B, Q, this.spanContext().spanId, A), $Y.DEBUG_BUILD && VZ.logger.log("Starting heartbeat"), this._pingHeartbeat()
      }
      this.spanRecorder.add(this)
    }
    cancelIdleTimeout(A, {
      restartOnChildSpanChange: B
    } = {
      restartOnChildSpanChange: !0
    }) {
      if (this._idleTimeoutCanceledPermanently = B === !1, this._idleTimeoutID) {
        if (clearTimeout(this._idleTimeoutID), this._idleTimeoutID = void 0, Object.keys(this.activities).length === 0 && this._idleTimeoutCanceledPermanently) this._finishReason = wx[5], this.end(A)
      }
    }
    setFinishReason(A) {
      this._finishReason = A
    }
    sendAutoFinishSignal() {
      if (!this._autoFinishAllowed) $Y.DEBUG_BUILD && VZ.logger.log("[Tracing] Received finish signal for idle transaction."), this._restartIdleTimeout(), this._autoFinishAllowed = !0
    }
    _restartIdleTimeout(A) {
      this.cancelIdleTimeout(), this._idleTimeoutID = setTimeout(() => {
        if (!this._finished && Object.keys(this.activities).length === 0) this._finishReason = wx[1], this.end(A)
      }, this._idleTimeout)
    }
    _pushActivity(A) {
      this.cancelIdleTimeout(void 0, {
        restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently
      }), $Y.DEBUG_BUILD && VZ.logger.log(`[Tracing] pushActivity: ${A}`), this.activities[A] = !0, $Y.DEBUG_BUILD && VZ.logger.log("[Tracing] new activities count", Object.keys(this.activities).length)
    }
    _popActivity(A) {
      if (this.activities[A]) $Y.DEBUG_BUILD && VZ.logger.log(`[Tracing] popActivity ${A}`), delete this.activities[A], $Y.DEBUG_BUILD && VZ.logger.log("[Tracing] new activities count", Object.keys(this.activities).length);
      if (Object.keys(this.activities).length === 0) {
        let B = VZ.timestampInSeconds();
        if (this._idleTimeoutCanceledPermanently) {
          if (this._autoFinishAllowed) this._finishReason = wx[5], this.end(B)
        } else this._restartIdleTimeout(B + this._idleTimeout / 1000)
      }
    }
    _beat() {
      if (this._finished) return;
      let A = Object.keys(this.activities).join("");
      if (A === this._prevHeartbeatString) this._heartbeatCounter++;
      else this._heartbeatCounter = 1;
      if (this._prevHeartbeatString = A, this._heartbeatCounter >= 3) {
        if (this._autoFinishAllowed) $Y.DEBUG_BUILD && VZ.logger.log("[Tracing] Transaction finished because of no change for 3 heart beats"), this.setStatus("deadline_exceeded"), this._finishReason = wx[0], this.end()
      } else this._pingHeartbeat()
    }
    _pingHeartbeat() {
      $Y.DEBUG_BUILD && VZ.logger.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`), setTimeout(() => {
        this._beat()
      }, this._heartbeatInterval)
    }
  }
  VQA.IdleTransaction = XQA;
  VQA.IdleTransactionSpanRecorder = Z$1;
  VQA.TRACING_DEFAULTS = i91
})
// @from(Start 153348, End 155453)
Y$1 = z((KQA) => {
  Object.defineProperty(KQA, "__esModule", {
    value: !0
  });
  var TP = rA(),
    Ex = B7(),
    n91 = cc(),
    LA9 = v91(),
    RA9 = NY();

  function OA9(A, B, Q) {
    if (!LA9.hasTracingEnabled(B)) return A.sampled = !1, A;
    if (A.sampled !== void 0) return A.setAttribute(n91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(A.sampled)), A;
    let I;
    if (typeof B.tracesSampler === "function") I = B.tracesSampler(Q), A.setAttribute(n91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(I));
    else if (Q.parentSampled !== void 0) I = Q.parentSampled;
    else if (typeof B.tracesSampleRate !== "undefined") I = B.tracesSampleRate, A.setAttribute(n91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(I));
    else I = 1, A.setAttribute(n91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, I);
    if (!CQA(I)) return Ex.DEBUG_BUILD && TP.logger.warn("[Tracing] Discarding transaction because of invalid sample rate."), A.sampled = !1, A;
    if (!I) return Ex.DEBUG_BUILD && TP.logger.log(`[Tracing] Discarding transaction because ${typeof B.tracesSampler==="function"?"tracesSampler returned 0 or false":"a negative sampling decision was inherited or tracesSampleRate is set to 0"}`), A.sampled = !1, A;
    if (A.sampled = Math.random() < I, !A.sampled) return Ex.DEBUG_BUILD && TP.logger.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(I)})`), A;
    return Ex.DEBUG_BUILD && TP.logger.log(`[Tracing] starting ${A.op} transaction - ${RA9.spanToJSON(A).description}`), A
  }

  function CQA(A) {
    if (TP.isNaN(A) || !(typeof A === "number" || typeof A === "boolean")) return Ex.DEBUG_BUILD && TP.logger.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(A)} of type ${JSON.stringify(typeof A)}.`), !1;
    if (A < 0 || A > 1) return Ex.DEBUG_BUILD && TP.logger.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${A}.`), !1;
    return !0
  }
  KQA.isValidSampleRate = CQA;
  KQA.sampleTransaction = OA9
})
// @from(Start 155459, End 157690)
W$1 = z((zQA) => {
  Object.defineProperty(zQA, "__esModule", {
    value: !0
  });
  var SA9 = rA(),
    _A9 = B7(),
    jA9 = iH(),
    yA9 = NY(),
    kA9 = f91(),
    xA9 = D$1(),
    HQA = Y$1(),
    fA9 = c91();

  function vA9() {
    let B = this.getScope().getSpan();
    return B ? {
      "sentry-trace": yA9.spanToTraceHeader(B)
    } : {}
  }

  function bA9(A, B) {
    let Q = this.getClient(),
      I = Q && Q.getOptions() || {},
      G = I.instrumenter || "sentry",
      Z = A.instrumenter || "sentry";
    if (G !== Z) _A9.DEBUG_BUILD && SA9.logger.error(`A transaction was started with instrumenter=\`${Z}\`, but the SDK is configured with the \`${G}\` instrumenter.
The transaction will not be sampled. Please use the ${G} instrumentation to start transactions.`), A.sampled = !1;
    let D = new fA9.Transaction(A, this);
    if (D = HQA.sampleTransaction(D, I, {
        name: A.name,
        parentSampled: A.parentSampled,
        transactionContext: A,
        attributes: {
          ...A.data,
          ...A.attributes
        },
        ...B
      }), D.isRecording()) D.initSpanRecorder(I._experiments && I._experiments.maxSpans);
    if (Q && Q.emit) Q.emit("startTransaction", D);
    return D
  }

  function gA9(A, B, Q, I, G, Z, D, Y = !1) {
    let W = A.getClient(),
      J = W && W.getOptions() || {},
      F = new xA9.IdleTransaction(B, A, Q, I, D, G, Y);
    if (F = HQA.sampleTransaction(F, J, {
        name: B.name,
        parentSampled: B.parentSampled,
        transactionContext: B,
        attributes: {
          ...B.data,
          ...B.attributes
        },
        ...Z
      }), F.isRecording()) F.initSpanRecorder(J._experiments && J._experiments.maxSpans);
    if (W && W.emit) W.emit("startTransaction", F);
    return F
  }

  function hA9() {
    let A = jA9.getMainCarrier();
    if (!A.__SENTRY__) return;
    if (A.__SENTRY__.extensions = A.__SENTRY__.extensions || {}, !A.__SENTRY__.extensions.startTransaction) A.__SENTRY__.extensions.startTransaction = bA9;
    if (!A.__SENTRY__.extensions.traceHeaders) A.__SENTRY__.extensions.traceHeaders = vA9;
    kA9.registerErrorInstrumentation()
  }
  zQA.addTracingExtensions = hA9;
  zQA.startIdleTransaction = gA9
})
// @from(Start 157696, End 157936)
EQA = z((wQA) => {
  Object.defineProperty(wQA, "__esModule", {
    value: !0
  });
  var uA9 = x91();

  function pA9(A, B, Q) {
    let I = uA9.getActiveTransaction();
    if (I) I.setMeasurement(A, B, Q)
  }
  wQA.setMeasurement = pA9
})
// @from(Start 157942, End 159181)
J$1 = z((UQA) => {
  Object.defineProperty(UQA, "__esModule", {
    value: !0
  });
  var Ux = rA();

  function lA9(A, B) {
    if (!B) return A;
    return A.sdk = A.sdk || {}, A.sdk.name = A.sdk.name || B.name, A.sdk.version = A.sdk.version || B.version, A.sdk.integrations = [...A.sdk.integrations || [], ...B.integrations || []], A.sdk.packages = [...A.sdk.packages || [], ...B.packages || []], A
  }

  function iA9(A, B, Q, I) {
    let G = Ux.getSdkMetadataForEnvelopeHeader(Q),
      Z = {
        sent_at: new Date().toISOString(),
        ...G && {
          sdk: G
        },
        ...!!I && B && {
          dsn: Ux.dsnToString(B)
        }
      },
      D = "aggregates" in A ? [{
        type: "sessions"
      }, A] : [{
        type: "session"
      }, A.toJSON()];
    return Ux.createEnvelope(Z, [D])
  }

  function nA9(A, B, Q, I) {
    let G = Ux.getSdkMetadataForEnvelopeHeader(Q),
      Z = A.type && A.type !== "replay_event" ? A.type : "event";
    lA9(A, Q && Q.sdk);
    let D = Ux.createEventEnvelopeHeaders(A, G, I, B);
    delete A.sdkProcessingMetadata;
    let Y = [{
      type: Z
    }, A];
    return Ux.createEnvelope(D, [Y])
  }
  UQA.createEventEnvelope = nA9;
  UQA.createSessionEnvelope = iA9
})
// @from(Start 159187, End 160988)
F$1 = z(($QA) => {
  Object.defineProperty($QA, "__esModule", {
    value: !0
  });
  var rA9 = rA(),
    oA9 = mF();
  class NQA {
    constructor(A, B) {
      if (this._client = A, this.flushTimeout = 60, this._pendingAggregates = {}, this._isEnabled = !0, this._intervalId = setInterval(() => this.flush(), this.flushTimeout * 1000), this._intervalId.unref) this._intervalId.unref();
      this._sessionAttrs = B
    }
    flush() {
      let A = this.getSessionAggregates();
      if (A.aggregates.length === 0) return;
      this._pendingAggregates = {}, this._client.sendSession(A)
    }
    getSessionAggregates() {
      let A = Object.keys(this._pendingAggregates).map((Q) => {
          return this._pendingAggregates[parseInt(Q)]
        }),
        B = {
          attrs: this._sessionAttrs,
          aggregates: A
        };
      return rA9.dropUndefinedKeys(B)
    }
    close() {
      clearInterval(this._intervalId), this._isEnabled = !1, this.flush()
    }
    incrementSessionStatusCount() {
      if (!this._isEnabled) return;
      let A = oA9.getCurrentScope(),
        B = A.getRequestSession();
      if (B && B.status) this._incrementSessionStatusCount(B.status, new Date), A.setRequestSession(void 0)
    }
    _incrementSessionStatusCount(A, B) {
      let Q = new Date(B).setSeconds(0, 0);
      this._pendingAggregates[Q] = this._pendingAggregates[Q] || {};
      let I = this._pendingAggregates[Q];
      if (!I.started) I.started = new Date(Q).toISOString();
      switch (A) {
        case "errored":
          return I.errored = (I.errored || 0) + 1, I.errored;
        case "ok":
          return I.exited = (I.exited || 0) + 1, I.exited;
        default:
          return I.crashed = (I.crashed || 0) + 1, I.crashed
      }
    }
  }
  $QA.SessionFlusher = NQA
})
// @from(Start 160994, End 162402)
a91 = z((MQA) => {
  Object.defineProperty(MQA, "__esModule", {
    value: !0
  });
  var X$1 = rA(),
    eA9 = "7";

  function qQA(A) {
    let B = A.protocol ? `${A.protocol}:` : "",
      Q = A.port ? `:${A.port}` : "";
    return `${B}//${A.host}${Q}${A.path?`/${A.path}`:""}/api/`
  }

  function A09(A) {
    return `${qQA(A)}${A.projectId}/envelope/`
  }

  function B09(A, B) {
    return X$1.urlEncode({
      sentry_key: A.publicKey,
      sentry_version: eA9,
      ...B && {
        sentry_client: `${B.name}/${B.version}`
      }
    })
  }

  function Q09(A, B = {}) {
    let Q = typeof B === "string" ? B : B.tunnel,
      I = typeof B === "string" || !B._metadata ? void 0 : B._metadata.sdk;
    return Q ? Q : `${A09(A)}?${B09(A,I)}`
  }

  function I09(A, B) {
    let Q = X$1.makeDsn(A);
    if (!Q) return "";
    let I = `${qQA(Q)}embed/error-page/`,
      G = `dsn=${X$1.dsnToString(Q)}`;
    for (let Z in B) {
      if (Z === "dsn") continue;
      if (Z === "onClose") continue;
      if (Z === "user") {
        let D = B.user;
        if (!D) continue;
        if (D.name) G += `&name=${encodeURIComponent(D.name)}`;
        if (D.email) G += `&email=${encodeURIComponent(D.email)}`
      } else G += `&${encodeURIComponent(Z)}=${encodeURIComponent(B[Z])}`
    }
    return `${I}?${G}`
  }
  MQA.getEnvelopeEndpointWithUrlEncodedAuth = Q09;
  MQA.getReportDialogEndpoint = I09
})
// @from(Start 162408, End 165104)
RU = z((RQA) => {
  Object.defineProperty(RQA, "__esModule", {
    value: !0
  });
  var s91 = rA(),
    V$1 = B7(),
    D09 = fc(),
    Y09 = mF(),
    W09 = iH(),
    C$1 = [];

  function J09(A) {
    let B = {};
    return A.forEach((Q) => {
      let {
        name: I
      } = Q, G = B[I];
      if (G && !G.isDefaultInstance && Q.isDefaultInstance) return;
      B[I] = Q
    }), Object.keys(B).map((Q) => B[Q])
  }

  function F09(A) {
    let B = A.defaultIntegrations || [],
      Q = A.integrations;
    B.forEach((D) => {
      D.isDefaultInstance = !0
    });
    let I;
    if (Array.isArray(Q)) I = [...B, ...Q];
    else if (typeof Q === "function") I = s91.arrayify(Q(B));
    else I = B;
    let G = J09(I),
      Z = K09(G, (D) => D.name === "Debug");
    if (Z !== -1) {
      let [D] = G.splice(Z, 1);
      G.push(D)
    }
    return G
  }

  function X09(A, B) {
    let Q = {};
    return B.forEach((I) => {
      if (I) LQA(A, I, Q)
    }), Q
  }

  function V09(A, B) {
    for (let Q of B)
      if (Q && Q.afterAllSetup) Q.afterAllSetup(A)
  }

  function LQA(A, B, Q) {
    if (Q[B.name]) {
      V$1.DEBUG_BUILD && s91.logger.log(`Integration skipped because it was already installed: ${B.name}`);
      return
    }
    if (Q[B.name] = B, C$1.indexOf(B.name) === -1) B.setupOnce(D09.addGlobalEventProcessor, W09.getCurrentHub), C$1.push(B.name);
    if (B.setup && typeof B.setup === "function") B.setup(A);
    if (A.on && typeof B.preprocessEvent === "function") {
      let I = B.preprocessEvent.bind(B);
      A.on("preprocessEvent", (G, Z) => I(G, Z, A))
    }
    if (A.addEventProcessor && typeof B.processEvent === "function") {
      let I = B.processEvent.bind(B),
        G = Object.assign((Z, D) => I(Z, D, A), {
          id: B.name
        });
      A.addEventProcessor(G)
    }
    V$1.DEBUG_BUILD && s91.logger.log(`Integration installed: ${B.name}`)
  }

  function C09(A) {
    let B = Y09.getClient();
    if (!B || !B.addIntegration) {
      V$1.DEBUG_BUILD && s91.logger.warn(`Cannot add integration "${A.name}" because no SDK Client is available.`);
      return
    }
    B.addIntegration(A)
  }

  function K09(A, B) {
    for (let Q = 0; Q < A.length; Q++)
      if (B(A[Q]) === !0) return Q;
    return -1
  }

  function H09(A, B) {
    return Object.assign(function Q(...I) {
      return B(...I)
    }, {
      id: A
    })
  }

  function z09(A) {
    return A
  }
  RQA.addIntegration = C09;
  RQA.afterSetupIntegrations = V09;
  RQA.convertIntegrationFnToClass = H09;
  RQA.defineIntegration = z09;
  RQA.getIntegrationsToSetup = F09;
  RQA.installedIntegrations = C$1;
  RQA.setupIntegration = LQA;
  RQA.setupIntegrations = X09
})
// @from(Start 165110, End 166689)
ic = z((OQA) => {
  Object.defineProperty(OQA, "__esModule", {
    value: !0
  });
  var R09 = rA();

  function O09(A, B, Q, I) {
    let G = Object.entries(R09.dropUndefinedKeys(I)).sort((Z, D) => Z[0].localeCompare(D[0]));
    return `${A}${B}${Q}${G}`
  }

  function T09(A) {
    let B = 0;
    for (let Q = 0; Q < A.length; Q++) {
      let I = A.charCodeAt(Q);
      B = (B << 5) - B + I, B &= B
    }
    return B >>> 0
  }

  function P09(A) {
    let B = "";
    for (let Q of A) {
      let I = Object.entries(Q.tags),
        G = I.length > 0 ? `|#${I.map(([Z,D])=>`${Z}:${D}`).join(",")}` : "";
      B += `${Q.name}@${Q.unit}:${Q.metric}|${Q.metricType}${G}|T${Q.timestamp}
`
    }
    return B
  }

  function S09(A) {
    return A.replace(/[^\w]+/gi, "_")
  }

  function _09(A) {
    return A.replace(/[^\w\-.]+/gi, "_")
  }

  function j09(A) {
    return A.replace(/[^\w\-./]+/gi, "")
  }
  var y09 = [
    [`
`, "\\n"],
    ["\r", "\\r"],
    ["\t", "\\t"],
    ["\\", "\\\\"],
    ["|", "\\u{7c}"],
    [",", "\\u{2c}"]
  ];

  function k09(A) {
    for (let [B, Q] of y09)
      if (A === B) return Q;
    return A
  }

  function x09(A) {
    return [...A].reduce((B, Q) => B + k09(Q), "")
  }

  function f09(A) {
    let B = {};
    for (let Q in A)
      if (Object.prototype.hasOwnProperty.call(A, Q)) {
        let I = j09(Q);
        B[I] = x09(String(A[Q]))
      } return B
  }
  OQA.getBucketKey = O09;
  OQA.sanitizeMetricKey = _09;
  OQA.sanitizeTags = f09;
  OQA.sanitizeUnit = S09;
  OQA.serializeMetricBuckets = P09;
  OQA.simpleHash = T09
})
// @from(Start 166695, End 167274)
SQA = z((PQA) => {
  Object.defineProperty(PQA, "__esModule", {
    value: !0
  });
  var TQA = rA(),
    u09 = ic();

  function p09(A, B, Q, I) {
    let G = {
      sent_at: new Date().toISOString()
    };
    if (Q && Q.sdk) G.sdk = {
      name: Q.sdk.name,
      version: Q.sdk.version
    };
    if (!!I && B) G.dsn = TQA.dsnToString(B);
    let Z = c09(A);
    return TQA.createEnvelope(G, [Z])
  }

  function c09(A) {
    let B = u09.serializeMetricBuckets(A);
    return [{
      type: "statsd",
      length: B.length
    }, B]
  }
  PQA.createMetricEnvelope = p09
})
// @from(Start 167280, End 179246)
K$1 = z((vQA) => {
  Object.defineProperty(vQA, "__esModule", {
    value: !0
  });
  var $5 = rA(),
    i09 = a91(),
    aH = B7(),
    _QA = J$1(),
    n09 = mF(),
    a09 = iH(),
    r91 = RU(),
    s09 = SQA(),
    jQA = Jx(),
    r09 = LP(),
    o09 = O91(),
    yQA = "Not capturing exception because it's already been captured.";
  class kQA {
    constructor(A) {
      if (this._options = A, this._integrations = {}, this._integrationsInitialized = !1, this._numProcessing = 0, this._outcomes = {}, this._hooks = {}, this._eventProcessors = [], A.dsn) this._dsn = $5.makeDsn(A.dsn);
      else aH.DEBUG_BUILD && $5.logger.warn("No DSN provided, client will not send events.");
      if (this._dsn) {
        let B = i09.getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, A);
        this._transport = A.transport({
          tunnel: this._options.tunnel,
          recordDroppedEvent: this.recordDroppedEvent.bind(this),
          ...A.transportOptions,
          url: B
        })
      }
    }
    captureException(A, B, Q) {
      if ($5.checkOrSetAlreadyCaught(A)) {
        aH.DEBUG_BUILD && $5.logger.log(yQA);
        return
      }
      let I = B && B.event_id;
      return this._process(this.eventFromException(A, B).then((G) => this._captureEvent(G, B, Q)).then((G) => {
        I = G
      })), I
    }
    captureMessage(A, B, Q, I) {
      let G = Q && Q.event_id,
        Z = $5.isParameterizedString(A) ? A : String(A),
        D = $5.isPrimitive(A) ? this.eventFromMessage(Z, B, Q) : this.eventFromException(A, Q);
      return this._process(D.then((Y) => this._captureEvent(Y, Q, I)).then((Y) => {
        G = Y
      })), G
    }
    captureEvent(A, B, Q) {
      if (B && B.originalException && $5.checkOrSetAlreadyCaught(B.originalException)) {
        aH.DEBUG_BUILD && $5.logger.log(yQA);
        return
      }
      let I = B && B.event_id,
        Z = (A.sdkProcessingMetadata || {}).capturedSpanScope;
      return this._process(this._captureEvent(A, B, Z || Q).then((D) => {
        I = D
      })), I
    }
    captureSession(A) {
      if (typeof A.release !== "string") aH.DEBUG_BUILD && $5.logger.warn("Discarded session because of missing or non-string release");
      else this.sendSession(A), jQA.updateSession(A, {
        init: !1
      })
    }
    getDsn() {
      return this._dsn
    }
    getOptions() {
      return this._options
    }
    getSdkMetadata() {
      return this._options._metadata
    }
    getTransport() {
      return this._transport
    }
    flush(A) {
      let B = this._transport;
      if (B) {
        if (this.metricsAggregator) this.metricsAggregator.flush();
        return this._isClientDoneProcessing(A).then((Q) => {
          return B.flush(A).then((I) => Q && I)
        })
      } else return $5.resolvedSyncPromise(!0)
    }
    close(A) {
      return this.flush(A).then((B) => {
        if (this.getOptions().enabled = !1, this.metricsAggregator) this.metricsAggregator.close();
        return B
      })
    }
    getEventProcessors() {
      return this._eventProcessors
    }
    addEventProcessor(A) {
      this._eventProcessors.push(A)
    }
    setupIntegrations(A) {
      if (A && !this._integrationsInitialized || this._isEnabled() && !this._integrationsInitialized) this._setupIntegrations()
    }
    init() {
      if (this._isEnabled()) this._setupIntegrations()
    }
    getIntegrationById(A) {
      return this.getIntegrationByName(A)
    }
    getIntegrationByName(A) {
      return this._integrations[A]
    }
    getIntegration(A) {
      try {
        return this._integrations[A.id] || null
      } catch (B) {
        return aH.DEBUG_BUILD && $5.logger.warn(`Cannot retrieve integration ${A.id} from the current Client`), null
      }
    }
    addIntegration(A) {
      let B = this._integrations[A.name];
      if (r91.setupIntegration(this, A, this._integrations), !B) r91.afterSetupIntegrations(this, [A])
    }
    sendEvent(A, B = {}) {
      this.emit("beforeSendEvent", A, B);
      let Q = _QA.createEventEnvelope(A, this._dsn, this._options._metadata, this._options.tunnel);
      for (let G of B.attachments || []) Q = $5.addItemToEnvelope(Q, $5.createAttachmentEnvelopeItem(G, this._options.transportOptions && this._options.transportOptions.textEncoder));
      let I = this._sendEnvelope(Q);
      if (I) I.then((G) => this.emit("afterSendEvent", A, G), null)
    }
    sendSession(A) {
      let B = _QA.createSessionEnvelope(A, this._dsn, this._options._metadata, this._options.tunnel);
      this._sendEnvelope(B)
    }
    recordDroppedEvent(A, B, Q) {
      if (this._options.sendClientReports) {
        let I = typeof Q === "number" ? Q : 1,
          G = `${A}:${B}`;
        aH.DEBUG_BUILD && $5.logger.log(`Recording outcome: "${G}"${I>1?` (${I} times)`:""}`), this._outcomes[G] = (this._outcomes[G] || 0) + I
      }
    }
    captureAggregateMetrics(A) {
      aH.DEBUG_BUILD && $5.logger.log(`Flushing aggregated metrics, number of metrics: ${A.length}`);
      let B = s09.createMetricEnvelope(A, this._dsn, this._options._metadata, this._options.tunnel);
      this._sendEnvelope(B)
    }
    on(A, B) {
      if (!this._hooks[A]) this._hooks[A] = [];
      this._hooks[A].push(B)
    }
    emit(A, ...B) {
      if (this._hooks[A]) this._hooks[A].forEach((Q) => Q(...B))
    }
    _setupIntegrations() {
      let {
        integrations: A
      } = this._options;
      this._integrations = r91.setupIntegrations(this, A), r91.afterSetupIntegrations(this, A), this._integrationsInitialized = !0
    }
    _updateSessionFromEvent(A, B) {
      let Q = !1,
        I = !1,
        G = B.exception && B.exception.values;
      if (G) {
        I = !0;
        for (let Y of G) {
          let W = Y.mechanism;
          if (W && W.handled === !1) {
            Q = !0;
            break
          }
        }
      }
      let Z = A.status === "ok";
      if (Z && A.errors === 0 || Z && Q) jQA.updateSession(A, {
        ...Q && {
          status: "crashed"
        },
        errors: A.errors || Number(I || Q)
      }), this.captureSession(A)
    }
    _isClientDoneProcessing(A) {
      return new $5.SyncPromise((B) => {
        let Q = 0,
          I = 1,
          G = setInterval(() => {
            if (this._numProcessing == 0) clearInterval(G), B(!0);
            else if (Q += I, A && Q >= A) clearInterval(G), B(!1)
          }, I)
      })
    }
    _isEnabled() {
      return this.getOptions().enabled !== !1 && this._transport !== void 0
    }
    _prepareEvent(A, B, Q, I = a09.getIsolationScope()) {
      let G = this.getOptions(),
        Z = Object.keys(this._integrations);
      if (!B.integrations && Z.length > 0) B.integrations = Z;
      return this.emit("preprocessEvent", A, B), o09.prepareEvent(G, A, B, Q, this, I).then((D) => {
        if (D === null) return D;
        let Y = {
          ...I.getPropagationContext(),
          ...Q ? Q.getPropagationContext() : void 0
        };
        if (!(D.contexts && D.contexts.trace) && Y) {
          let {
            traceId: J,
            spanId: F,
            parentSpanId: X,
            dsc: V
          } = Y;
          D.contexts = {
            trace: {
              trace_id: J,
              span_id: F,
              parent_span_id: X
            },
            ...D.contexts
          };
          let C = V ? V : r09.getDynamicSamplingContextFromClient(J, this, Q);
          D.sdkProcessingMetadata = {
            dynamicSamplingContext: C,
            ...D.sdkProcessingMetadata
          }
        }
        return D
      })
    }
    _captureEvent(A, B = {}, Q) {
      return this._processEvent(A, B, Q).then((I) => {
        return I.event_id
      }, (I) => {
        if (aH.DEBUG_BUILD) {
          let G = I;
          if (G.logLevel === "log") $5.logger.log(G.message);
          else $5.logger.warn(G)
        }
        return
      })
    }
    _processEvent(A, B, Q) {
      let I = this.getOptions(),
        {
          sampleRate: G
        } = I,
        Z = fQA(A),
        D = xQA(A),
        Y = A.type || "error",
        W = `before send for type \`${Y}\``;
      if (D && typeof G === "number" && Math.random() > G) return this.recordDroppedEvent("sample_rate", "error", A), $5.rejectedSyncPromise(new $5.SentryError(`Discarding event because it's not included in the random sample (sampling rate = ${G})`, "log"));
      let J = Y === "replay_event" ? "replay" : Y,
        X = (A.sdkProcessingMetadata || {}).capturedSpanIsolationScope;
      return this._prepareEvent(A, B, Q, X).then((V) => {
        if (V === null) throw this.recordDroppedEvent("event_processor", J, A), new $5.SentryError("An event processor returned `null`, will not send event.", "log");
        if (B.data && B.data.__sentry__ === !0) return V;
        let K = e09(I, V, B);
        return t09(K, W)
      }).then((V) => {
        if (V === null) {
          if (this.recordDroppedEvent("before_send", J, A), Z) {
            let N = 1 + (A.spans || []).length;
            this.recordDroppedEvent("before_send", "span", N)
          }
          throw new $5.SentryError(`${W} returned \`null\`, will not send event.`, "log")
        }
        let C = Q && Q.getSession();
        if (!Z && C) this._updateSessionFromEvent(C, V);
        if (Z) {
          let E = V.sdkProcessingMetadata && V.sdkProcessingMetadata.spanCountBeforeProcessing || 0,
            N = V.spans ? V.spans.length : 0,
            q = E - N;
          if (q > 0) this.recordDroppedEvent("before_send", "span", q)
        }
        let K = V.transaction_info;
        if (Z && K && V.transaction !== A.transaction) V.transaction_info = {
          ...K,
          source: "custom"
        };
        return this.sendEvent(V, B), V
      }).then(null, (V) => {
        if (V instanceof $5.SentryError) throw V;
        throw this.captureException(V, {
          data: {
            __sentry__: !0
          },
          originalException: V
        }), new $5.SentryError(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${V}`)
      })
    }
    _process(A) {
      this._numProcessing++, A.then((B) => {
        return this._numProcessing--, B
      }, (B) => {
        return this._numProcessing--, B
      })
    }
    _sendEnvelope(A) {
      if (this.emit("beforeEnvelope", A), this._isEnabled() && this._transport) return this._transport.send(A).then(null, (B) => {
        aH.DEBUG_BUILD && $5.logger.error("Error while sending event:", B)
      });
      else aH.DEBUG_BUILD && $5.logger.error("Transport disabled")
    }
    _clearOutcomes() {
      let A = this._outcomes;
      return this._outcomes = {}, Object.keys(A).map((B) => {
        let [Q, I] = B.split(":");
        return {
          reason: Q,
          category: I,
          quantity: A[B]
        }
      })
    }
  }

  function t09(A, B) {
    let Q = `${B} must return \`null\` or a valid event.`;
    if ($5.isThenable(A)) return A.then((I) => {
      if (!$5.isPlainObject(I) && I !== null) throw new $5.SentryError(Q);
      return I
    }, (I) => {
      throw new $5.SentryError(`${B} rejected with ${I}`)
    });
    else if (!$5.isPlainObject(A) && A !== null) throw new $5.SentryError(Q);
    return A
  }

  function e09(A, B, Q) {
    let {
      beforeSend: I,
      beforeSendTransaction: G
    } = A;
    if (xQA(B) && I) return I(B, Q);
    if (fQA(B) && G) {
      if (B.spans) {
        let Z = B.spans.length;
        B.sdkProcessingMetadata = {
          ...B.sdkProcessingMetadata,
          spanCountBeforeProcessing: Z
        }
      }
      return G(B, Q)
    }
    return B
  }

  function xQA(A) {
    return A.type === void 0
  }

  function fQA(A) {
    return A.type === "transaction"
  }

  function A29(A) {
    let B = n09.getClient();
    if (!B || !B.addEventProcessor) return;
    B.addEventProcessor(A)
  }
  vQA.BaseClient = kQA;
  vQA.addEventProcessor = A29
})
// @from(Start 179252, End 179803)
z$1 = z((bQA) => {
  Object.defineProperty(bQA, "__esModule", {
    value: !0
  });
  var H$1 = rA();

  function I29(A, B, Q, I, G) {
    let Z = {
      sent_at: new Date().toISOString()
    };
    if (Q && Q.sdk) Z.sdk = {
      name: Q.sdk.name,
      version: Q.sdk.version
    };
    if (!!I && !!G) Z.dsn = H$1.dsnToString(G);
    if (B) Z.trace = H$1.dropUndefinedKeys(B);
    let D = G29(A);
    return H$1.createEnvelope(Z, [D])
  }

  function G29(A) {
    return [{
      type: "check_in"
    }, A]
  }
  bQA.createCheckInEnvelope = I29
})
// @from(Start 179809, End 180236)
nc = z((gQA) => {
  Object.defineProperty(gQA, "__esModule", {
    value: !0
  });
  var D29 = "c",
    Y29 = "g",
    W29 = "s",
    J29 = "d",
    F29 = 5000,
    X29 = 1e4,
    V29 = 1e4;
  gQA.COUNTER_METRIC_TYPE = D29;
  gQA.DEFAULT_BROWSER_FLUSH_INTERVAL = F29;
  gQA.DEFAULT_FLUSH_INTERVAL = X29;
  gQA.DISTRIBUTION_METRIC_TYPE = J29;
  gQA.GAUGE_METRIC_TYPE = Y29;
  gQA.MAX_WEIGHT = V29;
  gQA.SET_METRIC_TYPE = W29
})
// @from(Start 180242, End 181830)
$$1 = z((hQA) => {
  Object.defineProperty(hQA, "__esModule", {
    value: !0
  });
  var o91 = nc(),
    N29 = ic();
  class w$1 {
    constructor(A) {
      this._value = A
    }
    get weight() {
      return 1
    }
    add(A) {
      this._value += A
    }
    toString() {
      return `${this._value}`
    }
  }
  class E$1 {
    constructor(A) {
      this._last = A, this._min = A, this._max = A, this._sum = A, this._count = 1
    }
    get weight() {
      return 5
    }
    add(A) {
      if (this._last = A, A < this._min) this._min = A;
      if (A > this._max) this._max = A;
      this._sum += A, this._count++
    }
    toString() {
      return `${this._last}:${this._min}:${this._max}:${this._sum}:${this._count}`
    }
  }
  class U$1 {
    constructor(A) {
      this._value = [A]
    }
    get weight() {
      return this._value.length
    }
    add(A) {
      this._value.push(A)
    }
    toString() {
      return this._value.join(":")
    }
  }
  class N$1 {
    constructor(A) {
      this.first = A, this._value = new Set([A])
    }
    get weight() {
      return this._value.size
    }
    add(A) {
      this._value.add(A)
    }
    toString() {
      return Array.from(this._value).map((A) => typeof A === "string" ? N29.simpleHash(A) : A).join(":")
    }
  }
  var $29 = {
    [o91.COUNTER_METRIC_TYPE]: w$1,
    [o91.GAUGE_METRIC_TYPE]: E$1,
    [o91.DISTRIBUTION_METRIC_TYPE]: U$1,
    [o91.SET_METRIC_TYPE]: N$1
  };
  hQA.CounterMetric = w$1;
  hQA.DistributionMetric = U$1;
  hQA.GaugeMetric = E$1;
  hQA.METRIC_MAP = $29;
  hQA.SetMetric = N$1
})
// @from(Start 181836, End 184127)
pQA = z((uQA) => {
  Object.defineProperty(uQA, "__esModule", {
    value: !0
  });
  var mQA = rA(),
    ac = nc(),
    T29 = $$1(),
    P29 = pc(),
    t91 = ic();
  class dQA {
    constructor(A) {
      if (this._client = A, this._buckets = new Map, this._bucketsTotalWeight = 0, this._interval = setInterval(() => this._flush(), ac.DEFAULT_FLUSH_INTERVAL), this._interval.unref) this._interval.unref();
      this._flushShift = Math.floor(Math.random() * ac.DEFAULT_FLUSH_INTERVAL / 1000), this._forceFlush = !1
    }
    add(A, B, Q, I = "none", G = {}, Z = mQA.timestampInSeconds()) {
      let D = Math.floor(Z),
        Y = t91.sanitizeMetricKey(B),
        W = t91.sanitizeTags(G),
        J = t91.sanitizeUnit(I),
        F = t91.getBucketKey(A, Y, J, W),
        X = this._buckets.get(F),
        V = X && A === ac.SET_METRIC_TYPE ? X.metric.weight : 0;
      if (X) {
        if (X.metric.add(Q), X.timestamp < D) X.timestamp = D
      } else X = {
        metric: new T29.METRIC_MAP[A](Q),
        timestamp: D,
        metricType: A,
        name: Y,
        unit: J,
        tags: W
      }, this._buckets.set(F, X);
      let C = typeof Q === "string" ? X.metric.weight - V : Q;
      if (P29.updateMetricSummaryOnActiveSpan(A, Y, C, J, G, F), this._bucketsTotalWeight += X.metric.weight, this._bucketsTotalWeight >= ac.MAX_WEIGHT) this.flush()
    }
    flush() {
      this._forceFlush = !0, this._flush()
    }
    close() {
      this._forceFlush = !0, clearInterval(this._interval), this._flush()
    }
    _flush() {
      if (this._forceFlush) {
        this._forceFlush = !1, this._bucketsTotalWeight = 0, this._captureMetrics(this._buckets), this._buckets.clear();
        return
      }
      let A = Math.floor(mQA.timestampInSeconds()) - ac.DEFAULT_FLUSH_INTERVAL / 1000 - this._flushShift,
        B = new Map;
      for (let [Q, I] of this._buckets)
        if (I.timestamp <= A) B.set(Q, I), this._bucketsTotalWeight -= I.metric.weight;
      for (let [Q] of B) this._buckets.delete(Q);
      this._captureMetrics(B)
    }
    _captureMetrics(A) {
      if (A.size > 0 && this._client.captureAggregateMetrics) {
        let B = Array.from(A).map(([, Q]) => Q);
        this._client.captureAggregateMetrics(B)
      }
    }
  }
  uQA.MetricsAggregator = dQA
})
// @from(Start 184133, End 188383)
nQA = z((iQA) => {
  Object.defineProperty(iQA, "__esModule", {
    value: !0
  });
  var OU = rA(),
    _29 = K$1(),
    j29 = z$1(),
    e91 = B7(),
    y29 = mF(),
    k29 = pQA(),
    x29 = F$1(),
    f29 = W$1(),
    v29 = NY(),
    b29 = Fx();
  Cx();
  var cQA = LP();
  class lQA extends _29.BaseClient {
    constructor(A) {
      f29.addTracingExtensions();
      super(A);
      if (A._experiments && A._experiments.metricsAggregator) this.metricsAggregator = new k29.MetricsAggregator(this)
    }
    eventFromException(A, B) {
      return OU.resolvedSyncPromise(OU.eventFromUnknownInput(y29.getClient(), this._options.stackParser, A, B))
    }
    eventFromMessage(A, B = "info", Q) {
      return OU.resolvedSyncPromise(OU.eventFromMessage(this._options.stackParser, A, B, Q, this._options.attachStacktrace))
    }
    captureException(A, B, Q) {
      if (this._options.autoSessionTracking && this._sessionFlusher && Q) {
        let I = Q.getRequestSession();
        if (I && I.status === "ok") I.status = "errored"
      }
      return super.captureException(A, B, Q)
    }
    captureEvent(A, B, Q) {
      if (this._options.autoSessionTracking && this._sessionFlusher && Q) {
        if ((A.type || "exception") === "exception" && A.exception && A.exception.values && A.exception.values.length > 0) {
          let Z = Q.getRequestSession();
          if (Z && Z.status === "ok") Z.status = "errored"
        }
      }
      return super.captureEvent(A, B, Q)
    }
    close(A) {
      if (this._sessionFlusher) this._sessionFlusher.close();
      return super.close(A)
    }
    initSessionFlusher() {
      let {
        release: A,
        environment: B
      } = this._options;
      if (!A) e91.DEBUG_BUILD && OU.logger.warn("Cannot initialise an instance of SessionFlusher if no release is provided!");
      else this._sessionFlusher = new x29.SessionFlusher(this, {
        release: A,
        environment: B
      })
    }
    captureCheckIn(A, B, Q) {
      let I = "checkInId" in A && A.checkInId ? A.checkInId : OU.uuid4();
      if (!this._isEnabled()) return e91.DEBUG_BUILD && OU.logger.warn("SDK not enabled, will not capture checkin."), I;
      let G = this.getOptions(),
        {
          release: Z,
          environment: D,
          tunnel: Y
        } = G,
        W = {
          check_in_id: I,
          monitor_slug: A.monitorSlug,
          status: A.status,
          release: Z,
          environment: D
        };
      if ("duration" in A) W.duration = A.duration;
      if (B) W.monitor_config = {
        schedule: B.schedule,
        checkin_margin: B.checkinMargin,
        max_runtime: B.maxRuntime,
        timezone: B.timezone
      };
      let [J, F] = this._getTraceInfoFromScope(Q);
      if (F) W.contexts = {
        trace: F
      };
      let X = j29.createCheckInEnvelope(W, J, this.getSdkMetadata(), Y, this.getDsn());
      return e91.DEBUG_BUILD && OU.logger.info("Sending checkin:", A.monitorSlug, A.status), this._sendEnvelope(X), I
    }
    _captureRequestSession() {
      if (!this._sessionFlusher) e91.DEBUG_BUILD && OU.logger.warn("Discarded request mode session because autoSessionTracking option was disabled");
      else this._sessionFlusher.incrementSessionStatusCount()
    }
    _prepareEvent(A, B, Q, I) {
      if (this._options.platform) A.platform = A.platform || this._options.platform;
      if (this._options.runtime) A.contexts = {
        ...A.contexts,
        runtime: (A.contexts || {}).runtime || this._options.runtime
      };
      if (this._options.serverName) A.server_name = A.server_name || this._options.serverName;
      return super._prepareEvent(A, B, Q, I)
    }
    _getTraceInfoFromScope(A) {
      if (!A) return [void 0, void 0];
      let B = A.getSpan();
      if (B) return [b29.getRootSpan(B) ? cQA.getDynamicSamplingContextFromSpan(B) : void 0, v29.spanToTraceContext(B)];
      let {
        traceId: Q,
        spanId: I,
        parentSpanId: G,
        dsc: Z
      } = A.getPropagationContext(), D = {
        trace_id: Q,
        span_id: I,
        parent_span_id: G
      };
      if (Z) return [Z, D];
      return [cQA.getDynamicSamplingContextFromClient(Q, this, A), D]
    }
  }
  iQA.ServerRuntimeClient = lQA
})
// @from(Start 188389, End 189153)
oQA = z((rQA) => {
  Object.defineProperty(rQA, "__esModule", {
    value: !0
  });
  var aQA = rA(),
    h29 = B7(),
    m29 = mF(),
    d29 = iH();

  function u29(A, B) {
    if (B.debug === !0)
      if (h29.DEBUG_BUILD) aQA.logger.enable();
      else aQA.consoleSandbox(() => {
        console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")
      });
    m29.getCurrentScope().update(B.initialScope);
    let I = new A(B);
    sQA(I), p29(I)
  }

  function sQA(A) {
    let Q = d29.getCurrentHub().getStackTop();
    Q.client = A, Q.scope.setClient(A)
  }

  function p29(A) {
    if (A.init) A.init();
    else if (A.setupIntegrations) A.setupIntegrations()
  }
  rQA.initAndBind = u29;
  rQA.setCurrentClient = sQA
})
// @from(Start 189159, End 190970)
Q7A = z((B7A) => {
  Object.defineProperty(B7A, "__esModule", {
    value: !0
  });
  var qY = rA(),
    tQA = B7(),
    A7A = 30;

  function i29(A, B, Q = qY.makePromiseBuffer(A.bufferSize || A7A)) {
    let I = {},
      G = (D) => Q.drain(D);

    function Z(D) {
      let Y = [];
      if (qY.forEachEnvelopeItem(D, (X, V) => {
          let C = qY.envelopeItemTypeToDataCategory(V);
          if (qY.isRateLimited(I, C)) {
            let K = eQA(X, V);
            A.recordDroppedEvent("ratelimit_backoff", C, K)
          } else Y.push(X)
        }), Y.length === 0) return qY.resolvedSyncPromise();
      let W = qY.createEnvelope(D[0], Y),
        J = (X) => {
          qY.forEachEnvelopeItem(W, (V, C) => {
            let K = eQA(V, C);
            A.recordDroppedEvent(X, qY.envelopeItemTypeToDataCategory(C), K)
          })
        },
        F = () => B({
          body: qY.serializeEnvelope(W, A.textEncoder)
        }).then((X) => {
          if (X.statusCode !== void 0 && (X.statusCode < 200 || X.statusCode >= 300)) tQA.DEBUG_BUILD && qY.logger.warn(`Sentry responded with status code ${X.statusCode} to sent event.`);
          return I = qY.updateRateLimits(I, X), X
        }, (X) => {
          throw J("network_error"), X
        });
      return Q.add(F).then((X) => X, (X) => {
        if (X instanceof qY.SentryError) return tQA.DEBUG_BUILD && qY.logger.error("Skipped sending event because buffer is full."), J("queue_overflow"), qY.resolvedSyncPromise();
        else throw X
      })
    }
    return Z.__sentry__baseTransport__ = !0, {
      send: Z,
      flush: G
    }
  }

  function eQA(A, B) {
    if (B !== "event" && B !== "transaction") return;
    return Array.isArray(A) ? A[1] : void 0
  }
  B7A.DEFAULT_TRANSPORT_BUFFER_SIZE = A7A;
  B7A.createTransport = i29
})
// @from(Start 190976, End 192800)
Z7A = z((G7A) => {
  Object.defineProperty(G7A, "__esModule", {
    value: !0
  });
  var M$1 = rA(),
    s29 = B7(),
    I7A = 100,
    L$1 = 5000,
    r29 = 3600000;

  function q$1(A, B) {
    s29.DEBUG_BUILD && M$1.logger.info(`[Offline]: ${A}`, B)
  }

  function o29(A) {
    return (B) => {
      let Q = A(B),
        I = B.createStore ? B.createStore(B) : void 0,
        G = L$1,
        Z;

      function D(F, X, V) {
        if (M$1.envelopeContainsItemType(F, ["replay_event", "replay_recording", "client_report"])) return !1;
        if (B.shouldStore) return B.shouldStore(F, X, V);
        return !0
      }

      function Y(F) {
        if (!I) return;
        if (Z) clearTimeout(Z);
        if (Z = setTimeout(async () => {
            Z = void 0;
            let X = await I.pop();
            if (X) q$1("Attempting to send previously queued event"), J(X).catch((V) => {
              q$1("Failed to retry sending", V)
            })
          }, F), typeof Z !== "number" && Z.unref) Z.unref()
      }

      function W() {
        if (Z) return;
        Y(G), G = Math.min(G * 2, r29)
      }
      async function J(F) {
        try {
          let X = await Q.send(F),
            V = I7A;
          if (X) {
            if (X.headers && X.headers["retry-after"]) V = M$1.parseRetryAfterHeader(X.headers["retry-after"]);
            else if ((X.statusCode || 0) >= 400) return X
          }
          return Y(V), G = L$1, X
        } catch (X) {
          if (I && await D(F, X, G)) return await I.insert(F), W(), q$1("Error sending. Event queued", X), {};
          else throw X
        }
      }
      if (B.flushAtStartup) W();
      return {
        send: J,
        flush: (F) => Q.flush(F)
      }
    }
  }
  G7A.MIN_DELAY = I7A;
  G7A.START_DELAY = L$1;
  G7A.makeOfflineTransport = o29
})
// @from(Start 192806, End 194807)
Y7A = z((D7A) => {
  Object.defineProperty(D7A, "__esModule", {
    value: !0
  });
  var R$1 = rA(),
    B99 = a91();

  function O$1(A, B) {
    let Q;
    return R$1.forEachEnvelopeItem(A, (I, G) => {
      if (B.includes(G)) Q = Array.isArray(I) ? I[1] : void 0;
      return !!Q
    }), Q
  }

  function Q99(A, B) {
    return (Q) => {
      let I = A(Q);
      return {
        ...I,
        send: async (G) => {
          let Z = O$1(G, ["event", "transaction", "profile", "replay_event"]);
          if (Z) Z.release = B;
          return I.send(G)
        }
      }
    }
  }

  function I99(A, B) {
    return R$1.createEnvelope(B ? {
      ...A[0],
      dsn: B
    } : A[0], A[1])
  }

  function G99(A, B) {
    return (Q) => {
      let I = A(Q),
        G = new Map;

      function Z(W, J) {
        let F = J ? `${W}:${J}` : W,
          X = G.get(F);
        if (!X) {
          let V = R$1.dsnFromString(W);
          if (!V) return;
          let C = B99.getEnvelopeEndpointWithUrlEncodedAuth(V, Q.tunnel);
          X = J ? Q99(A, J)({
            ...Q,
            url: C
          }) : A({
            ...Q,
            url: C
          }), G.set(F, X)
        }
        return [W, X]
      }
      async function D(W) {
        function J(V) {
          let C = V && V.length ? V : ["event"];
          return O$1(W, C)
        }
        let F = B({
          envelope: W,
          getEvent: J
        }).map((V) => {
          if (typeof V === "string") return Z(V, void 0);
          else return Z(V.dsn, V.release)
        }).filter((V) => !!V);
        if (F.length === 0) F.push(["", I]);
        return (await Promise.all(F.map(([V, C]) => C.send(I99(W, V)))))[0]
      }
      async function Y(W) {
        let J = [await I.flush(W)];
        for (let [, F] of G) J.push(await F.flush(W));
        return J.every((F) => F)
      }
      return {
        send: D,
        flush: Y
      }
    }
  }
  D7A.eventFromEnvelope = O$1;
  D7A.makeMultiplexedTransport = G99
})
// @from(Start 194813, End 195204)
F7A = z((J7A) => {
  Object.defineProperty(J7A, "__esModule", {
    value: !0
  });
  var W7A = rA();

  function Y99(A, B) {
    let Q = {
      sent_at: new Date().toISOString()
    };
    if (B) Q.dsn = W7A.dsnToString(B);
    let I = A.map(W99);
    return W7A.createEnvelope(Q, I)
  }

  function W99(A) {
    return [{
      type: "span"
    }, A]
  }
  J7A.createSpanEnvelope = Y99
})
// @from(Start 195210, End 195786)
C7A = z((V7A) => {
  Object.defineProperty(V7A, "__esModule", {
    value: !0
  });

  function F99(A, B) {
    let Q = B && C99(B) ? B.getClient() : B,
      I = Q && Q.getDsn(),
      G = Q && Q.getOptions().tunnel;
    return V99(A, I) || X99(A, G)
  }

  function X99(A, B) {
    if (!B) return !1;
    return X7A(A) === X7A(B)
  }

  function V99(A, B) {
    return B ? A.includes(B.host) : !1
  }

  function X7A(A) {
    return A[A.length - 1] === "/" ? A.slice(0, -1) : A
  }

  function C99(A) {
    return A.getClient !== void 0
  }
  V7A.isSentryRequestUrl = F99
})
// @from(Start 195792, End 196114)
H7A = z((K7A) => {
  Object.defineProperty(K7A, "__esModule", {
    value: !0
  });

  function H99(A, ...B) {
    let Q = new String(String.raw(A, ...B));
    return Q.__sentry_template_string__ = A.join("\x00").replace(/%/g, "%%").replace(/\0/g, "%s"), Q.__sentry_template_values__ = B, Q
  }
  K7A.parameterize = H99
})
// @from(Start 196120, End 196566)
E7A = z((w7A) => {
  Object.defineProperty(w7A, "__esModule", {
    value: !0
  });
  var z7A = j91();

  function w99(A, B, Q = [B], I = "npm") {
    let G = A._metadata || {};
    if (!G.sdk) G.sdk = {
      name: `sentry.javascript.${B}`,
      packages: Q.map((Z) => ({
        name: `${I}:@sentry/${Z}`,
        version: z7A.SDK_VERSION
      })),
      version: z7A.SDK_VERSION
    };
    A._metadata = G
  }
  w7A.applySdkMetadata = w99
})