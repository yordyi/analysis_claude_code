
// @from(Start 5054364, End 5096732)
Bf0 = z(($R) => {
  var aG6 = $R && $R.__runInitializers || function(A, B, Q) {
      var I = arguments.length > 2;
      for (var G = 0; G < B.length; G++) Q = I ? B[G].call(A, Q) : B[G].call(A);
      return I ? Q : void 0
    },
    sG6 = $R && $R.__esDecorate || function(A, B, Q, I, G, Z) {
      function D(q) {
        if (q !== void 0 && typeof q !== "function") throw new TypeError("Function expected");
        return q
      }
      var Y = I.kind,
        W = Y === "getter" ? "get" : Y === "setter" ? "set" : "value",
        J = !B && A ? I.static ? A : A.prototype : null,
        F = B || (J ? Object.getOwnPropertyDescriptor(J, I.name) : {}),
        X, V = !1;
      for (var C = Q.length - 1; C >= 0; C--) {
        var K = {};
        for (var E in I) K[E] = E === "access" ? {} : I[E];
        for (var E in I.access) K.access[E] = I.access[E];
        K.addInitializer = function(q) {
          if (V) throw new TypeError("Cannot add initializers after decoration has completed");
          Z.push(D(q || null))
        };
        var N = Q[C](Y === "accessor" ? {
          get: F.get,
          set: F.set
        } : F[W], K);
        if (Y === "accessor") {
          if (N === void 0) continue;
          if (N === null || typeof N !== "object") throw new TypeError("Object expected");
          if (X = D(N.get)) F.get = X;
          if (X = D(N.set)) F.set = X;
          if (X = D(N.init)) G.unshift(X)
        } else if (X = D(N))
          if (Y === "field") G.unshift(X);
          else F[W] = X
      }
      if (J) Object.defineProperty(J, I.name, F);
      V = !0
    };
  Object.defineProperty($R, "__esModule", {
    value: !0
  });
  $R.Server = void 0;
  var lY = Z1("http2"),
    rG6 = Z1("util"),
    _Q = y6(),
    Hh = yx0(),
    Fd1 = aD1(),
    sx0 = Zw(),
    Kh = GB(),
    NR = PX(),
    nC = uY(),
    d7 = Aj(),
    rx0 = Jd1(),
    Ch = 2147483647,
    Xd1 = 2147483647,
    oG6 = 20000,
    ox0 = 2147483647,
    {
      HTTP2_HEADER_PATH: tx0
    } = lY.constants,
    tG6 = "server",
    ex0 = Buffer.from("max_age");

  function Af0(A) {
    Kh.trace(_Q.LogVerbosity.DEBUG, "server_call", A)
  }

  function eG6() {}

  function AZ6(A) {
    return function(B, Q) {
      return rG6.deprecate(B, A)
    }
  }

  function Vd1(A) {
    return {
      code: _Q.Status.UNIMPLEMENTED,
      details: `The server does not implement the method ${A}`
    }
  }

  function BZ6(A, B) {
    let Q = Vd1(B);
    switch (A) {
      case "unary":
        return (I, G) => {
          G(Q, null)
        };
      case "clientStream":
        return (I, G) => {
          G(Q, null)
        };
      case "serverStream":
        return (I) => {
          I.emit("error", Q)
        };
      case "bidi":
        return (I) => {
          I.emit("error", Q)
        };
      default:
        throw new Error(`Invalid handlerType ${A}`)
    }
  }
  var QZ6 = (() => {
    var A;
    let B = [],
      Q;
    return A = class I {
      constructor(G) {
        var Z, D, Y, W, J, F;
        if (this.boundPorts = (aG6(this, B), new Map), this.http2Servers = new Map, this.sessionIdleTimeouts = new Map, this.handlers = new Map, this.sessions = new Map, this.started = !1, this.shutdown = !1, this.serverAddressString = "null", this.channelzEnabled = !0, this.options = G !== null && G !== void 0 ? G : {}, this.options["grpc.enable_channelz"] === 0) this.channelzEnabled = !1, this.channelzTrace = new d7.ChannelzTraceStub, this.callTracker = new d7.ChannelzCallTrackerStub, this.listenerChildrenTracker = new d7.ChannelzChildrenTrackerStub, this.sessionChildrenTracker = new d7.ChannelzChildrenTrackerStub;
        else this.channelzTrace = new d7.ChannelzTrace, this.callTracker = new d7.ChannelzCallTracker, this.listenerChildrenTracker = new d7.ChannelzChildrenTracker, this.sessionChildrenTracker = new d7.ChannelzChildrenTracker;
        if (this.channelzRef = d7.registerChannelzServer("server", () => this.getChannelzInfo(), this.channelzEnabled), this.channelzTrace.addTrace("CT_INFO", "Server created"), this.maxConnectionAgeMs = (Z = this.options["grpc.max_connection_age_ms"]) !== null && Z !== void 0 ? Z : Ch, this.maxConnectionAgeGraceMs = (D = this.options["grpc.max_connection_age_grace_ms"]) !== null && D !== void 0 ? D : Ch, this.keepaliveTimeMs = (Y = this.options["grpc.keepalive_time_ms"]) !== null && Y !== void 0 ? Y : Xd1, this.keepaliveTimeoutMs = (W = this.options["grpc.keepalive_timeout_ms"]) !== null && W !== void 0 ? W : oG6, this.sessionIdleTimeout = (J = this.options["grpc.max_connection_idle_ms"]) !== null && J !== void 0 ? J : ox0, this.commonServerOptions = {
            maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER
          }, "grpc-node.max_session_memory" in this.options) this.commonServerOptions.maxSessionMemory = this.options["grpc-node.max_session_memory"];
        else this.commonServerOptions.maxSessionMemory = Number.MAX_SAFE_INTEGER;
        if ("grpc.max_concurrent_streams" in this.options) this.commonServerOptions.settings = {
          maxConcurrentStreams: this.options["grpc.max_concurrent_streams"]
        };
        this.interceptors = (F = this.options.interceptors) !== null && F !== void 0 ? F : [], this.trace("Server constructed")
      }
      getChannelzInfo() {
        return {
          trace: this.channelzTrace,
          callTracker: this.callTracker,
          listenerChildren: this.listenerChildrenTracker.getChildLists(),
          sessionChildren: this.sessionChildrenTracker.getChildLists()
        }
      }
      getChannelzSessionInfo(G) {
        var Z, D, Y;
        let W = this.sessions.get(G),
          J = G.socket,
          F = J.remoteAddress ? NR.stringToSubchannelAddress(J.remoteAddress, J.remotePort) : null,
          X = J.localAddress ? NR.stringToSubchannelAddress(J.localAddress, J.localPort) : null,
          V;
        if (G.encrypted) {
          let K = J,
            E = K.getCipher(),
            N = K.getCertificate(),
            q = K.getPeerCertificate();
          V = {
            cipherSuiteStandardName: (Z = E.standardName) !== null && Z !== void 0 ? Z : null,
            cipherSuiteOtherName: E.standardName ? null : E.name,
            localCertificate: N && "raw" in N ? N.raw : null,
            remoteCertificate: q && "raw" in q ? q.raw : null
          }
        } else V = null;
        return {
          remoteAddress: F,
          localAddress: X,
          security: V,
          remoteName: null,
          streamsStarted: W.streamTracker.callsStarted,
          streamsSucceeded: W.streamTracker.callsSucceeded,
          streamsFailed: W.streamTracker.callsFailed,
          messagesSent: W.messagesSent,
          messagesReceived: W.messagesReceived,
          keepAlivesSent: W.keepAlivesSent,
          lastLocalStreamCreatedTimestamp: null,
          lastRemoteStreamCreatedTimestamp: W.streamTracker.lastCallStartedTimestamp,
          lastMessageSentTimestamp: W.lastMessageSentTimestamp,
          lastMessageReceivedTimestamp: W.lastMessageReceivedTimestamp,
          localFlowControlWindow: (D = G.state.localWindowSize) !== null && D !== void 0 ? D : null,
          remoteFlowControlWindow: (Y = G.state.remoteWindowSize) !== null && Y !== void 0 ? Y : null
        }
      }
      trace(G) {
        Kh.trace(_Q.LogVerbosity.DEBUG, tG6, "(" + this.channelzRef.id + ") " + G)
      }
      keepaliveTrace(G) {
        Kh.trace(_Q.LogVerbosity.DEBUG, "keepalive", "(" + this.channelzRef.id + ") " + G)
      }
      addProtoService() {
        throw new Error("Not implemented. Use addService() instead")
      }
      addService(G, Z) {
        if (G === null || typeof G !== "object" || Z === null || typeof Z !== "object") throw new Error("addService() requires two objects as arguments");
        let D = Object.keys(G);
        if (D.length === 0) throw new Error("Cannot add an empty service to a server");
        D.forEach((Y) => {
          let W = G[Y],
            J;
          if (W.requestStream)
            if (W.responseStream) J = "bidi";
            else J = "clientStream";
          else if (W.responseStream) J = "serverStream";
          else J = "unary";
          let F = Z[Y],
            X;
          if (F === void 0 && typeof W.originalName === "string") F = Z[W.originalName];
          if (F !== void 0) X = F.bind(Z);
          else X = BZ6(J, Y);
          if (this.register(W.path, X, W.responseSerialize, W.requestDeserialize, J) === !1) throw new Error(`Method handler for ${W.path} already provided.`)
        })
      }
      removeService(G) {
        if (G === null || typeof G !== "object") throw new Error("removeService() requires object as argument");
        Object.keys(G).forEach((D) => {
          let Y = G[D];
          this.unregister(Y.path)
        })
      }
      bind(G, Z) {
        throw new Error("Not implemented. Use bindAsync() instead")
      }
      experimentalRegisterListenerToChannelz(G) {
        return d7.registerChannelzSocket(NR.subchannelAddressToString(G), () => {
          return {
            localAddress: G,
            remoteAddress: null,
            security: null,
            remoteName: null,
            streamsStarted: 0,
            streamsSucceeded: 0,
            streamsFailed: 0,
            messagesSent: 0,
            messagesReceived: 0,
            keepAlivesSent: 0,
            lastLocalStreamCreatedTimestamp: null,
            lastRemoteStreamCreatedTimestamp: null,
            lastMessageSentTimestamp: null,
            lastMessageReceivedTimestamp: null,
            localFlowControlWindow: null,
            remoteFlowControlWindow: null
          }
        }, this.channelzEnabled)
      }
      experimentalUnregisterListenerFromChannelz(G) {
        d7.unregisterChannelzRef(G)
      }
      createHttp2Server(G) {
        let Z;
        if (G._isSecure()) {
          let D = G._getConstructorOptions(),
            Y = G._getSecureContextOptions(),
            W = Object.assign(Object.assign(Object.assign(Object.assign({}, this.commonServerOptions), D), Y), {
              enableTrace: this.options["grpc-node.tls_enable_trace"] === 1
            }),
            J = Y !== null;
          this.trace("Initial credentials valid: " + J), Z = lY.createSecureServer(W), Z.prependListener("connection", (X) => {
            if (!J) this.trace("Dropped connection from " + JSON.stringify(X.address()) + " due to unloaded credentials"), X.destroy()
          }), Z.on("secureConnection", (X) => {
            X.on("error", (V) => {
              this.trace("An incoming TLS connection closed with error: " + V.message)
            })
          });
          let F = (X) => {
            if (X) {
              let V = Z;
              try {
                V.setSecureContext(X)
              } catch (C) {
                Kh.log(_Q.LogVerbosity.ERROR, "Failed to set secure context with error " + C.message), X = null
              }
            }
            J = X !== null, this.trace("Post-update credentials valid: " + J)
          };
          G._addWatcher(F), Z.on("close", () => {
            G._removeWatcher(F)
          })
        } else Z = lY.createServer(this.commonServerOptions);
        return Z.setTimeout(0, eG6), this._setupHandlers(Z, G._getInterceptors()), Z
      }
      bindOneAddress(G, Z) {
        this.trace("Attempting to bind " + NR.subchannelAddressToString(G));
        let D = this.createHttp2Server(Z.credentials);
        return new Promise((Y, W) => {
          let J = (F) => {
            this.trace("Failed to bind " + NR.subchannelAddressToString(G) + " with error " + F.message), Y({
              port: "port" in G ? G.port : 1,
              error: F.message
            })
          };
          D.once("error", J), D.listen(G, () => {
            let F = D.address(),
              X;
            if (typeof F === "string") X = {
              path: F
            };
            else X = {
              host: F.address,
              port: F.port
            };
            let V = this.experimentalRegisterListenerToChannelz(X);
            this.listenerChildrenTracker.refChild(V), this.http2Servers.set(D, {
              channelzRef: V,
              sessions: new Set,
              ownsChannelzRef: !0
            }), Z.listeningServers.add(D), this.trace("Successfully bound " + NR.subchannelAddressToString(X)), Y({
              port: "port" in X ? X.port : 1
            }), D.removeListener("error", J)
          })
        })
      }
      async bindManyPorts(G, Z) {
        if (G.length === 0) return {
          count: 0,
          port: 0,
          errors: []
        };
        if (NR.isTcpSubchannelAddress(G[0]) && G[0].port === 0) {
          let D = await this.bindOneAddress(G[0], Z);
          if (D.error) {
            let Y = await this.bindManyPorts(G.slice(1), Z);
            return Object.assign(Object.assign({}, Y), {
              errors: [D.error, ...Y.errors]
            })
          } else {
            let Y = G.slice(1).map((F) => NR.isTcpSubchannelAddress(F) ? {
                host: F.host,
                port: D.port
              } : F),
              W = await Promise.all(Y.map((F) => this.bindOneAddress(F, Z))),
              J = [D, ...W];
            return {
              count: J.filter((F) => F.error === void 0).length,
              port: D.port,
              errors: J.filter((F) => F.error).map((F) => F.error)
            }
          }
        } else {
          let D = await Promise.all(G.map((Y) => this.bindOneAddress(Y, Z)));
          return {
            count: D.filter((Y) => Y.error === void 0).length,
            port: D[0].port,
            errors: D.filter((Y) => Y.error).map((Y) => Y.error)
          }
        }
      }
      async bindAddressList(G, Z) {
        let D = await this.bindManyPorts(G, Z);
        if (D.count > 0) {
          if (D.count < G.length) Kh.log(_Q.LogVerbosity.INFO, `WARNING Only ${D.count} addresses added out of total ${G.length} resolved`);
          return D.port
        } else {
          let Y = `No address added out of total ${G.length} resolved`;
          throw Kh.log(_Q.LogVerbosity.ERROR, Y), new Error(`${Y} errors: [${D.errors.join(",")}]`)
        }
      }
      resolvePort(G) {
        return new Promise((Z, D) => {
          let Y = {
            onSuccessfulResolution: (J, F, X) => {
              Y.onSuccessfulResolution = () => {};
              let V = [].concat(...J.map((C) => C.addresses));
              if (V.length === 0) {
                D(new Error(`No addresses resolved for port ${G}`));
                return
              }
              Z(V)
            },
            onError: (J) => {
              D(new Error(J.details))
            }
          };
          sx0.createResolver(G, Y, this.options).updateResolution()
        })
      }
      async bindPort(G, Z) {
        let D = await this.resolvePort(G);
        if (Z.cancelled) throw this.completeUnbind(Z), new Error("bindAsync operation cancelled by unbind call");
        let Y = await this.bindAddressList(D, Z);
        if (Z.cancelled) throw this.completeUnbind(Z), new Error("bindAsync operation cancelled by unbind call");
        return Y
      }
      normalizePort(G) {
        let Z = nC.parseUri(G);
        if (Z === null) throw new Error(`Could not parse port "${G}"`);
        let D = sx0.mapUriDefaultScheme(Z);
        if (D === null) throw new Error(`Could not get a default scheme for port "${G}"`);
        return D
      }
      bindAsync(G, Z, D) {
        if (this.shutdown) throw new Error("bindAsync called after shutdown");
        if (typeof G !== "string") throw new TypeError("port must be a string");
        if (Z === null || !(Z instanceof Fd1.ServerCredentials)) throw new TypeError("creds must be a ServerCredentials object");
        if (typeof D !== "function") throw new TypeError("callback must be a function");
        this.trace("bindAsync port=" + G);
        let Y = this.normalizePort(G),
          W = (V, C) => {
            process.nextTick(() => D(V, C))
          },
          J = this.boundPorts.get(nC.uriToString(Y));
        if (J) {
          if (!Z._equals(J.credentials)) {
            W(new Error(`${G} already bound with incompatible credentials`), 0);
            return
          }
          if (J.cancelled = !1, J.completionPromise) J.completionPromise.then((V) => D(null, V), (V) => D(V, 0));
          else W(null, J.portNumber);
          return
        }
        J = {
          mapKey: nC.uriToString(Y),
          originalUri: Y,
          completionPromise: null,
          cancelled: !1,
          portNumber: 0,
          credentials: Z,
          listeningServers: new Set
        };
        let F = nC.splitHostPort(Y.path),
          X = this.bindPort(Y, J);
        if (J.completionPromise = X, (F === null || F === void 0 ? void 0 : F.port) === 0) X.then((V) => {
          let C = {
            scheme: Y.scheme,
            authority: Y.authority,
            path: nC.combineHostPort({
              host: F.host,
              port: V
            })
          };
          J.mapKey = nC.uriToString(C), J.completionPromise = null, J.portNumber = V, this.boundPorts.set(J.mapKey, J), D(null, V)
        }, (V) => {
          D(V, 0)
        });
        else this.boundPorts.set(J.mapKey, J), X.then((V) => {
          J.completionPromise = null, J.portNumber = V, D(null, V)
        }, (V) => {
          D(V, 0)
        })
      }
      registerInjectorToChannelz() {
        return d7.registerChannelzSocket("injector", () => {
          return {
            localAddress: null,
            remoteAddress: null,
            security: null,
            remoteName: null,
            streamsStarted: 0,
            streamsSucceeded: 0,
            streamsFailed: 0,
            messagesSent: 0,
            messagesReceived: 0,
            keepAlivesSent: 0,
            lastLocalStreamCreatedTimestamp: null,
            lastRemoteStreamCreatedTimestamp: null,
            lastMessageSentTimestamp: null,
            lastMessageReceivedTimestamp: null,
            localFlowControlWindow: null,
            remoteFlowControlWindow: null
          }
        }, this.channelzEnabled)
      }
      experimentalCreateConnectionInjectorWithChannelzRef(G, Z, D = !1) {
        if (G === null || !(G instanceof Fd1.ServerCredentials)) throw new TypeError("creds must be a ServerCredentials object");
        if (this.channelzEnabled) this.listenerChildrenTracker.refChild(Z);
        let Y = this.createHttp2Server(G),
          W = new Set;
        return this.http2Servers.set(Y, {
          channelzRef: Z,
          sessions: W,
          ownsChannelzRef: D
        }), {
          injectConnection: (J) => {
            Y.emit("connection", J)
          },
          drain: (J) => {
            var F, X;
            for (let V of W) this.closeSession(V);
            (X = (F = setTimeout(() => {
              for (let V of W) V.destroy(lY.constants.NGHTTP2_CANCEL)
            }, J)).unref) === null || X === void 0 || X.call(F)
          },
          destroy: () => {
            this.closeServer(Y);
            for (let J of W) this.closeSession(J)
          }
        }
      }
      createConnectionInjector(G) {
        if (G === null || !(G instanceof Fd1.ServerCredentials)) throw new TypeError("creds must be a ServerCredentials object");
        let Z = this.registerInjectorToChannelz();
        return this.experimentalCreateConnectionInjectorWithChannelzRef(G, Z, !0)
      }
      closeServer(G, Z) {
        this.trace("Closing server with address " + JSON.stringify(G.address()));
        let D = this.http2Servers.get(G);
        G.close(() => {
          if (D && D.ownsChannelzRef) this.listenerChildrenTracker.unrefChild(D.channelzRef), d7.unregisterChannelzRef(D.channelzRef);
          this.http2Servers.delete(G), Z === null || Z === void 0 || Z()
        })
      }
      closeSession(G, Z) {
        var D;
        this.trace("Closing session initiated by " + ((D = G.socket) === null || D === void 0 ? void 0 : D.remoteAddress));
        let Y = this.sessions.get(G),
          W = () => {
            if (Y) this.sessionChildrenTracker.unrefChild(Y.ref), d7.unregisterChannelzRef(Y.ref);
            Z === null || Z === void 0 || Z()
          };
        if (G.closed) queueMicrotask(W);
        else G.close(W)
      }
      completeUnbind(G) {
        for (let Z of G.listeningServers) {
          let D = this.http2Servers.get(Z);
          if (this.closeServer(Z, () => {
              G.listeningServers.delete(Z)
            }), D)
            for (let Y of D.sessions) this.closeSession(Y)
        }
        this.boundPorts.delete(G.mapKey)
      }
      unbind(G) {
        this.trace("unbind port=" + G);
        let Z = this.normalizePort(G),
          D = nC.splitHostPort(Z.path);
        if ((D === null || D === void 0 ? void 0 : D.port) === 0) throw new Error("Cannot unbind port 0");
        let Y = this.boundPorts.get(nC.uriToString(Z));
        if (Y)
          if (this.trace("unbinding " + Y.mapKey + " originally bound as " + nC.uriToString(Y.originalUri)), Y.completionPromise) Y.cancelled = !0;
          else this.completeUnbind(Y)
      }
      drain(G, Z) {
        var D, Y;
        this.trace("drain port=" + G + " graceTimeMs=" + Z);
        let W = this.normalizePort(G),
          J = nC.splitHostPort(W.path);
        if ((J === null || J === void 0 ? void 0 : J.port) === 0) throw new Error("Cannot drain port 0");
        let F = this.boundPorts.get(nC.uriToString(W));
        if (!F) return;
        let X = new Set;
        for (let V of F.listeningServers) {
          let C = this.http2Servers.get(V);
          if (C)
            for (let K of C.sessions) X.add(K), this.closeSession(K, () => {
              X.delete(K)
            })
        }(Y = (D = setTimeout(() => {
          for (let V of X) V.destroy(lY.constants.NGHTTP2_CANCEL)
        }, Z)).unref) === null || Y === void 0 || Y.call(D)
      }
      forceShutdown() {
        for (let G of this.boundPorts.values()) G.cancelled = !0;
        this.boundPorts.clear();
        for (let G of this.http2Servers.keys()) this.closeServer(G);
        this.sessions.forEach((G, Z) => {
          this.closeSession(Z), Z.destroy(lY.constants.NGHTTP2_CANCEL)
        }), this.sessions.clear(), d7.unregisterChannelzRef(this.channelzRef), this.shutdown = !0
      }
      register(G, Z, D, Y, W) {
        if (this.handlers.has(G)) return !1;
        return this.handlers.set(G, {
          func: Z,
          serialize: D,
          deserialize: Y,
          type: W,
          path: G
        }), !0
      }
      unregister(G) {
        return this.handlers.delete(G)
      }
      start() {
        if (this.http2Servers.size === 0 || [...this.http2Servers.keys()].every((G) => !G.listening)) throw new Error("server must be bound in order to start");
        if (this.started === !0) throw new Error("server is already started");
        this.started = !0
      }
      tryShutdown(G) {
        var Z;
        let D = (J) => {
            d7.unregisterChannelzRef(this.channelzRef), G(J)
          },
          Y = 0;

        function W() {
          if (Y--, Y === 0) D()
        }
        this.shutdown = !0;
        for (let [J, F] of this.http2Servers.entries()) {
          Y++;
          let X = F.channelzRef.name;
          this.trace("Waiting for server " + X + " to close"), this.closeServer(J, () => {
            this.trace("Server " + X + " finished closing"), W()
          });
          for (let V of F.sessions.keys()) {
            Y++;
            let C = (Z = V.socket) === null || Z === void 0 ? void 0 : Z.remoteAddress;
            this.trace("Waiting for session " + C + " to close"), this.closeSession(V, () => {
              this.trace("Session " + C + " finished closing"), W()
            })
          }
        }
        if (Y === 0) D()
      }
      addHttp2Port() {
        throw new Error("Not yet implemented")
      }
      getChannelzRef() {
        return this.channelzRef
      }
      _verifyContentType(G, Z) {
        let D = Z[lY.constants.HTTP2_HEADER_CONTENT_TYPE];
        if (typeof D !== "string" || !D.startsWith("application/grpc")) return G.respond({
          [lY.constants.HTTP2_HEADER_STATUS]: lY.constants.HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE
        }, {
          endStream: !0
        }), !1;
        return !0
      }
      _retrieveHandler(G) {
        Af0("Received call to method " + G + " at address " + this.serverAddressString);
        let Z = this.handlers.get(G);
        if (Z === void 0) return Af0("No handler registered for method " + G + ". Sending UNIMPLEMENTED status."), null;
        return Z
      }
      _respondWithError(G, Z, D = null) {
        var Y, W;
        let J = Object.assign({
          "grpc-status": (Y = G.code) !== null && Y !== void 0 ? Y : _Q.Status.INTERNAL,
          "grpc-message": G.details,
          [lY.constants.HTTP2_HEADER_STATUS]: lY.constants.HTTP_STATUS_OK,
          [lY.constants.HTTP2_HEADER_CONTENT_TYPE]: "application/grpc+proto"
        }, (W = G.metadata) === null || W === void 0 ? void 0 : W.toHttp2Headers());
        Z.respond(J, {
          endStream: !0
        }), this.callTracker.addCallFailed(), D === null || D === void 0 || D.streamTracker.addCallFailed()
      }
      _channelzHandler(G, Z, D) {
        this.onStreamOpened(Z);
        let Y = this.sessions.get(Z.session);
        if (this.callTracker.addCallStarted(), Y === null || Y === void 0 || Y.streamTracker.addCallStarted(), !this._verifyContentType(Z, D)) {
          this.callTracker.addCallFailed(), Y === null || Y === void 0 || Y.streamTracker.addCallFailed();
          return
        }
        let W = D[tx0],
          J = this._retrieveHandler(W);
        if (!J) {
          this._respondWithError(Vd1(W), Z, Y);
          return
        }
        let F = {
            addMessageSent: () => {
              if (Y) Y.messagesSent += 1, Y.lastMessageSentTimestamp = new Date
            },
            addMessageReceived: () => {
              if (Y) Y.messagesReceived += 1, Y.lastMessageReceivedTimestamp = new Date
            },
            onCallEnd: (V) => {
              if (V.code === _Q.Status.OK) this.callTracker.addCallSucceeded();
              else this.callTracker.addCallFailed()
            },
            onStreamEnd: (V) => {
              if (Y)
                if (V) Y.streamTracker.addCallSucceeded();
                else Y.streamTracker.addCallFailed()
            }
          },
          X = rx0.getServerInterceptingCall([...G, ...this.interceptors], Z, D, F, J, this.options);
        if (!this._runHandlerForCall(X, J)) this.callTracker.addCallFailed(), Y === null || Y === void 0 || Y.streamTracker.addCallFailed(), X.sendStatus({
          code: _Q.Status.INTERNAL,
          details: `Unknown handler type: ${J.type}`
        })
      }
      _streamHandler(G, Z, D) {
        if (this.onStreamOpened(Z), this._verifyContentType(Z, D) !== !0) return;
        let Y = D[tx0],
          W = this._retrieveHandler(Y);
        if (!W) {
          this._respondWithError(Vd1(Y), Z, null);
          return
        }
        let J = rx0.getServerInterceptingCall([...G, ...this.interceptors], Z, D, null, W, this.options);
        if (!this._runHandlerForCall(J, W)) J.sendStatus({
          code: _Q.Status.INTERNAL,
          details: `Unknown handler type: ${W.type}`
        })
      }
      _runHandlerForCall(G, Z) {
        let {
          type: D
        } = Z;
        if (D === "unary") IZ6(G, Z);
        else if (D === "clientStream") GZ6(G, Z);
        else if (D === "serverStream") ZZ6(G, Z);
        else if (D === "bidi") DZ6(G, Z);
        else return !1;
        return !0
      }
      _setupHandlers(G, Z) {
        if (G === null) return;
        let D = G.address(),
          Y = "null";
        if (D)
          if (typeof D === "string") Y = D;
          else Y = D.address + ":" + D.port;
        this.serverAddressString = Y;
        let W = this.channelzEnabled ? this._channelzHandler : this._streamHandler,
          J = this.channelzEnabled ? this._channelzSessionHandler(G) : this._sessionHandler(G);
        G.on("stream", W.bind(this, Z)), G.on("session", J)
      }
      _sessionHandler(G) {
        return (Z) => {
          var D, Y;
          (D = this.http2Servers.get(G)) === null || D === void 0 || D.sessions.add(Z);
          let W = null,
            J = null,
            F = null,
            X = !1,
            V = this.enableIdleTimeout(Z);
          if (this.maxConnectionAgeMs !== Ch) {
            let q = this.maxConnectionAgeMs / 10,
              O = Math.random() * q * 2 - q;
            W = setTimeout(() => {
              var R, T;
              X = !0, this.trace("Connection dropped by max connection age: " + ((R = Z.socket) === null || R === void 0 ? void 0 : R.remoteAddress));
              try {
                Z.goaway(lY.constants.NGHTTP2_NO_ERROR, 2147483647, ex0)
              } catch (L) {
                Z.destroy();
                return
              }
              if (Z.close(), this.maxConnectionAgeGraceMs !== Ch) J = setTimeout(() => {
                Z.destroy()
              }, this.maxConnectionAgeGraceMs), (T = J.unref) === null || T === void 0 || T.call(J)
            }, this.maxConnectionAgeMs + O), (Y = W.unref) === null || Y === void 0 || Y.call(W)
          }
          let C = () => {
              if (F) clearTimeout(F), F = null
            },
            K = () => {
              return !Z.destroyed && this.keepaliveTimeMs < Xd1 && this.keepaliveTimeMs > 0
            },
            E, N = () => {
              var q;
              if (!K()) return;
              this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms"), F = setTimeout(() => {
                C(), E()
              }, this.keepaliveTimeMs), (q = F.unref) === null || q === void 0 || q.call(F)
            };
          E = () => {
            var q;
            if (!K()) return;
            this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
            let O = "";
            try {
              if (!Z.ping((T, L, _) => {
                  if (C(), T) this.keepaliveTrace("Ping failed with error: " + T.message), X = !0, Z.close();
                  else this.keepaliveTrace("Received ping response"), N()
                })) O = "Ping returned false"
            } catch (R) {
              O = (R instanceof Error ? R.message : "") || "Unknown error"
            }
            if (O) {
              this.keepaliveTrace("Ping send failed: " + O), this.trace("Connection dropped due to ping send error: " + O), X = !0, Z.close();
              return
            }
            F = setTimeout(() => {
              C(), this.keepaliveTrace("Ping timeout passed without response"), this.trace("Connection dropped by keepalive timeout"), X = !0, Z.close()
            }, this.keepaliveTimeoutMs), (q = F.unref) === null || q === void 0 || q.call(F)
          }, N(), Z.on("close", () => {
            var q, O;
            if (!X) this.trace(`Connection dropped by client ${(q=Z.socket)===null||q===void 0?void 0:q.remoteAddress}`);
            if (W) clearTimeout(W);
            if (J) clearTimeout(J);
            if (C(), V !== null) clearTimeout(V.timeout), this.sessionIdleTimeouts.delete(Z);
            (O = this.http2Servers.get(G)) === null || O === void 0 || O.sessions.delete(Z)
          })
        }
      }
      _channelzSessionHandler(G) {
        return (Z) => {
          var D, Y, W, J;
          let F = d7.registerChannelzSocket((Y = (D = Z.socket) === null || D === void 0 ? void 0 : D.remoteAddress) !== null && Y !== void 0 ? Y : "unknown", this.getChannelzSessionInfo.bind(this, Z), this.channelzEnabled),
            X = {
              ref: F,
              streamTracker: new d7.ChannelzCallTracker,
              messagesSent: 0,
              messagesReceived: 0,
              keepAlivesSent: 0,
              lastMessageSentTimestamp: null,
              lastMessageReceivedTimestamp: null
            };
          (W = this.http2Servers.get(G)) === null || W === void 0 || W.sessions.add(Z), this.sessions.set(Z, X);
          let V = `${Z.socket.remoteAddress}:${Z.socket.remotePort}`;
          this.channelzTrace.addTrace("CT_INFO", "Connection established by client " + V), this.trace("Connection established by client " + V), this.sessionChildrenTracker.refChild(F);
          let C = null,
            K = null,
            E = null,
            N = !1,
            q = this.enableIdleTimeout(Z);
          if (this.maxConnectionAgeMs !== Ch) {
            let _ = this.maxConnectionAgeMs / 10,
              k = Math.random() * _ * 2 - _;
            C = setTimeout(() => {
              var i;
              N = !0, this.channelzTrace.addTrace("CT_INFO", "Connection dropped by max connection age from " + V);
              try {
                Z.goaway(lY.constants.NGHTTP2_NO_ERROR, 2147483647, ex0)
              } catch (x) {
                Z.destroy();
                return
              }
              if (Z.close(), this.maxConnectionAgeGraceMs !== Ch) K = setTimeout(() => {
                Z.destroy()
              }, this.maxConnectionAgeGraceMs), (i = K.unref) === null || i === void 0 || i.call(K)
            }, this.maxConnectionAgeMs + k), (J = C.unref) === null || J === void 0 || J.call(C)
          }
          let O = () => {
              if (E) clearTimeout(E), E = null
            },
            R = () => {
              return !Z.destroyed && this.keepaliveTimeMs < Xd1 && this.keepaliveTimeMs > 0
            },
            T, L = () => {
              var _;
              if (!R()) return;
              this.keepaliveTrace("Starting keepalive timer for " + this.keepaliveTimeMs + "ms"), E = setTimeout(() => {
                O(), T()
              }, this.keepaliveTimeMs), (_ = E.unref) === null || _ === void 0 || _.call(E)
            };
          T = () => {
            var _;
            if (!R()) return;
            this.keepaliveTrace("Sending ping with timeout " + this.keepaliveTimeoutMs + "ms");
            let k = "";
            try {
              if (!Z.ping((x, s, d) => {
                  if (O(), x) this.keepaliveTrace("Ping failed with error: " + x.message), this.channelzTrace.addTrace("CT_INFO", "Connection dropped due to error of a ping frame " + x.message + " return in " + s), N = !0, Z.close();
                  else this.keepaliveTrace("Received ping response"), L()
                })) k = "Ping returned false"
            } catch (i) {
              k = (i instanceof Error ? i.message : "") || "Unknown error"
            }
            if (k) {
              this.keepaliveTrace("Ping send failed: " + k), this.channelzTrace.addTrace("CT_INFO", "Connection dropped due to ping send error: " + k), N = !0, Z.close();
              return
            }
            X.keepAlivesSent += 1, E = setTimeout(() => {
              O(), this.keepaliveTrace("Ping timeout passed without response"), this.channelzTrace.addTrace("CT_INFO", "Connection dropped by keepalive timeout from " + V), N = !0, Z.close()
            }, this.keepaliveTimeoutMs), (_ = E.unref) === null || _ === void 0 || _.call(E)
          }, L(), Z.on("close", () => {
            var _;
            if (!N) this.channelzTrace.addTrace("CT_INFO", "Connection dropped by client " + V);
            if (this.sessionChildrenTracker.unrefChild(F), d7.unregisterChannelzRef(F), C) clearTimeout(C);
            if (K) clearTimeout(K);
            if (O(), q !== null) clearTimeout(q.timeout), this.sessionIdleTimeouts.delete(Z);
            (_ = this.http2Servers.get(G)) === null || _ === void 0 || _.sessions.delete(Z), this.sessions.delete(Z)
          })
        }
      }
      enableIdleTimeout(G) {
        var Z, D;
        if (this.sessionIdleTimeout >= ox0) return null;
        let Y = {
          activeStreams: 0,
          lastIdle: Date.now(),
          onClose: this.onStreamClose.bind(this, G),
          timeout: setTimeout(this.onIdleTimeout, this.sessionIdleTimeout, this, G)
        };
        (D = (Z = Y.timeout).unref) === null || D === void 0 || D.call(Z), this.sessionIdleTimeouts.set(G, Y);
        let {
          socket: W
        } = G;
        return this.trace("Enable idle timeout for " + W.remoteAddress + ":" + W.remotePort), Y
      }
      onIdleTimeout(G, Z) {
        let {
          socket: D
        } = Z, Y = G.sessionIdleTimeouts.get(Z);
        if (Y !== void 0 && Y.activeStreams === 0)
          if (Date.now() - Y.lastIdle >= G.sessionIdleTimeout) G.trace("Session idle timeout triggered for " + (D === null || D === void 0 ? void 0 : D.remoteAddress) + ":" + (D === null || D === void 0 ? void 0 : D.remotePort) + " last idle at " + Y.lastIdle), G.closeSession(Z);
          else Y.timeout.refresh()
      }
      onStreamOpened(G) {
        let Z = G.session,
          D = this.sessionIdleTimeouts.get(Z);
        if (D) D.activeStreams += 1, G.once("close", D.onClose)
      }
      onStreamClose(G) {
        var Z, D;
        let Y = this.sessionIdleTimeouts.get(G);
        if (Y) {
          if (Y.activeStreams -= 1, Y.activeStreams === 0) Y.lastIdle = Date.now(), Y.timeout.refresh(), this.trace("Session onStreamClose" + ((Z = G.socket) === null || Z === void 0 ? void 0 : Z.remoteAddress) + ":" + ((D = G.socket) === null || D === void 0 ? void 0 : D.remotePort) + " at " + Y.lastIdle)
        }
      }
    }, (() => {
      let I = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
      if (Q = [AZ6("Calling start() is no longer necessary. It can be safely omitted.")], sG6(A, null, Q, {
          kind: "method",
          name: "start",
          static: !1,
          private: !1,
          access: {
            has: (G) => ("start" in G),
            get: (G) => G.start
          },
          metadata: I
        }, null, B), I) Object.defineProperty(A, Symbol.metadata, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: I
      })
    })(), A
  })();
  $R.Server = QZ6;
  async function IZ6(A, B) {
    let Q;

    function I(D, Y, W, J) {
      if (D) {
        A.sendStatus(Hh.serverErrorToStatus(D, W));
        return
      }
      A.sendMessage(Y, () => {
        A.sendStatus({
          code: _Q.Status.OK,
          details: "OK",
          metadata: W !== null && W !== void 0 ? W : null
        })
      })
    }
    let G, Z = null;
    A.start({
      onReceiveMetadata(D) {
        G = D, A.startRead()
      },
      onReceiveMessage(D) {
        if (Z) {
          A.sendStatus({
            code: _Q.Status.UNIMPLEMENTED,
            details: `Received a second request message for server streaming method ${B.path}`,
            metadata: null
          });
          return
        }
        Z = D, A.startRead()
      },
      onReceiveHalfClose() {
        if (!Z) {
          A.sendStatus({
            code: _Q.Status.UNIMPLEMENTED,
            details: `Received no request message for server streaming method ${B.path}`,
            metadata: null
          });
          return
        }
        Q = new Hh.ServerWritableStreamImpl(B.path, A, G, Z);
        try {
          B.func(Q, I)
        } catch (D) {
          A.sendStatus({
            code: _Q.Status.UNKNOWN,
            details: `Server method handler threw error ${D.message}`,
            metadata: null
          })
        }
      },
      onCancel() {
        if (Q) Q.cancelled = !0, Q.emit("cancelled", "cancelled")
      }
    })
  }

  function GZ6(A, B) {
    let Q;

    function I(G, Z, D, Y) {
      if (G) {
        A.sendStatus(Hh.serverErrorToStatus(G, D));
        return
      }
      A.sendMessage(Z, () => {
        A.sendStatus({
          code: _Q.Status.OK,
          details: "OK",
          metadata: D !== null && D !== void 0 ? D : null
        })
      })
    }
    A.start({
      onReceiveMetadata(G) {
        Q = new Hh.ServerDuplexStreamImpl(B.path, A, G);
        try {
          B.func(Q, I)
        } catch (Z) {
          A.sendStatus({
            code: _Q.Status.UNKNOWN,
            details: `Server method handler threw error ${Z.message}`,
            metadata: null
          })
        }
      },
      onReceiveMessage(G) {
        Q.push(G)
      },
      onReceiveHalfClose() {
        Q.push(null)
      },
      onCancel() {
        if (Q) Q.cancelled = !0, Q.emit("cancelled", "cancelled"), Q.destroy()
      }
    })
  }

  function ZZ6(A, B) {
    let Q, I, G = null;
    A.start({
      onReceiveMetadata(Z) {
        I = Z, A.startRead()
      },
      onReceiveMessage(Z) {
        if (G) {
          A.sendStatus({
            code: _Q.Status.UNIMPLEMENTED,
            details: `Received a second request message for server streaming method ${B.path}`,
            metadata: null
          });
          return
        }
        G = Z, A.startRead()
      },
      onReceiveHalfClose() {
        if (!G) {
          A.sendStatus({
            code: _Q.Status.UNIMPLEMENTED,
            details: `Received no request message for server streaming method ${B.path}`,
            metadata: null
          });
          return
        }
        Q = new Hh.ServerWritableStreamImpl(B.path, A, I, G);
        try {
          B.func(Q)
        } catch (Z) {
          A.sendStatus({
            code: _Q.Status.UNKNOWN,
            details: `Server method handler threw error ${Z.message}`,
            metadata: null
          })
        }
      },
      onCancel() {
        if (Q) Q.cancelled = !0, Q.emit("cancelled", "cancelled"), Q.destroy()
      }
    })
  }

  function DZ6(A, B) {
    let Q;
    A.start({
      onReceiveMetadata(I) {
        Q = new Hh.ServerDuplexStreamImpl(B.path, A, I);
        try {
          B.func(Q)
        } catch (G) {
          A.sendStatus({
            code: _Q.Status.UNKNOWN,
            details: `Server method handler threw error ${G.message}`,
            metadata: null
          })
        }
      },
      onReceiveMessage(I) {
        Q.push(I)
      },
      onReceiveHalfClose() {
        Q.push(null)
      },
      onCancel() {
        if (Q) Q.cancelled = !0, Q.emit("cancelled", "cancelled"), Q.destroy()
      }
    })
  }
})
// @from(Start 5096738, End 5097399)
Zf0 = z((If0) => {
  Object.defineProperty(If0, "__esModule", {
    value: !0
  });
  If0.StatusBuilder = void 0;
  class Qf0 {
    constructor() {
      this.code = null, this.details = null, this.metadata = null
    }
    withCode(A) {
      return this.code = A, this
    }
    withDetails(A) {
      return this.details = A, this
    }
    withMetadata(A) {
      return this.metadata = A, this
    }
    build() {
      let A = {};
      if (this.code !== null) A.code = this.code;
      if (this.details !== null) A.details = this.details;
      if (this.metadata !== null) A.metadata = this.metadata;
      return A
    }
  }
  If0.StatusBuilder = Qf0
})
// @from(Start 5097405, End 5098107)
Cd1 = z((Df0) => {
  Object.defineProperty(Df0, "__esModule", {
    value: !0
  });
  Df0.msToDuration = YZ6;
  Df0.durationToMs = WZ6;
  Df0.isDuration = JZ6;
  Df0.parseDuration = XZ6;

  function YZ6(A) {
    return {
      seconds: A / 1000 | 0,
      nanos: A % 1000 * 1e6 | 0
    }
  }

  function WZ6(A) {
    return A.seconds * 1000 + A.nanos / 1e6 | 0
  }

  function JZ6(A) {
    return typeof A.seconds === "number" && typeof A.nanos === "number"
  }
  var FZ6 = /^(\d+)(?:\.(\d+))?s$/;

  function XZ6(A) {
    let B = A.match(FZ6);
    if (!B) return null;
    return {
      seconds: Number.parseInt(B[1], 10),
      nanos: B[2] ? Number.parseInt(B[2].padEnd(9, "0"), 10) : 0
    }
  }
})
// @from(Start 5098113, End 5109278)
tD1 = z((Kf0) => {
  Object.defineProperty(Kf0, "__esModule", {
    value: !0
  });
  Kf0.LeafLoadBalancer = Kf0.PickFirstLoadBalancer = Kf0.PickFirstLoadBalancingConfig = void 0;
  Kf0.shuffled = Xf0;
  Kf0.setup = qZ6;
  var Kd1 = a_(),
    V7 = TX(),
    Gj = FR(),
    Yf0 = PX(),
    zZ6 = GB(),
    wZ6 = y6(),
    Wf0 = PX(),
    Jf0 = Z1("net"),
    EZ6 = "pick_first";

  function Er(A) {
    zZ6.trace(wZ6.LogVerbosity.DEBUG, EZ6, A)
  }
  var Ur = "pick_first",
    UZ6 = 250;
  class zh {
    constructor(A) {
      this.shuffleAddressList = A
    }
    getLoadBalancerName() {
      return Ur
    }
    toJsonObject() {
      return {
        [Ur]: {
          shuffleAddressList: this.shuffleAddressList
        }
      }
    }
    getShuffleAddressList() {
      return this.shuffleAddressList
    }
    static createFromJson(A) {
      if ("shuffleAddressList" in A && typeof A.shuffleAddressList !== "boolean") throw new Error("pick_first config field shuffleAddressList must be a boolean if provided");
      return new zh(A.shuffleAddressList === !0)
    }
  }
  Kf0.PickFirstLoadBalancingConfig = zh;
  class Ff0 {
    constructor(A) {
      this.subchannel = A
    }
    pick(A) {
      return {
        pickResultType: Gj.PickResultType.COMPLETE,
        subchannel: this.subchannel,
        status: null,
        onCallStarted: null,
        onCallEnded: null
      }
    }
  }

  function Xf0(A) {
    let B = A.slice();
    for (let Q = B.length - 1; Q > 1; Q--) {
      let I = Math.floor(Math.random() * (Q + 1)),
        G = B[Q];
      B[Q] = B[I], B[I] = G
    }
    return B
  }

  function NZ6(A) {
    if (A.length === 0) return [];
    let B = [],
      Q = [],
      I = [],
      G = Wf0.isTcpSubchannelAddress(A[0]) && Jf0.isIPv6(A[0].host);
    for (let Y of A)
      if (Wf0.isTcpSubchannelAddress(Y) && Jf0.isIPv6(Y.host)) Q.push(Y);
      else I.push(Y);
    let Z = G ? Q : I,
      D = G ? I : Q;
    for (let Y = 0; Y < Math.max(Z.length, D.length); Y++) {
      if (Y < Z.length) B.push(Z[Y]);
      if (Y < D.length) B.push(D[Y])
    }
    return B
  }
  var Vf0 = "grpc-node.internal.pick-first.report_health_status";
  class oD1 {
    constructor(A) {
      this.channelControlHelper = A, this.children = [], this.currentState = V7.ConnectivityState.IDLE, this.currentSubchannelIndex = 0, this.currentPick = null, this.subchannelStateListener = (B, Q, I, G, Z) => {
        this.onSubchannelStateUpdate(B, Q, I, Z)
      }, this.pickedSubchannelHealthListener = () => this.calculateAndReportNewState(), this.stickyTransientFailureMode = !1, this.reportHealthStatus = !1, this.lastError = null, this.latestAddressList = null, this.latestOptions = {}, this.connectionDelayTimeout = setTimeout(() => {}, 0), clearTimeout(this.connectionDelayTimeout)
    }
    allChildrenHaveReportedTF() {
      return this.children.every((A) => A.hasReportedTransientFailure)
    }
    resetChildrenReportedTF() {
      this.children.every((A) => A.hasReportedTransientFailure = !1)
    }
    calculateAndReportNewState() {
      var A;
      if (this.currentPick)
        if (this.reportHealthStatus && !this.currentPick.isHealthy()) {
          let B = `Picked subchannel ${this.currentPick.getAddress()} is unhealthy`;
          this.updateState(V7.ConnectivityState.TRANSIENT_FAILURE, new Gj.UnavailablePicker({
            details: B
          }), B)
        } else this.updateState(V7.ConnectivityState.READY, new Ff0(this.currentPick), null);
      else if (((A = this.latestAddressList) === null || A === void 0 ? void 0 : A.length) === 0) {
        let B = `No connection established. Last error: ${this.lastError}`;
        this.updateState(V7.ConnectivityState.TRANSIENT_FAILURE, new Gj.UnavailablePicker({
          details: B
        }), B)
      } else if (this.children.length === 0) this.updateState(V7.ConnectivityState.IDLE, new Gj.QueuePicker(this), null);
      else if (this.stickyTransientFailureMode) {
        let B = `No connection established. Last error: ${this.lastError}`;
        this.updateState(V7.ConnectivityState.TRANSIENT_FAILURE, new Gj.UnavailablePicker({
          details: B
        }), B)
      } else this.updateState(V7.ConnectivityState.CONNECTING, new Gj.QueuePicker(this), null)
    }
    requestReresolution() {
      this.channelControlHelper.requestReresolution()
    }
    maybeEnterStickyTransientFailureMode() {
      if (!this.allChildrenHaveReportedTF()) return;
      if (this.requestReresolution(), this.resetChildrenReportedTF(), this.stickyTransientFailureMode) {
        this.calculateAndReportNewState();
        return
      }
      this.stickyTransientFailureMode = !0;
      for (let {
          subchannel: A
        }
        of this.children) A.startConnecting();
      this.calculateAndReportNewState()
    }
    removeCurrentPick() {
      if (this.currentPick !== null) this.currentPick.removeConnectivityStateListener(this.subchannelStateListener), this.channelControlHelper.removeChannelzChild(this.currentPick.getChannelzRef()), this.currentPick.removeHealthStateWatcher(this.pickedSubchannelHealthListener), this.currentPick.unref(), this.currentPick = null
    }
    onSubchannelStateUpdate(A, B, Q, I) {
      var G;
      if ((G = this.currentPick) === null || G === void 0 ? void 0 : G.realSubchannelEquals(A)) {
        if (Q !== V7.ConnectivityState.READY) this.removeCurrentPick(), this.calculateAndReportNewState();
        return
      }
      for (let [Z, D] of this.children.entries())
        if (A.realSubchannelEquals(D.subchannel)) {
          if (Q === V7.ConnectivityState.READY) this.pickSubchannel(D.subchannel);
          if (Q === V7.ConnectivityState.TRANSIENT_FAILURE) {
            if (D.hasReportedTransientFailure = !0, I) this.lastError = I;
            if (this.maybeEnterStickyTransientFailureMode(), Z === this.currentSubchannelIndex) this.startNextSubchannelConnecting(Z + 1)
          }
          D.subchannel.startConnecting();
          return
        }
    }
    startNextSubchannelConnecting(A) {
      clearTimeout(this.connectionDelayTimeout);
      for (let [B, Q] of this.children.entries())
        if (B >= A) {
          let I = Q.subchannel.getConnectivityState();
          if (I === V7.ConnectivityState.IDLE || I === V7.ConnectivityState.CONNECTING) {
            this.startConnecting(B);
            return
          }
        } this.maybeEnterStickyTransientFailureMode()
    }
    startConnecting(A) {
      var B, Q;
      if (clearTimeout(this.connectionDelayTimeout), this.currentSubchannelIndex = A, this.children[A].subchannel.getConnectivityState() === V7.ConnectivityState.IDLE) Er("Start connecting to subchannel with address " + this.children[A].subchannel.getAddress()), process.nextTick(() => {
        var I;
        (I = this.children[A]) === null || I === void 0 || I.subchannel.startConnecting()
      });
      this.connectionDelayTimeout = setTimeout(() => {
        this.startNextSubchannelConnecting(A + 1)
      }, UZ6), (Q = (B = this.connectionDelayTimeout).unref) === null || Q === void 0 || Q.call(B)
    }
    pickSubchannel(A) {
      Er("Pick subchannel with address " + A.getAddress()), this.stickyTransientFailureMode = !1, A.ref(), this.channelControlHelper.addChannelzChild(A.getChannelzRef()), this.removeCurrentPick(), this.resetSubchannelList(), A.addConnectivityStateListener(this.subchannelStateListener), A.addHealthStateWatcher(this.pickedSubchannelHealthListener), this.currentPick = A, clearTimeout(this.connectionDelayTimeout), this.calculateAndReportNewState()
    }
    updateState(A, B, Q) {
      Er(V7.ConnectivityState[this.currentState] + " -> " + V7.ConnectivityState[A]), this.currentState = A, this.channelControlHelper.updateState(A, B, Q)
    }
    resetSubchannelList() {
      for (let A of this.children) A.subchannel.removeConnectivityStateListener(this.subchannelStateListener), A.subchannel.unref(), this.channelControlHelper.removeChannelzChild(A.subchannel.getChannelzRef());
      this.currentSubchannelIndex = 0, this.children = []
    }
    connectToAddressList(A, B) {
      Er("connectToAddressList([" + A.map((I) => Yf0.subchannelAddressToString(I)) + "])");
      let Q = A.map((I) => ({
        subchannel: this.channelControlHelper.createSubchannel(I, B),
        hasReportedTransientFailure: !1
      }));
      for (let {
          subchannel: I
        }
        of Q)
        if (I.getConnectivityState() === V7.ConnectivityState.READY) {
          this.pickSubchannel(I);
          return
        } for (let {
          subchannel: I
        }
        of Q) I.ref(), this.channelControlHelper.addChannelzChild(I.getChannelzRef());
      this.resetSubchannelList(), this.children = Q;
      for (let {
          subchannel: I
        }
        of this.children) I.addConnectivityStateListener(this.subchannelStateListener);
      for (let I of this.children)
        if (I.subchannel.getConnectivityState() === V7.ConnectivityState.TRANSIENT_FAILURE) I.hasReportedTransientFailure = !0;
      this.startNextSubchannelConnecting(0), this.calculateAndReportNewState()
    }
    updateAddressList(A, B, Q) {
      if (!(B instanceof zh)) return;
      if (this.reportHealthStatus = Q[Vf0], B.getShuffleAddressList()) A = Xf0(A);
      let I = [].concat(...A.map((Z) => Z.addresses));
      if (Er("updateAddressList([" + I.map((Z) => Yf0.subchannelAddressToString(Z)) + "])"), I.length === 0) this.lastError = "No addresses resolved";
      let G = NZ6(I);
      this.latestAddressList = G, this.latestOptions = Q, this.connectToAddressList(G, Q)
    }
    exitIdle() {
      if (this.currentState === V7.ConnectivityState.IDLE && this.latestAddressList) this.connectToAddressList(this.latestAddressList, this.latestOptions)
    }
    resetBackoff() {}
    destroy() {
      this.resetSubchannelList(), this.removeCurrentPick()
    }
    getTypeName() {
      return Ur
    }
  }
  Kf0.PickFirstLoadBalancer = oD1;
  var $Z6 = new zh(!1);
  class Cf0 {
    constructor(A, B, Q) {
      this.endpoint = A, this.options = Q, this.latestState = V7.ConnectivityState.IDLE;
      let I = Kd1.createChildChannelControlHelper(B, {
        updateState: (G, Z, D) => {
          this.latestState = G, this.latestPicker = Z, B.updateState(G, Z, D)
        }
      });
      this.pickFirstBalancer = new oD1(I), this.latestPicker = new Gj.QueuePicker(this.pickFirstBalancer)
    }
    startConnecting() {
      this.pickFirstBalancer.updateAddressList([this.endpoint], $Z6, Object.assign(Object.assign({}, this.options), {
        [Vf0]: !0
      }))
    }
    updateEndpoint(A, B) {
      if (this.options = B, this.endpoint = A, this.latestState !== V7.ConnectivityState.IDLE) this.startConnecting()
    }
    getConnectivityState() {
      return this.latestState
    }
    getPicker() {
      return this.latestPicker
    }
    getEndpoint() {
      return this.endpoint
    }
    exitIdle() {
      this.pickFirstBalancer.exitIdle()
    }
    destroy() {
      this.pickFirstBalancer.destroy()
    }
  }
  Kf0.LeafLoadBalancer = Cf0;

  function qZ6() {
    Kd1.registerLoadBalancerType(Ur, oD1, zh), Kd1.registerDefaultLoadBalancerType(Ur)
  }
})
// @from(Start 5109284, End 5112925)
Uf0 = z((wf0) => {
  Object.defineProperty(wf0, "__esModule", {
    value: !0
  });
  wf0.FileWatcherCertificateProvider = void 0;
  var TZ6 = Z1("fs"),
    PZ6 = GB(),
    SZ6 = y6(),
    _Z6 = Z1("util"),
    jZ6 = "certificate_provider";

  function eD1(A) {
    PZ6.trace(SZ6.LogVerbosity.DEBUG, jZ6, A)
  }
  var Hd1 = _Z6.promisify(TZ6.readFile);
  class zf0 {
    constructor(A) {
      if (this.config = A, this.refreshTimer = null, this.fileResultPromise = null, this.latestCaUpdate = void 0, this.caListeners = new Set, this.latestIdentityUpdate = void 0, this.identityListeners = new Set, this.lastUpdateTime = null, A.certificateFile === void 0 !== (A.privateKeyFile === void 0)) throw new Error("certificateFile and privateKeyFile must be set or unset together");
      if (A.certificateFile === void 0 && A.caCertificateFile === void 0) throw new Error("At least one of certificateFile and caCertificateFile must be set");
      eD1("File watcher constructed with config " + JSON.stringify(A))
    }
    updateCertificates() {
      if (this.fileResultPromise) return;
      this.fileResultPromise = Promise.allSettled([this.config.certificateFile ? Hd1(this.config.certificateFile) : Promise.reject(), this.config.privateKeyFile ? Hd1(this.config.privateKeyFile) : Promise.reject(), this.config.caCertificateFile ? Hd1(this.config.caCertificateFile) : Promise.reject()]), this.fileResultPromise.then(([A, B, Q]) => {
        if (!this.refreshTimer) return;
        if (eD1("File watcher read certificates certificate " + A.status + ", privateKey " + B.status + ", CA certificate " + Q.status), this.lastUpdateTime = new Date, this.fileResultPromise = null, A.status === "fulfilled" && B.status === "fulfilled") this.latestIdentityUpdate = {
          certificate: A.value,
          privateKey: B.value
        };
        else this.latestIdentityUpdate = null;
        if (Q.status === "fulfilled") this.latestCaUpdate = {
          caCertificate: Q.value
        };
        else this.latestCaUpdate = null;
        for (let I of this.identityListeners) I(this.latestIdentityUpdate);
        for (let I of this.caListeners) I(this.latestCaUpdate)
      }), eD1("File watcher initiated certificate update")
    }
    maybeStartWatchingFiles() {
      if (!this.refreshTimer) {
        let A = this.lastUpdateTime ? new Date().getTime() - this.lastUpdateTime.getTime() : 1 / 0;
        if (A > this.config.refreshIntervalMs) this.updateCertificates();
        if (A > this.config.refreshIntervalMs * 2) this.latestCaUpdate = void 0, this.latestIdentityUpdate = void 0;
        this.refreshTimer = setInterval(() => this.updateCertificates(), this.config.refreshIntervalMs), eD1("File watcher started watching")
      }
    }
    maybeStopWatchingFiles() {
      if (this.caListeners.size === 0 && this.identityListeners.size === 0) {
        if (this.fileResultPromise = null, this.refreshTimer) clearInterval(this.refreshTimer), this.refreshTimer = null
      }
    }
    addCaCertificateListener(A) {
      if (this.caListeners.add(A), this.maybeStartWatchingFiles(), this.latestCaUpdate !== void 0) process.nextTick(A, this.latestCaUpdate)
    }
    removeCaCertificateListener(A) {
      this.caListeners.delete(A), this.maybeStopWatchingFiles()
    }
    addIdentityCertificateListener(A) {
      if (this.identityListeners.add(A), this.maybeStartWatchingFiles(), this.latestIdentityUpdate !== void 0) process.nextTick(A, this.latestIdentityUpdate)
    }
    removeIdentityCertificateListener(A) {
      this.identityListeners.delete(A), this.maybeStopWatchingFiles()
    }
  }
  wf0.FileWatcherCertificateProvider = zf0
})
// @from(Start 5112931, End 5118853)
wd1 = z((I5) => {
  Object.defineProperty(I5, "__esModule", {
    value: !0
  });
  I5.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX = I5.createCertificateProviderChannelCredentials = I5.FileWatcherCertificateProvider = I5.createCertificateProviderServerCredentials = I5.createServerCredentialsWithInterceptors = I5.BaseSubchannelWrapper = I5.registerAdminService = I5.FilterStackFactory = I5.BaseFilter = I5.PickResultType = I5.QueuePicker = I5.UnavailablePicker = I5.ChildLoadBalancerHandler = I5.EndpointMap = I5.endpointHasAddress = I5.endpointToString = I5.subchannelAddressToString = I5.LeafLoadBalancer = I5.isLoadBalancerNameRegistered = I5.parseLoadBalancingConfig = I5.selectLbConfigFromList = I5.registerLoadBalancerType = I5.createChildChannelControlHelper = I5.BackoffTimeout = I5.parseDuration = I5.durationToMs = I5.splitHostPort = I5.uriToString = I5.createResolver = I5.registerResolver = I5.log = I5.trace = void 0;
  var Nf0 = GB();
  Object.defineProperty(I5, "trace", {
    enumerable: !0,
    get: function() {
      return Nf0.trace
    }
  });
  Object.defineProperty(I5, "log", {
    enumerable: !0,
    get: function() {
      return Nf0.log
    }
  });
  var $f0 = Zw();
  Object.defineProperty(I5, "registerResolver", {
    enumerable: !0,
    get: function() {
      return $f0.registerResolver
    }
  });
  Object.defineProperty(I5, "createResolver", {
    enumerable: !0,
    get: function() {
      return $f0.createResolver
    }
  });
  var qf0 = uY();
  Object.defineProperty(I5, "uriToString", {
    enumerable: !0,
    get: function() {
      return qf0.uriToString
    }
  });
  Object.defineProperty(I5, "splitHostPort", {
    enumerable: !0,
    get: function() {
      return qf0.splitHostPort
    }
  });
  var Mf0 = Cd1();
  Object.defineProperty(I5, "durationToMs", {
    enumerable: !0,
    get: function() {
      return Mf0.durationToMs
    }
  });
  Object.defineProperty(I5, "parseDuration", {
    enumerable: !0,
    get: function() {
      return Mf0.parseDuration
    }
  });
  var yZ6 = cs();
  Object.defineProperty(I5, "BackoffTimeout", {
    enumerable: !0,
    get: function() {
      return yZ6.BackoffTimeout
    }
  });
  var Nr = a_();
  Object.defineProperty(I5, "createChildChannelControlHelper", {
    enumerable: !0,
    get: function() {
      return Nr.createChildChannelControlHelper
    }
  });
  Object.defineProperty(I5, "registerLoadBalancerType", {
    enumerable: !0,
    get: function() {
      return Nr.registerLoadBalancerType
    }
  });
  Object.defineProperty(I5, "selectLbConfigFromList", {
    enumerable: !0,
    get: function() {
      return Nr.selectLbConfigFromList
    }
  });
  Object.defineProperty(I5, "parseLoadBalancingConfig", {
    enumerable: !0,
    get: function() {
      return Nr.parseLoadBalancingConfig
    }
  });
  Object.defineProperty(I5, "isLoadBalancerNameRegistered", {
    enumerable: !0,
    get: function() {
      return Nr.isLoadBalancerNameRegistered
    }
  });
  var kZ6 = tD1();
  Object.defineProperty(I5, "LeafLoadBalancer", {
    enumerable: !0,
    get: function() {
      return kZ6.LeafLoadBalancer
    }
  });
  var AY1 = PX();
  Object.defineProperty(I5, "subchannelAddressToString", {
    enumerable: !0,
    get: function() {
      return AY1.subchannelAddressToString
    }
  });
  Object.defineProperty(I5, "endpointToString", {
    enumerable: !0,
    get: function() {
      return AY1.endpointToString
    }
  });
  Object.defineProperty(I5, "endpointHasAddress", {
    enumerable: !0,
    get: function() {
      return AY1.endpointHasAddress
    }
  });
  Object.defineProperty(I5, "EndpointMap", {
    enumerable: !0,
    get: function() {
      return AY1.EndpointMap
    }
  });
  var xZ6 = BD1();
  Object.defineProperty(I5, "ChildLoadBalancerHandler", {
    enumerable: !0,
    get: function() {
      return xZ6.ChildLoadBalancerHandler
    }
  });
  var zd1 = FR();
  Object.defineProperty(I5, "UnavailablePicker", {
    enumerable: !0,
    get: function() {
      return zd1.UnavailablePicker
    }
  });
  Object.defineProperty(I5, "QueuePicker", {
    enumerable: !0,
    get: function() {
      return zd1.QueuePicker
    }
  });
  Object.defineProperty(I5, "PickResultType", {
    enumerable: !0,
    get: function() {
      return zd1.PickResultType
    }
  });
  var fZ6 = pm1();
  Object.defineProperty(I5, "BaseFilter", {
    enumerable: !0,
    get: function() {
      return fZ6.BaseFilter
    }
  });
  var vZ6 = dm1();
  Object.defineProperty(I5, "FilterStackFactory", {
    enumerable: !0,
    get: function() {
      return vZ6.FilterStackFactory
    }
  });
  var bZ6 = ID1();
  Object.defineProperty(I5, "registerAdminService", {
    enumerable: !0,
    get: function() {
      return bZ6.registerAdminService
    }
  });
  var gZ6 = cD1();
  Object.defineProperty(I5, "BaseSubchannelWrapper", {
    enumerable: !0,
    get: function() {
      return gZ6.BaseSubchannelWrapper
    }
  });
  var Lf0 = aD1();
  Object.defineProperty(I5, "createServerCredentialsWithInterceptors", {
    enumerable: !0,
    get: function() {
      return Lf0.createServerCredentialsWithInterceptors
    }
  });
  Object.defineProperty(I5, "createCertificateProviderServerCredentials", {
    enumerable: !0,
    get: function() {
      return Lf0.createCertificateProviderServerCredentials
    }
  });
  var hZ6 = Uf0();
  Object.defineProperty(I5, "FileWatcherCertificateProvider", {
    enumerable: !0,
    get: function() {
      return hZ6.FileWatcherCertificateProvider
    }
  });
  var mZ6 = us();
  Object.defineProperty(I5, "createCertificateProviderChannelCredentials", {
    enumerable: !0,
    get: function() {
      return mZ6.createCertificateProviderChannelCredentials
    }
  });
  var dZ6 = rm1();
  Object.defineProperty(I5, "SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX", {
    enumerable: !0,
    get: function() {
      return dZ6.SUBCHANNEL_ARGS_EXCLUDE_KEY_PREFIX
    }
  })
})
// @from(Start 5118859, End 5119651)
Tf0 = z((Of0) => {
  Object.defineProperty(Of0, "__esModule", {
    value: !0
  });
  Of0.setup = cZ6;
  var pZ6 = Zw();
  class Rf0 {
    constructor(A, B, Q) {
      this.listener = B, this.hasReturnedResult = !1, this.endpoints = [];
      let I;
      if (A.authority === "") I = "/" + A.path;
      else I = A.path;
      this.endpoints = [{
        addresses: [{
          path: I
        }]
      }]
    }
    updateResolution() {
      if (!this.hasReturnedResult) this.hasReturnedResult = !0, process.nextTick(this.listener.onSuccessfulResolution, this.endpoints, null, null, null, {})
    }
    destroy() {
      this.hasReturnedResult = !1
    }
    static getDefaultAuthority(A) {
      return "localhost"
    }
  }

  function cZ6() {
    pZ6.registerResolver("unix", Rf0)
  }
})
// @from(Start 5119657, End 5121895)
kf0 = z((yf0) => {
  Object.defineProperty(yf0, "__esModule", {
    value: !0
  });
  yf0.setup = sZ6;
  var Pf0 = Z1("net"),
    BY1 = y6(),
    Ed1 = SZ(),
    Sf0 = Zw(),
    _f0 = uY(),
    iZ6 = GB(),
    nZ6 = "ip_resolver";

  function jf0(A) {
    iZ6.trace(BY1.LogVerbosity.DEBUG, nZ6, A)
  }
  var Ud1 = "ipv4",
    Nd1 = "ipv6",
    aZ6 = 443;
  class $d1 {
    constructor(A, B, Q) {
      var I;
      this.listener = B, this.endpoints = [], this.error = null, this.hasReturnedResult = !1, jf0("Resolver constructed for target " + _f0.uriToString(A));
      let G = [];
      if (!(A.scheme === Ud1 || A.scheme === Nd1)) {
        this.error = {
          code: BY1.Status.UNAVAILABLE,
          details: `Unrecognized scheme ${A.scheme} in IP resolver`,
          metadata: new Ed1.Metadata
        };
        return
      }
      let Z = A.path.split(",");
      for (let D of Z) {
        let Y = _f0.splitHostPort(D);
        if (Y === null) {
          this.error = {
            code: BY1.Status.UNAVAILABLE,
            details: `Failed to parse ${A.scheme} address ${D}`,
            metadata: new Ed1.Metadata
          };
          return
        }
        if (A.scheme === Ud1 && !Pf0.isIPv4(Y.host) || A.scheme === Nd1 && !Pf0.isIPv6(Y.host)) {
          this.error = {
            code: BY1.Status.UNAVAILABLE,
            details: `Failed to parse ${A.scheme} address ${D}`,
            metadata: new Ed1.Metadata
          };
          return
        }
        G.push({
          host: Y.host,
          port: (I = Y.port) !== null && I !== void 0 ? I : aZ6
        })
      }
      this.endpoints = G.map((D) => ({
        addresses: [D]
      })), jf0("Parsed " + A.scheme + " address list " + G)
    }
    updateResolution() {
      if (!this.hasReturnedResult) this.hasReturnedResult = !0, process.nextTick(() => {
        if (this.error) this.listener.onError(this.error);
        else this.listener.onSuccessfulResolution(this.endpoints, null, null, null, {})
      })
    }
    destroy() {
      this.hasReturnedResult = !1
    }
    static getDefaultAuthority(A) {
      return A.path.split(",")[0]
    }
  }

  function sZ6() {
    Sf0.registerResolver(Ud1, $d1), Sf0.registerResolver(Nd1, $d1)
  }
})
// @from(Start 5121901, End 5125873)
mf0 = z((gf0) => {
  Object.defineProperty(gf0, "__esModule", {
    value: !0
  });
  gf0.RoundRobinLoadBalancer = void 0;
  gf0.setup = BD6;
  var vf0 = a_(),
    kD = TX(),
    qd1 = FR(),
    oZ6 = GB(),
    tZ6 = y6(),
    xf0 = PX(),
    eZ6 = tD1(),
    AD6 = "round_robin";

  function ff0(A) {
    oZ6.trace(tZ6.LogVerbosity.DEBUG, AD6, A)
  }
  var QY1 = "round_robin";
  class Md1 {
    getLoadBalancerName() {
      return QY1
    }
    constructor() {}
    toJsonObject() {
      return {
        [QY1]: {}
      }
    }
    static createFromJson(A) {
      return new Md1
    }
  }
  class bf0 {
    constructor(A, B = 0) {
      this.children = A, this.nextIndex = B
    }
    pick(A) {
      let B = this.children[this.nextIndex].picker;
      return this.nextIndex = (this.nextIndex + 1) % this.children.length, B.pick(A)
    }
    peekNextEndpoint() {
      return this.children[this.nextIndex].endpoint
    }
  }
  class Ld1 {
    constructor(A) {
      this.channelControlHelper = A, this.children = [], this.currentState = kD.ConnectivityState.IDLE, this.currentReadyPicker = null, this.updatesPaused = !1, this.lastError = null, this.childChannelControlHelper = vf0.createChildChannelControlHelper(A, {
        updateState: (B, Q, I) => {
          if (this.currentState === kD.ConnectivityState.READY && B !== kD.ConnectivityState.READY) this.channelControlHelper.requestReresolution();
          if (I) this.lastError = I;
          this.calculateAndUpdateState()
        }
      })
    }
    countChildrenWithState(A) {
      return this.children.filter((B) => B.getConnectivityState() === A).length
    }
    calculateAndUpdateState() {
      if (this.updatesPaused) return;
      if (this.countChildrenWithState(kD.ConnectivityState.READY) > 0) {
        let A = this.children.filter((Q) => Q.getConnectivityState() === kD.ConnectivityState.READY),
          B = 0;
        if (this.currentReadyPicker !== null) {
          let Q = this.currentReadyPicker.peekNextEndpoint();
          if (B = A.findIndex((I) => xf0.endpointEqual(I.getEndpoint(), Q)), B < 0) B = 0
        }
        this.updateState(kD.ConnectivityState.READY, new bf0(A.map((Q) => ({
          endpoint: Q.getEndpoint(),
          picker: Q.getPicker()
        })), B), null)
      } else if (this.countChildrenWithState(kD.ConnectivityState.CONNECTING) > 0) this.updateState(kD.ConnectivityState.CONNECTING, new qd1.QueuePicker(this), null);
      else if (this.countChildrenWithState(kD.ConnectivityState.TRANSIENT_FAILURE) > 0) {
        let A = `round_robin: No connection established. Last error: ${this.lastError}`;
        this.updateState(kD.ConnectivityState.TRANSIENT_FAILURE, new qd1.UnavailablePicker({
          details: A
        }), A)
      } else this.updateState(kD.ConnectivityState.IDLE, new qd1.QueuePicker(this), null);
      for (let A of this.children)
        if (A.getConnectivityState() === kD.ConnectivityState.IDLE) A.exitIdle()
    }
    updateState(A, B, Q) {
      if (ff0(kD.ConnectivityState[this.currentState] + " -> " + kD.ConnectivityState[A]), A === kD.ConnectivityState.READY) this.currentReadyPicker = B;
      else this.currentReadyPicker = null;
      this.currentState = A, this.channelControlHelper.updateState(A, B, Q)
    }
    resetSubchannelList() {
      for (let A of this.children) A.destroy()
    }
    updateAddressList(A, B, Q) {
      this.resetSubchannelList(), ff0("Connect to endpoint list " + A.map(xf0.endpointToString)), this.updatesPaused = !0, this.children = A.map((I) => new eZ6.LeafLoadBalancer(I, this.childChannelControlHelper, Q));
      for (let I of this.children) I.startConnecting();
      this.updatesPaused = !1, this.calculateAndUpdateState()
    }
    exitIdle() {}
    resetBackoff() {}
    destroy() {
      this.resetSubchannelList()
    }
    getTypeName() {
      return QY1
    }
  }
  gf0.RoundRobinLoadBalancer = Ld1;

  function BD6() {
    vf0.registerLoadBalancerType(QY1, Ld1, Md1)
  }
})
// @from(Start 5125879, End 5140879)
af0 = z((if0) => {
  var Rd1;
  Object.defineProperty(if0, "__esModule", {
    value: !0
  });
  if0.OutlierDetectionLoadBalancer = if0.OutlierDetectionLoadBalancingConfig = void 0;
  if0.setup = CD6;
  var ID6 = TX(),
    df0 = y6(),
    Zj = Cd1(),
    uf0 = wd1(),
    GD6 = a_(),
    ZD6 = BD1(),
    DD6 = FR(),
    Od1 = PX(),
    YD6 = cD1(),
    WD6 = GB(),
    JD6 = "outlier_detection";

  function OI(A) {
    WD6.trace(df0.LogVerbosity.DEBUG, JD6, A)
  }
  var Sd1 = "outlier_detection",
    FD6 = ((Rd1 = process.env.GRPC_EXPERIMENTAL_ENABLE_OUTLIER_DETECTION) !== null && Rd1 !== void 0 ? Rd1 : "true") === "true",
    XD6 = {
      stdev_factor: 1900,
      enforcement_percentage: 100,
      minimum_hosts: 5,
      request_volume: 100
    },
    VD6 = {
      threshold: 85,
      enforcement_percentage: 100,
      minimum_hosts: 5,
      request_volume: 50
    };

  function wh(A, B, Q, I) {
    if (B in A && A[B] !== void 0 && typeof A[B] !== Q) {
      let G = I ? `${I}.${B}` : B;
      throw new Error(`outlier detection config ${G} parse error: expected ${Q}, got ${typeof A[B]}`)
    }
  }

  function Td1(A, B, Q) {
    let I = Q ? `${Q}.${B}` : B;
    if (B in A && A[B] !== void 0) {
      if (!Zj.isDuration(A[B])) throw new Error(`outlier detection config ${I} parse error: expected Duration, got ${typeof A[B]}`);
      if (!(A[B].seconds >= 0 && A[B].seconds <= 315576000000 && A[B].nanos >= 0 && A[B].nanos <= 999999999)) throw new Error(`outlier detection config ${I} parse error: values out of range for non-negative Duaration`)
    }
  }

  function IY1(A, B, Q) {
    let I = Q ? `${Q}.${B}` : B;
    if (wh(A, B, "number", Q), B in A && A[B] !== void 0 && !(A[B] >= 0 && A[B] <= 100)) throw new Error(`outlier detection config ${I} parse error: value out of range for percentage (0-100)`)
  }
  class $r {
    constructor(A, B, Q, I, G, Z, D) {
      if (this.childPolicy = D, D.getLoadBalancerName() === "pick_first") throw new Error("outlier_detection LB policy cannot have a pick_first child policy");
      this.intervalMs = A !== null && A !== void 0 ? A : 1e4, this.baseEjectionTimeMs = B !== null && B !== void 0 ? B : 30000, this.maxEjectionTimeMs = Q !== null && Q !== void 0 ? Q : 300000, this.maxEjectionPercent = I !== null && I !== void 0 ? I : 10, this.successRateEjection = G ? Object.assign(Object.assign({}, XD6), G) : null, this.failurePercentageEjection = Z ? Object.assign(Object.assign({}, VD6), Z) : null
    }
    getLoadBalancerName() {
      return Sd1
    }
    toJsonObject() {
      var A, B;
      return {
        outlier_detection: {
          interval: Zj.msToDuration(this.intervalMs),
          base_ejection_time: Zj.msToDuration(this.baseEjectionTimeMs),
          max_ejection_time: Zj.msToDuration(this.maxEjectionTimeMs),
          max_ejection_percent: this.maxEjectionPercent,
          success_rate_ejection: (A = this.successRateEjection) !== null && A !== void 0 ? A : void 0,
          failure_percentage_ejection: (B = this.failurePercentageEjection) !== null && B !== void 0 ? B : void 0,
          child_policy: [this.childPolicy.toJsonObject()]
        }
      }
    }
    getIntervalMs() {
      return this.intervalMs
    }
    getBaseEjectionTimeMs() {
      return this.baseEjectionTimeMs
    }
    getMaxEjectionTimeMs() {
      return this.maxEjectionTimeMs
    }
    getMaxEjectionPercent() {
      return this.maxEjectionPercent
    }
    getSuccessRateEjectionConfig() {
      return this.successRateEjection
    }
    getFailurePercentageEjectionConfig() {
      return this.failurePercentageEjection
    }
    getChildPolicy() {
      return this.childPolicy
    }
    static createFromJson(A) {
      var B;
      if (Td1(A, "interval"), Td1(A, "base_ejection_time"), Td1(A, "max_ejection_time"), IY1(A, "max_ejection_percent"), "success_rate_ejection" in A && A.success_rate_ejection !== void 0) {
        if (typeof A.success_rate_ejection !== "object") throw new Error("outlier detection config success_rate_ejection must be an object");
        wh(A.success_rate_ejection, "stdev_factor", "number", "success_rate_ejection"), IY1(A.success_rate_ejection, "enforcement_percentage", "success_rate_ejection"), wh(A.success_rate_ejection, "minimum_hosts", "number", "success_rate_ejection"), wh(A.success_rate_ejection, "request_volume", "number", "success_rate_ejection")
      }
      if ("failure_percentage_ejection" in A && A.failure_percentage_ejection !== void 0) {
        if (typeof A.failure_percentage_ejection !== "object") throw new Error("outlier detection config failure_percentage_ejection must be an object");
        IY1(A.failure_percentage_ejection, "threshold", "failure_percentage_ejection"), IY1(A.failure_percentage_ejection, "enforcement_percentage", "failure_percentage_ejection"), wh(A.failure_percentage_ejection, "minimum_hosts", "number", "failure_percentage_ejection"), wh(A.failure_percentage_ejection, "request_volume", "number", "failure_percentage_ejection")
      }
      if (!("child_policy" in A) || !Array.isArray(A.child_policy)) throw new Error("outlier detection config child_policy must be an array");
      let Q = GD6.selectLbConfigFromList(A.child_policy);
      if (!Q) throw new Error("outlier detection config child_policy: no valid recognized policy found");
      return new $r(A.interval ? Zj.durationToMs(A.interval) : null, A.base_ejection_time ? Zj.durationToMs(A.base_ejection_time) : null, A.max_ejection_time ? Zj.durationToMs(A.max_ejection_time) : null, (B = A.max_ejection_percent) !== null && B !== void 0 ? B : null, A.success_rate_ejection, A.failure_percentage_ejection, Q)
    }
  }
  if0.OutlierDetectionLoadBalancingConfig = $r;
  class pf0 extends YD6.BaseSubchannelWrapper {
    constructor(A, B) {
      super(A);
      this.mapEntry = B, this.refCount = 0
    }
    ref() {
      this.child.ref(), this.refCount += 1
    }
    unref() {
      if (this.child.unref(), this.refCount -= 1, this.refCount <= 0) {
        if (this.mapEntry) {
          let A = this.mapEntry.subchannelWrappers.indexOf(this);
          if (A >= 0) this.mapEntry.subchannelWrappers.splice(A, 1)
        }
      }
    }
    eject() {
      this.setHealthy(!1)
    }
    uneject() {
      this.setHealthy(!0)
    }
    getMapEntry() {
      return this.mapEntry
    }
    getWrappedSubchannel() {
      return this.child
    }
  }

  function Pd1() {
    return {
      success: 0,
      failure: 0
    }
  }
  class cf0 {
    constructor() {
      this.activeBucket = Pd1(), this.inactiveBucket = Pd1()
    }
    addSuccess() {
      this.activeBucket.success += 1
    }
    addFailure() {
      this.activeBucket.failure += 1
    }
    switchBuckets() {
      this.inactiveBucket = this.activeBucket, this.activeBucket = Pd1()
    }
    getLastSuccesses() {
      return this.inactiveBucket.success
    }
    getLastFailures() {
      return this.inactiveBucket.failure
    }
  }
  class lf0 {
    constructor(A, B) {
      this.wrappedPicker = A, this.countCalls = B
    }
    pick(A) {
      let B = this.wrappedPicker.pick(A);
      if (B.pickResultType === DD6.PickResultType.COMPLETE) {
        let Q = B.subchannel,
          I = Q.getMapEntry();
        if (I) {
          let G = B.onCallEnded;
          if (this.countCalls) G = (Z) => {
            var D;
            if (Z === df0.Status.OK) I.counter.addSuccess();
            else I.counter.addFailure();
            (D = B.onCallEnded) === null || D === void 0 || D.call(B, Z)
          };
          return Object.assign(Object.assign({}, B), {
            subchannel: Q.getWrappedSubchannel(),
            onCallEnded: G
          })
        } else return Object.assign(Object.assign({}, B), {
          subchannel: Q.getWrappedSubchannel()
        })
      } else return B
    }
  }
  class _d1 {
    constructor(A) {
      this.entryMap = new Od1.EndpointMap, this.latestConfig = null, this.timerStartTime = null, this.childBalancer = new ZD6.ChildLoadBalancerHandler(uf0.createChildChannelControlHelper(A, {
        createSubchannel: (B, Q) => {
          let I = A.createSubchannel(B, Q),
            G = this.entryMap.getForSubchannelAddress(B),
            Z = new pf0(I, G);
          if ((G === null || G === void 0 ? void 0 : G.currentEjectionTimestamp) !== null) Z.eject();
          return G === null || G === void 0 || G.subchannelWrappers.push(Z), Z
        },
        updateState: (B, Q, I) => {
          if (B === ID6.ConnectivityState.READY) A.updateState(B, new lf0(Q, this.isCountingEnabled()), I);
          else A.updateState(B, Q, I)
        }
      })), this.ejectionTimer = setInterval(() => {}, 0), clearInterval(this.ejectionTimer)
    }
    isCountingEnabled() {
      return this.latestConfig !== null && (this.latestConfig.getSuccessRateEjectionConfig() !== null || this.latestConfig.getFailurePercentageEjectionConfig() !== null)
    }
    getCurrentEjectionPercent() {
      let A = 0;
      for (let B of this.entryMap.values())
        if (B.currentEjectionTimestamp !== null) A += 1;
      return A * 100 / this.entryMap.size
    }
    runSuccessRateCheck(A) {
      if (!this.latestConfig) return;
      let B = this.latestConfig.getSuccessRateEjectionConfig();
      if (!B) return;
      OI("Running success rate check");
      let Q = B.request_volume,
        I = 0,
        G = [];
      for (let [F, X] of this.entryMap.entries()) {
        let V = X.counter.getLastSuccesses(),
          C = X.counter.getLastFailures();
        if (OI("Stats for " + Od1.endpointToString(F) + ": successes=" + V + " failures=" + C + " targetRequestVolume=" + Q), V + C >= Q) I += 1, G.push(V / (V + C))
      }
      if (OI("Found " + I + " success rate candidates; currentEjectionPercent=" + this.getCurrentEjectionPercent() + " successRates=[" + G + "]"), I < B.minimum_hosts) return;
      let Z = G.reduce((F, X) => F + X) / G.length,
        D = 0;
      for (let F of G) {
        let X = F - Z;
        D += X * X
      }
      let Y = D / G.length,
        W = Math.sqrt(Y),
        J = Z - W * (B.stdev_factor / 1000);
      OI("stdev=" + W + " ejectionThreshold=" + J);
      for (let [F, X] of this.entryMap.entries()) {
        if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) break;
        let V = X.counter.getLastSuccesses(),
          C = X.counter.getLastFailures();
        if (V + C < Q) continue;
        let K = V / (V + C);
        if (OI("Checking candidate " + F + " successRate=" + K), K < J) {
          let E = Math.random() * 100;
          if (OI("Candidate " + F + " randomNumber=" + E + " enforcement_percentage=" + B.enforcement_percentage), E < B.enforcement_percentage) OI("Ejecting candidate " + F), this.eject(X, A)
        }
      }
    }
    runFailurePercentageCheck(A) {
      if (!this.latestConfig) return;
      let B = this.latestConfig.getFailurePercentageEjectionConfig();
      if (!B) return;
      OI("Running failure percentage check. threshold=" + B.threshold + " request volume threshold=" + B.request_volume);
      let Q = 0;
      for (let I of this.entryMap.values()) {
        let G = I.counter.getLastSuccesses(),
          Z = I.counter.getLastFailures();
        if (G + Z >= B.request_volume) Q += 1
      }
      if (Q < B.minimum_hosts) return;
      for (let [I, G] of this.entryMap.entries()) {
        if (this.getCurrentEjectionPercent() >= this.latestConfig.getMaxEjectionPercent()) break;
        let Z = G.counter.getLastSuccesses(),
          D = G.counter.getLastFailures();
        if (OI("Candidate successes=" + Z + " failures=" + D), Z + D < B.request_volume) continue;
        if (D * 100 / (D + Z) > B.threshold) {
          let W = Math.random() * 100;
          if (OI("Candidate " + I + " randomNumber=" + W + " enforcement_percentage=" + B.enforcement_percentage), W < B.enforcement_percentage) OI("Ejecting candidate " + I), this.eject(G, A)
        }
      }
    }
    eject(A, B) {
      A.currentEjectionTimestamp = new Date, A.ejectionTimeMultiplier += 1;
      for (let Q of A.subchannelWrappers) Q.eject()
    }
    uneject(A) {
      A.currentEjectionTimestamp = null;
      for (let B of A.subchannelWrappers) B.uneject()
    }
    switchAllBuckets() {
      for (let A of this.entryMap.values()) A.counter.switchBuckets()
    }
    startTimer(A) {
      var B, Q;
      this.ejectionTimer = setTimeout(() => this.runChecks(), A), (Q = (B = this.ejectionTimer).unref) === null || Q === void 0 || Q.call(B)
    }
    runChecks() {
      let A = new Date;
      if (OI("Ejection timer running"), this.switchAllBuckets(), !this.latestConfig) return;
      this.timerStartTime = A, this.startTimer(this.latestConfig.getIntervalMs()), this.runSuccessRateCheck(A), this.runFailurePercentageCheck(A);
      for (let [B, Q] of this.entryMap.entries())
        if (Q.currentEjectionTimestamp === null) {
          if (Q.ejectionTimeMultiplier > 0) Q.ejectionTimeMultiplier -= 1
        } else {
          let I = this.latestConfig.getBaseEjectionTimeMs(),
            G = this.latestConfig.getMaxEjectionTimeMs(),
            Z = new Date(Q.currentEjectionTimestamp.getTime());
          if (Z.setMilliseconds(Z.getMilliseconds() + Math.min(I * Q.ejectionTimeMultiplier, Math.max(I, G))), Z < new Date) OI("Unejecting " + B), this.uneject(Q)
        }
    }
    updateAddressList(A, B, Q) {
      if (!(B instanceof $r)) return;
      OI("Received update with config: " + JSON.stringify(B.toJsonObject(), void 0, 2));
      for (let G of A)
        if (!this.entryMap.has(G)) OI("Adding map entry for " + Od1.endpointToString(G)), this.entryMap.set(G, {
          counter: new cf0,
          currentEjectionTimestamp: null,
          ejectionTimeMultiplier: 0,
          subchannelWrappers: []
        });
      this.entryMap.deleteMissing(A);
      let I = B.getChildPolicy();
      if (this.childBalancer.updateAddressList(A, I, Q), B.getSuccessRateEjectionConfig() || B.getFailurePercentageEjectionConfig())
        if (this.timerStartTime) {
          OI("Previous timer existed. Replacing timer"), clearTimeout(this.ejectionTimer);
          let G = B.getIntervalMs() - (new Date().getTime() - this.timerStartTime.getTime());
          this.startTimer(G)
        } else OI("Starting new timer"), this.timerStartTime = new Date, this.startTimer(B.getIntervalMs()), this.switchAllBuckets();
      else {
        OI("Counting disabled. Cancelling timer."), this.timerStartTime = null, clearTimeout(this.ejectionTimer);
        for (let G of this.entryMap.values()) this.uneject(G), G.ejectionTimeMultiplier = 0
      }
      this.latestConfig = B
    }
    exitIdle() {
      this.childBalancer.exitIdle()
    }
    resetBackoff() {
      this.childBalancer.resetBackoff()
    }
    destroy() {
      clearTimeout(this.ejectionTimer), this.childBalancer.destroy()
    }
    getTypeName() {
      return Sd1
    }
  }
  if0.OutlierDetectionLoadBalancer = _d1;

  function CD6() {
    if (FD6) uf0.registerLoadBalancerType(Sd1, _d1, $r)
  }
})
// @from(Start 5140885, End 5147278)
qr = z((M8) => {
  Object.defineProperty(M8, "__esModule", {
    value: !0
  });
  M8.experimental = M8.ServerInterceptingCall = M8.ResponderBuilder = M8.ServerListenerBuilder = M8.addAdminServicesToServer = M8.getChannelzHandlers = M8.getChannelzServiceDefinition = M8.InterceptorConfigurationError = M8.InterceptingCall = M8.RequesterBuilder = M8.ListenerBuilder = M8.StatusBuilder = M8.getClientChannel = M8.ServerCredentials = M8.Server = M8.setLogVerbosity = M8.setLogger = M8.load = M8.loadObject = M8.CallCredentials = M8.ChannelCredentials = M8.waitForClientReady = M8.closeClient = M8.Channel = M8.makeGenericClientConstructor = M8.makeClientConstructor = M8.loadPackageDefinition = M8.Client = M8.compressionAlgorithms = M8.propagate = M8.connectivityState = M8.status = M8.logVerbosity = M8.Metadata = M8.credentials = void 0;
  var GY1 = iZ1();
  Object.defineProperty(M8, "CallCredentials", {
    enumerable: !0,
    get: function() {
      return GY1.CallCredentials
    }
  });
  var zD6 = yh1();
  Object.defineProperty(M8, "Channel", {
    enumerable: !0,
    get: function() {
      return zD6.ChannelImplementation
    }
  });
  var wD6 = um1();
  Object.defineProperty(M8, "compressionAlgorithms", {
    enumerable: !0,
    get: function() {
      return wD6.CompressionAlgorithms
    }
  });
  var ED6 = TX();
  Object.defineProperty(M8, "connectivityState", {
    enumerable: !0,
    get: function() {
      return ED6.ConnectivityState
    }
  });
  var ZY1 = us();
  Object.defineProperty(M8, "ChannelCredentials", {
    enumerable: !0,
    get: function() {
      return ZY1.ChannelCredentials
    }
  });
  var sf0 = jh1();
  Object.defineProperty(M8, "Client", {
    enumerable: !0,
    get: function() {
      return sf0.Client
    }
  });
  var jd1 = y6();
  Object.defineProperty(M8, "logVerbosity", {
    enumerable: !0,
    get: function() {
      return jd1.LogVerbosity
    }
  });
  Object.defineProperty(M8, "status", {
    enumerable: !0,
    get: function() {
      return jd1.Status
    }
  });
  Object.defineProperty(M8, "propagate", {
    enumerable: !0,
    get: function() {
      return jd1.Propagate
    }
  });
  var rf0 = GB(),
    yd1 = xh1();
  Object.defineProperty(M8, "loadPackageDefinition", {
    enumerable: !0,
    get: function() {
      return yd1.loadPackageDefinition
    }
  });
  Object.defineProperty(M8, "makeClientConstructor", {
    enumerable: !0,
    get: function() {
      return yd1.makeClientConstructor
    }
  });
  Object.defineProperty(M8, "makeGenericClientConstructor", {
    enumerable: !0,
    get: function() {
      return yd1.makeClientConstructor
    }
  });
  var UD6 = SZ();
  Object.defineProperty(M8, "Metadata", {
    enumerable: !0,
    get: function() {
      return UD6.Metadata
    }
  });
  var ND6 = Bf0();
  Object.defineProperty(M8, "Server", {
    enumerable: !0,
    get: function() {
      return ND6.Server
    }
  });
  var $D6 = aD1();
  Object.defineProperty(M8, "ServerCredentials", {
    enumerable: !0,
    get: function() {
      return $D6.ServerCredentials
    }
  });
  var qD6 = Zf0();
  Object.defineProperty(M8, "StatusBuilder", {
    enumerable: !0,
    get: function() {
      return qD6.StatusBuilder
    }
  });
  M8.credentials = {
    combineChannelCredentials: (A, ...B) => {
      return B.reduce((Q, I) => Q.compose(I), A)
    },
    combineCallCredentials: (A, ...B) => {
      return B.reduce((Q, I) => Q.compose(I), A)
    },
    createInsecure: ZY1.ChannelCredentials.createInsecure,
    createSsl: ZY1.ChannelCredentials.createSsl,
    createFromSecureContext: ZY1.ChannelCredentials.createFromSecureContext,
    createFromMetadataGenerator: GY1.CallCredentials.createFromMetadataGenerator,
    createFromGoogleCredential: GY1.CallCredentials.createFromGoogleCredential,
    createEmpty: GY1.CallCredentials.createEmpty
  };
  var MD6 = (A) => A.close();
  M8.closeClient = MD6;
  var LD6 = (A, B, Q) => A.waitForReady(B, Q);
  M8.waitForClientReady = LD6;
  var RD6 = (A, B) => {
    throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead")
  };
  M8.loadObject = RD6;
  var OD6 = (A, B, Q) => {
    throw new Error("Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead")
  };
  M8.load = OD6;
  var TD6 = (A) => {
    rf0.setLogger(A)
  };
  M8.setLogger = TD6;
  var PD6 = (A) => {
    rf0.setLoggerVerbosity(A)
  };
  M8.setLogVerbosity = PD6;
  var SD6 = (A) => {
    return sf0.Client.prototype.getChannel.call(A)
  };
  M8.getClientChannel = SD6;
  var DY1 = Sh1();
  Object.defineProperty(M8, "ListenerBuilder", {
    enumerable: !0,
    get: function() {
      return DY1.ListenerBuilder
    }
  });
  Object.defineProperty(M8, "RequesterBuilder", {
    enumerable: !0,
    get: function() {
      return DY1.RequesterBuilder
    }
  });
  Object.defineProperty(M8, "InterceptingCall", {
    enumerable: !0,
    get: function() {
      return DY1.InterceptingCall
    }
  });
  Object.defineProperty(M8, "InterceptorConfigurationError", {
    enumerable: !0,
    get: function() {
      return DY1.InterceptorConfigurationError
    }
  });
  var of0 = Aj();
  Object.defineProperty(M8, "getChannelzServiceDefinition", {
    enumerable: !0,
    get: function() {
      return of0.getChannelzServiceDefinition
    }
  });
  Object.defineProperty(M8, "getChannelzHandlers", {
    enumerable: !0,
    get: function() {
      return of0.getChannelzHandlers
    }
  });
  var _D6 = ID1();
  Object.defineProperty(M8, "addAdminServicesToServer", {
    enumerable: !0,
    get: function() {
      return _D6.addAdminServicesToServer
    }
  });
  var kd1 = Jd1();
  Object.defineProperty(M8, "ServerListenerBuilder", {
    enumerable: !0,
    get: function() {
      return kd1.ServerListenerBuilder
    }
  });
  Object.defineProperty(M8, "ResponderBuilder", {
    enumerable: !0,
    get: function() {
      return kd1.ResponderBuilder
    }
  });
  Object.defineProperty(M8, "ServerInterceptingCall", {
    enumerable: !0,
    get: function() {
      return kd1.ServerInterceptingCall
    }
  });
  var jD6 = wd1();
  M8.experimental = jD6;
  var yD6 = ym1(),
    kD6 = Tf0(),
    xD6 = kf0(),
    fD6 = tD1(),
    vD6 = mf0(),
    bD6 = af0(),
    gD6 = Aj();
  (() => {
    yD6.setup(), kD6.setup(), xD6.setup(), fD6.setup(), vD6.setup(), bD6.setup(), gD6.setup()
  })()
})
// @from(Start 5147284, End 5147938)
Bv0 = z((ef0) => {
  Object.defineProperty(ef0, "__esModule", {
    value: !0
  });
  ef0.createServiceClientConstructor = void 0;
  var nD6 = qr();

  function aD6(A, B) {
    let Q = {
      export: {
        path: A,
        requestStream: !1,
        responseStream: !1,
        requestSerialize: (I) => {
          return I
        },
        requestDeserialize: (I) => {
          return I
        },
        responseSerialize: (I) => {
          return I
        },
        responseDeserialize: (I) => {
          return I
        }
      }
    };
    return nD6.makeGenericClientConstructor(Q, B)
  }
  ef0.createServiceClientConstructor = aD6
})
// @from(Start 5147944, End 5150235)
Mr = z((Qv0) => {
  Object.defineProperty(Qv0, "__esModule", {
    value: !0
  });
  Qv0.createOtlpGrpcExporterTransport = Qv0.GrpcExporterTransport = Qv0.createEmptyMetadata = Qv0.createSslCredentials = Qv0.createInsecureCredentials = void 0;
  var sD6 = 0,
    rD6 = 2;

  function oD6(A) {
    return A === "gzip" ? rD6 : sD6
  }

  function tD6() {
    let {
      credentials: A
    } = qr();
    return A.createInsecure()
  }
  Qv0.createInsecureCredentials = tD6;

  function eD6(A, B, Q) {
    let {
      credentials: I
    } = qr();
    return I.createSsl(A, B, Q)
  }
  Qv0.createSslCredentials = eD6;

  function AY6() {
    let {
      Metadata: A
    } = qr();
    return new A
  }
  Qv0.createEmptyMetadata = AY6;
  class xd1 {
    _parameters;
    _client;
    _metadata;
    constructor(A) {
      this._parameters = A
    }
    shutdown() {
      this._client?.close()
    }
    send(A, B) {
      let Q = Buffer.from(A);
      if (this._client == null) {
        let {
          createServiceClientConstructor: I
        } = Bv0();
        try {
          this._metadata = this._parameters.metadata()
        } catch (Z) {
          return Promise.resolve({
            status: "failure",
            error: Z
          })
        }
        let G = I(this._parameters.grpcPath, this._parameters.grpcName);
        try {
          this._client = new G(this._parameters.address, this._parameters.credentials(), {
            "grpc.default_compression_algorithm": oD6(this._parameters.compression)
          })
        } catch (Z) {
          return Promise.resolve({
            status: "failure",
            error: Z
          })
        }
      }
      return new Promise((I) => {
        let G = Date.now() + B;
        if (this._metadata == null) return I({
          error: new Error("metadata was null"),
          status: "failure"
        });
        this._client.export(Q, this._metadata, {
          deadline: G
        }, (Z, D) => {
          if (Z) I({
            status: "failure",
            error: Z
          });
          else I({
            data: D,
            status: "success"
          })
        })
      })
    }
  }
  Qv0.GrpcExporterTransport = xd1;

  function BY6(A) {
    return new xd1(A)
  }
  Qv0.createOtlpGrpcExporterTransport = BY6
})
// @from(Start 5150241, End 5150377)
Dv0 = z((Gv0) => {
  Object.defineProperty(Gv0, "__esModule", {
    value: !0
  });
  Gv0.VERSION = void 0;
  Gv0.VERSION = "0.200.0"
})
// @from(Start 5150383, End 5152292)
Cv0 = z((Xv0) => {
  Object.defineProperty(Xv0, "__esModule", {
    value: !0
  });
  Xv0.getOtlpGrpcDefaultConfiguration = Xv0.mergeOtlpGrpcConfigurationWithDefaults = Xv0.validateAndNormalizeUrl = void 0;
  var Jv0 = p_(),
    Lr = Mr(),
    DY6 = Dv0(),
    YY6 = Z1("url"),
    Yv0 = s9();

  function Fv0(A) {
    if (A = A.trim(), !A.match(/^([\w]{1,8}):\/\//)) A = `https://${A}`;
    let Q = new YY6.URL(A);
    if (Q.protocol === "unix:") return A;
    if (Q.pathname && Q.pathname !== "/") Yv0.diag.warn("URL path should not be set when using grpc, the path part of the URL will be ignored.");
    if (Q.protocol !== "" && !Q.protocol?.match(/^(http)s?:$/)) Yv0.diag.warn("URL protocol should be http(s)://. Using http://.");
    return Q.host
  }
  Xv0.validateAndNormalizeUrl = Fv0;

  function Wv0(A, B) {
    for (let [Q, I] of Object.entries(B.getMap()))
      if (A.get(Q).length < 1) A.set(Q, I)
  }

  function WY6(A, B, Q) {
    let I = A.url ?? B.url ?? Q.url;
    return {
      ...Jv0.mergeOtlpSharedConfigurationWithDefaults(A, B, Q),
      metadata: () => {
        let G = Q.metadata();
        return Wv0(G, A.metadata?.().clone() ?? Lr.createEmptyMetadata()), Wv0(G, B.metadata?.() ?? Lr.createEmptyMetadata()), G
      },
      url: Fv0(I),
      credentials: A.credentials ?? B.credentials?.(I) ?? Q.credentials(I)
    }
  }
  Xv0.mergeOtlpGrpcConfigurationWithDefaults = WY6;

  function JY6() {
    return {
      ...Jv0.getSharedConfigurationDefaults(),
      metadata: () => {
        let A = Lr.createEmptyMetadata();
        return A.set("User-Agent", `OTel-OTLP-Exporter-JavaScript/${DY6.VERSION}`), A
      },
      url: "http://localhost:4317",
      credentials: (A) => {
        if (A.startsWith("http://")) return () => Lr.createInsecureCredentials();
        else return () => Lr.createSslCredentials()
      }
    }
  }
  Xv0.getOtlpGrpcDefaultConfiguration = JY6
})