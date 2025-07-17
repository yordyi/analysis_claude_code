
// @from(Start 9062904, End 9074381)
class It {
  constructor() {
    iX.add(this), this.messages = [], this.receivedMessages = [], nR.set(this, void 0), this.controller = new AbortController, to.set(this, void 0), TJ1.set(this, () => {}), eo.set(this, () => {}), At.set(this, void 0), PJ1.set(this, () => {}), Bt.set(this, () => {}), Q$.set(this, {}), Qt.set(this, !1), SJ1.set(this, !1), _J1.set(this, !1), Mm.set(this, !1), jJ1.set(this, void 0), yJ1.set(this, void 0), ec1.set(this, (A) => {
      if (Q4(this, SJ1, !0, "f"), tN(A)) A = new _I;
      if (A instanceof _I) return Q4(this, _J1, !0, "f"), this._emit("abort", A);
      if (A instanceof P9) return this._emit("error", A);
      if (A instanceof Error) {
        let B = new P9(A.message);
        return B.cause = A, this._emit("error", B)
      }
      return this._emit("error", new P9(String(A)))
    }), Q4(this, to, new Promise((A, B) => {
      Q4(this, TJ1, A, "f"), Q4(this, eo, B, "f")
    }), "f"), Q4(this, At, new Promise((A, B) => {
      Q4(this, PJ1, A, "f"), Q4(this, Bt, B, "f")
    }), "f"), X0(this, to, "f").catch(() => {}), X0(this, At, "f").catch(() => {})
  }
  get response() {
    return X0(this, jJ1, "f")
  }
  get request_id() {
    return X0(this, yJ1, "f")
  }
  async withResponse() {
    let A = await X0(this, to, "f");
    if (!A) throw new Error("Could not resolve a `Response` object");
    return {
      data: this,
      response: A,
      request_id: A.headers.get("request-id")
    }
  }
  static fromReadableStream(A) {
    let B = new It;
    return B._run(() => B._fromReadableStream(A)), B
  }
  static createMessage(A, B, Q) {
    let I = new It;
    for (let G of B.messages) I._addMessageParam(G);
    return I._run(() => I._createMessage(A, {
      ...B,
      stream: !0
    }, {
      ...Q,
      headers: {
        ...Q?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), I
  }
  _run(A) {
    A().then(() => {
      this._emitFinal(), this._emit("end")
    }, X0(this, ec1, "f"))
  }
  _addMessageParam(A) {
    this.messages.push(A)
  }
  _addMessage(A, B = !0) {
    if (this.receivedMessages.push(A), B) this._emit("message", A)
  }
  async _createMessage(A, B, Q) {
    let I = Q?.signal;
    if (I) {
      if (I.aborted) this.controller.abort();
      I.addEventListener("abort", () => this.controller.abort())
    }
    X0(this, iX, "m", Al1).call(this);
    let {
      response: G,
      data: Z
    } = await A.create({
      ...B,
      stream: !0
    }, {
      ...Q,
      signal: this.controller.signal
    }).withResponse();
    this._connected(G);
    for await (let D of Z) X0(this, iX, "m", Bl1).call(this, D);
    if (Z.controller.signal?.aborted) throw new _I;
    X0(this, iX, "m", Ql1).call(this)
  }
  _connected(A) {
    if (this.ended) return;
    Q4(this, jJ1, A, "f"), Q4(this, yJ1, A?.headers.get("request-id"), "f"), X0(this, TJ1, "f").call(this, A), this._emit("connect")
  }
  get ended() {
    return X0(this, Qt, "f")
  }
  get errored() {
    return X0(this, SJ1, "f")
  }
  get aborted() {
    return X0(this, _J1, "f")
  }
  abort() {
    this.controller.abort()
  }
  on(A, B) {
    return (X0(this, Q$, "f")[A] || (X0(this, Q$, "f")[A] = [])).push({
      listener: B
    }), this
  }
  off(A, B) {
    let Q = X0(this, Q$, "f")[A];
    if (!Q) return this;
    let I = Q.findIndex((G) => G.listener === B);
    if (I >= 0) Q.splice(I, 1);
    return this
  }
  once(A, B) {
    return (X0(this, Q$, "f")[A] || (X0(this, Q$, "f")[A] = [])).push({
      listener: B,
      once: !0
    }), this
  }
  emitted(A) {
    return new Promise((B, Q) => {
      if (Q4(this, Mm, !0, "f"), A !== "error") this.once("error", Q);
      this.once(A, B)
    })
  }
  async done() {
    Q4(this, Mm, !0, "f"), await X0(this, At, "f")
  }
  get currentMessage() {
    return X0(this, nR, "f")
  }
  async finalMessage() {
    return await this.done(), X0(this, iX, "m", tc1).call(this)
  }
  async finalText() {
    return await this.done(), X0(this, iX, "m", is0).call(this)
  }
  _emit(A, ...B) {
    if (X0(this, Qt, "f")) return;
    if (A === "end") Q4(this, Qt, !0, "f"), X0(this, PJ1, "f").call(this);
    let Q = X0(this, Q$, "f")[A];
    if (Q) X0(this, Q$, "f")[A] = Q.filter((I) => !I.once), Q.forEach(({
      listener: I
    }) => I(...B));
    if (A === "abort") {
      let I = B[0];
      if (!X0(this, Mm, "f") && !Q?.length) Promise.reject(I);
      X0(this, eo, "f").call(this, I), X0(this, Bt, "f").call(this, I), this._emit("end");
      return
    }
    if (A === "error") {
      let I = B[0];
      if (!X0(this, Mm, "f") && !Q?.length) Promise.reject(I);
      X0(this, eo, "f").call(this, I), X0(this, Bt, "f").call(this, I), this._emit("end")
    }
  }
  _emitFinal() {
    if (this.receivedMessages.at(-1)) this._emit("finalMessage", X0(this, iX, "m", tc1).call(this))
  }
  async _fromReadableStream(A, B) {
    let Q = B?.signal;
    if (Q) {
      if (Q.aborted) this.controller.abort();
      Q.addEventListener("abort", () => this.controller.abort())
    }
    X0(this, iX, "m", Al1).call(this), this._connected(null);
    let I = bD.fromReadableStream(A, this.controller);
    for await (let G of I) X0(this, iX, "m", Bl1).call(this, G);
    if (I.controller.signal?.aborted) throw new _I;
    X0(this, iX, "m", Ql1).call(this)
  } [(nR = new WeakMap, to = new WeakMap, TJ1 = new WeakMap, eo = new WeakMap, At = new WeakMap, PJ1 = new WeakMap, Bt = new WeakMap, Q$ = new WeakMap, Qt = new WeakMap, SJ1 = new WeakMap, _J1 = new WeakMap, Mm = new WeakMap, jJ1 = new WeakMap, yJ1 = new WeakMap, ec1 = new WeakMap, iX = new WeakSet, tc1 = function A() {
    if (this.receivedMessages.length === 0) throw new P9("stream ended without producing a Message with role=assistant");
    return this.receivedMessages.at(-1)
  }, is0 = function A() {
    if (this.receivedMessages.length === 0) throw new P9("stream ended without producing a Message with role=assistant");
    let B = this.receivedMessages.at(-1).content.filter((Q) => Q.type === "text").map((Q) => Q.text);
    if (B.length === 0) throw new P9("stream ended without producing a content block with type=text");
    return B.join(" ")
  }, Al1 = function A() {
    if (this.ended) return;
    Q4(this, nR, void 0, "f")
  }, Bl1 = function A(B) {
    if (this.ended) return;
    let Q = X0(this, iX, "m", ns0).call(this, B);
    switch (this._emit("streamEvent", B, Q), B.type) {
      case "content_block_delta": {
        let I = Q.content.at(-1);
        switch (B.delta.type) {
          case "text_delta": {
            if (I.type === "text") this._emit("text", B.delta.text, I.text || "");
            break
          }
          case "citations_delta": {
            if (I.type === "text") this._emit("citation", B.delta.citation, I.citations ?? []);
            break
          }
          case "input_json_delta": {
            if (I.type === "tool_use" && I.input) this._emit("inputJson", B.delta.partial_json, I.input);
            break
          }
          case "thinking_delta": {
            if (I.type === "thinking") this._emit("thinking", B.delta.thinking, I.thinking);
            break
          }
          case "signature_delta": {
            if (I.type === "thinking") this._emit("signature", I.signature);
            break
          }
          default:
            ss0(B.delta)
        }
        break
      }
      case "message_stop": {
        this._addMessageParam(Q), this._addMessage(Q, !0);
        break
      }
      case "content_block_stop": {
        this._emit("contentBlock", Q.content.at(-1));
        break
      }
      case "message_start": {
        Q4(this, nR, Q, "f");
        break
      }
      case "content_block_start":
      case "message_delta":
        break
    }
  }, Ql1 = function A() {
    if (this.ended) throw new P9("stream has ended, this shouldn't happen");
    let B = X0(this, nR, "f");
    if (!B) throw new P9("request ended without sending any chunks");
    return Q4(this, nR, void 0, "f"), B
  }, ns0 = function A(B) {
    let Q = X0(this, nR, "f");
    if (B.type === "message_start") {
      if (Q) throw new P9(`Unexpected event order, got ${B.type} before receiving "message_stop"`);
      return B.message
    }
    if (!Q) throw new P9(`Unexpected event order, got ${B.type} before "message_start"`);
    switch (B.type) {
      case "message_stop":
        return Q;
      case "message_delta":
        if (Q.stop_reason = B.delta.stop_reason, Q.stop_sequence = B.delta.stop_sequence, Q.usage.output_tokens = B.usage.output_tokens, B.usage.input_tokens != null) Q.usage.input_tokens = B.usage.input_tokens;
        if (B.usage.cache_creation_input_tokens != null) Q.usage.cache_creation_input_tokens = B.usage.cache_creation_input_tokens;
        if (B.usage.cache_read_input_tokens != null) Q.usage.cache_read_input_tokens = B.usage.cache_read_input_tokens;
        if (B.usage.server_tool_use != null) Q.usage.server_tool_use = B.usage.server_tool_use;
        return Q;
      case "content_block_start":
        return Q.content.push(B.content_block), Q;
      case "content_block_delta": {
        let I = Q.content.at(B.index);
        switch (B.delta.type) {
          case "text_delta": {
            if (I?.type === "text") I.text += B.delta.text;
            break
          }
          case "citations_delta": {
            if (I?.type === "text") I.citations ?? (I.citations = []), I.citations.push(B.delta.citation);
            break
          }
          case "input_json_delta": {
            if (I?.type === "tool_use") {
              let G = I[as0] || "";
              if (G += B.delta.partial_json, Object.defineProperty(I, as0, {
                  value: G,
                  enumerable: !1,
                  writable: !0
                }), G) I.input = OJ1(G)
            }
            break
          }
          case "thinking_delta": {
            if (I?.type === "thinking") I.thinking += B.delta.thinking;
            break
          }
          case "signature_delta": {
            if (I?.type === "thinking") I.signature = B.delta.signature;
            break
          }
          default:
            ss0(B.delta)
        }
        return Q
      }
      case "content_block_stop":
        return Q
    }
  }, Symbol.asyncIterator)]() {
    let A = [],
      B = [],
      Q = !1;
    return this.on("streamEvent", (I) => {
      let G = B.shift();
      if (G) G.resolve(I);
      else A.push(I)
    }), this.on("end", () => {
      Q = !0;
      for (let I of B) I.resolve(void 0);
      B.length = 0
    }), this.on("abort", (I) => {
      Q = !0;
      for (let G of B) G.reject(I);
      B.length = 0
    }), this.on("error", (I) => {
      Q = !0;
      for (let G of B) G.reject(I);
      B.length = 0
    }), {
      next: async () => {
        if (!A.length) {
          if (Q) return {
            value: void 0,
            done: !0
          };
          return new Promise((G, Z) => B.push({
            resolve: G,
            reject: Z
          })).then((G) => G ? {
            value: G,
            done: !1
          } : {
            value: void 0,
            done: !0
          })
        }
        return {
          value: A.shift(),
          done: !1
        }
      },
      return: async () => {
        return this.abort(), {
          value: void 0,
          done: !0
        }
      }
    }
  }
  toReadableStream() {
    return new bD(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream()
  }
}
// @from(Start 9074383, End 9074401)
function ss0(A) {}
// @from(Start 9074406, End 9074757)
rs0 = {
  "claude-1.3": "November 6th, 2024",
  "claude-1.3-100k": "November 6th, 2024",
  "claude-instant-1.1": "November 6th, 2024",
  "claude-instant-1.1-100k": "November 6th, 2024",
  "claude-instant-1.2": "November 6th, 2024",
  "claude-3-sonnet-20240229": "July 21st, 2025",
  "claude-2.1": "July 21st, 2025",
  "claude-2.0": "July 21st, 2025"
}
// @from(Start 9074759, End 9075938)
class Lm extends kG {
  constructor() {
    super(...arguments);
    this.batches = new oo(this._client)
  }
  create(A, B) {
    let {
      betas: Q,
      ...I
    } = A;
    if (I.model in rs0) console.warn(`The model '${I.model}' is deprecated and will reach end-of-life on ${rs0[I.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);
    return this._client.post("/v1/messages?beta=true", {
      body: I,
      timeout: this._client._options.timeout ?? (I.stream ? 600000 : this._client._calculateNonstreamingTimeout(I.max_tokens)),
      ...B,
      headers: YB([{
        ...Q?.toString() != null ? {
          "anthropic-beta": Q?.toString()
        } : void 0
      }, B?.headers]),
      stream: A.stream ?? !1
    })
  }
  stream(A, B) {
    return It.createMessage(this, A, B)
  }
  countTokens(A, B) {
    let {
      betas: Q,
      ...I
    } = A;
    return this._client.post("/v1/messages/count_tokens?beta=true", {
      body: I,
      ...B,
      headers: YB([{
        "anthropic-beta": [...Q ?? [], "token-counting-2024-11-01"].toString()
      }, B?.headers])
    })
  }
}
// @from(Start 9075956, End 9076103)
class nX extends kG {
  constructor() {
    super(...arguments);
    this.models = new ro(this._client), this.messages = new Lm(this._client)
  }
}
// @from(Start 9076138, End 9076538)
class aR extends kG {
  create(A, B) {
    let {
      betas: Q,
      ...I
    } = A;
    return this._client.post("/v1/complete", {
      body: I,
      timeout: this._client._options.timeout ?? 600000,
      ...B,
      headers: YB([{
        ...Q?.toString() != null ? {
          "anthropic-beta": Q?.toString()
        } : void 0
      }, B?.headers]),
      stream: A.stream ?? !1
    })
  }
}
// @from(Start 9076539, End 9077503)
class Gt extends kG {
  create(A, B) {
    return this._client.post("/v1/messages/batches", {
      body: A,
      ...B
    })
  }
  retrieve(A, B) {
    return this._client.get(lX`/v1/messages/batches/${A}`, B)
  }
  list(A = {}, B) {
    return this._client.getAPIList("/v1/messages/batches", B$, {
      query: A,
      ...B
    })
  }
  delete(A, B) {
    return this._client.delete(lX`/v1/messages/batches/${A}`, B)
  }
  cancel(A, B) {
    return this._client.post(lX`/v1/messages/batches/${A}/cancel`, B)
  }
  async results(A, B) {
    let Q = await this.retrieve(A);
    if (!Q.results_url) throw new P9(`No batch \`results_url\`; Has it finished processing? ${Q.processing_status} - ${Q.id}`);
    return this._client.get(Q.results_url, {
      ...B,
      headers: YB([{
        Accept: "application/binary"
      }, B?.headers]),
      stream: !0,
      __binaryResponse: !0
    })._thenUnwrap((I, G) => $m.fromResponse(G.response, G.controller))
  }
}
// @from(Start 9077508, End 9077510)
aX
// @from(Start 9077512, End 9077514)
sR
// @from(Start 9077516, End 9077518)
Zt
// @from(Start 9077520, End 9077523)
kJ1
// @from(Start 9077525, End 9077527)
Dt
// @from(Start 9077529, End 9077531)
Yt
// @from(Start 9077533, End 9077536)
xJ1
// @from(Start 9077538, End 9077540)
Wt
// @from(Start 9077542, End 9077544)
I$
// @from(Start 9077546, End 9077548)
Jt
// @from(Start 9077550, End 9077553)
fJ1
// @from(Start 9077555, End 9077558)
vJ1
// @from(Start 9077560, End 9077562)
Rm
// @from(Start 9077564, End 9077567)
bJ1
// @from(Start 9077569, End 9077572)
gJ1
// @from(Start 9077574, End 9077577)
Il1
// @from(Start 9077579, End 9077582)
os0
// @from(Start 9077584, End 9077587)
Gl1
// @from(Start 9077589, End 9077592)
Zl1
// @from(Start 9077594, End 9077597)
Dl1
// @from(Start 9077599, End 9077602)
Yl1
// @from(Start 9077604, End 9077607)
ts0
// @from(Start 9077609, End 9077627)
es0 = "__json_buf"
// @from(Start 9077629, End 9089106)
class Om {
  constructor() {
    aX.add(this), this.messages = [], this.receivedMessages = [], sR.set(this, void 0), this.controller = new AbortController, Zt.set(this, void 0), kJ1.set(this, () => {}), Dt.set(this, () => {}), Yt.set(this, void 0), xJ1.set(this, () => {}), Wt.set(this, () => {}), I$.set(this, {}), Jt.set(this, !1), fJ1.set(this, !1), vJ1.set(this, !1), Rm.set(this, !1), bJ1.set(this, void 0), gJ1.set(this, void 0), Gl1.set(this, (A) => {
      if (Q4(this, fJ1, !0, "f"), tN(A)) A = new _I;
      if (A instanceof _I) return Q4(this, vJ1, !0, "f"), this._emit("abort", A);
      if (A instanceof P9) return this._emit("error", A);
      if (A instanceof Error) {
        let B = new P9(A.message);
        return B.cause = A, this._emit("error", B)
      }
      return this._emit("error", new P9(String(A)))
    }), Q4(this, Zt, new Promise((A, B) => {
      Q4(this, kJ1, A, "f"), Q4(this, Dt, B, "f")
    }), "f"), Q4(this, Yt, new Promise((A, B) => {
      Q4(this, xJ1, A, "f"), Q4(this, Wt, B, "f")
    }), "f"), X0(this, Zt, "f").catch(() => {}), X0(this, Yt, "f").catch(() => {})
  }
  get response() {
    return X0(this, bJ1, "f")
  }
  get request_id() {
    return X0(this, gJ1, "f")
  }
  async withResponse() {
    let A = await X0(this, Zt, "f");
    if (!A) throw new Error("Could not resolve a `Response` object");
    return {
      data: this,
      response: A,
      request_id: A.headers.get("request-id")
    }
  }
  static fromReadableStream(A) {
    let B = new Om;
    return B._run(() => B._fromReadableStream(A)), B
  }
  static createMessage(A, B, Q) {
    let I = new Om;
    for (let G of B.messages) I._addMessageParam(G);
    return I._run(() => I._createMessage(A, {
      ...B,
      stream: !0
    }, {
      ...Q,
      headers: {
        ...Q?.headers,
        "X-Stainless-Helper-Method": "stream"
      }
    })), I
  }
  _run(A) {
    A().then(() => {
      this._emitFinal(), this._emit("end")
    }, X0(this, Gl1, "f"))
  }
  _addMessageParam(A) {
    this.messages.push(A)
  }
  _addMessage(A, B = !0) {
    if (this.receivedMessages.push(A), B) this._emit("message", A)
  }
  async _createMessage(A, B, Q) {
    let I = Q?.signal;
    if (I) {
      if (I.aborted) this.controller.abort();
      I.addEventListener("abort", () => this.controller.abort())
    }
    X0(this, aX, "m", Zl1).call(this);
    let {
      response: G,
      data: Z
    } = await A.create({
      ...B,
      stream: !0
    }, {
      ...Q,
      signal: this.controller.signal
    }).withResponse();
    this._connected(G);
    for await (let D of Z) X0(this, aX, "m", Dl1).call(this, D);
    if (Z.controller.signal?.aborted) throw new _I;
    X0(this, aX, "m", Yl1).call(this)
  }
  _connected(A) {
    if (this.ended) return;
    Q4(this, bJ1, A, "f"), Q4(this, gJ1, A?.headers.get("request-id"), "f"), X0(this, kJ1, "f").call(this, A), this._emit("connect")
  }
  get ended() {
    return X0(this, Jt, "f")
  }
  get errored() {
    return X0(this, fJ1, "f")
  }
  get aborted() {
    return X0(this, vJ1, "f")
  }
  abort() {
    this.controller.abort()
  }
  on(A, B) {
    return (X0(this, I$, "f")[A] || (X0(this, I$, "f")[A] = [])).push({
      listener: B
    }), this
  }
  off(A, B) {
    let Q = X0(this, I$, "f")[A];
    if (!Q) return this;
    let I = Q.findIndex((G) => G.listener === B);
    if (I >= 0) Q.splice(I, 1);
    return this
  }
  once(A, B) {
    return (X0(this, I$, "f")[A] || (X0(this, I$, "f")[A] = [])).push({
      listener: B,
      once: !0
    }), this
  }
  emitted(A) {
    return new Promise((B, Q) => {
      if (Q4(this, Rm, !0, "f"), A !== "error") this.once("error", Q);
      this.once(A, B)
    })
  }
  async done() {
    Q4(this, Rm, !0, "f"), await X0(this, Yt, "f")
  }
  get currentMessage() {
    return X0(this, sR, "f")
  }
  async finalMessage() {
    return await this.done(), X0(this, aX, "m", Il1).call(this)
  }
  async finalText() {
    return await this.done(), X0(this, aX, "m", os0).call(this)
  }
  _emit(A, ...B) {
    if (X0(this, Jt, "f")) return;
    if (A === "end") Q4(this, Jt, !0, "f"), X0(this, xJ1, "f").call(this);
    let Q = X0(this, I$, "f")[A];
    if (Q) X0(this, I$, "f")[A] = Q.filter((I) => !I.once), Q.forEach(({
      listener: I
    }) => I(...B));
    if (A === "abort") {
      let I = B[0];
      if (!X0(this, Rm, "f") && !Q?.length) Promise.reject(I);
      X0(this, Dt, "f").call(this, I), X0(this, Wt, "f").call(this, I), this._emit("end");
      return
    }
    if (A === "error") {
      let I = B[0];
      if (!X0(this, Rm, "f") && !Q?.length) Promise.reject(I);
      X0(this, Dt, "f").call(this, I), X0(this, Wt, "f").call(this, I), this._emit("end")
    }
  }
  _emitFinal() {
    if (this.receivedMessages.at(-1)) this._emit("finalMessage", X0(this, aX, "m", Il1).call(this))
  }
  async _fromReadableStream(A, B) {
    let Q = B?.signal;
    if (Q) {
      if (Q.aborted) this.controller.abort();
      Q.addEventListener("abort", () => this.controller.abort())
    }
    X0(this, aX, "m", Zl1).call(this), this._connected(null);
    let I = bD.fromReadableStream(A, this.controller);
    for await (let G of I) X0(this, aX, "m", Dl1).call(this, G);
    if (I.controller.signal?.aborted) throw new _I;
    X0(this, aX, "m", Yl1).call(this)
  } [(sR = new WeakMap, Zt = new WeakMap, kJ1 = new WeakMap, Dt = new WeakMap, Yt = new WeakMap, xJ1 = new WeakMap, Wt = new WeakMap, I$ = new WeakMap, Jt = new WeakMap, fJ1 = new WeakMap, vJ1 = new WeakMap, Rm = new WeakMap, bJ1 = new WeakMap, gJ1 = new WeakMap, Gl1 = new WeakMap, aX = new WeakSet, Il1 = function A() {
    if (this.receivedMessages.length === 0) throw new P9("stream ended without producing a Message with role=assistant");
    return this.receivedMessages.at(-1)
  }, os0 = function A() {
    if (this.receivedMessages.length === 0) throw new P9("stream ended without producing a Message with role=assistant");
    let B = this.receivedMessages.at(-1).content.filter((Q) => Q.type === "text").map((Q) => Q.text);
    if (B.length === 0) throw new P9("stream ended without producing a content block with type=text");
    return B.join(" ")
  }, Zl1 = function A() {
    if (this.ended) return;
    Q4(this, sR, void 0, "f")
  }, Dl1 = function A(B) {
    if (this.ended) return;
    let Q = X0(this, aX, "m", ts0).call(this, B);
    switch (this._emit("streamEvent", B, Q), B.type) {
      case "content_block_delta": {
        let I = Q.content.at(-1);
        switch (B.delta.type) {
          case "text_delta": {
            if (I.type === "text") this._emit("text", B.delta.text, I.text || "");
            break
          }
          case "citations_delta": {
            if (I.type === "text") this._emit("citation", B.delta.citation, I.citations ?? []);
            break
          }
          case "input_json_delta": {
            if (I.type === "tool_use" && I.input) this._emit("inputJson", B.delta.partial_json, I.input);
            break
          }
          case "thinking_delta": {
            if (I.type === "thinking") this._emit("thinking", B.delta.thinking, I.thinking);
            break
          }
          case "signature_delta": {
            if (I.type === "thinking") this._emit("signature", I.signature);
            break
          }
          default:
            Ar0(B.delta)
        }
        break
      }
      case "message_stop": {
        this._addMessageParam(Q), this._addMessage(Q, !0);
        break
      }
      case "content_block_stop": {
        this._emit("contentBlock", Q.content.at(-1));
        break
      }
      case "message_start": {
        Q4(this, sR, Q, "f");
        break
      }
      case "content_block_start":
      case "message_delta":
        break
    }
  }, Yl1 = function A() {
    if (this.ended) throw new P9("stream has ended, this shouldn't happen");
    let B = X0(this, sR, "f");
    if (!B) throw new P9("request ended without sending any chunks");
    return Q4(this, sR, void 0, "f"), B
  }, ts0 = function A(B) {
    let Q = X0(this, sR, "f");
    if (B.type === "message_start") {
      if (Q) throw new P9(`Unexpected event order, got ${B.type} before receiving "message_stop"`);
      return B.message
    }
    if (!Q) throw new P9(`Unexpected event order, got ${B.type} before "message_start"`);
    switch (B.type) {
      case "message_stop":
        return Q;
      case "message_delta":
        if (Q.stop_reason = B.delta.stop_reason, Q.stop_sequence = B.delta.stop_sequence, Q.usage.output_tokens = B.usage.output_tokens, B.usage.input_tokens != null) Q.usage.input_tokens = B.usage.input_tokens;
        if (B.usage.cache_creation_input_tokens != null) Q.usage.cache_creation_input_tokens = B.usage.cache_creation_input_tokens;
        if (B.usage.cache_read_input_tokens != null) Q.usage.cache_read_input_tokens = B.usage.cache_read_input_tokens;
        if (B.usage.server_tool_use != null) Q.usage.server_tool_use = B.usage.server_tool_use;
        return Q;
      case "content_block_start":
        return Q.content.push(B.content_block), Q;
      case "content_block_delta": {
        let I = Q.content.at(B.index);
        switch (B.delta.type) {
          case "text_delta": {
            if (I?.type === "text") I.text += B.delta.text;
            break
          }
          case "citations_delta": {
            if (I?.type === "text") I.citations ?? (I.citations = []), I.citations.push(B.delta.citation);
            break
          }
          case "input_json_delta": {
            if (I?.type === "tool_use") {
              let G = I[es0] || "";
              if (G += B.delta.partial_json, Object.defineProperty(I, es0, {
                  value: G,
                  enumerable: !1,
                  writable: !0
                }), G) I.input = OJ1(G)
            }
            break
          }
          case "thinking_delta": {
            if (I?.type === "thinking") I.thinking += B.delta.thinking;
            break
          }
          case "signature_delta": {
            if (I?.type === "thinking") I.signature = B.delta.signature;
            break
          }
          default:
            Ar0(B.delta)
        }
        return Q
      }
      case "content_block_stop":
        return Q
    }
  }, Symbol.asyncIterator)]() {
    let A = [],
      B = [],
      Q = !1;
    return this.on("streamEvent", (I) => {
      let G = B.shift();
      if (G) G.resolve(I);
      else A.push(I)
    }), this.on("end", () => {
      Q = !0;
      for (let I of B) I.resolve(void 0);
      B.length = 0
    }), this.on("abort", (I) => {
      Q = !0;
      for (let G of B) G.reject(I);
      B.length = 0
    }), this.on("error", (I) => {
      Q = !0;
      for (let G of B) G.reject(I);
      B.length = 0
    }), {
      next: async () => {
        if (!A.length) {
          if (Q) return {
            value: void 0,
            done: !0
          };
          return new Promise((G, Z) => B.push({
            resolve: G,
            reject: Z
          })).then((G) => G ? {
            value: G,
            done: !1
          } : {
            value: void 0,
            done: !0
          })
        }
        return {
          value: A.shift(),
          done: !1
        }
      },
      return: async () => {
        return this.abort(), {
          value: void 0,
          done: !0
        }
      }
    }
  }
  toReadableStream() {
    return new bD(this[Symbol.asyncIterator].bind(this), this.controller).toReadableStream()
  }
}
// @from(Start 9089108, End 9089126)
function Ar0(A) {}
// @from(Start 9089127, End 9089925)
class WK extends kG {
  constructor() {
    super(...arguments);
    this.batches = new Gt(this._client)
  }
  create(A, B) {
    if (A.model in Br0) console.warn(`The model '${A.model}' is deprecated and will reach end-of-life on ${Br0[A.model]}
Please migrate to a newer model. Visit https://docs.anthropic.com/en/docs/resources/model-deprecations for more information.`);
    return this._client.post("/v1/messages", {
      body: A,
      timeout: this._client._options.timeout ?? (A.stream ? 600000 : this._client._calculateNonstreamingTimeout(A.max_tokens)),
      ...B,
      stream: A.stream ?? !1
    })
  }
  stream(A, B) {
    return Om.createMessage(this, A, B)
  }
  countTokens(A, B) {
    return this._client.post("/v1/messages/count_tokens", {
      body: A,
      ...B
    })
  }
}
// @from(Start 9089930, End 9090281)
Br0 = {
  "claude-1.3": "November 6th, 2024",
  "claude-1.3-100k": "November 6th, 2024",
  "claude-instant-1.1": "November 6th, 2024",
  "claude-instant-1.1-100k": "November 6th, 2024",
  "claude-instant-1.2": "November 6th, 2024",
  "claude-3-sonnet-20240229": "July 21st, 2025",
  "claude-2.1": "July 21st, 2025",
  "claude-2.0": "July 21st, 2025"
}
// @from(Start 9090300, End 9090916)
class Tm extends kG {
  retrieve(A, B = {}, Q) {
    let {
      betas: I
    } = B ?? {};
    return this._client.get(lX`/v1/models/${A}`, {
      ...Q,
      headers: YB([{
        ...I?.toString() != null ? {
          "anthropic-beta": I?.toString()
        } : void 0
      }, Q?.headers])
    })
  }
  list(A = {}, B) {
    let {
      betas: Q,
      ...I
    } = A ?? {};
    return this._client.getAPIList("/v1/models", B$, {
      query: I,
      ...B,
      headers: YB([{
        ...Q?.toString() != null ? {
          "anthropic-beta": Q?.toString()
        } : void 0
      }, B?.headers])
    })
  }
}
// @from(Start 9090921, End 9091140)
Ft = (A) => {
  if (typeof globalThis.process !== "undefined") return globalThis.process.env?.[A]?.trim() ?? void 0;
  if (typeof globalThis.Deno !== "undefined") return globalThis.Deno.env?.get?.(A)?.trim();
  return
}
// @from(Start 9091146, End 9091149)
Qr0
// @from(Start 9091151, End 9091154)
hJ1
// @from(Start 9091156, End 9103508)
class R8 {
  constructor({
    baseURL: A = Ft("ANTHROPIC_BASE_URL"),
    apiKey: B = Ft("ANTHROPIC_API_KEY") ?? null,
    authToken: Q = Ft("ANTHROPIC_AUTH_TOKEN") ?? null,
    ...I
  } = {}) {
    hJ1.set(this, void 0);
    let G = {
      apiKey: B,
      authToken: Q,
      ...I,
      baseURL: A || "https://api.anthropic.com"
    };
    if (!G.dangerouslyAllowBrowser && Ss0()) throw new P9(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
`);
    this.baseURL = G.baseURL, this.timeout = G.timeout ?? kw.DEFAULT_TIMEOUT, this.logger = G.logger ?? console;
    let Z = "warn";
    this.logLevel = Z, this.logLevel = lc1(G.logLevel, "ClientOptions.logLevel", this) ?? lc1(Ft("ANTHROPIC_LOG"), "process.env['ANTHROPIC_LOG']", this) ?? Z, this.fetchOptions = G.fetchOptions, this.maxRetries = G.maxRetries ?? 2, this.fetch = G.fetch ?? js0(), Q4(this, hJ1, ks0, "f"), this._options = G, this.apiKey = B, this.authToken = Q
  }
  withOptions(A) {
    return new this.constructor({
      ...this._options,
      baseURL: this.baseURL,
      maxRetries: this.maxRetries,
      timeout: this.timeout,
      logger: this.logger,
      logLevel: this.logLevel,
      fetchOptions: this.fetchOptions,
      apiKey: this.apiKey,
      authToken: this.authToken,
      ...A
    })
  }
  defaultQuery() {
    return this._options.defaultQuery
  }
  validateHeaders({
    values: A,
    nulls: B
  }) {
    if (this.apiKey && A.get("x-api-key")) return;
    if (B.has("x-api-key")) return;
    if (this.authToken && A.get("authorization")) return;
    if (B.has("authorization")) return;
    throw new Error('Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted')
  }
  authHeaders(A) {
    return YB([this.apiKeyAuth(A), this.bearerAuth(A)])
  }
  apiKeyAuth(A) {
    if (this.apiKey == null) return;
    return YB([{
      "X-Api-Key": this.apiKey
    }])
  }
  bearerAuth(A) {
    if (this.authToken == null) return;
    return YB([{
      Authorization: `Bearer ${this.authToken}`
    }])
  }
  stringifyQuery(A) {
    return Object.entries(A).filter(([B, Q]) => typeof Q !== "undefined").map(([B, Q]) => {
      if (typeof Q === "string" || typeof Q === "number" || typeof Q === "boolean") return `${encodeURIComponent(B)}=${encodeURIComponent(Q)}`;
      if (Q === null) return `${encodeURIComponent(B)}=`;
      throw new P9(`Cannot stringify type ${typeof Q}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`)
    }).join("&")
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${lR}`
  }
  defaultIdempotencyKey() {
    return `stainless-node-retry-${pc1()}`
  }
  makeStatusError(A, B, Q, I) {
    return p6.generate(A, B, Q, I)
  }
  buildURL(A, B) {
    let Q = Ns0(A) ? new URL(A) : new URL(this.baseURL + (this.baseURL.endsWith("/") && A.startsWith("/") ? A.slice(1) : A)),
      I = this.defaultQuery();
    if (!$s0(I)) B = {
      ...I,
      ...B
    };
    if (typeof B === "object" && B && !Array.isArray(B)) Q.search = this.stringifyQuery(B);
    return Q.toString()
  }
  _calculateNonstreamingTimeout(A) {
    if (3600 * A / 128000 > 600) throw new P9("Streaming is strongly recommended for operations that may take longer than 10 minutes. See https://github.com/anthropics/anthropic-sdk-python#streaming-responses for more details");
    return 600000
  }
  async prepareOptions(A) {}
  async prepareRequest(A, {
    url: B,
    options: Q
  }) {}
  get(A, B) {
    return this.methodRequest("get", A, B)
  }
  post(A, B) {
    return this.methodRequest("post", A, B)
  }
  patch(A, B) {
    return this.methodRequest("patch", A, B)
  }
  put(A, B) {
    return this.methodRequest("put", A, B)
  }
  delete(A, B) {
    return this.methodRequest("delete", A, B)
  }
  methodRequest(A, B, Q) {
    return this.request(Promise.resolve(Q).then((I) => {
      return {
        method: A,
        path: B,
        ...I
      }
    }))
  }
  request(A, B = null) {
    return new kj(this, this.makeRequest(A, B, void 0))
  }
  async makeRequest(A, B, Q) {
    let I = await A,
      G = I.maxRetries ?? this.maxRetries;
    if (B == null) B = G;
    await this.prepareOptions(I);
    let {
      req: Z,
      url: D,
      timeout: Y
    } = this.buildRequest(I, {
      retryCount: G - B
    });
    await this.prepareRequest(Z, {
      url: D,
      options: I
    });
    let W = "log_" + (Math.random() * 16777216 | 0).toString(16).padStart(6, "0"),
      J = Q === void 0 ? "" : `, retryOf: ${Q}`,
      F = Date.now();
    if (vZ(this).debug(`[${W}] sending request`, A$({
        retryOfRequestLogID: Q,
        method: I.method,
        url: D,
        options: I,
        headers: Z.headers
      })), I.signal?.aborted) throw new _I;
    let X = new AbortController,
      V = await this.fetchWithTimeout(D, Z, Y, X).catch(fo),
      C = Date.now();
    if (V instanceof Error) {
      let N = `retrying, ${B} attempts remaining`;
      if (I.signal?.aborted) throw new _I;
      let q = tN(V) || /timed? ?out/i.test(String(V) + ("cause" in V ? String(V.cause) : ""));
      if (B) return vZ(this).info(`[${W}] connection ${q?"timed out":"failed"} - ${N}`), vZ(this).debug(`[${W}] connection ${q?"timed out":"failed"} (${N})`, A$({
        retryOfRequestLogID: Q,
        url: D,
        durationMs: C - F,
        message: V.message
      })), this.retryRequest(I, B, Q ?? W);
      if (vZ(this).info(`[${W}] connection ${q?"timed out":"failed"} - error; no more retries left`), vZ(this).debug(`[${W}] connection ${q?"timed out":"failed"} (error; no more retries left)`, A$({
          retryOfRequestLogID: Q,
          url: D,
          durationMs: C - F,
          message: V.message
        })), q) throw new vo;
      throw new eN({
        cause: V
      })
    }
    let K = [...V.headers.entries()].filter(([N]) => N === "request-id").map(([N, q]) => ", " + N + ": " + JSON.stringify(q)).join(""),
      E = `[${W}${J}${K}] ${Z.method} ${D} ${V.ok?"succeeded":"failed"} with status ${V.status} in ${C-F}ms`;
    if (!V.ok) {
      let N = this.shouldRetry(V);
      if (B && N) {
        let _ = `retrying, ${B} attempts remaining`;
        return await ys0(V.body), vZ(this).info(`${E} - ${_}`), vZ(this).debug(`[${W}] response error (${_})`, A$({
          retryOfRequestLogID: Q,
          url: V.url,
          status: V.status,
          headers: V.headers,
          durationMs: C - F
        })), this.retryRequest(I, B, Q ?? W, V.headers)
      }
      let q = N ? "error; no more retries left" : "error; not retryable";
      vZ(this).info(`${E} - ${q}`);
      let O = await V.text().catch((_) => fo(_).message),
        R = EJ1(O),
        T = R ? void 0 : O;
      throw vZ(this).debug(`[${W}] response error (${q})`, A$({
        retryOfRequestLogID: Q,
        url: V.url,
        status: V.status,
        headers: V.headers,
        message: T,
        durationMs: Date.now() - F
      })), this.makeStatusError(V.status, R, T, V.headers)
    }
    return vZ(this).info(E), vZ(this).debug(`[${W}] response start`, A$({
      retryOfRequestLogID: Q,
      url: V.url,
      status: V.status,
      headers: V.headers,
      durationMs: C - F
    })), {
      response: V,
      options: I,
      controller: X,
      requestLogID: W,
      retryOfRequestLogID: Q,
      startTime: F
    }
  }
  getAPIList(A, B, Q) {
    return this.requestAPIList(B, {
      method: "get",
      path: A,
      ...Q
    })
  }
  requestAPIList(A, B) {
    let Q = this.makeRequest(B, null, void 0);
    return new MJ1(this, Q, A)
  }
  async fetchWithTimeout(A, B, Q, I) {
    let {
      signal: G,
      method: Z,
      ...D
    } = B || {};
    if (G) G.addEventListener("abort", () => I.abort());
    let Y = setTimeout(() => I.abort(), Q),
      W = globalThis.ReadableStream && D.body instanceof globalThis.ReadableStream || typeof D.body === "object" && D.body !== null && Symbol.asyncIterator in D.body,
      J = {
        signal: I.signal,
        ...W ? {
          duplex: "half"
        } : {},
        method: "GET",
        ...D
      };
    if (Z) J.method = Z.toUpperCase();
    try {
      return await this.fetch.call(void 0, A, J)
    } finally {
      clearTimeout(Y)
    }
  }
  shouldRetry(A) {
    let B = A.headers.get("x-should-retry");
    if (B === "true") return !0;
    if (B === "false") return !1;
    if (A.status === 408) return !0;
    if (A.status === 409) return !0;
    if (A.status === 429) return !0;
    if (A.status >= 500) return !0;
    return !1
  }
  async retryRequest(A, B, Q, I) {
    let G, Z = I?.get("retry-after-ms");
    if (Z) {
      let Y = parseFloat(Z);
      if (!Number.isNaN(Y)) G = Y
    }
    let D = I?.get("retry-after");
    if (D && !G) {
      let Y = parseFloat(D);
      if (!Number.isNaN(Y)) G = Y * 1000;
      else G = Date.parse(D) - Date.now()
    }
    if (!(G && 0 <= G && G < 60000)) {
      let Y = A.maxRetries ?? this.maxRetries;
      G = this.calculateDefaultRetryTimeoutMillis(B, Y)
    }
    return await Ls0(G), this.makeRequest(A, B - 1, Q)
  }
  calculateDefaultRetryTimeoutMillis(A, B) {
    let G = B - A,
      Z = Math.min(0.5 * Math.pow(2, G), 8),
      D = 1 - Math.random() * 0.25;
    return Z * D * 1000
  }
  buildRequest(A, {
    retryCount: B = 0
  } = {}) {
    let Q = {
        ...A
      },
      {
        method: I,
        path: G,
        query: Z
      } = Q,
      D = this.buildURL(G, Z);
    if ("timeout" in Q) Ms0("timeout", Q.timeout);
    Q.timeout = Q.timeout ?? this.timeout;
    let {
      bodyHeaders: Y,
      body: W
    } = this.buildBody({
      options: Q
    }), J = this.buildHeaders({
      options: A,
      method: I,
      bodyHeaders: Y,
      retryCount: B
    });
    return {
      req: {
        method: I,
        headers: J,
        ...Q.signal && {
          signal: Q.signal
        },
        ...globalThis.ReadableStream && W instanceof globalThis.ReadableStream && {
          duplex: "half"
        },
        ...W && {
          body: W
        },
        ...this.fetchOptions ?? {},
        ...Q.fetchOptions ?? {}
      },
      url: D,
      timeout: Q.timeout
    }
  }
  buildHeaders({
    options: A,
    method: B,
    bodyHeaders: Q,
    retryCount: I
  }) {
    let G = {};
    if (this.idempotencyHeader && B !== "get") {
      if (!A.idempotencyKey) A.idempotencyKey = this.defaultIdempotencyKey();
      G[this.idempotencyHeader] = A.idempotencyKey
    }
    let Z = YB([G, {
      Accept: "application/json",
      "User-Agent": this.getUserAgent(),
      "X-Stainless-Retry-Count": String(I),
      ...A.timeout ? {
        "X-Stainless-Timeout": String(Math.trunc(A.timeout / 1000))
      } : {},
      ..._s0(),
      ...this._options.dangerouslyAllowBrowser ? {
        "anthropic-dangerous-direct-browser-access": "true"
      } : void 0,
      "anthropic-version": "2023-06-01"
    }, this.authHeaders(A), this._options.defaultHeaders, Q, A.headers]);
    return this.validateHeaders(Z), Z.values
  }
  buildBody({
    options: {
      body: A,
      headers: B
    }
  }) {
    if (!A) return {
      bodyHeaders: void 0,
      body: void 0
    };
    let Q = YB([B]);
    if (ArrayBuffer.isView(A) || A instanceof ArrayBuffer || A instanceof DataView || typeof A === "string" && Q.values.has("content-type") || A instanceof Blob || A instanceof FormData || A instanceof URLSearchParams || globalThis.ReadableStream && A instanceof globalThis.ReadableStream) return {
      bodyHeaders: void 0,
      body: A
    };
    else if (typeof A === "object" && ((Symbol.asyncIterator in A) || (Symbol.iterator in A) && ("next" in A) && typeof A.next === "function")) return {
      bodyHeaders: void 0,
      body: nc1(A)
    };
    else return X0(this, hJ1, "f").call(this, {
      body: A,
      headers: Q
    })
  }
}
// @from(Start 9104015, End 9104205)
class kw extends R8 {
  constructor() {
    super(...arguments);
    this.completions = new aR(this), this.messages = new WK(this), this.models = new Tm(this), this.beta = new nX(this)
  }
}
// @from(Start 9104279, End 9104295)
bZ = "API Error"
// @from(Start 9104299, End 9104324)
Xt = "Prompt is too long"
// @from(Start 9104328, End 9104361)
Jl1 = "Credit balance is too low"
// @from(Start 9104365, End 9104408)
mJ1 = "Invalid API key · Please run /login"
// @from(Start 9104412, End 9104458)
dJ1 = "Invalid API key · Fix external API key"
// @from(Start 9104462, End 9104499)
Fl1 = "Claude AI usage limit reached"
// @from(Start 9104503, End 9104551)
Xl1 = "Repeated server overload with Opus model"
// @from(Start 9104555, End 9104574)
AW = "(no content)"
// @from(Start 9104578, End 9104625)
uJ1 = "OAuth token revoked · Please run /login"
// @from(Start 9104629, End 9104667)
Vl1 = "Repeated 529 Overloaded errors"
// @from(Start 9104671, End 9104747)
Pm = "Opus is experiencing high load, please use /model to switch to Sonnet"
// @from(Start 9104750, End 9106026)
function pJ1(A, B, Q) {
  if (A instanceof Error && A.message.includes(Vl1)) return eY({
    content: Xl1
  });
  if (A instanceof Error && A.message.includes(Pm)) return eY({
    content: Pm
  });
  if (A instanceof p6 && A.status === 429 && T9()) {
    let I = A.headers?.get?.("anthropic-ratelimit-unified-reset"),
      G = Number(I) || 0,
      Z = `${Fl1}|${G}`;
    return eY({
      content: Z
    })
  }
  if (A instanceof Error && A.message.includes("prompt is too long")) return eY({
    content: Xt
  });
  if (A instanceof Error && A.message.includes("Your credit balance is too low")) return eY({
    content: Jl1
  });
  if (A instanceof Error && A.message.toLowerCase().includes("x-api-key")) {
    let {
      source: I
    } = GX(Q);
    return eY({
      content: I === "ANTHROPIC_API_KEY" || I === "apiKeyHelper" ? dJ1 : mJ1
    })
  }
  if (A instanceof p6 && A.status === 403 && A.message.includes("OAuth token has been revoked")) return eY({
    content: uJ1
  });
  if (process.env.CLAUDE_CODE_USE_BEDROCK && A instanceof Error && A.message.toLowerCase().includes("model id")) return eY({
    content: `${bZ} (${B}): ${A.message}`
  });
  if (A instanceof Error) return eY({
    content: `${bZ}: ${A.message}`
  });
  return eY({
    content: bZ
  })
}
// @from(Start 9106028, End 9106410)
function Cl1(A) {
  if (A !== "refusal") return;
  return E1("tengu_refusal_api_response", {}), eY({
    content: `${bZ}: Claude Code is unable to respond to this request, which appears to violate our Usage Policy (https://www.anthropic.com/legal/aup). Please double press esc to edit your last message or start a new session for Claude Code to assist with a different task.`
  })
}
// @from(Start 9106412, End 9106484)
function Ir0(A, B) {
  return new Set([...A].filter((Q) => !B.has(Q)))
}
// @from(Start 9106486, End 9106575)
function Gr0(A, B) {
  return A.size > 0 && B.size > 0 && [...A].every((Q) => B.has(Q))
}
// @from(Start 9106587, End 9106604)
xj = "2025-03-26"
// @from(Start 9106608, End 9106646)
cJ1 = [xj, "2024-11-05", "2024-10-07"]
// @from(Start 9106650, End 9106661)
lJ1 = "2.0"
// @from(Start 9106665, End 9106710)
Zr0 = n.union([n.string(), n.number().int()])
// @from(Start 9106714, End 9106730)
Dr0 = n.string()
// @from(Start 9106734, End 9106804)
AR6 = n.object({
    progressToken: n.optional(Zr0)
  }).passthrough()
// @from(Start 9106808, End 9106869)
JK = n.object({
    _meta: n.optional(AR6)
  }).passthrough()
// @from(Start 9106873, End 9106944)
fJ = n.object({
    method: n.string(),
    params: n.optional(JK)
  })
// @from(Start 9106948, End 9107032)
Vt = n.object({
    _meta: n.optional(n.object({}).passthrough())
  }).passthrough()
// @from(Start 9107036, End 9107107)
xw = n.object({
    method: n.string(),
    params: n.optional(Vt)
  })
// @from(Start 9107111, End 9107195)
FK = n.object({
    _meta: n.optional(n.object({}).passthrough())
  }).passthrough()
// @from(Start 9107199, End 9107244)
iJ1 = n.union([n.string(), n.number().int()])
// @from(Start 9107248, End 9107329)
Yr0 = n.object({
    jsonrpc: n.literal(lJ1),
    id: iJ1
  }).merge(fJ).strict()
// @from(Start 9107333, End 9107370)
nJ1 = (A) => Yr0.safeParse(A).success
// @from(Start 9107374, End 9107442)
Wr0 = n.object({
    jsonrpc: n.literal(lJ1)
  }).merge(xw).strict()
// @from(Start 9107446, End 9107483)
Jr0 = (A) => Wr0.safeParse(A).success
// @from(Start 9107487, End 9107574)
Fr0 = n.object({
    jsonrpc: n.literal(lJ1),
    id: iJ1,
    result: FK
  }).strict()
// @from(Start 9107578, End 9107614)
Ct = (A) => Fr0.safeParse(A).success
// @from(Start 9107618, End 9107620)
rR
// @from(Start 9107998, End 9108192)
Xr0 = n.object({
    jsonrpc: n.literal(lJ1),
    id: iJ1,
    error: n.object({
      code: n.number().int(),
      message: n.string(),
      data: n.optional(n.unknown())
    })
  }).strict()
// @from(Start 9108196, End 9108233)
Vr0 = (A) => Xr0.safeParse(A).success
// @from(Start 9108237, End 9108271)
fw = n.union([Yr0, Wr0, Fr0, Xr0])
// @from(Start 9108275, End 9108291)
G$ = FK.strict()
// @from(Start 9108295, End 9108456)
aJ1 = xw.extend({
    method: n.literal("notifications/cancelled"),
    params: Vt.extend({
      requestId: iJ1,
      reason: n.string().optional()
    })
  })
// @from(Start 9108460, End 9108541)
Cr0 = n.object({
    name: n.string(),
    version: n.string()
  }).passthrough()
// @from(Start 9108545, End 9108790)
BR6 = n.object({
    experimental: n.optional(n.object({}).passthrough()),
    sampling: n.optional(n.object({}).passthrough()),
    roots: n.optional(n.object({
      listChanged: n.optional(n.boolean())
    }).passthrough())
  }).passthrough()
// @from(Start 9108794, End 9108966)
Kl1 = fJ.extend({
    method: n.literal("initialize"),
    params: JK.extend({
      protocolVersion: n.string(),
      capabilities: BR6,
      clientInfo: Cr0
    })
  })
// @from(Start 9108972, End 9109519)
QR6 = n.object({
    experimental: n.optional(n.object({}).passthrough()),
    logging: n.optional(n.object({}).passthrough()),
    completions: n.optional(n.object({}).passthrough()),
    prompts: n.optional(n.object({
      listChanged: n.optional(n.boolean())
    }).passthrough()),
    resources: n.optional(n.object({
      subscribe: n.optional(n.boolean()),
      listChanged: n.optional(n.boolean())
    }).passthrough()),
    tools: n.optional(n.object({
      listChanged: n.optional(n.boolean())
    }).passthrough())
  }).passthrough()
// @from(Start 9109523, End 9109663)
Hl1 = FK.extend({
    protocolVersion: n.string(),
    capabilities: QR6,
    serverInfo: Cr0,
    instructions: n.optional(n.string())
  })
// @from(Start 9109667, End 9109740)
sJ1 = xw.extend({
    method: n.literal("notifications/initialized")
  })
// @from(Start 9109744, End 9109781)
Kr0 = (A) => sJ1.safeParse(A).success
// @from(Start 9109785, End 9109837)
rJ1 = fJ.extend({
    method: n.literal("ping")
  })
// @from(Start 9109841, End 9109936)
IR6 = n.object({
    progress: n.number(),
    total: n.optional(n.number())
  }).passthrough()
// @from(Start 9109940, End 9110078)
oJ1 = xw.extend({
    method: n.literal("notifications/progress"),
    params: Vt.merge(IR6).extend({
      progressToken: Zr0
    })
  })
// @from(Start 9110082, End 9110176)
tJ1 = fJ.extend({
    params: JK.extend({
      cursor: n.optional(Dr0)
    }).optional()
  })
// @from(Start 9110180, End 9110234)
eJ1 = FK.extend({
    nextCursor: n.optional(Dr0)
  })
// @from(Start 9110238, End 9110331)
Hr0 = n.object({
    uri: n.string(),
    mimeType: n.optional(n.string())
  }).passthrough()
// @from(Start 9110335, End 9110379)
zr0 = Hr0.extend({
    text: n.string()
  })
// @from(Start 9110383, End 9110436)
wr0 = Hr0.extend({
    blob: n.string().base64()
  })
// @from(Start 9110440, End 9110596)
GR6 = n.object({
    uri: n.string(),
    name: n.string(),
    description: n.optional(n.string()),
    mimeType: n.optional(n.string())
  }).passthrough()
// @from(Start 9110600, End 9110764)
ZR6 = n.object({
    uriTemplate: n.string(),
    name: n.string(),
    description: n.optional(n.string()),
    mimeType: n.optional(n.string())
  }).passthrough()
// @from(Start 9110768, End 9110831)
DR6 = tJ1.extend({
    method: n.literal("resources/list")
  })
// @from(Start 9110835, End 9110885)
fj = eJ1.extend({
    resources: n.array(GR6)
  })
// @from(Start 9110889, End 9110962)
YR6 = tJ1.extend({
    method: n.literal("resources/templates/list")
  })
// @from(Start 9110966, End 9111025)
zl1 = eJ1.extend({
    resourceTemplates: n.array(ZR6)
  })
// @from(Start 9111029, End 9111145)
WR6 = fJ.extend({
    method: n.literal("resources/read"),
    params: JK.extend({
      uri: n.string()
    })
  })
// @from(Start 9111149, End 9111213)
Kt = FK.extend({
    contents: n.array(n.union([zr0, wr0]))
  })
// @from(Start 9111217, End 9111301)
JR6 = xw.extend({
    method: n.literal("notifications/resources/list_changed")
  })
// @from(Start 9111305, End 9111426)
FR6 = fJ.extend({
    method: n.literal("resources/subscribe"),
    params: JK.extend({
      uri: n.string()
    })
  })
// @from(Start 9111430, End 9111553)
XR6 = fJ.extend({
    method: n.literal("resources/unsubscribe"),
    params: JK.extend({
      uri: n.string()
    })
  })
// @from(Start 9111557, End 9111690)
VR6 = xw.extend({
    method: n.literal("notifications/resources/updated"),
    params: Vt.extend({
      uri: n.string()
    })
  })
// @from(Start 9111694, End 9111830)
CR6 = n.object({
    name: n.string(),
    description: n.optional(n.string()),
    required: n.optional(n.boolean())
  }).passthrough()
// @from(Start 9111834, End 9111972)
KR6 = n.object({
    name: n.string(),
    description: n.optional(n.string()),
    arguments: n.optional(n.array(CR6))
  }).passthrough()
// @from(Start 9111976, End 9112037)
HR6 = tJ1.extend({
    method: n.literal("prompts/list")
  })
// @from(Start 9112041, End 9112089)
Ht = eJ1.extend({
    prompts: n.array(KR6)
  })
// @from(Start 9112093, End 9112258)
zR6 = fJ.extend({
    method: n.literal("prompts/get"),
    params: JK.extend({
      name: n.string(),
      arguments: n.optional(n.record(n.string()))
    })
  })
// @from(Start 9112262, End 9112347)
AF1 = n.object({
    type: n.literal("text"),
    text: n.string()
  }).passthrough()
// @from(Start 9112351, End 9112472)
BF1 = n.object({
    type: n.literal("image"),
    data: n.string().base64(),
    mimeType: n.string()
  }).passthrough()
// @from(Start 9112476, End 9112597)
QF1 = n.object({
    type: n.literal("audio"),
    data: n.string().base64(),
    mimeType: n.string()
  }).passthrough()
// @from(Start 9112601, End 9112703)
Er0 = n.object({
    type: n.literal("resource"),
    resource: n.union([zr0, wr0])
  }).passthrough()
// @from(Start 9112707, End 9112826)
wR6 = n.object({
    role: n.enum(["user", "assistant"]),
    content: n.union([AF1, BF1, QF1, Er0])
  }).passthrough()
// @from(Start 9112830, End 9112920)
wl1 = FK.extend({
    description: n.optional(n.string()),
    messages: n.array(wR6)
  })
// @from(Start 9112924, End 9113006)
ER6 = xw.extend({
    method: n.literal("notifications/prompts/list_changed")
  })
// @from(Start 9113010, End 9113257)
UR6 = n.object({
    title: n.optional(n.string()),
    readOnlyHint: n.optional(n.boolean()),
    destructiveHint: n.optional(n.boolean()),
    idempotentHint: n.optional(n.boolean()),
    openWorldHint: n.optional(n.boolean())
  }).passthrough()
// @from(Start 9113261, End 9113532)
NR6 = n.object({
    name: n.string(),
    description: n.optional(n.string()),
    inputSchema: n.object({
      type: n.literal("object"),
      properties: n.optional(n.object({}).passthrough())
    }).passthrough(),
    annotations: n.optional(UR6)
  }).passthrough()
// @from(Start 9113536, End 9113595)
El1 = tJ1.extend({
    method: n.literal("tools/list")
  })
// @from(Start 9113599, End 9113645)
zt = eJ1.extend({
    tools: n.array(NR6)
  })
// @from(Start 9113649, End 9113771)
Sm = FK.extend({
    content: n.array(n.union([AF1, BF1, QF1, Er0])),
    isError: n.boolean().default(!1).optional()
  })
// @from(Start 9113775, End 9113832)
fx8 = Sm.or(FK.extend({
    toolResult: n.unknown()
  }))
// @from(Start 9113836, End 9114001)
Ul1 = fJ.extend({
    method: n.literal("tools/call"),
    params: JK.extend({
      name: n.string(),
      arguments: n.optional(n.record(n.unknown()))
    })
  })
// @from(Start 9114005, End 9114085)
$R6 = xw.extend({
    method: n.literal("notifications/tools/list_changed")
  })
// @from(Start 9114089, End 9114184)
Ur0 = n.enum(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"])
// @from(Start 9114188, End 9114301)
qR6 = fJ.extend({
    method: n.literal("logging/setLevel"),
    params: JK.extend({
      level: Ur0
    })
  })
// @from(Start 9114305, End 9114486)
MR6 = xw.extend({
    method: n.literal("notifications/message"),
    params: Vt.extend({
      level: Ur0,
      logger: n.optional(n.string()),
      data: n.unknown()
    })
  })
// @from(Start 9114490, End 9114557)
LR6 = n.object({
    name: n.string().optional()
  }).passthrough()
// @from(Start 9114561, End 9114809)
RR6 = n.object({
    hints: n.optional(n.array(LR6)),
    costPriority: n.optional(n.number().min(0).max(1)),
    speedPriority: n.optional(n.number().min(0).max(1)),
    intelligencePriority: n.optional(n.number().min(0).max(1))
  }).passthrough()
// @from(Start 9114813, End 9114927)
OR6 = n.object({
    role: n.enum(["user", "assistant"]),
    content: n.union([AF1, BF1, QF1])
  }).passthrough()
// @from(Start 9114931, End 9115415)
TR6 = fJ.extend({
    method: n.literal("sampling/createMessage"),
    params: JK.extend({
      messages: n.array(OR6),
      systemPrompt: n.optional(n.string()),
      includeContext: n.optional(n.enum(["none", "thisServer", "allServers"])),
      temperature: n.optional(n.number()),
      maxTokens: n.number().int(),
      stopSequences: n.optional(n.array(n.string())),
      metadata: n.optional(n.object({}).passthrough()),
      modelPreferences: n.optional(RR6)
    })
  })
// @from(Start 9115419, End 9115657)
Nl1 = FK.extend({
    model: n.string(),
    stopReason: n.optional(n.enum(["endTurn", "stopSequence", "maxTokens"]).or(n.string())),
    role: n.enum(["user", "assistant"]),
    content: n.discriminatedUnion("type", [AF1, BF1, QF1])
  })
// @from(Start 9115661, End 9115753)
PR6 = n.object({
    type: n.literal("ref/resource"),
    uri: n.string()
  }).passthrough()
// @from(Start 9115757, End 9115848)
SR6 = n.object({
    type: n.literal("ref/prompt"),
    name: n.string()
  }).passthrough()
// @from(Start 9115852, End 9116085)
_R6 = fJ.extend({
    method: n.literal("completion/complete"),
    params: JK.extend({
      ref: n.union([SR6, PR6]),
      argument: n.object({
        name: n.string(),
        value: n.string()
      }).passthrough()
    })
  })
// @from(Start 9116089, End 9116285)
$l1 = FK.extend({
    completion: n.object({
      values: n.array(n.string()).max(100),
      total: n.optional(n.number().int()),
      hasMore: n.optional(n.boolean())
    }).passthrough()
  })
// @from(Start 9116289, End 9116400)
jR6 = n.object({
    uri: n.string().startsWith("file://"),
    name: n.optional(n.string())
  }).passthrough()
// @from(Start 9116404, End 9116462)
ql1 = fJ.extend({
    method: n.literal("roots/list")
  })
// @from(Start 9116466, End 9116512)
Ml1 = FK.extend({
    roots: n.array(jR6)
  })
// @from(Start 9116516, End 9116596)
yR6 = xw.extend({
    method: n.literal("notifications/roots/list_changed")
  })
// @from(Start 9116600, End 9116680)
vx8 = n.union([rJ1, Kl1, _R6, qR6, zR6, HR6, DR6, YR6, WR6, FR6, XR6, Ul1, El1])
// @from(Start 9116684, End 9116719)
bx8 = n.union([aJ1, oJ1, sJ1, yR6])
// @from(Start 9116723, End 9116752)
gx8 = n.union([G$, Nl1, Ml1])
// @from(Start 9116756, End 9116786)
hx8 = n.union([rJ1, TR6, ql1])
// @from(Start 9116790, End 9116840)
mx8 = n.union([aJ1, oJ1, MR6, VR6, JR6, $R6, ER6])
// @from(Start 9116844, End 9116903)
dx8 = n.union([G$, Hl1, $l1, wl1, Ht, fj, zl1, Kt, Sm, zt])
// @from(Start 9116905, End 9117052)
class _m extends Error {
  constructor(A, B, Q) {
    super(`MCP error ${A}: ${B}`);
    this.code = A, this.data = Q, this.name = "McpError"
  }
}
// @from(Start 9117057, End 9117068)
kR6 = 60000
// @from(Start 9117070, End 9126212)
class wt {
  constructor(A) {
    this._options = A, this._requestMessageId = 0, this._requestHandlers = new Map, this._requestHandlerAbortControllers = new Map, this._notificationHandlers = new Map, this._responseHandlers = new Map, this._progressHandlers = new Map, this._timeoutInfo = new Map, this.setNotificationHandler(aJ1, (B) => {
      let Q = this._requestHandlerAbortControllers.get(B.params.requestId);
      Q === null || Q === void 0 || Q.abort(B.params.reason)
    }), this.setNotificationHandler(oJ1, (B) => {
      this._onprogress(B)
    }), this.setRequestHandler(rJ1, (B) => ({}))
  }
  _setupTimeout(A, B, Q, I, G = !1) {
    this._timeoutInfo.set(A, {
      timeoutId: setTimeout(I, B),
      startTime: Date.now(),
      timeout: B,
      maxTotalTimeout: Q,
      resetTimeoutOnProgress: G,
      onTimeout: I
    })
  }
  _resetTimeout(A) {
    let B = this._timeoutInfo.get(A);
    if (!B) return !1;
    let Q = Date.now() - B.startTime;
    if (B.maxTotalTimeout && Q >= B.maxTotalTimeout) throw this._timeoutInfo.delete(A), new _m(rR.RequestTimeout, "Maximum total timeout exceeded", {
      maxTotalTimeout: B.maxTotalTimeout,
      totalElapsed: Q
    });
    return clearTimeout(B.timeoutId), B.timeoutId = setTimeout(B.onTimeout, B.timeout), !0
  }
  _cleanupTimeout(A) {
    let B = this._timeoutInfo.get(A);
    if (B) clearTimeout(B.timeoutId), this._timeoutInfo.delete(A)
  }
  async connect(A) {
    this._transport = A, this._transport.onclose = () => {
      this._onclose()
    }, this._transport.onerror = (B) => {
      this._onerror(B)
    }, this._transport.onmessage = (B, Q) => {
      if (Ct(B) || Vr0(B)) this._onresponse(B);
      else if (nJ1(B)) this._onrequest(B, Q);
      else if (Jr0(B)) this._onnotification(B);
      else this._onerror(new Error(`Unknown message type: ${JSON.stringify(B)}`))
    }, await this._transport.start()
  }
  _onclose() {
    var A;
    let B = this._responseHandlers;
    this._responseHandlers = new Map, this._progressHandlers.clear(), this._transport = void 0, (A = this.onclose) === null || A === void 0 || A.call(this);
    let Q = new _m(rR.ConnectionClosed, "Connection closed");
    for (let I of B.values()) I(Q)
  }
  _onerror(A) {
    var B;
    (B = this.onerror) === null || B === void 0 || B.call(this, A)
  }
  _onnotification(A) {
    var B;
    let Q = (B = this._notificationHandlers.get(A.method)) !== null && B !== void 0 ? B : this.fallbackNotificationHandler;
    if (Q === void 0) return;
    Promise.resolve().then(() => Q(A)).catch((I) => this._onerror(new Error(`Uncaught error in notification handler: ${I}`)))
  }
  _onrequest(A, B) {
    var Q, I, G, Z;
    let D = (Q = this._requestHandlers.get(A.method)) !== null && Q !== void 0 ? Q : this.fallbackRequestHandler;
    if (D === void 0) {
      (I = this._transport) === null || I === void 0 || I.send({
        jsonrpc: "2.0",
        id: A.id,
        error: {
          code: rR.MethodNotFound,
          message: "Method not found"
        }
      }).catch((J) => this._onerror(new Error(`Failed to send an error response: ${J}`)));
      return
    }
    let Y = new AbortController;
    this._requestHandlerAbortControllers.set(A.id, Y);
    let W = {
      signal: Y.signal,
      sessionId: (G = this._transport) === null || G === void 0 ? void 0 : G.sessionId,
      _meta: (Z = A.params) === null || Z === void 0 ? void 0 : Z._meta,
      sendNotification: (J) => this.notification(J, {
        relatedRequestId: A.id
      }),
      sendRequest: (J, F, X) => this.request(J, F, {
        ...X,
        relatedRequestId: A.id
      }),
      authInfo: B === null || B === void 0 ? void 0 : B.authInfo,
      requestId: A.id
    };
    Promise.resolve().then(() => D(A, W)).then((J) => {
      var F;
      if (Y.signal.aborted) return;
      return (F = this._transport) === null || F === void 0 ? void 0 : F.send({
        result: J,
        jsonrpc: "2.0",
        id: A.id
      })
    }, (J) => {
      var F, X;
      if (Y.signal.aborted) return;
      return (F = this._transport) === null || F === void 0 ? void 0 : F.send({
        jsonrpc: "2.0",
        id: A.id,
        error: {
          code: Number.isSafeInteger(J.code) ? J.code : rR.InternalError,
          message: (X = J.message) !== null && X !== void 0 ? X : "Internal error"
        }
      })
    }).catch((J) => this._onerror(new Error(`Failed to send response: ${J}`))).finally(() => {
      this._requestHandlerAbortControllers.delete(A.id)
    })
  }
  _onprogress(A) {
    let {
      progressToken: B,
      ...Q
    } = A.params, I = Number(B), G = this._progressHandlers.get(I);
    if (!G) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(A)}`));
      return
    }
    let Z = this._responseHandlers.get(I),
      D = this._timeoutInfo.get(I);
    if (D && Z && D.resetTimeoutOnProgress) try {
      this._resetTimeout(I)
    } catch (Y) {
      Z(Y);
      return
    }
    G(Q)
  }
  _onresponse(A) {
    let B = Number(A.id),
      Q = this._responseHandlers.get(B);
    if (Q === void 0) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(A)}`));
      return
    }
    if (this._responseHandlers.delete(B), this._progressHandlers.delete(B), this._cleanupTimeout(B), Ct(A)) Q(A);
    else {
      let I = new _m(A.error.code, A.error.message, A.error.data);
      Q(I)
    }
  }
  get transport() {
    return this._transport
  }
  async close() {
    var A;
    await ((A = this._transport) === null || A === void 0 ? void 0 : A.close())
  }
  request(A, B, Q) {
    let {
      relatedRequestId: I,
      resumptionToken: G,
      onresumptiontoken: Z
    } = Q !== null && Q !== void 0 ? Q : {};
    return new Promise((D, Y) => {
      var W, J, F, X, V;
      if (!this._transport) {
        Y(new Error("Not connected"));
        return
      }
      if (((W = this._options) === null || W === void 0 ? void 0 : W.enforceStrictCapabilities) === !0) this.assertCapabilityForMethod(A.method);
      (J = Q === null || Q === void 0 ? void 0 : Q.signal) === null || J === void 0 || J.throwIfAborted();
      let C = this._requestMessageId++,
        K = {
          ...A,
          jsonrpc: "2.0",
          id: C
        };
      if (Q === null || Q === void 0 ? void 0 : Q.onprogress) this._progressHandlers.set(C, Q.onprogress), K.params = {
        ...A.params,
        _meta: {
          progressToken: C
        }
      };
      let E = (O) => {
        var R;
        this._responseHandlers.delete(C), this._progressHandlers.delete(C), this._cleanupTimeout(C), (R = this._transport) === null || R === void 0 || R.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: C,
            reason: String(O)
          }
        }, {
          relatedRequestId: I,
          resumptionToken: G,
          onresumptiontoken: Z
        }).catch((T) => this._onerror(new Error(`Failed to send cancellation: ${T}`))), Y(O)
      };
      this._responseHandlers.set(C, (O) => {
        var R;
        if ((R = Q === null || Q === void 0 ? void 0 : Q.signal) === null || R === void 0 ? void 0 : R.aborted) return;
        if (O instanceof Error) return Y(O);
        try {
          let T = B.parse(O.result);
          D(T)
        } catch (T) {
          Y(T)
        }
      }), (F = Q === null || Q === void 0 ? void 0 : Q.signal) === null || F === void 0 || F.addEventListener("abort", () => {
        var O;
        E((O = Q === null || Q === void 0 ? void 0 : Q.signal) === null || O === void 0 ? void 0 : O.reason)
      });
      let N = (X = Q === null || Q === void 0 ? void 0 : Q.timeout) !== null && X !== void 0 ? X : kR6,
        q = () => E(new _m(rR.RequestTimeout, "Request timed out", {
          timeout: N
        }));
      this._setupTimeout(C, N, Q === null || Q === void 0 ? void 0 : Q.maxTotalTimeout, q, (V = Q === null || Q === void 0 ? void 0 : Q.resetTimeoutOnProgress) !== null && V !== void 0 ? V : !1), this._transport.send(K, {
        relatedRequestId: I,
        resumptionToken: G,
        onresumptiontoken: Z
      }).catch((O) => {
        this._cleanupTimeout(C), Y(O)
      })
    })
  }
  async notification(A, B) {
    if (!this._transport) throw new Error("Not connected");
    this.assertNotificationCapability(A.method);
    let Q = {
      ...A,
      jsonrpc: "2.0"
    };
    await this._transport.send(Q, B)
  }
  setRequestHandler(A, B) {
    let Q = A.shape.method.value;
    this.assertRequestHandlerCapability(Q), this._requestHandlers.set(Q, (I, G) => {
      return Promise.resolve(B(A.parse(I), G))
    })
  }
  removeRequestHandler(A) {
    this._requestHandlers.delete(A)
  }
  assertCanSetRequestHandler(A) {
    if (this._requestHandlers.has(A)) throw new Error(`A request handler for ${A} already exists, which would be overridden`)
  }
  setNotificationHandler(A, B) {
    this._notificationHandlers.set(A.shape.method.value, (Q) => Promise.resolve(B(A.parse(Q))))
  }
  removeNotificationHandler(A) {
    this._notificationHandlers.delete(A)
  }
}
// @from(Start 9126214, End 9126429)
function IF1(A, B) {
  return Object.entries(B).reduce((Q, [I, G]) => {
    if (G && typeof G === "object") Q[I] = Q[I] ? {
      ...Q[I],
      ...G
    } : G;
    else Q[I] = G;
    return Q
  }, {
    ...A
  })
}
// @from(Start 9126430, End 9132105)
class Ll1 extends wt {
  constructor(A, B) {
    var Q;
    super(B);
    this._clientInfo = A, this._capabilities = (Q = B === null || B === void 0 ? void 0 : B.capabilities) !== null && Q !== void 0 ? Q : {}
  }
  registerCapabilities(A) {
    if (this.transport) throw new Error("Cannot register capabilities after connecting to transport");
    this._capabilities = IF1(this._capabilities, A)
  }
  assertCapability(A, B) {
    var Q;
    if (!((Q = this._serverCapabilities) === null || Q === void 0 ? void 0 : Q[A])) throw new Error(`Server does not support ${A} (required for ${B})`)
  }
  async connect(A, B) {
    if (await super.connect(A), A.sessionId !== void 0) return;
    try {
      let Q = await this.request({
        method: "initialize",
        params: {
          protocolVersion: xj,
          capabilities: this._capabilities,
          clientInfo: this._clientInfo
        }
      }, Hl1, B);
      if (Q === void 0) throw new Error(`Server sent invalid initialize result: ${Q}`);
      if (!cJ1.includes(Q.protocolVersion)) throw new Error(`Server's protocol version is not supported: ${Q.protocolVersion}`);
      this._serverCapabilities = Q.capabilities, this._serverVersion = Q.serverInfo, this._instructions = Q.instructions, await this.notification({
        method: "notifications/initialized"
      })
    } catch (Q) {
      throw this.close(), Q
    }
  }
  getServerCapabilities() {
    return this._serverCapabilities
  }
  getServerVersion() {
    return this._serverVersion
  }
  getInstructions() {
    return this._instructions
  }
  assertCapabilityForMethod(A) {
    var B, Q, I, G, Z;
    switch (A) {
      case "logging/setLevel":
        if (!((B = this._serverCapabilities) === null || B === void 0 ? void 0 : B.logging)) throw new Error(`Server does not support logging (required for ${A})`);
        break;
      case "prompts/get":
      case "prompts/list":
        if (!((Q = this._serverCapabilities) === null || Q === void 0 ? void 0 : Q.prompts)) throw new Error(`Server does not support prompts (required for ${A})`);
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
      case "resources/subscribe":
      case "resources/unsubscribe":
        if (!((I = this._serverCapabilities) === null || I === void 0 ? void 0 : I.resources)) throw new Error(`Server does not support resources (required for ${A})`);
        if (A === "resources/subscribe" && !this._serverCapabilities.resources.subscribe) throw new Error(`Server does not support resource subscriptions (required for ${A})`);
        break;
      case "tools/call":
      case "tools/list":
        if (!((G = this._serverCapabilities) === null || G === void 0 ? void 0 : G.tools)) throw new Error(`Server does not support tools (required for ${A})`);
        break;
      case "completion/complete":
        if (!((Z = this._serverCapabilities) === null || Z === void 0 ? void 0 : Z.completions)) throw new Error(`Server does not support completions (required for ${A})`);
        break;
      case "initialize":
        break;
      case "ping":
        break
    }
  }
  assertNotificationCapability(A) {
    var B;
    switch (A) {
      case "notifications/roots/list_changed":
        if (!((B = this._capabilities.roots) === null || B === void 0 ? void 0 : B.listChanged)) throw new Error(`Client does not support roots list changed notifications (required for ${A})`);
        break;
      case "notifications/initialized":
        break;
      case "notifications/cancelled":
        break;
      case "notifications/progress":
        break
    }
  }
  assertRequestHandlerCapability(A) {
    switch (A) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling) throw new Error(`Client does not support sampling capability (required for ${A})`);
        break;
      case "roots/list":
        if (!this._capabilities.roots) throw new Error(`Client does not support roots capability (required for ${A})`);
        break;
      case "ping":
        break
    }
  }
  async ping(A) {
    return this.request({
      method: "ping"
    }, G$, A)
  }
  async complete(A, B) {
    return this.request({
      method: "completion/complete",
      params: A
    }, $l1, B)
  }
  async setLoggingLevel(A, B) {
    return this.request({
      method: "logging/setLevel",
      params: {
        level: A
      }
    }, G$, B)
  }
  async getPrompt(A, B) {
    return this.request({
      method: "prompts/get",
      params: A
    }, wl1, B)
  }
  async listPrompts(A, B) {
    return this.request({
      method: "prompts/list",
      params: A
    }, Ht, B)
  }
  async listResources(A, B) {
    return this.request({
      method: "resources/list",
      params: A
    }, fj, B)
  }
  async listResourceTemplates(A, B) {
    return this.request({
      method: "resources/templates/list",
      params: A
    }, zl1, B)
  }
  async readResource(A, B) {
    return this.request({
      method: "resources/read",
      params: A
    }, Kt, B)
  }
  async subscribeResource(A, B) {
    return this.request({
      method: "resources/subscribe",
      params: A
    }, G$, B)
  }
  async unsubscribeResource(A, B) {
    return this.request({
      method: "resources/unsubscribe",
      params: A
    }, G$, B)
  }
  async callTool(A, B = Sm, Q) {
    return this.request({
      method: "tools/call",
      params: A
    }, B, Q)
  }
  async listTools(A, B) {
    return this.request({
      method: "tools/list",
      params: A
    }, zt, B)
  }
  async sendRootsListChanged() {
    return this.notification({
      method: "notifications/roots/list_changed"
    })
  }
}
// @from(Start 9132110, End 9132128)
Wo0 = I1(Yo0(), 1)
// @from(Start 9132214, End 9132616)
class Et {
  append(A) {
    this._buffer = this._buffer ? Buffer.concat([this._buffer, A]) : A
  }
  readMessage() {
    if (!this._buffer) return null;
    let A = this._buffer.indexOf(`
`);
    if (A === -1) return null;
    let B = this._buffer.toString("utf8", 0, A).replace(/\r$/, "");
    return this._buffer = this._buffer.subarray(A + 1), JO6(B)
  }
  clear() {
    this._buffer = void 0
  }
}
// @from(Start 9132618, End 9132670)
function JO6(A) {
  return fw.parse(JSON.parse(A))
}
// @from(Start 9132672, End 9132724)
function ZF1(A) {
  return JSON.stringify(A) + `
`
}
// @from(Start 9132729, End 9132967)
XO6 = DF1.platform === "win32" ? ["APPDATA", "HOMEDRIVE", "HOMEPATH", "LOCALAPPDATA", "PATH", "PROCESSOR_ARCHITECTURE", "SYSTEMDRIVE", "SYSTEMROOT", "TEMP", "USERNAME", "USERPROFILE"] : ["HOME", "LOGNAME", "PATH", "SHELL", "TERM", "USER"]
// @from(Start 9132970, End 9133147)
function VO6() {
  let A = {};
  for (let B of XO6) {
    let Q = DF1.env[B];
    if (Q === void 0) continue;
    if (Q.startsWith("()")) continue;
    A[B] = Q
  }
  return A
}
// @from(Start 9133148, End 9136161)
class xl1 {
  constructor(A) {
    if (this._abortController = new AbortController, this._readBuffer = new Et, this._stderrStream = null, this._serverParams = A, A.stderr === "pipe" || A.stderr === "overlapped") this._stderrStream = new FO6
  }
  async start() {
    if (this._process) throw new Error("StdioClientTransport already started! If using Client class, note that connect() calls start() automatically.");
    return new Promise((A, B) => {
      var Q, I, G, Z, D, Y;
      if (this._process = Wo0.default(this._serverParams.command, (Q = this._serverParams.args) !== null && Q !== void 0 ? Q : [], {
          env: (I = this._serverParams.env) !== null && I !== void 0 ? I : VO6(),
          stdio: ["pipe", "pipe", (G = this._serverParams.stderr) !== null && G !== void 0 ? G : "inherit"],
          shell: !1,
          signal: this._abortController.signal,
          windowsHide: DF1.platform === "win32" && CO6(),
          cwd: this._serverParams.cwd
        }), this._process.on("error", (W) => {
          var J, F;
          if (W.name === "AbortError") {
            (J = this.onclose) === null || J === void 0 || J.call(this);
            return
          }
          B(W), (F = this.onerror) === null || F === void 0 || F.call(this, W)
        }), this._process.on("spawn", () => {
          A()
        }), this._process.on("close", (W) => {
          var J;
          this._process = void 0, (J = this.onclose) === null || J === void 0 || J.call(this)
        }), (Z = this._process.stdin) === null || Z === void 0 || Z.on("error", (W) => {
          var J;
          (J = this.onerror) === null || J === void 0 || J.call(this, W)
        }), (D = this._process.stdout) === null || D === void 0 || D.on("data", (W) => {
          this._readBuffer.append(W), this.processReadBuffer()
        }), (Y = this._process.stdout) === null || Y === void 0 || Y.on("error", (W) => {
          var J;
          (J = this.onerror) === null || J === void 0 || J.call(this, W)
        }), this._stderrStream && this._process.stderr) this._process.stderr.pipe(this._stderrStream)
    })
  }
  get stderr() {
    var A, B;
    if (this._stderrStream) return this._stderrStream;
    return (B = (A = this._process) === null || A === void 0 ? void 0 : A.stderr) !== null && B !== void 0 ? B : null
  }
  processReadBuffer() {
    var A, B;
    while (!0) try {
      let Q = this._readBuffer.readMessage();
      if (Q === null) break;
      (A = this.onmessage) === null || A === void 0 || A.call(this, Q)
    } catch (Q) {
      (B = this.onerror) === null || B === void 0 || B.call(this, Q)
    }
  }
  async close() {
    this._abortController.abort(), this._process = void 0, this._readBuffer.clear()
  }
  send(A) {
    return new Promise((B) => {
      var Q;
      if (!((Q = this._process) === null || Q === void 0 ? void 0 : Q.stdin)) throw new Error("Not connected");
      let I = ZF1(A);
      if (this._process.stdin.write(I)) B();
      else this._process.stdin.once("drain", B)
    })
  }
}
// @from(Start 9136163, End 9136204)
function CO6() {
  return "type" in DF1
}
// @from(Start 9136205, End 9136381)
class vl1 extends Error {
  constructor(A, B) {
    super(A), this.name = "ParseError", this.type = B.type, this.field = B.field, this.value = B.value, this.line = B.line
  }
}
// @from(Start 9136383, End 9136401)
function fl1(A) {}
// @from(Start 9136403, End 9138185)
function YF1(A) {
  if (typeof A == "function") throw new TypeError("`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?");
  let {
    onEvent: B = fl1,
    onError: Q = fl1,
    onRetry: I = fl1,
    onComment: G
  } = A, Z = "", D = !0, Y, W = "", J = "";

  function F(E) {
    let N = D ? E.replace(/^\xEF\xBB\xBF/, "") : E,
      [q, O] = KO6(`${Z}${N}`);
    for (let R of q) X(R);
    Z = O, D = !1
  }

  function X(E) {
    if (E === "") {
      C();
      return
    }
    if (E.startsWith(":")) {
      G && G(E.slice(E.startsWith(": ") ? 2 : 1));
      return
    }
    let N = E.indexOf(":");
    if (N !== -1) {
      let q = E.slice(0, N),
        O = E[N + 1] === " " ? 2 : 1,
        R = E.slice(N + O);
      V(q, R, E);
      return
    }
    V(E, "", E)
  }

  function V(E, N, q) {
    switch (E) {
      case "event":
        J = N;
        break;
      case "data":
        W = `${W}${N}
`;
        break;
      case "id":
        Y = N.includes("\x00") ? void 0 : N;
        break;
      case "retry":
        /^\d+$/.test(N) ? I(parseInt(N, 10)) : Q(new vl1(`Invalid \`retry\` value: "${N}"`, {
          type: "invalid-retry",
          value: N,
          line: q
        }));
        break;
      default:
        Q(new vl1(`Unknown field "${E.length>20?`${E.slice(0,20)}…`:E}"`, {
          type: "unknown-field",
          field: E,
          value: N,
          line: q
        }));
        break
    }
  }

  function C() {
    W.length > 0 && B({
      id: Y,
      event: J || void 0,
      data: W.endsWith(`
`) ? W.slice(0, -1) : W
    }), Y = void 0, W = "", J = ""
  }

  function K(E = {}) {
    Z && E.consume && X(Z), D = !0, Y = void 0, W = "", J = "", Z = ""
  }
  return {
    feed: F,
    reset: K
  }
}
// @from(Start 9138187, End 9138619)
function KO6(A) {
  let B = [],
    Q = "",
    I = 0;
  for (; I < A.length;) {
    let G = A.indexOf("\r", I),
      Z = A.indexOf(`
`, I),
      D = -1;
    if (G !== -1 && Z !== -1 ? D = Math.min(G, Z) : G !== -1 ? D = G : Z !== -1 && (D = Z), D === -1) {
      Q = A.slice(I);
      break
    } else {
      let Y = A.slice(I, D);
      B.push(Y), I = D + 1, A[I - 1] === "\r" && A[I] === `
` && I++
    }
  }
  return [B, Q]
}
// @from(Start 9138620, End 9139001)
class bl1 extends Event {
  constructor(A, B) {
    var Q, I;
    super(A), this.code = (Q = B == null ? void 0 : B.code) != null ? Q : void 0, this.message = (I = B == null ? void 0 : B.message) != null ? I : void 0
  } [Symbol.for("nodejs.util.inspect.custom")](A, B, Q) {
    return Q(Jo0(this), B)
  } [Symbol.for("Deno.customInspect")](A, B) {
    return A(Jo0(this), B)
  }
}
// @from(Start 9139003, End 9139136)
function HO6(A) {
  let B = globalThis.DOMException;
  return typeof B == "function" ? new B(A, "SyntaxError") : new SyntaxError(A)
}
// @from(Start 9139138, End 9139351)
function gl1(A) {
  return A instanceof Error ? "errors" in A && Array.isArray(A.errors) ? A.errors.map(gl1).join(", ") : ("cause" in A) && A.cause instanceof Error ? `${A}: ${gl1(A.cause)}` : A.message : `${A}`
}
// @from(Start 9139353, End 9139546)
function Jo0(A) {
  return {
    type: A.type,
    message: A.message,
    code: A.code,
    defaultPrevented: A.defaultPrevented,
    cancelable: A.cancelable,
    timeStamp: A.timeStamp
  }
}
// @from(Start 9139551, End 9139592)
Xo0 = (A) => {
    throw TypeError(A)
  }
