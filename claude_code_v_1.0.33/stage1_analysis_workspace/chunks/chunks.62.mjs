
// @from(Start 6152794, End 6163923)
Ca1 = z((oh8, oQ2) => {
  var {
    defineProperty: YV1,
    getOwnPropertyDescriptor: kp6,
    getOwnPropertyNames: xp6
  } = Object, fp6 = Object.prototype.hasOwnProperty, J$ = (A, B) => YV1(A, "name", {
    value: B,
    configurable: !0
  }), vp6 = (A, B) => {
    for (var Q in B) YV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, bp6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of xp6(B))
        if (!fp6.call(A, G) && G !== Q) YV1(A, G, {
          get: () => B[G],
          enumerable: !(I = kp6(B, G)) || I.enumerable
        })
    }
    return A
  }, gp6 = (A) => bp6(YV1({}, "__esModule", {
    value: !0
  }), A), nQ2 = {};
  vp6(nQ2, {
    EventStreamCodec: () => op6,
    HeaderMarshaller: () => aQ2,
    Int64: () => DV1,
    MessageDecoderStream: () => tp6,
    MessageEncoderStream: () => ep6,
    SmithyMessageDecoderStream: () => Ac6,
    SmithyMessageEncoderStream: () => Bc6
  });
  oQ2.exports = gp6(nQ2);
  var hp6 = ZV1(),
    pj = MQ1(),
    DV1 = class A {
      constructor(B) {
        if (this.bytes = B, B.byteLength !== 8) throw new Error("Int64 buffers must be exactly 8 bytes")
      }
      static {
        J$(this, "Int64")
      }
      static fromNumber(B) {
        if (B > 9223372036854776000 || B < -9223372036854776000) throw new Error(`${B} is too large (or, if negative, too small) to represent as an Int64`);
        let Q = new Uint8Array(8);
        for (let I = 7, G = Math.abs(Math.round(B)); I > -1 && G > 0; I--, G /= 256) Q[I] = G;
        if (B < 0) Va1(Q);
        return new A(Q)
      }
      valueOf() {
        let B = this.bytes.slice(0),
          Q = B[0] & 128;
        if (Q) Va1(B);
        return parseInt(pj.toHex(B), 16) * (Q ? -1 : 1)
      }
      toString() {
        return String(this.valueOf())
      }
    };

  function Va1(A) {
    for (let B = 0; B < 8; B++) A[B] ^= 255;
    for (let B = 7; B > -1; B--)
      if (A[B]++, A[B] !== 0) break
  }
  J$(Va1, "negate");
  var aQ2 = class {
      constructor(A, B) {
        this.toUtf8 = A, this.fromUtf8 = B
      }
      static {
        J$(this, "HeaderMarshaller")
      }
      format(A) {
        let B = [];
        for (let G of Object.keys(A)) {
          let Z = this.fromUtf8(G);
          B.push(Uint8Array.from([Z.byteLength]), Z, this.formatHeaderValue(A[G]))
        }
        let Q = new Uint8Array(B.reduce((G, Z) => G + Z.byteLength, 0)),
          I = 0;
        for (let G of B) Q.set(G, I), I += G.byteLength;
        return Q
      }
      formatHeaderValue(A) {
        switch (A.type) {
          case "boolean":
            return Uint8Array.from([A.value ? 0 : 1]);
          case "byte":
            return Uint8Array.from([2, A.value]);
          case "short":
            let B = new DataView(new ArrayBuffer(3));
            return B.setUint8(0, 3), B.setInt16(1, A.value, !1), new Uint8Array(B.buffer);
          case "integer":
            let Q = new DataView(new ArrayBuffer(5));
            return Q.setUint8(0, 4), Q.setInt32(1, A.value, !1), new Uint8Array(Q.buffer);
          case "long":
            let I = new Uint8Array(9);
            return I[0] = 5, I.set(A.value.bytes, 1), I;
          case "binary":
            let G = new DataView(new ArrayBuffer(3 + A.value.byteLength));
            G.setUint8(0, 6), G.setUint16(1, A.value.byteLength, !1);
            let Z = new Uint8Array(G.buffer);
            return Z.set(A.value, 3), Z;
          case "string":
            let D = this.fromUtf8(A.value),
              Y = new DataView(new ArrayBuffer(3 + D.byteLength));
            Y.setUint8(0, 7), Y.setUint16(1, D.byteLength, !1);
            let W = new Uint8Array(Y.buffer);
            return W.set(D, 3), W;
          case "timestamp":
            let J = new Uint8Array(9);
            return J[0] = 8, J.set(DV1.fromNumber(A.value.valueOf()).bytes, 1), J;
          case "uuid":
            if (!ap6.test(A.value)) throw new Error(`Invalid UUID received: ${A.value}`);
            let F = new Uint8Array(17);
            return F[0] = 9, F.set(pj.fromHex(A.value.replace(/\-/g, "")), 1), F
        }
      }
      parse(A) {
        let B = {},
          Q = 0;
        while (Q < A.byteLength) {
          let I = A.getUint8(Q++),
            G = this.toUtf8(new Uint8Array(A.buffer, A.byteOffset + Q, I));
          switch (Q += I, A.getUint8(Q++)) {
            case 0:
              B[G] = {
                type: iQ2,
                value: !0
              };
              break;
            case 1:
              B[G] = {
                type: iQ2,
                value: !1
              };
              break;
            case 2:
              B[G] = {
                type: mp6,
                value: A.getInt8(Q++)
              };
              break;
            case 3:
              B[G] = {
                type: dp6,
                value: A.getInt16(Q, !1)
              }, Q += 2;
              break;
            case 4:
              B[G] = {
                type: up6,
                value: A.getInt32(Q, !1)
              }, Q += 4;
              break;
            case 5:
              B[G] = {
                type: pp6,
                value: new DV1(new Uint8Array(A.buffer, A.byteOffset + Q, 8))
              }, Q += 8;
              break;
            case 6:
              let Z = A.getUint16(Q, !1);
              Q += 2, B[G] = {
                type: cp6,
                value: new Uint8Array(A.buffer, A.byteOffset + Q, Z)
              }, Q += Z;
              break;
            case 7:
              let D = A.getUint16(Q, !1);
              Q += 2, B[G] = {
                type: lp6,
                value: this.toUtf8(new Uint8Array(A.buffer, A.byteOffset + Q, D))
              }, Q += D;
              break;
            case 8:
              B[G] = {
                type: ip6,
                value: new Date(new DV1(new Uint8Array(A.buffer, A.byteOffset + Q, 8)).valueOf())
              }, Q += 8;
              break;
            case 9:
              let Y = new Uint8Array(A.buffer, A.byteOffset + Q, 16);
              Q += 16, B[G] = {
                type: np6,
                value: `${pj.toHex(Y.subarray(0,4))}-${pj.toHex(Y.subarray(4,6))}-${pj.toHex(Y.subarray(6,8))}-${pj.toHex(Y.subarray(8,10))}-${pj.toHex(Y.subarray(10))}`
              };
              break;
            default:
              throw new Error("Unrecognized header type tag")
          }
        }
        return B
      }
    },
    iQ2 = "boolean",
    mp6 = "byte",
    dp6 = "short",
    up6 = "integer",
    pp6 = "long",
    cp6 = "binary",
    lp6 = "string",
    ip6 = "timestamp",
    np6 = "uuid",
    ap6 = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    sp6 = ZV1(),
    sQ2 = 4,
    ZO = sQ2 * 2,
    cj = 4,
    rp6 = ZO + cj * 2;

  function rQ2({
    byteLength: A,
    byteOffset: B,
    buffer: Q
  }) {
    if (A < rp6) throw new Error("Provided message too short to accommodate event stream message overhead");
    let I = new DataView(Q, B, A),
      G = I.getUint32(0, !1);
    if (A !== G) throw new Error("Reported message length does not match received message length");
    let Z = I.getUint32(sQ2, !1),
      D = I.getUint32(ZO, !1),
      Y = I.getUint32(A - cj, !1),
      W = new sp6.Crc32().update(new Uint8Array(Q, B, ZO));
    if (D !== W.digest()) throw new Error(`The prelude checksum specified in the message (${D}) does not match the calculated CRC32 checksum (${W.digest()})`);
    if (W.update(new Uint8Array(Q, B + ZO, A - (ZO + cj))), Y !== W.digest()) throw new Error(`The message checksum (${W.digest()}) did not match the expected value of ${Y}`);
    return {
      headers: new DataView(Q, B + ZO + cj, Z),
      body: new Uint8Array(Q, B + ZO + cj + Z, G - Z - (ZO + cj + cj))
    }
  }
  J$(rQ2, "splitMessage");
  var op6 = class {
      static {
        J$(this, "EventStreamCodec")
      }
      constructor(A, B) {
        this.headerMarshaller = new aQ2(A, B), this.messageBuffer = [], this.isEndOfStream = !1
      }
      feed(A) {
        this.messageBuffer.push(this.decode(A))
      }
      endOfStream() {
        this.isEndOfStream = !0
      }
      getMessage() {
        let A = this.messageBuffer.pop(),
          B = this.isEndOfStream;
        return {
          getMessage() {
            return A
          },
          isEndOfStream() {
            return B
          }
        }
      }
      getAvailableMessages() {
        let A = this.messageBuffer;
        this.messageBuffer = [];
        let B = this.isEndOfStream;
        return {
          getMessages() {
            return A
          },
          isEndOfStream() {
            return B
          }
        }
      }
      encode({
        headers: A,
        body: B
      }) {
        let Q = this.headerMarshaller.format(A),
          I = Q.byteLength + B.byteLength + 16,
          G = new Uint8Array(I),
          Z = new DataView(G.buffer, G.byteOffset, G.byteLength),
          D = new hp6.Crc32;
        return Z.setUint32(0, I, !1), Z.setUint32(4, Q.byteLength, !1), Z.setUint32(8, D.update(G.subarray(0, 8)).digest(), !1), G.set(Q, 12), G.set(B, Q.byteLength + 12), Z.setUint32(I - 4, D.update(G.subarray(8, I - 4)).digest(), !1), G
      }
      decode(A) {
        let {
          headers: B,
          body: Q
        } = rQ2(A);
        return {
          headers: this.headerMarshaller.parse(B),
          body: Q
        }
      }
      formatHeaders(A) {
        return this.headerMarshaller.format(A)
      }
    },
    tp6 = class {
      constructor(A) {
        this.options = A
      }
      static {
        J$(this, "MessageDecoderStream")
      } [Symbol.asyncIterator]() {
        return this.asyncIterator()
      }
      async * asyncIterator() {
        for await (let A of this.options.inputStream) yield this.options.decoder.decode(A)
      }
    },
    ep6 = class {
      constructor(A) {
        this.options = A
      }
      static {
        J$(this, "MessageEncoderStream")
      } [Symbol.asyncIterator]() {
        return this.asyncIterator()
      }
      async * asyncIterator() {
        for await (let A of this.options.messageStream) yield this.options.encoder.encode(A);
        if (this.options.includeEndFrame) yield new Uint8Array(0)
      }
    },
    Ac6 = class {
      constructor(A) {
        this.options = A
      }
      static {
        J$(this, "SmithyMessageDecoderStream")
      } [Symbol.asyncIterator]() {
        return this.asyncIterator()
      }
      async * asyncIterator() {
        for await (let A of this.options.messageStream) {
          let B = await this.options.deserializer(A);
          if (B === void 0) continue;
          yield B
        }
      }
    },
    Bc6 = class {
      constructor(A) {
        this.options = A
      }
      static {
        J$(this, "SmithyMessageEncoderStream")
      } [Symbol.asyncIterator]() {
        return this.asyncIterator()
      }
      async * asyncIterator() {
        for await (let A of this.options.inputStream) yield this.options.serializer(A)
      }
    }
})
// @from(Start 6163929, End 6167842)
B72 = z((Gm8, A72) => {
  var {
    defineProperty: JV1,
    getOwnPropertyDescriptor: Qc6,
    getOwnPropertyNames: Ic6
  } = Object, Gc6 = Object.prototype.hasOwnProperty, FV1 = (A, B) => JV1(A, "name", {
    value: B,
    configurable: !0
  }), Zc6 = (A, B) => {
    for (var Q in B) JV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Dc6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Ic6(B))
        if (!Gc6.call(A, G) && G !== Q) JV1(A, G, {
          get: () => B[G],
          enumerable: !(I = Qc6(B, G)) || I.enumerable
        })
    }
    return A
  }, Yc6 = (A) => Dc6(JV1({}, "__esModule", {
    value: !0
  }), A), tQ2 = {};
  Zc6(tQ2, {
    eventStreamPayloadHandlerProvider: () => Xc6
  });
  A72.exports = Yc6(tQ2);
  var Wc6 = Ca1(),
    WV1 = Z1("stream"),
    Jc6 = class extends WV1.Transform {
      static {
        FV1(this, "EventSigningStream")
      }
      priorSignature;
      messageSigner;
      eventStreamCodec;
      systemClockOffsetProvider;
      constructor(A) {
        super({
          autoDestroy: !0,
          readableObjectMode: !0,
          writableObjectMode: !0,
          ...A
        });
        this.priorSignature = A.priorSignature, this.eventStreamCodec = A.eventStreamCodec, this.messageSigner = A.messageSigner, this.systemClockOffsetProvider = A.systemClockOffsetProvider
      }
      async _transform(A, B, Q) {
        try {
          let I = new Date(Date.now() + await this.systemClockOffsetProvider()),
            G = {
              ":date": {
                type: "timestamp",
                value: I
              }
            },
            Z = await this.messageSigner.sign({
              message: {
                body: A,
                headers: G
              },
              priorSignature: this.priorSignature
            }, {
              signingDate: I
            });
          this.priorSignature = Z.signature;
          let D = this.eventStreamCodec.encode({
            headers: {
              ...G,
              ":chunk-signature": {
                type: "binary",
                value: eQ2(Z.signature)
              }
            },
            body: A
          });
          return this.push(D), Q()
        } catch (I) {
          Q(I)
        }
      }
    };

  function eQ2(A) {
    let B = Buffer.from(A, "hex");
    return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
  }
  FV1(eQ2, "getSignatureBinary");
  var Fc6 = class {
      static {
        FV1(this, "EventStreamPayloadHandler")
      }
      messageSigner;
      eventStreamCodec;
      systemClockOffsetProvider;
      constructor(A) {
        this.messageSigner = A.messageSigner, this.eventStreamCodec = new Wc6.EventStreamCodec(A.utf8Encoder, A.utf8Decoder), this.systemClockOffsetProvider = async () => A.systemClockOffset ?? 0
      }
      async handle(A, B, Q = {}) {
        let I = B.request,
          {
            body: G,
            query: Z
          } = I;
        if (!(G instanceof WV1.Readable)) throw new Error("Eventstream payload must be a Readable stream.");
        let D = G;
        I.body = new WV1.PassThrough({
          objectMode: !0
        });
        let W = I.headers?.authorization?.match(/Signature=([\w]+)$/)?.[1] ?? Z?.["X-Amz-Signature"] ?? "",
          J = new Jc6({
            priorSignature: W,
            eventStreamCodec: this.eventStreamCodec,
            messageSigner: await this.messageSigner(),
            systemClockOffsetProvider: this.systemClockOffsetProvider
          });
        WV1.pipeline(D, J, I.body, (X) => {
          if (X) throw X
        });
        let F;
        try {
          F = await A(B)
        } catch (X) {
          throw I.body.end(), X
        }
        return F
      }
    },
    Xc6 = FV1((A) => new Fc6(A), "eventStreamPayloadHandlerProvider")
})
// @from(Start 6167848, End 6171888)
Y72 = z((Ym8, D72) => {
  var {
    defineProperty: XV1,
    getOwnPropertyDescriptor: Vc6,
    getOwnPropertyNames: Cc6
  } = Object, Kc6 = Object.prototype.hasOwnProperty, Xd = (A, B) => XV1(A, "name", {
    value: B,
    configurable: !0
  }), Hc6 = (A, B) => {
    for (var Q in B) XV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, zc6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Cc6(B))
        if (!Kc6.call(A, G) && G !== Q) XV1(A, G, {
          get: () => B[G],
          enumerable: !(I = Vc6(B, G)) || I.enumerable
        })
    }
    return A
  }, wc6 = (A) => zc6(XV1({}, "__esModule", {
    value: !0
  }), A), Q72 = {};
  Hc6(Q72, {
    EventStreamMarshaller: () => Z72,
    eventStreamSerdeProvider: () => Ec6
  });
  D72.exports = wc6(Q72);
  var Qe = Ca1();

  function I72(A) {
    let B = 0,
      Q = 0,
      I = null,
      G = null,
      Z = Xd((Y) => {
        if (typeof Y !== "number") throw new Error("Attempted to allocate an event message where size was not a number: " + Y);
        B = Y, Q = 4, I = new Uint8Array(Y), new DataView(I.buffer).setUint32(0, Y, !1)
      }, "allocateMessage"),
      D = Xd(async function*() {
        let Y = A[Symbol.asyncIterator]();
        while (!0) {
          let {
            value: W,
            done: J
          } = await Y.next();
          if (J) {
            if (!B) return;
            else if (B === Q) yield I;
            else throw new Error("Truncated event message received.");
            return
          }
          let F = W.length,
            X = 0;
          while (X < F) {
            if (!I) {
              let C = F - X;
              if (!G) G = new Uint8Array(4);
              let K = Math.min(4 - Q, C);
              if (G.set(W.slice(X, X + K), Q), Q += K, X += K, Q < 4) break;
              Z(new DataView(G.buffer).getUint32(0, !1)), G = null
            }
            let V = Math.min(B - Q, F - X);
            if (I.set(W.slice(X, X + V), Q), Q += V, X += V, B && B === Q) yield I, I = null, B = 0, Q = 0
          }
        }
      }, "iterator");
    return {
      [Symbol.asyncIterator]: D
    }
  }
  Xd(I72, "getChunkedStream");

  function G72(A, B) {
    return async function(Q) {
      let {
        value: I
      } = Q.headers[":message-type"];
      if (I === "error") {
        let G = new Error(Q.headers[":error-message"].value || "UnknownError");
        throw G.name = Q.headers[":error-code"].value, G
      } else if (I === "exception") {
        let G = Q.headers[":exception-type"].value,
          Z = {
            [G]: Q
          },
          D = await A(Z);
        if (D.$unknown) {
          let Y = new Error(B(Q.body));
          throw Y.name = G, Y
        }
        throw D[G]
      } else if (I === "event") {
        let G = {
            [Q.headers[":event-type"].value]: Q
          },
          Z = await A(G);
        if (Z.$unknown) return;
        return Z
      } else throw Error(`Unrecognizable event type: ${Q.headers[":event-type"].value}`)
    }
  }
  Xd(G72, "getMessageUnmarshaller");
  var Z72 = class {
      static {
        Xd(this, "EventStreamMarshaller")
      }
      constructor({
        utf8Encoder: A,
        utf8Decoder: B
      }) {
        this.eventStreamCodec = new Qe.EventStreamCodec(A, B), this.utfEncoder = A
      }
      deserialize(A, B) {
        let Q = I72(A);
        return new Qe.SmithyMessageDecoderStream({
          messageStream: new Qe.MessageDecoderStream({
            inputStream: Q,
            decoder: this.eventStreamCodec
          }),
          deserializer: G72(B, this.utfEncoder)
        })
      }
      serialize(A, B) {
        return new Qe.MessageEncoderStream({
          messageStream: new Qe.SmithyMessageEncoderStream({
            inputStream: A,
            serializer: B
          }),
          encoder: this.eventStreamCodec,
          includeEndFrame: !0
        })
      }
    },
    Ec6 = Xd((A) => new Z72(A), "eventStreamSerdeProvider")
})
// @from(Start 6171894, End 6173847)
V72 = z((Jm8, X72) => {
  var {
    defineProperty: VV1,
    getOwnPropertyDescriptor: Uc6,
    getOwnPropertyNames: Nc6
  } = Object, $c6 = Object.prototype.hasOwnProperty, Ka1 = (A, B) => VV1(A, "name", {
    value: B,
    configurable: !0
  }), qc6 = (A, B) => {
    for (var Q in B) VV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Mc6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Nc6(B))
        if (!$c6.call(A, G) && G !== Q) VV1(A, G, {
          get: () => B[G],
          enumerable: !(I = Uc6(B, G)) || I.enumerable
        })
    }
    return A
  }, Lc6 = (A) => Mc6(VV1({}, "__esModule", {
    value: !0
  }), A), W72 = {};
  qc6(W72, {
    EventStreamMarshaller: () => F72,
    eventStreamSerdeProvider: () => Tc6
  });
  X72.exports = Lc6(W72);
  var Rc6 = Y72(),
    Oc6 = Z1("stream");
  async function* J72(A) {
    let B = !1,
      Q = !1,
      I = new Array;
    A.on("error", (G) => {
      if (!B) B = !0;
      if (G) throw G
    }), A.on("data", (G) => {
      I.push(G)
    }), A.on("end", () => {
      B = !0
    });
    while (!Q) {
      let G = await new Promise((Z) => setTimeout(() => Z(I.shift()), 0));
      if (G) yield G;
      Q = B && I.length === 0
    }
  }
  Ka1(J72, "readabletoIterable");
  var F72 = class {
      static {
        Ka1(this, "EventStreamMarshaller")
      }
      constructor({
        utf8Encoder: A,
        utf8Decoder: B
      }) {
        this.universalMarshaller = new Rc6.EventStreamMarshaller({
          utf8Decoder: B,
          utf8Encoder: A
        })
      }
      deserialize(A, B) {
        let Q = typeof A[Symbol.asyncIterator] === "function" ? A : J72(A);
        return this.universalMarshaller.deserialize(Q, B)
      }
      serialize(A, B) {
        return Oc6.Readable.from(this.universalMarshaller.serialize(A, B))
      }
    },
    Tc6 = Ka1((A) => new F72(A), "eventStreamSerdeProvider")
})
// @from(Start 6173853, End 6176636)
Ha1 = z((Xm8, $72) => {
  var {
    defineProperty: CV1,
    getOwnPropertyDescriptor: Pc6,
    getOwnPropertyNames: Sc6
  } = Object, _c6 = Object.prototype.hasOwnProperty, KV1 = (A, B) => CV1(A, "name", {
    value: B,
    configurable: !0
  }), jc6 = (A, B) => {
    for (var Q in B) CV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, yc6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Sc6(B))
        if (!_c6.call(A, G) && G !== Q) CV1(A, G, {
          get: () => B[G],
          enumerable: !(I = Pc6(B, G)) || I.enumerable
        })
    }
    return A
  }, kc6 = (A) => yc6(CV1({}, "__esModule", {
    value: !0
  }), A), C72 = {};
  jc6(C72, {
    AlgorithmId: () => w72,
    EndpointURLScheme: () => z72,
    FieldPosition: () => E72,
    HttpApiKeyAuthLocation: () => H72,
    HttpAuthLocation: () => K72,
    IniSectionType: () => U72,
    RequestHandlerProtocol: () => N72,
    SMITHY_CONTEXT_KEY: () => gc6,
    getDefaultClientConfiguration: () => vc6,
    resolveDefaultRuntimeConfig: () => bc6
  });
  $72.exports = kc6(C72);
  var K72 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(K72 || {}),
    H72 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(H72 || {}),
    z72 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(z72 || {}),
    w72 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(w72 || {}),
    xc6 = KV1((A) => {
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
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    fc6 = KV1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    vc6 = KV1((A) => {
      return xc6(A)
    }, "getDefaultClientConfiguration"),
    bc6 = KV1((A) => {
      return fc6(A)
    }, "resolveDefaultRuntimeConfig"),
    E72 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(E72 || {}),
    gc6 = "__smithy_context",
    U72 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(U72 || {}),
    N72 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(N72 || {})
})
// @from(Start 6176642, End 6205179)
Ye = z((Vm8, h72) => {
  var {
    defineProperty: wV1,
    getOwnPropertyDescriptor: hc6,
    getOwnPropertyNames: mc6
  } = Object, dc6 = Object.prototype.hasOwnProperty, G2 = (A, B) => wV1(A, "name", {
    value: B,
    configurable: !0
  }), uc6 = (A, B) => {
    for (var Q in B) wV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, pc6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of mc6(B))
        if (!dc6.call(A, G) && G !== Q) wV1(A, G, {
          get: () => B[G],
          enumerable: !(I = hc6(B, G)) || I.enumerable
        })
    }
    return A
  }, cc6 = (A) => pc6(wV1({}, "__esModule", {
    value: !0
  }), A), M72 = {};
  uc6(M72, {
    Client: () => lc6,
    Command: () => R72,
    LazyJsonString: () => lj,
    NoOpLogger: () => dl6,
    SENSITIVE_STRING: () => nc6,
    ServiceException: () => Pl6,
    _json: () => qa1,
    collectBody: () => za1.collectBody,
    convertMap: () => ul6,
    createAggregatedClient: () => ac6,
    dateToUtcString: () => j72,
    decorateServiceException: () => y72,
    emitWarningIfUnsupportedVersion: () => yl6,
    expectBoolean: () => rc6,
    expectByte: () => $a1,
    expectFloat32: () => HV1,
    expectInt: () => tc6,
    expectInt32: () => Ua1,
    expectLong: () => Ze,
    expectNonNull: () => Al6,
    expectNumber: () => Ge,
    expectObject: () => O72,
    expectShort: () => Na1,
    expectString: () => Bl6,
    expectUnion: () => Ql6,
    extendedEncodeURIComponent: () => za1.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => hl6,
    getDefaultClientConfiguration: () => bl6,
    getDefaultExtensionConfiguration: () => x72,
    getValueFromTextNode: () => f72,
    handleFloat: () => Zl6,
    isSerializableHeaderValue: () => ml6,
    limitedParseDouble: () => Ra1,
    limitedParseFloat: () => Dl6,
    limitedParseFloat32: () => Yl6,
    loadConfigsForDefaultMode: () => jl6,
    logger: () => De,
    map: () => Ta1,
    parseBoolean: () => sc6,
    parseEpochTimestamp: () => Ul6,
    parseRfc3339DateTime: () => Vl6,
    parseRfc3339DateTimeWithOffset: () => Kl6,
    parseRfc7231DateTime: () => El6,
    quoteHeader: () => b72,
    resolveDefaultRuntimeConfig: () => gl6,
    resolvedPath: () => za1.resolvedPath,
    serializeDateTime: () => al6,
    serializeFloat: () => nl6,
    splitEvery: () => g72,
    splitHeader: () => sl6,
    strictParseByte: () => _72,
    strictParseDouble: () => La1,
    strictParseFloat: () => Il6,
    strictParseFloat32: () => T72,
    strictParseInt: () => Wl6,
    strictParseInt32: () => Jl6,
    strictParseLong: () => S72,
    strictParseShort: () => Vd,
    take: () => pl6,
    throwDefaultError: () => k72,
    withBaseException: () => Sl6
  });
  h72.exports = cc6(M72);
  var L72 = WN(),
    lc6 = class {
      constructor(A) {
        this.config = A, this.middlewareStack = L72.constructStack()
      }
      static {
        G2(this, "Client")
      }
      send(A, B, Q) {
        let I = typeof B !== "function" ? B : void 0,
          G = typeof B === "function" ? B : Q,
          Z = I === void 0 && this.config.cacheMiddleware === !0,
          D;
        if (Z) {
          if (!this.handlers) this.handlers = new WeakMap;
          let Y = this.handlers;
          if (Y.has(A.constructor)) D = Y.get(A.constructor);
          else D = A.resolveMiddleware(this.middlewareStack, this.config, I), Y.set(A.constructor, D)
        } else delete this.handlers, D = A.resolveMiddleware(this.middlewareStack, this.config, I);
        if (G) D(A).then((Y) => G(null, Y.output), (Y) => G(Y)).catch(() => {});
        else return D(A).then((Y) => Y.output)
      }
      destroy() {
        this.config?.requestHandler?.destroy?.(), delete this.handlers
      }
    },
    za1 = vz(),
    Ea1 = Ha1(),
    R72 = class {
      constructor() {
        this.middlewareStack = L72.constructStack()
      }
      static {
        G2(this, "Command")
      }
      static classBuilder() {
        return new ic6
      }
      resolveMiddlewareWithContext(A, B, Q, {
        middlewareFn: I,
        clientName: G,
        commandName: Z,
        inputFilterSensitiveLog: D,
        outputFilterSensitiveLog: Y,
        smithyContext: W,
        additionalContext: J,
        CommandCtor: F
      }) {
        for (let E of I.bind(this)(F, A, B, Q)) this.middlewareStack.use(E);
        let X = A.concat(this.middlewareStack),
          {
            logger: V
          } = B,
          C = {
            logger: V,
            clientName: G,
            commandName: Z,
            inputFilterSensitiveLog: D,
            outputFilterSensitiveLog: Y,
            [Ea1.SMITHY_CONTEXT_KEY]: {
              commandInstance: this,
              ...W
            },
            ...J
          },
          {
            requestHandler: K
          } = B;
        return X.resolve((E) => K.handle(E.request, Q || {}), C)
      }
    },
    ic6 = class {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
      }
      static {
        G2(this, "ClassBuilder")
      }
      init(A) {
        this._init = A
      }
      ep(A) {
        return this._ep = A, this
      }
      m(A) {
        return this._middlewareFn = A, this
      }
      s(A, B, Q = {}) {
        return this._smithyContext = {
          service: A,
          operation: B,
          ...Q
        }, this
      }
      c(A = {}) {
        return this._additionalContext = A, this
      }
      n(A, B) {
        return this._clientName = A, this._commandName = B, this
      }
      f(A = (Q) => Q, B = (Q) => Q) {
        return this._inputFilterSensitiveLog = A, this._outputFilterSensitiveLog = B, this
      }
      ser(A) {
        return this._serializer = A, this
      }
      de(A) {
        return this._deserializer = A, this
      }
      build() {
        let A = this,
          B;
        return B = class extends R72 {
          constructor(...[Q]) {
            super();
            this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
          }
          static {
            G2(this, "CommandRef")
          }
          static getEndpointParameterInstructions() {
            return A._ep
          }
          resolveMiddleware(Q, I, G) {
            return this.resolveMiddlewareWithContext(Q, I, G, {
              CommandCtor: B,
              middlewareFn: A._middlewareFn,
              clientName: A._clientName,
              commandName: A._commandName,
              inputFilterSensitiveLog: A._inputFilterSensitiveLog,
              outputFilterSensitiveLog: A._outputFilterSensitiveLog,
              smithyContext: A._smithyContext,
              additionalContext: A._additionalContext
            })
          }
        }
      }
    },
    nc6 = "***SensitiveInformation***",
    ac6 = G2((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = G2(async function(D, Y, W) {
            let J = new I(D);
            if (typeof Y === "function") this.send(J, Y);
            else if (typeof W === "function") {
              if (typeof Y !== "object") throw new Error(`Expected http options but got ${typeof Y}`);
              this.send(J, Y || {}, W)
            } else return this.send(J, Y)
          }, "methodImpl"),
          Z = (Q[0].toLowerCase() + Q.slice(1)).replace(/Command$/, "");
        B.prototype[Z] = G
      }
    }, "createAggregatedClient"),
    sc6 = G2((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    rc6 = G2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) De.warn(zV1(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") De.warn(zV1(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    Ge = G2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) De.warn(zV1(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    oc6 = Math.ceil(340282346638528860000000000000000000000),
    HV1 = G2((A) => {
      let B = Ge(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > oc6) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    Ze = G2((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    tc6 = Ze,
    Ua1 = G2((A) => Ma1(A, 32), "expectInt32"),
    Na1 = G2((A) => Ma1(A, 16), "expectShort"),
    $a1 = G2((A) => Ma1(A, 8), "expectByte"),
    Ma1 = G2((A, B) => {
      let Q = Ze(A);
      if (Q !== void 0 && ec6(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    ec6 = G2((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    Al6 = G2((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    O72 = G2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    Bl6 = G2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return De.warn(zV1(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    Ql6 = G2((A) => {
      if (A === null || A === void 0) return;
      let B = O72(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    La1 = G2((A) => {
      if (typeof A == "string") return Ge(Kd(A));
      return Ge(A)
    }, "strictParseDouble"),
    Il6 = La1,
    T72 = G2((A) => {
      if (typeof A == "string") return HV1(Kd(A));
      return HV1(A)
    }, "strictParseFloat32"),
    Gl6 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    Kd = G2((A) => {
      let B = A.match(Gl6);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    Ra1 = G2((A) => {
      if (typeof A == "string") return P72(A);
      return Ge(A)
    }, "limitedParseDouble"),
    Zl6 = Ra1,
    Dl6 = Ra1,
    Yl6 = G2((A) => {
      if (typeof A == "string") return P72(A);
      return HV1(A)
    }, "limitedParseFloat32"),
    P72 = G2((A) => {
      switch (A) {
        case "NaN":
          return NaN;
        case "Infinity":
          return 1 / 0;
        case "-Infinity":
          return -1 / 0;
        default:
          throw new Error(`Unable to parse float value: ${A}`)
      }
    }, "parseFloatString"),
    S72 = G2((A) => {
      if (typeof A === "string") return Ze(Kd(A));
      return Ze(A)
    }, "strictParseLong"),
    Wl6 = S72,
    Jl6 = G2((A) => {
      if (typeof A === "string") return Ua1(Kd(A));
      return Ua1(A)
    }, "strictParseInt32"),
    Vd = G2((A) => {
      if (typeof A === "string") return Na1(Kd(A));
      return Na1(A)
    }, "strictParseShort"),
    _72 = G2((A) => {
      if (typeof A === "string") return $a1(Kd(A));
      return $a1(A)
    }, "strictParseByte"),
    zV1 = G2((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    De = {
      warn: console.warn
    },
    Fl6 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    Oa1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function j72(A) {
    let B = A.getUTCFullYear(),
      Q = A.getUTCMonth(),
      I = A.getUTCDay(),
      G = A.getUTCDate(),
      Z = A.getUTCHours(),
      D = A.getUTCMinutes(),
      Y = A.getUTCSeconds(),
      W = G < 10 ? `0${G}` : `${G}`,
      J = Z < 10 ? `0${Z}` : `${Z}`,
      F = D < 10 ? `0${D}` : `${D}`,
      X = Y < 10 ? `0${Y}` : `${Y}`;
    return `${Fl6[I]}, ${W} ${Oa1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  G2(j72, "dateToUtcString");
  var Xl6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    Vl6 = G2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = Xl6.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = Vd(Cd(I)), X = pw(G, "month", 1, 12), V = pw(Z, "day", 1, 31);
      return Ie(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    Cl6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    Kl6 = G2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = Cl6.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = Vd(Cd(I)), V = pw(G, "month", 1, 12), C = pw(Z, "day", 1, 31), K = Ie(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - Tl6(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    Hl6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    zl6 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    wl6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    El6 = G2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = Hl6.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Ie(Vd(Cd(Z)), wa1(G), pw(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = zl6.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return ql6(Ie(Nl6(Z), wa1(G), pw(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = wl6.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return Ie(Vd(Cd(J)), wa1(I), pw(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    Ul6 = G2((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = La1(A);
      else if (typeof A === "object" && A.tag === 1) B = A.value;
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    Ie = G2((A, B, Q, I) => {
      let G = B - 1;
      return Ll6(A, G, Q), new Date(Date.UTC(A, G, Q, pw(I.hours, "hour", 0, 23), pw(I.minutes, "minute", 0, 59), pw(I.seconds, "seconds", 0, 60), Ol6(I.fractionalMilliseconds)))
    }, "buildDate"),
    Nl6 = G2((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + Vd(Cd(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    $l6 = 1576800000000,
    ql6 = G2((A) => {
      if (A.getTime() - new Date().getTime() > $l6) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    wa1 = G2((A) => {
      let B = Oa1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    Ml6 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Ll6 = G2((A, B, Q) => {
      let I = Ml6[B];
      if (B === 1 && Rl6(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${Oa1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    Rl6 = G2((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    pw = G2((A, B, Q, I) => {
      let G = _72(Cd(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    Ol6 = G2((A) => {
      if (A === null || A === void 0) return 0;
      return T72("0." + A) * 1000
    }, "parseMilliseconds"),
    Tl6 = G2((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    Cd = G2((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    Pl6 = class A extends Error {
      static {
        G2(this, "ServiceException")
      }
      constructor(B) {
        super(B.message);
        Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = B.name, this.$fault = B.$fault, this.$metadata = B.$metadata
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return A.prototype.isPrototypeOf(Q) || Boolean(Q.$fault) && Boolean(Q.$metadata) && (Q.$fault === "client" || Q.$fault === "server")
      }
      static[Symbol.hasInstance](B) {
        if (!B) return !1;
        let Q = B;
        if (this === A) return A.isInstance(B);
        if (A.isInstance(B)) {
          if (Q.name && this.name) return this.prototype.isPrototypeOf(B) || Q.name === this.name;
          return this.prototype.isPrototypeOf(B)
        }
        return !1
      }
    },
    y72 = G2((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    k72 = G2(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = _l6(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: B?.code || B?.Code || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw y72(D, B)
    }, "throwDefaultError"),
    Sl6 = G2((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        k72({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    _l6 = G2((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    jl6 = G2((A) => {
      switch (A) {
        case "standard":
          return {
            retryMode: "standard", connectionTimeout: 3100
          };
        case "in-region":
          return {
            retryMode: "standard", connectionTimeout: 1100
          };
        case "cross-region":
          return {
            retryMode: "standard", connectionTimeout: 3100
          };
        case "mobile":
          return {
            retryMode: "standard", connectionTimeout: 30000
          };
        default:
          return {}
      }
    }, "loadConfigsForDefaultMode"),
    q72 = !1,
    yl6 = G2((A) => {
      if (A && !q72 && parseInt(A.substring(1, A.indexOf("."))) < 16) q72 = !0
    }, "emitWarningIfUnsupportedVersion"),
    kl6 = G2((A) => {
      let B = [];
      for (let Q in Ea1.AlgorithmId) {
        let I = Ea1.AlgorithmId[Q];
        if (A[I] === void 0) continue;
        B.push({
          algorithmId: () => I,
          checksumConstructor: () => A[I]
        })
      }
      return {
        addChecksumAlgorithm(Q) {
          B.push(Q)
        },
        checksumAlgorithms() {
          return B
        }
      }
    }, "getChecksumConfiguration"),
    xl6 = G2((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    fl6 = G2((A) => {
      return {
        setRetryStrategy(B) {
          A.retryStrategy = B
        },
        retryStrategy() {
          return A.retryStrategy
        }
      }
    }, "getRetryConfiguration"),
    vl6 = G2((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    x72 = G2((A) => {
      return Object.assign(kl6(A), fl6(A))
    }, "getDefaultExtensionConfiguration"),
    bl6 = x72,
    gl6 = G2((A) => {
      return Object.assign(xl6(A), vl6(A))
    }, "resolveDefaultRuntimeConfig"),
    hl6 = G2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    f72 = G2((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = f72(A[Q]);
      return A
    }, "getValueFromTextNode"),
    ml6 = G2((A) => {
      return A != null
    }, "isSerializableHeaderValue"),
    lj = G2(function A(B) {
      return Object.assign(new String(B), {
        deserializeJSON() {
          return JSON.parse(String(B))
        },
        toString() {
          return String(B)
        },
        toJSON() {
          return String(B)
        }
      })
    }, "LazyJsonString");
  lj.from = (A) => {
    if (A && typeof A === "object" && (A instanceof lj || ("deserializeJSON" in A))) return A;
    else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return lj(String(A));
    return lj(JSON.stringify(A))
  };
  lj.fromObject = lj.from;
  var dl6 = class {
    static {
      G2(this, "NoOpLogger")
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };

  function Ta1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, cl6(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      v72(I, null, Z, D)
    }
    return I
  }
  G2(Ta1, "map");
  var ul6 = G2((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    pl6 = G2((A, B) => {
      let Q = {};
      for (let I in B) v72(Q, A, B, I);
      return Q
    }, "take"),
    cl6 = G2((A, B, Q) => {
      return Ta1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    v72 = G2((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = ll6, W = il6, J = I] = D;
        if (typeof Y === "function" && Y(B[J]) || typeof Y !== "function" && !!Y) A[I] = W(B[J]);
        return
      }
      let [G, Z] = Q[I];
      if (typeof Z === "function") {
        let D, Y = G === void 0 && (D = Z()) != null,
          W = typeof G === "function" && !!G(void 0) || typeof G !== "function" && !!G;
        if (Y) A[I] = D;
        else if (W) A[I] = Z()
      } else {
        let D = G === void 0 && Z != null,
          Y = typeof G === "function" && !!G(Z) || typeof G !== "function" && !!G;
        if (D || Y) A[I] = Z
      }
    }, "applyInstruction"),
    ll6 = G2((A) => A != null, "nonNullish"),
    il6 = G2((A) => A, "pass");

  function b72(A) {
    if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
    return A
  }
  G2(b72, "quoteHeader");
  var nl6 = G2((A) => {
      if (A !== A) return "NaN";
      switch (A) {
        case 1 / 0:
          return "Infinity";
        case -1 / 0:
          return "-Infinity";
        default:
          return A
      }
    }, "serializeFloat"),
    al6 = G2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
    qa1 = G2((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(qa1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = qa1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function g72(A, B, Q) {
    if (Q <= 0 || !Number.isInteger(Q)) throw new Error("Invalid number of delimiters (" + Q + ") for splitEvery.");
    let I = A.split(B);
    if (Q === 1) return I;
    let G = [],
      Z = "";
    for (let D = 0; D < I.length; D++) {
      if (Z === "") Z = I[D];
      else Z += B + I[D];
      if ((D + 1) % Q === 0) G.push(Z), Z = ""
    }
    if (Z !== "") G.push(Z);
    return G
  }
  G2(g72, "splitEvery");
  var sl6 = G2((A) => {
    let B = A.length,
      Q = [],
      I = !1,
      G = void 0,
      Z = 0;
    for (let D = 0; D < B; ++D) {
      let Y = A[D];
      switch (Y) {
        case '"':
          if (G !== "\\") I = !I;
          break;
        case ",":
          if (!I) Q.push(A.slice(Z, D)), Z = D + 1;
          break;
        default:
      }
      G = Y
    }
    return Q.push(A.slice(Z)), Q.map((D) => {
      D = D.trim();
      let Y = D.length;
      if (Y < 2) return D;
      if (D[0] === '"' && D[Y - 1] === '"') D = D.slice(1, Y - 1);
      return D.replace(/\\"/g, '"')
    })
  }, "splitHeader")
})
// @from(Start 6205185, End 6205675)
u72 = z((m72) => {
  Object.defineProperty(m72, "__esModule", {
    value: !0
  });
  m72.fromBase64 = void 0;
  var rl6 = MZ(),
    ol6 = /^[A-Za-z0-9+/]*={0,2}$/,
    tl6 = (A) => {
      if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
      if (!ol6.exec(A)) throw new TypeError("Invalid base64 string.");
      let B = rl6.fromString(A, "base64");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
    };
  m72.fromBase64 = tl6
})
// @from(Start 6205681, End 6206254)
l72 = z((p72) => {
  Object.defineProperty(p72, "__esModule", {
    value: !0
  });
  p72.toBase64 = void 0;
  var el6 = MZ(),
    Ai6 = RQ(),
    Bi6 = (A) => {
      let B;
      if (typeof A === "string") B = Ai6.fromUtf8(A);
      else B = A;
      if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
      return el6.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
    };
  p72.toBase64 = Bi6
})
// @from(Start 6206260, End 6206956)
a72 = z((Nm8, EV1) => {
  var {
    defineProperty: i72,
    getOwnPropertyDescriptor: Qi6,
    getOwnPropertyNames: Ii6
  } = Object, Gi6 = Object.prototype.hasOwnProperty, Pa1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Ii6(B))
        if (!Gi6.call(A, G) && G !== Q) i72(A, G, {
          get: () => B[G],
          enumerable: !(I = Qi6(B, G)) || I.enumerable
        })
    }
    return A
  }, n72 = (A, B, Q) => (Pa1(A, B, "default"), Q && Pa1(Q, B, "default")), Zi6 = (A) => Pa1(i72({}, "__esModule", {
    value: !0
  }), A), Sa1 = {};
  EV1.exports = Zi6(Sa1);
  n72(Sa1, u72(), EV1.exports);
  n72(Sa1, l72(), EV1.exports)
})
// @from(Start 6206962, End 6211821)
FI2 = z((WI2) => {
  Object.defineProperty(WI2, "__esModule", {
    value: !0
  });
  WI2.ruleSet = void 0;
  var ZI2 = "required",
    lw = "fn",
    iw = "argv",
    zd = "ref",
    s72 = !0,
    r72 = "isSet",
    Je = "booleanEquals",
    Hd = "error",
    We = "endpoint",
    mD = "tree",
    _a1 = "PartitionResult",
    o72 = {
      [ZI2]: !1,
      type: "String"
    },
    t72 = {
      [ZI2]: !0,
      default: !1,
      type: "Boolean"
    },
    e72 = {
      [zd]: "Endpoint"
    },
    DI2 = {
      [lw]: Je,
      [iw]: [{
        [zd]: "UseFIPS"
      }, !0]
    },
    YI2 = {
      [lw]: Je,
      [iw]: [{
        [zd]: "UseDualStack"
      }, !0]
    },
    cw = {},
    AI2 = {
      [lw]: "getAttr",
      [iw]: [{
        [zd]: _a1
      }, "supportsFIPS"]
    },
    BI2 = {
      [lw]: Je,
      [iw]: [!0, {
        [lw]: "getAttr",
        [iw]: [{
          [zd]: _a1
        }, "supportsDualStack"]
      }]
    },
    QI2 = [DI2],
    II2 = [YI2],
    GI2 = [{
      [zd]: "Region"
    }],
    Di6 = {
      version: "1.0",
      parameters: {
        Region: o72,
        UseDualStack: t72,
        UseFIPS: t72,
        Endpoint: o72
      },
      rules: [{
        conditions: [{
          [lw]: r72,
          [iw]: [e72]
        }],
        rules: [{
          conditions: QI2,
          error: "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: Hd
        }, {
          rules: [{
            conditions: II2,
            error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
            type: Hd
          }, {
            endpoint: {
              url: e72,
              properties: cw,
              headers: cw
            },
            type: We
          }],
          type: mD
        }],
        type: mD
      }, {
        rules: [{
          conditions: [{
            [lw]: r72,
            [iw]: GI2
          }],
          rules: [{
            conditions: [{
              [lw]: "aws.partition",
              [iw]: GI2,
              assign: _a1
            }],
            rules: [{
              conditions: [DI2, YI2],
              rules: [{
                conditions: [{
                  [lw]: Je,
                  [iw]: [s72, AI2]
                }, BI2],
                rules: [{
                  rules: [{
                    endpoint: {
                      url: "https://bedrock-runtime-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                      properties: cw,
                      headers: cw
                    },
                    type: We
                  }],
                  type: mD
                }],
                type: mD
              }, {
                error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                type: Hd
              }],
              type: mD
            }, {
              conditions: QI2,
              rules: [{
                conditions: [{
                  [lw]: Je,
                  [iw]: [AI2, s72]
                }],
                rules: [{
                  rules: [{
                    endpoint: {
                      url: "https://bedrock-runtime-fips.{Region}.{PartitionResult#dnsSuffix}",
                      properties: cw,
                      headers: cw
                    },
                    type: We
                  }],
                  type: mD
                }],
                type: mD
              }, {
                error: "FIPS is enabled but this partition does not support FIPS",
                type: Hd
              }],
              type: mD
            }, {
              conditions: II2,
              rules: [{
                conditions: [BI2],
                rules: [{
                  rules: [{
                    endpoint: {
                      url: "https://bedrock-runtime.{Region}.{PartitionResult#dualStackDnsSuffix}",
                      properties: cw,
                      headers: cw
                    },
                    type: We
                  }],
                  type: mD
                }],
                type: mD
              }, {
                error: "DualStack is enabled but this partition does not support DualStack",
                type: Hd
              }],
              type: mD
            }, {
              rules: [{
                endpoint: {
                  url: "https://bedrock-runtime.{Region}.{PartitionResult#dnsSuffix}",
                  properties: cw,
                  headers: cw
                },
                type: We
              }],
              type: mD
            }],
            type: mD
          }],
          type: mD
        }, {
          error: "Invalid Configuration: Missing Region",
          type: Hd
        }],
        type: mD
      }]
    };
  WI2.ruleSet = Di6
})
// @from(Start 6211827, End 6212385)
CI2 = z((XI2) => {
  Object.defineProperty(XI2, "__esModule", {
    value: !0
  });
  XI2.defaultEndpointResolver = void 0;
  var Yi6 = RL(),
    ja1 = LL(),
    Wi6 = FI2(),
    Ji6 = new ja1.EndpointCache({
      size: 50,
      params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
    }),
    Fi6 = (A, B = {}) => {
      return Ji6.get(A, () => ja1.resolveEndpoint(Wi6.ruleSet, {
        endpointParams: A,
        logger: B.logger
      }))
    };
  XI2.defaultEndpointResolver = Fi6;
  ja1.customEndpointFunctions.aws = Yi6.awsEndpointFunctions
})
// @from(Start 6212391, End 6213614)
EI2 = z((zI2) => {
  Object.defineProperty(zI2, "__esModule", {
    value: !0
  });
  zI2.getRuntimeConfig = void 0;
  var Xi6 = IB(),
    Vi6 = Ye(),
    Ci6 = FN(),
    KI2 = a72(),
    HI2 = RQ(),
    Ki6 = Ia1(),
    Hi6 = CI2(),
    zi6 = (A) => {
      return {
        apiVersion: "2023-09-30",
        base64Decoder: A?.base64Decoder ?? KI2.fromBase64,
        base64Encoder: A?.base64Encoder ?? KI2.toBase64,
        disableHostPrefix: A?.disableHostPrefix ?? !1,
        endpointProvider: A?.endpointProvider ?? Hi6.defaultEndpointResolver,
        extensions: A?.extensions ?? [],
        httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? Ki6.defaultBedrockRuntimeHttpAuthSchemeProvider,
        httpAuthSchemes: A?.httpAuthSchemes ?? [{
          schemeId: "aws.auth#sigv4",
          identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
          signer: new Xi6.AwsSdkSigV4Signer
        }],
        logger: A?.logger ?? new Vi6.NoOpLogger,
        serviceId: A?.serviceId ?? "Bedrock Runtime",
        urlParser: A?.urlParser ?? Ci6.parseUrl,
        utf8Decoder: A?.utf8Decoder ?? HI2.fromUtf8,
        utf8Encoder: A?.utf8Encoder ?? HI2.toUtf8
      }
    };
  zI2.getRuntimeConfig = zi6
})
// @from(Start 6213620, End 6216072)
LI2 = z((qI2) => {
  Object.defineProperty(qI2, "__esModule", {
    value: !0
  });
  qI2.getRuntimeConfig = void 0;
  var wi6 = m32(),
    Ei6 = wi6.__importDefault(d32()),
    Ui6 = IB(),
    Ni6 = ha(),
    $i6 = B72(),
    UI2 = I_(),
    UV1 = _D(),
    qi6 = V72(),
    Mi6 = G_(),
    NI2 = KJ(),
    wd = qC(),
    $I2 = DN(),
    Li6 = Z_(),
    Ri6 = vL(),
    Oi6 = EI2(),
    Ti6 = Ye(),
    Pi6 = Y_(),
    Si6 = Ye(),
    _i6 = (A) => {
      Si6.emitWarningIfUnsupportedVersion(process.version);
      let B = Pi6.resolveDefaultsModeConfig(A),
        Q = () => B().then(Ti6.loadConfigsForDefaultMode),
        I = Oi6.getRuntimeConfig(A);
      Ui6.emitWarningIfUnsupportedVersion(process.version);
      let G = {
        profile: A?.profile
      };
      return {
        ...I,
        ...A,
        runtime: "node",
        defaultsMode: B,
        bodyLengthChecker: A?.bodyLengthChecker ?? Li6.calculateBodyLength,
        credentialDefaultProvider: A?.credentialDefaultProvider ?? Ni6.defaultProvider,
        defaultUserAgentProvider: A?.defaultUserAgentProvider ?? UI2.createDefaultUserAgentProvider({
          serviceId: I.serviceId,
          clientVersion: Ei6.default.version
        }),
        eventStreamPayloadHandlerProvider: A?.eventStreamPayloadHandlerProvider ?? $i6.eventStreamPayloadHandlerProvider,
        eventStreamSerdeProvider: A?.eventStreamSerdeProvider ?? qi6.eventStreamSerdeProvider,
        maxAttempts: A?.maxAttempts ?? wd.loadConfig(NI2.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
        region: A?.region ?? wd.loadConfig(UV1.NODE_REGION_CONFIG_OPTIONS, {
          ...UV1.NODE_REGION_CONFIG_FILE_OPTIONS,
          ...G
        }),
        requestHandler: $I2.NodeHttpHandler.create(A?.requestHandler ?? Q),
        retryMode: A?.retryMode ?? wd.loadConfig({
          ...NI2.NODE_RETRY_MODE_CONFIG_OPTIONS,
          default: async () => (await Q()).retryMode || Ri6.DEFAULT_RETRY_MODE
        }, A),
        sha256: A?.sha256 ?? Mi6.Hash.bind(null, "sha256"),
        streamCollector: A?.streamCollector ?? $I2.streamCollector,
        useDualstackEndpoint: A?.useDualstackEndpoint ?? wd.loadConfig(UV1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, G),
        useFipsEndpoint: A?.useFipsEndpoint ?? wd.loadConfig(UV1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, G),
        userAgentAppId: A?.userAgentAppId ?? wd.loadConfig(UI2.NODE_APP_ID_CONFIG_OPTIONS, G)
      }
    };
  qI2.getRuntimeConfig = _i6
})
// @from(Start 6216078, End 6220585)
_I2 = z((Rm8, SI2) => {
  var {
    defineProperty: NV1,
    getOwnPropertyDescriptor: ji6,
    getOwnPropertyNames: yi6
  } = Object, ki6 = Object.prototype.hasOwnProperty, DO = (A, B) => NV1(A, "name", {
    value: B,
    configurable: !0
  }), xi6 = (A, B) => {
    for (var Q in B) NV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, fi6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of yi6(B))
        if (!ki6.call(A, G) && G !== Q) NV1(A, G, {
          get: () => B[G],
          enumerable: !(I = ji6(B, G)) || I.enumerable
        })
    }
    return A
  }, vi6 = (A) => fi6(NV1({}, "__esModule", {
    value: !0
  }), A), RI2 = {};
  xi6(RI2, {
    Field: () => hi6,
    Fields: () => mi6,
    HttpRequest: () => di6,
    HttpResponse: () => ui6,
    IHttpRequest: () => OI2.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => bi6,
    isValidHostname: () => PI2,
    resolveHttpHandlerRuntimeConfig: () => gi6
  });
  SI2.exports = vi6(RI2);
  var bi6 = DO((A) => {
      return {
        setHttpHandler(B) {
          A.httpHandler = B
        },
        httpHandler() {
          return A.httpHandler
        },
        updateHttpClientConfig(B, Q) {
          A.httpHandler?.updateHttpClientConfig(B, Q)
        },
        httpHandlerConfigs() {
          return A.httpHandler.httpHandlerConfigs()
        }
      }
    }, "getHttpHandlerExtensionConfiguration"),
    gi6 = DO((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    OI2 = Ha1(),
    hi6 = class {
      static {
        DO(this, "Field")
      }
      constructor({
        name: A,
        kind: B = OI2.FieldPosition.HEADER,
        values: Q = []
      }) {
        this.name = A, this.kind = B, this.values = Q
      }
      add(A) {
        this.values.push(A)
      }
      set(A) {
        this.values = A
      }
      remove(A) {
        this.values = this.values.filter((B) => B !== A)
      }
      toString() {
        return this.values.map((A) => A.includes(",") || A.includes(" ") ? `"${A}"` : A).join(", ")
      }
      get() {
        return this.values
      }
    },
    mi6 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        DO(this, "Fields")
      }
      setField(A) {
        this.entries[A.name.toLowerCase()] = A
      }
      getField(A) {
        return this.entries[A.toLowerCase()]
      }
      removeField(A) {
        delete this.entries[A.toLowerCase()]
      }
      getByType(A) {
        return Object.values(this.entries).filter((B) => B.kind === A)
      }
    },
    di6 = class A {
      static {
        DO(this, "HttpRequest")
      }
      constructor(B) {
        this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
      }
      static clone(B) {
        let Q = new A({
          ...B,
          headers: {
            ...B.headers
          }
        });
        if (Q.query) Q.query = TI2(Q.query);
        return Q
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
      }
      clone() {
        return A.clone(this)
      }
    };

  function TI2(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  DO(TI2, "cloneQuery");
  var ui6 = class {
    static {
      DO(this, "HttpResponse")
    }
    constructor(A) {
      this.statusCode = A.statusCode, this.reason = A.reason, this.headers = A.headers || {}, this.body = A.body
    }
    static isInstance(A) {
      if (!A) return !1;
      let B = A;
      return typeof B.statusCode === "number" && typeof B.headers === "object"
    }
  };

  function PI2(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  DO(PI2, "isValidHostname")
})
// @from(Start 6220591, End 6221003)
ya1 = z((jI2) => {
  Object.defineProperty(jI2, "__esModule", {
    value: !0
  });
  jI2.default = li6;
  var pi6 = ci6(Z1("crypto"));

  function ci6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var qV1 = new Uint8Array(256),
    $V1 = qV1.length;

  function li6() {
    if ($V1 > qV1.length - 16) pi6.default.randomFillSync(qV1), $V1 = 0;
    return qV1.slice($V1, $V1 += 16)
  }
})
// @from(Start 6221009, End 6221270)
xI2 = z((yI2) => {
  Object.defineProperty(yI2, "__esModule", {
    value: !0
  });
  yI2.default = void 0;
  var ni6 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  yI2.default = ni6
})
// @from(Start 6221276, End 6221612)
Fe = z((fI2) => {
  Object.defineProperty(fI2, "__esModule", {
    value: !0
  });
  fI2.default = void 0;
  var ai6 = si6(xI2());

  function si6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function ri6(A) {
    return typeof A === "string" && ai6.default.test(A)
  }
  var oi6 = ri6;
  fI2.default = oi6
})
// @from(Start 6221618, End 6222442)
Xe = z((gI2) => {
  Object.defineProperty(gI2, "__esModule", {
    value: !0
  });
  gI2.default = void 0;
  gI2.unsafeStringify = bI2;
  var ti6 = ei6(Fe());

  function ei6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var xG = [];
  for (let A = 0; A < 256; ++A) xG.push((A + 256).toString(16).slice(1));

  function bI2(A, B = 0) {
    return xG[A[B + 0]] + xG[A[B + 1]] + xG[A[B + 2]] + xG[A[B + 3]] + "-" + xG[A[B + 4]] + xG[A[B + 5]] + "-" + xG[A[B + 6]] + xG[A[B + 7]] + "-" + xG[A[B + 8]] + xG[A[B + 9]] + "-" + xG[A[B + 10]] + xG[A[B + 11]] + xG[A[B + 12]] + xG[A[B + 13]] + xG[A[B + 14]] + xG[A[B + 15]]
  }

  function An6(A, B = 0) {
    let Q = bI2(A, B);
    if (!ti6.default(Q)) throw TypeError("Stringified UUID is invalid");
    return Q
  }
  var Bn6 = An6;
  gI2.default = Bn6
})
// @from(Start 6222448, End 6223985)
pI2 = z((dI2) => {
  Object.defineProperty(dI2, "__esModule", {
    value: !0
  });
  dI2.default = void 0;
  var In6 = Zn6(ya1()),
    Gn6 = Xe();

  function Zn6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var mI2, ka1, xa1 = 0,
    fa1 = 0;

  function Dn6(A, B, Q) {
    let I = B && Q || 0,
      G = B || new Array(16);
    A = A || {};
    let Z = A.node || mI2,
      D = A.clockseq !== void 0 ? A.clockseq : ka1;
    if (Z == null || D == null) {
      let V = A.random || (A.rng || In6.default)();
      if (Z == null) Z = mI2 = [V[0] | 1, V[1], V[2], V[3], V[4], V[5]];
      if (D == null) D = ka1 = (V[6] << 8 | V[7]) & 16383
    }
    let Y = A.msecs !== void 0 ? A.msecs : Date.now(),
      W = A.nsecs !== void 0 ? A.nsecs : fa1 + 1,
      J = Y - xa1 + (W - fa1) / 1e4;
    if (J < 0 && A.clockseq === void 0) D = D + 1 & 16383;
    if ((J < 0 || Y > xa1) && A.nsecs === void 0) W = 0;
    if (W >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    xa1 = Y, fa1 = W, ka1 = D, Y += 12219292800000;
    let F = ((Y & 268435455) * 1e4 + W) % 4294967296;
    G[I++] = F >>> 24 & 255, G[I++] = F >>> 16 & 255, G[I++] = F >>> 8 & 255, G[I++] = F & 255;
    let X = Y / 4294967296 * 1e4 & 268435455;
    G[I++] = X >>> 8 & 255, G[I++] = X & 255, G[I++] = X >>> 24 & 15 | 16, G[I++] = X >>> 16 & 255, G[I++] = D >>> 8 | 128, G[I++] = D & 255;
    for (let V = 0; V < 6; ++V) G[I + V] = Z[V];
    return B || Gn6.unsafeStringify(G)
  }
  var Yn6 = Dn6;
  dI2.default = Yn6
})
// @from(Start 6223991, End 6224869)
va1 = z((cI2) => {
  Object.defineProperty(cI2, "__esModule", {
    value: !0
  });
  cI2.default = void 0;
  var Wn6 = Jn6(Fe());

  function Jn6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function Fn6(A) {
    if (!Wn6.default(A)) throw TypeError("Invalid UUID");
    let B, Q = new Uint8Array(16);
    return Q[0] = (B = parseInt(A.slice(0, 8), 16)) >>> 24, Q[1] = B >>> 16 & 255, Q[2] = B >>> 8 & 255, Q[3] = B & 255, Q[4] = (B = parseInt(A.slice(9, 13), 16)) >>> 8, Q[5] = B & 255, Q[6] = (B = parseInt(A.slice(14, 18), 16)) >>> 8, Q[7] = B & 255, Q[8] = (B = parseInt(A.slice(19, 23), 16)) >>> 8, Q[9] = B & 255, Q[10] = (B = parseInt(A.slice(24, 36), 16)) / 1099511627776 & 255, Q[11] = B / 4294967296 & 255, Q[12] = B >>> 24 & 255, Q[13] = B >>> 16 & 255, Q[14] = B >>> 8 & 255, Q[15] = B & 255, Q
  }
  var Xn6 = Fn6;
  cI2.default = Xn6
})
// @from(Start 6224875, End 6226135)
ba1 = z((aI2) => {
  Object.defineProperty(aI2, "__esModule", {
    value: !0
  });
  aI2.URL = aI2.DNS = void 0;
  aI2.default = zn6;
  var Vn6 = Xe(),
    Cn6 = Kn6(va1());

  function Kn6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function Hn6(A) {
    A = unescape(encodeURIComponent(A));
    let B = [];
    for (let Q = 0; Q < A.length; ++Q) B.push(A.charCodeAt(Q));
    return B
  }
  var iI2 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  aI2.DNS = iI2;
  var nI2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  aI2.URL = nI2;

  function zn6(A, B, Q) {
    function I(G, Z, D, Y) {
      var W;
      if (typeof G === "string") G = Hn6(G);
      if (typeof Z === "string") Z = Cn6.default(Z);
      if (((W = Z) === null || W === void 0 ? void 0 : W.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      let J = new Uint8Array(16 + G.length);
      if (J.set(Z), J.set(G, Z.length), J = Q(J), J[6] = J[6] & 15 | B, J[8] = J[8] & 63 | 128, D) {
        Y = Y || 0;
        for (let F = 0; F < 16; ++F) D[Y + F] = J[F];
        return D
      }
      return Vn6.unsafeStringify(J)
    }
    try {
      I.name = A
    } catch (G) {}
    return I.DNS = iI2, I.URL = nI2, I
  }
})
// @from(Start 6226141, End 6226599)
tI2 = z((rI2) => {
  Object.defineProperty(rI2, "__esModule", {
    value: !0
  });
  rI2.default = void 0;
  var Un6 = Nn6(Z1("crypto"));

  function Nn6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function $n6(A) {
    if (Array.isArray(A)) A = Buffer.from(A);
    else if (typeof A === "string") A = Buffer.from(A, "utf8");
    return Un6.default.createHash("md5").update(A).digest()
  }
  var qn6 = $n6;
  rI2.default = qn6
})
// @from(Start 6226605, End 6226929)
QG2 = z((AG2) => {
  Object.defineProperty(AG2, "__esModule", {
    value: !0
  });
  AG2.default = void 0;
  var Mn6 = eI2(ba1()),
    Ln6 = eI2(tI2());

  function eI2(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var Rn6 = Mn6.default("v3", 48, Ln6.default),
    On6 = Rn6;
  AG2.default = On6
})
// @from(Start 6226935, End 6227239)
ZG2 = z((IG2) => {
  Object.defineProperty(IG2, "__esModule", {
    value: !0
  });
  IG2.default = void 0;
  var Tn6 = Pn6(Z1("crypto"));

  function Pn6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var Sn6 = {
    randomUUID: Tn6.default.randomUUID
  };
  IG2.default = Sn6
})
// @from(Start 6227245, End 6227899)
FG2 = z((WG2) => {
  Object.defineProperty(WG2, "__esModule", {
    value: !0
  });
  WG2.default = void 0;
  var DG2 = YG2(ZG2()),
    _n6 = YG2(ya1()),
    jn6 = Xe();

  function YG2(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function yn6(A, B, Q) {
    if (DG2.default.randomUUID && !B && !A) return DG2.default.randomUUID();
    A = A || {};
    let I = A.random || (A.rng || _n6.default)();
    if (I[6] = I[6] & 15 | 64, I[8] = I[8] & 63 | 128, B) {
      Q = Q || 0;
      for (let G = 0; G < 16; ++G) B[Q + G] = I[G];
      return B
    }
    return jn6.unsafeStringify(I)
  }
  var kn6 = yn6;
  WG2.default = kn6
})
// @from(Start 6227905, End 6228364)
CG2 = z((XG2) => {
  Object.defineProperty(XG2, "__esModule", {
    value: !0
  });
  XG2.default = void 0;
  var xn6 = fn6(Z1("crypto"));

  function fn6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function vn6(A) {
    if (Array.isArray(A)) A = Buffer.from(A);
    else if (typeof A === "string") A = Buffer.from(A, "utf8");
    return xn6.default.createHash("sha1").update(A).digest()
  }
  var bn6 = vn6;
  XG2.default = bn6
})
// @from(Start 6228370, End 6228694)
wG2 = z((HG2) => {
  Object.defineProperty(HG2, "__esModule", {
    value: !0
  });
  HG2.default = void 0;
  var gn6 = KG2(ba1()),
    hn6 = KG2(CG2());

  function KG2(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var mn6 = gn6.default("v5", 80, hn6.default),
    dn6 = mn6;
  HG2.default = dn6
})
// @from(Start 6228700, End 6228882)
NG2 = z((EG2) => {
  Object.defineProperty(EG2, "__esModule", {
    value: !0
  });
  EG2.default = void 0;
  var un6 = "00000000-0000-0000-0000-000000000000";
  EG2.default = un6
})
// @from(Start 6228888, End 6229267)
MG2 = z(($G2) => {
  Object.defineProperty($G2, "__esModule", {
    value: !0
  });
  $G2.default = void 0;
  var pn6 = cn6(Fe());

  function cn6(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function ln6(A) {
    if (!pn6.default(A)) throw TypeError("Invalid UUID");
    return parseInt(A.slice(14, 15), 16)
  }
  var in6 = ln6;
  $G2.default = in6
})
// @from(Start 6229273, End 6230687)
LG2 = z((HK) => {
  Object.defineProperty(HK, "__esModule", {
    value: !0
  });
  Object.defineProperty(HK, "NIL", {
    enumerable: !0,
    get: function() {
      return on6.default
    }
  });
  Object.defineProperty(HK, "parse", {
    enumerable: !0,
    get: function() {
      return Ba6.default
    }
  });
  Object.defineProperty(HK, "stringify", {
    enumerable: !0,
    get: function() {
      return Aa6.default
    }
  });
  Object.defineProperty(HK, "v1", {
    enumerable: !0,
    get: function() {
      return nn6.default
    }
  });
  Object.defineProperty(HK, "v3", {
    enumerable: !0,
    get: function() {
      return an6.default
    }
  });
  Object.defineProperty(HK, "v4", {
    enumerable: !0,
    get: function() {
      return sn6.default
    }
  });
  Object.defineProperty(HK, "v5", {
    enumerable: !0,
    get: function() {
      return rn6.default
    }
  });
  Object.defineProperty(HK, "validate", {
    enumerable: !0,
    get: function() {
      return en6.default
    }
  });
  Object.defineProperty(HK, "version", {
    enumerable: !0,
    get: function() {
      return tn6.default
    }
  });
  var nn6 = F$(pI2()),
    an6 = F$(QG2()),
    sn6 = F$(FG2()),
    rn6 = F$(wG2()),
    on6 = F$(NG2()),
    tn6 = F$(MG2()),
    en6 = F$(Fe()),
    Aa6 = F$(Xe()),
    Ba6 = F$(va1());

  function F$(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
})