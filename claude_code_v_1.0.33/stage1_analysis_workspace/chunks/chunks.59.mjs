
// @from(Start 5886125, End 5888326)
r02 = z((a02) => {
  Object.defineProperty(a02, "__esModule", {
    value: !0
  });
  a02.getRuntimeConfig = void 0;
  var qk6 = vA2(),
    Mk6 = qk6.__importDefault(bA2()),
    Lk6 = IB(),
    Rk6 = ha(),
    l02 = I_(),
    AX1 = _D(),
    Ok6 = G_(),
    i02 = KJ(),
    tm = qC(),
    n02 = DN(),
    Tk6 = Z_(),
    Pk6 = vL(),
    Sk6 = c02(),
    _k6 = ct(),
    jk6 = Y_(),
    yk6 = ct(),
    kk6 = (A) => {
      yk6.emitWarningIfUnsupportedVersion(process.version);
      let B = jk6.resolveDefaultsModeConfig(A),
        Q = () => B().then(_k6.loadConfigsForDefaultMode),
        I = Sk6.getRuntimeConfig(A);
      Lk6.emitWarningIfUnsupportedVersion(process.version);
      let G = {
        profile: A?.profile
      };
      return {
        ...I,
        ...A,
        runtime: "node",
        defaultsMode: B,
        bodyLengthChecker: A?.bodyLengthChecker ?? Tk6.calculateBodyLength,
        credentialDefaultProvider: A?.credentialDefaultProvider ?? Rk6.defaultProvider,
        defaultUserAgentProvider: A?.defaultUserAgentProvider ?? l02.createDefaultUserAgentProvider({
          serviceId: I.serviceId,
          clientVersion: Mk6.default.version
        }),
        maxAttempts: A?.maxAttempts ?? tm.loadConfig(i02.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
        region: A?.region ?? tm.loadConfig(AX1.NODE_REGION_CONFIG_OPTIONS, {
          ...AX1.NODE_REGION_CONFIG_FILE_OPTIONS,
          ...G
        }),
        requestHandler: n02.NodeHttpHandler.create(A?.requestHandler ?? Q),
        retryMode: A?.retryMode ?? tm.loadConfig({
          ...i02.NODE_RETRY_MODE_CONFIG_OPTIONS,
          default: async () => (await Q()).retryMode || Pk6.DEFAULT_RETRY_MODE
        }, A),
        sha256: A?.sha256 ?? Ok6.Hash.bind(null, "sha256"),
        streamCollector: A?.streamCollector ?? n02.streamCollector,
        useDualstackEndpoint: A?.useDualstackEndpoint ?? tm.loadConfig(AX1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, G),
        useFipsEndpoint: A?.useFipsEndpoint ?? tm.loadConfig(AX1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, G),
        userAgentAppId: A?.userAgentAppId ?? tm.loadConfig(l02.NODE_APP_ID_CONFIG_OPTIONS, G)
      }
    };
  a02.getRuntimeConfig = kk6
})
// @from(Start 5888332, End 5892839)
Q22 = z((yb8, B22) => {
  var {
    defineProperty: BX1,
    getOwnPropertyDescriptor: xk6,
    getOwnPropertyNames: fk6
  } = Object, vk6 = Object.prototype.hasOwnProperty, AO = (A, B) => BX1(A, "name", {
    value: B,
    configurable: !0
  }), bk6 = (A, B) => {
    for (var Q in B) BX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, gk6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of fk6(B))
        if (!vk6.call(A, G) && G !== Q) BX1(A, G, {
          get: () => B[G],
          enumerable: !(I = xk6(B, G)) || I.enumerable
        })
    }
    return A
  }, hk6 = (A) => gk6(BX1({}, "__esModule", {
    value: !0
  }), A), o02 = {};
  bk6(o02, {
    Field: () => uk6,
    Fields: () => pk6,
    HttpRequest: () => ck6,
    HttpResponse: () => lk6,
    IHttpRequest: () => t02.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => mk6,
    isValidHostname: () => A22,
    resolveHttpHandlerRuntimeConfig: () => dk6
  });
  B22.exports = hk6(o02);
  var mk6 = AO((A) => {
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
    dk6 = AO((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    t02 = gi1(),
    uk6 = class {
      static {
        AO(this, "Field")
      }
      constructor({
        name: A,
        kind: B = t02.FieldPosition.HEADER,
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
    pk6 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        AO(this, "Fields")
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
    ck6 = class A {
      static {
        AO(this, "HttpRequest")
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
        if (Q.query) Q.query = e02(Q.query);
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

  function e02(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  AO(e02, "cloneQuery");
  var lk6 = class {
    static {
      AO(this, "HttpResponse")
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

  function A22(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  AO(A22, "isValidHostname")
})
// @from(Start 5892845, End 5934836)
A92 = z((vb8, e22) => {
  var {
    defineProperty: IX1,
    getOwnPropertyDescriptor: ik6,
    getOwnPropertyNames: nk6
  } = Object, ak6 = Object.prototype.hasOwnProperty, aA = (A, B) => IX1(A, "name", {
    value: B,
    configurable: !0
  }), sk6 = (A, B) => {
    for (var Q in B) IX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, rk6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of nk6(B))
        if (!ak6.call(A, G) && G !== Q) IX1(A, G, {
          get: () => B[G],
          enumerable: !(I = ik6(B, G)) || I.enumerable
        })
    }
    return A
  }, ok6 = (A) => rk6(IX1({}, "__esModule", {
    value: !0
  }), A), W22 = {};
  sk6(W22, {
    AmbiguousRoleResolutionType: () => Yx6,
    CognitoIdentity: () => t22,
    CognitoIdentityClient: () => In1,
    CognitoIdentityServiceException: () => bJ,
    ConcurrentModificationException: () => U22,
    CreateIdentityPoolCommand: () => _22,
    CredentialsFilterSensitiveLog: () => $22,
    DeleteIdentitiesCommand: () => j22,
    DeleteIdentityPoolCommand: () => y22,
    DescribeIdentityCommand: () => k22,
    DescribeIdentityPoolCommand: () => x22,
    DeveloperUserAlreadyRegisteredException: () => E22,
    ErrorCode: () => Wx6,
    ExternalServiceException: () => z22,
    GetCredentialsForIdentityCommand: () => f22,
    GetCredentialsForIdentityInputFilterSensitiveLog: () => N22,
    GetCredentialsForIdentityResponseFilterSensitiveLog: () => q22,
    GetIdCommand: () => v22,
    GetIdInputFilterSensitiveLog: () => M22,
    GetIdentityPoolRolesCommand: () => b22,
    GetOpenIdTokenCommand: () => g22,
    GetOpenIdTokenForDeveloperIdentityCommand: () => h22,
    GetOpenIdTokenForDeveloperIdentityInputFilterSensitiveLog: () => O22,
    GetOpenIdTokenForDeveloperIdentityResponseFilterSensitiveLog: () => T22,
    GetOpenIdTokenInputFilterSensitiveLog: () => L22,
    GetOpenIdTokenResponseFilterSensitiveLog: () => R22,
    GetPrincipalTagAttributeMapCommand: () => m22,
    InternalErrorException: () => J22,
    InvalidIdentityPoolConfigurationException: () => w22,
    InvalidParameterException: () => F22,
    LimitExceededException: () => X22,
    ListIdentitiesCommand: () => d22,
    ListIdentityPoolsCommand: () => Gn1,
    ListTagsForResourceCommand: () => u22,
    LookupDeveloperIdentityCommand: () => p22,
    MappingRuleMatchType: () => Jx6,
    MergeDeveloperIdentitiesCommand: () => c22,
    NotAuthorizedException: () => V22,
    ResourceConflictException: () => C22,
    ResourceNotFoundException: () => H22,
    RoleMappingType: () => Fx6,
    SetIdentityPoolRolesCommand: () => l22,
    SetPrincipalTagAttributeMapCommand: () => i22,
    TagResourceCommand: () => n22,
    TooManyRequestsException: () => K22,
    UnlinkDeveloperIdentityCommand: () => a22,
    UnlinkIdentityCommand: () => s22,
    UnlinkIdentityInputFilterSensitiveLog: () => P22,
    UntagResourceCommand: () => r22,
    UpdateIdentityPoolCommand: () => o22,
    __Client: () => nA.Client,
    paginateListIdentityPools: () => Nf6
  });
  e22.exports = ok6(W22);
  var I22 = cS(),
    tk6 = lS(),
    ek6 = iS(),
    G22 = jL(),
    Ax6 = _D(),
    QX1 = NI(),
    Bx6 = tS(),
    I3 = hz(),
    Z22 = KJ(),
    D22 = vi1(),
    Qx6 = aA((A) => {
      return Object.assign(A, {
        useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
        useFipsEndpoint: A.useFipsEndpoint ?? !1,
        defaultSigningName: "cognito-identity"
      })
    }, "resolveClientEndpointParameters"),
    M3 = {
      UseFIPS: {
        type: "builtInParams",
        name: "useFipsEndpoint"
      },
      Endpoint: {
        type: "builtInParams",
        name: "endpoint"
      },
      Region: {
        type: "builtInParams",
        name: "region"
      },
      UseDualStack: {
        type: "builtInParams",
        name: "useDualstackEndpoint"
      }
    },
    Ix6 = r02(),
    Y22 = W_(),
    Qn1 = Q22(),
    nA = ct(),
    Gx6 = aA((A) => {
      let {
        httpAuthSchemes: B,
        httpAuthSchemeProvider: Q,
        credentials: I
      } = A;
      return {
        setHttpAuthScheme(G) {
          let Z = B.findIndex((D) => D.schemeId === G.schemeId);
          if (Z === -1) B.push(G);
          else B.splice(Z, 1, G)
        },
        httpAuthSchemes() {
          return B
        },
        setHttpAuthSchemeProvider(G) {
          Q = G
        },
        httpAuthSchemeProvider() {
          return Q
        },
        setCredentials(G) {
          I = G
        },
        credentials() {
          return I
        }
      }
    }, "getHttpAuthExtensionConfiguration"),
    Zx6 = aA((A) => {
      return {
        httpAuthSchemes: A.httpAuthSchemes(),
        httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
        credentials: A.credentials()
      }
    }, "resolveHttpAuthRuntimeConfig"),
    Dx6 = aA((A, B) => {
      let Q = Object.assign(Y22.getAwsRegionExtensionConfiguration(A), nA.getDefaultExtensionConfiguration(A), Qn1.getHttpHandlerExtensionConfiguration(A), Gx6(A));
      return B.forEach((I) => I.configure(Q)), Object.assign(A, Y22.resolveAwsRegionExtensionConfiguration(Q), nA.resolveDefaultRuntimeConfig(Q), Qn1.resolveHttpHandlerRuntimeConfig(Q), Zx6(Q))
    }, "resolveRuntimeExtensions"),
    In1 = class extends nA.Client {
      static {
        aA(this, "CognitoIdentityClient")
      }
      config;
      constructor(...[A]) {
        let B = Ix6.getRuntimeConfig(A || {});
        super(B);
        this.initConfig = B;
        let Q = Qx6(B),
          I = G22.resolveUserAgentConfig(Q),
          G = Z22.resolveRetryConfig(I),
          Z = Ax6.resolveRegionConfig(G),
          D = I22.resolveHostHeaderConfig(Z),
          Y = I3.resolveEndpointConfig(D),
          W = D22.resolveHttpAuthSchemeConfig(Y),
          J = Dx6(W, A?.extensions || []);
        this.config = J, this.middlewareStack.use(G22.getUserAgentPlugin(this.config)), this.middlewareStack.use(Z22.getRetryPlugin(this.config)), this.middlewareStack.use(Bx6.getContentLengthPlugin(this.config)), this.middlewareStack.use(I22.getHostHeaderPlugin(this.config)), this.middlewareStack.use(tk6.getLoggerPlugin(this.config)), this.middlewareStack.use(ek6.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(QX1.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: D22.defaultCognitoIdentityHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: aA(async (F) => new QX1.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": F.credentials
          }), "identityProviderConfigProvider")
        })), this.middlewareStack.use(QX1.getHttpSigningPlugin(this.config))
      }
      destroy() {
        super.destroy()
      }
    },
    L3 = yz(),
    xQ = IB(),
    bJ = class A extends nA.ServiceException {
      static {
        aA(this, "CognitoIdentityServiceException")
      }
      constructor(B) {
        super(B);
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    Yx6 = {
      AUTHENTICATED_ROLE: "AuthenticatedRole",
      DENY: "Deny"
    },
    J22 = class A extends bJ {
      static {
        aA(this, "InternalErrorException")
      }
      name = "InternalErrorException";
      $fault = "server";
      constructor(B) {
        super({
          name: "InternalErrorException",
          $fault: "server",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    F22 = class A extends bJ {
      static {
        aA(this, "InvalidParameterException")
      }
      name = "InvalidParameterException";
      $fault = "client";
      constructor(B) {
        super({
          name: "InvalidParameterException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    X22 = class A extends bJ {
      static {
        aA(this, "LimitExceededException")
      }
      name = "LimitExceededException";
      $fault = "client";
      constructor(B) {
        super({
          name: "LimitExceededException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    V22 = class A extends bJ {
      static {
        aA(this, "NotAuthorizedException")
      }
      name = "NotAuthorizedException";
      $fault = "client";
      constructor(B) {
        super({
          name: "NotAuthorizedException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    C22 = class A extends bJ {
      static {
        aA(this, "ResourceConflictException")
      }
      name = "ResourceConflictException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ResourceConflictException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    K22 = class A extends bJ {
      static {
        aA(this, "TooManyRequestsException")
      }
      name = "TooManyRequestsException";
      $fault = "client";
      constructor(B) {
        super({
          name: "TooManyRequestsException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    Wx6 = {
      ACCESS_DENIED: "AccessDenied",
      INTERNAL_SERVER_ERROR: "InternalServerError"
    },
    H22 = class A extends bJ {
      static {
        aA(this, "ResourceNotFoundException")
      }
      name = "ResourceNotFoundException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ResourceNotFoundException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    z22 = class A extends bJ {
      static {
        aA(this, "ExternalServiceException")
      }
      name = "ExternalServiceException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ExternalServiceException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    w22 = class A extends bJ {
      static {
        aA(this, "InvalidIdentityPoolConfigurationException")
      }
      name = "InvalidIdentityPoolConfigurationException";
      $fault = "client";
      constructor(B) {
        super({
          name: "InvalidIdentityPoolConfigurationException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    Jx6 = {
      CONTAINS: "Contains",
      EQUALS: "Equals",
      NOT_EQUAL: "NotEqual",
      STARTS_WITH: "StartsWith"
    },
    Fx6 = {
      RULES: "Rules",
      TOKEN: "Token"
    },
    E22 = class A extends bJ {
      static {
        aA(this, "DeveloperUserAlreadyRegisteredException")
      }
      name = "DeveloperUserAlreadyRegisteredException";
      $fault = "client";
      constructor(B) {
        super({
          name: "DeveloperUserAlreadyRegisteredException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    U22 = class A extends bJ {
      static {
        aA(this, "ConcurrentModificationException")
      }
      name = "ConcurrentModificationException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ConcurrentModificationException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    N22 = aA((A) => ({
      ...A,
      ...A.Logins && {
        Logins: nA.SENSITIVE_STRING
      }
    }), "GetCredentialsForIdentityInputFilterSensitiveLog"),
    $22 = aA((A) => ({
      ...A,
      ...A.SecretKey && {
        SecretKey: nA.SENSITIVE_STRING
      }
    }), "CredentialsFilterSensitiveLog"),
    q22 = aA((A) => ({
      ...A,
      ...A.Credentials && {
        Credentials: $22(A.Credentials)
      }
    }), "GetCredentialsForIdentityResponseFilterSensitiveLog"),
    M22 = aA((A) => ({
      ...A,
      ...A.Logins && {
        Logins: nA.SENSITIVE_STRING
      }
    }), "GetIdInputFilterSensitiveLog"),
    L22 = aA((A) => ({
      ...A,
      ...A.Logins && {
        Logins: nA.SENSITIVE_STRING
      }
    }), "GetOpenIdTokenInputFilterSensitiveLog"),
    R22 = aA((A) => ({
      ...A,
      ...A.Token && {
        Token: nA.SENSITIVE_STRING
      }
    }), "GetOpenIdTokenResponseFilterSensitiveLog"),
    O22 = aA((A) => ({
      ...A,
      ...A.Logins && {
        Logins: nA.SENSITIVE_STRING
      }
    }), "GetOpenIdTokenForDeveloperIdentityInputFilterSensitiveLog"),
    T22 = aA((A) => ({
      ...A,
      ...A.Token && {
        Token: nA.SENSITIVE_STRING
      }
    }), "GetOpenIdTokenForDeveloperIdentityResponseFilterSensitiveLog"),
    P22 = aA((A) => ({
      ...A,
      ...A.Logins && {
        Logins: nA.SENSITIVE_STRING
      }
    }), "UnlinkIdentityInputFilterSensitiveLog"),
    Xx6 = aA(async (A, B) => {
      let Q = G3("CreateIdentityPool"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_CreateIdentityPoolCommand"),
    Vx6 = aA(async (A, B) => {
      let Q = G3("DeleteIdentities"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_DeleteIdentitiesCommand"),
    Cx6 = aA(async (A, B) => {
      let Q = G3("DeleteIdentityPool"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_DeleteIdentityPoolCommand"),
    Kx6 = aA(async (A, B) => {
      let Q = G3("DescribeIdentity"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_DescribeIdentityCommand"),
    Hx6 = aA(async (A, B) => {
      let Q = G3("DescribeIdentityPool"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_DescribeIdentityPoolCommand"),
    zx6 = aA(async (A, B) => {
      let Q = G3("GetCredentialsForIdentity"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_GetCredentialsForIdentityCommand"),
    wx6 = aA(async (A, B) => {
      let Q = G3("GetId"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_GetIdCommand"),
    Ex6 = aA(async (A, B) => {
      let Q = G3("GetIdentityPoolRoles"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_GetIdentityPoolRolesCommand"),
    Ux6 = aA(async (A, B) => {
      let Q = G3("GetOpenIdToken"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_GetOpenIdTokenCommand"),
    Nx6 = aA(async (A, B) => {
      let Q = G3("GetOpenIdTokenForDeveloperIdentity"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_GetOpenIdTokenForDeveloperIdentityCommand"),
    $x6 = aA(async (A, B) => {
      let Q = G3("GetPrincipalTagAttributeMap"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_GetPrincipalTagAttributeMapCommand"),
    qx6 = aA(async (A, B) => {
      let Q = G3("ListIdentities"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_ListIdentitiesCommand"),
    Mx6 = aA(async (A, B) => {
      let Q = G3("ListIdentityPools"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_ListIdentityPoolsCommand"),
    Lx6 = aA(async (A, B) => {
      let Q = G3("ListTagsForResource"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_ListTagsForResourceCommand"),
    Rx6 = aA(async (A, B) => {
      let Q = G3("LookupDeveloperIdentity"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_LookupDeveloperIdentityCommand"),
    Ox6 = aA(async (A, B) => {
      let Q = G3("MergeDeveloperIdentities"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_MergeDeveloperIdentitiesCommand"),
    Tx6 = aA(async (A, B) => {
      let Q = G3("SetIdentityPoolRoles"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_SetIdentityPoolRolesCommand"),
    Px6 = aA(async (A, B) => {
      let Q = G3("SetPrincipalTagAttributeMap"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_SetPrincipalTagAttributeMapCommand"),
    Sx6 = aA(async (A, B) => {
      let Q = G3("TagResource"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_TagResourceCommand"),
    _x6 = aA(async (A, B) => {
      let Q = G3("UnlinkDeveloperIdentity"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_UnlinkDeveloperIdentityCommand"),
    jx6 = aA(async (A, B) => {
      let Q = G3("UnlinkIdentity"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_UnlinkIdentityCommand"),
    yx6 = aA(async (A, B) => {
      let Q = G3("UntagResource"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_UntagResourceCommand"),
    kx6 = aA(async (A, B) => {
      let Q = G3("UpdateIdentityPool"),
        I;
      return I = JSON.stringify(nA._json(A)), O3(B, Q, "/", void 0, I)
    }, "se_UpdateIdentityPoolCommand"),
    xx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_CreateIdentityPoolCommand"),
    fx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_DeleteIdentitiesCommand"),
    vx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      return await nA.collectBody(A.body, B), {
        $metadata: Z5(A)
      }
    }, "de_DeleteIdentityPoolCommand"),
    bx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = S22(Q, B), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_DescribeIdentityCommand"),
    gx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_DescribeIdentityPoolCommand"),
    hx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = Hf6(Q, B), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_GetCredentialsForIdentityCommand"),
    mx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_GetIdCommand"),
    dx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_GetIdentityPoolRolesCommand"),
    ux6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_GetOpenIdTokenCommand"),
    px6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_GetOpenIdTokenForDeveloperIdentityCommand"),
    cx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_GetPrincipalTagAttributeMapCommand"),
    lx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = wf6(Q, B), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_ListIdentitiesCommand"),
    ix6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_ListIdentityPoolsCommand"),
    nx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_ListTagsForResourceCommand"),
    ax6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_LookupDeveloperIdentityCommand"),
    sx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_MergeDeveloperIdentitiesCommand"),
    rx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      return await nA.collectBody(A.body, B), {
        $metadata: Z5(A)
      }
    }, "de_SetIdentityPoolRolesCommand"),
    ox6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_SetPrincipalTagAttributeMapCommand"),
    tx6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_TagResourceCommand"),
    ex6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      return await nA.collectBody(A.body, B), {
        $metadata: Z5(A)
      }
    }, "de_UnlinkDeveloperIdentityCommand"),
    Af6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      return await nA.collectBody(A.body, B), {
        $metadata: Z5(A)
      }
    }, "de_UnlinkIdentityCommand"),
    Bf6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_UntagResourceCommand"),
    Qf6 = aA(async (A, B) => {
      if (A.statusCode >= 300) return R3(A, B);
      let Q = await xQ.parseJsonBody(A.body, B),
        I = {};
      return I = nA._json(Q), {
        $metadata: Z5(A),
        ...I
      }
    }, "de_UpdateIdentityPoolCommand"),
    R3 = aA(async (A, B) => {
      let Q = {
          ...A,
          body: await xQ.parseJsonErrorBody(A.body, B)
        },
        I = xQ.loadRestJsonErrorCode(A, Q.body);
      switch (I) {
        case "InternalErrorException":
        case "com.amazonaws.cognitoidentity#InternalErrorException":
          throw await Df6(Q, B);
        case "InvalidParameterException":
        case "com.amazonaws.cognitoidentity#InvalidParameterException":
          throw await Wf6(Q, B);
        case "LimitExceededException":
        case "com.amazonaws.cognitoidentity#LimitExceededException":
          throw await Jf6(Q, B);
        case "NotAuthorizedException":
        case "com.amazonaws.cognitoidentity#NotAuthorizedException":
          throw await Ff6(Q, B);
        case "ResourceConflictException":
        case "com.amazonaws.cognitoidentity#ResourceConflictException":
          throw await Xf6(Q, B);
        case "TooManyRequestsException":
        case "com.amazonaws.cognitoidentity#TooManyRequestsException":
          throw await Cf6(Q, B);
        case "ResourceNotFoundException":
        case "com.amazonaws.cognitoidentity#ResourceNotFoundException":
          throw await Vf6(Q, B);
        case "ExternalServiceException":
        case "com.amazonaws.cognitoidentity#ExternalServiceException":
          throw await Zf6(Q, B);
        case "InvalidIdentityPoolConfigurationException":
        case "com.amazonaws.cognitoidentity#InvalidIdentityPoolConfigurationException":
          throw await Yf6(Q, B);
        case "DeveloperUserAlreadyRegisteredException":
        case "com.amazonaws.cognitoidentity#DeveloperUserAlreadyRegisteredException":
          throw await Gf6(Q, B);
        case "ConcurrentModificationException":
        case "com.amazonaws.cognitoidentity#ConcurrentModificationException":
          throw await If6(Q, B);
        default:
          let G = Q.body;
          return Ef6({
            output: A,
            parsedBody: G,
            errorCode: I
          })
      }
    }, "de_CommandError"),
    If6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new U22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_ConcurrentModificationExceptionRes"),
    Gf6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new E22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_DeveloperUserAlreadyRegisteredExceptionRes"),
    Zf6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new z22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_ExternalServiceExceptionRes"),
    Df6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new J22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_InternalErrorExceptionRes"),
    Yf6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new w22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_InvalidIdentityPoolConfigurationExceptionRes"),
    Wf6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new F22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_InvalidParameterExceptionRes"),
    Jf6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new X22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_LimitExceededExceptionRes"),
    Ff6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new V22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_NotAuthorizedExceptionRes"),
    Xf6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new C22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_ResourceConflictExceptionRes"),
    Vf6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new H22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_ResourceNotFoundExceptionRes"),
    Cf6 = aA(async (A, B) => {
      let Q = A.body,
        I = nA._json(Q),
        G = new K22({
          $metadata: Z5(A),
          ...I
        });
      return nA.decorateServiceException(G, Q)
    }, "de_TooManyRequestsExceptionRes"),
    Kf6 = aA((A, B) => {
      return nA.take(A, {
        AccessKeyId: nA.expectString,
        Expiration: aA((Q) => nA.expectNonNull(nA.parseEpochTimestamp(nA.expectNumber(Q))), "Expiration"),
        SecretKey: nA.expectString,
        SessionToken: nA.expectString
      })
    }, "de_Credentials"),
    Hf6 = aA((A, B) => {
      return nA.take(A, {
        Credentials: aA((Q) => Kf6(Q, B), "Credentials"),
        IdentityId: nA.expectString
      })
    }, "de_GetCredentialsForIdentityResponse"),
    zf6 = aA((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return S22(I, B)
      })
    }, "de_IdentitiesList"),
    S22 = aA((A, B) => {
      return nA.take(A, {
        CreationDate: aA((Q) => nA.expectNonNull(nA.parseEpochTimestamp(nA.expectNumber(Q))), "CreationDate"),
        IdentityId: nA.expectString,
        LastModifiedDate: aA((Q) => nA.expectNonNull(nA.parseEpochTimestamp(nA.expectNumber(Q))), "LastModifiedDate"),
        Logins: nA._json
      })
    }, "de_IdentityDescription"),
    wf6 = aA((A, B) => {
      return nA.take(A, {
        Identities: aA((Q) => zf6(Q, B), "Identities"),
        IdentityPoolId: nA.expectString,
        NextToken: nA.expectString
      })
    }, "de_ListIdentitiesResponse"),
    Z5 = aA((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    Ef6 = nA.withBaseException(bJ),
    O3 = aA(async (A, B, Q, I, G) => {
      let {
        hostname: Z,
        protocol: D = "https",
        port: Y,
        path: W
      } = await A.endpoint(), J = {
        protocol: D,
        hostname: Z,
        port: Y,
        method: "POST",
        path: W.endsWith("/") ? W.slice(0, -1) + Q : W + Q,
        headers: B
      };
      if (I !== void 0) J.hostname = I;
      if (G !== void 0) J.body = G;
      return new Qn1.HttpRequest(J)
    }, "buildHttpRpcRequest");

  function G3(A) {
    return {
      "content-type": "application/x-amz-json-1.1",
      "x-amz-target": `AWSCognitoIdentityService.${A}`
    }
  }
  aA(G3, "sharedHeaders");
  var _22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "CreateIdentityPool", {}).n("CognitoIdentityClient", "CreateIdentityPoolCommand").f(void 0, void 0).ser(Xx6).de(xx6).build() {
      static {
        aA(this, "CreateIdentityPoolCommand")
      }
    },
    j22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "DeleteIdentities", {}).n("CognitoIdentityClient", "DeleteIdentitiesCommand").f(void 0, void 0).ser(Vx6).de(fx6).build() {
      static {
        aA(this, "DeleteIdentitiesCommand")
      }
    },
    y22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "DeleteIdentityPool", {}).n("CognitoIdentityClient", "DeleteIdentityPoolCommand").f(void 0, void 0).ser(Cx6).de(vx6).build() {
      static {
        aA(this, "DeleteIdentityPoolCommand")
      }
    },
    k22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "DescribeIdentity", {}).n("CognitoIdentityClient", "DescribeIdentityCommand").f(void 0, void 0).ser(Kx6).de(bx6).build() {
      static {
        aA(this, "DescribeIdentityCommand")
      }
    },
    x22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "DescribeIdentityPool", {}).n("CognitoIdentityClient", "DescribeIdentityPoolCommand").f(void 0, void 0).ser(Hx6).de(gx6).build() {
      static {
        aA(this, "DescribeIdentityPoolCommand")
      }
    },
    f22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "GetCredentialsForIdentity", {}).n("CognitoIdentityClient", "GetCredentialsForIdentityCommand").f(N22, q22).ser(zx6).de(hx6).build() {
      static {
        aA(this, "GetCredentialsForIdentityCommand")
      }
    },
    v22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "GetId", {}).n("CognitoIdentityClient", "GetIdCommand").f(M22, void 0).ser(wx6).de(mx6).build() {
      static {
        aA(this, "GetIdCommand")
      }
    },
    b22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "GetIdentityPoolRoles", {}).n("CognitoIdentityClient", "GetIdentityPoolRolesCommand").f(void 0, void 0).ser(Ex6).de(dx6).build() {
      static {
        aA(this, "GetIdentityPoolRolesCommand")
      }
    },
    g22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "GetOpenIdToken", {}).n("CognitoIdentityClient", "GetOpenIdTokenCommand").f(L22, R22).ser(Ux6).de(ux6).build() {
      static {
        aA(this, "GetOpenIdTokenCommand")
      }
    },
    h22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "GetOpenIdTokenForDeveloperIdentity", {}).n("CognitoIdentityClient", "GetOpenIdTokenForDeveloperIdentityCommand").f(O22, T22).ser(Nx6).de(px6).build() {
      static {
        aA(this, "GetOpenIdTokenForDeveloperIdentityCommand")
      }
    },
    m22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "GetPrincipalTagAttributeMap", {}).n("CognitoIdentityClient", "GetPrincipalTagAttributeMapCommand").f(void 0, void 0).ser($x6).de(cx6).build() {
      static {
        aA(this, "GetPrincipalTagAttributeMapCommand")
      }
    },
    d22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "ListIdentities", {}).n("CognitoIdentityClient", "ListIdentitiesCommand").f(void 0, void 0).ser(qx6).de(lx6).build() {
      static {
        aA(this, "ListIdentitiesCommand")
      }
    },
    Gn1 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "ListIdentityPools", {}).n("CognitoIdentityClient", "ListIdentityPoolsCommand").f(void 0, void 0).ser(Mx6).de(ix6).build() {
      static {
        aA(this, "ListIdentityPoolsCommand")
      }
    },
    u22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "ListTagsForResource", {}).n("CognitoIdentityClient", "ListTagsForResourceCommand").f(void 0, void 0).ser(Lx6).de(nx6).build() {
      static {
        aA(this, "ListTagsForResourceCommand")
      }
    },
    p22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "LookupDeveloperIdentity", {}).n("CognitoIdentityClient", "LookupDeveloperIdentityCommand").f(void 0, void 0).ser(Rx6).de(ax6).build() {
      static {
        aA(this, "LookupDeveloperIdentityCommand")
      }
    },
    c22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "MergeDeveloperIdentities", {}).n("CognitoIdentityClient", "MergeDeveloperIdentitiesCommand").f(void 0, void 0).ser(Ox6).de(sx6).build() {
      static {
        aA(this, "MergeDeveloperIdentitiesCommand")
      }
    },
    l22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "SetIdentityPoolRoles", {}).n("CognitoIdentityClient", "SetIdentityPoolRolesCommand").f(void 0, void 0).ser(Tx6).de(rx6).build() {
      static {
        aA(this, "SetIdentityPoolRolesCommand")
      }
    },
    i22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "SetPrincipalTagAttributeMap", {}).n("CognitoIdentityClient", "SetPrincipalTagAttributeMapCommand").f(void 0, void 0).ser(Px6).de(ox6).build() {
      static {
        aA(this, "SetPrincipalTagAttributeMapCommand")
      }
    },
    n22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "TagResource", {}).n("CognitoIdentityClient", "TagResourceCommand").f(void 0, void 0).ser(Sx6).de(tx6).build() {
      static {
        aA(this, "TagResourceCommand")
      }
    },
    a22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "UnlinkDeveloperIdentity", {}).n("CognitoIdentityClient", "UnlinkDeveloperIdentityCommand").f(void 0, void 0).ser(_x6).de(ex6).build() {
      static {
        aA(this, "UnlinkDeveloperIdentityCommand")
      }
    },
    s22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "UnlinkIdentity", {}).n("CognitoIdentityClient", "UnlinkIdentityCommand").f(P22, void 0).ser(jx6).de(Af6).build() {
      static {
        aA(this, "UnlinkIdentityCommand")
      }
    },
    r22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "UntagResource", {}).n("CognitoIdentityClient", "UntagResourceCommand").f(void 0, void 0).ser(yx6).de(Bf6).build() {
      static {
        aA(this, "UntagResourceCommand")
      }
    },
    o22 = class extends nA.Command.classBuilder().ep(M3).m(function(A, B, Q, I) {
      return [L3.getSerdePlugin(Q, this.serialize, this.deserialize), I3.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSCognitoIdentityService", "UpdateIdentityPool", {}).n("CognitoIdentityClient", "UpdateIdentityPoolCommand").f(void 0, void 0).ser(kx6).de(Qf6).build() {
      static {
        aA(this, "UpdateIdentityPoolCommand")
      }
    },
    Uf6 = {
      CreateIdentityPoolCommand: _22,
      DeleteIdentitiesCommand: j22,
      DeleteIdentityPoolCommand: y22,
      DescribeIdentityCommand: k22,
      DescribeIdentityPoolCommand: x22,
      GetCredentialsForIdentityCommand: f22,
      GetIdCommand: v22,
      GetIdentityPoolRolesCommand: b22,
      GetOpenIdTokenCommand: g22,
      GetOpenIdTokenForDeveloperIdentityCommand: h22,
      GetPrincipalTagAttributeMapCommand: m22,
      ListIdentitiesCommand: d22,
      ListIdentityPoolsCommand: Gn1,
      ListTagsForResourceCommand: u22,
      LookupDeveloperIdentityCommand: p22,
      MergeDeveloperIdentitiesCommand: c22,
      SetIdentityPoolRolesCommand: l22,
      SetPrincipalTagAttributeMapCommand: i22,
      TagResourceCommand: n22,
      UnlinkDeveloperIdentityCommand: a22,
      UnlinkIdentityCommand: s22,
      UntagResourceCommand: r22,
      UpdateIdentityPoolCommand: o22
    },
    t22 = class extends In1 {
      static {
        aA(this, "CognitoIdentity")
      }
    };
  nA.createAggregatedClient(Uf6, t22);
  var Nf6 = QX1.createPaginator(In1, Gn1, "NextToken", "NextToken", "MaxResults")
})
// @from(Start 5934842, End 5942266)
Jn1 = z((Wg8, X92) => {
  var {
    defineProperty: ZX1,
    getOwnPropertyDescriptor: $f6,
    getOwnPropertyNames: B92
  } = Object, qf6 = Object.prototype.hasOwnProperty, gJ = (A, B) => ZX1(A, "name", {
    value: B,
    configurable: !0
  }), Mf6 = (A, B) => function Q() {
    return A && (B = A[B92(A)[0]](A = 0)), B
  }, Q92 = (A, B) => {
    for (var Q in B) ZX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Lf6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of B92(B))
        if (!qf6.call(A, G) && G !== Q) ZX1(A, G, {
          get: () => B[G],
          enumerable: !(I = $f6(B, G)) || I.enumerable
        })
    }
    return A
  }, Rf6 = (A) => Lf6(ZX1({}, "__esModule", {
    value: !0
  }), A), Dn1 = {};
  Q92(Dn1, {
    CognitoIdentityClient: () => GX1.CognitoIdentityClient,
    GetCredentialsForIdentityCommand: () => GX1.GetCredentialsForIdentityCommand,
    GetIdCommand: () => GX1.GetIdCommand
  });
  var GX1, I92 = Mf6({
      "src/loadCognitoIdentity.ts"() {
        GX1 = A92()
      }
    }),
    G92 = {};
  Q92(G92, {
    fromCognitoIdentity: () => Wn1,
    fromCognitoIdentityPool: () => J92
  });
  X92.exports = Rf6(G92);
  var DX1 = $I();

  function Yn1(A) {
    return Promise.all(Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      if (typeof I === "string") B.push([Q, I]);
      else B.push(I().then((G) => [Q, G]));
      return B
    }, [])).then((B) => B.reduce((Q, [I, G]) => {
      return Q[I] = G, Q
    }, {}))
  }
  gJ(Yn1, "resolveLogins");

  function Wn1(A) {
    return async (B) => {
      A.logger?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");
      let {
        GetCredentialsForIdentityCommand: Q,
        CognitoIdentityClient: I
      } = await Promise.resolve().then(() => (I92(), Dn1)), G = gJ((J) => A.clientConfig?.[J] ?? A.parentClientConfig?.[J] ?? B?.callerClientConfig?.[J], "fromConfigs"), {
        Credentials: {
          AccessKeyId: Z = Z92(A.logger),
          Expiration: D,
          SecretKey: Y = Y92(A.logger),
          SessionToken: W
        } = D92(A.logger)
      } = await (A.client ?? new I(Object.assign({}, A.clientConfig ?? {}, {
        region: G("region"),
        profile: G("profile")
      }))).send(new Q({
        CustomRoleArn: A.customRoleArn,
        IdentityId: A.identityId,
        Logins: A.logins ? await Yn1(A.logins) : void 0
      }));
      return {
        identityId: A.identityId,
        accessKeyId: Z,
        secretAccessKey: Y,
        sessionToken: W,
        expiration: D
      }
    }
  }
  gJ(Wn1, "fromCognitoIdentity");

  function Z92(A) {
    throw new DX1.CredentialsProviderError("Response from Amazon Cognito contained no access key ID", {
      logger: A
    })
  }
  gJ(Z92, "throwOnMissingAccessKeyId");

  function D92(A) {
    throw new DX1.CredentialsProviderError("Response from Amazon Cognito contained no credentials", {
      logger: A
    })
  }
  gJ(D92, "throwOnMissingCredentials");

  function Y92(A) {
    throw new DX1.CredentialsProviderError("Response from Amazon Cognito contained no secret key", {
      logger: A
    })
  }
  gJ(Y92, "throwOnMissingSecretKey");
  var Zn1 = "IdentityIds",
    Of6 = class {
      constructor(A = "aws:cognito-identity-ids") {
        this.dbName = A
      }
      static {
        gJ(this, "IndexedDbStorage")
      }
      getItem(A) {
        return this.withObjectStore("readonly", (B) => {
          let Q = B.get(A);
          return new Promise((I) => {
            Q.onerror = () => I(null), Q.onsuccess = () => I(Q.result ? Q.result.value : null)
          })
        }).catch(() => null)
      }
      removeItem(A) {
        return this.withObjectStore("readwrite", (B) => {
          let Q = B.delete(A);
          return new Promise((I, G) => {
            Q.onerror = () => G(Q.error), Q.onsuccess = () => I()
          })
        })
      }
      setItem(A, B) {
        return this.withObjectStore("readwrite", (Q) => {
          let I = Q.put({
            id: A,
            value: B
          });
          return new Promise((G, Z) => {
            I.onerror = () => Z(I.error), I.onsuccess = () => G()
          })
        })
      }
      getDb() {
        let A = self.indexedDB.open(this.dbName, 1);
        return new Promise((B, Q) => {
          A.onsuccess = () => {
            B(A.result)
          }, A.onerror = () => {
            Q(A.error)
          }, A.onblocked = () => {
            Q(new Error("Unable to access DB"))
          }, A.onupgradeneeded = () => {
            let I = A.result;
            I.onerror = () => {
              Q(new Error("Failed to create object store"))
            }, I.createObjectStore(Zn1, {
              keyPath: "id"
            })
          }
        })
      }
      withObjectStore(A, B) {
        return this.getDb().then((Q) => {
          let I = Q.transaction(Zn1, A);
          return I.oncomplete = () => Q.close(), new Promise((G, Z) => {
            I.onerror = () => Z(I.error), G(B(I.objectStore(Zn1)))
          }).catch((G) => {
            throw Q.close(), G
          })
        })
      }
    },
    Tf6 = class {
      constructor(A = {}) {
        this.store = A
      }
      static {
        gJ(this, "InMemoryStorage")
      }
      getItem(A) {
        if (A in this.store) return this.store[A];
        return null
      }
      removeItem(A) {
        delete this.store[A]
      }
      setItem(A, B) {
        this.store[A] = B
      }
    },
    Pf6 = new Tf6;

  function W92() {
    if (typeof self === "object" && self.indexedDB) return new Of6;
    if (typeof window === "object" && window.localStorage) return window.localStorage;
    return Pf6
  }
  gJ(W92, "localStorage");

  function J92({
    accountId: A,
    cache: B = W92(),
    client: Q,
    clientConfig: I,
    customRoleArn: G,
    identityPoolId: Z,
    logins: D,
    userIdentifier: Y = !D || Object.keys(D).length === 0 ? "ANONYMOUS" : void 0,
    logger: W,
    parentClientConfig: J
  }) {
    W?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");
    let F = Y ? `aws:cognito-identity-credentials:${Z}:${Y}` : void 0,
      X = gJ(async (V) => {
        let {
          GetIdCommand: C,
          CognitoIdentityClient: K
        } = await Promise.resolve().then(() => (I92(), Dn1)), E = gJ((O) => I?.[O] ?? J?.[O] ?? V?.callerClientConfig?.[O], "fromConfigs"), N = Q ?? new K(Object.assign({}, I ?? {}, {
          region: E("region"),
          profile: E("profile")
        })), q = F && await B.getItem(F);
        if (!q) {
          let {
            IdentityId: O = F92(W)
          } = await N.send(new C({
            AccountId: A,
            IdentityPoolId: Z,
            Logins: D ? await Yn1(D) : void 0
          }));
          if (q = O, F) Promise.resolve(B.setItem(F, q)).catch(() => {})
        }
        return X = Wn1({
          client: N,
          customRoleArn: G,
          logins: D,
          identityId: q
        }), X(V)
      }, "provider");
    return (V) => X(V).catch(async (C) => {
      if (F) Promise.resolve(B.removeItem(F)).catch(() => {});
      throw C
    })
  }
  gJ(J92, "fromCognitoIdentityPool");

  function F92(A) {
    throw new DX1.CredentialsProviderError("Response from Amazon Cognito contained no identity ID", {
      logger: A
    })
  }
  gJ(F92, "throwOnMissingId")
})
// @from(Start 5942272, End 5942507)
K92 = z((V92) => {
  Object.defineProperty(V92, "__esModule", {
    value: !0
  });
  V92.fromCognitoIdentity = void 0;
  var Sf6 = Jn1(),
    _f6 = (A) => Sf6.fromCognitoIdentity({
      ...A
    });
  V92.fromCognitoIdentity = _f6
})
// @from(Start 5942513, End 5942760)
w92 = z((H92) => {
  Object.defineProperty(H92, "__esModule", {
    value: !0
  });
  H92.fromCognitoIdentityPool = void 0;
  var jf6 = Jn1(),
    yf6 = (A) => jf6.fromCognitoIdentityPool({
      ...A
    });
  H92.fromCognitoIdentityPool = yf6
})
// @from(Start 5942766, End 5943089)
N92 = z((E92) => {
  Object.defineProperty(E92, "__esModule", {
    value: !0
  });
  E92.fromContainerMetadata = void 0;
  var kf6 = B_(),
    xf6 = (A) => {
      return A?.logger?.debug("@smithy/credential-provider-imds", "fromContainerMetadata"), kf6.fromContainerMetadata(A)
    };
  E92.fromContainerMetadata = xf6
})
// @from(Start 5943095, End 5943277)
M92 = z(($92) => {
  Object.defineProperty($92, "__esModule", {
    value: !0
  });
  $92.fromEnv = void 0;
  var ff6 = d71(),
    vf6 = (A) => ff6.fromEnv(A);
  $92.fromEnv = vf6
})
// @from(Start 5943283, End 5943487)
O92 = z((L92) => {
  Object.defineProperty(L92, "__esModule", {
    value: !0
  });
  L92.fromIni = void 0;
  var bf6 = _x1(),
    gf6 = (A = {}) => bf6.fromIni({
      ...A
    });
  L92.fromIni = gf6
})
// @from(Start 5943493, End 5943908)
S92 = z((T92) => {
  Object.defineProperty(T92, "__esModule", {
    value: !0
  });
  T92.fromInstanceMetadata = void 0;
  var hf6 = NC(),
    mf6 = B_(),
    df6 = (A) => {
      return A?.logger?.debug("@smithy/credential-provider-imds", "fromInstanceMetadata"), async () => mf6.fromInstanceMetadata(A)().then((B) => hf6.setCredentialFeature(B, "CREDENTIALS_IMDS", "0"))
    };
  T92.fromInstanceMetadata = df6
})
// @from(Start 5943914, End 5944153)
Fn1 = z((_92) => {
  Object.defineProperty(_92, "__esModule", {
    value: !0
  });
  _92.fromNodeProviderChain = void 0;
  var uf6 = ha(),
    pf6 = (A = {}) => uf6.defaultProvider({
      ...A
    });
  _92.fromNodeProviderChain = pf6
})
// @from(Start 5944159, End 5944353)
x92 = z((y92) => {
  Object.defineProperty(y92, "__esModule", {
    value: !0
  });
  y92.fromProcess = void 0;
  var cf6 = iI1(),
    lf6 = (A) => cf6.fromProcess(A);
  y92.fromProcess = lf6
})
// @from(Start 5944359, End 5944588)
b92 = z((f92) => {
  Object.defineProperty(f92, "__esModule", {
    value: !0
  });
  f92.fromSSO = void 0;
  var if6 = dI1(),
    nf6 = (A = {}) => {
      return if6.fromSSO({
        ...A
      })
    };
  f92.fromSSO = nf6
})
// @from(Start 5944594, End 5945014)
h92 = z((YX1) => {
  Object.defineProperty(YX1, "__esModule", {
    value: !0
  });
  YX1.STSClient = YX1.AssumeRoleCommand = void 0;
  var g92 = cI1();
  Object.defineProperty(YX1, "AssumeRoleCommand", {
    enumerable: !0,
    get: function() {
      return g92.AssumeRoleCommand
    }
  });
  Object.defineProperty(YX1, "STSClient", {
    enumerable: !0,
    get: function() {
      return g92.STSClient
    }
  })
})
// @from(Start 5945020, End 5949499)
u92 = z((dw) => {
  var sf6 = dw && dw.__createBinding || (Object.create ? function(A, B, Q, I) {
      if (I === void 0) I = Q;
      var G = Object.getOwnPropertyDescriptor(B, Q);
      if (!G || ("get" in G ? !B.__esModule : G.writable || G.configurable)) G = {
        enumerable: !0,
        get: function() {
          return B[Q]
        }
      };
      Object.defineProperty(A, I, G)
    } : function(A, B, Q, I) {
      if (I === void 0) I = Q;
      A[I] = B[Q]
    }),
    rf6 = dw && dw.__setModuleDefault || (Object.create ? function(A, B) {
      Object.defineProperty(A, "default", {
        enumerable: !0,
        value: B
      })
    } : function(A, B) {
      A.default = B
    }),
    of6 = dw && dw.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var B = {};
      if (A != null) {
        for (var Q in A)
          if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) sf6(B, A, Q)
      }
      return rf6(B, A), B
    };
  Object.defineProperty(dw, "__esModule", {
    value: !0
  });
  dw.fromTemporaryCredentials = void 0;
  var tf6 = NI(),
    m92 = $I(),
    ef6 = "us-east-1",
    Av6 = (A, B, Q) => {
      let I;
      return async (G = {}) => {
        let {
          callerClientConfig: Z
        } = G, D = A.clientConfig?.profile ?? Z?.profile, Y = A.logger ?? Z?.logger;
        Y?.debug("@aws-sdk/credential-providers - fromTemporaryCredentials (STS)");
        let W = {
          ...A.params,
          RoleSessionName: A.params.RoleSessionName ?? "aws-sdk-js-" + Date.now()
        };
        if (W?.SerialNumber) {
          if (!A.mfaCodeProvider) throw new m92.CredentialsProviderError("Temporary credential requires multi-factor authentication, but no MFA code callback was provided.", {
            tryNextLink: !1,
            logger: Y
          });
          W.TokenCode = await A.mfaCodeProvider(W?.SerialNumber)
        }
        let {
          AssumeRoleCommand: J,
          STSClient: F
        } = await Promise.resolve().then(() => of6(h92()));
        if (!I) {
          let V = typeof B === "function" ? B() : void 0,
            C = [A.masterCredentials, A.clientConfig?.credentials, void Z?.credentials, Z?.credentialDefaultProvider?.(), V],
            K = "STS client default credentials";
          if (C[0]) K = "options.masterCredentials";
          else if (C[1]) K = "options.clientConfig.credentials";
          else if (C[2]) throw K = "caller client's credentials", new Error("fromTemporaryCredentials recursion in callerClientConfig.credentials");
          else if (C[3]) K = "caller client's credentialDefaultProvider";
          else if (C[4]) K = "AWS SDK default credentials";
          let E = [A.clientConfig?.region, Z?.region, await Q?.({
              profile: D
            }), ef6],
            N = "default partition's default region";
          if (E[0]) N = "options.clientConfig.region";
          else if (E[1]) N = "caller client's region";
          else if (E[2]) N = "file or env region";
          let q = [d92(A.clientConfig?.requestHandler), d92(Z?.requestHandler)],
            O = "STS default requestHandler";
          if (q[0]) O = "options.clientConfig.requestHandler";
          else if (q[1]) O = "caller client's requestHandler";
          Y?.debug?.(`@aws-sdk/credential-providers - fromTemporaryCredentials STS client init with ${N}=${await tf6.normalizeProvider(WX1(E))()}, ${K}, ${O}.`), I = new F({
            ...A.clientConfig,
            credentials: WX1(C),
            logger: Y,
            profile: D,
            region: WX1(E),
            requestHandler: WX1(q)
          })
        }
        if (A.clientPlugins)
          for (let V of A.clientPlugins) I.middlewareStack.use(V);
        let {
          Credentials: X
        } = await I.send(new J(W));
        if (!X || !X.AccessKeyId || !X.SecretAccessKey) throw new m92.CredentialsProviderError(`Invalid response from STS.assumeRole call with role ${W.RoleArn}`, {
          logger: Y
        });
        return {
          accessKeyId: X.AccessKeyId,
          secretAccessKey: X.SecretAccessKey,
          sessionToken: X.SessionToken,
          expiration: X.Expiration,
          credentialScope: X.CredentialScope
        }
      }
    };
  dw.fromTemporaryCredentials = Av6;
  var d92 = (A) => {
      return A?.metadata?.handlerProtocol === "h2" ? void 0 : A
    },
    WX1 = (A) => {
      for (let B of A)
        if (B !== void 0) return B
    }
})
// @from(Start 5949505, End 5950192)
l92 = z((p92) => {
  Object.defineProperty(p92, "__esModule", {
    value: !0
  });
  p92.fromTemporaryCredentials = void 0;
  var Bv6 = _D(),
    Qv6 = qC(),
    Iv6 = Fn1(),
    Gv6 = u92(),
    Zv6 = (A) => {
      return Gv6.fromTemporaryCredentials(A, Iv6.fromNodeProviderChain, async ({
        profile: B = process.env.AWS_PROFILE
      }) => Qv6.loadConfig({
        environmentVariableSelector: (Q) => Q.AWS_REGION,
        configFileSelector: (Q) => {
          return Q.region
        },
        default: () => {
          return
        }
      }, {
        ...Bv6.NODE_REGION_CONFIG_FILE_OPTIONS,
        profile: B
      })())
    };
  p92.fromTemporaryCredentials = Zv6
})
// @from(Start 5950198, End 5950419)
a92 = z((i92) => {
  Object.defineProperty(i92, "__esModule", {
    value: !0
  });
  i92.fromTokenFile = void 0;
  var Dv6 = fa(),
    Yv6 = (A = {}) => Dv6.fromTokenFile({
      ...A
    });
  i92.fromTokenFile = Yv6
})
// @from(Start 5950425, End 5950638)
o92 = z((s92) => {
  Object.defineProperty(s92, "__esModule", {
    value: !0
  });
  s92.fromWebToken = void 0;
  var Wv6 = fa(),
    Jv6 = (A) => Wv6.fromWebToken({
      ...A
    });
  s92.fromWebToken = Jv6
})
// @from(Start 5950644, End 5951300)
t92 = z((uZ) => {
  Object.defineProperty(uZ, "__esModule", {
    value: !0
  });
  uZ.fromHttp = void 0;
  var hJ = IA2();
  hJ.__exportStar(ZA2(), uZ);
  hJ.__exportStar(K92(), uZ);
  hJ.__exportStar(w92(), uZ);
  hJ.__exportStar(N92(), uZ);
  var Fv6 = AI1();
  Object.defineProperty(uZ, "fromHttp", {
    enumerable: !0,
    get: function() {
      return Fv6.fromHttp
    }
  });
  hJ.__exportStar(M92(), uZ);
  hJ.__exportStar(O92(), uZ);
  hJ.__exportStar(S92(), uZ);
  hJ.__exportStar(Fn1(), uZ);
  hJ.__exportStar(x92(), uZ);
  hJ.__exportStar(b92(), uZ);
  hJ.__exportStar(l92(), uZ);
  hJ.__exportStar(a92(), uZ);
  hJ.__exportStar(o92(), uZ)
})
// @from(Start 5951306, End 5954209)
Xn1 = z((Tg8, Y42) => {
  var {
    defineProperty: JX1,
    getOwnPropertyDescriptor: Vv6,
    getOwnPropertyNames: Cv6
  } = Object, Kv6 = Object.prototype.hasOwnProperty, FX1 = (A, B) => JX1(A, "name", {
    value: B,
    configurable: !0
  }), Hv6 = (A, B) => {
    for (var Q in B) JX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, zv6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Cv6(B))
        if (!Kv6.call(A, G) && G !== Q) JX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Vv6(B, G)) || I.enumerable
        })
    }
    return A
  }, wv6 = (A) => zv6(JX1({}, "__esModule", {
    value: !0
  }), A), e92 = {};
  Hv6(e92, {
    AlgorithmId: () => I42,
    EndpointURLScheme: () => Q42,
    FieldPosition: () => G42,
    HttpApiKeyAuthLocation: () => B42,
    HttpAuthLocation: () => A42,
    IniSectionType: () => Z42,
    RequestHandlerProtocol: () => D42,
    SMITHY_CONTEXT_KEY: () => qv6,
    getDefaultClientConfiguration: () => Nv6,
    resolveDefaultRuntimeConfig: () => $v6
  });
  Y42.exports = wv6(e92);
  var A42 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(A42 || {}),
    B42 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(B42 || {}),
    Q42 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(Q42 || {}),
    I42 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(I42 || {}),
    Ev6 = FX1((A) => {
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
    Uv6 = FX1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    Nv6 = FX1((A) => {
      return {
        ...Ev6(A)
      }
    }, "getDefaultClientConfiguration"),
    $v6 = FX1((A) => {
      return {
        ...Uv6(A)
      }
    }, "resolveDefaultRuntimeConfig"),
    G42 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(G42 || {}),
    qv6 = "__smithy_context",
    Z42 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(Z42 || {}),
    D42 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(D42 || {})
})
// @from(Start 5954215, End 5958570)
VX1 = z((Pg8, H42) => {
  var {
    defineProperty: XX1,
    getOwnPropertyDescriptor: Mv6,
    getOwnPropertyNames: Lv6
  } = Object, Rv6 = Object.prototype.hasOwnProperty, BO = (A, B) => XX1(A, "name", {
    value: B,
    configurable: !0
  }), Ov6 = (A, B) => {
    for (var Q in B) XX1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Tv6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Lv6(B))
        if (!Rv6.call(A, G) && G !== Q) XX1(A, G, {
          get: () => B[G],
          enumerable: !(I = Mv6(B, G)) || I.enumerable
        })
    }
    return A
  }, Pv6 = (A) => Tv6(XX1({}, "__esModule", {
    value: !0
  }), A), W42 = {};
  Ov6(W42, {
    Field: () => yv6,
    Fields: () => kv6,
    HttpRequest: () => xv6,
    HttpResponse: () => fv6,
    getHttpHandlerExtensionConfiguration: () => Sv6,
    isValidHostname: () => K42,
    resolveHttpHandlerRuntimeConfig: () => _v6
  });
  H42.exports = Pv6(W42);
  var Sv6 = BO((A) => {
      let B = A.httpHandler;
      return {
        setHttpHandler(Q) {
          B = Q
        },
        httpHandler() {
          return B
        },
        updateHttpClientConfig(Q, I) {
          B.updateHttpClientConfig(Q, I)
        },
        httpHandlerConfigs() {
          return B.httpHandlerConfigs()
        }
      }
    }, "getHttpHandlerExtensionConfiguration"),
    _v6 = BO((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    jv6 = Xn1(),
    J42 = class A {
      constructor({
        name: B,
        kind: Q = jv6.FieldPosition.HEADER,
        values: I = []
      }) {
        this.name = B, this.kind = Q, this.values = I
      }
      add(B) {
        this.values.push(B)
      }
      set(B) {
        this.values = B
      }
      remove(B) {
        this.values = this.values.filter((Q) => Q !== B)
      }
      toString() {
        return this.values.map((B) => B.includes(",") || B.includes(" ") ? `"${B}"` : B).join(", ")
      }
      get() {
        return this.values
      }
    };
  BO(J42, "Field");
  var yv6 = J42,
    F42 = class A {
      constructor({
        fields: B = [],
        encoding: Q = "utf-8"
      }) {
        this.entries = {}, B.forEach(this.setField.bind(this)), this.encoding = Q
      }
      setField(B) {
        this.entries[B.name.toLowerCase()] = B
      }
      getField(B) {
        return this.entries[B.toLowerCase()]
      }
      removeField(B) {
        delete this.entries[B.toLowerCase()]
      }
      getByType(B) {
        return Object.values(this.entries).filter((Q) => Q.kind === B)
      }
    };
  BO(F42, "Fields");
  var kv6 = F42,
    X42 = class A {
      constructor(B) {
        this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
      }
      static isInstance(B) {
        if (!B) return !1;
        let Q = B;
        return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
      }
      clone() {
        let B = new A({
          ...this,
          headers: {
            ...this.headers
          }
        });
        if (B.query) B.query = V42(B.query);
        return B
      }
    };
  BO(X42, "HttpRequest");
  var xv6 = X42;

  function V42(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  BO(V42, "cloneQuery");
  var C42 = class A {
    constructor(B) {
      this.statusCode = B.statusCode, this.reason = B.reason, this.headers = B.headers || {}, this.body = B.body
    }
    static isInstance(B) {
      if (!B) return !1;
      let Q = B;
      return typeof Q.statusCode === "number" && typeof Q.headers === "object"
    }
  };
  BO(C42, "HttpResponse");
  var fv6 = C42;

  function K42(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  BO(K42, "isValidHostname")
})
// @from(Start 5958576, End 5969939)
Cn1 = z((Sg8, KX1) => {
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  var z42, w42, E42, U42, N42, $42, q42, M42, L42, CX1, Vn1, R42, O42, em, T42, P42, S42, _42, j42, y42, k42, x42, f42;
  (function(A) {
    var B = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) define("tslib", ["exports"], function(I) {
      A(Q(B, Q(I)))
    });
    else if (typeof KX1 === "object" && typeof Sg8 === "object") A(Q(B, Q(Sg8)));
    else A(Q(B));

    function Q(I, G) {
      if (I !== B)
        if (typeof Object.create === "function") Object.defineProperty(I, "__esModule", {
          value: !0
        });
        else I.__esModule = !0;
      return function(Z, D) {
        return I[Z] = G ? G(Z, D) : D
      }
    }
  })(function(A) {
    var B = Object.setPrototypeOf || {
      __proto__: []
    }
    instanceof Array && function(Q, I) {
      Q.__proto__ = I
    } || function(Q, I) {
      for (var G in I)
        if (I.hasOwnProperty(G)) Q[G] = I[G]
    };
    z42 = function(Q, I) {
      B(Q, I);

      function G() {
        this.constructor = Q
      }
      Q.prototype = I === null ? Object.create(I) : (G.prototype = I.prototype, new G)
    }, w42 = Object.assign || function(Q) {
      for (var I, G = 1, Z = arguments.length; G < Z; G++) {
        I = arguments[G];
        for (var D in I)
          if (Object.prototype.hasOwnProperty.call(I, D)) Q[D] = I[D]
      }
      return Q
    }, E42 = function(Q, I) {
      var G = {};
      for (var Z in Q)
        if (Object.prototype.hasOwnProperty.call(Q, Z) && I.indexOf(Z) < 0) G[Z] = Q[Z];
      if (Q != null && typeof Object.getOwnPropertySymbols === "function") {
        for (var D = 0, Z = Object.getOwnPropertySymbols(Q); D < Z.length; D++)
          if (I.indexOf(Z[D]) < 0 && Object.prototype.propertyIsEnumerable.call(Q, Z[D])) G[Z[D]] = Q[Z[D]]
      }
      return G
    }, U42 = function(Q, I, G, Z) {
      var D = arguments.length,
        Y = D < 3 ? I : Z === null ? Z = Object.getOwnPropertyDescriptor(I, G) : Z,
        W;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") Y = Reflect.decorate(Q, I, G, Z);
      else
        for (var J = Q.length - 1; J >= 0; J--)
          if (W = Q[J]) Y = (D < 3 ? W(Y) : D > 3 ? W(I, G, Y) : W(I, G)) || Y;
      return D > 3 && Y && Object.defineProperty(I, G, Y), Y
    }, N42 = function(Q, I) {
      return function(G, Z) {
        I(G, Z, Q)
      }
    }, $42 = function(Q, I) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(Q, I)
    }, q42 = function(Q, I, G, Z) {
      function D(Y) {
        return Y instanceof G ? Y : new G(function(W) {
          W(Y)
        })
      }
      return new(G || (G = Promise))(function(Y, W) {
        function J(V) {
          try {
            X(Z.next(V))
          } catch (C) {
            W(C)
          }
        }

        function F(V) {
          try {
            X(Z.throw(V))
          } catch (C) {
            W(C)
          }
        }

        function X(V) {
          V.done ? Y(V.value) : D(V.value).then(J, F)
        }
        X((Z = Z.apply(Q, I || [])).next())
      })
    }, M42 = function(Q, I) {
      var G = {
          label: 0,
          sent: function() {
            if (Y[0] & 1) throw Y[1];
            return Y[1]
          },
          trys: [],
          ops: []
        },
        Z, D, Y, W;
      return W = {
        next: J(0),
        throw: J(1),
        return: J(2)
      }, typeof Symbol === "function" && (W[Symbol.iterator] = function() {
        return this
      }), W;

      function J(X) {
        return function(V) {
          return F([X, V])
        }
      }

      function F(X) {
        if (Z) throw new TypeError("Generator is already executing.");
        while (G) try {
          if (Z = 1, D && (Y = X[0] & 2 ? D.return : X[0] ? D.throw || ((Y = D.return) && Y.call(D), 0) : D.next) && !(Y = Y.call(D, X[1])).done) return Y;
          if (D = 0, Y) X = [X[0] & 2, Y.value];
          switch (X[0]) {
            case 0:
            case 1:
              Y = X;
              break;
            case 4:
              return G.label++, {
                value: X[1],
                done: !1
              };
            case 5:
              G.label++, D = X[1], X = [0];
              continue;
            case 7:
              X = G.ops.pop(), G.trys.pop();
              continue;
            default:
              if ((Y = G.trys, !(Y = Y.length > 0 && Y[Y.length - 1])) && (X[0] === 6 || X[0] === 2)) {
                G = 0;
                continue
              }
              if (X[0] === 3 && (!Y || X[1] > Y[0] && X[1] < Y[3])) {
                G.label = X[1];
                break
              }
              if (X[0] === 6 && G.label < Y[1]) {
                G.label = Y[1], Y = X;
                break
              }
              if (Y && G.label < Y[2]) {
                G.label = Y[2], G.ops.push(X);
                break
              }
              if (Y[2]) G.ops.pop();
              G.trys.pop();
              continue
          }
          X = I.call(Q, G)
        } catch (V) {
          X = [6, V], D = 0
        } finally {
          Z = Y = 0
        }
        if (X[0] & 5) throw X[1];
        return {
          value: X[0] ? X[1] : void 0,
          done: !0
        }
      }
    }, f42 = function(Q, I, G, Z) {
      if (Z === void 0) Z = G;
      Q[Z] = I[G]
    }, L42 = function(Q, I) {
      for (var G in Q)
        if (G !== "default" && !I.hasOwnProperty(G)) I[G] = Q[G]
    }, CX1 = function(Q) {
      var I = typeof Symbol === "function" && Symbol.iterator,
        G = I && Q[I],
        Z = 0;
      if (G) return G.call(Q);
      if (Q && typeof Q.length === "number") return {
        next: function() {
          if (Q && Z >= Q.length) Q = void 0;
          return {
            value: Q && Q[Z++],
            done: !Q
          }
        }
      };
      throw new TypeError(I ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }, Vn1 = function(Q, I) {
      var G = typeof Symbol === "function" && Q[Symbol.iterator];
      if (!G) return Q;
      var Z = G.call(Q),
        D, Y = [],
        W;
      try {
        while ((I === void 0 || I-- > 0) && !(D = Z.next()).done) Y.push(D.value)
      } catch (J) {
        W = {
          error: J
        }
      } finally {
        try {
          if (D && !D.done && (G = Z.return)) G.call(Z)
        } finally {
          if (W) throw W.error
        }
      }
      return Y
    }, R42 = function() {
      for (var Q = [], I = 0; I < arguments.length; I++) Q = Q.concat(Vn1(arguments[I]));
      return Q
    }, O42 = function() {
      for (var Q = 0, I = 0, G = arguments.length; I < G; I++) Q += arguments[I].length;
      for (var Z = Array(Q), D = 0, I = 0; I < G; I++)
        for (var Y = arguments[I], W = 0, J = Y.length; W < J; W++, D++) Z[D] = Y[W];
      return Z
    }, em = function(Q) {
      return this instanceof em ? (this.v = Q, this) : new em(Q)
    }, T42 = function(Q, I, G) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var Z = G.apply(Q, I || []),
        D, Y = [];
      return D = {}, W("next"), W("throw"), W("return"), D[Symbol.asyncIterator] = function() {
        return this
      }, D;

      function W(K) {
        if (Z[K]) D[K] = function(E) {
          return new Promise(function(N, q) {
            Y.push([K, E, N, q]) > 1 || J(K, E)
          })
        }
      }

      function J(K, E) {
        try {
          F(Z[K](E))
        } catch (N) {
          C(Y[0][3], N)
        }
      }

      function F(K) {
        K.value instanceof em ? Promise.resolve(K.value.v).then(X, V) : C(Y[0][2], K)
      }

      function X(K) {
        J("next", K)
      }

      function V(K) {
        J("throw", K)
      }

      function C(K, E) {
        if (K(E), Y.shift(), Y.length) J(Y[0][0], Y[0][1])
      }
    }, P42 = function(Q) {
      var I, G;
      return I = {}, Z("next"), Z("throw", function(D) {
        throw D
      }), Z("return"), I[Symbol.iterator] = function() {
        return this
      }, I;

      function Z(D, Y) {
        I[D] = Q[D] ? function(W) {
          return (G = !G) ? {
            value: em(Q[D](W)),
            done: D === "return"
          } : Y ? Y(W) : W
        } : Y
      }
    }, S42 = function(Q) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var I = Q[Symbol.asyncIterator],
        G;
      return I ? I.call(Q) : (Q = typeof CX1 === "function" ? CX1(Q) : Q[Symbol.iterator](), G = {}, Z("next"), Z("throw"), Z("return"), G[Symbol.asyncIterator] = function() {
        return this
      }, G);

      function Z(Y) {
        G[Y] = Q[Y] && function(W) {
          return new Promise(function(J, F) {
            W = Q[Y](W), D(J, F, W.done, W.value)
          })
        }
      }

      function D(Y, W, J, F) {
        Promise.resolve(F).then(function(X) {
          Y({
            value: X,
            done: J
          })
        }, W)
      }
    }, _42 = function(Q, I) {
      if (Object.defineProperty) Object.defineProperty(Q, "raw", {
        value: I
      });
      else Q.raw = I;
      return Q
    }, j42 = function(Q) {
      if (Q && Q.__esModule) return Q;
      var I = {};
      if (Q != null) {
        for (var G in Q)
          if (Object.hasOwnProperty.call(Q, G)) I[G] = Q[G]
      }
      return I.default = Q, I
    }, y42 = function(Q) {
      return Q && Q.__esModule ? Q : {
        default: Q
      }
    }, k42 = function(Q, I) {
      if (!I.has(Q)) throw new TypeError("attempted to get private field on non-instance");
      return I.get(Q)
    }, x42 = function(Q, I, G) {
      if (!I.has(Q)) throw new TypeError("attempted to set private field on non-instance");
      return I.set(Q, G), G
    }, A("__extends", z42), A("__assign", w42), A("__rest", E42), A("__decorate", U42), A("__param", N42), A("__metadata", $42), A("__awaiter", q42), A("__generator", M42), A("__exportStar", L42), A("__createBinding", f42), A("__values", CX1), A("__read", Vn1), A("__spread", R42), A("__spreadArrays", O42), A("__await", em), A("__asyncGenerator", T42), A("__asyncDelegator", P42), A("__asyncValues", S42), A("__makeTemplateObject", _42), A("__importStar", j42), A("__importDefault", y42), A("__classPrivateFieldGet", k42), A("__classPrivateFieldSet", x42)
  })
})
// @from(Start 5969945, End 5971115)
Kn1 = z((v42) => {
  Object.defineProperty(v42, "__esModule", {
    value: !0
  });
  v42.MAX_HASHABLE_LENGTH = v42.INIT = v42.KEY = v42.DIGEST_LENGTH = v42.BLOCK_SIZE = void 0;
  v42.BLOCK_SIZE = 64;
  v42.DIGEST_LENGTH = 32;
  v42.KEY = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
  v42.INIT = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
  v42.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1
})
// @from(Start 5971121, End 5974273)
m42 = z((g42) => {
  Object.defineProperty(g42, "__esModule", {
    value: !0
  });
  g42.RawSha256 = void 0;
  var oX = Kn1(),
    mv6 = function() {
      function A() {
        this.state = Int32Array.from(oX.INIT), this.temp = new Int32Array(64), this.buffer = new Uint8Array(64), this.bufferLength = 0, this.bytesHashed = 0, this.finished = !1
      }
      return A.prototype.update = function(B) {
        if (this.finished) throw new Error("Attempted to update an already finished hash.");
        var Q = 0,
          I = B.byteLength;
        if (this.bytesHashed += I, this.bytesHashed * 8 > oX.MAX_HASHABLE_LENGTH) throw new Error("Cannot hash more than 2^53 - 1 bits");
        while (I > 0)
          if (this.buffer[this.bufferLength++] = B[Q++], I--, this.bufferLength === oX.BLOCK_SIZE) this.hashBuffer(), this.bufferLength = 0
      }, A.prototype.digest = function() {
        if (!this.finished) {
          var B = this.bytesHashed * 8,
            Q = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength),
            I = this.bufferLength;
          if (Q.setUint8(this.bufferLength++, 128), I % oX.BLOCK_SIZE >= oX.BLOCK_SIZE - 8) {
            for (var G = this.bufferLength; G < oX.BLOCK_SIZE; G++) Q.setUint8(G, 0);
            this.hashBuffer(), this.bufferLength = 0
          }
          for (var G = this.bufferLength; G < oX.BLOCK_SIZE - 8; G++) Q.setUint8(G, 0);
          Q.setUint32(oX.BLOCK_SIZE - 8, Math.floor(B / 4294967296), !0), Q.setUint32(oX.BLOCK_SIZE - 4, B), this.hashBuffer(), this.finished = !0
        }
        var Z = new Uint8Array(oX.DIGEST_LENGTH);
        for (var G = 0; G < 8; G++) Z[G * 4] = this.state[G] >>> 24 & 255, Z[G * 4 + 1] = this.state[G] >>> 16 & 255, Z[G * 4 + 2] = this.state[G] >>> 8 & 255, Z[G * 4 + 3] = this.state[G] >>> 0 & 255;
        return Z
      }, A.prototype.hashBuffer = function() {
        var B = this,
          Q = B.buffer,
          I = B.state,
          G = I[0],
          Z = I[1],
          D = I[2],
          Y = I[3],
          W = I[4],
          J = I[5],
          F = I[6],
          X = I[7];
        for (var V = 0; V < oX.BLOCK_SIZE; V++) {
          if (V < 16) this.temp[V] = (Q[V * 4] & 255) << 24 | (Q[V * 4 + 1] & 255) << 16 | (Q[V * 4 + 2] & 255) << 8 | Q[V * 4 + 3] & 255;
          else {
            var C = this.temp[V - 2],
              K = (C >>> 17 | C << 15) ^ (C >>> 19 | C << 13) ^ C >>> 10;
            C = this.temp[V - 15];
            var E = (C >>> 7 | C << 25) ^ (C >>> 18 | C << 14) ^ C >>> 3;
            this.temp[V] = (K + this.temp[V - 7] | 0) + (E + this.temp[V - 16] | 0)
          }
          var N = (((W >>> 6 | W << 26) ^ (W >>> 11 | W << 21) ^ (W >>> 25 | W << 7)) + (W & J ^ ~W & F) | 0) + (X + (oX.KEY[V] + this.temp[V] | 0) | 0) | 0,
            q = ((G >>> 2 | G << 30) ^ (G >>> 13 | G << 19) ^ (G >>> 22 | G << 10)) + (G & Z ^ G & D ^ Z & D) | 0;
          X = F, F = J, J = W, W = Y + N | 0, Y = D, D = Z, Z = G, G = N + q | 0
        }
        I[0] += G, I[1] += Z, I[2] += D, I[3] += Y, I[4] += W, I[5] += J, I[6] += F, I[7] += X
      }, A
    }();
  g42.RawSha256 = mv6
})
// @from(Start 5974279, End 5975567)
p42 = z((d42) => {
  Object.defineProperty(d42, "__esModule", {
    value: !0
  });
  d42.toUtf8 = d42.fromUtf8 = void 0;
  var dv6 = (A) => {
    let B = [];
    for (let Q = 0, I = A.length; Q < I; Q++) {
      let G = A.charCodeAt(Q);
      if (G < 128) B.push(G);
      else if (G < 2048) B.push(G >> 6 | 192, G & 63 | 128);
      else if (Q + 1 < A.length && (G & 64512) === 55296 && (A.charCodeAt(Q + 1) & 64512) === 56320) {
        let Z = 65536 + ((G & 1023) << 10) + (A.charCodeAt(++Q) & 1023);
        B.push(Z >> 18 | 240, Z >> 12 & 63 | 128, Z >> 6 & 63 | 128, Z & 63 | 128)
      } else B.push(G >> 12 | 224, G >> 6 & 63 | 128, G & 63 | 128)
    }
    return Uint8Array.from(B)
  };
  d42.fromUtf8 = dv6;
  var uv6 = (A) => {
    let B = "";
    for (let Q = 0, I = A.length; Q < I; Q++) {
      let G = A[Q];
      if (G < 128) B += String.fromCharCode(G);
      else if (192 <= G && G < 224) {
        let Z = A[++Q];
        B += String.fromCharCode((G & 31) << 6 | Z & 63)
      } else if (240 <= G && G < 365) {
        let D = "%" + [G, A[++Q], A[++Q], A[++Q]].map((Y) => Y.toString(16)).join("%");
        B += decodeURIComponent(D)
      } else B += String.fromCharCode((G & 15) << 12 | (A[++Q] & 63) << 6 | A[++Q] & 63)
    }
    return B
  };
  d42.toUtf8 = uv6
})
// @from(Start 5975573, End 5975873)
i42 = z((c42) => {
  Object.defineProperty(c42, "__esModule", {
    value: !0
  });
  c42.toUtf8 = c42.fromUtf8 = void 0;

  function cv6(A) {
    return new TextEncoder().encode(A)
  }
  c42.fromUtf8 = cv6;

  function lv6(A) {
    return new TextDecoder("utf-8").decode(A)
  }
  c42.toUtf8 = lv6
})
// @from(Start 5975879, End 5976254)
Hn1 = z((s42) => {
  Object.defineProperty(s42, "__esModule", {
    value: !0
  });
  s42.toUtf8 = s42.fromUtf8 = void 0;
  var n42 = p42(),
    a42 = i42(),
    nv6 = (A) => typeof TextEncoder === "function" ? a42.fromUtf8(A) : n42.fromUtf8(A);
  s42.fromUtf8 = nv6;
  var av6 = (A) => typeof TextDecoder === "function" ? a42.toUtf8(A) : n42.toUtf8(A);
  s42.toUtf8 = av6
})
// @from(Start 5976260, End 5976820)
e42 = z((o42) => {
  Object.defineProperty(o42, "__esModule", {
    value: !0
  });
  o42.convertToBuffer = void 0;
  var rv6 = Hn1(),
    ov6 = typeof Buffer !== "undefined" && Buffer.from ? function(A) {
      return Buffer.from(A, "utf8")
    } : rv6.fromUtf8;

  function tv6(A) {
    if (A instanceof Uint8Array) return A;
    if (typeof A === "string") return ov6(A);
    if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    return new Uint8Array(A)
  }
  o42.convertToBuffer = tv6
})
// @from(Start 5976826, End 5977073)
Q62 = z((A62) => {
  Object.defineProperty(A62, "__esModule", {
    value: !0
  });
  A62.isEmptyData = void 0;

  function ev6(A) {
    if (typeof A === "string") return A.length === 0;
    return A.byteLength === 0
  }
  A62.isEmptyData = ev6
})
// @from(Start 5977079, End 5977341)
Z62 = z((I62) => {
  Object.defineProperty(I62, "__esModule", {
    value: !0
  });
  I62.numToUint8 = void 0;

  function Ab6(A) {
    return new Uint8Array([(A & 4278190080) >> 24, (A & 16711680) >> 16, (A & 65280) >> 8, A & 255])
  }
  I62.numToUint8 = Ab6
})
// @from(Start 5977347, End 5977703)
W62 = z((D62) => {
  Object.defineProperty(D62, "__esModule", {
    value: !0
  });
  D62.uint32ArrayFrom = void 0;

  function Bb6(A) {
    if (!Uint32Array.from) {
      var B = new Uint32Array(A.length),
        Q = 0;
      while (Q < A.length) B[Q] = A[Q], Q += 1;
      return B
    }
    return Uint32Array.from(A)
  }
  D62.uint32ArrayFrom = Bb6
})
// @from(Start 5977709, End 5978479)
J62 = z((Ad) => {
  Object.defineProperty(Ad, "__esModule", {
    value: !0
  });
  Ad.uint32ArrayFrom = Ad.numToUint8 = Ad.isEmptyData = Ad.convertToBuffer = void 0;
  var Qb6 = e42();
  Object.defineProperty(Ad, "convertToBuffer", {
    enumerable: !0,
    get: function() {
      return Qb6.convertToBuffer
    }
  });
  var Ib6 = Q62();
  Object.defineProperty(Ad, "isEmptyData", {
    enumerable: !0,
    get: function() {
      return Ib6.isEmptyData
    }
  });
  var Gb6 = Z62();
  Object.defineProperty(Ad, "numToUint8", {
    enumerable: !0,
    get: function() {
      return Gb6.numToUint8
    }
  });
  var Zb6 = W62();
  Object.defineProperty(Ad, "uint32ArrayFrom", {
    enumerable: !0,
    get: function() {
      return Zb6.uint32ArrayFrom
    }
  })
})
// @from(Start 5978485, End 5980231)
C62 = z((X62) => {
  Object.defineProperty(X62, "__esModule", {
    value: !0
  });
  X62.Sha256 = void 0;
  var F62 = Cn1(),
    zX1 = Kn1(),
    HX1 = m42(),
    zn1 = J62(),
    Yb6 = function() {
      function A(B) {
        this.secret = B, this.hash = new HX1.RawSha256, this.reset()
      }
      return A.prototype.update = function(B) {
        if (zn1.isEmptyData(B) || this.error) return;
        try {
          this.hash.update(zn1.convertToBuffer(B))
        } catch (Q) {
          this.error = Q
        }
      }, A.prototype.digestSync = function() {
        if (this.error) throw this.error;
        if (this.outer) {
          if (!this.outer.finished) this.outer.update(this.hash.digest());
          return this.outer.digest()
        }
        return this.hash.digest()
      }, A.prototype.digest = function() {
        return F62.__awaiter(this, void 0, void 0, function() {
          return F62.__generator(this, function(B) {
            return [2, this.digestSync()]
          })
        })
      }, A.prototype.reset = function() {
        if (this.hash = new HX1.RawSha256, this.secret) {
          this.outer = new HX1.RawSha256;
          var B = Wb6(this.secret),
            Q = new Uint8Array(zX1.BLOCK_SIZE);
          Q.set(B);
          for (var I = 0; I < zX1.BLOCK_SIZE; I++) B[I] ^= 54, Q[I] ^= 92;
          this.hash.update(B), this.outer.update(Q);
          for (var I = 0; I < B.byteLength; I++) B[I] = 0
        }
      }, A
    }();
  X62.Sha256 = Yb6;

  function Wb6(A) {
    var B = zn1.convertToBuffer(A);
    if (B.byteLength > zX1.BLOCK_SIZE) {
      var Q = new HX1.RawSha256;
      Q.update(B), B = Q.digest()
    }
    var I = new Uint8Array(zX1.BLOCK_SIZE);
    return I.set(B), I
  }
})
// @from(Start 5980237, End 5980373)
K62 = z((wn1) => {
  Object.defineProperty(wn1, "__esModule", {
    value: !0
  });
  var Jb6 = Cn1();
  Jb6.__exportStar(C62(), wn1)
})