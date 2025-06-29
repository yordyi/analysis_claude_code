
// @from(Start 3747185, End 3770297)
cI1 = z((KZ8, qx1) => {
  var {
    defineProperty: pI1,
    getOwnPropertyDescriptor: QL4,
    getOwnPropertyNames: IL4
  } = Object, GL4 = Object.prototype.hasOwnProperty, a2 = (A, B) => pI1(A, "name", {
    value: B,
    configurable: !0
  }), ZL4 = (A, B) => {
    for (var Q in B) pI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Hx1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of IL4(B))
        if (!GL4.call(A, G) && G !== Q) pI1(A, G, {
          get: () => B[G],
          enumerable: !(I = QL4(B, G)) || I.enumerable
        })
    }
    return A
  }, DL4 = (A, B, Q) => (Hx1(A, B, "default"), Q && Hx1(Q, B, "default")), YL4 = (A) => Hx1(pI1({}, "__esModule", {
    value: !0
  }), A), wx1 = {};
  ZL4(wx1, {
    AssumeRoleCommand: () => Nx1,
    AssumeRoleResponseFilterSensitiveLog: () => i80,
    AssumeRoleWithWebIdentityCommand: () => $x1,
    AssumeRoleWithWebIdentityRequestFilterSensitiveLog: () => e80,
    AssumeRoleWithWebIdentityResponseFilterSensitiveLog: () => AB0,
    ClientInputEndpointParameters: () => eL4.ClientInputEndpointParameters,
    CredentialsFilterSensitiveLog: () => Ex1,
    ExpiredTokenException: () => n80,
    IDPCommunicationErrorException: () => BB0,
    IDPRejectedClaimException: () => o80,
    InvalidIdentityTokenException: () => t80,
    MalformedPolicyDocumentException: () => a80,
    PackedPolicyTooLargeException: () => s80,
    RegionDisabledException: () => r80,
    STS: () => VB0,
    STSServiceException: () => zN,
    decorateDefaultCredentialProvider: () => QR4,
    getDefaultRoleAssumer: () => EB0,
    getDefaultRoleAssumerWithWebIdentity: () => UB0
  });
  qx1.exports = YL4(wx1);
  DL4(wx1, ka(), qx1.exports);
  var WL4 = p3(),
    JL4 = hz(),
    FL4 = yz(),
    XL4 = p3(),
    VL4 = xa(),
    l80 = p3(),
    CL4 = p3(),
    zN = class A extends CL4.ServiceException {
      static {
        a2(this, "STSServiceException")
      }
      constructor(B) {
        super(B);
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    Ex1 = a2((A) => ({
      ...A,
      ...A.SecretAccessKey && {
        SecretAccessKey: l80.SENSITIVE_STRING
      }
    }), "CredentialsFilterSensitiveLog"),
    i80 = a2((A) => ({
      ...A,
      ...A.Credentials && {
        Credentials: Ex1(A.Credentials)
      }
    }), "AssumeRoleResponseFilterSensitiveLog"),
    n80 = class A extends zN {
      static {
        a2(this, "ExpiredTokenException")
      }
      name = "ExpiredTokenException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ExpiredTokenException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    a80 = class A extends zN {
      static {
        a2(this, "MalformedPolicyDocumentException")
      }
      name = "MalformedPolicyDocumentException";
      $fault = "client";
      constructor(B) {
        super({
          name: "MalformedPolicyDocumentException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    s80 = class A extends zN {
      static {
        a2(this, "PackedPolicyTooLargeException")
      }
      name = "PackedPolicyTooLargeException";
      $fault = "client";
      constructor(B) {
        super({
          name: "PackedPolicyTooLargeException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    r80 = class A extends zN {
      static {
        a2(this, "RegionDisabledException")
      }
      name = "RegionDisabledException";
      $fault = "client";
      constructor(B) {
        super({
          name: "RegionDisabledException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    o80 = class A extends zN {
      static {
        a2(this, "IDPRejectedClaimException")
      }
      name = "IDPRejectedClaimException";
      $fault = "client";
      constructor(B) {
        super({
          name: "IDPRejectedClaimException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    t80 = class A extends zN {
      static {
        a2(this, "InvalidIdentityTokenException")
      }
      name = "InvalidIdentityTokenException";
      $fault = "client";
      constructor(B) {
        super({
          name: "InvalidIdentityTokenException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    e80 = a2((A) => ({
      ...A,
      ...A.WebIdentityToken && {
        WebIdentityToken: l80.SENSITIVE_STRING
      }
    }), "AssumeRoleWithWebIdentityRequestFilterSensitiveLog"),
    AB0 = a2((A) => ({
      ...A,
      ...A.Credentials && {
        Credentials: Ex1(A.Credentials)
      }
    }), "AssumeRoleWithWebIdentityResponseFilterSensitiveLog"),
    BB0 = class A extends zN {
      static {
        a2(this, "IDPCommunicationErrorException")
      }
      name = "IDPCommunicationErrorException";
      $fault = "client";
      constructor(B) {
        super({
          name: "IDPCommunicationErrorException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    Ux1 = IB(),
    KL4 = vI1(),
    m5 = p3(),
    HL4 = a2(async (A, B) => {
      let Q = YB0,
        I;
      return I = XB0({
        ...OL4(A, B),
        [JB0]: cL4,
        [FB0]: WB0
      }), DB0(B, Q, "/", void 0, I)
    }, "se_AssumeRoleCommand"),
    zL4 = a2(async (A, B) => {
      let Q = YB0,
        I;
      return I = XB0({
        ...TL4(A, B),
        [JB0]: lL4,
        [FB0]: WB0
      }), DB0(B, Q, "/", void 0, I)
    }, "se_AssumeRoleWithWebIdentityCommand"),
    wL4 = a2(async (A, B) => {
      if (A.statusCode >= 300) return QB0(A, B);
      let Q = await Ux1.parseXmlBody(A.body, B),
        I = {};
      return I = xL4(Q.AssumeRoleResult, B), {
        $metadata: wN(A),
        ...I
      }
    }, "de_AssumeRoleCommand"),
    EL4 = a2(async (A, B) => {
      if (A.statusCode >= 300) return QB0(A, B);
      let Q = await Ux1.parseXmlBody(A.body, B),
        I = {};
      return I = fL4(Q.AssumeRoleWithWebIdentityResult, B), {
        $metadata: wN(A),
        ...I
      }
    }, "de_AssumeRoleWithWebIdentityCommand"),
    QB0 = a2(async (A, B) => {
      let Q = {
          ...A,
          body: await Ux1.parseXmlErrorBody(A.body, B)
        },
        I = iL4(A, Q.body);
      switch (I) {
        case "ExpiredTokenException":
        case "com.amazonaws.sts#ExpiredTokenException":
          throw await UL4(Q, B);
        case "MalformedPolicyDocument":
        case "com.amazonaws.sts#MalformedPolicyDocumentException":
          throw await ML4(Q, B);
        case "PackedPolicyTooLarge":
        case "com.amazonaws.sts#PackedPolicyTooLargeException":
          throw await LL4(Q, B);
        case "RegionDisabledException":
        case "com.amazonaws.sts#RegionDisabledException":
          throw await RL4(Q, B);
        case "IDPCommunicationError":
        case "com.amazonaws.sts#IDPCommunicationErrorException":
          throw await NL4(Q, B);
        case "IDPRejectedClaim":
        case "com.amazonaws.sts#IDPRejectedClaimException":
          throw await $L4(Q, B);
        case "InvalidIdentityToken":
        case "com.amazonaws.sts#InvalidIdentityTokenException":
          throw await qL4(Q, B);
        default:
          let G = Q.body;
          return pL4({
            output: A,
            parsedBody: G.Error,
            errorCode: I
          })
      }
    }, "de_CommandError"),
    UL4 = a2(async (A, B) => {
      let Q = A.body,
        I = vL4(Q.Error, B),
        G = new n80({
          $metadata: wN(A),
          ...I
        });
      return m5.decorateServiceException(G, Q)
    }, "de_ExpiredTokenExceptionRes"),
    NL4 = a2(async (A, B) => {
      let Q = A.body,
        I = bL4(Q.Error, B),
        G = new BB0({
          $metadata: wN(A),
          ...I
        });
      return m5.decorateServiceException(G, Q)
    }, "de_IDPCommunicationErrorExceptionRes"),
    $L4 = a2(async (A, B) => {
      let Q = A.body,
        I = gL4(Q.Error, B),
        G = new o80({
          $metadata: wN(A),
          ...I
        });
      return m5.decorateServiceException(G, Q)
    }, "de_IDPRejectedClaimExceptionRes"),
    qL4 = a2(async (A, B) => {
      let Q = A.body,
        I = hL4(Q.Error, B),
        G = new t80({
          $metadata: wN(A),
          ...I
        });
      return m5.decorateServiceException(G, Q)
    }, "de_InvalidIdentityTokenExceptionRes"),
    ML4 = a2(async (A, B) => {
      let Q = A.body,
        I = mL4(Q.Error, B),
        G = new a80({
          $metadata: wN(A),
          ...I
        });
      return m5.decorateServiceException(G, Q)
    }, "de_MalformedPolicyDocumentExceptionRes"),
    LL4 = a2(async (A, B) => {
      let Q = A.body,
        I = dL4(Q.Error, B),
        G = new s80({
          $metadata: wN(A),
          ...I
        });
      return m5.decorateServiceException(G, Q)
    }, "de_PackedPolicyTooLargeExceptionRes"),
    RL4 = a2(async (A, B) => {
      let Q = A.body,
        I = uL4(Q.Error, B),
        G = new r80({
          $metadata: wN(A),
          ...I
        });
      return m5.decorateServiceException(G, Q)
    }, "de_RegionDisabledExceptionRes"),
    OL4 = a2((A, B) => {
      let Q = {};
      if (A[Bg] != null) Q[Bg] = A[Bg];
      if (A[Qg] != null) Q[Qg] = A[Qg];
      if (A[eb] != null) {
        let I = IB0(A[eb], B);
        if (A[eb]?.length === 0) Q.PolicyArns = [];
        Object.entries(I).forEach(([G, Z]) => {
          let D = `PolicyArns.${G}`;
          Q[D] = Z
        })
      }
      if (A[tb] != null) Q[tb] = A[tb];
      if (A[ob] != null) Q[ob] = A[ob];
      if (A[Jx1] != null) {
        let I = kL4(A[Jx1], B);
        if (A[Jx1]?.length === 0) Q.Tags = [];
        Object.entries(I).forEach(([G, Z]) => {
          let D = `Tags.${G}`;
          Q[D] = Z
        })
      }
      if (A[Xx1] != null) {
        let I = yL4(A[Xx1], B);
        if (A[Xx1]?.length === 0) Q.TransitiveTagKeys = [];
        Object.entries(I).forEach(([G, Z]) => {
          let D = `TransitiveTagKeys.${G}`;
          Q[D] = Z
        })
      }
      if (A[ek1] != null) Q[ek1] = A[ek1];
      if (A[Yx1] != null) Q[Yx1] = A[Yx1];
      if (A[Fx1] != null) Q[Fx1] = A[Fx1];
      if (A[HN] != null) Q[HN] = A[HN];
      if (A[Qx1] != null) {
        let I = _L4(A[Qx1], B);
        if (A[Qx1]?.length === 0) Q.ProvidedContexts = [];
        Object.entries(I).forEach(([G, Z]) => {
          let D = `ProvidedContexts.${G}`;
          Q[D] = Z
        })
      }
      return Q
    }, "se_AssumeRoleRequest"),
    TL4 = a2((A, B) => {
      let Q = {};
      if (A[Bg] != null) Q[Bg] = A[Bg];
      if (A[Qg] != null) Q[Qg] = A[Qg];
      if (A[Cx1] != null) Q[Cx1] = A[Cx1];
      if (A[Ix1] != null) Q[Ix1] = A[Ix1];
      if (A[eb] != null) {
        let I = IB0(A[eb], B);
        if (A[eb]?.length === 0) Q.PolicyArns = [];
        Object.entries(I).forEach(([G, Z]) => {
          let D = `PolicyArns.${G}`;
          Q[D] = Z
        })
      }
      if (A[tb] != null) Q[tb] = A[tb];
      if (A[ob] != null) Q[ob] = A[ob];
      return Q
    }, "se_AssumeRoleWithWebIdentityRequest"),
    IB0 = a2((A, B) => {
      let Q = {},
        I = 1;
      for (let G of A) {
        if (G === null) continue;
        let Z = PL4(G, B);
        Object.entries(Z).forEach(([D, Y]) => {
          Q[`member.${I}.${D}`] = Y
        }), I++
      }
      return Q
    }, "se_policyDescriptorListType"),
    PL4 = a2((A, B) => {
      let Q = {};
      if (A[Kx1] != null) Q[Kx1] = A[Kx1];
      return Q
    }, "se_PolicyDescriptorType"),
    SL4 = a2((A, B) => {
      let Q = {};
      if (A[Bx1] != null) Q[Bx1] = A[Bx1];
      if (A[ok1] != null) Q[ok1] = A[ok1];
      return Q
    }, "se_ProvidedContext"),
    _L4 = a2((A, B) => {
      let Q = {},
        I = 1;
      for (let G of A) {
        if (G === null) continue;
        let Z = SL4(G, B);
        Object.entries(Z).forEach(([D, Y]) => {
          Q[`member.${I}.${D}`] = Y
        }), I++
      }
      return Q
    }, "se_ProvidedContextsListType"),
    jL4 = a2((A, B) => {
      let Q = {};
      if (A[Ax1] != null) Q[Ax1] = A[Ax1];
      if (A[Vx1] != null) Q[Vx1] = A[Vx1];
      return Q
    }, "se_Tag"),
    yL4 = a2((A, B) => {
      let Q = {},
        I = 1;
      for (let G of A) {
        if (G === null) continue;
        Q[`member.${I}`] = G, I++
      }
      return Q
    }, "se_tagKeyListType"),
    kL4 = a2((A, B) => {
      let Q = {},
        I = 1;
      for (let G of A) {
        if (G === null) continue;
        let Z = jL4(G, B);
        Object.entries(Z).forEach(([D, Y]) => {
          Q[`member.${I}.${D}`] = Y
        }), I++
      }
      return Q
    }, "se_tagListType"),
    GB0 = a2((A, B) => {
      let Q = {};
      if (A[ak1] != null) Q[ak1] = m5.expectString(A[ak1]);
      if (A[sk1] != null) Q[sk1] = m5.expectString(A[sk1]);
      return Q
    }, "de_AssumedRoleUser"),
    xL4 = a2((A, B) => {
      let Q = {};
      if (A[rb] != null) Q[rb] = ZB0(A[rb], B);
      if (A[sb] != null) Q[sb] = GB0(A[sb], B);
      if (A[Ag] != null) Q[Ag] = m5.strictParseInt32(A[Ag]);
      if (A[HN] != null) Q[HN] = m5.expectString(A[HN]);
      return Q
    }, "de_AssumeRoleResponse"),
    fL4 = a2((A, B) => {
      let Q = {};
      if (A[rb] != null) Q[rb] = ZB0(A[rb], B);
      if (A[Dx1] != null) Q[Dx1] = m5.expectString(A[Dx1]);
      if (A[sb] != null) Q[sb] = GB0(A[sb], B);
      if (A[Ag] != null) Q[Ag] = m5.strictParseInt32(A[Ag]);
      if (A[Gx1] != null) Q[Gx1] = m5.expectString(A[Gx1]);
      if (A[rk1] != null) Q[rk1] = m5.expectString(A[rk1]);
      if (A[HN] != null) Q[HN] = m5.expectString(A[HN]);
      return Q
    }, "de_AssumeRoleWithWebIdentityResponse"),
    ZB0 = a2((A, B) => {
      let Q = {};
      if (A[nk1] != null) Q[nk1] = m5.expectString(A[nk1]);
      if (A[Zx1] != null) Q[Zx1] = m5.expectString(A[Zx1]);
      if (A[Wx1] != null) Q[Wx1] = m5.expectString(A[Wx1]);
      if (A[tk1] != null) Q[tk1] = m5.expectNonNull(m5.parseRfc3339DateTimeWithOffset(A[tk1]));
      return Q
    }, "de_Credentials"),
    vL4 = a2((A, B) => {
      let Q = {};
      if (A[TQ] != null) Q[TQ] = m5.expectString(A[TQ]);
      return Q
    }, "de_ExpiredTokenException"),
    bL4 = a2((A, B) => {
      let Q = {};
      if (A[TQ] != null) Q[TQ] = m5.expectString(A[TQ]);
      return Q
    }, "de_IDPCommunicationErrorException"),
    gL4 = a2((A, B) => {
      let Q = {};
      if (A[TQ] != null) Q[TQ] = m5.expectString(A[TQ]);
      return Q
    }, "de_IDPRejectedClaimException"),
    hL4 = a2((A, B) => {
      let Q = {};
      if (A[TQ] != null) Q[TQ] = m5.expectString(A[TQ]);
      return Q
    }, "de_InvalidIdentityTokenException"),
    mL4 = a2((A, B) => {
      let Q = {};
      if (A[TQ] != null) Q[TQ] = m5.expectString(A[TQ]);
      return Q
    }, "de_MalformedPolicyDocumentException"),
    dL4 = a2((A, B) => {
      let Q = {};
      if (A[TQ] != null) Q[TQ] = m5.expectString(A[TQ]);
      return Q
    }, "de_PackedPolicyTooLargeException"),
    uL4 = a2((A, B) => {
      let Q = {};
      if (A[TQ] != null) Q[TQ] = m5.expectString(A[TQ]);
      return Q
    }, "de_RegionDisabledException"),
    wN = a2((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    pL4 = m5.withBaseException(zN),
    DB0 = a2(async (A, B, Q, I, G) => {
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
      return new KL4.HttpRequest(J)
    }, "buildHttpRpcRequest"),
    YB0 = {
      "content-type": "application/x-www-form-urlencoded"
    },
    WB0 = "2011-06-15",
    JB0 = "Action",
    nk1 = "AccessKeyId",
    cL4 = "AssumeRole",
    ak1 = "AssumedRoleId",
    sb = "AssumedRoleUser",
    lL4 = "AssumeRoleWithWebIdentity",
    sk1 = "Arn",
    rk1 = "Audience",
    rb = "Credentials",
    ok1 = "ContextAssertion",
    ob = "DurationSeconds",
    tk1 = "Expiration",
    ek1 = "ExternalId",
    Ax1 = "Key",
    tb = "Policy",
    eb = "PolicyArns",
    Bx1 = "ProviderArn",
    Qx1 = "ProvidedContexts",
    Ix1 = "ProviderId",
    Ag = "PackedPolicySize",
    Gx1 = "Provider",
    Bg = "RoleArn",
    Qg = "RoleSessionName",
    Zx1 = "SecretAccessKey",
    Dx1 = "SubjectFromWebIdentityToken",
    HN = "SourceIdentity",
    Yx1 = "SerialNumber",
    Wx1 = "SessionToken",
    Jx1 = "Tags",
    Fx1 = "TokenCode",
    Xx1 = "TransitiveTagKeys",
    FB0 = "Version",
    Vx1 = "Value",
    Cx1 = "WebIdentityToken",
    Kx1 = "arn",
    TQ = "message",
    XB0 = a2((A) => Object.entries(A).map(([B, Q]) => m5.extendedEncodeURIComponent(B) + "=" + m5.extendedEncodeURIComponent(Q)).join("&"), "buildFormUrlencodedString"),
    iL4 = a2((A, B) => {
      if (B.Error?.Code !== void 0) return B.Error.Code;
      if (A.statusCode == 404) return "NotFound"
    }, "loadQueryErrorCode"),
    Nx1 = class extends XL4.Command.classBuilder().ep(VL4.commonParams).m(function(A, B, Q, I) {
      return [FL4.getSerdePlugin(Q, this.serialize, this.deserialize), JL4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, i80).ser(HL4).de(wL4).build() {
      static {
        a2(this, "AssumeRoleCommand")
      }
    },
    nL4 = hz(),
    aL4 = yz(),
    sL4 = p3(),
    rL4 = xa(),
    $x1 = class extends sL4.Command.classBuilder().ep(rL4.commonParams).m(function(A, B, Q, I) {
      return [aL4.getSerdePlugin(Q, this.serialize, this.deserialize), nL4.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(e80, AB0).ser(zL4).de(EL4).build() {
      static {
        a2(this, "AssumeRoleWithWebIdentityCommand")
      }
    },
    oL4 = ka(),
    tL4 = {
      AssumeRoleCommand: Nx1,
      AssumeRoleWithWebIdentityCommand: $x1
    },
    VB0 = class extends oL4.STSClient {
      static {
        a2(this, "STS")
      }
    };
  WL4.createAggregatedClient(tL4, VB0);
  var eL4 = xa(),
    zx1 = NC(),
    c80 = "us-east-1",
    CB0 = a2((A) => {
      if (typeof A?.Arn === "string") {
        let B = A.Arn.split(":");
        if (B.length > 4 && B[4] !== "") return B[4]
      }
      return
    }, "getAccountIdFromAssumedRoleUser"),
    KB0 = a2(async (A, B, Q) => {
      let I = typeof A === "function" ? await A() : A,
        G = typeof B === "function" ? await B() : B;
      return Q?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${I} (provider)`, `${G} (parent client)`, `${c80} (STS default)`), I ?? G ?? c80
    }, "resolveRegion"),
    AR4 = a2((A, B) => {
      let Q, I;
      return async (G, Z) => {
        if (I = G, !Q) {
          let {
            logger: F = A?.parentClientConfig?.logger,
            region: X,
            requestHandler: V = A?.parentClientConfig?.requestHandler,
            credentialProviderLogger: C
          } = A, K = await KB0(X, A?.parentClientConfig?.region, C), E = !HB0(V);
          Q = new B({
            profile: A?.parentClientConfig?.profile,
            credentialDefaultProvider: a2(() => async () => I, "credentialDefaultProvider"),
            region: K,
            requestHandler: E ? V : void 0,
            logger: F
          })
        }
        let {
          Credentials: D,
          AssumedRoleUser: Y
        } = await Q.send(new Nx1(Z));
        if (!D || !D.AccessKeyId || !D.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${Z.RoleArn}`);
        let W = CB0(Y),
          J = {
            accessKeyId: D.AccessKeyId,
            secretAccessKey: D.SecretAccessKey,
            sessionToken: D.SessionToken,
            expiration: D.Expiration,
            ...D.CredentialScope && {
              credentialScope: D.CredentialScope
            },
            ...W && {
              accountId: W
            }
          };
        return zx1.setCredentialFeature(J, "CREDENTIALS_STS_ASSUME_ROLE", "i"), J
      }
    }, "getDefaultRoleAssumer"),
    BR4 = a2((A, B) => {
      let Q;
      return async (I) => {
        if (!Q) {
          let {
            logger: W = A?.parentClientConfig?.logger,
            region: J,
            requestHandler: F = A?.parentClientConfig?.requestHandler,
            credentialProviderLogger: X
          } = A, V = await KB0(J, A?.parentClientConfig?.region, X), C = !HB0(F);
          Q = new B({
            profile: A?.parentClientConfig?.profile,
            region: V,
            requestHandler: C ? F : void 0,
            logger: W
          })
        }
        let {
          Credentials: G,
          AssumedRoleUser: Z
        } = await Q.send(new $x1(I));
        if (!G || !G.AccessKeyId || !G.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${I.RoleArn}`);
        let D = CB0(Z),
          Y = {
            accessKeyId: G.AccessKeyId,
            secretAccessKey: G.SecretAccessKey,
            sessionToken: G.SessionToken,
            expiration: G.Expiration,
            ...G.CredentialScope && {
              credentialScope: G.CredentialScope
            },
            ...D && {
              accountId: D
            }
          };
        if (D) zx1.setCredentialFeature(Y, "RESOLVED_ACCOUNT_ID", "T");
        return zx1.setCredentialFeature(Y, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k"), Y
      }
    }, "getDefaultRoleAssumerWithWebIdentity"),
    HB0 = a2((A) => {
      return A?.metadata?.handlerProtocol === "h2"
    }, "isH2"),
    zB0 = ka(),
    wB0 = a2((A, B) => {
      if (!B) return A;
      else return class Q extends A {
        static {
          a2(this, "CustomizableSTSClient")
        }
        constructor(I) {
          super(I);
          for (let G of B) this.middlewareStack.use(G)
        }
      }
    }, "getCustomizableStsClientCtor"),
    EB0 = a2((A = {}, B) => AR4(A, wB0(zB0.STSClient, B)), "getDefaultRoleAssumer"),
    UB0 = a2((A = {}, B) => BR4(A, wB0(zB0.STSClient, B)), "getDefaultRoleAssumerWithWebIdentity"),
    QR4 = a2((A) => (B) => A({
      roleAssumer: EB0(B),
      roleAssumerWithWebIdentity: UB0(B),
      ...B
    }), "decorateDefaultCredentialProvider")
})
// @from(Start 3770303, End 3773525)
iI1 = z((EZ8, qB0) => {
  var {
    defineProperty: lI1,
    getOwnPropertyDescriptor: IR4,
    getOwnPropertyNames: GR4
  } = Object, ZR4 = Object.prototype.hasOwnProperty, Lx1 = (A, B) => lI1(A, "name", {
    value: B,
    configurable: !0
  }), DR4 = (A, B) => {
    for (var Q in B) lI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, YR4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of GR4(B))
        if (!ZR4.call(A, G) && G !== Q) lI1(A, G, {
          get: () => B[G],
          enumerable: !(I = IR4(B, G)) || I.enumerable
        })
    }
    return A
  }, WR4 = (A) => YR4(lI1({}, "__esModule", {
    value: !0
  }), A), $B0 = {};
  DR4($B0, {
    fromProcess: () => KR4
  });
  qB0.exports = WR4($B0);
  var NB0 = xL(),
    Mx1 = $I(),
    JR4 = Z1("child_process"),
    FR4 = Z1("util"),
    XR4 = NC(),
    VR4 = Lx1((A, B, Q) => {
      if (B.Version !== 1) throw Error(`Profile ${A} credential_process did not return Version 1.`);
      if (B.AccessKeyId === void 0 || B.SecretAccessKey === void 0) throw Error(`Profile ${A} credential_process returned invalid credentials.`);
      if (B.Expiration) {
        let Z = new Date;
        if (new Date(B.Expiration) < Z) throw Error(`Profile ${A} credential_process returned expired credentials.`)
      }
      let I = B.AccountId;
      if (!I && Q?.[A]?.aws_account_id) I = Q[A].aws_account_id;
      let G = {
        accessKeyId: B.AccessKeyId,
        secretAccessKey: B.SecretAccessKey,
        ...B.SessionToken && {
          sessionToken: B.SessionToken
        },
        ...B.Expiration && {
          expiration: new Date(B.Expiration)
        },
        ...B.CredentialScope && {
          credentialScope: B.CredentialScope
        },
        ...I && {
          accountId: I
        }
      };
      return XR4.setCredentialFeature(G, "CREDENTIALS_PROCESS", "w"), G
    }, "getValidatedProcessCredentials"),
    CR4 = Lx1(async (A, B, Q) => {
      let I = B[A];
      if (B[A]) {
        let G = I.credential_process;
        if (G !== void 0) {
          let Z = FR4.promisify(JR4.exec);
          try {
            let {
              stdout: D
            } = await Z(G), Y;
            try {
              Y = JSON.parse(D.trim())
            } catch {
              throw Error(`Profile ${A} credential_process returned invalid JSON.`)
            }
            return VR4(A, Y, B)
          } catch (D) {
            throw new Mx1.CredentialsProviderError(D.message, {
              logger: Q
            })
          }
        } else throw new Mx1.CredentialsProviderError(`Profile ${A} did not contain credential_process.`, {
          logger: Q
        })
      } else throw new Mx1.CredentialsProviderError(`Profile ${A} could not be found in shared credentials file.`, {
        logger: Q
      })
    }, "resolveProcessCredentials"),
    KR4 = Lx1((A = {}) => async ({
      callerClientConfig: B
    } = {}) => {
      A.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
      let Q = await NB0.parseKnownFiles(A);
      return CR4(NB0.getProfileName({
        profile: A.profile ?? B?.profile
      }), Q, A.logger)
    }, "fromProcess")
})
// @from(Start 3773531, End 3775556)
Rx1 = z((nz) => {
  var HR4 = nz && nz.__createBinding || (Object.create ? function(A, B, Q, I) {
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
    zR4 = nz && nz.__setModuleDefault || (Object.create ? function(A, B) {
      Object.defineProperty(A, "default", {
        enumerable: !0,
        value: B
      })
    } : function(A, B) {
      A.default = B
    }),
    wR4 = nz && nz.__importStar || function(A) {
      if (A && A.__esModule) return A;
      var B = {};
      if (A != null) {
        for (var Q in A)
          if (Q !== "default" && Object.prototype.hasOwnProperty.call(A, Q)) HR4(B, A, Q)
      }
      return zR4(B, A), B
    };
  Object.defineProperty(nz, "__esModule", {
    value: !0
  });
  nz.fromWebToken = void 0;
  var ER4 = (A) => async (B) => {
    A.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");
    let {
      roleArn: Q,
      roleSessionName: I,
      webIdentityToken: G,
      providerId: Z,
      policyArns: D,
      policy: Y,
      durationSeconds: W
    } = A, {
      roleAssumerWithWebIdentity: J
    } = A;
    if (!J) {
      let {
        getDefaultRoleAssumerWithWebIdentity: F
      } = await Promise.resolve().then(() => wR4(cI1()));
      J = F({
        ...A.clientConfig,
        credentialProviderLogger: A.logger,
        parentClientConfig: {
          ...B?.callerClientConfig,
          ...A.parentClientConfig
        }
      }, A.clientPlugins)
    }
    return J({
      RoleArn: Q,
      RoleSessionName: I ?? `aws-sdk-js-session-${Date.now()}`,
      WebIdentityToken: G,
      ProviderId: Z,
      PolicyArns: D,
      Policy: Y,
      DurationSeconds: W
    })
  };
  nz.fromWebToken = ER4
})
// @from(Start 3775562, End 3776623)
OB0 = z((LB0) => {
  Object.defineProperty(LB0, "__esModule", {
    value: !0
  });
  LB0.fromTokenFile = void 0;
  var UR4 = NC(),
    NR4 = $I(),
    $R4 = Z1("fs"),
    qR4 = Rx1(),
    MB0 = "AWS_WEB_IDENTITY_TOKEN_FILE",
    MR4 = "AWS_ROLE_ARN",
    LR4 = "AWS_ROLE_SESSION_NAME",
    RR4 = (A = {}) => async () => {
      A.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
      let B = A?.webIdentityTokenFile ?? process.env[MB0],
        Q = A?.roleArn ?? process.env[MR4],
        I = A?.roleSessionName ?? process.env[LR4];
      if (!B || !Q) throw new NR4.CredentialsProviderError("Web identity configuration not specified", {
        logger: A.logger
      });
      let G = await qR4.fromWebToken({
        ...A,
        webIdentityToken: $R4.readFileSync(B, {
          encoding: "ascii"
        }),
        roleArn: Q,
        roleSessionName: I
      })();
      if (B === process.env[MB0]) UR4.setCredentialFeature(G, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
      return G
    };
  LB0.fromTokenFile = RR4
})
// @from(Start 3776629, End 3777324)
fa = z(($Z8, nI1) => {
  var {
    defineProperty: TB0,
    getOwnPropertyDescriptor: OR4,
    getOwnPropertyNames: TR4
  } = Object, PR4 = Object.prototype.hasOwnProperty, Ox1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of TR4(B))
        if (!PR4.call(A, G) && G !== Q) TB0(A, G, {
          get: () => B[G],
          enumerable: !(I = OR4(B, G)) || I.enumerable
        })
    }
    return A
  }, PB0 = (A, B, Q) => (Ox1(A, B, "default"), Q && Ox1(Q, B, "default")), SR4 = (A) => Ox1(TB0({}, "__esModule", {
    value: !0
  }), A), Tx1 = {};
  nI1.exports = SR4(Tx1);
  PB0(Tx1, OB0(), nI1.exports);
  PB0(Tx1, Rx1(), nI1.exports)
})
// @from(Start 3777330, End 3787000)
_x1 = z((qZ8, fB0) => {
  var {
    create: _R4,
    defineProperty: ba,
    getOwnPropertyDescriptor: jR4,
    getOwnPropertyNames: yR4,
    getPrototypeOf: kR4
  } = Object, xR4 = Object.prototype.hasOwnProperty, W7 = (A, B) => ba(A, "name", {
    value: B,
    configurable: !0
  }), fR4 = (A, B) => {
    for (var Q in B) ba(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, yB0 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of yR4(B))
        if (!xR4.call(A, G) && G !== Q) ba(A, G, {
          get: () => B[G],
          enumerable: !(I = jR4(B, G)) || I.enumerable
        })
    }
    return A
  }, lL = (A, B, Q) => (Q = A != null ? _R4(kR4(A)) : {}, yB0(B || !A || !A.__esModule ? ba(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q, A)), vR4 = (A) => yB0(ba({}, "__esModule", {
    value: !0
  }), A), kB0 = {};
  fR4(kB0, {
    fromIni: () => aR4
  });
  fB0.exports = vR4(kB0);
  var Sx1 = xL(),
    iL = NC(),
    va = $I(),
    bR4 = W7((A, B, Q) => {
      let I = {
        EcsContainer: W7(async (G) => {
          let {
            fromHttp: Z
          } = await Promise.resolve().then(() => lL(AI1())), {
            fromContainerMetadata: D
          } = await Promise.resolve().then(() => lL(B_()));
          return Q?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer"), async () => va.chain(Z(G ?? {}), D(G))().then(Px1)
        }, "EcsContainer"),
        Ec2InstanceMetadata: W7(async (G) => {
          Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
          let {
            fromInstanceMetadata: Z
          } = await Promise.resolve().then(() => lL(B_()));
          return async () => Z(G)().then(Px1)
        }, "Ec2InstanceMetadata"),
        Environment: W7(async (G) => {
          Q?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
          let {
            fromEnv: Z
          } = await Promise.resolve().then(() => lL(d71()));
          return async () => Z(G)().then(Px1)
        }, "Environment")
      };
      if (A in I) return I[A];
      else throw new va.CredentialsProviderError(`Unsupported credential source in profile ${B}. Got ${A}, expected EcsContainer or Ec2InstanceMetadata or Environment.`, {
        logger: Q
      })
    }, "resolveCredentialSource"),
    Px1 = W7((A) => iL.setCredentialFeature(A, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p"), "setNamedProvider"),
    gR4 = W7((A, {
      profile: B = "default",
      logger: Q
    } = {}) => {
      return Boolean(A) && typeof A === "object" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1 && ["undefined", "string"].indexOf(typeof A.external_id) > -1 && ["undefined", "string"].indexOf(typeof A.mfa_serial) > -1 && (hR4(A, {
        profile: B,
        logger: Q
      }) || mR4(A, {
        profile: B,
        logger: Q
      }))
    }, "isAssumeRoleProfile"),
    hR4 = W7((A, {
      profile: B,
      logger: Q
    }) => {
      let I = typeof A.source_profile === "string" && typeof A.credential_source === "undefined";
      if (I) Q?.debug?.(`    ${B} isAssumeRoleWithSourceProfile source_profile=${A.source_profile}`);
      return I
    }, "isAssumeRoleWithSourceProfile"),
    mR4 = W7((A, {
      profile: B,
      logger: Q
    }) => {
      let I = typeof A.credential_source === "string" && typeof A.source_profile === "undefined";
      if (I) Q?.debug?.(`    ${B} isCredentialSourceProfile credential_source=${A.credential_source}`);
      return I
    }, "isCredentialSourceProfile"),
    dR4 = W7(async (A, B, Q, I = {}) => {
      Q.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
      let G = B[A],
        {
          source_profile: Z,
          region: D
        } = G;
      if (!Q.roleAssumer) {
        let {
          getDefaultRoleAssumer: W
        } = await Promise.resolve().then(() => lL(cI1()));
        Q.roleAssumer = W({
          ...Q.clientConfig,
          credentialProviderLogger: Q.logger,
          parentClientConfig: {
            ...Q?.parentClientConfig,
            region: D ?? Q?.parentClientConfig?.region
          }
        }, Q.clientPlugins)
      }
      if (Z && Z in I) throw new va.CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile ${Sx1.getProfileName(Q)}. Profiles visited: ` + Object.keys(I).join(", "), {
        logger: Q.logger
      });
      Q.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${Z?`source_profile=[${Z}]`:`profile=[${A}]`}`);
      let Y = Z ? xB0(Z, B, Q, {
        ...I,
        [Z]: !0
      }, SB0(B[Z] ?? {})) : (await bR4(G.credential_source, A, Q.logger)(Q))();
      if (SB0(G)) return Y.then((W) => iL.setCredentialFeature(W, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
      else {
        let W = {
            RoleArn: G.role_arn,
            RoleSessionName: G.role_session_name || `aws-sdk-js-${Date.now()}`,
            ExternalId: G.external_id,
            DurationSeconds: parseInt(G.duration_seconds || "3600", 10)
          },
          {
            mfa_serial: J
          } = G;
        if (J) {
          if (!Q.mfaCodeProvider) throw new va.CredentialsProviderError(`Profile ${A} requires multi-factor authentication, but no MFA code callback was provided.`, {
            logger: Q.logger,
            tryNextLink: !1
          });
          W.SerialNumber = J, W.TokenCode = await Q.mfaCodeProvider(J)
        }
        let F = await Y;
        return Q.roleAssumer(F, W).then((X) => iL.setCredentialFeature(X, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"))
      }
    }, "resolveAssumeRoleCredentials"),
    SB0 = W7((A) => {
      return !A.role_arn && !!A.credential_source
    }, "isCredentialSourceWithoutRoleArn"),
    uR4 = W7((A) => Boolean(A) && typeof A === "object" && typeof A.credential_process === "string", "isProcessProfile"),
    pR4 = W7(async (A, B) => Promise.resolve().then(() => lL(iI1())).then(({
      fromProcess: Q
    }) => Q({
      ...A,
      profile: B
    })().then((I) => iL.setCredentialFeature(I, "CREDENTIALS_PROFILE_PROCESS", "v"))), "resolveProcessCredentials"),
    cR4 = W7(async (A, B, Q = {}) => {
      let {
        fromSSO: I
      } = await Promise.resolve().then(() => lL(dI1()));
      return I({
        profile: A,
        logger: Q.logger,
        parentClientConfig: Q.parentClientConfig,
        clientConfig: Q.clientConfig
      })().then((G) => {
        if (B.sso_session) return iL.setCredentialFeature(G, "CREDENTIALS_PROFILE_SSO", "r");
        else return iL.setCredentialFeature(G, "CREDENTIALS_PROFILE_SSO_LEGACY", "t")
      })
    }, "resolveSsoCredentials"),
    lR4 = W7((A) => A && (typeof A.sso_start_url === "string" || typeof A.sso_account_id === "string" || typeof A.sso_session === "string" || typeof A.sso_region === "string" || typeof A.sso_role_name === "string"), "isSsoProfile"),
    _B0 = W7((A) => Boolean(A) && typeof A === "object" && typeof A.aws_access_key_id === "string" && typeof A.aws_secret_access_key === "string" && ["undefined", "string"].indexOf(typeof A.aws_session_token) > -1 && ["undefined", "string"].indexOf(typeof A.aws_account_id) > -1, "isStaticCredsProfile"),
    jB0 = W7(async (A, B) => {
      B?.logger?.debug("@aws-sdk/credential-provider-ini - resolveStaticCredentials");
      let Q = {
        accessKeyId: A.aws_access_key_id,
        secretAccessKey: A.aws_secret_access_key,
        sessionToken: A.aws_session_token,
        ...A.aws_credential_scope && {
          credentialScope: A.aws_credential_scope
        },
        ...A.aws_account_id && {
          accountId: A.aws_account_id
        }
      };
      return iL.setCredentialFeature(Q, "CREDENTIALS_PROFILE", "n")
    }, "resolveStaticCredentials"),
    iR4 = W7((A) => Boolean(A) && typeof A === "object" && typeof A.web_identity_token_file === "string" && typeof A.role_arn === "string" && ["undefined", "string"].indexOf(typeof A.role_session_name) > -1, "isWebIdentityProfile"),
    nR4 = W7(async (A, B) => Promise.resolve().then(() => lL(fa())).then(({
      fromTokenFile: Q
    }) => Q({
      webIdentityTokenFile: A.web_identity_token_file,
      roleArn: A.role_arn,
      roleSessionName: A.role_session_name,
      roleAssumerWithWebIdentity: B.roleAssumerWithWebIdentity,
      logger: B.logger,
      parentClientConfig: B.parentClientConfig
    })().then((I) => iL.setCredentialFeature(I, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q"))), "resolveWebIdentityCredentials"),
    xB0 = W7(async (A, B, Q, I = {}, G = !1) => {
      let Z = B[A];
      if (Object.keys(I).length > 0 && _B0(Z)) return jB0(Z, Q);
      if (G || gR4(Z, {
          profile: A,
          logger: Q.logger
        })) return dR4(A, B, Q, I);
      if (_B0(Z)) return jB0(Z, Q);
      if (iR4(Z)) return nR4(Z, Q);
      if (uR4(Z)) return pR4(Q, A);
      if (lR4(Z)) return await cR4(A, Z, Q);
      throw new va.CredentialsProviderError(`Could not resolve credentials using profile: [${A}] in configuration/credentials file(s).`, {
        logger: Q.logger
      })
    }, "resolveProfileData"),
    aR4 = W7((A = {}) => async ({
      callerClientConfig: B
    } = {}) => {
      let Q = {
        ...A,
        parentClientConfig: {
          ...B,
          ...A.parentClientConfig
        }
      };
      Q.logger?.debug("@aws-sdk/credential-provider-ini - fromIni");
      let I = await Sx1.parseKnownFiles(Q);
      return xB0(Sx1.getProfileName({
        profile: A.profile ?? B?.profile
      }), I, Q)
    }, "fromIni")
})
// @from(Start 3787006, End 3791933)
ha = z((MZ8, uB0) => {
  var {
    create: sR4,
    defineProperty: ga,
    getOwnPropertyDescriptor: rR4,
    getOwnPropertyNames: oR4,
    getPrototypeOf: tR4
  } = Object, eR4 = Object.prototype.hasOwnProperty, aI1 = (A, B) => ga(A, "name", {
    value: B,
    configurable: !0
  }), AO4 = (A, B) => {
    for (var Q in B) ga(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, gB0 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of oR4(B))
        if (!eR4.call(A, G) && G !== Q) ga(A, G, {
          get: () => B[G],
          enumerable: !(I = rR4(B, G)) || I.enumerable
        })
    }
    return A
  }, Ig = (A, B, Q) => (Q = A != null ? sR4(tR4(A)) : {}, gB0(B || !A || !A.__esModule ? ga(Q, "default", {
    value: A,
    enumerable: !0
  }) : Q, A)), BO4 = (A) => gB0(ga({}, "__esModule", {
    value: !0
  }), A), hB0 = {};
  AO4(hB0, {
    credentialsTreatedAsExpired: () => dB0,
    credentialsWillNeedRefresh: () => mB0,
    defaultProvider: () => GO4
  });
  uB0.exports = BO4(hB0);
  var jx1 = d71(),
    QO4 = xL(),
    X_ = $I(),
    vB0 = "AWS_EC2_METADATA_DISABLED",
    IO4 = aI1(async (A) => {
      let {
        ENV_CMDS_FULL_URI: B,
        ENV_CMDS_RELATIVE_URI: Q,
        fromContainerMetadata: I,
        fromInstanceMetadata: G
      } = await Promise.resolve().then(() => Ig(B_()));
      if (process.env[Q] || process.env[B]) {
        A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromHttp/fromContainerMetadata");
        let {
          fromHttp: Z
        } = await Promise.resolve().then(() => Ig(AI1()));
        return X_.chain(Z(A), I(A))
      }
      if (process.env[vB0] && process.env[vB0] !== "false") return async () => {
        throw new X_.CredentialsProviderError("EC2 Instance Metadata Service access disabled", {
          logger: A.logger
        })
      };
      return A.logger?.debug("@aws-sdk/credential-provider-node - remoteProvider::fromInstanceMetadata"), G(A)
    }, "remoteProvider"),
    bB0 = !1,
    GO4 = aI1((A = {}) => X_.memoize(X_.chain(async () => {
      if (A.profile ?? process.env[QO4.ENV_PROFILE]) {
        if (process.env[jx1.ENV_KEY] && process.env[jx1.ENV_SECRET]) {
          if (!bB0)(A.logger?.warn && A.logger?.constructor?.name !== "NoOpLogger" ? A.logger.warn : console.warn)(`@aws-sdk/credential-provider-node - defaultProvider::fromEnv WARNING:
    Multiple credential sources detected: 
    Both AWS_PROFILE and the pair AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY static credentials are set.
    This SDK will proceed with the AWS_PROFILE value.
    
    However, a future version may change this behavior to prefer the ENV static credentials.
    Please ensure that your environment only sets either the AWS_PROFILE or the
    AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY pair.
`), bB0 = !0
        }
        throw new X_.CredentialsProviderError("AWS_PROFILE is set, skipping fromEnv provider.", {
          logger: A.logger,
          tryNextLink: !0
        })
      }
      return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromEnv"), jx1.fromEnv(A)()
    }, async () => {
      A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromSSO");
      let {
        ssoStartUrl: B,
        ssoAccountId: Q,
        ssoRegion: I,
        ssoRoleName: G,
        ssoSession: Z
      } = A;
      if (!B && !Q && !I && !G && !Z) throw new X_.CredentialsProviderError("Skipping SSO provider in default chain (inputs do not include SSO fields).", {
        logger: A.logger
      });
      let {
        fromSSO: D
      } = await Promise.resolve().then(() => Ig(dI1()));
      return D(A)()
    }, async () => {
      A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromIni");
      let {
        fromIni: B
      } = await Promise.resolve().then(() => Ig(_x1()));
      return B(A)()
    }, async () => {
      A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromProcess");
      let {
        fromProcess: B
      } = await Promise.resolve().then(() => Ig(iI1()));
      return B(A)()
    }, async () => {
      A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::fromTokenFile");
      let {
        fromTokenFile: B
      } = await Promise.resolve().then(() => Ig(fa()));
      return B(A)()
    }, async () => {
      return A.logger?.debug("@aws-sdk/credential-provider-node - defaultProvider::remoteProvider"), (await IO4(A))()
    }, async () => {
      throw new X_.CredentialsProviderError("Could not load credentials from any providers", {
        tryNextLink: !1,
        logger: A.logger
      })
    }), dB0, mB0), "defaultProvider"),
    mB0 = aI1((A) => A?.expiration !== void 0, "credentialsWillNeedRefresh"),
    dB0 = aI1((A) => A?.expiration !== void 0 && A.expiration.getTime() - Date.now() < 300000, "credentialsTreatedAsExpired")
})
// @from(Start 3791939, End 3794722)
yx1 = z((LZ8, oB0) => {
  var {
    defineProperty: sI1,
    getOwnPropertyDescriptor: ZO4,
    getOwnPropertyNames: DO4
  } = Object, YO4 = Object.prototype.hasOwnProperty, rI1 = (A, B) => sI1(A, "name", {
    value: B,
    configurable: !0
  }), WO4 = (A, B) => {
    for (var Q in B) sI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, JO4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of DO4(B))
        if (!YO4.call(A, G) && G !== Q) sI1(A, G, {
          get: () => B[G],
          enumerable: !(I = ZO4(B, G)) || I.enumerable
        })
    }
    return A
  }, FO4 = (A) => JO4(sI1({}, "__esModule", {
    value: !0
  }), A), pB0 = {};
  WO4(pB0, {
    AlgorithmId: () => nB0,
    EndpointURLScheme: () => iB0,
    FieldPosition: () => aB0,
    HttpApiKeyAuthLocation: () => lB0,
    HttpAuthLocation: () => cB0,
    IniSectionType: () => sB0,
    RequestHandlerProtocol: () => rB0,
    SMITHY_CONTEXT_KEY: () => HO4,
    getDefaultClientConfiguration: () => CO4,
    resolveDefaultRuntimeConfig: () => KO4
  });
  oB0.exports = FO4(pB0);
  var cB0 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(cB0 || {}),
    lB0 = ((A) => {
      return A.HEADER = "header", A.QUERY = "query", A
    })(lB0 || {}),
    iB0 = ((A) => {
      return A.HTTP = "http", A.HTTPS = "https", A
    })(iB0 || {}),
    nB0 = ((A) => {
      return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
    })(nB0 || {}),
    XO4 = rI1((A) => {
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
    VO4 = rI1((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    CO4 = rI1((A) => {
      return XO4(A)
    }, "getDefaultClientConfiguration"),
    KO4 = rI1((A) => {
      return VO4(A)
    }, "resolveDefaultRuntimeConfig"),
    aB0 = ((A) => {
      return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
    })(aB0 || {}),
    HO4 = "__smithy_context",
    sB0 = ((A) => {
      return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
    })(sB0 || {}),
    rB0 = ((A) => {
      return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
    })(rB0 || {})
})
// @from(Start 3794728, End 3823265)
ca = z((RZ8, H30) => {
  var {
    defineProperty: eI1,
    getOwnPropertyDescriptor: zO4,
    getOwnPropertyNames: wO4
  } = Object, EO4 = Object.prototype.hasOwnProperty, B2 = (A, B) => eI1(A, "name", {
    value: B,
    configurable: !0
  }), UO4 = (A, B) => {
    for (var Q in B) eI1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, NO4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of wO4(B))
        if (!EO4.call(A, G) && G !== Q) eI1(A, G, {
          get: () => B[G],
          enumerable: !(I = zO4(B, G)) || I.enumerable
        })
    }
    return A
  }, $O4 = (A) => NO4(eI1({}, "__esModule", {
    value: !0
  }), A), eB0 = {};
  UO4(eB0, {
    Client: () => qO4,
    Command: () => B30,
    LazyJsonString: () => V_,
    NoOpLogger: () => ET4,
    SENSITIVE_STRING: () => LO4,
    ServiceException: () => ZT4,
    _json: () => hx1,
    collectBody: () => kx1.collectBody,
    convertMap: () => UT4,
    createAggregatedClient: () => RO4,
    dateToUtcString: () => Y30,
    decorateServiceException: () => W30,
    emitWarningIfUnsupportedVersion: () => JT4,
    expectBoolean: () => TO4,
    expectByte: () => gx1,
    expectFloat32: () => oI1,
    expectInt: () => SO4,
    expectInt32: () => vx1,
    expectLong: () => ua,
    expectNonNull: () => jO4,
    expectNumber: () => da,
    expectObject: () => Q30,
    expectShort: () => bx1,
    expectString: () => yO4,
    expectUnion: () => kO4,
    extendedEncodeURIComponent: () => kx1.extendedEncodeURIComponent,
    getArrayIfSingleItem: () => zT4,
    getDefaultClientConfiguration: () => KT4,
    getDefaultExtensionConfiguration: () => F30,
    getValueFromTextNode: () => X30,
    handleFloat: () => vO4,
    isSerializableHeaderValue: () => wT4,
    limitedParseDouble: () => ux1,
    limitedParseFloat: () => bO4,
    limitedParseFloat32: () => gO4,
    loadConfigsForDefaultMode: () => WT4,
    logger: () => pa,
    map: () => cx1,
    parseBoolean: () => OO4,
    parseEpochTimestamp: () => rO4,
    parseRfc3339DateTime: () => pO4,
    parseRfc3339DateTimeWithOffset: () => lO4,
    parseRfc7231DateTime: () => sO4,
    quoteHeader: () => C30,
    resolveDefaultRuntimeConfig: () => HT4,
    resolvedPath: () => kx1.resolvedPath,
    serializeDateTime: () => RT4,
    serializeFloat: () => LT4,
    splitEvery: () => K30,
    splitHeader: () => OT4,
    strictParseByte: () => D30,
    strictParseDouble: () => dx1,
    strictParseFloat: () => xO4,
    strictParseFloat32: () => I30,
    strictParseInt: () => hO4,
    strictParseInt32: () => mO4,
    strictParseLong: () => Z30,
    strictParseShort: () => Gg,
    take: () => NT4,
    throwDefaultError: () => J30,
    withBaseException: () => DT4
  });
  H30.exports = $O4(eB0);
  var A30 = WN(),
    qO4 = class {
      constructor(A) {
        this.config = A, this.middlewareStack = A30.constructStack()
      }
      static {
        B2(this, "Client")
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
    kx1 = vz(),
    fx1 = yx1(),
    B30 = class {
      constructor() {
        this.middlewareStack = A30.constructStack()
      }
      static {
        B2(this, "Command")
      }
      static classBuilder() {
        return new MO4
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
            [fx1.SMITHY_CONTEXT_KEY]: {
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
    MO4 = class {
      constructor() {
        this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
      }
      static {
        B2(this, "ClassBuilder")
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
        return B = class extends B30 {
          constructor(...[Q]) {
            super();
            this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
          }
          static {
            B2(this, "CommandRef")
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
    LO4 = "***SensitiveInformation***",
    RO4 = B2((A, B) => {
      for (let Q of Object.keys(A)) {
        let I = A[Q],
          G = B2(async function(D, Y, W) {
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
    OO4 = B2((A) => {
      switch (A) {
        case "true":
          return !0;
        case "false":
          return !1;
        default:
          throw new Error(`Unable to parse boolean value "${A}"`)
      }
    }, "parseBoolean"),
    TO4 = B2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "number") {
        if (A === 0 || A === 1) pa.warn(tI1(`Expected boolean, got ${typeof A}: ${A}`));
        if (A === 0) return !1;
        if (A === 1) return !0
      }
      if (typeof A === "string") {
        let B = A.toLowerCase();
        if (B === "false" || B === "true") pa.warn(tI1(`Expected boolean, got ${typeof A}: ${A}`));
        if (B === "false") return !1;
        if (B === "true") return !0
      }
      if (typeof A === "boolean") return A;
      throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
    }, "expectBoolean"),
    da = B2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") {
        let B = parseFloat(A);
        if (!Number.isNaN(B)) {
          if (String(B) !== String(A)) pa.warn(tI1(`Expected number but observed string: ${A}`));
          return B
        }
      }
      if (typeof A === "number") return A;
      throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
    }, "expectNumber"),
    PO4 = Math.ceil(340282346638528860000000000000000000000),
    oI1 = B2((A) => {
      let B = da(A);
      if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
        if (Math.abs(B) > PO4) throw new TypeError(`Expected 32-bit float, got ${A}`)
      }
      return B
    }, "expectFloat32"),
    ua = B2((A) => {
      if (A === null || A === void 0) return;
      if (Number.isInteger(A) && !Number.isNaN(A)) return A;
      throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
    }, "expectLong"),
    SO4 = ua,
    vx1 = B2((A) => mx1(A, 32), "expectInt32"),
    bx1 = B2((A) => mx1(A, 16), "expectShort"),
    gx1 = B2((A) => mx1(A, 8), "expectByte"),
    mx1 = B2((A, B) => {
      let Q = ua(A);
      if (Q !== void 0 && _O4(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
      return Q
    }, "expectSizedInt"),
    _O4 = B2((A, B) => {
      switch (B) {
        case 32:
          return Int32Array.of(A)[0];
        case 16:
          return Int16Array.of(A)[0];
        case 8:
          return Int8Array.of(A)[0]
      }
    }, "castInt"),
    jO4 = B2((A, B) => {
      if (A === null || A === void 0) {
        if (B) throw new TypeError(`Expected a non-null value for ${B}`);
        throw new TypeError("Expected a non-null value")
      }
      return A
    }, "expectNonNull"),
    Q30 = B2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "object" && !Array.isArray(A)) return A;
      let B = Array.isArray(A) ? "array" : typeof A;
      throw new TypeError(`Expected object, got ${B}: ${A}`)
    }, "expectObject"),
    yO4 = B2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A === "string") return A;
      if (["boolean", "number", "bigint"].includes(typeof A)) return pa.warn(tI1(`Expected string, got ${typeof A}: ${A}`)), String(A);
      throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
    }, "expectString"),
    kO4 = B2((A) => {
      if (A === null || A === void 0) return;
      let B = Q30(A),
        Q = Object.entries(B).filter(([, I]) => I != null).map(([I]) => I);
      if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
      if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
      return B
    }, "expectUnion"),
    dx1 = B2((A) => {
      if (typeof A == "string") return da(Dg(A));
      return da(A)
    }, "strictParseDouble"),
    xO4 = dx1,
    I30 = B2((A) => {
      if (typeof A == "string") return oI1(Dg(A));
      return oI1(A)
    }, "strictParseFloat32"),
    fO4 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
    Dg = B2((A) => {
      let B = A.match(fO4);
      if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
      return parseFloat(A)
    }, "parseNumber"),
    ux1 = B2((A) => {
      if (typeof A == "string") return G30(A);
      return da(A)
    }, "limitedParseDouble"),
    vO4 = ux1,
    bO4 = ux1,
    gO4 = B2((A) => {
      if (typeof A == "string") return G30(A);
      return oI1(A)
    }, "limitedParseFloat32"),
    G30 = B2((A) => {
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
    Z30 = B2((A) => {
      if (typeof A === "string") return ua(Dg(A));
      return ua(A)
    }, "strictParseLong"),
    hO4 = Z30,
    mO4 = B2((A) => {
      if (typeof A === "string") return vx1(Dg(A));
      return vx1(A)
    }, "strictParseInt32"),
    Gg = B2((A) => {
      if (typeof A === "string") return bx1(Dg(A));
      return bx1(A)
    }, "strictParseShort"),
    D30 = B2((A) => {
      if (typeof A === "string") return gx1(Dg(A));
      return gx1(A)
    }, "strictParseByte"),
    tI1 = B2((A) => {
      return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
    }, "stackTraceWarning"),
    pa = {
      warn: console.warn
    },
    dO4 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    px1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function Y30(A) {
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
    return `${dO4[I]}, ${W} ${px1[Q]} ${B} ${J}:${F}:${X} GMT`
  }
  B2(Y30, "dateToUtcString");
  var uO4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
    pO4 = B2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = uO4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J] = B, F = Gg(Zg(I)), X = az(G, "month", 1, 12), V = az(Z, "day", 1, 31);
      return ma(F, X, V, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      })
    }, "parseRfc3339DateTime"),
    cO4 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
    lO4 = B2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
      let B = cO4.exec(A);
      if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
      let [Q, I, G, Z, D, Y, W, J, F] = B, X = Gg(Zg(I)), V = az(G, "month", 1, 12), C = az(Z, "day", 1, 31), K = ma(X, V, C, {
        hours: D,
        minutes: Y,
        seconds: W,
        fractionalMilliseconds: J
      });
      if (F.toUpperCase() != "Z") K.setTime(K.getTime() - GT4(F));
      return K
    }, "parseRfc3339DateTimeWithOffset"),
    iO4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    nO4 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
    aO4 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
    sO4 = B2((A) => {
      if (A === null || A === void 0) return;
      if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
      let B = iO4.exec(A);
      if (B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return ma(Gg(Zg(Z)), xx1(G), az(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        })
      }
      if (B = nO4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return eO4(ma(oO4(Z), xx1(G), az(I, "day", 1, 31), {
          hours: D,
          minutes: Y,
          seconds: W,
          fractionalMilliseconds: J
        }))
      }
      if (B = aO4.exec(A), B) {
        let [Q, I, G, Z, D, Y, W, J] = B;
        return ma(Gg(Zg(J)), xx1(I), az(G.trimLeft(), "day", 1, 31), {
          hours: Z,
          minutes: D,
          seconds: Y,
          fractionalMilliseconds: W
        })
      }
      throw new TypeError("Invalid RFC-7231 date-time value")
    }, "parseRfc7231DateTime"),
    rO4 = B2((A) => {
      if (A === null || A === void 0) return;
      let B;
      if (typeof A === "number") B = A;
      else if (typeof A === "string") B = dx1(A);
      else if (typeof A === "object" && A.tag === 1) B = A.value;
      else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      return new Date(Math.round(B * 1000))
    }, "parseEpochTimestamp"),
    ma = B2((A, B, Q, I) => {
      let G = B - 1;
      return BT4(A, G, Q), new Date(Date.UTC(A, G, Q, az(I.hours, "hour", 0, 23), az(I.minutes, "minute", 0, 59), az(I.seconds, "seconds", 0, 60), IT4(I.fractionalMilliseconds)))
    }, "buildDate"),
    oO4 = B2((A) => {
      let B = new Date().getUTCFullYear(),
        Q = Math.floor(B / 100) * 100 + Gg(Zg(A));
      if (Q < B) return Q + 100;
      return Q
    }, "parseTwoDigitYear"),
    tO4 = 1576800000000,
    eO4 = B2((A) => {
      if (A.getTime() - new Date().getTime() > tO4) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
      return A
    }, "adjustRfc850Year"),
    xx1 = B2((A) => {
      let B = px1.indexOf(A);
      if (B < 0) throw new TypeError(`Invalid month: ${A}`);
      return B + 1
    }, "parseMonthByShortName"),
    AT4 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    BT4 = B2((A, B, Q) => {
      let I = AT4[B];
      if (B === 1 && QT4(A)) I = 29;
      if (Q > I) throw new TypeError(`Invalid day for ${px1[B]} in ${A}: ${Q}`)
    }, "validateDayOfMonth"),
    QT4 = B2((A) => {
      return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
    }, "isLeapYear"),
    az = B2((A, B, Q, I) => {
      let G = D30(Zg(A));
      if (G < Q || G > I) throw new TypeError(`${B} must be between ${Q} and ${I}, inclusive`);
      return G
    }, "parseDateValue"),
    IT4 = B2((A) => {
      if (A === null || A === void 0) return 0;
      return I30("0." + A) * 1000
    }, "parseMilliseconds"),
    GT4 = B2((A) => {
      let B = A[0],
        Q = 1;
      if (B == "+") Q = 1;
      else if (B == "-") Q = -1;
      else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
      let I = Number(A.substring(1, 3)),
        G = Number(A.substring(4, 6));
      return Q * (I * 60 + G) * 60 * 1000
    }, "parseOffsetToMilliseconds"),
    Zg = B2((A) => {
      let B = 0;
      while (B < A.length - 1 && A.charAt(B) === "0") B++;
      if (B === 0) return A;
      return A.slice(B)
    }, "stripLeadingZeroes"),
    ZT4 = class A extends Error {
      static {
        B2(this, "ServiceException")
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
    W30 = B2((A, B = {}) => {
      Object.entries(B).filter(([, I]) => I !== void 0).forEach(([I, G]) => {
        if (A[I] == null || A[I] === "") A[I] = G
      });
      let Q = A.message || A.Message || "UnknownError";
      return A.message = Q, delete A.Message, A
    }, "decorateServiceException"),
    J30 = B2(({
      output: A,
      parsedBody: B,
      exceptionCtor: Q,
      errorCode: I
    }) => {
      let G = YT4(A),
        Z = G.httpStatusCode ? G.httpStatusCode + "" : void 0,
        D = new Q({
          name: B?.code || B?.Code || I || Z || "UnknownError",
          $fault: "client",
          $metadata: G
        });
      throw W30(D, B)
    }, "throwDefaultError"),
    DT4 = B2((A) => {
      return ({
        output: B,
        parsedBody: Q,
        errorCode: I
      }) => {
        J30({
          output: B,
          parsedBody: Q,
          exceptionCtor: A,
          errorCode: I
        })
      }
    }, "withBaseException"),
    YT4 = B2((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    WT4 = B2((A) => {
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
    tB0 = !1,
    JT4 = B2((A) => {
      if (A && !tB0 && parseInt(A.substring(1, A.indexOf("."))) < 16) tB0 = !0
    }, "emitWarningIfUnsupportedVersion"),
    FT4 = B2((A) => {
      let B = [];
      for (let Q in fx1.AlgorithmId) {
        let I = fx1.AlgorithmId[Q];
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
    XT4 = B2((A) => {
      let B = {};
      return A.checksumAlgorithms().forEach((Q) => {
        B[Q.algorithmId()] = Q.checksumConstructor()
      }), B
    }, "resolveChecksumRuntimeConfig"),
    VT4 = B2((A) => {
      return {
        setRetryStrategy(B) {
          A.retryStrategy = B
        },
        retryStrategy() {
          return A.retryStrategy
        }
      }
    }, "getRetryConfiguration"),
    CT4 = B2((A) => {
      let B = {};
      return B.retryStrategy = A.retryStrategy(), B
    }, "resolveRetryRuntimeConfig"),
    F30 = B2((A) => {
      return Object.assign(FT4(A), VT4(A))
    }, "getDefaultExtensionConfiguration"),
    KT4 = F30,
    HT4 = B2((A) => {
      return Object.assign(XT4(A), CT4(A))
    }, "resolveDefaultRuntimeConfig"),
    zT4 = B2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
    X30 = B2((A) => {
      for (let Q in A)
        if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
        else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = X30(A[Q]);
      return A
    }, "getValueFromTextNode"),
    wT4 = B2((A) => {
      return A != null
    }, "isSerializableHeaderValue"),
    V_ = B2(function A(B) {
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
  V_.from = (A) => {
    if (A && typeof A === "object" && (A instanceof V_ || ("deserializeJSON" in A))) return A;
    else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return V_(String(A));
    return V_(JSON.stringify(A))
  };
  V_.fromObject = V_.from;
  var ET4 = class {
    static {
      B2(this, "NoOpLogger")
    }
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
  };

  function cx1(A, B, Q) {
    let I, G, Z;
    if (typeof B === "undefined" && typeof Q === "undefined") I = {}, Z = A;
    else if (I = A, typeof B === "function") return G = B, Z = Q, $T4(I, G, Z);
    else Z = B;
    for (let D of Object.keys(Z)) {
      if (!Array.isArray(Z[D])) {
        I[D] = Z[D];
        continue
      }
      V30(I, null, Z, D)
    }
    return I
  }
  B2(cx1, "map");
  var UT4 = B2((A) => {
      let B = {};
      for (let [Q, I] of Object.entries(A || {})) B[Q] = [, I];
      return B
    }, "convertMap"),
    NT4 = B2((A, B) => {
      let Q = {};
      for (let I in B) V30(Q, A, B, I);
      return Q
    }, "take"),
    $T4 = B2((A, B, Q) => {
      return cx1(A, Object.entries(Q).reduce((I, [G, Z]) => {
        if (Array.isArray(Z)) I[G] = Z;
        else if (typeof Z === "function") I[G] = [B, Z()];
        else I[G] = [B, Z];
        return I
      }, {}))
    }, "mapWithFilter"),
    V30 = B2((A, B, Q, I) => {
      if (B !== null) {
        let D = Q[I];
        if (typeof D === "function") D = [, D];
        let [Y = qT4, W = MT4, J = I] = D;
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
    qT4 = B2((A) => A != null, "nonNullish"),
    MT4 = B2((A) => A, "pass");

  function C30(A) {
    if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
    return A
  }
  B2(C30, "quoteHeader");
  var LT4 = B2((A) => {
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
    RT4 = B2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
    hx1 = B2((A) => {
      if (A == null) return {};
      if (Array.isArray(A)) return A.filter((B) => B != null).map(hx1);
      if (typeof A === "object") {
        let B = {};
        for (let Q of Object.keys(A)) {
          if (A[Q] == null) continue;
          B[Q] = hx1(A[Q])
        }
        return B
      }
      return A
    }, "_json");

  function K30(A, B, Q) {
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
  B2(K30, "splitEvery");
  var OT4 = B2((A) => {
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
// @from(Start 3823271, End 3823761)
E30 = z((z30) => {
  Object.defineProperty(z30, "__esModule", {
    value: !0
  });
  z30.fromBase64 = void 0;
  var TT4 = MZ(),
    PT4 = /^[A-Za-z0-9+/]*={0,2}$/,
    ST4 = (A) => {
      if (A.length * 3 % 4 !== 0) throw new TypeError("Incorrect padding on base64 string.");
      if (!PT4.exec(A)) throw new TypeError("Invalid base64 string.");
      let B = TT4.fromString(A, "base64");
      return new Uint8Array(B.buffer, B.byteOffset, B.byteLength)
    };
  z30.fromBase64 = ST4
})
// @from(Start 3823767, End 3824340)
$30 = z((U30) => {
  Object.defineProperty(U30, "__esModule", {
    value: !0
  });
  U30.toBase64 = void 0;
  var _T4 = MZ(),
    jT4 = RQ(),
    yT4 = (A) => {
      let B;
      if (typeof A === "string") B = jT4.fromUtf8(A);
      else B = A;
      if (typeof B !== "object" || typeof B.byteOffset !== "number" || typeof B.byteLength !== "number") throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
      return _T4.fromArrayBuffer(B.buffer, B.byteOffset, B.byteLength).toString("base64")
    };
  U30.toBase64 = yT4
})
// @from(Start 3824346, End 3825042)
L30 = z((kZ8, AG1) => {
  var {
    defineProperty: q30,
    getOwnPropertyDescriptor: kT4,
    getOwnPropertyNames: xT4
  } = Object, fT4 = Object.prototype.hasOwnProperty, lx1 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of xT4(B))
        if (!fT4.call(A, G) && G !== Q) q30(A, G, {
          get: () => B[G],
          enumerable: !(I = kT4(B, G)) || I.enumerable
        })
    }
    return A
  }, M30 = (A, B, Q) => (lx1(A, B, "default"), Q && lx1(Q, B, "default")), vT4 = (A) => lx1(q30({}, "__esModule", {
    value: !0
  }), A), ix1 = {};
  AG1.exports = vT4(ix1);
  M30(ix1, E30(), AG1.exports);
  M30(ix1, $30(), AG1.exports)
})
// @from(Start 3825048, End 3829875)
m30 = z((g30) => {
  Object.defineProperty(g30, "__esModule", {
    value: !0
  });
  g30.ruleSet = void 0;
  var f30 = "required",
    rz = "fn",
    oz = "argv",
    Wg = "ref",
    R30 = !0,
    O30 = "isSet",
    ia = "booleanEquals",
    Yg = "error",
    la = "endpoint",
    jD = "tree",
    nx1 = "PartitionResult",
    T30 = {
      [f30]: !1,
      type: "String"
    },
    P30 = {
      [f30]: !0,
      default: !1,
      type: "Boolean"
    },
    S30 = {
      [Wg]: "Endpoint"
    },
    v30 = {
      [rz]: ia,
      [oz]: [{
        [Wg]: "UseFIPS"
      }, !0]
    },
    b30 = {
      [rz]: ia,
      [oz]: [{
        [Wg]: "UseDualStack"
      }, !0]
    },
    sz = {},
    _30 = {
      [rz]: "getAttr",
      [oz]: [{
        [Wg]: nx1
      }, "supportsFIPS"]
    },
    j30 = {
      [rz]: ia,
      [oz]: [!0, {
        [rz]: "getAttr",
        [oz]: [{
          [Wg]: nx1
        }, "supportsDualStack"]
      }]
    },
    y30 = [v30],
    k30 = [b30],
    x30 = [{
      [Wg]: "Region"
    }],
    bT4 = {
      version: "1.0",
      parameters: {
        Region: T30,
        UseDualStack: P30,
        UseFIPS: P30,
        Endpoint: T30
      },
      rules: [{
        conditions: [{
          [rz]: O30,
          [oz]: [S30]
        }],
        rules: [{
          conditions: y30,
          error: "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: Yg
        }, {
          rules: [{
            conditions: k30,
            error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
            type: Yg
          }, {
            endpoint: {
              url: S30,
              properties: sz,
              headers: sz
            },
            type: la
          }],
          type: jD
        }],
        type: jD
      }, {
        rules: [{
          conditions: [{
            [rz]: O30,
            [oz]: x30
          }],
          rules: [{
            conditions: [{
              [rz]: "aws.partition",
              [oz]: x30,
              assign: nx1
            }],
            rules: [{
              conditions: [v30, b30],
              rules: [{
                conditions: [{
                  [rz]: ia,
                  [oz]: [R30, _30]
                }, j30],
                rules: [{
                  rules: [{
                    endpoint: {
                      url: "https://bedrock-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                      properties: sz,
                      headers: sz
                    },
                    type: la
                  }],
                  type: jD
                }],
                type: jD
              }, {
                error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                type: Yg
              }],
              type: jD
            }, {
              conditions: y30,
              rules: [{
                conditions: [{
                  [rz]: ia,
                  [oz]: [_30, R30]
                }],
                rules: [{
                  rules: [{
                    endpoint: {
                      url: "https://bedrock-fips.{Region}.{PartitionResult#dnsSuffix}",
                      properties: sz,
                      headers: sz
                    },
                    type: la
                  }],
                  type: jD
                }],
                type: jD
              }, {
                error: "FIPS is enabled but this partition does not support FIPS",
                type: Yg
              }],
              type: jD
            }, {
              conditions: k30,
              rules: [{
                conditions: [j30],
                rules: [{
                  rules: [{
                    endpoint: {
                      url: "https://bedrock.{Region}.{PartitionResult#dualStackDnsSuffix}",
                      properties: sz,
                      headers: sz
                    },
                    type: la
                  }],
                  type: jD
                }],
                type: jD
              }, {
                error: "DualStack is enabled but this partition does not support DualStack",
                type: Yg
              }],
              type: jD
            }, {
              rules: [{
                endpoint: {
                  url: "https://bedrock.{Region}.{PartitionResult#dnsSuffix}",
                  properties: sz,
                  headers: sz
                },
                type: la
              }],
              type: jD
            }],
            type: jD
          }],
          type: jD
        }, {
          error: "Invalid Configuration: Missing Region",
          type: Yg
        }],
        type: jD
      }]
    };
  g30.ruleSet = bT4
})
// @from(Start 3829881, End 3830439)
p30 = z((d30) => {
  Object.defineProperty(d30, "__esModule", {
    value: !0
  });
  d30.defaultEndpointResolver = void 0;
  var gT4 = RL(),
    ax1 = LL(),
    hT4 = m30(),
    mT4 = new ax1.EndpointCache({
      size: 50,
      params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
    }),
    dT4 = (A, B = {}) => {
      return mT4.get(A, () => ax1.resolveEndpoint(hT4.ruleSet, {
        endpointParams: A,
        logger: B.logger
      }))
    };
  d30.defaultEndpointResolver = dT4;
  ax1.customEndpointFunctions.aws = gT4.awsEndpointFunctions
})
// @from(Start 3830445, End 3831653)
a30 = z((i30) => {
  Object.defineProperty(i30, "__esModule", {
    value: !0
  });
  i30.getRuntimeConfig = void 0;
  var uT4 = IB(),
    pT4 = ca(),
    cT4 = FN(),
    c30 = L30(),
    l30 = RQ(),
    lT4 = Ky1(),
    iT4 = p30(),
    nT4 = (A) => {
      return {
        apiVersion: "2023-04-20",
        base64Decoder: A?.base64Decoder ?? c30.fromBase64,
        base64Encoder: A?.base64Encoder ?? c30.toBase64,
        disableHostPrefix: A?.disableHostPrefix ?? !1,
        endpointProvider: A?.endpointProvider ?? iT4.defaultEndpointResolver,
        extensions: A?.extensions ?? [],
        httpAuthSchemeProvider: A?.httpAuthSchemeProvider ?? lT4.defaultBedrockHttpAuthSchemeProvider,
        httpAuthSchemes: A?.httpAuthSchemes ?? [{
          schemeId: "aws.auth#sigv4",
          identityProvider: (B) => B.getIdentityProvider("aws.auth#sigv4"),
          signer: new uT4.AwsSdkSigV4Signer
        }],
        logger: A?.logger ?? new pT4.NoOpLogger,
        serviceId: A?.serviceId ?? "Bedrock",
        urlParser: A?.urlParser ?? cT4.parseUrl,
        utf8Decoder: A?.utf8Decoder ?? l30.fromUtf8,
        utf8Encoder: A?.utf8Encoder ?? l30.toUtf8
      }
    };
  i30.getRuntimeConfig = nT4
})
// @from(Start 3831659, End 3833860)
AQ0 = z((t30) => {
  Object.defineProperty(t30, "__esModule", {
    value: !0
  });
  t30.getRuntimeConfig = void 0;
  var aT4 = X10(),
    sT4 = aT4.__importDefault(V10()),
    rT4 = IB(),
    oT4 = ha(),
    s30 = I_(),
    BG1 = _D(),
    tT4 = G_(),
    r30 = KJ(),
    Jg = qC(),
    o30 = DN(),
    eT4 = Z_(),
    AP4 = vL(),
    BP4 = a30(),
    QP4 = ca(),
    IP4 = Y_(),
    GP4 = ca(),
    ZP4 = (A) => {
      GP4.emitWarningIfUnsupportedVersion(process.version);
      let B = IP4.resolveDefaultsModeConfig(A),
        Q = () => B().then(QP4.loadConfigsForDefaultMode),
        I = BP4.getRuntimeConfig(A);
      rT4.emitWarningIfUnsupportedVersion(process.version);
      let G = {
        profile: A?.profile
      };
      return {
        ...I,
        ...A,
        runtime: "node",
        defaultsMode: B,
        bodyLengthChecker: A?.bodyLengthChecker ?? eT4.calculateBodyLength,
        credentialDefaultProvider: A?.credentialDefaultProvider ?? oT4.defaultProvider,
        defaultUserAgentProvider: A?.defaultUserAgentProvider ?? s30.createDefaultUserAgentProvider({
          serviceId: I.serviceId,
          clientVersion: sT4.default.version
        }),
        maxAttempts: A?.maxAttempts ?? Jg.loadConfig(r30.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, A),
        region: A?.region ?? Jg.loadConfig(BG1.NODE_REGION_CONFIG_OPTIONS, {
          ...BG1.NODE_REGION_CONFIG_FILE_OPTIONS,
          ...G
        }),
        requestHandler: o30.NodeHttpHandler.create(A?.requestHandler ?? Q),
        retryMode: A?.retryMode ?? Jg.loadConfig({
          ...r30.NODE_RETRY_MODE_CONFIG_OPTIONS,
          default: async () => (await Q()).retryMode || AP4.DEFAULT_RETRY_MODE
        }, A),
        sha256: A?.sha256 ?? tT4.Hash.bind(null, "sha256"),
        streamCollector: A?.streamCollector ?? o30.streamCollector,
        useDualstackEndpoint: A?.useDualstackEndpoint ?? Jg.loadConfig(BG1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, G),
        useFipsEndpoint: A?.useFipsEndpoint ?? Jg.loadConfig(BG1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, G),
        userAgentAppId: A?.userAgentAppId ?? Jg.loadConfig(s30.NODE_APP_ID_CONFIG_OPTIONS, G)
      }
    };
  t30.getRuntimeConfig = ZP4
})
// @from(Start 3833866, End 3838373)
DQ0 = z((gZ8, ZQ0) => {
  var {
    defineProperty: QG1,
    getOwnPropertyDescriptor: DP4,
    getOwnPropertyNames: YP4
  } = Object, WP4 = Object.prototype.hasOwnProperty, nL = (A, B) => QG1(A, "name", {
    value: B,
    configurable: !0
  }), JP4 = (A, B) => {
    for (var Q in B) QG1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, FP4 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of YP4(B))
        if (!WP4.call(A, G) && G !== Q) QG1(A, G, {
          get: () => B[G],
          enumerable: !(I = DP4(B, G)) || I.enumerable
        })
    }
    return A
  }, XP4 = (A) => FP4(QG1({}, "__esModule", {
    value: !0
  }), A), BQ0 = {};
  JP4(BQ0, {
    Field: () => KP4,
    Fields: () => HP4,
    HttpRequest: () => zP4,
    HttpResponse: () => wP4,
    IHttpRequest: () => QQ0.HttpRequest,
    getHttpHandlerExtensionConfiguration: () => VP4,
    isValidHostname: () => GQ0,
    resolveHttpHandlerRuntimeConfig: () => CP4
  });
  ZQ0.exports = XP4(BQ0);
  var VP4 = nL((A) => {
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
    CP4 = nL((A) => {
      return {
        httpHandler: A.httpHandler()
      }
    }, "resolveHttpHandlerRuntimeConfig"),
    QQ0 = yx1(),
    KP4 = class {
      static {
        nL(this, "Field")
      }
      constructor({
        name: A,
        kind: B = QQ0.FieldPosition.HEADER,
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
    HP4 = class {
      constructor({
        fields: A = [],
        encoding: B = "utf-8"
      }) {
        this.entries = {}, A.forEach(this.setField.bind(this)), this.encoding = B
      }
      static {
        nL(this, "Fields")
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
    zP4 = class A {
      static {
        nL(this, "HttpRequest")
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
        if (Q.query) Q.query = IQ0(Q.query);
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

  function IQ0(A) {
    return Object.keys(A).reduce((B, Q) => {
      let I = A[Q];
      return {
        ...B,
        [Q]: Array.isArray(I) ? [...I] : I
      }
    }, {})
  }
  nL(IQ0, "cloneQuery");
  var wP4 = class {
    static {
      nL(this, "HttpResponse")
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

  function GQ0(A) {
    return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
  }
  nL(GQ0, "isValidHostname")
})
// @from(Start 3838379, End 3838791)
sx1 = z((YQ0) => {
  Object.defineProperty(YQ0, "__esModule", {
    value: !0
  });
  YQ0.default = NP4;
  var EP4 = UP4(Z1("crypto"));

  function UP4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var GG1 = new Uint8Array(256),
    IG1 = GG1.length;

  function NP4() {
    if (IG1 > GG1.length - 16) EP4.default.randomFillSync(GG1), IG1 = 0;
    return GG1.slice(IG1, IG1 += 16)
  }
})
// @from(Start 3838797, End 3839058)
FQ0 = z((WQ0) => {
  Object.defineProperty(WQ0, "__esModule", {
    value: !0
  });
  WQ0.default = void 0;
  var qP4 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  WQ0.default = qP4
})
// @from(Start 3839064, End 3839400)
na = z((XQ0) => {
  Object.defineProperty(XQ0, "__esModule", {
    value: !0
  });
  XQ0.default = void 0;
  var MP4 = LP4(FQ0());

  function LP4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function RP4(A) {
    return typeof A === "string" && MP4.default.test(A)
  }
  var OP4 = RP4;
  XQ0.default = OP4
})
// @from(Start 3839406, End 3840230)
aa = z((KQ0) => {
  Object.defineProperty(KQ0, "__esModule", {
    value: !0
  });
  KQ0.default = void 0;
  KQ0.unsafeStringify = CQ0;
  var TP4 = PP4(na());

  function PP4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var SG = [];
  for (let A = 0; A < 256; ++A) SG.push((A + 256).toString(16).slice(1));

  function CQ0(A, B = 0) {
    return SG[A[B + 0]] + SG[A[B + 1]] + SG[A[B + 2]] + SG[A[B + 3]] + "-" + SG[A[B + 4]] + SG[A[B + 5]] + "-" + SG[A[B + 6]] + SG[A[B + 7]] + "-" + SG[A[B + 8]] + SG[A[B + 9]] + "-" + SG[A[B + 10]] + SG[A[B + 11]] + SG[A[B + 12]] + SG[A[B + 13]] + SG[A[B + 14]] + SG[A[B + 15]]
  }

  function SP4(A, B = 0) {
    let Q = CQ0(A, B);
    if (!TP4.default(Q)) throw TypeError("Stringified UUID is invalid");
    return Q
  }
  var _P4 = SP4;
  KQ0.default = _P4
})
// @from(Start 3840236, End 3841773)
UQ0 = z((wQ0) => {
  Object.defineProperty(wQ0, "__esModule", {
    value: !0
  });
  wQ0.default = void 0;
  var yP4 = xP4(sx1()),
    kP4 = aa();

  function xP4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var zQ0, rx1, ox1 = 0,
    tx1 = 0;

  function fP4(A, B, Q) {
    let I = B && Q || 0,
      G = B || new Array(16);
    A = A || {};
    let Z = A.node || zQ0,
      D = A.clockseq !== void 0 ? A.clockseq : rx1;
    if (Z == null || D == null) {
      let V = A.random || (A.rng || yP4.default)();
      if (Z == null) Z = zQ0 = [V[0] | 1, V[1], V[2], V[3], V[4], V[5]];
      if (D == null) D = rx1 = (V[6] << 8 | V[7]) & 16383
    }
    let Y = A.msecs !== void 0 ? A.msecs : Date.now(),
      W = A.nsecs !== void 0 ? A.nsecs : tx1 + 1,
      J = Y - ox1 + (W - tx1) / 1e4;
    if (J < 0 && A.clockseq === void 0) D = D + 1 & 16383;
    if ((J < 0 || Y > ox1) && A.nsecs === void 0) W = 0;
    if (W >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    ox1 = Y, tx1 = W, rx1 = D, Y += 12219292800000;
    let F = ((Y & 268435455) * 1e4 + W) % 4294967296;
    G[I++] = F >>> 24 & 255, G[I++] = F >>> 16 & 255, G[I++] = F >>> 8 & 255, G[I++] = F & 255;
    let X = Y / 4294967296 * 1e4 & 268435455;
    G[I++] = X >>> 8 & 255, G[I++] = X & 255, G[I++] = X >>> 24 & 15 | 16, G[I++] = X >>> 16 & 255, G[I++] = D >>> 8 | 128, G[I++] = D & 255;
    for (let V = 0; V < 6; ++V) G[I + V] = Z[V];
    return B || kP4.unsafeStringify(G)
  }
  var vP4 = fP4;
  wQ0.default = vP4
})
// @from(Start 3841779, End 3842657)
ex1 = z((NQ0) => {
  Object.defineProperty(NQ0, "__esModule", {
    value: !0
  });
  NQ0.default = void 0;
  var bP4 = gP4(na());

  function gP4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function hP4(A) {
    if (!bP4.default(A)) throw TypeError("Invalid UUID");
    let B, Q = new Uint8Array(16);
    return Q[0] = (B = parseInt(A.slice(0, 8), 16)) >>> 24, Q[1] = B >>> 16 & 255, Q[2] = B >>> 8 & 255, Q[3] = B & 255, Q[4] = (B = parseInt(A.slice(9, 13), 16)) >>> 8, Q[5] = B & 255, Q[6] = (B = parseInt(A.slice(14, 18), 16)) >>> 8, Q[7] = B & 255, Q[8] = (B = parseInt(A.slice(19, 23), 16)) >>> 8, Q[9] = B & 255, Q[10] = (B = parseInt(A.slice(24, 36), 16)) / 1099511627776 & 255, Q[11] = B / 4294967296 & 255, Q[12] = B >>> 24 & 255, Q[13] = B >>> 16 & 255, Q[14] = B >>> 8 & 255, Q[15] = B & 255, Q
  }
  var mP4 = hP4;
  NQ0.default = mP4
})
// @from(Start 3842663, End 3843923)
Af1 = z((LQ0) => {
  Object.defineProperty(LQ0, "__esModule", {
    value: !0
  });
  LQ0.URL = LQ0.DNS = void 0;
  LQ0.default = lP4;
  var dP4 = aa(),
    uP4 = pP4(ex1());

  function pP4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function cP4(A) {
    A = unescape(encodeURIComponent(A));
    let B = [];
    for (let Q = 0; Q < A.length; ++Q) B.push(A.charCodeAt(Q));
    return B
  }
  var qQ0 = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
  LQ0.DNS = qQ0;
  var MQ0 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  LQ0.URL = MQ0;

  function lP4(A, B, Q) {
    function I(G, Z, D, Y) {
      var W;
      if (typeof G === "string") G = cP4(G);
      if (typeof Z === "string") Z = uP4.default(Z);
      if (((W = Z) === null || W === void 0 ? void 0 : W.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
      let J = new Uint8Array(16 + G.length);
      if (J.set(Z), J.set(G, Z.length), J = Q(J), J[6] = J[6] & 15 | B, J[8] = J[8] & 63 | 128, D) {
        Y = Y || 0;
        for (let F = 0; F < 16; ++F) D[Y + F] = J[F];
        return D
      }
      return dP4.unsafeStringify(J)
    }
    try {
      I.name = A
    } catch (G) {}
    return I.DNS = qQ0, I.URL = MQ0, I
  }
})
// @from(Start 3843929, End 3844387)
PQ0 = z((OQ0) => {
  Object.defineProperty(OQ0, "__esModule", {
    value: !0
  });
  OQ0.default = void 0;
  var aP4 = sP4(Z1("crypto"));

  function sP4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function rP4(A) {
    if (Array.isArray(A)) A = Buffer.from(A);
    else if (typeof A === "string") A = Buffer.from(A, "utf8");
    return aP4.default.createHash("md5").update(A).digest()
  }
  var oP4 = rP4;
  OQ0.default = oP4
})
// @from(Start 3844393, End 3844717)
yQ0 = z((_Q0) => {
  Object.defineProperty(_Q0, "__esModule", {
    value: !0
  });
  _Q0.default = void 0;
  var tP4 = SQ0(Af1()),
    eP4 = SQ0(PQ0());

  function SQ0(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var AS4 = tP4.default("v3", 48, eP4.default),
    BS4 = AS4;
  _Q0.default = BS4
})
// @from(Start 3844723, End 3845027)
fQ0 = z((kQ0) => {
  Object.defineProperty(kQ0, "__esModule", {
    value: !0
  });
  kQ0.default = void 0;
  var QS4 = IS4(Z1("crypto"));

  function IS4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }
  var GS4 = {
    randomUUID: QS4.default.randomUUID
  };
  kQ0.default = GS4
})
// @from(Start 3845033, End 3845687)
mQ0 = z((gQ0) => {
  Object.defineProperty(gQ0, "__esModule", {
    value: !0
  });
  gQ0.default = void 0;
  var vQ0 = bQ0(fQ0()),
    ZS4 = bQ0(sx1()),
    DS4 = aa();

  function bQ0(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function YS4(A, B, Q) {
    if (vQ0.default.randomUUID && !B && !A) return vQ0.default.randomUUID();
    A = A || {};
    let I = A.random || (A.rng || ZS4.default)();
    if (I[6] = I[6] & 15 | 64, I[8] = I[8] & 63 | 128, B) {
      Q = Q || 0;
      for (let G = 0; G < 16; ++G) B[Q + G] = I[G];
      return B
    }
    return DS4.unsafeStringify(I)
  }
  var WS4 = YS4;
  gQ0.default = WS4
})
// @from(Start 3845693, End 3846152)
pQ0 = z((dQ0) => {
  Object.defineProperty(dQ0, "__esModule", {
    value: !0
  });
  dQ0.default = void 0;
  var JS4 = FS4(Z1("crypto"));

  function FS4(A) {
    return A && A.__esModule ? A : {
      default: A
    }
  }

  function XS4(A) {
    if (Array.isArray(A)) A = Buffer.from(A);
    else if (typeof A === "string") A = Buffer.from(A, "utf8");
    return JS4.default.createHash("sha1").update(A).digest()
  }
  var VS4 = XS4;
  dQ0.default = VS4
})