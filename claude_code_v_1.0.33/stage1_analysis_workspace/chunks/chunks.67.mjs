
// @from(Start 6927151, End 6945505)
tj = z((dJ2) => {
  Object.defineProperty(dJ2, "__esModule", {
    value: !0
  });
  dJ2.OAuth2Client = dJ2.ClientAuthentication = dJ2.CertificateFormat = dJ2.CodeChallengeMethod = void 0;
  var cA5 = NK(),
    es1 = Z1("querystring"),
    lA5 = Z1("stream"),
    iA5 = as1(),
    Ar1 = Td(),
    nA5 = tw(),
    aA5 = ts1(),
    mJ2;
  (function(A) {
    A.Plain = "plain", A.S256 = "S256"
  })(mJ2 || (dJ2.CodeChallengeMethod = mJ2 = {}));
  var U$;
  (function(A) {
    A.PEM = "PEM", A.JWK = "JWK"
  })(U$ || (dJ2.CertificateFormat = U$ = {}));
  var Pe;
  (function(A) {
    A.ClientSecretPost = "ClientSecretPost", A.ClientSecretBasic = "ClientSecretBasic", A.None = "None"
  })(Pe || (dJ2.ClientAuthentication = Pe = {}));
  class uD extends nA5.AuthClient {
    constructor(A, B, Q) {
      let I = A && typeof A === "object" ? A : {
        clientId: A,
        clientSecret: B,
        redirectUri: Q
      };
      super(I);
      this.certificateCache = {}, this.certificateExpiry = null, this.certificateCacheFormat = U$.PEM, this.refreshTokenPromises = new Map, this._clientId = I.clientId, this._clientSecret = I.clientSecret, this.redirectUri = I.redirectUri, this.endpoints = {
        tokenInfoUrl: "https://oauth2.googleapis.com/tokeninfo",
        oauth2AuthBaseUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        oauth2TokenUrl: "https://oauth2.googleapis.com/token",
        oauth2RevokeUrl: "https://oauth2.googleapis.com/revoke",
        oauth2FederatedSignonPemCertsUrl: "https://www.googleapis.com/oauth2/v1/certs",
        oauth2FederatedSignonJwkCertsUrl: "https://www.googleapis.com/oauth2/v3/certs",
        oauth2IapPublicKeyUrl: "https://www.gstatic.com/iap/verify/public_key",
        ...I.endpoints
      }, this.clientAuthentication = I.clientAuthentication || Pe.ClientSecretPost, this.issuers = I.issuers || ["accounts.google.com", "https://accounts.google.com", this.universeDomain]
    }
    generateAuthUrl(A = {}) {
      if (A.code_challenge_method && !A.code_challenge) throw new Error("If a code_challenge_method is provided, code_challenge must be included.");
      if (A.response_type = A.response_type || "code", A.client_id = A.client_id || this._clientId, A.redirect_uri = A.redirect_uri || this.redirectUri, Array.isArray(A.scope)) A.scope = A.scope.join(" ");
      return this.endpoints.oauth2AuthBaseUrl.toString() + "?" + es1.stringify(A)
    }
    generateCodeVerifier() {
      throw new Error("generateCodeVerifier is removed, please use generateCodeVerifierAsync instead.")
    }
    async generateCodeVerifierAsync() {
      let A = Ar1.createCrypto(),
        Q = A.randomBytesBase64(96).replace(/\+/g, "~").replace(/=/g, "_").replace(/\//g, "-"),
        G = (await A.sha256DigestBase64(Q)).split("=")[0].replace(/\+/g, "-").replace(/\//g, "_");
      return {
        codeVerifier: Q,
        codeChallenge: G
      }
    }
    getToken(A, B) {
      let Q = typeof A === "string" ? {
        code: A
      } : A;
      if (B) this.getTokenAsync(Q).then((I) => B(null, I.tokens, I.res), (I) => B(I, null, I.response));
      else return this.getTokenAsync(Q)
    }
    async getTokenAsync(A) {
      let B = this.endpoints.oauth2TokenUrl.toString(),
        Q = {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        I = {
          client_id: A.client_id || this._clientId,
          code_verifier: A.codeVerifier,
          code: A.code,
          grant_type: "authorization_code",
          redirect_uri: A.redirect_uri || this.redirectUri
        };
      if (this.clientAuthentication === Pe.ClientSecretBasic) {
        let D = Buffer.from(`${this._clientId}:${this._clientSecret}`);
        Q.Authorization = `Basic ${D.toString("base64")}`
      }
      if (this.clientAuthentication === Pe.ClientSecretPost) I.client_secret = this._clientSecret;
      let G = await this.transporter.request({
          ...uD.RETRY_CONFIG,
          method: "POST",
          url: B,
          data: es1.stringify(I),
          headers: Q
        }),
        Z = G.data;
      if (G.data && G.data.expires_in) Z.expiry_date = new Date().getTime() + G.data.expires_in * 1000, delete Z.expires_in;
      return this.emit("tokens", Z), {
        tokens: Z,
        res: G
      }
    }
    async refreshToken(A) {
      if (!A) return this.refreshTokenNoCache(A);
      if (this.refreshTokenPromises.has(A)) return this.refreshTokenPromises.get(A);
      let B = this.refreshTokenNoCache(A).then((Q) => {
        return this.refreshTokenPromises.delete(A), Q
      }, (Q) => {
        throw this.refreshTokenPromises.delete(A), Q
      });
      return this.refreshTokenPromises.set(A, B), B
    }
    async refreshTokenNoCache(A) {
      var B;
      if (!A) throw new Error("No refresh token is set.");
      let Q = this.endpoints.oauth2TokenUrl.toString(),
        I = {
          refresh_token: A,
          client_id: this._clientId,
          client_secret: this._clientSecret,
          grant_type: "refresh_token"
        },
        G;
      try {
        G = await this.transporter.request({
          ...uD.RETRY_CONFIG,
          method: "POST",
          url: Q,
          data: es1.stringify(I),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
      } catch (D) {
        if (D instanceof cA5.GaxiosError && D.message === "invalid_grant" && ((B = D.response) === null || B === void 0 ? void 0 : B.data) && /ReAuth/i.test(D.response.data.error_description)) D.message = JSON.stringify(D.response.data);
        throw D
      }
      let Z = G.data;
      if (G.data && G.data.expires_in) Z.expiry_date = new Date().getTime() + G.data.expires_in * 1000, delete Z.expires_in;
      return this.emit("tokens", Z), {
        tokens: Z,
        res: G
      }
    }
    refreshAccessToken(A) {
      if (A) this.refreshAccessTokenAsync().then((B) => A(null, B.credentials, B.res), A);
      else return this.refreshAccessTokenAsync()
    }
    async refreshAccessTokenAsync() {
      let A = await this.refreshToken(this.credentials.refresh_token),
        B = A.tokens;
      return B.refresh_token = this.credentials.refresh_token, this.credentials = B, {
        credentials: this.credentials,
        res: A.res
      }
    }
    getAccessToken(A) {
      if (A) this.getAccessTokenAsync().then((B) => A(null, B.token, B.res), A);
      else return this.getAccessTokenAsync()
    }
    async getAccessTokenAsync() {
      if (!this.credentials.access_token || this.isTokenExpiring()) {
        if (!this.credentials.refresh_token)
          if (this.refreshHandler) {
            let Q = await this.processAndValidateRefreshHandler();
            if (Q === null || Q === void 0 ? void 0 : Q.access_token) return this.setCredentials(Q), {
              token: this.credentials.access_token
            }
          } else throw new Error("No refresh token or refresh handler callback is set.");
        let B = await this.refreshAccessTokenAsync();
        if (!B.credentials || B.credentials && !B.credentials.access_token) throw new Error("Could not refresh access token.");
        return {
          token: B.credentials.access_token,
          res: B.res
        }
      } else return {
        token: this.credentials.access_token
      }
    }
    async getRequestHeaders(A) {
      return (await this.getRequestMetadataAsync(A)).headers
    }
    async getRequestMetadataAsync(A) {
      let B = this.credentials;
      if (!B.access_token && !B.refresh_token && !this.apiKey && !this.refreshHandler) throw new Error("No access, refresh token, API key or refresh handler callback is set.");
      if (B.access_token && !this.isTokenExpiring()) {
        B.token_type = B.token_type || "Bearer";
        let D = {
          Authorization: B.token_type + " " + B.access_token
        };
        return {
          headers: this.addSharedMetadataHeaders(D)
        }
      }
      if (this.refreshHandler) {
        let D = await this.processAndValidateRefreshHandler();
        if (D === null || D === void 0 ? void 0 : D.access_token) {
          this.setCredentials(D);
          let Y = {
            Authorization: "Bearer " + this.credentials.access_token
          };
          return {
            headers: this.addSharedMetadataHeaders(Y)
          }
        }
      }
      if (this.apiKey) return {
        headers: {
          "X-Goog-Api-Key": this.apiKey
        }
      };
      let Q = null,
        I = null;
      try {
        Q = await this.refreshToken(B.refresh_token), I = Q.tokens
      } catch (D) {
        let Y = D;
        if (Y.response && (Y.response.status === 403 || Y.response.status === 404)) Y.message = `Could not refresh access token: ${Y.message}`;
        throw Y
      }
      let G = this.credentials;
      G.token_type = G.token_type || "Bearer", I.refresh_token = G.refresh_token, this.credentials = I;
      let Z = {
        Authorization: G.token_type + " " + I.access_token
      };
      return {
        headers: this.addSharedMetadataHeaders(Z),
        res: Q.res
      }
    }
    static getRevokeTokenUrl(A) {
      return new uD().getRevokeTokenURL(A).toString()
    }
    getRevokeTokenURL(A) {
      let B = new URL(this.endpoints.oauth2RevokeUrl);
      return B.searchParams.append("token", A), B
    }
    revokeToken(A, B) {
      let Q = {
        ...uD.RETRY_CONFIG,
        url: this.getRevokeTokenURL(A).toString(),
        method: "POST"
      };
      if (B) this.transporter.request(Q).then((I) => B(null, I), B);
      else return this.transporter.request(Q)
    }
    revokeCredentials(A) {
      if (A) this.revokeCredentialsAsync().then((B) => A(null, B), A);
      else return this.revokeCredentialsAsync()
    }
    async revokeCredentialsAsync() {
      let A = this.credentials.access_token;
      if (this.credentials = {}, A) return this.revokeToken(A);
      else throw new Error("No access token to revoke.")
    }
    request(A, B) {
      if (B) this.requestAsync(A).then((Q) => B(null, Q), (Q) => {
        return B(Q, Q.response)
      });
      else return this.requestAsync(A)
    }
    async requestAsync(A, B = !1) {
      let Q;
      try {
        let I = await this.getRequestMetadataAsync(A.url);
        if (A.headers = A.headers || {}, I.headers && I.headers["x-goog-user-project"]) A.headers["x-goog-user-project"] = I.headers["x-goog-user-project"];
        if (I.headers && I.headers.Authorization) A.headers.Authorization = I.headers.Authorization;
        if (this.apiKey) A.headers["X-Goog-Api-Key"] = this.apiKey;
        Q = await this.transporter.request(A)
      } catch (I) {
        let G = I.response;
        if (G) {
          let Z = G.status,
            D = this.credentials && this.credentials.access_token && this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure),
            Y = this.credentials && this.credentials.access_token && !this.credentials.refresh_token && (!this.credentials.expiry_date || this.forceRefreshOnFailure) && this.refreshHandler,
            W = G.config.data instanceof lA5.Readable,
            J = Z === 401 || Z === 403;
          if (!B && J && !W && D) return await this.refreshAccessTokenAsync(), this.requestAsync(A, !0);
          else if (!B && J && !W && Y) {
            let F = await this.processAndValidateRefreshHandler();
            if (F === null || F === void 0 ? void 0 : F.access_token) this.setCredentials(F);
            return this.requestAsync(A, !0)
          }
        }
        throw I
      }
      return Q
    }
    verifyIdToken(A, B) {
      if (B && typeof B !== "function") throw new Error("This method accepts an options object as the first parameter, which includes the idToken, audience, and maxExpiry.");
      if (B) this.verifyIdTokenAsync(A).then((Q) => B(null, Q), B);
      else return this.verifyIdTokenAsync(A)
    }
    async verifyIdTokenAsync(A) {
      if (!A.idToken) throw new Error("The verifyIdToken method requires an ID Token");
      let B = await this.getFederatedSignonCertsAsync();
      return await this.verifySignedJwtWithCertsAsync(A.idToken, B.certs, A.audience, this.issuers, A.maxExpiry)
    }
    async getTokenInfo(A) {
      let {
        data: B
      } = await this.transporter.request({
        ...uD.RETRY_CONFIG,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${A}`
        },
        url: this.endpoints.tokenInfoUrl.toString()
      }), Q = Object.assign({
        expiry_date: new Date().getTime() + B.expires_in * 1000,
        scopes: B.scope.split(" ")
      }, B);
      return delete Q.expires_in, delete Q.scope, Q
    }
    getFederatedSignonCerts(A) {
      if (A) this.getFederatedSignonCertsAsync().then((B) => A(null, B.certs, B.res), A);
      else return this.getFederatedSignonCertsAsync()
    }
    async getFederatedSignonCertsAsync() {
      let A = new Date().getTime(),
        B = Ar1.hasBrowserCrypto() ? U$.JWK : U$.PEM;
      if (this.certificateExpiry && A < this.certificateExpiry.getTime() && this.certificateCacheFormat === B) return {
        certs: this.certificateCache,
        format: B
      };
      let Q, I;
      switch (B) {
        case U$.PEM:
          I = this.endpoints.oauth2FederatedSignonPemCertsUrl.toString();
          break;
        case U$.JWK:
          I = this.endpoints.oauth2FederatedSignonJwkCertsUrl.toString();
          break;
        default:
          throw new Error(`Unsupported certificate format ${B}`)
      }
      try {
        Q = await this.transporter.request({
          ...uD.RETRY_CONFIG,
          url: I
        })
      } catch (W) {
        if (W instanceof Error) W.message = `Failed to retrieve verification certificates: ${W.message}`;
        throw W
      }
      let G = Q ? Q.headers["cache-control"] : void 0,
        Z = -1;
      if (G) {
        let J = new RegExp("max-age=([0-9]*)").exec(G);
        if (J && J.length === 2) Z = Number(J[1]) * 1000
      }
      let D = {};
      switch (B) {
        case U$.PEM:
          D = Q.data;
          break;
        case U$.JWK:
          for (let W of Q.data.keys) D[W.kid] = W;
          break;
        default:
          throw new Error(`Unsupported certificate format ${B}`)
      }
      let Y = new Date;
      return this.certificateExpiry = Z === -1 ? null : new Date(Y.getTime() + Z), this.certificateCache = D, this.certificateCacheFormat = B, {
        certs: D,
        format: B,
        res: Q
      }
    }
    getIapPublicKeys(A) {
      if (A) this.getIapPublicKeysAsync().then((B) => A(null, B.pubkeys, B.res), A);
      else return this.getIapPublicKeysAsync()
    }
    async getIapPublicKeysAsync() {
      let A, B = this.endpoints.oauth2IapPublicKeyUrl.toString();
      try {
        A = await this.transporter.request({
          ...uD.RETRY_CONFIG,
          url: B
        })
      } catch (Q) {
        if (Q instanceof Error) Q.message = `Failed to retrieve verification certificates: ${Q.message}`;
        throw Q
      }
      return {
        pubkeys: A.data,
        res: A
      }
    }
    verifySignedJwtWithCerts() {
      throw new Error("verifySignedJwtWithCerts is removed, please use verifySignedJwtWithCertsAsync instead.")
    }
    async verifySignedJwtWithCertsAsync(A, B, Q, I, G) {
      let Z = Ar1.createCrypto();
      if (!G) G = uD.DEFAULT_MAX_TOKEN_LIFETIME_SECS_;
      let D = A.split(".");
      if (D.length !== 3) throw new Error("Wrong number of segments in token: " + A);
      let Y = D[0] + "." + D[1],
        W = D[2],
        J, F;
      try {
        J = JSON.parse(Z.decodeBase64StringUtf8(D[0]))
      } catch (O) {
        if (O instanceof Error) O.message = `Can't parse token envelope: ${D[0]}': ${O.message}`;
        throw O
      }
      if (!J) throw new Error("Can't parse token envelope: " + D[0]);
      try {
        F = JSON.parse(Z.decodeBase64StringUtf8(D[1]))
      } catch (O) {
        if (O instanceof Error) O.message = `Can't parse token payload '${D[0]}`;
        throw O
      }
      if (!F) throw new Error("Can't parse token payload: " + D[1]);
      if (!Object.prototype.hasOwnProperty.call(B, J.kid)) throw new Error("No pem found for envelope: " + JSON.stringify(J));
      let X = B[J.kid];
      if (J.alg === "ES256") W = iA5.joseToDer(W, "ES256").toString("base64");
      if (!await Z.verify(X, Y, W)) throw new Error("Invalid token signature: " + A);
      if (!F.iat) throw new Error("No issue time in token: " + JSON.stringify(F));
      if (!F.exp) throw new Error("No expiration time in token: " + JSON.stringify(F));
      let C = Number(F.iat);
      if (isNaN(C)) throw new Error("iat field using invalid format");
      let K = Number(F.exp);
      if (isNaN(K)) throw new Error("exp field using invalid format");
      let E = new Date().getTime() / 1000;
      if (K >= E + G) throw new Error("Expiration time too far in future: " + JSON.stringify(F));
      let N = C - uD.CLOCK_SKEW_SECS_,
        q = K + uD.CLOCK_SKEW_SECS_;
      if (E < N) throw new Error("Token used too early, " + E + " < " + N + ": " + JSON.stringify(F));
      if (E > q) throw new Error("Token used too late, " + E + " > " + q + ": " + JSON.stringify(F));
      if (I && I.indexOf(F.iss) < 0) throw new Error("Invalid issuer, expected one of [" + I + "], but got " + F.iss);
      if (typeof Q !== "undefined" && Q !== null) {
        let O = F.aud,
          R = !1;
        if (Q.constructor === Array) R = Q.indexOf(O) > -1;
        else R = O === Q;
        if (!R) throw new Error("Wrong recipient, payload audience != requiredAudience")
      }
      return new aA5.LoginTicket(J, F)
    }
    async processAndValidateRefreshHandler() {
      if (this.refreshHandler) {
        let A = await this.refreshHandler();
        if (!A.access_token) throw new Error("No access token is returned by the refreshHandler callback.");
        return A
      }
      return
    }
    isTokenExpiring() {
      let A = this.credentials.expiry_date;
      return A ? A <= new Date().getTime() + this.eagerRefreshThresholdMillis : !1
    }
  }
  dJ2.OAuth2Client = uD;
  uD.GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo";
  uD.CLOCK_SKEW_SECS_ = 300;
  uD.DEFAULT_MAX_TOKEN_LIFETIME_SECS_ = 86400
})
// @from(Start 6945511, End 6947779)
Br1 = z((lJ2) => {
  Object.defineProperty(lJ2, "__esModule", {
    value: !0
  });
  lJ2.Compute = void 0;
  var tA5 = NK(),
    pJ2 = Re(),
    eA5 = tj();
  class cJ2 extends eA5.OAuth2Client {
    constructor(A = {}) {
      super(A);
      this.credentials = {
        expiry_date: 1,
        refresh_token: "compute-placeholder"
      }, this.serviceAccountEmail = A.serviceAccountEmail || "default", this.scopes = Array.isArray(A.scopes) ? A.scopes : A.scopes ? [A.scopes] : []
    }
    async refreshTokenNoCache(A) {
      let B = `service-accounts/${this.serviceAccountEmail}/token`,
        Q;
      try {
        let G = {
          property: B
        };
        if (this.scopes.length > 0) G.params = {
          scopes: this.scopes.join(",")
        };
        Q = await pJ2.instance(G)
      } catch (G) {
        if (G instanceof tA5.GaxiosError) G.message = `Could not refresh access token: ${G.message}`, this.wrapError(G);
        throw G
      }
      let I = Q;
      if (Q && Q.expires_in) I.expiry_date = new Date().getTime() + Q.expires_in * 1000, delete I.expires_in;
      return this.emit("tokens", I), {
        tokens: I,
        res: null
      }
    }
    async fetchIdToken(A) {
      let B = `service-accounts/${this.serviceAccountEmail}/identity?format=full&audience=${A}`,
        Q;
      try {
        let I = {
          property: B
        };
        Q = await pJ2.instance(I)
      } catch (I) {
        if (I instanceof Error) I.message = `Could not fetch ID token: ${I.message}`;
        throw I
      }
      return Q
    }
    wrapError(A) {
      let B = A.response;
      if (B && B.status) {
        if (A.status = B.status, B.status === 403) A.message = "A Forbidden error was returned while attempting to retrieve an access token for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have the correct permission scopes specified: " + A.message;
        else if (B.status === 404) A.message = "A Not Found error was returned while attempting to retrieve an accesstoken for the Compute Engine built-in service account. This may be because the Compute Engine instance does not have any permission scopes specified: " + A.message
      }
    }
  }
  lJ2.Compute = cJ2
})
// @from(Start 6947785, End 6948730)
Qr1 = z((aJ2) => {
  Object.defineProperty(aJ2, "__esModule", {
    value: !0
  });
  aJ2.IdTokenClient = void 0;
  var A05 = tj();
  class nJ2 extends A05.OAuth2Client {
    constructor(A) {
      super(A);
      this.targetAudience = A.targetAudience, this.idTokenProvider = A.idTokenProvider
    }
    async getRequestMetadataAsync(A) {
      if (!this.credentials.id_token || !this.credentials.expiry_date || this.isTokenExpiring()) {
        let Q = await this.idTokenProvider.fetchIdToken(this.targetAudience);
        this.credentials = {
          id_token: Q,
          expiry_date: this.getIdTokenExpiryDate(Q)
        }
      }
      return {
        headers: {
          Authorization: "Bearer " + this.credentials.id_token
        }
      }
    }
    getIdTokenExpiryDate(A) {
      let B = A.split(".")[1];
      if (B) return JSON.parse(Buffer.from(B, "base64").toString("ascii")).exp * 1000
    }
  }
  aJ2.IdTokenClient = nJ2
})
// @from(Start 6948736, End 6950051)
Ir1 = z((oJ2) => {
  Object.defineProperty(oJ2, "__esModule", {
    value: !0
  });
  oJ2.GCPEnv = void 0;
  oJ2.clear = B05;
  oJ2.getEnv = Q05;
  var rJ2 = Re(),
    N$;
  (function(A) {
    A.APP_ENGINE = "APP_ENGINE", A.KUBERNETES_ENGINE = "KUBERNETES_ENGINE", A.CLOUD_FUNCTIONS = "CLOUD_FUNCTIONS", A.COMPUTE_ENGINE = "COMPUTE_ENGINE", A.CLOUD_RUN = "CLOUD_RUN", A.NONE = "NONE"
  })(N$ || (oJ2.GCPEnv = N$ = {}));
  var Se;

  function B05() {
    Se = void 0
  }
  async function Q05() {
    if (Se) return Se;
    return Se = I05(), Se
  }
  async function I05() {
    let A = N$.NONE;
    if (G05()) A = N$.APP_ENGINE;
    else if (Z05()) A = N$.CLOUD_FUNCTIONS;
    else if (await W05())
      if (await Y05()) A = N$.KUBERNETES_ENGINE;
      else if (D05()) A = N$.CLOUD_RUN;
    else A = N$.COMPUTE_ENGINE;
    else A = N$.NONE;
    return A
  }

  function G05() {
    return !!(process.env.GAE_SERVICE || process.env.GAE_MODULE_NAME)
  }

  function Z05() {
    return !!(process.env.FUNCTION_NAME || process.env.FUNCTION_TARGET)
  }

  function D05() {
    return !!process.env.K_CONFIGURATION
  }
  async function Y05() {
    try {
      return await rJ2.instance("attributes/cluster-name"), !0
    } catch (A) {
      return !1
    }
  }
  async function W05() {
    return rJ2.isAvailable()
  }
})
// @from(Start 6950057, End 6950983)
Gr1 = z((ku8, eJ2) => {
  var zC1 = Sd().Buffer,
    X05 = Z1("stream"),
    V05 = Z1("util");

  function wC1(A) {
    if (this.buffer = null, this.writable = !0, this.readable = !0, !A) return this.buffer = zC1.alloc(0), this;
    if (typeof A.pipe === "function") return this.buffer = zC1.alloc(0), A.pipe(this), this;
    if (A.length || typeof A === "object") return this.buffer = A, this.writable = !1, process.nextTick(function() {
      this.emit("end", A), this.readable = !1, this.emit("close")
    }.bind(this)), this;
    throw new TypeError("Unexpected data type (" + typeof A + ")")
  }
  V05.inherits(wC1, X05);
  wC1.prototype.write = function A(B) {
    this.buffer = zC1.concat([this.buffer, zC1.from(B)]), this.emit("data", B)
  };
  wC1.prototype.end = function A(B) {
    if (B) this.write(B);
    this.emit("end", B), this.emit("close"), this.writable = !1, this.readable = !1
  };
  eJ2.exports = wC1
})
// @from(Start 6950989, End 6951600)
BF2 = z((xu8, AF2) => {
  var _e = Z1("buffer").Buffer,
    Zr1 = Z1("buffer").SlowBuffer;
  AF2.exports = EC1;

  function EC1(A, B) {
    if (!_e.isBuffer(A) || !_e.isBuffer(B)) return !1;
    if (A.length !== B.length) return !1;
    var Q = 0;
    for (var I = 0; I < A.length; I++) Q |= A[I] ^ B[I];
    return Q === 0
  }
  EC1.install = function() {
    _e.prototype.equal = Zr1.prototype.equal = function A(B) {
      return EC1(this, B)
    }
  };
  var C05 = _e.prototype.equal,
    K05 = Zr1.prototype.equal;
  EC1.restore = function() {
    _e.prototype.equal = C05, Zr1.prototype.equal = K05
  }
})
// @from(Start 6951606, End 6955882)
Wr1 = z((fu8, FF2) => {
  var H05 = BF2(),
    yd = Sd().Buffer,
    ew = Z1("crypto"),
    IF2 = as1(),
    QF2 = Z1("util"),
    z05 = `"%s" is not a valid algorithm.
  Supported algorithms are:
  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".`,
    je = "secret must be a string or buffer",
    jd = "key must be a string or a buffer",
    w05 = "key must be a string, a buffer or an object",
    Dr1 = typeof ew.createPublicKey === "function";
  if (Dr1) jd += " or a KeyObject", je += "or a KeyObject";

  function GF2(A) {
    if (yd.isBuffer(A)) return;
    if (typeof A === "string") return;
    if (!Dr1) throw MK(jd);
    if (typeof A !== "object") throw MK(jd);
    if (typeof A.type !== "string") throw MK(jd);
    if (typeof A.asymmetricKeyType !== "string") throw MK(jd);
    if (typeof A.export !== "function") throw MK(jd)
  }

  function ZF2(A) {
    if (yd.isBuffer(A)) return;
    if (typeof A === "string") return;
    if (typeof A === "object") return;
    throw MK(w05)
  }

  function E05(A) {
    if (yd.isBuffer(A)) return;
    if (typeof A === "string") return A;
    if (!Dr1) throw MK(je);
    if (typeof A !== "object") throw MK(je);
    if (A.type !== "secret") throw MK(je);
    if (typeof A.export !== "function") throw MK(je)
  }

  function Yr1(A) {
    return A.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
  }

  function DF2(A) {
    A = A.toString();
    var B = 4 - A.length % 4;
    if (B !== 4)
      for (var Q = 0; Q < B; ++Q) A += "=";
    return A.replace(/\-/g, "+").replace(/_/g, "/")
  }

  function MK(A) {
    var B = [].slice.call(arguments, 1),
      Q = QF2.format.bind(QF2, A).apply(null, B);
    return new TypeError(Q)
  }

  function U05(A) {
    return yd.isBuffer(A) || typeof A === "string"
  }

  function ye(A) {
    if (!U05(A)) A = JSON.stringify(A);
    return A
  }

  function YF2(A) {
    return function B(Q, I) {
      E05(I), Q = ye(Q);
      var G = ew.createHmac("sha" + A, I),
        Z = (G.update(Q), G.digest("base64"));
      return Yr1(Z)
    }
  }

  function N05(A) {
    return function B(Q, I, G) {
      var Z = YF2(A)(Q, G);
      return H05(yd.from(I), yd.from(Z))
    }
  }

  function WF2(A) {
    return function B(Q, I) {
      ZF2(I), Q = ye(Q);
      var G = ew.createSign("RSA-SHA" + A),
        Z = (G.update(Q), G.sign(I, "base64"));
      return Yr1(Z)
    }
  }

  function JF2(A) {
    return function B(Q, I, G) {
      GF2(G), Q = ye(Q), I = DF2(I);
      var Z = ew.createVerify("RSA-SHA" + A);
      return Z.update(Q), Z.verify(G, I, "base64")
    }
  }

  function $05(A) {
    return function B(Q, I) {
      ZF2(I), Q = ye(Q);
      var G = ew.createSign("RSA-SHA" + A),
        Z = (G.update(Q), G.sign({
          key: I,
          padding: ew.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: ew.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
      return Yr1(Z)
    }
  }

  function q05(A) {
    return function B(Q, I, G) {
      GF2(G), Q = ye(Q), I = DF2(I);
      var Z = ew.createVerify("RSA-SHA" + A);
      return Z.update(Q), Z.verify({
        key: G,
        padding: ew.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: ew.constants.RSA_PSS_SALTLEN_DIGEST
      }, I, "base64")
    }
  }

  function M05(A) {
    var B = WF2(A);
    return function Q() {
      var I = B.apply(null, arguments);
      return I = IF2.derToJose(I, "ES" + A), I
    }
  }

  function L05(A) {
    var B = JF2(A);
    return function Q(I, G, Z) {
      G = IF2.joseToDer(G, "ES" + A).toString("base64");
      var D = B(I, G, Z);
      return D
    }
  }

  function R05() {
    return function A() {
      return ""
    }
  }

  function O05() {
    return function A(B, Q) {
      return Q === ""
    }
  }
  FF2.exports = function A(B) {
    var Q = {
        hs: YF2,
        rs: WF2,
        ps: $05,
        es: M05,
        none: R05
      },
      I = {
        hs: N05,
        rs: JF2,
        ps: q05,
        es: L05,
        none: O05
      },
      G = B.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
    if (!G) throw MK(z05, B);
    var Z = (G[1] || G[3]).toLowerCase(),
      D = G[2];
    return {
      sign: Q[Z](D),
      verify: I[Z](D)
    }
  }
})
// @from(Start 6955888, End 6956124)
Jr1 = z((vu8, XF2) => {
  var T05 = Z1("buffer").Buffer;
  XF2.exports = function A(B) {
    if (typeof B === "string") return B;
    if (typeof B === "number" || T05.isBuffer(B)) return B.toString();
    return JSON.stringify(B)
  }
})
// @from(Start 6956130, End 6957737)
wF2 = z((bu8, zF2) => {
  var P05 = Sd().Buffer,
    VF2 = Gr1(),
    S05 = Wr1(),
    _05 = Z1("stream"),
    CF2 = Jr1(),
    Fr1 = Z1("util");

  function KF2(A, B) {
    return P05.from(A, B).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
  }

  function j05(A, B, Q) {
    Q = Q || "utf8";
    var I = KF2(CF2(A), "binary"),
      G = KF2(CF2(B), Q);
    return Fr1.format("%s.%s", I, G)
  }

  function HF2(A) {
    var {
      header: B,
      payload: Q
    } = A, I = A.secret || A.privateKey, G = A.encoding, Z = S05(B.alg), D = j05(B, Q, G), Y = Z.sign(D, I);
    return Fr1.format("%s.%s", D, Y)
  }

  function UC1(A) {
    var B = A.secret || A.privateKey || A.key,
      Q = new VF2(B);
    this.readable = !0, this.header = A.header, this.encoding = A.encoding, this.secret = this.privateKey = this.key = Q, this.payload = new VF2(A.payload), this.secret.once("close", function() {
      if (!this.payload.writable && this.readable) this.sign()
    }.bind(this)), this.payload.once("close", function() {
      if (!this.secret.writable && this.readable) this.sign()
    }.bind(this))
  }
  Fr1.inherits(UC1, _05);
  UC1.prototype.sign = function A() {
    try {
      var B = HF2({
        header: this.header,
        payload: this.payload.buffer,
        secret: this.secret.buffer,
        encoding: this.encoding
      });
      return this.emit("done", B), this.emit("data", B), this.emit("end"), this.readable = !1, B
    } catch (Q) {
      this.readable = !1, this.emit("error", Q), this.emit("close")
    }
  };
  UC1.sign = HF2;
  zF2.exports = UC1
})
// @from(Start 6957743, End 6960150)
TF2 = z((gu8, OF2) => {
  var UF2 = Sd().Buffer,
    EF2 = Gr1(),
    y05 = Wr1(),
    k05 = Z1("stream"),
    NF2 = Jr1(),
    x05 = Z1("util"),
    f05 = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

  function v05(A) {
    return Object.prototype.toString.call(A) === "[object Object]"
  }

  function b05(A) {
    if (v05(A)) return A;
    try {
      return JSON.parse(A)
    } catch (B) {
      return
    }
  }

  function $F2(A) {
    var B = A.split(".", 1)[0];
    return b05(UF2.from(B, "base64").toString("binary"))
  }

  function g05(A) {
    return A.split(".", 2).join(".")
  }

  function qF2(A) {
    return A.split(".")[2]
  }

  function h05(A, B) {
    B = B || "utf8";
    var Q = A.split(".")[1];
    return UF2.from(Q, "base64").toString(B)
  }

  function MF2(A) {
    return f05.test(A) && !!$F2(A)
  }

  function LF2(A, B, Q) {
    if (!B) {
      var I = new Error("Missing algorithm parameter for jws.verify");
      throw I.code = "MISSING_ALGORITHM", I
    }
    A = NF2(A);
    var G = qF2(A),
      Z = g05(A),
      D = y05(B);
    return D.verify(Z, G, Q)
  }

  function RF2(A, B) {
    if (B = B || {}, A = NF2(A), !MF2(A)) return null;
    var Q = $F2(A);
    if (!Q) return null;
    var I = h05(A);
    if (Q.typ === "JWT" || B.json) I = JSON.parse(I, B.encoding);
    return {
      header: Q,
      payload: I,
      signature: qF2(A)
    }
  }

  function kd(A) {
    A = A || {};
    var B = A.secret || A.publicKey || A.key,
      Q = new EF2(B);
    this.readable = !0, this.algorithm = A.algorithm, this.encoding = A.encoding, this.secret = this.publicKey = this.key = Q, this.signature = new EF2(A.signature), this.secret.once("close", function() {
      if (!this.signature.writable && this.readable) this.verify()
    }.bind(this)), this.signature.once("close", function() {
      if (!this.secret.writable && this.readable) this.verify()
    }.bind(this))
  }
  x05.inherits(kd, k05);
  kd.prototype.verify = function A() {
    try {
      var B = LF2(this.signature.buffer, this.algorithm, this.key.buffer),
        Q = RF2(this.signature.buffer, this.encoding);
      return this.emit("done", B, Q), this.emit("data", B), this.emit("end"), this.readable = !1, B
    } catch (I) {
      this.readable = !1, this.emit("error", I), this.emit("close")
    }
  };
  kd.decode = RF2;
  kd.isValid = MF2;
  kd.verify = LF2;
  OF2.exports = kd
})
// @from(Start 6960156, End 6960588)
Xr1 = z((d05) => {
  var PF2 = wF2(),
    NC1 = TF2(),
    m05 = ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512"];
  d05.ALGORITHMS = m05;
  d05.sign = PF2.sign;
  d05.verify = NC1.verify;
  d05.decode = NC1.decode;
  d05.isValid = NC1.isValid;
  d05.createSign = function A(B) {
    return new PF2(B)
  };
  d05.createVerify = function A(B) {
    return new NC1(B)
  }
})
// @from(Start 6960594, End 6967714)
bF2 = z((zO) => {
  var LK = zO && zO.__classPrivateFieldGet || function(A, B, Q, I) {
      if (Q === "a" && !I) throw new TypeError("Private accessor was defined without a getter");
      if (typeof B === "function" ? A !== B || !I : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Q === "m" ? I : Q === "a" ? I.call(A) : I ? I.value : B.get(A)
    },
    SF2 = zO && zO.__classPrivateFieldSet || function(A, B, Q, I, G) {
      if (I === "m") throw new TypeError("Private method is not writable");
      if (I === "a" && !G) throw new TypeError("Private accessor was defined without a setter");
      if (typeof B === "function" ? A !== B || !G : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return I === "a" ? G.call(A, Q) : G ? G.value = Q : B.set(A, Q), Q
    },
    RK, xd, Vr1, _F2, jF2, Cr1, Kr1, yF2;
  Object.defineProperty(zO, "__esModule", {
    value: !0
  });
  zO.GoogleToken = void 0;
  var kF2 = Z1("fs"),
    s05 = NK(),
    r05 = Xr1(),
    o05 = Z1("path"),
    t05 = Z1("util"),
    xF2 = kF2.readFile ? t05.promisify(kF2.readFile) : async () => {
      throw new fd("use key rather than keyFile.", "MISSING_CREDENTIALS")
    }, fF2 = "https://www.googleapis.com/oauth2/v4/token", e05 = "https://accounts.google.com/o/oauth2/revoke?token=";
  class fd extends Error {
    constructor(A, B) {
      super(A);
      this.code = B
    }
  }
  class vF2 {
    get accessToken() {
      return this.rawToken ? this.rawToken.access_token : void 0
    }
    get idToken() {
      return this.rawToken ? this.rawToken.id_token : void 0
    }
    get tokenType() {
      return this.rawToken ? this.rawToken.token_type : void 0
    }
    get refreshToken() {
      return this.rawToken ? this.rawToken.refresh_token : void 0
    }
    constructor(A) {
      RK.add(this), this.transporter = {
        request: (B) => s05.request(B)
      }, xd.set(this, void 0), LK(this, RK, "m", Kr1).call(this, A)
    }
    hasExpired() {
      let A = new Date().getTime();
      if (this.rawToken && this.expiresAt) return A >= this.expiresAt;
      else return !0
    }
    isTokenExpiring() {
      var A;
      let B = new Date().getTime(),
        Q = (A = this.eagerRefreshThresholdMillis) !== null && A !== void 0 ? A : 0;
      if (this.rawToken && this.expiresAt) return this.expiresAt <= B + Q;
      else return !0
    }
    getToken(A, B = {}) {
      if (typeof A === "object") B = A, A = void 0;
      if (B = Object.assign({
          forceRefresh: !1
        }, B), A) {
        let Q = A;
        LK(this, RK, "m", Vr1).call(this, B).then((I) => Q(null, I), A);
        return
      }
      return LK(this, RK, "m", Vr1).call(this, B)
    }
    async getCredentials(A) {
      switch (o05.extname(A)) {
        case ".json": {
          let Q = await xF2(A, "utf8"),
            I = JSON.parse(Q),
            G = I.private_key,
            Z = I.client_email;
          if (!G || !Z) throw new fd("private_key and client_email are required.", "MISSING_CREDENTIALS");
          return {
            privateKey: G,
            clientEmail: Z
          }
        }
        case ".der":
        case ".crt":
        case ".pem":
          return {
            privateKey: await xF2(A, "utf8")
          };
        case ".p12":
        case ".pfx":
          throw new fd("*.p12 certificates are not supported after v6.1.2. Consider utilizing *.json format or converting *.p12 to *.pem using the OpenSSL CLI.", "UNKNOWN_CERTIFICATE_TYPE");
        default:
          throw new fd("Unknown certificate type. Type is determined based on file extension. Current supported extensions are *.json, and *.pem.", "UNKNOWN_CERTIFICATE_TYPE")
      }
    }
    revokeToken(A) {
      if (A) {
        LK(this, RK, "m", Cr1).call(this).then(() => A(), A);
        return
      }
      return LK(this, RK, "m", Cr1).call(this)
    }
  }
  zO.GoogleToken = vF2;
  xd = new WeakMap, RK = new WeakSet, Vr1 = async function A(B) {
    if (LK(this, xd, "f") && !B.forceRefresh) return LK(this, xd, "f");
    try {
      return await SF2(this, xd, LK(this, RK, "m", _F2).call(this, B), "f")
    } finally {
      SF2(this, xd, void 0, "f")
    }
  }, _F2 = async function A(B) {
    if (this.isTokenExpiring() === !1 && B.forceRefresh === !1) return Promise.resolve(this.rawToken);
    if (!this.key && !this.keyFile) throw new Error("No key or keyFile set.");
    if (!this.key && this.keyFile) {
      let Q = await this.getCredentials(this.keyFile);
      if (this.key = Q.privateKey, this.iss = Q.clientEmail || this.iss, !Q.clientEmail) LK(this, RK, "m", jF2).call(this)
    }
    return LK(this, RK, "m", yF2).call(this)
  }, jF2 = function A() {
    if (!this.iss) throw new fd("email is required.", "MISSING_CREDENTIALS")
  }, Cr1 = async function A() {
    if (!this.accessToken) throw new Error("No token to revoke.");
    let B = e05 + this.accessToken;
    await this.transporter.request({
      url: B,
      retry: !0
    }), LK(this, RK, "m", Kr1).call(this, {
      email: this.iss,
      sub: this.sub,
      key: this.key,
      keyFile: this.keyFile,
      scope: this.scope,
      additionalClaims: this.additionalClaims
    })
  }, Kr1 = function A(B = {}) {
    if (this.keyFile = B.keyFile, this.key = B.key, this.rawToken = void 0, this.iss = B.email || B.iss, this.sub = B.sub, this.additionalClaims = B.additionalClaims, typeof B.scope === "object") this.scope = B.scope.join(" ");
    else this.scope = B.scope;
    if (this.eagerRefreshThresholdMillis = B.eagerRefreshThresholdMillis, B.transporter) this.transporter = B.transporter
  }, yF2 = async function A() {
    var B, Q;
    let I = Math.floor(new Date().getTime() / 1000),
      G = this.additionalClaims || {},
      Z = Object.assign({
        iss: this.iss,
        scope: this.scope,
        aud: fF2,
        exp: I + 3600,
        iat: I,
        sub: this.sub
      }, G),
      D = r05.sign({
        header: {
          alg: "RS256"
        },
        payload: Z,
        secret: this.key
      });
    try {
      let Y = await this.transporter.request({
        method: "POST",
        url: fF2,
        data: {
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: D
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        responseType: "json",
        retryConfig: {
          httpMethodsToRetry: ["POST"]
        }
      });
      return this.rawToken = Y.data, this.expiresAt = Y.data.expires_in === null || Y.data.expires_in === void 0 ? void 0 : (I + Y.data.expires_in) * 1000, this.rawToken
    } catch (Y) {
      this.rawToken = void 0, this.tokenExpires = void 0;
      let W = Y.response && ((B = Y.response) === null || B === void 0 ? void 0 : B.data) ? (Q = Y.response) === null || Q === void 0 ? void 0 : Q.data : {};
      if (W.error) {
        let J = W.error_description ? `: ${W.error_description}` : "";
        Y.message = `${W.error}${J}`
      }
      throw Y
    }
  }
})
// @from(Start 6967720, End 6970727)
zr1 = z((hF2) => {
  Object.defineProperty(hF2, "__esModule", {
    value: !0
  });
  hF2.JWTAccess = void 0;
  var A25 = Xr1(),
    B25 = HO(),
    gF2 = {
      alg: "RS256",
      typ: "JWT"
    };
  class Hr1 {
    constructor(A, B, Q, I) {
      this.cache = new B25.LRUCache({
        capacity: 500,
        maxAge: 3600000
      }), this.email = A, this.key = B, this.keyId = Q, this.eagerRefreshThresholdMillis = I !== null && I !== void 0 ? I : 300000
    }
    getCachedKey(A, B) {
      let Q = A;
      if (B && Array.isArray(B) && B.length) Q = A ? `${A}_${B.join("_")}` : `${B.join("_")}`;
      else if (typeof B === "string") Q = A ? `${A}_${B}` : B;
      if (!Q) throw Error("Scopes or url must be provided");
      return Q
    }
    getRequestHeaders(A, B, Q) {
      let I = this.getCachedKey(A, Q),
        G = this.cache.get(I),
        Z = Date.now();
      if (G && G.expiration - Z > this.eagerRefreshThresholdMillis) return G.headers;
      let D = Math.floor(Date.now() / 1000),
        Y = Hr1.getExpirationTime(D),
        W;
      if (Array.isArray(Q)) Q = Q.join(" ");
      if (Q) W = {
        iss: this.email,
        sub: this.email,
        scope: Q,
        exp: Y,
        iat: D
      };
      else W = {
        iss: this.email,
        sub: this.email,
        aud: A,
        exp: Y,
        iat: D
      };
      if (B) {
        for (let C in W)
          if (B[C]) throw new Error(`The '${C}' property is not allowed when passing additionalClaims. This claim is included in the JWT by default.`)
      }
      let J = this.keyId ? {
          ...gF2,
          kid: this.keyId
        } : gF2,
        F = Object.assign(W, B),
        V = {
          Authorization: `Bearer ${A25.sign({header:J,payload:F,secret:this.key})}`
        };
      return this.cache.set(I, {
        expiration: Y * 1000,
        headers: V
      }), V
    }
    static getExpirationTime(A) {
      return A + 3600
    }
    fromJSON(A) {
      if (!A) throw new Error("Must pass in a JSON object containing the service account auth settings.");
      if (!A.client_email) throw new Error("The incoming JSON object does not contain a client_email field");
      if (!A.private_key) throw new Error("The incoming JSON object does not contain a private_key field");
      this.email = A.client_email, this.key = A.private_key, this.keyId = A.private_key_id, this.projectId = A.project_id
    }
    fromStream(A, B) {
      if (B) this.fromStreamAsync(A).then(() => B(), B);
      else return this.fromStreamAsync(A)
    }
    fromStreamAsync(A) {
      return new Promise((B, Q) => {
        if (!A) Q(new Error("Must pass in a stream containing the service account auth settings."));
        let I = "";
        A.setEncoding("utf8").on("data", (G) => I += G).on("error", Q).on("end", () => {
          try {
            let G = JSON.parse(I);
            this.fromJSON(G), B()
          } catch (G) {
            Q(G)
          }
        })
      })
    }
  }
  hF2.JWTAccess = Hr1
})
// @from(Start 6970733, End 6976804)
Er1 = z((uF2) => {
  Object.defineProperty(uF2, "__esModule", {
    value: !0
  });
  uF2.JWT = void 0;
  var dF2 = bF2(),
    Q25 = zr1(),
    I25 = tj(),
    $C1 = tw();
  class wr1 extends I25.OAuth2Client {
    constructor(A, B, Q, I, G, Z) {
      let D = A && typeof A === "object" ? A : {
        email: A,
        keyFile: B,
        key: Q,
        keyId: Z,
        scopes: I,
        subject: G
      };
      super(D);
      this.email = D.email, this.keyFile = D.keyFile, this.key = D.key, this.keyId = D.keyId, this.scopes = D.scopes, this.subject = D.subject, this.additionalClaims = D.additionalClaims, this.credentials = {
        refresh_token: "jwt-placeholder",
        expiry_date: 1
      }
    }
    createScoped(A) {
      let B = new wr1(this);
      return B.scopes = A, B
    }
    async getRequestMetadataAsync(A) {
      A = this.defaultServicePath ? `https://${this.defaultServicePath}/` : A;
      let B = !this.hasUserScopes() && A || this.useJWTAccessWithScope && this.hasAnyScopes() || this.universeDomain !== $C1.DEFAULT_UNIVERSE;
      if (this.subject && this.universeDomain !== $C1.DEFAULT_UNIVERSE) throw new RangeError(`Service Account user is configured for the credential. Domain-wide delegation is not supported in universes other than ${$C1.DEFAULT_UNIVERSE}`);
      if (!this.apiKey && B)
        if (this.additionalClaims && this.additionalClaims.target_audience) {
          let {
            tokens: Q
          } = await this.refreshToken();
          return {
            headers: this.addSharedMetadataHeaders({
              Authorization: `Bearer ${Q.id_token}`
            })
          }
        } else {
          if (!this.access) this.access = new Q25.JWTAccess(this.email, this.key, this.keyId, this.eagerRefreshThresholdMillis);
          let Q;
          if (this.hasUserScopes()) Q = this.scopes;
          else if (!A) Q = this.defaultScopes;
          let I = this.useJWTAccessWithScope || this.universeDomain !== $C1.DEFAULT_UNIVERSE,
            G = await this.access.getRequestHeaders(A !== null && A !== void 0 ? A : void 0, this.additionalClaims, I ? Q : void 0);
          return {
            headers: this.addSharedMetadataHeaders(G)
          }
        }
      else if (this.hasAnyScopes() || this.apiKey) return super.getRequestMetadataAsync(A);
      else return {
        headers: {}
      }
    }
    async fetchIdToken(A) {
      let B = new dF2.GoogleToken({
        iss: this.email,
        sub: this.subject,
        scope: this.scopes || this.defaultScopes,
        keyFile: this.keyFile,
        key: this.key,
        additionalClaims: {
          target_audience: A
        },
        transporter: this.transporter
      });
      if (await B.getToken({
          forceRefresh: !0
        }), !B.idToken) throw new Error("Unknown error: Failed to fetch ID token");
      return B.idToken
    }
    hasUserScopes() {
      if (!this.scopes) return !1;
      return this.scopes.length > 0
    }
    hasAnyScopes() {
      if (this.scopes && this.scopes.length > 0) return !0;
      if (this.defaultScopes && this.defaultScopes.length > 0) return !0;
      return !1
    }
    authorize(A) {
      if (A) this.authorizeAsync().then((B) => A(null, B), A);
      else return this.authorizeAsync()
    }
    async authorizeAsync() {
      let A = await this.refreshToken();
      if (!A) throw new Error("No result returned");
      return this.credentials = A.tokens, this.credentials.refresh_token = "jwt-placeholder", this.key = this.gtoken.key, this.email = this.gtoken.iss, A.tokens
    }
    async refreshTokenNoCache(A) {
      let B = this.createGToken(),
        I = {
          access_token: (await B.getToken({
            forceRefresh: this.isTokenExpiring()
          })).access_token,
          token_type: "Bearer",
          expiry_date: B.expiresAt,
          id_token: B.idToken
        };
      return this.emit("tokens", I), {
        res: null,
        tokens: I
      }
    }
    createGToken() {
      if (!this.gtoken) this.gtoken = new dF2.GoogleToken({
        iss: this.email,
        sub: this.subject,
        scope: this.scopes || this.defaultScopes,
        keyFile: this.keyFile,
        key: this.key,
        additionalClaims: this.additionalClaims,
        transporter: this.transporter
      });
      return this.gtoken
    }
    fromJSON(A) {
      if (!A) throw new Error("Must pass in a JSON object containing the service account auth settings.");
      if (!A.client_email) throw new Error("The incoming JSON object does not contain a client_email field");
      if (!A.private_key) throw new Error("The incoming JSON object does not contain a private_key field");
      this.email = A.client_email, this.key = A.private_key, this.keyId = A.private_key_id, this.projectId = A.project_id, this.quotaProjectId = A.quota_project_id, this.universeDomain = A.universe_domain || this.universeDomain
    }
    fromStream(A, B) {
      if (B) this.fromStreamAsync(A).then(() => B(), B);
      else return this.fromStreamAsync(A)
    }
    fromStreamAsync(A) {
      return new Promise((B, Q) => {
        if (!A) throw new Error("Must pass in a stream containing the service account auth settings.");
        let I = "";
        A.setEncoding("utf8").on("error", Q).on("data", (G) => I += G).on("end", () => {
          try {
            let G = JSON.parse(I);
            this.fromJSON(G), B()
          } catch (G) {
            Q(G)
          }
        })
      })
    }
    fromAPIKey(A) {
      if (typeof A !== "string") throw new Error("Must provide an API Key string.");
      this.apiKey = A
    }
    async getCredentials() {
      if (this.key) return {
        private_key: this.key,
        client_email: this.email
      };
      else if (this.keyFile) {
        let B = await this.createGToken().getCredentials(this.keyFile);
        return {
          private_key: B.privateKey,
          client_email: B.clientEmail
        }
      }
      throw new Error("A key or a keyFile must be provided to getCredentials.")
    }
  }
  uF2.JWT = wr1
})
// @from(Start 6976810, End 6979617)
Ur1 = z((cF2) => {
  Object.defineProperty(cF2, "__esModule", {
    value: !0
  });
  cF2.UserRefreshClient = cF2.USER_REFRESH_ACCOUNT_TYPE = void 0;
  var G25 = tj(),
    Z25 = Z1("querystring");
  cF2.USER_REFRESH_ACCOUNT_TYPE = "authorized_user";
  class qC1 extends G25.OAuth2Client {
    constructor(A, B, Q, I, G) {
      let Z = A && typeof A === "object" ? A : {
        clientId: A,
        clientSecret: B,
        refreshToken: Q,
        eagerRefreshThresholdMillis: I,
        forceRefreshOnFailure: G
      };
      super(Z);
      this._refreshToken = Z.refreshToken, this.credentials.refresh_token = Z.refreshToken
    }
    async refreshTokenNoCache(A) {
      return super.refreshTokenNoCache(this._refreshToken)
    }
    async fetchIdToken(A) {
      return (await this.transporter.request({
        ...qC1.RETRY_CONFIG,
        url: this.endpoints.oauth2TokenUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: Z25.stringify({
          client_id: this._clientId,
          client_secret: this._clientSecret,
          grant_type: "refresh_token",
          refresh_token: this._refreshToken,
          target_audience: A
        })
      })).data.id_token
    }
    fromJSON(A) {
      if (!A) throw new Error("Must pass in a JSON object containing the user refresh token");
      if (A.type !== "authorized_user") throw new Error('The incoming JSON object does not have the "authorized_user" type');
      if (!A.client_id) throw new Error("The incoming JSON object does not contain a client_id field");
      if (!A.client_secret) throw new Error("The incoming JSON object does not contain a client_secret field");
      if (!A.refresh_token) throw new Error("The incoming JSON object does not contain a refresh_token field");
      this._clientId = A.client_id, this._clientSecret = A.client_secret, this._refreshToken = A.refresh_token, this.credentials.refresh_token = A.refresh_token, this.quotaProjectId = A.quota_project_id, this.universeDomain = A.universe_domain || this.universeDomain
    }
    fromStream(A, B) {
      if (B) this.fromStreamAsync(A).then(() => B(), B);
      else return this.fromStreamAsync(A)
    }
    async fromStreamAsync(A) {
      return new Promise((B, Q) => {
        if (!A) return Q(new Error("Must pass in a stream containing the user refresh token."));
        let I = "";
        A.setEncoding("utf8").on("error", Q).on("data", (G) => I += G).on("end", () => {
          try {
            let G = JSON.parse(I);
            return this.fromJSON(G), B()
          } catch (G) {
            return Q(G)
          }
        })
      })
    }
    static fromJSON(A) {
      let B = new qC1;
      return B.fromJSON(A), B
    }
  }
  cF2.UserRefreshClient = qC1
})
// @from(Start 6979623, End 6983719)
Nr1 = z((nF2) => {
  Object.defineProperty(nF2, "__esModule", {
    value: !0
  });
  nF2.Impersonated = nF2.IMPERSONATED_ACCOUNT_TYPE = void 0;
  var iF2 = tj(),
    Y25 = NK(),
    W25 = HO();
  nF2.IMPERSONATED_ACCOUNT_TYPE = "impersonated_service_account";
  class ke extends iF2.OAuth2Client {
    constructor(A = {}) {
      var B, Q, I, G, Z, D;
      super(A);
      if (this.credentials = {
          expiry_date: 1,
          refresh_token: "impersonated-placeholder"
        }, this.sourceClient = (B = A.sourceClient) !== null && B !== void 0 ? B : new iF2.OAuth2Client, this.targetPrincipal = (Q = A.targetPrincipal) !== null && Q !== void 0 ? Q : "", this.delegates = (I = A.delegates) !== null && I !== void 0 ? I : [], this.targetScopes = (G = A.targetScopes) !== null && G !== void 0 ? G : [], this.lifetime = (Z = A.lifetime) !== null && Z !== void 0 ? Z : 3600, !W25.originalOrCamelOptions(A).get("universe_domain")) this.universeDomain = this.sourceClient.universeDomain;
      else if (this.sourceClient.universeDomain !== this.universeDomain) throw new RangeError(`Universe domain ${this.sourceClient.universeDomain} in source credentials does not match ${this.universeDomain} universe domain set for impersonated credentials.`);
      this.endpoint = (D = A.endpoint) !== null && D !== void 0 ? D : `https://iamcredentials.${this.universeDomain}`
    }
    async sign(A) {
      await this.sourceClient.getAccessToken();
      let B = `projects/-/serviceAccounts/${this.targetPrincipal}`,
        Q = `${this.endpoint}/v1/${B}:signBlob`,
        I = {
          delegates: this.delegates,
          payload: Buffer.from(A).toString("base64")
        };
      return (await this.sourceClient.request({
        ...ke.RETRY_CONFIG,
        url: Q,
        data: I,
        method: "POST"
      })).data
    }
    getTargetPrincipal() {
      return this.targetPrincipal
    }
    async refreshToken() {
      var A, B, Q, I, G, Z;
      try {
        await this.sourceClient.getAccessToken();
        let D = "projects/-/serviceAccounts/" + this.targetPrincipal,
          Y = `${this.endpoint}/v1/${D}:generateAccessToken`,
          W = {
            delegates: this.delegates,
            scope: this.targetScopes,
            lifetime: this.lifetime + "s"
          },
          J = await this.sourceClient.request({
            ...ke.RETRY_CONFIG,
            url: Y,
            data: W,
            method: "POST"
          }),
          F = J.data;
        return this.credentials.access_token = F.accessToken, this.credentials.expiry_date = Date.parse(F.expireTime), {
          tokens: this.credentials,
          res: J
        }
      } catch (D) {
        if (!(D instanceof Error)) throw D;
        let Y = 0,
          W = "";
        if (D instanceof Y25.GaxiosError) Y = (Q = (B = (A = D === null || D === void 0 ? void 0 : D.response) === null || A === void 0 ? void 0 : A.data) === null || B === void 0 ? void 0 : B.error) === null || Q === void 0 ? void 0 : Q.status, W = (Z = (G = (I = D === null || D === void 0 ? void 0 : D.response) === null || I === void 0 ? void 0 : I.data) === null || G === void 0 ? void 0 : G.error) === null || Z === void 0 ? void 0 : Z.message;
        if (Y && W) throw D.message = `${Y}: unable to impersonate: ${W}`, D;
        else throw D.message = `unable to impersonate: ${D}`, D
      }
    }
    async fetchIdToken(A, B) {
      var Q, I;
      await this.sourceClient.getAccessToken();
      let G = `projects/-/serviceAccounts/${this.targetPrincipal}`,
        Z = `${this.endpoint}/v1/${G}:generateIdToken`,
        D = {
          delegates: this.delegates,
          audience: A,
          includeEmail: (Q = B === null || B === void 0 ? void 0 : B.includeEmail) !== null && Q !== void 0 ? Q : !0,
          useEmailAzp: (I = B === null || B === void 0 ? void 0 : B.includeEmail) !== null && I !== void 0 ? I : !0
        };
      return (await this.sourceClient.request({
        ...ke.RETRY_CONFIG,
        url: Z,
        data: D,
        method: "POST"
      })).data.token
    }
  }
  nF2.Impersonated = ke
})
// @from(Start 6983725, End 6986947)
$r1 = z((oF2) => {
  Object.defineProperty(oF2, "__esModule", {
    value: !0
  });
  oF2.OAuthClientAuthHandler = void 0;
  oF2.getErrorFromOAuthErrorResponse = V25;
  var sF2 = Z1("querystring"),
    F25 = Td(),
    X25 = ["PUT", "POST", "PATCH"];
  class rF2 {
    constructor(A) {
      this.clientAuthentication = A, this.crypto = F25.createCrypto()
    }
    applyClientAuthenticationOptions(A, B) {
      if (this.injectAuthenticatedHeaders(A, B), !B) this.injectAuthenticatedRequestBody(A)
    }
    injectAuthenticatedHeaders(A, B) {
      var Q;
      if (B) A.headers = A.headers || {}, Object.assign(A.headers, {
        Authorization: `Bearer ${B}}`
      });
      else if (((Q = this.clientAuthentication) === null || Q === void 0 ? void 0 : Q.confidentialClientType) === "basic") {
        A.headers = A.headers || {};
        let I = this.clientAuthentication.clientId,
          G = this.clientAuthentication.clientSecret || "",
          Z = this.crypto.encodeBase64StringUtf8(`${I}:${G}`);
        Object.assign(A.headers, {
          Authorization: `Basic ${Z}`
        })
      }
    }
    injectAuthenticatedRequestBody(A) {
      var B;
      if (((B = this.clientAuthentication) === null || B === void 0 ? void 0 : B.confidentialClientType) === "request-body") {
        let Q = (A.method || "GET").toUpperCase();
        if (X25.indexOf(Q) !== -1) {
          let I, G = A.headers || {};
          for (let Z in G)
            if (Z.toLowerCase() === "content-type" && G[Z]) {
              I = G[Z].toLowerCase();
              break
            } if (I === "application/x-www-form-urlencoded") {
            A.data = A.data || "";
            let Z = sF2.parse(A.data);
            Object.assign(Z, {
              client_id: this.clientAuthentication.clientId,
              client_secret: this.clientAuthentication.clientSecret || ""
            }), A.data = sF2.stringify(Z)
          } else if (I === "application/json") A.data = A.data || {}, Object.assign(A.data, {
            client_id: this.clientAuthentication.clientId,
            client_secret: this.clientAuthentication.clientSecret || ""
          });
          else throw new Error(`${I} content-types are not supported with ${this.clientAuthentication.confidentialClientType} client authentication`)
        } else throw new Error(`${Q} HTTP method does not support ${this.clientAuthentication.confidentialClientType} client authentication`)
      }
    }
    static get RETRY_CONFIG() {
      return {
        retry: !0,
        retryConfig: {
          httpMethodsToRetry: ["GET", "PUT", "POST", "HEAD", "OPTIONS", "DELETE"]
        }
      }
    }
  }
  oF2.OAuthClientAuthHandler = rF2;

  function V25(A, B) {
    let {
      error: Q,
      error_description: I,
      error_uri: G
    } = A, Z = `Error code ${Q}`;
    if (typeof I !== "undefined") Z += `: ${I}`;
    if (typeof G !== "undefined") Z += ` - ${G}`;
    let D = new Error(Z);
    if (B) {
      let Y = Object.keys(B);
      if (B.stack) Y.push("stack");
      Y.forEach((W) => {
        if (W !== "message") Object.defineProperty(D, W, {
          value: B[W],
          writable: !1,
          enumerable: !0
        })
      })
    }
    return D
  }
})
// @from(Start 6986953, End 6988739)
Mr1 = z((AX2) => {
  Object.defineProperty(AX2, "__esModule", {
    value: !0
  });
  AX2.StsCredentials = void 0;
  var K25 = NK(),
    H25 = Z1("querystring"),
    z25 = Te(),
    eF2 = $r1();
  class qr1 extends eF2.OAuthClientAuthHandler {
    constructor(A, B) {
      super(B);
      this.tokenExchangeEndpoint = A, this.transporter = new z25.DefaultTransporter
    }
    async exchangeToken(A, B, Q) {
      var I, G, Z;
      let D = {
        grant_type: A.grantType,
        resource: A.resource,
        audience: A.audience,
        scope: (I = A.scope) === null || I === void 0 ? void 0 : I.join(" "),
        requested_token_type: A.requestedTokenType,
        subject_token: A.subjectToken,
        subject_token_type: A.subjectTokenType,
        actor_token: (G = A.actingParty) === null || G === void 0 ? void 0 : G.actorToken,
        actor_token_type: (Z = A.actingParty) === null || Z === void 0 ? void 0 : Z.actorTokenType,
        options: Q && JSON.stringify(Q)
      };
      Object.keys(D).forEach((J) => {
        if (typeof D[J] === "undefined") delete D[J]
      });
      let Y = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      Object.assign(Y, B || {});
      let W = {
        ...qr1.RETRY_CONFIG,
        url: this.tokenExchangeEndpoint.toString(),
        method: "POST",
        headers: Y,
        data: H25.stringify(D),
        responseType: "json"
      };
      this.applyClientAuthenticationOptions(W);
      try {
        let J = await this.transporter.request(W),
          F = J.data;
        return F.res = J, F
      } catch (J) {
        if (J instanceof K25.GaxiosError && J.response) throw eF2.getErrorFromOAuthErrorResponse(J.response.data, J);
        throw J
      }
    }
  }
  AX2.StsCredentials = qr1
})
// @from(Start 6988745, End 6998296)
wO = z((xI) => {
  var Lr1 = xI && xI.__classPrivateFieldGet || function(A, B, Q, I) {
      if (Q === "a" && !I) throw new TypeError("Private accessor was defined without a getter");
      if (typeof B === "function" ? A !== B || !I : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Q === "m" ? I : Q === "a" ? I.call(A) : I ? I.value : B.get(A)
    },
    QX2 = xI && xI.__classPrivateFieldSet || function(A, B, Q, I, G) {
      if (I === "m") throw new TypeError("Private method is not writable");
      if (I === "a" && !G) throw new TypeError("Private accessor was defined without a setter");
      if (typeof B === "function" ? A !== B || !G : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return I === "a" ? G.call(A, Q) : G ? G.value = Q : B.set(A, Q), Q
    },
    Rr1, vd, GX2;
  Object.defineProperty(xI, "__esModule", {
    value: !0
  });
  xI.BaseExternalAccountClient = xI.DEFAULT_UNIVERSE = xI.CLOUD_RESOURCE_MANAGER = xI.EXTERNAL_ACCOUNT_TYPE = xI.EXPIRATION_TIME_OFFSET = void 0;
  var w25 = Z1("stream"),
    E25 = tw(),
    U25 = Mr1(),
    IX2 = HO(),
    N25 = "urn:ietf:params:oauth:grant-type:token-exchange",
    $25 = "urn:ietf:params:oauth:token-type:access_token",
    Or1 = "https://www.googleapis.com/auth/cloud-platform",
    q25 = 3600;
  xI.EXPIRATION_TIME_OFFSET = 300000;
  xI.EXTERNAL_ACCOUNT_TYPE = "external_account";
  xI.CLOUD_RESOURCE_MANAGER = "https://cloudresourcemanager.googleapis.com/v1/projects/";
  var M25 = "//iam\\.googleapis\\.com/locations/[^/]+/workforcePools/[^/]+/providers/.+",
    L25 = "https://sts.{universeDomain}/v1/token",
    R25 = ls1(),
    O25 = tw();
  Object.defineProperty(xI, "DEFAULT_UNIVERSE", {
    enumerable: !0,
    get: function() {
      return O25.DEFAULT_UNIVERSE
    }
  });
  class MC1 extends E25.AuthClient {
    constructor(A, B) {
      var Q;
      super({
        ...A,
        ...B
      });
      Rr1.add(this), vd.set(this, null);
      let I = IX2.originalOrCamelOptions(A),
        G = I.get("type");
      if (G && G !== xI.EXTERNAL_ACCOUNT_TYPE) throw new Error(`Expected "${xI.EXTERNAL_ACCOUNT_TYPE}" type but received "${A.type}"`);
      let Z = I.get("client_id"),
        D = I.get("client_secret"),
        Y = (Q = I.get("token_url")) !== null && Q !== void 0 ? Q : L25.replace("{universeDomain}", this.universeDomain),
        W = I.get("subject_token_type"),
        J = I.get("workforce_pool_user_project"),
        F = I.get("service_account_impersonation_url"),
        X = I.get("service_account_impersonation"),
        V = IX2.originalOrCamelOptions(X).get("token_lifetime_seconds");
      if (this.cloudResourceManagerURL = new URL(I.get("cloud_resource_manager_url") || `https://cloudresourcemanager.${this.universeDomain}/v1/projects/`), Z) this.clientAuth = {
        confidentialClientType: "basic",
        clientId: Z,
        clientSecret: D
      };
      this.stsCredential = new U25.StsCredentials(Y, this.clientAuth), this.scopes = I.get("scopes") || [Or1], this.cachedAccessToken = null, this.audience = I.get("audience"), this.subjectTokenType = W, this.workforcePoolUserProject = J;
      let C = new RegExp(M25);
      if (this.workforcePoolUserProject && !this.audience.match(C)) throw new Error("workforcePoolUserProject should not be set for non-workforce pool credentials.");
      if (this.serviceAccountImpersonationUrl = F, this.serviceAccountImpersonationLifetime = V, this.serviceAccountImpersonationLifetime) this.configLifetimeRequested = !0;
      else this.configLifetimeRequested = !1, this.serviceAccountImpersonationLifetime = q25;
      this.projectNumber = this.getProjectNumber(this.audience), this.supplierContext = {
        audience: this.audience,
        subjectTokenType: this.subjectTokenType,
        transporter: this.transporter
      }
    }
    getServiceAccountEmail() {
      var A;
      if (this.serviceAccountImpersonationUrl) {
        if (this.serviceAccountImpersonationUrl.length > 256) throw new RangeError(`URL is too long: ${this.serviceAccountImpersonationUrl}`);
        let Q = /serviceAccounts\/(?<email>[^:]+):generateAccessToken$/.exec(this.serviceAccountImpersonationUrl);
        return ((A = Q === null || Q === void 0 ? void 0 : Q.groups) === null || A === void 0 ? void 0 : A.email) || null
      }
      return null
    }
    setCredentials(A) {
      super.setCredentials(A), this.cachedAccessToken = A
    }
    async getAccessToken() {
      if (!this.cachedAccessToken || this.isExpired(this.cachedAccessToken)) await this.refreshAccessTokenAsync();
      return {
        token: this.cachedAccessToken.access_token,
        res: this.cachedAccessToken.res
      }
    }
    async getRequestHeaders() {
      let B = {
        Authorization: `Bearer ${(await this.getAccessToken()).token}`
      };
      return this.addSharedMetadataHeaders(B)
    }
    request(A, B) {
      if (B) this.requestAsync(A).then((Q) => B(null, Q), (Q) => {
        return B(Q, Q.response)
      });
      else return this.requestAsync(A)
    }
    async getProjectId() {
      let A = this.projectNumber || this.workforcePoolUserProject;
      if (this.projectId) return this.projectId;
      else if (A) {
        let B = await this.getRequestHeaders(),
          Q = await this.transporter.request({
            ...MC1.RETRY_CONFIG,
            headers: B,
            url: `${this.cloudResourceManagerURL.toString()}${A}`,
            responseType: "json"
          });
        return this.projectId = Q.data.projectId, this.projectId
      }
      return null
    }
    async requestAsync(A, B = !1) {
      let Q;
      try {
        let I = await this.getRequestHeaders();
        if (A.headers = A.headers || {}, I && I["x-goog-user-project"]) A.headers["x-goog-user-project"] = I["x-goog-user-project"];
        if (I && I.Authorization) A.headers.Authorization = I.Authorization;
        Q = await this.transporter.request(A)
      } catch (I) {
        let G = I.response;
        if (G) {
          let Z = G.status,
            D = G.config.data instanceof w25.Readable;
          if (!B && (Z === 401 || Z === 403) && !D && this.forceRefreshOnFailure) return await this.refreshAccessTokenAsync(), await this.requestAsync(A, !0)
        }
        throw I
      }
      return Q
    }
    async refreshAccessTokenAsync() {
      QX2(this, vd, Lr1(this, vd, "f") || Lr1(this, Rr1, "m", GX2).call(this), "f");
      try {
        return await Lr1(this, vd, "f")
      } finally {
        QX2(this, vd, null, "f")
      }
    }
    getProjectNumber(A) {
      let B = A.match(/\/projects\/([^/]+)/);
      if (!B) return null;
      return B[1]
    }
    async getImpersonatedAccessToken(A) {
      let B = {
          ...MC1.RETRY_CONFIG,
          url: this.serviceAccountImpersonationUrl,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${A}`
          },
          data: {
            scope: this.getScopesArray(),
            lifetime: this.serviceAccountImpersonationLifetime + "s"
          },
          responseType: "json"
        },
        Q = await this.transporter.request(B),
        I = Q.data;
      return {
        access_token: I.accessToken,
        expiry_date: new Date(I.expireTime).getTime(),
        res: Q
      }
    }
    isExpired(A) {
      let B = new Date().getTime();
      return A.expiry_date ? B >= A.expiry_date - this.eagerRefreshThresholdMillis : !1
    }
    getScopesArray() {
      if (typeof this.scopes === "string") return [this.scopes];
      return this.scopes || [Or1]
    }
    getMetricsHeaderValue() {
      let A = process.version.replace(/^v/, ""),
        B = this.serviceAccountImpersonationUrl !== void 0,
        Q = this.credentialSourceType ? this.credentialSourceType : "unknown";
      return `gl-node/${A} auth/${R25.version} google-byoid-sdk source/${Q} sa-impersonation/${B} config-lifetime/${this.configLifetimeRequested}`
    }
  }
  xI.BaseExternalAccountClient = MC1;
  vd = new WeakMap, Rr1 = new WeakSet, GX2 = async function A() {
    let B = await this.retrieveSubjectToken(),
      Q = {
        grantType: N25,
        audience: this.audience,
        requestedTokenType: $25,
        subjectToken: B,
        subjectTokenType: this.subjectTokenType,
        scope: this.serviceAccountImpersonationUrl ? [Or1] : this.getScopesArray()
      },
      I = !this.clientAuth && this.workforcePoolUserProject ? {
        userProject: this.workforcePoolUserProject
      } : void 0,
      G = {
        "x-goog-api-client": this.getMetricsHeaderValue()
      },
      Z = await this.stsCredential.exchangeToken(Q, G, I);
    if (this.serviceAccountImpersonationUrl) this.cachedAccessToken = await this.getImpersonatedAccessToken(Z.access_token);
    else if (Z.expires_in) this.cachedAccessToken = {
      access_token: Z.access_token,
      expiry_date: new Date().getTime() + Z.expires_in * 1000,
      res: Z.res
    };
    else this.cachedAccessToken = {
      access_token: Z.access_token,
      res: Z.res
    };
    return this.credentials = {}, Object.assign(this.credentials, this.cachedAccessToken), delete this.credentials.res, this.emit("tokens", {
      refresh_token: null,
      expiry_date: this.cachedAccessToken.expiry_date,
      access_token: this.cachedAccessToken.access_token,
      token_type: "Bearer",
      id_token: null
    }), this.cachedAccessToken
  }
})
// @from(Start 6998302, End 6999620)
WX2 = z((DX2) => {
  var Tr1, Pr1, Sr1;
  Object.defineProperty(DX2, "__esModule", {
    value: !0
  });
  DX2.FileSubjectTokenSupplier = void 0;
  var _r1 = Z1("util"),
    jr1 = Z1("fs"),
    T25 = _r1.promisify((Tr1 = jr1.readFile) !== null && Tr1 !== void 0 ? Tr1 : () => {}),
    P25 = _r1.promisify((Pr1 = jr1.realpath) !== null && Pr1 !== void 0 ? Pr1 : () => {}),
    S25 = _r1.promisify((Sr1 = jr1.lstat) !== null && Sr1 !== void 0 ? Sr1 : () => {});
  class ZX2 {
    constructor(A) {
      this.filePath = A.filePath, this.formatType = A.formatType, this.subjectTokenFieldName = A.subjectTokenFieldName
    }
    async getSubjectToken(A) {
      let B = this.filePath;
      try {
        if (B = await P25(B), !(await S25(B)).isFile()) throw new Error
      } catch (G) {
        if (G instanceof Error) G.message = `The file at ${B} does not exist, or it is not a file. ${G.message}`;
        throw G
      }
      let Q, I = await T25(B, {
        encoding: "utf8"
      });
      if (this.formatType === "text") Q = I;
      else if (this.formatType === "json" && this.subjectTokenFieldName) Q = JSON.parse(I)[this.subjectTokenFieldName];
      if (!Q) throw new Error("Unable to parse the subject_token from the credential_source file");
      return Q
    }
  }
  DX2.FileSubjectTokenSupplier = ZX2
})
// @from(Start 6999626, End 7000606)
VX2 = z((FX2) => {
  Object.defineProperty(FX2, "__esModule", {
    value: !0
  });
  FX2.UrlSubjectTokenSupplier = void 0;
  class JX2 {
    constructor(A) {
      this.url = A.url, this.formatType = A.formatType, this.subjectTokenFieldName = A.subjectTokenFieldName, this.headers = A.headers, this.additionalGaxiosOptions = A.additionalGaxiosOptions
    }
    async getSubjectToken(A) {
      let B = {
          ...this.additionalGaxiosOptions,
          url: this.url,
          method: "GET",
          headers: this.headers,
          responseType: this.formatType
        },
        Q;
      if (this.formatType === "text") Q = (await A.transporter.request(B)).data;
      else if (this.formatType === "json" && this.subjectTokenFieldName) Q = (await A.transporter.request(B)).data[this.subjectTokenFieldName];
      if (!Q) throw new Error("Unable to parse the subject_token from the credential_source URL");
      return Q
    }
  }
  FX2.UrlSubjectTokenSupplier = JX2
})
// @from(Start 7000612, End 7002759)
xr1 = z((CX2) => {
  Object.defineProperty(CX2, "__esModule", {
    value: !0
  });
  CX2.IdentityPoolClient = void 0;
  var _25 = wO(),
    yr1 = HO(),
    j25 = WX2(),
    y25 = VX2();
  class kr1 extends _25.BaseExternalAccountClient {
    constructor(A, B) {
      super(A, B);
      let Q = yr1.originalOrCamelOptions(A),
        I = Q.get("credential_source"),
        G = Q.get("subject_token_supplier");
      if (!I && !G) throw new Error("A credential source or subject token supplier must be specified.");
      if (I && G) throw new Error("Only one of credential source or subject token supplier can be specified.");
      if (G) this.subjectTokenSupplier = G, this.credentialSourceType = "programmatic";
      else {
        let Z = yr1.originalOrCamelOptions(I),
          D = yr1.originalOrCamelOptions(Z.get("format")),
          Y = D.get("type") || "text",
          W = D.get("subject_token_field_name");
        if (Y !== "json" && Y !== "text") throw new Error(`Invalid credential_source format "${Y}"`);
        if (Y === "json" && !W) throw new Error("Missing subject_token_field_name for JSON credential_source format");
        let J = Z.get("file"),
          F = Z.get("url"),
          X = Z.get("headers");
        if (J && F) throw new Error('No valid Identity Pool "credential_source" provided, must be either file or url.');
        else if (J && !F) this.credentialSourceType = "file", this.subjectTokenSupplier = new j25.FileSubjectTokenSupplier({
          filePath: J,
          formatType: Y,
          subjectTokenFieldName: W
        });
        else if (!J && F) this.credentialSourceType = "url", this.subjectTokenSupplier = new y25.UrlSubjectTokenSupplier({
          url: F,
          formatType: Y,
          subjectTokenFieldName: W,
          headers: X,
          additionalGaxiosOptions: kr1.RETRY_CONFIG
        });
        else throw new Error('No valid Identity Pool "credential_source" provided, must be either file or url.')
      }
    }
    async retrieveSubjectToken() {
      return this.subjectTokenSupplier.getSubjectToken(this.supplierContext)
    }
  }
  CX2.IdentityPoolClient = kr1
})
// @from(Start 7002765, End 7005822)
fr1 = z((EX2) => {
  Object.defineProperty(EX2, "__esModule", {
    value: !0
  });
  EX2.AwsRequestSigner = void 0;
  var zX2 = Td(),
    HX2 = "AWS4-HMAC-SHA256",
    k25 = "aws4_request";
  class wX2 {
    constructor(A, B) {
      this.getCredentials = A, this.region = B, this.crypto = zX2.createCrypto()
    }
    async getRequestOptions(A) {
      if (!A.url) throw new Error('"url" is required in "amzOptions"');
      let B = typeof A.data === "object" ? JSON.stringify(A.data) : A.data,
        Q = A.url,
        I = A.method || "GET",
        G = A.body || B,
        Z = A.headers,
        D = await this.getCredentials(),
        Y = new URL(Q),
        W = await f25({
          crypto: this.crypto,
          host: Y.host,
          canonicalUri: Y.pathname,
          canonicalQuerystring: Y.search.substr(1),
          method: I,
          region: this.region,
          securityCredentials: D,
          requestPayload: G,
          additionalAmzHeaders: Z
        }),
        J = Object.assign(W.amzDate ? {
          "x-amz-date": W.amzDate
        } : {}, {
          Authorization: W.authorizationHeader,
          host: Y.host
        }, Z || {});
      if (D.token) Object.assign(J, {
        "x-amz-security-token": D.token
      });
      let F = {
        url: Q,
        method: I,
        headers: J
      };
      if (typeof G !== "undefined") F.body = G;
      return F
    }
  }
  EX2.AwsRequestSigner = wX2;
  async function xe(A, B, Q) {
    return await A.signWithHmacSha256(B, Q)
  }
  async function x25(A, B, Q, I, G) {
    let Z = await xe(A, `AWS4${B}`, Q),
      D = await xe(A, Z, I),
      Y = await xe(A, D, G);
    return await xe(A, Y, "aws4_request")
  }
  async function f25(A) {
    let B = A.additionalAmzHeaders || {},
      Q = A.requestPayload || "",
      I = A.host.split(".")[0],
      G = new Date,
      Z = G.toISOString().replace(/[-:]/g, "").replace(/\.[0-9]+/, ""),
      D = G.toISOString().replace(/[-]/g, "").replace(/T.*/, ""),
      Y = {};
    if (Object.keys(B).forEach((R) => {
        Y[R.toLowerCase()] = B[R]
      }), A.securityCredentials.token) Y["x-amz-security-token"] = A.securityCredentials.token;
    let W = Object.assign({
        host: A.host
      }, Y.date ? {} : {
        "x-amz-date": Z
      }, Y),
      J = "",
      F = Object.keys(W).sort();
    F.forEach((R) => {
      J += `${R}:${W[R]}
`
    });
    let X = F.join(";"),
      V = await A.crypto.sha256DigestHex(Q),
      C = `${A.method}
${A.canonicalUri}
${A.canonicalQuerystring}
${J}
${X}
${V}`,
      K = `${D}/${A.region}/${I}/${k25}`,
      E = `${HX2}
${Z}
${K}
` + await A.crypto.sha256DigestHex(C),
      N = await x25(A.crypto, A.securityCredentials.secretAccessKey, D, A.region, I),
      q = await xe(A.crypto, N, E),
      O = `${HX2} Credential=${A.securityCredentials.accessKeyId}/${K}, SignedHeaders=${X}, Signature=${zX2.fromArrayBufferToHex(q)}`;
    return {
      amzDate: Y.date ? void 0 : Z,
      authorizationHeader: O,
      canonicalQuerystring: A.canonicalQuerystring
    }
  }
})
// @from(Start 7005828, End 7009219)
MX2 = z((bd) => {
  var $$ = bd && bd.__classPrivateFieldGet || function(A, B, Q, I) {
      if (Q === "a" && !I) throw new TypeError("Private accessor was defined without a getter");
      if (typeof B === "function" ? A !== B || !I : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Q === "m" ? I : Q === "a" ? I.call(A) : I ? I.value : B.get(A)
    },
    OK, vr1, NX2, $X2, LC1, br1;
  Object.defineProperty(bd, "__esModule", {
    value: !0
  });
  bd.DefaultAwsSecurityCredentialsSupplier = void 0;
  class qX2 {
    constructor(A) {
      OK.add(this), this.regionUrl = A.regionUrl, this.securityCredentialsUrl = A.securityCredentialsUrl, this.imdsV2SessionTokenUrl = A.imdsV2SessionTokenUrl, this.additionalGaxiosOptions = A.additionalGaxiosOptions
    }
    async getAwsRegion(A) {
      if ($$(this, OK, "a", LC1)) return $$(this, OK, "a", LC1);
      let B = {};
      if (!$$(this, OK, "a", LC1) && this.imdsV2SessionTokenUrl) B["x-aws-ec2-metadata-token"] = await $$(this, OK, "m", vr1).call(this, A.transporter);
      if (!this.regionUrl) throw new Error('Unable to determine AWS region due to missing "options.credential_source.region_url"');
      let Q = {
          ...this.additionalGaxiosOptions,
          url: this.regionUrl,
          method: "GET",
          responseType: "text",
          headers: B
        },
        I = await A.transporter.request(Q);
      return I.data.substr(0, I.data.length - 1)
    }
    async getAwsSecurityCredentials(A) {
      if ($$(this, OK, "a", br1)) return $$(this, OK, "a", br1);
      let B = {};
      if (this.imdsV2SessionTokenUrl) B["x-aws-ec2-metadata-token"] = await $$(this, OK, "m", vr1).call(this, A.transporter);
      let Q = await $$(this, OK, "m", NX2).call(this, B, A.transporter),
        I = await $$(this, OK, "m", $X2).call(this, Q, B, A.transporter);
      return {
        accessKeyId: I.AccessKeyId,
        secretAccessKey: I.SecretAccessKey,
        token: I.Token
      }
    }
  }
  bd.DefaultAwsSecurityCredentialsSupplier = qX2;
  OK = new WeakSet, vr1 = async function A(B) {
    let Q = {
      ...this.additionalGaxiosOptions,
      url: this.imdsV2SessionTokenUrl,
      method: "PUT",
      responseType: "text",
      headers: {
        "x-aws-ec2-metadata-token-ttl-seconds": "300"
      }
    };
    return (await B.request(Q)).data
  }, NX2 = async function A(B, Q) {
    if (!this.securityCredentialsUrl) throw new Error('Unable to determine AWS role name due to missing "options.credential_source.url"');
    let I = {
      ...this.additionalGaxiosOptions,
      url: this.securityCredentialsUrl,
      method: "GET",
      responseType: "text",
      headers: B
    };
    return (await Q.request(I)).data
  }, $X2 = async function A(B, Q, I) {
    return (await I.request({
      ...this.additionalGaxiosOptions,
      url: `${this.securityCredentialsUrl}/${B}`,
      responseType: "json",
      headers: Q
    })).data
  }, LC1 = function A() {
    return process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || null
  }, br1 = function A() {
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) return {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      token: process.env.AWS_SESSION_TOKEN
    };
    return null
  }
})
// @from(Start 7009225, End 7012620)
gr1 = z((gd) => {
  var v25 = gd && gd.__classPrivateFieldGet || function(A, B, Q, I) {
      if (Q === "a" && !I) throw new TypeError("Private accessor was defined without a getter");
      if (typeof B === "function" ? A !== B || !I : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Q === "m" ? I : Q === "a" ? I.call(A) : I ? I.value : B.get(A)
    },
    RC1, RX2;
  Object.defineProperty(gd, "__esModule", {
    value: !0
  });
  gd.AwsClient = void 0;
  var b25 = fr1(),
    g25 = wO(),
    h25 = MX2(),
    LX2 = HO();
  class fe extends g25.BaseExternalAccountClient {
    constructor(A, B) {
      super(A, B);
      let Q = LX2.originalOrCamelOptions(A),
        I = Q.get("credential_source"),
        G = Q.get("aws_security_credentials_supplier");
      if (!I && !G) throw new Error("A credential source or AWS security credentials supplier must be specified.");
      if (I && G) throw new Error("Only one of credential source or AWS security credentials supplier can be specified.");
      if (G) this.awsSecurityCredentialsSupplier = G, this.regionalCredVerificationUrl = v25(RC1, RC1, "f", RX2), this.credentialSourceType = "programmatic";
      else {
        let Z = LX2.originalOrCamelOptions(I);
        this.environmentId = Z.get("environment_id");
        let D = Z.get("region_url"),
          Y = Z.get("url"),
          W = Z.get("imdsv2_session_token_url");
        this.awsSecurityCredentialsSupplier = new h25.DefaultAwsSecurityCredentialsSupplier({
          regionUrl: D,
          securityCredentialsUrl: Y,
          imdsV2SessionTokenUrl: W
        }), this.regionalCredVerificationUrl = Z.get("regional_cred_verification_url"), this.credentialSourceType = "aws", this.validateEnvironmentId()
      }
      this.awsRequestSigner = null, this.region = ""
    }
    validateEnvironmentId() {
      var A;
      let B = (A = this.environmentId) === null || A === void 0 ? void 0 : A.match(/^(aws)(\d+)$/);
      if (!B || !this.regionalCredVerificationUrl) throw new Error('No valid AWS "credential_source" provided');
      else if (parseInt(B[2], 10) !== 1) throw new Error(`aws version "${B[2]}" is not supported in the current build.`)
    }
    async retrieveSubjectToken() {
      if (!this.awsRequestSigner) this.region = await this.awsSecurityCredentialsSupplier.getAwsRegion(this.supplierContext), this.awsRequestSigner = new b25.AwsRequestSigner(async () => {
        return this.awsSecurityCredentialsSupplier.getAwsSecurityCredentials(this.supplierContext)
      }, this.region);
      let A = await this.awsRequestSigner.getRequestOptions({
          ...RC1.RETRY_CONFIG,
          url: this.regionalCredVerificationUrl.replace("{region}", this.region),
          method: "POST"
        }),
        B = [],
        Q = Object.assign({
          "x-goog-cloud-target-resource": this.audience
        }, A.headers);
      for (let I in Q) B.push({
        key: I,
        value: Q[I]
      });
      return encodeURIComponent(JSON.stringify({
        url: A.url,
        method: A.method,
        headers: B
      }))
    }
  }
  gd.AwsClient = fe;
  RC1 = fe;
  RX2 = {
    value: "https://sts.{region}.amazonaws.com?Action=GetCallerIdentity&Version=2011-06-15"
  };
  fe.AWS_EC2_METADATA_IPV4_ADDRESS = "169.254.169.254";
  fe.AWS_EC2_METADATA_IPV6_ADDRESS = "fd00:ec2::254"
})
// @from(Start 7012626, End 7015334)
ir1 = z((PX2) => {
  Object.defineProperty(PX2, "__esModule", {
    value: !0
  });
  PX2.InvalidSubjectTokenError = PX2.InvalidMessageFieldError = PX2.InvalidCodeFieldError = PX2.InvalidTokenTypeFieldError = PX2.InvalidExpirationTimeFieldError = PX2.InvalidSuccessFieldError = PX2.InvalidVersionFieldError = PX2.ExecutableResponseError = PX2.ExecutableResponse = void 0;
  var OC1 = "urn:ietf:params:oauth:token-type:saml2",
    hr1 = "urn:ietf:params:oauth:token-type:id_token",
    mr1 = "urn:ietf:params:oauth:token-type:jwt";
  class OX2 {
    constructor(A) {
      if (!A.version) throw new dr1("Executable response must contain a 'version' field.");
      if (A.success === void 0) throw new ur1("Executable response must contain a 'success' field.");
      if (this.version = A.version, this.success = A.success, this.success) {
        if (this.expirationTime = A.expiration_time, this.tokenType = A.token_type, this.tokenType !== OC1 && this.tokenType !== hr1 && this.tokenType !== mr1) throw new pr1(`Executable response must contain a 'token_type' field when successful and it must be one of ${hr1}, ${mr1}, or ${OC1}.`);
        if (this.tokenType === OC1) {
          if (!A.saml_response) throw new TC1(`Executable response must contain a 'saml_response' field when token_type=${OC1}.`);
          this.subjectToken = A.saml_response
        } else {
          if (!A.id_token) throw new TC1(`Executable response must contain a 'id_token' field when token_type=${hr1} or ${mr1}.`);
          this.subjectToken = A.id_token
        }
      } else {
        if (!A.code) throw new cr1("Executable response must contain a 'code' field when unsuccessful.");
        if (!A.message) throw new lr1("Executable response must contain a 'message' field when unsuccessful.");
        this.errorCode = A.code, this.errorMessage = A.message
      }
    }
    isValid() {
      return !this.isExpired() && this.success
    }
    isExpired() {
      return this.expirationTime !== void 0 && this.expirationTime < Math.round(Date.now() / 1000)
    }
  }
  PX2.ExecutableResponse = OX2;
  class q$ extends Error {
    constructor(A) {
      super(A);
      Object.setPrototypeOf(this, new.target.prototype)
    }
  }
  PX2.ExecutableResponseError = q$;
  class dr1 extends q$ {}
  PX2.InvalidVersionFieldError = dr1;
  class ur1 extends q$ {}
  PX2.InvalidSuccessFieldError = ur1;
  class TX2 extends q$ {}
  PX2.InvalidExpirationTimeFieldError = TX2;
  class pr1 extends q$ {}
  PX2.InvalidTokenTypeFieldError = pr1;
  class cr1 extends q$ {}
  PX2.InvalidCodeFieldError = cr1;
  class lr1 extends q$ {}
  PX2.InvalidMessageFieldError = lr1;
  class TC1 extends q$ {}
  PX2.InvalidSubjectTokenError = TC1
})
// @from(Start 7015340, End 7018036)
yX2 = z((_X2) => {
  Object.defineProperty(_X2, "__esModule", {
    value: !0
  });
  _X2.PluggableAuthHandler = void 0;
  var a25 = PC1(),
    ej = ir1(),
    s25 = Z1("child_process"),
    nr1 = Z1("fs");
  class ar1 {
    constructor(A) {
      if (!A.command) throw new Error("No command provided.");
      if (this.commandComponents = ar1.parseCommand(A.command), this.timeoutMillis = A.timeoutMillis, !this.timeoutMillis) throw new Error("No timeoutMillis provided.");
      this.outputFile = A.outputFile
    }
    retrieveResponseFromExecutable(A) {
      return new Promise((B, Q) => {
        let I = s25.spawn(this.commandComponents[0], this.commandComponents.slice(1), {
            env: {
              ...process.env,
              ...Object.fromEntries(A)
            }
          }),
          G = "";
        I.stdout.on("data", (D) => {
          G += D
        }), I.stderr.on("data", (D) => {
          G += D
        });
        let Z = setTimeout(() => {
          return I.removeAllListeners(), I.kill(), Q(new Error("The executable failed to finish within the timeout specified."))
        }, this.timeoutMillis);
        I.on("close", (D) => {
          if (clearTimeout(Z), D === 0) try {
            let Y = JSON.parse(G),
              W = new ej.ExecutableResponse(Y);
            return B(W)
          } catch (Y) {
            if (Y instanceof ej.ExecutableResponseError) return Q(Y);
            return Q(new ej.ExecutableResponseError(`The executable returned an invalid response: ${G}`))
          } else return Q(new a25.ExecutableError(G, D.toString()))
        })
      })
    }
    async retrieveCachedResponse() {
      if (!this.outputFile || this.outputFile.length === 0) return;
      let A;
      try {
        A = await nr1.promises.realpath(this.outputFile)
      } catch (Q) {
        return
      }
      if (!(await nr1.promises.lstat(A)).isFile()) return;
      let B = await nr1.promises.readFile(A, {
        encoding: "utf8"
      });
      if (B === "") return;
      try {
        let Q = JSON.parse(B);
        if (new ej.ExecutableResponse(Q).isValid()) return new ej.ExecutableResponse(Q);
        return
      } catch (Q) {
        if (Q instanceof ej.ExecutableResponseError) throw Q;
        throw new ej.ExecutableResponseError(`The output file contained an invalid response: ${B}`)
      }
    }
    static parseCommand(A) {
      let B = A.match(/(?:[^\s"]+|"[^"]*")+/g);
      if (!B) throw new Error(`Provided command: "${A}" could not be parsed.`);
      for (let Q = 0; Q < B.length; Q++)
        if (B[Q][0] === '"' && B[Q].slice(-1) === '"') B[Q] = B[Q].slice(1, -1);
      return B
    }
  }
  _X2.PluggableAuthHandler = ar1
})
// @from(Start 7018042, End 7021012)
PC1 = z((bX2) => {
  Object.defineProperty(bX2, "__esModule", {
    value: !0
  });
  bX2.PluggableAuthClient = bX2.ExecutableError = void 0;
  var r25 = wO(),
    o25 = ir1(),
    t25 = yX2();
  class sr1 extends Error {
    constructor(A, B) {
      super(`The executable failed with exit code: ${B} and error message: ${A}.`);
      this.code = B, Object.setPrototypeOf(this, new.target.prototype)
    }
  }
  bX2.ExecutableError = sr1;
  var e25 = 30000,
    kX2 = 5000,
    xX2 = 120000,
    A95 = "GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES",
    fX2 = 1;
  class vX2 extends r25.BaseExternalAccountClient {
    constructor(A, B) {
      super(A, B);
      if (!A.credential_source.executable) throw new Error('No valid Pluggable Auth "credential_source" provided.');
      if (this.command = A.credential_source.executable.command, !this.command) throw new Error('No valid Pluggable Auth "credential_source" provided.');
      if (A.credential_source.executable.timeout_millis === void 0) this.timeoutMillis = e25;
      else if (this.timeoutMillis = A.credential_source.executable.timeout_millis, this.timeoutMillis < kX2 || this.timeoutMillis > xX2) throw new Error(`Timeout must be between ${kX2} and ${xX2} milliseconds.`);
      this.outputFile = A.credential_source.executable.output_file, this.handler = new t25.PluggableAuthHandler({
        command: this.command,
        timeoutMillis: this.timeoutMillis,
        outputFile: this.outputFile
      }), this.credentialSourceType = "executable"
    }
    async retrieveSubjectToken() {
      if (process.env[A95] !== "1") throw new Error("Pluggable Auth executables need to be explicitly allowed to run by setting the GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES environment Variable to 1.");
      let A = void 0;
      if (this.outputFile) A = await this.handler.retrieveCachedResponse();
      if (!A) {
        let B = new Map;
        if (B.set("GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE", this.audience), B.set("GOOGLE_EXTERNAL_ACCOUNT_TOKEN_TYPE", this.subjectTokenType), B.set("GOOGLE_EXTERNAL_ACCOUNT_INTERACTIVE", "0"), this.outputFile) B.set("GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE", this.outputFile);
        let Q = this.getServiceAccountEmail();
        if (Q) B.set("GOOGLE_EXTERNAL_ACCOUNT_IMPERSONATED_EMAIL", Q);
        A = await this.handler.retrieveResponseFromExecutable(B)
      }
      if (A.version > fX2) throw new Error(`Version of executable is not currently supported, maximum supported version is ${fX2}.`);
      if (!A.success) throw new sr1(A.errorMessage, A.errorCode);
      if (this.outputFile) {
        if (!A.expirationTime) throw new o25.InvalidExpirationTimeFieldError("The executable response must contain the `expiration_time` field for successful responses when an output_file has been specified in the configuration.")
      }
      if (A.isExpired()) throw new Error("Executable response is expired.");
      return A.subjectToken
    }
  }
  bX2.PluggableAuthClient = vX2
})
// @from(Start 7021018, End 7022006)
rr1 = z((mX2) => {
  Object.defineProperty(mX2, "__esModule", {
    value: !0
  });
  mX2.ExternalAccountClient = void 0;
  var Q95 = wO(),
    I95 = xr1(),
    G95 = gr1(),
    Z95 = PC1();
  class hX2 {
    constructor() {
      throw new Error("ExternalAccountClients should be initialized via: ExternalAccountClient.fromJSON(), directly via explicit constructors, eg. new AwsClient(options), new IdentityPoolClient(options), newPluggableAuthClientOptions, or via new GoogleAuth(options).getClient()")
    }
    static fromJSON(A, B) {
      var Q, I;
      if (A && A.type === Q95.EXTERNAL_ACCOUNT_TYPE)
        if ((Q = A.credential_source) === null || Q === void 0 ? void 0 : Q.environment_id) return new G95.AwsClient(A, B);
        else if ((I = A.credential_source) === null || I === void 0 ? void 0 : I.executable) return new Z95.PluggableAuthClient(A, B);
      else return new I95.IdentityPoolClient(A, B);
      else return null
    }
  }
  mX2.ExternalAccountClient = hX2
})