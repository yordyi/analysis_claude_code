
// @from(Start 4988681, End 5005570)
Fx0 = z((Wx0) => {
  Object.defineProperty(Wx0, "__esModule", {
    value: !0
  });
  Wx0.RetryingCall = Wx0.MessageBufferTracker = Wx0.RetryThrottler = void 0;
  var pD1 = y6(),
    BG6 = Hr(),
    QG6 = SZ(),
    IG6 = GB(),
    GG6 = "retrying_call";
  class Zx0 {
    constructor(A, B, Q) {
      if (this.maxTokens = A, this.tokenRatio = B, Q) this.tokens = Q.tokens * (A / Q.maxTokens);
      else this.tokens = A
    }
    addCallSucceeded() {
      this.tokens = Math.min(this.tokens + this.tokenRatio, this.maxTokens)
    }
    addCallFailed() {
      this.tokens = Math.max(this.tokens - 1, 0)
    }
    canRetryCall() {
      return this.tokens > this.maxTokens / 2
    }
  }
  Wx0.RetryThrottler = Zx0;
  class Dx0 {
    constructor(A, B) {
      this.totalLimit = A, this.limitPerCall = B, this.totalAllocated = 0, this.allocatedPerCall = new Map
    }
    allocate(A, B) {
      var Q;
      let I = (Q = this.allocatedPerCall.get(B)) !== null && Q !== void 0 ? Q : 0;
      if (this.limitPerCall - I < A || this.totalLimit - this.totalAllocated < A) return !1;
      return this.allocatedPerCall.set(B, I + A), this.totalAllocated += A, !0
    }
    free(A, B) {
      var Q;
      if (this.totalAllocated < A) throw new Error(`Invalid buffer allocation state: call ${B} freed ${A} > total allocated ${this.totalAllocated}`);
      this.totalAllocated -= A;
      let I = (Q = this.allocatedPerCall.get(B)) !== null && Q !== void 0 ? Q : 0;
      if (I < A) throw new Error(`Invalid buffer allocation state: call ${B} freed ${A} > allocated for call ${I}`);
      this.allocatedPerCall.set(B, I - A)
    }
    freeAll(A) {
      var B;
      let Q = (B = this.allocatedPerCall.get(A)) !== null && B !== void 0 ? B : 0;
      if (this.totalAllocated < Q) throw new Error(`Invalid buffer allocation state: call ${A} allocated ${Q} > total allocated ${this.totalAllocated}`);
      this.totalAllocated -= Q, this.allocatedPerCall.delete(A)
    }
  }
  Wx0.MessageBufferTracker = Dx0;
  var im1 = "grpc-previous-rpc-attempts",
    ZG6 = 5;
  class Yx0 {
    constructor(A, B, Q, I, G, Z, D, Y, W) {
      var J;
      this.channel = A, this.callConfig = B, this.methodName = Q, this.host = I, this.credentials = G, this.deadline = Z, this.callNumber = D, this.bufferTracker = Y, this.retryThrottler = W, this.listener = null, this.initialMetadata = null, this.underlyingCalls = [], this.writeBuffer = [], this.writeBufferOffset = 0, this.readStarted = !1, this.transparentRetryUsed = !1, this.attempts = 0, this.hedgingTimer = null, this.committedCallIndex = null, this.initialRetryBackoffSec = 0, this.nextRetryBackoffSec = 0;
      let F = (J = A.getOptions()["grpc-node.retry_max_attempts_limit"]) !== null && J !== void 0 ? J : ZG6;
      if (A.getOptions()["grpc.enable_retries"] === 0) this.state = "NO_RETRY", this.maxAttempts = 1;
      else if (B.methodConfig.retryPolicy) {
        this.state = "RETRY";
        let X = B.methodConfig.retryPolicy;
        this.nextRetryBackoffSec = this.initialRetryBackoffSec = Number(X.initialBackoff.substring(0, X.initialBackoff.length - 1)), this.maxAttempts = Math.min(X.maxAttempts, F)
      } else if (B.methodConfig.hedgingPolicy) this.state = "HEDGING", this.maxAttempts = Math.min(B.methodConfig.hedgingPolicy.maxAttempts, F);
      else this.state = "TRANSPARENT_ONLY", this.maxAttempts = 1;
      this.startTime = new Date
    }
    getDeadlineInfo() {
      if (this.underlyingCalls.length === 0) return [];
      let A = [],
        B = this.underlyingCalls[this.underlyingCalls.length - 1];
      if (this.underlyingCalls.length > 1) A.push(`previous attempts: ${this.underlyingCalls.length-1}`);
      if (B.startTime > this.startTime) A.push(`time to current attempt start: ${BG6.formatDateDifference(this.startTime,B.startTime)}`);
      return A.push(...B.call.getDeadlineInfo()), A
    }
    getCallNumber() {
      return this.callNumber
    }
    trace(A) {
      IG6.trace(pD1.LogVerbosity.DEBUG, GG6, "[" + this.callNumber + "] " + A)
    }
    reportStatus(A) {
      this.trace("ended with status: code=" + A.code + ' details="' + A.details + '" start time=' + this.startTime.toISOString()), this.bufferTracker.freeAll(this.callNumber), this.writeBufferOffset = this.writeBufferOffset + this.writeBuffer.length, this.writeBuffer = [], process.nextTick(() => {
        var B;
        (B = this.listener) === null || B === void 0 || B.onReceiveStatus({
          code: A.code,
          details: A.details,
          metadata: A.metadata
        })
      })
    }
    cancelWithStatus(A, B) {
      this.trace("cancelWithStatus code: " + A + ' details: "' + B + '"'), this.reportStatus({
        code: A,
        details: B,
        metadata: new QG6.Metadata
      });
      for (let {
          call: Q
        }
        of this.underlyingCalls) Q.cancelWithStatus(A, B)
    }
    getPeer() {
      if (this.committedCallIndex !== null) return this.underlyingCalls[this.committedCallIndex].call.getPeer();
      else return "unknown"
    }
    getBufferEntry(A) {
      var B;
      return (B = this.writeBuffer[A - this.writeBufferOffset]) !== null && B !== void 0 ? B : {
        entryType: "FREED",
        allocated: !1
      }
    }
    getNextBufferIndex() {
      return this.writeBufferOffset + this.writeBuffer.length
    }
    clearSentMessages() {
      if (this.state !== "COMMITTED") return;
      let A;
      if (this.underlyingCalls[this.committedCallIndex].state === "COMPLETED") A = this.getNextBufferIndex();
      else A = this.underlyingCalls[this.committedCallIndex].nextMessageToSend;
      for (let B = this.writeBufferOffset; B < A; B++) {
        let Q = this.getBufferEntry(B);
        if (Q.allocated) this.bufferTracker.free(Q.message.message.length, this.callNumber)
      }
      this.writeBuffer = this.writeBuffer.slice(A - this.writeBufferOffset), this.writeBufferOffset = A
    }
    commitCall(A) {
      var B, Q;
      if (this.state === "COMMITTED") return;
      this.trace("Committing call [" + this.underlyingCalls[A].call.getCallNumber() + "] at index " + A), this.state = "COMMITTED", (Q = (B = this.callConfig).onCommitted) === null || Q === void 0 || Q.call(B), this.committedCallIndex = A;
      for (let I = 0; I < this.underlyingCalls.length; I++) {
        if (I === A) continue;
        if (this.underlyingCalls[I].state === "COMPLETED") continue;
        this.underlyingCalls[I].state = "COMPLETED", this.underlyingCalls[I].call.cancelWithStatus(pD1.Status.CANCELLED, "Discarded in favor of other hedged attempt")
      }
      this.clearSentMessages()
    }
    commitCallWithMostMessages() {
      if (this.state === "COMMITTED") return;
      let A = -1,
        B = -1;
      for (let [Q, I] of this.underlyingCalls.entries())
        if (I.state === "ACTIVE" && I.nextMessageToSend > A) A = I.nextMessageToSend, B = Q;
      if (B === -1) this.state = "TRANSPARENT_ONLY";
      else this.commitCall(B)
    }
    isStatusCodeInList(A, B) {
      return A.some((Q) => {
        var I;
        return Q === B || Q.toString().toLowerCase() === ((I = pD1.Status[B]) === null || I === void 0 ? void 0 : I.toLowerCase())
      })
    }
    getNextRetryBackoffMs() {
      var A;
      let B = (A = this.callConfig) === null || A === void 0 ? void 0 : A.methodConfig.retryPolicy;
      if (!B) return 0;
      let Q = Math.random() * this.nextRetryBackoffSec * 1000,
        I = Number(B.maxBackoff.substring(0, B.maxBackoff.length - 1));
      return this.nextRetryBackoffSec = Math.min(this.nextRetryBackoffSec * B.backoffMultiplier, I), Q
    }
    maybeRetryCall(A, B) {
      if (this.state !== "RETRY") {
        B(!1);
        return
      }
      if (this.attempts >= this.maxAttempts) {
        B(!1);
        return
      }
      let Q;
      if (A === null) Q = this.getNextRetryBackoffMs();
      else if (A < 0) {
        this.state = "TRANSPARENT_ONLY", B(!1);
        return
      } else Q = A, this.nextRetryBackoffSec = this.initialRetryBackoffSec;
      setTimeout(() => {
        var I, G;
        if (this.state !== "RETRY") {
          B(!1);
          return
        }
        if ((G = (I = this.retryThrottler) === null || I === void 0 ? void 0 : I.canRetryCall()) !== null && G !== void 0 ? G : !0) B(!0), this.attempts += 1, this.startNewAttempt();
        else this.trace("Retry attempt denied by throttling policy"), B(!1)
      }, Q)
    }
    countActiveCalls() {
      let A = 0;
      for (let B of this.underlyingCalls)
        if ((B === null || B === void 0 ? void 0 : B.state) === "ACTIVE") A += 1;
      return A
    }
    handleProcessedStatus(A, B, Q) {
      var I, G, Z;
      switch (this.state) {
        case "COMMITTED":
        case "NO_RETRY":
        case "TRANSPARENT_ONLY":
          this.commitCall(B), this.reportStatus(A);
          break;
        case "HEDGING":
          if (this.isStatusCodeInList((I = this.callConfig.methodConfig.hedgingPolicy.nonFatalStatusCodes) !== null && I !== void 0 ? I : [], A.code)) {
            (G = this.retryThrottler) === null || G === void 0 || G.addCallFailed();
            let D;
            if (Q === null) D = 0;
            else if (Q < 0) {
              this.state = "TRANSPARENT_ONLY", this.commitCall(B), this.reportStatus(A);
              return
            } else D = Q;
            setTimeout(() => {
              if (this.maybeStartHedgingAttempt(), this.countActiveCalls() === 0) this.commitCall(B), this.reportStatus(A)
            }, D)
          } else this.commitCall(B), this.reportStatus(A);
          break;
        case "RETRY":
          if (this.isStatusCodeInList(this.callConfig.methodConfig.retryPolicy.retryableStatusCodes, A.code))(Z = this.retryThrottler) === null || Z === void 0 || Z.addCallFailed(), this.maybeRetryCall(Q, (D) => {
            if (!D) this.commitCall(B), this.reportStatus(A)
          });
          else this.commitCall(B), this.reportStatus(A);
          break
      }
    }
    getPushback(A) {
      let B = A.get("grpc-retry-pushback-ms");
      if (B.length === 0) return null;
      try {
        return parseInt(B[0])
      } catch (Q) {
        return -1
      }
    }
    handleChildStatus(A, B) {
      var Q;
      if (this.underlyingCalls[B].state === "COMPLETED") return;
      if (this.trace("state=" + this.state + " handling status with progress " + A.progress + " from child [" + this.underlyingCalls[B].call.getCallNumber() + "] in state " + this.underlyingCalls[B].state), this.underlyingCalls[B].state = "COMPLETED", A.code === pD1.Status.OK) {
        (Q = this.retryThrottler) === null || Q === void 0 || Q.addCallSucceeded(), this.commitCall(B), this.reportStatus(A);
        return
      }
      if (this.state === "NO_RETRY") {
        this.commitCall(B), this.reportStatus(A);
        return
      }
      if (this.state === "COMMITTED") {
        this.reportStatus(A);
        return
      }
      let I = this.getPushback(A.metadata);
      switch (A.progress) {
        case "NOT_STARTED":
          this.startNewAttempt();
          break;
        case "REFUSED":
          if (this.transparentRetryUsed) this.handleProcessedStatus(A, B, I);
          else this.transparentRetryUsed = !0, this.startNewAttempt();
          break;
        case "DROP":
          this.commitCall(B), this.reportStatus(A);
          break;
        case "PROCESSED":
          this.handleProcessedStatus(A, B, I);
          break
      }
    }
    maybeStartHedgingAttempt() {
      if (this.state !== "HEDGING") return;
      if (!this.callConfig.methodConfig.hedgingPolicy) return;
      if (this.attempts >= this.maxAttempts) return;
      this.attempts += 1, this.startNewAttempt(), this.maybeStartHedgingTimer()
    }
    maybeStartHedgingTimer() {
      var A, B, Q;
      if (this.hedgingTimer) clearTimeout(this.hedgingTimer);
      if (this.state !== "HEDGING") return;
      if (!this.callConfig.methodConfig.hedgingPolicy) return;
      let I = this.callConfig.methodConfig.hedgingPolicy;
      if (this.attempts >= this.maxAttempts) return;
      let G = (A = I.hedgingDelay) !== null && A !== void 0 ? A : "0s",
        Z = Number(G.substring(0, G.length - 1));
      this.hedgingTimer = setTimeout(() => {
        this.maybeStartHedgingAttempt()
      }, Z * 1000), (Q = (B = this.hedgingTimer).unref) === null || Q === void 0 || Q.call(B)
    }
    startNewAttempt() {
      let A = this.channel.createLoadBalancingCall(this.callConfig, this.methodName, this.host, this.credentials, this.deadline);
      this.trace("Created child call [" + A.getCallNumber() + "] for attempt " + this.attempts);
      let B = this.underlyingCalls.length;
      this.underlyingCalls.push({
        state: "ACTIVE",
        call: A,
        nextMessageToSend: 0,
        startTime: new Date
      });
      let Q = this.attempts - 1,
        I = this.initialMetadata.clone();
      if (Q > 0) I.set(im1, `${Q}`);
      let G = !1;
      if (A.start(I, {
          onReceiveMetadata: (Z) => {
            if (this.trace("Received metadata from child [" + A.getCallNumber() + "]"), this.commitCall(B), G = !0, Q > 0) Z.set(im1, `${Q}`);
            if (this.underlyingCalls[B].state === "ACTIVE") this.listener.onReceiveMetadata(Z)
          },
          onReceiveMessage: (Z) => {
            if (this.trace("Received message from child [" + A.getCallNumber() + "]"), this.commitCall(B), this.underlyingCalls[B].state === "ACTIVE") this.listener.onReceiveMessage(Z)
          },
          onReceiveStatus: (Z) => {
            if (this.trace("Received status from child [" + A.getCallNumber() + "]"), !G && Q > 0) Z.metadata.set(im1, `${Q}`);
            this.handleChildStatus(Z, B)
          }
        }), this.sendNextChildMessage(B), this.readStarted) A.startRead()
    }
    start(A, B) {
      this.trace("start called"), this.listener = B, this.initialMetadata = A, this.attempts += 1, this.startNewAttempt(), this.maybeStartHedgingTimer()
    }
    handleChildWriteCompleted(A) {
      var B, Q;
      let I = this.underlyingCalls[A],
        G = I.nextMessageToSend;
      (Q = (B = this.getBufferEntry(G)).callback) === null || Q === void 0 || Q.call(B), this.clearSentMessages(), I.nextMessageToSend += 1, this.sendNextChildMessage(A)
    }
    sendNextChildMessage(A) {
      let B = this.underlyingCalls[A];
      if (B.state === "COMPLETED") return;
      if (this.getBufferEntry(B.nextMessageToSend)) {
        let Q = this.getBufferEntry(B.nextMessageToSend);
        switch (Q.entryType) {
          case "MESSAGE":
            B.call.sendMessageWithContext({
              callback: (I) => {
                this.handleChildWriteCompleted(A)
              }
            }, Q.message.message);
            break;
          case "HALF_CLOSE":
            B.nextMessageToSend += 1, B.call.halfClose();
            break;
          case "FREED":
            break
        }
      }
    }
    sendMessageWithContext(A, B) {
      var Q;
      this.trace("write() called with message of length " + B.length);
      let I = {
          message: B,
          flags: A.flags
        },
        G = this.getNextBufferIndex(),
        Z = {
          entryType: "MESSAGE",
          message: I,
          allocated: this.bufferTracker.allocate(B.length, this.callNumber)
        };
      if (this.writeBuffer.push(Z), Z.allocated) {
        (Q = A.callback) === null || Q === void 0 || Q.call(A);
        for (let [D, Y] of this.underlyingCalls.entries())
          if (Y.state === "ACTIVE" && Y.nextMessageToSend === G) Y.call.sendMessageWithContext({
            callback: (W) => {
              this.handleChildWriteCompleted(D)
            }
          }, B)
      } else {
        if (this.commitCallWithMostMessages(), this.committedCallIndex === null) return;
        let D = this.underlyingCalls[this.committedCallIndex];
        if (Z.callback = A.callback, D.state === "ACTIVE" && D.nextMessageToSend === G) D.call.sendMessageWithContext({
          callback: (Y) => {
            this.handleChildWriteCompleted(this.committedCallIndex)
          }
        }, B)
      }
    }
    startRead() {
      this.trace("startRead called"), this.readStarted = !0;
      for (let A of this.underlyingCalls)
        if ((A === null || A === void 0 ? void 0 : A.state) === "ACTIVE") A.call.startRead()
    }
    halfClose() {
      this.trace("halfClose called");
      let A = this.getNextBufferIndex();
      this.writeBuffer.push({
        entryType: "HALF_CLOSE",
        allocated: !1
      });
      for (let B of this.underlyingCalls)
        if ((B === null || B === void 0 ? void 0 : B.state) === "ACTIVE" && B.nextMessageToSend === A) B.nextMessageToSend += 1, B.call.halfClose()
    }
    setCredentials(A) {
      throw new Error("Method not implemented.")
    }
    getMethod() {
      return this.methodName
    }
    getHost() {
      return this.host
    }
  }
  Wx0.RetryingCall = Yx0
})
// @from(Start 5005576, End 5007302)
cD1 = z((Vx0) => {
  Object.defineProperty(Vx0, "__esModule", {
    value: !0
  });
  Vx0.BaseSubchannelWrapper = void 0;
  class Xx0 {
    constructor(A) {
      this.child = A, this.healthy = !0, this.healthListeners = new Set, A.addHealthStateWatcher((B) => {
        if (this.healthy) this.updateHealthListeners()
      })
    }
    updateHealthListeners() {
      for (let A of this.healthListeners) A(this.isHealthy())
    }
    getConnectivityState() {
      return this.child.getConnectivityState()
    }
    addConnectivityStateListener(A) {
      this.child.addConnectivityStateListener(A)
    }
    removeConnectivityStateListener(A) {
      this.child.removeConnectivityStateListener(A)
    }
    startConnecting() {
      this.child.startConnecting()
    }
    getAddress() {
      return this.child.getAddress()
    }
    throttleKeepalive(A) {
      this.child.throttleKeepalive(A)
    }
    ref() {
      this.child.ref()
    }
    unref() {
      this.child.unref()
    }
    getChannelzRef() {
      return this.child.getChannelzRef()
    }
    isHealthy() {
      return this.healthy && this.child.isHealthy()
    }
    addHealthStateWatcher(A) {
      this.healthListeners.add(A)
    }
    removeHealthStateWatcher(A) {
      this.healthListeners.delete(A)
    }
    setHealthy(A) {
      if (A !== this.healthy) {
        if (this.healthy = A, this.child.isHealthy()) this.updateHealthListeners()
      }
    }
    getRealSubchannel() {
      return this.child.getRealSubchannel()
    }
    realSubchannelEquals(A) {
      return this.getRealSubchannel() === A.getRealSubchannel()
    }
    getCallCredentials() {
      return this.child.getCallCredentials()
    }
  }
  Vx0.BaseSubchannelWrapper = Xx0
})
// @from(Start 5007308, End 5023224)
rm1 = z((Ux0) => {
  Object.defineProperty(Ux0, "__esModule", {
    value: !0
  });
  Ux0.InternalChannel = Ux0.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX = void 0;
  var WG6 = us(),
    JG6 = dS0(),
    FG6 = Pk0(),
    sm1 = FR(),
    XG6 = SZ(),
    UR = y6(),
    VG6 = dm1(),
    CG6 = lk0(),
    Kx0 = Zw(),
    lD1 = GB(),
    KG6 = km1(),
    iD1 = uY(),
    kX = TX(),
    wr = Aj(),
    HG6 = ek0(),
    zG6 = Hr(),
    wG6 = Gx0(),
    nm1 = vm1(),
    EG6 = mD1(),
    am1 = Fx0(),
    UG6 = cD1(),
    NG6 = 2147483647,
    $G6 = 1000,
    qG6 = 1800000,
    nD1 = new Map,
    MG6 = 16777216,
    LG6 = 1048576;
  class Hx0 extends UG6.BaseSubchannelWrapper {
    constructor(A, B) {
      super(A);
      this.channel = B, this.refCount = 0, this.subchannelStateListener = (Q, I, G, Z) => {
        B.throttleKeepalive(Z)
      }
    }
    ref() {
      if (this.refCount === 0) this.child.addConnectivityStateListener(this.subchannelStateListener), this.channel.addWrappedSubchannel(this);
      this.child.ref(), this.refCount += 1
    }
    unref() {
      if (this.child.unref(), this.refCount -= 1, this.refCount <= 0) this.child.removeConnectivityStateListener(this.subchannelStateListener), this.channel.removeWrappedSubchannel(this)
    }
  }
  class zx0 {
    pick(A) {
      return {
        pickResultType: sm1.PickResultType.DROP,
        status: {
          code: UR.Status.UNAVAILABLE,
          details: "Channel closed before call started",
          metadata: new XG6.Metadata
        },
        subchannel: null,
        onCallStarted: null,
        onCallEnded: null
      }
    }
  }
  Ux0.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX = "grpc.internal.no_subchannel";
  class wx0 {
    constructor(A) {
      this.target = A, this.trace = new wr.ChannelzTrace, this.callTracker = new wr.ChannelzCallTracker, this.childrenTracker = new wr.ChannelzChildrenTracker, this.state = kX.ConnectivityState.IDLE
    }
    getChannelzInfoCallback() {
      return () => {
        return {
          target: this.target,
          state: this.state,
          trace: this.trace,
          callTracker: this.callTracker,
          children: this.childrenTracker.getChildLists()
        }
      }
    }
  }
  class Ex0 {
    constructor(A, B, Q) {
      var I, G, Z, D, Y, W;
      if (this.credentials = B, this.options = Q, this.connectivityState = kX.ConnectivityState.IDLE, this.currentPicker = new sm1.UnavailablePicker, this.configSelectionQueue = [], this.pickQueue = [], this.connectivityStateWatchers = [], this.callRefTimer = null, this.configSelector = null, this.currentResolutionError = null, this.wrappedSubchannels = new Set, this.callCount = 0, this.idleTimer = null, this.channelzEnabled = !0, this.randomChannelId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER), typeof A !== "string") throw new TypeError("Channel target must be a string");
      if (!(B instanceof WG6.ChannelCredentials)) throw new TypeError("Channel credentials must be a ChannelCredentials object");
      if (Q) {
        if (typeof Q !== "object") throw new TypeError("Channel options must be an object")
      }
      this.channelzInfoTracker = new wx0(A);
      let J = iD1.parseUri(A);
      if (J === null) throw new Error(`Could not parse target name "${A}"`);
      let F = Kx0.mapUriDefaultScheme(J);
      if (F === null) throw new Error(`Could not find a default scheme for target name "${A}"`);
      if (this.options["grpc.enable_channelz"] === 0) this.channelzEnabled = !1;
      if (this.channelzRef = wr.registerChannelzChannel(A, this.channelzInfoTracker.getChannelzInfoCallback(), this.channelzEnabled), this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_INFO", "Channel created");
      if (this.options["grpc.default_authority"]) this.defaultAuthority = this.options["grpc.default_authority"];
      else this.defaultAuthority = Kx0.getDefaultAuthority(F);
      let X = KG6.mapProxyName(F, Q);
      this.target = X.target, this.options = Object.assign({}, this.options, X.extraOptions), this.subchannelPool = FG6.getSubchannelPool(((I = Q["grpc.use_local_subchannel_pool"]) !== null && I !== void 0 ? I : 0) === 0), this.retryBufferTracker = new am1.MessageBufferTracker((G = Q["grpc.retry_buffer_size"]) !== null && G !== void 0 ? G : MG6, (Z = Q["grpc.per_rpc_retry_buffer_size"]) !== null && Z !== void 0 ? Z : LG6), this.keepaliveTime = (D = Q["grpc.keepalive_time_ms"]) !== null && D !== void 0 ? D : -1, this.idleTimeoutMs = Math.max((Y = Q["grpc.client_idle_timeout_ms"]) !== null && Y !== void 0 ? Y : qG6, $G6);
      let V = {
        createSubchannel: (K, E) => {
          let N = {};
          for (let [R, T] of Object.entries(E))
            if (!R.startsWith(Ux0.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX)) N[R] = T;
          let q = this.subchannelPool.getOrCreateSubchannel(this.target, K, N, this.credentials);
          if (q.throttleKeepalive(this.keepaliveTime), this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_INFO", "Created subchannel or used existing subchannel", q.getChannelzRef());
          return new Hx0(q, this)
        },
        updateState: (K, E) => {
          this.currentPicker = E;
          let N = this.pickQueue.slice();
          if (this.pickQueue = [], N.length > 0) this.callRefTimerUnref();
          for (let q of N) q.doPick();
          this.updateState(K)
        },
        requestReresolution: () => {
          throw new Error("Resolving load balancer should never call requestReresolution")
        },
        addChannelzChild: (K) => {
          if (this.channelzEnabled) this.channelzInfoTracker.childrenTracker.refChild(K)
        },
        removeChannelzChild: (K) => {
          if (this.channelzEnabled) this.channelzInfoTracker.childrenTracker.unrefChild(K)
        }
      };
      this.resolvingLoadBalancer = new JG6.ResolvingLoadBalancer(this.target, V, Q, (K, E) => {
        var N;
        if (K.retryThrottling) nD1.set(this.getTarget(), new am1.RetryThrottler(K.retryThrottling.maxTokens, K.retryThrottling.tokenRatio, nD1.get(this.getTarget())));
        else nD1.delete(this.getTarget());
        if (this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_INFO", "Address resolution succeeded");
        (N = this.configSelector) === null || N === void 0 || N.unref(), this.configSelector = E, this.currentResolutionError = null, process.nextTick(() => {
          let q = this.configSelectionQueue;
          if (this.configSelectionQueue = [], q.length > 0) this.callRefTimerUnref();
          for (let O of q) O.getConfig()
        })
      }, (K) => {
        if (this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_WARNING", "Address resolution failed with code " + K.code + ' and details "' + K.details + '"');
        if (this.configSelectionQueue.length > 0) this.trace("Name resolution failed with calls queued for config selection");
        if (this.configSelector === null) this.currentResolutionError = Object.assign(Object.assign({}, EG6.restrictControlPlaneStatusCode(K.code, K.details)), {
          metadata: K.metadata
        });
        let E = this.configSelectionQueue;
        if (this.configSelectionQueue = [], E.length > 0) this.callRefTimerUnref();
        for (let N of E) N.reportResolverError(K)
      }), this.filterStackFactory = new VG6.FilterStackFactory([new CG6.CompressionFilterFactory(this, this.options)]), this.trace("Channel constructed with options " + JSON.stringify(Q, void 0, 2));
      let C = new Error;
      if (lD1.isTracerEnabled("channel_stacktrace")) lD1.trace(UR.LogVerbosity.DEBUG, "channel_stacktrace", "(" + this.channelzRef.id + `) Channel constructed 
` + ((W = C.stack) === null || W === void 0 ? void 0 : W.substring(C.stack.indexOf(`
`) + 1)));
      this.lastActivityTimestamp = new Date
    }
    trace(A, B) {
      lD1.trace(B !== null && B !== void 0 ? B : UR.LogVerbosity.DEBUG, "channel", "(" + this.channelzRef.id + ") " + iD1.uriToString(this.target) + " " + A)
    }
    callRefTimerRef() {
      var A, B, Q, I;
      if (!this.callRefTimer) this.callRefTimer = setInterval(() => {}, NG6);
      if (!((B = (A = this.callRefTimer).hasRef) === null || B === void 0 ? void 0 : B.call(A))) this.trace("callRefTimer.ref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length), (I = (Q = this.callRefTimer).ref) === null || I === void 0 || I.call(Q)
    }
    callRefTimerUnref() {
      var A, B, Q;
      if (!((A = this.callRefTimer) === null || A === void 0 ? void 0 : A.hasRef) || this.callRefTimer.hasRef()) this.trace("callRefTimer.unref | configSelectionQueue.length=" + this.configSelectionQueue.length + " pickQueue.length=" + this.pickQueue.length), (Q = (B = this.callRefTimer) === null || B === void 0 ? void 0 : B.unref) === null || Q === void 0 || Q.call(B)
    }
    removeConnectivityStateWatcher(A) {
      let B = this.connectivityStateWatchers.findIndex((Q) => Q === A);
      if (B >= 0) this.connectivityStateWatchers.splice(B, 1)
    }
    updateState(A) {
      if (lD1.trace(UR.LogVerbosity.DEBUG, "connectivity_state", "(" + this.channelzRef.id + ") " + iD1.uriToString(this.target) + " " + kX.ConnectivityState[this.connectivityState] + " -> " + kX.ConnectivityState[A]), this.channelzEnabled) this.channelzInfoTracker.trace.addTrace("CT_INFO", "Connectivity state change to " + kX.ConnectivityState[A]);
      this.connectivityState = A, this.channelzInfoTracker.state = A;
      let B = this.connectivityStateWatchers.slice();
      for (let Q of B)
        if (A !== Q.currentState) {
          if (Q.timer) clearTimeout(Q.timer);
          this.removeConnectivityStateWatcher(Q), Q.callback()
        } if (A !== kX.ConnectivityState.TRANSIENT_FAILURE) this.currentResolutionError = null
    }
    throttleKeepalive(A) {
      if (A > this.keepaliveTime) {
        this.keepaliveTime = A;
        for (let B of this.wrappedSubchannels) B.throttleKeepalive(A)
      }
    }
    addWrappedSubchannel(A) {
      this.wrappedSubchannels.add(A)
    }
    removeWrappedSubchannel(A) {
      this.wrappedSubchannels.delete(A)
    }
    doPick(A, B) {
      return this.currentPicker.pick({
        metadata: A,
        extraPickInfo: B
      })
    }
    queueCallForPick(A) {
      this.pickQueue.push(A), this.callRefTimerRef()
    }
    getConfig(A, B) {
      if (this.connectivityState !== kX.ConnectivityState.SHUTDOWN) this.resolvingLoadBalancer.exitIdle();
      if (this.configSelector) return {
        type: "SUCCESS",
        config: this.configSelector.invoke(A, B, this.randomChannelId)
      };
      else if (this.currentResolutionError) return {
        type: "ERROR",
        error: this.currentResolutionError
      };
      else return {
        type: "NONE"
      }
    }
    queueCallForConfig(A) {
      this.configSelectionQueue.push(A), this.callRefTimerRef()
    }
    enterIdle() {
      if (this.resolvingLoadBalancer.destroy(), this.updateState(kX.ConnectivityState.IDLE), this.currentPicker = new sm1.QueuePicker(this.resolvingLoadBalancer), this.idleTimer) clearTimeout(this.idleTimer), this.idleTimer = null;
      if (this.callRefTimer) clearInterval(this.callRefTimer), this.callRefTimer = null
    }
    startIdleTimeout(A) {
      var B, Q;
      this.idleTimer = setTimeout(() => {
        if (this.callCount > 0) {
          this.startIdleTimeout(this.idleTimeoutMs);
          return
        }
        let G = new Date().valueOf() - this.lastActivityTimestamp.valueOf();
        if (G >= this.idleTimeoutMs) this.trace("Idle timer triggered after " + this.idleTimeoutMs + "ms of inactivity"), this.enterIdle();
        else this.startIdleTimeout(this.idleTimeoutMs - G)
      }, A), (Q = (B = this.idleTimer).unref) === null || Q === void 0 || Q.call(B)
    }
    maybeStartIdleTimer() {
      if (this.connectivityState !== kX.ConnectivityState.SHUTDOWN && !this.idleTimer) this.startIdleTimeout(this.idleTimeoutMs)
    }
    onCallStart() {
      if (this.channelzEnabled) this.channelzInfoTracker.callTracker.addCallStarted();
      this.callCount += 1
    }
    onCallEnd(A) {
      if (this.channelzEnabled)
        if (A.code === UR.Status.OK) this.channelzInfoTracker.callTracker.addCallSucceeded();
        else this.channelzInfoTracker.callTracker.addCallFailed();
      this.callCount -= 1, this.lastActivityTimestamp = new Date, this.maybeStartIdleTimer()
    }
    createLoadBalancingCall(A, B, Q, I, G) {
      let Z = nm1.getNextCallNumber();
      return this.trace("createLoadBalancingCall [" + Z + '] method="' + B + '"'), new HG6.LoadBalancingCall(this, A, B, Q, I, G, Z)
    }
    createRetryingCall(A, B, Q, I, G) {
      let Z = nm1.getNextCallNumber();
      return this.trace("createRetryingCall [" + Z + '] method="' + B + '"'), new am1.RetryingCall(this, A, B, Q, I, G, Z, this.retryBufferTracker, nD1.get(this.getTarget()))
    }
    createResolvingCall(A, B, Q, I, G) {
      let Z = nm1.getNextCallNumber();
      this.trace("createResolvingCall [" + Z + '] method="' + A + '", deadline=' + zG6.deadlineToString(B));
      let D = {
          deadline: B,
          flags: G !== null && G !== void 0 ? G : UR.Propagate.DEFAULTS,
          host: Q !== null && Q !== void 0 ? Q : this.defaultAuthority,
          parentCall: I
        },
        Y = new wG6.ResolvingCall(this, A, D, this.filterStackFactory.clone(), Z);
      return this.onCallStart(), Y.addStatusWatcher((W) => {
        this.onCallEnd(W)
      }), Y
    }
    close() {
      var A;
      this.resolvingLoadBalancer.destroy(), this.updateState(kX.ConnectivityState.SHUTDOWN), this.currentPicker = new zx0;
      for (let B of this.configSelectionQueue) B.cancelWithStatus(UR.Status.UNAVAILABLE, "Channel closed before call started");
      this.configSelectionQueue = [];
      for (let B of this.pickQueue) B.cancelWithStatus(UR.Status.UNAVAILABLE, "Channel closed before call started");
      if (this.pickQueue = [], this.callRefTimer) clearInterval(this.callRefTimer);
      if (this.idleTimer) clearTimeout(this.idleTimer);
      if (this.channelzEnabled) wr.unregisterChannelzRef(this.channelzRef);
      this.subchannelPool.unrefUnusedSubchannels(), (A = this.configSelector) === null || A === void 0 || A.unref(), this.configSelector = null
    }
    getTarget() {
      return iD1.uriToString(this.target)
    }
    getConnectivityState(A) {
      let B = this.connectivityState;
      if (A) this.resolvingLoadBalancer.exitIdle(), this.lastActivityTimestamp = new Date, this.maybeStartIdleTimer();
      return B
    }
    watchConnectivityState(A, B, Q) {
      if (this.connectivityState === kX.ConnectivityState.SHUTDOWN) throw new Error("Channel has been shut down");
      let I = null;
      if (B !== 1 / 0) {
        let Z = B instanceof Date ? B : new Date(B),
          D = new Date;
        if (B === -1 / 0 || Z <= D) {
          process.nextTick(Q, new Error("Deadline passed without connectivity state change"));
          return
        }
        I = setTimeout(() => {
          this.removeConnectivityStateWatcher(G), Q(new Error("Deadline passed without connectivity state change"))
        }, Z.getTime() - D.getTime())
      }
      let G = {
        currentState: A,
        callback: Q,
        timer: I
      };
      this.connectivityStateWatchers.push(G)
    }
    getChannelzRef() {
      return this.channelzRef
    }
    createCall(A, B, Q, I, G) {
      if (typeof A !== "string") throw new TypeError("Channel#createCall: method must be a string");
      if (!(typeof B === "number" || B instanceof Date)) throw new TypeError("Channel#createCall: deadline must be a number or Date");
      if (this.connectivityState === kX.ConnectivityState.SHUTDOWN) throw new Error("Channel has been shut down");
      return this.createResolvingCall(A, B, Q, I, G)
    }
    getOptions() {
      return this.options
    }
  }
  Ux0.InternalChannel = Ex0
})
// @from(Start 5023230, End 5024606)
yh1 = z((Mx0) => {
  Object.defineProperty(Mx0, "__esModule", {
    value: !0
  });
  Mx0.ChannelImplementation = void 0;
  var RG6 = us(),
    OG6 = rm1();
  class qx0 {
    constructor(A, B, Q) {
      if (typeof A !== "string") throw new TypeError("Channel target must be a string");
      if (!(B instanceof RG6.ChannelCredentials)) throw new TypeError("Channel credentials must be a ChannelCredentials object");
      if (Q) {
        if (typeof Q !== "object") throw new TypeError("Channel options must be an object")
      }
      this.internalChannel = new OG6.InternalChannel(A, B, Q)
    }
    close() {
      this.internalChannel.close()
    }
    getTarget() {
      return this.internalChannel.getTarget()
    }
    getConnectivityState(A) {
      return this.internalChannel.getConnectivityState(A)
    }
    watchConnectivityState(A, B, Q) {
      this.internalChannel.watchConnectivityState(A, B, Q)
    }
    getChannelzRef() {
      return this.internalChannel.getChannelzRef()
    }
    createCall(A, B, Q, I, G) {
      if (typeof A !== "string") throw new TypeError("Channel#createCall: method must be a string");
      if (!(typeof B === "number" || B instanceof Date)) throw new TypeError("Channel#createCall: deadline must be a number or Date");
      return this.internalChannel.createCall(A, B, Q, I, G)
    }
  }
  Mx0.ChannelImplementation = qx0
})
// @from(Start 5024612, End 5028727)
yx0 = z((_x0) => {
  Object.defineProperty(_x0, "__esModule", {
    value: !0
  });
  _x0.ServerDuplexStreamImpl = _x0.ServerWritableStreamImpl = _x0.ServerReadableStreamImpl = _x0.ServerUnaryCallImpl = void 0;
  _x0.serverErrorToStatus = em1;
  var TG6 = Z1("events"),
    om1 = Z1("stream"),
    tm1 = y6(),
    Rx0 = SZ();

  function em1(A, B) {
    var Q;
    let I = {
      code: tm1.Status.UNKNOWN,
      details: "message" in A ? A.message : "Unknown Error",
      metadata: (Q = B !== null && B !== void 0 ? B : A.metadata) !== null && Q !== void 0 ? Q : null
    };
    if ("code" in A && typeof A.code === "number" && Number.isInteger(A.code)) {
      if (I.code = A.code, "details" in A && typeof A.details === "string") I.details = A.details
    }
    return I
  }
  class Ox0 extends TG6.EventEmitter {
    constructor(A, B, Q, I) {
      super();
      this.path = A, this.call = B, this.metadata = Q, this.request = I, this.cancelled = !1
    }
    getPeer() {
      return this.call.getPeer()
    }
    sendMetadata(A) {
      this.call.sendMetadata(A)
    }
    getDeadline() {
      return this.call.getDeadline()
    }
    getPath() {
      return this.path
    }
    getHost() {
      return this.call.getHost()
    }
  }
  _x0.ServerUnaryCallImpl = Ox0;
  class Tx0 extends om1.Readable {
    constructor(A, B, Q) {
      super({
        objectMode: !0
      });
      this.path = A, this.call = B, this.metadata = Q, this.cancelled = !1
    }
    _read(A) {
      this.call.startRead()
    }
    getPeer() {
      return this.call.getPeer()
    }
    sendMetadata(A) {
      this.call.sendMetadata(A)
    }
    getDeadline() {
      return this.call.getDeadline()
    }
    getPath() {
      return this.path
    }
    getHost() {
      return this.call.getHost()
    }
  }
  _x0.ServerReadableStreamImpl = Tx0;
  class Px0 extends om1.Writable {
    constructor(A, B, Q, I) {
      super({
        objectMode: !0
      });
      this.path = A, this.call = B, this.metadata = Q, this.request = I, this.pendingStatus = {
        code: tm1.Status.OK,
        details: "OK"
      }, this.cancelled = !1, this.trailingMetadata = new Rx0.Metadata, this.on("error", (G) => {
        this.pendingStatus = em1(G), this.end()
      })
    }
    getPeer() {
      return this.call.getPeer()
    }
    sendMetadata(A) {
      this.call.sendMetadata(A)
    }
    getDeadline() {
      return this.call.getDeadline()
    }
    getPath() {
      return this.path
    }
    getHost() {
      return this.call.getHost()
    }
    _write(A, B, Q) {
      this.call.sendMessage(A, Q)
    }
    _final(A) {
      var B;
      A(null), this.call.sendStatus(Object.assign(Object.assign({}, this.pendingStatus), {
        metadata: (B = this.pendingStatus.metadata) !== null && B !== void 0 ? B : this.trailingMetadata
      }))
    }
    end(A) {
      if (A) this.trailingMetadata = A;
      return super.end()
    }
  }
  _x0.ServerWritableStreamImpl = Px0;
  class Sx0 extends om1.Duplex {
    constructor(A, B, Q) {
      super({
        objectMode: !0
      });
      this.path = A, this.call = B, this.metadata = Q, this.pendingStatus = {
        code: tm1.Status.OK,
        details: "OK"
      }, this.cancelled = !1, this.trailingMetadata = new Rx0.Metadata, this.on("error", (I) => {
        this.pendingStatus = em1(I), this.end()
      })
    }
    getPeer() {
      return this.call.getPeer()
    }
    sendMetadata(A) {
      this.call.sendMetadata(A)
    }
    getDeadline() {
      return this.call.getDeadline()
    }
    getPath() {
      return this.path
    }
    getHost() {
      return this.call.getHost()
    }
    _read(A) {
      this.call.startRead()
    }
    _write(A, B, Q) {
      this.call.sendMessage(A, Q)
    }
    _final(A) {
      var B;
      A(null), this.call.sendStatus(Object.assign(Object.assign({}, this.pendingStatus), {
        metadata: (B = this.pendingStatus.metadata) !== null && B !== void 0 ? B : this.trailingMetadata
      }))
    }
    end(A) {
      if (A) this.trailingMetadata = A;
      return super.end()
    }
  }
  _x0.ServerDuplexStreamImpl = Sx0
})
// @from(Start 5028733, End 5035993)
aD1 = z((kx0) => {
  Object.defineProperty(kx0, "__esModule", {
    value: !0
  });
  kx0.ServerCredentials = void 0;
  kx0.createCertificateProviderServerCredentials = yG6;
  kx0.createServerCredentialsWithInterceptors = kG6;
  var Ad1 = wh1();
  class Xh {
    constructor(A, B) {
      this.serverConstructorOptions = A, this.watchers = new Set, this.latestContextOptions = null, this.latestContextOptions = B !== null && B !== void 0 ? B : null
    }
    _addWatcher(A) {
      this.watchers.add(A)
    }
    _removeWatcher(A) {
      this.watchers.delete(A)
    }
    getWatcherCount() {
      return this.watchers.size
    }
    updateSecureContextOptions(A) {
      this.latestContextOptions = A;
      for (let B of this.watchers) B(this.latestContextOptions)
    }
    _isSecure() {
      return this.serverConstructorOptions !== null
    }
    _getSecureContextOptions() {
      return this.latestContextOptions
    }
    _getConstructorOptions() {
      return this.serverConstructorOptions
    }
    _getInterceptors() {
      return []
    }
    static createInsecure() {
      return new Bd1
    }
    static createSsl(A, B, Q = !1) {
      var I;
      if (A !== null && !Buffer.isBuffer(A)) throw new TypeError("rootCerts must be null or a Buffer");
      if (!Array.isArray(B)) throw new TypeError("keyCertPairs must be an array");
      if (typeof Q !== "boolean") throw new TypeError("checkClientCertificate must be a boolean");
      let G = [],
        Z = [];
      for (let D = 0; D < B.length; D++) {
        let Y = B[D];
        if (Y === null || typeof Y !== "object") throw new TypeError(`keyCertPair[${D}] must be an object`);
        if (!Buffer.isBuffer(Y.private_key)) throw new TypeError(`keyCertPair[${D}].private_key must be a Buffer`);
        if (!Buffer.isBuffer(Y.cert_chain)) throw new TypeError(`keyCertPair[${D}].cert_chain must be a Buffer`);
        G.push(Y.cert_chain), Z.push(Y.private_key)
      }
      return new Qd1({
        requestCert: Q,
        ciphers: Ad1.CIPHER_SUITES
      }, {
        ca: (I = A !== null && A !== void 0 ? A : Ad1.getDefaultRootsData()) !== null && I !== void 0 ? I : void 0,
        cert: G,
        key: Z
      })
    }
  }
  kx0.ServerCredentials = Xh;
  class Bd1 extends Xh {
    constructor() {
      super(null)
    }
    _getSettings() {
      return null
    }
    _equals(A) {
      return A instanceof Bd1
    }
  }
  class Qd1 extends Xh {
    constructor(A, B) {
      super(A, B);
      this.options = Object.assign(Object.assign({}, A), B)
    }
    _equals(A) {
      if (this === A) return !0;
      if (!(A instanceof Qd1)) return !1;
      if (Buffer.isBuffer(this.options.ca) && Buffer.isBuffer(A.options.ca)) {
        if (!this.options.ca.equals(A.options.ca)) return !1
      } else if (this.options.ca !== A.options.ca) return !1;
      if (Array.isArray(this.options.cert) && Array.isArray(A.options.cert)) {
        if (this.options.cert.length !== A.options.cert.length) return !1;
        for (let B = 0; B < this.options.cert.length; B++) {
          let Q = this.options.cert[B],
            I = A.options.cert[B];
          if (Buffer.isBuffer(Q) && Buffer.isBuffer(I)) {
            if (!Q.equals(I)) return !1
          } else if (Q !== I) return !1
        }
      } else if (this.options.cert !== A.options.cert) return !1;
      if (Array.isArray(this.options.key) && Array.isArray(A.options.key)) {
        if (this.options.key.length !== A.options.key.length) return !1;
        for (let B = 0; B < this.options.key.length; B++) {
          let Q = this.options.key[B],
            I = A.options.key[B];
          if (Buffer.isBuffer(Q) && Buffer.isBuffer(I)) {
            if (!Q.equals(I)) return !1
          } else if (Q !== I) return !1
        }
      } else if (this.options.key !== A.options.key) return !1;
      if (this.options.requestCert !== A.options.requestCert) return !1;
      return !0
    }
  }
  class Id1 extends Xh {
    constructor(A, B, Q) {
      super({
        requestCert: B !== null,
        rejectUnauthorized: Q,
        ciphers: Ad1.CIPHER_SUITES
      });
      this.identityCertificateProvider = A, this.caCertificateProvider = B, this.requireClientCertificate = Q, this.latestCaUpdate = null, this.latestIdentityUpdate = null, this.caCertificateUpdateListener = this.handleCaCertificateUpdate.bind(this), this.identityCertificateUpdateListener = this.handleIdentityCertitificateUpdate.bind(this)
    }
    _addWatcher(A) {
      var B;
      if (this.getWatcherCount() === 0)(B = this.caCertificateProvider) === null || B === void 0 || B.addCaCertificateListener(this.caCertificateUpdateListener), this.identityCertificateProvider.addIdentityCertificateListener(this.identityCertificateUpdateListener);
      super._addWatcher(A)
    }
    _removeWatcher(A) {
      var B;
      if (super._removeWatcher(A), this.getWatcherCount() === 0)(B = this.caCertificateProvider) === null || B === void 0 || B.removeCaCertificateListener(this.caCertificateUpdateListener), this.identityCertificateProvider.removeIdentityCertificateListener(this.identityCertificateUpdateListener)
    }
    _equals(A) {
      if (this === A) return !0;
      if (!(A instanceof Id1)) return !1;
      return this.caCertificateProvider === A.caCertificateProvider && this.identityCertificateProvider === A.identityCertificateProvider && this.requireClientCertificate === A.requireClientCertificate
    }
    calculateSecureContextOptions() {
      var A;
      if (this.latestIdentityUpdate === null) return null;
      if (this.caCertificateProvider !== null && this.latestCaUpdate === null) return null;
      return {
        ca: (A = this.latestCaUpdate) === null || A === void 0 ? void 0 : A.caCertificate,
        cert: [this.latestIdentityUpdate.certificate],
        key: [this.latestIdentityUpdate.privateKey]
      }
    }
    finalizeUpdate() {
      let A = this.calculateSecureContextOptions();
      this.updateSecureContextOptions(A)
    }
    handleCaCertificateUpdate(A) {
      this.latestCaUpdate = A, this.finalizeUpdate()
    }
    handleIdentityCertitificateUpdate(A) {
      this.latestIdentityUpdate = A, this.finalizeUpdate()
    }
  }

  function yG6(A, B, Q) {
    return new Id1(A, B, Q)
  }
  class Gd1 extends Xh {
    constructor(A, B) {
      super({});
      this.childCredentials = A, this.interceptors = B
    }
    _isSecure() {
      return this.childCredentials._isSecure()
    }
    _equals(A) {
      if (!(A instanceof Gd1)) return !1;
      if (!this.childCredentials._equals(A.childCredentials)) return !1;
      if (this.interceptors.length !== A.interceptors.length) return !1;
      for (let B = 0; B < this.interceptors.length; B++)
        if (this.interceptors[B] !== A.interceptors[B]) return !1;
      return !0
    }
    _getInterceptors() {
      return this.interceptors
    }
    _addWatcher(A) {
      this.childCredentials._addWatcher(A)
    }
    _removeWatcher(A) {
      this.childCredentials._removeWatcher(A)
    }
    _getConstructorOptions() {
      return this.childCredentials._getConstructorOptions()
    }
    _getSecureContextOptions() {
      return this.childCredentials._getSecureContextOptions()
    }
  }

  function kG6(A, B) {
    return new Gd1(A, B)
  }
})
// @from(Start 5035999, End 5054358)
Jd1 = z((nx0) => {
  Object.defineProperty(nx0, "__esModule", {
    value: !0
  });
  nx0.BaseServerInterceptingCall = nx0.ServerInterceptingCall = nx0.ResponderBuilder = nx0.ServerListenerBuilder = void 0;
  nx0.isInterceptingServerListener = bG6;
  nx0.getServerInterceptingCall = uG6;
  var Dd1 = SZ(),
    cY = y6(),
    Vh = Z1("http2"),
    fx0 = uZ1(),
    vx0 = Z1("zlib"),
    vG6 = xm1(),
    mx0 = GB(),
    dx0 = "server_call";

  function Ij(A) {
    mx0.trace(cY.LogVerbosity.DEBUG, dx0, A)
  }
  class ux0 {
    constructor() {
      this.metadata = void 0, this.message = void 0, this.halfClose = void 0, this.cancel = void 0
    }
    withOnReceiveMetadata(A) {
      return this.metadata = A, this
    }
    withOnReceiveMessage(A) {
      return this.message = A, this
    }
    withOnReceiveHalfClose(A) {
      return this.halfClose = A, this
    }
    withOnCancel(A) {
      return this.cancel = A, this
    }
    build() {
      return {
        onReceiveMetadata: this.metadata,
        onReceiveMessage: this.message,
        onReceiveHalfClose: this.halfClose,
        onCancel: this.cancel
      }
    }
  }
  nx0.ServerListenerBuilder = ux0;

  function bG6(A) {
    return A.onReceiveMetadata !== void 0 && A.onReceiveMetadata.length === 1
  }
  class px0 {
    constructor(A, B) {
      this.listener = A, this.nextListener = B, this.cancelled = !1, this.processingMetadata = !1, this.hasPendingMessage = !1, this.pendingMessage = null, this.processingMessage = !1, this.hasPendingHalfClose = !1
    }
    processPendingMessage() {
      if (this.hasPendingMessage) this.nextListener.onReceiveMessage(this.pendingMessage), this.pendingMessage = null, this.hasPendingMessage = !1
    }
    processPendingHalfClose() {
      if (this.hasPendingHalfClose) this.nextListener.onReceiveHalfClose(), this.hasPendingHalfClose = !1
    }
    onReceiveMetadata(A) {
      if (this.cancelled) return;
      this.processingMetadata = !0, this.listener.onReceiveMetadata(A, (B) => {
        if (this.processingMetadata = !1, this.cancelled) return;
        this.nextListener.onReceiveMetadata(B), this.processPendingMessage(), this.processPendingHalfClose()
      })
    }
    onReceiveMessage(A) {
      if (this.cancelled) return;
      this.processingMessage = !0, this.listener.onReceiveMessage(A, (B) => {
        if (this.processingMessage = !1, this.cancelled) return;
        if (this.processingMetadata) this.pendingMessage = B, this.hasPendingMessage = !0;
        else this.nextListener.onReceiveMessage(B), this.processPendingHalfClose()
      })
    }
    onReceiveHalfClose() {
      if (this.cancelled) return;
      this.listener.onReceiveHalfClose(() => {
        if (this.cancelled) return;
        if (this.processingMetadata || this.processingMessage) this.hasPendingHalfClose = !0;
        else this.nextListener.onReceiveHalfClose()
      })
    }
    onCancel() {
      this.cancelled = !0, this.listener.onCancel(), this.nextListener.onCancel()
    }
  }
  class cx0 {
    constructor() {
      this.start = void 0, this.metadata = void 0, this.message = void 0, this.status = void 0
    }
    withStart(A) {
      return this.start = A, this
    }
    withSendMetadata(A) {
      return this.metadata = A, this
    }
    withSendMessage(A) {
      return this.message = A, this
    }
    withSendStatus(A) {
      return this.status = A, this
    }
    build() {
      return {
        start: this.start,
        sendMetadata: this.metadata,
        sendMessage: this.message,
        sendStatus: this.status
      }
    }
  }
  nx0.ResponderBuilder = cx0;
  var sD1 = {
      onReceiveMetadata: (A, B) => {
        B(A)
      },
      onReceiveMessage: (A, B) => {
        B(A)
      },
      onReceiveHalfClose: (A) => {
        A()
      },
      onCancel: () => {}
    },
    rD1 = {
      start: (A) => {
        A()
      },
      sendMetadata: (A, B) => {
        B(A)
      },
      sendMessage: (A, B) => {
        B(A)
      },
      sendStatus: (A, B) => {
        B(A)
      }
    };
  class lx0 {
    constructor(A, B) {
      var Q, I, G, Z;
      this.nextCall = A, this.processingMetadata = !1, this.sentMetadata = !1, this.processingMessage = !1, this.pendingMessage = null, this.pendingMessageCallback = null, this.pendingStatus = null, this.responder = {
        start: (Q = B === null || B === void 0 ? void 0 : B.start) !== null && Q !== void 0 ? Q : rD1.start,
        sendMetadata: (I = B === null || B === void 0 ? void 0 : B.sendMetadata) !== null && I !== void 0 ? I : rD1.sendMetadata,
        sendMessage: (G = B === null || B === void 0 ? void 0 : B.sendMessage) !== null && G !== void 0 ? G : rD1.sendMessage,
        sendStatus: (Z = B === null || B === void 0 ? void 0 : B.sendStatus) !== null && Z !== void 0 ? Z : rD1.sendStatus
      }
    }
    processPendingMessage() {
      if (this.pendingMessageCallback) this.nextCall.sendMessage(this.pendingMessage, this.pendingMessageCallback), this.pendingMessage = null, this.pendingMessageCallback = null
    }
    processPendingStatus() {
      if (this.pendingStatus) this.nextCall.sendStatus(this.pendingStatus), this.pendingStatus = null
    }
    start(A) {
      this.responder.start((B) => {
        var Q, I, G, Z;
        let D = {
            onReceiveMetadata: (Q = B === null || B === void 0 ? void 0 : B.onReceiveMetadata) !== null && Q !== void 0 ? Q : sD1.onReceiveMetadata,
            onReceiveMessage: (I = B === null || B === void 0 ? void 0 : B.onReceiveMessage) !== null && I !== void 0 ? I : sD1.onReceiveMessage,
            onReceiveHalfClose: (G = B === null || B === void 0 ? void 0 : B.onReceiveHalfClose) !== null && G !== void 0 ? G : sD1.onReceiveHalfClose,
            onCancel: (Z = B === null || B === void 0 ? void 0 : B.onCancel) !== null && Z !== void 0 ? Z : sD1.onCancel
          },
          Y = new px0(D, A);
        this.nextCall.start(Y)
      })
    }
    sendMetadata(A) {
      this.processingMetadata = !0, this.sentMetadata = !0, this.responder.sendMetadata(A, (B) => {
        this.processingMetadata = !1, this.nextCall.sendMetadata(B), this.processPendingMessage(), this.processPendingStatus()
      })
    }
    sendMessage(A, B) {
      if (this.processingMessage = !0, !this.sentMetadata) this.sendMetadata(new Dd1.Metadata);
      this.responder.sendMessage(A, (Q) => {
        if (this.processingMessage = !1, this.processingMetadata) this.pendingMessage = Q, this.pendingMessageCallback = B;
        else this.nextCall.sendMessage(Q, B)
      })
    }
    sendStatus(A) {
      this.responder.sendStatus(A, (B) => {
        if (this.processingMetadata || this.processingMessage) this.pendingStatus = B;
        else this.nextCall.sendStatus(B)
      })
    }
    startRead() {
      this.nextCall.startRead()
    }
    getPeer() {
      return this.nextCall.getPeer()
    }
    getDeadline() {
      return this.nextCall.getDeadline()
    }
    getHost() {
      return this.nextCall.getHost()
    }
  }
  nx0.ServerInterceptingCall = lx0;
  var ix0 = "grpc-accept-encoding",
    Yd1 = "grpc-encoding",
    bx0 = "grpc-message",
    gx0 = "grpc-status",
    Zd1 = "grpc-timeout",
    gG6 = /(\d{1,8})\s*([HMSmun])/,
    hG6 = {
      H: 3600000,
      M: 60000,
      S: 1000,
      m: 1,
      u: 0.001,
      n: 0.000001
    },
    mG6 = {
      [ix0]: "identity,deflate,gzip",
      [Yd1]: "identity"
    },
    hx0 = {
      [Vh.constants.HTTP2_HEADER_STATUS]: Vh.constants.HTTP_STATUS_OK,
      [Vh.constants.HTTP2_HEADER_CONTENT_TYPE]: "application/grpc+proto"
    },
    dG6 = {
      waitForTrailers: !0
    };
  class Wd1 {
    constructor(A, B, Q, I, G) {
      var Z;
      if (this.stream = A, this.callEventTracker = Q, this.handler = I, this.listener = null, this.deadlineTimer = null, this.deadline = 1 / 0, this.maxSendMessageSize = cY.DEFAULT_MAX_SEND_MESSAGE_LENGTH, this.maxReceiveMessageSize = cY.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH, this.cancelled = !1, this.metadataSent = !1, this.wantTrailers = !1, this.cancelNotified = !1, this.incomingEncoding = "identity", this.readQueue = [], this.isReadPending = !1, this.receivedHalfClose = !1, this.streamEnded = !1, this.stream.once("error", (J) => {}), this.stream.once("close", () => {
          var J;
          if (Ij("Request to method " + ((J = this.handler) === null || J === void 0 ? void 0 : J.path) + " stream closed with rstCode " + this.stream.rstCode), this.callEventTracker && !this.streamEnded) this.streamEnded = !0, this.callEventTracker.onStreamEnd(!1), this.callEventTracker.onCallEnd({
            code: cY.Status.CANCELLED,
            details: "Stream closed before sending status",
            metadata: null
          });
          this.notifyOnCancel()
        }), this.stream.on("data", (J) => {
          this.handleDataFrame(J)
        }), this.stream.pause(), this.stream.on("end", () => {
          this.handleEndEvent()
        }), "grpc.max_send_message_length" in G) this.maxSendMessageSize = G["grpc.max_send_message_length"];
      if ("grpc.max_receive_message_length" in G) this.maxReceiveMessageSize = G["grpc.max_receive_message_length"];
      this.host = (Z = B[":authority"]) !== null && Z !== void 0 ? Z : B.host, this.decoder = new vG6.StreamDecoder(this.maxReceiveMessageSize);
      let D = Dd1.Metadata.fromHttp2Headers(B);
      if (mx0.isTracerEnabled(dx0)) Ij("Request to " + this.handler.path + " received headers " + JSON.stringify(D.toJSON()));
      let Y = D.get(Zd1);
      if (Y.length > 0) this.handleTimeoutHeader(Y[0]);
      let W = D.get(Yd1);
      if (W.length > 0) this.incomingEncoding = W[0];
      D.remove(Zd1), D.remove(Yd1), D.remove(ix0), D.remove(Vh.constants.HTTP2_HEADER_ACCEPT_ENCODING), D.remove(Vh.constants.HTTP2_HEADER_TE), D.remove(Vh.constants.HTTP2_HEADER_CONTENT_TYPE), this.metadata = D
    }
    handleTimeoutHeader(A) {
      let B = A.toString().match(gG6);
      if (B === null) {
        let G = {
          code: cY.Status.INTERNAL,
          details: `Invalid ${Zd1} value "${A}"`,
          metadata: null
        };
        process.nextTick(() => {
          this.sendStatus(G)
        });
        return
      }
      let Q = +B[1] * hG6[B[2]] | 0,
        I = new Date;
      this.deadline = I.setMilliseconds(I.getMilliseconds() + Q), this.deadlineTimer = setTimeout(() => {
        let G = {
          code: cY.Status.DEADLINE_EXCEEDED,
          details: "Deadline exceeded",
          metadata: null
        };
        this.sendStatus(G)
      }, Q)
    }
    checkCancelled() {
      if (!this.cancelled && (this.stream.destroyed || this.stream.closed)) this.notifyOnCancel(), this.cancelled = !0;
      return this.cancelled
    }
    notifyOnCancel() {
      if (this.cancelNotified) return;
      if (this.cancelNotified = !0, this.cancelled = !0, process.nextTick(() => {
          var A;
          (A = this.listener) === null || A === void 0 || A.onCancel()
        }), this.deadlineTimer) clearTimeout(this.deadlineTimer);
      this.stream.resume()
    }
    maybeSendMetadata() {
      if (!this.metadataSent) this.sendMetadata(new Dd1.Metadata)
    }
    serializeMessage(A) {
      let B = this.handler.serialize(A),
        Q = B.byteLength,
        I = Buffer.allocUnsafe(Q + 5);
      return I.writeUInt8(0, 0), I.writeUInt32BE(Q, 1), B.copy(I, 5), I
    }
    decompressMessage(A, B) {
      let Q = A.subarray(5);
      if (B === "identity") return Q;
      else if (B === "deflate" || B === "gzip") {
        let I;
        if (B === "deflate") I = vx0.createInflate();
        else I = vx0.createGunzip();
        return new Promise((G, Z) => {
          let D = 0,
            Y = [];
          I.on("data", (W) => {
            if (Y.push(W), D += W.byteLength, this.maxReceiveMessageSize !== -1 && D > this.maxReceiveMessageSize) I.destroy(), Z({
              code: cY.Status.RESOURCE_EXHAUSTED,
              details: `Received message that decompresses to a size larger than ${this.maxReceiveMessageSize}`
            })
          }), I.on("end", () => {
            G(Buffer.concat(Y))
          }), I.write(Q), I.end()
        })
      } else return Promise.reject({
        code: cY.Status.UNIMPLEMENTED,
        details: `Received message compressed with unsupported encoding "${B}"`
      })
    }
    async decompressAndMaybePush(A) {
      if (A.type !== "COMPRESSED") throw new Error(`Invalid queue entry type: ${A.type}`);
      let Q = A.compressedMessage.readUInt8(0) === 1 ? this.incomingEncoding : "identity",
        I;
      try {
        I = await this.decompressMessage(A.compressedMessage, Q)
      } catch (G) {
        this.sendStatus(G);
        return
      }
      try {
        A.parsedMessage = this.handler.deserialize(I)
      } catch (G) {
        this.sendStatus({
          code: cY.Status.INTERNAL,
          details: `Error deserializing request: ${G.message}`
        });
        return
      }
      A.type = "READABLE", this.maybePushNextMessage()
    }
    maybePushNextMessage() {
      if (this.listener && this.isReadPending && this.readQueue.length > 0 && this.readQueue[0].type !== "COMPRESSED") {
        this.isReadPending = !1;
        let A = this.readQueue.shift();
        if (A.type === "READABLE") this.listener.onReceiveMessage(A.parsedMessage);
        else this.listener.onReceiveHalfClose()
      }
    }
    handleDataFrame(A) {
      var B;
      if (this.checkCancelled()) return;
      Ij("Request to " + this.handler.path + " received data frame of size " + A.length);
      let Q;
      try {
        Q = this.decoder.write(A)
      } catch (I) {
        this.sendStatus({
          code: cY.Status.RESOURCE_EXHAUSTED,
          details: I.message
        });
        return
      }
      for (let I of Q) {
        this.stream.pause();
        let G = {
          type: "COMPRESSED",
          compressedMessage: I,
          parsedMessage: null
        };
        this.readQueue.push(G), this.decompressAndMaybePush(G), (B = this.callEventTracker) === null || B === void 0 || B.addMessageReceived()
      }
    }
    handleEndEvent() {
      this.readQueue.push({
        type: "HALF_CLOSE",
        compressedMessage: null,
        parsedMessage: null
      }), this.receivedHalfClose = !0, this.maybePushNextMessage()
    }
    start(A) {
      if (Ij("Request to " + this.handler.path + " start called"), this.checkCancelled()) return;
      this.listener = A, A.onReceiveMetadata(this.metadata)
    }
    sendMetadata(A) {
      if (this.checkCancelled()) return;
      if (this.metadataSent) return;
      this.metadataSent = !0;
      let B = A ? A.toHttp2Headers() : null,
        Q = Object.assign(Object.assign(Object.assign({}, hx0), mG6), B);
      this.stream.respond(Q, dG6)
    }
    sendMessage(A, B) {
      if (this.checkCancelled()) return;
      let Q;
      try {
        Q = this.serializeMessage(A)
      } catch (I) {
        this.sendStatus({
          code: cY.Status.INTERNAL,
          details: `Error serializing response: ${fx0.getErrorMessage(I)}`,
          metadata: null
        });
        return
      }
      if (this.maxSendMessageSize !== -1 && Q.length - 5 > this.maxSendMessageSize) {
        this.sendStatus({
          code: cY.Status.RESOURCE_EXHAUSTED,
          details: `Sent message larger than max (${Q.length} vs. ${this.maxSendMessageSize})`,
          metadata: null
        });
        return
      }
      this.maybeSendMetadata(), Ij("Request to " + this.handler.path + " sent data frame of size " + Q.length), this.stream.write(Q, (I) => {
        var G;
        if (I) {
          this.sendStatus({
            code: cY.Status.INTERNAL,
            details: `Error writing message: ${fx0.getErrorMessage(I)}`,
            metadata: null
          });
          return
        }(G = this.callEventTracker) === null || G === void 0 || G.addMessageSent(), B()
      })
    }
    sendStatus(A) {
      var B, Q;
      if (this.checkCancelled()) return;
      if (Ij("Request to method " + ((B = this.handler) === null || B === void 0 ? void 0 : B.path) + " ended with status code: " + cY.Status[A.code] + " details: " + A.details), this.metadataSent)
        if (!this.wantTrailers) this.wantTrailers = !0, this.stream.once("wantTrailers", () => {
          var I;
          if (this.callEventTracker && !this.streamEnded) this.streamEnded = !0, this.callEventTracker.onStreamEnd(!0), this.callEventTracker.onCallEnd(A);
          let G = Object.assign({
            [gx0]: A.code,
            [bx0]: encodeURI(A.details)
          }, (I = A.metadata) === null || I === void 0 ? void 0 : I.toHttp2Headers());
          this.stream.sendTrailers(G), this.notifyOnCancel()
        }), this.stream.end();
        else this.notifyOnCancel();
      else {
        if (this.callEventTracker && !this.streamEnded) this.streamEnded = !0, this.callEventTracker.onStreamEnd(!0), this.callEventTracker.onCallEnd(A);
        let I = Object.assign(Object.assign({
          [gx0]: A.code,
          [bx0]: encodeURI(A.details)
        }, hx0), (Q = A.metadata) === null || Q === void 0 ? void 0 : Q.toHttp2Headers());
        this.stream.respond(I, {
          endStream: !0
        }), this.notifyOnCancel()
      }
    }
    startRead() {
      if (Ij("Request to " + this.handler.path + " startRead called"), this.checkCancelled()) return;
      if (this.isReadPending = !0, this.readQueue.length === 0) {
        if (!this.receivedHalfClose) this.stream.resume()
      } else this.maybePushNextMessage()
    }
    getPeer() {
      var A;
      let B = (A = this.stream.session) === null || A === void 0 ? void 0 : A.socket;
      if (B === null || B === void 0 ? void 0 : B.remoteAddress)
        if (B.remotePort) return `${B.remoteAddress}:${B.remotePort}`;
        else return B.remoteAddress;
      else return "unknown"
    }
    getDeadline() {
      return this.deadline
    }
    getHost() {
      return this.host
    }
  }
  nx0.BaseServerInterceptingCall = Wd1;

  function uG6(A, B, Q, I, G, Z) {
    let D = {
        path: G.path,
        requestStream: G.type === "clientStream" || G.type === "bidi",
        responseStream: G.type === "serverStream" || G.type === "bidi",
        requestDeserialize: G.deserialize,
        responseSerialize: G.serialize
      },
      Y = new Wd1(B, Q, I, G, Z);
    return A.reduce((W, J) => {
      return J(D, W)
    }, Y)
  }
})