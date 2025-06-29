
// @from(Start 6230693, End 6318028)
BD2 = z((lm8, AD2) => {
  var {
    defineProperty: bV1,
    getOwnPropertyDescriptor: Qa6,
    getOwnPropertyNames: Ia6
  } = Object, Ga6 = Object.prototype.hasOwnProperty, M1 = (A, B) => bV1(A, "name", {
    value: B,
    configurable: !0
  }), Za6 = (A, B) => {
    for (var Q in B) bV1(A, Q, {
      get: B[Q],
      enumerable: !0
    })
  }, Da6 = (A, B, Q, I) => {
    if (B && typeof B === "object" || typeof B === "function") {
      for (let G of Ia6(B))
        if (!Ga6.call(A, G) && G !== Q) bV1(A, G, {
          get: () => B[G],
          enumerable: !(I = Qa6(B, G)) || I.enumerable
        })
    }
    return A
  }, Ya6 = (A) => Da6(bV1({}, "__esModule", {
    value: !0
  }), A), gG2 = {};
  Za6(gG2, {
    AccessDeniedException: () => mG2,
    ApplyGuardrailCommand: () => lZ2,
    ApplyGuardrailRequestFilterSensitiveLog: () => IZ2,
    AsyncInvokeOutputDataConfig: () => ga1,
    AsyncInvokeStatus: () => Ea6,
    AsyncInvokeSummaryFilterSensitiveLog: () => eG2,
    BedrockRuntime: () => eZ2,
    BedrockRuntimeClient: () => sa1,
    BedrockRuntimeServiceException: () => GW,
    BidirectionalInputPayloadPartFilterSensitiveLog: () => Zs6,
    BidirectionalOutputPayloadPartFilterSensitiveLog: () => Ys6,
    CachePointType: () => ha6,
    ConflictException: () => cG2,
    ContentBlock: () => yV1,
    ContentBlockDelta: () => pa1,
    ContentBlockDeltaEventFilterSensitiveLog: () => FZ2,
    ContentBlockDeltaFilterSensitiveLog: () => JZ2,
    ContentBlockFilterSensitiveLog: () => GZ2,
    ContentBlockStart: () => ca1,
    ConversationRole: () => ia6,
    ConverseCommand: () => iZ2,
    ConverseOutput: () => da1,
    ConverseOutputFilterSensitiveLog: () => DZ2,
    ConverseRequestFilterSensitiveLog: () => ZZ2,
    ConverseResponseFilterSensitiveLog: () => YZ2,
    ConverseStreamCommand: () => nZ2,
    ConverseStreamOutput: () => la1,
    ConverseStreamOutputFilterSensitiveLog: () => Gs6,
    ConverseStreamRequestFilterSensitiveLog: () => WZ2,
    ConverseStreamResponseFilterSensitiveLog: () => XZ2,
    DocumentFormat: () => ma6,
    DocumentSource: () => RV1,
    GetAsyncInvokeCommand: () => aZ2,
    GetAsyncInvokeResponseFilterSensitiveLog: () => tG2,
    GuardrailAction: () => Ra6,
    GuardrailContentBlock: () => LV1,
    GuardrailContentBlockFilterSensitiveLog: () => QZ2,
    GuardrailContentFilterConfidence: () => Ta6,
    GuardrailContentFilterStrength: () => Pa6,
    GuardrailContentFilterType: () => Sa6,
    GuardrailContentPolicyAction: () => Oa6,
    GuardrailContentQualifier: () => qa6,
    GuardrailContentSource: () => La6,
    GuardrailContextualGroundingFilterType: () => ja6,
    GuardrailContextualGroundingPolicyAction: () => _a6,
    GuardrailConverseContentBlock: () => TV1,
    GuardrailConverseContentBlockFilterSensitiveLog: () => ra1,
    GuardrailConverseContentQualifier: () => ua6,
    GuardrailConverseImageBlockFilterSensitiveLog: () => As6,
    GuardrailConverseImageFormat: () => da6,
    GuardrailConverseImageSource: () => OV1,
    GuardrailConverseImageSourceFilterSensitiveLog: () => ea6,
    GuardrailImageBlockFilterSensitiveLog: () => ta6,
    GuardrailImageFormat: () => $a6,
    GuardrailImageSource: () => MV1,
    GuardrailImageSourceFilterSensitiveLog: () => oa6,
    GuardrailManagedWordType: () => ba6,
    GuardrailOutputScope: () => Ma6,
    GuardrailPiiEntityType: () => ka6,
    GuardrailSensitiveInformationPolicyAction: () => ya6,
    GuardrailStreamProcessingMode: () => sa6,
    GuardrailTopicPolicyAction: () => xa6,
    GuardrailTopicType: () => fa6,
    GuardrailTrace: () => ga6,
    GuardrailWordPolicyAction: () => va6,
    ImageFormat: () => pa6,
    ImageSource: () => PV1,
    InternalServerException: () => dG2,
    InvokeModelCommand: () => sZ2,
    InvokeModelRequestFilterSensitiveLog: () => VZ2,
    InvokeModelResponseFilterSensitiveLog: () => CZ2,
    InvokeModelWithBidirectionalStreamCommand: () => rZ2,
    InvokeModelWithBidirectionalStreamInput: () => vV1,
    InvokeModelWithBidirectionalStreamInputFilterSensitiveLog: () => Ds6,
    InvokeModelWithBidirectionalStreamOutput: () => ia1,
    InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog: () => Ws6,
    InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog: () => KZ2,
    InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog: () => HZ2,
    InvokeModelWithResponseStreamCommand: () => oZ2,
    InvokeModelWithResponseStreamRequestFilterSensitiveLog: () => zZ2,
    InvokeModelWithResponseStreamResponseFilterSensitiveLog: () => wZ2,
    ListAsyncInvokesCommand: () => Gs1,
    ListAsyncInvokesResponseFilterSensitiveLog: () => AZ2,
    MessageFilterSensitiveLog: () => gV1,
    ModelErrorException: () => aG2,
    ModelNotReadyException: () => sG2,
    ModelStreamErrorException: () => oG2,
    ModelTimeoutException: () => rG2,
    PayloadPartFilterSensitiveLog: () => Js6,
    PerformanceConfigLatency: () => na6,
    PromptVariableValues: () => ha1,
    ReasoningContentBlock: () => SV1,
    ReasoningContentBlockDelta: () => ua1,
    ReasoningContentBlockDeltaFilterSensitiveLog: () => Is6,
    ReasoningContentBlockFilterSensitiveLog: () => Qs6,
    ReasoningTextBlockFilterSensitiveLog: () => Bs6,
    ResourceNotFoundException: () => lG2,
    ResponseStream: () => na1,
    ResponseStreamFilterSensitiveLog: () => Fs6,
    ServiceQuotaExceededException: () => iG2,
    ServiceUnavailableException: () => nG2,
    SortAsyncInvocationBy: () => Ua6,
    SortOrder: () => Na6,
    StartAsyncInvokeCommand: () => tZ2,
    StartAsyncInvokeRequestFilterSensitiveLog: () => BZ2,
    StopReason: () => aa6,
    SystemContentBlock: () => kV1,
    SystemContentBlockFilterSensitiveLog: () => oa1,
    ThrottlingException: () => uG2,
    Tool: () => fV1,
    ToolChoice: () => ma1,
    ToolInputSchema: () => xV1,
    ToolResultContentBlock: () => jV1,
    ToolResultStatus: () => la6,
    Trace: () => ra6,
    ValidationException: () => pG2,
    VideoFormat: () => ca6,
    VideoSource: () => _V1,
    __Client: () => g1.Client,
    paginateListAsyncInvokes: () => Ao6
  });
  AD2.exports = Ya6(gG2);
  var hG2 = D32(),
    RG2 = cS(),
    Wa6 = lS(),
    Ja6 = iS(),
    OG2 = jL(),
    Fa6 = _D(),
    mJ = NI(),
    Xa6 = J32(),
    Va6 = tS(),
    nw = hz(),
    TG2 = KJ(),
    PG2 = Ia1(),
    Ca6 = M1((A) => {
      return Object.assign(A, {
        useDualstackEndpoint: A.useDualstackEndpoint ?? !1,
        useFipsEndpoint: A.useFipsEndpoint ?? !1,
        defaultSigningName: "bedrock"
      })
    }, "resolveClientEndpointParameters"),
    X$ = {
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
    Ka6 = LI2(),
    SG2 = W_(),
    _G2 = _I2(),
    g1 = Ye(),
    Ha6 = M1((A) => {
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
    za6 = M1((A) => {
      return {
        httpAuthSchemes: A.httpAuthSchemes(),
        httpAuthSchemeProvider: A.httpAuthSchemeProvider(),
        credentials: A.credentials()
      }
    }, "resolveHttpAuthRuntimeConfig"),
    wa6 = M1((A, B) => {
      let Q = Object.assign(SG2.getAwsRegionExtensionConfiguration(A), g1.getDefaultExtensionConfiguration(A), _G2.getHttpHandlerExtensionConfiguration(A), Ha6(A));
      return B.forEach((I) => I.configure(Q)), Object.assign(A, SG2.resolveAwsRegionExtensionConfiguration(Q), g1.resolveDefaultRuntimeConfig(Q), _G2.resolveHttpHandlerRuntimeConfig(Q), za6(Q))
    }, "resolveRuntimeExtensions"),
    sa1 = class extends g1.Client {
      static {
        M1(this, "BedrockRuntimeClient")
      }
      config;
      constructor(...[A]) {
        let B = Ka6.getRuntimeConfig(A || {});
        super(B);
        this.initConfig = B;
        let Q = Ca6(B),
          I = OG2.resolveUserAgentConfig(Q),
          G = TG2.resolveRetryConfig(I),
          Z = Fa6.resolveRegionConfig(G),
          D = RG2.resolveHostHeaderConfig(Z),
          Y = nw.resolveEndpointConfig(D),
          W = Xa6.resolveEventStreamSerdeConfig(Y),
          J = PG2.resolveHttpAuthSchemeConfig(W),
          F = hG2.resolveEventStreamConfig(J),
          X = wa6(F, A?.extensions || []);
        this.config = X, this.middlewareStack.use(OG2.getUserAgentPlugin(this.config)), this.middlewareStack.use(TG2.getRetryPlugin(this.config)), this.middlewareStack.use(Va6.getContentLengthPlugin(this.config)), this.middlewareStack.use(RG2.getHostHeaderPlugin(this.config)), this.middlewareStack.use(Wa6.getLoggerPlugin(this.config)), this.middlewareStack.use(Ja6.getRecursionDetectionPlugin(this.config)), this.middlewareStack.use(mJ.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: PG2.defaultBedrockRuntimeHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: M1(async (V) => new mJ.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": V.credentials
          }), "identityProviderConfigProvider")
        })), this.middlewareStack.use(mJ.getHttpSigningPlugin(this.config))
      }
      destroy() {
        super.destroy()
      }
    },
    V$ = yz(),
    GW = class A extends g1.ServiceException {
      static {
        M1(this, "BedrockRuntimeServiceException")
      }
      constructor(B) {
        super(B);
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    mG2 = class A extends GW {
      static {
        M1(this, "AccessDeniedException")
      }
      name = "AccessDeniedException";
      $fault = "client";
      constructor(B) {
        super({
          name: "AccessDeniedException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    ga1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.s3OutputDataConfig !== void 0) return Q.s3OutputDataConfig(B.s3OutputDataConfig);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(ga1 || (ga1 = {}));
  var Ea6 = {
      COMPLETED: "Completed",
      FAILED: "Failed",
      IN_PROGRESS: "InProgress"
    },
    dG2 = class A extends GW {
      static {
        M1(this, "InternalServerException")
      }
      name = "InternalServerException";
      $fault = "server";
      constructor(B) {
        super({
          name: "InternalServerException",
          $fault: "server",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    uG2 = class A extends GW {
      static {
        M1(this, "ThrottlingException")
      }
      name = "ThrottlingException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ThrottlingException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    pG2 = class A extends GW {
      static {
        M1(this, "ValidationException")
      }
      name = "ValidationException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ValidationException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    Ua6 = {
      SUBMISSION_TIME: "SubmissionTime"
    },
    Na6 = {
      ASCENDING: "Ascending",
      DESCENDING: "Descending"
    },
    cG2 = class A extends GW {
      static {
        M1(this, "ConflictException")
      }
      name = "ConflictException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ConflictException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    lG2 = class A extends GW {
      static {
        M1(this, "ResourceNotFoundException")
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
    iG2 = class A extends GW {
      static {
        M1(this, "ServiceQuotaExceededException")
      }
      name = "ServiceQuotaExceededException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ServiceQuotaExceededException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    nG2 = class A extends GW {
      static {
        M1(this, "ServiceUnavailableException")
      }
      name = "ServiceUnavailableException";
      $fault = "server";
      constructor(B) {
        super({
          name: "ServiceUnavailableException",
          $fault: "server",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    $a6 = {
      JPEG: "jpeg",
      PNG: "png"
    },
    MV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.bytes !== void 0) return Q.bytes(B.bytes);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(MV1 || (MV1 = {}));
  var qa6 = {
      GROUNDING_SOURCE: "grounding_source",
      GUARD_CONTENT: "guard_content",
      QUERY: "query"
    },
    LV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.text !== void 0) return Q.text(B.text);
      if (B.image !== void 0) return Q.image(B.image);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(LV1 || (LV1 = {}));
  var Ma6 = {
      FULL: "FULL",
      INTERVENTIONS: "INTERVENTIONS"
    },
    La6 = {
      INPUT: "INPUT",
      OUTPUT: "OUTPUT"
    },
    Ra6 = {
      GUARDRAIL_INTERVENED: "GUARDRAIL_INTERVENED",
      NONE: "NONE"
    },
    Oa6 = {
      BLOCKED: "BLOCKED",
      NONE: "NONE"
    },
    Ta6 = {
      HIGH: "HIGH",
      LOW: "LOW",
      MEDIUM: "MEDIUM",
      NONE: "NONE"
    },
    Pa6 = {
      HIGH: "HIGH",
      LOW: "LOW",
      MEDIUM: "MEDIUM",
      NONE: "NONE"
    },
    Sa6 = {
      HATE: "HATE",
      INSULTS: "INSULTS",
      MISCONDUCT: "MISCONDUCT",
      PROMPT_ATTACK: "PROMPT_ATTACK",
      SEXUAL: "SEXUAL",
      VIOLENCE: "VIOLENCE"
    },
    _a6 = {
      BLOCKED: "BLOCKED",
      NONE: "NONE"
    },
    ja6 = {
      GROUNDING: "GROUNDING",
      RELEVANCE: "RELEVANCE"
    },
    ya6 = {
      ANONYMIZED: "ANONYMIZED",
      BLOCKED: "BLOCKED",
      NONE: "NONE"
    },
    ka6 = {
      ADDRESS: "ADDRESS",
      AGE: "AGE",
      AWS_ACCESS_KEY: "AWS_ACCESS_KEY",
      AWS_SECRET_KEY: "AWS_SECRET_KEY",
      CA_HEALTH_NUMBER: "CA_HEALTH_NUMBER",
      CA_SOCIAL_INSURANCE_NUMBER: "CA_SOCIAL_INSURANCE_NUMBER",
      CREDIT_DEBIT_CARD_CVV: "CREDIT_DEBIT_CARD_CVV",
      CREDIT_DEBIT_CARD_EXPIRY: "CREDIT_DEBIT_CARD_EXPIRY",
      CREDIT_DEBIT_CARD_NUMBER: "CREDIT_DEBIT_CARD_NUMBER",
      DRIVER_ID: "DRIVER_ID",
      EMAIL: "EMAIL",
      INTERNATIONAL_BANK_ACCOUNT_NUMBER: "INTERNATIONAL_BANK_ACCOUNT_NUMBER",
      IP_ADDRESS: "IP_ADDRESS",
      LICENSE_PLATE: "LICENSE_PLATE",
      MAC_ADDRESS: "MAC_ADDRESS",
      NAME: "NAME",
      PASSWORD: "PASSWORD",
      PHONE: "PHONE",
      PIN: "PIN",
      SWIFT_CODE: "SWIFT_CODE",
      UK_NATIONAL_HEALTH_SERVICE_NUMBER: "UK_NATIONAL_HEALTH_SERVICE_NUMBER",
      UK_NATIONAL_INSURANCE_NUMBER: "UK_NATIONAL_INSURANCE_NUMBER",
      UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER: "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER",
      URL: "URL",
      USERNAME: "USERNAME",
      US_BANK_ACCOUNT_NUMBER: "US_BANK_ACCOUNT_NUMBER",
      US_BANK_ROUTING_NUMBER: "US_BANK_ROUTING_NUMBER",
      US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER: "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER",
      US_PASSPORT_NUMBER: "US_PASSPORT_NUMBER",
      US_SOCIAL_SECURITY_NUMBER: "US_SOCIAL_SECURITY_NUMBER",
      VEHICLE_IDENTIFICATION_NUMBER: "VEHICLE_IDENTIFICATION_NUMBER"
    },
    xa6 = {
      BLOCKED: "BLOCKED",
      NONE: "NONE"
    },
    fa6 = {
      DENY: "DENY"
    },
    va6 = {
      BLOCKED: "BLOCKED",
      NONE: "NONE"
    },
    ba6 = {
      PROFANITY: "PROFANITY"
    },
    ga6 = {
      DISABLED: "disabled",
      ENABLED: "enabled",
      ENABLED_FULL: "enabled_full"
    },
    ha6 = {
      DEFAULT: "default"
    },
    ma6 = {
      CSV: "csv",
      DOC: "doc",
      DOCX: "docx",
      HTML: "html",
      MD: "md",
      PDF: "pdf",
      TXT: "txt",
      XLS: "xls",
      XLSX: "xlsx"
    },
    RV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.bytes !== void 0) return Q.bytes(B.bytes);
      if (B.s3Location !== void 0) return Q.s3Location(B.s3Location);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(RV1 || (RV1 = {}));
  var da6 = {
      JPEG: "jpeg",
      PNG: "png"
    },
    OV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.bytes !== void 0) return Q.bytes(B.bytes);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(OV1 || (OV1 = {}));
  var ua6 = {
      GROUNDING_SOURCE: "grounding_source",
      GUARD_CONTENT: "guard_content",
      QUERY: "query"
    },
    TV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.text !== void 0) return Q.text(B.text);
      if (B.image !== void 0) return Q.image(B.image);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(TV1 || (TV1 = {}));
  var pa6 = {
      GIF: "gif",
      JPEG: "jpeg",
      PNG: "png",
      WEBP: "webp"
    },
    PV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.bytes !== void 0) return Q.bytes(B.bytes);
      if (B.s3Location !== void 0) return Q.s3Location(B.s3Location);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(PV1 || (PV1 = {}));
  var SV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.reasoningText !== void 0) return Q.reasoningText(B.reasoningText);
      if (B.redactedContent !== void 0) return Q.redactedContent(B.redactedContent);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(SV1 || (SV1 = {}));
  var ca6 = {
      FLV: "flv",
      MKV: "mkv",
      MOV: "mov",
      MP4: "mp4",
      MPEG: "mpeg",
      MPG: "mpg",
      THREE_GP: "three_gp",
      WEBM: "webm",
      WMV: "wmv"
    },
    _V1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.bytes !== void 0) return Q.bytes(B.bytes);
      if (B.s3Location !== void 0) return Q.s3Location(B.s3Location);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(_V1 || (_V1 = {}));
  var jV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.json !== void 0) return Q.json(B.json);
      if (B.text !== void 0) return Q.text(B.text);
      if (B.image !== void 0) return Q.image(B.image);
      if (B.document !== void 0) return Q.document(B.document);
      if (B.video !== void 0) return Q.video(B.video);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(jV1 || (jV1 = {}));
  var la6 = {
      ERROR: "error",
      SUCCESS: "success"
    },
    yV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.text !== void 0) return Q.text(B.text);
      if (B.image !== void 0) return Q.image(B.image);
      if (B.document !== void 0) return Q.document(B.document);
      if (B.video !== void 0) return Q.video(B.video);
      if (B.toolUse !== void 0) return Q.toolUse(B.toolUse);
      if (B.toolResult !== void 0) return Q.toolResult(B.toolResult);
      if (B.guardContent !== void 0) return Q.guardContent(B.guardContent);
      if (B.cachePoint !== void 0) return Q.cachePoint(B.cachePoint);
      if (B.reasoningContent !== void 0) return Q.reasoningContent(B.reasoningContent);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(yV1 || (yV1 = {}));
  var ia6 = {
      ASSISTANT: "assistant",
      USER: "user"
    },
    na6 = {
      OPTIMIZED: "optimized",
      STANDARD: "standard"
    },
    ha1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.text !== void 0) return Q.text(B.text);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(ha1 || (ha1 = {}));
  var kV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.text !== void 0) return Q.text(B.text);
      if (B.guardContent !== void 0) return Q.guardContent(B.guardContent);
      if (B.cachePoint !== void 0) return Q.cachePoint(B.cachePoint);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(kV1 || (kV1 = {}));
  var ma1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.auto !== void 0) return Q.auto(B.auto);
      if (B.any !== void 0) return Q.any(B.any);
      if (B.tool !== void 0) return Q.tool(B.tool);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(ma1 || (ma1 = {}));
  var xV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.json !== void 0) return Q.json(B.json);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(xV1 || (xV1 = {}));
  var fV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.toolSpec !== void 0) return Q.toolSpec(B.toolSpec);
      if (B.cachePoint !== void 0) return Q.cachePoint(B.cachePoint);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(fV1 || (fV1 = {}));
  var da1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.message !== void 0) return Q.message(B.message);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(da1 || (da1 = {}));
  var aa6 = {
      CONTENT_FILTERED: "content_filtered",
      END_TURN: "end_turn",
      GUARDRAIL_INTERVENED: "guardrail_intervened",
      MAX_TOKENS: "max_tokens",
      STOP_SEQUENCE: "stop_sequence",
      TOOL_USE: "tool_use"
    },
    aG2 = class A extends GW {
      static {
        M1(this, "ModelErrorException")
      }
      name = "ModelErrorException";
      $fault = "client";
      originalStatusCode;
      resourceName;
      constructor(B) {
        super({
          name: "ModelErrorException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.originalStatusCode = B.originalStatusCode, this.resourceName = B.resourceName
      }
    },
    sG2 = class A extends GW {
      static {
        M1(this, "ModelNotReadyException")
      }
      name = "ModelNotReadyException";
      $fault = "client";
      $retryable = {};
      constructor(B) {
        super({
          name: "ModelNotReadyException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    rG2 = class A extends GW {
      static {
        M1(this, "ModelTimeoutException")
      }
      name = "ModelTimeoutException";
      $fault = "client";
      constructor(B) {
        super({
          name: "ModelTimeoutException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype)
      }
    },
    sa6 = {
      ASYNC: "async",
      SYNC: "sync"
    },
    ua1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.text !== void 0) return Q.text(B.text);
      if (B.redactedContent !== void 0) return Q.redactedContent(B.redactedContent);
      if (B.signature !== void 0) return Q.signature(B.signature);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(ua1 || (ua1 = {}));
  var pa1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.text !== void 0) return Q.text(B.text);
      if (B.toolUse !== void 0) return Q.toolUse(B.toolUse);
      if (B.reasoningContent !== void 0) return Q.reasoningContent(B.reasoningContent);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(pa1 || (pa1 = {}));
  var ca1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.toolUse !== void 0) return Q.toolUse(B.toolUse);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(ca1 || (ca1 = {}));
  var oG2 = class A extends GW {
      static {
        M1(this, "ModelStreamErrorException")
      }
      name = "ModelStreamErrorException";
      $fault = "client";
      originalStatusCode;
      originalMessage;
      constructor(B) {
        super({
          name: "ModelStreamErrorException",
          $fault: "client",
          ...B
        });
        Object.setPrototypeOf(this, A.prototype), this.originalStatusCode = B.originalStatusCode, this.originalMessage = B.originalMessage
      }
    },
    la1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.messageStart !== void 0) return Q.messageStart(B.messageStart);
      if (B.contentBlockStart !== void 0) return Q.contentBlockStart(B.contentBlockStart);
      if (B.contentBlockDelta !== void 0) return Q.contentBlockDelta(B.contentBlockDelta);
      if (B.contentBlockStop !== void 0) return Q.contentBlockStop(B.contentBlockStop);
      if (B.messageStop !== void 0) return Q.messageStop(B.messageStop);
      if (B.metadata !== void 0) return Q.metadata(B.metadata);
      if (B.internalServerException !== void 0) return Q.internalServerException(B.internalServerException);
      if (B.modelStreamErrorException !== void 0) return Q.modelStreamErrorException(B.modelStreamErrorException);
      if (B.validationException !== void 0) return Q.validationException(B.validationException);
      if (B.throttlingException !== void 0) return Q.throttlingException(B.throttlingException);
      if (B.serviceUnavailableException !== void 0) return Q.serviceUnavailableException(B.serviceUnavailableException);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(la1 || (la1 = {}));
  var ra6 = {
      DISABLED: "DISABLED",
      ENABLED: "ENABLED",
      ENABLED_FULL: "ENABLED_FULL"
    },
    vV1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.chunk !== void 0) return Q.chunk(B.chunk);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(vV1 || (vV1 = {}));
  var ia1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.chunk !== void 0) return Q.chunk(B.chunk);
      if (B.internalServerException !== void 0) return Q.internalServerException(B.internalServerException);
      if (B.modelStreamErrorException !== void 0) return Q.modelStreamErrorException(B.modelStreamErrorException);
      if (B.validationException !== void 0) return Q.validationException(B.validationException);
      if (B.throttlingException !== void 0) return Q.throttlingException(B.throttlingException);
      if (B.modelTimeoutException !== void 0) return Q.modelTimeoutException(B.modelTimeoutException);
      if (B.serviceUnavailableException !== void 0) return Q.serviceUnavailableException(B.serviceUnavailableException);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(ia1 || (ia1 = {}));
  var na1;
  ((A) => {
    A.visit = M1((B, Q) => {
      if (B.chunk !== void 0) return Q.chunk(B.chunk);
      if (B.internalServerException !== void 0) return Q.internalServerException(B.internalServerException);
      if (B.modelStreamErrorException !== void 0) return Q.modelStreamErrorException(B.modelStreamErrorException);
      if (B.validationException !== void 0) return Q.validationException(B.validationException);
      if (B.throttlingException !== void 0) return Q.throttlingException(B.throttlingException);
      if (B.modelTimeoutException !== void 0) return Q.modelTimeoutException(B.modelTimeoutException);
      if (B.serviceUnavailableException !== void 0) return Q.serviceUnavailableException(B.serviceUnavailableException);
      return Q._(B.$unknown[0], B.$unknown[1])
    }, "visit")
  })(na1 || (na1 = {}));
  var tG2 = M1((A) => ({
      ...A,
      ...A.failureMessage && {
        failureMessage: g1.SENSITIVE_STRING
      },
      ...A.outputDataConfig && {
        outputDataConfig: A.outputDataConfig
      }
    }), "GetAsyncInvokeResponseFilterSensitiveLog"),
    eG2 = M1((A) => ({
      ...A,
      ...A.failureMessage && {
        failureMessage: g1.SENSITIVE_STRING
      },
      ...A.outputDataConfig && {
        outputDataConfig: A.outputDataConfig
      }
    }), "AsyncInvokeSummaryFilterSensitiveLog"),
    AZ2 = M1((A) => ({
      ...A,
      ...A.asyncInvokeSummaries && {
        asyncInvokeSummaries: A.asyncInvokeSummaries.map((B) => eG2(B))
      }
    }), "ListAsyncInvokesResponseFilterSensitiveLog"),
    BZ2 = M1((A) => ({
      ...A,
      ...A.modelInput && {
        modelInput: g1.SENSITIVE_STRING
      },
      ...A.outputDataConfig && {
        outputDataConfig: A.outputDataConfig
      }
    }), "StartAsyncInvokeRequestFilterSensitiveLog"),
    oa6 = M1((A) => {
      if (A.bytes !== void 0) return {
        bytes: A.bytes
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "GuardrailImageSourceFilterSensitiveLog"),
    ta6 = M1((A) => ({
      ...A,
      ...A.source && {
        source: g1.SENSITIVE_STRING
      }
    }), "GuardrailImageBlockFilterSensitiveLog"),
    QZ2 = M1((A) => {
      if (A.text !== void 0) return {
        text: A.text
      };
      if (A.image !== void 0) return {
        image: g1.SENSITIVE_STRING
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "GuardrailContentBlockFilterSensitiveLog"),
    IZ2 = M1((A) => ({
      ...A,
      ...A.content && {
        content: A.content.map((B) => QZ2(B))
      }
    }), "ApplyGuardrailRequestFilterSensitiveLog"),
    ea6 = M1((A) => {
      if (A.bytes !== void 0) return {
        bytes: A.bytes
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "GuardrailConverseImageSourceFilterSensitiveLog"),
    As6 = M1((A) => ({
      ...A,
      ...A.source && {
        source: g1.SENSITIVE_STRING
      }
    }), "GuardrailConverseImageBlockFilterSensitiveLog"),
    ra1 = M1((A) => {
      if (A.text !== void 0) return {
        text: A.text
      };
      if (A.image !== void 0) return {
        image: g1.SENSITIVE_STRING
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "GuardrailConverseContentBlockFilterSensitiveLog"),
    Bs6 = M1((A) => ({
      ...A
    }), "ReasoningTextBlockFilterSensitiveLog"),
    Qs6 = M1((A) => {
      if (A.reasoningText !== void 0) return {
        reasoningText: g1.SENSITIVE_STRING
      };
      if (A.redactedContent !== void 0) return {
        redactedContent: A.redactedContent
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "ReasoningContentBlockFilterSensitiveLog"),
    GZ2 = M1((A) => {
      if (A.text !== void 0) return {
        text: A.text
      };
      if (A.image !== void 0) return {
        image: A.image
      };
      if (A.document !== void 0) return {
        document: A.document
      };
      if (A.video !== void 0) return {
        video: A.video
      };
      if (A.toolUse !== void 0) return {
        toolUse: A.toolUse
      };
      if (A.toolResult !== void 0) return {
        toolResult: A.toolResult
      };
      if (A.guardContent !== void 0) return {
        guardContent: ra1(A.guardContent)
      };
      if (A.cachePoint !== void 0) return {
        cachePoint: A.cachePoint
      };
      if (A.reasoningContent !== void 0) return {
        reasoningContent: g1.SENSITIVE_STRING
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "ContentBlockFilterSensitiveLog"),
    gV1 = M1((A) => ({
      ...A,
      ...A.content && {
        content: A.content.map((B) => GZ2(B))
      }
    }), "MessageFilterSensitiveLog"),
    oa1 = M1((A) => {
      if (A.text !== void 0) return {
        text: A.text
      };
      if (A.guardContent !== void 0) return {
        guardContent: ra1(A.guardContent)
      };
      if (A.cachePoint !== void 0) return {
        cachePoint: A.cachePoint
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "SystemContentBlockFilterSensitiveLog"),
    ZZ2 = M1((A) => ({
      ...A,
      ...A.messages && {
        messages: A.messages.map((B) => gV1(B))
      },
      ...A.system && {
        system: A.system.map((B) => oa1(B))
      },
      ...A.toolConfig && {
        toolConfig: A.toolConfig
      },
      ...A.promptVariables && {
        promptVariables: g1.SENSITIVE_STRING
      },
      ...A.requestMetadata && {
        requestMetadata: g1.SENSITIVE_STRING
      }
    }), "ConverseRequestFilterSensitiveLog"),
    DZ2 = M1((A) => {
      if (A.message !== void 0) return {
        message: gV1(A.message)
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "ConverseOutputFilterSensitiveLog"),
    YZ2 = M1((A) => ({
      ...A,
      ...A.output && {
        output: DZ2(A.output)
      }
    }), "ConverseResponseFilterSensitiveLog"),
    WZ2 = M1((A) => ({
      ...A,
      ...A.messages && {
        messages: A.messages.map((B) => gV1(B))
      },
      ...A.system && {
        system: A.system.map((B) => oa1(B))
      },
      ...A.toolConfig && {
        toolConfig: A.toolConfig
      },
      ...A.promptVariables && {
        promptVariables: g1.SENSITIVE_STRING
      },
      ...A.requestMetadata && {
        requestMetadata: g1.SENSITIVE_STRING
      }
    }), "ConverseStreamRequestFilterSensitiveLog"),
    Is6 = M1((A) => {
      if (A.text !== void 0) return {
        text: A.text
      };
      if (A.redactedContent !== void 0) return {
        redactedContent: A.redactedContent
      };
      if (A.signature !== void 0) return {
        signature: A.signature
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "ReasoningContentBlockDeltaFilterSensitiveLog"),
    JZ2 = M1((A) => {
      if (A.text !== void 0) return {
        text: A.text
      };
      if (A.toolUse !== void 0) return {
        toolUse: A.toolUse
      };
      if (A.reasoningContent !== void 0) return {
        reasoningContent: g1.SENSITIVE_STRING
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "ContentBlockDeltaFilterSensitiveLog"),
    FZ2 = M1((A) => ({
      ...A,
      ...A.delta && {
        delta: JZ2(A.delta)
      }
    }), "ContentBlockDeltaEventFilterSensitiveLog"),
    Gs6 = M1((A) => {
      if (A.messageStart !== void 0) return {
        messageStart: A.messageStart
      };
      if (A.contentBlockStart !== void 0) return {
        contentBlockStart: A.contentBlockStart
      };
      if (A.contentBlockDelta !== void 0) return {
        contentBlockDelta: FZ2(A.contentBlockDelta)
      };
      if (A.contentBlockStop !== void 0) return {
        contentBlockStop: A.contentBlockStop
      };
      if (A.messageStop !== void 0) return {
        messageStop: A.messageStop
      };
      if (A.metadata !== void 0) return {
        metadata: A.metadata
      };
      if (A.internalServerException !== void 0) return {
        internalServerException: A.internalServerException
      };
      if (A.modelStreamErrorException !== void 0) return {
        modelStreamErrorException: A.modelStreamErrorException
      };
      if (A.validationException !== void 0) return {
        validationException: A.validationException
      };
      if (A.throttlingException !== void 0) return {
        throttlingException: A.throttlingException
      };
      if (A.serviceUnavailableException !== void 0) return {
        serviceUnavailableException: A.serviceUnavailableException
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "ConverseStreamOutputFilterSensitiveLog"),
    XZ2 = M1((A) => ({
      ...A,
      ...A.stream && {
        stream: "STREAMING_CONTENT"
      }
    }), "ConverseStreamResponseFilterSensitiveLog"),
    VZ2 = M1((A) => ({
      ...A,
      ...A.body && {
        body: g1.SENSITIVE_STRING
      }
    }), "InvokeModelRequestFilterSensitiveLog"),
    CZ2 = M1((A) => ({
      ...A,
      ...A.body && {
        body: g1.SENSITIVE_STRING
      }
    }), "InvokeModelResponseFilterSensitiveLog"),
    Zs6 = M1((A) => ({
      ...A,
      ...A.bytes && {
        bytes: g1.SENSITIVE_STRING
      }
    }), "BidirectionalInputPayloadPartFilterSensitiveLog"),
    Ds6 = M1((A) => {
      if (A.chunk !== void 0) return {
        chunk: g1.SENSITIVE_STRING
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "InvokeModelWithBidirectionalStreamInputFilterSensitiveLog"),
    KZ2 = M1((A) => ({
      ...A,
      ...A.body && {
        body: "STREAMING_CONTENT"
      }
    }), "InvokeModelWithBidirectionalStreamRequestFilterSensitiveLog"),
    Ys6 = M1((A) => ({
      ...A,
      ...A.bytes && {
        bytes: g1.SENSITIVE_STRING
      }
    }), "BidirectionalOutputPayloadPartFilterSensitiveLog"),
    Ws6 = M1((A) => {
      if (A.chunk !== void 0) return {
        chunk: g1.SENSITIVE_STRING
      };
      if (A.internalServerException !== void 0) return {
        internalServerException: A.internalServerException
      };
      if (A.modelStreamErrorException !== void 0) return {
        modelStreamErrorException: A.modelStreamErrorException
      };
      if (A.validationException !== void 0) return {
        validationException: A.validationException
      };
      if (A.throttlingException !== void 0) return {
        throttlingException: A.throttlingException
      };
      if (A.modelTimeoutException !== void 0) return {
        modelTimeoutException: A.modelTimeoutException
      };
      if (A.serviceUnavailableException !== void 0) return {
        serviceUnavailableException: A.serviceUnavailableException
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "InvokeModelWithBidirectionalStreamOutputFilterSensitiveLog"),
    HZ2 = M1((A) => ({
      ...A,
      ...A.body && {
        body: "STREAMING_CONTENT"
      }
    }), "InvokeModelWithBidirectionalStreamResponseFilterSensitiveLog"),
    zZ2 = M1((A) => ({
      ...A,
      ...A.body && {
        body: g1.SENSITIVE_STRING
      }
    }), "InvokeModelWithResponseStreamRequestFilterSensitiveLog"),
    Js6 = M1((A) => ({
      ...A,
      ...A.bytes && {
        bytes: g1.SENSITIVE_STRING
      }
    }), "PayloadPartFilterSensitiveLog"),
    Fs6 = M1((A) => {
      if (A.chunk !== void 0) return {
        chunk: g1.SENSITIVE_STRING
      };
      if (A.internalServerException !== void 0) return {
        internalServerException: A.internalServerException
      };
      if (A.modelStreamErrorException !== void 0) return {
        modelStreamErrorException: A.modelStreamErrorException
      };
      if (A.validationException !== void 0) return {
        validationException: A.validationException
      };
      if (A.throttlingException !== void 0) return {
        throttlingException: A.throttlingException
      };
      if (A.modelTimeoutException !== void 0) return {
        modelTimeoutException: A.modelTimeoutException
      };
      if (A.serviceUnavailableException !== void 0) return {
        serviceUnavailableException: A.serviceUnavailableException
      };
      if (A.$unknown !== void 0) return {
        [A.$unknown[0]]: "UNKNOWN"
      }
    }, "ResponseStreamFilterSensitiveLog"),
    wZ2 = M1((A) => ({
      ...A,
      ...A.body && {
        body: "STREAMING_CONTENT"
      }
    }), "InvokeModelWithResponseStreamResponseFilterSensitiveLog"),
    D5 = IB(),
    Xs6 = LG2(),
    Vs6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/guardrail/{guardrailIdentifier}/version/{guardrailVersion}/apply"), Q.p("guardrailIdentifier", () => A.guardrailIdentifier, "{guardrailIdentifier}", !1), Q.p("guardrailVersion", () => A.guardrailVersion, "{guardrailVersion}", !1);
      let G;
      return G = JSON.stringify(g1.take(A, {
        content: M1((Z) => Br6(Z, B), "content"),
        outputScope: [],
        source: []
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_ApplyGuardrailCommand"),
    Cs6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/model/{modelId}/converse"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
      let G;
      return G = JSON.stringify(g1.take(A, {
        additionalModelRequestFields: M1((Z) => Ve(Z, B), "additionalModelRequestFields"),
        additionalModelResponseFieldPaths: M1((Z) => g1._json(Z), "additionalModelResponseFieldPaths"),
        guardrailConfig: M1((Z) => g1._json(Z), "guardrailConfig"),
        inferenceConfig: M1((Z) => PZ2(Z, B), "inferenceConfig"),
        messages: M1((Z) => SZ2(Z, B), "messages"),
        performanceConfig: M1((Z) => g1._json(Z), "performanceConfig"),
        promptVariables: M1((Z) => g1._json(Z), "promptVariables"),
        requestMetadata: M1((Z) => g1._json(Z), "requestMetadata"),
        system: M1((Z) => _Z2(Z, B), "system"),
        toolConfig: M1((Z) => jZ2(Z, B), "toolConfig")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_ConverseCommand"),
    Ks6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/model/{modelId}/converse-stream"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
      let G;
      return G = JSON.stringify(g1.take(A, {
        additionalModelRequestFields: M1((Z) => Ve(Z, B), "additionalModelRequestFields"),
        additionalModelResponseFieldPaths: M1((Z) => g1._json(Z), "additionalModelResponseFieldPaths"),
        guardrailConfig: M1((Z) => g1._json(Z), "guardrailConfig"),
        inferenceConfig: M1((Z) => PZ2(Z, B), "inferenceConfig"),
        messages: M1((Z) => SZ2(Z, B), "messages"),
        performanceConfig: M1((Z) => g1._json(Z), "performanceConfig"),
        promptVariables: M1((Z) => g1._json(Z), "promptVariables"),
        requestMetadata: M1((Z) => g1._json(Z), "requestMetadata"),
        system: M1((Z) => _Z2(Z, B), "system"),
        toolConfig: M1((Z) => jZ2(Z, B), "toolConfig")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_ConverseStreamCommand"),
    Hs6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = {};
      Q.bp("/async-invoke/{invocationArn}"), Q.p("invocationArn", () => A.invocationArn, "{invocationArn}", !1);
      let G;
      return Q.m("GET").h(I).b(G), Q.build()
    }, "se_GetAsyncInvokeCommand"),
    zs6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = g1.map({}, g1.isSerializableHeaderValue, {
          [Is1]: A[mV1] || "application/octet-stream",
          [aa1]: A[aa1],
          [cZ2]: A[dZ2],
          [uZ2]: A[hZ2],
          [pZ2]: A[mZ2],
          [uV1]: A[dV1]
        });
      Q.bp("/model/{modelId}/invoke"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
      let G;
      if (A.body !== void 0) G = A.body;
      return Q.m("POST").h(I).b(G), Q.build()
    }, "se_InvokeModelCommand"),
    ws6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/model/{modelId}/invoke-with-bidirectional-stream"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
      let G;
      if (A.body !== void 0) G = bs6(A.body, B);
      return Q.m("POST").h(I).b(G), Q.build()
    }, "se_InvokeModelWithBidirectionalStreamCommand"),
    Es6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = g1.map({}, g1.isSerializableHeaderValue, {
          [Is1]: A[mV1] || "application/octet-stream",
          [or6]: A[aa1],
          [cZ2]: A[dZ2],
          [uZ2]: A[hZ2],
          [pZ2]: A[mZ2],
          [uV1]: A[dV1]
        });
      Q.bp("/model/{modelId}/invoke-with-response-stream"), Q.p("modelId", () => A.modelId, "{modelId}", !1);
      let G;
      if (A.body !== void 0) G = A.body;
      return Q.m("POST").h(I).b(G), Q.build()
    }, "se_InvokeModelWithResponseStreamCommand"),
    Us6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = {};
      Q.bp("/async-invoke");
      let G = g1.map({
          [vG2]: [() => A.submitTimeAfter !== void 0, () => g1.serializeDateTime(A[vG2]).toString()],
          [bG2]: [() => A.submitTimeBefore !== void 0, () => g1.serializeDateTime(A[bG2]).toString()],
          [xG2]: [, A[xG2]],
          [jG2]: [() => A.maxResults !== void 0, () => A[jG2].toString()],
          [yG2]: [, A[yG2]],
          [kG2]: [, A[kG2]],
          [fG2]: [, A[fG2]]
        }),
        Z;
      return Q.m("GET").h(I).q(G).b(Z), Q.build()
    }, "se_ListAsyncInvokesCommand"),
    Ns6 = M1(async (A, B) => {
      let Q = mJ.requestBuilder(A, B),
        I = {
          "content-type": "application/json"
        };
      Q.bp("/async-invoke");
      let G;
      return G = JSON.stringify(g1.take(A, {
        clientRequestToken: [!0, (Z) => Z ?? Xs6.v4()],
        modelId: [],
        modelInput: M1((Z) => Wr6(Z, B), "modelInput"),
        outputDataConfig: M1((Z) => g1._json(Z), "outputDataConfig"),
        tags: M1((Z) => g1._json(Z), "tags")
      })), Q.m("POST").h(I).b(G), Q.build()
    }, "se_StartAsyncInvokeCommand"),
    $s6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A)
        }),
        I = g1.expectNonNull(g1.expectObject(await D5.parseJsonBody(A.body, B)), "body"),
        G = g1.take(I, {
          action: g1.expectString,
          actionReason: g1.expectString,
          assessments: M1((Z) => fZ2(Z, B), "assessments"),
          guardrailCoverage: g1._json,
          outputs: g1._json,
          usage: g1._json
        });
      return Object.assign(Q, G), Q
    }, "de_ApplyGuardrailCommand"),
    qs6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A)
        }),
        I = g1.expectNonNull(g1.expectObject(await D5.parseJsonBody(A.body, B)), "body"),
        G = g1.take(I, {
          additionalModelResponseFields: M1((Z) => hV1(Z, B), "additionalModelResponseFields"),
          metrics: g1._json,
          output: M1((Z) => Tr6(D5.awsExpectUnion(Z), B), "output"),
          performanceConfig: g1._json,
          stopReason: g1.expectString,
          trace: M1((Z) => _r6(Z, B), "trace"),
          usage: g1._json
        });
      return Object.assign(Q, G), Q
    }, "de_ConverseCommand"),
    Ms6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A)
        }),
        I = A.body;
      return Q.stream = hs6(I, B), Q
    }, "de_ConverseStreamCommand"),
    Ls6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A)
        }),
        I = g1.expectNonNull(g1.expectObject(await D5.parseJsonBody(A.body, B)), "body"),
        G = g1.take(I, {
          clientRequestToken: g1.expectString,
          endTime: M1((Z) => g1.expectNonNull(g1.parseRfc3339DateTimeWithOffset(Z)), "endTime"),
          failureMessage: g1.expectString,
          invocationArn: g1.expectString,
          lastModifiedTime: M1((Z) => g1.expectNonNull(g1.parseRfc3339DateTimeWithOffset(Z)), "lastModifiedTime"),
          modelArn: g1.expectString,
          outputDataConfig: M1((Z) => g1._json(D5.awsExpectUnion(Z)), "outputDataConfig"),
          status: g1.expectString,
          submitTime: M1((Z) => g1.expectNonNull(g1.parseRfc3339DateTimeWithOffset(Z)), "submitTime")
        });
      return Object.assign(Q, G), Q
    }, "de_GetAsyncInvokeCommand"),
    Rs6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A),
          [mV1]: [, A.headers[Is1]],
          [dV1]: [, A.headers[uV1]]
        }),
        I = await g1.collectBody(A.body, B);
      return Q.body = I, Q
    }, "de_InvokeModelCommand"),
    Os6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A)
        }),
        I = A.body;
      return Q.body = ms6(I, B), Q
    }, "de_InvokeModelWithBidirectionalStreamCommand"),
    Ts6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A),
          [mV1]: [, A.headers[tr6]],
          [dV1]: [, A.headers[uV1]]
        }),
        I = A.body;
      return Q.body = ds6(I, B), Q
    }, "de_InvokeModelWithResponseStreamCommand"),
    Ps6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A)
        }),
        I = g1.expectNonNull(g1.expectObject(await D5.parseJsonBody(A.body, B)), "body"),
        G = g1.take(I, {
          asyncInvokeSummaries: M1((Z) => Nr6(Z, B), "asyncInvokeSummaries"),
          nextToken: g1.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_ListAsyncInvokesCommand"),
    Ss6 = M1(async (A, B) => {
      if (A.statusCode !== 200 && A.statusCode >= 300) return C$(A, B);
      let Q = g1.map({
          $metadata: fQ(A)
        }),
        I = g1.expectNonNull(g1.expectObject(await D5.parseJsonBody(A.body, B)), "body"),
        G = g1.take(I, {
          invocationArn: g1.expectString
        });
      return Object.assign(Q, G), Q
    }, "de_StartAsyncInvokeCommand"),
    C$ = M1(async (A, B) => {
      let Q = {
          ...A,
          body: await D5.parseJsonErrorBody(A.body, B)
        },
        I = D5.loadRestJsonErrorCode(A, Q.body);
      switch (I) {
        case "AccessDeniedException":
        case "com.amazonaws.bedrockruntime#AccessDeniedException":
          throw await js6(Q, B);
        case "InternalServerException":
        case "com.amazonaws.bedrockruntime#InternalServerException":
          throw await EZ2(Q, B);
        case "ResourceNotFoundException":
        case "com.amazonaws.bedrockruntime#ResourceNotFoundException":
          throw await fs6(Q, B);
        case "ServiceQuotaExceededException":
        case "com.amazonaws.bedrockruntime#ServiceQuotaExceededException":
          throw await vs6(Q, B);
        case "ThrottlingException":
        case "com.amazonaws.bedrockruntime#ThrottlingException":
          throw await qZ2(Q, B);
        case "ValidationException":
        case "com.amazonaws.bedrockruntime#ValidationException":
          throw await MZ2(Q, B);
        case "ModelErrorException":
        case "com.amazonaws.bedrockruntime#ModelErrorException":
          throw await ks6(Q, B);
        case "ModelNotReadyException":
        case "com.amazonaws.bedrockruntime#ModelNotReadyException":
          throw await xs6(Q, B);
        case "ModelTimeoutException":
        case "com.amazonaws.bedrockruntime#ModelTimeoutException":
          throw await NZ2(Q, B);
        case "ServiceUnavailableException":
        case "com.amazonaws.bedrockruntime#ServiceUnavailableException":
          throw await $Z2(Q, B);
        case "ModelStreamErrorException":
        case "com.amazonaws.bedrockruntime#ModelStreamErrorException":
          throw await UZ2(Q, B);
        case "ConflictException":
        case "com.amazonaws.bedrockruntime#ConflictException":
          throw await ys6(Q, B);
        default:
          let G = Q.body;
          return _s6({
            output: A,
            parsedBody: G,
            errorCode: I
          })
      }
    }, "de_CommandError"),
    _s6 = g1.withBaseException(GW),
    js6 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new mG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_AccessDeniedExceptionRes"),
    ys6 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new cG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ConflictExceptionRes"),
    EZ2 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new dG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_InternalServerExceptionRes"),
    ks6 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString,
          originalStatusCode: g1.expectInt32,
          resourceName: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new aG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ModelErrorExceptionRes"),
    xs6 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new sG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ModelNotReadyExceptionRes"),
    UZ2 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString,
          originalMessage: g1.expectString,
          originalStatusCode: g1.expectInt32
        });
      Object.assign(Q, G);
      let Z = new oG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ModelStreamErrorExceptionRes"),
    NZ2 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new rG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ModelTimeoutExceptionRes"),
    fs6 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new lG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ResourceNotFoundExceptionRes"),
    vs6 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new iG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ServiceQuotaExceededExceptionRes"),
    $Z2 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new nG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ServiceUnavailableExceptionRes"),
    qZ2 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new uG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ThrottlingExceptionRes"),
    MZ2 = M1(async (A, B) => {
      let Q = g1.map({}),
        I = A.body,
        G = g1.take(I, {
          message: g1.expectString
        });
      Object.assign(Q, G);
      let Z = new pG2({
        $metadata: fQ(A),
        ...Q
      });
      return g1.decorateServiceException(Z, A.body)
    }, "de_ValidationExceptionRes"),
    bs6 = M1((A, B) => {
      let Q = M1((I) => vV1.visit(I, {
        chunk: M1((G) => gs6(G, B), "chunk"),
        _: M1((G) => G, "_")
      }), "eventMarshallingVisitor");
      return B.eventStreamMarshaller.serialize(A, Q)
    }, "se_InvokeModelWithBidirectionalStreamInput"),
    gs6 = M1((A, B) => {
      let Q = {
          ":event-type": {
            type: "string",
            value: "chunk"
          },
          ":message-type": {
            type: "string",
            value: "event"
          },
          ":content-type": {
            type: "string",
            value: "application/json"
          }
        },
        I = new Uint8Array;
      return I = rs6(A, B), I = B.utf8Decoder(JSON.stringify(I)), {
        headers: Q,
        body: I
      }
    }, "se_BidirectionalInputPayloadPart_event"),
    hs6 = M1((A, B) => {
      return B.eventStreamMarshaller.deserialize(A, async (Q) => {
        if (Q.messageStart != null) return {
          messageStart: await ns6(Q.messageStart, B)
        };
        if (Q.contentBlockStart != null) return {
          contentBlockStart: await cs6(Q.contentBlockStart, B)
        };
        if (Q.contentBlockDelta != null) return {
          contentBlockDelta: await ps6(Q.contentBlockDelta, B)
        };
        if (Q.contentBlockStop != null) return {
          contentBlockStop: await ls6(Q.contentBlockStop, B)
        };
        if (Q.messageStop != null) return {
          messageStop: await as6(Q.messageStop, B)
        };
        if (Q.metadata != null) return {
          metadata: await is6(Q.metadata, B)
        };
        if (Q.internalServerException != null) return {
          internalServerException: await ta1(Q.internalServerException, B)
        };
        if (Q.modelStreamErrorException != null) return {
          modelStreamErrorException: await ea1(Q.modelStreamErrorException, B)
        };
        if (Q.validationException != null) return {
          validationException: await Qs1(Q.validationException, B)
        };
        if (Q.throttlingException != null) return {
          throttlingException: await Bs1(Q.throttlingException, B)
        };
        if (Q.serviceUnavailableException != null) return {
          serviceUnavailableException: await As1(Q.serviceUnavailableException, B)
        };
        return {
          $unknown: A
        }
      })
    }, "de_ConverseStreamOutput"),
    ms6 = M1((A, B) => {
      return B.eventStreamMarshaller.deserialize(A, async (Q) => {
        if (Q.chunk != null) return {
          chunk: await us6(Q.chunk, B)
        };
        if (Q.internalServerException != null) return {
          internalServerException: await ta1(Q.internalServerException, B)
        };
        if (Q.modelStreamErrorException != null) return {
          modelStreamErrorException: await ea1(Q.modelStreamErrorException, B)
        };
        if (Q.validationException != null) return {
          validationException: await Qs1(Q.validationException, B)
        };
        if (Q.throttlingException != null) return {
          throttlingException: await Bs1(Q.throttlingException, B)
        };
        if (Q.modelTimeoutException != null) return {
          modelTimeoutException: await LZ2(Q.modelTimeoutException, B)
        };
        if (Q.serviceUnavailableException != null) return {
          serviceUnavailableException: await As1(Q.serviceUnavailableException, B)
        };
        return {
          $unknown: A
        }
      })
    }, "de_InvokeModelWithBidirectionalStreamOutput"),
    ds6 = M1((A, B) => {
      return B.eventStreamMarshaller.deserialize(A, async (Q) => {
        if (Q.chunk != null) return {
          chunk: await ss6(Q.chunk, B)
        };
        if (Q.internalServerException != null) return {
          internalServerException: await ta1(Q.internalServerException, B)
        };
        if (Q.modelStreamErrorException != null) return {
          modelStreamErrorException: await ea1(Q.modelStreamErrorException, B)
        };
        if (Q.validationException != null) return {
          validationException: await Qs1(Q.validationException, B)
        };
        if (Q.throttlingException != null) return {
          throttlingException: await Bs1(Q.throttlingException, B)
        };
        if (Q.modelTimeoutException != null) return {
          modelTimeoutException: await LZ2(Q.modelTimeoutException, B)
        };
        if (Q.serviceUnavailableException != null) return {
          serviceUnavailableException: await As1(Q.serviceUnavailableException, B)
        };
        return {
          $unknown: A
        }
      })
    }, "de_ResponseStream"),
    us6 = M1(async (A, B) => {
      let Q = {},
        I = await D5.parseJsonBody(A.body, B);
      return Object.assign(Q, qr6(I, B)), Q
    }, "de_BidirectionalOutputPayloadPart_event"),
    ps6 = M1(async (A, B) => {
      let Q = {},
        I = await D5.parseJsonBody(A.body, B);
      return Object.assign(Q, Rr6(I, B)), Q
    }, "de_ContentBlockDeltaEvent_event"),
    cs6 = M1(async (A, B) => {
      let Q = {},
        I = await D5.parseJsonBody(A.body, B);
      return Object.assign(Q, g1._json(I)), Q
    }, "de_ContentBlockStartEvent_event"),
    ls6 = M1(async (A, B) => {
      let Q = {},
        I = await D5.parseJsonBody(A.body, B);
      return Object.assign(Q, g1._json(I)), Q
    }, "de_ContentBlockStopEvent_event"),
    is6 = M1(async (A, B) => {
      let Q = {},
        I = await D5.parseJsonBody(A.body, B);
      return Object.assign(Q, Pr6(I, B)), Q
    }, "de_ConverseStreamMetadataEvent_event"),
    ta1 = M1(async (A, B) => {
      let Q = {
        ...A,
        body: await D5.parseJsonBody(A.body, B)
      };
      return EZ2(Q, B)
    }, "de_InternalServerException_event"),
    ns6 = M1(async (A, B) => {
      let Q = {},
        I = await D5.parseJsonBody(A.body, B);
      return Object.assign(Q, g1._json(I)), Q
    }, "de_MessageStartEvent_event"),
    as6 = M1(async (A, B) => {
      let Q = {},
        I = await D5.parseJsonBody(A.body, B);
      return Object.assign(Q, ur6(I, B)), Q
    }, "de_MessageStopEvent_event"),
    ea1 = M1(async (A, B) => {
      let Q = {
        ...A,
        body: await D5.parseJsonBody(A.body, B)
      };
      return UZ2(Q, B)
    }, "de_ModelStreamErrorException_event"),
    LZ2 = M1(async (A, B) => {
      let Q = {
        ...A,
        body: await D5.parseJsonBody(A.body, B)
      };
      return NZ2(Q, B)
    }, "de_ModelTimeoutException_event"),
    ss6 = M1(async (A, B) => {
      let Q = {},
        I = await D5.parseJsonBody(A.body, B);
      return Object.assign(Q, pr6(I, B)), Q
    }, "de_PayloadPart_event"),
    As1 = M1(async (A, B) => {
      let Q = {
        ...A,
        body: await D5.parseJsonBody(A.body, B)
      };
      return $Z2(Q, B)
    }, "de_ServiceUnavailableException_event"),
    Bs1 = M1(async (A, B) => {
      let Q = {
        ...A,
        body: await D5.parseJsonBody(A.body, B)
      };
      return qZ2(Q, B)
    }, "de_ThrottlingException_event"),
    Qs1 = M1(async (A, B) => {
      let Q = {
        ...A,
        body: await D5.parseJsonBody(A.body, B)
      };
      return MZ2(Q, B)
    }, "de_ValidationException_event"),
    rs6 = M1((A, B) => {
      return g1.take(A, {
        bytes: B.base64Encoder
      })
    }, "se_BidirectionalInputPayloadPart"),
    os6 = M1((A, B) => {
      return yV1.visit(A, {
        cachePoint: M1((Q) => ({
          cachePoint: g1._json(Q)
        }), "cachePoint"),
        document: M1((Q) => ({
          document: RZ2(Q, B)
        }), "document"),
        guardContent: M1((Q) => ({
          guardContent: OZ2(Q, B)
        }), "guardContent"),
        image: M1((Q) => ({
          image: TZ2(Q, B)
        }), "image"),
        reasoningContent: M1((Q) => ({
          reasoningContent: Jr6(Q, B)
        }), "reasoningContent"),
        text: M1((Q) => ({
          text: Q
        }), "text"),
        toolResult: M1((Q) => ({
          toolResult: Cr6(Q, B)
        }), "toolResult"),
        toolUse: M1((Q) => ({
          toolUse: Er6(Q, B)
        }), "toolUse"),
        video: M1((Q) => ({
          video: yZ2(Q, B)
        }), "video"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_ContentBlock"),
    ts6 = M1((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return os6(Q, B)
      })
    }, "se_ContentBlocks"),
    RZ2 = M1((A, B) => {
      return g1.take(A, {
        format: [],
        name: [],
        source: M1((Q) => es6(Q, B), "source")
      })
    }, "se_DocumentBlock"),
    es6 = M1((A, B) => {
      return RV1.visit(A, {
        bytes: M1((Q) => ({
          bytes: B.base64Encoder(Q)
        }), "bytes"),
        s3Location: M1((Q) => ({
          s3Location: g1._json(Q)
        }), "s3Location"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_DocumentSource"),
    Ar6 = M1((A, B) => {
      return LV1.visit(A, {
        image: M1((Q) => ({
          image: Gr6(Q, B)
        }), "image"),
        text: M1((Q) => ({
          text: g1._json(Q)
        }), "text"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_GuardrailContentBlock"),
    Br6 = M1((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Ar6(Q, B)
      })
    }, "se_GuardrailContentBlockList"),
    OZ2 = M1((A, B) => {
      return TV1.visit(A, {
        image: M1((Q) => ({
          image: Qr6(Q, B)
        }), "image"),
        text: M1((Q) => ({
          text: g1._json(Q)
        }), "text"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_GuardrailConverseContentBlock"),
    Qr6 = M1((A, B) => {
      return g1.take(A, {
        format: [],
        source: M1((Q) => Ir6(Q, B), "source")
      })
    }, "se_GuardrailConverseImageBlock"),
    Ir6 = M1((A, B) => {
      return OV1.visit(A, {
        bytes: M1((Q) => ({
          bytes: B.base64Encoder(Q)
        }), "bytes"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_GuardrailConverseImageSource"),
    Gr6 = M1((A, B) => {
      return g1.take(A, {
        format: [],
        source: M1((Q) => Zr6(Q, B), "source")
      })
    }, "se_GuardrailImageBlock"),
    Zr6 = M1((A, B) => {
      return MV1.visit(A, {
        bytes: M1((Q) => ({
          bytes: B.base64Encoder(Q)
        }), "bytes"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_GuardrailImageSource"),
    TZ2 = M1((A, B) => {
      return g1.take(A, {
        format: [],
        source: M1((Q) => Dr6(Q, B), "source")
      })
    }, "se_ImageBlock"),
    Dr6 = M1((A, B) => {
      return PV1.visit(A, {
        bytes: M1((Q) => ({
          bytes: B.base64Encoder(Q)
        }), "bytes"),
        s3Location: M1((Q) => ({
          s3Location: g1._json(Q)
        }), "s3Location"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_ImageSource"),
    PZ2 = M1((A, B) => {
      return g1.take(A, {
        maxTokens: [],
        stopSequences: g1._json,
        temperature: g1.serializeFloat,
        topP: g1.serializeFloat
      })
    }, "se_InferenceConfiguration"),
    Yr6 = M1((A, B) => {
      return g1.take(A, {
        content: M1((Q) => ts6(Q, B), "content"),
        role: []
      })
    }, "se_Message"),
    SZ2 = M1((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Yr6(Q, B)
      })
    }, "se_Messages"),
    Wr6 = M1((A, B) => {
      return A
    }, "se_ModelInputPayload"),
    Jr6 = M1((A, B) => {
      return SV1.visit(A, {
        reasoningText: M1((Q) => ({
          reasoningText: g1._json(Q)
        }), "reasoningText"),
        redactedContent: M1((Q) => ({
          redactedContent: B.base64Encoder(Q)
        }), "redactedContent"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_ReasoningContentBlock"),
    Fr6 = M1((A, B) => {
      return kV1.visit(A, {
        cachePoint: M1((Q) => ({
          cachePoint: g1._json(Q)
        }), "cachePoint"),
        guardContent: M1((Q) => ({
          guardContent: OZ2(Q, B)
        }), "guardContent"),
        text: M1((Q) => ({
          text: Q
        }), "text"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_SystemContentBlock"),
    _Z2 = M1((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Fr6(Q, B)
      })
    }, "se_SystemContentBlocks"),
    Xr6 = M1((A, B) => {
      return fV1.visit(A, {
        cachePoint: M1((Q) => ({
          cachePoint: g1._json(Q)
        }), "cachePoint"),
        toolSpec: M1((Q) => ({
          toolSpec: wr6(Q, B)
        }), "toolSpec"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_Tool"),
    jZ2 = M1((A, B) => {
      return g1.take(A, {
        toolChoice: g1._json,
        tools: M1((Q) => zr6(Q, B), "tools")
      })
    }, "se_ToolConfiguration"),
    Vr6 = M1((A, B) => {
      return xV1.visit(A, {
        json: M1((Q) => ({
          json: Ve(Q, B)
        }), "json"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_ToolInputSchema"),
    Cr6 = M1((A, B) => {
      return g1.take(A, {
        content: M1((Q) => Hr6(Q, B), "content"),
        status: [],
        toolUseId: []
      })
    }, "se_ToolResultBlock"),
    Kr6 = M1((A, B) => {
      return jV1.visit(A, {
        document: M1((Q) => ({
          document: RZ2(Q, B)
        }), "document"),
        image: M1((Q) => ({
          image: TZ2(Q, B)
        }), "image"),
        json: M1((Q) => ({
          json: Ve(Q, B)
        }), "json"),
        text: M1((Q) => ({
          text: Q
        }), "text"),
        video: M1((Q) => ({
          video: yZ2(Q, B)
        }), "video"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_ToolResultContentBlock"),
    Hr6 = M1((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Kr6(Q, B)
      })
    }, "se_ToolResultContentBlocks"),
    zr6 = M1((A, B) => {
      return A.filter((Q) => Q != null).map((Q) => {
        return Xr6(Q, B)
      })
    }, "se_Tools"),
    wr6 = M1((A, B) => {
      return g1.take(A, {
        description: [],
        inputSchema: M1((Q) => Vr6(Q, B), "inputSchema"),
        name: []
      })
    }, "se_ToolSpecification"),
    Er6 = M1((A, B) => {
      return g1.take(A, {
        input: M1((Q) => Ve(Q, B), "input"),
        name: [],
        toolUseId: []
      })
    }, "se_ToolUseBlock"),
    yZ2 = M1((A, B) => {
      return g1.take(A, {
        format: [],
        source: M1((Q) => Ur6(Q, B), "source")
      })
    }, "se_VideoBlock"),
    Ur6 = M1((A, B) => {
      return _V1.visit(A, {
        bytes: M1((Q) => ({
          bytes: B.base64Encoder(Q)
        }), "bytes"),
        s3Location: M1((Q) => ({
          s3Location: g1._json(Q)
        }), "s3Location"),
        _: M1((Q, I) => ({
          [Q]: I
        }), "_")
      })
    }, "se_VideoSource"),
    Ve = M1((A, B) => {
      return A
    }, "se_Document"),
    Nr6 = M1((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return $r6(I, B)
      })
    }, "de_AsyncInvokeSummaries"),
    $r6 = M1((A, B) => {
      return g1.take(A, {
        clientRequestToken: g1.expectString,
        endTime: M1((Q) => g1.expectNonNull(g1.parseRfc3339DateTimeWithOffset(Q)), "endTime"),
        failureMessage: g1.expectString,
        invocationArn: g1.expectString,
        lastModifiedTime: M1((Q) => g1.expectNonNull(g1.parseRfc3339DateTimeWithOffset(Q)), "lastModifiedTime"),
        modelArn: g1.expectString,
        outputDataConfig: M1((Q) => g1._json(D5.awsExpectUnion(Q)), "outputDataConfig"),
        status: g1.expectString,
        submitTime: M1((Q) => g1.expectNonNull(g1.parseRfc3339DateTimeWithOffset(Q)), "submitTime")
      })
    }, "de_AsyncInvokeSummary"),
    qr6 = M1((A, B) => {
      return g1.take(A, {
        bytes: B.base64Decoder
      })
    }, "de_BidirectionalOutputPayloadPart"),
    Mr6 = M1((A, B) => {
      if (A.cachePoint != null) return {
        cachePoint: g1._json(A.cachePoint)
      };
      if (A.document != null) return {
        document: kZ2(A.document, B)
      };
      if (A.guardContent != null) return {
        guardContent: br6(D5.awsExpectUnion(A.guardContent), B)
      };
      if (A.image != null) return {
        image: bZ2(A.image, B)
      };
      if (A.reasoningContent != null) return {
        reasoningContent: cr6(D5.awsExpectUnion(A.reasoningContent), B)
      };
      if (g1.expectString(A.text) !== void 0) return {
        text: g1.expectString(A.text)
      };
      if (A.toolResult != null) return {
        toolResult: ir6(A.toolResult, B)
      };
      if (A.toolUse != null) return {
        toolUse: sr6(A.toolUse, B)
      };
      if (A.video != null) return {
        video: gZ2(A.video, B)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_ContentBlock"),
    Lr6 = M1((A, B) => {
      if (A.reasoningContent != null) return {
        reasoningContent: lr6(D5.awsExpectUnion(A.reasoningContent), B)
      };
      if (g1.expectString(A.text) !== void 0) return {
        text: g1.expectString(A.text)
      };
      if (A.toolUse != null) return {
        toolUse: g1._json(A.toolUse)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_ContentBlockDelta"),
    Rr6 = M1((A, B) => {
      return g1.take(A, {
        contentBlockIndex: g1.expectInt32,
        delta: M1((Q) => Lr6(D5.awsExpectUnion(Q), B), "delta")
      })
    }, "de_ContentBlockDeltaEvent"),
    Or6 = M1((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return Mr6(D5.awsExpectUnion(I), B)
      })
    }, "de_ContentBlocks"),
    Tr6 = M1((A, B) => {
      if (A.message != null) return {
        message: dr6(A.message, B)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_ConverseOutput"),
    Pr6 = M1((A, B) => {
      return g1.take(A, {
        metrics: g1._json,
        performanceConfig: g1._json,
        trace: M1((Q) => Sr6(Q, B), "trace"),
        usage: g1._json
      })
    }, "de_ConverseStreamMetadataEvent"),
    Sr6 = M1((A, B) => {
      return g1.take(A, {
        guardrail: M1((Q) => vZ2(Q, B), "guardrail"),
        promptRouter: g1._json
      })
    }, "de_ConverseStreamTrace"),
    _r6 = M1((A, B) => {
      return g1.take(A, {
        guardrail: M1((Q) => vZ2(Q, B), "guardrail"),
        promptRouter: g1._json
      })
    }, "de_ConverseTrace"),
    kZ2 = M1((A, B) => {
      return g1.take(A, {
        format: g1.expectString,
        name: g1.expectString,
        source: M1((Q) => jr6(D5.awsExpectUnion(Q), B), "source")
      })
    }, "de_DocumentBlock"),
    jr6 = M1((A, B) => {
      if (A.bytes != null) return {
        bytes: B.base64Decoder(A.bytes)
      };
      if (A.s3Location != null) return {
        s3Location: g1._json(A.s3Location)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_DocumentSource"),
    xZ2 = M1((A, B) => {
      return g1.take(A, {
        contentPolicy: g1._json,
        contextualGroundingPolicy: M1((Q) => vr6(Q, B), "contextualGroundingPolicy"),
        invocationMetrics: g1._json,
        sensitiveInformationPolicy: g1._json,
        topicPolicy: g1._json,
        wordPolicy: g1._json
      })
    }, "de_GuardrailAssessment"),
    fZ2 = M1((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return xZ2(I, B)
      })
    }, "de_GuardrailAssessmentList"),
    yr6 = M1((A, B) => {
      return Object.entries(A).reduce((Q, [I, G]) => {
        if (G === null) return Q;
        return Q[I] = fZ2(G, B), Q
      }, {})
    }, "de_GuardrailAssessmentListMap"),
    kr6 = M1((A, B) => {
      return Object.entries(A).reduce((Q, [I, G]) => {
        if (G === null) return Q;
        return Q[I] = xZ2(G, B), Q
      }, {})
    }, "de_GuardrailAssessmentMap"),
    xr6 = M1((A, B) => {
      return g1.take(A, {
        action: g1.expectString,
        detected: g1.expectBoolean,
        score: g1.limitedParseDouble,
        threshold: g1.limitedParseDouble,
        type: g1.expectString
      })
    }, "de_GuardrailContextualGroundingFilter"),
    fr6 = M1((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return xr6(I, B)
      })
    }, "de_GuardrailContextualGroundingFilters"),
    vr6 = M1((A, B) => {
      return g1.take(A, {
        filters: M1((Q) => fr6(Q, B), "filters")
      })
    }, "de_GuardrailContextualGroundingPolicyAssessment"),
    br6 = M1((A, B) => {
      if (A.image != null) return {
        image: gr6(A.image, B)
      };
      if (A.text != null) return {
        text: g1._json(A.text)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_GuardrailConverseContentBlock"),
    gr6 = M1((A, B) => {
      return g1.take(A, {
        format: g1.expectString,
        source: M1((Q) => hr6(D5.awsExpectUnion(Q), B), "source")
      })
    }, "de_GuardrailConverseImageBlock"),
    hr6 = M1((A, B) => {
      if (A.bytes != null) return {
        bytes: B.base64Decoder(A.bytes)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_GuardrailConverseImageSource"),
    vZ2 = M1((A, B) => {
      return g1.take(A, {
        actionReason: g1.expectString,
        inputAssessment: M1((Q) => kr6(Q, B), "inputAssessment"),
        modelOutput: g1._json,
        outputAssessments: M1((Q) => yr6(Q, B), "outputAssessments")
      })
    }, "de_GuardrailTraceAssessment"),
    bZ2 = M1((A, B) => {
      return g1.take(A, {
        format: g1.expectString,
        source: M1((Q) => mr6(D5.awsExpectUnion(Q), B), "source")
      })
    }, "de_ImageBlock"),
    mr6 = M1((A, B) => {
      if (A.bytes != null) return {
        bytes: B.base64Decoder(A.bytes)
      };
      if (A.s3Location != null) return {
        s3Location: g1._json(A.s3Location)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_ImageSource"),
    dr6 = M1((A, B) => {
      return g1.take(A, {
        content: M1((Q) => Or6(Q, B), "content"),
        role: g1.expectString
      })
    }, "de_Message"),
    ur6 = M1((A, B) => {
      return g1.take(A, {
        additionalModelResponseFields: M1((Q) => hV1(Q, B), "additionalModelResponseFields"),
        stopReason: g1.expectString
      })
    }, "de_MessageStopEvent"),
    pr6 = M1((A, B) => {
      return g1.take(A, {
        bytes: B.base64Decoder
      })
    }, "de_PayloadPart"),
    cr6 = M1((A, B) => {
      if (A.reasoningText != null) return {
        reasoningText: g1._json(A.reasoningText)
      };
      if (A.redactedContent != null) return {
        redactedContent: B.base64Decoder(A.redactedContent)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_ReasoningContentBlock"),
    lr6 = M1((A, B) => {
      if (A.redactedContent != null) return {
        redactedContent: B.base64Decoder(A.redactedContent)
      };
      if (g1.expectString(A.signature) !== void 0) return {
        signature: g1.expectString(A.signature)
      };
      if (g1.expectString(A.text) !== void 0) return {
        text: g1.expectString(A.text)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_ReasoningContentBlockDelta"),
    ir6 = M1((A, B) => {
      return g1.take(A, {
        content: M1((Q) => ar6(Q, B), "content"),
        status: g1.expectString,
        toolUseId: g1.expectString
      })
    }, "de_ToolResultBlock"),
    nr6 = M1((A, B) => {
      if (A.document != null) return {
        document: kZ2(A.document, B)
      };
      if (A.image != null) return {
        image: bZ2(A.image, B)
      };
      if (A.json != null) return {
        json: hV1(A.json, B)
      };
      if (g1.expectString(A.text) !== void 0) return {
        text: g1.expectString(A.text)
      };
      if (A.video != null) return {
        video: gZ2(A.video, B)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_ToolResultContentBlock"),
    ar6 = M1((A, B) => {
      return (A || []).filter((I) => I != null).map((I) => {
        return nr6(D5.awsExpectUnion(I), B)
      })
    }, "de_ToolResultContentBlocks"),
    sr6 = M1((A, B) => {
      return g1.take(A, {
        input: M1((Q) => hV1(Q, B), "input"),
        name: g1.expectString,
        toolUseId: g1.expectString
      })
    }, "de_ToolUseBlock"),
    gZ2 = M1((A, B) => {
      return g1.take(A, {
        format: g1.expectString,
        source: M1((Q) => rr6(D5.awsExpectUnion(Q), B), "source")
      })
    }, "de_VideoBlock"),
    rr6 = M1((A, B) => {
      if (A.bytes != null) return {
        bytes: B.base64Decoder(A.bytes)
      };
      if (A.s3Location != null) return {
        s3Location: g1._json(A.s3Location)
      };
      return {
        $unknown: Object.entries(A)[0]
      }
    }, "de_VideoSource"),
    hV1 = M1((A, B) => {
      return A
    }, "de_Document"),
    fQ = M1((A) => ({
      httpStatusCode: A.statusCode,
      requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
      extendedRequestId: A.headers["x-amz-id-2"],
      cfId: A.headers["x-amz-cf-id"]
    }), "deserializeMetadata"),
    aa1 = "accept",
    mV1 = "contentType",
    Is1 = "content-type",
    hZ2 = "guardrailIdentifier",
    mZ2 = "guardrailVersion",
    jG2 = "maxResults",
    yG2 = "nextToken",
    dV1 = "performanceConfigLatency",
    kG2 = "sortBy",
    xG2 = "statusEquals",
    fG2 = "sortOrder",
    vG2 = "submitTimeAfter",
    bG2 = "submitTimeBefore",
    dZ2 = "trace",
    or6 = "x-amzn-bedrock-accept",
    tr6 = "x-amzn-bedrock-content-type",
    uZ2 = "x-amzn-bedrock-guardrailidentifier",
    pZ2 = "x-amzn-bedrock-guardrailversion",
    uV1 = "x-amzn-bedrock-performanceconfig-latency",
    cZ2 = "x-amzn-bedrock-trace",
    lZ2 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockFrontendService", "ApplyGuardrail", {}).n("BedrockRuntimeClient", "ApplyGuardrailCommand").f(IZ2, void 0).ser(Vs6).de($s6).build() {
      static {
        M1(this, "ApplyGuardrailCommand")
      }
    },
    iZ2 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockFrontendService", "Converse", {}).n("BedrockRuntimeClient", "ConverseCommand").f(ZZ2, YZ2).ser(Cs6).de(qs6).build() {
      static {
        M1(this, "ConverseCommand")
      }
    },
    nZ2 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockFrontendService", "ConverseStream", {
      eventStream: {
        output: !0
      }
    }).n("BedrockRuntimeClient", "ConverseStreamCommand").f(WZ2, XZ2).ser(Ks6).de(Ms6).build() {
      static {
        M1(this, "ConverseStreamCommand")
      }
    },
    aZ2 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockFrontendService", "GetAsyncInvoke", {}).n("BedrockRuntimeClient", "GetAsyncInvokeCommand").f(void 0, tG2).ser(Hs6).de(Ls6).build() {
      static {
        M1(this, "GetAsyncInvokeCommand")
      }
    },
    sZ2 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockFrontendService", "InvokeModel", {}).n("BedrockRuntimeClient", "InvokeModelCommand").f(VZ2, CZ2).ser(zs6).de(Rs6).build() {
      static {
        M1(this, "InvokeModelCommand")
      }
    },
    rZ2 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions()), hG2.getEventStreamPlugin(Q)]
    }).s("AmazonBedrockFrontendService", "InvokeModelWithBidirectionalStream", {
      eventStream: {
        input: !0,
        output: !0
      }
    }).n("BedrockRuntimeClient", "InvokeModelWithBidirectionalStreamCommand").f(KZ2, HZ2).ser(ws6).de(Os6).build() {
      static {
        M1(this, "InvokeModelWithBidirectionalStreamCommand")
      }
    },
    oZ2 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockFrontendService", "InvokeModelWithResponseStream", {
      eventStream: {
        output: !0
      }
    }).n("BedrockRuntimeClient", "InvokeModelWithResponseStreamCommand").f(zZ2, wZ2).ser(Es6).de(Ts6).build() {
      static {
        M1(this, "InvokeModelWithResponseStreamCommand")
      }
    },
    Gs1 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockFrontendService", "ListAsyncInvokes", {}).n("BedrockRuntimeClient", "ListAsyncInvokesCommand").f(void 0, AZ2).ser(Us6).de(Ps6).build() {
      static {
        M1(this, "ListAsyncInvokesCommand")
      }
    },
    tZ2 = class extends g1.Command.classBuilder().ep(X$).m(function(A, B, Q, I) {
      return [V$.getSerdePlugin(Q, this.serialize, this.deserialize), nw.getEndpointPlugin(Q, A.getEndpointParameterInstructions())]
    }).s("AmazonBedrockFrontendService", "StartAsyncInvoke", {}).n("BedrockRuntimeClient", "StartAsyncInvokeCommand").f(BZ2, void 0).ser(Ns6).de(Ss6).build() {
      static {
        M1(this, "StartAsyncInvokeCommand")
      }
    },
    er6 = {
      ApplyGuardrailCommand: lZ2,
      ConverseCommand: iZ2,
      ConverseStreamCommand: nZ2,
      GetAsyncInvokeCommand: aZ2,
      InvokeModelCommand: sZ2,
      InvokeModelWithBidirectionalStreamCommand: rZ2,
      InvokeModelWithResponseStreamCommand: oZ2,
      ListAsyncInvokesCommand: Gs1,
      StartAsyncInvokeCommand: tZ2
    },
    eZ2 = class extends sa1 {
      static {
        M1(this, "BedrockRuntime")
      }
    };
  g1.createAggregatedClient(er6, eZ2);
  var Ao6 = mJ.createPaginator(sa1, Gs1, "nextToken", "nextToken", "maxResults")
})
// @from(Start 6318034, End 6319992)
Js1 = z((yd8, ED2) => {
  var aV1 = Object.prototype.hasOwnProperty,
    wD2 = Object.prototype.toString,
    XD2 = Object.defineProperty,
    VD2 = Object.getOwnPropertyDescriptor,
    CD2 = function A(B) {
      if (typeof Array.isArray === "function") return Array.isArray(B);
      return wD2.call(B) === "[object Array]"
    },
    KD2 = function A(B) {
      if (!B || wD2.call(B) !== "[object Object]") return !1;
      var Q = aV1.call(B, "constructor"),
        I = B.constructor && B.constructor.prototype && aV1.call(B.constructor.prototype, "isPrototypeOf");
      if (B.constructor && !Q && !I) return !1;
      var G;
      for (G in B);
      return typeof G === "undefined" || aV1.call(B, G)
    },
    HD2 = function A(B, Q) {
      if (XD2 && Q.name === "__proto__") XD2(B, Q.name, {
        enumerable: !0,
        configurable: !0,
        value: Q.newValue,
        writable: !0
      });
      else B[Q.name] = Q.newValue
    },
    zD2 = function A(B, Q) {
      if (Q === "__proto__") {
        if (!aV1.call(B, Q)) return;
        else if (VD2) return VD2(B, Q).value
      }
      return B[Q]
    };
  ED2.exports = function A() {
    var B, Q, I, G, Z, D, Y = arguments[0],
      W = 1,
      J = arguments.length,
      F = !1;
    if (typeof Y === "boolean") F = Y, Y = arguments[1] || {}, W = 2;
    if (Y == null || typeof Y !== "object" && typeof Y !== "function") Y = {};
    for (; W < J; ++W)
      if (B = arguments[W], B != null) {
        for (Q in B)
          if (I = zD2(Y, Q), G = zD2(B, Q), Y !== G) {
            if (F && G && (KD2(G) || (Z = CD2(G)))) {
              if (Z) Z = !1, D = I && CD2(I) ? I : [];
              else D = I && KD2(I) ? I : {};
              HD2(Y, {
                name: Q,
                newValue: A(F, D, G)
              })
            } else if (typeof G !== "undefined") HD2(Y, {
              name: Q,
              newValue: G
            })
          }
      } return Y
  }
})
// @from(Start 6319998, End 6323461)
$D2 = z((kd8, ND2) => {
  var a3 = {};
  ND2.exports = a3;

  function UD2(A) {
    return A < 0 ? -1 : 1
  }

  function No6(A) {
    if (A % 1 === 0.5 && (A & 1) === 0) return Math.floor(A);
    else return Math.round(A)
  }

  function WO(A, B) {
    if (!B.unsigned) --A;
    let Q = B.unsigned ? 0 : -Math.pow(2, A),
      I = Math.pow(2, A) - 1,
      G = B.moduloBitLength ? Math.pow(2, B.moduloBitLength) : Math.pow(2, A),
      Z = B.moduloBitLength ? Math.pow(2, B.moduloBitLength - 1) : Math.pow(2, A - 1);
    return function(D, Y) {
      if (!Y) Y = {};
      let W = +D;
      if (Y.enforceRange) {
        if (!Number.isFinite(W)) throw new TypeError("Argument is not a finite number");
        if (W = UD2(W) * Math.floor(Math.abs(W)), W < Q || W > I) throw new TypeError("Argument is not in byte range");
        return W
      }
      if (!isNaN(W) && Y.clamp) {
        if (W = No6(W), W < Q) W = Q;
        if (W > I) W = I;
        return W
      }
      if (!Number.isFinite(W) || W === 0) return 0;
      if (W = UD2(W) * Math.floor(Math.abs(W)), W = W % G, !B.unsigned && W >= Z) return W - G;
      else if (B.unsigned) {
        if (W < 0) W += G;
        else if (W === -0) return 0
      }
      return W
    }
  }
  a3.void = function() {
    return
  };
  a3.boolean = function(A) {
    return !!A
  };
  a3.byte = WO(8, {
    unsigned: !1
  });
  a3.octet = WO(8, {
    unsigned: !0
  });
  a3.short = WO(16, {
    unsigned: !1
  });
  a3["unsigned short"] = WO(16, {
    unsigned: !0
  });
  a3.long = WO(32, {
    unsigned: !1
  });
  a3["unsigned long"] = WO(32, {
    unsigned: !0
  });
  a3["long long"] = WO(32, {
    unsigned: !1,
    moduloBitLength: 64
  });
  a3["unsigned long long"] = WO(32, {
    unsigned: !0,
    moduloBitLength: 64
  });
  a3.double = function(A) {
    let B = +A;
    if (!Number.isFinite(B)) throw new TypeError("Argument is not a finite floating-point value");
    return B
  };
  a3["unrestricted double"] = function(A) {
    let B = +A;
    if (isNaN(B)) throw new TypeError("Argument is NaN");
    return B
  };
  a3.float = a3.double;
  a3["unrestricted float"] = a3["unrestricted double"];
  a3.DOMString = function(A, B) {
    if (!B) B = {};
    if (B.treatNullAsEmptyString && A === null) return "";
    return String(A)
  };
  a3.ByteString = function(A, B) {
    let Q = String(A),
      I = void 0;
    for (let G = 0;
      (I = Q.codePointAt(G)) !== void 0; ++G)
      if (I > 255) throw new TypeError("Argument is not a valid bytestring");
    return Q
  };
  a3.USVString = function(A) {
    let B = String(A),
      Q = B.length,
      I = [];
    for (let G = 0; G < Q; ++G) {
      let Z = B.charCodeAt(G);
      if (Z < 55296 || Z > 57343) I.push(String.fromCodePoint(Z));
      else if (56320 <= Z && Z <= 57343) I.push(String.fromCodePoint(65533));
      else if (G === Q - 1) I.push(String.fromCodePoint(65533));
      else {
        let D = B.charCodeAt(G + 1);
        if (56320 <= D && D <= 57343) {
          let Y = Z & 1023,
            W = D & 1023;
          I.push(String.fromCodePoint(65536 + 1024 * Y + W)), ++G
        } else I.push(String.fromCodePoint(65533))
      }
    }
    return I.join("")
  };
  a3.Date = function(A, B) {
    if (!(A instanceof Date)) throw new TypeError("Argument is not a Date object");
    if (isNaN(A)) return;
    return A
  };
  a3.RegExp = function(A, B) {
    if (!(A instanceof RegExp)) A = new RegExp(A);
    return A
  }
})
// @from(Start 6323467, End 6323905)
LD2 = z(($o6, JO) => {
  $o6.mixin = function A(B, Q) {
    let I = Object.getOwnPropertyNames(Q);
    for (let G = 0; G < I.length; ++G) Object.defineProperty(B, I[G], Object.getOwnPropertyDescriptor(Q, I[G]))
  };
  $o6.wrapperSymbol = Symbol("wrapper");
  $o6.implSymbol = Symbol("impl");
  $o6.wrapperForImpl = function(A) {
    return A[$o6.wrapperSymbol]
  };
  $o6.implForWrapper = function(A) {
    return A[$o6.implSymbol]
  }
})