// @from(Start 9139596, End 9139645)
il1 = (A, B, Q) => B.has(A) || Xo0("Cannot " + Q)
// @from(Start 9139649, End 9139731)
L6 = (A, B, Q) => (il1(A, B, "read from private field"), Q ? Q.call(A) : B.get(A))
// @from(Start 9139735, End 9139868)
p7 = (A, B, Q) => B.has(A) ? Xo0("Cannot add the same private member more than once") : B instanceof WeakSet ? B.add(A) : B.set(A, Q)
// @from(Start 9139872, End 9139946)
B3 = (A, B, Q, I) => (il1(A, B, "write to private field"), B.set(A, Q), Q)
// @from(Start 9139950, End 9140007)
Z$ = (A, B, Q) => (il1(A, B, "access private method"), Q)
// @from(Start 9140011, End 9140013)
BW
// @from(Start 9140015, End 9140017)
vj
// @from(Start 9140019, End 9140021)
km
// @from(Start 9140023, End 9140026)
WF1
// @from(Start 9140028, End 9140031)
JF1
// @from(Start 9140033, End 9140035)
$t
// @from(Start 9140037, End 9140039)
vm
// @from(Start 9140041, End 9140043)
qt
// @from(Start 9140045, End 9140047)
oR
// @from(Start 9140049, End 9140051)
xm
// @from(Start 9140053, End 9140055)
bm
// @from(Start 9140057, End 9140059)
fm
// @from(Start 9140061, End 9140063)
Ut
// @from(Start 9140065, End 9140067)
XK
// @from(Start 9140069, End 9140072)
hl1
// @from(Start 9140074, End 9140077)
ml1
// @from(Start 9140079, End 9140082)
dl1
// @from(Start 9140084, End 9140087)
Fo0
// @from(Start 9140089, End 9140092)
ul1
// @from(Start 9140094, End 9140097)
pl1
// @from(Start 9140099, End 9140101)
Nt
// @from(Start 9140103, End 9140106)
cl1
// @from(Start 9140108, End 9140111)
ll1
// @from(Start 9140113, End 9143944)
class gm extends EventTarget {
  constructor(A, B) {
    var Q, I;
    super(), p7(this, XK), this.CONNECTING = 0, this.OPEN = 1, this.CLOSED = 2, p7(this, BW), p7(this, vj), p7(this, km), p7(this, WF1), p7(this, JF1), p7(this, $t), p7(this, vm), p7(this, qt, null), p7(this, oR), p7(this, xm), p7(this, bm, null), p7(this, fm, null), p7(this, Ut, null), p7(this, ml1, async (G) => {
      var Z;
      L6(this, xm).reset();
      let {
        body: D,
        redirected: Y,
        status: W,
        headers: J
      } = G;
      if (W === 204) {
        Z$(this, XK, Nt).call(this, "Server sent HTTP 204, not reconnecting", 204), this.close();
        return
      }
      if (Y ? B3(this, km, new URL(G.url)) : B3(this, km, void 0), W !== 200) {
        Z$(this, XK, Nt).call(this, `Non-200 status code (${W})`, W);
        return
      }
      if (!(J.get("content-type") || "").startsWith("text/event-stream")) {
        Z$(this, XK, Nt).call(this, 'Invalid content type, expected "text/event-stream"', W);
        return
      }
      if (L6(this, BW) === this.CLOSED) return;
      B3(this, BW, this.OPEN);
      let F = new Event("open");
      if ((Z = L6(this, Ut)) == null || Z.call(this, F), this.dispatchEvent(F), typeof D != "object" || !D || !("getReader" in D)) {
        Z$(this, XK, Nt).call(this, "Invalid response body, expected a web ReadableStream", W), this.close();
        return
      }
      let X = new TextDecoder,
        V = D.getReader(),
        C = !0;
      do {
        let {
          done: K,
          value: E
        } = await V.read();
        E && L6(this, xm).feed(X.decode(E, {
          stream: !K
        })), K && (C = !1, L6(this, xm).reset(), Z$(this, XK, cl1).call(this))
      } while (C)
    }), p7(this, dl1, (G) => {
      B3(this, oR, void 0), !(G.name === "AbortError" || G.type === "aborted") && Z$(this, XK, cl1).call(this, gl1(G))
    }), p7(this, ul1, (G) => {
      typeof G.id == "string" && B3(this, qt, G.id);
      let Z = new MessageEvent(G.event || "message", {
        data: G.data,
        origin: L6(this, km) ? L6(this, km).origin : L6(this, vj).origin,
        lastEventId: G.id || ""
      });
      L6(this, fm) && (!G.event || G.event === "message") && L6(this, fm).call(this, Z), this.dispatchEvent(Z)
    }), p7(this, pl1, (G) => {
      B3(this, $t, G)
    }), p7(this, ll1, () => {
      B3(this, vm, void 0), L6(this, BW) === this.CONNECTING && Z$(this, XK, hl1).call(this)
    });
    try {
      if (A instanceof URL) B3(this, vj, A);
      else if (typeof A == "string") B3(this, vj, new URL(A, zO6()));
      else throw new Error("Invalid URL")
    } catch {
      throw HO6("An invalid or illegal string was specified")
    }
    B3(this, xm, YF1({
      onEvent: L6(this, ul1),
      onRetry: L6(this, pl1)
    })), B3(this, BW, this.CONNECTING), B3(this, $t, 3000), B3(this, JF1, (Q = B == null ? void 0 : B.fetch) != null ? Q : globalThis.fetch), B3(this, WF1, (I = B == null ? void 0 : B.withCredentials) != null ? I : !1), Z$(this, XK, hl1).call(this)
  }
  get readyState() {
    return L6(this, BW)
  }
  get url() {
    return L6(this, vj).href
  }
  get withCredentials() {
    return L6(this, WF1)
  }
  get onerror() {
    return L6(this, bm)
  }
  set onerror(A) {
    B3(this, bm, A)
  }
  get onmessage() {
    return L6(this, fm)
  }
  set onmessage(A) {
    B3(this, fm, A)
  }
  get onopen() {
    return L6(this, Ut)
  }
  set onopen(A) {
    B3(this, Ut, A)
  }
  addEventListener(A, B, Q) {
    let I = B;
    super.addEventListener(A, I, Q)
  }
  removeEventListener(A, B, Q) {
    let I = B;
    super.removeEventListener(A, I, Q)
  }
  close() {
    L6(this, vm) && clearTimeout(L6(this, vm)), L6(this, BW) !== this.CLOSED && (L6(this, oR) && L6(this, oR).abort(), B3(this, BW, this.CLOSED), B3(this, oR, void 0))
  }
}
// @from(Start 9145476, End 9145667)
function zO6() {
  let A = "document" in globalThis ? globalThis.document : void 0;
  return A && typeof A == "object" && "baseURI" in A && typeof A.baseURI == "string" ? A.baseURI : void 0
}
// @from(Start 9145672, End 9145675)
nl1
// @from(Start 9145784, End 9145865)
async function wO6(A) {
  return (await nl1).getRandomValues(new Uint8Array(A))
}
// @from(Start 9145866, End 9146079)
async function EO6(A) {
  let Q = "",
    I = await wO6(A);
  for (let G = 0; G < A; G++) {
    let Z = I[G] % 66;
    Q += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~" [Z]
  }
  return Q
}
// @from(Start 9146080, End 9146127)
async function UO6(A) {
  return await EO6(A)
}
// @from(Start 9146128, End 9146351)
async function NO6(A) {
  let B = await (await nl1).subtle.digest("SHA-256", new TextEncoder().encode(A));
  return btoa(String.fromCharCode(...new Uint8Array(B))).replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "")
}
// @from(Start 9146352, End 9146587)
async function al1(A) {
  if (!A) A = 43;
  if (A < 43 || A > 128) throw `Expected a length between 43 and 128. Received ${A}.`;
  let B = await UO6(A),
    Q = await NO6(B);
  return {
    code_verifier: B,
    code_challenge: Q
  }
}
// @from(Start 9146592, End 9147726)
Vo0 = n.object({
    issuer: n.string(),
    authorization_endpoint: n.string(),
    token_endpoint: n.string(),
    registration_endpoint: n.string().optional(),
    scopes_supported: n.array(n.string()).optional(),
    response_types_supported: n.array(n.string()),
    response_modes_supported: n.array(n.string()).optional(),
    grant_types_supported: n.array(n.string()).optional(),
    token_endpoint_auth_methods_supported: n.array(n.string()).optional(),
    token_endpoint_auth_signing_alg_values_supported: n.array(n.string()).optional(),
    service_documentation: n.string().optional(),
    revocation_endpoint: n.string().optional(),
    revocation_endpoint_auth_methods_supported: n.array(n.string()).optional(),
    revocation_endpoint_auth_signing_alg_values_supported: n.array(n.string()).optional(),
    introspection_endpoint: n.string().optional(),
    introspection_endpoint_auth_methods_supported: n.array(n.string()).optional(),
    introspection_endpoint_auth_signing_alg_values_supported: n.array(n.string()).optional(),
    code_challenge_methods_supported: n.array(n.string()).optional()
  }).passthrough()
