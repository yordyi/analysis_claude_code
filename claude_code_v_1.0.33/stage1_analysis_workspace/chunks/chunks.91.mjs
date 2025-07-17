
// @from(Start 9154539, End 9158789)
class FF1 {
  constructor(A, B) {
    this._url = A, this._eventSourceInit = B === null || B === void 0 ? void 0 : B.eventSourceInit, this._requestInit = B === null || B === void 0 ? void 0 : B.requestInit, this._authProvider = B === null || B === void 0 ? void 0 : B.authProvider
  }
  async _authThenStart() {
    var A;
    if (!this._authProvider) throw new vJ("No auth provider");
    let B;
    try {
      B = await VK(this._authProvider, {
        serverUrl: this._url
      })
    } catch (Q) {
      throw (A = this.onerror) === null || A === void 0 || A.call(this, Q), Q
    }
    if (B !== "AUTHORIZED") throw new vJ;
    return await this._startOrAuth()
  }
  async _commonHeaders() {
    let A = {};
    if (this._authProvider) {
      let B = await this._authProvider.tokens();
      if (B) A.Authorization = `Bearer ${B.access_token}`
    }
    return A
  }
  _startOrAuth() {
    return new Promise((A, B) => {
      var Q;
      this._eventSource = new gm(this._url.href, (Q = this._eventSourceInit) !== null && Q !== void 0 ? Q : {
        fetch: (I, G) => this._commonHeaders().then((Z) => fetch(I, {
          ...G,
          headers: {
            ...Z,
            Accept: "text/event-stream"
          }
        }))
      }), this._abortController = new AbortController, this._eventSource.onerror = (I) => {
        var G;
        if (I.code === 401 && this._authProvider) {
          this._authThenStart().then(A, B);
          return
        }
        let Z = new Ho0(I.code, I.message, I);
        B(Z), (G = this.onerror) === null || G === void 0 || G.call(this, Z)
      }, this._eventSource.onopen = () => {}, this._eventSource.addEventListener("endpoint", (I) => {
        var G;
        let Z = I;
        try {
          if (this._endpoint = new URL(Z.data, this._url), this._endpoint.origin !== this._url.origin) throw new Error(`Endpoint origin does not match connection origin: ${this._endpoint.origin}`)
        } catch (D) {
          B(D), (G = this.onerror) === null || G === void 0 || G.call(this, D), this.close();
          return
        }
        A()
      }), this._eventSource.onmessage = (I) => {
        var G, Z;
        let D = I,
          Y;
        try {
          Y = fw.parse(JSON.parse(D.data))
        } catch (W) {
          (G = this.onerror) === null || G === void 0 || G.call(this, W);
          return
        }(Z = this.onmessage) === null || Z === void 0 || Z.call(this, Y)
      }
    })
  }
  async start() {
    if (this._eventSource) throw new Error("SSEClientTransport already started! If using Client class, note that connect() calls start() automatically.");
    return await this._startOrAuth()
  }
  async finishAuth(A) {
    if (!this._authProvider) throw new vJ("No auth provider");
    if (await VK(this._authProvider, {
        serverUrl: this._url,
        authorizationCode: A
      }) !== "AUTHORIZED") throw new vJ("Failed to authorize")
  }
  async close() {
    var A, B, Q;
    (A = this._abortController) === null || A === void 0 || A.abort(), (B = this._eventSource) === null || B === void 0 || B.close(), (Q = this.onclose) === null || Q === void 0 || Q.call(this)
  }
  async send(A) {
    var B, Q, I;
    if (!this._endpoint) throw new Error("Not connected");
    try {
      let G = await this._commonHeaders(),
        Z = new Headers({
          ...G,
          ...(B = this._requestInit) === null || B === void 0 ? void 0 : B.headers
        });
      Z.set("content-type", "application/json");
      let D = {
          ...this._requestInit,
          method: "POST",
          headers: Z,
          body: JSON.stringify(A),
          signal: (Q = this._abortController) === null || Q === void 0 ? void 0 : Q.signal
        },
        Y = await fetch(this._endpoint, D);
      if (!Y.ok) {
        if (Y.status === 401 && this._authProvider) {
          if (await VK(this._authProvider, {
              serverUrl: this._url
            }) !== "AUTHORIZED") throw new vJ;
          return this.send(A)
        }
        let W = await Y.text().catch(() => null);
        throw new Error(`Error POSTing to endpoint (HTTP ${Y.status}): ${W}`)
      }
    } catch (G) {
      throw (I = this.onerror) === null || I === void 0 || I.call(this, G), G
    }
  }
}
// @from(Start 9158790, End 9159263)
class ol1 extends TransformStream {
  constructor({
    onError: A,
    onRetry: B,
    onComment: Q
  } = {}) {
    let I;
    super({
      start(G) {
        I = YF1({
          onEvent: (Z) => {
            G.enqueue(Z)
          },
          onError(Z) {
            A === "terminate" ? G.error(Z) : typeof A == "function" && A(Z)
          },
          onRetry: B,
          onComment: Q
        })
      },
      transform(G) {
        I.feed(G)
      }
    })
  }
}
// @from(Start 9159268, End 9159394)
TO6 = {
  initialReconnectionDelay: 1000,
  maxReconnectionDelay: 30000,
  reconnectionDelayGrowFactor: 1.5,
  maxRetries: 2
}
// @from(Start 9159396, End 9159509)
class XF1 extends Error {
  constructor(A, B) {
    super(`Streamable HTTP error: ${B}`);
    this.code = A
  }
}
// @from(Start 9159510, End 9167524)
class tl1 {
  constructor(A, B) {
    var Q;
    this._url = A, this._requestInit = B === null || B === void 0 ? void 0 : B.requestInit, this._authProvider = B === null || B === void 0 ? void 0 : B.authProvider, this._sessionId = B === null || B === void 0 ? void 0 : B.sessionId, this._reconnectionOptions = (Q = B === null || B === void 0 ? void 0 : B.reconnectionOptions) !== null && Q !== void 0 ? Q : TO6
  }
  async _authThenStart() {
    var A;
    if (!this._authProvider) throw new vJ("No auth provider");
    let B;
    try {
      B = await VK(this._authProvider, {
        serverUrl: this._url
      })
    } catch (Q) {
      throw (A = this.onerror) === null || A === void 0 || A.call(this, Q), Q
    }
    if (B !== "AUTHORIZED") throw new vJ;
    return await this._startOrAuthSse({
      resumptionToken: void 0
    })
  }
  async _commonHeaders() {
    var A;
    let B = {};
    if (this._authProvider) {
      let Q = await this._authProvider.tokens();
      if (Q) B.Authorization = `Bearer ${Q.access_token}`
    }
    if (this._sessionId) B["mcp-session-id"] = this._sessionId;
    return new Headers({
      ...B,
      ...(A = this._requestInit) === null || A === void 0 ? void 0 : A.headers
    })
  }
  async _startOrAuthSse(A) {
    var B, Q;
    let {
      resumptionToken: I
    } = A;
    try {
      let G = await this._commonHeaders();
      if (G.set("Accept", "text/event-stream"), I) G.set("last-event-id", I);
      let Z = await fetch(this._url, {
        method: "GET",
        headers: G,
        signal: (B = this._abortController) === null || B === void 0 ? void 0 : B.signal
      });
      if (!Z.ok) {
        if (Z.status === 401 && this._authProvider) return await this._authThenStart();
        if (Z.status === 405) return;
        throw new XF1(Z.status, `Failed to open SSE stream: ${Z.statusText}`)
      }
      this._handleSseStream(Z.body, A)
    } catch (G) {
      throw (Q = this.onerror) === null || Q === void 0 || Q.call(this, G), G
    }
  }
  _getNextReconnectionDelay(A) {
    let B = this._reconnectionOptions.initialReconnectionDelay,
      Q = this._reconnectionOptions.reconnectionDelayGrowFactor,
      I = this._reconnectionOptions.maxReconnectionDelay;
    return Math.min(B * Math.pow(Q, A), I)
  }
  _scheduleReconnection(A, B = 0) {
    var Q;
    let I = this._reconnectionOptions.maxRetries;
    if (I > 0 && B >= I) {
      (Q = this.onerror) === null || Q === void 0 || Q.call(this, new Error(`Maximum reconnection attempts (${I}) exceeded.`));
      return
    }
    let G = this._getNextReconnectionDelay(B);
    setTimeout(() => {
      this._startOrAuthSse(A).catch((Z) => {
        var D;
        (D = this.onerror) === null || D === void 0 || D.call(this, new Error(`Failed to reconnect SSE stream: ${Z instanceof Error?Z.message:String(Z)}`)), this._scheduleReconnection(A, B + 1)
      })
    }, G)
  }
  _handleSseStream(A, B) {
    if (!A) return;
    let {
      onresumptiontoken: Q,
      replayMessageId: I
    } = B, G;
    (async () => {
      var D, Y, W, J;
      try {
        let F = A.pipeThrough(new TextDecoderStream).pipeThrough(new ol1).getReader();
        while (!0) {
          let {
            value: X,
            done: V
          } = await F.read();
          if (V) break;
          if (X.id) G = X.id, Q === null || Q === void 0 || Q(X.id);
          if (!X.event || X.event === "message") try {
            let C = fw.parse(JSON.parse(X.data));
            if (I !== void 0 && Ct(C)) C.id = I;
            (D = this.onmessage) === null || D === void 0 || D.call(this, C)
          } catch (C) {
            (Y = this.onerror) === null || Y === void 0 || Y.call(this, C)
          }
        }
      } catch (F) {
        if ((W = this.onerror) === null || W === void 0 || W.call(this, new Error(`SSE stream disconnected: ${F}`)), this._abortController && !this._abortController.signal.aborted) {
          if (G !== void 0) try {
            this._scheduleReconnection({
              resumptionToken: G,
              onresumptiontoken: Q,
              replayMessageId: I
            }, 0)
          } catch (X) {
            (J = this.onerror) === null || J === void 0 || J.call(this, new Error(`Failed to reconnect: ${X instanceof Error?X.message:String(X)}`))
          }
        }
      }
    })()
  }
  async start() {
    if (this._abortController) throw new Error("StreamableHTTPClientTransport already started! If using Client class, note that connect() calls start() automatically.");
    this._abortController = new AbortController
  }
  async finishAuth(A) {
    if (!this._authProvider) throw new vJ("No auth provider");
    if (await VK(this._authProvider, {
        serverUrl: this._url,
        authorizationCode: A
      }) !== "AUTHORIZED") throw new vJ("Failed to authorize")
  }
  async close() {
    var A, B;
    (A = this._abortController) === null || A === void 0 || A.abort(), (B = this.onclose) === null || B === void 0 || B.call(this)
  }
  async send(A, B) {
    var Q, I, G;
    try {
      let {
        resumptionToken: Z,
        onresumptiontoken: D
      } = B || {};
      if (Z) {
        this._startOrAuthSse({
          resumptionToken: Z,
          replayMessageId: nJ1(A) ? A.id : void 0
        }).catch((K) => {
          var E;
          return (E = this.onerror) === null || E === void 0 ? void 0 : E.call(this, K)
        });
        return
      }
      let Y = await this._commonHeaders();
      Y.set("content-type", "application/json"), Y.set("accept", "application/json, text/event-stream");
      let W = {
          ...this._requestInit,
          method: "POST",
          headers: Y,
          body: JSON.stringify(A),
          signal: (Q = this._abortController) === null || Q === void 0 ? void 0 : Q.signal
        },
        J = await fetch(this._url, W),
        F = J.headers.get("mcp-session-id");
      if (F) this._sessionId = F;
      if (!J.ok) {
        if (J.status === 401 && this._authProvider) {
          if (await VK(this._authProvider, {
              serverUrl: this._url
            }) !== "AUTHORIZED") throw new vJ;
          return this.send(A)
        }
        let K = await J.text().catch(() => null);
        throw new Error(`Error POSTing to endpoint (HTTP ${J.status}): ${K}`)
      }
      if (J.status === 202) {
        if (Kr0(A)) this._startOrAuthSse({
          resumptionToken: void 0
        }).catch((K) => {
          var E;
          return (E = this.onerror) === null || E === void 0 ? void 0 : E.call(this, K)
        });
        return
      }
      let V = (Array.isArray(A) ? A : [A]).filter((K) => ("method" in K) && ("id" in K) && K.id !== void 0).length > 0,
        C = J.headers.get("content-type");
      if (V)
        if (C === null || C === void 0 ? void 0 : C.includes("text/event-stream")) this._handleSseStream(J.body, {
          onresumptiontoken: D
        });
        else if (C === null || C === void 0 ? void 0 : C.includes("application/json")) {
        let K = await J.json(),
          E = Array.isArray(K) ? K.map((N) => fw.parse(N)) : [fw.parse(K)];
        for (let N of E)(I = this.onmessage) === null || I === void 0 || I.call(this, N)
      } else throw new XF1(-1, `Unexpected content type: ${C}`)
    } catch (Z) {
      throw (G = this.onerror) === null || G === void 0 || G.call(this, Z), Z
    }
  }
  get sessionId() {
    return this._sessionId
  }
  async terminateSession() {
    var A, B;
    if (!this._sessionId) return;
    try {
      let Q = await this._commonHeaders(),
        I = {
          ...this._requestInit,
          method: "DELETE",
          headers: Q,
          signal: (A = this._abortController) === null || A === void 0 ? void 0 : A.signal
        },
        G = await fetch(this._url, I);
      if (!G.ok && G.status !== 405) throw new XF1(G.status, `Failed to terminate session: ${G.statusText}`);
      this._sessionId = void 0
    } catch (Q) {
      throw (B = this.onerror) === null || B === void 0 || B.call(this, Q), Q
    }
  }
}
// @from(Start 9167789, End 9167806)
Ki1 = I1(gj(), 1)
// @from(Start 9167810, End 9167846)
Hi1 = "claude-code-jetbrains-plugin"
// @from(Start 9167850, End 9168270)
LF1 = {
    pycharm: ["PyCharm"],
    intellij: ["IntelliJIdea", "IdeaIC"],
    webstorm: ["WebStorm"],
    phpstorm: ["PhpStorm"],
    rubymine: ["RubyMine"],
    clion: ["CLion"],
    goland: ["GoLand"],
    rider: ["Rider"],
    datagrip: ["DataGrip"],
    appcode: ["AppCode"],
    dataspell: ["DataSpell"],
    aqua: ["Aqua"],
    gateway: ["Gateway"],
    fleet: ["Fleet"],
    androidstudio: ["AndroidStudio"]
  }
