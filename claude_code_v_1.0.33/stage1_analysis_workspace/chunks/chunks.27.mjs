
// @from(Start 2571554, End 2579166)
YhA = z((V48, DhA) => {
  var M14 = Z1("events"),
    oB1 = Z1("http"),
    {
      Duplex: X48
    } = Z1("stream"),
    {
      createHash: L14
    } = Z1("crypto"),
    IhA = JS1(),
    SS = qn(),
    R14 = QhA(),
    O14 = rB1(),
    {
      GUID: T14,
      kWebSocket: P14
    } = AN(),
    S14 = /^[+/0-9A-Za-z]{22}==$/;
  class ZhA extends M14 {
    constructor(A, B) {
      super();
      if (A = {
          allowSynchronousEvents: !0,
          autoPong: !0,
          maxPayload: 104857600,
          skipUTF8Validation: !1,
          perMessageDeflate: !1,
          handleProtocols: null,
          clientTracking: !0,
          verifyClient: null,
          noServer: !1,
          backlog: null,
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: O14,
          ...A
        }, A.port == null && !A.server && !A.noServer || A.port != null && (A.server || A.noServer) || A.server && A.noServer) throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');
      if (A.port != null) this._server = oB1.createServer((Q, I) => {
        let G = oB1.STATUS_CODES[426];
        I.writeHead(426, {
          "Content-Length": G.length,
          "Content-Type": "text/plain"
        }), I.end(G)
      }), this._server.listen(A.port, A.host, A.backlog, B);
      else if (A.server) this._server = A.server;
      if (this._server) {
        let Q = this.emit.bind(this, "connection");
        this._removeListeners = _14(this._server, {
          listening: this.emit.bind(this, "listening"),
          error: this.emit.bind(this, "error"),
          upgrade: (I, G, Z) => {
            this.handleUpgrade(I, G, Z, Q)
          }
        })
      }
      if (A.perMessageDeflate === !0) A.perMessageDeflate = {};
      if (A.clientTracking) this.clients = new Set, this._shouldEmitClose = !1;
      this.options = A, this._state = 0
    }
    address() {
      if (this.options.noServer) throw new Error('The server is operating in "noServer" mode');
      if (!this._server) return null;
      return this._server.address()
    }
    close(A) {
      if (this._state === 2) {
        if (A) this.once("close", () => {
          A(new Error("The server is not running"))
        });
        process.nextTick(On, this);
        return
      }
      if (A) this.once("close", A);
      if (this._state === 1) return;
      if (this._state = 1, this.options.noServer || this.options.server) {
        if (this._server) this._removeListeners(), this._removeListeners = this._server = null;
        if (this.clients)
          if (!this.clients.size) process.nextTick(On, this);
          else this._shouldEmitClose = !0;
        else process.nextTick(On, this)
      } else {
        let B = this._server;
        this._removeListeners(), this._removeListeners = this._server = null, B.close(() => {
          On(this)
        })
      }
    }
    shouldHandle(A) {
      if (this.options.path) {
        let B = A.url.indexOf("?");
        if ((B !== -1 ? A.url.slice(0, B) : A.url) !== this.options.path) return !1
      }
      return !0
    }
    handleUpgrade(A, B, Q, I) {
      B.on("error", GhA);
      let G = A.headers["sec-websocket-key"],
        Z = A.headers.upgrade,
        D = +A.headers["sec-websocket-version"];
      if (A.method !== "GET") {
        _S(this, A, B, 405, "Invalid HTTP method");
        return
      }
      if (Z === void 0 || Z.toLowerCase() !== "websocket") {
        _S(this, A, B, 400, "Invalid Upgrade header");
        return
      }
      if (G === void 0 || !S14.test(G)) {
        _S(this, A, B, 400, "Missing or invalid Sec-WebSocket-Key header");
        return
      }
      if (D !== 8 && D !== 13) {
        _S(this, A, B, 400, "Missing or invalid Sec-WebSocket-Version header");
        return
      }
      if (!this.shouldHandle(A)) {
        Tn(B, 400);
        return
      }
      let Y = A.headers["sec-websocket-protocol"],
        W = new Set;
      if (Y !== void 0) try {
        W = R14.parse(Y)
      } catch (X) {
        _S(this, A, B, 400, "Invalid Sec-WebSocket-Protocol header");
        return
      }
      let J = A.headers["sec-websocket-extensions"],
        F = {};
      if (this.options.perMessageDeflate && J !== void 0) {
        let X = new SS(this.options.perMessageDeflate, !0, this.options.maxPayload);
        try {
          let V = IhA.parse(J);
          if (V[SS.extensionName]) X.accept(V[SS.extensionName]), F[SS.extensionName] = X
        } catch (V) {
          _S(this, A, B, 400, "Invalid or unacceptable Sec-WebSocket-Extensions header");
          return
        }
      }
      if (this.options.verifyClient) {
        let X = {
          origin: A.headers[`${D===8?"sec-websocket-origin":"origin"}`],
          secure: !!(A.socket.authorized || A.socket.encrypted),
          req: A
        };
        if (this.options.verifyClient.length === 2) {
          this.options.verifyClient(X, (V, C, K, E) => {
            if (!V) return Tn(B, C || 401, K, E);
            this.completeUpgrade(F, G, W, A, B, Q, I)
          });
          return
        }
        if (!this.options.verifyClient(X)) return Tn(B, 401)
      }
      this.completeUpgrade(F, G, W, A, B, Q, I)
    }
    completeUpgrade(A, B, Q, I, G, Z, D) {
      if (!G.readable || !G.writable) return G.destroy();
      if (G[P14]) throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");
      if (this._state > 0) return Tn(G, 503);
      let W = ["HTTP/1.1 101 Switching Protocols", "Upgrade: websocket", "Connection: Upgrade", `Sec-WebSocket-Accept: ${L14("sha1").update(B+T14).digest("base64")}`],
        J = new this.options.WebSocket(null, void 0, this.options);
      if (Q.size) {
        let F = this.options.handleProtocols ? this.options.handleProtocols(Q, I) : Q.values().next().value;
        if (F) W.push(`Sec-WebSocket-Protocol: ${F}`), J._protocol = F
      }
      if (A[SS.extensionName]) {
        let F = A[SS.extensionName].params,
          X = IhA.format({
            [SS.extensionName]: [F]
          });
        W.push(`Sec-WebSocket-Extensions: ${X}`), J._extensions = A
      }
      if (this.emit("headers", W, I), G.write(W.concat(`\r
`).join(`\r
`)), G.removeListener("error", GhA), J.setSocket(G, Z, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        }), this.clients) this.clients.add(J), J.on("close", () => {
        if (this.clients.delete(J), this._shouldEmitClose && !this.clients.size) process.nextTick(On, this)
      });
      D(J, I)
    }
  }
  DhA.exports = ZhA;

  function _14(A, B) {
    for (let Q of Object.keys(B)) A.on(Q, B[Q]);
    return function Q() {
      for (let I of Object.keys(B)) A.removeListener(I, B[I])
    }
  }

  function On(A) {
    A._state = 2, A.emit("close")
  }

  function GhA() {
    this.destroy()
  }

  function Tn(A, B, Q, I) {
    Q = Q || oB1.STATUS_CODES[B], I = {
      Connection: "close",
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(Q),
      ...I
    }, A.once("finish", A.destroy), A.end(`HTTP/1.1 ${B} ${oB1.STATUS_CODES[B]}\r
` + Object.keys(I).map((G) => `${G}: ${I[G]}`).join(`\r
`) + `\r
\r
` + Q)
  }

  function _S(A, B, Q, I, G) {
    if (A.listenerCount("wsClientError")) {
      let Z = new Error(G);
      Error.captureStackTrace(Z, _S), A.emit("wsClientError", Z, Q, B)
    } else Tn(Q, I, G)
  }
})
// @from(Start 2579172, End 2579175)
j14
// @from(Start 2579177, End 2579180)
y14
// @from(Start 2579182, End 2579185)
k14
// @from(Start 2579187, End 2579190)
tB1
// @from(Start 2579192, End 2579195)
x14
// @from(Start 2579197, End 2579199)
XL
// @from(Start 2579205, End 2579344)
eB1 = J21(() => {
  j14 = I1(AhA(), 1), y14 = I1(ZS1(), 1), k14 = I1(YS1(), 1), tB1 = I1(rB1(), 1), x14 = I1(YhA(), 1), XL = tB1.default
})
// @from(Start 2579350, End 2579353)
A31
// @from(Start 2579359, End 2580112)
WhA = J21(() => {
  eB1();
  A31 = global;
  A31.WebSocket ||= XL;
  A31.window ||= global;
  A31.self ||= global;
  A31.window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ = [{
    type: 1,
    value: 7,
    isEnabled: !0
  }, {
    type: 2,
    value: "InternalApp",
    isEnabled: !0,
    isValid: !0
  }, {
    type: 2,
    value: "InternalAppContext",
    isEnabled: !0,
    isValid: !0
  }, {
    type: 2,
    value: "InternalStdoutContext",
    isEnabled: !0,
    isValid: !0
  }, {
    type: 2,
    value: "InternalStderrContext",
    isEnabled: !0,
    isValid: !0
  }, {
    type: 2,
    value: "InternalStdinContext",
    isEnabled: !0,
    isValid: !0
  }, {
    type: 2,
    value: "InternalFocusContext",
    isEnabled: !0,
    isValid: !0
  }]
})