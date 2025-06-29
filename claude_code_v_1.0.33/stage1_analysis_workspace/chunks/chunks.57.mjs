
// @from(Start 5693154, End 5700461)
zn0 = z((aO8, Hn0) => {
  var {
    Writable: S$6
  } = Z1("node:stream"), _$6 = Z1("node:assert"), {
    parserStates: tY,
    opcodes: Vm,
    states: j$6,
    emptyBuffer: Zn0,
    sentCloseFrameState: Dn0
  } = Oj(), {
    kReadyState: y$6,
    kSentClose: Yn0,
    kResponse: Wn0,
    kReceivedClose: Jn0
  } = qo(), {
    channels: sW1
  } = Rh(), {
    isValidStatusCode: k$6,
    isValidOpcode: x$6,
    failWebsocketConnection: dX,
    websocketMessageReceived: Fn0,
    utf8Decode: f$6,
    isControlFrame: Xn0,
    isTextBinaryFrame: Oc1,
    isContinuationFrame: v$6
  } = Ro(), {
    WebsocketFrameSend: Vn0
  } = cW1(), {
    closeWebSocketConnection: Cn0
  } = Rc1(), {
    PerMessageDeflate: b$6
  } = Gn0();
  class Kn0 extends S$6 {
    #A = [];
    #B = 0;
    #Q = !1;
    #I = tY.INFO;
    #G = {};
    #W = [];
    #Z;
    constructor(A, B) {
      super();
      if (this.ws = A, this.#Z = B == null ? new Map : B, this.#Z.has("permessage-deflate")) this.#Z.set("permessage-deflate", new b$6(B))
    }
    _write(A, B, Q) {
      this.#A.push(A), this.#B += A.length, this.#Q = !0, this.run(Q)
    }
    run(A) {
      while (this.#Q)
        if (this.#I === tY.INFO) {
          if (this.#B < 2) return A();
          let B = this.consume(2),
            Q = (B[0] & 128) !== 0,
            I = B[0] & 15,
            G = (B[1] & 128) === 128,
            Z = !Q && I !== Vm.CONTINUATION,
            D = B[1] & 127,
            Y = B[0] & 64,
            W = B[0] & 32,
            J = B[0] & 16;
          if (!x$6(I)) return dX(this.ws, "Invalid opcode received"), A();
          if (G) return dX(this.ws, "Frame cannot be masked"), A();
          if (Y !== 0 && !this.#Z.has("permessage-deflate")) {
            dX(this.ws, "Expected RSV1 to be clear.");
            return
          }
          if (W !== 0 || J !== 0) {
            dX(this.ws, "RSV1, RSV2, RSV3 must be clear");
            return
          }
          if (Z && !Oc1(I)) {
            dX(this.ws, "Invalid frame type was fragmented.");
            return
          }
          if (Oc1(I) && this.#W.length > 0) {
            dX(this.ws, "Expected continuation frame");
            return
          }
          if (this.#G.fragmented && Z) {
            dX(this.ws, "Fragmented frame exceeded 125 bytes.");
            return
          }
          if ((D > 125 || Z) && Xn0(I)) {
            dX(this.ws, "Control frame either too large or fragmented");
            return
          }
          if (v$6(I) && this.#W.length === 0 && !this.#G.compressed) {
            dX(this.ws, "Unexpected continuation frame");
            return
          }
          if (D <= 125) this.#G.payloadLength = D, this.#I = tY.READ_DATA;
          else if (D === 126) this.#I = tY.PAYLOADLENGTH_16;
          else if (D === 127) this.#I = tY.PAYLOADLENGTH_64;
          if (Oc1(I)) this.#G.binaryType = I, this.#G.compressed = Y !== 0;
          this.#G.opcode = I, this.#G.masked = G, this.#G.fin = Q, this.#G.fragmented = Z
        } else if (this.#I === tY.PAYLOADLENGTH_16) {
        if (this.#B < 2) return A();
        let B = this.consume(2);
        this.#G.payloadLength = B.readUInt16BE(0), this.#I = tY.READ_DATA
      } else if (this.#I === tY.PAYLOADLENGTH_64) {
        if (this.#B < 8) return A();
        let B = this.consume(8),
          Q = B.readUInt32BE(0);
        if (Q > 2147483647) {
          dX(this.ws, "Received payload length > 2^31 bytes.");
          return
        }
        let I = B.readUInt32BE(4);
        this.#G.payloadLength = (Q << 8) + I, this.#I = tY.READ_DATA
      } else if (this.#I === tY.READ_DATA) {
        if (this.#B < this.#G.payloadLength) return A();
        let B = this.consume(this.#G.payloadLength);
        if (Xn0(this.#G.opcode)) this.#Q = this.parseControlFrame(B), this.#I = tY.INFO;
        else if (!this.#G.compressed) {
          if (this.#W.push(B), !this.#G.fragmented && this.#G.fin) {
            let Q = Buffer.concat(this.#W);
            Fn0(this.ws, this.#G.binaryType, Q), this.#W.length = 0
          }
          this.#I = tY.INFO
        } else {
          this.#Z.get("permessage-deflate").decompress(B, this.#G.fin, (Q, I) => {
            if (Q) {
              Cn0(this.ws, 1007, Q.message, Q.message.length);
              return
            }
            if (this.#W.push(I), !this.#G.fin) {
              this.#I = tY.INFO, this.#Q = !0, this.run(A);
              return
            }
            Fn0(this.ws, this.#G.binaryType, Buffer.concat(this.#W)), this.#Q = !0, this.#I = tY.INFO, this.#W.length = 0, this.run(A)
          }), this.#Q = !1;
          break
        }
      }
    }
    consume(A) {
      if (A > this.#B) throw new Error("Called consume() before buffers satiated.");
      else if (A === 0) return Zn0;
      if (this.#A[0].length === A) return this.#B -= this.#A[0].length, this.#A.shift();
      let B = Buffer.allocUnsafe(A),
        Q = 0;
      while (Q !== A) {
        let I = this.#A[0],
          {
            length: G
          } = I;
        if (G + Q === A) {
          B.set(this.#A.shift(), Q);
          break
        } else if (G + Q > A) {
          B.set(I.subarray(0, A - Q), Q), this.#A[0] = I.subarray(A - Q);
          break
        } else B.set(this.#A.shift(), Q), Q += I.length
      }
      return this.#B -= A, B
    }
    parseCloseBody(A) {
      _$6(A.length !== 1);
      let B;
      if (A.length >= 2) B = A.readUInt16BE(0);
      if (B !== void 0 && !k$6(B)) return {
        code: 1002,
        reason: "Invalid status code",
        error: !0
      };
      let Q = A.subarray(2);
      if (Q[0] === 239 && Q[1] === 187 && Q[2] === 191) Q = Q.subarray(3);
      try {
        Q = f$6(Q)
      } catch {
        return {
          code: 1007,
          reason: "Invalid UTF-8",
          error: !0
        }
      }
      return {
        code: B,
        reason: Q,
        error: !1
      }
    }
    parseControlFrame(A) {
      let {
        opcode: B,
        payloadLength: Q
      } = this.#G;
      if (B === Vm.CLOSE) {
        if (Q === 1) return dX(this.ws, "Received close frame with a 1-byte body."), !1;
        if (this.#G.closeInfo = this.parseCloseBody(A), this.#G.closeInfo.error) {
          let {
            code: I,
            reason: G
          } = this.#G.closeInfo;
          return Cn0(this.ws, I, G, G.length), dX(this.ws, G), !1
        }
        if (this.ws[Yn0] !== Dn0.SENT) {
          let I = Zn0;
          if (this.#G.closeInfo.code) I = Buffer.allocUnsafe(2), I.writeUInt16BE(this.#G.closeInfo.code, 0);
          let G = new Vn0(I);
          this.ws[Wn0].socket.write(G.createFrame(Vm.CLOSE), (Z) => {
            if (!Z) this.ws[Yn0] = Dn0.SENT
          })
        }
        return this.ws[y$6] = j$6.CLOSING, this.ws[Jn0] = !0, !1
      } else if (B === Vm.PING) {
        if (!this.ws[Jn0]) {
          let I = new Vn0(A);
          if (this.ws[Wn0].socket.write(I.createFrame(Vm.PONG)), sW1.ping.hasSubscribers) sW1.ping.publish({
            payload: A
          })
        }
      } else if (B === Vm.PONG) {
        if (sW1.pong.hasSubscribers) sW1.pong.publish({
          payload: A
        })
      }
      return !0
    }
    get closingInfo() {
      return this.#G.closeInfo
    }
  }
  Hn0.exports = {
    ByteParser: Kn0
  }
})
// @from(Start 5700467, End 5701946)
qn0 = z((sO8, $n0) => {
  var {
    WebsocketFrameSend: g$6
  } = cW1(), {
    opcodes: wn0,
    sendHints: Cm
  } = Oj(), h$6 = Fp1(), En0 = Buffer[Symbol.species];
  class Nn0 {
    #A = new h$6;
    #B = !1;
    #Q;
    constructor(A) {
      this.#Q = A
    }
    add(A, B, Q) {
      if (Q !== Cm.blob) {
        let G = Un0(A, Q);
        if (!this.#B) this.#Q.write(G, B);
        else {
          let Z = {
            promise: null,
            callback: B,
            frame: G
          };
          this.#A.push(Z)
        }
        return
      }
      let I = {
        promise: A.arrayBuffer().then((G) => {
          I.promise = null, I.frame = Un0(G, Q)
        }),
        callback: B,
        frame: null
      };
      if (this.#A.push(I), !this.#B) this.#I()
    }
    async #I() {
      this.#B = !0;
      let A = this.#A;
      while (!A.isEmpty()) {
        let B = A.shift();
        if (B.promise !== null) await B.promise;
        this.#Q.write(B.frame, B.callback), B.callback = B.frame = null
      }
      this.#B = !1
    }
  }

  function Un0(A, B) {
    return new g$6(m$6(A, B)).createFrame(B === Cm.string ? wn0.TEXT : wn0.BINARY)
  }

  function m$6(A, B) {
    switch (B) {
      case Cm.string:
        return Buffer.from(A);
      case Cm.arrayBuffer:
      case Cm.blob:
        return new En0(A);
      case Cm.typedArray:
        return new En0(A.buffer, A.byteOffset, A.byteLength)
    }
  }
  $n0.exports = {
    SendQueue: Nn0
  }
})
// @from(Start 5701952, End 5710655)
jn0 = z((rO8, _n0) => {
  var {
    webidl: w4
  } = jG(), {
    URLSerializer: d$6
  } = nY(), {
    environmentSettingsObject: Mn0
  } = MJ(), {
    staticPropertyDescriptors: dR,
    states: So,
    sentCloseFrameState: u$6,
    sendHints: rW1
  } = Oj(), {
    kWebSocketURL: Ln0,
    kReadyState: Tc1,
    kController: p$6,
    kBinaryType: oW1,
    kResponse: Rn0,
    kSentClose: c$6,
    kByteParser: l$6
  } = qo(), {
    isConnecting: i$6,
    isEstablished: n$6,
    isClosing: a$6,
    isValidSubprotocol: s$6,
    fireEvent: On0
  } = Ro(), {
    establishWebSocketConnection: r$6,
    closeWebSocketConnection: Tn0
  } = Rc1(), {
    ByteParser: o$6
  } = zn0(), {
    kEnumerableProperty: uX,
    isBlobLike: Pn0
  } = C6(), {
    getGlobalDispatcher: t$6
  } = wW1(), {
    types: Sn0
  } = Z1("node:util"), {
    ErrorEvent: e$6,
    CloseEvent: Aq6
  } = Jm(), {
    SendQueue: Bq6
  } = qn0();
  class s5 extends EventTarget {
    #A = {
      open: null,
      error: null,
      close: null,
      message: null
    };
    #B = 0;
    #Q = "";
    #I = "";
    #G;
    constructor(A, B = []) {
      super();
      w4.util.markAsUncloneable(this);
      let Q = "WebSocket constructor";
      w4.argumentLengthCheck(arguments, 1, Q);
      let I = w4.converters["DOMString or sequence<DOMString> or WebSocketInit"](B, Q, "options");
      A = w4.converters.USVString(A, Q, "url"), B = I.protocols;
      let G = Mn0.settingsObject.baseUrl,
        Z;
      try {
        Z = new URL(A, G)
      } catch (Y) {
        throw new DOMException(Y, "SyntaxError")
      }
      if (Z.protocol === "http:") Z.protocol = "ws:";
      else if (Z.protocol === "https:") Z.protocol = "wss:";
      if (Z.protocol !== "ws:" && Z.protocol !== "wss:") throw new DOMException(`Expected a ws: or wss: protocol, got ${Z.protocol}`, "SyntaxError");
      if (Z.hash || Z.href.endsWith("#")) throw new DOMException("Got fragment", "SyntaxError");
      if (typeof B === "string") B = [B];
      if (B.length !== new Set(B.map((Y) => Y.toLowerCase())).size) throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      if (B.length > 0 && !B.every((Y) => s$6(Y))) throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      this[Ln0] = new URL(Z.href);
      let D = Mn0.settingsObject;
      this[p$6] = r$6(Z, B, D, this, (Y, W) => this.#W(Y, W), I), this[Tc1] = s5.CONNECTING, this[c$6] = u$6.NOT_SENT, this[oW1] = "blob"
    }
    close(A = void 0, B = void 0) {
      w4.brandCheck(this, s5);
      let Q = "WebSocket.close";
      if (A !== void 0) A = w4.converters["unsigned short"](A, Q, "code", {
        clamp: !0
      });
      if (B !== void 0) B = w4.converters.USVString(B, Q, "reason");
      if (A !== void 0) {
        if (A !== 1000 && (A < 3000 || A > 4999)) throw new DOMException("invalid code", "InvalidAccessError")
      }
      let I = 0;
      if (B !== void 0) {
        if (I = Buffer.byteLength(B), I > 123) throw new DOMException(`Reason must be less than 123 bytes; received ${I}`, "SyntaxError")
      }
      Tn0(this, A, B, I)
    }
    send(A) {
      w4.brandCheck(this, s5);
      let B = "WebSocket.send";
      if (w4.argumentLengthCheck(arguments, 1, B), A = w4.converters.WebSocketSendData(A, B, "data"), i$6(this)) throw new DOMException("Sent before connected.", "InvalidStateError");
      if (!n$6(this) || a$6(this)) return;
      if (typeof A === "string") {
        let Q = Buffer.byteLength(A);
        this.#B += Q, this.#G.add(A, () => {
          this.#B -= Q
        }, rW1.string)
      } else if (Sn0.isArrayBuffer(A)) this.#B += A.byteLength, this.#G.add(A, () => {
        this.#B -= A.byteLength
      }, rW1.arrayBuffer);
      else if (ArrayBuffer.isView(A)) this.#B += A.byteLength, this.#G.add(A, () => {
        this.#B -= A.byteLength
      }, rW1.typedArray);
      else if (Pn0(A)) this.#B += A.size, this.#G.add(A, () => {
        this.#B -= A.size
      }, rW1.blob)
    }
    get readyState() {
      return w4.brandCheck(this, s5), this[Tc1]
    }
    get bufferedAmount() {
      return w4.brandCheck(this, s5), this.#B
    }
    get url() {
      return w4.brandCheck(this, s5), d$6(this[Ln0])
    }
    get extensions() {
      return w4.brandCheck(this, s5), this.#I
    }
    get protocol() {
      return w4.brandCheck(this, s5), this.#Q
    }
    get onopen() {
      return w4.brandCheck(this, s5), this.#A.open
    }
    set onopen(A) {
      if (w4.brandCheck(this, s5), this.#A.open) this.removeEventListener("open", this.#A.open);
      if (typeof A === "function") this.#A.open = A, this.addEventListener("open", A);
      else this.#A.open = null
    }
    get onerror() {
      return w4.brandCheck(this, s5), this.#A.error
    }
    set onerror(A) {
      if (w4.brandCheck(this, s5), this.#A.error) this.removeEventListener("error", this.#A.error);
      if (typeof A === "function") this.#A.error = A, this.addEventListener("error", A);
      else this.#A.error = null
    }
    get onclose() {
      return w4.brandCheck(this, s5), this.#A.close
    }
    set onclose(A) {
      if (w4.brandCheck(this, s5), this.#A.close) this.removeEventListener("close", this.#A.close);
      if (typeof A === "function") this.#A.close = A, this.addEventListener("close", A);
      else this.#A.close = null
    }
    get onmessage() {
      return w4.brandCheck(this, s5), this.#A.message
    }
    set onmessage(A) {
      if (w4.brandCheck(this, s5), this.#A.message) this.removeEventListener("message", this.#A.message);
      if (typeof A === "function") this.#A.message = A, this.addEventListener("message", A);
      else this.#A.message = null
    }
    get binaryType() {
      return w4.brandCheck(this, s5), this[oW1]
    }
    set binaryType(A) {
      if (w4.brandCheck(this, s5), A !== "blob" && A !== "arraybuffer") this[oW1] = "blob";
      else this[oW1] = A
    }
    #W(A, B) {
      this[Rn0] = A;
      let Q = new o$6(this, B);
      Q.on("drain", Qq6), Q.on("error", Iq6.bind(this)), A.socket.ws = this, this[l$6] = Q, this.#G = new Bq6(A.socket), this[Tc1] = So.OPEN;
      let I = A.headersList.get("sec-websocket-extensions");
      if (I !== null) this.#I = I;
      let G = A.headersList.get("sec-websocket-protocol");
      if (G !== null) this.#Q = G;
      On0("open", this)
    }
  }
  s5.CONNECTING = s5.prototype.CONNECTING = So.CONNECTING;
  s5.OPEN = s5.prototype.OPEN = So.OPEN;
  s5.CLOSING = s5.prototype.CLOSING = So.CLOSING;
  s5.CLOSED = s5.prototype.CLOSED = So.CLOSED;
  Object.defineProperties(s5.prototype, {
    CONNECTING: dR,
    OPEN: dR,
    CLOSING: dR,
    CLOSED: dR,
    url: uX,
    readyState: uX,
    bufferedAmount: uX,
    onopen: uX,
    onerror: uX,
    onclose: uX,
    close: uX,
    onmessage: uX,
    binaryType: uX,
    send: uX,
    extensions: uX,
    protocol: uX,
    [Symbol.toStringTag]: {
      value: "WebSocket",
      writable: !1,
      enumerable: !1,
      configurable: !0
    }
  });
  Object.defineProperties(s5, {
    CONNECTING: dR,
    OPEN: dR,
    CLOSING: dR,
    CLOSED: dR
  });
  w4.converters["sequence<DOMString>"] = w4.sequenceConverter(w4.converters.DOMString);
  w4.converters["DOMString or sequence<DOMString>"] = function(A, B, Q) {
    if (w4.util.Type(A) === "Object" && Symbol.iterator in A) return w4.converters["sequence<DOMString>"](A);
    return w4.converters.DOMString(A, B, Q)
  };
  w4.converters.WebSocketInit = w4.dictionaryConverter([{
    key: "protocols",
    converter: w4.converters["DOMString or sequence<DOMString>"],
    defaultValue: () => new Array(0)
  }, {
    key: "dispatcher",
    converter: w4.converters.any,
    defaultValue: () => t$6()
  }, {
    key: "headers",
    converter: w4.nullableConverter(w4.converters.HeadersInit)
  }]);
  w4.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(A) {
    if (w4.util.Type(A) === "Object" && !(Symbol.iterator in A)) return w4.converters.WebSocketInit(A);
    return {
      protocols: w4.converters["DOMString or sequence<DOMString>"](A)
    }
  };
  w4.converters.WebSocketSendData = function(A) {
    if (w4.util.Type(A) === "Object") {
      if (Pn0(A)) return w4.converters.Blob(A, {
        strict: !1
      });
      if (ArrayBuffer.isView(A) || Sn0.isArrayBuffer(A)) return w4.converters.BufferSource(A)
    }
    return w4.converters.USVString(A)
  };

  function Qq6() {
    this.ws[Rn0].socket.resume()
  }

  function Iq6(A) {
    let B, Q;
    if (A instanceof Aq6) B = A.reason, Q = A.code;
    else B = A.message;
    On0("error", this, () => new e$6("error", {
      error: A,
      message: B
    })), Tn0(this, Q)
  }
  _n0.exports = {
    WebSocket: s5
  }
})
// @from(Start 5710661, End 5711112)
Pc1 = z((oO8, yn0) => {
  function Gq6(A) {
    return A.indexOf("\x00") === -1
  }

  function Zq6(A) {
    if (A.length === 0) return !1;
    for (let B = 0; B < A.length; B++)
      if (A.charCodeAt(B) < 48 || A.charCodeAt(B) > 57) return !1;
    return !0
  }

  function Dq6(A) {
    return new Promise((B) => {
      setTimeout(B, A).unref()
    })
  }
  yn0.exports = {
    isValidLastEventId: Gq6,
    isASCIINumber: Zq6,
    delay: Dq6
  }
})
// @from(Start 5711118, End 5715224)
bn0 = z((tO8, vn0) => {
  var {
    Transform: Yq6
  } = Z1("node:stream"), {
    isASCIINumber: kn0,
    isValidLastEventId: xn0
  } = Pc1(), aN = [239, 187, 191];
  class fn0 extends Yq6 {
    state = null;
    checkBOM = !0;
    crlfCheck = !1;
    eventEndCheck = !1;
    buffer = null;
    pos = 0;
    event = {
      data: void 0,
      event: void 0,
      id: void 0,
      retry: void 0
    };
    constructor(A = {}) {
      A.readableObjectMode = !0;
      super(A);
      if (this.state = A.eventSourceSettings || {}, A.push) this.push = A.push
    }
    _transform(A, B, Q) {
      if (A.length === 0) {
        Q();
        return
      }
      if (this.buffer) this.buffer = Buffer.concat([this.buffer, A]);
      else this.buffer = A;
      if (this.checkBOM) switch (this.buffer.length) {
        case 1:
          if (this.buffer[0] === aN[0]) {
            Q();
            return
          }
          this.checkBOM = !1, Q();
          return;
        case 2:
          if (this.buffer[0] === aN[0] && this.buffer[1] === aN[1]) {
            Q();
            return
          }
          this.checkBOM = !1;
          break;
        case 3:
          if (this.buffer[0] === aN[0] && this.buffer[1] === aN[1] && this.buffer[2] === aN[2]) {
            this.buffer = Buffer.alloc(0), this.checkBOM = !1, Q();
            return
          }
          this.checkBOM = !1;
          break;
        default:
          if (this.buffer[0] === aN[0] && this.buffer[1] === aN[1] && this.buffer[2] === aN[2]) this.buffer = this.buffer.subarray(3);
          this.checkBOM = !1;
          break
      }
      while (this.pos < this.buffer.length) {
        if (this.eventEndCheck) {
          if (this.crlfCheck) {
            if (this.buffer[this.pos] === 10) {
              this.buffer = this.buffer.subarray(this.pos + 1), this.pos = 0, this.crlfCheck = !1;
              continue
            }
            this.crlfCheck = !1
          }
          if (this.buffer[this.pos] === 10 || this.buffer[this.pos] === 13) {
            if (this.buffer[this.pos] === 13) this.crlfCheck = !0;
            if (this.buffer = this.buffer.subarray(this.pos + 1), this.pos = 0, this.event.data !== void 0 || this.event.event || this.event.id || this.event.retry) this.processEvent(this.event);
            this.clearEvent();
            continue
          }
          this.eventEndCheck = !1;
          continue
        }
        if (this.buffer[this.pos] === 10 || this.buffer[this.pos] === 13) {
          if (this.buffer[this.pos] === 13) this.crlfCheck = !0;
          this.parseLine(this.buffer.subarray(0, this.pos), this.event), this.buffer = this.buffer.subarray(this.pos + 1), this.pos = 0, this.eventEndCheck = !0;
          continue
        }
        this.pos++
      }
      Q()
    }
    parseLine(A, B) {
      if (A.length === 0) return;
      let Q = A.indexOf(58);
      if (Q === 0) return;
      let I = "",
        G = "";
      if (Q !== -1) {
        I = A.subarray(0, Q).toString("utf8");
        let Z = Q + 1;
        if (A[Z] === 32) ++Z;
        G = A.subarray(Z).toString("utf8")
      } else I = A.toString("utf8"), G = "";
      switch (I) {
        case "data":
          if (B[I] === void 0) B[I] = G;
          else B[I] += `
${G}`;
          break;
        case "retry":
          if (kn0(G)) B[I] = G;
          break;
        case "id":
          if (xn0(G)) B[I] = G;
          break;
        case "event":
          if (G.length > 0) B[I] = G;
          break
      }
    }
    processEvent(A) {
      if (A.retry && kn0(A.retry)) this.state.reconnectionTime = parseInt(A.retry, 10);
      if (A.id && xn0(A.id)) this.state.lastEventId = A.id;
      if (A.data !== void 0) this.push({
        type: A.event || "message",
        options: {
          data: A.data,
          lastEventId: this.state.lastEventId,
          origin: this.state.origin
        }
      })
    }
    clearEvent() {
      this.event = {
        data: void 0,
        event: void 0,
        id: void 0,
        retry: void 0
      }
    }
  }
  vn0.exports = {
    EventSourceStream: fn0
  }
})
// @from(Start 5715230, End 5720943)
ln0 = z((eO8, cn0) => {
  var {
    pipeline: Wq6
  } = Z1("node:stream"), {
    fetching: Jq6
  } = wo(), {
    makeRequest: Fq6
  } = Im(), {
    webidl: sN
  } = jG(), {
    EventSourceStream: Xq6
  } = bn0(), {
    parseMIMEType: Vq6
  } = nY(), {
    createFastMessageEvent: Cq6
  } = Jm(), {
    isNetworkError: gn0
  } = Ho(), {
    delay: Kq6
  } = Pc1(), {
    kEnumerableProperty: Tj
  } = C6(), {
    environmentSettingsObject: hn0
  } = MJ(), mn0 = !1, dn0 = 3000, _o = 0, un0 = 1, jo = 2, Hq6 = "anonymous", zq6 = "use-credentials";
  class Km extends EventTarget {
    #A = {
      open: null,
      error: null,
      message: null
    };
    #B = null;
    #Q = !1;
    #I = _o;
    #G = null;
    #W = null;
    #Z;
    #F;
    constructor(A, B = {}) {
      super();
      sN.util.markAsUncloneable(this);
      let Q = "EventSource constructor";
      if (sN.argumentLengthCheck(arguments, 1, Q), !mn0) mn0 = !0, process.emitWarning("EventSource is experimental, expect them to change at any time.", {
        code: "UNDICI-ES"
      });
      A = sN.converters.USVString(A, Q, "url"), B = sN.converters.EventSourceInitDict(B, Q, "eventSourceInitDict"), this.#Z = B.dispatcher, this.#F = {
        lastEventId: "",
        reconnectionTime: dn0
      };
      let I = hn0,
        G;
      try {
        G = new URL(A, I.settingsObject.baseUrl), this.#F.origin = G.origin
      } catch (Y) {
        throw new DOMException(Y, "SyntaxError")
      }
      this.#B = G.href;
      let Z = Hq6;
      if (B.withCredentials) Z = zq6, this.#Q = !0;
      let D = {
        redirect: "follow",
        keepalive: !0,
        mode: "cors",
        credentials: Z === "anonymous" ? "same-origin" : "omit",
        referrer: "no-referrer"
      };
      D.client = hn0.settingsObject, D.headersList = [
        ["accept", {
          name: "accept",
          value: "text/event-stream"
        }]
      ], D.cache = "no-store", D.initiator = "other", D.urlList = [new URL(this.#B)], this.#G = Fq6(D), this.#J()
    }
    get readyState() {
      return this.#I
    }
    get url() {
      return this.#B
    }
    get withCredentials() {
      return this.#Q
    }
    #J() {
      if (this.#I === jo) return;
      this.#I = _o;
      let A = {
          request: this.#G,
          dispatcher: this.#Z
        },
        B = (Q) => {
          if (gn0(Q)) this.dispatchEvent(new Event("error")), this.close();
          this.#X()
        };
      A.processResponseEndOfBody = B, A.processResponse = (Q) => {
        if (gn0(Q))
          if (Q.aborted) {
            this.close(), this.dispatchEvent(new Event("error"));
            return
          } else {
            this.#X();
            return
          } let I = Q.headersList.get("content-type", !0),
          G = I !== null ? Vq6(I) : "failure",
          Z = G !== "failure" && G.essence === "text/event-stream";
        if (Q.status !== 200 || Z === !1) {
          this.close(), this.dispatchEvent(new Event("error"));
          return
        }
        this.#I = un0, this.dispatchEvent(new Event("open")), this.#F.origin = Q.urlList[Q.urlList.length - 1].origin;
        let D = new Xq6({
          eventSourceSettings: this.#F,
          push: (Y) => {
            this.dispatchEvent(Cq6(Y.type, Y.options))
          }
        });
        Wq6(Q.body.stream, D, (Y) => {
          if (Y?.aborted === !1) this.close(), this.dispatchEvent(new Event("error"))
        })
      }, this.#W = Jq6(A)
    }
    async #X() {
      if (this.#I === jo) return;
      if (this.#I = _o, this.dispatchEvent(new Event("error")), await Kq6(this.#F.reconnectionTime), this.#I !== _o) return;
      if (this.#F.lastEventId.length) this.#G.headersList.set("last-event-id", this.#F.lastEventId, !0);
      this.#J()
    }
    close() {
      if (sN.brandCheck(this, Km), this.#I === jo) return;
      this.#I = jo, this.#W.abort(), this.#G = null
    }
    get onopen() {
      return this.#A.open
    }
    set onopen(A) {
      if (this.#A.open) this.removeEventListener("open", this.#A.open);
      if (typeof A === "function") this.#A.open = A, this.addEventListener("open", A);
      else this.#A.open = null
    }
    get onmessage() {
      return this.#A.message
    }
    set onmessage(A) {
      if (this.#A.message) this.removeEventListener("message", this.#A.message);
      if (typeof A === "function") this.#A.message = A, this.addEventListener("message", A);
      else this.#A.message = null
    }
    get onerror() {
      return this.#A.error
    }
    set onerror(A) {
      if (this.#A.error) this.removeEventListener("error", this.#A.error);
      if (typeof A === "function") this.#A.error = A, this.addEventListener("error", A);
      else this.#A.error = null
    }
  }
  var pn0 = {
    CONNECTING: {
      __proto__: null,
      configurable: !1,
      enumerable: !0,
      value: _o,
      writable: !1
    },
    OPEN: {
      __proto__: null,
      configurable: !1,
      enumerable: !0,
      value: un0,
      writable: !1
    },
    CLOSED: {
      __proto__: null,
      configurable: !1,
      enumerable: !0,
      value: jo,
      writable: !1
    }
  };
  Object.defineProperties(Km, pn0);
  Object.defineProperties(Km.prototype, pn0);
  Object.defineProperties(Km.prototype, {
    close: Tj,
    onerror: Tj,
    onmessage: Tj,
    onopen: Tj,
    readyState: Tj,
    url: Tj,
    withCredentials: Tj
  });
  sN.converters.EventSourceInitDict = sN.dictionaryConverter([{
    key: "withCredentials",
    converter: sN.converters.boolean,
    defaultValue: () => !1
  }, {
    key: "dispatcher",
    converter: sN.converters.any
  }]);
  cn0.exports = {
    EventSource: Km,
    defaultReconnectionTime: dn0
  }
})
// @from(Start 5720949, End 5724619)
sn0 = z((sq6, A4) => {
  var wq6 = er(),
    in0 = yr(),
    Eq6 = lh(),
    Uq6 = Pu0(),
    Nq6 = ih(),
    $q6 = qp1(),
    qq6 = au0(),
    Mq6 = Bp0(),
    nn0 = u5(),
    eW1 = C6(),
    {
      InvalidArgumentError: tW1
    } = nn0,
    Hm = ap0(),
    Lq6 = xr(),
    Rq6 = np1(),
    Oq6 = kc0(),
    Tq6 = sp1(),
    Pq6 = vp1(),
    Sq6 = WW1(),
    {
      getGlobalDispatcher: an0,
      setGlobalDispatcher: _q6
    } = wW1(),
    jq6 = EW1(),
    yq6 = tY1(),
    kq6 = eY1();
  Object.assign(in0.prototype, Hm);
  sq6.Dispatcher = in0;
  sq6.Client = wq6;
  sq6.Pool = Eq6;
  sq6.BalancedPool = Uq6;
  sq6.Agent = Nq6;
  sq6.ProxyAgent = $q6;
  sq6.EnvHttpProxyAgent = qq6;
  sq6.RetryAgent = Mq6;
  sq6.RetryHandler = Sq6;
  sq6.DecoratorHandler = jq6;
  sq6.RedirectHandler = yq6;
  sq6.createRedirectInterceptor = kq6;
  sq6.interceptors = {
    redirect: mc0(),
    retry: uc0(),
    dump: lc0(),
    dns: rc0()
  };
  sq6.buildConnector = Lq6;
  sq6.errors = nn0;
  sq6.util = {
    parseHeaders: eW1.parseHeaders,
    headerNameToString: eW1.headerNameToString
  };

  function yo(A) {
    return (B, Q, I) => {
      if (typeof Q === "function") I = Q, Q = null;
      if (!B || typeof B !== "string" && typeof B !== "object" && !(B instanceof URL)) throw new tW1("invalid url");
      if (Q != null && typeof Q !== "object") throw new tW1("invalid opts");
      if (Q && Q.path != null) {
        if (typeof Q.path !== "string") throw new tW1("invalid opts.path");
        let D = Q.path;
        if (!Q.path.startsWith("/")) D = `/${D}`;
        B = new URL(eW1.parseOrigin(B).origin + D)
      } else {
        if (!Q) Q = typeof B === "object" ? B : {};
        B = eW1.parseURL(B)
      }
      let {
        agent: G,
        dispatcher: Z = an0()
      } = Q;
      if (G) throw new tW1("unsupported opts.agent. Did you mean opts.client?");
      return A.call(Z, {
        ...Q,
        origin: B.origin,
        path: B.search ? `${B.pathname}${B.search}` : B.pathname,
        method: Q.method || (Q.body ? "PUT" : "GET")
      }, I)
    }
  }
  sq6.setGlobalDispatcher = _q6;
  sq6.getGlobalDispatcher = an0;
  var xq6 = wo().fetch;
  sq6.fetch = async function A(B, Q = void 0) {
    try {
      return await xq6(B, Q)
    } catch (I) {
      if (I && typeof I === "object") Error.captureStackTrace(I);
      throw I
    }
  };
  sq6.Headers = $j().Headers;
  sq6.Response = Ho().Response;
  sq6.Request = Im().Request;
  sq6.FormData = mr().FormData;
  sq6.File = globalThis.File ?? Z1("node:buffer").File;
  sq6.FileReader = Vi0().FileReader;
  var {
    setGlobalOrigin: fq6,
    getGlobalOrigin: vq6
  } = ku1();
  sq6.setGlobalOrigin = fq6;
  sq6.getGlobalOrigin = vq6;
  var {
    CacheStorage: bq6
  } = $i0(), {
    kConstruct: gq6
  } = gW1();
  sq6.caches = new bq6(gq6);
  var {
    deleteCookie: hq6,
    getCookies: mq6,
    getSetCookies: dq6,
    setCookie: uq6
  } = ki0();
  sq6.deleteCookie = hq6;
  sq6.getCookies = mq6;
  sq6.getSetCookies = dq6;
  sq6.setCookie = uq6;
  var {
    parseMIMEType: pq6,
    serializeAMimeType: cq6
  } = nY();
  sq6.parseMIMEType = pq6;
  sq6.serializeAMimeType = cq6;
  var {
    CloseEvent: lq6,
    ErrorEvent: iq6,
    MessageEvent: nq6
  } = Jm();
  sq6.WebSocket = jn0().WebSocket;
  sq6.CloseEvent = lq6;
  sq6.ErrorEvent = iq6;
  sq6.MessageEvent = nq6;
  sq6.request = yo(Hm.request);
  sq6.stream = yo(Hm.stream);
  sq6.pipeline = yo(Hm.pipeline);
  sq6.connect = yo(Hm.connect);
  sq6.upgrade = yo(Hm.upgrade);
  sq6.MockClient = Rq6;
  sq6.MockPool = Tq6;
  sq6.MockAgent = Oq6;
  sq6.mockErrors = Pq6;
  var {
    EventSource: aq6
  } = ln0();
  sq6.EventSource = aq6
})
// @from(Start 5724625, End 5724731)
Ia0 = z((NT8, Qa0) => {
  var rM6 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  Qa0.exports = rM6
})
// @from(Start 5724737, End 5725704)
Ya0 = z(($T8, Da0) => {
  var oM6 = Ia0();

  function Ga0() {}

  function Za0() {}
  Za0.resetWarningCache = Ga0;
  Da0.exports = function() {
    function A(I, G, Z, D, Y, W) {
      if (W === oM6) return;
      var J = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      throw J.name = "Invariant Violation", J
    }
    A.isRequired = A;

    function B() {
      return A
    }
    var Q = {
      array: A,
      bigint: A,
      bool: A,
      func: A,
      number: A,
      object: A,
      string: A,
      symbol: A,
      any: A,
      arrayOf: B,
      element: A,
      elementType: A,
      instanceOf: B,
      node: A,
      objectOf: B,
      oneOf: B,
      oneOfType: B,
      shape: B,
      exact: B,
      checkPropTypes: Za0,
      resetWarningCache: Ga0
    };
    return Q.PropTypes = Q, Q
  }
})
// @from(Start 5725710, End 5725776)
Ja0 = z((qT8, Wa0) => {
  Wa0.exports = Ya0()();
  var tM6, eM6
})
// @from(Start 5725782, End 5727932)
Ka0 = z((LT8, Ca0) => {
  var AL6 = Z1("os"),
    Va0 = Z1("tty"),
    pX = Sl(),
    {
      env: SI
    } = process,
    uR;
  if (pX("no-color") || pX("no-colors") || pX("color=false") || pX("color=never")) uR = 0;
  else if (pX("color") || pX("colors") || pX("color=true") || pX("color=always")) uR = 1;
  if ("FORCE_COLOR" in SI)
    if (SI.FORCE_COLOR === "true") uR = 1;
    else if (SI.FORCE_COLOR === "false") uR = 0;
  else uR = SI.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(SI.FORCE_COLOR, 10), 3);

  function _c1(A) {
    if (A === 0) return !1;
    return {
      level: A,
      hasBasic: !0,
      has256: A >= 2,
      has16m: A >= 3
    }
  }

  function jc1(A, B) {
    if (uR === 0) return 0;
    if (pX("color=16m") || pX("color=full") || pX("color=truecolor")) return 3;
    if (pX("color=256")) return 2;
    if (A && !B && uR === void 0) return 0;
    let Q = uR || 0;
    if (SI.TERM === "dumb") return Q;
    if (process.platform === "win32") {
      let I = AL6.release().split(".");
      if (Number(I[0]) >= 10 && Number(I[2]) >= 10586) return Number(I[2]) >= 14931 ? 3 : 2;
      return 1
    }
    if ("CI" in SI) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((I) => (I in SI)) || SI.CI_NAME === "codeship") return 1;
      return Q
    }
    if ("TEAMCITY_VERSION" in SI) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(SI.TEAMCITY_VERSION) ? 1 : 0;
    if (SI.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in SI) {
      let I = parseInt((SI.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (SI.TERM_PROGRAM) {
        case "iTerm.app":
          return I >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2
      }
    }
    if (/-256(color)?$/i.test(SI.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(SI.TERM)) return 1;
    if ("COLORTERM" in SI) return 1;
    return Q
  }

  function BL6(A) {
    let B = jc1(A, A && A.isTTY);
    return _c1(B)
  }
  Ca0.exports = {
    supportsColor: BL6,
    stdout: _c1(jc1(!0, Va0.isatty(1))),
    stderr: _c1(jc1(!0, Va0.isatty(2)))
  }
})
// @from(Start 5727938, End 5729604)
wa0 = z((RT8, za0) => {
  var QL6 = Ka0(),
    wm = Sl();

  function Ha0(A) {
    if (/^\d{3,4}$/.test(A)) {
      let Q = /(\d{1,2})(\d{2})/.exec(A);
      return {
        major: 0,
        minor: parseInt(Q[1], 10),
        patch: parseInt(Q[2], 10)
      }
    }
    let B = (A || "").split(".").map((Q) => parseInt(Q, 10));
    return {
      major: B[0],
      minor: B[1],
      patch: B[2]
    }
  }

  function yc1(A) {
    let {
      env: B
    } = process;
    if ("FORCE_HYPERLINK" in B) return !(B.FORCE_HYPERLINK.length > 0 && parseInt(B.FORCE_HYPERLINK, 10) === 0);
    if (wm("no-hyperlink") || wm("no-hyperlinks") || wm("hyperlink=false") || wm("hyperlink=never")) return !1;
    if (wm("hyperlink=true") || wm("hyperlink=always")) return !0;
    if ("NETLIFY" in B) return !0;
    if (!QL6.supportsColor(A)) return !1;
    if (A && !A.isTTY) return !1;
    if (process.platform === "win32") return !1;
    if ("CI" in B) return !1;
    if ("TEAMCITY_VERSION" in B) return !1;
    if ("TERM_PROGRAM" in B) {
      let Q = Ha0(B.TERM_PROGRAM_VERSION);
      switch (B.TERM_PROGRAM) {
        case "iTerm.app":
          if (Q.major === 3) return Q.minor >= 1;
          return Q.major > 3;
        case "WezTerm":
          return Q.major >= 20200620;
        case "vscode":
          return Q.major > 1 || Q.major === 1 && Q.minor >= 72
      }
    }
    if ("VTE_VERSION" in B) {
      if (B.VTE_VERSION === "0.50.0") return !1;
      let Q = Ha0(B.VTE_VERSION);
      return Q.major > 0 || Q.minor >= 50
    }
    return !1
  }
  za0.exports = {
    supportsHyperlink: yc1,
    stdout: yc1(process.stdout),
    stderr: yc1(process.stderr)
  }
})
// @from(Start 5729610, End 5730314)
Lr0 = z((ax8, Mr0) => {
  Mr0.exports = qr0;
  qr0.sync = fR6;
  var Nr0 = Z1("fs");

  function xR6(A, B) {
    var Q = B.pathExt !== void 0 ? B.pathExt : process.env.PATHEXT;
    if (!Q) return !0;
    if (Q = Q.split(";"), Q.indexOf("") !== -1) return !0;
    for (var I = 0; I < Q.length; I++) {
      var G = Q[I].toLowerCase();
      if (G && A.substr(-G.length).toLowerCase() === G) return !0
    }
    return !1
  }

  function $r0(A, B, Q) {
    if (!A.isSymbolicLink() && !A.isFile()) return !1;
    return xR6(B, Q)
  }

  function qr0(A, B, Q) {
    Nr0.stat(A, function(I, G) {
      Q(I, I ? !1 : $r0(G, A, B))
    })
  }

  function fR6(A, B) {
    return $r0(Nr0.statSync(A), A, B)
  }
})
// @from(Start 5730320, End 5731027)
Sr0 = z((sx8, Pr0) => {
  Pr0.exports = Or0;
  Or0.sync = vR6;
  var Rr0 = Z1("fs");

  function Or0(A, B, Q) {
    Rr0.stat(A, function(I, G) {
      Q(I, I ? !1 : Tr0(G, B))
    })
  }

  function vR6(A, B) {
    return Tr0(Rr0.statSync(A), B)
  }

  function Tr0(A, B) {
    return A.isFile() && bR6(A, B)
  }

  function bR6(A, B) {
    var {
      mode: Q,
      uid: I,
      gid: G
    } = A, Z = B.uid !== void 0 ? B.uid : process.getuid && process.getuid(), D = B.gid !== void 0 ? B.gid : process.getgid && process.getgid(), Y = parseInt("100", 8), W = parseInt("010", 8), J = parseInt("001", 8), F = Y | W, X = Q & J || Q & W && G === D || Q & Y && I === Z || Q & F && Z === 0;
    return X
  }
})
// @from(Start 5731033, End 5731890)
jr0 = z((ox8, _r0) => {
  var rx8 = Z1("fs"),
    GF1;
  if (process.platform === "win32" || global.TESTING_WINDOWS) GF1 = Lr0();
  else GF1 = Sr0();
  _r0.exports = Rl1;
  Rl1.sync = gR6;

  function Rl1(A, B, Q) {
    if (typeof B === "function") Q = B, B = {};
    if (!Q) {
      if (typeof Promise !== "function") throw new TypeError("callback not provided");
      return new Promise(function(I, G) {
        Rl1(A, B || {}, function(Z, D) {
          if (Z) G(Z);
          else I(D)
        })
      })
    }
    GF1(A, B || {}, function(I, G) {
      if (I) {
        if (I.code === "EACCES" || B && B.ignoreErrors) I = null, G = !1
      }
      Q(I, G)
    })
  }

  function gR6(A, B) {
    try {
      return GF1.sync(A, B || {})
    } catch (Q) {
      if (B && B.ignoreErrors || Q.code === "EACCES") return !1;
      else throw Q
    }
  }
})
// @from(Start 5731896, End 5734340)
gr0 = z((tx8, br0) => {
  var jm = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys",
    yr0 = Z1("path"),
    hR6 = jm ? ";" : ":",
    kr0 = jr0(),
    xr0 = (A) => Object.assign(new Error(`not found: ${A}`), {
      code: "ENOENT"
    }),
    fr0 = (A, B) => {
      let Q = B.colon || hR6,
        I = A.match(/\//) || jm && A.match(/\\/) ? [""] : [...jm ? [process.cwd()] : [], ...(B.path || process.env.PATH || "").split(Q)],
        G = jm ? B.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "",
        Z = jm ? G.split(Q) : [""];
      if (jm) {
        if (A.indexOf(".") !== -1 && Z[0] !== "") Z.unshift("")
      }
      return {
        pathEnv: I,
        pathExt: Z,
        pathExtExe: G
      }
    },
    vr0 = (A, B, Q) => {
      if (typeof B === "function") Q = B, B = {};
      if (!B) B = {};
      let {
        pathEnv: I,
        pathExt: G,
        pathExtExe: Z
      } = fr0(A, B), D = [], Y = (J) => new Promise((F, X) => {
        if (J === I.length) return B.all && D.length ? F(D) : X(xr0(A));
        let V = I[J],
          C = /^".*"$/.test(V) ? V.slice(1, -1) : V,
          K = yr0.join(C, A),
          E = !C && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + K : K;
        F(W(E, J, 0))
      }), W = (J, F, X) => new Promise((V, C) => {
        if (X === G.length) return V(Y(F + 1));
        let K = G[X];
        kr0(J + K, {
          pathExt: Z
        }, (E, N) => {
          if (!E && N)
            if (B.all) D.push(J + K);
            else return V(J + K);
          return V(W(J, F, X + 1))
        })
      });
      return Q ? Y(0).then((J) => Q(null, J), Q) : Y(0)
    },
    mR6 = (A, B) => {
      B = B || {};
      let {
        pathEnv: Q,
        pathExt: I,
        pathExtExe: G
      } = fr0(A, B), Z = [];
      for (let D = 0; D < Q.length; D++) {
        let Y = Q[D],
          W = /^".*"$/.test(Y) ? Y.slice(1, -1) : Y,
          J = yr0.join(W, A),
          F = !W && /^\.[\\\/]/.test(A) ? A.slice(0, 2) + J : J;
        for (let X = 0; X < I.length; X++) {
          let V = F + I[X];
          try {
            if (kr0.sync(V, {
                pathExt: G
              }))
              if (B.all) Z.push(V);
              else return V
          } catch (C) {}
        }
      }
      if (B.all && Z.length) return Z;
      if (B.nothrow) return null;
      throw xr0(A)
    };
  br0.exports = vr0;
  vr0.sync = mR6
})
// @from(Start 5734346, End 5734641)
mr0 = z((ex8, Ol1) => {
  var hr0 = (A = {}) => {
    let B = A.env || process.env;
    if ((A.platform || process.platform) !== "win32") return "PATH";
    return Object.keys(B).reverse().find((I) => I.toUpperCase() === "PATH") || "Path"
  };
  Ol1.exports = hr0;
  Ol1.exports.default = hr0
})
// @from(Start 5734647, End 5735366)
cr0 = z((Af8, pr0) => {
  var dr0 = Z1("path"),
    dR6 = gr0(),
    uR6 = mr0();

  function ur0(A, B) {
    let Q = A.options.env || process.env,
      I = process.cwd(),
      G = A.options.cwd != null,
      Z = G && process.chdir !== void 0 && !process.chdir.disabled;
    if (Z) try {
      process.chdir(A.options.cwd)
    } catch (Y) {}
    let D;
    try {
      D = dR6.sync(A.command, {
        path: Q[uR6({
          env: Q
        })],
        pathExt: B ? dr0.delimiter : void 0
      })
    } catch (Y) {} finally {
      if (Z) process.chdir(I)
    }
    if (D) D = dr0.resolve(G ? A.options.cwd : "", D);
    return D
  }

  function pR6(A) {
    return ur0(A) || ur0(A, !0)
  }
  pr0.exports = pR6
})
// @from(Start 5735372, End 5735764)
lr0 = z((iR6, Pl1) => {
  var Tl1 = /([()\][%!^"`<>&|;, *?])/g;

  function cR6(A) {
    return A = A.replace(Tl1, "^$1"), A
  }

  function lR6(A, B) {
    if (A = `${A}`, A = A.replace(/(?=(\\+?)?)\1"/g, "$1$1\\\""), A = A.replace(/(?=(\\+?)?)\1$/, "$1$1"), A = `"${A}"`, A = A.replace(Tl1, "^$1"), B) A = A.replace(Tl1, "^$1");
    return A
  }
  iR6.command = cR6;
  iR6.argument = lR6
})
// @from(Start 5735770, End 5735822)
nr0 = z((Bf8, ir0) => {
  ir0.exports = /^#!(.*)/
})
// @from(Start 5735828, End 5736098)
sr0 = z((Qf8, ar0) => {
  var sR6 = nr0();
  ar0.exports = (A = "") => {
    let B = A.match(sR6);
    if (!B) return null;
    let [Q, I] = B[0].replace(/#! ?/, "").split(" "), G = Q.split("/").pop();
    if (G === "env") return I;
    return I ? `${G} ${I}` : G
  }
})
// @from(Start 5736104, End 5736392)
or0 = z((If8, rr0) => {
  var Sl1 = Z1("fs"),
    rR6 = sr0();

  function oR6(A) {
    let Q = Buffer.alloc(150),
      I;
    try {
      I = Sl1.openSync(A, "r"), Sl1.readSync(I, Q, 0, 150, 0), Sl1.closeSync(I)
    } catch (G) {}
    return rR6(Q.toString())
  }
  rr0.exports = oR6
})
// @from(Start 5736398, End 5737614)
Bo0 = z((Gf8, Ao0) => {
  var tR6 = Z1("path"),
    tr0 = cr0(),
    er0 = lr0(),
    eR6 = or0(),
    AO6 = process.platform === "win32",
    BO6 = /\.(?:com|exe)$/i,
    QO6 = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

  function IO6(A) {
    A.file = tr0(A);
    let B = A.file && eR6(A.file);
    if (B) return A.args.unshift(A.file), A.command = B, tr0(A);
    return A.file
  }

  function GO6(A) {
    if (!AO6) return A;
    let B = IO6(A),
      Q = !BO6.test(B);
    if (A.options.forceShell || Q) {
      let I = QO6.test(B);
      A.command = tR6.normalize(A.command), A.command = er0.command(A.command), A.args = A.args.map((Z) => er0.argument(Z, I));
      let G = [A.command].concat(A.args).join(" ");
      A.args = ["/d", "/s", "/c", `"${G}"`], A.command = process.env.comspec || "cmd.exe", A.options.windowsVerbatimArguments = !0
    }
    return A
  }

  function ZO6(A, B, Q) {
    if (B && !Array.isArray(B)) Q = B, B = null;
    B = B ? B.slice(0) : [], Q = Object.assign({}, Q);
    let I = {
      command: A,
      args: B,
      options: Q,
      file: void 0,
      original: {
        command: A,
        args: B
      }
    };
    return Q.shell ? I : GO6(I)
  }
  Ao0.exports = ZO6
})
// @from(Start 5737620, End 5738513)
Go0 = z((Zf8, Io0) => {
  var _l1 = process.platform === "win32";

  function jl1(A, B) {
    return Object.assign(new Error(`${B} ${A.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${B} ${A.command}`,
      path: A.command,
      spawnargs: A.args
    })
  }

  function DO6(A, B) {
    if (!_l1) return;
    let Q = A.emit;
    A.emit = function(I, G) {
      if (I === "exit") {
        let Z = Qo0(G, B);
        if (Z) return Q.call(A, "error", Z)
      }
      return Q.apply(A, arguments)
    }
  }

  function Qo0(A, B) {
    if (_l1 && A === 1 && !B.file) return jl1(B.original, "spawn");
    return null
  }

  function YO6(A, B) {
    if (_l1 && A === 1 && !B.file) return jl1(B.original, "spawnSync");
    return null
  }
  Io0.exports = {
    hookChildProcess: DO6,
    verifyENOENT: Qo0,
    verifyENOENTSync: YO6,
    notFoundError: jl1
  }
})
// @from(Start 5738519, End 5739066)
Yo0 = z((Df8, ym) => {
  var Zo0 = Z1("child_process"),
    yl1 = Bo0(),
    kl1 = Go0();

  function Do0(A, B, Q) {
    let I = yl1(A, B, Q),
      G = Zo0.spawn(I.command, I.args, I.options);
    return kl1.hookChildProcess(G, I), G
  }

  function WO6(A, B, Q) {
    let I = yl1(A, B, Q),
      G = Zo0.spawnSync(I.command, I.args, I.options);
    return G.error = G.error || kl1.verifyENOENTSync(G.status, I), G
  }
  ym.exports = Do0;
  ym.exports.spawn = Do0;
  ym.exports.sync = WO6;
  ym.exports._parse = yl1;
  ym.exports._enoent = kl1
})
// @from(Start 5739072, End 5739488)
Mt = z((ff8, zo0) => {
  var PO6 = Number.MAX_SAFE_INTEGER || 9007199254740991,
    SO6 = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
  zo0.exports = {
    MAX_LENGTH: 256,
    MAX_SAFE_COMPONENT_LENGTH: 16,
    MAX_SAFE_BUILD_LENGTH: 250,
    MAX_SAFE_INTEGER: PO6,
    RELEASE_TYPES: SO6,
    SEMVER_SPEC_VERSION: "2.0.0",
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }
})
// @from(Start 5739494, End 5739720)
Lt = z((vf8, wo0) => {
  var _O6 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...A) => console.error("SEMVER", ...A) : () => {};
  wo0.exports = _O6
})
// @from(Start 5739726, End 5743786)
hm = z((vw, Eo0) => {
  var {
    MAX_SAFE_COMPONENT_LENGTH: el1,
    MAX_SAFE_BUILD_LENGTH: jO6,
    MAX_LENGTH: yO6
  } = Mt(), kO6 = Lt();
  vw = Eo0.exports = {};
  var xO6 = vw.re = [],
    fO6 = vw.safeRe = [],
    S2 = vw.src = [],
    vO6 = vw.safeSrc = [],
    _2 = vw.t = {},
    bO6 = 0,
    Ai1 = "[a-zA-Z0-9-]",
    gO6 = [
      ["\\s", 1],
      ["\\d", yO6],
      [Ai1, jO6]
    ],
    hO6 = (A) => {
      for (let [B, Q] of gO6) A = A.split(`${B}*`).join(`${B}{0,${Q}}`).split(`${B}+`).join(`${B}{1,${Q}}`);
      return A
    },
    v4 = (A, B, Q) => {
      let I = hO6(B),
        G = bO6++;
      kO6(A, G, B), _2[A] = G, S2[G] = B, vO6[G] = I, xO6[G] = new RegExp(B, Q ? "g" : void 0), fO6[G] = new RegExp(I, Q ? "g" : void 0)
    };
  v4("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  v4("NUMERICIDENTIFIERLOOSE", "\\d+");
  v4("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${Ai1}*`);
  v4("MAINVERSION", `(${S2[_2.NUMERICIDENTIFIER]})\\.(${S2[_2.NUMERICIDENTIFIER]})\\.(${S2[_2.NUMERICIDENTIFIER]})`);
  v4("MAINVERSIONLOOSE", `(${S2[_2.NUMERICIDENTIFIERLOOSE]})\\.(${S2[_2.NUMERICIDENTIFIERLOOSE]})\\.(${S2[_2.NUMERICIDENTIFIERLOOSE]})`);
  v4("PRERELEASEIDENTIFIER", `(?:${S2[_2.NUMERICIDENTIFIER]}|${S2[_2.NONNUMERICIDENTIFIER]})`);
  v4("PRERELEASEIDENTIFIERLOOSE", `(?:${S2[_2.NUMERICIDENTIFIERLOOSE]}|${S2[_2.NONNUMERICIDENTIFIER]})`);
  v4("PRERELEASE", `(?:-(${S2[_2.PRERELEASEIDENTIFIER]}(?:\\.${S2[_2.PRERELEASEIDENTIFIER]})*))`);
  v4("PRERELEASELOOSE", `(?:-?(${S2[_2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${S2[_2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  v4("BUILDIDENTIFIER", `${Ai1}+`);
  v4("BUILD", `(?:\\+(${S2[_2.BUILDIDENTIFIER]}(?:\\.${S2[_2.BUILDIDENTIFIER]})*))`);
  v4("FULLPLAIN", `v?${S2[_2.MAINVERSION]}${S2[_2.PRERELEASE]}?${S2[_2.BUILD]}?`);
  v4("FULL", `^${S2[_2.FULLPLAIN]}$`);
  v4("LOOSEPLAIN", `[v=\\s]*${S2[_2.MAINVERSIONLOOSE]}${S2[_2.PRERELEASELOOSE]}?${S2[_2.BUILD]}?`);
  v4("LOOSE", `^${S2[_2.LOOSEPLAIN]}$`);
  v4("GTLT", "((?:<|>)?=?)");
  v4("XRANGEIDENTIFIERLOOSE", `${S2[_2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  v4("XRANGEIDENTIFIER", `${S2[_2.NUMERICIDENTIFIER]}|x|X|\\*`);
  v4("XRANGEPLAIN", `[v=\\s]*(${S2[_2.XRANGEIDENTIFIER]})(?:\\.(${S2[_2.XRANGEIDENTIFIER]})(?:\\.(${S2[_2.XRANGEIDENTIFIER]})(?:${S2[_2.PRERELEASE]})?${S2[_2.BUILD]}?)?)?`);
  v4("XRANGEPLAINLOOSE", `[v=\\s]*(${S2[_2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${S2[_2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${S2[_2.XRANGEIDENTIFIERLOOSE]})(?:${S2[_2.PRERELEASELOOSE]})?${S2[_2.BUILD]}?)?)?`);
  v4("XRANGE", `^${S2[_2.GTLT]}\\s*${S2[_2.XRANGEPLAIN]}$`);
  v4("XRANGELOOSE", `^${S2[_2.GTLT]}\\s*${S2[_2.XRANGEPLAINLOOSE]}$`);
  v4("COERCEPLAIN", `(^|[^\\d])(\\d{1,${el1}})(?:\\.(\\d{1,${el1}}))?(?:\\.(\\d{1,${el1}}))?`);
  v4("COERCE", `${S2[_2.COERCEPLAIN]}(?:$|[^\\d])`);
  v4("COERCEFULL", S2[_2.COERCEPLAIN] + `(?:${S2[_2.PRERELEASE]})?(?:${S2[_2.BUILD]})?(?:$|[^\\d])`);
  v4("COERCERTL", S2[_2.COERCE], !0);
  v4("COERCERTLFULL", S2[_2.COERCEFULL], !0);
  v4("LONETILDE", "(?:~>?)");
  v4("TILDETRIM", `(\\s*)${S2[_2.LONETILDE]}\\s+`, !0);
  vw.tildeTrimReplace = "$1~";
  v4("TILDE", `^${S2[_2.LONETILDE]}${S2[_2.XRANGEPLAIN]}$`);
  v4("TILDELOOSE", `^${S2[_2.LONETILDE]}${S2[_2.XRANGEPLAINLOOSE]}$`);
  v4("LONECARET", "(?:\\^)");
  v4("CARETTRIM", `(\\s*)${S2[_2.LONECARET]}\\s+`, !0);
  vw.caretTrimReplace = "$1^";
  v4("CARET", `^${S2[_2.LONECARET]}${S2[_2.XRANGEPLAIN]}$`);
  v4("CARETLOOSE", `^${S2[_2.LONECARET]}${S2[_2.XRANGEPLAINLOOSE]}$`);
  v4("COMPARATORLOOSE", `^${S2[_2.GTLT]}\\s*(${S2[_2.LOOSEPLAIN]})$|^$`);
  v4("COMPARATOR", `^${S2[_2.GTLT]}\\s*(${S2[_2.FULLPLAIN]})$|^$`);
  v4("COMPARATORTRIM", `(\\s*)${S2[_2.GTLT]}\\s*(${S2[_2.LOOSEPLAIN]}|${S2[_2.XRANGEPLAIN]})`, !0);
  vw.comparatorTrimReplace = "$1$2$3";
  v4("HYPHENRANGE", `^\\s*(${S2[_2.XRANGEPLAIN]})\\s+-\\s+(${S2[_2.XRANGEPLAIN]})\\s*$`);
  v4("HYPHENRANGELOOSE", `^\\s*(${S2[_2.XRANGEPLAINLOOSE]})\\s+-\\s+(${S2[_2.XRANGEPLAINLOOSE]})\\s*$`);
  v4("STAR", "(<|>)?=?\\s*\\*");
  v4("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  v4("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$")
})
// @from(Start 5743792, End 5744031)
VF1 = z((bf8, Uo0) => {
  var mO6 = Object.freeze({
      loose: !0
    }),
    dO6 = Object.freeze({}),
    uO6 = (A) => {
      if (!A) return dO6;
      if (typeof A !== "object") return mO6;
      return A
    };
  Uo0.exports = uO6
})
// @from(Start 5744037, End 5744384)
Bi1 = z((gf8, qo0) => {
  var No0 = /^[0-9]+$/,
    $o0 = (A, B) => {
      let Q = No0.test(A),
        I = No0.test(B);
      if (Q && I) A = +A, B = +B;
      return A === B ? 0 : Q && !I ? -1 : I && !Q ? 1 : A < B ? -1 : 1
    },
    pO6 = (A, B) => $o0(B, A);
  qo0.exports = {
    compareIdentifiers: $o0,
    rcompareIdentifiers: pO6
  }
})
// @from(Start 5744390, End 5750451)
gZ = z((hf8, Oo0) => {
  var CF1 = Lt(),
    {
      MAX_LENGTH: Mo0,
      MAX_SAFE_INTEGER: KF1
    } = Mt(),
    {
      safeRe: Lo0,
      safeSrc: Ro0,
      t: HF1
    } = hm(),
    cO6 = VF1(),
    {
      compareIdentifiers: mm
    } = Bi1();
  class CK {
    constructor(A, B) {
      if (B = cO6(B), A instanceof CK)
        if (A.loose === !!B.loose && A.includePrerelease === !!B.includePrerelease) return A;
        else A = A.version;
      else if (typeof A !== "string") throw new TypeError(`Invalid version. Must be a string. Got type "${typeof A}".`);
      if (A.length > Mo0) throw new TypeError(`version is longer than ${Mo0} characters`);
      CF1("SemVer", A, B), this.options = B, this.loose = !!B.loose, this.includePrerelease = !!B.includePrerelease;
      let Q = A.trim().match(B.loose ? Lo0[HF1.LOOSE] : Lo0[HF1.FULL]);
      if (!Q) throw new TypeError(`Invalid Version: ${A}`);
      if (this.raw = A, this.major = +Q[1], this.minor = +Q[2], this.patch = +Q[3], this.major > KF1 || this.major < 0) throw new TypeError("Invalid major version");
      if (this.minor > KF1 || this.minor < 0) throw new TypeError("Invalid minor version");
      if (this.patch > KF1 || this.patch < 0) throw new TypeError("Invalid patch version");
      if (!Q[4]) this.prerelease = [];
      else this.prerelease = Q[4].split(".").map((I) => {
        if (/^[0-9]+$/.test(I)) {
          let G = +I;
          if (G >= 0 && G < KF1) return G
        }
        return I
      });
      this.build = Q[5] ? Q[5].split(".") : [], this.format()
    }
    format() {
      if (this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length) this.version += `-${this.prerelease.join(".")}`;
      return this.version
    }
    toString() {
      return this.version
    }
    compare(A) {
      if (CF1("SemVer.compare", this.version, this.options, A), !(A instanceof CK)) {
        if (typeof A === "string" && A === this.version) return 0;
        A = new CK(A, this.options)
      }
      if (A.version === this.version) return 0;
      return this.compareMain(A) || this.comparePre(A)
    }
    compareMain(A) {
      if (!(A instanceof CK)) A = new CK(A, this.options);
      return mm(this.major, A.major) || mm(this.minor, A.minor) || mm(this.patch, A.patch)
    }
    comparePre(A) {
      if (!(A instanceof CK)) A = new CK(A, this.options);
      if (this.prerelease.length && !A.prerelease.length) return -1;
      else if (!this.prerelease.length && A.prerelease.length) return 1;
      else if (!this.prerelease.length && !A.prerelease.length) return 0;
      let B = 0;
      do {
        let Q = this.prerelease[B],
          I = A.prerelease[B];
        if (CF1("prerelease compare", B, Q, I), Q === void 0 && I === void 0) return 0;
        else if (I === void 0) return 1;
        else if (Q === void 0) return -1;
        else if (Q === I) continue;
        else return mm(Q, I)
      } while (++B)
    }
    compareBuild(A) {
      if (!(A instanceof CK)) A = new CK(A, this.options);
      let B = 0;
      do {
        let Q = this.build[B],
          I = A.build[B];
        if (CF1("build compare", B, Q, I), Q === void 0 && I === void 0) return 0;
        else if (I === void 0) return 1;
        else if (Q === void 0) return -1;
        else if (Q === I) continue;
        else return mm(Q, I)
      } while (++B)
    }
    inc(A, B, Q) {
      if (A.startsWith("pre")) {
        if (!B && Q === !1) throw new Error("invalid increment argument: identifier is empty");
        if (B) {
          let I = new RegExp(`^${this.options.loose?Ro0[HF1.PRERELEASELOOSE]:Ro0[HF1.PRERELEASE]}$`),
            G = `-${B}`.match(I);
          if (!G || G[1] !== B) throw new Error(`invalid identifier: ${B}`)
        }
      }
      switch (A) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", B, Q);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", B, Q);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", B, Q), this.inc("pre", B, Q);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) this.inc("patch", B, Q);
          this.inc("pre", B, Q);
          break;
        case "release":
          if (this.prerelease.length === 0) throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
          this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
          this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) this.patch++;
          this.prerelease = [];
          break;
        case "pre": {
          let I = Number(Q) ? 1 : 0;
          if (this.prerelease.length === 0) this.prerelease = [I];
          else {
            let G = this.prerelease.length;
            while (--G >= 0)
              if (typeof this.prerelease[G] === "number") this.prerelease[G]++, G = -2;
            if (G === -1) {
              if (B === this.prerelease.join(".") && Q === !1) throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(I)
            }
          }
          if (B) {
            let G = [B, I];
            if (Q === !1) G = [B];
            if (mm(this.prerelease[0], B) === 0) {
              if (isNaN(this.prerelease[1])) this.prerelease = G
            } else this.prerelease = G
          }
          break
        }
        default:
          throw new Error(`invalid increment argument: ${A}`)
      }
      if (this.raw = this.format(), this.build.length) this.raw += `+${this.build.join(".")}`;
      return this
    }
  }
  Oo0.exports = CK
})
// @from(Start 5750457, End 5750709)
bj = z((mf8, Po0) => {
  var To0 = gZ(),
    lO6 = (A, B, Q = !1) => {
      if (A instanceof To0) return A;
      try {
        return new To0(A, B)
      } catch (I) {
        if (!Q) return null;
        throw I
      }
    };
  Po0.exports = lO6
})
// @from(Start 5750715, End 5750867)
_o0 = z((df8, So0) => {
  var iO6 = bj(),
    nO6 = (A, B) => {
      let Q = iO6(A, B);
      return Q ? Q.version : null
    };
  So0.exports = nO6
})
// @from(Start 5750873, End 5751054)
yo0 = z((uf8, jo0) => {
  var aO6 = bj(),
    sO6 = (A, B) => {
      let Q = aO6(A.trim().replace(/^[=v]+/, ""), B);
      return Q ? Q.version : null
    };
  jo0.exports = sO6
})
// @from(Start 5751060, End 5751362)
fo0 = z((pf8, xo0) => {
  var ko0 = gZ(),
    rO6 = (A, B, Q, I, G) => {
      if (typeof Q === "string") G = I, I = Q, Q = void 0;
      try {
        return new ko0(A instanceof ko0 ? A.version : A, Q).inc(B, I, G).version
      } catch (Z) {
        return null
      }
    };
  xo0.exports = rO6
})
// @from(Start 5751368, End 5752115)
go0 = z((cf8, bo0) => {
  var vo0 = bj(),
    oO6 = (A, B) => {
      let Q = vo0(A, null, !0),
        I = vo0(B, null, !0),
        G = Q.compare(I);
      if (G === 0) return null;
      let Z = G > 0,
        D = Z ? Q : I,
        Y = Z ? I : Q,
        W = !!D.prerelease.length;
      if (!!Y.prerelease.length && !W) {
        if (!Y.patch && !Y.minor) return "major";
        if (Y.compareMain(D) === 0) {
          if (Y.minor && !Y.patch) return "minor";
          return "patch"
        }
      }
      let F = W ? "pre" : "";
      if (Q.major !== I.major) return F + "major";
      if (Q.minor !== I.minor) return F + "minor";
      if (Q.patch !== I.patch) return F + "patch";
      return "prerelease"
    };
  bo0.exports = oO6
})
// @from(Start 5752121, End 5752226)
mo0 = z((lf8, ho0) => {
  var tO6 = gZ(),
    eO6 = (A, B) => new tO6(A, B).major;
  ho0.exports = eO6
})
// @from(Start 5752232, End 5752337)
uo0 = z((if8, do0) => {
  var AT6 = gZ(),
    BT6 = (A, B) => new AT6(A, B).minor;
  do0.exports = BT6
})
// @from(Start 5752343, End 5752448)
co0 = z((nf8, po0) => {
  var QT6 = gZ(),
    IT6 = (A, B) => new QT6(A, B).patch;
  po0.exports = IT6
})
// @from(Start 5752454, End 5752632)
io0 = z((af8, lo0) => {
  var GT6 = bj(),
    ZT6 = (A, B) => {
      let Q = GT6(A, B);
      return Q && Q.prerelease.length ? Q.prerelease : null
    };
  lo0.exports = ZT6
})
// @from(Start 5752638, End 5752762)
sX = z((sf8, ao0) => {
  var no0 = gZ(),
    DT6 = (A, B, Q) => new no0(A, Q).compare(new no0(B, Q));
  ao0.exports = DT6
})
// @from(Start 5752768, End 5752869)
ro0 = z((rf8, so0) => {
  var YT6 = sX(),
    WT6 = (A, B, Q) => YT6(B, A, Q);
  so0.exports = WT6
})
// @from(Start 5752875, End 5752974)
to0 = z((of8, oo0) => {
  var JT6 = sX(),
    FT6 = (A, B) => JT6(A, B, !0);
  oo0.exports = FT6
})
// @from(Start 5752980, End 5753179)
zF1 = z((tf8, At0) => {
  var eo0 = gZ(),
    XT6 = (A, B, Q) => {
      let I = new eo0(A, Q),
        G = new eo0(B, Q);
      return I.compare(G) || I.compareBuild(G)
    };
  At0.exports = XT6
})
// @from(Start 5753185, End 5753302)
Qt0 = z((ef8, Bt0) => {
  var VT6 = zF1(),
    CT6 = (A, B) => A.sort((Q, I) => VT6(Q, I, B));
  Bt0.exports = CT6
})
// @from(Start 5753308, End 5753425)
Gt0 = z((Av8, It0) => {
  var KT6 = zF1(),
    HT6 = (A, B) => A.sort((Q, I) => KT6(I, Q, B));
  It0.exports = HT6
})
// @from(Start 5753431, End 5753535)
Rt = z((Bv8, Zt0) => {
  var zT6 = sX(),
    wT6 = (A, B, Q) => zT6(A, B, Q) > 0;
  Zt0.exports = wT6
})
// @from(Start 5753541, End 5753646)
wF1 = z((Qv8, Dt0) => {
  var ET6 = sX(),
    UT6 = (A, B, Q) => ET6(A, B, Q) < 0;
  Dt0.exports = UT6
})
// @from(Start 5753652, End 5753759)
Qi1 = z((Iv8, Yt0) => {
  var NT6 = sX(),
    $T6 = (A, B, Q) => NT6(A, B, Q) === 0;
  Yt0.exports = $T6
})
// @from(Start 5753765, End 5753872)
Ii1 = z((Gv8, Wt0) => {
  var qT6 = sX(),
    MT6 = (A, B, Q) => qT6(A, B, Q) !== 0;
  Wt0.exports = MT6
})
// @from(Start 5753878, End 5753983)
Ot = z((Zv8, Jt0) => {
  var LT6 = sX(),
    RT6 = (A, B, Q) => LT6(A, B, Q) >= 0;
  Jt0.exports = RT6
})
// @from(Start 5753989, End 5754095)
EF1 = z((Dv8, Ft0) => {
  var OT6 = sX(),
    TT6 = (A, B, Q) => OT6(A, B, Q) <= 0;
  Ft0.exports = TT6
})
// @from(Start 5754101, End 5755017)
Gi1 = z((Yv8, Xt0) => {
  var PT6 = Qi1(),
    ST6 = Ii1(),
    _T6 = Rt(),
    jT6 = Ot(),
    yT6 = wF1(),
    kT6 = EF1(),
    xT6 = (A, B, Q, I) => {
      switch (B) {
        case "===":
          if (typeof A === "object") A = A.version;
          if (typeof Q === "object") Q = Q.version;
          return A === Q;
        case "!==":
          if (typeof A === "object") A = A.version;
          if (typeof Q === "object") Q = Q.version;
          return A !== Q;
        case "":
        case "=":
        case "==":
          return PT6(A, Q, I);
        case "!=":
          return ST6(A, Q, I);
        case ">":
          return _T6(A, Q, I);
        case ">=":
          return jT6(A, Q, I);
        case "<":
          return yT6(A, Q, I);
        case "<=":
          return kT6(A, Q, I);
        default:
          throw new TypeError(`Invalid operator: ${B}`)
      }
    };
  Xt0.exports = xT6
})
// @from(Start 5755023, End 5756084)
Zi1 = z((Wv8, Vt0) => {
  var fT6 = gZ(),
    vT6 = bj(),
    {
      safeRe: UF1,
      t: NF1
    } = hm(),
    bT6 = (A, B) => {
      if (A instanceof fT6) return A;
      if (typeof A === "number") A = String(A);
      if (typeof A !== "string") return null;
      B = B || {};
      let Q = null;
      if (!B.rtl) Q = A.match(B.includePrerelease ? UF1[NF1.COERCEFULL] : UF1[NF1.COERCE]);
      else {
        let W = B.includePrerelease ? UF1[NF1.COERCERTLFULL] : UF1[NF1.COERCERTL],
          J;
        while ((J = W.exec(A)) && (!Q || Q.index + Q[0].length !== A.length)) {
          if (!Q || J.index + J[0].length !== Q.index + Q[0].length) Q = J;
          W.lastIndex = J.index + J[1].length + J[2].length
        }
        W.lastIndex = -1
      }
      if (Q === null) return null;
      let I = Q[2],
        G = Q[3] || "0",
        Z = Q[4] || "0",
        D = B.includePrerelease && Q[5] ? `-${Q[5]}` : "",
        Y = B.includePrerelease && Q[6] ? `+${Q[6]}` : "";
      return vT6(`${I}.${G}.${Z}${D}${Y}`, B)
    };
  Vt0.exports = bT6
})
// @from(Start 5756090, End 5756662)
Ht0 = z((Jv8, Kt0) => {
  class Ct0 {
    constructor() {
      this.max = 1000, this.map = new Map
    }
    get(A) {
      let B = this.map.get(A);
      if (B === void 0) return;
      else return this.map.delete(A), this.map.set(A, B), B
    }
    delete(A) {
      return this.map.delete(A)
    }
    set(A, B) {
      if (!this.delete(A) && B !== void 0) {
        if (this.map.size >= this.max) {
          let I = this.map.keys().next().value;
          this.delete(I)
        }
        this.map.set(A, B)
      }
      return this
    }
  }
  Kt0.exports = Ct0
})
// @from(Start 5756668, End 5765039)
rX = z((Fv8, Ut0) => {
  var gT6 = /\s+/g;
  class Tt {
    constructor(A, B) {
      if (B = mT6(B), A instanceof Tt)
        if (A.loose === !!B.loose && A.includePrerelease === !!B.includePrerelease) return A;
        else return new Tt(A.raw, B);
      if (A instanceof Di1) return this.raw = A.value, this.set = [
        [A]
      ], this.formatted = void 0, this;
      if (this.options = B, this.loose = !!B.loose, this.includePrerelease = !!B.includePrerelease, this.raw = A.trim().replace(gT6, " "), this.set = this.raw.split("||").map((Q) => this.parseRange(Q.trim())).filter((Q) => Q.length), !this.set.length) throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        let Q = this.set[0];
        if (this.set = this.set.filter((I) => !wt0(I[0])), this.set.length === 0) this.set = [Q];
        else if (this.set.length > 1) {
          for (let I of this.set)
            if (I.length === 1 && nT6(I[0])) {
              this.set = [I];
              break
            }
        }
      }
      this.formatted = void 0
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let A = 0; A < this.set.length; A++) {
          if (A > 0) this.formatted += "||";
          let B = this.set[A];
          for (let Q = 0; Q < B.length; Q++) {
            if (Q > 0) this.formatted += " ";
            this.formatted += B[Q].toString().trim()
          }
        }
      }
      return this.formatted
    }
    format() {
      return this.range
    }
    toString() {
      return this.range
    }
    parseRange(A) {
      let Q = ((this.options.includePrerelease && lT6) | (this.options.loose && iT6)) + ":" + A,
        I = zt0.get(Q);
      if (I) return I;
      let G = this.options.loose,
        Z = G ? QW[gD.HYPHENRANGELOOSE] : QW[gD.HYPHENRANGE];
      A = A.replace(Z, IP6(this.options.includePrerelease)), LB("hyphen replace", A), A = A.replace(QW[gD.COMPARATORTRIM], uT6), LB("comparator trim", A), A = A.replace(QW[gD.TILDETRIM], pT6), LB("tilde trim", A), A = A.replace(QW[gD.CARETTRIM], cT6), LB("caret trim", A);
      let D = A.split(" ").map((F) => aT6(F, this.options)).join(" ").split(/\s+/).map((F) => QP6(F, this.options));
      if (G) D = D.filter((F) => {
        return LB("loose invalid filter", F, this.options), !!F.match(QW[gD.COMPARATORLOOSE])
      });
      LB("range list", D);
      let Y = new Map,
        W = D.map((F) => new Di1(F, this.options));
      for (let F of W) {
        if (wt0(F)) return [F];
        Y.set(F.value, F)
      }
      if (Y.size > 1 && Y.has("")) Y.delete("");
      let J = [...Y.values()];
      return zt0.set(Q, J), J
    }
    intersects(A, B) {
      if (!(A instanceof Tt)) throw new TypeError("a Range is required");
      return this.set.some((Q) => {
        return Et0(Q, B) && A.set.some((I) => {
          return Et0(I, B) && Q.every((G) => {
            return I.every((Z) => {
              return G.intersects(Z, B)
            })
          })
        })
      })
    }
    test(A) {
      if (!A) return !1;
      if (typeof A === "string") try {
        A = new dT6(A, this.options)
      } catch (B) {
        return !1
      }
      for (let B = 0; B < this.set.length; B++)
        if (GP6(this.set[B], A, this.options)) return !0;
      return !1
    }
  }
  Ut0.exports = Tt;
  var hT6 = Ht0(),
    zt0 = new hT6,
    mT6 = VF1(),
    Di1 = Pt(),
    LB = Lt(),
    dT6 = gZ(),
    {
      safeRe: QW,
      t: gD,
      comparatorTrimReplace: uT6,
      tildeTrimReplace: pT6,
      caretTrimReplace: cT6
    } = hm(),
    {
      FLAG_INCLUDE_PRERELEASE: lT6,
      FLAG_LOOSE: iT6
    } = Mt(),
    wt0 = (A) => A.value === "<0.0.0-0",
    nT6 = (A) => A.value === "",
    Et0 = (A, B) => {
      let Q = !0,
        I = A.slice(),
        G = I.pop();
      while (Q && I.length) Q = I.every((Z) => {
        return G.intersects(Z, B)
      }), G = I.pop();
      return Q
    },
    aT6 = (A, B) => {
      return LB("comp", A, B), A = oT6(A, B), LB("caret", A), A = sT6(A, B), LB("tildes", A), A = eT6(A, B), LB("xrange", A), A = BP6(A, B), LB("stars", A), A
    },
    hD = (A) => !A || A.toLowerCase() === "x" || A === "*",
    sT6 = (A, B) => {
      return A.trim().split(/\s+/).map((Q) => rT6(Q, B)).join(" ")
    },
    rT6 = (A, B) => {
      let Q = B.loose ? QW[gD.TILDELOOSE] : QW[gD.TILDE];
      return A.replace(Q, (I, G, Z, D, Y) => {
        LB("tilde", A, I, G, Z, D, Y);
        let W;
        if (hD(G)) W = "";
        else if (hD(Z)) W = `>=${G}.0.0 <${+G+1}.0.0-0`;
        else if (hD(D)) W = `>=${G}.${Z}.0 <${G}.${+Z+1}.0-0`;
        else if (Y) LB("replaceTilde pr", Y), W = `>=${G}.${Z}.${D}-${Y} <${G}.${+Z+1}.0-0`;
        else W = `>=${G}.${Z}.${D} <${G}.${+Z+1}.0-0`;
        return LB("tilde return", W), W
      })
    },
    oT6 = (A, B) => {
      return A.trim().split(/\s+/).map((Q) => tT6(Q, B)).join(" ")
    },
    tT6 = (A, B) => {
      LB("caret", A, B);
      let Q = B.loose ? QW[gD.CARETLOOSE] : QW[gD.CARET],
        I = B.includePrerelease ? "-0" : "";
      return A.replace(Q, (G, Z, D, Y, W) => {
        LB("caret", A, G, Z, D, Y, W);
        let J;
        if (hD(Z)) J = "";
        else if (hD(D)) J = `>=${Z}.0.0${I} <${+Z+1}.0.0-0`;
        else if (hD(Y))
          if (Z === "0") J = `>=${Z}.${D}.0${I} <${Z}.${+D+1}.0-0`;
          else J = `>=${Z}.${D}.0${I} <${+Z+1}.0.0-0`;
        else if (W)
          if (LB("replaceCaret pr", W), Z === "0")
            if (D === "0") J = `>=${Z}.${D}.${Y}-${W} <${Z}.${D}.${+Y+1}-0`;
            else J = `>=${Z}.${D}.${Y}-${W} <${Z}.${+D+1}.0-0`;
        else J = `>=${Z}.${D}.${Y}-${W} <${+Z+1}.0.0-0`;
        else if (LB("no pr"), Z === "0")
          if (D === "0") J = `>=${Z}.${D}.${Y}${I} <${Z}.${D}.${+Y+1}-0`;
          else J = `>=${Z}.${D}.${Y}${I} <${Z}.${+D+1}.0-0`;
        else J = `>=${Z}.${D}.${Y} <${+Z+1}.0.0-0`;
        return LB("caret return", J), J
      })
    },
    eT6 = (A, B) => {
      return LB("replaceXRanges", A, B), A.split(/\s+/).map((Q) => AP6(Q, B)).join(" ")
    },
    AP6 = (A, B) => {
      A = A.trim();
      let Q = B.loose ? QW[gD.XRANGELOOSE] : QW[gD.XRANGE];
      return A.replace(Q, (I, G, Z, D, Y, W) => {
        LB("xRange", A, I, G, Z, D, Y, W);
        let J = hD(Z),
          F = J || hD(D),
          X = F || hD(Y),
          V = X;
        if (G === "=" && V) G = "";
        if (W = B.includePrerelease ? "-0" : "", J)
          if (G === ">" || G === "<") I = "<0.0.0-0";
          else I = "*";
        else if (G && V) {
          if (F) D = 0;
          if (Y = 0, G === ">")
            if (G = ">=", F) Z = +Z + 1, D = 0, Y = 0;
            else D = +D + 1, Y = 0;
          else if (G === "<=")
            if (G = "<", F) Z = +Z + 1;
            else D = +D + 1;
          if (G === "<") W = "-0";
          I = `${G+Z}.${D}.${Y}${W}`
        } else if (F) I = `>=${Z}.0.0${W} <${+Z+1}.0.0-0`;
        else if (X) I = `>=${Z}.${D}.0${W} <${Z}.${+D+1}.0-0`;
        return LB("xRange return", I), I
      })
    },
    BP6 = (A, B) => {
      return LB("replaceStars", A, B), A.trim().replace(QW[gD.STAR], "")
    },
    QP6 = (A, B) => {
      return LB("replaceGTE0", A, B), A.trim().replace(QW[B.includePrerelease ? gD.GTE0PRE : gD.GTE0], "")
    },
    IP6 = (A) => (B, Q, I, G, Z, D, Y, W, J, F, X, V) => {
      if (hD(I)) Q = "";
      else if (hD(G)) Q = `>=${I}.0.0${A?"-0":""}`;
      else if (hD(Z)) Q = `>=${I}.${G}.0${A?"-0":""}`;
      else if (D) Q = `>=${Q}`;
      else Q = `>=${Q}${A?"-0":""}`;
      if (hD(J)) W = "";
      else if (hD(F)) W = `<${+J+1}.0.0-0`;
      else if (hD(X)) W = `<${J}.${+F+1}.0-0`;
      else if (V) W = `<=${J}.${F}.${X}-${V}`;
      else if (A) W = `<${J}.${F}.${+X+1}-0`;
      else W = `<=${W}`;
      return `${Q} ${W}`.trim()
    },
    GP6 = (A, B, Q) => {
      for (let I = 0; I < A.length; I++)
        if (!A[I].test(B)) return !1;
      if (B.prerelease.length && !Q.includePrerelease) {
        for (let I = 0; I < A.length; I++) {
          if (LB(A[I].semver), A[I].semver === Di1.ANY) continue;
          if (A[I].semver.prerelease.length > 0) {
            let G = A[I].semver;
            if (G.major === B.major && G.minor === B.minor && G.patch === B.patch) return !0
          }
        }
        return !1
      }
      return !0
    }
})
// @from(Start 5765045, End 5767588)
Pt = z((Xv8, Rt0) => {
  var St = Symbol("SemVer ANY");
  class $F1 {
    static get ANY() {
      return St
    }
    constructor(A, B) {
      if (B = Nt0(B), A instanceof $F1)
        if (A.loose === !!B.loose) return A;
        else A = A.value;
      if (A = A.trim().split(/\s+/).join(" "), Wi1("comparator", A, B), this.options = B, this.loose = !!B.loose, this.parse(A), this.semver === St) this.value = "";
      else this.value = this.operator + this.semver.version;
      Wi1("comp", this)
    }
    parse(A) {
      let B = this.options.loose ? $t0[qt0.COMPARATORLOOSE] : $t0[qt0.COMPARATOR],
        Q = A.match(B);
      if (!Q) throw new TypeError(`Invalid comparator: ${A}`);
      if (this.operator = Q[1] !== void 0 ? Q[1] : "", this.operator === "=") this.operator = "";
      if (!Q[2]) this.semver = St;
      else this.semver = new Mt0(Q[2], this.options.loose)
    }
    toString() {
      return this.value
    }
    test(A) {
      if (Wi1("Comparator.test", A, this.options.loose), this.semver === St || A === St) return !0;
      if (typeof A === "string") try {
        A = new Mt0(A, this.options)
      } catch (B) {
        return !1
      }
      return Yi1(A, this.operator, this.semver, this.options)
    }
    intersects(A, B) {
      if (!(A instanceof $F1)) throw new TypeError("a Comparator is required");
      if (this.operator === "") {
        if (this.value === "") return !0;
        return new Lt0(A.value, B).test(this.value)
      } else if (A.operator === "") {
        if (A.value === "") return !0;
        return new Lt0(this.value, B).test(A.semver)
      }
      if (B = Nt0(B), B.includePrerelease && (this.value === "<0.0.0-0" || A.value === "<0.0.0-0")) return !1;
      if (!B.includePrerelease && (this.value.startsWith("<0.0.0") || A.value.startsWith("<0.0.0"))) return !1;
      if (this.operator.startsWith(">") && A.operator.startsWith(">")) return !0;
      if (this.operator.startsWith("<") && A.operator.startsWith("<")) return !0;
      if (this.semver.version === A.semver.version && this.operator.includes("=") && A.operator.includes("=")) return !0;
      if (Yi1(this.semver, "<", A.semver, B) && this.operator.startsWith(">") && A.operator.startsWith("<")) return !0;
      if (Yi1(this.semver, ">", A.semver, B) && this.operator.startsWith("<") && A.operator.startsWith(">")) return !0;
      return !1
    }
  }
  Rt0.exports = $F1;
  var Nt0 = VF1(),
    {
      safeRe: $t0,
      t: qt0
    } = hm(),
    Yi1 = Gi1(),
    Wi1 = Lt(),
    Mt0 = gZ(),
    Lt0 = rX()
})
// @from(Start 5767594, End 5767796)
dm = z((Vv8, Ot0) => {
  var ZP6 = rX(),
    DP6 = (A, B, Q) => {
      try {
        B = new ZP6(B, Q)
      } catch (I) {
        return !1
      }
      return B.test(A)
    };
  Ot0.exports = DP6
})
// @from(Start 5767802, End 5767967)
Pt0 = z((Cv8, Tt0) => {
  var YP6 = rX(),
    WP6 = (A, B) => new YP6(A, B).set.map((Q) => Q.map((I) => I.value).join(" ").trim().split(" "));
  Tt0.exports = WP6
})
// @from(Start 5767973, End 5768372)
_t0 = z((Kv8, St0) => {
  var JP6 = gZ(),
    FP6 = rX(),
    XP6 = (A, B, Q) => {
      let I = null,
        G = null,
        Z = null;
      try {
        Z = new FP6(B, Q)
      } catch (D) {
        return null
      }
      return A.forEach((D) => {
        if (Z.test(D)) {
          if (!I || G.compare(D) === -1) I = D, G = new JP6(I, Q)
        }
      }), I
    };
  St0.exports = XP6
})
// @from(Start 5768378, End 5768776)
yt0 = z((Hv8, jt0) => {
  var VP6 = gZ(),
    CP6 = rX(),
    KP6 = (A, B, Q) => {
      let I = null,
        G = null,
        Z = null;
      try {
        Z = new CP6(B, Q)
      } catch (D) {
        return null
      }
      return A.forEach((D) => {
        if (Z.test(D)) {
          if (!I || G.compare(D) === 1) I = D, G = new VP6(I, Q)
        }
      }), I
    };
  jt0.exports = KP6
})
// @from(Start 5768782, End 5769833)
ft0 = z((zv8, xt0) => {
  var Ji1 = gZ(),
    HP6 = rX(),
    kt0 = Rt(),
    zP6 = (A, B) => {
      A = new HP6(A, B);
      let Q = new Ji1("0.0.0");
      if (A.test(Q)) return Q;
      if (Q = new Ji1("0.0.0-0"), A.test(Q)) return Q;
      Q = null;
      for (let I = 0; I < A.set.length; ++I) {
        let G = A.set[I],
          Z = null;
        if (G.forEach((D) => {
            let Y = new Ji1(D.semver.version);
            switch (D.operator) {
              case ">":
                if (Y.prerelease.length === 0) Y.patch++;
                else Y.prerelease.push(0);
                Y.raw = Y.format();
              case "":
              case ">=":
                if (!Z || kt0(Y, Z)) Z = Y;
                break;
              case "<":
              case "<=":
                break;
              default:
                throw new Error(`Unexpected operation: ${D.operator}`)
            }
          }), Z && (!Q || kt0(Q, Z))) Q = Z
      }
      if (Q && A.test(Q)) return Q;
      return null
    };
  xt0.exports = zP6
})
// @from(Start 5769839, End 5770034)
bt0 = z((wv8, vt0) => {
  var wP6 = rX(),
    EP6 = (A, B) => {
      try {
        return new wP6(A, B).range || "*"
      } catch (Q) {
        return null
      }
    };
  vt0.exports = EP6
})
// @from(Start 5770040, End 5771242)
qF1 = z((Ev8, dt0) => {
  var UP6 = gZ(),
    mt0 = Pt(),
    {
      ANY: NP6
    } = mt0,
    $P6 = rX(),
    qP6 = dm(),
    gt0 = Rt(),
    ht0 = wF1(),
    MP6 = EF1(),
    LP6 = Ot(),
    RP6 = (A, B, Q, I) => {
      A = new UP6(A, I), B = new $P6(B, I);
      let G, Z, D, Y, W;
      switch (Q) {
        case ">":
          G = gt0, Z = MP6, D = ht0, Y = ">", W = ">=";
          break;
        case "<":
          G = ht0, Z = LP6, D = gt0, Y = "<", W = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"')
      }
      if (qP6(A, B, I)) return !1;
      for (let J = 0; J < B.set.length; ++J) {
        let F = B.set[J],
          X = null,
          V = null;
        if (F.forEach((C) => {
            if (C.semver === NP6) C = new mt0(">=0.0.0");
            if (X = X || C, V = V || C, G(C.semver, X.semver, I)) X = C;
            else if (D(C.semver, V.semver, I)) V = C
          }), X.operator === Y || X.operator === W) return !1;
        if ((!V.operator || V.operator === Y) && Z(A, V.semver)) return !1;
        else if (V.operator === W && D(A, V.semver)) return !1
      }
      return !0
    };
  dt0.exports = RP6
})
// @from(Start 5771248, End 5771355)
pt0 = z((Uv8, ut0) => {
  var OP6 = qF1(),
    TP6 = (A, B, Q) => OP6(A, B, ">", Q);
  ut0.exports = TP6
})
// @from(Start 5771361, End 5771468)
lt0 = z((Nv8, ct0) => {
  var PP6 = qF1(),
    SP6 = (A, B, Q) => PP6(A, B, "<", Q);
  ct0.exports = SP6
})
// @from(Start 5771474, End 5771640)
at0 = z(($v8, nt0) => {
  var it0 = rX(),
    _P6 = (A, B, Q) => {
      return A = new it0(A, Q), B = new it0(B, Q), A.intersects(B, Q)
    };
  nt0.exports = _P6
})
// @from(Start 5771646, End 5772366)
rt0 = z((qv8, st0) => {
  var jP6 = dm(),
    yP6 = sX();
  st0.exports = (A, B, Q) => {
    let I = [],
      G = null,
      Z = null,
      D = A.sort((F, X) => yP6(F, X, Q));
    for (let F of D)
      if (jP6(F, B, Q)) {
        if (Z = F, !G) G = F
      } else {
        if (Z) I.push([G, Z]);
        Z = null, G = null
      } if (G) I.push([G, null]);
    let Y = [];
    for (let [F, X] of I)
      if (F === X) Y.push(F);
      else if (!X && F === D[0]) Y.push("*");
    else if (!X) Y.push(`>=${F}`);
    else if (F === D[0]) Y.push(`<=${X}`);
    else Y.push(`${F} - ${X}`);
    let W = Y.join(" || "),
      J = typeof B.raw === "string" ? B.raw : String(B);
    return W.length < J.length ? W : B
  }
})
// @from(Start 5772372, End 5775801)
Qe0 = z((Mv8, Be0) => {
  var ot0 = rX(),
    Xi1 = Pt(),
    {
      ANY: Fi1
    } = Xi1,
    _t = dm(),
    Vi1 = sX(),
    kP6 = (A, B, Q = {}) => {
      if (A === B) return !0;
      A = new ot0(A, Q), B = new ot0(B, Q);
      let I = !1;
      A: for (let G of A.set) {
        for (let Z of B.set) {
          let D = fP6(G, Z, Q);
          if (I = I || D !== null, D) continue A
        }
        if (I) return !1
      }
      return !0
    },
    xP6 = [new Xi1(">=0.0.0-0")],
    tt0 = [new Xi1(">=0.0.0")],
    fP6 = (A, B, Q) => {
      if (A === B) return !0;
      if (A.length === 1 && A[0].semver === Fi1)
        if (B.length === 1 && B[0].semver === Fi1) return !0;
        else if (Q.includePrerelease) A = xP6;
      else A = tt0;
      if (B.length === 1 && B[0].semver === Fi1)
        if (Q.includePrerelease) return !0;
        else B = tt0;
      let I = new Set,
        G, Z;
      for (let C of A)
        if (C.operator === ">" || C.operator === ">=") G = et0(G, C, Q);
        else if (C.operator === "<" || C.operator === "<=") Z = Ae0(Z, C, Q);
      else I.add(C.semver);
      if (I.size > 1) return null;
      let D;
      if (G && Z) {
        if (D = Vi1(G.semver, Z.semver, Q), D > 0) return null;
        else if (D === 0 && (G.operator !== ">=" || Z.operator !== "<=")) return null
      }
      for (let C of I) {
        if (G && !_t(C, String(G), Q)) return null;
        if (Z && !_t(C, String(Z), Q)) return null;
        for (let K of B)
          if (!_t(C, String(K), Q)) return !1;
        return !0
      }
      let Y, W, J, F, X = Z && !Q.includePrerelease && Z.semver.prerelease.length ? Z.semver : !1,
        V = G && !Q.includePrerelease && G.semver.prerelease.length ? G.semver : !1;
      if (X && X.prerelease.length === 1 && Z.operator === "<" && X.prerelease[0] === 0) X = !1;
      for (let C of B) {
        if (F = F || C.operator === ">" || C.operator === ">=", J = J || C.operator === "<" || C.operator === "<=", G) {
          if (V) {
            if (C.semver.prerelease && C.semver.prerelease.length && C.semver.major === V.major && C.semver.minor === V.minor && C.semver.patch === V.patch) V = !1
          }
          if (C.operator === ">" || C.operator === ">=") {
            if (Y = et0(G, C, Q), Y === C && Y !== G) return !1
          } else if (G.operator === ">=" && !_t(G.semver, String(C), Q)) return !1
        }
        if (Z) {
          if (X) {
            if (C.semver.prerelease && C.semver.prerelease.length && C.semver.major === X.major && C.semver.minor === X.minor && C.semver.patch === X.patch) X = !1
          }
          if (C.operator === "<" || C.operator === "<=") {
            if (W = Ae0(Z, C, Q), W === C && W !== Z) return !1
          } else if (Z.operator === "<=" && !_t(Z.semver, String(C), Q)) return !1
        }
        if (!C.operator && (Z || G) && D !== 0) return !1
      }
      if (G && J && !Z && D !== 0) return !1;
      if (Z && F && !G && D !== 0) return !1;
      if (V || X) return !1;
      return !0
    },
    et0 = (A, B, Q) => {
      if (!A) return B;
      let I = Vi1(A.semver, B.semver, Q);
      return I > 0 ? A : I < 0 ? B : B.operator === ">" && A.operator === ">=" ? B : A
    },
    Ae0 = (A, B, Q) => {
      if (!A) return B;
      let I = Vi1(A.semver, B.semver, Q);
      return I < 0 ? A : I > 0 ? B : B.operator === "<" && A.operator === "<=" ? B : A
    };
  Be0.exports = kP6
})
// @from(Start 5775807, End 5777449)
gj = z((Lv8, Ze0) => {
  var Ci1 = hm(),
    Ie0 = Mt(),
    vP6 = gZ(),
    Ge0 = Bi1(),
    bP6 = bj(),
    gP6 = _o0(),
    hP6 = yo0(),
    mP6 = fo0(),
    dP6 = go0(),
    uP6 = mo0(),
    pP6 = uo0(),
    cP6 = co0(),
    lP6 = io0(),
    iP6 = sX(),
    nP6 = ro0(),
    aP6 = to0(),
    sP6 = zF1(),
    rP6 = Qt0(),
    oP6 = Gt0(),
    tP6 = Rt(),
    eP6 = wF1(),
    AS6 = Qi1(),
    BS6 = Ii1(),
    QS6 = Ot(),
    IS6 = EF1(),
    GS6 = Gi1(),
    ZS6 = Zi1(),
    DS6 = Pt(),
    YS6 = rX(),
    WS6 = dm(),
    JS6 = Pt0(),
    FS6 = _t0(),
    XS6 = yt0(),
    VS6 = ft0(),
    CS6 = bt0(),
    KS6 = qF1(),
    HS6 = pt0(),
    zS6 = lt0(),
    wS6 = at0(),
    ES6 = rt0(),
    US6 = Qe0();
  Ze0.exports = {
    parse: bP6,
    valid: gP6,
    clean: hP6,
    inc: mP6,
    diff: dP6,
    major: uP6,
    minor: pP6,
    patch: cP6,
    prerelease: lP6,
    compare: iP6,
    rcompare: nP6,
    compareLoose: aP6,
    compareBuild: sP6,
    sort: rP6,
    rsort: oP6,
    gt: tP6,
    lt: eP6,
    eq: AS6,
    neq: BS6,
    gte: QS6,
    lte: IS6,
    cmp: GS6,
    coerce: ZS6,
    Comparator: DS6,
    Range: YS6,
    satisfies: WS6,
    toComparators: JS6,
    maxSatisfying: FS6,
    minSatisfying: XS6,
    minVersion: VS6,
    validRange: CS6,
    outside: KS6,
    gtr: HS6,
    ltr: zS6,
    intersects: wS6,
    simplifyRange: ES6,
    subset: US6,
    SemVer: vP6,
    re: Ci1.re,
    src: Ci1.src,
    tokens: Ci1.t,
    SEMVER_SPEC_VERSION: Ie0.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: Ie0.RELEASE_TYPES,
    compareIdentifiers: Ge0.compareIdentifiers,
    rcompareIdentifiers: Ge0.rcompareIdentifiers
  }
})
// @from(Start 5777455, End 5780358)
ve0 = z((Zb8, fe0) => {
  var {
    defineProperty: PF1,
    getOwnPropertyDescriptor: bS6,
    getOwnPropertyNames: gS6
  } = Object, hS6 = Object.prototype.hasOwnProperty, SF1 = (A, B) => PF1(A, "name", {
    value: B,
    configurable: !0
  }), mS6 = (A, B) => {
    for (var Q in B) PF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, dS6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of gS6(B))
        if (!hS6.call(A, G) && G !== Q) PF1(A, G, {
          get: () => B[G],
          enumerable: !(I = bS6(B, G)) || I.enumerable
        })
    }
    return A
  }, uS6 = (A) => dS6(PF1({}, "__esModule", {
    value: !0
  }), A), Te0 = {};
  mS6(Te0, {
    AlgorithmId: () => je0,
    EndpointURLScheme: () => _e0,
    FieldPosition: () => ye0,
    HttpApiKeyAuthLocation: () => Se0,
    HttpAuthLocation: () => Pe0,
    IniSectionType: () => ke0,
    RequestHandlerProtocol: () => xe0,
    SMITHY_CONTEXT_KEY: () => nS6,
    getDefaultClientConfiguration: () => lS6,
    resolveDefaultRuntimeConfig: () => iS6
  });
  fe0.exports = uS6(Te0);
  var Pe0 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(Pe0 || {}),
    Se0 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(Se0 || {}),
    _e0 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(_e0 || {}),
    je0 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(je0 || {}),
    pS6 = SF1((A) => {
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
        _checksumAlgorithms: B,
        addChecksumAlgorithm(Q) {
          this._checksumAlgorithms.push(Q)
        },
        checksumAlgorithms() {
          return this._checksumAlgorithms
        }
      }
    }, "getChecksumConfiguration"),
    cS6 = SF1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    lS6 = SF1((A) => {
      return {
        ...pS6(A)
      }
    }, "getDefaultClientConfiguration"),
    iS6 = SF1((A) => {
      return {
        ...cS6(A)
      }
    }, "resolveDefaultRuntimeConfig"),
    ye0 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(ye0 || {}),
    nS6 = "__smithy_context",
    ke0 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(ke0 || {}),
    xe0 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(xe0 || {})
})
// @from(Start 5780364, End 5781462)
de0 = z((Db8, me0) => {
  var {
    defineProperty: _F1,
    getOwnPropertyDescriptor: aS6,
    getOwnPropertyNames: sS6
  } = Object, rS6 = Object.prototype.hasOwnProperty, ge0 = (A, B) => _F1(A, "name", {
    value: B,
    configurable: !0
  }), oS6 = (A, B) => {
    for (var Q in B) _F1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, tS6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of sS6(B))
        if (!rS6.call(A, G) && G !== Q) _F1(A, G, {
          get: () => B[G],
          enumerable: !(I = aS6(B, G)) || I.enumerable
        })
    }
    return A
  }, eS6 = (A) => tS6(_F1({}, "__esModule", {
    value: !0
  }), A), he0 = {};
  oS6(he0, {
    getSmithyContext: () => A_6,
    normalizeProvider: () => B_6
  });
  me0.exports = eS6(he0);
  var be0 = ve0(),
    A_6 = ge0((A) => A[be0.SMITHY_CONTEXT_KEY] || (A[be0.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext"),
    B_6 = ge0((A) => {
      if (typeof A === "function") return A;
      let B = Promise.resolve(A);
      return () => B
    }, "normalizeProvider")
})
// @from(Start 5781468, End 5782421)
qi1 = z((Yb8, pe0) => {
  var {
    defineProperty: jF1,
    getOwnPropertyDescriptor: Q_6,
    getOwnPropertyNames: I_6
  } = Object, G_6 = Object.prototype.hasOwnProperty, Z_6 = (A, B) => jF1(A, "name", {
    value: B,
    configurable: !0
  }), D_6 = (A, B) => {
    for (var Q in B) jF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Y_6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of I_6(B))
        if (!G_6.call(A, G) && G !== Q) jF1(A, G, {
          get: () => B[G],
          enumerable: !(I = Q_6(B, G)) || I.enumerable
        })
    }
    return A
  }, W_6 = (A) => Y_6(jF1({}, "__esModule", {
    value: !0
  }), A), ue0 = {};
  D_6(ue0, {
    isArrayBuffer: () => J_6
  });
  pe0.exports = W_6(ue0);
  var J_6 = Z_6((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
})
// @from(Start 5782427, End 5783776)
ne0 = z((Wb8, ie0) => {
  var {
    defineProperty: yF1,
    getOwnPropertyDescriptor: F_6,
    getOwnPropertyNames: X_6
  } = Object, V_6 = Object.prototype.hasOwnProperty, ce0 = (A, B) => yF1(A, "name", {
    value: B,
    configurable: !0
  }), C_6 = (A, B) => {
    for (var Q in B) yF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, K_6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of X_6(B))
        if (!V_6.call(A, G) && G !== Q) yF1(A, G, {
          get: () => B[G],
          enumerable: !(I = F_6(B, G)) || I.enumerable
        })
    }
    return A
  }, H_6 = (A) => K_6(yF1({}, "__esModule", {
    value: !0
  }), A), le0 = {};
  C_6(le0, {
    fromArrayBuffer: () => w_6,
    fromString: () => E_6
  });
  ie0.exports = H_6(le0);
  var z_6 = qi1(),
    Mi1 = Z1("buffer"),
    w_6 = ce0((A, B = 0, Q = A.byteLength - B) => {
      if (!z_6.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
      return Mi1.Buffer.from(A, B, Q)
    }, "fromArrayBuffer"),
    E_6 = ce0((A, B) => {
      if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
      return B ? Mi1.Buffer.from(A, B) : Mi1.Buffer.from(A)
    }, "fromString")
})
// @from(Start 5783782, End 5785438)
gt = z((Jb8, oe0) => {
  var {
    defineProperty: kF1,
    getOwnPropertyDescriptor: U_6,
    getOwnPropertyNames: N_6
  } = Object, $_6 = Object.prototype.hasOwnProperty, Li1 = (A, B) => kF1(A, "name", {
    value: B,
    configurable: !0
  }), q_6 = (A, B) => {
    for (var Q in B) kF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, M_6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of N_6(B))
        if (!$_6.call(A, G) && G !== Q) kF1(A, G, {
          get: () => B[G],
          enumerable: !(I = U_6(B, G)) || I.enumerable
        })
    }
    return A
  }, L_6 = (A) => M_6(kF1({}, "__esModule", {
    value: !0
  }), A), ae0 = {};
  q_6(ae0, {
    fromUtf8: () => re0,
    toUint8Array: () => R_6,
    toUtf8: () => O_6
  });
  oe0.exports = L_6(ae0);
  var se0 = ne0(),
    re0 = Li1((A) => {
      let B = se0.fromString(A, "utf8");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
    }, "fromUtf8"),
    R_6 = Li1((A) => {
      if (typeof A === "string") return re0(A);
      if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      return new Uint8Array(A)
    }, "toUint8Array"),
    O_6 = Li1((A) => {
      if (typeof A === "string") return A;
      if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
      return se0.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
    }, "toUtf8")
})
// @from(Start 5785444, End 5786978)
G12 = z((Fb8, I12) => {
  var {
    defineProperty: xF1,
    getOwnPropertyDescriptor: T_6,
    getOwnPropertyNames: P_6
  } = Object, S_6 = Object.prototype.hasOwnProperty, te0 = (A, B) => xF1(A, "name", {
    value: B,
    configurable: !0
  }), __6 = (A, B) => {
    for (var Q in B) xF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, j_6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of P_6(B))
        if (!S_6.call(A, G) && G !== Q) xF1(A, G, {
          get: () => B[G],
          enumerable: !(I = T_6(B, G)) || I.enumerable
        })
    }
    return A
  }, y_6 = (A) => j_6(xF1({}, "__esModule", {
    value: !0
  }), A), ee0 = {};
  __6(ee0, {
    fromHex: () => B12,
    toHex: () => Q12
  });
  I12.exports = y_6(ee0);
  var A12 = {},
    Ri1 = {};
  for (let A = 0; A < 256; A++) {
    let B = A.toString(16).toLowerCase();
    if (B.length === 1) B = `0${B}`;
    A12[A] = B, Ri1[B] = A
  }

  function B12(A) {
    if (A.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
    let B = new Uint8Array(A.length / 2);
    for (let Q = 0; Q < A.length; Q += 2) {
      let I = A.slice(Q, Q + 2).toLowerCase();
      if (I in Ri1) B[Q / 2] = Ri1[I];
      else throw new Error(`Cannot decode unrecognized sequence ${I} as hexadecimal`)
    }
    return B
  }
  te0(B12, "fromHex");

  function Q12(A) {
    let B = "";
    for (let Q = 0; Q < A.byteLength; Q++) B += A12[A[Q]];
    return B
  }
  te0(Q12, "toHex")
})
// @from(Start 5786984, End 5788037)
W12 = z((Xb8, Y12) => {
  var {
    defineProperty: fF1,
    getOwnPropertyDescriptor: k_6,
    getOwnPropertyNames: x_6
  } = Object, f_6 = Object.prototype.hasOwnProperty, Oi1 = (A, B) => fF1(A, "name", {
    value: B,
    configurable: !0
  }), v_6 = (A, B) => {
    for (var Q in B) fF1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, b_6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of x_6(B))
        if (!f_6.call(A, G) && G !== Q) fF1(A, G, {
          get: () => B[G],
          enumerable: !(I = k_6(B, G)) || I.enumerable
        })
    }
    return A
  }, g_6 = (A) => b_6(fF1({}, "__esModule", {
    value: !0
  }), A), Z12 = {};
  v_6(Z12, {
    escapeUri: () => D12,
    escapeUriPath: () => m_6
  });
  Y12.exports = g_6(Z12);
  var D12 = Oi1((A) => encodeURIComponent(A).replace(/[!'()*]/g, h_6), "escapeUri"),
    h_6 = Oi1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
    m_6 = Oi1((A) => A.split("/").map(D12).join("/"), "escapeUriPath")
})