// @from(Start 9168273, End 9169279)
function $S6(A) {
  let B = kt.homedir(),
    Q = [],
    I = LF1[A.toLowerCase()];
  if (!I) return Q;
  let G = process.env.APPDATA || Q3.join(B, "AppData", "Roaming"),
    Z = process.env.LOCALAPPDATA || Q3.join(B, "AppData", "Local");
  switch (kt.platform()) {
    case "darwin":
      if (Q.push(Q3.join(B, "Library", "Application Support", "JetBrains"), Q3.join(B, "Library", "Application Support")), A.toLowerCase() === "androidstudio") Q.push(Q3.join(B, "Library", "Application Support", "Google"));
      break;
    case "win32":
      if (Q.push(Q3.join(G, "JetBrains"), Q3.join(Z, "JetBrains"), Q3.join(G)), A.toLowerCase() === "androidstudio") Q.push(Q3.join(Z, "Google"));
      break;
    case "linux":
      Q.push(Q3.join(B, ".config", "JetBrains"), Q3.join(B, ".local", "share", "JetBrains"));
      for (let D of I) Q.push(Q3.join(B, "." + D));
      if (A.toLowerCase() === "androidstudio") Q.push(Q3.join(B, ".config", "Google"));
      break;
    default:
      break
  }
  return Q
}
// @from(Start 9169281, End 9169857)
function zi1(A) {
  let B = [],
    Q = x1(),
    I = $S6(A),
    G = LF1[A.toLowerCase()];
  if (!G) return B;
  for (let Z of I) {
    if (!Q.existsSync(Z)) continue;
    for (let D of G) {
      let Y = new RegExp("^" + D + ".*$"),
        W = Q.readdirSync(Z).filter((J) => Y.test(J.name) && Q.statSync(Q3.join(Z, J.name)).isDirectory()).map((J) => Q3.join(Z, J.name));
      for (let J of W) {
        let F = kt.platform() === "linux" ? J : Q3.join(J, "plugins");
        if (Q.existsSync(F)) B.push(F)
      }
    }
  }
  return B.filter((Z, D) => B.indexOf(Z) === D)
}
// @from(Start 9169859, End 9170181)
function MF1(A) {
  let B = Q3.join(A, "lib"),
    Q = x1();
  if (Q.existsSync(B)) {
    let I = Q.readdirSync(B),
      G = new RegExp("^claude-code-jetbrains-plugin-(\\d+\\.\\d+\\.\\d+(?:-[a-zA-Z0-9.]+)?)\\.jar$");
    for (let Z of I) {
      let D = Z.name.match(G);
      if (D) return D[1]
    }
  }
  return null
}
// @from(Start 9170183, End 9170452)
function jt(A, B) {
  let Q = x1();
  if (!Q.existsSync(B)) Q.mkdirSync(B);
  let I = Q.readdirSync(A);
  for (let G of I) {
    let Z = Q3.join(A, G.name),
      D = Q3.join(B, G.name);
    if (Q.statSync(Z).isDirectory()) jt(Z, D);
    else Q.copyFileSync(Z, D)
  }
}
// @from(Start 9170454, End 9170659)
function yt(A) {
  let B = x1();
  if (B.existsSync(A)) B.readdirSync(A).forEach((Q) => {
    let I = Q3.join(A, Q.name);
    if (B.statSync(I).isDirectory()) yt(I);
    else B.unlinkSync(I)
  }), NS6(A)
}
// @from(Start 9170660, End 9171363)
async function De0(A, B) {
  let Q = x1(),
    I = [];
  if (!Q.existsSync(B) || !Q.statSync(B).isDirectory()) {
    E1("tengu_ext_jetbrains_extension_install_source_missing", {});
    return
  }
  if (!MF1(B)) {
    E1("tengu_ext_jetbrains_extension_install_error_reading_version", {});
    return
  }
  for (let Z of Object.keys(LF1)) {
    let D = zi1(Z);
    if (D.length === 0) continue;
    for (let Y of D) try {
      let W = Q3.join(Y, Hi1);
      if (Q.existsSync(W)) {
        let J = MF1(W);
        if (J)
          if (Ki1.gt(A, J, {
              loose: !0
            })) yt(W), jt(B, W), I.push(W), E1("tengu_ext_upgraded", {});
          else I.push(W)
      }
    } catch (W) {}
  }
}
// @from(Start 9171364, End 9172515)
async function Ye0(A, B) {
  let Q = x1(),
    I = [];
  if (!LF1[A.toLowerCase()]) throw E1("tengu_ext_jetbrains_extension_install_unknown_ide", {}), new Error(`Unsupported IDE: ${A}`);
  if (!Q.existsSync(B) || !Q.statSync(B).isDirectory()) throw E1("tengu_ext_jetbrains_extension_install_source_missing", {}), new Error("Plugin source missing");
  let G = MF1(B);
  if (!G) throw E1("tengu_ext_jetbrains_extension_install_error_reading_version", {}), new Error("Error reading version from plugin");
  let Z = zi1(A);
  if (Z.length === 0) throw E1("tengu_ext_jetbrains_extension_install_no_plugin_directories", {}), new Error(`Could not find plugin directories for ${A}`);
  for (let D of Z) try {
    let Y = Q3.join(D, Hi1);
    if (Q.existsSync(Y)) {
      let W = MF1(Y);
      if (!W) yt(Y), jt(B, Y), I.push(Y);
      else if (Ki1.gt(G, W, {
          loose: !0
        })) yt(Y), jt(B, Y), I.push(Y);
      else I.push(Y)
    } else yt(Y), jt(B, Y), I.push(Y)
  } catch (Y) {}
  if (!I.length) throw E1("tengu_ext_jetbrains_extension_install_error_installing", {}), new Error("Could not write plugin to any of the directories");
  return G
}
// @from(Start 9172517, End 9172658)
function We0(A) {
  let B = zi1(A);
  for (let Q of B) {
    let I = Q3.join(Q, Hi1);
    if (x1().existsSync(I)) return !0
  }
  return !1
}
// @from(Start 9172712, End 9172728)
H7 = I1(U1(), 1)
// @from(Start 9172734, End 9172750)
xt = I1(U1(), 1)
// @from(Start 9172753, End 9172907)
function bw() {
  return xt.createElement(P, {
    color: "permission"
  }, "Press ", xt.createElement(P, {
    bold: !0
  }, "Enter"), " to continue…")
}
// @from(Start 9172909, End 9174664)
function Je0({
  onDone: A,
  installedVersion: B
}) {
  let Q = Y2();
  qS6(), Z0((Y, W) => {
    if (W.escape || W.return) A()
  });
  let I = mA.terminal ? ft(mA.terminal) : "IDE",
    G = hZ ? "plugin" : "extension",
    Z = mA.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
    D = mA.platform === "darwin" ? "Cmd+Option+K" : "Ctrl+Alt+K";
  return H7.default.createElement(H7.default.Fragment, null, H7.default.createElement(h, {
    flexDirection: "column",
    borderStyle: "round",
    padding: 1,
    marginTop: 2,
    borderColor: "secondaryBorder"
  }, H7.default.createElement(P, {
    bold: !0,
    color: "success"
  }, "\uD83C\uDF89 Claude Code ", G, " installed in ", I, "!"), B && H7.default.createElement(P, {
    dimColor: !0
  }, "Version: ", B), hZ && H7.default.createElement(h, {
    marginTop: 1
  }, H7.default.createElement(P, {
    color: "warning"
  }, A0.warning, " Restart ", I, " (", Z, ") to continue (may require multiple restarts)")), H7.default.createElement(h, {
    marginTop: 1
  }, H7.default.createElement(P, {
    bold: !0
  }, "Quick start:")), H7.default.createElement(P, null, "• Press Cmd+Esc to launch Claude Code"), H7.default.createElement(P, null, "• View and apply file diffs directly in your editor"), H7.default.createElement(P, null, "• Use ", D, " to insert @File references"), H7.default.createElement(h, {
    marginTop: 1
  }, H7.default.createElement(P, null, "For more information, see https://docs.anthropic.com/s/claude-code-ide-integrations"))), H7.default.createElement(h, {
    marginLeft: 3
  }, H7.default.createElement(P, {
    dimColor: !0
  }, Q.pending ? H7.default.createElement(H7.default.Fragment, null, "Press ", Q.keyName, " again to exit") : H7.default.createElement(bw, null))))
}
// @from(Start 9174666, End 9174783)
function wi1() {
  let A = ZA(),
    B = mA.terminal || "unknown";
  return A.hasIdeOnboardingBeenShown?.[B] === !0
}
// @from(Start 9174785, End 9174987)
function qS6() {
  if (wi1()) return;
  let A = mA.terminal || "unknown",
    B = ZA();
  j0({
    ...B,
    hasIdeOnboardingBeenShown: {
      ...B.hasIdeOnboardingBeenShown,
      [A]: !0
    }
  })
}
// @from(Start 9174992, End 9175009)
Ve0 = I1(gj(), 1)
// @from(Start 9175012, End 9175103)
function Ce0(A) {
  try {
    return process.kill(A, 0), !0
  } catch {
    return !1
  }
}
// @from(Start 9175105, End 9175497)
function OS6(A) {
  if (!Ce0(A)) return !1;
  if (!tR && !hZ) return !0;
  try {
    let B = process.ppid;
    for (let Q = 0; Q < 10; Q++) {
      if (B === A) return !0;
      if (B === 0 || B === 1) break;
      let I = NZ(`ps -o ppid= -p ${B}`),
        G = I ? parseInt(I.trim()) : null;
      if (!G || G === B) break;
      B = G
    }
    return !1
  } catch (B) {
    return !1
  }
}
// @from(Start 9175499, End 9175971)
function Ke0() {
  try {
    return TS6().flatMap((Q) => {
      try {
        return x1().readdirSync(Q).filter((I) => I.name.endsWith(".lock")).map((I) => {
          let G = vt(Q, I.name);
          return {
            path: G,
            mtime: x1().statSync(G).mtime
          }
        })
      } catch (I) {
        return b1(I), []
      }
    }).sort((Q, I) => I.mtime.getTime() - Q.mtime.getTime()).map((Q) => Q.path)
  } catch (A) {
    return b1(A), []
  }
}
// @from(Start 9175973, End 9176702)
function He0(A) {
  try {
    let B = x1().readFileSync(A, {
        encoding: "utf-8"
      }),
      Q = [],
      I, G, Z = !1,
      D = !1,
      Y;
    try {
      let F = JSON.parse(B);
      if (F.workspaceFolders) Q = F.workspaceFolders;
      I = F.pid, G = F.ideName, Z = F.transport === "ws", D = F.runningInWindows === !0, Y = F.authToken
    } catch (F) {
      Q = B.split(`
`).map((X) => X.trim())
    }
    let W = A.split(Xe0).pop();
    if (!W) return null;
    let J = W.replace(".lock", "");
    return {
      workspaceFolders: Q,
      port: parseInt(J),
      pid: I,
      ideName: G,
      useWebSocket: Z,
      runningInWindows: D,
      authToken: Y
    }
  } catch (B) {
    return b1(B), null
  }
}
// @from(Start 9176703, End 9177077)
async function Ei1(A, B, Q = 500) {
  try {
    return new Promise((I) => {
      let G = RS6({
        host: A,
        port: B,
        timeout: Q
      });
      G.on("connect", () => {
        G.destroy(), I(!0)
      }), G.on("error", () => {
        I(!1)
      }), G.on("timeout", () => {
        G.destroy(), I(!1)
      })
    })
  } catch (I) {
    return !1
  }
}
// @from(Start 9177079, End 9177881)
function TS6() {
  let A = [],
    B = x1(),
    Q = Z7(),
    I = vt(S4(), "ide");
  if (B.existsSync(I)) A.push(I);
  if (Q !== "wsl") return A;
  let G = process.env.USERPROFILE;
  if (G) {
    let Z = G.replace(/\\/g, "/").replace(/^([A-Z]):/i, (Y, W) => `/mnt/${W.toLowerCase()}`),
      D = pm(Z, ".claude", "ide");
    if (B.existsSync(D)) A.push(D)
  }
  try {
    if (B.existsSync("/mnt/c/Users")) {
      let D = B.readdirSync("/mnt/c/Users");
      for (let Y of D) {
        if (Y.name === "Public" || Y.name === "Default" || Y.name === "Default User" || Y.name === "All Users") continue;
        let W = vt("/mnt/c/Users", Y.name, ".claude", "ide");
        if (B.existsSync(W)) A.push(W)
      }
    }
  } catch (Z) {
    b1(Z instanceof Error ? Z : new Error(String(Z)))
  }
  return A
}
// @from(Start 9177882, End 9178494)
async function PS6() {
  try {
    let A = Ke0();
    for (let B of A) {
      let Q = He0(B);
      if (!Q) {
        try {
          x1().unlinkSync(B)
        } catch (Z) {
          b1(Z)
        }
        continue
      }
      let I = await Oe0(Q.runningInWindows, Q.port),
        G = !1;
      if (Q.pid) {
        if (!Ce0(Q.pid)) {
          if (Z7() !== "wsl") G = !0;
          else if (!await Ei1(I, Q.port)) G = !0
        }
      } else if (!await Ei1(I, Q.port)) G = !0;
      if (G) try {
        x1().unlinkSync(B)
      } catch (Z) {
        b1(Z)
      }
    }
  } catch (A) {
    b1(A)
  }
}
// @from(Start 9178499, End 9178525)
SS6 = LS6(import.meta.url)
// @from(Start 9178529, End 9178549)
Ui1 = pm(SS6, "../")
// @from(Start 9178553, End 9178640)
tR = mA.terminal === "cursor" || mA.terminal === "windsurf" || mA.terminal === "vscode"
// @from(Start 9178644, End 9179083)
hZ = mA.terminal === "pycharm" || mA.terminal === "intellij" || mA.terminal === "webstorm" || mA.terminal === "phpstorm" || mA.terminal === "rubymine" || mA.terminal === "clion" || mA.terminal === "goland" || mA.terminal === "rider" || mA.terminal === "datagrip" || mA.terminal === "appcode" || mA.terminal === "dataspell" || mA.terminal === "aqua" || mA.terminal === "gateway" || mA.terminal === "fleet" || mA.terminal === "androidstudio"
// @from(Start 9179086, End 9179165)
function KK() {
  return tR || hZ || Boolean(process.env.FORCE_CODE_TERMINAL)
}
// @from(Start 9179166, End 9179857)
async function ze0(A) {
  if (!Ez()) return [() => {}, pm(Ui1, "vendor", A)];
  let B = global.Bun,
    Q = `vendor_${A.replace(/\//g,"_")}`,
    I = B?.embeddedFiles?.find((J) => J.name === Q);
  if (!I) throw new Error(`Embedded vendor file not found: ${Q}`);
  let G = vt(S4(), ".anthropic", "claude-code", "vendor-temp"),
    Z = x1();
  if (!Z.existsSync(G)) Z.mkdirSync(G);
  let D = vt(G, A),
    Y = await I.arrayBuffer();
  return Z.writeFileSync(D, Buffer.from(Y).toString("base64"), {
    encoding: "base64",
    flush: !1
  }), [() => {
    try {
      if (Z.existsSync(D)) Z.unlinkSync(D)
    } catch (J) {
      b1(J instanceof Error ? J : new Error(String(J)))
    }
  }, D]
}
// @from(Start 9179858, End 9180355)
async function _S6() {
  if (!KK()) return null;
  try {
    let A = await yS6();
    E1("tengu_ext_installed", {});
    let B = ZA();
    if (!B.diffTool) j0({
      ...B,
      diffTool: "auto"
    });
    return {
      installed: !0,
      error: null,
      installedVersion: A
    }
  } catch (A) {
    E1("tengu_ext_install_error", {});
    let B = A instanceof Error ? A.message : String(A);
    return b1(A), {
      installed: !1,
      error: B,
      installedVersion: null
    }
  }
}
// @from(Start 9180360, End 9180370)
RF1 = null
// @from(Start 9180372, End 9180714)
async function Fe0() {
  if (RF1) RF1.abort();
  RF1 = new AbortController;
  let A = RF1.signal;
  await PS6();
  let B = Date.now();
  while (Date.now() - B < 30000 && !A.aborted) {
    let Q = await bt(!1);
    if (A.aborted) return null;
    if (Q.length) return Q[0];
    await new Promise((I) => setTimeout(I, 1000))
  }
  return null
}
// @from(Start 9180715, End 9181840)
async function bt(A) {
  let B = [];
  try {
    let Q = process.env.CLAUDE_CODE_SSE_PORT,
      I = Q ? parseInt(Q) : null,
      G = e9(),
      Z = Ke0();
    for (let D of Z) {
      let Y = He0(D);
      if (!Y) continue;
      if (Z7() !== "wsl" && KK() && (!Y.pid || !OS6(Y.pid))) continue;
      let W = !1;
      if (process.env.CLAUDE_CODE_IDE_SKIP_VALID_CHECK === "true") W = !0;
      else if (I && Y.port === I) W = !0;
      else W = Y.workspaceFolders.some((V) => {
        if (!V) return !1;
        let C = pm(V);
        return G === C || G.startsWith(C + Xe0)
      });
      if (!W && !A) continue;
      let J = Y.ideName ?? (KK() ? ft(mA.terminal) : "IDE");
      if (B.some((V) => V.name === J)) J += ` (${Y.port})`;
      let F = await Oe0(Y.runningInWindows, Y.port),
        X;
      if (Y.useWebSocket) X = `ws://${F}:${Y.port}`;
      else X = `http://${F}:${Y.port}/sse`;
      B.push({
        url: X,
        name: J,
        workspaceFolders: Y.workspaceFolders,
        port: Y.port,
        isValid: W,
        authToken: Y.authToken
      })
    }
  } catch (Q) {
    b1(Q)
  }
  return B
}
// @from(Start 9181841, End 9181968)
async function we0(A) {
  await A.notification({
    method: "ide_connected",
    params: {
      pid: process.pid
    }
  })
}
// @from(Start 9181970, End 9182056)
function OF1(A) {
  return A.some((B) => B.type === "connected" && B.name === "ide")
}
// @from(Start 9182061, End 9182090)
jS6 = "anthropic.claude-code"
// @from(Start 9182092, End 9182361)
async function Ni1() {
  if (tR) {
    let A = Ne0();
    if (A) try {
      if ((await PD(A, ["--list-extensions"], {
          env: um()
        })).stdout?.includes(jS6)) return !0
    } catch {}
  } else if (hZ && mA.terminal) return We0(mA.terminal);
  return !1
}
// @from(Start 9182362, End 9183246)
async function yS6() {
  if (tR) {
    let A = Ne0();
    if (A)
      if ((await xC("tengu-ext-vscode-install-from-marketplace", void 0))?.fromMarketplace) {
        let Q = await PD(A, ["--force", "--install-extension", "anthropic.claude-code"], {
          env: um()
        });
        if (Q.code !== 0) throw new Error(`${Q.code}: ${Q.error} ${Q.stderr}`);
        return Ue0(A)
      } else {
        let [Q, I] = await ze0("claude-code.vsix");
        try {
          let G = await PD(A, ["--force", "--install-extension", I], {
            env: um()
          });
          if (xS6(A), G.code !== 0) throw new Error(`${G.code}: ${G.error} ${G.stderr}`);
          return Ee0()
        } finally {
          Q()
        }
      }
  } else if (hZ && mA.terminal && Z7() !== "wsl") return await Ye0(mA.terminal, pm(Ui1, "vendor", "claude-code-jetbrains-plugin"));
  return null
}
// @from(Start 9183248, End 9183348)
function um() {
  if (Z7() === "linux") return {
    ...process.env,
    DISPLAY: ""
  };
  return
}
// @from(Start 9183350, End 9183613)
function Ee0() {
  return {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.34"
  }.VERSION
}
// @from(Start 9183614, End 9183891)
async function Ue0(A) {
  let {
    stdout: B
  } = await u0(A, ["--list-extensions", "--show-versions"], {
    env: um()
  }), Q = B?.split(`
`) || [];
  for (let I of Q) {
    let [G, Z] = I.split("@");
    if (G === "anthropic.claude-code" && Z) return Z
  }
  return null
}
// @from(Start 9183893, End 9184844)
function kS6() {
  try {
    if (Z7() !== "macos") return null;
    let B = process.ppid;
    for (let Q = 0; Q < 10; Q++) {
      if (!B || B === 0 || B === 1) break;
      let I = NZ(`ps -o command= -p ${B}`)?.trim();
      if (I) {
        let Z = {
            "Visual Studio Code.app": "code",
            "Cursor.app": "cursor",
            "Windsurf.app": "windsurf",
            "Visual Studio Code - Insiders.app": "code",
            "VSCodium.app": "codium"
          },
          D = "/Contents/MacOS/Electron";
        for (let [Y, W] of Object.entries(Z)) {
          let J = I.indexOf(Y + "/Contents/MacOS/Electron");
          if (J !== -1) {
            let F = J + Y.length;
            return I.substring(0, F) + "/Contents/Resources/app/bin/" + W
          }
        }
      }
      let G = NZ(`ps -o ppid= -p ${B}`)?.trim();
      if (!G) break;
      B = parseInt(G.trim())
    }
    return null
  } catch {
    return null
  }
}
// @from(Start 9184846, End 9185131)
function Ne0() {
  let A = kS6();
  if (A) {
    if (x1().existsSync(A)) return A
  }
  switch (mA.terminal) {
    case "vscode":
      return "code";
    case "cursor":
      return "cursor";
    case "windsurf":
      return "windsurf";
    case null:
      break
  }
  return null
}
// @from(Start 9185133, End 9185161)
function xS6(A) {
  return
}
// @from(Start 9185162, End 9185274)
async function fS6() {
  for (let A of ["code", "cursor", "windsurf"]) try {
    await vS6(A)
  } catch (B) {}
}
// @from(Start 9185275, End 9185644)
async function vS6(A) {
  let B = await Ue0(A);
  if (B && Ve0.lte(B, Ee0())) {
    let [Q, I] = await ze0("claude-code.vsix");
    try {
      await new Promise((G) => {
        setTimeout(G, 500)
      }), await PD(A, ["--force", "--install-extension", I], {
        env: um()
      }), E1("tengu_ext_upgraded", {})
    } finally {
      Q()
    }
    return !0
  }
}
// @from(Start 9185649, End 9185756)
$e0 = L0(() => {
    try {
      return NZ("cursor --version"), !0
    } catch {
      return !1
    }
  })