// @from(Start 9147730, End 9147931)
sl1 = n.object({
    access_token: n.string(),
    token_type: n.string(),
    expires_in: n.number().optional(),
    scope: n.string().optional(),
    refresh_token: n.string().optional()
  }).strip()
// @from(Start 9147935, End 9148062)
Co0 = n.object({
    error: n.string(),
    error_description: n.string().optional(),
    error_uri: n.string().optional()
  })
// @from(Start 9148066, End 9148824)
$O6 = n.object({
    redirect_uris: n.array(n.string()).refine((A) => A.every((B) => URL.canParse(B)), {
      message: "redirect_uris must contain valid URLs"
    }),
    token_endpoint_auth_method: n.string().optional(),
    grant_types: n.array(n.string()).optional(),
    response_types: n.array(n.string()).optional(),
    client_name: n.string().optional(),
    client_uri: n.string().optional(),
    logo_uri: n.string().optional(),
    scope: n.string().optional(),
    contacts: n.array(n.string()).optional(),
    tos_uri: n.string().optional(),
    policy_uri: n.string().optional(),
    jwks_uri: n.string().optional(),
    jwks: n.any().optional(),
    software_id: n.string().optional(),
    software_version: n.string().optional()
  }).strip()
// @from(Start 9148828, End 9149026)
qO6 = n.object({
    client_id: n.string(),
    client_secret: n.string().optional(),
    client_id_issued_at: n.number().optional(),
    client_secret_expires_at: n.number().optional()
  }).strip()
