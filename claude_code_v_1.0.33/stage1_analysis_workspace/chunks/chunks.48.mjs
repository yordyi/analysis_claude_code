
// @from(Start 4897469, End 4911229)
Aj = z((ay0) => {
  var __dirname = "/home/runner/work/claude-cli-internal/claude-cli-internal/node_modules/@grpc/grpc-js/build/src";
  Object.defineProperty(ay0, "__esModule", {
    value: !0
  });
  ay0.registerChannelzSocket = ay0.registerChannelzServer = ay0.registerChannelzSubchannel = ay0.registerChannelzChannel = ay0.ChannelzCallTrackerStub = ay0.ChannelzCallTracker = ay0.ChannelzChildrenTrackerStub = ay0.ChannelzChildrenTracker = ay0.ChannelzTrace = ay0.ChannelzTraceStub = void 0;
  ay0.unregisterChannelzRef = rQ6;
  ay0.getChannelzHandlers = iy0;
  ay0.getChannelzServiceDefinition = ny0;
  ay0.setup = Y76;
  var _D1 = Z1("net"),
    e_ = Z_0(),
    Jr = TX(),
    Fr = y6(),
    iQ6 = PX(),
    nQ6 = ID1(),
    aQ6 = xh1();

  function qm1(A) {
    return {
      channel_id: A.id,
      name: A.name
    }
  }

  function Mm1(A) {
    return {
      subchannel_id: A.id,
      name: A.name
    }
  }

  function sQ6(A) {
    return {
      server_id: A.id
    }
  }

  function jD1(A) {
    return {
      socket_id: A.id,
      name: A.name
    }
  }
  var fy0 = 32,
    Lm1 = 100;
  class hy0 {
    constructor() {
      this.events = [], this.creationTimestamp = new Date, this.eventsLogged = 0
    }
    addTrace() {}
    getTraceMessage() {
      return {
        creation_timestamp: Cw(this.creationTimestamp),
        num_events_logged: this.eventsLogged,
        events: []
      }
    }
  }
  ay0.ChannelzTraceStub = hy0;
  class my0 {
    constructor() {
      this.events = [], this.eventsLogged = 0, this.creationTimestamp = new Date
    }
    addTrace(A, B, Q) {
      let I = new Date;
      if (this.events.push({
          description: B,
          severity: A,
          timestamp: I,
          childChannel: (Q === null || Q === void 0 ? void 0 : Q.kind) === "channel" ? Q : void 0,
          childSubchannel: (Q === null || Q === void 0 ? void 0 : Q.kind) === "subchannel" ? Q : void 0
        }), this.events.length >= fy0 * 2) this.events = this.events.slice(fy0);
      this.eventsLogged += 1
    }
    getTraceMessage() {
      return {
        creation_timestamp: Cw(this.creationTimestamp),
        num_events_logged: this.eventsLogged,
        events: this.events.map((A) => {
          return {
            description: A.description,
            severity: A.severity,
            timestamp: Cw(A.timestamp),
            channel_ref: A.childChannel ? qm1(A.childChannel) : null,
            subchannel_ref: A.childSubchannel ? Mm1(A.childSubchannel) : null
          }
        })
      }
    }
  }
  ay0.ChannelzTrace = my0;
  class Rm1 {
    constructor() {
      this.channelChildren = new e_.OrderedMap, this.subchannelChildren = new e_.OrderedMap, this.socketChildren = new e_.OrderedMap, this.trackerMap = {
        ["channel"]: this.channelChildren,
        ["subchannel"]: this.subchannelChildren,
        ["socket"]: this.socketChildren
      }
    }
    refChild(A) {
      let B = this.trackerMap[A.kind],
        Q = B.find(A.id);
      if (Q.equals(B.end())) B.setElement(A.id, {
        ref: A,
        count: 1
      }, Q);
      else Q.pointer[1].count += 1
    }
    unrefChild(A) {
      let B = this.trackerMap[A.kind],
        Q = B.getElementByKey(A.id);
      if (Q !== void 0) {
        if (Q.count -= 1, Q.count === 0) B.eraseElementByKey(A.id)
      }
    }
    getChildLists() {
      return {
        channels: this.channelChildren,
        subchannels: this.subchannelChildren,
        sockets: this.socketChildren
      }
    }
  }
  ay0.ChannelzChildrenTracker = Rm1;
  class dy0 extends Rm1 {
    refChild() {}
    unrefChild() {}
  }
  ay0.ChannelzChildrenTrackerStub = dy0;
  class Om1 {
    constructor() {
      this.callsStarted = 0, this.callsSucceeded = 0, this.callsFailed = 0, this.lastCallStartedTimestamp = null
    }
    addCallStarted() {
      this.callsStarted += 1, this.lastCallStartedTimestamp = new Date
    }
    addCallSucceeded() {
      this.callsSucceeded += 1
    }
    addCallFailed() {
      this.callsFailed += 1
    }
  }
  ay0.ChannelzCallTracker = Om1;
  class uy0 extends Om1 {
    addCallStarted() {}
    addCallSucceeded() {}
    addCallFailed() {}
  }
  ay0.ChannelzCallTrackerStub = uy0;
  var yN = {
      ["channel"]: new e_.OrderedMap,
      ["subchannel"]: new e_.OrderedMap,
      ["server"]: new e_.OrderedMap,
      ["socket"]: new e_.OrderedMap
    },
    yD1 = (A) => {
      let B = 1;

      function Q() {
        return B++
      }
      let I = yN[A];
      return (G, Z, D) => {
        let Y = Q(),
          W = {
            id: Y,
            name: G,
            kind: A
          };
        if (D) I.setElement(Y, {
          ref: W,
          getInfo: Z
        });
        return W
      }
    };
  ay0.registerChannelzChannel = yD1("channel");
  ay0.registerChannelzSubchannel = yD1("subchannel");
  ay0.registerChannelzServer = yD1("server");
  ay0.registerChannelzSocket = yD1("socket");

  function rQ6(A) {
    yN[A.kind].eraseElementByKey(A.id)
  }

  function oQ6(A) {
    let B = Number.parseInt(A, 16);
    return [B / 256 | 0, B % 256]
  }

  function vy0(A) {
    if (A === "") return [];
    let B = A.split(":").map((I) => oQ6(I));
    return [].concat(...B)
  }

  function tQ6(A) {
    return _D1.isIPv6(A) && A.toLowerCase().startsWith("::ffff:") && _D1.isIPv4(A.substring(7))
  }

  function by0(A) {
    return Buffer.from(Uint8Array.from(A.split(".").map((B) => Number.parseInt(B))))
  }

  function eQ6(A) {
    if (_D1.isIPv4(A)) return by0(A);
    else if (tQ6(A)) return by0(A.substring(7));
    else if (_D1.isIPv6(A)) {
      let B, Q, I = A.indexOf("::");
      if (I === -1) B = A, Q = "";
      else B = A.substring(0, I), Q = A.substring(I + 2);
      let G = Buffer.from(vy0(B)),
        Z = Buffer.from(vy0(Q)),
        D = Buffer.alloc(16 - G.length - Z.length, 0);
      return Buffer.concat([G, D, Z])
    } else return null
  }

  function py0(A) {
    switch (A) {
      case Jr.ConnectivityState.CONNECTING:
        return {
          state: "CONNECTING"
        };
      case Jr.ConnectivityState.IDLE:
        return {
          state: "IDLE"
        };
      case Jr.ConnectivityState.READY:
        return {
          state: "READY"
        };
      case Jr.ConnectivityState.SHUTDOWN:
        return {
          state: "SHUTDOWN"
        };
      case Jr.ConnectivityState.TRANSIENT_FAILURE:
        return {
          state: "TRANSIENT_FAILURE"
        };
      default:
        return {
          state: "UNKNOWN"
        }
    }
  }

  function Cw(A) {
    if (!A) return null;
    let B = A.getTime();
    return {
      seconds: B / 1000 | 0,
      nanos: B % 1000 * 1e6
    }
  }

  function cy0(A) {
    let B = A.getInfo(),
      Q = [],
      I = [];
    return B.children.channels.forEach((G) => {
      Q.push(qm1(G[1].ref))
    }), B.children.subchannels.forEach((G) => {
      I.push(Mm1(G[1].ref))
    }), {
      ref: qm1(A.ref),
      data: {
        target: B.target,
        state: py0(B.state),
        calls_started: B.callTracker.callsStarted,
        calls_succeeded: B.callTracker.callsSucceeded,
        calls_failed: B.callTracker.callsFailed,
        last_call_started_timestamp: Cw(B.callTracker.lastCallStartedTimestamp),
        trace: B.trace.getTraceMessage()
      },
      channel_ref: Q,
      subchannel_ref: I
    }
  }

  function A76(A, B) {
    let Q = parseInt(A.request.channel_id, 10),
      I = yN.channel.getElementByKey(Q);
    if (I === void 0) {
      B({
        code: Fr.Status.NOT_FOUND,
        details: "No channel data found for id " + Q
      });
      return
    }
    B(null, {
      channel: cy0(I)
    })
  }

  function B76(A, B) {
    let Q = parseInt(A.request.max_results, 10) || Lm1,
      I = [],
      G = parseInt(A.request.start_channel_id, 10),
      Z = yN.channel,
      D;
    for (D = Z.lowerBound(G); !D.equals(Z.end()) && I.length < Q; D = D.next()) I.push(cy0(D.pointer[1]));
    B(null, {
      channel: I,
      end: D.equals(Z.end())
    })
  }

  function ly0(A) {
    let B = A.getInfo(),
      Q = [];
    return B.listenerChildren.sockets.forEach((I) => {
      Q.push(jD1(I[1].ref))
    }), {
      ref: sQ6(A.ref),
      data: {
        calls_started: B.callTracker.callsStarted,
        calls_succeeded: B.callTracker.callsSucceeded,
        calls_failed: B.callTracker.callsFailed,
        last_call_started_timestamp: Cw(B.callTracker.lastCallStartedTimestamp),
        trace: B.trace.getTraceMessage()
      },
      listen_socket: Q
    }
  }

  function Q76(A, B) {
    let Q = parseInt(A.request.server_id, 10),
      G = yN.server.getElementByKey(Q);
    if (G === void 0) {
      B({
        code: Fr.Status.NOT_FOUND,
        details: "No server data found for id " + Q
      });
      return
    }
    B(null, {
      server: ly0(G)
    })
  }

  function I76(A, B) {
    let Q = parseInt(A.request.max_results, 10) || Lm1,
      I = parseInt(A.request.start_server_id, 10),
      G = yN.server,
      Z = [],
      D;
    for (D = G.lowerBound(I); !D.equals(G.end()) && Z.length < Q; D = D.next()) Z.push(ly0(D.pointer[1]));
    B(null, {
      server: Z,
      end: D.equals(G.end())
    })
  }

  function G76(A, B) {
    let Q = parseInt(A.request.subchannel_id, 10),
      I = yN.subchannel.getElementByKey(Q);
    if (I === void 0) {
      B({
        code: Fr.Status.NOT_FOUND,
        details: "No subchannel data found for id " + Q
      });
      return
    }
    let G = I.getInfo(),
      Z = [];
    G.children.sockets.forEach((Y) => {
      Z.push(jD1(Y[1].ref))
    });
    let D = {
      ref: Mm1(I.ref),
      data: {
        target: G.target,
        state: py0(G.state),
        calls_started: G.callTracker.callsStarted,
        calls_succeeded: G.callTracker.callsSucceeded,
        calls_failed: G.callTracker.callsFailed,
        last_call_started_timestamp: Cw(G.callTracker.lastCallStartedTimestamp),
        trace: G.trace.getTraceMessage()
      },
      socket_ref: Z
    };
    B(null, {
      subchannel: D
    })
  }

  function gy0(A) {
    var B;
    if (iQ6.isTcpSubchannelAddress(A)) return {
      address: "tcpip_address",
      tcpip_address: {
        ip_address: (B = eQ6(A.host)) !== null && B !== void 0 ? B : void 0,
        port: A.port
      }
    };
    else return {
      address: "uds_address",
      uds_address: {
        filename: A.path
      }
    }
  }

  function Z76(A, B) {
    var Q, I, G, Z, D;
    let Y = parseInt(A.request.socket_id, 10),
      W = yN.socket.getElementByKey(Y);
    if (W === void 0) {
      B({
        code: Fr.Status.NOT_FOUND,
        details: "No socket data found for id " + Y
      });
      return
    }
    let J = W.getInfo(),
      F = J.security ? {
        model: "tls",
        tls: {
          cipher_suite: J.security.cipherSuiteStandardName ? "standard_name" : "other_name",
          standard_name: (Q = J.security.cipherSuiteStandardName) !== null && Q !== void 0 ? Q : void 0,
          other_name: (I = J.security.cipherSuiteOtherName) !== null && I !== void 0 ? I : void 0,
          local_certificate: (G = J.security.localCertificate) !== null && G !== void 0 ? G : void 0,
          remote_certificate: (Z = J.security.remoteCertificate) !== null && Z !== void 0 ? Z : void 0
        }
      } : null,
      X = {
        ref: jD1(W.ref),
        local: J.localAddress ? gy0(J.localAddress) : null,
        remote: J.remoteAddress ? gy0(J.remoteAddress) : null,
        remote_name: (D = J.remoteName) !== null && D !== void 0 ? D : void 0,
        security: F,
        data: {
          keep_alives_sent: J.keepAlivesSent,
          streams_started: J.streamsStarted,
          streams_succeeded: J.streamsSucceeded,
          streams_failed: J.streamsFailed,
          last_local_stream_created_timestamp: Cw(J.lastLocalStreamCreatedTimestamp),
          last_remote_stream_created_timestamp: Cw(J.lastRemoteStreamCreatedTimestamp),
          messages_received: J.messagesReceived,
          messages_sent: J.messagesSent,
          last_message_received_timestamp: Cw(J.lastMessageReceivedTimestamp),
          last_message_sent_timestamp: Cw(J.lastMessageSentTimestamp),
          local_flow_control_window: J.localFlowControlWindow ? {
            value: J.localFlowControlWindow
          } : null,
          remote_flow_control_window: J.remoteFlowControlWindow ? {
            value: J.remoteFlowControlWindow
          } : null
        }
      };
    B(null, {
      socket: X
    })
  }

  function D76(A, B) {
    let Q = parseInt(A.request.server_id, 10),
      I = yN.server.getElementByKey(Q);
    if (I === void 0) {
      B({
        code: Fr.Status.NOT_FOUND,
        details: "No server data found for id " + Q
      });
      return
    }
    let G = parseInt(A.request.start_socket_id, 10),
      Z = parseInt(A.request.max_results, 10) || Lm1,
      Y = I.getInfo().sessionChildren.sockets,
      W = [],
      J;
    for (J = Y.lowerBound(G); !J.equals(Y.end()) && W.length < Z; J = J.next()) W.push(jD1(J.pointer[1].ref));
    B(null, {
      socket_ref: W,
      end: J.equals(Y.end())
    })
  }

  function iy0() {
    return {
      GetChannel: A76,
      GetTopChannels: B76,
      GetServer: Q76,
      GetServers: I76,
      GetSubchannel: G76,
      GetSocket: Z76,
      GetServerSockets: D76
    }
  }
  var SD1 = null;

  function ny0() {
    if (SD1) return SD1;
    let A = xy0().loadSync,
      B = A("channelz.proto", {
        keepCase: !0,
        longs: String,
        enums: String,
        defaults: !0,
        oneofs: !0,
        includeDirs: [`${__dirname}/../../proto`]
      });
    return SD1 = aQ6.loadPackageDefinition(B).grpc.channelz.v1.Channelz.service, SD1
  }

  function Y76() {
    nQ6.registerAdminService(ny0, iy0)
  }
})
// @from(Start 4911235, End 4919372)
ey0 = z((oy0) => {
  Object.defineProperty(oy0, "__esModule", {
    value: !0
  });
  oy0.Subchannel = void 0;
  var $8 = TX(),
    $76 = cs(),
    Tm1 = GB(),
    kD1 = y6(),
    q76 = uY(),
    M76 = PX(),
    Kw = Aj(),
    L76 = "subchannel",
    R76 = 2147483647;
  class ry0 {
    constructor(A, B, Q, I, G) {
      var Z;
      this.channelTarget = A, this.subchannelAddress = B, this.options = Q, this.connector = G, this.connectivityState = $8.ConnectivityState.IDLE, this.transport = null, this.continueConnecting = !1, this.stateListeners = new Set, this.refcount = 0, this.channelzEnabled = !0;
      let D = {
        initialDelay: Q["grpc.initial_reconnect_backoff_ms"],
        maxDelay: Q["grpc.max_reconnect_backoff_ms"]
      };
      if (this.backoffTimeout = new $76.BackoffTimeout(() => {
          this.handleBackoffTimer()
        }, D), this.backoffTimeout.unref(), this.subchannelAddressString = M76.subchannelAddressToString(B), this.keepaliveTime = (Z = Q["grpc.keepalive_time_ms"]) !== null && Z !== void 0 ? Z : -1, Q["grpc.enable_channelz"] === 0) this.channelzEnabled = !1, this.channelzTrace = new Kw.ChannelzTraceStub, this.callTracker = new Kw.ChannelzCallTrackerStub, this.childrenTracker = new Kw.ChannelzChildrenTrackerStub, this.streamTracker = new Kw.ChannelzCallTrackerStub;
      else this.channelzTrace = new Kw.ChannelzTrace, this.callTracker = new Kw.ChannelzCallTracker, this.childrenTracker = new Kw.ChannelzChildrenTracker, this.streamTracker = new Kw.ChannelzCallTracker;
      this.channelzRef = Kw.registerChannelzSubchannel(this.subchannelAddressString, () => this.getChannelzInfo(), this.channelzEnabled), this.channelzTrace.addTrace("CT_INFO", "Subchannel created"), this.trace("Subchannel constructed with options " + JSON.stringify(Q, void 0, 2)), this.secureConnector = I._createSecureConnector(A, Q)
    }
    getChannelzInfo() {
      return {
        state: this.connectivityState,
        trace: this.channelzTrace,
        callTracker: this.callTracker,
        children: this.childrenTracker.getChildLists(),
        target: this.subchannelAddressString
      }
    }
    trace(A) {
      Tm1.trace(kD1.LogVerbosity.DEBUG, L76, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
    }
    refTrace(A) {
      Tm1.trace(kD1.LogVerbosity.DEBUG, "subchannel_refcount", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
    }
    handleBackoffTimer() {
      if (this.continueConnecting) this.transitionToState([$8.ConnectivityState.TRANSIENT_FAILURE], $8.ConnectivityState.CONNECTING);
      else this.transitionToState([$8.ConnectivityState.TRANSIENT_FAILURE], $8.ConnectivityState.IDLE)
    }
    startBackoff() {
      this.backoffTimeout.runOnce()
    }
    stopBackoff() {
      this.backoffTimeout.stop(), this.backoffTimeout.reset()
    }
    startConnectingInternal() {
      let A = this.options;
      if (A["grpc.keepalive_time_ms"]) {
        let B = Math.min(this.keepaliveTime, R76);
        A = Object.assign(Object.assign({}, A), {
          "grpc.keepalive_time_ms": B
        })
      }
      this.connector.connect(this.subchannelAddress, this.secureConnector, A).then((B) => {
        if (this.transitionToState([$8.ConnectivityState.CONNECTING], $8.ConnectivityState.READY)) {
          if (this.transport = B, this.channelzEnabled) this.childrenTracker.refChild(B.getChannelzRef());
          B.addDisconnectListener((Q) => {
            if (this.transitionToState([$8.ConnectivityState.READY], $8.ConnectivityState.IDLE), Q && this.keepaliveTime > 0) this.keepaliveTime *= 2, Tm1.log(kD1.LogVerbosity.ERROR, `Connection to ${q76.uriToString(this.channelTarget)} at ${this.subchannelAddressString} rejected by server because of excess pings. Increasing ping interval to ${this.keepaliveTime} ms`)
          })
        } else B.shutdown()
      }, (B) => {
        this.transitionToState([$8.ConnectivityState.CONNECTING], $8.ConnectivityState.TRANSIENT_FAILURE, `${B}`)
      })
    }
    transitionToState(A, B, Q) {
      var I, G;
      if (A.indexOf(this.connectivityState) === -1) return !1;
      if (Q) this.trace($8.ConnectivityState[this.connectivityState] + " -> " + $8.ConnectivityState[B] + ' with error "' + Q + '"');
      else this.trace($8.ConnectivityState[this.connectivityState] + " -> " + $8.ConnectivityState[B]);
      if (this.channelzEnabled) this.channelzTrace.addTrace("CT_INFO", "Connectivity state change to " + $8.ConnectivityState[B]);
      let Z = this.connectivityState;
      switch (this.connectivityState = B, B) {
        case $8.ConnectivityState.READY:
          this.stopBackoff();
          break;
        case $8.ConnectivityState.CONNECTING:
          this.startBackoff(), this.startConnectingInternal(), this.continueConnecting = !1;
          break;
        case $8.ConnectivityState.TRANSIENT_FAILURE:
          if (this.channelzEnabled && this.transport) this.childrenTracker.unrefChild(this.transport.getChannelzRef());
          if ((I = this.transport) === null || I === void 0 || I.shutdown(), this.transport = null, !this.backoffTimeout.isRunning()) process.nextTick(() => {
            this.handleBackoffTimer()
          });
          break;
        case $8.ConnectivityState.IDLE:
          if (this.channelzEnabled && this.transport) this.childrenTracker.unrefChild(this.transport.getChannelzRef());
          (G = this.transport) === null || G === void 0 || G.shutdown(), this.transport = null;
          break;
        default:
          throw new Error(`Invalid state: unknown ConnectivityState ${B}`)
      }
      for (let D of this.stateListeners) D(this, Z, B, this.keepaliveTime, Q);
      return !0
    }
    ref() {
      this.refTrace("refcount " + this.refcount + " -> " + (this.refcount + 1)), this.refcount += 1
    }
    unref() {
      if (this.refTrace("refcount " + this.refcount + " -> " + (this.refcount - 1)), this.refcount -= 1, this.refcount === 0) this.channelzTrace.addTrace("CT_INFO", "Shutting down"), Kw.unregisterChannelzRef(this.channelzRef), this.secureConnector.destroy(), process.nextTick(() => {
        this.transitionToState([$8.ConnectivityState.CONNECTING, $8.ConnectivityState.READY], $8.ConnectivityState.IDLE)
      })
    }
    unrefIfOneRef() {
      if (this.refcount === 1) return this.unref(), !0;
      return !1
    }
    createCall(A, B, Q, I) {
      if (!this.transport) throw new Error("Cannot create call, subchannel not READY");
      let G;
      if (this.channelzEnabled) this.callTracker.addCallStarted(), this.streamTracker.addCallStarted(), G = {
        onCallEnd: (Z) => {
          if (Z.code === kD1.Status.OK) this.callTracker.addCallSucceeded();
          else this.callTracker.addCallFailed()
        }
      };
      else G = {};
      return this.transport.createCall(A, B, Q, I, G)
    }
    startConnecting() {
      process.nextTick(() => {
        if (!this.transitionToState([$8.ConnectivityState.IDLE], $8.ConnectivityState.CONNECTING)) {
          if (this.connectivityState === $8.ConnectivityState.TRANSIENT_FAILURE) this.continueConnecting = !0
        }
      })
    }
    getConnectivityState() {
      return this.connectivityState
    }
    addConnectivityStateListener(A) {
      this.stateListeners.add(A)
    }
    removeConnectivityStateListener(A) {
      this.stateListeners.delete(A)
    }
    resetBackoff() {
      process.nextTick(() => {
        this.backoffTimeout.reset(), this.transitionToState([$8.ConnectivityState.TRANSIENT_FAILURE], $8.ConnectivityState.CONNECTING)
      })
    }
    getAddress() {
      return this.subchannelAddressString
    }
    getChannelzRef() {
      return this.channelzRef
    }
    isHealthy() {
      return !0
    }
    addHealthStateWatcher(A) {}
    removeHealthStateWatcher(A) {}
    getRealSubchannel() {
      return this
    }
    realSubchannelEquals(A) {
      return A.getRealSubchannel() === this
    }
    throttleKeepalive(A) {
      if (A > this.keepaliveTime) this.keepaliveTime = A
    }
    getCallCredentials() {
      return this.secureConnector.getCallCredentials()
    }
  }
  oy0.Subchannel = ry0
})
// @from(Start 4919378, End 4919680)
Qk0 = z((Ak0) => {
  var Pm1;
  Object.defineProperty(Ak0, "__esModule", {
    value: !0
  });
  Ak0.GRPC_NODE_USE_ALTERNATIVE_RESOLVER = void 0;
  Ak0.GRPC_NODE_USE_ALTERNATIVE_RESOLVER = ((Pm1 = process.env.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) !== null && Pm1 !== void 0 ? Pm1 : "false") === "true"
})
// @from(Start 4919686, End 4927600)
ym1 = z((Yk0) => {
  Object.defineProperty(Yk0, "__esModule", {
    value: !0
  });
  Yk0.DEFAULT_PORT = void 0;
  Yk0.setup = y76;
  var Ik0 = Zw(),
    Sm1 = Z1("dns"),
    O76 = Mh1(),
    _m1 = y6(),
    jm1 = SZ(),
    T76 = GB(),
    P76 = y6(),
    ER = uY(),
    Gk0 = Z1("net"),
    S76 = cs(),
    Zk0 = Qk0(),
    _76 = "dns_resolver";

  function Hw(A) {
    T76.trace(P76.LogVerbosity.DEBUG, _76, A)
  }
  Yk0.DEFAULT_PORT = 443;
  var j76 = 30000;
  class Dk0 {
    constructor(A, B, Q) {
      var I, G, Z;
      if (this.target = A, this.listener = B, this.pendingLookupPromise = null, this.pendingTxtPromise = null, this.latestLookupResult = null, this.latestServiceConfig = null, this.latestServiceConfigError = null, this.continueResolving = !1, this.isNextResolutionTimerRunning = !1, this.isServiceConfigEnabled = !0, this.returnedIpResult = !1, this.alternativeResolver = new Sm1.promises.Resolver, Hw("Resolver constructed for target " + ER.uriToString(A)), A.authority) this.alternativeResolver.setServers([A.authority]);
      let D = ER.splitHostPort(A.path);
      if (D === null) this.ipResult = null, this.dnsHostname = null, this.port = null;
      else if (Gk0.isIPv4(D.host) || Gk0.isIPv6(D.host)) this.ipResult = [{
        addresses: [{
          host: D.host,
          port: (I = D.port) !== null && I !== void 0 ? I : Yk0.DEFAULT_PORT
        }]
      }], this.dnsHostname = null, this.port = null;
      else this.ipResult = null, this.dnsHostname = D.host, this.port = (G = D.port) !== null && G !== void 0 ? G : Yk0.DEFAULT_PORT;
      if (this.percentage = Math.random() * 100, Q["grpc.service_config_disable_resolution"] === 1) this.isServiceConfigEnabled = !1;
      this.defaultResolutionError = {
        code: _m1.Status.UNAVAILABLE,
        details: `Name resolution failed for target ${ER.uriToString(this.target)}`,
        metadata: new jm1.Metadata
      };
      let Y = {
        initialDelay: Q["grpc.initial_reconnect_backoff_ms"],
        maxDelay: Q["grpc.max_reconnect_backoff_ms"]
      };
      this.backoff = new S76.BackoffTimeout(() => {
        if (this.continueResolving) this.startResolutionWithBackoff()
      }, Y), this.backoff.unref(), this.minTimeBetweenResolutionsMs = (Z = Q["grpc.dns_min_time_between_resolutions_ms"]) !== null && Z !== void 0 ? Z : j76, this.nextResolutionTimer = setTimeout(() => {}, 0), clearTimeout(this.nextResolutionTimer)
    }
    startResolution() {
      if (this.ipResult !== null) {
        if (!this.returnedIpResult) Hw("Returning IP address for target " + ER.uriToString(this.target)), setImmediate(() => {
          this.listener.onSuccessfulResolution(this.ipResult, null, null, null, {})
        }), this.returnedIpResult = !0;
        this.backoff.stop(), this.backoff.reset(), this.stopNextResolutionTimer();
        return
      }
      if (this.dnsHostname === null) Hw("Failed to parse DNS address " + ER.uriToString(this.target)), setImmediate(() => {
        this.listener.onError({
          code: _m1.Status.UNAVAILABLE,
          details: `Failed to parse DNS address ${ER.uriToString(this.target)}`,
          metadata: new jm1.Metadata
        })
      }), this.stopNextResolutionTimer();
      else {
        if (this.pendingLookupPromise !== null) return;
        Hw("Looking up DNS hostname " + this.dnsHostname), this.latestLookupResult = null;
        let A = this.dnsHostname;
        if (this.pendingLookupPromise = this.lookup(A), this.pendingLookupPromise.then((B) => {
            if (this.pendingLookupPromise === null) return;
            this.pendingLookupPromise = null, this.backoff.reset(), this.backoff.stop(), this.latestLookupResult = B.map((I) => ({
              addresses: [I]
            }));
            let Q = "[" + B.map((I) => I.host + ":" + I.port).join(",") + "]";
            if (Hw("Resolved addresses for target " + ER.uriToString(this.target) + ": " + Q), this.latestLookupResult.length === 0) {
              this.listener.onError(this.defaultResolutionError);
              return
            }
            this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {})
          }, (B) => {
            if (this.pendingLookupPromise === null) return;
            Hw("Resolution error for target " + ER.uriToString(this.target) + ": " + B.message), this.pendingLookupPromise = null, this.stopNextResolutionTimer(), this.listener.onError(this.defaultResolutionError)
          }), this.isServiceConfigEnabled && this.pendingTxtPromise === null) this.pendingTxtPromise = this.resolveTxt(A), this.pendingTxtPromise.then((B) => {
          if (this.pendingTxtPromise === null) return;
          this.pendingTxtPromise = null;
          try {
            this.latestServiceConfig = O76.extractAndSelectServiceConfig(B, this.percentage)
          } catch (Q) {
            this.latestServiceConfigError = {
              code: _m1.Status.UNAVAILABLE,
              details: `Parsing service config failed with error ${Q.message}`,
              metadata: new jm1.Metadata
            }
          }
          if (this.latestLookupResult !== null) this.listener.onSuccessfulResolution(this.latestLookupResult, this.latestServiceConfig, this.latestServiceConfigError, null, {})
        }, (B) => {})
      }
    }
    async lookup(A) {
      if (Zk0.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) {
        Hw("Using alternative DNS resolver.");
        let Q = await Promise.allSettled([this.alternativeResolver.resolve4(A), this.alternativeResolver.resolve6(A)]);
        if (Q.every((I) => I.status === "rejected")) throw new Error(Q[0].reason);
        return Q.reduce((I, G) => {
          return G.status === "fulfilled" ? [...I, ...G.value] : I
        }, []).map((I) => ({
          host: I,
          port: +this.port
        }))
      }
      return (await Sm1.promises.lookup(A, {
        all: !0
      })).map((Q) => ({
        host: Q.address,
        port: +this.port
      }))
    }
    async resolveTxt(A) {
      if (Zk0.GRPC_NODE_USE_ALTERNATIVE_RESOLVER) return Hw("Using alternative DNS resolver."), this.alternativeResolver.resolveTxt(A);
      return Sm1.promises.resolveTxt(A)
    }
    startNextResolutionTimer() {
      var A, B;
      clearTimeout(this.nextResolutionTimer), this.nextResolutionTimer = setTimeout(() => {
        if (this.stopNextResolutionTimer(), this.continueResolving) this.startResolutionWithBackoff()
      }, this.minTimeBetweenResolutionsMs), (B = (A = this.nextResolutionTimer).unref) === null || B === void 0 || B.call(A), this.isNextResolutionTimerRunning = !0
    }
    stopNextResolutionTimer() {
      clearTimeout(this.nextResolutionTimer), this.isNextResolutionTimerRunning = !1
    }
    startResolutionWithBackoff() {
      if (this.pendingLookupPromise === null) this.continueResolving = !1, this.backoff.runOnce(), this.startNextResolutionTimer(), this.startResolution()
    }
    updateResolution() {
      if (this.pendingLookupPromise === null)
        if (this.isNextResolutionTimerRunning || this.backoff.isRunning()) {
          if (this.isNextResolutionTimerRunning) Hw('resolution update delayed by "min time between resolutions" rate limit');
          else Hw("resolution update delayed by backoff timer until " + this.backoff.getEndTime().toISOString());
          this.continueResolving = !0
        } else this.startResolutionWithBackoff()
    }
    destroy() {
      this.continueResolving = !1, this.backoff.reset(), this.backoff.stop(), this.stopNextResolutionTimer(), this.pendingLookupPromise = null, this.pendingTxtPromise = null, this.latestLookupResult = null, this.latestServiceConfig = null, this.latestServiceConfigError = null, this.returnedIpResult = !1
    }
    static getDefaultAuthority(A) {
      return A.path
    }
  }

  function y76() {
    Ik0.registerResolver("dns", Dk0), Ik0.registerDefaultScheme("dns")
  }
})
// @from(Start 4927606, End 4932290)
km1 = z((Vk0) => {
  Object.defineProperty(Vk0, "__esModule", {
    value: !0
  });
  Vk0.parseCIDR = Fk0;
  Vk0.mapProxyName = p76;
  Vk0.getProxiedConnection = c76;
  var Xr = GB(),
    Dh = y6(),
    Jk0 = Z1("net"),
    x76 = Z1("http"),
    f76 = GB(),
    Wk0 = PX(),
    Vr = uY(),
    v76 = Z1("url"),
    b76 = ym1(),
    g76 = "proxy";

  function Yh(A) {
    f76.trace(Dh.LogVerbosity.DEBUG, g76, A)
  }

  function h76() {
    let A = "",
      B = "";
    if (process.env.grpc_proxy) B = "grpc_proxy", A = process.env.grpc_proxy;
    else if (process.env.https_proxy) B = "https_proxy", A = process.env.https_proxy;
    else if (process.env.http_proxy) B = "http_proxy", A = process.env.http_proxy;
    else return {};
    let Q;
    try {
      Q = new v76.URL(A)
    } catch (Y) {
      return Xr.log(Dh.LogVerbosity.ERROR, `cannot parse value of "${B}" env var`), {}
    }
    if (Q.protocol !== "http:") return Xr.log(Dh.LogVerbosity.ERROR, `"${Q.protocol}" scheme not supported in proxy URI`), {};
    let I = null;
    if (Q.username)
      if (Q.password) Xr.log(Dh.LogVerbosity.INFO, "userinfo found in proxy URI"), I = decodeURIComponent(`${Q.username}:${Q.password}`);
      else I = Q.username;
    let {
      hostname: G,
      port: Z
    } = Q;
    if (Z === "") Z = "80";
    let D = {
      address: `${G}:${Z}`
    };
    if (I) D.creds = I;
    return Yh("Proxy server " + D.address + " set by environment variable " + B), D
  }

  function m76() {
    let A = process.env.no_grpc_proxy,
      B = "no_grpc_proxy";
    if (!A) A = process.env.no_proxy, B = "no_proxy";
    if (A) return Yh("No proxy server list set by environment variable " + B), A.split(",");
    else return []
  }

  function Fk0(A) {
    let B = A.split("/");
    if (B.length !== 2) return null;
    let Q = parseInt(B[1], 10);
    if (!Jk0.isIPv4(B[0]) || Number.isNaN(Q) || Q < 0 || Q > 32) return null;
    return {
      ip: Xk0(B[0]),
      prefixLength: Q
    }
  }

  function Xk0(A) {
    return A.split(".").reduce((B, Q) => (B << 8) + parseInt(Q, 10), 0)
  }

  function d76(A, B) {
    let Q = A.ip,
      I = -1 << 32 - A.prefixLength;
    return (Xk0(B) & I) === (Q & I)
  }

  function u76(A) {
    for (let B of m76()) {
      let Q = Fk0(B);
      if (Jk0.isIPv4(A) && Q && d76(Q, A)) return !0;
      else if (A.endsWith(B)) return !0
    }
    return !1
  }

  function p76(A, B) {
    var Q;
    let I = {
      target: A,
      extraOptions: {}
    };
    if (((Q = B["grpc.enable_http_proxy"]) !== null && Q !== void 0 ? Q : 1) === 0) return I;
    if (A.scheme === "unix") return I;
    let G = h76();
    if (!G.address) return I;
    let Z = Vr.splitHostPort(A.path);
    if (!Z) return I;
    let D = Z.host;
    if (u76(D)) return Yh("Not using proxy for target in no_proxy list: " + Vr.uriToString(A)), I;
    let Y = {
      "grpc.http_connect_target": Vr.uriToString(A)
    };
    if (G.creds) Y["grpc.http_connect_creds"] = G.creds;
    return {
      target: {
        scheme: "dns",
        path: G.address
      },
      extraOptions: Y
    }
  }

  function c76(A, B) {
    var Q;
    if (!("grpc.http_connect_target" in B)) return Promise.resolve(null);
    let I = B["grpc.http_connect_target"],
      G = Vr.parseUri(I);
    if (G === null) return Promise.resolve(null);
    let Z = Vr.splitHostPort(G.path);
    if (Z === null) return Promise.resolve(null);
    let D = `${Z.host}:${(Q=Z.port)!==null&&Q!==void 0?Q:b76.DEFAULT_PORT}`,
      Y = {
        method: "CONNECT",
        path: D
      },
      W = {
        Host: D
      };
    if (Wk0.isTcpSubchannelAddress(A)) Y.host = A.host, Y.port = A.port;
    else Y.socketPath = A.path;
    if ("grpc.http_connect_creds" in B) W["Proxy-Authorization"] = "Basic " + Buffer.from(B["grpc.http_connect_creds"]).toString("base64");
    Y.headers = W;
    let J = Wk0.subchannelAddressToString(A);
    return Yh("Using proxy " + J + " to connect to " + Y.path), new Promise((F, X) => {
      let V = x76.request(Y);
      V.once("connect", (C, K, E) => {
        if (V.removeAllListeners(), K.removeAllListeners(), C.statusCode === 200) {
          if (Yh("Successfully connected to " + Y.path + " through proxy " + J), E.length > 0) K.unshift(E);
          Yh("Successfully established a plaintext connection to " + Y.path + " through proxy " + J), F(K)
        } else Xr.log(Dh.LogVerbosity.ERROR, "Failed to connect to " + Y.path + " through proxy " + J + " with status " + C.statusCode), X()
      }), V.once("error", (C) => {
        V.removeAllListeners(), Xr.log(Dh.LogVerbosity.ERROR, "Failed to connect to proxy " + J + " with error " + C.message), X()
      }), V.end()
    })
  }
})
// @from(Start 4932296, End 4934706)
xm1 = z((Kk0) => {
  Object.defineProperty(Kk0, "__esModule", {
    value: !0
  });
  Kk0.StreamDecoder = void 0;
  var zw;
  (function(A) {
    A[A.NO_DATA = 0] = "NO_DATA", A[A.READING_SIZE = 1] = "READING_SIZE", A[A.READING_MESSAGE = 2] = "READING_MESSAGE"
  })(zw || (zw = {}));
  class Ck0 {
    constructor(A) {
      this.maxReadMessageLength = A, this.readState = zw.NO_DATA, this.readCompressFlag = Buffer.alloc(1), this.readPartialSize = Buffer.alloc(4), this.readSizeRemaining = 4, this.readMessageSize = 0, this.readPartialMessage = [], this.readMessageRemaining = 0
    }
    write(A) {
      let B = 0,
        Q, I = [];
      while (B < A.length) switch (this.readState) {
        case zw.NO_DATA:
          this.readCompressFlag = A.slice(B, B + 1), B += 1, this.readState = zw.READING_SIZE, this.readPartialSize.fill(0), this.readSizeRemaining = 4, this.readMessageSize = 0, this.readMessageRemaining = 0, this.readPartialMessage = [];
          break;
        case zw.READING_SIZE:
          if (Q = Math.min(A.length - B, this.readSizeRemaining), A.copy(this.readPartialSize, 4 - this.readSizeRemaining, B, B + Q), this.readSizeRemaining -= Q, B += Q, this.readSizeRemaining === 0) {
            if (this.readMessageSize = this.readPartialSize.readUInt32BE(0), this.maxReadMessageLength !== -1 && this.readMessageSize > this.maxReadMessageLength) throw new Error(`Received message larger than max (${this.readMessageSize} vs ${this.maxReadMessageLength})`);
            if (this.readMessageRemaining = this.readMessageSize, this.readMessageRemaining > 0) this.readState = zw.READING_MESSAGE;
            else {
              let G = Buffer.concat([this.readCompressFlag, this.readPartialSize], 5);
              this.readState = zw.NO_DATA, I.push(G)
            }
          }
          break;
        case zw.READING_MESSAGE:
          if (Q = Math.min(A.length - B, this.readMessageRemaining), this.readPartialMessage.push(A.slice(B, B + Q)), this.readMessageRemaining -= Q, B += Q, this.readMessageRemaining === 0) {
            let G = [this.readCompressFlag, this.readPartialSize].concat(this.readPartialMessage),
              Z = Buffer.concat(G, this.readMessageSize + 5);
            this.readState = zw.NO_DATA, I.push(Z)
          }
          break;
        default:
          throw new Error("Unexpected read state")
      }
      return I
    }
  }
  Kk0.StreamDecoder = Ck0
})
// @from(Start 4934712, End 4945593)
Uk0 = z((wk0) => {
  Object.defineProperty(wk0, "__esModule", {
    value: !0
  });
  wk0.Http2SubchannelCall = void 0;
  var kN = Z1("http2"),
    a76 = Z1("os"),
    q8 = y6(),
    xN = SZ(),
    s76 = xm1(),
    r76 = GB(),
    o76 = y6(),
    t76 = "subchannel_call";

  function e76(A) {
    for (let [B, Q] of Object.entries(a76.constants.errno))
      if (Q === A) return B;
    return "Unknown system error " + A
  }

  function fm1(A) {
    let B = `Received HTTP status code ${A}`,
      Q;
    switch (A) {
      case 400:
        Q = q8.Status.INTERNAL;
        break;
      case 401:
        Q = q8.Status.UNAUTHENTICATED;
        break;
      case 403:
        Q = q8.Status.PERMISSION_DENIED;
        break;
      case 404:
        Q = q8.Status.UNIMPLEMENTED;
        break;
      case 429:
      case 502:
      case 503:
      case 504:
        Q = q8.Status.UNAVAILABLE;
        break;
      default:
        Q = q8.Status.UNKNOWN
    }
    return {
      code: Q,
      details: B,
      metadata: new xN.Metadata
    }
  }
  class zk0 {
    constructor(A, B, Q, I, G) {
      var Z;
      this.http2Stream = A, this.callEventTracker = B, this.listener = Q, this.transport = I, this.callId = G, this.isReadFilterPending = !1, this.isPushPending = !1, this.canPush = !1, this.readsClosed = !1, this.statusOutput = !1, this.unpushedReadMessages = [], this.finalStatus = null, this.internalError = null, this.serverEndedCall = !1, this.connectionDropped = !1;
      let D = (Z = I.getOptions()["grpc.max_receive_message_length"]) !== null && Z !== void 0 ? Z : q8.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH;
      this.decoder = new s76.StreamDecoder(D), A.on("response", (Y, W) => {
        let J = "";
        for (let F of Object.keys(Y)) J += "\t\t" + F + ": " + Y[F] + `
`;
        if (this.trace(`Received server headers:
` + J), this.httpStatusCode = Y[":status"], W & kN.constants.NGHTTP2_FLAG_END_STREAM) this.handleTrailers(Y);
        else {
          let F;
          try {
            F = xN.Metadata.fromHttp2Headers(Y)
          } catch (X) {
            this.endCall({
              code: q8.Status.UNKNOWN,
              details: X.message,
              metadata: new xN.Metadata
            });
            return
          }
          this.listener.onReceiveMetadata(F)
        }
      }), A.on("trailers", (Y) => {
        this.handleTrailers(Y)
      }), A.on("data", (Y) => {
        if (this.statusOutput) return;
        this.trace("receive HTTP/2 data frame of length " + Y.length);
        let W;
        try {
          W = this.decoder.write(Y)
        } catch (J) {
          if (this.httpStatusCode !== void 0 && this.httpStatusCode !== 200) {
            let F = fm1(this.httpStatusCode);
            this.cancelWithStatus(F.code, F.details)
          } else this.cancelWithStatus(q8.Status.RESOURCE_EXHAUSTED, J.message);
          return
        }
        for (let J of W) this.trace("parsed message of length " + J.length), this.callEventTracker.addMessageReceived(), this.tryPush(J)
      }), A.on("end", () => {
        this.readsClosed = !0, this.maybeOutputStatus()
      }), A.on("close", () => {
        this.serverEndedCall = !0, process.nextTick(() => {
          var Y;
          if (this.trace("HTTP/2 stream closed with code " + A.rstCode), ((Y = this.finalStatus) === null || Y === void 0 ? void 0 : Y.code) === q8.Status.OK) return;
          let W, J = "";
          switch (A.rstCode) {
            case kN.constants.NGHTTP2_NO_ERROR:
              if (this.finalStatus !== null) return;
              if (this.httpStatusCode && this.httpStatusCode !== 200) {
                let F = fm1(this.httpStatusCode);
                W = F.code, J = F.details
              } else W = q8.Status.INTERNAL, J = `Received RST_STREAM with code ${A.rstCode} (Call ended without gRPC status)`;
              break;
            case kN.constants.NGHTTP2_REFUSED_STREAM:
              W = q8.Status.UNAVAILABLE, J = "Stream refused by server";
              break;
            case kN.constants.NGHTTP2_CANCEL:
              if (this.connectionDropped) W = q8.Status.UNAVAILABLE, J = "Connection dropped";
              else W = q8.Status.CANCELLED, J = "Call cancelled";
              break;
            case kN.constants.NGHTTP2_ENHANCE_YOUR_CALM:
              W = q8.Status.RESOURCE_EXHAUSTED, J = "Bandwidth exhausted or memory limit exceeded";
              break;
            case kN.constants.NGHTTP2_INADEQUATE_SECURITY:
              W = q8.Status.PERMISSION_DENIED, J = "Protocol not secure enough";
              break;
            case kN.constants.NGHTTP2_INTERNAL_ERROR:
              if (W = q8.Status.INTERNAL, this.internalError === null) J = `Received RST_STREAM with code ${A.rstCode} (Internal server error)`;
              else if (this.internalError.code === "ECONNRESET" || this.internalError.code === "ETIMEDOUT") W = q8.Status.UNAVAILABLE, J = this.internalError.message;
              else J = `Received RST_STREAM with code ${A.rstCode} triggered by internal client error: ${this.internalError.message}`;
              break;
            default:
              W = q8.Status.INTERNAL, J = `Received RST_STREAM with code ${A.rstCode}`
          }
          this.endCall({
            code: W,
            details: J,
            metadata: new xN.Metadata,
            rstCode: A.rstCode
          })
        })
      }), A.on("error", (Y) => {
        if (Y.code !== "ERR_HTTP2_STREAM_ERROR") this.trace("Node error event: message=" + Y.message + " code=" + Y.code + " errno=" + e76(Y.errno) + " syscall=" + Y.syscall), this.internalError = Y;
        this.callEventTracker.onStreamEnd(!1)
      })
    }
    getDeadlineInfo() {
      return [`remote_addr=${this.getPeer()}`]
    }
    onDisconnect() {
      this.connectionDropped = !0, setImmediate(() => {
        this.endCall({
          code: q8.Status.UNAVAILABLE,
          details: "Connection dropped",
          metadata: new xN.Metadata
        })
      })
    }
    outputStatus() {
      if (!this.statusOutput) this.statusOutput = !0, this.trace("ended with status: code=" + this.finalStatus.code + ' details="' + this.finalStatus.details + '"'), this.callEventTracker.onCallEnd(this.finalStatus), process.nextTick(() => {
        this.listener.onReceiveStatus(this.finalStatus)
      }), this.http2Stream.resume()
    }
    trace(A) {
      r76.trace(o76.LogVerbosity.DEBUG, t76, "[" + this.callId + "] " + A)
    }
    endCall(A) {
      if (this.finalStatus === null || this.finalStatus.code === q8.Status.OK) this.finalStatus = A, this.maybeOutputStatus();
      this.destroyHttp2Stream()
    }
    maybeOutputStatus() {
      if (this.finalStatus !== null) {
        if (this.finalStatus.code !== q8.Status.OK || this.readsClosed && this.unpushedReadMessages.length === 0 && !this.isReadFilterPending && !this.isPushPending) this.outputStatus()
      }
    }
    push(A) {
      this.trace("pushing to reader message of length " + (A instanceof Buffer ? A.length : null)), this.canPush = !1, this.isPushPending = !0, process.nextTick(() => {
        if (this.isPushPending = !1, this.statusOutput) return;
        this.listener.onReceiveMessage(A), this.maybeOutputStatus()
      })
    }
    tryPush(A) {
      if (this.canPush) this.http2Stream.pause(), this.push(A);
      else this.trace("unpushedReadMessages.push message of length " + A.length), this.unpushedReadMessages.push(A)
    }
    handleTrailers(A) {
      this.serverEndedCall = !0, this.callEventTracker.onStreamEnd(!0);
      let B = "";
      for (let Z of Object.keys(A)) B += "\t\t" + Z + ": " + A[Z] + `
`;
      this.trace(`Received server trailers:
` + B);
      let Q;
      try {
        Q = xN.Metadata.fromHttp2Headers(A)
      } catch (Z) {
        Q = new xN.Metadata
      }
      let I = Q.getMap(),
        G;
      if (typeof I["grpc-status"] === "string") {
        let Z = Number(I["grpc-status"]);
        this.trace("received status code " + Z + " from server"), Q.remove("grpc-status");
        let D = "";
        if (typeof I["grpc-message"] === "string") {
          try {
            D = decodeURI(I["grpc-message"])
          } catch (Y) {
            D = I["grpc-message"]
          }
          Q.remove("grpc-message"), this.trace('received status details string "' + D + '" from server')
        }
        G = {
          code: Z,
          details: D,
          metadata: Q
        }
      } else if (this.httpStatusCode) G = fm1(this.httpStatusCode), G.metadata = Q;
      else G = {
        code: q8.Status.UNKNOWN,
        details: "No status information received",
        metadata: Q
      };
      this.endCall(G)
    }
    destroyHttp2Stream() {
      var A;
      if (this.http2Stream.destroyed) return;
      if (this.serverEndedCall) this.http2Stream.end();
      else {
        let B;
        if (((A = this.finalStatus) === null || A === void 0 ? void 0 : A.code) === q8.Status.OK) B = kN.constants.NGHTTP2_NO_ERROR;
        else B = kN.constants.NGHTTP2_CANCEL;
        this.trace("close http2 stream with code " + B), this.http2Stream.close(B)
      }
    }
    cancelWithStatus(A, B) {
      this.trace("cancelWithStatus code: " + A + ' details: "' + B + '"'), this.endCall({
        code: A,
        details: B,
        metadata: new xN.Metadata
      })
    }
    getStatus() {
      return this.finalStatus
    }
    getPeer() {
      return this.transport.getPeerName()
    }
    getCallNumber() {
      return this.callId
    }
    startRead() {
      if (this.finalStatus !== null && this.finalStatus.code !== q8.Status.OK) {
        this.readsClosed = !0, this.maybeOutputStatus();
        return
      }
      if (this.canPush = !0, this.unpushedReadMessages.length > 0) {
        let A = this.unpushedReadMessages.shift();
        this.push(A);
        return
      }
      this.http2Stream.resume()
    }
    sendMessageWithContext(A, B) {
      this.trace("write() called with message of length " + B.length);
      let Q = (I) => {
        process.nextTick(() => {
          var G;
          let Z = q8.Status.UNAVAILABLE;
          if ((I === null || I === void 0 ? void 0 : I.code) === "ERR_STREAM_WRITE_AFTER_END") Z = q8.Status.INTERNAL;
          if (I) this.cancelWithStatus(Z, `Write error: ${I.message}`);
          (G = A.callback) === null || G === void 0 || G.call(A)
        })
      };
      this.trace("sending data chunk of length " + B.length), this.callEventTracker.addMessageSent();
      try {
        this.http2Stream.write(B, Q)
      } catch (I) {
        this.endCall({
          code: q8.Status.UNAVAILABLE,
          details: `Write failed with error ${I.message}`,
          metadata: new xN.Metadata
        })
      }
    }
    halfClose() {
      this.trace("end() called"), this.trace("calling end() on HTTP/2 stream"), this.http2Stream.end()
    }
  }
  wk0.Http2SubchannelCall = zk0
})
// @from(Start 4945599, End 4945772)
vm1 = z((Nk0) => {
  Object.defineProperty(Nk0, "__esModule", {
    value: !0
  });
  Nk0.getNextCallNumber = BI6;
  var AI6 = 0;

  function BI6() {
    return AI6++
  }
})
// @from(Start 4945778, End 4959976)
Rk0 = z((Mk0) => {
  Object.defineProperty(Mk0, "__esModule", {
    value: !0
  });
  Mk0.Http2SubchannelConnector = void 0;
  var bD1 = Z1("http2"),
    fD1 = Aj(),
    Cr = y6(),
    II6 = km1(),
    Wh = GB(),
    GI6 = Zw(),
    vD1 = PX(),
    bm1 = uY(),
    ZI6 = Z1("net"),
    DI6 = Uk0(),
    YI6 = vm1(),
    gm1 = "transport",
    WI6 = "transport_flowctrl",
    JI6 = Dh1().version,
    {
      HTTP2_HEADER_AUTHORITY: FI6,
      HTTP2_HEADER_CONTENT_TYPE: XI6,
      HTTP2_HEADER_METHOD: VI6,
      HTTP2_HEADER_PATH: CI6,
      HTTP2_HEADER_TE: KI6,
      HTTP2_HEADER_USER_AGENT: HI6
    } = bD1.constants,
    zI6 = 20000,
    wI6 = Buffer.from("too_many_pings", "ascii");
  class $k0 {
    constructor(A, B, Q, I) {
      if (this.session = A, this.options = Q, this.remoteName = I, this.keepaliveTimer = null, this.pendingSendKeepalivePing = !1, this.activeCalls = new Set, this.disconnectListeners = [], this.disconnectHandled = !1, this.channelzEnabled = !0, this.keepalivesSent = 0, this.messagesSent = 0, this.messagesReceived = 0, this.lastMessageSentTimestamp = null, this.lastMessageReceivedTimestamp = null, this.subchannelAddressString = vD1.subchannelAddressToString(B), Q["grpc.enable_channelz"] === 0) this.channelzEnabled = !1, this.streamTracker = new fD1.ChannelzCallTrackerStub;
      else this.streamTracker = new fD1.ChannelzCallTracker;
      if (this.channelzRef = fD1.registerChannelzSocket(this.subchannelAddressString, () => this.getChannelzInfo(), this.channelzEnabled), this.userAgent = [Q["grpc.primary_user_agent"], `grpc-node-js/${JI6}`, Q["grpc.secondary_user_agent"]].filter((G) => G).join(" "), "grpc.keepalive_time_ms" in Q) this.keepaliveTimeMs = Q["grpc.keepalive_time_ms"];
      else this.keepaliveTimeMs = -1;
      if ("grpc.keepalive_timeout_ms" in Q) this.keepaliveTimeoutMs = Q["grpc.keepalive_timeout_ms"];
      else this.keepaliveTimeoutMs = zI6;
      if ("grpc.keepalive_permit_without_calls" in Q) this.keepaliveWithoutCalls = Q["grpc.keepalive_permit_without_calls"] === 1;
      else this.keepaliveWithoutCalls = !1;
      if (A.once("close", () => {
          this.trace("session closed"), this.handleDisconnect()
        }), A.once("goaway", (G, Z, D) => {
          let Y = !1;
          if (G === bD1.constants.NGHTTP2_ENHANCE_YOUR_CALM && D && D.equals(wI6)) Y = !0;
          this.trace("connection closed by GOAWAY with code " + G + " and data " + (D === null || D === void 0 ? void 0 : D.toString())), this.reportDisconnectToOwner(Y)
        }), A.once("error", (G) => {
          this.trace("connection closed with error " + G.message), this.handleDisconnect()
        }), A.socket.once("close", (G) => {
          this.trace("connection closed. hadError=" + G), this.handleDisconnect()
        }), Wh.isTracerEnabled(gm1)) A.on("remoteSettings", (G) => {
        this.trace("new settings received" + (this.session !== A ? " on the old connection" : "") + ": " + JSON.stringify(G))
      }), A.on("localSettings", (G) => {
        this.trace("local settings acknowledged by remote" + (this.session !== A ? " on the old connection" : "") + ": " + JSON.stringify(G))
      });
      if (this.keepaliveWithoutCalls) this.maybeStartKeepalivePingTimer()
    }
    getChannelzInfo() {
      var A, B, Q;
      let I = this.session.socket,
        G = I.remoteAddress ? vD1.stringToSubchannelAddress(I.remoteAddress, I.remotePort) : null,
        Z = I.localAddress ? vD1.stringToSubchannelAddress(I.localAddress, I.localPort) : null,
        D;
      if (this.session.encrypted) {
        let W = I,
          J = W.getCipher(),
          F = W.getCertificate(),
          X = W.getPeerCertificate();
        D = {
          cipherSuiteStandardName: (A = J.standardName) !== null && A !== void 0 ? A : null,
          cipherSuiteOtherName: J.standardName ? null : J.name,
          localCertificate: F && "raw" in F ? F.raw : null,
          remoteCertificate: X && "raw" in X ? X.raw : null
        }
      } else D = null;
      return {
        remoteAddress: G,
        localAddress: Z,
        security: D,
        remoteName: this.remoteName,
        streamsStarted: this.streamTracker.callsStarted,
        streamsSucceeded: this.streamTracker.callsSucceeded,
        streamsFailed: this.streamTracker.callsFailed,
        messagesSent: this.messagesSent,
        messagesReceived: this.messagesReceived,
        keepAlivesSent: this.keepalivesSent,
        lastLocalStreamCreatedTimestamp: this.streamTracker.lastCallStartedTimestamp,
        lastRemoteStreamCreatedTimestamp: null,
        lastMessageSentTimestamp: this.lastMessageSentTimestamp,
        lastMessageReceivedTimestamp: this.lastMessageReceivedTimestamp,
        localFlowControlWindow: (B = this.session.state.localWindowSize) !== null && B !== void 0 ? B : null,
        remoteFlowControlWindow: (Q = this.session.state.remoteWindowSize) !== null && Q !== void 0 ? Q : null
      }
    }
    trace(A) {
      Wh.trace(Cr.LogVerbosity.DEBUG, gm1, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
    }
    keepaliveTrace(A) {
      Wh.trace(Cr.LogVerbosity.DEBUG, "keepalive", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
    }
    flowControlTrace(A) {
      Wh.trace(Cr.LogVerbosity.DEBUG, WI6, "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
    }
    internalsTrace(A) {
      Wh.trace(Cr.LogVerbosity.DEBUG, "transport_internals", "(" + this.channelzRef.id + ") " + this.subchannelAddressString + " " + A)
    }
    reportDisconnectToOwner(A) {
      if (this.disconnectHandled) return;
      this.disconnectHandled = !0, this.disconnectListeners.forEach((B) => B(A))
    }
    handleDisconnect() {
      this.clearKeepaliveTimeout(), this.reportDisconnectToOwner(!1);
      for (let A of this.activeCalls) A.onDisconnect();
      setImmediate(() => {
        this.session.destroy()
      })
    }
    addDisconnectListener(A) {
      this.disconnectListeners.push(A)
    }
    canSendPing() {
      return !this.session.destroyed && this.keepaliveTimeMs > 0 && (this.keepaliveWithoutCalls || this.activeCalls.size > 0)
    }
    maybeSendPing() {
      var A, B;
      if (!this.canSendPing()) {
        this.pendingSendKeepalivePing = !0;
        return
      }
      if (this.keepaliveTimer) {
        console.error("keepaliveTimeout is not null");
        return
      }
      if (this.channelzEnabled) this.keepalivesSent += 1;
      this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms"), this.keepaliveTimer = setTimeout(() => {
        this.keepaliveTimer = null, this.keepaliveTrace("Ping timeout passed without response"), this.handleDisconnect()
      }, this.keepaliveTimeoutMs), (B = (A = this.keepaliveTimer).unref) === null || B === void 0 || B.call(A);
      let Q = "";
      try {
        if (!this.session.ping((G, Z, D) => {
            if (this.clearKeepaliveTimeout(), G) this.keepaliveTrace("Ping failed with error " + G.message), this.handleDisconnect();
            else this.keepaliveTrace("Received ping response"), this.maybeStartKeepalivePingTimer()
          })) Q = "Ping returned false"
      } catch (I) {
        Q = (I instanceof Error ? I.message : "") || "Unknown error"
      }
      if (Q) this.keepaliveTrace("Ping send failed: " + Q), this.handleDisconnect()
    }
    maybeStartKeepalivePingTimer() {
      var A, B;
      if (!this.canSendPing()) return;
      if (this.pendingSendKeepalivePing) this.pendingSendKeepalivePing = !1, this.maybeSendPing();
      else if (!this.keepaliveTimer) this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms"), this.keepaliveTimer = setTimeout(() => {
        this.keepaliveTimer = null, this.maybeSendPing()
      }, this.keepaliveTimeMs), (B = (A = this.keepaliveTimer).unref) === null || B === void 0 || B.call(A)
    }
    clearKeepaliveTimeout() {
      if (this.keepaliveTimer) clearTimeout(this.keepaliveTimer), this.keepaliveTimer = null
    }
    removeActiveCall(A) {
      if (this.activeCalls.delete(A), this.activeCalls.size === 0) this.session.unref()
    }
    addActiveCall(A) {
      if (this.activeCalls.add(A), this.activeCalls.size === 1) {
        if (this.session.ref(), !this.keepaliveWithoutCalls) this.maybeStartKeepalivePingTimer()
      }
    }
    createCall(A, B, Q, I, G) {
      let Z = A.toHttp2Headers();
      Z[FI6] = B, Z[HI6] = this.userAgent, Z[XI6] = "application/grpc", Z[VI6] = "POST", Z[CI6] = Q, Z[KI6] = "trailers";
      let D;
      try {
        D = this.session.request(Z)
      } catch (J) {
        throw this.handleDisconnect(), J
      }
      this.flowControlTrace("local window size: " + this.session.state.localWindowSize + " remote window size: " + this.session.state.remoteWindowSize), this.internalsTrace("session.closed=" + this.session.closed + " session.destroyed=" + this.session.destroyed + " session.socket.destroyed=" + this.session.socket.destroyed);
      let Y, W;
      if (this.channelzEnabled) this.streamTracker.addCallStarted(), Y = {
        addMessageSent: () => {
          var J;
          this.messagesSent += 1, this.lastMessageSentTimestamp = new Date, (J = G.addMessageSent) === null || J === void 0 || J.call(G)
        },
        addMessageReceived: () => {
          var J;
          this.messagesReceived += 1, this.lastMessageReceivedTimestamp = new Date, (J = G.addMessageReceived) === null || J === void 0 || J.call(G)
        },
        onCallEnd: (J) => {
          var F;
          (F = G.onCallEnd) === null || F === void 0 || F.call(G, J), this.removeActiveCall(W)
        },
        onStreamEnd: (J) => {
          var F;
          if (J) this.streamTracker.addCallSucceeded();
          else this.streamTracker.addCallFailed();
          (F = G.onStreamEnd) === null || F === void 0 || F.call(G, J)
        }
      };
      else Y = {
        addMessageSent: () => {
          var J;
          (J = G.addMessageSent) === null || J === void 0 || J.call(G)
        },
        addMessageReceived: () => {
          var J;
          (J = G.addMessageReceived) === null || J === void 0 || J.call(G)
        },
        onCallEnd: (J) => {
          var F;
          (F = G.onCallEnd) === null || F === void 0 || F.call(G, J), this.removeActiveCall(W)
        },
        onStreamEnd: (J) => {
          var F;
          (F = G.onStreamEnd) === null || F === void 0 || F.call(G, J)
        }
      };
      return W = new DI6.Http2SubchannelCall(D, Y, I, this, YI6.getNextCallNumber()), this.addActiveCall(W), W
    }
    getChannelzRef() {
      return this.channelzRef
    }
    getPeerName() {
      return this.subchannelAddressString
    }
    getOptions() {
      return this.options
    }
    shutdown() {
      this.session.close(), fD1.unregisterChannelzRef(this.channelzRef)
    }
  }
  class qk0 {
    constructor(A) {
      this.channelTarget = A, this.session = null, this.isShutdown = !1
    }
    trace(A) {
      Wh.trace(Cr.LogVerbosity.DEBUG, gm1, bm1.uriToString(this.channelTarget) + " " + A)
    }
    createSession(A, B, Q) {
      if (this.isShutdown) return Promise.reject();
      if (A.socket.closed) return Promise.reject("Connection closed before starting HTTP/2 handshake");
      return new Promise((I, G) => {
        var Z;
        let D = null,
          Y = this.channelTarget;
        if ("grpc.http_connect_target" in Q) {
          let E = bm1.parseUri(Q["grpc.http_connect_target"]);
          if (E) Y = E, D = bm1.uriToString(E)
        }
        let W = A.secure ? "https" : "http",
          J = GI6.getDefaultAuthority(Y),
          F = () => {
            var E;
            (E = this.session) === null || E === void 0 || E.destroy(), this.session = null, setImmediate(() => {
              if (!K) K = !0, G(`${C.trim()} (${new Date().toISOString()})`)
            })
          },
          X = (E) => {
            var N;
            if ((N = this.session) === null || N === void 0 || N.destroy(), C = E.message, this.trace("connection failed with error " + C), !K) K = !0, G(`${C} (${new Date().toISOString()})`)
          },
          V = bD1.connect(`${W}://${J}`, {
            createConnection: (E, N) => {
              return A.socket
            },
            settings: {
              initialWindowSize: (Z = Q["grpc-node.flow_control_window"]) !== null && Z !== void 0 ? Z : bD1.getDefaultSettings().initialWindowSize
            }
          });
        this.session = V;
        let C = "Failed to connect",
          K = !1;
        V.unref(), V.once("remoteSettings", () => {
          V.removeAllListeners(), A.socket.removeListener("close", F), A.socket.removeListener("error", X), I(new $k0(V, B, Q, D)), this.session = null
        }), V.once("close", F), V.once("error", X), A.socket.once("close", F), A.socket.once("error", X)
      })
    }
    tcpConnect(A, B) {
      return II6.getProxiedConnection(A, B).then((Q) => {
        if (Q) return Q;
        else return new Promise((I, G) => {
          let Z = () => {
              G(new Error("Socket closed"))
            },
            D = (W) => {
              G(W)
            },
            Y = ZI6.connect(A, () => {
              Y.removeListener("close", Z), Y.removeListener("error", D), I(Y)
            });
          Y.once("close", Z), Y.once("error", D)
        })
      })
    }
    async connect(A, B, Q) {
      if (this.isShutdown) return Promise.reject();
      let I = null,
        G = null,
        Z = vD1.subchannelAddressToString(A);
      try {
        return this.trace(Z + " Waiting for secureConnector to be ready"), await B.waitForReady(), this.trace(Z + " secureConnector is ready"), I = await this.tcpConnect(A, Q), this.trace(Z + " Established TCP connection"), G = await B.connect(I), this.trace(Z + " Established secure connection"), this.createSession(G, A, Q)
      } catch (D) {
        throw I === null || I === void 0 || I.destroy(), G === null || G === void 0 || G.socket.destroy(), D
      }
    }
    shutdown() {
      var A;
      this.isShutdown = !0, (A = this.session) === null || A === void 0 || A.close(), this.session = null
    }
  }
  Mk0.Http2SubchannelConnector = qk0
})
// @from(Start 4959982, End 4961715)
Pk0 = z((Ok0) => {
  Object.defineProperty(Ok0, "__esModule", {
    value: !0
  });
  Ok0.SubchannelPool = void 0;
  Ok0.getSubchannelPool = RI6;
  var EI6 = cS0(),
    UI6 = ey0(),
    NI6 = PX(),
    $I6 = uY(),
    qI6 = Rk0(),
    MI6 = 1e4;
  class gD1 {
    constructor() {
      this.pool = Object.create(null), this.cleanupTimer = null
    }
    unrefUnusedSubchannels() {
      let A = !0;
      for (let B in this.pool) {
        let I = this.pool[B].filter((G) => !G.subchannel.unrefIfOneRef());
        if (I.length > 0) A = !1;
        this.pool[B] = I
      }
      if (A && this.cleanupTimer !== null) clearInterval(this.cleanupTimer), this.cleanupTimer = null
    }
    ensureCleanupTask() {
      var A, B;
      if (this.cleanupTimer === null) this.cleanupTimer = setInterval(() => {
        this.unrefUnusedSubchannels()
      }, MI6), (B = (A = this.cleanupTimer).unref) === null || B === void 0 || B.call(A)
    }
    getOrCreateSubchannel(A, B, Q, I) {
      this.ensureCleanupTask();
      let G = $I6.uriToString(A);
      if (G in this.pool) {
        let D = this.pool[G];
        for (let Y of D)
          if (NI6.subchannelAddressEqual(B, Y.subchannelAddress) && EI6.channelOptionsEqual(Q, Y.channelArguments) && I._equals(Y.channelCredentials)) return Y.subchannel
      }
      let Z = new UI6.Subchannel(A, B, Q, I, new qI6.Http2SubchannelConnector(A));
      if (!(G in this.pool)) this.pool[G] = [];
      return this.pool[G].push({
        subchannelAddress: B,
        channelArguments: Q,
        channelCredentials: I,
        subchannel: Z
      }), Z.ref(), Z
    }
  }
  Ok0.SubchannelPool = gD1;
  var LI6 = new gD1;

  function RI6(A) {
    if (A) return LI6;
    else return new gD1
  }
})
// @from(Start 4961721, End 4963142)
dm1 = z((Sk0) => {
  Object.defineProperty(Sk0, "__esModule", {
    value: !0
  });
  Sk0.FilterStackFactory = Sk0.FilterStack = void 0;
  class hm1 {
    constructor(A) {
      this.filters = A
    }
    sendMetadata(A) {
      let B = A;
      for (let Q = 0; Q < this.filters.length; Q++) B = this.filters[Q].sendMetadata(B);
      return B
    }
    receiveMetadata(A) {
      let B = A;
      for (let Q = this.filters.length - 1; Q >= 0; Q--) B = this.filters[Q].receiveMetadata(B);
      return B
    }
    sendMessage(A) {
      let B = A;
      for (let Q = 0; Q < this.filters.length; Q++) B = this.filters[Q].sendMessage(B);
      return B
    }
    receiveMessage(A) {
      let B = A;
      for (let Q = this.filters.length - 1; Q >= 0; Q--) B = this.filters[Q].receiveMessage(B);
      return B
    }
    receiveTrailers(A) {
      let B = A;
      for (let Q = this.filters.length - 1; Q >= 0; Q--) B = this.filters[Q].receiveTrailers(B);
      return B
    }
    push(A) {
      this.filters.unshift(...A)
    }
    getFilters() {
      return this.filters
    }
  }
  Sk0.FilterStack = hm1;
  class mm1 {
    constructor(A) {
      this.factories = A
    }
    push(A) {
      this.factories.unshift(...A)
    }
    clone() {
      return new mm1([...this.factories])
    }
    createFilter() {
      return new hm1(this.factories.map((A) => A.createFilter()))
    }
  }
  Sk0.FilterStackFactory = mm1
})
// @from(Start 4963148, End 4963441)
um1 = z((yk0) => {
  Object.defineProperty(yk0, "__esModule", {
    value: !0
  });
  yk0.CompressionAlgorithms = void 0;
  var jk0;
  (function(A) {
    A[A.identity = 0] = "identity", A[A.deflate = 1] = "deflate", A[A.gzip = 2] = "gzip"
  })(jk0 || (yk0.CompressionAlgorithms = jk0 = {}))
})
// @from(Start 4963447, End 4963841)
pm1 = z((fk0) => {
  Object.defineProperty(fk0, "__esModule", {
    value: !0
  });
  fk0.BaseFilter = void 0;
  class xk0 {
    async sendMetadata(A) {
      return A
    }
    receiveMetadata(A) {
      return A
    }
    async sendMessage(A) {
      return A
    }
    async receiveMessage(A) {
      return A
    }
    receiveTrailers(A) {
      return A
    }
  }
  fk0.BaseFilter = xk0
})
// @from(Start 4963847, End 4970197)
lk0 = z((pk0) => {
  Object.defineProperty(pk0, "__esModule", {
    value: !0
  });
  pk0.CompressionFilterFactory = pk0.CompressionFilter = void 0;
  var hD1 = Z1("zlib"),
    gk0 = um1(),
    Jh = y6(),
    PI6 = pm1(),
    SI6 = GB(),
    _I6 = (A) => {
      return typeof A === "number" && typeof gk0.CompressionAlgorithms[A] === "string"
    };
  class Kr {
    async writeMessage(A, B) {
      let Q = A;
      if (B) Q = await this.compressMessage(Q);
      let I = Buffer.allocUnsafe(Q.length + 5);
      return I.writeUInt8(B ? 1 : 0, 0), I.writeUInt32BE(Q.length, 1), Q.copy(I, 5), I
    }
    async readMessage(A) {
      let B = A.readUInt8(0) === 1,
        Q = A.slice(5);
      if (B) Q = await this.decompressMessage(Q);
      return Q
    }
  }
  class Fh extends Kr {
    async compressMessage(A) {
      return A
    }
    async writeMessage(A, B) {
      let Q = Buffer.allocUnsafe(A.length + 5);
      return Q.writeUInt8(0, 0), Q.writeUInt32BE(A.length, 1), A.copy(Q, 5), Q
    }
    decompressMessage(A) {
      return Promise.reject(new Error('Received compressed message but "grpc-encoding" header was identity'))
    }
  }
  class hk0 extends Kr {
    constructor(A) {
      super();
      this.maxRecvMessageLength = A
    }
    compressMessage(A) {
      return new Promise((B, Q) => {
        hD1.deflate(A, (I, G) => {
          if (I) Q(I);
          else B(G)
        })
      })
    }
    decompressMessage(A) {
      return new Promise((B, Q) => {
        let I = 0,
          G = [],
          Z = hD1.createInflate();
        Z.on("data", (D) => {
          if (G.push(D), I += D.byteLength, this.maxRecvMessageLength !== -1 && I > this.maxRecvMessageLength) Z.destroy(), Q({
            code: Jh.Status.RESOURCE_EXHAUSTED,
            details: `Received message that decompresses to a size larger than ${this.maxRecvMessageLength}`
          })
        }), Z.on("end", () => {
          B(Buffer.concat(G))
        }), Z.write(A), Z.end()
      })
    }
  }
  class mk0 extends Kr {
    constructor(A) {
      super();
      this.maxRecvMessageLength = A
    }
    compressMessage(A) {
      return new Promise((B, Q) => {
        hD1.gzip(A, (I, G) => {
          if (I) Q(I);
          else B(G)
        })
      })
    }
    decompressMessage(A) {
      return new Promise((B, Q) => {
        let I = 0,
          G = [],
          Z = hD1.createGunzip();
        Z.on("data", (D) => {
          if (G.push(D), I += D.byteLength, this.maxRecvMessageLength !== -1 && I > this.maxRecvMessageLength) Z.destroy(), Q({
            code: Jh.Status.RESOURCE_EXHAUSTED,
            details: `Received message that decompresses to a size larger than ${this.maxRecvMessageLength}`
          })
        }), Z.on("end", () => {
          B(Buffer.concat(G))
        }), Z.write(A), Z.end()
      })
    }
  }
  class dk0 extends Kr {
    constructor(A) {
      super();
      this.compressionName = A
    }
    compressMessage(A) {
      return Promise.reject(new Error(`Received message compressed with unsupported compression method ${this.compressionName}`))
    }
    decompressMessage(A) {
      return Promise.reject(new Error(`Compression method not supported: ${this.compressionName}`))
    }
  }

  function bk0(A, B) {
    switch (A) {
      case "identity":
        return new Fh;
      case "deflate":
        return new hk0(B);
      case "gzip":
        return new mk0(B);
      default:
        return new dk0(A)
    }
  }
  class cm1 extends PI6.BaseFilter {
    constructor(A, B) {
      var Q, I, G;
      super();
      this.sharedFilterConfig = B, this.sendCompression = new Fh, this.receiveCompression = new Fh, this.currentCompressionAlgorithm = "identity";
      let Z = A["grpc.default_compression_algorithm"];
      if (this.maxReceiveMessageLength = (Q = A["grpc.max_receive_message_length"]) !== null && Q !== void 0 ? Q : Jh.DEFAULT_MAX_RECEIVE_MESSAGE_LENGTH, this.maxSendMessageLength = (I = A["grpc.max_send_message_length"]) !== null && I !== void 0 ? I : Jh.DEFAULT_MAX_SEND_MESSAGE_LENGTH, Z !== void 0)
        if (_I6(Z)) {
          let D = gk0.CompressionAlgorithms[Z],
            Y = (G = B.serverSupportedEncodingHeader) === null || G === void 0 ? void 0 : G.split(",");
          if (!Y || Y.includes(D)) this.currentCompressionAlgorithm = D, this.sendCompression = bk0(this.currentCompressionAlgorithm, -1)
        } else SI6.log(Jh.LogVerbosity.ERROR, `Invalid value provided for grpc.default_compression_algorithm option: ${Z}`)
    }
    async sendMetadata(A) {
      let B = await A;
      if (B.set("grpc-accept-encoding", "identity,deflate,gzip"), B.set("accept-encoding", "identity"), this.currentCompressionAlgorithm === "identity") B.remove("grpc-encoding");
      else B.set("grpc-encoding", this.currentCompressionAlgorithm);
      return B
    }
    receiveMetadata(A) {
      let B = A.get("grpc-encoding");
      if (B.length > 0) {
        let I = B[0];
        if (typeof I === "string") this.receiveCompression = bk0(I, this.maxReceiveMessageLength)
      }
      A.remove("grpc-encoding");
      let Q = A.get("grpc-accept-encoding")[0];
      if (Q) {
        if (this.sharedFilterConfig.serverSupportedEncodingHeader = Q, !Q.split(",").includes(this.currentCompressionAlgorithm)) this.sendCompression = new Fh, this.currentCompressionAlgorithm = "identity"
      }
      return A.remove("grpc-accept-encoding"), A
    }
    async sendMessage(A) {
      var B;
      let Q = await A;
      if (this.maxSendMessageLength !== -1 && Q.message.length > this.maxSendMessageLength) throw {
        code: Jh.Status.RESOURCE_EXHAUSTED,
        details: `Attempted to send message with a size larger than ${this.maxSendMessageLength}`
      };
      let I;
      if (this.sendCompression instanceof Fh) I = !1;
      else I = (((B = Q.flags) !== null && B !== void 0 ? B : 0) & 2) === 0;
      return {
        message: await this.sendCompression.writeMessage(Q.message, I),
        flags: Q.flags
      }
    }
    async receiveMessage(A) {
      return this.receiveCompression.readMessage(await A)
    }
  }
  pk0.CompressionFilter = cm1;
  class uk0 {
    constructor(A, B) {
      this.options = B, this.sharedFilterConfig = {}
    }
    createFilter() {
      return new cm1(this.options, this.sharedFilterConfig)
    }
  }
  pk0.CompressionFilterFactory = uk0
})
// @from(Start 4970203, End 4971522)
Hr = z((ik0) => {
  Object.defineProperty(ik0, "__esModule", {
    value: !0
  });
  ik0.minDeadline = yI6;
  ik0.getDeadlineTimeoutString = xI6;
  ik0.getRelativeTimeout = vI6;
  ik0.deadlineToString = bI6;
  ik0.formatDateDifference = gI6;

  function yI6(...A) {
    let B = 1 / 0;
    for (let Q of A) {
      let I = Q instanceof Date ? Q.getTime() : Q;
      if (I < B) B = I
    }
    return B
  }
  var kI6 = [
    ["m", 1],
    ["S", 1000],
    ["M", 60000],
    ["H", 3600000]
  ];

  function xI6(A) {
    let B = new Date().getTime();
    if (A instanceof Date) A = A.getTime();
    let Q = Math.max(A - B, 0);
    for (let [I, G] of kI6) {
      let Z = Q / G;
      if (Z < 1e8) return String(Math.ceil(Z)) + I
    }
    throw new Error("Deadline is too far in the future")
  }
  var fI6 = 2147483647;

  function vI6(A) {
    let B = A instanceof Date ? A.getTime() : A,
      Q = new Date().getTime(),
      I = B - Q;
    if (I < 0) return 0;
    else if (I > fI6) return 1 / 0;
    else return I
  }

  function bI6(A) {
    if (A instanceof Date) return A.toISOString();
    else {
      let B = new Date(A);
      if (Number.isNaN(B.getTime())) return "" + A;
      else return B.toISOString()
    }
  }

  function gI6(A, B) {
    return ((B.getTime() - A.getTime()) / 1000).toFixed(3) + "s"
  }
})
// @from(Start 4971528, End 4972106)
mD1 = z((nk0) => {
  Object.defineProperty(nk0, "__esModule", {
    value: !0
  });
  nk0.restrictControlPlaneStatusCode = lI6;
  var ww = y6(),
    cI6 = [ww.Status.OK, ww.Status.INVALID_ARGUMENT, ww.Status.NOT_FOUND, ww.Status.ALREADY_EXISTS, ww.Status.FAILED_PRECONDITION, ww.Status.ABORTED, ww.Status.OUT_OF_RANGE, ww.Status.DATA_LOSS];

  function lI6(A, B) {
    if (cI6.includes(A)) return {
      code: ww.Status.INTERNAL,
      details: `Invalid status from control plane: ${A} ${ww.Status[A]} ${B}`
    };
    else return {
      code: A,
      details: B
    }
  }
})
// @from(Start 4972112, End 4980416)
ek0 = z((ok0) => {
  Object.defineProperty(ok0, "__esModule", {
    value: !0
  });
  ok0.LoadBalancingCall = void 0;
  var ak0 = TX(),
    dD1 = y6(),
    sk0 = Hr(),
    uD1 = SZ(),
    zr = FR(),
    nI6 = uY(),
    aI6 = GB(),
    lm1 = mD1(),
    sI6 = Z1("http2"),
    rI6 = "load_balancing_call";
  class rk0 {
    constructor(A, B, Q, I, G, Z, D) {
      var Y, W;
      this.channel = A, this.callConfig = B, this.methodName = Q, this.host = I, this.credentials = G, this.deadline = Z, this.callNumber = D, this.child = null, this.readPending = !1, this.pendingMessage = null, this.pendingHalfClose = !1, this.ended = !1, this.metadata = null, this.listener = null, this.onCallEnded = null, this.childStartTime = null;
      let J = this.methodName.split("/"),
        F = "";
      if (J.length >= 2) F = J[1];
      let X = (W = (Y = nI6.splitHostPort(this.host)) === null || Y === void 0 ? void 0 : Y.host) !== null && W !== void 0 ? W : "localhost";
      this.serviceUrl = `https://${X}/${F}`, this.startTime = new Date
    }
    getDeadlineInfo() {
      var A, B;
      let Q = [];
      if (this.childStartTime) {
        if (this.childStartTime > this.startTime) {
          if ((A = this.metadata) === null || A === void 0 ? void 0 : A.getOptions().waitForReady) Q.push("wait_for_ready");
          Q.push(`LB pick: ${sk0.formatDateDifference(this.startTime,this.childStartTime)}`)
        }
        return Q.push(...this.child.getDeadlineInfo()), Q
      } else {
        if ((B = this.metadata) === null || B === void 0 ? void 0 : B.getOptions().waitForReady) Q.push("wait_for_ready");
        Q.push("Waiting for LB pick")
      }
      return Q
    }
    trace(A) {
      aI6.trace(dD1.LogVerbosity.DEBUG, rI6, "[" + this.callNumber + "] " + A)
    }
    outputStatus(A, B) {
      var Q, I;
      if (!this.ended) {
        this.ended = !0, this.trace("ended with status: code=" + A.code + ' details="' + A.details + '" start time=' + this.startTime.toISOString());
        let G = Object.assign(Object.assign({}, A), {
          progress: B
        });
        (Q = this.listener) === null || Q === void 0 || Q.onReceiveStatus(G), (I = this.onCallEnded) === null || I === void 0 || I.call(this, G.code)
      }
    }
    doPick() {
      var A, B;
      if (this.ended) return;
      if (!this.metadata) throw new Error("doPick called before start");
      this.trace("Pick called");
      let Q = this.metadata.clone(),
        I = this.channel.doPick(Q, this.callConfig.pickInformation),
        G = I.subchannel ? "(" + I.subchannel.getChannelzRef().id + ") " + I.subchannel.getAddress() : "" + I.subchannel;
      switch (this.trace("Pick result: " + zr.PickResultType[I.pickResultType] + " subchannel: " + G + " status: " + ((A = I.status) === null || A === void 0 ? void 0 : A.code) + " " + ((B = I.status) === null || B === void 0 ? void 0 : B.details)), I.pickResultType) {
        case zr.PickResultType.COMPLETE:
          this.credentials.compose(I.subchannel.getCallCredentials()).generateMetadata({
            method_name: this.methodName,
            service_url: this.serviceUrl
          }).then((W) => {
            var J;
            if (this.ended) {
              this.trace("Credentials metadata generation finished after call ended");
              return
            }
            if (Q.merge(W), Q.get("authorization").length > 1) this.outputStatus({
              code: dD1.Status.INTERNAL,
              details: '"authorization" metadata cannot have multiple values',
              metadata: new uD1.Metadata
            }, "PROCESSED");
            if (I.subchannel.getConnectivityState() !== ak0.ConnectivityState.READY) {
              this.trace("Picked subchannel " + G + " has state " + ak0.ConnectivityState[I.subchannel.getConnectivityState()] + " after getting credentials metadata. Retrying pick"), this.doPick();
              return
            }
            if (this.deadline !== 1 / 0) Q.set("grpc-timeout", sk0.getDeadlineTimeoutString(this.deadline));
            try {
              this.child = I.subchannel.getRealSubchannel().createCall(Q, this.host, this.methodName, {
                onReceiveMetadata: (F) => {
                  this.trace("Received metadata"), this.listener.onReceiveMetadata(F)
                },
                onReceiveMessage: (F) => {
                  this.trace("Received message"), this.listener.onReceiveMessage(F)
                },
                onReceiveStatus: (F) => {
                  if (this.trace("Received status"), F.rstCode === sI6.constants.NGHTTP2_REFUSED_STREAM) this.outputStatus(F, "REFUSED");
                  else this.outputStatus(F, "PROCESSED")
                }
              }), this.childStartTime = new Date
            } catch (F) {
              this.trace("Failed to start call on picked subchannel " + G + " with error " + F.message), this.outputStatus({
                code: dD1.Status.INTERNAL,
                details: "Failed to start HTTP/2 stream with error " + F.message,
                metadata: new uD1.Metadata
              }, "NOT_STARTED");
              return
            }
            if ((J = I.onCallStarted) === null || J === void 0 || J.call(I), this.onCallEnded = I.onCallEnded, this.trace("Created child call [" + this.child.getCallNumber() + "]"), this.readPending) this.child.startRead();
            if (this.pendingMessage) this.child.sendMessageWithContext(this.pendingMessage.context, this.pendingMessage.message);
            if (this.pendingHalfClose) this.child.halfClose()
          }, (W) => {
            let {
              code: J,
              details: F
            } = lm1.restrictControlPlaneStatusCode(typeof W.code === "number" ? W.code : dD1.Status.UNKNOWN, `Getting metadata from plugin failed with error: ${W.message}`);
            this.outputStatus({
              code: J,
              details: F,
              metadata: new uD1.Metadata
            }, "PROCESSED")
          });
          break;
        case zr.PickResultType.DROP:
          let {
            code: D, details: Y
          } = lm1.restrictControlPlaneStatusCode(I.status.code, I.status.details);
          setImmediate(() => {
            this.outputStatus({
              code: D,
              details: Y,
              metadata: I.status.metadata
            }, "DROP")
          });
          break;
        case zr.PickResultType.TRANSIENT_FAILURE:
          if (this.metadata.getOptions().waitForReady) this.channel.queueCallForPick(this);
          else {
            let {
              code: W,
              details: J
            } = lm1.restrictControlPlaneStatusCode(I.status.code, I.status.details);
            setImmediate(() => {
              this.outputStatus({
                code: W,
                details: J,
                metadata: I.status.metadata
              }, "PROCESSED")
            })
          }
          break;
        case zr.PickResultType.QUEUE:
          this.channel.queueCallForPick(this)
      }
    }
    cancelWithStatus(A, B) {
      var Q;
      this.trace("cancelWithStatus code: " + A + ' details: "' + B + '"'), (Q = this.child) === null || Q === void 0 || Q.cancelWithStatus(A, B), this.outputStatus({
        code: A,
        details: B,
        metadata: new uD1.Metadata
      }, "PROCESSED")
    }
    getPeer() {
      var A, B;
      return (B = (A = this.child) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : this.channel.getTarget()
    }
    start(A, B) {
      this.trace("start called"), this.listener = B, this.metadata = A, this.doPick()
    }
    sendMessageWithContext(A, B) {
      if (this.trace("write() called with message of length " + B.length), this.child) this.child.sendMessageWithContext(A, B);
      else this.pendingMessage = {
        context: A,
        message: B
      }
    }
    startRead() {
      if (this.trace("startRead called"), this.child) this.child.startRead();
      else this.readPending = !0
    }
    halfClose() {
      if (this.trace("halfClose called"), this.child) this.child.halfClose();
      else this.pendingHalfClose = !0
    }
    setCredentials(A) {
      throw new Error("Method not implemented.")
    }
    getCallNumber() {
      return this.callNumber
    }
  }
  ok0.LoadBalancingCall = rk0
})
// @from(Start 4980422, End 4988675)
Gx0 = z((Qx0) => {
  Object.defineProperty(Qx0, "__esModule", {
    value: !0
  });
  Qx0.ResolvingCall = void 0;
  var oI6 = iZ1(),
    Bj = y6(),
    Qj = Hr(),
    Ax0 = SZ(),
    tI6 = GB(),
    eI6 = mD1(),
    AG6 = "resolving_call";
  class Bx0 {
    constructor(A, B, Q, I, G) {
      if (this.channel = A, this.method = B, this.filterStackFactory = I, this.callNumber = G, this.child = null, this.readPending = !1, this.pendingMessage = null, this.pendingHalfClose = !1, this.ended = !1, this.readFilterPending = !1, this.writeFilterPending = !1, this.pendingChildStatus = null, this.metadata = null, this.listener = null, this.statusWatchers = [], this.deadlineTimer = setTimeout(() => {}, 0), this.filterStack = null, this.deadlineStartTime = null, this.configReceivedTime = null, this.childStartTime = null, this.credentials = oI6.CallCredentials.createEmpty(), this.deadline = Q.deadline, this.host = Q.host, Q.parentCall) {
        if (Q.flags & Bj.Propagate.CANCELLATION) Q.parentCall.on("cancelled", () => {
          this.cancelWithStatus(Bj.Status.CANCELLED, "Cancelled by parent call")
        });
        if (Q.flags & Bj.Propagate.DEADLINE) this.trace("Propagating deadline from parent: " + Q.parentCall.getDeadline()), this.deadline = Qj.minDeadline(this.deadline, Q.parentCall.getDeadline())
      }
      this.trace("Created"), this.runDeadlineTimer()
    }
    trace(A) {
      tI6.trace(Bj.LogVerbosity.DEBUG, AG6, "[" + this.callNumber + "] " + A)
    }
    runDeadlineTimer() {
      clearTimeout(this.deadlineTimer), this.deadlineStartTime = new Date, this.trace("Deadline: " + Qj.deadlineToString(this.deadline));
      let A = Qj.getRelativeTimeout(this.deadline);
      if (A !== 1 / 0) {
        this.trace("Deadline will be reached in " + A + "ms");
        let B = () => {
          if (!this.deadlineStartTime) {
            this.cancelWithStatus(Bj.Status.DEADLINE_EXCEEDED, "Deadline exceeded");
            return
          }
          let Q = [],
            I = new Date;
          if (Q.push(`Deadline exceeded after ${Qj.formatDateDifference(this.deadlineStartTime,I)}`), this.configReceivedTime) {
            if (this.configReceivedTime > this.deadlineStartTime) Q.push(`name resolution: ${Qj.formatDateDifference(this.deadlineStartTime,this.configReceivedTime)}`);
            if (this.childStartTime) {
              if (this.childStartTime > this.configReceivedTime) Q.push(`metadata filters: ${Qj.formatDateDifference(this.configReceivedTime,this.childStartTime)}`)
            } else Q.push("waiting for metadata filters")
          } else Q.push("waiting for name resolution");
          if (this.child) Q.push(...this.child.getDeadlineInfo());
          this.cancelWithStatus(Bj.Status.DEADLINE_EXCEEDED, Q.join(","))
        };
        if (A <= 0) process.nextTick(B);
        else this.deadlineTimer = setTimeout(B, A)
      }
    }
    outputStatus(A) {
      if (!this.ended) {
        if (this.ended = !0, !this.filterStack) this.filterStack = this.filterStackFactory.createFilter();
        clearTimeout(this.deadlineTimer);
        let B = this.filterStack.receiveTrailers(A);
        this.trace("ended with status: code=" + B.code + ' details="' + B.details + '"'), this.statusWatchers.forEach((Q) => Q(B)), process.nextTick(() => {
          var Q;
          (Q = this.listener) === null || Q === void 0 || Q.onReceiveStatus(B)
        })
      }
    }
    sendMessageOnChild(A, B) {
      if (!this.child) throw new Error("sendMessageonChild called with child not populated");
      let Q = this.child;
      this.writeFilterPending = !0, this.filterStack.sendMessage(Promise.resolve({
        message: B,
        flags: A.flags
      })).then((I) => {
        if (this.writeFilterPending = !1, Q.sendMessageWithContext(A, I.message), this.pendingHalfClose) Q.halfClose()
      }, (I) => {
        this.cancelWithStatus(I.code, I.details)
      })
    }
    getConfig() {
      if (this.ended) return;
      if (!this.metadata || !this.listener) throw new Error("getConfig called before start");
      let A = this.channel.getConfig(this.method, this.metadata);
      if (A.type === "NONE") {
        this.channel.queueCallForConfig(this);
        return
      } else if (A.type === "ERROR") {
        if (this.metadata.getOptions().waitForReady) this.channel.queueCallForConfig(this);
        else this.outputStatus(A.error);
        return
      }
      this.configReceivedTime = new Date;
      let B = A.config;
      if (B.status !== Bj.Status.OK) {
        let {
          code: Q,
          details: I
        } = eI6.restrictControlPlaneStatusCode(B.status, "Failed to route call to method " + this.method);
        this.outputStatus({
          code: Q,
          details: I,
          metadata: new Ax0.Metadata
        });
        return
      }
      if (B.methodConfig.timeout) {
        let Q = new Date;
        Q.setSeconds(Q.getSeconds() + B.methodConfig.timeout.seconds), Q.setMilliseconds(Q.getMilliseconds() + B.methodConfig.timeout.nanos / 1e6), this.deadline = Qj.minDeadline(this.deadline, Q), this.runDeadlineTimer()
      }
      this.filterStackFactory.push(B.dynamicFilterFactories), this.filterStack = this.filterStackFactory.createFilter(), this.filterStack.sendMetadata(Promise.resolve(this.metadata)).then((Q) => {
        if (this.child = this.channel.createRetryingCall(B, this.method, this.host, this.credentials, this.deadline), this.trace("Created child [" + this.child.getCallNumber() + "]"), this.childStartTime = new Date, this.child.start(Q, {
            onReceiveMetadata: (I) => {
              this.trace("Received metadata"), this.listener.onReceiveMetadata(this.filterStack.receiveMetadata(I))
            },
            onReceiveMessage: (I) => {
              this.trace("Received message"), this.readFilterPending = !0, this.filterStack.receiveMessage(I).then((G) => {
                if (this.trace("Finished filtering received message"), this.readFilterPending = !1, this.listener.onReceiveMessage(G), this.pendingChildStatus) this.outputStatus(this.pendingChildStatus)
              }, (G) => {
                this.cancelWithStatus(G.code, G.details)
              })
            },
            onReceiveStatus: (I) => {
              if (this.trace("Received status"), this.readFilterPending) this.pendingChildStatus = I;
              else this.outputStatus(I)
            }
          }), this.readPending) this.child.startRead();
        if (this.pendingMessage) this.sendMessageOnChild(this.pendingMessage.context, this.pendingMessage.message);
        else if (this.pendingHalfClose) this.child.halfClose()
      }, (Q) => {
        this.outputStatus(Q)
      })
    }
    reportResolverError(A) {
      var B;
      if ((B = this.metadata) === null || B === void 0 ? void 0 : B.getOptions().waitForReady) this.channel.queueCallForConfig(this);
      else this.outputStatus(A)
    }
    cancelWithStatus(A, B) {
      var Q;
      this.trace("cancelWithStatus code: " + A + ' details: "' + B + '"'), (Q = this.child) === null || Q === void 0 || Q.cancelWithStatus(A, B), this.outputStatus({
        code: A,
        details: B,
        metadata: new Ax0.Metadata
      })
    }
    getPeer() {
      var A, B;
      return (B = (A = this.child) === null || A === void 0 ? void 0 : A.getPeer()) !== null && B !== void 0 ? B : this.channel.getTarget()
    }
    start(A, B) {
      this.trace("start called"), this.metadata = A.clone(), this.listener = B, this.getConfig()
    }
    sendMessageWithContext(A, B) {
      if (this.trace("write() called with message of length " + B.length), this.child) this.sendMessageOnChild(A, B);
      else this.pendingMessage = {
        context: A,
        message: B
      }
    }
    startRead() {
      if (this.trace("startRead called"), this.child) this.child.startRead();
      else this.readPending = !0
    }
    halfClose() {
      if (this.trace("halfClose called"), this.child && !this.writeFilterPending) this.child.halfClose();
      else this.pendingHalfClose = !0
    }
    setCredentials(A) {
      this.credentials = A
    }
    addStatusWatcher(A) {
      this.statusWatchers.push(A)
    }
    getCallNumber() {
      return this.callNumber
    }
  }
  Qx0.ResolvingCall = Bx0
})