// @from(Start 9185760, End 9185869)
qe0 = L0(() => {
    try {
      return NZ("windsurf --version"), !0
    } catch {
      return !1
    }
  })
// @from(Start 9185873, End 9186033)
Me0 = L0(() => {
    try {
      let A = NZ("code --help");
      return Boolean(A && A.includes("Visual Studio Code"))
    } catch {
      return !1
    }
  })
// @from(Start 9186036, End 9186206)
function TF1(A) {
  let Q = A.find((I) => I.type === "connected" && I.name === "ide")?.config;
  return Q?.type === "sse-ide" || Q?.type === "ws-ide" ? Q.ideName : null
}
// @from(Start 9186208, End 9187081)
function ft(A) {
  switch (A) {
    case "vscode":
      return "VS Code";
    case "cursor":
      return "Cursor";
    case "windsurf":
      return "Windsurf";
    case "pycharm":
      return "PyCharm";
    case "intellij":
      return "IntelliJ IDEA";
    case "webstorm":
      return "WebStorm";
    case "phpstorm":
      return "PhpStorm";
    case "rubymine":
      return "RubyMine";
    case "clion":
      return "CLion";
    case "goland":
      return "GoLand";
    case "rider":
      return "Rider";
    case "datagrip":
      return "DataGrip";
    case "appcode":
      return "AppCode";
    case "dataspell":
      return "DataSpell";
    case "aqua":
      return "Aqua";
    case "gateway":
      return "Gateway";
    case "fleet":
      return "Fleet";
    case "androidstudio":
      return "Android Studio";
    default:
      return TU1(A)
  }
}
// @from(Start 9187083, End 9187234)
function IW(A) {
  if (!A) return;
  let B = A.find((Q) => Q.type === "connected" && Q.name === "ide");
  return B?.type === "connected" ? B : void 0
}
// @from(Start 9187235, End 9187329)
async function Le0(A) {
  try {
    await gw("closeAllDiffTabs", {}, A, !1)
  } catch (B) {}
}
// @from(Start 9187330, End 9187928)
async function Re0(A, B, Q) {
  if (!KK()) {
    if ((await xC("tengu-ext-always-upgrade-fixed", void 0))?.upgrade) await fS6(), await De0("0.1.9-beta", pm(Ui1, "vendor", "claude-code-jetbrains-plugin"))
  }
  if (Fe0().then(A), process.env.CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL !== "true") Ni1().then((I) => {
    _S6().catch((G) => {
      return {
        installed: !1,
        error: G.message || "Installation failed",
        installedVersion: null
      }
    }).then((G) => {
      if (Q(G), G?.installed) Fe0().then(A);
      if (!I && G?.installed === !0 && KK() && !wi1()) B()
    })
  })
}
// @from(Start 9187933, End 9188356)
Oe0 = L0(async (A, B) => {
  if (process.env.CLAUDE_CODE_IDE_HOST_OVERRIDE) return process.env.CLAUDE_CODE_IDE_HOST_OVERRIDE;
  if (Z7() !== "wsl" || !A) return "127.0.0.1";
  try {
    let I = MS6("ip route show | grep -i default", {
      encoding: "utf8"
    }).match(/default via (\d+\.\d+\.\d+\.\d+)/);
    if (I) {
      let G = I[1];
      if (await Ei1(G, B)) return G
    }
  } catch (Q) {}
  return "127.0.0.1"
})
// @from(Start 9188359, End 9188824)
function $i1(A) {
  let B = A,
    Q = "",
    I = 0,
    G = 10;
  while (B !== Q && I < G) Q = B, B = B.normalize("NFKC"), B = B.replace(/[\p{Cf}\p{Co}\p{Cn}]/gu, ""), B = B.replace(/[\u200B-\u200F]/g, "").replace(/[\u202A-\u202E]/g, "").replace(/[\u2066-\u2069]/g, "").replace(/[\uFEFF]/g, "").replace(/[\uE000-\uF8FF]/g, ""), I++;
  if (I >= G) throw new Error(`Unicode sanitization reached maximum iterations (${G}) for input: ${A.slice(0,100)}`);
  return B
}
// @from(Start 9188826, End 9189079)
function D$(A) {
  if (typeof A === "string") return $i1(A);
  if (Array.isArray(A)) return A.map(D$);
  if (A !== null && typeof A === "object") {
    let B = {};
    for (let [Q, I] of Object.entries(A)) B[D$(Q)] = D$(I);
    return B
  }
  return A
}
// @from(Start 9189084, End 9189102)
H62 = I1(P12(), 1)
// @from(Start 9189106, End 9189124)
z62 = I1(t92(), 1)
// @from(Start 9189128, End 9189146)
w62 = I1(VX1(), 1)
// @from(Start 9189150, End 9189168)
E62 = I1(K62(), 1)
// @from(Start 9189200, End 9190150)
U62 = async (A, B) => {
  Fb6(A.method, "Expected request method property to be set");
  let Q = z62.fromNodeProviderChain(),
    I = await Xb6(() => {
      if (B.awsAccessKey) process.env.AWS_ACCESS_KEY_ID = B.awsAccessKey;
      if (B.awsSecretKey) process.env.AWS_SECRET_ACCESS_KEY = B.awsSecretKey;
      if (B.awsSessionToken) process.env.AWS_SESSION_TOKEN = B.awsSessionToken
    }, () => Q()),
    G = new H62.SignatureV4({
      service: "bedrock",
      region: B.regionName,
      credentials: I,
      sha256: E62.Sha256
    }),
    Z = new URL(B.url),
    D = !A.headers ? {} : (Symbol.iterator in A.headers) ? Object.fromEntries(Array.from(A.headers).map((J) => [...J])) : {
      ...A.headers
    };
  delete D.connection, D.host = Z.hostname;
  let Y = new w62.HttpRequest({
    method: A.method.toUpperCase(),
    protocol: Z.protocol,
    path: Z.pathname,
    headers: D,
    body: A.body
  });
  return (await G.sign(Y)).headers
}
// @from(Start 9190152, End 9190285)
Xb6 = async (A, B) => {
  let Q = {
    ...process.env
  };
  try {
    return A(), await B()
  } finally {
    process.env = Q
  }
}
// @from(Start 9190291, End 9190309)
DD2 = I1(b52(), 1)
// @from(Start 9190313, End 9190331)
lV1 = I1(_X1(), 1)
// @from(Start 9190335, End 9190353)
YD2 = I1(U82(), 1)
// @from(Start 9190359, End 9190376)
WB = I1(fB2(), 1)
// @from(Start 9190380, End 9190397)
YO = I1(BD2(), 1)
// @from(Start 9190401, End 9190700)
Bo6 = async (A, B) => {
    let Q = WB.map({}),
      I = A.body,
      G = WB.take(I, {
        message: WB.expectString
      });
    Object.assign(Q, G);
    let Z = new YO.InternalServerException({
      $metadata: pV1(A),
      ...Q
    });
    return WB.decorateServiceException(Z, A.body)
  }