// @from(Start 9149030, End 9149050)
Ko0 = $O6.merge(qO6)
// @from(Start 9149054, End 9149151)
Ef8 = n.object({
    error: n.string(),
    error_description: n.string().optional()
  }).strip()
// @from(Start 9149155, End 9149250)
Uf8 = n.object({
    token: n.string(),
    token_type_hint: n.string().optional()
  }).strip()
// @from(Start 9149252, End 9149360)
class vJ extends Error {
  constructor(A) {
    super(A !== null && A !== void 0 ? A : "Unauthorized")
  }
}
// @from(Start 9149361, End 9150767)
async function VK(A, {
  serverUrl: B,
  authorizationCode: Q
}) {
  let I = await rl1(B),
    G = await Promise.resolve(A.clientInformation());
  if (!G) {
    if (Q !== void 0) throw new Error("Existing OAuth client information is required when exchanging an authorization code");
    if (!A.saveClientInformation) throw new Error("OAuth client information must be saveable for dynamic registration");
    let W = await OO6(B, {
      metadata: I,
      clientMetadata: A.clientMetadata
    });
    await A.saveClientInformation(W), G = W
  }
  if (Q !== void 0) {
    let W = await A.codeVerifier(),
      J = await LO6(B, {
        metadata: I,
        clientInformation: G,
        authorizationCode: Q,
        codeVerifier: W,
        redirectUri: A.redirectUrl
      });
    return await A.saveTokens(J), "AUTHORIZED"
  }
  let Z = await A.tokens();
  if (Z === null || Z === void 0 ? void 0 : Z.refresh_token) try {
    let W = await RO6(B, {
      metadata: I,
      clientInformation: G,
      refreshToken: Z.refresh_token
    });
    return await A.saveTokens(W), "AUTHORIZED"
  } catch (W) {
    console.error("Could not refresh OAuth tokens:", W)
  }
  let {
    authorizationUrl: D,
    codeVerifier: Y
  } = await MO6(B, {
    metadata: I,
    clientInformation: G,
    redirectUrl: A.redirectUrl
  });
  return await A.saveCodeVerifier(Y), await A.redirectToAuthorization(D), "REDIRECT"
}
// @from(Start 9150768, End 9151317)
async function rl1(A, B) {
  var Q;
  let I = new URL("/.well-known/oauth-authorization-server", A),
    G;
  try {
    G = await fetch(I, {
      headers: {
        "MCP-Protocol-Version": (Q = B === null || B === void 0 ? void 0 : B.protocolVersion) !== null && Q !== void 0 ? Q : xj
      }
    })
  } catch (Z) {
    if (Z instanceof TypeError) G = await fetch(I);
    else throw Z
  }
  if (G.status === 404) return;
  if (!G.ok) throw new Error(`HTTP ${G.status} trying to load well-known OAuth metadata`);
  return Vo0.parse(await G.json())
}
// @from(Start 9151318, End 9152194)
async function MO6(A, {
  metadata: B,
  clientInformation: Q,
  redirectUrl: I
}) {
  let D;
  if (B) {
    if (D = new URL(B.authorization_endpoint), !B.response_types_supported.includes("code")) throw new Error("Incompatible auth server: does not support response type code");
    if (!B.code_challenge_methods_supported || !B.code_challenge_methods_supported.includes("S256")) throw new Error("Incompatible auth server: does not support code challenge method S256")
  } else D = new URL("/authorize", A);
  let Y = await al1(),
    W = Y.code_verifier,
    J = Y.code_challenge;
  return D.searchParams.set("response_type", "code"), D.searchParams.set("client_id", Q.client_id), D.searchParams.set("code_challenge", J), D.searchParams.set("code_challenge_method", "S256"), D.searchParams.set("redirect_uri", String(I)), {
    authorizationUrl: D,
    codeVerifier: W
  }
}
// @from(Start 9152195, End 9153078)
async function LO6(A, {
  metadata: B,
  clientInformation: Q,
  authorizationCode: I,
  codeVerifier: G,
  redirectUri: Z
}) {
  let Y;
  if (B) {
    if (Y = new URL(B.token_endpoint), B.grant_types_supported && !B.grant_types_supported.includes("authorization_code")) throw new Error("Incompatible auth server: does not support grant type authorization_code")
  } else Y = new URL("/token", A);
  let W = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: Q.client_id,
    code: I,
    code_verifier: G,
    redirect_uri: String(Z)
  });
  if (Q.client_secret) W.set("client_secret", Q.client_secret);
  let J = await fetch(Y, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: W
  });
  if (!J.ok) throw new Error(`Token exchange failed: HTTP ${J.status}`);
  return sl1.parse(await J.json())
}
// @from(Start 9153079, End 9153862)
async function RO6(A, {
  metadata: B,
  clientInformation: Q,
  refreshToken: I
}) {
  let Z;
  if (B) {
    if (Z = new URL(B.token_endpoint), B.grant_types_supported && !B.grant_types_supported.includes("refresh_token")) throw new Error("Incompatible auth server: does not support grant type refresh_token")
  } else Z = new URL("/token", A);
  let D = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: Q.client_id,
    refresh_token: I
  });
  if (Q.client_secret) D.set("client_secret", Q.client_secret);
  let Y = await fetch(Z, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: D
  });
  if (!Y.ok) throw new Error(`Token refresh failed: HTTP ${Y.status}`);
  return sl1.parse(await Y.json())
}
// @from(Start 9153863, End 9154417)
async function OO6(A, {
  metadata: B,
  clientMetadata: Q
}) {
  let I;
  if (B) {
    if (!B.registration_endpoint) throw new Error("Incompatible auth server: does not support dynamic client registration");
    I = new URL(B.registration_endpoint)
  } else I = new URL("/register", A);
  let G = await fetch(I, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(Q)
  });
  if (!G.ok) throw new Error(`Dynamic client registration failed: HTTP ${G.status}`);
  return Ko0.parse(await G.json())
}
// @from(Start 9154418, End 9154538)
class Ho0 extends Error {
  constructor(A, B, Q) {
    super(`SSE error: ${B}`);
    this.code = A, this.event = Q
  }
}