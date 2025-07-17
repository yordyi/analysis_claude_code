
// @from(Start 7022012, End 7026267)
iX2 = z((cX2) => {
  Object.defineProperty(cX2, "__esModule", {
    value: !0
  });
  cX2.ExternalAccountAuthorizedUserClient = cX2.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = void 0;
  var D95 = tw(),
    uX2 = $r1(),
    Y95 = NK(),
    W95 = Z1("stream"),
    J95 = wO();
  cX2.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE = "external_account_authorized_user";
  var F95 = "https://sts.{universeDomain}/v1/oauthtoken";
  class or1 extends uX2.OAuthClientAuthHandler {
    constructor(A, B, Q) {
      super(Q);
      this.url = A, this.transporter = B
    }
    async refreshToken(A, B) {
      let Q = new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: A
        }),
        I = {
          "Content-Type": "application/x-www-form-urlencoded",
          ...B
        },
        G = {
          ...or1.RETRY_CONFIG,
          url: this.url,
          method: "POST",
          headers: I,
          data: Q.toString(),
          responseType: "json"
        };
      this.applyClientAuthenticationOptions(G);
      try {
        let Z = await this.transporter.request(G),
          D = Z.data;
        return D.res = Z, D
      } catch (Z) {
        if (Z instanceof Y95.GaxiosError && Z.response) throw uX2.getErrorFromOAuthErrorResponse(Z.response.data, Z);
        throw Z
      }
    }
  }
  class pX2 extends D95.AuthClient {
    constructor(A, B) {
      var Q;
      super({
        ...A,
        ...B
      });
      if (A.universe_domain) this.universeDomain = A.universe_domain;
      this.refreshToken = A.refresh_token;
      let I = {
        confidentialClientType: "basic",
        clientId: A.client_id,
        clientSecret: A.client_secret
      };
      if (this.externalAccountAuthorizedUserHandler = new or1((Q = A.token_url) !== null && Q !== void 0 ? Q : F95.replace("{universeDomain}", this.universeDomain), this.transporter, I), this.cachedAccessToken = null, this.quotaProjectId = A.quota_project_id, typeof(B === null || B === void 0 ? void 0 : B.eagerRefreshThresholdMillis) !== "number") this.eagerRefreshThresholdMillis = J95.EXPIRATION_TIME_OFFSET;
      else this.eagerRefreshThresholdMillis = B.eagerRefreshThresholdMillis;
      this.forceRefreshOnFailure = !!(B === null || B === void 0 ? void 0 : B.forceRefreshOnFailure)
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
            D = G.config.data instanceof W95.Readable;
          if (!B && (Z === 401 || Z === 403) && !D && this.forceRefreshOnFailure) return await this.refreshAccessTokenAsync(), await this.requestAsync(A, !0)
        }
        throw I
      }
      return Q
    }
    async refreshAccessTokenAsync() {
      let A = await this.externalAccountAuthorizedUserHandler.refreshToken(this.refreshToken);
      if (this.cachedAccessToken = {
          access_token: A.access_token,
          expiry_date: new Date().getTime() + A.expires_in * 1000,
          res: A.res
        }, A.refresh_token !== void 0) this.refreshToken = A.refresh_token;
      return this.cachedAccessToken
    }
    isExpired(A) {
      let B = new Date().getTime();
      return A.expiry_date ? B >= A.expiry_date - this.eagerRefreshThresholdMillis : !1
    }
  }
  cX2.ExternalAccountAuthorizedUserClient = pX2
})
// @from(Start 7026273, End 7043456)
tX2 = z((bG) => {
  var EO = bG && bG.__classPrivateFieldGet || function(A, B, Q, I) {
      if (Q === "a" && !I) throw new TypeError("Private accessor was defined without a getter");
      if (typeof B === "function" ? A !== B || !I : !B.has(A)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return Q === "m" ? I : Q === "a" ? I.call(A) : I ? I.value : B.get(A)
    },
    nX2 = bG && bG.__classPrivateFieldSet || function(A, B, Q, I, G) {
      if (I === "m") throw new TypeError("Private method is not writable");
      if (I === "a" && !G) throw new TypeError("Private accessor was defined without a setter");
      if (typeof B === "function" ? A !== B || !G : !B.has(A)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return I === "a" ? G.call(A, Q) : G ? G.value = Q : B.set(A, Q), Q
    },
    UO, dd, ud, oX2;
  Object.defineProperty(bG, "__esModule", {
    value: !0
  });
  bG.GoogleAuth = bG.GoogleAuthExceptionMessages = bG.CLOUD_SDK_CLIENT_ID = void 0;
  var V95 = Z1("child_process"),
    ge = Z1("fs"),
    ve = Re(),
    C95 = Z1("os"),
    er1 = Z1("path"),
    K95 = Td(),
    H95 = Te(),
    z95 = Br1(),
    w95 = Qr1(),
    E95 = Ir1(),
    hd = Er1(),
    aX2 = Ur1(),
    md = Nr1(),
    U95 = rr1(),
    be = wO(),
    tr1 = tw(),
    sX2 = iX2(),
    rX2 = HO();
  bG.CLOUD_SDK_CLIENT_ID = "764086051850-6qr4p6gpi6hn506pt8ejuq83di341hur.apps.googleusercontent.com";
  bG.GoogleAuthExceptionMessages = {
    API_KEY_WITH_CREDENTIALS: "API Keys and Credentials are mutually exclusive authentication methods and cannot be used together.",
    NO_PROJECT_ID_FOUND: `Unable to detect a Project Id in the current environment. 
To learn more about authentication and Google APIs, visit: 
https://cloud.google.com/docs/authentication/getting-started`,
    NO_CREDENTIALS_FOUND: `Unable to find credentials in current environment. 
To learn more about authentication and Google APIs, visit: 
https://cloud.google.com/docs/authentication/getting-started`,
    NO_ADC_FOUND: "Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.",
    NO_UNIVERSE_DOMAIN_FOUND: `Unable to detect a Universe Domain in the current environment.
To learn more about Universe Domain retrieval, visit: 
https://cloud.google.com/compute/docs/metadata/predefined-metadata-keys`
  };
  class Ao1 {
    get isGCE() {
      return this.checkIsGCE
    }
    constructor(A = {}) {
      if (UO.add(this), this.checkIsGCE = void 0, this.jsonContent = null, this.cachedCredential = null, dd.set(this, null), this.clientOptions = {}, this._cachedProjectId = A.projectId || null, this.cachedCredential = A.authClient || null, this.keyFilename = A.keyFilename || A.keyFile, this.scopes = A.scopes, this.clientOptions = A.clientOptions || {}, this.jsonContent = A.credentials || null, this.apiKey = A.apiKey || this.clientOptions.apiKey || null, this.apiKey && (this.jsonContent || this.clientOptions.credentials)) throw new RangeError(bG.GoogleAuthExceptionMessages.API_KEY_WITH_CREDENTIALS);
      if (A.universeDomain) this.clientOptions.universeDomain = A.universeDomain
    }
    setGapicJWTValues(A) {
      A.defaultServicePath = this.defaultServicePath, A.useJWTAccessWithScope = this.useJWTAccessWithScope, A.defaultScopes = this.defaultScopes
    }
    getProjectId(A) {
      if (A) this.getProjectIdAsync().then((B) => A(null, B), A);
      else return this.getProjectIdAsync()
    }
    async getProjectIdOptional() {
      try {
        return await this.getProjectId()
      } catch (A) {
        if (A instanceof Error && A.message === bG.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND) return null;
        else throw A
      }
    }
    async findAndCacheProjectId() {
      let A = null;
      if (A || (A = await this.getProductionProjectId()), A || (A = await this.getFileProjectId()), A || (A = await this.getDefaultServiceProjectId()), A || (A = await this.getGCEProjectId()), A || (A = await this.getExternalAccountClientProjectId()), A) return this._cachedProjectId = A, A;
      else throw new Error(bG.GoogleAuthExceptionMessages.NO_PROJECT_ID_FOUND)
    }
    async getProjectIdAsync() {
      if (this._cachedProjectId) return this._cachedProjectId;
      if (!this._findProjectIdPromise) this._findProjectIdPromise = this.findAndCacheProjectId();
      return this._findProjectIdPromise
    }
    async getUniverseDomainFromMetadataServer() {
      var A;
      let B;
      try {
        B = await ve.universe("universe-domain"), B || (B = tr1.DEFAULT_UNIVERSE)
      } catch (Q) {
        if (Q && ((A = Q === null || Q === void 0 ? void 0 : Q.response) === null || A === void 0 ? void 0 : A.status) === 404) B = tr1.DEFAULT_UNIVERSE;
        else throw Q
      }
      return B
    }
    async getUniverseDomain() {
      let A = rX2.originalOrCamelOptions(this.clientOptions).get("universe_domain");
      try {
        A !== null && A !== void 0 || (A = (await this.getClient()).universeDomain)
      } catch (B) {
        A !== null && A !== void 0 || (A = tr1.DEFAULT_UNIVERSE)
      }
      return A
    }
    getAnyScopes() {
      return this.scopes || this.defaultScopes
    }
    getApplicationDefault(A = {}, B) {
      let Q;
      if (typeof A === "function") B = A;
      else Q = A;
      if (B) this.getApplicationDefaultAsync(Q).then((I) => B(null, I.credential, I.projectId), B);
      else return this.getApplicationDefaultAsync(Q)
    }
    async getApplicationDefaultAsync(A = {}) {
      if (this.cachedCredential) return await EO(this, UO, "m", ud).call(this, this.cachedCredential, null);
      let B;
      if (B = await this._tryGetApplicationCredentialsFromEnvironmentVariable(A), B) {
        if (B instanceof hd.JWT) B.scopes = this.scopes;
        else if (B instanceof be.BaseExternalAccountClient) B.scopes = this.getAnyScopes();
        return await EO(this, UO, "m", ud).call(this, B)
      }
      if (B = await this._tryGetApplicationCredentialsFromWellKnownFile(A), B) {
        if (B instanceof hd.JWT) B.scopes = this.scopes;
        else if (B instanceof be.BaseExternalAccountClient) B.scopes = this.getAnyScopes();
        return await EO(this, UO, "m", ud).call(this, B)
      }
      if (await this._checkIsGCE()) return A.scopes = this.getAnyScopes(), await EO(this, UO, "m", ud).call(this, new z95.Compute(A));
      throw new Error(bG.GoogleAuthExceptionMessages.NO_ADC_FOUND)
    }
    async _checkIsGCE() {
      if (this.checkIsGCE === void 0) this.checkIsGCE = ve.getGCPResidency() || await ve.isAvailable();
      return this.checkIsGCE
    }
    async _tryGetApplicationCredentialsFromEnvironmentVariable(A) {
      let B = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.google_application_credentials;
      if (!B || B.length === 0) return null;
      try {
        return this._getApplicationCredentialsFromFilePath(B, A)
      } catch (Q) {
        if (Q instanceof Error) Q.message = `Unable to read the credential file specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable: ${Q.message}`;
        throw Q
      }
    }
    async _tryGetApplicationCredentialsFromWellKnownFile(A) {
      let B = null;
      if (this._isWindows()) B = process.env.APPDATA;
      else {
        let I = process.env.HOME;
        if (I) B = er1.join(I, ".config")
      }
      if (B) {
        if (B = er1.join(B, "gcloud", "application_default_credentials.json"), !ge.existsSync(B)) B = null
      }
      if (!B) return null;
      return await this._getApplicationCredentialsFromFilePath(B, A)
    }
    async _getApplicationCredentialsFromFilePath(A, B = {}) {
      if (!A || A.length === 0) throw new Error("The file path is invalid.");
      try {
        if (A = ge.realpathSync(A), !ge.lstatSync(A).isFile()) throw new Error
      } catch (I) {
        if (I instanceof Error) I.message = `The file at ${A} does not exist, or it is not a file. ${I.message}`;
        throw I
      }
      let Q = ge.createReadStream(A);
      return this.fromStream(Q, B)
    }
    fromImpersonatedJSON(A) {
      var B, Q, I, G;
      if (!A) throw new Error("Must pass in a JSON object containing an  impersonated refresh token");
      if (A.type !== md.IMPERSONATED_ACCOUNT_TYPE) throw new Error(`The incoming JSON object does not have the "${md.IMPERSONATED_ACCOUNT_TYPE}" type`);
      if (!A.source_credentials) throw new Error("The incoming JSON object does not contain a source_credentials field");
      if (!A.service_account_impersonation_url) throw new Error("The incoming JSON object does not contain a service_account_impersonation_url field");
      let Z = this.fromJSON(A.source_credentials);
      if (((B = A.service_account_impersonation_url) === null || B === void 0 ? void 0 : B.length) > 256) throw new RangeError(`Target principal is too long: ${A.service_account_impersonation_url}`);
      let D = (I = (Q = /(?<target>[^/]+):(generateAccessToken|generateIdToken)$/.exec(A.service_account_impersonation_url)) === null || Q === void 0 ? void 0 : Q.groups) === null || I === void 0 ? void 0 : I.target;
      if (!D) throw new RangeError(`Cannot extract target principal from ${A.service_account_impersonation_url}`);
      let Y = (G = this.getAnyScopes()) !== null && G !== void 0 ? G : [];
      return new md.Impersonated({
        ...A,
        sourceClient: Z,
        targetPrincipal: D,
        targetScopes: Array.isArray(Y) ? Y : [Y]
      })
    }
    fromJSON(A, B = {}) {
      let Q, I = rX2.originalOrCamelOptions(B).get("universe_domain");
      if (A.type === aX2.USER_REFRESH_ACCOUNT_TYPE) Q = new aX2.UserRefreshClient(B), Q.fromJSON(A);
      else if (A.type === md.IMPERSONATED_ACCOUNT_TYPE) Q = this.fromImpersonatedJSON(A);
      else if (A.type === be.EXTERNAL_ACCOUNT_TYPE) Q = U95.ExternalAccountClient.fromJSON(A, B), Q.scopes = this.getAnyScopes();
      else if (A.type === sX2.EXTERNAL_ACCOUNT_AUTHORIZED_USER_TYPE) Q = new sX2.ExternalAccountAuthorizedUserClient(A, B);
      else B.scopes = this.scopes, Q = new hd.JWT(B), this.setGapicJWTValues(Q), Q.fromJSON(A);
      if (I) Q.universeDomain = I;
      return Q
    }
    _cacheClientFromJSON(A, B) {
      let Q = this.fromJSON(A, B);
      return this.jsonContent = A, this.cachedCredential = Q, Q
    }
    fromStream(A, B = {}, Q) {
      let I = {};
      if (typeof B === "function") Q = B;
      else I = B;
      if (Q) this.fromStreamAsync(A, I).then((G) => Q(null, G), Q);
      else return this.fromStreamAsync(A, I)
    }
    fromStreamAsync(A, B) {
      return new Promise((Q, I) => {
        if (!A) throw new Error("Must pass in a stream containing the Google auth settings.");
        let G = [];
        A.setEncoding("utf8").on("error", I).on("data", (Z) => G.push(Z)).on("end", () => {
          try {
            try {
              let Z = JSON.parse(G.join("")),
                D = this._cacheClientFromJSON(Z, B);
              return Q(D)
            } catch (Z) {
              if (!this.keyFilename) throw Z;
              let D = new hd.JWT({
                ...this.clientOptions,
                keyFile: this.keyFilename
              });
              return this.cachedCredential = D, this.setGapicJWTValues(D), Q(D)
            }
          } catch (Z) {
            return I(Z)
          }
        })
      })
    }
    fromAPIKey(A, B = {}) {
      return new hd.JWT({
        ...B,
        apiKey: A
      })
    }
    _isWindows() {
      let A = C95.platform();
      if (A && A.length >= 3) {
        if (A.substring(0, 3).toLowerCase() === "win") return !0
      }
      return !1
    }
    async getDefaultServiceProjectId() {
      return new Promise((A) => {
        V95.exec("gcloud config config-helper --format json", (B, Q) => {
          if (!B && Q) try {
            let I = JSON.parse(Q).configuration.properties.core.project;
            A(I);
            return
          } catch (I) {}
          A(null)
        })
      })
    }
    getProductionProjectId() {
      return process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || process.env.gcloud_project || process.env.google_cloud_project
    }
    async getFileProjectId() {
      if (this.cachedCredential) return this.cachedCredential.projectId;
      if (this.keyFilename) {
        let B = await this.getClient();
        if (B && B.projectId) return B.projectId
      }
      let A = await this._tryGetApplicationCredentialsFromEnvironmentVariable();
      if (A) return A.projectId;
      else return null
    }
    async getExternalAccountClientProjectId() {
      if (!this.jsonContent || this.jsonContent.type !== be.EXTERNAL_ACCOUNT_TYPE) return null;
      return await (await this.getClient()).getProjectId()
    }
    async getGCEProjectId() {
      try {
        return await ve.project("project-id")
      } catch (A) {
        return null
      }
    }
    getCredentials(A) {
      if (A) this.getCredentialsAsync().then((B) => A(null, B), A);
      else return this.getCredentialsAsync()
    }
    async getCredentialsAsync() {
      let A = await this.getClient();
      if (A instanceof md.Impersonated) return {
        client_email: A.getTargetPrincipal()
      };
      if (A instanceof be.BaseExternalAccountClient) {
        let B = A.getServiceAccountEmail();
        if (B) return {
          client_email: B,
          universe_domain: A.universeDomain
        }
      }
      if (this.jsonContent) return {
        client_email: this.jsonContent.client_email,
        private_key: this.jsonContent.private_key,
        universe_domain: this.jsonContent.universe_domain
      };
      if (await this._checkIsGCE()) {
        let [B, Q] = await Promise.all([ve.instance("service-accounts/default/email"), this.getUniverseDomain()]);
        return {
          client_email: B,
          universe_domain: Q
        }
      }
      throw new Error(bG.GoogleAuthExceptionMessages.NO_CREDENTIALS_FOUND)
    }
    async getClient() {
      if (this.cachedCredential) return this.cachedCredential;
      nX2(this, dd, EO(this, dd, "f") || EO(this, UO, "m", oX2).call(this), "f");
      try {
        return await EO(this, dd, "f")
      } finally {
        nX2(this, dd, null, "f")
      }
    }
    async getIdTokenClient(A) {
      let B = await this.getClient();
      if (!("fetchIdToken" in B)) throw new Error("Cannot fetch ID token in this environment, use GCE or set the GOOGLE_APPLICATION_CREDENTIALS environment variable to a service account credentials JSON file.");
      return new w95.IdTokenClient({
        targetAudience: A,
        idTokenProvider: B
      })
    }
    async getAccessToken() {
      return (await (await this.getClient()).getAccessToken()).token
    }
    async getRequestHeaders(A) {
      return (await this.getClient()).getRequestHeaders(A)
    }
    async authorizeRequest(A) {
      A = A || {};
      let B = A.url || A.uri,
        I = await (await this.getClient()).getRequestHeaders(B);
      return A.headers = Object.assign(A.headers || {}, I), A
    }
    async request(A) {
      return (await this.getClient()).request(A)
    }
    getEnv() {
      return E95.getEnv()
    }
    async sign(A, B) {
      let Q = await this.getClient(),
        I = await this.getUniverseDomain();
      if (B = B || `https://iamcredentials.${I}/v1/projects/-/serviceAccounts/`, Q instanceof md.Impersonated) return (await Q.sign(A)).signedBlob;
      let G = K95.createCrypto();
      if (Q instanceof hd.JWT && Q.key) return await G.sign(Q.key, A);
      let Z = await this.getCredentials();
      if (!Z.client_email) throw new Error("Cannot sign data without `client_email`.");
      return this.signBlob(G, Z.client_email, A, B)
    }
    async signBlob(A, B, Q, I) {
      let G = new URL(I + `${B}:signBlob`);
      return (await this.request({
        method: "POST",
        url: G.href,
        data: {
          payload: A.encodeBase64StringUtf8(Q)
        },
        retry: !0,
        retryConfig: {
          httpMethodsToRetry: ["POST"]
        }
      })).data.signedBlob
    }
  }
  bG.GoogleAuth = Ao1;
  dd = new WeakMap, UO = new WeakSet, ud = async function A(B, Q = process.env.GOOGLE_CLOUD_QUOTA_PROJECT || null) {
    let I = await this.getProjectIdOptional();
    if (Q) B.quotaProjectId = Q;
    return this.cachedCredential = B, {
      credential: B,
      projectId: I
    }
  }, oX2 = async function A() {
    if (this.jsonContent) return this._cacheClientFromJSON(this.jsonContent, this.clientOptions);
    else if (this.keyFilename) {
      let B = er1.resolve(this.keyFilename),
        Q = ge.createReadStream(B);
      return await this.fromStreamAsync(Q, this.clientOptions)
    } else if (this.apiKey) {
      let B = await this.fromAPIKey(this.apiKey, this.clientOptions);
      B.scopes = this.scopes;
      let {
        credential: Q
      } = await EO(this, UO, "m", ud).call(this, B);
      return Q
    } else {
      let {
        credential: B
      } = await this.getApplicationDefaultAsync(this.clientOptions);
      return B
    }
  };
  Ao1.DefaultTransporter = H95.DefaultTransporter
})
// @from(Start 7043462, End 7043879)
QV2 = z((AV2) => {
  Object.defineProperty(AV2, "__esModule", {
    value: !0
  });
  AV2.IAMAuth = void 0;
  class eX2 {
    constructor(A, B) {
      this.selector = A, this.token = B, this.selector = A, this.token = B
    }
    getRequestHeaders() {
      return {
        "x-goog-iam-authority-selector": this.selector,
        "x-goog-iam-authorization-token": this.token
      }
    }
  }
  AV2.IAMAuth = eX2
})
// @from(Start 7043885, End 7048215)
DV2 = z((GV2) => {
  Object.defineProperty(GV2, "__esModule", {
    value: !0
  });
  GV2.DownscopedClient = GV2.EXPIRATION_TIME_OFFSET = GV2.MAX_ACCESS_BOUNDARY_RULES_COUNT = void 0;
  var N95 = Z1("stream"),
    $95 = tw(),
    q95 = Mr1(),
    M95 = "urn:ietf:params:oauth:grant-type:token-exchange",
    L95 = "urn:ietf:params:oauth:token-type:access_token",
    R95 = "urn:ietf:params:oauth:token-type:access_token";
  GV2.MAX_ACCESS_BOUNDARY_RULES_COUNT = 10;
  GV2.EXPIRATION_TIME_OFFSET = 300000;
  class IV2 extends $95.AuthClient {
    constructor(A, B, Q, I) {
      super({
        ...Q,
        quotaProjectId: I
      });
      if (this.authClient = A, this.credentialAccessBoundary = B, B.accessBoundary.accessBoundaryRules.length === 0) throw new Error("At least one access boundary rule needs to be defined.");
      else if (B.accessBoundary.accessBoundaryRules.length > GV2.MAX_ACCESS_BOUNDARY_RULES_COUNT) throw new Error(`The provided access boundary has more than ${GV2.MAX_ACCESS_BOUNDARY_RULES_COUNT} access boundary rules.`);
      for (let G of B.accessBoundary.accessBoundaryRules)
        if (G.availablePermissions.length === 0) throw new Error("At least one permission should be defined in access boundary rules.");
      this.stsCredential = new q95.StsCredentials(`https://sts.${this.universeDomain}/v1/token`), this.cachedDownscopedAccessToken = null
    }
    setCredentials(A) {
      if (!A.expiry_date) throw new Error("The access token expiry_date field is missing in the provided credentials.");
      super.setCredentials(A), this.cachedDownscopedAccessToken = A
    }
    async getAccessToken() {
      if (!this.cachedDownscopedAccessToken || this.isExpired(this.cachedDownscopedAccessToken)) await this.refreshAccessTokenAsync();
      return {
        token: this.cachedDownscopedAccessToken.access_token,
        expirationTime: this.cachedDownscopedAccessToken.expiry_date,
        res: this.cachedDownscopedAccessToken.res
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
            D = G.config.data instanceof N95.Readable;
          if (!B && (Z === 401 || Z === 403) && !D && this.forceRefreshOnFailure) return await this.refreshAccessTokenAsync(), await this.requestAsync(A, !0)
        }
        throw I
      }
      return Q
    }
    async refreshAccessTokenAsync() {
      var A;
      let B = (await this.authClient.getAccessToken()).token,
        Q = {
          grantType: M95,
          requestedTokenType: L95,
          subjectToken: B,
          subjectTokenType: R95
        },
        I = await this.stsCredential.exchangeToken(Q, void 0, this.credentialAccessBoundary),
        G = ((A = this.authClient.credentials) === null || A === void 0 ? void 0 : A.expiry_date) || null,
        Z = I.expires_in ? new Date().getTime() + I.expires_in * 1000 : G;
      return this.cachedDownscopedAccessToken = {
        access_token: I.access_token,
        expiry_date: Z,
        res: I.res
      }, this.credentials = {}, Object.assign(this.credentials, this.cachedDownscopedAccessToken), delete this.credentials.res, this.emit("tokens", {
        refresh_token: null,
        expiry_date: this.cachedDownscopedAccessToken.expiry_date,
        access_token: this.cachedDownscopedAccessToken.access_token,
        token_type: "Bearer",
        id_token: null
      }), this.cachedDownscopedAccessToken
    }
    isExpired(A) {
      let B = new Date().getTime();
      return A.expiry_date ? B >= A.expiry_date - this.eagerRefreshThresholdMillis : !1
    }
  }
  GV2.DownscopedClient = IV2
})
// @from(Start 7048221, End 7048650)
JV2 = z((YV2) => {
  Object.defineProperty(YV2, "__esModule", {
    value: !0
  });
  YV2.PassThroughClient = void 0;
  var T95 = tw();
  class Qo1 extends T95.AuthClient {
    async request(A) {
      return this.transporter.request(A)
    }
    async getAccessToken() {
      return {}
    }
    async getRequestHeaders() {
      return {}
    }
  }
  YV2.PassThroughClient = Qo1;
  var P95 = new Qo1;
  P95.getAccessToken()
})
// @from(Start 7048656, End 7053115)
CV2 = z((i8) => {
  Object.defineProperty(i8, "__esModule", {
    value: !0
  });
  i8.GoogleAuth = i8.auth = i8.DefaultTransporter = i8.PassThroughClient = i8.ExecutableError = i8.PluggableAuthClient = i8.DownscopedClient = i8.BaseExternalAccountClient = i8.ExternalAccountClient = i8.IdentityPoolClient = i8.AwsRequestSigner = i8.AwsClient = i8.UserRefreshClient = i8.LoginTicket = i8.ClientAuthentication = i8.OAuth2Client = i8.CodeChallengeMethod = i8.Impersonated = i8.JWT = i8.JWTAccess = i8.IdTokenClient = i8.IAMAuth = i8.GCPEnv = i8.Compute = i8.DEFAULT_UNIVERSE = i8.AuthClient = i8.gaxios = i8.gcpMetadata = void 0;
  var FV2 = tX2();
  Object.defineProperty(i8, "GoogleAuth", {
    enumerable: !0,
    get: function() {
      return FV2.GoogleAuth
    }
  });
  i8.gcpMetadata = Re();
  i8.gaxios = NK();
  var XV2 = tw();
  Object.defineProperty(i8, "AuthClient", {
    enumerable: !0,
    get: function() {
      return XV2.AuthClient
    }
  });
  Object.defineProperty(i8, "DEFAULT_UNIVERSE", {
    enumerable: !0,
    get: function() {
      return XV2.DEFAULT_UNIVERSE
    }
  });
  var S95 = Br1();
  Object.defineProperty(i8, "Compute", {
    enumerable: !0,
    get: function() {
      return S95.Compute
    }
  });
  var _95 = Ir1();
  Object.defineProperty(i8, "GCPEnv", {
    enumerable: !0,
    get: function() {
      return _95.GCPEnv
    }
  });
  var j95 = QV2();
  Object.defineProperty(i8, "IAMAuth", {
    enumerable: !0,
    get: function() {
      return j95.IAMAuth
    }
  });
  var y95 = Qr1();
  Object.defineProperty(i8, "IdTokenClient", {
    enumerable: !0,
    get: function() {
      return y95.IdTokenClient
    }
  });
  var k95 = zr1();
  Object.defineProperty(i8, "JWTAccess", {
    enumerable: !0,
    get: function() {
      return k95.JWTAccess
    }
  });
  var x95 = Er1();
  Object.defineProperty(i8, "JWT", {
    enumerable: !0,
    get: function() {
      return x95.JWT
    }
  });
  var f95 = Nr1();
  Object.defineProperty(i8, "Impersonated", {
    enumerable: !0,
    get: function() {
      return f95.Impersonated
    }
  });
  var Io1 = tj();
  Object.defineProperty(i8, "CodeChallengeMethod", {
    enumerable: !0,
    get: function() {
      return Io1.CodeChallengeMethod
    }
  });
  Object.defineProperty(i8, "OAuth2Client", {
    enumerable: !0,
    get: function() {
      return Io1.OAuth2Client
    }
  });
  Object.defineProperty(i8, "ClientAuthentication", {
    enumerable: !0,
    get: function() {
      return Io1.ClientAuthentication
    }
  });
  var v95 = ts1();
  Object.defineProperty(i8, "LoginTicket", {
    enumerable: !0,
    get: function() {
      return v95.LoginTicket
    }
  });
  var b95 = Ur1();
  Object.defineProperty(i8, "UserRefreshClient", {
    enumerable: !0,
    get: function() {
      return b95.UserRefreshClient
    }
  });
  var g95 = gr1();
  Object.defineProperty(i8, "AwsClient", {
    enumerable: !0,
    get: function() {
      return g95.AwsClient
    }
  });
  var h95 = fr1();
  Object.defineProperty(i8, "AwsRequestSigner", {
    enumerable: !0,
    get: function() {
      return h95.AwsRequestSigner
    }
  });
  var m95 = xr1();
  Object.defineProperty(i8, "IdentityPoolClient", {
    enumerable: !0,
    get: function() {
      return m95.IdentityPoolClient
    }
  });
  var d95 = rr1();
  Object.defineProperty(i8, "ExternalAccountClient", {
    enumerable: !0,
    get: function() {
      return d95.ExternalAccountClient
    }
  });
  var u95 = wO();
  Object.defineProperty(i8, "BaseExternalAccountClient", {
    enumerable: !0,
    get: function() {
      return u95.BaseExternalAccountClient
    }
  });
  var p95 = DV2();
  Object.defineProperty(i8, "DownscopedClient", {
    enumerable: !0,
    get: function() {
      return p95.DownscopedClient
    }
  });
  var VV2 = PC1();
  Object.defineProperty(i8, "PluggableAuthClient", {
    enumerable: !0,
    get: function() {
      return VV2.PluggableAuthClient
    }
  });
  Object.defineProperty(i8, "ExecutableError", {
    enumerable: !0,
    get: function() {
      return VV2.ExecutableError
    }
  });
  var c95 = JV2();
  Object.defineProperty(i8, "PassThroughClient", {
    enumerable: !0,
    get: function() {
      return c95.PassThroughClient
    }
  });
  var l95 = Te();
  Object.defineProperty(i8, "DefaultTransporter", {
    enumerable: !0,
    get: function() {
      return l95.DefaultTransporter
    }
  });
  var i95 = new FV2.GoogleAuth;
  i8.auth = i95
})
// @from(Start 7053121, End 7061548)
Yo1 = z((U45) => {
  function yV2() {
    var A = {};
    return A["align-content"] = !1, A["align-items"] = !1, A["align-self"] = !1, A["alignment-adjust"] = !1, A["alignment-baseline"] = !1, A.all = !1, A["anchor-point"] = !1, A.animation = !1, A["animation-delay"] = !1, A["animation-direction"] = !1, A["animation-duration"] = !1, A["animation-fill-mode"] = !1, A["animation-iteration-count"] = !1, A["animation-name"] = !1, A["animation-play-state"] = !1, A["animation-timing-function"] = !1, A.azimuth = !1, A["backface-visibility"] = !1, A.background = !0, A["background-attachment"] = !0, A["background-clip"] = !0, A["background-color"] = !0, A["background-image"] = !0, A["background-origin"] = !0, A["background-position"] = !0, A["background-repeat"] = !0, A["background-size"] = !0, A["baseline-shift"] = !1, A.binding = !1, A.bleed = !1, A["bookmark-label"] = !1, A["bookmark-level"] = !1, A["bookmark-state"] = !1, A.border = !0, A["border-bottom"] = !0, A["border-bottom-color"] = !0, A["border-bottom-left-radius"] = !0, A["border-bottom-right-radius"] = !0, A["border-bottom-style"] = !0, A["border-bottom-width"] = !0, A["border-collapse"] = !0, A["border-color"] = !0, A["border-image"] = !0, A["border-image-outset"] = !0, A["border-image-repeat"] = !0, A["border-image-slice"] = !0, A["border-image-source"] = !0, A["border-image-width"] = !0, A["border-left"] = !0, A["border-left-color"] = !0, A["border-left-style"] = !0, A["border-left-width"] = !0, A["border-radius"] = !0, A["border-right"] = !0, A["border-right-color"] = !0, A["border-right-style"] = !0, A["border-right-width"] = !0, A["border-spacing"] = !0, A["border-style"] = !0, A["border-top"] = !0, A["border-top-color"] = !0, A["border-top-left-radius"] = !0, A["border-top-right-radius"] = !0, A["border-top-style"] = !0, A["border-top-width"] = !0, A["border-width"] = !0, A.bottom = !1, A["box-decoration-break"] = !0, A["box-shadow"] = !0, A["box-sizing"] = !0, A["box-snap"] = !0, A["box-suppress"] = !0, A["break-after"] = !0, A["break-before"] = !0, A["break-inside"] = !0, A["caption-side"] = !1, A.chains = !1, A.clear = !0, A.clip = !1, A["clip-path"] = !1, A["clip-rule"] = !1, A.color = !0, A["color-interpolation-filters"] = !0, A["column-count"] = !1, A["column-fill"] = !1, A["column-gap"] = !1, A["column-rule"] = !1, A["column-rule-color"] = !1, A["column-rule-style"] = !1, A["column-rule-width"] = !1, A["column-span"] = !1, A["column-width"] = !1, A.columns = !1, A.contain = !1, A.content = !1, A["counter-increment"] = !1, A["counter-reset"] = !1, A["counter-set"] = !1, A.crop = !1, A.cue = !1, A["cue-after"] = !1, A["cue-before"] = !1, A.cursor = !1, A.direction = !1, A.display = !0, A["display-inside"] = !0, A["display-list"] = !0, A["display-outside"] = !0, A["dominant-baseline"] = !1, A.elevation = !1, A["empty-cells"] = !1, A.filter = !1, A.flex = !1, A["flex-basis"] = !1, A["flex-direction"] = !1, A["flex-flow"] = !1, A["flex-grow"] = !1, A["flex-shrink"] = !1, A["flex-wrap"] = !1, A.float = !1, A["float-offset"] = !1, A["flood-color"] = !1, A["flood-opacity"] = !1, A["flow-from"] = !1, A["flow-into"] = !1, A.font = !0, A["font-family"] = !0, A["font-feature-settings"] = !0, A["font-kerning"] = !0, A["font-language-override"] = !0, A["font-size"] = !0, A["font-size-adjust"] = !0, A["font-stretch"] = !0, A["font-style"] = !0, A["font-synthesis"] = !0, A["font-variant"] = !0, A["font-variant-alternates"] = !0, A["font-variant-caps"] = !0, A["font-variant-east-asian"] = !0, A["font-variant-ligatures"] = !0, A["font-variant-numeric"] = !0, A["font-variant-position"] = !0, A["font-weight"] = !0, A.grid = !1, A["grid-area"] = !1, A["grid-auto-columns"] = !1, A["grid-auto-flow"] = !1, A["grid-auto-rows"] = !1, A["grid-column"] = !1, A["grid-column-end"] = !1, A["grid-column-start"] = !1, A["grid-row"] = !1, A["grid-row-end"] = !1, A["grid-row-start"] = !1, A["grid-template"] = !1, A["grid-template-areas"] = !1, A["grid-template-columns"] = !1, A["grid-template-rows"] = !1, A["hanging-punctuation"] = !1, A.height = !0, A.hyphens = !1, A.icon = !1, A["image-orientation"] = !1, A["image-resolution"] = !1, A["ime-mode"] = !1, A["initial-letters"] = !1, A["inline-box-align"] = !1, A["justify-content"] = !1, A["justify-items"] = !1, A["justify-self"] = !1, A.left = !1, A["letter-spacing"] = !0, A["lighting-color"] = !0, A["line-box-contain"] = !1, A["line-break"] = !1, A["line-grid"] = !1, A["line-height"] = !1, A["line-snap"] = !1, A["line-stacking"] = !1, A["line-stacking-ruby"] = !1, A["line-stacking-shift"] = !1, A["line-stacking-strategy"] = !1, A["list-style"] = !0, A["list-style-image"] = !0, A["list-style-position"] = !0, A["list-style-type"] = !0, A.margin = !0, A["margin-bottom"] = !0, A["margin-left"] = !0, A["margin-right"] = !0, A["margin-top"] = !0, A["marker-offset"] = !1, A["marker-side"] = !1, A.marks = !1, A.mask = !1, A["mask-box"] = !1, A["mask-box-outset"] = !1, A["mask-box-repeat"] = !1, A["mask-box-slice"] = !1, A["mask-box-source"] = !1, A["mask-box-width"] = !1, A["mask-clip"] = !1, A["mask-image"] = !1, A["mask-origin"] = !1, A["mask-position"] = !1, A["mask-repeat"] = !1, A["mask-size"] = !1, A["mask-source-type"] = !1, A["mask-type"] = !1, A["max-height"] = !0, A["max-lines"] = !1, A["max-width"] = !0, A["min-height"] = !0, A["min-width"] = !0, A["move-to"] = !1, A["nav-down"] = !1, A["nav-index"] = !1, A["nav-left"] = !1, A["nav-right"] = !1, A["nav-up"] = !1, A["object-fit"] = !1, A["object-position"] = !1, A.opacity = !1, A.order = !1, A.orphans = !1, A.outline = !1, A["outline-color"] = !1, A["outline-offset"] = !1, A["outline-style"] = !1, A["outline-width"] = !1, A.overflow = !1, A["overflow-wrap"] = !1, A["overflow-x"] = !1, A["overflow-y"] = !1, A.padding = !0, A["padding-bottom"] = !0, A["padding-left"] = !0, A["padding-right"] = !0, A["padding-top"] = !0, A.page = !1, A["page-break-after"] = !1, A["page-break-before"] = !1, A["page-break-inside"] = !1, A["page-policy"] = !1, A.pause = !1, A["pause-after"] = !1, A["pause-before"] = !1, A.perspective = !1, A["perspective-origin"] = !1, A.pitch = !1, A["pitch-range"] = !1, A["play-during"] = !1, A.position = !1, A["presentation-level"] = !1, A.quotes = !1, A["region-fragment"] = !1, A.resize = !1, A.rest = !1, A["rest-after"] = !1, A["rest-before"] = !1, A.richness = !1, A.right = !1, A.rotation = !1, A["rotation-point"] = !1, A["ruby-align"] = !1, A["ruby-merge"] = !1, A["ruby-position"] = !1, A["shape-image-threshold"] = !1, A["shape-outside"] = !1, A["shape-margin"] = !1, A.size = !1, A.speak = !1, A["speak-as"] = !1, A["speak-header"] = !1, A["speak-numeral"] = !1, A["speak-punctuation"] = !1, A["speech-rate"] = !1, A.stress = !1, A["string-set"] = !1, A["tab-size"] = !1, A["table-layout"] = !1, A["text-align"] = !0, A["text-align-last"] = !0, A["text-combine-upright"] = !0, A["text-decoration"] = !0, A["text-decoration-color"] = !0, A["text-decoration-line"] = !0, A["text-decoration-skip"] = !0, A["text-decoration-style"] = !0, A["text-emphasis"] = !0, A["text-emphasis-color"] = !0, A["text-emphasis-position"] = !0, A["text-emphasis-style"] = !0, A["text-height"] = !0, A["text-indent"] = !0, A["text-justify"] = !0, A["text-orientation"] = !0, A["text-overflow"] = !0, A["text-shadow"] = !0, A["text-space-collapse"] = !0, A["text-transform"] = !0, A["text-underline-position"] = !0, A["text-wrap"] = !0, A.top = !1, A.transform = !1, A["transform-origin"] = !1, A["transform-style"] = !1, A.transition = !1, A["transition-delay"] = !1, A["transition-duration"] = !1, A["transition-property"] = !1, A["transition-timing-function"] = !1, A["unicode-bidi"] = !1, A["vertical-align"] = !1, A.visibility = !1, A["voice-balance"] = !1, A["voice-duration"] = !1, A["voice-family"] = !1, A["voice-pitch"] = !1, A["voice-range"] = !1, A["voice-rate"] = !1, A["voice-stress"] = !1, A["voice-volume"] = !1, A.volume = !1, A["white-space"] = !1, A.widows = !1, A.width = !0, A["will-change"] = !1, A["word-break"] = !0, A["word-spacing"] = !0, A["word-wrap"] = !0, A["wrap-flow"] = !1, A["wrap-through"] = !1, A["writing-mode"] = !1, A["z-index"] = !1, A
  }

  function H45(A, B, Q) {}

  function z45(A, B, Q) {}
  var w45 = /javascript\s*\:/img;

  function E45(A, B) {
    if (w45.test(B)) return "";
    return B
  }
  U45.whiteList = yV2();
  U45.getDefaultWhiteList = yV2;
  U45.onAttr = H45;
  U45.onIgnoreAttr = z45;
  U45.safeAttrValue = E45
})
// @from(Start 7061554, End 7062245)
Wo1 = z((Il8, kV2) => {
  kV2.exports = {
    indexOf: function(A, B) {
      var Q, I;
      if (Array.prototype.indexOf) return A.indexOf(B);
      for (Q = 0, I = A.length; Q < I; Q++)
        if (A[Q] === B) return Q;
      return -1
    },
    forEach: function(A, B, Q) {
      var I, G;
      if (Array.prototype.forEach) return A.forEach(B, Q);
      for (I = 0, G = A.length; I < G; I++) B.call(Q, A[I], I, A)
    },
    trim: function(A) {
      if (String.prototype.trim) return A.trim();
      return A.replace(/(^\s*)|(\s*$)/g, "")
    },
    trimRight: function(A) {
      if (String.prototype.trimRight) return A.trimRight();
      return A.replace(/(\s*$)/g, "")
    }
  }
})
// @from(Start 7062251, End 7063227)
fV2 = z((Gl8, xV2) => {
  var de = Wo1();

  function R45(A, B) {
    if (A = de.trimRight(A), A[A.length - 1] !== ";") A += ";";
    var Q = A.length,
      I = !1,
      G = 0,
      Z = 0,
      D = "";

    function Y() {
      if (!I) {
        var F = de.trim(A.slice(G, Z)),
          X = F.indexOf(":");
        if (X !== -1) {
          var V = de.trim(F.slice(0, X)),
            C = de.trim(F.slice(X + 1));
          if (V) {
            var K = B(G, D.length, V, C, F);
            if (K) D += K + "; "
          }
        }
      }
      G = Z + 1
    }
    for (; Z < Q; Z++) {
      var W = A[Z];
      if (W === "/" && A[Z + 1] === "*") {
        var J = A.indexOf("*/", Z + 2);
        if (J === -1) break;
        Z = J + 1, G = Z + 1, I = !1
      } else if (W === "(") I = !0;
      else if (W === ")") I = !1;
      else if (W === ";")
        if (I);
        else Y();
      else if (W === `
`) Y()
    }
    return de.trim(D)
  }
  xV2.exports = R45
})
// @from(Start 7063233, End 7064601)
hV2 = z((Dl8, gV2) => {
  var vC1 = Yo1(),
    O45 = fV2(),
    Zl8 = Wo1();

  function vV2(A) {
    return A === void 0 || A === null
  }

  function T45(A) {
    var B = {};
    for (var Q in A) B[Q] = A[Q];
    return B
  }

  function bV2(A) {
    A = T45(A || {}), A.whiteList = A.whiteList || vC1.whiteList, A.onAttr = A.onAttr || vC1.onAttr, A.onIgnoreAttr = A.onIgnoreAttr || vC1.onIgnoreAttr, A.safeAttrValue = A.safeAttrValue || vC1.safeAttrValue, this.options = A
  }
  bV2.prototype.process = function(A) {
    if (A = A || "", A = A.toString(), !A) return "";
    var B = this,
      Q = B.options,
      I = Q.whiteList,
      G = Q.onAttr,
      Z = Q.onIgnoreAttr,
      D = Q.safeAttrValue,
      Y = O45(A, function(W, J, F, X, V) {
        var C = I[F],
          K = !1;
        if (C === !0) K = C;
        else if (typeof C === "function") K = C(X);
        else if (C instanceof RegExp) K = C.test(X);
        if (K !== !0) K = !1;
        if (X = D(F, X), !X) return;
        var E = {
          position: J,
          sourcePosition: W,
          source: V,
          isWhite: K
        };
        if (K) {
          var N = G(F, X, E);
          if (vV2(N)) return F + ":" + X;
          else return N
        } else {
          var N = Z(F, X, E);
          if (!vV2(N)) return N
        }
      });
    return Y
  };
  gV2.exports = bV2
})
// @from(Start 7064607, End 7064914)
hC1 = z((gC1, Jo1) => {
  var mV2 = Yo1(),
    dV2 = hV2();

  function P45(A, B) {
    var Q = new dV2(B);
    return Q.process(A)
  }
  gC1 = Jo1.exports = P45;
  gC1.FilterCSS = dV2;
  for (bC1 in mV2) gC1[bC1] = mV2[bC1];
  var bC1;
  if (typeof window !== "undefined") window.filterCSS = Jo1.exports
})
// @from(Start 7064920, End 7065593)
mC1 = z((Yl8, uV2) => {
  uV2.exports = {
    indexOf: function(A, B) {
      var Q, I;
      if (Array.prototype.indexOf) return A.indexOf(B);
      for (Q = 0, I = A.length; Q < I; Q++)
        if (A[Q] === B) return Q;
      return -1
    },
    forEach: function(A, B, Q) {
      var I, G;
      if (Array.prototype.forEach) return A.forEach(B, Q);
      for (I = 0, G = A.length; I < G; I++) B.call(Q, A[I], I, A)
    },
    trim: function(A) {
      if (String.prototype.trim) return A.trim();
      return A.replace(/(^\s*)|(\s*$)/g, "")
    },
    spaceIndex: function(A) {
      var B = /\s|\n|\t/,
        Q = B.exec(A);
      return Q ? Q.index : -1
    }
  }
})
// @from(Start 7065599, End 7071594)
Fo1 = z((n45) => {
  var S45 = hC1().FilterCSS,
    _45 = hC1().getDefaultWhiteList,
    uC1 = mC1();

  function lV2() {
    return {
      a: ["target", "href", "title"],
      abbr: ["title"],
      address: [],
      area: ["shape", "coords", "href", "alt"],
      article: [],
      aside: [],
      audio: ["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"],
      b: [],
      bdi: ["dir"],
      bdo: ["dir"],
      big: [],
      blockquote: ["cite"],
      br: [],
      caption: [],
      center: [],
      cite: [],
      code: [],
      col: ["align", "valign", "span", "width"],
      colgroup: ["align", "valign", "span", "width"],
      dd: [],
      del: ["datetime"],
      details: ["open"],
      div: [],
      dl: [],
      dt: [],
      em: [],
      figcaption: [],
      figure: [],
      font: ["color", "size", "face"],
      footer: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      header: [],
      hr: [],
      i: [],
      img: ["src", "alt", "title", "width", "height", "loading"],
      ins: ["datetime"],
      kbd: [],
      li: [],
      mark: [],
      nav: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      section: [],
      small: [],
      span: [],
      sub: [],
      summary: [],
      sup: [],
      strong: [],
      strike: [],
      table: ["width", "border", "align", "valign"],
      tbody: ["align", "valign"],
      td: ["width", "rowspan", "colspan", "align", "valign"],
      tfoot: ["align", "valign"],
      th: ["width", "rowspan", "colspan", "align", "valign"],
      thead: ["align", "valign"],
      tr: ["rowspan", "align", "valign"],
      tt: [],
      u: [],
      ul: [],
      video: ["autoplay", "controls", "crossorigin", "loop", "muted", "playsinline", "poster", "preload", "src", "height", "width"]
    }
  }
  var iV2 = new S45;

  function j45(A, B, Q) {}

  function y45(A, B, Q) {}

  function k45(A, B, Q) {}

  function x45(A, B, Q) {}

  function nV2(A) {
    return A.replace(v45, "&lt;").replace(b45, "&gt;")
  }

  function f45(A, B, Q, I) {
    if (Q = eV2(Q), B === "href" || B === "src") {
      if (Q = uC1.trim(Q), Q === "#") return "#";
      if (!(Q.substr(0, 7) === "http://" || Q.substr(0, 8) === "https://" || Q.substr(0, 7) === "mailto:" || Q.substr(0, 4) === "tel:" || Q.substr(0, 11) === "data:image/" || Q.substr(0, 6) === "ftp://" || Q.substr(0, 2) === "./" || Q.substr(0, 3) === "../" || Q[0] === "#" || Q[0] === "/")) return ""
    } else if (B === "background") {
      if (dC1.lastIndex = 0, dC1.test(Q)) return ""
    } else if (B === "style") {
      if (pV2.lastIndex = 0, pV2.test(Q)) return "";
      if (cV2.lastIndex = 0, cV2.test(Q)) {
        if (dC1.lastIndex = 0, dC1.test(Q)) return ""
      }
      if (I !== !1) I = I || iV2, Q = I.process(Q)
    }
    return Q = AC2(Q), Q
  }
  var v45 = /</g,
    b45 = />/g,
    g45 = /"/g,
    h45 = /&quot;/g,
    m45 = /&#([a-zA-Z0-9]*);?/gim,
    d45 = /&colon;?/gim,
    u45 = /&newline;?/gim,
    dC1 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi,
    pV2 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,
    cV2 = /u\s*r\s*l\s*\(.*/gi;

  function aV2(A) {
    return A.replace(g45, "&quot;")
  }

  function sV2(A) {
    return A.replace(h45, '"')
  }

  function rV2(A) {
    return A.replace(m45, function B(Q, I) {
      return I[0] === "x" || I[0] === "X" ? String.fromCharCode(parseInt(I.substr(1), 16)) : String.fromCharCode(parseInt(I, 10))
    })
  }

  function oV2(A) {
    return A.replace(d45, ":").replace(u45, " ")
  }

  function tV2(A) {
    var B = "";
    for (var Q = 0, I = A.length; Q < I; Q++) B += A.charCodeAt(Q) < 32 ? " " : A.charAt(Q);
    return uC1.trim(B)
  }

  function eV2(A) {
    return A = sV2(A), A = rV2(A), A = oV2(A), A = tV2(A), A
  }

  function AC2(A) {
    return A = aV2(A), A = nV2(A), A
  }

  function p45() {
    return ""
  }

  function c45(A, B) {
    if (typeof B !== "function") B = function() {};
    var Q = !Array.isArray(A);

    function I(D) {
      if (Q) return !0;
      return uC1.indexOf(A, D) !== -1
    }
    var G = [],
      Z = !1;
    return {
      onIgnoreTag: function(D, Y, W) {
        if (I(D))
          if (W.isClosing) {
            var J = "[/removed]",
              F = W.position + J.length;
            return G.push([Z !== !1 ? Z : W.position, F]), Z = !1, J
          } else {
            if (!Z) Z = W.position;
            return "[removed]"
          }
        else return B(D, Y, W)
      },
      remove: function(D) {
        var Y = "",
          W = 0;
        return uC1.forEach(G, function(J) {
          Y += D.slice(W, J[0]), W = J[1]
        }), Y += D.slice(W), Y
      }
    }
  }

  function l45(A) {
    var B = "",
      Q = 0;
    while (Q < A.length) {
      var I = A.indexOf("<!--", Q);
      if (I === -1) {
        B += A.slice(Q);
        break
      }
      B += A.slice(Q, I);
      var G = A.indexOf("-->", I);
      if (G === -1) break;
      Q = G + 3
    }
    return B
  }

  function i45(A) {
    var B = A.split("");
    return B = B.filter(function(Q) {
      var I = Q.charCodeAt(0);
      if (I === 127) return !1;
      if (I <= 31) {
        if (I === 10 || I === 13) return !0;
        return !1
      }
      return !0
    }), B.join("")
  }
  n45.whiteList = lV2();
  n45.getDefaultWhiteList = lV2;
  n45.onTag = j45;
  n45.onIgnoreTag = y45;
  n45.onTagAttr = k45;
  n45.onIgnoreTagAttr = x45;
  n45.safeAttrValue = f45;
  n45.escapeHtml = nV2;
  n45.escapeQuote = aV2;
  n45.unescapeQuote = sV2;
  n45.escapeHtmlEntities = rV2;
  n45.escapeDangerHtml5Entities = oV2;
  n45.clearNonPrintableCharacter = tV2;
  n45.friendlyAttrValue = eV2;
  n45.escapeAttrValue = AC2;
  n45.onIgnoreTagStripAll = p45;
  n45.StripTagBody = c45;
  n45.stripCommentTag = l45;
  n45.stripBlankChar = i45;
  n45.attributeWrapSign = '"';
  n45.cssFilter = iV2;
  n45.getDefaultCSSWhiteList = _45
})
// @from(Start 7071600, End 7075158)
Xo1 = z((R65) => {
  var $O = mC1();

  function z65(A) {
    var B = $O.spaceIndex(A),
      Q;
    if (B === -1) Q = A.slice(1, -1);
    else Q = A.slice(1, B + 1);
    if (Q = $O.trim(Q).toLowerCase(), Q.slice(0, 1) === "/") Q = Q.slice(1);
    if (Q.slice(-1) === "/") Q = Q.slice(0, -1);
    return Q
  }

  function w65(A) {
    return A.slice(0, 2) === "</"
  }

  function E65(A, B, Q) {
    var I = "",
      G = 0,
      Z = !1,
      D = !1,
      Y = 0,
      W = A.length,
      J = "",
      F = "";
    A: for (Y = 0; Y < W; Y++) {
      var X = A.charAt(Y);
      if (Z === !1) {
        if (X === "<") {
          Z = Y;
          continue
        }
      } else if (D === !1) {
        if (X === "<") {
          I += Q(A.slice(G, Y)), Z = Y, G = Y;
          continue
        }
        if (X === ">" || Y === W - 1) {
          I += Q(A.slice(G, Z)), F = A.slice(Z, Y + 1), J = z65(F), I += B(Z, I.length, J, F, w65(F)), G = Y + 1, Z = !1;
          continue
        }
        if (X === '"' || X === "'") {
          var V = 1,
            C = A.charAt(Y - V);
          while (C.trim() === "" || C === "=") {
            if (C === "=") {
              D = X;
              continue A
            }
            C = A.charAt(Y - ++V)
          }
        }
      } else if (X === D) {
        D = !1;
        continue
      }
    }
    if (G < W) I += Q(A.substr(G));
    return I
  }
  var U65 = /[^a-zA-Z0-9\\_:.-]/gim;

  function N65(A, B) {
    var Q = 0,
      I = 0,
      G = [],
      Z = !1,
      D = A.length;

    function Y(V, C) {
      if (V = $O.trim(V), V = V.replace(U65, "").toLowerCase(), V.length < 1) return;
      var K = B(V, C || "");
      if (K) G.push(K)
    }
    for (var W = 0; W < D; W++) {
      var J = A.charAt(W),
        F, X;
      if (Z === !1 && J === "=") {
        Z = A.slice(Q, W), Q = W + 1, I = A.charAt(Q) === '"' || A.charAt(Q) === "'" ? Q : q65(A, W + 1);
        continue
      }
      if (Z !== !1) {
        if (W === I)
          if (X = A.indexOf(J, W + 1), X === -1) break;
          else {
            F = $O.trim(A.slice(I + 1, X)), Y(Z, F), Z = !1, W = X, Q = W + 1;
            continue
          }
      }
      if (/\s|\n|\t/.test(J))
        if (A = A.replace(/\s|\n|\t/g, " "), Z === !1)
          if (X = $65(A, W), X === -1) {
            F = $O.trim(A.slice(Q, W)), Y(F), Z = !1, Q = W + 1;
            continue
          } else {
            W = X - 1;
            continue
          }
      else if (X = M65(A, W - 1), X === -1) {
        F = $O.trim(A.slice(Q, W)), F = BC2(F), Y(Z, F), Z = !1, Q = W + 1;
        continue
      } else continue
    }
    if (Q < A.length)
      if (Z === !1) Y(A.slice(Q));
      else Y(Z, BC2($O.trim(A.slice(Q))));
    return $O.trim(G.join(" "))
  }

  function $65(A, B) {
    for (; B < A.length; B++) {
      var Q = A[B];
      if (Q === " ") continue;
      if (Q === "=") return B;
      return -1
    }
  }

  function q65(A, B) {
    for (; B < A.length; B++) {
      var Q = A[B];
      if (Q === " ") continue;
      if (Q === "'" || Q === '"') return B;
      return -1
    }
  }

  function M65(A, B) {
    for (; B > 0; B--) {
      var Q = A[B];
      if (Q === " ") continue;
      if (Q === "=") return B;
      return -1
    }
  }

  function L65(A) {
    if (A[0] === '"' && A[A.length - 1] === '"' || A[0] === "'" && A[A.length - 1] === "'") return !0;
    else return !1
  }

  function BC2(A) {
    if (L65(A)) return A.substr(1, A.length - 2);
    else return A
  }
  R65.parseTag = E65;
  R65.parseAttr = N65
})
// @from(Start 7075164, End 7078502)
ZC2 = z((Fl8, GC2) => {
  var P65 = hC1().FilterCSS,
    ZV = Fo1(),
    QC2 = Xo1(),
    S65 = QC2.parseTag,
    _65 = QC2.parseAttr,
    cC1 = mC1();

  function pC1(A) {
    return A === void 0 || A === null
  }

  function j65(A) {
    var B = cC1.spaceIndex(A);
    if (B === -1) return {
      html: "",
      closing: A[A.length - 2] === "/"
    };
    A = cC1.trim(A.slice(B + 1, -1));
    var Q = A[A.length - 1] === "/";
    if (Q) A = cC1.trim(A.slice(0, -1));
    return {
      html: A,
      closing: Q
    }
  }

  function y65(A) {
    var B = {};
    for (var Q in A) B[Q] = A[Q];
    return B
  }

  function k65(A) {
    var B = {};
    for (var Q in A)
      if (Array.isArray(A[Q])) B[Q.toLowerCase()] = A[Q].map(function(I) {
        return I.toLowerCase()
      });
      else B[Q.toLowerCase()] = A[Q];
    return B
  }

  function IC2(A) {
    if (A = y65(A || {}), A.stripIgnoreTag) {
      if (A.onIgnoreTag) console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time');
      A.onIgnoreTag = ZV.onIgnoreTagStripAll
    }
    if (A.whiteList || A.allowList) A.whiteList = k65(A.whiteList || A.allowList);
    else A.whiteList = ZV.whiteList;
    if (this.attributeWrapSign = A.singleQuotedAttributeValue === !0 ? "'" : ZV.attributeWrapSign, A.onTag = A.onTag || ZV.onTag, A.onTagAttr = A.onTagAttr || ZV.onTagAttr, A.onIgnoreTag = A.onIgnoreTag || ZV.onIgnoreTag, A.onIgnoreTagAttr = A.onIgnoreTagAttr || ZV.onIgnoreTagAttr, A.safeAttrValue = A.safeAttrValue || ZV.safeAttrValue, A.escapeHtml = A.escapeHtml || ZV.escapeHtml, this.options = A, A.css === !1) this.cssFilter = !1;
    else A.css = A.css || {}, this.cssFilter = new P65(A.css)
  }
  IC2.prototype.process = function(A) {
    if (A = A || "", A = A.toString(), !A) return "";
    var B = this,
      Q = B.options,
      I = Q.whiteList,
      G = Q.onTag,
      Z = Q.onIgnoreTag,
      D = Q.onTagAttr,
      Y = Q.onIgnoreTagAttr,
      W = Q.safeAttrValue,
      J = Q.escapeHtml,
      F = B.attributeWrapSign,
      X = B.cssFilter;
    if (Q.stripBlankChar) A = ZV.stripBlankChar(A);
    if (!Q.allowCommentTag) A = ZV.stripCommentTag(A);
    var V = !1;
    if (Q.stripIgnoreTagBody) V = ZV.StripTagBody(Q.stripIgnoreTagBody, Z), Z = V.onIgnoreTag;
    var C = S65(A, function(K, E, N, q, O) {
      var R = {
          sourcePosition: K,
          position: E,
          isClosing: O,
          isWhite: Object.prototype.hasOwnProperty.call(I, N)
        },
        T = G(N, q, R);
      if (!pC1(T)) return T;
      if (R.isWhite) {
        if (R.isClosing) return "</" + N + ">";
        var L = j65(q),
          _ = I[N],
          k = _65(L.html, function(i, x) {
            var s = cC1.indexOf(_, i) !== -1,
              d = D(N, i, x, s);
            if (!pC1(d)) return d;
            if (s)
              if (x = W(N, i, x, X), x) return i + "=" + F + x + F;
              else return i;
            else {
              if (d = Y(N, i, x, s), !pC1(d)) return d;
              return
            }
          });
        if (q = "<" + N, k) q += " " + k;
        if (L.closing) q += " /";
        return q += ">", q
      } else {
        if (T = Z(N, q, R), !pC1(T)) return T;
        return J(q)
      }
    }, J);
    if (V) C = V.remove(C);
    return C
  };
  GC2.exports = IC2
})
// @from(Start 7078508, End 7079106)
FC2 = z((pd, lC1) => {
  var DC2 = Fo1(),
    YC2 = Xo1(),
    WC2 = ZC2();

  function JC2(A, B) {
    var Q = new WC2(B);
    return Q.process(A)
  }
  pd = lC1.exports = JC2;
  pd.filterXSS = JC2;
  pd.FilterXSS = WC2;
  (function() {
    for (var A in DC2) pd[A] = DC2[A];
    for (var B in YC2) pd[B] = YC2[B]
  })();
  if (typeof window !== "undefined") window.filterXSS = lC1.exports;

  function x65() {
    return typeof self !== "undefined" && typeof DedicatedWorkerGlobalScope !== "undefined" && self instanceof DedicatedWorkerGlobalScope
  }
  if (x65()) self.filterXSS = lC1.exports
})
// @from(Start 7079112, End 7081009)
BK1 = z((n65) => {
  var i65 = [65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
  n65.REPLACEMENT_CHARACTER = "�";
  n65.CODE_POINTS = {
    EOF: -1,
    NULL: 0,
    TABULATION: 9,
    CARRIAGE_RETURN: 13,
    LINE_FEED: 10,
    FORM_FEED: 12,
    SPACE: 32,
    EXCLAMATION_MARK: 33,
    QUOTATION_MARK: 34,
    NUMBER_SIGN: 35,
    AMPERSAND: 38,
    APOSTROPHE: 39,
    HYPHEN_MINUS: 45,
    SOLIDUS: 47,
    DIGIT_0: 48,
    DIGIT_9: 57,
    SEMICOLON: 59,
    LESS_THAN_SIGN: 60,
    EQUALS_SIGN: 61,
    GREATER_THAN_SIGN: 62,
    QUESTION_MARK: 63,
    LATIN_CAPITAL_A: 65,
    LATIN_CAPITAL_F: 70,
    LATIN_CAPITAL_X: 88,
    LATIN_CAPITAL_Z: 90,
    RIGHT_SQUARE_BRACKET: 93,
    GRAVE_ACCENT: 96,
    LATIN_SMALL_A: 97,
    LATIN_SMALL_F: 102,
    LATIN_SMALL_X: 120,
    LATIN_SMALL_Z: 122,
    REPLACEMENT_CHARACTER: 65533
  };
  n65.CODE_POINT_SEQUENCES = {
    DASH_DASH_STRING: [45, 45],
    DOCTYPE_STRING: [68, 79, 67, 84, 89, 80, 69],
    CDATA_START_STRING: [91, 67, 68, 65, 84, 65, 91],
    SCRIPT_STRING: [115, 99, 114, 105, 112, 116],
    PUBLIC_STRING: [80, 85, 66, 76, 73, 67],
    SYSTEM_STRING: [83, 89, 83, 84, 69, 77]
  };
  n65.isSurrogate = function(A) {
    return A >= 55296 && A <= 57343
  };
  n65.isSurrogatePair = function(A) {
    return A >= 56320 && A <= 57343
  };
  n65.getSurrogatePairCodePoint = function(A, B) {
    return (A - 55296) * 1024 + 9216 + B
  };
  n65.isControlCodePoint = function(A) {
    return A !== 32 && A !== 10 && A !== 13 && A !== 9 && A !== 12 && A >= 1 && A <= 31 || A >= 127 && A <= 159
  };
  n65.isUndefinedCodePoint = function(A) {
    return A >= 64976 && A <= 65007 || i65.indexOf(A) > -1
  }
})
// @from(Start 7081015, End 7085271)
QK1 = z((Fi8, EC2) => {
  EC2.exports = {
    controlCharacterInInputStream: "control-character-in-input-stream",
    noncharacterInInputStream: "noncharacter-in-input-stream",
    surrogateInInputStream: "surrogate-in-input-stream",
    nonVoidHtmlElementStartTagWithTrailingSolidus: "non-void-html-element-start-tag-with-trailing-solidus",
    endTagWithAttributes: "end-tag-with-attributes",
    endTagWithTrailingSolidus: "end-tag-with-trailing-solidus",
    unexpectedSolidusInTag: "unexpected-solidus-in-tag",
    unexpectedNullCharacter: "unexpected-null-character",
    unexpectedQuestionMarkInsteadOfTagName: "unexpected-question-mark-instead-of-tag-name",
    invalidFirstCharacterOfTagName: "invalid-first-character-of-tag-name",
    unexpectedEqualsSignBeforeAttributeName: "unexpected-equals-sign-before-attribute-name",
    missingEndTagName: "missing-end-tag-name",
    unexpectedCharacterInAttributeName: "unexpected-character-in-attribute-name",
    unknownNamedCharacterReference: "unknown-named-character-reference",
    missingSemicolonAfterCharacterReference: "missing-semicolon-after-character-reference",
    unexpectedCharacterAfterDoctypeSystemIdentifier: "unexpected-character-after-doctype-system-identifier",
    unexpectedCharacterInUnquotedAttributeValue: "unexpected-character-in-unquoted-attribute-value",
    eofBeforeTagName: "eof-before-tag-name",
    eofInTag: "eof-in-tag",
    missingAttributeValue: "missing-attribute-value",
    missingWhitespaceBetweenAttributes: "missing-whitespace-between-attributes",
    missingWhitespaceAfterDoctypePublicKeyword: "missing-whitespace-after-doctype-public-keyword",
    missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers: "missing-whitespace-between-doctype-public-and-system-identifiers",
    missingWhitespaceAfterDoctypeSystemKeyword: "missing-whitespace-after-doctype-system-keyword",
    missingQuoteBeforeDoctypePublicIdentifier: "missing-quote-before-doctype-public-identifier",
    missingQuoteBeforeDoctypeSystemIdentifier: "missing-quote-before-doctype-system-identifier",
    missingDoctypePublicIdentifier: "missing-doctype-public-identifier",
    missingDoctypeSystemIdentifier: "missing-doctype-system-identifier",
    abruptDoctypePublicIdentifier: "abrupt-doctype-public-identifier",
    abruptDoctypeSystemIdentifier: "abrupt-doctype-system-identifier",
    cdataInHtmlContent: "cdata-in-html-content",
    incorrectlyOpenedComment: "incorrectly-opened-comment",
    eofInScriptHtmlCommentLikeText: "eof-in-script-html-comment-like-text",
    eofInDoctype: "eof-in-doctype",
    nestedComment: "nested-comment",
    abruptClosingOfEmptyComment: "abrupt-closing-of-empty-comment",
    eofInComment: "eof-in-comment",
    incorrectlyClosedComment: "incorrectly-closed-comment",
    eofInCdata: "eof-in-cdata",
    absenceOfDigitsInNumericCharacterReference: "absence-of-digits-in-numeric-character-reference",
    nullCharacterReference: "null-character-reference",
    surrogateCharacterReference: "surrogate-character-reference",
    characterReferenceOutsideUnicodeRange: "character-reference-outside-unicode-range",
    controlCharacterReference: "control-character-reference",
    noncharacterCharacterReference: "noncharacter-character-reference",
    missingWhitespaceBeforeDoctypeName: "missing-whitespace-before-doctype-name",
    missingDoctypeName: "missing-doctype-name",
    invalidCharacterSequenceAfterDoctypeName: "invalid-character-sequence-after-doctype-name",
    duplicateAttribute: "duplicate-attribute",
    nonConformingDoctype: "non-conforming-doctype",
    missingDoctype: "missing-doctype",
    misplacedDoctype: "misplaced-doctype",
    endTagWithoutMatchingOpenElement: "end-tag-without-matching-open-element",
    closingOfElementWithOpenChildElements: "closing-of-element-with-open-child-elements",
    disallowedContentInNoscriptInHead: "disallowed-content-in-noscript-in-head",
    openElementsLeftAfterEof: "open-elements-left-after-eof",
    abandonedHeadElementChild: "abandoned-head-element-child",
    misplacedStartTagForHeadElement: "misplaced-start-tag-for-head-element",
    nestedNoscriptInHead: "nested-noscript-in-head",
    eofInElementThatCanContainOnlyText: "eof-in-element-that-can-contain-only-text"
  }
})
// @from(Start 7085277, End 7087690)
$C2 = z((Xi8, NC2) => {
  var ld = BK1(),
    $o1 = QK1(),
    Ay = ld.CODE_POINTS;
  class UC2 {
    constructor() {
      this.html = null, this.pos = -1, this.lastGapPos = -1, this.lastCharPos = -1, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = 65536
    }
    _err() {}
    _addGap() {
      this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos
    }
    _processSurrogate(A) {
      if (this.pos !== this.lastCharPos) {
        let B = this.html.charCodeAt(this.pos + 1);
        if (ld.isSurrogatePair(B)) return this.pos++, this._addGap(), ld.getSurrogatePairCodePoint(A, B)
      } else if (!this.lastChunkWritten) return this.endOfChunkHit = !0, Ay.EOF;
      return this._err($o1.surrogateInInputStream), A
    }
    dropParsedChunk() {
      if (this.pos > this.bufferWaterline) this.lastCharPos -= this.pos, this.html = this.html.substring(this.pos), this.pos = 0, this.lastGapPos = -1, this.gapStack = []
    }
    write(A, B) {
      if (this.html) this.html += A;
      else this.html = A;
      this.lastCharPos = this.html.length - 1, this.endOfChunkHit = !1, this.lastChunkWritten = B
    }
    insertHtmlAtCurrentPos(A) {
      this.html = this.html.substring(0, this.pos + 1) + A + this.html.substring(this.pos + 1, this.html.length), this.lastCharPos = this.html.length - 1, this.endOfChunkHit = !1
    }
    advance() {
      if (this.pos++, this.pos > this.lastCharPos) return this.endOfChunkHit = !this.lastChunkWritten, Ay.EOF;
      let A = this.html.charCodeAt(this.pos);
      if (this.skipNextNewLine && A === Ay.LINE_FEED) return this.skipNextNewLine = !1, this._addGap(), this.advance();
      if (A === Ay.CARRIAGE_RETURN) return this.skipNextNewLine = !0, Ay.LINE_FEED;
      if (this.skipNextNewLine = !1, ld.isSurrogate(A)) A = this._processSurrogate(A);
      if (!(A > 31 && A < 127 || A === Ay.LINE_FEED || A === Ay.CARRIAGE_RETURN || A > 159 && A < 64976)) this._checkForProblematicCharacters(A);
      return A
    }
    _checkForProblematicCharacters(A) {
      if (ld.isControlCodePoint(A)) this._err($o1.controlCharacterInInputStream);
      else if (ld.isUndefinedCodePoint(A)) this._err($o1.noncharacterInInputStream)
    }
    retreat() {
      if (this.pos === this.lastGapPos) this.lastGapPos = this.gapStack.pop(), this.pos--;
      this.pos--
    }
  }
  NC2.exports = UC2
})