// @from(Start 9190702, End 9191089)
Qo6 = async (A, B) => {
    let Q = WB.map({}),
      I = A.body,
      G = WB.take(I, {
        message: WB.expectString,
        originalMessage: WB.expectString,
        originalStatusCode: WB.expectInt32
      });
    Object.assign(Q, G);
    let Z = new YO.ModelStreamErrorException({
      $metadata: pV1(A),
      ...Q
    });
    return WB.decorateServiceException(Z, A.body)
  }
// @from(Start 9191091, End 9191386)
Io6 = async (A, B) => {
    let Q = WB.map({}),
      I = A.body,
      G = WB.take(I, {
        message: WB.expectString
      });
    Object.assign(Q, G);
    let Z = new YO.ThrottlingException({
      $metadata: pV1(A),
      ...Q
    });
    return WB.decorateServiceException(Z, A.body)
  }
// @from(Start 9191388, End 9191683)
Go6 = async (A, B) => {
    let Q = WB.map({}),
      I = A.body,
      G = WB.take(I, {
        message: WB.expectString
      });
    Object.assign(Q, G);
    let Z = new YO.ValidationException({
      $metadata: pV1(A),
      ...Q
    });
    return WB.decorateServiceException(Z, A.body)
  }
// @from(Start 9191685, End 9192429)
QD2 = (A, B) => {
    return B.eventStreamMarshaller.deserialize(A, async (Q) => {
      if (Q.chunk != null) return {
        chunk: await Yo6(Q.chunk, B)
      };
      if (Q.internalServerException != null) return {
        internalServerException: await Zo6(Q.internalServerException, B)
      };
      if (Q.modelStreamErrorException != null) return {
        modelStreamErrorException: await Do6(Q.modelStreamErrorException, B)
      };
      if (Q.validationException != null) return {
        validationException: await Jo6(Q.validationException, B)
      };
      if (Q.throttlingException != null) return {
        throttlingException: await Wo6(Q.throttlingException, B)
      };
      return {
        $unknown: A
      }
    })
  }
// @from(Start 9192431, End 9192544)
Zo6 = async (A, B) => {
    let Q = {
      ...A,
      body: await Ce(A.body, B)
    };
    return Bo6(Q, B)
  }
// @from(Start 9192546, End 9192659)
Do6 = async (A, B) => {
    let Q = {
      ...A,
      body: await Ce(A.body, B)
    };
    return Qo6(Q, B)
  }
// @from(Start 9192661, End 9192777)
Yo6 = async (A, B) => {
    let Q = {},
      I = await Ce(A.body, B);
    return Object.assign(Q, Fo6(I, B)), Q
  }
// @from(Start 9192779, End 9192892)
Wo6 = async (A, B) => {
    let Q = {
      ...A,
      body: await Ce(A.body, B)
    };
    return Io6(Q, B)
  }
// @from(Start 9192894, End 9193007)
Jo6 = async (A, B) => {
    let Q = {
      ...A,
      body: await Ce(A.body, B)
    };
    return Go6(Q, B)
  }
// @from(Start 9193009, End 9193090)
Fo6 = (A, B) => {
    return WB.take(A, {
      bytes: B.base64Decoder
    })
  }
// @from(Start 9193092, End 9193360)
pV1 = (A) => ({
    httpStatusCode: A.statusCode,
    requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"] ?? "",
    extendedRequestId: A.headers["x-amz-id-2"] ?? "",
    cfId: A.headers["x-amz-cf-id"] ?? ""
  })
// @from(Start 9193362, End 9193428)
Xo6 = (A, B) => WB.collectBody(A, B).then((Q) => B.utf8Encoder(Q))
// @from(Start 9193430, End 9193527)
Ce = (A, B) => Xo6(A, B).then((Q) => {
    if (Q.length) return JSON.parse(Q);
    return {}
  })
// @from(Start 9193530, End 9194015)
function ID2(A) {
  if (A[Symbol.asyncIterator]) return A;
  let B = A.getReader();
  return {
    async next() {
      try {
        let Q = await B.read();
        if (Q?.done) B.releaseLock();
        return Q
      } catch (Q) {
        throw B.releaseLock(), Q
      }
    },
    async return () {
      let Q = B.cancel();
      return B.releaseLock(), await Q, {
        done: !0,
        value: void 0
      }
    },
    [Symbol.asyncIterator]() {
      return this
    }
  }
}
// @from(Start 9194017, End 9194101)
function cV1(A) {
  return A != null && typeof A === "object" && !Array.isArray(A)
}
// @from(Start 9194106, End 9194186)
GD2 = (A) => {
  try {
    return JSON.parse(A)
  } catch (B) {
    return
  }
}
// @from(Start 9194192, End 9194239)
Zs1 = (A) => new TextDecoder("utf-8").decode(A)
// @from(Start 9194243, End 9194283)
ZD2 = (A) => new TextEncoder().encode(A)
// @from(Start 9194287, End 9194617)
Vo6 = () => {
    let A = new DD2.EventStreamMarshaller({
      utf8Encoder: Zs1,
      utf8Decoder: ZD2
    });
    return {
      base64Decoder: lV1.fromBase64,
      base64Encoder: lV1.toBase64,
      utf8Decoder: ZD2,
      utf8Encoder: Zs1,
      eventStreamMarshaller: A,
      streamCollector: YD2.streamCollector
    }
  }
// @from(Start 9194619, End 9196383)
class iV1 extends bD {
  static fromSSEResponse(A, B) {
    let Q = !1;
    async function* I() {
      if (!A.body) throw B.abort(), new P9("Attempted to iterate over a response with no body");
      let Z = ID2(A.body),
        D = QD2(Z, Vo6());
      for await (let Y of D) if (Y.chunk && Y.chunk.bytes) yield {
        event: "chunk",
        data: Zs1(Y.chunk.bytes),
        raw: []
      };
      else if (Y.internalServerException) yield {
        event: "error",
        data: "InternalServerException",
        raw: []
      };
      else if (Y.modelStreamErrorException) yield {
        event: "error",
        data: "ModelStreamErrorException",
        raw: []
      };
      else if (Y.validationException) yield {
        event: "error",
        data: "ValidationException",
        raw: []
      };
      else if (Y.throttlingException) yield {
        event: "error",
        data: "ThrottlingException",
        raw: []
      }
    }
    async function* G() {
      if (Q) throw new Error("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");
      Q = !0;
      let Z = !1;
      try {
        for await (let D of I()) {
          if (D.event === "chunk") try {
            yield JSON.parse(D.data)
          } catch (Y) {
            throw console.error("Could not parse message into JSON:", D.data), console.error("From chunk:", D.raw), Y
          }
          if (D.event === "error") {
            let Y = D.data,
              W = GD2(Y),
              J = W ? void 0 : Y;
            throw p6.generate(void 0, W, J, A.headers)
          }
        }
        Z = !0
      } catch (D) {
        if (Co6(D)) return;
        throw D
      } finally {
        if (!Z) B.abort()
      }
    }
    return new iV1(G, B)
  }
}
// @from(Start 9196385, End 9196578)
function Co6(A) {
  return typeof A === "object" && A !== null && (("name" in A) && A.name === "AbortError" || ("message" in A) && String(A.message).includes("FetchRequestCanceledException"))
}
// @from(Start 9196583, End 9196803)
Ds1 = (A) => {
  if (typeof globalThis.process !== "undefined") return globalThis.process.env?.[A]?.trim() ?? void 0;
  if (typeof globalThis.Deno !== "undefined") return globalThis.Deno.env?.get?.(A)?.trim();
  return
}
// @from(Start 9196809, End 9196857)
JD2 = Symbol.for("brand.privateNullableHeaders")
// @from(Start 9196861, End 9196880)
WD2 = Array.isArray
// @from(Start 9196883, End 9197518)
function* Ko6(A) {
  if (!A) return;
  if (JD2 in A) {
    let {
      values: I,
      nulls: G
    } = A;
    yield* I.entries();
    for (let Z of G) yield [Z, null];
    return
  }
  let B = !1,
    Q;
  if (A instanceof Headers) Q = A.entries();
  else if (WD2(A)) Q = A;
  else B = !0, Q = Object.entries(A ?? {});
  for (let I of Q) {
    let G = I[0];
    if (typeof G !== "string") throw new TypeError("expected header name to be a string");
    let Z = WD2(I[1]) ? I[1] : [I[1]],
      D = !1;
    for (let Y of Z) {
      if (Y === void 0) continue;
      if (B && !D) D = !0, yield [G, null];
      yield [G, Y]
    }
  }
}
// @from(Start 9197523, End 9197881)
Ys1 = (A) => {
  let B = new Headers,
    Q = new Set;
  for (let I of A) {
    let G = new Set;
    for (let [Z, D] of Ko6(I)) {
      let Y = Z.toLowerCase();
      if (!G.has(Y)) B.delete(Z), G.add(Y);
      if (D === null) B.delete(Z), Q.add(Y);
      else B.append(Z, D), Q.delete(Y)
    }
  }
  return {
    [JD2]: !0,
    values: B,
    nulls: Q
  }
}
// @from(Start 9197884, End 9197978)
function FD2(A) {
  return A.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g, encodeURIComponent)
}
// @from(Start 9197983, End 9198787)
Ho6 = (A = FD2) => function B(Q, ...I) {
    if (Q.length === 1) return Q[0];
    let G = !1,
      Z = Q.reduce((F, X, V) => {
        if (/[?#]/.test(X)) G = !0;
        return F + X + (V === I.length ? "" : (G ? encodeURIComponent : A)(String(I[V])))
      }, ""),
      D = Z.split(/[?#]/, 1)[0],
      Y = [],
      W = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi,
      J;
    while ((J = W.exec(D)) !== null) Y.push({
      start: J.index,
      length: J[0].length
    });
    if (Y.length > 0) {
      let F = 0,
        X = Y.reduce((V, C) => {
          let K = " ".repeat(C.start - F),
            E = "^".repeat(C.length);
          return F = C.start + C.length, V + K + E
        }, "");
      throw new P9(`Path parameters result in path with invalid segments:
${Z}
${X}`)
    }
    return Z
  }
// @from(Start 9198791, End 9198805)
Ws1 = Ho6(FD2)
// @from(Start 9198811, End 9198837)
zo6 = "bedrock-2023-05-31"
// @from(Start 9198841, End 9198914)
wo6 = new Set(["/v1/complete", "/v1/messages", "/v1/messages?beta=true"])
// @from(Start 9198916, End 9200822)
class nV1 extends R8 {
  constructor({
    awsRegion: A = Ds1("AWS_REGION") ?? "us-east-1",
    baseURL: B = Ds1("ANTHROPIC_BEDROCK_BASE_URL") ?? `https://bedrock-runtime.${A}.amazonaws.com`,
    awsSecretKey: Q = null,
    awsAccessKey: I = null,
    awsSessionToken: G = null,
    ...Z
  } = {}) {
    super({
      baseURL: B,
      ...Z
    });
    this.skipAuth = !1, this.messages = Eo6(this), this.completions = new aR(this), this.beta = Uo6(this), this.awsSecretKey = Q, this.awsAccessKey = I, this.awsRegion = A, this.awsSessionToken = G, this.skipAuth = Z.skipAuth ?? !1
  }
  validateHeaders() {}
  async prepareRequest(A, {
    url: B,
    options: Q
  }) {
    if (this.skipAuth) return;
    let I = this.awsRegion;
    if (!I) throw new Error("Expected `awsRegion` option to be passed to the client or the `AWS_REGION` environment variable to be present");
    let G = await U62(A, {
      url: B,
      regionName: I,
      awsAccessKey: this.awsAccessKey,
      awsSecretKey: this.awsSecretKey,
      awsSessionToken: this.awsSessionToken
    });
    A.headers = Ys1([G, A.headers]).values
  }
  buildRequest(A) {
    if (A.__streamClass = iV1, cV1(A.body)) A.body = {
      ...A.body
    };
    if (cV1(A.body)) {
      if (!A.body.anthropic_version) A.body.anthropic_version = zo6;
      if (A.headers && !A.body.anthropic_beta) {
        let B = Ys1([A.headers]).values.get("anthropic-beta");
        if (B != null) A.body.anthropic_beta = B.split(",")
      }
    }
    if (wo6.has(A.path) && A.method === "post") {
      if (!cV1(A.body)) throw new Error("Expected request body to be an object for post /v1/messages");
      let B = A.body.model;
      A.body.model = void 0;
      let Q = A.body.stream;
      if (A.body.stream = void 0, Q) A.path = Ws1`/model/${B}/invoke-with-response-stream`;
      else A.path = Ws1`/model/${B}/invoke`
    }
    return super.buildRequest(A)
  }
}
// @from(Start 9200824, End 9200915)
function Eo6(A) {
  let B = new WK(A);
  return delete B.batches, delete B.countTokens, B
}
// @from(Start 9200917, End 9201050)
function Uo6(A) {
  let B = new nX(A);
  return delete B.promptCaching, delete B.messages.batches, delete B.messages.countTokens, B
}
// @from(Start 9201055, End 9201073)
wV2 = I1(CV2(), 1)
// @from(Start 9201079, End 9201299)
SC1 = (A) => {
  if (typeof globalThis.process !== "undefined") return globalThis.process.env?.[A]?.trim() ?? void 0;
  if (typeof globalThis.Deno !== "undefined") return globalThis.Deno.env?.get?.(A)?.trim();
  return
}
// @from(Start 9201302, End 9201386)
function _C1(A) {
  return A != null && typeof A === "object" && !Array.isArray(A)
}
// @from(Start 9201391, End 9201439)
HV2 = Symbol.for("brand.privateNullableHeaders")
// @from(Start 9201443, End 9201462)
KV2 = Array.isArray
// @from(Start 9201465, End 9202100)
function* o95(A) {
  if (!A) return;
  if (HV2 in A) {
    let {
      values: I,
      nulls: G
    } = A;
    yield* I.entries();
    for (let Z of G) yield [Z, null];
    return
  }
  let B = !1,
    Q;
  if (A instanceof Headers) Q = A.entries();
  else if (KV2(A)) Q = A;
  else B = !0, Q = Object.entries(A ?? {});
  for (let I of Q) {
    let G = I[0];
    if (typeof G !== "string") throw new TypeError("expected header name to be a string");
    let Z = KV2(I[1]) ? I[1] : [I[1]],
      D = !1;
    for (let Y of Z) {
      if (Y === void 0) continue;
      if (B && !D) D = !0, yield [G, null];
      yield [G, Y]
    }
  }
}
// @from(Start 9202105, End 9202463)
zV2 = (A) => {
  let B = new Headers,
    Q = new Set;
  for (let I of A) {
    let G = new Set;
    for (let [Z, D] of o95(I)) {
      let Y = Z.toLowerCase();
      if (!G.has(Y)) B.delete(Z), G.add(Y);
      if (D === null) B.delete(Z), Q.add(Y);
      else B.append(Z, D), Q.delete(Y)
    }
  }
  return {
    [HV2]: !0,
    values: B,
    nulls: Q
  }
}
// @from(Start 9202469, End 9202494)
t95 = "vertex-2023-10-16"
// @from(Start 9202498, End 9202555)
e95 = new Set(["/v1/messages", "/v1/messages?beta=true"])
// @from(Start 9202557, End 9204991)
class jC1 extends R8 {
  constructor({
    baseURL: A = SC1("ANTHROPIC_VERTEX_BASE_URL"),
    region: B = SC1("CLOUD_ML_REGION") ?? null,
    projectId: Q = SC1("ANTHROPIC_VERTEX_PROJECT_ID") ?? null,
    ...I
  } = {}) {
    if (!B) throw new Error("No region was given. The client should be instantiated with the `region` option or the `CLOUD_ML_REGION` environment variable should be set.");
    super({
      baseURL: A || `https://${B}-aiplatform.googleapis.com/v1`,
      ...I
    });
    this.messages = A45(this), this.beta = B45(this), this.region = B, this.projectId = Q, this.accessToken = I.accessToken ?? null, this._auth = I.googleAuth ?? new wV2.GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform"
    }), this._authClientPromise = this._auth.getClient()
  }
  validateHeaders() {}
  async prepareOptions(A) {
    let B = await this._authClientPromise,
      Q = await B.getRequestHeaders(),
      I = B.projectId ?? Q["x-goog-user-project"];
    if (!this.projectId && I) this.projectId = I;
    A.headers = zV2([Q, A.headers])
  }
  buildRequest(A) {
    if (_C1(A.body)) A.body = {
      ...A.body
    };
    if (_C1(A.body)) {
      if (!A.body.anthropic_version) A.body.anthropic_version = t95
    }
    if (e95.has(A.path) && A.method === "post") {
      if (!this.projectId) throw new Error("No projectId was given and it could not be resolved from credentials. The client should be instantiated with the `projectId` option or the `ANTHROPIC_VERTEX_PROJECT_ID` environment variable should be set.");
      if (!_C1(A.body)) throw new Error("Expected request body to be an object for post /v1/messages");
      let B = A.body.model;
      A.body.model = void 0;
      let I = A.body.stream ?? !1 ? "streamRawPredict" : "rawPredict";
      A.path = `/projects/${this.projectId}/locations/${this.region}/publishers/anthropic/models/${B}:${I}`
    }
    if (A.path === "/v1/messages/count_tokens" || A.path == "/v1/messages/count_tokens?beta=true" && A.method === "post") {
      if (!this.projectId) throw new Error("No projectId was given and it could not be resolved from credentials. The client should be instantiated with the `projectId` option or the `ANTHROPIC_VERTEX_PROJECT_ID` environment variable should be set.");
      A.path = `/projects/${this.projectId}/locations/${this.region}/publishers/anthropic/models/count-tokens:rawPredict`
    }
    return super.buildRequest(A)
  }
}
// @from(Start 9204993, End 9205062)
function A45(A) {
  let B = new WK(A);
  return delete B.batches, B
}
// @from(Start 9205064, End 9205142)
function B45(A) {
  let B = new nX(A);
  return delete B.messages.batches, B
}
// @from(Start 9205143, End 9206374)
async function TK({
  apiKey: A,
  maxRetries: B = 0,
  model: Q,
  isNonInteractiveSession: I,
  isSmallFastModel: G = !1
}) {
  let Z = {
    "x-app": "cli",
    "User-Agent": MR(),
    ...I45()
  };
  if (await F_1(), !T9()) Q45(Z);
  let D = {
    defaultHeaders: Z,
    maxRetries: B,
    timeout: parseInt(process.env.API_TIMEOUT_MS || String(60000), 10),
    dangerouslyAllowBrowser: !0,
    fetchOptions: tn0()
  };
  if (process.env.CLAUDE_CODE_USE_BEDROCK) {
    let W = G && process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION_AWS_REGION ? process.env.ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION_AWS_REGION : Xg(),
      J = {
        ...D,
        awsRegion: W,
        ...process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH && {
          skipAuth: !0
        }
      };
    return new nV1(J)
  }
  if (process.env.CLAUDE_CODE_USE_VERTEX) {
    let W = {
      ...D,
      region: AD0(Q),
      ...process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH && {
        googleAuth: {
          getClient: () => ({
            getRequestHeaders: () => ({})
          })
        }
      }
    };
    return new jC1(W)
  }
  let Y = {
    apiKey: T9() ? null : A || qG(I),
    authToken: T9() ? $Z()?.accessToken : void 0,
    ...D
  };
  return new kw(Y)
}
// @from(Start 9206376, End 9206530)
function Q45(A) {
  let B = process.env.ANTHROPIC_AUTH_TOKEN || dS();
  if (B) A.Authorization = `Bearer ${B}`, A["Proxy-Authorization"] = `Bearer ${B}`
}
// @from(Start 9206532, End 9206856)
function I45() {
  let A = {},
    B = process.env.ANTHROPIC_CUSTOM_HEADERS;
  if (!B) return A;
  let Q = B.split(/\n|\r\n/);
  for (let I of Q) {
    if (!I.trim()) continue;
    let G = I.match(/^\s*(.*?)\s*:\s*(.*?)\s*$/);
    if (G) {
      let [, Z, D] = G;
      if (Z && D !== void 0) A[Z] = D
    }
  }
  return A
}
// @from(Start 9206857, End 9206963)
async function EV2(A, B) {
  if (!A) return 0;
  return yC1([{
    role: "user",
    content: A
  }], B)
}
// @from(Start 9206964, End 9207385)
async function yC1(A, B) {
  try {
    if (!A || A.length === 0) return 0;
    let Q = J7(),
      I = await TK({
        maxRetries: 1,
        model: Q,
        isNonInteractiveSession: B
      }),
      G = jY(Q);
    return (await I.beta.messages.countTokens({
      model: Q,
      messages: A,
      ...G.length > 0 ? {
        betas: G
      } : {}
    })).input_tokens
  } catch (Q) {
    return b1(Q), null
  }
}
// @from(Start 9207387, End 9207427)
function AE(A) {
  return A.length / 4
}
// @from(Start 9207432, End 9207441)
G45 = 0.5
// @from(Start 9207444, End 9207530)
function Go1() {
  return parseInt(process.env.MAX_MCP_OUTPUT_TOKENS ?? "25000", 10)
}
// @from(Start 9207532, End 9207578)
function Z45(A) {
  return A.type === "text"
}
// @from(Start 9207580, End 9207627)
function D45(A) {
  return A.type === "image"
}
// @from(Start 9207629, End 9207839)
function Y45(A) {
  if (!A) return 0;
  if (typeof A === "string") return AE(A);
  return A.reduce((B, Q) => {
    if (Z45(Q)) return B + AE(Q.text);
    else if (D45(Q)) return B + 1600;
    return B
  }, 0)
}
// @from(Start 9207840, End 9208113)
class he extends Error {
  constructor(A, B) {
    super(`MCP tool "${A}" response (${B} tokens) exceeds maximum allowed tokens (${Go1()}). Please use pagination, filtering, or limit parameters to reduce the response size.`);
    this.name = "MCPContentTooLargeError"
  }
}
// @from(Start 9208114, End 9208506)
async function Zo1(A, B, Q) {
  if (!A) return;
  if (Y45(A) <= Go1() * G45) return;
  try {
    let Z = await yC1(typeof A === "string" ? [{
      role: "user",
      content: A
    }] : [{
      role: "user",
      content: A
    }], Q);
    if (Z && Z > Go1()) throw new he(B, Z)
  } catch (G) {
    if (G instanceof he) throw G;
    b1(G instanceof Error ? G : new Error(String(G)))
  }
}
// @from(Start 9208514, End 9210232)
class Do1 {
  ws;
  started = !1;
  opened;
  constructor(A) {
    this.ws = A;
    this.opened = new Promise((B, Q) => {
      if (this.ws.readyState === XL.OPEN) B();
      else this.ws.on("open", () => {
        B()
      }), this.ws.on("error", (I) => {
        Q(I)
      })
    }), this.ws.on("message", this.onMessageHandler), this.ws.on("error", this.onErrorHandler), this.ws.on("close", this.onCloseHandler)
  }
  onclose;
  onerror;
  onmessage;
  onMessageHandler = (A) => {
    try {
      let B = JSON.parse(A.toString("utf-8")),
        Q = fw.parse(B);
      this.onmessage?.(Q)
    } catch (B) {
      this.onErrorHandler(B)
    }
  };
  onErrorHandler = (A) => {
    this.onerror?.(A instanceof Error ? A : new Error("Failed to process message"))
  };
  onCloseHandler = () => {
    this.onclose?.(), this.ws.off("message", this.onMessageHandler), this.ws.off("error", this.onErrorHandler), this.ws.off("close", this.onCloseHandler)
  };
  async start() {
    if (this.started) throw new Error("Start can only be called once per transport.");
    if (await this.opened, this.ws.readyState !== XL.OPEN) throw new Error("WebSocket is not open. Cannot start transport.");
    this.started = !0
  }
  async close() {
    if (this.ws.readyState === XL.OPEN || this.ws.readyState === XL.CONNECTING) this.ws.close();
    this.onCloseHandler()
  }
  async send(A) {
    if (this.ws.readyState !== XL.OPEN) throw new Error("WebSocket is not open. Cannot send message.");
    let B = JSON.stringify(A);
    try {
      await new Promise((Q, I) => {
        this.ws.send(B, (G) => {
          if (G) I(G);
          else Q()
        })
      })
    } catch (Q) {
      throw this.onErrorHandler(Q), Q
    }
  }
}
// @from(Start 9210237, End 9210253)
T3 = I1(U1(), 1)
// @from(Start 9210259, End 9210267)
UV2 = ""
// @from(Start 9210271, End 9210279)
NV2 = ""
// @from(Start 9210285, End 9210301)
me = I1(U1(), 1)
// @from(Start 9210307, End 9210324)
$V2 = I1(U1(), 1)
// @from(Start 9210330, End 9210356)
qV2 = "(ctrl+r to expand)"
// @from(Start 9210359, End 9210453)
function NO() {
  return $V2.default.createElement(P, {
    color: "secondaryText"
  }, qV2)
}
// @from(Start 9210455, End 9210494)
function MV2() {
  return UA.dim(qV2)
}
// @from(Start 9210499, End 9210516)
OV2 = I1(U1(), 1)
// @from(Start 9210522, End 9210539)
kC1 = I1(U1(), 1)
// @from(Start 9210542, End 9211006)
function c9() {
  let A = N31(),
    [B, Q] = kC1.useState({
      columns: process.stdout.columns || 80,
      rows: process.stdout.rows || 24
    });
  return kC1.useEffect(() => {
    if (A) return;

    function I() {
      Q({
        columns: process.stdout.columns || 80,
        rows: process.stdout.rows || 24
      })
    }
    return process.stdout.setMaxListeners(200).on("resize", I), () => {
      process.stdout.off("resize", I)
    }
  }, [A]), B
}
// @from(Start 9211008, End 9211129)
function W45(A) {
  try {
    let B = JSON.parse(A);
    return JSON.stringify(B, null, 2)
  } catch {
    return A
  }
}
// @from(Start 9211131, End 9211191)
function LV2(A) {
  return A.split(`
`).map(W45).join(`
`)
}
// @from(Start 9211196, End 9211203)
RV2 = 3
// @from(Start 9211207, End 9211214)
J45 = 9
// @from(Start 9211217, End 9211528)
function F45(A, B) {
  let Q = A.split(`
`),
    I = [];
  for (let G of Q)
    if (G.length <= B) I.push(G.trimEnd());
    else
      for (let Z = 0; Z < G.length; Z += B) I.push(G.slice(Z, Z + B).trimEnd());
  return {
    aboveTheFold: I.slice(0, RV2).join(`
`),
    remainingLines: I.slice(RV2).length
  }
}
// @from(Start 9211530, End 9211788)
function X45(A, B) {
  let Q = A.trimEnd();
  if (!Q) return "";
  let {
    aboveTheFold: I,
    remainingLines: G
  } = F45(Q, Math.max(B - J45, 10));
  return [I, G > 0 ? UA.dim(`… +${G} ${G===1?"line":"lines"} ${MV2()}`) : ""].filter(Boolean).join(`
`)
}
// @from(Start 9211790, End 9212083)
function BE({
  content: A,
  verbose: B,
  isError: Q
}) {
  let {
    columns: I
  } = c9(), G = OV2.useMemo(() => {
    if (B) return LV2(A);
    else return X45(LV2(A), I)
  }, [A, B, I]);
  return me.createElement(w0, null, me.createElement(P, {
    color: Q ? "error" : void 0
  }, G))
}
// @from(Start 9212088, End 9212120)
V45 = n.object({}).passthrough()
// @from(Start 9212124, End 9214249)
TV2 = {
    isMcp: !0,
    isEnabled() {
      return !0
    },
    isConcurrencySafe() {
      return !1
    },
    isReadOnly() {
      return !1
    },
    name: "mcp",
    async description() {
      return NV2
    },
    async prompt() {
      return UV2
    },
    inputSchema: V45,
    async * call() {
      yield {
        type: "result",
        data: ""
      }
    },
    async checkPermissions() {
      return {
        behavior: "ask",
        message: "MCPTool requires permission."
      }
    },
    renderToolUseMessage(A) {
      if (Object.keys(A).length === 0) return null;
      return Object.entries(A).map(([B, Q]) => `${B}: ${JSON.stringify(Q)}`).join(", ")
    },
    userFacingName: () => "mcp",
    renderToolUseRejectedMessage() {
      return T3.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return T3.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage(A, B, {
      verbose: Q
    }) {
      if (Array.isArray(A)) return T3.createElement(h, {
        flexDirection: "column"
      }, A.map((I, G) => {
        if (I.type === "image") return T3.createElement(h, {
          key: G,
          justifyContent: "space-between",
          overflowX: "hidden",
          width: "100%"
        }, T3.createElement(w0, {
          height: 1
        }, T3.createElement(P, null, "[Image]")));
        return T3.createElement(BE, {
          key: G,
          content: I.text,
          verbose: Q
        })
      }));
      if (!A) return T3.createElement(h, {
        justifyContent: "space-between",
        overflowX: "hidden",
        width: "100%"
      }, T3.createElement(w0, {
        height: 1
      }, T3.createElement(P, {
        color: "secondaryText"
      }, "(No content)")));
      return T3.createElement(BE, {
        content: A,
        verbose: Q
      })
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: "tool_result",
        content: A
      }
    }
  }
// @from(Start 9214255, End 9214271)
pD = I1(U1(), 1)
// @from(Start 9214277, End 9214586)
PV2 = `
Lists available resources from configured MCP servers.
Each resource object includes a 'server' field indicating which server it's from.

Usage examples:
- List all resources from all servers: \`listMcpResources\`
- List resources from a specific server: \`listMcpResources({ server: "myserver" })\`
`
// @from(Start 9214590, End 9214949)
SV2 = `
List available resources from configured MCP servers.
Each returned resource will include all standard MCP resource fields plus a 'server' field 
indicating which server the resource belongs to.

Parameters:
- server (optional): The name of a specific MCP server to get resources from. If not provided,
  resources from all servers will be returned.
`
// @from(Start 9214955, End 9215010)
C45 = n.object({
    server: n.string().optional()
  })
// @from(Start 9215014, End 9217547)
xC1 = {
    isEnabled() {
      return !0
    },
    isConcurrencySafe() {
      return !0
    },
    isReadOnly() {
      return !0
    },
    name: "ListMcpResourcesTool",
    async description() {
      return PV2
    },
    async prompt() {
      return SV2
    },
    inputSchema: C45,
    async * call(A, {
      options: {
        mcpClients: B
      }
    }) {
      let Q = [],
        {
          server: I
        } = A,
        G = I ? B.filter((Z) => Z.name === I) : B;
      if (I && G.length === 0) throw new Error(`Server "${I}" not found. Available servers: ${B.map((Z)=>Z.name).join(", ")}`);
      for (let Z of G) {
        if (Z.type !== "connected") continue;
        let D = Z;
        try {
          if (!D.capabilities?.resources) continue;
          let Y = await D.client.request({
            method: "resources/list"
          }, fj);
          if (!Y.resources) continue;
          let W = Y.resources.map((J) => ({
            ...J,
            server: Z.name
          }));
          Q.push(...W)
        } catch (Y) {
          m7(Z.name, `Failed to fetch resources: ${Y instanceof Error?Y.message:String(Y)}`)
        }
      }
      yield {
        type: "result",
        data: Q
      }
    },
    async checkPermissions(A) {
      return {
        behavior: "allow",
        updatedInput: A
      }
    },
    renderToolUseMessage(A) {
      return A.server ? `List MCP resources from server "${A.server}"` : "List all MCP resources"
    },
    userFacingName: () => "listMcpResources",
    renderToolUseRejectedMessage() {
      return pD.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return pD.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage(A, B, {
      verbose: Q
    }) {
      if (!A || A.length === 0) return pD.createElement(h, {
        justifyContent: "space-between",
        overflowX: "hidden",
        width: "100%"
      }, pD.createElement(h, {
        flexDirection: "row"
      }, pD.createElement(P, null, "  ⎿  "), pD.createElement(P, {
        color: "secondaryText"
      }, "(No resources found)")));
      let I = JSON.stringify(A, null, 2);
      return pD.createElement(BE, {
        content: I,
        verbose: Q
      })
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: "tool_result",
        content: JSON.stringify(A)
      }
    }
  }
// @from(Start 9217553, End 9217569)
pJ = I1(U1(), 1)
// @from(Start 9217575, End 9217837)
_V2 = `
Reads a specific resource from an MCP server.
- server: The name of the MCP server to read from
- uri: The URI of the resource to read

Usage examples:
- Read a resource from a server: \`readMcpResource({ server: "myserver", uri: "my-resource-uri" })\`
`
// @from(Start 9217841, End 9218083)
jV2 = `
Reads a specific resource from an MCP server, identified by server name and resource URI.

Parameters:
- server (required): The name of the MCP server from which to read the resource
- uri (required): The URI of the resource to read
`
// @from(Start 9218089, End 9218154)
K45 = n.object({
    server: n.string(),
    uri: n.string()
  })
// @from(Start 9218158, End 9220464)
fC1 = {
    isEnabled() {
      return !0
    },
    isConcurrencySafe() {
      return !0
    },
    isReadOnly() {
      return !0
    },
    name: "ReadMcpResourceTool",
    async description() {
      return _V2
    },
    async prompt() {
      return jV2
    },
    inputSchema: K45,
    async * call(A, {
      options: {
        mcpClients: B
      }
    }) {
      let {
        server: Q,
        uri: I
      } = A, G = B.find((J) => J.name === Q);
      if (!G) throw new Error(`Server "${Q}" not found. Available servers: ${B.map((J)=>J.name).join(", ")}`);
      if (G.type !== "connected") throw new Error(`Server "${Q}" is not connected`);
      let Z = G;
      if (!Z.capabilities?.resources) throw new Error(`Server "${Q}" does not support resources`);
      let D = await Z.client.request({
        method: "resources/read",
        params: {
          uri: I
        }
      }, Kt);
      yield {
        type: "result",
        data: await wJ("claude_code_unicode_sanitize") ? D$(D) : D
      }
    },
    async checkPermissions(A) {
      return {
        behavior: "allow",
        updatedInput: A
      }
    },
    renderToolUseMessage(A) {
      if (!A.uri || !A.server) return null;
      return `Read resource "${A.uri}" from server "${A.server}"`
    },
    userFacingName: () => "readMcpResource",
    renderToolUseRejectedMessage() {
      return pJ.createElement(C5, null)
    },
    renderToolUseErrorMessage(A, {
      verbose: B
    }) {
      return pJ.createElement(K6, {
        result: A,
        verbose: B
      })
    },
    renderToolUseProgressMessage() {
      return null
    },
    renderToolResultMessage(A, B, {
      verbose: Q
    }) {
      if (!A || !A.contents || A.contents.length === 0) return pJ.createElement(h, {
        justifyContent: "space-between",
        overflowX: "hidden",
        width: "100%"
      }, pJ.createElement(w0, {
        height: 1
      }, pJ.createElement(P, {
        color: "secondaryText"
      }, "(No content)")));
      let I = JSON.stringify(A, null, 2);
      return pJ.createElement(BE, {
        content: I,
        verbose: Q
      })
    },
    mapToolResultToToolResultBlockParam(A, B) {
      return {
        tool_use_id: B,
        type: "tool_result",
        content: JSON.stringify(A)
      }
    }
  }
// @from(Start 9220605, End 9220623)
Co1 = I1(FC2(), 1)
// @from(Start 9220697, End 9220739)
h65 = {
    min: 49152,
    max: 65535
  }
// @from(Start 9220743, End 9220753)
XC2 = 3118
// @from(Start 9220757, End 9220795)
m65 = "http://localhost:3118/callback"
// @from(Start 9220797, End 9221437)
async function d65() {
  let {
    min: A,
    max: B
  } = h65, Q = B - A + 1, I = Math.min(Q, 100);
  for (let G = 0; G < I; G++) {
    let Z = A + Math.floor(Math.random() * Q);
    try {
      return await new Promise((D, Y) => {
        let W = Vo1();
        W.once("error", Y), W.listen(Z, () => {
          W.close(() => D())
        })
      }), Z
    } catch {
      continue
    }
  }
  try {
    return await new Promise((G, Z) => {
      let D = Vo1();
      D.once("error", Z), D.listen(XC2, () => {
        D.close(() => G())
      })
    }), XC2
  } catch {
    throw new Error("No available ports for OAuth redirect")
  }
}
// @from(Start 9221439, End 9221649)
function qO(A, B) {
  let Q = JSON.stringify({
      type: B.type,
      url: B.url,
      headers: B.headers || {}
    }),
    I = b65("sha256").update(Q).digest("hex").substring(0, 16);
  return `${A}|${I}`
}
// @from(Start 9221650, End 9223191)
async function iC1(A, B) {
  let I = VJ().read();
  if (!I?.mcpOAuth) return;
  let G = qO(A, B),
    Z = I.mcpOAuth[G];
  if (!Z?.accessToken) {
    p2(A, "No tokens to revoke");
    return
  }
  try {
    let D = await rl1(B.url);
    if (!D?.revocation_endpoint) {
      p2(A, "Server does not support token revocation");
      return
    }
    p2(A, "Revoking tokens on server"), p2(A, `Revocation endpoint: ${D.revocation_endpoint}`);
    let Y = new URLSearchParams;
    if (Y.set("token", Z.accessToken), Y.set("token_type_hint", "access_token"), Z.clientId) Y.set("client_id", Z.clientId);
    if (await P4.post(D.revocation_endpoint, Y, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Z.accessToken}`
        }
      }), p2(A, "Successfully revoked access token"), Z.refreshToken) {
      let W = new URLSearchParams;
      if (W.set("token", Z.refreshToken), W.set("token_type_hint", "refresh_token"), Z.clientId) W.set("client_id", Z.clientId);
      await P4.post(D.revocation_endpoint, W, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Z.accessToken}`
        }
      }), p2(A, "Successfully revoked refresh token")
    }
  } catch (D) {
    if (P4.isAxiosError(D) && D.response) p2(A, `Failed to revoke tokens on server: ${D.message}, Status: ${D.response.status}, Data: ${JSON.stringify(D.response.data)}`);
    else p2(A, `Failed to revoke tokens on server: ${D}`)
  }
  VC2(A, B)
}
// @from(Start 9223193, End 9223384)
function VC2(A, B) {
  let Q = VJ(),
    I = Q.read();
  if (!I?.mcpOAuth) return;
  let G = qO(A, B);
  if (I.mcpOAuth[G]) delete I.mcpOAuth[G], Q.update(I), p2(A, "Cleared stored tokens")
}
// @from(Start 9223385, End 9226551)
async function Ko1(A, B, Q) {
  VC2(A, B), E1("tengu_mcp_oauth_flow_start", {
    isOAuthFlow: !0
  });
  let I = await d65(),
    G = `http://localhost:${I}/callback`;
  p2(A, `Using redirect port: ${I}`);
  let Z = new MO(A, B, G, !0),
    D, Y = g65(32).toString("base64url");
  Z.saveOAuthState(Y);
  let W = await new Promise((J, F) => {
    let X = Vo1((V, C) => {
      let K = f65(V.url || "", !0);
      if (K.pathname === "/callback") {
        let E = K.query.code,
          N = K.query.state,
          q = K.query.error,
          O = K.query.error_description,
          R = K.query.error_uri;
        if (!q && N !== Y) {
          C.writeHead(400, {
            "Content-Type": "text/html"
          }), C.end("<h1>Authentication Error</h1><p>Invalid state parameter. Please try again.</p><p>You can close this window.</p>"), X.close(), F(new Error("OAuth state mismatch - possible CSRF attack"));
          return
        }
        if (q) {
          C.writeHead(200, {
            "Content-Type": "text/html"
          });
          let T = Co1.default(String(q)),
            L = O ? Co1.default(String(O)) : "";
          C.end(`<h1>Authentication Error</h1><p>${T}: ${L}</p><p>You can close this window.</p>`), X.close();
          let _ = `OAuth error: ${q}`;
          if (O) _ += ` - ${O}`;
          if (R) _ += ` (See: ${R})`;
          F(new Error(_));
          return
        }
        if (E) C.writeHead(200, {
          "Content-Type": "text/html"
        }), C.end(`<h1>Authentication Successful</h1><p>You can close this window. Return to ${m0}.</p>`), X.close(), J(E)
      }
    });
    X.listen(I, async () => {
      try {
        p2(A, "Starting SDK auth"), p2(A, `Server URL: ${B.url}`);
        let V = await VK(Z, {
          serverUrl: B.url
        });
        if (p2(A, `Initial auth result: ${V}`), D = Z.authorizationUrl, D) Q(D);
        if (V !== "REDIRECT") p2(A, `Unexpected auth result, expected REDIRECT: ${V}`)
      } catch (V) {
        p2(A, `SDK auth error: ${V}`), X.close(), F(V)
      }
    }), setTimeout(() => {
      X.close(), F(new Error("Authentication timeout"))
    }, 300000)
  });
  try {
    p2(A, "Completing auth flow with authorization code");
    let J = await VK(Z, {
      serverUrl: B.url,
      authorizationCode: W
    });
    if (p2(A, `Auth result: ${J}`), J === "AUTHORIZED") {
      let F = await Z.tokens();
      if (p2(A, `Tokens after auth: ${F?"Present":"Missing"}`), F) p2(A, `Token access_token length: ${F.access_token?.length}`), p2(A, `Token expires_in: ${F.expires_in}`);
      E1("tengu_mcp_oauth_flow_success", {})
    } else throw new Error("Unexpected auth result: " + J)
  } catch (J) {
    if (p2(A, `Error during auth completion: ${J}`), P4.isAxiosError(J)) try {
      let F = Co0.parse(J.response?.data);
      if (F.error === "invalid_client" && F.error_description?.includes("Client not found")) {
        let X = VJ(),
          V = X.read() || {},
          C = qO(A, B);
        if (V.mcpOAuth?.[C]) delete V.mcpOAuth[C].clientId, delete V.mcpOAuth[C].clientSecret, X.update(V)
      }
    } catch {}
    throw E1("tengu_mcp_oauth_flow_error", {}), J
  }
}
// @from(Start 9226552, End 9231211)
class MO {
  serverName;
  serverConfig;
  redirectUri;
  handleRedirection;
  _codeVerifier;
  _authorizationUrl;
  _oauthState;
  constructor(A, B, Q = m65, I = !1) {
    this.serverName = A, this.serverConfig = B, this.redirectUri = Q, this.handleRedirection = I
  }
  get redirectUrl() {
    return this.redirectUri
  }
  get authorizationUrl() {
    return this._authorizationUrl
  }
  get clientMetadata() {
    return {
      client_name: `${m0} (${this.serverName})`,
      redirect_uris: [this.redirectUri],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none"
    }
  }
  async clientInformation() {
    let B = VJ().read(),
      Q = qO(this.serverName, this.serverConfig),
      I = B?.mcpOAuth?.[Q];
    if (I?.clientId) return p2(this.serverName, "Found client info"), {
      client_id: I.clientId,
      client_secret: I.clientSecret
    };
    p2(this.serverName, "No client info found");
    return
  }
  async saveClientInformation(A) {
    let B = VJ(),
      Q = B.read() || {},
      I = qO(this.serverName, this.serverConfig),
      G = {
        ...Q,
        mcpOAuth: {
          ...Q.mcpOAuth,
          [I]: {
            ...Q.mcpOAuth?.[I],
            serverName: this.serverName,
            serverUrl: this.serverConfig.url,
            clientId: A.client_id,
            clientSecret: A.client_secret,
            accessToken: Q.mcpOAuth?.[I]?.accessToken || "",
            expiresAt: Q.mcpOAuth?.[I]?.expiresAt || 0
          }
        }
      };
    B.update(G)
  }
  async tokens() {
    let B = VJ().read(),
      Q = qO(this.serverName, this.serverConfig),
      I = B?.mcpOAuth?.[Q];
    if (!I) {
      p2(this.serverName, "No token data found");
      return
    }
    let G = (I.expiresAt - Date.now()) / 1000;
    if (G <= 0 && !I.refreshToken) {
      p2(this.serverName, "Token expired without refresh token");
      return
    }
    let Z = {
      access_token: I.accessToken,
      refresh_token: I.refreshToken,
      expires_in: G,
      scope: I.scope,
      token_type: "Bearer"
    };
    if (p2(this.serverName, "Returning tokens"), p2(this.serverName, `Token length: ${Z.access_token?.length}`), p2(this.serverName, `Has refresh token: ${!!Z.refresh_token}`), p2(this.serverName, `Expires in: ${Z.expires_in}`), G <= 60) p2(this.serverName, "Token is expired or about to expire - SDK should refresh");
    return Z
  }
  async saveTokens(A) {
    let B = VJ(),
      Q = B.read() || {},
      I = qO(this.serverName, this.serverConfig);
    p2(this.serverName, "Saving tokens"), p2(this.serverName, `Token expires in: ${A.expires_in}`), p2(this.serverName, `Has refresh token: ${!!A.refresh_token}`);
    let G = {
      ...Q,
      mcpOAuth: {
        ...Q.mcpOAuth,
        [I]: {
          ...Q.mcpOAuth?.[I],
          serverName: this.serverName,
          serverUrl: this.serverConfig.url,
          accessToken: A.access_token,
          refreshToken: A.refresh_token,
          expiresAt: Date.now() + (A.expires_in || 3600) * 1000,
          scope: A.scope
        }
      }
    };
    B.update(G)
  }
  async redirectToAuthorization(A) {
    if (!this._oauthState) throw new Error("OAuth state must be set before redirecting to authorization");
    if (A.searchParams.set("state", this._oauthState), p2(this.serverName, "Added state parameter to authorization URL"), this._authorizationUrl = A.toString(), !this.handleRedirection) {
      p2(this.serverName, "Redirection handling is disabled, skipping redirect");
      return
    }
    p2(this.serverName, "Redirecting to authorization URL"), p2(this.serverName, `Authorization URL: ${A.toString()}`);
    let B = process.env.BROWSER,
      Q = B ? B : process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
    if (p2(this.serverName, `Opening authorization URL: ${A.toString()}`), B) p2(this.serverName, `Using $BROWSER environment variable: ${B}`);
    try {
      v65(`${Q} "${A.toString()}"`)
    } catch {
      process.stdout.write(`
Couldn't open browser automatically. Please manually open the URL above in your browser.
`)
    }
  }
  async saveCodeVerifier(A) {
    p2(this.serverName, "Saving code verifier"), this._codeVerifier = A
  }
  async codeVerifier() {
    if (!this._codeVerifier) throw p2(this.serverName, "No code verifier saved"), new Error("No code verifier saved");
    return p2(this.serverName, "Returning code verifier"), this._codeVerifier
  }
  saveOAuthState(A) {
    p2(this.serverName, "Saving OAuth state"), this._oauthState = A
  }
  getOAuthState() {
    return this._oauthState
  }
}
// @from(Start 9231213, End 9231490)
function nC1(A) {
  switch (A) {
    case "local":
      return "Local (private to you in this project)";
    case "project":
      return "Project (shared via .mcp.json)";
    case "user":
      return "User (available in all your projects)";
    default:
      return A
  }
}
// @from(Start 9231492, End 9231662)
function cd(A) {
  if (!A) return "local";
  if (!ef1.options.includes(A)) throw new Error(`Invalid scope: ${A}. Must be one of: ${ef1.options.join(", ")}`);
  return A
}
// @from(Start 9231664, End 9231855)
function Ho1(A) {
  if (!A) return "stdio";
  if (A !== "stdio" && A !== "sse" && A !== "http") throw new Error(`Invalid transport type: ${A}. Must be one of: stdio, sse, http`);
  return A
}
// @from(Start 9231857, End 9232338)
function LO(A, B, Q = "local") {
  if (Q === "project") {
    let G = {
      mcpServers: {
        ...vC()
      }
    };
    G.mcpServers[A] = B;
    try {
      Yv1(G)
    } catch (Z) {
      throw new Error(`Failed to write to mcp.json: ${Z}`)
    }
  } else if (Q === "user") {
    let I = ZA();
    if (!I.mcpServers) I.mcpServers = {};
    I.mcpServers[A] = B, j0(I)
  } else {
    let I = m9();
    if (!I.mcpServers) I.mcpServers = {};
    I.mcpServers[A] = B, B5(I)
  }
}
// @from(Start 9232340, End 9232861)
function zo1(A, B, Q = "local") {
  if (A.match(/[^a-zA-Z0-9_-]/)) throw new Error(`Invalid name ${A}. Names can only contain letters, numbers, hyphens, and underscores.`);
  if (sC1(A)) throw new Error(`A server with the name ${A} already exists.`);
  let I = Z8(B);
  if (!I) throw new Error("Invalid JSON");
  let G = Bv1.safeParse(I);
  if (!G.success) {
    let Z = G.error.errors.map((D) => `${D.path.join(".")}: ${D.message}`).join(", ");
    throw new Error(`Invalid configuration: ${Z}`)
  }
  LO(A, G.data, Q)
}
// @from(Start 9232863, End 9233564)
function aC1(A, B = "local") {
  if (B === "project") {
    let Q = vC();
    if (!Q[A]) throw new Error(`No MCP server found with name: ${A} in .mcp.json`);
    let I = {
      mcpServers: {
        ...Q
      }
    };
    delete I.mcpServers[A];
    try {
      Yv1(I)
    } catch (G) {
      throw new Error(`Failed to remove from .mcp.json: ${G}`)
    }
  } else if (B === "user") {
    let Q = ZA();
    if (!Q.mcpServers?.[A]) throw new Error(`No user-scoped MCP server found with name: ${A}`);
    delete Q.mcpServers[A], j0(Q)
  } else {
    let Q = m9();
    if (!Q.mcpServers?.[A]) throw new Error(`No project-local MCP server found with name: ${A}`);
    delete Q.mcpServers[A], B5(Q)
  }
}
// @from(Start 9233566, End 9233863)
function sC1(A) {
  let B = m9(),
    Q = vC(),
    I = ZA();
  if (B.mcpServers?.[A]) return {
    ...B.mcpServers[A],
    scope: "local"
  };
  if (Q?.[A]) return {
    ...Q[A],
    scope: "project"
  };
  if (I.mcpServers?.[A]) return {
    ...I.mcpServers[A],
    scope: "user"
  };
  return
}
// @from(Start 9233865, End 9234081)
function rC1(A) {
  let B = m6();
  if (B?.disabledMcpjsonServers?.includes(A)) return "rejected";
  if (B?.enabledMcpjsonServers?.includes(A) || B?.enableAllProjectMcpServers) return "approved";
  return "pending"
}
// @from(Start 9234086, End 9234576)
DV = L0(() => {
  let A = ZA().mcpServers ?? {},
    B = vC(),
    Q = m9().mcpServers ?? {},
    I = _U1(B, (G, Z) => rC1(Z) === "approved");
  return E1("tengu_mcp_servers", {
    global: Object.keys(A).length,
    project: Object.keys(I).length,
    user: Object.keys(Q).length
  }), {
    ...UU(A, (G) => ({
      ...G,
      scope: "user"
    })),
    ...UU(I, (G) => ({
      ...G,
      scope: "project"
    })),
    ...UU(Q, (G) => ({
      ...G,
      scope: "local"
    }))
  }
})
// @from(Start 9234579, End 9235191)
function wo1(A) {
  try {
    if (!x1().existsSync(A)) throw new Error(`MCP config file not found: ${A}`);
    let B = x1().readFileSync(A, {
        encoding: "utf8"
      }),
      Q = Z8(B);
    if (!Q) throw new Error(`Invalid JSON in MCP config file: ${A}`);
    let I = Ug.safeParse(Q);
    if (!I.success) {
      let G = I.error.errors.map((Z) => `${Z.path.join(".")}: ${Z.message}`).join(", ");
      throw new Error(`Invalid MCP configuration in ${A}: ${G}`)
    }
    return I.data
  } catch (B) {
    if (B instanceof Error) throw B;
    throw new Error(`Failed to parse MCP config file: ${B}`)
  }
}
// @from(Start 9235193, End 9235570)
function oC1(A) {
  let B = {};
  for (let Q of A) {
    let I = Q.indexOf(":");
    if (I === -1) throw new Error(`Invalid header format: "${Q}". Expected format: "Header-Name: value"`);
    let G = Q.substring(0, I).trim(),
      Z = Q.substring(I + 1).trim();
    if (!G) throw new Error(`Invalid header: "${Q}". Header name cannot be empty.`);
    B[G] = Z
  }
  return B
}
// @from(Start 9235575, End 9235644)
u65 = new Set(["image/jpeg", "image/png", "image/gif", "image/webp"])
// @from(Start 9235647, End 9235730)
function p65() {
  return parseInt(process.env.MCP_TOOL_TIMEOUT || "", 10) || 1e8
}
// @from(Start 9235732, End 9235812)
function CC2() {
  return parseInt(process.env.MCP_TIMEOUT || "", 10) || 30000
}
// @from(Start 9235817, End 9235876)
c65 = ["mcp__ide__executeCode", "mcp__ide__getDiagnostics"]
// @from(Start 9235879, End 9235964)
function l65(A) {
  return !A.name.startsWith("mcp__ide__") || c65.includes(A.name)
}
// @from(Start 9235966, End 9236025)
function KC2(A, B) {
  return `${A}-${JSON.stringify(B)}`
}
// @from(Start 9236030, End 9240389)
ue = L0(async (A, B) => {
  try {
    let Q;
    if (B.type === "sse") {
      let X = new MO(A, B),
        V = {
          authProvider: X,
          requestInit: {
            ...B.headers && {
              headers: B.headers
            },
            signal: AbortSignal.timeout(60000)
          }
        };
      if (B.headers) V.eventSourceInit = {
        fetch: async (C, K) => {
          let E = {},
            N = await X.tokens();
          if (N) E.Authorization = `Bearer ${N.access_token}`;
          return fetch(C, {
            ...K,
            headers: {
              ...E,
              ...K?.headers,
              ...B.headers,
              Accept: "text/event-stream"
            }
          })
        }
      };
      Q = new FF1(new URL(B.url), V)
    } else if (B.type === "sse-ide") Q = new FF1(new URL(B.url));
    else if (B.type === "ws-ide") {
      let X = new tB1.default(B.url, ["mcp"], B.authToken ? {
        headers: {
          "X-Claude-Code-Ide-Authorization": B.authToken
        }
      } : void 0);
      Q = new Do1(X)
    } else if (B.type === "http") {
      let V = {
        authProvider: new MO(A, B),
        requestInit: {
          ...B.headers && {
            headers: B.headers
          },
          signal: AbortSignal.timeout(60000)
        }
      };
      Q = new tl1(new URL(B.url), V)
    } else Q = new xl1({
      command: B.command,
      args: B.args,
      env: {
        ...process.env,
        ...B.env
      },
      stderr: "pipe"
    });
    let I = new Ll1({
      name: "claude",
      version: "0.1.0"
    }, {
      capabilities: {
        roots: {}
      }
    });
    I.setRequestHandler(ql1, async () => {
      return {
        roots: [{
          uri: `file://${e9()}`
        }]
      }
    });
    let G = I.connect(Q),
      Z = new Promise((X, V) => {
        let C = setTimeout(() => {
          V(new Error(`Connection to MCP server "${A}" timed out after ${CC2()}ms`))
        }, CC2());
        G.then(() => clearTimeout(C), () => clearTimeout(C))
      });
    try {
      await Promise.race([G, Z])
    } catch (X) {
      if (B.type === "sse" && X instanceof Error) {
        if (p2(A, `SSE Connection error: ${JSON.stringify({url:B.url,error:X.message,stack:X.stack})}`), m7(A, X), X.message.includes("401") || X.message.includes("Unauthorized")) return E1("tengu_mcp_server_needs_auth", {}), p2(A, "Authentication required for SSE server"), {
          name: A,
          type: "needs-auth",
          config: B
        }
      } else if (B.type === "http" && X instanceof Error) {
        if (p2(A, `HTTP Connection error: ${JSON.stringify({url:B.url,error:X.message,stack:X.stack})}`), m7(A, X), X.message.includes("401") || X.message.includes("Unauthorized")) return E1("tengu_mcp_server_needs_auth", {}), p2(A, "Authentication required for HTTP server"), {
          name: A,
          type: "needs-auth",
          config: B
        }
      } else if (B.type === "sse-ide" || B.type === "ws-ide") E1("tengu_mcp_ide_server_connection_failed", {});
      throw X
    }
    let D = I.getServerCapabilities(),
      Y = I.getServerVersion();
    if (B.type === "sse-ide" || B.type === "ws-ide") {
      E1("tengu_mcp_ide_server_connection_succeeded", {
        serverVersion: Y
      });
      try {
        we0(I)
      } catch (X) {
        m7(A, `Failed to send ide_connected notification: ${X}`)
      }
    }
    if (B.type === "stdio") Q.stderr?.on("data", (X) => {
      let V = X.toString().trim();
      if (V) m7(A, `Server stderr: ${V}`)
    });
    let W = async () => {
      try {
        await I.close()
      } catch (X) {
        p2(A, `Error closing client: ${X}`)
      }
    }, J;
    if (B.type === "stdio") J = dG1(W);
    let F = async () => {
      J?.(), await W()
    };
    return E1("tengu_mcp_server_connection_succeeded", {}), {
      name: A,
      client: I,
      type: "connected",
      capabilities: D ?? {},
      serverInfo: Y,
      config: B,
      cleanup: F
    }
  } catch (Q) {
    if (E1("tengu_mcp_server_connection_failed", {}), p2(A, `Connection failed: ${Q}`), Q instanceof Error) p2(A, `Error message: ${Q.message}`), p2(A, `Error stack: ${Q.stack}`);
    return m7(A, `Connection failed: ${Q instanceof Error?Q.message:String(Q)}`), {
      name: A,
      type: "failed",
      config: B
    }
  }
}, KC2)
// @from(Start 9240391, End 9240560)
async function tC1(A, B) {
  let Q = KC2(A, B);
  try {
    let I = await ue(A, B);
    if (I.type === "connected") await I.cleanup()
  } catch {}
  ue.cache.delete(Q)
}
// @from(Start 9240561, End 9240624)
async function HC2(A, B) {
  return await tC1(A, B), ue(A, B)
}
// @from(Start 9240629, End 9241866)
Eo1 = L0(async (A) => {
    if (A.type !== "connected") return [];
    try {
      if (!A.capabilities?.tools) return [];
      let B = await A.client.request({
        method: "tools/list"
      }, zt);
      return (await wJ("claude_code_unicode_sanitize") ? D$(B.tools) : B.tools).map((G) => ({
        ...TV2,
        name: "mcp__" + j81(A.name) + "__" + G.name,
        isMcp: !0,
        async description() {
          return G.description ?? ""
        },
        async prompt() {
          return G.description ?? ""
        },
        isConcurrencySafe() {
          return G.annotations?.readOnlyHint ?? !1
        },
        inputJSONSchema: G.inputSchema,
        async * call(Z, D) {
          yield {
            type: "result",
            data: await wC2({
              client: A,
              tool: G.name,
              args: Z,
              signal: D.abortController.signal,
              isNonInteractiveSession: D.options.isNonInteractiveSession
            })
          }
        },
        userFacingName() {
          return `${A.name}:${G.name} (MCP)`
        }
      })).filter(l65)
    } catch (B) {
      return m7(A.name, `Failed to fetch tools: ${B instanceof Error?B.message:String(B)}`), []
    }
  })
// @from(Start 9241870, End 9242331)
Uo1 = L0(async (A) => {
    if (A.type !== "connected") return [];
    try {
      if (!A.capabilities?.resources) return [];
      let B = await A.client.request({
        method: "resources/list"
      }, fj);
      if (!B.resources) return [];
      return B.resources.map((Q) => ({
        ...Q,
        server: A.name
      }))
    } catch (B) {
      return m7(A.name, `Failed to fetch resources: ${B instanceof Error?B.message:String(B)}`), []
    }
  })
// @from(Start 9242335, End 9243712)
zC2 = L0(async (A) => {
    if (A.type !== "connected") return [];
    let B = A;
    try {
      if (!A.capabilities?.prompts) return [];
      let Q = await A.client.request({
        method: "prompts/list"
      }, Ht);
      if (!Q.prompts) return [];
      return (await wJ("claude_code_unicode_sanitize") ? D$(Q.prompts) : Q.prompts).map((Z) => {
        let D = Object.values(Z.arguments ?? {}).map((Y) => Y.name);
        return {
          type: "prompt",
          name: "mcp__" + j81(B.name) + "__" + Z.name,
          description: Z.description ?? "",
          isEnabled: () => !0,
          isHidden: !1,
          isMcp: !0,
          progressMessage: "running",
          userFacingName() {
            return `${B.name}:${Z.name} (MCP)`
          },
          argNames: D,
          async getPromptForCommand(Y) {
            let W = Y.split(" ");
            try {
              return (await B.client.getPrompt({
                name: Z.name,
                arguments: yU1(D, W)
              })).messages.flatMap((F) => No1(F.content, A.name))
            } catch (J) {
              throw m7(A.name, `Error running command '${Z.name}': ${J instanceof Error?J.message:String(J)}`), J
            }
          }
        }
      })
    } catch (Q) {
      return m7(A.name, `Failed to fetch commands: ${Q instanceof Error?Q.message:String(Q)}`), []
    }
  })
// @from(Start 9243714, End 9243881)
async function gw(A, B, Q, I) {
  return wC2({
    client: Q,
    tool: A,
    args: B,
    signal: new AbortController().signal,
    isNonInteractiveSession: I
  })
}
// @from(Start 9243882, End 9244401)
async function pe(A, B, Q) {
  let I = await HC2(A, B);
  if (I.type !== "connected") {
    Q({
      client: I,
      tools: [],
      commands: []
    });
    return
  }
  let G = !!I.capabilities?.resources,
    [Z, D, Y] = await Promise.all([Eo1(I), zC2(I), G ? Uo1(I) : Promise.resolve([])]),
    W = [];
  if (G) {
    if (![xC1, fC1].some((F) => Z.some((X) => X.name === F.name))) W.push(xC1, fC1)
  }
  Q({
    client: I,
    tools: [...Z, ...W],
    commands: D,
    resources: Y.length > 0 ? Y : void 0
  })
}
// @from(Start 9244402, End 9245042)
async function eC1(A, B) {
  let Q = !1,
    I = DV(),
    G = B ? {
      ...I,
      ...B
    } : I;
  await Promise.all(Object.entries(G).map(async ([Z, D]) => {
    let Y = await ue(Z, D);
    if (Y.type !== "connected") {
      A({
        client: Y,
        tools: [],
        commands: []
      });
      return
    }
    let W = !!Y.capabilities?.resources,
      [J, F, X] = await Promise.all([Eo1(Y), zC2(Y), W ? Uo1(Y) : Promise.resolve([])]),
      V = [];
    if (W && !Q) Q = !0, V.push(xC1, fC1);
    A({
      client: Y,
      tools: [...J, ...V],
      commands: F,
      resources: X.length > 0 ? X : void 0
    })
  }))
}
// @from(Start 9245047, End 9245580)
AK1 = L0(async (A) => {
  return new Promise((B) => {
    let Q = 0,
      I = 0,
      G = DV(),
      Z = A ? {
        ...G,
        ...A
      } : G;
    if (Q = Object.keys(Z).length, Q === 0) {
      B({
        clients: [],
        tools: [],
        commands: []
      });
      return
    }
    let D = [],
      Y = [],
      W = [];
    eC1((J) => {
      if (D.push(J.client), Y.push(...J.tools), W.push(...J.commands), I++, I >= Q) B({
        clients: D,
        tools: Y,
        commands: W
      })
    }, A)
  })
})
// @from(Start 9245583, End 9246691)
function No1(A, B) {
  switch (A.type) {
    case "text":
      return [{
        type: "text",
        text: A.text
      }];
    case "image":
      return [{
        type: "image",
        source: {
          data: String(A.data),
          media_type: A.mimeType || "image/jpeg",
          type: "base64"
        }
      }];
    case "resource": {
      let Q = A.resource,
        I = `[Resource from ${B} at ${Q.uri}] `;
      if ("text" in Q) return [{
        type: "text",
        text: `${I}${Q.text}`
      }];
      else if ("blob" in Q)
        if (u65.has(Q.mimeType ?? "")) {
          let Z = [];
          if (I) Z.push({
            type: "text",
            text: I
          });
          return Z.push({
            type: "image",
            source: {
              data: Q.blob,
              media_type: Q.mimeType || "image/jpeg",
              type: "base64"
            }
          }), Z
        } else return [{
          type: "text",
          text: `${I}Base64 data (${Q.mimeType||"unknown type"}) ${Q.blob}`
        }];
      return []
    }
    default:
      return []
  }
}